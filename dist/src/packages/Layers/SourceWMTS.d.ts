export default SourceWMTS;
/**
 * @classdesc
 * Geoportal WMTS source creation (inherit from ol.source.WMTS)
 *
 * @alias ol.source.GeoportalWMTS
 * @module GeoportalWMTS
 */
declare class SourceWMTS extends WMTSExtended {
    /**
     *
     * @constructor
    * @param {Object} options            - options for function call.
    * @param {String} options.layer      - Layer name (e.g. "ORTHOIMAGERY.ORTHOPHOTOS")
    * @param {Object} [options.configuration] - configuration (cf. example)
    * @param {Boolean} [options.ssl]     - if set true, enforce protocol https (only for nodejs)
    * @param {String} [options.apiKey]   - Access key to Geoportal platform
    * @param {Array} [options.legends]   - Legends objects associated to the layer
    * @param {Array} [options.metadata]   - Metadata objects associated to the layer
    * @param {String} [options.title]   - title of the layer
    * @param {String} [options.description]   - description of the layer
    * @param {String} [options.quicklookUrl]   - quicklookUrl of the layer
    * @param {String} [options.thumbnail]   - thumbnail of the layer
    * @param {String} [options.producer]   - producer of the layer
    * @param {Object} [options.olParams] - other options for ol.source.WMTS function (see {@link http://openlayers.org/en/latest/apidoc/ol.source.WMTS.html ol.source.WMTS})
    * @example
    * var sourceWMTS = new ol.source.GeoportalWMTS({
    *      layer  : "ORTHOIMAGERY.ORTHOPHOTOS"
    * });
     */
    constructor(options: {
        layer: string;
        configuration?: any;
        ssl?: boolean | undefined;
        apiKey?: string | undefined;
        legends?: any[] | undefined;
        metadata?: any[] | undefined;
        title?: string | undefined;
        description?: string | undefined;
        quicklookUrl?: string | undefined;
        thumbnail?: string | undefined;
        producer?: string | undefined;
        olParams?: any;
    });
    _originators: any;
    _legends: any;
    _metadata: any;
    _description: any;
    _title: any;
    _quicklookUrl: any;
    _thumbnail: any;
    _producer: any;
    name: string;
    service: string;
}
import WMTSExtended from "../Sources/WMTS";
//# sourceMappingURL=SourceWMTS.d.ts.map