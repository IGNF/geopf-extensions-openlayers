export default SearchEngineBase;
/**
 * @classdesc
 * Contrôle de base pour la recherche (barre de recherche, autocomplétion, historique).
 *
 * @alias ol.control.SearchEngineBase
 * @module SearchEngine
 */
declare class SearchEngineBase extends Control {
    /**
     * Constructeur du contrôle SearchEngineBase.
     * @constructor
     * @param {SearchEngineBaseOptions} options Options du constructeur
     * @fires autocomplete
     * @fires search
     * @fires select
     * @example
     * const search = new ol.control.SearchEngineBase({
     *   placeholder: "Rechercher une adresse...",
     *   minChars: 3,
     *   maximumEntries: 10,
     *   historic: "mesRecherches",
     *   searchService: new CustomSearchService()
     * });
     * map.addControl(search)
     */
    constructor(options: SearchEngineBaseOptions);
    /**
     * Nom de la classe (heritage)
     * @private
     */
    private CLASSNAME;
    searchService: import("../../..").AbstractSearchService | undefined;
    _historic: any;
    _historicName: string;
    /**
     * Initialise le contrôle SearchEngineBase (appelé par le constructeur).
     * @protected
     * @param {SearchEngineBaseOptions} options Options du constructeur
     */
    protected initialize(options: SearchEngineBaseOptions): void;
    /**
     * Ajoute les écouteurs d'événements sur les éléments du contrôle.
     * @protected
     * @param {SearchEngineBaseOptions} options Options du constructeur
     */
    protected _initEvents(options: SearchEngineBaseOptions): void;
    /**
     * Initialise le conteneur DOM principal du contrôle.
     * @private
     * @param {SearchEngineBaseOptions} options Options du constructeur
     * @returns {void}
     */
    private _initContainer;
    container: HTMLFormElement | undefined;
    button: HTMLButtonElement | undefined;
    input: HTMLInputElement | undefined;
    optionscontainer: HTMLDivElement | undefined;
    subimtBt: HTMLButtonElement | undefined;
    acContainer: HTMLDivElement | undefined;
    autocompleteHeader: HTMLDivElement | undefined;
    autocompleteList: HTMLUListElement | undefined;
    autocompleteFooter: HTMLDivElement | undefined;
    /**
     * Active ou désactive le contrôle (désactive l'input / bouton).
     * @param {Boolean} active Indique si le contrôle doit être désactivé
     * @returns {void}
     */
    setActive(active: boolean): void;
    /**
     * Lance l'autocomplétion et met à jour la liste.
     * @param {String} [value] Valeur de l'input
     * @api
     */
    autocomplete(value?: string): void;
    _completeDelay: NodeJS.Timeout | undefined;
    /**
     * Callback sur événement d'autocomplétion.
     * @param {Object} e Événement d'autocomplétion
     * @private
     */
    private onAutocomplete;
    /**
     * Lance la recherche de géocodage.
     * @param {IGNSearchObject} item Valeur ou objet à rechercher
     * @api
     */
    search(item: IGNSearchObject): void;
    /**
     * Callback sur événement de recherche.
     * @param {Object} e Événement de recherche
     * @api
     */
    onSearch(e: any): void;
    /**
     * Callback sur sélection d'un item.
     * @param {Object} item Élément sélectionné
     * @api
     */
    select(item: any): void;
    _currentValue: string | undefined;
    /**
     * Affiche la liste de l'historique.
     * @api
     */
    showHistoric(): void;
    /**
     * Met à jour la liste d'autocomplétion.
     * @private
     * @param {Array<Object>} tab Liste des items d'autocomplétion
     * @param {String} [type="search"] Type d'affichage ("history" ou "search")
     */
    private _updateList;
    /**
     * Retourne la classe à ajouter pour un résultat d'autocomplétion
     * @param {AutocompleteResult} item Résultat de l'autocomplétion (ou historique)
     * @param {String} type Type de la recherche ("history" ou "search")
     * @returns {String} classe à ajouter
     */
    getIconClass(item: AutocompleteResult, type: string): string;
    /**
     * Retourne le titre à afficher pour un item.
     * @param {Object} item Élément à afficher
     * @returns {String} Titre
     * @api
     */
    getItemTitle(item: any): string;
    /**
     * Ajoute ou remplace une valeur dans l'historique.
     * @private
     * @param {Object} value Valeur à ajouter
     */
    private _updateHistoric;
    /**
     * Vérifie si deux éléments (objets) sont égaux.
     * @private
     * @param {Object} a Premier objet
     * @param {Object} b Objet de comparaison
     * @returns {Boolean} true si égal, false sinon
     */
    private _isEqual;
    /**
     * Ajoute un message à un champ de saisie.
     * @param {String} message Message à afficher
     * @param {String} [type="error"] Type du message ("error" ou "valid")
     * @api
     */
    addMessage(message: string, type?: string): void;
    /**
     * Enlève les messages d'erreur du champ de saisie.
     * @param {HTMLInputElement|HTMLSelectElement} input Champ de saisie
     * @api
     */
    removeMessages(): void;
}
import Control from "../Control";
//# sourceMappingURL=SearchEngineBase.d.ts.map