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
    * @param {String} [options.urlTemplate] - template of the WMTS url query string, useful to change the order or the case of the KVP.
    *      The placeholders {version}, {style}, {format}, {tilematrixset} and {apikey} are resolved at source creation,
    *      whereas the OGC placeholders {Layer}, {TileMatrix}, {TileCol} and {TileRow} are resolved by OpenLayers (REST request encoding).
    *      By default : "Service=WMTS&Request=GetTile&Version={version}&Layer={Layer}&Style={style}&Format={format}&TileMatrixSet={tilematrixset}&TileMatrix={TileMatrix}&TileCol={TileCol}&TileRow={TileRow}"
    * @param {Object} [options.olParams] - other options for ol.source.WMTS function (see {@link http://openlayers.org/en/latest/apidoc/ol.source.WMTS.html ol.source.WMTS})
    * @example
    * var sourceWMTS = new ol.source.GeoportalWMTS({
    *      layer  : "ORTHOIMAGERY.ORTHOPHOTOS"
    * });
    * // avec un template personnalisé (ordre et casse des KVP modifiés)
    * var sourceWMTS = new ol.source.GeoportalWMTS({
    *      layer : "ORTHOIMAGERY.ORTHOPHOTOS",
    *      urlTemplate : "service=WMTS&request=GetTile&version={version}&layer={Layer}&style={style}&format={format}&tilematrixset={tilematrixset}&tilematrix={TileMatrix}&tilerow={TileRow}&tilecol={TileCol}"
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
        urlTemplate?: string | undefined;
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