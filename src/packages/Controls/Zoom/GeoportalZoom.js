// import CSS
import "../../CSS/Controls/Zoom/GPFzoom.css";
// import local
import Logger from "../../Utils/LoggerByDefault";
import SelectorID from "../../Utils/SelectorID";
// import ol
import Zoom from "ol/control/Zoom";

var logger = Logger.getLogger("zoom");

/**
 * @classdesc
 * OpenLayers Control to manage zoom
 *
 * @constructor
 * @extends {ol.control.Zoom}
 * @alias ol.control.GeoportalZoom
 * @type {ol.control.GeoportalZoom}
 * @param {Object} options - ol.control.Zoom options (see {@link http://openlayers.org/en/latest/apidoc/ol.control.Zoom.html ol.Control.Zoom})
 * @fire zoom:in
 * @fire zoom:out
 * @example
 * var zoom = new ol.control.GeoportalZoom({
 *   position: "top-left"
 * });
 * map.addControl(zoom);
 */
var GeoportalZoom = class GeoportalZoom extends Zoom {

    /**
     * See {@link ol.control.GeoportalZoom}
     * @module GeoportalZoom
     * @alias module:~controls/GeoportalZoom
     * @param {*} options - options
     * @example
     * import GeoportalZoom from "gpf-ext-ol/controls/GeoportalZoom"
     * ou
     * import { GeoportalZoom } from "gpf-ext-ol"
     */
    constructor (options) {
        options = options || {};

        // FIXME comment traite t on les options sur les classes
        // du contrôle natif ?
        // * className,
        // * zoomInClassName, zoomOutClassName,
        // * zoomInLabel, zoomOutLabel,
        // * zoomInTipLabel, zoomOutTipLabel
        var className = "ol-custom-zoom";
        options.className = className;
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
        this._uid = this.options.id || SelectorID.generate();

        // Ajout / Suppression des attributs du DOM
        this.element.id = "GPzoom-" +  this._uid;
        this.element.classList.add("GPwidget", "gpf-widget", "gpf-widget-button");
        this.element.classList.add(this.options.className);
        this.element.classList.remove("ol-zoom", "ol-unselectable", "ol-control");

        var self = this;
        var buttons = this.element.childNodes;
        for (let index = 0; index < buttons.length; index++) {
            const btn = buttons[index];
            if (btn.classList.contains(this.options.className + "-in")) {
                // btn.classList.remove("ol-custom-zoom-in");
                btn.classList.add("GPzoomIn", "GPshowOpen", "GPshowAdvancedToolPicto", "gpf-btn-icon-zoom-in", "fr-btn", "fr-btn--tertiary", "gpf-btn", "gpf-btn--tertiary", "gpf-btn-icon");
                btn.id = "GPzoomIn";
                btn.innerHTML = "";
                btn.removeAttribute("title");
                btn.setAttribute("aria-label", "Zoomer");
                // INFO: Ajout d'une SPAN pour enlever des marges de 6px dans CHROMIUM (?!)
                var span = document.createElement("span");
                btn.appendChild(span);
                if (btn.addEventListener) {
                    btn.addEventListener("click", function () {
                        /**
                        * event triggered on zoom in
                        * @event zoom:in
                        */
                        self.dispatchEvent("zoom:in");
                    });
                } else if (btn.attachEvent) {
                    btn.attachEvent("onclick", function () {
                        self.dispatchEvent("zoom:in");
                    });
                }
            }
            if (btn.classList.contains(this.options.className + "-out")) {
                // btn.classList.remove("ol-custom-zoom-out");
                btn.classList.add("GPzoomOut", "GPshowOpen", "GPshowAdvancedToolPicto", "gpf-btn-icon-zoom-out", "fr-btn", "fr-btn--tertiary", "gpf-btn", "gpf-btn--tertiary", "gpf-btn-icon");
                btn.id = "GPzoomOut";
                btn.innerHTML = "";
                btn.removeAttribute("title");
                btn.setAttribute("aria-label", "Dézoomer");
                // INFO: Ajout d'une SPAN pour enlever des marges de 6px dans CHROMIUM (?!)
                var span = document.createElement("span");
                btn.appendChild(span);
                if (btn.addEventListener) {
                    btn.addEventListener("click", function () {
                        /**
                        * event triggered on zoom out
                        * @event zoom:out
                        */
                        self.dispatchEvent("zoom:out");
                    });
                } else if (btn.attachEvent) {
                    btn.attachEvent("onclick", function () {
                        self.dispatchEvent("zoom:out");
                    });
                }
            }
        }

        // Surcharge CSS de positionnement par defaut
        if (this.options.position) {
            this.element.style.position = "unset";
        }

        // reunion du bouton avec le précédent
        if (this.options.gutter === false) {
            this.element.classList.add("gpf-button-no-gutter");
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
                if (ctrl.element.classList.contains("ol-zoom")) {
                    ctrl.element.classList.add("ol-hidden");
                    ctrl.element.style.display = "none";
                }
            });
        }
        this.setTarget(this.options.target);
        super.setMap(map);
    }

    /**
     * Get container
     *
     * @returns {DOMElement} container
     */
    getContainer () {
        return this.container;
    }

};

export default GeoportalZoom;

// Expose GeoportalZoom as ol.control.GeoportalZoom (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.GeoportalZoom = GeoportalZoom;
}
