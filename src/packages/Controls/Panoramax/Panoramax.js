// import CSS
import "../../CSS/Controls/Panoramax/GPFpanoramax.css";

// import OpenLayers
import Control from "../Control";
import Widget from "../Widget";

// import local
import Utils from "../../Utils/Helper";
import SelectorID from "../../Utils/SelectorID";
import Logger from "../../Utils/LoggerByDefault";
import Draggable from "../../Utils/Draggable";

// DOM
import PanoramaxDOM from "./PanoramaxDOM";

// lib
import VectorTileLayer from "ol/layer/VectorTile";
import {applyStyle} from "ol-mapbox-style";

var logger = Logger.getLogger("panoramax");

/**
 * @typedef {Object} PanoramaxOptions
 * @property {boolean} [collapsed=true] - Définit si le widget est replié au chargement.
 * @property {boolean} [draggable=false] - Permet de déplacer le panneau du catalogue.
 * @property {boolean} [auto=true] - Active l’ajout automatique des événements sur la carte.
 * @property {boolean} [panel=false] - Affiche un en-tête (header) dans le panneau.
 * @property {string} [id] - Identifiant unique du widget.
 * @property {string} [position] - Position CSS du widget sur la carte.
 * @property {boolean} [gutter] - Ajoute ou retire l’espace autour du panneau.
 * @property {Object} [layer] - Options de configuration de(s) couche(s).
 * @property {string} [layer.url] - URL du style de la couche à charger.
 * @property {string} [layer.name] - Nom de la couche à afficher dans le switcher de couches.
 * @property {string} [layer.sourceId] - Identifiant de la source de données à utiliser pour la couche. 
 * @property {Object} [buttons] - Options de configuration des boutons.
 * @property {Object} [buttons.filters] - Options de configuration des filtres.
 * @property {boolean} [buttons.filters.display] - Affiche ou masque les filtres.
 * @property {string} [buttons.filters.label] - Libellé du bouton de filtrage.
 * @property {Object} [buttons.filters.content] - Options de configuration du contenu des filtres.
 * @property {Array} [buttons.filters.content.types] - Types d'images à filtrer (Tout, classique, 360).
 * @property {Array} [buttons.filters.content.dates] - Plages de dates à filtrer.
 * @property {Array} [buttons.filters.content.quality] - Niveaux de qualité à filtrer.
 * @property {Array} [buttons.filters.content.precision] - Niveaux de précision à filtrer.
 * @property {Object} [buttons.tags] - Options de configuration des tags.
 * @property {boolean} [buttons.tags.display] - Affiche ou masque les tags.
 * @property {string} [buttons.tags.label] - Libellé du bouton de tags.
 * @property {Object} [buttons.tags.content] - Options de configuration du contenu des tags.
 * @property {Array} [buttons.tags.content.all] - Tous les objets à taguer.
 * @property {Array} [buttons.tags.content.roadSigns] - Panneaux routiers à taguer.
 * @property {Object} [buttons.contributions] - Options de configuration des contributions.
 * @property {boolean} [buttons.contributions.display] - Affiche ou masque les contributions.
 * @property {string} [buttons.contributions.label] - Libellé du bouton de contribution.
 * @property {Object} [visualizationWindow] - Options de configuration de la fenêtre de visualisation.
 * @property {boolean} [visualizationWindow.display] - Affiche ou masque la fenêtre de visualisation.
 * @property {string} [visualizationWindow.title] - Titre de la fenêtre de visualisation.
 * @property {string} [visualizationWindow.position] - Position CSS de la fenêtre de visualisation.
 * @property {string} [visualizationWindow.size] - Taille de la fenêtre de visualisation (small, medium, large).
 * @property {string} [visualizationWindow.target] - Cible d'affichage de la fenêtre de visualisation (map ou id d'un container).
 * @property {Array} [visualizationWindow.widgets] - Widgets à afficher dans la fenêtre de visualisation.
 */

/**
 * @classdesc
 *
 * Panoramax widget for OpenLayers. 
 * This widget allows users to visualize panoramic images on the map, 
 * filter them based on various criteria, and contribute to the dataset. 
 * The widget can be configured with different options to customize 
 * its behavior and appearance.
 *
 * @alias ol.control.Panoramax
 * @module Panoramax
*/
class Panoramax extends Control {
    
    /**
     * @constructor
     * @param {PanoramaxOptions} options - options for function call.
     * 
     * @fires panoramax:opened
     * @example
     * var panoramax = new ol.control.Panoramax();
     * map.addControl(panoramax);
     */
    constructor (options) {
        options = options || {};
        
        // call ol.control.Control constructor
        super({
            element : options.element,
            target : options.target,
            render : options.render
        });

        if (!(this instanceof Panoramax)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        // initialisation du composant
        this.initialize(options);

        // Widget main DOM container
        this.container = this.initContainer();

        // ajout du container
        (this.element) ? this.element.appendChild(this.container) : this.element = this.container;

        return this;
    }

    // ################################################################### //
    // ##################### public methods ############################## //
    // ################################################################### //

    /**
     * Overwrite OpenLayers setMap method
     *
     * @param {Map} map - Map.
     */
    setMap (map) {
        if (map) {
            // mode "draggable"
            if (this.draggable) {
                Draggable.dragElement(
                    this.panelPanoramaxButtonsContainer,
                    this.panelPanoramaxButtonsHeaderContainer,
                    this.options.position ? null : map.getTargetElement()
                );
            }
            // mode "collapsed"
            if (!this.collapsed) {
                this.buttonPanoramaxShow.setAttribute("aria-pressed", true);
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
     * @returns {HTMLElement} container
     */
    getContainer () {
        return this.container;
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
            return;
        }
        if ((collapsed && this.collapsed) || (!collapsed && !this.collapsed)) {
            return;
        }
        if (collapsed) {
            this.buttonReportingClose.click();
        } else {
            this.buttonReportingShow.click();
        }
        this.collapsed = collapsed;
    }

    // ################################################################### //
    // #################### privates methods ############################# //
    // ################################################################### //
    
    /**
     * Initialize Panoramax control (called by Panoramax constructor)
     *
     * @param {PanoramaxOptions} options - constructor options
     * @private
     */
    initialize (options) {
        /** @private */
        this.uid = options.id || SelectorID.generate();

        // set default options
        this.options = {
            collapsed : true,
            draggable : false,
            panel : false,
            auto : true,
            gutter : false,
            layer : {
                url : "https://api.panoramax.xyz/api/map/style.json",
                name : "Panoramax",
                sourceId : "geovisio"
            },
            buttons : {
                filters : {
                    display : true,
                    label : "Filtrer",
                    content : {}
                },
                tags : {
                    display : false,
                    label : "Ajouter des tags",
                    content : {}
                },
                contributions : {
                    display : true,
                    label : "Contribuer"
                },
            },
            visualizationWindow : {
                display : true,
                title : "Visualiser l'image",
                position : "top-right",
                size : "medium",
                target : "map",
                widgets : [
                    "direction",
                    "zoom",
                    "fullscreen",
                    "minimap",
                    "informations"
                ]
            }
        };

        // merge with user options
        Utils.assign(this.options, options);

        /** 
         * @type {Boolean} 
         * specify if control is collapsed (true) or not (false) */
        this.collapsed = this.options.collapsed;

        /** 
         * @type {Boolean} 
         * specify if control is draggable (true) or not (false) */
        this.draggable = this.options.draggable;

        /** 
         * @type {Boolean} 
         * specify if control add some stuff auto */
        this.auto = this.options.auto;

        /** @private */
        this.buttonPanoramaxShow = null;
        /** @private */
        this.panelPanoramaxButtonsContainer = null;
        /** @private */
        this.panelPanoramaxButtonsHeaderContainer = null; // usefull for the dragNdrop
        /** @private */
        this.buttonPanoramaxButtonsClose = null;
        /** @private */
        this.formPanoramaxButtonsContainer = null;

        /** {Array} specify some events listeners */
        this.eventsListeners = [];

        /**
         * event triggered when the panoramax panel is opened
         * @event panoramax:opened
         * @defaultValue "panoramax:opened"
         * @group Events
         * @description
         * This event is dispatched when the panoramax panel is opened.
         * It indicates that the panoramax process has started and the user can begin inputting data.
         * This event can be used to perform additional actions when the panoramax panel is opened,
         * such as initializing the input fields or updating the UI to reflect the panoramax state.
         */
        this.OPENED_PANORAMAX_EVENT = "panoramax:opened";

        /** layer */
        this.layerPanoramax = null;
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

        var picto = this.buttonPanoramaxShow = this._createShowWidgetPictoElement();
        container.appendChild(picto);

        // panel
        var widgetPanel = this.panelPanoramaxButtonsContainer = this._createWidgetPanelButtonsElement();
        var widgetPanelDiv = this._createWidgetPanelButtonsDivElement();
        widgetPanel.appendChild(widgetPanelDiv);

        // container for the custom code
        var form = this.formPanoramaxButtonsContainer = this._createWidgetPanelButtonsFormElement();
        widgetPanel.appendChild(form);

        // header
        var widgetPanelHeader = this.panelPanoramaxButtonsHeaderContainer = this._createWidgetPanelButtonsHeaderElement(this.options.panel);
        // icone
        var widgetPanelIcon = this._createWidgetPanelButtonsIconElement();
        widgetPanelHeader.appendChild(widgetPanelIcon);
        // title
        var widgetPanelTitle = this._createWidgetPanelButtonsTitleElement();
        widgetPanelHeader.appendChild(widgetPanelTitle);
        // close picto
        var widgetCloseBtn = this.buttonPanoramaxButtonsClose = this._createWidgetPanelButtonsCloseElement();
        widgetPanelHeader.appendChild(widgetCloseBtn);
        
        widgetPanelDiv.appendChild(widgetPanelHeader);

        container.appendChild(widgetPanel);

        logger.log(container);

        return container;
    }

    /**
     * Add events listeners on map (called by setMap)
     * 
     * @param {Map} map - map
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
    // ################# privates methods : reset ######################## //
    // ################################################################### //

    /**
     * Clear the content of the panel (called when the panel is closed)
     * And reset some stuff if necessary
     * @private
     */
    clear () {
        // TODO reset()
        // - vider la couche de données
        this.resetLayer();
        // - reinit des filtres
        this.resetFilters();
        // - reinit des tags
        this.resetTags();
        // - reinit des contributions
        this.resetContributions();
        // - reinit de la fenêtre de visualisation (?)
        this.resetVisualizationWindow();
        // - etc.
    }

    resetLayer () {
        logger.trace("resetLayer");
        var map = this.getMap();
        if (this.layerPanoramax) {
            map.removeLayer(this.layerPanoramax);
            this.layerPanoramax = null;
        }
    }
    resetFilters () {}
    resetTags () {}
    resetContributions () {}
    resetVisualizationWindow () {}

    // ################################################################### //
    // ################# privates methods : init ######################### //
    // ################################################################### //

    /**
     * Load some stuff in the panel (called when the panel is opened)
     * And launch some processes if necessary
     * @private
     */
    async load () {
        // TODO init()
        // - charger la couche de données
        await this.initLayer();
        // - charger le bouton des filtres
        await this.initFilters();
        // - charger le bouton de tags
        await this.initTags();
        // - charger le bouton de contribution
        await this.initContributions();
        // - charger la fenêtre de visualisation (?)
        await this.initVisualizationWindow();
        // - etc.
    }

    initLayer () {
        logger.trace("initLayer");
        // options de la couche :
        // - url : https://api.panoramax.xyz/api/map/style.json
        // - name : "Panoramax"
        // - etc.
        var map = this.getMap();
        this.layerPanoramax = new VectorTileLayer({ declutter : true });
        this.layerPanoramax.sourceId = this.options.layer.sourceId;
        this.layerPanoramax.styleUrl = this.options.layer.url;
        return applyStyle(
            this.layerPanoramax, 
            this.options.layer.url, 
            this.options.layer.sourceId
        )
            .then(() => {
                map.addLayer(this.layerPanoramax);
            })
            .then(() => {
                this.layerPanoramax.set("title", this.options.layer.name);
            })
            .catch((err) => {
                logger.error("Error loading Panoramax layer style", err);
                this.layerPanoramax = null;
            });
    }

    initFilters () {
        // options.filters.display : true/false
        // options.filters.label : "Filtrer"
        // options des filtres :
        // - types d'images : Tout, classique, 360
        // - dates : ...
        // - qualité : ...
        // - precision : ...
        // - etc.
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                logger.trace("initFilters");
                resolve();
            }, 1000);
        });
    }

    initTags () {
        // options.tags.display : true/false
        // options.tags.label : "Ajouter des tags"
        // options des tags :
        // - tous les objets
        // - les panneaux routiers
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                logger.trace("initTags");
                resolve();
            }, 1000);
        });
    }

    initContributions () {
        // options.contributions.display : true/false
        // options.contributions.label : "Contribuer"
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                logger.trace("initContributions");
                resolve();
            }, 1000);
        });
    }

    initVisualizationWindow () {
        // options.visualizationWindow.display : true/false
        // options de la fenêtre de visualisation :
        // - title : "Visualiser l'image"
        // - position : "top-right" (ou "top-left", "bottom-right", "bottom-left")
        // - size : "small" (ou "medium", "large")
        // - target : "map" (ou un id de container)
        // - widgets : ...
        //   - direction
        //   - zoom
        //   - fullscreen
        //   - minimap
        //   - informations sur l'image
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                logger.trace("initVisualizationWindow");
                resolve();
            }, 1000);
        });
    }

    // ################################################################### //
    // ######################## event dom ################################ //
    // ################################################################### //
    
    /**
     * ...
     * @param {*} e - ...
     * @private
     */
    onShowPanoramaxClick (e) {
        logger.trace("onShowPanoramaxClick", e);
        var opened = this.buttonPanoramaxShow.ariaPressed;
        if (opened === "true") {
            this.onPanelOpen();
        }
        this.collapsed = !(opened === "true");
        this.dispatchEvent("change:collapsed");

        if (this.collapsed) {
            this.clear();
        } else {
            this.load().then(() => {
                /**
                 * event triggered when the panoramax panel is opened
                 */
                this.dispatchEvent(this.OPENED_PANORAMAX_EVENT);
            });
        }
    }

    /**
     * ...
     * @param {*} e - ...
     * @private
     */
    onClosePanoramaxClick (e) {
        logger.trace(e);
    }

    /**
     * @param {*} e - ...
     * @private
     */
    onPanoramaxComputationSubmit (e) {
        logger.trace(e);
    }

};

// on récupère les méthodes de la classe DOM
Object.assign(Panoramax.prototype, PanoramaxDOM);
Object.assign(Panoramax.prototype, Widget);

export default Panoramax;

// Expose Export as ol.control.Panoramax (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.Panoramax = Panoramax;
}
