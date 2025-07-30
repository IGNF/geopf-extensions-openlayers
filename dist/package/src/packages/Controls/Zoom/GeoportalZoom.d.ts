export default GeoportalZoom;
/**
 * @classdesc
 * OpenLayers Control to manage zoom
 *
 * @alias ol.control.GeoportalZoom
 * @module GeoportalZoom
*/
declare class GeoportalZoom extends Zoom {
    /**
     * @constructor
     * @param {Object} options - ol.control.Zoom options (see {@link http://openlayers.org/en/latest/apidoc/ol.control.Zoom.html ol.Control.Zoom})
     * @fires zoom:in
     * @fires zoom:out
     * @example
     * var zoom = new ol.control.GeoportalZoom({
     *   position: "top-left"
     * });
     * map.addControl(zoom);
     */
    constructor(options: any);
    container: HTMLElement | null;
    options: any;
    /**
     * ...
     * @param {Map} map - ...
     * @private
     */
    private _createContainerPosition;
    /**
     * @private
     */
    private _initContainer;
    _uid: any;
    /**
     * Overload setMap function
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
}
import Zoom from "ol/control/Zoom";
import Map from "ol/Map";
//# sourceMappingURL=GeoportalZoom.d.ts.map