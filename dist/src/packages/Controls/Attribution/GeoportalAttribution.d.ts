export default GeoportalAttribution;
/**
 * @classdesc
 * OpenLayers Control to manage Originators for layer resources
 *
 * @constructor
 * @extends {ol.control.Attribution}
 * @alias ol.control.GeoportalAttribution
 * @type {ol.control.GeoportalAttribution}
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
declare class GeoportalAttribution {
    /**
     * See {@link ol.control.GeoportalAttribution}
     * @module GeoportalAttribution
     * @alias module:~controls/GeoportalAttribution
     * @param {*} options - options
     * @example
     * import GeoportalAttribution from "gpf-ext-ol/controls/GeoportalAttribution"
     * ou
     * import { GeoportalAttribution } from "gpf-ext-ol"
     */
    constructor(options: any);
    /**
     * Overload setMap function, that enables to catch map events,
     * such as movend events.
     *
     * @param {ol.Map} map - Map.
     */
    setMap(map: ol.Map): void;
    /**
     * Update map layers attributions
     *
     * @param {ol.Map} map - Map.
     * @private
     */
    private _updateAttributions;
    /**
     * Update a layer attributions
     *
     * @param {ol.layer} layer - layer
     * @param {Object} mapAttributions - object recensing attributions already added, to prevent displaying twice the same producer
     * @param {Array} mapExtent - map current extent
     * @param {String} mapCrs - map current crs
     * @param {Number} mapZoom - map current zoom
     * @private
     */
    private _updateLayerAttributions;
}
//# sourceMappingURL=GeoportalAttribution.d.ts.map