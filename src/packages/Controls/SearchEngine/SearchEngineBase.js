// import CSS
import "../../CSS/Controls/SearchEngine/GPFsearchEngine.css";
// import "../../CSS/Controls/SearchEngine/GPFsearchEngineStyle.css";
// import OpenLayers
// import Control from "ol/control/Control";
import OlObject from "ol/Object";
import Control from "../Control";
import Widget from "../Widget";
import Map from "ol/Map";
import Overlay from "ol/Overlay";
import {
    transform as olProjTransform,
    get as olProjGet,
    transformExtent as olProjTransformExtent
} from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
// import geoportal library access
import Gp from "geoportal-access-lib";
// import local
import Config from "../../Utils/Config";
import Logger from "../../Utils/LoggerByDefault";
import Utils from "../../Utils/Helper";
import Markers from "../Utils/Markers";
import Interactions from "../Utils/Interactions";
import SelectorID from "../../Utils/SelectorID";
import MathUtils from "../../Utils/MathUtils";
import SearchEngineUtils from "../../Utils/SearchEngineUtils";
import GeocodeUtils from "../../Utils/GeocodeUtils";
import CRS from "../../CRS/CRS";
// import local des layers
import GeoportalWMS from "../../Layers/LayerWMS";
import GeoportalWMTS from "../../Layers/LayerWMTS";
import GeoportalWFS from "../../Layers/LayerWFS";
import GeoportalMapBox from "../../Layers/LayerMapBox";
// Service
import Search from "../../Services/Search";
import DefaultSearchService from "../../Services/SearchServiceBase"; 
// DOM
import SearchEngineDOM from "./SearchEngineDOM";
import checkDsfr from "../Utils/CheckDsfr";
import { getUid } from "ol";


var logger = Logger.getLogger("searchengine");

/**
 * @typedef {Object} SearchEngineOptions
 * @property {number} [id] - Identifiant du widget (option avancée)
 * @property {string} [apiKey] - Clé API. "calcul" par défaut.
 * @property {boolean} [ssl=true] - Utilisation du protocole https (true par défaut)
 * @property {boolean} [collapsed=true] - Mode réduit (true par défaut)
 * @property {boolean} [collapsible=true] - Contrôle pliable ou non (true par défaut)
 * @property {string} [direction="start"] - Position du picto (loupe), "start" par défaut
 * @property {string} [placeholder="Rechercher un lieu, une adresse"] - Placeholder de la barre de recherche
 * @property {boolean} [displayMarker=true] - Afficher un marqueur sur le résultat (true par défaut)
 * @property {string} [markerStyle="lightOrange"] - Style du marqueur ("lightOrange", "darkOrange", "red", "turquoiseBlue")
 * @property {string} [markerUrl=""] - URL du marqueur (prioritaire sur markerStyle)
 * @property {boolean} [splitResults=false] - Désactiver la recherche par couches (false par défaut)
 * @property {boolean} [displayButtonAdvancedSearch=false] - Afficher le bouton de recherche avancée (false par défaut)
 * @property {boolean} [displayButtonGeolocate=false] - Afficher le bouton de géolocalisation (false par défaut)
 * @property {boolean} [displayButtonCoordinateSearch=false] - Afficher le bouton de recherche par coordonnées (false par défaut)
 * @property {boolean} [coordinateSearchInAdvancedSearch=false] - Afficher la recherche par coordonnées dans la recherche avancée
 * @property {boolean} [displayButtonClose=true] - Afficher le bouton de fermeture (true par défaut)
 * @property {Object} [coordinateSearch] - Options de recherche par coordonnées
 * @property {HTMLElement} [coordinateSearch.target=null] - Cible d'affichage des résultats
 * @property {Array} [coordinateSearch.units] - Unités de coordonnées à afficher ("DEC", "DMS", "M", "KM")
 *      Values may be "DEC" (decimal degrees), "DMS" (sexagecimal) for geographical coordinates,
 *      and "M" or "KM" for metric coordinates
 * @property {Array} [coordinateSearch.systems] - Systèmes de projection à afficher (objet avec crs, label, type)
 * @property {Object} [advancedSearch] - Options de recherche avancée (voir geocodeOptions.filterOptions)
 * @property {HTMLElement} [advancedSearch.target=null] - Cible d'affichage des résultats
 * @property {Object} [resources] - Ressources utilisées par les services
 * @property {string|string[]} [resources.geocode="location"] - Ressources de géocodage
 * @property {string[]} [resources.autocomplete] - Ressources d'autocomplétion
 * @property {boolean} [resources.search=false] - Activer le service de recherche (false par défaut)
 * @property {Object} [searchOptions={}] - Options du service de recherche
 * @property {boolean} [searchOptions.addToMap=true] - Ajouter la couche automatiquement à la carte
 * @property {string[]} [searchOptions.filterServices] - Filtrer sur une liste de services ("WMTS,TMS" par défaut)
 * @property {string[]} [searchOptions.filterWMTSPriority] - Filtrer sur les couches WMTS prioritaires
 * @property {string[]} [searchOptions.filterProjections] - Filtrer sur une liste de projections
 * @property {boolean} [searchOptions.filterLayersPriority=false] - Filtrer sur les couches prioritaires
 * @property {boolean} [searchOptions.filterLayers=true] - Activer le filtrage automatique des couches
 * @property {Object} [searchOptions.filterLayersList] - Liste des couches à filtrer {"layerName": "service"}
 * @property {boolean} [searchOptions.filterTMS=true] - Garder les TMS avec style dans les métadonnées
 * @property {Object} [searchOptions.serviceOptions] - Options du service de recherche
 * @property {string} [searchOptions.serviceOptions.url] - URL du service
 * @property {string} [searchOptions.serviceOptions.index="standard"] - Index de recherche
 * @property {string[]} [searchOptions.serviceOptions.fields=["title","layer_name"]] - Champs de recherche
 * @property {number} [searchOptions.serviceOptions.size=1000] - Nombre de réponses du service
 * @property {number} [searchOptions.serviceOptions.maximumResponses=10] - Nombre de résultats à afficher
 * @property {number} [searchOptions.maximumEntries] - Nombre maximum de résultats à afficher
 * @property {Object} [geocodeOptions={}] - Options du service de géocodage (voir Gp.Services.geocode {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~geocode Gp.Services.geocode}))
 * @property {Object} [geocodeOptions.serviceOptions] - Options du service de géocodage
 * @property {Object} [autocompleteOptions={}] - Options du service d'autocomplétion (voir Gp.Services.autoComplete {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~autoComplete Gp.Services.autoComplete})
 * @property {Object} [autocompleteOptions.serviceOptions] - Options du service d'autocomplétion
 * @property {boolean} [autocompleteOptions.triggerGeocode=false] - Déclencher une requête de géocodage si aucune suggestion
 * @property {number} [autocompleteOptions.triggerDelay=1000] - Délai avant la requête de géocodage (ms)
 * @property {number} [autocompleteOptions.maximumEntries] - Nombre maximum de résultats d'autocomplétion à afficher
 * @property {boolean} [autocompleteOptions.prettifyResults=false] - Nettoyer/embellir les résultats d'autocomplétion
 * @property {string|number|Function} [zoomTo] - Niveau de zoom à appliquer sur le résultat ("auto", niveau, ou fonction)
 *       Value possible : auto or zoom level.
 *       Possible to overload it with a function :
 *       zoomTo : function (info) {
 *           // do some stuff...
 *           return zoom;
 *       }
 */


/**
 * @classdesc
 * SearchEngine Base control
 *
 * @alias ol.control.SearchEngineBase
 * @module SearchEngine
*/
class SearchEngineBase extends Control {

    constructor (options) {
        options = options || {};
        // call ol.control.Control constructor
        super(options);

        /**
         * Nom de la classe (heritage)
         * @private
         */
        this.CLASSNAME = "SearchEngineBase";

        this.searchService = options.searchService || new DefaultSearchService();
        this.searchService.on("search", function (e) {
            this.onSearch(e);
        }.bind(this));

        // initialisation du composant
        this.initialize(options);

        // Widget main DOM container
        this._initContainer(options);

        this._initEvents(options);

        // Get historic in localStorage
        this._historic = false;
        this._historicName = "GPsearch-" + (typeof options.historic === "string" ? options.historic : this.CLASSNAME);
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

        return this;
    }
    /**
     * Initialize SearchEngine control (called by SearchEngine constructor)
     *
     * @param {Object} options - constructor options
     * @private
     */
    initialize (options) {

    }
    /** Add event listeners
     * @param {Object} options - constructor options
     * @private
     */
    _initEvents (options) {
        this.input.addEventListener("input", function (e) {
        }.bind(this));
        this.input.addEventListener("keydown", function (e) {
            if (/ArrowDown|ArrowUp/.test(e.key)) {
                e.preventDefault();
            }
        }.bind(this));
        this.input.addEventListener("keyup", function (e) {
            // autocomplete list
            const list = Array.from(this.autocompleteList.querySelectorAll("li"));
            let idx = list.findIndex(li => li.classList.contains("active"));
            // Handle key events
            if (/ArrowDown|ArrowUp/.test(e.key)) {
                e.preventDefault();
                // Navigation in autocomplete list
                if (list.length === 0) {
                    return;
                }
                list.forEach(li => li.classList.remove("active"));
                if (e.key === "ArrowDown") {
                    idx++;
                    if (idx >= list.length) {
                        idx = 0;
                    }
                } else if (e.key === "ArrowUp") {
                    idx--;
                    if (idx < 0) {
                        idx = list.length - 1;
                    }
                }
                // Set active
                const current = list[idx];
                current.classList.add("active");
                this.input.value = current.innerText;
                this.input.setAttribute("aria-activedescendant", current.id);
                this.input.setAttribute("data-active-option", current.id);
            } else if (
                (e.target.value.length && e.target.value.length >= (options.minChars || 0)) 
                || (e.key === "Enter")
            ) {
                if (idx >= 0) {
                    // An item has been selected    
                    list[idx].click();
                } else {
                    // Autocomplete
                    if (e.target.value !== this._currentValue) {
                        this.autocomplete(e.target.value, e.key === "Enter");
                    }
                }
            } else {
                // Show historic
                this.showHistoric();
            }
            this._currentValue = e.target.value;
        }.bind(this), false);
    }
    /**
     * 
     * @param {*} options 
     */
    _initContainer (options) {
        const element = this.element = document.createElement("div");
        element.className = "GPwidget gpf-widget ol-collapsed";
        element.id = "GPsearchEngine-" + (window.ol.getUid ? window.ol.getUid(this) : getUid(this));
        // Add button if no target
        if (!options.target) {
            this.button = document.createElement("button");
            this.button.id = "GPshowSearchEnginePicto-" + (window.ol.getUid ? window.ol.getUid(this) : getUid(this));
            this.button.className = "GPshowOpen GPshowAdvancedToolPicto GPshowSearchEnginePicto gpf-btn gpf-btn-icon-search fr-btn";
            this.button.setAttribute("aria-pressed", "false");
            this.button.setAttribute("type", "button");
            this.button.setAttribute("title", options.title || options.label || "Search");
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
            element.appendChild(this.button);
        }
        const container = document.createElement("form");
        container.className = "gpf-panel__content fr-modal__content";
        container.id = "GPsearchInput-Base-" + (window.ol.getUid ? window.ol.getUid(this) : getUid(this));
        container.addEventListener("submit", function (e) {
            e.preventDefault();
            return false;
        });
        element.appendChild(container);


        // Input
        const input = this.input = document.createElement("input");
        input.type = "text";
        input.className = "GPsearchInputText gpf-input fr-input";
        input.id = "GPsearchInputText-" + (window.ol.getUid ? window.ol.getUid(this) : getUid(this));
        input.placeholder = options.placeholder || "Rechercher...";
        input.autocomplete = "off";
        input.setAttribute("aria-label", options.ariaLabel || "Rechercher");
        container.appendChild(input);

        // Autocomplete container
        const autocompleteList = this.autocompleteList = document.createElement("ul");
        autocompleteList.className = "GPautoCompleteList GPelementHidden gpf-panel fr-modal gpf-hidden";
        autocompleteList.id = "GPautocompleteList-" + (window.ol.getUid ? window.ol.getUid(this) : getUid(this));
        autocompleteList.setAttribute("role", "listbox");
        autocompleteList.setAttribute("tabindex", "-1");
        autocompleteList.setAttribute("aria-label", "Propositions");
        container.appendChild(autocompleteList);

        // Input controller for accessibility
        input.setAttribute("role", "combobox");
        input.setAttribute("aria-controls", autocompleteList.id);
        input.setAttribute("aria-expanded", "false");
        input.setAttribute("aria-autocomplete", "list");
        input.setAttribute("aria-haspopup", "listbox");

        input.addEventListener("focus", function () {
            input.setAttribute("aria-expanded", "true");
            autocompleteList.classList.add("gpf-visible");
            autocompleteList.classList.remove("gpf-hidden");
            autocompleteList.classList.add("GPelementVisible");
            autocompleteList.classList.remove("GPelementHidden");
        }.bind(this));
        input.addEventListener("focusout", function () {
            setTimeout(function () {
                input.setAttribute("aria-expanded", "false");
                autocompleteList.classList.remove("gpf-visible");
                autocompleteList.classList.add("gpf-hidden");
                autocompleteList.classList.remove("GPelementVisible");
                autocompleteList.classList.add("GPelementHidden");
            }, 100);
        }.bind(this));
    }
    /** Autocomplete and update list
     * @param {string} [value] input value
     * @param {boolean} [force=false] force to add in historic
     * @api
     */
    autocomplete (value, force) {
        clearTimeout(this._completeDelay);
        this._completeDelay = setTimeout(function () {
            this.searchService.autocomplete(value, { force : force });
        }.bind(this), this.get("triggerDelay") || 300);
    }
    /** Do something on search ready
     * @param {Object} e event
     *  @param {string} e.search search string
     *  @param {Object|boolean} e.options options given to autocomplete
     *  @param {Array<*>} e.result result of autocomplete
     * @api
     */
    onSearch (e) {
        clearTimeout(this._completeDelay);
        // Update list}
        this._updateList(e.result);
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
        this._updateHistoric(title);
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
            this._updateList(this._historic.length ? this._historic : []);
        }
    }
    /**
     * Update autocomplete list
     * @param {Array<*>} tab list of autocomplete items
     */
    _updateList (tab) {
        tab = (tab || []).slice(0, this.get("maximumEntries") || 10);
        // Accessibility
        this.autocompleteList.querySelectorAll("li").forEach(li => li.classList.remove("active"));
        this.input.setAttribute("aria-activedescendant", "");
        this.input.setAttribute("data-active-option", "");
        // Update list
        this.autocompleteList.innerHTML = "";
        tab.forEach((item, idx) => {
            const li = document.createElement("li");
            li.id = "GPsearchHistoric-" + (window.ol.getUid ? window.ol.getUid(this) : getUid(this)) + "-" + idx;
            li.className = "GPsearchHistoric gpf-panel__item gpf-panel__item-searchengine";
            li.setAttribute("role", "option");
            li.setAttribute("data-idx", idx);
            li.innerHTML = this.getItemTitle(item);
            this.autocompleteList.appendChild(li);
            li.addEventListener("click", function (e) {
                const idx = Number(e.target.getAttribute("data-idx"));
                this.select(tab[idx]);
            }.bind(this));
        });    
    }
    /** Get item title given an item object
     * @param {*} item 
     * @returns {string} title
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
