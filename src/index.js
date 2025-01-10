import Pkg from "../package.json";

// utilitaires liés à OpenLayers
export {default as GfiUtils} from "./packages/Controls/Utils/Gfi";
export {default as InteractionsUtils} from "./packages/Controls/Utils/Interactions";
export {default as MarkersUtils} from "./packages/Controls/Utils/Markers";

// formats
export { default as KML } from "./packages/Formats/KML";
export { default as GPX } from "./packages/Formats/GPX";
export { default as GeoJSON } from "./packages/Formats/GeoJSON";

// couches
export { default as WMTS } from "./packages/Sources/WMTS";
export { default as SourceWMTS } from "./packages/Layers/SourceWMTS";
export { default as SourceWMS } from "./packages/Layers/SourceWMS";
export { default as SourceWFS } from "./packages/Layers/SourceWFS";
export { default as LayerWMTS } from "./packages/Layers/LayerWMTS";
export { default as LayerWMS } from "./packages/Layers/LayerWMS";
export { default as LayerWFS } from "./packages/Layers/LayerWFS";
export { default as LayerMapBox } from "./packages/Layers/LayerMapBox";

// controles
export { default as LayerSwitcher } from "./packages/Controls/LayerSwitcher/LayerSwitcher";
export { default as GetFeatureInfo } from "./packages/Controls/GetFeatureInfo/GetFeatureInfo";
export { default as SearchEngine } from "./packages/Controls/SearchEngine/SearchEngine";
export { default as MousePosition } from "./packages/Controls/MousePosition/MousePosition";
export { default as Drawing } from "./packages/Controls/Drawing/Drawing";
export { default as Route } from "./packages/Controls/Route/Route";
export { default as Isocurve } from "./packages/Controls/Isocurve/Isocurve";
export { default as ReverseGeocode } from "./packages/Controls/ReverseGeocode/ReverseGeocode";
export { default as LocationSelector } from "./packages/Controls/LocationSelector/LocationSelector";
export { default as LayerImport } from "./packages/Controls/LayerImport/LayerImport";
export { default as GeoportalAttribution } from "./packages/Controls/Attribution/GeoportalAttribution";
export { default as Markers } from "./packages/Controls/Utils/Markers";
export { default as ElevationPath } from "./packages/Controls/ElevationPath/ElevationPath";
export { default as MeasureLength } from "./packages/Controls/Measures/MeasureLength";
export { default as MeasureArea } from "./packages/Controls/Measures/MeasureArea";
export { default as MeasureAzimuth } from "./packages/Controls/Measures/MeasureAzimuth";
export { default as ButtonExport } from "./packages/Controls/Export/Export";
export { default as GeoportalZoom } from "./packages/Controls/Zoom/GeoportalZoom";
export { default as GeoportalFullScreen } from "./packages/Controls/FullScreen/GeoportalFullScreen";
export { default as GeoportalOverviewMap } from "./packages/Controls/OverviewMap/GeoportalOverviewMap";
export { default as Legends } from "./packages/Controls/Legends/Legends";
export { default as Catalog } from "./packages/Controls/Catalog/Catalog";
export { default as Territories } from "./packages/Controls/Territories/Territories";
export { default as ControlList } from "./packages/Controls/ControlList/ControlList";
export { default as ContextMenu } from "./packages/Controls/ContextMenu/ContextMenu";

// proj4
export { default as Proj4 } from "proj4";

// Editeur de style
export { default as EditorStyle } from "./packages/Controls/Editor/Style";
export { default as EditorFilter } from "./packages/Controls/Editor/Filter";
export { default as EditorLayer } from "./packages/Controls/Editor/Layer";
export { default as EditorThemes } from "./packages/Controls/Editor/Themes";
export { default as EditorLegend } from "./packages/Controls/Editor/Legend";
export { default as EditorGroup } from "./packages/Controls/Editor/Group";
export { default as EditorSearch } from "./packages/Controls/Editor/Search";
export { default as Editor } from "./packages/Controls/Editor/Editor";

// utilitaires
export { default as HelperUtils } from "./packages/Utils/Helper";
export { default as LayerUtils } from "./packages/Utils/LayerUtils";
export { default as ProxyUtils } from "./packages/Utils/ProxyUtils";
export { default as ColorUtils  } from "./packages/Utils/ColorUtils";
export { default as MathUtils } from "./packages/Utils/MathUtils";
export { default as LoggerUtils } from "./packages/Utils/LoggerByDefault";

// projections
export { default as CRS } from "./packages/CRS/CRS";

/** Version */
export const version = Pkg.version;
/** Publication date */
export const date = Pkg.date;
