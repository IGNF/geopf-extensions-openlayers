import Helper from "../../Utils/Helper";
import AbstractAdvancedResearch from "./AbstractAdvancedResearch";
import SearchEngineGeocodeIGN from "./SearchEngineGeocodeIGN";

class LocationAdvancedSearch extends AbstractAdvancedResearch {

    /**
    * @constructor
    * @param {AbstractAdvancedResearchOptions} options Options du constructeur
    * 
    * @example
    */
    constructor (options) {
        options = options || {};

        options.name = options.name || "Lieux et toponymes";

        // call ol.control.Control constructor
        super(options);

        /**
         * Nom de la classe (heritage)
         * @private
         */
        this.CLASSNAME = "LocationAdvancedSearch";

        this.element.addEventListener("submit", e => {
            e.preventDefault();
            console.log(e);
        });
    }

    setMap (map) {
        super.setMap(map);
        this.search.setMap(map);
    }
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
        typeSelect.addEventListener("change", (e) => {
            this.filter.category = typeSelect.value;
        });

        // Search input
        const searchContainer = this._getLabelContainer("Renseigner un lieu", "fr-input-group");
        this.search = new SearchEngineGeocodeIGN({
            target : searchContainer,
            historic : "GPAdvancedLocation",
            maximumEntries : 0
        });
        this.search.container.addEventListener("submit", e => {
            e.stopPropagation();
            e.preventDefault();
            this._onSearch();
        }, true);

        // Code postal
        const postalInput = document.createElement("input");
        postalInput.className = "fr-input";
        postalInput.type = "text";
        postalInput.id = Helper.getUid("LocationAdvancedSearch-postal-");
        this._getLabelContainer("Code postal", "fr-input-group", postalInput);
        postalInput.addEventListener("change", () => {
            this.filter.postcode = postalInput.value;
        });

        // Code INSEE
        const inseeInput = document.createElement("input");
        inseeInput.className = "fr-input";
        inseeInput.type = "text";
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
        this.element.querySelectorAll("select").forEach(input => {
            input.value = "";
        });
        this.element.querySelectorAll("input").forEach(input => {
            input.value = "";
        });
        this.filters = {
            category : "",
            postcode : "",
            citycode : ""
        };
    }
    /** Lancer une recheche
     * 
     */
    _onSearch () {
        console.log("search", this);
        const value = this.search.input.value;
        if (value) {
            this.search.searchService._requestGeocoding({
                "index" : "poi",
                "limit" : 1,
                maximumResponses : 1,
                filters : this.filter,
                "returnTrueGeometry" : true,
                "location" : value,
                onSuccess : e => this.search.searchService._onSuccessSearch(e),
                onFailure : e => console.log("ERROR")
            });
        }
    }

}

export default LocationAdvancedSearch;

// Expose LocationAdvancedSearch as ol.control.LocationAdvancedSearch (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.LocationAdvancedSearch = LocationAdvancedSearch;
}
