// import CSS
import "../../CSS/Controls/Measures/GPFmeasureLength.css";
// import "../../CSS/Controls/Measures/GPFmeasureLengthStyle.css";
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
import MeasureLengthDOM from "./MeasureLengthDOM";
// import local with ol dependencies
import MeasureToolBox from "../ToolBoxMeasure/MeasureToolBox";
import Measures from "./Measures";

// Derived from OpenLayers measure example
// http://openlayers.org/en/latest/examples/measure.html

var logger = Logger.getLogger("measurelength");

/**
 * @classdesc
 *
 * Length measurement Control. Allows users to draw a path on Openlayers map and have its length computed and displayed.
 *
 * @constructor
 * @alias ol.control.MeasureLength
 * @type {ol.control.MeasureLength}
 * @extends {ol.control.Control}
 * @param {Object} options - options for function call.
 * @param {Number} [options.id] - Ability to add an identifier on the widget (advanced option)
 * @param {Boolean} [options.geodesic = true] - If true, length will be computed on the global sphere using the {@link https://openlayers.org/en/latest/apidoc/module-ol_sphere.html#haversineDistance ol.Sphere.haversineDistance()} function. Otherwise, length will be computed on the projected plane.
 * @param {String} [options.unit] - If not specified, the measure will be displayed in m until 999m, then in km. Values possible : m or km.
 * @param {Object} [options.styles = {}] - styles used when drawing. Specified with following properties.
 * @param {Object} [options.styles.pointer = {}] - Style for mouse pointer when drawing the path. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Image-ImageStyle.html ol.style.Image} subclass object.
 * @param {Object} [options.styles.start = {}] - Line Style when drawing. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.htmll ol.style.Style} object.
 * @param {Object} [options.styles.finish = {}] - Line Style when finished drawing. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.htmll ol.style.Style} object.
 * <!-- @param {Object} [options.tooltip = {}] - NOT YET IMPLEMENTED ! -->
 * @param {Object} [options.layerDescription = {}] - Layer informations to be displayed in LayerSwitcher widget (only if a LayerSwitcher is also added to the map)
 * @param {String} [options.layerDescription.title = "Mesures de distance"] - Layer title to be displayed in LayerSwitcher
 * @param {String} [options.layerDescription.description = "Mes mesures"] - Layer description to be displayed in LayerSwitcher
 * @example
 * var measureLength = new ol.control.MeasureLength({
 *    geodesic : false
 * });
 */
var MeasureLength = class MeasureLength extends Control {

    constructor (options) {
        // options
        options = options || {};

        // call ol.control.Control constructor
        super(options);

        if (!(this instanceof MeasureLength)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        // Nom de la classe (heritage)
        this.CLASSNAME = "MeasureLength";

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
        logger.trace("call MeasureLength::_initialize() : ", options);

        // liste des options
        this.options = {};
        this.options.geodesic = (typeof options.geodesic !== "undefined") ? options.geodesic : true;
        this.options.unit = (typeof options.unit !== "undefined") ? options.unit : null;
        this.options.position = (typeof options.position !== "undefined") ? options.position : null;
        this.options.target = (typeof options.target !== "undefined") ? options.target : null;
        this.options.render = (typeof options.render !== "undefined") ? options.render : null;
        this.options.gutter = (typeof options.gutter !== "undefined") ? options.gutter : null;
        this.options.layerDescription = (typeof options.layerDescription !== "undefined") ? options.layerDescription : {
            title : "Mesures de distance",
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
        logger.trace("call MeasureLength::_initializeContainer() : ", this._uid);

        var container = this._createMainContainerElement();

        var picto = this._pictoContainer = this._createShowMeasureLengthPictoElement();
        container.appendChild(picto);

        return container;
    }

    // ################################################################### //
    // ########################## methods ################################ //
    // ################################################################### //

    /**
     * Add all events on map
     *
     * @private
     */
    addMeasureEvents () {
        logger.trace("call MeasureLength::addMeasureEvents()");

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
        logger.trace("call MeasureLength::removeMeasureEvents()");

        var map = this.getMap();

        map.un("singleclick", (e) => this.onPointerMoveHandle(e));
        map.un("pointermove", (e) => this.onPointerMoveHandler(e));
        if (this.eventLayerRemove) {
            olObservableUnByKey(this.eventLayerRemove);
        }
    }

    /**
     * Format length output.
     *
     * @param {ol.geom.Line} line - geometry line.
     * @return {String} The formatted output.
     * @private
     */
    format (line) {
        logger.trace("call MeasureLength::format()");

        var map = this.getMap();

        var measure;
        if (this.options.geodesic) {
            var coordinates = line.getCoordinates();
            measure = 0;
            var sourceProj = map.getView().getProjection();
            for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
                var c1 = olTransformProj(coordinates[i], sourceProj, "EPSG:4326");
                var c2 = olTransformProj(coordinates[i + 1], sourceProj, "EPSG:4326");
                measure += olGetDistanceSphere(c1, c2);
            }
        } else {
            measure = Math.round(line.getLength() * 100) / 100;
        }

        var output;
        // si option unit spécifiée, on force l'unité
        // sinon on est en mode automatique entre m et km.
        if (this.options.unit === "km") {
            output = (Math.round(measure / 1000 * 100) / 100) + " " + "km";
        } else if (this.options.unit === "m") {
            output = (Math.round(measure * 100) / 100) + " " + "m";
        } else {
            if (measure > 1000) {
                output = (Math.round(measure / 1000 * 100) / 100) + " " + "km";
            } else {
                output = (Math.round(measure * 100) / 100) + " " + "m";
            }
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
    onShowMeasureLengthClick (e) {
        if (e.target.ariaPressed === "true") {
            this.onPanelOpen();
        }
        logger.trace("call MeasureLength::onShowMeasureLengthClick()", e);

        // appel de la methode commune
        this.onShowMeasureClick(e, "LineString");
    }

};

// on récupère les mixins de la classe "MeasureAreaDOM" ainsi que celles
// de "Measures".
Object.assign(MeasureLength.prototype, Measures);
Object.assign(MeasureLength.prototype, MeasureLengthDOM);
Object.assign(MeasureLength.prototype, Widget);

export default MeasureLength;

// Expose MeasureLength as ol.control.MeasureLength (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.MeasureLength = MeasureLength;
}
