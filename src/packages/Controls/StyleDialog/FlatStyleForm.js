import ControlExtended from "../Control.js";
import Helper from "../../Utils/Helper.js";
import { createDefaultStyle } from "ol/style/flat.js";
import "../../CSS/Controls/StyleDialog/GPFflatStyleForm.scss";
import InputNumber from "../Input/InputNumber.js";
import DefaultInput from "../Input/DefaultInput.js";
import CustomSelect from "../Input/CustomSelect.js";
import CustomSelectGrid from "../Input/CustomSelectGrid.js";
import InputColor from "../Input/InputColor.js";

/**
 * @typedef {Object} InputConfig Configuration pour un type input
 * @property {String} label Le label de l'input
 * @property {String} property La propriété flat style correspondante
 * @property {String|Object} type Le type de l'input.
 * Il faut passer par l'attribut `input` pour ajouter un input personnalisé.* En fonction du type, l'input sera soit un élément HTML de type `input` / `select`
 * , ou bien un enfant de {@link DefaultInput}.
 * Certaines valeurs de l'attributs changent le type d'input créé :
 * - `type : number` : Créé un élément de type {@link InputNumber};
 * - `type : color` : Créé un élément de type {@link InputColor};
 * - `type : default` : Créé un élément de type {@link DefaultInput};
 * - `type : pattern` : Créé un élément de type {@link CustomSelectGrid};
 * - `type : input` : Créé un élément HTML {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input | input} de type `text`;
 * - `type : textarea` : Créé un élément HTML {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/textarea | textarea};
 * - `type : select` : Créé un élément HTML {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select | select}.
 * Créé par défaut un élémént de type {@link CustomSelect}.
 * @property {Object<String, String>} options Options de la sélection (valeur: libellé)
 * @property {Object} [input] Objet / classe permettant d'ajouter un input.
 * L'objet doit avoir une méthode `getInput()` et `getElement()` pour les inputs personnalisés.
 * @property {Boolean} [disabled=false] Si vrai, désactive l'input
 * @property {Object} [attributes] Attributs supplémentaires à ajouter sur l'élément input / select.
 * @property {Object} [placeholder] `type : select` seulement. Texte du placeholder.
 * @property {string} [labelInfo] `type:number` seulement. Info supplémentaire du label (ex: unité)
 */

/**
 * @typedef {Object} FlatStyleFormConfig Configuration d'un formulaire de style.
 * @property {Boolean} [hasbutton] Indique si le formulaire a un bouton de validation.
 */

/**
 * @classdesc
 * Classe représentant un formulaire de style.
 * Un input peut être ajouté via la méthode `addInput(config)`.
 * Le paramètre `config.type` définit le type d'objet créé :
 * 
 * - `type : number` : Créé un élément de type {@link InputNumber};
 * - `type : color` : Créé un élément de type {@link InputColor};
 * - `type : default` : Créé un élément de type {@link DefaultInput};
 * - `type : pattern` : Créé un élément de type {@link CustomSelectGrid};
 * - `type : input` : Créé un élément HTML {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input | input} de type `text`;
 * - `type : textarea` : Créé un élément HTML {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/textarea | textarea};
 * - `type : select` : Créé un élément HTML {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select | select}.
 * Créé par défaut un élémént de type {@link CustomSelect}.
 * 
 * @extends ControlExtended
 */
class FlatStyleForm extends ControlExtended {

    /**
     * Constructeur du contrôle FlatStyleForm
     * @param {FlatStyleFormConfig} options - Options du contrôle
     */
    constructor (options = {}) {
        super(options);

        /**
         * Collection des inputs indexés par leur propriété
         * @type {Object<String, DefaultInput|HTMLInputElement>}
         */
        this.inputs = {};

        // Création de la structure du formulaire
        // Conteneur englobant qui contiendra la grille et le bouton
        this.container = document.createElement("div");
        this.container.className = "style-form-container";

        // Div de la grille pour les inputs/selects
        this.element = document.createElement("div");
        this.element.className = "style-form";

        if (options.hasbutton) {
            // Bouton de validation
            this.submitButton = document.createElement("button");
            this.submitButton.className = "fr-btn fr-btn--primary";
            this.submitButton.textContent = "Valider";
            this.submitButton.type = "button";

            // Ajouter l'événement de soumission
            this.submitButton.addEventListener("click", () => {
                this.onSubmit();
            });
        }

        this.flatStyle = createDefaultStyle();

        // Assembler la structure
        this.container.appendChild(this.element);
        if (options.hasbutton) {
            this.container.appendChild(this.submitButton);
        }
    }

    /**
     * Gestionnaire de soumission du formulaire.
     * Récupère les valeurs de tous les inputs et leurs propriétés associées.
     * @returns {Object} Valeur des inputs avec leurs propriétés associées
     * @protected
     */
    onSubmit () {
        const values = {};

        // Boucler sur chaque input/select
        Object.entries(this.inputs).forEach(([property, elem]) => {
            // Récupérer l'élément (input ou select)
            let input;
            if (elem instanceof DefaultInput || elem.getInput) {
                input = elem.getInput();
            } else {
                input = elem;
            }

            if (input) {
                // Récupérer la valeur
                values[property] = parseFloat(input.value) ? parseFloat(input.value) : input.value;
            }
        });

        const flatStyle = Object.assign({}, this.flatStyle, values);

        console.log("Valeurs du formulaire:", values);

        // Prévenir que le style a changé
        this.dispatchEvent({ type : "style", flatStyle : flatStyle });

        return values;
    }

    /**
     * Initialise les valeurs des inputs à partir d'un style flat
     * @param {Object} flatStyle - Le style flat utilisé pour initialiser les inputs
     * @public
     */
    setFlatStyle (flatStyle) {
        this.flatStyle = flatStyle;

        Object.entries(this.inputs).forEach(([property, elem]) => {
            const input = elem.getInput ? elem.getInput() : elem;
            const value = this.flatStyle[property];
            input.value = value !== undefined ? value : input.value;
            // Pour déclencher les éventuels écouteurs de changement
            // cancelable:true pour ne pas envoyer d'événement "style"
            input.dispatchEvent(new Event("change", { bubbles : true, cancelable : true }));
            if (elem instanceof InputColor) {
                elem.setColor(value);
            }
        });
    }

    /**
     * Ajoute un input au formulaire de style.
     * En fonction du paramètre `type`, l'élément créé sera différent.
     * 
     * @see {@link InputConfig} pour plus d'informations sur le paramètre de construction.
     * 
     * @param {InputConfig} config Config pour la construction de l'input.
     * @returns {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement|DefaultInput} Input créé. Cela n'est pas nécessairement l'élément `input`, mais peut être l'objet créé.
     */
    addInput (config) {
        let input;
        let elem;
        // Pour ne pas ajouter l'élément après
        let appendChild = true;
        const type = config.type;
        // Ajouter d'autres types ici au besoin
        switch (type) {
            case "number":
                elem = new InputNumber(config);
                break;
            case "color":
                elem = new InputColor(config);
                break;
            case "input":
            case "textarea":
            case "select":
                input = this._addInputElement(config);
                appendChild = false;
                break;
            case "pattern":
                elem = new CustomSelectGrid(config);
                break;
            case "default":
                elem = new DefaultInput(config);
                break;
            default:
                // Input personnalisé héritant de Default Input
                if (config.input instanceof DefaultInput) {
                    elem = config.input;
                }
                // Input personnalisé, n'héritant pas de DefaultInput
                else if (typeof config.input === "object" && config.input.getInput && config.input.getElement) {
                    input = this._addInputElement(config);
                    appendChild = false;
                }
                else {
                    elem = new CustomSelect(config);
                }
                break;
        }
        if (appendChild) {
            input = elem.getInput();
            this.element.appendChild(elem.getElement());
        }

        const property = config.property;

        // Envoie un événement `style` au changement de l'input
        input.addEventListener("change", (e) => {
            !e.cancelable && this.dispatchEvent({ type : "style", property : property, value : e.target.value });
        });

        // Garde en mémoire la valeur de retour (elem pour les objets, input pour les balises HTML)
        const returnValue = elem || input;
        this.inputs[property] = returnValue;
        return returnValue;
    }


    /**
     * Ajoute un input simple au formulaire.
     * Si `config.type` est un objet, utilise les méthodes `getInput` et `getElement` de cet objet pour 
     * 
     * @param {InputConfig} config Config pour la construction de l'input.
     * @returns {HTMLInputElement} Input créé.
     * @private
     */
    _addInputElement (config) {
        const { label, property, type, placeholder } = config;

        // Initialise les options
        const options = config.options ? config.options : {};
        const customInput = config.input;

        const typeName = type === "select" ? type : "input";

        // Générer des IDs uniques
        const inputId = Helper.getUid(`${typeName}`);
        const groupId = Helper.getUid(`${typeName}-group`);
        const messagesId = `${inputId}-messages`;

        // Créer le conteneur principal
        const container = document.createElement("div");
        container.className = `fr-${typeName}-group`;
        container.dataset.property = property;
        container.id = groupId;

        // Créer le label
        const labelElement = document.createElement("label");
        labelElement.className = "fr-label input-style__label";
        labelElement.htmlFor = inputId;
        labelElement.textContent = label;
        
        // Ajoute le label
        container.appendChild(labelElement);

        /**
         * @type {HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement}
        */
        let input;
        /**
         * @type {HTMLElement}
        */
        let element;
        // Input specifique (objet)
        const userInput = (typeof customInput === "object" && customInput.getInput && customInput.getElement);
        if (userInput) {
            // Récupère l'input et l'élément
            input = customInput.getInput();
            element = customInput.getElement();
            const id = element.id;
            labelElement.htmlFor = id;
            // Ajoute un événement sur le label (pour bien focus sur l'input)
            labelElement.addEventListener("click", () => {
                element.focus({ focusVisible : true });
            });
        } else if (type !== "select") {
            // Input standard, de type text ou textarea
            if (type === "textarea") {
                input = document.createElement(type);
            } else {
                input = document.createElement("input");
                input.type = type;
            }
            input.className = "fr-input";
            input.id = inputId;
            input.setAttribute("aria-describedby", messagesId);
        } else {
            // Créer le select
            input = document.createElement("select");
            input.className = "fr-select";
            input.id = selectId;
            input.name = selectId;
            input.setAttribute("aria-describedby", messagesId);

            if (placeholder) {
                // Ajouter l'option placeholder
                const placeholderOption = document.createElement("option");
                placeholderOption.value = "";
                placeholderOption.selected = true;
                placeholderOption.disabled = true;
                placeholderOption.textContent = placeholder;
                input.appendChild(placeholderOption);
            }

            // Ajouter les options
            Object.entries(options).forEach(([value, label]) => {
                const option = document.createElement("option");
                option.value = value;
                option.textContent = label;
                input.appendChild(option);
            });
        }

        // Créer le conteneur de messages
        const messagesContainer = document.createElement("div");
        messagesContainer.className = "fr-messages-group";
        messagesContainer.id = messagesId;
        messagesContainer.setAttribute("aria-live", "polite");

        if (userInput) {
            container.appendChild(element);
        } 
        container.appendChild(input);
        container.appendChild(messagesContainer);

        // Ajouter le conteneur au formulaire
        this.element.appendChild(container);

        // Stocker la configuration dans la Map
        this.inputs[property] = input;

        // Prevenir que la valeur a changée
        input.addEventListener("change", (e) => {
            !e.cancelable && this.dispatchEvent({ type : "style", property : property, value : e.target.value });
        });

        return input;
    }


    /**
     * Ajoute une séparation visuelle (break) au formulaire.
     * Retourne l'élément pour le réutiliser au besoin.
     * @param {String} property - La propriété correspondante
     * @returns {Element} Élément break
     * @public
     */
    addBreak (property) {
        const br = document.createElement("hr");
        br.className = "style-form-break";
        br.dataset.property = property;
        this.element.appendChild(br);
        return br;
    }

    /**
     * Récupère un input par sa propriété
     * @param {String} property - Le nom de la propriété
     * @returns {DefaultInput} La configuration de l'input ou undefined si non trouvé
     */
    getInput (property) {
        return this.inputs[property];
    }

    /**
     * Récupère le contenu global du formulaire
     * @returns {HTMLElement} L'élément conteneur du formulaire (avec la grille et le bouton)
     */
    getContent () {
        return this.container;
    }

}

export default FlatStyleForm;

// Expose FlatStyleForm as ol.control.FlatStyleForm (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.FlatStyleForm = FlatStyleForm;
} 