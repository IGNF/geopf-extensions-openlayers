export default Legends;
export type LegendsOptions = {
    collapsed?: boolean | undefined;
    draggable?: boolean | undefined;
    auto?: boolean | undefined;
    panel?: boolean | undefined;
    position?: string | undefined;
    gutter?: boolean | undefined;
    id?: string | undefined;
};
/**
 * @typedef {Object} LegendsOptions
 * @property {boolean} [collapsed]
 * @property {boolean} [draggable]
 * @property {boolean} [auto]
 * @property {boolean} [panel]
 * @property {string} [position]
 * @property {boolean} [gutter]
 * @property {string} [id]
 */
/**
* @classdesc
*
* Legends button
*
* @module Legends
* @alias ol.control.Legends
*/
declare class Legends extends Control {
    /**
     * @param {LegendsOptions} [options] - options
     * @constructor
     * @public
     * @fires legends:add
     * @fires legends:remove
     * @fires legends:modify
     * @example
     * var legends = new ol.control.Legends();
     * map.addControl(legends);
     */
    constructor(options?: LegendsOptions);
    /**
     * @private
     * Nom de la classe (heritage) */
    private CLASSNAME;
    /**
     * @private
     * Widget main DOM container */
    private container;
    /**
     * Overwrite OpenLayers setMap method
     *
     * @param {Map} map - Map.
     */
    setMap(map: Map): void;
    /**
     * Get container
     *
     * @returns {HTMLElement} container
     */
    getContainer(): HTMLElement;
    /**
     * Get all meta informations of a IGN's layer
     *
     * @param {Layer} layer - layer
     * @returns {*} informations
     * @public
     * @example
     * getLegends() :
     * "legends" : [
     *  {
     *     "format" : "image/jpeg",
     *     "url" : "https:*data.geopf.fr/annexes/ressources/legendes/LEGEND.jpg",
     *     "minScaleDenominator" : "200"
     *   }
     *  ],
     */
    public getMetaInformations(layer: Layer): any;
    /**
     * Add legends from layers
     * @param {Layer[]} layers - Array of layers
     * @public
     */
    public adds(layers: Layer[]): void;
    /**
     * Add a legend from a layer
     * @param {Layer} layer  - ...
     * @returns {Boolean} - true|false
     * @public
     */
    public add(layer: Layer): boolean;
    /**
     * Remove a legend from a layer
     * @param {Layer} layer - ...
     * @returns  {Boolean} - true|false
     * @public
     */
    public remove(layer: Layer): boolean;
    /**
     * Has already a DOM legend
     * @param {HTMLElement} dom  - ...
     * @returns {Boolean} - true|false
     * @public
     */
    public exist(dom: HTMLElement): boolean;
    /**
     * Initialize Legends control (called by Legends constructor)
     *
     * @param {Object} options - constructor options
     * @private
     */
    private initialize;
    uid: any;
    options: {
        collapsed: boolean;
        draggable: boolean;
        auto: boolean;
        panel: boolean;
    } | undefined;
    /** {Boolean} specify if control is collapsed (true) or not (false) */
    collapsed: boolean | undefined;
    /** {Boolean} specify if control is draggable (true) or not (false) */
    draggable: boolean | undefined;
    /** {Boolean} specify if control add layers auto */
    auto: boolean | undefined;
    /** @private */
    private buttonLegendsShow;
    /** @private */
    private panelLegendsContainer;
    /** @private */
    private panelLegendsEntriesContainer;
    /** @private */
    private panelLegendsHeaderContainer;
    /** @private */
    private buttonLegendsClose;
    /** @private */
    private eventsListeners;
    legends: any[] | undefined;
    /**
     * Create control main container (DOM initialize)
     *
     * @returns {HTMLElement} DOM element
     * @private
     */
    private initContainer;
    /**
     * Add events listeners on map (called by setMap)
     *
     * @param {Map} map - map
     * @private
     * @todo listener on change:position
     */
    private addEventsListeners;
    /**
     * Remove events listeners on map (called by setMap)
     * @private
     */
    private removeEventsListeners;
    /**
     * ...
     * @param {PointerEvent} e - ...
     * @private
     */
    private onShowLegendsClick;
}
import Control from "../Control";
import Map from "ol/Map";
import Layer from "ol/layer/Layer";
//# sourceMappingURL=Legends.d.ts.map