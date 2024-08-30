// import CSS
import "../../CSS/Controls/Catalog/GPFcatalog.css";

// import OpenLayers
import Control from "../Control";

// import local
import Utils from "../../Utils/Helper";
import SelectorID from "../../Utils/SelectorID";
import Logger from "../../Utils/LoggerByDefault";
import Draggable from "../../Utils/Draggable";
import Config from "../../Utils/Config";

// import local des layers
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
 * @param {Object} options - options for function call.
 * 
 * @fires catalog:loaded
 * @fires catalog:layer:add
 * @fires catalog:layer:remove
 * @example
 * var widget = new ol.control.Catalog();
 * widget.on("catalog:loaded", (e) => { console.log(e.data); });
 * map.addControl(widget);
 */
class Catalog extends Control {

    /**
     * See {@link ol.control.Catalog}
     * @module Catalog
     * @alias module:~controls/Catalog
     * @param {Object} [options] - options
     * @example
     * import Catalog from "gpf-ext-ol/controls/Catalog"
     * ou 
     * import { Catalog } from "gpf-ext-ol"
     */
    constructor (options) {
        options = options || {};
        
        // call ol.control.Control constructor
        super({
            element : options.element,
            target : options.target,
            render : options.render
        });

        if (!(this instanceof Catalog)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

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
        this.initLayersList()
            .then((data) => {
                // TODO gestion de la patience
                logger.trace(this, data);
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
            // mode "draggable"
            if (this.draggable) {
                Draggable.dragElement(
                    this.panelCatalogContainer,
                    this.panelCatalogHeaderContainer,
                    this.options.position ? null : map.getTargetElement()
                );
            }
            // mode "collapsed"
            if (!this.collapsed) {
                this.buttonCatalogShow.setAttribute("aria-pressed", true);
            }

            // some stuff

            // ajout des evenements sur la carte
            if (this.auto) {
                this.addEventsListeners(map);
            }
        } else {
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
    }

    // ################################################################### //
    // ################### getters / setters ############################# //
    // ################################################################### //


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
        this.uid = SelectorID.generate();

        // set default options
        this.options = {
            collapsed : true,
            draggable : false,
            auto : true,
            titlePrimary : "",
            titleSecondary : "Gérer vos couches de données",
            layerLabel : "title",
            layerFilter : [], // TODO
            search : { // TODO
                active : true, 
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
                    // TODO sous categories
                    // items : [
                    //     {
                    //         title : "",
                    //         default : true,
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

        /** {Boolean} specify if control is collapsed (true) or not (false) */
        this.collapsed = this.options.collapsed;

        /** {Boolean} specify if control is draggable (true) or not (false) */
        this.draggable = this.options.draggable;

        /** {Boolean} specify if control add some stuff auto */
        this.auto = this.options.auto;

        // DOM
        this.buttonCatalogShow = null;
        this.panelCatalogContainer = null;
        this.panelCatalogHeaderContainer = null; // usefull for the dragNdrop
        this.buttonCatalogClose = null;
        this.contentCatalogContainer = null;

        /** 
         * {Array} specify all list of layers by categories ;
         * @example
         * [
         *   {
         *     category : "data",
         *     layers : {...}
         *   }
         * ]
         */
        this.dataList = [];

        /** {String} specify the current category selected */
        this.categoryId = "";

        /** {Object} list of layers added on map by key pair : name/service */
        this.layersList = {};

        /** {Array} specify some events listeners */
        this.eventsListeners = [];
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
        widgetContentElementDiv.appendChild(this._createCatalogContentSearchElement(this.options.search));
        widgetContentDiv.appendChild(widgetContentElementDiv);
        widgetPanelDiv.appendChild(widgetContentDiv);
        
        container.appendChild(widgetPanel);
        logger.log(container);

        return container;
    }

    /**
     * Configuration loading
     * 
     * @returns {Promise} - promise
     * @private
     * @todo gestion des sous categories
     * @todo validation du schema
     * @todo data de type:service
     */
    async initLayersList () {
        var data = null; // reponse brute du service

        var self = this;
        const createCatalogContentEntries = (layers) => {
            var container = self.contentCatalogContainer;
    
            // TODO gestion des sous categories
            var categories = self.options.categories.map((cat) => {
                return {
                    title : cat.title,
                    id : cat.id || Array.from(cat.title).reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0),
                    default : cat.hasOwnProperty("default") ? cat.default : false,
                    filter : cat.filter || null
                };
            });
            // INFO
            // par défaut, la categorie affichée sera la 1ere 
            // sauf si on a specifié une categorie avec l'attribut 'default:true'
            var index = categories.findIndex((category) => category.default);
            if (index === -1) {
                index = 0;
                categories[index].default = true;
            }
            self.categoryId = categories[index].id;

            var widgetContentEntryTabs = self._createCatalogContentCategoriesTabs(categories);
            container.appendChild(widgetContentEntryTabs);
            
            // INFO
            // les containers de contenu sont definis à partir 
            // de l'ordre des catégories / sous-categories
            // il y'a autant de catégories / sous-categories que de containers
            var contents = container.querySelectorAll(".tabcontent");
            for (let i = 0; i < contents.length; i++) {
                const content = contents[i];
                var layersFiltered = getLayersbyFilter(categories[i], layers);
                content.appendChild(self._createCatalogContentCategoryTabContent(categories[i].id, layersFiltered));
            }
        };
        
        // traitement du contenu d'une categorie en fonction du filtre
        const getLayersbyFilter = (category, layers) => {
            // INFO
            // comment gerer les listes de layers filtrées ?
            // on doit les stocker si l'on souhaite faire des requêtes 
            // avec l'outil de recherche par la suite
            var layersFiltered = layers;
            var filter = category.filter;
            if (filter) {
                layersFiltered = {};
                for (const key in layers) {
                    if (Object.prototype.hasOwnProperty.call(layers, key)) {
                        const layer = layers[key];
                        if (layer[filter.field]) { // FIXME on accepte uniquement un seul champ !
                            if (filter.value === "*" || layer[filter.field].toString() === filter.value) {
                                layersFiltered[key] = layer;
                            }
                        }
                    }
                }
            }
            // save
            this.dataList.push({
                category : category.id,
                layers : layersFiltered
            });
            return layersFiltered;
        };

        if (this.options.configuration.data) {
            data = this.options.configuration.data || {};
            if (Config.isConfigLoaded()) {
                Utils.mergeParams(data, Config.configuration);
            }

            // INFO
            // on en profite pour ajouter une property : service 
            // car elle est très utile pour identifier la couche
            // de manière unique : name + service
            for (const key in data.layers) {
                if (Object.prototype.hasOwnProperty.call(data.layers, key)) {
                    const layer = data.layers[key];
                    var service = layer.serviceParams.id.split(":").slice(-1)[0]; // beurk!
                    layer.service = service; // new proprerty !
                }
            }

            createCatalogContentEntries(data.layers);
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

                // INFO
                // on en profite pour ajouter une property : service 
                // car elle est très utile pour identifier la couche
                // de manière unique : name + service
                for (const key in data.layers) {
                    if (Object.prototype.hasOwnProperty.call(data.layers, key)) {
                        const layer = data.layers[key];
                        var service = layer.serviceParams.id.split(":").slice(-1)[0]; // beurk!
                        layer.service = service; // new proprerty !
                    }
                }

                createCatalogContentEntries(data.layers);
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
     * Add events listeners on map (called by setMap)
     * 
     * @param {*} map - map
     * @private
     */
    addEventsListeners (map) {
        var self = this;
        this.eventsListeners["custom:action"] = function (e) {
            logger.trace(e);
        };
        // the event custom:action is associate with an openlayers event 
        map.getLayers().on("some:event", this.eventsListeners["custom:action"]);
    }

    /**
     * Remove events listeners on map (called by setMap)
     * @private
     */
    removeEventsListeners () {
        var map = this.getMap();
        map.getLayers().un("some:event", this.eventsListeners["custom:action"]);
        delete this.eventsListeners["custom:action"];
    }

    // ################################################################### //
    // ######################## methods on map ########################### //
    // ################################################################### //

    /**
     * Add layer on map
     * 
     * @param {*} name - layer name
     * @param {*} service - layer service
     */
    addLayer (name, service) {
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
                });
            default:
                break;
        }

        if (layer) {
            var map = this.getMap();
            map.addLayer(layer);
            // sauvegarde
            this.layersList[name + ":" + service] = layer;
        }
    }

    /**
     * Remove Layer on map
     * 
     * @param {*} name - layer name
     * @param {*} service - layer service
     */
    removeLayer (name, service) {
        var layer = this.layersList[name + ":" + service];
        if (layer) {
            var map = this.getMap();
            map.removeLayer(layer);
            // sauvegarde
            delete this.layersList[name + ":" + service];
        }
    }
    // ################################################################### //
    // ######################## event dom ################################ //
    // ################################################################### //
    
    /**
     * ...
     * @param {*} e - ...
     */
    onShowCatalogClick (e) {
        logger.trace(e);
    }

    /**
     * ...
     * @param {*} e - ...
     */
    onCloseCatalogClick (e) {
        logger.trace(e);
    }

    /**
     * ...
     * @param {*} e - ...
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
     */
    onSelectCatalogEntryClick (e) {
        logger.trace(e);
        // appel gestionnaire d'evenement pour traitement :
        // - ajout ou pas de la couche à la carte
        // - envoi d'un evenement avec la conf tech

        var id = e.target.id.split("_")[1];
        var name = id.split("-")[0];
        var service = id.split("-")[1];
        var layer = {}; // TODO fournir la conf tech

        if (e.target.checked) {
            if (this.options.addToMap) {
                this.addLayer(name, service);
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
                this.removeLayer(name, service);
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
        }
    }

};

// on récupère les méthodes de la classe DOM
Object.assign(Catalog.prototype, CatalogDOM);

export default Catalog;

// Expose Export as ol.control.Catalog (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.Catalog = Catalog;
}
