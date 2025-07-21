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
 * @see [schema - https://raw.githubusercontent.com/IGNF/geoportal-configuration/new-url/doc/schema.json]
 * @see [jsdoc - https://raw.githubusercontent.com/IGNF/geoportal-configuration/new-url/doc/schema.jsdoc]
 * @example
 * var widget = new ol.control.Catalog({
 *           collapsed : true,
 *           draggable : false,
 *           titlePrimary : "",
 *           titleSecondary : "Gérer vos couches de données",
 *           layerLabel : "title",
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
 *               type : "json",
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
 * @todo validation du schema
 */
declare class Catalog {
    /**
     * See {@link ol.control.Catalog}
     * @module Catalog
     * @alias module:~controls/Catalog
     * @param {Object} [options] - options
     * @example
     * import Catalog from "gpf-ext-ol/controls/Catalog"
     * ou
     * import { Catalog } from "gpf-ext-ol"
     *
     * var widget = new Catalog({
     *           collapsed : true,
     *           draggable : false,
     *           titlePrimary : "",
     *           titleSecondary : "Gérer vos couches de données",
     *           layerLabel : "title",
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
     */
    constructor(options?: Object);
    /**
     * Nom de la classe (heritage)
     * @private
     */
    private CLASSNAME;
    container: DOMElement;
    element: any;
    /**
     * Overwrite OpenLayers setMap method
     *
     * @param {ol.Map} map - Map.
     */
    setMap(map: ol.Map): void;
    /**
     * Add a layer config
     * @param {*} conf conf
     */
    addLayerConfig(conf: any): void;
    activeLayerByID(id: any): void;
    disableLayerByID(id: any): void;
    activeLayer(name: any, service: any): void;
    disableLayer(name: any, service: any): void;
    /**
     * Get container
     *
     * @returns {DOMElement} container
     */
    getContainer(): DOMElement;
    /**
     * Get long layer ID
     * @param {*} name  nom de la couche
     * @param {*} service service de la couche
     * @returns {String} - long layer ID
     */
    getLayerId(name: any, service: any): string;
    /**
     * Initialize Catalog control (called by Catalog constructor)
     *
     * @param {Object} options - constructor options
     * @private
     */
    private initialize;
    uid: any;
    options: {
        collapsed: boolean;
        draggable: boolean;
        auto: boolean;
        titlePrimary: string;
        titleSecondary: string;
        layerLabel: string;
        search: {
            display: boolean;
            criteria: string[];
        };
        addToMap: boolean;
        categories: {
            title: string;
            id: string;
            default: boolean;
            filter: null;
        }[];
        configuration: {
            type: string;
            urls: string[];
        };
    } | undefined;
    /**
     * specify if control is collapsed (true) or not (false)
     * @type {Boolean}
     */
    collapsed: boolean | undefined;
    /**
     * specify if control is draggable (true) or not (false)
     * @type {Boolean}
     */
    draggable: boolean | undefined;
    /**
     * specify if control add some stuff auto
     * @type {Boolean}
     */
    auto: boolean | undefined;
    /**
     * specify some events listeners
     * @type {Array}
     */
    eventsListeners: any[] | undefined;
    buttonCatalogShow: any;
    panelCatalogContainer: any;
    panelCatalogHeaderContainer: any;
    buttonCatalogClose: any;
    contentCatalogContainer: any;
    waitingContainer: any;
    /**
     * specify all list of layers (configuration service)
     * @type {Object}
     * @see [schema](https://raw.githubusercontent.com/IGNF/geoportal-configuration/new-url/doc/schema.json)
     * @see [jsdoc](https://raw.githubusercontent.com/IGNF/geoportal-configuration/new-url/doc/schema.jsdoc)
     */
    layersList: Object | undefined;
    /**
     * specify all categories
     * @type {Array}
     */
    categories: any[] | undefined;
    /**
     * specify the current category selected
     * @type {String}
     */
    categoryId: string | undefined;
    /**
     * list of layers added on map by key pair : name/service
     * @type {Object}
     * @example
     * {
     *    "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2:WMTS" : ol/layer/Tile,
     *    "PLAN.IGN$GEOPORTAIL:TMS" : ol/layer/VectorTile
     * }
     */
    layersListOnMap: Object | undefined;
    /**
     * Create control main container (DOM initialize)
     *
     * @returns {DOMElement} DOM element
     * @private
     */
    private initContainer;
    /**
     * ...
     * @private
     */
    private initMapLayers;
    /**
     * Configuration loading
     *
     * @returns {Promise} - promise
     * @private
     */
    private initLayersList;
    /**
     * Create DOM content categories and entries
     * @param {*} layers couches
     */
    createCatalogContentEntries(layers: any): void;
    /**
     * Get information in the catalog
     * @param {*} key type de catégorisation 'producer' ou 'thematic'
     * @param {*} value tableau de couches
     * @private
     * @returns {Object} fiche d'information
     * @todo récuperer l'url du service du catalogue selon l'environnement !
     * @example
     * // OUTPUT ?
     */
    private getInformationsCatalog;
    /**
     * Add events listeners on map (called by setMap)
     *
     * @param {*} map - map
     * @private
     */
    private addEventsListeners;
    /**
     * Remove events listeners on map (called by setMap)
     * @private
     */
    private removeEventsListeners;
    /**
     * Add layer on map
     *
     * @param {*} name - layer name
     * @param {*} service - layer service
     * @returns {Object} - layer config
     * @private
     */
    private addLayer;
    /**
     * Remove Layer on map
     *
     * @param {*} name - layer name
     * @param {*} service - layer service
     * @returns {Object} - layer config
     * @private
     */
    private removeLayer;
    hideWaiting(): void;
    showWaiting(): void;
    /**
     * Reset filtered layers
     * @private
     */
    private resetFilteredLayersList;
    /**
     * Set filtered layers
     *
     * @param {*} value - value
     * @private
     */
    private setFilteredLayersList;
    /**
     * Update DOM layer visibility
     *
     * @param {*} id - ...
     * @param {*} service  - ...
     * @param {*} hidden  - ...
     * @private
     */
    private updateVisibilityFilteredLayersDOM;
    /**
     * Update DOM sections visibility if no layers are visible
     *
     * @todo cacher les section si elles sont vides
     * @private
     */
    private updateVisibilitySectionsDOM;
    /**
     * ...
     * @param {*} e - ...
     * @private
     */
    private onShowCatalogClick;
    /**
     * ...
     * @param {*} e - ...
     * @private
     */
    private onCloseCatalogClick;
    /**
     * ...
     * @param {*} e - ...
     * @private
     */
    private onSelectCatalogTabClick;
    /**
     * ...
     * @param {*} e - ...
     * @private
     */
    private onSelectCatalogEntryClick;
    /**
     *
     * @private
     */
    private onSearchCatalogButtonClick;
    /**
     *
     * @private
     */
    private onSearchCatalogInputChange;
}
//# sourceMappingURL=Catalog.d.ts.map