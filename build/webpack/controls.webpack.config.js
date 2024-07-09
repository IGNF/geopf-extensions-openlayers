var path = require("path");

var rootdir = path.join(__dirname, "../..");

module.exports = (env, argv) => {
    // argv
    var isDevelopment = (argv.mode === "development");
    // env transmis pour la config des samples
    env["type"] = "modules";

    // entries & externals
    var entries = {};
    var externals = [];

    var names = env.entry.split(",");
    for (let index = 0; index < names.length; index++) {
        var name = names[index];
        var moduledir = name;
        var key = name;
        
        switch (name) {
            case "GeoportalAttribution":
                moduledir = "Attribution"; 
                // ras
                break;
            case "Drawing":
                externals.push({ "./src/packages/Controls/LayerSwitcher/LayerSwitcher.js" : "LayerSwitcher" });
                // formats
                break;
            case "Isocurve":
                externals.push({ "./src/packages/Controls/LayerSwitcher/LayerSwitcher.js" : "LayerSwitcher" });
                externals.push({ "./src/packages/Controls/LocationSelector/LocationSelector.js" : "LocationSelector" });
                externals.push({ "./src/packages/Controls/Export/Export.js" : "Export" });
                // formats
                break;
            case "ElevationPath":
                externals.push({ "./src/packages/Controls/LayerSwitcher/LayerSwitcher.js" : "LayerSwitcher" });
                externals.push({ "./src/packages/Controls/Export/Export.js" : "Export" });
                // formats
                break;
            case "Export":
                // formats
                break;
            case "GetFeatureInfo":
                // ras
                break;
            case "LayerImport":
                externals.push({ "./src/packages/Controls/LayerSwitcher/LayerSwitcher.js" : "LayerSwitcher" });
                externals.push({ "./src/packages/Controls/Route/Route.js" : "Route" });
                externals.push({ "./src/packages/Controls/Isocurve/Isocurve.js" : "Isocurve" });
                externals.push({ "./src/packages/Controls/ElevationPath/ElevationPath.js" : "ElevationPath" });
                // formats
                break;
            case "LayerSwitcher":
                // ras
                break;
            case "LocationSelector":
                // ras
                break;
            case "MousePosition":
                key = "GeoportalMousePosition";
                // crs
                break;
            case "ReverseGeocode":
                externals.push({ "./src/packages/Controls/LayerSwitcher/LayerSwitcher.js" : "LayerSwitcher" });
                break;
            case "Route":
                externals.push({ "./src/packages/Controls/LayerSwitcher/LayerSwitcher.js" : "LayerSwitcher" });
                externals.push({ "./src/packages/Controls/Export/Export.js" : "Export" });
                externals.push({ "./src/packages/Controls/LocationSelector/LocationSelector.js" : "LocationSelector" });
                // formats
                break;
            case "SearchEngine":
                // crs
                break;
            case "MeasureArea":
            case "MeasureLength":
            case "MeasureAzimuth":
                // ras
                moduledir = "Measures";
                break;
            case "Legends":
                // ras
                break;
            case "Editor":
                // ras
                break;
            case "GeoportalZoom":
                moduledir = "Zoom"; 
                break;
            case "GeoportalFullScreen":
                moduledir = "FullScreen"; 
                // ras
                break;
            case "GeoportalOverviewMap":
                moduledir = "OverviewMap"; 
                // ras
                break;
            default:
                break;
        }
    
        entries["GpfExtOl" + key] = path.join(rootdir, "src", "packages", "Controls", moduledir, name + ".js");
        console.log("####", key, entries["GpfExtOl" + key], externals);
    }

    return {
        extends : isDevelopment ? [
            path.resolve(__dirname, "./extend.themes.webpack.js"),
            path.resolve(__dirname, "./extend.base.webpack.js"),
            path.resolve(__dirname, "./extend.samples.webpack.js")
        ] : [
            path.resolve(__dirname, "./extend.themes.webpack.js"),
            path.resolve(__dirname, "./extend.base.webpack.js")
        ],
        entry : entries,
        externalsType : "var",
        externals : externals
    };
};