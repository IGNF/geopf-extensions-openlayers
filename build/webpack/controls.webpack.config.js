var path = require("path");

var rootdir = path.join(__dirname, "../..");

module.exports = (env, argv) => {
    // env
    var entry = {};
    entry[env.entry] = path.join(rootdir, "src", "packages", "Controls", env.entry, env.entry + ".js");

    // externals
    var externals = [];
    switch (env.entry) {
        case "Drawing":
            externals = [
                {"../LayerSwitcher/LayerSwitcher" : "LayerSwitcher"}
            ];
            break;
    
        default:
            break;
    }

    return {
        extends : [
            path.resolve(__dirname, "./base.webpack.config.js"),
            path.resolve(__dirname, "./samples.webpack.config.js")
        ],
        entry : entry,
        externalsType : "var",
        externals : externals
    };
};