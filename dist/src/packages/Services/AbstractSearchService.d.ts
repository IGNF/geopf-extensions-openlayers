export default AbstractSearchService;
/**
 * @classdesc
 * Service de recherche abstrait : base commune pour les services d'autocomplétion et de géocodage.
 * À surcharger pour chaque type de service (IGN, INSEE, etc.).
 *
 * @alias ol.service.AbstractSearchService
 * @abstract
 * @module SearchService
 */
declare class AbstractSearchService extends BaseObject {
    /**
     * Constructeur du service abstrait.
     * @constructor
     * @param {AbstractSearchServiceOptions} options Options du service
     */
    constructor(options: AbstractSearchServiceOptions);
    /**
     * Nom de la classe (heritage)
     * @private
     */
    private CLASSNAME;
    /**
     * Initialise le service avec les options fournies.
     * @protected
     * @param {AbstractSearchServiceOptions} options Options de configuration du service
     */
    protected initialize(options: AbstractSearchServiceOptions): void;
    AUTOCOMPLETE_EVENT: string | undefined;
    SEARCH_EVENT: string | undefined;
    ERROR_EVENT: string | undefined;
    _autocompleteLocations: any[] | undefined;
    _locations: any[] | undefined;
    /**
     * Récupère la liste des résultats d'autocomplétion.
     * @param {Number} [index] Index du résultat (optionnel). Si non fourni, retourne tous les résultats.
     * @returns {Array<AutocompleteResult>|AutocompleteResult} Un tableau de résultats ou un résultat unique
     */
    getAutocompleteLocations(index?: number): Array<AutocompleteResult> | AutocompleteResult;
    /**
     * Récupère la liste des résultats de recherche finale.
     * @param {Number} [index] Index du résultat (optionnel). Si non fourni, retourne tous les résultats.
     * @returns {Array<SearchResult>|SearchResult} Un tableau de résultats ou un résultat unique
     */
    getResult(index?: number): Array<SearchResult> | SearchResult;
    /**
     * Lance une autocomplétion.
     * Méthode à surcharger dans les services concrets.
     * @param {String} text Texte d'autocomplétion
     * @abstract
     */
    autocomplete(text: string): void;
    /**
     * Lance une recherche.
     * Méthode à surcharger dans les services concrets.
     * @param {Object} obj Options de recherche (dépend du service)
     * @abstract
     */
    search(obj: any): void;
    /**
     * Retourne le titre à afficher pour un résultat.
     * Méthode à surcharger dans les services concrets.
     * @param {AutocompleteResult} obj Objet dont le titre dérive
     * @abstract
     * @returns {String} Titre du résultat
     */
    getItemTitle(obj: AutocompleteResult): string;
}
import BaseObject from "ol/Object";
//# sourceMappingURL=AbstractSearchService.d.ts.map