import Modify from "ol/interaction/Modify";
import Menu from "../Controls/ContextMenu/SimpleMenu";

import { selectStyle } from "./selectStyle";

/** Modifying interaction 
 * @extends {ol.interaction.Modify}
 */
class ModifyingInteraction extends Modify {

    /**
     * Initialize modifying interaction
     * @param {*} options extend Openlayers modifying options 
     */
    constructor (options) {
        options = options || {};
        options.style = selectStyle();
        options.features = options.select ? options.select.getFeatures() : options.features;

        super(options);

        this._menu = new Menu();
        this._select = options.select;
    }

    /**
     * Overwrite OpenLayers setMap method
     *
     * @param {Map} map - Map.
     */
    setMap (map) {
        if (this.getMap()) {
            this.getMap().removeControl(this._menu);
        } 
        super.setMap(map);
        if (map) {
            map.addControl(this._menu);
        }
        this._menu.hide();
    }

    /**
     * Overwrite OpenLayers setActive method / hide menu
     *
     * @param {Boolean} active Active state
     */
    setActive (active) {
        super.setActive(active);
        if (this._menu) {
            this._menu.hide();
        }
    }

    /** Overwrite OpenLayers Handle event on the map
     * @param {ol.MapBrowserEvent} e Event
     * @returns {Boolean} Whether to propagate the event further
     */
    handleEvent (e) {
        const isPoint = this.getOverlay().getSource().getFeaturesAtCoordinate(e.coordinate).length;
        const resp = super.handleEvent(e);
        const isAdd = !!this.vertexFeature_;

        if (e.type === "contextmenu") {
            e.originalEvent.preventDefault();
            const currentFeatures = this._select.selectedAtPixel(e.pixel);

            // TODO : Check if can remove point
            let canRemove = false;
            (currentFeatures || []).forEach(f => {
                switch (f.getGeometry().getType()) {
                    case "LineString": {
                        if (f.getGeometry().getCoordinates().length > 2 ) {
                            canRemove = true;
                        }
                        break;
                    }
                    case "Polygon": {
                        const geom = f.getGeometry().getCoordinates();
                        geom.forEach(ring => {
                            if (ring.length > 4 ) {
                                canRemove = true;
                            }
                        });
                        break;
                    }
                    case "MultiLineString":
                    case "MultiPolygon": {
                        console.log("todo");
                    }
                    default: {
                        break;
                    }
                }
            });

            // Show menu
            if (isPoint && canRemove) {
                this._menu.setMenu([
                    {
                        text : "Supprimer le point",
                        callback : () => {
                            this.removePoint(e.coordinate);
                        },
                        hide : true
                    },
                ]);
                this._menu.show(e.pixel);
                e.stopPropagation();
            } else if (this._select && currentFeatures) {
                this._menu.setMenu([
                    {
                        text : "Dupliquer",
                        callback : () => {
                            const features = this._select.getFeatures().getArray().slice();
                            this._select.getFeatures().clear();
                            const sel = [];
                            features.forEach(f => {
                                const layer = this._select.getLayer(f);
                                if (layer) {
                                    const source = layer.getSource();
                                    const f2 = f.clone();
                                    source.addFeature(f2);
                                    sel.push(f2);
                                } else {
                                    sel.push(f);
                                }
                            });
                            this._select.clear();
                            sel.forEach(f => this._select.getFeatures().push(f));
                        },
                        hide : true
                    },{
                        text : "Supprimer",
                        callback : () => {
                            console.log("supprimer features", this._select.getFeatures());
                            this._select.getFeatures().forEach(f => {
                                const layer = this._select.getLayer(f);
                                if (layer) {
                                    const source = layer.getSource();
                                    source.removeFeature(f);
                                }
                            });
                            this._select.clear();
                        },
                        hide : true
                    },
                ]);
                this._menu.show(e.pixel);
                e.stopPropagation();
            } else {
                this._menu.hide();
            }
        } else if (e.type !== "pointermove") {
            // TODO : améliorer pour linux (pointerup et pas pointermove)
            this._menu.hide();
        }
        // Dragging feature : show crosshair cursor
        if (e.type==="pointerdrag" && isAdd) { 
            e.map.getTargetElement().style.cursor = "crosshair";
            return resp;
        }
        // Handle hover effect
        if (isPoint) {
            if (e.originalEvent.altKey) {
                this.getMap().getTargetElement().style.cursor = "alias";
            } else {
                this.getMap().getTargetElement().style.cursor = "pointer";
            }
        } else if (isAdd) {
            this.getMap().getTargetElement().style.cursor = "copy";
        } else {
            this.getMap().getTargetElement().style.cursor = "";
        }
        return resp;
    }

}

export default ModifyingInteraction;

// Expose ModifyingInteraction as ol.interaction.Modifying (for a build bundle)
if (window.ol && window.ol.interaction) {
    window.ol.interaction.Modifying = ModifyingInteraction;
}
