import Control from "ol/control/Control";

// import CSS
import "../../CSS/Controls/ContextMenu/SimpleMenu.css";

/** A simple menu to display on a map
 * @extends {ol.control.Control}
 */
class SimpleMenu extends Control {

    /**
     * Initialize simple menu
     * @param {Object} options Control options
     * 
     */
    constructor (options = {}) {
        super({
            element : document.createElement("ul"),
        });
        this.element.className = "gpf-simple-menu ol-unselectable ol-control" + (options.className ? " " + options.className : "");
        this.element.style.display = "none";
    }

    /**
     * Set menu items
     * @param {Array<Object>} items Array of menu items { text : String, callback : Function, hide : Boolean to hide menu after click }
     */
    setMenu (items = []) {
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
                    setTimeout( () => this.hide() );
                }
            };
            li.appendChild(a);
        });
    }

    /** 
     * Display menu at pixel
     * @param {ol.Pixel} pixel Pixel position
     */
    show (pixel) {
        this.element.style.display = "block";
        const extent = this.getMap().getSize();
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
        this.element.style.pointerEvents = "all";
        // Focus on first element
        const a = this.element.querySelector("a");
        if (a) {
            a.focus();
        }
    }

    /**
     * Hide menu
     */
    hide () {
        this.element.style.display = "none";
    }

}


export default SimpleMenu;

// Expose SimpleMenu as ol.interaction.SimpleMenu (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.SimpleMenu = SimpleMenu;
}
