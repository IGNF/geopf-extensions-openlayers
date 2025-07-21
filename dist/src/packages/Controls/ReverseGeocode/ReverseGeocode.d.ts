export default ReverseGeocode;
/**
 * @classdesc
 *
 * ReverseGeocode Control.
 *
 * @constructor
 * @alias ol.control.ReverseGeocode
 * @type {ol.control.ReverseGeocode}
 * @extends {ol.control.Control}
 * @param {Object} options - ReverseGeocode control options
 * @param {Number} [options.id] - Ability to add an identifier on the widget (advanced option)
 * @param {String}  [options.apiKey] - API key for services call (reverse geocode service). The key "calcul" is used by default.
 * @param {String}  [options.ssl = true] - use of ssl or not (default true, service requested using https protocol)
 * @param {Boolean} [options.collapsed = true] - Specify if widget has to be collapsed (true) or not (false) on map loading. Default is true.
 * @param {Boolean} [options.draggable = false] - Specify if widget is draggable
 * @param {Object}  [options.resources =  ["StreetAddress", "PositionOfInterest", "CadastralParcel"]] - resources for geocoding, by default : ["StreetAddress", "PositionOfInterest", "CadastralParcel"]. Possible values are : "StreetAddress", "PositionOfInterest", "CadastralParcel". Resources will be displayed in the same order in widget list.
 * @param {Object}  [options.delimitations = ["Point", "Circle", "Extent"]] - delimitations for reverse geocoding, by default : ["Point", "Circle", "Extent"]. Possible values are : "Point", "Circle", "Extent". Delimitations will be displayed in the same order in widget list.
 * @param {Object}  [options.reverseGeocodeOptions = {}] - reverse geocode service options. see {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~reverseGeocode Gp.Services.reverseGeocode()} to know all reverse geocode options.
 * @param {Object} [options.layerDescription = {}] - Layer informations to be displayed in LayerSwitcher widget (only if a LayerSwitcher is also added to the map)
 * @param {String} [options.layerDescription.title = "Saisie (recherche inverse)"] - Layer title to be displayed in LayerSwitcher
 * @param {String} [options.layerDescription.description = "Couche de saisie d'une zone de recherche pour la recherche inverse"] - Layer description to be displayed in LayerSwitcher
 * @fires reversegeocode:compute
 * @fires reversegeocode:onclickresult
 * @example
 *  var iso = ol.control.ReverseGeocode({
 *      "collapsed" : false,
 *      "draggable" : true,
 *      "resources" : ["StreetAddress", "PositionOfInterest"],
 *      "delimitations" : ["Point", "Circle"],
 *      "reverseGeocodeOptions" : {}
 *  });
 */
declare class ReverseGeocode {
    /**
     * See {@link ol.control.ReverseGeocode}
     * @module ReverseGeocode
     * @alias module:~controls/ReverseGeocode
     * @param {*} options - options
     * @example
     * import ReverseGeocode from "gpf-ext-ol/controls/ReverseGeocode"
     * ou
     * import { ReverseGeocode } from "gpf-ext-ol"
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
     * Overwrite OpenLayers setMap method
     *
     * @param {ol.Map} map - Map.
     */
    setMap(map: ol.Map): void;
    _inputFeaturesLayer: any;
    _inputFeaturesSources: any;
    _inputFeatures: any;
    /**
     * Get locations data
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
     * Initialize ReverseGeocode control (called by ReverseGeocode constructor)
     *
     * @param {Object} options - constructor options
     * @private
     */
    private initialize;
    options: {
        collapsed: boolean;
        draggable: boolean;
        resources: string[];
        delimitations: string[];
        reverseGeocodeOptions: {};
        layerDescription: {
            title: string;
            description: string;
        };
    } | undefined;
    /** {Boolean} specify if reverseGeocoding control is draggable (true) or not (false) */
    draggable: boolean | undefined;
    _uid: any;
    _currentGeocodingType: any;
    _currentGeocodingDelimitation: any;
    _showReverseGeocodingButton: any;
    _panelContainer: any;
    _panelHeaderContainer: any;
    _panelTitleContainer: any;
    _returnPictoContainer: any;
    _panelCloseButton: any;
    _formContainer: any;
    _resultsContainer: any;
    _resultsListContainer: any;
    _waitingContainer: any;
    _inputFeaturesSource: any;
    _mapInteraction: any;
    _requestOptions: Object | null | undefined;
    _requestGeom: {
        type: string;
        coordinates: any[];
    } | {
        type?: undefined;
        coordinates?: undefined;
    } | {
        type: string;
        coordinates: any[][][];
    } | null | undefined;
    _requestPosition: {
        lon: any;
        lat: any;
    } | null | undefined;
    _waiting: boolean | undefined;
    _timer: NodeJS.Timeout | null | undefined;
    _reverseGeocodingLocations: any[] | undefined;
    _reverseGeocodingLocationsMarkers: any[] | undefined;
    _resultsDefaultStyle: any;
    _resultsSelectedStyle: any;
    _resultsHoverInteraction: any;
    _resultsSelectInteraction: any;
    _popupContent: HTMLDivElement | null | undefined;
    _popupDiv: Object | undefined;
    _popupOverlay: any;
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
     * this method is called by this.initialize() and initialize geocoding type (=resource)
     * ("StreetAddress", "PositionOfInterest", "CadastralParcel")
     *
     * @private
     */
    private _initGeocodingType;
    /**
     * this method is called by this.initialize() and initialize geocoding delimitation
     * ("Point", "Circle", "Extent")
     *
     * @private
     */
    private _initGeocodingDelimitation;
    /**
     * this method is called by this.initialize() and initialize popup div
     * (to display results information on marker click)
     *
     * @returns {Object} element - DOM element for popup
     * @private
     */
    private _initPopupDiv;
    /**
     * Create control main container (DOM initialize)
     *
     * @returns {DOMElement} DOM element
     *
     * @private
     */
    private _initContainer;
    /**
     * this method is called by this.setMap,
     * or by this.onShowReverseGeocodingClick,
     * and calls method corresponding to current delimitation, if widget is not collapsed.
     *
     * @param {ol.Map} map - control map.
     * @private
     */
    private _activateMapInteraction;
    /**
     * this method is called by this._activateMapInteraction,
     * and creates map point drawing interaction.
     *
     * @param {ol.Map} map - control map.
     * @private
     */
    private _activatePointInteraction;
    /**
     * this method is called by this._activateMapInteraction,
     * and creates map circle drawing interaction.
     *
     * @param {ol.Map} map - control map.
     * @private
     */
    private _activateCircleInteraction;
    /**
     * this method is called by this._activateMapInteraction,
     * and creates map box drawing interaction.
     *
     * @param {ol.Map} map - control map.
     * @private
     */
    private _activateBoxInteraction;
    /**
     * remove draw interaction from map (if exists)
     *
     * @param {ol.Map} map - control map.
     * @private
     */
    private _removeMapInteraction;
    /**
     * this method is called by event 'drawstart' on map point or circle drawing interaction
     * (cf. this._activatePointInteraction), and it gets map click coordinates.
     * this point is saved as a parameter for reverse Geocode service.
     *
     * @param {Object} e - HTMLElement
     * @param {String} type - geometry type : "point" or "circle"
     * @private
     */
    private _onDrawStart;
    /**
     * this method is called by event 'drawend' on map box drawing interaction
     * (cf. this._activateBoxInteraction), and it gets geometry coordinates,
     * to be saved as a filter parameter for reverse Geocode service.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    private _onBoxDrawEnd;
    /**
     * this change the cursor of the map when entering a point.
     *
     * @param {String} cursor - cursor style
     * @param {ol.Map} map - control map (optional)
     * @private
     */
    private _setCursor;
    /**
     * this methode is called by this.onReverseGeocodingSubmit method,
     * it generates and sends reverse geocode request, then displays results
     *
     * @private
     */
    private _reverseGeocodingRequest;
    /**
     * this methode is called by this._reverseGeocodingRequest method,
     * and returns options object for Gp.Services.reverseGeocode request
     *
     * @returns {Object} requestOptions - reverse geocode options
     * @private
     */
    private _getReverseGeocodingRequestOptions;
    /**
     * this method is called by this._reverseGeocodingRequest() (in case of reverse geocode success)
     * and display results : in both container list and map
     *
     * @param {Array} locations - array of geocoded locations (reverse geocode results)
     * @private
     */
    private _displayGeocodedLocations;
    /**
     * this method is called by this._displayGeocodedLocations()
     * and fills the container with results list
     *
     * @param {Array} locations - array of geocoded locations (reverse geocode results)
     * @private
     */
    private _fillGeocodedLocationListContainer;
    /**
     * this method is called by this._fillGeocodedLocationListContainer()
     * and fills location description (String), depending on matchType
     *
     * @param {Object} location - geocoded location (from reverse geocode results)
     * @returns {String} locationDescription - geocoded location description to be displayed
     * @private
     */
    private _fillGeocodedLocationDescription;
    /**
     * this method is called by this._displayGeocodedLocations()
     * and display locations in map (markers)
     *
     * @param {Object} locations - geocoded locations (reverse geocode result)
     * @private
     */
    private _displayGeocodedLocationsOnMap;
    /**
     * this method is called by this._displayGeocodedLocations()
     * and creates result layer (where geocoded locations will be displayed)
     *
     * @private
     */
    private _createResultsLayer;
    _resultsFeatures: any;
    _resultsFeaturesSource: any;
    _resultsFeaturesLayer: any;
    /**
     * this method is called by this._displayGeocodedLocations()
     * and displays locations in map (markers) : add new feature to results layer
     *
     * @param {Object} location - geocoded location (reverse geocode result)
     * @param {Number} i - geocoded location index in response list
     * @private
     */
    private _addResultFeature;
    /**
     * this method is called by this._addResultFeature()
     * and fills popup content (to be displayed on marker click) for a given geocoded location
     *
     * @param {Object} location - geocoded location (reverse geocode result)
     * @returns {String} popupContent - text to be displayed in popup
     * @private
     */
    private _fillPopupContent;
    /**
     * this method is called on 'pointerMove' on this._resultsFeaturesLayer (ol.interaction.Select)
     * (cf. this._displayGeocodedLocationsOnMap() )
     * and highlights result in list container
     *
     * @param {Object} e - on select event
     * @private
     */
    private _onResultsFeatureMouseOver;
    /**
     * this method is called on 'click' on this._resultsFeaturesLayer (ol.interaction.Select)
     * (cf. this._displayGeocodedLocationsOnMap() )
     * and sets a popup with feature information
     *
     * @param {Object} e - on select event
     * @private
     */
    private _onResultsFeatureSelect;
    /**
     * this method is called by event 'click' on 'GPshowReverseGeocodingPicto' tag label
     * (cf. ReverseGeocodeDOM._createShowReverseGeocodingPictoElement), and it cleans the component
     * when it's closed.
     *
     * @param { event } e évènement associé au clic
     * @private
     */
    private onShowReverseGeocodingClick;
    /**
     * this method is called by event 'change' on 'GPreverseGeocodingCode' tag select
     * (cf. ReverseGeocodeDOM._createReverseGeocodingFormModeChoiceGeocodingTypeElement).
     * this value is saved as a parameter for reverseGeocode service.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    private onReverseGeocodingTypeChange;
    /**
     * this method is called by event 'change' on 'GPreverseGeocodingCode' tag select
     * (cf. ReverseGeocodeDOM._createReverseGeocodingFormModeChoiceGeocodingDelimitationElement).
     * this value is saved as a parameter for reverseGeocode service.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    private onReverseGeocodingDelimitationChange;
    /**
     * this method is called by event 'click' on 'GPreverseGeocodingReturnPicto' div
     * (cf. ReverseGeocodeDOM._createReverseGeocodingPanelReturnPictoElement),
     * and clear geocoded location (from both list container and map)
     *
     * @private
     */
    private onGPreverseGeocodingReturnPictoClick;
    /**
     * this methode is called by event 'submit' on reverseGeocoding form ('GPreverseGeocodingForm')
     * (cf. ReverseGeocodeDOM._createReverseGeocodingPanelFormElement),
     * it checks reverse geocode mandatory parameters,
     * then call this._reverseGeocodingRequest() to generate and send request
     *
     * @private
     */
    private onReverseGeocodingSubmit;
    /**
     * this method is called by event 'click' on 'GPreverseGeocodedLocation_' div
     * (cf. ReverseGeocodeDOM._createReverseGeocodingResultElement),
     * and zoom to location ?
     * TODO
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    private onReverseGeocodingResultClick;
    /**
     * this method is called by event 'mouseover' on 'GPreverseGeocodedLocation_' div
     * (cf. ReverseGeocodeDOM._createReverseGeocodingResultElement),
     * and changes style of matching marker on map (selected)
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    private onReverseGeocodingResultMouseOver;
    /**
     * this method is called by event 'mouseout' on 'GPreverseGeocodedLocation_' div
     * (cf. ReverseGeocodeDOM._createReverseGeocodingResultElement),
     * and changes style of matching marker on map (default)
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    private onReverseGeocodingResultMouseOut;
    /**
     * this method clears previous location results
     *
     * @private
     */
    private _clearResults;
    /**
     * this method clears previous input features (features, layer, position and filters)
     *
     * @private
     */
    private _clearInputFeatures;
    /**
     * this method displays waiting container and sets a timeout
     *
     * @private
     */
    private _displayWaitingContainer;
    /**
     * this method hides waiting container and clears timeout
     *
     * @private
     */
    private _hideWaitingContainer;
}
//# sourceMappingURL=ReverseGeocode.d.ts.map