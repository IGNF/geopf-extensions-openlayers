export default LayerWMS;
/**
 * @classdesc
 * Geoportal LayerWMS source creation (inherit from ol.layer.Tile)
 *
 * @constructor
 * @extends {ol.layer.Tile}
 * @alias ol.layer.GeoportalWMS
 * @type {ol.layer.GeoportalWMS}
 * @param {Object} options            - options for function call.
 * @param {String} options.layer      - Layer name (e.g. "ORTHOIMAGERY.ORTHOPHOTOS")
 * @param {Object} [options.configuration] - configuration (cf. example)
 * @param {Boolean} [options.ssl]     - if set true, enforce protocol https (only for nodejs)
 * @param {String} [options.apiKey]   - Access key to Geoportal platform
 * @param {Object} [options.olParams] - other options for ol.layer.Tile function (see {@link http://openlayers.org/en/latest/apidoc/ol.layer.Tile.html ol.layer.Tile})
 * @param {Object} [options.olParams.sourceParams] - other options for ol.source.TileWMS function (see {@link http://openlayers.org/en/latest/apidoc/ol.source.TileWMS.html ol.source.TileWMS})
 * @example
 * var layerWMS = new ol.layer.GeoportalWMS({
 *      layer  : "ORTHOIMAGERY.ORTHOPHOTOS"
 * });
 *
 * layerWMS.getLegends();
 * layerWMS.getMetadata();
 * layerWMS.getTitle();
 * layerWMS.getDescription();
 * layerWMS.getQuicklookUrl();
 * layerWMS.getOriginators();
 */
declare class LayerWMS {
    /**
     * See {@link ol.layer.GeoportalWMS}
     * @module LayerWMS
     * @alias module:~layers/GeoportalWMS
     * @param {*} options - options
     * @example
     * import LayerWMS from "gpf-ext-ol/layers/LayerWMS"
     * ou
     * import { LayerWMS } from "gpf-ext-ol"
     */
    constructor(options: any);
    name: any;
    service: string;
    config: any;
    /**
     * Get configuration
     * @returns {Object} - configuration
     */
    getConfiguration(): Object;
    /**
     * Get legends
     * @returns  {Array} - legends
     */
    getLegends(): any[];
    /**
     * Get metadata
     * @returns  {Array} - metadata
     */
    getMetadata(): any[];
    /**
     * Get description
     * @returns {String} - description
     */
    getDescription(): string;
    /**
     * Get title
     * @returns {String} - title
     */
    getTitle(): string;
    /**
     * Get quicklook url
     * @returns {String} - quicklook
     */
    getQuicklookUrl(): string;
    /**
     * Get originators
     * @returns {Array} - originators
     */
    getOriginators(): any[];
}
//# sourceMappingURL=LayerWMS.d.ts.map