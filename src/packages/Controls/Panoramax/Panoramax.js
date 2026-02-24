// import CSS
import "../../CSS/Controls/Panoramax/GPFpanoramax.css";

// import OpenLayers
import Control from "../Control";
import Widget from "../Widget";

// import local
import Utils from "../../Utils/Helper";
import SelectorID from "../../Utils/SelectorID";
import Logger from "../../Utils/LoggerByDefault";
import Draggable from "../../Utils/Draggable";

// DOM
import PanoramaxDOM from "./PanoramaxDOM";

// lib ol
import VectorTileLayer from "ol/layer/VectorTile";
import Overlay from "ol/Overlay";
import { applyStyle } from "ol-mapbox-style";

// lib panoramax
import "@panoramax/web-viewer/build/photoviewer";
import "@panoramax/web-viewer/build/photoviewer.css";

var logger = Logger.getLogger("panoramax");

/**
 * @typedef {Object} PanoramaxOptions
 * @property {boolean} [collapsed=true] - Définit si le widget est replié au chargement.
 * @property {boolean} [draggable=false] - Permet de déplacer le panneau du catalogue.
 * @property {boolean} [auto=true] - Active l’ajout automatique des événements sur la carte.
 * @property {boolean} [hover=true] - Active l’interaction au survol (pointermove) sur la couche Panoramax.
 * @property {boolean} [panel=false] - Affiche un en-tête (header) dans le panneau.
 * @property {string} [id] - Identifiant unique du widget.
 * @property {string} [position] - Position CSS du widget sur la carte.
 * @property {boolean} [gutter] - Ajoute ou retire l’espace autour du panneau.
 * @property {Object} [layer] - Options de configuration de la couche de données.
 * @property {string} [layer.url] - URL du style de la couche à charger.
 * @property {string} [layer.name] - Nom de la couche à afficher dans le gestionnaire de couches.
 * @property {Object} [background] - Options de configuration de la couche de fond.
 * @property {boolean} [background.display] - Affiche ou masque la couche de fond.
 * @property {string} [background.url] - URL du style de la couche de fond à charger.
 * @property {string} [background.name] - Nom de la couche de fond à afficher dans le gestionnaire de couches.
 * @property {Object} [buttons] - Options de configuration des boutons.
 * @property {Object} [buttons.filters] - Options de configuration des filtres.
 * @property {boolean} [buttons.filters.display] - Affiche ou masque les filtres.
 * @property {string} [buttons.filters.label] - Libellé du bouton de filtrage.
 * @property {Object} [buttons.filters.content] - Options de configuration du contenu des filtres.
 * @property {Array} [buttons.filters.content.types] - Types d'images à filtrer (Tout, classique, 360).
 * @property {Array} [buttons.filters.content.dates] - Plages de dates à filtrer.
 * @property {Array} [buttons.filters.content.quality] - Niveaux de qualité à filtrer.
 * @property {Array} [buttons.filters.content.precision] - Niveaux de précision à filtrer.
 * @property {Object} [buttons.tags] - Options de configuration des tags.
 * @property {boolean} [buttons.tags.display] - Affiche ou masque les tags.
 * @property {string} [buttons.tags.label] - Libellé du bouton de tags.
 * @property {Object} [buttons.tags.content] - Options de configuration du contenu des tags.
 * @property {Array} [buttons.tags.content.all] - Tous les objets à taguer.
 * @property {Array} [buttons.tags.content.roadSigns] - Panneaux routiers à taguer.
 * @property {Object} [buttons.contributions] - Options de configuration des contributions.
 * @property {boolean} [buttons.contributions.display] - Affiche ou masque les contributions.
 * @property {string} [buttons.contributions.label] - Libellé du bouton de contribution.
 * @property {Object} [visualizationWindow] - Options de configuration de la fenêtre de visualisation.
 * @property {boolean} [visualizationWindow.display] - Affiche ou masque la fenêtre de visualisation.
 */

/**
 * @classdesc
 *
 * Panoramax widget for OpenLayers. 
 * This widget allows users to visualize panoramic images on the map, 
 * filter them based on various criteria, and contribute to the dataset. 
 * The widget can be configured with different options to customize 
 * its behavior and appearance.
 *
 * @alias ol.control.Panoramax
 * @module Panoramax
*/
class Panoramax extends Control {
    
    /**
     * @constructor
     * @param {PanoramaxOptions} options - options for function call.
     * 
     * @fires panoramax:opened
     * @example
     * var panoramax = new ol.control.Panoramax();
     * map.addControl(panoramax);
     */
    constructor (options) {
        options = options || {};
        
        // call ol.control.Control constructor
        super({
            element : options.element,
            target : options.target,
            render : options.render
        });

        if (!(this instanceof Panoramax)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        // initialisation du composant
        this.initialize(options);

        // Widget main DOM container
        this.container = this.initContainer();

        // ajout du container
        (this.element) ? this.element.appendChild(this.container) : this.element = this.container;

        return this;
    }

    // ################################################################### //
    // ##################### public methods ############################## //
    // ################################################################### //

    /**
     * Overwrite OpenLayers setMap method
     *
     * @param {Map} map - Map.
     */
    setMap (map) {
        if (map) {
            // mode "draggable"
            if (this.draggable) {
                Draggable.dragElement(
                    this.panelPanoramaxButtonsContainer,
                    this.panelPanoramaxButtonsHeaderContainer,
                    this.options.position ? null : map.getTargetElement()
                );
            }
            // mode "collapsed"
            if (!this.collapsed) {
                this.buttonPanoramaxShow.setAttribute("aria-pressed", true);
            }

            // some stuff

            // ajout des evenements sur la carte
            if (this.auto) {
                this.addEventsListeners(map);
            }
        } else {
            // suppression des evenements sur la carte
            // pour les futurs suppressions de couche
            if (this.auto) {
                this.removeEventsListeners();
            }
        }

        // on appelle la méthode setMap originale d'OpenLayers
        super.setMap(map);

        // position
        if (this.options.position) {
            this.setPosition(this.options.position);
        }

        // reunion du bouton avec le précédent
        if (this.options.gutter === false) {
            this.getContainer().classList.add("gpf-button-no-gutter");
        }
    }

    // ################################################################### //
    // ################### getters / setters ############################# //
    // ################################################################### //
    
    /**
     * Get container
     *
     * @returns {HTMLElement} container
     */
    getContainer () {
        return this.container;
    }

    /**
     * Returns true if widget is collapsed (minimized), false otherwise
     *
     * @returns {Boolean} collapsed - true if widget is collapsed
     */
    getCollapsed () {
        return this.collapsed;
    }

    /**
     * Collapse or display widget main container
     *
     * @param {Boolean} collapsed - True to collapse widget, False to display it
     */
    setCollapsed (collapsed) {
        if (collapsed === undefined) {
            return;
        }
        if ((collapsed && this.collapsed) || (!collapsed && !this.collapsed)) {
            return;
        }
        if (collapsed) {
            this.buttonReportingClose.click();
        } else {
            this.buttonReportingShow.click();
        }
        this.collapsed = collapsed;
    }

    // ################################################################### //
    // #################### privates methods ############################# //
    // ################################################################### //
    
    /**
     * Initialize Panoramax control (called by Panoramax constructor)
     *
     * @param {PanoramaxOptions} options - constructor options
     * @private
     */
    initialize (options) {
        /** @private */
        this.uid = options.id || SelectorID.generate();

        // set default options
        this.options = {
            collapsed : true,
            draggable : false,
            panel : false,
            auto : true,
            hover : true,
            gutter : false,
            layer : {
                url : "https://api.panoramax.xyz/api/map/style.json",
                name : "Panoramax"
            },
            background : {
                display : false,
                url : "https://data.geopf.fr/annexes/ressources/vectorTiles/styles/PLAN.IGN/gris.json",
                name : "Background"
            },
            buttons : { // TODO
                display : true,
                target : "map",
                filters : {
                    display : true,
                    label : "Filtrer",
                    content : {}
                },
                tags : {
                    display : false,
                    label : "Ajouter des tags",
                    content : {}
                },
                contributions : {
                    display : true,
                    label : "Contribuer"
                },
            },
            visualizationWindow : { // TODO
                display : true,
                target : "map",
                size : "medium",
                title : "Visualiser l'image",
                position : "top-right",
            },
            viewer : {
                "endpoint" : "https://explore.panoramax.fr/api",
                "class" : "", // TODO
                "widgets" : true, // TODO
                "psv-options" : {} // TODO
            },
        };

        // merge with user options
        Utils.assign(this.options, options);

        /** 
         * @type {Boolean} 
         * specify if control is collapsed (true) or not (false) */
        this.collapsed = this.options.collapsed;

        /** 
         * @type {Boolean} 
         * specify if control is draggable (true) or not (false) */
        this.draggable = this.options.draggable;

        /** 
         * @type {Boolean} 
         * specify if control add some stuff auto */
        this.auto = this.options.auto;

        /**
         * @type {Boolean}
         * specify if hover interaction is enabled */
        this.hover = this.options.hover;

        /** @private */
        this.buttonPanoramaxShow = null;
        /** @private */ 
        this.panelPanoramaxViewerContainer = null;
        /** @private */
        this.panelPanoramaxButtonsContainer = null;
        /** @private */
        this.panelPanoramaxButtonsHeaderContainer = null; // usefull for the dragNdrop
        /** @private */
        this.buttonPanoramaxButtonsClose = null;
        /** @private */
        this.formPanoramaxButtonsContainer = null;

        /** 
         * @type {Boolean}
         * specify if event is activated (true) or not (false) */
        this.eventActived = false;
        /** 
         * @type {Array} 
         * specify some events listeners */
        this.eventsListeners = [];

        /**
         * event triggered when the panoramax panel is opened
         * @event pnx:opened
         * @defaultValue "pnx:opened"
         * @group Events
         * @description
         * This event is dispatched when the panoramax panel is opened.
         * It indicates that the panoramax process has started.
         * This event can be used to perform additional actions 
         * when the panoramax panel is opened.
         */
        this.OPENED_PANORAMAX_EVENT = "pnx:opened";

        /**
         * callback triggered when the user clicks on the map 
         * with the panoramax layer active
         * @event pnx:data:clicked
         * @defaultValue "pnx:data:clicked"
         * @group Callbacks
         * @description
         * This callback is triggered when the user clicks on the map 
         * while the panoramax layer is active.
         * It allows you to retrieve information about the clicked feature,
         * such as its coordinates and properties.
         * This callback can be used to display a popup with more information.
         */
        this.CLICKED_DATA_PANORAMAX_CB = "pnx:data:clicked";

        /**
         * callback triggered when the user hovers the map
         * with the panoramax layer active
         * @event pnx:data:hovered
         * @defaultValue "pnx:data:hovered"
         * @group Callbacks
         */
        this.HOVERED_DATA_PANORAMAX_CB = "pnx:data:hovered";

        /** photo viewer */
        this.photoViewerPanoramax = null;
        /** layer */
        this.layerPanoramax = null;
        /** background */
        this.backgroundPanoramax = null;
        /** preview marker overlay */
        this.previewMarkerOverlay = null;
        /** preview popup overlay */
        this.previewPopupOverlay = null;
        /** preview popup element */
        this.previewPopupElement = null;
    }

    /**
     * Create control main container (DOM initialize)
     *
     * @returns {HTMLElement} DOM element
     * @private
     */
    initContainer () {
        // create main container
        var container = this._createMainContainerElement();

        var picto = this.buttonPanoramaxShow = this._createShowWidgetPictoElement();
        container.appendChild(picto);

        var widgetPanelViewer = this.panelPanoramaxViewerContainer = this._createWidgetPanelViewerElement();
        container.appendChild(widgetPanelViewer);

        // panel buttons
        var widgetPanel = this.panelPanoramaxButtonsContainer = this._createWidgetPanelButtonsElement();
        var widgetPanelDiv = this._createWidgetPanelButtonsDivElement();
        widgetPanel.appendChild(widgetPanelDiv);

        // container for the custom code
        var form = this.formPanoramaxButtonsContainer = this._createWidgetPanelButtonsFormElement();
        widgetPanel.appendChild(form);

        // header
        var widgetPanelHeader = this.panelPanoramaxButtonsHeaderContainer = this._createWidgetPanelButtonsHeaderElement(this.options.panel);
        // icone
        var widgetPanelIcon = this._createWidgetPanelButtonsIconElement();
        widgetPanelHeader.appendChild(widgetPanelIcon);
        // title
        var widgetPanelTitle = this._createWidgetPanelButtonsTitleElement();
        widgetPanelHeader.appendChild(widgetPanelTitle);
        // close picto
        var widgetCloseBtn = this.buttonPanoramaxButtonsClose = this._createWidgetPanelButtonsCloseElement();
        widgetPanelHeader.appendChild(widgetCloseBtn);
        
        widgetPanelDiv.appendChild(widgetPanelHeader);

        container.appendChild(widgetPanel);

        logger.log(container);

        return container;
    }

    // ################################################################### //
    // ################# privates events / handlers ###################### //
    // ################################################################### //

    /**
     * Add events listeners on map (called by setMap)
     * 
     * @param {Map} map - map
     * @private
     */
    addEventsListeners (map) {
        // TODO : à revoir pour éviter les problèmes de performance
        var self = this;

        // click on map with panoramax layer active
        // display the panoramic image in the photo viewer at the clicked coordinates
        this.eventsListeners[this.CLICKED_DATA_PANORAMAX_CB] = function (e) {
            if (!self.eventActived) {
                return;
            }
            var callback = (feature) => {
                // stop iteration after the first feature is found
                return {
                    coordinates : feature.getFlatCoordinates(),
                    properties : feature.getProperties()
                };
            };
            var options = {
                layerFilter : (l) => l === self.layerPanoramax,
                hitTolerance : 5
            };
            var feature = e.map.forEachFeatureAtPixel(e.pixel, callback, options);
            if (!feature) {
                return;
            }
            console.debug("Clicked coordinates :", feature.coordinates);
            console.debug("Clicked feature :", feature.properties);
            var sequenceId = feature.properties.first_sequence || null;
            var pictureId = feature.properties.id || null;
            if (!sequenceId && !pictureId) {
                logger.warn("No sequenceId or pictureId found for the clicked feature");
                return;
            }
            self.displayPhotoViewer(sequenceId, pictureId);
        };
        map.on("click", this.eventsListeners[this.CLICKED_DATA_PANORAMAX_CB]);

        if (this.hover) {
            // hover on map with panoramax layer active
            // display a preview of the panoramic image at the hovered coordinates
            this.eventsListeners[this.HOVERED_DATA_PANORAMAX_CB] = function (e) {
                if (!self.eventActived || e.dragging) {
                    return;
                }
                var callback = (feature) => {
                    // stop iteration after the first feature is found
                    return {
                        coordinates : feature.getFlatCoordinates(),
                        properties : feature.getProperties()
                    };
                };
                var options = {
                    layerFilter : (l) => l === self.layerPanoramax,
                    hitTolerance : 5
                };
                var feature = e.map.forEachFeatureAtPixel(e.pixel, callback, options);
                var mapTarget = e.map.getTargetElement();
                if (mapTarget) {
                    mapTarget.style.cursor = feature ? "pointer" : "";
                }
                if (!feature) {
                    self.resetPreview();
                    return;
                }
                self.displayPreview(feature);
            };
            map.on("pointermove", this.eventsListeners[this.HOVERED_DATA_PANORAMAX_CB]);
        }
    }

    /**
     * Remove events listeners on map (called by setMap)
     * @private
     */
    removeEventsListeners () {
        var map = this.getMap();
        this.resetPreview();
        map.un("click", this.eventsListeners[this.CLICKED_DATA_PANORAMAX_CB]);
        delete this.eventsListeners[this.CLICKED_DATA_PANORAMAX_CB];
        if (this.eventsListeners[this.HOVERED_DATA_PANORAMAX_CB]) {
            map.un("pointermove", this.eventsListeners[this.HOVERED_DATA_PANORAMAX_CB]);
            delete this.eventsListeners[this.HOVERED_DATA_PANORAMAX_CB];
        }

        var mapTarget = map.getTargetElement();
        if (mapTarget) {
            mapTarget.style.cursor = "";
        }
    }

    // ################################################################### //
    // ################# privates methods : reset ######################## //
    // ################################################################### //

    /**
     * Clear the content of the panel (called when the panel is closed)
     * And reset some stuff if necessary
     * @private
     */
    reset () {
        // - vider la couche de fond
        this.resetBackground();
        // - vider la couche de données
        this.resetLayer();
        // - reinit des filtres
        this.resetFilters();
        // - reinit des tags
        this.resetTags();
        // - reinit des contributions
        this.resetContributions();
        // - reinit de la fenêtre de visualisation (?)
        this.resetVisualizationWindow();
        // - nettoyer l'aperçu au survol
        this.resetPreview();
        // - etc.
        this.eventActived = false;
    }

    resetLayer () {
        logger.debug("resetLayer");
        var map = this.getMap();
        if (this.layerPanoramax) {
            map.removeLayer(this.layerPanoramax);
            this.layerPanoramax = null;
        }
    }
    resetBackground () {
        logger.debug("resetBackground");
        var map = this.getMap();
        if (this.backgroundPanoramax) {
            map.removeLayer(this.backgroundPanoramax);
            this.backgroundPanoramax = null;
        }
    }
    resetFilters () {}
    resetTags () {}
    resetContributions () {}
    resetVisualizationWindow () {
        if (this.photoViewerPanoramax) {
            this.photoViewerPanoramax.setAttribute("sequence", "");
            this.photoViewerPanoramax.setAttribute("picture", "");
            this.photoViewerPanoramax.select();
            this.hidePhotoViewer();
        }
    }

    // ################################################################### //
    // ################# privates methods : init ######################### //
    // ################################################################### //

    /**
     * Load some stuff in the panel (called when the panel is opened)
     * And launch some processes if necessary
     * @private
     */
    async load () {
        try {
            // - charger la couche de fond
            await this.setBackground(this.options.background);
            // - charger la couche de données
            await this.setLayer(this.options.layer);
            // - charger le bouton des filtres
            await this.initFilters();
            // - charger le bouton de tags
            await this.initTags();
            // - charger le bouton de contribution
            await this.initContributions();
            // - charger la fenêtre de visualisation (?)
            await this.initVisualizationWindow();
            // - etc.
        } catch (err) {
            logger.error("Error loading Panoramax content", err);
        }
    }

    async setLayer (opts) {
        logger.debug("initLayer");
        // options de la couche :
        // - url : https://api.panoramax.xyz/api/map/style.json
        // - name : "Panoramax"
        // - etc.
        var map = this.getMap();
        this.layerPanoramax = new VectorTileLayer({ declutter : true });
        this.layerPanoramax.styleUrl = opts.url;
        try {
            await applyStyle(
                this.layerPanoramax,
                opts.url
            );
            map.addLayer(this.layerPanoramax);
            this.layerPanoramax.set("title", opts.name);
        } catch (err) {
            logger.error("Error loading Panoramax layer style", err);
            this.layerPanoramax = null;
        }
    }

    async setBackground (opts) {
        logger.debug("initBackground");
        // options de la couche de fond :
        // - url : https://data.geopf.fr/annexes/ressources/vectorTiles/styles/PLAN.IGN/gris.json
        // - name : "Background"
        // - etc.
        if (!opts.display) {
            return;
        }
        var map = this.getMap();
        this.backgroundPanoramax = new VectorTileLayer({ declutter : true });
        this.backgroundPanoramax.styleUrl = opts.url;
        try {
            await applyStyle(
                this.backgroundPanoramax,
                opts.url
            );
            map.addLayer(this.backgroundPanoramax);
            this.backgroundPanoramax.set("title", opts.name);
        } catch (err) {
            logger.error("Error loading Panoramax background layer style", err);
            this.backgroundPanoramax = null;
        }
    }

    initFilters () {
        // options.filters.display : true/false
        // options.filters.label : "Filtrer"
        // options des filtres :
        // - types d'images : Tout, classique, 360
        // - dates : ...
        // - qualité : ...
        // - precision : ...
        // - etc.
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                logger.debug("initFilters");
                resolve();
            }, 1000);
        });
    }

    initTags () {
        // options.tags.display : true/false
        // options.tags.label : "Ajouter des tags"
        // options des tags :
        // - tous les objets
        // - les panneaux routiers
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                logger.debug("initTags");
                resolve();
            }, 1000);
        });
    }

    initContributions () {
        // options.contributions.display : true/false
        // options.contributions.label : "Contribuer"
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                logger.debug("initContributions");
                resolve();
            }, 1000);
        });
    }

    initVisualizationWindow () {
        // options.visualizationWindow.display : true/false
        // options de la fenêtre de visualisation :
        // - title : "Visualiser l'image"
        // - position : "top-right" (ou "top-left", "bottom-right", "bottom-left")
        // - size : "small" (ou "medium", "large")
        // - target : "map" (ou un id de container)
        // - widgets : ...
        //   - direction
        //   - zoom
        //   - fullscreen
        //   - minimap
        //   - informations sur l'image
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                logger.debug("initVisualizationWindow");
                if (!this.photoViewerPanoramax) {
                    this.photoViewerPanoramax = this.createPhotoViewer();
                    this.hidePhotoViewer();
                }
                resolve();
            }, 100);
        });
    }

    // ################################################################### //
    // ######################## methods photoviewer ###################### //
    // ################################################################### //

    createPhotoViewer () {
        if (!this.panelPanoramaxViewerContainer) {
            return null;
        }
        var photoViewer = this.panelPanoramaxViewerContainer.querySelector("pnx-photo-viewer");
        if (!photoViewer) {
            photoViewer = document.createElement("pnx-photo-viewer");
            photoViewer.setAttribute("endpoint", this.options.viewer.endpoint);
            photoViewer.setAttribute("style", "width: 100%; height: 100%;");
            this.panelPanoramaxViewerContainer.appendChild(photoViewer);
        }
        return photoViewer;
    }

    displayPhotoViewer (sequenceId, pictureId) {
        if (!this.photoViewerPanoramax) {
            logger.warn("Panoramax photo viewer is not available");
            return;
        }
        if (typeof this.photoViewerPanoramax.select === "function") {
            this.photoViewerPanoramax.select(sequenceId, pictureId, true);
        } else {
            if (sequenceId) {
                this.photoViewerPanoramax.setAttribute("sequence", sequenceId);
            }
            if (pictureId) {
                this.photoViewerPanoramax.setAttribute("picture", pictureId);
            }
        }
        this.showPhotoViewer();
    }

    showPhotoViewer () {
        if (!this.photoViewerPanoramax) {
            logger.warn("Panoramax photo viewer is not available");
            return;
        }
        this.photoViewerPanoramax.classList.remove("gpf-hidden");
        this.panelPanoramaxViewerContainer.classList.remove("gpf-hidden");
    }

    hidePhotoViewer () {
        if (!this.photoViewerPanoramax) {
            logger.warn("Panoramax photo viewer is not available");
            return;
        }
        this.photoViewerPanoramax.classList.add("gpf-hidden");
        this.panelPanoramaxViewerContainer.classList.add("gpf-hidden");
    }
    // ################################################################### //
    // ######################## methods preview ########################## //
    // ################################################################### //

    /**
     * Display/update preview marker at given coordinates.
     *
     * @param {Array<Number>} coordinates - Feature coordinates [x, y] on map projection.
     */
    setMarker (coordinates) {
        if (!coordinates || coordinates.length < 2) {
            return;
        }
        var map = this.getMap();
        if (!map) {
            return;
        }

        var position = [coordinates[0], coordinates[1]];

        if (!this.previewMarkerOverlay) {
            var markerElement = document.createElement("span");
            markerElement.style.width = "12px";
            markerElement.style.height = "12px";
            markerElement.style.display = "block";
            markerElement.style.borderRadius = "50%";
            markerElement.style.border = "2px solid #ffffff";
            markerElement.style.backgroundColor = "#0B6BA7";
            markerElement.style.boxShadow = "0 0 0 1px rgba(0, 0, 0, 0.35)";

            this.previewMarkerOverlay = new Overlay({
                element : markerElement,
                positioning : "center-center",
                stopEvent : false
            });
            map.addOverlay(this.previewMarkerOverlay);
        }

        this.previewMarkerOverlay.setPosition(position);
    }

    /**
     * Display/update preview popup at given coordinates with provided HTML content.
     *
     * @param {Array<Number>} coordinates - Feature coordinates [x, y] on map projection.
     * @param {String} [content] - HTML content to inject into popup.
     */
    setPopup (coordinates, content = "") {
        if (!coordinates || coordinates.length < 2) {
            return;
        }
        var map = this.getMap();
        if (!map) {
            return;
        }

        var position = [coordinates[0], coordinates[1]];

        if (!this.previewPopupElement) {
            this.previewPopupElement = document.createElement("div");
            this.previewPopupElement.className = "gp-feature-info-div geoportail-popup-content";
        }
        this.previewPopupElement.innerHTML = content;

        if (!this.previewPopupOverlay) {
            this.previewPopupOverlay = new Overlay({
                element : this.previewPopupElement,
                positioning : "bottom-center",
                offset : [0, -18],
                stopEvent : false
            });
            map.addOverlay(this.previewPopupOverlay);
        }

        this.previewPopupOverlay.setPosition(position);
    }

    /**
     * Remove marker and popup overlays used by hover preview.
     */
    resetPreview () {
        var map = this.getMap();
        if (!map) {
            return;
        }
        if (this.previewMarkerOverlay) {
            map.removeOverlay(this.previewMarkerOverlay);
            this.previewMarkerOverlay = null;
        }
        if (this.previewPopupOverlay) {
            map.removeOverlay(this.previewPopupOverlay);
            this.previewPopupOverlay = null;
        }
        this.previewPopupElement = null;
    }

    displayPreview (feature) {
        var type = feature.properties.layer;
        switch (type) {
            case "grid":
                this.displayPreviewGrid(feature.coordinates, feature.properties);
                break;
            case "sequences":
                this.displayPreviewSequence(feature.coordinates, feature.properties);
                break;
            case "pictures":
                this.displayPreviewPicture(feature.coordinates, feature.properties);
                break;
            default:
                logger.warn("Unknown feature type :", type);
        }
    }

    _escape (value) {
        if (value === undefined || value === null) {
            return "";
        }
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    /**
     * Display a preview of the panoramic image at the given coordinates 
     * and for the given feature.
     * @param {*} coordinates - coordinates of the clicked point
     * @param {*} feature - feature corresponding to the clicked point (with its properties)
     */
    displayPreviewGrid (coordinates, feature) {
        var id = this._escape(feature.id);
        var nbPictures = this._escape(feature.nb_pictures);
        var nb360Pictures = this._escape(feature.nb_360_pictures);
        var nbFlatPictures = this._escape(feature.nb_flat_pictures);
        var coef = this._escape(feature.coef);
        var coef360Pictures = this._escape(feature.coef_360_pictures);
        var coefFlatPictures = this._escape(feature.coef_flat_pictures);

        var className = "gpf-hidden"; // orienté maintenance
        var content = `
        <p><strong>ID :</strong> ${id || "-"}</p>
        <ul class="${className}">
            <li><strong>nb_pictures :</strong> ${nbPictures || "-"}</li>
            <li><strong>nb_360_pictures :</strong> ${nb360Pictures || "-"}</li>
            <li><strong>nb_flat_pictures :</strong> ${nbFlatPictures || "-"}</li>
            <li><strong>coef :</strong> ${coef || "-"}</li>
            <li><strong>coef_360_pictures :</strong> ${coef360Pictures || "-"}</li>
            <li><strong>coef_flat_pictures :</strong> ${coefFlatPictures || "-"}</li>
        </ul>`;

        this.setMarker(coordinates);
        this.setPopup(coordinates, content);
    }

    /**
     * Display a preview of the panoramic image at the given coordinates 
     * and for the given feature.
     * @param {*} coordinates - coordinates of the clicked point
     * @param {*} feature - feature corresponding to the clicked point (with its properties)
     */
    displayPreviewSequence (coordinates, feature) {
        var id = this._escape(feature.id);
        var accountId = this._escape(feature.account_id);
        var model = this._escape(feature.model);
        var type = this._escape(feature.type);
        var date = this._escape(feature.date || feature.created_at || feature.datetime);
        var gpsAccuracy = this._escape(feature.gps_accuracy);
        var hPixelDensity = this._escape(feature.h_pixel_density);

        var className = "gpf-hidden"; // orienté maintenance
        var content = `
            <p><strong>ID :</strong> ${id || "-"}</p>
            <ul class="${className}">
                <li><strong>account_id :</strong> ${accountId || "-"}</li>
                <li><strong>model :</strong> ${model || "-"}</li>
                <li><strong>type :</strong> ${type || "-"}</li>
                <li><strong>date :</strong> ${date || "-"}</li>
                <li><strong>gps_accuracy :</strong> ${gpsAccuracy || "-"}</li>
                <li><strong>h_pixel_density :</strong> ${hPixelDensity || "-"}</li>
            </ul>`;

        this.setMarker(coordinates);
        this.setPopup(coordinates, content);
    }

    /**
     * Display a preview of the panoramic image at the given coordinates 
     * and for the given feature.
     * @param {*} coordinates - coordinates of the clicked point
     * @param {*} feature - feature corresponding to the clicked point (with its properties)
     */
    displayPreviewPicture (coordinates, feature) {
        var id = this._escape(feature.id);
        var accountId = this._escape(feature.account_id);
        var ts = this._escape(feature.ts || feature.datetime || feature.created_at);
        var heading = this._escape(feature.heading);
        var sequences = this._escape(feature.sequences || feature.first_sequence);
        var type = this._escape(feature.type);
        var model = this._escape(feature.model);
        var gpsAccuracy = this._escape(feature.gps_accuracy);
        var hPixelDensity = this._escape(feature.h_pixel_density);

        var api = this.options.viewer.endpoint || "https://explore.panoramax.fr/api";
        var className = "gpf-hidden"; // orienté maintenance
        var content = `
        <p><strong>ID :</strong> ${id || "-"}</p>
        <img src="${api}/pictures/${id}//thumb.jpg" alt="Preview image" style="width: 100%; height: auto; margin-bottom: 5px; border-radius: 4px; object-fit: cover;">
        <ul class="${className}">
            <li><strong>account_id :</strong> ${accountId || "-"}</li>
            <li><strong>ts :</strong> ${ts || "-"}</li>
            <li><strong>heading :</strong> ${heading || "-"}</li>
            <li><strong>sequences :</strong> ${sequences || "-"}</li>
            <li><strong>type :</strong> ${type || "-"}</li>
            <li><strong>model :</strong> ${model || "-"}</li>
            <li><strong>gps_accuracy :</strong> ${gpsAccuracy || "-"}</li>
            <li><strong>h_pixel_density :</strong> ${hPixelDensity || "-"}</li>
        </ul>
        `;

        this.setMarker(coordinates);
        this.setPopup(coordinates, content);
    }

    // ################################################################### //
    // ######################## event dom ################################ //
    // ################################################################### //
    
    /**
     * ...
     * @param {*} e - ...
     * @private
     */
    onShowPanoramaxClick (e) {
        logger.debug("onShowPanoramaxClick", e);
        var opened = this.buttonPanoramaxShow.ariaPressed;
        if (opened === "true") {
            this.onPanelOpen();
        }
        this.collapsed = !(opened === "true");
        this.dispatchEvent("change:collapsed");

        if (this.collapsed) {
            this.reset();
        } else {
            this.load()
                .then(() => {
                    // activer les interactions de la carte pour la couche panoramax
                    this.eventActived = true;
                })
                .then(() => {
                    /** event triggered when the panoramax panel is opened */
                    this.dispatchEvent(this.OPENED_PANORAMAX_EVENT);
                })
                .catch((err) => {
                    logger.error("Error loading Panoramax content", err);
                });
        }
    }

    /**
     * ...
     * @param {*} e - ...
     * @private
     */
    onClosePanoramaxClick (e) {
        logger.debug(e);
        this.eventActived = false;
    }

    /**
     * @param {*} e - ...
     * @private
     */
    onPanoramaxComputationSubmit (e) {
        logger.debug(e);
    }

};

// on récupère les méthodes de la classe DOM
Object.assign(Panoramax.prototype, PanoramaxDOM);
Object.assign(Panoramax.prototype, Widget);

export default Panoramax;

// Expose Export as ol.control.Panoramax (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.Panoramax = Panoramax;
}
