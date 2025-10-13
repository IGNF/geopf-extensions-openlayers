import Control from "ol/control/Control";
import Geolocation from "ol/Geolocation";
import OlFeature from "ol/Feature";
import Point from "ol/geom/Point";
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

        // Geolocation
        this.geolocation = new Geolocation({
            // enableHighAccuracy must be set to true to have the heading value.
            trackingOptions : {
                enableHighAccuracy : true,
            },
            projection : "EPSG:4326",
        });

        this._searchForms = ["form1", "form2", "form3"];

        // Initialize
        this.initialize(options);
        this._initContainer(options);
        this._initEvents(options);
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

    _initEvents (options) {
        this.geolocation.on("change:position", () => {
            const pt = new Point(this.geolocation.getPosition());
            pt.transform("EPSG:4326", this.getMap().getView().getProjection());
            const evt = this.addResultToMap (pt, "Ma localisation");
            this.dispatchEvent(evt);
            this.geolocation.setTracking(false);
        });
    }

    /** Display result on map
     * @param {Object|Point|OlFeature} e objet a afficher
     * @param {String} [info] Popup info
     */
    addResultToMap (obj, info) {
        let evt = obj;
        if (obj instanceof OlFeature) {
            evt = {
                result : obj,
                extent : null
            };
        } else if (obj instanceof Point) {
            evt = {
                result : new OlFeature(obj),
                extent : null
            };
        }
        if (info) {
            evt.result.set("infoPopup", info);
        }
        evt.type = "search";
        this.baseSearchEngine.addResultToMap(evt);
        return evt;
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
        this.baseSearchEngine.autocompleteHeader.appendChild(this._getGeolocButton());

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

        // Geolocation
        advancedContainer.appendChild(this._getGeolocButton());

        // Formulaires specifiques
        this._searchForms.forEach(form => {
            const section = document.createElement("section");
            section.className = "fr-accordion";
            advancedContainer.appendChild(section);
            const title = document.createElement("h3");
            title.className = "fr-accordion__title";
            section.appendChild(title);
            const button = document.createElement("button");
            button.type = "button";
            button.className = "fr-accordion__btn";
            button.setAttribute("aria-expanded", "false");
            button.innerText = form;
            section.appendChild(button);
            // Accordion
            const accordion = document.createElement("div");
            accordion.className = "fr-collapse";
            accordion.id = Helper.getUid("accordion-");
            button.setAttribute("aria-controls", accordion.id);
            section.appendChild(accordion);
            // Content
            const atitle = document.createElement("h4");
            atitle.className = "fr-h4";
            accordion.appendChild(atitle);
            const aform = document.createElement("p");
            aform.innerText = "Lorem ipsum dolor sit amet";
            accordion.appendChild(aform);
            // Handle collapsing
            button.addEventListener("click", () => {
                const expanded = button.getAttribute("aria-expanded") === "true";
                advancedContainer.querySelectorAll("section").forEach(sec => {
                    sec.querySelector(".fr-collapse").classList.remove("fr-collapse--expanded");
                    sec.querySelector("button").setAttribute("aria-expanded", "false");
                    advancedContainer.dataset.open = !expanded;
                    if (!expanded) {
                        sec.classList.add("fr-hidden");
                    } else {
                        sec.classList.remove("fr-hidden");
                    }
                });
                if (!expanded) {
                    button.setAttribute("aria-expanded", "true");
                    accordion.classList.add("fr-collapse--expanded");
                    section.classList.remove("fr-hidden");
                }
            });
        });

        // Gestion du bouton avancé
        advancedBtn.setAttribute("aria-controls", advancedContainer.id);
        advancedBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const isHidden = advancedBtn.getAttribute("aria-expanded") === "false";
            advancedBtn.setAttribute("aria-expanded", isHidden);
            this.baseSearchEngine.setActive(isHidden);
        });
    }

    _getGeolocButton () {
        const locationBtn = document.createElement("button");
        locationBtn.innerText = "Me géolocaliser";
        locationBtn.className = "GPSearchEngine-locate fr-btn fr-btn--sm  fr-btn--icon-left fr-btn--tertiary-no-outline gpf-btn-icon-search-geolocate";
        locationBtn.addEventListener("click", () => {
            this.geolocation.setTracking(true);
            console.log("tracking", this.geolocation);
        });
        return locationBtn;
    }

}

export default SearchEngineAdvanced;

// Expose SearchEngine as ol.control.SearchEngine (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.SearchEngineAdvanced = SearchEngineAdvanced;
}