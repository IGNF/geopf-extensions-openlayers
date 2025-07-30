export default ContextMenu;
export type ContextMenuOptions = {
    /**
     * - Définit si le widget est replié au chargement.
     */
    collapsed?: boolean | undefined;
    /**
     * - Permet de déplacer le panneau du widget.
     */
    draggable?: boolean | undefined;
    /**
     * - Active l’ajout automatique des événements sur la carte.
     */
    auto?: boolean | undefined;
    /**
     * - Affiche un en-tête (header) dans le panneau.
     */
    panel?: boolean | undefined;
    /**
     * - Tableau d’items personnalisés pour le menu contextuel (format ol-contextmenu).
     */
    contextMenuItemsOptions?: any[] | undefined;
    /**
     * - Élément DOM à utiliser comme conteneur principal.
     */
    element?: HTMLElement | undefined;
    /**
     * - Sélecteur ou identifiant du conteneur cible.
     */
    target?: string | undefined;
    /**
     * - Fonction de rendu personnalisée.
     */
    render?: Function | undefined;
    /**
     * - Position CSS du widget sur la carte.
     */
    position?: string | undefined;
    /**
     * - Ajoute ou retire l’espace autour du panneau.
     */
    gutter?: boolean | undefined;
    /**
     * - Identifiant unique du widget.
     */
    id?: string | number | undefined;
};
/**
 * @typedef {Object} ContextMenuOptions
 * @property {boolean} [collapsed=true] - Définit si le widget est replié au chargement.
 * @property {boolean} [draggable=false] - Permet de déplacer le panneau du widget.
 * @property {boolean} [auto=true] - Active l’ajout automatique des événements sur la carte.
 * @property {boolean} [panel=true] - Affiche un en-tête (header) dans le panneau.
 * @property {Array<Object>} [contextMenuItemsOptions=[]] - Tableau d’items personnalisés pour le menu contextuel (format ol-contextmenu).
 * @property {HTMLElement} [element] - Élément DOM à utiliser comme conteneur principal.
 * @property {string} [target] - Sélecteur ou identifiant du conteneur cible.
 * @property {Function} [render] - Fonction de rendu personnalisée.
 * @property {string} [position] - Position CSS du widget sur la carte.
 * @property {boolean} [gutter] - Ajoute ou retire l’espace autour du panneau.
 * @property {string|number} [id] - Identifiant unique du widget.
 */
/**
 * @classdesc
 *
 * ContextMenu button
 *
 * @alias ol.control.ContextMenu
 * @module ContextMenu
*/
declare class ContextMenu extends Control {
    /**
     * @constructor
     * @param {ContextMenuOptions} options - options for function call.
     *    la clé contextMenuItemsOptions permet de paramétrer
     *    un tableau d'item dont le format est hérité de la librairie
     *    {@link https://www.npmjs.com/package/ol-contextmenu}
     *
     *    ex : { contextMenuItemsOptions : itemsOpt }
     *
     * @example
     * var contextMenu = new ol.control.ContextMenu();
     * map.addControl(contextMenu);
     */
    constructor(options: ContextMenuOptions);
    /**
    * Nom de la classe (heritage)
    * @private
    */
    private CLASSNAME;
    container: HTMLElement;
    /**
     * Overwrite OpenLayers setMap method
     *
     * @param {Map} map - Map.
     */
    setMap(map: Map): void;
    /**
     * Initialize ContextMenu control (called by ContextMenu constructor)
     *
     * @param {Object} options - constructor options
     * @private
     */
    private initialize;
    uid: number | undefined;
    options: {
        collapsed: boolean;
        draggable: boolean;
        auto: boolean;
        panel: boolean;
        contextMenuItemsOptions: never[];
    } | undefined;
    /**
     * @type {Boolean}
     * specify if control is collapsed (true) or not (false) */
    collapsed: boolean | undefined;
    /**
     * @type {Boolean}
     * specify if control is draggable (true) or not (false) */
    draggable: boolean | undefined;
    /**
     * @type {Boolean}
     * specify if control add some stuff auto */
    auto: boolean | undefined;
    /** @private */
    private buttonContextMenuShow;
    /** @private */
    private panelContextMenuContainer;
    /** @private */
    private panelContextMenuHeaderContainer;
    /** @private */
    private buttonContextMenuClose;
    /** @private */
    private panelContextMenuEntriesContainer;
    /** {Array} specify some events listeners */
    /** @private */
    private eventsListeners;
    /** @private */
    private controlList;
    /** @private */
    private itiPoints;
    /** @private */
    private _marker;
    /** @private */
    private contextMenuItemsOptions;
    /** @type {olContextMenu} */
    contextmenu: olContextMenu | undefined;
    /**
     * Create control main container (DOM initialize)
     *
     * @returns {HTMLElement} DOM element
     * @private
     */
    private initContainer;
    buttonPointInfoShow: any;
    panelPointInfoContainer: any;
    panelPointInfoEntriesContainer: any;
    panelPointInfoHeaderContainer: any;
    buttonPointInfoClose: any;
    /**
     * Add events listeners on map (called by setMap)
     *
     * @private
     */
    private addEventsListeners;
    /**
     * Remove events listeners on map (called by setMap)
     * @private
     */
    private removeEventsListeners;
    /**
     * Add tools if added to the map Controls list
     * @private
     * @returns { Object } liste d'items par défaut du menu contextuel si control actif sur la carte
     */
    private getAvailableContextMenuControls;
    /**
     *
     * ---- Ajouter un point sur la carte
     *
     * Fonction utilisée lors d'un clique droit sur la carte
     * Il s'agit d'afficher un marqueur et de stocker les coordonnées de ce point
     * Et tout cela en intéragissant avec le formulaire des paramètres de l'itinéraire
     * @param {*} evt event
     *
     */
    defineStartPoint(evt: any): void;
    /**
     * ---- Ajouter un point sur la carte
     *
     * Fonction utilisée lors d'un clique droit sur la carte
     * Il s'agit d'afficher un marqueur et de stocker les coordonnées de ce point
     * Et tout cela en intéragissant avec le formulaire des paramètres de l'itinéraire
     *
     * @param {*} evt event
     */
    defineEndPoint(evt: any): void;
    /**
     * Convertit les coordonnées en EPSG:4326
     *
     * @param { Array } coord Coordonnées en 3857
     * @returns { Array } tableau de coordonnées en 4326
     */
    to4326(coord: any[]): any[];
    /**
     * Fonction qui lance le calcul d'isochrone
     * pour les coordonnées sous le clic
     *
     * @param {*} evt event
     */
    computeIsochrone(evt: any): void;
    /**
     * Fonction qui ouvre le widget des légendes
     *
     * @param {*} evt event
     */
    displayLegend(evt: any): void;
    /**
     * Fonction qui ouvre le widget Catalogue
     *
     * @param {*} evt event
     */
    openCatalogue(evt: any): void;
    /**
     * Fonction qui ouvre un panel qui affiche les coordonnées et l'adresse sous le clic
     *
     * @param {*} evt event
     */
    displayAdressAndCoordinate(evt: any): void;
    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    private onShowPointInfoClick;
    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    private onClosePointInfoClick;
    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    private onCloseContextMenu;
    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    private onOpenContextMenu;
}
import Control from "../Control";
import Map from "ol/Map";
import olContextMenu from "ol-contextmenu";
//# sourceMappingURL=ContextMenu.d.ts.map