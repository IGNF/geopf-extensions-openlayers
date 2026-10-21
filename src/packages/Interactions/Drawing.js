// import CSS
import "../CSS/Interactions/Drawing.css";

import Draw from "ol/interaction/Draw.js";
import Select from "ol/interaction/Select";
import { SelectEvent } from "ol/interaction/Select";
import VectorSource from "ol/source/Vector";
import InfoControl from "../Controls/ContextMenu/InfoControl.js";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import Polygon, { fromCircle } from "ol/geom/Polygon";
import Circle from "ol/geom/Circle";
import { selectStyle, defaultStyle } from "./selectStyle.js";
import { skipPartiallyEmittedExpressions } from "typescript";
import { MultiPoint } from "ol/geom";

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
        // Parameters
        options = options || {};
        let type = options.type || "Point";
        let geometryFunction = null;
        let condition, freehandCondition;

        // Special shape handling for Circle and Box
        if (type === "Circle" || type === "Box") {
            type = "Circle";
            // Custom geometry function to create a box or a circle based on the first and last point
            geometryFunction = function (coordinates, geometry, projection) {
                const p0 = coordinates[0];
                const p1 = coordinates[coordinates.length - 1];
                let center = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
                let dx = Math.abs(p0[0] - p1[0]);
                let dy = Math.abs(p0[1] - p1[1]);
                let shapeCoord;
                // Draw a box or a circle 
                if (this._type === "Box") {
                    // From center 
                    if (this._modifiers.ctrlKey) {
                        center = p0;
                        dx *= 2;
                        dy *= 2;
                    }
                    // Square by adjusting dy to dx versa
                    if (this._modifiers.shiftKey) {
                        dy = dx;
                        if (!this._modifiers.ctrlKey) {
                            if (p1[1] > p0[1]) {
                                center[1] = p0[1] + dy / 2;
                            } else {
                                center[1] = p0[1] - dy / 2;
                            }
                        }
                    }
                    // Coords of the box
                    shapeCoord = [[
                        [center[0] - dx / 2, center[1] - dy / 2],
                        [center[0] + dx / 2, center[1] - dy / 2],
                        [center[0] + dx / 2, center[1] + dy / 2],
                        [center[0] - dx / 2, center[1] + dy / 2],
                        [center[0] - dx / 2, center[1] - dy / 2],
                    ]];
                } else if (this._type === "Circle") {
                    let radius;
                    if (this._modifiers.ctrlKey) {
                        radius = Math.sqrt(dx*dx + dy*dy) / 2;
                    } else {
                        center = p0;
                        radius = Math.sqrt(dx*dx + dy*dy);
                    }
                    // Optimize points on the circle
                    const centerPx = this.getMap().getPixelFromCoordinate(center);
                    const pix = this.getMap().getPixelFromCoordinate([center[0] + radius, center[1]]);
                    let dmax = Math.max(100, Math.abs(centerPx[0] - pix[0]), Math.abs(centerPx[1] - pix[1]));
                    dmax = Math.round(dmax / 4);
                    // Round shape
                    const shape = fromCircle(new Circle(center, radius), dmax);
                    shapeCoord = shape.getCoordinates();
                    // Fit to extent (ellipse) if shift key is not pressed
                    if (!this._modifiers.shiftKey) {
                        var scx = Math.abs(center[0] - p1[0]) / radius;
                        var scy = Math.abs(center[1] - p1[1]) / radius;
                        shapeCoord[0].forEach((coord, i) => {
                            coord[0] = center[0] + (coord[0] - center[0]) * scx;
                            coord[1] = center[1] + (coord[1] - center[1]) * scy;
                            shapeCoord[0][i] = coord;
                        });
                    }
                }
                const pt = new Feature(new Point(p0));
                setTimeout(() => {
                    this.getOverlay().getSource().addFeature(pt);
                });
                // Set geometry 
                if (geometry) {
                    geometry.setCoordinates(shapeCoord);
                } else {
                    geometry = new Polygon(shapeCoord);
                }
                return geometry;
            };
            // Prenvent freehand drawing for circle and box
            condition = () => true;
            freehandCondition = () => false;
        }

        // Call parent constructor
        super({
            type : type,
            geometryFunction : geometryFunction,
            condition : condition,
            freehandCondition : freehandCondition,
            // style : (f) => {
            //     return defaultStyle[`${this._type}_${f.get("geometry").getType()}`] || defaultStyle.Point;
            //     // return selectStyle(this._type, f.get("geometry").getType(), options.image);
            // },
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
            if (this.type_ === "Circle") {
                this.showInfo("Cliquer pour terminer - "
                    +" Shift pour faire un " + (this._type === "Circle" ? "cercle." : "carré."));
            } else {
                this.showInfo("Double-cliquer ou appuyer sur Entrée pour terminer.");
            }
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

        this.set("selectOnDrawEnd", !!options.selectOnDrawEnd);

        this.setSelect(options.select);
    }

    /**
     * Retourne l'interaction de sélection
     * @returns {Select} Intéraction de sélection
     */
    getSelect () {
        return this.select;
    }

    /**
     * 
     * @param {Select} [select] Intéraction de sélection
     */
    setSelect (select) {
        this.getSelect() && this.getMap()?.removeInteraction(this.getSelect());
        if (select instanceof Select) {
            this._select = select;
            // prevent double interactions
            this._select.on("change:active", (e) => {
                if (this._select.getActive()) {
                    this.setActive(false);
                }
            });
            // select on draw end
            if (this.get("selectOnDrawEnd")) {
                this.on("drawend", (e) => {
                    setTimeout(() => this.setActive(false), 1);
                    // And activate select interaction
                    setTimeout(() => this._select.setActive(true), 500);
                    // Add to selection
                    this._select.getFeatures().push(e.feature);
                    this._select.dispatchEvent(new SelectEvent("select", [e.feature], [], undefined));
                });
            };
        } else {
            this._select = null;
        }
    }

    // /** Get default style
    //  * @returns {ol.style.Style|Array<ol.style.Style>} Style
    //  */
    // getStyle () {
    //     return selectStyle(this._type);
    // }

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

        // prevent conflict with select interaction
        if (this._select && this.getActive()) {
            // deactivate select interaction
            this._select.setActive(false);
            // Clear selection when drawing is activated
            const features = this._select.getFeatures().getArray();
            if (features.length) {
                // Vérifie si la fonction clear existe
                this._select.clear ? this._select.clear() : this._select.getFeatures().clear();
                // Si ce n'est pas le cas, envoie un événement "select"
                // Sinon l'événement est envoyé par clear()
                this._select.clear ?? this._select.dispatchEvent(new SelectEvent("select", [], features, undefined));
            }
        }

        // Show Crosshair cursor
        if (this.getMap()) {
            this.getMap().getTargetElement().style.cursor = this.getActive() ? "crosshair" : "";
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
        this._modifiers = {
            shiftKey : event.originalEvent.shiftKey,
            ctrlKey : event.originalEvent.ctrlKey,
        };
        // For cursor update
        setTimeout(() => {
            this.getMap().getTargetElement().style.cursor = this.getActive() ? "crosshair" : "";
        });
        return super.handleEvent(event);
    }

}

export default DrawingInteraction;

// Expose DrawingInteraction as ol.interaction.Drawing (for a build bundle)
if (window.ol && window.ol.interaction) {
    window.ol.interaction.Drawing = DrawingInteraction;
}
