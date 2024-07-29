// import CSS
import "../../CSS/Controls/Global/GPFglobal.css";

// import OpenLayers
import Control from "../Control";
import { transformExtent as olTransformExtentProj } from "ol/proj";

// import local
import Utils from "../../Utils/Helper";
import SelectorID from "../../Utils/SelectorID";
import Logger from "../../Utils/LoggerByDefault";
import Draggable from "../../Utils/Draggable";

import Territories from "./Global.json";

// DOM
import GlobalDOM from "./GlobalDOM";

var logger = Logger.getLogger("global");

/**
 * @classdesc
 *
 * Global map widget
 *
 * @constructor
 * @alias ol.control.Global
 * @param {Object} options - options for function call.
 * 
 * @fires custom:action
 * @example
 * var global = new ol.control.Global({
 *   collapsed: true,
 *   panel: true,
 *   auto: true
 * });
 * map.addControl(global);
 * 
 * or/and
 * 
 * var global = new ol.control.Global({});
 * global.setTerritory({id: "MTQ", title: "Martinique", description: "", bbox: [], thumbnail: "data:image/png;base64,..."});
 * global.setTerritory({id: "GLP", title: "Guadeloupe", description: "", bbox: [], thumbnail: "http://..."});
 * map.addControl(global);
 */
class Global extends Control {

    /**
     * See {@link ol.control.Global}
     * @module Global
     * @alias module:~controls/Global
     * @param {Object} [options] - options
     * @example
     * import Global from "gpf-ext-ol/controls/Global"
     * ou 
     * import { Global } from "gpf-ext-ol"
     */
    constructor (options) {
        options = options || {};
        
        // call ol.control.Control constructor
        super({
            element : options.element,
            target : options.target,
            render : options.render
        });

        if (!(this instanceof Global)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        // initialisation du composant
        this.initialize(options);

        // Global main DOM container
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
                    this.panelGlobalContainer,
                    this.panelGlobalHeaderContainer,
                    this.options.position ? null : map.getTargetElement()
                );
            }
            // mode "collapsed"
            if (!this.collapsed) {
                this.buttonGlobalShow.setAttribute("aria-pressed", true);
            }

            // Ajout des territoires par defaut
            if (this.auto) {
                for (let index = 0; index < Territories.length; index++) {
                    const territory = Territories[index];
                    this.setTerritory(territory);
                }
            }
        } else {
            // some stuff when remove widget
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
     * Add a territory
     * 
     * @param {Object} territory  - territory
     * @returns {Boolean} - true|false
     * @public
     * @example
     * global.setTerritory ({ 
     *  id: "MTQ", 
     *  title: "Martinique", 
     *  description: "", 
     *  bbox: [minx, miny, maxx, maxy], 
     *  thumbnail: "data:image/png;base64,..."
     * });
     */
    setTerritory (territory) {
        // Test if a territory already exist
        var founded = this.territories.some(e => e.data.id === territory.id);
        if (territory && !founded) {
            var entry = this._createTerritoryEntry(territory);
            if (entry) {
                this.panelGlobalEntriesContainer.appendChild(entry);
                this.territories.push({
                    data : territory,
                    dom : entry
                });
                return true;
            }
        }
        return false;
    }

    /**
     * Remove a territory
     * 
     * @param {String} territory - territory id (FRA, MTQ, ...)
     * @returns {Boolean} - true|false
     * @public
     * @example
     * global.removeTerritory("MTQ"); // id du territoire
     */
    removeTerritory (territory) {
        var found = false;
        if (territory) {
            for (let i = 0; i < this.territories.length; i++) {
                const o = this.territories[i];
                if (o.data.id === territory) {
                    this.territories[i].dom.remove();
                    this.territories.splice(i, 1);
                    found = true;
                    break;
                }
            }
        }
        return found;
    }

    /**
     * Set collapse
     * 
     * @param {Boolean} collaspe - true|false
     * @todo ...
     * @public
     */
    setCollapse (collaspe) {

    }

    // ################################################################### //
    // #################### privates methods ############################# //
    // ################################################################### //
    
    /**
     * Initialize Global control (called by Global constructor)
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
            panel : true, // titre
            auto : false, // chargement auto des territoires par defaut
            direction : "vertical", // horizontal
            reduce : false, // TODO tuiles reduites par defaut, ouverte avec une vignette en rollover
            tiles : 3, // nombre de tuiles affichables, 0 = tous !
            territories : [] // TODO à spécifier...
        };

        // merge with user options
        Utils.assign(this.options, options);

        /** {Boolean} specify if control is collapsed (true) or not (false) */
        this.collapsed = this.options.collapsed;

        /** {Boolean} specify if control is draggable (true) or not (false) */
        this.draggable = this.options.draggable;

        /** {Boolean} specify if we load the list of territories by default */
        this.auto = this.options.auto;
        /** 
         * {Array} list of object territories 
         * @example
         * { 
         *   dom : { HTMLelment }, 
         *   data : { 
         *     id: "MTQ", title: "Martinique", description: "", bbox: [minx, miny, maxx, maxy], thumbnail: "data:image/png;base64,..."
         *   }
         * }
         */
        this.territories = [];

        this.buttonGlobalShow = null;
        this.panelGlobalContainer = null;
        this.panelGlobalHeaderContainer = null; // usefull for the dragNdrop
        this.buttonGlobalClose = null;

        this.panelGlobalEntriesContainer = null;
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

        var picto = this.buttonGlobalShow = this._createShowGlobalPictoElement();
        container.appendChild(picto);

        // panel
        var globalPanel = this.panelGlobalContainer = this._createGlobalPanelElement();
        globalPanel.classList.add("tiles-" + this.options.direction);
        globalPanel.classList.add("tiles-" + this.options.tiles);
        var globalPanelDiv = this._createGlobalPanelDivElement();
        globalPanel.appendChild(globalPanelDiv);

        // container for the custom code
        var globalEntriesDiv = this.panelGlobalEntriesContainer = this._createTerritoriesElement();
        globalEntriesDiv.classList.add("tiles-" + this.options.direction);
        globalEntriesDiv.classList.add("tiles-" + this.options.tiles);
        if (this.options.reduce) {
            globalEntriesDiv.classList.add("tiles-reduce");
        }
        globalPanel.appendChild(globalEntriesDiv);


        // header ?
        if (this.options.panel) {
            var globalPanelHeader = this.panelGlobalHeaderContainer = this._createGlobalPanelHeaderElement();
            // icone
            var globalPanelIcon = this._createGlobalPanelIconElement();
            globalPanelHeader.appendChild(globalPanelIcon);
            // title
            var globalPanelTitle = this._createGlobalPanelTitleElement();
            globalPanelHeader.appendChild(globalPanelTitle);
            // close picto
            var globalCloseBtn = this.buttonGlobalClose = this._createGlobalPanelCloseElement();
            globalPanelHeader.appendChild(globalCloseBtn);
            globalPanelDiv.appendChild(globalPanelHeader);
        }

        container.appendChild(globalPanel);

        logger.log(container);

        return container;
    }

    // ################################################################### //
    // ######################## event dom ################################ //
    // ################################################################### //
    
    /**
     * ...
     * @param {*} e - ...
     */
    onShowGlobalClick (e) {
        logger.trace(e);
    }

    /**
     * ...
     * @param {*} e - ...
     */
    onCloseGlobalClick (e) {
        logger.trace(e);
    }

    /**
     * ...
     * @param {*} e - ...
     * @param {*} id - ...
     * @todo ...
     */
    onImageGlobalClick (e, id) {
        logger.trace(e, id);
        var territory = this.territories.find(e => e.data.id === id);
        if (territory) {
            var zoom = territory.data.zoom;
            var bbox = territory.data.bbox || []; // left, bottom, right, top
            if (!bbox.length) {
                return;
            }

            var map = this.getMap();
            var proj = map.getView().getProjection().getCode();
            var extent = olTransformExtentProj(bbox, "EPSG:4326", proj);
            map.getView().fit(extent, map.getSize());
            if (zoom) {
                map.getView().setZoom(zoom);
            }
        }
    }

};

// on récupère les méthodes de la classe DOM
Object.assign(Global.prototype, GlobalDOM);

export default Global;

// Expose Export as ol.control.Global (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.Global = Global;
}
