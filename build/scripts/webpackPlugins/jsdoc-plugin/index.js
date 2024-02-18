var fs = require("fs");
var path = require("path");
var merge = require("lodash/merge");
var spawn = require("child_process").spawn;
var fsExtra = require("fs-extra");

const PLUGIN_NAME = "jsdoc-webpack-plugin";

class JsDocWebPackPluginPlugin {

    constructor (translationOptions) {
        var defaultOptions = {
            conf : "./jsdoc.conf"
        };

        this.options = merge({}, defaultOptions, translationOptions);
    }

    apply (compiler) {
        var self = this;
        var options = self.options;

        const logger = compiler.getInfrastructureLogger(PLUGIN_NAME);
        logger.log("log from compiler");

        compiler.hooks.watchRun.tapAsync(PLUGIN_NAME, (watching, callback) => {
            self.webpackIsWatching = true;
            callback(null, null);
        });

        compiler.hooks.emit.tapAsync(PLUGIN_NAME, (compilation, callback) => {
            logger.log("JSDOC Start generating");

            fsExtra.readJson(path.resolve(process.cwd(), options.conf), function (err, obj) {
                var files = [], jsdocErrors = [];
                var jsdoc, cwd = process.cwd();

                if (err) {
                    callback(err);
                    return;
                }

                if (obj.source && obj.source.include) {
                    logger.log("Taking sources from config file");
                } else {
                    compilation.chunks.forEach(function (chunk) {
                        chunk.modules.forEach(function (module) {
                            if (module.fileDependencies) {
                                module.fileDependencies.forEach(function (filepath) {
                                    files.push(path.relative(process.cwd(), filepath));
                                });
                            }
                        });
                    });
                    merge(obj.source, { include : files });
                }

                var jsDocConfTmp = path.resolve(cwd, "jsdoc." + Date.now() + ".conf.tmp");
                fs.writeFileSync(jsDocConfTmp, JSON.stringify(obj));

                if (/^win/.test(process.platform)) {
                    jsdoc = spawn("./node_modules/.bin/jsdoc.cmd", ["-c", jsDocConfTmp]);
                } else {
                    jsdoc = spawn("./node_modules/.bin/jsdoc", ["-c", jsDocConfTmp]);
                }

                jsdoc.stdout.on("data", function (data) {
                    logger.log(data.toString());
                });

                jsdoc.stderr.on("data", function (data) {
                    jsdocErrors.push(data.toString());
                });

                jsdoc.on("close", function (data, code) {
                    if (jsdocErrors.length > 0) {
                        jsdocErrors.forEach(function (value) {
                            logger.error(value);
                        });
                    } else {
                        logger.log("JsDoc successful");
                    }
                    fs.unlink(jsDocConfTmp, () => {
                        logger.log("JsDoc tmp deleted !");
                        callback();
                    });
                });
            });
        });

        compiler.hooks.done.tap(PLUGIN_NAME, (stats) => {
            logger.log("JSDOC Finished generating");
            logger.log("JSDOC TOTAL TIME:", stats.endTime - stats.startTime);
        });
    }

}

module.exports = JsDocWebPackPluginPlugin;
