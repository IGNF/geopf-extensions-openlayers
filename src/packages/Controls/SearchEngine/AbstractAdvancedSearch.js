// import CSS
import "../../CSS/Controls/SearchEngine/GPFadvancedSearchEngine.css";
import Control from "../Control";
import Logger from "../../Utils/LoggerByDefault";
import { Collection } from "ol";
import Helper from "../../Utils/Helper";
var logger = Logger.getLogger("abstractAdvancedSearch");

/**
 * @typedef {Object} AbstractAdvancedSearchOptions Options du constructeur pour le contrôle de recherche.
 *
 * @property {string} name - Nom de la recherche avancée.
 */

/**
 * @classdesc
 * AbstractAdvancedSearch Base control
 *
 * @alias ol.control.AbstractAdvancedSearch
 * @module AbstractAdvancedSearch
*/
class AbstractAdvancedSearch extends Control {

    /**
    * @constructor
    * @param {AbstractAdvancedSearchOptions} options Options du constructeur
    * 
    * @example
    */
    constructor (options) {
        options = options || {};
        // call ol.control.Control constructor
        super(options);

        /**
         * Nom de la classe (heritage)
         * @private
         */
        this.CLASSNAME = "AbstractAdvancedSearch";

        // initialisation du composant
        this.initialize(options);

        this.element = this._initContainer(options);
        this._initEvents(options);
    }

    setMap (map) {
        super.setMap(map);
        this.inputs.forEach(input => {
            if (input.setMap) {
                input.setMap(map);
            }
        });
        // Replace les boutons à la fin
        this.element.appendChild(this.btnGroup);
    }

    /**
     * Initialize SearchEngine control (called by SearchEngine constructor)
     *
     * @param {AbstractAdvancedSearchOptions} options - constructor options
     * @protected
     */
    initialize (options) {
        if (!options.name) {
            throw new SyntaxError("`name` is mandatory");
        } else {
            this.name = options.name;
        }

        this.inputs = [];
    }

    getName () {
        return this.name;   
    }

    getContent () {
        return this.element;   
    }

    /**
     * 
     * @param {AbstractAdvancedSearchOptions} options 
     * @returns {HTMLFormElement} Élément du formulaire
     * @protected
     */
    _initContainer (options) {
        let element = document.createElement("form");
        element.className = "GPForm gpf-advanced-search-form";
        element.id = Helper.getUid("GPAdvancedForm-" + this.CLASSNAME + "-");

        let fieldset = document.createElement("fieldset");
        fieldset.className = "GPFieldset fr-fieldset gpf-advanced-search-fieldset";
        fieldset.id = Helper.getUid("GPAdvancedFieldset-");

        this.addInputs();
        this.inputs.forEach((elem) => {
            if (elem instanceof Control) {
                elem.setTarget(element);
            } else {
                element.appendChild(elem);
            }
        });

        // element.appendChild(fieldset);

        const btnGroup = this.btnGroup = document.createElement("div");
        btnGroup.className = "GPFormFooter";
        
        const eraseBtn = this.eraseBtn = document.createElement("button");
        eraseBtn.type = "reset";
        eraseBtn.className = "GPBtn gpf-btn fr-btn fr-btn--tertiary";
        eraseBtn.id = Helper.getUid("GPEraseBtn-");
        eraseBtn.textContent = "Effacer";

        const searchBtn = this.searchBtn = document.createElement("button");
        searchBtn.className = "GPBtn gpf-btn fr-btn";
        searchBtn.id = Helper.getUid("GPSearchBtn-");
        searchBtn.type = "submit";
        searchBtn.textContent = "Rechercher";
        searchBtn.setAttribute("form", element.id);

        btnGroup.appendChild(eraseBtn);
        btnGroup.appendChild(searchBtn);

        element.appendChild(btnGroup);

        return element;
    }

    /**
     * Ajoute des éléments d'input dans la collection `this.inputs`;
     * Cette méthode est abstraite et doit être surchargée dans les autres classes.
     * @protected
     * @abstract
     */
    addInputs () {
        
    }


    /** Add event listeners
     * @param {AbstractAdvancedSearchOptions} options - constructor options
     * @protected
     */
    _initEvents (options) {
        this.eraseBtn.onclick = this._onErase.bind(this);
        this.element.onsubmit = this._onSearch.bind(this);
    }

    /**
     * 
     * @param {PointerEvent} e 
     * @protected
     */
    _onErase (e) {
        e.preventDefault();
        this.getContent().querySelectorAll("input").forEach(input => {
            input.value = "";
        });
    }

    /**
     * 
     * @param {SubmitEvent} e
     * @abstract
     * @protected
     */
    _onSearch (e) {
        e.preventDefault();
    }

}

export default AbstractAdvancedSearch;

// Expose AbstractAdvancedSearch as ol.control.AbstractAdvancedSearch (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.AbstractAdvancedSearch = AbstractAdvancedSearch;
}
