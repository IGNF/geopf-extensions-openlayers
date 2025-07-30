export default MeasureArea;
/**
 * @classdesc
 *
 * Tool Measure Area Control. Allows users to measure the length of a path drawn on the map.
 *
 * @alias ol.control.MeasureArea
 * @module measureArea
 *
*/
declare class MeasureArea extends Control {
    /**
     * @constructor
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
    constructor(options: {
        id?: number | undefined;
        geodesic?: boolean | undefined;
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
    /**
     * Nom de la classe (heritage)
     * @private
     */
    private CLASSNAME;
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
import Control from "../Control";
import Map from "ol/Map";
//# sourceMappingURL=MeasureArea.d.ts.map