export default GeoportalFullScreen;
/**
 * @classdesc
 * OpenLayers Control to manage full screen
 *
 * @constructor
 * @extends {ol.control.FullScreen}
 * @alias ol.control.GeoportalFullScreen
 * @type {ol.control.GeoportalFullScreen}
 * @param {Object} options - ol.control.FullScreen options (see {@link http://openlayers.org/en/latest/apidoc/ol.control.FullScreen.html ol.Control.FullScreen})
 * @example
 * var zoom = new ol.control.GeoportalFullScreen({
 *   position: "top-left"
 * });
 * map.addControl(zoom);
 */
declare class GeoportalFullScreen {
    /**
     * See {@link ol.control.GeoportalFullScreen}
     * @module GeoportalFullScreen
     * @alias module:~controls/GeoportalFullScreen
     * @param {*} options - options
     * @example
     * import GeoportalFullScreen from "gpf-ext-ol/controls/GeoportalFullScreen"
     * ou
     * import { GeoportalFullScreen } from "gpf-ext-ol"
     */
    constructor(options: any);
    /**
     * Nom de la classe (heritage)
     * @private
     */
    private CLASSNAME;
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
//# sourceMappingURL=GeoportalFullScreen.d.ts.map