// import CSS
import "../../CSS/Controls/SearchEngine/GPFsearchEngine.css";
// import "../../CSS/Controls/SearchEngine/GPFsearchEngineStyle.css";
// import OpenLayers
// import Control from "ol/control/Control";
import Control from "../Control";
import Widget from "../Widget";
import Overlay from "ol/Overlay";
import {
    transform as olProjTransform,
    get as olProjGet,
    transformExtent as olProjTransformExtent
} from "ol/proj";
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
import GeoportalMapBox from "../../Layers/LayerMapBox";
// Service
import Search from "../../Services/Search";
// DOM
import SearchEngineDOM from "./SearchEngineDOM";
import checkDsfr from "../Utils/CheckDsfr";

var logger = Logger.getLogger("searchengine");

/**
 * @classdesc
 * SearchEngine control
 *
 * @constructor
 * @extends {ol.control.Control}
 * @type {ol.control.SearchEngine}
 * @alias ol.control.SearchEngine
 * @param {Object}  options - control options
 * @param {Number} [options.id] - Ability to add an identifier on the widget (advanced option)
 * @param {String}  [options.apiKey] - API key. The key "calcul" is used by default.
 * @param {Boolean} [options.ssl = true] - use of ssl or not (default true, service requested using https protocol)
 * @param {Boolean} [options.collapsed = true] - collapse mode, true by default
 * @param {Boolean} [options.collapsible = true] - force control to be collapsed or not, true by default.
 * @param {String}  [options.direction = "start"] - TODO : position of picto, by default : "start"
 * @param {String}  [options.placeholder] - Placeholder in search bar. Default is "Rechercher un lieu, une adresse".
 * @param {Boolean} [options.displayMarker = true] - set a marker on search result, defaults to true.
 * @param {String}  [options.markerStyle = "lightOrange"] - Marker style. Currently possible values are "lightOrange" (default value), "darkOrange", "red" and "turquoiseBlue".
 * @param {String}  [options.markerUrl = ""] - Marker url. By default, if not specified, use option markerStyle. Otherwise, you can added a http url or a base64 image.
 * @param {Boolean} [options.splitResults = true] - False to disable layers search
 * @param {Boolean} [options.displayButtonAdvancedSearch = false] - False to disable advanced search tools (it will not be displayed). Default is false (not displayed)
 * @param {Boolean} [options.displayButtonGeolocate = false] - False to disable advanced search tools (it will not be displayed). Default is false (not displayed)
 * @param {Boolean} [options.displayButtonCoordinateSearch = false] - False to disable advanced search tools (it will not be displayed). Default is false (not displayed)
 * @param {Boolean} [options.displayButtonClose = true] - False to disable advanced search tools (it will not be displayed). Default is true (displayed)
 * @param {Object}  [options.coordinateSearch] - coordinates search options.
 * @param {DOMElement} [options.coordinateSearch.target = null] - TODO : target location of results window. By default under the search bar.
 * @param {Array}   [options.coordinateSearch.units] - list of coordinates units, to be displayed in control units list.
 *      Values may be "DEC" (decimal degrees), "DMS" (sexagecimal) for geographical coordinates,
 *      and "M" or "KM" for metric coordinates
 * @param {Array}   [options.coordinateSearch.systems] - list of projection systems, default are Geographical ("EPSG:4326"), Web Mercator ("EPSG:3857") and Lambert 93 ("EPSG:2154").
 *      Each array element (=system) is an object with following properties :
 * @param {String}  [options.coordinateSearch.systems.crs] - Proj4 crs alias (from proj4 defs). e.g. : "EPSG:4326". Required
 * @param {String}  [options.coordinateSearch.systems.label] - CRS label to be displayed in control. Default is crs code (e.g. "EPSG:4326")
 * @param {String}  [options.coordinateSearch.systems.type] - CRS units type for coordinates conversion : "Geographical" or "Metric". Default: "Geographical"
 * @param {Object}  [options.advancedSearch] - advanced search options for geocoding (filters). Properties can be found among geocode options.filterOptions (see {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~geocode Gp.Services.geocode})
 * @param {DOMElement} [options.advancedSearch.target = null] - TODO : target location of results window. By default under the search bar.
 * @param {Object}  [options.resources] - resources to be used by geocode and autocompletion services :
 * @param {String}  [options.resources.geocode = "location"] - resources geocoding, by default : "location"
 * @param {Array}   [options.resources.autocomplete] - resources autocompletion, by default : ["PositionOfInterest", "StreetAddress"]
 * @param {Boolean} [options.resources.search = false] - false to disable search service, by default : "false"
 * @param {Object}  [options.searchOptions = {}] - options of search service
 * @param {Boolean} [options.searchOptions.addToMap = true] - add layer automatically to map, defaults to true.
 * @param {String}  [options.searchOptions.filterServices] - filter on a list of search services, each field is separated by a comma. "WMTS,TMS" by default
 * @param {String}  [options.searchOptions.filterWMTSPriority] - filter on priority WMTS layer in search, each field is separated by a comma. "PLAN.IGN,ORTHOIMAGERY.ORTHOPHOTOS" by default
 * @param {Boolean}  [options.searchOptions.filterLayersPriority = false] - filter on priority layers in search, false by default
 * @param {String}  [options.searchOptions.filterVectortiles] - filter on list of search layers only on service TMS, each field is separated by a comma. "PLAN.IGN, ..." by default
 * @param {Boolean} [options.searchOptions.updateVectortiles = false] - updating the list of search layers only on service TMS
 * @param {Object}  [options.searchOptions.serviceOptions] - options of search service
 * @param {Sring}   [options.searchOptions.serviceOptions.url] - url of service
 * @param {String}  [options.searchOptions.serviceOptions.index] - index of search, "standard" by default
 * @param {String}  [options.searchOptions.serviceOptions.fields] - list of search fields, each field is separated by a comma. "title,layer_name" by default
 * @param {Number}  [options.searchOptions.serviceOptions.size] - number of response in the service. 1000 by default
 * @param {Number}  [options.searchOptions.serviceOptions.maximumResponses] - number of results in the response. 10 by default
 * @param {Object}  [options.geocodeOptions = {}] - options of geocode service (see {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~geocode Gp.Services.geocode})
 * @param {Object}  [options.geocodeOptions.serviceOptions] - options of geocode service
 * @param {Object}  [options.autocompleteOptions = {}] - options of autocomplete service (see {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~autoComplete Gp.Services.autoComplete})
 * @param {Object}  [options.autocompleteOptions.serviceOptions] - options of autocomplete service
 * @param {Boolean} [options.autocompleteOptions.triggerGeocode = false] - trigger a geocoding request if the autocompletion does not return any suggestions, false by default
 * @param {Number}  [options.autocompleteOptions.triggerDelay = 1000] - waiting time before sending the geocoding request, 1000ms by default
 * @param {Number}  [options.autocompleteOptions.maximumEntries] - maximum autocompletion results we want to display
 * @param {Boolean} [options.autocompleteOptions.prettifyResults = false] - apply a filter/prettifier function to clean or prettify autocomplete entries
 * @param {Sting|Numeric|Function} [options.zoomTo] - zoom to results, by default, current zoom.
 *       Value possible : auto or zoom level.
 *       Possible to overload it with a function :
 *       zoomTo : function (info) {
 *           // do some stuff...
 *           return zoom;
 *       }
 * @fires searchengine:autocomplete:click
 * @fires searchengine:geocode:click
 * @fires searchengine:search:click
 * @fires searchengine:geolocation:click
 * @fires searchengine:coordinates:click
 * @todo option : direction (start|end) de la position du picto (loupe)
 * @todo option : choix du target pour les fenetres geocodage ou recherche par coordonnées
 * @example
 *  var SearchEngine = ol.control.SearchEngine({
 *      apiKey : "CLEAPI",
 *      collapsed : true,
 *      collapsible : true,
 *      displayButtonAdvancedSearch : true,
 *      displayButtonGeolocate : true,
 *      displayButtonCoordinateSearch : true,
 *      markerStyle : "lightOrange" // "http://..." or "data/base64..."
 *      resources : {
 *          geocode : ["StreetAddress", "PositionOfInterest"],
 *          autocomplete : ["StreetAddress"],
 *          search : false
 *      },
 *      advancedSearch : {
 *          target : document.getElementById("dialog"),
 *          PositionOfInterest : [{name : "municipality", title : "Ville"}],
 *          StreetAddress : [{...}]
 *      },
 *      coordinateSearch : {
 *          target : null
 *          systems : [
 *            {
 *              "crs" : "EPSG:3857",
 *              "label" : "Web Mercator",
 *              "type" : "Metric"
 *            },
 *            {
 *              "crs" : "EPSG:4326",
 *              "label" : "Géographiques",
 *              "type" : "Geographical"
 *            }
 *          ],
 *          units : ["DEC", "DMS"]
 *      },
 *      geocodeOptions : {},
 *      autocompleteOptions : {},
 *      searchOptions : {}
 *  });
 *
 *  SearchEngine.on("searchengine:autocomplete:click", function (e) {
 *    console.warn("autocomplete", e.location);
 *  });
 *  SearchEngine.on("searchengine:search:click", function (e) {
 *    console.warn("search", e.suggest);
 *  });
 *  SearchEngine.on("searchengine:geocode:click", function (e) {
 *    console.warn("geocode", e.location);
 *  });
 *  SearchEngine.on("searchengine:geolocation:click", function (e) {
 *    console.warn("geolocation", e.);
 *  });
 *  SearchEngine.on("searchengine:coordinate:click", function (e) {
 *    console.warn("coordinate", e.);
 *  });
 */
var SearchEngine = class SearchEngine extends Control {

    /**
     * See {@link ol.control.SearchEngine}
     * @module SearchEngine
     * @alias module:~controls/SearchEngine
     * @param {*} options - options
     * @example
     * import SearchEngine from "gpf-ext-ol/controls/SearchEngine"
     * ou
     * import { SearchEngine } from "gpf-ext-ol"
     */
    constructor (options) {
        options = options || {};

        // call ol.control.Control constructor
        super(options);

        if (!(this instanceof SearchEngine)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }
        /**
         * Nom de la classe (heritage)
         * @private
         */
        this.CLASSNAME = "SearchEngine";
        // initialisation du composant
        this.initialize(options);

        // // Widget main DOM container
        this.container = this._initContainer();

        // ajout du container
        (this.element) ? this.element.appendChild(this.container) : this.element = this.container;

        return this;
    }

    // ################################################################### //
    // ##################### public methods ############################## //
    // ################################################################### //

    /**
     * Overwrite OpenLayers setMap method
     *
     * @param {ol.Map} map - Map.
     */
    setMap (map) {
        if (!map) {
            this._clearResults();
        }

        // mode "collapsed"
        if (!this.collapsed) {
            this._showSearchEngineButton.setAttribute("aria-pressed", true);
        }

        // on appelle la méthode setMap originale d'OpenLayers
        super.setMap(map);

        // position
        if (this.options.position) {
            this.setPosition(this.options.position);
        }

        // reunion du bouton avec le précédent
        if (this.options.gutter === false) {
            this.getContainer().classList.add("gpf-button-no-gutter");
        }
    }

    /**
     * Returns true if widget is collapsed (minimized), false otherwise
     *
     * @returns {Boolean} collapsed - true if widget is collapsed
     */
    getCollapsed () {
        return this.collapsed;
    }

    /**
     * Collapse or display widget main container
     *
     * @param {Boolean} collapsed - True to collapse widget, False to display it
     */
    setCollapsed (collapsed) {
        if (collapsed === undefined) {
            logger.log("[ERROR] SearchEngine:setCollapsed - missing collapsed parameter");
            return;
        }

        if (!this.options.collapsible) {
            return; // on interdit le mode pliable !
        }

        if ((collapsed && this.collapsed) || (!collapsed && !this.collapsed)) {
            return;
        }

        this._showSearchEngineButton.click();
        this.collapsed = collapsed;
    }

    /**
     * Get locations data from geocode service
     *
     * @returns {Object} data - locations
     */
    getData () {
        return this._geocodedLocations;
    }

    /**
     * Get container
     *
     * @returns {DOMElement} container
     */
    getContainer () {
        return this.container;
    }
    // ################################################################### //
    // ##################### init component ############################## //
    // ################################################################### //

    /**
     * Initialize SearchEngine control (called by SearchEngine constructor)
     *
     * @param {Object} options - constructor options
     * @private
     */
    initialize (options) {
        this._checkInputOptions(options);

        // define default options
        this.options = {
            collapsed : true,
            collapsible : true,
            zoomTo : "",
            resources : {
                geocode : [],
                autocomplete : [],
                search : false
            },
            displayButtonClose : true,
            displayButtonAdvancedSearch : false,
            displayButtonGeolocate : false,
            displayButtonCoordinateSearch : false,
            advancedSearch : {},
            coordinateSearch : {},
            searchOptions : {
                addToMap : true,
                serviceOptions : {
                    maximumResponses : 5,
                }
            },
            geocodeOptions : {
                serviceOptions : {}
            },
            autocompleteOptions : {
                serviceOptions : {
                    maximumResponses : 5,
                },
                triggerGeocode : false,
                triggerDelay : 1000,
                prettifyResults : false
            },
            displayMarker : true,
            markerStyle : "lightOrange",
            markerUrl : "",
            placeholder : "Rechercher un lieu, une adresse",
            splitResults : true,
        };

        // merge with user options
        Utils.mergeParams(this.options, options);
        if (this.options.resources.geocode === "") {
            this.options.resources.geocode = ["PositionOfInterest", "StreetAddress"];
        }
        if (this.options.resources.autocomplete.length === 0) {
            this.options.resources.autocomplete = ["PositionOfInterest", "StreetAddress"];
        }
        if (this.options.resources.search) {
            // configuration avec gestion des options surchargées du service
            if (this.options.searchOptions) {
                if (this.options.searchOptions.serviceOptions) {
                    if (this.options.searchOptions.serviceOptions.url) {
                        Search.setUrl(this.options.searchOptions.serviceOptions.url);
                    }
                    if (this.options.searchOptions.serviceOptions.fields) {
                        Search.setFields(this.options.searchOptions.serviceOptions.fields);
                    }
                    if (this.options.searchOptions.serviceOptions.index) {
                        Search.setIndex(this.options.searchOptions.serviceOptions.index);
                    }
                    if (this.options.searchOptions.serviceOptions.size) {
                        Search.setSize(this.options.searchOptions.serviceOptions.size);
                    }
                    if (this.options.searchOptions.serviceOptions.maximumResponses) {
                        Search.setMaximumResponses(this.options.searchOptions.serviceOptions.maximumResponses);
                    }
                }
                if (this.options.searchOptions.filterServices) {
                    Search.setFiltersByService(this.options.searchOptions.filterServices);
                }
                if (this.options.searchOptions.filterLayersPriority) {
                    Search.setFiltersByLayerPriority(this.options.searchOptions.filterLayersPriority);
                }
                if (this.options.searchOptions.filterWMTSPriority) {
                    Search.setFilterWMTSPriority(this.options.searchOptions.filterWMTSPriority);
                }
                if (this.options.searchOptions.filterVectortiles) {
                    Search.setFiltersByTMS(this.options.searchOptions.filterVectortiles);
                }
                if (this.options.searchOptions.updateVectortiles) {
                    Search.updateFilterByTMS(); // url par defaut
                }
            }
            // abonnement au service
            Search.target.addEventListener("suggest", (e) => {
                logger.debug(e);
                this._fillSearchedSuggestListContainer(e.detail);
            });
        }

        if (!this.options.collapsible) {
            this.options.collapsed = false; // on interdit le mode pliable !
        }
        /** {Boolean} specify if searchEngine control is collapsed (true) or not (false) */
        this.collapsed = this.options.collapsed;

        // identifiant du contrôle : utile pour suffixer les identifiants CSS (pour gérer le cas où il y en a plusieurs dans la même page)
        this._uid = this.options.id || SelectorID.generate();

        this._showSearchEngineButton = null;

        // container de l'input de recherche
        this._inputSearchContainer = null;

        // container des reponses de l'autocompletion / du service de recherche
        this._autocompleteContainer = null;
        this._containerResultsLocation = null;
        this._containerResultsSuggest = null;
        // Radio buttons correspondants
        this._radioButtonLocation = null;
        this._radioButtonSuggest = null;

        // listes des reponses de l'autocompletion
        this._suggestedLocations = [];

        // container des reponses du geocodage
        this._geocodedContainer = null;

        // liste des reponses du geocodage
        this._geocodedLocations = [];

        // container des filtres du geocodage
        this._filterContainer = null;

        // ressource de geocodage selectionnée pour le geocodage avancé
        this._currentGeocodingCode = null;

        // localisant
        this._currentGeocodingLocation = null;

        // liste des filtres du geocodage pour le geocodage avancé
        this._advancedSearchFilters = {};
        this._initAdvancedSearchFilters();

        // liste des ressources du geocodage pour le geocodage avancé
        this._advancedSearchCodes = [];
        this._initAdvancedSearchCodes();

        // recherche par coordonnées : systemes de projections
        this._coordinateSearchSystems = [];
        if (this.options.displayButtonCoordinateSearch) {
            this._initCoordinateSearchSystems();
            this._currentCoordinateSearchSystems = this._coordinateSearchSystems[0]; // epsg:4326
            this._currentCoordinateSearchType = this._coordinateSearchSystems[0].type; // geographical ou metric
        }

        // recherche par coordonnées : unités
        this._coordinateSearchUnits = [];
        if (this.options.displayButtonCoordinateSearch) {
            this._initCoordinateSearchUnits();
            this._currentCoordinateSearchUnits = this._coordinateSearchUnits[this._currentCoordinateSearchType][0].code; // decimal
        }


        this._coordinateSearchLngInput = null;
        this._coordinateSearchLatInput = null;

        // marker
        this._marker = null;

        // marker style or url
        var _markerStyle = this.options.markerStyle;
        var _markerUrl = this.options.markerUrl;
        if (_markerUrl) {
            this._markerUrl = _markerUrl;
        } else {
            this._markerUrl = (Object.keys(Markers).indexOf(_markerStyle) === -1) ? Markers["lightOrange"] : Markers[_markerStyle];
        }

        // marker display
        this._displayMarker = this.options.displayMarker;

        // popup
        this._popupContent = null;
        this._popupDiv = this._initPopupDiv();
        this._popupOverlay = null;

        // trigger geocode
        this._triggerHandler = null;
    }

    /**
     * this method is called by this.initialize()
     * and makes sure input options are correctly formated
     *
     * @param {Object} options - options
     *
     * @private
     */
    _checkInputOptions (options) {
        var i;

        if (options.resources) {
            // on vérifie que resources est bien un objet
            if (typeof options.resources === "object") {
                // ressources de geocodage
                var geocodeResources = options.resources.geocode;
                if (geocodeResources) {
                    // on vérifie que la liste des ressources de geocodage est bien un tableau
                    if (Array.isArray(geocodeResources)) {
                        var geocodeResourcesList = ["StreetAddress", "PositionOfInterest", "CadastralParcel", "Administratif"];
                        for (i = 0; i < geocodeResources.length; i++) {
                            if (geocodeResourcesList.indexOf(geocodeResources[i]) === -1) {
                                // si la resource n'est pas référencée, on l'enlève
                                // geocodeResources.splice(i, 1);
                                logger.log("[SearchEngine] options.resources.geocode : " + geocodeResources[i] + " is not a resource for geocode");
                            }
                        }
                    } else {
                        logger.log("[SearchEngine] 'options.resources.geocode' parameter should be an array");
                        geocodeResources = null;
                    }
                }

                // ressources d'autocompletion
                var autocompleteResources = options.resources.autocomplete;
                if (autocompleteResources) {
                    // on vérifie que la liste des ressources d'autocompletion est bien un tableau
                    if (Array.isArray(autocompleteResources)) {
                        var autocompleteResourcesList = ["StreetAddress", "PositionOfInterest"];
                        for (i = 0; i < autocompleteResources.length; i++) {
                            if (autocompleteResourcesList.indexOf(autocompleteResources[i]) === -1) {
                                // si la resource n'est pas référencée, on l'enlève
                                // autocompleteResources.splice(i, 1);
                                logger.log("[SearchEngine] options.resources.autocomplete : " + autocompleteResources[i] + " is not a resource for autocomplete");
                            }
                        }
                    } else {
                        logger.log("[SearchEngine] 'options.resources.autocomplete' parameter should be an array");
                        autocompleteResources = null;
                    }
                }
            } else {
                logger.log("[SearchEngine] 'resources' parameter should be an object");
                options.resources = null;
            }
        }
    }

    /**
     * this method is called by this.initialize()
     * and initialize the geocoding resources titles.
     *
     * @private
     */
    _initAdvancedSearchCodes () {
        // INFORMATION
        // on y ajoute les filtres attributaires pour une table de ressources
        // selectionnée via un evenement (onchange) de la liste deroulante du
        // menu avancé du geocodage.
        // cf. onGeocodingAdvancedSearchCodeChange() pour la selection de la
        // ressource de geocodage à afficher

        var geocodeResources = this.options.resources.geocode;
        if (geocodeResources === "location") {
            geocodeResources = ["PositionOfInterest", "StreetAddress", "CadastralParcel"];
        }
        if (!Array.isArray(geocodeResources)) {
            geocodeResources = [geocodeResources];
        }
        for (var i = 0; i < geocodeResources.length; i++) {
            switch (geocodeResources[i]) {
                case "PositionOfInterest":
                    this._advancedSearchCodes.push({
                        id : "PositionOfInterest",
                        title : "Lieux/toponymes"
                    });
                    break;
                case "StreetAddress":
                    this._advancedSearchCodes.push({
                        id : "StreetAddress",
                        title : "Adresses"
                    });
                    break;
                case "CadastralParcel":
                    this._advancedSearchCodes.push({
                        id : "CadastralParcel",
                        title : "Parcelles cadastrales"
                    });
                    break;
                default:
                    break;
            }
        }
        // par défaut, au cas où aucune ressource passée en option ne correspond à celles attendues
        if (this._advancedSearchCodes.length === 0) {
            this._advancedSearchCodes = [{
                id : "StreetAddress",
                title : "Adresses"
            }, {
                id : "PositionOfInterest",
                title : "Lieux/toponymes"
            }, {
                id : "CadastralParcel",
                title : "Cadastre"
            }];
        }

        logger.log("advancedSearchCodes", this._advancedSearchCodes);
    }

    /**
     * this method is called by this.onAdd()
     * and initialize the advanced geocoding filters.
     *
     * @private
     */
    _initAdvancedSearchFilters () {
        // liste des filtres par defauts pour toutes les ressources
        this._advancedSearchFilters = SearchEngineUtils.advancedSearchFiltersByDefault;

        // on merge les options avancées avec celles par defaut
        var advancedSearchFiltersCustom = this.options.advancedSearch;
        Utils.assign(this._advancedSearchFilters, advancedSearchFiltersCustom);

        logger.log("advancedSearchFilters", this._advancedSearchFilters);
    }

    /**
     * this method is called by the constructor and initialize the projection
     * systems.
     * getting coordinates in the requested projection :
     * see this.onCoordinateSearchSystemChange()
     *
     * @private
     */
    _initCoordinateSearchSystems () {
        // on donne la possibilité à l'utilisateur de modifier
        // la liste des systèmes à afficher
        // Ex. this.options.coordinateSearch.systems

        // systemes de projection disponible par defaut
        var projectionSystemsByDefault = [{
            label : "G\u00e9ographique",
            crs : "EPSG:4326",
            type : "Geographical"
        }, {
            label : "Web Mercator",
            crs : "EPSG:3857",
            type : "Metric"
        }, {
            label : "Lambert 93",
            crs : "EPSG:2154",
            type : "Metric"
        }];

        var systems = this.options.coordinateSearch.systems;
        if (systems) {
            // on ajoute les definitions d'un systeme de reference fournies par l'utilisateur
            for (var i = 0; i < systems.length; i++) {
                var sys = systems[i];
                this._setSystem(sys);
            }
        }

        // on ajoute les systèmes de projections par défaut
        if (this._coordinateSearchSystems.length === 0) {
            for (var j = 0; j < projectionSystemsByDefault.length; j++) {
                this._setSystem(projectionSystemsByDefault[j]);
            }
        }
    }

    /**
     * this method is called by the constructor and initialize the units.
     * getting coordinates in the requested units :
     * see this.onCoordinateSearchUnitsChange()
     *
     * @private
     */
    _initCoordinateSearchUnits () {
        // on donne la possibilité à l'utilisateur de modifier
        // la liste des unités à afficher
        // Ex.
        // this.options.units : ["DEC", "DMS"]

        // unités disponible par defaut
        var projectionUnitsByDefault = {
            Geographical : [{
                code : "DEC",
                label : "degrés décimaux",
                format : MathUtils.coordinateToDecimal
            }, {
                code : "DMS",
                label : "degrés sexagésimaux",
                format : MathUtils.coordinateToDMS
            }],
            Metric : [{
                code : "M",
                label : "mètres",
                format : MathUtils.coordinateToMeter
            }, {
                code : "KM",
                label : "kilomètres",
                format : MathUtils.coordinateToKMeter
            }]
        };

        var units = this.options.coordinateSearch.units;
        if (units) {
            for (var type in projectionUnitsByDefault) {
                if (projectionUnitsByDefault.hasOwnProperty(type)) {
                    var found = false;
                    for (var j = 0; j < projectionUnitsByDefault[type].length; j++) {
                        var obj = projectionUnitsByDefault[type][j];
                        for (var i = 0; i < units.length; i++) {
                            var unit = units[i];
                            if (obj.code === unit) {
                                found = true;
                                if (!this._coordinateSearchUnits[type]) {
                                    this._coordinateSearchUnits[type] = [];
                                }
                                this._coordinateSearchUnits[type].push(obj);
                            }
                        }
                    }
                    if (!found) {
                        this._coordinateSearchUnits[type] = projectionUnitsByDefault[type];
                    }
                }
            }
        }

        // au cas où...
        if (typeof this._coordinateSearchUnits === "object" && Object.keys(this._coordinateSearchUnits).length === 0) {
            this._coordinateSearchUnits = projectionUnitsByDefault;
        }
    }

    /**
     * this method is called by this.initialize() and initialize popup div
     * (to display results information on marker click)
     *
     * @return {Object} element - DOM element for popup
     * @private
     */
    _initPopupDiv () {
        var context = this;
        var element = document.createElement("div");
        element.className = "gp-feature-info-div gpf-widget-color";
        // bouton de fermeture de la pop-up
        var closer = document.createElement("button");
        closer.title = "Fermer la pop-up";
        closer.className = "gp-styling-button closer gpf-btn gpf-btn-icon-close fr-btn--close fr-btn fr-btn--tertiary-no-outline fr-mt-1v fr-mr-2v";

        // on closer click : remove popup
        closer.onclick = function () {
            if (context._popupOverlay != null) {
                context._popupOverlay.setPosition(undefined);
            }
            return false;
        };
        this._popupContent = document.createElement("div");
        this._popupContent.className = "gp-features-content-div";
        this._popupContent.style["min-width"] = "200px";
        element.appendChild(this._popupContent);
        element.appendChild(closer);

        return element;
    }

    // ################################################################### //
    // ######################## DOM initialize ########################### //
    // ################################################################### //

    /**
     * Create control main container
     *
     * @returns {DOMElement} DOM element
     *
     * @private
     */
    _initContainer () {
        // create main container
        var container = this._createMainContainerElement();

        var searchDiv = this._createSearchDivElement();
        // create search engine picto
        var picto = this._showSearchEngineButton = this._createShowSearchEnginePictoElement(this.options.collapsible);
        searchDiv.appendChild(picto);

        // only dsfr : on applique un fond blanc sur une barre de recherche fixe
        if (!this.options.collapsible) {
            container.classList.add("gpf-widget-color", "gpf-widget-padding");
        }

        var search = this._inputSearchContainer = this._createSearchInputElement(this.options.placeholder);
        if (this.options.displayButtonClose) {
            search.appendChild(this._createSearchResetElement());
        }

        var context = this;
        if (search.addEventListener) {
            search.addEventListener("click", function () {
                context.onAutoCompleteInputClick();
            });
        } else if (search.attachEvent) {
            search.attachEvent("onclick", function () {
                context.onAutoCompleteInputClick();
            });
        }
        searchDiv.appendChild(search);

        var buttonsContainer = this._createButtonsElement();
        var firstLineWrapper = this._createFirstLineWrapper();
        firstLineWrapper.appendChild(searchDiv);
        firstLineWrapper.appendChild(buttonsContainer);
        container.appendChild(firstLineWrapper);

        if (checkDsfr() && this.options.splitResults || this.options.displayButtonAdvancedSearch) {
            var radioContainer = this._createRadioContainer();
            container.appendChild(radioContainer);
        }

        if (checkDsfr() && this.options.splitResults) {
            var radioElements;
            [radioElements, this._radioButtonLocation, this._radioButtonSuggest] = this._createRadioElements();
            radioContainer.appendChild(radioElements);
        }

        if (this.options.displayButtonAdvancedSearch) {
            var advancedShow = this._createShowAdvancedSearchElement();
            radioContainer.appendChild(advancedShow);

            // INFO je decompose les appels car j'ai besoin de recuperer le container
            // des filtres
            var advancedPanel = this._createAdvancedSearchPanelElement();
            var advancedPanelDiv = this._createAdvancedSearchPanelDivElement();
            var advancedHeader = this._createAdvancedSearchPanelHeaderElement();
            var advancedForm = this._createAdvancedSearchPanelFormElement(this._advancedSearchCodes);
            var advancedFormFilters = this._filterContainer = this._createAdvancedSearchFormFiltersElement();
            this._setFilter(this._advancedSearchCodes[0].id); // ex "PositionOfInterest"
            var advancedFormInput = this._createAdvancedSearchFormInputElement();

            advancedForm.appendChild(advancedFormFilters);
            advancedForm.appendChild(advancedFormInput);
            advancedPanelDiv.appendChild(advancedHeader);
            advancedPanelDiv.appendChild(advancedForm);
            advancedPanel.appendChild(advancedPanelDiv);
            container.appendChild(advancedPanel);
        }

        if (this.options.displayButtonGeolocate) {
            var geolocateShow = this._createShowGeolocateElement();
            buttonsContainer.appendChild(geolocateShow);
        }

        if (this.options.displayButtonCoordinateSearch) {
            var searchByCoordinateShow = this._createShowSearchByCoordinateElement();
            buttonsContainer.appendChild(searchByCoordinateShow);

            var coordinatePanel = this._createCoordinateSearchPanelElement();
            var coordinatePanelDiv = this._createCoordinateSearchPanelDivElement();
            var coordinateHeader = this._createCoordinateSearchPanelHeaderElement();
            var coordinateForm = this._createCoordinateSearchPanelFormElement();

            var div = null;
            div = this._containerSystems = this.__createCoordinateSearchDivElement();
            coordinateForm.appendChild(div);
            var labelSystems = this._createCoordinateSearchSystemsLabelElement();
            var systems =  this._setCoordinateSearchSystemsSelectElement(this._coordinateSearchSystems);
            div.appendChild(labelSystems);
            div.appendChild(systems);

            div = this._containerUnits = this.__createCoordinateSearchDivElement();
            coordinateForm.appendChild(div);
            var labelUnits = this._createCoordinateSearchUnitsLabelElement();
            var units = this._setCoordinateSearchUnitsSelectElement(this._coordinateSearchUnits[this._currentCoordinateSearchType]);
            div.appendChild(labelUnits);
            div.appendChild(units);

            div = this._containerCoordinateLng = this.__createCoordinateSearchDivElement();
            coordinateForm.appendChild(div);
            var coordinateLng = this._setCoordinateSearchLngLabelElement(this._currentCoordinateSearchType);
            var coordinateInputLng = this._coordinateSearchLngInput = this._setCoordinateSearchLngInputElement(this._currentCoordinateSearchUnits);
            div.appendChild(coordinateLng);
            div.appendChild(coordinateInputLng);

            div = this._containerCoordinateLat = this.__createCoordinateSearchDivElement();
            coordinateForm.appendChild(div);
            var coordinateLat = this._setCoordinateSearchLatLabelElement(this._currentCoordinateSearchType);
            var coordinateInputLat = this._coordinateSearchLatInput = this._setCoordinateSearchLatInputElement(this._currentCoordinateSearchUnits);
            div.appendChild(coordinateLat);
            div.appendChild(coordinateInputLat);

            var submit = this._createCoordinateSearchSubmitElement();
            coordinateForm.appendChild(submit);

            coordinatePanelDiv.appendChild(coordinateHeader);
            coordinatePanelDiv.appendChild(coordinateForm);

            coordinatePanel.appendChild(coordinatePanelDiv);
            container.appendChild(coordinatePanel);
        }

        // INFO je decompose les appels car j'ai besoin de recuperer le container
        // des resultats de l'autocompletion
        var autocomplete = this._autocompleteContainer = this._createAutoCompleteElement();
        var autocompleteList = this._createAutoCompleteListElement();
        var containerResultsLocation = this._containerResultsLocation = this._createAutoCompletedLocationContainer();
        var containerResultsSuggest = this._containerResultsSuggest = this._createSearchedSuggestContainer();
        autocompleteList.appendChild(containerResultsLocation);
        autocompleteList.appendChild(containerResultsSuggest);
        autocomplete.appendChild(autocompleteList);
        container.appendChild(autocomplete);

        // INFO je decompose les appels car j'ai besoin de recuperer le container
        // des resultats du geocodage
        var geocode = this._createGeocodeResultsElement();
        var geocodeDiv = this._createGeocodeResultsDivElement();
        geocode.appendChild(geocodeDiv);
        var geocodeList = this._geocodedContainer = this._createGeocodeResultsListElement();
        geocodeDiv.appendChild(geocodeList);
        container.appendChild(geocode);

        return container;
    }

    /**
     * this method is called by :
     * - this._initContainer() : ...
     * - this.onGeocodingAdvancedSearchCodeChoice() : ...
     * and initialize or create the filters container HTMLElement
     * to the geocoding advanced menu.
     *
     * @param {String} code - resource geocoding name
     *
     * @returns {DOMElement} DOM element
     * @private
     */
    _setFilter (code) {
        // INFORMATION
        // Nous avons 2 solutions possibles pour la mise en place des filtres.
        // 1. Soit on decide de creer tous les filtres pour chaque ressource
        // de geocodage à l'initialisation du composant, et on joue sur le
        // mode 'hidden' pour n'afficher que la ressource selectionnée.
        // 2. Soit on decide de creer à chaque fois les filtres pour la
        // ressource selectionnée.
        // Chaque solution a ses inconvenients/avantages.
        // Implementation du choix 2 car elle offre plus de souplesse pour
        // recuperer les 'form-data'...

        var container = this._filterContainer;

        var codeFound = false;
        for (var i = 0; i < this._advancedSearchCodes.length; i++) {
            if (this._advancedSearchCodes[i].id === code) {
                codeFound = true;
                break;
            }
        }

        if (!codeFound) {
            // cette ressource n'est pas disponible,
            // on supprime les anciens enfants...
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            return;
        }

        // on sauvegarde la ressource de geocodage sélectionnée
        this._currentGeocodingCode = code;

        // on supprime les enfants...
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        var lstAttributs = this._advancedSearchFilters[code];
        if (!lstAttributs || lstAttributs.length === 0) {
            // cette ressource n'est pas parametrable
            return;
        }

        var divTable = this._createAdvancedSearchFiltersTableElement(code, true);

        for (var j = 0; j < lstAttributs.length; j++) {
            var divFilter = this._createAdvancedSearchFiltersAttributElement(lstAttributs[j]);
            divTable.appendChild(divFilter);
        }

        container.appendChild(divTable);

        return container;
    }

    // ################################################################### //
    // ################ methods to request and results ################### //
    // ################################################################### //

    /**
     * this method is called by this.onAutoCompleteSearch()
     * and executes a request to the service.
     *
     * @param {Object} settings - service settings
     * @param {String}   settings.text - text
     * @param {Function} settings.onSuccess - callback
     * @param {Function} settings.onFailure - callback
     * @private
     */
    _requestAutoComplete (settings) {
        // on ne fait pas de requête si on n'a pas renseigné de parametres !
        if (!settings || (typeof settings === "object" && Object.keys(settings).length === 0)) {
            return;
        }

        // on ne fait pas de requête si la parametre 'text' est vide !
        if (!settings.text) {
            return;
        }

        logger.log(settings);

        var options = {};
        // on recupere les options du service
        Utils.assign(options, this.options.autocompleteOptions.serviceOptions);
        // ainsi que la recherche et les callbacks
        Utils.assign(options, settings);

        // on ajoute le paramètre filterOptions.type spécifiant les ressources.
        var resources = this.options.resources.autocomplete;
        if (resources && Array.isArray(resources)) {
            // il se peut que l'utilisateur ait surchargé ce paramètre dans geocodeOptions,
            if (!options.type) {
                options.type = resources;
            }
        }

        // cas où la clef API n'est pas renseignée dans les options du service,
        // on utilise celle renseignée au niveau du controle ou la clé "calcul" par défaut.
        options.apiKey = options.apiKey || this.options.apiKey;

        // si l'utilisateur a spécifié le paramètre ssl au niveau du control, on s'en sert
        // true par défaut (https)
        if (typeof options.ssl !== "boolean") {
            if (typeof this.options.ssl === "boolean") {
                options.ssl = this.options.ssl;
            } else {
                options.ssl = true;
            }
        }
        logger.log(options);

        Gp.Services.autoComplete(options);
    }

    /**
     * this method is called by this.onAutoCompleteSearchText() (case of success)
     * and fills the container of the location list.
     * it creates a HTML Element per location
     *
     * @param {Array} locations - Array of Gp.Services.AutoComplete.SuggestedLocation corresponding to autocomplete results list
     * @private
     */
    _fillAutoCompletedLocationListContainer (locations) {
        if (!locations || locations.length === 0) {
            return;
        }

        // on vide la liste avant de la construire
        var element = this._containerResultsLocation;
        if (element.childElementCount) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        }
        element.classList.add("GPelementHidden", "gpf-hidden");
        if (locations.length) {
            if (!this._radioButtonLocation || (this._radioButtonLocation && this._radioButtonLocation.checked)) {
                element.classList.remove("GPelementHidden", "gpf-hidden");
            }
            this._displaySuggestedLocation();
            if (!checkDsfr() || !this.options.splitResults) {
                this._createAutoCompletedLocationTitleElement();
            }
            for (var i = 0; i < locations.length; i++) {
                // Proposals are dynamically filled in Javascript by autocomplete service
                this._createAutoCompletedLocationElement(locations[i], i);
            }
        }
    }

    /**
     * this method is called by this.() (case of success)
     * and fills the container of the suggest list.
     * it creates a HTML Element per suggest
     *
     * @param {Array} suggests - Array of suggested corresponding to search results list
     * @private
     */
    _fillSearchedSuggestListContainer (suggests) {
        // on vide la liste avant de la construire
        var element = this._containerResultsSuggest;
        if (element.childElementCount) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        }
        element.classList.add("GPelementHidden", "gpf-hidden");
        if (suggests.length) {
            if (!this._radioButtonSuggest || (this._radioButtonSuggest && this._radioButtonSuggest.checked)) {
                element.classList.remove("GPelementHidden", "gpf-hidden");
            }
            if (!checkDsfr() || !this.options.splitResults) {
                this._createSearchedSuggestTitleElement();
            }
            for (let i = 0; i < suggests.length; i++) {
                const suggest = suggests[i];
                this._createSearchedSuggestElement(suggest, i);
            }
        }
    }

    /**
     * this method is called by this.onAutoCompleteSearch()
     * and executes a request to the service.
     *
     * @param {Object} settings - service settings
     * @param {String}   settings.location - text
     * @param {Function} settings.onSuccess - callback
     * @param {Function} settings.onFailure - callback
     * @private
     */
    _requestGeocoding (settings) {
        // on ne fait pas de requête si on n'a pas renseigné de parametres !
        if (!settings || (typeof settings === "object" && Object.keys(settings).length === 0)) {
            return;
        }

        // on ne fait pas de requête si la parametre 'text' est vide !
        if (settings.query === null) {
            return;
        }

        logger.log(settings);

        var options = {};
        // on recupere les options du service
        Utils.assign(options, this.options.geocodeOptions.serviceOptions);
        // ainsi que la recherche et les callbacks
        Utils.assign(options, settings);
        // on redefinie les callbacks si les callbacks de service existent
        var self = this;
        var bOnFailure = !!(this.options.geocodeOptions.serviceOptions.onFailure !== null && typeof this.options.geocodeOptions.serviceOptions.onFailure === "function"); // cast variable to boolean
        var bOnSuccess = !!(this.options.geocodeOptions.serviceOptions.onSuccess !== null && typeof this.options.geocodeOptions.serviceOptions.onSuccess === "function");
        if (bOnSuccess) {
            var cbOnSuccess = function (e) {
                settings.onSuccess.call(self, e);
                self.options.geocodeOptions.serviceOptions.onSuccess.call(self, e);
            };
            options.onSuccess = cbOnSuccess;
        }
        if (bOnFailure) {
            var cbOnFailure = function (e) {
                settings.onFailure.call(self, e);
                self.options.geocodeOptions.serviceOptions.onFailure.call(self, e);
            };
            options.onFailure = cbOnFailure;
        }

        // on ajoute le paramètre index spécifiant les ressources.
        var resources = this.options.resources.geocode;
        if (resources) {
            // il se peut que l'utilisateur ait surchargé ce paramètre dans geocodeOptions,
            // ou qu'il ait déjà été rempli (cas de la recherche avancée)
            if (!options.index) {
                options.index = resources;
            }
        }

        // cas où la clef API n'est pas renseignée dans les options du service,
        // on utilise celle renseignée au niveau du controle ou la clé "calcul" par défaut
        options.apiKey = options.apiKey || this.options.apiKey;

        // si l'utilisateur a spécifié le paramètre ssl au niveau du control, on s'en sert
        // true par défaut (https)
        if (typeof options.ssl !== "boolean") {
            if (typeof this.options.ssl === "boolean") {
                options.ssl = this.options.ssl;
            } else {
                options.ssl = true;
            }
        }

        logger.log(options);

        Gp.Services.geocode(options);
    }

    /**
     * this method is called by this.onGeocodingSearch()
     * and fills the container of the location results.
     * it creates a HTML Element per location
     * (cf. this. ...)
     *
     * @param {Object[]} locations - locations
     *
     * @private
     */
    _fillGeocodedLocationListContainer (locations) {
        if (!locations || locations.length === 0) {
            this._clearGeocodedLocation();
            return;
        }

        // on vide la liste avant de la construire
        var element = this._geocodedContainer;
        if (element.childElementCount) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        }

        for (var i = 0; i < locations.length; i++) {
            logger.log(locations[i]);
            // Proposals are dynamically filled in Javascript by autocomplete service
            this._createGeocodedLocationElement(locations[i], i);
        }

        // sauvegarde de l'etat des locations
        this._geocodedLocations = locations;
    }

    // ################################################################### //
    // ######################### other methods ########################### //
    // ################################################################### //

    /**
     * this sends the label to the panel.
     *
     * @param {String} label - label suggested location
     * @private
     */
    _setLabel (label) {
        document.getElementById("GPsearchInputText-" + this._uid).value = label;
    }

    /**
     * this method is called by this.on*ResultsItemClick()
     * and move/zoom on a position.
     *
     * @param {Array} position - ol.Coordinate object [lon, lat] (en lat/lon : "EPSG:4326")
     * @param {Number} zoom - zoom level
     * @private
     */
    _setPosition (position, zoom) {
        var view = this.getMap().getView();
        view.setCenter(position);
        view.setZoom(zoom);
    }

    /**
     * this method is called by this.on*ResultsItemClick()
     * and displays a marker.
     * FIXME
     *
     * @param {Array} position - ol.Coordinate object [lon, lat] ou [x, y]
     * @param {Object} info - location information
     * @private
     */
    _setMarker (position, info) {
        var map = this.getMap();
        var context = this;

        // remove previous markers
        if (this._marker != null) {
            map.removeOverlay(this._marker);
            this._marker = null;
        }

        if (position) {
            // création de l'élément DOM
            var markerDiv = document.createElement("img");
            markerDiv.src = this._markerUrl;

            // ajout de l'évènement onclick (pour afficher une popup)
            if (markerDiv.addEventListener) {
                markerDiv.addEventListener(
                    "click",
                    function () {
                        context._onResultMarkerSelect(info);
                    }
                );
            } else if (markerDiv.attachEvent) {
                // Internet Explorer
                markerDiv.attachEvent(
                    "onclick",
                    function () {
                        context._onResultMarkerSelect(info);
                    }
                );
            }

            // création du marker (overlay)
            this._marker = new Overlay({
                position : position,
                // offset : [-25.5, -38], // FIXME mauvais rendu !?
                positioning : "center-center",
                element : markerDiv,
                stopEvent : false
            });
            map.addOverlay(this._marker);
        }
    }

    /**
     * this method is called by this.on*ResultsItemClick()
     * and get zoom to results.
     *
     * @param {Object} info - info
     *
     * @returns {Integer} zoom
     * @private
     */
    _getZoom (info) {
        var map = this.getMap();
        var key = this.options.zoomTo;
        var zoom = null;

        // les valeurs du zooms sont determinées
        // soit par les mots clefs suivants :  max, min ou auto
        // soit par un niveau de zoom
        // soit defini par l'utilisateur via une fonction

        if (typeof key === "function") {
            logger.trace("zoom function");
            zoom = key.call(this, info);
        }

        if (typeof key === "number") {
            logger.trace("zoom level");
            zoom = key;
        }

        if (typeof key === "string") {
            // if (key === "max") {
            //     zoom = map.getMaxZoom();
            // } else if (key === "min") {
            //     zoom = map.getMinZoom();
            // } else

            if (key === "auto") {
                logger.trace("zoom auto");
                zoom = SearchEngineUtils.zoomToResultsByDefault(info);
            } else {
                logger.trace("zoom level parsing");
                var value = parseInt(key, 10);
                if (!isNaN(value)) {
                    logger.trace("zoom parsing");
                    zoom = value;
                }
            }
        }

        // polyfill IE
        Number.isInteger = Number.isInteger || function (value) {
            return typeof value === "number" &&
                isFinite(value) &&
                Math.floor(value) === value;
        };

        // test de validité du zoom,
        // on prend le zoom courant par defaut ...
        if (!zoom || zoom === "" || !Number.isInteger(zoom)) {
            logger.trace("zoom not found, current zoom...");
            zoom = map.getView().getZoom();
        }

        // FIXME test si le zoom est dans l'espace de la carte
        var min = map.minZoom; // .getMinZoom();
        var max = map.maxZoom; // .getMaxZoom();
        if (zoom < min) {
            logger.trace("zoom level min...");
            zoom = min;
        }
        if (zoom > max) {
            logger.trace("zoom level max...");
            zoom = max;
        }

        logger.trace("zoom", zoom);
        return zoom;
    }

    /**
     * this method is called on 'click' on this._marker
     * (cf. this._setMarker() )
     * and sets a popup with marker information
     *
     * @param {Object} information - location information
     * @private
     */
    _onResultMarkerSelect (information) {
        var map = this.getMap();

        var popupContent = "";
        if (typeof information !== "string") {
            if (information.service === "GeocodedLocation") {
                popupContent = "<ul>";
                var attributes = information.location.placeAttributes;
                for (var attr in attributes) {
                    if (attributes.hasOwnProperty(attr)) {
                        if (attr !== "trueGeometry" && attr !== "extraFields" && attr !== "houseNumberInfos" && attr !== "_count") {
                            popupContent += "<li>";
                            popupContent += "<span class=\"gp-attname-others-span\">" + attr.toUpperCase() + " : </span>";
                            popupContent += attributes[attr];
                            popupContent += " </li>";
                        }
                    }
                }
                popupContent += " </ul>";
            } else if (information.service === "SuggestedLocation") {
                popupContent = GeocodeUtils.getSuggestedLocationFreeform(information.location);
            } else {
                popupContent = "sans informations.";
            }
        } else {
            popupContent = information;
        }

        this._popupContent.innerHTML = popupContent;
        if (!this._popupOverlay) {
            // ajout de la popup a la carte comme un overlay
            this._popupOverlay = new Overlay({
                element : this._popupDiv,
                positioning : "bottom-center",
                position : this._marker.getPosition(),
                offset : [0, -42]
            });
            map.addOverlay(this._popupOverlay);
        } else {
            // si l'overlay est déjà créé, on modifie juste sa position
            this._popupOverlay.setPosition(this._marker.getPosition());
        }
    }

    /**
     * Set additional projection system
     *
     * @param {Object} system - projection system
     * @param {String} system.crs - Proj4 crs alias (from proj4 defs) e.g. "EPSG:4326"
     * @param {String} [system.label] - CRS label to be displayed in control. Default is system.crs alias
     * @param {String} [system.type] - CRS units type for coordinates conversion (one of control options.units). Default is "Metric"
     */
    _setSystem (system) {
        if (typeof system !== "object") {
            logger.log("[ERROR] MousePosition:addSystem - system parameter should be an object");
            return;
        }
        if (!system.crs) {
            logger.error("crs not defined !");
            return;
        }
        if (!system.label) {
            logger.warn("crs label not defined, use crs code by default.");
            system.label = system.crs;
        }
        if (!system.type) {
            logger.warn("type srs not defined, use 'Metric' by default.");
            system.type = "Metric";
        }

        // chargement de la definition de la projection
        // même si déjà chargé...
        CRS.loadByName(system.crs);

        if (!olProjGet(system.crs)) {
            logger.error("crs '{}' not available into proj4 definitions !", system.crs);
            return;
        }

        // add system to control systems
        for (var j = 0; j < this._coordinateSearchSystems.length; j++) {
            var obj = this._coordinateSearchSystems[j];
            if (system.crs === obj.crs) {
                // warn user
                logger.info("crs '{}' already configured", obj.crs);
            }
        }
        system.code = this._coordinateSearchSystems.length;
        this._coordinateSearchSystems.push(system);
    }

    // ################################################################### //
    // ###################### other handlers events ###################### //
    // ################################################################### //

    /**
     * this method is called by event 'click' on 'GPshowSearchEnginePicto' tag label
     * (cf. this._createShowSearchEnginePictoElement), and it cleans the component
     * when it's closed.
     *
     * @param { event } e évènement associé au clic
     * @private
     */
    onShowSearchEngineClick (e) {
        if (e.target.ariaPressed === "true") {
            this.onPanelOpen();
        }
        var map = this.getMap();
        // on supprime toutes les interactions
        Interactions.unset(map);
        var opened = this._showSearchEngineButton.ariaPressed;
        this.collapsed = !(opened === "true");
        // on génère nous même l'evenement OpenLayers de changement de propriété
        // (utiliser ol.control.SearchEngine.on("change:collapsed", function ) pour s'abonner à cet évènement)
        this.dispatchEvent("change:collapsed");

        // on recalcule la position
        if (this.options.position && !this.collapsed) {
            this.updatePosition(this.options.position);
        }

        // on nettoie si on ferme le composant
        if (this.collapsed) {
            this._clearResults();
        }
    }

    /**
     * this method is called by event 'click' on 'GPsearchInputReset' tag div
     * (cf. this._createSearchInputElement), and it cleans the value of input.
     *
     * @private
     */
    onSearchResetClick () {
        this._clearResults();
    }

    /**
     * this method is called by event 'click' on 'GPshowGeolocate' tag div
     * (cf. this._createShowGeolocateElement)
     *
     * @private
     */
    onShowSearchGeolocateClick () {
        if ("geolocation" in navigator) {
            /* geolocation is available */
            navigator.geolocation.getCurrentPosition((position) => {
                var view = this.getMap().getView();
                var viewProj = view.getProjection().getCode();
                var coordinates_4326 = [position.coords.longitude, position.coords.latitude];
                var coordinates;
                if (viewProj !== "EPSG:4326") {
                    // on retransforme les coordonnées de la position dans la projection de la carte
                    coordinates = olProjTransform(coordinates_4326, "EPSG:4326", viewProj);
                } else {
                    coordinates = coordinates_4326;
                }
                if (isNaN(coordinates[0]) || isNaN(coordinates[1])) {
                    this._setMarker();
                    return;
                }
                this._setPosition(coordinates, 15); // FIXME zoom fixe !
                if (this._displayMarker) {
                    var markerInfo = "<h6> Ma position </h6> longitude : " + coordinates_4326[0] + "<br/> latitude : " + coordinates_4326[1];
                    this._setMarker(coordinates, markerInfo);
                }
                /**
                 * event triggered when i want a geolocation
                 *
                 * @event searchengine:geolocation:click
                 * @property {Object} type - event
                 * @property {Object} coordinates - coordinates
                 * @property {Object} target - instance SearchEngine
                 * @example
                 * SearchEngine.on("searchengine:geolocation:click", function (e) {
                 *   console.log(e.coordinates);
                 * })
                 */
                this.dispatchEvent({
                    type : "searchengine:geolocation:click",
                    coordinates : coordinates
                });
            });
        } else {
            /* geolocation IS NOT available */
        }
    }

    /**
     * this method is called by event 'click' on 'GPshowSearchByCoordinate' tag div
     * (cf. this._createShowSearchByCoordinateElement)
     *
     * @private
     */
    onShowSearchByCoordinateClick () {
        var lng = null;
        var lat = null;
        if (this._coordinateSearchLngInput && this._coordinateSearchLngInput.nodeName === "DIV" &&
            this._coordinateSearchLatInput && this._coordinateSearchLatInput.nodeName === "DIV"
        ) {
            lng = this._getCoordinateSearchDMS(this._coordinateSearchLngInput);
            lat = this._getCoordinateSearchDMS(this._coordinateSearchLatInput);
        } else {
            lng = this._coordinateSearchLngInput.value;
            lat = this._coordinateSearchLatInput.value;
        }

        if (!lng || !lat) {
            return;
        }

        var coordinates = [lng, lat];

        var view = this.getMap().getView();
        var viewProj = view.getProjection().getCode();
        if (viewProj !== "EPSG:4326") {
            coordinates = olProjTransform(coordinates, "EPSG:4326", viewProj);
        }
        if (isNaN(coordinates[0]) || isNaN(coordinates[1])) {
            this._setMarker();
            return;
        }
        this._setPosition(coordinates, 10); // FIXME zoom fixe !
        if (this._displayMarker) {
            this._setMarker(coordinates, "sans information");
        }

        /**
         * event triggered when we are positioned
         *
         * @event searchengine:coordinates:click
         * @property {Object} type - event
         * @property {Object} coordinates - coordinates
         * @property {Object} target - instance SearchEngine
         * @example
         * SearchEngine.on("searchengine:coordinates:click", function (e) {
         *   console.log(e.coordinates);
         * })
         */
        this.dispatchEvent({
            type : "searchengine:coordinates:click",
            coordinates : coordinates
        });
    }

    _getCoordinateSearchDMS (dom) {
        if (dom && dom.nodeName === "DIV") {
            var nodes = dom.querySelectorAll("[name]");
            if (nodes) {
                var degrees = MathUtils.toInteger(nodes[0].value);
                var minutes = MathUtils.toInteger(nodes[1].value);
                var seconds = MathUtils.toInteger(nodes[2].value);
                var hemispheres = nodes[3].options[nodes[3].selectedIndex].text;
                if (!degrees || !minutes || !seconds || !hemispheres) {
                    return;
                }
                return MathUtils.dmsToDecimal(degrees, minutes, seconds, hemispheres);
            }
        }
    }
    // ################################################################### //
    // ################## handlers events AutoComplete ################### //
    // ################################################################### //

    /**
     * this method is called by event 'click' on 'GPlocationOrigin' input
     *
     * @private
     */
    onAutoCompleteInputClick () {
        var inputSearchTextContainer = document.getElementById("GPsearchInputText-" + this._uid);
        if (inputSearchTextContainer && !inputSearchTextContainer.disabled && inputSearchTextContainer.value.length > 2) {
            this._displaySuggestedLocation();
        }
    }

    /**
     * this method is called by event 'keyup' on 'GPsearchInputText' tag input
     * (cf. this._createSearchInputElement), and it gets the value of input.
     * this value is passed as a parameter for the service autocomplete (text).
     * the results of the request are displayed into a drop down menu.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    onAutoCompleteSearchText (e) {
        var value = e.target.value;
        if (!value) {
            return;
        }

        // on sauvegarde le localisant
        this._currentGeocodingLocation = value;

        // on limite les requêtes à partir de 3 car. saisie !
        if (value.length < 3) {
            this._clearSuggestedLocation();
            return;
        }

        var _triggerGeocode = this.options.autocompleteOptions.triggerGeocode;
        var _triggerDelay = this.options.autocompleteOptions.triggerDelay;
        var _maximumEntries = this.options.autocompleteOptions.maximumEntries;
        var _prettifyResults = this.options.autocompleteOptions.prettifyResults;

        // INFORMATION
        // on effectue la requête au service d'autocompletion.
        // on met en place des callbacks afin de recuperer les resultats ou
        // les messages d'erreurs du service.
        // les resultats sont affichés dans une liste deroulante.
        var context = this;
        this._requestAutoComplete({
            text : value,
            // callback onSuccess
            onSuccess : function (results) {
                logger.log("request from AutoComplete", results);
                if (results) {
                    // on sauvegarde l'etat des résultats
                    context._suggestedLocations = results.suggestedLocations;
                    context._locationsToBeDisplayed = [];
                    // on vérifie qu'on n'a pas récupéré des coordonnées nulles (par ex recherche par code postal)
                    for (var i = 0; i < context._suggestedLocations.length; i++) {
                        var ilocation = context._suggestedLocations[i];
                        if (ilocation.position && ilocation.position.x === 0 && ilocation.position.y === 0 && ilocation.fullText) {
                            // si les coordonnées sont nulles, il faut relancer une requête de géocodage avec l'attribut "fullText" récupéré
                            context._getGeocodeCoordinatesFromFullText(ilocation, i);
                        } else {
                            // sinon on peut afficher normalement le résultat dans la liste
                            context._locationsToBeDisplayed.push(ilocation);
                        }
                    };
                    // on filtre et enjolive éventuellement les résultats
                    if (_prettifyResults === true) {
                        context._prettifyAutocompleteResults(context._locationsToBeDisplayed);
                    }
                    // on ne garde que le nombre de résultats que l'on veut afficher
                    if (_maximumEntries) {
                        context._locationsToBeDisplayed = context._locationsToBeDisplayed.slice(0, _maximumEntries);
                    }

                    // on affiche les résultats qui n'ont pas des coordonnées nulles
                    context._fillAutoCompletedLocationListContainer(context._locationsToBeDisplayed);
                    // on annule eventuellement une requete de geocodage en cours car on obtient des
                    // de nouveau des resultats d'autocompletion...
                    if (context._triggerHandler) {
                        clearTimeout(context._triggerHandler);
                        context._triggerHandler = null;
                        logger.warn("Cancel a geocode request !");
                    }
                }
            },
            // callback onFailure
            onFailure : function (error) {
                // FIXME
                // où affiche t on les messages : ex. 'No suggestion matching the search' ?
                context._clearSuggestedLocation();
                logger.log(error.message);
                // on envoie une requete de geocodage si aucun resultat d'autocompletion
                // n'a été trouvé ! Et on n'oublie pas d'annuler celle qui est en cours !
                if (error.message === "No suggestion matching the search" && _triggerGeocode /* && value.length === 5 */) {
                    if (context._triggerHandler) {
                        clearTimeout(context._triggerHandler);
                        logger.warn("Cancel the last geocode request !");
                    }
                    context._triggerHandler = setTimeout(
                        function () {
                            logger.warn("Launch a geocode request !");
                            context._requestGeocoding({
                                location : value,
                                // callback onSuccess
                                onSuccess : function (results) {
                                    logger.log("request from Geocoding", results);
                                    if (results) {
                                        context._locationsToBeDisplayed = [];
                                        // on modifie la structure des reponses pour être
                                        // compatible avec l'autocompletion !
                                        var locations = results.locations;
                                        for (var i = 0; i < locations.length; i++) {
                                            var location = locations[i];
                                            location.fullText = GeocodeUtils.getGeocodedLocationFreeform(location);
                                            location.position = {
                                                x : location.position.lon,
                                                y : location.position.lat
                                            };
                                            context._locationsToBeDisplayed.push(location);
                                        }
                                        context._fillAutoCompletedLocationListContainer(locations);
                                    }
                                },
                                // callback onFailure
                                onFailure : function (error) {
                                    logger.log(error.message);
                                }
                            });
                        }, _triggerDelay
                    );
                }
            }
        });

        // INFORMATION
        // on effectue une requête au service de recherche.
        // les resultats sont ajoutées à la suite de l'autocompletion,
        // et un abonnement est mis en place pour les récuperer.
        if (this.options.resources.search) {
            // appel du service (cf. abonnement : Search.target.addEventListener("suggest"))
            Search.suggest(value);
        }

        var map = this.getMap();
        map.on(
            "click",
            this._hideSuggestedLocation,
            this
        );
        map.on(
            "pointerdrag",
            this._hideSuggestedLocation,
            this
        );
    }

    /**
     * this method is called by Gp.Services.autoComplete callback in case of success
     * (cf. this.onAutoCompleteSearchText), for suggested locations with null coordinates
     * (case of postalCode research for instance).
     * Send a geocode request with suggested location 'fullText' attribute, to get its coordinates and display it in autocomplete results list container.
     *
     * @param {Gp.Services.AutoCompleteResponse.SuggestedLocation} suggestedLocation - autocompletion result (with null coordinates) to be geocoded
     * @param {Number} i - suggestedLocation position in Gp.Services.AutoCompleteResponse.suggestedLocations autocomplete results list
     * @private
     */
    _getGeocodeCoordinatesFromFullText (suggestedLocation, i) {
        var context = this;
        Gp.Services.geocode({
            apiKey : this.options.apiKey,
            ssl : this.options.ssl,
            q : GeocodeUtils.getSuggestedLocationFreeform(suggestedLocation),
            index : suggestedLocation.type,
            // callback onSuccess
            onSuccess : function (response) {
                logger.log("request from Geocoding (coordinates null)", response);
                if (response.locations && response.locations.length !== 0 && response.locations[0].position) {
                    // on modifie les coordonnées du résultat en EPSG:4326 donc lat,lon
                    /// \TODO verifier si l'inversion des coordonnees est necessaire
                    if (context._suggestedLocations && context._suggestedLocations[i]) {
                        context._suggestedLocations[i].position = {
                            lon : response.locations[0].position.y,
                            lat : response.locations[0].position.x
                        };
                        // et on l'affiche dans la liste
                        context._locationsToBeDisplayed.unshift(context._suggestedLocations[i]);
                        context._fillAutoCompletedLocationListContainer(context._locationsToBeDisplayed);
                    }
                }
            },
            // callback onFailure
            onFailure : function () {
                // si on n'a pas réussi à récupérer les coordonnées, on affiche quand même le résultat
                if (context._suggestedLocations && context._suggestedLocations[i]) {
                    context._createAutoCompletedLocationElement(context._suggestedLocations[i], i);
                }
            }
        });
    }

    /**
     * this method is called by event 'click' on 'GPautoCompleteResultsList' tag div
     * (cf. this._createAutoCompleteListElement), and it selects the location.
     * this location displays a marker on the map.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    onAutoCompletedResultsItemClick (e) {
        // TODO on souhaite un comportement different pour la selection des reponses
        // de l'autocompletion :
        // - liste deroulante des reponses,
        // - puis possibilité de cliquer sur une suggestion
        // - mais aussi de la choisir avec le clavier (arrow up/down), puis valider
        // par un return
        // cette selection avec les fleches doit mettre à jour le input !
        // (comme un moteur de recherche de navigateur)

        var idx = SelectorID.index(e.target.id);
        logger.log(idx);
        logger.log(this._locationsToBeDisplayed[idx]);

        if (!idx) {
            return;
        }

        var position = [
            this._locationsToBeDisplayed[idx].position.x,
            this._locationsToBeDisplayed[idx].position.y
        ];
        var info = {
            service : "SuggestedLocation",
            location : this._locationsToBeDisplayed[idx]
        };

        // on ajoute le texte de l'autocomplétion dans l'input
        var label = GeocodeUtils.getSuggestedLocationFreeform(this._locationsToBeDisplayed[idx]);
        this._setLabel(label);

        // on sauvegarde le localisant
        this._currentGeocodingLocation = label;

        // Info : la position est en EPSG:4326, à transformer dans la projection de la carte
        var view = this.getMap().getView();
        var mapProj = view.getProjection().getCode();
        if (mapProj !== "EPSG:4326") {
            // on retransforme les coordonnées de la position dans la projection de la carte
            position = olProjTransform(position, "EPSG:4326", mapProj);
        }
        // on centre la vue et positionne le marker, à la position reprojetée dans la projection de la carte
        var zoom = this._getZoom(info);
        this._setPosition(position, zoom);
        if (this._displayMarker) {
            this._setMarker(position, info);
        }
        /**
         * event triggered when an element of the results is clicked for autocompletion
         *
         * @event searchengine:autocomplete:click
         * @property {Object} type - event
         * @property {Object} location - location
         * @property {Object} target - instance SearchEngine
         * @example
         * SearchEngine.on("searchengine:autocomplete:click", function (e) {
         *   console.log(e.location);
         * })
         */
        this.dispatchEvent({
            type : "searchengine:autocomplete:click",
            location : this._locationsToBeDisplayed[idx]
        });
    }

    /**
     * this method is called by event 'click' on '' tag div
     * (cf. this.), and it selects the suggest.
     * this suggest call an event to added layer on the map.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    onSearchedResultsItemClick (e) {
        var idx = SelectorID.index(e.target.id);

        var error = null;
        try {
            var suggest = Search.getSuggestions()[idx];
            if (!suggest) {
                throw "No suggestions found !";
            }

            // Ajout de la couche sur la carte si l'option le permet
            if (this.options.searchOptions.addToMap) {
                // Check if configuration is loaded
                if (!Config.isConfigLoaded()) {
                    throw "ERROR : contract key configuration has to be loaded to load Geoportal layers.";
                }
                var service = suggest.service;
                var name = suggest.name;
                var layer = null;
                switch (service) {
                    case "WMS":
                        layer = new GeoportalWMS({
                            layer : name
                        });
                        break;
                    case "WMTS":
                        layer = new GeoportalWMTS({
                            layer : name
                        });
                        break;
                    case "TMS":
                        layer = new GeoportalMapBox({
                            layer : name
                        },{
                            declutter : true
                        });
                    default:
                        break;
                }
                if (layer) {
                    var map = this.getMap();
                    map.addLayer(layer);
                }
            }
        } catch (e) {
            error = e;
        }

        /**
         * event triggered when an element of the results is clicked for search service
         *
         * @event searchengine:search:click
         * @property {Object} type - event
         * @property {Object} suggest - suggest
         * @property {Object} error - error
         * @property {Object} target - instance SearchEngine
         * @example
         * SearchEngine.on("searchengine:search:click", function (e) {
         *   console.log(e.suggest);
         * })
         */
        this.dispatchEvent({
            type : "searchengine:search:click",
            suggest : suggest,
            error : error
        });
    }

    // ################################################################### //
    // ################### handlers events Geocode ####################### //
    // ################################################################### //

    /**
     * this method is called by event 'submit' on 'GPsearchInput' tag form
     * (cf. this._createSearchInputElement), and it gets the value of input.
     * this value is passed as a parameter for the service geocoding.
     * the results of the request are displayed into a window.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    onGeocodingSearchSubmit (e) {
        var value = e.target[0].value;
        if (!value) {
            return;
        }

        // on sauvegarde le localisant
        this._currentGeocodingLocation = value;

        // on met en place l'affichage des resultats dans une fenetre de recherche.
        var context = this;
        this._requestGeocoding({
            query : value,
            // callback onSuccess
            onSuccess : function (results) {
                logger.log("request from Geocoding", results);
                if (results) {
                    var locations = results.locations;
                    context._fillGeocodedLocationListContainer(locations);
                }
            },
            // callback onFailure
            onFailure : function (error) {
                // FIXME cf. this.onAutoCompleteSearch()
                context._clearGeocodedLocation();
                logger.log(error.message);
            }
        });
    }

    /**
     * this method is called by event 'submit' on 'GPgeocodeResultsList' tag div
     * (cf. this._createGeocodeResultsListElement), and it selects the location.
     * this location displays a marker on the map.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    onGeocodedResultsItemClick (e) {
        var idx = SelectorID.index(e.target.id);

        if (!idx) {
            return;
        }

        var position = [
            this._geocodedLocations[idx].position.lon,
            this._geocodedLocations[idx].position.lat
        ];
        var info = {
            service : "GeocodedLocation",
            location : this._geocodedLocations[idx]
        };

        // on ajoute le texte du géocodage dans l'input
        var label = GeocodeUtils.getGeocodedLocationFreeform(this._geocodedLocations[idx]);
        this._setLabel(label);

        // Info : la position est en EPSG:4326, à transformer dans la projection de la carte
        var view = this.getMap().getView();
        var mapProj = view.getProjection().getCode();
        if (mapProj !== "EPSG:4326") {
            // on retransforme les coordonnées de la position dans la projection de la carte
            position = olProjTransform(position, "EPSG:4326", mapProj);
        }
        // on centre la vue et positionne le marker, à la position reprojetée dans la projection de la carte
        var zoom = this._getZoom(this.options.zoomTo);
        this._setPosition(position, zoom);
        if (this._displayMarker) {
            this._setMarker(position, info);
        }
        /**
         * event triggered when an element of the results is clicked for geocoding
         *
         * @event searchengine:geocode:click
         * @property {Object} type - event
         * @property {Object} location - location
         * @property {Object} target - instance SearchEngine
         * @example
         * SearchEngine.on("searchengine:geocode:click", function (e) {
         *   console.log(e.location);
         * })
         */
        this.dispatchEvent({
            type : "searchengine:geocode:click",
            location : this._geocodedLocations[idx]
        });
    }

    // ################################################################### //
    // ############## handlers events Geocode Advanced ################### //
    // ################################################################### //

    /**
     * this method is called by event 'change' on 'GPadvancedSearchCode' tag select
     * (cf. this._createAdvancedSearchFormCodeElement), and it gets the value of
     * option selected.
     * this value is passed as a parameter to create the attributs container.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    onGeocodingAdvancedSearchCodeChange (e) {
        logger.log(e);
        var idx = e.target.selectedIndex;
        var value = e.target.options[idx].value;

        if (!value) {
            return;
        }

        // INFORMATION
        // le declenchement de l'evenement va creer un container de filtre à la volée...
        // l'insertion des containers d'attributs dans le DOM sont :
        // - soit GPadvancedSearchFilters > PositionOfInterest
        // - soit GPadvancedSearchFilters > StreetAddress
        // - soit GPadvancedSearchFilters > CadastralParcel
        // cf. _setFilter() pour la creation du container

        this._setFilter(value);
    }

    /**
     * this method is called by event 'submit' on 'GPadvancedSearchForm' tag form
     * (cf. this._createAdvancedSearchPanelFormElement), and it gets the value of all input.
     * this value is passed as a parameter for the service geocoding.
     * the results of the request are displayed into a window.
     *
     * @param {Object} e - HTMLElement
     * @param {Array} data - [{key: ..., value: ...}]
     * @private
     */
    onGeocodingAdvancedSearchSubmit (e, data) {
        logger.log(data);
        if (!data || data.length === 0) {
            return;
        }

        var _location;
        var _filterOptions = {};

        for (var i = 0; i < data.length; i++) {
            var filter = data[i];
            if (filter.value) {
                if (filter.key === "section") {
                    filter.value = filter.value.toUpperCase();
                }
                _filterOptions[filter.key] = filter.value;
            }
        }

        var inputSearchTextContainer = document.getElementById("GPsearchInputText-" + this._uid);
        _location = inputSearchTextContainer.value;

        // On ne prend pas en compte ce qu'il y a dans l'input de recherche simple pour la recherche avance de PC
        if (this._currentGeocodingCode === "CadastralParcel") {
            _location = "";
        }

        // on met en place l'affichage des resultats dans une fenetre de recherche.
        var context = this;
        this._requestGeocoding({
            query : _location,
            index : this._currentGeocodingCode,
            filters : _filterOptions,
            // callback onSuccess
            onSuccess : function (results) {
                logger.log(results);
                if (results) {
                    var locations = results.locations;
                    context._fillGeocodedLocationListContainer(locations);
                }
            },
            // callback onFailure
            onFailure : function (error) {
                // FIXME cf. this.onAutoCompleteSearch()
                context._clearGeocodedLocation();
                logger.log(error.message);
            }
        });
    }

    /**
     * this method is called by 'onGeocodingAdvancedSearchSubmit' method,
     * in case geocoding type is 'CadastralParcel',
     * and gets request parameters from inputs
     *
     * @param {Object} filterOptions - object with inputs value (department, insee, ...)
     * @returns {String} location - cadastral parcel number : concatenation of inputs values (e.g. : 940670000D0041 or 94067_____0041)
     * @private
     */
    _getCadastralParcelRequestParams (filterOptions) {
        /* info:
            la parcelle cadastrale se compose de 14 chiffres ou lettres, indiquant, de gauche à droite :
            - le code du département (2 caractères)
            - le code commune (3 caractères). (Remarque : code département + code commune = code INSEE)
            - OU le code INSEE de la commune (5 chiffres) (remplace les 2 précédents)
            - le code commune absorbée INSEE, ou '000' (3 caractères),
            - la section (2 caractères),
            - le numéro de parcelle (4 caractères).
            Exemple de parcelle : '940670000D0041'. Si l'identifiant est incomplet (par exemple '940670000D'), le service renverra uniquement les 25 premiers résultats pouvant correspondre.
        */

        var _location = "";

        var l;
        // code département (2 caractères)
        var dep = filterOptions.department;
        if (dep) {
            l = dep.length;
            if (l === 2) {
                _location = dep;
            } else if (l === 1) {
                // si un seul numéro a été saisi, on présume que c'est un numéro < 10
                _location = "0" + dep;
            } else {
                _location = dep.substring(0, 2);
            }
        } else {
            _location = "__";
        }

        // code commune insee (3 caractères)
        var commune = filterOptions.commune;
        if (commune) {
            l = commune.length;
            if (l === 3) {
                _location += commune;
            } else if (l === 2) {
                _location += "_" + commune;
            } else if (l === 1) {
                _location += "__" + commune;
            } else { // l > 3
                _location += commune.substring(0, 3);
            }
        } else {
            _location += "___";
        }

        // code insee (5 caractères) : surcharge les 2 autres si renseigné
        var insee = filterOptions.insee;
        if (insee) {
            if (insee.length === 5) {
                _location = insee;
            }
        }

        // code commune absorbee INSEE (3 caractères)
        var absorbedCity = filterOptions.absorbedCity;
        if (absorbedCity) {
            l = absorbedCity.length;
            if (l === 3) {
                _location += absorbedCity;
            } else if (l < 3) {
                if (l === 2) {
                    _location += "_" + absorbedCity;
                } else if (l === 1) {
                    _location += "__" + absorbedCity;
                }
            } else { // l > 3
                _location += absorbedCity.substring(0, 3);
            }
        } else {
            _location += "___";
        }

        // section (2 caractères)
        var section = filterOptions.section;
        if (section) {
            l = section.length;
            if (l === 2) {
                _location += section;
            } else if (l === 1) {
                _location += "_" + section;
            } else {
                _location += section.substring(0, 2);
            }
        } else {
            _location += "__";
        }

        // numéro de parcelle (4 caractères)
        var number = filterOptions.number;
        if (number) {
            l = number.length;
            if (l === 4) {
                _location += number;
            } else if (l === 3) {
                _location += "_" + number;
            } else if (l === 2) {
                _location += "__" + number;
            } else if (l === 1) {
                _location += "___" + number;
            } else { // l > 4
                _location += number.substring(0, 4);
            }
        } else {
            _location += "___";
        }

        logger.log("location : " + _location);

        return _location;
    }

    // ################################################################### //
    // ############### handlers events Coordinate Search ################# //
    // ################################################################### //

    /**
     * this method is called by event 'change' on ''
     * tag select (cf. this.),
     * and selects the system projection.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    onCoordinateSearchSystemChange (e) {
        var idx = e.target.selectedIndex; // index
        var value = e.target.options[idx].value; // crs

        // on nettoie les coordonnées saisies
        this._coordinateSearchLngInput.value = "";
        this._coordinateSearchLatInput.value = "";

        // INFO
        // si on change de type de systeme, on doit aussi changer le type d'unités !
        var type = null;
        for (var i = 0; i < this._coordinateSearchSystems.length; ++i) {
            if (this._coordinateSearchSystems[i].code === Number(value)) {
                type = this._coordinateSearchSystems[i].type;
                break;
            }
        }

        if (!type) {
            logger.log("system not found in projection systems container");
            return;
        }

        // on enregistre le systeme courant
        this._currentCoordinateSearchSystems = this._coordinateSearchSystems[Number(value)];

        if (type !== this._currentCoordinateSearchType) {
            // on met à jour les unités du menu deroulant : Geographique ou Métrique
            this._currentCoordinateSearchType = type;
            this._currentCoordinateSearchUnits =  this._coordinateSearchUnits[type][0].code;
            this._containerUnits.appendChild(this._setCoordinateSearchUnitsSelectElement(this._coordinateSearchUnits[type]));
            // et on modifie la zone de saisie des coordonnées (label + input)
            this._updateCoordinateSearchElements();
        }
    }

    /**
     * this method is called by event 'change' on ''
     * tag select (cf. this.),
     * and selects the units projection.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    onCoordinateSearchUnitsChange (e) {
        var idx = e.target.selectedIndex;
        var value = e.target.options[idx].value;

        // on nettoie les coordonnées saisies
        this._coordinateSearchLngInput.value = "";
        this._coordinateSearchLatInput.value = "";

        // et on modifie la zone de saisie des coordonnées (label + input)
        this._currentCoordinateSearchUnits = value;
        this._updateCoordinateSearchElements();
    }

    /**
     * this method is called by event 'click' on ''
     * tag select (cf. this.),
     * and clear app.
     *
     * @private
     */
    onCoordinateSearchClose () {
        this._setMarker();
        this._coordinateSearchLngInput.value = "";
        this._coordinateSearchLatInput.value = "";
    }

    _updateCoordinateSearchElements () {
        var lbl = this._setCoordinateSearchLngLabelElement(this._currentCoordinateSearchType);
        var input = this._coordinateSearchLngInput = this._setCoordinateSearchLngInputElement(this._currentCoordinateSearchUnits);
        this._containerCoordinateLng.appendChild(lbl);
        this._containerCoordinateLng.appendChild(input);
        lbl = this._setCoordinateSearchLatLabelElement(this._currentCoordinateSearchType);
        input = this._coordinateSearchLatInput = this._setCoordinateSearchLatInputElement(this._currentCoordinateSearchUnits);
        this._containerCoordinateLat.appendChild(lbl);
        this._containerCoordinateLat.appendChild(input);
    }

    // ################################################################### //
    // ############################## clean ############################## //
    // ################################################################### //

    /**
     * this method is called by this.onSearchReset()
     * and it clears all results and the marker.
     *
     * @private
     */
    _clearResults () {
        var map = this.getMap();

        this._currentGeocodingLocation = null;

        this._clearSuggestedLocation();
        this._clearGeocodedLocation();

        this._setMarker();
        // on retire l'overlay de la popup de la carte
        if (this._popupOverlay != null) {
            map.removeOverlay(this._popupOverlay);
            this._popupOverlay = null;
        }
    }

    /**
     * this method is called by this.onAutoCompleteSearchText()
     * and it clears all suggested location.
     *
     * @private
     */
    _clearSuggestedLocation () {
        this._suggestedLocations = [];
        if (this._containerResultsLocation) {
            while (this._containerResultsLocation.firstChild) {
                this._containerResultsLocation.removeChild(this._containerResultsLocation.firstChild);
            }
        }
        if (this.options.resources.search) {
            Search.clear();
            if (this._containerResultsSuggest) {
                while (this._containerResultsSuggest.firstChild) {
                    this._containerResultsSuggest.removeChild(this._containerResultsSuggest.firstChild);
                }
            }
        }
    }

    /**
     * this method is called by this.onAutoCompleteSearchText()
     * and it clears suggested location from duplicate entries and improve unprecise fulltext entries.
     *
     * @param {Array} autocompleteResults - Array of autocompleteResults to display
     * @private
     */
    _prettifyAutocompleteResults (autocompleteResults) {
        for (var i = autocompleteResults.length - 1; i >= 0; i--) {
            var autocompleteResult = autocompleteResults[i];
            if ((autocompleteResult.type === "StreetAddress" && autocompleteResult.kind === "municipality") ||
            autocompleteResult.type === "PositionOfInterest" && autocompleteResult.poiType[0] === "lieu-dit habité" && autocompleteResult.poiType[1] === "zone d'habitation") {
                // on retire les éléments streetAdress - municipality car déjà pris en compte par POI
                autocompleteResults.splice(i, 1);
            }
            // on précise le type dans le fulltext au POI des types département et région
            if ((autocompleteResult.type === "PositionOfInterest" && autocompleteResult.poiType[0] === "administratif" &&
                (autocompleteResult.poiType[1] === "département" || autocompleteResult.poiType[1] === "région"))) {
                autocompleteResult.fullText = autocompleteResult.fullText + ", " + autocompleteResult.poiType[1];
            }
        };
    }

    /**
     * this method is called to hide suggested locations
     *
     * @private
     */
    _hideSuggestedLocation () {
        if (this._autocompleteContainer) {
            this._autocompleteContainer.classList.replace("GPelementVisible", "GPelementHidden");
            this._autocompleteContainer.classList.replace("gpf-visible", "gpf-hidden");
        }
    }

    /**
     * this method is called to display suggested location.
     *
     * @private
     */
    _displaySuggestedLocation () {
        if (this._autocompleteContainer) {
            this._autocompleteContainer.classList.replace("GPelementHidden", "GPelementVisible");
            this._autocompleteContainer.classList.replace("gpf-hidden", "gpf-visible");
        }
    }

    /**
     * this method is called by this.onGeocodingAdvancedSearchSubmit()
     * and it clears all geocoded location.
     *
     * @private
     */
    _clearGeocodedLocation () {
        this._geocodedLocations = [];
        if (this._geocodedContainer) {
            while (this._geocodedContainer.firstChild) {
                this._geocodedContainer.removeChild(this._geocodedContainer.firstChild);
            }
        }
    }

};

// on récupère les méthodes de la classe commune ReverseGeocoding
Object.assign(SearchEngine.prototype, SearchEngineDOM);
Object.assign(SearchEngine.prototype, Widget);

export default SearchEngine;

// Expose SearchEngine as ol.control.SearchEngine (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.SearchEngine = SearchEngine;
}
