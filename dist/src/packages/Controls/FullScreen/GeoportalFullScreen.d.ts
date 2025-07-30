export default GeoportalFullScreen;
/**
 * @classdesc
 * OpenLayers Control to manage full screen
 *
 * @alias ol.control.GeoportalFullScreen
 * @module GeoportalFullScreen
 */
declare class GeoportalFullScreen extends FullScreen {
    /**
     * @constructor
    * @param {Object} options - ol.control.FullScreen options (see {@link http://openlayers.org/en/latest/apidoc/ol.control.FullScreen.html ol.Control.FullScreen})
    * @example
    * var zoom = new ol.control.GeoportalFullScreen({
    *   position: "top-left"
    * });
    * map.addControl(zoom);
     */
    constructor(options: any);
    /**
     * Nom de la classe (heritage)
     * @private
     */
    private CLASSNAME;
    container: HTMLElement | null;
    options: any;
    /**
     * ...
     * @param {Map} map - ...
     * @private
     */
    private _createContainerPosition;
    /**
     * ...
     * @private
     */
    private _initContainer;
    /**
     * @private
     * UID interne pour chaque controle */
    private _uid;
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
import FullScreen from "ol/control/FullScreen";
import Map from "ol/Map";
//# sourceMappingURL=GeoportalFullScreen.d.ts.map