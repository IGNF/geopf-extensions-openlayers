export default MousePositionDOM;
declare namespace MousePositionDOM {
    function _addUID(id: string): string;
    function _createMainContainerElement(): HTMLElement;
    function _createShowMousePositionPictoElement(isDesktop: boolean): HTMLElement;
    function _createMousePositionPanelElement(): HTMLElement;
    function _createMousePositionPanelDivElement(): HTMLDivElement;
    function _createMapCenter(): HTMLElement;
    function _createMousePositionPanelTitleElement(): HTMLElement;
    function _createMousePositionPanelHeaderElement(): HTMLElement;
    function _createMousePositionPanelCloseElement(): HTMLElement;
    function _createMousePositionPanelBasicElement(displayAltitude?: boolean, displayCoordinates?: boolean, editCoordinates?: boolean, currentProjectionUnits?: boolean): HTMLElement;
    function _createCoordinateElement(coordType: string, editCoordinates?: boolean): any[];
    function _createDMSCoordinateElement(coordType: string, editCoordinates?: boolean): any[];
    function _createMousePositionPanelBasicCoordinateElement(display?: boolean, editCoordinates?: boolean, currentProjectionUnits?: boolean): HTMLElement;
    function _createMousePositionPanelBasicAltitudeElement(display?: boolean): HTMLElement;
    function _createMousePositionPanelEditToolsElement(editCoordinates?: boolean): HTMLElement;
    function _createShowMousePositionSettingsElement(display?: boolean): HTMLElement[];
    function _createMousePositionSettingsElement(display?: boolean): HTMLElement;
    function _createMousePositionSettingsSystemsElement(systems: any[]): HTMLElement;
    function _createMousePositionSettingsUnitsElement(units: any[]): HTMLElement;
    function _resetLabelElements(currentProjectionType?: string): void;
    function _resetUnitElements(currentProjectionUnits: string): void;
    function _resetCoordinateElements(editCoordinates: boolean, currentProjectionType: string, currentProjectionUnits: string): void;
    function _setEditMode(editing: boolean): void;
    function _checkDMSElement(input: HTMLElement, isFloat: boolean): boolean;
    function _checkDMSDegrees(coordType: string, input: HTMLElement): boolean;
    function GPdisplayCoords(coordinate: any): void;
    function GPdisplayElevation(coordinate: any, altitudeTimeoutDelay: number, noDataValue: number, noDataValueTolerance: number): void;
    function GPresetElevation(): void;
}
//# sourceMappingURL=MousePositionDOM.d.ts.map