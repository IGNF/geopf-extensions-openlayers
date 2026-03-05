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
import Overlay from "ol/Overlay";
import LayerGroup from "ol/layer/Group";
import { 
    MapboxVectorLayer,
    applyStyle
} from "ol-mapbox-style";

// lib panoramax
import "@panoramax/web-viewer/build/photoviewer";
import "@panoramax/web-viewer/build/photoviewer.css";

// lib external
import { subMonths } from "date-fns";

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
 * @property {String|HTMLElement|null} [buttons.target] - **Experimental** -Cible DOM où injecter le panneau des boutons.
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
 * @property {Object} [buttons.styles] - Options de configuration du bouton de styles.
 * @property {Boolean} [buttons.styles.display] - Affiche ou masque le bouton de styles.
 * @property {String} [buttons.styles.label] - Libellé du bouton de styles.
 * @property {String} [buttons.styles.description] - Description du bouton de styles.
 * @property {Object} [buttons.styles.content] - Options de configuration du contenu des styles.
 * @property {Object} [buttons.background] - Options de configuration du bouton de fond.
 * @property {Boolean} [buttons.background.display] - Affiche ou masque le bouton de fond de carte.
 * @property {String} [buttons.background.label] - Libellé du bouton de fond de carte.
 * @property {String} [buttons.background.description] - Description du bouton de fond de carte.
 * @property {Object} [visualizationWindow] - Options de configuration de la fenêtre de visualisation.
 * @property {Boolean} [visualizationWindow.display] - Affiche ou masque la fenêtre de visualisation.
 * @property {String|HTMLElement|null} [visualizationWindow.target] - **Experimental** - Cible DOM où injecter le panneau de visualisation.
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
     * @fires pnx:data:clicked
     * @fires pnx:data:hovered
     * @fires pnx:filter:dates
     * @fires pnx:filter:periode
     * @fires pnx:filter:type
     *
     * @example
     * var panoramax = new ol.control.Panoramax({
     *   collapsed: false,
     *   draggable: true,
     *   auto: true,
     *   hover: true,
     *   position: "top-right",
     *   layer: {
     *     url: "https://api.panoramax.xyz/api/map/style.json",
     *     name: "Panoramax",
     *     minZoom: 6,
     *     maxZoom: 21
     * },
     * background: {
     *  display: true,
     *  url: "https://data.geopf.fr/annexes/ressources/vectorTiles/styles/PLAN.IGN/gris.json",
     *  name: "Background",
     *  minZoom: 6,
     *  maxZoom: 21
     * },
     * buttons: {
     *   display: true,
     *   position: "top-right",
     *   order: ["filters", "contributions", "hover", "styles", "background"],
     *   filters: {
     *     display: true,
     *     label: "Filtrer",
     *     description: "Filtrer les images affichées",
     *     content: {
     *       dates: true,
     *       types: true,
     *       periodes: true
     *     }
     *   },
     *   hover: {
     *     display: true,
     *     label: "Aperçu au survol",
     *     description: "Afficher un aperçu de l'image au survol"
     *   },
     *   contributions: {
     *     display: true,
     *     label: "Contribuer",
     *     description: "Accéder au parcours de contribution",
     *     link: "https://panoramax.openstreetmap.fr/why-contribute"
     *   },
     *   styles: {
     *     display: false,
     *     label: "Style",
     *     description: "Personnaliser le style d'affichage des images",
     *     content: {}
     *   },
     *   background: {
     *     display: true,
     *     label: "Fond de carte",
     *     description: "Afficher ou masquer un fond de carte de référence"
     *   }
     * },
     * visualizationWindow: {
     *   display: true,
     *   position: "top-right",
     *   size: "medium"
     * },
     * viewer: {
     *   endpoint: "https://explore.panoramax.fr/api",
     *   class: "",
     *   widgets: true,
     *   psv-options: {}
     * }}});
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
                var dragContainer = this.panelPanoramaxButtonsContainer && this.panelPanoramaxButtonsContainer.parentElement
                    ? this.panelPanoramaxButtonsContainer.parentElement
                    : (this.options.position ? null : map.getTargetElement());
                if (!dragContainer) {
                    logger.warn("Panoramax draggable mode requires a container element");
                } else {
                    Draggable.dragElement(
                        this.panelPanoramaxButtonsContainer,
                        this.panelPanoramaxButtonsHeaderContainer,
                        dragContainer
                    );
                }
            }
            // mode "collapsed"
            if (!this.collapsed) {
                this.buttonPanoramaxShow.setAttribute("aria-pressed", true);
            }
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

        window.PNX_MAP = map; // for debug
    }

    // ################################################################### //
    // ################### getters / setters ############################# //
    // ################################################################### //
    
    /**
     * Get container
     *
     * @returns {HTMLElement} container
     * @public
     */
    getContainer () {
        return this.container;
    }

    /**
     * Indique si le widget est replié.
     *
     * @returns {Boolean} `true` si le widget est replié, `false` sinon.
     * @public
     */
    getCollapsed () {
        return this.collapsed;
    }

    /**
     * Replie ou déplie le conteneur principal du widget.
     *
     * @param {Boolean} collapsed - `true` pour replier, `false` pour afficher.
     * @public
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
            group : true, // option interne !
            layer : {
                url : "https://api.panoramax.xyz/api/map/style.json",
                source : "geovisio",
                name : "Panoramax",
                minZoom : 6,
                maxZoom : 21
            },
            background : {
                display : true,
                url : "https://data.geopf.fr/annexes/ressources/vectorTiles/styles/PLAN.IGN/gris.json",
                name : "Background",
                minZoom : 6,
                maxZoom : 21
            },
            buttons : {
                display : true,
                target : null, // experimental !
                position : "top-right", // TODO
                order : ["filters", "contributions", "hover", "background", "styles"],
                filters : {
                    display : true,
                    label : "Filtrer",
                    description : "Filtrer les images affichées",
                    content : {
                        dates : true,
                        types : true,
                        periodes : true
                    }
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
                styles : { // TODO
                    display : true,
                    label : "Rendu de la carte",
                    description : "Personnaliser le rendu de la carte",
                    content : ["Classique", "Type de camera", "Date de prise de vue"]
                },
                background : {
                    display : true,
                    label : "Fond de carte",
                    description : "Afficher ou masquer un fond de carte de référence"
                }
            },
            visualizationWindow : {
                display : true,
                target : null, // experimental !
                position : "top-right", // TODO
                size : "medium"
            },
            viewer : {
                "endpoint" : "https://explore.panoramax.fr/api",
                "class" : "", // TODO
                "widgets" : true, // TODO
                "psv-options" : {} // TODO
            },
        };

        // merge with user options
        Utils.assign(this.options.layer, options.layer);
        Utils.assign(this.options.background, options.background);
        Utils.assign(this.options.buttons, options.buttons);
        Utils.assign(this.options.visualizationWindow, options.visualizationWindow);
        Utils.assign(this.options.viewer, options.viewer);
        [
            "collapsed", 
            "draggable", 
            "panel", 
            "auto", 
            "hover", 
            "gutter", 
            "position"
        ].forEach((key) => {
            if (Object.prototype.hasOwnProperty.call(options, key)) {
                this.options[key] = options[key];
            }
        });

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
        this.btnPanoramaxButtonsContainer = null;
        /** @private */
        this.btnPanoramaxFilters = null;
        /** @private */
        this.panelPanoramaxFilters = null;
        /** @private */
        this._onPanoramaxFiltersReposition = null;
        /** @private */
        this.btnPanoramaxContributions = null;
        /** @private */
        this.btnPanoramaxHover = null;
        /** @private */
        this.btnPanoramaxStyles = null;
        /** @private */
        this.btnPanoramaxBackground = null;

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
         * Types de couches Panoramax disponibles dans le TMS vecteur 
         * (https://api.panoramax.xyz/api/map/style.json).
         */
        this.PANORAMAX_LAYERS_TYPES = ["grid", "sequences", "pictures"];

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
         * @description
         * Ce callback est utilisé pour récupérer la première entité touchée
         * au survol (coordonnées et propriétés) sur la couche Panoramax.
         */
        this.HOVERED_DATA_PANORAMAX_CB = "pnx:data:hovered";

        /**
         * Nom de l'événement déclenché quand une plage de dates est saisie.
         * @event pnx:filter:dates
         * @defaultValue "pnx:filter:dates"
         * @group Events
         */
        this.FILTER_DATES_PANORAMAX_EVENT = "pnx:filter:dates";

        /**
         * Nom de l'événement déclenché quand une période prédéfinie est sélectionnée.
         * @event pnx:filter:periode
         * @defaultValue "pnx:filter:periode"
         * @group Events
         */
        this.FILTER_PERIODE_PANORAMAX_EVENT = "pnx:filter:periode";

        /**
         * Nom de l'événement déclenché quand un type d'image est sélectionné.
         * @event pnx:filter:type
         * @defaultValue "pnx:filter:type"
         * @group Events
         */
        this.FILTER_TYPE_PANORAMAX_EVENT = "pnx:filter:type";

        /**
         * Nom de l'événement déclenché quand les filtres sont appliqués.
         * @event pnx:filter:render
         * @defaultValue "pnx:filter:render"
         * @group Events
         */
        this.FILTER_RENDER_PANORAMAX_EVENT = "pnx:filter:render";

        /** photo viewer */
        this.photoViewerPanoramax = null;

        /** @type {MapboxVectorLayer} */
        this.layerPanoramax = null;
        /** @type {MapboxVectorLayer} */
        this.backgroundPanoramax = null;
        /** @type {MapboxLayerGroup} */
        this.groupPanoramax = null;

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
        var widgetPanelViewerDiv = this._createWidgetPanelViewerDivElement();
        widgetPanelViewer.appendChild(widgetPanelViewerDiv);

        // experimental : possibilité d'injecter le panneau de visualisation 
        // dans une cible spécifique
        var panelViewerTarget = this.resolveTargetElement(this.options.visualizationWindow.target);
        if (panelViewerTarget) {
            panelViewerTarget.appendChild(widgetPanelViewer);
        } else {
            container.appendChild(widgetPanelViewer);
        }

        // panel buttons
        var widgetPanelButtons = this.panelPanoramaxButtonsContainer = this._createWidgetPanelButtonsElement();
        var widgetPanelButtonsDiv = this._createWidgetPanelButtonsDivElement();
        widgetPanelButtons.appendChild(widgetPanelButtonsDiv);

        // experimental : possibilité d'injecter le panneau des boutons 
        // dans une cible spécifique
        var panelButtonsTarget = this.resolveTargetElement(this.options.buttons.target);
        if (panelButtonsTarget) {
            panelButtonsTarget.appendChild(widgetPanelButtons);
        } else {
            container.appendChild(widgetPanelButtons);
        }

        // header
        var widgetPanelButtonsHeader = this.panelPanoramaxButtonsHeaderContainer = this._createWidgetPanelButtonsHeaderElement(this.options.panel);
        // icone
        var widgetPanelButtonsIcon = this._createWidgetPanelButtonsIconElement();
        widgetPanelButtonsHeader.appendChild(widgetPanelButtonsIcon);
        // title
        var widgetPanelButtonsTitle = this._createWidgetPanelButtonsTitleElement();
        widgetPanelButtonsHeader.appendChild(widgetPanelButtonsTitle);
        // close picto
        var widgetPanelButtonsClose = this._createWidgetPanelButtonsCloseElement();
        widgetPanelButtonsHeader.appendChild(widgetPanelButtonsClose);
        
        widgetPanelButtonsDiv.appendChild(widgetPanelButtonsHeader);

        // container for the custom code : buttons, header, etc.
        var buttons = this.btnPanoramaxButtonsContainer = this._createWidgetButtonsElement();
        widgetPanelButtonsDiv.appendChild(buttons);
        if (this.options.buttons.display) {
            for (const buttonKey of this.options.buttons.order) {
                switch (buttonKey) {
                    case "filters":
                        if (this.options.buttons.filters.display) {
                            this.btnPanoramaxFilters = this._createButtonFiltersElement(this.options.buttons.filters);
                            buttons.appendChild(this.btnPanoramaxFilters);
                            this.panelPanoramaxFilters = this._createWidgetPanelFiltersElement(this.options.buttons.filters.content);
                        }
                        break;
                    case "contributions":
                        if (this.options.buttons.contributions.display) {
                            this.btnPanoramaxContributions = this._createButtonContributionsElement(this.options.buttons.contributions);
                            buttons.appendChild(this.btnPanoramaxContributions);
                        }
                        break;
                    case "hover":
                        if (this.options.buttons.hover.display) {
                            this.btnPanoramaxHover = this._createButtonChoiceHoverElement(this.options.hover, this.options.buttons.hover);
                            buttons.appendChild(this.btnPanoramaxHover);
                        }
                        break;
                    case "styles":
                        if (this.options.buttons.styles.display) {
                            this.btnPanoramaxStyles = this._createButtonChoiceStyleElement(this.options.buttons.styles);
                            buttons.appendChild(this.btnPanoramaxStyles);
                        }
                        break;
                    case "background":
                        if (this.options.buttons.background.display) {
                            this.btnPanoramaxBackground = this._createButtonChoiceBackgroundElement(this.options.background.display, this.options.buttons.background);
                            buttons.appendChild(this.btnPanoramaxBackground);
                        }
                        break;
                    default:
                        break;
                }
            }
        }

        if (this.panelPanoramaxFilters) {
            var panelFiltersTarget = this.panelPanoramaxButtonsContainer.parentElement || container;
            panelFiltersTarget.appendChild(this.panelPanoramaxFilters);
        }

        // experimental : possibilité d'injecter le panneau des boutons dans une cible spécifique
        var panelButtonsTarget = this.resolveTargetElement(this.options.buttons.target);
        if (panelButtonsTarget) {
            panelButtonsTarget.appendChild(widgetPanelButtons);
        } else {
            container.appendChild(widgetPanelButtons);
        }

        logger.log(container);

        return container;
    }

    /**
     * Résout une cible DOM à partir 
     * - d'un élément, 
     * - d'un id
     * - d'un sélecteur CSS.
     *
     * @param {HTMLElement|String|null|undefined} target - Cible DOM fournie dans les options.
     * @returns {HTMLElement|null} Élément cible résolu, sinon `null`.
     * @private
     */
    resolveTargetElement (target) {
        if (!target) {
            return null;
        }

        if (target instanceof HTMLElement) {
            return target;
        }

        if (typeof target !== "string") {
            logger.warn("Unsupported Panoramax target option type:", typeof target);
            return null;
        }

        var normalizedTarget = target.trim();
        if (!normalizedTarget) {
            return null;
        }

        var targetElement = null;
        if (normalizedTarget.charAt(0) === "#") {
            targetElement = document.getElementById(normalizedTarget.slice(1));
        } else {
            targetElement = document.getElementById(normalizedTarget);
        }

        if (!targetElement) {
            try {
                targetElement = document.querySelector(normalizedTarget);
            } catch (err) {
                logger.warn("Invalid Panoramax target selector:", normalizedTarget, err);
                return null;
            }
        }

        if (!targetElement) {
            logger.warn("Panoramax target not found:", normalizedTarget);
        }
        return targetElement;
    }

    // ################################################################### //
    // ################# privates events / handlers ###################### //
    // ################################################################### //

    debounce (func, delay) {
        let timerId;

        return function (...args) {
            clearTimeout(timerId);
            timerId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }
    /**
     * Ajoute les écouteurs d'événements sur la carte (appelé par `setMap`).
     * 
     * @param {Map} map - Instance de carte.
     * @private
     */
    addEventsListeners (map) {
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
                layerFilter : (l) => l === self.layerPanoramax || l === self.previewMarkerOverlay,
                hitTolerance : 5
            };
            var feature = e.map.forEachFeatureAtPixel(e.pixel, callback, options);
            if (!feature) {
                return;
            }
            var sequenceId = feature.properties.first_sequence || null;
            var pictureId = feature.properties.id || null;
            var type = feature.properties.layer || feature.properties["mvt:layer"] || null;
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
        map.on("pointermove", this.debounce(this.eventsListeners[this.HOVERED_DATA_PANORAMAX_CB], 300));
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
        map.un("pointermove", this.debounce(this.eventsListeners[this.HOVERED_DATA_PANORAMAX_CB], 300));
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
        if (this.options.group) {
            this.resetGroupLayer();
        }
        // - vider la couche de fond
        this.resetBackground();
        // - vider la couche de données
        this.resetLayer();
        // - reinit des boutons
        this.resetButtons();
        // - reinit de la fenêtre de visualisation (?)
        this.resetVisualizationWindow();
        // - reinit du viewer de photos
        this.resetPhotoViewer();
        // - nettoyer l'aperçu au survol
        this.resetPreview();
        // - etc.
        this.eventActived = false;
    }

    resetGroupLayer () {
        logger.debug("resetGroupLayer");
        var map = this.getMap();
        if (this.groupPanoramax) {
            map.removeLayer(this.groupPanoramax);
            this.groupPanoramax = null;
        }
    }
    resetLayer () {
        logger.debug("resetLayer");
        var map = this.getMap();
        if (!map) {
            return;
        }
        if (this.layerPanoramax) {
            map.removeLayer(this.layerPanoramax);
            if (this.groupPanoramax) {
                this.groupPanoramax.getLayers().remove(this.layerPanoramax);
            }
            this.layerPanoramax = null;
        }
    }
    resetBackground () {
        logger.debug("resetBackground");
        var map = this.getMap();
        if (!map) {
            return;
        }
        if (this.backgroundPanoramax) {
            map.removeLayer(this.backgroundPanoramax);
            if (this.groupPanoramax) {
                this.groupPanoramax.getLayers().remove(this.backgroundPanoramax);
            }
            this.backgroundPanoramax = null;
        }
    }
    resetButtons () {
        if (this.panelPanoramaxFilters) {
            this.panelPanoramaxFilters.classList.replace("gpf-visible", "gpf-hidden");
        }
        if (this.btnPanoramaxFilters) {
            this.btnPanoramaxFilters.setAttribute("aria-pressed", "false");
        }
        this.unbindFiltersPanelPositioning();
    }
    resetPhotoViewer () {
        if (this.photoViewerPanoramax) {
            if (this.photoViewerPanoramax.getAttribute("sequence")) {
                this.photoViewerPanoramax.setAttribute("sequence", "");
            }
            if (this.photoViewerPanoramax.getAttribute("picture")) {
                this.photoViewerPanoramax.setAttribute("picture", "");
            }
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
            if (this.options.group) {
                this.setLayerGroup();
            }
            // - charger la couche de fond
            await this.setBackground(this.options.background);
            // - charger la couche de données
            await this.setLayer(this.options.layer);
            // - charger les boutons
            await this.initButtons();
            // - charger la fenêtre de visualisation (?)
            await this.initVisualizationWindow();
            // - configurer le viewer de photos
            await this.initPhotoViewer();
        } catch (err) {
            logger.error("Error loading Panoramax content", err);
        }
    }

    /**
     * Attends que la couche Mapbox Vector soit prête 
     * (source chargée et style appliqué) avant de continuer.
     * @param {MapboxVectorLayer} layer - Couche Mapbox Vector à vérifier.
     * @returns {Promise<MapboxVectorLayer>} Promise résolue avec la couche prête, ou rejetée en cas d'erreur.
     * @private
     */
    async waitForMapboxVectorLayerReady (layer) {
        return new Promise((resolve, reject) => {
            // on vérifie que la source de la couche est prête avant de continuer
            if (!layer) {
                reject(new Error("Layer is not defined"));
                return;
            }

            var source = layer.getSource && layer.getSource();
            if (!source) {
                reject(new Error("Layer source is not available"));
                return;
            }

            var state = source.getState && source.getState();
            if (state === "ready") {
                resolve(layer);
                return;
            }
            if (state === "error") {
                reject(new Error("Error loading layer source"));
                return;
            }

            var onSourceChange = () => {
                var nextState = source.getState && source.getState();
                if (nextState === "ready") {
                    source.un("change", onSourceChange);
                    resolve(layer);
                } else if (nextState === "error") {
                    source.un("change", onSourceChange);
                    reject(new Error("Error loading layer source"));
                }
            };

            source.on("change", onSourceChange);
            layer.once("error", (evt) => {
                source.un("change", onSourceChange);
                reject(evt && evt.error ? evt.error : new Error("Error loading layer style"));
            });
        });
    }

    /**
     * Récupère le style JSON de la couche Mapbox Vector et le met en cache dans la couche.
     * @param {MapboxVectorLayer} layer - Couche Mapbox Vector dont on veut récupérer le style JSON.
     * @returns {Promise<Object|null>} Promise résolue avec le style JSON de la couche, ou `null` en cas d'erreur ou si la couche n'est pas définie.
     * @private
     */
    async getStyleJsonFromMapboxVectorLayer (layer) {
        if (!layer) {
            return null;
        }

        var map = this.getMap();
        if (!map) {
            return null;
        }

        // INFO
        // on utilise "mapbox-style" comme clé de cache dans la couche
        // ol-mapbox-style met à jour les clefs suivantes : 
        // - mapbox-style
        // - mapbox-source
        // - mapbox-layers
        // - mapbox-metadata (?)
        var styleJson = layer.get("mapbox-style");
        if (!styleJson) {
            try {
                const response = await fetch(layer.styleUrl);
                if (!response.ok) {
                    throw new Error("HTTP " + response.status + " while fetching style");
                }
                styleJson = await response.json();
                layer.set("mapbox-style", styleJson);
                // on duplique dans la source...
                var source = layer.getSource && layer.getSource();
                if (source) {
                    source.set("mapbox-source", layer.get("mapbox-source"));
                    source.set("mapbox-style", layer.get("mapbox-style"));
                    source.set("mapbox-layers", layer.get("mapbox-layers"));
                }
            } catch (err) {
                logger.warn("Unable to cache Panoramax layer style JSON", err);
            }
        }
        return styleJson;
    }

    setLayerGroup () {
        var map = this.getMap();
        if (!map) {
            return;
        }
        if (!this.groupPanoramax) {
            this.groupPanoramax = new LayerGroup();
            map.addLayer(this.groupPanoramax);
            this.groupPanoramax.set("title", "Panoramax");
        }
    }

    async setLayer (opts) {
        logger.debug("initLayer");
        // options de la couche :
        // - url : https://api.panoramax.xyz/api/map/style.json
        // - name : "Panoramax"
        // - etc.
        var map = this.getMap();
        if (!map) {
            return;
        }
        var layer = new MapboxVectorLayer({ 
            styleUrl : opts.url,
            source : opts.source,
            declutter : true,
            minZoom : opts.minZoom || 6,
            maxZoom : opts.maxZoom || 21
        });
        // hack pour le gestionnaire de couche
        layer.styleUrl = opts.url;
        
        if (this.groupPanoramax) {
            this.groupPanoramax.getLayers().push(layer);
        } else {
            map.addLayer(layer);
        }

        try {
            await this.waitForMapboxVectorLayerReady(layer);
            await this.getStyleJsonFromMapboxVectorLayer(layer);
            // mise à jour du nom de la couche du gestionnaire de couche
            layer.set("title", opts.name);
            // sauvegarde de la référence de la couche
            this.layerPanoramax = layer;
            return layer;
        } catch (err) {
            logger.error("Error loading Panoramax layer style", err);
            map.removeLayer(layer);
            this.layerPanoramax = null;
            throw err;
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
        if (!map) {
            return;
        }

        var layer = new MapboxVectorLayer({ 
            styleUrl : opts.url,
            declutter : true,
            minZoom : opts.minZoom || 6,
            maxZoom : opts.maxZoom || 21
        });
        layer.styleUrl = opts.url;

        if (this.groupPanoramax) {
            this.groupPanoramax.getLayers().insertAt(0, layer);
        } else {
            map.addLayer(layer);
        }

        try {
            await this.waitForMapboxVectorLayerReady(layer);
            this.backgroundPanoramax = layer;
            this.backgroundPanoramax.set("title", opts.name);
            if (this.layerPanoramax) {
                this.backgroundPanoramax.setZIndex(this.layerPanoramax.getZIndex() - 1);
            }
            return layer;
        } catch (err) {
            logger.error("Error loading Panoramax background layer style", err);
            map.removeLayer(layer);
            this.backgroundPanoramax = null;
            throw err;
        }
    }

    async initButtons () {
        // options.contributions.display : true/false
        // options.contributions.label : "Contribuer"
        // options.filters.display : true/false
        // options.filters.label : "Filtrer"
        // options des filtres :
        // - types d'images : Tout, classique, 360
        // - dates : ...
        // - qualité : ...
        // - precision : ...
        // - etc.
        return new Promise((resolve, reject) => {
            logger.debug("initButtons");
            this.showButtonsPanel();
            resolve();
        });
    }

    async initVisualizationWindow () {
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
            logger.debug("initVisualizationWindow");
            this.setSizeWindow(this.options.visualizationWindow.size);
            resolve();
        });
    }

    async initPhotoViewer () {
        // options.viewer.endpoint : "https://explore.panoramax.fr/api"
        // options.viewer.class : "..." (TODO)
        // options.viewer.widgets : true/false (TODO)
        // options.viewer.psv-options : {} (TODO)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                logger.debug("initPhotoViewer");
                // INFO
                // par défaut, la fenêtre de visualisation est masquée, elle s'affiche au clic sur une image
                // mais pour initialiser le viewer de photos de Panoramax, il faut que le container soit visible, 
                // avec une taille !
                this.showPhotoViewer();
                if (!this.photoViewerPanoramax) {
                    this.photoViewerPanoramax = this.createPhotoViewer();
                    // HACK orienté maintenance :
                    // console.error(this.photoViewerPanoramax.offsetWidth, this.photoViewerPanoramax.isWidthSmall());
                    // console.error(this.photoViewerPanoramax.offsetHeight, this.photoViewerPanoramax.isHeightSmall());
                    // window.PNX_PHOTOVIEWER = this.photoViewerPanoramax;
                }
                this.hidePhotoViewer();
                resolve();
            }, 100);
        });
    }

    // ################################################################### //
    // ######################## methods menu buttons ##################### //
    // ################################################################### //
    showButtonsPanel () {
        this.panelPanoramaxButtonsContainer.firstChild.classList.replace("gpf-hidden", "gpf-visible");
    }

    hideButtonsPanel () {
        this.panelPanoramaxButtonsContainer.firstChild.classList.replace("gpf-visible", "gpf-hidden");
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
            photoViewer.id = "pnx-photo-viewer-" + this.uid;
            photoViewer.className = "pnx-photo-viewer-container";
            // photoViewer.setAttribute("endpoint", this.options.viewer.endpoint);
            
            // si un target est spécifié dans les options, on l'utilise, 
            // sinon on utilise le container par défaut
            var target = this.panelPanoramaxViewerContainer.lastChild;
            if (this.options.visualizationWindow.target) {
                // FIXME on perd le focus sur la carte (zoom, déplacement, etc.) 
                // quand le photoViewer est affiché dans un container externe, 
                // à cause !?
                var targetCustom = this.resolveTargetElement(this.options.visualizationWindow.target);
                if (targetCustom) {
                    target = targetCustom;
                }
            }
            if (target) {
                target.appendChild(photoViewer);
                requestAnimationFrame(() => {
                    photoViewer.setAttribute("endpoint", this.options.viewer.endpoint);
                });
            }
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
        this.hideButtonsPanel();
    }

    showPhotoViewer () {
        this.panelPanoramaxViewerContainer.classList.replace("gpf-hidden", "gpf-visible");
        this.panelPanoramaxViewerContainer.lastChild.classList.replace("gpf-hidden", "gpf-visible");
        
        if (!this.photoViewerPanoramax) {
            logger.warn("Panoramax photo viewer is not available");
            return;
        }
        this.photoViewerPanoramax.classList.replace("gpf-hidden", "gpf-visible");
    }

    hidePhotoViewer () {
        this.panelPanoramaxViewerContainer.classList.replace("gpf-visible", "gpf-hidden");
        this.panelPanoramaxViewerContainer.lastChild.classList.replace("gpf-visible", "gpf-hidden");
        
        if (!this.photoViewerPanoramax) {
            logger.warn("Panoramax photo viewer is not available");
            return;
        }
        this.photoViewerPanoramax.classList.replace("gpf-visible", "gpf-hidden");
    }

    // ################################################################### //
    // ######################## methods preview ########################## //
    // ################################################################### //

    /**
      Affiche ou met à jour le marqueur de prévisualisation.
     *
     * @param {Array<Number>} coordinates - Coordonnées `[x, y]` en projection carte.
     * @private
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
     * @private
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
     * @private
     */
    displayPreview (feature) {
        var type = feature.properties.layer || feature.properties["mvt:layer"];
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
     * @private
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
     * @param {PanoramaxPreviewLayerType} feature - Propriétés de l'entité survolée.
     * @private
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
     * @param {PanoramaxPreviewLayerType} feature - Propriétés de l'entité survolée.
     * @private
     */
    displayPreviewSequence (coordinates, feature) {
        var pictureId = feature.id;
        var id = this._escape(pictureId);
        var date = this._escape(feature.date || feature.created_at || feature.datetime);
        var type = this._escape(feature.type);

        var encodedPictureId = pictureId ? encodeURIComponent(pictureId) : "";
        var api = (this.options.viewer.endpoint || "https://explore.panoramax.fr/api").replace(/\/+$/, "");
        var className = "pnx-preview-sequence-popup";
        var imageHtml = encodedPictureId
            ? `<img src="${api}/collections/${encodedPictureId}/thumb.jpg" alt="Preview image" class="pnx-preview-picture-popup__img">`
            : "";
        var content = `
            <p class="${className}">
                <samp>
                    <strong>ID :</strong> <small>${id || "-"}</small> <br>
                    date : ${date || "-"} <br>
                    type : ${type || "-"}
                </samp>
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
     * @param {PanoramaxPreviewLayerType} feature - Propriétés de l'entité survolée.
     * @private
     */
    displayPreviewPicture (coordinates, feature) {
        var pictureId = feature.id;
        var id = this._escape(pictureId);
        var ts = this._escape(feature.ts || feature.datetime || feature.created_at);
        var type = this._escape(feature.type);

        var encodedPictureId = pictureId ? encodeURIComponent(pictureId) : "";
        var api = (this.options.viewer.endpoint || "https://explore.panoramax.fr/api").replace(/\/+$/, "");
        var className = "pnx-preview-picture-popup";
        var imageHtml = encodedPictureId
            ? `<img src="${api}/pictures/${encodedPictureId}/thumb.jpg" alt="Preview image" class="pnx-preview-picture-popup__img">`
            : "";
        var content = `
            <p class="${className}"><strong>ID :</strong> ${id || "-"}
                <pre>date : ${ts || "-"}</pre>
                <pre>type : ${type || "-"}</pre>
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
    // ######################## methods filters ########################## //
    // ################################################################### //

    /**
     * Récupère le style Mapbox de la couche de photos Panoramax.
     * Ex. : pour les types "grid", "sequences", ou "pictures", 
     * on retourne le style de la couche correspondante.
     *
     * @param {PanoramaxPreviewLayerType} type - Type de photo sélectionné pour le filtrage.
     * @returns {Object|null} Objet de style Mapbox de la couche de photos, ou `null` si non trouvé.
     * @private
     */
    getMapboxLayerByType (type) {
        if (!type) {
            return null;
        }
        if (!this.PANORAMAX_LAYERS_TYPES.includes(type)) {
            return null;
        }
        if (!this.layerPanoramax) {
            return null;
        }
        var field = this.layerPanoramax.get("mapbox-layers").find(l => l.includes(type));
        if (!field) {
            return null;
        }
        var originalMapboxLayer = this.layerPanoramax.get("mapbox-style").layers.find(l => l.id === field);
        if (!originalMapboxLayer) {
            return null;
        }
        return originalMapboxLayer;
    }

    /**
     * Filtre des couches mapbox selon le type de photo sélectionné.
     * @param {String|null} value - Type de photo à filtrer : 
     * "flat", "equirectangular", ou `null` pour réinitialiser le filtre.
     * @returns {Array<Object>} Tableau d'objets de style Mapbox.
     * @private
     */
    filterCameraToMapboxLayer (value) {
        var mapboxLayers = [];
        for (let index = 0; index < this.PANORAMAX_LAYERS_TYPES.length; index++) {
            const type = this.PANORAMAX_LAYERS_TYPES[index];
            var mapboxLayer = this.getMapboxLayerByType(type);
            if (!mapboxLayer) {
                continue;
            }
            if (type === "pictures") {
                if (value === "flat" || value === "equirectangular") {
                    mapboxLayer.filter = ["all", ["==", ["get", "type"], value]];
                } else {
                    delete mapboxLayer.filter;
                }
            } else if (type === "sequences") {
                if (value === "flat" || value === "equirectangular") {
                    mapboxLayer.filter = ["all", ["==", ["get", "type"], value]];
                } else {
                    delete mapboxLayer.filter;
                }
            } else if (type === "grid") {
                // TODO
                // comment filtrer la couche de grille en fonction du type de photo sélectionné ?
                // ex. afficher uniquement les cellules contenant des photos 360° ?
            }
            mapboxLayers.push(mapboxLayer);
        }
        return mapboxLayers;
    }

    /**
     * Filtre des couches mapbox selon la plage de dates sélectionnée.
     * @param {Date|null} minDate - Date minimale à filtrer.
     * @param {Date|null} maxDate - Date maximale à filtrer.
     * @returns {Array<Object>} Tableau d'objets de style Mapbox.
     * @private
     */
    filterDateToMapboxLayer (minDate, maxDate) {
        var mapboxLayers = [];
        for (let index = 0; index < this.PANORAMAX_LAYERS_TYPES.length; index++) {
            const type = this.PANORAMAX_LAYERS_TYPES[index];
            var mapboxLayer = this.getMapboxLayerByType(type);
            if (!mapboxLayer) {
                continue;
            }
            if (type === "pictures") {
                var picturesFilter = [];
                if (minDate && minDate instanceof Date) {
                    picturesFilter.push([">=", ["get", "ts"], minDate.toISOString().split("T")[0]]);
                }
                if (maxDate && maxDate instanceof Date) {
                    picturesFilter.push(["<=", ["get", "ts"], maxDate.toISOString().split("T")[0]]);
                }
                if (picturesFilter && picturesFilter.length > 0) {
                    if (picturesFilter.length === 2) {
                        picturesFilter.unshift("all");
                    }
                    mapboxLayer.filter = picturesFilter;
                    // colorer les séquences contenant des photos prises 
                    // dans la plage de dates sélectionnée (ex. en bleu)
                    // mapboxLayer.paint["circle-color"] = "#0000FF"; 
                } else {
                    delete mapboxLayer.filter;
                }
            } else if (type === "sequences") {
                var sequencesFilter = [];
                if (minDate && minDate instanceof Date) {
                    sequencesFilter.push([">=", ["get", "date"], minDate.toISOString().split("T")[0]]);
                }
                if (maxDate && maxDate instanceof Date) {
                    sequencesFilter.push(["<=", ["get", "date"], maxDate.toISOString().split("T")[0]]);
                }
                if (sequencesFilter && sequencesFilter.length > 0) {
                    if (sequencesFilter.length === 2) {
                        sequencesFilter.unshift("all");
                    }
                    mapboxLayer.filter = sequencesFilter;
                    // colorer les séquences contenant des photos prises 
                    // dans la plage de dates sélectionnée (ex. en bleu)
                    // mapboxLayer.paint["line-color"] = "#0000FF"; 
                } else {
                    delete mapboxLayer.filter;
                }
            } else if (type === "grid") {
                // TODO
                // comment filtrer la couche de grille en fonction de la plage de dates sélectionnée ?
                // ex. afficher uniquement les cellules contenant des photos prises dans la plage de dates sélectionnée ?
            }
            mapboxLayers.push(mapboxLayer);
        }
        return mapboxLayers;
    }

    /**
     * Filtre des couches mapbox selon une période sélectionnée 
     * ex : "last_year = 12", "last_month = 1", etc.
     * @param {Number|null} value - Valeur de la période sélectionnée à filtrer en nombre de mois.
     * @returns {Array<Object>} Tableau d'objets de style Mapbox.
     * @private
     */
    filterPeriodeToMapboxLayer (value) {
        var startDate = null;
        var endDate = null;
        if (typeof value === "number" && !isNaN(value) && value > 0) {
            var now = new Date();
            startDate = subMonths(new Date(), value);
            endDate = now;
        }
        
        return this.filterDateToMapboxLayer(startDate, endDate);
    }

    /**
     * Applique les filtres sélectionnés à la couche Panoramax.
     * @param {String} value - nom du rendu sélectionné.
     * @return {Array<Object>} Tableau d'objets de style Mapbox filtrés selon le rendu sélectionné.
     * @private
     * @todo implémenter les autres types de filtres !
     */
    filterRenderToMapboxLayer (value) {
        var mapboxLayers = [];
        return mapboxLayers;
    }

    /**
     * Applique les filtres sélectionnés à la couche Panoramax.
     * @param {Array<Object>} mapboxLayers - format Mapbox Style.
     * @returns {Promise} Promise résolue lorsque les filtres sont appliqués.
     * @fixme les filtres ne sont cumulatifs : 
     *   ex. si on applique un filtre de type de photo, 
     *   puis un filtre de date, le second filtre écrase le premier, 
     *   au lieu de les cumuler (ex. filtrer par type de photo ET par date)
     * @private
     */
    async applyFilters (mapboxLayers) {
        logger.debug("applyFilters", mapboxLayers);

        if (!this.layerPanoramax) {
            logger.warn("Panoramax layer not available");
            return Promise.reject(new Error("Panoramax layer not available"));
        }

        if (!Array.isArray(mapboxLayers)) {
            logger.warn("No Mapbox layers provided");
            return Promise.reject(new Error("No Mapbox layers provided"));
        }

        var map = this.getMap();
        if (!map) {
            logger.warn("Map not available");
            return Promise.reject(new Error("Map not available"));
        }

        var style = this.layerPanoramax.get("mapbox-style");
        if (!style || !Array.isArray(style.layers)) {
            logger.warn("Panoramax layer style not available");
            return Promise.reject(new Error("Panoramax layer style not available"));
        }

        // HACK pour forcer la mise à jour du cache interne de ol-mapbox-style
        if (style.id) {
            delete style.id;
        }

        // on remplace les couches du style de la couche Panoramax 
        // par les couches filtrées
        style.layers = mapboxLayers;
        
        try {
            // mise à jour d'une couche MapBoxLayer
            await applyStyle(this.layerPanoramax, style, { /* styleUrl : this.layerPanoramax.styleUrl, */ updateSource : false });
            this.layerPanoramax.changed();
            map.renderSync();
            return mapboxLayers;
        } catch (err) {
            logger.error("Error applying filters to Panoramax layer", err);
            throw err;
        }
    }

    // ################################################################### //
    // ################## methods position UI filters #################### //
    // ################################################################### //

    updateFiltersPanelPosition () {
        if (!this.panelPanoramaxFilters || !this.panelPanoramaxButtonsContainer) {
            return;
        }
        var dialogRect = this.panelPanoramaxButtonsContainer.getBoundingClientRect();
        this.panelPanoramaxFilters.style.left = dialogRect.left + "px";
        this.panelPanoramaxFilters.style.top = dialogRect.bottom + 6 + "px";
    }

    bindFiltersPanelPositioning () {
        if (this._onPanoramaxFiltersReposition) {
            return;
        }
        this._onPanoramaxFiltersReposition = this.updateFiltersPanelPosition.bind(this);
        window.addEventListener("resize", this._onPanoramaxFiltersReposition);
        window.addEventListener("scroll", this._onPanoramaxFiltersReposition, true);
    }

    unbindFiltersPanelPositioning () {
        if (!this._onPanoramaxFiltersReposition) {
            return;
        }
        window.removeEventListener("resize", this._onPanoramaxFiltersReposition);
        window.removeEventListener("scroll", this._onPanoramaxFiltersReposition, true);
        this._onPanoramaxFiltersReposition = null;
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
        this.buttonPanoramaxShow.click();
    }

    /**
     * Gère le clic de retour sur la carte avec
     * fermeture du panneau Panoramax.
     *
     * @param {Event} e - Événement DOM du bouton de retour.
     * @private
     */
    onReturnPanoramaxClick (e) {
        logger.debug(e);
        this.hidePhotoViewer();
        this.showButtonsPanel();
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
        if (!this.panelPanoramaxFilters || !this.btnPanoramaxFilters) {
            return;
        }

        var panel = this.panelPanoramaxFilters;
        var button = this.btnPanoramaxFilters;
        var open = button.getAttribute("aria-pressed") === "true";

        if (!open) {
            panel.classList.replace("gpf-visible", "gpf-hidden");
            this.unbindFiltersPanelPositioning();
            return;
        }

        panel.classList.replace("gpf-hidden", "gpf-visible");
        this.updateFiltersPanelPosition();
        this.bindFiltersPanelPositioning();
    }

    /**
     * Gère le changement de type d'image dans les filtres Panoramax.
     *
     * @param {Event} e - Événement DOM du sélecteur de type.
     * @private
     */
    onChangePanoramaxFilterByType (e) {
        logger.debug("onChangePanoramaxFilterByType", e);
        if (!e || !e.target) {
            return;
        }

        var selectedType = (e.target.value || "").toLowerCase();
        var cameraType = null;

        if (selectedType === "classique") {
            cameraType = "flat";
        } else if (selectedType === "360°" || selectedType === "360") {
            cameraType = "equirectangular";
        }

        var mapboxLayers = this.filterCameraToMapboxLayer(cameraType);

        this.applyFilters(mapboxLayers)
            .then((mapboxLayers) => {
                this.dispatchEvent({
                    type : this.FILTER_TYPE_PANORAMAX_EVENT,
                    data : {
                        value : selectedType,
                        mapboxLayers : mapboxLayers
                    }
                });
            })
            .catch((err) => {
                logger.error("Error applying Panoramax type filter", err);
            });
    }

    /**
     * Gère le changement de période dans les filtres Panoramax.
     *
     * @param {Event} e - Événement DOM du sélecteur de période.
     * @private
     */
    onClickPanoramaxFilterByPeriode (e) {
        logger.debug("onClickPanoramaxFilterByPeriode", e);
        if (!e || !e.target) {
            return;
        }

        var selectedValue = parseInt(e.target.value, 10);
        if (e.target.ariaPressed === "false") {
            selectedValue = null;
        }
        var mapboxLayers = this.filterPeriodeToMapboxLayer(selectedValue);

        this.applyFilters(mapboxLayers)
            .then((mapboxLayers) => {
                this.dispatchEvent({
                    type : this.FILTER_PERIODE_PANORAMAX_EVENT,
                    data : {
                        value : selectedValue,
                        mapboxLayers : mapboxLayers
                    }
                });
            })
            .catch((err) => {
                logger.error("Error applying Panoramax predefined date filter", err);
            });
    }

    /**
     * Gère la saisie des dates (début/fin) dans les filtres Panoramax.
     * Déclenche un événement uniquement quand les deux dates sont renseignées.
     *
     * @param {Event} e - Événement DOM des champs date.
     * @private
     */
    onChangePanoramaxFilterByDates (e) {
        logger.debug("onChangePanoramaxFilterByDates", e);

        var startInput = document.getElementById(this._addUID("GPpanoramaxFilterDateStart"));
        var endInput = document.getElementById(this._addUID("GPpanoramaxFilterDateEnd"));
        if (!startInput || !endInput) {
            return;
        }

        var mapboxLayers = null;

        var startValue = startInput.value;
        var endValue = endInput.value;

        if (!startValue && !endValue) {
            mapboxLayers = this.filterDateToMapboxLayer(null, null);
        } else {
            var startDate = new Date(startValue);
            var endDate = new Date(endValue);
            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                return;
            }
            mapboxLayers = this.filterDateToMapboxLayer(startDate, endDate);
        }

        this.applyFilters(mapboxLayers)
            .then((mapboxLayers) => {
                this.dispatchEvent({
                    type : this.FILTER_DATES_PANORAMAX_EVENT,
                    data : {
                        startDate : startValue,
                        endDate : endValue,
                        mapboxLayers : mapboxLayers
                    }
                });
            })
            .catch((err) => {
                logger.error("Error applying Panoramax start/end date filter", err);
            });
    }

    /**
     * Gère le clic d'activation/désactivation de la couche de fond dans Panoramax.
     *
     * @param {Event} e - Événement DOM du bouton de couche de fond.
     * @private
     */
    onToggleChoiceBackgroundPanoramaxClick (e) {
        logger.debug(e);
        this.options.background.display = !this.options.background.display;
        if (this.options.background.display) {
            this.setBackground(this.options.background);
        } else {
            this.resetBackground();
        }
    }

    /**
     * Gère le changement de mode de rendu dans Panoramax.
     *
     * @param {Event} e - Événement DOM du sélecteur de mode de rendu.
     * @private
     */
    onSelectPanoramaxRenderClick (e) {
        logger.debug(e);
        if (!e || !e.target) {
            return;
        }

        var selectedValue = e.target.value;
        var mapboxLayers = this.filterRenderToMapboxLayer(selectedValue);

        this.applyFilters(mapboxLayers)
            .then((mapboxLayers) => {
                this.dispatchEvent({
                    type : this.FILTER_RENDER_PANORAMAX_EVENT,
                    data : {
                        value : selectedValue,
                        mapboxLayers : mapboxLayers
                    }
                });
            })
            .catch((err) => {
                logger.error("Error applying Panoramax render", err);
            });
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
