// import CSS
import "../../CSS/Controls/SearchEngine/GPFsearchEngine.css";
// import "../../CSS/Controls/SearchEngine/GPFsearchEngineStyle.css";
// import OpenLayers
// import Control from "ol/control/Control";
import OlObject from "ol/Object";
import Control from "../Control";
import Widget from "../Widget";
import Map from "ol/Map";
import Overlay from "ol/Overlay";
import {
    transform as olProjTransform,
    get as olProjGet,
    transformExtent as olProjTransformExtent
} from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
// import geoportal library access
import Gp from "geoportal-access-lib";
// import local
import Config from "../../Utils/Config";
import Logger from "../../Utils/LoggerByDefault";
import Utils from "../../Utils/Helper";
import Markers from "../Utils/Markers";
import Interactions from "../Utils/Interactions";
import SelectorID from "../../Utils/SelectorID";
import MathUtils from "../../Utils/MathUtils";
import SearchEngineUtils from "../../Utils/SearchEngineUtils";
import GeocodeUtils from "../../Utils/GeocodeUtils";
import CRS from "../../CRS/CRS";
// import local des layers
import GeoportalWMS from "../../Layers/LayerWMS";
import GeoportalWMTS from "../../Layers/LayerWMTS";
import GeoportalWFS from "../../Layers/LayerWFS";
import GeoportalMapBox from "../../Layers/LayerMapBox";
// Service
import Search from "../../Services/Search";
import DefaultSearchService from "../../Services/SearchServiceBase"; 
import SearchEngineBase from "./SearchEngineBase";
import { AbstractService, GeocodeIGNService } from "./Service";
// DOM
import SearchEngineDOM from "./SearchEngineDOM";
import checkDsfr from "../Utils/CheckDsfr";
import { getUid } from "ol";
import { Layer, Vector } from "ol/layer";
import VectorSource from "ol/source/Vector";

import { Style, Icon, Stroke, Fill, Circle as CircleStyle } from "ol/style";
const color = "#000091";

const createStyle = (feature) => {
    const geometryType = feature.getGeometry().getType();

    switch (geometryType) {
        case "Point":
        case "MultiPoint":
            return new Style({
                image : new Icon({
                    src : "/src/packages/Controls/SearchEngine/map-pin-2-fill.svg",
                    scale : 0.2,
                    // color : color,
                }),
            });

        case "LineString":
        case "MultiLineString":
            return new Style({
                stroke : new Stroke({
                    color : color,
                    width : 3,
                }),
            });

        case "Polygon":
        case "MultiPolygon":
            return new Style({
                stroke : new Stroke({
                    color : color,
                    lineDash : [8, 8], 
                    width : 2,
                }),
                fill : new Fill({
                    color : "rgba(0, 0, 0, 0.1)",
                    opacity : 0.8
                }),
            });

        default:
            return new Style();
    }
};

var logger = Logger.getLogger("searchengine");

/**
 * @typedef {Object} SearchEngineOptions
 * @property {number} [id] - Identifiant du widget (option avancée)
 * @property {string} [apiKey] - Clé API. "calcul" par défaut.
 * @property {boolean} [ssl=true] - Utilisation du protocole https (true par défaut)
 * @property {boolean} [collapsed=true] - Mode réduit (true par défaut)
 * @property {boolean} [collapsible=true] - Contrôle pliable ou non (true par défaut)
 * @property {string} [direction="start"] - Position du picto (loupe), "start" par défaut
 * @property {string} [placeholder="Rechercher un lieu, une adresse"] - Placeholder de la barre de recherche
 * @property {boolean} [displayMarker=true] - Afficher un marqueur sur le résultat (true par défaut)
 * @property {string} [markerStyle="lightOrange"] - Style du marqueur ("lightOrange", "darkOrange", "red", "turquoiseBlue")
 * @property {string} [markerUrl=""] - URL du marqueur (prioritaire sur markerStyle)
 * @property {boolean} [splitResults=false] - Désactiver la recherche par couches (false par défaut)
 * @property {boolean} [displayButtonAdvancedSearch=false] - Afficher le bouton de recherche avancée (false par défaut)
 * @property {boolean} [displayButtonGeolocate=false] - Afficher le bouton de géolocalisation (false par défaut)
 * @property {boolean} [displayButtonCoordinateSearch=false] - Afficher le bouton de recherche par coordonnées (false par défaut)
 * @property {boolean} [coordinateSearchInAdvancedSearch=false] - Afficher la recherche par coordonnées dans la recherche avancée
 * @property {boolean} [displayButtonClose=true] - Afficher le bouton de fermeture (true par défaut)
 * @property {Object} [coordinateSearch] - Options de recherche par coordonnées
 * @property {HTMLElement} [coordinateSearch.target=null] - Cible d'affichage des résultats
 * @property {Array} [coordinateSearch.units] - Unités de coordonnées à afficher ("DEC", "DMS", "M", "KM")
 *      Values may be "DEC" (decimal degrees), "DMS" (sexagecimal) for geographical coordinates,
 *      and "M" or "KM" for metric coordinates
 * @property {Array} [coordinateSearch.systems] - Systèmes de projection à afficher (objet avec crs, label, type)
 * @property {Object} [advancedSearch] - Options de recherche avancée (voir geocodeOptions.filterOptions)
 * @property {HTMLElement} [advancedSearch.target=null] - Cible d'affichage des résultats
 * @property {Object} [resources] - Ressources utilisées par les services
 * @property {string|string[]} [resources.geocode="location"] - Ressources de géocodage
 * @property {string[]} [resources.autocomplete] - Ressources d'autocomplétion
 * @property {boolean} [resources.search=false] - Activer le service de recherche (false par défaut)
 * @property {Object} [searchOptions={}] - Options du service de recherche
 * @property {boolean} [searchOptions.addToMap=true] - Ajouter la couche automatiquement à la carte
 * @property {string[]} [searchOptions.filterServices] - Filtrer sur une liste de services ("WMTS,TMS" par défaut)
 * @property {string[]} [searchOptions.filterWMTSPriority] - Filtrer sur les couches WMTS prioritaires
 * @property {string[]} [searchOptions.filterProjections] - Filtrer sur une liste de projections
 * @property {boolean} [searchOptions.filterLayersPriority=false] - Filtrer sur les couches prioritaires
 * @property {boolean} [searchOptions.filterLayers=true] - Activer le filtrage automatique des couches
 * @property {Object} [searchOptions.filterLayersList] - Liste des couches à filtrer {"layerName": "service"}
 * @property {boolean} [searchOptions.filterTMS=true] - Garder les TMS avec style dans les métadonnées
 * @property {Object} [searchOptions.serviceOptions] - Options du service de recherche
 * @property {string} [searchOptions.serviceOptions.url] - URL du service
 * @property {string} [searchOptions.serviceOptions.index="standard"] - Index de recherche
 * @property {string[]} [searchOptions.serviceOptions.fields=["title","layer_name"]] - Champs de recherche
 * @property {number} [searchOptions.serviceOptions.size=1000] - Nombre de réponses du service
 * @property {number} [searchOptions.serviceOptions.maximumResponses=10] - Nombre de résultats à afficher
 * @property {number} [searchOptions.maximumEntries] - Nombre maximum de résultats à afficher
 * @property {Object} [geocodeOptions={}] - Options du service de géocodage (voir Gp.Services.geocode {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~geocode Gp.Services.geocode}))
 * @property {Object} [geocodeOptions.serviceOptions] - Options du service de géocodage
 * @property {Object} [autocompleteOptions={}] - Options du service d'autocomplétion (voir Gp.Services.autoComplete {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~autoComplete Gp.Services.autoComplete})
 * @property {Object} [autocompleteOptions.serviceOptions] - Options du service d'autocomplétion
 * @property {boolean} [autocompleteOptions.triggerGeocode=false] - Déclencher une requête de géocodage si aucune suggestion
 * @property {number} [autocompleteOptions.triggerDelay=1000] - Délai avant la requête de géocodage (ms)
 * @property {number} [autocompleteOptions.maximumEntries] - Nombre maximum de résultats d'autocomplétion à afficher
 * @property {boolean} [autocompleteOptions.prettifyResults=false] - Nettoyer/embellir les résultats d'autocomplétion
 * @property {string|number|Function} [zoomTo] - Niveau de zoom à appliquer sur le résultat ("auto", niveau, ou fonction)
 *       Value possible : auto or zoom level.
 *       Possible to overload it with a function :
 *       zoomTo : function (info) {
 *           // do some stuff...
 *           return zoom;
 *       }
 */


/**
 * @classdesc
 * SearchEngine Base control
 *
 * @alias ol.control.SearchEngineGeocodeIGN
 * @module SearchEngine
*/
class SearchEngineGeocodeIGN extends SearchEngineBase {

    constructor (options) {
        options = options || {};

        // Gère le service
        if (!options.searchService || !(options.searchService instanceof AbstractService)) {
            options.searchService = new GeocodeIGNService(options.serviceOptions);
        }

        // call ol.control.Control constructor
        super(options);

        this.layer = new Vector({
            source : new VectorSource({}),
            zIndex : Infinity,
            style : createStyle,
        });
        this.extent = new Vector({
            source : new VectorSource({}),
            zIndex : Infinity,
            style : createStyle,
        });

        /**
         * Nom de la classe (heritage)
         * @private
         */
        this.CLASSNAME = "SearchEngineGeocodeIGN";

        return this;
    }

    setMap (map) {
        super.setMap(map);
        if (map) {            
            map.addLayer(this.extent);
            map.addLayer(this.layer);
        }
    }

    _initEvents (options) {
        super._initEvents(options);
        this.on("search", this.addResultToMap);
    }

    addResultToMap (e) {
        let view = this.getMap().getView();

        this.layer.getSource().clear();
        this.extent.getSource().clear();
        let extent, zoom;
        if (e.result !== null) {
            this.layer.getSource().addFeature(e.result);
            extent = e.result.getGeometry().getExtent();
            zoom = 15;
        }
        if (e.extent !== null) {
            this.extent.getSource().addFeature(e.extent);
            extent = e.extent.getGeometry().getExtent();
        }
        if (extent) {
            view.fit(extent);
            if (zoom) {
                view.setZoom(zoom);
            }
        }
    }

}

export default SearchEngineGeocodeIGN;

// Expose SearchEngine as ol.control.SearchEngine (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.SearchEngineGeocodeIGN = SearchEngineGeocodeIGN;
}
