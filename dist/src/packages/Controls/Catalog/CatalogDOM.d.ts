export default CatalogDOM;
declare namespace CatalogDOM {
    function _addUID(id: string): string;
    function _createMainContainerElement(): DOMElement;
    function _createShowCatalogPictoElement(): DOMElement;
    function _createCatalogPanelElement(): DOMElement;
    function _createCatalogPanelDivElement(): HTMLDivElement;
    function _createCatalogPanelContentDivElement(): HTMLDivElement;
    function _createCatalogPanelHeaderElement(): DOMElement;
    function _createCatalogPanelTitleElement(title: any): HTMLDivElement;
    function _createCatalogPanelCloseElement(): HTMLButtonElement;
    function _createCatalogContentDivElement(): ChildNode | null;
    function _createCatalogContentTitleElement(title: any): ChildNode | null;
    function _createCatalogContentSearchElement(): ShadowRoot;
    function _createCatalogWaitingElement(): DOMElement;
    function _createCatalogContentCategoriesTabs(categories: any): ShadowRoot;
    function _createCatalogContentCategoryTabContent(category: any, layersFiltered: any): ShadowRoot;
}
//# sourceMappingURL=CatalogDOM.d.ts.map