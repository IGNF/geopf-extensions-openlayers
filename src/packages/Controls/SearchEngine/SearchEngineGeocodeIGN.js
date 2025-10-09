// import CSS
import "../../CSS/Controls/SearchEngine/GPFsearchEngine.css";
import Logger from "../../Utils/LoggerByDefault";
import SearchEngineBase from "./SearchEngineBase";
import { AbstractSearchService, IGNSearchService } from "./Service";
import { Vector } from "ol/layer";
import VectorSource from "ol/source/Vector";

import { Style, Icon, Stroke, Fill } from "ol/style";
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

        return this;
    }

    setMap (map) {
        super.setMap(map);
        if (map) {            
            map.addLayer(this.extent);
            map.addLayer(this.layer);
        }
    }

    initialize (options) {
        /**
         * Nom de la classe (heritage)
         * @private
        */
        this.CLASSNAME = "SearchEngineGeocodeIGN";
        super.initialize(options);
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
            window.layer = this.layer;
            window.feature = e.result;
            window.featureImage = this.layer.getStyle()(e.result);
            console.log(e.result, e.result.getGeometry(), e.result.getGeometry().getCoordinates());
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

}

export default SearchEngineGeocodeIGN;

// Expose SearchEngine as ol.control.SearchEngine (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.SearchEngineGeocodeIGN = SearchEngineGeocodeIGN;
}
