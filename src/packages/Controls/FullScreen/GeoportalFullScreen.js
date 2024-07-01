// import CSS
import "../../CSS/Controls/FullScreen/GPFfullScreen.css";
// import local
import Logger from "../../Utils/LoggerByDefault";
import SelectorID from "../../Utils/SelectorID";
// import ol
import FullScreen from "ol/control/FullScreen";

var logger = Logger.getLogger("fullscreen");

/**
 * @classdesc
 * OpenLayers Control to manage full screen
 *
 * @constructor
 * @extends {ol.control.FullScreen}
 * @alias ol.control.GeoportalFullScreen
 * @type {ol.control.GeoportalFullScreen}
 * @param {Object} options - ol.control.FullScreen options (see {@link http://openlayers.org/en/latest/apidoc/ol.control.FullScreen.html ol.Control.FullScreen})
 * @example
 * var zoom = new ol.control.GeoportalFullScreen({
 *   position: "top-left"
 * });
 * map.addControl(zoom);
 */
var GeoportalFullScreen = class GeoportalFullScreen extends FullScreen {

    /**
     * See {@link ol.control.GeoportalFullScreen}
     * @module GeoportalFullScreen
     * @alias module:~controls/GeoportalFullScreen
     * @param {*} options - options
     * @example
     * import GeoportalFullScreen from "gpf-ext-ol/controls/GeoportalFullScreen"
     * ou
     * import { GeoportalFullScreen } from "gpf-ext-ol"
     */
    constructor (options) {
        options = options || {};

        var className = "ol-custom-full-screen";
        options.className = options.className || className;
        options.label = options.label || "";
        options.labelActive = options.labelActive || "";
        options.activeClassName = options.activeClassName || className + "-true";
        options.inactiveClassName =  options.inactiveClassName || className + "-false";
        options.tipLabel = options.tipLabel || "Basculer en mode plein écran";

        super(options);

        this.container = null;
        this.options = options;
    }

    _createContainerPosition (map) {
        this.container = map.getOverlayContainerStopEvent();
        this.options.target = this.container;
        if (this.options.position) {
            var id = "position-container-" + this.options.position;
            if (!document.getElementById(id)) {
                // Creation manuelle du container de position
                var div = document.createElement("div");
                div.id = id;
                div.classList.add("position");
                div.classList.add(id);
                this.container.appendChild(div);
            }
            this.options.target = this.container.children[id];
        }
    }

    _initContainer () {
        // UID interne pour chaque controle
        this._uid = SelectorID.generate();

        // Ajout / Suppression des attributs du DOM
        this.element.id = "GPfullScreen-" +  this._uid;
        this.element.classList.add("GPwidget", "gpf-widget", "gpf-widget-button");
        this.element.classList.add(this.options.className);
        this.element.classList.remove("ol-full-screen", "ol-unselectable", "ol-control");

        var button = this.element.childNodes[0];
        button.classList.add("GPshowOpen", "GPshowAdvancedToolPicto", "GPfullScreenPicto", "fr-btn");
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", false);
        button.setAttribute("type", "button");
        if (button.addEventListener) {
            button.addEventListener("click", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
            });
        } else if (button.attachEvent) {
            button.attachEvent("onclick", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
            });
        }

        // Surcharge CSS de positionnement par defaut
        if (this.options.position) {
            this.element.style.position = "unset";
        }
    }

    /**
     * Overload setMap function
     *
     * @param {ol.Map} map - Map.
     */
    setMap (map) {
        if (map) {
            this._createContainerPosition(map);
            this._initContainer();
            // INFO
            // on ne supprime pas le zoom par defaut,
            // on le desactive simplement pour éviter des effets de bords
            // (ex. evenement de suppression d'un element de la collection)
            var controls = map.getControls();
            controls.forEach(ctrl => {
                if (ctrl.element.classList.contains("ol-full-screen")) {
                    ctrl.element.classList.add("ol-hidden");
                    ctrl.element.style.display = "none";
                }
            });
        }
        this.setTarget(this.options.target);
        super.setMap(map);
    }

};

export default GeoportalFullScreen;

// Expose GeoportalFullScreen as ol.control.GeoportalFullScreen (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.GeoportalFullScreen = GeoportalFullScreen;
}
