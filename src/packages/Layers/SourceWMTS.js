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
// import Pkg from "../../../package.json";

var logger = Logger.getLogger("sourcewmts");

/**
 * Template par defaut de la query string de l'url WMTS
 * (reproduit les KVP historiques de SourceWMTS)
 * - les placeholders en minuscules ({version}, {style}, {format}, {tilematrixset}, {apikey})
 *   sont résolus à la construction de la source
 * - les placeholders OGC ({Layer}, {TileMatrix}, {TileCol}, {TileRow})
 *   sont résolus par OpenLayers (requestEncoding : "REST")
 */
const DEFAULT_WMTS_URL_TEMPLATE = "Service=WMTS&Request=GetTile&Version={version}&Layer={Layer}&Style={style}&Format={format}&TileMatrixSet={tilematrixset}&TileMatrix={TileMatrix}&TileCol={TileCol}&TileRow={TileRow}";

/**
 * @classdesc
 * Geoportal WMTS source creation (inherit from ol.source.WMTS)
 *
 * @alias ol.source.GeoportalWMTS
 * @module GeoportalWMTS
 */
class SourceWMTS extends WMTSExtended {

    /**
     * 
     * @constructor
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
    * @param {String} [options.thumbnail]   - thumbnail of the layer
    * @param {String} [options.producer]   - producer of the layer
    * @param {String} [options.urlTemplate] - template of the WMTS url query string, useful to change the order or the case of the KVP.
    *      The placeholders {version}, {style}, {format}, {tilematrixset} and {apikey} are resolved at source creation,
    *      whereas the OGC placeholders {Layer}, {TileMatrix}, {TileCol} and {TileRow} are resolved by OpenLayers (REST request encoding).
    *      By default : "Service=WMTS&Request=GetTile&Version={version}&Layer={Layer}&Style={style}&Format={format}&TileMatrixSet={tilematrixset}&TileMatrix={TileMatrix}&TileCol={TileCol}&TileRow={TileRow}"
    * @param {Object} [options.olParams] - other options for ol.source.WMTS function (see {@link http://openlayers.org/en/latest/apidoc/ol.source.WMTS.html ol.source.WMTS})
    * @example
    * var sourceWMTS = new ol.source.GeoportalWMTS({
    *      layer  : "ORTHOIMAGERY.ORTHOPHOTOS"
    * });
    * // avec un template personnalisé (ordre et casse des KVP modifiés)
    * var sourceWMTS = new ol.source.GeoportalWMTS({
    *      layer : "ORTHOIMAGERY.ORTHOPHOTOS",
    *      urlTemplate : "service=WMTS&request=GetTile&version={version}&layer={Layer}&style={style}&format={format}&tilematrixset={tilematrixset}&tilematrix={TileMatrix}&tilerow={TileRow}&tilecol={TileCol}"
    * });
     */
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

        // Ex de normalisation de l'url WMTS selon recommandation OGC
        // https://data.geopf.fr/wmts?
        //   Service=WMTS&Request=GetTile&Version=1.0.0&
        //   Layer=ORTHOIMAGERY.ORTHOPHOTOS&
        //   Style=normal&
        //   Format=image/jpeg&
        //   TileMatrixSet=PM_0_19&
        //   TileMatrix=6&TileCol=32&TileRow=22
        //
        // L'ordre et la casse des KVP sont modifiables via options.urlTemplate
        var urlTemplate = options.urlTemplate || DEFAULT_WMTS_URL_TEMPLATE;

        // valeurs des placeholders résolus à la construction de la source
        var templateValues = {
            version : options.olParams && options.olParams.version !== undefined ? options.olParams.version : wmtsParams.version,
            style : options.olParams && options.olParams.style !== undefined ? options.olParams.style : wmtsParams.styles,
            format : options.olParams && options.olParams.format !== undefined ? options.olParams.format : wmtsParams.format,
            tilematrixset : options.olParams && options.olParams.matrixSet !== undefined ? options.olParams.matrixSet : wmtsParams.TMSLink
        };

        if (wmtsParams.url.includes("/private/")) {
            // si l'url est privée
            // Ajout de la clef d'API fournie par l'utilisateur en prioritée
            // ou récupérée depuis la configuration
            var key = options.apiKey || apiKey;
            if (!key) {
                throw new Error("ERROR : WMTS Layer apiKey cannot be found in Geoportal Configuration.");
            }
            templateValues.apikey = key;
            // on ajoute le KVP apikey au template s'il n'y figure pas déjà
            if (!/\{apikey\}/i.test(urlTemplate) && !/apikey=/i.test(urlTemplate)) {
                urlTemplate += "&apikey={apikey}";
            }
        }

        // résolution des placeholders (insensible à la casse) ;
        // les placeholders OGC ({Layer}, {TileMatrix}, {TileCol}, {TileRow})
        // sont laissés tels quels pour OpenLayers (requestEncoding : "REST")
        var urlQuery = urlTemplate.replace(/\{(version|style|format|tilematrixset|apikey)\}/gi, function (match, name) {
            var value = templateValues[name.toLowerCase()];
            return value !== undefined ? value : match;
        });

        var wmtsSourceOptions = {
            url : Gp.Helper.normalyzeUrl(wmtsParams.url.replace(/(http|https):\/\//, protocol), urlQuery, false),
            requestEncoding : "REST",
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
        this._legends = options.legends || layerCfg.legends;
        this._metadata = options.metadata || layerCfg.metadata || layerCfg.metadata_urls;
        this._description = options.description || layerCfg.description;
        this._title = options.title || layerCfg.title;
        this._quicklookUrl = options.quicklookUrl || layerCfg.quicklookUrl;
        this._thumbnail = options.thumbnail || layerCfg.thumbnail;
        this._producer = options.producer || layerCfg.producer;

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
