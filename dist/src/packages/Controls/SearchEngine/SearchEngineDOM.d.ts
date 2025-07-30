export default SearchEngineDOM;
declare namespace SearchEngineDOM {
    function _addUID(id: string): string;
    function _createMainContainerElement(): HTMLElement;
    function _createSearchDivElement(): HTMLElement;
    function _createShowSearchEnginePictoElement(collapsible: boolean): HTMLElement;
    function _createSearchInputElement(placeholder: string): HTMLElement;
    function _createSearchResetElement(): HTMLButtonElement;
    function _createButtonsElement(): HTMLDivElement;
    function _createFirstLineWrapper(): HTMLDivElement;
    function _createRadioContainer(): HTMLDivElement;
    function _createRadioElements(): HTMLDivElement[];
    function _createShowAdvancedSearchElement(): HTMLElement;
    function _createShowGeolocateElement(): HTMLElement;
    function _createShowSearchByCoordinateElement(): HTMLElement;
    function _createAdvancedSearchPanelElement(): HTMLElement;
    function _createAdvancedSearchPanelDivElement(): HTMLDivElement;
    function _createGeocodeResultsElement(): HTMLElement;
    function _createGeocodeResultsDivElement(): HTMLDivElement;
    function _createAutoCompleteElement(): HTMLElement;
    function _createCoordinateSearchPanelElement(): HTMLElement;
    function _createCoordinateSearchPanelDivElement(): HTMLDivElement;
    function _createAutoCompleteListElement(): HTMLElement;
    function _createAutoCompletedLocationContainer(): HTMLDivElement;
    function _createAutoCompletedLocationTitleElement(): void;
    function _createAutoCompletedLocationElement(location: any, id: number): void;
    function _createSearchedSuggestContainer(): HTMLDivElement;
    function _createSearchedSuggestTitleElement(): void;
    function _createSearchedSuggestElement(suggest: any, id: number): void;
    function _createAdvancedSearchPanelHeaderElement(): HTMLElement;
    function _createAdvancedSearchPanelFormElement(advancedSearchCodes: any[], coordinateSearchInAdvancedSearch: boolean): HTMLElement;
    function _createAdvancedSearchFormCodeElement(codes: any[], coordinateSearchInAdvancedSearch: boolean): HTMLElement;
    function _createAdvancedSearchFormInputElement(): HTMLElement;
    function _createAdvancedSearchFormFiltersElement(): HTMLElement;
    function _createAdvancedSearchFiltersTableElement(code: string, display: boolean): HTMLElement;
    function _createAdvancedSearchFiltersAttributElement(filterAttributes: {
        code: string;
        name: string;
        title: string;
        description: string;
        value: string;
    }): HTMLElement;
    function _createGeocodeResultsHeaderElement(): HTMLElement;
    function _createGeocodeResultsListElement(): HTMLElement;
    function _createGeocodedLocationElement(location: any, id: number): void;
    function _createCoordinateSearchPanelHeaderElement(): HTMLDivElement;
    function _createCoordinateSearchPanelFormElement(): HTMLFormElement;
    function __createCoordinateSearchDivElement(): HTMLDivElement;
    function _createCoordinateSearchSystemsLabelElement(): HTMLLabelElement;
    function _setCoordinateSearchSystemsSelectElement(systems: any): HTMLSelectElement;
    function _createCoordinateSearchUnitsLabelElement(): HTMLLabelElement;
    function _setCoordinateSearchUnitsSelectElement(units: any): HTMLSelectElement;
    /**
     * update Label
     * @param {String} type - Geographical or Metric
     * @returns {HTMLElement} label
     */
    function _setCoordinateSearchLngLabelElement(type: string): HTMLElement;
    /**
     * update Input coordinate
     * @param {String} code - ex. DMS : degrés sexadecimaux
     * @returns {HTMLElement} input
     */
    function _setCoordinateSearchLngInputElement(code: string): HTMLElement;
    function _setCoordinateSearchLngDMSElement(): HTMLDivElement;
    /**
     * update Label
     * @param {String} type - Geographical or Metric
     * @returns {HTMLElement} label
     */
    function _setCoordinateSearchLatLabelElement(type: string): HTMLElement;
    /**
     * update Input coordinate
     * @param {String} code - ex. DMS : degrés sexadecimaux
     * @returns {HTMLElement} input
     */
    function _setCoordinateSearchLatInputElement(code: string): HTMLElement;
    function _setCoordinateSearchLatDMSElement(): HTMLDivElement;
    /**
     * submit
     * @returns {HTMLElement} input
     */
    function _createCoordinateSearchSubmitElement(): HTMLElement;
}
//# sourceMappingURL=SearchEngineDOM.d.ts.map