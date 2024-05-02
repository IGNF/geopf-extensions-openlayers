var path = require("path");

var rootdir = path.join(__dirname, "../..");

module.exports = (env, argv) => {
    // env transmis pour la config des samples
    env["type"] = "modules";
    // argv
    var isDevelopment = (argv.mode === "development");

    return {
        extends : isDevelopment ? [
            path.resolve(__dirname, "./extend.base.webpack.js"),
            path.resolve(__dirname, "./extend.samples.webpack.js")
        ] : [
            path.resolve(__dirname, "./extend.base.webpack.js")
        ],
        entry : {
            "Layers" : [
                path.join(rootdir, "src", "packages", "Sources", "WMTS.js"),
                path.join(rootdir, "src", "packages", "Layers", "LayerWMS.js"),
                path.join(rootdir, "src", "packages", "Layers", "LayerWMTS.js"),
                path.join(rootdir, "src", "packages", "Layers", "SourceWMS.js"),
                path.join(rootdir, "src", "packages", "Layers", "SourceWMTS.js"),
                path.join(rootdir, "src", "packages", "Layers", "LayerMapBox.js"),
            ]
        },
        externalsType : "var",
    };
};