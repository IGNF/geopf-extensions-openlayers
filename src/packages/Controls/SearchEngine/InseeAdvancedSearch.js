// import CSS
import AbstractAdvancedSearch from "./AbstractAdvancedSearch";
import Logger from "../../Utils/LoggerByDefault";
import Collection from "ol/Collection";
import SearchEngineGeocodeIGN from "./SearchEngineGeocodeIGN";
import { InseeSearchService } from "./Service";

var logger = Logger.getLogger("abstractAdvancedSearch");


/**
 * @classdesc
 * AbstractAdvancedSearch Base control
 *
 * @alias ol.control.InseeAdvancedSearch
 * @module InseeAdvancedSearch
*/
class InseeAdvancedSearch extends AbstractAdvancedSearch {

    /**
    * @constructor
    * @example
    */
    constructor (options) {
        super(options);

        this.inseeInput.on("search", function (e) {
            this.dispatchEvent(e);
        }.bind(this));
    }

    initialize (options) {
        if (!options.name) {
            options.name = "Code INSEE";
        }
        super.initialize(options);

        /**
         * Nom de la classe (heritage)
         * @private
         */
        this.CLASSNAME = "InseeAdvancedSearch";
    }

    /**
     * Ajoute des éléments d'input dans la collection `this.inputs`;
     * Cette méthode est abstraite et doit être surchargée dans les autres classes.
     * @protected
     * @abstract
     */
    addInputs () {
        super.addInputs();

        let inseeInput = this.inseeInput = new SearchEngineGeocodeIGN({
            label : "Code INSEE",
            hint : "Format attendu INSEE : 5 chiffres, selon le code officiel géographique (COG)",
            searchService : new InseeSearchService({
                autocomplete : false,
                searchOptions : {
                    serviceOptions : {
                        fields : ["postcode"],
                    },
                },
            })
        });

        this.inputs.push(inseeInput);
    }

    _initEvents (options) {
        super._initEvents(options);

        this.inseeInput.input.onkeydown = function (e) {
            if (e.key === "Enter") {
                this.element.requestSubmit(this.searchBtn);
            }
        }.bind(this);
    }

    /**
     * 
     * @param {PointerEvent} e
     * @protected
     */
    _onSearch (e) {
        super._onSearch(e);
        const insee = this.inseeInput.input.value;

        const count = insee.length;
        const number = parseInt(insee, 10);
        if (!isNaN(number) && 0 <= number <= 99999 && count === 5) {
            this.inseeInput.removeMessages();
            this.inseeInput.search({
                location : insee,
                filters : {
                    cityCode : insee,
                }
            });
        } else {
            this.inseeInput.addMessage("Le champs INSEE doit être un texte de 5 chiffres exactement");
        }
    }

}

export default InseeAdvancedSearch;

// Expose InseeAdvancedSearch as ol.control.InseeAdvancedSearch (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.InseeAdvancedSearch = InseeAdvancedSearch;
}
