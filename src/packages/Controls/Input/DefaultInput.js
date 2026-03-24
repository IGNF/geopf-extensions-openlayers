import ControlExtended from "../Control.js";
import Helper from "../../Utils/Helper.js";
import "../../CSS/Controls/Input/GPFdefaultInput.scss";

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
 * @property {string} labelInfo Info supplémentaire du label (ex: unité)
 * @property {string} property La propriété flat style correspondante
 * @property {string} type Type de l'input
 * @property {Object<string, string>} options Les options de la sélection (valeur: libellé)
 */

/**
 * @fires change Changement de valeur pour le 
 */
class DefaultInput extends ControlExtended {

    /**
     * Constructeur du contrôle DefaultInput
     * @param {InputStyleConfig} options Options du contrôle
     */
    constructor (options = {}) {
        super(options);

        this._initialize(options);
        this._initContainer(options);
        this._initEvents(options);
    }

    /**
     * @param {InputStyleConfig} options Options du contrôle
     * @override
     */
    _initialize (options) {
        super._initialize(options);
        this.property = options.property;
        this.type = options.type;
    }

    /**
     * @param {InputStyleConfig} options Options du contrôle
     * @override
     */
    _initContainer (options) {
        super._initContainer(options);
        // Création de la structure du formulaire
        // Conteneur englobant qui contiendra la grille et le bouton
        this.element = document.createElement("div");
        this.element.className = "input-style";
        this.element.id = Helper.getUid("input-style");
        this.element.dataset.property = options.property;

        const inputId = Helper.getUid("input-style__input");
        const labelId = Helper.getUid("input-style__label");

        // Label
        this.label = document.createElement("label");
        this.label.className = "input-style__label fr-label";
        this.label.id = labelId;
        this.label.textContent = options.label;
        if (options.labelInfo) {
            const labelInfo = document.createElement("span");
            labelInfo.className = "fr-hint-text";
            labelInfo.textContent = options.labelInfo;
            this.label.appendChild(labelInfo);
        }
        this.label.htmlFor = inputId;

        // Conteneur de l'input
        this.inputContainer = document.createElement("div");
        this.inputContainer.className = "input-style__container";

        // Input
        this.input = document.createElement("input");
        this.input.id = inputId;
        this.input.className = "input-style__input";
        if (this.type) {
            this.input.type = options.type;
        }

        this.setDisabled(options.disabled);

        // Assembler la structure
        this.element.appendChild(this.label);
        this.element.appendChild(this.inputContainer);

        this.inputContainer.appendChild(this.input);
    }

    /**
     * @param {InputStyleConfig} options Options du contrôle
     * @override
     */
    _initEvents (options) {
        super._initEvents(options);
        this.input.addEventListener("change", (e) => this.dispatchEvent(e));
    }

    /**
     * Désactive / active l'input.
     * @param {Boolean} bool Vrai si l'input doit être désactivé
     */
    setDisabled (bool) {
        this.set("disabled", !!bool);
        if (bool) {
            this.element.classList.add(`input-style--disabled`);
            this.input.disabled = true;
        } else {
            this.element.classList.remove(`input-style--disabled`);
            this.input.disabled = false;
        }
    }

    /**
     * Retourne l'élément
     * @returns {HTMLElement} Élément principal
     */
    getElement () {
        return this.element;
    }

    /**
     * Retourne l'input
     * @returns {HTMLInputElement} Input du contrôle
     */
    getInput () {
        return this.input;
    }

}

export default DefaultInput;

// Expose DefaultInput as ol.control.DefaultInput (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.DefaultInput = DefaultInput;
} 