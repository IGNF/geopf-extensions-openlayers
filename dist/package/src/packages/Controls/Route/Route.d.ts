export default Route;
/**
 * @classdesc
 *
 * Route Control.
 *
 * @alias ol.control.Route
 * @module Route
*/
declare class Route extends Control {
    /**
     * @constructor
     * @param {Object} options - route control options
     * @param {Number} [options.id] - Ability to add an identifier on the widget (advanced option)
     * @param {String}  [options.apiKey] - API key for services call (route and autocomplete services). The key "calcul" is used by default.
     * @param {Boolean} [options.ssl = true] - use of ssl or not (default true, service requested using https protocol)
     * @param {Boolean} [options.collapsed = true] - Specify if widget has to be collapsed (true) or not (false) on map loading. Default is true.
     * @param {Boolean} [options.draggable = false] - Specify if widget is draggable
     * @param {Boolean|Object} [options.export = false] - Specify if button "Export" is displayed. For the use of the options of the "Export" control, see {@link packages/Controls/Export/Export.default}
     * @param {Object}  [options.exclusions = {"toll" : false, "tunnel" : false, "bridge" : false}] - list of exclusions with status (true = checked). By default : no exclusions checked.
     * @param {Array}   [options.graphs = ["Voiture", "Pieton"]] - list of resources, by default : ["Voiture", "Pieton"]. The first element is selected.
     * @param {Object} [options.routeOptions = {}] - route service options. see {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~route Gp.Services.route()} to know all route options.
     * @param {Object} [options.autocompleteOptions = {}] - autocomplete service options. see {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~autoComplete Gp.Services.autoComplete()} to know all autocomplete options
     * @param {Object} [options.markersOpts] - options to use your own markers. Object properties can be "departure", "stages" or "arrival". Corresponding value is an object with following properties :
     * @param {String} [options.markersOpts.url] - marker base64 encoded url (ex "data:image/png;base64,...""). Mandatory for a custom marker
     * @param {Array} [options.markersOpts.offset] - Offsets in pixels used when positioning the overlay. The first element in the array is the horizontal offset. A positive value shifts the overlay right. The second element in the array is the vertical offset. A positive value shifts the overlay down. Default is [0, 0]. (see http://openlayers.org/en/latest/apidoc/ol.Overlay.html)
     * @param {Object} [options.layerDescription = {}] - Layer informations to be displayed in LayerSwitcher widget (only if a LayerSwitcher is also added to the map)
     * @param {String} [options.layerDescription.title = "Itinéraire"] - Layer title to be displayed in LayerSwitcher
     * @param {String} [options.layerDescription.description = "Itinéraire basé sur un graphe"] - Layer description to be displayed in LayerSwitcher
     * @fires route:drawstart
     * @fires route:drawend
     * @fires route:compute
     * @fires route:compute
     * @fires route:newresults
     * @example
     *  var route = ol.control.Route({
     *      "collapsed" : true
     *      "draggable" : true,
     *      "export"    : false,
     *      "exclusions" : {
     *         "toll" : true,
     *         "bridge" : false,
     *         "tunnel" : true
     *      },
     *      "graphs" : ['Pieton', 'Voiture'],
     *      "markersOpts" : {
     *          "departure" : {
     *              "url" : "...",
     *              "offset" : [0,0]
     *          },
     *          "stages" : {
     *              "url" : "...",
     *              "offset" : [0,0]
     *          },
     *          "arrival" : {
     *              "url" : "...",
     *              "offset" : [0,0]
     *          }
     *      }
     *      "autocompleteOptions" : {},
     *      "routeOptions" : {}
     *  });
     *
     *  // if you want to pluggued the control Export with options :
     *  var route = new ol.control.Route({
     *    export : {
     *      name : "export",
     *      format : "geojson",
     *      title : "Exporter",
     *      menu : false
     *    }
     *  });
     */
    constructor(options: {
        id?: number | undefined;
        apiKey?: string | undefined;
        ssl?: boolean | undefined;
        collapsed?: boolean | undefined;
        draggable?: boolean | undefined;
        export?: boolean | any;
        exclusions?: any;
        graphs?: any[] | undefined;
        routeOptions?: any;
        autocompleteOptions?: any;
        markersOpts?: {
            url?: string | undefined;
            offset?: any[] | undefined;
        } | undefined;
        layerDescription?: {
            title?: string | undefined;
            description?: string | undefined;
        } | undefined;
    });
    /**
     * Nom de la classe (heritage)
     * @private
     */
    private CLASSNAME;
    _container: any;
    element: any;
    /**
     * Overwrite OpenLayers setMap method
     *
     * @param {Map} map - Map.
     */
    setMap(map: Map): void;
    export: ButtonExport | null | undefined;
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
     * Get vector layer where geoJson route is drawn
     *
     * @returns {VectorLayer} layer - ol.layer.Vector route layer
     */
    getLayer(): VectorLayer;
    /**
     * Set vector layer where route geometry is drawn
     *
     * @param {VectorLayer} layer - ol.layer.Vector route layer
     */
    setLayer(layer: VectorLayer): void;
    _geojsonSections: VectorLayer<VectorSource<any>, any> | VectorLayer<VectorSource<import("ol").Feature<import("ol/geom").Geometry>>, import("ol").Feature<import("ol/geom").Geometry>> | null | undefined;
    /**
     * Get vector layer
     *
     * @returns {String} geojson - GeoJSON format layer
     */
    getGeoJSON(): string;
    /**
     * Set vector layer
     *
     * @param {String} geojson - GeoJSON format layer
     */
    setGeoJSON(geojson: string): void;
    _geojsonObject: any;
    /**
     * Get route informations
     *
     * @returns {Object} data - route informations
     */
    getData(): any;
    /**
     * Set route data
     *
     * @param {Object} data - control informations
     * @param {String} data.transport - transport type
     * @param {String} data.computation - computation type
     * @param {Array} data.exclusions - list of exclusions
     * @param {Array} data.points - list of points : [[lon, lat]]
     * @param {Object} data.results - service response
     */
    setData(data: {
        transport: string;
        computation: string;
        exclusions: any[];
        points: any[];
        results: any;
    }): void;
    _currentTransport: any;
    _currentComputation: any;
    _currentExclusions: any;
    _currentRouteInformations: any;
    /**
     * Get container
     *
     * @returns {HTMLElement} container
     */
    getContainer(): HTMLElement;
    /**
     * Get default style
     *
     * @returns {Style} style
     */
    getStyle(): Style;
    /**
     * This method is public.
     * It allows to init the control.
     */
    init(): void;
    /**
     * Clean UI : reinit control
     */
    clean(): void;
    /**
     * Initialize route control (called by Route constructor)
     *
     * @param {Object} options - constructor options
     * @private
     */
    private initialize;
    options: {
        collapsed: boolean;
        draggable: boolean;
        export: boolean;
        graphs: string[];
        exclusions: {
            toll: boolean;
            tunnel: boolean;
            bridge: boolean;
        };
        routeOptions: {};
        autocompleteOptions: {};
        layerDescription: {
            title: string;
            description: string;
        };
    } | undefined;
    /**
     * @type {Boolean}
     * specify if Route control is draggable (true) or not (false) */
    draggable: boolean | undefined;
    /** @private */
    private _uid;
    /** @private */
    private _showRouteButton;
    /** @private */
    private _panelRouteContainer;
    /** @private */
    private _panelHeaderRouteContainer;
    /** @private */
    private _waitingContainer;
    /** @private */
    private _formRouteContainer;
    /** @private */
    private _resultsRouteContainer;
    /** @private */
    private _showRouteExclusionsElement;
    /** @private */
    private _currentPoints;
    /** @private */
    private _waiting;
    /** @private */
    private _timer;
    /** @private */
    private _geojsonRoute;
    /** @private */
    private _popupContent;
    /** @private */
    private _popupDiv;
    /** @private */
    private _popupOverlay;
    /** @private */
    private _resultsSelectInteraction;
    /** @private */
    private _resultsHoverInteraction;
    /** @type {Style} */
    _defaultFeatureStyle: Style | undefined;
    /** @type {Style} */
    _selectedFeatureStyle: Style | undefined;
    /** @private */
    private _resources;
    /** @private */
    private listenerKey;
    /**
     * this method is called by this.initialize()
     *
     * @param {Object} options - options
     *
     * @private
     */
    private _checkInputOptions;
    /**
     * initialize component container (DOM)
     *
     * @param {Object} map - the map
     *
     * @returns {HTMLElement} DOM element
     *
     * @private
     */
    private _initContainer;
    /**
     * this method is called by the constructor and initialize transport mode
     * ("Voiture" ou "Pieton")
     *
     * @private
     */
    private _initTransport;
    /**
     * this method is called by the constructor and initialize computation mode
     * (fastest or shortest)
     *
     * @private
     */
    private _initComputation;
    /**
     * this method is called by the constructor and initialize exclusions
     *
     * @private
     */
    private _initExclusions;
    /**
     * this method is called by this.initialize() and initialize popup div
     * (to display results information on route result click)
     *
     * @returns {Object} element - DOM element for popup
     * @private
     */
    private _initPopupDiv;
    /**
     * Create List Points
     * Overwrite RouteDOM method !
     *
     * @param {Map} map - the map
     *
     * @returns {Array} List DOM element
     * @private
     */
    private _createRoutePanelFormPointsElement;
    /**
     * Attach events listeners to route form points (locationSelector)
     *
     * @param {Object} formPoint - route form point (locationSelector)
     * @private
     */
    private _addFormPointsEventListeners;
    /**
     * this method is called by event 'submit' on 'GProuteForm' tag form
     * (cf. this._createRoutePanelFormElement), and it displays the results.
     *
     * @param {Object} options - options
     * @private
     */
    private onRouteComputationSubmit;
    /**
     * this method is called by event 'click' on 'GPlocationOriginLabel' label
     * and set 'GProuteForm' CSS class to "" (normal)
     *
     * @param {Object} routeControl - context : route Control (this)
     * @private
     */
    private onRouteOriginLabelClick;
    /**
     * this method is called by event 'click' on 'GPlocationOriginPointerImg' label
     * and display or minimize 'GProuteForm', using CSS class ("GProuteFormMini" or "")
     *
     * @param {Object} e - context : route Control (equivalent to this)
     * @param {Object} locationSelector - context : locationSelector input (one of this._currentPoints)
     * @private
     */
    private onRouteOriginPointerClick;
    /**
     * this method is called by event 'click' on 'GPshowRoutePicto'
     * tag label (cf. this._createShowRoutePictoElement),
     * and it cleans all value of input.
     *
     * @param {Event} e - HTMLElement
     * @private
     */
    private onShowRoutePanelClick;
    /**
     * this method is called by event 'change' on 'GProuteComputationSelect' tag select
     * (cf. this._createRoutePanelFormModeChoiceComputeElement).
     * this value is saved as a parameter for the service route.
     *
     * @param {Event} e - HTMLElement
     * @private
     */
    private onRouteModeComputationChange;
    /**
     * this method is called by event 'change' on 'GProuteResultsComputationSelect' tag select
     * (cf. this._createRouteResultsElement).
     * this value is saved as a parameter for the service route,
     * and this launches the route request !
     *
     * @param {Event} e - HTMLElement
     * @private
     */
    private onRouteModeComputationChangeAndRun;
    /**
     * this method is called by event 'change' on 'GProuteTransportCar' or 'GProuteTransportPedestrian' tag input
     * (cf. this._createRoutePanelFormModeChoiceTransportElement).
     * this value is saved as a parameter for the service route.
     *
     * @param {ObjecEventt} e - HTMLElement
     * @private
     */
    private onRouteModeTransportChange;
    /**
     * TODO this method is called by event 'click' on 'GPshowRouteExclusionsPicto' tag input
     * (cf. this._createShowRouteExclusionsPictoElement), and it displays the panel options of exclusions.
     *
     * @param {Event} e - HTMLElement
     * @private
     */
    private onShowRouteExclusionsClick;
    /**
     * this method is called by event 'change' on 'GProuteExclusionsToll'
     * or 'GProuteExclusionsTunnel' or 'GProuteExclusionsBridge' tag input
     * (cf. this._createRoutePanelFormExclusionOptionsElement).
     * this value is saved as a parameter for the service route.
     *
     * @param {Event} e - HTMLElement
     * @private
     */
    private onRouteExclusionsChange;
    /**
     * this method is called by event 'click' on 'GProuteReset'
     * tag label (cf. this._createRouteFormResetElement),
     * and it cleans all route input options and results.
     *
     * @private
     */
    private onRouteResetClick;
    /**
     * this method is called by event 'click' on 'GProuteSubmit'
     * tag label (cf. this._createRouteSubmitFormElement),
     * and it cleans the route geometry.
     *
     * @private
     */
    private onShowRouteResultsNewClick;
    /**
     * this method is called by event 'mouseover' on 'GProuteResultsDetailsInstruction_'
     * tag label (cf. this._addRouteResultsDetailsElement),
     * and it makes a style on feature route.
     *
     * @param {Event} e - HTMLElement
     * @private
     */
    private onRouteResultsDetailsMouseOver;
    /**
     * this method is called by event 'mouseout' on 'GProuteResultsDetailsInstruction_'
     * tag label (cf. this._addRouteResultsDetailsElement),
     * and it deletes a style on feature route.
     *
     * @param {Event} e - HTMLElement
     * @private
     */
    private onRouteResultsDetailsMouseOut;
    /**
     * this method is called by this.onRouteComputationSubmit()
     * and executes a request to the service.
     *
     * @param {Object} options - route service request options
     * @param {Function} options.onSuccess - callback
     * @param {Function} options.onFailure - callback
     * @private
     */
    private _requestRouting;
    /**
     * this method is called by this.onRouteComputationSubmit() (in case of route computation success)
     * and fills the container of the route instructions list, distance and time
     * information, also, constructs the geometry route.
     *
     * @param {Object} results - results of the route calculation
     *
     * @private
     */
    private _fillRouteResultsDetails;
    /**
     * this method is called by this._fillRouteResultsDetails()
     * and fills the container of the route instructions list, distance and time
     * information.
     *
     * @param {Number} distance - distance
     * @param {Number} duration - duration
     * @param {Object[]} instructions - list of instructions
     *
     * @private
     */
    private _fillRouteResultsDetailsContainer;
    /** @private */
    private _resultsRouteValuesContainer;
    /** @private */
    private _resultsRouteDetailsContainer;
    /**
     * this method is called by this._fillRouteResultsDetails()
     * and constructs the geometry route.
     *
     * @param {Object} geometry - geoJSON object for route geometry
     * @param {Object} style - route ol.style.Style object
     * @private
     */
    private _fillRouteResultsDetailsGeometry;
    /**
     * this method is called by this._fillRouteResultsDetails()
     * and constructs the geometries street with informations.
     *
     * @param {Array} instructions - route instructions list (containing geoJSON geometry)
     * @param {Object} style - route ol.style.Style object
     * @private
     */
    private _fillRouteResultsDetailsFeatureGeometry;
    /**
     * this method is called on route features hover
     * and highlight instruction label
     *
     * @param {Event} e - event
     *
     * @private
     */
    private _onResultsFeatureMouseOver;
    /**
     * this method is called on route features select
     * and set a popup with feature information
     *
     * @param {Event} e - on select event
     * @private
     */
    private _onResultsFeatureSelect;
    /**
     * this method is called by this.onShowRoutePanelClick()
     * and it clears all elements (reinit).
     *
     * @private
     */
    private _clear;
    /**
     * this method is called by this.onRouteResetClick()
     * and it clears all options inputs (reinit).
     *
     * @private
     */
    private _clearRouteInputOptions;
    /**
     * this method is called by this._clear()
     * and it removes step location inputs (excepted departure and arrival)
     *
     * @private
     */
    private _removeRouteStepLocations;
    /**
     * this method is called by this.onRouteComputationSubmit() (in case of failure)
     * and it clears all route instructions.
     *
     * @private
     */
    private _clearRouteResultsDetails;
    /**
     * this method is called by this.onRouteComputationSubmit()
     * and it clears all route geometries.
     *
     * @private
     */
    private _clearRouteResultsGeometry;
    /**
     * this method is called by this.onRouteComputationSubmit()
     * and it clears all route geometries.
     *
     * @private
     */
    private _clearRouteResultsFeatureGeometry;
    /**
     * this method is called by event 'click' on control main container
     * and hide suggested Locations (unless target is an autocomplete input)
     *
     * @param {Object} e - event
     *
     * @private
     */
    private _hideRouteSuggestedLocations;
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
    /**
     * simplified instructions
     *
     * @param {Object[]} instructions - list of instructions
     *
     * @returns {Object[]} simplified instructions
     *
     * @private
     */
    private _simplifiedInstructions;
}
import Control from "../Control";
import Map from "ol/Map";
import ButtonExport from "../Export/Export";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Style } from "ol/style";
//# sourceMappingURL=Route.d.ts.map