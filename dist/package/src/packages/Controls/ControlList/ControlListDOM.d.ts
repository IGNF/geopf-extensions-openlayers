export default ControlListDOM;
declare namespace ControlListDOM {
    function _addUID(id: string): string;
    function _createMainContainerElement(): HTMLElement;
    function _createShowControlListPictoElement(): HTMLElement;
    function _createControlListPanelElement(): HTMLElement;
    function _createControlListPanelDivElement(): HTMLDivElement;
    function _createControlListPanelHeaderElement(): HTMLElement;
    function _createControlListPanelContentElement(): HTMLElement;
    function _createControlListPanelFooterElement(controlCatalogelement: HTMLElement): HTMLElement;
    function _createControlListPanelControl(control: ol.Control): HTMLElement;
    function _createAccessibleSortableElement(): HTMLDivElement;
    function _onMoveElement(up: boolean, event: KeyboardEvent): void;
    function _moveElement(element: HTMLElement, direction: up | down): boolean;
    let _sortables: never[];
    let _createSortableElement: (arg0: HTMLElement) => any;
}
//# sourceMappingURL=ControlListDOM.d.ts.map