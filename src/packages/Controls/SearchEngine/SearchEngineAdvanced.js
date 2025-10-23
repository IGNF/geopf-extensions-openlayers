import Control from "ol/control/Control";
import Geolocation from "ol/Geolocation";
import OlFeature from "ol/Feature";
import Point from "ol/geom/Point";
import SearchEngineGeocodeIGN from "./SearchEngineGeocodeIGN";
import Helper from "../../Utils/Helper";
import Select from "ol/interaction/Select";

import Vector from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

import Overlay from "ol/Overlay.js";

import { Style, Icon, Stroke, Fill } from "ol/style";
import mapPinIcon from "./map-pin-2-fill.svg";
import Feature from "ol/Feature";
import { Layer } from "ol/layer";
const color = "rgba(0, 0, 145, 1)";

const createStyle = (feature) => {
    const geometryType = feature.getGeometry().getType();

    switch (geometryType) {
        case "Point":
        case "MultiPoint":
            return new Style({
                image : new Icon({
                    src : mapPinIcon,
                    color : [0, 0, 145, 1],
                }),
            });

        case "LineString":
        case "MultiLineString":
            return new Style({
                stroke : new Stroke({
                    color : color,
                    width : 3,
                }),
            });

        case "Polygon":
        case "MultiPolygon":
            return new Style({
                stroke : new Stroke({
                    color : color,
                    lineDash : [8, 8], 
                    width : 2,
                }),
                fill : new Fill({
                    color : "rgba(0, 0, 0, 0.1)",
                    opacity : 0.8
                }),
            });

        default:
            return new Style();
    }
};

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


        this.layer = new Vector({
            source : new VectorSource({}),
            zIndex : Infinity,
            style : createStyle,
        });
        this.extent = new Vector({
            source : new VectorSource({}),
            zIndex : Infinity,
            style : createStyle,
        });

        this.selectInteraction = new Select({
            layers : [this.layer, this.extent],
            style : createStyle,
        });

        this.selectInteraction.on("select", this._onSelectElement.bind(this));
        this.popup = this._createPopup();


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

        /**
         * @type {Object<Feature, Layer>}
         */
        this._layerFeatureAssociation = {};

        if (options.advancedSearch && options.advancedSearch instanceof Array) {
            this._searchForms = options.advancedSearch;
        } else {
            this._searchForms = [];
        }

        this._searchForms.forEach(search => {
            search.on("search", this.onAdvancedSearchResult.bind(this));
        });
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
        this._searchForms.forEach(search => {
            search.setMap(map);
        });

        this.element.appendChild(this.advancedContainer);

        if (map) {
            // Place les couches au dessus des autres
            this.extent.setMap(map);
            this.layer.setMap(map);
            map.addInteraction(this.selectInteraction);
            map.addOverlay(this.popup);
        }
    }

    _initEvents (options) {
        this.geolocation.on("change:position", () => {
            const pt = new Point(this.geolocation.getPosition());
            pt.transform("EPSG:4326", this.getMap().getView().getProjection());
            const evt = this.createEvent(pt, "Ma localisation");
            this.addResultToMap(evt);
            this.dispatchEvent(evt);
            this.geolocation.setTracking(false);
        });

        this.baseSearchEngine.input.addEventListener("keydown", function (/** @type {KeyboardEvent} */ e) {
            if (e.key === "Tab" && !e.shiftKey && this.locationBtn.checkVisibility()) {
                e.preventDefault();
                this.locationBtn.focus();
            }
        }.bind(this));

        this.locationBtn.addEventListener("keydown", function (/** @type {KeyboardEvent} */ e) {
            if (e.key === "Tab") {
                e.preventDefault();
                if (e.shiftKey) {
                    // Retourne sur l'input
                    this.baseSearchEngine.input.focus();
                } else {
                    // Focus sur le bouton de recherche avancée
                    this.advancedBtn.focus();
                }
            }
        }.bind(this));

        this.on("search", this.addResultToMap.bind(this));
    }

    /** Display result on map
     * @param {Object|Point|OlFeature} obj objet a afficher
     * @param {String} [info] Popup info
     */
    createEvent (obj, info) {
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
        return evt;
    }


    /**
     * Créé le conteneur
     * 
     * @param {Object} options Options du constructeur
     */
    _initContainer (options) {
        // Gestion de l'affichage des options avancées
        const element = this.element = document.createElement("div");
        element.className = "GPwidget gpf-widget";
        element.id = Helper.getUid("GPsearchEngine-Advanced-");

        // Default base search engine
        // const baseContainer = this.baseContainer = document.createElement("div");
        // this.element.appendChild(baseContainer);
        options.target = this.element;
        options.searchButton = true;
        options.search = true;
        this.baseSearchEngine = new SearchEngineGeocodeIGN(options);
        this.baseSearchEngine.on(["select", "search", "autocomplete"], (e) => {
            this.dispatchEvent(e);
        });

        // Geolocation
        this.locationBtn = this._getGeolocButton();
        this.baseSearchEngine.autocompleteHeader.appendChild(this.locationBtn);

        // Ajout des options avancées
        const advancedBtn = this.advancedBtn = document.createElement("button");
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
        // baseContainer.appendChild(advancedContainer);

        // Geolocation
        advancedContainer.appendChild(this._getGeolocButton());

        // Formulaires specifiques
        this._searchForms.forEach(Search => {
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
            button.innerText = Search.getName();
            title.appendChild(button);
            // Accordion
            const accordion = document.createElement("div");
            accordion.className = "fr-collapse";
            accordion.id = Helper.getUid("accordion-");
            button.setAttribute("aria-controls", accordion.id);
            section.appendChild(accordion);

            // Contenu recherche avancée
            Search.setTarget(accordion);

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
                Search.dispatchEvent({ type : "expand", expanded : !expanded });
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


    addResultToMap (e) {
        this._closePopup();
        this.layer.getSource().clear();
        this.extent.getSource().clear();
        let extent;
        if (!!e.result) {
            this.layer.getSource().addFeature(e.result);
            // Ajout de la couche pour la retrouver plus tard
            this._layerFeatureAssociation[e.result.ol_uid] = this.layer;
            extent = e.result.getGeometry().getExtent();
        }
        if (!!e.extent) {
            this.extent.getSource().addFeature(e.extent);
            // Ajout de la couche pour la retrouver plus tard
            this._layerFeatureAssociation[e.extent.ol_uid] = this.extent;
            extent = e.extent.getGeometry().getExtent();
        }
        if (this.getMap()) {
            let view = this.getMap().getView();
            if (extent) {
                view.fit(extent);
                if (view.getZoom() > 15) {
                    view.setZoom(15);
                }
            }
        }
    }


    /**
     * 
     * @param {import("ol/interaction/Select").SelectEvent} e Événement de séléction
     */
    _onSelectElement (e) {
        let position = e.mapBrowserEvent.coordinate;
        if (e.selected.length) {
            // Ferme l'ancien popup
            this.popup.setPosition(undefined);
            // Ajoute le popup
            const feature = e.selected[0];
            if (feature.getGeometry().getType() === "Point") {
                // Place le popup sur le point
                position = feature.getGeometry().getCoordinates();
            }
            this.popup.setPosition(position);
            this.setPopupContent(feature.get("infoPopup") || "");
            this.popup.set("feature", feature);
            // Récupère la couche liée;
            const layer = this._layerFeatureAssociation[feature.ol_uid];
            this.popup.set("layer", layer);
        } else {
            this.popup.setPosition(undefined);
            this.setPopupContent("");
            this.popup.unset("feature");
            this.popup.unset("layer");
        }
    }

    _createPopup () {
        // Popup global
        let element = this._popupDiv = document.createElement("div");
        // TODO : ajouter gp-feature-info-div lorsque les deux seront pareils
        element.className = "GPSearchPopup";

        // Contenu du popup
        let popupContent = this._popupContent = document.createElement("div");
        popupContent.className = "GPPopupContent";

        // Groupe de boutons
        let popupBtns = this._popupBtns = document.createElement("div");
        popupBtns.className = "GPButtonGroups gpf-btns-group";

        popupBtns.appendChild(this._addCloseButton());
        popupBtns.appendChild(this._addRemoveButton());

        element.appendChild(popupContent);
        element.appendChild(popupBtns);

        const overlay = new Overlay({
            element : element,
            positioning : "bottom-center",
        });

        return overlay;
    }

    setPopupContent (content) {
        this._popupContent.innerHTML = content;
    }

    _addCloseButton () {
        let closer = document.createElement("button");
        closer.title = closer.ariaLabel = "Fermer la pop-up";
        closer.textContent = "Fermer";
        closer.className = "GPButton gpf-btn fr-icon-close-line fr-btn fr-btn--sm gpf-btn--tertiary  fr-btn--tertiary-no-outline";

        // Ferme le popup
        closer.onclick = this._closePopup.bind(this);
        return closer;
    }

    _closePopup () {
        this.selectInteraction.getFeatures().clear();
        if (this.popup !== null) {
            this.popup.setPosition(undefined);
        }
        return false;
    }

    _addRemoveButton () {
        let remove = document.createElement("button");
        remove.title = remove.ariaLabel = "Supprimer le marqueur";
        remove.textContent = "Supprimer";
        remove.className = "GPButton gpf-btn fr-icon-delete-line fr-btn fr-btn--sm gpf-btn--tertiary fr-btn--tertiary-no-outline";

        // Supprime la feature
        remove.onclick = this._removeFeature.bind(this);

        return remove;
    }

    _removeFeature () {
        const f = this.popup.get("feature");
        const layer = this.popup.get("layer");
        // Supprime la feature
        if (layer && f) {
            layer.getSource().removeFeature(f);

            this.dispatchEvent({
                type : this.REMOVE_FEATURE_EVENT,
                feature : f,
                layer : layer,
            });

            // Ferme le popup
            this._closePopup();
        }
    }

    _getGeolocButton () {
        const locationBtn = document.createElement("button");
        locationBtn.innerText = "Me géolocaliser";
        locationBtn.className = "GPSearchEngine-locate fr-btn fr-btn--sm fr-icon-crosshair-2-line fr-btn--icon-left fr-btn--tertiary-no-outline";
        locationBtn.addEventListener("click", () => {
            this.geolocation.setTracking(true);
            console.log("tracking", this.geolocation);
        });
        return locationBtn;
    }

    onAdvancedSearchResult (e) {
        if (e.result instanceof Array) {
            // TODO : GÉRER MULTIPLE RÉSULTATS
        } else if (e.result instanceof Feature) {
            this.addResultToMap(e);
        }
    }

}

export default SearchEngineAdvanced;

// Expose SearchEngine as ol.control.SearchEngine (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.SearchEngineAdvanced = SearchEngineAdvanced;
}