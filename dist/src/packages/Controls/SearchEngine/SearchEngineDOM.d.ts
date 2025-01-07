export default SearchEngineDOM;
declare namespace SearchEngineDOM {
    function _addUID(id: string): string;
    function _createMainContainerElement(): DOMElement;
    function _createSearchDivElement(): DOMElement;
    function _createShowSearchEnginePictoElement(collapsible: boolean): DOMElement;
    function _createSearchInputElement(placeholder: string): DOMElement;
    function _createSearchResetElement(): HTMLButtonElement;
    function _createButtonsElement(): HTMLDivElement;
    function _createFirstLineWrapper(): HTMLDivElement;
    function _createRadioContainer(): HTMLDivElement;
    function _createRadioElements(): HTMLDivElement[];
    function _createShowAdvancedSearchElement(): DOMElement;
    function _createShowGeolocateElement(): DOMElement;
    function _createShowSearchByCoordinateElement(): DOMElement;
    function _createAdvancedSearchPanelElement(): DOMElement;
    function _createAdvancedSearchPanelDivElement(): HTMLDivElement;
    function _createGeocodeResultsElement(): DOMElement;
    function _createGeocodeResultsDivElement(): HTMLDivElement;
    function _createAutoCompleteElement(): DOMElement;
    function _createCoordinateSearchPanelElement(): DOMElement;
    function _createCoordinateSearchPanelDivElement(): HTMLDivElement;
    function _createAutoCompleteListElement(): DOMElement;
    function _createAutoCompletedLocationContainer(): HTMLDivElement;
    function _createAutoCompletedLocationTitleElement(): void;
    function _createAutoCompletedLocationElement(location: Object, id: number): void;
    function _createSearchedSuggestContainer(): HTMLDivElement;
    function _createSearchedSuggestTitleElement(): void;
    function _createSearchedSuggestElement(suggest: Object, id: number): void;
    function _createAdvancedSearchPanelHeaderElement(): DOMElement;
    function _createAdvancedSearchPanelFormElement(advancedSearchCodes: Object[]): DOMElement;
    function _createAdvancedSearchFormCodeElement(codes: Object[]): DOMElement;
    function _createAdvancedSearchFormInputElement(): DOMElement;
    function _createAdvancedSearchFormFiltersElement(): DOMElement;
    function _createAdvancedSearchFiltersTableElement(code: string, display: boolean): DOMElement;
    function _createAdvancedSearchFiltersAttributElement(filterAttributes: {
        code: string;
        name: string;
        title: string;
        description: string;
        value: string;
    }): DOMElement;
    function _createGeocodeResultsHeaderElement(): DOMElement;
    function _createGeocodeResultsListElement(): DOMElement;
    function _createGeocodedLocationElement(location: Object, id: number): void;
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
     * @returns {DOMElement} label
     */
    function _setCoordinateSearchLngLabelElement(type: string): DOMElement;
    /**
     * update Input coordinate
     * @param {String} code - ex. DMS : degrés sexadecimaux
     * @returns {DOMElement} input
     */
    function _setCoordinateSearchLngInputElement(code: string): DOMElement;
    function _setCoordinateSearchLngDMSElement(): HTMLDivElement;
    /**
     * update Label
     * @param {String} type - Geographical or Metric
     * @returns {DOMElement} label
     */
    function _setCoordinateSearchLatLabelElement(type: string): DOMElement;
    /**
     * update Input coordinate
     * @param {String} code - ex. DMS : degrés sexadecimaux
     * @returns {DOMElement} input
     */
    function _setCoordinateSearchLatInputElement(code: string): DOMElement;
    function _setCoordinateSearchLatDMSElement(): HTMLDivElement;
    /**
     * submit
     * @returns {DOMElement} input
     */
    function _createCoordinateSearchSubmitElement(): DOMElement;
}
//# sourceMappingURL=SearchEngineDOM.d.ts.map