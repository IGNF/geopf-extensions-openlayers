import Logger from "../Utils/LoggerByDefault";
import AbstractSearchService from "./AbstractSearchService";
import IGNSearchService from "./IGNSearchService";

var logger = Logger.getLogger("searchengine");


/**
 * @classdesc
 * Service de recherche pour les codes INSEE : interroge l'API geo.api.gouv.fr puis relaie vers IGNSearchService.
 * @see {@link https://geo.api.gouv.fr/}
 *
 * @alias ol.service.InseeSearchService
 * @module SearchService
 */
class InseeSearchService extends AbstractSearchService {

    /**
     * Constructeur du service INSEE.
     * @constructor
     * @param {AbstractSearchServiceOptions} options Options du service INSEE
     */
    constructor (options) {
        options = options || {};
        // Aucune autocomplétion
        options.autocomplete = false;
        super(options);
        /**
         * Nom de la classe (heritage)
         * @private
         */
        this.CLASSNAME = "InseeSearchService";

        /**
         * Service IGN utilisé pour relayer la recherche.
         * @type {IGNSearchService}
         * @private
         */
        this.ignService = new IGNSearchService({
            autocomplete : false,
            returnTrueGeometry : true,
            index : "poi",
        });

        this.ignService.on(this.SEARCH_EVENT, this._onSearch.bind(this));
    }

    /**
     * Désactive l'autocomplétion (non disponible pour INSEE).
     * @override
     */
    autocomplete () {
        return;
    }

    /**
     * Lance une recherche par code INSEE.
     * @override
     * @param {Object} object Objet contenant le code INSEE
     * @param {String} object.location Code INSEE à rechercher
     * @param {Boolean} [arr] Si vrai, recherche pour un arrondissement
     */
    search (object, arr) {
        const insee = object.location;
        const response = this._requestGeoAPI({ value : insee, arr : !!arr });
        response.then(r => {
            if (r instanceof Array && r.length) {
                const result = r[0];

                let location = result.nom;
                // Sinon la requête ne se lancera pas
                if (result.nom.length < 3) {
                    location = `${result.nom}, ${result.codesPostaux[0]}`;
                }

                let filters = {
                    category : "administratif",
                    citycode : result.code
                };

                const obj = {
                    location : location,
                    filters : filters,
                };

                this.ignService.search(obj);
            } else {
                // Cherche, pour les département 13, 69 et 75 si c'est un arrondissement
                if (/^(13|69|75)/.test(insee) && !arr) {
                    this.search(object, true);
                    return;
                }
                // Pas de résultat, on envoi un événement "search" vide
                this._onSearch({
                    type : this.SEARCH_EVENT,
                });
            }
        });
    }

    /**
     * Relaye l'événement de recherche du service IGN.
     * @private
     * @param {Event} e Événement de recherche
     */
    _onSearch (e) {
        this.dispatchEvent(e);
    }

    /**
     * Interroge l'API geo.api.gouv.fr pour obtenir les informations du code INSEE.
     * @see {@link https://geo.api.gouv.fr/}
     * @private
     * @param {Object} settings Paramètres de requêtes
     * @param {String} settings.value Code INSEE à interroger
     * @param {Boolean} [settings.arr] Si vrai, recherche sur un arrondissement
     * @returns {Promise<Object[]>} Résultat de l'API
     */
    async _requestGeoAPI (settings) {
        const baseURL = "https://geo.api.gouv.fr/communes";
        const format = "json";
        const fields = ["nom", "code", "codesPostaux"];
        const arr = settings.arr;
        let url = `${baseURL}?code=${settings.value}&format=${format}&fields=${fields}`;

        if (arr) {
            url += "&type=arrondissement-municipal";
        }

        try {
            const response = await fetch(url, {
                headers : {
                    "Content-Type" : "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error(error.message);
        }
    }

}

export default InseeSearchService;

// Expose InseeSearchService as ol.service.InseeSearchService (for a build bundle)
if (window.ol) {
    if (!window.ol.service) {
        window.ol.service = {};
    }
    window.ol.service.InseeSearchService = InseeSearchService;
}
