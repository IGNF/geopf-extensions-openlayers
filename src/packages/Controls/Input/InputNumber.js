import "../../CSS/Controls/Input/GPFinputNumber.scss";
import DefaultInput from "./DefaultInput.js";

/**
 * @typedef {Object} InputConfig
 * @property {HTMLElement} input L'élément input HTML
 * @property {string} label Le label de l'input
 * @property {string} property La propriété flat style correspondante
 */

/**
 * @typedef {Object} SelectConfig
 * @property {HTMLSelectElement} select L'élément select HTML
 * @property {string} label Le label du select
 * @property {string} property La propriété flat style correspondante
 * @property {Object<string, string>} options Les options du select (valeur: libellé)
 */

/**
 * @typedef {Object} InputStyleConfig
 * @property {string} label Le label de l'input
 * @property {string} property La propriété flat style correspondante
 * @property {Object<string, string>} options Les options de la sélection (valeur: libellé)
 */

class InputNumber extends DefaultInput {

    /**
     * Constructeur du contrôle InputNumber
     * @param {InputStyleConfig} options Options du contrôle
     */
    constructor (options = {}) {
        super(options);

        this._initialize(options);
        this._initContainer(options);
        this._initEvents(options);
    }

    /**
     * @param {InputStyleConfig} options Options du constructeur
     * @override
     */
    _initialize (options) {
        super._initialize(options);

        /**
         * @type {Number|null} Nombre retourné par setInterval
         */
        this.addValue = null;
        /**
         * @type {Number|null} Nombre retourné par setTimeout
         */
        this.timeout = null;
        /**
         * @type {Boolean} Vrai si l'utilisateur est en train de cliquer sur un bouton
         */
        this.press = false;
    }


    /**
     * @param {InputStyleConfig} options Options du constructeur
     * @override
     */
    _initContainer (options) {
    // Conteneur boutons
        this.buttons = document.createElement("div");
        this.buttons.className = "input-style__buttons-container";

        // Bouton up
        this.up = document.createElement("button");
        this.up.className = "input-style__button-up fr-btn fr-btn--sm fr-btn--tertiary-no-outline fr-icon-arrow-up-s-fill";
        this.up.tabIndex = -1;
        // Pour gérer l'interaction de mousedown
        this.up.dataset.up = true;
        this.up.ariaHidden = true;

        // Gère l'appui long sur les touches
        this.up.addEventListener("mousedown", this.onButtonMouseDown.bind(this));
        this.up.addEventListener("mouseleave", this.onButtonMouseLeave.bind(this));
        this.up.addEventListener("mouseenter", this.onButtonMouseEnter.bind(this));
        this.up.addEventListener("mouseup", this.onButtonMouseUp.bind(this));

        // Bouton down
        this.down = document.createElement("button");
        this.down.className = "input-style__button-down fr-btn fr-btn--sm fr-btn--tertiary-no-outline fr-icon-arrow-down-s-fill";
        this.down.tabIndex = -1;
        this.down.dataset.up = false;
        this.down.ariaHidden = true;

        // Gère l'appui long sur les touches
        this.down.addEventListener("mousedown", this.onButtonMouseDown.bind(this));
        this.down.addEventListener("mouseleave", this.onButtonMouseLeave.bind(this));
        this.down.addEventListener("mouseenter", this.onButtonMouseEnter.bind(this));
        this.down.addEventListener("mouseup", this.onButtonMouseUp.bind(this));

        // Évite conflit avec setDisabled
        super._initContainer(options);
        this.element.classList.add("input-style-number");
        // Input
        this.input.type = "number";
        this.input.min = 0;

        // Lie les boutons à l'input
        this.up.setAttribute("aria-controls", this.input.id);
        this.down.setAttribute("aria-controls", this.input.id);

        this.buttons.appendChild(this.up);
        this.buttons.appendChild(this.down);

        this.inputContainer.appendChild(this.buttons);
    }

    /**
     * @param {InputStyleConfig} options Options du constructeur
     * @override
     */
    _initEvents (options) {
        super._initEvents(options);
        this.input.addEventListener("change", (e) => this.dispatchEvent(e));
    }

    /**
     * Gère l'événement mousedown les boutons haut et bas
     * @param {MouseEvent} e Événement de souris
     */
    onButtonMouseDown (e) {
        const input = e.target.ariaControlsElements?.[0];
        if (input) {
            const up = e.target.dataset.up;
            // Augmente / diminue la valeur
            this.changeValue(up, input);
        }
        // Ajoute un timeout pour recréer l'effet input number
        this.timeout = setTimeout(() => {
            if (this.press) {
                const input = e.target.ariaControlsElements?.[0];
                if (input) {
                    const up = e.target.dataset.up;
                    // Augmente / diminue la valeur
                    this.addValue = setInterval(this.changeValue, 40, up, input);
                }
            }
        }, 300);
    }

    /**
     * Change la valeur de l'input, en l'augmentant ou diminuant;
     * @param {String} up Si vrai, augmente la valeur. Sinon la décroit
     * @param {HTMLInputElement} input Input du contrôle
     */
    changeValue (up, input) {
        up === "true" ? input.stepUp() : input.stepDown();
        input.dispatchEvent(new Event("change"));
    }

    /**
     * Gère l'événement mouseleave sur les boutons haut et bas
     */
    onButtonMouseLeave () {
        this.press = false;
        clearInterval(this.addValue);
        clearInterval(this.timeout);
        this.addValue = null;
        this.timeout = null;
    }

    /**
     * Gère l'événement mouseenter sur les boutons haut et bas
     */
    onButtonMouseEnter () {
        this.press = true;
        clearInterval(this.addValue);
        clearInterval(this.timeout);
        this.addValue = null;
        this.timeout = null;
    }

    /**
     * Gère l'événement mouseup sur les boutons haut et bas
     */
    onButtonMouseUp () {
        this.press = true;
        clearInterval(this.addValue);
        clearInterval(this.timeout);
        this.addValue = null;
        this.timeout = null;
    }

    setDisabled (bool) {
        super.setDisabled(bool);
        if (bool) {
            this.up.disabled = true;
            this.down.disabled = true;
        } else {
            delete this.up.disabled;
            delete this.down.disabled;
        }
    }

}

export default InputNumber;

// Expose InputNumber as ol.control.InputNumber (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.InputNumber = InputNumber;
} 