export default WMTS;
/**
 * @classdesc
 *
 * Extended ol.source.WMTS.
 *
 * @constructor
 * @alias ol.source.WMTSExtended
 * @type {ol.source.WMTS}
 * @extends {ol.source.WMTS}
 * @param {Object} options - Options
 */
declare class WMTS {
    constructor(options: any);
    /**
     * Return the GetFeatureInfo URL for the passed coordinate, resolution, and
     * projection. Return `undefined` if the GetFeatureInfo URL cannot be
     * constructed.
     * @param {ol.Coordinate} coordinate - Coordinate.
     * @param {Number} resolution - Resolution.
     * @param {ol.proj.Projection} projection - Projection.
     * @param {!Object} params - GetFeatureInfo params. `INFOFORMAT` at least should
     *     be provided.
     * @returns {String|undefined} GetFeatureInfo URL.
     */
    getFeatureInfoUrl(coordinate: ol.Coordinate, resolution: number, projection: ol.proj.Projection, params: Object): string | undefined;
}
//# sourceMappingURL=WMTS.d.ts.map