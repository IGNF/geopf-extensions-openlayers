import Modify from "ol/interaction/Modify";
import { selectStyle } from "./selectStyle";
/*
import ContextMenu from "../Controls/ContextMenu/ContextMenu";
*/

import Control from "ol/control/Control";

class Menu extends Control {

    constructor () {
        super({
            element : document.createElement("ul"),
        });
        this.element.className = "gpf-context-menu ol-unselectable ol-control";
        this.element.style.display = "none";
    }
    setMenu (items) {
        this.element.innerHTML = "";
        items.forEach(item => {
            const li = document.createElement("li");
            this.element.appendChild(li);
            const a = document.createElement("a");
            a.innerHTML = item.text;
            a.href = "#";
            a.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                item.callback();
                if (item.hide) {
                    this.hide();
                }
            };
            li.appendChild(a);
        });
    }
    show (pixel) {
        this.element.style.display = "block";
        const extent = this.getMap().getSize();
        console.log("extent :", extent, pixel);
        if (pixel[0] > extent[0] * 0.75) {
            this.element.style.left = "unset";
            this.element.style.right = extent[0] - pixel[0] + "px";
        } else {
            this.element.style.left = pixel[0] + "px";
            this.element.style.right = "unset";
        }

        if (pixel[1] > extent[1] * 0.75) {
            this.element.style.top = "unset";
            this.element.style.bottom = extent[1] - pixel[1] + "px";
        } else {
            this.element.style.top = pixel[1] + "px";
            this.element.style.bottom = "unset";
        }
        // this.element.style.inset = pixel[1] + "px auto auto " + pixel[0] + "px";
        this.element.style.pointerEvents = "auto";
        // Focus on first element
        const a = this.element.querySelector("a");
        if (a) {
            a.focus();
        }
    }
    hide () {
        this.element.style.display = "none";
    }

}

class ModifyingInteraction extends Modify {

    /**
     * Initialize modifying interaction
     * @param {*} options extend Openlayers modifying options 
     */
    constructor (options) {
        options = options || {};
        options.style = selectStyle();
        options.features = options.select ? options.select.getFeatures() : options.features;

        super(options);

        this._menu = new Menu();
        this._select = options.select;
    }

    setMap (map) {
        if (this.getMap()) {
            this.getMap().removeControl(this._menu);
        } 
        super.setMap(map);
        if (map) {
            map.addControl(this._menu);
        }
        this._menu.hide();
    }

    setActive (active) {
        super.setActive(active);
        if (this._menu) {
            this._menu.hide();
        }
    }

    handleEvent (e) {
        const isPoint = this.getOverlay().getSource().getFeaturesAtCoordinate(e.coordinate).length;
        const resp = super.handleEvent(e);
        const isAdd = !!this.vertexFeature_;

        if (e.type === "contextmenu") {
            e.originalEvent.preventDefault();

            if (isPoint && this.canRemovePoint()) {
                // Disable context menu on map
                console.log("context menu :", isPoint, isAdd, this.vertexFeature_, e.coordinate);
                // this.removePoint(e.coordinate);
                this._menu.setMenu([
                    {
                        text : "Supprimer le point",
                        callback : () => {
                            this.removePoint(e.coordinate);
                        },
                        hide : true
                    },
                ]);
                this._menu.show(e.pixel);
            } else if (this._select && this._select.getFeatures().getLength() > 0) {
                this._menu.setMenu([
                    {
                        text : "Dupliquer les objets sélectionnés",
                        callback : () => {
                        },
                        hide : true
                    },{
                        text : "Supprimer les objets sélectionnés",
                        callback : () => {
                        },
                        hide : true
                    },
                ]);
                this._menu.show(e.pixel);
            } else {
                this._menu.hide();
            }
        } else if (e.type !== "pointermove") {
            console.log("hide menu", e.type);
            this._menu.hide();
        }
        // Dragging feature : show crosshair cursor
        if (e.type==="pointerdrag" && isAdd) { 
            e.map.getTargetElement().style.cursor = "crosshair";
            return resp;
        }
        // Handle hover effect
        if (isPoint) {
            if (e.originalEvent.altKey) {
                this.getMap().getTargetElement().style.cursor = "alias";
            } else {
                this.getMap().getTargetElement().style.cursor = "pointer";
            }
        } else if (isAdd) {
            this.getMap().getTargetElement().style.cursor = "copy";
        } else {
            this.getMap().getTargetElement().style.cursor = "";
        }
        return resp;
    }

}

export default ModifyingInteraction;

// Expose ModifyingInteraction as ol.interaction.Modifying (for a build bundle)
if (window.ol && window.ol.interaction) {
    window.ol.interaction.Modifying = ModifyingInteraction;
}
