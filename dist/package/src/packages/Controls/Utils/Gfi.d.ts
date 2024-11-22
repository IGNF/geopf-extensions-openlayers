export default Gfi;
declare namespace Gfi {
    function getLayerFormat(l: ol.layer.Layer): string;
    function displayInfo(map: ol.Map, coords: ol.Coordinate, content: string, contentType?: string, autoPanOptions: {
        autoPan?: boolean | Object | undefined;
        autoPanAnimation?: Object | undefined;
        autoPanMargin?: number | undefined;
    }): boolean;
    function features2html(map: ol.Map, features: Array<ol.Features>): HTMLElement;
    function layerGetFeatureAtCoordinates(map: ol.Map, olLayer: ol.layer.Layer, olCoordinate: ol.Coordinate): boolean;
    function displayVectorFeatureInfo(map: ol.Map, olCoordinate: ol.Coordinate, olLayers: Array<ol.layer.Layer>, autoPanOptions: Object): boolean;
    function displayFeatureInfo(map: ol.Map, olCoordinate: ol.Coordinate, gfiLayers: Array<Object>, proxyOptions?: {
        proxyUrl?: string | undefined;
        noProxyDomains?: string[] | undefined;
    }, autoPanOptions?: {
        autoPan?: boolean | undefined;
        autoPanAnimation?: Object | undefined;
        autoPanMargin?: number | undefined;
    }): void;
    function getPosition(e: any, map: any): any;
    function onDisplayFeatureInfo(e: any, gfiObj: any): void;
}
//# sourceMappingURL=Gfi.d.ts.map