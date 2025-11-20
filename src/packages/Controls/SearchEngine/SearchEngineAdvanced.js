import Control from "../Control";
import Geolocation from "ol/Geolocation";
import OlFeature from "ol/Feature";
import Point from "ol/geom/Point";
import SearchEngineGeocodeIGN from "./SearchEngineGeocodeIGN";
import Helper from "../../Utils/Helper";
import Select, { SelectEvent } from "ol/interaction/Select";
import Map from "ol/Map";

import Vector from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

import Overlay from "ol/Overlay.js";

import { Style, Icon, Stroke, Fill } from "ol/style";
import mapPinIcon from "./map-pin-2-fill.svg";
import Feature from "ol/Feature";
import { Layer } from "ol/layer";
import AbstractAdvancedSearch from "./AbstractAdvancedSearch";

/** Get style for features 
 * @param {String|Array<Number>} color - Couleur du contour
 * @param {String|Array<Number>} [fillColor] - Couleur de remplissage
 * @returns {Style} Style OpenLayers
 */
function getStyle (color, fillColor) {
    return new Style({
        image : new Icon({
            src : mapPinIcon,
            color : color,
            anchor : [0.5, 1],
        }),
        stroke : new Stroke({
            color : color,
            lineDash : [8, 8], 
            width : 2,
        }),
        fill : new Fill({
            color : fillColor || "rgba(0, 0, 0, 0.1)",
        }),
    });
}

/**
 * @classdesc
 * Contrôle de recherche avancée permettant de rechercher via d'autres manières.
 * Gère aussi l'ajout des élements sur la carte etc.
 *
 * @extends {Control}
 * @module SearchEngineAdvanced
 */
class SearchEngineAdvanced extends Control {

    /**
     * Constructeur du contrôle de recherche avancée.
     * @param {SearchEngineAdvancedOptions} options - Options du constructeur.
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
            style : getStyle([0, 0, 145, 1]),
        });

        this.selectInteraction = new Select({
            layers : [this.layer],
            style : getStyle([145, 0, 0, 1], [145, 0, 0, 0.2]),
        });

        // Initialize
        this.initialize(options);
        this._initContainer(options);
        this._initEvents(options);

        options.popupButtons = options.popupButtons ? options.popupButtons : [];

        this.selectInteraction.on("select", this._onSelectElement.bind(this));
        this.popup = this._createPopup(options.popupButtons);
    }

    /**
     * Initialise les options du contrôle.
     * @param {SearchEngineAdvancedOptions} options - Options du constructeur.
     * @private
     */
    initialize (options) {
        /**
         * Nom de la classe (heritage)
         * @private
        */
        this.CLASSNAME = "SearchEngineAdvanced";

        /**
         * @type {Array<AbstractAdvancedSearch>}
         */
        this._searchForms;

        /**
         * Si vrai, écoute les clics sur le document pour gérer
         * la modale de recherche avancée
         * @type {Boolean}
         */
        this.listenToClick = false;

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
     * @override
     * @param {Map|null} map Carte cible
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
            this.layer.setMap(map);
            map.addInteraction(this.selectInteraction);
            map.addOverlay(this.popup);
        }
    }

    /**
     * Retourne la couche utilisée pour afficher les résultats.
     * @returns {Layer} Couche des résultats
     */
    getLayer () {
        return this.layer;
    }

    /**
     * Initialise les événements du contrôle (géolocalisation, navigation clavier, recherche).
     * @param {SearchEngineAdvancedOptions} options Options du constructeur.
     * @private
     */
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
                } else if (this.advancedBtn.checkVisibility()) {
                    // Focus sur le bouton de recherche avancée
                    this.advancedBtn.focus();
                } else {
                    this.eraseBtn.focus();
                }
            }
        }.bind(this));

        this.on("search", this.addResultToMap.bind(this));

        // Gère le cas du conteneur de recherche avancée
        ["mousedown", "focusin"].map(eventListener => document.addEventListener(eventListener, this._onDocumentClick.bind(this)));

        this.advancedBtn.addEventListener("blur", function (e) {
            if (e.relatedTarget === this.baseSearchEngine.input) {
                this.listenToClick = false;
                this.advancedBtn.setAttribute("aria-expanded", false);
            }
        }.bind(this));
    }

    /**
     * Crée un événement de recherche à partir d'un objet (Feature ou Point).
     * @param {Object|Point|OlFeature} obj Objet à afficher (Feature ou Point)
     * @param {String} [info] Texte affiché dans la popup
     * @returns {Object} Événement normalisé de type "search"
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
     * Initialise le conteneur principal du contrôle et les sous-composants.
     * @param {SearchEngineAdvancedOptions} options Options du constructeur
     * @private
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
        advancedBtn.className = "GPSearchEngine-advanced-btn fr-btn fr-btn--sm fr-icon-arrow-up-s-line fr-btn--icon-right fr-btn--tertiary-no-outline";
        advancedBtn.id = Helper.getUid("GPSearchEngine-advanced-btn-");
        advancedBtn.type = "button";
        advancedBtn.title = "Avancée";
        advancedBtn.innerHTML = "Avancée";
        advancedBtn.setAttribute("aria-label", "Afficher les options avancées");
        advancedBtn.setAttribute("aria-expanded", "false");

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
        advancedBtn.addEventListener("click", function (/** @type {PointerEvent} */ e)  {
            e.preventDefault();
            const isHidden = advancedBtn.getAttribute("aria-expanded") === "false";
            advancedBtn.setAttribute("aria-expanded", isHidden);
            this.listenToClick = isHidden;
            if (isHidden) {
                // Si la modale est ouverte, on met le focus sur le premier élément focusable
                const focusableSelectors = [
                    "a[href]",
                    "button:not([disabled])",
                    "input:not([disabled])",
                    "select:not([disabled])",
                    "textarea:not([disabled])",
                    "[tabindex]:not([tabindex='-1'])"
                ].join(",");
                const firstFocusable = advancedContainer.querySelector(focusableSelectors);
                if (firstFocusable) {
                    firstFocusable.focus();
                }
            }
        }.bind(this));

        // N'ajoute pas le bouton s'il n'y a pas d'options avancées
        if (this._searchForms.length) {
            this.baseSearchEngine.optionscontainer.appendChild(advancedBtn);
        }

        // Ajout des options avancées
        const eraseBtn = this.eraseBtn = document.createElement("button");
        eraseBtn.className = "GPSearchEngine-erase-btn fr-btn fr-btn--sm fr-icon-close-circle-line fr-btn--tertiary-no-outline";
        eraseBtn.id = Helper.getUid("GPSearchEngine-erase-btn-");
        eraseBtn.type = "button";
        eraseBtn.title = "Effacer la saisie";
        eraseBtn.setAttribute("aria-label", "Effacer la saisie");
        // Gestion du bouton avancé
        eraseBtn.addEventListener("click", function () {
            this.baseSearchEngine.input.value = "";
            delete this.baseSearchEngine.input.dataset.empty;
            // Notifie l'input du changement
            this.baseSearchEngine.input.dispatchEvent(new Event("input"));
        }.bind(this));
        this.baseSearchEngine.optionscontainer.appendChild(eraseBtn);
    }

    /**
     * Fonction active si la recherche avancée est active
     * @param {PointerEvent} e Événement de clic sur le document
     */
    _onDocumentClick (e) {
        if (this.listenToClick === true) {
            // Écoute des clics sur le document ==> recherche avancée active
            const clickOnAdvancedContainer = (this.advancedContainer === e.target || this.advancedContainer.contains(e.target));
            const clickOnAdvancedBtn = this.advancedBtn === e.target;
            if (!(clickOnAdvancedContainer || clickOnAdvancedBtn)) {
                // On fait une action si un clic se produit en dehors du conteneur
                // Et si le bouton de recherche avancée n'est pas cliqué
                this.listenToClick = false;
                this.advancedBtn.setAttribute("aria-expanded", false);
            }
        }
    }

    /**
     * Ajoute les résultats (features) sur la carte et ajuste la vue.
     * @param {Object} e Événement de recherche contenant result/extent
     */
    addResultToMap (e) {
        this._closePopup();
        this.layer.getSource().clear();
        let extent;
        if (!!e.result) {
            this.layer.getSource().addFeature(e.result);
            extent = e.result.getGeometry().getExtent();
        }
        if (!!e.extent) {
            this.layer.getSource().addFeature(e.extent);
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
     * Callback lors de la sélection d'une feature (affiche le popup).
     * @param {SelectEvent} e Événement de sélection
     * @private
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
            this.popup.set("layer", this.layer);
        } else {
            this.popup.setPosition(undefined);
            this.setPopupContent("");
            this.popup.unset("feature");
            this.popup.unset("layer");
        }
    }

    /**
     * Crée et retourne l'overlay popup pour afficher les infos de feature.
     * @private
     * @param {PopupButton[]} popupButtons - Bouton à ajouter dans le popup (en plus de la suppression / fermeture).
     * @returns {Overlay} Overlay du popups
     */
    _createPopup (popupButtons) {
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

        popupButtons.forEach(popupBtn => {
            popupBtns.appendChild(this._createCustomPopupButton(popupBtn));
        });

        element.appendChild(popupContent);
        element.appendChild(popupBtns);

        const overlay = new Overlay({
            element : element,
            positioning : "bottom-center",
        });

        return overlay;
    }

    /**
     * Définit le contenu HTML du popup.
     * @param {String} content Contenu HTML à afficher
     */
    setPopupContent (content) {
        this._popupContent.innerHTML = content;
    }

    /**
     * Crée le bouton de fermeture du popup.
     * @returns {HTMLButtonElement} Bouton de fermeture
     * @private
     */
    _addCloseButton () {
        let closer = document.createElement("button");
        closer.title = closer.ariaLabel = "Fermer la pop-up";
        closer.textContent = "Fermer";
        closer.className = "GPButton gpf-btn fr-icon-close-line fr-btn fr-btn--sm gpf-btn--tertiary  fr-btn--tertiary-no-outline";

        // Ferme le popup
        closer.onclick = this._closePopup.bind(this);
        return closer;
    }

    /**
     * Ferme le popup et désélectionne la feature.
     * @returns {Boolean} false
     * @private
     */
    _closePopup () {
        this.selectInteraction.getFeatures().clear();
        if (this.popup !== null) {
            this.popup.setPosition(undefined);
        }
        return false;
    }

    /**
     * Crée le bouton de suppression du marqueur.
     * @returns {HTMLButtonElement} Bouton de suppression
     * @private
     */
    _addRemoveButton () {
        let remove = document.createElement("button");
        remove.title = remove.ariaLabel = "Supprimer le marqueur";
        remove.textContent = "Supprimer";
        remove.className = "GPButton gpf-btn fr-icon-delete-line fr-btn fr-btn--sm gpf-btn--tertiary fr-btn--tertiary-no-outline";

        // Supprime la feature
        remove.onclick = this._removeFeature.bind(this);

        return remove;
    }

    /**
     * Supprime la feature sélectionnée de la couche et ferme le popup.
     * @private
     */
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

    /**
     * Crée un bouton personnalisé pour le popup.
     * @param {PopupButton} popupButton - Configuration du bouton.
     * @returns {HTMLButtonElement} Bouton HTML
     */
    _createCustomPopupButton (popupButton) {
        const btn = document.createElement("button");
        btn.title = btn.ariaLabel = popupButton.label;
        btn.className = "GPButton fr-btn fr-btn--sm fr-btn--tertiary-no-outline ";
        if (popupButton.className) {
            btn.className += popupButton.className;
        }
        if (popupButton.icon) {
            btn.classList.add(popupButton.icon);
        }
        if (popupButton.attributes) {
            Object.entries(popupButton.attributes).forEach(([key, value]) => {
                btn.setAttribute(key, value);
            });
        }
        btn.onclick = () => {
            const feature = this.popup.get("feature");
            if (feature && typeof popupButton.onClick === "function") {
                // New feature sans style
                const newFeature = feature.clone();
                newFeature.setStyle(undefined);
                // Appel du callback
                if (popupButton.onClick.call(this, newFeature)) {
                    // Feature traitée => supprimer de la sélection
                    this._closePopup();
                    this.selectInteraction.getFeatures().clear();
                    this.layer.getSource().removeFeature(feature);
                };
            }
        };
        return btn;
    }

    /**
     * Crée le bouton de géolocalisation.
     * @returns {HTMLButtonElement} Bouton de géolocalisation
     * @private
     */
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

    /**
     * Callback lors d'un résultat de recherche avancée.
     * @param {Object} e Événement de recherche avancée
     * @private
     */
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