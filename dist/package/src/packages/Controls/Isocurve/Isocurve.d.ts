export default Isocurve;
/**
 * @classdesc
 *
 * Isocurve Control.
 *
 * @constructor
 * @alias ol.control.Isocurve
 * @type {ol.control.Isocurve}
 * @extends {ol.control.Control}
 * @param {Object} options - Isocurve control options
 * @param {Number} [options.id] - Ability to add an identifier on the widget (advanced option)
 * @param {String} [options.apiKey] - API key for services call (isocurve and autocomplete services). The key "calcul" is used by default.
 * @param {Boolean} [options.ssl = true] - use of ssl or not (default true, service requested using https protocol)
 * @param {Boolean} [options.collapsed = true] - Specify if widget has to be collapsed (true) or not (false) on map loading. Default is true.
 * @param {Boolean} [options.draggable = false] - Specify if widget is draggable
 * @param {Boolean|Object} [options.export = false] - Specify if button "Export" is displayed. For the use of the options of the "Export" control, see {@link packages/Controls/Export/Export.default}
 * @param {Object}  [options.exclusions = {"toll" : false, "tunnel" : false, "bridge" : false}] - list of exclusions with status (true = checked). By default : no exclusions checked.
 * @param {Array}   [options.graphs = ["Voiture", "Pieton"]] - list of graph resources to be used for isocurve calculation, by default : ["Voiture", "Pieton"]. Possible values are "Voiture" and "Pieton". The first element is selected.
 * @param {Array}   [options.methods = ["time", "distance"]] - list of methods, by default : ["time", "distance"]. Possible values are "time" and "distance". The first element is selected by default.
 * @param {Array}   [options.directions = ["departure", "arrival"]] - list of directions to be displayed, by default : ["departure", "arrival"]. The first element is selected by default. Possible values are "departure" and "arrival".
 *      Directions enable to specify if input location point will be used as a departure point ("departure") or as an arrival point ("arrival")
 * @param {Object} [options.isocurveOptions = {}] - isocurve service options. see {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~isoCurve Gp.Services.isoCurve()} to know all isocurve options.
 * @param {Object} [options.autocompleteOptions = {}] - autocomplete service options. see {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~autoComplete Gp.Services.autoComplete()} to know all autocomplete options
 * @param {Object} [options.markerOpts] - options to use your own marker. Default is a lightOrange marker.
 * @param {String} [options.markerOpts.url] - marker base64 encoded url (ex "data:image/png;base64,...""). Mandatory for a custom marker
 * @param {Array} [options.markerOpts.offset] - Offsets in pixels used when positioning the overlay. The first element in the array is the horizontal offset. A positive value shifts the overlay right. The second element in the array is the vertical offset. A positive value shifts the overlay down. Default is [0, 0]. (see http://openlayers.org/en/latest/apidoc/ol.Overlay.html)
 * @param {Object} [options.layerDescription = {}] - Layer informations to be displayed in LayerSwitcher widget (only if a LayerSwitcher is also added to the map)
 * @param {String} [options.layerDescription.title = "Isochrone/Isodistance"] - Layer title to be displayed in LayerSwitcher
 * @param {String} [options.layerDescription.description = "isochrone/isodistance basé sur un graphe"] - Layer description to be displayed in LayerSwitcher
 * @fires isocurve:drawstart
 * @fires isocurve:drawend
 * @fires isocurve:compute
 * @fires export:compute
 * @example
 *  var iso = ol.control.Isocurve({
 *      "collapsed" : false,
 *      "draggable" : true,
 *      "export"    : false,
 *      "methods" : ["time", "distance"],
 *      "exclusions" : {
 *         "toll" : true,
 *         "bridge" : false,
 *         "tunnel" : true
 *      },
 *      "graphs" : ["Pieton", "Voiture"],
 *      "markerOpts" : {
 *          "url" : "...",
 *          "offset" : [0,0]
 *      }
 *      "isocurveOptions" : {},
 *      "autocompleteOptions" : {}
 *  });
 *
 *  // if you want to pluggued the control Export with options :
 *  var iso = new ol.control.Isocurve({
 *    export : {
 *      name : "export",
 *      format : "geojson",
 *      title : "Exporter",
 *      menu : false
 *    }
 *  });
 */
declare class Isocurve {
    /**
     * See {@link ol.control.Isocurve}
     * @module Isocurve
     * @alias module:~controls/Isocurve
     * @param {*} options - options
     * @example
     * import Isocurve from from "gpf-ext-ol/controls/Isocurve"
     * ou
     * import { Isocurve } from "gpf-ext-ol"
     */
    constructor(options: any);
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
     * @param {ol.Map} map - Map.
     */
    setMap(map: ol.Map): void;
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
     * Get vector layer where Isocurve geometry is drawn
     *
     * @returns {Object} layer - ol.layer.Vector isocurve layer
     */
    getLayer(): Object;
    /**
     * Set vector layer where Isocurve geometry is drawn
     *
     * @param {Object} layer - ol.layer.Vector isocurve layer
     */
    setLayer(layer: Object): void;
    _geojsonLayer: any;
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
     * Get isocurve data
     *
     * @returns {Object} data - process results
     */
    getData(): Object;
    /**
     * Set isocurve data
     *
     * @param {Object} data - control informations
     * @param {String} data.transport - transport type
     * @param {String} data.computation - computation type
     * @param {Array} data.exclusions - list of exclusions
     * @param {String} data.direction - direction type
     * @param {Array} data.point - [lon, lat]
     * @param {Object} data.results - service response
     */
    setData(data: {
        transport: string;
        computation: string;
        exclusions: any[];
        direction: string;
        point: any[];
        results: Object;
    }): void;
    _currentTransport: any;
    _currentComputation: any;
    _currentExclusions: any;
    _currentDirection: any;
    _currentIsoResults: Object | null | undefined;
    /**
     * Get container
     *
     * @returns {DOMElement} container
     */
    getContainer(): DOMElement;
    /**
     * Get default style
     *
     * @returns {ol.style} style
     */
    getStyle(): ol.style;
    /**
     * This method is public.
     * It allows to control the execution of a traitment.
     *
     * @param {Array} position - position in the projection map [ x, y ]
     * @param {Object} value - distance in km or hours-minutes
     * @param {Object} options - options = {...}
     */
    compute(position: any[], value: Object, options: Object): void;
    _currentTimeHour: any;
    _currentTimeMinute: any;
    _currentDistance: number | Object | undefined;
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
     * Initialize Isocurve control (called by Isocurve constructor)
     *
     * @param {Object} options - constructor options
     * @private
     */
    private initialize;
    options: {
        collapsed: boolean;
        draggable: boolean;
        export: boolean;
        methods: string[];
        graphs: string[];
        exclusions: {
            toll: boolean;
            tunnel: boolean;
            bridge: boolean;
        };
        directions: string[];
        markerOpts: {
            url: string;
            offset: number[];
        };
        isocurveOptions: {};
        autocompleteOptions: {};
        layerDescription: {
            title: string;
            description: string;
        };
    } | undefined;
    /** {Boolean} specify if isocurve control is draggable (true) or not (false) */
    draggable: boolean | undefined;
    _uid: any;
    _originPoint: LocationSelector | null | undefined;
    _pictoIsoButton: any;
    _waitingContainer: any;
    _formContainer: any;
    _resultsIsoContainer: any;
    _IsoPanelContainer: any;
    _IsoPanelHeaderContainer: any;
    _waiting: boolean | undefined;
    _timer: NodeJS.Timeout | null | undefined;
    _defaultFeatureStyle: any;
    _resources: {} | undefined;
    listenerKey: any;
    /**
     * this method is called by this.initialize()
     *
     * @param {Object} options - options
     *
     * @private
     */
    private _checkInputOptions;
    /**
     * this method is called by this.initialize() and initialize transport mode
     * ("Voiture" ou "Pieton")
     *
     * @private
     */
    private _initTransport;
    /**
     * this method is called by this.initialize() and initialize computation mode
     * (time or distance)
     *
     * @private
     */
    private _initComputation;
    /**
     * this method is called by this.initialize() and initialize direction mode
     * (departure or arrival)
     *
     * @private
     */
    private _initDirection;
    /**
     * this method is called by this.initialize() and initialize exclusions
     *
     * @private
     */
    private _initExclusions;
    /**
     * initialize component container (DOM)
     *
     * @param {Object} map - the map
     *
     * @returns {DOMElement} DOM element
     *
     * @private
     */
    private _initContainer;
    _submitContainer: any;
    /**
     * Create start point
     *
     * @param {Object} map - the map
     *
     * @returns {Object} DOM element
     * @private
     */
    private _createIsoPanelFormPointElement;
    /**
     * this method is called by event 'submit' on 'GPisochronForm' tag form
     * (cf. this._createIsoPanelFormElement),
     * and call isocurve service to display results
     *
     * @private
     */
    private onIsoComputationSubmit;
    /**
     * this method is called by event 'click' on 'GPshowIsochronPicto' picto
     * (cf. this._createShowIsoPictoElement),
     * and clear inputs and previous isocurve drawings
     *
     * @param { event } e évènement associé au clic
     * @private
     */
    private onShowIsoPanelClick;
    /**
     * this method is called by event 'change' on 'GPisochronChoiceAltDist' or 'GPisochronChoiceAltChron'
     * input (cf. this._createIsoPanelFormTypeChoiceElement),
     * and updates current computation mode
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    private onIsoTypeChoiceChange;
    /**
     * this method is called by event 'click' on 'GPisochronTransportPedestrian' or 'GPisochronTransportCar'
     * input (cf. this._createIsoPanelFormModeChoiceTransportElement),
     * and updates current transport mode
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    private onIsoModeTransportChange;
    /**
     * this method is called by event 'change' on 'GPisochronDirectionSelect' select
     * (cf. this._createIsoPanelFormModeChoiceDirectionElement),
     * and updates current direction mode
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    private onIsoModeDirectionChange;
    /**
     * this method is called by event 'change' on 'GPIsoExclusionsToll'
     * or 'GPIsoeExclusionsTunnel' or 'GPIsoExclusionsBridge' tag input
     * (cf. this._createIsoPanelFormExclusionOptionsElement).
     * this value is saved as a parameter for the service isocurve.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    private onIsoExclusionsChange;
    /**
     * this method is called by event 'click' on 'GPisoReset'
     * tag label (cf. this._createIsoFormResetElement),
     * and it cleans all isochron input options and results.
     *
     * @private
     */
    private onIsoResetClick;
    /**
     * this method is called by event 'click' on 'GPIsoSubmit'
     * tag label (cf. this._createIsoSubmitFormElement),
     * and it cleans the isochrone geometry.
     *
     * @private
     */
    private onShowIsoResultsNewClick;
    /**
     * ...
     * @private
     */
    private onShowIsoSettingsClick;
    /**
     * this method is called by this.onIsoComputationSubmit
     * and executes a request to the service.
     *
     * @param {Object} options - isocurve service request options
     * @private
     */
    private _requestIsoCurve;
    /**
     * this method is called by this.onIsoComputationSubmit() (in case of route computation success)
     * and fills the container of the iso compute results with its metadata
     * information, also, constructs the geometry isochrone.
     *
     * @param {Object} results - results of the iso calculation
     * @param {Object} computeOptions - options of the iso calculation
     *
     * @private
     */
    private _fillIsoResultsDetails;
    _currentIsoInformations: Object | undefined;
    /**
     * this method is called by this._fillIsoResultsDetails()
     * and fills the container of the iso compute results with its metadata
     * information.
     *
     * @param {Object} results - Resultats renvoyés par le service d'isochrone
     * @param {Object} computeOptions - options of the iso calculation
     *
     * @private
     */
    private _fillIsoResultsDetailsContainer;
    _resultsIsoValuesContainer: any;
    /**
     * this method is called by this.onIsoComputationSubmit (in case of success)
     * and draw isocurve results geometry on map
     *
     * @param {Object} results - isocurve response results
     * @private
     */
    private _drawIsoResults;
    /**
     * this method is called by this.onShowIsoPanelClick()
     * and it clears all elements (reinit).
     *
     * @private
     */
    private _clear;
    /**
     * this method is called by this._clear()
     * and it clears all input elements (dist and time)
     *
     * @private
     */
    private _clearIsoInputs;
    /**
     * this method is called by this.onIsoComputationSubmit (in case of failure)
     * and it clears all geometries
     *
     * @private
     */
    private _clearGeojsonLayer;
    /**
     * this method is called by event 'click' on control main container
     * and hide suggested Locations (unless target is an autocomplete input)
     *
     * @param {Object} e - event
     *
     * @private
     */
    private _hideIsoSuggestedLocations;
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
import ButtonExport from "../Export/Export";
import LocationSelector from "../LocationSelector/LocationSelector";
//# sourceMappingURL=Isocurve.d.ts.map