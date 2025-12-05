export default CoordinateAdvancedSearch;
/**
 * @classdesc
 * Contrôle de recherche avancée par coordonnées
 * (saisie pour différents systèmes de coordonnées et unités correspondantes).
 *
 * @alias ol.control.CoordinateAdvancedSearch
 * @module CoordinateAdvancedSearch
 */
declare class CoordinateAdvancedSearch extends AbstractAdvancedSearch {
    /**
     * Constructeur.
     *
     * @constructor
     * @param {CoordinateAdvancedSearchOptions} [options] Options du contrôle
     */
    constructor(options?: CoordinateAdvancedSearchOptions);
    /**
     * @override
     * @protected
     * @param {CoordinateAdvancedSearchOptions} options Options d'initialisation
     */
    protected override initialize(options: CoordinateAdvancedSearchOptions): void;
    _boundOnLonLatBeforeInput: any;
    _boundOnLonLatInput: any;
    _currentCoordinateSystem: any;
    _currentUnit: any;
    /**
     * @private
     * @param {CoordinateAdvancedSearchOptions} [options] Options d'initialisation possibles (options.coordinateSearch.systems)
     */
    private _initCoordinateSearchSystems;
    _coordinateSearchSystems: any[] | undefined;
    /**
     * @private
     * @param {CoordinateAdvancedSearchOptions} [options] Options d'initialisation possibles (options.coordinateSearch.units)
     */
    private _initCoordinateSearchUnits;
    _coordinateSearchUnits: any[] | {
        Geographical: {
            code: string;
            label: string;
            format: (olCoordinate: any) => any;
        }[];
        Metric: {
            code: string;
            label: string;
            format: (olCoordinate: any) => any;
        }[];
    } | undefined;
    /**
     * Définit un système de projection supplémentaire et charge sa définition CRS si nécessaire.
     *
     * @private
     * @param {CoordinateSearchSystem} system Description du système de projection
     * @returns {void}
     */
    private _setSystem;
    /**
     * Crée un conteneur d'étiquette pour un élément d'input.
     *
     * @private
     * @param {String} text Texte de l'étiquette
     * @param {String} type Classe CSS du conteneur
     * @param {HTMLElement} [input] Élément input à rattacher
     * @param {Boolean} [mandatory=false] Indique si le champ est obligatoire
     * @returns {HTMLElement} Élément conteneur (div)
     */
    private _getLabelContainer;
    /**
     * Crée un élément label.
     *
     * @private
     * @param {String} text Texte du label
     * @param {Boolean} [mandatory=false] Ajoute un astérisque si vrai
     * @returns {HTMLLabelElement} Élément label créé
     */
    private _createLabel;
    /**
     * Met à jour le texte d'un label existant.
     *
     * @private
     * @param {String} text Nouveau texte
     * @param {HTMLElement} container Conteneur contenant le label à mettre à jour
     * @param {Boolean} [mandatory=false] Indique si le champ est obligatoire
     */
    private _updateLabel;
    system: HTMLSelectElement | undefined;
    unit: HTMLSelectElement | undefined;
    lonLatInputs: HTMLDivElement | undefined;
    lon: HTMLElement | undefined;
    lat: HTMLElement | undefined;
    /**
     * Crée le wrapper (label + input + masques) pour une composante de coordonnées (lon/lat).
     *
     * @private
     * @param {"lon"|"lat"} type Type de composante ("lon" ou "lat")
     * @returns {HTMLElement} Wrapper contenant l'input et éléments associés
     */
    private createCoordinateInput;
    /**
     * Crée la liste des points cardinaux (N/S ou O/E) pour un champ de coordonnées.
     *
     * @private
     * @param {String} baseName "lon" ou "lat"
     * @returns {HTMLSelectElement|undefined} Élément select des cardinaux ou undefined si non applicable
     */
    private _createSelectCardinals;
    /**
     * @override
     * @protected
     * @param {CoordinateAdvancedSearchOptions} options Options d'initialisation
     */
    protected override _initEvents(options: CoordinateAdvancedSearchOptions): void;
    /**
     * Met à jour le système de référence sélectionné et réinitialise les unités disponibles.
     *
     * @private
     * @param {Event} e Événement change provenant du select système
     */
    private _updateSystem;
    /**
     * Met à jour l'unité sélectionnée et stocke la valeur dans le dataset du formulaire.
     *
     * @private
     * @param {Event} e Événement change provenant du select unité
     */
    private _updateUnits;
    /**
     * Met à jour les labels des inputs en fonction du type d'unités (géographique vs métrique).
     *
     * @private
     */
    private _updateInputsLabel;
    /**
     * Met à jour les inputs lorsque l'unité change (conversion ou activation du masquage pour DMS).
     *
     * @private
     */
    private _updateInputs;
    /**
     * Validation avant saisie pour les formats DMS : n'autorise que les chiffres (évite les lettres).
     *
     * @private
     * @param {InputEvent} e Événement beforeinput
     */
    private _onlonLatBeforeInput;
    /**
     * Formate une chaîne de 6 caractères en DMS (DD°MM'SS").
     *
     * @private
     * @param {String} value Valeur brute (6 caractères numériques)
     * @returns {String} Chaîne formatée (ex. "12°34'56\"")
     */
    private _format;
    /**
     * Met à jour l'affichage du masque pendant la saisie DMS.
     *
     * @private
     * @param {InputEvent} e Événement input
     */
    private _onlonLatInput;
    /**
     * @override
     * @protected
     * @param {PointerEvent} e Événement de soumission
     */
    protected override _onSearch(e: PointerEvent): void;
    /**
     * Construit le contenu HTML à afficher dans la popup à partir des coordonnées fournies.
     *
     * @private
     * @param {Number|String} lon Valeur X / longitude
     * @param {Number|String} lat Valeur Y / latitude
     * @returns {String} Contenu HTML (string) à injecter dans la popup
     */
    private _createInfoPopup;
}
import AbstractAdvancedSearch from "./AbstractAdvancedSearch";
//# sourceMappingURL=CoordinateAdvancedSearch.d.ts.map