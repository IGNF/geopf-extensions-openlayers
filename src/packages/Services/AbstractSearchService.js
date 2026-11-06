import Logger from "../Utils/LoggerByDefault";
import BaseObject from "ol/Object";

var logger = Logger.getLogger("searchengine");

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

    /**
     * Retourne un résultat résolu localement pour une saisie, sans appel à un service distant
     * (ex. couple de coordonnées). Utilisé lors de la validation du formulaire.
     * Méthode à surcharger dans les services concrets.
     * @param {String} text Saisie utilisateur
     * @returns {Object|null} Élément à sélectionner, ou null si aucun résultat local
     */
    getDirectResult (text) {
        return null;
    }

    /**
     * Indique si un élément sélectionné peut être enregistré dans l'historique de recherche.
     * Méthode à surcharger dans les services concrets.
     * @param {Object} item Élément sélectionné
     * @returns {Boolean} true si l'élément peut être historisé
     */
    isHistorizable (item) {
        return true;
    }

    /**
     * Invalide les requêtes en cours : leurs réponses ultérieures seront ignorées.
     * Méthode à surcharger dans les services concrets.
     */
    cancel () {}

}

export default AbstractSearchService;

// Expose SearchEngine as ol.control.SearchEngine (for a build bundle)
if (window.ol) {
    if (!window.ol.service) {
        window.ol.service = {};
    }
    window.ol.service.AbstractSearchService = AbstractSearchService;
}
