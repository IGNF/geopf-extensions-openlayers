import Modify from "ol/interaction/Modify";
import Menu from "../Controls/ContextMenu/SimpleMenu";

import { selectStyle } from "./selectFlatStyle";

/** Modifying interaction 
 * @extends {ol.interaction.Modify}
 * @events delete, cut, copy, paste
 */
class ModifyingInteraction extends Modify {

    /**
     * Initialize modifying interaction
     * @param {*} options extend Openlayers modifying options 
     * @param {ol.interaction.Select} [options.select] - Selecting interaction linked to modifying interaction
     * @param {Function} [options.modifyCondition] - Function to determine if modifying interaction should be activated
     * @param {Number} [options.hitTolerance] - hitTolerance of point vertices (default 3)
     */
    constructor (options) {
        options = options || {};
        if (!options.style) {
            options.style = selectStyle();
        }

        // Use features from select interaction if provided
        options.features = options.select ? options.select.getFeatures() : options.features;

        super(options);

        this._menu = new Menu();
        this._select = options.select;

        // Activate modify interaction on select event
        this._modifyCondition = options.modifyCondition || (e => true);
        this._select.on("select", (e) => {
            this.setActive(this._modifyCondition({ type : "activate" }));
        });
        // refresh style
        this.on("change:active", (e) => {
            this._select.getFeatures().forEach( f => {
                f.changed();
            });
        });

        // Activate on select activation change
        this._select.on("change:active", (e) => {
            if (this._select.getActive()) {
                this.setActive(this._modifyCondition({ type : "activate" }));
            } else {
                this.setActive(false);
            }
        });

        this._select.on("dblclick", (e) => {
            this.setActive(this._modifyCondition(e));
        });

        this.set("hitTolerance", options.hitTolerance || this._select.hitTolerance_ || 2);


        let copyFeatures = [];
        // Do something on keyup (delete features)
        this._onKeyUp = (evt) => {
            if (!this.getActive()) {
                return;
            }
            // Ignore if focused on input
            if (evt.target.tagName === "INPUT" || evt.target.tagName === "TEXTAREA" || evt.target.isContentEditable) {
                return;
            }
            // Handle key
            if (evt.key === "Delete") {
                // get deleted features
                const deleted = [];
                this._select.getFeatures().forEach( f => {
                    deleted.push({
                        feature : f,
                        layer : this._select.getLayer(f)
                    });
                });
                // Delete features
                this.deleteSelection();
                // To notify others
                this.dispatchEvent({ 
                    type : "delete", 
                    deleted : deleted
                });
            }
            if ((evt.key === "c" || evt.key === "x") && evt.ctrlKey) {
                // Get Features to copy/cut
                copyFeatures = [];
                this._select.getFeatures().forEach( f => {
                    // Restore style for clonning
                    this._select.restorePreviousStyle_(f);
                    copyFeatures.push({
                        feature : f.clone(),
                        layer : this._select.getLayer(f)
                    });
                    // Reapply selected style
                    this._select.applySelectedStyle_(f);
                });
                // Clear selection
                if (evt.key === "x") {
                    // Delete features
                    this.deleteSelection();
                } 
                // Dispatch copy/cut event
                this.dispatchEvent({ 
                    type : (evt.key === "x") ? "cut" : "copy", 
                    features : copyFeatures,
                });
            }
            if (evt.key === "v" && evt.ctrlKey) {
                this.dispatchEvent({ 
                    type : "paste", 
                    features : copyFeatures
                });
            }
        };
    }

    
    /** Chek if a feature is selected at pixel
     * @param {ol.Pixel} pixel Pixel to check
     * @return {Array<Feature>|Boolean} Found feature or false
     */
    selectedAtPixel (pixel) {
        const features = [];
        this.getMap()?.forEachFeatureAtPixel(
            pixel,
            (feature) => {
                if (this._select.getLayer(feature)) {
                    features.push(feature);
                }
            },
            {
                layerFilter : this._select.layerFilter_,
                hitTolerance : this._select.hitTolerance_,
            },
        );
        return features.length ? features : false;
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
            this.getMap().getTargetElement().setAttribute("tabindex", "0");
            this.getMap().getTargetElement().addEventListener("keyup", this._onKeyUp);
        }
        this._menu.hide();
    }

    /** Delete selected features */
    deleteSelection () {
        this._select.getFeatures().forEach(f => {
            const layer = this._select.getLayer(f);
            if (layer) {
                const source = layer.getSource();
                source.removeFeature(f);
            }
        });
        this._select.clear();
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
        // 3 pixels tolerance
        const res = this.get("hitTolerance") * this.getMap().getView().getResolution();
        const extent = [e.coordinate[0] - res, e.coordinate[1] - res, e.coordinate[0] + res, e.coordinate[1] + res];
        // On a point && adding point
        const isPoint = this.getOverlay().getSource().getFeaturesInExtent(extent).length;
        const isAdd = !!this.vertexFeature_;

        // Handle parent events
        const resp = super.handleEvent(e);

        // Handle context menu
        if (e.type === "contextmenu") {
            e.originalEvent.preventDefault();
        } else if (e.type === "pointerup" && e.originalEvent.button === 2) {
            e.originalEvent.preventDefault();
            const currentFeatures = this.selectedAtPixel(e.pixel);

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
                            this.deleteSelection();
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
