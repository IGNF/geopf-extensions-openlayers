export default IGNSearchService;
/**
 * @classdesc
 * Service de recherche IGN (utilise les services IGN / Search wrapper).
 *
 * @alias ol.service.IGNSearchService
 * @module SearchService
 * @extends AbstractSearchService
 */
declare class IGNSearchService extends AbstractSearchService {
    options: {
        searchOptions: {
            maximumEntries: number;
            serviceOptions: {
                maximumResponses: number;
            };
            filterLayers: boolean;
        };
        geocodeOptions: {
            serviceOptions: {};
        };
        autocomplete: boolean;
        autocompleteOptions: {
            serviceOptions: {
                maximumResponses: number;
            };
            triggerGeocode: boolean;
            triggerDelay: number;
            prettifyResults: boolean;
        };
    } | undefined;
    /**
     * Label du géocodage / de la recherche
     * @type {String}
     */
    _currentGeocodingLocation: string;
    /**
     * Liste de résultats d'autocomplétion
     * @type {Array<AutocompleteResult>}
     */
    _suggestedLocations: Array<AutocompleteResult>;
    /**
     * Exécute une requête d'autocomplétion auprès du service IGN.
     * @private
     * @param {Object} settings Paramètres de la requête (texte, callbacks, etc.)
     * @param {String} settings.text Texte à compléter
     * @param {Function} settings.onSuccess Callback en cas de succès
     * @param {Function} settings.onFailure Callback en cas d'échec
     */
    private _requestAutoComplete;
    /**
     * Fonction appelée en cas de succès de l'autocomplétion.
     * @param {Object} results Résultats de la requête.
     * @param {Array<AutocompleteResult>} results.suggestedLocations Tableau de suggestions.
     */
    _onSuccessAutoComplete(results: {
        suggestedLocations: Array<AutocompleteResult>;
    }): void;
    _triggerHandler: NodeJS.Timeout | null | undefined;
    /**
     * Fonction appelée en cas d'erreur sur le service d'autocomplétion
     * @param {ErrorService} error Erreur renvoyée par le service
     */
    _onFailureAutoComplete(error: ErrorService): void;
    /**
     * this method is called by this.onAutoCompleteSearchText()
     * and it clears suggested location from duplicate entries and improve unprecise fulltext entries.
     *
     * @param {Array} autocompleteResults - Array of autocompleteResults to display
     * @private
     */
    private _prettifyAutocompleteResults;
    /**
     * this method is called by Gp.Services.autoComplete callback in case of success
     * (cf. this.onAutoCompleteSearchText), for suggested locations with null coordinates
     * (case of postalCode research for instance).
     * Send a geocode request with suggested location 'fullText' attribute, to get its coordinates and display it in autocomplete results list container.
     *
     * @param {Gp.Services.AutoCompleteResponse.SuggestedLocation} suggestedLocation - autocompletion result (with null coordinates) to be geocoded
     * @param {Number} i - suggestedLocation position in Gp.Services.AutoCompleteResponse.suggestedLocations autocomplete results list
     * @private
     */
    private _getGeocodeCoordinatesFromFullText;
    _clearResults(): void;
    /**
     * Lance une recherche sur les services de géocodage de l'IGN
     * @see {@link https://data.geopf.fr/geocodage/search}
     * @see {@link https://data.geopf.fr/geocodage/openapi}
     * @param {IGNSearchObject} object Recherche
     * @abstract
     */
    search(object: IGNSearchObject): void;
    /**
     * this method is called by this.onAutoCompleteSearch()
     * and executes a request to the service.
     *
     * @param {Object} settings - service settings
     * @param {String} settings.location - text
     * @param {Function} settings.onSuccess - callback
     * @param {Function} settings.onFailure - callback
     * @private
     */
    private _requestGeocoding;
    /** Get features based on current search result
     * @param {Number} index Index of the result
     * @returns {Object} Object containing feature and extent (if any)
     */
    getResultFeatures(index: number): any;
    /**
     * Fonction appelée en cas de succès du géocodage
     *
     * @param {Object} results Résultats de la recherche
     * @private
     */
    private _onSuccessSearch;
    /**
     * Fonction appelée en cas d'erreur renvoyée par le service de géocodage.
     * @param {AutocompleteResult} location Localisation de l'autocomplétion.
     * @param {ErrorService} error Erreur renvoyée par le service.
     */
    _onFailureSearch(location: AutocompleteResult, error: ErrorService): void;
}
import AbstractSearchService from "./AbstractSearchService";
//# sourceMappingURL=IGNSearchService.d.ts.map