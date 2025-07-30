// import CSS
import "../../CSS/Controls/WidgetEntries/GPFWidget.css";

// import OpenLayers
import Control from "../Control";

// import local
import Utils from "../../Utils/Helper";
import SelectorID from "../../Utils/SelectorID";
import Logger from "../../Utils/LoggerByDefault";
import Draggable from "../../Utils/Draggable";

// DOM
import WidgetDOM from "./WidgetDOM";

var logger = Logger.getLogger("widget");

/**
 * @typedef {Object} WidgetOptions
 * @property {boolean} [collapsed=true] - Définit si le widget est replié au chargement.
 * @property {boolean} [draggable=false] - Permet de déplacer le panneau du catalogue.
 * @property {boolean} [auto=true] - Active l’ajout automatique des événements sur la carte.
 * @property {boolean} [panel=true] - Affiche un en-tête (header) dans le panneau.
 * @property {string} [id] - Identifiant unique du widget.
 * @property {string} [position] - Position CSS du widget sur la carte.
 * @property {boolean} [gutter] - Ajoute ou retire l’espace autour du panneau.
 */

/**
 * @classdesc
 *
 * Widget button
 *
 * @alias ol.control.Widget
 * @module Widget
 * 
*/
var Widget = class Widget extends Control {
    
    /**
     * @constructor
     * @param {WidgetOptions} options - options for function call.
     * 
     * @fires custom:action
     * @example
     * var widget = new ol.control.Widget();
     * map.addControl(widget);
     */
    constructor (options) {
        options = options || {};
        
        // call ol.control.Control constructor
        super({
            element : options.element,
            target : options.target,
            render : options.render
        });

        if (!(this instanceof Widget)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        /**
        * Nom de la classe (heritage)
        * @private
        */
        this.CLASSNAME = "Widget";

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
                    this.panelWidgetContainer,
                    this.panelWidgetHeaderContainer,
                    this.options.position ? null : map.getTargetElement()
                );
            }
            // mode "collapsed"
            if (!this.collapsed) {
                this.buttonWidgetShow.setAttribute("aria-pressed", true);
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


    // ################################################################### //
    // #################### privates methods ############################# //
    // ################################################################### //
    
    /**
     * Initialize Widget control (called by Widget constructor)
     *
     * @param {WidgetOptions} options - constructor options
     * @private
     */
    initialize (options) {
        this.uid = SelectorID.generate();

        // set default options
        this.options = {
            collapsed : true,
            draggable : false,
            auto : true,
            panel : true
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
        this.buttonWidgetShow = null;
        /** @private */
        this.panelWidgetContainer = null;
        /** @private */
        this.panelWidgetHeaderContainer = null; // usefull for the dragNdrop
        /** @private */
        this.buttonWidgetClose = null;

        /** @private */
        this.panelWidgetEntriesContainer = null;

        /** 
         * @type {Array} 
         * specify some events listeners */
        this.eventsListeners = [];
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

        var picto = this.buttonWidgetShow = this._createShowWidgetPictoElement();
        container.appendChild(picto);

        // panel
        var widgetPanel = this.panelWidgetContainer = this._createWidgetPanelElement();
        var widgetPanelDiv = this._createWidgetPanelDivElement();
        widgetPanel.appendChild(widgetPanelDiv);

        // container for the custom code
        var widgetEntriesDiv = this.panelWidgetEntriesContainer = this._createEntriesElement();
        widgetPanel.appendChild(widgetEntriesDiv);


        // header ?
        if (this.options.panel) {
            var widgetPanelHeader = this.panelWidgetHeaderContainer = this._createWidgetPanelHeaderElement();
            // icone
            var widgetPanelIcon = this._createWidgetPanelIconElement();
            widgetPanelHeader.appendChild(widgetPanelIcon);
            // title
            var widgetPanelTitle = this._createWidgetPanelTitleElement();
            widgetPanelHeader.appendChild(widgetPanelTitle);
            // close picto
            var widgetCloseBtn = this.buttonWidgetClose = this._createWidgetPanelCloseElement();
            widgetPanelHeader.appendChild(widgetCloseBtn);
            widgetPanelDiv.appendChild(widgetPanelHeader);
        }

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
    // ######################## event dom ################################ //
    // ################################################################### //
    
    /**
     * ...
     * @param {*} e - ...
     * @private
     */
    onShowWidgetClick (e) {
        logger.trace(e);
    }

    /**
     * ...
     * @param {*} e - ...
     * @private
     */
    onCloseWidgetClick (e) {
        logger.trace(e);
    }

};

// on récupère les méthodes de la classe DOM
Object.assign(Widget.prototype, WidgetDOM);
// on récupère les méthodes d'une classe applicable à tous les widgets'
Object.assign(Widget.prototype, Widget);

export default Widget;

// Expose Export as ol.control.Widget (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.Widget = Widget;
}
