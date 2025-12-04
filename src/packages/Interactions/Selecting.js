import Select from "ol/interaction/Select";
import ModifyingInteraction from "./Modifying.js";
import { getFlatCoordinates, selectStyle } from "./selectStyle";
import RegularShape from "ol/style/RegularShape";
import Stroke from "ol/style/Stroke";
import MultiPoint from "ol/geom/MultiPoint";

/** Outil de selection et d'interaction avec des features
 * 
 */
class SelectingInteraction extends Select {

    /** Outil de selection avec gestion du doule click / modify interaction
     * @param {Object} options extend ol/interaction/Select options
     * @param {Function} [options.modifyCondition] - Function to determine if modify interaction is active  (default always true)
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
            style[1].setGeometry( f => this._modify.getActive() ? new MultiPoint(getFlatCoordinates(f)) : null);
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
                    this._modify.setActive(this._modifyCondition(e));
                }
            }
            return (e.type === "singleclick");
        };

        // call parent constructor
        super(options);

        this._modify = new ModifyingInteraction({
            select : this,
        });

        // Modify condition
        this._modifyCondition = options.modifyCondition || (e => true);

        // Check modify condition on select event
        this.on("select", (e) => {
            this._modify.setActive(this._modifyCondition({ type : "activate" }));
        });
        // refresh style
        this._modify.on("change:active", (e) => {
            this.getFeatures().forEach( f => {
                f.changed();
            });
        });
    }

    /** Chek if a feature is selected at pixel
     * @param {ol.Pixel} pixel Pixel to check
     * @return {Array<Feature>|Boolean} Found feature or false
     */
    selectedAtPixel (pixel) {
        const features = [];
        map.forEachFeatureAtPixel(
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

    clear () {
        this.getFeatures().clear();
        for (const property in this.featureLayerAssociation_) {
            delete this.featureLayerAssociation_[property];
        }
    }

    /**
     * Overwrite OpenLayers setMap method
     *
     * @param {Map} map - Map.
     */
    setMap (map) {
        if (this.getMap()) {
            this.getMap().removeInteraction(this._modify);
        }
        super.setMap(map);
        if (map) {
            map.addInteraction(this._modify);
        }
        this._modify.setActive(this.getActive() && this._modifyCondition({type : "activate"}));
    }

    /** Set interaction active state
     * @param {Boolean} active Active state
     */
    setActive (active) {
        super.setActive(active);
        if (this._modify) {
            this._modify.setActive(active && this._modifyCondition({type : "activate"}));
        }
    }

    /** Get internal modification intercation
     * @return {Modify} modify interaction
     */
    getModifyInteraction () {
        return this._modify;
    }

}


export default SelectingInteraction;

// Expose SelectingInteraction as ol.interaction.Selecting (for a build bundle)
if (window.ol && window.ol.interaction) {
    window.ol.interaction.Selecting = SelectingInteraction;
}
