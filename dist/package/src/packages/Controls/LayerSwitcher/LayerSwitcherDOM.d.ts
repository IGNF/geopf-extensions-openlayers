export default LayerSwitcherDOM;
declare namespace LayerSwitcherDOM {
    function _createDraggableElement(elementDraggable: any, context: any): void;
    function _addUID(id: string): string;
    function _createMainContainerElement(): HTMLElement;
    function _createMainLayersShowElement(): HTMLElement;
    function _createMainLayersElement(): HTMLElement;
    function _createMainLayersDivElement(): HTMLDivElement;
    function _createMainPictoElement(): HTMLElement;
    function _createMainCounterLayersElement(): HTMLSpanElement;
    function _createMainInfoElement(): HTMLElement;
    function _createMainInfoDivElement(): HTMLDivElement;
    function _createMainStyleElement(): HTMLElement;
    function _createMainStyleDivElement(): HTMLDivElement;
    function _createLayersPanelHeaderElement(): HTMLDivElement;
    function _createLayersPanelIconElement(): HTMLLabelElement;
    function _createLayersPanelTitleElement(): HTMLDivElement;
    function _createLayersPanelCloseElement(): HTMLButtonElement;
    function _createContainerLayerElement(obj: {
        layer: any;
        id: string;
        title: string;
        description: string;
        visibility: boolean;
        opacity: Float;
        type: string;
    }): HTMLElement;
    function _createBasicToolElement(obj: any): HTMLElement;
    function _createBasicToolDragNDropElement(obj: any): HTMLDivElement;
    function _createBasicToolNameElement(obj: any): HTMLElement;
    function _createBasicToolVisibilityElement(obj: any): HTMLElement[];
    function _createAdvancedToolShowElement(obj: any): HTMLElement[];
    function _createAdvancedToolElement(obj: any): HTMLElement;
    function _createAdvancedToolDeleteElement(id: string, contextual?: boolean): HTMLElement;
    function _createAdvancedToolEditionElement(id: string, editable: boolean, tms: boolean, styles: any[], contextual?: boolean): HTMLElement;
    function _createAdvancedToolInformationElement(id: string, title: string, description: string, contextual?: boolean): HTMLElement;
    function _createAdvancedToolGreyscaleElement(id: string, grayable: boolean, grayscale: boolean, contextual?: boolean): HTMLElement;
    function _createAdvancedToolOpacityElement(id: string, opacity: number): HTMLElement[];
    function _createAdvancedToolExtentElement(id: string, contextual?: boolean): HTMLElement;
    function _createAdvancedToolMoreElement(id: any, tools: any, contextual?: any): HTMLElement;
    function _createContainerLayerInfoElement(obj: any): HTMLElement;
    function _createContainerLayerStyleElement(obj: any): HTMLElement;
}
//# sourceMappingURL=LayerSwitcherDOM.d.ts.map