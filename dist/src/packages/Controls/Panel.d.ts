export default PanelDOM;
/**
 * Panneau generique pour les widgets
 *
 * @example
 * import PanelDOM from "./Panel.js";
 * var panel = new PanelDOM(uid);
 *
 * panel.add("drawing", "Annoter la carte", cb);
 * panel
 *   .add("elevationpath", "Profil Altimétrique", cb)
 *   .insertBtn("reduce", cb)
 *   .insertBtn("info", cb);
 * panel.add("isocurve", "Calcul d'isochrone", cb);
 * panel.add("import", "Import de données", cb);
 * panel
 *   .add("layerSwitcher", "Couches de données", cb)
 *   .insertIcon();
 * panel.add("mousePosition", "Coordonnées", cb);
 * panel
 *   .add("reverseGeocoding", "Recherche inverse", cb)
 *   .insertBtn("reduce", cb, { class : "hidden" });
 * panel.add("route", "Calcul d'itinéraire", cb);
 *
 * @mixin
 */
declare class PanelDOM {
    constructor(uid: any);
    uid: any;
    name: any;
    container: HTMLDialogElement | null;
    header: HTMLDivElement | null;
    headerTitle: HTMLDivElement | null;
    headerClose: HTMLButtonElement | null;
    headerBtnReduce: HTMLButtonElement | null;
    headerBtnInfo: HTMLButtonElement | null;
    headerIcon: any;
    /**
     * ...
     * @param {*} name -
     * @param {*} title -
     * @param {*} cb -
     * @returns {DOMElement} -
     */
    add(name: any, title: any, cb: any): DOMElement;
    /**
     * ...
     * @param {*} name -
     * @param {*} cb -
     * @param {*} options -
     * @returns {DOMElement} -
     */
    insertBtn(name: any, cb: any, options: any): DOMElement;
    /**
     * ...
     * @returns {DOMElement} -
     */
    insertIcon(): DOMElement;
    #private;
}
//# sourceMappingURL=Panel.d.ts.map