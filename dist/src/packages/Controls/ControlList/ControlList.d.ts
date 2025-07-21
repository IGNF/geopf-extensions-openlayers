export default ControlList;
/**
 * @classdesc
 *
 * ControlList Control.
 *
 * @constructor
 * @alias ol.control.ControlList
 * @type {ol.control.ControlList}
 * @extends {ol.control.ControlList}
 * @param {Object} options - ControlList control options
 */
declare class ControlList {
    /**
     * See {@link ol.control.ControlList}
     * @module ControlList
     * @alias module:~controls/ControlList
     * @param {*} options - options
     * @example
     * import ControlList from from "gpf-ext-ol/controls/ControlList"
     * ou
     * import { ControlList } from "gpf-ext-ol"
     */
    constructor(options: any);
    controlCatalogElement: any;
    /**
     * Nom de la classe (heritage)
     * @private
     */
    private CLASSNAME;
    _container: DOMElement;
    element: any;
    /**
     * Overwrite OpenLayers setMap method
     *
     * @param {ol.Map} map - Map.
     */
    setMap(map: ol.Map): void;
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
     * @returns {DOMElement} container
     */
    getContainer(): DOMElement;
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
    /** {Boolean} specify if control is draggable (true) or not (false) */
    draggable: boolean | undefined;
    _uid: any;
    /**
     * initialize component container (DOM)
     * @returns {DOMElement} DOM element
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
     * @param { event } e évènement associé au clic
     * @private
     */
    private onShowControlListPanelClick;
}
//# sourceMappingURL=ControlList.d.ts.map