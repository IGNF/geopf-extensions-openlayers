// import CSS
import "../../CSS/Controls/ControlList/GPFcontrolList.css";
// import OpenLayers
import Widget from "../Widget";
import Control from "../Control";
import Map from "ol/Map";
// import local
import Logger from "../../Utils/LoggerByDefault";
import Utils from "../../Utils/Helper";
import SelectorID from "../../Utils/SelectorID";
import Draggable from "../../Utils/Draggable";
import Interactions from "../Utils/Interactions";
// import local with ol dependencies
import checkDsfr from "../Utils/CheckDsfr";

// DOM
import ControlListDOM from "./ControlListDOM";
import PanelDOM from "../PanelDOM";

var logger = Logger.getLogger("controlList");
/**
 * @typedef {Object} ControlListOptions
 * @property {boolean} [collapsed=true] - Définit si le widget est replié au chargement.
 * @property {boolean} [draggable=false] - Permet de déplacer le panneau du widget.
 * @property {boolean} [sortable=false] - Ajoute une interaction pour modifier l'ordre des contrôles
 * @property {boolean} [header=true] - Ajoute ou non un header (titre + bouton fermer)
 * @property {string} [position] - Position CSS du widget sur la carte.
 * @property {string|number} [id] - Identifiant unique du widget.
 * @property {HTMLElement} [controlCatalogElement] - Élément DOM à afficher en pied de panneau (ex : bouton catalogue).
 * @property {boolean} [gutter] - Ajoute ou retire l’espace autour du panneau.
 */

/**
 * @classdesc
 *
 * ControlList Control.
 *
 * @alias ol.control.ControlList
 * @module ControlList
 * 
 */
class ControlList extends Control {

    /**
     * @constructor
     * @param {ControlListOptions} options - ControlList control options
     */
    constructor (options) {
        options = options || {};

        // call ol.control.Control constructor
        super(options);

        if (!(this instanceof ControlList)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        if (options.controlCatalogElement) {
            this.controlCatalogElement = options.controlCatalogElement;
        } else {
            this.controlCatalogElement = null;
        }

        /**
         * Nom de la classe (heritage)
         * @private
         */
        this.CLASSNAME = "ControlList";

        // initialisation du composant
        this.initialize(options);
        // // Widget main DOM container
        this._container = this._initContainer();

        // ajout du container
        (this.element) ? this.element.appendChild(this._container) : this.element = this._container;

        return this;
    }

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
                    this._ControlListPanelContainer,
                    this._ControlListPanelHeaderContainer,
                    map.getTargetElement()
                );
            }

            // mode "collapsed"
            if (!this.collapsed) {
                this._pictoControlListButton.setAttribute("aria-pressed", true);
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
    // ##################### public methods ############################## //
    // ################################################################### //

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
            logger.log("[ERROR] ControlList:setCollapsed - missing collapsed parameter");
            return;
        }
        if ((collapsed && this.collapsed) || (!collapsed && !this.collapsed)) {
            return;
        }
        this._pictoControlListButton.click();
    }

    /**
     * Get container
     *
     * @returns {HTMLElement} container
     */
    getContainer () {
        return this._container;
    }

    /**
     * Clean UI : reinit control
     */
    clean () {
        this._clearIsoInputs();
        // INFO
        // le comportement est surchargé, ceci supprime la couche !?
        // cf. _createIsoPanelFormPointElement()
        this._originPoint.clearResults();
        document.getElementById("GPlocationPoint_1-" + this._uid).style.cssText = "";
        document.getElementById("GPlocationOriginCoords_1-" + this._uid).value = "";
        document.getElementById("GPlocationOrigin_1-" + this._uid).value = "";
        document.getElementById("GPlocationPoint_1-" + this._uid).style.cssText = "";
        document.getElementById("GPlocationOriginPointer_1-" + this._uid).checked = false;
        document.getElementById("GPlocationOrigin_1-" + this._uid).className = "GPlocationOriginVisible gpf-visible";
        document.getElementById("GPlocationOriginCoords_1-" + this._uid).className = "GPlocationOriginHidden gpf-hidden";
        this._currentIsoResults = null;
        this.setLayer();
    }

    // ################################################################### //
    // ##################### init component ############################## //
    // ################################################################### //

    /**
     * Initialize control (called by constructor)
     *
     * @param {Object} options - constructor options
     * @private
     */
    initialize (options) {
        // collapsed
        if (options.collapsed === "true") {
            options.collapsed = true;
        }
        if (options.collapsed === "false") {
            options.collapsed = false;
        }

        // set default options
        this.options = {
            collapsed : true,
            draggable : false,
            sortable : false,
            header : true,
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
         * specify if list is sortable (true) or not (false) */
        this.sortable = this.options.sortable;

        if (this.sortable) {
            this._controlsListSorted = null;
            this._controlsListStateSync = new globalThis.Map();
            this._controlsListStateObserver = null;
        }

        /**
         * @private
         * identifiant du contrôle : 
         * utile pour suffixer les identifiants CSS 
         * (pour gérer le cas où il y en a plusieurs dans la même page) */
        this._uid = this.options.id || SelectorID.generate();
    }

    // ################################################################### //
    // ######################## DOM initialize ########################### //
    // ################################################################### //

    /**
     * initialize component container (DOM)
     * @returns {HTMLElement} DOM element
     *
     * @private
     */
    _initContainer () {
        // creation du container principal
        var container = this._createMainContainerElement();

        var picto = this._pictoControlListButton = this._createShowControlListPictoElement();
        container.appendChild(picto);

        // panneau
        var panel = this._ControlListPanelContainer = this._createControlListPanelElement();

        // header
        if (this.options.header) {
            var header = this._ControlListPanelHeaderContainer = this._createPanelHeaderElement({
                title : "Mes outils",
                btnClassForClose : "GPshowControlListPicto",
            });
            panel.appendChild(header);
        }

        var panelDiv = this._createControlListPanelDivElement();
        panel.appendChild(panelDiv);

        // content
        var content = this._createControlListPanelContentElement();
        panelDiv.appendChild(content);
        // list element
        this._ControlListPanelContentContainer = content.children[0];

        if (this.controlCatalogElement) {
            // footer
            var footer = this._createControlListPanelFooterElement(this.controlCatalogElement);
            panelDiv.appendChild(footer);
        }

        container.appendChild(panel);
        return container;
    }

    // ################################################################### //
    // ####################### handlers events to dom #################### //
    // ################################################################### //

    /**
     * this method is called by event 'click' on 'GPshowControlListPicto' picto
     * (cf. this._createShowControlListPictoElement),
     *
     * @param { Event } e évènement associé au clic
     * @private
     */
    onShowControlListPanelClick () {
        var map = this.getMap();
        var opened = this._pictoControlListButton.ariaPressed;
        this.collapsed = !(opened === "true");
        // on recalcule la position
        if (this.options.position && !this.collapsed) {
            this.updatePosition(this.options.position);
        }
        if (!this.collapsed) {
            let controls = this.getMap().getControls().getArray().filter(control => control.listable);
            if (this.sortable && this._controlsListSorted) {
                // si on a déjà trié la liste, on trie les controles de la map
                let positions = Object.fromEntries(
                    this._controlsListSorted.map((name, index) => [name, index])
                );
                controls.sort((a, b) => positions[a.CLASSNAME] - positions[b.CLASSNAME]);
            }

            controls.forEach(control => {
                let element = this._createControlListPanelControl(control);
                this._ControlListPanelContentContainer.appendChild(element);
            });

            // mode "sortable"
            if (this.sortable) {
                this._createSortableElement(this._ControlListPanelContentContainer);
            }

            this._startControlListStateObserver();
        } else {
            this._stopControlListStateObserver();
            this._ControlListPanelContentContainer.innerHTML = "";
        }
        // on génère nous même l'evenement OpenLayers de changement de propriété
        // (utiliser ol.control.ControlList.on("change:collapsed", function ) pour s'abonner à cet évènement)
        this.dispatchEvent("change:collapsed");
    }

    _registerControlListStateSync (button, listElement) {
        this._controlsListStateSync.set(button, listElement);
    }

    _startControlListStateObserver () {
        if (this._controlsListStateObserver) {
            this._controlsListStateObserver.disconnect();
        }

        this._controlsListStateObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type !== "attributes" || mutation.attributeName !== "aria-pressed") {
                    return;
                }
                const button = mutation.target;
                const listElement = this._controlsListStateSync.get(button);
                if (!listElement) {
                    return;
                }
                const isActive = button.getAttribute("aria-pressed") === "true";
                listElement.classList.toggle("gpf-list-element--active", isActive);
            });
        });

        this._controlsListStateSync.forEach((_, button) => {
            this._controlsListStateObserver.observe(button, {
                attributes : true,
                attributeFilter : ["aria-pressed"]
            });
        });
    }

    _stopControlListStateObserver () {
        if (this._controlsListStateObserver) {
            this._controlsListStateObserver.disconnect();
            this._controlsListStateObserver = null;
        }
        this._controlsListStateSync.clear();
    }

    _onSortedEnd () {
        let listControls = [...this._ControlListPanelContentContainer.children].map(element => element.dataset.name);
        this._controlsListSorted = listControls;
        this.dispatchEvent({
            type : "controllist:sorted",
            list : listControls,
        });
    }

};

// on récupère les méthodes de la classe commune ControlList
Object.assign(ControlList.prototype, PanelDOM);
Object.assign(ControlList.prototype, ControlListDOM);
Object.assign(ControlList.prototype, Widget);

export default ControlList;

// Expose ControlList as ol.control.ControlList (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.ControlList = ControlList;
}
