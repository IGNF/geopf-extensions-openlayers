export default SearchEngineGeocodeIGN;
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
declare class SearchEngineGeocodeIGN extends SearchEngineBase {
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
    constructor(options?: SearchEngineGeocodeIGNOptions);
    /**
     * Initialise les options du contrôle.
     *
     * @override
     * @param {SearchEngineGeocodeIGNOptions} options - Options du constructeur.
     */
    override initialize(options: SearchEngineGeocodeIGNOptions): void;
    REMOVE_FEATURE_EVENT: string | undefined;
    /**
     * Initialise les événements du contrôle.
     *
     * @override
     * @param {SearchEngineGeocodeIGNOptions} options - Options du constructeur.
     */
    override _initEvents(options: SearchEngineGeocodeIGNOptions): void;
}
import SearchEngineBase from "./SearchEngineBase";
//# sourceMappingURL=SearchEngineGeocodeIGN.d.ts.map