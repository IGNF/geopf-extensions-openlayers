/** globals AmCharts, d3 */
// import CSS
import "../../CSS/Controls/ElevationPath/GPFelevationPath.css";
// import "../../CSS/Controls/ElevationPath/GPFelevationPathStyle.css";
// import OpenLayers
// import Control from "ol/control/Control";
import Widget from "../Widget";
import Control from "../Control";
import {
    Fill,
    Icon,
    Stroke,
    Style,
    Image,
    Circle
} from "ol/style";
import { Point } from "ol/geom";
import { Draw as DrawInteraction } from "ol/interaction";
import { transform as olTransformProj } from "ol/proj";
import { getDistance as olGetDistanceSphere } from "ol/sphere";
import Feature from "ol/Feature";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
// import geoportal library access
import Gp from "geoportal-access-lib";
// import local
import Utils from "../../Utils/Helper";
import Logger from "../../Utils/LoggerByDefault";
import ID from "../../Utils/SelectorID";
import Markers from "../Utils/Markers";
// import local with ol dependencies
import Interactions from "../Utils/Interactions";
import MeasureToolBox from "../ToolBoxMeasure/MeasureToolBox";
import Measures from "../Measures/Measures";
import LayerSwitcher from "../LayerSwitcher/LayerSwitcher";
import ButtonExport from "../Export/Export";
import GeoJSONExtended from "../../Formats/GeoJSON";
// DOM
import ElevationPathDOM from "./ElevationPathDOM";
import ProfileElevationPathDOM from "./ProfileElevationPathDOM";

var logger = Logger.getLogger("elevationpath");

/**
 * @classdesc
 *
 * Elevation Path Control. Allows users to draw a path on a Openlayers map see the elevation profile computed with geoportal elevation path web service along that path.
 *
 * @constructor
 * @alias ol.control.ElevationPath
 * @type {ol.control.ElevationPath}
 * @extends ol.control.Control
 * @param {Object} options - options for function call.
 * @param {Number} [options.id] - Ability to add an identifier on the widget (advanced option)
 * @param {String} [options.apiKey] - API key for services call (isocurve and autocomplete services). The key "calcul" is used by default.
 * @param {Boolean} [options.active = false] - specify if control should be actived at startup. Default is false.
 * @param {Boolean} [options.ssl = true] - use of ssl or not (default true, service requested using https protocol)
 * @param {Boolean|Object} [options.export = false] - Specify if button "Export" is displayed. For the use of the options of the "Export" control, see {@link packages/Controls/Export/Export.default}
 * @param {Object} [options.elevationOptions = {}] - elevation path service options. See {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~getAltitude Gp.Services.getAltitude()} for available options
 * @param {Object} [options.layerDescription = {}] - Layer informations to be displayed in LayerSwitcher widget (only if a LayerSwitcher is also added to the map)
 * @param {String} [options.layerDescription.title = "Profil altimétrique"] - Layer title to be displayed in LayerSwitcher
 * @param {String} [options.layerDescription.description = "Mon profil altimétrique"] - Layer description to be displayed in LayerSwitcher
 * @param {Object} [options.stylesOptions] - styles management
 * @param {Object} [options.stylesOptions.marker = {}] - styles management of marker displayed on map when the user follows the elevation path. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Image-ImageStyle.html ol.style.Image} subclass object
 * @param {Object} [options.stylesOptions.draw = {}] - styles used when drawing. Specified with following properties.
 * @param {Object} [options.stylesOptions.draw.pointer = {}] - Style for mouse pointer when drawing the line. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Image-ImageStyle.html ol.style.Image} subclass object.
 * @param {Object} [options.stylesOptions.draw.start = {}] - Line Style when drawing. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Stroke-Stroke.html ol.style.Stroke} object.
 * @param {Object} [options.stylesOptions.draw.finish = {}] - Line Style when finished drawing. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Stroke-Stroke.html ol.style.Stroke} object.
 * @param {Object} [options.displayProfileOptions = {}] - profile options.
 * @param {Boolean} [options.displayProfileOptions.totalDistance = true] - display the total distance of the path
 * @param {Boolean} [options.displayProfileOptions.greaterSlope = true] - display the greater slope into the graph
 * @param {Boolean} [options.displayProfileOptions.meanSlope = true] -  display the mean slope into the graph
 * @param {Boolean} [options.displayProfileOptions.ascendingElevation = true] -  display the ascending elevation into the graph
 * @param {Boolean} [options.displayProfileOptions.descendingElevation = true] -  display the descending elevation into the graph
 * @param {Boolean} [options.displayProfileOptions.currentSlope = true] -  display current slope value on profile mouseover
 * @param {Function} [options.displayProfileOptions.apply] - function to display profile if you want to cutomise it. By default, ([DISPLAY_PROFILE_BY_DEFAULT()](./ol.control.ElevationPath.html#.DISPLAY_PROFILE_BY_DEFAULT)) is used. Helper functions to use with D3 ([DISPLAY_PROFILE_LIB_D3()](./ol.control.ElevationPath.html#.DISPLAY_PROFILE_LIB_D3)) or AmCharts ([DISPLAY_PROFILE_LIB_AMCHARTS()](./ol.control.ElevationPath.html#.DISPLAY_PROFILE_LIB_AMCHARTS)) frameworks are also provided. You may also provide your own function.
 * @param {Object} [options.displayProfileOptions.target] - DOM container to use to display the profile.
 * @fires elevationpath:drawstart
 * @fires elevationpath:drawend
 * @fires elevationpath:compute
 * @fires export:compute
 * @example
 *
 * var measure = new ol.control.ElevationPath({
 *    export : false,
 *    stylesOptions : {
 *     draw : {
 *       finish : new ol.style.Stroke({
 *            color : "rgba(0, 0, 0, 0.5)",
 *            width : 2
 *       })
 *     },
 *    }
 *    displayProfileOptions : {
 *       apply : ol.control.ElevationPath.DISPLAY_PROFILE_RAW,
 *    }
 * });
 *
 * // if you want to pluggued the control Export with options :
 * var measure = new ol.control.ElevationPath({
 *    export : {
 *      name : "export",
 *      format : "geojson",
 *      title : "Exporter",
 *      menu : false
 *    }
 * });
 *
 * Exemples :
 * - displayProfileOptions.apply : null
 * - displayProfileOptions.apply : function (elevations, container, context) {  // do some stuff... }
 * - displayProfileOptions.apply : ol.control.ElevationPath.DISPLAY_PROFILE_{LIB_AMCHARTS | LIB_D3 | RAW}
 *
 */
class ElevationPath extends Control {

    /**
     * See {@link ol.control.ElevationPath}
     * @module ElevationPath
     * @alias module:~controls/ElevationPath
     * @param {*} options - options
     * @example
     * import ElevationPath from "gpf-ext-ol/controls/ElevationPath"
     * ou
     * import { ElevationPath } from "gpf-ext-ol"
     */
    constructor (options) {
        logger.trace("ElevationPath()");

        /**
         * options
         * @private
         */
        options = options || {};

        // call ol.control.Control constructor
        super(options);

        if (!(this instanceof ElevationPath)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        /**
         * Nom de la classe (heritage)
         * @private
         */
        this.CLASSNAME = "ElevationPath";

        // uuid
        this._uid = options.id || ID.generate();

        // container : HTMLElement
        this._showContainer = null;
        this._pictoButton = null;
        this._panelContainer = null;
        this._profileContainer = null;
        this._waitingContainer = null;
        this._infoContainer = null;

        // timer sur la fenetre d'informations des données
        this._timerHdlr = null;

        // objet de type "ol.style"
        this._drawStyleStart = null;
        this._drawStyleFinish = null;
        this._markerStyle = null;

        // graph
        this._profile = null;

        // data elevations
        this._data = {};

        /* objet de type
            "ol.source.Vector",
            "ol.layer.Vector",
            "ol.interaction.Draw"
        */
        this._measureSource = null;
        this._measureVector = null;
        this._measureDraw = null;

        // objet de type ol.feature, saisie en cours
        this._lastSketch = null;
        this._currentSketch = null;

        // objet de type ol.feature, marker
        this._marker = null;

        // initialisation du composant
        this._initialize(options);

        // creation du DOM container
        this._container = this._initializeContainer();

        // ajout du container
        (this.element) ? this.element.appendChild(this._container) : this.element = this._container;

        return this;
    }

    /**
    * Styles applied by default if stylesOptions property is not set.
    */
    static DEFAULT_STYLES = {
        // styling drawing by default
        // see => Measures.DEFAULTS_STYLES
        // stying marker to the profile by default
        MARKER : new Icon({
            src : Markers["lightOrange"],
            // image avec un mauvais ratio size 51/38 pixels
            // src : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAsCAYAAAAATWqyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABTtJREFUeNq8WGtsFUUU/rb3gtdCAykFG9AUDTQUKimhxUewEusrJYoBo4FfEgoqotHERH6oP9TGmJhIrIlWAf9hjAaEiME2pgFfVVpFii8sWqIQLLSx3EJLW7p+Z2Z2b2l7d/b23vZLTmZ2duacb2fmnDk7DlKA67rXs1hJKacsohRQppjXFygnKT9TDlH2O47zFzIFGnco91EOuqnjoBnr2Ow4FhIlLN6m3DykFTh3BGj/Doj/CfSe082xPCDnBmDWTUBeyXDVjZTHOUNHUiZCEs+weI0ySTV0/w0c2wa07gIungn+vOx8YN46oPhpYOp1Xms/5TmSeSMUERKImFnYqBoGuPRNL5LEW8BgX2rrmjWZZLYApS8BUW8r4T0zO5eTEjFr+S6lSjV0HgPqVwNdf6S30abNB+7aDeQWey3bKZtIxvU5DxvyrE/izJfAvuXpkxCIDtElOjWqjK2RM8LZWMbiG0oEnUc5kB7a14WMYvI04H56du5ieZKluZWz8r0/IyQh5TuKRH8cqFuTeRIC0Sm6xYbYok1j21+ahyhLVO3wC8D5VowbRLfY0FhibOulIavDLEoRZyD8sJDeMWBXKG5ZsIobsdDsg+OMq3u1m1u9KQo8zP45EqjRxOUpk6i50IRl4FuGjpZtwUoiMYa314GFj/EzIsN8n8v+C1e4kfvwcm+wnhsZY27xQ8oiWZpKrWRQB6tAElfxpKnjsCdGklDzG9HvpI/0DYLYEpsalVnmAAM6fgR62oMHl70C5N9mn3rpI32DILbEpkZ5ljlFgbPNFtebzij5VPhNKX1lTBASNtXSzPZ3cxCuvVOH7FTCu4yxeZDGbCES0z5+PniQ3uGpwTYmYTOWCPGTpgYP6u9OnYhtzBCbQkSH0NiM4EEdP6VOxDYmYbNLiJxQ1elFwYPaG3XQCn3QHddjgpCweUKI6K2bvzw4YROf//rJob6fZl/H2FRoFiINfqo3qyzYwD8MVIeYLw32J+8j76SP9A2C2BKbGg1CZL+EF/W4YKP9a3/fCeyhkrY9DOOXEu1SlzZ5J31sSNjqURm/OfQkY9qgvkYOvXhbuH0g505Oga7HT9rPF9+t5+pDL0ulwzt46FV5ROax+JUSRRtP0LoHMK64+xNg7iqVEVOKSKRVxRGpsKhRnaRD4SPjR0J0axKCGmP7ilQxm4X8d8xXmfvHJZlPkCR3WfODl9FLMlxCIhevSJ5Nwzo1XdKxYpe3hpmB6BKdmoS43VqPxIgsni+aWOg8biZ3f+nLmSMiuvKWek/P01az7QdLyNVT7lC/l59WAKcb0iMxhzpW1nvmvpDtSiKD1l9OkpnDgv8UyMWFU9wvTP8vdY6NhJwnD1JVtso2OiiLSeL0iJUbNfg6zikVVwRTyOn2HWOfjfLtHgnBhtFIJCViyNDZUatdmnGlaFPqJIoe1WM1aqlz71ivJbLNobgAA9zgu7nZ/vstHAk5WVdzaPRqmGC5lER6kjpV4OWJdq+1kkshSk4VH9izcy/bV66qSPQZV+0J9G7rTY6+XNmqHmYwyJVV24kse1X31dhKHdasygkzy+a64oC4nWr47F4e858nSbLv4V/KAe9JKpVDrx/SImLIXMOiRUKdujESl+49O8xVZxpXzVc/C/I/RxL/hgq8YYkYhev9q6kVO4d9B+sr3vdICNaHJTHWW8Ya/87wqy2uWwstUk/gTYw3aCRGOarMDfS67kfFWqSuIe9imAjQEC272nJHixYNaSvGRIIGN49ywbsZEw1zI11N6TZSHeaGORn+F2AAJtRIMx4t+hUAAAAASUVORK5CYII=",
            anchor : [0.5, 1],
            snapToPixel : true
        }),
        // styling service results points by default
        RESULTS : {
            // INFO orienté maintenance !
            imageRadius : 5,
            imageFillColor : "rgba(128, 128, 128, 0.2)",
            imageStrokeColor : "rgba(0, 0, 0, 0.7)",
            imageStrokeWidth : 2
        }
        // FIXME ???
        // PROFILE : {
        //     type : "serial",
        //     pathToImages : "http://cdn.amcharts.com/lib/3/images/",
        //     categoryField : "dist",
        //     autoMarginOffset : 0,
        //     marginRight : 10,
        //     marginTop : 10,
        //     startDuration : 0,
        //     color : "#5E5E5E",
        //     fontSize : 10,
        //     theme : "light",
        //     thousandsSeparator : "",
        //     categoryAxis : {
        //         color : "#5E5E5E",
        //         gridPosition : "start",
        //         minHorizontalGap : 40,
        //         tickPosition : "start",
        //         title : "Distance (km)",
        //         titleColor : "#5E5E5E",
        //         startOnAxis : true
        //     },
        //     chartCursor : {
        //         animationDuration : 0,
        //         bulletsEnabled : true,
        //         bulletSize : 10,
        //         categoryBalloonEnabled : false,
        //         cursorColor : "#F90",
        //         graphBulletAlpha : 1,
        //         graphBulletSize : 1,
        //         zoomable : false
        //     },
        //     trendLines : [],
        //     graphs : [
        //         {
        //             balloonColor : "#CCCCCC",
        //             balloonText : "<span class='altiPathValue'>[[title]] : [[value]]m</span><br/><span class='altiPathCoords'>(lat: [[lat]] / lon:[[lon]])</span>",
        //             bullet : "round",
        //             bulletAlpha : 0,
        //             bulletBorderColor : "#FFF",
        //             bulletBorderThickness : 2,currentSlope
        //             bulletColor : "#F90",
        //             bulletSize : 6,
        //             hidden : false,
        //             id : "AmGraph-1",
        //             fillAlphas : 0.4,
        //             fillColors : "#C77A04",
        //             lineAlpha : 1,
        //             lineColor : "#C77A04",
        //             lineThickness : 1,
        //             title : "Altitude",
        //             valueField : "z"
        //         }
        //     ],
        //     guides : [],
        //     valueAxes : [
        //         {
        //             id : "ValueAxis-1",
        //             minVerticalGap : 20,
        //             title : "Altitude (m)"
        //         }
        //     ],
        //     allLabels : [],
        //     balloon : {
        //         borderColor : "#CCCCCC",
        //         borderThickness : 1,
        //         fillColor : "#FFFFFF",
        //         showBullet : true
        //     },
        //     titles : []
        // }
    };

    /**
     * suppression du marker
     *
     * @param {Object} context - context
     *
     * @private
     */
    static __removeProfileMarker (context) {
        var self = context;
        // suppression de l'ancien marker
        if (self._marker) {
            self._measureSource.removeFeature(self._marker);
            self._marker = null;
        }
    };

    /**
     * suppression du marker
     *
     * @param {Object} context - context
     * @param {Object} d - d
     *
     * @private
     */
    static __createProfileMarker (context, d) {
        var self = context;
        // suppression de l'ancien marker
        if (self._marker) {
            self._measureSource.removeFeature(self._marker);
            self._marker = null;
        }
        var map = self.getMap();
        var proj = map.getView().getProjection();

        var _coordinate = olTransformProj([d.lon, d.lat], "EPSG:4326", proj);
        var _coordinateProj = self._measureSource
            .getFeatures()[0]
            .getGeometry()
            .getClosestPoint(_coordinate);

        var _geometry = new Point(_coordinateProj);

        self._marker = new Feature({
            geometry : _geometry
        });
        logger.trace(_geometry);

        // style
        self._marker.setStyle(self._markerStyle);

        // ajout du marker sur la map
        self._measureSource.addFeature(self._marker);
    }

    /**
     * mise à jour du marker
     *
     * @param {Object} context - context
     * @param {Object} d - data
     *
     * @private
     */
    static __updateProfileMarker (context, d) {
        var self = context;
        ElevationPath.__removeProfileMarker(self);
        ElevationPath.__createProfileMarker(self, d);
    }

    /**
     * TODO : customisation possible d'une opération sur le profil
     *
     * @param {Object} context - context
     * @param {Object} d - data
     *
     * @private
     */
    static __customRawProfileOperation (context, d) {
        logger.log("__customRawProfileOperation");

        var self = context;

        var _pts = d.points;
        var _proj = self.getMap().getView().getProjection();
        for (var i = 0; i < _pts.length; i++) {
            var obj = _pts[i];
            var _coordinate = olTransformProj([obj.lon, obj.lat], "EPSG:4326", _proj);
            var _geometry = new Point(_coordinate);

            self._marker = new Feature({
                geometry : _geometry
            });
            logger.trace(_geometry);

            // TODO style en options ?
            var styles = ElevationPath.DEFAULT_STYLES.RESULTS;
            var _image = new Circle({
                radius : styles.imageRadius,
                stroke : new Stroke({
                    color : styles.imageStrokeColor,
                    width : styles.imageStrokeWidth
                }),
                fill : new Fill({
                    color : styles.imageFillColor
                })
            });
            self._marker.setStyle(new Style({
                image : _image
            }));

            // ajout du marker sur la map
            self._measureSource.addFeature(self._marker);
        }
    }

    /**
     * TODO : customisation possible d'une opération sur le profil
     * Ex. Methode appélée dans le DOM : ProfileElevationPathDOM
     *
     * @param {Object} context - context
     * @param {Object} e - event
     * @private
     */
    static __customRawProfileMouseOverEvent (context, e) {
        logger.log("__customRawProfileMouseOverEvent", context, e);
    }

    /**
     * display Profile using Amcharts framework. This method needs AmCharts libraries to be loaded.
     *
     * @param {Object} data - collection elevations
     * @param {HTMLElement} container - container
     * @param {Object} context - this control object
     */
    static DISPLAY_PROFILE_LIB_AMCHARTS (data, container, context) {
        logger.trace("ElevationPath.DISPLAY_PROFILE_LIB_AMCHARTS");

        // Calcul du profile
        if (typeof AmCharts === "undefined") {
            logger.log("Lib. AmCharts is not loaded !");
            return;
        }

        var profile = ProfileElevationPathDOM.displayProfileLibAmCharts(data, container, context, ElevationPath);
        // on sauvegarde le profil du container dans l'objet
        if (profile) {
            this._profile = profile;
        }
    }

    /**
     * display Profile using D3 javascript framework. This method needs D3 libraries to be loaded.
     *
     * @param {Object} data - elevations values for profile
     * @param {HTMLElement} container - html container where to display profile
     * @param {Object} context - this control object
     */
    static DISPLAY_PROFILE_LIB_D3 (data, container, context) {
        logger.trace("ElevationPath.DISPLAY_PROFILE_LIB_D3");

        // Calcul du profile
        if (typeof d3 === "undefined") {
            logger.log("Lib. D3 is not loaded !");
            return;
        }

        var profile = ProfileElevationPathDOM.displayProfileLibD3(data, container, context, ElevationPath);
        // on sauvegarde le profil du container dans l'objet
        if (profile) {
            this._profile = profile;
        }
    }

    /**
     * display Profile without graphical rendering (raw service response)
     *
     * @param {Object} data - elevations values for profile
     * @param {HTMLElement} container - html container where to display profile
     * @param {Object} context - this control object
     */
    static DISPLAY_PROFILE_RAW (data, container, context) {
        logger.trace("ElevationPath.DISPLAY_PROFILE_RAW");

        var profile = ProfileElevationPathDOM.displayProfileRaw(data, container, context, ElevationPath);
        // on sauvegarde le profil du container dans l'objet
        if (profile) {
            this._profile = profile;
        }
    };

    /**
     * Display Profile function used by default : no additonal framework needed.
     *
     * @param {Object} data - elevations values for profile
     * @param {HTMLElement} container - html container where to display profile
     * @param {Object} context - this control object
     */
    static DISPLAY_PROFILE_BY_DEFAULT (data, container, context) {
        logger.trace("ElevationPath.DISPLAY_PROFILE_BY_DEFAULT");

        var profile = ProfileElevationPathDOM.displayProfileByDefault(data, container, context, ElevationPath);
        // on sauvegarde le profil du container dans l'objet
        if (profile) {
            this._profile = profile;
        }
    };

    // ################################################################### //
    // ##################### public methods ############################## //
    // ################################################################### //

    /**
     * Attach control to map. Overloaded ol.control.Control.setMap() method.
     *
     * @param {ol.Map} map - Map.
     */
    setMap (map) {
        logger.trace("ElevationPath::setMap");

        if (map) {
            // activation des interactions de dessin selon la valeur de
            // l'option active
            if (this.options.active) {
                // on n'affiche pas la fenetre de profile s'il n'existe pas...
                if (this._profile === null) {
                    this._panelContainer.style.display = "none";
                    // this._panelContainer.style.visibility = "hidden";
                }
                this._initMeasureInteraction(map);
                this._addMeasureInteraction(map);
            }

            // ajout du composant dans une toolbox
            if (!this.options.target && !this.options.position) {
                MeasureToolBox.add(map, this);
            }

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

    /**
     * Returns true if widget is actived (drawing),
     * false otherwise
     *
     * @returns {Boolean} active - true or false
     */
    getActive () {
        logger.trace("ElevationPath::getActive");
        return this.options.active;
    }

    /**
     * Actived widget drawing or not
     *
     * @param {Boolean} active - true / false
     */
    setActive (active) {
        logger.trace("ElevationPath::setActive");
        this.options.active = active;
    }

    /**
     * Get elevation data
     *
     * @returns {Object} data - elevations
     * @example
     * {
     *        type // "elevationpath"
     *        greaterSlope // pente max
     *        meanSlope  // pente moyenne
     *        distancePlus // distance cumulée positive
     *        distanceMinus // distance cumulée négative
     *        ascendingElevation // dénivelé cumulée positive
     *        descendingElevation // dénivelé cumulée négative
     *        altMin // altitude min
     *        altMax // altitude max
     *        distance // distance totale
     *        unit // unité des mesures de distance
     *        points // elevations
     *   }
     */
    getData () {
        return Utils.assign({
            type : "elevationpath"
        }, this._data);
    }

    /**
     * Set profile data
     *
     * @param {*} data - elevations
     * @example
     * {
     *        greaterSlope // pente max
     *        meanSlope  // pente moyenne
     *        distancePlus // distance cumulée positive
     *        distanceMinus // distance cumulée négative
     *        ascendingElevation // dénivelé cumulée positive
     *        descendingElevation // dénivelé cumulée négative
     *        altMin // altitude min
     *        altMax // altitude max
     *        distance // distance totale
     *        unit // unité des mesures de distance
     *        points // elevations
     * }
     */
    setData (data) {
        this._data = data;
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
     * Get layer
     *
     * @returns {ol.layer.Vector} layer
     */
    getLayer () {
        return this._measureVector;
    }

    /**
     * Set layer
     *
     * @param {Object} layer - ol.layer.Vector profil layer
     */
    setLayer (layer) {
        if (!layer) {
            this._measureVector = null;
            return;
        }

        if (!(layer instanceof VectorLayer)) {
            logger.log("no valid layer given for hosting drawn features.");
            return;
        }

        // application des styles
        layer.setStyle(this._drawStyleFinish);
        // sauvegarde
        this._measureVector = layer;
        this._measureSource = layer.getSource();
    }

    /**
     * Get vector layer
     *
     * @returns {String} geojson - GeoJSON format layer
     */
    getGeoJSON () {
        var features = this._measureVector.getSource().getFeatures();

        var Format = new GeoJSONExtended({
            defaultStyle : this._drawStyleFinish
        });
        // INFO
        // par defaut, webmercator ou "EPSG:3857"
        var geojson = Format.writeFeatures(features, {
            dataProjection : "EPSG:4326",
            featureProjection : "EPSG:3857"
        });

        return geojson;
    }

    /**
     * Get default style
     *
     * @returns {ol.style} style
     */
    getStyle () {
        return this._drawStyleFinish;
    }

    /**
     * clean
     * @param {Boolean} remove - remove layer
     */
    clean (remove) {
        logger.trace("ElevationPath::clean");

        var map = this.getMap();

        // fenetre du profil
        this._panelContainer.style.display = "none";
        // this._panelContainer.style.visibility = "hidden";

        // picto
        this._pictoButton.setAttribute("aria-pressed", false);

        // this._removeMeasure();
        this._removeProfile();
        this._removeMeasureInteraction(map, typeof remove !== "undefined" ? remove : false);

        this.setLayer();
    }

    /**
     * This method is public.
     * It allows to init the control.
     * @fixme
     */
    init () {
        // FIXME
        // le panneau du profil ne peut pas afficher un profil si il est caché
        // car le profil est calculé en fonction de la taille du panneau (clientHeight / clientWidth),
        // et ces valeurs sont à 0 !?
        this._pictoButton.setAttribute("aria-pressed", true);
        this._panelContainer.style.display = "block";
        this._displayProfile(this._data);
        this._waitingContainer.className = "GPwaitingContainer GPwaitingContainerHidden gpf-waiting gpf-waiting--hidden";
    }

    // ################################################################### //
    // ##################### init component ############################## //
    // ################################################################### //

    /**
     * Initialize control (called by constructor)
     *
     * @param {Object} options - options
     *
     * @private
     */
    _initialize (options) {
        logger.trace("ElevationPath::_initialize : ", options);

        // liste des options
        this.options = {
            target : null,
            render : null,
            active : false,
            apiKey : null,
            export : false,
            elevationOptions : {
                outputFormat : "json"
            },
            layerDescription : {
                title : "Profil altimétrique",
                description : "Mon profil altimétrique"
            },
            displayProfileOptions : {
                totalDistance : true,
                greaterSlope : true,
                meanSlope : true,
                ascendingElevation : true,
                descendingElevation : true,
                currentSlope : true,
                apply : null,
                target : null
            },
            stylesOptions : {
                profile : null,
                draw : null,
                marker : null
            }
        };

        // merge with user options
        Utils.mergeParams(this.options, options);

        this.options.target = options.target || null;
        // this.options.render = options.render || null;

        // cle API sur le service
        this.options.apiKey = options.apiKey;

        // gestion de l'affichage du profil
        var _profile = options.displayProfileOptions || {};

        // bouton export
        this.export = null;

        // gestion de la fonction du profil
        var displayFunction = _profile.apply;
        this.options.displayProfileOptions.apply = (typeof displayFunction === "function")
            ? displayFunction : ElevationPath.DISPLAY_PROFILE_BY_DEFAULT;

        // gestion du container du profil
        var displayContainer = _profile.target;
        this.options.displayProfileOptions.target = (typeof displayContainer !== "undefined")
            ? displayContainer : null;

        // gestion des styles
        var _styles = options.stylesOptions || {};

        // FIXME ???
        // gestion du style du profil
        // var profileStyle = _styles.profile;
        // this.options.stylesOptions.profile = ( typeof profileStyle === "undefined" || Object.keys(profileStyle).length === 0 ) ?
        //     ElevationPath.DEFAULT_STYLES.PROFILE : profileStyle;
        // this._createStylingProfile();

        // gestion des styles du tracé
        this.options.stylesOptions.draw = _styles.draw || {};
        this._createStylingDraw();

        // gestion des styles du marker
        this.options.stylesOptions.marker = _styles.marker || {};
        this._createStylingMarker();
    }

    /**
     * initialize component container (DOM)
     *
     * @returns {DOMElement} DOM element
     *
     * @private
     */
    _initializeContainer () {
        logger.trace("ElevationPath::_initializeContainer : ", this._uid);

        // create main container
        var container = this._createMainContainerElement();

        var picto = this._pictoButton = this._createShowElevationPathPictoElement();
        container.appendChild(picto);

        // mode "active"
        if (this.options.active) {
            this._pictoButton.click();
        }

        // panneau
        var panel = this._panelContainer = this._createElevationPathPanelElement();
        var panelDiv = this._createElevationPathPanelDivElement();
        panel.appendChild(panelDiv);

        // header
        var header = this._createElevationPathPanelHeaderElement();
        panelDiv.appendChild(header);

        // profile
        var profile = this._createElevationPathPanelProfilElement();
        this._profileContainer = profile.firstChild;
        panelDiv.appendChild(profile);

        // waiting
        var waiting = this._waitingContainer = this._createElevationPathWaitingElement();
        panelDiv.appendChild(waiting);

        // info
        var info = this._infoContainer = this._createElevationPathInformationsElement();
        panelDiv.appendChild(info);

        var plugin = this._createDrawingButtonsPluginDiv();
        panelDiv.appendChild(plugin);

        if (this.options.displayProfileOptions.target === null) {
            container.appendChild(panel);
        }

        return container;
    }

    // ################################################################### //
    // ###################### init styles ################################ //
    // ################################################################### //

    /**
     * create style marker object : "ol.style"
     *
     * @private
     */
    _createStylingMarker () {
        logger.trace("ElevationPath::_createStylingMarker ");

        var marker = ElevationPath.DEFAULT_STYLES.MARKER;
        logger.trace("style marker", marker);

        // si marker n'est pas un objet ol.style.Image, on applique le
        // style par défaut.
        if (this.options.stylesOptions.marker instanceof Image) {
            marker = this.options.stylesOptions.marker;
        }

        this._markerStyle = new Style({
            image : marker
        });
    }

    /**
     * create style draw object : "ol.style"
     *
     * @private
     */
    _createStylingDraw () {
        logger.trace("ElevationPath::_createStylingDraw");

        // on interprete les params pour y creer un objet ol.Style
        var styles = this.options.stylesOptions.draw;

        // style de depart
        logger.trace("style start", styles.start);

        // Creation à partir des styles par défaut
        var startStyleOpts = {
            image : Measures.DEFAULT_POINTER_STYLE,
            stroke : Measures.DEFAULT_DRAW_START_STYLE.getStroke()
        };
        // ecrasement à partir des propriétés renseignées
        if (styles.hasOwnProperty("pointer") && styles.pointer instanceof Image) {
            startStyleOpts.image = styles.pointer;
        }
        if (styles.hasOwnProperty("start") && styles.start instanceof Stroke) {
            startStyleOpts.stroke = styles.start;
        }

        this._drawStyleStart = new Style(startStyleOpts);

        // style de fin
        logger.trace("style finish", styles.finish);

        var finishStyleOpts = {
            stroke : Measures.DEFAULT_DRAW_FINISH_STYLE.getStroke()
        };
        // ecrasement à partir des propriétés renseignées
        if (styles.hasOwnProperty("finish") && styles.finish instanceof Stroke) {
            finishStyleOpts.stroke = styles.finish;
        }

        this._drawStyleFinish = new Style(finishStyleOpts);
    }

    /**
     * create style graph
     * FIXME : à revoir car ne sert que pour AmCharts !?
     *
     * @private
     */
    _createStylingProfile () {
        logger.trace("ElevationPath::_createStylingProfile");

        var userStyles = this.options.stylesOptions.profile;

        logger.trace("style profile", userStyles);

        var defaultStyle = ElevationPath.DEFAULT_STYLES.PROFILE;
        Object.keys(defaultStyle).forEach((key) => {
            if (!userStyles.hasOwnProperty(key)) {
                // si le style user n'existe pas, on ajoute celui par defaut
                userStyles[key] = defaultStyle[key];
            } else {
                var _defaultStyle = defaultStyle[key];
                if (typeof _defaultStyle === "object") {
                    // on merge avec un objet,
                    // les styles user ecrasent ceux par defaut...
                    Utils.mergeParams(_defaultStyle, userStyles[key]);
                    userStyles[key] = _defaultStyle;
                }
            }
        });
    }

    // ################################################################### //
    // ################### Map interactions management ################### //
    // ################################################################### //

    /**
     * this method is called by this.onShowElevationPathClick,
     * and initialize a vector layer, if widget is active.
     *
     * @param {ol.Map} map - Map
     * @private
     */
    _initMeasureInteraction (map) {
        logger.trace("ElevationPath::_initMeasureInteraction()");

        // var map = this.getMap();
        if (!map) {
            return;
        }

        this._measureSource = new VectorSource();

        this._measureVector = new VectorLayer({
            source : this._measureSource,
            style : this._drawStyleFinish
        });

        // on rajoute le champ gpResultLayerId permettant d'identifier une couche crée par le composant.
        this._measureVector.gpResultLayerId = "measure:profil";

        map.addLayer(this._measureVector);

        // Si un layer switcher est présent dans la carte, on lui affecte des informations pour cette couche
        map.getControls().forEach(
            (control) => {
                if (control instanceof LayerSwitcher) {
                    // un layer switcher est présent dans la carte
                    var layerId = this._measureVector.gpLayerId;
                    // on n'ajoute des informations que s'il n'y en a pas déjà (si le titre est le numéro par défaut)
                    if (control._layers[layerId].title === layerId) {
                        control.addLayer(
                            this._measureVector, {
                                title : this.options.layerDescription.title,
                                description : this.options.layerDescription.description
                            }
                        );
                    }
                }
            }
        );
    }

    /**
     * this method is called by this.onShowElevationPathClick,
     * and add draw interaction to map, if widget is not active.
     *
     * @param {ol.Map} map - Map
     * @private
     */
    _addMeasureInteraction (map) {
        logger.trace("ElevationPath::_addMeasureInteraction()");

        // var map = this.getMap();
        if (!map) {
            return;
        }

        // Creates and adds the interaction
        this._measureDraw = new DrawInteraction({
            source : this._measureSource,
            type : "LineString",
            style : this._drawStyleStart,
            stopClick : true
        });

        this._measureDraw.setProperties({
            name : "ElevationPath",
            source : this
        });

        map.addInteraction(this._measureDraw);

        // Event start
        this._measureDraw.on("drawstart", (evt) => {
            logger.trace("drawstart", evt);

            // delete marker current
            if (this._marker !== null) {
                this._measureSource.removeFeature(this._marker);
                this._marker = null;
            }

            // set new feature and remove last feature
            if (this._lastSketch !== null) {
                this._measureSource.removeFeature(this._lastSketch);
                this._lastSketch = null;
            }
            this._currentSketch = evt.feature;

            // and, all features
            var _features = this._measureSource.getFeatures();
            for (var i = 0; i < _features.length; i++) {
                this._measureSource.removeFeature(_features[i]);
            }
            /**
            * event triggered at the start of drawing input
            * @event elevationpath:drawstart
            */
            this.dispatchEvent("elevationpath:drawstart");
        });

        // Event end
        this._measureDraw.on("drawend", (evt) => {
            logger.trace("drawend", evt);
            /**
            * event triggered at the end of drawing input
            * @event elevationpath:drawend
            */
            this.dispatchEvent("elevationpath:drawend");

            // set feature
            this._lastSketch = this._currentSketch;

            // Si il n'y a pas de surcharge utilisateur de la fonction de recuperation des
            // resultats, on realise l'affichage du panneau
            if (typeof this.options.elevationOptions.onSuccess === "undefined" && this.options.displayProfileOptions.target === null) {
                this._panelContainer.style.display = "block";
                // self._panelContainer.style.visibility = "visible";
            }

            // set an alti request and display results
            this._measureDraw.setActive(false);
            this._requestService();
        });
    }

    /**
     * this method is called by this.onShowElevationPathClick,
     * and removes draw interaction from map (if exists)
     * And removes layer too...
     *
     * @param {ol.Map} map - Map
     * @param {Boolean} remove - Remove layer
     * @private
     */
    _removeMeasureInteraction (map, remove) {
        logger.trace("ElevationPath::_removeMeasureInteraction()");

        // var map = this.getMap();
        if (!map) {
            return;
        }

        if (remove) {
            if (this._measureVector) {
                map.removeLayer(this._measureVector);
                this._measureVector = null;
            }
        }

        if (this._measureDraw) {
            map.removeInteraction(this._measureDraw);
            this._measureDraw = null;
        }
    }

    // ################################################################### //
    // ############################ Alti request ######################### //
    // ################################################################### //

    /**
     * transforme geometry feature to position coordinate (service)
     *
     * @returns {Object[]} geometry
     *
     * @private
     */
    _getGeometry () {
        // INFO
        // on transmet toujours des coordonnées au service en EPSG:4326

        if (this._currentSketch === null) {
            logger.warn("Current Feature undefined !?");
            return;
        }

        var geometry = [];

        var map = this.getMap();
        var projSrc = map.getView().getProjection();
        var projDest = "EPSG:4326";
        var coordinates = this._currentSketch.getGeometry().getCoordinates();
        for (var i = 0; i < coordinates.length; i++) {
            var xy = coordinates[i];
            var ll = xy;
            // on transmet au service des coordonnées en EPSG:4326
            if (projSrc !== projDest) {
                ll = olTransformProj(xy, projSrc, projDest);
            }
            geometry.push({
                lon : Math.round(ll[0] * 1e8) / 1e8,
                lat : Math.round(ll[1] * 1e8) / 1e8
            });
        }

        return geometry;
    }

    /**
     * get geometry feature length
     *
     * @returns {Integer} length
     *
     * @private
     */
    _getLength () {
        if (this._currentSketch === null) {
            logger.warn("Current Feature undefined !?");
            return;
        }

        var length = 0;

        var map = this.getMap();
        var projSrc = map.getView().getProjection();
        var projDest = "EPSG:4326";

        var coordinates = this._currentSketch.getGeometry().getCoordinates();
        for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
            var c1 = olTransformProj(coordinates[i], projSrc, projDest);
            var c2 = olTransformProj(coordinates[i + 1], projSrc, projDest);
            c1[0] = Math.round(c1[0] * 1e8) / 1e8;
            c1[1] = Math.round(c1[1] * 1e8) / 1e8;
            c2[0] = Math.round(c2[0] * 1e8) / 1e8;
            c2[1] = Math.round(c2[1] * 1e8) / 1e8;
            length += olGetDistanceSphere(c1, c2);
        }

        return length;
    }

    /**
     * get geometry feature point coords in EPSG:4326 [lon, lat]
     *
     * @returns {Array} point coords in EPSG:4326 [lon, lat]
     *
     * @private
     */
    _getSketchCoords () {
        if (this._currentSketch === null) {
            logger.warn("Current Feature undefined !?");
            return;
        }

        var map = this.getMap();
        var projSrc = map.getView().getProjection();
        var projDest = "EPSG:4326";

        var pointCoords = [];

        var coordinates = this._currentSketch.getGeometry().getCoordinates();
        for (var i = 0; i < coordinates.length; i++) {
            var c1 = olTransformProj(coordinates[i], projSrc, projDest);
            c1[0] = Math.round(c1[0] * 1e8) / 1e8;
            c1[1] = Math.round(c1[1] * 1e8) / 1e8;
            pointCoords.push(c1);
        }

        return pointCoords;
    }

    /**
     * this method is called at the end of the path,
     * it generates and sends alti request, then displays results
     *
     * @private
     */
    _requestService () {
        logger.trace("ElevationPath::_requestService");

        // les coordonnées sont obligatoires
        var geometry = this._getGeometry();
        logger.trace("geometry", geometry);
        if (!geometry) {
            logger.warn("missing geometry !?");
            return;
        }

        // on construit les options pour la requête
        var options = {};

        // on surcharge avec les options de l'utilisateur
        Utils.mergeParams(options, this.options.elevationOptions);

        // au cas où ...
        Utils.mergeParams(options, {
            apiKey : options.apiKey || this.options.apiKey
        });

        // si l'utilisateur a spécifié le paramètre ssl au niveau du control, on s'en sert
        // true par défaut (https)
        if (typeof options.ssl !== "boolean") {
            if (typeof this.options.ssl === "boolean") {
                options.ssl = this.options.ssl;
            } else {
                options.ssl = true;
            }
        }

        Utils.mergeParams(options, {
            ssl : options.ssl
        });

        // les callbacks
        var self = this;

        // gestion des callback
        var bOnFailure = !!(this.options.elevationOptions.onFailure !== null && typeof this.options.elevationOptions.onFailure === "function"); // cast variable to boolean
        var bOnSuccess = !!(this.options.elevationOptions.onSuccess !== null && typeof this.options.elevationOptions.onSuccess === "function");

        // callback _requestServiceOnSuccess
        var _requestServiceOnSuccess = function (result) {
            logger.trace(result);
            if (result) {
                self._panelContainer.style.display = "block";
                // self._panelContainer.style.visibility = "visible";
                if (self._data) {
                    self._data = {};
                }
                self._data = self._computeElevationMeasure(result.elevations);
                self._displayProfile(self._data);
                self._waitingContainer.className = "GPwaitingContainer GPwaitingContainerHidden gpf-waiting gpf-waiting--hidden";
                self._waiting = false;
                self._measureDraw.setActive(true);
            }
            if (bOnSuccess) {
                self.options.elevationOptions.onSuccess.call(self, self.getData());
            }
        };

        // callback _requestServiceOnFailure
        var _requestServiceOnFailure = function (error) {
            // on ferme le panneau en cas d'erreur !
            self._panelContainer.style.display = "none";
            // self._panelContainer.style.visibility = "hidden";
            logger.error(error.message);
            self._waitingContainer.className = "GPwaitingContainer GPwaitingContainerHidden gpf-waiting gpf-waiting--hidden";
            self._waiting = false;
            self._measureDraw.setActive(true);
            if (bOnFailure) {
                self.options.elevationOptions.onFailure.call(self, error);
            }
        };

        Utils.mergeParams(options, {
            onSuccess : _requestServiceOnSuccess,
            onFailure : _requestServiceOnFailure
        });

        // le sampling est soit defini par l'utilisateur (opts),
        // ou soit calculé dynamiquement...
        var sampling = options.sampling || 200;
        var p = Math.max(50, Math.floor(this._getLength()) / 5);
        if (p > 200) {
            sampling = 200;
        } else {
            sampling = Math.floor(p);
        }

        if (sampling > 0) {
            Utils.mergeParams(options, {
                sampling : sampling
            });
        }

        // et enfin, la geometrie
        Utils.mergeParams(options, {
            positions : geometry
        });

        logger.trace("options du service", options);

        // mise en place de la patience
        this._waitingContainer.className = "GPwaitingContainer GPwaitingContainerVisible gpf-waiting gpf-waiting--visible";

        // Request altitude service
        Gp.Services.getAltitude(options);
    }

    // ################################################################### //
    // ########################## Profil display ######################### //
    // ################################################################### //

    /**
     * this method computes results elevations (Z and distance)
     *
     * @param {Array} elevations - array of elevation
     * @returns {Array} elevations
     * @private
     */
    _computeElevationMeasure (elevations) {
        logger.trace("ElevationPath::_computeElevationMeasure", elevations);

        var _data = elevations;
        var _unit = "m";

        var _sketchPoints = this._getSketchCoords();
        if (!_sketchPoints) {
            return;
        }
        // Calcul de la distance au départ pour chaque point + arrondi des lat/lon
        _data[0].dist = 0;
        _data[0].slope = 0;
        _data[0].oldlat = _data[0].lat;
        _data[0].oldlon = _data[0].lon;
        _data[0].lat = Math.round(_data[0].lat * 100000) / 100000;
        _data[0].lon = Math.round(_data[0].lon * 100000) / 100000;

        var _distanceMinus = 0;
        var _distancePlus = 0;
        var _ascendingElevation = 0;
        var _descendingElevation = 0;
        var _distance = 0;
        var _slopes = 0;

        var distances = [];
        for (var i = 1; i < _data.length; i++) {
            var a = [_data[i].lon, _data[i].lat];
            var distanceToPrevious = olGetDistanceSphere(a, [_data[i-1].oldlon, _data[i-1].oldlat]);
            var dist = distanceToPrevious + _distance;

            var za = _data[i].z;
            var zb = _data[i - 1].z;
            if (za < 0) {
                za = 0;
            }
            if (zb < 0) {
                zb = 0;
            }
            var slope = za - zb;
            if (slope < 0) {
                _distanceMinus += distanceToPrevious;
                _descendingElevation += slope;
            } else if (slope > 0) {
                _distancePlus += distanceToPrevious;
                _ascendingElevation += slope;
            }
            _distance = dist;
            _data[i].dist = dist;

            _slopes += (slope) ? Math.abs(Math.round(slope / distanceToPrevious * 100)) : 0;
            _data[i].slope = (slope) ? Math.abs(Math.round(slope / distanceToPrevious * 100)) : 0;

            // EVOL ?
            // cf. gradiant
            // http://www.color-hex.com/color/00b798
            var value = _data[i].slope;
            if (value > 15 && value < 30) {
                _data[i].color = "#005b4c";
            } else if (value > 30 && value < 45) {
                _data[i].color = "#00362d";
            } else if (value > 45) {
                _data[i].color = "#00120f";
            } else {
                _data[i].color = "#00B798";
            }
            _data[i].oldlat = _data[i].lat;
            _data[i].oldlon = _data[i].lon;
            _data[i].lat = Math.round(_data[i].lat * 100000) / 100000;
            _data[i].lon = Math.round(_data[i].lon * 100000) / 100000;
        }

        // check distance totale
        logger.trace("List Distances", distances);

        // Correction des altitudes aberrantes + arrondi des calculs de distance + ...
        var _altMin = _data[0].z;
        var _altMax = _data[0].z;
        var _greaterSlope = _data[0].slope;

        for (var ji = 0; ji < _data.length; ji++) {
            var d = _data[ji];
            if (d.z < -100) {
                d.z = 0;
            }
            if (d.z > _altMax) {
                _altMax = d.z;
            }
            if (d.z < _altMin) {
                _altMin = d.z;
            }

            if (d.slope > _greaterSlope) {
                _greaterSlope = d.slope;
            }
        }

        return {
            greaterSlope : _greaterSlope, // pente max
            meanSlope : Math.round(_slopes / _data.length), // pente moyenne
            distancePlus : _distancePlus, // distance cumulée positive
            distanceMinus : _distanceMinus, // distance cumulée négative
            ascendingElevation : _ascendingElevation, // dénivelé cumulée positive
            descendingElevation : _descendingElevation, // dénivelé cumulée négative
            altMin : _altMin.toLocaleString(), // altitude min TODO: inutile ?
            altMax : _altMax.toLocaleString(), // altitude max TODO: inutile ?
            distance : this._getLength(), // distance totale
            unit : _unit, // unité des mesures de distance
            points : _data
        };
    }

    /**
     * this method is called after service request (in case of success)
     * and display results
     *
     * @param {Array} elevations - array of elevation
     * @private
     */
    _displayProfile (elevations) {
        logger.trace("ElevationPath::_displayProfile", elevations);

        this._updateInfoContainer();

        // container
        var container = this.options.displayProfileOptions.target;
        if (container) {
            container.appendChild(this._panelContainer);
        }
        container = this._profileContainer;

        // TODO contexte ?
        var context = this;

        // fonction
        var displayFunction = this.options.displayProfileOptions.apply;

        // execution...
        displayFunction.call(this, elevations, container, context);

        var opts = this.options.displayProfileOptions;
        var element = document.getElementById("GPelevationPathPanelInfo-" + this._uid);
        if (element) {
            if (opts.totalDistance ||
                opts.greaterSlope ||
                opts.meanSlope ||
                opts.ascendingElevation ||
                opts.descendingElevation) {
                // on affiche les informations
                element.style.display = "block";
            }
        }

        /**
         * event triggered when the compute is finished
         *
         * @event elevationpath:compute
         * @typedef {Object}
         * @property {Object} type - event
         * @property {Object} target - instance ElevationPath
         * @example
         * ElevationPath.on("elevationpath:compute", function (e) {
         *   console.log(e.target.getData());
         * })
         */
        this.dispatchEvent({
            type : "elevationpath:compute"
        });
    }

    /**
     * update info container
     *
     * @private
     */
    _updateInfoContainer () {
        logger.trace("ElevationPath::_updateInfoContainer");

        // options d'affichage
        var totalDistance = this.options.displayProfileOptions.totalDistance;
        var meanSlope = this.options.displayProfileOptions.meanSlope;
        var greaterSlope = this.options.displayProfileOptions.greaterSlope;
        var ascendingElevation = this.options.displayProfileOptions.ascendingElevation;
        var descendingElevation = this.options.displayProfileOptions.descendingElevation;

        // clean
        var div = this._infoContainer;
        if (div.childElementCount) {
            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }
        }

        // creation des infomations
        if (totalDistance) {
            this._addElevationPathInformationsItem("Distance totale", Math.round(this._data.distance).toLocaleString() + " m");
        }

        if (ascendingElevation) {
            this._addElevationPathInformationsItem("Dénivelé positif", this._data.ascendingElevation.toLocaleString() + " m");
        }

        if (descendingElevation) {
            this._addElevationPathInformationsItem("Dénivelé négatif", this._data.descendingElevation.toLocaleString() + " m");
        }

        if (meanSlope) {
            this._addElevationPathInformationsItem("Pente moyenne", this._data.meanSlope.toLocaleString() + " %");
        }

        if (greaterSlope) {
            this._addElevationPathInformationsItem("Plus forte pente", this._data.greaterSlope.toLocaleString() + " %");
        }
    }

    /**
     * Remove measure
     * @private
     */
    _removeMeasure () {
        // sketch
        this._lastSketch = null;
        this._currentSketch = null;

        if (this._measureSource) {
            // marker
            if (this._marker) {
                this._measureSource.removeFeature(this._marker);
                this._marker = null;
            }

            // all other features
            var _features = this._measureSource.getFeatures();
            for (var i = 0; i < _features.length; i++) {
                this._measureSource.removeFeature(_features[i]);
            }
        }
    }

    /**
     * Remove profile
     * @private
     */
    _removeProfile () {
        // graph
        this._profile = null;

        // on vide le container
        if (this._profileContainer) {
            while (this._profileContainer.firstChild) {
                this._profileContainer.removeChild(this._profileContainer.firstChild);
            }
        }
    }

    // ################################################################### //
    // ####################### handlers events to dom #################### //
    // ################################################################### //

    /**
     * this method is called by event 'click' on '' picto
     * and enable or disable the entry of the path
     *
     * @param {Object} e - event
     * @private
     */
    onShowElevationPathClick (e) {
        var opened = this._pictoButton.ariaPressed;
        if (opened === "true") {
            this.onPanelOpen();
        }

        var map = this.getMap();
        Interactions.unset(map, {
            current : "ElevationPath"
        });

        // Activation/Desactivation des interactions de dessins
        if (opened === "true") {
            // on n'affiche pas la fenetre de profile s'il n'existe pas...
            if (this._profile === null) {
                this._panelContainer.style.display = "none";
                // this._panelContainer.style.visibility = "hidden";
            }
            this._initMeasureInteraction(map);
            this._addMeasureInteraction(map);
        } else {
            this._panelContainer.style.display = "none";
            // HACK
            // il est possible de faire passer une instruction via le DOM et les dataset :
            // * data-remove-measure : true|false
            // * data-remove-layer : true|false
            if (e && e.target.dataset && e.target.dataset.removeMeasure) {
                if (e.target.dataset.removeMeasure === "true") {
                    this._removeMeasure();
                } else {
                    // sketch
                    this._lastSketch = null;
                    this._currentSketch = null;
                }
            } else {
                this._removeMeasure();
            }
            this._removeProfile();

            if (e && e.target.dataset && e.target.dataset.removeLayer) {
                this._removeMeasureInteraction(map, (e.target.dataset.removeLayer === "true"));
            } else {
                this._removeMeasureInteraction(map, true);
            }
        }

        this.collapsed = !(opened === "true");
        // on génère nous même l'evenement OpenLayers de changement de propriété
        // (utiliser ol.control.Isocurve.on("change:collapsed", function ) pour s'abonner à cet évènement)
        this.dispatchEvent("change:collapsed");
    }

    /**
     * this method is called by event 'click' on '' picto
     * (cf. this.),
     * and display the panel info
     *
     * @private
     */
    onOpenElevationPathInfoClick () {
        var div = this._infoContainer;

        // show des informations !
        if (div.className === "GPelementVisible gpf-visible") {
            clearTimeout(this._timerHdlr);
            div.className = "GPelementHidden gpf-hidden";
        } else {
            div.className = "GPelevationPathInformationsContainerVisible";
        }

        // hidden des informations !
        this._timerHdlr = setTimeout(function () {
            div.className = "GPelementHidden gpf-hidden";
        }, 4000);
    }

};

// on récupère les méthodes de la classe commune ElevationPath
Object.assign(ElevationPath.prototype, ElevationPathDOM);
Object.assign(ElevationPath.prototype, Widget);

export default ElevationPath;

// Expose ElevationPath as ol.control.ElevationPath (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.ElevationPath = ElevationPath;
}
