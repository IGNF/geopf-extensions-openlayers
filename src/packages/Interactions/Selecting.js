import Select, { SelectEvent } from "ol/interaction/Select";
import { getFlatCoordinates, selectStyle } from "./selectFlatStyle";

import RegularShape from "ol/style/RegularShape";
import Stroke from "ol/style/Stroke";
import MultiPoint from "ol/geom/MultiPoint";

/** Outil de selection et d'interaction avec des features
 * Gestion du double click sur un objet selectione
 * Gestion propre du clear sur une selection (nettoyage de la liste des features et dispatch d'un evenement select)
 * Gestion du style de selection par defaut
 * Dispatch dblclick when double clicking on a selected feature
 * @extends {ol.interaction.Select}
 */
class SelectingInteraction extends Select {

    /** Outil de selection avec gestion du doule click / modify interaction
     * @param {Object} options extend ol/interaction/Select options
     * @param {Function} [options.showPoint] - Function to determine if should diplay points on line style  (default false)
     */
    constructor (options) {
        options = options || {};

        // Prevent selecting on empty space
        options.filter = (feature, layer) => {
            return (!!layer);
        };

        // Default selection style
        if (!options.style) {
            const style = selectStyle("select");
            // Show vertices when modifying
            style[1].setGeometry( f => this._showPoints() ? new MultiPoint(getFlatCoordinates(f)) : null);
            const image = style[0].getImage();
            // Border around icon
            options.style = (f) => {
                style[2].setImage(new RegularShape({
                    points : 4,
                    radius : image.getHeight() / 2 + 2,
                    angle : Math.PI / 4,
                    displacement : [0, image.getHeight() / 2],
                    stroke : new Stroke({ 
                        color : "#33b1ff", 
                        width : 1 
                    })
                }));
                return style;
            };
        }

        // Handle double click on selected feature
        options.condition = function (e) {
            if (e.type === "dblclick") {
                const found = this.selectedAtPixel(e.pixel);
                if (found) {
                    e.feature = found;
                    this.dispatchEvent(e);
                    e.stopPropagation();
                }
            }
            return (e.type === "singleclick");
        };

        // call parent constructor
        super(options);

        // Show points in style function
        if (typeof options.showPoints !== "function") {
            this._showPoints = function () {
                return false;
            };
        } else {
            this._showPoints = options.showPoints;
        }
    }

    /** Show points on selected features (lines and polygons)
     * @param {Function} fn Function to determine if should diplay points on line style
     */
    showPoints (fn) {
        if (typeof fn === "function") {
            this._showPoints = fn;
        }
    }

    /** Chek if a feature is selected at pixel
     * @param {ol.Pixel} pixel Pixel to check
     * @return {Array<Feature>|Boolean} Found features or false
     */
    selectedAtPixel (pixel) {
        const features = [];
        this.getMap()?.forEachFeatureAtPixel(
            pixel,
            (feature) => {
                if (this.getLayer(feature)) {
                    features.push(feature);
                }
            },
            {
                layerFilter : this.layerFilter_,
                hitTolerance : this.hitTolerance_,
            },
        );
        return features.length ? features : false;
    }

    /** Clear interaction properly and remove 
     * Dispatch deselect event
     */
    clear () {
        const features = this.getFeatures().getArray();
        this.getFeatures().clear();
        this.dispatchEvent(new SelectEvent("select", [], features, undefined));
        for (const property in this.featureLayerAssociation_) {
            delete this.featureLayerAssociation_[property];
        }
    }

}


export default SelectingInteraction;

// Expose SelectingInteraction as ol.interaction.Selecting (for a build bundle)
if (window.ol && window.ol.interaction) {
    window.ol.interaction.Selecting = SelectingInteraction;
}
