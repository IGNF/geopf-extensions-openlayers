export default MeasureLength;
/**
 * @classdesc
 *
 * Length measurement Control. Allows users to draw a path on Openlayers map and have its length computed and displayed.
 *
 * @alias ol.control.MeasureLength
 * @module MeasureLength
*/
declare class MeasureLength extends Control {
    /**
     * @constructor
     * @param {Object} options - options for function call.
     * @param {Number} [options.id] - Ability to add an identifier on the widget (advanced option)
     * @param {Boolean} [options.geodesic = true] - If true, length will be computed on the global sphere using the {@link https://openlayers.org/en/latest/apidoc/module-ol_sphere.html#haversineDistance ol.Sphere.haversineDistance()} function. Otherwise, length will be computed on the projected plane.
     * @param {String} [options.unit] - If not specified, the measure will be displayed in m until 999m, then in km. Values possible : m or km.
     * @param {Object} [options.styles = {}] - styles used when drawing. Specified with following properties.
     * @param {Object} [options.styles.pointer = {}] - Style for mouse pointer when drawing the path. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Image-ImageStyle.html ol.style.Image} subclass object.
     * @param {Object} [options.styles.start = {}] - Line Style when drawing. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.htmll ol.style.Style} object.
     * @param {Object} [options.styles.finish = {}] - Line Style when finished drawing. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.htmll ol.style.Style} object.
     * <!-- @param {Object} [options.tooltip = {}] - NOT YET IMPLEMENTED ! -->
     * @param {Object} [options.layerDescription = {}] - Layer informations to be displayed in LayerSwitcher widget (only if a LayerSwitcher is also added to the map)
     * @param {String} [options.layerDescription.title = "Mesures de distance"] - Layer title to be displayed in LayerSwitcher
     * @param {String} [options.layerDescription.description = "Mes mesures"] - Layer description to be displayed in LayerSwitcher
     * @example
     * var measureLength = new ol.control.MeasureLength({
     *    geodesic : false
     * });
     */
    constructor(options: {
        id?: number | undefined;
        geodesic?: boolean | undefined;
        unit?: string | undefined;
        styles?: {
            pointer?: any;
            start?: any;
            finish?: any;
        } | undefined;
        tooltip?: any;
        layerDescription?: {
            title?: string | undefined;
            description?: string | undefined;
        } | undefined;
    });
    CLASSNAME: string;
    _uid: number;
    _pictoContainer: any;
    _container: HTMLElement;
    /**
     * Overwrite OpenLayers setMap method
     *
     * @param {Map} map - Map.
     */
    setMap(map: Map): void;
    /**
     * Get container
     *
     * @returns {HTMLElement} container
     */
    getContainer(): HTMLElement;
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
     * @returns {HTMLElement} DOM element
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
    eventLayerRemove: import("ol/events").EventsKey | undefined;
    /**
     * Remove all events on map
     *
     * @private
     */
    private removeMeasureEvents;
    /**
     * Format length output.
     *
     * @param {ol.geom.Line} line - geometry line.
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
    private onShowMeasureLengthClick;
}
import Control from "../Control";
import Map from "ol/Map";
//# sourceMappingURL=MeasureLength.d.ts.map