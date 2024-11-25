import Control from "ol/control/Control";
import checkDsfr from "./Utils/CheckDsfr";

var ControlExtended = class ControlExtended extends Control {

    constructor (options) {
        options = options || {};
        super({
            element : options.element,
            target : options.target,
            render : options.render
        });
        // Can the control appear in the ControlList control
        if (options && options.listable) {
            this.listable = true;
        } else {
            this.listable = false;
        }
        // Set the control desctiption
        if (options && options.description) {
            this.description = options.description;
        } else {
            this.description = "";
        }
    }

    setPosition (pos) {
        if (this.getMap()) {
            var instance = new PositionFactory(this);
            instance.set(pos);
        }
    }

    updatePosition (pos) {
        if (this.getMap()) {
            var instance = new PositionFactory(this);
            instance.update(pos);
        }
    }

};

export default ControlExtended;

/**
 * gestion des anchors
 */
const ANCHORS = [
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right"
];

/**
 * Position
 * @private
 */
class PositionFactory {

    /**
     * constructor
     * @param {*} caller - ...
     */
    constructor (caller) {
        this.caller = caller;
        this.container = null;

        this.#createContainer("top-left");
        this.#createContainer("top-right");
        this.#createContainer("bottom-left");
        this.#createContainer("bottom-right");

        return this;
    }

    /**
     * ...
     * @param {*} name  - ...
     * @returns {Boolean} ...
     */
    #existContainer (name) {
        var div = this.container.children["position-container-" + name];
        if (div) {
            return true;
        }
        return false;
    }

    /**
     * ...
     * @param {*} name - ...
     * @private
     */
    #createContainer (name) {
        this.container = this.caller.getMap().getOverlayContainerStopEvent();

        if (this.#existContainer(name)) {
            return;
        }
        // INFO
        // positionner les classes position-container-[left|right|top|bottom]
        // ex. { position:relative; height:50px; width:100%; }
        var div = document.createElement("div");
        div.id = "position-container-" + name;
        div.className = "position position-container-" + name ;

        this.container.appendChild(div);
    }

    /**
     * ...
     * @param {*} pos - ...
     * @param {*} update - ...
     * @todo fonctionnement à tester !
     */
    #setAnchor (pos, update) {
        var self = this;
        const position = (pos) => {
            var element = self.container.children["position-container-" + pos];
            return element.children.length;
        };
        const sizeW = (pos) => {
            var element = self.container.children["position-container-" + pos];
            var width = element.offsetWidth;
            return width;
        };
        const sizeH = (pos) => {
            var element = self.container.children["position-container-" + pos];
            var height = element.offsetHeight;
            if (update) {
                if (pos.includes("top")) {
                    height = 0;
                }
                // on recalcule la position en hauteur
                for (let index = 0; index < element.children.length; index++) {
                    const id = element.children[index].id;
                    if (id === self.caller.element.id) {
                        height = (pos.includes("bottom")) ? height - self.caller.element.offsetHeight : height * (-1);
                        break;
                    }
                    height -= element.children[index].offsetHeight;
                }
            }
            return height;
        };
        const clear = (element) => {
            element.style.top = "unset";
            element.style.bottom = "unset";
            element.style.left = "unset";
            element.style.right = "unset";
        };

        // on supprime le style de positionnement (top, left...)
        // car on souhaite une nouvelle position
        clear(this.caller.element);
        this.caller.element.style.position = "unset"; // div.GPwidget

        // on recherche les panneaux (panel) :
        // * panel de formulaire
        // * panel de resultats (?)
        var panels = Array.from(this.caller.element.getElementsByClassName("GPpanel"));
        if (panels.length === 0) {
            return;
        }
        var offset = 0;
        panels.forEach((panel) => {
            // INFO
            // on va eviter de modifier les panneaux de resultats
            // car leurs positions sont souvent relative aux panneaux
            // des formulaires
            if (panel.nodeName.toLowerCase() !== "dialog") {
                return;
            }
            clear(panel);
            // on modifie le positionnement du menu (dialog ou div : panel)
            // en fonction du bouton
            // ex. bouton : bottom-left, menu : bottom:0px; left:50px
            switch (pos.toLowerCase()) {
                case "top-left":
                    if (checkDsfr()) {
                        panel.style.top = "0px";
                    } else {
                        panel.style.top = position(pos) ? sizeH(pos) + "px" : "0px";
                    }
                    panel.style.left = sizeW(pos) + offset + "px";
                    break;
                case "bottom-left":
                    if (checkDsfr()) {
                        panel.style.top = "0px";
                    } else {
                        panel.style.bottom = position(pos) ? sizeH(pos) + "px" : "0px";
                    }
                    panel.style.left = sizeW(pos) + offset + "px";
                    break;
                case "top-right":
                    if (checkDsfr()) {
                        panel.style.top = "0px";
                    } else {
                        panel.style.top = position(pos) ? sizeH(pos) + "px" : "0px";
                    }
                    panel.style.right = sizeW(pos) + offset + "px";
                    break;
                case "bottom-right":
                    if (checkDsfr()) {
                        panel.style.top = "0px";
                    } else {
                        panel.style.bottom = position(pos) ? sizeH(pos) + "px" : "0px";
                    }
                    panel.style.right = sizeW(pos) + offset + "px";
                    break;
                default:
                    break;
            }
            offset += panel.offsetWidth;
        });
    }

    /**
     * ...
     * @param {*} pos - ...
     * @public
     */
    set (pos) {
        if (!ANCHORS.includes(pos.toLowerCase())) {
            return;
        }
        // positionnement de l'element
        this.#setAnchor(pos, false);

        if (pos.includes("bottom")) {
            this.container.children["position-container-" + pos].prepend(this.caller.element);
        } else {
            this.container.children["position-container-" + pos].appendChild(this.caller.element);
        }
    }

    /**
     * ...
     * @param {*} pos - ...
     * @public
     */
    update (pos) {
        if (!ANCHORS.includes(pos.toLowerCase())) {
            return;
        }
        // positionnement de l'element
        // mais, il faut prendre en compte la position !
        this.#setAnchor(pos, true);
    }

};
