export default CatalogDOM;
declare namespace CatalogDOM {
    function generateID(text: string): string;
    function _addUID(id: string): string;
    function _createMainContainerElement(): HTMLElement;
    function _createShowCatalogPictoElement(): HTMLElement;
    function _createCatalogPanelElement(): HTMLElement;
    function _createCatalogPanelDivSizeElement(size: any): HTMLElement;
    function _createCatalogPanelDivElement(): HTMLDivElement;
    function _createCatalogPanelContentDivElement(): HTMLDivElement;
    function _createCatalogPanelHeaderElement(): HTMLElement;
    function _createCatalogPanelTitleElement(title: any): HTMLDivElement;
    function _createCatalogPanelIconElement(title: any): HTMLLabelElement;
    function _createCatalogPanelCloseElement(): HTMLButtonElement;
    function _createCatalogContentDivElement(): ChildNode | null;
    function _createCatalogContentTitleElement(title: any): ChildNode | null;
    function _createCatalogContentSearchGlobalElement(label: any): ShadowRoot;
    function _createCatalogWaitingElement(): HTMLElement;
    function _createCatalogContentCategoriesTabs(categories: Categories): HTMLElement;
    function _createCatalogContentCategoryTabContent(category: Categories, layersFiltered: any): HTMLElement;
    function _updateListenersLayersDOM(content: HTMLElement, id: string): void;
}
//# sourceMappingURL=CatalogDOM.d.ts.map