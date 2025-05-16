import TMS from "./TMS.json";

var LayerConfigUtils = {
    /**
     * ...
     * @param {*} config 
     * @returns 
     */
    getLayerConfig : function (config) {
        var params = {};
        if (config) {
            var service = config.serviceParams.id.split(/:/)[1];
            var key = Object.keys(config.serviceParams.serverUrl)[0]; // la 1ere par defaut
            params.url = config.serviceParams.serverUrl[key];
            if (service !== "WFS") {
                const wmsTypeRegex = /\/v\//;
                // WMS vector style always empty (not in getCap)
                if (wmsTypeRegex.test(params.url)) {
                    params.styles = " ";
                } else {
                    // WMS raster style is defined in getCap
                    params.styles = config.styles[0].name;
                }
            }
            params.version = config.serviceParams.version;
            params.format = (config.formats && config.formats.length) ? config.formats[0].name : "";
            params.projection = config.defaultProjection;
    
            // get layer info and constraints
            params.minScale = config.globalConstraint ? config.globalConstraint.minScaleDenominator : null;
            params.maxScale = config.globalConstraint ? config.globalConstraint.maxScaleDenominator : null;
            params.extent = config.globalConstraint ? config.globalConstraint.bbox : null;
            params.legends = config.legends;
            params.title = config.title;
            params.description = config.description;
            if (service === "WMS") {
                params.metadata = config.metadata;
            }
            // WMTS : get the tileMatrixSetLimits
            if (config.wmtsOptions) {
                params.tileMatrixSetLimits = config.wmtsOptions.tileMatrixSetLimits;
                var TMSLink = config.wmtsOptions.tileMatrixSetLink;
                if (TMSLink) {
                    params.TMSLink = TMSLink;
                    var tmsConf = this.getTMSConfig(TMSLink);
                    // Get matrix origin : Gp.Point = Object{x:Float, y:Float}
                    // params.matrixOrigin = tmsConf.getTopLeftCorner();
                    params.matrixIds = Object.keys(tmsConf.tileMatrices);
                    params.tileMatrices = tmsConf.tileMatrices;
                    // by default, pseudo mercator resolutions
                    params.nativeResolutions = tmsConf.nativeResolutions || this.getTMSConfig("PM").nativeResolutions;
                }
            }
        }
        return {
            params : params
        };
    },

    /**
     * ...
     * @param {*} id 
     * @returns 
     */
    getTMSConfig : function (id) {
        return TMS[id];
    },

};

export default LayerConfigUtils;