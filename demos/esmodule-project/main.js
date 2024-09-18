import "./style.css";
import {
    Map,
    View
} from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

import {
    Catalog,
    CRS,
    Drawing,
    ElevationPath,
    GetFeatureInfo,
    GeoportalAttribution,
    GeoportalFullScreen,
    GeoportalOverviewMap,
    GeoportalZoom,
    Isocurve,
    MeasureArea,
    MeasureAzimuth,
    MeasureLength,
    MousePosition as GeoportalMousePosition,
    LayerImport,
    LayerMapBox as GeoportalLayerMapBox,
    LayerWMTS as GeoportalLayerWMTS,
    LayerSwitcher,
    Legends,
    ReverseGeocode,
    Route,
    SearchEngine,
} from "geopf-extensions-openlayers";

import Gp from "geoportal-access-lib";

var cfg = new Gp.Services.Config({
    customConfigFile : "https://raw.githubusercontent.com/IGNF/geoportal-configuration/new-url/dist/fullConfig.json",
    onSuccess : () => {
        CRS.load();

        const map = new Map({
            target : "map",
            layers : [
                new TileLayer({
                    source : new OSM()
                }),
                new GeoportalLayerMapBox({
                    layer : "PLAN.IGN"
                }),
                new GeoportalLayerWMTS({
                    layer : "ORTHOIMAGERY.ORTHOPHOTOS"
                })
            ],
            view : new View({
                center : [288074.8449901076, 6247982.515792289],
                zoom : 8,
            })
        });
        
        var overmap = new GeoportalOverviewMap({
            position : "bottom-left"
        });
        map.addControl(overmap);

        var zoom = new GeoportalZoom({
            position : "bottom-left"
        });
        map.addControl(zoom);

        var fullscreen = new GeoportalFullScreen({
            position : "top-right"
          });
        map.addControl(fullscreen);

        var legends = new Legends({
            collapsed: true,
            position: "bottom-left",
            panel: true,
            auto: true,
            info: true
        });
        map.addControl(legends);

        var catalog = new Catalog({
            position: "top-left",
            categories : [
                {
                    title : "Données",
                    id : "data",
                    items : [
                        {
                            title : "WMTS",
                            default : true,
                            filter : {
                                field : "service",
                                value : "WMTS"
                            }
                        },
                        {
                            title : "WMS",
                            filter : {
                                field : "service",
                                value : "WMS"
                            }
                        },
                        {
                            title : "TMS",
                            filter : {
                                field : "service",
                                value : "TMS"
                            }
                        },
                        {
                            title : "Tout",
                            filter : null
                        }
                    ]
                }
            ],
        });
        map.addControl(catalog);

        var drawing = new Drawing({
            position : "top-left"
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

        var attributions = new GeoportalAttribution({
            position : "bottom-right"
        });
        map.addControl(attributions);
    },
    onFailure : (e) => {
        console.error(e);
    }
});
cfg.call();