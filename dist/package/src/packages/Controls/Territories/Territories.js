// import CSS
import "../../CSS/Controls/Territories/GPFterritories.css";

// import OpenLayers
import Control from "../Control";
import Widget from "../Widget";
import Map from "ol/Map";
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

let logger = Logger.getLogger("territories");

/**
 * @typedef {Object} TerritoriesOptions
 * @property {boolean} [collapsed=true] - Définit si le widget est replié au chargement.
 * @property {boolean} [draggable=false] - Permet de déplacer le panneau du widget.
 * @property {boolean} [panel=true] - Affiche un en-tête (header) dans le panneau.
 * @property {boolean} [auto=false] - Charge automatiquement la liste par défaut des territoires.
 * @property {boolean} [thumbnail=false] - Affiche une imagette pour chaque territoire.
 * @property {boolean} [reduce=false] - Affiche les tuiles en mode réduit (nom uniquement).
 * @property {number} [tiles=3] - Nombre de tuiles affichées (0 = toutes).
 * @property {Array<Territory>} [territories=[]] - Liste personnalisée des territoires à afficher.
 * @property {Object} [upload] - Options pour l’import de configuration.
 * @property {boolean} [upload.active=false] - Active le menu d’import de fichier.
 * @property {string} [upload.title="Ajouter un fichier de configuration"] - Titre du menu d’import.
 * @property {string} [upload.description=""] - Description du menu d’import.
 * @property {Object} [view] - Options pour la configuration des vues.
 * @property {boolean} [view.active=false] - Active le menu de gestion des vues.
 * @property {string} [view.title="Modifier les territoires"] - Titre du menu de gestion des vues.
 * @property {string} [view.description=""] - Description du menu de gestion des vues.
 * @property {string} [title="Sélectionner un territoire"] - Titre affiché dans le panneau.
 * @property {string} [position] - Position CSS du widget sur la carte.
 * @property {boolean} [gutter] - Ajoute ou retire l’espace autour du panneau.
 * @property {string|number} [id] - Identifiant unique du widget.
 */

/**
 * @typedef {Object} Territory
 * @property {string} id - IdenObjecttifiant unique du territoire (ex: FRA, MTQ, GLP, ...).
 * @property {string} title - Titre du territoire.
 * @property {string} description - Description du territoire.
 * @property {Array<number>} bbox - Bbox du territoire au format [minx, miny, maxx, maxy] en EPSG:4326.
 * @property {Array<number>} [point] - Point central du territoire au format [lon, lat] en EPSG:4326.
 * @property {number} [zoom] - Niveau de zoom à appliquer lors de la sélection du territoire.
 * @property {string} [thumbnail] - URL ou data URI de la vignette du territoire (format image tel que PNG, JPEG, SVG).
 * @property {string} [icon] - URL, data URI ou classe CSS DSFR de l’icône du territoire (format vectoriel SVG).
 */

/**Object
 * @classdesc
 *
 * Territories map widget
 *
 * @alias ol.control.Territories
 * @module Territories
*/
class Territories extends Control {
    
    /**
     * @constructor
     * @param {TerritoriesOptions} options - options for function call.
     *
     * @fires territories:loaded
     * @fires territories:change
     * @fires territories:add
     * @fires territories:remove
     * @public
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
     * territories.on("territories:loaded", (e) => { console.log(e.data); });
     * territories.on("territories:add", (e) => { console.log(e); });
     * territories.on("territories:remove", (e) => { console.log(e); });
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
     * @param {Map} map - Map.
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

        /**
         * event triggered when a territory is loaded
         *
         * @event territories:loaded
         * @defaultValue "territories:loaded"
         * @group Events
         * @property {Object} type - event
         * @property {Object} target - instance Territories
         * @example
         * Territories.on("territories:loaded", function (e) {
         *   console.log(e);
         * })
         */
        this.dispatchEvent({
            type : "territories:loaded"
        });
    }

    // ################################################################### //
    // ################### getters / setters ############################# //
    // ################################################################### //

    /**
     * Add a territory
     *
     * @param {Territory} territory  - territory
     * @param {Boolean} [isAdded=false] - specify if territory is added manually with "Add view" button
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
    setTerritory (territory, isAdded = false) {
        // Test if a territory already exist
        var founded = this.territories.some(e => e.data.id === territory.id);
        if (territory && !founded) {
            var entry = this._createTerritoryEntry(territory);
            var view = this._createTerritoryView(territory);
            if (entry && view) {
                this.panelTerritoriesEntriesContainer.appendChild(entry);
                var panelTerritoriesViewsContainer = this.element.querySelector("#gpf-territories-views-listview-entries-id");
                if (panelTerritoriesViewsContainer) {
                    panelTerritoriesViewsContainer.appendChild(view);
                }
                var count = this.element.querySelector("#gpf-territories-views-count-id");
                if (count) {
                    var nb = this.territories.filter(t => !t.isRemoved).length + 1;
                    count.innerText = nb;
                }
                this.territories.push({
                    isRemoved : false,
                    isAdded : isAdded,
                    data : territory,
                    domEntry : entry,
                    domView : view
                });
                return true;
            }
        }
        return false;
    }

    /**
     * Load a new configuration
     * 
     * @param {Array<Territory>} territories - file config
     */
    setTerritories (territories) {
        for (let j = 0; j < territories.length; j++) {
            const territory = territories[j];
            this.setTerritory(territory);
        }
    }

    /**
     * Remove a territory
     *
     * @param {String} territory - territory id (FRA, MTQ, ...)
     * @param {Boolean} [force=false] - force removal even if territory was added manually
     * @returns {Boolean} - true|false
     * @public
     * @example
     * territories.removeTerritory("MTQ"); // id du territoire
     */
    removeTerritory (territory, force = false) {
        var found = false;
        if (territory) {
            for (let i = 0; i < this.territories.length; i++) {
                const o = this.territories[i];
                if (o.data.id === territory.data.id) {
                    this.territories[i].domEntry.remove();
                    this.territories[i].domView.remove();
                    if (!force) {
                        // on ne le supprime pas de la liste des territoires
                        // mais on le masque uniquement
                        this.territories[i].isRemoved = true;
                    } else {
                        // on le supprime de la liste des territoires
                        this.territories.splice(i, 1);
                    }
                    found = true;
                    var count = this.element.querySelector("#gpf-territories-views-count-id");
                    if (count) {
                        var nb = this.territories.filter(t => !t.isRemoved).length;
                        count.innerText = nb;
                    }
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
            territory.domEntry.remove();
            territory.domView.remove();
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
     * @returns {HTMLElement} container
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
            view : {
                active : false,
                title : "Modifier les territoires",
                description : ""
            }, // menu du vues
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

        /** 
         * @type {Boolean} 
         * specify if control is collapsed (true) or not (false) */
        this.collapsed = this.options.collapsed;

        /** 
         * @type {Boolean} 
         * specify if control is draggable (true) or not (false) 
         * */
        this.draggable = this.options.draggable;

        /** 
         * specify if we load the list of territories by default
         * @type {Boolean} */
        this.auto = this.options.auto;
        /**
         * list of object territories
         * @type {Array} 
         * @example
         * {
         *   isRemoved : { Boolean },
         *   isAdded : { Boolean },
         *   domView : { HTMLelment },
         *   domEntry : { HTMLelment },
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
        /** 
         * @type {Object} 
         * upload configuration */
        this.uploadConfig = null;

        /** 
         * @type {Boolean} 
         * specify if a list of object territories must be appended or replaced */
        this.append = false;

        /** @private */
        this.buttonTerritoriesShow = null;
        /** @private */
        this.panelTerritoriesContainer = null;
        /** @private */
        this.panelTerritoriesHeaderContainer = null; // usefull for the dragNdrop
        /** @private */
        this.buttonTerritoriesClose = null;
        /** @private */
        this.containerTerritoriesOptions = null;
        /** @private */
        this.panelTerritoriesEntriesContainer = null;
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

        var picto = this.buttonTerritoriesShow = this._createShowTerritoriesPictoElement();
        container.appendChild(picto);

        // panel
        var territoriesPanel = this.panelTerritoriesContainer = this._createTerritoriesPanelElement();
        territoriesPanel.classList.add("tiles-direction");
        territoriesPanel.classList.add("tiles-" + this.options.tiles);
        
        var territoriesPanelDiv = this._createTerritoriesPanelDivElement();
        territoriesPanel.appendChild(territoriesPanelDiv);
        
        // menu views button
        if (this.options.view && this.options.view.active) {
            var territoriesPanelMenuViewsDiv = this._createTerritoriesPanelMenuViewsDivElement(this.options.view.title, this.options.view.description);
            territoriesPanel.appendChild(territoriesPanelMenuViewsDiv);
        }

        // INFO
        // Les territoires seront ajoutés dans ce conteneur
        // au moment de l'appel de la méthode setTerritory()
        // ou setTerritories() dans SetMap()

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
     * @private
     */
    closePanelUpLoad () {
        // document.getElementById("gpf-territories-upload-container-id")
        var button = this.containerTerritoriesOptions.children[0];
        if (button) {
            button.setAttribute("aria-expanded", "false");
        }
        var dialog = this.containerTerritoriesOptions.children[1];
        if (dialog) {
            dialog.classList.add("gpf-hidden");
            dialog.classList.remove("gpf-visible");
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
    onShowTerritoriesClick (e) {
        if (e.target.ariaPressed === "true") {
            this.onPanelOpen();
        }
        logger.trace(e);
        this.collapsed = !this.collapsed;
    }

    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    onCloseTerritoriesClick (e) {
        logger.trace(e);
    }

    /**
     * ...
     * @param {Event} e - ...
     * @param {*} id - ...
     * @private
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
                map.getView().fit(extent, {
                    size : map.getSize()
                });
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
             * @defaultValue "territories:change"
             * @group Events
             * @property {Object} type - event
             * @property {Object} target - instance Territories
             * @property {Object} territory - territory
             * @example
             * Territories.on("territories:change", function (e) {
             *   console.log(e.target.getData());
             * })
             */
            this.dispatchEvent({
                type : "territories:change",
                territory : territory.data
            });
        }
    }

    /**
     * ...
     * @param {Event} e - ...
     * @private
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

            try {
                // on convertie string -> json
                self.uploadConfig = JSON.parse(e.target.result);
                if (!self.uploadConfig) {
                    console.error("Invalid configuration file !");
                    return;
                }
            } catch (err) {
                console.error("Error parsing configuration file : ", err);
                return;
            }
        };

        // Lecture du fichier chargé à l'aide de fileReader
        fReader.readAsText(file);
    }

    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    onUploadToggleClick (e) {
        // INFO
        // la configuration des territoires doit elle être ajoutée
        // à la liste courrante ou remplacée ?
        this.append = e.target.checked;
    }

    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    onApplyTerritoriesClick (e) {
        logger.trace(e);
        // on ferme le panneau
        this.closePanelUpLoad();
        if (!this.uploadConfig) {
            logger.error("No configuration to apply !");
            return;
        }
        if (!this.append) {
            // on nettoie l'ancienne configuration
            this.removeTerritories();
        }
        // et, on en ajoute une autre
        this.setTerritories(this.uploadConfig);
    }

    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    onShowTerritoriesViewsClick (e) {
        logger.trace(e);
    }

    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    onCloseTerritoriesViewsClick (e) {
        logger.trace(e);
        // on ferme le panneau des options
        this.closePanelUpLoad();
    }

    /**
     * ...
     * @param {Event} e - ...
     * @param {String} viewName - ...
     * @private
     */
    onAddTerritoriesViewClick (e, viewName) {
        logger.trace(e, viewName);
        var id = Math.abs(Array.from(viewName).reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0));
        var view = this.getMap().getView();
        var proj = view.getProjection().getCode();
        var coord = olTransformProj(view.getCenter(), proj, "EPSG:4326");
        var zoom = view.getZoom();
        var territory = {
            "id" : id.toString(),
            "title" : viewName,
            "description" : "Vue personnalisée",
            "point" : coord,
            "zoom" : zoom,
            "thumbnail" : "",
            "icon" : "fr-icon-map-pin-2-line" // icone DSFR ou svg
        };
        this.setTerritory(territory, true);
        /**
         * event triggered when a territory is added
         *
         * @event territories:add
         * @defaultValue "territories:add"
         * @group Events
         * @property {Object} type - event
         * @property {Object} target - instance Territories
         * @property {Object} territory - territory
         * @example
         * Territories.on("territories:add", function (e) {
         *   console.log(e.territory);
         * })
         */
        this.dispatchEvent({
            type : "territories:add",
            territory : territory
        });
    }

    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    onResetTerritoriesViewClick (e) {
        logger.trace(e);
        // On supprime tous les territoires ajoutées manuellement via le bouton "Ajouter une vue"
        // et on recharge la liste initiale
        var territories = [...this.territories];
        for (let index = 0; index < territories.length; index++) {
            const territory = territories[index];
            if (territory.isAdded) {
                this.removeTerritory(territory, true);
            } else {
                // on ré-affiche les territoires non supprimés
                if (territory.isRemoved) {
                    this.panelTerritoriesEntriesContainer.appendChild(territory.domEntry);
                    var panelTerritoriesViewsContainer = this.element.querySelector("#gpf-territories-views-listview-entries-id");
                    if (panelTerritoriesViewsContainer) {
                        panelTerritoriesViewsContainer.appendChild(territory.domView);
                    }
                    territory.isRemoved = false;
                }
            }
        }
        // mise à jour du compteur des vues
        var count = this.element.querySelector("#gpf-territories-views-count-id");
        if (count) {
            var nb = this.territories.filter(t => !t.isRemoved).length;
            count.innerText = nb;
        }
    }

    /**
     * ...
     * @param {Event} e - ...
     * @param {*} id - ...
     * @private
     */
    onViewTerritoryClick (e, id) {
        logger.trace(e, id);
    }

    /**
     * ...
     * @param {Event} e - ...
     * @param {*} id - ...
     * @private
     */
    onViewTerritoryRemoveClick (e, id) {
        logger.trace(e, id);
        var territory = this.territories.find(e => e.data.id === id);
        if (territory) {
            // on le supprime définitivement pour les vues personnalisées
            // mais on masque uniquement pour les territoires par défaut
            this.removeTerritory(territory, territory.isAdded);
            /**
             * event triggered when a territory is removed
             *
             * @event territories:remove
             * @defaultValue "territories:remove"
             * @group Events
             * @property {Object} type - event
             * @property {Object} target - instance Territories
             * @property {Object} territory - territory
             * @example
             * Territories.on("territories:remove", function (e) {
             *   console.log(e.territory);
             * })
             */
            this.dispatchEvent({
                type : "territories:remove",
                territory : territory.data
            });
        }
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
