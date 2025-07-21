export default SearchEngine;
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
 * @param {Boolean} [options.coordinateSearchInAdvancedSearch = false] -True to display coord search in advanced search
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
 * @param {String[]}  [options.searchOptions.filterServices] - filter on a list of search services, each field is separated by a comma. "WMTS,TMS" by default
 * @param {String[]}  [options.searchOptions.filterWMTSPriority] - filter on priority WMTS layer in search, each field is separated by a comma. "PLAN.IGN,ORTHOIMAGERY.ORTHOPHOTOS" by default
 * @param {String[]}  [options.searchOptions.filterProjections] - filter on a list of projections : the searchEngine ignore the suggestions with one of the projections listed. Each field is separated by a comma.
 * @param {Boolean}  [options.searchOptions.filterLayersPriority = false] - filter on priority layers in search, false by default
 * @param {Boolean}  [options.searchOptions.filterLayers] - false to disable the automatic filter from Config or from the filterLayerList parameter. True by Default.
 * @param {Object}  [options.searchOptions.filterLayersList] - filter on list of search layers list with a struture {"layerName" : "service"}. By Default, the layers available in Config.configuration.layers.
 * @param {Boolean}  [options.searchOptions.filterTMS] - filter the results to keep TMS with at least a style (.json) into the metadata. True by Default.
 * @param {Object}  [options.searchOptions.serviceOptions] - options of search service
 * @param {String}   [options.searchOptions.serviceOptions.url] - url of service
 * @param {String}  [options.searchOptions.serviceOptions.index] - index of search, "standard" by default
 * @param {String[]}  [options.searchOptions.serviceOptions.fields] - list of search fields, each field is separated by a comma. "title,layer_name" by default
 * @param {Number}  [options.searchOptions.serviceOptions.size] - number of response in the service. 1000 by default
 * @param {Number}  [options.searchOptions.serviceOptions.maximumResponses] - number of results in the response. 10 by default
 * @param {Number}  [options.searchOptions.maximumEntries] - maximum search results we want to display.
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
declare class SearchEngine {
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
    constructor(options: any);
    /**
     * Nom de la classe (heritage)
     * @private
     */
    private CLASSNAME;
    container: DOMElement;
    element: any;
    /**
     * Overwrite OpenLayers setMap method
     *
     * @param {ol.Map} map - Map.
     */
    setMap(map: ol.Map): void;
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
    getData(): Object;
    /**
     * Get container
     *
     * @returns {DOMElement} container
     */
    getContainer(): DOMElement;
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
    _inputSearchContainer: any;
    _autocompleteContainer: any;
    _containerResultsLocation: any;
    _containerResultsSuggest: any;
    _radioButtonLocation: any;
    _radioButtonSuggest: any;
    _suggestedLocations: any[] | undefined;
    _geocodedContainer: any;
    _geocodedLocations: any[] | Object[] | undefined;
    _filterContainer: any;
    _currentGeocodingCode: string | null | undefined;
    _currentGeocodingLocation: any;
    _advancedSearchFilters: {} | undefined;
    _advancedSearchCodes: any[] | {
        id: string;
        title: string;
    }[] | undefined;
    _coordinateSearchSystems: any[] | undefined;
    _currentCoordinateSearchSystems: any;
    _currentCoordinateSearchType: any;
    _coordinateSearchUnits: any[] | {
        Geographical: {
            code: string;
            label: string;
            format: (olCoordinate: any) => Object;
        }[];
        Metric: {
            code: string;
            label: string;
            format: (olCoordinate: any) => Object;
        }[];
    } | undefined;
    _currentCoordinateSearchUnits: any;
    _coordinateSearchLngInput: any;
    _coordinateSearchLatInput: any;
    _marker: any;
    _markerUrl: any;
    _displayMarker: boolean | undefined;
    _popupContent: HTMLDivElement | null | undefined;
    _popupDiv: Object | undefined;
    _popupOverlay: any;
    _triggerHandler: any;
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
     * @returns {DOMElement} DOM element
     *
     * @private
     */
    private _initContainer;
    _containerSystems: any;
    _containerUnits: any;
    _containerCoordinateLng: any;
    _containerCoordinateLat: any;
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
     */
    _setSystem(system: {
        crs: string;
        label?: string | undefined;
        type?: string | undefined;
    }): void;
    /**
     * this method is called by event 'click' on 'GPshowSearchEnginePicto' tag label
     * (cf. this._createShowSearchEnginePictoElement), and it cleans the component
     * when it's closed.
     *
     * @param { event } e évènement associé au clic
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
    _getCoordinateSearchDMS(dom: any): number | undefined;
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
     * @param {Object} e - HTMLElement
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
     * @param {Object} e - HTMLElement
     * @private
     */
    private onAutoCompletedResultsItemClick;
    /**
     * this method is called by event 'click' on '' tag div
     * (cf. this.), and it selects the suggest.
     * this suggest call an event to added layer on the map.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    private onSearchedResultsItemClick;
    /**
     * this method is called by event 'submit' on 'GPsearchInput' tag form
     * (cf. this._createSearchInputElement), and it gets the value of input.
     * this value is passed as a parameter for the service geocoding.
     * the results of the request are displayed into a window.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    private onGeocodingSearchSubmit;
    /**
     * this method is called by event 'submit' on 'GPgeocodeResultsList' tag div
     * (cf. this._createGeocodeResultsListElement), and it selects the location.
     * this location displays a marker on the map.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    private onGeocodedResultsItemClick;
    /**
     * this method is called by event 'change' on 'GPadvancedSearchCode' tag select
     * (cf. this._createAdvancedSearchFormCodeElement), and it gets the value of
     * option selected.
     * this value is passed as a parameter to create the attributs container.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    private onGeocodingAdvancedSearchCodeChange;
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
    _updateCoordinateSearchElements(): void;
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
//# sourceMappingURL=SearchEngine.d.ts.map