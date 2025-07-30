export default GeoportalAttribution;
/**
 * @classdesc
 * OpenLayers Control to manage Originators for layer resources
 *
 * @alias ol.control.GeoportalAttribution
 * @module GeoportalAttribution
*/
declare class GeoportalAttribution extends Attribution {
    /**
     * @constructor
     * @param {Object} options - ol.control.Attribution options (see {@link http://openlayers.org/en/latest/apidoc/ol.control.Attribution.html ol.Control.Attribution})
     * @fires attributions:update
     * @example
     * var attribution = new ol.control.GeoportalAttribution({
     *   collapsed : false
     * });
     * map.addControl(attribution);
     * // listeners for attributions update :
     * attribution.on("attributions:update", function (e) {});
     */
    constructor(options: any);
    /**
     * Overload setMap function, that enables to catch map events,
     * such as movend events.
     *
     * @param {Map} map - Map.
     */
    setMap(map: Map): void;
    /**
     * Update map layers attributions
     *
     * @param {Map} map - Map.
     * @private
     */
    private _updateAttributions;
    /**
     * Update a layer attributions
     *
     * @param {Layer} layer - layer
     * @param {Object} mapAttributions - object recensing attributions already added, to prevent displaying twice the same producer
     * @param {Array} mapExtent - map current extent
     * @param {String} mapCrs - map current crs
     * @param {Number} mapZoom - map current zoom
     * @private
     */
    private _updateLayerAttributions;
}
import Attribution from "ol/control/Attribution";
import Map from "ol/Map";
//# sourceMappingURL=GeoportalAttribution.d.ts.map