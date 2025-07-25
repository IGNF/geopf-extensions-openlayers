// import CSS
import "../../CSS/Controls/ReverseGeocoding/GPFreverseGeocoding.css";
// import "../../CSS/Controls/ReverseGeocoding/GPFreverseGeocodingStyle.css";
// import OpenLayers
// import Control from "ol/control/Control";
import Widget from "../Widget";
import Control from "../Control";
import Overlay from "ol/Overlay";
import Collection from "ol/Collection";
import Feature from "ol/Feature";
import {
    Fill,
    Icon,
    Stroke,
    Style,
    Circle
} from "ol/style";
import {
    Circle as CircleGeom,
    LineString,
    Point,
    Polygon
} from "ol/geom";
import {
    Select as SelectInteraction,
    Draw as DrawInteraction
} from "ol/interaction";
import { pointerMove as eventPointerMove } from "ol/events/condition";
import { transform as olTransformProj } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
// import geoportal library access
import Gp from "geoportal-access-lib";
// import local
import Utils from "../../Utils/Helper";
import Logger from "../../Utils/LoggerByDefault";
import SelectorID from "../../Utils/SelectorID";
import Markers from "../Utils/Markers";
import Draggable from "../../Utils/Draggable";
import Interactions from "../Utils/Interactions";
// import local with ol dependencies
import LayerSwitcher from "../LayerSwitcher/LayerSwitcher";
// DOM
import ReverseGeocodeDOM from "./ReverseGeocodeDOM";

var logger = Logger.getLogger("reversegeocoding");

/**
 * @classdesc
 *
 * ReverseGeocode Control.
 *
 * @constructor
 * @alias ol.control.ReverseGeocode
 * @type {ol.control.ReverseGeocode}
 * @extends {ol.control.Control}
 * @param {Object} options - ReverseGeocode control options
 * @param {Number} [options.id] - Ability to add an identifier on the widget (advanced option)
 * @param {String}  [options.apiKey] - API key for services call (reverse geocode service). The key "calcul" is used by default.
 * @param {String}  [options.ssl = true] - use of ssl or not (default true, service requested using https protocol)
 * @param {Boolean} [options.collapsed = true] - Specify if widget has to be collapsed (true) or not (false) on map loading. Default is true.
 * @param {Boolean} [options.draggable = false] - Specify if widget is draggable
 * @param {Object}  [options.resources =  ["StreetAddress", "PositionOfInterest", "CadastralParcel"]] - resources for geocoding, by default : ["StreetAddress", "PositionOfInterest", "CadastralParcel"]. Possible values are : "StreetAddress", "PositionOfInterest", "CadastralParcel". Resources will be displayed in the same order in widget list.
 * @param {Object}  [options.delimitations = ["Point", "Circle", "Extent"]] - delimitations for reverse geocoding, by default : ["Point", "Circle", "Extent"]. Possible values are : "Point", "Circle", "Extent". Delimitations will be displayed in the same order in widget list.
 * @param {Object}  [options.reverseGeocodeOptions = {}] - reverse geocode service options. see {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~reverseGeocode Gp.Services.reverseGeocode()} to know all reverse geocode options.
 * @param {Object} [options.layerDescription = {}] - Layer informations to be displayed in LayerSwitcher widget (only if a LayerSwitcher is also added to the map)
 * @param {String} [options.layerDescription.title = "Saisie (recherche inverse)"] - Layer title to be displayed in LayerSwitcher
 * @param {String} [options.layerDescription.description = "Couche de saisie d'une zone de recherche pour la recherche inverse"] - Layer description to be displayed in LayerSwitcher
 * @fires reversegeocode:compute
 * @fires reversegeocode:onclickresult
 * @example
 *  var iso = ol.control.ReverseGeocode({
 *      "collapsed" : false,
 *      "draggable" : true,
 *      "resources" : ["StreetAddress", "PositionOfInterest"],
 *      "delimitations" : ["Point", "Circle"],
 *      "reverseGeocodeOptions" : {}
 *  });
 */
class ReverseGeocode extends Control {

    /**
     * See {@link ol.control.ReverseGeocode}
     * @module ReverseGeocode
     * @alias module:~controls/ReverseGeocode
     * @param {*} options - options
     * @example
     * import ReverseGeocode from "gpf-ext-ol/controls/ReverseGeocode"
     * ou
     * import { ReverseGeocode } from "gpf-ext-ol"
     */
    constructor (options) {
        options = options || {};

        // call ol.control.Control constructor
        super(options);

        if (!(this instanceof ReverseGeocode)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }
        /**
         * Nom de la classe (heritage)
         * @private
         */
        this.CLASSNAME = "ReverseGeocode";
        // initialisation du composant
        this.initialize(options);

        // Widget main DOM container
        this.container = this._initContainer();

        // ajout du container
        (this.element) ? this.element.appendChild(this.container) : this.element = this.container;

        return this;
    }

    // ################################################################### //
    // ############## public methods (getters, setters) ################## //
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
            logger.log("[ERROR] ReverseGeocode:setCollapsed - missing collapsed parameter");
            return;
        }
        if ((collapsed && this.collapsed) || (!collapsed && !this.collapsed)) {
            return;
        }
        if (collapsed) {
            this._panelCloseButton.click();
        } else {
            this._showReverseGeocodingButton.click();
        }
        this.collapsed = collapsed;
    }

    /**
     * Overwrite OpenLayers setMap method
     *
     * @param {ol.Map} map - Map.
     */
    setMap (map) {
        if (map) {
            // lors de l'ajout à la map, on active la saisie du point ou de la zone de recherche sur la carte,
            // mais seulement si le widget est ouvert
            this._activateMapInteraction(map);

            // mode "draggable"
            if (this.draggable) {
                Draggable.dragElement(
                    this._panelContainer,
                    this._panelHeaderContainer,
                    map.getTargetElement()
                );
            }
            // mode "collapsed"
            if (!this.collapsed) {
                // this._showReverseGeocodingButton.click();
                this._showReverseGeocodingButton.setAttribute("aria-pressed", true);
            }
        } else {
            var _map = this.getMap();
            // on remet à zéro = on efface les géométries + interactions + valeurs stockées
            // suppression des résultats précédents
            this._clearResults();
            // on efface les points qui ont pu être saisis précédemment
            this._clearInputFeatures();
            // on supprime l'éventuelle précédente interaction
            this._removeMapInteraction(_map);
            // on retire aussi la couche de saisie de la zone de recherche à la fermeture du widget
            if (this._inputFeaturesLayer != null) {
                _map.removeLayer(this._inputFeaturesLayer);
                this._inputFeaturesLayer = null;
                this._inputFeaturesSources = null;
                this._inputFeatures = null;
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

    /**
     * Get locations data
     *
     * @returns {Object} data - locations
     */
    getData () {
        return this._reverseGeocodingLocations;
    }

    /**
     * Get container
     *
     * @returns {DOMElement} container
     */
    getContainer () {
        return this.container;
    }
    // ################################################################### //
    // ##################### init component ############################## //
    // ################################################################### //

    /**
     * Initialize ReverseGeocode control (called by ReverseGeocode constructor)
     *
     * @param {Object} options - constructor options
     * @private
     */
    initialize (options) {
        // ############################################################ //
        // ################### Options du composant ################### //

        // check input options format (resources and delimitations arrays)
        this._checkInputOptions(options);

        // set default options
        this.options = {
            collapsed : true,
            draggable : false,
            resources : ["StreetAddress", "PositionOfInterest", "CadastralParcel"],
            delimitations : ["Point", "Circle", "Extent"],
            reverseGeocodeOptions : {},
            layerDescription : {
                title : "Saisie (recherche inverse)",
                description : "Couche de saisie d'une zone de recherche pour la recherche inverse"
            }
        };

        // merge with user options
        Utils.assign(this.options, options);

        /** {Boolean} specify if reverseGeocoding control is collapsed (true) or not (false) */
        this.collapsed = this.options.collapsed;

        /** {Boolean} specify if reverseGeocoding control is draggable (true) or not (false) */
        this.draggable = this.options.draggable;

        // identifiant du contrôle : utile pour suffixer les identifiants CSS (pour gérer le cas où il y en a plusieurs dans la même page)
        this._uid = this.options.id || SelectorID.generate();

        // #################################################################### //
        // ################### informations sur les droits #################### //

        // Type de géocodage sélectionné (StreetAddress, PositionOfInterest, ...)
        this._currentGeocodingType = null;
        this._initGeocodingType();

        // Type de délimitation à utiliser pour la requête + pour sélection sur la containerDistance
        this._currentGeocodingDelimitation = null;
        this._initGeocodingDelimitation();

        // ################################################################## //
        // ################### Elements principaux du DOM ################### //

        // containers principaux
        this._showReverseGeocodingButton = null;
        // panel
        this._panelContainer = null;
        this._panelHeaderContainer = null;
        this._panelTitleContainer = null;
        this._returnPictoContainer = null;
        this._panelCloseButton = null;
        // form
        this._formContainer = null;
        // results
        this._resultsContainer = null;
        this._resultsListContainer = null;
        // waiting
        this._waitingContainer = null;

        // ###################################################################### //
        // ################### informations des points saisis ################### //

        // collection des points saisis sur la carte
        this._inputFeatures = null;
        // source contenant les features ci-dessus
        this._inputFeaturesSource = null;
        // couche vectorielle dans laquelle seront saisis les points (features ci-dessus)
        this._inputFeaturesLayer = null;
        // interaction avec la carte (de type "Point", "Circle" ou "Polygon")
        this._mapInteraction = null;

        // #################################################################### //
        // ################### informations pour la requête ################### //

        // options pour la requête de géocodage inverse
        this._requestOptions = null;
        // geometrie de recherche du géocodage inverse qui sera envoyée dans la requête
        this._requestGeom = null;
        this._requestPosition = null;
        // pour savoir si un calcul est en cours ou non
        this._waiting = false;
        // timer pour cacher la patience après un certain temps
        this._timer = null;

        // #################################################################### //
        // #################### informations des résultats #################### //

        this._reverseGeocodingLocations = [];
        this._reverseGeocodingLocationsMarkers = [];
        this._resultsDefaultStyle = new Style({
            image : new Icon({
                src : Markers["lightOrange"],
                anchor : [0.5, 1]
            })
        });
        this._resultsSelectedStyle = new Style({
            image : new Icon({
                src : Markers["red"],
                anchor : [0.5, 1]
            })
        });
        this._resultsHoverInteraction = null;
        this._resultsSelectInteraction = null;
        // container de la popup (affichage des infos au clic sur les markers)
        this._popupContent = null;
        this._popupDiv = this._initPopupDiv();
        this._popupOverlay = null;
    }

    /**
     * this method is called by this.initialize()
     * and makes sure input options are correctly formated
     *
     * @param {Object} options - options
     *
     * @private
     */
    _checkInputOptions (options) {
        var i;
        var j;

        // on vérifie le tableau des resources
        if (options.resources) {
            var resources = options.resources;
            // on vérifie que la liste des ressources de geocodage est bien un tableau
            if (Array.isArray(resources)) {
                var resourcesList = ["StreetAddress", "PositionOfInterest", "CadastralParcel"];
                var wrongResourcesIndexes = [];
                for (i = 0; i < resources.length; i++) {
                    if (resourcesList.indexOf(resources[i]) === -1) {
                        // si la resource n'est pas référencée, on stocke son index pour la retirer du tableau (après avoir terminé de parcourir le tableau)
                        wrongResourcesIndexes.push(i);
                        logger.log("[ReverseGeocode] options.resources : " + resources[i] + " is not a resource for reverse geocode");
                    }
                }
                // on retire les ressoures non référencées qu'on a pu rencontrer
                if (wrongResourcesIndexes.length !== 0) {
                    for (j = 0; j < wrongResourcesIndexes.length; j++) {
                        resources.splice(wrongResourcesIndexes[j], 1);
                    }
                }
            } else {
                logger.log("[ReverseGeocode] 'options.resources' parameter should be an array");
                resources = null;
            }
        }

        // et le tableau des délimitations
        if (options.delimitations) {
            var delimitations = options.delimitations;
            // on vérifie que la liste des delimitations est bien un tableau
            if (Array.isArray(delimitations)) {
                var delimitationsList = ["Circle", "Point", "Extent"];
                var wrongDelimitationsIndexes = [];
                for (i = 0; i < delimitations.length; i++) {
                    if (delimitationsList.indexOf(delimitations[i]) === -1) {
                        // si la delimitations n'est pas référencée, on stocke son index pour la retirer du tableau (après avoir terminé de parcourir le tableau)
                        wrongDelimitationsIndexes.push(i);
                        logger.log("[ReverseGeocode] options.delimitations : " + delimitations[i] + " is not a delimitation for reverse geocode");
                    }
                }
                // on retire les ressoures non référencées qu'on a pu rencontrer
                if (wrongDelimitationsIndexes.length !== 0) {
                    for (j = 0; j < wrongDelimitationsIndexes.length; j++) {
                        delimitations.splice(wrongDelimitationsIndexes[j], 1);
                    }
                }
            } else {
                logger.log("[ReverseGeocode] 'options.delimitations' parameter should be an array");
                delimitations = null;
            }
        }
    }

    /**
     * this method is called by this.initialize() and initialize geocoding type (=resource)
     * ("StreetAddress", "PositionOfInterest", "CadastralParcel")
     *
     * @private
     */
    _initGeocodingType () {
        // Type de géocodage selectionné
        this._currentGeocodingType = "StreetAddress"; // par defaut

        // par defaut
        var resources = this.options.resources;
        if (!resources || resources.length === 0) {
            this.options.resources = ["StreetAddress", "PositionOfInterest", "CadastralParcel"];
        }

        // options utilisateur
        if (Array.isArray(resources) && resources.length) {
            // récupération du type par défaut
            if (resources[0] === "StreetAddress" || resources[0] === "PositionOfInterest" || resources[0] === "CadastralParcel") {
                this._currentGeocodingType = resources[0];
            }
        }

        // si l'utilisateur a spécifié au moins une ressource dans le service, on surcharge les options du widget
        var serviceOptions = this.options.reverseGeocodeOptions;
        if (serviceOptions.filterOptions && Array.isArray(serviceOptions.filterOptions.type) && serviceOptions.filterOptions.type.length !== 0) {
            this._currentGeocodingType = serviceOptions.filterOptions.type[0];
        }
    }

    /**
     * this method is called by this.initialize() and initialize geocoding delimitation
     * ("Point", "Circle", "Extent")
     *
     * @private
     */
    _initGeocodingDelimitation () {
        // Type de délimitation selectionné
        this._currentGeocodingDelimitation = "Point"; // par defaut

        // par defaut
        var delimitations = this.options.delimitations;
        if (!delimitations || delimitations.length === 0) {
            this.options.delimitations = ["Point", "Circle", "Extent"];
        }

        // options utilisateur
        if (Array.isArray(delimitations) && delimitations.length) {
            var d = delimitations[0].toLowerCase();
            if (d === "point" || d === "circle" || d === "extent") {
                this._currentGeocodingDelimitation = delimitations[0];
            }
        }
    }

    /**
     * this method is called by this.initialize() and initialize popup div
     * (to display results information on marker click)
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

    /**
     * Create control main container (DOM initialize)
     *
     * @returns {DOMElement} DOM element
     *
     * @private
     */
    _initContainer () {
        // create main container
        var container = this._createMainContainerElement();

        // create ReverseGeocode picto
        var picto = this._showReverseGeocodingButton = this._createShowReverseGeocodingPictoElement();
        container.appendChild(picto);

        // panel
        var reverseGeocodingPanel = this._panelContainer = this._createReverseGeocodingPanelElement();
        var reverseGeocodingPanelDiv = this._createReverseGeocodingPanelDivElement();
        reverseGeocodingPanel.appendChild(reverseGeocodingPanelDiv);

        // header
        var panelHeader = this._panelHeaderContainer = this._createReverseGeocodingPanelHeaderElement();

        // return picto (hidden at start)
        var returnPicto = this._returnPictoContainer = this._createReverseGeocodingPanelReturnPictoElement();
        panelHeader.appendChild(returnPicto);
        // title
        var panelTitle = this._panelTitleContainer = this._createReverseGeocodingPanelTitleElement();
        panelHeader.appendChild(panelTitle);
        // close picto
        var closeDiv = this._panelCloseButton = this._createReverseGeocodingPanelCloseElement();
        panelHeader.appendChild(closeDiv);
        reverseGeocodingPanelDiv.appendChild(panelHeader);

        // form
        var reverseGeocodingForm = this._formContainer = this._createReverseGeocodingPanelFormElement();
        // choices element
        reverseGeocodingForm.appendChild(this._createReverseGeocodingFormModeChoiceGeocodingTypeElement(this.options.resources));
        reverseGeocodingForm.appendChild(this._createReverseGeocodingFormModeChoiceGeocodingDelimitationElement(this.options.delimitations));

        // submit (bouton "Chercher")
        var submit = this._createReverseGeocodingSubmitFormElement();
        reverseGeocodingForm.appendChild(submit);

        reverseGeocodingPanelDiv.appendChild(reverseGeocodingForm);

        // waiting
        var waiting = this._waitingContainer = this._createReverseGeocodingWaitingElement();
        reverseGeocodingPanelDiv.appendChild(waiting);

        // results (dans le panel)
        var resultsPanel = this._resultsContainer = this._createReverseGeocodingResultsPanelElement();
        var reverseGeocodingResultsList = this._resultsListContainer = this._createReverseGeocodingResultsListElement();
        resultsPanel.appendChild(reverseGeocodingResultsList);
        reverseGeocodingPanelDiv.appendChild(resultsPanel);

        container.appendChild(reverseGeocodingPanel);

        logger.log(container);

        return container;
    }

    // ################################################################### //
    // ################### Map interactions management ################### //
    // ################################################################### //

    /**
     * this method is called by this.setMap,
     * or by this.onShowReverseGeocodingClick,
     * and calls method corresponding to current delimitation, if widget is not collapsed.
     *
     * @param {ol.Map} map - control map.
     * @private
     */
    _activateMapInteraction (map) {
        if (!this.collapsed) {
            // 1. Creation de la couche vectorielle sur laquelle on va dessiner
            if (this._inputFeaturesLayer == null) {
                // on crée une collection, qui accueillera les points saisis sur la carte par les interactions,
                // sous formes de features (dans une couche vectorielle).
                // on les stocke de sorte à pouvoir les supprimer facilement
                this._inputFeatures = new Collection();

                // on crée la couche qui va accueillir les features
                this._inputFeaturesSource = new VectorSource({
                    features : this._inputFeatures
                });
                this._inputFeaturesLayer = new VectorLayer({
                    source : this._inputFeaturesSource,
                    style : new Style({
                        fill : new Fill({
                            color : "rgba(0, 183, 152, 0.3)"
                        }),
                        stroke : new Stroke({
                            color : "rgba(0, 183, 152, 0.8)",
                            width : 3
                        }),
                        image : new Icon({
                            src : Markers["turquoiseBlue"],
                            anchor : [0.5, 1]
                        })
                    })
                });
                // on rajoute le champ gpResultLayerId permettant d'identifier une couche crée par le composant. (pour layerSwitcher par ex)
                this._inputFeaturesLayer.gpResultLayerId = "reverseGeocoding";
                // on ajoute la couche à la carte
                map.addLayer(this._inputFeaturesLayer);
            }

            // 2. Création de l'interaction de dessin, selon le type de délimitation sélectionné
            var delimitation = this._currentGeocodingDelimitation.toLowerCase();
            switch (delimitation) {
                case "point":
                    this._activatePointInteraction(map);
                    break;
                case "circle":
                    this._activateCircleInteraction(map);
                    break;
                case "extent":
                    this._activateBoxInteraction(map);
                    break;
                default:
                    break;
            }

            // 3. Si un layer switcher est présent dans la carte, on lui affecte des informations pour cette couche
            map.getControls().forEach(
                (control) => {
                    if (control instanceof LayerSwitcher) {
                        // un layer switcher est présent dans la carte
                        var layerId = this._inputFeaturesLayer.gpLayerId;
                        // on n'ajoute des informations que s'il n'y en a pas déjà (si le titre est le numéro par défaut)
                        if (control._layers[layerId].title === layerId) {
                            control.addLayer(
                                this._inputFeaturesLayer, {
                                    title : this.options.layerDescription.title,
                                    description : this.options.layerDescription.description
                                }
                            );
                            control.setRemovable(this._inputFeaturesLayer, false);
                        }
                    }
                }
            );
        }
    };

    /**
     * this method is called by this._activateMapInteraction,
     * and creates map point drawing interaction.
     *
     * @param {ol.Map} map - control map.
     * @private
     */
    _activatePointInteraction (map) {
        // interaction permettant de dessiner un point
        this._mapInteraction = new DrawInteraction({
            style : new Style({
                image : new Circle({
                    radius : 0,
                    fill : new Fill({
                        color : "rgba(0, 183, 152, 0.8)"
                    })
                })
            }),
            type : ("Point"),
            source : this._inputFeaturesSource
        });

        this._mapInteraction.on(
            "drawstart",
            (e) => {
                logger.log("on drawstart ", e);

                // on efface les points qui ont pu être saisis précédemment (on vide la collection des features de la couche)
                this._inputFeatures.clear();

                // on récupère les coordonnées du point qui vient d'être saisi
                this._onDrawStart(e, "point");
            }
        );

        this._mapInteraction.on(
            "drawend",
            (e) => {
                logger.log("on drawend", e);

                // on récupère le rayon du cercle qui vient d'être tracé
                if (e.feature && e.feature.getGeometry) {
                    this._requestGeom = {
                        type : "Point",
                        coordinates : [
                            this._requestPosition.lon,
                            this._requestPosition.lat
                        ]
                    };
                }
            }
        );

        map.addInteraction(this._mapInteraction);
        this._setCursor("crosshair", map);
    }

    /**
     * this method is called by this._activateMapInteraction,
     * and creates map circle drawing interaction.
     *
     * @param {ol.Map} map - control map.
     * @private
     */
    _activateCircleInteraction (map) {
        // interaction permettant de dessiner un cercle
        this._mapInteraction = new DrawInteraction({
            style : new Style({
                fill : new Fill({
                    color : "rgba(0, 183, 152, 0.3)"
                }),
                stroke : new Stroke({
                    color : "rgba(0, 183, 152, 0.8)",
                    width : 3
                }),
                image : new Circle({
                    radius : 4,
                    fill : new Fill({
                        color : "rgba(0, 183, 152, 0.8)"
                    })
                })
            }),
            type : ("Circle"),
            source : this._inputFeaturesSource,
            geometryFunction : function (coordinates, geometry) {
                const center = coordinates[0];
                const last = coordinates[coordinates.length - 1];
                const dx = center[0] - last[0];
                const dy = center[1] - last[1];
                const maxRadius = 500;
                const radius = Math.min(Math.sqrt(dx * dx + dy * dy), maxRadius);
                if (!geometry) {
                    geometry = new CircleGeom(center, radius);
                } else {
                    geometry.setCenterAndRadius(center, radius);
                }
                return geometry;
            }
        });

        this._mapInteraction.on(
            "drawstart",
            (e) => {
                logger.log("on drawstart ", e);
                // on efface les points qui ont pu être saisis précédemment (on vide la collection des features de la couche)
                this._inputFeatures.clear();
                // on récupère les coordonnées du centre du cercle = premier point du tracé
                this._onDrawStart(e, "circle");
            }
        );

        this._mapInteraction.on(
            "drawend",
            (e) => {
                logger.log("on drawend", e);

                // on récupère le rayon du cercle qui vient d'être tracé
                if (e.feature && e.feature.getGeometry) {
                    var radius = e.feature.getGeometry().getRadius();
                    // et on le stocke comme filtre pour la requête
                    this._requestGeom = {};
                    this._requestGeom.type = "Circle";
                    this._requestGeom.radius = radius;
                    if (this._requestPosition) {
                        this._requestGeom.coordinates = [
                            this._requestPosition.lon,
                            this._requestPosition.lat
                        ];
                    }
                    logger.log("circle radius : ", radius);
                }
            }
        );

        map.addInteraction(this._mapInteraction);
    }

    /**
     * this method is called by this._activateMapInteraction,
     * and creates map box drawing interaction.
     *
     * @param {ol.Map} map - control map.
     * @private
     */
    _activateBoxInteraction (map) {
        // info : il n'y a pas de geometry de type rectangle, donc on va créer un objet de type "LineString",
        // avec seulement 2 points qui formeront les extrémités du rectangle.
        // on aura donc une géométrie LineString avec 5 coordonnées : start, point2, end, point4, start,
        // où les coordonnées de point2 et point4 sont calculées à partir de start et end, et start est répété à la fin pour fermer la géométrie.

        // function to draw rectangle with only 2 points
        var geometryFunction = function (coordinates, geometry) {
            if (!geometry) {
                geometry = new Polygon([]);
            }
            var start = coordinates[0];
            var end = coordinates[1];
            const dx = start[0] - end[0];
            const dy = start[1] - end[1];
            const maxLength = 1000;
            const lengthX = Math.max(-maxLength, Math.min(dx, maxLength));
            const lengthY = Math.max(-maxLength, Math.min(dy, maxLength));
            // on crée les 5 coordonnées de la ligne à partir des 2 points saisis.
            geometry.setCoordinates([
                [start, [start[0], start[1] - lengthY], [start[0] - lengthX, start[1] - lengthY], [start[0] - lengthX, start[1]], start]
            ]);
            return geometry;
        };

        // interaction permettant de dessiner un rectangle (= LineString de 5 points, à partir de 2 points saisis)
        this._mapInteraction = new DrawInteraction({
            style : new Style({
                fill : new Fill({
                    color : "rgba(0, 183, 152, 0.3)"
                }),
                stroke : new Stroke({
                    color : "rgba(0, 183, 152, 0.8)",
                    width : 3
                }),
                image : new Circle({
                    radius : 4,
                    fill : new Fill({
                        color : "rgba(0, 183, 152, 0.8)"
                    })
                })
            }),
            type : ("LineString"),
            source : this._inputFeaturesSource,
            maxPoints : 2,
            geometryFunction : geometryFunction
        });

        this._mapInteraction.on(
            "drawstart",
            (e) => {
                logger.log("on drawstart", e);
                // on efface les points qui ont pu être saisis précédemment (on vide la collection des features de la couche)
                this._inputFeatures.clear();
                // on récupère les coordonnées du premier point du tracé
                this._onDrawStart(e, "polygon");
            }
        );

        this._mapInteraction.on(
            "drawend",
            (e) => {
                logger.log("on drawend", e);
                // on va récupérer les coordonnées du rectangle qui vient d'être tracé
                this._onBoxDrawEnd(e);
            }
        );

        map.addInteraction(this._mapInteraction);
    }

    /**
     * remove draw interaction from map (if exists)
     *
     * @param {ol.Map} map - control map.
     * @private
     */
    _removeMapInteraction (map) {
        if (this._mapInteraction != null) {
            map.removeInteraction(this._mapInteraction);
            this._mapInteraction = null;
        }
        this._setCursor();
    }

    /**
     * this method is called by event 'drawstart' on map point or circle drawing interaction
     * (cf. this._activatePointInteraction), and it gets map click coordinates.
     * this point is saved as a parameter for reverse Geocode service.
     *
     * @param {Object} e - HTMLElement
     * @param {String} type - geometry type : "point" or "circle"
     * @private
     */
    _onDrawStart (e, type) {
        var coordinate;
        if (e.feature && e.feature.getGeometry) {
            var geometry = e.feature.getGeometry();
            if (type === "point") {
                coordinate = geometry.getCoordinates();
            }
            if (type === "circle") {
                coordinate = geometry.getCenter();
            }
            if (type === "polygon") {
                coordinate = geometry.getFirstCoordinate();
            }
        }
        if (!coordinate) {
            return;
        }

        var crs;
        if (this.options.reverseGeocodeOptions && this.options.reverseGeocodeOptions.srs) {
            crs = this.options.reverseGeocodeOptions.srs;
        } else {
            var map = this.getMap();
            if (!map || !map.getView()) {
                return;
            }
            crs = map.getView().getProjection();
        }

        var geoCoordinate = olTransformProj(coordinate, crs, "EPSG:4326");
        this._requestPosition = {
            lon : geoCoordinate[0],
            lat : geoCoordinate[1]
        };
        logger.log("position coordinates : ", this._requestPosition);
    }

    /**
     * this method is called by event 'drawend' on map box drawing interaction
     * (cf. this._activateBoxInteraction), and it gets geometry coordinates,
     * to be saved as a filter parameter for reverse Geocode service.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    _onBoxDrawEnd (e) {
        // on va récupérer les coordonnées du rectangle qui vient d'être tracé
        if (e.feature && e.feature.getGeometry) {
            // info: coordinates est un tableau [start, point2, end, point4, start]
            // car c'est une linestring donc on a 5 coordonnées pour boucler
            var coordinates = e.feature.getGeometry().getCoordinates()[0];
            var start = coordinates[0];
            var end = coordinates[2];

            var crs;
            if (this.options.reverseGeocodeOptions && this.options.reverseGeocodeOptions.srs) {
                crs = this.options.reverseGeocodeOptions.srs;
            } else {
                var map = this.getMap();
                if (!map || !map.getView()) {
                    return;
                }
                crs = map.getView().getProjection();
            }

            // on reprojette les coordonnées des deux extrémités du rectangle (start et end)
            var startGeoCoordinate = olTransformProj(start, crs, "EPSG:4326");
            var endGeoCoordinate = olTransformProj(end, crs, "EPSG:4326");

            var bbox = {};
            // on récupère les valeurs left, right, top et bottom, pour le filtre bbox du service reverseGeocode
            if (startGeoCoordinate[0] < endGeoCoordinate[0]) {
                bbox.left = startGeoCoordinate[0];
                bbox.right = endGeoCoordinate[0];
            } else {
                bbox.left = endGeoCoordinate[0];
                bbox.right = startGeoCoordinate[0];
            }
            if (startGeoCoordinate[1] < endGeoCoordinate[1]) {
                bbox.bottom = startGeoCoordinate[1];
                bbox.top = endGeoCoordinate[1];
            } else {
                bbox.bottom = endGeoCoordinate[1];
                bbox.top = startGeoCoordinate[1];
            }

            this._requestGeom = {
                type : "Polygon",
                coordinates : [[
                    [bbox.left, bbox.top],
                    [bbox.left, bbox.bottom],
                    [bbox.right, bbox.bottom],
                    [bbox.right, bbox.top],
                    [bbox.left, bbox.top]
                ]]
            };

            logger.log("searchGeometry filter : ", this._requestGeom);
        }
    }

    /**
     * this change the cursor of the map when entering a point.
     *
     * @param {String} cursor - cursor style
     * @param {ol.Map} map - control map (optional)
     * @private
     */
    _setCursor (cursor, map) {
        map = map || this.getMap();
        if (!map) {
            return;
        }
        var div = map.getTargetElement();

        if (cursor) {
            div.style.cursor = cursor;
        } else {
            div.style.cursor = null;
        }
    }

    // ################################################################### //
    // ##################### Reverse Geocoding request ################### //
    // ################################################################### //

    /**
     * this methode is called by this.onReverseGeocodingSubmit method,
     * it generates and sends reverse geocode request, then displays results
     *
     * @private
     */
    _reverseGeocodingRequest () {
        var map = this.getMap();

        // on construit les options pour la requête
        this._requestOptions = this._getReverseGeocodingRequestOptions();

        // retrait de l'interaction sur la map pendant l'attente (et l'affichage des résultats)
        this._removeMapInteraction(map);
        // affichage d'une patience pendant l'attente
        this._displayWaitingContainer();

        // envoi de la requête
        Gp.Services.reverseGeocode(this._requestOptions);
    }

    /**
     * this methode is called by this._reverseGeocodingRequest method,
     * and returns options object for Gp.Services.reverseGeocode request
     *
     * @returns {Object} requestOptions - reverse geocode options
     * @private
     */
    _getReverseGeocodingRequestOptions () {
        var map = this.getMap();

        // on recupere les éventuelles options du service passées par l'utilisateur
        var reverseGeocodeOptions = this.options.reverseGeocodeOptions;

        // on crée les options pour le service reverseGeocode
        var context = this;
        if (typeof this.options.ssl !== "boolean") {
            this.options.ssl = true;
        }
        // gestion des callback
        var bOnFailure = !!(reverseGeocodeOptions.onFailure !== null && typeof reverseGeocodeOptions.onFailure === "function"); // cast variable to boolean
        var bOnSuccess = !!(reverseGeocodeOptions.onSuccess !== null && typeof reverseGeocodeOptions.onSuccess === "function");

        var requestOptions = {
            apiKey : reverseGeocodeOptions.apiKey || this.options.apiKey,
            ssl : this.options.ssl,
            position : this._requestPosition,
            filterOptions : {
                type : [this._currentGeocodingType]
            },
            srs : "CRS:84",
            returnFreeForm : false,
            maximumResponses : reverseGeocodeOptions.maximumResponses || 18,
            timeOut : reverseGeocodeOptions.timeOut || 30000,
            // protocol : reverseGeocodeOptions.protocol || "XHR",
            // callback onSuccess
            onSuccess : function (response) {
                if (response.locations) {
                    logger.log("reverseGeocode results : ", response.locations);
                    context._displayGeocodedLocations(response.locations);
                }
                if (bOnSuccess) {
                    reverseGeocodeOptions.onSuccess.call(context, response.locations);
                }
            },
            // callback onFailure
            onFailure : function (error) {
                // FIXME mise à jour du controle mais le service ne repond pas en 200 !?

                // on cache la patience
                context._hideWaitingContainer();

                // suppression d'éventuels résultats précédents
                context._clearResults();
                // on efface les points qui ont été saisis précédemment
                context._clearInputFeatures();

                // et on réactive l'interaction sur la map
                context._activateMapInteraction(map);
                logger.log(error.message);

                if (bOnFailure) {
                    reverseGeocodeOptions.onFailure.call(context, error);
                }
            }
        };

        // on récupère d'éventuels filtres
        if (this._requestGeom.type.toLowerCase() === "circle") {
            // FIXME : a confirmer en fonction du service !
            if (this._requestGeom.radius > 500) {
                logger.log("INFO : initial circle radius (" + this._requestGeom.radius + ") limited to 1000m.");
                this._requestGeom.radius = 500;
            }
            requestOptions.searchGeometry = this._requestGeom;
        } else if (this._requestGeom.type.toLowerCase() === "polygon") {
            // FIXME : geom bbox max length 1000m !
            requestOptions.searchGeometry = this._requestGeom;
        } else if (this._requestGeom.type.toLowerCase() === "point") {
            if (this._currentGeocodingType === "StreetAddress") {
                requestOptions.searchGeometry = {
                    type : "Circle",
                    radius : 50,
                    coordinates : this._requestGeom.coordinates
                };
                requestOptions.maximumResponses = 1;
            } else {
                requestOptions.searchGeometry = this._requestGeom;
            }
        }

        logger.log("reverseGeocode request options : ", requestOptions);

        return requestOptions;
    }

    /**
     * this method is called by this._reverseGeocodingRequest() (in case of reverse geocode success)
     * and display results : in both container list and map
     *
     * @param {Array} locations - array of geocoded locations (reverse geocode results)
     * @private
     */
    _displayGeocodedLocations (locations) {
        // 1. on vide les résultats précédents
        this._clearResults();
        this._reverseGeocodingLocations = locations;

        /**
         * event triggered when the compute is finished
         *
         * @event reversegeocode:compute
         * @property {Object} type - event
         * @property {Object} target - instance ReverseGeocode
         * @example
         * ReverseGeocode.on("reversegeocode:compute", function (e) {
         *   console.log(e.target.getData());
         * })
         */
        this.dispatchEvent({
            type : "reversegeocode:compute"
        });

        // 2. cache de la patience et du formulaire
        this._formContainer.className = "GPelementHidden gpf-hidden";
        this._hideWaitingContainer();
        // affichage de la div des résultats (et changement du titre)
        this._panelTitleContainer.innerHTML = "Résultats de la recherche";
        this._returnPictoContainer.classList.remove("GPelementHidden");
        this._returnPictoContainer.classList.remove("gpf-hidden");
        this._resultsContainer.className = "GPpanel gpf-panel gpf-panel-reverse";

        // 3. ajout de la liste des résultats dans le container des resultats
        this._fillGeocodedLocationListContainer(locations);

        // 4. affichage des résultats sur la carte (+ zoom ?)
        this._displayGeocodedLocationsOnMap(locations);
    }

    // ################################################################### //
    // ############################# results list ######################## //
    // ################################################################### //

    /**
     * this method is called by this._displayGeocodedLocations()
     * and fills the container with results list
     *
     * @param {Array} locations - array of geocoded locations (reverse geocode results)
     * @private
     */
    _fillGeocodedLocationListContainer (locations) {
        //  ajout de la liste des résultats dans le container des resultats
        for (var i = 0; i < locations.length; i++) {
            var location = locations[i];
            logger.log(location);
            // on récupère la description à afficher dans la liste
            var locationDescription = this._fillGeocodedLocationDescription(location);
            // on ajoute chaque résutat à la liste
            if (locationDescription && locationDescription.length !== 0) {
                this._createReverseGeocodingResultElement(locationDescription, i);
            }
        }
    }

    /**
     * this method is called by this._fillGeocodedLocationListContainer()
     * and fills location description (String), depending on matchType
     *
     * @param {Object} location - geocoded location (from reverse geocode results)
     * @returns {String} locationDescription - geocoded location description to be displayed
     * @private
     */
    _fillGeocodedLocationDescription (location) {
        if (!location || !location.placeAttributes) {
            return;
        }
        var attr = location.placeAttributes;

        var locationDescription = "";
        // on sélectionne les infos à afficher selon le type
        switch (location.type) {
            case "StreetAddress":
                if (attr.street) {
                    locationDescription += attr.housenumber ? attr.housenumber + " " : "";
                    locationDescription += attr.street + ", ";
                }
                locationDescription += attr.postcode + " " + attr.city;
                break;

            case "PositionOfInterest":
                locationDescription += attr.toponym;
                if (attr.postcode && attr.postcode.length === 1) {
                    locationDescription += ", " + attr.postcode[0];
                }
                locationDescription += " (" + attr.category.join(",") + ")";
                break;

            case "CadastralParcel":
                locationDescription += attr.id;
                locationDescription += attr.city ? " (" + attr.city + ")" : "";
                break;

            default:
                locationDescription += attr.city ? attr.city : "";
                break;
        };

        return locationDescription;
    }

    // ################################################################### //
    // ######################## map results (markers) #################### //
    // ################################################################### //

    /**
     * this method is called by this._displayGeocodedLocations()
     * and display locations in map (markers)
     *
     * @param {Object} locations - geocoded locations (reverse geocode result)
     * @private
     */
    _displayGeocodedLocationsOnMap (locations) {
        if (this._reverseGeocodingLocations.length !== 0) {
            var map = this.getMap();

            // 1. création de la couche où seront ajoutés les résultats
            this._createResultsLayer();
            // ajout de chaque résultat à la couche (marker)
            for (var i = 0; i < locations.length; i++) {
                this._addResultFeature(locations[i], i);
            }

            // 2. Zoom sur l'étendue des résultats (features)
            if (this._resultsFeatures.getLength() > 1) {
                // TODO : appeler fonction commune
                if (this._resultsFeaturesSource && this._resultsFeaturesSource.getExtent) {
                    var extent = this._resultsFeaturesSource.getExtent();
                    map.getView().fit(extent, map.getSize());
                }
            } else {
                // dans le cas où on n'a qu'un seul résultat, l'étendue n'est pas définie, on zoome donc sur le résulat
                var feature = this._resultsFeatures.item(0);
                var coords = feature.getGeometry().getCoordinates();
                map.getView().setCenter(coords);
                map.getView().setZoom(17);
            }

            // 3. ajout des interactions (survol, click)
            // au survol : modification des styles (marker et list)
            this._resultsHoverInteraction = new SelectInteraction({
                condition : eventPointerMove,
                layers : [this._resultsFeaturesLayer]
            });
            this._resultsHoverInteraction.on(
                "select",
                (e) => this._onResultsFeatureMouseOver(e)
            );
            map.addInteraction(this._resultsHoverInteraction);

            // au click : affichage popup
            this._resultsSelectInteraction = new SelectInteraction({
                layers : [this._resultsFeaturesLayer]
            });
            this._resultsSelectInteraction.on(
                "select",
                (e) => this._onResultsFeatureSelect(e)
            );
            map.addInteraction(this._resultsSelectInteraction);

            // 4. Si un layer switcher est présent dans la carte, on lui affecte des informations pour cette couche
            var geocodeType = "";
            switch (this._currentGeocodingType) {
                case "StreetAddress":
                    geocodeType = "adresses";
                    break;
                case "PositionOfInterest":
                    geocodeType = "toponymes";
                    break;
                case "CadastralParcel":
                    geocodeType = "parcelles cadastrales";
                    break;
                default:
                    break;
            }
            map.getControls().forEach(
                (control) => {
                    if (control instanceof LayerSwitcher) {
                        // un layer switcher est présent dans la carte
                        var layerId = this._resultsFeaturesLayer.gpLayerId;
                        // on n'ajoute des informations que s'il n'y en a pas déjà (si le titre est le numéro par défaut)
                        if (control._layers[layerId].title === layerId) {
                            control.addLayer(
                                this._resultsFeaturesLayer, {
                                    title : "Résultats de la recherche inverse",
                                    description : "Résultats de la recherche inverse sur les " + geocodeType
                                }
                            );
                            control.setRemovable(this._resultsFeaturesLayer, false);
                        }
                    }
                }
            );
        }
    }

    /**
     * this method is called by this._displayGeocodedLocations()
     * and creates result layer (where geocoded locations will be displayed)
     *
     * @private
     */
    _createResultsLayer () {
        var map = this.getMap();

        this._resultsFeatures = new Collection();

        // on crée la couche qui va accueillir les features
        this._resultsFeaturesSource = new VectorSource({
            features : this._resultsFeatures
        });
        this._resultsFeaturesLayer = new VectorLayer({
            source : this._resultsFeaturesSource
        });
        // on rajoute le champ gpResultLayerId permettant d'identifier une couche crée par le composant. (pour layerSwitcher par ex)
        this._resultsFeaturesLayer.gpResultLayerId = "reverseGeocodingResults";
        // on ajoute la couche à la carte
        map.addLayer(this._resultsFeaturesLayer);
    }

    /**
     * this method is called by this._displayGeocodedLocations()
     * and displays locations in map (markers) : add new feature to results layer
     *
     * @param {Object} location - geocoded location (reverse geocode result)
     * @param {Number} i - geocoded location index in response list
     * @private
     */
    _addResultFeature (location, i) {
        var map = this.getMap();
        // récupération de la position
        var position = [location.position.lon, location.position.lat];
        if (position.length === 0) {
            return;
        }
        var view = map.getView();
        var mapProj = view.getProjection().getCode();
        if (mapProj !== "EPSG:4326") {
            // on retransforme les coordonnées de la position dans la projection de la carte
            position = olTransformProj(position, "EPSG:4326", mapProj);
        }

        // on ajoute le résultat à la collection de points existantes (composant la couche vectorielle this._inputFeaturesLayer)
        var feature = new Feature({
            geometry : new Point(position)
        });
        feature.setStyle(this._resultsDefaultStyle);
        feature.setId(i);
        feature.setProperties({
            location : location,
            popupContent : this._fillPopupContent(location)
        });
        this._resultsFeatures.push(feature);
    }

    /**
     * this method is called by this._addResultFeature()
     * and fills popup content (to be displayed on marker click) for a given geocoded location
     *
     * @param {Object} location - geocoded location (reverse geocode result)
     * @returns {String} popupContent - text to be displayed in popup
     * @private
     */
    _fillPopupContent (location) {
        var popupContent = "<ul>";

        var attributes = location.placeAttributes;
        for (var attr in attributes) {
            if (attributes.hasOwnProperty(attr)) {
                if (attr !== "trueGeometry" && attr !== "extraFields" && attr !== "houseNumberInfos" && attr !== "_count") {
                    popupContent += "<li>";
                    popupContent += "<span class=\"gp-attname-others-span\">" + attr.toUpperCase() + " : </span>";
                    popupContent += attributes[attr];
                    popupContent += " </li>";
                }
            }
        }
        popupContent += " </ul>";

        return popupContent;
    }

    /**
     * this method is called on 'pointerMove' on this._resultsFeaturesLayer (ol.interaction.Select)
     * (cf. this._displayGeocodedLocationsOnMap() )
     * and highlights result in list container
     *
     * @param {Object} e - on select event
     * @private
     */
    _onResultsFeatureMouseOver (e) {
        var f;

        // si on survole un résultat, on change son style (marker)
        if (e.selected.length !== 0) {
            // on change le style du marker (red)
            f = e.selected[0];
            f.setStyle(this._resultsSelectedStyle);

            // on surligne le résultat correspondant dans la liste des résultats
            if (f.getId() != null) {
                var selectedResultDiv = document.getElementById("GPreverseGeocodedLocation_" + f.getId() + "-" + this._uid);
                if (selectedResultDiv && selectedResultDiv.classList) {
                    selectedResultDiv.classList.add("GPlocationHighlight");
                }
            }
            document.getElementById("GPreverseGeocodedLocation_" + f.getId() + "-" + this._uid);
        }

        // si on déselectionne un résultat (mouseout), on rétablit un style normal pour le marker
        if (e.deselected.length !== 0) {
            // on change le style du marker (lightOrange)
            f = e.deselected[0];
            f.setStyle(this._resultsDefaultStyle);

            // on rétablit un style normal pour le résultat correspondant dans la liste des résultats
            var deSelectedResultDiv = document.getElementById("GPreverseGeocodedLocation_" + f.getId() + "-" + this._uid);
            if (deSelectedResultDiv && deSelectedResultDiv.classList) {
                deSelectedResultDiv.classList.remove("GPlocationHighlight");
            }
        }
    }

    /**
     * this method is called on 'click' on this._resultsFeaturesLayer (ol.interaction.Select)
     * (cf. this._displayGeocodedLocationsOnMap() )
     * and sets a popup with feature information
     *
     * @param {Object} e - on select event
     * @private
     */
    _onResultsFeatureSelect (e) {
        var map = this.getMap();
        if (e.selected.length !== 0) {
            // si on a sélectionné un marker, on lui ajoute une popup
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

            /**
             * event triggered when an element of the results is clicked
             *
             * @event reversegeocode:onclickresult
             * @property {Object} type - event
             * @property {Object} location - location
             * @property {Object} target - instance ReverseGeocode
             * @example
             * Reverse.on("reverse:onclickresult", function (e) {
             *   console.log(e.location);
             * })
             */
            this.dispatchEvent({
                type : "reversegeocode:onclickresult",
                location : f.getProperties().location
            });
        } else {
            // si aucun troncon n'est sélectionné (click à côté du tracé),
            // on fait disparaitre la popup si elle existe
            if (this._popupOverlay != null) {
                this._popupOverlay.setPosition(undefined);
            }
        }
    }

    // ################################################################### //
    // ####################### handlers events to dom #################### //
    // ################################################################### //

    /**
     * this method is called by event 'click' on 'GPshowReverseGeocodingPicto' tag label
     * (cf. ReverseGeocodeDOM._createShowReverseGeocodingPictoElement), and it cleans the component
     * when it's closed.
     *
     * @param { event } e évènement associé au clic
     * @private
     */
    onShowReverseGeocodingClick (e) {
        if (e.target.ariaPressed === "true") {
            this.onPanelOpen();
        }
        var map = this.getMap();
        if (!map) {
            return;
        }
        // on supprime toutes les interactions
        Interactions.unset(map);
        var opened = this._showReverseGeocodingButton.ariaPressed;
        this.collapsed = !(opened === "true");
        // info : on génère nous même l'evenement OpenLayers de changement de propriété
        // (utiliser ol.control.ReverseGeocode.on("change:collapsed", function ) pour s'abonner à cet évènement)
        this.dispatchEvent("change:collapsed");

        // on recalcule la position
        if (this.options.position && !this.collapsed) {
            this.updatePosition(this.options.position);
        }

        if (!this._waiting && !this._reverseGeocodingLocations.length) {
            // Cas 1 : input panel (ni en attente, ni sur le panel des résultats)
            if (this.collapsed) {
                // on remet à zéro = on efface les géométries + interactions + valeurs stockées
                // suppression des résultats précédents
                this._clearResults();
                // on efface les points qui ont pu être saisis précédemment
                this._clearInputFeatures();
                // on supprime l'éventuelle précédente interaction
                this._removeMapInteraction(map);
                // on retire aussi la couche de saisie de la zone de recherche à la fermeture du widget
                if (this._inputFeaturesLayer != null) {
                    map.removeLayer(this._inputFeaturesLayer);
                    this._inputFeaturesLayer = null;
                    this._inputFeaturesSources = null;
                    this._inputFeatures = null;
                }
            } else {
                // on réactive l'interaction
                this._activateMapInteraction(map);
            }
        }
        // info : si on est en attente ou sur le panel des résultats : on ne fait rien.
    }

    /**
     * this method is called by event 'change' on 'GPreverseGeocodingCode' tag select
     * (cf. ReverseGeocodeDOM._createReverseGeocodingFormModeChoiceGeocodingTypeElement).
     * this value is saved as a parameter for reverseGeocode service.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    onReverseGeocodingTypeChange (e) {
        var idx = e.target.selectedIndex;
        var value = e.target.options[idx].value;

        if (!value) {
            return;
        }
        logger.log(value);
        this._currentGeocodingType = value;
    }

    /**
     * this method is called by event 'change' on 'GPreverseGeocodingCode' tag select
     * (cf. ReverseGeocodeDOM._createReverseGeocodingFormModeChoiceGeocodingDelimitationElement).
     * this value is saved as a parameter for reverseGeocode service.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    onReverseGeocodingDelimitationChange (e) {
        var idx = e.target.selectedIndex;
        var value = e.target.options[idx].value;

        if (!value) {
            return;
        }

        logger.log(value);
        this._currentGeocodingDelimitation = value;

        // on met à jour l'interaction de la map en fonction de la nouvelle délimitation
        var map = this.getMap();
        // on supprime l'interaction précédente, ainsi que les géométries et valeurs stockées (filtres, position)
        this._clearInputFeatures();
        // on supprime l'éventuelle précédente interaction
        this._removeMapInteraction(map);
        // on crée une nouvelle interaction
        this._activateMapInteraction(map);
    }

    /**
     * this method is called by event 'click' on 'GPreverseGeocodingReturnPicto' div
     * (cf. ReverseGeocodeDOM._createReverseGeocodingPanelReturnPictoElement),
     * and clear geocoded location (from both list container and map)
     *
     * @private
     */
    onGPreverseGeocodingReturnPictoClick () {
        // suppression des résultats précédents
        this._clearResults();
        // on efface les points qui ont pu être saisis précédemment
        this._clearInputFeatures();
        // et on réactive l'interaction sur la map
        this._activateMapInteraction(this.getMap());
    }

    /**
     * this methode is called by event 'submit' on reverseGeocoding form ('GPreverseGeocodingForm')
     * (cf. ReverseGeocodeDOM._createReverseGeocodingPanelFormElement),
     * it checks reverse geocode mandatory parameters,
     * then call this._reverseGeocodingRequest() to generate and send request
     *
     * @private
     */
    onReverseGeocodingSubmit () {
        // le paramètre position est obligatoire
        if (!this._requestPosition) {
            logger.log("missing position");
            return;
        }

        this._reverseGeocodingRequest();
    }

    /**
     * this method is called by event 'click' on 'GPreverseGeocodedLocation_' div
     * (cf. ReverseGeocodeDOM._createReverseGeocodingResultElement),
     * and zoom to location ?
     * TODO
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    onReverseGeocodingResultClick (e) {
        // récupération de l'id du résultat survolé
        var tagid = e.target.id; // ex GPreverseGeocodedLocation_21
        var idx = tagid.substring(tagid.indexOf("_") + 1); // ex. 21

        var f = this._resultsFeaturesSource.getFeatureById(parseInt(idx, 10));

        this.dispatchEvent({
            type : "reversegeocode:onclickresult",
            location : f.getProperties().location
        });
    }

    /**
     * this method is called by event 'mouseover' on 'GPreverseGeocodedLocation_' div
     * (cf. ReverseGeocodeDOM._createReverseGeocodingResultElement),
     * and changes style of matching marker on map (selected)
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    onReverseGeocodingResultMouseOver (e) {
        // récupération de l'id du résultat survolé
        var tagid = e.target.id; // ex GPreverseGeocodedLocation_21
        var idx = tagid.substring(tagid.indexOf("_") + 1); // ex. 21

        // on passe le texte en gras
        if (e.target.classList) {
            e.target.classList.add("GPlocationHighlight");
        }

        if (!this._resultsFeaturesSource) {
            return;
        }

        // on récupère l'entité correspondante au résultat survolé
        var f = this._resultsFeaturesSource.getFeatureById(parseInt(idx, 10));
        // et on lui affecte un nouveau style
        f.setStyle(this._resultsSelectedStyle);
    }

    /**
     * this method is called by event 'mouseout' on 'GPreverseGeocodedLocation_' div
     * (cf. ReverseGeocodeDOM._createReverseGeocodingResultElement),
     * and changes style of matching marker on map (default)
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    onReverseGeocodingResultMouseOut (e) {
        // récupération de l'id du résultat survolé
        var tagid = e.target.id; // ex GProuteResultsDetailsInstruction_125
        var idx = tagid.substring(tagid.indexOf("_") + 1); // ex. 125

        // on repasse le texte en style normal
        if (e.target.classList) {
            e.target.classList.remove("GPlocationHighlight");
        }

        if (!this._resultsFeaturesSource) {
            return;
        }
        // on récupère l'entité correspondante au résultat qui était survolé
        var f = this._resultsFeaturesSource.getFeatureById(parseInt(idx, 10));
        // et on lui réaffecte un style normal
        f.setStyle(this._resultsDefaultStyle);
    }

    // ################################################################### //
    // ################################ clean ############################ //
    // ################################################################### //

    /**
     * this method clears previous location results
     *
     * @private
     */
    _clearResults () {
        var map = this.getMap();

        this._reverseGeocodingLocations = [];
        // on vide le container avec la liste des résultats
        if (this._resultsListContainer) {
            while (this._resultsListContainer.firstChild) {
                this._resultsListContainer.removeChild(this._resultsListContainer.firstChild);
            }
        }
        // on retire la couche des résultats
        if (this._resultsFeaturesLayer) {
            map.removeLayer(this._resultsFeaturesLayer);
            this._resultsFeaturesLayer = null;
        }
        // on retire l'overlay de la popup de la carte
        if (this._popupOverlay != null) {
            map.removeOverlay(this._popupOverlay);
            this._popupOverlay = null;
        }
        // on retire les interactions sur les markers (select et mouseover)
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
     * this method clears previous input features (features, layer, position and filters)
     *
     * @private
     */
    _clearInputFeatures () {
        // on efface les points qui ont pu être saisis précédemment (on vide la collection des features de la couche)
        if (this._inputFeatures) {
            this._inputFeatures.clear();
        }

        // on supprime les valeurs stockées
        this._requestGeom = null;
        this._requestPosition = null;
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

    /**
     * this method hides waiting container and clears timeout
     *
     * @private
     */
    _hideWaitingContainer () {
        if (this._waiting) {
            this._waitingContainer.className = "GPwaitingContainer GPwaitingContainerHidden gpf-waiting gpf-waiting--hidden";
            this._waiting = false;
            clearTimeout(this._timer);
            this._timer = null;
        }
    }

};

// on récupère les méthodes de la classe commune ReverseGeocodeDOM
Object.assign(ReverseGeocode.prototype, ReverseGeocodeDOM);
Object.assign(ReverseGeocode.prototype, Widget);

export default ReverseGeocode;

// Expose ReverseGeocode as ol.control.ReverseGeocode (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.ReverseGeocode = ReverseGeocode;
}
