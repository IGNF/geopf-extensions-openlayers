import Select from "ol/interaction/Select";
import ModifyingInteraction from "./Modifying.js";
import { defaultStyle, selectStyle } from "./selectStyle";

/** Outil de selection et d'interaction avec des features
 * 
 */
class SelectingInteraction extends Select {

    /** Outil de selection avec gestion du doule click / modify interaction
     * @param {Object} options option de ol/interaction/Select
     */
    constructor (options) {
        options = options || {};
        // Prevent selecting on empty space
        options.filter = (feature, layer) => {
            return (!!layer);
        };
        options.style = selectStyle();

        // Handle double click on selected feature
        options.condition = function (e) {
            if (e.type === "dblclick") {
                let found = false;
                map.forEachFeatureAtPixel(
                    e.pixel,
                    (feature, layer) => {
                        if (this.getLayer(feature)) {
                            found = feature;
                        }
                        return (!found);
                    },
                    {
                        layerFilter : this.layerFilter_,
                        hitTolerance : this.hitTolerance_,
                    },
                );
                if (found) {
                    e.feature = found;
                    this.dispatchEvent(e);
                    e.stopPropagation();
                }
            }
            return (e.type === "singleclick");
            // return (e.type === "click");
        };

        // call parent constructor
        super(options);

        this._modify = new ModifyingInteraction({
            select : this,
        });
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
        this._modify.setActive(this.getActive());
    }

    /** Set interaction active state
     * @param {Boolean} active Active state
     */
    setActive (active) {
        super.setActive(active);
        if (this._modify) {
            this._modify.setActive(active);
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
