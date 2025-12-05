export default AbstractAdvancedSearch;
/**
 * @classdesc
 * Contrôle de base pour les recherches avancées (formulaires spécialisés).
 *
 * Fournit la structure HTML du formulaire, la gestion des inputs et
 * les événements d'effacement et de soumission. Les contrôles spécialisés
 * doivent surcharger addInputs() et _onSearch().
 *
 * @alias ol.control.AbstractAdvancedSearch
 * @module AbstractAdvancedSearch
*/
declare class AbstractAdvancedSearch extends Control {
    /**
    * @constructor
    * @param {AbstractAdvancedSearchOptions} options Options du constructeur
    *
    */
    constructor(options: AbstractAdvancedSearchOptions);
    /**
     * Nom de la classe (heritage)
     * @private
     */
    private CLASSNAME;
    element: HTMLFormElement;
    setMap(map: any): void;
    /**
     * Initialise le contrôle (appelé par le constructeur).
     * @param {AbstractAdvancedSearchOptions} options Options d'initialisation
     * @protected
     */
    protected initialize(options: AbstractAdvancedSearchOptions): void;
    name: string | undefined;
    inputs: any[] | undefined;
    /**
     * Retourne le nom du la recherche avancée
     * @returns {String} Nom de la recherche avancée
     */
    getName(): string;
    /**
     * Retourne le formulaire de la recherche avancée
     * @returns {HTMLFormElement} Formulaire de la recherche
     */
    getContent(): HTMLFormElement;
    /**
     * Crée le conteneur DOM du formulaire.
     *
     * @param {AbstractAdvancedSearchOptions} options Options d'initialisation
     * @returns {HTMLFormElement} Élément du formulaire
     * @protected
     */
    protected _initContainer(options: AbstractAdvancedSearchOptions): HTMLFormElement;
    btnGroup: HTMLDivElement | undefined;
    eraseBtn: HTMLButtonElement | undefined;
    searchBtn: HTMLButtonElement | undefined;
    /**
     * Ajoute des éléments d'input dans la collection `this.inputs`.
     * Cette méthode est abstraite et doit être surchargée par les implémentations spécifiques.
     * @protected
     * @abstract
     */
    protected addInputs(): void;
    /** Add event listeners
     * @param {AbstractAdvancedSearchOptions} options - constructor options
     * @protected
     */
    protected _initEvents(options: AbstractAdvancedSearchOptions): void;
    /**
     * Réinitialise les champs du formulaire.
     * @param {PointerEvent} e Événement d'effacement
     * @protected
     */
    protected _onErase(e: PointerEvent): void;
    /**
     * Traitement lors de la soumission du formulaire (recherche).
     * Doit être surchargé par les contrôles spécifiques pour lancer la recherche.
     * @param {SubmitEvent|PointerEvent} e Évènement de soumission / recherche
     * @protected
     */
    protected _onSearch(e: SubmitEvent | PointerEvent): void;
}
import Control from "../Control";
//# sourceMappingURL=AbstractAdvancedSearch.d.ts.map