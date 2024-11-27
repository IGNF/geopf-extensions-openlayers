import Gp from "geoportal-access-lib";
// import OpenLayers
import WMTSTileGrid from "ol/tilegrid/WMTS";
// import local with ol dependencies
import WMTSExtended from "../Sources/WMTS";
// import local
import Utils from "../Utils/Helper";
import LayerUtils from "../Utils/LayerUtils";
import Logger from "../Utils/LoggerByDefault";
import Config from "../Utils/Config";
// package.json (extract version)
import Pkg from "../../../package.json";

var logger = Logger.getLogger("sourcewmts");

/**
 * @classdesc
 * Geoportal WMTS source creation (inherit from ol.source.WMTS)
 *
 * @constructor
 * @alias ol.source.GeoportalWMTS
 * @type {ol.source.GeoportalWMTS}
 * @extends {WMTSExtended}
 * @param {Object} options            - options for function call.
 * @param {String} options.layer      - Layer name (e.g. "ORTHOIMAGERY.ORTHOPHOTOS")
 * @param {Object} [options.configuration] - configuration (cf. example) 
 * @param {Boolean} [options.ssl]     - if set true, enforce protocol https (only for nodejs)
 * @param {String} [options.apiKey]   - Access key to Geoportal platform
 * @param {Array} [options.legends]   - Legends objects associated to the layer
 * @param {Array} [options.metadata]   - Metadata objects associated to the layer
 * @param {String} [options.title]   - title of the layer
 * @param {String} [options.description]   - description of the layer
 * @param {String} [options.quicklookUrl]   - quicklookUrl of the layer
 * @param {Object} [options.olParams] - other options for ol.source.WMTS function (see {@link http://openlayers.org/en/latest/apidoc/ol.source.WMTS.html ol.source.WMTS})
 * @example
 * var sourceWMTS = new ol.source.GeoportalWMTS({
 *      layer  : "ORTHOIMAGERY.ORTHOPHOTOS"
 * });
 */
var SourceWMTS = class SourceWMTS extends WMTSExtended {

    constructor (options) {
        // if (!(this instanceof SourceWMTS)) {
        //     throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        // }

        // check layer params
        if (!options.layer) {
            throw new Error("ERROR PARAM_MISSING : layer");
        }
        if (typeof options.layer !== "string") {
            throw new Error("ERROR WRONG TYPE : layer");
        }

        // par defaut
        if (typeof options.ssl === "undefined") {
            options.ssl = true;
        }

        // configuration de la ressource
        var layerCfg = options.configuration;
        var wmtsParams = (layerCfg) ? layerCfg.params : null;
        var apiKey = options.apiKey;
        
        // 2 solutions pour la récupération des ressources utiles 
        // * soit depuis la configuration en option
        // * soit via la variable globale Gp.Config
        if (!layerCfg) {
            // Check if configuration is loaded
            if (!Config.isConfigLoaded()) {
                throw new Error("ERROR : contract key configuration has to be loaded to load Geoportal layers.");
            }

            var layerId = Config.configuration.getLayerId(options.layer, "WMTS");
            if (!layerId) {
                throw new Error(`ERROR : WMTS Layer ID ${options.layer} cannot be found in Geoportal Configuration. Make sure that this resource is included in your contract key.`);
            }

            layerCfg = Config.configuration.getLayerConf(layerId);
            if (!layerCfg) {
                throw new Error("ERROR : WMTS Layer configuration cannot be found in Geoportal.");
            }

            apiKey = Config.configuration.getLayerKey(layerId)[0];
            wmtsParams = Config.configuration.getLayerParams(options.layer, "WMTS");
        }

        // si ssl = false on fait du http
        // par défaut, ssl = true, on fait du https
        var protocol = options.ssl === false ? "http://" : "https://";

        var urlParams = {
            "gp-ol-ext" : Pkg.olExtVersion || Pkg.version
        };
        if (wmtsParams.url.includes("/private/")) {
            // si l'url est privée
            // Ajout de la clef d'API fournie par l'utilisateur en prioritée
            // ou récupérée depuis la configuration
            var key = options.apiKey || apiKey;
            if (!key) {
                throw new Error("ERROR : WMS Layer apiKey cannot be found in Geoportal Configuration.");
            }
            urlParams["apikey"] = key;
        }

        var wmtsSourceOptions = {
            // tracker extension openlayers
            // FIXME : gp-ext version en mode AMD
            url : Gp.Helper.normalyzeUrl(wmtsParams.url.replace(/(http|https):\/\//, protocol), urlParams, false),
            version : wmtsParams.version,
            style : wmtsParams.styles,
            format : wmtsParams.format,
            projection : wmtsParams.projection,
            maxZoom : LayerUtils.getZoomLevelFromScaleDenominator(wmtsParams.minScale),
            layer : options.layer,
            matrixSet : wmtsParams.TMSLink,
            tileGrid : new WMTSTileGrid({
                resolutions : wmtsParams.nativeResolutions,
                matrixIds : wmtsParams.matrixIds,
                origin : [Object.values(wmtsParams.tileMatrices)[0].topLeftCorner.x, Object.values(wmtsParams.tileMatrices)[0].topLeftCorner.y]
            }),
            crossOrigin : "anonymous"
        };

        // récupération des autres paramètres passés par l'utilisateur
        Utils.mergeParams(wmtsSourceOptions, options.olParams);

        // on surcharge les originators (non récupérés depuis configuration de la couche)
        if (options.olParams && !wmtsParams.originators) {
            wmtsParams.originators = options.olParams.attributions;
        }
        
        // returns a WMTS object, that inherits from WMTSExtended.
        super(wmtsSourceOptions);

        // add originators to layer source (to be updated by Originators control)
        this._originators = wmtsParams.originators;

        // add legends and metadata (to be added to LayerSwitcher control)
        this._legends = options.legends || wmtsParams.legends;
        this._metadata = options.metadata || wmtsParams.metadata;
        this._description = options.description || wmtsParams.description;
        this._title = options.title || wmtsParams.title;
        this._quicklookUrl = options.quicklookUrl || wmtsParams.quicklookUrl;

        this.name = options.layer;
        this.service = "WMTS";
        
        return this;
    }

};

export default SourceWMTS;

// Expose SourceWMTS as ol.source.GeoportalWMTS. (for a build bundle)
if (window.ol && window.ol.source) {
    window.ol.source.GeoportalWMTS = SourceWMTS;
}
