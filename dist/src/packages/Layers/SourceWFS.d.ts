export default SourceWFS;
/**
 * @classdesc
 * Geoportal tile WMS source creation (inherit from ol.source.TileWMS)
 *
 * @alias ol.source.GeoportalWFS
 * @module GeoportalWFS
*/
declare class SourceWFS extends VectorSource<import("ol").Feature<import("ol/geom").Geometry>> {
    /**
    * @constructor
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
    constructor(options: {
        layer: string;
        maxFeatures?: number | undefined;
        configuration?: any;
        ssl?: boolean | undefined;
        apiKey?: string | undefined;
        legends?: any[] | undefined;
        metadata?: any[] | undefined;
        title?: string | undefined;
        description?: string | undefined;
        quicklookUrl?: string | undefined;
        olParams?: any;
    });
    _originators: any;
    _legends: any;
    _metadata: any;
    _title: any;
    _description: any;
    _quicklookUrl: any;
    name: string;
    service: string;
}
import VectorSource from "ol/source/Vector";
//# sourceMappingURL=SourceWFS.d.ts.map