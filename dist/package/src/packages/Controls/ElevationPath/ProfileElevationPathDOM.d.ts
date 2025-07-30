export default ProfileElevationPathDOM;
declare namespace ProfileElevationPathDOM {
    function _getCssProperty(element: HTMLElement, property: string): string;
    function _getTextWidth(text: string, container: HTMLElement, font?: string): number;
    function _dataZToSvgY(z: any, pathHeight: number, minGraphZ: number, pxPerMZ: number): number;
    function _dataDistToSvgX(dist: number, svgWidth: number, pathWidth: number, pxPerMX: number): any[];
    function _svgXToDataDist(svgX: number, svgWidth: number, pathWidth: number, pxPerMX: number): any[];
    function _arrayBisect(array: any[], value: number): number;
    function displayProfileByDefault(data: any, container: HTMLElement, context: any, className: any): HTMLElement;
    function displayProfileRaw(data: any, container: HTMLElement, context: any, className: any): HTMLElement;
    function displayProfileLibD3(data: any, container: HTMLElement, context: any, className: any): HTMLElement;
    function displayProfileLibAmCharts(data: any, container: HTMLElement, context: any, className: any): HTMLElement;
}
//# sourceMappingURL=ProfileElevationPathDOM.d.ts.map