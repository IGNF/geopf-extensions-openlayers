// import CSS
import "../../CSS/Controls/Catalog/GPFcatalog.css";

// import OpenLayers
import Widget from "../Widget";
import Control from "../Control";
import Map from "ol/Map";

// import local
import Utils from "../../Utils/Helper";
import SelectorID from "../../Utils/SelectorID";
import Logger from "../../Utils/LoggerByDefault";
import Draggable from "../../Utils/Draggable";
import Config from "../../Utils/Config";
import LayerConfig from "../../Utils/LayerConfigUtils";

// import local des layers
import GeoportalWFS from "../../Layers/LayerWFS";
import GeoportalWMS from "../../Layers/LayerWMS";
import GeoportalWMTS from "../../Layers/LayerWMTS";
import GeoportalMapBox from "../../Layers/LayerMapBox";

// DOM
import CatalogDOM from "./CatalogDOM";

// Gestion des topics en local : themes et services et producteurs
import Topics from "./topics.json";

// import externe
import { marked as Marked } from "marked";

import Clusterize from "clusterize.js";
const Test = Clusterize.default;

var logger = Logger.getLogger("widget");

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
 */

/**
 * @typedef {Object} Categories - Catégories principales du catalogue sous forme d'onglets
 * @property {string} title - Titre de la catégorie.
 * @property {string} id - Identifiant unique de la catégorie.
 * @property {boolean} default - Indique si c'est la catégorie par défaut.
 * @property {boolean} [cluster=false] - Clusterisation de la liste des couches.
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
 * @property {boolean} [cluster=false] - Clusterisation de la liste des couches.
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
class Catalog extends Control {
    
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
    constructor (options) {
        options = options || {};

        // call ol.control.Control constructor
        super(options);

        if (!(this instanceof Catalog)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        /**
         * Nom de la classe (heritage)
         * @private
         */
        this.CLASSNAME = "Catalog";

        // initialisation du composant
        this.initialize(options);

        // Widget main DOM container
        this.container = this.initContainer();

        // ajout du container
        (this.element) ? this.element.appendChild(this.container) : this.element = this.container;

        // INFO
        // le DOM est mis en place sans la liste des couches du catalogue
        // car l'opération peut être async si un download est demandé.
        // une patience permet d'attendre que la liste soit récupérée.
        this.showWaiting();
        this.initConfigData()
            .then((data) => {
                logger.trace(this, data);
                this.hideWaiting();
                // sauvegarde de la configuration
                this.configData = data;
                /**
                 * event triggered when data is loaded
                 */
                this.dispatchEvent({
                    type : this.LOADED_CATALOG_EVENT,
                    data : data
                });
            })
            .catch((e) => {
                this.hideWaiting();
                // TODO gestion des erreurs
                logger.error(e);
            });

        return this;
    }

    /**
     * Overwrite OpenLayers setMap method
     * This method sets the map for the Catalog control.
     * It initializes event listeners for the map and sets up the control's draggable and collapsed states.
     * It also checks for existing layers on the map and updates the control accordingly.
     * 
     * @param {Map} map - Map instance to set for the control.
     */
    setMap (map) {
        if (map) {
            // INFO
            // on verifie les couches déjà présentes sur la cartes
            this.on("catalog:loaded", this.checkLayersOnMap);

            // mode "draggable"
            if (this.draggable) {
                Draggable.dragElement(
                    this.panelCatalogContainer,
                    this.panelCatalogHeaderContainer,
                    map.getTargetElement()
                );
            }

            // mode "collapsed"
            if (!this.collapsed) {
                this.buttonCatalogShow.setAttribute("aria-pressed", true);
            }

            // ajout des evenements sur la carte
            if (this.auto) {
                this.addEventsListeners(map);
            }
        } else {
            this.un("catalog:loaded", this.checkLayersOnMap);
            // suppression des evenements sur la carte
            // pour les futurs suppressions de couche
            if (this.auto) {
                this.removeEventsListeners();
            }
        }

        // on appelle la méthode setMap originale d'OpenLayers
        super.setMap(map);

        // position
        if (this.options.position) {
            this.setPosition(this.options.position);
        }

        // reunion du bouton avec le précédent
        if (this.options.gutter === false) {
            this.getContainer().classList.add("gpf-button-no-gutter");
        }
    }

    /**
     * Returns true if widget is collapsed (minimized), false otherwise
     *
     * @returns {Boolean} collapsed - true if widget is collapsed
     */
    getCollapsed () {
        return this.collapsed;
    }

    /**
     * Collapse or display widget main container
     *
     * @param {Boolean} collapsed - True to collapse widget, False to display it
     */
    setCollapsed (collapsed) {
        if (collapsed === undefined) {
            logger.error("[ERROR] Catalog:setCollapsed - missing collapsed parameter");
            return;
        }
        if ((collapsed && this.collapsed) || (!collapsed && !this.collapsed)) {
            return;
        }
        if (collapsed) {
            this.buttonCatalogClose.click();
        } else {
            this.buttonCatalogShow.click();
        }
        this.collapsed = collapsed;
    }

    // ################################################################### //
    // ##################### public methods ############################## //
    // ################################################################### //

    /**
     * Add a layer config
     * This method processes a configuration object containing layer definitions.
     * 
     * @param {Config} conf conf
     */
    addLayerConfig (conf) {
        for (const key in conf) {
            if (Object.prototype.hasOwnProperty.call(conf, key)) {
                const layer = conf[key];
                if (layer.serviceParams) {
                    // si la couche a bien une configuration valide liée au service
                    var service = layer.serviceParams.id.split(":").slice(-1)[0]; // beurk!
                    layer.service = service; // new proprerty !
                    layer.categories = []; // new property ! vide pour le moment
                    layer.producer_urls = this.createCatalogLinks("producer", layer.producer); // plus d'info
                    layer.thematic_urls = this.createCatalogLinks("thematic", layer.thematic); // plus d'info
                    this.layersList[key] = layer;
                }
            }
        }
        // clean container
        var element = document.getElementById("GPcatalogContainerTabs");
        if (element) {
            element.remove();
        }
        // on reordonne la liste
        this.layersList.sort((a, b) => a.title.localeCompare(b.title, "fr", { sensitivity : "base" }));
        // on va recréer le container
        this.createCatalogContentEntries(this.layersList);
    }

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
    activeLayerByID (id) {
        var name = id.split("$")[0];
        var service = id.split(":").slice(-1)[0];
        this.activeLayer(name, service);
    }

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
    disableLayerByID (id) {
        var name = id.split("$")[0];
        var service = id.split(":").slice(-1)[0];
        this.disableLayer(name, service);
    }

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
    activeLayer (name, service) {
        // cf. this.onSelectCatalogEntryClick
        var id = this.getLayerId(name, service);
        if (id) {
            var layer = {}; // conf tech
            if (this.options.addToMap) {
                layer = this.addLayer(name, service);
            }
            this.dispatchEvent({
                type : this.ADD_CATALOG_LAYER_EVENT,
                name : name,
                service : service,
                layer : layer
            });
        }
    }

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
    disableLayer (name, service) {
        var id = this.getLayerId(name, service);
        if (id) {
            var layer = {}; // conf tech
            if (this.options.addToMap) {
                layer = this.removeLayer(name, service);
            }
            this.dispatchEvent({
                type : this.REMOVE_CATALOG_LAYER_EVENT,
                name : name,
                service : service,
                layer : layer
            });
        }
    }

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
    getLayerId (name, service) {
        if (!this.layersList || typeof this.layersList !== "object") {
            return null;
        }

        var regex = new RegExp(name + ".*" + service);
        for (const key in this.layersList) {
            if (Object.prototype.hasOwnProperty.call(this.layersList, key)) {
                if (regex.test(key)) {
                    return key;
                }
            }
        }

        return null;
    }

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
    getLayersByCategory (category, layers) {
        // INFO
        // comment gerer les listes de layers filtrées pour chaque categorie ?
        // on doit les stocker si l'on souhaite faire des requêtes
        // avec l'outil de recherche par la suite
        var layersCategorised = layers;
        var filter = category.filter;
        if (filter) {
            layersCategorised = {};
            for (const key in layers) {
                if (Object.prototype.hasOwnProperty.call(layers, key)) {
                    const layer = layers[key];
                    if (layer[filter.field]) { // FIXME impl. clef multiple : property.property !
                        var condition = Array.isArray(filter.value) ? filter.value.includes(layer[filter.field].toString()) : (filter.value === "*" || layer[filter.field].toString() === filter.value);
                        if (condition) {
                            layersCategorised[key] = layer;
                            // on ajoute l'appartenance de la couche à une categorie
                            this.layersList[key].categories.push(category.id);
                        }
                    }
                }
            }
        }

        return layersCategorised;
    }

    // ################################################################### //
    // ################### getters / setters ############################# //
    // ################################################################### //

    /**
     * Get container
     *
     * @returns {HTMLElement} container
     */
    getContainer () {
        return this.container;
    }

    // ################################################################### //
    // #################### privates methods ############################# //
    // ################################################################### //

    /**
     * Initialize Catalog control (called by Catalog constructor)
     *
     * @param {Object} options - constructor options
     * @private
     */
    initialize (options) {
        /** @private */
        this.uid = options.id || SelectorID.generate();

        // set default options
        this.clusterOptions = {
            rows_in_block : 50,
            blocks_in_cluster : 4
        };
        this.options = {
            collapsed : true,
            draggable : false,
            auto : true,
            titlePrimary : "Gérer vos couches de données",
            titleSecondary : "",
            layerLabel : "title",
            layerThumbnail : false,
            size : "md",
            search : {
                display : true, // barre de recherche globale
                label : "Rechercher une donnée",
                criteria : [
                    "name",
                    "title",
                    "description"
                ]
            },
            addToMap : true,
            categories : [
                {
                    // INFO
                    // categories : sous forme d'un onglet par categorie
                    title : "Données",
                    id : "data",
                    cluster : true,
                    clusterOptions : this.clusterOptions,
                    default : true,
                    filter : null
                    // INFO
                    // subcategories : sous forme d'un bouton radio par sous categoris
                    // items : [
                    //     {
                    //         title : "",
                    //         default : true,
                    //         cluster : false,
                    //         section : true, // avec section (ex. regroupement par themes)
                    //         icon : true, // icone pour les sections (svg ou lien http ou dsfr classe)  
                    //         filter : {
                    //             field : "thematic",
                    //             value : ""
                    //         }
                    //     }
                    //     {
                    //         title : "Toutes les données",
                    //         default : false,
                    //         section : false, // sans section
                    //         cluster : false,
                    //         filter : null // sans filtre, on prend toutes les données
                    //     }
                    // ]
                }
            ],
            configuration : {
                type : "json", // TODO type:"service"
                urls : [ // data:{}
                    // ex.
                    // "https://raw.githubusercontent.com/IGNF/cartes.gouv.fr-entree-carto/main/public/data/layers.json",
                    // "https://raw.githubusercontent.com/IGNF/cartes.gouv.fr-entree-carto/main/public/data/edito.json",
                    "https://raw.githubusercontent.com/IGNF/geoportal-configuration/new-url/dist/entreeCarto.json"
                ]
            }
        };

        // merge with user optionssearch
        var searchOptions = Utils.assign(this.options.search, options.search);
        Utils.assign(this.options, options);
        Utils.assign(this.options.search, searchOptions);

        /**
         * specify if control is collapsed (true) or not (false)
         * @type {Boolean}
         */
        this.collapsed = this.options.collapsed;

        /**
         * specify if control is draggable (true) or not (false)
         * @type {Boolean}
         */
        this.draggable = this.options.draggable;

        /**
         * specify if control add some stuff auto
         * @type {Boolean}
         */
        this.auto = this.options.auto;

        /**
         * specify some events listeners
         * @type {Array}
         */
        this.eventsListeners = [];

        // DOM
        /** @private */
        this.buttonCatalogShow = null;
        /** @private */
        this.panelCatalogContainer = null;
        /** @private */
        this.panelCatalogHeaderContainer = null; // usefull for the dragNdrop
        /** @private */
        this.buttonCatalogClose = null;
        /** @private */
        this.contentCatalogContainer = null;
        /** @private */
        this.waitingContainer = null;

        /**
         * specify configuration data (configuration service)
         */
        this.configData = {};

        /**
         * specify all list of layers (configuration service)
         * @type {Array<Object>}
         */
        this.layersList = {};

        this.clusterize = {};
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
        this.categories = this.options.categories.map((cat) => {
            // INFO
            // on reecrit correctement les categories
            // ex. properties mal renseignées tels que id ou default
            var items = cat.items;
            if (cat.items) {
                items = cat.items.map((i) => {
                    var cluster = i.hasOwnProperty("cluster") ? i.cluster : false;
                    // INFO
                    // on desactive le clustering si on a des sections
                    if (i.hasOwnProperty("section") && i.section) {
                        cluster = false;
                    }
                    return {
                        title : i.title,
                        id : i.id || this.generateID(i.title),
                        section : i.hasOwnProperty("section") ? i.section : false,
                        sections : [], // liste des valeurs des sections remplie ulterieurement !
                        icon : i.hasOwnProperty("icon") ? i.icon : false,
                        iconJson : i.iconJson || [], // liste des icones (json) pour les sections
                        default : i.hasOwnProperty("default") ? i.default : false,
                        cluster : cluster,
                        clusterOptions : i.hasOwnProperty("clusterOptions") ? i.clusterOptions : this.clusterOptions,
                        filter : i.filter || null,
                    };
                });
            }
            return {
                title : cat.title,
                id : cat.id || this.generateID(cat.title),
                default : cat.hasOwnProperty("default") ? cat.default : false,
                search : cat.hasOwnProperty("search") ? cat.search : false,
                cluster : cat.hasOwnProperty("cluster") ? cat.cluster : false,
                clusterOptions : cat.hasOwnProperty("clusterOptions") ? cat.clusterOptions : this.clusterOptions,
                filter : cat.filter || null,
                items : items || null
            };
        });

        /**
         * specify the current category selected
         * @type {String}
         */
        this.categoryId = (() => {
            // INFO
            // par défaut, la categorie affichée sera la 1ere
            // sauf si on a specifié une categorie avec l'attribut 'default:true'
            var index = this.categories.findIndex((category) => category.default);
            if (index === -1) {
                index = 0;
                this.categories[index].default = true;
            }
            return this.categories[index].id;
        })();

        /**
         * list of layers added on map by key pair : name/service
         * @type {Object}
         * @example
         * {
         *    "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2:WMTS" : ol/layer/Tile,
         *    "PLAN.IGN$GEOPORTAIL:TMS" : ol/layer/VectorTile
         * }
         */
        this.layersListOnMap = {};

        /** @private */
        this._searchTimeout = null; // timeout for search input

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
        this.ADD_CATALOG_LAYER_EVENT = "catalog:layer:add";
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
        this.REMOVE_CATALOG_LAYER_EVENT = "catalog:layer:remove";
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
        this.LOADED_CATALOG_EVENT = "catalog:loaded";
    }

    /**
     * Create control main container (DOM initialize)
     *
     * @returns {HTMLElement} DOM element
     * @private
     */
    initContainer () {
        // create main container
        var container = this._createMainContainerElement();

        var picto = this.buttonCatalogShow = this._createShowCatalogPictoElement();
        container.appendChild(picto);

        // panel
        var widgetPanel = this.panelCatalogContainer = this._createCatalogPanelElement();
        var widgetPanelSize = this._createCatalogPanelDivSizeElement(this.options.size);
        widgetPanel.appendChild(widgetPanelSize);
        var widgetPanelDiv = this._createCatalogPanelDivElement();
        widgetPanelSize.appendChild(widgetPanelDiv);

        // header
        var widgetPanelHeader = this.panelCatalogHeaderContainer = this._createCatalogPanelHeaderElement();
        // icone
        var widgetPanelIcon = this._createCatalogPanelIconElement(this.options.titlePrimary);
        widgetPanelHeader.appendChild(widgetPanelIcon);
        // title
        var widgetPanelTitle = this._createCatalogPanelTitleElement(this.options.titlePrimary);
        widgetPanelHeader.appendChild(widgetPanelTitle);
        // close picto
        var widgetCloseBtn = this.buttonCatalogClose = this._createCatalogPanelCloseElement();
        widgetPanelHeader.appendChild(widgetCloseBtn);
        widgetPanelDiv.appendChild(widgetPanelHeader);

        var widgetContentDiv = this._createCatalogPanelContentDivElement();

        // container for the custom dynamic code (cf. initConfigData())
        var widgetContentElementDiv = this.contentCatalogContainer = this._createCatalogContentDivElement();
        widgetContentElementDiv.appendChild(this._createCatalogContentTitleElement(this.options.titleSecondary));
        // search bar (global)
        if (this.options.search.display) {
            widgetContentElementDiv.appendChild(this._createCatalogContentSearchGlobalElement(this.options.search.label));
        }
        // waiting
        var waiting = this.waitingContainer = this._createCatalogWaitingElement();
        widgetContentElementDiv.appendChild(waiting);

        widgetContentDiv.appendChild(widgetContentElementDiv);
        widgetPanelDiv.appendChild(widgetContentDiv);

        container.appendChild(widgetPanel);


        return container;
    }

    /**
     * Check layers already present on the map
     * This method checks the layers already present on the map
     * and marks them as checked in the catalog.
     * @private
     */
    checkLayersOnMap () {
        var map = this.getMap();
        if (!map) {
            return;
        }
        var layers = map.getLayers();
        layers.forEach((layer) => {
            if (layer.name && layer.service) {
                // sauvegarde
                this.layersListOnMap[layer.name + ":" + layer.service] = layer;
                // cocher la case dans le catalogue
                var inputs = document.querySelectorAll(`input[data-layer="${layer.name}:${layer.service}"]`);
                if (inputs) {
                    inputs.forEach((input) => {
                        input.checked = true;
                    });
                }
            }
        });
    }

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
    async initConfigData () {
        var data = null; // reponse brute du service

        if (this.options.configuration.data) {
            data = this.options.configuration.data || {};

            if (Config.isConfigLoaded()) {
                Utils.mergeParams(data, Config.configuration);
            }

            // contrôle des couches
            this.checkConfigLayers(data.layers);

            // sauvegarde des couches de données
            this.layersList = data.layers;

            this.createCatalogContentEntries(data);
            return new Promise((resolve, reject) => {
                resolve(data);
            });
        }

        if (this.options.configuration.urls) {
            var fetchUrls = [];
            for (let i = 0; i < this.options.configuration.urls.length; i++) {
                const url = this.options.configuration.urls[i];
                const fetchUrl = function () {
                    return fetch(url, {})
                        .then(function (response) {
                            if (response.ok) {
                                return response.json()
                                    .then(function (json) {
                                        return json;
                                    })
                                    .catch(error => {
                                        logger.warn("fetch json exception :", error);
                                    });
                            } else {
                                var err = new Error("HTTP status code: " + response.status);
                                throw err;
                            }
                        })
                        .catch(error => {
                            return new Promise((resolve, reject) => {
                                logger.error("fetch json exception :", error);
                                reject(error);
                            });
                        });
                };
                fetchUrls.push(fetchUrl());
            }

            try {
                const values = await Promise.all(fetchUrls);

                data = values[0];
                for (let i = 1; i < values.length; i++) {
                    const value = values[i];
                    Utils.mergeParams(data, value);
                }

                if (Config.isConfigLoaded()) {
                    Utils.mergeParams(data, Config.configuration);
                }

                // contrôle des couches
                this.checkConfigLayers(data.layers);

                // sauvegarde de la liste des couches
                this.layersList = data.layers;

                this.createCatalogContentEntries(data);
                return await new Promise((resolve, reject) => {
                    resolve(data);
                });
            } catch (e) {
                return await new Promise((resolve, reject) => {
                    reject(e);
                });
            }
        }
    }

    /**
     * Check configuration layers
     * This method checks the configuration of layers to ensure they have valid service parameters.
     * It also adds additional properties to each layer, such as `service`, `categories`, and URLs for producers and thematics.
     * It cleans the list of layers by removing those without valid configuration and adds a default thumbnail if enabled and not present.
     * 
     * @param {Array<ConfigLayer>} layers - list of layers
     * @private
     */
    checkConfigLayers (layers) {
        // INFO
        // on en profite pour ajouter des properties :
        // - service : utile pour identifier la couche
        // de manière unique : name + service
        // - categories : utile pour definir l'appartenance d'une couche
        // à une ou plusieurs categories
        // on en profite aussi pour nettoyer la liste
        // des couches qui n'ont pas de configuration valide
        // cf. serviceParams obligatoire
        // on en profite aussi pour ajouter une vignette par défaut
        // si la couche n'en a pas et que l'option est activée
        for (const key in layers) {
            if (Object.prototype.hasOwnProperty.call(layers, key)) {
                const layer = layers[key];
                if (layer.serviceParams) {
                    // TEST
                    const isHTML = (str) => {
                        const doc = document.createElement("div");
                        doc.innerHTML = str.trim();
                        // Si le premier enfant est un élément HTML, c'est du HTML
                        return doc.childNodes.length > 0 && doc.firstChild.nodeType === 1;
                    };

                    if (isHTML(layer.description)) {
                        logger.error(`layer description contains HTML code, which is not allowed. Layer: ${key}`);
                        logger.error("Please use Markdown syntax for layer descriptions instead.");
                        logger.error(layer.description);
                        delete layers[key];
                        continue;
                    }
                    // si la couche a bien une configuration valide liée au service
                    var service = layer.serviceParams.id.split(":").slice(-1)[0]; // beurk!
                    layer.service = service; // new proprerty !
                    layer.categories = []; // new property ! vide pour le moment
                    layer.producer_urls = this.createCatalogProducerLinks(layer.producer); // plus d'info
                    layer.thematic_urls = this.createCatalogThematicLinks(layer.thematic); // plus d'info
                    // label de la couche
                    layer.label = (this.options.layerLabel) ? (layer[this.options.layerLabel] || layer.title) : layer.title;
                    // INFO
                    // On transforme le markdown en HTML
                    // et on nettoie le HTML pour éviter les injections XSS
                    // cf. https://marked.js.org/
                    // Le markdown ne doit pas être échappé pour realiser une transformation !
                    layer.description = Marked.parse(layer.description);
                    // les vignettes !
                    if (this.options.layerThumbnail) {
                        // si on souhaite afficher une vignette
                        // et que la couche n'en a pas
                        // on met une vignette par défaut
                        if (!layer.thumbnail) {
                            layer.thumbnail = "default";
                        }
                    } else {
                        // sinon pas de vignette
                        if (layer.thumbnail) {
                            // FIXME 
                            // suppression !?
                            delete layer.thumbnail;
                        }
                    }
                } else {
                    // sinon on supprime l'entrée car pas de configuration valide
                    delete layers[key];
                }
            }
        }
    }

    /**
     * Create DOM content categories and entries
     * @param {Config} data - data
     * @private
     */
    createCatalogContentEntries (data) {
        var container = this.contentCatalogContainer;

        var widgetContentEntryTabs = this._createCatalogContentCategoriesTabs(this.categories);
        container.appendChild(widgetContentEntryTabs);

        // INFO 
        // Remise à plat des catégories / sous-categories sur le même niveau
        // pour simplifier la gestion des couches
        // et la création des onglets de contenu
        // on a autant de catégories / sous-catégories que de containers
        // dans le DOM, on ne peut pas faire autrement
        // on va donc créer un tableau de catégories / sous-catégories
        // qui contiendra toutes les couches
        // et on va créer le contenu de chaque catégorie / sous-catégorie
        // dans le DOM, dans l'ordre des catégories / sous-catégories
        var categories = [];
        this.categories.forEach((category) => {
            if (category.items) {
                for (let i = 0; i < category.items.length; i++) {
                    const element = category.items[i];
                    // INFO
                    // on recherche la liste des icones pour les sections
                    // si l'élément est une section et qu'il n'a pas d'icones
                    // on va chercher les icones dans les données
                    // en fonction du filtre de la section
                    // ex. filter.field = "thematic"
                    // on va chercher toutes les valeurs de "thematic"
                    // dans les couches
                    if (element.icon && element.iconJson.length === 0 && element.section && element.filter) {
                        const tag = element.filter.field;
                        // recherche si on a un mapping des topics
                        if (data.topics && data.topics[tag]) {
                            // dans la configuration avec un tag 'topics' (ex. edisto.json)
                            element.iconJson = data.topics[tag];
                        } else if (data[tag]) {
                            // dans la configuration avec directement la cléf
                            element.iconJson = data[tag];
                        } else if (Topics[tag]) {
                            // dans le fichier de mapping local
                            element.iconJson = Topics[tag];
                        } else {
                            // pas d'icones
                            element.iconJson = [];
                        }
                    }
                    element.subcategory = true; // new property !
                    categories.push(element);
                }
            } else {
                categories.push(category);
            }
        });
        // Crée uniquement le contenu de la catégorie active
        var activeIndex = categories.findIndex(cat => cat.id === this.categoryId);
        if (activeIndex === -1) {
            activeIndex = 0;
        }
        // INFO
        // les containers de contenu sont definis à partir
        // de l'ordre des catégories / sous-categories
        // il y'a autant de catégories / sous-categories que de containers
        var contents = container.querySelectorAll(".tabcontent");
        for (let i = 0; i < contents.length; i++) {
            const content = contents[i];
            if (i === activeIndex) {
                // TODO
                // on peut faire un lazy-load des autres catégories
                // pour ne pas charger toutes les couches d'un coup
                // on affiche le contenu de la catégorie active
                // et on charge les autres au fur et à mesure
            }
            var layersCategorised = this.getLayersByCategory(categories[i], data.layers);
            this._createCatalogContentCategoryTabContent(categories[i], layersCategorised)
                .then((data) => {
                    // Utilisation d'un DocumentFragment pour optimiser l'insertion DOM
                    const fragment = document.createDocumentFragment();
                    // TEST 
                    // par blocks (categories / sous-categories avec sections)
                    // mais à priori pas d'intérêt car trop de DOM à gérer
                    if (data.blocks && false) {
                        for (let j = 0; j < data.blocks.length; j++) {
                            const element = data.blocks[j];
                            fragment.appendChild(element.dom);
                            content.appendChild(fragment);
                            console.log(`Content for category ${categories[i].title} with type ${element.type} / value ${element.value}.`);
                            if (categories[i].cluster) {
                                this.clusterize[element.id] = new Clusterize({
                                    scrollId : content.parentElement.id,
                                    contentId : (element.type === "layer") ? content.children[0].id : content.children[0].id.replace("sections", "accordion"),
                                    rows_in_block : categories[i].clusterOptions.rows_in_block,
                                    blocks_in_cluster : categories[i].clusterOptions.blocks_in_cluster,
                                    callbacks : {
                                        clusterChanged : () => {
                                            logger.trace("cluster changed");
                                            this.updateListenersLayersDOM();
                                        }
                                    }
                                });             
                            }
                        }
                    }

                    if (data.dom && true) {
                        fragment.appendChild(data.dom);
                        content.appendChild(fragment);
                        console.log(`Content for category ${categories[i].title} created.`);
                        if (categories[i].cluster) {
                            this.clusterize[categories[i].id] = new Clusterize({
                                scrollId : content.parentElement.id,
                                contentId : content.children[0].id,
                                rows_in_block : categories[i].clusterOptions.rows_in_block,
                                blocks_in_cluster : categories[i].clusterOptions.blocks_in_cluster,
                                callbacks : {
                                    clusterChanged : () => {
                                        logger.trace("cluster changed");
                                        this._updateListenersLayersDOM(content, categories[i].id);
                                        this.checkLayersOnMap();
                                    }
                                }
                            });
                        } else {
                            this._updateListenersLayersDOM(content, categories[i].id);
                            this.checkLayersOnMap();
                        }
                    }
                });
        }
    }

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
    createCatalogThematicLinks (value) {
        if (!value) {
            return null;
        }
        var url = "https://cartes.gouv.fr/catalogue/search?";
        var data = [];
        // INFO
        // - comment recuperer la fiche si pas renseigné dans metadata_urls ?
        // ex. https://cartes.gouv.fr/catalogue/dataset/IGNF_PLAN-IGN
        // > la conf nous fournit une liste via le champ 'metada_urls'
        
        // - comment faire le lien entre les noms pour obtenir les données du theme ?
        // ex. pour Agriculture, l'url est https://cartes.gouv.fr/catalogue/search?topic=farming
        // pour les thématiques, un mapping est nécessaire entre le nom et l'id
        // > un fichier de mapping est disponible
        for (let j = 0; j < value.length; j++) {
            const element = value[j];
            if (element === "Autres") {
                continue;
            }
            var mapping = Topics.thematic.find((o) => o.name === element);
            if (mapping) {
                data.push({
                    name : element,
                    url : url + "topic=" + mapping.id
                });
            }
        }
        if (data.length === 0) {
            data = null;
        }
        return data;
    }

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
    createCatalogProducerLinks (value) {
        if (!value) {
            return null;
        }
        var url = "https://cartes.gouv.fr/catalogue/search?";
        var data = [];
        // INFO
        // - comment recuperer la fiche si pas renseigné dans metadata_urls ?
        // ex. https://cartes.gouv.fr/catalogue/dataset/IGNF_PLAN-IGN
        // > la conf nous fournit une liste via le champ 'metada_urls'
        
        // - comment avoir l'info sur le producteur à partir de la liste des acronymes ?
        // ex. https://cartes.gouv.fr/catalogue/search?organization=IGN
        // > la conf nous fournit une liste via le champ 'producer'
        for (let i = 0; i < value.length; i++) {
            const element = value[i];
            if (element === "Autres") {
                continue;
            }
            data.push({
                name : element,
                url : url + "organization=" + element
            });
        }
        if (data.length === 0) {
            data = null;
        }
        return data;
    }

    // ################################################################### //
    // ######################## methods on listeners ##################### //
    // ################################################################### //

    /**
     * Add events listeners on map (called by setMap)
     *
     * @param {Map} map - map
     * @private
     */
    addEventsListeners (map) {
        var self = this;
        this.eventsListeners["map:add"] = function (e) {
            logger.trace(e);
            var name = e.element.name;
            var service = e.element.service;
            // sauvegarde
            self.layersListOnMap[name + ":" + service] = e.element;
            // cocher la case dans le catalogue
            var inputs = document.querySelectorAll(`input[data-layer="${name}:${service}"]`);
            if (inputs) {
                inputs.forEach((input) => {
                    input.checked = true;
                });
            }
        };
        // the event custom:action is associate with an openlayers event
        map.getLayers().on("add", this.eventsListeners["map:add"]);

        this.eventsListeners["map:remove"] = function (e) {
            logger.trace(e);
            var name = e.element.name;
            var service = e.element.service;
            // sauvegarde
            delete self.layersListOnMap[name + ":" + service];
            // decocher la case dans le catalogue
            var inputs = document.querySelectorAll(`input[data-layer="${name}:${service}"]`);
            if (inputs) {
                inputs.forEach((input) => {
                    input.checked = false;
                });
            }
        };
        // the event custom:action is associate with an openlayers event
        map.getLayers().on("remove", this.eventsListeners["map:remove"]);
    }

    /**
     * Remove events listeners on map (called by setMap)
     * @private
     */
    removeEventsListeners () {
        var map = this.getMap();
        map.getLayers().un("add", this.eventsListeners["map:add"]);
        delete this.eventsListeners["map:add"];
        map.getLayers().un("remove", this.eventsListeners["map:remove"]);
        delete this.eventsListeners["map:remove"];
    }

    // ################################################################### //
    // ######################## methods on map ########################### //
    // ################################################################### //

    /**
     * Add layer on map
     *
     * @param {*} name - layer name
     * @param {*} service - layer service
     * @returns {Object} - layer config
     * @private
     */
    addLayer (name, service) {
        var layerConf = null;
        var layer = null;
        var id = this.getLayerId(name, service);
        if (!id) {
            return;
        }
        var c = (!Config.isConfigLoaded()) ? LayerConfig.getLayerConfig(this.layersList[id]) : null;
        switch (service) {
            case "WMS":
                layer = new GeoportalWMS({
                    layer : name,
                    configuration : c
                });
                break;
            case "WMTS":
                layer = new GeoportalWMTS({
                    layer : name,
                    configuration : c
                });
                break;
            case "TMS":
                layer = new GeoportalMapBox({
                    layer : name,
                    configuration : c
                },{
                    declutter : true
                });
                break;
            case "WFS":
                layer = new GeoportalWFS({
                    layer : name,
                    configuration : c
                });
                break;
            default:
                break;
        }

        if (layer) {
            var map = this.getMap();
            map.addLayer(layer);
            // sauvegarde
            this.layersListOnMap[name + ":" + service] = layer;
            // layer configuration
            layerConf = layer.getConfiguration();
        }

        return layerConf;
    }

    /**
     * Remove Layer on map
     *
     * @param {*} name - layer name
     * @param {*} service - layer service
     * @returns {Object} - layer config
     * @private
     */
    removeLayer (name, service) {
        var layerConf = null;
        var layer = this.layersListOnMap[name + ":" + service];
        if (layer) {
            // layer configuration
            layerConf = layer.getConfiguration();
            var map = this.getMap();
            map.removeLayer(layer);
            // sauvegarde
            delete this.layersListOnMap[name + ":" + service];
        }

        return layerConf;
    }

    // ################################################################### //
    // ######################## methods waiting ########################## //
    // ################################################################### //

    hideWaiting () {
        // /* GPwaitingContainer */
        // /* gpf-waiting */
        this.waitingContainer.className = "GPwaitingContainerHidden  gpf-waiting--hidden";
    }

    showWaiting () {
        this.waitingContainer.className = "GPwaitingContainerVisible gpf-waiting--visible";
    }

    // ################################################################### //
    // ######################## methods search ########################### //
    // ################################################################### //

    /**
     * Reset filtered layers
     * @private
     */
    resetFilteredLayersList () {
        // INFO
        // l'outil de recherche filtre les couches via un critère de recherche.
        // l'affichage des couches filtrées est realisé en cachant
        // les couches non conforme au critère.
        // le parametre pour masquer les couches : hidden
        for (const key in this.layersList) {
            if (Object.prototype.hasOwnProperty.call(this.layersList, key)) {
                const layer = this.layersList[key];
                layer.hidden = false;
                this.updateVisibilityFilteredLayersDOM(layer.name, layer.service, layer.hidden);
            }
        }
    }

    /**
     * Set filtered layers
     *
     * @param {*} value - value
     * @private
     */
    setFilteredLayersList (value) {
        // on rend invisible les couches qui ne respecte pas la valeur 
        // selon le critère de recherche
        var criteria = this.options.search.criteria;
        for (const key in this.layersList) {
            if (Object.prototype.hasOwnProperty.call(this.layersList, key)) {
                const layer = this.layersList[key];
                var words = "";
                for (let i = 0; i < criteria.length; i++) {
                    const c = criteria[i];
                    if (layer[c]) {
                        words += layer[c].toLowerCase();
                    }
                }
                layer.hidden = !words.includes(value.toLowerCase());
                if (!layer.hidden) {
                    logger.info(`Filtering layer ${layer.name} with words : ${words}`);
                }
                // on met à jour pour chaque couche la visibilité
                this.updateVisibilityFilteredLayersDOM(layer.name, layer.service, layer.hidden);
            }
        }
        // on rend invisible les sections qui ne possède plus de couches visibles
        this.updateVisibilityFilteredSectionsDOM();
    }

    /**
     * Update DOM layer visibility
     *
     * @param {*} id - ...
     * @param {*} service  - ...
     * @param {*} hidden  - ...
     * @private
     */
    updateVisibilityFilteredLayersDOM (id, service, hidden) {
        var categories = []; // remise à plat des catégories / sous-categories pour obtenir leur id
        this.categories.forEach((category) => {
            if (category.items) {
                for (let i = 0; i < category.items.length; i++) {
                    const element = category.items[i];
                    categories.push(element.id);
                }
            } else {
                categories.push(category.id);
            }
        });

        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            // on modifie la visibilité du container pour chaque couche
            var container = document.getElementById(`fieldset-${category}_${id}-${service}`);
            if (container) {
                if (hidden) {
                    container.classList.add("gpf-hidden");
                    container.classList.add("GPelementHidden");
                } else {
                    container.classList.remove("gpf-hidden");
                    container.classList.remove("GPelementHidden");
                    logger.info(`Layer ${id}:${service} visibility updated to hidden=${hidden} in category ${category} (${container.id}).`);
                }
            }
        }
    }

    /**
     * Update DOM sections visibility if no layers are visible
     *
     * @private
     */
    updateVisibilityFilteredSectionsDOM () {
        // il faut savoir si les couches d'une section sont toutes à hidden
        // si oui, on cache la section
        // si non, on met à jour le compteur des couches visibles

        // ID d'une section : section-${categoryId}-${id}
        // avec id = this.generateID(title) où title est le titre de la section
        // le title d'une section est disponible pour une category qui possède des sections

        // on compte le nombre de couches encore visible, 
        // si 0 alors la section est hidden : 
        // var count = [...data.matchAll(/"fr-fieldset__element"/g)].length;
        // avec data est la liste des couches (DOM)

        for (let i = 0; i < this.categories.length; i++) {
            const category = this.categories[i];
            if (category.items) {
                for (let j = 0; j < category.items.length; j++) {
                    const subcategory = category.items[j];
                    // sous categorie ayant des sections
                    if (subcategory.section) {
                        for (let k = 0; k < subcategory.sections.length; k++) {
                            const section = subcategory.sections[k];
                            var id = `section-${subcategory.id}-${this.generateID(section)}`;
                            var container = document.getElementById(id);
                            if (container) {
                                var data = container.innerHTML;
                                var count = [...data.matchAll(/"fr-fieldset__element"/g)].length;
                                var countDom = document.getElementById(`section-count-${subcategory.id}-${this.generateID(section)}`);
                                if (count === 0) {
                                    container.classList.add("gpf-hidden");
                                    container.classList.add("GPelementHidden");
                                } else {
                                    if (countDom) {
                                        countDom.textContent = count;
                                    }
                                    container.classList.remove("gpf-hidden");
                                    container.classList.remove("GPelementHidden");
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    // ################################################################### //
    // ######################## event dom ################################ //
    // ################################################################### //

    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    onShowCatalogClick (e) {
        var opened = e.target.ariaPressed;
        if (opened === "true") {
            this.onPanelOpen();
        }
        this.collapsed = !(opened === "true");
        this.dispatchEvent("change:collapsed");
        
        logger.trace(e);
    }

    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    onCloseCatalogClick (e) {
        logger.trace(e);
    }

    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    onSelectCatalogTabClick (e) {
        logger.trace(e);
        // sauvegarde de la categorie courrante pour la gestion de la recherche
        // de couches dans la liste associée à la categorie
        var id = e.target.id;
        var category = id.split("_")[1];
        this.categoryId = category;

        // TODO
        // on peut faire un lazy-load des autres catégories
        // pour ne pas charger toutes les couches d'un coup
        // on affiche le contenu de la catégorie active
        // et on charge les autres au fur et à mesure

        // on affiche la barre de recherche spécifique
        // si l'option search=true est activée pour la categorie courante
        // on recherche dans la liste des categories, la catégorie courante
        var o = this.categories.find(c => c.id === category);
        var searchSpecific = document.getElementById("catalog-container-search-specific");
        if (searchSpecific) {
            if (o && o.search) {
                searchSpecific.classList.remove("gpf-hidden");
                searchSpecific.classList.add("fr-tabs__panel--selected");
            } else {
                searchSpecific.classList.add("gpf-hidden");
                searchSpecific.classList.remove("fr-tabs__panel--selected");
            }
        }
        // INFO
        // on remet à zéro l'outil de recherche specifique
        // et on remet à zéro la liste des couches
        // pour afficher toutes les couches de la catégorie
        var inputSpecific = document.getElementById("catalog-input-search-specific");
        if (inputSpecific) {
            if (inputSpecific.value !== "") {
                inputSpecific.value = "";
                this.setFilteredLayersList("");
            }
        }
    }

    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    onSelectCatalogEntryClick (e) {
        logger.trace(e);
        // appel gestionnaire d'evenement pour traitement :
        // - ajout ou pas de la couche à la carte
        // - envoi d'un evenement avec la conf tech

        var ds = e.target.dataset.layer;
        var name = ds.substring(0, ds.lastIndexOf(":"));
        var service = ds.substring(ds.lastIndexOf(":") + 1);
        var layer = {}; // TODO fournir la conf tech

        if (e.target.checked) {
            if (this.options.addToMap) {
                layer = this.addLayer(name, service);
            }
            /**
             * event triggered when layer is added
             */
            this.dispatchEvent({
                type : this.ADD_CATALOG_LAYER_EVENT,
                name : name,
                service : service,
                layer : layer
            });
        } else {
            if (this.options.addToMap) {
                layer = this.removeLayer(name, service);
            }
            /**
             * event triggered when layer is removed
             */
            this.dispatchEvent({
                type : this.REMOVE_CATALOG_LAYER_EVENT,
                name : name,
                service : service,
                layer : layer
            });
        }
    }

    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    onToggleCatalogMoreLearnClick (e) {
        logger.trace(e);
    }

    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    onSearchGlobalCatalogButtonClick (e) {
        // INFO
        // la saisie du critère de recherche doit filtrer la liste des couches affichée
        // dans l'onglet courant.
        // on masque les entrées non conforme
        // - en ajoutant la classe 'gpf-hidden' dans le DOM
        // - en sauvegardant l'état avec la property 'hidden:true'
        var value = e.target.value;
        this.setFilteredLayersList(value);
    }

    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    onSearchGlobalCatalogInputChange (e) {
        clearTimeout(this._searchTimeout);
        this._searchTimeout = setTimeout(() => {
            this.onSearchGlobalCatalogButtonClick(e);
        }, 200); // 200ms de délai
    }

    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    onSearchGlobalCatalogButtonResetClick (e) {
        this.resetFilteredLayersList();
        this.updateVisibilityFilteredSectionsDOM();
    }

    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    onSearchSpecificCatalogButtonClick (e) {
        // INFO
        // la saisie du critère de recherche doit filtrer la liste des couches affichée
        // dans l'onglet courant.
        // on masque les entrées non conforme
        // - en ajoutant la classe 'gpf-hidden' dans le DOM
        // - en sauvegardant l'état avec la property 'hidden:true'
        var value = e.target.value;
        this.setFilteredLayersList(value);
    }

    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    onSearchSpecificCatalogInputChange (e) {
        clearTimeout(this._searchTimeout);
        this._searchTimeout = setTimeout(() => {
            this.onSearchSpecificCatalogButtonClick(e);
        }, 200); // 200ms de délai
    }

    onSearchSpecificCatalogButtonResetClick (e) {
        this.resetFilteredLayersList();
        this.updateVisibilityFilteredSectionsDOM();
    }

};

// on récupère les méthodes de la classe DOM
Object.assign(Catalog.prototype, CatalogDOM);
Object.assign(Catalog.prototype, Widget);

export default Catalog;

// Expose Export as ol.control.Catalog (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.Catalog = Catalog;
}
