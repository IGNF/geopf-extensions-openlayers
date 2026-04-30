import Control from "ol/control/Control";

import "../../CSS/Controls/ContextMenu/InfoControl.css";

/** Show info on map
 * @extends {ol.control.Control}
 * @private
 */
class InfoControl extends Control {

    /** Initialize control
     */
    constructor () {
        const element = document.createElement("div");
        element.className = "ol-drawing-info ol-unselectable ol-control";
        super({
            element : element
        });
    }

    /** Show info on the map
     * @param {String} text Text to show
     */
    setInfo (text = "") {
        this.element.innerHTML = text;
    }

}

export default InfoControl;

// Expose InfoControl as ol.control.InfoControl (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.Info = InfoControl;
}