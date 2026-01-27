import Modify from "ol/interaction/Modify";
import Menu from "../Controls/ContextMenu/SimpleMenu";
import LonTouch from "./LongTouch.js";

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

        // Long touch interaction
        this.longtouch = new LonTouch({ 
            pixelTolerance : 3, 
            handleLongTouchEvent : (e) => {
                if (this.getActive()) {
                    this._showContextMenu(e, this._isOnPoint(e));
                    this._islongtouch = true;
                }
            }
        });
        this.longtouch.setActive(true);

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
            if (evt.key === "Delete" || evt.key === "Backspace") {
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
                if (deleted.length !== 0) {
                    this.dispatchEvent({ 
                        type : "delete", 
                        deleted : deleted
                    });
                }
            }
            if ((evt.key === "c" || evt.key === "x") && (evt.ctrlKey  || evt.metaKey)) {
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
                if (copyFeatures.length !== 0) {
                    this.dispatchEvent({ 
                        type : (evt.key === "x") ? "cut" : "copy", 
                        features : copyFeatures,
                    });
                }
            }
            if (evt.key === "v" && (evt.ctrlKey || evt.metaKey) && copyFeatures.length !== 0) {
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
            this.getMap().removeInteraction(this.longtouch);
        } 
        super.setMap(map);
        if (map) {
            map.addControl(this._menu);
            this.getMap().getTargetElement().setAttribute("tabindex", "0");
            this.getMap().getTargetElement().addEventListener("keyup", this._onKeyUp);
            this.getMap().addInteraction(this.longtouch);
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
        // On a point && adding point
        let isPoint = this._isOnPoint(e);
        const isAdd = !!this.vertexFeature_;

        // Handle parent events
        const resp = super.handleEvent(e, isPoint);

        // Handle context menu
        if (this._islongtouch) {
            if (e.type === "singleclick") {
                setTimeout(() => {
                    this._islongtouch = false;
                });
                return;
            } else if (e.type === "click" || e.type === "pointerup") {
                return;
            }
        }
        if (e.type === "contextmenu") {
            e.originalEvent.preventDefault();
        } else if (e.type === "pointerup" && e.originalEvent.button === 2) {
            e.originalEvent.preventDefault();
            this._showContextMenu(e, isPoint);
        } else if (e.type !== "pointermove") {
            if (e.originalEvent.target === this.getMap().getTargetElement()) {
                setTimeout(() => this._menu.hide() );
            }
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

    _showContextMenu (e, isPoint) {
        const currentFeatures = this.selectedAtPixel(e.pixel);

        // TODO : Check if can remove point
        let canRemove = false;
        if (isPoint) {
            const position = isPoint.getGeometry().getCoordinates();

            isPoint = false;
            (currentFeatures || []).forEach(f => {
                // Check if current point is a vertex
                const getFlatCoordinates = f.getGeometry().getFlatCoordinates();
                for (let i=0; i<getFlatCoordinates.length; i+=2) {
                    if (getFlatCoordinates[i] === position[0] && getFlatCoordinates[i+1] === position[1]) {
                        isPoint = true;
                        break;
                    }
                };
                // Check if can remove vertex
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
                        canRemove = true;
                        console.log("todo");
                    }
                    default: {
                        break;
                    }
                }
            });
        }

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
            if (e.stopPropagation) {
                e.stopPropagation();
            }
        } else if (this._select && currentFeatures) {
            this._menu.setMenu([
                {
                    text : "Dupliquer",
                    callback : () => {
                        const features = this._select.getFeatures().getArray().slice();
                        const sel = [];
                        const tab = [];
                        features.forEach(f => {
                            const layer = this._select.getLayer(f);
                            if (layer) {
                                // Restore style before cloning
                                this._select.restorePreviousStyle_(f);
                                const f2 = f.clone();
                                // Reapply selected style
                                this._select.applySelectedStyle_(f);
                                // Add cloned feature
                                layer.getSource().addFeature(f2);
                                sel.push(f2);
                                tab.push({
                                    feature : f2,
                                    layer : layer
                                });
                            } else {
                                sel.push(f);
                            }
                        });
                        this._select.clear();
                        sel.forEach(f => this._select.getFeatures().push(f));
                        if (tab.length) {
                            this.dispatchEvent({ 
                                type : "duplicate", 
                                features : tab
                            });
                        }
                    },
                    hide : true
                },{
                    text : "Supprimer",
                    callback : () => {
                        const deleted = [];
                        this._select.getFeatures().forEach( f => {
                            deleted.push({
                                feature : f,
                                layer : this._select.getLayer(f)
                            });
                        });
                        this.deleteSelection();
                        if (deleted.length !== 0) {
                            this.dispatchEvent({ 
                                type : "delete", 
                                deleted : deleted
                            });
                        }
                    },
                    hide : true
                },
            ]);
            this._menu.show(e.pixel);
            if (e.stopPropagation) {
                e.stopPropagation();
            }
        } else {
            this._menu.hide();
        }
    }

    _isOnPoint (e) {
        // 3 pixels tolerance
        const res = this.get("hitTolerance") * this.getMap().getView().getResolution();
        const extent = [e.coordinate[0] - res, e.coordinate[1] - res, e.coordinate[0] + res, e.coordinate[1] + res];
        // On a point && adding point
        return this.getOverlay().getSource().getFeaturesInExtent(extent)[0];
    }

}

export default ModifyingInteraction;

// Expose ModifyingInteraction as ol.interaction.Modifying (for a build bundle)
if (window.ol && window.ol.interaction) {
    window.ol.interaction.Modifying = ModifyingInteraction;
}
