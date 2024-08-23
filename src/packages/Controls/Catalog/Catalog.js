// import CSS
import "../../CSS/Controls/Catalog/GPFcatalog.css";

// import OpenLayers
import Control from "../Control";

// import local
import Utils from "../../Utils/Helper";
import SelectorID from "../../Utils/SelectorID";
import Logger from "../../Utils/LoggerByDefault";
import Draggable from "../../Utils/Draggable";

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
 * @fires custom:action
 * @example
 * var widget = new ol.control.Catalog();
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
            layerFilter : [],
            search : { 
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
                    filter : null
                }
            ],
            configuration : {
                mode : "internal",
                type : "json",
                urls : [
                    "https://raw.githubusercontent.com/IGNF/cartes.gouv.fr-entree-carto/main/public/data/layers.json",
                    "https://raw.githubusercontent.com/IGNF/cartes.gouv.fr-entree-carto/main/public/data/edito.json"
                ]
            },

        };

        // merge with user options
        Utils.assign(this.options, options);

        /** {Boolean} specify if control is collapsed (true) or not (false) */
        this.collapsed = this.options.collapsed;

        /** {Boolean} specify if control is draggable (true) or not (false) */
        this.draggable = this.options.draggable;

        /** {Boolean} specify if control add some stuff auto */
        this.auto = this.options.auto;

        this.buttonCatalogShow = null;
        this.panelCatalogContainer = null;
        this.panelCatalogHeaderContainer = null; // usefull for the dragNdrop
        this.buttonCatalogClose = null;

        this.contentCatalogContainer = null;

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
        var widgetPanelTitle = this._createCatalogPanelTitleElement();
        widgetPanelHeader.appendChild(widgetPanelTitle);
        // close picto
        var widgetCloseBtn = this.buttonCatalogClose = this._createCatalogPanelCloseElement();
        widgetPanelHeader.appendChild(widgetCloseBtn);
        widgetPanelDiv.appendChild(widgetPanelHeader);

        // container for the custom code
        var widgetContent = this.contentCatalogContainer = this._createCatalogPanelContentElement();
        widgetContent.innerHTML = this._createCatalogContentEntries(); // TEST !
        widgetPanelDiv.appendChild(widgetContent);

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

};

// on récupère les méthodes de la classe DOM
Object.assign(Catalog.prototype, CatalogDOM);

export default Catalog;

// Expose Export as ol.control.Catalog (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.Catalog = Catalog;
}
