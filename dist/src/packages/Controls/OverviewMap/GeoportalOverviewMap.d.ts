export default GeoportalOverviewMap;
/**
 * @classdesc
 * OpenLayers Control to manage overviewMap
 *
 * @alias ol.control.GeoportalOverviewMap
 * @module GeoportalOverviewMap
*/
declare class GeoportalOverviewMap extends OverviewMap {
    /**
     * @constructor
     * @param {Object} options - ol.control.OverviewMap options (see {@link http://openlayers.org/en/latest/apidoc/ol.control.OverviewMap.html ol.Control.OverviewMap})
     * @fires overviewmap:toggle
     * @example
     * var overviewmap = new ol.control.GeoportalOverviewMap({
     *   position: "top-left"
     * });
     * map.addControl(overviewmap);
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
     */
    _createContainerPosition(map: Map): void;
    /** @private */
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
import OverviewMap from "ol/control/OverviewMap";
import Map from "ol/Map";
//# sourceMappingURL=GeoportalOverviewMap.d.ts.map