type SearchServiceOptions = {
    /**
     * - Active/désactive l'autocomplétion côté service.
     */
    autocomplete?: boolean | undefined;
    /**
     * - Options passées au service de recherche.
     */
    searchOptions?: {
        /**
         * - Options spécifiques au service.
         */
        serviceOptions?: {
            /**
             * - Liste de champs à demander au service.
             */
            fields?: string[] | undefined;
        } | undefined;
    } | undefined;
};
type SearchEngineOptions = {
    /**
     * - Libellé associé à l'input.
     */
    label?: string | undefined;
    /**
     * - Texte d'aide / placeholder.
     */
    hint?: string | undefined;
    /**
     * - Configuration du service de recherche.
     */
    searchService?: SearchServiceOptions | any;
};
type TextInputElement = {
    /**
     * - Pattern HTML attendu (chaîne regex).
     */
    pattern?: string | undefined;
    /**
     * - Titre / info du champ.
     */
    title?: string | undefined;
    /**
     * - Valeur courante du champ.
     */
    value?: string | undefined;
    /**
     * - Gestionnaire keydown.
     */
    onkeydown?: ((e: KeyboardEvent) => void) | undefined;
    /**
     * - Ajout d'écouteur.
     */
    addEventListener?: ((type: string, listener: Function) => void) | undefined;
};
/**
 * Résultat d'une autocomplétion (voir {@link https://ignf.github.io/geoportal-access-lib/latest/jsdoc/Gp.Services.AutoComplete.SuggestedLocation.html})
 */
type AutocompleteResult = {
    /**
     * - Type de suggestion.
     */
    type: "StreetAddress" | "PositionOfInterest";
    /**
     * - Coordonnées du point, dans le système de coordonnées spécifiées.
     */
    position: Position;
    /**
     * - Nom de la commune.
     */
    commune: string;
    /**
     * - Texte complet représentant la suggestion.
     */
    fullText: string;
    /**
     * - Code postal de la suggestion.
     */
    postalCode: string;
    /**
     * - Nombre utilisé pour classigier l'importance de l'endroit suggéré de 1 (plus important) à 7 (moins important)
     */
    classification: number;
    /**
     * - Types POI détaillés.
     */
    poiType?: string[] | undefined;
    /**
     * - Nom de la rue (types "StreetAddress" seulement).
     */
    street?: string | undefined;
    /**
     * - Nature du point d'intérêt, e.g. "prefecture", "municipality"... (types "PositionOfInterest" seulement).
     */
    kind?: string | undefined;
};
/**
 * Position dans un système de coordonnées.
 */
type Position = {
    /**
     * - Longitude.
     */
    x: number;
    /**
     * - Latitude.
     */
    y: number;
};
/**
 * Erreur du service (voir {@link https://ignf.github.io/geoportal-access-lib/latest/jsdoc/Gp.Error.html})
 */
type ErrorService = {
    /**
     * - Message d'erreur retourné par le service.
     */
    message: string;
    /**
     * - Code de statut (-1 si inconnu).
     */
    status: number;
    /**
     * - Type d'erreur (ex. "UNKNOWN_ERROR").
     */
    type: string;
    /**
     * - Nom de l'erreur (ex. "ErrorService").
     */
    name: string;
    /**
     * - Stack trace de l'erreur, si disponible.
     */
    stack?: string | undefined;
};
/**
 * Résultat d'une recherche (géocodage final).
 */
type SearchResult = {
    /**
     * - Feature OL contenant la géométrie.
     */
    feature: import("ol/Feature").default;
    /**
     * - Étendue si zone géographique.
     */
    extent?: import("ol/Feature").default | undefined;
    /**
     * - Texte à afficher dans un popup.
     */
    infoPopup?: string | undefined;
};
/**
 * Options pour le contrôle SearchEngineBase.
 */
type SearchEngineBaseOptions = {
    /**
     * - Élément DOM ou sélecteur cible.
     */
    target?: string | HTMLElement | undefined;
    /**
     * - Texte du titre du bouton.
     */
    title?: string | undefined;
    /**
     * - Label affiché.
     */
    label?: string | undefined;
    /**
     * - Texte d'aide.
     */
    hint?: string | undefined;
    /**
     * - Comportement en tant que barre de recherche.
     */
    search?: boolean | undefined;
    /**
     * - Si vrai, le contrôle est repliable.
     */
    collapsible?: string | undefined;
    /**
     * - Libellé ARIA.
     */
    ariaLabel?: string | undefined;
    /**
     * - Placeholder de l'input.
     */
    placeholder?: string | undefined;
    /**
     * - Nombre minimal de caractères pour autocomplétion.
     */
    minChars?: number | undefined;
    /**
     * - Nombre maximal d'entrées affichées.
     */
    maximumEntries?: number | undefined;
    /**
     * - Gestion historique local (false|true|string).
     */
    historic?: string | boolean | undefined;
    /**
     * - Service de recherche.
     */
    searchService?: import("../../Services/AbstractSearchService").default | undefined;
};
/**
 * Options pour AbstractAdvancedSearch (formulaires avancés).
 */
type AbstractAdvancedSearchOptions = {
    /**
     * - Nom du formulaire de recherche avancée.
     */
    name: string;
};
/**
 * Événement de recherche générique.
 */
type SearchEvent = {
    /**
     * - Type d'événement (ex. "search").
     */
    type: string;
    /**
     * - Payload détaillé.
     */
    detail?: any;
};
/**
 * Description d'un système de projection utilisable par le contrôle CoordinateAdvancedSearch.
 */
type CoordinateSearchSystem = {
    /**
     * - Alias CRS (ex. "EPSG:4326").
     */
    crs: string;
    /**
     * - Libellé affiché pour le système.
     */
    label?: string | undefined;
    /**
     * - Type d'unités ("Geographical"|"Metric").
     */
    type?: string | undefined;
};
/**
 * Options spécifiques à la recherche par coordonnées.
 */
type CoordinateSearchOptions = {
    /**
     * - Liste de systèmes de projection personnalisés.
     */
    systems?: CoordinateSearchSystem[] | undefined;
    /**
     * - Liste de codes d'unités à afficher (ex. ["DEC","DMS","M","KM"]).
     */
    units?: string[] | undefined;
};
/**
 * Options pour le contrôle SearchEngineGeocodeIGN.
 * Étend SearchEngineBaseOptions et ajoute les options spécifiques du service IGN.
 */
type SearchEngineGeocodeIGNOptions = SearchEngineBaseOptions & {
    serviceOptions?: AbstractSearchServiceOptions;
};
/**
 * Options pour le contrôle SearchEngineGeocodeIGN.
 * Étend SearchEngineBaseOptions et ajoute les options spécifiques du service IGN.
 */
type CoordinateAdvancedSearchOptions = AbstractAdvancedSearchOptions & {
    coordinateSearch?: CoordinateSearchOptions;
};
/**
 * Options pour ajouter un bouton de popup
 */
type PopupButton = {
    /**
     * - Attribut title du bouton.
     */
    label: string;
    /**
     * - Classe(s) CSS à appliquer au bouton.
     */
    className?: string | undefined;
    /**
     * - Classe d'icône à ajouter (ex: "fr-icon-delete-line").
     */
    icon?: string | undefined;
    /**
     * - Attributs HTML supplémentaires (clé/valeur).
     */
    attributes?: {
        [x: string]: string;
    } | undefined;
    /**
     * - Fonction appelée au clic sur le bouton.
     */
    onClick: PopupButtonClickCallback;
};
/**
 * Callback appelé lors du clic sur un bouton personnalisé du popup.
 */
type PopupButtonClickCallback = (feature: Feature) => boolean;
/**
 * Options pour le contrôle SearchEngineAdvanced.
 */
type SearchEngineAdvancedOptions = {
    /**
     * - Liste des recherches avancées à intégrer.
     */
    advancedSearch?: import("./AbstractAdvancedSearch").default[] | undefined;
    /**
     * - Boutons personnalisés à ajouter dans le popup.
     */
    popupButtons?: PopupButton[] | undefined;
    /**
     * - Options pour le moteur de recherche de base.
     */
    baseSearchOptions?: SearchEngineGeocodeIGNOptions | undefined;
    /**
     * - Élément DOM ou sélecteur cible.
     */
    target?: string | HTMLElement | undefined;
    /**
     * - Titre du contrôle.
     */
    title?: string | undefined;
    /**
     * - Label affiché.
     */
    label?: string | undefined;
    /**
     * - Texte d'aide.
     */
    hint?: string | undefined;
    /**
     * - Comportement en tant que barre de recherche.
     */
    search?: boolean | undefined;
    /**
     * - Libellé ARIA.
     */
    ariaLabel?: string | undefined;
    /**
     * - Placeholder de l'input.
     */
    placeholder?: string | undefined;
    /**
     * - Nombre minimal de caractères pour autocomplétion.
     */
    minChars?: number | undefined;
    /**
     * - Nombre maximal d'entrées affichées.
     */
    maximumEntries?: number | undefined;
    /**
     * - Gestion historique local (false|true|string).
     */
    historic?: string | boolean | undefined;
    /**
     * - Service de recherche.
     */
    searchService?: import("../../Services/AbstractSearchService").default | undefined;
};
//# sourceMappingURL=typedefs.d.ts.map