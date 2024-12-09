export default LayerSwitcher;
/**
 * @classdesc
 * OpenLayers Control to manage map layers : their order, visibility and opacity, and display their informations (title, description, legends, metadata...)
 *
 * @constructor
 * @extends {ol.control.Control}
 * @alias ol.control.LayerSwitcher
 * @type {ol.control.LayerSwitcher}
 * @param {Object} options - control options
 * @param {Array} [options.layers] - list of layers to be configured. Each array element is an object, with following properties :
 * @param {ol.layer.Layer} [options.layers.layer] - ol.layer.Layer layer to be configured (that has been added to map)
 * @param {Object} [options.layers.config] - custom configuration object for layer information (title, description, legends, metadata, quicklook url), with following properties :
 * @param {String} [options.layers.config.title] - layer alias, to be displayed in widget layer list. E.g. : "Cartes IGN"
 * @param {String} [options.layers.config.description] - layer description, to be displayed on title hover, or in layer information panel.
 * @param {String} [options.layers.config.quicklookUrl] - link to a quick look image for this layer.
 * @param {Array} [options.layers.config.legends] - array of layer legends. Each array element is an object, with following properties :
 *      - url (String, mandatory) : link to a legend
 *      - minScaleDenominator (Number, optional) : min scale denominator for legend validity.
 * @param {Array} [options.layers.config.metadata] - array of layer metadata. Each array element is an object, with property url (String, mandatory) : link to a metadata
 * @param {Object} [options.options] - ol.control.Control options (see {@link http://openlayers.org/en/latest/apidoc/ol.control.Control.html ol.control.Control})
 * @param {Number} [options.options.id] - Ability to add an identifier on the widget (advanced option)
 * @param {Boolean} [options.options.collapsed = true] - Specify if widget has to be collapsed (true) or not (false) on map loading. Default is true.
 * @param {Boolean} [options.options.panel = false] - Specify if widget has to have a panel header. Default is false.
 * @param {Boolean} [options.options.counter = false] - Specify if widget has to have a counter. Default is false.
 * @fires layerswitcher:add
 * @fires layerswitcher:remove
 * @fires layerswitcher:extent
 * @fires layerswitcher:change:opacity
 * @fires layerswitcher:change:visibility
 * @fires layerswitcher:change:position
 * @example
 * map.addControl(new ol.control.LayerSwitcher(
 *  [
 *      {
 *          layer : wms1,
 *          config : {
 *              title : "test layer name 1",
 *              description : "test layer desc 1",
 *          }
 *      }
 *  ],
 *  {
 *      collapsed : true,
 *      panel : false,
 *      counter : false,
 *      position : "top-left"
 *  }
 * ));
 *
 * LayerSwitcher.on("layerswitcher:add", function (e) {
 *    console.warn("layer", e.layer);
 * });
 * LayerSwitcher.on("layerswitcher:remove", function (e) {
 *    console.warn("layer", e.layer);
 * });
 * LayerSwitcher.on("layerswitcher:change:opacity", function (e) {
 *    console.warn("layer", e.layer, e.opacity);
 * });
 * LayerSwitcher.on("layerswitcher:change:visibility", function (e) {
 *    console.warn("layer", e.layer, e.visibility);
 * });
 * LayerSwitcher.on("layerswitcher:change:position", function (e) {
 *    console.warn("layer", e.layer, e.position);
 * });
 */
declare var LayerSwitcher: ol.control.LayerSwitcher;
//# sourceMappingURL=LayerSwitcher.d.ts.map