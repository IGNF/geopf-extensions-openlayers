import Control from "ol/control/Control";
import SearchEngineGeocodeIGN from "./SearchEngineGeocodeIGN";
import Helper from "../../Utils/Helper";

/**
 * Classe représentant un moteur de recherche avancée utilisant le service de géocodage de l'IGN.
 * 
 * @extends {SearchEngineGeocodeIGN}
 * @example
 * import SearchEngineAdvanced from "geopf-controls/Controls/SearchEngine/SearchEngineAdvanced";  
 */
class SearchEngineAdvanced extends Control {

    /**
     * Constructeur.
     * @param {SearchEngineGeocodeIGNOptions} options - Options du constructeur.
     */
    constructor (options) {
        options = options || {};
        // call ol.control.Control constructor

        super(options);
        this.initialize(options);
        this._initContainer(options);
        // this._initEvents(options);
    }

    /**
     * Initialise les options du contrôle.
     *
     * @override
     * @param {SearchEngineGeocodeIGNOptions} options - Options du constructeur.
     */
    initialize (options) {
        /**
         * Nom de la classe (heritage)
         * @private
        */
        this.CLASSNAME = "SearchEngineAdvanced";
    }

    /**
     * Fonction d'ajout du contrôle.
     * @override
     * @param {import("ol/Map.js").default|null} map - Carte à laquelle ajouter le contrôle.
     */
    setMap (map) {
        if (this.getMap() && this.baseSearchEngine) {
            this.getMap().removeControl(this.baseSearchEngine);
        }
        super.setMap(map);
        if (this.baseSearchEngine) {
            this.baseSearchEngine.setMap(map);
        }
    }

    /**
     * Ajoute le contrôle à la carte.
     * @override
     * @param {import("ol/Map.js").default|null} map - Carte à laquelle ajouter le contrôle.
     */
    _initContainer (options) {
        // Gestion de l'affichage des options avancées
        const element = this.element = document.createElement("div");
        element.className = "GPwidget gpf-widget";
        element.id = Helper.getUid("GPsearchEngine-Advanced-");

        // Default base search engine
        const baseContainer = this.advancedContainer = document.createElement("div");
        this.element.appendChild(baseContainer);
        options.target = baseContainer;
        this.baseSearchEngine = new SearchEngineGeocodeIGN(options);
        this.baseSearchEngine.on(["select", "search", "autocomplete"], (e) => {
            this.dispatchEvent(e);
        });

        // Geolocation
        const locationBtn = document.createElement("button");
        locationBtn.innerText = "Me géolocaliser";
        locationBtn.className = "GPSearchEngine-locate fr-btn fr-icon-arrow-up-s-line fr-btn--icon-left fr-btn--tertiary-no-outline";
        this.baseSearchEngine.autocompleteHeader.appendChild(locationBtn);

        // Ajout des options avancées
        const advancedBtn = document.createElement("button");
        advancedBtn.className = "GPSearchEngine-advanced-btn fr-btn fr-icon-arrow-up-s-line fr-btn--icon-right fr-btn--tertiary-no-outline";
        advancedBtn.id = Helper.getUid("GPSearchEngine-advanced-btn-");
        advancedBtn.type = "button";
        advancedBtn.title = "Avancée";
        advancedBtn.innerHTML = "Avancée";
        advancedBtn.setAttribute("aria-label", "Afficher les options avancées");
        advancedBtn.setAttribute("aria-expanded", "false");
        this.baseSearchEngine.optionscontainer.appendChild(advancedBtn);

        // Gestion de l'affichage des options avancées
        const advancedContainer = this.advancedContainer = document.createElement("div");
        advancedContainer.className = "GPAdvancedContainer";
        advancedContainer.id = Helper.getUid("GPsearchEngine-AdvancedContainer-");
        advancedContainer.setAttribute("aria-labelledby", advancedBtn.id);
        this.element.appendChild(advancedContainer);
        this.advancedContainer.innerHTML = "<i>Formulaires spécifiques</i>";

        // Gestion du bouton avancé
        advancedBtn.setAttribute("aria-controls", advancedContainer.id);
        advancedBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const isHidden = advancedBtn.getAttribute("aria-expanded") === "false";
            advancedBtn.setAttribute("aria-expanded", isHidden);
            this.baseSearchEngine.setActive(isHidden);
        });
    }

}

export default SearchEngineAdvanced;

// Expose SearchEngine as ol.control.SearchEngine (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.SearchEngineAdvanced = SearchEngineAdvanced;
}