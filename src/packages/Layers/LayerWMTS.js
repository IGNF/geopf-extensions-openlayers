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
* layerWMTS.getLegends();
* layerWMTS.getMetadata();
* layerWMTS.getTitle();
* layerWMTS.getDescription();
* layerWMTS.getQuicklookUrl();
* layerWMTS.getOriginators();
* 
* // Ex. configuration object for WMTS Layer
* {
* "name" : "GEOGRAPHICALGRIDSYSTEMS.MAPS.OVERVIEW",
* "globalConstraint" : {
*     "maxScaleDenominator" : 279541132.01435894,
*     "minScaleDenominator" : 2183915.0938621787,
*     "bbox" : {
*         "left" : -179.5,
*         "right" : 179.5,
*         "top" : 75,
*         "bottom" : -75
*     }
* },
* "params" : {
*     "url" : "https:*data.geopf.fr/wmts",
*     "styles" : "normal",
*     "version" : "1.0.0",
*     "format" : "image/jpeg",
*     "projection" : "EPSG:3857",
*     "minScale" : 2183915.0938621787,
*     "maxScale" : 279541132.01435894,
*     "extent" : {
*         "left" : -179.5,
*         "right" : 179.5,
*         "top" : 75,
*         "bottom" : -75
*     },
*     "legends" : [
*         {
*             "format" : "image/jpeg",
*             "url" : "https:*data.geopf.fr/annexes/ressources/legendes/LEGEND.jpg",
*             "minScaleDenominator" : "200"
*         }
*     ],
*     "title" : "Carte Mondiale pour la mini-vue",
*     "description" : "Carte Mondiale pour la mini-vue",
*     "tileMatrixSetLimits" : {
*         "1" : {
*             "minTileRow" : "0",
*             "maxTileRow" : "1",
*             "minTileCol" : "0",
*             "maxTileCol" : "1"
*         },
*         "2" : {
*             "minTileRow" : "0",
*             "maxTileRow" : "3",
*             "minTileCol" : "0",
*             "maxTileCol" : "3"
*         },
*         "3" : {
*             "minTileRow" : "1",
*             "maxTileRow" : "6",
*             "minTileCol" : "0",
*             "maxTileCol" : "7"
*         },
*         "4" : {
*             "minTileRow" : "2",
*             "maxTileRow" : "13",
*             "minTileCol" : "0",
*             "maxTileCol" : "15"
*         },
*         "5" : {
*             "minTileRow" : "5",
*             "maxTileRow" : "26",
*             "minTileCol" : "0",
*             "maxTileCol" : "31"
*         },
*         "6" : {
*             "minTileRow" : "11",
*             "maxTileRow" : "52",
*             "minTileCol" : "0",
*             "maxTileCol" : "63"
*         },
*         "7" : {
*             "minTileRow" : "22",
*             "maxTileRow" : "105",
*             "minTileCol" : "0",
*             "maxTileCol" : "127"
*         },
*         "8" : {
*             "minTileRow" : "45",
*             "maxTileRow" : "210",
*             "minTileCol" : "0",
*             "maxTileCol" : "255"
*         }
*     },
*     "TMSLink" : "PM_1_8",
*     "matrixIds" : [
*         "1",
*         "2",
*         "3",
*         "4",
*         "5",
*         "6",
*         "7",
*         "8"
*     ],
*     "tileMatrices" : {
*         "1" : {
*             "matrixId" : "1",
*             "matrixHeight" : 2,
*             "matrixWidth" : 2,
*             "scaleDenominator" : 279541132.01435894,
*             "tileHeight" : 256,
*             "tileWidth" : 256,
*             "topLeftCorner" : {
*                 "x" : -20037508.3427892,
*                 "y" : 20037508.3427892
*             }
*         },
*         "2" : {
*             "matrixId" : "2",
*             "matrixHeight" : 4,
*             "matrixWidth" : 4,
*             "scaleDenominator" : 139770566.0071793,
*             "tileHeight" : 256,
*             "tileWidth" : 256,
*             "topLeftCorner" : {
*                 "x" : -20037508.3427892,
*                 "y" : 20037508.3427892
*             }
*         },
*         "3" : {
*             "matrixId" : "3",
*             "matrixHeight" : 8,
*             "matrixWidth" : 8,
*             "scaleDenominator" : 69885283.00358965,
*             "tileHeight" : 256,
*             "tileWidth" : 256,
*             "topLeftCorner" : {
*                 "x" : -20037508.3427892,
*                 "y" : 20037508.3427892
*             }
*         },
*         "4" : {
*             "matrixId" : "4",
*             "matrixHeight" : 16,
*             "matrixWidth" : 16,
*             "scaleDenominator" : 34942641.50179486,
*             "tileHeight" : 256,
*             "tileWidth" : 256,
*             "topLeftCorner" : {
*                 "x" : -20037508.3427892,
*                 "y" : 20037508.3427892
*             }
*         },
*         "5" : {
*             "matrixId" : "5",
*             "matrixHeight" : 32,
*             "matrixWidth" : 32,
*             "scaleDenominator" : 17471320.75089743,
*             "tileHeight" : 256,
*             "tileWidth" : 256,
*             "topLeftCorner" : {
*                 "x" : -20037508.3427892,
*                 "y" : 20037508.3427892
*             }
*         },
*         "6" : {
*             "matrixId" : "6",
*             "matrixHeight" : 64,
*             "matrixWidth" : 64,
*             "scaleDenominator" : 8735660.375448715,
*             "tileHeight" : 256,
*             "tileWidth" : 256,
*             "topLeftCorner" : {
*                 "x" : -20037508.3427892,
*                 "y" : 20037508.3427892
*             }
*         },
*         "7" : {
*             "matrixId" : "7",
*             "matrixHeight" : 128,
*             "matrixWidth" : 128,
*             "scaleDenominator" : 4367830.1877243575,
*             "tileHeight" : 256,
*             "tileWidth" : 256,
*             "topLeftCorner" : {
*                 "x" : -20037508.3427892,
*                 "y" : 20037508.3427892
*             }
*         },
*         "8" : {
*             "matrixId" : "8",
*             "matrixHeight" : 256,
*             "matrixWidth" : 256,
*             "scaleDenominator" : 2183915.0938621787,
*             "tileHeight" : 256,
*             "tileWidth" : 256,
*             "topLeftCorner" : {
*                 "x" : -20037508.3427892,
*                 "y" : 20037508.3427892
*             }
*         }
*     },
*     "nativeResolutions" : [
*         "78271.51696402048",
*         "39135.75848201023",
*         "19567.87924100512",
*         "9783.939620502561",
*         "4891.969810251280",
*         "2445.984905125640",
*         "1222.992452562820",
*         "611.4962262814100"
*     ]
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
            if (layerCfg.globalConstrainWFSts && layerCfg.globalConstraints.projection) {
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
     * @returns {Array} - legends
     */
    getLegends () {
        return this.getSource()._legends;
    }

    /**
     * Get metadata
     * @returns {Array} - metadata
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

export default LayerWMTS;

// Expose LayerWMTS as ol.layerGeoportalWMTS. (for a build bundle)
if (window.ol && window.ol.layer) {
    window.ol.layer.GeoportalWMTS = LayerWMTS;
}
