export default LayerWFS;
/**
 * @classdesc
 * Geoportal LayerWMS source creation (inherit from ol.layer.Tile)
 *
 * @constructor
 * @extends {ol.layer.Vector}
 * @alias ol.layer.GeoportalWFS
 * @type {ol.layer.GeoportalWFS}
 * @param {Object} options            - options for function call.
 * @param {String} options.layer      - Layer name (e.g. "")
 * @param {Number} [options.maxFeatures] - maximum features (max: 5000)
 * @param {Object} [options.configuration] - configuration (cf. example)
 * @param {Boolean} [options.ssl]     - if set true, enforce protocol https (only for nodejs)
 * @param {String} [options.apiKey]   - Access key to Geoportal platform
 * @param {Object} [options.olParams] - other options for ol.layer.Vector function (see {@link http://openlayers.org/en/latest/apidoc/ol.layer.Vector.html ol.layer.Vector})
 * @param {Object} [options.olParams.sourceParams] - other options for ol.source.Vector function (see {@link http://openlayers.org/en/latest/apidoc/ol.source.Vector.html ol.source.Vector})
 * @example
 * var layerWFS = new ol.layer.GeoportalWFS({
 *      layer  : "BDTOPO_V3:batiment",
 *      maxFeatures: 500,
 *      olParams : {
 *          minZoom: 15,
 *          maxZoom: 21,
 *          style: new ol.style.Style(...),
 *          sourceParams: {}
 *      }
 * });
 *
 * layerWFS.getLegends();
 * layerWFS.getMetadata();
 * layerWFS.getTitle();
 * layerWFS.getDescription();
 * layerWFS.getQuicklookUrl();
 * layerWFS.getOriginators();
 */
declare var LayerWFS: ol.layer.GeoportalWFS;
//# sourceMappingURL=LayerWFS.d.ts.map