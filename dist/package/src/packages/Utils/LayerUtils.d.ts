export default LayerUtils;
declare namespace LayerUtils {
    function getZoomLevelFromScaleDenominator(scaleDenominator: number, crs: string): Integer;
    function getAttributions(params: {
        extent: Array<Float>;
        zoom: number;
        crs: string;
        visibility: boolean;
        originators: Gp.Services.Config.Originator;
    }): Object;
    function intersects(extent1: Array<Float>, extent2: Array<Float>): boolean;
}
//# sourceMappingURL=LayerUtils.d.ts.map