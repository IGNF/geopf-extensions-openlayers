export default SearchEngineDOM;
declare namespace SearchEngineDOM {
    function _addUID(id: string): string;
    function _createMainContainerElement(): DOMElement;
    function _createShowSearchEnginePictoElement(force: boolean): DOMElement;
    function _createSearchInputElement(placeholder: string): DOMElement;
    function _createSearchResetElement(): HTMLButtonElement;
    function _createButtonsElement(): HTMLDivElement;
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
    function _createAutoCompletedLocationElement(location: Object, id: number): void;
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
    function _createCoordinateSearchSubmitElement(): HTMLInputElement;
    function _createCoordinateSearchSystemsElement(systems: any): HTMLSelectElement;
    function _createCoordinateSearchUnitsElement(units: any): HTMLSelectElement;
}
//# sourceMappingURL=SearchEngineDOM.d.ts.map