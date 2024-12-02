/** Version */
export const version: any;
/** Publication date */
export const date: any;
export var Config: any;
export var Services: any;
export var Error: any;
export var Helper: any;
export var Protocols: any;
export var servicesDate: any;
export var servicesVersion: any;
import HelperUtils from "./Utils/Helper";
import LayerUtils from "./Utils/LayerUtils";
import ProxyUtils from "./Utils/ProxyUtils";
import ColorUtils from "./Utils/ColorUtils";
import MathUtils from "./Utils/MathUtils";
import Logger from "./Utils/LoggerByDefault";
import Parser from "./Utils/Parser";
import Register from "./Utils/Register";
declare namespace Ol {
    namespace gp {
        export { GfiUtils };
    }
    let includeProjections: () => void;
    namespace style {
        export { Editor };
        export namespace editor {
            export { Style };
            export { Filter };
            export { Layer };
            export { Legend };
            export { Group };
            export { Themes };
            export { Search };
        }
    }
    namespace format {
        export { KML as KMLExtended };
        export { GPX as GPXExtended };
        export { GeoJSON as GeoJSONExtended };
    }
    namespace source {
        export { WMTS as WMTSExtended };
        export { SourceWMTS as GeoportalWMTS };
        export { SourceWMS as GeoportalWMS };
        export { SourceWFS as GeoportalWFS };
    }
    namespace layer {
        export { LayerWMTS as GeoportalWMTS };
        export { LayerWMS as GeoportalWMS };
        export { LayerWFS as GeoportalWFS };
        export { LayerMapBox as GeoportalMapBox };
    }
    namespace control {
        export { LayerSwitcher };
        export { GeoportalAttribution };
        export { GetFeatureInfo };
        export { SearchEngine };
        export { Route };
        export { Isocurve };
        export { MousePosition as GeoportalMousePosition };
        export { Drawing };
        export { ReverseGeocode };
        export { LayerImport };
        export { MeasureLength };
        export { MeasureArea };
        export { MeasureAzimuth };
        export { Markers as DefaultMarkers };
        export { ElevationPath };
        export { LocationSelector };
        export { ButtonExport as Export };
        export { GeoportalZoom };
        export { GeoportalFullScreen };
        export { GeoportalOverviewMap };
        export { Legends };
        export { Catalog };
        export { Territories };
        export { ControlList };
    }
}
import GfiUtils from "./Controls/Utils/Gfi";
import Editor from "./Controls/Editor/Editor";
import Style from "./Controls/Editor/Style";
import Filter from "./Controls/Editor/Filter";
import Layer from "./Controls/Editor/Layer";
import Legend from "./Controls/Editor/Legend";
import Group from "./Controls/Editor/Group";
import Themes from "./Controls/Editor/Themes";
import Search from "./Controls/Editor/Search";
import KML from "./Formats/KML";
import GPX from "./Formats/GPX";
import GeoJSON from "./Formats/GeoJSON";
import WMTS from "./Sources/WMTS";
import SourceWMTS from "./Layers/SourceWMTS";
import SourceWMS from "./Layers/SourceWMS";
import SourceWFS from "./Layers/SourceWFS";
import LayerWMTS from "./Layers/LayerWMTS";
import LayerWMS from "./Layers/LayerWMS";
import LayerWFS from "./Layers/LayerWFS";
import LayerMapBox from "./Layers/LayerMapBox";
import LayerSwitcher from "./Controls/LayerSwitcher/LayerSwitcher";
import GeoportalAttribution from "./Controls/Attribution/GeoportalAttribution";
import GetFeatureInfo from "./Controls/GetFeatureInfo/GetFeatureInfo";
import SearchEngine from "./Controls/SearchEngine/SearchEngine";
import Route from "./Controls/Route/Route";
import Isocurve from "./Controls/Isocurve/Isocurve";
import MousePosition from "./Controls/MousePosition/MousePosition";
import Drawing from "./Controls/Drawing/Drawing";
import ReverseGeocode from "./Controls/ReverseGeocode/ReverseGeocode";
import LayerImport from "./Controls/LayerImport/LayerImport";
import MeasureLength from "./Controls/Measures/MeasureLength";
import MeasureArea from "./Controls/Measures/MeasureArea";
import MeasureAzimuth from "./Controls/Measures/MeasureAzimuth";
import Markers from "./Controls/Utils/Markers";
import ElevationPath from "./Controls/ElevationPath/ElevationPath";
import LocationSelector from "./Controls/LocationSelector/LocationSelector";
import ButtonExport from "./Controls/Export/Export";
import GeoportalZoom from "./Controls/Zoom/GeoportalZoom";
import GeoportalFullScreen from "./Controls/FullScreen/GeoportalFullScreen";
import GeoportalOverviewMap from "./Controls/OverviewMap/GeoportalOverviewMap";
import Legends from "./Controls/Legends/Legends";
import Catalog from "./Controls/Catalog/Catalog";
import Territories from "./Controls/Territories/Territories";
import ControlList from "./Controls/ControlList/ControlList";
export { HelperUtils, LayerUtils, ProxyUtils, ColorUtils, MathUtils, Logger, Parser, Register, Ol as olExtended };
//# sourceMappingURL=bundle.d.ts.map