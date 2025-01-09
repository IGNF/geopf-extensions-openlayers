import Gp from "geoportal-access-lib";
// import OpenLayers
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { tile as olLoadingstrategyTile } from "ol/loadingstrategy";
import * as olTilegrid from "ol/tilegrid";
// import local
import Utils from "../Utils/Helper";
import Logger from "../Utils/LoggerByDefault";
import Config from "../Utils/Config";
// package.json (extract version)
import Pkg from "../../../package.json";

var logger = Logger.getLogger("sourcewfs");

/**
 * @classdesc
 * Geoportal tile WMS source creation (inherit from ol.source.TileWMS)
 *
 * @constructor
 * @alias ol.source.GeoportalWFS
 * @type {ol.source.GeoportalWFS}
 * @extends {ol.source.Vector}
 * @param {Object} options            - options for function call.
 * @param {String} options.layer      - Layer name (e.g. "")
 * @param {Number} [options.maxFeatures] - maximum features (max: 5000) 
 * @param {Object} [options.configuration] - configuration (cf. example) 
 * @param {Boolean} [options.ssl]     - if set true, enforce protocol https (only for nodejs)
 * @param {String} [options.apiKey]   - Access key to Geoportal platform
 * @param {Array} [options.legends]   - Legends objects associated to the layer
 * @param {Array} [options.metadata]   - Metadata objects associated to the layer
 * @param {String} [options.title]   - title of the layer
 * @param {String} [options.description]   - description of the layer
 * @param {String} [options.quicklookUrl]   - quicklookUrl of the layer
 * @param {Object} [options.olParams] - other options for ol.source.Vector function (see {@link http://openlayers.org/en/latest/apidoc/ol.source.Vector.html ol.source.Vector})
 * @example
 * var sourceWFS = new ol.source.GeoportalWFS({
 *      layer: "",
 *      maxFeatures: 500,
 *      olParams: {}
 * });
 */
var SourceWFS = class SourceWFS extends VectorSource {

    constructor (options) {
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
        var wfsParams = (layerCfg) ? layerCfg.params : null;
        var apiKey = options.apiKey;

        // 2 solutions pour la récupération des ressources utiles 
        // * soit depuis la configuration en option
        // * soit via la variable globale Gp.Config
        if (!layerCfg) {
            // Check if configuration is loaded
            if (!Config.isConfigLoaded()) {
                throw new Error("ERROR : contract key configuration has to be loaded to load Geoportal layers.");
            }

            var layerId = Config.configuration.getLayerId(options.layer, "WFS");
            if (!layerId) {
                throw new Error(`ERROR : WFS Layer ID ${options.layer} cannot be found in Geoportal Configuration. Make sure that this resource is included in your contract key.`);
            }

            layerCfg = Config.configuration.getLayerConf(layerId);
            if (!layerCfg) {
                throw new Error("ERROR : WFS Layer configuration cannot be found in Geoportal.");
            }

            apiKey = Config.configuration.getLayerKey(layerId)[0];
            wfsParams = Config.configuration.getLayerParams(options.layer, "WFS");
        }

        // si ssl = false on fait du http
        // par défaut, ssl = true, on fait du https
        var protocol = options.ssl === false ? "http://" : "https://";

        var urlParams = {
            "gp-ol-ext" : Pkg.olExtVersion || Pkg.version
        };
        if (wfsParams.url.includes("/private/")) {
            // si l'url est privée
            // Ajout de la clef d'API fournie par l'utilisateur en prioritée
            // ou récupérée depuis la configuration
            var key = options.apiKey || apiKey;
            if (!key) {
                throw new Error("ERROR : WFS Layer apiKey cannot be found in Geoportal Configuration.");
            }
            urlParams["apikey"] = key;
        }

        var loadFeatures = (self, url, success, failure) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            const onError = function () {
                self.removeLoadedExtent(extent);
                failure();
            };
            xhr.onerror = onError;
            xhr.onload = function () {
                if (xhr.status == 200) {
                    var response = JSON.parse(xhr.responseText);
                    const features = self.getFormat().readFeatures(response);
                    self.addFeatures(features);
                    success(features);
                    // next page ?
                    // "links": [
                    //     {
                    //         "title": "next page",
                    //         "type": "application/json",
                    //         "rel": "next",
                    //         "href": "https://data.geopf.fr/wfs/wfs?GP-OL-EXT=1.0.0-beta.0-260&TYPENAME=BDTOPO_V3%3Abatiment&REQUEST=GetFeature&BBOX=261720.38484844193%2C6249491.432596011%2C262943.3773010048%2C6250714.425048574%2CEPSG%3A3857&SRSNAME=EPSG%3A3857&OUTPUTFORMAT=application%2Fjson&VERSION=2.0.0&MAXFEATURES=500&COUNT=500&SERVICE=WFS&STARTINDEX=500"
                    //     }
                    // ],
                    if (response.links) {
                        for (let i = 0; i < response.links.length; i++) {
                            const link = response.links[i];
                            if (link.rel === "next") {
                                loadFeatures(self, link.href, success, failure);
                            }
                        }
                    }
                } else {
                    onError();
                }
            };
            xhr.send();
        };
        var wfsSourceOptions = {
            format : new GeoJSON(),
            loader : function (extent, resolution, projection, success, failure) {
                var self = this;
                const maxFeatures = options.maxFeatures;
                const layerName = options.layer;
                const proj = projection.getCode();
                const url = Gp.Helper.normalyzeUrl(wfsParams.url.replace(/(http|https):\/\//, protocol), urlParams, false) +
                    "&SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&" +
                    "typename=" + layerName + "&" +
                    "outputFormat=application/json&srsname=" + proj + "&" +
                    "bbox=" + extent.join(",") + "," + proj
                    + "&maxFeatures=" + maxFeatures + "&count=" + maxFeatures + "&startIndex=0";

                loadFeatures(self, url, success, failure);
            },
            strategy : olLoadingstrategyTile(olTilegrid.createXYZ({
                minZoom : options.olParams.minZoom || 15, 
                maxZoom : options.olParams.maxZoom || 21, 
                tileSize : 512
            })),
            crossOrigin : "anonymous"
        };

        // récupération des autres paramètres passés par l'utilisateur
        Utils.mergeParams(wfsSourceOptions, options.olParams);

        // on surcharge les originators (non récupérés depuis configuration de la couche)
        if (options.olParams && !wfsParams.originators) {
            wfsParams.originators = options.olParams.attributions;
        }

        // returns a WMS object, that inherits from ol.source.TileWMS.
        super(wfsSourceOptions);

        // save originators (to be updated by Originators control)
        this._originators = wfsParams.originators;

        // save legends and metadata (to be added to LayerSwitcher control)
        this._legends = options.legends || wfsParams.legends;
        this._metadata = options.metadata || wfsParams.metadata;
        this._title = options.title || wfsParams.title;
        this._description = options.description || wfsParams.description;
        this._quicklookUrl = options.quicklookUrl || wfsParams.quicklookUrl;

        this.name = options.layer;
        this.service = "WFS";

        return this;
    }
    
};

export default SourceWFS;

// Expose SourceWFS as ol.source.GeoportalWFTS. (for a build bundle)
if (window.ol && window.ol.source) {
    window.ol.source.GeoportalWFS = SourceWFS;
}