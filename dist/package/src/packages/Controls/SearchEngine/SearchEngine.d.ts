export default SearchEngine;
export type SearchEngineOptions = {
    /**
     * - Identifiant du widget (option avancée)
     */
    id?: number | undefined;
    /**
     * - Clé API. "calcul" par défaut.
     */
    apiKey?: string | undefined;
    /**
     * - Utilisation du protocole https (true par défaut)
     */
    ssl?: boolean | undefined;
    /**
     * - Mode réduit (true par défaut)
     */
    collapsed?: boolean | undefined;
    /**
     * - Contrôle pliable ou non (true par défaut)
     */
    collapsible?: boolean | undefined;
    /**
     * - Position du picto (loupe), "start" par défaut
     */
    direction?: string | undefined;
    /**
     * - Placeholder de la barre de recherche
     */
    placeholder?: string | undefined;
    /**
     * - Afficher un marqueur sur le résultat (true par défaut)
     */
    displayMarker?: boolean | undefined;
    /**
     * - Style du marqueur ("lightOrange", "darkOrange", "red", "turquoiseBlue")
     */
    markerStyle?: string | undefined;
    /**
     * - URL du marqueur (prioritaire sur markerStyle)
     */
    markerUrl?: string | undefined;
    /**
     * - Désactiver la recherche par couches (false par défaut)
     */
    splitResults?: boolean | undefined;
    /**
     * - Afficher le bouton de recherche avancée (false par défaut)
     */
    displayButtonAdvancedSearch?: boolean | undefined;
    /**
     * - Afficher le bouton de géolocalisation (false par défaut)
     */
    displayButtonGeolocate?: boolean | undefined;
    /**
     * - Afficher le bouton de recherche par coordonnées (false par défaut)
     */
    displayButtonCoordinateSearch?: boolean | undefined;
    /**
     * - Afficher la recherche par coordonnées dans la recherche avancée
     */
    coordinateSearchInAdvancedSearch?: boolean | undefined;
    /**
     * - Afficher le bouton de fermeture (true par défaut)
     */
    displayButtonClose?: boolean | undefined;
    /**
     * - Options de recherche par coordonnées
     */
    coordinateSearch?: {
        /**
         * - Cible d'affichage des résultats
         */
        target?: HTMLElement | undefined;
        /**
         * - Unités de coordonnées à afficher ("DEC", "DMS", "M", "KM")
         * Values may be "DEC" (decimal degrees), "DMS" (sexagecimal) for geographical coordinates,
         * and "M" or "KM" for metric coordinates
         */
        units?: any[] | undefined;
        /**
         * - Systèmes de projection à afficher (objet avec crs, label, type)
         */
        systems?: any[] | undefined;
    } | undefined;
    /**
     * - Options de recherche avancée (voir geocodeOptions.filterOptions)
     */
    advancedSearch?: {
        /**
         * - Cible d'affichage des résultats
         */
        target?: HTMLElement | undefined;
    } | undefined;
    /**
     * - Ressources utilisées par les services
     */
    resources?: {
        /**
         * - Ressources de géocodage
         */
        geocode?: string | string[] | undefined;
        /**
         * - Ressources d'autocomplétion
         */
        autocomplete?: string[] | undefined;
        /**
         * - Activer le service de recherche (false par défaut)
         */
        search?: boolean | undefined;
    } | undefined;
    /**
     * - Options du service de recherche
     */
    searchOptions?: {
        /**
         * - Ajouter la couche automatiquement à la carte
         */
        addToMap?: boolean | undefined;
        /**
         * - Filtrer sur une liste de services ("WMTS,TMS" par défaut)
         */
        filterServices?: string[] | undefined;
        /**
         * - Filtrer sur les couches WMTS prioritaires
         */
        filterWMTSPriority?: string[] | undefined;
        /**
         * - Filtrer sur une liste de projections
         */
        filterProjections?: string[] | undefined;
        /**
         * - Filtrer sur les couches prioritaires
         */
        filterLayersPriority?: boolean | undefined;
        /**
         * - Activer le filtrage automatique des couches
         */
        filterLayers?: boolean | undefined;
        /**
         * - Liste des couches à filtrer {"layerName": "service"}
         */
        filterLayersList?: any;
        /**
         * - Garder les TMS avec style dans les métadonnées
         */
        filterTMS?: boolean | undefined;
        /**
         * - Options du service de recherche
         */
        serviceOptions?: {
            /**
             * - URL du service
             */
            url?: string | undefined;
            /**
             * - Index de recherche
             */
            index?: string | undefined;
            /**
             * - Champs de recherche
             */
            fields?: string[] | undefined;
            /**
             * - Nombre de réponses du service
             */
            size?: number | undefined;
            /**
             * - Nombre de résultats à afficher
             */
            maximumResponses?: number | undefined;
        } | undefined;
        /**
         * - Nombre maximum de résultats à afficher
         */
        maximumEntries?: number | undefined;
    } | undefined;
    /**
     * - Options du service de géocodage (voir Gp.Services.geocode {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~geocode Gp.Services.geocode}))
     */
    geocodeOptions?: {
        /**
         * - Options du service de géocodage
         */
        serviceOptions?: any;
    } | undefined;
    /**
     * - Options du service d'autocomplétion (voir Gp.Services.autoComplete {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~autoComplete Gp.Services.autoComplete})
     */
    autocompleteOptions?: {
        /**
         * - Options du service d'autocomplétion
         */
        serviceOptions?: any;
        /**
         * - Déclencher une requête de géocodage si aucune suggestion
         */
        triggerGeocode?: boolean | undefined;
        /**
         * - Délai avant la requête de géocodage (ms)
         */
        triggerDelay?: number | undefined;
        /**
         * - Nombre maximum de résultats d'autocomplétion à afficher
         */
        maximumEntries?: number | undefined;
        /**
         * - Nettoyer/embellir les résultats d'autocomplétion
         */
        prettifyResults?: boolean | undefined;
    } | undefined;
    /**
     * - Niveau de zoom à appliquer sur le résultat ("auto", niveau, ou fonction)
     * Value possible : auto or zoom level.
     * Possible to overload it with a function :
     * zoomTo : function (info) {
     * // do some stuff...
     * return zoom;
     * }
     */
    zoomTo?: string | number | Function | undefined;
};
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
 * SearchEngine control
 *
 * @alias ol.control.SearchEngine
 * @module SearchEngine
*/
declare class SearchEngine extends Control {
    /**
     * @constructor
     * @param {SearchEngineOptions}  options - control options
     * @fires searchengine:autocomplete:click
     * @fires searchengine:geocode:click
     * @fires searchengine:search:click
     * @fires searchengine:geolocation:click
     * @fires searchengine:geolocation:remove
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
    constructor(options: SearchEngineOptions);
    /**
     * Nom de la classe (heritage)
     * @private
     */
    private CLASSNAME;
    container: HTMLElement;
    /**
     * Overwrite OpenLayers setMap method
     *
     * @param {Map} map - Map.
     */
    setMap(map: Map): void;
    /**
     * Returns true if widget is collapsed (minimized), false otherwise
     *
     * @returns {Boolean} collapsed - true if widget is collapsed
     */
    getCollapsed(): boolean;
    /**
     * Collapse or display widget main container
     *
     * @param {Boolean} collapsed - True to collapse widget, False to display it
     */
    setCollapsed(collapsed: boolean): void;
    collapsed: boolean | undefined;
    /**
     * Get locations data from geocode service
     *
     * @returns {Object} data - locations
     */
    getData(): any;
    /**
     * Get container
     *
     * @returns {HTMLElement} container
     */
    getContainer(): HTMLElement;
    /**
     * Initialize SearchEngine control (called by SearchEngine constructor)
     *
     * @param {Object} options - constructor options
     * @private
     */
    private initialize;
    options: {
        collapsed: boolean;
        collapsible: boolean;
        zoomTo: string;
        resources: {
            geocode: never[];
            autocomplete: never[];
            search: boolean;
        };
        displayButtonClose: boolean;
        displayButtonAdvancedSearch: boolean;
        displayButtonGeolocate: boolean;
        displayButtonCoordinateSearch: boolean;
        coordinateSearchInAdvancedSearch: boolean;
        advancedSearch: {};
        coordinateSearch: {};
        searchOptions: {
            addToMap: boolean;
            maximumEntries: number;
            serviceOptions: {
                maximumResponses: number;
            };
            filterLayers: boolean;
        };
        geocodeOptions: {
            serviceOptions: {};
        };
        autocompleteOptions: {
            serviceOptions: {
                maximumResponses: number;
            };
            triggerGeocode: boolean;
            triggerDelay: number;
            prettifyResults: boolean;
        };
        displayMarker: boolean;
        markerStyle: string;
        markerUrl: string;
        placeholder: string;
        splitResults: boolean;
    } | undefined;
    _uid: any;
    _showSearchEngineButton: any;
    _showSearchEngineAdvancedButton: any;
    /** @private */
    private _inputSearchContainer;
    /** @private */
    private _autocompleteContainer;
    /** @private */
    private _containerResultsLocation;
    /** @private */
    private _containerResultsSuggest;
    /** @private */
    private _radioButtonLocation;
    /** @private */
    private _radioButtonSuggest;
    /** @private */
    private _suggestedLocations;
    /** @private */
    private _geocodedContainer;
    /** @private */
    private _geocodedLocations;
    /** @private */
    private _filterContainer;
    /** @private */
    private _currentGeocodingCode;
    /** @private */
    private _currentGeocodingLocation;
    /** @private */
    private _advancedSearchFilters;
    /** @private */
    private _advancedSearchCodes;
    /** @private */
    private _coordinateSearchSystems;
    _currentCoordinateSearchSystems: any;
    _currentCoordinateSearchType: any;
    /** @private */
    private _coordinateSearchUnits;
    _currentCoordinateSearchUnits: any;
    /** @private */
    private _coordinateSearchLngInput;
    /** @private */
    private _coordinateSearchLatInput;
    /** @private */
    private _marker;
    _markerUrl: any;
    /** @private */
    private _displayMarker;
    /** @private */
    private _popupContent;
    /** @private */
    private _popupDiv;
    /** @private */
    private _popupOverlay;
    /** @private */
    private _triggerHandler;
    /**
     * this method is called by this.initialize()
     * and makes sure input options are correctly formated
     *
     * @param {Object} options - options
     *
     * @private
     */
    private _checkInputOptions;
    /**
     * this method is called by this.initialize()
     * and initialize the geocoding resources titles.
     *
     * @private
     */
    private _initAdvancedSearchCodes;
    /**
     * this method is called by this.onAdd()
     * and initialize the advanced geocoding filters.
     *
     * @private
     */
    private _initAdvancedSearchFilters;
    /**
     * this method is called by the constructor and initialize the projection
     * systems.
     * getting coordinates in the requested projection :
     * see this.onCoordinateSearchSystemChange()
     *
     * @private
     */
    private _initCoordinateSearchSystems;
    /**
     * this method is called by the constructor and initialize the units.
     * getting coordinates in the requested units :
     * see this.onCoordinateSearchUnitsChange()
     *
     * @private
     */
    private _initCoordinateSearchUnits;
    /**
     * this method is called by this.initialize() and initialize popup div
     * (to display results information on marker click)
     *
     * @returns {Object} element - DOM element for popup
     * @private
     */
    private _initPopupDiv;
    /**
     * Create control main container
     *
     * @returns {HTMLElement} DOM element
     *
     * @private
     */
    private _initContainer;
    _containerSystems: any;
    _containerUnits: any;
    _containerCoordinateLat: any;
    _containerCoordinateLng: any;
    /**
     * this method is called by :
     * - this._initContainer() : ...
     * - this.onGeocodingAdvancedSearchCodeChoice() : ...
     * and initialize or create the filters container HTMLElement
     * to the geocoding advanced menu.
     *
     * @param {String} code - resource geocoding name
     *
     * @returns {HTMLElement} DOM element
     * @private
     */
    private _setFilter;
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
    private _requestAutoComplete;
    /**
     * this method is called by this.onAutoCompleteSearchText() (case of success)
     * and fills the container of the location list.
     * it creates a HTML Element per location
     *
     * @param {Array} locations - Array of Gp.Services.AutoComplete.SuggestedLocation corresponding to autocomplete results list
     * @private
     */
    private _fillAutoCompletedLocationListContainer;
    /**
     * this method is called by this.() (case of success)
     * and fills the container of the suggest list.
     * it creates a HTML Element per suggest
     *
     * @param {Array} suggests - Array of suggested corresponding to search results list
     * @private
     */
    private _fillSearchedSuggestListContainer;
    /**
     * this method is called by this.() (case of success)
     * and clean the results of the suggest list from a list of layers
     * by default, the Config.layers list.
     *
     * @param {Array} suggests - Array of suggested corresponding to search results list
     * @returns {Array} suggests - Array of suggested corresponding to search results list filtered by Config
     * @private
     */
    private _filterResultsFromConfigLayers;
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
    private _requestGeocoding;
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
    private _fillGeocodedLocationListContainer;
    /**
     * this sends the label to the panel.
     *
     * @param {String} label - label suggested location
     * @private
     */
    private _setLabel;
    /**
     * this method is called by this.on*ResultsItemClick()
     * and move/zoom on a position.
     *
     * @param {Array} position - ol.Coordinate object [lon, lat] (en lat/lon : "EPSG:4326")
     * @param {Number} zoom - zoom level
     * @private
     */
    private _setPosition;
    /**
     * this method is called by this.on*ResultsItemClick()
     * and displays a marker.
     * FIXME
     *
     * @param {Array} position - ol.Coordinate object [lon, lat] ou [x, y]
     * @param {Object} info - location information
     * @private
     */
    private _setMarker;
    /**
     * this method is called by this.on*ResultsItemClick()
     * and get zoom to results.
     *
     * @param {Object} info - info
     *
     * @returns {Integer} zoom
     * @private
     */
    private _getZoom;
    /**
     * this method is called on 'click' on this._marker
     * (cf. this._setMarker() )
     * and sets a popup with marker information
     *
     * @param {Object} information - location information
     * @param {Array} position - [lon, lat] of marker
     * @private
     */
    private _onResultMarkerSelect;
    /**
     * Set additional projection system
     *
     * @param {Object} system - projection system
     * @param {String} system.crs - Proj4 crs alias (from proj4 defs) e.g. "EPSG:4326"
     * @param {String} [system.label] - CRS label to be displayed in control. Default is system.crs alias
     * @param {String} [system.type] - CRS units type for coordinates conversion (one of control options.units). Default is "Metric"
     * @private
     */
    private _setSystem;
    /**
     * this method is called by event 'click' on 'GPshowSearchEnginePicto' tag label
     * (cf. this._createShowSearchEnginePictoElement), and it cleans the component
     * when it's closed.
     *
     * @param { Event } e évènement associé au clic
     * @private
     */
    private onShowSearchEngineClick;
    /**
     * this method is called by event 'click' on 'GPsearchInputReset' tag div
     * (cf. this._createSearchInputElement), and it cleans the value of input.
     *
     * @private
     */
    private onSearchResetClick;
    /**
     * this method is called by event 'click' on 'GPshowGeolocate' tag div
     * (cf. this._createShowGeolocateElement)
     *
     * @private
     */
    private onShowSearchGeolocateClick;
    /**
     * this method is called by event 'click' on 'GPshowSearchByCoordinate' tag div
     * (cf. this._createShowSearchByCoordinateElement)
     *
     * @private
     */
    private onShowSearchByCoordinateClick;
    /**
     * ...
     * @param {*} dom - ...
     * @private
     * @returns {Object} ...
     */
    private _getCoordinateSearchDMS;
    /**
     * this method is called by event 'click' on 'GPlocationOrigin' input
     *
     * @private
     */
    private onAutoCompleteInputClick;
    /**
     * this method is called by event 'keyup' on 'GPsearchInputText' tag input
     * (cf. this._createSearchInputElement), and it gets the value of input.
     * this value is passed as a parameter for the service autocomplete (text).
     * the results of the request are displayed into a drop down menu.
     *
     * @param {Event} e - HTMLElement
     * @private
     */
    private onAutoCompleteSearchText;
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
    private _getGeocodeCoordinatesFromFullText;
    /**
     * this method is called by event 'click' on 'GPautoCompleteResultsList' tag div
     * (cf. this._createAutoCompleteListElement), and it selects the location.
     * this location displays a marker on the map.
     *
     * @param {Event} e - HTMLElement
     * @private
     */
    private onAutoCompletedResultsItemClick;
    /**
     * this method is called by event 'click' on '' tag div
     * (cf. this.), and it selects the suggest.
     * this suggest call an event to added layer on the map.
     *
     * @param {Event} e - HTMLElement
     * @private
     */
    private onSearchedResultsItemClick;
    /**
     * this method is called by event 'submit' on 'GPsearchInput' tag form
     * (cf. this._createSearchInputElement), and it gets the value of input.
     * this value is passed as a parameter for the service geocoding.
     * the results of the request are displayed into a window.
     *
     * @param {Event} e - HTMLElement
     * @private
     */
    private onGeocodingSearchSubmit;
    /**
     * this method is called by event 'submit' on 'GPgeocodeResultsList' tag div
     * (cf. this._createGeocodeResultsListElement), and it selects the location.
     * this location displays a marker on the map.
     *
     * @param {Event} e - HTMLElement
     * @private
     */
    private onGeocodedResultsItemClick;
    /**
     * this method is called by event 'change' on 'GPadvancedSearchCode' tag select
     * (cf. this._createAdvancedSearchFormCodeElement), and it gets the value of
     * option selected.
     * this value is passed as a parameter to create the attributs container.
     *
     * @param {Event} e - HTMLElement
     * @private
     */
    private onGeocodingAdvancedSearchCodeChange;
    /**
     * this method is called by event 'submit' on 'GPadvancedSearchForm' tag form
     * (cf. this._createAdvancedSearchPanelFormElement), and it gets the value of all input.
     * this value is passed as a parameter for the service geocoding.
     * the results of the request are displayed into a window.
     *
     * @param {Event} e - HTMLElement
     * @param {Array} data - [{key: ..., value: ...}]
     * @private
     */
    private onGeocodingAdvancedSearchSubmit;
    /**
     * this method is called by 'onGeocodingAdvancedSearchSubmit' method,
     * in case geocoding type is 'CadastralParcel',
     * and gets request parameters from inputs
     *
     * @param {Object} filterOptions - object with inputs value (department, insee, ...)
     * @returns {String} location - cadastral parcel number : concatenation of inputs values (e.g. : 940670000D0041 or 94067_____0041)
     * @private
     */
    private _getCadastralParcelRequestParams;
    /**
     * this method is called by event 'change' on ''
     * tag select (cf. this.),
     * and selects the system projection.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    private onCoordinateSearchSystemChange;
    /**
     * this method is called by event 'change' on ''
     * tag select (cf. this.),
     * and selects the units projection.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    private onCoordinateSearchUnitsChange;
    /**
     * this method is called by event 'click' on ''
     * tag select (cf. this.),
     * and clear app.
     *
     * @private
     */
    private onCoordinateSearchClose;
    /**
     * @private
     */
    private _updateCoordinateSearchElements;
    /**
     * this method is called by this.onSearchReset()
     * and it clears all results and the marker.
     *
     * @private
     */
    private _clearResults;
    /**
     * this method is called by this.onAutoCompleteSearchText()
     * and it clears all suggested location.
     *
     * @private
     */
    private _clearSuggestedLocation;
    /**
     * this method is called by this.onAutoCompleteSearchText()
     * and it clears suggested location from duplicate entries and improve unprecise fulltext entries.
     *
     * @param {Array} autocompleteResults - Array of autocompleteResults to display
     * @private
     */
    private _prettifyAutocompleteResults;
    /**
     * this method is called to hide suggested locations
     *
     * @private
     */
    private _hideSuggestedLocation;
    /**
     * this method is called to display suggested location.
     *
     * @private
     */
    private _displaySuggestedLocation;
    /**
     * this method is called by this.onGeocodingAdvancedSearchSubmit()
     * and it clears all geocoded location.
     *
     * @private
     */
    private _clearGeocodedLocation;
}
import Control from "../Control";
import Map from "ol/Map";
//# sourceMappingURL=SearchEngine.d.ts.map