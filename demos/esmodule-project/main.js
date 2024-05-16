import "./style.css";
import {Map, View} from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

import {
    Drawing,
    Isocurve,
    Route,
    LayerImport,
    GeoportalAttribution,
    ElevationPath,
    MeasureArea,
    MeasureAzimuth,
    MeasureLength,
    LayerSwitcher,
    MousePosition as GeoportalMousePosition,
    ReverseGeocode,
    SearchEngine,
    GetFeatureInfo,
    CRS
} from "geoportal-extensions-openlayers";

CRS.load();

const map = new Map({
    target : "map",
    layers : [
        new TileLayer({
            source : new OSM()
        })
    ],
    view : new View({
        center : [288074.8449901076, 6247982.515792289],
        zoom : 8,
    })
});

var drawing = new Drawing({
    position : "bottom-right"
});
map.addControl(drawing);

var iso = new Isocurve({
    position : "bottom-left"
});
map.addControl(iso);

var layerImport = new LayerImport({
    position : "bottom-left"
});
map.addControl(layerImport);

var layerSwitcher = new LayerSwitcher({
    options : {
        position : "top-right"
    }
});
map.addControl(layerSwitcher);

var mp = new GeoportalMousePosition({
    position : "top-right"
});
map.addControl(mp);

var route = new Route({
    position : "top-right"
});
map.addControl(route);

var reverse = new ReverseGeocode({
    position : "top-right"
});
map.addControl(reverse);

var search = new SearchEngine({
    position : "top-right"
});
map.addControl(search);

var feature = new GetFeatureInfo({
    options : {
        position : "top-right"
    }
});
map.addControl(feature);

var measureLength = new MeasureLength({
    position : "bottom-left"
});
map.addControl(measureLength);

var measureArea = new MeasureArea({
    position : "bottom-left"
});
map.addControl(measureArea);

var measureAzimuth = new MeasureAzimuth({
    position : "bottom-left"
});
map.addControl(measureAzimuth);

var measureProfil = new ElevationPath({
    position : "bottom-left"
});
map.addControl(measureProfil);

var attributions = new GeoportalAttribution();
map.addControl(attributions);
