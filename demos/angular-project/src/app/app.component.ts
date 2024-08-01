import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import {
  Drawing,
  Isocurve,
  Route,
  LayerImport,
  GeoportalAttribution,
  GeoportalZoom,
  GeoportalOverviewMap,
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
} from "../../node_modules/geopf-extensions-openlayers/src/index";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angular-project';

  map: Map = new Map;

  ngOnInit(): void {
    this.map = new Map({
      view: new View({
        center: [0, 0],
        zoom: 1,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'ol-map'
    });

    CRS.load();

    var zoom = new GeoportalZoom({
      position: "bottom-left"
    });
    this.map.addControl(zoom);

    var overmap = new GeoportalOverviewMap({
      position: "bottom-left"
    });
    this.map.addControl(overmap);

    var drawing = new Drawing({
      position: "top-left"
    });
    this.map.addControl(drawing);

    var iso = new Isocurve({
      position: "bottom-left"
    });
    this.map.addControl(iso);

    var layerImport = new LayerImport({
      position: "bottom-left"
    });
    this.map.addControl(layerImport);

    var layerSwitcher = new LayerSwitcher({
      options: {
        position: "top-right"
      }
    });
    this.map.addControl(layerSwitcher);

    var mp = new GeoportalMousePosition({
      position: "top-right"
    });
    this.map.addControl(mp);

    var route = new Route({
      position: "top-right"
    });
    this.map.addControl(route);

    var reverse = new ReverseGeocode({
      position: "top-right"
    });
    this.map.addControl(reverse);

    var search = new SearchEngine({
      position: "top-right"
    });
    this.map.addControl(search);

    var feature = new GetFeatureInfo({
      options: {
        position: "top-right"
      }
    });
    this.map.addControl(feature);

    var measureLength = new MeasureLength({
      position: "bottom-left"
    });
    this.map.addControl(measureLength);

    var measureArea = new MeasureArea({
      position: "bottom-left"
    });
    this.map.addControl(measureArea);

    var measureAzimuth = new MeasureAzimuth({
      position: "bottom-left"
    });
    this.map.addControl(measureAzimuth);

    var measureProfil = new ElevationPath({
      position: "bottom-left"
    });
    this.map.addControl(measureProfil);

    var attributions = new GeoportalAttribution();
    this.map.addControl(attributions);
  }
}
