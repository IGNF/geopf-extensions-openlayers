// import CSS
import { Select } from "ol/interaction";
import "../../CSS/Controls/SearchEngine/GPFsearchEngine.css";
import Logger from "../../Utils/LoggerByDefault";
import SearchEngineBase from "./SearchEngineBase";
import { AbstractSearchService, IGNSearchService } from "./Service";
import { Vector } from "ol/layer";
import VectorSource from "ol/source/Vector";

import { Style, Icon, Stroke, Fill } from "ol/style";
import Overlay from "ol/Overlay.js";
import checkDsfr from "../Utils/CheckDsfr";
const color = "rgba(0, 0, 145, 1)";

const createStyle = (feature) => {
    const geometryType = feature.getGeometry().getType();

    switch (geometryType) {
        case "Point":
        case "MultiPoint":
            return new Style({
                image : new Icon({
                    src : "/src/packages/Controls/SearchEngine/map-pin-2-fill.svg",
                    color : [0, 0, 145, 1],
                }),
            });

        case "LineString":
        case "MultiLineString":
            return new Style({
                stroke : new Stroke({
                    color : color,
                    width : 3,
                }),
            });

        case "Polygon":
        case "MultiPolygon":
            return new Style({
                stroke : new Stroke({
                    color : color,
                    lineDash : [8, 8], 
                    width : 2,
                }),
                fill : new Fill({
                    color : "rgba(0, 0, 0, 0.1)",
                    opacity : 0.8
                }),
            });

        default:
            return new Style();
    }
};

var logger = Logger.getLogger("searchengine");


/**
 * @classdesc
 * SearchEngine Base control
 *
 * @alias ol.control.SearchEngineGeocodeIGN
 * @module SearchEngine
*/
class SearchEngineGeocodeIGN extends SearchEngineBase {

    constructor (options) {
        options = options || {};

        // Gère le service
        if (!options.searchService || !(options.searchService instanceof AbstractSearchService)) {
            options.searchService = new IGNSearchService(options.serviceOptions);
        }

        // call ol.control.Control constructor
        super(options);

        this.layer = new Vector({
            source : new VectorSource({}),
            zIndex : Infinity,
            style : createStyle,
        });
        this.extent = new Vector({
            source : new VectorSource({}),
            zIndex : Infinity,
            style : createStyle,
        });

        this.selectInteraction = new Select({
            layers : [this.layer, this.extent],
            style : createStyle,
        });

        this.selectInteraction.on("select", this._onSelectElement.bind(this));

        this.popup = this._createPopup();

        return this;
    }

    /**
     * Fonction appellée lors de l'ajout du contrôle à une carte
     * @override
     * @param {import("ol/Map.js").default|null} map Map
     */
    setMap (map) {
        super.setMap(map);
        if (map) {            
            map.addLayer(this.extent);
            map.addLayer(this.layer);

            map.addInteraction(this.selectInteraction);
            map.addOverlay(this.popup);
        }
    }

    initialize (options) {
        /**
         * Nom de la classe (heritage)
         * @private
        */
        this.CLASSNAME = "SearchEngineGeocodeIGN";
        super.initialize(options);
        this.REMOVE_FEATURE_EVENT = "remove:feature";
    }

    _initEvents (options) {
        super._initEvents(options);
        this.on("search", this.addResultToMap);
    }

    addResultToMap (e) {
        this.layer.getSource().clear();
        this.extent.getSource().clear();
        let extent, zoom;
        if (e.result !== null) {
            this.layer.getSource().addFeature(e.result);
            extent = e.result.getGeometry().getExtent();
            zoom = 15;
        }
        if (e.extent !== null) {
            this.extent.getSource().addFeature(e.extent);
            extent = e.extent.getGeometry().getExtent();
        }
        if (this.getMap()) {
            let view = this.getMap().getView();
            if (extent) {
                view.fit(extent);
                view.getZoom();
                if (view.getZoom() > 15) {
                    view.setZoom(15);
                }
            }
        }
    }


    /**
     * 
     * @param {import("ol/interaction/Select").SelectEvent} e Événement de séléction
     */
    _onSelectElement (e) {
        const position = e.mapBrowserEvent.coordinate;
        if (e.selected.length) {
            // Ajoute le popup
            const feature = e.selected[0];
            this.popup.setPosition(position);
            this.setPopupContent(feature.get("infoPopup"));
            this.popup.set("feature", feature);
            this.popup.set("layer", e.target.getLayer(feature));
        } else {
            this.popup.setPosition(undefined);
            this.setPopupContent("");
            this.popup.unset("feature");
            this.popup.unset("layer");
        }
    }

    _createPopup () {
        // Popup global
        let element = this._popupDiv = document.createElement("div");
        // TODO : ajouter gp-feature-info-div lorsque les deux seront pareils
        element.className = "GPSearchPopup";

        // Contenu du popup
        let popupContent = this._popupContent = document.createElement("div");
        popupContent.className = "GPPopupContent";

        // Groupe de boutons
        let popupBtns = this._popupBtns = document.createElement("div");
        popupBtns.className = "GPButtonGroups gpf-btns-group";

        popupBtns.appendChild(this._addCloseButton());
        popupBtns.appendChild(this._addRemoveButton());

        element.appendChild(popupContent);
        element.appendChild(popupBtns);

        const overlay = new Overlay({
            element : element,
            positioning : "bottom-center",
        });

        return overlay;
    }

    setPopupContent (content) {
        this._popupContent.innerHTML = content;
    }

    _addCloseButton () {
        let closer = document.createElement("button");
        closer.title = closer.ariaLabel = "Fermer la pop-up";
        closer.textContent = "Fermer";
        closer.className = "GPButton gpf-btn fr-icon-close-line fr-btn fr-btn--sm gpf-btn--tertiary  fr-btn--tertiary-no-outline";

        // Ferme le popup
        closer.onclick = this._closePopup.bind(this);
        return closer;
    }

    _closePopup () {
        this.selectInteraction.getFeatures().clear();
        if (this.popup != null) {
            this.popup.setPosition(undefined);
        }
        return false;
    }

    _addRemoveButton () {
        let remove = document.createElement("button");
        remove.title = remove.ariaLabel = "Supprimer le marqueur";
        remove.textContent = "Supprimer";
        remove.className = "GPButton gpf-btn fr-icon-delete-line fr-btn fr-btn--sm gpf-btn--tertiary fr-btn--tertiary-no-outline";

        // Supprime la feature
        remove.onclick = this._removeFeature.bind(this);

        return remove;
    }

    _removeFeature () {
        const f = this.popup.get("feature");
        const layer = this.popup.get("layer");
        // Supprime la feature
        if (layer && f) {
            layer.getSource().removeFeature(f);

            this.dispatchEvent({
                type : this.REMOVE_FEATURE_EVENT,
                feature : f,
                layer : layer,
            });

            // Ferme le popup
            this._closePopup();
        }
    }

}

export default SearchEngineGeocodeIGN;

// Expose SearchEngine as ol.control.SearchEngine (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.SearchEngineGeocodeIGN = SearchEngineGeocodeIGN;
}
