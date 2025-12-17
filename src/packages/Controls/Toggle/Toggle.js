// import CSS
import "../../CSS/Controls/Toggle/GPFtoggle.scss";
import Control from "../Control";
import Logger from "../../Utils/LoggerByDefault";
import Helper from "../../Utils/Helper";
import BaseEvent from "ol/events/Event";

var logger = Logger.getLogger("toggle");

/**
 * @classdesc
 * Contrôle de base créant un toggle simple, sans interaction ou contenu.
 *
 * @alias ol.control.Toggle
 * @module Toggle
 */
class Toggle extends Control {

    /**
     * Constructeur du contrôle Toggle.
     * @constructor
     * @param {ToggleOptions} options Options du constructeur
     * @fires change:active
     */
    constructor (options) {
        options = options || {};
        super(options);

        // Initialise le composant
        this._initialize(options);
      
        // Initialise le conteneur
        this._initContainer(options);

        // Initialise les événements liés au conteneur et au contrôle
        this._initEvents(options);
    }

    setMap (map) {
        super.setMap(map);
    }

    /**
     * Active ou désactive le contrôle (désactive l'input / bouton).
     * @param {Boolean} active Indique si le contrôle doit être activé ou non
     * @param {Boolean} [silent] Si vrai, n'envoie pas d'événement `change:active`
     * @fires Toggle#change:active
     * @public
     */
    setActive (active, silent) {
        this.set("active", active, silent);
        this.button.setAttribute(this.ariaAttribute, active);
    }

    /**
     * Active ou désactive le contrôle (désactive l'input / bouton).
     * @returns {Boolean} Vrai si le bouton est pressé
     * @public
     */
    getActive () {
        // return this.button.getAttribute(this.ariaAttribute) === "true";
        return this.get("active");
    }

    /**
     * Change l'état du toggle.
     * Le paramètre force permet de n'appliquer que l'activation / la désactivation du toggle.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle} Inspiré de la méthode Element.classList.toggle.
     * @param {Boolean} force Force l'activation / désactivation du toggle si donné.
     * @returns {Boolean} Vrai si le toggle est activé, faux sinon.
     */
    toggleActive (force) {
        if (force !== undefined) {
            this.setActive(force);
        } else {
            this.setActive(!this.getActive());
        }
        return this.getActive();
    }

    /**
     * Initialise le contrôle Toggle (appelé par le constructeur).
     * @protected
     * @param {ToggleOptions} options Options du constructeur
     */
    _initialize (options) {
        this.set("active", false);
        this.ariaAttribute = "aria-pressed";
        /**
         * Nom de la classe (heritage)
         * @private
         */
        this.CLASSNAME = "Toggle";
    }

    /**
     * Ajoute les écouteurs d'événements sur les éléments du contrôle.
     * @protected
     * @param {ToggleOptions} options Options du constructeur
     */
    _initEvents (options) {
        this.element.addEventListener("click", this._onButtonClick.bind(this));
    }

    /**
     * Initialise le conteneur DOM principal du contrôle.
     * @protected
     * @param {ToggleOptions} options Options du constructeur
     */
    _initContainer (options) {
        this.element = document.createElement("div");
        this.element.id = Helper.getUid("GPToggleControl-");
        this.element.classList.add("GPwidget", "gpf-widget", "GPToggleControl");

        this.button = document.createElement("button");
        this.button.id = Helper.getUid("GPToggleButton-");
        this.button.className = "GPToggleButton gpf-btn fr-btn fr-btn--tertiary-no-outline";

        Helper.setIcon(this.button, options.icon, options.label);

        if (options.title) {
            this.set("title", options.title);
            this.button.title = options.title;
        }
        if (options.label) {
            this.button.textContent = options.label;
            this.set("aria-label", options.label);
            this.button.ariaLabel = options.label;
        }
        this.element.appendChild(this.button);
    }

    /**
     * Gère le clic sur le bouton
     * @param {PointerEvent} e Événement au clic sur le bouton
     */
    _onButtonClick (e) {
        this.setActive(!this.getActive());
    }    

}

export default Toggle;

// Expose Toggle as ol.control.Toggle (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.Toggle = Toggle;
}
