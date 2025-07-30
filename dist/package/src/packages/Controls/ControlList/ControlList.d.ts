export default ControlList;
export type ControlListOptions = {
    /**
     * - Définit si le widget est replié au chargement.
     */
    collapsed?: boolean | undefined;
    /**
     * - Permet de déplacer le panneau du widget.
     */
    draggable?: boolean | undefined;
    /**
     * - Position CSS du widget sur la carte.
     */
    position?: string | undefined;
    /**
     * - Identifiant unique du widget.
     */
    id?: string | number | undefined;
    /**
     * - Élément DOM à afficher en pied de panneau (ex : bouton catalogue).
     */
    controlCatalogElement?: HTMLElement | undefined;
    /**
     * - Ajoute ou retire l’espace autour du panneau.
     */
    gutter?: boolean | undefined;
};
/**
 * @typedef {Object} ControlListOptions
 * @property {boolean} [collapsed=true] - Définit si le widget est replié au chargement.
 * @property {boolean} [draggable=false] - Permet de déplacer le panneau du widget.
 * @property {string} [position] - Position CSS du widget sur la carte.
 * @property {string|number} [id] - Identifiant unique du widget.
 * @property {HTMLElement} [controlCatalogElement] - Élément DOM à afficher en pied de panneau (ex : bouton catalogue).
 * @property {boolean} [gutter] - Ajoute ou retire l’espace autour du panneau.
 */
/**
 * @classdesc
 *
 * ControlList Control.
 *
 * @alias ol.control.ControlList
 * @module ControlList
 *
 */
declare class ControlList extends Control {
    /**
     * @constructor
     * @param {ControlListOptions} options - ControlList control options
     */
    constructor(options: ControlListOptions);
    controlCatalogElement: HTMLElement | null;
    /**
     * Nom de la classe (heritage)
     * @private
     */
    private CLASSNAME;
    _container: HTMLElement;
    /**
     * Overwrite OpenLayers setMap method
     *
     * @param {Map} map - Map.
     */
    setMap(map: Map): void;
    /**
     * Returns true if widget is collapsed (minimized), false otherwise
     *
     * @returns {Boolean} collapsed - true if widget is collapsed
     */
    getCollapsed(): boolean;
    /**
     * Collapse or display widget main container
     *
     * @param {Boolean} collapsed - True to collapse widget, False to display it
     */
    setCollapsed(collapsed: boolean): void;
    collapsed: boolean | undefined;
    /**
     * Get container
     *
     * @returns {HTMLElement} container
     */
    getContainer(): HTMLElement;
    /**
     * Clean UI : reinit control
     */
    clean(): void;
    _currentIsoResults: any;
    /**
     * Initialize control (called by constructor)
     *
     * @param {Object} options - constructor options
     * @private
     */
    private initialize;
    options: {
        collapsed: boolean;
        draggable: boolean;
    } | undefined;
    /**
     * @type {Boolean}
     * specify if control is draggable (true) or not (false) */
    draggable: boolean | undefined;
    /**
     * @private
     * identifiant du contrôle :
     * utile pour suffixer les identifiants CSS
     * (pour gérer le cas où il y en a plusieurs dans la même page) */
    private _uid;
    /**
     * initialize component container (DOM)
     * @returns {HTMLElement} DOM element
     *
     * @private
     */
    private _initContainer;
    _pictoControlListButton: any;
    _ControlListPanelContainer: any;
    _ControlListPanelHeaderContainer: any;
    _ControlListPanelContentContainer: any;
    /**
     * this method is called by event 'click' on 'GPshowControlListPicto' picto
     * (cf. this._createShowControlListPictoElement),
     *
     * @param { Event } e évènement associé au clic
     * @private
     */
    private onShowControlListPanelClick;
}
import Control from "../Control";
import Map from "ol/Map";
//# sourceMappingURL=ControlList.d.ts.map