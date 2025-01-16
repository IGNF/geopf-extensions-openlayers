// import CSS
import "../../CSS/Controls/Catalog/GPFcatalog.css";

// import OpenLayers
import Widget from "../Widget";
import Control from "../Control";

// import local
import Utils from "../../Utils/Helper";
import SelectorID from "../../Utils/SelectorID";
import Logger from "../../Utils/LoggerByDefault";
import Draggable from "../../Utils/Draggable";
import Config from "../../Utils/Config";

// import local des layers
import GeoportalWFS from "../../Layers/LayerWFS";
import GeoportalWMS from "../../Layers/LayerWMS";
import GeoportalWMTS from "../../Layers/LayerWMTS";
import GeoportalMapBox from "../../Layers/LayerMapBox";

// DOM
import CatalogDOM from "./CatalogDOM";

var logger = Logger.getLogger("widget");

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
var Catalog = class Catalog extends Control {

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
        this.initLayersList()
            .then((data) => {
                logger.trace(this, data);
                this.hideWaiting();
                /**
                 * event triggered when data is loaded
                 *
                 * @event catalog:loaded
                 * @property {Object} type - event
                 * @property {Object} data - data
                 * @property {Object} target - instance Catalog
                 * @example
                 * Catalog.on("catalog:loaded", function (e) {
                 *   console.log(e.data);
                 * })
                 */
                this.dispatchEvent({
                    type : "catalog:loaded",
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

    // ################################################################### //
    // ##################### public methods ############################## //
    // ################################################################### //

    /**
     * Overwrite OpenLayers setMap method
     *
     * @param {ol.Map} map - Map.
     */
    setMap (map) {
        if (map) {
            // INFO
            // on verifie les couches déjà présentes sur la cartes
            this.on("catalog:loaded", this.initMapLayers);

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
            this.un("catalog:loaded", this.initMapLayers);
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

    // ################################################################### //
    // ################### getters / setters ############################# //
    // ################################################################### //

    /**
     * Get container
     *
     * @returns {DOMElement} container
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
        this.uid = options.id || SelectorID.generate();

        // set default options
        this.options = {
            collapsed : true,
            draggable : false,
            auto : true,
            titlePrimary : "Gérer vos couches de données",
            titleSecondary : "",
            layerLabel : "title",
            layerFilter : [], // TODO filtre
            search : {
                display : true,
                criteria : [
                    "name",
                    "title",
                    "description"
                ]
            },
            addToMap : true,
            categories : [
                {
                    title : "Données",
                    id : "data",
                    default : true,
                    filter : null
                    // INFO
                    // > sous categories avec ou sans section
                    // items : [
                    //     {
                    //         title : "",
                    //         default : true,
                    //         section : true,
                    //         filter : {
                    //             field : "",
                    //             value : ""
                    //         }
                    //     }
                    // ]
                }
            ],
            configuration : {
                type : "json", // TODO type:"service"
                urls : [ // data:{}
                    "https://raw.githubusercontent.com/IGNF/cartes.gouv.fr-entree-carto/main/public/data/layers.json",
                    "https://raw.githubusercontent.com/IGNF/cartes.gouv.fr-entree-carto/main/public/data/edito.json"
                ]
            }
        };

        // merge with user options
        Utils.assign(this.options, options);

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
        this.buttonCatalogShow = null;
        this.panelCatalogContainer = null;
        this.panelCatalogHeaderContainer = null; // usefull for the dragNdrop
        this.buttonCatalogClose = null;
        this.contentCatalogContainer = null;
        this.waitingContainer = null;

        /**
         * specify all list of layers (configuration service)
         * @type {Object}
         * @see [schema](https://raw.githubusercontent.com/IGNF/geoportal-configuration/new-url/doc/schema.json)
         * @see [jsdoc](https://raw.githubusercontent.com/IGNF/geoportal-configuration/new-url/doc/schema.jsdoc)
         */
        this.layersList = [];

        /**
         * specify all categories
         * @type {Array}
         */
        this.categories = this.options.categories.map((cat) => {
            // INFO
            // on reecrit correctement les categories
            // ex. properties mal renseignées tels que id ou default
            var items = cat.items;
            if (cat.items) {
                items = cat.items.map((i) => {
                    return {
                        title : i.title,
                        id : i.id || Math.abs(Array.from(i.title).reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0)),
                        section : i.hasOwnProperty("section") ? i.section : false,
                        default : i.hasOwnProperty("default") ? i.default : false,
                        filter : i.filter || null,
                    };
                });
            }
            return {
                title : cat.title,
                id : cat.id || Math.abs(Array.from(cat.title).reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0)),
                default : cat.hasOwnProperty("default") ? cat.default : false,
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
    }

    /**
     * Create control main container (DOM initialize)
     *
     * @returns {DOMElement} DOM element
     * @private
     */
    initContainer () {
        // create main container
        var container = this._createMainContainerElement();

        var picto = this.buttonCatalogShow = this._createShowCatalogPictoElement();
        container.appendChild(picto);

        // panel
        var widgetPanel = this.panelCatalogContainer = this._createCatalogPanelElement();
        var widgetPanelDiv = this._createCatalogPanelDivElement();
        widgetPanel.appendChild(widgetPanelDiv);

        // header
        var widgetPanelHeader = this.panelCatalogHeaderContainer = this._createCatalogPanelHeaderElement();
        // title
        var widgetPanelTitle = this._createCatalogPanelTitleElement(this.options.titlePrimary);
        widgetPanelHeader.appendChild(widgetPanelTitle);
        // close picto
        var widgetCloseBtn = this.buttonCatalogClose = this._createCatalogPanelCloseElement();
        widgetPanelHeader.appendChild(widgetCloseBtn);
        widgetPanelDiv.appendChild(widgetPanelHeader);

        var widgetContentDiv = this._createCatalogPanelContentDivElement();

        // container for the custom dynamic code (cf. initLayersList())
        var widgetContentElementDiv = this.contentCatalogContainer = this._createCatalogContentDivElement();
        widgetContentElementDiv.appendChild(this._createCatalogContentTitleElement(this.options.titleSecondary));
        if (this.options.search.display) {
            widgetContentElementDiv.appendChild(this._createCatalogContentSearchElement());
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
     * ...
     * @private
     */
    initMapLayers () {
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
     * Configuration loading
     *
     * @returns {Promise} - promise
     * @private
     */
    async initLayersList () {
        var data = null; // reponse brute du service

        var self = this;
        const createCatalogContentEntries = (layers) => {
            var container = self.contentCatalogContainer;

            var widgetContentEntryTabs = self._createCatalogContentCategoriesTabs(this.categories);
            container.appendChild(widgetContentEntryTabs);

            var categories = []; // remise à plat des catégories / sous-categories
            self.categories.forEach((category) => {
                if (category.items) {
                    for (let i = 0; i < category.items.length; i++) {
                        const element = category.items[i];
                        categories.push(element);
                    }
                } else {
                    categories.push(category);
                }
            });
            // INFO
            // les containers de contenu sont definis à partir
            // de l'ordre des catégories / sous-categories
            // il y'a autant de catégories / sous-categories que de containers
            var contents = container.querySelectorAll(".tabcontent");
            for (let i = 0; i < contents.length; i++) {
                const content = contents[i];
                var layersCategorised = getLayersByCategory(categories[i], layers);
                content.appendChild(self._createCatalogContentCategoryTabContent(categories[i], layersCategorised));
            }
        };

        // traitement du contenu (liste de couches) d'une categorie
        // en fonction d'un filtre
        const getLayersByCategory = (category, layers) => {
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
        };

        // TODO filtre sur la liste de couches à prendre en compte
        const getLayersByFilter = (filter, layers) => {
            // INFO
            // definir les filtres possibles :
            // - sur un champ spécifique : ex field:"service"
            // - sur des valeurs : ex. value:"[WMS,TMS,WMTS]" ou "*"
            // - ...
            return layers;
        };

        if (this.options.configuration.data) {
            data = this.options.configuration.data || {};

            // TODO gestion du type service

            if (Config.isConfigLoaded()) {
                Utils.mergeParams(data, Config.configuration);
            }

            // INFO
            // on en profite pour ajouter des properties :
            // - service : utile pour identifier la couche
            // de manière unique : name + service
            // - categories : utile pour definir l'appartenance d'une couche
            // à une ou plusieurs categories
            for (const key in data.layers) {
                if (Object.prototype.hasOwnProperty.call(data.layers, key)) {
                    const layer = data.layers[key];
                    var service = layer.serviceParams.id.split(":").slice(-1)[0]; // beurk!
                    layer.service = service; // new proprerty !
                    layer.categories = []; // new property ! vide pour le moment
                }
            }

            // on applique un filtre sur la liste des couches
            var layers = getLayersByFilter(this.options.layerFilter, data.layers);

            // sauvegarde de la liste des couches
            this.layersList = layers;

            createCatalogContentEntries(layers);
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

                // TODO gestion du type service

                if (Config.isConfigLoaded()) {
                    Utils.mergeParams(data, Config.configuration);
                }

                // INFO
                // on en profite pour ajouter des properties :
                // - service : utile pour identifier la couche
                // de manière unique : name + service
                // - categories : utile pour definir l'appartenance d'une couche
                // à une ou plusieurs categories
                for (const key in data.layers) {
                    if (Object.prototype.hasOwnProperty.call(data.layers, key)) {
                        const layer = data.layers[key];
                        var service = layer.serviceParams.id.split(":").slice(-1)[0]; // beurk!
                        layer.service = service; // new proprerty !
                        layer.categories = []; // new property ! vide pour le moment
                    }
                }

                // on applique un filtre sur la liste des couches
                var layers = getLayersByFilter(this.options.layerFilter, data.layers);

                // sauvegarde de la liste des couches
                this.layersList = layers;

                createCatalogContentEntries(layers);
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

    // ################################################################### //
    // ######################## methods on map ########################### //
    // ################################################################### //

    /**
     * Add events listeners on map (called by setMap)
     *
     * @param {*} map - map
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
        switch (service) {
            case "WMS":
                layer = new GeoportalWMS({
                    layer : name
                });
                break;
            case "WMTS":
                layer = new GeoportalWMTS({
                    layer : name
                });
                break;
            case "TMS":
                layer = new GeoportalMapBox({
                    layer : name
                },{
                    declutter : true
                });
                break;
            case "WFS":
                layer = new GeoportalWFS({
                    layer : name
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
                this.updateFilteredLayersListDOM(layer.name, layer.service, layer.hidden);
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
                this.updateFilteredLayersListDOM(layer.name, layer.service, layer.hidden);
            }
        }
    }

    /**
     * Update DOM layer visibility
     *
     * @param {*} id - ...
     * @param {*} service  - ...
     * @param {*} hidden  - ...
     * @private
     */
    updateFilteredLayersListDOM (id, service, hidden) {
        var categories = []; // remise à plat des catégories / sous-categories
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
            var container = document.getElementById(`fieldset-${category}_${id}-${service}`);
            if (container) {
                if (hidden) {
                    container.classList.add("gpf-hidden");
                    container.classList.add("GPelementHidden");
                } else {
                    container.classList.remove("gpf-hidden");
                    container.classList.remove("GPelementHidden");
                }
            }
        }
    }

    // ################################################################### //
    // ######################## event dom ################################ //
    // ################################################################### //

    /**
     * ...
     * @param {*} e - ...
     * @private
     */
    onShowCatalogClick (e) {
        if (e.target.ariaPressed === "true") {
            this.onPanelOpen();
        }
        logger.trace(e);
    }

    /**
     * ...
     * @param {*} e - ...
     * @private
     */
    onCloseCatalogClick (e) {
        logger.trace(e);
    }

    /**
     * ...
     * @param {*} e - ...
     * @private
     */
    onSelectCatalogTabClick (e) {
        logger.trace(e);
        // sauvegarde de la categorie courrante pour la gestion de la recherche
        // de couches dans la liste associée à la categorie
        var id = e.target.id;
        var category = id.split("_")[1];
        this.categoryId = category;
    }

    /**
     * ...
     * @param {*} e - ...
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
             *
             * @event catalog:layer:add
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
            this.dispatchEvent({
                type : "catalog:layer:add",
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
             *
             * @event catalog:layer:remove
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
            this.dispatchEvent({
                type : "catalog:layer:remove",
                name : name,
                service : service,
                layer : layer
            });
        }
    }

    /**
     *
     * @private
     */
    onSearchCatalogButtonClick () {
        // INFO
        // la saisie du critère de recherche doit filtrer la liste des couches affichée
        // dans l'onglet courant.
        // on masque les entrées non conforme
        // - en ajoutant la classe 'gpf-hidden' dans le DOM
        // - en sauvegardant l'état avec la property 'hidden:true'
        var value = document.getElementById("search-input").value;
        this.setFilteredLayersList(value);
    }

    /**
     *
     * @private
     */
    onSearchCatalogInputChange () {
        this.onSearchCatalogButtonClick();
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
