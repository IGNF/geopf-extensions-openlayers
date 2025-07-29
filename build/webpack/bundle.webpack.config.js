/* global module, __dirname */

// -- modules
var fs = require("fs");
var path = require("path");
var webpack = require("webpack");
var header = require("string-template");

// -- plugins
var ESLintWebpackPlugin = require("eslint-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var BannerWebPackPlugin = webpack.BannerPlugin;
var EnvWebPackPlugin = webpack.EnvironmentPlugin;
var TerserJsWebPackPlugin = require("terser-webpack-plugin");
var OptimizeCSSWebPackPlugin = require("css-minimizer-webpack-plugin");

// -- variables
var rootdir = path.join(__dirname, "../..");
var pkg = require(path.join(rootdir, "package.json"));

module.exports = (env, argv) => {
    // env transmis pour la config des samples
    env["type"] = "bundle";

    var isDevelopment = (argv.mode === "development");
    return {
        extends : isDevelopment ? [
            path.resolve(__dirname, "./extend.themes.webpack.js"),
            path.resolve(__dirname, "./extend.samples.webpack.js"),
            path.resolve(__dirname, "./extend.banners.webpack.js")
        ] : [
            path.resolve(__dirname, "./extend.themes.webpack.js"),
            path.resolve(__dirname, "./extend.banners.webpack.js")
        ],
        entry : {
            "GpfExtOL" : path.join(rootdir, "src", "packages", "bundle.js")
        },
        output : {
            path : path.join(rootdir, "dist", "bundle"),
            filename : "[name].js",
            library : "Gp"
        },
        resolve : {
            alias : {}
        },
        externals : [
            function ({ context, request }, callback) {
                if (/^ol\/.+$/.test(request)) {
                    // liste des modules ES6 à garder dans le code...
                    if ([
                        "ol/events/EventType",
                        "ol/events/EventType.js",
                        "ol/events",
                        "ol/events.js",
                        "ol/render/Feature",
                        "ol/render/Feature.js"
                    ].includes(request)) {
                        return callback();
                    }
                    const replacedWith = request.replace(/\.js$/g, "").replace(/\//g, ".");
                    return callback(null, replacedWith);
                }
                callback();
            },
            {
                ol : {
                    commonjs : "ol",
                    commonjs2 : "ol",
                    amd : "ol",
                    root : "ol"
                },
                request : {
                    commonjs2 : "request",
                    commonjs : "request",
                    amd : "require"
                },
                xmldom : {
                    commonjs2 : "xmldom",
                    commonjs : "xmldom",
                    amd : "require"
                }
            }
        ],
        devtool : "source-map",
        stats : "normal",
        devServer : {
            webSocketServer : false,
            server : "https",
            open : ["samples/index-bundle.html"],
            static : {
                directory : path.join(rootdir),
                watch : false
            },
            watchFiles : {
                paths : [
                    "src/**/*",
                    "samples-src/**/*"
                ]
            },
            devMiddleware : {
                index : true,
                mimeTypes : { phtml : "text/html" },
                publicPath : "/dist/packages/",
                serverSideRender : true,
                writeToDisk : (filePath) => {
                    return /samples\/resources/.test(filePath);
                },
            },

        },
        optimization : {
            /**  MINIFICATION */
            minimizer : [
                new TerserJsWebPackPlugin({
                    extractComments : false,
                    terserOptions : {
                        output : {
                            comments : "some",
                        },
                        mangle : true
                    }
                }),
                new OptimizeCSSWebPackPlugin({})
            ]
        },
        module : {
            rules : [
                {
                    test : /\.js$/,
                    include : [
                        path.join(rootdir, "src", "packages")
                    ],
                    exclude : /node_modules/,
                    use : [
                        {
                            loader : "babel-loader",
                            options : {
                                presets : ["@babel/preset-env"]
                            }
                        }
                    ]
                },
                // {
                //     test : require.resolve("proj4"),
                //     use : [{
                //         loader : "expose-loader",
                //         options : {
                //             exposes : "proj4"
                //         }
                //     }]
                // },
                // {
                //     test : require.resolve("eventbusjs"),
                //     use : [{
                //         loader : "expose-loader",
                //         options : {
                //             exposes : "eventbus"
                //         }
                //     }]
                // },
                // {
                //     test : require.resolve("ol-mapbox-style"),
                //     use : [{
                //         loader : "expose-loader",
                //         options : {
                //             exposes : "olms"
                //         }
                //     }]
                // },
                {
                    test : /\.css$/,
                    include : [
                        path.join(rootdir, "src", "packages", "CSS"),
                        /node_modules\/@gouvfr\/dsfr\/dist/,
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
            /** EXECUTION DU LINTER */
            new ESLintWebpackPlugin({}),
            /** CSS avec IMAGES en base64 */
            new MiniCssExtractPlugin({
                filename : "[name].css"
            }),
            /** LOGGER */
            new EnvWebPackPlugin({
                VERBOSE : isDevelopment
            }),
            /** AJOUT DES LICENCES */
            new BannerWebPackPlugin({
                banner : header(fs.readFileSync(path.join(rootdir, "build/licences", "licence-ign.tmpl"), "utf8"), {
                    __BRIEF__ : pkg.name,
                    __VERSION__ : pkg.version,
                    __DATE__ : pkg.date
                }),
                raw : true,
                entryOnly : true
            })
        ]
    };
};
