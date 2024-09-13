export default LayerSwitcherDOM;
declare namespace LayerSwitcherDOM {
    function _createDraggableElement(elementDraggable: Object, context: Object): void;
    function _addUID(id: string): string;
    function _createMainContainerElement(): DOMElement;
    function _createMainLayersShowElement(): DOMElement;
    function _createMainLayersElement(): DOMElement;
    function _createMainLayersDivElement(): HTMLDivElement;
    function _createMainPictoElement(): DOMElement;
    function _createMainCounterLayersElement(): HTMLSpanElement;
    function _createMainInfoElement(): DOMElement;
    function _createMainInfoDivElement(): HTMLDivElement;
    function _createLayersPanelHeaderElement(): HTMLDivElement;
    function _createLayersPanelIconElement(): HTMLLabelElement;
    function _createLayersPanelTitleElement(): HTMLDivElement;
    function _createLayersPanelCloseElement(): HTMLButtonElement;
    function _createContainerLayerElement(obj: {
        layer: Object;
        id: string;
        title: string;
        description: string;
        visibility: boolean;
        opacity: Float;
    }): DOMElement;
    function _createBasicToolElement(obj: Object): DOMElement;
    function _createBasicToolDragNDropElement(obj: any): HTMLDivElement;
    function _createBasicToolNameElement(obj: Object): DOMElement;
    function _createBasicToolVisibilityElement(obj: Object): DOMElement[];
    function _createAdvancedToolShowElement(obj: Object): DOMElement[];
    function _createAdvancedToolElement(obj: Object): DOMElement;
    function _createAdvancedToolDeleteElement(obj: Object, contextual?: boolean): DOMElement;
    function _createAdvancedToolInformationElement(obj: Object, contextual?: boolean): DOMElement;
    function _createAdvancedToolOpacityElement(obj: Object): DOMElement[];
    function _createAdvancedToolExtentElement(obj: Object, contextual?: boolean): DOMElement;
    function _createContainerLayerInfoElement(obj: Object): DOMElement;
}
//# sourceMappingURL=LayerSwitcherDOM.d.ts.map