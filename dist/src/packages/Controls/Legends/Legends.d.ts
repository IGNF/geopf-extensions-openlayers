export default Legends;
/**
 * @classdesc
 *
 * Legends button
 *
 * @constructor
 * @alias ol.control.Legends
 * @type {ol.control.Legends}
 * @extends {ol.control.Control}
 * @param {Object} options - options for function call.
 *
 * @fires legends:add
 * @fires legends:remove
 * @fires legends:modify
 * @example
 * var legends = new ol.control.Legends();
 * map.addControl(legends);
 */
declare class Legends {
    /**
     * See {@link ol.control.Legends}
     * @module Legends
     * @alias module:~controls/Legends
     * @param {Object} [options] - options
     * @example
     * import Legends from "gpf-ext-ol/controls/Legends"
     * ou
     * import { Legends } from "gpf-ext-ol"
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
     * Get container
     *
     * @returns {DOMElement} container
     */
    getContainer(): DOMElement;
    /**
     * Get all meta informations of a IGN's layer
     *
     * @param {*} layer - layer
     * @returns {*} informations
     * @public
     * @example
     * getLegends() :
     * "legends" : [
     *         {
     *             "format" : "image/jpeg",
     *             "url" : "https:*data.geopf.fr/annexes/ressources/legendes/LEGEND.jpg",
     *             "minScaleDenominator" : "200"
     *         }
     *     ],
     */
    public getMetaInformations(layer: any): any;
    /**
     * Add legends from layers
     * @param {*} layers  - ...
     * @public
     */
    public adds(layers: any): void;
    /**
     * Add a legend from a layer
     * @param {*} layer  - ...
     * @returns {Boolean} - true|false
     * @public
     */
    public add(layer: any): boolean;
    /**
     * Remove a legend from a layer
     * @param {*} layer - ...
     * @returns  {Boolean} - true|false
     * @public
     */
    public remove(layer: any): boolean;
    /**
     * Has already a DOM legend
     * @param {*} dom  - ...
     * @returns {Boolean} - true|false
     * @public
     */
    public exist(dom: any): boolean;
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
    buttonLegendsShow: any;
    panelLegendsContainer: any;
    panelLegendsEntriesContainer: any;
    panelLegendsHeaderContainer: any;
    buttonLegendsClose: any;
    eventsListeners: any[] | undefined;
    legends: any[] | undefined;
    /**
     * Create control main container (DOM initialize)
     *
     * @returns {DOMElement} DOM element
     * @private
     */
    private initContainer;
    /**
     * Add events listeners on map (called by setMap)
     *
     * @param {*} map - map
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
     * @param {*} e - ...
     */
    onShowLegendsClick(e: any): void;
}
//# sourceMappingURL=Legends.d.ts.map