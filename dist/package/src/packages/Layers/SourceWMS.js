import Gp from "geoportal-access-lib";
// import OpenLayers
import TileWMSSource from "ol/source/TileWMS";
// import local
import Utils from "../Utils/Helper";
import Logger from "../Utils/LoggerByDefault";
import Config from "../Utils/Config";
// package.json (extract version)
import Pkg from "../../../package.json";

var logger = Logger.getLogger("sourcewms");

/**
 * @classdesc
 * Geoportal tile WMS source creation (inherit from ol.source.TileWMS)
 *
 * @constructor
 * @alias ol.source.GeoportalWMS
 * @type {ol.source.GeoportalWMS}
 * @extends {ol.source.TileWMS}
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
 * @param {Object} [options.olParams] - other options for ol.source.TileWMS function (see {@link http://openlayers.org/en/latest/apidoc/ol.source.TileWMS.html ol.source.TileWMS})
 * @example
 * var sourceWMS = new ol.source.GeoportalWMS({
 *      layer  : "ORTHOIMAGERY.ORTHOPHOTOS"
 * });
 */
var SourceWMS = class SourceWMS extends TileWMSSource {

    constructor (options) {
        // if (!(this instanceof SourceWMS)) {
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
        var wmsParams = (layerCfg) ? layerCfg.params : null;
        var apiKey = options.apiKey;

        // 2 solutions pour la récupération des ressources utiles 
        // * soit depuis la configuration en option
        // * soit via la variable globale Gp.Config
        if (!layerCfg) {
            // Check if configuration is loaded
            if (!Config.isConfigLoaded()) {
                throw new Error("ERROR : contract key configuration has to be loaded to load Geoportal layers.");
            }

            var layerId = Config.configuration.getLayerId(options.layer, "WMS");
            if (!layerId) {
                throw new Error(`ERROR : WMS Layer ID ${options.layer} cannot be found in Geoportal Configuration. Make sure that this resource is included in your contract key.`);
            }

            layerCfg = Config.configuration.getLayerConf(layerId);
            if (!layerCfg) {
                throw new Error("ERROR : WMS Layer configuration cannot be found in Geoportal.");
            }

            apiKey = Config.configuration.getLayerKey(layerId)[0];
            wmsParams = Config.configuration.getLayerParams(options.layer, "WMS");
        }

        // si ssl = false on fait du http
        // par défaut, ssl = true, on fait du https
        var protocol = options.ssl === false ? "http://" : "https://";

        var urlParams = {
            "gp-ol-ext" : Pkg.olExtVersion || Pkg.version
        };
        if (wmsParams.url.includes("/private/")) {
            // si l'url est privée
            // Ajout de la clef d'API fournie par l'utilisateur en prioritée
            // ou récupérée depuis la configuration
            var key = options.apiKey || apiKey;
            if (!key) {
                throw new Error("ERROR : WMS Layer apiKey cannot be found in Geoportal Configuration.");
            }
            urlParams["apikey"] = key;
        }

        var wmsSourceOptions = {
            // tracker extension openlayers
            url : Gp.Helper.normalyzeUrl(wmsParams.url.replace(/(http|https):\/\//, protocol), urlParams, false),
            params : {
                SERVICE : "WMS",
                LAYERS : options.layer,
                VERSION : wmsParams.version,
                STYLES : wmsParams.styles,
                FORMAT : wmsParams.format
            },
            crossOrigin : "anonymous"
            // ,
            // attributions : [
            //     new ol.Attribution({
            //         html : "<a class='gp-control-attribution-link' target='_blank' href='http://www.ign.fr'><img class='gp-control-attribution-image' src='http://wxs.ign.fr/static/logos/IGN/IGN.gif' title='Institut national de l\'information géographique et forestière' style='height: 30px; width: 30px;'></a>"
            //     })
            // ]
        };

        // récupération des autres paramètres passés par l'utilisateur
        Utils.mergeParams(wmsSourceOptions, options.olParams);

        // on surcharge les originators (non récupérés depuis configuration de la couche)
        if (options.olParams && !wmsParams.originators) {
            wmsParams.originators = options.olParams.attributions;
        }

        // returns a WMS object, that inherits from ol.source.TileWMS.
        super(wmsSourceOptions);

        // save originators (to be updated by Originators control)
        this._originators = wmsParams.originators;

        // save legends and metadata (to be added to LayerSwitcher control)
        this._legends = options.legends || wmsParams.legends;
        this._metadata = options.metadata || wmsParams.metadata;
        this._title = options.title || wmsParams.title;
        this._description = options.description || wmsParams.description;
        this._quicklookUrl = options.quicklookUrl || wmsParams.quicklookUrl;

        this.name = options.layer;
        this.service = "WMS";

        return this;
    }

};

export default SourceWMS;

// Expose SourceWMS as ol.source.GeoportalWMTS. (for a build bundle)
if (window.ol && window.ol.source) {
    window.ol.source.GeoportalWMS = SourceWMS;
}
