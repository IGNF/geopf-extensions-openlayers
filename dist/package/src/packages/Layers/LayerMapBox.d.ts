export default LayerMapBox;
/**
* @classdesc
* Geoportal Layer Mapbox creation
*
* @constructor
* @extends {ol.layer.VectorTile}
* @alias ol.layer.GeoportalMapBox
* @type {ol.layer.GeoportalMapBox}
* @param {Object} options            - options for function call.
* @param {String} options.layer      - Layer name (e.g. "PLAN.IGN")
* @param {Object} [options.configuration] - configuration (cf. example)
* @param {String} [options.style]    - Style name (e.g. "classique")
* @param {String} [options.source]   - Source name (e.g. "plan_ign")
* @param {Boolean} [options.ssl]     - if set true, enforce protocol https (only for nodejs)
* @param {Object} [settings] - other options for ol.layer.VectorTile function (see {@link https://openlayers.org/en/latest/apidoc/module-ol_layer_VectorTile-VectorTileLayer.html ol.layer.VectorTile})
* @example
* var LayerMapBox = new ol.layer.GeoportalMapBox({
*      layer  : "PLAN.IGN",
*      [style  : "classique",]
*      [source : "plan_ign",]
*      [ssl: true]
* }, {
*      opacity
*      visible
*      extent
*      declutter
*      ...
* });
*
* // Ex. configuration object for TMS Layer
* "PLAN.IGN$GEOPORTAIL:GPP:TMS": {
*   "hidden": true,
*   "queryable": false,
*   "serviceParams": {
*     "id": "GPP:TMS",
*     "version": "1.0.0",
*     "serverUrl": {
*       "cartes": "https://wxs.ign.fr/cartes/geoportail/tms/1.0.0/"
*     }
*   },
*   "name": "PLAN.IGN",
*   "title": "Plan IGN",
*   "description": "BDUni tuilée",
*   "formats": [
*     {
*       "current": true,
*       "name": "application/x-protobuf"
*     }
*   ],
*   "styles": [
*     {
*       "name": "standard",
*       "title": "Style standard",
*       "current": true,
*       "url": "https://wxs.ign.fr/static/vectorTiles/styles/PLAN.IGN/essentiels/standard.json"
*     },
*     {
*       "name": "classique",
*       "title": "Style classique",
*       "current": true,
*       "url": "https://wxs.ign.fr/static/vectorTiles/styles/PLAN.IGN/essentiels/classique.json"
*     },
*     {
*       "name": "transparent",
*       "title": "Style transparent",
*       "current": true,
*       "url": "https://wxs.ign.fr/static/vectorTiles/styles/PLAN.IGN/essentiels/transparent.json"
*     },
*     {
*       "name": "accentue",
*       "title": "Style accentue",
*       "current": true,
*       "url": "https://wxs.ign.fr/static/vectorTiles/styles/PLAN.IGN/essentiels/accentue.json"
*     },
*     {
*       "name": "attenue",
*       "title": "Style attenue",
*       "current": true,
*       "url": "https://wxs.ign.fr/static/vectorTiles/styles/PLAN.IGN/essentiels/attenue.json"
*     },
*     {
*       "name": "gris",
*       "title": "Style en noir et blanc",
*       "current": false,
*       "url": "https://wxs.ign.fr/static/vectorTiles/styles/PLAN.IGN/essentiels/gris.json"
*     },
*     {
*       "name": "epure",
*       "title": "Style epure",
*       "current": true,
*       "url": "https://wxs.ign.fr/static/vectorTiles/styles/PLAN.IGN/essentiels/epure.json"
*     },
*     {
*       "name": "sans_toponymes",
*       "title": "Style sans toponymes",
*       "current": false,
*       "url": "https://wxs.ign.fr/static/vectorTiles/styles/PLAN.IGN/essentiels/sans_toponymes.json"
*     }
*   ],
*   "globalConstraint": {
*     "crs": null,
*     "bbox": {
*       "left": -724011.531917197,
*       "right": 1095801.237496279,
*       "top": 6672646.821182753,
*       "bottom": 5009377.0856973175
*     },
*     "minScaleDenominator": null,
*     "maxScaleDenominator": null
*   },
*   "quicklookUrl": "https://wxs.ign.fr/static/pictures/ign_carte2.jpg",
*   "layerId": "PLAN.IGN$GEOPORTAIL:GPP:TMS",
*   "defaultProjection": "EPSG:3857"
* }
*
*/
declare var LayerMapBox: ol.layer.GeoportalMapBox;
//# sourceMappingURL=LayerMapBox.d.ts.map