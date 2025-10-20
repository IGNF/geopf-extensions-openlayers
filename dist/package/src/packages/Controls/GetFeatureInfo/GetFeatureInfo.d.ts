export default GetFeatureInfo;
/**
 * @classdesc
 *
 * GetFeatureInfo button
 *
 * @module GetFeatureInfo
 * @alias ol.control.GetFeatureInfo
 
 */
declare class GetFeatureInfo extends Control {
    /**
     * @constructor
    * @param {Object} options - options for function call.
    * @example
    * var getFeatureInfo = new ol.control.GetFeatureInfo();
    * map.addControl(getFeatureInfo);
    */
    constructor(options: any);
    /**
     * Nom de la classe (heritage)
     * @private
     */
    private CLASSNAME;
    container: HTMLElement;
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
    /**
     * @type {Boolean}
     * specify if control is collapsed (true) or not (false) */
    collapsed: boolean | undefined;
    /**
     * @type {Boolean}
     * specify if control is draggable (true) or not (false) */
    draggable: boolean | undefined;
    /**
     * @type {String}
     * if specified, the given html string will be displayed if no data are returned by the gfi */
    noDataMessage: string | undefined;
    /**
     * @type {Boolean}
     * specify if control add some stuff auto */
    auto: boolean | undefined;
    /** @private */
    private buttonGetFeatureInfoShow;
    /** @private */
    private panelGetFeatureInfoContainer;
    /** @private */
    private getFeatureInfoPanelDiv;
    /** @private */
    private panelGetFeatureInfoHeaderContainer;
    /** @private */
    private buttonGetFeatureInfoClose;
    /** @private */
    private getFeatureInfoAccordionGroup;
    /** @private */
    private panelGetFeatureInfoEntriesContainer;
    /** @private */
    private noDataMessageDiv;
    /** {Array} specify some events listeners */
    eventsListeners: any[] | undefined;
    /** GFI settings */
    /** @private */
    private pixel;
    coordinates: any;
    /** @public */
    public layers: any;
    /** @private */
    private res;
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
     * @param { Layer } layer layer openlayer
     * @returns { Object } gfiLayer
     * {
     *      format : "wmts",
     *      layer: layer,
     *      url :  url          pour wmts et wms
     * }
     */
    getGetFeatureInfoLayer(layer: Layer): any;
    /**
     * Main render function
     * @param { Layer } layer layer openlayer
     * @returns { Array } Array of ol features
     */
    getFeaturesAtClick(layer: Layer): any[];
    /**
     * Main render function
     * @param { Layer } gfiLayer layer openlayer
     * @returns { Object } gfi result
     * {
     *      layername : "layername",
     *      content: "html"
     * }
     */
    getGetFeatureInfoContent(gfiLayer: Layer): any;
    /**
     * Get layer title
     *
     * @param {Layer} gfiLayer - the layer object used by the gfi widget
     * @returns {String} layerTitle - layer title
     */
    getLayerTitle(gfiLayer: Layer): string;
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
     * @param {Features[]} features - openlayers features Array
     * @returns {HTMLElement} HTML content.
     */
    features2html(features: Features[]): HTMLElement;
    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    private onShowGetFeatureInfoClick;
    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    private onCloseGetFeatureInfoClick;
    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    private onGetFeatureInfoComputationSubmit;
}
import Control from "../Control";
import Layer from "ol/layer/Layer";
//# sourceMappingURL=GetFeatureInfo.d.ts.map