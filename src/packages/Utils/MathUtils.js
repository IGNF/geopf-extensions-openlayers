/**
* @module MathUtils
* @alias module:~utils/MathUtils
* @description
* ...
*
* @example
* modulo();
* decimalToDMS();
* coordinateTo();
* toInteger();
* isInteger();
* toFloat();
*/
var MathUtils = {
    /**
     * Reste de la division euclidienne
     * 
     * @function modulo
     * @param {Number} a - divisor
     * @param {Number} b - quotient
     * @returns {Number} Modulo
     */
    modulo : function (a, b) {
        var r = a % b;
        return r * b < 0 ? r + b : r;
    },

    /**
     * Transform degrees, minutes, seconds form decimal degrees -
     * Largely inspired by the private function degreesToStringHDMS from ol/coordinate.js
     *
     * @function decimalToDMS
     * @param {Number} degrees - decimal degrees
     * @param {Array} hemispheres - "NS" ou "EO"
     * @param {Number} numDigits - number of digits for seconds
     * @returns {Object} DMS coordinate
     */
    decimalToDMS : function (degrees, hemispheres, numDigits) {
        var normalizedDegrees = this.modulo(degrees + 180, 360) - 180;
        var x = Math.abs(3600 * normalizedDegrees);
        var dflPrecision = numDigits || 0;
        var precision = Math.pow(10, dflPrecision);

        var deg = Math.floor(x / 3600);
        var min = Math.floor((x - deg * 3600) / 60);
        var sec = x - (deg * 3600) - (min * 60);
        sec = Math.ceil(sec * precision) / precision;

        if (sec >= 60) {
            sec = 0;
            min += 1;
        }

        if (min >= 60) {
            min = 0;
            deg += 1;
        }

        var direction = hemispheres.charAt(normalizedDegrees < 0 ? 1 : 0);
        return {
            d : deg,
            m : min,
            s : sec,
            direction : direction
        };
    },

    /**
     * Transform decimal degrees form degrees, minutes, seconds
     * 
     * @function dmsToDecimal
     * @param {*} degrees - degrees
     * @param {*} minutes - minutes
     * @param {*} seconds - seconds
     * @param {*} hemispheres - "NS" ou "EO"
     * @returns {Number} decimal coordinate
     */
    dmsToDecimal (degrees, minutes, seconds, hemispheres) {
        var dd = degrees + minutes/60 + seconds/(60*60);
    
        if (hemispheres == "S" || hemispheres == "O") {
            dd = dd * -1;
        }
        return dd;
    },
    /**
     * ol coordinate to decimal
     * 
     * @function coordinateToDecimal
     * @param {*} olCoordinate - see ol/coordinate.js
     * @returns {Object} - {lat, lng, unit:°}
     */
    coordinateToDecimal (olCoordinate) {
        var coordinate = {};
        coordinate.lat = olCoordinate[1].toFixed(6);
        coordinate.lng = olCoordinate[0].toFixed(6);
        coordinate.unit = "°";
        return coordinate;
    },

    /**
     * ol coordinate to dms
     * 
     * @function coordinateToDMS
     * @param {*} olCoordinate - see ol/coordinate.js
     * @returns {Object} - {lat, lng, unit:dms}
     */
    coordinateToDMS (olCoordinate) {
        return {
            lng : MathUtils.decimalToDMS(olCoordinate[0], "EO", 2),
            lat : MathUtils.decimalToDMS(olCoordinate[1], "NS", 2),
            unit : "DMS"
        };
    },

    /**
     * ol coordinate to rad
     * 
     * @function coordinateToRad
     * @param {*} olCoordinate - see ol/coordinate.js
     * @returns {Object} - {lat, lng, unit:rad}
     */
    coordinateToRad (olCoordinate) {
        var coordinate = {};
        var d = 0.01745329251994329577;
        coordinate.lng = olCoordinate[0] * d;
        coordinate.lng = coordinate.lng.toFixed(8);
        coordinate.lat = olCoordinate[1] * d;
        coordinate.lat = coordinate.lat.toFixed(8);
        coordinate.unit = "rad";
        return coordinate;
    },

    /**
     * ol coordinate to gon
     * 
     * @function coordinateToGon
     * @param {*} olCoordinate - see ol/coordinate.js
     * @returns {Object} - {lat, lng, unit:gon}
     */
    coordinateToGon (olCoordinate) {
        var coordinate = {};
        var d = 1.11111111111111111111;
        coordinate.lng = olCoordinate[0] * d;
        coordinate.lng = coordinate.lng.toFixed(8);
        coordinate.lat = olCoordinate[1] * d;
        coordinate.lat = coordinate.lat.toFixed(8);
        coordinate.unit = "gon";
        return coordinate;
    },

    /**
     * ol coordinate to meter
     * 
     * @function coordinateToMeter
     * @param {*} olCoordinate - see ol/coordinate.js
     * @returns {Object} - {x, y, unit:m}
     */
    coordinateToMeter (olCoordinate) {
        // on recoit toujours des coordonnées metriques
        var coordinate = {};
        coordinate.x = olCoordinate[0].toFixed(2);
        coordinate.y = olCoordinate[1].toFixed(2);
        coordinate.unit = "m";
        return coordinate;
    },

    /**
     * ol coordinate to kilometer
     * 
     * @function coordinateToKMeter
     * @param {*} olCoordinate - see ol/coordinate.js
     * @returns {Object} - {x, lyng, unit:km}
     */
    coordinateToKMeter (olCoordinate) {
        // on recoit toujours des coordonnées metriques
        var coordinate = {};
        coordinate.x = (olCoordinate[0] / 1000).toFixed(2);
        coordinate.y = (olCoordinate[1] / 1000).toFixed(2);
        coordinate.unit = "km";
        return coordinate;
    },

    /**
     * Converts string to Integer
     *
     * @function toInteger
     * @param {String} s - string number
     * @param {Numeric} base - between 2 and 36
     * @returns {null|Numeric} result
     */
    toInteger : function (s, base) {
        var _base = base || 10;
        var n = parseInt(s, _base);
        if (!isNaN(n) && isFinite(n)) {
            return n;
        }
        return null;
    },

    /**
     * check if s represents an integer
     *
     * @function isInteger
     * @param {String} s - string number
     * @returns {Boolean} is integer
     */
    isInteger : function (s) {
        if (isNaN(s)) {
            return false;
        }

        var v = parseFloat(s);
        return ((v | 0) === v);
    },

    /**
     * Converts s to float
     *
     * @function toFloat
     * @param {String} s - string number
     * @returns {null|Numeric} result
     */
    toFloat : function (s) {
        var n = parseFloat(s);
        if (!isNaN(n) && isFinite(n)) {
            return n;
        }
        return null;
    }
};

export default MathUtils;
