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
var rootdir = path.join(__dirname, "../..");
var pkg = require(path.join(rootdir, "package.json"));

module.exports = (env, argv) => {
    var verbose = !(argv.mode === "production");
    return {
        entry : {
            "Widgets" : path.join(rootdir, "src", "packages", "bundle.js"),
            // CSS themes portail
            "Portail" : [
                path.join(rootdir, "src", "packages", "CSS", "GPFwaiting.css"),
                path.join(rootdir, "src", "packages", "CSS", "GPFgeneralWidget.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/Drawing", "GPFdrawingStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/Attribution", "GPFattributionStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/Editor", "GPFeditorStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/ElevationPath", "GPFelevationPathStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/Export", "GPFexportStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/GetFeatureInfo", "GPFgetFeatureInfoStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/Isochron", "GPFisochronStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/LayerImport", "GPFlayerImportStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/LayerSwitcher", "GPFlayerSwitcherStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/LocationSelector", "GPFlocationStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/Measures", "GPFmeasureAreaStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/Measures", "GPFmeasureLengthStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/Measures", "GPFmeasureAzimuthStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/Measures", "GPFmeasureToolTip.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/MousePosition", "GPFmousePositionStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/ReverseGeocoding", "GPFreverseGeocodingStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/Route", "GPFrouteStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/SearchEngine", "GPFsearchEngineStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/ToolBoxMeasure", "GPFtoolBoxMeasureStyle.css")
            ],
            // CSS themes dsfr
            "Dsfr" : [
                // INFO dépendances externes !
                // path.join(rootdir, "node_modules/@gouvfr/dsfr/dist/dsfr.css"),
                // path.join(rootdir, "node_modules/@gouvfr/dsfr/dist/utility/icons/icons.css"),
                path.join(rootdir, "src", "packages", "CSS", "DSFRgeneralWidget.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/Drawing", "DSFRdrawingStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/Attribution", "DSFRattributionStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/Editor", "DSFReditorStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/ElevationPath", "DSFRelevationPathStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/Export", "DSFRexportStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/GetFeatureInfo", "DSFRgetFeatureInfoStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/Isochron", "DSFRisochronStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/LayerImport", "DSFRlayerImportStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/LayerSwitcher", "DSFRlayerSwitcherStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/LocationSelector", "DSFRlocationStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/Measures", "DSFRmeasureAreaStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/Measures", "DSFRmeasureLengthStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/Measures", "DSFRmeasureAzimuthStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/MousePosition", "DSFRmousePositionStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/ReverseGeocoding", "DSFRreverseGeocodingStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/Route", "DSFRrouteStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/SearchEngine", "DSFRsearchEngineStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/ToolBoxMeasure", "DSFRtoolBoxMeasureStyle.css")
            ],
        },
        output : {
            path : path.join(rootdir, "dist", "packages"),
            filename : "[name].js",
            library : "Gp"
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
                        "ol/render/Feature.js"
                    ].includes(request)) {
                        return callback();
                    }
                    const replacedWith = request.replace(/\.js$/g, '').replace(/\//g, '.');
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
        optimization : {
            /**  MINIFICATION */
            minimizer: [
                new TerserJsWebPackPlugin({
                    extractComments: false,
                    terserOptions: {
                        output: {
                            comments: false,
                        },
                        mangle: true
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
                    test : require.resolve("proj4"),
                    use : [{
                        loader : "expose-loader",
                        options : {
                            exposes : "proj4"
                        }
                    }]
                },
                {
                    test : require.resolve("eventbusjs"),
                    use : [{
                        loader : "expose-loader",
                        options : {
                            exposes : "eventbus"
                        }
                    }]
                },
                {
                    test : /node_modules\/ol-mapbox-style\/dist\/olms\.js$/,
                    use : [{
                        loader : "exports-loader",
                        options : "olms"
                    }]
                },
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
                    type: 'asset/inline'
                }
            ]
        },
        plugins : [
            /** EXECUTION DU LINTER */
            new ESLintWebpackPlugin({

            }),
            /** GENERATION DE LA JSDOC */
            new JsDocWebPackPlugin({
                conf : path.join(rootdir, "build/jsdoc/jsdoc.json")
            }),
            /** CSS avec IMAGES en base64 */
            new MiniCssExtractPlugin({
                filename : "[name].css"
            }),
            /** LOGGER */
            new EnvWebPackPlugin({
                VERBOSE : verbose
            })
        ]
        /** AJOUT DES LICENCES */
        .concat([
            new BannerWebPackPlugin({
                banner : header(fs.readFileSync(path.join(rootdir, "build/licences", "licence-proj4js.tmpl"), "utf8"), {
                    __VERSION__ : pkg.dependencies["proj4"],
                }),
                raw : true
            }),
            new BannerWebPackPlugin({
                banner : header(fs.readFileSync(path.join(rootdir, "build/licences", "licence-eventbusjs.tmpl"), "utf8"), {
                    __VERSION__ : pkg.dependencies["eventbusjs"],
                }),
                raw : true
            }),
            new BannerWebPackPlugin({
                banner : header(fs.readFileSync(path.join(rootdir, "build/licences", "licence-sortablejs.tmpl"), "utf8"), {
                    __VERSION__ : pkg.dependencies["sortablejs"],
                }),
                raw : true
            }),
            new BannerWebPackPlugin({
                banner : header(fs.readFileSync(path.join(rootdir, "build/licences", "licence-olms.tmpl"),"utf8"), {
                    __VERSION__ : pkg.dependencies["ol-mapbox-style"],
                }),
                raw : true,
                entryOnly : true
            }),
            new BannerWebPackPlugin({
                banner : header(fs.readFileSync(path.join(rootdir, "build/licences", "licence-ign.tmpl"), "utf8"), {
                    __BRIEF__ : pkg.name,
                    __VERSION__ : pkg.version,
                    __DATE__ : pkg.date
                }),
                raw : true,
                entryOnly : true
            })
        ])
        /** HANDLEBARS TEMPLATES */
        .concat([
            /** TEMPLATES SAMPLES */
            new HandlebarsPlugin(
                {
                    entry : {
                        path : path.join(rootdir, "samples-src", "pages", "tests"),
                        pattern : "**/*-packages-*.html"
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
                            version : pkg.dependencies["ol"] === 'latest' ? pkg.dependencies["ol"] : 'v' + pkg.dependencies["ol"].match(/(\d+\.\d+\.\d+)/)[0]
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
                        filename : "[name]" + "-packages.html"
                    },
                    context : {
                        samples : () => {
                            var root = path.join(rootdir, "samples-src", "pages", "tests");
                            var list = glob.sync(path.join(root, "**", "*-packages-*.html"));
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
                patterns: [
                    {
                        from : path.join(rootdir, "samples-src", "resources"),
                        to : path.join(rootdir, "samples", "resources"),
                        context : path.join(rootdir, "samples-src", "resources"),
                        force: true
                    }
                ]
            })
        ])
    }
};
