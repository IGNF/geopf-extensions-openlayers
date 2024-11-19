export default SourceWFS;
/**
 * @classdesc
 * Geoportal tile WMS source creation (inherit from ol.source.TileWMS)
 *
 * @constructor
 * @alias ol.source.GeoportalWFS
 * @type {ol.source.GeoportalWFS}
 * @extends {ol.source.Vector}
 * @param {Object} options            - options for function call.
 * @param {String} options.layer      - Layer name (e.g. "")
 * @param {Number} [options.maxFeatures] - maximum features (max: 5000)
 * @param {Object} [options.configuration] - configuration (cf. example)
 * @param {Boolean} [options.ssl]     - if set true, enforce protocol https (only for nodejs)
 * @param {String} [options.apiKey]   - Access key to Geoportal platform
 * @param {Array} [options.legends]   - Legends objects associated to the layer
 * @param {Array} [options.metadata]   - Metadata objects associated to the layer
 * @param {String} [options.title]   - title of the layer
 * @param {String} [options.description]   - description of the layer
 * @param {String} [options.quicklookUrl]   - quicklookUrl of the layer
 * @param {Object} [options.olParams] - other options for ol.source.Vector function (see {@link http://openlayers.org/en/latest/apidoc/ol.source.Vector.html ol.source.Vector})
 * @example
 * var sourceWFS = new ol.source.GeoportalWFS({
 *      layer: "",
 *      maxFeatures: 500,
 *      olParams: {}
 * });
 */
declare var SourceWFS: ol.source.GeoportalWFS;
//# sourceMappingURL=SourceWFS.d.ts.map