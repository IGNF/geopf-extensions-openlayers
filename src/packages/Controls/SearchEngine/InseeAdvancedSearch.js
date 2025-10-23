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

        this.inseeInput.input.pattern = "(\\d\\d|2[A,B,a,b])\\d{3}";
        this.inseeInput.input.title = "Code INSEE sur 5 caractères";

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
        const pattern = this.inseeInput.input.pattern;
        const insee = this.inseeInput.input.value;

        if (RegExp(pattern).test(insee)) {
            this.inseeInput.removeMessages();
            this.inseeInput.search({
                location : insee,
                filters : {
                    cityCode : insee,
                }
            });
        } else {
            this.inseeInput.addMessage("Le champs INSEE n'est pas valide (texte de 5 chiffres).");
        }
    }

}

export default InseeAdvancedSearch;

// Expose InseeAdvancedSearch as ol.control.InseeAdvancedSearch (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.InseeAdvancedSearch = InseeAdvancedSearch;
}
