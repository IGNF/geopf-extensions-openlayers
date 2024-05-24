export default LayerWMTS;
/**
 * @classdesc
 * Geoportal LayerWMTS source creation (inherit from ol.layer.Tile)
 *
 * @constructor
 * @extends {ol.layer.Tile}
 * @alias ol.layer.GeoportalWMTS
 * @type {ol.layer.GeoportalWMTS}
 * @param {Object} options            - options for function call.
 * @param {String} options.layer      - Layer name (e.g. "ORTHOIMAGERY.ORTHOPHOTOS")
 * @param {Object} [options.configuration] - configuration (cf. example)
 * @param {Boolean} [options.ssl]     - if set true, enforce protocol https (only for nodejs)
 * @param {String} [options.apiKey]   - Access key to Geoportal platform
 * @param {Object} [options.olParams] - other options for ol.layer.Tile function (see {@link http://openlayers.org/en/latest/apidoc/ol.layer.Tile.html ol.layer.Tile})
 * @param {Object} [options.olParams.sourceParams] - other options for ol.source.WMTS function (see {@link http://openlayers.org/en/latest/apidoc/ol.source.WMTS.html ol.source.WMTS})
 * @example
 * var layerWMTS = new ol.layer.GeoportalWMTS({
 *      layer  : "ORTHOIMAGERY.ORTHOPHOTOS"
 * });
 *
 * // Ex. configuration object for WMTS Layer
 * {
*    name: "ORTHOIMAGERY.ORTHOPHOTOS",
*    title: "Photographies aériennes",
*    description: "Photographies aériennes",
*    globalConstraint: {
*        maxScaleDenominator: 559082264.0287179,
*        minScaleDenominator: 266.5911979812229,
*        bbox: {
*            left: -180,
*            right: 180,
*            top: 89,
*            bottom: -89
*        }
*    },
*    serviceParams: {
*        id: "OGC:WMTS",
*        version: "1.0.0",
*        serverUrl: {
*            full: "https://data.geopf.fr/wmts"
*        }
*    },
*    defaultProjection: "EPSG:3857",
*    wmtsOptions: {
*        tileMatrixSetLink: "PM",
*        tileMatrixSetLimits: {
*            (...)
*        }
*    },
*    styles: [{
*        name: "normal",
*        title: "Légende générique",
*        current: true,
*        url: null
*    }],
*    legends: [{
*        format: "image/jpeg",
*        url: "https://data.geopf.fr/annexes/ressources/legendes/LEGEND.jpg",
*        minScaleDenominator: "200"
*    }],
*    formats: [{
*        name: "image/jpeg",
*        current: true
*    }]
* }
 */
declare var LayerWMTS: ol.layer.GeoportalWMTS;
//# sourceMappingURL=LayerWMTS.d.ts.map