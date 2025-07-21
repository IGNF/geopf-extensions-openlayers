export default ContextMenu;
/**
 * @classdesc
 *
 * ContextMenu button
 *
 * @constructor
 * @alias ol.control.ContextMenu
 * @type {ol.control.ContextMenu}
 * @extends {ol.control.Control}
 * @param {Object} options - options for function call.
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
declare class ContextMenu {
    /**
     * See {@link ol.control.ContextMenu}
     * @module ContextMenu
     * @alias module:~controls/ContextMenu
     * @param {Object} [options] - options
     * @example
     * import ContextMenu from "gpf-ext-ol/controls/ContextMenu"
     * ou
     * import { ContextMenu } from "gpf-ext-ol"
     */
    constructor(options?: Object);
    /**
    * Nom de la classe (heritage)
    * @private
    */
    private CLASSNAME;
    container: DOMElement;
    element: any;
    /**
     * Overwrite OpenLayers setMap method
     *
     * @param {ol.Map} map - Map.
     */
    setMap(map: ol.Map): void;
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
    /** {Boolean} specify if control is collapsed (true) or not (false) */
    collapsed: boolean | undefined;
    /** {Boolean} specify if control is draggable (true) or not (false) */
    draggable: boolean | undefined;
    /** {Boolean} specify if control add some stuff auto */
    auto: boolean | undefined;
    buttonContextMenuShow: any;
    panelContextMenuContainer: any;
    panelContextMenuHeaderContainer: any;
    buttonContextMenuClose: any;
    panelContextMenuEntriesContainer: any;
    /** {Array} specify some events listeners */
    eventsListeners: any[] | undefined;
    controlList: any[] | undefined;
    itiPoints: any[] | undefined;
    _marker: any;
    contextMenuItemsOptions: any;
    contextmenu: any;
    /**
     * Create control main container (DOM initialize)
     *
     * @returns {DOMElement} DOM element
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
     * @param {*} e - ...
     */
    onShowPointInfoClick(e: any): void;
    /**
     * ...
     * @param {*} e - ...
     */
    onClosePointInfoClick(e: any): void;
    /**
     * ...
     * @param {*} e - ...
     */
    onCloseContextMenu(e: any): void;
    /**
     * ...
     * @param {*} e - ...
     */
    onOpenContextMenu(e: any): void;
}
//# sourceMappingURL=ContextMenu.d.ts.map