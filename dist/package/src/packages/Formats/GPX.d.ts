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
 * @alias ol.format.GPXExtended
 * @module GPXExtended
*/
declare class GPX extends olGPX {
    /**
     * @constructor
     * @param {Object} options - Options
     * @param {Object} [options.defaultStyle] - Styles by default
     * @param {String} [options.orderBy] - Sort by key the feature before writing. By default, no sorting
     * @param {Object} [options.extensions] - Add properties to file root
     * @param {function} [options.readExtensions] - Reading extensions (native)
     */
    constructor(options: {
        defaultStyle?: any;
        orderBy?: string | undefined;
        extensions?: any;
        readExtensions?: Function | undefined;
    });
    options: {
        defaultStyle?: any;
        orderBy?: string | undefined;
        extensions?: any;
        readExtensions?: Function | undefined;
    };
    source: Document | Node | HTMLElement | null;
    /**
     * Read Extend Styles for Features.
     * This function overloads ol.format.GPX.readFeatures ...
     *
     * @see olGPX#readFeatures
     * @param {Document|Node} source - Source.
     * @param {Object} options - options. see olx.format.ReadOptions
     * @returns {Feature[]} Features.
     */
    readFeatures(source: Document | Node, options: any): Feature[];
    /**
     * Write Extend Styles for Features.
     * This function overloads ol.format.GPX.writeFeatures ...
     *
     * @see olGPX#writeFeatures
     * @param {Features[]} features - Features.
     * @param {Object} options - Options.
     *
     * @returns {String} Result or null.
     */
    writeFeatures(features: Features[], options: any): string;
    /**
     * Callback to read extensions from options : readExtensions
     *
     * @param {Feature} feature - ...
     * @param {*} node - ...
     */
    readExtensions(feature: Feature, node: any): void;
    /**
     * ...
     * @param {*} key ...
     * @returns {Object} json
     * @todo
     */
    readRootExtensions(key: any): any;
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
     * @param {Feature} feature - ...
     * @param {HTMLElement} node - ...
     * @private
     */
    private writeExtensions_;
    /**
     * ...
     *
     * @param {HTMLElement} doc - ...
     * @param {Feature[]} features - ...
     * @param {Object} actions - ...
     * @private
     */
    private processExtensions_;
}
import olGPX from "ol/format/GPX";
import Feature from "ol/Feature";
//# sourceMappingURL=GPX.d.ts.map