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
declare var SearchEngine: ol.control.SearchEngine;
//# sourceMappingURL=SearchEngine.d.ts.map