import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect, useRef } from 'react';

import View from 'ol/View';
import Map from 'ol/Map';
import ScaleLine from 'ol/control/ScaleLine';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import 'ol/ol.css';
import "@gouvfr/dsfr/dist/dsfr.css";
import "@gouvfr/dsfr/dist/utility/icons/icons.css";
import "geopf-extensions-openlayers/css/Dsfr.css";
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
  LayerSwitcher,
  Legends,
  ReverseGeocode,
  Route,
  SearchEngine,
  Territories,
  ControlList
} from "geopf-extensions-openlayers";

import Gp from "geoportal-access-lib";

function App() {
  const [map, setMap] = useState();
  const mapElement = useRef();
  const mapRef = useRef();
  mapRef.current = map;

  const createMap = () => {
    var map = new Map({
      target: mapElement.current,
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

    const scaleControl = new ScaleLine({
      units: 'metric',
      bar: false,
    });
    map.addControl(scaleControl);

    var territories = new Territories({
      collapsed: true,
      draggable: true,
      position: "top-right",
      panel: true,
      auto: true,
      thumbnail : false,
      reduce: false,
      tiles: 3
    });
    map.addControl(territories);

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
  
    var overmap = new GeoportalOverviewMap({
      position : "bottom-left"
    });
    map.addControl(overmap);
  
    var zoom = new GeoportalZoom({
      position: "bottom-left"
    });
    map.addControl(zoom);
  
    var drawing = new Drawing({
      position: "top-left"
    });
    map.addControl(drawing);
  
    var iso = new Isocurve({
      position: "bottom-left",
      listable: true
    });
    map.addControl(iso);
  
    var layerImport = new LayerImport({
      position: "bottom-left",
      listable: true
    });
    map.addControl(layerImport);
  
    var layerSwitcher = new LayerSwitcher({
      options: {
        position: "top-right"
      }
    });
    map.addControl(layerSwitcher);
  
    var mp = new GeoportalMousePosition({
      position: "top-right"
    });
    map.addControl(mp);
  
    var route = new Route({
      position: "top-right",
      listable: true
    });
    map.addControl(route);
  
    var reverse = new ReverseGeocode({
      position: "top-right",
      listable: true
    });
    map.addControl(reverse);
  
    var search = new SearchEngine({
            displayButtonAdvancedSearch : true,
            displayButtonGeolocate : true,
            displayButtonCoordinateSearch : true,
            displayButtonClose : false,
            collapsible : false,
            resources : {
              search : true
            },
            searchOptions: {
                addToMap: true,
                filterServices : "WMTS,WMS,TMS,WFS",
                filterLayersPriority : "PLAN.IGN,GEOGRAPHICALGRIDSYSTEMS.MAPS.BDUNI.J1,GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2,CADASTRALPARCELS.PARCELLAIRE_EXPRESS,ORTHOIMAGERY.ORTHOPHOTOS",
                filterWMTSPriority : true,
                serviceOptions: {
                    maximumResponses : 20
                }
            },
            markerUrl : "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAzNiIgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4Ij48cGF0aCBmaWxsPSIjMDAwMDkxIiBkPSJNMTguMzY0IDMuNjM2YTkgOSAwIDAgMSAwIDEyLjcyOEwxMiAyMi43MjhsLTYuMzY0LTYuMzY0QTkgOSAwIDAgMSAxOC4zNjQgMy42MzZaTTEyIDhhMiAyIDAgMSAwIDAgNCAyIDIgMCAwIDAgMC00WiIvPjwvc3ZnPg=="
    });
    map.addControl(search);
  
    var feature = new GetFeatureInfo({
      options: {
        position: "top-right"
      }
    });
    map.addControl(feature);
  
    var measureLength = new MeasureLength({
      position: "bottom-left",
      listable: true
    });
    map.addControl(measureLength);
  
    var measureArea = new MeasureArea({
      position: "bottom-left",
      listable: true
    });
    map.addControl(measureArea);

    var measureAzimuth = new MeasureAzimuth({
      position: "bottom-left",
      listable: true
    });
    map.addControl(measureAzimuth);
  
    var measureProfil = new ElevationPath({
      position: "bottom-left",
      listable: true
    });
    map.addControl(measureProfil);
  
    var attributions = new GeoportalAttribution();
    map.addControl(attributions);
  
    var controlList = new ControlList({
      draggable: false,
      position: "bottom-right"
    });
    map.addControl(controlList);

    setMap(map);
  };

  const getMap = async () => {
    var cfg = new Gp.Services.Config({
      customConfigFile : "https://raw.githubusercontent.com/IGNF/geoportal-configuration/new-url/dist/fullConfig.json",
      onSuccess : () => {
        createMap();
      },
      onFailure : (e) => {
        console.error(e);
      }
    });
    await cfg.call();
  };

  useEffect(() => {
    getMap();
  }, []); 

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
          <div style={{height:'100vh',width:'100%'}} ref={mapElement} id="map-container" className="map-container" />
        </main>
      </div>
  );
}

export default App;
