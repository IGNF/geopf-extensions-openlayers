export default Catalog;
/**
 * @classdesc
 *
 * Catalog Data
 *
 * @constructor
 * @alias ol.control.Catalog
 * @type {ol.control.Catalog}
 * @extends {ol.control.Control}
 * @param {Object} options - options for function call.
 *
 * @fires catalog:loaded
 * @fires catalog:layer:add
 * @fires catalog:layer:remove
 * @see schema : https://raw.githubusercontent.com/IGNF/geoportal-configuration/new-url/doc/schema.json
 * @see jsdoc : https://raw.githubusercontent.com/IGNF/geoportal-configuration/new-url/doc/schema.jsdoc
 * @example
 * var widget = new ol.control.Catalog({
 *           collapsed : true,
 *           draggable : false,
 *           titlePrimary : "",
 *           titleSecondary : "Gérer vos couches de données",
 *           layerLabel : "title",
 *           layerFilter : [],
 *           search : {
 *               display : true,
 *               criteria : [
 *                   "name",
 *                   "title",
 *                   "description"
 *               ]
 *           },
 *           addToMap : true,
 *           categories : [
 *               {
 *                   title : "Données",
 *                   id : "data",
 *                   default : true,
 *                   filter : null
 *                   // sous categories
 *                   // items : [
 *                   //     {
 *                   //         title : "",
 *                   //         default : true,
 *                   //         filter : {
 *                   //             field : "",
 *                   //             value : ""
 *                   //         }
 *                   //     }
 *                   // ]
 *               }
 *           ],
 *           configuration : {
 *               type : "json", // type:"service"
 *               urls : [ // data:{}
 *                   "https://raw.githubusercontent.com/IGNF/cartes.gouv.fr-entree-carto/main/public/data/layers.json",
 *                   "https://raw.githubusercontent.com/IGNF/cartes.gouv.fr-entree-carto/main/public/data/edito.json"
 *               ]
 *           }
 * });
 * widget.on("catalog:loaded", (e) => { console.log(e.data); });
 * widget.on("catalog:layer:add", (e) => { console.log(e); });
 * widget.on("catalog:layer:remove", (e) => { console.log(e); });
 * map.addControl(widget);
 *
 * @todo filtrage des couches
 * @todo type:service
 * @todo validation du schema
 */
declare var Catalog: ol.control.Catalog;
//# sourceMappingURL=Catalog.d.ts.map