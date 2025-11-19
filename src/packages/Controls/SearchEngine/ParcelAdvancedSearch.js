import InseeSearchService from "../../Services/InseeSearchService";
import Helper from "../../Utils/Helper";
import AbstractAdvancedSearch from "./AbstractAdvancedSearch";

/**
 * @classdesc
 * Contrôle de recherche parcellaire.
 *
 * @extends {AbstractAdvancedSearch}
 * @alias ol.control.ParcelAdvancedSearch
 * @module ParcelAdvancedSearch
 */
class ParcelAdvancedSearch extends AbstractAdvancedSearch {

    /**
     * Constructeur du contrôle de recherche avancée.
     * @param {AbstractAdvancedSearchOptions} options Options du constructeur
     * @param {String} [options.name="Parcelles"] Nom du contrôle
     * @extends {ol.control.AbstractAdvancedSearch}
     */
    constructor (options) {
        options = options || {};

        options.name = options.name || "Parcelles";
        // call ol.control.Control constructor

        super(options);
		
        this.element.setAttribute("novalidate", "");
    }

    /** Clear error messages in the form
     * @private
     */
    _clearMessages () {
        this.element.querySelectorAll(".fr-message--error").forEach(msg => msg.remove());
    }

    /** Show error message for a given input
     * @param {String} name Input name
     * @param {String} [message] Message to show (if none remove message)
     * @private
     */
    _showMessage (name, message) {
        const div = this.element.querySelector("input[name='" + name + "']").parentElement.querySelector(".GPMessagesGroup");
        if (message) {
            const msg = document.createElement("p");
            msg.className = "fr-message fr-message--error";
            msg.textContent = message;
            div.appendChild(msg);
        } else {
            div.innerHTML = "";
        }
    }

    /**
     * @override
     * @protected
     * @param {AbstractAdvancedSearchOptions} options Options du constructeur
     */
    _initEvents (options) {
        super._initEvents(options);

        const comCodeInput = this.comCodeInput;
        const autocompleteList = this.autocompleteList;

        let communeId = "";
        // Show/hide autocomplete list
        function showAutocomplete (b) {
            if (!b) {
                autocompleteList.classList.remove("gpf-visible");
                return;
            }
            if (communeId !== comCodeInput.value) {
                autocompleteList.classList.remove("gpf-visible");
            } else {
                autocompleteList.classList.add("gpf-visible");
            }
        }
        // Show autocomplete on input
        comCodeInput.addEventListener("keyup", showAutocomplete);
        comCodeInput.addEventListener("focus", showAutocomplete);
        comCodeInput.addEventListener("blur", (e) => {
            if (e.relatedTarget !== autocompleteList) {
                showAutocomplete(false);
            }
        });
        // Fetch commune data on change
        comCodeInput.addEventListener("change", () => {
            //check valid input
            if (!comCodeInput.checkValidity()) {
                this._showMessage("commCode", "Le code INSEE doit être composé de 5 caractères (chiffres ou 2A, 2B) ou le code postal de 5 chiffres.");
                return;
            } else {
                this._clearMessages();
            }
            this._getCommuneData(comCodeInput.value).then(data => {
                // Clear previous suggestions
                autocompleteList.innerHTML = "";
                communeId = "";
                if (data.length === 0) {
                    // errror message
                } else if (data.length === 1) {
                    comCodeInput.value = `${data[0].code} - ${data[0].nom})`;
                } else {
                    data.forEach(commune => {
                        console.log(commune);
                        const type = commune.codesPostaux ? "code postal" : "code INSEE";
                        const option = document.createElement("li");
                        option.className = "GPautoCompleteOption";
                        option.setAttribute("role", "option");
                        option.textContent = `${commune.code}, ${commune.nom} (${type})`;
                        option.addEventListener("click", () => {
                            communeId = comCodeInput.value = `${commune.code} (${commune.nom})`;
                            showAutocomplete(false);
                        });
                        autocompleteList.appendChild(option);
                    });
                    communeId = comCodeInput.value;
                    autocompleteList.classList.add("gpf-visible");
                }
            });
        });
    }

    /**
     * @override
     * @protected
     * @param {AbstractAdvancedSearchOptions} options Options du constructeur
     */
    initialize (options) {
        super.initialize(options);
        /**
         * Nom de la classe (heritage)
         * @private
         */
        this.CLASSNAME = "ParcelAdvancedSearch";

        this.insseSearchService = new InseeSearchService();
    }

    /**
     * Crée un conteneur label + input pour le formulaire.
     * @private
     * @param {String} text Texte du label
     * @param {String} type Classe CSS du conteneur
     * @param {HTMLElement} input Élément input à rattacher
     * @param {String} [hint] Texte d'aide optionnel
     * @returns {HTMLElement} Conteneur HTML
     */
    _getLabelContainer (text, type, input, hint = "") {
        const container = document.createElement("div");
        container.className = type;
        this.inputs.push(container);
        const label = document.createElement("label");
        label.className = "fr-label";
        let labelText = text;
        if (hint) {
            labelText = `${text} <span class="fr-hint-text">${hint}</span>`;
        }
        label.innerHTML = labelText;
        container.appendChild(label);
        if (input) {
            label.setAttribute("for", input.id);
            container.appendChild(input);
        }
        // Error message
        const errorDiv = document.createElement("div");
        errorDiv.className = "GPMessagesGroup fr-messages-group";
        container.appendChild(errorDiv);

        // container
        return container;
    }

    /**
     * Récupère les données d'une commune via l'API geo.api.gouv.fr
     * @private
     * @param {String} code Code INSEE ou code postal
     * @returns {Promise} Promesse avec les données de la commune : nom + code + codesPostaux (si codepostal))
     */
    async _getCommuneData (code) {
        const baseURL = "https://geo.api.gouv.fr/communes";
        const url1 = `${baseURL}?code=${code}&format=json&fields=nom,code`;
        const url2 = `${baseURL}?codePostal=${code}&format=json&fields=nom,codesPostaux`;
        const param ={
            headers : {
                "Content-Type" : "application/json",     
            },   
        };
        return Promise.all([
            fetch(url1, param),
            fetch(url2, param)
        ]).then(responses => {  
            return Promise.all(responses.map(res => res.json())).then(json => {
                return json[0].concat(json[1]);
            });
        });
    }

    /** Add inputs on form
     * @override
     * @protected
     */
    addInputs () {
        super.addInputs();

        // Legend
        const legend = document.createElement("legend");
        legend.className = "fr-fieldset__legend fr-fieldset__legend--regular";
        legend.id = Helper.getUid("ParcelAdvancedSearch-legend-");
        const hint = document.createElement("span");
        hint.className = "fr-hint-text";
        hint.textContent = "* Champs obligatoires";
        legend.appendChild(hint);
        this.inputs.push(legend);

        // Code postal
        const comCodeInput = this.comCodeInput = document.createElement("input");
        comCodeInput.className = "fr-input";
        comCodeInput.type = "text";
        comCodeInput.name = "commCode";
        comCodeInput.pattern = "^(\\d\\d|2[A,B,a,b,0-9])\\d{3}$";
        comCodeInput.title = "Code postal ou code INSEE";
        comCodeInput.id = Helper.getUid("ParcelAdvancedSearch-comCode-");
        const codeDiv = this._getLabelContainer("Renseigner un lieu*", "fr-input-group", comCodeInput, "Code postal ou code INSEE");

        // Autocomplete list
        const autocompleteList = this.autocompleteList = document.createElement("ul");
        autocompleteList.className = "GPautoCompleteList";
        autocompleteList.id = Helper.getUid("GPautoCompleteList-");
        autocompleteList.setAttribute("role", "listbox");
        autocompleteList.setAttribute("tabindex", "-1");
        autocompleteList.setAttribute("aria-label", "Propositions");
        codeDiv.insertBefore(autocompleteList, comCodeInput.nextSibling);
        
        // Input controller for accessibility
        comCodeInput.setAttribute("role", "combobox");
        comCodeInput.setAttribute("aria-controls", autocompleteList.id);
        comCodeInput.setAttribute("aria-expanded", "false");
        comCodeInput.setAttribute("aria-autocomplete", "list");
        comCodeInput.setAttribute("aria-haspopup", "listbox");
        comCodeInput.setAttribute("autocomplete", "off");

        comCodeInput.addEventListener("focus", () => {
            comCodeInput.setAttribute("aria-expanded", "true");
        });
    }

    /** Do search
     * @protected
     * @override
     * @param {PointerEvent} e Événement de soumission
     */
    _onSearch (e) {
        super._onSearch(e);
    }

}

export default ParcelAdvancedSearch;

// Expose ParcelAdvancedSearch as ol.control.ParcelAdvancedSearch (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.ParcelAdvancedSearch = ParcelAdvancedSearch;
}