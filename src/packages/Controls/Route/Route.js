// import CSS
import "../../CSS/Controls/Route/GPFroute.css";
// import "../../CSS/Controls/Route/GPFrouteStyle.css";
// import OpenLayers
// import Control from "ol/control/Control";
import Widget from "../Widget";
import Control from "../Control";
import { unByKey as olObservableUnByKey } from "ol/Observable";
import Overlay from "ol/Overlay";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
// import GeoJSON from "ol/format/GeoJSON";
import { pointerMove as eventPointerMove } from "ol/events/condition";
import { Select as SelectInteraction } from "ol/interaction";
import {
    Stroke,
    Style
} from "ol/style";
import { transformExtent as olTransformExtentProj } from "ol/proj";
// import geoportal library access
import Gp from "geoportal-access-lib";
// import local
import Logger from "../../Utils/LoggerByDefault";
import Utils from "../../Utils/Helper";
import SelectorID from "../../Utils/SelectorID";
import Markers from "../Utils/Markers";
import Draggable from "../../Utils/Draggable";
import Interactions from "../Utils/Interactions";
import MathUtils from "../../Utils/MathUtils";
// import local with ol dependencies
import LocationSelector from "../LocationSelector/LocationSelector";
import ButtonExport from "../Export/Export";
import LayerSwitcher from "../LayerSwitcher/LayerSwitcher";
import GeoJSONExtended from "../../Formats/GeoJSON";
// DOM
import RouteDOM from "./RouteDOM";
import checkDsfr from "../Utils/CheckDsfr";

var logger = Logger.getLogger("route");

/**
 * @classdesc
 *
 * Route Control.
 *
 * @constructor
 * @alias ol.control.Route
 * @type {ol.control.Route}
 * @extends {ol.control.Control}
 * @param {Object} options - route control options
 * @param {Number} [options.id] - Ability to add an identifier on the widget (advanced option)
 * @param {String}  [options.apiKey] - API key for services call (route and autocomplete services). The key "calcul" is used by default.
 * @param {Boolean} [options.ssl = true] - use of ssl or not (default true, service requested using https protocol)
 * @param {Boolean} [options.collapsed = true] - Specify if widget has to be collapsed (true) or not (false) on map loading. Default is true.
 * @param {Boolean} [options.draggable = false] - Specify if widget is draggable
 * @param {Boolean|Object} [options.export = false] - Specify if button "Export" is displayed. For the use of the options of the "Export" control, see {@link packages/Controls/Export/Export.default}
 * @param {Object}  [options.exclusions = {"toll" : false, "tunnel" : false, "bridge" : false}] - list of exclusions with status (true = checked). By default : no exclusions checked.
 * @param {Array}   [options.graphs = ["Voiture", "Pieton"]] - list of resources, by default : ["Voiture", "Pieton"]. The first element is selected.
 * @param {Object} [options.routeOptions = {}] - route service options. see {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~route Gp.Services.route()} to know all route options.
 * @param {Object} [options.autocompleteOptions = {}] - autocomplete service options. see {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~autoComplete Gp.Services.autoComplete()} to know all autocomplete options
 * @param {Object} [options.markersOpts] - options to use your own markers. Object properties can be "departure", "stages" or "arrival". Corresponding value is an object with following properties :
 * @param {String} [options.markersOpts.url] - marker base64 encoded url (ex "data:image/png;base64,...""). Mandatory for a custom marker
 * @param {Array} [options.markersOpts.offset] - Offsets in pixels used when positioning the overlay. The first element in the array is the horizontal offset. A positive value shifts the overlay right. The second element in the array is the vertical offset. A positive value shifts the overlay down. Default is [0, 0]. (see http://openlayers.org/en/latest/apidoc/ol.Overlay.html)
 * @param {Object} [options.layerDescription = {}] - Layer informations to be displayed in LayerSwitcher widget (only if a LayerSwitcher is also added to the map)
 * @param {String} [options.layerDescription.title = "Itinéraire"] - Layer title to be displayed in LayerSwitcher
 * @param {String} [options.layerDescription.description = "Itinéraire basé sur un graphe"] - Layer description to be displayed in LayerSwitcher
 * @fires route:drawstart
 * @fires route:drawend
 * @fires route:compute
 * @fires route:compute
 * @fires route:newresults
 * @example
 *  var route = ol.control.Route({
 *      "collapsed" : true
 *      "draggable" : true,
 *      "export"    : false,
 *      "exclusions" : {
 *         "toll" : true,
 *         "bridge" : false,
 *         "tunnel" : true
 *      },
 *      "graphs" : ['Pieton', 'Voiture'],
 *      "markersOpts" : {
 *          "departure" : {
 *              "url" : "...",
 *              "offset" : [0,0]
 *          },
 *          "stages" : {
 *              "url" : "...",
 *              "offset" : [0,0]
 *          },
 *          "arrival" : {
 *              "url" : "...",
 *              "offset" : [0,0]
 *          }
 *      }
 *      "autocompleteOptions" : {},
 *      "routeOptions" : {}
 *  });
 *
 *  // if you want to pluggued the control Export with options :
 *  var route = new ol.control.Route({
 *    export : {
 *      name : "export",
 *      format : "geojson",
 *      title : "Exporter",
 *      menu : false
 *    }
 *  });
 */
class Route extends Control {

    /**
     * See {@link ol.control.Route}
     * @module Route
     * @alias module:~controls/Route
     * @param {*} options - options
     * @example
     * import Route from "gpf-ext-ol/controls/Route"
     * ou
     * import { Route } from "gpf-ext-ol"
     */
    constructor (options) {
        options = options || {};

        // call ol.control.Control constructor
        super(options);

        if (!(this instanceof Route)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }
        /**
         * Nom de la classe (heritage)
         * @private
         */
        this.CLASSNAME = "Route";
        // initialisation du composant
        this.initialize(options);

        // Widget main DOM container
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
            // enrichissement du DOM du container
            this._container = this._initContainer(map);
            this.element = this._container;

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
                    this._panelRouteContainer,
                    this._panelHeaderRouteContainer,
                    map.getTargetElement()
                );
            }

            // mode "collapsed"
            if (!this.collapsed) {
                this._showRouteButton.setAttribute("aria-pressed", true);
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
    };

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
            logger.log("[ERROR] Route:setCollapsed - missing collapsed parameter");
            return;
        }
        if ((collapsed && this.collapsed) || (!collapsed && !this.collapsed)) {
            return;
        }
        if (collapsed) {
            document.getElementById("GProutePanelClose-" + this._uid).click();
        } else {
            this._showRouteButton.click();
        }
        this.collapsed = collapsed;
    }

    /**
     * Get vector layer where geoJson route is drawn
     *
     * @returns {Object} layer - ol.layer.Vector route layer
     */
    getLayer () {
        return this._geojsonSections;
    }

    /**
     * Set vector layer where route geometry is drawn
     *
     * @param {Object} layer - ol.layer.Vector route layer
     */
    setLayer (layer) {
        if (!layer) {
            this._geojsonSections = null;
            return;
        }

        if (!(layer instanceof VectorLayer)) {
            logger.log("no valid layer given for hosting drawn features.");
            return;
        }

        // application des styles
        layer.setStyle(this._defaultFeatureStyle);
        // sauvegarde
        this._geojsonSections = layer;
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
     * Get route informations
     *
     * @returns {Object} data - route informations
     */
    getData () {
        var points = [];
        for (let index = 0; index < this._currentPoints.length; index++) {
            const p = this._currentPoints[index];
            points.push(p.getCoordinate());
        }
        var data = {
            type : "route",
            points : points,
            transport : this._currentTransport,
            exclusions : this._currentExclusions,
            computation : this._currentComputation,
            results : {}
        };
        Utils.assign(data.results, this._currentRouteInformations);
        return data;
    }

    /**
     * Set route data
     *
     * @param {Object} data - control informations
     * @param {String} data.transport - transport type
     * @param {String} data.computation - computation type
     * @param {Array} data.exclusions - list of exclusions
     * @param {Array} data.points - list of points : [[lon, lat]]
     * @param {Object} data.results - service response
     */
    setData (data) {
        // INFO
        // transmettre toutes les informations necessaires pour reconstruire le panneau de resultats
        this._currentTransport = data.transport;
        this._currentComputation = data.computation;
        this._currentExclusions = data.exclusions;
        // ajout des nouvelles coordonnnées
        for (var j = 0; j < data.points.length; j++) {
            const c = data.points[j];
            if (c) {
                this._currentPoints[j].setCoordinate(c, "EPSG:4326");
            }
        }
        // INFO
        // nettoyer les points du calcul précedent
        for (var i = 0; i < this._currentPoints.length; i++) {
            var point = this._currentPoints[i];
            if (point.getCoordinate()) {
                // clean de l'objet sans declencher les evenements qui suppriment la couche précedente !
                // /!\ point.clear()
                // point.clearResults();
                // clean du dom
                var id = (i + 1) + "-" + this._uid;
                var coordinate = point.getCoordinate()[1].toFixed(4) + " / " + point.getCoordinate()[0].toFixed(4);
                document.getElementById("GPlocationOriginCoords_" + id).value = coordinate;
                document.getElementById("GPlocationOrigin_" + id).value = coordinate;
                // document.getElementById("GPlocationPoint_" + id).style.cssText = "";
                if (i > 0 && i < 6) {
                    // on masque les points intermediaires
                    document.getElementById("GPlocationPoint_" + id).className = "GPflexInput GPelementHidden gpf-flex gpf-hidden ";
                }
            }
        }
        this._currentRouteInformations = data.results;
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
     * It allows to init the control.
     */
    init () {
        // INFO
        // reconstruire le panneau de resultats sans lancer de calcul
        // * construire la liste des points (cf. RouteDOM._createRoutePanelFormElement())
        // * construire les resultats

        // init points
        for (let index = 0; index < this._currentPoints.length; index++) {
            const point = this._currentPoints[index];
            var id = index + 1;
            var coordinate = point.getCoordinate();
            if (coordinate) {
                var input = document.getElementById("GPlocationOrigin_" + id + "-" + this._uid);
                input.value = coordinate[1].toFixed(4) + " / " + coordinate[0].toFixed(4);
                if (index > 0 && index < 6) {
                    document.getElementById("GPlocationPoint_" + id + "-" + this._uid).className = "GPflexInput GPlocationStageFlexInput gpf-flex";
                }
            }
        }

        // add points into panel
        var points = document.getElementsByClassName("GPlocationPoint-" + this._uid);
        this._addRouteResultsStagesValuesElement(points);

        // set transport mode
        var transportdiv;
        if (this._currentTransport === "Pieton") {
            transportdiv = document.getElementById("GProuteTransportPedestrian-" + this._uid);
            if (transportdiv) {
                transportdiv.checked = "true";
            }
        } else {
            transportdiv = document.getElementById("GProuteTransportCar-" + this._uid);
            if (transportdiv) {
                transportdiv.checked = "true";
            }
        }

        // set computation mode
        var computationdiv = document.getElementById("GProuteComputationSelect-" + this._uid);
        if (computationdiv) {
            computationdiv.value = this._currentComputation;
        }

        // set exclusions
        var tollInput = document.getElementById("GProuteExclusionsToll-" + this._uid);
        if (tollInput) {
            if (this._currentExclusions.indexOf("toll") !== -1) {
                tollInput.checked = false;
            } else {
                tollInput.checked = true;
            }
        }

        var tunnelInput = document.getElementById("GProuteExclusionsTunnel-" + this._uid);
        if (tunnelInput) {
            if (this._currentExclusions.indexOf("tunnel") !== -1) {
                tunnelInput.checked = false;
            } else {
                tunnelInput.checked = true;
            }
        }

        var bridgeInput = document.getElementById("GProuteExclusionsBridge-" + this._uid);
        if (bridgeInput) {
            if (this._currentExclusions.indexOf("bridge") !== -1) {
                bridgeInput.checked = false;
            } else {
                bridgeInput.checked = true;
            }
        }

        var distance = this._currentRouteInformations.totalDistance;
        var duration = this._currentRouteInformations.totalTime;

        // Détails avec simplifications des troncons
        var instructions = this._simplifiedInstructions(this._currentRouteInformations.routeInstructions);

        if (instructions) {
            this._fillRouteResultsDetailsContainer(distance, duration, instructions);
        }

        // affichage du panneau de details du controle !
        this._formRouteContainer.className = "GPelementHidden gpf-hidden gpf-panel__content fr-modal__content";
        this._hideWaitingContainer();
        this._resultsRouteContainer.className = "";
    }

    /**
     * Clean UI : reinit control
     */
    clean () {
        this._currentTransport = null;
        this._currentExclusions = [];
        this._currentComputation = null;

        for (var i = 0; i < this._currentPoints.length; i++) {
            this._currentPoints[i].clear();
        }

        this._removeRouteStepLocations();
        this._clearRouteInputOptions();
        this._clearRouteResultsDetails();

        this.setLayer();

        this._formRouteContainer.className = "gpf-panel__content fr-modal__content";
        this._resultsRouteContainer.className = "GPelementHidden gpf-hidden";
    }

    // ################################################################### //
    // ##################### init component ############################## //
    // ################################################################### //

    /**
     * Initialize route control (called by Route constructor)
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
            graphs : ["Pieton", "Voiture"],
            exclusions : {
                toll : false,
                tunnel : false,
                bridge : false
            },
            routeOptions : {},
            autocompleteOptions : {},
            layerDescription : {
                title : "Itinéraire",
                description : "Itinéraire basé sur un graphe"
            }
        };

        // merge with user options
        Utils.assign(this.options, options);

        // cas particulier des markers par défaut
        var defaultMarkersOpts = {
            departure : {
                url : Markers["red"],
                offset : Markers.defaultOffset
            },
            stages : {
                url : Markers["lightOrange"],
                offset : Markers.defaultOffset
            },
            arrival : {
                url : Markers["darkOrange"],
                offset : Markers.defaultOffset
            }
        };
        // on récupère les options de chaque type de marker si spécifié
        this.options.markersOpts = Utils.assign(defaultMarkersOpts, options.markersOpts);

        /** {Boolean} specify if Route control is collapsed (true) or not (false) */
        this.collapsed = this.options.collapsed;

        /** {Boolean} specify if Route control is draggable (true) or not (false) */
        this.draggable = this.options.draggable;

        this._uid = this.options.id || SelectorID.generate();

        // containers principaux
        this._showRouteButton = null;
        this._panelRouteContainer = null;
        this._panelHeaderRouteContainer = null;
        this._waitingContainer = null;
        this._formRouteContainer = null;
        this._resultsRouteContainer = null;
        this._showRouteExclusionsElement = null;

        // liste de points selectionnée
        this._currentPoints = [];

        // Mode de transport selectionné : 'Voiture' ou 'Pieton'
        this._currentTransport = null;
        this._initTransport();

        // Mode de calcul selectionné : 'Plus rapide' ou 'plus court'
        this._currentComputation = null;
        this._initComputation();

        // Exclusions selectionnées : Tunnel, Toll et Bridge
        this._currentExclusions = [];
        this._initExclusions();

        // si un calcul est en cours ou non
        this._waiting = false;
        // timer pour cacher la patience après un certain temps
        this._timer = null;

        // la geometrie du parcours
        this._geojsonRoute = null;

        // la geometrie des troncons
        this._geojsonSections = null;

        // la geometrie des troncons au format GeoJSON
        this._geojsonObject = null;

        // bouton export
        this.export = null;

        // le container de la popup (pour les troncons selectionnés)
        this._popupContent = null;
        this._popupDiv = this._initPopupDiv();
        // l'overlay ol.Overlay correspondant à la popup (pour les troncons selectionnés)
        this._popupOverlay = null;

        // ol.interaction.Select associées à la couche des résultats (troncons)
        this._resultsSelectInteraction = null;
        this._resultsHoverInteraction = null;

        // styles pour les sélections des features
        this._defaultFeatureStyle = new Style({
            stroke : new Stroke({
                color : "rgba(0,183,152,0.9)",
                width : 12
            })
        });
        this._selectedFeatureStyle = new Style({
            stroke : new Stroke({
                color : "rgba(255,102,0,0.9)",
                width : 12
            })
        });

        // reponse du service
        // Ex. {
        //   totalTime, totalDistance, bbox, routeGeometry,
        //   routeInstructions : [{duration, distance, code, instruction, bbox, geometry}]
        // }
        this._currentRouteInformations = null;

        // liste des ressources avec droits par service
        // Ex. {
        //   "Route" : {
        //       key : "ger4g456re45er456t4er5ge5",
        //       resources : ["Pieton", "Voiture"]
        //   }
        // }
        this._resources = {};

        // listener key for event on pointermove or moveend map
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
        // mode de transport
        if (options.graphs) {
            // on ne permet pas de passer un tableau vide : on spécifie au moins un graph
            if (Array.isArray(options.graphs) && options.graphs.length) {
                for (var i = 0; i < options.graphs.length; i++) {
                    if (typeof options.graphs[i] === "string") {
                        if (options.graphs[i].toLowerCase() === "pieton") {
                            options.graphs[i] = "Pieton";
                        }
                        if (options.graphs[i].toLowerCase() === "voiture") {
                            options.graphs[i] = "Voiture";
                        }
                    } else {
                        logger.log("[ol.control.Route] ERROR : parameter 'graphs' elements should be of type 'string'");
                        options.graphs[i] = null;
                    }
                }
            } else {
                logger.warn("'graphs' parameter should be an array");
                options.graphs = null;
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

        var picto = this._showRouteButton = this._createShowRoutePictoElement();
        container.appendChild(picto);

        var routePanel = this._panelRouteContainer = this._createRoutePanelElement();
        var routePanelDiv = this._createRoutePanelDivElement();
        routePanel.appendChild(routePanelDiv);

        // header form
        var routeHeader = this._panelHeaderRouteContainer = this._createRoutePanelHeaderElement();
        routePanelDiv.appendChild(routeHeader);

        // form
        var routeForm = this._formRouteContainer = this._createRoutePanelFormElement();

        // form: menu des modes
        routeForm.appendChild(this._createRoutePanelFormModeChoiceTransportElement(this.options.graphs));

        // form: menu des points
        var points = this._createRoutePanelFormPointsElement(map);
        for (var i = 0; i < points.length; i++) {
            routeForm.appendChild(points[i]);
        }

        routeForm.appendChild(this._createRoutePanelFormModeChoiceComputeElement());

        // form: menu des exclusions
        this._showRouteExclusionsElement = this._createShowRouteExclusionsPictoElement();
        routeForm.appendChild(this._showRouteExclusionsElement);
        var exclusion = this._createRoutePanelFormExclusionsElement();
        exclusion.appendChild(this._createRoutePanelFormExclusionOptionsElement(this.options.exclusions));
        routeForm.appendChild(exclusion);

        var panelFooter = this._createRoutePanelFooterElement();
        routeForm.appendChild(panelFooter);

        if (!checkDsfr()) {
            var buttonReset = this._createRouteFormResetElement();
            panelFooter.appendChild(buttonReset);
        }

        // form: bouton du calcul
        var buttonSubmit = this._createRouteSubmitFormElement();
        panelFooter.appendChild(buttonSubmit);

        routePanelDiv.appendChild(routeForm);

        // results
        var routeResults = this._resultsRouteContainer = this._createRoutePanelResultsElement();
        routePanelDiv.appendChild(routeResults);
        
        var plugin = this._createDrawingButtonsPluginDiv();
        routePanelDiv.appendChild(plugin);

        // waiting
        var waiting = this._waitingContainer = this._createRouteWaitingElement();
        routePanelDiv.appendChild(waiting);

        container.appendChild(routePanel);
        // hide autocomplete suggested locations on container click
        if (container.addEventListener) {
            container.addEventListener("click", (e) => this._hideRouteSuggestedLocations(e));
        }

        return container;
    }

    // ################################################################### //
    // ####################### init application ########################## //
    // ################################################################### //

    /**
     * this method is called by the constructor and initialize transport mode
     * ("Voiture" ou "Pieton")
     *
     * @private
     */
    _initTransport () {
        // Mode de transport selectionné
        this._currentTransport = "Pieton"; // par defaut

        // par defaut
        var transport = this.options.graphs;
        if (!transport || transport.length === 0) {
            this.options.graphs = ["Pieton", "Voiture"];
        }

        // option
        if (Array.isArray(transport) && transport.length) {
            // FIXME pb si le 1er graphe n'est pas une ressource connue !
            if (transport[0] === "Voiture" || transport[0] === "Pieton") {
                this._currentTransport = transport[0];
            }
        }

        // TODO option sur le service
        var serviceOptions = this.options.routeOptions;
        if (serviceOptions.graph) {
            this._currentTransport = serviceOptions.graph;
        }
    }

    /**
     * this method is called by the constructor and initialize computation mode
     * (fastest or shortest)
     *
     * @private
     */
    _initComputation () {
        // Mode de calcul selectionné
        this._currentComputation = "fastest"; // par defaut

        // TODO option sur le service
        var serviceOptions = this.options.routeOptions;
        if (serviceOptions.routePreference) {
            this._currentComputation = serviceOptions.routePreference;
        }
    }

    /**
     * this method is called by the constructor and initialize exclusions
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
                    if (exclusion[k]) {
                        this._currentExclusions.push(k);
                    }
                }
            }
        }

        // TODO option sur le service
        var serviceOptions = this.options.routeOptions;
        if (Array.isArray(serviceOptions.exclusions)) {
            this._currentExclusions = serviceOptions.exclusions;
        }
    }

    /**
     * this method is called by this.initialize() and initialize popup div
     * (to display results information on route result click)
     *
     * @returns {Object} element - DOM element for popup
     * @private
     */
    _initPopupDiv () {
        var context = this;
        var element = document.createElement("div");
        element.className = "gp-feature-info-div";
        var closer = document.createElement("button");
        closer.className = "gp-styling-button closer";
        // on closer click : remove popup
        closer.onclick = function () {
            if (context._popupOverlay != null) {
                context._popupOverlay.setPosition(undefined);
            }
            return false;
        };
        this._popupContent = document.createElement("div");
        this._popupContent.className = "gp-features-content-div";
        element.appendChild(this._popupContent);
        element.appendChild(closer);

        return element;
    }

    // ################################################################### //
    // ############################## DOM ################################ //
    // ################################################################### //

    /**
     * Create List Points
     * Overwrite RouteDOM method !
     *
     * @param {Object} map - the map
     *
     * @returns {Array} List DOM element
     * @private
     */
    _createRoutePanelFormPointsElement (map) {
        var points = [];
        var count = 1;

        // point de depart
        var start = new LocationSelector({
            apiKey : this.options.apiKey || null,
            tag : {
                id : count,
                label : "Départ",
                groupId : this._uid,
                markerOpts : this.options.markersOpts["departure"],
                display : true
            },
            autocompleteOptions : this.options.autocompleteOptions || null
        });
        start.setMap(map);
        // on ajoute des écouteurs d'évènements (en plus de ceux de LocationSelector),
        // pour prendre en compte les CSS spécifiques de GProuteForm
        this._addFormPointsEventListeners(start);
        points.push(this._createRoutePanelFormPointLabel("Départ"));
        points.push(start._container);
        this._currentPoints.push(start);

        // points intermediaires
        for (count = 2; count < 7; count++) {
            var step = new LocationSelector({
                apiKey : this.options.apiKey || null,
                tag : {
                    id : count,
                    label : "Etape " + (count-1),
                    groupId : this._uid,
                    markerOpts : this.options.markersOpts["stages"],
                    display : false,
                    removeOption : true
                },
                autocompleteOptions : this.options.autocompleteOptions || null
            });
            step.setMap(map);
            this._addFormPointsEventListeners(step);
            points.push(this._createRoutePanelFormPointLabel("Étape", false));
            points.push(step._container);
            this._currentPoints.push(step);
        }

        // point d'arrivée
        var end = new LocationSelector({
            apiKey : this.options.apiKey || null,
            tag : {
                id : count,
                label : "Arrivée",
                groupId : this._uid,
                markerOpts : this.options.markersOpts["arrival"],
                display : true,
                addOption : true
            },
            autocompleteOptions : this.options.autocompleteOptions || null
        });
        end.setMap(map);
        this._addFormPointsEventListeners(end);
        points.push(this._createRoutePanelFormPointLabel("Arrivée"));
        points.push(end._container);
        this._currentPoints.push(end);

        return points;
    }

    /**
     * Attach events listeners to route form points (locationSelector)
     *
     * @param {Object} formPoint - route form point (locationSelector)
     * @private
     */
    _addFormPointsEventListeners (formPoint) {
        if (!formPoint) {
            return;
        }

        if (formPoint._buttonLabel.addEventListener) {
            // display form on origin label click
            formPoint._buttonLabel.addEventListener(
                "click",
                (e) => this.onRouteOriginLabelClick(e)
            );
            // minimize form on input show pointer, and set map event listeners (see this.onRouteOriginPointerClick)
            formPoint._inputShowPointer.addEventListener(
                "click",
                (e) => this.onRouteOriginPointerClick(e, formPoint)
            );
            if (formPoint._removePointElement) {
                formPoint._removePointElement.addEventListener(
                    "click",
                    (e) => {
                        logger.trace("click on _removePointElement", e);
                        // Moving up exclusions picto
                        // var exclusionsPictoTop = context._showRouteExclusionsElement.style.top;
                        // context._showRouteExclusionsElement.style.top = (parseInt(exclusionsPictoTop, 10) - 33).toString() + "px";
                    }
                );
            }
            if (formPoint._addPointElement) {
                formPoint._addPointElement.addEventListener(
                    "click",
                    (e) => {
                        logger.trace("click on _addPointElement", e);
                        // Moving down exclusions picto
                        // var exclusionsPictoTop = context._showRouteExclusionsElement.style.top;
                        // context._showRouteExclusionsElement.style.top = (parseInt(exclusionsPictoTop, 10) + 33).toString() + "px";
                    }
                );
            }
        } else if (formPoint._buttonLabel.attachEvent) {
            // attachEvent: Internet explorer event listeners management
            formPoint._buttonLabel.attachEvent(
                "onclick",
                (e) => this.onRouteOriginLabelClick(e)
            );
            formPoint._inputShowPointer.attachEvent(
                "onclick",
                (e) => this.onRouteOriginPointerClick(e, formPoint)
            );
            if (formPoint._removePointElement) {
                formPoint._removePointElement.attachEvent(
                    "onclick",
                    (e) => {
                        // Moving up exclusions picto
                        // var exclusionsPictoTop = context._showRouteExclusionsElement.style.top;
                        // context._showRouteExclusionsElement.style.top = (parseInt(exclusionsPictoTop, 10) - 33).toString() + "px";
                    }
                );
            }
            if (formPoint._addPointElement) {
                formPoint._addPointElement.attachEvent(
                    "onclick",
                    (e) => {
                        // Moving down exclusions picto
                        // var exclusionsPictoTop = context._showRouteExclusionsElement.style.top;
                        // context._showRouteExclusionsElement.style.top = (parseInt(exclusionsPictoTop, 10) + 33).toString() + "px";
                    }
                );
            }
        }
    }

    // ################################################################### //
    // ####################### handlers events to dom #################### //
    // ################################################################### //

    /**
     * this method is called by event 'submit' on 'GProuteForm' tag form
     * (cf. this._createRoutePanelFormElement), and it displays the results.
     *
     * @param {Object} options - options
     * @private
     */
    onRouteComputationSubmit (options) {
        logger.log("onRouteComputationSubmit", options);

        // FIXME on lance une requête en EPSG:4326, les coordonnées
        // doivent donc être du type cad en lat/lon.
        // or, BUG du service du calcul d'itineraire car les
        // coordonnées envoyées doivent être en lon/lat avec une SRS en EPSG:4326 !?
        // sinon, ça plante...

        // Liste des points
        var points = this._currentPoints;

        // - point de depart (info: points[0].getCoordinate est du type [lon, lat], en EPSG:4326)
        var start;
        if (points[0] && points[0].getCoordinate) {
            var startCoordinate = points[0].getCoordinate();
            start = {
                x : startCoordinate[0].toFixed(5),
                y : startCoordinate[1].toFixed(5)
            };
            logger.log("start", start);
        }

        // - point d'arrivée
        var end;
        var endPoint = points[points.length - 1];
        if (endPoint && endPoint.getCoordinate) {
            var endCoordinate = endPoint.getCoordinate();
            end = {
                x : endCoordinate[0].toFixed(5),
                y : endCoordinate[1].toFixed(5)
            };
            logger.log("end", end);
        }

        // - les étapes
        var step = [];
        for (var i = 1; i < points.length - 1; i++) {
            if (points[i] && points[i].getCoordinate) {
                var iCoordinate = points[i].getCoordinate();
                if (iCoordinate) {
                    var coordinate = {
                        x : iCoordinate[0].toFixed(5),
                        y : iCoordinate[1].toFixed(5)
                    };
                    logger.log("step", coordinate);
                    step.push(coordinate);
                }
            }
        }

        // valeurs selectionnées
        this._currentTransport = options.transport;
        this._currentComputation = options.computation;
        this._currentExclusions = options.exclusions;

        // on recupere les éventuelles options du service passées par l'utilisateur
        var routeOptions = this.options.routeOptions;

        // OVERLOAD : la resource bd-topo-osrm ne gère pas le calcul piéton en mode fastest
        // dans ce cas, on utilise valhalla dans le cas d'une utilisation par défaut du widget
        // sans paramétrage de resource explicitement demandé
        var routeResource;
        if (!routeOptions.resource) {
            if (this._currentComputation === "fastest" && this._currentTransport === "Pieton") {
                routeResource = "bdtopo-valhalla";
            }
        } else {
            routeResource = routeOptions.resource;
        }

        // gestion du protocole et du timeout
        // le timeout est indispensable sur le protocole JSONP.
        var _protocol = routeOptions.protocol || "XHR";
        var _timeout = routeOptions.timeOut || 0;
        if (_protocol === "JSONP" && _timeout === 0) {
            // FIXME le timeout est obligatoire pour ce type de protocole...
            _timeout = 15000;
        }

        // gestion des callback
        var bOnFailure = !!(routeOptions.onFailure !== null && typeof routeOptions.onFailure === "function"); // cast variable to boolean
        var bOnSuccess = !!(routeOptions.onSuccess !== null && typeof routeOptions.onSuccess === "function");

        // on met en place l'affichage des resultats dans la fenetre de resultats.
        var context = this;
        this._requestRouting({
            startPoint : start,
            endPoint : end,
            viaPoints : step,
            graph : routeOptions.graph || this._currentTransport,
            routePreference : routeOptions.routePreference || this._currentComputation,
            exclusions : routeOptions.exclusions || this._currentExclusions,
            geometryInInstructions : true,
            distanceUnit : "m",
            timeOut : _timeout,
            protocol : _protocol,
            resource : routeResource,
            // callback onSuccess
            onSuccess : function (results) {
                logger.log(results);
                if (results) {
                    context._fillRouteResultsDetails(results);
                }
                if (bOnSuccess) {
                    routeOptions.onSuccess.call(context, results);
                }
            },
            // callback onFailure
            onFailure : function (error) {
                context._hideWaitingContainer();
                context._clearRouteResultsDetails();
                logger.log(error.message);
                if (bOnFailure) {
                    routeOptions.onFailure.call(context, error);
                }
            }
        });
    }

    /**
     * this method is called by event 'click' on 'GPlocationOriginLabel' label
     * and set 'GProuteForm' CSS class to "" (normal)
     *
     * @param {Object} routeControl - context : route Control (this)
     * @private
     */
    onRouteOriginLabelClick () {
        this._formRouteContainer.className = "gpf-panel__content gpf-mobile-form fr-modal__content";
        // on désactive l'écouteur d'événements sur la carte (pour ne pas placer un marker au clic)
        // map.un(
        //     "click",
        //     () => {
        //         // on ne rétablit pas le mode "normal" si on est dans le panel des résultats (où className = "GProuteComponentHidden")
        //         if (this._formRouteContainer.className === "GProuteFormMini") {
        //             this._formRouteContainer.className = "gpf-panel__content fr-modal__content";
        //         }
        //     }
        // );
        olObservableUnByKey(this.listenerKey);
        this.dispatchEvent("route:drawend");
    }

    /**
     * this method is called by event 'click' on 'GPlocationOriginPointerImg' label
     * and display or minimize 'GProuteForm', using CSS class ("GProuteFormMini" or "")
     *
     * @param {Object} e - context : route Control (equivalent to this)
     * @param {Object} locationSelector - context : locationSelector input (one of this._currentPoints)
     * @private
     */
    onRouteOriginPointerClick (e, locationSelector) {
        var map = this.getMap();
        if (locationSelector._inputShowPointerContainer.checked) {
            // au click sur l'input pour pointer sur la carte: on minimise le formulaire
            this._formRouteContainer.className = "GProuteFormMini gpf-panel__content fr-modal__content";
            e.target.parentElement.parentElement.classList.add("selected");
            // et au clic sur la carte, on réaffichera le formulaire "normal"
            this.listenerKey = map.on(
                "click",
                () => {
                    e.target.parentElement.parentElement.classList.remove("selected");
                    // on ne rétablit pas le mode "normal" si on est dans le panel des résultats (où className = "GProuteComponentHidden")
                    if (this._formRouteContainer.className === "GProuteFormMini gpf-panel__content fr-modal__content") {
                        this._formRouteContainer.className = "gpf-panel__content fr-modal__content";
                    }
                    olObservableUnByKey(this.listenerKey);
                    /**
                    * event triggered at the end of drawing input
                    *
                    * @event route:drawend
                    */
                    this.dispatchEvent("route:drawend");
                }
            );
            /**
            * event triggered at the start of drawing input
            *
            * @event route:drawstart
            */
            this.dispatchEvent("route:drawstart");
        } else {
            // si on déselectionne le pointer, on rétablit le formulaire en mode normal
            this._formRouteContainer.className = "";
            // et on enlève l'écouteur d'évènement sur la carte
            // map.un(
            //     "click",
            //     () => {
            //         // on ne rétablit pas le mode "normal" si on est dans le panel des résultats (où className = "GProuteComponentHidden")
            //         if (this._formRouteContainer.className === "GProuteFormMini") {
            //             this._formRouteContainer.className = "gpf-panel__content fr-modal__content";
            //         }
            //     }
            // );
            olObservableUnByKey(this.listenerKey);
            this.dispatchEvent("route:drawend");
        }
    }

    /**
     * this method is called by event 'click' on 'GPshowRoutePicto'
     * tag label (cf. this._createShowRoutePictoElement),
     * and it cleans all value of input.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    onShowRoutePanelClick (e) {
        var opened = this._showRouteButton.ariaPressed;
        if (opened === "true") {
            this.onPanelOpen();
        }
        var map = this.getMap();
        // on supprime toutes les interactions
        Interactions.unset(map);
        // clean !
        if (!this._geojsonSections && !this._waiting) {
            this._clear();
        }
        this.collapsed = !(opened === "true");
        // on génère nous même l'evenement OpenLayers de changement de pté
        // (utiliser ol.control.Route.on("change:collapsed", function ) pour s'abonner à cet évènement)
        this.dispatchEvent("change:collapsed");

        // on recalcule la position
        if (this.options.position && !this.collapsed) {
            this.updatePosition(this.options.position);
        }
    }

    /**
     * this method is called by event 'change' on 'GProuteComputationSelect' tag select
     * (cf. this._createRoutePanelFormModeChoiceComputeElement).
     * this value is saved as a parameter for the service route.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    onRouteModeComputationChange (e) {
        var value = e.target.value;

        if (!value) {
            return;
        }

        logger.log(value);
        this._currentComputation = value;
    }

    /**
     * this method is called by event 'change' on 'GProuteResultsComputationSelect' tag select
     * (cf. this._createRouteResultsElement).
     * this value is saved as a parameter for the service route,
     * and this launches the route request !
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    onRouteModeComputationChangeAndRun (e) {
        // event choice computation
        this.onRouteModeComputationChange(e);

        // clean avant un nouveau calcul !
        this._clearRouteResultsDetails();
        this._clearRouteResultsGeometry();
        this._clearRouteResultsFeatureGeometry();

        // submit request
        this.onRouteComputationSubmit({
            computation : this._currentComputation,
            transport : this._currentTransport,
            exclusions : this._currentExclusions
        });
    }

    /**
     * this method is called by event 'change' on 'GProuteTransportCar' or 'GProuteTransportPedestrian' tag input
     * (cf. this._createRoutePanelFormModeChoiceTransportElement).
     * this value is saved as a parameter for the service route.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    onRouteModeTransportChange (e) {
        var value = e.target.value;
        if (!value) {
            return;
        }
        this._currentTransport = value;
    }

    /**
     * TODO this method is called by event 'click' on 'GPshowRouteExclusionsPicto' tag input
     * (cf. this._createShowRouteExclusionsPictoElement), and it displays the panel options of exclusions.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    onShowRouteExclusionsClick (e) {
        logger.log("onShowRouteExclusionsClick", e);
        // FIXME not use ?!
    }

    /**
     * this method is called by event 'change' on 'GProuteExclusionsToll'
     * or 'GProuteExclusionsTunnel' or 'GProuteExclusionsBridge' tag input
     * (cf. this._createRoutePanelFormExclusionOptionsElement).
     * this value is saved as a parameter for the service route.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    onRouteExclusionsChange (e) {
        var value = e.target.value;
        var checked = e.target.checked;

        if (!value || (typeof value !== "string")) {
            return;
        }
        value = value.toLowerCase();

        var bFound = false;
        var iFound = null;
        for (var i = 0; i < this._currentExclusions.length; i++) {
            if (this._currentExclusions[i] === value) {
                iFound = i;
                bFound = true;
            }
        }
        // on l'ajoute si la valeur n'existe pas et est déselectionnée
        // info : checked = passage autorisé (ce n'est pas une exclusion)
        if (!bFound && !checked) {
            this._currentExclusions.push(value);
        }
        // on la retire si la valeur existe et est selectionnée
        if (bFound && checked) {
            this._currentExclusions.splice(iFound, 1);
        }
    }

    /**
     * this method is called by event 'click' on 'GProuteReset'
     * tag label (cf. this._createRouteFormResetElement),
     * and it cleans all route input options and results.
     *
     * @private
     */
    onRouteResetClick () {
        // clear points
        var currentPoints = this._currentPoints;
        for (var i = 0; i < currentPoints.length; i++) {
            currentPoints[i].clear();
        }

        // clear results
        this._clear();

        this._clearRouteInputOptions();
    }

    /**
     * this method is called by event 'click' on 'GProuteSubmit'
     * tag label (cf. this._createRouteSubmitFormElement),
     * and it cleans the route geometry.
     *
     * @private
     */
    onShowRouteResultsNewClick () {
        // clean avant un nouveau calcul !
        this._clearRouteResultsDetails();
        this._clearRouteResultsGeometry();
        this._clearRouteResultsFeatureGeometry();
        /**
        * event triggered when user clear points to compute route
        *
        * @event route:newresults
        */
        this.dispatchEvent("route:newresults");
    }

    /**
     * this method is called by event 'mouseover' on 'GProuteResultsDetailsInstruction_'
     * tag label (cf. this._addRouteResultsDetailsElement),
     * and it makes a style on feature route.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    onRouteResultsDetailsMouseOver (e) {
        // récupération de l'id de l'instruction survolée
        var tagid = e.target.id; // ex GProuteResultsDetailsInstruction_125
        var idx = tagid.substring(tagid.indexOf("_") + 1); // ex. 125

        // on passe le texte en gras
        if (e.target.classList) {
            e.target.classList.add("GProuteResultsDetailsInstructionHighlight");
        }

        if (!this._geojsonSections) {
            return;
        }

        // on récupère l'entité correspondante à l'instruction survolée
        var f = this._geojsonSections.getSource().getFeatureById(parseInt(idx, 10));
        // et on lui affecte un nouveau style
        f.setStyle(this._selectedFeatureStyle);
    }

    /**
     * this method is called by event 'mouseout' on 'GProuteResultsDetailsInstruction_'
     * tag label (cf. this._addRouteResultsDetailsElement),
     * and it deletes a style on feature route.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    onRouteResultsDetailsMouseOut (e) {
        // récupération de l'id de l'instruction survolée
        var tagid = e.target.id; // ex GProuteResultsDetailsInstruction_125
        var idx = tagid.substring(tagid.indexOf("_") + 1); // ex. 125

        // on repasse le texte en style normal
        if (e.target.classList) {
            e.target.classList.remove("GProuteResultsDetailsInstructionHighlight");
        }

        if (!this._geojsonSections) {
            return;
        }
        // on récupère l'entité correspondante à l'instruction qui était survolée
        var f = this._geojsonSections.getSource().getFeatureById(parseInt(idx, 10));
        // et on lui réaffecte un style normal
        f.setStyle(null);
    }

    // ################################################################### //
    // ########################### Routing ############################### //
    // ############## (methods to request and results) ################### //

    /**
     * this method is called by this.onRouteComputationSubmit()
     * and executes a request to the service.
     *
     * @param {Object} options - route service request options
     * @param {Function} options.onSuccess - callback
     * @param {Function} options.onFailure - callback
     * @private
     */
    _requestRouting (options) {
        // on ne fait pas de requête si on n'a pas renseigné de parametres !
        if (!options || (typeof options === "object" && Object.keys(options).length === 0)) {
            return;
        }

        // on ne fait pas de requête si
        // - la parametre 'startPoint' est vide !
        if (!options.startPoint) {
            return;
        }
        // - la parametre 'endPoint' est vide !
        if (!options.endPoint) {
            return;
        }

        // cas où la clef API n'est pas renseignée dans les options du service,
        // on utilise celle renseignée au niveau du controle (calcul par défaut)
        options.apiKey = this.options.routeOptions.apiKey || this.options.apiKey;

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

        // mise en place de la patience
        this._displayWaitingContainer();

        // appel du service de calcul d'itinéraires
        Gp.Services.route(options);
    }

    /**
     * this method is called by this.onRouteComputationSubmit() (in case of route computation success)
     * and fills the container of the route instructions list, distance and time
     * information, also, constructs the geometry route.
     *
     * @param {Object} results - results of the route calculation
     *
     * @private
     */
    _fillRouteResultsDetails (results) {
        // 1. Affichage des distances et durées
        var distance = results.totalDistance;
        var duration = results.totalTime;
        // Détails avec simplifications des troncons
        var instructions = this._simplifiedInstructions(results.routeInstructions);
        // var instructions = results.routeInstructions;

        if (instructions) {
            this._fillRouteResultsDetailsContainer(distance, duration, instructions);
        }

        // 2. Affichage des géométries
        // Geometrie simplifiée (si renseignée)
        var geometry = results.routeGeometry;
        if (geometry) {
            this._fillRouteResultsDetailsGeometry(geometry, this._defaultFeatureStyle);
        }

        // Geometries des tronçon (si renseignée)
        if (instructions && instructions[0].geometry) {
            this._fillRouteResultsDetailsFeatureGeometry(instructions, this._defaultFeatureStyle);
        }

        // 3. Zoom sur l'emprise de l'itinéraire (si spécifiée)
        var bbox = results.bbox;
        if (bbox) {
            var map = this.getMap();
            var bounds = [bbox.left, bbox.bottom, bbox.right, bbox.top];
            // reprojection dans la projection de la carte (bbox initialement en EPSG:4326)
            var mapProj = map.getView().getProjection().getCode();
            if (mapProj !== "EPSG:4326") {
                bounds = olTransformExtentProj(bounds, "EPSG:4326", mapProj);
            }
            map.getView().fit(bounds, map.getSize());
        }

        // sauvegarde de l'etat des resultats
        this._currentRouteInformations = results;

        /**
         * event triggered when the compute is finished
         *
         * @event route:compute
         * @property {Object} type - event
         * @property {Object} target - instance Route
         * @example
         * Route.on("route:compute", function (e) {
         *   console.log(e.target.getData());
         * })
         */
        this.dispatchEvent({
            type : "route:compute"
        });

        // mise à jour du controle !
        this._formRouteContainer.className = "GPelementHidden gpf-hidden gpf-panel__content fr-modal__content";
        this._hideWaitingContainer();
        this._resultsRouteContainer.className = "";
    }

    /**
     * this method is called by this._fillRouteResultsDetails()
     * and fills the container of the route instructions list, distance and time
     * information.
     *
     * @param {Number} distance - distance
     * @param {Number} duration - duration
     * @param {Object[]} instructions - list of instructions
     *
     * @private
     */
    _fillRouteResultsDetailsContainer (distance, duration, instructions) {
        // Distance et Durée
        this._resultsRouteValuesContainer = this._addRouteResultsValuesElement(distance, duration, MathUtils.convertSecondsToTime);

        // Détails
        this._resultsRouteDetailsContainer = this._addRouteResultsDetailsElement(instructions, MathUtils.convertSecondsToTime);
    }

    /**
     * this method is called by this._fillRouteResultsDetails()
     * and constructs the geometry route.
     *
     * @param {Object} geometry - geoJSON object for route geometry
     * @param {Object} style - route ol.style.Style object
     * @private
     */
    _fillRouteResultsDetailsGeometry (geometry, style) {
        this._clearRouteResultsGeometry();

        var map = this.getMap();

        if (!geometry) {
            return;
        }

        // création de l'objet geoJSON
        var geojsonObject = {
            type : "FeatureCollection",
            features : [
                {
                    type : "Feature",
                    crs : {
                        type : "name",
                        properties : {
                            name : "EPSG:4326"
                        }
                    },
                    geometry : geometry
                }
            ]
        };

        var geojsonformat = new GeoJSONExtended({
            defaultDataProjection : "EPSG:4326",
            defaultStyle : style

        });
        var features = geojsonformat.readFeatures(
            geojsonObject, {
                dataProjection : "EPSG:4326",
                featureProjection : "EPSG:3857"
            }
        );

        // ajout de la géométrie comme nouvelle couche vecteur à la carte
        this._geojsonRoute = new VectorLayer({
            source : new VectorSource({
                features : features
            }),
            style : style,
            title : "Mon Itinéraire"
        });
        map.addLayer(this._geojsonRoute);
    }

    /**
     * this method is called by this._fillRouteResultsDetails()
     * and constructs the geometries street with informations.
     *
     * @param {Array} instructions - route instructions list (containing geoJSON geometry)
     * @param {Object} style - route ol.style.Style object
     * @private
     */
    _fillRouteResultsDetailsFeatureGeometry (instructions, style) {
        this._clearRouteResultsFeatureGeometry();

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
            features : []
        };

        // 2. Remplissage de l'objet geoJSON : ajout des géométries de chaque instruction
        for (var i = 0; i < instructions.length; i++) {
            var o = instructions[i];
            var id = i + 1;

            var coords = o.geometry.coordinates;
            for (var j = 0; j < coords.length; j++) {
                // remarque : les coordonnées sont au format string, à convertir en nombres
                if (typeof coords[j][0] === "string") {
                    coords[j][0] = parseFloat(coords[j][0]);
                    coords[j][1] = parseFloat(coords[j][1]);
                }
            }

            this._geojsonObject.features.push({
                type : "Feature",
                geometry : o.geometry,
                properties : {
                    popupContent : "(" + id + ") distance : " + MathUtils.convertDistance(o.distance) +
                        " / temps : " + MathUtils.convertSecondsToTime(o.duration)
                },
                id : id
            });
        }

        // Ajout du point de depart du tracé
        this._geojsonObject.features.push({
            type : "Feature",
            geometry : {
                type : "Point",
                coordinates : this._currentPoints[0].getCoordinate()
            },
            properties : {
                description : "Point de départ",
                "marker-symbol" : this.options.markersOpts.departure.url
            }
        });

        // Ajout des points d'étapes
        for (var k = 1; k < this._currentPoints.length - 1; k++) {
            if (this._currentPoints[k] && this._currentPoints[k].getCoordinate) {
                var coordinates = this._currentPoints[k].getCoordinate();
                if (coordinates) {
                    this._geojsonObject.features.push({
                        type : "Feature",
                        geometry : {
                            type : "Point",
                            coordinates : coordinates
                        },
                        properties : {
                            description : "Point d'étape",
                            "marker-symbol" : this.options.markersOpts.stages.url
                        }
                    });
                }
            }
        }

        // Ajout du point d'arrivée du tracé
        this._geojsonObject.features.push({
            type : "Feature",
            geometry : {
                type : "Point",
                coordinates : this._currentPoints[this._currentPoints.length - 1].getCoordinate()
            },
            properties : {
                description : "Point d'arrivée",
                "marker-symbol" : this.options.markersOpts.arrival.url
            }
        });

        // Création du format GeoJSON, avec reprojection des géométries
        var geojsonformat = new GeoJSONExtended({
            defaultDataProjection : "EPSG:4326",
            defaultStyle : style
        });
        var mapProj = this.getMap().getView().getProjection().getCode();
        var features = geojsonformat.readFeatures(
            this._geojsonObject, {
                dataProjection : "EPSG:4326",
                featureProjection : mapProj
            }
        );

        // 3. Ajout du tracé de l'itinéraire (geoJSON) comme nouvelle couche vecteur à la carte
        this._geojsonSections = new VectorLayer({
            source : new VectorSource({
                features : features
            }),
            style : style,
            opacity : 0.9,
            title : "Mon Itinéraire"
        });

        var graph;
        if (this._currentTransport === "Pieton") {
            graph = "piéton";
            this._geojsonSections.gpResultLayerId = "compute:Pieton$OGC:OPENLS;Itineraire";
        } else {
            graph = "voiture";
            this._geojsonSections.gpResultLayerId = "compute:Voiture$OGC:OPENLS;Itineraire";
        }
        // ajout à la carte
        map.addLayer(this._geojsonSections);

        // 4. Si un layer switcher est présent dans la carte, on lui affecte des informations pour cette couche
        map.getControls().forEach(
            (control) => {
                if (control instanceof LayerSwitcher) {
                    // un layer switcher est présent dans la carte
                    var layerId = this._geojsonSections.gpLayerId;
                    // on n'ajoute des informations que s'il n'y en a pas déjà (si le titre est le numéro par défaut)
                    if (control._layers[layerId].title === layerId) {
                        control.addLayer(
                            this._geojsonSections, {
                                title : this.options.layerDescription.title + " (" + graph + ")",
                                description : this.options.layerDescription.description
                            }
                        );
                    }
                }
            },
            this
        );

        // 5. Ajout de popups aux troncons
        // Création de l'interaction : survol des features (=troncons de l'itinéraire)
        this._resultsHoverInteraction = new SelectInteraction({
            condition : eventPointerMove,
            layers : [this._geojsonSections],
            style : this._selectedFeatureStyle
        });
        this._resultsHoverInteraction.on(
            "select",
            (e) => this._onResultsFeatureMouseOver(e)
        );
        map.addInteraction(this._resultsHoverInteraction);

        // Création de l'interaction : selection des features (=troncons de l'itinéraire)
        this._resultsSelectInteraction = new SelectInteraction({
            layers : [this._geojsonSections],
            style : this._selectedFeatureStyle
        });
        this._resultsSelectInteraction.on(
            "select",
            (e) => this._onResultsFeatureSelect(e)
        );
        map.addInteraction(this._resultsSelectInteraction);
    }

    /**
     * this method is called on route features hover
     * and highlight instruction label
     *
     * @param {Object} e - event
     *
     * @private
     */
    _onResultsFeatureMouseOver (e) {
        if (e.selected.length !== 0) {
            // si on a bien survolé un tronçon, on surligne l'instruction correspondante
            var f = e.selected[0];
            var selectedInstruction = document.getElementById("GProuteResultsDetailsInstruction_" + f.getId() + "-" + this._uid);
            if (selectedInstruction && selectedInstruction.classList) {
                selectedInstruction.classList.add("GProuteResultsDetailsInstructionHighlight");
            }
        }

        // si on déselectionne un tronçon (mouseout), on rétablit un style normal pour l'instruction
        if (e.deselected.length !== 0) {
            var deselectedFeature = e.deselected[0];
            // on repasse l'instruction correspondante en normal
            var deSelectedInstruction = document.getElementById("GProuteResultsDetailsInstruction_" + deselectedFeature.getId() + "-" + this._uid);
            if (deSelectedInstruction && deSelectedInstruction.classList) {
                deSelectedInstruction.classList.remove("GProuteResultsDetailsInstructionHighlight");
            }
        }
    }

    /**
     * this method is called on route features select
     * and set a popup with feature information
     *
     * @param {Object} e - on select event
     * @private
     */
    _onResultsFeatureSelect (e) {
        var map = this.getMap();
        if (e.selected.length !== 0) {
            // si on a sélectionné un troncon, on lui ajoute une popup
            var f = e.selected[0];
            this._popupContent.innerHTML = f.getProperties().popupContent;

            if (!this._popupOverlay) {
                // ajout de la popup a la carte comme un overlay
                this._popupOverlay = new Overlay({
                    element : this._popupDiv,
                    positioning : "bottom-center",
                    position : e.mapBrowserEvent.coordinate
                });
                map.addOverlay(this._popupOverlay);
            } else {
                // si l'overlay est déjà créé, on modifie juste sa position
                this._popupOverlay.setPosition(e.mapBrowserEvent.coordinate);
            }
        } else {
            // si aucun troncon n'est sélectionné (click à côté du tracé),
            // on fait disparaitre la popup si elle existe
            if (this._popupOverlay != null) {
                this._popupOverlay.setPosition(undefined);
            }
        }
    }

    // ################################################################### //
    // ############################# Clean ############################### //
    // ################################################################### //

    /**
     * this method is called by this.onShowRoutePanelClick()
     * and it clears all elements (reinit).
     *
     * @private
     */
    _clear () {
        this._currentTransport = null;
        this._currentExclusions = [];
        this._currentComputation = null;

        // les resultats
        this._clearRouteResultsDetails();
        // la geometrie
        this._clearRouteResultsGeometry();
        this._clearRouteResultsFeatureGeometry();
        // les points
        for (var i = 0; i < this._currentPoints.length; i++) {
            this._currentPoints[i].clear();
        }
        // suppression des points intermédiaires
        this._removeRouteStepLocations();
    }

    /**
     * this method is called by this.onRouteResetClick()
     * and it clears all options inputs (reinit).
     *
     * @private
     */
    _clearRouteInputOptions () {
        // reinit options to default
        this._initTransport();
        this._initComputation();
        this._initExclusions();

        // set transport mode to default
        var transportdiv;
        if (this._currentTransport === "Pieton") {
            transportdiv = document.getElementById("GProuteTransportPedestrian-" + this._uid);
            if (transportdiv) {
                transportdiv.checked = "true";
            }
        } else {
            transportdiv = document.getElementById("GProuteTransportCar-" + this._uid);
            if (transportdiv) {
                transportdiv.checked = "true";
            }
        }

        // set computation mode to default
        var computationdiv = document.getElementById("GProuteComputationSelect-" + this._uid);
        if (computationdiv) {
            computationdiv.value = this._currentComputation;
        }

        // set exclusions to default
        var tollInput = document.getElementById("GProuteExclusionsToll-" + this._uid);
        if (tollInput) {
            if (this._currentExclusions.indexOf("toll") !== -1) {
                tollInput.checked = false;
            } else {
                tollInput.checked = true;
            }
        }

        var tunnelInput = document.getElementById("GProuteExclusionsTunnel-" + this._uid);
        if (tunnelInput) {
            if (this._currentExclusions.indexOf("tunnel") !== -1) {
                tunnelInput.checked = false;
            } else {
                tunnelInput.checked = true;
            }
        }

        var bridgeInput = document.getElementById("GProuteExclusionsBridge-" + this._uid);
        if (bridgeInput) {
            if (this._currentExclusions.indexOf("bridge") !== -1) {
                bridgeInput.checked = false;
            } else {
                bridgeInput.checked = true;
            }
        }
    }

    /**
     * this method is called by this._clear()
     * and it removes step location inputs (excepted departure and arrival)
     *
     * @private
     */
    _removeRouteStepLocations () {
        var points = document.querySelectorAll("div[id^=\"GPlocationPoint\"]");
        if (points.length !== 0) {
            var goodPoints = [];
            for (var k = 0; k < points.length; k++) {
                if (points[k].id.indexOf(this._uid) !== -1) {
                    goodPoints.push(points[k]);
                }
            }
            // on boucle sur les points intermédiaires
            for (var i = 1; i < (goodPoints.length - 1); i++) {
                // on va regarder les classes associées
                var classList = goodPoints[i].classList;
                if (classList.length !== 0) {
                    for (var j = 0; j < classList.length; j++) {
                        if (classList[j] === "GPlocationStageFlexInput") {
                            // si l'élément est visible, on le supprime en simulant un clic sur la croix (x)
                            document.getElementById(this._addUID("GPlocationStageRemove_" + (i + 1))).click();
                        }
                    }
                }
            }
        }
    }

    /**
     * this method is called by this.onRouteComputationSubmit() (in case of failure)
     * and it clears all route instructions.
     *
     * @private
     */
    _clearRouteResultsDetails () {
        this._currentRouteInformations = null;

        // doit on nettoyer le container "GProuteResultsDetails" ?
        // il sera de toute façon écrasé par la prochaine requête...
        if (this._resultsRouteDetailsContainer) {
            var detailsDiv = this._resultsRouteDetailsContainer;
            if (detailsDiv.childElementCount) {
                while (detailsDiv.firstChild) {
                    detailsDiv.removeChild(detailsDiv.firstChild);
                }
            }
        }

        if (this._resultsRouteValuesContainer) {
            var valuesDiv = this._resultsRouteValuesContainer;
            if (valuesDiv.childElementCount) {
                while (valuesDiv.firstChild) {
                    valuesDiv.removeChild(valuesDiv.firstChild);
                }
            }
        }
    }

    /**
     * this method is called by this.onRouteComputationSubmit()
     * and it clears all route geometries.
     *
     * @private
     */
    _clearRouteResultsGeometry () {
        var map = this.getMap();

        if (this._geojsonRoute != null) {
            map.removeLayer(this._geojsonRoute);
            this._geojsonRoute = null;
        }
    }

    /**
     * this method is called by this.onRouteComputationSubmit()
     * and it clears all route geometries.
     *
     * @private
     */
    _clearRouteResultsFeatureGeometry () {
        var map = this.getMap();

        // on retire la couche itinéraire de la carte
        if (this._geojsonSections != null) {
            map.removeLayer(this._geojsonSections);
            this._geojsonSections = null;
            this._geojsonObject = null;
        }
        // on retire l'overlay de la popup de la carte
        if (this._popupOverlay != null) {
            map.removeOverlay(this._popupOverlay);
            this._popupOverlay = null;
        }
        // et les interactions liées à cette couche
        if (this._resultsSelectInteraction != null) {
            map.removeInteraction(this._resultsSelectInteraction);
            this._resultsSelectInteraction = null;
        }
        if (this._resultsHoverInteraction != null) {
            map.removeInteraction(this._resultsHoverInteraction);
            this._resultsHoverInteraction = null;
        }
    }

    /**
     * this method is called by event 'click' on control main container
     * and hide suggested Locations (unless target is an autocomplete input)
     *
     * @param {Object} e - event
     *
     * @private
     */
    _hideRouteSuggestedLocations (e) {
        // si on clique sur un input de saisie de locationSelector
        if (e.target && e.target.id && e.target.id.indexOf("GPlocationOrigin_") !== -1) {
            // on récupère le numéro du point
            var pointId = parseInt(e.target.id.split("_")[1][0], 10) - 1;
            // et on cache les autres résultats d'autocomplétion (sauf celui sur lequel on clique)
            for (var j = 0; j < this._currentPoints.length; j++) {
                if (j !== parseInt(pointId, 10)) {
                    this._currentPoints[j]._hideSuggestedLocation();
                }
            }
        } else {
            // si on clique ailleurs dans le DOM du control, on cache tous les résultats d'autocomplétion
            for (var i = 0; i < this._currentPoints.length; i++) {
                this._currentPoints[i]._hideSuggestedLocation();
            }
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
        // ceci est vrai, uniquement sur le protocole JSONP !
        var opts = this.options.routeOptions;
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
            var opts = this.options.routeOptions;
            if (opts && opts.timeOut) {
                clearTimeout(this._timer);
                this._timer = null;
            }
        }
    }

    // ################################################################### //
    // ########################## Geometry ############################### //
    // ################################################################### //

    /**
     * simplified instructions
     *
     * @param {Object[]} instructions - list of instructions
     *
     * @returns {Object[]} simplified instructions
     *
     * @private
     */
    _simplifiedInstructions (instructions) {
        var newInstructions = [];

        // cas où...
        var current = instructions[0];
        if (instructions.length === 1) {
            newInstructions.push(current);
        }

        for (var i = 1; i < instructions.length; i++) {
            var o = instructions[i];
            if (o.instruction === current.instruction) {
                current.distance = (parseFloat(o.distance) + parseFloat(current.distance)).toString();
                current.duration = (parseFloat(o.duration) + parseFloat(current.duration)).toString();
                for (var j = 1; j < o.geometry.coordinates.length; j++) {
                    current.geometry.coordinates.push(o.geometry.coordinates[j]);
                }
            } else {
                newInstructions.push(current);
                current = o;
                // last
                if (i === instructions.length - 1) {
                    newInstructions.push(o);
                    current = null;
                }
            }
        }
        logger.log(newInstructions);
        return newInstructions;
    }
    
};

// on récupère les méthodes de la classe commune ReverseGeocodingDOM
Object.assign(Route.prototype, RouteDOM);
Object.assign(Route.prototype, Widget);

export default Route;

// Expose Route as ol.control.Route (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.Route = Route;
}
