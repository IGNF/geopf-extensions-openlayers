// import CSS
import "../../CSS/Controls/Territories/GPFterritories.css";

// import OpenLayers
import Control from "../Control";
import Widget from "../Widget";
import { 
    transformExtent as olTransformExtentProj,
    transform as olTransformProj
} from "ol/proj";

// import local
import Utils from "../../Utils/Helper";
import SelectorID from "../../Utils/SelectorID";
import Logger from "../../Utils/LoggerByDefault";
import Draggable from "../../Utils/Draggable";

import TerritoriesJson from "./Territories.json";

// DOM
import TerritoriesDOM from "./TerritoriesDOM";

var logger = Logger.getLogger("territories");

/**
 * @classdesc
 *
 * Territories map widget
 *
 * @constructor
 * @alias ol.control.Territories
 * @type {ol.control.Territories}
 * @extends {ol.control.Control}
 * @param {Object} options - options for function call.
 *
 * @fires territories:change
 * @example
 * var territories = new ol.control.Territories({
 *   collapsed: true,
 *   panel: true,
 *   auto: true
 * });
 * map.addControl(territories);
 *
 * or/and
 *
 * var territories = new ol.control.Territories({});
 * territories.setTerritory({id: "MTQ", title: "Martinique", description: "", bbox: [], thumbnail: "data:image/png;base64,..."});
 * territories.setTerritory({id: "GLP", title: "Guadeloupe", description: "", bbox: [], thumbnail: "http://..."});
 * map.addControl(territories);
 */
class Territories extends Control {

    /**
     * See {@link ol.control.Territories}
     * @module Territories
     * @alias module:~controls/Territories
     * @param {Object} [options] - options
     * @example
     * import Territories from "gpf-ext-ol/controls/Territories"
     * ou
     * import { Territories } from "gpf-ext-ol"
     */
    constructor (options) {
        options = options || {};

        // call ol.control.Control constructor
        super(options);

        if (!(this instanceof Territories)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }
        /**
         * Nom de la classe (heritage)
         * @private
         */
        this.CLASSNAME = "Territories";
        // initialisation du composant
        this.initialize(options);

        // Territories main DOM container
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
                    this.panelTerritoriesContainer,
                    this.panelTerritoriesHeaderContainer,
                    map.getTargetElement()
                );
            }
            // mode "collapsed"
            if (!this.collapsed) {
                this.buttonTerritoriesShow.setAttribute("aria-pressed", true);
            }

            // Ajout des territoires par defaut ou customisés
            var territories = (this.auto) ? TerritoriesJson : this.options.territories;
            for (let index = 0; index < territories.length; index++) {
                const territory = territories[index];
                this.setTerritory(territory);
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

        // reunion du bouton avec le précédent
        if (this.options.gutter === false) {
            this.getContainer().classList.add("gpf-button-no-gutter");
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
     * territories.setTerritory ({
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
                this.panelTerritoriesEntriesContainer.appendChild(entry);
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
     * Load a new configuration
     * 
     * @param {Object} config - file config
     */
    setTerritories (config) {
        for (let j = 0; j < config.length; j++) {
            const element = config[j];
            this.setTerritory(element);
        }
    }

    /**
     * Remove a territory
     *
     * @param {String} territory - territory id (FRA, MTQ, ...)
     * @returns {Boolean} - true|false
     * @public
     * @example
     * territories.removeTerritory("MTQ"); // id du territoire
     */
    removeTerritory (territory) {
        var found = false;
        if (territory) {
            for (let i = 0; i < this.territories.length; i++) {
                const o = this.territories[i];
                if (o.data.id === territory.data.id) {
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
     * Remove all territories
     */
    removeTerritories () {
        for (let i = 0; i < this.territories.length; i++) {
            const territory = this.territories[i];
            territory.dom.remove();
        }
        this.territories = [];
    }
    /**
     * Set collapse
     *
     * @param {Boolean} collapsed - true|false
     * @todo ...
     * @public
     */
    setCollapse (collapsed) {
        if (collapsed === undefined) {
            logger.log("[ERROR] Territory:setCollapsed - missing collapsed parameter");
            return;
        }
        if ((collapsed && this.collapsed) || (!collapsed && !this.collapsed)) {
            return;
        }
        if (collapsed) {
            document.getElementById("GPterritoriesPanelClose").click();
        } else {
            this.buttonTerritoriesShow.click();
        }
        this.collapsed = collapsed;
    }

    /**
     * Mode reduit des tuiles (uniquement le nom du territoire)
     *
     * @param {*} reduce - true|false
     * @public
     */
    setReduce (reduce) {
        if (reduce) {
            this.panelTerritoriesEntriesContainer.classList.add("tiles-reduce");
        } else {
            this.panelTerritoriesEntriesContainer.classList.remove("tiles-reduce");
        }
    }

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
     * Initialize Territories control (called by Territories constructor)
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
            panel : true, // titre
            upload : {
                active : false,
                title : "Ajouter un fichier de configuration",
                description : ""
            }, // menu du upload
            title : "Sélectionner un territoire",
            auto : false, // chargement auto des territoires par defaut
            thumbnail : false, // imagette des territoires
            reduce : false, // tuiles reduites par defaut
            tiles : 3, // nombre de tuiles affichables, 0 = toutes !
            territories : []
        };

        // merge with user options
        var uploadOpts = Utils.assign(this.options.upload, options.upload);
        Utils.assign(this.options, options);
        Utils.assign(this.options.upload, uploadOpts);

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
         *     id: "MTQ",
         *     title: "Martinique",
         *     description: "", 
         *     bbox: [minx, miny, maxx, maxy], 
         *     thumbnail: "data:image/png;base64,..."
         *   }
         * }
         */
        this.territories = [];

        /** {Boolean} specify if a list of object territories must be appended or replaced */
        this.append = false;

        this.buttonTerritoriesShow = null;
        this.panelTerritoriesContainer = null;
        this.panelTerritoriesHeaderContainer = null; // usefull for the dragNdrop
        this.buttonTerritoriesClose = null;
        this.containerTerritoriesOptions = null;

        this.panelTerritoriesEntriesContainer = null;
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

        var picto = this.buttonTerritoriesShow = this._createShowTerritoriesPictoElement();
        container.appendChild(picto);

        // panel
        var territoriesPanel = this.panelTerritoriesContainer = this._createTerritoriesPanelElement();
        territoriesPanel.classList.add("tiles-direction");
        territoriesPanel.classList.add("tiles-" + this.options.tiles);
        var territoriesPanelDiv = this._createTerritoriesPanelDivElement();
        territoriesPanel.appendChild(territoriesPanelDiv);
        
        
        // container for the custom code
        var territoriesEntriesDiv = this.panelTerritoriesEntriesContainer = this._createTerritoriesElement();
        territoriesEntriesDiv.classList.add("tiles-direction");
        territoriesEntriesDiv.classList.add("tiles-" + this.options.tiles);
        if (this.options.reduce) {
            territoriesEntriesDiv.classList.add("tiles-reduce");
        }
        if (this.options.thumbnail) {
            territoriesEntriesDiv.classList.add("tiles-thumbnail");
        } else {
            territoriesEntriesDiv.classList.add("tiles-icon");
        }
        territoriesPanel.appendChild(territoriesEntriesDiv);
        
        // header ?
        if (this.options.panel) {
            var territoriesPanelHeader = this.panelTerritoriesHeaderContainer = this._createTerritoriesPanelHeaderElement();
            // icone
            var territoriesPanelIcon = this._createTerritoriesPanelIconElement();
            territoriesPanelHeader.appendChild(territoriesPanelIcon);
            // title
            var territoriesPanelTitle = this._createTerritoriesPanelTitleElement(this.options.title);
            territoriesPanelHeader.appendChild(territoriesPanelTitle);
            // options
            if (this.options.upload && this.options.upload.active) {
                var territoriesPanelOptions = this.containerTerritoriesOptions = this._createTerritoriesPanelOptionsElement(this.options.upload.title, this.options.upload.description);
                territoriesPanelHeader.appendChild(territoriesPanelOptions);
            }
            // close picto
            var territoriesCloseBtn = this.buttonTerritoriesClose = this._createTerritoriesPanelCloseElement();
            territoriesPanelHeader.appendChild(territoriesCloseBtn);
            territoriesPanelDiv.appendChild(territoriesPanelHeader);
        }

        container.appendChild(territoriesPanel);

        logger.log(container);

        return container;
    }

    /**
     * Close panel option
     */
    closePanelUpLoad () {
        this.containerTerritoriesOptions.children[0].click();
    }

    // ################################################################### //
    // ######################## event dom ################################ //
    // ################################################################### //

    /**
     * ...
     * @param {*} e - ...
     */
    onShowTerritoriesClick (e) {
        if (e.target.ariaPressed === "true") {
            this.onPanelOpen();
        }
        logger.trace(e);
        this.collapsed = !this.collapsed;
    }

    /**
     * ...
     * @param {*} e - ...
     */
    onCloseTerritoriesClick (e) {
        logger.trace(e);
    }

    /**
     * ...
     * @param {*} e - ...
     * @param {*} id - ...
     * @todo ...
     */
    onImageTerritoriesClick (e, id) {
        logger.trace(e, id);
        var territory = this.territories.find(e => e.data.id === id);
        if (territory) {
            var zoom = territory.data.zoom;
            var bbox = territory.data.bbox; // [left, bottom, right, top]
            var point = territory.data.point;
            if (bbox && !bbox.length) {
                return;
            }
            if (!point && !bbox) {
                return;
            }

            var map = this.getMap();
            var proj = map.getView().getProjection().getCode();
            if (bbox) {
                var extent = olTransformExtentProj(bbox, "EPSG:4326", proj);
                map.getView().fit(extent, map.getSize());
            }
            if (point) {
                var coord = olTransformProj(point, "EPSG:4326", proj);
                map.getView().setCenter(coord);
            }
            if (zoom) {
                map.getView().setZoom(zoom);
            }
            this.setCollapse(true);
            /**
             * event triggered when a territory is clicked
             *
             * @event territories:change
             * @property {Object} type - event
             * @property {Object} target - instance Territories
             * @property {Object} territory - territory
             * @example
             * Route.on("territories:change", function (e) {
             *   console.log(e.target.getData());
             * })
             */
            this.dispatchEvent({
                type : "territories:change",
                territory : territory
            });
        }
    }

    /**
     * ...
     * @param {*} e  - ...
     */
    onUploadFileClick (e) {
        var file = e.target.files[0];
        var target = e.target;
        if (!file) {
            logger.warn("Missing file to upload !");
            return;
        }
        var fReader = new FileReader();
         
        // Définition des fonctions de callbacks associées au reader
        var self = this;
        /** 
         * on readAsText error 
         * @param {*} e  - ...
         * @private
         */
        fReader.onerror = (e) => {
            logger.log("onerror");
        };
        /** on readAsText progress 
         * @param {*} e  - ...
         * @private
         */
        fReader.onprogress = (e) => {
            logger.log("onprogress");
        };
        /** on load start 
         * @param {*} e  - ...
         * @private
         */
        fReader.onloadstart = (e) => {
            logger.log("onloadstart");
        };
        /** on readAsText abort 
         * @param {*} e  - ...
         * @private
         */
        fReader.onabort = (e) => {
            logger.log("onabort");
        };
        /** on readAsText loadend 
         * @param {*} e  - ...
         * @private
         */
        fReader.onloadend = (e) => {
            logger.log("onloadend : ", e);
        };
        /** on readAsText load 
         * @param {*} e  - ...
         * @private
         */
        fReader.onload = (e) => {
            logger.log("file content : ", e.target.result);

            // on ferme le panneau
            self.closePanelUpLoad(target);
            // on convertie string -> json
            var config = JSON.parse(e.target.result);
            if (!self.append) {
                // on nettoie l'ancienne configuration
                self.removeTerritories();
            }
            // et, on en ajoute une autre
            self.setTerritories(config);
        };

        // Lecture du fichier chargé à l'aide de fileReader
        fReader.readAsText(file);
    }

    /**
     * ...
     * @param {*} e  - ...
     */
    onUploadToggleClick (e) {
        // INFO
        // la configuration des territoires doit elle être ajoutée
        // à la liste courrante ou remplacée ?
        this.append = e.target.checked;
    }

};

// on récupère les méthodes de la classe DOM
Object.assign(Territories.prototype, TerritoriesDOM);
Object.assign(Territories.prototype, Widget);

export default Territories;

// Expose Export as ol.control.Territories (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.Territories = Territories;
}
