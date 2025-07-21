export default GeoJSON;
/**
 * @classdesc
 *
 * Extended Styles GeoJSON format to export (internal use only !)
 *
 * SPEC
 * cf. https://github.com/mapbox/simplestyle-spec/
 * cf. https://geojson.org/
 *
 *
 * @constructor
 * @alias ol.format.GeoJSONExtended
 * @extends {ol.format.GeoJSON}
 * @type {ol.format.GeoJSONExtended}
 * @param {Object} options - Options
 * @param {Object} [options.defaultStyle] - Styles by default
 * @param {Object} [options.extensions] - Add properties to file root
 */
declare class GeoJSON {
    /**
     * See {@link ol.format.GeoJSONExtended}
     * @module GeoJSONExtended
     * @alias module:~formats/GeoJSONExtended
     * @param {*} options - options
     * @example
     * import GeoJSONExtended from "gpf-ext-ol/formats/GeoJSONExtended"
     * ou
     * import { GeoJSONExtended } from "gpf-ext-ol"
     */
    constructor(options: any);
    options: any;
    source: any;
    /**
     * Read Extend Styles for Features.
     * This function overloads ol.format.GeoJSON.readFeatures ...
     *
     * @see ol.format.GeoJSON.prototype.readFeatures
     * @param {Object|String} source - Source.
     * @param {olx.format.ReadOptions} [options] - Options.
     * @returns {Array.<ol.Feature>} Features.
     */
    readFeatures(source: Object | string, options?: olx.format.ReadOptions): Array<ol.Feature>;
    /**
     * Write Extend Styles for Features.
     * This function overloads ol.format.GeoJSON.writeFeatures ...
     *
     * @see ol.format.GeoJSON.prototype.writeFeatures
     * @param {Array.<ol.Feature>} features - Features.
     * @param {Object} [options] - Options.
     *
     * @returns {String} Result.
     */
    writeFeatures(features: Array<ol.Feature>, options?: Object): string;
    /**
     * ...
     * @param {*} key ...
     * @returns {Object} json
     */
    readRootExtensions(key: any): Object;
}
//# sourceMappingURL=GeoJSON.d.ts.map