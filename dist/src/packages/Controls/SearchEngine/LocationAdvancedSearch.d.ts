export default LocationAdvancedSearch;
/**
 * @classdesc
 * Recherche avancée par lieu / toponyme (formulaire pour filtrer par type, code postal, INSEE).
 *
 * @alias ol.control.LocationAdvancedSearch
 * @module LocationAdvancedSearch
 */
declare class LocationAdvancedSearch extends AbstractAdvancedSearch {
    searchService: IGNSearchService;
    /** Gère les erreurs de recherche.
     * @private
     * @param {Event} e Événement d'erreur
     */
    private handleError;
    /**
     * Gère les résultats de la recherche.
     * @private
     * @param {Event} e Événement de recherche contenant les résultats
     */
    private handleSearch;
    _typeList: any;
    /** Set categories list
     * @param {Array<String>|Object} categories Liste des catégories
     * @param {HTMLSelectElement} [select] Élément select à remplir (par défaut celui du formulaire)
     */
    setCategories(categories: Array<string> | any, select?: HTMLSelectElement): void;
    /**
     * Affiche la liste des résultats multiples et permet la sélection.
     * @private
     * @param {Event} e Événement de recherche contenant les résultats
     */
    private handleMultipleResults;
    /**
     * Crée un conteneur label + input pour le formulaire.
     * @private
     * @param {String} text Texte du label
     * @param {String} type Classe CSS du conteneur
     * @param {HTMLElement} input Élément input à rattacher
     * @param {String} [hint] Texte d'aide optionnel
     * @returns {HTMLElement} Conteneur HTML
     */
    private _getLabelContainer;
    searchResult: HTMLUListElement | undefined;
    searchInput: HTMLInputElement | undefined;
    filter: {
        category: string;
        postcode: string;
        citycode: string;
    } | {
        category: any;
        postcode: string;
        citycode: string;
    } | undefined;
    /** Clear error messages in the form
     * @private
     */
    private _clearMessages;
    /** Show error message for a given input
     * @param {String} name Input name
     * @param {String} [message] Message to show (if none remove message)
     * @private
     */
    private _showMessage;
    /**
     * @protected
     * @override
     * @param {PointerEvent} e Événement de soumission
     * param {String} [commune] Nom de la commune (optionnel)
     */
    protected override _onSearch(e: PointerEvent, commune: any): void;
}
import AbstractAdvancedSearch from "./AbstractAdvancedSearch";
import IGNSearchService from "../../Services/IGNSearchService";
//# sourceMappingURL=LocationAdvancedSearch.d.ts.map