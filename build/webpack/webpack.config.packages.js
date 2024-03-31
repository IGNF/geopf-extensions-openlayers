/* global module, __dirname */

// -- modules
var fs = require("fs");
var path = require("path");
var webpack = require("webpack");
var header = require("string-template");
var glob = require("glob");

// -- plugins
var ESLintWebpackPlugin = require('eslint-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var BannerWebPackPlugin = webpack.BannerPlugin;
var EnvWebPackPlugin = webpack.EnvironmentPlugin;
var TerserJsWebPackPlugin = require("terser-webpack-plugin");
var OptimizeCSSWebPackPlugin = require("css-minimizer-webpack-plugin");
var JsDocWebPackPlugin = require("../scripts/webpackPlugins/jsdoc-plugin");
var HandlebarsPlugin = require("../scripts/webpackPlugins/handlebars-plugin");
var HandlebarsLayoutPlugin = require("handlebars-layouts");
var CopyWebpackPlugin = require("copy-webpack-plugin");

// -- variables
var ROOT = path.join(__dirname, "../..");
var pkg = require(path.join(ROOT, "package.json"));

module.exports = (env, argv) => {
    var debug = false;
    // par defaut
    var devMode = false;
    var logMode = false;
    var suffixOutput = "";
    if (argv.mode === "production") {
        suffixOutput = "";
        logMode = false;
        devMode = false;
    }
    if (argv.mode === "development") {
        suffixOutput = "-map";
        logMode = true;
        devMode = true;
    }
    if (argv.mode === "none") {
        suffixOutput = "-src";
        logMode = true;
        devMode = false;
    }
    // env
    var jsdocEnv = true;
    if (env.jsdoc === "no") {
        jsdocEnv = false;
    }
    var linterEnv = true;
    if (env.linter === "no") {
        linterEnv = false;
    }
    var samplesEnv = true;
    if (env.samples === "no") {
        samplesEnv = false;
    }
 
    return {
        entry : {
            "Widgets" : path.join(ROOT, "src", "packages", "index.js"),
            // CSS themes portail
            "Portail" : [
                path.join(ROOT, "src", "packages", "CSS", "GPFwaiting.css"),
                path.join(ROOT, "src", "packages", "CSS", "GPFgeneralWidget.css"),
                path.join(ROOT, "src", "packages", "CSS", "Controls/Drawing", "GPFdrawingStyle.css"),
                path.join(ROOT, "src", "packages", "CSS", "Controls/Attribution", "GPFattributionStyle.css"),
                path.join(ROOT, "src", "packages", "CSS", "Controls/Editor", "GPFeditorStyle.css"),
                path.join(ROOT, "src", "packages", "CSS", "Controls/ElevationPath", "GPFelevationPathStyle.css"),
                path.join(ROOT, "src", "packages", "CSS", "Controls/Export", "GPFexportStyle.css"),
                path.join(ROOT, "src", "packages", "CSS", "Controls/GetFeatureInfo", "GPFgetFeatureInfoStyle.css"),
                path.join(ROOT, "src", "packages", "CSS", "Controls/Isochron", "GPFisochronStyle.css"),
                path.join(ROOT, "src", "packages", "CSS", "Controls/LayerImport", "GPFlayerImportStyle.css"),
                path.join(ROOT, "src", "packages", "CSS", "Controls/LayerSwitcher", "GPFlayerSwitcherStyle.css"),
                path.join(ROOT, "src", "packages", "CSS", "Controls/LocationSelector", "GPFlocationStyle.css"),
                path.join(ROOT, "src", "packages", "CSS", "Controls/Measures", "GPFmeasureAreaStyle.css"),
                path.join(ROOT, "src", "packages", "CSS", "Controls/Measures", "GPFmeasureLengthStyle.css"),
                path.join(ROOT, "src", "packages", "CSS", "Controls/Measures", "GPFmeasureAzimuthStyle.css"),
                path.join(ROOT, "src", "packages", "CSS", "Controls/Measures", "GPFmeasureToolTip.css"),
                path.join(ROOT, "src", "packages", "CSS", "Controls/MousePosition", "GPFmousePositionStyle.css"),
                path.join(ROOT, "src", "packages", "CSS", "Controls/ReverseGeocoding", "GPFreverseGeocodingStyle.css"),
                path.join(ROOT, "src", "packages", "CSS", "Controls/Route", "GPFrouteStyle.css"),
                path.join(ROOT, "src", "packages", "CSS", "Controls/SearchEngine", "GPFsearchEngineStyle.css"),
                path.join(ROOT, "src", "packages", "CSS", "Controls/ToolBoxMeasure", "GPFtoolBoxMeasureStyle.css")
            ],
            // CSS themes dsfr
            "Dsfr" : [
                // INFO dépendances externes !
                // path.join(ROOT, "node_modules/@gouvfr/dsfr/dist/dsfr.css"),
                // path.join(ROOT, "node_modules/@gouvfr/dsfr/dist/utility/icons/icons.css"),
                path.join(ROOT, "src", "packages", "CSS", "DSFRgeneralWidget.css"),
                path.join(ROOT, "src", "packages", "CSS", "Controls/Drawing", "DSFRdrawingStyle.css"),
                path.join(ROOT, "src", "packages", "CSS", "Controls/Attribution", "DSFRattributionStyle.css"),
                path.join(ROOT, "src", "packages", "CSS", "Controls/Editor", "DSFReditorStyle.css"),
                path.join(ROOT, "src", "packages", "CSS", "Controls/ElevationPath", "DSFRelevationPathStyle.css"),
                path.join(ROOT, "src", "packages", "CSS", "Controls/Export", "DSFRexportStyle.css"),
                path.join(ROOT, "src", "packages", "CSS", "Controls/GetFeatureInfo", "DSFRgetFeatureInfoStyle.css"),
                path.join(ROOT, "src", "packages", "CSS", "Controls/Isochron", "DSFRisochronStyle.css"),
                path.join(ROOT, "src", "packages", "CSS", "Controls/LayerImport", "DSFRlayerImportStyle.css"),
                path.join(ROOT, "src", "packages", "CSS", "Controls/LayerSwitcher", "DSFRlayerSwitcherStyle.css"),
                path.join(ROOT, "src", "packages", "CSS", "Controls/LocationSelector", "DSFRlocationStyle.css"),
                path.join(ROOT, "src", "packages", "CSS", "Controls/Measures", "DSFRmeasureAreaStyle.css"),
                path.join(ROOT, "src", "packages", "CSS", "Controls/Measures", "DSFRmeasureLengthStyle.css"),
                path.join(ROOT, "src", "packages", "CSS", "Controls/Measures", "DSFRmeasureAzimuthStyle.css"),
                path.join(ROOT, "src", "packages", "CSS", "Controls/MousePosition", "DSFRmousePositionStyle.css"),
                path.join(ROOT, "src", "packages", "CSS", "Controls/ReverseGeocoding", "DSFRreverseGeocodingStyle.css"),
                path.join(ROOT, "src", "packages", "CSS", "Controls/Route", "DSFRrouteStyle.css"),
                path.join(ROOT, "src", "packages", "CSS", "Controls/SearchEngine", "DSFRsearchEngineStyle.css"),
                path.join(ROOT, "src", "packages", "CSS", "Controls/ToolBoxMeasure", "DSFRtoolBoxMeasureStyle.css")
            ],
        },
        output : {
            path : path.join(ROOT, "dist", "packages"),
            filename : "[name]" + suffixOutput + ".js",
            // libraryExport : 'default',
            // libraryTarget : 'assign',
            library : "Gp" // FIXME comment peupler la variable globale 'Gp' ?
        },
        resolve : {},
        externals : [
            function({ context, request }, callback) {
                if (/^ol\/.+$/.test(request)) {
                    // liste des modules ES6 à garder dans le code...
                    if ([
                        "ol/events/EventType",
                        "ol/events/EventType.js",
                        "ol/events",
                        "ol/events.js",
                        "ol/render/Feature",
                        "ol/render/Feature.js",
                        // "ol/obj",
                        // "ol/css",
                        // "ol/dom",
                        // "ol/transform",
                        // "ol/asserts",
                        // "ol/AssertionError",
                        // "ol/util",
                        // "ol/render/canvas/LabelCache", <!-- depreciate -->
                        // "ol/structs/LRUCache",
                        // "ol/events/Event",
                        // "ol/events/Target",
                        // "ol/Disposable",
                        // "ol/functions",
                        // "ol/proj/transforms"
                    ].includes(request)) {
                        if (debug) {
                            console.log("#### MODULE ES6 ONLY : " + request + " (" + context + ")");
                        }
                        return callback();
                    }
                    if (debug) {
                        console.log("#### OL : " + request + " (" + context + ")");
                    }
                    const replacedWith = request.replace(/\.js$/g, '').replace(/\//g, '.');
                    if (debug) {
                        console.log(">>> : ", replacedWith);
                    }
                    return callback(null, replacedWith);
                }
                if (debug) {
                    console.log("#### OTHER : " + request + " (" + context + ")");
                }
                callback();
            },
            /**
            * FIXME
            * configuration uniquement valable en mode umd !?
            * mais à tester lors de l'import dans le SDK...
            */
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
        devtool : (devMode) ? "eval-source-map" : false,
        stats : (devMode) ? "errors-warnings" : "normal",
        optimization : {
            /** FIXME ça ne marche pas !? MINIFICATION */
            minimizer: [
                new TerserJsWebPackPlugin({
                    extractComments: false,
                    terserOptions: {
                        output: {
                            // FIXME avec les banner !
                            comments: false,
                            // drop_console: true
                        },
                        mangle: true
                    }
                }),
                new OptimizeCSSWebPackPlugin({})
            ],
            /** EXTRACT CSS INTO SINGLE FILE */
            // splitChunks : {
            //     cacheGroups : {
            //         styles : {
            //             name : "GpPluginOpenLayers",
            //             test : /\.css$/,
            //             chunks : "all",
            //             enforce : true
            //         }
            //     }
            // }
        },
        module : {
            rules : [
                {
                    test : /\.js$/,
                    include : [
                        path.join(ROOT, "src", "packages")
                    ],
                    exclude : /node_modules/,
                    use : [
                        {
                            loader : "babel-loader",
                            options : {
                                presets : ["@babel/preset-env"]
                            }
                        },
                        {
                            loader : 'string-replace-loader',
                            options : {
                                search: '__PRODUCTION__', 
                                replace(match, p1, offset, string) {
                                    console.log(`Replace "${match}" in file "${this.resource}".`)
                                    return `${logMode}`
                                }
                            }
                        }
                    ]
                },
                {
                    /** FIXME ça marche ? proj4 est exposé en global : proj4 ! */
                    test : require.resolve("proj4"),
                    use : [{
                        loader : "expose-loader",
                        options : {
                            exposes : "proj4"
                        }
                    }]
                },
                {
                    /**  FIXME ça marche ? eventbusjs est exposé en global : eventbus ! */
                    test : require.resolve("eventbusjs"),
                    use : [{
                        loader : "expose-loader",
                        options : {
                            exposes : "eventbus"
                        }
                    }]
                },
                {
                    /** FIXME ça marche ? ol-mapbox-style est exposé en global : olms ! */
                    test : /node_modules\/ol-mapbox-style\/dist\/olms\.js$/,
                    use : [{
                        loader : "exports-loader",
                        options : "olms"
                    }]
                },
                {
                    test : /\.css$/,
                    include : [
                        path.join(ROOT, "src", "packages", "CSS"),
                        /node_modules\/@gouvfr\/dsfr\/dist/,
                    ],
                    use : [
                        MiniCssExtractPlugin.loader,
                        "css-loader"
                        // https://github.com/webpack-contrib/sass-loader/
                        // {
                        //     loader: "sass-loader",
                        //     options: { sassOptions: { outputStyle: "expanded" }}
                        // }
                    ]
                },
                {
                    test : /\.(png|jpg|gif|svg|woff|woff2)$/,
                    type: 'asset/inline'
                }
            ]
        },
        plugins : [
            /** EXECUTION DU LINTER */
            (linterEnv) ? new ESLintWebpackPlugin({

            }) : "",
            /** GENERATION DE LA JSDOC */
            (jsdocEnv) ? new JsDocWebPackPlugin({
                conf : path.join(ROOT, "build/jsdoc/jsdoc.json")
            }) : "",
            /** CSS avec IMAGES en base64 */
            new MiniCssExtractPlugin({
                filename : "[name]" + suffixOutput + ".css"
            }),
            new EnvWebPackPlugin({
                VERBOSE : logMode
            })
        ]
        /** AJOUT DES LICENCES */
        .concat([
            new BannerWebPackPlugin({
                banner : header(fs.readFileSync(path.join(ROOT, "build/licences", "licence-proj4js.tmpl"), "utf8"), {
                    __VERSION__ : pkg.dependencies["proj4"],
                }),
                raw : true
            }),
            new BannerWebPackPlugin({
                banner : fs.readFileSync(path.join(ROOT, "build/licences", "licence-es6promise.txt"), "utf8"),
                raw : true
            }),
            new BannerWebPackPlugin({
                banner : header(fs.readFileSync(path.join(ROOT, "build/licences", "licence-eventbusjs.tmpl"), "utf8"), {
                    __VERSION__ : pkg.dependencies["eventbusjs"],
                }),
                raw : true
            }),
            new BannerWebPackPlugin({
                banner : header(fs.readFileSync(path.join(ROOT, "build/licences", "licence-sortablejs.tmpl"), "utf8"), {
                    __VERSION__ : pkg.dependencies["sortablejs"],
                }),
                raw : true
            }),
            new BannerWebPackPlugin({
                banner : header(fs.readFileSync(path.join(ROOT, "build/licences", "licence-olms.tmpl"),"utf8"), {
                    __VERSION__ : pkg.dependencies["ol-mapbox-style"],
                }),
                raw : true,
                entryOnly : true
            }),
            new BannerWebPackPlugin({
                banner : header(fs.readFileSync(path.join(ROOT, "build/licences", "licence-ign.tmpl"), "utf8"), {
                    __BRIEF__ : pkg.name,
                    __VERSION__ : pkg.version,
                    __DATE__ : pkg.date
                }),
                raw : true,
                entryOnly : true
            })
        ])
        /** HANDLEBARS TEMPLATES */
        .concat((samplesEnv) ? [
            /** TEMPLATES SAMPLES */
            new HandlebarsPlugin(
                {
                    entry : {
                        path : path.join(ROOT, "samples-src", "pages", "tests"),
                        pattern : "**/*-packages-*.html"
                    },
                    output : {
                        path : path.join(ROOT, "samples", "tests"),
                        flatten : false,
                        filename : "[name]" + suffixOutput + ".html"
                    },
                    helpers : [
                        HandlebarsLayoutPlugin
                    ],
                    partials : [
                        path.join(ROOT, "samples-src", "templates", "packages", "*.hbs"),
                        path.join(ROOT, "samples-src", "templates", "partials", "*.hbs"),
                        path.join(ROOT, "samples-src", "templates", "partials", "packages", "*.hbs")
                    ],
                    context : [
                        path.join(ROOT, "samples-src", "config.json"),
                        {
                            mode : suffixOutput,
                            version : pkg.dependencies["ol"] === 'latest' ? pkg.dependencies["ol"] : 'v' + pkg.dependencies["ol"].match(/(\d+\.\d+\.\d+)/)[0]
                        }
                    ]
                }
            ),
            /** TEMPLATES INDEX */
            new HandlebarsPlugin(
                {
                    entry : path.join(ROOT, "samples-src", "pages", "index.html"),
                    output : {
                        path : path.join(ROOT, "samples"),
                        filename : "[name]" + "-packages" + suffixOutput + ".html"
                    },
                    context : {
                        samples : () => {
                            var root = path.join(ROOT, "samples-src", "pages", "tests");
                            var list = glob.sync(path.join(root, "**", "*-packages-*.html"));
                            list = list.map(function (filePath) {
                                var relativePath = path.relative(root, filePath);
                                var label = relativePath.replace("/", " -- ");
                                var pathObj = path.parse(relativePath);
                                return {
                                    filePath : path.join("tests", pathObj.dir, pathObj.name.concat(suffixOutput).concat(pathObj.ext)),
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
                patterns: [
                    {
                        from : path.join(ROOT, "samples-src", "resources", "**/*"),
                        to : path.join(ROOT, "samples", "resources"),
                        context : path.join(ROOT, "samples-src", "resources"),
                        force: true
                    }
                ]
            }),
        ] : [])
    }
};
