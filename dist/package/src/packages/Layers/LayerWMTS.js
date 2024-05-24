// import openlayers
import { get as olGetProj } from "ol/proj";
import TileLayer from "ol/layer/Tile";
// import local
import Utils from "../Utils/Helper";
import Config from "../Utils/Config";
// import local with ol dependencies
import SourceWMTS from "./SourceWMTS";

/**
 * @classdesc
 * Geoportal LayerWMTS source creation (inherit from ol.layer.Tile)
 *
 * @constructor
 * @extends {ol.layer.Tile}
 * @alias ol.layer.GeoportalWMTS
 * @type {ol.layer.GeoportalWMTS}
 * @param {Object} options            - options for function call.
 * @param {String} options.layer      - Layer name (e.g. "ORTHOIMAGERY.ORTHOPHOTOS")
 * @param {Object} [options.configuration] - configuration (cf. example) 
 * @param {Boolean} [options.ssl]     - if set true, enforce protocol https (only for nodejs)
 * @param {String} [options.apiKey]   - Access key to Geoportal platform
 * @param {Object} [options.olParams] - other options for ol.layer.Tile function (see {@link http://openlayers.org/en/latest/apidoc/ol.layer.Tile.html ol.layer.Tile})
 * @param {Object} [options.olParams.sourceParams] - other options for ol.source.WMTS function (see {@link http://openlayers.org/en/latest/apidoc/ol.source.WMTS.html ol.source.WMTS})
 * @example
 * var layerWMTS = new ol.layer.GeoportalWMTS({
 *      layer  : "ORTHOIMAGERY.ORTHOPHOTOS"
 * });
 * 
 * // Ex. configuration object for WMTS Layer
 * {
*    name: "ORTHOIMAGERY.ORTHOPHOTOS",
*    title: "Photographies aériennes",
*    description: "Photographies aériennes",
*    globalConstraint: {
*        maxScaleDenominator: 559082264.0287179,
*        minScaleDenominator: 266.5911979812229,
*        bbox: {
*            left: -180,
*            right: 180,
*            top: 89,
*            bottom: -89
*        }
*    },
*    serviceParams: {
*        id: "OGC:WMTS",
*        version: "1.0.0",
*        serverUrl: {
*            full: "https://data.geopf.fr/wmts"
*        }
*    },
*    defaultProjection: "EPSG:3857",
*    wmtsOptions: {
*        tileMatrixSetLink: "PM",
*        tileMatrixSetLimits: {
*            (...)    
*        }
*    },
*    styles: [{
*        name: "normal",
*        title: "Légende générique",
*        current: true,
*        url: null
*    }],
*    legends: [{
*        format: "image/jpeg",
*        url: "https://data.geopf.fr/annexes/ressources/legendes/LEGEND.jpg",
*        minScaleDenominator: "200"
*    }],
*    formats: [{
*        name: "image/jpeg",
*        current: true
*    }]
* }
 */
var LayerWMTS = class LayerWMTS extends TileLayer {

    /**
     * See {@link ol.layer.GeoportalWMTS}
     * @module LayerWMTS
     * @alias module:~layers/GeoportalWMTS
     * @param {*} options - options
     * @example
     * import LayerWMTS from "gpf-ext-ol/layers/LayerWMTS
     * ou 
     * import { LayerWMTS } from "gpf-ext-ol"
     */
    constructor (options) {
        // if (!(this instanceof LayerWMTS)) {
        //     throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        // }

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

        // 2 solutions pour la récupération des ressources utiles 
        // * soit depuis la configuration en option
        // * soit via la variable globale Gp.Config chargée
        if (!layerCfg) {
            // Check if configuration is loaded
            if (!Config.isConfigLoaded()) {
                throw new Error("ERROR : contract key configuration has to be loaded to load Geoportal layers.");
            }
            // récupération des autres paramètres nécessaires à la création de la layer
            var layerId = Config.configuration.getLayerId(options.layer, "WMTS");
            layerCfg = Config.configuration.getLayerConf(layerId);
            if (!layerCfg) {
                throw new Error("ERROR : Layer ID not found into the catalogue !?");
            }
        }

        // création de la source WMTS
        var olSourceParams;
        if (options.olParams && options.olParams.sourceParams) {
            olSourceParams = options.olParams.sourceParams;
        }
        var wmtsSource = new SourceWMTS({
            layer : options.layer,
            configuration : options.configuration,
            ssl : options.ssl,
            apiKey : options.apiKey,
            olParams : olSourceParams
        });

        var layerTileOptions = {
            source : wmtsSource
        };

        // si le param layer n'a pas été renseigné lors de la création de la source,
        // c'est que l'identifiant de la couche n'a pas été trouvé. on passe donc la recherche des paramètres.
        if (wmtsSource.getLayer() !== undefined) {
            if (layerCfg.globalConstraints && layerCfg.globalConstraints.projection) {
                /* INFO : désactivation temporaire de l'étendue, car certaines étendues (trop grandes ?)
                provoquent quelques bugs d'affichage (zoom > 16 par exemple) */
                // récupération de l'étendue (en EPSG:4326), et reprojection dans la proj de la couche
                // var geobbox = [
                //     layerCfg.globalConstraints.extent.left,
                //     layerCfg.globalConstraints.extent.bottom,
                //     layerCfg.globalConstraints.extent.right,
                //     layerCfg.globalConstraints.extent.top
                // ];
                // layerTileOptions.extent = ol.proj.transformExtent(geobbox, "EPSG:4326", layerCfg.globalConstraints.projection);

                // récupération des résolutions min et max
                var p;
                // on récupère tout d'abord la projection
                if (typeof layerCfg.globalConstraints.projection === "string") {
                    p = olGetProj(layerCfg.globalConstraints.projection);
                }
                // puis, selon l'unité de la projection, on calcule la résolution correspondante
                if (p && p.getUnits()) {
                    if (p.getUnits() === "m") {
                        /* fixme : fix temporaire pour gérer les min/max scaledenominator qui sont arrondis dans la configuration !
                         * on les arrondit respectivement à l'unité inférieure et supérieure
                         * pour que les couches soient bien disponibles aux niveaux de zoom correspondants */
                        // info : 1 pixel = 0.00028 m
                        layerTileOptions.minResolution = (layerCfg.globalConstraints.minScale - 1) * 0.00028;
                        layerTileOptions.maxResolution = (layerCfg.globalConstraints.maxScale + 1) * 0.00028;
                    } else if (p.getUnits() === "degrees") {
                        /* fixme : fix temporaire pour gérer les min/max scaledenominator qui sont arrondis dans la configuration !
                         * on les arrondit respectivement à l'unité inférieure et supérieure
                         * pour que les couches soient bien disponibles aux niveaux de zoom correspondants */
                        // info : 6378137 * 2 * pi / 360 = rayon de la terre (ellipsoide WGS84)
                        layerTileOptions.minResolution = (layerCfg.globalConstraints.minScale - 1) * 0.00028 * 180 / (Math.PI * 6378137);
                        layerTileOptions.maxResolution = (layerCfg.globalConstraints.maxScale + 1) * 0.00028 * 180 / (Math.PI * 6378137);
                    }
                }
            }
        }

        // récupération des autres paramètres passés par l'utilisateur
        Utils.mergeParams(layerTileOptions, options.olParams);

        // création d'une ol.layer.Tile avec les options récupérées ci-dessus.
        super(layerTileOptions);
        
        this.name = options.layer;
        this.service = "WMTS";

        return this;
    }


};

export default LayerWMTS;

// Expose LayerWMTS as ol.layerGeoportalWMTS. (for a build bundle)
if (window.ol && window.ol.layer) {
    window.ol.layer.GeoportalWMTS = LayerWMTS;
}
