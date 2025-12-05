export default InseeSearchService;
/**
 * @classdesc
 * Service de recherche pour les codes INSEE : interroge l'API geo.api.gouv.fr puis relaie vers IGNSearchService.
 * @see {@link https://geo.api.gouv.fr/}
 *
 * @alias ol.service.InseeSearchService
 * @module SearchService
 */
declare class InseeSearchService extends AbstractSearchService {
    /**
     * Service IGN utilisé pour relayer la recherche.
     * @type {IGNSearchService}
     * @private
     */
    private ignService;
    /**
     * Désactive l'autocomplétion (non disponible pour INSEE).
     * @override
     */
    override autocomplete(): void;
    /**
     * Lance une recherche par code INSEE.
     * @override
     * @param {Object} object Objet contenant le code INSEE
     * @param {String} object.location Code INSEE à rechercher
     * @param {Boolean} [arr] Si vrai, recherche pour un arrondissement
     */
    override search(object: {
        location: string;
    }, arr?: boolean): void;
    /**
     * Relaye l'événement de recherche du service IGN.
     * @private
     * @param {Event} e Événement de recherche
     */
    private _onSearch;
    /**
     * Interroge l'API geo.api.gouv.fr pour obtenir les informations du code INSEE.
     * @see {@link https://geo.api.gouv.fr/}
     * @private
     * @param {Object} settings Paramètres de requêtes
     * @param {String} settings.value Code INSEE à interroger
     * @param {Boolean} [settings.arr] Si vrai, recherche sur un arrondissement
     * @returns {Promise<Object[]>} Résultat de l'API
     */
    private _requestGeoAPI;
}
import AbstractSearchService from "./AbstractSearchService";
//# sourceMappingURL=InseeSearchService.d.ts.map