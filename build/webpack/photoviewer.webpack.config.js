/* global module, __dirname */
// Config webpack pour produire un bundle UMD de @panoramax/web-viewer (photoviewer)
// Usage : webpack --config build/webpack/photoviewer.webpack.config.js --mode=production

var fs = require("fs");
var path = require("path");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var RawSource = require("webpack").sources.RawSource;

var rootdir = path.join(__dirname, "../..");
var pkg = require(path.join(rootdir, "node_modules/@panoramax/web-viewer/package.json"));
var version = pkg.version;

function getPanoramaxCssFiles() {
    var componentsDir = path.join(rootdir, "node_modules", "@panoramax", "web-viewer", "build", "components");
    var files = [];

    function walk(dir) {
        fs.readdirSync(dir, { withFileTypes : true }).forEach(function(entry) {
            var fullpath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                walk(fullpath);
                return;
            }
            if (entry.isFile() && entry.name.endsWith(".css")) {
                files.push(fullpath);
            }
        });
    }

    walk(componentsDir);
    files.sort();
    return files.concat([
        path.join(rootdir, "node_modules", "@photo-sphere-viewer", "core", "index.css"),
        path.join(rootdir, "node_modules", "@photo-sphere-viewer", "compass-plugin", "index.css"),
        path.join(rootdir, "node_modules", "@photo-sphere-viewer", "markers-plugin", "index.css"),
        path.join(rootdir, "node_modules", "@photo-sphere-viewer", "plan2-plugin", "index.css"),
        path.join(rootdir, "node_modules", "@photo-sphere-viewer", "virtual-tour-plugin", "index.css")
    ]);
}

function PanoramaxCssAssetPlugin(options) {
    this.filename = options.filename;
    this.files = options.files;
}

PanoramaxCssAssetPlugin.prototype.apply = function(compiler) {
    compiler.hooks.thisCompilation.tap("PanoramaxCssAssetPlugin", function(compilation) {
        compilation.hooks.processAssets.tap(
            {
                name : "PanoramaxCssAssetPlugin",
                stage : compilation.PROCESS_ASSETS_STAGE_ADDITIONS
            },
            function () {
                var bundle = this.files
                    .filter(function(file) { return fs.existsSync(file); })
                    .map(function(file) {
                        var relpath = path.relative(rootdir, file).replace(/\\/g, "/");
                        return "/* Source: " + relpath + " */\n" + fs.readFileSync(file, "utf8").trim() + "\n";
                    })
                    .join("\n");

                compilation.emitAsset(this.filename, new RawSource(bundle + "\n"));
            }.bind(this)
        );
    }.bind(this));
};

module.exports = {
    entry : path.resolve(rootdir, "node_modules/@panoramax/web-viewer/build/index_photoviewer.js"),
    output : {
        path : path.join(rootdir, "samples-src", "resources", "vendor", "panoramax", "v" + version),
        filename : "photoviewer.js",
        library : "Panoramax",
        libraryTarget : "umd",
        globalObject : "this"
    },
    // experiments.css gère nativement les imports `with { type: "css" }`
    // et retourne des CSSStyleSheet compatibles avec document.adoptedStyleSheets
    experiments : {
        css : false
    },
    module : {
        rules : [
            {
                test : /\.css$/,
                include : [
                    /node_modules\/@panoramax\/web-viewer\/build/
                ],
                use : [
                    {
                        loader : "css-loader",
                        options : {
                            exportType : "css-style-sheet"
                        }
                    }
                ]
            },
            {
                test : /\.css$/,
                include : [
                    /node_modules\/@photo-sphere-viewer\/compass-plugin\/index.css/,
                    /node_modules\/@photo-sphere-viewer\/plan2-plugin\/index.css/
                ],
                use : [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test : /\.(png|jpg|gif|svg|woff|woff2)$/,
                type : "asset/inline"
            }
        ]
    },
    plugins : [
        new PanoramaxCssAssetPlugin({
            filename : "photoviewer.css",
            files : getPanoramaxCssFiles()
        }),
        new MiniCssExtractPlugin({
            filename : "photoviewer.css"
        })
    ],
    stats : "errors-warnings"
};
