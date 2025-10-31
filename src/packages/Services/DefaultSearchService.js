import Logger from "../Utils/LoggerByDefault";
import AbstractSearchService from "./AbstractSearchService";

var logger = Logger.getLogger("searchengine");

/**
 * @classdesc
 * Service de recherche par défaut (implémentation simple pour tests ou données locales).
 *
 * @alias ol.service.DefaultSearchService
 * @module SearchService
 * @extends AbstractSearchService
 */
class DefaultSearchService extends AbstractSearchService {

    /**
     * Constructeur du service par défaut.
     * @constructor
     * @param {AbstractSearchServiceOptions} options Options du service (ex: {searchTab: [...]})
     * @param {Array<Object|String>} options.searchTab Tableau d'élément dans lequel rechercher
     */
    constructor (options) {
        options = options || {};
        super(options);
        /**
         * Nom de la classe (héritage)
         * @private
         */
        this.CLASSNAME = "DefaultSearchService";
        if (options.searchTab) {
            this._searchTab = options.searchTab || [];
        }
    }

    /**
     * Lance une autocomplétion sur la liste locale.
     * @override
     * @param {String} value Valeur à compléter
     */
    autocomplete (value) {
        // Simulate asynchronous behavior
        this._autocompleteLocations = [];
        const rex = new RegExp(value, "i");
        (this._searchTab || []).forEach((city) => {
            if (rex.test(city.toLowerCase())) {
                this._autocompleteLocations.push(city);
            }
        });
        // When search is finished
        this.dispatchEvent({ 
            type : this.AUTOCOMPLETE_EVENT,
            result : this._autocompleteLocations
        });
    }

    /**
     * Lance une recherche (simulée).
     * @override
     * @param {Object} obj Options de recherche
     */
    search (obj) {
        this.dispatchEvent({ 
            type : this.SEARCH_EVENT, 
            result : obj
        });
    }

}

export default DefaultSearchService;

// Expose DefaultSearchService as ol.service.DefaultSearchService (for a build bundle)
if (window.ol) {
    if (!window.ol.service) {
        window.ol.service = {};
    }
    window.ol.service.DefaultSearchService = DefaultSearchService;
}
