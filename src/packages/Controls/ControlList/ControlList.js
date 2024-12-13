// import CSS
import "../../CSS/Controls/ControlList/GPFcontrolList.css";
// import OpenLayers
import Widget from "../Widget";
import Control from "../Control";

// import geoportal library access
import Gp from "geoportal-access-lib";
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

var logger = Logger.getLogger("controlList");

/**
 * @classdesc
 *
 * ControlList Control.
 *
 * @constructor
 * @alias ol.control.ControlList
 * @type {ol.control.ControlList}
 * @extends {ol.control.ControlList}
 * @param {Object} options - ControlList control options
 */
var ControlList = class ControlList extends Control {

    /**
     * See {@link ol.control.ControlList}
     * @module ControlList
     * @alias module:~controls/ControlList
     * @param {*} options - options
     * @example
     * import ControlList from from "gpf-ext-ol/controls/ControlList"
     * ou
     * import { ControlList } from "gpf-ext-ol"
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
     * @param {ol.Map} map - Map.
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
        if (collapsed) {
            document.getElementById("GPcontrolListPanelClose-" + this._uid).click();
        } else {
            this._pictoIsoButton.click();
        }
        this.collapsed = collapsed;
    }

    /**
     * Get container
     *
     * @returns {DOMElement} container
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
        };

        // merge with user options
        Utils.assign(this.options, options);

        /** {Boolean} specify if control is collapsed (true) or not (false) */
        this.collapsed = this.options.collapsed;

        /** {Boolean} specify if control is draggable (true) or not (false) */
        this.draggable = this.options.draggable;

        // identifiant du contrôle : utile pour suffixer les identifiants CSS (pour gérer le cas où il y en a plusieurs dans la même page)
        this._uid = this.options.id || SelectorID.generate();
    }

    // ################################################################### //
    // ######################## DOM initialize ########################### //
    // ################################################################### //

    /**
     * initialize component container (DOM)
     * @returns {DOMElement} DOM element
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
        var panelDiv = this._createControlListPanelDivElement();
        panel.appendChild(panelDiv);

        // header
        var header = this._ControlListPanelHeaderContainer = this._createControlListPanelHeaderElement();
        panelDiv.appendChild(header);

        // content
        var content = this._ControlListPanelContentContainer = this._createControlListPanelContentElement();
        panelDiv.appendChild(content);

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
     * @param { event } e évènement associé au clic
     * @private
     */
    onShowControlListPanelClick (e) {
        if (e.target.ariaPressed === "true") {
            this.onPanelOpen();
        }
        var map = this.getMap();
        // on supprime toutes les interactions
        Interactions.unset(map);
        var opened = this._pictoControlListButton.ariaPressed;
        this.collapsed = !(opened === "true");
        // on génère nous même l'evenement OpenLayers de changement de propriété
        // (utiliser ol.control.ControlList.on("change:collapsed", function ) pour s'abonner à cet évènement)
        this.dispatchEvent("change:collapsed");
        // on recalcule la position
        if (this.options.position && !this.collapsed) {
            this.updatePosition(this.options.position);
        }
        if (!this.collapsed) {
            const controls = this.getMap().getControls().getArray();
            controls.forEach(control => {
                if (control.listable) {
                    let element = this._createControlListPanelControl(control);
                    this._ControlListPanelContentContainer.appendChild(element);
                }
            });
        } else {
            this._ControlListPanelContentContainer.innerHTML = "";
        }
    }

};

// on récupère les méthodes de la classe commune ControlList
Object.assign(ControlList.prototype, ControlListDOM);
Object.assign(ControlList.prototype, Widget);

export default ControlList;

// Expose ControlList as ol.control.ControlList (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.ControlList = ControlList;
}
