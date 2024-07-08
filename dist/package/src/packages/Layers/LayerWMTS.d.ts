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
* layerWMTS.getLegends();
* layerWMTS.getMetadata();
* layerWMTS.getTitle();
* layerWMTS.getDescription();
* layerWMTS.getQuicklookUrl();
* layerWMTS.getOriginators();
*
* // Ex. configuration object for WMTS Layer
* {
* "name" : "GEOGRAPHICALGRIDSYSTEMS.MAPS.OVERVIEW",
* "globalConstraint" : {
*     "maxScaleDenominator" : 279541132.01435894,
*     "minScaleDenominator" : 2183915.0938621787,
*     "bbox" : {
*         "left" : -179.5,
*         "right" : 179.5,
*         "top" : 75,
*         "bottom" : -75
*     }
* },
* "params" : {
*     "url" : "https:*data.geopf.fr/wmts",
*     "styles" : "normal",
*     "version" : "1.0.0",
*     "format" : "image/jpeg",
*     "projection" : "EPSG:3857",
*     "minScale" : 2183915.0938621787,
*     "maxScale" : 279541132.01435894,
*     "extent" : {
*         "left" : -179.5,
*         "right" : 179.5,
*         "top" : 75,
*         "bottom" : -75
*     },
*     "legends" : [
*         {
*             "format" : "image/jpeg",
*             "url" : "https:*data.geopf.fr/annexes/ressources/legendes/LEGEND.jpg",
*             "minScaleDenominator" : "200"
*         }
*     ],
*     "title" : "Carte Mondiale pour la mini-vue",
*     "description" : "Carte Mondiale pour la mini-vue",
*     "tileMatrixSetLimits" : {
*         "1" : {
*             "minTileRow" : "0",
*             "maxTileRow" : "1",
*             "minTileCol" : "0",
*             "maxTileCol" : "1"
*         },
*         "2" : {
*             "minTileRow" : "0",
*             "maxTileRow" : "3",
*             "minTileCol" : "0",
*             "maxTileCol" : "3"
*         },
*         "3" : {
*             "minTileRow" : "1",
*             "maxTileRow" : "6",
*             "minTileCol" : "0",
*             "maxTileCol" : "7"
*         },
*         "4" : {
*             "minTileRow" : "2",
*             "maxTileRow" : "13",
*             "minTileCol" : "0",
*             "maxTileCol" : "15"
*         },
*         "5" : {
*             "minTileRow" : "5",
*             "maxTileRow" : "26",
*             "minTileCol" : "0",
*             "maxTileCol" : "31"
*         },
*         "6" : {
*             "minTileRow" : "11",
*             "maxTileRow" : "52",
*             "minTileCol" : "0",
*             "maxTileCol" : "63"
*         },
*         "7" : {
*             "minTileRow" : "22",
*             "maxTileRow" : "105",
*             "minTileCol" : "0",
*             "maxTileCol" : "127"
*         },
*         "8" : {
*             "minTileRow" : "45",
*             "maxTileRow" : "210",
*             "minTileCol" : "0",
*             "maxTileCol" : "255"
*         }
*     },
*     "TMSLink" : "PM_1_8",
*     "matrixIds" : [
*         "1",
*         "2",
*         "3",
*         "4",
*         "5",
*         "6",
*         "7",
*         "8"
*     ],
*     "tileMatrices" : {
*         "1" : {
*             "matrixId" : "1",
*             "matrixHeight" : 2,
*             "matrixWidth" : 2,
*             "scaleDenominator" : 279541132.01435894,
*             "tileHeight" : 256,
*             "tileWidth" : 256,
*             "topLeftCorner" : {
*                 "x" : -20037508.3427892,
*                 "y" : 20037508.3427892
*             }
*         },
*         "2" : {
*             "matrixId" : "2",
*             "matrixHeight" : 4,
*             "matrixWidth" : 4,
*             "scaleDenominator" : 139770566.0071793,
*             "tileHeight" : 256,
*             "tileWidth" : 256,
*             "topLeftCorner" : {
*                 "x" : -20037508.3427892,
*                 "y" : 20037508.3427892
*             }
*         },
*         "3" : {
*             "matrixId" : "3",
*             "matrixHeight" : 8,
*             "matrixWidth" : 8,
*             "scaleDenominator" : 69885283.00358965,
*             "tileHeight" : 256,
*             "tileWidth" : 256,
*             "topLeftCorner" : {
*                 "x" : -20037508.3427892,
*                 "y" : 20037508.3427892
*             }
*         },
*         "4" : {
*             "matrixId" : "4",
*             "matrixHeight" : 16,
*             "matrixWidth" : 16,
*             "scaleDenominator" : 34942641.50179486,
*             "tileHeight" : 256,
*             "tileWidth" : 256,
*             "topLeftCorner" : {
*                 "x" : -20037508.3427892,
*                 "y" : 20037508.3427892
*             }
*         },
*         "5" : {
*             "matrixId" : "5",
*             "matrixHeight" : 32,
*             "matrixWidth" : 32,
*             "scaleDenominator" : 17471320.75089743,
*             "tileHeight" : 256,
*             "tileWidth" : 256,
*             "topLeftCorner" : {
*                 "x" : -20037508.3427892,
*                 "y" : 20037508.3427892
*             }
*         },
*         "6" : {
*             "matrixId" : "6",
*             "matrixHeight" : 64,
*             "matrixWidth" : 64,
*             "scaleDenominator" : 8735660.375448715,
*             "tileHeight" : 256,
*             "tileWidth" : 256,
*             "topLeftCorner" : {
*                 "x" : -20037508.3427892,
*                 "y" : 20037508.3427892
*             }
*         },
*         "7" : {
*             "matrixId" : "7",
*             "matrixHeight" : 128,
*             "matrixWidth" : 128,
*             "scaleDenominator" : 4367830.1877243575,
*             "tileHeight" : 256,
*             "tileWidth" : 256,
*             "topLeftCorner" : {
*                 "x" : -20037508.3427892,
*                 "y" : 20037508.3427892
*             }
*         },
*         "8" : {
*             "matrixId" : "8",
*             "matrixHeight" : 256,
*             "matrixWidth" : 256,
*             "scaleDenominator" : 2183915.0938621787,
*             "tileHeight" : 256,
*             "tileWidth" : 256,
*             "topLeftCorner" : {
*                 "x" : -20037508.3427892,
*                 "y" : 20037508.3427892
*             }
*         }
*     },
*     "nativeResolutions" : [
*         "78271.51696402048",
*         "39135.75848201023",
*         "19567.87924100512",
*         "9783.939620502561",
*         "4891.969810251280",
*         "2445.984905125640",
*         "1222.992452562820",
*         "611.4962262814100"
*     ]
* }
*/
declare var LayerWMTS: ol.layer.GeoportalWMTS;
//# sourceMappingURL=LayerWMTS.d.ts.map