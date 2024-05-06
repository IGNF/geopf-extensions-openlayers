export default MeasureToolBoxDOM;
declare namespace MeasureToolBoxDOM {
    let _toolboxId: string;
    let _buttonId: string;
    let _widgetId: string;
    function getToolBoxID(uid: number): string;
    function getButtonID(uid: number): string;
    function getWidgetID(uid: number): string;
    function _createToolBoxContainerElement(uid: number): DOMElement;
}
//# sourceMappingURL=MeasureToolBoxDOM.d.ts.map