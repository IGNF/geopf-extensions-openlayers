// import CSS
import "../../CSS/Controls/SearchEngine/GPFadvancedSearchEngine.css";
import Control from "../Control";
import Logger from "../../Utils/LoggerByDefault";
import { Collection } from "ol";
import Helper from "../../Utils/Helper";

var logger = Logger.getLogger("abstractAdvancedResearch");

/**
 * @typedef {Object} AbstractAdvancedResearchOptions Options du constructeur pour le contrôle de recherche.
 *
 * @property {string} name - Nom de la recherche avancée.
 */

/**
 * @classdesc
 * AbstractAdvancedResearch Base control
 *
 * @alias ol.control.AbstractAdvancedResearch
 * @module AbstractAdvancedResearch
*/
class AbstractAdvancedResearch extends Control {

    /**
    * @constructor
    * @param {AbstractAdvancedResearchOptions} options Options du constructeur
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
        this.CLASSNAME = "AbstractAdvancedResearch";

        // initialisation du composant
        this.initialize(options);

        this.element = this._initContainer(options);
        this._initEvents(options);
    }
    /**
     * Initialize SearchEngine control (called by SearchEngine constructor)
     *
     * @param {AbstractAdvancedResearchOptions} options - constructor options
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
        return this.containerthis.name;   
    }

    /**
     * 
     * @param {AbstractAdvancedResearchOptions} options 
     * @returns {HTMLFormElement} Élément du formulaire
     * @protected
     */
    _initContainer (options) {
        let element = document.createElement("form");
        element.className = "GPForm gpf-advanced-search-form";
        element.id = Helper.getUid("GPAdvancedForm-");

        this.addInputs();
        this.inputs.forEach((elem) => {
            element.appendChild(elem);
        });

        const btnGroup = document.createElement("div");
        btnGroup.className = "GPFormFooter";
        
        const eraseBtn = this.eraseBtn = document.createElement("button");
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
     * @param {AbstractAdvancedResearchOptions} options - constructor options
     * @protected
     */
    _initEvents (options) {
        this.eraseBtn.onclick = this._onErase.bind(this);
        /**
         * Fonction de recherche
         * @param {PointerEvent} e 
         */
        const onSearch = function (e) {
            e.preventDefault();
            this._onSearch(e);
            // TODO : AJOUTER ÉVÉNEMENT ONSEARCH ?
        };
        this.searchBtn.onclick = onSearch.bind(this);
    }

    /**
     * 
     * @param {PointerEvent} e 
     * @protected
     */
    _onErase (e) {
        this.inputs.forEach(input => {
            if (input.value !== undefined) {
                input.value = null;
            }
        });
    }


    /**
     * 
     * @param {PointerEvent} e
     * @abstract
     * @protected
     */
    _onSearch (e) {
        
    }

}

export default AbstractAdvancedResearch;

// Expose AbstractAdvancedResearch as ol.control.AbstractAdvancedResearch (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.AbstractAdvancedResearch = AbstractAdvancedResearch;
}
