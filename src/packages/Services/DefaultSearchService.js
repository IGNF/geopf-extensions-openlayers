import Logger from "../Utils/LoggerByDefault";
import AbstractSearchService from "./AbstractSearchService";

var logger = Logger.getLogger("searchengine");

/**
 * Options pour l'autocomplétion.
 * @typedef {Object} AutocompleteOptions
 * @property {Object} [serviceOptions] - Options passées à Gp.Services.autoComplete
 * @property {Number} [maximumResponses] - Nombre maximal de réponses retournées
 * @property {Boolean} [triggerGeocode=false] - Si vrai, déclenche une requête de géocodage lorsque l'autocomplétion échoue
 * @property {Number} [triggerDelay=1000] - Délai (ms) avant déclenchement du géocodage automatique
 * @property {Boolean} [prettifyResults=false] - Si vrai, embellit/filtre les résultats
 */

/**
 * Options pour la recherche finale (géocodage).
 * @typedef {Object} SearchOptions
 * @property {Object} [serviceOptions] - Options passées à Gp.Services.geocode.
 * @property {Number} [maximumResponses] - Nombre maximal de réponses.
 * @property {Boolean} [filterLayers] - Active le filtrage des résultats par couche.
 * @property {String|Array<String>} [index] - Indexs utilisés (ex. "address,poi").
 * @property {Number} [limit] - Limite de résultats.
 */

/**
 * Options pour le géocodage manuel.
 * @typedef {Object} GeocodeOptions
 * @property {Object} [serviceOptions] - Options passées à Gp.Services.geocode.
 * @property {String} [location] - Texte à géocoder.
 * @property {Function} [onSuccess] - Callback en cas de succès.
 * @property {Function} [onFailure] - Callback en cas d'échec.
 */

/**
 * Options de construction d'un service de recherche.
 * @typedef {Object} AbstractSearchServiceOptions
 * @property {String} [apiKey] - Clé API pour les services IGN.
 * @property {Boolean} [ssl=true] - Forcer HTTPS.
 * @property {AutocompleteOptions} [autocompleteOptions] - Options de l'autocomplétion.
 * @property {SearchOptions} [searchOptions] - Options de la recherche finale.
 * @property {GeocodeOptions} [geocodeOptions] - Options de géocodage.
 * @property {Boolean} [autocomplete=true]
 * @property {String} [index="address,poi"]
 * @property {Number} [limit=1]
 * @property {Boolean} [returnTrueGeometry=false]
 */


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
