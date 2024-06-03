// import CSS
import "../../CSS/Controls/Zoom/GPFzoom.css";
// import local
import Logger from "../../Utils/LoggerByDefault";
import SelectorID from "../../Utils/SelectorID";
// import ol
import Zoom from "ol/control/Zoom";

var logger = Logger.getLogger("zoom");

var GeoportalZoom = class GeoportalZoom extends Zoom {

    constructor (options) {
        options = options || {};

        if (options.position) {
            options.target = "position-container-" + options.position;
            // Creation manuelle du container de position
            if (!document.getElementById(options.target)) {
                var div = document.createElement("div");
                div.id = options.target;
                div.classList.add("position");
                div.classList.add(options.target);
                var container = document.getElementsByClassName("ol-overlaycontainer-stopevent")[0];
                container.appendChild(div);
            }
        }

        super(options);

        this.#initialize(options);
    }

    #initialize (options) {
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
                btn.classList.add("GPzoomIn", "gpf-btn-icon-zoom-in", "fr-btn", "fr-btn--tertiary");
                btn.id = "GPzoomIn";
                btn.innerHTML = "";
            }
            if (btn.classList.contains("ol-zoom-out")) {
                btn.classList.remove("ol-zoom-out");
                btn.classList.add("GPzoomOut", "gpf-btn-icon-zoom-out", "fr-btn", "fr-btn--tertiary");
                btn.id = "GPzoomOut";
                btn.innerHTML = "";
            }
        }

        // Surcharge CSS de positionnement par defaut
        if (options.position) {
            this.element.style.position = "unset";
        }
    }

    setMap (map) {
        if (map) {
            map.getControls().forEach((control) => {
                if (control instanceof Zoom) {
                    if (control._uid) {
                        return;
                    }
                    // on supprime le controle zoom par defaut
                    control.setMap(null);
                }
            });
        }
        super.setMap(map);
    }

};

export default GeoportalZoom;

// Expose GeoportalZoom as ol.control.GeoportalZoom (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.GeoportalZoom = GeoportalZoom;
}