export default MathUtils;
declare namespace MathUtils {
    function modulo(a: number, b: number): number;
    function decimalToDMS(degrees: number, hemispheres: any[], numDigits: number): Object;
    /**
     * ol coordinate to decimal
     *
     * @function coordinateToDecimal
     * @param {*} olCoordinate - see ol/coordinate.js
     * @returns {Object} - {lat, lng, unit:°}
     */
    function coordinateToDecimal(olCoordinate: any): Object;
    /**
     * ol coordinate to dms
     *
     * @function coordinateToDMS
     * @param {*} olCoordinate - see ol/coordinate.js
     * @returns {Object} - {lat, lng, unit:dms}
     */
    function coordinateToDMS(olCoordinate: any): Object;
    /**
     * ol coordinate to rad
     *
     * @function coordinateToRad
     * @param {*} olCoordinate - see ol/coordinate.js
     * @returns {Object} - {lat, lng, unit:rad}
     */
    function coordinateToRad(olCoordinate: any): Object;
    /**
     * ol coordinate to gon
     *
     * @function coordinateToGon
     * @param {*} olCoordinate - see ol/coordinate.js
     * @returns {Object} - {lat, lng, unit:gon}
     */
    function coordinateToGon(olCoordinate: any): Object;
    /**
     * ol coordinate to meter
     *
     * @function coordinateToMeter
     * @param {*} olCoordinate - see ol/coordinate.js
     * @returns {Object} - {x, y, unit:m}
     */
    function coordinateToMeter(olCoordinate: any): Object;
    /**
     * ol coordinate to kilometer
     *
     * @function coordinateToKMeter
     * @param {*} olCoordinate - see ol/coordinate.js
     * @returns {Object} - {x, lyng, unit:km}
     */
    function coordinateToKMeter(olCoordinate: any): Object;
    function toInteger(s: string, base: Numeric): any;
    function isInteger(s: string): boolean;
    function toFloat(s: string): any;
}
//# sourceMappingURL=MathUtils.d.ts.map