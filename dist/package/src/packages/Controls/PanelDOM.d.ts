export default PanelDOM;
declare namespace PanelDOM {
    function _createPanelHeaderElement({ icon, title, btnClassForClose, backBtn }: {
        icon: any;
        title: any;
        btnClassForClose?: boolean | undefined;
        backBtn?: boolean | undefined;
    }): HTMLElement;
    function _createPanelIconElement(icon: any): HTMLSpanElement;
    function _createPanelTitleElement(title: any): HTMLSpanElement;
    function _createPanelCloseElement(btnClassForClose: any): HTMLButtonElement;
    function _createPanelBackButtonElement(): HTMLButtonElement;
    function _createPanelBodyElement(): HTMLDivElement;
}
//# sourceMappingURL=PanelDOM.d.ts.map