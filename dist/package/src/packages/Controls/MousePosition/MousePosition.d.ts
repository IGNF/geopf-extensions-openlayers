export default MousePosition;
/**
 * @classdesc
 * MousePosition Control.
 *
 * @constructor
 * @alias ol.control.GeoportalMousePosition
 * @type {ol.control.GeoportalMousePosition}
 * @extends {ol.control.Control}
 * @param {Object} options - options for function call.
 * @param {Number} [options.id] - Ability to add an identifier on the widget (advanced option)
 * @param {String}  [options.apiKey] - API key. The key "calcul" is used by default.
 * @param {Boolean} [options.ssl = true] - use of ssl or not (default true, service requested using https protocol)
 * @param {Boolean} [options.draggable = false] - Specify if widget is draggable
 * @param {Boolean} [options.collapsed = true] - Specify if MousePosition control should be collapsed at startup. Default is true.
 * @param {Array}   [options.units] - list of coordinates units, to be displayed in control units list.
 *      Values may be "DEC" (decimal degrees), "DMS" (sexagecimal), "RAD" (radians) and "GON" (grades) for geographical coordinates,
 *      and "M" or "KM" for metric coordinates
 * @param {Boolean}   [options.displayAltitude = true] - activate (true) or deactivate (false) the altitude panel. True by default
 * @param {Boolean}   [options.displayCoordinates = true] - activate (true) or deactivate (false) the coordinates panel. True by default
 * @param {Boolean} [options.editCoordinates = false] - If true, coordinates from the MousePosition control can be edited by users to re-center the view. False by default.
 * @param {Function} [options.mapCenterCallback] - callback...
 * @param {Array}   [options.systems] - list of projection systems, default are Geographical ("EPSG:4326"), Web Mercator ("EPSG:3857"), Lambert 93 ("EPSG:2154") and extended Lambert 2 ("EPSG:27572").
 *      Each array element (=system) is an object with following properties :
 * @param {String}  options.systems.crs - Proj4 crs alias (from proj4 defs). e.g. : "EPSG:4326". Required
 * @param {String}  [options.systems.label] - CRS label to be displayed in control. Default is crs code (e.g. "EPSG:4326")
 * @param {String}  options.systems.type - CRS units type for coordinates conversion : "Geographical" or "Metric". Default: "Metric"
 * @param {Object}  [options.systems.geoBBox] - Aera covered by the system (WGS84 coordinates).
 * @param {Number}  options.systems.geoBBox.right - Right bound.
 * @param {Number}  options.systems.geoBBox.left - Left bound.
 * @param {Number}  options.systems.geoBBox.top - Top bound.
 * @param {Number}  options.systems.geoBBox.bottom - Bottom bound.
 * @param {Object} [options.positionMarker] - options for position marker
 * @param {String} options.positionMarker.url - Marker url (define in src/Openlayers/Controls/Utils/Markers.js)
 * @param {Array} options.positionMarker.offset - Offsets in pixels used when positioning the marker towards targeted point.
 *      The first element in the array is the horizontal offset. A positive value shifts the marker right.
 *      The second element in the array is the vertical offset. A positive value shifts the marker down. [0,0] value positions the top-left corner of the marker image to the targeted point.
 *      Default is offset associated to default marker image.
 * @param {Boolean} options.positionMarker.hide - if true, marker is not displayed, otherwise displayed (False by default.)
 * @param {Object}  [options.altitude] - elevation configuration
 * @param {Object}  [options.altitude.serviceOptions] - options of elevation service
 * @param {Number}  [options.altitude.responseDelay] - latency for altitude request, 500 ms by default
 * @param {Number}  [options.altitude.triggerDelay] - immobilisation time of movement on the map to trigger the elevation calculation, 200 ms by default
 * @param {Number}  [options.altitude.noDataValue] - value used for altitude service no data (default is -99999). In this case, "---m" will be displayed instead of "-99999m"
 * @param {Number}  [options.altitude.noDataValueTolerance] - tolerance for no data value :
 *                  values in [noDataValue + noDataValueTolerance ; noDataValue - noDataValueTolerance] interval will not be displayed, but "---m" will be displayed instead.
 *                  Default is 90000 (no data values = [-9999 ; -189999])
 *  @example
 *  var MousePosition = new ol.control.GeoportalMousePosition({
 *      "collapsed" : false,
 *      "graggable" : true,
 *      "displayCoordinates" : true,
 *      "displayAltitude" : true,
 *      "altitude" : {
 *           "triggerDelay" : 100,
 *           "responseDelay" : 500,
 *           "noDataValue" : -99999,
 *           "noDataValueTolerance" : 99000,
 *           "serviceOptions" : {}
 *      },
 *      "systems" : [
 *       {
 *          "crs" : "EPSG:3857",
 *          "label" : "Web Mercator",
 *          "type" : "Metric"
 *       },
 *       {
 *          "crs" : "EPSG:4326",
 *          "label" : "Géographiques",
 *          "type" : "Geographical"
 *       },
 *       {
 *           "label" : "Lambert 93",
 *           "crs" : "EPSG:2154",
 *           "type" : "Metric",
 *           "geoBBox" : {
 *               "left" : -9.86,
 *               "bottom" : 41.15,
 *               "right" : 10.38,
 *               "top" : 51.56
 *           }
 *        }
 *      ],
 *      "units" : ["DEC", "DMS"]
 * });
 */
declare class MousePosition {
    /**
     * See {@link ol.control.GeoportalMousePosition}
     * @module MousePosition
     * @alias module:~controls/MousePosition
     * @param {*} options - options
     * @example
     * import GeoportalMousePosition from "gpf-ext-ol/controls/MousePosition"
     * ou
     * import { GeoportalMousePosition } from "gpf-ext-ol"
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
     * Overload ol.control.Control setMap method, called when
     *
     * @param {Object} map - the map
     *
     */
    setMap(map: Object): void;
    listenerKey: any;
    _markerOverlay: any;
    /**
     * Set additional projection system
     *
     * @param {Object} system - projection system
     * @param {String} system.crs - Proj4 crs alias (from proj4 defs) e.g. "EPSG:4326"
     * @param {String} [system.label] - CRS label to be displayed in control. Default is system.crs alias
     * @param {String} [system.type] - CRS units type for coordinates conversion (one of control options.units). Default is "Metric"
     */
    addSystem(system: {
        crs: string;
        label?: string | undefined;
        type?: string | undefined;
    }): void;
    /**
     * Set additional projection systems
     *
     * @param {Array} systems - Array of system object, with following properties :
     * @param {String} systems.crs - Proj4 CRS alias (from proj4 defs) e.g. "EPSG:4326"
     * @param {String} systems.label - CRS label (for coordinates conversion)
     * @param {String} systems.type - CRS units type to be displayed in control (one of control options.units). Default is "Metric"
     */
    addSystems(systems: any[]): void;
    /**
     * Remove projection system (in case there are several system with same code, only the first one will be removed)
     *
     * @param {String} systemCrs - CRS alias (from proj4 defs)
     */
    removeSystem(systemCrs: string): void;
    /**
     * Set control units (to be displayed)
     *
     * @param {Array} units - list of all coordinates units, to be displayed in control units list.
     *      Values may be "DEC" (decimal degrees), "DMS" (sexagecimal), "RAD" (radians) and "GON" (grades) for geographical coordinates,
     *      and "M" or "KM" for metric coordinates
     */
    setUnits(units: any[]): void;
    _projectionUnits: {} | undefined;
    /**
     * Set control altitude options (useless if displayAltitude == false)
     *
     * @param {Object} options - altitude options
     * @param {Object}  [options.serviceOptions] - options of elevation service
     * @param {Number}  [options.responseDelay] - latency for elevation request, 500 ms by default
     * @param {Number}  [options.triggerDelay] - immobilisation time of movement on the map to trigger the elevation calculation, 200 ms by default
     */
    setAltitudeOptions(options: {
        serviceOptions?: Object | undefined;
        responseDelay?: number | undefined;
        triggerDelay?: number | undefined;
    }): void;
    /**
     * Display or hide elevation panel
     *
     * @param {Boolean} displayAltitude - true to display elevation panel, false to hide it
     */
    displayAltitude(displayAltitude: boolean): void;
    /**
     * Display or hide coordinates panel
     *
     * @param {Boolean} displayCoordinates - true to display coordinates panel, false to hide it
     */
    displayCoordinates(displayCoordinates: boolean): void;
    /**
     * Collapse or display control main container
     *
     * @param {Boolean} collapsed - True to collapse control, False to display it
     */
    setCollapsed(collapsed: boolean): void;
    /**
     * Get container
     *
     * @returns {DOMElement} container
     */
    getContainer(): DOMElement;
    /**
     * Initialize control (called by MousePosition constructor)
     *
     * @param {Object} options - control options (set by user)
     * @private
     */
    private _initialize;
    options: Object | undefined;
    /** {Boolean} specify if MousePosition control is collapsed (true) or not (false) */
    collapsed: any;
    /** {Boolean} specify if MousePosition control is draggable (true) or not (false) */
    draggable: any;
    _markerUrl: any;
    _markerOffset: any;
    _hideMarker: any;
    editing: any;
    _uid: any;
    _projectionSystems: any[] | undefined;
    _isDesktop: boolean | undefined;
    _timer: any;
    _currentProjectionSystems: any;
    _currentProjectionType: any;
    _currentProjectionUnits: any;
    _projectionUnitsContainer: any;
    _showMousePositionContainer: any;
    _panelMousePositionContainer: any;
    _panelHeaderMousePositionContainer: any;
    /**
     *
     * @param {Object} option - positionMarker option
     * @private
     */
    private _initMarker;
    /**
     * this method is called by the constructor and initialize the projection
     * systems.
     * getting coordinates in the requested projection :
     * see this.onMousePositionProjectionSystemChange()
     *
     * @private
     */
    private _initProjectionSystems;
    /**
     * this method is called by the constructor and initialize the units.
     * getting coordinates in the requested units :
     * see this.onMousePositionProjectionUnitsChange()
     *
     * @private
     */
    private _initProjectionUnits;
    /**
     * this method get label from the current projection units
     *
     * @returns {String} projection information
     *
     * @private
     */
    private _getCurrentProjectionInformation;
    /**
     * Create control main container (called by MousePosition constructor)
     *
     * @returns {DOMElement} DOM element
     *
     * @private
     */
    private _initContainer;
    _showMousePositionButton: any;
    _panelHeaderContainer: any;
    _panelTitleContainer: any;
    _panelCloseButton: any;
    _projectionSystemsContainer: any;
    /**
     * this method is called by this.()
     * and it changes the elevation view panel into the dom.
     *
     * @param {Boolean} active - true:active, false:disable
     * @private
     */
    private _setElevationPanel;
    /**
     * this method is called by this.()
     * and it changes the coordinate view panel into the dom.
     *
     * @param {Boolean} active - true:active, false:disable
     * @private
     */
    private _setCoordinatesPanel;
    /**
     * this method is called by this.()
     * and it changes the settings view panel into the dom.
     *
     * @param {Boolean} active - true:active, false:disable
     * @private
     */
    private _setSettingsPanel;
    /**
     * this method is called by this.onMousePositionProjectionSystemChange()
     * when changes to a metric or a geographical units.
     *
     * @param {String} type - Geographical or Metric
     * @private
     */
    private _setTypeUnitsPanel;
    /**
     * this sends the coordinates to the panel.
     * (cf. this.GPdisplayCoords() into the DOM functions)
     *
     * @param {Array} olCoordinate - ol.Coordinate object [lon, lat]
     * @param {Object} crs - coordinate CRS (ol.proj.Projection)
     * @private
     */
    private _setCoordinate;
    /**
     * this sends the coordinates to the panel.
     * (cf. this.GPdisplayElevation() into the DOM functions)
     *
     * @param {Array} olCoordinate - ol.Coordinate object [lon, lat]
     * @private
     */
    private _setElevation;
    /**
     * this method is triggered when the mouse or the map is stopped.
     * (cf. onMouseMove and onMapMove)
     *
     * @param {Array} olCoordinate - ol.Coordinate object [lon, lat]
     * @param {Object} crs - coordinate CRS (ol.proj.Projection)
     * @private
     */
    private onMoveStopped;
    /**
     * this method is an handler event to control. The event is 'mousemove' on
     * the map. The handler sends the coordinates to the panel.
     * (cf. this.GPdisplayCoords() into the DOM functions)
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    private onMouseMove;
    /**
     * this method is an handler event to control. The event is 'moveend' on
     * the map. The handler sends the coordinates to the panel.
     * (cf. this.GPdisplayCoords() into the DOM functions)
     *
     * @private
     */
    private onMapMove;
    /**
     * this method is called by this.GPdisplayElevation() in the dom, and
     * it executes a request to the elevation service.
     *
     * @param {Object} coordinate - {lat:..., lng:...}
     * @param {Function} callback - callback
     * @private
     */
    private onRequestAltitude;
    /**
     * this method is called by event 'click' on 'GPshowMousePositionPicto' tag label
     * (cf. this._createShowMousePositionPictoElement),
     * and toggles event 'mousemove' on map.
     *
     * @param { event } e évènement associé au clic
     * @private
     */
    private onShowMousePositionClick;
    /**
     * this method is called by event 'click' on 'GPshowMousePositionPicto' tag label
     * (cf. this._createShowMousePositionPictoElement),
     * and toggles event 'mousemove' on map.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    private onShowMousePositionSettingsClick;
    /**
     * this method is called by event 'click' on input coordinate
     *
     * @param {Boolean} editing - editing mode
     */
    onMousePositionEditModeClick(editing: boolean): void;
    /**
     * Get coordinate from inputs and select in decimal degrees
     *
     * @param {String} coordType - "Lon" or "Lat"
     * @returns {undefined}
     * @private
     */
    private getCoordinate;
    /**
     * locate DMS coordinates on map
     *
     * @private
     */
    private locateDMSCoordinates;
    /**
     * locate coordinates on map (not DMS)
     *
     * @private
     */
    private locateCoordinates;
    /**
     * locate coordinates on map
     *
     * @private
     */
    private onMousePositionEditModeLocateClick;
    /**
     * this method is called by event 'change' on 'GPmousePositionProjectionSystem'
     * tag select (cf. this._createMousePositionSettingsElement),
     * and selects the system projection.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    private onMousePositionProjectionSystemChange;
    /**
     * this method selects the current system projection.
     *
     * @param {String} systemCode - inner code (rank in array _projectionSystems)
     * @private
     */
    private _setCurrentSystem;
    /**
     * this method is called by event 'mouseover' on 'GPmousePositionProjectionSystem'
     * tag select (cf. this._createMousePositionSettingsElement),
     * and selects the system projection.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    private onMousePositionProjectionSystemMouseOver;
    /**
     * this method is called by event 'change' on 'GPmousePositionProjectionUnits'
     * tag select (cf. this._createMousePositionSettingsElement),
     * and selects the units projection.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    private onMousePositionProjectionUnitsChange;
    /**
     *
     * @param {Number} value - value to convert (km to meters, radians, grades to decimal degrees)
     * @returns {undefined}
     * @private
     */
    private convert;
    /**
     * @param {String} coordType - "Lon" or "Lat"
     * @param {String} value - input value
     *
     * @returns {Boolean} value is within extent
     *
     * @private
     */
    private validateExtentCoordinate;
}
//# sourceMappingURL=MousePosition.d.ts.map