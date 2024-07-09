// import CSS
import "../../CSS/Controls/Legends/GPFlegends.css";

// import OpenLayers
import Control from "../Control";

// import local
import Utils from "../../Utils/Helper";
import SelectorID from "../../Utils/SelectorID";
import Logger from "../../Utils/LoggerByDefault";
import Draggable from "../../Utils/Draggable";

// DOM
import LegendsDOM from "./LegendsDOM";

var logger = Logger.getLogger("legends");

/**
 * @classdesc
 *
 * Legends button
 *
 * @constructor
 * @alias ol.control.Legends
 * @param {Object} options - options for function call.
 * 
 * @fires legends:add
 * @fires legends:remove
 * @fires legends:modify
 * @example
 * var legends = new ol.control.Legends();
 * map.addControl(legends);
 */
class Legends extends Control {

    /**
     * See {@link ol.control.Legends}
     * @module Legends
     * @alias module:~controls/Legends
     * @param {Object} [options] - options
     * @example
     * import Legends from "gpf-ext-ol/controls/Legends"
     * ou 
     * import { Legends } from "gpf-ext-ol"
     */
    constructor (options) {
        options = options || {};

        // call ol.control.Control constructor
        super({
            element : options.element,
            target : options.target,
            render : options.render
        });

        if (!(this instanceof Legends)) {
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
                    this.panelLegendsContainer,
                    this.panelLegendsHeaderContainer,
                    this.options.position ? null : map.getTargetElement()
                );
            }
            // mode "collapsed"
            if (!this.collapsed) {
                this.buttonLegendsShow.setAttribute("aria-pressed", true);
            }
            // ajout des legendes déjà sur la carte
            var self = this;
            map.getLayers().forEach((layer) => {
                self.legends.push({
                    obj : layer,
                    dom : self._createLegendEntry(self.getMetaInformations(layer))
                });
            });

            // ajout des evenements sur la carte
            // pour les futurs ajouts de couche
            this.addEvents(map);
        } else {
            // suppression des evenements sur la carte
            // pour les futurs suppressions de couche
            this.removeEvents();
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

    /**
     * Get all meta informations of a IGN's layer
     * @param {*} layer - layer
     * @returns 
     */
    getMetaInformations (layer) {
        // INFO
        // condition pour être une couche issue du catalogue IGN
        if (layer.hasOwnProperty("name") && layer.hasOwnProperty("gpLayerId")) {
            return {
                id : layer.name,
                title : layer.getTitle(),
                legends : layer.getLegends(),
                metadatas : layer.getMetadata(),
                desc : layer.getDescription(),
                url : layer.getQuicklookUrl(),
                partners : layer.getOriginators()
            };
        }
        return;
    }
    // ################################################################### //
    // #################### privates methods ############################# //
    // ################################################################### //
    
    /**
     * Initialize Legends control (called by Legends constructor)
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
            info : true,
            auto : true,
            layers : []
        };

        // merge with user options
        Utils.assign(this.options, options);

        /** {Boolean} specify if control is collapsed (true) or not (false) */
        this.collapsed = this.options.collapsed;

        /** {Boolean} specify if control is draggable (true) or not (false) */
        this.draggable = this.options.draggable;

        this.buttonLegendsShow = null;
        this.panelLegendsContainer = null;
        this.panelLegendsEntriesContainer = null; // c'est là où on ajoute nos entrées legendes !
        this.panelLegendsHeaderContainer = null; // c'est pour le dragNdrop
        this.buttonLegendsClose = null; // utile ?

        this.eventsListeners = [];

        // tableau des entrées des legendes
        // ex. 
        // { 
        //   obj: layer openlayers,
        //   dom: DOMElement
        // }
        this.legends = [];
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

        var picto = this.buttonLegendsShow = this._createShowLegendsPictoElement();
        container.appendChild(picto);

        // panel
        var legendsPanel = this.panelLegendsContainer = this._createLegendsPanelElement();
        var legendsPanelDiv = this.panelLegendsEntriesContainer = this._createLegendsPanelDivElement();
        legendsPanel.appendChild(legendsPanelDiv);

        // header
        var legendsPanelHeader = this.panelLegendsHeaderContainer = this._createLegendsPanelHeaderElement();
        // title
        var legendsPanelTitle = this._createLegendsPanelTitleElement();
        legendsPanelHeader.appendChild(legendsPanelTitle);
        // close picto
        var legendsCloseBtn = this.buttonLegendsClose = this._createLegendsPanelCloseElement();
        legendsPanelHeader.appendChild(legendsCloseBtn);
        legendsPanelDiv.appendChild(legendsPanelHeader);

        container.appendChild(legendsPanel);

        logger.log(container);

        return container;
    }

    /**
     * Add events listeners on map (called by setMap)
     * 
     * @param {*} map - map
     */
    addEvents (map) {
        var self = this;
        this.eventsListeners["layer:add"] = function (e) {
            logger.trace(e);
            // INFO
            // à l'ajout d'une couche, on ajoute l'entrée
            // * dans le DOM
            // * dans la liste des entrées
            // un test est à realiser pour savoir si cette couche possède
            // des meta informations, sinon, on placera une legende par defaut :
            // > pas de légende disponible (au format texte)

            var entry = self._createLegendEntry(self.getMetaInformations(e.element));
            if (!entry) {
                logger.error("...");
                return;
            }
            // on ajoute l'entrée dans le DOM toujours "au dessus"
            self.panelLegendsEntriesContainer.prepend(entry);

            self.legends.push({
                obj : e.element,
                dom : entry
            });
        };
        this.eventsListeners["layer:remove"] = function (e) {
            logger.trace(e);
            // INFO
            // à la suppression de la couche, on supprime l'entrée 
            // * du DOM
            // * de la liste des entrées

            var found = false;
            for (var i = 0; i < self.legends.length; ++i) {
                if (self.legends[i].obj === e.element) {
                    if (self.legends[i].dom) {
                        self.legends[i].dom.remove();
                    }
                    self.legends.splice(i, 1);
                    found = true;
                    break;
                }
            }

            if (!found) {
                logger.error("...");
                return;
            }
        };
        this.eventsListeners["layer:modify"] = function (e) {
            logger.trace(e);
            // TODO
            // à la modification de l'ordre de la couche, on modifie l'entrée 
            // * du DOM
            // * de la liste des entrées
        };
        map.getLayers().on("add", this.eventsListeners["layer:add"]);
        map.getLayers().on("remove", this.eventsListeners["layer:remove"]);
        map.getLayers().on("change:zIndex", this.eventsListeners["layer:modify"]);
    }

    /**
     * Remove events listeners on map (called by setMap)
     */
    removeEvents () {
        var map = this.getMap();
        map.getLayers().un("add", this.eventsListeners["layer:add"]);
        map.getLayers().un("remove", this.eventsListeners["layer:remove"]);
        map.getLayers().un("change:zIndex", this.eventsListeners["layer:modify"]);
        delete this.eventsListeners["layer:add"];
        delete this.eventsListeners["layer:remove"];
        delete this.eventsListeners["layer:modify"];
    }

    // ################################################################### //
    // ######################## event dom ################################ //
    // ################################################################### //
    onShowLegendsClick (e) {
        logger.trace(e);
    }

};

// on récupère les méthodes de la classe DOM
Object.assign(Legends.prototype, LegendsDOM);

export default Legends;

// Expose Export as ol.control.Legends (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.Legends = Legends;
}
