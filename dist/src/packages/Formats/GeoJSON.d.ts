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
 * @alias ol.format.GeoJSONExtended
 * @module GeoJSONExtended
*/
declare class GeoJSON extends olGeoJSON<Feature<import("ol/geom").Geometry>> {
    /**
     * @constructor
     * @param {Object} options - Options
     * @param {Object} [options.defaultStyle] - Styles by default
     * @param {Object} [options.extensions] - Add properties to file root
     */
    constructor(options: {
        defaultStyle?: any;
        extensions?: any;
    });
    options: {
        defaultStyle?: any;
        extensions?: any;
    };
    source: any;
    /**
     * Read Extend Styles for Features.
     * This function overloads ol.format.GeoJSON.readFeatures ...
     *
     * @see olGeoJSON#readFeatures
     * @param {Object|String} source - Source.
     * @param {Object} [options] - Options. see olx.format.ReadOptions
     * @returns {Feature[]} Features.
     */
    readFeatures(source: any | string, options?: any): Feature[];
    /**
     * Write Extend Styles for Features.
     * This function overloads ol.format.GeoJSON.writeFeatures ...
     *
     * @see olGeoJSON#writeFeatures
     * @param {Feature[]} features - Features.
     * @param {Object} [options] - Options.
     *
     * @returns {String} Result.
     */
    writeFeatures(features: Feature[], options?: any): string;
    /**
     * ...
     * @param {*} key ...
     * @returns {Object} json
     */
    readRootExtensions(key: any): any;
}
import Feature from "ol/Feature";
import olGeoJSON from "ol/format/GeoJSON";
//# sourceMappingURL=GeoJSON.d.ts.map