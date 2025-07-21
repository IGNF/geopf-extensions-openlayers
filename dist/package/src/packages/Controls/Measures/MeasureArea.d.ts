export default MeasureArea;
/**
 * @classdesc
 *
 * Tool Measure Area Control. Allows users to measure the length of a path drawn on the map.
 *
 * @constructor
 * @alias ol.control.MeasureArea
 * @type {ol.control.MeasureArea}
 * @extends {ol.control.Control}
 * @param {Object} options - options for function call.
 * @param {Number} [options.id] - Ability to add an identifier on the widget (advanced option)
 * @param {Boolean} [options.geodesic = true] - If true, area will be computed on the global sphere using the {@link https://openlayers.org/en/latest/apidoc/module-ol_sphere.html#geodesicArea ol.Sphere.geodesicArea()} function. Otherwise, area will be computed on the projected plane.
 * @param {Object} [options.styles = {}] - styles used when drawing. Specified with following properties.
 * @param {Object} [options.styles.pointer = {}] - Style for mouse pointer when drawing the polygon to measure. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Image-ImageStyle.html ol.style.Image} subclass object.
 * @param {Object} [options.styles.start = {}] - Polygon Style when drawing. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.htmll ol.style.Style} object.
 * @param {Object} [options.styles.finish = {}] - Polygon Style when finished drawing. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.htmll ol.style.Style} object.
 * <!-- @param {Object} [options.tooltip = {}] - NOT YET IMPLEMENTED ! -->
 * @param {Object} [options.layerDescription = {}] - Layer informations to be displayed in LayerSwitcher widget (only if a LayerSwitcher is also added to the map)
 * @param {String} [options.layerDescription.title = "Mesures de surface"] - Layer title to be displayed in LayerSwitcher
 * @param {String} [options.layerDescription.description = "Mes mesures"] - Layer description to be displayed in LayerSwitcher
 * @example
 * var measureArea = new ol.control.MeasureArea({
 *    geodesic : false
 * });
 */
declare class MeasureArea {
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
     * @param {ol.geom.Polygon} polygon - geometry polygon.
     * @returns {String} The formatted output.
     * @private
     */
    private format;
    /**
     * this method is called by event 'click' on picto
     *
     * @param {Object} e - HTMLElement
     *
     * @private
     */
    private onShowMeasureAreaClick;
}
//# sourceMappingURL=MeasureArea.d.ts.map