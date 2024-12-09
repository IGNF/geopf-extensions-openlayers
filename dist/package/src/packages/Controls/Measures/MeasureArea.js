// import CSS
import "../../CSS/Controls/Measures/GPFmeasureArea.css";
// import "../../CSS/Controls/Measures/GPFmeasureAreaStyle.css";
// import OpenLayers
// import Control from "ol/control/Control";
import Widget from "../Widget";
import Control from "../Control";
import { getArea as olGetAreaSphere } from "ol/sphere";
import { Polygon } from "ol/geom";
import { unByKey as olObservableUnByKey } from "ol/Observable";
// import local
import Logger from "../../Utils/LoggerByDefault";
import ID from "../../Utils/SelectorID";
// DOM
import MeasureAreaDOM from "./MeasureAreaDOM";
// import local with ol dependencies
import Measures from "./Measures";
import MeasureToolBox from "../ToolBoxMeasure/MeasureToolBox";

// Derived from OpenLayers measure example
// http://openlayers.org/en/latest/examples/measure.html

var logger = Logger.getLogger("measurearea");

/**
 * @classdesc
 *
 * Tool Measure Area Control. Allows users to measure the length of a path drawn on the map.
 *
 * @constructor
 * @alias ol.control.MeasureArea
 * @type {ol.control.MeasureArea}
 * @extends {ol.control.Control}
 * @param {Object} options - options for function call.
 * @param {Number} [options.id] - Ability to add an identifier on the widget (advanced option)
 * @param {Boolean} [options.geodesic = true] - If true, area will be computed on the global sphere using the {@link https://openlayers.org/en/latest/apidoc/module-ol_sphere.html#geodesicArea ol.Sphere.geodesicArea()} function. Otherwise, area will be computed on the projected plane.
 * @param {Object} [options.styles = {}] - styles used when drawing. Specified with following properties.
 * @param {Object} [options.styles.pointer = {}] - Style for mouse pointer when drawing the polygon to measure. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Image-ImageStyle.html ol.style.Image} subclass object.
 * @param {Object} [options.styles.start = {}] - Polygon Style when drawing. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.htmll ol.style.Style} object.
 * @param {Object} [options.styles.finish = {}] - Polygon Style when finished drawing. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.htmll ol.style.Style} object.
 * <!-- @param {Object} [options.tooltip = {}] - NOT YET IMPLEMENTED ! -->
 * @param {Object} [options.layerDescription = {}] - Layer informations to be displayed in LayerSwitcher widget (only if a LayerSwitcher is also added to the map)
 * @param {String} [options.layerDescription.title = "Mesures de surface"] - Layer title to be displayed in LayerSwitcher
 * @param {String} [options.layerDescription.description = "Mes mesures"] - Layer description to be displayed in LayerSwitcher
 * @example
 * var measureArea = new ol.control.MeasureArea({
 *    geodesic : false
 * });
 */
var MeasureArea = class MeasureArea extends Control {

    constructor (options) {
        /**
         * options
         * @private
         */
        options = options || {};

        // call ol.control.Control constructor
        super(options);

        if (!(this instanceof MeasureArea)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        /**
         * Nom de la classe (heritage)
         * @private
         */
        this.CLASSNAME = "MeasureArea";

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
            //     self.onPointerMoveHandler(e);
            // });
            //
            // map.on("singleclick", function (e) {
            //     logger.trace("event on map with singleclick!");
            //     self.onPointerMoveHandler(e);
            // });
            //
            // map.on("pointermove", function (e) {
            //     logger.trace("event on map with pointermove!");
            //     self.onPointerMoveHandler(e);
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
        logger.trace("call MeasureArea::_initialize() : ", options);

        // liste des options
        this.options = {};
        this.options.geodesic = (typeof options.geodesic !== "undefined") ? options.geodesic : true;
        this.options.position = (typeof options.position !== "undefined") ? options.position : null;
        this.options.target = (typeof options.target !== "undefined") ? options.target : null;
        this.options.render = (typeof options.render !== "undefined") ? options.render : null;
        this.options.gutter = (typeof options.gutter !== "undefined") ? options.gutter : null;
        this.options.layerDescription = (typeof options.layerDescription !== "undefined") ? options.layerDescription : {
            title : "Mesures de surface",
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
        logger.trace("call MeasureArea::_initializeContainer() : ", this._uid);

        var container = this._createMainContainerElement(); ;

        var picto = this._pictoContainer = this._createShowMeasureAreaPictoElement();
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
        logger.trace("call MeasureArea::addMeasureEvents()");

        var map = this.getMap();

        map.on("singleclick", (e) => this.onPointerMoveHandler(e));
        map.on("pointermove", (e) => this.onPointerMoveHandler(e));
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
        logger.trace("call MeasureArea::removeMeasureEvents()");

        var map = this.getMap();

        map.un("singleclick", (e) => this.onPointerMoveHandler(e));
        map.un("pointermove", (e) => this.onPointerMoveHandler(e));
        if (this.eventLayerRemove) {
            olObservableUnByKey(this.eventLayerRemove);
        }
    }

    /**
     * Format length output.
     *
     * @param {ol.geom.Polygon} polygon - geometry polygon.
     * @return {String} The formatted output.
     * @private
     */
    format (polygon) {
        logger.trace("call MeasureArea::format()");

        var measure;
        if (this.options.geodesic) {
            var geom = polygon.clone();
            var coordinates = geom.getLinearRing(0).getCoordinates();
            measure = Math.abs(olGetAreaSphere(new Polygon([coordinates])));
        } else {
            measure = polygon.getArea();
        }

        var output;
        if (measure > 1000000) {
            output = (Math.round(measure / 1000000 * 100) / 100) + " " + "km<sup>2</sup>";
        } else if (measure > 100000) {
            output = (Math.round(measure / 1000000 * 1000) / 1000) + " " + "km<sup>2</sup>";
        } else if (measure > 1000) {
            output = (Math.round(measure / 10) * 10) + " " + "m<sup>2</sup>";
        } else {
            output = (Math.round(measure * 100) / 100) + " " + "m<sup>2</sup>";
        }
        return output;
    }

    // ################################################################### //
    // ####################### handlers events to dom #################### //
    // ################################################################### //

    /**
     * this method is called by event 'click' on picto
     *
     * @param {Object} e - HTMLElement
     *
     * @private
     */
    onShowMeasureAreaClick (e) {
        if (e.target.ariaPressed === "true") {
            this.onPanelOpen();
        }
        logger.trace("call MeasureArea::onShowMeasureAreaClick()", e);

        // appel de la methode commune
        this.onShowMeasureClick(e, "Polygon");
    }

};

// on récupère les mixins de la classe "MeasureAreaDOM" ainsi que celles
// de "Measures".
Object.assign(MeasureArea.prototype, Measures);
Object.assign(MeasureArea.prototype, MeasureAreaDOM);
Object.assign(MeasureArea.prototype, Widget);

export default MeasureArea;

// Expose MeasureArea as ol.control.MeasureArea (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.MeasureArea = MeasureArea;
}
