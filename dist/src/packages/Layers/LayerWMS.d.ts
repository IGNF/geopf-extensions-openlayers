export default LayerWMS;
export type LayerWMSOptions = {
    /**
     * - Nom de la couche (ex : "ORTHOIMAGERY.ORTHOPHOTOS")
     */
    layer: string;
    /**
     * - Configuration de la couche
     */
    configuration?: any;
    /**
     * - Forcer le protocole https (pour nodejs)
     */
    ssl?: boolean | undefined;
    /**
     * - Clé d'accès à la plateforme
     */
    apiKey?: string | undefined;
    /**
     * - Options supplémentaires pour ol.layer.Tile {@link https://openlayers.org/en/latest/apidoc/module-ol_layer_Tile-TileLayer.html ol.layer.Tile options}
     * et options supplémentaires pour ol.source.TileWMS dans olParams.sourceParams {@link https://openlayers.org/en/latest/apidoc/module-ol_source_TileWMS-TileWMS.html ol.source.TileWMS options}
     */
    olParams?: any;
};
/**
 * @typedef {Object} LayerWMSOptions
 * @property {string} layer - Nom de la couche (ex : "ORTHOIMAGERY.ORTHOPHOTOS")
 * @property {Object} [configuration] - Configuration de la couche
 * @property {boolean} [ssl] - Forcer le protocole https (pour nodejs)
 * @property {string} [apiKey] - Clé d'accès à la plateforme
 * @property {Object} [olParams] - Options supplémentaires pour ol.layer.Tile {@link https://openlayers.org/en/latest/apidoc/module-ol_layer_Tile-TileLayer.html ol.layer.Tile options}
 * et options supplémentaires pour ol.source.TileWMS dans olParams.sourceParams {@link https://openlayers.org/en/latest/apidoc/module-ol_source_TileWMS-TileWMS.html ol.source.TileWMS options}
 */
/**
 * @classdesc
 * Geoportal LayerWMS source creation (inherit from ol.layer.Tile)
 *
 * @alias ol.layer.GeoportalWMS
 * @module GeoportalWMS
*/
declare class LayerWMS extends TileLayer<import("ol/source").Tile<import("ol").Tile>> {
    /**
     * @constructor
     * @param {LayerWMSOptions} options - options for function call.
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
    constructor(options: LayerWMSOptions);
    name: string;
    service: string;
    config: any;
    /**
     * Get configuration
     * @returns {Object} - configuration
     */
    getConfiguration(): any;
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
import TileLayer from "ol/layer/Tile";
//# sourceMappingURL=LayerWMS.d.ts.map