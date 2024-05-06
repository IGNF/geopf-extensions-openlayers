var path = require("path");

var rootdir = path.join(__dirname, "../..");

module.exports = (env, argv) => {
    // env pour les samples
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
            "GpfExtOl-Formats" : [
                path.join(rootdir, "src", "packages", "Formats", "GeoJSON.js"),
                path.join(rootdir, "src", "packages", "Formats", "KML.js"),
                path.join(rootdir, "src", "packages", "Formats", "GPX.js")
            ]
        },
        externalsType : "var",
    };
};