export default Territories;
/**
 * @classdesc
 *
 * Territories map widget
 *
 * @constructor
 * @alias ol.control.Territories
 * @type {ol.control.Territories}
 * @extends {ol.control.Control}
 * @param {Object} options - options for function call.
 *
 * @fires territories:change
 * @example
 * var territories = new ol.control.Territories({
 *   collapsed: true,
 *   panel: true,
 *   auto: true
 * });
 * map.addControl(territories);
 *
 * or/and
 *
 * var territories = new ol.control.Territories({});
 * territories.setTerritory({id: "MTQ", title: "Martinique", description: "", bbox: [], thumbnail: "data:image/png;base64,..."});
 * territories.setTerritory({id: "GLP", title: "Guadeloupe", description: "", bbox: [], thumbnail: "http://..."});
 * map.addControl(territories);
 */
declare class Territories {
    /**
     * See {@link ol.control.Territories}
     * @module Territories
     * @alias module:~controls/Territories
     * @param {Object} [options] - options
     * @example
     * import Territories from "gpf-ext-ol/controls/Territories"
     * ou
     * import { Territories } from "gpf-ext-ol"
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
     * Add a territory
     *
     * @param {Object} territory  - territory
     * @returns {Boolean} - true|false
     * @public
     * @example
     * territories.setTerritory ({
     *  id: "MTQ",
     *  title: "Martinique",
     *  description: "",
     *  bbox: [minx, miny, maxx, maxy],
     *  thumbnail: "data:image/png;base64,..."
     * });
     */
    public setTerritory(territory: Object): boolean;
    /**
     * Load a new configuration
     *
     * @param {Object} config - file config
     */
    setTerritories(config: Object): void;
    /**
     * Remove a territory
     *
     * @param {String} territory - territory id (FRA, MTQ, ...)
     * @returns {Boolean} - true|false
     * @public
     * @example
     * territories.removeTerritory("MTQ"); // id du territoire
     */
    public removeTerritory(territory: string): boolean;
    /**
     * Remove all territories
     */
    removeTerritories(): void;
    territories: any[] | undefined;
    /**
     * Set collapse
     *
     * @param {Boolean} collapsed - true|false
     * @todo ...
     * @public
     */
    public setCollapse(collapsed: boolean): void;
    collapsed: any;
    /**
     * Mode reduit des tuiles (uniquement le nom du territoire)
     *
     * @param {*} reduce - true|false
     * @public
     */
    public setReduce(reduce: any): void;
    /**
     * Get container
     *
     * @returns {DOMElement} container
     */
    getContainer(): DOMElement;
    /**
     * Initialize Territories control (called by Territories constructor)
     *
     * @param {Object} options - constructor options
     * @private
     */
    private initialize;
    uid: any;
    options: {
        collapsed: boolean;
        draggable: boolean;
        panel: boolean;
        upload: {
            active: boolean;
            title: string;
            description: string;
        };
        title: string;
        auto: boolean;
        thumbnail: boolean;
        reduce: boolean;
        tiles: number;
        territories: never[];
    } | undefined;
    /** {Boolean} specify if control is draggable (true) or not (false) */
    draggable: boolean | undefined;
    /** {Boolean} specify if we load the list of territories by default */
    auto: boolean | undefined;
    /** {Boolean} specify if a list of object territories must be appended or replaced */
    append: any;
    buttonTerritoriesShow: any;
    panelTerritoriesContainer: any;
    panelTerritoriesHeaderContainer: any;
    buttonTerritoriesClose: any;
    containerTerritoriesOptions: any;
    panelTerritoriesEntriesContainer: any;
    /**
     * Create control main container (DOM initialize)
     *
     * @returns {DOMElement} DOM element
     * @private
     */
    private initContainer;
    /**
     * Close panel option
     */
    closePanelUpLoad(): void;
    /**
     * ...
     * @param {*} e - ...
     */
    onShowTerritoriesClick(e: any): void;
    /**
     * ...
     * @param {*} e - ...
     */
    onCloseTerritoriesClick(e: any): void;
    /**
     * ...
     * @param {*} e - ...
     * @param {*} id - ...
     * @todo ...
     */
    onImageTerritoriesClick(e: any, id: any): void;
    /**
     * ...
     * @param {*} e  - ...
     */
    onUploadFileClick(e: any): void;
    /**
     * ...
     * @param {*} e  - ...
     */
    onUploadToggleClick(e: any): void;
}
//# sourceMappingURL=Territories.d.ts.map