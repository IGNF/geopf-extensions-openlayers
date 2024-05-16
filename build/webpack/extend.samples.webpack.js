var path = require("path");
var glob = require("glob");

var HandlebarsPlugin = require("../scripts/webpackPlugins/handlebars-plugin");
var HandlebarsLayoutPlugin = require("handlebars-layouts");
var CopyWebpackPlugin = require("copy-webpack-plugin");

var rootdir = path.join(__dirname, "../..");
var pkg = require(path.join(rootdir, "package.json"));

module.exports = (env, argv) => {
    var type = env["type"]; // modules ou packages
    return {
        /** HANDLEBARS TEMPLATES */
        plugins : [
            /** TEMPLATES SAMPLES */
            new HandlebarsPlugin(
                {
                    entry : {
                        path : path.join(rootdir, "samples-src", "pages", "tests"),
                        pattern : "**/*-" + type + "-*.html"
                    },
                    output : {
                        path : path.join(rootdir, "samples", "tests"),
                        flatten : false,
                        filename : "[name].html"
                    },
                    helpers : [
                        HandlebarsLayoutPlugin
                    ],
                    partials : [
                        path.join(rootdir, "samples-src", "templates", "packages", "*.hbs"),
                        path.join(rootdir, "samples-src", "templates", "partials", "*.hbs"),
                        path.join(rootdir, "samples-src", "templates", "partials", "packages", "*.hbs")
                    ],
                    context : [
                        path.join(rootdir, "samples-src", "config.json"),
                        {
                            version : pkg.dependencies["ol"] === "latest" ? pkg.dependencies["ol"] : "v" + pkg.dependencies["ol"].match(/(\d+\.\d+\.\d+)/)[0]
                        }
                    ]
                }
            ),
            /** TEMPLATES INDEX */
            new HandlebarsPlugin(
                {
                    entry : path.join(rootdir, "samples-src", "pages", "index.html"),
                    output : {
                        path : path.join(rootdir, "samples"),
                        filename : "[name]-"+ type + ".html"
                    },
                    context : {
                        samples : () => {
                            var root = path.join(rootdir, "samples-src", "pages", "tests");
                            var list = glob.sync(path.join(root, "**", "*-" + type + "-*.html"));
                            list = list.map(function (filePath) {
                                var relativePath = path.relative(root, filePath);
                                var label = relativePath.replace("/", " -- ");
                                var pathObj = path.parse(relativePath);
                                return {
                                    filePath : path.join("tests", pathObj.dir, pathObj.name.concat(pathObj.ext)),
                                    label : label
                                };
                            });
                            return list;
                        }
                    }
                }
            ),
            /* RESOURCES COPY FOR SAMPLES */
            new CopyWebpackPlugin({
                patterns : [
                    {
                        from : path.join(rootdir, "samples-src", "resources"),
                        to : path.join(rootdir, "samples", "resources"),
                        context : path.join(rootdir, "samples-src", "resources"),
                        force : true
                    }
                ]
            }),
        ]
    };
};