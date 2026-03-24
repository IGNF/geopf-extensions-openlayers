import ControlExtended from "../Control.js";
import Helper from "../../Utils/Helper.js";
import { createDefaultStyle } from "ol/style/flat.js";
import "../../CSS/Controls/StyleDialog/GPFflatStyleForm.scss";
import InputNumber from "../Input/InputNumber.js";
import DefaultInput from "../Input/DefaultInput.js";
import CustomSelect from "../Input/CustomSelect.js";
import CustomSelectGrid from "../Input/CustomSelectGrid.js";

/**
 * Classe représentant un formulaire de style.
 * Les inputs correspondant sont ajoutés via les méthodes suivantes :
 * 
 * - `addInput` : ajoute un élément input
 * - `addSelect` : ajoute un élément select
 * - `addCustomInput` : ajoute un input de type InputNumber (@see {@link InputNumber})
 * - `addDefaultInput` : ajoute un input de type DefaultInput (@see {@link DefaultInput})
 * - `addCustomSelect` : ajoute un input d'un type différent en fonction du paramètre type :
 *   - Pour un type `icon`, ajoute un input de type SelectIcons (@see {@link SelectIcons})
 *   - Sinon, ajoute un input de type CustomSelect (@see {@link CustomSelect})
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
     */
    onSubmit () {
        const values = {};

        // Boucler sur chaque input/select
        Object.entries(this.inputs).forEach(([property, input]) => {
            // Récupérer l'élément (input ou select)
            let elem;
            if (input instanceof DefaultInput || input.getInput) {
                elem = input.getInput();
            } else {
                elem = input;
            }
            // const element = config.input || config.select;

            if (elem) {
                // Récupérer la valeur
                values[property] = parseFloat(element.value) ? parseFloat(element.value) : element.value;
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
     */
    setFlatStyle (flatStyle) {
        this.flatStyle = flatStyle;

        Object.entries(this.inputs).forEach(([property, elem]) => {
            const input = elem.getInput ? elem.getInput() : elem;
            const value = this.flatStyle[property];
            input.value = value !== undefined ? value : input.value;
            // cancelable:true pour ne pas envoyer d'événement "style"
            input.dispatchEvent(new Event("change", { bubbles : true, cancelable : true }));
            // Pour déclencher les éventuels écouteurs de changement
        });
    }

    /**
     * Ajoute un input au formulaire
     * @param {String} label - Le libellé de l'input
     * @param {String} property - La propriété flat style correspondante
     * @param {String|Object} type - Le type d'input (par défaut: 'text') ou objet avec une methode getInput()/getElement() pour les inputs personnalisés
     * @param {Object<String, String>} options - Les options du select (si type='select')
     * @param {String} placeholder - Le placeholder (si type='select')
     * @returns {HTMLInputElement|HTMLSelectElement} L'élément input ou select créé
     */
    addInput (label, property, type = "text", options = {}, placeholder) {
    // Si le type est 'select', déléguer à addSelect
        if (type === "select") {
            return this.addSelect(label, property, options, placeholder);
        }

        // Générer des IDs uniques
        const inputId = Helper.getUid("input");
        const groupId = Helper.getUid("input-group");
        const messagesId = `${inputId}-messages`;

        // Créer le conteneur principal
        const container = document.createElement("div");
        container.className = "fr-input-group";
        container.dataset.property = property;
        container.id = groupId;

        // Créer le label
        const labelElement = document.createElement("label");
        labelElement.className = "fr-label input-style__label";
        labelElement.htmlFor = inputId;
        labelElement.textContent = label;

        // Input specifique

        /**
         * @type {HTMLInputElement|HTMLTextAreaElement}
         */
        let input;
        /**
         * @type {HTMLElement}
         */
        let element;
        const userInput = (typeof type === "object" && type.getInput);
        if (userInput) {
            input = type.getInput();
            element = type.getElement();
            const id = element.id;
            labelElement.htmlFor = id;
            // Ajoute un événement sur le label (pour bien focus sur l'input)
            labelElement.addEventListener("click", () => {
                element.focus({ focusVisible : true });
            });
        } else {
            // Input standard
            if (type === "textarea") {
                input = document.createElement(type);
            } else {
                input = document.createElement("input");
                input.type = type;
            }
            input.className = "fr-input";
            input.id = inputId;
            input.setAttribute("aria-describedby", messagesId);
        }

        // Créer le conteneur de messages
        const messagesContainer = document.createElement("div");
        messagesContainer.className = "fr-messages-group";
        messagesContainer.id = messagesId;
        messagesContainer.setAttribute("aria-live", "polite");

        // Assembler les éléments
        container.appendChild(labelElement);
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
     * Ajoute une séparation visuelle (break) au formulaire
     * @param {String} property - La propriété
     * @returns {Element} Élément break
     */
    addBreak (property) {
        const br = document.createElement("hr");
        br.className = "style-form-break";
        br.dataset.property = property;
        this.element.appendChild(br);
        return br;
    }

    /**
     * Ajoute un select au formulaire (méthode privée)
     * @param {String} label - Le libellé du select
     * @param {String} property - La propriété flat style correspondante
     * @param {Object<String, String>} options - Les options du select (valeur: libellé)
     * @param {String} placeholder - Le texte du placeholder (par défaut: 'Sélectionnez une option')
     * @returns {HTMLSelectElement} L'élément select créé
     * @private
     */
    addSelect (label, property, options = {}, placeholder = "Sélectionnez une option") {
    // Générer des IDs uniques
        const selectId = Helper.getUid("select");
        const messagesId = `${selectId}-messages`;

        // Créer le conteneur principal
        const container = document.createElement("div");
        container.className = "fr-select-group";
        container.dataset.property = property;

        // Créer le label
        const labelElement = document.createElement("label");
        labelElement.className = "fr-label";
        labelElement.htmlFor = selectId;
        labelElement.textContent = label;

        // Créer le select
        const select = document.createElement("select");
        select.className = "fr-select";
        select.id = selectId;
        select.name = selectId;
        select.setAttribute("aria-describedby", messagesId);

        // Ajouter l'option placeholder
        const placeholderOption = document.createElement("option");
        placeholderOption.value = "";
        placeholderOption.selected = true;
        placeholderOption.disabled = true;
        placeholderOption.textContent = placeholder;
        select.appendChild(placeholderOption);

        // Ajouter les options
        Object.keys(options).forEach(value => {
            const option = document.createElement("option");
            option.value = value;
            option.textContent = options[value];
            select.appendChild(option);
        });

        // Créer le conteneur de messages
        const messagesContainer = document.createElement("div");
        messagesContainer.className = "fr-messages-group";
        messagesContainer.id = messagesId;
        messagesContainer.setAttribute("aria-live", "polite");

        // Assembler les éléments
        container.appendChild(labelElement);
        container.appendChild(select);
        container.appendChild(messagesContainer);

        // Ajouter le conteneur au formulaire
        this.element.appendChild(container);

        // Stocker la configuration dans la Map
        this.inputs[property] = select;

        return select;
    }

    /**
     * @param {InputStyleConfig} options Options constructeur
     * @returns {InputNumber} Input créé
     */
    addCustomInput (options) {
        const inputNumber = new InputNumber(options);
        this.element.appendChild(inputNumber.getElement());

        const input = inputNumber.getInput();
        const property = options.property;

        // Prevenir que la valeur a changée
        input.addEventListener("change", (e) => {
            !e.cancelable && this.dispatchEvent({ type : "style", property : property, value : e.target.value });
        });

        // Stocker la configuration dans la Map
        this.inputs[property] = inputNumber;
        return inputNumber;
    }
    /**
     * @param {InputStyleConfig} options Options constructeur
     * @returns {DefaultInput} Input créé
     */
    addDefaultInput (options) {
        const inputNumber = new DefaultInput(options);
        this.element.appendChild(inputNumber.getElement());

        const input = inputNumber.getInput();
        const label = options.label;
        const property = options.property;

        // Prevenir que la valeur a changée
        input.addEventListener("change", (e) => {
            !e.cancelable && this.dispatchEvent({ type : "style", property : property, value : e.target.value });
        });

        // Stocker la configuration dans la Map
        this.inputs[property] = inputNumber;
        return inputNumber;
    }

    /**
     * @param {InputStyleConfig} options Options constructeur
     * @returns {CustomSelect} Input créé
     */
    addCustomSelect (options) {
        let inputNumber;
        if (options.type === "pattern") {
            inputNumber = new CustomSelectGrid(options);
        }
        else {
            inputNumber = new CustomSelect(options);
        }
        this.element.appendChild(inputNumber.getElement());

        const input = inputNumber.getInput();
        const label = options.label;
        const property = options.property;
        const opts = options.options;

        // Prevenir que la valeur a changée
        input.addEventListener("change", (e) => {
            !e.cancelable && this.dispatchEvent({ type : "style", property : property, value : e.target.value });
        });

        // Stocker la configuration dans la Map
        this.inputs[property] = inputNumber;
        return inputNumber;
    }

    /**
     * Récupère un input par sa propriété
     * @param {String} property - Le nom de la propriété
     * @returns {InputConfig|undefined} La configuration de l'input ou undefined si non trouvé
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