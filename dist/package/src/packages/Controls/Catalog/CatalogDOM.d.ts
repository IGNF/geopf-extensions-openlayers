export default CatalogDOM;
declare namespace CatalogDOM {
    function generateID(text: string): string;
    function _addUID(id: string): string;
    function _createMainContainerElement(): HTMLElement;
    function _createShowCatalogPictoElement(): HTMLElement;
    function _createCatalogPanelElement(size?: string): HTMLElement;
    function _createCatalogPanelBodyElement(): HTMLDivElement;
    function _createCatalogPanelContentDivElement(): HTMLDivElement;
    function _createCatalogContentDivElement(): ChildNode | null;
    function _createCatalogContentTitleElement(title: any): ChildNode | null;
    function _createCatalogContentSearchGlobalElement(label: any): ShadowRoot;
    function _createCatalogWaitingElement(): HTMLElement;
    function _createCatalogContentCategoriesTabs(categories: Categories, tabHeightAuto: boolean): HTMLElement;
    function _createCatalogContentCategoryTabContent(category: Categories, layersFiltered: any[], nodata: boolean): HTMLElement;
    function _updateListenersLayersDOM(content: HTMLElement, id: string): void;
    function updateVisibilitySectionsByCategory(sectionId: any, categoryId: any, visible: any): void;
}
//# sourceMappingURL=CatalogDOM.d.ts.map