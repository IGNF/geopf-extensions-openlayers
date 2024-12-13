// import CSS
import "../../CSS/Controls/Measures/GPFmeasureAzimuth.css";
// import "../../CSS/Controls/Measures/GPFmeasureAzimuthStyle.css";
// import OpenLayers
// import Control from "ol/control/Control";
import Widget from "../Widget";
import Control from "../Control";
import { getDistance as olGetDistanceSphere } from "ol/sphere";
import { transform as olTransformProj } from "ol/proj";
import { unByKey as olObservableUnByKey } from "ol/Observable";
// import local
import Logger from "../../Utils/LoggerByDefault";
import ID from "../../Utils/SelectorID";
// DOM
import MeasureAzimuthDOM from "./MeasureAzimuthDOM";
// import local with ol dependencies
import MeasureToolBox from "../ToolBoxMeasure/MeasureToolBox";
import Measures from "./Measures";

// Derived from OpenLayers measure example
// http://openlayers.org/en/latest/examples/measure.html

var logger = Logger.getLogger("measureazimut");

/**
 * @classdesc
 *
 * Azimuth measurement Control. Allows users to draw a line on an Openlayers map and have its angle in decimal degrees clockwise from the geographical north.
 *
 * @constructor
 * @alias ol.control.MeasureAzimuth
 * @type {ol.control.MeasureAzimuth}
 * @extends {ol.control.Control}
 * @param {Object} options - options for function call.
 * @param {Number} [options.id] - Ability to add an identifier on the widget (advanced option)
 * @param {Boolean} [options.geodesic = false] - If true, azimuth will be computed on the global sphere. Otherwise, it will be computed on the projected plane.
 * @param {Object} [options.styles = {}] - styles used when drawing. Specified with following properties.
 * @param {Object} [options.styles.pointer = {}] - Style for mouse pointer when drawing the line. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Image-ImageStyle.html ol.style.Image} subclass object.
 * @param {Object} [options.styles.start = {}] - Line Style when drawing. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.htmll ol.style.Style} object.
 * @param {Object} [options.styles.finish = {}] - Line Style when finished drawing. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.htmll ol.style.Style} object.
 * <!-- @param {Object} [options.tooltip = {}] - NOT YET IMPLEMENTED ! -->
 * @param {Object} [options.layerDescription = {}] - Layer informations to be displayed in LayerSwitcher widget (only if a LayerSwitcher is also added to the map)
 * @param {String} [options.layerDescription.title = "Mesures d'azimuth"] - Layer title to be displayed in LayerSwitcher
 * @param {String} [options.layerDescription.description = "Mes mesures"] - Layer description to be displayed in LayerSwitcher
 * @example
 * var measure = new ol.control.MeasureAzimuth({
 *   geodesic : true
 * });
 */
var MeasureAzimuth = class MeasureAzimuth extends Control {

    constructor (options) {
        /**
         * options
         * @private
         */
        options = options || {};

        // call ol.control.Control constructor
        super(options);

        if (!(this instanceof MeasureAzimuth)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        /**
         * Nom de la classe (heritage)
         * @private
         */
        this.CLASSNAME = "MeasureAzimuth";

        // uuid
        this._uid = options.id || ID.generate();

        // container d'activation du controle
        this._pictoContainer = null;

        // initialisation du composant
        this._initialize(options);

        // creation du DOM container
        this._container = this._initializeContainer();

        // ajout du container
        (this.element) ? this.element.appendChild(this._container) : this.element = this._container;

        return this;
    }

    // ################################################################### //
    // ##################### public methods ############################## //
    // ################################################################### //

    /**
     * Overwrite OpenLayers setMap method
     *
     * @param {ol.Map} map - Map.
     */
    setMap (map) {
        logger.trace("setMap()");

        var className = this.CLASSNAME;

        // on fait le choix de ne pas activer les events sur la map à l'init de l'outil,
        // mais uniquement à son utilisation !
        if (map) {
            // var self = this;
            // map.on("click", function (e) {
            //     logger.trace("event on map with click!");
            //     self.onPointerMoveAzimutHandler(e);
            // });
            //
            // map.on("singleclick", function (e) {
            //     logger.trace("event on map with singleclick!");
            //     self.onPointerMoveAzimutHandler(e);
            // });
            //
            // map.on("pointermove", function (e) {
            //     logger.trace("event on map with pointermove!");
            //     self.onPointerMoveAzimutHandler(e);
            // });

            if (!this.options.target && !this.options.position) {
                MeasureToolBox.add(map, this);
            }
        } else {
            this.clean();
        }

        // sauvegarde de l'état de l'outil
        this.tools[className].push({
            instance : (map) ? this : null,
            active : false,
            map : (map) ? map.getTargetElement() : null
        });

        // contexte d'execution
        var context = typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : null;
        if (context) {
            // Pour info
            // les objets de mesures ont du code partagé
            // (afin de gerer les interactions entre eux).
            // Dans un mode "modules", on partage cet objet (this.tools) via le contexte
            // d'execution (ex. avec window)
            if (!context.gpShareMeasures) {
                context.gpShareMeasures = {};
            }
            context.gpShareMeasures[className] = this.tools[className];
        }

        // on appelle la méthode setMap originale d'OpenLayers
        super.setMap(map);

        // position
        if (this.options.position) {
            this.setPosition(this.options.position);
        }

        // reunion du bouton avec le précédent
        if (this.options.gutter === false) {
            this.getContainer().classList.add("gpf-button-no-gutter");
        }
    }

    /**
     * Setter for option Geodesic
     *
     * @param {Boolean} value - geodesic value
     */
    setGeodesic (value) {
        this.options.geodesic = (typeof value !== "undefined") ? value : false;
    }

    /**
     * Getter for option Geodesic
     *
     * @return {Boolean} geodesic value
     */
    isGeodesic () {
        return this.options.geodesic;
    }

    /**
     * Get container
     *
     * @returns {DOMElement} container
     */
    getContainer () {
        return this._container;
    }

    // ################################################################### //
    // ##################### init component ############################## //
    // ################################################################### //

    /**
     * Initialize measure control (called by constructor)
     *
     * @param {Object} options - options
     *
     * @private
     */
    _initialize (options) {
        logger.trace("call MeasureAzimuth::_initialize() : ", options);

        // liste des options
        this.options = {};
        this.options.geodesic = (typeof options.geodesic !== "undefined") ? options.geodesic : false;
        this.options.position = (typeof options.position !== "undefined") ? options.position : null;
        this.options.target = (typeof options.target !== "undefined") ? options.target : null;
        this.options.render = (typeof options.render !== "undefined") ? options.render : null;
        this.options.gutter = (typeof options.gutter !== "undefined") ? options.gutter : null;
        this.options.layerDescription = (typeof options.layerDescription !== "undefined") ? options.layerDescription : {
            title : "Mesures d'azimuth",
            description : "Mes mesures"
        };

        // gestion des styles !
        this.createStylingMeasureInteraction(options.styles);
    }

    /**
     * initialize component container (DOM)
     *
     * @returns {DOMElement} DOM element
     *
     * @private
     */
    _initializeContainer () {
        logger.trace("call MeasureAzimuth::_initializeContainer() : ", this._uid);

        var container = this._createMainContainerElement(); ;

        var picto = this._pictoContainer = this._createShowMeasureAzimuthPictoElement();
        container.appendChild(picto);

        return container;
    }

    // ################################################################### //
    // ##################### overridden methods ########################## //
    // ################################################################### //

    /**
     * Add all events on map
     *
     * @private
     */
    addMeasureEvents () {
        logger.trace("call MeasureAzimuth::addMeasureEvents()");

        var map = this.getMap();

        map.on("singleclick", (e) => this.onPointerMoveAzimutHandler(e));
        map.on("pointermove", (e) => this.onPointerMoveAzimutHandler(e));
        this.eventLayerRemove = map.getLayers().on("remove", (e) => {
            if (e.element === this.measureVector) { // FIXME object comparison
                this.clean();
            }
        });
    }

    /**
     * Remove all events on map
     *
     * @private
     */
    removeMeasureEvents () {
        logger.trace("call MeasureAzimuth::removeMeasureEvents()");

        var map = this.getMap();

        map.un("singleclick", (e) => this.onPointerMoveAzimutHandler(e));
        map.un("pointermove", (e) => this.onPointerMoveAzimutHandler(e));
        if (this.eventLayerRemove) {
            olObservableUnByKey(this.eventLayerRemove);
        }
    }

    /**
     * Format length output.
     *
     * @param {ol.geom.LineString} line - geometry line.
     * @return {String} The formatted output.
     * @private
     */
    format (line) {
        logger.trace("call MeasureAzimuth::format()");

        var map = this.getMap();

        var sourceProj = map.getView().getProjection();

        var c1 = olTransformProj(line.getFirstCoordinate(), sourceProj, "EPSG:4326");
        var c2 = olTransformProj(line.getLastCoordinate(), sourceProj, "EPSG:4326");

        if (!this.options.geodesic) {
            // TODO calcul sur une petite distance (>500m) afin de simuler un cap !
            var lengthGeodesic = olGetDistanceSphere(c1, c2);
            logger.trace("measure between 2 points with geodesic method", lengthGeodesic);
            if (lengthGeodesic > 500) {
                var fraction = 500.0 / lengthGeodesic;
                logger.trace("%", fraction);
                c2 = olTransformProj(line.getCoordinateAt(fraction), sourceProj, "EPSG:4326");
            }
        }

        var degrees2radians = Math.PI / 180;
        var radians2degrees = 180 / Math.PI;

        var lon1 = degrees2radians * c1[0];
        var lon2 = degrees2radians * c2[0];

        var lat1 = degrees2radians * c1[1];
        var lat2 = degrees2radians * c2[1];

        var a = Math.sin(lon2 - lon1) * Math.cos(lat2);
        var b = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);

        var atan = Math.atan2(a, b);

        var azimut = radians2degrees * atan;
        logger.trace("azimut", azimut);

        if (azimut < 0) {
            azimut += 360;
        }
        var output = Math.round(azimut * 100) / 100 + " °";

        return output;
    }

    // ################################################################### //
    // ####################### handlers events to dom #################### //
    // ################################################################### //

    /**
     * this method is called by event 'click' on picto
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    onShowMeasureAzimuthClick (e) {
        if (e.target.ariaPressed === "true") {
            this.onPanelOpen();
        }
        logger.trace("call MeasureAzimuth::onShowMeasureAzimuthClick()", e);

        // appel de la methode commune
        this.onShowMeasureClick(e, "LineString");
    }

    /**
     * Handle pointer click.
     *
     * @param {ol.MapBrowserEvent} e - The event.
     * @private
     */
    onPointerMoveAzimutHandler (e) {
        this.onPointerMoveHandler(e);

        if (this.sketch) {
            var geom = (/** @type {ol.geom.LineString} */ (this.sketch.getGeometry()));
            if (geom.getCoordinates().length > 2) {
                this.measureDraw.finishDrawing();
            }
        }
    }

};

// on récupère les mixins de la classe "MeasureAreaDOM" ainsi que celles
// de "Measures".
Object.assign(MeasureAzimuth.prototype, Measures);
Object.assign(MeasureAzimuth.prototype, MeasureAzimuthDOM);
Object.assign(MeasureAzimuth.prototype, Widget);

export default MeasureAzimuth;

// Expose MeasureAzimuth as ol.control.MeasureAzimuth (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.MeasureAzimuth = MeasureAzimuth;
}
