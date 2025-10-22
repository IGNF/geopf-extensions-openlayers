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
            limit : 10,
            returnTrueGeometry : true
        });
        // Do something on search
        this.searchService.on("search", function (e) {
            if (!e.multi) {
                this.searchResult.innerHTML = "";
            }
            // Format output
            if (e.nbResults === 1) {
                const attr = e.attr || this.searchService.getResult(0).placeAttributes;
                ["postcode","citycode","city","category"].forEach(field => {
                    attr[field] = attr[field] || [];
                });
                const into = {
                    infoPopup : "<strong>" + attr.toponym + "</strong><br/>" +
                    (attr.category ? ("<em>" + (attr.category || []).join(", ") + "</em><br/>") : "") +
                    (attr.postcode ? ("Code postal : " + (attr.postcode || []).join(", ") + "<br/>") : "") ,
                    toponyme : attr.toponym,
                    postcode : attr.postcode[0],
                    postcodes : attr.postcode.join(" - "),
                    insee : attr.citycode[0],
                    citycodes : attr.citycode.join(" - "),
                    city : attr.city[0],
                    citys : attr.city.join(" - "),
                    category : attr.category[0],
                    categories : attr.category.join(" - ")
                };

                if (e.result) {
                    e.result.setProperties(into);
                }
                if (e.extent) {
                    e.extent.setProperties(into);
                }
                this.dispatchEvent(e);
            } else {
                this.element.parentElement.parentElement.scrollTop = 0;
                if (e.nbResults === 0) {
                    this.searchResult.innerHTML = "<li>Aucun résultat</li>" ;
                } else {
                    this.handleMultipleResults(e);
                }
            }
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
    /** Handle multiresults: display list for selct/search
     * @param {Object} e Event
     */
    handleMultipleResults (e) {
        const results = this.searchService.getResult();
        results.forEach((result, i) => {
            const attr = result.placeAttributes;
            const li = document.createElement("li");
            li.className = "search-result-item" + (i>=5 ? " hidden" : "");
            li.title = li.innerText = attr.toponym + " (" + (attr.category || []).join(", ") + ") - " +  (attr.city || []).join(", ");
            this.searchResult.appendChild(li);
            li.addEventListener("click", () => {
                const features = this.searchService.getResultFeatures(i);
                const event = {
                    type : "search",
                    multi : true,
                    attr : attr,
                    extent : features.extent,
                    result : features.feature,
                    nbResults : 1
                };
                this.searchService.dispatchEvent(event);
            });
        });
        // Actions
        const li = document.createElement("li");
        this.searchResult.appendChild(li);
        // more options
        if (results.length > 5) {
            const plusBtn = document.createElement("button");
            plusBtn.className = "fr-btn fr-btn--sm fr-btn--tertiary";
            plusBtn.innerText = "Afficher plus de résultats";
            plusBtn.addEventListener("click", () => {
                plusBtn.remove();
                this.searchResult.querySelectorAll(".hidden").forEach(el => {
                    el.classList.remove("hidden");
                });
            });
            li.appendChild(plusBtn);
        }
        // clear button
        li.className = "search-result-actions";
        const okBtn = document.createElement("button");
        okBtn.className = "fr-btn fr-btn--sm fr-btn--tertiary";
        okBtn.innerText = "OK";
        okBtn.addEventListener("click", () => {
            this.searchResult.innerHTML = "";
        });
        li.appendChild(okBtn);

        // Par defaut on selectionne le premier resultat
        // this.dispatchEvent(e);
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

        this.searchResult = document.createElement("ul");
        this.searchResult.className = "search-result";
        this.inputs.push(this.searchResult);

        // Legend
        const legend = document.createElement("legend");
        legend.className = "fr-fieldset__legend";
        legend.id = Helper.getUid("LocationAdvancedSearch-legend-");
        legend.innerText = "* champs obligatoires";
        this.inputs.push(legend);

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
        searchInput.setAttribute("minlength", "3");
        searchInput.required = true;
        searchInput.id = Helper.getUid("LocationAdvancedSearch-search-");
        this._getLabelContainer("Renseigner un lieu *", "fr-input-group", searchInput);

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
        inseeInput.pattern = "(\\d\\d|2[A,B,a,b])\\d{3}";
        inseeInput.title = "Code INSEE sur 5 caractères";
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
        this.searchResult.innerHTML = "";
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
