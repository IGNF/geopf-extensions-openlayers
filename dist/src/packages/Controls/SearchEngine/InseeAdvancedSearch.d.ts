export default InseeAdvancedSearch;
/**
 * @classdesc
 * Contrôle de recherche avancée pour les codes INSEE.
 *
 * @alias ol.control.InseeAdvancedSearch
 * @module InseeAdvancedSearch
 * @extends AbstractAdvancedSearch
 */
declare class InseeAdvancedSearch extends AbstractAdvancedSearch {
    /**
     * @constructor
     * @param {AbstractAdvancedSearchOptions} [options] - Options du contrôle.
     */
    constructor(options?: AbstractAdvancedSearchOptions);
    _inputPattern: RegExp | undefined;
    inseeInput: SearchEngineGeocodeIGN | undefined;
    /**
     * Permet de supprimer les messages d'erreur, en plus du fonctionnement initial.
     *
     * @protected
     * @override
     */
    protected override _onErase(e: any): void;
    /**
     * Handler de la recherche déclenchée (bouton / submit).
     * Valide le code INSEE puis lance la recherche via le SearchEngine associé.
     * @protected
     * @param {PointerEvent|Event} e - Événement de recherche.
     */
    protected _onSearch(e: PointerEvent | Event): void;
}
import AbstractAdvancedSearch from "./AbstractAdvancedSearch";
import SearchEngineGeocodeIGN from "./SearchEngineGeocodeIGN";
//# sourceMappingURL=InseeAdvancedSearch.d.ts.map