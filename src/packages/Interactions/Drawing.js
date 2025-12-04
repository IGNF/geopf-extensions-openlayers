// import CSS
import "../CSS/Interactions/Drawing.css";

import Draw from "ol/interaction/Draw";
import Select from "ol/interaction/Select";
import VectorSource from "ol/source/Vector";
import InfoControl from "../Controls/ContextMenu/InfoControl.js";

import { selectStyle, defaultStyle } from "./selectStyle.js";


/**
 * Drawing interaction class.
 *
 * @extends {ol.interaction.Interaction}
 */
class DrawingInteraction extends Draw {

    /**
     * Initialize drawing interaction
     * @param {*} options extend Openlayers drawing options
     * @param {Select} [options.select] - Select interaction to associate with drawing (default null)
     * @param {Boolean} [options.selectOnDrawEnd] - If true, select the feature on draw end (default false)
     */
    constructor (options) {
        options = options || {};
        super({
            type : options.type || "Point",
            style : (f) => {
                return defaultStyle[`${this._type}_${f.get("geometry").getType()}`] || defaultStyle.Point;
                return selectStyle(this._type, f.get("geometry").getType(), options.image);
            },
        });
        this._type = options.type || "Point";
        this.setSource(options.source);

        /** Handle drawing on keydown
         * @param { Event } evt Keyboard event
         */
        const onkeydown = (evt) => {
            switch (evt.key) {
                // Finish drawing on Enter or double click
                case "Enter": {
                    this.finishDrawing();
                    break;
                }
                // Remove last point on Backspace
                case "Backspace": {
                    this.removeLastPoint();
                    break;
                }
            }
        };

        // Info control
        this.info = new InfoControl();

        // Draw interaction events
        this.on("drawstart", (e) => {
            this.showInfo("Double-cliquer ou appuyer sur Entrée pour terminer.");
            document.addEventListener("keydown", onkeydown);
        });
        this.on(["drawend","drawabort"], (e) => {
            // Add feature to source on draw end
            if (e.type === "drawend") {
                const source = this.getSource();
                if (source) {
                    source.addFeature(e.feature);
                }
            }
            // Start a new drawing
            this.showInfo(this.getActive() ? "Cliquer pour commencer." : "");
            document.removeEventListener("keydown", onkeydown);
        });

        // Associate a select interaction
        if (options.select instanceof Select) {
            this._select = options.select;
            // prevent douible interactions
            this._select.on("change:active", (e) => {
                if (this._select.getActive()) {
                    this.setActive(false);
                }
            });
            // select on draw end
            if (options.selectOnDrawEnd) {
                this.on("drawend", (e) => {
                    // And activate select interaction
                    setTimeout(() => this._select.setActive(true));
                    // Add to selection
                    this._select.getFeatures().push(e.feature);
                });
            };
        }
    }

    /** Get default style
     * @returns {ol.style.Style|Array<ol.style.Style>} Style
     */
    getStyle () {
        return selectStyle(this._type);
    }

    /**
     * Overwrite OpenLayers setMap method
     *
     * @param {Map} map - Map.
     */
    setMap (map) {
        if (this.getMap()) {
            this.getMap().removeControl(this.info);
            // reset cursor
            this.getMap().getTargetElement().style.cursor = "";
        }
        super.setMap(map);
        // Additional setup can be done here if needed
        if (map) {
            map.addControl(this.info);
        }
        this.setActive(this.getActive());
    }

    /** Change the source to collect features
     * @param {VectorSource} source Vector source
     */
    setSource (source) {
        this._source = source || null;
    }

    /** The source to collect features
     * @param {VectorSource} source Vector source
     * @returns {VectorSource} Vector source
     */
    getSource () {
        return this._source || null;
    }

    /** Set interaction active state
     * @param {Boolean} active Active state
     */
    setActive (active) {
        super.setActive(active);
        this.showInfo(active ? "Cliquer pour commencer." : "");

        if (this.getMap()) {
            this.getMap().getTargetElement().style.cursor = this.getActive() ? "crosshair" : "";
        }
        // prevent conflict with select interaction
        if (this._select && this.getActive()) {
            // deactivate select interaction
            this._select.setActive(false);
            // Clear selection when drawing is activated
            this._select.clear();
        }
    }

    /**
     * Display info message
     * @param {String} info message info
     */
    showInfo (info = "") {
        if (this.info) {
            this.info.setInfo(info);
        }
    }

    /** Overwrite OpenLayers Handle event on the map
     * @param {ol.MapBrowserEvent} event Event
     * @returns {Boolean} Whether to propagate the event further
     */
    handleEvent (event) {
        this.getMap().getTargetElement().style.cursor = this.getActive() ? "crosshair" : "";
        return super.handleEvent(event);
    }

}

export default DrawingInteraction;

// Expose DrawingInteraction as ol.interaction.Drawing (for a build bundle)
if (window.ol && window.ol.interaction) {
    window.ol.interaction.Drawing = DrawingInteraction;
}
