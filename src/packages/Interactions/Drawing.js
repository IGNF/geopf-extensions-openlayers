// import CSS
import "../CSS/Interactions/Drawing.css";

import Interaction from "ol/interaction/Interaction";
import Draw from "ol/interaction/Draw";
import Style from "ol/style/Style";
import ImageStyle from "ol/style/Image";
import Icon from "ol/style/Icon";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
import CircleStyle from "ol/style/Circle";
import MultiPoint from "ol/geom/MultiPoint";
import coordinate from "ol/coordinate";
import Control from "ol/control/Control";

import mapPinIcon from "../Controls/SearchEngine/map-pin-2-fill.svg";
import VectorSource from "ol/source/Vector";

/** Get all points in coordinates
 * @param {Array<coordinate>} coords
 * @returns {Array<coordinate>}
 * @private
 */
function getFlatCoordinates (coords) {
    if (coords && coords[0].length && coords[0][0].length) {
        var c = [];
        for (var i=0; i<coords.length; i++) {
            c = c.concat(getFlatCoordinates(coords[i]));
        }
        return c;
    } else {
        return coords;
    }
}

/** Show info on map
 * @extends {ol.control.Control}
 * @private
 */
class InfoControl extends Control {

    constructor () {
        const element = document.createElement("div");
        element.className = "ol-drawing-info ol-unselectable ol-control";
        super({
            element : element
        });
    }
    setInfo (text = "") {
        this.element.innerHTML = text;
    }

}

/**
 * Drawing interaction class.
 *
 * @extends {ol.interaction.Interaction}
 */
class DrawingInteraction extends Interaction {

    /**
     * Initialize drawing interaction
     * @param {*} options Openlayers drawing options
     */
    constructor (options) {
        options = options || {};
        super({
            handleEvent : function (e) {
                this.getMap().getTargetElement().style.cursor = this.getActive() ? "crosshair" : "";
                return true;
            }
        });
        this._type = options.type || "Point";
        this.setSource(options.source);

        /** Handle drawing on keydown
         * @param {Event} evt
         */
        const onkeydown = (evt) => {
            if (!this._currentFeature) {
                return;
            }
            switch (evt.key) {
                // Finish drawing on Enter or double click
                case "Enter": {
                    this.draw.finishDrawing();
                    break;
                }
                // Remove last point on Backspace
                case "Backspace": {
                    this.draw.removeLastPoint();
                    break;
                }
            }
        };

        // Info control
        this.info = new InfoControl();

        // Draw interaction
        this.draw = new Draw({
            // source : options.source,
            type : this._type,
            style : (feature, resolution) => this.getStyle(feature, resolution),
        });
        // Draw interaction events
        this.draw.on("drawstart", (e) => {
            this.showInfo("Double-cliquer ou appuyer sur Entrée pour terminer.");
            this._currentFeature = e.feature;
            document.addEventListener("keydown", onkeydown);
            this.dispatchEvent(e);
        });
        this.draw.on(["drawend","drawabort"], (e) => {
            if (e.type === "drawend") {
                const source = this.getSource();
                if (source) {
                    source.addFeature(e.feature);
                }
            }
            this.showInfo(this.getActive() ? "Cliquer pour commencer." : "");
            this._currentFeature = null;
            document.removeEventListener("keydown", onkeydown);
            this.dispatchEvent(e);
        });
    }

    /**
     * Overwrite OpenLayers setMap method
     *
     * @param {Map} map - Map.
     */
    setMap (map) {
        if (this.getMap()) {
            this.getMap().removeInteraction(this.draw);
            this.getMap().removeControl(this.info);
            // reset cursor
            this.getMap().getTargetElement().style.cursor = "";
        }
        super.setMap(map);
        // Additional setup can be done here if needed
        if (map) {
            map.addInteraction(this.draw);
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
     */
    getSource () {
        return this._source || null;
    }

    /** Set interaction active state
     * @param {Boolean} active Active state
     */
    setActive (active) {
        super.setActive(active);
        if (this.draw) {
            this.draw.setActive(active);
            this.showInfo(active ? "Cliquer pour commencer." : "");
        }
        if (this.getMap()) {
            this.getMap().getTargetElement().style.cursor = this.getActive() ? "crosshair" : "";
        }
    }

    /** Get drawing style
     * @returns {ol_style_Style|Array<ol_style_Style>} Style
     */
    getStyle () {
        const stroke = new Stroke({
            color : "#33b1ff",
            width : 2,
        });
        const fill = new Fill({
            color : "rgb(51, 177, 255, 0.2)" 
        });
        const image = this._image || new Icon({
            src : mapPinIcon,
            color : "#000091",
            anchor : [0.5, 1],
        });
        const circle = new CircleStyle({
            stroke : new Stroke({ 
                color : "#fff", 
                width : 2 
            }),
            fill : new Fill({ 
                color : "#33b1ff",
            }),
            radius : 5,
        });

        switch (this._type) {
            case "LineString":
            case "Polygon": {
                return [
                    new Style({
                        image : circle,
                        stroke : stroke,
                        fill : fill,
                    }),
                    new Style({
                        image : circle,
                        geometry : (f) => new MultiPoint( getFlatCoordinates(f.getGeometry().getCoordinates() ) ),
                    })
                ];
            }
            case "Point":
            default: {
                return new Style({
                    image : image,
                    stroke : stroke,
                    fill : fill,
                });
            }
        }
    }

    /** Set an image for drawing points
     * @param {ImageStyle} image Image
     */
    setImage (image) {
        // TODO : allow to set custom image for point drawing
        if (image instanceof ImageStyle) {
            this._image = image;
        }
    }

    /** Get image used for drawing points
     * @returns {ImageStyle} Image
     */
    getImage () {
        return this._image;
    }

    /**
     * Display info message
     * @param {String} info message info
     */
    showInfo (info = "") {
        this.info.setInfo(info);
    }

}


export default DrawingInteraction;

// Expose DrawingInteraction as ol.interaction.Drawing (for a build bundle)
if (window.ol && window.ol.interaction) {
    window.ol.interaction.Drawing = DrawingInteraction;
}
