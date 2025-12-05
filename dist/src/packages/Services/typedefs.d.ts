/**
 * Options de construction d'un service de recherche.
 */
type AbstractSearchServiceOptions = {
    /**
     * - Clé API pour les services IGN.
     */
    apiKey?: string | undefined;
    /**
     * - Forcer HTTPS.
     */
    ssl?: boolean | undefined;
    /**
     * - Options de l'autocomplétion.
     */
    autocompleteOptions?: AutocompleteOptions | undefined;
    /**
     * - Options de la recherche finale.
     */
    searchOptions?: SearchOptions | undefined;
    /**
     * - Options de géocodage.
     */
    geocodeOptions?: GeocodeOptions | undefined;
    autocomplete?: boolean | undefined;
    index?: string | undefined;
    limit?: number | undefined;
    returnTrueGeometry?: boolean | undefined;
};
/**
 * Options pour l'autocomplétion.
 */
type AutocompleteOptions = {
    /**
     * - Options passées à Gp.Services.autoComplete
     */
    serviceOptions?: any;
    /**
     * - Nombre maximal de réponses retournées
     */
    maximumResponses?: number | undefined;
    /**
     * - Si vrai, déclenche une requête de géocodage lorsque l'autocomplétion échoue
     */
    triggerGeocode?: boolean | undefined;
    /**
     * - Délai (ms) avant déclenchement du géocodage automatique
     */
    triggerDelay?: number | undefined;
    /**
     * - Si vrai, embellit/filtre les résultats
     */
    prettifyResults?: boolean | undefined;
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
 * Objet envoyé pour le géocodage
 */
type IGNSearchObject = {
    /**
     * - Objet utilisé pour faire la requête.
     * Peut être soit le résultat de l'autocomplétion ou une chaîne de caractère.
     */
    location: AutocompleteResult | string;
    /**
     * - Filtres optionnels pour la recherche
     */
    filters?: IGNSearchFilter | undefined;
};
/**
 * Filtres optionnels pour le géocodage.
 * Les filtres dépendent du type de recherche : adresses, toponymes ou parcelles cadastrales
 */
type IGNSearchFilter = {
    /**
     * - Code postal (adresses, toponymes).
     */
    postalCode?: string | undefined;
    /**
     * - Code INSEE (adresses, toponymes).
     */
    inseeCode?: string | undefined;
    /**
     * - Nom de la ville (adresses, toponymes).
     */
    city?: string | undefined;
    /**
     * - Type de toponyme (toponymes uniquement).
     */
    type?: string | undefined;
    /**
     * - Code département (parcelles cadastrales uniquement).
     */
    codeDepartement?: string | undefined;
    /**
     * - Code commune (parcelles cadastrales uniquement).
     */
    codeCommune?: string | undefined;
    /**
     * - Nom de la commune (parcelles cadastrales uniquement).
     */
    nomCommune?: string | undefined;
    /**
     * - Code commune abs (parcelles cadastrales uniquement).
     */
    codeCommuneAbs?: string | undefined;
    /**
     * - Code arrondissement (parcelles cadastrales uniquement).
     */
    codeArrondissement?: string | undefined;
    /**
     * - Section cadastrale (parcelles cadastrales uniquement).
     */
    section?: string | undefined;
    /**
     * - Numéro de parcelle (parcelles cadastrales uniquement).
     */
    numero?: string | undefined;
    /**
     * - Feuille cadastrale (parcelles cadastrales uniquement).
     */
    feuille?: string | undefined;
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
 * Options pour la recherche finale (géocodage).
 */
type SearchOptions = {
    /**
     * - Options passées à Gp.Services.geocode.
     */
    serviceOptions?: any;
    /**
     * - Nombre maximal de réponses.
     */
    maximumResponses?: number | undefined;
    /**
     * - Active le filtrage des résultats par couche.
     */
    filterLayers?: boolean | undefined;
    /**
     * - Indexs utilisés (ex. "address,poi").
     */
    index?: string | string[] | undefined;
    /**
     * - Limite de résultats.
     */
    limit?: number | undefined;
};
/**
 * Options pour le géocodage manuel.
 */
type GeocodeOptions = {
    /**
     * - Options passées à Gp.Services.geocode.
     */
    serviceOptions?: any;
    /**
     * - Texte à géocoder.
     */
    location?: string | undefined;
    /**
     * - Callback en cas de succès.
     */
    onSuccess?: Function | undefined;
    /**
     * - Callback en cas d'échec.
     */
    onFailure?: Function | undefined;
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
//# sourceMappingURL=typedefs.d.ts.map