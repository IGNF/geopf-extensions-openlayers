export default GetFeatureInfo;
/**
 * @classdesc
 *
 * GetFeatureInfo button
 *
 * @constructor
 * @alias ol.control.GetFeatureInfo
 * @type {ol.control.GetFeatureInfo}
 * @extends {ol.control.Control}
 * @param {Object} options - options for function call.
 *
 * @example
 * var getFeatureInfo = new ol.control.GetFeatureInfo();
 * map.addControl(getFeatureInfo);
 */
declare class GetFeatureInfo {
    /**
     * See {@link ol.control.GetFeatureInfo}
     * @module GetFeatureInfo
     * @alias module:~controls/GetFeatureInfo
     * @param {Object} [options] - options
     * @example
     * import GetFeatureInfo from "gpf-ext-ol/controls/GetFeatureInfo"
     * ou
     * import { GetFeatureInfo } from "gpf-ext-ol"
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
     * Initialize GetFeatureInfo control (called by GetFeatureInfo constructor)
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
    } | undefined;
    /** {Boolean} specify if control is collapsed (true) or not (false) */
    collapsed: boolean | undefined;
    /** {Boolean} specify if control is draggable (true) or not (false) */
    draggable: boolean | undefined;
    /** {Boolean} specify if control add some stuff auto */
    auto: boolean | undefined;
    buttonGetFeatureInfoShow: any;
    panelGetFeatureInfoContainer: any;
    getFeatureInfoPanelDiv: any;
    panelGetFeatureInfoHeaderContainer: any;
    buttonGetFeatureInfoClose: any;
    getFeatureInfoAccordionGroup: any;
    panelGetFeatureInfoEntriesContainer: any;
    /** {Array} specify some events listeners */
    eventsListeners: any[] | undefined;
    /** GFI settings */
    pixel: any;
    coordinates: any;
    layers: any;
    res: any;
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
     */
    private addEventsListeners;
    /**
     * Remove events listeners on map (called by setMap)
     * @private
     */
    private removeEventsListeners;
    /**
     * Tells if control is active or not
     * @private
     * @returns { Boolean } true if active false if not
     */
    private getFeatureInfoIsActive;
    /**
     * event handler
     * @param {Event} e évènement de click
     * @private
     */
    private onMapClick;
    map: any;
    /**
     * Main render function
     * @param { ol.Layer } layer layer openlayer
     * @returns { Object } gfiLayer
     * {
     *      format : "wmts",
     *      layer: layer,
     *      url :  url          pour wmts et wms
     * }
     * @private
     */
    private getGetFeatureInfoLayer;
    /**
     * Main render function
     * @param { ol.Layer } layer layer openlayer
     * @returns { Array } Array of ol features
     * @private
     */
    private getFeaturesAtClick;
    /**
     * Main render function
     * @param { Object } gfiLayer layer openlayer
     * @returns { Object } gfi result
     * {
     *      layername : "layername",
     *      content: "html"
     * }
     * @private
     */
    private getGetFeatureInfoContent;
    /**
     * Get layer title
     *
     * @param {Object} gfiLayer - the layer object used by the gfi widget
     * @returns {String} layerTitle - layer title
     */
    getLayerTitle(gfiLayer: Object): string;
    /**
     * Main render function
     * @private
     */
    private displayGetFeatureInfo;
    /**
     * Return layer format
     *
     * @param {ol.layer.Layer} l - layer openlayers
     * @returns {String} format - layer format can be wms, wmts, vector or unknown
     *
     */
    getLayerFormat(l: ol.layer.Layer): string;
    /**
     * Gets HTML content from features array
     *
     * @param {Array.<ol.Features>} features - openlayers features Array
     * @returns {HTMLElement} HTML content.
     */
    features2html(features: Array<ol.Features>): HTMLElement;
    /**
     * ...
     * @param {*} e - ...
     */
    onShowGetFeatureInfoClick(e: any): void;
    /**
     * ...
     * @param {*} e - ...
     */
    onCloseGetFeatureInfoClick(e: any): void;
    /**
     * ...
     * @param {*} e - ...
     */
    onGetFeatureInfoComputationSubmit(e: any): void;
}
//# sourceMappingURL=GetFeatureInfo.d.ts.map