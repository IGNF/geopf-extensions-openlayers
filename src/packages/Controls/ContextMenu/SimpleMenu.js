import Control from "ol/control/Control";

// import CSS
import "../../CSS/Controls/ContextMenu/GPFsimpleMenu.scss";
import Overlay from "ol/Overlay.js";


/**
 * @typedef {Object} MenuItem
 * @property {string} text - Texte de l'élément de menu.
 * @property {Function} callback - Fonction à exécuter lors du clic sur l'élément de menu.
 * @property {boolean} [hide=true] - Définit si le menu doit se fermer après le clic sur cet élément.
 * @property {boolean} [link=false] - Utiliser un lien plutot qu'un bouton
 * @property {string} [className] - Classe CSS à appliquer à l'élément de menu.
 */

/** A simple menu to display on a map
 */
class SimpleMenu extends Overlay {

    /**
     * Initialize simple menu
     * @param {Object} options Control options
     * 
     */
    constructor (options = {}) {
        super({
            element : document.createElement("div"),
        });
        this.element.className = "gpf-simple-menu ol-unselectable" + (options.className ? " " + options.className : "");
    }

    /**
     * Set menu items
     * @param {Array<MenuItem>} items Array of menu items 
     */
    setMenu (items = []) {
        this.element.replaceChildren();
        items.forEach(item => {
            const a = document.createElement(item.link ? "a" : "button");
            a.innerHTML = item.text;

            a.className = item.className ? item.className : "";
            if (item.className.includes("fr-icon")) {
                a.classList.add("fr-btn--icon-left");
            }
            a.classList.add("GPFBtn", "fr-btn", "fr-btn--tertiary");

            if (item.link) {
                a.href = "#";
            }
            a.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                item.callback();
                if (item.hide) {
                    setTimeout( () => this.hide(), 300 );
                }
            });
            this.element.appendChild(a);
        });
    }

    /** 
     * Display menu at pixel
     * @param {Array<Number>} coords Coordinates
     */
    show (coords) {
        this.setPosition(coords);
        this.element.style.pointerEvents = "all";
        // Focus on first element
        const a = this.element.querySelector("a, button");
        if (a) {
            a.focus();
        }
    }

    /**
     * Vrai si l'overlay est affiché.
     * 
     * @returns {Boolean} Vrai si la position est définie.
     */
    isShown () {
        return this.get("position") !== undefined;
    }

    /**
     * Hide menu
     */
    hide () {
        this.setPosition();
    }

}


export default SimpleMenu;

// Expose SimpleMenu as ol.interaction.SimpleMenu (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.SimpleMenu = SimpleMenu;
}
