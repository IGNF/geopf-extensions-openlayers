export default Catalog;
export type CatalogOptions = {
    /**
     * - Définit si le widget est replié au chargement.
     */
    collapsed?: boolean | undefined;
    /**
     * - Permet de déplacer le panneau du catalogue.
     */
    draggable?: boolean | undefined;
    /**
     * - Active l’ajout automatique des événements sur la carte.
     */
    auto?: boolean | undefined;
    /**
     * - Titre principal du panneau.
     */
    titlePrimary?: string | undefined;
    /**
     * - Titre secondaire du panneau.
     */
    titleSecondary?: string | undefined;
    /**
     * - Propriété utilisée comme label pour les couches.
     */
    layerLabel?: string | undefined;
    /**
     * - Options de recherche.
     */
    search?: {
        /**
         * - Affiche le champ de recherche.
         */
        display?: boolean | undefined;
        /**
         * - Critères de recherche.
         */
        criteria?: string[] | undefined;
    } | undefined;
    /**
     * - Ajoute automatiquement la couche à la carte lors de la sélection.
     */
    addToMap?: boolean | undefined;
    /**
     * - Liste des catégories et sous-catégories.
     */
    categories?: any[] | undefined;
    /**
     * - Configuration des sources de données.
     */
    configuration?: {
        /**
         * - Type de configuration ("json" ou "service").
         */
        type?: string | undefined;
        /**
         * - URLs des fichiers de configuration JSON.
         */
        urls?: string[] | undefined;
        /**
         * - Données de configuration déjà chargées.
         */
        data?: any;
    } | undefined;
    /**
     * - Identifiant unique du widget.
     */
    id?: string | undefined;
    /**
     * - Position CSS du widget sur la carte.
     */
    position?: string | undefined;
    /**
     * - Ajoute ou retire l’espace autour du panneau.
     */
    gutter?: boolean | undefined;
};
/**
 * @typedef {Object} CatalogOptions
 * @property {boolean} [collapsed=true] - Définit si le widget est replié au chargement.
 * @property {boolean} [draggable=false] - Permet de déplacer le panneau du catalogue.
 * @property {boolean} [auto=true] - Active l’ajout automatique des événements sur la carte.
 * @property {string} [titlePrimary="Gérer vos couches de données"] - Titre principal du panneau.
 * @property {string} [titleSecondary=""] - Titre secondaire du panneau.
 * @property {string} [layerLabel="title"] - Propriété utilisée comme label pour les couches.
 * @property {Object} [search] - Options de recherche.
 * @property {boolean} [search.display=true] - Affiche le champ de recherche.
 * @property {Array<string>} [search.criteria=["name","title","description"]] - Critères de recherche.
 * @property {boolean} [addToMap=true] - Ajoute automatiquement la couche à la carte lors de la sélection.
 * @property {Array<Object>} [categories] - Liste des catégories et sous-catégories.
 * @property {Object} [configuration] - Configuration des sources de données.
 * @property {string} [configuration.type="json"] - Type de configuration ("json" ou "service").
 * @property {Array<string>} [configuration.urls] - URLs des fichiers de configuration JSON.
 * @property {Object} [configuration.data] - Données de configuration déjà chargées.
 * @property {string} [id] - Identifiant unique du widget.
 * @property {string} [position] - Position CSS du widget sur la carte.
 * @property {boolean} [gutter] - Ajoute ou retire l’espace autour du panneau.
 */
/**
 * @classdesc
 *
 * Catalog Data
 *
 * @alias ol.control.Catalog
 * @module Catalog
*/
declare class Catalog extends Control {
    /**
     * @constructor
     * @param {CatalogOptions} options - options for function call.
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
     * @todo validation du schema
     */
    constructor(options: CatalogOptions);
    /**
     * Nom de la classe (heritage)
     * @private
     */
    private CLASSNAME;
    container: HTMLElement;
    /**
     * Overwrite OpenLayers setMap method
     *
     * @param {Map} map - Map.
     */
    setMap(map: Map): void;
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
     * @returns {HTMLElement} container
     */
    getContainer(): HTMLElement;
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
    /** @private */
    private uid;
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
    /** @private */
    private buttonCatalogShow;
    /** @private */
    private panelCatalogContainer;
    /** @private */
    private panelCatalogHeaderContainer;
    /** @private */
    private buttonCatalogClose;
    /** @private */
    private contentCatalogContainer;
    /** @private */
    private waitingContainer;
    /**
     * specify all list of layers (configuration service)
     * @type {Object}
     * @see [schema](https://raw.githubusercontent.com/IGNF/geoportal-configuration/new-url/doc/schema.json)
     * @see [jsdoc](https://raw.githubusercontent.com/IGNF/geoportal-configuration/new-url/doc/schema.jsdoc)
     */
    layersList: any;
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
    layersListOnMap: any;
    /**
     * event triggered when layer is added
     *
     * @event catalog:layer:add
     * @defaultValue "catalog:layer:add"
     * @group Events
     * @property {Object} type - event
     * @property {String} name - layer name
     * @property {String} service - service name
     * @property {Object} layer - layer conf
     * @property {Object} target - instance Catalog
     * @example
     * Catalog.on("catalog:layer:add", function (e) {
     *   console.log(e.layer);
     * })
     */
    ADD_CATALOG_LAYER_EVENT: string | undefined;
    /**
     * event triggered when layer is removed
     *
     * @event catalog:layer:remove
     * @defaultValue "catalog:layer:remove"
     * @group Events
     * @property {Object} type - event
     * @property {String} name - layer name
     * @property {String} service - service name
     * @property {Object} layer - layer conf
     * @property {Object} target - instance Catalog
     * @example
     * Catalog.on("catalog:layer:remove", function (e) {
     *   console.log(e.layer);
     * })
     */
    REMOVE_CATALOG_LAYER_EVENT: string | undefined;
    /**
     * event triggered when data is loaded
     *
     * @event catalog:loaded
     * @defaultValue "catalog:loaded"
     * @group Events
     * @property {Object} type - event
     * @property {Object} data - data
     * @property {Object} target - instance Catalog
     * @example
     * Catalog.on("catalog:loaded", function (e) {
     *   console.log(e.data);
     * })
     */
    LOADED_CATALOG_EVENT: string | undefined;
    /**
     * Create control main container (DOM initialize)
     *
     * @returns {HTMLElement} DOM element
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
     * @param {Map} map - map
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
     * @param {Event} e - ...
     * @private
     */
    private onShowCatalogClick;
    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    private onCloseCatalogClick;
    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    private onSelectCatalogTabClick;
    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    private onSelectCatalogEntryClick;
    /**
     * ...
     * @private
     */
    private onSearchCatalogButtonClick;
    /**
     * ...
     * @private
     */
    private onSearchCatalogInputChange;
}
import Control from "../Control";
import Map from "ol/Map";
//# sourceMappingURL=Catalog.d.ts.map