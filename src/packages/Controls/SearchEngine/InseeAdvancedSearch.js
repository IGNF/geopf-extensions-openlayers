// import CSS
import AbstractAdvancedSearch from "./AbstractAdvancedSearch";
import Logger from "../../Utils/LoggerByDefault";
import SearchEngineGeocodeIGN from "./SearchEngineGeocodeIGN";
import InseeSearchService from "../../Services/InseeSearchService";

var logger = Logger.getLogger("abstractAdvancedSearch");

// Voir les typedefs réutilisables (types partagés) dans le dossier SearchEngine si nécessaire.

/**
 * @classdesc
 * Contrôle de recherche avancée pour les codes INSEE.
 *
 * @alias ol.control.InseeAdvancedSearch
 * @module InseeAdvancedSearch
 * @extends AbstractAdvancedSearch
 */
class InseeAdvancedSearch extends AbstractAdvancedSearch {

    /**
     * @constructor
     * @param {AbstractAdvancedSearchOptions} [options] - Options du contrôle.
     */
    constructor (options) {
        super(options);

        this.inseeInput.on("search", function (e) {
            this.dispatchEvent(e);
        }.bind(this));
    }

    /**
     * 
     * @param {AbstractAdvancedSearchOptions} options Options de recherche avancée
     * @override
     * @protected
     */
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
     * Ajoute les inputs spécifiques au contrôle (surcouche du parent).
     * Crée et configure l'input INSEE.
     * @protected
     * @returns {void}
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

    /**
     * Initialise les événements DOM spécifiques.
     * @protected
     * @param {AbstractAdvancedSearchOptions} options - Options d'initialisation (transmises depuis le parent).
     * @override
     */
    _initEvents (options) {
        super._initEvents(options);

        this.inseeInput.input.onkeydown = function (e) {
            if (e.key === "Enter") {
                this.element.requestSubmit(this.searchBtn);
            }
        }.bind(this);
    }

    /**
     * Handler de la recherche déclenchée (bouton / submit).
     * Valide le code INSEE puis lance la recherche via le SearchEngine associé.
     * @protected
     * @param {PointerEvent|Event} e - Événement de recherche.
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
