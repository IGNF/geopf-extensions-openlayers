// import openlayers
import VectorTileLayer from "ol/layer/VectorTile";
import VectorTileSource from "ol/source/VectorTile";
import TileJSONSource from "ol/source/TileJSON";
import MVT from "ol/format/MVT";
import { unByKey as observableUnByKey } from "ol/Observable";
// import olms : module ES6
import { applyStyle } from "ol-mapbox-style";
// import local
import Utils from "../Utils/Helper";
import Config from "../Utils/Config";

/**
* @classdesc
* Geoportal Layer Mapbox creation
*
* @constructor
* @extends {ol.layer.VectorTile}
* @alias ol.layer.GeoportalMapBox
* @type {ol.layer.GeoportalMapBox}
* @param {Object} options            - options for function call.
* @param {String} options.layer      - Layer name (e.g. "PLAN.IGN")
* @param {Object} [options.configuration] - configuration (cf. example) 
* @param {String} [options.style]    - Style name (e.g. "classique")
* @param {String} [options.source]   - Source name (e.g. "plan_ign")
* @param {Boolean} [options.ssl]     - if set true, enforce protocol https (only for nodejs)
* @param {Object} [settings] - other options for ol.layer.VectorTile function (see {@link https://openlayers.org/en/latest/apidoc/module-ol_layer_VectorTile-VectorTileLayer.html ol.layer.VectorTile})
* @example
* var LayerMapBox = new ol.layer.GeoportalMapBox({
*      layer  : "PLAN.IGN",
*      [style  : "classique",]
*      [source : "plan_ign",]
*      [ssl: true]
* }, {
*      opacity
*      visible
*      extent
*      declutter
*      ...
* });
* 
* // Ex. configuration object for TMS Layer
* "PLAN.IGN$GEOPORTAIL:GPP:TMS": {
*   "hidden": true,
*   "queryable": false,
*   "serviceParams": {
*     "id": "GPP:TMS",
*     "version": "1.0.0",
*     "serverUrl": {
*       "cartes": "https://wxs.ign.fr/cartes/geoportail/tms/1.0.0/"
*     }
*   },
*   "name": "PLAN.IGN",
*   "title": "Plan IGN",
*   "description": "BDUni tuilée",
*   "formats": [
*     {
*       "current": true,
*       "name": "application/x-protobuf"
*     }
*   ],
*   "styles": [
*     {
*       "name": "standard",
*       "title": "Style standard",
*       "current": true,
*       "url": "https://wxs.ign.fr/static/vectorTiles/styles/PLAN.IGN/essentiels/standard.json"
*     },
*     {
*       "name": "classique",
*       "title": "Style classique",
*       "current": true,
*       "url": "https://wxs.ign.fr/static/vectorTiles/styles/PLAN.IGN/essentiels/classique.json"
*     },
*     {
*       "name": "transparent",
*       "title": "Style transparent",
*       "current": true,
*       "url": "https://wxs.ign.fr/static/vectorTiles/styles/PLAN.IGN/essentiels/transparent.json"
*     },
*     {
*       "name": "accentue",
*       "title": "Style accentue",
*       "current": true,
*       "url": "https://wxs.ign.fr/static/vectorTiles/styles/PLAN.IGN/essentiels/accentue.json"
*     },
*     {
*       "name": "attenue",
*       "title": "Style attenue",
*       "current": true,
*       "url": "https://wxs.ign.fr/static/vectorTiles/styles/PLAN.IGN/essentiels/attenue.json"
*     },
*     {
*       "name": "gris",
*       "title": "Style en noir et blanc",
*       "current": false,
*       "url": "https://wxs.ign.fr/static/vectorTiles/styles/PLAN.IGN/essentiels/gris.json"
*     },
*     {
*       "name": "epure",
*       "title": "Style epure",
*       "current": true,
*       "url": "https://wxs.ign.fr/static/vectorTiles/styles/PLAN.IGN/essentiels/epure.json"
*     },
*     {
*       "name": "sans_toponymes",
*       "title": "Style sans toponymes",
*       "current": false,
*       "url": "https://wxs.ign.fr/static/vectorTiles/styles/PLAN.IGN/essentiels/sans_toponymes.json"
*     }
*   ],
*   "globalConstraint": {
*     "crs": null,
*     "bbox": {
*       "left": -724011.531917197,
*       "right": 1095801.237496279,
*       "top": 6672646.821182753,
*       "bottom": 5009377.0856973175
*     },
*     "minScaleDenominator": null,
*     "maxScaleDenominator": null
*   },
*   "quicklookUrl": "https://wxs.ign.fr/static/pictures/ign_carte2.jpg",
*   "layerId": "PLAN.IGN$GEOPORTAIL:GPP:TMS",
*   "defaultProjection": "EPSG:3857"
* }
*
*/
var LayerMapBox = class LayerMapBox extends VectorTileLayer {
    
    /**
     * See {@link ol.layer.GeoportalMapBox}
     * @module LayerMapBox
     * @alias module:~layers/GeoportalMapBox
     * @param {*} options - options
     * @param {*} [settings] - other settings
     * @example
     * import LayerMapBox from "gpf-ext-ol/layers/LayerMapBox"
     * ou 
     * import { LayerMapBox } from "gpf-ext-ol"
    */
    constructor (options, settings) {
        // if (!(this instanceof LayerMapBox)) {
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
        
        // si ssl = false on fait du http
        // par défaut, ssl = true, on fait du https
        var protocol = options.ssl === false ? "http://" : "https://";
        
        // WARNING :
        // on fait le choix de ne pas utiliser la clef apiKey pour checker 
        // les droits sur la ressource
        // car le service n'est pas securisé...
        
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

            // id de la ressource
            var layerId = options.layer + "$GEOPORTAIL:GPP:TMS";
            
            // récupération des ressources utiles depuis la configuration
            layerCfg = Config.configuration.getLayerConf(layerId);
            if (!layerCfg) {
                throw new Error("ERROR : Layer ID not found into the catalogue !?");
            }
        }

        var styleUrl = null;
        var styleTitle = "";
        var styleName = options.style;
        for (var i = 0; i < layerCfg.styles.length; i++) {
            var style = layerCfg.styles[i];
            // si le nom du style est en option, on le recherche...
            // sinon, on recherche le style par defaut !
            if (styleName && style.name === styleName) {
                styleUrl = style.url;
                styleTitle = style.title;
                break;
            } else {
                if (!styleName && style.current) {
                    styleName = style.name;
                    styleUrl = style.url;
                    styleTitle = style.title;
                    break;
                }
            }
        }
        
        if (!styleUrl) {
            throw new Error("ERROR : Style URL not found !?");
        }
        
        styleUrl.replace(/(http|https):\/\//, protocol);
        
        // création de la source
        var source = new VectorTileSource({
            state : "loading", // statut
            format : new MVT()
        });
        
        source._originators = layerCfg.originators;
        source._legends = layerCfg.legends;
        source._metadata = layerCfg.metadata;
        source._description = layerCfg.description;
        source._title = layerCfg.title + " (" + styleTitle + ")";
        source._quicklookUrl = layerCfg.quicklookUrl;
        
        // options definies sur ol.layer.VectorTile
        var layerVectorTileOptions = {
            source : source
        };
        
        // récupération des autres paramètres passés par l'utilisateur
        Utils.mergeParams(layerVectorTileOptions, settings);
        
        // on surcharge les originators (non récupérés depuis configuration de la couche)
        if (options.olParams && !layerCfg.originators) {
            source._originators = options.olParams.attributions;
        }
        
        // création d'une ol.layer.VectorTile avec les options récupérées ci-dessus.
        super(layerVectorTileOptions);
        
        this.name = options.layer;
        this.service = "TMS";
        this.protocol = protocol;
        this.sourceId = options.source;
        this.styleUrl = styleUrl;
        this.config = layerCfg;
        
        // récuperation du style
        this.setStyleMapBox();
        
        return this;
    }
    
    /**
     * Get Style MapBox
     * @private
     */
    setStyleMapBox () {
        var self = this;
        fetch(this.styleUrl, {
            credentials : "same-origin"
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (style) {
                    self.onStyleMapBoxLoad(style);
                });
            }
        }).catch(function (e) {
            self.onStyleMapBoxError(e);
        });
    };
    
    /**
     * Add Style
     * @param {*} style - json style
     */
    onStyleMapBoxLoad (style) {
        // si on a plusieurs sources, on ne peut en prendre qu'une seule...
        if (!this.sourceId) {
            this.sourceId = Object.keys(style.sources)[0];
        }
        
        var styleSource = style.sources[this.sourceId];
        if (!styleSource) {
            this.onStyleMapBoxError({
                message : "ERROR : Source ID not found !? !"
            });
            return;
        }
        
        if (styleSource.type !== "vector") {
            this.onStyleMapBoxError({
                message : "ERROR : Source TYPE not permitted !"
            });
            return;
        }
        
        var source = this.getSource();
        
        // WARNING :
        // la clef renseignée dans les urls n'est pas forcement la bonne
        // car la substitution avec la clef utilisateur n'est pas faite par le service...
        if (styleSource.url) {
            // protocole : http ou https
            styleSource.url.replace(/(http|https):\/\//, this.protocol);
            
            var vectorTileJson = new TileJSONSource({
                url : styleSource.url
            });
            var self = this;
            var key = vectorTileJson.on("change", function () {
                if (vectorTileJson.getState() === "ready") {
                    var doc = vectorTileJson.getTileJSON();
                    if (!doc) {
                        return;
                    }
                    self.set("mapbox-extensions", doc);
                    var tiles = Array.isArray(doc.tiles) ? doc.tiles : [doc.tiles];
                    // protocole : http ou https
                    for (var i = 0; i < styleSource.tiles.length; i++) {
                        tiles[i].replace(/(http|https):\/\//, this.protocol);
                    }
                    source.setUrls(tiles);
                    observableUnByKey(key);
                }
            });
        }
        
        if (styleSource.tiles) {
            // protocole : http ou https
            for (var j = 0; j < styleSource.tiles.length; j++) {
                styleSource.tiles[j].replace(/(http|https):\/\//, this.protocol);
            }
            source.setUrls(styleSource.tiles);
        }
        
        applyStyle(this, style, this.sourceId).then(() => {
            source.setState("ready");
            this.set("mapbox-styles", style);
        }).catch((error) => {
            this.onStyleMapBoxError(error);
        });
    };
    
    /**
     * Error
     * @param {*} error - message
     */
    onStyleMapBoxError (error) {
        var source = this.getSource();
        source.setState("error");
        // eslint-disable-next-line no-console
        console.error(error.message);
    };

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

export default LayerMapBox;

// Expose LayerMapBox as ol.layer.GeoportalMapBox. (for a build bundle)
if (window.ol && window.ol.layer) {
    window.ol.layer.GeoportalMapBox = LayerMapBox;
}
