export default CatalogDOM;
declare namespace CatalogDOM {
    function generateID(text: string): string;
    function _addUID(id: string): string;
    function _createMainContainerElement(): HTMLElement;
    function _createShowCatalogPictoElement(): HTMLElement;
    function _createCatalogPanelElement(): HTMLElement;
    function _createCatalogPanelDivElement(): HTMLDivElement;
    function _createCatalogPanelContentDivElement(): HTMLDivElement;
    function _createCatalogPanelHeaderElement(): HTMLElement;
    function _createCatalogPanelTitleElement(title: any): HTMLDivElement;
    function _createCatalogPanelCloseElement(): HTMLButtonElement;
    function _createCatalogContentDivElement(): ChildNode | null;
    function _createCatalogContentTitleElement(title: any): ChildNode | null;
    function _createCatalogContentSearchElement(): ShadowRoot;
    function _createCatalogWaitingElement(): HTMLElement;
    function _createCatalogContentCategoriesTabs(categories: any): ShadowRoot;
    function _createCatalogContentCategoryTabContent(category: any, layersFiltered: any): ShadowRoot;
}
//# sourceMappingURL=CatalogDOM.d.ts.map