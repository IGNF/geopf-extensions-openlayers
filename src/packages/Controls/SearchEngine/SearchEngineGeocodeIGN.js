// import CSS
import "../../CSS/Controls/SearchEngine/GPFsearchEngine.css";
import Logger from "../../Utils/LoggerByDefault";
import SearchEngineBase from "./SearchEngineBase";
import { AbstractSearchService } from "./Service";
import IGNSearchService from "./Service";

var logger = Logger.getLogger("searchengine");

/**
 * Options spécifiques au contrôle IGN
 *
 * Cette définition combine (hérite) de SearchEngineBaseOptions
 * et ajoute une propriété `serviceOptions` qui contient
 * les options propres au service (IGNSearchService).
 *
 * @typedef {import("./SearchEngineBase.js").SearchEngineBaseOptions & {
 *   serviceOptions: import("./Service.js").AbstractSearchServiceOptions
 * }} SearchEngineGeocodeIGNOptions
 */

/**
 * @classdesc
 * SearchEngine Base control
 *
 * @alias ol.control.SearchEngineGeocodeIGN
 * @module SearchEngine
*/
class SearchEngineGeocodeIGN extends SearchEngineBase {

    /**
     * @constructor
     * @param {SearchEngineGeocodeIGNOptions} options Options du constructeur
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

        if (options.autocomplete === false) {
            this.set("autocomplete", false);
            options.serviceOptions = options.serviceOptions ? options.serviceOptions : {};
            options.serviceOptions.autocomplete = false;
        }
        options.returnTrueGeometry = true;

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
        // this.on("search", this.addResultToMap);
    }

}

export default SearchEngineGeocodeIGN;

// Expose SearchEngine as ol.control.SearchEngine (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.SearchEngineGeocodeIGN = SearchEngineGeocodeIGN;
}
