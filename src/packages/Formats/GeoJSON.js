// import openlayers
import olGeoJSON from "ol/format/GeoJSON";
// import local
import Styling from "./Styling";

/**
 * @classdesc
 *
 * Extended Styles GeoJSON format to export (internal use only !)
 *
 * SPEC
 * cf. https://github.com/mapbox/simplestyle-spec/
 * cf. https://geojson.org/
 *
 *
 * @constructor
 * @alias ol.format.GeoJSONExtended
 * @extends {ol.format.GeoJSON}
 * @type {ol.format.GeoJSONExtended}
 * @param {Object} options - Options
 * @param {Object} [options.defaultStyle] - Styles by default
 * @param {Object} [options.extensions] - Add properties to file root
 */
class GeoJSON extends olGeoJSON {

    /**
     * See {@link ol.format.GeoJSONExtended}
     * @module GeoJSONExtended
     * @alias module:~formats/GeoJSONExtended
     * @param {*} options - options
     * @example
     * import GeoJSONExtended from "gpf-ext-ol/formats/GeoJSONExtended"
     * ou 
     * import { GeoJSONExtended } from "gpf-ext-ol"
     */
    constructor (options) {
        super(options);

        if (!(this instanceof GeoJSON)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        this.options = options || {};

        // INFO
        // defaultStyle est un objet de type Style
        if (this.options.defaultStyle === null || typeof this.options.defaultStyle === "undefined") {
            this.options.defaultStyle = {};
        }

        this.source = null;

        return this;
    }

    /**
     * Read Extend Styles for Features.
     * This function overloads ol.format.GeoJSON.readFeatures ...
     *
     * @see ol.format.GeoJSON.prototype.readFeatures
     * @param {Object|String} source - Source.
     * @param {olx.format.ReadOptions} [options] - Options.
     * @returns {Array.<ol.Feature>} Features.
     */
    readFeatures (source, options) {
        var features = super.readFeatures(source, options);

        // String ou Object
        if (typeof source === "string") {
            this.source = JSON.parse(source);
        } else if (source !== null) {
            this.source = source;
        }

        features.forEach((feature) => {
            var featureStyleFunction = feature.getStyleFunction();
            // existe t il déjà une fonction de style ?
            // si oui, on l'applique !
            if (featureStyleFunction) {
                var styles = featureStyleFunction.call(this, feature, 0);
                if (styles && styles.length !== 0) {
                    feature.setStyle(styles[0]);
                }
            } else {
                // à ce niveau, il n'existe pas de styles, donc :
                // soit, on applique les styles par defaut
                // soit, on prend en compte les styles definis dans les properties / tag du fichier
                // les styles définis ecrasent les styles par defaut...
                var style = Styling.defineStyleFromProperties(feature);
                if (style) {
                    feature.setStyle(style);
                } else {
                    // si aucun style disponible, on utilisera le style par defaut defini
                    // par l'utilisateur ou l'application
                    var styleFunction = Styling.defineStyleFunctionByDefault(this.options.defaultStyle);
                    if (styleFunction) {
                        feature.setStyle(styleFunction);
                        Styling.definePropertiesFromStyle(feature);
                    }
                }
            }
        });

        return features;
    }

    /**
     * Write Extend Styles for Features.
     * This function overloads ol.format.GeoJSON.writeFeatures ...
     *
     * @see ol.format.GeoJSON.prototype.writeFeatures
     * @param {Array.<ol.Feature>} features - Features.
     * @param {Object} [options] - Options.
     *
     * @returns {String} Result.
     */
    writeFeatures (features, options) {
        // on met à jour les properties de styles
        features.forEach(function (feature) {
            Styling.definePropertiesFromStyle(feature);
        });

        var geoJSONObject = this.writeFeaturesObject(features, options);

        // ajout des properties à la racine du fichier
        // ex. options : {
        //   extensions : { /* liste des objets à ajouter */ }
        // }
        if (this.options.hasOwnProperty("extensions")) {
            Object.assign(geoJSONObject, this.options.extensions);
        }

        return JSON.stringify(geoJSONObject);
    }

    /**
     * ...
     * @param {*} key ...
     * @returns {Object} json
     */
    readRootExtensions (key) {
        return this.source[key];
    }

};

export default GeoJSON;

// Expose GeoJSON as ol.source.GeoJSONExtended. (for a build bundle)
if (window.ol && window.ol.format) {
    window.ol.format.GeoJSONExtended = GeoJSON;
}
