export default GeoportalZoom;
/**
 * @classdesc
 * OpenLayers Control to manage zoom
 *
 * @constructor
 * @extends {ol.control.Zoom}
 * @alias ol.control.GeoportalZoom
 * @type {ol.control.GeoportalZoom}
 * @param {Object} options - ol.control.Zoom options (see {@link http://openlayers.org/en/latest/apidoc/ol.control.Zoom.html ol.Control.Zoom})
 * @fires zoom:in
 * @fires zoom:out
 * @example
 * var zoom = new ol.control.GeoportalZoom({
 *   position: "top-left"
 * });
 * map.addControl(zoom);
 */
declare class GeoportalZoom {
    /**
     * See {@link ol.control.GeoportalZoom}
     * @module GeoportalZoom
     * @alias module:~controls/GeoportalZoom
     * @param {*} options - options
     * @example
     * import GeoportalZoom from "gpf-ext-ol/controls/GeoportalZoom"
     * ou
     * import { GeoportalZoom } from "gpf-ext-ol"
     */
    constructor(options: any);
    container: any;
    options: any;
    _createContainerPosition(map: any): void;
    _initContainer(): void;
    _uid: any;
    /**
     * Overload setMap function
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
}
//# sourceMappingURL=GeoportalZoom.d.ts.map