import Logger from "../Utils/LoggerByDefault";
import BaseObject from "ol/Object";

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
 * Position dans un système de coordonnées.
 * @typedef {Object} Position
 * @property {Number} x - Longitude.
 * @property {Number} y - Latitude.
 */

/**
 * Résultat d'une autocomplétion (voir {@link https://ignf.github.io/geoportal-access-lib/latest/jsdoc/Gp.Services.AutoComplete.SuggestedLocation.html})
 * @typedef {Object} AutocompleteResult
 * @property {"StreetAddress"|"PositionOfInterest"} type - Type de suggestion.
 * @property {Position} position - Coordonnées du point, dans le système de coordonnées spécifiées.
 * @property {String} commune - Nom de la commune.
 * @property {String} fullText - Texte complet représentant la suggestion.
 * @property {String} postalCode - Code postal de la suggestion.
 * @property {Number} classification - Nombre utilisé pour classigier l'importance de l'endroit suggéré de 1 (plus important) à 7 (moins important)
 * @property {Array<String>} [poiType] - Types POI détaillés.
 * @property {String} [street] - Nom de la rue (types "StreetAddress" seulement).
 * @property {String} [kind] - Nature du point d'intérêt, e.g. "prefecture", "municipality"... (types "PositionOfInterest" seulement).
 */

/**
 * Résultat d'une recherche (géocodage final).
 * @typedef {Object} SearchResult
 * @property {import("ol/Feature").default} feature - Feature OL contenant la géométrie.
 * @property {import("ol/Feature").default|undefined} [extent] - Étendue si zone géographique.
 * @property {String} [infoPopup] - Texte à afficher dans un popup.
 */

/**
 * @classdesc
 * Service de recherche abstrait : base commune pour les services d'autocomplétion et de géocodage.
 * À surcharger pour chaque type de service (IGN, INSEE, etc.).
 *
 * @alias ol.service.AbstractSearchService
 * @abstract
 * @module SearchService
 */
class AbstractSearchService extends BaseObject {

    /**
     * Constructeur du service abstrait.
     * @constructor
     * @param {AbstractSearchServiceOptions} options Options du service
     */
    constructor (options) {
        options = options || {};

        // call ol.control.Control constructor
        super(options);

        if ((this.constructor == AbstractSearchService)) {
            throw new TypeError("AbstractSearchService cannot be instantiate");
        }
        /**
         * Nom de la classe (heritage)
         * @private
         */
        this.CLASSNAME = "AbstractSearchService";

        // initialisation du composant
        this.initialize(options);

        return this;
    }

    /**
     * Initialise le service avec les options fournies.
     * @protected
     * @param {AbstractSearchServiceOptions} options Options de configuration du service
     */
    initialize (options) {
        this.AUTOCOMPLETE_EVENT = "autocomplete";
        this.SEARCH_EVENT = "search";
        this.ERROR_EVENT = "error";

        this._autocompleteLocations = [];
        this._locations = [];

        if (options.autocomplete === false) {
            this.set("autocomplete", false);
        }
        this.set("index", options.index || "address,poi");
        this.set("limit", typeof options.limit === "number" ? options.limit : 1);
        this.set("returnTrueGeometry", !!options.returnTrueGeometry);
    }

    /**
     * Récupère la liste des résultats d'autocomplétion.
     * @param {Number} [index] Index du résultat (optionnel). Si non fourni, retourne tous les résultats.
     * @returns {Array<AutocompleteResult>|AutocompleteResult} Un tableau de résultats ou un résultat unique
     */
    getAutocompleteLocations (index) {
        if (index === undefined) {
            return this._autocompleteLocations;
        } else {
            return this._autocompleteLocations[index];
        }
    }

    /**
     * Récupère la liste des résultats de recherche finale.
     * @param {Number} [index] Index du résultat (optionnel). Si non fourni, retourne tous les résultats.
     * @returns {Array<SearchResult>|SearchResult} Un tableau de résultats ou un résultat unique
     */
    getResult (index) {
        if (index === undefined) {
            return this._locations;
        } else {
            return this._locations[index];
        }
    }

    /**
     * Lance une autocomplétion.
     * Méthode à surcharger dans les services concrets.
     * @param {String} text Texte d'autocomplétion
     * @abstract
     */
    autocomplete (text) { }


    /**
     * Lance une recherche.
     * Méthode à surcharger dans les services concrets.
     * @param {Object} obj Options de recherche (dépend du service)
     * @abstract
     */
    search (obj) { }


    /**
     * Retourne le titre à afficher pour un résultat.
     * Méthode à surcharger dans les services concrets.
     * @param {AutocompleteResult} obj Objet dont le titre dérive
     * @abstract
     * @returns {String} Titre du résultat
     */
    getItemTitle (obj) { 
        return obj;
    }

}

export default AbstractSearchService;

// Expose SearchEngine as ol.control.SearchEngine (for a build bundle)
if (window.ol) {
    if (!window.ol.service) {
        window.ol.service = {};
    }
    window.ol.service.AbstractSearchService = AbstractSearchService;
}
