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
 * @classdesc
 *
 * Widget button
 *
 * @constructor
 * @alias ol.control.Widget
 * @param {Object} options - options for function call.
 * 
 * @fires custom:action
 * @example
 * var widget = new ol.control.Widget();
 * map.addControl(widget);
 */
class Widget extends Control {

    /**
     * See {@link ol.control.Widget}
     * @module Widget
     * @alias module:~controls/Widget
     * @param {Object} [options] - options
     * @example
     * import Widget from "gpf-ext-ol/controls/Widget"
     * ou 
     * import { Widget } from "gpf-ext-ol"
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
     * @param {ol.Map} map - Map.
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
            panel : true
        };

        // merge with user options
        Utils.assign(this.options, options);

        /** {Boolean} specify if control is collapsed (true) or not (false) */
        this.collapsed = this.options.collapsed;

        /** {Boolean} specify if control is draggable (true) or not (false) */
        this.draggable = this.options.draggable;

        /** {Boolean} specify if control add some stuff auto */
        this.auto = this.options.auto;

        this.buttonWidgetShow = null;
        this.panelWidgetContainer = null;
        this.panelWidgetHeaderContainer = null; // usefull for the dragNdrop
        this.buttonWidgetClose = null;

        this.panelWidgetEntriesContainer = null;

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
    // ######################## event dom ################################ //
    // ################################################################### //
    
    /**
     * ...
     * @param {*} e - ...
     */
    onShowWidgetClick (e) {
        logger.trace(e);
    }

    /**
     * ...
     * @param {*} e - ...
     */
    onCloseWidgetClick (e) {
        logger.trace(e);
    }

};

// on récupère les méthodes de la classe DOM
Object.assign(Widget.prototype, WidgetDOM);

export default Widget;

// Expose Export as ol.control.Widget (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.Widget = Widget;
}
