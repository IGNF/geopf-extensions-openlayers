import def from "ajv/dist/vocabularies/discriminator";
import InseeSearchService from "../../Services/InseeSearchService";
import Helper from "../../Utils/Helper";
import AbstractAdvancedSearch from "./AbstractAdvancedSearch";
import { couldStartTrivia } from "typescript";
import IGNSearchService from "../../Services/IGNSearchService";

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
		
        // prevent HTML5 validation
        this.element.setAttribute("novalidate", "");

        this.searchService = new IGNSearchService({
            index : "parcel",
            limit : 1,
            returnTrueGeometry : true
        });
        this.searchService.on("search", e => this.handleSearch(e));
        this.searchService.on("error", e => this.handleError(e));
    }

    /** An error occured during search
     * @param {Object} e Event
     */
    handleError (e) {
        console.log("error", e);
        this.dispatchEvent(e);
    }

    /** Search completed
     * @param {Object} e Event
     */
    handleSearch (e) {
        if (e.nbResults === 0) {
            this._showMessage("numero", "Aucune parcelle ne correspond à ce numéro.");
            return;
        }
        // Format result
        const attr = e.attr || this.searchService.getResult(0).placeAttributes;
        delete attr.truegeometry;
        attr.infoPopup = `<strong>${attr.id}</strong><br/>
            Parcelle n° ${attr.number.replace(/^0{1,4}/g,"")}<br/>
            Feuille ${attr.oldmunicipalitycode}-${attr.section}<br/>
            ${attr.city}
        `;
        // Set properties
        e.result?.setProperties(attr);
        e.extent?.setProperties(attr);

        this.dispatchEvent(e);
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
     * @param {String} [what="error"] Message type (error, warning, info)
     * @private
     */
    _showMessage (name, message, what) {
        const div = this.element.querySelector("[name='" + name + "']").parentElement.querySelector(".GPMessagesGroup");
        if (message) {
            const msg = document.createElement("p");
            msg.className = "fr-message fr-message--" + (what || "error");
            msg.textContent = message;
            div.innerHTML = "";
            div.appendChild(msg);
        } else {
            div.innerHTML = "";
        }
    }

    /** Change the section
     * @private
     */
    setSection () {
        const prefix = this.prefixInput.value;
        const section = this.sectionInput.value;
        this.numberList.innerHTML = "";
        this._showMessage("section", "chargement en cours", "info");
        this._fetchCadastre(this.communeId, prefix, section).then(data => {
            this._showMessage("section", "");
            const section = this.sectionInput.value;
            if (data && data.features && data.features[0].properties.section === section) {
                this.numberInput.focus();
                const numbers = [];
                data.features.forEach(numero => numbers.push(numero.properties.numero));
                // Sort numbers
                numbers.sort().forEach(numero => {
                    const option = document.createElement("li");
                    option.value = option.textContent = numero.replace(/^0{1,4}/g,"");
                    option.addEventListener("click", () => {
                        this.numberInput.value = option.value;
                        this._onSearch();
                        this.numberInput.blur();
                        this.numberInput.ariaExpanded = "false";
                    });
                    this.numberList.appendChild(option);
                });
                this.filterListNumber();
            }
        });
    }

    /**
     * Show sections for a given prefix 
     * @param {String} prefix Prefix code
     */
    setFeuille (prefix) {
        const feuilles = this.feuilles[prefix];
        this.sectionInput.innerHTML = "";
        if (feuilles) {
            const section = document.createElement("option");
            section.value = "";
            section.textContent = "Sélectionner une section";
            this.sectionInput.appendChild(section);
            let previous = "";
            this.feuilles[prefix].sort().forEach(key => {
                if (key !== previous) {
                    const section = document.createElement("option");
                    section.value = section.textContent = key;
                    this.sectionInput.appendChild(section);
                    previous = key;
                }
            });
            this.sectionInput.removeAttribute("disabled");
            this.sectionInput.focus();
        } else {
            this.sectionInput.setAttribute("disabled", "disabled");
        }
        this.sectionInput.dispatchEvent(new Event("change"));
    }

    /** Set the commune
     * @param {String} [id] Commune INSEE code
     */
    setCommune (id="") {
        if (this.communeId !== id) {
            const prefixInput = this.prefixInput;

            this.communeId = id;
            prefixInput.innerHTML = "";
            if (id) {
                this._showMessage("commCode", "chargement en cours", "info");
                // Fetch prefixes and sections for the selected commune
                this._fetchCadastre(id).then(data => {
                    this._showMessage("commCode", "");
                    this.feuilles = {};

                    data.features.forEach(feuille => {
                        if (!this.feuilles[feuille.properties.com_abs]) {
                            this.feuilles[feuille.properties.com_abs] = [];
                        }
                        this.feuilles[feuille.properties.com_abs].push(feuille.properties.section);
                    });
                    let previous = "";
                    Object.keys(this.feuilles).sort().forEach(key => {
                        if (key !== previous) {
                            const prefix = document.createElement("option");
                            prefix.value = prefix.textContent = key;
                            prefixInput.appendChild(prefix);
                            previous = key;
                        }
                    });
                    this.setFeuille("000");
                });
                prefixInput.removeAttribute("disabled");
            } else {
                prefixInput.setAttribute("disabled", "disabled");
                this.setFeuille();
            }
        }
    };

    /**
     * @override
     * @protected
     * @param {AbstractAdvancedSearchOptions} options Options du constructeur
     */
    _initEvents (options) {
        super._initEvents(options);

        // Inputs
        const comCodeInput = this.comCodeInput;
        const autocompleteList = this.autocompleteList;
        const prefixInput = this.prefixInput;
        const sectionInput = this.sectionInput;

        // Current selected commune
        let communeName = "";
        this.communeId = "";
        // Autocomplete selected index
        let selectedIndex = -1;
        // Autocomplete options
        let autoOptions = [];

        // Show/hide autocomplete list
        const showAutocomplete = (b) => {
            if (communeName !== comCodeInput.value) {
                this.setCommune();
            }
            if (b !== false) {
                // Show autocomplete only if input value matches selected commune
                b = (communeName === comCodeInput.value);
            }
            if (b) {
                comCodeInput.setAttribute("aria-expanded", "true");
                comCodeInput.setAttribute("aria-activedescendant", autoOptions[selectedIndex]?.id || "");
            } else {
                comCodeInput.setAttribute("aria-expanded", "false");    
                autoOptions[selectedIndex]?.classList.remove("active");
                comCodeInput.setAttribute("aria-activedescendant", autoOptions[selectedIndex]?.id || "");
                selectedIndex = -1;
            }
        };


        // Keyboard navigation on autocomplete list
        comCodeInput.addEventListener("keydown", e => {
            autoOptions = autocompleteList.querySelectorAll(".GPautoCompleteOption");
            if (autoOptions.length) {
                let index = selectedIndex;
                switch (e.key) {
                    case "Backspace": {
                        index = -1;
                        if (comCodeInput.value.length > 5) {
                            comCodeInput.value = comCodeInput.value.slice(0,6);
                        }
                        break;
                    }
                    case "Escape": {
                        index = -1;
                        break;
                    }
                    case "ArrowDown": {
                        index++;
                        if (index >= autoOptions.length) {
                            index = -1;
                        }
                        e.preventDefault();
                        break;
                    }
                    case "ArrowUp": {
                        index--;
                        if (index < -1) {
                            index += autoOptions.length +1;
                        }
                        e.preventDefault();
                        break;
                    }
                    case "Enter": {
                        if (index >= 0 && index < autoOptions.length) {
                            autoOptions[selectedIndex]?.classList.remove("active");
                            autoOptions[index].click();
                            index = -1;
                        }
                        break;
                    }
                    default: {
                        break;
                    }
                }
                if (selectedIndex !== index) {
                    // Update selected option
                    autoOptions[selectedIndex]?.classList.remove("active");
                    selectedIndex = index;
                    autoOptions[selectedIndex]?.classList.add("active");
                    showAutocomplete(["ArrowUp", "ArrowDown"].includes(e.key));
                    // Scroll to selected option
                    autoOptions[selectedIndex]?.scrollIntoView({ block : "nearest" });
                } 
            }
        });

        // Show autocomplete on input
        comCodeInput.addEventListener("keyup", e => {
            if (["ArrowUp", "ArrowDown", "Enter", "Escape"].includes(e.key)) {
                e.preventDefault();
                return;
            }
            showAutocomplete(e);
        });
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
            this._showMessage("commCode", "chargement en cours", "info");
            this._fetchCommuneData(comCodeInput.value).then(data => {
                this._showMessage("commCode", "");
                // Clear previous suggestions
                autocompleteList.innerHTML = "";
                communeName = "";
                if (data.length === 0) {
                    // errror message
                    this._showMessage("commCode", "Aucune commune ne correspond à ce code INSEE ou code postal.");
                    this.setCommune();
                } else if (data.length === 1) {
                    communeName = comCodeInput.value = `${data[0].code} (${data[0].nom})`;
                    this.setCommune(data[0].code);
                } else {
                    data.forEach(commune => {
                        const type = commune.codesPostaux ? "code INSEE" : "code postal";
                        const option = document.createElement("li");
                        option.className = "GPautoCompleteOption";
                        option.setAttribute("role", "option");
                        option.id = Helper.getUid("GPautoCompleteOption-");
                        option.textContent = `${commune.code}, ${commune.nom} (${type})`;
                        option.addEventListener("click", () => {
                            communeName = comCodeInput.value = `${commune.code} (${commune.nom})`;
                            this.setCommune(commune.code);
                            showAutocomplete(false);
                        });
                        autocompleteList.appendChild(option);
                    });
                    communeName = comCodeInput.value;
                    this.setCommune();
                    comCodeInput.setAttribute("aria-expanded", "true");
                }
            });
        });

        // Fetch sections
        prefixInput.addEventListener("change", () => {
            this.setFeuille(prefixInput.value);
        });
        // Fetch parcelles number
        sectionInput.addEventListener("change", () => {
            if (sectionInput.value) {
                this.numberInput.removeAttribute("disabled");
                this.setSection();
            } else {
                this.numberInput.setAttribute("disabled", "disabled");
            }
        });

        // Handle listbox for number input
        this.numberInput.addEventListener("focus", () => {
            this.numberInput.ariaExpanded = "true";
        });
        this.numberInput.addEventListener("blur", (e) => {
            if (e.relatedTarget !== this.numberList) {
                this.numberInput.ariaExpanded = "false";
            }
        });

        // Filter number list on keyup
        this.numberInput.addEventListener("keyup", (e) => {
            this.filterListNumber();
            if (e.key === "Enter") {
                this.numberInput.ariaExpanded = "false";
                this.numberInput.blur();
            }
        });
    }


    /** Filter listbox options
     */ 
    filterListNumber () {
        const filter = this.numberInput.value.toUpperCase();
        const options = this.numberList.querySelectorAll("li");
        let hasNumber = false;
        options.forEach(option => {
            if (option.textContent.toUpperCase().indexOf(filter) > -1) {
                option.style.display = "";
                hasNumber = true;
            } else {
                option.style.display = "none";
            }
        });
        if (!hasNumber) {
            this._showMessage("numero", "Aucun numéro de parcelle ne correspond à cette saisie.");
        } else {
            this._showMessage("numero", "");
        }
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
    async _fetchCommuneData (code) {
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
        }).catch(error => {
            this._showMessage("commCode", "Une erreur est survenue lors de la récupération des données de la commune.");
            return [];
        });
    }

    /**
     * Récupère les feuilles cadastrales d'une commune via le WFS Geopf
     * @private
     * @param {String} code Code INSEE de la commune
     * @param {String} [prefix] Préfixe de la parcelle
     * @param {String} [section] Section de la parcelle
     * @returns {Promise} Promesse avec les données GeoJSON
     */
    async _fetchCadastre (code, prefix, section) {
        const domtom = ["97","98"].includes(code.slice(0,2));
        const dep = code.slice(0, domtom ? 3 : 2);
        const com = code.slice(domtom ? 3 : 2, 5);
        const url = "https://data.geopf.fr/wfs/ows?";
        const params = {
            service : "WFS",
            version : "2.0.0",
            request : "GetFeature",
            typename : "CADASTRALPARCELS.PARCELLAIRE_EXPRESS:" + (section ? "parcelle" : "feuille"),
            outputFormat : "application/json",
            srsName : "CRS:84",
            count : "1000",
            propertyName : section ? "com_abs,section,numero" : "com_abs,section",
            cql_filter : `code_dep='${dep}' and code_com='${com}'` + (section ? ` and com_abs='${prefix}' and section='${section}'` : "")
        };
        const queryString = new URLSearchParams(params).toString();
        const fullUrl = url + queryString;
        // Abort previous request
        if (this.controller) {
            this.controller.abort();
        }
        // New request
        this.controller = new AbortController();
        const response = await fetch(fullUrl, {
            headers : {
                "Content-Type" : "application/json",     
            },
            signal : this.controller.signal
        }).catch(error => {
            return null;
        });
        this.controller = null;
        if (!response) {
            return {};
        }
        const data = await response.json();
        return data;
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

        // Prefix
        const prefixInput = this.prefixInput = document.createElement("select");
        prefixInput.className = "fr-select";
        prefixInput.name = "prefix";
        prefixInput.title = "Choisir le préfixe de la parcelle";
        prefixInput.id = Helper.getUid("ParcelAdvancedSearch-prefix-");
        prefixInput.setAttribute("disabled", "disabled");
        this._getLabelContainer("Préfix", "fr-select-group", prefixInput, "");

        // Section
        const sectionInput = this.sectionInput = document.createElement("select");
        sectionInput.className = "fr-select";
        sectionInput.name = "section";
        sectionInput.title = "Choisir la section de la parcelle";
        sectionInput.id = Helper.getUid("ParcelAdvancedSearch-section-");
        sectionInput.setAttribute("disabled", "disabled");
        this._getLabelContainer("Section*", "fr-select-group", sectionInput, "");

        // Numero
        const numberInput = this.numberInput = document.createElement("input");
        numberInput.className = "fr-input";
        numberInput.type = "text";
        numberInput.pattern = "\\d{1,4}";
        numberInput.maxLength = "4";
        numberInput.name = "numero";
        numberInput.title = "Numéro de la parcelle";
        numberInput.autocomplete = "off";
        numberInput.ariaExpanded = "false";
        numberInput.id = Helper.getUid("ParcelAdvancedSearch-number-");
        numberInput.setAttribute("disabled", "disabled");
        const numDiv = this._getLabelContainer("Numéro*", "fr-input-group", numberInput, "");

        const numberList = this.numberList = document.createElement("ul");
        numberList.className = "GPautoCompleteList";
        numberList.id = Helper.getUid("GPautoCompleteList-");
        numberList.setAttribute("role", "listbox");
        numberList.setAttribute("tabindex", "-1");
        numberList.setAttribute("aria-label", "Propositions");
        numDiv.insertBefore(numberList, numberInput.nextSibling);
    }

    /** Do search
     * @protected
     * @override
     * @param {PointerEvent} e Événement de soumission
     */
    _onSearch (e) {
        if (e) {
            super._onSearch(e);
        }

        this._clearMessages();

        if (!this.communeId) {
            return;
        }
        const prefix = this.prefixInput.value;
        const section = this.sectionInput.value;
        const number = this.numberInput.value;
        if (!prefix) {
            // this._showMessage("prefix", "Le préfixe est obligatoire.");
            return;
        } else if (!section) {
            this._showMessage("section", "La section est obligatoire.");
            return;
        } else if (!this.numberInput.checkValidity()) {
            this._showMessage("numero", "Le numéro de parcelle doit être un nombre.");
            return;
        } else if (!number) {
            this._showMessage("numero", "Le numéro de parcelle est obligatoire.");
            return;
        }

        // Search parcelle
        const parcelId = this.communeId 
            + "000".slice(prefix.length) + prefix 
            + section 
            + "0000".slice(number.length) + number;

        this.searchService.search({
            location : parcelId
        });
    }

    /**
     * Réinitialise les champs du formulaire.
     * @param {PointerEvent} e Événement d'effacement
     * @protected
     */
    _onErase (e) {
        super._onErase(e);
        this.setCommune();
        this._clearMessages();
    }

}

export default ParcelAdvancedSearch;

// Expose ParcelAdvancedSearch as ol.control.ParcelAdvancedSearch (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.ParcelAdvancedSearch = ParcelAdvancedSearch;
}