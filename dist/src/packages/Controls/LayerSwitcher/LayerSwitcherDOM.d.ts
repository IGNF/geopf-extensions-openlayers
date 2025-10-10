export default LayerSwitcherDOM;
declare namespace LayerSwitcherDOM {
    function _createDraggableElement(elementDraggable: any, context: any): void;
    function _moveElement(element: HTMLElement, direction: up | down): boolean;
    function _onMoveElement(up: boolean, event: KeyboardEvent): void;
    function _addUID(id: string): string;
    function _createMainContainerElement(): HTMLElement;
    function _createMainLayersShowElement(): HTMLElement;
    function _createMainLayersElement(): HTMLElement;
    function _createMainLayersDivElement(): HTMLDivElement;
    function _createMainLayerListElement(): HTMLDivElement;
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
    function _createHeaderButtonsDivElement(): HTMLDivElement;
    function _createButtonsGroupElement(options: {
        className?: string | undefined;
        left?: boolean | undefined;
        size?: boolean | undefined;
        id?: string | undefined;
    }): HTMLDivElement;
    function _createButtonHeaderElement(options: any): HTMLButtonElement;
    function _createContainerLayerElement(obj: {
        layer: any;
        id: string;
        title: string;
        description: string;
        visibility: boolean;
        opacity: Float;
        type: string;
    }, tooltips: boolean): HTMLElement;
    function _createBasicToolElement(obj: any, tooltips: boolean): HTMLElement;
    function _createBasicToolButtons(obj: any): HTMLElement;
    function _createBasicToolTitleElement(obj: any, tooltips: boolean): HTMLElement;
    function _createLayerNameDivElement(obj: any, tooltips: boolean): HTMLElement;
    function _createLayerThumbnailElement(obj: {
        thumbnail: string;
    }): HTMLElement;
    function _createLayerNameElement(obj: any, tooltips: boolean): HTMLElement;
    function _createLayerProducerElement(obj: any, tooltips: boolean): HTMLElement;
    function _createDragNDropElement(obj: any): HTMLDivElement;
    function _createVisibilityElement(obj: any): HTMLElement[];
    function _createAdvancedToolShowElement(obj: any): HTMLElement[];
    function _createAdvancedToolDivElement(obj: any): HTMLElement;
    function _setAdvancedToolOptions(button: HTMLButtonElement, tool: any, setClick?: boolean): HTMLButtonElement;
    function _setButtonIconStyle(button: HTMLButtonElement, iconClass: string, icon: string): void;
    function _createDeleteElement(id: string): HTMLElement;
    function _createEditionElement(obj: {
        id: string;
        editable: boolean;
        tms: boolean;
        styles: any[];
    }, tool: any): HTMLElement;
    function _createInformationElement(obj: {
        id: string;
        title: string;
        description: string;
    }, tool: any): HTMLElement;
    function _createGreyscaleElement(obj: {
        id: string;
        grayable: boolean;
        grayscale: boolean;
    }, tool: any): HTMLElement;
    function _createOpacityElement(id: string, opacity: number): HTMLElement[];
    function _createExtentElement(obj: {
        id: string;
    }, tool: any): HTMLElement;
    function _createAdvancedToolElement(obj: {
        id: string;
    }, tool: any): HTMLElement;
    function _createContainerLayerInfoElement(obj: any): HTMLElement;
    function _createContainerLayerStyleElement(obj: any): HTMLElement;
}
//# sourceMappingURL=LayerSwitcherDOM.d.ts.map