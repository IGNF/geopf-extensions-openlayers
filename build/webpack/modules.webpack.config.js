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
    env["type"] = "modules";

    var isDevelopment = (argv.mode === "development");
    return {
        extends : isDevelopment ? [
            path.resolve(__dirname, "./extend.themes.webpack.js"),
            path.resolve(__dirname, "./extend.samples.webpack.js")
        ] : [
            path.resolve(__dirname, "./extend.themes.webpack.js")
        ],
        entry : {
            // Widgets
            "GpfExtOlDrawing" : path.join(rootdir, "src", "packages", "Controls/Drawing", "Drawing.js"),
            "GpfExtOlEditor" : path.join(rootdir, "src", "packages", "Controls/Editor", "Editor.js"),
            "GpfExtOlElevationPath" : path.join(rootdir, "src", "packages", "Controls/ElevationPath", "ElevationPath.js"),
            "GpfExtOlGetFeatureInfo" : path.join(rootdir, "src", "packages", "Controls/GetFeatureInfo", "GetFeatureInfo.js"),
            "GpfExtOlIsocurve" : path.join(rootdir, "src", "packages", "Controls/Isocurve", "Isocurve.js"),
            "GpfExtOlLayerImport" : path.join(rootdir, "src", "packages", "Controls/LayerImport", "LayerImport.js"),
            "GpfExtOlLayerSwitcher" : path.join(rootdir, "src", "packages", "Controls/LayerSwitcher", "LayerSwitcher.js"),
            "GpfExtOlLocationSelector" : path.join(rootdir, "src", "packages", "Controls/LocationSelector", "LocationSelector.js"),
            "GpfExtOlGeoportalMousePosition" : path.join(rootdir, "src", "packages", "Controls/MousePosition", "MousePosition.js"),
            "GpfExtOlGeoportalAttribution" : path.join(rootdir, "src", "packages", "Controls/Attribution", "GeoportalAttribution.js"),
            "GpfExtOlReverseGeocode" : path.join(rootdir, "src", "packages", "Controls/ReverseGeocode", "ReverseGeocode.js"),
            "GpfExtOlRoute" : path.join(rootdir, "src", "packages", "Controls/Route", "Route.js"),
            "GpfExtOlSearchEngine" : path.join(rootdir, "src", "packages", "Controls/SearchEngine", "SearchEngine.js"),
            "GpfExtOlExport" : path.join(rootdir, "src", "packages", "Controls/Export", "Export.js"),
            "GpfExtOlMeasureArea" : path.join(rootdir, "src", "packages", "Controls", "Measures", "MeasureArea.js"),
            "GpfExtOlMeasureAzimuth" : path.join(rootdir, "src", "packages", "Controls", "Measures", "MeasureAzimuth.js"),
            "GpfExtOlMeasureLength" : path.join(rootdir, "src", "packages", "Controls", "Measures", "MeasureLength.js"),
            "GpfExtOlGeoportalZoom" : path.join(rootdir, "src", "packages", "Controls/Zoom", "GeoportalZoom.js"),
            "GpfExtOlGeoportalFullScreen" : path.join(rootdir, "src", "packages", "Controls/FullScreen", "GeoportalFullScreen.js"),
            // Formats étendus
            "GpfExtOlFormats" : [
                path.join(rootdir, "src", "packages", "Formats", "GeoJSON.js"),
                path.join(rootdir, "src", "packages", "Formats", "KML.js"),
                path.join(rootdir, "src", "packages", "Formats", "GPX.js")
            ],
            // Couches
            "GpfExtOlLayers" : [
                path.join(rootdir, "src", "packages", "Sources", "WMTS.js"),
                path.join(rootdir, "src", "packages", "Layers", "LayerWMS.js"),
                path.join(rootdir, "src", "packages", "Layers", "LayerWMTS.js"),
                path.join(rootdir, "src", "packages", "Layers", "SourceWMS.js"),
                path.join(rootdir, "src", "packages", "Layers", "SourceWMTS.js"),
                path.join(rootdir, "src", "packages", "Layers", "LayerMapBox.js"),
            ],
            // Projections
            "GpfExtOlCRS" : path.join(rootdir, "src", "packages", "CRS", "AutoLoadCRS.js"),
        },
        output : {
            path : path.join(rootdir, "dist", "modules"),
            filename : "[name].js",
            libraryExport : "default",
            libraryTarget : "assign",
            library : "[name]"
        },
        resolve : {},
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
        devServer : {
            server : "https",
            open : ["samples/index-modules.html"],
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
                publicPath : "/dist/modules/",
                serverSideRender : true,
                writeToDisk : false,
            },
            compress : true
        },
        stats : "normal",
        optimization : {
            /** MINIFICATION */
            minimizer : [
                new TerserJsWebPackPlugin({
                    extractComments : false,
                    terserOptions : {
                        output : {
                            comments : false,
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
            ],
            noParse : [require.resolve("typescript/lib/typescript.js")]
        },
        plugins : [
            /** EXECUTION DU LINTER */
            new ESLintWebpackPlugin({
                
            }),
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
