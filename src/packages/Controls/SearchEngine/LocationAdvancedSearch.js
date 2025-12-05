import Helper from "../../Utils/Helper";
import AbstractAdvancedSearch from "./AbstractAdvancedSearch";
import IGNSearchService from "../../Services/IGNSearchService";

/**
 * @classdesc
 * Recherche avancée par lieu / toponyme (formulaire pour filtrer par type, code postal, INSEE).
 *
 * @alias ol.control.LocationAdvancedSearch
 * @module LocationAdvancedSearch
 */
class LocationAdvancedSearch extends AbstractAdvancedSearch {

    /**
     * Constructeur
     * @constructor
     * @param {AbstractAdvancedSearchOptions} options Options du constructeur
     * @param {String} [options.name="Lieux et toponymes"] Nom du contrôle
     * @param {Array<String>|Object} [options.typeList] Liste des types de lieux (catégories) ou objet clé/valeur avec tableau de sous-catégories
     * @extends {ol.control.AbstractAdvancedSearch}
     */
    constructor (options) {
        options = options || {};

        options.name = options.name || "Lieux et toponymes";

        // call ol.control.Control constructor
        super(options);

        // Search service
        this.searchService = new IGNSearchService({
            index : "poi",
            limit : 10,
            returnTrueGeometry : true
        });

        // Prevent popup validation
        this.element.setAttribute("novalidate", "");
    }

    /**
     * @override
     * @protected
     * @param {AbstractAdvancedSearchOptions} options Options du constructeur
     */
    _initEvents (options) {
        super._initEvents(options);

        this.on("expand", e => {
            if (e.expanded) {
                setTimeout(() => this.searchInput.focus(), 300);
            }
            this.searchResult.innerHTML = "";
        });

        // Do something on search (when ready)
        setTimeout(() => {
            this.searchService.on("search", e => this.handleSearch(e));
            this.searchService.on("error", e => this.handleError(e));
        });
    }

    /** Gère les erreurs de recherche.
     * @private
     * @param {Event} e Événement d'erreur
     */
    handleError (e) {
        this.handleSearch({ nbResults : 0 });
    }

    /**
     * Gère les résultats de la recherche.
     * @private
     * @param {Event} e Événement de recherche contenant les résultats
     */
    handleSearch (e) {
        // Clear previous results       
        if (!e.multi) {
            this.searchResult.innerHTML = "";
        }
        // Format output
        if (e.nbResults === 1) {
            const attr = e.attr || this.searchService.getResult(0).placeAttributes;
            ["postcode","citycode","city","category"].forEach(field => {
                attr[field] = attr[field] || [];
            });
            const info = {
                infoPopup : "<strong>" + attr.toponym + "</strong><br/>" +
                (attr.category ? ("<em>" + (attr.category || []).join(", ") + "</em><br/>") : "") +
                (attr.postcode ? ("Code postal : " + (attr.postcode || []).join(", ") + "<br/>") : "") ,
                toponyme : attr.toponym,
                postcode : attr.postcode[0],
                postcodes : attr.postcode.join(" - "),
                insee : attr.citycode[0],
                citycodes : attr.citycode.join(" - "),
                city : attr.city[0],
                citys : attr.city.join(" - "),
                category : attr.category[0],
                categories : attr.category.join(" - ")
            };

            if (e.result) {
                e.result.setProperties(info);
            }
            if (e.extent) {
                e.extent.setProperties(info);
            }
            console.log(e);
            this.dispatchEvent(e);
        } else {
            this.element.parentElement.parentElement.scrollTop = 0;
            if (e.nbResults === 0) {
                this.searchResult.innerHTML = "";
                const li = document.createElement("li");
                li.className = "fr-message--error";
                li.innerText = "Aucun résultat";
                if (!this.searchInput.value) {
                    li.innerText += " : précisez votre recherche en renseignant le lieu.";
                }
                this.searchResult.appendChild(li);
                li.addEventListener("click", () => {
                    li.remove();
                });
            } else {
                this.handleMultipleResults(e);
            }
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
        this.CLASSNAME = "LocationAdvancedSearch";

        // Get type list from capabilities if not provided
        fetch("https://data.geopf.fr/geocodage/getCapabilities").then(response => {
            return response.json();
        }).then (json => {
            // Get list from capabilities
            const values = json.indexes.find(i => i.id==="poi").fields.find(f => f.name==="category").values;
            this._typeList = values;
            // Set categories if not provided in options
            if (!options.typeList) {
                this.setCategories(values);
            }
        }).catch(() => {
            console.log("error");
        });
        this._typeList = {};
        // Default values
        const typeList = [ "administratif", "aérodrome", "cimetière", "construction ponctuelle", "construction surfacique", "cours d'eau" ];
        this.set("typeList", options.typeList || typeList);
    }

    /** Set categories list
     * @param {Array<String>|Object} categories Liste des catégories
     * @param {HTMLSelectElement} [select] Élément select à remplir (par défaut celui du formulaire)
     */
    setCategories (categories, select) {
        select = select || this.element.querySelector("select[name='category']");
        select.innerHTML = "";
        let typeList = [];
        const isArray = Array.isArray(categories);
        if (isArray) {
            typeList = categories;
        } else if (typeof categories === "object") {
            typeList = Object.keys(categories);
        } else {
            return;
        }
        typeList.forEach(k => {
            const typeOption = document.createElement("option");
            typeOption.value = k.toLowerCase();
            typeOption.innerText = k;
            select.appendChild(typeOption);
            if (!isArray && Array.isArray(categories[k])) {
                typeOption.className = "option";
                categories[k].forEach(v => {
                    const subOption = document.createElement("option");
                    subOption.value = v.toLowerCase();
                    subOption.className = "subOption";
                    subOption.innerHTML = "&nbsp;&nbsp;" + v;
                    select.appendChild(subOption);
                });
            }
        });
        if (this.filter) {
            // Set current value
            select.value = this.filter.category;
            // If none selected, reset to first
            if (!select.value) {
                select.selectedIndex = 0;
                this.filter.category = select.value;
            }
        }
    }

    /**
     * Affiche la liste des résultats multiples et permet la sélection.
     * @private
     * @param {Event} e Événement de recherche contenant les résultats
     */
    handleMultipleResults (e) {
        const results = this.searchService.getResult();
        results.forEach((result, i) => {
            // console.log(result);
            const attr = result.placeAttributes;
            const li = document.createElement("li");
            li.className = "search-result-item" + (i>=5 ? " hidden" : "");
            this.searchResult.appendChild(li);
            // link for accessibility
            const a = document.createElement("a");
            li.appendChild(a);
            a.className = "fr-icon-map-pin-2-line";
            a.href = "#";
            // Format title
            const postCode = (attr.postcode && attr.postcode[0]) ? `, ${attr.postcode[0]}` : "";
            const text = (attr.toponym || "") + postCode + " (" + (attr.category || []).join(", ") + ") - " +  (attr.city || []).join(", ");
            a.title = a.innerText = text;
            // on click on li or link
            li.addEventListener("click", () => a.click());
            a.addEventListener("click", e => {
                e.preventDefault();
                const features = this.searchService.getResultFeatures(i);
                const event = {
                    type : "search",
                    multi : true,
                    attr : attr,
                    extent : features.extent,
                    result : features.feature,
                    nbResults : 1
                };
                this.searchService.dispatchEvent(event);
            });
        });
        // Actions
        const li = document.createElement("li");
        this.searchResult.appendChild(li);
        // more options
        if (results.length > 5) {
            const plusBtn = document.createElement("button");
            plusBtn.className = "fr-btn fr-btn--sm fr-btn--tertiary";
            plusBtn.innerText = "Afficher plus de résultats";
            plusBtn.addEventListener("click", () => {
                plusBtn.remove();
                this.searchResult.querySelectorAll(".hidden").forEach(el => {
                    el.classList.remove("hidden");
                });
            });
            li.appendChild(plusBtn);
        }
        // clear button
        li.className = "search-result-actions";
        const okBtn = document.createElement("button");
        okBtn.className = "fr-btn fr-btn--sm fr-btn--tertiary";
        okBtn.innerText = "Effacer";
        okBtn.addEventListener("click", () => {
            this.searchResult.innerHTML = "";
            this.element.parentElement.parentElement.scrollTop = 0;
        });
        li.appendChild(okBtn);
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
     * @override
     * @protected
     */
    addInputs () {
        super.addInputs();

        this.searchResult = document.createElement("ul");
        this.searchResult.className = "search-result";
        this.inputs.push(this.searchResult);

        // Legend
        const legend = document.createElement("legend");
        legend.className = "fr-fieldset__legend fr-fieldset__legend--regular";
        legend.id = Helper.getUid("LocationAdvancedSearch-legend-");
        const hint = document.createElement("span");
        hint.className = "fr-hint-text";
        hint.textContent = "* Champs obligatoires";
        legend.appendChild(hint);
        this.inputs.push(legend);

        // Type
        const typeSelect = document.createElement("select");
        typeSelect.className = "fr-select";
        typeSelect.id = Helper.getUid("LocationAdvancedSearch-type-");
        typeSelect.name = "category";
        this._getLabelContainer("Type", "fr-select-group", typeSelect);
        this.setCategories(this.get("typeList"), typeSelect);
        typeSelect.addEventListener("change", () => {
            this.filter.category = typeSelect.value;
        });

        // Search input
        const searchInput = this.searchInput = document.createElement("input");
        searchInput.className = "fr-input";
        searchInput.type = "text";
        searchInput.name = "search";
        searchInput.setAttribute("minlength", "3");
        searchInput.required = true;
        searchInput.id = Helper.getUid("LocationAdvancedSearch-search-");
        this._getLabelContainer("Renseigner un lieu *", "fr-input-group", searchInput, null);

        // Code postal
        const postalInput = document.createElement("input");
        postalInput.className = "fr-input";
        postalInput.type = "text";
        postalInput.name = "postalCode";
        postalInput.pattern = "^(\\d{5})$";
        postalInput.title = "Code postal à 5 chiffres";
        postalInput.id = Helper.getUid("LocationAdvancedSearch-postal-");
        this._getLabelContainer("Code postal", "fr-input-group", postalInput);
        postalInput.addEventListener("change", () => {
            this.filter.postcode = postalInput.value;
        });

        // Code INSEE
        const inseeInput = document.createElement("input");
        inseeInput.className = "fr-input";
        inseeInput.name = "cityCode";
        inseeInput.type = "text";
        inseeInput.pattern = "^(\\d\\d|2[A,B,a,b])\\d{3}$";
        inseeInput.title = "Code INSEE sur 5 caractères";
        inseeInput.id = Helper.getUid("LocationAdvancedSearch-insee-");
        this._getLabelContainer("Code INSEE", "fr-input-group", inseeInput, "Format attendu INSEE : 5 chiffres, selon le code officiel géographique (COG)");
        inseeInput.addEventListener("change", () => {
            this.filter.citycode = inseeInput.value.toUpperCase();
        });

        this.filter = {
            category : typeSelect.value,
            postcode : postalInput.value.toUpperCase(),
            citycode : inseeInput.value
        };
    }

    /**
     * @protected
     * @override
     * @param {PointerEvent} e Événement d'effacement
     */
    _onErase (e) {
        super._onErase(e);
        this.element.querySelectorAll("select").forEach(input => {
            input.selectedIndex = 0;
        });
        this.element.querySelectorAll("input").forEach(input => {
            input.value = "";
        });
        this.searchResult.innerHTML = "";
        this._clearMessages();
        this.filter = {
            category : this.element.querySelector("select[name='category']").value,
            postcode : "",
            citycode : ""
        };
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
        const div = this.element.querySelector("input[name='" + name + "']").nextSibling;
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
     * @protected
     * @override
     * @param {PointerEvent} e Événement de soumission
     * param {String} [commune] Nom de la commune (optionnel)
     */
    _onSearch (e, commune) {
        super._onSearch(e);
        const value = commune || this.searchInput.value;
        // Check values
        this._clearMessages();
        /*
        if (value.length < 3) {
            this._showMessage("search", "Veuillez saisir au moins 3 caractères pour lancer la recherche.");
            return;
        }
        */
        if (this.filter.postcode) {
            if (!this.element.querySelector("input[name='postalCode']").checkValidity()) {
                this._showMessage("postalCode", "Le code postal doit être composé de 5 chiffres.");
                return;
            }
        }
        if (this.filter.citycode) {
            if (!this.element.querySelector("input[name='cityCode']").checkValidity()) {
                this._showMessage("cityCode", "Le code INSEE doit être composé de 5 caractères (chiffres ou 2A, 2B).");
                return;
            }
        }
        // Get value from code if needed
        if (!value && this.filter.citycode) {
            // Search commune name as search string
            fetch(`https://geo.api.gouv.fr/communes?code=${this.filter.citycode}&format=json&fields=nom`).then(response => {
                return response.json();
            }).then (json => {
                if (json && json.length) {
                    const commune = json[0].nom;
                    if (commune) {
                        this._onSearch(e, commune);
                    } else {
                        this.handleSearch({ nbResults : 0 });
                    }
                }
            }).catch(() => {
                this.handleSearch({ nbResults : 0 });
            });
            return;
        } else if (!value && this.filter.postcode) {
            // Search commune name as search string
            fetch(`https://apicarto.ign.fr/api/codes-postaux/communes/${this.filter.postcode}`).then(response => {
                return response.json();
            }).then (json => {
                if (json && json.length) {
                    const commune = json[0].nomCommune;
                    if (commune) {
                        this._onSearch(e, commune);
                    } else {
                        this.handleSearch({ nbResults : 0 });
                    }
                }
            }).catch(() => {
                this._showMessage("postalCode", "Aucune commune trouvée pour ce code postal.");
                this.handleSearch({ nbResults : 0 });
            });
            return;
        } else if (value.length < 3) {
            this._showMessage("search", "Veuillez saisir au moins 3 caractères pour lancer la recherche.");
            return;
        }

        // Search
        this.searchService.search({
            location : value,
            filters : this.filter
        });
    }

}

export default LocationAdvancedSearch;

// Expose LocationAdvancedSearch as ol.control.LocationAdvancedSearch (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.LocationAdvancedSearch = LocationAdvancedSearch;
}
