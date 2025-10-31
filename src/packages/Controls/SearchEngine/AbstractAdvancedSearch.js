// import CSS
import "../../CSS/Controls/SearchEngine/GPFadvancedSearchEngine.css";
import Control from "../Control";
import Logger from "../../Utils/LoggerByDefault";
import Helper from "../../Utils/Helper";
import Map from "ol/Map";
var logger = Logger.getLogger("abstractAdvancedSearch");

// Typedefs partagés disponibles dans ./typedefs.js (AbstractAdvancedSearchOptions, ...)

/** 
 * @classdesc
 * Contrôle de base pour les recherches avancées (formulaires spécialisés).
 *
 * Fournit la structure HTML du formulaire, la gestion des inputs et
 * les événements d'effacement et de soumission. Les contrôles spécialisés
 * doivent surcharger addInputs() et _onSearch().
 *
 * @alias ol.control.AbstractAdvancedSearch
 * @module AbstractAdvancedSearch
*/
class AbstractAdvancedSearch extends Control {

    /**
    * @constructor
    * @param {AbstractAdvancedSearchOptions} options Options du constructeur
    * 
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
     * Initialise le contrôle (appelé par le constructeur).
     * @param {AbstractAdvancedSearchOptions} options Options d'initialisation
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

    /**
     * Retourne le nom du la recherche avancée
     * @returns {String} Nom de la recherche avancée
     */
    getName () {
        return this.name;   
    }

    /**
     * Retourne le formulaire de la recherche avancée
     * @returns {HTMLFormElement} Formulaire de la recherche
     */
    getContent () {
        return this.element;   
    }

    /**
     * Crée le conteneur DOM du formulaire.
     *
     * @param {AbstractAdvancedSearchOptions} options Options d'initialisation
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
     * Ajoute des éléments d'input dans la collection `this.inputs`.
     * Cette méthode est abstraite et doit être surchargée par les implémentations spécifiques.
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
     * Réinitialise les champs du formulaire.
     * @param {PointerEvent} e Événement d'effacement
     * @protected
     */
    _onErase (e) {
        e.preventDefault();
        this.getContent().querySelectorAll("input").forEach(input => {
            input.value = "";
        });
    }

    /**
     * Traitement lors de la soumission du formulaire (recherche).
     * Doit être surchargé par les contrôles spécifiques pour lancer la recherche.
     * @param {SubmitEvent|PointerEvent} e Évènement de soumission / recherche
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
