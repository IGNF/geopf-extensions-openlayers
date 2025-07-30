export default LayerSwitcher;
export type LayerSwitcherOptions = {
    /**
     * - Identifiant unique du widget.
     */
    id?: string | undefined;
    /**
     * - Définit si le widget est replié au chargement.
     */
    collapsed?: boolean | undefined;
    /**
     * - Permet de déplacer le panneau du LayerSwitcher.
     */
    draggable?: boolean | undefined;
    /**
     * - Affiche un compteur du nombre de couches visibles.
     */
    counter?: boolean | undefined;
    /**
     * - Affiche un en-tête (header) dans le panneau du LayerSwitcher.
     */
    panel?: boolean | undefined;
    /**
     * - Ajoute ou retire l’espace autour du panneau.
     */
    gutter?: boolean | undefined;
    /**
     * - Affiche le bouton d’édition pour les couches éditables (vecteur).
     */
    allowEdit?: boolean | undefined;
    /**
     * - Affiche le bouton N&B (niveaux de gris) pour les couches compatibles.
     */
    allowGrayScale?: boolean | undefined;
    /**
     * - Active l’affichage des info-bulles (tooltips) sur les éléments du widget.
     */
    allowTooltips?: boolean | undefined;
    /**
     * - Position CSS du widget sur la carte.
     */
    position?: string | undefined;
    /**
     * - Liste d’outils personnalisés à afficher pour chaque couche.
     */
    advancedTools?: any[] | undefined;
};
export type LayerSwitcherLayersConfig = {
    /**
     * - Objet couche OpenLayers à gérer.
     */
    layer: Layer;
    /**
     * - Métadonnées associées à la couche.
     */
    config?: {
        /**
         * - Titre de la couche.
         */
        title?: string | undefined;
        /**
         * - Description de la couche.
         */
        description?: string | undefined;
        /**
         * - URL d’aperçu rapide.
         */
        quicklookUrl?: string | undefined;
        /**
         * - Légendes associées à la couche.
         */
        legends?: any[] | undefined;
        /**
         * - Métadonnées associées à la couche.
         */
        metadata?: any[] | undefined;
        /**
         * - Indique si la couche est verrouillée.
         */
        locked?: boolean | undefined;
    } | undefined;
};
/**
 * @typedef {Object} LayerSwitcherOptions
 * @property {string} [id] - Identifiant unique du widget.
 * @property {boolean} [collapsed=true] - Définit si le widget est replié au chargement.
 * @property {boolean} [draggable=false] - Permet de déplacer le panneau du LayerSwitcher.
 * @property {boolean} [counter=false] - Affiche un compteur du nombre de couches visibles.
 * @property {boolean} [panel=false] - Affiche un en-tête (header) dans le panneau du LayerSwitcher.
 * @property {boolean} [gutter=false] - Ajoute ou retire l’espace autour du panneau.
 * @property {boolean} [allowEdit=true] - Affiche le bouton d’édition pour les couches éditables (vecteur).
 * @property {boolean} [allowGrayScale=true] - Affiche le bouton N&B (niveaux de gris) pour les couches compatibles.
 * @property {boolean} [allowTooltips=false] - Active l’affichage des info-bulles (tooltips) sur les éléments du widget.
 * @property {string} [position] - Position CSS du widget sur la carte.
 * @property {Array<Object>} [advancedTools] - Liste d’outils personnalisés à afficher pour chaque couche.
 */
/**
 * @typedef {Object} LayerSwitcherLayersConfig
 * @property {Layer} layer - Objet couche OpenLayers à gérer.
 * @property {Object} [config] - Métadonnées associées à la couche.
 * @property {string} [config.title] - Titre de la couche.
 * @property {string} [config.description] - Description de la couche.
 * @property {string} [config.quicklookUrl] - URL d’aperçu rapide.
 * @property {Array<Object>} [config.legends] - Légendes associées à la couche.
 * @property {Array<Object>} [config.metadata] - Métadonnées associées à la couche.
 * @property {boolean} [config.locked] - Indique si la couche est verrouillée.
 */
/**
 * @classdesc
 * OpenLayers Control to manage map layers : their order, visibility and opacity, and display their informations (title, description, legends, metadata...)
 *
 * @module LayerSwitcher
 * @alias ol.control.LayerSwitcher
 */
declare class LayerSwitcher extends Control {
    /**
    * @constructor
    * @param {Object} options - control options
    * @param {Array<LayerSwitcherLayersConfig>} [options.layers] - list of layers to be configured. Each array element is an object, with following properties :
    * @param {LayerSwitcherOptions} [options.options] - ol.control.Control options (see {@link http://openlayers.org/en/latest/apidoc/ol.control.Control.html ol.control.Control})
    * @fires layerswitcher:add
    * @fires layerswitcher:remove
    * @fires layerswitcher:lock
    * @fires layerswitcher:extent
    * @fires layerswitcher:edit
    * @fires layerswitcher:change:opacity
    * @fires layerswitcher:change:visibility
    * @fires layerswitcher:change:position
    * @fires layerswitcher:change:grayscale
    * @fires layerswitcher:change:style
    * @fires layerswitcher:change:locked
    * @example
    * map.addControl(new ol.control.LayerSwitcher(
    *  [
    *      {
    *          layer : wms1,
    *          config : {
    *              title : "test layer name 1",
    *              description : "test layer desc 1",
    *          }
    *      }
    *  ],
    *  {
    *      collapsed : true,
    *      panel : false,
    *      counter : false,
    *      position : "top-left",
    *      allowEdit : true,
    *      allowGrayScale : true,
    *      advancedTools : [
    *          {
    *              label = 'Bouton',
    *              icon = "svg | http",
    *              cb = (e, LayerSwitcher, layer, options) => {},
    *              styles = {},
    *          }
    *      ]
    *  }
    * ));
    *
    * LayerSwitcher.on("layerswitcher:add", function (e) {
    *    console.warn("layer", e.layer);
    * });
    * LayerSwitcher.on("layerswitcher:remove", function (e) {
    *    console.warn("layer", e.layer);
    * });
    * LayerSwitcher.on("layerswitcher:extent", function (e) {
    *    console.warn("layer", e.layer);
    * });
    * LayerSwitcher.on("layerswitcher:edit", function (e) {
    *    console.warn("layer", e.layer);
    * });
    * LayerSwitcher.on("layerswitcher:change:opacity", function (e) {
    *    console.warn("layer", e.layer, e.opacity);
    * });
    * LayerSwitcher.on("layerswitcher:change:visibility", function (e) {
    *    console.warn("layer", e.layer, e.visibility);
    * });
    * LayerSwitcher.on("layerswitcher:change:position", function (e) {
    *    console.warn("layer", e.layer, e.position);
    * });
    * LayerSwitcher.on("layerswitcher:change:grayscale", function (e) {
    *    console.warn("layer", e.layer, e.grayscale);
    * });
    * LayerSwitcher.on("layerswitcher:change:style", function (e) {
    *    console.warn("layer", e.layer, e.name, e.url);
    * });
    * LayerSwitcher.on("layerswitcher:change:locked", function (e) {
    *    console.warn("layer", e.layer, e.locked);
    * });
    */
    constructor(options: {
        layers?: LayerSwitcherLayersConfig[] | undefined;
        options?: LayerSwitcherOptions | undefined;
    });
    /**
     * Nom de la classe
     * @private
     */
    private CLASSNAME;
    container: HTMLElement;
    /**
     * Overload setMap function, that enables to catch map events, such as movend events.
     * @inheritdoc {@link https://openlayers.org/en/latest/apidoc/module-ol_control_Control-Control.html#setMap}
     * @param {Map} map - Map.
     */
    setMap(map: Map): void;
    /**
     * Add a new layer to control (when added to map) or add new layer configuration
     *
     * @param {Layer} layer - layer to add to layer switcher
     * @param {Object} [config] - additional options for layer configuration
     * @param {Object} [config.title] - layer title (default is layer identifier)
     * @param {Object} [config.description] - layer description (default is null)
     * @param {Object} [config.legends] - layer legends (default is an empty array)
     * @param {Object} [config.metadata] - layer metadata (default is an empty array)
     * @param {Object} [config.quicklookUrl] - layer quicklookUrl (default is null)
     * @fires layerswitcher:add {@link LayerSwitcher#ADD_LAYER_EVENT}
     * @example
     *   layerSwitcher.addLayer(
     *       gpParcels,
     *       {
     *           title : "Parcelles cadastrales",
     *           description : "description de la couche",
     *           quicklookUrl : "http://quicklookUrl.fr"
     *       }
     *   )
     */
    addLayer(layer: Layer, config?: {
        title?: any;
        description?: any;
        legends?: any;
        metadata?: any;
        quicklookUrl?: any;
    }): void;
    /**
     * Remove a layer from control
     *
     * @param {Layer} layer - layer.
     * @fires layerswitcher:remove {@link LayerSwitcher#REMOVE_LAYER_EVENT}
     * @deprecated on the future version ...
     */
    removeLayer(layer: Layer): void;
    /**
     * Lock a layer, so it cannot be removed or modified from layerSwitcher
     * @param {Layer} layer - layer to be locked
     * @param {Boolean} locked - true if locked
     * @fires layerswitcher:lock {@link LayerSwitcher#LOCK_LAYER_EVENT}
     */
    lockLayer(layer: Layer, locked: boolean): void;
    /**
     * Collapse or display control main container
     *
     * @param {Boolean} collapsed - True to collapse control, False to display it
     */
    setCollapsed(collapsed: boolean): void;
    /**
     * Returns true if widget is collapsed (minimize), false otherwise
     * @returns {Boolean} is collapsed
     */
    getCollapsed(): boolean;
    /**
     * Display or hide removeLayerPicto from layerSwitcher for this layer
     *
     * @param {Layer} layer - ol.layer to be configured
     * @param {Boolean} removable - specify if layer can be remove from layerSwitcher (true) or not (false). Default is true
     */
    setRemovable(layer: Layer, removable: boolean): void;
    /**
     * Get container
     *
     * @returns {HTMLElement} container
     */
    getContainer(): HTMLElement;
    /**
     * Forget add listener added to the control
     */
    forget(): void;
    /**
     * Add listeners to catch map layers addition
     */
    listen(): void;
    /**
     * Initialize LayerSwitcher control (called by constructor)
     *
     * @param {Object} options - ol.control.Control options (see {@link http://openlayers.org/en/latest/apidoc/ol.control.Control.html ol.control.Control})
     * @param {Array} layers - list of layers to be configured. Each array element is an object, with following properties :
     * @private
     */
    private _initialize;
    options: {
        id: string;
        collapsed: boolean;
        draggable: boolean;
        counter: boolean;
        panel: boolean;
        gutter: boolean;
        allowEdit: boolean;
        allowGrayScale: boolean;
        allowTooltips: boolean;
        advancedTools: never[];
    } | undefined;
    /**
     * identifiant du contrôle
     * utile pour suffixer les identifiants CSS
     * (pour gérer le cas où il y en a plusieurs dans la même page)
     * @type {String}
     * @private
     */
    private _uid;
    /**
     * Control layers list.
     * ach key is a layer id, and its value is an object of layers options (layer, id, opacity, visibility, title, description...)
     * @type {Object}
     * @private
     */
    private _layers;
    /**
     * array of ordered control layers
     * @type {Array}
     * @private
     */
    private _layersOrder;
    /**
     * associative array of layers ordered by zindex (keys are zindex values, and corresponding values are arrays of layers at this zindex)
     * @type {Object}
     * @private
     */
    private _layersIndex;
    /**
     * layers max z index, to order layers using their z index
     * @type {Number}
     * @private
     */
    private _lastZIndex;
    /**
     * layers max id, incremented when a new layer is added
     * @type {Number}
     * @private
     */
    private _layerId;
    /**
     * collapse mode
     * true if widget is collapsed, false otherwise
     */
    collapsed: boolean | undefined;
    /**
     * Layer list (DOM).
     * @type {HTMLElement}
     * @private
     */
    private _layerListContainer;
    /**
     * listeners added to the layerSwitcher saved here in order to delete them if we remove the control from the map)
     * @type {Object}
     * @private
     */
    private _listeners;
    /**
     * counter of layers in layerSwitcher control
     * @private
     */
    private _layerSwitcherCounter;
    /**
     * button to show/hide layerSwitcher control
     * @private
     */
    private _showLayerSwitcherButton;
    /**
     * event triggered when a layer is added
     * @event layerswitcher:add
     * @defaultValue "layerswitcher:add"
     * @group Events
     * @param {Object} type - event
     * @param {Object} layer - layer
     * @param {Object} target - instance LayerSwitcher
     * @public
     * @example
     * LayerSwitcher.on("layerswitcher:add", function (e) {
     *   console.log(e.layer);
     * })
     */
    public ADD_LAYER_EVENT: string | undefined;
    /**
     * event triggered when a layer is removed
     * @event layerswitcher:remove
     * @defaultValue "layerswitcher:remove"
     * @group Events
     * @param {Object} type - event
     * @param {Object} layer - layer
     * @param {Object} target - instance LayerSwitcher
     * @public
     * @example
     * LayerSwitcher.on("layerswitcher:remove", function (e) {
     *   console.log(e.layer);
     * })
     */
    public REMOVE_LAYER_EVENT: string | undefined;
    /**
     * event triggered when a layer is locked
     * @event layerswitcher:lock
     * @defaultValue "layerswitcher:lock"
     * @group Events
     * @param {Object} type - event
     * @param {Object} layer - layer
     * @param {Object} target - instance LayerSwitcher
     * @public
     * @example
     * LayerSwitcher.on("layerswitcher:lock", function (e) {
     *   console.log(e.layer);
     * })
     */
    public LOCK_LAYER_EVENT: string | undefined;
    /**
     * event triggered when a layer extent is changed
     * @event layerswitcher:extent
     * @defaultValue "layerswitcher:extent"
     * @group Events
     * @param {Object} extent - extent (map projection)
     * @param {Object} layer - layer
     * @param {String} error - error
     * @param {Object} target - instance LayerSwitcher
     * @public
     * @example
     * LayerSwitcher.on("layerswitcher:extent", function (e) {
     *   console.log(e.layer);
     * })
     */
    public EXTENT_LAYER_EVENT: string | undefined;
    /**
     * event triggered when a layer is edited
     * @event layerswitcher:edit
     * @defaultValue "layerswitcher:edit"
     * @group Events
     * @param {Object} type - event
     * @param {Object} layer - layer
     * @param {Object} options - layer options
     * @param {Object} target - instance LayerSwitcher
     * @public
     * @example
     * LayerSwitcher.on("layerswitcher:edit", function (e) {
     *   console.log(e.layer);
     * })
     */
    public EDIT_LAYER_EVENT: string | undefined;
    /**
     * event triggered when a custom action is called
     * @event layerswitcher:custom
     * @defaultValue "layerswitcher:custom"
     * @group Events
     * @param {Object} type - event
     * @param {String} action - label name
     * @param {Object} layer - layer
     * @param {Object} options - layer options
     * @param {Object} target - instance LayerSwitcher
     * @public
     * @example
     * LayerSwitcher.on("layerswitcher:custom", function (e) {
     *   console.log(e.layer);
     * })
     */
    public CUSTOM_LAYER_EVENT: string | undefined;
    /**
     * event triggered when a layer opacity is changed
     * @event layerswitcher:change:opacity
     * @defaultValue "layerswitcher:change:opacity"
     * @group Events
     * @param {Object} type - event
     * @param {Object} layer - layer
     * @param {Object} opacity - new opacity value
     * @param {Object} target - instance LayerSwitcher
     * @public
     * @example
     * LayerSwitcher.on("layerswitcher:change:opacity", function (e) {
     *   console.log(e.layer, e.opacity);
     * })
     */
    public CHANGE_LAYER_OPACITY_EVENT: string | undefined;
    /**
     * event triggered when a layer visibility is changed
     * @event layerswitcher:change:visibility
     * @defaultValue "layerswitcher:change:visibility"
     * @group Events
     * @param {Object} type - event
     * @param {Object} layer - layer
     * @param {Object} visibility - new visibility value
     * @param {Object} target - instance LayerSwitcher
     * @public
     * @example
     * LayerSwitcher.on("layerswitcher:change:visibility", function (e) {
     *   console.log(e.layer, e.visibility);
     * })
     */
    public CHANGE_LAYER_VISIBILITY_EVENT: string | undefined;
    /**
     * event triggered when a layer grayscale is changed
     * @event layerswitcher:change:grayscale
     * @defaultValue "layerswitcher:change:grayscale"
     * @group Events
     * @param {Object} type - event
     * @param {Object} layer - layer
     * @param {Object} grayscale - new grayscale value
     * @param {Object} target - instance LayerSwitcher
     * @public
     * @example
     * LayerSwitcher.on("layerswitcher:change:grayscale", function (e) {
     *   console.log(e.layer, e.grayscale);
     * })
     */
    public CHANGE_LAYER_GRAYSCALE_EVENT: string | undefined;
    /**
     * event triggered when a layer is locked or unlocked
     * @event layerswitcher:change:locked
     * @defaultValue "layerswitcher:change:locked"
     * @group Events
     * @param {Object} type - event
     * @param {Object} layer - layer
     * @param {Object} locked - new locked value
     * @param {Object} target - instance LayerSwitcher
     * @public
     * @example
     * LayerSwitcher.on("layerswitcher:change:locked", function (e) {
     *   console.log(e.layer, e.locked);
     * })
     */
    public CHANGE_LAYER_LOCKED_EVENT: string | undefined;
    /**
     * Create control main container (called by constructor)
     *
     * @returns {HTMLElement} container - control container
     * @private
     */
    private _initContainer;
    /**
     * Add all map layers to control main container
     *
     * @param {Map} map - Map object, to which control is added
     * @private
     */
    private _addMapLayers;
    /**
     * create layer div (to append to control DOM element).
     *
     * @param {Object} layerOptions - layer options (id, title, description, legends, metadata, quicklookUrl ...)
     *
     * @returns {HTMLElement} DOM element
     *
     * @private
     */
    private _createLayerDiv;
    /**
     * ...
     *
     * @method onShowLayerSwitcherClick
     * @param { event } e évènement associé au clic
     * @private
     */
    private onShowLayerSwitcherClick;
    /**
     * update layer counter
     * @private
     */
    private _updateLayerCounter;
    /**
     * Change layer opacity on layer opacity picto click
     *
     * @param {Object} e - event
     * @private
     */
    private _onChangeLayerOpacity;
    /**
     * Update picto opacity value on layer opacity change
     *
     * @param {Object} e - event
     * @fires layerswitcher:change:opacity {@link LayerSwitcher#CHANGE_LAYER_OPACITY_EVENT}
     * @private
     */
    private _updateLayerOpacity;
    /**
     * Change layer visibility on layer visibility picto click
     *
     * @param {Object} e - event
     * @private
     */
    private _onVisibilityLayerClick;
    /**
     * Change picto visibility on layer visibility change
     *
     * @param {Object} e - event
     * @fires layerswitcher:change:visibility {@link LayerSwitcher#CHANGE_LAYER_VISIBILITY_EVENT}
     * @private
     */
    private _updateLayerVisibility;
    /**
     * Change layer style on mapbox layer dialog
     *
     * @param {Object} e - event
     * @private
     */
    private _onChangeStyleLayerClick;
    /**
     * Change layers order in layerswitcher (control container) on a layer index change (on map) or when a layer is added to a specific zindex
     * @todo fires layerswitcher:change:zindex
     * @private
     */
    private _updateLayersOrder;
    /**
     * Open layer information panel on picto click
     *
     * @param {Event} e - MouseEvent
     * @private
     */
    private _onOpenLayerInfoClick;
    /**
     * Open layer style select panel on picto click
     *
     * @param {Event} e - MouseEvent
     * @param {Array} styles - List of styles
     * @private
     */
    private _onEditLayerStyleClick;
    /**
     * remove layer from layer switcher and map on picto click
     *
     * @param {Event} e - MouseEvent
     * @private
     */
    private _onDropLayerClick;
    /**
     * edit layer
     *
     * @param {Event} e - MouseEvent
     * @fires layerswitcher:edit {@link LayerSwitcher#EDIT_LAYER_EVENT}
     * @private
     */
    private _onEditLayerClick;
    /**
     * change layers order (on map) on drag and drop (on control container)
     *
     * @param {Event} e - CustomEvent
     * @private
     */
    private _onEndDragAndDropLayerClick;
    /**
     * change layers order (on map) on drag and drop (on control container)
     *
     * @param {Event} e - DragNDrop Event
     * @private
     */
    private _onStartDragAndDropLayerClick;
    /**
     * update greyscale
     * @param {Event} e - Event
     * @fires layerswitcher:change:grayscale {@link LayerSwitcher#CHANGE_LAYER_GRAYSCALE_EVENT}
     * @private
     */
    private _updateLayerGrayScale;
    /**
     * toggle greyscale layer
     * @param {Event} e - Event
     * @private
     */
    private _onToggleLayerGreyscaleClick;
    /**
     * update locked layer
     * @param {Event} e - Event
     * @fires layerswitcher:change:locked {@link LayerSwitcher#CHANGE_LAYER_LOCKED_EVENT}
     * @private
     */
    private _updateLayerLocked;
    /**
     * toggle locked layer
     * @param {Event} e - Event
     * @private
     */
    private _onToggleLayerLockedClick;
    /**
     * zoom to extent
     * @fixme dot it for other user data
     * @param {PointerEvent} e - Event
     * @fires layerswitcher:extent
     * @private
     */
    private _onZoomToExtentClick;
    /**
     * Action utilisateur
     * @param {PointerEvent} e - Event
     * @param {String} action - le nom du bouton (label)
     * @param {Function} cb - callback definie par l'utilisateur
     * @private
     */
    private _onClickAdvancedToolsMore;
    /**
     * check layers range on map movement
     *
     * @param {Map} map - map on which event occured
     * @private
     */
    private _onMapMoveEnd;
    /**
     * Returns Layer Container Id associated with given olLayer
     *
     * @param {Layer} olLayer - ol layer object
     * @returns {String} - div container Id ; null if layer not found.
     * @private
     */
    private getLayerDOMId;
    /**
     * Check if map view is out of layer range (in terms of extent and zoom)
     *
     * @param {Layer} layer - the Layer object
     * @param {Map} map   - the Map object
     * @returns {Boolean} outOfRange - false if map view is out of layer range
     */
    isInRange(layer: Layer, map: Map): boolean;
    /**
     * Get layer informations : title, description, quicklookurl, legends, metadata
     *
     * @param {Layer} layer - the ol.layer object
     * @returns {Object} layerInfo - layer informations
     */
    getLayerInfo(layer: Layer): any;
}
import Layer from "ol/layer/Layer";
import Control from "../Control";
import Map from "ol/Map";
//# sourceMappingURL=LayerSwitcher.d.ts.map