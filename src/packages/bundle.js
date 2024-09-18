/**
* Global variable Gp.
*
* @module Gp
* @alias Gp
* @description
*
* This is the global variable that is exposed in the browser environment.
* Content is composed of constructor, functions and properties...
*
* > Config:  (...)
*
* > ColorUtils: (...)
* > LayerUtils: (...)
* > MathUtils: (...)
* > ProxyUtils: (...)
* > Logger: (...)
*
* > olExtended: (...)
*
* > date: "YYYY-MM-DD"
* > version: "X.X.X"
*
* > Error: (...)
* > Helper: (...)
* > Protocols: (...)
* > Services: (...)
* > servicesDate: "YYYY-MM-DD"
* > servicesVersion: "X.X.X"
*
* **Note :**
*
* function to add projections in 'proj4',
* they are exposed in the global variable 'ol':
* > Gp.olExtended.includeProjections()
*
* You can test it :
* - ol.proj.proj4("EPSG:43260")
*
* Projections include by default into proj4 and ol :
* > WGS84
* > ['EPSG:4326']
* > ['EPSG:3785'], ['EPSG:3857'],
* > ['EPSG:900913'], ['EPSG:102113']
*
* and
*
* > ["EPSG:2154"],
* > ["EPSG:27571"], ["EPSG:27572"],  ["EPSG:27573"],  ["EPSG:2757"],
* > ["CRS:84"],
* > ["IGNF:LAMB93"],
* > ["IGNF:LAMBE"],
* > ["IGNF:LAMB1"],  ["IGNF:LAMB2"],  ["IGNF:LAMB3"],  ["IGNF:LAMB4"],
* > ["IGNF:RGF93G"],
* > ["IGNF:WGS84G"]
*
* The following variables are aslo global :
*   - ol,
*   - eventbus
*/

import Pkg from "../../package.json";

import GfiUtils from "./Controls/Utils/Gfi";

import KML from "./Formats/KML";
import GPX from "./Formats/GPX";
import GeoJSON from "./Formats/GeoJSON";

import WMTS from "./Sources/WMTS";
import SourceWMTS from "./Layers/SourceWMTS";
import SourceWMS from "./Layers/SourceWMS";
import LayerWMTS from "./Layers/LayerWMTS";
import LayerWMS from "./Layers/LayerWMS";
import LayerMapBox from "./Layers/LayerMapBox";

import LayerSwitcher from "./Controls/LayerSwitcher/LayerSwitcher";
import GetFeatureInfo from "./Controls/GetFeatureInfo/GetFeatureInfo";
import SearchEngine from "./Controls/SearchEngine/SearchEngine";
import MousePosition from "./Controls/MousePosition/MousePosition";
import Drawing from "./Controls/Drawing/Drawing";
import Route from "./Controls/Route/Route";
import Isocurve from "./Controls/Isocurve/Isocurve";
import ReverseGeocode from "./Controls/ReverseGeocode/ReverseGeocode";
import LocationSelector from "./Controls/LocationSelector/LocationSelector";
import LayerImport from "./Controls/LayerImport/LayerImport";
import GeoportalAttribution from "./Controls/Attribution/GeoportalAttribution";
import Markers from "./Controls/Utils/Markers";
import ElevationPath from "./Controls/ElevationPath/ElevationPath";
import MeasureLength from "./Controls/Measures/MeasureLength";
import MeasureArea from "./Controls/Measures/MeasureArea";
import MeasureAzimuth from "./Controls/Measures/MeasureAzimuth";
import ButtonExport from "./Controls/Export/Export";
import GeoportalZoom from "./Controls/Zoom/GeoportalZoom";
import GeoportalFullScreen from "./Controls/FullScreen/GeoportalFullScreen";
import GeoportalOverviewMap from "./Controls/OverviewMap/GeoportalOverviewMap";
import Legends from "./Controls/Legends/Legends";
import Global from "./Controls/Global/Global";
import Catalog from "./Controls/Catalog/Catalog";

import Proj4 from "proj4";

import Style from "./Controls/Editor/Style";
import Filter from "./Controls/Editor/Filter";
import Layer from "./Controls/Editor/Layer";
import Themes from "./Controls/Editor/Themes";
import Legend from "./Controls/Editor/Legend";
import Group from "./Controls/Editor/Group";
import Search from "./Controls/Editor/Search";
import Editor from "./Controls/Editor/Editor";

import HelperUtils from "./Utils/Helper";
import LayerUtils from "./Utils/LayerUtils";
import ProxyUtils from "./Utils/ProxyUtils";
import ColorUtils  from "./Utils/ColorUtils";
import MathUtils from "./Utils/MathUtils";
import Logger from "./Utils/LoggerByDefault";
import Parser from "./Utils/Parser";
import Register from "./Utils/Register";

// Les autoload...
import "./Utils/AutoLoadConfig";
import "./CRS/AutoLoadCRS";

// export des services
import Gp from "geoportal-access-lib";

import CRS from "./CRS/CRS";

var Services = Gp.Services;
var Error = Gp.Error;
var Helper = Gp.Helper;
var Protocols = Gp.Protocols;

var servicesDate = Gp.servicesDate;
var servicesVersion = Gp.servicesVersion;

// HACK !?
// export const Config = (window.Gp) ? window.Gp.Config : {};

export {
    /** Services
    * @see {@link http://ignf.github.io/geoportal-access-lib/current/jsdoc/module-Services.html|geoportal-access-lib}
    */
    Services,
    /** Error
    * @see {@link http://ignf.github.io/geoportal-access-lib/current/jsdoc/Gp.Error.html|geoportal-access-lib}
    */
    Error,
    /** Helper
    * @see {@link http://ignf.github.io/geoportal-access-lib/current/jsdoc/module-Helper.html|geoportal-access-lib}
    */
    Helper,
    /** Protocols
    * @see {@link http://ignf.github.io/geoportal-access-lib/current/jsdoc/module-XHR.html|geoportal-access-lib}
    */
    Protocols,
    /** servicesDate
    * @see {@link http://ignf.github.io/geoportal-access-lib/current/jsdoc/module-Gp.html|geoportal-access-lib}
    */
    servicesDate,
    /** servicesVersion
    * @see {@link http://ignf.github.io/geoportal-access-lib/current/jsdoc/module-Gp.html|geoportal-access-lib}
    */
    servicesVersion
};

/** Version */
export const version = Pkg.version;
/** Publication date */
export const date = Pkg.date;

export {
    /** @see Gp.HelperUtils */
    HelperUtils,
    /** @see Gp.LayerUtils */
    LayerUtils,
    /** @see Gp.ProxyUtils */
    ProxyUtils,
    /** @see Gp.ColorUtils */
    ColorUtils,
    /** @see Gp.MathUtils */
    MathUtils,
    /** @see Gp.Logger */
    Logger,
    /** @see Gp.Parser */
    Parser,
    /** @see Gp.Register */
    Register
};

function deepCopy (source, target) {
    // Implementing Tail Call Elimination
    function tce (source, target) {
        for (var prop in source) {
            if (source.hasOwnProperty(prop)) {
                if (!target.hasOwnProperty(prop)) {
                    target[prop] = source[prop];
                } else if (typeof source[prop] === "object") {
                    tce(source[prop], target[prop]);
                }
            }
        }
    }
    return tce(source, target);
}

var Ol = {};

// FIXME : est il utile d'avoir un ns particulier "gp" ?
Ol.gp = {};
Ol.gp.GfiUtils = GfiUtils;

// proposer une fonction de chargement des projections !
Ol.includeProjections = CRS.load;

// Editeur MapBox
Ol.style = Ol.style || {};
Ol.style.Editor = Editor;
Ol.style.editor = Ol.style.editor || {};
Ol.style.editor.Style = Style;
Ol.style.editor.Filter = Filter;
Ol.style.editor.Layer = Layer;
Ol.style.editor.Legend = Legend;
Ol.style.editor.Group = Group;
Ol.style.editor.Themes = Themes;
Ol.style.editor.Search = Search;

// Rajout des propriétés dans le namespace Ol
Ol.format = Ol.format || {};
Ol.format.KMLExtended = KML;
Ol.format.GPXExtended = GPX;
Ol.format.GeoJSONExtended = GeoJSON;

Ol.source = Ol.source || {};
Ol.source.WMTSExtended = WMTS;
Ol.source.GeoportalWMTS = SourceWMTS;
Ol.source.GeoportalWMS = SourceWMS;

Ol.layer = Ol.layer || {};
Ol.layer.GeoportalWMTS = LayerWMTS;
Ol.layer.GeoportalWMS = LayerWMS;
Ol.layer.GeoportalMapBox = LayerMapBox;

Ol.control = Ol.control || {};
Ol.control.LayerSwitcher = LayerSwitcher;
Ol.control.GeoportalAttribution = GeoportalAttribution;
Ol.control.GetFeatureInfo = GetFeatureInfo;
Ol.control.SearchEngine = SearchEngine;
Ol.control.Route = Route;
Ol.control.Isocurve = Isocurve;
Ol.control.GeoportalMousePosition = MousePosition;
Ol.control.Drawing = Drawing;
Ol.control.ReverseGeocode = ReverseGeocode;
Ol.control.LayerImport = LayerImport;
Ol.control.MeasureLength = MeasureLength;
Ol.control.MeasureArea = MeasureArea;
Ol.control.MeasureAzimuth = MeasureAzimuth;
Ol.control.DefaultMarkers = Markers;
Ol.control.ElevationPath = ElevationPath;
Ol.control.LocationSelector = LocationSelector;
Ol.control.Export = ButtonExport;
Ol.control.GeoportalZoom = GeoportalZoom;
Ol.control.GeoportalFullScreen = GeoportalFullScreen;
Ol.control.GeoportalOverviewMap = GeoportalOverviewMap;
Ol.control.Legends = Legends;
Ol.control.Catalog = Catalog;
Ol.control.Global = Global;

export {
    /** 
     * Expose extensions openlayers extended 
     * @see ol.control.LayerSwitcher
     * @see ol.control.GeoportalAttribution
     * @see ol.control.GetFeatureInfo
     * @see ol.control.SearchEngine
     * @see ol.control.Route
     * @see ol.control.Isocurve
     * @see ol.control.GeoportalMousePosition
     * @see ol.control.GeoportalFullScreen
     * @see ol.control.GeoportalZoom
     * @see ol.control.GeoportalOverviewMap
     * @see ol.control.Drawing
     * @see ol.control.ReverseGeocode
     * @see ol.control.MeasureLength
     * @see ol.control.MeasureArea
     * @see ol.control.MeasureAzimuth
     * @see ol.control.DefaultMarkers
     * @see ol.control.ElevationPath
     * @see ol.control.LocationSelector
     * @see ol.control.Export
     * @see ol.control.Legends
     * @see ol.layer.GeoportalWMTS
     * @see ol.layer.GeoportalWMS
     * @see ol.layer.GeoportalMapBox
     * @see ol.source.GeoportalWMTS
     * @see ol.source.GeoportalWMS
     * @see ol.format.KMLExtended
     * @see ol.format.GPXExtended
     * @see ol.format.GeoJSONExtended
     * @see ol.style.Editor 
     * @see ol.includeProjections
     */
    Ol as olExtended
};

// "proj4" is not exposed into window  with webpack !
// But, it's useful to expose it into OpenLayers :
//      console > ol.proj.get("EPSG:2154")
if (window.ol && window.ol.proj && window.ol.proj.proj4) {
    try {
        window.ol.proj.proj4.register(Proj4);
    } catch (e) {}
}

// Expose extensions openlayers extended into ol
if (window.ol) {
    // on fusionne les fonctionnalités openlayers / étendues
    // Gp.olExtended -> ol
    deepCopy(Ol, window.ol);
    // ol -> Gp.olExtended
    deepCopy(window.ol, Ol);
}
