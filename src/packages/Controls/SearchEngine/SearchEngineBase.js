// import CSS
import "../../CSS/Controls/SearchEngine/GPFsearchEngine.css";
import Control from "../Control";
import Logger from "../../Utils/LoggerByDefault";
import { DefaultSearchService } from "./Service";
import Helper from "../../Utils/Helper";

const typeClasses = {
    "history" : "fr-icon-history-line",
    "search" : "fr-icon-map-pin-2-line",
};

var logger = Logger.getLogger("searchengine");

/**
 * @typedef {Object} SearchEngineBaseOptions Options du constructeur pour le contrôle de recherche.
 *
 * @property {HTMLElement|string} [target] - Élément DOM ou sélecteur dans lequel insérer le contrôle.
 * Si non défini, le contrôle crée un bouton permettant d’ouvrir/fermer le champ de recherche.
 * @property {string} [title="Rechercher"] - Texte du titre (attribut `title`) du bouton principal.
 * @property {string} [collapsible=false] - Si vrai, permet de fermer le contrôle.
 * @property {string} [ariaLabel="Rechercher"] - Libellé accessible (ARIA) pour le champ de recherche.
 * @property {string} [placeholder=""] - Texte d’indication affiché dans le champ de saisie.
 * @property {number} [minChars=0] - Nombre minimum de caractères à saisir avant de lancer l’autocomplétion.
 * @property {number} [maximumEntries=5] - Nombre maximum d’entrées affichées dans la liste d’autocomplétion.
 * @property {number} [triggerDelay=100] - Délai (en millisecondes) avant le déclenchement de l’autocomplétion
 * après la saisie de l’utilisateur.
 * @property {boolean|string} [historic=true] - Active ou non l’historique local des recherches. Valeur acceptées :
 * - `false` : désactive complètement l’historique ;
 * - `true` : active l’historique sous le nom par défaut `GPsearch-SearchEngineBase` ;
 * - `string` : active l’historique sous un nom personnalisé (ex. `"monHistoriquePerso"`).
 * @property {import("./Service.js").AbstractSearchService} [searchService] - Service de recherche à utiliser. Créera un service par défaut si non donné.
 */


/**
 * @classdesc
 * SearchEngine Base control
 *
 * @alias ol.control.SearchEngineBase
 * @module SearchEngine
*/
class SearchEngineBase extends Control {

    /**
    * @constructor
    * @param {SearchEngineBaseOptions} options Options du constructeur
    * @fires autocomplete
    * @fires search
    * @fires select
    * 
    * @example
    * const search = new ol.control.SearchEngineBase({
    *   placeholder: "Rechercher une adresse...",
    *   minChars: 3,
    *   maximumEntries: 10,
    *   historic: "mesRecherches",
    *   searchService: new CustomSearchService()
    * });
    * 
    * map.addControl(search)
    */
    constructor (options) {
        options = options || {};
        // call ol.control.Control constructor
        super(options);

        /**
         * Nom de la classe (heritage)
         * @private
         */
        this.CLASSNAME = "SearchEngineBase";

        // initialisation du composant
        this.initialize(options);

        this.searchService = options.searchService;
        this.searchService.on("autocomplete", function (e) {
            this.onAutocomplete(e);
        }.bind(this));

        this.searchService.on("search", function (e) {
            this.onSearch(e);
        }.bind(this));

        // Widget main DOM container
        this._initContainer(options);

        this._initEvents(options);

        // Get historic in localStorage
        this._historic = false;
        this._historicName = "GPsearch-" + options.historic;
        if (options.historic !== false) {
            this._historic = [];
            try { 
                const stor = window.localStorage.getItem(this._historicName);
                if (stor) {
                    this._historic = JSON.parse(stor);
                }   
            } catch (e) {
                // logger.warn("LocalStorage not available");
            }   
        }
        this.showHistoric();
    }
    /**
     * Initialize SearchEngine control (called by SearchEngine constructor)
     *
     * @param {SearchEngineBaseOptions} options - constructor options
     * @protected
     */
    initialize (options) {
        // Valeurs par défaut des options
        options.minChars = options.minChars ? options.minChars : 3;
        options.maximumEntries = options.maximumEntries ? options.maximumEntries : 5;
        options.historic = (typeof options.historic === "string" ? options.historic : this.CLASSNAME);
        options.title = options.title ? options.title : "Rechercher";
        options.ariaLabel = options.ariaLabel ? options.ariaLabel : "Rechercher";
        options.placeholder = options.placeholder ? options.placeholder : "";
        options.searchService = options.searchService ? options.searchService : new DefaultSearchService();
        options.collapsible = options.collapsible === true ? true : false;

        this.set("maximumEntries", options.maximumEntries);
    }
    /** Add event listeners
     * @param {SearchEngineBaseOptions} options - constructor options
     * @protected
     */
    _initEvents (options) {
        // Empty input
        this.input.addEventListener("input", function (e) {
            if (!e.target.value) {
                this.showHistoric();
            }
        }.bind(this));
        // Prevent cursor to go to the end of input on keydown
        this.input.addEventListener("keydown", function (e) {
            if (/ArrowDown|ArrowUp/.test(e.key)) {
                e.preventDefault();
            }
        }.bind(this));
        // Keyboard navigation
        this.input.addEventListener("keyup", function (e) {
            // autocomplete list
            const list = Array.from(this.autocompleteList.querySelectorAll("li"));
            let idx = list.findIndex(li => li.classList.contains("active"));
            if (idx === -1) {
                // Ancienne valeur
                this._previousValue = e.target.value;
            }
            switch (e.key) {
                case "ArrowDown":
                case "ArrowUp":
                    e.preventDefault();
                    // Navigation in autocomplete list
                    if (list.length === 0) {
                        return;
                    }
                    list.forEach(li => li.classList.remove("active"));
                    if (e.key === "ArrowDown") {
                        idx++;
                        if (idx >= list.length) {
                            idx = -1;
                        }
                    } else if (e.key === "ArrowUp") {
                        idx--;
                        if (idx < -1) {
                            idx = list.length - 1;
                        }
                    }
                    if (idx !== -1) {
                        // Set active
                        const current = list[idx];
                        current.classList.add("active");
                        this.input.value = current.innerText;
                        this.input.setAttribute("aria-activedescendant", current.id);
                        this.input.setAttribute("data-active-option", current.id);
                    } else {
                        // Réaffiche la valeur précédente de l'utilisateur
                        e.target.value = this._previousValue;
                    }
                    break;
                case "Enter":
                    // Lance la recherche
                    let item = list[idx];
                    if (idx < 0) {
                        // Pas d'item sélectionné : on prend le premier de la liste
                        item = list[0];
                    }
                    if (item) {
                        // Simule un clic sur l'élément sélectionné
                        item.click();
                    }
                    break;
                default:
                    if (e.target.value.length && e.target.value.length >= options.minChars && e.target.value !== this._currentValue) {
                        this.autocomplete(e.target.value, e.key === "Enter");
                    } 
                    break;
            }
            this._currentValue = e.target.value;
        }.bind(this), false);

        // Événement d'envoi du formulaire
        this.container.addEventListener("submit", function (e) {
            e.preventDefault();
            const list = Array.from(this.autocompleteList.querySelectorAll("li"));

            if (e.submitter && e.submitter.type === "submit") {
                // Si on appuie sur le bouton, on vérifie que l'input ne soit pas vide
                let input = e.target.querySelector("input");
                const value = input.value;
                if (value.length < options.minChars) {
                    return false;
                }
            }
            let idx = list.findIndex(li => li.classList.contains("active"));
            let item = list[idx];
            if (idx < 0) {
                // Pas d'item sélectionné : on prend le premier de la liste
                item = list[0];
            }
            if (item) {
                item.click();
            }
        }.bind(this));
    }
    /**
     * 
     * @param {*} options 
     */
    _initContainer (options) {
        const element = this.element = document.createElement("div");
        element.className = "GPwidget gpf-widget";
        element.id = Helper.getUid("GPsearchEngine-");
        // Main container
        const container = this.container = document.createElement("form");
        container.className = "fr-search-bar";
        container.id = Helper.getUid("GPsearchInput-Base-");

        // Création du bouton
        if (!options.target && options.collapsible) {
            this.button = document.createElement("button");
            this.button.id = Helper.getUid("GPshowSearchEnginePicto-");
            this.button.className = "GPshowOpen GPshowAdvancedToolPicto GPshowSearchEnginePicto gpf-btn fr-icon-search-line fr-btn fr-btn--lg";
            this.button.setAttribute("aria-pressed", "true");
            // this.button.setAttribute("type", "submit");
            // this.button.setAttribute("form", container.id);
            if (options.title) {
                this.button.setAttribute("title", options.title);
            }
            if (options.collapsible) {
                this.button.addEventListener("click", function () {
                    element.classList.toggle("ol-collapsed");
                    const pressed = this.button.getAttribute("aria-pressed") === "true";
                    this.button.setAttribute("aria-pressed", !pressed);
                    if (!pressed) {
                        input.focus();
                    } else {
                        input.blur();
                    }
                }.bind(this));
            }
            element.appendChild(this.button);
        }
        
        element.appendChild(container);

        const search = document.createElement("div");
        search.className = "GPInputGroup fr-input";
        container.appendChild(search);

        // Input
        const input = this.input = document.createElement("input");
        input.type = "text";
        input.className = "GPsearchInputText fr-input";
        input.id = Helper.getUid("GPsearchInputText-");
        input.placeholder = options.placeholder;
        input.autocomplete = "off";
        input.setAttribute("aria-label", options.ariaLabel);
        search.appendChild(input);

        // Options container
        this.optionscontainer = document.createElement("div");
        this.optionscontainer.className = "GPOptionsContainer";
        search.appendChild(this.optionscontainer);

        // Submit button
        const submit = this.subimtBt = document.createElement("button");
        submit.className = "GPsearchInputSubmit gpf-btn fr-icon-search-line fr-btn";
        submit.id = Helper.getUid("GPshowSearchEnginePicto-");
        submit.type = "submit";
        if (options.title) {
            submit.textContent = options.title;
            submit.setAttribute("title", options.title);
        }
        search.appendChild(submit);

        // Autocomplete container
        const acContainer = document.createElement("div");
        acContainer.className = "GPautoCompleteContainer GPelementHidden gpf-hidden";
        container.appendChild(acContainer);

        // Autocomplete list
        const autocompleteHeader = this.autocompleteHeader = document.createElement("div");
        autocompleteHeader.className = "GPautoCompleteHeader";
        acContainer.appendChild(autocompleteHeader);

        const autocompleteList = this.autocompleteList = document.createElement("ul");
        autocompleteList.className = "GPautoCompleteList";
        autocompleteList.id = Helper.getUid("GPautoCompleteList-");
        autocompleteList.setAttribute("role", "listbox");
        autocompleteList.setAttribute("tabindex", "-1");
        autocompleteList.setAttribute("aria-label", "Propositions");
        acContainer.appendChild(autocompleteList);

        const autocompleteFooter = this.autocompleteFooter = document.createElement("div");
        autocompleteFooter.className = "GPautoCompleteFooter";
        acContainer.appendChild(autocompleteFooter);

        // Input controller for accessibility
        input.setAttribute("role", "combobox");
        input.setAttribute("aria-controls", acContainer.id);
        input.setAttribute("aria-expanded", "false");
        input.setAttribute("aria-autocomplete", "list");
        input.setAttribute("aria-haspopup", "listbox");

        input.addEventListener("focus", () => {
            input.setAttribute("aria-expanded", "true");
            acContainer.classList.add("gpf-visible");
            acContainer.classList.remove("gpf-hidden");
            acContainer.classList.add("GPelementVisible");
            acContainer.classList.remove("GPelementHidden");
        });
        input.addEventListener("blur", (e) => {
            // N'agit que si le focus est hors de l'élément
            if (e.relatedTarget && autocompleteList.contains(e.relatedTarget)) {
                input.focus();
            } else {
                setTimeout(() => {
                    input.setAttribute("aria-expanded", "false");
                    acContainer.classList.remove("gpf-visible");
                    acContainer.classList.add("gpf-hidden");
                    acContainer.classList.remove("GPelementVisible");
                    acContainer.classList.add("GPelementHidden");
                }, 100);
            }
        });
    }

    setActive (active) {
        this.input.disabled = !!active;
        this.subimtBt.disabled = !!active;
    }

    /** Autocomplete and update list
     * @param {String} [value] input value
     * @param {Boolean} [force=false] force to add in historic
     * @api
     */
    autocomplete (value, force) {
        clearTimeout(this._completeDelay);
        this._completeDelay = setTimeout(function () {
            this.searchService.autocomplete(value, { force : force });
        }.bind(this), this.get("triggerDelay") || 100);
    }

    onAutocomplete (e) {
        clearTimeout(this._completeDelay);
        // Update list}
        this._updateList(e.result);
        this.dispatchEvent(e);
    }

    /** Effectue la recherche de géocodage
     * @param {String} [value] input value
     * @api
     */
    search (item) {
        clearTimeout(this._completeDelay);
        this._completeDelay = setTimeout(function () {
            this.searchService.search(item);
        }.bind(this), this.get("triggerDelay") || 100);
    }
    /** Do something on search ready
     * @param {Object} e event
     *  @param {String} e.search search string
     *  @param {Object|Boolean} e.options options given to autocomplete
     *  @param {Array<*>} e.result result of autocomplete
     * @api
     */
    onSearch (e) {
        clearTimeout(this._completeDelay);
        // Update list}
        this.dispatchEvent(e);
    }
    /** An item has been selected
     * @param {*} item selected item
     * @api
     */
    select (item) {
        clearTimeout(this._completeDelay);
        const title = this.getItemTitle(item);
        this.input.value = title;
        this._currentValue = title;
        this._updateHistoric(item);
        this._updateList();
        this.dispatchEvent({ 
            type : "select", 
            title : this.getItemTitle(item),
            item : item
        });
    }
    /**
     * Show historic list
     * @api
     */
    showHistoric () {
        clearTimeout(this._completeDelay);
        if (this._historic) {
            this._updateList(this._historic.length ? this._historic : [], "history");
        }
    }
    /**
     * Update autocomplete list
     * @param {Array<*>} tab list of autocomplete items
     * @param {string} [type="search"] Optionnel. Type à inclure. Valeur autorisée : "history", "search"
     */
    _updateList (tab, type = "search") {
        this.autocompleteList.parentNode.dataset.type = type;
        //
        tab = (tab || []).slice(0, this.get("maximumEntries") || 10);
        // Accessibility
        this.autocompleteList.querySelectorAll("li").forEach(li => li.classList.remove("active"));
        this.input.setAttribute("aria-activedescendant", "");
        this.input.setAttribute("data-active-option", "");
        // Update list
        this.autocompleteList.innerHTML = "";
        const iconClass = typeClasses[type] || typeClasses["search"];
        tab.forEach((item, idx) => {
            const li = document.createElement("li");
            li.id = Helper.getUid("GPsearchHistoric-");
            li.className = `GPsearchHistoric gpf-panel__item gpf-panel__item-searchengine ${iconClass} fr-icon--sm`;
            li.setAttribute("role", "option");
            li.setAttribute("data-idx", idx);
            li.innerHTML = this.getItemTitle(item);
            this.autocompleteList.appendChild(li);
            li.addEventListener("click", function (e) {
                const idx = Number(e.target.getAttribute("data-idx"));
                this.select(tab[idx]);
                this.search(tab[idx], idx);
            }.bind(this));
        });    
    }
    /** Get item title given an item object
     * @param {*} item 
     * @returns {String} title
     * @api
     */
    getItemTitle (item) {
        return this.searchService.getItemTitle(item);
    }
    /**
     * Add or replace value in historic list
     * @param {*} value 
     */
    _updateHistoric (value) {
        if (this._historic) {
            // Update historic
            const idx = this._historic.indexOf(value);
            if (idx !== -1) {
                this._historic.splice(idx, 1);
            }
            this._historic.unshift(value);
            // Remove last if > 10
            if (this._historic.length > (this.get("maximumEntries") || 10)) {
                this._historic.pop();
            }

            // Save in localStorage
            localStorage.setItem(this._historicName, JSON.stringify(this._historic));
        }
    }

}

export default SearchEngineBase;

// Expose SearchEngine as ol.control.SearchEngine (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.SearchEngineBase = SearchEngineBase;
}
