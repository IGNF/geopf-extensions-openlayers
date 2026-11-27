// import CSS
import Logger from "../../Utils/LoggerByDefault";
import SearchEngineBase from "./SearchEngineBase";
import AbstractSearchService from "../../Services/AbstractSearchService";
import IGNSearchService from "../../Services/IGNSearchService";

var logger = Logger.getLogger("searchengine");

/**
 * @file
 * Contrôle de recherche spécialisé pour le géocodage IGN.
 * Ce contrôle hérite de SearchEngineBase et ajoute la gestion des options spécifiques IGN via la propriété `serviceOptions`.
 * Utilisez le typedef {@link SearchEngineGeocodeIGNOptions} pour bénéficier de l'autocomplétion et de la documentation dans VSCode/TypeDoc.
 *
 * @see {@link SearchEngineBaseOptions}
 * @see {@link AbstractSearchServiceOptions}
 */



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
 * Options pour le contrôle SearchEngineBase.
 * @typedef {Object} SearchEngineBaseOptions
 * @property {HTMLElement|String} [target] - Élément DOM ou sélecteur cible.
 * @property {String} [title="Rechercher"] - Texte du titre du bouton.
 * @property {String} [label=""] - Label affiché.
 * @property {String} [hint=""] - Texte d'aide.
 * @property {Boolean} [search=false] - Comportement en tant que barre de recherche.
 * @property {String} [collapsible=false] - Si vrai, le contrôle est repliable.
 * @property {String} [ariaLabel="Rechercher"] - Libellé ARIA.
 * @property {String} [placeholder=""] - Placeholder de l'input.
 * @property {Number} [minChars=0] - Nombre minimal de caractères pour autocomplétion.
 * @property {Number} [maximumEntries=5] - Nombre maximal d'entrées affichées.
 * @property {Boolean|String} [historic=true] - Gestion historique local (false|true|string).
 * @property {AbstractSearchService} [searchService] - Service de recherche.
 */

/**
 * Options pour le contrôle SearchEngineGeocodeIGN.
 * Étend SearchEngineBaseOptions et ajoute les options spécifiques du service IGN.
 * @typedef {SearchEngineBaseOptions & {
 *   serviceOptions?: AbstractSearchServiceOptions
 * }} SearchEngineGeocodeIGNOptions
 */

/**
 * @classdesc
 * Moteur de recherche spécialisé pour le géocodage IGN (implémentation de SearchEngineBase).
 *
 * @alias ol.control.SearchEngineGeocodeIGN
 * @module SearchEngine
 * @extends SearchEngineBase
 */
class SearchEngineGeocodeIGN extends SearchEngineBase {

    /**
     * Constructeur du contrôle SearchEngineGeocodeIGN.
     *
     * @constructor
     * @param {SearchEngineGeocodeIGNOptions} [options] Options du contrôle.
     * @example
     * const ctrl = new SearchEngineGeocodeIGN({
     *   placeholder: "Rechercher...",
     *   serviceOptions: { apiKey: "votre-cle", returnTrueGeometry: true }
     * });
     */
    constructor (options) {
        options = options || {};

        // call ol.control.Control constructor
        super(options);

        return this;
    }

    /**
     * Initialise les options du contrôle.
     *
     * @override
     * @param {SearchEngineGeocodeIGNOptions} options - Options du constructeur.
     */
    initialize (options) {
        /**
         * Nom de la classe (heritage)
         * @private
        */
        this.CLASSNAME = "SearchEngineGeocodeIGN";
        this.REMOVE_FEATURE_EVENT = "remove:feature";

        options.serviceOptions = options.serviceOptions ? options.serviceOptions : {};
        if (options.autocomplete === false) {
            this.set("autocomplete", false);
            options.serviceOptions.autocomplete = false;
        }

        options.serviceOptions.returnTrueGeometry = !!options.returnTrueGeometry;

        // Créé le serbice de géocodage IGN
        if (!options.searchService || !(options.searchService instanceof AbstractSearchService)) {
            options.searchService = new IGNSearchService(options);
        }

        super.initialize(options);
    }

    /**
     * Initialise les événements du contrôle.
     *
     * @override
     * @param {SearchEngineGeocodeIGNOptions} options - Options du constructeur.
     */
    _initEvents (options) {
        super._initEvents(options);
    }

}

export default SearchEngineGeocodeIGN;

// Expose SearchEngine as ol.control.SearchEngine (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.SearchEngineGeocodeIGN = SearchEngineGeocodeIGN;
}
