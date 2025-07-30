export default LayerImport;
/**
 * @classdesc
 *
 * LayerImport Control.
 * Allows users to add geographical data in standards formats
 * from their own sources to the map.
 *
 * @alias ol.control.LayerImport
 * @module LayerImport
 */
declare class LayerImport extends Control {
    /**
    * Default styles applyied to KML, GPX and GeoJSON features.
    *
    * @private
    */
    private static DefaultStyles;
    /**
    * @constructor
    * @fires layerimport:mapbox:added
    * @fires layerimport:vector:added
    * @fires layerimport:service:added
    * @fires editor:loaded
    * @fires render:success
    * @fires render:failure
    * @param {Object} options - options for function call.
    * @param {Number} [options.id] - Ability to add an identifier on the widget (advanced option)
    * @param {Boolean} [options.collapsed = true] - Specify if LayerImport control should be collapsed at startup. Default is true.
    * @param {Boolean} [options.draggable = false] - Specify if widget is draggable
    * @param {Array} [options.layerTypes = ["KML", "GPX", "GeoJSON", "WMS", "WMTS", "MAPBOX"]] - data types that could be imported : "KML", "GPX", "GeoJSON", "WMS", "WMTS" and "MAPBOX". Values will be displayed in the same order in widget list.
    * @param {Object} [options.webServicesOptions = {}] - Options to import WMS or WMTS layers
    * @param {String} [options.webServicesOptions.proxyUrl] - Proxy URL to avoid cross-domain problems. Mandatory to import WMS and WMTS layer.
    * @param {Array.<String>} [options.webServicesOptions.noProxyDomains] - Proxy will not be used for this list of domain names. Only use if you know what you're doing.
    * @param {Object} [options.vectorStyleOptions] - Options for imported vector layer styling (KML, GPX, GeoJSON)
    * @param {Object} [options.vectorStyleOptions.KML] - Options for KML layer styling
    * @param {Boolean} [options.vectorStyleOptions.KML.extractStyles = true] - Extract styles from the KML. Default is true.
    * @param {Boolean} [options.vectorStyleOptions.KML.showPointNames = true] - Show names as labels for KML placemarks which contain points. Default is true.
    * @param {Object} [options.vectorStyleOptions.KML.defaultStyle] - default style to be applied to KML imports in case no style is defined. defaultStyle is an {@link http://openlayers.org/en/latest/apidoc/ol.style.Style.html ol.style.Style} object.
    * @param {Object} [options.vectorStyleOptions.GPX] - Options for GPX layer styling
    * @param {Object} [options.vectorStyleOptions.GPX.defaultStyle] - default style to be applied to GPX imports in case no style is defined. defaultStyle is an {@link http://openlayers.org/en/latest/apidoc/ol.style.Style.html ol.style.Style} object.
    * @param {Object} [options.vectorStyleOptions.GeoJSON] - Options for GeoJSON layer styling
    * @param {Object} [options.vectorStyleOptions.GeoJSON.defaultStyle] - default style to be applied to GeoJSON imports in case no style is defined. defaultStyle is an {@link http://openlayers.org/en/latest/apidoc/ol.style.Style.html ol.style.Style} object.
    * @param {Object} [options.vectorStyleOptions.MapBox] - Options for MapBox layer styling
    * @param {Object} [options.vectorStyleOptions.MapBox.defaultStyle] - default style to be applied to MapBox imports in case no style is defined. defaultStyle is an {@link http://openlayers.org/en/latest/apidoc/ol.style.Style.html ol.style.Style} object.
    * @param {Object} [options.vectorStyleOptions.MapBox.editor] - options for tools editor
    * @param {Boolean} [options.vectorStyleOptions.MapBox.display = true] - display tools editor
    * @example
    *  var LayerImport = new ol.control.LayerImport({
    *      "collapsed" : false,
    *      "draggable" : true,
    *      "layerTypes" : ["KML", "GPX"],
    *      "webServicesOptions" : {
    *          "proxyUrl" : "http://localhost/proxy/php/proxy.php?url=",
    *          "noProxyDomains" : []
    *      },
    *      "vectorStyleOptions" : {
    *          "KML" : {
    *              extractStyles : true,
    *              defaultStyle : new ol.style.Style({
    *                  image : new ol.style.Icon({
    *                       src : "data:image/png;base64....",
    *                       size : [51, 38],
    *                  }),
    *                  stroke : new ol.style.Stroke({
    *                       color : "#ffffff",
    *                       width : 7
    *                  }),
    *                  fill : new ol.style.Fill({
    *                       color : "rgba(255, 183, 152, 0.2)"
    *                  }),
    *                  text : new ol.style.Text({
    *                      font : "16px Sans",
    *                      textAlign : "left",
    *                      fill : new ol.style.Fill({
    *                          color : "rgba(255, 255, 255, 1)"
    *                      }),
    *                      stroke : new ol.style.Stroke({
    *                          color : "rgba(0, 0, 0, 1)",
    *                          width : 2
    *                      })
    *                  })
    *              })
    *          },
    *          "GPX" : {
    *              defaultStyle : new ol.style.Style({
    *                  image : new ol.style.Icon({
    *                       src : "path/to/my/icon.png",
    *                       size : [51, 38],
    *                  }),
    *                  stroke : new ol.style.Stroke({
    *                       color : "#ffffff",
    *                       width : 7
    *                  })
    *              })
    *          }
    *      }
    *  });
     */
    constructor(options: {
        id?: number | undefined;
        collapsed?: boolean | undefined;
        draggable?: boolean | undefined;
        layerTypes?: any[] | undefined;
        webServicesOptions?: {
            proxyUrl?: string | undefined;
            noProxyDomains?: string[] | undefined;
        } | undefined;
        vectorStyleOptions?: {
            KML?: {
                extractStyles?: boolean | undefined;
                showPointNames?: boolean | undefined;
                defaultStyle?: any;
            } | undefined;
            GPX?: {
                defaultStyle?: any;
            } | undefined;
            GeoJSON?: {
                defaultStyle?: any;
            } | undefined;
            MapBox?: {
                defaultStyle?: any;
                editor?: any;
                display?: boolean | undefined;
            } | undefined;
        } | undefined;
    });
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
     * Returns content of a static import (KML, GPX or GeoJSON)
     *
     * @returns {String} contentStatic  - content static
     */
    getStaticImportContent(): string;
    /**
     * Returns content of a service import (GetCapabilities)
     *
     * @returns {String} contentService  - content service
     */
    getServiceImportContent(): string;
    /**
     * Returns layer name
     *
     * @returns {String} name - layer name
     */
    getName(): string;
    /**
     * Get container
     *
     * @returns {HTMLElement} container
     */
    getContainer(): HTMLElement;
    /**
     * Initialize LayerImport control (called by LayerImport constructor)
     *
     * @param {Object} options - constructor options
     * @private
     */
    private _initialize;
    options: {
        collapsed: boolean;
        draggable: boolean;
        layerTypes: string[];
        webServicesOptions: {};
        vectorStyleOptions: {
            KML: {
                extractStyles: boolean;
                showPointNames: boolean;
                defaultStyle: {};
            };
            GPX: {
                defaultStyle: {};
            };
            GeoJSON: {
                defaultStyle: {};
            };
            MapBox: {
                defaultStyle: {};
                editor: {};
            };
        };
    } | undefined;
    /**
     * @type {Boolean}
     * specify if LayerImport control is draggable (true) or not (false) */
    draggable: boolean | undefined;
    _uid: any;
    /**
     * @private
     * si une requête est en cours ou non */
    private _waiting;
    /**
     * @private
     * timer pour cacher la patience après un certain temps */
    private _timer;
    /** @private */
    private _showImportButton;
    /** @private */
    private _importPanel;
    /** @private */
    private _panelCloseButton;
    /** @private */
    private _importPanelHeader;
    /** @private */
    private _importPanelTitle;
    /** @private */
    private _importPanelReturnPicto;
    /** @private */
    private _formContainer;
    /** @private */
    private _staticLocalImportInput;
    /** @private */
    private _staticUrlImportInput;
    /** @private */
    private _serviceUrlImportInput;
    /** @private */
    private _getCapPanel;
    /** @private */
    private _getCapPanelHeader;
    /** @private */
    private _getCapResultsListContainer;
    /** @private */
    private _mapBoxPanel;
    /** @private */
    private _mapBoxPanelHeader;
    /** @private */
    private _mapBoxResultsListContainer;
    /** @private */
    private _waitingContainer;
    /** @private */
    private _loadingContainer;
    /** @private */
    private _hasGetCapResults;
    /** @private */
    private _getCapRequestUrl;
    /** @private */
    private _getCapResponseWMS;
    /** @private */
    private _getCapResponseWMSLayers;
    /** @private */
    private _getCapResponseWMTS;
    /** @private */
    private _getCapResponseWMTSLayers;
    /** @private */
    private _hasMapBoxResults;
    /** @private */
    private contentStatic;
    /** @private */
    private _url;
    /** @private */
    private _file;
    /** @private */
    private _name;
    /**
     * this method is called by this.initialize()
     * and makes sure input options are correctly formated
     *
     * @param {Object} options - control input options
     * @private
     */
    private _checkInputOptions;
    /**
     * this method is called by this.initialize()
     * and initializes default styles for vector layers (KML/GPX/GeoJSON)
     *
     * @private
     */
    private _initDefaultStyles;
    _defaultKMLStyle: Style | undefined;
    _defaultGPXStyle: Style | undefined;
    _defaultGeoJSONStyle: Style | undefined;
    _defaultMapBoxStyle: Style | undefined;
    /**
     * this method is called by this.initialize()
     * and initializes import types parameter
     *
     * @private
     */
    private _initImportTypes;
    _currentImportType: any;
    _isCurrentImportTypeStatic: boolean | undefined;
    _currentStaticImportType: any;
    /**
     * Create control main container (DOM initialize)
     *
     * @private
     * @returns {HTMLElement} container - control main container
     */
    private _initContainer;
    /**
     * Create control main container (DOM initialize)
     *
     * @private
     * @returns {HTMLElement} importForm - form main container
     */
    private _initInputFormElement;
    /**
     * this method is called by event 'click' on 'GPshowImportPicto' picto
     * (cf. LayerImportDOM._createShowImportPictoElement),
     * and dispatch event change:collapsed (for tools listening this property)
     *
     * @param { Event } e évènement associé au clic
     * @private
     */
    private _onShowImportClick;
    /**
     * this method is called by event 'change' on 'GPimportType' tag form
     * (cf. LayerImportDOM._createImportTypeLineElement),
     * and change current import type
     *
     * @param {Event} e - HTMLElement
     * @private
     */
    private _onImportTypeChange;
    /**
     * this method is called by event 'change' on 'GPimportType' tag form
     * (cf. LayerImportDOM._createImportTypeLineElement),
     * and change current import type
     *
     * @param {Event} e - HTMLElement
     * @private
     */
    private _onStaticImportTypeChange;
    /**
     * this method is called by event 'click' on 'GPimportGetCapPanelClose' tag form
     * (cf. LayerImportDOM._createImportGetCapPanelHeaderElement),
     * and reset getCapabilities information
     *
     * @private
     */
    private _onGetCapPanelClose;
    /**
     * this method is called by event 'click' on 'GPimportMapBoxPanelClose' tag form
     * (cf. LayerImportDOM._createImportMapBoxPanelHeaderElement),
     * and reset mapbox information
     *
     * @private
     */
    private _onMapBoxPanelClose;
    /**
     * this method is called by event 'click' on 'GPimportPanelReturnPicto' tag form
     * (cf. LayerImportDOM._createImportMapBoxPanelHeaderElement),
     * and return to information
     *
     * @param {Event} e - HTMLElement
     * @private
     */
    private _onReturnPictoClick;
    /**
     * this method is called by event 'submit' on 'GPimportForm' tag form
     * (cf. LayerImportDOM._createImportPanelFormElement),
     * and import static layer or call getCap service (according to import type)
     *
     * @private
     */
    private _onImportSubmit;
    contentService: any;
    /**
     * this method is called by this_onImportSubmit method
     * and import static layer (KML/GPX/GeoJSON) from url or file
     *
     * @private
     */
    private _importStaticLayer;
    /**
     * this method is called by _importStaticLayer method
     * and import static layer (KML/GPX/GeoJSON) from url
     *
     * @param {String} layerName - imported layer name
     * @private
     */
    private _importStaticLayerFromUrl;
    /**
     * this method is called by _importStaticLayer method
     * and import static layer (KML/GPX/GeoJSON) from local file
     *
     * @param {String} layerName - imported layer name
     * @private
     */
    private _importStaticLayerFromLocalFile;
    /**
     * this method is called by _importStaticLayerFom* method
     * and add features to the map
     *
     * @param {String} fileContent - content file
     * @param {String} layerName - imported layer name
     * @private
     */
    private _addFeaturesFromImportStaticLayer;
    /**
     * NOT USE : this method is called by _importStaticLayerFom* method
     * and add features to the map
     *
     * @param {String} url - url
     * @param {String} layerName - imported layer name
     * @private
     */
    private _addFeaturesFromImportStaticLayerUrl;
    /**
     * this method is called when the editor is loaded
     *
     * @param {Object} e - editor
     * @private
     */
    private _onLoadedMapBox;
    /**
     * this method is called on '_addImportMapBoxVisibilitySource' input click
     * and change visibility source to map
     *
     * @param {Event} e - HTMLElement
     * @private
     */
    private _onChangeVisibilitySourceMapBox;
    /**
     * this method is called on '_addImportMapBoxScaleSource' input slide
     * and change zoom source to map
     *
     * @param {Event} e - HTMLElement
     * @private
     */
    private _onChangeScaleMinSourceMapBox;
    /**
     * this method is called on '_addImportMapBoxScaleSource' input slide
     * and change zoom source to map
     *
     * @param {Event} e - HTMLElement
     * @private
     */
    private _onChangeScaleMaxSourceMapBox;
    /**
     * this method is called on ''
     * and change zoom source to map
     *
     * @param {Event} e - HTMLElement
     * @private
     */
    private _onChangeLegendValueSourceMapBox;
    /**
     * this method is called on ''
     * and change zoom source to map
     *
     * @param {Event} e - HTMLElement
     * @private
     */
    private _onDisplayLayerSourceMapBox;
    /**
     * this method is called by this_onImportSubmit method
     * and call getCap service from specified url, then display layers list in new panel
     *
     * @private
     */
    private _importServiceLayers;
    /**
     * this method is called by this._importServiceLayers method
     * and display layers list from getcapabilities response
     *
     * @param {Object} xmlResponse - getCapabilities response (xml format)
     * @private
     */
    private _displayGetCapResponseLayers;
    /**
     * this method is called by this._displayGetCapResponseLayers method
     * and display WMS layer in list from getcapabilities response
     *
     * @param {Object} layerObj - object corresponding to <Layer> content in WMS GetCapabilities response
     * @param {Object} [parentLayersInfos] - object corresponding to parents <Layer> content in WMS GetCapabilities response (without children <Layer> infos)
     * @private
     */
    private _displayGetCapResponseWMSLayer;
    /**
     * this method is called on 'GPimportGetCapProposal' div click
     * and add corresponding layer to map
     *
     * @param {Event} e - HTMLElement
     * @private
     */
    private _onGetCapResponseLayerClick;
    /**
     * this method is called by this._onGetCapResponseLayerClick
     * and add WMS layer to map using parameters from getCapabilities response
     *
     * @param {Object} layerInfo - layer information from getCapabilities response
     * @private
     */
    private _addGetCapWMSLayer;
    /**
     * this method is called by this._addGetCapWMSLayer
     * and gets service getMap request url
     *
     * @returns {String} getmapurl - service getMap request url
     * @private
     */
    private _getWMSLayerGetMapUrl;
    /**
     * this method is called by this._addGetCapWMSLayer
     * and gets a projection both available for a given layer and already defined in proj4js (ol.proj)
     * (openlayers raster reprojection will be then able to reproject layer in map projection)
     *
     * @param {Object} layerInfo - layer information from getCapabilities response
     * @param {String} mapProjCode - map projection code (e.g. "EPSG:4326")
     * @returns {String} projection - ol.proj projection alias (e.g. "EPSG:4326")
     * @private
     */
    private _getWMSLayerProjection;
    /**
     * this method is called by this._addGetCapWMSLayer
     * and sets minResolution and maxResolution parameters for WMS layer (if available in getCapabilities response)
     *
     * @param {Object} layerInfo - layer information from getCapabilities response
     * @param {String} mapProjCode - map projection code (e.g. "EPSG:4326")
     * @param {Object} layerTileOptions - options for ol.layer.Tile (to be filled)
     * @private
     */
    private _getWMSLayerMinMaxResolution;
    /**
     * this method is called by this._addGetCapWMSLayer
     * and sets extent for WMS layer in map projection (if available in getCapabilities response)
     *
     * @param {Object} layerInfo - layer information from getCapabilities response
     * @param {String} mapProjCode - map projection code (e.g. "EPSG:4326")
     * @param {Object} layerTileOptions - options for ol.layer.Tile (to be filled)
     * @private
     */
    private _getWMSLayerExtent;
    /**
     * this method is called by this._addGetCapWMSLayer
     * and sets more information about layer (legends, title, description, metadata, originators) for layerSwitcher or attributions controls
     *
     * @param {Object} layerInfo - layer information from getCapabilities response
     * @param {String} legend - legend url
     * @param {Object} wmsSource - options for ol.source.TileWMS (to be filled)
     * @private
     */
    private _getWMSLayerInfoForLayerSwitcher;
    /**
     * this method is called by this._onGetCapResponseLayerClick
     * and add WMTS layer to map using parameters from getCapabilities response
     *
     * @param {Object} layerInfo - layer information from getCapabilities response
     * @private
     */
    private _addGetCapWMTSLayer;
    /**
     * this method is called by this._addGetCapWMTSLayer
     * and gets service getTile request url
     *
     * @returns {String} gettileurl - service getTile request url
     * @private
     */
    private _getWMTSLayerGetTileUrl;
    /**
     * this method is called by this._displayGetCapResponseLayers
     * and gets layer TileMatrixSet projection if defined in proj4js
     *
     * @param {Object} layerInfo - layer information from getCapabilities response
     * @param {Object} getCapResponseWMTS - whole getCapabilities response
     * @returns {String} projection - ol.proj projection alias (e.g. "EPSG:4326")
     * @private
     */
    private _getWMTSLayerProjection;
    /**
     * this method is called by this._addGetCapWMTSLayer
     * and get ol.tileGrid.WMTS parameters using getCapabilities response
     *
     * @param {Object} layerInfo - layer information from getCapabilities response
     * @returns {Object} tmsOptions - ol.tileGrid.WMTS options
     * @private
     */
    private _getTMSParams;
    /**
     * this method is called by this._addGetCapWMTSLayer
     * and sets extent for WMTS layer in map projection (if available in getCapabilities response)
     *
     * @param {Object} layerInfo - layer information from getCapabilities response
     * @returns {Array} extent - layer extent
     * @private
     */
    private _getWMTSLayerExtent;
    /**
     * gets control map projection code
     *
     * @returns {String} mapProjCode - control map projection code (e.g. "EPSG:3857")
     * @private
     */
    private _getMapProjectionCode;
    /**
     * this method displays waiting container and sets a timeout
     *
     * @private
     */
    private _displayWaitingContainer;
    /**
     * this method hides waiting container and clears timeout
     *
     * @private
     */
    private _hideWaitingContainer;
    /**
     * @private
     */
    private _displayFormContainer;
    /**
     * @private
     */
    private _hideFormContainer;
    /**
     * this method empties getCap results list (DOM element)
     *
     * @private
     */
    private cleanGetCapResultsList;
    /**
     * this method empties MapBox results list (DOM element)
     *
     * @private
     */
    private cleanMapBoxResultsList;
    /**
     * this method empties MapBox results list (DOM element)
     *
     * @param {*} id - DOM id
     * @private
     */
    private cleanMapBoxResults;
}
import Control from "../Control";
import Map from "ol/Map";
import { Style } from "ol/style";
//# sourceMappingURL=LayerImport.d.ts.map