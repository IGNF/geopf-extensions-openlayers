export default MeasureAzimuth;
/**
 * @classdesc
 *
 * Azimuth measurement Control. Allows users to draw a line on an Openlayers map and have its angle in decimal degrees clockwise from the geographical north.
 *
 * @constructor
 * @alias ol.control.MeasureAzimuth
 * @type {ol.control.MeasureAzimuth}
 * @extends {ol.control.Control}
 * @param {Object} options - options for function call.
 * @param {Number} [options.id] - Ability to add an identifier on the widget (advanced option)
 * @param {Boolean} [options.geodesic = false] - If true, azimuth will be computed on the global sphere. Otherwise, it will be computed on the projected plane.
 * @param {Object} [options.styles = {}] - styles used when drawing. Specified with following properties.
 * @param {Object} [options.styles.pointer = {}] - Style for mouse pointer when drawing the line. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Image-ImageStyle.html ol.style.Image} subclass object.
 * @param {Object} [options.styles.start = {}] - Line Style when drawing. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.htmll ol.style.Style} object.
 * @param {Object} [options.styles.finish = {}] - Line Style when finished drawing. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.htmll ol.style.Style} object.
 * <!-- @param {Object} [options.tooltip = {}] - NOT YET IMPLEMENTED ! -->
 * @param {Object} [options.layerDescription = {}] - Layer informations to be displayed in LayerSwitcher widget (only if a LayerSwitcher is also added to the map)
 * @param {String} [options.layerDescription.title = "Mesures d'azimuth"] - Layer title to be displayed in LayerSwitcher
 * @param {String} [options.layerDescription.description = "Mes mesures"] - Layer description to be displayed in LayerSwitcher
 * @example
 * var measure = new ol.control.MeasureAzimuth({
 *   geodesic : true
 * });
 */
declare class MeasureAzimuth {
    constructor(options: any);
    /**
     * Nom de la classe (heritage)
     * @private
     */
    private CLASSNAME;
    _uid: any;
    _pictoContainer: any;
    _container: DOMElement;
    element: any;
    /**
     * Overwrite OpenLayers setMap method
     *
     * @param {ol.Map} map - Map.
     */
    setMap(map: ol.Map): void;
    /**
     * Setter for option Geodesic
     *
     * @param {Boolean} value - geodesic value
     */
    setGeodesic(value: boolean): void;
    /**
     * Getter for option Geodesic
     *
     * @returns {Boolean} geodesic value
     */
    isGeodesic(): boolean;
    /**
     * Get container
     *
     * @returns {DOMElement} container
     */
    getContainer(): DOMElement;
    /**
     * Initialize measure control (called by constructor)
     *
     * @param {Object} options - options
     *
     * @private
     */
    private _initialize;
    options: {} | undefined;
    /**
     * initialize component container (DOM)
     *
     * @returns {DOMElement} DOM element
     *
     * @private
     */
    private _initializeContainer;
    /**
     * Add all events on map
     *
     * @private
     */
    private addMeasureEvents;
    eventLayerRemove: any;
    /**
     * Remove all events on map
     *
     * @private
     */
    private removeMeasureEvents;
    /**
     * Format length output.
     *
     * @param {ol.geom.LineString} line - geometry line.
     * @returns {String} The formatted output.
     * @private
     */
    private format;
    /**
     * this method is called by event 'click' on picto
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    private onShowMeasureAzimuthClick;
    /**
     * Handle pointer click.
     *
     * @param {ol.MapBrowserEvent} e - The event.
     * @private
     */
    private onPointerMoveAzimutHandler;
}
//# sourceMappingURL=MeasureAzimuth.d.ts.map