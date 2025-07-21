export default KML;
/**
 * @classdesc
 *
 * Extended Styles KML format to export (internal use only !)
 *
 * INFO
 * only ol.Control is a user-extendable class.
 * Everything else requires integration with the original openlayers source and a new ol.js
 * to be built with your new classes incorporated.
 *
 * SPEC
 * cf. https://developers.google.com/kml/forum/advanced
 *
 * ISSUES
 * cf. https://github.com/openlayers/openlayers/issues/4829
 * cf. https://github.com/openlayers/openlayers/issues/4460
 * cf. https://github.com/openlayers/openlayers/pull/5590
 * cf. https://github.com/openlayers/openlayers/issues/5229
 * cf. https://github.com/openlayers/openlayers/issues/3371
 *
 * @constructor
 * @alias ol.format.KMLExtended
 * @type {ol.format.KMLExtended}
 * @extends {ol.format.KML}
 * @param {Object} options - Options
 * @param {Object} [options.extensions] - Add properties to file root
 */
declare class KML {
    /**
     * See {@link ol.format.KMLExtended}
     * @module KMLExtended
     * @alias module:~formats/KMLExtended
     * @param {*} options - options
     * @example
     * import KMLExtended from "gpf-ext-ol/formats/KMLExtended"
     * ou
     * import { KMLExtended } from "gpf-ext-ol"
     */
    constructor(options: any);
    source: any;
    extensions: any;
    /**
     *
     * En lecture, on surcharge la méthode readFeatures.
     * ✔️ In : kml string + features du format original
     * ✔️ Out : features étendus avec des styles, et des metadatas (name ou extendData)
     * > on modifie les features du format original avec les fonctionnalités non gérées.
     *
     * En écriture, on surcharge la méthode writeFearures.
     * ✔️ In : kml du format original + features étendus
     * ✔️ Out : kml étendu avec des styles, et des metadatas (name ou extendData)
     * > on modifie le kml généré par le format original avec les fonctionnalités que nous avons ajoutées aux features.
     *
     * Le principe
     * On parse le kml, et on lit (get) ou on ajoute (set) des fonctionnalités.
     *
     * Les getters vont lire le kml (ex. LabelExtendStyle), et ajouter le style ainsi que le nom du label dans le feature original.
     * getLabelIconStyle (appel des 2 fonctions suivantes)
     * getLabelExtendStyle (New)
     * getHotSpotIconStyle (Bug sur la lecture du  hotspot)
     * getExtendData (New)
     *
     * Les setters vont écrire dans le dom du kml original les fonctionnalités ajoutées dans les features.
     * setLabelExtendStyle (New)
     * setHotSpotIconStyle (Bug sur l'écriture du hotspot)
     * setNameData (Bug suppression de cette balise du format par défaut).
     *
     */
    /**
     * Fonction de lecture du KML avec fonction de traitement en fonction du type
     * PlaceMark (Label ou Marker).
     * Les traitements sont de 2 types :
     *  - creation de styles étendus ou correctifs sur le KML
     *  - ajout de styles étendus sur les features
     *
     * @param {DOMElement} kmlNode - kml nodes
     * @param {Object[]} features - features
     * @param {Object} process - process
     *
     * @example
     * // ajoute des fonctionnalités dans le KML
     * _processKml(kmlDoc, {
     *   labelStyle : createStyleLabel,
     *   iconStyle  : createStyleIcon
     * });
     *
     * // lit des fonctionnalités du KML non impl. par OpenLayers
     * _processKml(kmlNode, {
     *   labelStyle : getStyleToFeatureLabel,
     *   iconStyle  : getStyleToFeatureIcon,
     *   extendedData : getExtendedData
     * });
     */
    _processKml(kmlNode: DOMElement, features: Object[], process: Object): void;
    /**
     * Write Extend for Features.
     * This function overloads ol.format.KML.writeFeatures ...
     *
     * @see ol.format.KML.prototype.writeFeatures
     * @param {Object[]} features - Features.
     * @param {Object} options - Options.
     *
     * @returns {String} kml string formatted
     */
    writeFeatures(features: Object[], options: Object): string;
    /**
     * Write Extended Styles for each features
     *
     * @param {DOMElement} kmlNode - kml nodes
     * @param {Object[]} features - features
     * @param {Object} options - options
     *
     * @returns {String} kml string extended
     *
     * @private
     */
    private _writeExtendStylesFeatures;
    /**
     * ...
     *
     * @param {*} kmlNode - ...
     * @param {*} extensions - ...
     */
    _writeRootExtensions(kmlNode: any, extensions: any): void;
    /**
     * Read Extend for Features.
     * This function overloads ol.format.KML.readFeatures ...
     *
     * @see ol.format.KML.prototype.readFeatures
     * @param {Document|Node} source - Source.
     * @param {olx.format.ReadOptions=} options - options.
     * @returns {Array.<ol.Feature>} Features.
     */
    readFeatures(source: Document | Node, options?: olx.format.ReadOptions | undefined): Array<ol.Feature>;
    /**
     * Read Extended Styles for each features
     *
     * @param {(Document|Node|ArrayBuffer|Object|String)} source - source
     * @param {olx.format.ReadOptions=} options - options
     *
     * @returns {Object[]} features
     *
     * @private
     */
    private _readExtendStylesFeatures;
    /**
     * ...
     * @param {*} key ...
     * @returns {Object} json
     */
    readRootExtensions(key: any): Object;
}
//# sourceMappingURL=KML.d.ts.map