export default RouteDOM;
declare namespace RouteDOM {
    function _addUID(id: string): string;
    function _createMainContainerElement(): HTMLElement;
    function _createShowRoutePictoElement(): HTMLElement;
    function _createRoutePanelElement(): HTMLElement;
    function _createRoutePanelDivElement(): HTMLDivElement;
    function _createDrawingButtonsPluginDiv(): HTMLDivElement;
    function _createRoutePanelHeaderElement(): HTMLElement;
    function _createRoutePanelFooterElement(): HTMLElement;
    function _createRoutePanelFormPointLabel(innerHTML: string, display?: boolean): HTMLElement;
    function _createRoutePanelFormElement(): HTMLElement;
    function _createRoutePanelResultsElement(): HTMLElement;
    function _createRouteWaitingElement(): HTMLElement;
    function _createRouteResultsStagesElement(): HTMLElement;
    function _addRouteResultsStagesValuesElement(points: HTMLElement): void;
    function _createRouteResultsElement(): HTMLElement;
    function _addRouteResultsValuesElement(distance: number, duration: number, fconvert: Function): HTMLElement;
    function _createRouteShowResultsDetailsElement(): HTMLElement;
    function _createRouteResultsDetailsElement(): HTMLElement;
    function _addRouteResultsDetailsElement(instructions: any[], fconvert: Function): HTMLElement;
    function _createRoutePanelFormPointElement(n: Integer, text: string, visibility: boolean): HTMLElement;
    function _createRoutePanelFormRemoveStageElement(n: Integer): HTMLElement;
    function _createRoutePanelFormAddStageElement(): HTMLElement;
    function _createRoutePanelFormAutoCompleteListElement(n: Integer): HTMLElement;
    function _createRouteAutoCompletedLocationElement(location: any, n: number, id: number): void;
    function _createRoutePanelFormModeChoiceTransportElement(transports: string[]): HTMLElement;
    function _createRoutePanelFormModeChoiceComputeElement(): HTMLElement;
    function _createShowRouteExclusionsPictoElement(): HTMLElement;
    function _createRoutePanelFormExclusionsElement(): HTMLElement;
    function _createRoutePanelFormExclusionOptionsElement(exclusions: any[]): HTMLElement;
    function _createRouteSubmitFormElement(): HTMLElement;
    function _createRouteFormResetElement(): HTMLElement;
}
//# sourceMappingURL=RouteDOM.d.ts.map