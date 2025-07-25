// import CSS
import "../../CSS/Controls/Drawing/GPFdrawing.css";
// import "../../CSS/Controls/Drawing/GPFdrawingStyle.css";
// import OpenLayers
// import Control from "ol/control/Control";
import Widget from "../Widget";
import Control from "../Control";
import { unByKey as olObservableUnByKey } from "ol/Observable";
import Collection from "ol/Collection";
import Overlay from "ol/Overlay";
import { transform as olTransformProj } from "ol/proj";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import {
    Fill,
    Icon,
    Stroke,
    Style,
    Text,
    Circle
} from "ol/style";
import {
    LineString,
    LinearRing,
    Point,
    Polygon,
    MultiLineString,
    MultiPoint,
    MultiPolygon
} from "ol/geom";
import {
    Select as SelectInteraction,
    Modify as ModifyInteraction,
    Draw as DrawInteraction
} from "ol/interaction";
import {
    singleClick as eventSingleClick,
    pointerMove as eventPointerMove
} from "ol/events/condition";
import {
    getArea as olGetAreaSphere,
    getDistance as olGetDistanceSphere
} from "ol/sphere";
// import local
import Logger from "../../Utils/LoggerByDefault";
import Interactions from "../Utils/Interactions";
import MarkersOther from "../Utils/MarkersOther";
import Draggable from "../../Utils/Draggable";
import SelectorID from "../../Utils/SelectorID";
import Color from "../../Utils/ColorUtils";
// DOM
import DrawingDOM from "./DrawingDOM";
// import local with ol dependencies
import KMLExtended from "../../Formats/KML";
import GeoJSONExtended from "../../Formats/GeoJSON";
import GPXExtended from "../../Formats/GPX";
import LayerSwitcher from "../LayerSwitcher/LayerSwitcher";

var logger = Logger.getLogger("Drawing");

/**
 * @classdesc
 *
 * Drawing Control.
 *
 * @constructor
 * @alias ol.control.Drawing
 * @type {ol.control.Drawing}
 * @extends {ol.control.Control}
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
class Drawing extends Control {

    /**
     * See {@link ol.control.Drawing}
     * @module Drawing
     * @alias module:~controls/Drawing
     * @param {*} options - options
     * @example
     * import Drawing from "gpf-ext-ol/controls/Drawing"
     * ou
     * import { Drawing } from "gpf-ext-ol"
     */
    constructor (options) {
        options = options || {};

        // call ol.control.Control constructor
        super(options);

        if (!(this instanceof Drawing)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }
        /**
         * Nom de la classe (heritage)
         * @private
         */
        this.CLASSNAME = "Drawing";

        this._initialize(options);

        // init control DOM container
        this._container = this._initContainer();

        // ajout du container
        (this.element) ? this.element.appendChild(this._container) : this.element = this._container;

        return this;
    }

    /**
     * Default tools to display for widget
     *
     * @private
     */
    static DefaultTools = {
        points : true,
        lines : true,
        polygons : true,
        holes : false,
        text : true,
        remove : true,
        display : true,
        tooltip : true,
        edit : true,
        export : true,
        measure : false
    };

    /**
     * Default labels for widget
     *
     * @private
     */
    static DefaultLabels = {
        control : "Annoter la carte",
        creatingTools : "Créer",
        points : "Placer des points",
        lines : "Dessiner des lignes",
        polygons : "Dessiner des polygones",
        holes : "Créer des trous sur un polygone",
        text : "Ecrire sur la carte",
        editingTools : "Éditer",
        edit : "Editer les tracés",
        display : "Modifier l'apparence des objets",
        tooltip : "Modifier les textes / infos-bulles",
        remove : "Supprimer des objets",
        export : "Exporter",
        exportTitle : "Exporter en KML",
        applyToObject : "Appliquer à l'objet",
        saveDescription : "Enregistrer",
        setAsDefault : "Définir par défaut",
        strokeColor : "Couleur du trait : ",
        strokeWidth : "Epaisseur du trait : ",
        fillColor : "Couleur de remplissage : ",
        fillOpacity : "Opacité du remplissage : ",
        markerSize : "Taille du pictogramme : ",
        markerColor : "Couleur du pictogramme : ",
        labelDisplay : "Afficher le label : "
    };

    /**
     * Default styles applyied to drawn features.
     *
     * @private
     */
    static DefaultStyles = {
        textFillColor : "#000000",
        textStrokeColor : "#FFFFFF",
        textStrokeWidth : 6,
        // INFO : cette option n'est pas surchargeable via les options du constructeur !
        textIcon1x1 : {
            src : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNiYAAAAAkAAxkR2eQAAAAASUVORK5CYII=",
            anchor : [0, 0]
        },
        polyFillColor : "#000091",
        polyFillOpacity : 0.7,
        polyStrokeColor : "#000091",
        polyStrokeWidth : 4,
        strokeColor : "#FF7F00",
        strokeWidth : 4,
        markerSize : 1,
        markerColor : "#ffcc33",
        // INFO : cette option n'est pas surchargeable via les options du constructeur !
        labelDisplay : true
    };

    /**
     * Default styles when drawing
     *
     * @private
     */
    static DefaultCursorStyle = {
        radius : 6,
        strokeColor : "#FFF",
        strokeWidth : 1,
        fillColor : "rgba(0, 153, 255, 1)"
    };

    /**
     * Overload of {@link http://openlayers.org/en/latest/apidoc/ol.control.Control.html#setMap ol.control.Control.setMap()} method, called when control is added to or removed from map.
     *
     * @param {Object} map - {@link http://openlayers.org/en/latest/apidoc/ol.Map.html ol.Map} object.
     */
    setMap (map) {
        // call original setMap method
        super.setMap(map);

        if (this.getMap() && this.eventKey) {
            olObservableUnByKey(this.eventKey);
        }

        // nothing else to do if map == null
        if (map == null) {
            return;
        }

        // position
        if (this.options.position) {
            this.setPosition(this.options.position);
        }

        // reunion du bouton avec le précédent
        if (this.options.gutter === false) {
            this.getContainer().classList.add("gpf-button-no-gutter");
        }

        // mode "draggable"
        if (this.draggable) {
            Draggable.dragElement(
                this._drawingPanel,
                this._drawingPanelHeader,
                map.getTargetElement()
            );
        }

        // mode "collapsed"
        if (!this.collapsed) {
            this._showDrawingButton.setAttribute("aria-pressed", true);
        }

        if (this.layer) {
            // ajout du layer de dessin à la carte s'il n'y est pas déjà
            this.setLayer(this.layer);
        }

        // gestion des suppressions "externes" de la couche de dessin.
        this.eventKey = this.getMap().getLayers().on("remove", (evtRm) => {
            if (evtRm.element === this.layer) { // FIXME object comparison
                // found layer removed.
                this.layer = null;
                // on supprime l'interaction en cours si besoin
                if (this.interactionCurrent) {
                    this.getMap().removeInteraction(this.interactionCurrent);
                    this.interactionCurrent = null;
                }
            }
        });
    }

    /**
     * Export features of current drawing layer (KML by default).
     *
     * @returns {String} a representation of drawn features (KML, GPX or GeoJSON) or null if not possible.
     */
    exportFeatures () {
        var result = null;
        if (Control.prototype.getMap.call(this) == null) {
            logger.log("Impossible to export : control isn't attached to any map.");
            return result;
        }
        if (!this.layer) {
            logger.log("Impossible to export : no layer is hosting features.");
            return result;
        }
        if (!this.layer.getSource() ||
            !this.layer.getSource().getFeatures() ||
            !this.layer.getSource().getFeatures().length) {
            logger.log("Impossible to export : no features found.");
            return result;
        }

        // on invalide les features...
        if (this.featuresCollectionSelected) {
            this.featuresCollectionSelected.clear();
        }

        var ClassName = null;
        switch (this.getExportFormat()) {
            case "KML":
                ClassName = new KMLExtended({
                    writeStyles : true
                });
                break;
            case "GPX":
                ClassName = new GPXExtended({
                    // readExtensions : function (ext) {/* only extensions nodes from wpt, rte and trk can be processed */ }
                });
                break;
            case "GEOJSON":
                ClassName = new GeoJSONExtended({});
                break;
            default:
                break;
        }

        if (!ClassName) {
            logger.log("Impossible to export : format unknown !?");
            return result;
        }

        var featProj = this.layer.getSource().getProjection();
        featProj = featProj || this.getMap().getView().getProjection();

        result = ClassName.writeFeatures(this.layer.getSource().getFeatures(), {
            dataProjection : "EPSG:4326",
            featureProjection : featProj
        });

        return result;
    }

    // ################################################################### //
    // #################### user interface methods ####################### //
    // ################################################################### //

    /**
     * Collapse or display control main container
     *
     * @param {Boolean} collapsed - True to collapse control, False to display it
     */
    setCollapsed (collapsed) {
        if (collapsed === undefined) {
            logger.error("[ERROR] Drawing:setCollapsed - missing collapsed parameter");
            return;
        }
        if ((collapsed && this.collapsed) || (!collapsed && !this.collapsed)) {
            return;
        }
        // on simule l'ouverture du panneau après un click
        this.onShowDrawingClick();
        this._showDrawingButton.click();
    }

    /**
     * Setter for Export Name.
     *
     * @param {String} name - Export Name. By default, "Croquis".
     */
    setExportName (name) {
        this._exportName = name;
    }

    /**
     * getter for Export Name.
     *
     * @returns {String} export name
     */
    getExportName () {
        return this._exportName;
    }

    /**
     * Setter for Export format (KML, GPX or GeoJSON).
     *
     * @param {String} format - Export format. By default, "KML".
     */
    setExportFormat (format) {
        this._exportFormat = (format) ? format.toUpperCase() : "KML";
        switch (format.toUpperCase()) {
            case "KML":
                this._exportExt = ".kml";
                this._exportMimeType = "application/vnd.google-earth.kml+xml";
                break;
            case "GPX":
                this._exportExt = ".gpx";
                this._exportMimeType = "application/gpx+xml";
                break;
            case "GEOJSON":
                this._exportExt = ".geojson";
                this._exportMimeType = "application/geo+json";
                break;
            default:
                // redefine format by default !
                this._exportFormat = "KML";
                break;
        }
    }

    /**
     * getter for Export format.
     *
     * @returns {String} export format
     */
    getExportFormat () {
        return this._exportFormat;
    }

    /**
     * Sets vector layer to hosts feature.
     *
     * @param {ol.layer.Vector} vlayer - vector layer
     */
    setLayer (vlayer) {
        if (!vlayer) {
            this.layer = null;
            return;
        }

        if (!(vlayer instanceof VectorLayer)) {
            logger.log("no valid layer given for hosting drawn features.");
            return;
        }

        // ajout du layer de dessin à la carte s'il n'y est pas déjà
        var layers = this.getMap().getLayers();
        if (layers) {
            var found = false;
            layers.forEach((mapLayer) => {
                if (mapLayer === vlayer) {
                    logger.trace("layer already in map. Not adding.");
                    found = true;
                }
            });
            // si le layer n'est pas sur la carte, on l'ajoute.
            if (!found) {
                this.getMap().addLayer(vlayer);
                /**
                 * event triggered after an layer is added
                 *
                 * @event drawing:add:after
                 * @property {Object} type - event
                 * @property {Object} layer - layer
                 * @property {Object} target - instance Drawing
                 * @example
                 * Drawing.on("drawing:add:after", function (e) {
                 *   console.log(e.layer);
                 * })
                 */
                this.dispatchEvent({
                    type : "drawing:add:after",
                    layer : vlayer
                });
            }
            // style par defaut !
            // application des styles ainsi que ceux par defaut de ol sur le layer
            vlayer.getSource().getFeatures().forEach((feature) => {
                var style = feature.getStyle();
                if (typeof style !== "function") {
                    return;
                }
                var featureStyleFunction = feature.getStyleFunction();
                if (featureStyleFunction) {
                    var styles = featureStyleFunction.call(this, feature, 0);
                    if (styles && styles.length !== 0) {
                        feature.setStyle((Array.isArray(styles)) ? styles[0] : styles);
                    }
                }
            });
            this.layer = vlayer;

            // Si un layer switcher est présent dans la carte, on lui affecte des informations pour cette couche
            this.getMap().getControls().forEach(
                (control) => {
                    if (control instanceof LayerSwitcher) {
                        // un layer switcher est présent dans la carte
                        var layerId = this.layer.gpLayerId;
                        // INFO
                        // dans des cas "très" particuliers, le titre peut être un identifiant
                        // car le titre n'a pas été renseigné.
                        // donc, on force le croquis à être renommé avec une description
                        // dans le gestionnaire de couche.
                        if (layerId && control._layers[layerId].title === layerId) {
                            control.addLayer(
                                this.layer, {
                                    title : this.options.layerDescription.title,
                                    description : this.options.layerDescription.description
                                }
                            );
                        }
                    }
                }
            );
        }
    }

    /**
     * Get vector layer
     *
     * @returns {Object} layer - isocurve layer
     */
    getLayer () {
        return this.layer;
    }

    /**
     * Get container
     *
     * @returns {DOMElement} container
     */
    getContainer () {
        return this._container;
    }

    /** Disable interaction */
    disable () {
        var map = this.getMap();
        // on supprime toutes les interactions
        Interactions.unset(map);

        // on deselectionne les Tools
        for (var toolsType in this.dtOptions) {
            if (this.dtOptions.hasOwnProperty(toolsType)) {
                if (this.dtOptions[toolsType].active) {
                    var toolsId = this._addUID("drawing-tool-" + this.dtOptions[toolsType].id);
                    document.getElementById(toolsId).className = "drawing-tool fr-btn fr-btn--tertiary gpf-btn--tertiary";
                    this.dtOptions[toolsType].active = false;
                }
            }
        }
    }
    // ################################################################### //
    // ######################## initialize control ####################### //
    // ################################################################### //

    /**
     * Gets marker options in options.markersList given its src.
     *
     * @param {String} src - marker image URI,
     * @returns {Object} markers options
     * @private
     */
    _getsMarkersOptionsFromSrc (src) {
        var markerOptions = null;
        for (var i = 0; i < this.options.markersList.length; i++) {
            if (src && this.options.markersList[i].src === src) {
                markerOptions = this.options.markersList[i];
                return markerOptions;
            }
        }
        return markerOptions;
    }

    /**
     * Converts markerElement options into Openlayers IconStyles options.
     *
     * @param {Object} markerElement - marker element
     * @returns {Object} ol.Style.Icon constructor options.
     * @private
     */
    _getIconStyleOptions (markerElement) {
        var iconOptions = {};
        Object.keys(markerElement).forEach((key) => {
            switch (key) {
                case "src":
                case "size":
                case "scale":
                case "color":
                case "anchor":
                case "anchorOrigin":
                case "anchorXUnits":
                case "anchorYUnits":
                    iconOptions[key] = markerElement[key];
                    break;
            }
        });

        return iconOptions;
    }

    /**
     * Initialize control (called by Drawing constructor)
     *
     * @method _initialize
     * @param {Object} options - control options (set by user)
     * @private
     */
    _initialize (options) {
        // determination d'un uid
        this._uid = options.id || SelectorID.generate();

        // export name / format / ...
        this._exportName = "Croquis";
        this._exportFormat = "KML";
        this._exportMimeType = "application/vnd.google-earth.kml+xml";
        this._exportExt = ".kml";

        options = options || {};
        // Set default options
        this.options = options;

        this.options.layerDescription = Object.assign({
            title : "Croquis",
            description : "Mon croquis"}, options.layerDescription);

        // applying default tools
        if (!this.options.tools) {
            this.options.tools = {};
        }
        Object.keys(Drawing.DefaultTools).forEach((key) => {
            if (!this.options.tools.hasOwnProperty(key)) {
                this.options.tools[key] = Drawing.DefaultTools[key];
            }
        });
        // styles par defaut lors du dessin
        if (!this.options.cursorStyle) {
            this.options.cursorStyle = {};
        }
        Object.keys(Drawing.DefaultCursorStyle).forEach((key) => {
            if (!this.options.cursorStyle.hasOwnProperty(key)) {
                this.options.cursorStyle[key] = Drawing.DefaultCursorStyle[key];
            }
        });

        this.options.collapsed = (options.collapsed !== undefined) ? options.collapsed : true;
        /** {Boolean} specify if Drawing control is collapsed (true) or not (false) */
        this.collapsed = this.options.collapsed;

        this.options.draggable = (options.draggable !== undefined) ? options.draggable : false;
        /** {Boolean} specify if Drawing control is draggable (true) or not (false) */
        this.draggable = this.options.draggable;

        this.options.markersList = options.markersList || MarkersOther["drawing_api"];

        // applying default labels
        if (!this.options.labels) {
            this.options.labels = {};
        }
        Object.keys(Drawing.DefaultLabels).forEach((key) => {
            if (!this.options.labels.hasOwnProperty(key)) {
                this.options.labels[key] = Drawing.DefaultLabels[key];
            }
        });

        // applying default styles
        if (!this.options.defaultStyles) {
            this.options.defaultStyles = {};
        }
        Object.keys(Drawing.DefaultStyles).forEach((key) => {
            if (!options.defaultStyles.hasOwnProperty(key)) {
                this.options.defaultStyles[key] = Drawing.DefaultStyles[key];
                return;
            }
            if (key === "polyFillOpacity" &&
                (options.defaultStyles[key] < 0 ||
                    options.defaultStyles[key] > 1)) {
                logger.log("Wrong value (" + options.defaultStyles[key] + ") for defaultStyles.polyFillOpactity. Must be between 0 and 1");
                this.options.defaultStyles[key] = Drawing.DefaultStyles[key];
                return;
            }
            if (key === "strokeWidth" || key === "polyStrokeWidth") {
                var intValue = parseInt(options.defaultStyles[key], 10);
                if (isNaN(intValue) || intValue < 0) {
                    logger.log("Wrong value (" + options.defaultStyles[key] + ") for defaultStyles.strokeWidth. Must be a positive interger value.");
                    this.options.defaultStyles[key] = Drawing.DefaultStyles[key];
                    return;
                }
                this.options.defaultStyles[key] = intValue;
            }
            if (key === "markerSize") {
                var floatValue = parseFloat(options.defaultStyles[key]);
                if (isNaN(floatValue) || floatValue < 0) {
                    logger.log("Wrong value (" + options.defaultStyles[key] + ") for defaultStyles.markerSize. Must be a positive value.");
                    this.options.defaultStyles[key] = Drawing.DefaultStyles[key];
                    return;
                }
                this.options.defaultStyles[key] = floatValue;
            }
        });

        this.interactionCurrent = null;
        this.interactionSelectEdit = null;
        this.featuresCollectionSelected = null;

        this.stylingOvl = null;
        this.popupOvl = null;

        this.tooltipOvl = null;
        this.tooltipElem = null;

        this.layer = null;
        if (this.options.layer && this.options.layer instanceof VectorLayer) {
            this.layer = this.options.layer;
        }

        // detection du support : desktop ou tactile
        // FIXME : utile ?
        this._isDesktop = this._detectSupport();

        // applying default popup
        if (!this.options.popup) {
            this.options.popup = {
                display : true,
                apply : null
            };
        }
    }

    /**
     * Creates empty layer to host features
     *
     * @private
     */
    _createEmptyLayer () {
        var features = new Collection();
        var layer = new VectorLayer({
            source : new VectorSource({
                features : features
            }),
            title : this.options.layerDescription.title,
            description : this.options.layerDescription.description
        });
        // on rajoute le champ gpResultLayerId permettant d'identifier une couche crée par le composant.
        layer.gpResultLayerId = "drawing";

        /**
         * event triggered before an layer is added
         *
         * @event drawing:add:before
         * @property {Object} type - event
         * @property {Object} layer - layer
         * @property {Object} target - instance Drawing
         * @example
         * Drawing.on("drawing:add:before", function (e) {
         *   console.log(e.layer);
         * })
         */
        this.dispatchEvent({
            type : "drawing:add:before",
            layer : layer
        });

        // on le rajoute au controle (et à la carte)
        this.setLayer(layer);
    }

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
    _detectSupport () {
        // TODO
        // Choix de gérer la détection dans le code du composant au lieu du DOM car :
        // Utilisation de l'implémentation Leaflet
        // http://leafletjs.com/reference.html#browser

        var isDesktop = true;
        var userAgent = window.navigator.userAgent.toLowerCase();

        if (userAgent.indexOf("iphone") !== -1 ||
            userAgent.indexOf("ipod") !== -1 ||
            userAgent.indexOf("ipad") !== -1 ||
            userAgent.indexOf("android") !== -1 ||
            userAgent.indexOf("mobile") !== -1 ||
            userAgent.indexOf("blackberry") !== -1 ||
            userAgent.indexOf("tablet") !== -1 ||
            userAgent.indexOf("phone") !== -1 ||
            userAgent.indexOf("touch") !== -1) {
            isDesktop = false;
        }

        if (userAgent.indexOf("msie") !== -1 ||
            userAgent.indexOf("trident") !== -1) {
            isDesktop = true;
        }

        return isDesktop;
    }

    // ################################################################### //
    // ######################## methods handle dom ####################### //
    // ################################################################### //

    /**
     * Create control main container (called by Drawing constructor)
     *
     * @method _initContainer
     *
     * @returns {DOMElement} DOM element
     * @private
     */
    _initContainer () {
        // creation du container principal
        var container = this._createMainContainerElement();

        var picto = this._showDrawingButton =this._createShowDrawingPictoElement();
        container.appendChild(picto);

        var panel = this._drawingPanel = this._createDrawingPanelElement();
        var panelDiv = this._createDrawingPanelDivElement();
        panel.appendChild(panelDiv);

        var header = this._drawingPanelHeader = this._createDrawingPanelHeaderElement();
        panelDiv.appendChild(header);

        var sections = this._createDrawingToolsDivSections();
        panelDiv.appendChild(sections);

        var tools = this._createDrawingToolsSections();
        for (var i = 0; i < tools.length; i++) {
            sections.appendChild(tools[i]);
        }

        var containerButtonsPlugin = this._createDrawingButtonsPluginDiv();
        sections.appendChild(containerButtonsPlugin);

        container.appendChild(panel);

        return container;
    }

    // ################################################################### //
    // ##################### handlers events to control ################## //
    // ################################################################### //

    /**
     * Callback de fin de dessin de geometrie
     * @param {Object} feature - ol feature
     * @param {String} geomType - geometry type
     * @param {Boolean} clean - clean last feature
     *
     * @private
     */
    _drawEndFeature (feature, geomType) {
        // application des styles par defaut.
        var style = null;

        switch (geomType) {
            case "Point":
                style = new Style({
                    image : new Icon(this._getIconStyleOptions(this.options.markersList[0]))
                });
                break;
            case "LineString":
                style = new Style({
                    stroke : new Stroke({
                        color : this.options.defaultStyles.strokeColor,
                        width : this.options.defaultStyles.strokeWidth
                    })
                });
                break;
            case "Polygon":
                style = new Style({
                    fill : new Fill({
                        color : Color.hexToRgba(
                            this.options.defaultStyles.polyFillColor,
                            this.options.defaultStyles.polyFillOpacity
                        )
                    }),
                    stroke : new Stroke({
                        color : this.options.defaultStyles.polyStrokeColor,
                        width : this.options.defaultStyles.polyStrokeWidth
                    })
                });
                break;
        }
        feature.setStyle(style);

        // gestion des mesures
        this._updateMeasure(feature, geomType);

        if (this.options.popup.display) {
            // creation overlay pour saisie du label
            // contexte
            var context = this;

            /**
            * Enregistrement de la valeur saisie dans l'input.
            *
            * @param {String} key - clef de l'attribut.
            * @param {String} value - valeur de l'attribut.
            * @param {Boolean} save - true si on garde le label.
            */
            var setAttValue = function (key, value, save) {
                context.getMap().removeOverlay(context.popupOvl);
                context.popupOvl = null;
                if (save && value && value.trim().length > 0) {
                    var obj = {};
                    obj[key] = value.replace(/\n/g, "<br>");
                    feature.setProperties(obj);
                }
            };

            var popup = null;
            var popupByDefault = true;

            var displayFunction = this.options.popup.function;
            if (displayFunction && typeof displayFunction === "function") {
                // la sauvegarde et la fermeture sont des actions à implementer par l'utilisateur
                // par contre, la destruction est à gerer en interne
                popup = displayFunction.call(context, {
                    feature : feature,
                    geomType : geomType,
                    closeFunc : function () {
                        setAttValue(null, false);
                    },
                    saveFunc : function (message) {
                        setAttValue(message, true);
                    }
                });
                if (popup) {
                    // on est sûr que la popup customisée existe,
                    // donc on n'utilise pas celle par defaut...
                    popupByDefault = false;
                    // FIXME comment forcer le focus sur une div ?
                    popup.tabIndex = -1; // hack sur le focus sur une div ?
                    popup.onblur = function () {
                        context.getMap().removeOverlay(context.popupOvl);
                        context.popupOvl = null;
                    };
                }
            }
            // use popup by default
            if (popupByDefault) {
                // function by default
                popup = this._createLabelDiv({
                    applyFunc : setAttValue,
                    inputId : this._addUID("att-input"),
                    placeholder : "Saisir une description... (facultatif)",
                    measure : (this.options.tools.measure) ? feature.getProperties().measure : null,
                    geomType : geomType,
                    key : "description"
                });
            }
            // un peu de menage...
            if (this.popupOvl) {
                this.getMap().removeOverlay(this.popupOvl);
                this.popupOvl = null;
            }
            // creation de l'overlay
            this.popupOvl = new Overlay({
                element : popup,
                // FIXME : autres valeurs.
                positioning : "top-center"
                // stopEvent : false
            });
            this.getMap().addOverlay(this.popupOvl);
            var geomExtent = feature.getGeometry().getExtent();
            this.popupOvl.setPosition([
                (geomExtent[0] + geomExtent[2]) / 2, (geomExtent[1] + geomExtent[3]) / 2
            ]);
            if (document.getElementById(this._addUID("att-input"))) {
                document.getElementById(this._addUID("att-input")).focus();
            }
        }
    }

    /**
     * Creates Interaction for features removal.
     *
     * @returns {SelectInteraction} created interaction.
     * @private
     */
    _createRemoveInteraction () {
        var interaction = new SelectInteraction({
            // features : this.layer.getSource().getFeaturesCollection(),
            layers : [this.layer],
            style : false
        });
        interaction.on("select", (seEv) => {
            if (!seEv || !seEv.selected || seEv.selected.length === 0) {
                return;
            }
            this.layer.getSource().removeFeature(seEv.selected[0]);
            // suppression puis rajout de l'interaction pour appliquer le changement tout de suite...
            this.getMap().removeInteraction(this.interactionCurrent);
            this.interactionCurrent = this._createRemoveInteraction();
            this.getMap().addInteraction(this.interactionCurrent);
        });
        return interaction;
    }

    /**
     * Creates Interaction for features style definition.
     *
     * @returns {ol.interaction.Select} created interaction.
     * @private
     */
    _createStylingInteraction () {
        var interaction = new SelectInteraction({
            layers : [this.layer],
            style : false
        });
        interaction.on("select", (seEv) => {
            // suppression de toute popup existante
            if (this.stylingOvl) {
                this.getMap().removeOverlay(this.stylingOvl);
            }
            if (!seEv || !seEv.selected || seEv.selected.length === 0) {
                return;
            }

            var valuesColor = null;
            var hexColor = null;
            var popupOvl = null;
            var geomType = null;
            var initValues = {};

            // FIXME
            // l'appel feature.getStyle() est parfois nul pour des geometries Point
            // avec un style par defaut !

            var geom = seEv.selected[0].getGeometry();
            var style = seEv.selected[0].getStyle();
            if (geom instanceof Point || geom instanceof MultiPoint) {
                // INFO
                // on determine si c'est un marker (ou cercle), un label ou les 2.
                // un label a un pixel transparent comme icone
                if (style &&
                    style.getImage() &&
                    typeof style.getImage().getSrc === "function" &&
                    style.getImage().getSrc() !== this.options.defaultStyles.textIcon1x1.src) {
                    geomType = "Point";
                    // on traite un marker
                    // mais si c'est un cercle !?
                    if (typeof style.getImage().getSrc === "function") {
                        initValues.markerSrc = style.getImage().getSrc();
                        initValues.markerSize = style.getImage().getScale() || 1;
                        initValues.markerAnchor = style.getImage().getAnchor();
                        if (style.getImage().getColor()) {
                            valuesColor = style.getImage().getColor();
                            if (Array.isArray(valuesColor)) { // FIXME Array !?
                                valuesColor = "rgba(" + valuesColor.join() + ")";
                            } else {
                                initValues.markerColor = valuesColor;
                            }
                            hexColor = Color.isRGB(valuesColor) ? Color.rgbaToHex(valuesColor) : {
                                hex : valuesColor,
                                opacity : 1
                            };
                            initValues.markerColor = hexColor.hex;
                            initValues.markerOpacity = hexColor.opacity;
                        } else {
                            initValues.markerColor = this.options.markersList[0].color || "#ffffff";
                        }
                    } else {
                        initValues.markerSrc = this.options.markersList[0].src;
                        initValues.markerSize = this.options.markersList[0].scale || 1;
                        initValues.markerColor = this.options.markersList[0].color || "#ffffff";
                        initValues.markerAnchor = this.options.markersList[0].anchor;
                    }
                    initValues.markerCustom = !(this._getsMarkersOptionsFromSrc(initValues.markerSrc));
                }
                if (style && style.getText()) {
                    var labelName = seEv.selected[0].getProperties().name;
                    if (labelName) {
                        // test si on a un marker avec un label
                        geomType = (geomType === "Point") ? "Point&Text" : "Text";
                        if (style.getText().getStroke() && style.getText().getStroke().getColor()) {
                            valuesColor = style.getText().getStroke().getColor();
                            if (Array.isArray(valuesColor)) { // FIXME Array !?
                                valuesColor = "rgba(" + valuesColor.join() + ")";
                            } else {
                                initValues.strokeColor = valuesColor;
                            }
                            hexColor = Color.isRGB(valuesColor) ? Color.rgbaToHex(valuesColor) : {
                                hex : valuesColor,
                                opacity : 1
                            };
                            initValues.strokeColor = hexColor.hex;
                            initValues.strokeOpacity = hexColor.opacity;
                        }
                        if (style.getText().getStroke() && style.getText().getStroke().getWidth()) {
                            initValues.strokeWidth = style.getText().getStroke().getWidth();
                        }
                        if (style.getText().getFill() && style.getText().getFill().getColor()) {
                            valuesColor = style.getText().getFill().getColor();
                            if (Array.isArray(valuesColor)) {
                                valuesColor = "rgba(" + valuesColor.join() + ")";
                            } else {
                                initValues.fillColor = valuesColor;
                            }
                            hexColor = Color.isRGB(valuesColor) ? Color.rgbaToHex(valuesColor) : {
                                hex : valuesColor,
                                opacity : 1
                            };
                            initValues.fillColor = hexColor.hex;
                            initValues.fillOpacity = hexColor.opacity;
                        }
                        initValues.strokeColor = initValues.hasOwnProperty("strokeColor") ? initValues.strokeColor : this.options.defaultStyles.textStrokeColor;
                        initValues.strokeWidth = initValues.hasOwnProperty("strokeWidth") ? initValues.strokeWidth : this.options.defaultStyles.textStrokeWidth;
                        initValues.fillColor = initValues.hasOwnProperty("fillColor") ? initValues.fillColor : this.options.defaultStyles.textFillColor;
                        // Par defaut, pour un marker avec un label, on affiche le label si le tag "name" est renseigné.
                        if (geomType === "Point&Text") {
                            var value = style.getText().getText();
                            if (!value) {
                                style.getText().setText(labelName);
                            }
                            var checked = seEv.selected[0].get("checked");
                            initValues.labelDisplay = (checked === undefined) ? this.options.defaultStyles.labelDisplay : checked;
                        }
                    }
                }
            } else if (geom instanceof LineString || geom instanceof MultiLineString) {
                geomType = "Line";
                if (style && style.getStroke()) {
                    if (style.getStroke().getWidth()) {
                        initValues.strokeWidth = style.getStroke().getWidth();
                    }
                    if (style.getStroke().getColor()) {
                        valuesColor = style.getStroke().getColor();
                        if (Array.isArray(valuesColor)) {
                            valuesColor = "rgba(" + valuesColor.join() + ")";
                        } else {
                            initValues.strokeColor = valuesColor;
                        }
                        hexColor = Color.isRGB(valuesColor) ? Color.rgbaToHex(valuesColor) : {
                            hex : valuesColor,
                            opacity : 1
                        };
                        initValues.strokeColor = hexColor.hex;
                        initValues.strokeOpacity = hexColor.opacity;
                    }
                }
                initValues.strokeWidth = initValues.hasOwnProperty("strokeWidth") ? initValues.strokeWidth : this.options.defaultStyles.strokeWidth;
                initValues.strokeColor = initValues.hasOwnProperty("strokeColor") ? initValues.strokeColor : this.options.defaultStyles.strokeColor;
            } else if (geom instanceof Polygon || geom instanceof MultiPolygon) {
                geomType = "Polygon";
                if (style && style.getStroke()) {
                    if (style.getStroke().getWidth()) {
                        initValues.strokeWidth = style.getStroke().getWidth();
                    }
                    if (style.getStroke().getColor()) {
                        valuesColor = style.getStroke().getColor();
                        if (Array.isArray(valuesColor)) {
                            valuesColor = "rgba(" + valuesColor.join() + ")";
                        } else {
                            initValues.strokeColor = valuesColor;
                        }
                        hexColor = Color.isRGB(valuesColor) ? Color.rgbaToHex(valuesColor) : {
                            hex : valuesColor,
                            opacity : 1
                        };
                        initValues.strokeColor = hexColor.hex;
                        initValues.strokeOpacity = hexColor.opacity;
                    }
                }
                if (style && style.getFill()) {
                    if (style.getFill().getColor()) {
                        valuesColor = style.getFill().getColor();
                        if (Array.isArray(valuesColor)) {
                            valuesColor = "rgba(" + valuesColor.join() + ")";
                        } else {
                            initValues.fillColor = valuesColor;
                        }
                        hexColor = Color.isRGB(valuesColor) ? Color.rgbaToHex(valuesColor) : {
                            hex : valuesColor,
                            opacity : 1
                        };
                        initValues.fillColor = hexColor.hex;
                        initValues.fillOpacity = hexColor.opacity;
                    }
                }
                initValues.strokeWidth = initValues.hasOwnProperty("strokeWidth") ? initValues.strokeWidth : this.options.defaultStyles.polyStrokeWidth;
                initValues.strokeColor = initValues.hasOwnProperty("strokeColor") ? initValues.strokeColor : this.options.defaultStyles.polyStrokeColor;
                initValues.fillColor = initValues.hasOwnProperty("fillColor") ? initValues.fillColor : this.options.defaultStyles.polyFillColor;
                initValues.fillOpacity = initValues.hasOwnProperty("fillOpacity") ? initValues.fillOpacity : this.options.defaultStyles.polyFillOpacity;
            }
            if (!geomType) {
                logger.log("Unhandled geometry type for styling.");
                return;
            }
            var dtObj = this;
            /**
            * function called when apply button is pressed.
            *
            * @param {String} action - "apply" (to selected object), "default" (set as default), "cancel" (do nothing).
            */
            var applyStyle = function (action) {
                if (action === "cancel") {
                    dtObj.getMap().removeOverlay(popupOvl);
                    return;
                }
                var setDefault = action !== "apply";

                var fillColorElem = document.getElementById(dtObj._addUID("fillColor"));
                var fillOpacityElem = document.getElementById(dtObj._addUID("fillOpacity"));
                var strokeColorElem = document.getElementById(dtObj._addUID("strokeColor"));
                var strokeWidthElem = document.getElementById(dtObj._addUID("strokeWidth"));
                var markerSizeElem = document.getElementById(dtObj._addUID("markerSize"));
                // var markerColorElem = document.getElementById(dtObj._addUID("markerColor"));
                switch (geomType.toLowerCase()) {
                    case "text":
                        if (setDefault) {
                            dtObj.options.defaultStyles.textStrokeColor = strokeColorElem.value;
                            dtObj.options.defaultStyles.textStrokeWidth = strokeWidthElem.value;
                            dtObj.options.defaultStyles.textFillColor = fillColorElem.value;
                        } else {
                            seEv.selected[0].setStyle(new Style({
                                text : new Text({
                                    font : "16px sans",
                                    textAlign : "left",
                                    text : style.getText().getText(),
                                    fill : new Fill({
                                        color : fillColorElem.value
                                    }),
                                    stroke : new Stroke({
                                        color : strokeColorElem.value,
                                        width : parseInt(strokeWidthElem.value, 10)
                                    })
                                })
                            }));
                        }
                        break;
                    case "point&text":
                    case "point":
                        var labelDisplay = document.querySelector("input[type='checkbox']");
                        // FIXME cas où le marker n'est pas dans la liste ?
                        // si le marker n'existe pas dans le liste, on ne souhaite donc que changer la couleur du
                        // pictogramme ou la taille..., on garde donc le picto initial.
                        var markerSelected = null;
                        var scale = parseInt(markerSizeElem.value, 10) / 10;
                        var markerChecked = document.querySelector("input[name='gpf-dropdown-radio-style']:checked");
                        if (markerChecked) {
                            markerSelected = dtObj._getsMarkersOptionsFromSrc(markerChecked.value);
                            markerSelected.scale = scale;
                            // markerSelected.color = markerColorElem.value;
                        }
                        if (setDefault) {
                            dtObj.options.defaultStyles.markerSize = scale;
                            if (dtObj.options.markersList.length > 1) {
                                // index du marker dans la liste des markers
                                var idxMarker = dtObj.options.markersList.findIndex(function (mrk) {
                                    if (mrk === markerSelected) { // FIXME object comparison
                                        return true;
                                    }
                                    return false;
                                });
                                if (idxMarker > 0) {
                                    // on enleve le marker de son ancienne position
                                    dtObj.options.markersList.splice(idxMarker, 1);
                                    // on le place en tête de liste
                                    dtObj.options.markersList.splice(0, 0, markerSelected);
                                }
                            }
                            if (geomType.toLowerCase() === "point&text") {
                                dtObj.options.defaultStyles.textStrokeColor = initValues.strokeColor;
                                dtObj.options.defaultStyles.textStrokeWidth = initValues.strokeWidth;
                                dtObj.options.defaultStyles.textFillColor = initValues.fillColor;
                                dtObj.options.defaultStyles.labelDisplay = initValues.labelDisplay;
                            }
                        } else {
                            var text = {};
                            if (geomType.toLowerCase() === "point&text") {
                                seEv.selected[0].set("checked", labelDisplay.checked);
                                text = {
                                    text : new Text({
                                        font : "16px sans",
                                        textAlign : "left",
                                        text : (labelDisplay.checked) ? seEv.selected[0].get("name") : "",
                                        fill : new Fill({
                                            color : initValues.fillColor
                                        }),
                                        stroke : new Stroke({
                                            color : initValues.strokeColor,
                                            width : parseInt(initValues.strokeWidth, 10)
                                        })
                                    })
                                };
                            }
                            if (markerSelected) {
                                seEv.selected[0].setStyle(new Style(Object.assign({
                                    image : new Icon(dtObj._getIconStyleOptions(markerSelected))
                                }, text)));
                            } else {
                                // FIXME anchor !?
                                seEv.selected[0].setStyle(new Style(Object.assign({
                                    image : new Icon({
                                        src : initValues.markerSrc, // on garde le pictogramme initial !
                                        // color : markerColorElem.value, // on recupère la couleur !
                                        anchor : initValues.markerAnchor, // on garde la position initial !
                                        anchorOrigin : "top-left",
                                        anchorXUnits : "pixels",
                                        anchorYUnits : "pixels",
                                        scale : scale
                                    })
                                }, text)));
                            }
                        }
                        break;
                    case "line":
                        if (setDefault) {
                            dtObj.options.defaultStyles.strokeColor = strokeColorElem.value;
                            dtObj.options.defaultStyles.strokeWidth = parseInt(strokeWidthElem.value, 10);
                        } else {
                            seEv.selected[0].setStyle(new Style({
                                stroke : new Stroke({
                                    width : parseInt(strokeWidthElem.value, 10),
                                    color : strokeColorElem.value
                                })
                            }));
                        }
                        break;
                    case "polygon":
                        var opacity = parseInt(fillOpacityElem.value, 10) / 10;
                        if (setDefault) {
                            dtObj.options.defaultStyles.polyStrokeColor = strokeColorElem.value;
                            dtObj.options.defaultStyles.polyFillColor = fillColorElem.value;
                            dtObj.options.defaultStyles.polyFillOpacity = opacity;
                            dtObj.options.defaultStyles.polyStrokeWidth = parseInt(strokeWidthElem.value, 10);
                        } else {
                            seEv.selected[0].setStyle(new Style({
                                stroke : new Stroke({
                                    width : parseInt(strokeWidthElem.value, 10),
                                    color : strokeColorElem.value
                                }),
                                fill : new Fill({
                                    // color : fillColorElem.value
                                    color : Color.hexToRgba(fillColorElem.value, opacity)
                                })
                            }));
                        }
                        break;
                }
                if (!setDefault) {
                    // application des styles par defaut
                    // fermeture de la popup (si on applique le style à l'objet)
                    dtObj.getMap().removeOverlay(popupOvl);
                }
            };

            var popupDiv = this._createStylingDiv({
                geomType : geomType,
                initValues : initValues,
                applyFunc : applyStyle
            });
            popupOvl = new Overlay({
                element : popupDiv,
                // FIXME : autres valeurs.
                positioning : "top-center"
                // stopEvent : false
            });
            this.getMap().addOverlay(popupOvl);
            popupOvl.setPosition(seEv.mapBrowserEvent.coordinate);
            this.stylingOvl = popupOvl;
            // suppression puis rajout de l'interaction pour appliquer le changement tout de suite...
            this.getMap().removeInteraction(this.interactionCurrent);
            this.interactionCurrent = this._createStylingInteraction();
            this.getMap().addInteraction(this.interactionCurrent);
        });
        return interaction;
    }

    /**
     * Creates Interaction for text definition.
     *
     * @returns {SelectInteraction} created interaction.
     * @private
     */
    _createLabelInteraction () {
        var interaction = new SelectInteraction({
            layers : [this.layer],
            style : false
        });
        interaction.on("select", (seEv) => {
            // suppression de toute popup existante
            if (this.labelOvl) {
                this.getMap().removeOverlay(this.labelOvl);
            }
            if (!seEv || !seEv.selected || seEv.selected.length === 0) {
                return;
            }
            var popupOvl = null;
            var geomType = null;
            var _textValue = null;
            var _measure = null;

            var geom = seEv.selected[0].getGeometry();
            var style = seEv.selected[0].getStyle();
            if (geom instanceof Point || geom instanceof MultiPoint) {
                // on determine si c'est un marker ou un label.
                var _label = seEv.selected[0].getProperties().name;
                if (style && style.getText() && _label) {
                    geomType = "Text";
                } else if (style && style.getImage()) {
                    geomType = "Point";
                }
            } else if (geom instanceof LineString || geom instanceof MultiLineString) {
                geomType = "Line";
            } else if (geom instanceof Polygon || geom instanceof MultiPolygon) {
                geomType = "Polygon";
            } else {
                logger.log("Geometry type for styling not supported .");
                return;
            }

            if (!geomType) {
                logger.log("Unhandled geometry type for styling.");
                return;
            }

            if (geomType === "Text") {
                // pour les labels on récupère la valeur dans le style
                _textValue = style.getText().getText();
            } else {
                // pour les autres, c'est un attribut du feature
                // choix à faire entre description (KML et GeoJSON) ou desc (GPX)
                var featProps = seEv.selected[0].getProperties();
                if (featProps && (featProps.hasOwnProperty("description") || featProps.hasOwnProperty("desc"))) {
                    _textValue = featProps["description"] || featProps["desc"];
                }
                if (featProps && featProps.hasOwnProperty("measure")) {
                    _measure = featProps["measure"];
                }
            }

            var context = this;
            /**
             * Enregistrement de la valeur saisie dans l'input.
             *
             * @param {String} key - clef de l'attribut.
             * @param {String} value - valeur de l'attribut.
             * @param {Boolean} save - true si on garde le label.
             */
            var setTextValue = function (key, value, save) {
                context.getMap().removeOverlay(popupOvl);
                if (!save) {
                    return;
                }

                var feature = seEv.selected[0];
                if (geomType === "Text") {
                    var style = feature.getStyle();
                    style.getText().setText(value);
                    feature.setProperties({
                        name : value
                    });
                    feature.setStyle(style);
                    return;
                }

                var obj = {};
                obj[key] = value.replace(/\n/g, "<br>");
                feature.setProperties(obj);
            };

            var popupDiv = this._createLabelDiv({
                applyFunc : setTextValue,
                inputId : this._addUID("label-input"),
                placeholder : (geomType === "Text" ? "Saisir un label..." : "Saisir une description... (facultatif)"),
                text : _textValue,
                key : "description",
                measure : (this.options.tools.measure) ? _measure : null,
                geomType : geomType
            });

            popupOvl = new Overlay({
                element : popupDiv,
                // FIXME : autres valeurs.
                positioning : "top-center"
                // stopEvent : false
            });

            this.getMap().addOverlay(popupOvl);
            popupOvl.setPosition(seEv.mapBrowserEvent.coordinate);
            document.getElementById(this._addUID("label-input")).focus();
            this.labelOvl = popupOvl;
            // suppression puis rajout de l'interaction pour appliquer le changement tout de suite...
            this.getMap().removeInteraction(this.interactionCurrent);
            this.interactionCurrent = this._createLabelInteraction();
            this.getMap().addInteraction(this.interactionCurrent);
        });
        return interaction;
    }

    /**
     * Callback de fin de modification du dessin afin de mettre à jour la mesure
     * TODO
     * @param {Object} feature - ol feature
     * @param {String} geomType - geometry type
     *
     * @private
     */
    _updateMeasure (feature, geomType) {
        logger.log(feature);

        var measure = null;

        var projection = this.getMap().getView().getProjection();

        // arrondi
        function __roundDecimal (nombre, precision) {
            precision = precision || 2;
            var factor = Math.pow(10, precision);
            return Math.round(nombre * factor) / factor;
        }

        var type = (geomType) || feature.getProperties().type;
        switch (type) {
            case "Point":
                var coordinatesPoint = (feature.getGeometry()).getCoordinates();
                var c = olTransformProj(coordinatesPoint, projection, "EPSG:4326");
                measure = "lon : ";
                measure += __roundDecimal(c[0], 4) + "°";
                measure += " / ";
                measure += "lat : ";
                measure += __roundDecimal(c[1], 4) + "°";

                break;
            case "LineString":
                var measureLength = 0;
                var coordinatesLine = (feature.getGeometry()).getCoordinates();
                for (var i = 0, ii = coordinatesLine.length - 1; i < ii; ++i) {
                    var c1 = olTransformProj(coordinatesLine[i], projection, "EPSG:4326");
                    var c2 = olTransformProj(coordinatesLine[i + 1], projection, "EPSG:4326");
                    measureLength += olGetDistanceSphere(c1, c2);
                }
                measure = (measureLength > 1000)
                    ? __roundDecimal(measureLength / 1000, 3) + " km"
                    : __roundDecimal(measureLength, 3) + " m";

                break;
            case "Polygon":
                var measureArea = 0;
                var geom = (feature.getGeometry()).clone();
                var coordinatesAera = geom.getLinearRing(0).getCoordinates();
                measureArea = Math.abs(olGetAreaSphere(new Polygon([coordinatesAera])));

                // FIXME on se limite à des trous uniquement !
                // cad les polygones sont strictement contenus dans le 1er !
                var rings = geom.getLinearRings();
                if (rings.length > 1) {
                    for (var ij = 1; ij < rings.length; ij++) {
                        var coordinatesRings = rings[ij].getCoordinates();
                        measureArea -= Math.abs(olGetAreaSphere(new Polygon([coordinatesRings])));
                    }
                }

                measure = (measureArea > 1000000)
                    ? __roundDecimal(measureArea / 1000000, 3) + " km^2"
                    : __roundDecimal(measureArea, 2) + " m^2";

                break;
        }

        // enregistrement de la mesure dans la feature
        feature.setProperties({
            measure : measure,
            type : type
        });
    }

    /**
     * Handles click on drawing tools icons
     *
     * @param {Event} clickEvent - click event
     * @param {String} toolId - selected tool Id
     * @param {Drawing} context - Drawing control.
     * @private
     */
    _handleToolClick (clickEvent, toolId, context) {
        var map = context.getMap();
        if (!map) {
            logger.trace("Drawing control not attached to any map.");
            return;
        }
        // on supprime  les interactions des autres extensions
        Interactions.unset(map, {
            current : "Drawing"
        });

        // on supprime l'interaction courante s'il y en a une.
        if (context.interactionCurrent) {
            map.removeInteraction(context.interactionCurrent);
            context.interactionCurrent = null;
        }

        // on supprime l'interaction de selection courante s'il y en a une.
        if (context.interactionSelectEdit) {
            map.removeInteraction(context.interactionSelectEdit);
            context.interactionSelectEdit = null;
        }
        // on supprime la popup courante s'il y en a une.
        if (context.popupOvl) {
            context.getMap().removeOverlay(context.popupOvl);
            context.popupOvl = null;
        }
        if (context.stylingOvl) {
            context.getMap().removeOverlay(context.stylingOvl);
            context.stylingOvl = null;
        }
        if (context.tooltipOvl) {
            context.getMap().removeOverlay(context.tooltipOvl);
            context.tooltipOvl = null;
        }

        // si aucune couche de dessin, on en crée une vide.
        if (!this.layer) {
            this._createEmptyLayer();
        }
        const followCursor = (e) => {
            if (e.dragging) {
                return;
            }
            if (!context.tooltipOvl) {
                return;
            }
            const coordinate = e.coordinate;
            context.tooltipOvl.setPosition(coordinate);
        };
        const removeToolTip = () => {
            if (context.tooltipOvl) {
                context.getMap().removeOverlay(context.tooltipOvl);
                context.tooltipOvl = null;
            }
        };
        switch (toolId) {
            case this._addUID("drawing-tool-point"):
                if (context.dtOptions["points"].active) {
                    context.interactionCurrent = new DrawInteraction({
                        stopClick : true,
                        // features : context.layer.getSource().getFeaturesCollection(),
                        source : context.layer.getSource(),
                        style : new Style({
                            image : new Icon(this._getIconStyleOptions(this.options.markersList[0]))
                        }),
                        type : ("Point")
                    });
                    context.interactionCurrent.on("drawend", function (deEv) {
                        // ajout eventuel d'un attribut description sur le feature
                        context._drawEndFeature(deEv.feature, "Point");
                    },
                    context);
                }
                break;
            case this._addUID("drawing-tool-line"):
                if (context.dtOptions["lines"].active) {
                    context.interactionCurrent = new DrawInteraction({
                        stopClick : true,
                        // features : context.layer.getSource().getFeaturesCollection(),
                        source : context.layer.getSource(),
                        style : new Style({
                            image : new Circle({
                                radius : this.options.cursorStyle.radius,
                                stroke : new Stroke({
                                    color : this.options.cursorStyle.strokeColor,
                                    width : this.options.cursorStyle.strokeWidth
                                }),
                                fill : new Fill({
                                    color : this.options.cursorStyle.fillColor
                                })
                            }),
                            stroke : new Stroke({
                                color : this.options.defaultStyles.strokeColor,
                                width : this.options.defaultStyles.strokeWidth
                            })
                        }),
                        type : ("LineString"),
                        handleMoveEvent : followCursor,
                    });
                    if (!context.tootlTipElem) {
                        context.tootlTipElem = document.createElement("div");
                        context.tootlTipElem.className = "gpf-draw-linestring-tooltip";
                    }
                    context.tootlTipElem.innerText = "Double-cliquer pour terminer";
                    context.tooltipOvl = new Overlay({
                        element : context.tootlTipElem,
                        positioning : "top-right"
                    });

                    context.interactionCurrent.on("drawend", function (deEv) {
                        // ajout eventuel d'un attribut description sur le feature
                        context._drawEndFeature(deEv.feature, "LineString");
                        removeToolTip();
                    },
                    context);
                    context.interactionCurrent.on("drawabort", removeToolTip, context);
                }
                break;
            case this._addUID("drawing-tool-polygon"):
                if (context.dtOptions["polygons"].active) {
                    context.interactionCurrent = new DrawInteraction({
                        stopClick : true,
                        // features : context.layer.getSource().getFeaturesCollection(),
                        source : context.layer.getSource(),
                        style : new Style({
                            image : new Circle({
                                radius : this.options.cursorStyle.radius,
                                stroke : new Stroke({
                                    color : this.options.cursorStyle.strokeColor,
                                    width : this.options.cursorStyle.strokeWidth
                                }),
                                fill : new Fill({
                                    color : this.options.cursorStyle.fillColor
                                })
                            }),
                            stroke : new Stroke({
                                color : this.options.defaultStyles.polyStrokeColor,
                                width : this.options.defaultStyles.polyStrokeWidth
                            }),
                            fill : new Fill({
                                color : Color.hexToRgba(
                                    this.options.defaultStyles.polyFillColor,
                                    this.options.defaultStyles.polyFillOpacity
                                )
                            })
                        }),
                        type : ("Polygon"),
                        handleMoveEvent : followCursor,
                    });
                    if (!context.tootlTipElem) {
                        context.tootlTipElem = document.createElement("div");
                        context.tootlTipElem.className = "gpf-draw-linestring-tooltip";
                    }
                    context.tootlTipElem.innerText = "Double-cliquer pour terminer";
                    context.tooltipOvl = new Overlay({
                        element : context.tootlTipElem,
                        positioning : "top-right"
                    });
                    context.interactionCurrent.on("drawend", function (deEv) {
                        // ajout eventuel d'un attribut description sur le feature
                        context._drawEndFeature(deEv.feature, "Polygon");
                        removeToolTip();
                    },
                    context);
                    context.interactionCurrent.on("drawabort", removeToolTip, context);
                }
                break;
            case this._addUID("drawing-tool-holes"):
                if (context.dtOptions["holes"].active) {
                    // selection du polygone à modifier
                    context.interactionSelectEdit = new SelectInteraction({
                        stopClick : true,
                        condition : eventPointerMove,
                        layers : [this.layer]
                    });
                    context.interactionSelectEdit.setProperties({
                        name : "Drawing",
                        source : context
                    });
                    map.addInteraction(context.interactionSelectEdit);

                    // saisie
                    context.interactionCurrent = new DrawInteraction({
                        stopClick : true,
                        features : this.interactionSelectEdit.getFeatures(),
                        style : new Style({
                            image : new Circle({
                                radius : this.options.cursorStyle.radius,
                                stroke : new Stroke({
                                    color : this.options.cursorStyle.strokeColor,
                                    width : this.options.cursorStyle.strokeWidth
                                }),
                                fill : new Fill({
                                    color : this.options.cursorStyle.fillColor
                                })
                            }),
                            stroke : new Stroke({
                                color : this.options.defaultStyles.polyStrokeColor,
                                width : this.options.defaultStyles.polyStrokeWidth
                            }),
                            fill : new Fill({
                                color : Color.hexToRgba(
                                    this.options.defaultStyles.polyFillColor,
                                    this.options.defaultStyles.polyFillOpacity
                                )
                            })
                        }),
                        type : ("Polygon")
                    });

                    context.interactionCurrent.on("drawstart", function (deEv) {}, context);

                    context.interactionCurrent.on("drawend", function (deEv) {
                        // recuperation du feature selectionné
                        var features = context.interactionSelectEdit.getFeatures();
                        if (features.getLength()) {
                            // choix sur le 1er feature de la liste
                            var feature = features.item(0);
                            var hole = deEv.feature.getGeometry().getCoordinates()[0];
                            // test pour savoir si le polygone est entièrement
                            // inclu dans l'autre afin de faciliter les calculs d'aire !
                            var bHoleIsIncluded = true;
                            for (var i = 0; i < hole.length; i++) {
                                if (!feature.getGeometry().intersectsCoordinate(hole[i])) {
                                    bHoleIsIncluded = false;
                                    break;
                                }
                            }
                            if (!bHoleIsIncluded) {
                                return;
                            }
                            // ajout du rings
                            feature.getGeometry().appendLinearRing(new LinearRing(hole));
                            // enregistrement !
                            deEv.feature = feature;
                            // finalisation du dessin...
                            context._drawEndFeature(deEv.feature, "Polygon");
                        }
                    },
                    context);
                }
                break;
            case this._addUID("drawing-tool-text"):
                // text : creation de points invisibles avec un label.
                if (context.dtOptions["text"].active) {
                    context.interactionCurrent = new DrawInteraction({
                        stopClick : true,
                        // features : context.layer.getSource().getFeaturesCollection(),
                        source : context.layer.getSource(),
                        style : new Style({
                            image : new Circle({
                                radius : this.options.cursorStyle.radius,
                                stroke : new Stroke({
                                    color : this.options.cursorStyle.strokeColor,
                                    width : this.options.cursorStyle.strokeWidth
                                }),
                                fill : new Fill({
                                    color : this.options.cursorStyle.fillColor
                                })
                            })
                        }),
                        type : ("Point")
                    });
                    context.interactionCurrent.on("drawend", (deEv) => {
                        /**
                        * Enregistrement de la valeur saisie dans l'input.
                        *
                        * @param {String} key - clef du label
                        * @param {String} value - valeur du label
                        * @param {Boolean} save - true si on garde le label.
                        */
                        var setTextValue = function (key, value, save) {
                            context.getMap().removeOverlay(context.popupOvl);
                            context.popupOvl = null;
                            if (!save || !value) {
                                // removes feature from overlay.
                                context.layer.getSource().removeFeature(deEv.feature);
                                return;
                            }
                            var obj = {};
                            obj[key] = value;
                            deEv.feature.setProperties(obj);

                            deEv.feature.setStyle(new Style({
                                // HACK : on ajoute un icone invisible de 1x1 pixel afin d'eviter
                                // l'affichage d'une punaise google !
                                image : new Icon(context._getIconStyleOptions(context.options.defaultStyles.textIcon1x1)),
                                text : new Text({
                                    textAlign : "left",
                                    font : "16px sans",
                                    text : value,
                                    fill : new Fill({
                                        color : context.options.defaultStyles.textFillColor
                                    }),
                                    stroke : new Stroke({
                                        color : context.options.defaultStyles.textStrokeColor,
                                        width : 3
                                    })
                                })
                            }));
                        };
                        var popup = this._createLabelDiv({
                            applyFunc : setTextValue,
                            inputId : context._addUID("label-input"),
                            geomType : "Text",
                            key : "name",
                            placeholder : "Saisir un label..."
                        });
                        // un peu de menage...
                        if (context.popupOvl) {
                            context.popupOvl.element.querySelector(".gp-styling-button.closer").click();
                        }
                        context.popupOvl = new Overlay({
                            element : popup,
                            // FIXME : autres valeurs.
                            positioning : "top-center" // par defaut, top-left...
                            // stopEvent : false
                        });
                        context.getMap().addOverlay(context.popupOvl);
                        context.popupOvl.setPosition(deEv.feature.getGeometry().getCoordinates());
                        document.getElementById(context._addUID("label-input")).focus();
                    });
                }
                break;
            case this._addUID("drawing-tool-edit"):
                if (context.dtOptions["edit"].active) {
                    this.featuresCollectionSelected = new Collection();
                    context.interactionSelectEdit = new SelectInteraction({
                        condition : eventSingleClick,
                        layers : [this.layer],
                        features : this.featuresCollectionSelected
                    });
                    context.interactionSelectEdit.on("select", (e) => {
                        // ...
                    });
                    context.interactionSelectEdit.setProperties({
                        name : "Drawing",
                        source : context
                    });
                    map.addInteraction(context.interactionSelectEdit);

                    context.interactionCurrent = new ModifyInteraction({
                        stopClick : true,
                        // features : context.layer.getSource().getFeaturesCollection(),
                        features : this.interactionSelectEdit.getFeatures(),
                        style : new Style({
                            image : new Circle({
                                radius : this.options.cursorStyle.radius,
                                stroke : new Stroke({
                                    color : this.options.cursorStyle.strokeColor,
                                    width : this.options.cursorStyle.strokeWidth
                                }),
                                fill : new Fill({
                                    color : this.options.cursorStyle.fillColor
                                })
                            })
                        })
                        // deleteCondition : function (/* event */) { return false },
                        // insertVertexCondition : function (/* event */) { return false }
                    });
                    context.interactionCurrent.on("modifyend", (deEv) => {
                        var feature = deEv.features.item(0);
                        context._updateMeasure(feature);
                    });
                }
                break;
            case this._addUID("drawing-tool-display"):
                if (context.dtOptions["display"].active) {
                    context.interactionCurrent = this._createStylingInteraction();
                }
                break;
            case this._addUID("drawing-tool-tooltip"):
                if (context.dtOptions["tooltip"].active) {
                    context.interactionCurrent = this._createLabelInteraction();
                }
                break;
            case this._addUID("drawing-tool-remove"):
                if (context.dtOptions["remove"].active) {
                    context.interactionCurrent = context._createRemoveInteraction();
                }
                break;
            default:
                logger.trace("unhandled tool type");
        }
        if (context.interactionCurrent) {
            context.interactionCurrent.setProperties({
                name : "Drawing",
                source : this
            });
            map.addInteraction(context.interactionCurrent);
            if (context.tooltipOvl) {
                map.addOverlay(context.tooltipOvl);
            }
        }
        logger.log("interactions", map.getInteractions());
    }

    // ################################################################### //
    // ####################### handlers events to dom #################### //
    // ################################################################### //

    /**
     * this method is called by event 'click' on 'GPshowDrawingPicto' tag label
     * (cf. this._createShowDrawingPictoElement),
     * and toggles event 'mousemove' on map.
     *
     * @method onShowDrawingClick
     * @param { event } e évènement associé au clic
     * @private
     */
    onShowDrawingClick (e) {
        var opened = this._showDrawingButton.ariaPressed;
        if (opened === "true") {
            this.onPanelOpen();
        }
        
        this.disable();

        this.collapsed = !(opened === "true");// on génère nous même l'evenement OpenLayers de changement de propriété
        // (utiliser mousePosition.on("change:collapsed", function(e) ) pour s'abonner à cet évènement)
        this.dispatchEvent("change:collapsed");
        // on recalcule la position
        if (this.options.position && !this.collapsed) {
            this.updatePosition(this.options.position);
        }
    }

    /**
     * this method is called by event 'click' on 'drawing-export' tag button.
     *
     * @method onExportFeatureClick
     * @private
     */
    onExportFeatureClick () {
        var content = this.exportFeatures();
        if (!content) {
            return;
        }
        var link = document.createElement("a");
        // FIXME : determiner le bon charset !
        var charset = "utf-8";
        link.setAttribute("href", "data:" + this._exportMimeType + ";charset=" + charset + "," + encodeURIComponent(content));
        link.setAttribute("download", this.getExportName() + this._exportExt);
        if (document.createEvent) {
            var event = document.createEvent("MouseEvents");
            event.initEvent("click", true, true);
            link.dispatchEvent(event);
        } else {
            link.click();
        }
    }

};

// on récupère les méthodes de la classe commune Drawing
Object.assign(Drawing.prototype, DrawingDOM);
Object.assign(Drawing.prototype, Widget);

export default Drawing;

// Expose Drawing as ol.control.Drawing (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.Drawing = Drawing;
}
