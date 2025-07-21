export default GeoportalOverviewMap;
/**
 * @classdesc
 * OpenLayers Control to manage overviewMap
 *
 * @constructor
 * @extends {ol.control.OverviewMap}
 * @alias ol.control.GeoportalOverviewMap
 * @type {ol.control.GeoportalOverviewMap}
 * @param {Object} options - ol.control.OverviewMap options (see {@link http://openlayers.org/en/latest/apidoc/ol.control.OverviewMap.html ol.Control.OverviewMap})
 * @fires overviewmap:toggle
 * @example
 * var overviewmap = new ol.control.GeoportalOverviewMap({
 *   position: "top-left"
 * });
 * map.addControl(overviewmap);
 */
declare class GeoportalOverviewMap {
    /**
     * See {@link ol.control.GeoportalOverviewMap}
     * @module GeoportalOverviewMap
     * @alias module:~controls/GeoportalOverviewMap
     * @param {*} options - options
     * @example
     * import GeoportalOverviewMap from "gpf-ext-ol/controls/GeoportalOverviewMap"
     * ou
     * import { GeoportalOverviewMap } from "gpf-ext-ol"
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
//# sourceMappingURL=GeoportalOverviewMap.d.ts.map