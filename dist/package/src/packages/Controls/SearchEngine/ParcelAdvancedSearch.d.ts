export default ParcelAdvancedSearch;
/**
 * @classdesc
 * Contrôle de recherche parcellaire.
 *
 * @extends {AbstractAdvancedSearch}
 * @alias ol.control.ParcelAdvancedSearch
 * @module ParcelAdvancedSearch
 */
declare class ParcelAdvancedSearch extends AbstractAdvancedSearch {
    searchService: IGNSearchService;
    /** An error occured during search
     * @param {Object} e Event
     */
    handleError(e: any): void;
    /** Search completed
     * @param {Object} e Event
     */
    handleSearch(e: any): void;
    /** Clear error messages in the form
     * @private
     */
    private _clearMessages;
    /** Show error message for a given input
     * @param {String} name Input name
     * @param {String} [message] Message to show (if none remove message)
     * @param {String} [what="error"] Message type (error, warning, info)
     * @private
     */
    private _showMessage;
    /** Change the section
     * @private
     */
    private setSection;
    /**
     * Show sections for a given prefix
     * @param {String} prefix Prefix code
     */
    setFeuille(prefix: string): void;
    /** Set the commune
     * @param {String} [id] Commune INSEE code
     * @param {String} [arrond] Arrondissement code
     */
    setCommune(id?: string, arrond?: string): void;
    communeId: any;
    arrondId: string | undefined;
    feuilles: {} | undefined;
    /** Filter listbox options on input value
     */
    filterListNumber(): void;
    currentFilter: any;
    insseSearchService: InseeSearchService | undefined;
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
    /**
     * Récupère les données d'une commune via l'API geo.api.gouv.fr
     * @private
     * @param {String} code Code INSEE ou code postal
     * @returns {Promise} Promesse avec les données de la commune : nom + code + codesPostaux (si codepostal))
     */
    private _fetchCommuneData;
    /**
     * Récupère les feuilles cadastrales d'une commune via le WFS Geopf
     * @private
     * @param {String} code Code INSEE de la commune
     * @param {String} [arrond] Code de l'arrondissement (pour les communes avec arrondissements municipaux)
     * @param {String} [prefix] Préfixe de la parcelle
     * @param {String} [section] Section de la parcelle
     * @returns {Promise} Promesse avec les données GeoJSON (feuilles ou parcelles si section renseignée)
     */
    private _fetchCadastre;
    controller: AbortController | null | undefined;
    comCodeInput: HTMLInputElement | undefined;
    autocompleteList: HTMLUListElement | undefined;
    prefixInput: HTMLSelectElement | undefined;
    sectionInput: HTMLSelectElement | undefined;
    numberInput: HTMLInputElement | undefined;
    numberList: HTMLUListElement | undefined;
    /** Do search
     * @protected
     * @override
     * @param {PointerEvent} e Événement de soumission
     */
    protected override _onSearch(e: PointerEvent): void;
}
import AbstractAdvancedSearch from "./AbstractAdvancedSearch";
import IGNSearchService from "../../Services/IGNSearchService";
import InseeSearchService from "../../Services/InseeSearchService";
//# sourceMappingURL=ParcelAdvancedSearch.d.ts.map