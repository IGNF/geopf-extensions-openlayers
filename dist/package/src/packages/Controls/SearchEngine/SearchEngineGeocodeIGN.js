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
 * @see SearchEngineBaseOptions
 * @see AbstractSearchServiceOptions
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
            options.searchService = new IGNSearchService(options.serviceOptions);
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
