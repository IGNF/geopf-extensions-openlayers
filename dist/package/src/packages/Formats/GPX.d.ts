export default GPX;
/**
 * @classdesc
 *
 * Extended Styles GPX format to export (internal use only !)
 *
 * SPEC
 * cf. https://www.topografix.com/gpx.asp
 *
 *
 * @constructor
 * @alias ol.format.GPXExtended
 * @extends {ol.format.GPX}
 * @type {ol.format.GPXExtended}
 * @param {Object} options - Options
 * @param {Object} [options.defaultStyle] - Styles by default
 * @param {String} [options.orderBy] - Sort by key the feature before writing. By default, no sorting
 * @param {Object} [options.extensions] - Add properties to file root
 * @param {function} [options.readExtensions] - Reading extensions (native)
 */
declare class GPX {
    /**
     * See {@link ol.format.GPXExtended}
     * @module GPXExtended
     * @alias module:~formats/GPXExtended
     * @param {*} options - options
     * @example
     * import GPXExtended from from "gpf-ext-ol/formats/GPXExtended"
     * ou
     * import { GPXExtended } from "gpf-ext-ol"
     */
    constructor(options: any);
    options: any;
    source: any;
    /**
     * Read Extend Styles for Features.
     * This function overloads ol.format.GPX.readFeatures ...
     *
     * @see ol.format.GPX.prototype.readFeatures
     * @param {Document|Node} source - Source.
     * @param {olx.format.ReadOptions=} options - options.
     * @returns {Array.<ol.Feature>} Features.
     */
    readFeatures(source: Document | Node, options?: olx.format.ReadOptions | undefined): Array<ol.Feature>;
    /**
     * Write Extend Styles for Features.
     * This function overloads ol.format.GPX.writeFeatures ...
     *
     * @see ol.format.GPX.prototype.writeFeatures
     * @param {Object[]} features - Features.
     * @param {Object} options - Options.
     *
     * @returns {String} Result or null.
     */
    writeFeatures(features: Object[], options: Object): string;
    /**
     * Callback to read extensions from options : readExtensions
     *
     * @param {*} feature - ...
     * @param {*} node - ...
     */
    readExtensions(feature: any, node: any): void;
    /**
     * ...
     * @param {*} key ...
     * @returns {Object} json
     * @todo
     */
    readRootExtensions(key: any): Object;
    /**
     * ...
     *
     * @param {*} doc - ...
     * @param {*} extensions - ...
     * @param {Boolean} [xml=false] - write tag xml or json
     */
    writeRootExtensions_(doc: any, extensions: any, xml?: boolean): void;
    /**
     * ...
     *
     * @param {Object} feature - ...
     * @param {DOMElement} node - ...
     * @private
     */
    private writeExtensions_;
    /**
     * ...
     *
     * @param {DOMElement} doc - ...
     * @param {Object} features - ...
     * @param {Object} actions - ...
     * @private
     */
    private processExtensions_;
}
//# sourceMappingURL=GPX.d.ts.map