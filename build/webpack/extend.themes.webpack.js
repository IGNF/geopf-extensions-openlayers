var path = require("path");
var rootdir = path.join(__dirname, "../..");

module.exports = (env, argv) => {
    return {
        entry : {
            // CSS themes portail
            "Classic" : [
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
                path.join(rootdir, "src", "packages", "CSS", "Controls/ToolBoxMeasure", "GPFtoolBoxMeasureStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/Zoom", "GPFzoomStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/FullScreen", "GPFfullScreenStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/OverviewMap", "GPFoverviewMapStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/Legends", "GPFlegendsStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/Global", "GPFglobalStyle.css")                
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
                path.join(rootdir, "src", "packages", "CSS", "Controls/Measures", "DSFRmeasureToolTipStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/Measures", "DSFRmeasureAreaStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/Measures", "DSFRmeasureLengthStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/Measures", "DSFRmeasureAzimuthStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/MousePosition", "DSFRmousePositionStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/ReverseGeocoding", "DSFRreverseGeocodingStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/Route", "DSFRrouteStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/SearchEngine", "DSFRsearchEngineStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/ToolBoxMeasure", "DSFRtoolBoxMeasureStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/Zoom", "DSFRzoomStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/FullScreen", "DSFRfullScreenStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/OverviewMap", "DSFRoverviewMapStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/Legends", "DSFRlegendsStyle.css"),
                path.join(rootdir, "src", "packages", "CSS", "Controls/Global", "DSFRglobalStyle.css")
            ],
        }
    };
};
