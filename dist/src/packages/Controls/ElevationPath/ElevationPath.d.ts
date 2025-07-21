export default ElevationPath;
/**
 * @classdesc
 *
 * Elevation Path Control. Allows users to draw a path on a Openlayers map see the elevation profile computed with geoportal elevation path web service along that path.
 *
 * @constructor
 * @alias ol.control.ElevationPath
 * @type {ol.control.ElevationPath}
 * @extends ol.control.Control
 * @param {Object} options - options for function call.
 * @param {Number} [options.id] - Ability to add an identifier on the widget (advanced option)
 * @param {String} [options.apiKey] - API key for services call (isocurve and autocomplete services). The key "calcul" is used by default.
 * @param {Boolean} [options.active = false] - specify if control should be actived at startup. Default is false.
 * @param {Boolean} [options.ssl = true] - use of ssl or not (default true, service requested using https protocol)
 * @param {Boolean|Object} [options.export = false] - Specify if button "Export" is displayed. For the use of the options of the "Export" control, see {@link packages/Controls/Export/Export.default}
 * @param {Object} [options.elevationOptions = {}] - elevation path service options. See {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~getAltitude Gp.Services.getAltitude()} for available options
 * @param {Object} [options.layerDescription = {}] - Layer informations to be displayed in LayerSwitcher widget (only if a LayerSwitcher is also added to the map)
 * @param {String} [options.layerDescription.title = "Profil altimétrique"] - Layer title to be displayed in LayerSwitcher
 * @param {String} [options.layerDescription.description = "Mon profil altimétrique"] - Layer description to be displayed in LayerSwitcher
 * @param {Object} [options.stylesOptions] - styles management
 * @param {Object} [options.stylesOptions.marker = {}] - styles management of marker displayed on map when the user follows the elevation path. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Image-ImageStyle.html ol.style.Image} subclass object
 * @param {Object} [options.stylesOptions.draw = {}] - styles used when drawing. Specified with following properties.
 * @param {Object} [options.stylesOptions.draw.pointer = {}] - Style for mouse pointer when drawing the line. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Image-ImageStyle.html ol.style.Image} subclass object.
 * @param {Object} [options.stylesOptions.draw.start = {}] - Line Style when drawing. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Stroke-Stroke.html ol.style.Stroke} object.
 * @param {Object} [options.stylesOptions.draw.finish = {}] - Line Style when finished drawing. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Stroke-Stroke.html ol.style.Stroke} object.
 * @param {Object} [options.displayProfileOptions = {}] - profile options.
 * @param {Boolean} [options.displayProfileOptions.totalDistance = true] - display the total distance of the path
 * @param {Boolean} [options.displayProfileOptions.greaterSlope = true] - display the greater slope into the graph
 * @param {Boolean} [options.displayProfileOptions.meanSlope = true] -  display the mean slope into the graph
 * @param {Boolean} [options.displayProfileOptions.ascendingElevation = true] -  display the ascending elevation into the graph
 * @param {Boolean} [options.displayProfileOptions.descendingElevation = true] -  display the descending elevation into the graph
 * @param {Boolean} [options.displayProfileOptions.currentSlope = true] -  display current slope value on profile mouseover
 * @param {Function} [options.displayProfileOptions.apply] - function to display profile if you want to cutomise it. By default, ([DISPLAY_PROFILE_BY_DEFAULT()](./ol.control.ElevationPath.html#.DISPLAY_PROFILE_BY_DEFAULT)) is used. Helper functions to use with D3 ([DISPLAY_PROFILE_LIB_D3()](./ol.control.ElevationPath.html#.DISPLAY_PROFILE_LIB_D3)) or AmCharts ([DISPLAY_PROFILE_LIB_AMCHARTS()](./ol.control.ElevationPath.html#.DISPLAY_PROFILE_LIB_AMCHARTS)) frameworks are also provided. You may also provide your own function.
 * @param {Object} [options.displayProfileOptions.target] - DOM container to use to display the profile.
 * @fires elevationpath:drawstart
 * @fires elevationpath:drawend
 * @fires elevationpath:compute
 * @fires export:compute
 * @example
 *
 * var measure = new ol.control.ElevationPath({
 *    export : false,
 *    stylesOptions : {
 *     draw : {
 *       finish : new ol.style.Stroke({
 *            color : "rgba(0, 0, 0, 0.5)",
 *            width : 2
 *       })
 *     },
 *    }
 *    displayProfileOptions : {
 *       apply : ol.control.ElevationPath.DISPLAY_PROFILE_RAW,
 *    }
 * });
 *
 * // if you want to pluggued the control Export with options :
 * var measure = new ol.control.ElevationPath({
 *    export : {
 *      name : "export",
 *      format : "geojson",
 *      title : "Exporter",
 *      menu : false
 *    }
 * });
 *
 * Exemples :
 * - displayProfileOptions.apply : null
 * - displayProfileOptions.apply : function (elevations, container, context) {  // do some stuff... }
 * - displayProfileOptions.apply : ol.control.ElevationPath.DISPLAY_PROFILE_{LIB_AMCHARTS | LIB_D3 | RAW}
 *
 */
declare class ElevationPath {
    /**
    * Styles applied by default if stylesOptions property is not set.
    */
    static DEFAULT_STYLES: {
        MARKER: any;
        RESULTS: {
            imageRadius: number;
            imageFillColor: string;
            imageStrokeColor: string;
            imageStrokeWidth: number;
        };
    };
    /**
     * suppression du marker
     *
     * @param {Object} context - context
     *
     * @private
     */
    private static __removeProfileMarker;
    /**
     * suppression du marker
     *
     * @param {Object} context - context
     * @param {Object} d - d
     *
     * @private
     */
    private static __createProfileMarker;
    /**
     * mise à jour du marker
     *
     * @param {Object} context - context
     * @param {Object} d - data
     *
     * @private
     */
    private static __updateProfileMarker;
    /**
     * TODO : customisation possible d'une opération sur le profil
     *
     * @param {Object} context - context
     * @param {Object} d - data
     *
     * @private
     */
    private static __customRawProfileOperation;
    /**
     * TODO : customisation possible d'une opération sur le profil
     * Ex. Methode appélée dans le DOM : ProfileElevationPathDOM
     *
     * @param {Object} context - context
     * @param {Object} e - event
     * @private
     */
    private static __customRawProfileMouseOverEvent;
    /**
     * display Profile using Amcharts framework. This method needs AmCharts libraries to be loaded.
     *
     * @param {Object} data - collection elevations
     * @param {HTMLElement} container - container
     * @param {Object} context - this control object
     */
    static DISPLAY_PROFILE_LIB_AMCHARTS(data: Object, container: HTMLElement, context: Object): void;
    /**
     * display Profile using D3 javascript framework. This method needs D3 libraries to be loaded.
     *
     * @param {Object} data - elevations values for profile
     * @param {HTMLElement} container - html container where to display profile
     * @param {Object} context - this control object
     */
    static DISPLAY_PROFILE_LIB_D3(data: Object, container: HTMLElement, context: Object): void;
    /**
     * display Profile without graphical rendering (raw service response)
     *
     * @param {Object} data - elevations values for profile
     * @param {HTMLElement} container - html container where to display profile
     * @param {Object} context - this control object
     */
    static DISPLAY_PROFILE_RAW(data: Object, container: HTMLElement, context: Object): void;
    /**
     * Display Profile function used by default : no additonal framework needed.
     *
     * @param {Object} data - elevations values for profile
     * @param {HTMLElement} container - html container where to display profile
     * @param {Object} context - this control object
     */
    static DISPLAY_PROFILE_BY_DEFAULT(data: Object, container: HTMLElement, context: Object): void;
    /**
     * See {@link ol.control.ElevationPath}
     * @module ElevationPath
     * @alias module:~controls/ElevationPath
     * @param {*} options - options
     * @example
     * import ElevationPath from "gpf-ext-ol/controls/ElevationPath"
     * ou
     * import { ElevationPath } from "gpf-ext-ol"
     */
    constructor(options: any);
    /**
     * Nom de la classe (heritage)
     * @private
     */
    private CLASSNAME;
    _uid: any;
    _showContainer: any;
    _pictoButton: any;
    _panelContainer: any;
    _profileContainer: any;
    _waitingContainer: any;
    _infoContainer: any;
    _timerHdlr: NodeJS.Timeout | null;
    _drawStyleStart: any;
    _drawStyleFinish: any;
    _markerStyle: any;
    _profile: any;
    _data: {};
    _measureSource: any;
    _measureVector: any;
    _measureDraw: any;
    _lastSketch: any;
    _currentSketch: any;
    _marker: any;
    _container: DOMElement;
    element: any;
    /**
     * Attach control to map. Overloaded ol.control.Control.setMap() method.
     *
     * @param {ol.Map} map - Map.
     */
    setMap(map: ol.Map): void;
    export: ButtonExport | null | undefined;
    /**
     * Returns true if widget is actived (drawing),
     * false otherwise
     *
     * @returns {Boolean} active - true or false
     */
    getActive(): boolean;
    /**
     * Actived widget drawing or not
     *
     * @param {Boolean} active - true / false
     */
    setActive(active: boolean): void;
    /**
     * Get elevation data
     *
     * @returns {Object} data - elevations
     * @example
     * {
     *        type // "elevationpath"
     *        greaterSlope // pente max
     *        meanSlope  // pente moyenne
     *        distancePlus // distance cumulée positive
     *        distanceMinus // distance cumulée négative
     *        ascendingElevation // dénivelé cumulée positive
     *        descendingElevation // dénivelé cumulée négative
     *        altMin // altitude min
     *        altMax // altitude max
     *        distance // distance totale
     *        unit // unité des mesures de distance
     *        points // elevations
     *   }
     */
    getData(): Object;
    /**
     * Set profile data
     *
     * @param {*} data - elevations
     * @example
     * {
     *        greaterSlope // pente max
     *        meanSlope  // pente moyenne
     *        distancePlus // distance cumulée positive
     *        distanceMinus // distance cumulée négative
     *        ascendingElevation // dénivelé cumulée positive
     *        descendingElevation // dénivelé cumulée négative
     *        altMin // altitude min
     *        altMax // altitude max
     *        distance // distance totale
     *        unit // unité des mesures de distance
     *        points // elevations
     * }
     */
    setData(data: any): void;
    /**
     * Get container
     *
     * @returns {DOMElement} container
     */
    getContainer(): DOMElement;
    /**
     * Get layer
     *
     * @returns {ol.layer.Vector} layer
     */
    getLayer(): ol.layer.Vector;
    /**
     * Set layer
     *
     * @param {Object} layer - ol.layer.Vector profil layer
     */
    setLayer(layer: Object): void;
    /**
     * Get vector layer
     *
     * @returns {String} geojson - GeoJSON format layer
     */
    getGeoJSON(): string;
    /**
     * Get default style
     *
     * @returns {ol.style} style
     */
    getStyle(): ol.style;
    /**
     * clean
     * @param {Boolean} remove - remove layer
     */
    clean(remove: boolean): void;
    /**
     * This method is public.
     * It allows to init the control.
     * @fixme
     */
    init(): void;
    /**
     * Initialize control (called by constructor)
     *
     * @param {Object} options - options
     *
     * @private
     */
    private _initialize;
    options: {
        target: null;
        render: null;
        active: boolean;
        apiKey: null;
        export: boolean;
        elevationOptions: {
            outputFormat: string;
        };
        layerDescription: {
            title: string;
            description: string;
        };
        displayProfileOptions: {
            totalDistance: boolean;
            greaterSlope: boolean;
            meanSlope: boolean;
            ascendingElevation: boolean;
            descendingElevation: boolean;
            currentSlope: boolean;
            apply: null;
            target: null;
        };
        stylesOptions: {
            profile: null;
            draw: null;
            marker: null;
        };
    } | undefined;
    /**
     * initialize component container (DOM)
     *
     * @returns {DOMElement} DOM element
     *
     * @private
     */
    private _initializeContainer;
    /**
     * create style marker object : "ol.style"
     *
     * @private
     */
    private _createStylingMarker;
    /**
     * create style draw object : "ol.style"
     *
     * @private
     */
    private _createStylingDraw;
    /**
     * create style graph
     * FIXME : à revoir car ne sert que pour AmCharts !?
     *
     * @private
     */
    private _createStylingProfile;
    /**
     * this method is called by this.onShowElevationPathClick,
     * and initialize a vector layer, if widget is active.
     *
     * @param {ol.Map} map - Map
     * @private
     */
    private _initMeasureInteraction;
    /**
     * this method is called by this.onShowElevationPathClick,
     * and add draw interaction to map, if widget is not active.
     *
     * @param {ol.Map} map - Map
     * @private
     */
    private _addMeasureInteraction;
    /**
     * this method is called by this.onShowElevationPathClick,
     * and removes draw interaction from map (if exists)
     * And removes layer too...
     *
     * @param {ol.Map} map - Map
     * @param {Boolean} remove - Remove layer
     * @private
     */
    private _removeMeasureInteraction;
    /**
     * transforme geometry feature to position coordinate (service)
     *
     * @returns {Object[]} geometry
     *
     * @private
     */
    private _getGeometry;
    /**
     * get geometry feature length
     *
     * @returns {Integer} length
     *
     * @private
     */
    private _getLength;
    /**
     * get geometry feature point coords in EPSG:4326 [lon, lat]
     *
     * @returns {Array} point coords in EPSG:4326 [lon, lat]
     *
     * @private
     */
    private _getSketchCoords;
    /**
     * this method is called at the end of the path,
     * it generates and sends alti request, then displays results
     *
     * @private
     */
    private _requestService;
    /**
     * this method computes results elevations (Z and distance)
     *
     * @param {Array} elevations - array of elevation
     * @returns {Array} elevations
     * @private
     */
    private _computeElevationMeasure;
    /**
     * this method is called after service request (in case of success)
     * and display results
     *
     * @param {Array} elevations - array of elevation
     * @private
     */
    private _displayProfile;
    /**
     * update info container
     *
     * @private
     */
    private _updateInfoContainer;
    /**
     * Remove measure
     * @private
     */
    private _removeMeasure;
    /**
     * Remove profile
     * @private
     */
    private _removeProfile;
    /**
     * this method is called by event 'click' on '' picto
     * and enable or disable the entry of the path
     *
     * @param {Object} e - event
     * @private
     */
    private onShowElevationPathClick;
    collapsed: boolean | undefined;
    /**
     * this method is called by event 'click' on '' picto
     * (cf. this.),
     * and display the panel info
     *
     * @private
     */
    private onOpenElevationPathInfoClick;
}
import ButtonExport from "../Export/Export";
//# sourceMappingURL=ElevationPath.d.ts.map