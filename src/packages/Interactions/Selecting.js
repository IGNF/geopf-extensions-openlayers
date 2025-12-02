import Select from "ol/interaction/Select";

/** Outil de selection et d'interaction avec des features
 * 
 */
class SelectingInteraction extends Select {

    constructor (options) {
        options = options || {};
        // Prevent selecting on empty space
        options.filter = (feature, layer) => {
            return (!!layer);
        };
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
            return (e.type === "click");
        };

        // call parent constructor
        super(options);
    }

}


export default SelectingInteraction;

// Expose SelectingInteraction as ol.interaction.Selecting (for a build bundle)
if (window.ol && window.ol.interaction) {
    window.ol.interaction.Selecting = SelectingInteraction;
}
