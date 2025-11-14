export default Catalog;
/**
 * - Liste des options du widget Catalog
 */
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
     * - Affiche les miniatures des couches si disponibles.
     */
    layerThumbnail?: boolean | undefined;
    /**
     * - Taille de la fenêtre : sm, md, lg ou xl.
     */
    size?: string | undefined;
    /**
     * - Options de recherche.
     */
    search?: {
        /**
         * - Affiche le champ de recherche.
         */
        display?: boolean | undefined;
        /**
         * - Label du champ de recherche.
         */
        label?: string | undefined;
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
    categories?: Categories[] | undefined;
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
    /**
     * - Type d'optimisation pour l'affichage des listes de couches : "none", "clusterize" (experimental) ou "on-demand".
     */
    optimisation?: string | undefined;
};
/**
 * - Catégories principales du catalogue sous forme d'onglets
 */
export type Categories = {
    /**
     * - Titre de la catégorie.
     */
    title: string;
    /**
     * - Identifiant unique de la catégorie.
     */
    id: string;
    /**
     * - Indique si c'est la catégorie par défaut.
     */
    default: boolean;
    /**
     * - **Experimental** Clusterisation de la liste des couches.
     */
    cluster?: boolean | undefined;
    /**
     * - Options de la librairie Clusterize.
     */
    clusterOptions: any | null;
    /**
     * - Affiche une barre de recherche spécifique à la catégorie.
     */
    search?: boolean | undefined;
    /**
     * - Liste des sous-catégories.
     */
    items?: SubCategories[] | undefined;
    /**
     * - Filtre appliqué à la catégorie.
     */
    filter: any | null;
    /**
     * - Champ utilisé pour le filtre.
     */
    field: string;
    /**
     * - Valeur ou liste de valeurs pour le filtre.
     */
    value: string | Array<string>;
};
/**
 * - Sous-catégories du catalogue sous forme de boutons radio
 * avec ou sans sections. Une section, c'est un regroupement thématique des couches.
 * ex. : regrouper les couches par "thématique" (voir propriété "thematic" dans la conf. des couches)
 */
export type SubCategories = {
    /**
     * - Titre de la sous-catégorie.
     */
    title: string;
    /**
     * - Identifiant unique de la sous-catégorie.
     */
    id: string;
    /**
     * - Indique si la sous-catégorie utilise des sections.
     */
    section: boolean;
    /**
     * - **TODO** Indique si les sections sont repliables.
     */
    collapsible?: boolean | undefined;
    /**
     * - Indique que l'on souhaite un icone de type dsfr classe pour les sections de la sous-catégorie.
     */
    icon?: boolean | undefined;
    /**
     * - Liste d'icones (json) pour les sections de la sous-catégorie.
     */
    iconJson?: any[] | undefined;
    /**
     * - Liste des sections (remplie ultérieurement).
     */
    sections: Array<string>;
    /**
     * - Indique si c'est la sous-catégorie par défaut.
     */
    default: boolean;
    /**
     * - **Experimental** Clusterisation de la liste des couches.
     */
    cluster?: boolean | undefined;
    /**
     * - Options de la librairie Clusterize.
     */
    clusterOptions: any | null;
    /**
     * - Filtre appliqué à la sous-catégorie.
     */
    filter: any | null;
    /**
     * - Champ utilisé pour le filtre.
     */
    field: string;
    /**
     * - Valeur ou liste de valeurs pour le filtre.
     */
    value: string | Array<string>;
};
/**
 * - Configuration des sources de données
 * * {@link schema | https://raw.githubusercontent.com/IGNF/geoportal-configuration/new-url/doc/schema.json}
 * * {@link jsdoc | https://raw.githubusercontent.com/IGNF/geoportal-configuration/new-url/doc/schema.jsdoc}
 */
export type Config = any;
/**
 * - Configuration d'une couche
 * * {@link schema | https://raw.githubusercontent.com/IGNF/geoportal-configuration/new-url/doc/schema.json}
 * * {@link jsdoc | https://raw.githubusercontent.com/IGNF/geoportal-configuration/new-url/doc/schema.jsdoc}
 */
export type ConfigLayer = any;
/**
 * @typedef {Object} CatalogOptions - Liste des options du widget Catalog
 * @property {boolean} [collapsed=true] - Définit si le widget est replié au chargement.
 * @property {boolean} [draggable=false] - Permet de déplacer le panneau du catalogue.
 * @property {boolean} [auto=true] - Active l’ajout automatique des événements sur la carte.
 * @property {string} [titlePrimary="Gérer vos couches de données"] - Titre principal du panneau.
 * @property {string} [titleSecondary=""] - Titre secondaire du panneau.
 * @property {string} [layerLabel="title"] - Propriété utilisée comme label pour les couches.
 * @property {Boolean} [layerThumbnail=false] - Affiche les miniatures des couches si disponibles.
 * @property {string} [size="md"] - Taille de la fenêtre : sm, md, lg ou xl.
 * @property {Object} [search] - Options de recherche.
 * @property {boolean} [search.display=true] - Affiche le champ de recherche.
 * @property {string} [search.label="Rechercher une donnée"] - Label du champ de recherche.
 * @property {Array<string>} [search.criteria=["name","title","description"]] - Critères de recherche.
 * @property {boolean} [addToMap=true] - Ajoute automatiquement la couche à la carte lors de la sélection.
 * @property {Array<Categories>} [categories] - Liste des catégories et sous-catégories.
 * @property {Object} [configuration] - Configuration des sources de données.
 * @property {string} [configuration.type="json"] - Type de configuration ("json" ou "service").
 * @property {Array<string>} [configuration.urls] - URLs des fichiers de configuration JSON.
 * @property {Object} [configuration.data] - Données de configuration déjà chargées.
 * @property {string} [id] - Identifiant unique du widget.
 * @property {string} [position] - Position CSS du widget sur la carte.
 * @property {boolean} [gutter] - Ajoute ou retire l’espace autour du panneau.
 * @property {string} [optimisation="none"] - Type d'optimisation pour l'affichage des listes de couches : "none", "clusterize" (experimental) ou "on-demand".
 */
/**
 * @typedef {Object} Categories - Catégories principales du catalogue sous forme d'onglets
 * @property {string} title - Titre de la catégorie.
 * @property {string} id - Identifiant unique de la catégorie.
 * @property {boolean} default - Indique si c'est la catégorie par défaut.
 * @property {boolean} [cluster=false] - **Experimental** Clusterisation de la liste des couches.
 * @property {Object|null} clusterOptions - Options de la librairie Clusterize.
 * @property {boolean} [search=false] - Affiche une barre de recherche spécifique à la catégorie.
 * @property {Array<SubCategories>} [items] - Liste des sous-catégories.
 * @property {Object|null} filter - Filtre appliqué à la catégorie.
 * @property {string} filter.field - Champ utilisé pour le filtre.
 * @property {string|Array<string>} filter.value - Valeur ou liste de valeurs pour le filtre.
 */
/**
 * @typedef {Object} SubCategories - Sous-catégories du catalogue sous forme de boutons radio
 * avec ou sans sections. Une section, c'est un regroupement thématique des couches.
 * ex. : regrouper les couches par "thématique" (voir propriété "thematic" dans la conf. des couches)
 * @property {string} title - Titre de la sous-catégorie.
 * @property {string} id - Identifiant unique de la sous-catégorie.
 * @property {boolean} section - Indique si la sous-catégorie utilise des sections.
 * @property {boolean} [collapsible] - **TODO** Indique si les sections sont repliables.
 * @property {boolean} [icon] - Indique que l'on souhaite un icone de type dsfr classe pour les sections de la sous-catégorie.
 * @property {Array<Object>} [iconJson] - Liste d'icones (json) pour les sections de la sous-catégorie.
 * @property {Array<string>} sections - Liste des sections (remplie ultérieurement).
 * @property {boolean} default - Indique si c'est la sous-catégorie par défaut.
 * @property {boolean} [cluster=false] - **Experimental** Clusterisation de la liste des couches.
 * @property {Object|null} clusterOptions - Options de la librairie Clusterize.
 * @property {Object|null} filter - Filtre appliqué à la sous-catégorie.
 * @property {string} filter.field - Champ utilisé pour le filtre.
 * @property {string|Array<string>} filter.value - Valeur ou liste de valeurs pour le filtre.
 */
/**
 * @typedef {Object} Config - Configuration des sources de données
 * * {@link schema | https://raw.githubusercontent.com/IGNF/geoportal-configuration/new-url/doc/schema.json}
 * * {@link jsdoc | https://raw.githubusercontent.com/IGNF/geoportal-configuration/new-url/doc/schema.jsdoc}
 */
/**
 * @typedef {Object} ConfigLayer - Configuration d'une couche
 * * {@link schema | https://raw.githubusercontent.com/IGNF/geoportal-configuration/new-url/doc/schema.json}
 * * {@link jsdoc | https://raw.githubusercontent.com/IGNF/geoportal-configuration/new-url/doc/schema.jsdoc}
 * @description
 * Un objet de type ConfigLayer est un objet qui contient la configuration d'une couche.
 * Il est issu de la configuration globale (Config) et enrichi de propriétés supplémentaires
 * pour le bon fonctionnement du catalogue.
 * ex. : service, categories, producer_urls, thematic_urls, etc.
 * Les types de services supportés sont : WMTS, WMS, WFS, TMS.
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
     * * {@link schema | https://raw.githubusercontent.com/IGNF/geoportal-configuration/new-url/doc/schema.json}
     * * {@link jsdoc | https://raw.githubusercontent.com/IGNF/geoportal-configuration/new-url/doc/schema.jsdoc}
     * @example
     * var widget = new ol.control.Catalog({
     *           collapsed : true,
     *           draggable : false,
     *           titlePrimary : "",
     *           titleSecondary : "Gérer vos couches de données",
     *           layerLabel : "title",
     *           layerThumbnail : true,
     *           search : {
     *               display : true,
     *               label : "Rechercher une donnée",
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
     *                   search : false,
     *                   filter : null
     *                   // sous categories
     *                   // items : [
     *                   //     {
     *                   //         title : "",
     *                   //         default : true,
     *                   //         section : true, // avec section (ex. regroupement par themes)
     *                   //         icon : true, // icone pour les sections (svg ou lien http ou dsfr classe)
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
    configData: any;
    /**
     * Overwrite OpenLayers setMap method
     * This method sets the map for the Catalog control.
     * It initializes event listeners for the map and sets up the control's draggable and collapsed states.
     * It also checks for existing layers on the map and updates the control accordingly.
     *
     * @param {Map} map - Map instance to set for the control.
     */
    setMap(map: Map): void;
    /**
     * Returns true if widget is collapsed (minimized), false otherwise
     *
     * @returns {Boolean} collapsed - true if widget is collapsed
     */
    getCollapsed(): boolean;
    /**
     * Collapse or display widget main container
     *
     * @param {Boolean} collapsed - True to collapse widget, False to display it
     */
    setCollapsed(collapsed: boolean): void;
    collapsed: boolean | undefined;
    /**
     * Add a layer config
     * This method processes a configuration object containing layer definitions.
     *
     * @param {Config} conf conf
     */
    addLayerConfig(conf: Config): void;
    /**
     * Activate a layer by its ID
     * This method activates a layer based on its ID, which is expected to be in the format "name$service".
     * It splits the ID to extract the layer name and service, then calls the `activeLayer` method.
     *
     * @param {*} id - Layer ID in the format "name$service".
     * @example
     * activeLayerByID("GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2$WMTS");
     * activeLayerByID("PLAN.IGN$GEOPORTAIL:TMS");
     */
    activeLayerByID(id: any): void;
    /**
     * Disable a layer by its ID
     * This method disables a layer based on its ID, which is expected to be in the format "name$service".
     * It splits the ID to extract the layer name and service, then calls the `disableLayer` method.
     * @param {*} id - Layer ID in the format "name$service".
     * @example
     * disableLayerByID("GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2$WMTS");
     * disableLayerByID("PLAN.IGN$GEOPORTAIL:TMS");
     * @todo
     * - ajouter un test pour vérifier si l'ID est valide
     * - ajouter un test pour vérifier si la couche est déjà active
     * - ajouter un test pour vérifier si la couche est déjà désactivée
     */
    disableLayerByID(id: any): void;
    /**
     * Activate a layer
     * This method activates a layer by its name and service.
     * It checks if the layer exists in the `layersList` and if it does, it adds the layer to the map if `addToMap` is true.
     * It then dispatches an event indicating that the layer has been added to the catalog.
     * @param {String} name - Layer name.
     * @param {String} service - Layer service.
     * @example
     * activeLayer("GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2", "WMTS");
     * activeLayer("PLAN.IGN", "GEOPORTAIL:TMS");
     */
    activeLayer(name: string, service: string): void;
    /**
     * Disable a layer
     * This method disables a layer by its name and service.
     * It checks if the layer exists in the `layersList` and if it does, it removes the layer from the map if `addToMap` is true.
     * It then dispatches an event indicating that the layer has been removed from the catalog.
     * @param {String} name - Layer name.
     * @param {String} service - Layer service.
     * @example
     * disableLayer("GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2", "WMTS");
     * disableLayer("PLAN.IGN", "GEOPORTAIL:TMS");
     */
    disableLayer(name: string, service: string): void;
    /**
     * Get long layer ID
     *
     * @param {*} name - nom de la couche
     * @param {*} service - service de la couche
     * @return {String|null} - long layer ID or null if not found
     * @description
     * This method retrieves the long layer ID based on the provided name and service.
     * It searches through the `layersList` object for a key that matches the pattern of "name.*service".
     * If a match is found, it returns the key; otherwise, it returns null.
     * @example
     * getLayerId("GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2", "WMTS");
     * getLayerId("PLAN.IGN", "GEOPORTAIL:TMS");
     */
    getLayerId(name: any, service: any): string | null;
    /**
     * Get layers by category
     * This method filters the layers based on the provided category.
     * It checks if the category has a filter defined and applies it to the layers.
     * If the filter matches, the layer is added to the `layersCategorised` object.
     * It also updates the `categories` property of each layer to include the category ID.
     *
     * @param {*} category - Category object containing the filter.
     * @param {*} layers - Object containing all layers.
     * @return {Object} - Filtered layers categorized by the provided category.
     */
    getLayersByCategory(category: any, layers: any): any;
    /**
     * Get container
     *
     * @returns {HTMLElement} container
     */
    getContainer(): HTMLElement;
    /**
     * Initialize Catalog control (called by Catalog constructor)
     *
     * @param {Object} options - constructor options
     * @private
     */
    private initialize;
    /** @private */
    private uid;
    clusterOptions: {
        rows_in_block: number;
        blocks_in_cluster: number;
    } | undefined;
    options: {
        collapsed: boolean;
        draggable: boolean;
        auto: boolean;
        titlePrimary: string;
        titleSecondary: string;
        layerLabel: string;
        layerThumbnail: boolean;
        optimisation: string;
        size: string;
        search: {
            display: boolean;
            label: string;
            criteria: string[];
        };
        addToMap: boolean;
        categories: {
            title: string;
            id: string;
            cluster: boolean;
            clusterOptions: {
                rows_in_block: number;
                blocks_in_cluster: number;
            };
            default: boolean;
            filter: null;
        }[];
        configuration: {
            type: string;
            urls: string[];
        };
    } | undefined;
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
     * @type {Array<Object>}
     */
    layersList: any[] | undefined;
    /**
     * specify clusterize instances for each category/subcategory/section
     * @type {Object}
     * @example
     * {
     *    "data" : Clusterize, // category id + instance
     *    "454587412" : Clusterize, // subcategory id + instance
     *    "457121205" : Clusterize, // subcategory id + instance
     * }
     */
    clusterizeRef: any;
    /**
     * specify clusterize sections for each category/subcategory
     * @type {Object}
     * @example
     * {
     *    548487533 : { // subcategory id
     *       "section-accordion-548487533-72432" : [rows], // section id + rows
     *       "section-accordion-548487533-78155" : [rows]  // section id + rows
     *    }
     * }
     */
    clusterizeSections: any;
    /**
     * specify data on demand instances for each category/subcategory/section
     * @type {Object}
     * @example
     * {
     *    base : fragmentDocument, // category id + fragmentDocument
     *    457121205 : fragmentDocument, // subcategory id + fragmentDocument
     *    548487533 : {
     *      "section-accordion-548487533-72432" : fragmentDocument, // section id + fragmentDocument
     *      "section-accordion-548487533-78155" : fragmentDocument  // section id + fragmentDocument
     * }
     */
    dataOnDemand: any;
    /**
     * specify all categories
     * @type {Array<Categories}
     * @example
     * [
     *     {
     *        title : "Données",   // title of the category
     *        id : "data",         // id of the category
     *        default : true,      // if true, this category is selected by default
     *        search : false,      // if true, a search bar is displayed for this category
     *        cluster : false,     // if true, clustering is activated for this category
     *        filter : null,       // filter to apply on the category
     *        items : [            // list of subcategories
     *            {
     *               title : "Toutes les données", // title of the subcategory
     *               id : "all",                   // id of the subcategory
     *               default : true,               // if true, this subcategory is selected by default
     *               icon : true,                  // icon for the subcategory (svg or http link or dsfr class)
     *               iconJson : [],                // list of icons (json) for the sections
     *               cluster : false,              // if true, clustering is activated for this subcategory
     *               section : false,              // if true, this subcategory has a section
     *               sections : [],                // list of sections (filled later)
     *               filter : null,                // filter to apply on the subcategory
     *            }
     *        ]
     *     }
     * ]
     */
    categories: Categories[] | undefined;
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
    /** @private */
    private _searchTimeout;
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
     * Check layers already present on the map
     * This method checks the layers already present on the map
     * and marks them as checked in the catalog.
     * @private
     */
    private checkLayersOnMap;
    /**
     * Initialize layers list and other properties
     * This method initializes the layers list from the configuration data.
     * It can load data from a local object or fetch it from URLs.
     * It processes the layers to add additional properties such as `service`, `categories`, and URLs for producers and thematics.
     * It also creates the catalog content entries based on the layers.
     *
     * @returns {Promise} - promise
     * @private
     */
    private initConfigData;
    /**
     * Check configuration layers
     * This method checks the configuration of layers to ensure they have valid service parameters.
     * It also adds additional properties to each layer, such as `service`, `categories`, and URLs for producers and thematics.
     * It cleans the list of layers by removing those without valid configuration and adds a default thumbnail if enabled and not present.
     *
     * @param {Array<ConfigLayer>} layers - list of layers
     * @private
     */
    private checkConfigLayers;
    /**
     * Create DOM content categories and entries
     * @param {Config} data - data
     * @private
     */
    private createCatalogContentEntries;
    /**
     * Create links information to the catalog for thematic
     * @param {*} value - ...
     * @private
     * @returns {Array<Object>} fiche d'information
     * @todo récuperer l'url du service du catalogue selon l'environnement !
     * @example
     * // pour les thématiques
     * createCatalogThematicLinks(["Agriculture", "Transports", "Autres"]);
     * // OUTPUT
     * [
     *   {
     *     name : "Agriculture",
     *     url : "https://cartes.gouv.fr/catalogue/search?topic=farming"
     *   }
     * ]
     * @see [mapping - https://raw.githubusercontent.com/IGNF/cartes.gouv.fr-entree-carto/main/public/data/topics.json]
     */
    private createCatalogThematicLinks;
    /**
     * Create links information to the catalog for producer
     * @param {*} value - ...
     * @private
     * @returns {Array<Object>} fiche d'information
     * @todo récuperer l'url du service du catalogue selon l'environnement !
     * @example
     * // pour les producteurs
     * createCatalogProducerLinks(["IGN", "IGNF", "Autres"]);
     *
     * // OUTPUT
     * [
     *   {
     *      name : "IGN",
     *      url : "https://cartes.gouv.fr/catalogue/search?organization=IGN"
     *   }
     * ]
     * @see [mapping - https://raw.githubusercontent.com/IGNF/cartes.gouv.fr-entree-carto/main/public/data/topics.json]
     */
    private createCatalogProducerLinks;
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
     * @param {*} name - ...
     * @param {*} service  - ...
     * @param {*} hidden  - ...
     * @private
     */
    private updateVisibilityFilteredLayers;
    /**
     * Update DOM sections visibility if no layers are visible
     *
     * @private
     */
    private updateVisibilityFilteredSections;
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
     * @param {String} categoryId - ...
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
     * @param {Event} e - ...
     * @private
     */
    private onToggleCatalogMoreLearnClick;
    /**
     * ...
     * @param {Event} e - ...
     * @param {String} categoryId - ...
     * @param {String} sectionId - ...
     * @private
     */
    private onToggleCatalogSectionClick;
    /**
     * ...
     * @param {Event} e - ...
     * @param {String} categoryId - ...
     * @private
     */
    private onToggleCatalogRadioChange;
    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    private onSearchGlobalCatalogButtonClick;
    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    private onSearchGlobalCatalogInputChange;
    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    private onSearchGlobalCatalogButtonResetClick;
    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    private onSearchSpecificCatalogButtonClick;
    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    private onSearchSpecificCatalogInputChange;
    onSearchSpecificCatalogButtonResetClick(e: any): void;
}
import Control from "../Control";
import Map from "ol/Map";
//# sourceMappingURL=Catalog.d.ts.map