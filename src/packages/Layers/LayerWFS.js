import VectorLayer from "ol/layer/Vector";
import {
    Fill,
    Stroke,
    Style
} from "ol/style";
// import local
import Utils from "../Utils/Helper";
import Config from "../Utils/Config";
// import local with ol dependencies
import SourceWFS from "./SourceWFS";

const MAXFEATURES = 500;
const MINZOOMDEFAULT = 15;
const MAXZOOMDEFAULT = 21;
const STYLEBYDEFAULT = new Style({
    stroke : new Stroke({
        color : "rgba(0, 0, 255, 1.0)",
        width : 2,
    }),
    fill : new Fill({
        color : "rgba(0, 0, 255, 0.5)"
    }),
});

/**
 * @typedef {Object} LayerWFSOptions
 * @property {string} layer - Nom de la couche (ex : "ORTHOIMAGERY.ORTHOPHOTOS")
 * @property {Number} [maxFeatures] - Maximum features (max: 5000) 
 * @property {Object} [configuration] - Configuration de la couche
 * @property {boolean} [ssl] - Forcer le protocole https (pour nodejs)
 * @property {string} [apiKey] - Clé d'accès à la plateforme
 * @property {Object} [olParams] - Options supplémentaires pour ol.layer.Vector {@link https://openlayers.org/en/latest/apidoc/module-ol_layer_Vector-VectorLayer.html ol.layer.Vector options}
 * et options supplémentaires pour ol.source.Vector dans olParams.sourceParams {@link https://openlayers.org/en/latest/apidoc/module-ol_source_Vector-VectorSource.html ol.source.Vector options}
 */

/**
 * @classdesc
 * Geoportal LayerWMS source creation (inherit from ol.layer.Tile)
 *
 * @alias ol.layer.GeoportalWFS
 * @module GeoportalWFS
*/
class LayerWFS extends VectorLayer {
    
    /**
     * @constructor
     * @param {LayerWFSOptions} options            - options for function call.
     * @example
     * var layerWFS = new ol.layer.GeoportalWFS({
     *      layer  : "BDTOPO_V3:batiment",
     *      maxFeatures: 500,
     *      olParams : {
     *          minZoom: 15,
     *          maxZoom: 21,
     *          style: new ol.style.Style(...),
     *          sourceParams: {}
     *      }
     * });
     * 
     * layerWFS.getLegends();
     * layerWFS.getMetadata();
     * layerWFS.getTitle();
     * layerWFS.getDescription();
     * layerWFS.getQuicklookUrl();
     * layerWFS.getOriginators();
     */
    constructor (options) {
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

        if (!layerCfg) {
            // Check if configuration is loaded
            if (!Config.isConfigLoaded()) {
                throw new Error("ERROR : contract key configuration has to be loaded to load Geoportal layers.");
            }
            // récupération des autres paramètres nécessaires à la création de la layer
            var layerId = Config.configuration.getLayerId(options.layer, "WFS");
            layerCfg = Config.configuration.getLayerConf(layerId);
            if (!layerCfg) {
                throw new Error("ERROR : Layer ID not found into the catalogue !?");
            }
        }

        // création de la source WFS
        var olSourceParams;
        if (options.olParams && options.olParams.sourceParams) {
            olSourceParams = options.olParams.sourceParams;
        }

        var wfsSource = new SourceWFS({
            layer : options.layer,
            configuration : options.configuration,
            maxFeatures : options.maxFeatures || MAXFEATURES,
            ssl : options.ssl,
            apiKey : options.apiKey,
            olParams : olSourceParams || {
                minZoom : MINZOOMDEFAULT,
                maxZoom : MAXZOOMDEFAULT
            }
        });

        var layerVectorOptions = {
            source : wfsSource
        };

        // récupération des autres paramètres passés par l'utilisateur
        // avec application des contraintes
        if (!options.olParams) {
            options.olParams = {
                minZoom : MINZOOMDEFAULT,
                maxZoom : MAXZOOMDEFAULT,
                style : STYLEBYDEFAULT
            };
        } else {
            Utils.mergeParams({
                minZoom : MINZOOMDEFAULT,
                maxZoom : MAXZOOMDEFAULT,
                style : STYLEBYDEFAULT
            }, options.olParams);
        }
        Utils.mergeParams(layerVectorOptions, options.olParams);

        // création d'une ol.layer.Vector avec les options récupérées ci-dessus.
        super(layerVectorOptions);

        this.name = options.layer;
        this.service = "WFS";
        this.config = layerCfg;

        return this;
    }

    /**
     * Get configuration
     * @returns {Object} - configuration
     */
    getConfiguration () {
        return this.config;
    }
    
    /**
     * Get legends
     * @returns  {Array} - legends
     */
    getLegends () {
        return this.getSource()._legends;
    }

    /**
     * Get metadata
     * @returns  {Array} - metadata
     */
    getMetadata () {
        return this.getSource()._metadata;
    }

    /**
     * Get description
     * @returns {String} - description
     */
    getDescription () {
        return this.getSource()._description;
    }

    /**
     * Get title
     * @returns {String} - title
     */
    getTitle () {
        return this.getSource()._title;
    }

    /**
     * Get quicklook url
     * @returns {String} - quicklook
     */
    getQuicklookUrl () {
        return this.getSource()._quicklookUrl;
    }

    /**
     * Get originators
     * @returns {Array} - originators
     */
    getOriginators () {
        return this.getSource()._originators;
    }

};

export default LayerWFS;

// Expose LayerWFS as ol.layerGeoportalWFS. (for a build bundle)
if (window.ol && window.ol.layer) {
    window.ol.layer.GeoportalWFS = LayerWFS;
}