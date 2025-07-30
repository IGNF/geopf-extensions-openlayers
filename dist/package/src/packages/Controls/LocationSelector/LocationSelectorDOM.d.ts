export default LocationSelectorDOM;
declare namespace LocationSelectorDOM {
    function _addUID(id: string): string;
    function _createMainContainerElement(): HTMLElement;
    function _createLocationPointElement(id: number, display: number): HTMLElement;
    function _createLocationPointLabelElement(id: number, text: string): HTMLElement;
    function _createLocationAutoCompleteteInputElement(id: number): HTMLElement;
    function _createLocationCoordinateInputElement(id: number): HTMLElement;
    function _createLocationPointerShowInputElement(id: number): HTMLElement;
    function _createLocationPointerInputElement(id: number): HTMLElement;
    function _createLocationRemovePointElement(id: number): HTMLElement;
    function _createLocationAddPointElement(): HTMLElement;
    function _createLocationAutoCompleteElement(id: any): HTMLDivElement;
    function _createLocationAutoCompleteResultElement(id: number): HTMLElement;
    function _createLocationAutoCompletedLocationElement(id: number, location: any, n: number): void;
    function GPdisplayCoordinate(value: string): void;
}
//# sourceMappingURL=LocationSelectorDOM.d.ts.map