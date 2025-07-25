// import CSS
import "../../CSS/Controls/Isochron/GPFisochron.css";
// import "../../CSS/Controls/Isochron/GPFisochronStyle.css";
// import OpenLayers
// import Control from "ol/control/Control";
import Widget from "../Widget";
import Control from "../Control";
import { unByKey as olObservableUnByKey } from "ol/Observable";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
// import GeoJSON from "ol/format/GeoJSON";
import {
    Fill,
    Stroke,
    Style
} from "ol/style";
// import geoportal library access
import Gp from "geoportal-access-lib";
// import local
import Utils from "../../Utils/Helper";
import Logger from "../../Utils/LoggerByDefault";
import SelectorID from "../../Utils/SelectorID";
import Markers from "../Utils/Markers";
import Draggable from "../../Utils/Draggable";
import Interactions from "../Utils/Interactions";
import MathUtils from "../../Utils/MathUtils";
// import local with ol dependencies
import LayerSwitcher from "../LayerSwitcher/LayerSwitcher";
import LocationSelector from "../LocationSelector/LocationSelector";
import ButtonExport from "../Export/Export";
import GeoJSONExtended from "../../Formats/GeoJSON";
import checkDsfr from "../Utils/CheckDsfr";

// DOM
import IsocurveDOM from "./IsocurveDOM";

var logger = Logger.getLogger("isocurve");

/**
 * @classdesc
 *
 * Isocurve Control.
 *
 * @constructor
 * @alias ol.control.Isocurve
 * @type {ol.control.Isocurve}
 * @extends {ol.control.Control}
 * @param {Object} options - Isocurve control options
 * @param {Number} [options.id] - Ability to add an identifier on the widget (advanced option)
 * @param {String} [options.apiKey] - API key for services call (isocurve and autocomplete services). The key "calcul" is used by default.
 * @param {Boolean} [options.ssl = true] - use of ssl or not (default true, service requested using https protocol)
 * @param {Boolean} [options.collapsed = true] - Specify if widget has to be collapsed (true) or not (false) on map loading. Default is true.
 * @param {Boolean} [options.draggable = false] - Specify if widget is draggable
 * @param {Boolean|Object} [options.export = false] - Specify if button "Export" is displayed. For the use of the options of the "Export" control, see {@link packages/Controls/Export/Export.default}
 * @param {Object}  [options.exclusions = {"toll" : false, "tunnel" : false, "bridge" : false}] - list of exclusions with status (true = checked). By default : no exclusions checked.
 * @param {Array}   [options.graphs = ["Voiture", "Pieton"]] - list of graph resources to be used for isocurve calculation, by default : ["Voiture", "Pieton"]. Possible values are "Voiture" and "Pieton". The first element is selected.
 * @param {Array}   [options.methods = ["time", "distance"]] - list of methods, by default : ["time", "distance"]. Possible values are "time" and "distance". The first element is selected by default.
 * @param {Array}   [options.directions = ["departure", "arrival"]] - list of directions to be displayed, by default : ["departure", "arrival"]. The first element is selected by default. Possible values are "departure" and "arrival".
 *      Directions enable to specify if input location point will be used as a departure point ("departure") or as an arrival point ("arrival")
 * @param {Object} [options.isocurveOptions = {}] - isocurve service options. see {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~isoCurve Gp.Services.isoCurve()} to know all isocurve options.
 * @param {Object} [options.autocompleteOptions = {}] - autocomplete service options. see {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~autoComplete Gp.Services.autoComplete()} to know all autocomplete options
 * @param {Object} [options.markerOpts] - options to use your own marker. Default is a lightOrange marker.
 * @param {String} [options.markerOpts.url] - marker base64 encoded url (ex "data:image/png;base64,...""). Mandatory for a custom marker
 * @param {Array} [options.markerOpts.offset] - Offsets in pixels used when positioning the overlay. The first element in the array is the horizontal offset. A positive value shifts the overlay right. The second element in the array is the vertical offset. A positive value shifts the overlay down. Default is [0, 0]. (see http://openlayers.org/en/latest/apidoc/ol.Overlay.html)
 * @param {Object} [options.layerDescription = {}] - Layer informations to be displayed in LayerSwitcher widget (only if a LayerSwitcher is also added to the map)
 * @param {String} [options.layerDescription.title = "Isochrone/Isodistance"] - Layer title to be displayed in LayerSwitcher
 * @param {String} [options.layerDescription.description = "isochrone/isodistance basé sur un graphe"] - Layer description to be displayed in LayerSwitcher
 * @fires isocurve:drawstart
 * @fires isocurve:drawend
 * @fires isocurve:compute
 * @fires export:compute
 * @example
 *  var iso = ol.control.Isocurve({
 *      "collapsed" : false,
 *      "draggable" : true,
 *      "export"    : false,
 *      "methods" : ["time", "distance"],
 *      "exclusions" : {
 *         "toll" : true,
 *         "bridge" : false,
 *         "tunnel" : true
 *      },
 *      "graphs" : ["Pieton", "Voiture"],
 *      "markerOpts" : {
 *          "url" : "...",
 *          "offset" : [0,0]
 *      }
 *      "isocurveOptions" : {},
 *      "autocompleteOptions" : {}
 *  });
 *
 *  // if you want to pluggued the control Export with options :
 *  var iso = new ol.control.Isocurve({
 *    export : {
 *      name : "export",
 *      format : "geojson",
 *      title : "Exporter",
 *      menu : false
 *    }
 *  });
 */
class Isocurve extends Control {

    /**
     * See {@link ol.control.Isocurve}
     * @module Isocurve
     * @alias module:~controls/Isocurve
     * @param {*} options - options
     * @example
     * import Isocurve from from "gpf-ext-ol/controls/Isocurve"
     * ou
     * import { Isocurve } from "gpf-ext-ol"
     */
    constructor (options) {
        options = options || {};

        // call ol.control.Control constructor
        super(options);

        if (!(this instanceof Isocurve)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }
        /**
         * Nom de la classe (heritage)
         * @private
         */
        this.CLASSNAME = "Isocurve";
        // initialisation du composant
        this.initialize(options);

        // // Widget main DOM container
        this._container = this._createMainContainerElement();

        // ajout du container
        (this.element) ? this.element.appendChild(this._container) : this.element = this._container;

        return this;
    }

    /**
     * Overwrite OpenLayers setMap method
     *
     * @param {ol.Map} map - Map.
     */
    setMap (map) {
        if (map) {
            // enrichissement du DOM du container lors de l'ajout à la carte
            this._container = this._initContainer(map);

            // ajout d'un bouton d'export
            if (this.options.export) {
                var opts = Utils.assign({ control : this }, this.options.export);
                this.export = new ButtonExport(opts);
                this.export.render();
                var self = this;
                this.export.on("button:clicked", (e) => {
                    self.dispatchEvent({
                        type : "export:compute",
                        content : e.content
                    });
                });
            }

            // mode "draggable"
            if (this.draggable) {
                Draggable.dragElement(
                    this._IsoPanelContainer,
                    this._IsoPanelHeaderContainer,
                    map.getTargetElement()
                );
            }

            // mode "collapsed"
            if (!this.collapsed) {
                this._pictoIsoButton.setAttribute("aria-pressed", true);
            }
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

    // ################################################################### //
    // ##################### public methods ############################## //
    // ################################################################### //

    /**
     * Returns true if widget is collapsed (minimized), false otherwise
     *
     * @returns {Boolean} collapsed - true if widget is collapsed
     */
    getCollapsed () {
        return this.collapsed;
    }

    /**
     * Collapse or display widget main container
     *
     * @param {Boolean} collapsed - True to collapse widget, False to display it
     */
    setCollapsed (collapsed) {
        if (collapsed === undefined) {
            logger.log("[ERROR] Isocurve:setCollapsed - missing collapsed parameter");
            return;
        }
        if ((collapsed && this.collapsed) || (!collapsed && !this.collapsed)) {
            return;
        }
        if (collapsed) {
            document.getElementById("GPisochronPanelClose-" + this._uid).click();
        } else {
            this._pictoIsoButton.click();
        }
        this.collapsed = collapsed;
    }

    /**
     * Get vector layer where Isocurve geometry is drawn
     *
     * @returns {Object} layer - ol.layer.Vector isocurve layer
     */
    getLayer () {
        return this._geojsonLayer;
    }

    /**
     * Set vector layer where Isocurve geometry is drawn
     *
     * @param {Object} layer - ol.layer.Vector isocurve layer
     */
    setLayer (layer) {
        if (!layer) {
            this._geojsonLayer = null;
            return;
        }

        if (!(layer instanceof VectorLayer)) {
            logger.log("no valid layer given for hosting drawn features.");
            return;
        }

        // application des styles
        layer.setStyle(this._defaultFeatureStyle);

        // sauvegarde
        this._geojsonLayer = layer;
    }

    /**
     * Get vector layer
     *
     * @returns {String} geojson - GeoJSON format layer
     */
    getGeoJSON () {
        return JSON.stringify(this._geojsonObject);
    }

    /**
     * Set vector layer
     *
     * @param {String} geojson - GeoJSON format layer
     */
    setGeoJSON (geojson) {
        try {
            this._geojsonObject = JSON.parse(geojson);
        } catch (e) {
            logger.log("no valid geojson given :" + e.message);
        }
    }

    /**
     * Get isocurve data
     *
     * @returns {Object} data - process results
     */
    getData () {
        var data = {
            type : "isocurve",
            transport : this._currentTransport,
            computation : this._currentComputation,
            exclusions : this._currentExclusions,
            direction : this._currentDirection,
            point : this._originPoint.getCoordinate(), // lon/lat wgs84
            results : {}
        };
        Utils.assign(data.results, this._currentIsoResults);
        return data;
    }

    /**
     * Set isocurve data
     *
     * @param {Object} data - control informations
     * @param {String} data.transport - transport type
     * @param {String} data.computation - computation type
     * @param {Array} data.exclusions - list of exclusions
     * @param {String} data.direction - direction type
     * @param {Array} data.point - [lon, lat]
     * @param {Object} data.results - service response
     */
    setData (data) {
        this._currentTransport = data.transport;
        this._currentComputation = data.computation;
        this._currentExclusions = data.exclusions;
        this._currentDirection = data.direction;
        // INFO
        // > this._originPoint.clear();
        // l'utilisation de cette méthode declenche des evenements qui retirent la couche en cours !
        // (cf. _createIsoPanelFormPointElement),
        var inputPointer = document.getElementById("GPlocationOriginPointer_" + 1 + "-" + this._uid);
        inputPointer.checked = true;
        var inputCoordsDOM = document.getElementById("GPlocationOrigin_" + 1 + "-" + this._uid);
        var inputCoords = document.getElementById("GPlocationOriginCoords_" + 1 + "-" + this._uid);
        inputCoords.value = data.point;
        inputCoordsDOM.value = data.point[1].toFixed(4) + " / " + data.point[0].toFixed(4);
        this._originPoint.setCoordinate(data.point, "EPSG:4326");
        this._currentIsoResults = data.results;
    }

    /**
     * Get container
     *
     * @returns {DOMElement} container
     */
    getContainer () {
        return this._container;
    }

    /**
     * Get default style
     *
     * @returns {ol.style} style
     */
    getStyle () {
        return this._defaultFeatureStyle;
    }

    /**
     * This method is public.
     * It allows to control the execution of a traitment.
     *
     * @param {Array} position - position in the projection map [ x, y ]
     * @param {Object} value - distance in km or hours-minutes
     * @param {Object} options - options = {...}
     */
    compute (position, value, options) {
        this._clear();

        var opened = this._pictoIsoButton.ariaPressed;
        if (!(opened === "true")) {
            this._pictoIsoButton.click();
        }

        var map = this.getMap();
        if (!map) {
            return;
        }

        // Les options par defauts
        var settings = {
            direction : "departure",
            method : "time",
            transport : "Voiture",
            exclusions : []
        };

        // On recupere les options
        Utils.assign(settings, options);

        this._originPoint.setCoordinate(position);
        var coordinate = this._originPoint.getCoordinate();

        var input = document.getElementById("GPlocationOrigin_" + 1 + "-" + this._uid);
        input.value = coordinate[0].toFixed(4) + " / " + coordinate[1].toFixed(4);

        this._currentTransport = settings.transport;
        if (settings.transport === "Voiture") {
            document.getElementById("GPisochronTransportCar-" + this._uid).checked = true;
        } else {
            document.getElementById("GPisochronTransportPedestrian-" + this._uid).checked = true;
        }

        this._currentExclusions = settings.exclusions;

        this._currentComputation = settings.method;
        if (settings.method === "time") {
            var time = value.split(".");
            this._currentTimeHour = time[0] || 0;
            document.getElementById("GPisochronValueChronInput1-" + this._uid).value = this._currentTimeHour;
            this._currentTimeMinute = time[1] || 0;
            document.getElementById("GPisochronValueChronInput2-" + this._uid).value = this._currentTimeMinute;
            document.getElementById("GPisochronChoiceAltChron-" + this._uid).click();
        } else {
            this._currentDistance = value;
            document.getElementById("GPisochronValueDistInput-" + this._uid).value = this._currentDistance;
            document.getElementById("GPisochronChoiceAltDist-" + this._uid).click();
        }

        this._currentDirection = settings.direction;
        (settings.direction === "departure")
            ? document.getElementById("GPisochronDirectionSelect-" + this._uid).selectedIndex = 0 : document.getElementById("GPisochronDirectionSelect-" + this._uid).selectedIndex = 1;

        this.onIsoComputationSubmit();
    }

    /**
     * This method is public.
     * It allows to init the control.
     */
    init () {
        // point
        var coordinate = this._originPoint.getCoordinate();

        var input = document.getElementById("GPlocationOrigin_" + 1 + "-" + this._uid);
        input.value = coordinate[1].toFixed(4) + " / " + coordinate[0].toFixed(4);

        // transport
        if (this._currentTransport === "Voiture") {
            document.getElementById("GPisochronTransportCar-" + this._uid).checked = true;
        } else {
            document.getElementById("GPisochronTransportPedestrian-" + this._uid).checked = true;
        }

        // method
        if (this._currentComputation === "time") {
            var minutes = this._currentIsoResults.time / 60;
            this._currentTimeHour = Math.floor(minutes / 60);
            document.getElementById("GPisochronValueChronInput1-" + this._uid).value = this._currentTimeHour;
            this._currentTimeMinute = Math.round(((minutes / 60) - this._currentTimeHour) * 60);
            document.getElementById("GPisochronValueChronInput2-" + this._uid).value = this._currentTimeMinute;
            document.getElementById("GPisochronChoiceAltChron-" + this._uid).click();
        } else {
            this._currentDistance = this._currentIsoResults.distance / 1000;
            document.getElementById("GPisochronValueDistInput-" + this._uid).value = this._currentDistance;
            document.getElementById("GPisochronChoiceAltDist-" + this._uid).click();
        }

        // direction
        (this._currentDirection === "departure")
            ? document.getElementById("GPisochronDirectionSelect-" + this._uid).selectedIndex = 0 : document.getElementById("GPisochronDirectionSelect-" + this._uid).selectedIndex = 1;
        
        this._fillIsoResultsDetails(this._currentIsoResults, {
            graph : this._currentTransport,
            exclusions : this._currentExclusions,
            method : this._currentComputation
        });
    }

    /**
     * Clean UI : reinit control
     */
    clean () {
        this._clearIsoInputs();
        // INFO
        // le comportement est surchargé, ceci supprime la couche !?
        // cf. _createIsoPanelFormPointElement()
        this._originPoint.clearResults();
        document.getElementById("GPlocationPoint_1-" + this._uid).style.cssText = "";
        document.getElementById("GPlocationOriginCoords_1-" + this._uid).value = "";
        document.getElementById("GPlocationOrigin_1-" + this._uid).value = "";
        document.getElementById("GPlocationPoint_1-" + this._uid).style.cssText = "";
        document.getElementById("GPlocationOriginPointer_1-" + this._uid).checked = false;
        document.getElementById("GPlocationOrigin_1-" + this._uid).className = "GPlocationOriginVisible gpf-visible";
        document.getElementById("GPlocationOriginCoords_1-" + this._uid).className = "GPlocationOriginHidden gpf-hidden";
        this._currentIsoResults = null;
        this.setLayer();

        this._resultsIsoContainer.className = "GPelementHidden gpf-hidden";
        this._formContainer.className = "gpf-panel__content fr-modal__content";
    }

    // ################################################################### //
    // ##################### init component ############################## //
    // ################################################################### //

    /**
     * Initialize Isocurve control (called by Isocurve constructor)
     *
     * @param {Object} options - constructor options
     * @private
     */
    initialize (options) {
        this._checkInputOptions(options);

        // set default options
        this.options = {
            collapsed : true,
            draggable : false,
            export : false,
            methods : ["time", "distance"],
            graphs : ["Pieton", "Voiture"],
            exclusions : {
                toll : false,
                tunnel : false,
                bridge : false
            },
            directions : ["departure", "arrival"],
            markerOpts : {
                url : Markers["lightOrange"],
                offset : Markers.defaultOffset
            },
            isocurveOptions : {},
            autocompleteOptions : {},
            layerDescription : {
                title : "Isochrone/Isodistance",
                description : "isochrone/isodistance basé sur un graphe"
            }
        };

        // merge with user options
        Utils.assign(this.options, options);

        /** {Boolean} specify if isocurve control is collapsed (true) or not (false) */
        this.collapsed = this.options.collapsed;

        /** {Boolean} specify if isocurve control is draggable (true) or not (false) */
        this.draggable = this.options.draggable;

        // identifiant du contrôle : utile pour suffixer les identifiants CSS (pour gérer le cas où il y en a plusieurs dans la même page)
        this._uid = this.options.id || SelectorID.generate();

        // Options du service paramétrables via l'interface (graph, method, exclusions)
        // Mode de transport selectionné : 'Voiture' ou 'Pieton'
        this._currentTransport = null;
        this._initTransport();
        // Mode de calcul selectionné : 'time' (isochron) ou 'distance' (isodistance)
        this._currentComputation = null;
        this._initComputation();
        // Exclusions selectionnées : Tunnel, Toll et Bridge
        this._currentExclusions = [];
        this._initExclusions();
        // sens de parcours : "departure" ou "arrival"
        this._currentDirection = null;
        this._initDirection();

        // point de saisie
        this._originPoint = null;

        // containers principaux
        this._pictoIsoButton = null;
        this._waitingContainer = null;
        this._formContainer = null;
        this._resultsIsoContainer = null;
        this._IsoPanelContainer = null;
        this._IsoPanelHeaderContainer = null;

        // les résultats du calcul
        this._currentIsoResults = null;

        // la géométrie
        this._geojsonLayer = null;
        this._geojsonObject = null;

        // bouton export
        this.export = null;

        // si un calcul est en cours ou non
        this._waiting = false;
        // timer pour cacher la patience après un certain temps
        this._timer = null;

        // styles pour les sélections des features
        this._defaultFeatureStyle = new Style({
            fill : new Fill({
                color : "rgba(0, 183, 152, 0.7)"
            }),
            stroke : new Stroke({
                color : "rgba(0, 183, 152, 0)",
                width : 1
            })
        });

        // liste des ressources avec droits par service
        // Ex. {
        //   "Isocurve" : {
        //       key : "ger4g456re45er456t4er5ge5",
        //       resources : ["Pieton", "Voiture"]
        //   }
        // }
        this._resources = {};

        // listener key for event click on map
        this.listenerKey = null;
    }

    /**
     * this method is called by this.initialize()
     *
     * @param {Object} options - options
     *
     * @private
     */
    _checkInputOptions (options) {
        // vérification des options
        // on ne permet pas de n'afficher aucun mode de calcul ou aucun mode de transport ?
        var i;

        // modes de calcul
        if (options.methods) {
            if (Array.isArray(options.methods)) {
                // on ne permet pas de passer un tableau vide : on spécifie au moins une méthode
                if (options.methods.length === 0) {
                    options.methods = null;
                } else {
                    for (i = 0; i < options.methods.length; i++) {
                        if (typeof options.methods[i] !== "string") {
                            logger.log("[ol.control.Isocurve] ERROR : parameter 'methods' elements should be of type 'string'");
                        }
                    }
                }
            } else {
                logger.warn("'methods' parameter should be an array");
                options.methods = null;
            }
        }

        // mode de transport
        if (options.graphs) {
            if (Array.isArray(options.graphs)) {
                // on ne permet pas de passer un tableau vide : on spécifie au moins un graph
                if (options.graphs.length === 0) {
                    options.graphs = null;
                } else {
                    for (i = 0; i < options.graphs.length; i++) {
                        if (typeof options.graphs[i] !== "string") {
                            logger.log("[ol.control.Isocurve] ERROR : parameter 'graphs' elements should be of type 'string'");
                        } else {
                            if (options.graphs[i].toLowerCase() === "pieton") {
                                options.graphs[i] = "Pieton";
                            }
                            if (options.graphs[i].toLowerCase() === "voiture") {
                                options.graphs[i] = "Voiture";
                            }
                        }
                    }
                }
            } else {
                logger.warn("'graphs' parameter should be an array");
                options.graphs = null;
            }
        }

        // sens du parcours
        if (options.directions) {
            if (Array.isArray(options.directions)) {
                // on ne permet pas de passer un tableau vide : on spécifie au moins une direction
                if (options.directions.length === 0) {
                    options.directions = null;
                } else {
                    for (i = 0; i < options.directions.length; i++) {
                        if (typeof options.directions[i] !== "string") {
                            logger.log("[ol.control.Isocurve] ERROR : parameter 'directions' elements should be of type 'string'");
                        }
                    }
                }
            } else {
                logger.warn("'directions' parameter should be an array");
                options.directions = null;
            }
        }

        // collapsed
        if (options.collapsed === "true") {
            options.collapsed = true;
        }
        if (options.collapsed === "false") {
            options.collapsed = false;
        }
    }

    /**
     * this method is called by this.initialize() and initialize transport mode
     * ("Voiture" ou "Pieton")
     *
     * @private
     */
    _initTransport () {
        // Mode de transport selectionné
        this._currentTransport = "Piéton"; // par defaut

        // par defaut
        var transports = this.options.graphs;
        if (!transports || transports.length === 0) {
            this.options.graphs = ["Pieton", "Voiture"];
        }

        // option
        if (Array.isArray(transports) && transports.length) {
            // FIXME pb si le 1er graphe n'est pas une ressource connue !
            if (transports[0] === "Voiture" || transports[0] === "Pieton") {
                this._currentTransport = transports[0];
            }
        }

        // si l'utilisateur a spécifié un graph dans le service, on surcharge les options du widget
        var serviceOptions = this.options.isocurveOptions;
        if (serviceOptions.graph) {
            this._currentTransport = serviceOptions.graph;
        }
    }

    /**
     * this method is called by this.initialize() and initialize computation mode
     * (time or distance)
     *
     * @private
     */
    _initComputation () {
        // Mode de calcul selectionné
        this._currentComputation = "time"; // par defaut

        // par defaut
        var methods = this.options.methods;
        if (!methods || methods.length === 0) {
            this.options.methods = ["time", "distance"];
        }

        // option
        if (Array.isArray(methods) && methods.length) {
            // FIXME pb si le 1er graphe n'est pas une ressource connue !
            if (methods[0] === "time" || methods[0] === "distance") {
                this._currentComputation = methods[0];
            }
        }

        // si l'utilisateur a spécifié une méthode dans le service, on surcharge les options du widget
        var serviceOptions = this.options.isocurveOptions;
        if (serviceOptions.method) {
            this._currentComputation = serviceOptions.method;
        }
        if (serviceOptions.time) {
            this._currentComputation = "time";
        }
        if (serviceOptions.distance) {
            this._currentComputation = "distance";
        }
    }

    /**
     * this method is called by this.initialize() and initialize direction mode
     * (departure or arrival)
     *
     * @private
     */
    _initDirection () {
        // Mode de calcul selectionné
        this._currentDirection = "departure"; // par defaut

        // par defaut
        var directions = this.options.directions;
        if (!directions || directions.length === 0) {
            this.options.directions = ["departure", "arrival"];
        }

        // option
        if (Array.isArray(directions) && directions.length) {
            // FIXME pb si le 1er graphe n'est pas une ressource connue !
            if (directions[0] === "departure" || directions[0] === "arrival") {
                this._currentDirection = directions[0];
            }
        }

        // si l'utilisateur a spécifié une méthode dans le service, on surcharge les options du widget
        var serviceOptions = this.options.isocurveOptions;
        if (!serviceOptions.reverse) {
            this._currentDirection = "departure";
        }
        if (serviceOptions.reverse === true) {
            this._currentDirection = "arrival";
            this.options.directions = ["arrival", "departure"];
        }
    }

    /**
     * this method is called by this.initialize() and initialize exclusions
     *
     * @private
     */
    _initExclusions () {
        // Exclusions selectionnées : Tunnel, Toll et Bridge
        this._currentExclusions = []; // par defaut

        // par defaut
        var exclusion = this.options.exclusions;
        if (!exclusion || (typeof exclusion === "object" && Object.keys(exclusion).length === 0)) {
            this.options.exclusions = {
                toll : false,
                tunnel : false,
                bridge : false
            };
        }

        // option
        if (exclusion && typeof exclusion === "object" && Object.keys(exclusion).length) {
            for (var k in exclusion) {
                if (exclusion.hasOwnProperty(k)) {
                    if (exclusion.k) {
                        this._currentExclusions.push(k);
                    }
                }
            }
        }

        // si l'utilisateur a spécifié des exclusions dans le service, on surcharge les options du widget
        var serviceOptions = this.options.isocurveOptions;
        if (Array.isArray(serviceOptions.exclusions)) {
            this._currentExclusions = serviceOptions.exclusions;
        }
    }

    // ################################################################### //
    // ######################## DOM initialize ########################### //
    // ################################################################### //

    /**
     * initialize component container (DOM)
     *
     * @param {Object} map - the map
     *
     * @returns {DOMElement} DOM element
     *
     * @private
     */
    _initContainer (map) {
        // get main container
        var container = this._container;
        if (container.childElementCount > 0) {
            return container;
        }

        var picto = this._pictoIsoButton = this._createShowIsoPictoElement();
        container.appendChild(picto);

        // panneau
        var panel = this._IsoPanelContainer = this._createIsoPanelElement();
        var panelDiv = this._createIsoPanelDivElement();
        panel.appendChild(panelDiv);

        // header
        var header = this._IsoPanelHeaderContainer = this._createIsoPanelHeaderElement();
        panelDiv.appendChild(header);

        // form
        var form = this._formContainer = this._createIsoPanelFormElement();

        form.appendChild(this._createIsoPanelFormModeChoiceTransportElement(this.options.graphs));

        // form: input de saisie de la localisation (fonction de Isocurve, voir ci-dessous)
        form.appendChild(this._createIsoPanelFormPointLabel());
        var point = this._createIsoPanelFormPointElement(map);
        form.appendChild(point);

        var isoChronChecked = false;
        var isoDistChecked = false;
        var typeChoice = this._createIsoPanelFormTypeChoiceElement();
        for (var i = 0; i < this.options.methods.length; i++) {
            if (this.options.methods[i] === "time") {
                isoChronChecked = (i === 0);
                typeChoice.appendChild(this._createIsoPanelFormTypeChoiceChronElement(isoChronChecked));
            }
            if (this.options.methods[i] === "distance") {
                isoDistChecked = (i === 0);
                typeChoice.appendChild(this._createIsoPanelFormTypeChoiceDistElement(isoDistChecked));
            }
        }
        form.appendChild(typeChoice);

        // form: menu du choix des valeurs
        form.appendChild(this._createIsoPanelFormLabelIsochronElement(isoChronChecked));
        form.appendChild(this._createIsoPanelFormValueIsochronElement(isoChronChecked));
        form.appendChild(this._createIsoPanelFormLabelIsodistanceElement(isoDistChecked));
        form.appendChild(this._createIsoPanelFormValueIsodistanceElement(isoDistChecked));

        // FIXME : doit on passer le paramètre defaultDirection ?
        form.appendChild(this._createIsoPanelFormModeChoiceDirectionElement(this.options.directions));

        // form: menu des exclusions
        if (this.options.exclusions && (typeof this.options.exclusions === "object") && (Object.keys(this.options.exclusions).length !== 0)) {
            form.appendChild(this._createShowIsoExclusionsPictoElement());
            var exclusion = this._createIsoPanelFormExclusionsElement();
            exclusion.appendChild(this._createIsoPanelFormExclusionOptionsElement(this.options.exclusions));
            form.appendChild(exclusion);
        }

        // footer
        var footer = this._createIsoPanelFooterElement();
        form.appendChild(footer);

        if (!checkDsfr()) {
            var buttonReset = this._createIsoFormResetElement();
            footer.appendChild(buttonReset);
        }

        // form: bouton du calcul
        var buttonSubmit = this._submitContainer = this._createIsoSubmitFormElement();
        footer.appendChild(buttonSubmit);

        panelDiv.appendChild(form);

        // panel results
        var isoResults = this._resultsIsoContainer = this._createIsoPanelResultsElement();
        panelDiv.appendChild(isoResults);

        var plugin = this._createDrawingButtonsPluginDiv();
        panelDiv.appendChild(plugin);
        
        // waiting
        var waiting = this._waitingContainer = this._createIsoWaitingElement();
        panel.appendChild(waiting);

        container.appendChild(panel);

        // hide autocomplete suggested locations on container click
        if (container.addEventListener) {
            container.addEventListener("click", (e) => this._hideIsoSuggestedLocations(e));
        }

        return container;
    }

    /**
     * Create start point
     *
     * @param {Object} map - the map
     *
     * @returns {Object} DOM element
     * @private
     */
    _createIsoPanelFormPointElement (map) {
        this._originPoint = new LocationSelector({
            apiKey : this.options.apiKey || null,
            tag : {
                id : 1,
                groupId : this._uid,
                markerOpts : this.options.markerOpts,
                display : true
            },
            autocompleteOptions : this.options.autocompleteOptions || null
        });
        this._originPoint.setMap(map);
        // a la sélection d'un nouveau point, on réinitialise aussi le tracé
        var self = this;
        // click sur le pointer
        document.getElementById("GPlocationOriginPointerImg_1-" + this._uid).onclick = function () {
            self._clearGeojsonLayer();
            var map = self.getMap();
            if (self._originPoint._inputShowPointerContainer.checked) {
                // au click sur l'input pour pointer sur la carte: on minimise le formulaire
                self._formContainer.className = "GPisochronFormMini gpf-panel__content fr-modal__content";
                // et au clic sur la carte, on réaffichera le formulaire "normal"
                this.listenerKey = map.on(
                    "click",
                    () => {
                        self._formContainer.className = "gpf-panel__content fr-modal__content";
                        self.dispatchEvent("isocurve:drawend");
                    }
                );
            } else {
                // si on déselectionne le pointer, on rétablit le formulaire en mode normal
                self._formContainer.className = "gpf-panel__content fr-modal__content";
                // et on enlève l'écouteur d'évènement sur la carte
                // map.un("click", () => { self._formContainer.className = ""; });
                olObservableUnByKey(this.listenerKey);
            }
            /**
            * event triggered at the start of drawing input
            *
            * @event isocurve:drawstart
            */
            self.dispatchEvent("isocurve:drawstart");
        };
        // click sur le label
        document.getElementById("GPlocationOriginLabel_1-" + this._uid).onclick = function () {
            self._clearGeojsonLayer();
            self._formContainer.className = "gpf-panel__content fr-modal__content";
            // on désactive l'écouteur d'événements sur la carte (pour ne pas placer un marker au clic)
            map.un(
                "click",
                () => {
                    self._formContainer.className = "gpf-panel__content fr-modal__content";
                }
            );
            self.dispatchEvent("isocurve:drawend");
        };
        // click sur la zone de saisie
        document.getElementById("GPlocationOrigin_1-" + this._uid).onclick = function () {
            self._clearGeojsonLayer();
            /**
            * event triggered at the end of drawing input
            *
            * @event isocurve:drawend
            */
            self.dispatchEvent("isocurve:drawend");
        };
        return this._originPoint._container;
    }

    // ################################################################### //
    // ####################### handlers events to dom #################### //
    // ################################################################### //

    /**
     * this method is called by event 'submit' on 'GPisochronForm' tag form
     * (cf. this._createIsoPanelFormElement),
     * and call isocurve service to display results
     *
     * @private
     */
    onIsoComputationSubmit () {
        // si on n'a pas de valeur récupérée pour notre point origine, on ne fait rien
        if (!this._originPoint || !this._originPoint.getCoordinate || !this._originPoint.getCoordinate()) {
            logger.log("[Isocurve] Missing position parameter to submit isocurve request");
            return;
        }

        // récupération de l'origine
        var positionCoordinates = this._originPoint.getCoordinate();
        var position = {
            x : positionCoordinates[0].toFixed(5),
            y : positionCoordinates[1].toFixed(5)
        };
        logger.log("origin : ", position);

        // récupération du temps ou de la distance
        var time;
        var distance;
        if (this._currentComputation.toLowerCase() === "time") {
            var timeHourInput = document.getElementById("GPisochronValueChronInput1-" + this._uid);
            var hours = parseInt(timeHourInput.value, 10);
            if (isNaN && isNaN(hours)) {
                hours = 0;
            }
            var timeMinutesInput = document.getElementById("GPisochronValueChronInput2-" + this._uid);
            var minutes = parseInt(timeMinutesInput.value, 10);
            if (isNaN && isNaN(minutes)) {
                minutes = 0;
            }
            // durée exprimée en secondes
            time = hours * 3600 + minutes * 60;
            logger.log("time : " + time);
        }
        if (this._currentComputation.toLowerCase() === "distance") {
            var distInput = document.getElementById("GPisochronValueDistInput-" + this._uid);
            // distance exprimée en mètres
            distance = parseFloat(distInput.value) * 1000;
            logger.log("distance : " + distance);
        }

        // si on n'a pas de valeur de calcul renseignée, on ne lance pas la requête.
        if (!time && !distance) {
            logger.log("[Isocurve] Missing time or distance parameter to submit isocurve request");
            return;
        }

        // on recupere les éventuelles options du service passées par l'utilisateur
        var options = this.options.isocurveOptions || {};

        // gestion du protocole et du timeout
        // le timeout est indispensable sur le protocole JSONP.
        var _protocol = options.protocol || "XHR";
        var _timeout = options.timeOut || 0;
        if (_protocol === "JSONP" && _timeout === 0) {
            // FIXME le timeout est obligatoire pour ce type de protocole...
            _timeout = 15000;
        }

        // gestion des callback
        var bOnFailure = !!(options.onFailure !== null && typeof options.onFailure === "function"); // cast variable to boolean
        var bOnSuccess = !!(options.onSuccess !== null && typeof options.onSuccess === "function");

        // on met en place l'affichage des resultats dans la fenetre de resultats.
        var context = this;
        var isoRequestOptions = {
            position : position,
            graph : options.graph || this._currentTransport,
            exclusions : options.exclusions || this._currentExclusions,
            method : options.method || this._currentComputation,
            smoothing : options.smoothing || true,
            timeOut : _timeout,
            protocol : _protocol,
            resource : options.resource,
            // callback onSuccess
            onSuccess : function (results) {
                logger.log(results);
                if (results) {
                    context._fillIsoResultsDetails(results, isoRequestOptions);
                    context._drawIsoResults(results);
                }
                if (bOnSuccess) {
                    options.onSuccess.call(context, results);
                }
            },
            // callback onFailure
            onFailure : function (error) {
                // FIXME mise à jour du controle mais le service ne repond pas en 200 !?
                context._hideWaitingContainer();
                logger.log(error.message);
                if (bOnFailure) {
                    options.onFailure.call(context, error);
                }
            }
        };
        if ((this._currentDirection.toLowerCase() === "arrival") || (options.reverse)) {
            isoRequestOptions.reverse = true;
        }
        if (time) {
            isoRequestOptions.time = time;
        }
        if (distance) {
            isoRequestOptions.distance = distance;
        }

        this._requestIsoCurve(isoRequestOptions);
    }

    /**
     * this method is called by event 'click' on 'GPshowIsochronPicto' picto
     * (cf. this._createShowIsoPictoElement),
     * and clear inputs and previous isocurve drawings
     *
     * @param { event } e évènement associé au clic
     * @private
     */
    onShowIsoPanelClick (e) {
        var opened = this._pictoIsoButton.ariaPressed;
        if (opened === "true") {
            this.onPanelOpen();
        }

        var map = this.getMap();
        // on supprime toutes les interactions
        Interactions.unset(map);
        this.collapsed = !(opened === "true");
        // on génère nous même l'evenement OpenLayers de changement de propriété
        // (utiliser ol.control.Isocurve.on("change:collapsed", function ) pour s'abonner à cet évènement)
        this.dispatchEvent("change:collapsed");
        // on recalcule la position
        if (this.options.position && !this.collapsed) {
            this.updatePosition(this.options.position);
        }
    }

    /**
     * this method is called by event 'change' on 'GPisochronChoiceAltDist' or 'GPisochronChoiceAltChron'
     * input (cf. this._createIsoPanelFormTypeChoiceElement),
     * and updates current computation mode
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    onIsoTypeChoiceChange (e) {
        var value = e.target.value;
        if (!value) {
            return;
        }
        if (value === "isodistance") {
            this._currentComputation = "distance";
        }
        if (value === "isochron") {
            this._currentComputation = "time";
        }
    }

    /**
     * this method is called by event 'click' on 'GPisochronTransportPedestrian' or 'GPisochronTransportCar'
     * input (cf. this._createIsoPanelFormModeChoiceTransportElement),
     * and updates current transport mode
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    onIsoModeTransportChange (e) {
        var value = e.target.value;
        if (!value) {
            return;
        }
        this._currentTransport = value;
    }

    /**
     * this method is called by event 'change' on 'GPisochronDirectionSelect' select
     * (cf. this._createIsoPanelFormModeChoiceDirectionElement),
     * and updates current direction mode
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    onIsoModeDirectionChange (e) {
        var value = e.target.value;
        if (!value) {
            return;
        }
        if (value.toLowerCase() === "arrival") {
            document.getElementById("GPisochronPointLabelP-" + this._uid).innerHTML = "Arrivée";
        } else {
            document.getElementById("GPisochronPointLabelP-" + this._uid).innerHTML = "Départ";
        }
        this._currentDirection = value;
    }

    /**
     * this method is called by event 'change' on 'GPIsoExclusionsToll'
     * or 'GPIsoeExclusionsTunnel' or 'GPIsoExclusionsBridge' tag input
     * (cf. this._createIsoPanelFormExclusionOptionsElement).
     * this value is saved as a parameter for the service isocurve.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    onIsoExclusionsChange (e) {
        var value = e.target.value;
        var checked = e.target.checked;

        if (!value) {
            return;
        }

        var bFound = false;
        var iFound = null;
        for (var i = 0; i < this._currentExclusions.length; i++) {
            if (deepEqual(this._currentExclusions[i], value.toLowerCase())) {
                iFound = i;
                bFound = true;
            }
        }
        // on l'ajoute si la valeur n'existe pas et est selectionnée
        if (!bFound && !checked) {
            this._currentExclusions.push(value.toLowerCase());
        }
        // on la retire si la valeur existe et est deselectionnée
        if (bFound && checked) {
            this._currentExclusions[iFound] = null;
        }
    }

    /**
     * this method is called by event 'click' on 'GPisoReset'
     * tag label (cf. this._createIsoFormResetElement),
     * and it cleans all isochron input options and results.
     *
     * @private
     */
    onIsoResetClick () {
        // clear
        this._clear();
    }

    /**
     * this method is called by event 'click' on 'GPIsoSubmit'
     * tag label (cf. this._createIsoSubmitFormElement),
     * and it cleans the isochrone geometry.
     *
     * @private
     */
    onShowIsoResultsNewClick () {
        // clean avant un nouveau calcul !
        this._clearGeojsonLayer();
        /**
        * event triggered when user clear points to compute isochrone
        *
        * @event route:newresults
        */
        this.dispatchEvent("iso:newresults");
    }

    /**
     * ...
     * @private
     */
    onShowIsoSettingsClick () {}

    // ################################################################### //
    // ######################## isocurve calculation ##################### //
    // ################################################################### //

    /**
     * this method is called by this.onIsoComputationSubmit
     * and executes a request to the service.
     *
     * @param {Object} options - isocurve service request options
     * @private
     */
    _requestIsoCurve (options) {
        // on ne fait pas de requête si on n'a pas renseigné de parametres !
        if (!options || ((typeof options === "object") && (Object.keys(options).length === 0))) {
            return;
        }
        // on ne fait pas de requête si on n'a pas de point d'origine
        if (!options.position) {
            return;
        }

        // si l'utilisateur a spécifié le paramètre ssl au niveau du control, on s'en sert
        // true par défaut (https)
        if (typeof options.ssl !== "boolean") {
            if (typeof this.options.ssl === "boolean") {
                options.ssl = this.options.ssl;
            } else {
                options.ssl = true;
            }
        }

        logger.log(options);

        // on efface une éventuelle précédente couche
        this._clearGeojsonLayer();

        // mise en place de la patience
        this._displayWaitingContainer();

        // appel du service de calcul d'isochrones
        Gp.Services.isoCurve(options);
    }

    /**
     * this method is called by this.onIsoComputationSubmit() (in case of route computation success)
     * and fills the container of the iso compute results with its metadata
     * information, also, constructs the geometry isochrone.
     *
     * @param {Object} results - results of the iso calculation
     * @param {Object} computeOptions - options of the iso calculation
     *
     * @private
     */
    _fillIsoResultsDetails (results, computeOptions) {
        // 1. Affichage des distances et durées
        this._fillIsoResultsDetailsContainer(results, computeOptions);

        // sauvegarde de l'etat des resultats
        this._currentIsoInformations = results;

        /**
         * event triggered when the compute is finished
         *
         * @event iso:compute
         * @property {Object} type - event
         * @property {Object} target - instance Iso
         * @example
         * Iso.on("iso:compute", function (e) {
         *   console.log(e.target.getData());
         * })
         */
        this.dispatchEvent({
            type : "iso:compute"
        });

        // mise à jour du controle !
        this._formContainer.className = "GPelementHidden gpf-hidden gpf-panel__content fr-modal__content";
        this._hideWaitingContainer();
        this._resultsIsoContainer.className = "gpf-flex GPflex";
    }

    /**
     * this method is called by this._fillIsoResultsDetails()
     * and fills the container of the iso compute results with its metadata
     * information.
     *
     * @param {Object} results - Resultats renvoyés par le service d'isochrone
     * @param {Object} computeOptions - options of the iso calculation
     * 
     * @private
     */
    _fillIsoResultsDetailsContainer (results, computeOptions) {
        this._resultsIsoValuesContainer = this._addIsoResultsValuesElement(results, computeOptions, MathUtils.convertSecondsToTime);
    }

    /**
     * this method is called by this.onIsoComputationSubmit (in case of success)
     * and draw isocurve results geometry on map
     *
     * @param {Object} results - isocurve response results
     * @private
     */
    _drawIsoResults (results) {
        // sauvegarde de l'etat des resultats
        this._currentIsoResults = results;
        // cache la patience
        this._hideWaitingContainer();

        if (!results.geometry) {
            return;
        }

        var map = this.getMap();

        // 1. création de l'objet geoJSON
        this._geojsonObject = {
            type : "FeatureCollection",
            crs : {
                type : "name",
                properties : {
                    name : "EPSG:4326"
                }
            },
            features : [
                {
                    type : "Feature",
                    crs : {
                        type : "name",
                        properties : {
                            name : "EPSG:4326"
                        }
                    },
                    geometry : results.geometry
                }
            ]
        };
        this._geojsonObject.features.push({
            type : "Feature",
            geometry : {
                type : "Point",
                coordinates : this._originPoint.getCoordinate()
            },
            properties : {
                description : "Point d'origine",
                "marker-symbol" : this.options.markerOpts.url
            }
        });
        var geojsonformat = new GeoJSONExtended({
            defaultDataProjection : "EPSG:4326",
            defaultStyle : this._defaultFeatureStyle
        });
        var mapProj = map.getView().getProjection().getCode();
        var features = geojsonformat.readFeatures(
            this._geojsonObject, {
                dataProjection : "EPSG:4326",
                featureProjection : mapProj
            }
        );

        // 2. ajout de la géométrie comme nouvelle couche vecteur à la carte
        var method = (this._currentComputation === "time") ? "Isochrone" : "Isodistance";

        this._geojsonLayer = new VectorLayer({
            source : new VectorSource({
                features : features
            }),
            style : this._defaultFeatureStyle,
            opacity : 0.9,
            title : "Mon " + method
        });
        // ajout d'un identifiant à la couche
        var graph;
        if (this._currentTransport === "Pieton") {
            graph = "piéton";
            this._geojsonLayer.gpResultLayerId = "compute:Pieton$GEOPORTAIL:GPP:Isocurve";
        } else {
            graph = "voiture";
            this._geojsonLayer.gpResultLayerId = "compute:Voiture$GEOPORTAIL:GPP:Isocurve";
        }
        // ajout à la carte
        map.addLayer(this._geojsonLayer);

        /**
         * event triggered when the compute is finished
         *
         * @event isocurve:compute
         * @typedef {Object}
         * @property {Object} type - event
         * @property {Object} target - instance Isocurve
         * @example
         * Isocurve.on("isocurve:compute", function (e) {
         *   console.log(e.target.getData());
         * })
         */
        this.dispatchEvent({
            type : "isocurve:compute"
        });

        // 3. Zoom sur l'emprise de la geometry
        if (features[0] && features[0].getGeometry() && features[0].getGeometry().getExtent()) {
            var extent = features[0].getGeometry().getExtent();
            map.getView().fit(extent, map.getSize());
        }

        // 5. Si un layer switcher est présent dans la carte, on lui affecte des informations pour cette couche
        var method = (this._currentComputation === "time") ? "Isochrone" : "Isodistance";
        map.getControls().forEach(
            (control) => {
                if (control instanceof LayerSwitcher) {
                    // un layer switcher est présent dans la carte
                    var layerId = this._geojsonLayer.gpLayerId;
                    // on n'ajoute des informations que s'il n'y en a pas déjà (si le titre est le numéro par défaut)
                    if (control._layers[layerId].title === layerId) {
                        control.addLayer(
                            this._geojsonLayer, {
                                title : this.options.layerDescription.title + " (" + method + "/" + graph + ")",
                                description : this.options.layerDescription.description
                            }
                        );
                    }
                }
            }
        );
    }

    // ################################################################### //
    // ############################# Clean ############################### //
    // ################################################################### //

    /**
     * this method is called by this.onShowIsoPanelClick()
     * and it clears all elements (reinit).
     *
     * @private
     */
    _clear () {
        // clear inputs
        this._clearIsoInputs();

        // clear origin point (and marker)
        this._originPoint.clear();

        // remove geometry layer
        this._clearGeojsonLayer();

        // clear results
        this._currentIsoResults = null;
    }

    /**
     * this method is called by this._clear()
     * and it clears all input elements (dist and time)
     *
     * @private
     */
    _clearIsoInputs () {
        // 1. clear inputs
        // clear time inputs (if exists) :
        // hours
        var timeHourInput = document.getElementById("GPisochronValueChronInput1-" + this._uid);
        if (timeHourInput) {
            timeHourInput.value = "0";
        }
        // minutes
        var timeMinutesInput = document.getElementById("GPisochronValueChronInput2-" + this._uid);
        if (timeMinutesInput) {
            timeMinutesInput.value = "0";
        }
        // clear distance input (if exists)
        var distInput = document.getElementById("GPisochronValueDistInput-" + this._uid);
        if (distInput) {
            distInput.value = "0";
        }

        // 2. reinit options to default
        this._initTransport();
        this._initComputation();
        this._initDirection();
        this._initExclusions();

        // 3. set transport mode to default
        var transportdiv;
        if (this._currentTransport === "Pieton") {
            transportdiv = document.getElementById("GPisochronTransportPedestrian-" + this._uid);
            if (transportdiv) {
                transportdiv.checked = "true";
            }
        } else {
            transportdiv = document.getElementById("GPisochronTransportCar-" + this._uid);
            if (transportdiv) {
                transportdiv.checked = "true";
            }
        }

        // 4. set computation mode to default (distance or time)
        var computationdiv;
        if (this._currentComputation.toLowerCase() === "distance") {
            computationdiv = document.getElementById("GPisochronChoiceAltDist-" + this._uid);
            if (computationdiv) {
                computationdiv.checked = "true";
            }
            if (document.getElementById("GPisochronValueDist-" + this._uid)) {
                document.getElementById("GPisochronValueDist-" + this._uid).className = "GPflexInput gpf-flex";
            }
            if (document.getElementById("GPisochronValueChron-" + this._uid)) {
                document.getElementById("GPisochronValueChron-" + this._uid).className = "GPelementHidden gpf-hidden";
            }
        } else {
            computationdiv = document.getElementById("GPisochronChoiceAltChron-" + this._uid);
            if (computationdiv) {
                computationdiv.checked = "true";
            }
            if (document.getElementById("GPisochronValueChron-" + this._uid)) {
                document.getElementById("GPisochronValueChron-" + this._uid).className = "GPflexInput gpf-flex";
            }
            if (document.getElementById("GPisochronValueDist-" + this._uid)) {
                document.getElementById("GPisochronValueDist-" + this._uid).className = "GPelementHidden gpf-hidden";
            }
        }

        // 5. set direction mode to default (arrival or departure)
        var directionSelect = document.getElementById("GPisochronDirectionSelect-" + this._uid);
        if (directionSelect) {
            directionSelect.value = this._currentDirection;
        }
        if (directionSelect.value.toLowerCase() === "arrival") {
            document.getElementById("GPisochronPointLabelP-" + this._uid).innerHTML = "Arrivée";
        } else {
            document.getElementById("GPisochronPointLabelP-" + this._uid).innerHTML = "Départ";
        }

        // 6. set exclusions to default
        var tollInput = document.getElementById("GPisoExclusionsToll-" + this._uid);
        if (tollInput) {
            if (this._currentExclusions.indexOf("toll") !== -1) {
                tollInput.checked = false;
            } else {
                tollInput.checked = true;
            }
        }
        var tunnelInput = document.getElementById("GPisoExclusionsTunnel-" + this._uid);
        if (tunnelInput) {
            if (this._currentExclusions.indexOf("tunnel") !== -1) {
                tunnelInput.checked = false;
            } else {
                tunnelInput.checked = true;
            }
        }
        var bridgeInput = document.getElementById("GPisoExclusionsBridge-" + this._uid);
        if (bridgeInput) {
            if (this._currentExclusions.indexOf("bridge") !== -1) {
                bridgeInput.checked = false;
            } else {
                bridgeInput.checked = true;
            }
        }
    }

    /**
     * this method is called by this.onIsoComputationSubmit (in case of failure)
     * and it clears all geometries
     *
     * @private
     */
    _clearGeojsonLayer () {
        var map = this.getMap();
        // remove layer
        if (this._geojsonLayer) {
            map.removeLayer(this._geojsonLayer);
            this._geojsonLayer = null;
        }
        // remove geojson object
        this._geojsonObject = null;
    }

    /**
     * this method is called by event 'click' on control main container
     * and hide suggested Locations (unless target is an autocomplete input)
     *
     * @param {Object} e - event
     *
     * @private
     */
    _hideIsoSuggestedLocations (e) {
        // si on clique sur l'input de saisie du point d'origine
        if (e.target && e.target.id && e.target.id.indexOf("GPlocationOrigin_") !== -1) {

        } else {
            // si on clique ailleurs dans le DOM du control, on cache tous les résultats d'autocomplétion
            this._originPoint._hideSuggestedLocation();
        }
    }

    /**
     * this method displays waiting container and sets a timeout
     *
     * @private
     */
    _displayWaitingContainer () {
        this._waitingContainer.className = "GPwaitingContainer GPwaitingContainerVisible gpf-waiting gpf-waiting--visible";
        this._waiting = true;

        // mise en place d'un timeout pour réinitialiser le panel (cacher la patience)
        // si on est toujours en attente (si la requête est bloquée par exemple)
        var opts = this.options.isocurveOptions;
        if (opts && opts.timeOut) {
            if (this._timer) {
                clearTimeout(this._timer);
                this._timer = null;
            }
            var context = this;
            this._timer = setTimeout(function () {
                if (context._waiting === true) {
                    context._hideWaitingContainer();
                } else {
                    if (context._timer) {
                        clearTimeout(context._timer);
                    }
                }
            }, 16000);
        }
    }

    /**
     * this method hides waiting container and clears timeout
     *
     * @private
     */
    _hideWaitingContainer () {
        if (this._waiting) {
            this._waitingContainer.className = "GPwaitingContainer GPwaitingContainerHidden gpf-waiting gpf-waiting--hidden";
            this._waiting = false;
            var opts = this.options.isocurveOptions;
            if (opts && opts.timeOut) {
                clearTimeout(this._timer);
                this._timer = null;
            }
        }
    }

};

// on récupère les méthodes de la classe commune MousePosition
Object.assign(Isocurve.prototype, IsocurveDOM);
Object.assign(Isocurve.prototype, Widget);

export default Isocurve;

// Expose Isocurve as ol.control.Isocurve (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.Isocurve = Isocurve;
}

const deepEqual = function (x, y) {
    if (x === y) {
        return true;
    } else if ((typeof x === "object" && x != null) && (typeof y === "object" && y != null)) {
        if (Object.keys(x).length !== Object.keys(y).length) {
            return false;
        }

        for (var prop in x) {
            if (y.hasOwnProperty(prop)) {
                if (!deepEqual(x[prop], y[prop])) {
                    return false;
                }
            } else {
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
};
