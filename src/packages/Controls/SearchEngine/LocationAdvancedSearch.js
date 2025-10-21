import Helper from "../../Utils/Helper";
import AbstractAdvancedSearch from "./AbstractAdvancedSearch";
import IGNSearchService from "./Service";

class LocationAdvancedSearch extends AbstractAdvancedSearch {

    /**
    * @constructor
    * @param {AbstractAdvancedSearchOptions} options Options du constructeur
    * 
    * @example
    */
    constructor (options) {
        options = options || {};

        options.name = options.name || "Lieux et toponymes";

        // call ol.control.Control constructor
        super(options);

        // Search service
        this.searchService = new IGNSearchService({
            index : "poi",
            limit : 1,
            returnTrueGeometry : true
        });
        // Do something on search
        this.searchService.on("search", function (e) {
            this.dispatchEvent(e);
        }.bind(this));
    }

    initialize (options) {
        super.initialize(options);
        /**
         * Nom de la classe (heritage)
         * @private
         */
        this.CLASSNAME = "LocationAdvancedSearch";
    }
    /*
    setMap (map) {
        super.setMap(map);
        this.search.setMap(map);
    }
    */
    _getLabelContainer (text, type, input) {
        const container = document.createElement("div");
        container.className = type;
        this.inputs.push(container);
        const label = document.createElement("label");
        label.className = "fr-label";
        label.innerText = text;
        container.appendChild(label);
        if (input) {
            label.setAttribute("for", input.id);
            container.appendChild(input);
        }
        return container;
    }
    /** Add inputs
     * 
     */
    addInputs () {
        super.addInputs();
        // Type
        const typeSelect = document.createElement("select");
        typeSelect.className = "fr-select";
        typeSelect.id = typeSelect.name = Helper.getUid("LocationAdvancedSearch-type-");
        this._getLabelContainer("Type", "fr-select-group", typeSelect);
        /* Liste des types
        fetch("https://data.geopf.fr/geocodage/getCapabilities").then(response => {
            return response.json();
        }).then (json => {
            console.log(json);
        }).catch(() => {
            console.log("error");
        });
        */
        const typeList = [ "Administratif", "Aérodrome", "Cimetière", "Construction ponctuelle", "Construction surfacique", "Cours d'eau" ];
        typeList.forEach(k => {
            const typeOption = document.createElement("option");
            typeOption.value = k.toLowerCase();
            typeOption.innerText = k;
            typeSelect.appendChild(typeOption);
        });
        typeSelect.addEventListener("change", () => {
            this.filter.category = typeSelect.value;
        });

        // Search input
        const searchInput = this.searchInput = document.createElement("input");
        searchInput.className = "fr-input";
        searchInput.type = "text";
        searchInput.name = "search";
        searchInput.id = Helper.getUid("LocationAdvancedSearch-search-");
        this._getLabelContainer("Renseigner un lieu", "fr-input-group", searchInput);

        // Code postal
        const postalInput = document.createElement("input");
        postalInput.className = "fr-input";
        postalInput.type = "text";
        postalInput.name = "postalCode";
        postalInput.pattern = "(\\d{5}";
        postalInput.title = "Code postal à 5 chiffres";
        postalInput.id = Helper.getUid("LocationAdvancedSearch-postal-");
        this._getLabelContainer("Code postal", "fr-input-group", postalInput);
        postalInput.addEventListener("change", () => {
            this.filter.postcode = postalInput.value;
        });

        // Code INSEE
        const inseeInput = document.createElement("input");
        inseeInput.className = "fr-input";
        inseeInput.name = "cityCode";
        inseeInput.type = "text";
        postalInput.pattern = "(\\d\\d|2[A,B,a,b])\\d{3}";
        postalInput.title = "Code INSEE sur 5 caractères";
        inseeInput.id = Helper.getUid("LocationAdvancedSearch-insee-");
        this._getLabelContainer("Code INSEE", "fr-input-group", inseeInput);
        inseeInput.addEventListener("change", () => {
            this.filter.citycode = inseeInput.value;
        });

        this.filter = {
            category : typeSelect.value,
            postcode : postalInput.value,
            citycode : inseeInput.value
        };
    }
    _onErase (e) {
        super._onErase(e);
        this.element.querySelectorAll("select").forEach(input => {
            input.value = "";
        });
        this.element.querySelectorAll("input").forEach(input => {
            input.value = "";
        });
        this.filter = {
            category : "",
            postcode : "",
            citycode : ""
        };
    }
    /** Lancer une recheche
     * 
     */
    _onSearch (e) {
        super._onSearch(e);
        const value = this.searchInput.value;
        if (value) {
            this.searchService.search(value, this.filter);
        }
    }

}

export default LocationAdvancedSearch;

// Expose LocationAdvancedSearch as ol.control.LocationAdvancedSearch (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.LocationAdvancedSearch = LocationAdvancedSearch;
}
