import logo from './logo.svg';
import './App.css';

import React from 'react';

import View from 'ol/View';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';
import "geoportal-extensions-openlayers/css/Classic.css";
import {
  Drawing,
  Isocurve,
  Route,
  LayerImport,
  GeoportalAttribution,
  GeoportalZoom,
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

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        map: null,
        center: [0, 0],
        zoom: 0,
    };
  }

  componentDidMount() {
    
    this.map = new Map({
      target: "map-container",
      layers: [
          new TileLayer({
              source: new OSM(),
          }),
      ],
      view: new View({
        center: [288074.8449901076, 6247982.515792289],
        zoom: 8,
      }),
    })

    CRS.load();

    var zoom = new GeoportalZoom({
      position: "bottom-left"
    });
    this.map.addControl(zoom);

    var drawing = new Drawing({
      position: "bottom-left"
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

    this.setState(this.map);
  }

  componentWillUnmount () {
    this.map.setTarget(undefined);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <main>
          <div style={{height:'100vh',width:'100%'}} id="map-container" className="map-container" />
        </main>
      </div>
    );
  }

}
