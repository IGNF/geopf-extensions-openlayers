export default RouteDOM;
declare namespace RouteDOM {
    function _addUID(id: string): string;
    function _createMainContainerElement(): DOMElement;
    function _createShowRoutePictoElement(): DOMElement;
    function _createRoutePanelElement(): DOMElement;
    function _createRoutePanelDivElement(): HTMLDivElement;
    function _createRoutePanelHeaderElement(): DOMElement;
    function _createRoutePanelFooterElement(): DOMElement;
    function _createRoutePanelFormPointLabel(innerHTML: string, display?: boolean): DOMElement;
    function _createRoutePanelFormElement(): DOMElement;
    function _createRoutePanelResultsElement(): DOMElement;
    function _createRouteWaitingElement(): DOMElement;
    function _createRouteResultsStagesElement(): DOMElement;
    function _addRouteResultsStagesValuesElement(points: DOMElement): void;
    function _createRouteResultsElement(): DOMElement;
    function _addRouteResultsValuesElement(distance: number, duration: number, fconvert: Function): DOMElement;
    function _createRouteShowResultsDetailsElement(): DOMElement;
    function _createRouteResultsDetailsElement(): DOMElement;
    function _addRouteResultsDetailsElement(instructions: Object[], fconvert: Function): DOMElement;
    function _createRoutePanelFormPointElement(n: Integer, text: string, visibility: boolean): DOMElement;
    function _createRoutePanelFormRemoveStageElement(n: Integer): DOMElement;
    function _createRoutePanelFormAddStageElement(): DOMElement;
    function _createRoutePanelFormAutoCompleteListElement(n: Integer): DOMElement;
    function _createRouteAutoCompletedLocationElement(location: Object, n: number, id: number): void;
    function _createRoutePanelFormModeChoiceTransportElement(transports: string[]): DOMElement;
    function _createRoutePanelFormModeChoiceComputeElement(): DOMElement;
    function _createShowRouteExclusionsPictoElement(): DOMElement;
    function _createRoutePanelFormExclusionsElement(): DOMElement;
    function _createRoutePanelFormExclusionOptionsElement(exclusions: Object[]): DOMElement;
    function _createRouteSubmitFormElement(): DOMElement;
    function _createRouteFormResetElement(): DOMElement;
}
//# sourceMappingURL=RouteDOM.d.ts.map