export default LayerWFS;
export type LayerWFSOptions = {
    /**
     * - Nom de la couche (ex : "ORTHOIMAGERY.ORTHOPHOTOS")
     */
    layer: string;
    /**
     * - Maximum features (max: 5000)
     */
    maxFeatures?: number | undefined;
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
     * - Options supplémentaires pour ol.layer.Vector {@link https://openlayers.org/en/latest/apidoc/module-ol_layer_Vector-VectorLayer.html ol.layer.Vector options}
     * et options supplémentaires pour ol.source.Vector dans olParams.sourceParams {@link https://openlayers.org/en/latest/apidoc/module-ol_source_Vector-VectorSource.html ol.source.Vector options}
     */
    olParams?: any;
};
/**
 * @typedef {Object} LayerWFSOptions
 * @property {string} layer - Nom de la couche (ex : "ORTHOIMAGERY.ORTHOPHOTOS")
 * @property {Number} [maxFeatures] - Maximum features (max: 5000)
 * @property {Object} [configuration] - Configuration de la couche
 * @property {boolean} [ssl] - Forcer le protocole https (pour nodejs)
 * @property {string} [apiKey] - Clé d'accès à la plateforme
 * @property {Object} [olParams] - Options supplémentaires pour ol.layer.Vector {@link https://openlayers.org/en/latest/apidoc/module-ol_layer_Vector-VectorLayer.html ol.layer.Vector options}
 * et options supplémentaires pour ol.source.Vector dans olParams.sourceParams {@link https://openlayers.org/en/latest/apidoc/module-ol_source_Vector-VectorSource.html ol.source.Vector options}
 */
/**
 * @classdesc
 * Geoportal LayerWMS source creation (inherit from ol.layer.Tile)
 *
 * @alias ol.layer.GeoportalWFS
 * @module GeoportalWFS
*/
declare class LayerWFS extends VectorLayer<import("ol/source").Vector<any>, any> {
    /**
     * @constructor
     * @param {LayerWFSOptions} options            - options for function call.
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
    constructor(options: LayerWFSOptions);
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
import VectorLayer from "ol/layer/Vector";
//# sourceMappingURL=LayerWFS.d.ts.map