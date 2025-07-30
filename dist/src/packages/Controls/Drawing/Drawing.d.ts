export default Drawing;
export type DrawingOptions = {
    /**
     * - Identifiant unique du widget.
     */
    id?: string | number | undefined;
    /**
     * - Définit si le widget est replié au démarrage.
     */
    collapsed?: boolean | undefined;
    /**
     * - Permet de déplacer le panneau du widget.
     */
    draggable?: boolean | undefined;
    /**
     * - Couche vecteur OpenLayers pour héberger les objets dessinés.
     */
    layer?: ol.layer.Vector;
    /**
     * - Options de la popup d’édition.
     */
    popup?: {
        /**
         * - Affiche la popup à la création d’un dessin.
         */
        display?: boolean | undefined;
        /**
         * - Fonction personnalisée pour afficher la popup.
         */
        function?: Function | undefined;
    } | undefined;
    /**
     * - Métadonnées pour le LayerSwitcher.
     */
    layerDescription?: {
        /**
         * - Titre de la couche de dessin.
         */
        title?: string | undefined;
        /**
         * - Description de la couche de dessin.
         */
        description?: string | undefined;
    } | undefined;
    /**
     * - Outils à afficher dans la barre d’outils.
     */
    tools?: {
        /**
         * - Outil point.
         */
        points?: boolean | undefined;
        /**
         * - Outil ligne.
         */
        lines?: boolean | undefined;
        /**
         * - Outil polygone.
         */
        polygons?: boolean | undefined;
        /**
         * - Outil polygone avec trous.
         */
        holes?: boolean | undefined;
        /**
         * - Outil texte.
         */
        text?: boolean | undefined;
        /**
         * - Outil suppression.
         */
        remove?: boolean | undefined;
        /**
         * - Outil style.
         */
        display?: boolean | undefined;
        /**
         * - Outil info-bulle.
         */
        tooltip?: boolean | undefined;
        /**
         * - Outil édition.
         */
        edit?: boolean | undefined;
        /**
         * - Outil export.
         */
        export?: boolean | undefined;
        /**
         * - Outil mesure.
         */
        measure?: boolean | undefined;
    } | undefined;
    /**
     * - Libellés personnalisés pour les outils et le contrôle.
     */
    labels?: any;
    /**
     * - Liste des marqueurs personnalisés (src, anchor, etc.).
     */
    markersList?: any[] | undefined;
    /**
     * - Styles par défaut pour les objets dessinés.
     */
    defaultStyles?: any;
    /**
     * - Style du curseur lors du dessin.
     */
    cursorStyle?: any;
    /**
     * - Position CSS du widget sur la carte.
     */
    position?: string | undefined;
    /**
     * - Ajoute ou retire l’espace autour du panneau.
     */
    gutter?: boolean | undefined;
};
/**
 * @typedef {Object} DrawingOptions
 * @property {string|number} [id] - Identifiant unique du widget.
 * @property {boolean} [collapsed=true] - Définit si le widget est replié au démarrage.
 * @property {boolean} [draggable=false] - Permet de déplacer le panneau du widget.
 * @property {ol.layer.Vector} [layer] - Couche vecteur OpenLayers pour héberger les objets dessinés.
 * @property {Object} [popup] - Options de la popup d’édition.
 * @property {boolean} [popup.display=true] - Affiche la popup à la création d’un dessin.
 * @property {Function} [popup.function] - Fonction personnalisée pour afficher la popup.
 * @property {Object} [layerDescription] - Métadonnées pour le LayerSwitcher.
 * @property {string} [layerDescription.title="Croquis"] - Titre de la couche de dessin.
 * @property {string} [layerDescription.description="Mon croquis"] - Description de la couche de dessin.
 * @property {Object} [tools] - Outils à afficher dans la barre d’outils.
 * @property {boolean} [tools.points=true] - Outil point.
 * @property {boolean} [tools.lines=true] - Outil ligne.
 * @property {boolean} [tools.polygons=true] - Outil polygone.
 * @property {boolean} [tools.holes=false] - Outil polygone avec trous.
 * @property {boolean} [tools.text=true] - Outil texte.
 * @property {boolean} [tools.remove=true] - Outil suppression.
 * @property {boolean} [tools.display=true] - Outil style.
 * @property {boolean} [tools.tooltip=true] - Outil info-bulle.
 * @property {boolean} [tools.edit=true] - Outil édition.
 * @property {boolean} [tools.export=true] - Outil export.
 * @property {boolean} [tools.measure=false] - Outil mesure.
 * @property {Object} [labels] - Libellés personnalisés pour les outils et le contrôle.
 * @property {Array<Object>} [markersList] - Liste des marqueurs personnalisés (src, anchor, etc.).
 * @property {Object} [defaultStyles] - Styles par défaut pour les objets dessinés.
 * @property {Object} [cursorStyle] - Style du curseur lors du dessin.
 * @property {string} [position] - Position CSS du widget sur la carte.
 * @property {boolean} [gutter] - Ajoute ou retire l’espace autour du panneau.
 */
/**
 * @classdesc
 *
 * Drawing Control.
 *
 * @alias ol.control.Drawing
 * @module Drawing
 *
 */
declare class Drawing extends Control {
    /**
     * Default tools to display for widget
     *
     * @private
     */
    private static DefaultTools;
    /**
     * Default labels for widget
     *
     * @private
     */
    private static DefaultLabels;
    /**
     * Default styles applyied to drawn features.
     *
     * @private
     */
    private static DefaultStyles;
    /**
     * Default styles when drawing
     *
     * @private
     */
    private static DefaultCursorStyle;
    /**
     * @constructor
    * @param {Object} options - options for function call.
    * @param {Number} [options.id] - Ability to add an identifier on the widget (advanced option)
    * @param {Boolean} [options.collapsed = true] - Specify if Drawing control should be collapsed at startup. Default is true.
    * @param {Boolean} [options.draggable = false] - Specify if widget is draggable
    * @param {Object} [options.layer = {}] - Openlayers layer that will hosts created features. If none, an empty vector layer will be created.
    * @param {Object} [options.popup = {}] - Popup informations
    * @param {Boolean} [options.popup.display = true] - Specify if popup is displayed when create a drawing
    * @param {Function} [options.popup.function] - Function to display popup informations if you want to cutomise it. You may also provide your own function with params : {geomType / feature / saveFunc(message) / closeFunc()}. This function must return the DOM object of the popup content.
    * @param {Object} [options.layerDescription = {}] - Layer informations to be displayed in LayerSwitcher widget (only if a LayerSwitcher is also added to the map)
    * @param {String} [options.layerDescription.title = "Croquis"] - Layer title to be displayed in LayerSwitcher
    * @param {String} [options.layerDescription.description = "Mon croquis"] - Layer description to be displayed in LayerSwitcher
    * @param {Object} options.tools - Tools to display in the drawing toolbox. All by default.
    * @param {Boolean} [options.tools.points = true] - Display points drawing tool
    * @param {Boolean} [options.tools.lines = true] - Display lines drawing tool
    * @param {Boolean} [options.tools.polygons = true] - Display polygons drawing tool
    * @param {Boolean} [options.tools.holes = false] - Display polygons with holes drawing tool
    * @param {Boolean} [options.tools.text = true] - Display text drawing tool
    * @param {Boolean} [options.tools.remove = true] - Display feature removing tool
    * @param {Boolean} [options.tools.display = true] - Display style editing tool
    * @param {Boolean} [options.tools.tooltip = true] - Display text editing tool
    * @param {Boolean} [options.tools.edit = true] - Display editing tool
    * @param {Boolean} [options.tools.export = true] - Display exporting tool
    * @param {Boolean} [options.tools.measure = false] - Display measure drawing into popup info
    * @param {String} [options.labels] - Labels for Control
    * @param {String} [options.labels.control] - Label for Control
    * @param {String} [options.labels.points] - Label for points drawing tool
    * @param {String} [options.labels.lines] - Label for lines drawing tool
    * @param {String} [options.labels.polygons] - Label for polygons drawing tool
    * @param {String} [options.labels.holes] - Label for polygons with holes drawing tool
    * @param {String} [options.labels.text] - Label for text drawing tool
    * @param {String} [options.labels.edit] - Label for editing tool
    * @param {String} [options.labels.display] - Label for style editing tool
    * @param {String} [options.labels.tooltip] - Label for text editing tool
    * @param {String} [options.labels.remove] - Label for feature removing tool
    * @param {String} [options.labels.export] - Label for exporting tool.
    * @param {String} [options.labels.exportTitle] - Title for exporting tool.
    * @param {String} [options.labels.applyToObject] - Label for apply to object button.
    * @param {String} [options.labels.saveDescription] - Label for save description button.
    * @param {String} [options.labels.setAsDefault] - Label for set as default style button.
    * @param {String} [options.labels.strokeColor] - Label for stroke color.
    * @param {String} [options.labels.strokeWidth] - Label for stroke width.
    * @param {String} [options.labels.fillColor] - Label for fill color.
    * @param {String} [options.labels.fillOpacity] - Label for fillOpacity.
    * @param {String} [options.labels.markerSize] - Label for markerSize.
    * @param {Array.<Object>} [options.markersList = [{"src" : "data:image/png;base64,xxxx", "anchor" : [0.5,1]}]] - List of markers src to be used for points with their anchor offsets See {@link http://openlayers.org/en/latest/apidoc/ol.style.Icon.html OpenLayers params} for anchor offset options.
    * @param {Object} options.defaultStyles - Default styles applying to geometries (labels, lines and polygons).
    * @param {String} [options.defaultStyles.textFillColor = "#000000"] - Text fill color for labels (RGB hex value).
    * @param {String} [options.defaultStyles.textStrokeColor = "#ffffff"] - Text surrounding color for labels (RGB hex value).
    * @param {String} [options.defaultStyles.strokeColor = "#ffcc33"] - Stroke color (RGB hex value).
    * @param {Number} [options.defaultStyles.strokeWidth = 2] - Stroke width in pixels.
    * @param {String} [options.defaultStyles.polyStrokeColor = "#ffcc33"] - Stroke color (RGB hex value) for polygons.
    * @param {Number} [options.defaultStyles.polyStrokeWidth = 2] - Stroke width in pixels for polygons.
    * @param {String} [options.defaultStyles.polyFillColor = "#ffffff"] - Polygons fill color (RGB hex value).
    * @param {Number} [options.defaultStyles.polyFillOpacity = 0.2] - Polygon fill opacity (alpha value between 0:transparent and 1:opaque).
    * @param {Object} options.cursorStyle - cursor (circle) style when drawing or editing.
    * @param {String} [options.cursorStyle.fillColor = "rgba(0, 153, 255, 1)"] - Cursor fill color.
    * @param {String} [options.cursorStyle.strokeColor = "#ffffff"] - Cursor stroke color.
    * @param {String} [options.cursorStyle.strokeWidth = 1] - Cursor surrounding stroke width.
    * @param {String} [options.cursorStyle.radius = 6] - Cursor radius.
    * @fires drawing:add:before - event triggered before an layer is added
    * @fires drawing:add:after - event triggered after an layer is added
    * @example
    * var drawing = new ol.control.Drawing({
    *   collapsed : false,
    *   draggable : true,
    *   layerswitcher : {
    *      title : "Dessins",
    *      description : "Mes dessins..."
    *   },
    *   markersList : [{
    *      src : "http://api.ign.fr/api/images/api/markers/marker_01.png",
    *      anchor : [0.5, 1]
    *   }],
    *   defaultStyles : {},
    *   cursorStyle : {},
    *   tools : {
    *      points : true,
    *      lines : true,
    *      polygons :true,
    *      holes : true,
    *      text : false,
    *      remove : true,
    *      display : true,
    *      tooltip : true,
    *      export : true,
    *      measure : true
    *   },
    *   popup : {
    *      display : true,
    *      function : function (params) {
    *          var container = document.createElement("div");
    *          // - params.geomType;
    *          // - params.feature;
    *          // Les 2 fonctions ferment la popup avec ou sans sauvegarde des informations
    *          // dans les properties de la feature (key : description)
    *          // - params.saveFunc(message);
    *          // - params.closeFunc();
    *          return container;
    *      }
    * });
     */
    constructor(options: {
        id?: number | undefined;
        collapsed?: boolean | undefined;
        draggable?: boolean | undefined;
        layer?: any;
        popup?: {
            display?: boolean | undefined;
            function?: Function | undefined;
        } | undefined;
        layerDescription?: {
            title?: string | undefined;
            description?: string | undefined;
        } | undefined;
        tools: {
            points?: boolean | undefined;
            lines?: boolean | undefined;
            polygons?: boolean | undefined;
            holes?: boolean | undefined;
            text?: boolean | undefined;
            remove?: boolean | undefined;
            display?: boolean | undefined;
            tooltip?: boolean | undefined;
            edit?: boolean | undefined;
            export?: boolean | undefined;
            measure?: boolean | undefined;
        };
        labels?: string | undefined;
    });
    /**
     * Nom de la classe (heritage)
     * @private
     */
    private CLASSNAME;
    _container: HTMLElement;
    /**
     * Overload of {@link http://openlayers.org/en/latest/apidoc/ol.control.Control.html#setMap ol.control.Control.setMap()} method, called when control is added to or removed from map.
     *
     * @param {Map} map - {@link http://openlayers.org/en/latest/apidoc/ol.Map.html ol.Map} object.
     */
    setMap(map: Map): void;
    eventKey: import("ol/events").EventsKey | undefined;
    layer: any;
    interactionCurrent: SelectInteraction | null | undefined;
    /**
     * Export features of current drawing layer (KML by default).
     *
     * @returns {String} a representation of drawn features (KML, GPX or GeoJSON) or null if not possible.
     */
    exportFeatures(): string;
    /**
     * Collapse or display control main container
     *
     * @param {Boolean} collapsed - True to collapse control, False to display it
     */
    setCollapsed(collapsed: boolean): void;
    /**
     * Setter for Export Name.
     *
     * @param {String} name - Export Name. By default, "Croquis".
     */
    setExportName(name: string): void;
    _exportName: string | undefined;
    /**
     * getter for Export Name.
     *
     * @returns {String} export name
     */
    getExportName(): string;
    /**
     * Setter for Export format (KML, GPX or GeoJSON).
     *
     * @param {String} format - Export format. By default, "KML".
     */
    setExportFormat(format: string): void;
    _exportFormat: string | undefined;
    _exportExt: string | undefined;
    _exportMimeType: string | undefined;
    /**
     * getter for Export format.
     *
     * @returns {String} export format
     */
    getExportFormat(): string;
    /**
     * Sets vector layer to hosts feature.
     *
     * @param {VectorLayer} vlayer - vector layer
     */
    setLayer(vlayer: VectorLayer): void;
    /**
     * Get vector layer
     *
     * @returns {VectorLayer} layer - isocurve layer
     */
    getLayer(): VectorLayer;
    /**
     * Get container
     *
     * @returns {HTMLElement} container
     */
    getContainer(): HTMLElement;
    /** Disable interaction */
    disable(): void;
    /**
     * Gets marker options in options.markersList given its src.
     *
     * @param {String} src - marker image URI,
     * @returns {Object} markers options
     * @private
     */
    private _getsMarkersOptionsFromSrc;
    /**
     * Converts markerElement options into Openlayers IconStyles options.
     *
     * @param {Object} markerElement - marker element
     * @returns {Object} ol.Style.Icon constructor options.
     * @private
     */
    private _getIconStyleOptions;
    /**
     * Initialize control (called by Drawing constructor)
     *
     * @method _initialize
     * @param {Object} options - control options (set by user)
     * @private
     */
    private _initialize;
    /** @private */
    private _uid;
    options: any;
    /**
     * @type {Boolean}
     * specify if Drawing control is collapsed (true) or not (false) */
    collapsed: boolean | undefined;
    /**
     * @type {Boolean}
     * specify if Drawing control is draggable (true) or not (false) */
    draggable: boolean | undefined;
    /** @private */
    private interactionSelectEdit;
    /** @private */
    private featuresCollectionSelected;
    /** @private */
    private stylingOvl;
    /** @private */
    private popupOvl;
    /** @private */
    private tooltipOvl;
    /** @private */
    private tooltipElem;
    /** @private */
    private _isDesktop;
    /**
     * event triggered after an layer is added
     *
     * @event drawing:add:after
     * @defaultValue "drawing:add:after"
     * @group Events
     * @property {Object} type - event
     * @property {Object} layer - layer
     * @property {Object} target - instance Drawing
     * @example
     * Drawing.on("drawing:add:after", function (e) {
     *   console.log(e.layer);
     * })
     */
    ADD_AFTER_DRAWING_LAYER_EVENT: string | undefined;
    /**
     * event triggered before an layer is added
     *
     * @event drawing:add:before
     * @defaultValue "drawing:add:before"
     * @group Events
     * @property {Object} type - event
     * @property {Object} layer - layer
     * @property {Object} target - instance Drawing
     * @example
     * Drawing.on("drawing:add:before", function (e) {
     *   console.log(e.layer);
     * })
     */
    ADD_BEFORE_DRAWING_LAYER_EVENT: string | undefined;
    /**
     * Creates empty layer to host features
     *
     * @private
     */
    private _createEmptyLayer;
    /**
     * this method is called by the constructor.
     * this information is useful to switch to touch mode.
     * Detection : test for desktop or tactile
     *
     * @method _detectSupport
     *
     * @returns {Boolean} is desktop
     * @private
     */
    private _detectSupport;
    /**
     * Create control main container (called by Drawing constructor)
     *
     * @method _initContainer
     *
     * @returns {HTMLElement} DOM element
     * @private
     */
    private _initContainer;
    _showDrawingButton: any;
    _drawingPanel: any;
    _drawingPanelHeader: any;
    /**
     * Callback de fin de dessin de geometrie
     * @param {Feature} feature - ol feature
     * @param {String} geomType - geometry type
     * @param {Boolean} clean - clean last feature
     *
     * @private
     */
    private _drawEndFeature;
    /**
     * Creates Interaction for features removal.
     *
     * @returns {SelectInteraction} created interaction.
     * @private
     */
    private _createRemoveInteraction;
    /**
     * Creates Interaction for features style definition.
     *
     * @returns {SelectInteraction} created interaction.
     * @private
     */
    private _createStylingInteraction;
    /**
     * Creates Interaction for text definition.
     *
     * @returns {SelectInteraction} created interaction.
     * @private
     */
    private _createLabelInteraction;
    labelOvl: Overlay | undefined;
    /**
     * Callback de fin de modification du dessin afin de mettre à jour la mesure
     * TODO
     * @param {Feature} feature - ol feature
     * @param {String} geomType - geometry type
     *
     * @private
     */
    private _updateMeasure;
    /**
     * Handles click on drawing tools icons
     *
     * @param {Event} clickEvent - click event
     * @param {String} toolId - selected tool Id
     * @param {Drawing} context - Drawing control.
     * @private
     */
    private _handleToolClick;
    /**
     * this method is called by event 'click' on 'GPshowDrawingPicto' tag label
     * (cf. this._createShowDrawingPictoElement),
     * and toggles event 'mousemove' on map.
     *
     * @method onShowDrawingClick
     * @param { Event } e évènement associé au clic
     * @private
     */
    private onShowDrawingClick;
    /**
     * this method is called by event 'click' on 'drawing-export' tag button.
     *
     * @method onExportFeatureClick
     * @private
     */
    private onExportFeatureClick;
}
import Control from "../Control";
import Map from "ol/Map";
import { Select as SelectInteraction } from "ol/interaction";
import VectorLayer from "ol/layer/Vector";
import Overlay from "ol/Overlay";
//# sourceMappingURL=Drawing.d.ts.map