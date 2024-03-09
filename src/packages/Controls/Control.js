import Control from "ol/control/Control";

var ControlExtended = class ControlExtended extends Control {

    constructor (options) {
        super(options);
    }

    setPosition (pos) {
        var instance = new PositionFactory(this);
        instance.set(pos);
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
 * @todo revoir les css des widgets car les panneaux sont en position:absolute
 */
class PositionFactory {

    /**
     * constructor
     * @param {*} caller - ...
     */
    constructor (caller) {
        this.caller = caller;

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
        var div = document.getElementById("position-container-" + name);
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
        if (this.#existContainer(name)) {
            return;
        }
        // INFO
        // positionner les classes position-container-[left|right|top|bottom]
        // ex. { position:relative; height:50px; width:100%; }
        var div = document.createElement("div");
        div.id = "position-container-" + name;
        div.className = "position-container-" + name ;
        
        var container = this.caller.getMap().getOverlayContainerStopEvent();
        container.appendChild(div);
    }

    /**
     * ...
     * @param {*} pos - ...
     * @todo
     */
    #setAnchor (pos) {
        const sizeW = (pos) => {
            var element = document.getElementById("position-container-" + pos);
            var width = element.offsetWidth;
            return width;
        };
        const sizeH = (pos) => {
            var element = document.getElementById("position-container-" + pos);
            var height = element.offsetHeight;
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
        // * panel de resultats
        var panels = Array.from(this.caller.element.getElementsByClassName("GPpanel"));
        if (panels.length === 0) {
            return;
        }
        panels.forEach((e) => {
            clear(e);
        });
        var panel = panels[0];
        // on modifie le positionnement du menu (dialog ou div : panel) 
        // en fonction du bouton
        // ex. bouton : bottom-left, menu : bottom:0px; left:50px
        switch (pos.toLowerCase()) {
            case "top-left":
                panel.style.top = "0px";
                panel.style.left = sizeW(pos) + "px"; // container 50px + padding de 5px
                break;
            case "bottom-left":
                panel.style.bottom = "0px";
                panel.style.left = sizeW(pos) + "px";
                break;
            case "top-right":
                panel.style.top = "0px";
                panel.style.right = sizeW(pos) + "px";
                break;
            case "bottom-right":
                panel.style.bottom = "0px";
                panel.style.right = sizeW(pos) + "px";
                break;
            default:
                break;
        }
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
        this.#setAnchor(pos);

        document.getElementById("position-container-" + pos).appendChild(this.caller.element);
    }

};