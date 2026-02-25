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
 * @property {Boolean} [collapsed=true] - Définit si le widget est replié au chargement.
 * @property {Boolean} [draggable=false] - Permet de déplacer le panneau du catalogue.
 * @property {Boolean} [auto=true] - Active l’ajout automatique des événements sur la carte.
 * @property {Boolean} [hover=true] - Active l’interaction au survol (pointermove) sur la couche Panoramax.
 * @property {Boolean} [panel=false] - Affiche un en-tête (header) dans le panneau.
 * @property {String} [id] - Identifiant unique du widget.
 * @property {String} [position] - Position CSS du widget sur la carte.
 * @property {Boolean} [gutter] - Ajoute ou retire l’espace autour du panneau.
 * @property {Object} [layer] - Options de configuration de la couche de données.
 * @property {String} [layer.url] - URL du style de la couche à charger.
 * @property {String} [layer.name] - Nom de la couche à afficher dans le gestionnaire de couches.
 * @property {Number} [layer.minZoom] - Zoom minimum pour afficher la couche.
 * @property {Number} [layer.maxZoom] - Zoom maximum pour afficher la couche.
 * @property {Object} [background] - Options de configuration de la couche de fond.
 * @property {Boolean} [background.display] - Affiche ou masque la couche de fond.
 * @property {String} [background.url] - URL du style de la couche de fond à charger.
 * @property {String} [background.name] - Nom de la couche de fond à afficher dans le gestionnaire de couches.
 * @property {Number} [background.minZoom] - Zoom minimum pour afficher la couche de fond.
 * @property {Number} [background.maxZoom] - Zoom maximum pour afficher la couche de fond.
 * @property {Object} [buttons] - Options de configuration des boutons.
 * @property {Boolean} [buttons.display] - Affiche ou masque les boutons.
 * @property {Object} [buttons.filters] - Options de configuration des filtres.
 * @property {Boolean} [buttons.filters.display] - Affiche ou masque les filtres.
 * @property {String} [buttons.filters.label] - Libellé du bouton de filtrage.
 * @property {Object} [buttons.filters.content] - Options de configuration du contenu des filtres.
 * @property {Array} [buttons.filters.content.types] - Types d'images à filtrer (Tout, classique, 360).
 * @property {Array} [buttons.filters.content.dates] - Plages de dates à filtrer.
 * @property {Object} [buttons.hover] - Options de configuration du bouton de survol.
 * @property {Boolean} [buttons.hover.display] - Affiche ou masque le bouton de survol.
 * @property {String} [buttons.hover.label] - Libellé du bouton de survol.
 * @property {String} [buttons.hover.description] - Description du bouton de survol.
 * @property {Object} [buttons.contributions] - Options de configuration des contributions.
 * @property {Boolean} [buttons.contributions.display] - Affiche ou masque les contributions.
 * @property {String} [buttons.contributions.label] - Libellé du bouton de contribution.
 * @property {String} [buttons.contributions.link] - Lien vers la page de contribution.
 * @property {Object} [visualizationWindow] - Options de configuration de la fenêtre de visualisation.
 * @property {Boolean} [visualizationWindow.display] - Affiche ou masque la fenêtre de visualisation.
 * @property {String} [visualizationWindow.size] - Taille de la fenêtre de visualisation ("small", "medium", "large", "fullscreen").
 */

/**
 * @typedef {Object} PanoramaxPreviewFeature
 * @property {Array<Number>} coordinates - Coordonnées de l'entité en projection carte.
 * @property {PanoramaxPreviewLayerType} properties - Propriétés de l'entité survolée.
 * @property {String} properties.layer - Type de couche ("grid", "sequences" ou "pictures").
 * @sample
 * ex. des champs panoramax du TMS vecteur (https://api.panoramax.xyz/api/map/style.json) :
 *           "sequences": [
 *               "id",
 *               "account_id",
 *               "model",
 *               "type",
 *               "date",
 *               "gps_accuracy",
 *               "h_pixel_density"
 *           ],
 *           "pictures": [
 *               "id",
 *               "account_id",
 *               "ts",
 *               "heading",
 *               "sequences",
 *               "type",
 *               "model",
 *               "gps_accuracy",
 *               "h_pixel_density"
 *           ],
 *           "grid": [
 *               "id",
 *               "nb_pictures",
 *               "nb_360_pictures",
 *               "nb_flat_pictures",
 *               "coef",
 *               "coef_360_pictures",
 *               "coef_flat_pictures"
 *           ]
 */

/**
 * @typedef {"grid"|"sequences"|"pictures"} PanoramaxPreviewLayerType
 * @type {grid} - Couche de grille (agrégats de points).
 * @property {String} id - Identifiant de la grille.
 * @property {Number} nb_pictures - Nombre total d'images dans la grille.
 * @property {Number} nb_360_pictures - Nombre d'images 360 dans la grille.
 * @property {Number} nb_flat_pictures - Nombre d'images classiques dans la grille.
 * @property {Number} coef - Coefficient de densité d'images dans la grille.
 * @property {Number} coef_360_pictures - Coefficient de densité d'images 360 dans la grille.
 * @property {Number} coef_flat_pictures - Coefficient de densité d'images classiques dans la grille.
 * 
 * @type {sequences} - Couche de séquences (groupes d'images).
 * @property {String} id - Identifiant de la séquence.
 * @property {String} account_id - Identifiant du compte utilisateur ayant contribué la séquence.
 * @property {String} model - Modèle de la séquence (ex. "equirectangular" ou "flat").
 * @property {String} type - Type de la séquence (ex. "360" ou "classic").
 * @property {String} date - Date de contribution de la séquence.
 * @property {Number} gps_accuracy - Précision GPS de la séquence (en mètres).
 * @property {Number} h_pixel_density - Densité de pixels horizontale de la séquence (en pixels/mètre).
 * 
 * @type {pictures} - Couche d'images individuelles.
 * @property {String} id - Identifiant de l'image.
 * @property {String} account_id - Identifiant du compte utilisateur ayant contribué l'image.
 * @property {String} ts - Timestamp de prise de vue de l'image.
 * @property {Number} heading - Cap de prise de vue de l'image (en degrés).
 * @property {String} sequences - Identifiant de la séquence à laquelle appartient l'image.
 * @property {String} type - Type de l'image (ex. "360" ou "classic").
 * @property {String} model - Modèle de l'image (ex. "equirectangular" ou "flat").
 * @property {Number} gps_accuracy - Précision GPS de l'image (en mètres).
 * @property {Number} h_pixel_density - Densité de pixels horizontale de l'image (en pixels/mètre).
 * @property {String} first_sequence - Identifiant de la première séquence à laquelle appartient l'image.    
 * 
 */

/**
 * @classdesc
 *
 * Widget Panoramax pour OpenLayers.
 * Permet de visualiser des images panoramiques sur la carte,
 * de les filtrer selon différents critères et d'accéder au parcours de contribution.
 * Le widget est configurable via les options du constructeur.
 *
 * @alias ol.control.Panoramax
 * @module Panoramax
*/
class Panoramax extends Control {
    
    /**
     * @constructor
     * @param {PanoramaxOptions} [options={}] - Options de configuration du contrôle.
     * 
     * @fires pnx:opened
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
     * Surcharge la méthode `setMap` d'OpenLayers.
     *
     * @param {Map|null} map - Carte cible, ou `null` lors du détachement.
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
     * Indique si le widget est replié.
     *
     * @returns {Boolean} `true` si le widget est replié, `false` sinon.
     */
    getCollapsed () {
        return this.collapsed;
    }

    /**
     * Replie ou déplie le conteneur principal du widget.
     *
     * @param {Boolean} collapsed - `true` pour replier, `false` pour afficher.
     */
    setCollapsed (collapsed) {
        if (collapsed === undefined) {
            return;
        }
        if ((collapsed && this.collapsed) || (!collapsed && !this.collapsed)) {
            return;
        }
        if (this.buttonPanoramaxShow) {
            this.buttonPanoramaxShow.click();
        }
        this.collapsed = collapsed;
    }

    // ################################################################### //
    // #################### privates methods ############################# //
    // ################################################################### //
    
    /**
     * Initialise le contrôle Panoramax (appelé par le constructeur).
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
                name : "Panoramax",
                minZoom : 6,
                maxZoom : 21
            },
            background : {
                display : false,
                url : "https://data.geopf.fr/annexes/ressources/vectorTiles/styles/PLAN.IGN/gris.json",
                name : "Background",
                minZoom : 6,
                maxZoom : 21
            },
            buttons : {
                display : true,
                target : "map", // TODO
                filters : {
                    display : true,
                    label : "Filtrer",
                    description : "Filtrer les images affichées",
                    content : {}
                },
                hover : {
                    display : true,
                    label : "Aperçu au survol",
                    description : "Afficher un aperçu de l'image au survol"
                },
                contributions : {
                    display : true,
                    label : "Contribuer",
                    description : "Accéder au parcours de contribution",
                    link : "https://panoramax.openstreetmap.fr/why-contribute"
                },
            },
            visualizationWindow : {
                display : true,
                target : "map", // TODO
                size : "medium",
                title : "Visualiser l'image", // TODO
                position : "top-right", // TODO
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
         * Indique si le contrôle est replié (`true`) ou non (`false`).
         */
        this.collapsed = this.options.collapsed;

        /**
         * @type {Boolean}
         * Indique si le contrôle est déplaçable (`true`) ou non (`false`).
         */
        this.draggable = this.options.draggable;

        /**
         * @type {Boolean}
         * Indique si le contrôle active automatiquement ses comportements.
         */
        this.auto = this.options.auto;

        /**
         * @type {Boolean}
         * Indique si l'interaction au survol est activée.
         */
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
        this.btnPanoramaxButtonsContainer = null;
        /** @private */
        this.btnPanoramaxFilters = null;
        /** @private */
        this.btnPanoramaxContributions = null;
        /** @private */
        this.btnPanoramaxHover = null;

        /**
         * @type {Boolean}
         * Indique si les interactions de la carte sont actives.
         */
        this.eventActived = false;
        /**
         * @type {Object<String, Function>}
         * Référence des gestionnaires d'événements enregistrés sur la carte.
         */
        this.eventsListeners = [];

        /**
         * Événement déclenché à l'ouverture du panneau Panoramax.
         * @event pnx:opened
         * @defaultValue "pnx:opened"
         * @group Events
         * @description
         * Cet événement est émis quand le panneau Panoramax est ouvert.
         * Il indique que le processus Panoramax est démarré.
         * Il peut être utilisé pour déclencher des actions complémentaires.
         */
        this.OPENED_PANORAMAX_EVENT = "pnx:opened";

        /**
         * Nom du callback déclenché lors d'un clic sur la couche Panoramax active.
         * @event pnx:data:clicked
         * @defaultValue "pnx:data:clicked"
         * @group Callbacks
         * @description
         * Ce callback est utilisé pour récupérer la première entité touchée
         * au clic (coordonnées et propriétés) sur la couche Panoramax.
         */
        this.CLICKED_DATA_PANORAMAX_CB = "pnx:data:clicked";

        /**
         * Nom du callback déclenché lors du survol de la couche Panoramax active.
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
     * Construit le conteneur principal du contrôle (initialisation DOM).
     *
     * @returns {HTMLElement} DOM element
     * @private
     */
    initContainer () {
        // create main container
        var container = this._createMainContainerElement();

        var picto = this.buttonPanoramaxShow = this._createShowWidgetPictoElement();
        container.appendChild(picto);

        // panel viewer
        var widgetPanelViewer = this.panelPanoramaxViewerContainer = this._createWidgetPanelViewerElement();
        var widgetPanelDiv = this._createWidgetPanelViewerDivElement();
        widgetPanelViewer.appendChild(widgetPanelDiv);
        container.appendChild(widgetPanelViewer);

        // panel buttons
        var widgetPanel = this.panelPanoramaxButtonsContainer = this._createWidgetPanelButtonsElement();
        var widgetPanelDiv = this._createWidgetPanelButtonsDivElement();
        widgetPanel.appendChild(widgetPanelDiv);

        // container for the custom code : buttons, header, etc.
        var buttons = this.btnPanoramaxButtonsContainer = this._createWidgetButtonsElement();
        widgetPanel.appendChild(buttons);
        if (this.options.buttons.display) {
            if (this.options.buttons.filters.display) {
                this.btnPanoramaxFilters = this._createButtonFiltersElement(this.options.buttons.filters);
                buttons.appendChild(this.btnPanoramaxFilters);
            }
            if (this.options.buttons.contributions.display) {
                this.btnPanoramaxContributions = this._createButtonContributionsElement(this.options.buttons.contributions);
                buttons.appendChild(this.btnPanoramaxContributions);
            }
            if (this.options.buttons.hover.display) {
                this.btnPanoramaxHover = this._createButtonChoiceHoverElement(this.options.hover, this.options.buttons.hover);
                buttons.appendChild(this.btnPanoramaxHover);
            }
        }

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
     * Ajoute les écouteurs d'événements sur la carte (appelé par `setMap`).
     * 
     * @param {Map} map - Instance de carte.
     * @private
     */
    addEventsListeners (map) {
        // TODO : à revoir pour éviter les problèmes de performance
        var self = this;

        // click on map with panoramax layer active
        // display the panoramic image in the photo viewer at the clicked coordinates if
        // a feature of type picture is found, otherwise zoom on the clicked coordinates 
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
                layerFilter : (l) => l === self.layerPanoramax || l=== self.previewMarkerOverlay,
                hitTolerance : 5
            };
            var feature = e.map.forEachFeatureAtPixel(e.pixel, callback, options);
            if (!feature) {
                return;
            }
            var sequenceId = feature.properties.first_sequence || null;
            var pictureId = feature.properties.id || null;
            var type = feature.properties.layer || null;
            if (type !== "pictures") {
                if (type === "grid") {
                    // zoom on the clicked coordinates with a zoom level 
                    // depending on the density of images in the grid
                    var zoom = e.map.getView().getZoom();
                    var newZoom = zoom + 4; // FIXME valeur aleatoire !?
                    e.map.getView().animate({
                        center : feature.coordinates,
                        zoom : newZoom,
                        duration : 500
                    });
                }
                if (type === "sequences") {
                    // zoom on the clicked coordinates with a zoom level 
                    // depending on the density of images in the sequence
                    var zoom = e.map.getView().getZoom();
                    var newZoom = zoom + 2; // FIXME valeur aleatoire !?
                    e.map.getView().animate({
                        center : feature.coordinates,
                        zoom : newZoom,
                        duration : 500
                    });
                }
                return;
            } else {
                if (!sequenceId && !pictureId) {
                    logger.warn("No sequenceId or pictureId found for the clicked feature");
                    return;
                }
                self.displayPhotoViewer(sequenceId, pictureId);
            }
        };
        map.on("click", this.eventsListeners[this.CLICKED_DATA_PANORAMAX_CB]);

        // hover on map with panoramax layer active
        // display a preview of the panoramic image at the hovered coordinates
        this.eventsListeners[this.HOVERED_DATA_PANORAMAX_CB] = function (e) {
            if (!self.hover) {
                return;
            }
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

    /**
     * Supprime les écouteurs d'événements de la carte (appelé par `setMap`).
     * @private
     */
    removeEventsListeners () {
        var map = this.getMap();
        this.resetPreview();

        map.un("click", this.eventsListeners[this.CLICKED_DATA_PANORAMAX_CB]);
        delete this.eventsListeners[this.CLICKED_DATA_PANORAMAX_CB];
        map.un("pointermove", this.eventsListeners[this.HOVERED_DATA_PANORAMAX_CB]);
        delete this.eventsListeners[this.HOVERED_DATA_PANORAMAX_CB];

        var mapTarget = map.getTargetElement();
        if (mapTarget) {
            mapTarget.style.cursor = "";
        }
    }

    // ################################################################### //
    // ################# privates methods : reset ######################## //
    // ################################################################### //

    /**
     * Réinitialise le contenu du panneau à la fermeture.
     * @private
     */
    reset () {
        // - vider la couche de fond
        this.resetBackground();
        // - vider la couche de données
        this.resetLayer();
        // - reinit des filtres
        this.resetFilters();
        // - reinit des contributions (?)
        this.resetContributions();
        // - reinit de la fenêtre de visualisation (?)
        this.resetVisualizationWindow();
        // - reinit du viewer de photos
        this.resetPhotoViewer();
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
    resetContributions () {}
    resetPhotoViewer () {
        if (this.photoViewerPanoramax) {
            this.photoViewerPanoramax.setAttribute("sequence", "");
            this.photoViewerPanoramax.setAttribute("picture", "");
            this.photoViewerPanoramax.select();
            this.hidePhotoViewer();
        }
    }
    resetVisualizationWindow () {
    }
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

    // ################################################################### //
    // ################# privates methods : init ######################### //
    // ################################################################### //

    /**
     * Charge les éléments du panneau à l'ouverture.
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
            // - charger le bouton de contribution
            await this.initContributions();
            // - charger la fenêtre de visualisation (?)
            await this.initVisualizationWindow();
            // - configurer le viewer de photos
            await this.initPhotoViewer();
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
        this.layerPanoramax = new VectorTileLayer({ 
            declutter : true,
            minZoom : opts.minZoom || 6,
            maxZoom : opts.maxZoom || 21
        });
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
        this.backgroundPanoramax = new VectorTileLayer({ 
            declutter : true,
            minZoom : opts.minZoom || 6,
            maxZoom : opts.maxZoom || 21
        });
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
                this.setSizeWindow(this.options.visualizationWindow.size);
                this.panelPanoramaxViewerContainer.classList.add("gpf-hidden");
                this.panelPanoramaxViewerContainer.firstChild.classList.add("gpf-hidden");
                resolve();
            }, 100);
        });
    }

    initPhotoViewer () {
        // options.viewer.endpoint : "https://explore.panoramax.fr/api"
        // options.viewer.class : "..." (TODO)
        // options.viewer.widgets : true/false (TODO)
        // options.viewer.psv-options : {} (TODO)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                logger.debug("initPhotoViewer");
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
            photoViewer.setAttribute("style", "width: 100vw; height: 100vh");
            this.panelPanoramaxViewerContainer.firstChild.appendChild(photoViewer);
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
        this.photoViewerPanoramax.classList.replace("gpf-hidden", "gpf-visible");
        this.panelPanoramaxViewerContainer.classList.replace("gpf-hidden", "gpf-visible");
        this.panelPanoramaxViewerContainer.firstChild.classList.replace("gpf-hidden", "gpf-visible");
    }

    hidePhotoViewer () {
        if (!this.photoViewerPanoramax) {
            logger.warn("Panoramax photo viewer is not available");
            return;
        }
        this.photoViewerPanoramax.classList.replace("gpf-visible", "gpf-hidden");
        this.panelPanoramaxViewerContainer.classList.replace("gpf-visible", "gpf-hidden");
        this.panelPanoramaxViewerContainer.firstChild.classList.replace("gpf-visible", "gpf-hidden");
    }

    // ################################################################### //
    // ######################## methods preview ########################## //
    // ################################################################### //

    /**
      Affiche ou met à jour le marqueur de prévisualisation.
     *
     * @param {Array<Number>} coordinates - Coordonnées `[x, y]` en projection carte.
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
            markerElement.className = "pnx-preview-marker";

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
     * Affiche ou met à jour la popup de prévisualisation.
     *
     * @param {Array<Number>} coordinates - Coordonnées `[x, y]` en projection carte.
     * @param {String} [content=""] - Contenu HTML injecté dans la popup.
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
            this.previewPopupElement.className = "pnx-popup-content";
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
     * Affiche la prévisualisation selon le type de couche Panoramax.
     *
     * @param {PanoramaxPreviewFeature} feature - Entité à prévisualiser.
     */
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

    /**
     * Échappe une valeur pour un affichage HTML sûr.
     *
     * @param {*} value - Valeur à échapper.
     * @returns {String} Valeur échappée.
     */
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
     * Affiche la prévisualisation d'une entité de type `grid`.
     *
     * @param {Array<Number>} coordinates - Coordonnées du point survolé.
     * @param {Object<String, *>} feature - Propriétés de l'entité survolée.
     */
    displayPreviewGrid (coordinates, feature) {
        var nbPictures = this._escape(feature.nb_pictures);
        var nb360Pictures = this._escape(feature.nb_360_pictures);
        var nbFlatPictures = this._escape(feature.nb_flat_pictures);

        var className = "pnx-preview-grid-popup";
        var content = `
            <ul class="${className}">
                <li><strong>nombre de photos :</strong> ${nbPictures || "-"}</li>
                <li><strong>nombre de photos 360° :</strong> ${nb360Pictures || "-"}</li>
                <li><strong>nombre de photos plates :</strong> ${nbFlatPictures || "-"}</li>
            </ul>
        `;

        this.setMarker(coordinates);
        this.setPopup(coordinates, content);
    }

    /**
     * Affiche la prévisualisation d'une entité de type `sequences`.
     *
     * @param {Array<Number>} coordinates - Coordonnées du point survolé.
     * @param {Object<String, *>} feature - Propriétés de l'entité survolée.
     */
    displayPreviewSequence (coordinates, feature) {
        var pictureId = feature.id;
        var id = this._escape(pictureId);
        var date = this._escape(feature.date || feature.created_at || feature.datetime);

        var encodedPictureId = pictureId ? encodeURIComponent(pictureId) : "";
        var api = (this.options.viewer.endpoint || "https://explore.panoramax.fr/api").replace(/\/+$/, "");
        var className = "pnx-preview-sequence-popup";
        var imageHtml = encodedPictureId
            ? `<img src="${api}/collections/${encodedPictureId}/thumb.jpg" alt="Preview image" class="pnx-preview-picture-popup__img">`
            : "";
        var content = `
            <p class="${className}"><strong>ID :</strong> ${id || "-"}
                <pre>date : ${date || "-"}</pre>
                ${imageHtml}
            </p>
        `;

        this.setMarker(coordinates);
        this.setPopup(coordinates, content);
    }

    /**
     * Affiche la prévisualisation d'une entité de type `pictures`.
     *
     * @param {Array<Number>} coordinates - Coordonnées du point survolé.
     * @param {Object<String, *>} feature - Propriétés de l'entité survolée.
     */
    displayPreviewPicture (coordinates, feature) {
        var pictureId = feature.id;
        var id = this._escape(pictureId);
        var ts = this._escape(feature.ts || feature.datetime || feature.created_at);

        var encodedPictureId = pictureId ? encodeURIComponent(pictureId) : "";
        var api = (this.options.viewer.endpoint || "https://explore.panoramax.fr/api").replace(/\/+$/, "");
        var className = "pnx-preview-picture-popup";
        var imageHtml = encodedPictureId
            ? `<img src="${api}/pictures/${encodedPictureId}/thumb.jpg" alt="Preview image" class="pnx-preview-picture-popup__img">`
            : "";
        var content = `
            <p class="${className}"><strong>ID :</strong> ${id || "-"}
                <pre>date : ${ts || "-"}</pre>
                ${imageHtml}
            </p>
        `;

        this.setMarker(coordinates);
        this.setPopup(coordinates, content);
    }

    // ################################################################### //
    // ######################## methods visualization #################### //
    // ################################################################### //

    setSizeWindow (size) {
        var container = this.panelPanoramaxViewerContainer;
        if (!container) {
            return;
        }
        container.classList.remove("pnx-visualization-window-size-small", "pnx-visualization-window-size-medium", "pnx-visualization-window-size-large", "pnx-visualization-window-size-fullscreen");
        switch (size) {
            case "small":
                container.classList.add("pnx-visualization-window-size-small");
                break;
            case "medium":
                container.classList.add("pnx-visualization-window-size-medium");
                break;
            case "large":
                container.classList.add("pnx-visualization-window-size-large");
                break;
            case "fullscreen":
                container.classList.add("pnx-visualization-window-size-fullscreen");
                break;
            default:
                logger.warn("Unknown visualization window size :", size);
                container.classList.add("pnx-visualization-window-size-medium");
                break;
        }
    }

    // ################################################################### //
    // ######################## event dom ################################ //
    // ################################################################### //
    
    /**
     * Gère le clic d'ouverture/fermeture du contrôle Panoramax.
     *
     * @param {Event} e - Événement DOM du bouton d'ouverture.
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
     * Gère le clic de fermeture du panneau Panoramax.
     *
     * @param {Event} e - Événement DOM du bouton de fermeture.
     * @private
     */
    onClosePanoramaxClick (e) {
        logger.debug(e);
    }

    /**
     * Gère le clic d'activation/désactivation du mode de survol dans Panoramax.
     *
     * @param {Event} e - Événement DOM du bouton de survol.
     * @private
     */
    onToggleChoiceHoverPanoramaxClick (e) {
        logger.debug(e);
        this.hover = !this.hover;
    }

    /**
     * Gère le clic d'ouverture des filtres Panoramax.
     *
     * @param {Event} e - Événement DOM du bouton de filtres.
     * @private
     */
    onOpenPanoramaxFiltersClick (e) {
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
