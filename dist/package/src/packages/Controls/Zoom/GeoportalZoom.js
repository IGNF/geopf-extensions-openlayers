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
        this.element.id = "GPzoom-" +  this._uid;
        this.element.classList.add("GPwidget", "gpf-widget", "gpf-widget-button");
        this.element.classList.remove("ol-zoom", "ol-unselectable", "ol-control");

        var buttons = this.element.childNodes;
        for (let index = 0; index < buttons.length; index++) {
            const btn = buttons[index];
            if (btn.classList.contains("ol-zoom-in")) {
                btn.classList.remove("ol-zoom-in");
                btn.classList.add("GPzoomIn", "gpf-btn-icon-zoom-in", "fr-btn", "fr-btn--primary");
                btn.id = "GPzoomIn";
                btn.innerHTML = "";
            }
            if (btn.classList.contains("ol-zoom-out")) {
                btn.classList.remove("ol-zoom-out");
                btn.classList.add("GPzoomOut", "gpf-btn-icon-zoom-out", "fr-btn", "fr-btn--primary");
                btn.id = "GPzoomOut";
                btn.innerHTML = "";
            }
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
                if (ctrl.element.classList.contains("ol-zoom")) {
                    ctrl.element.classList.add("ol-hidden");
                    ctrl.element.style.display = "none";
                }
            });
        }
        this.setTarget(this.options.target);
        super.setMap(map);
    }

};

export default GeoportalZoom;

// Expose GeoportalZoom as ol.control.GeoportalZoom (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.GeoportalZoom = GeoportalZoom;
}