// import CSS
import AbstractAdvancedResearch from "./AbstractAdvancedResearch";
import Logger from "../../Utils/LoggerByDefault";
import Collection from "ol/Collection";
import Helper from "../../Utils/Helper";

var logger = Logger.getLogger("abstractAdvancedResearch");


/**
 * @classdesc
 * AbstractAdvancedResearch Base control
 *
 * @alias ol.control.InseeAdvancedResearch
 * @module InseeAdvancedResearch
*/
class InseeAdvancedResearch extends AbstractAdvancedResearch {

    /**
    * @constructor
    * @example
    */
    constructor (options) {
        super(options);
        /**
         * Nom de la classe (heritage)
         * @private
         */
        this.CLASSNAME = "InseeAdvancedResearch";
    }

    /**
     * Ajoute des éléments d'input dans la collection `this.inputs`;
     * Cette méthode est abstraite et doit être surchargée dans les autres classes.
     * @protected
     * @abstract
     */
    addInputs () {
        super.addInputs();
        const inseeInput = document.createElement("input");
        inseeInput.type = "text";
        this.inputs.push(inseeInput);
    }

    /**
     * 
     * @param {PointerEvent} e
     * @abstract
     * @protected
     */
    _onSearch (e) {
        console.log(e);
    }

}

export default InseeAdvancedResearch;

// Expose InseeAdvancedResearch as ol.control.InseeAdvancedResearch (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.InseeAdvancedResearch = InseeAdvancedResearch;
}
