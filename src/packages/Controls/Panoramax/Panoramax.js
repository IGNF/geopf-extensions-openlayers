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
import GeoportalWMTS from "../../Layers/LayerWMTS";

// DOM
import PanoramaxDOM from "./PanoramaxDOM";
import "./PnxMiniMapWidget";

// lib ol
import Overlay from "ol/Overlay";
import LayerGroup from "ol/layer/Group";
import { 
    MapboxVectorLayer,
    applyStyle
} from "ol-mapbox-style";

import "./PictureLegendWidget";

// lib external
import { subMonths } from "date-fns";

var logger = Logger.getLogger("panoramax");

/**
 * @typedef {Object} PanoramaxOptions
 * @property {Boolean} [collapsed=true] - Définit si le widget est replié au chargement.
 * @property {Boolean} [draggable=false] - Permet de déplacer le panneau du catalogue.
 * @property {Boolean} [auto=true] - Active l’ajout automatique des événements sur la carte.
 * @property {Boolean} [hover=true] - Active l’interaction au survol (pointermove) sur la couche Panoramax.
 * @property {Boolean} [displayable=false] - Indique si les couches sont affichables dans le gestionnaire de couches.
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
 * @property {Boolean} [background.active] - Affiche ou masque la couche de fond.
 * @property {String} [background.url] - URL du style de la couche de fond à charger.
 * @property {String} [background.name] - Nom de la couche de fond à afficher dans le gestionnaire de couches.
 * @property {Number} [background.minZoom] - Zoom minimum pour afficher la couche de fond.
 * @property {Number} [background.maxZoom] - Zoom maximum pour afficher la couche de fond.
 * @property {Object} [buttonsWindow] - Options de configuration des boutons.
 * @property {Boolean} [buttonsWindow.display] - Affiche ou masque les boutons.
 * @property {String|HTMLElement|null} [buttonsWindow.target] - **Experimental** -Cible DOM où injecter le panneau des boutons.
 * @property {Object} [buttonsWindow.filters] - Options de configuration des filtres.
 * @property {Boolean} [buttonsWindow.filters.display] - Affiche ou masque les filtres.
 * @property {String} [buttonsWindow.filters.label] - Libellé du bouton de filtrage.
 * @property {String} [buttonsWindow.filters.description] - Description du bouton de filtrage.
 * @property {Boolean} [buttonsWindow.filters.exclusive] - Indique si les filtres sont exclusifs (un seul actif à la fois) ou inclusifs (plusieurs actifs).
 * @property {Object} [buttonsWindow.filters.content] - Options de configuration du contenu des filtres.
 * @property {Boolean|Object} [buttonsWindow.filters.content.types] - Affiche le filtre des types d’images et sélectionne le filtre actif par défaut ("Tout", "Classique", "360°").
 * @property {Boolean} [buttonsWindow.filters.content.dates] - Affiche le filtre des plages de dates.
 * @property {Boolean} [buttonsWindow.filters.content.periodes] - Affiche le filtre des périodes.
 * @property {Object} [buttonsWindow.hover] - Options de configuration du bouton de survol.
 * @property {Boolean} [buttonsWindow.hover.display] - Affiche ou masque le bouton de survol.
 * @property {String} [buttonsWindow.hover.label] - Libellé du bouton de survol.
 * @property {String} [buttonsWindow.hover.description] - Description du bouton de survol.
 * @property {Object} [buttonsWindow.layerswitcher] - Options de configuration du bouton de gestion des couches.
 * @property {Boolean} [buttonsWindow.layerswitcher.display] - Affiche ou masque le bouton de gestion des couches.
 * @property {String} [buttonsWindow.layerswitcher.label] - Libellé du bouton de gestion des couches.
 * @property {String} [buttonsWindow.layerswitcher.description] - Description du bouton de gestion des couches.
 * @property {Object} [buttonsWindow.contributions] - Options de configuration des contributions.
 * @property {Boolean} [buttonsWindow.contributions.display] - Affiche ou masque les contributions.
 * @property {String} [buttonsWindow.contributions.label] - Libellé du bouton de contribution.
 * @property {String} [buttonsWindow.contributions.link] - Lien vers la page de contribution.
 * @property {Object} [buttonsWindow.styles] - Options de configuration du bouton de styles.
 * @property {Boolean} [buttonsWindow.styles.display] - Affiche ou masque le bouton de styles.
 * @property {String} [buttonsWindow.styles.label] - Libellé du bouton de styles.
 * @property {String} [buttonsWindow.styles.description] - Description du bouton de styles.
 * @property {Object} [buttonsWindow.styles.content] - Options de configuration du contenu des styles.
 * @property {Object} [buttonsWindow.background] - Options de configuration du bouton de fond.
 * @property {Boolean} [buttonsWindow.background.display] - Affiche ou masque le bouton de fond de carte.
 * @property {String} [buttonsWindow.background.label] - Libellé du bouton de fond de carte.
 * @property {String} [buttonsWindow.background.description] - Description du bouton de fond de carte.
 * @property {Object} [visualizationWindow] - Options de configuration de la fenêtre de visualisation.
 * @property {Boolean} [visualizationWindow.display] - Affiche ou masque la fenêtre de visualisation.
 * @property {String|HTMLElement|null} [visualizationWindow.target] - **Experimental** - Cible DOM où injecter le panneau de visualisation.
 * @property {String} [visualizationWindow.size] - Taille de la fenêtre de visualisation ("small", "medium", "large", "fullscreen", "fullscreen-map").
 * @property {Object} [viewer] - Options de configuration du visualiseur d'images panoramiques.
 * @property {String} [viewer.endpoint] - URL de l'endpoint du visualiseur d'images panoramiques.
 * @property {String} [viewer.class] - Classe CSS personnalisée à appliquer au conteneur du visualiseur.
 * @property {Boolean} [viewer.widgets] - Affiche ou masque les widgets du visualiseur.
 * @property {Object} [viewer.psvOptions] - **Experimental** Options de configuration du visualiseur d'images panoramiques (ex. pour PhotoSphereViewer).
 * @property {Object} [interactions] - Options de configuration des interactions sur les différentes couches Panoramax. 
 * @property {Object} [interactions.grid] - Options d'interaction pour la couche de grille.
 * @property {Boolean} [interactions.grid.active] - Active ou désactive les interactions sur la couche de grille.
 * @property {Array<String>} [interactions.grid.actions] - Actions disponibles sur la couche de grille ("preview", "zoom").
 * @property {Object} [interactions.sequences] - Options d'interaction pour la couche de séquences.
 * @property {Boolean} [interactions.sequences.active] - Active ou désactive les interactions sur la couche de séquences.
 * @property {Array<String>} [interactions.sequences.actions] - Actions disponibles sur la couche de séquences ("preview", "zoom").
 * @property {Object} [interactions.pictures] - Options d'interaction pour la couche d'images individuelles.
 * @property {Boolean} [interactions.pictures.active] - Active ou désactive les interactions sur la couche d'images individuelles.
 * @property {Array<String>} [interactions.pictures.actions] - Actions disponibles sur la couche d'images individuelles ("preview", "zoom").
 */

/**
 * @typedef {Object} PanoramaxPreviewFeature
 * @property {Array<Number>} coordinates - Coordonnées de l'entité en projection carte.
 * @property {PanoramaxPreviewGridLayer|PanoramaxPreviewSequencesLayer|PanoramaxPreviewPicturesLayer} properties - Propriétés de l'entité survolée.
 * @property {String} properties.layer - Type de couche ("grid", "sequences" ou "pictures").
 * @example
 * Structure des entités de prévisualisation retournées par la couche Panoramax au survol.
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
 * @typedef {Object} PanoramaxPreviewGridLayer - Couche de grille (agrégats de points).
 * @property {String} id - Identifiant de la grille.
 * @property {Number} nb_pictures - Nombre total d'images dans la grille.
 * @property {Number} nb_360_pictures - Nombre d'images 360 dans la grille.
 * @property {Number} nb_flat_pictures - Nombre d'images classiques dans la grille.
 * @property {Number} coef - Coefficient de densité d'images dans la grille.
 * @property {Number} coef_360_pictures - Coefficient de densité d'images 360 dans la grille.
 * @property {Number} coef_flat_pictures - Coefficient de densité d'images classiques dans la grille.
 * 
 * @typedef {Object} PanoramaxPreviewSequencesLayer - Couche de séquences (groupes d'images).
 * @property {String} id - Identifiant de la séquence.
 * @property {String} account_id - Identifiant du compte utilisateur ayant contribué la séquence.
 * @property {String} model - Modèle de la séquence (ex. "equirectangular" ou "flat").
 * @property {String} type - Type de la séquence (ex. "360" ou "classic").
 * @property {String} date - Date de contribution de la séquence.
 * @property {Number} gps_accuracy - Précision GPS de la séquence (en mètres).
 * @property {Number} h_pixel_density - Densité de pixels horizontale de la séquence (en pixels/mètre).
 * 
 * @typedef {Object} PanoramaxPreviewPicturesLayer - Couche d'images individuelles.
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
     * @fires pnx:ready
     * @fires pnx:fullscreen
     * @fires pnx:opened
     * @fires pnx:data:clicked
     * @fires pnx:data:hovered
     * @fires pnx:filter:dates
     * @fires pnx:filter:periode
     * @fires pnx:filter:type
     * @fires change:picture
     * @fires change:sequence
     * @fires change:display
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
     *   },
     *   background: {
     *    active: true,
     *    url: "https://data.geopf.fr/annexes/ressources/vectorTiles/styles/PLAN.IGN/gris.json",
     *    name: "Background",
     *    minZoom: 6,
     *    maxZoom: 21
     *   },
     *   buttonsWindow: {
     *     display: true,
     *     position: "top-right",
     *     order: ["filters", "contributions", "hover", "styles", "background"],
     *     filters: {
     *       display: true,
     *       label: "Filtrer",
     *       description: "Filtrer les images affichées",
     *       content: {
     *         dates: true,
     *         types: true,
     *         periodes: true
     *       }
     *     },
     *     hover: {
     *       display: true,
     *       label: "Aperçu au survol",
     *       description: "Afficher un aperçu de l'image au survol"
     *     },
     *     contributions: {
     *       display: true,
     *       label: "Contribuer",
     *       description: "Accéder au parcours de contribution",
     *       link: "https://panoramax.openstreetmap.fr/why-contribute"
     *     },
     *     styles: {
     *       display: false,
     *       label: "Style",
     *       description: "Personnaliser le style d'affichage des images",
     *       content: {}
     *     },
     *     background: {
     *       display: true,
     *       label: "Fond de carte",
     *       description: "Afficher ou masquer un fond de carte de référence"
     *     }
     *   },
     *   visualizationWindow: {
     *     display: true,
     *     position: "top-right",
     *     size: "medium"
     *   },
     *   viewer: {
     *     endpoint: "https://explore.panoramax.fr/",
     *     class: "",
     *     widgets: true,
     *     psvOptions: {}
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
     * @public
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
                this.buttonPanoramaxShow.click();
            }
            // ajout des evenements sur la carte
            if (this.auto) {
                this.addEventsListeners(map);
            }
        } else {
            // c'est une opération de nettoyage déclenchée lors de la fermeture 
            // et par l'appel à 'reset()'
            // nettoyer complètement le photoViewer en premier pour éviter les erreurs de lifecycle
            // lors d'un removeControl suivi d'un addControl
            this.cleanupPhotoViewer();
            this.setCollapsed(true);
        }

        // on appelle la méthode setMap originale d'OpenLayers
        super.setMap(map);

        // position
        if (map && this.options.position) {
            this.setPosition(this.options.position);
        }

        // reunion du bouton avec le précédent
        if (map && this.options.gutter === false) {
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
            displayable : false,
            gutter : false,
            position : "bottom-left",
            group : true, // option interne !
            layer : {
                url : "https://api.panoramax.xyz/api/map/style.json",
                source : "geovisio",
                name : "Panoramax"
            },
            background : {
                active : false,
                url : "https://data.geopf.fr/annexes/ressources/vectorTiles/styles/PLAN.IGN/gris.json",
                name : "Background"
            },
            buttonsWindow : {
                display : true,
                target : null, // experimental !
                position : "bottom-left", // TODO position ?
                order : ["filters", "contributions", "hover", "background", "layerswitcher", "styles"],
                filters : {
                    display : true,
                    label : "Effacer les filtres",
                    description : "Réinitialiser les filtres",
                    // INFO
                    // filtres exclusifs : si un est actif, les autres sont désactivés
                    // filtres inclusifs : peuvent être cumulés
                    exclusive : true,
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
                    description : "Partager vos photos sur Panoramax",
                    link : "https://panoramax.fr/comment-participer-a-panoramax"
                },
                styles : { // TODO styles de rendu ?
                    display : false,
                    label : "Rendu de la carte",
                    description : "Personnaliser le rendu de la carte",
                    content : ["Classique", "Type de camera", "Date de prise de vue"]
                },
                background : {
                    display : true,
                    label : "Fond de carte",
                    description : "Afficher ou masquer un fond de carte de référence"
                },
                layerswitcher : {
                    display : true,
                    label : "Couches Panoramax",
                    description : "Afficher ou masquer les différentes couches Panoramax",
                }
            },
            visualizationWindow : {
                display : true,
                target : null, // experimental !
                position : "bottom-left", // TODO position ?
                size : "medium"
            },
            viewer : {
                "endpoint" : "https://explore.panoramax.fr/api",
                "widgets" : [
                    "btnBack",
                    "btnClose",
                    "btnZoom",
                    "btnFullscreen",
                    "cmpPictureLegend",
                    "cmpMinimap",
                ],
                "pnxOptions" : { // TODO opts psv ?
                    "class" : "",
                    "widgets" : true,
                    "psvOptions" : {}
                    
                },
            },
            interactions : {
                grid : {
                    active : true,
                    actions : ["zoom"],
                },
                sequences : {
                    active : true,
                    actions : ["zoom"],
                },
                pictures : {
                    active : true,
                    actions : ["preview"],
                }
            }
        };

        // merge with user options
        Utils.assign(this.options.layer, options.layer);
        Utils.assign(this.options.background, options.background);
        Utils.assign(this.options.visualizationWindow, options.visualizationWindow);
        Utils.assign(this.options.interactions, options.interactions);
        Utils.assign(this.options.viewer, options.viewer);
        Utils.assign(this.options.buttonsWindow, options.buttonsWindow);
        [
            "collapsed", 
            "draggable", 
            "panel", 
            "auto", 
            "hover", 
            "gutter", 
            "position",
            "displayable"
        ].forEach((key) => {
            if (Object.prototype.hasOwnProperty.call(options, key)) {
                this.options[key] = options[key];
            }
        });

        logger.debug("options", this.options);

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

        /**
         * @type {Boolean}
         * Indique si les couches sont affichables dans le gestionnaire de couches.
         */
        this.displayable = this.options.displayable;

        /** @private */
        this.buttonPanoramaxShow = null;
        /** @private */ 
        this.panelPanoramaxViewerContainer = null;
        /** @private */
        this.panelPanoramaxButtonsContainer = null;

        /** @private */
        this.panelPanoramaxButtonsHeaderContainer = null; // usefull for the dragNdrop

        /** @private */
        this.btnPanoramaxOptions = null;
        /** @private */
        this.panelPanoramaxOptions = null;
        /** @private */
        this._onPanoramaxOptionsReposition = null;

        /** @private */
        this.panelPanoramaxFilters = null;
        /** @private */
        this.btnPanoramaxResetFilters = null;
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
        this.eventsListeners = {};

        this.isResetEventPropagation = false; // flag pour éviter la propagation des événements de reset des filtres

        /**
         * Types de couches Panoramax disponibles dans le TMS vecteur 
         * (https://api.panoramax.xyz/api/map/style.json).
         */
        this.PANORAMAX_LAYERS_TYPES = ["grid", "sequences", "pictures"];

        /**
         * Événement déclenché à l'initialisation de Panoramax.
         * @event pnx:ready
         * @defaultValue "pnx:ready"
         * @group Events
         * @description
         * Cet événement est émis quand le PhotoViewer Panoramax est prêt.
         * Il indique que le viewer de photos est initialisé et peut être utilisé.
         * Il peut être utilisé pour déclencher des actions complémentaires.
         */
        this.READY_PANORAMAX_EVENT = "pnx:ready";

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
         * Événement déclenché à la fermeture de Panoramax.
         * @event pnx:closed
         * @defaultValue "pnx:closed"
         * @group Events
         * @description
         * Cet événement est émis quand  Panoramax est fermé.
         * Il indique que le processus Panoramax est terminé.
         * Il peut être utilisé pour déclencher des actions complémentaires.
         */
        this.CLOSED_PANORAMAX_EVENT = "pnx:closed";

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
         * Nom du callback déclenché lors de la suppression de la couche Panoramax active.
         * @event pnx:layer:removed
         * @defaultValue "pnx:layer:removed"
         * @group Callbacks
         * @description
         * Ce callback est utilisé pour indiquer que la couche Panoramax a été supprimée de la carte.
         * Il peut être utilisé pour déclencher des actions complémentaires de nettoyage.
         */
        this.LAYER_PANORAMAX_REMOVE_CB = "pnx:layer:removed";

        /**
         * Événement déclenché à l'initialisation du panneau des filtres.
         * @event pnx:filter:init
         * @defaultValue "pnx:filter:init"
         * @group Events
         */
        this.FILTER_INIT_PANORAMAX_EVENT = "pnx:filter:init";
        
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

        /**
         * Nom de l'événement déclenché quand on change le mode fullscreen.
         * @event pnx:fullscreen
         * @defaultValue "pnx:fullscreen"
         * @group Events
         */
        this.FULLSCREEN_PANORAMAX_EVENT = "pnx:fullscreen";

        /**
         * Nom de l'événement déclenché quand on change la property 'picture'.
         * @event change:picture
         * @defaultValue "change:picture"
         * @group Events
         * @description
         * Cet événement est émis quand la propriété 'picture' change.
         * Il peut être utilisé pour déclencher des actions complémentaires.
         * @example
         * panoramax.set("picture", "1234567890");
         */
        this.CHANGE_PICTURE_PANORAMAX_EVENT = "change:picture";

        /**
         * Nom de l'événement déclenché quand on change de séquence dans le viewer.
         * @event change:sequence
         * @defaultValue "change:sequence"
         * @group Events
         * @description
         * Cet événement est émis quand la propriété 'sequence' change.
         * Il peut être utilisé pour déclencher des actions complémentaires.
         * @example
         * panoramax.set("sequence", "1234567890");
         */
        this.CHANGE_SEQUENCE_PANORAMAX_EVENT = "change:sequence";

        /**
         * Nom de l'événement déclenché quand on change la propriété 'display'.
         * @event change:display
         * @defaultValue "change:display"
         * @group Events
         * @description
         * Cet événement est émis quand la propriété 'display' change.
         * Il peut être utilisé pour déclencher des actions complémentaires.
         * @example
         * panoramax.set("display", true);
         */
        this.DISPLAY_PHOTO_PANORAMAX_EVENT = "change:display";

        /** 
         * photo viewer 
         * @private
         */
        this.photoViewerPanoramax = null;

        /** 
         * @type {MapboxVectorLayer} 
         * @private
         */
        this.layerPanoramax = null;
        /** 
         * @type {MapboxVectorLayer} 
         * @private
         */
        this.backgroundPanoramax = null;
        /** 
         * @type {MapboxLayerGroup} 
         * @private
         */
        this.groupPanoramax = null;

        /** 
         * original style layer 
         * @type {JSON} 
         * @private
         */
        this.originalStyleLayerPanoramax = null;

        /** 
         * preview marker overlay 
         * @private 
         */
        this.previewMarkerOverlay = null;
        /** 
         * preview popup overlay 
         * @private
         */
        this.previewPopupOverlay = null;
        /** 
         * preview popup element 
         * @private
         */
        this.previewPopupElement = null;

        /**
         * feature sélectionnée lors du survol (utilisée au click)
         * @private
         */
        this.selectedFeature = null;

        /** 
         * map viewport sync listener 
         * @private 
         */
        this.mapViewportSyncListener = null;

        /**
         * widget minimap du photoviewer
         * @private
         */
        this.photoViewerMiniMap = null;

        /**
         * listener de synchro photo -> minimap
         * @private
         */
        this.photoViewerPictureLoadedListener = null;
        this.photoViewerPictureRotatedListener = null;

        /**
         * instance PSV liée au listener de synchro photo -> minimap
         * @private
         */
        this.photoViewerPictureLoadedTarget = null;
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

        // picto show
        var picto = this.buttonPanoramaxShow = this._createShowWidgetPictoElement();
        container.appendChild(picto);

        // container pour le panneau du dialogue du viewer
        var widgetPanelViewer = this.panelPanoramaxViewerContainer = this._createWidgetPanelViewerElement(this.options.panel);
        this.preventPointerMoveOnMap(this.panelPanoramaxViewerContainer);
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

        // container pour le panneau du dialogue des boutons
        var widgetPanelButtons = this.panelPanoramaxButtonsContainer = this._createWidgetPanelButtonsElement();
        var widgetPanelButtonsDiv = this._createWidgetPanelButtonsDivElement();
        widgetPanelButtons.appendChild(widgetPanelButtonsDiv);
        this.preventPointerMoveOnMap(widgetPanelButtons);

        // menu des boutons (ex. Options)
        // INFO : possibilité d'injecter d'autres boutons
        var buttons = this._createWidgetButtonsElement();
        widgetPanelButtonsDiv.appendChild(buttons);

        // bouton du menu des Options
        this.btnPanoramaxOptions = this._createButtonOptionsElement();
        buttons.appendChild(this.btnPanoramaxOptions);

        // panneau pour toutes les filtres et autres boutons optionnels du menu Options
        this.panelPanoramaxOptions = this._createWidgetPanelOptionsElement();
        buttons.appendChild(this.panelPanoramaxOptions);
        this.preventPointerMoveOnMap(this.panelPanoramaxOptions);

        // ajout d'un header
        var widgetPanelButtonsHeader = this.panelPanoramaxButtonsHeaderContainer = this._createWidgetPanelButtonsHeaderElement(this.options.panel);
        // avec icone
        var widgetPanelButtonsIcon = this._createWidgetPanelButtonsIconElement();
        widgetPanelButtonsHeader.appendChild(widgetPanelButtonsIcon);
        // avec title
        var widgetPanelButtonsTitle = this._createWidgetPanelButtonsTitleElement();
        widgetPanelButtonsHeader.appendChild(widgetPanelButtonsTitle);
        // avec close picto
        var widgetPanelButtonsClose = this._createWidgetPanelButtonsCloseElement();
        widgetPanelButtonsHeader.appendChild(widgetPanelButtonsClose);
        
        this.panelPanoramaxOptions.appendChild(widgetPanelButtonsHeader);

        // panneau des filtres et divers boutons optionnels du menu Options
        if (this.options.buttonsWindow.display) {
            for (const buttonKey of this.options.buttonsWindow.order) {
                switch (buttonKey) {
                    case "filters":
                        if (this.options.buttonsWindow.filters.display) {
                            // panneau des filtres avec les différents types de filtres (dates, types, periodes)
                            // à activer selon les options fournies
                            this.panelPanoramaxFilters = this._createWidgetPanelFiltersElement(this.options.buttonsWindow.filters);
                            // bouton de reset des filtres
                            this.btnPanoramaxResetFilters = this._createButtonResetFiltersElement(this.options.buttonsWindow.filters);
                            this.panelPanoramaxFilters.lastChild.appendChild(this.btnPanoramaxResetFilters);
                            // par defaut, on ajoute le bouton des contributions avec les filtres
                            // sauf si les filtres sont absents.
                            if (this.options.buttonsWindow.contributions.display) {
                                this.btnPanoramaxContributions = this._createButtonContributionsElement(this.options.buttonsWindow.contributions);
                                this.panelPanoramaxFilters.lastChild.appendChild(this.btnPanoramaxContributions);
                            }
                            this.panelPanoramaxOptions.appendChild(this.panelPanoramaxFilters);
                        }
                        break;
                    case "contributions":
                        // si les filtres sont absents, on ajoute le bouton Contributions dans le panneau
                        if (this.options.buttonsWindow.contributions.display && !this.options.buttonsWindow.filters.display) {
                            this.btnPanoramaxContributions = this._createButtonContributionsElement(this.options.buttonsWindow.contributions);
                            this.panelPanoramaxOptions.appendChild(this.btnPanoramaxContributions);
                        }
                        break;
                    case "hover":
                        if (this.options.buttonsWindow.hover.display) {
                            this.btnPanoramaxHover = this._createButtonChoiceHoverElement(this.options.hover, this.options.buttonsWindow.hover);
                            this.panelPanoramaxOptions.appendChild(this.btnPanoramaxHover);
                        }
                        break;
                    case "layerswitcher":
                        if (this.options.buttonsWindow.layerswitcher.display) {
                            this.btnPanoramaxLayerswitcher = this._createButtonChoiceDisplayLayerElement(
                                this.displayable, 
                                this.options.buttonsWindow.layerswitcher
                            );
                            this.panelPanoramaxOptions.appendChild(this.btnPanoramaxLayerswitcher);
                        }
                        break;
                    case "styles":
                        if (this.options.buttonsWindow.styles.display) {
                            this.btnPanoramaxStyles = this._createButtonChoiceStyleElement(this.options.buttonsWindow.styles);
                            this.panelPanoramaxOptions.appendChild(this.btnPanoramaxStyles);
                        }
                        break;
                    case "background":
                        if (this.options.buttonsWindow.background.display) {
                            this.btnPanoramaxBackground = this._createButtonChoiceBackgroundElement(this.options.background.active, this.options.buttonsWindow.background);
                            this.panelPanoramaxOptions.appendChild(this.btnPanoramaxBackground);
                        }
                        break;
                    default:
                        break;
                }
            }
        }

        // experimental : possibilité d'injecter le panneau des boutons dans une cible spécifique
        var panelButtonsTarget = this.resolveTargetElement(this.options.buttonsWindow.target);
        if (panelButtonsTarget) {
            panelButtonsTarget.appendChild(widgetPanelButtons);
        } else {
            container.appendChild(widgetPanelButtons);
        }

        if (this.panelPanoramaxOptions) {
            var panelOptionsTarget = this.panelPanoramaxButtonsContainer.parentElement || container;
            panelOptionsTarget.appendChild(this.panelPanoramaxOptions);
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

    onPointerMoveDebounced (handler) {
        const debounce = (func, delay) => {
            let timerId = null;
            let isDestroyed = false;
    
            const debounced = function (...args) {
                if (isDestroyed) {
                    return;
                }
                clearTimeout(timerId);
                timerId = setTimeout(() => {
                    if (!isDestroyed) {
                        func.apply(this, args);
                        timerId = null;
                    }
                }, delay);
            };

            // Permet d'annuler les timeouts en attente
            debounced.cancel = () => {
                if (timerId !== null) {
                    clearTimeout(timerId);
                    timerId = null;
                }
            };

            // Marquer comme détruit pour éviter les appels après suppression
            debounced.destroy = () => {
                debounced.cancel();
                isDestroyed = true;
            };

            return debounced;
        };

        return debounce(handler, 10);
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
            if (!self.selectedFeature) {
                return;
            }
            let feature = self._transformToPanoramaxFeature(self.selectedFeature);
            var sequenceId = feature.properties.first_sequence || null;
            var pictureId = feature.properties.id || null;
            var type = feature.properties.layer || feature.properties["mvt:layer"] || null;
            if (type !== "pictures") {
                if (type === "grid") {
                    // zoom on the clicked coordinates with a zoom level 
                    // depending on the density of images in the grid
                    if (self.options.interactions.grid.active && 
                        self.options.interactions.grid.actions.includes("zoom")) {
                        var zoom = e.map.getView().getZoom();
                        var newZoom = zoom + 4; // FIXME zoom facteur aleatoire !?
                        e.map.getView().animate({
                            center : feature.pointerCoordinate || feature.coordinates,
                            zoom : newZoom,
                            duration : 500
                        });
                    }
                }
                if (type === "sequences") {
                    // zoom on the clicked coordinates with a zoom level 
                    // depending on the density of images in the sequence
                    if (self.options.interactions.sequences.active && 
                        self.options.interactions.sequences.actions.includes("zoom")) {
                        var zoom = e.map.getView().getZoom();
                        var newZoom = 17; // FIXME zoom niveau fixe !?
                        // si le zoom actuel est inférieur au zoom cible, on zoome,
                        // sinon on recentre uniquement pour éviter les animations de zoom intempestives
                        if (zoom < newZoom) {
                            e.map.getView().animate({
                                center : feature.pointerCoordinate || feature.coordinates,
                                zoom : newZoom,
                                duration : 500
                            });
                        } else {
                            e.map.getView().animate({
                                center : feature.pointerCoordinate || feature.coordinates,
                                duration : 500
                            });
                        }
                    }
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
        const hoverHandler = function (e) {
            if (!self.hover) {
                return;
            }
            if (!self.eventActived || e.dragging) {
                return;
            }

            var options = {
                layerFilter : (l) => l === self.layerPanoramax,
                hitTolerance : 0
            };

            const features = [];
            e.map.forEachFeatureAtPixel(e.pixel, (feature) => {
                features.push(feature);
            }, options);

            var mapTarget = e.map.getTargetElement();
            if (mapTarget) {
                mapTarget.style.cursor = features.length > 0 ? "pointer" : "";
            }
            if (features.length === 0) {
                self.resetPreview();
                return;
            }
            // Selon le zoom defini (17 ou 18 pour un picture), 
            // on recherche un feature de type picture pour l'affichage de l'aperçu, 
            // sinon on prend le premier feature (ex. grid ou sequence)
            let feature = features[0];
            if (e.map.getView().getZoom() >= 17) {
                const pictureFeature = features.find(f => (f.get("mvt:layer") || f.get("layer")) === "pictures");
                if (pictureFeature) {
                    feature = pictureFeature;
                }
            }
            feature.pointerCoordinate = e.coordinate;
            self.displayPreview(feature);
        };
        this.eventsListeners[this.HOVERED_DATA_PANORAMAX_CB] = this.onPointerMoveDebounced(hoverHandler);
        map.on("pointermove", this.eventsListeners[this.HOVERED_DATA_PANORAMAX_CB]);

        // on met en place un ecouteur sur la suppression de la couche Panoramax
        // ce qui permet de réinitialiser le panneau Panoramax si la couche 
        // est supprimée par un autre contrôle de gestion des couches
        this.eventsListeners[this.LAYER_PANORAMAX_REMOVE_CB] = (e) => {
            var layer = e.element;
            if (layer === self.groupPanoramax || layer === self.layerPanoramax) {
                self.setCollapsed(true);
            }
        };
        map.getLayers().on("remove", this.eventsListeners[this.LAYER_PANORAMAX_REMOVE_CB]);

        // on met en place des ecouteurs internes sur le changement de la propriété 'picture', 'sequence' et 'display' 
        // pour afficher le viewer de photos de manière programmatique
        this.eventsListeners[this.CHANGE_PICTURE_PANORAMAX_EVENT] = (e) => {
            // some stuff...
        };
        this.on("change:picture", this.eventsListeners[this.CHANGE_PICTURE_PANORAMAX_EVENT]);

        this.eventsListeners[this.CHANGE_SEQUENCE_PANORAMAX_EVENT] = (e) => {
            // some stuff...
        };
        this.on("change:sequence", this.eventsListeners[this.CHANGE_SEQUENCE_PANORAMAX_EVENT]);

        this.eventsListeners[this.DISPLAY_PHOTO_PANORAMAX_EVENT] = async (e) => {
            var status = self.get("display"); // true|false
            logger.debug("display photo panoramax", status);
            const sequenceId = self.get("sequence");
            const pictureId = self.get("picture");
            if ( status && pictureId && sequenceId) {
                if (!self.photoViewerPanoramax) {
                    // on attend que le viewer de photos soit initialisé avant de l'afficher
                    self.once(self.READY_PANORAMAX_EVENT, () => {
                        self.displayPhotoViewer(self.get("sequence"), self.get("picture"));
                    });
                } else {
                    self.displayPhotoViewer(sequenceId, pictureId);
                }
            } else {
                self.hidePhotoViewer();
            }
        };
        this.on("change:display", this.eventsListeners[this.DISPLAY_PHOTO_PANORAMAX_EVENT]);
    }

    /**
     * Supprime les écouteurs d'événements de la carte (appelé par `setMap`).
     * @param {Map} map - Instance de carte.
     * @private
     */
    removeEventsListeners (map) {
        if (!map) {
            return;
        }
        this.resetPreview();

        if (this.eventsListeners[this.CLICKED_DATA_PANORAMAX_CB]) {
            map.un("click", this.eventsListeners[this.CLICKED_DATA_PANORAMAX_CB]);
            delete this.eventsListeners[this.CLICKED_DATA_PANORAMAX_CB];
        }
        if (this.eventsListeners[this.HOVERED_DATA_PANORAMAX_CB]) {
            // Annuler les timeouts en attente du debounce
            if (this.eventsListeners[this.HOVERED_DATA_PANORAMAX_CB].destroy) {
                this.eventsListeners[this.HOVERED_DATA_PANORAMAX_CB].destroy();
            }
            map.un("pointermove", this.eventsListeners[this.HOVERED_DATA_PANORAMAX_CB]);
            delete this.eventsListeners[this.HOVERED_DATA_PANORAMAX_CB];
        }

        var mapTarget = map.getTargetElement();
        if (mapTarget) {
            mapTarget.style.cursor = "";
        }
        if (this.eventsListeners[this.LAYER_PANORAMAX_REMOVE_CB]) {
            map.getLayers().un("remove", this.eventsListeners[this.LAYER_PANORAMAX_REMOVE_CB]);
            delete this.eventsListeners[this.LAYER_PANORAMAX_REMOVE_CB];
        }

        if (this.eventsListeners[this.CHANGE_PICTURE_PANORAMAX_EVENT]) {
            this.un("change:picture", this.eventsListeners[this.CHANGE_PICTURE_PANORAMAX_EVENT]);
            delete this.eventsListeners[this.CHANGE_PICTURE_PANORAMAX_EVENT];
        }
        if (this.eventsListeners[this.CHANGE_SEQUENCE_PANORAMAX_EVENT]) {
            this.un("change:sequence", this.eventsListeners[this.CHANGE_SEQUENCE_PANORAMAX_EVENT]);
            delete this.eventsListeners[this.CHANGE_SEQUENCE_PANORAMAX_EVENT];
        }
        if (this.eventsListeners[this.DISPLAY_PHOTO_PANORAMAX_EVENT]) {
            this.un("change:display", this.eventsListeners[this.DISPLAY_PHOTO_PANORAMAX_EVENT]);
            delete this.eventsListeners[this.DISPLAY_PHOTO_PANORAMAX_EVENT];
        }
    }

    preventPointerMoveOnMap (elem) {
        elem.addEventListener("pointermove", this.stopImmediatePropagation);
    }

    allowPointerMoveOnMap (elem) {
        elem.removeEventListener("pointermove", this.stopImmediatePropagation);
    }

    stopImmediatePropagation (e) {
        e.stopImmediatePropagation();
    }

    // ################################################################### //
    // ################# privates methods : reset ######################## //
    // ################################################################### //

    /**
     * Réinitialise le contenu du panneau à la fermeture.*
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
        // - reinit des filtres
        this.resetAllGroupFilters({ isReset : true });
        // - etc.
        this.eventActived = false;
        if (!this.auto) {
            var map = this.getMap();
            this.removeEventsListeners(map);
        }
    }

    /** @private */
    resetGroupLayer () {
        logger.debug("resetGroupLayer");
        var map = this.getMap();
        if (this.groupPanoramax) {
            map.removeLayer(this.groupPanoramax);
            this.groupPanoramax = null;
        }
    }
    /** @private */
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
    /** @private */
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
    /** @private */
    resetButtons () {
        this.unbindFiltersPanelPositioning();
        if (this.panelPanoramaxOptions) {
            this.panelPanoramaxOptions.classList.replace("gpf-visible", "gpf-hidden");
        }
        if (this.btnPanoramaxOptions) {
            this.btnPanoramaxOptions.setAttribute("aria-pressed", "false");
        }
        this.hideButtonsPanel();
    }
    /** @private */
    resetPhotoViewer () {
        if (this.photoViewerPanoramax) {
            if (this.photoViewerPanoramax.getAttribute("sequence")) {
                this.photoViewerPanoramax.setAttribute("sequence", "");
            }
            if (this.photoViewerPanoramax.getAttribute("picture")) {
                this.photoViewerPanoramax.setAttribute("picture", "");
            }
            if (typeof this.photoViewerPanoramax.select === "function") {
                this.photoViewerPanoramax.select();
            }  
            this.hidePhotoViewer();
        }
    }
    /** @private */
    cleanupPhotoViewer () {
        // Nettoie complètement le photoViewer du DOM pour éviter les erreurs de lifecycle
        // lors d'un removeControl/addControl. On retire du DOM SANS réinitialiser les
        // attributs (ce qui déclencherait attributeChangedCallback pendant le cleanup).
        if (this.photoViewerPanoramax) {
            if (this.photoViewerPanoramax.parentElement) {
                try {
                    this.photoViewerPanoramax.parentElement.removeChild(this.photoViewerPanoramax);
                } catch (err) {
                    logger.warn("Error removing photo viewer from DOM during cleanup", err);
                }
            }
            
            // Nullifier les références et listeners
            this.photoViewerPanoramax = null;
            this.photoViewerPictureLoadedListener = null;
            this.photoViewerPictureRotatedListener = null;
            this.photoViewerPictureLoadedTarget = null;
        }
    }
    /** @private */
    resetVisualizationWindow () {
        this.stopMapViewportSync();
    }
    /** @private */
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
        this.selectedFeature = null;
    }

    // ################################################################### //
    // ################# privates methods : init ######################### //
    // ################################################################### //

    /**
     * Charge les éléments du panneau à l'ouverture.
     */
    async load () {
        try {
            if (this.options.group) {
                this.setLayerGroup();
            }
            // - active les interactions sur la carte
            this.eventActived = true;
            if (!this.auto) {
                this.addEventsListeners(this.getMap());
            }
            // - charger la couche de fond
            await this.setBackground(this.options.background);
            // - charger la couche de données
            await this.setLayer(this.options.layer);
            // - charger les boutons
            await this.initButtons();
            // - charger les filtres
            await this.initFilters();
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
            if (!layer) {
                reject(new Error("Layer is not defined"));
                return;
            }

            var source = layer.getSource && layer.getSource();
            if (source && source.getState && source.getState() === "ready") {
                resolve(layer);
                return;
            }

            if (source && source.getState && source.getState() === "error") {
                reject(new Error("Error loading layer source"));
                return;
            }

            layer.once("sourceready", () => {
                resolve(layer);
            });

            layer.once("error", (evt) => {
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
        // clone pour éviter les problèmes de références dans le style JSON 
        this.originalStyleLayerPanoramax = styleJson ? JSON.parse(JSON.stringify(styleJson)) : null;

        return styleJson;
    }

    /** @private */
    setLayerGroup () {
        var map = this.getMap();
        if (!map) {
            return;
        }
        if (!this.groupPanoramax) {
            this.groupPanoramax = new LayerGroup();
            this.groupPanoramax.gpResultLayerId = "panoramax:group";
            // on masque le nom du groupe dans le gestionnaire de couche
            this.groupPanoramax.set("display", this.displayable);
            this.groupPanoramax.setProperties({
                "title" : "Panoramax",
                "description" : "Couche de données Panoramax"
            });
            map.addLayer(this.groupPanoramax);
        }
    }

    /** @private */
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
        var minZoom = opts.minZoom || 9;
        var maxZoom = opts.maxZoom || 21;

        var layer = new MapboxVectorLayer({ 
            styleUrl : opts.url,
            source : opts.source,
            declutter : true,
            minZoom : minZoom,
            maxZoom : maxZoom
        });

        // hack pour le gestionnaire de couche
        layer.styleUrl = opts.url;
        layer.gpResultLayerId = "panoramax:layer";
        
        if (this.options.group) {
            this.setLayerGroup();
        }

        if (this.groupPanoramax) {
            this.groupPanoramax.getLayers().push(layer);
        } else {
            map.addLayer(layer);
        }
        // zoomIn si en dehors de la plage de définition de la couche
        if (map.getView().getZoom() < minZoom) {
            map.getView().animate({ zoom : minZoom + 0.5 });
        }

        try {
            await this.waitForMapboxVectorLayerReady(layer);
            await this.getStyleJsonFromMapboxVectorLayer(layer);
            // mise à jour du nom de la couche du gestionnaire de couche
            layer.set("title", opts.name);
            layer.set("description", "Couche de données Panoramax");
            layer.set("display", this.displayable);
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

    /** @private */
    async setBackground (opts) {
        logger.debug("initBackground");
        // options de la couche de fond :
        // - url : https://data.geopf.fr/annexes/ressources/vectorTiles/styles/PLAN.IGN/gris.json
        // - name : "Background"
        // - etc.
        if (!opts.active) {
            return;
        }
        var map = this.getMap();
        if (!map) {
            return;
        }

        var minZoom = opts.minZoom || 9;
        var maxZoom = opts.maxZoom || 21;

        var layer = new MapboxVectorLayer({ 
            styleUrl : opts.url,
            declutter : true,
            minZoom : minZoom,
            maxZoom : maxZoom
        });
        
        layer.styleUrl = opts.url;
        layer.gpResultLayerId = "panoramax:background";

        if (this.groupPanoramax) {
            this.groupPanoramax.getLayers().insertAt(0, layer);
        } else {
            map.addLayer(layer);
        }

        try {
            await this.waitForMapboxVectorLayerReady(layer);
            this.backgroundPanoramax = layer;
            this.backgroundPanoramax.set("title", opts.name);
            this.backgroundPanoramax.set("display", this.displayable);
            if (this.layerPanoramax) {
                const baseZIndex = this.layerPanoramax.getZIndex() ?? 0;
                this.backgroundPanoramax.setZIndex(baseZIndex + 1);  
            }
            return layer;
        } catch (err) {
            logger.error("Error loading Panoramax background layer style", err);
            map.removeLayer(layer);
            this.backgroundPanoramax = null;
            throw err;
        }
    }

    /** @private */
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

    /** @private */
    async initFilters () {
        // activer des filtres par defaut
        return new Promise((resolve, reject) => {
            logger.debug("initFilters");
            // appliquer les filtres par défaut définis dans les options (ex. type d'image : 360)
            if (this.options.buttonsWindow && this.options.buttonsWindow.filters) {
                var filters = this.options.buttonsWindow.filters.content || {};
                if (filters.types && typeof filters.types === "object") {
                    if (filters.types.value) {
                        // appliquer le filtre par défaut pour les types d'images
                        // ex. value = "360" pour n'afficher que les images à 360°
                        this.applyGroupFilter("group-filter-types", { value : filters.types.value });
                    }
                }
                if (typeof filters.periodes === "object") {
                    // TODO appliquer le filtre par défaut pour les périodes
                }
                if (typeof filters.dates === "object") {
                    // TODO appliquer le filtre par défaut pour les dates
                }
                if (typeof filters.renders === "object") {
                    // TODO appliquer le filtre par défaut pour le rendu de la couche
                }
            }
            resolve();
        });
    }

    /** @private */
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

    /** @private */
    async initPhotoViewer () {
        // options.viewer.endpoint : "https://explore.panoramax.fr/api"
        // options.viewer.class : "..." (TODO)
        // options.viewer.widgets : true/false (TODO)
        // options.viewer.psvOptions : {} (TODO)
        var self = this;
        return new Promise((resolve, reject) => {
            logger.debug("initPhotoViewer");
            // INFO
            // par défaut, la fenêtre de visualisation est masquée,
            // elle s'affiche au clic sur une image
            if (!self.photoViewerPanoramax) {
                self.photoViewerPanoramax = self.createPhotoViewer();
                self.photoViewerPanoramax.onceReady()
                    .then(() => {
                        console.debug("Panoramax photo viewer is ready", self.photoViewerPanoramax);
                        self.bindMiniMapToPhotoViewer();
                    });
                self.photoViewerPanoramax.addEventListener("ready", () => {
                    console.debug("Panoramax photo viewer is ready", self);
                    // Suppression "Player"
                    self.removeWidgetPlayer();
                    // Suppression "Annotations switch"
                    self.removeWidgetAnnotationsSwitch();
                    // Suppression "Picture legend Drawer"
                    // INFO on supprime l'original de Panoramax pour le remplacer par notre propre widget
                    self.removeWidgetPictureLegendDrawer();
                    // Déclenchement d'un événement interne pour signaler que le viewer est prêt
                    self.dispatchEvent(self.READY_PANORAMAX_EVENT);
                });
                self.photoViewerPanoramax.addEventListener("broken", () => {
                    console.warn("Panoramax photo viewer is broken");
                });
            } else if (typeof self.photoViewerPanoramax.onceReady === "function") {
                // Après un removeControl/addControl, le viewer peut déjà exister,
                // mais la liaison mini-map <-> photo-viewer doit être réassurée.
                self.photoViewerPanoramax.onceReady().then(() => {
                    self.bindMiniMapToPhotoViewer();
                    self.dispatchEvent(self.READY_PANORAMAX_EVENT);
                });
            }
            resolve();
        });
    }

    // ################################################################### //
    // ######################## methods menu buttons ##################### //
    // ################################################################### //
    
    /** @private */
    showButtonsPanel () {
        this.panelPanoramaxButtonsContainer.firstChild.classList.replace("gpf-hidden", "gpf-visible");
    }

    /** @private */
    hideButtonsPanel () {
        this.panelPanoramaxButtonsContainer.firstChild.classList.replace("gpf-visible", "gpf-hidden");
    }

    // ################################################################### //
    // ######################## methods photoviewer ###################### //
    // ################################################################### //

    /**
     * Crée et configure le viewer de photos de Panoramax,
     * en ajoutant les widgets spécifiés dans les options.
     * @returns {HTMLElement|null} Élément du viewer de photos créé, ou `null` si le conteneur n'est pas disponible.
     */
    createPhotoViewer () {
        // cf. https://docs.panoramax.fr/web-viewer/reference/#componentsui
        if (!this.panelPanoramaxViewerContainer) {
            return null;
        }
        var photoViewer = this.panelPanoramaxViewerContainer.querySelector("pnx-photo-viewer");
        if (!photoViewer) {
            // Photo Viewer
            photoViewer = document.createElement("pnx-photo-viewer");
            photoViewer.id = "pnx-photo-viewer-" + this.uid;
            photoViewer.className = "pnx-photo-viewer-container";
            photoViewer.style = "width: 100%; height: 100%";
            // Define plugins list in PSV options
            photoViewer["psv-options"] = this.options.viewer.pnxOptions.psvOptions;
            photoViewer.setAttribute("endpoint", this.options.viewer.endpoint);
            photoViewer.setAttribute("url-parameters", "false");
            var widgets = this.options.viewer.widgets && Array.isArray(this.options.viewer.widgets) ? this.options.viewer.widgets : null;
            if (widgets) {
                // Button back
                // seulement si le composant PictureLegend est absent !
                if (widgets.includes("btnBack") && !widgets.includes("cmpPictureLegend")) {
                    this.addWidget(this.createWidgetBtnBack(), photoViewer);
                }
                // Button close
                if (widgets.includes("btnClose")) {
                    this.addWidget(this.createWidgetBtnClose(), photoViewer);
                }
                // Button Zoom
                if (widgets.includes("btnZoom")) {
                    this.addWidget(this.createWidgetBtnZoom(), photoViewer);
                }
                // Button Fullscreen
                if (widgets.includes("btnFullscreen")) {
                    this.addWidget(this.createWidgetBtnFullScreen(), photoViewer);
                }
                // Component Picture Legend
                if (widgets.includes("cmpPictureLegend")) {
                    this.addWidget(this.createWidgetCmpPictureLegend(), photoViewer);
                }
                // Component Minimap
                if (widgets.includes("cmpMinimap")) {
                    this.addWidget(this.createWidgetCmpMinimap(), photoViewer);
                }
            }
  
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
            }
        }
        return photoViewer;
    }

    /**
     * Affiche le viewer de photos de Panoramax avec l'image 
     * spécifiée par les identifiants de séquence et de photo.
     * @param {String} sequenceId - Identifiant de la séquence.
     * @param {String} pictureId - Identifiant de la photo.
     */
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
        this.resetPreview();
        this.showPhotoViewer();
        this.hideButtonsPanel();
        // nettoyage des propriétés pour éviter 
        // les conflits avec les événements internes
        this.set("picture", null, true);
        this.set("sequence", null,true);
        this.set("display", null,true);
    }

    /** @private */
    showPhotoViewer () {
        this.panelPanoramaxViewerContainer.classList.replace("gpf-hidden", "gpf-visible");
        this.panelPanoramaxViewerContainer.lastChild.classList.replace("gpf-hidden", "gpf-visible");
        
        if (!this.photoViewerPanoramax) {
            logger.warn("Panoramax photo viewer is not available");
            return;
        }
        this.photoViewerPanoramax.classList.replace("gpf-hidden", "gpf-visible");

        // init fullscreen icon
        let btn = this.photoViewerPanoramax.querySelector(".pnx-photo-viewer-fullscreen-button");
        btn.querySelectorAll("span")[0].removeAttribute("hidden");
        btn.querySelectorAll("span")[1].setAttribute("hidden", true);
    }

    /** @private */
    hidePhotoViewer () {
        this.panelPanoramaxViewerContainer.classList.replace("gpf-visible", "gpf-hidden");
        this.panelPanoramaxViewerContainer.lastChild.classList.replace("gpf-visible", "gpf-hidden");
        this.stopMapViewportSync();
        
        if (!this.photoViewerPanoramax) {
            logger.warn("Panoramax photo viewer is not available");
            return;
        }
        this.photoViewerPanoramax.classList.replace("gpf-visible", "gpf-hidden");
    }

    /** @private */
    bindMiniMapToPhotoViewer () {
        if (!this.photoViewerPanoramax || !this.photoViewerPanoramax.psv) {
            return;
        }

        var psv = this.photoViewerPanoramax.psv;

        if (this.photoViewerPictureLoadedTarget
            && this.photoViewerPictureLoadedTarget !== psv
            && this.photoViewerPictureLoadedListener
            && this.photoViewerPictureRotatedListener
        ) {
            this.photoViewerPictureLoadedTarget.removeEventListener("view-rotated", this.photoViewerPictureRotatedListener);   
            this.photoViewerPictureLoadedTarget.removeEventListener("picture-loaded", this.photoViewerPictureLoadedListener);
            this.photoViewerPictureLoadedTarget = null;
        }

        if (this.photoViewerPictureLoadedTarget === psv && 
            this.photoViewerPictureLoadedListener && 
            this.photoViewerPictureRotatedListener) {
            return;
        }

        if (!this.photoViewerPictureLoadedListener) {
            this.photoViewerPictureLoadedListener = () => {
                if (!this.photoViewerMiniMap) {
                    return;
                }

                var currentPsv = this.photoViewerPanoramax && this.photoViewerPanoramax.psv
                    ? this.photoViewerPanoramax.psv
                    : null;
                var pictureMetadata = currentPsv && typeof currentPsv.getPictureMetadata === "function"
                    ? currentPsv.getPictureMetadata()
                    : null;
                var gps = pictureMetadata && Array.isArray(pictureMetadata.gps) ? pictureMetadata.gps : null;

                if (typeof this.photoViewerMiniMap.setPhotoCoordinates === "function") {
                    this.photoViewerMiniMap.setPhotoCoordinates(gps);
                } else {
                    this.photoViewerMiniMap.pictureCoordinates = gps;
                }
            };
        }

        psv.addEventListener("picture-loaded", this.photoViewerPictureLoadedListener);

        if (!this.photoViewerPictureRotatedListener) {
            this.photoViewerPictureRotatedListener = () => {
                if (!this.photoViewerMiniMap) {
                    return;
                }

                var currentPsv = this.photoViewerPanoramax && this.photoViewerPanoramax.psv
                    ? this.photoViewerPanoramax.psv
                    : null;
                if (!currentPsv) {
                    return;
                }
                let heading = currentPsv.getPosition().yaw * (180 / Math.PI);
		        heading += currentPsv.getPictureOriginalHeading();
		        if (typeof this.photoViewerMiniMap.setPhotoHeading === "function") {
                    this.photoViewerMiniMap.setPhotoHeading(heading);
                } else {
                    this.photoViewerMiniMap.pictureHeading = heading;
                }
            };
        }

        psv.addEventListener("view-rotated", this.photoViewerPictureRotatedListener);

        this.photoViewerPictureLoadedTarget = psv;
    }

    // ################################################################### //
    // ######################## methods widgets ########################## //
    // ################################################################### //

    /**
     * Ajoute un widget personnalisé au viewer de photos de Panoramax.
     * @param {HTMLElement} widget - Élément du widget à ajouter.
     * @param {HTMLElement} container - Conteneur dans lequel ajouter le widget (le viewer de photos).
     */
    addWidget (widget, container) {
        if (!widget) {
            return;
        }
        if (!container) {
            return;
        }
        container.appendChild(widget);
    }

    /**
     * Crée un bouton de retour personnalisé pour le viewer de photos de Panoramax.
     * @returns {HTMLElement} Élément du bouton de retour.
     */
    createWidgetBtnBack () {
        // svg DSFR (fr-icon-arrow-left-line)
        var svg = `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            class="pnx-btn-svg"
            role="img"
            viewBox="0 0 24 24"
        >
            <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M7.828 11H20V13H7.828L13.192 18.364L11.778 19.778L4 12L11.778 4.22205L13.192 5.63605L7.828 11Z" />
        </svg>`;
        // Button back
        var buttonBack = document.createElement("pnx-button");
        buttonBack.className = "pnx-photo-viewer-back-button";
        // TODO dsfr
        // buttonBack.classList.add("gpf-btn", "gpf-btn--tertiary", "gpf-btn-icon");
        // buttonBack.classList.add("icon--ri", "icon--ri--close-line");
        // buttonBack.classList.add("fr-btn", "fr-btn--tertiary");
        buttonBack.setAttribute("slot", "top-left");
        buttonBack.setAttribute("kind", "superflat");
        buttonBack.setAttribute("size", "md");
        buttonBack.title = "Retour";
        buttonBack.innerHTML = svg;
        buttonBack.addEventListener("click", () => {
            this.onClickPnxViewerWidgetBack();
        });
        return buttonBack;
    }

    /**
     * Crée un bouton de fermeture personnalisé pour le viewer de photos de Panoramax.
     * @returns {HTMLElement} Élément du bouton de fermeture.
     */
    createWidgetBtnClose () {
        // svg DSFR (fr-icon-close-line)
        var svg = `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            class="pnx-btn-svg"
            role="img"
            viewBox="0 0 24 24"
        >
            <path fill="currentColor" d="m12 10.6 4.95-4.96 1.4 1.4L13.42 12l4.96 4.95-1.4 1.4L12 13.42l-4.95 4.96-1.4-1.4L10.58 12 5.63 7.05l1.4-1.4z"/>
        </svg>`;
        // Button close
        var button = document.createElement("pnx-button");
        button.classList.add("pnx-photo-viewer-close-button", "pnx-mobile-hidden");
        // TODO dsfr
        // button.classList.add("gpf-btn", "gpf-btn--tertiary", "gpf-btn-icon");
        // button.classList.add("icon--ri", "icon--ri--close-line");
        // button.classList.add("fr-btn", "fr-btn--tertiary");
        button.setAttribute("slot", "top-right");
        button.setAttribute("kind", "superflat");
        button.setAttribute("size", "md");
        button.title = "Fermer";
        button.innerHTML = svg;
        button.addEventListener("click", () => {
            this.onClickPnxViewerWidgetBack();
        });
        return button;
    }

    /**
     * Crée un bouton de zoom personnalisé pour le viewer de photos de Panoramax.
     * @returns {HTMLElement} Élément du bouton de zoom.
     */
    createWidgetBtnZoom () {
        // TODO dsfr
        // Button Zoom
        var zoom = document.createElement("pnx-widget-zoom");
        zoom.className = "pnx-photo-viewer-zoom-button";
        zoom.setAttribute("slot", "bottom-right");
        zoom.setAttribute("kind", "superflat");
        zoom.setAttribute("size", "md");
        zoom.addEventListener("click", (e) => {
            this.onClickPnxViewerWidgetZoom(e);
        });
        return zoom;
    }

    /**
     * Crée un bouton de plein écran personnalisé pour le viewer de photos de Panoramax.
     * @returns {HTMLElement} Élément du bouton de plein écran.
     */
    createWidgetBtnFullScreen () {
        let container = this.panelPanoramaxViewerContainer;
        if (!container) {
            return;
        }
        var svg = `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            class="pnx-btn-svg"
            role="img"
            viewBox="0 0 24 24"
        >
            <path fill="currentColor" d="M8 3V5H4V9H2V3H8ZM2 21V15H4V19H8V21H2ZM22 21H16V19H20V15H22V21ZM22 9H20V5H16V3H22V9Z" />
        </svg>`;
        let svgOn = `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            class="pnx-btn-svg"
            role="img"
            viewBox="0 0 24 24"
        >
            <path fill="currentColor" d="M18 7H22V9H16V3H18V7ZM8 9H2V7H6V3H8V9ZM18 17V21H16V15H22V17H18ZM8 15V21H6V17H2V15H8Z" />
        </svg>`;
        // Button fullscreen
        var button = document.createElement("pnx-button");
        button.className = "pnx-photo-viewer-fullscreen-button";
        // TODO dsfr
        // button.classList.add("gpf-btn", "gpf-btn--tertiary", "gpf-btn-icon");
        // button.classList.add("icon--ri", "icon--ri--close-line");
        // button.classList.add("fr-btn", "fr-btn--tertiary");
        button.setAttribute("slot", "bottom-right");
        button.setAttribute("kind", "superflat");
        button.setAttribute("size", "md");
        button.title = "Plein écran";
        button.innerHTML = `
            <span>${svg}</span>
            <span hidden>${svgOn}</span>
        `;
        button.addEventListener("click", (e) => {
            this.onClickPnxViewerWidgetFullScreen(e);
            // on switch l'icone
            if (container._pnxFullscreen) {
                button.querySelectorAll("span")[1].removeAttribute("hidden");
                button.querySelectorAll("span")[0].setAttribute("hidden", true);
            } else {
                button.querySelectorAll("span")[0].removeAttribute("hidden");
                button.querySelectorAll("span")[1].setAttribute("hidden", true);
            }
        });
        return button;
    }

    /**
     * Crée un composant de légende des photos personnalisé pour le viewer 
     * de photos de Panoramax.
     * @returns {HTMLElement} Élément du composant de légende des photos.
     */
    createWidgetCmpPictureLegend () {
        var pnxPictureLegend = document.createElement("gpf-picture-legend-widget");
        //var pnxPictureLegend = document.createElement("pnx-picture-legend");
        pnxPictureLegend.setAttribute("slot", "top-left");
        pnxPictureLegend.addEventListener("close", () => {
            this.onClickPnxViewerWidgetBack();
        });
        return pnxPictureLegend;
    }

    /**
     * Crée un composant de minimap personnalisé pour le viewer de photos de Panoramax.
     * @returns {HTMLElement} Élément du composant de minimap.
     */
    createWidgetCmpMinimap () {
        const LAYER_CONFIG = {
            "name" : "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2",
            "globalConstraint" : {
                "maxScaleDenominator" : 559082264.0287179,
                "minScaleDenominator" : 1066.364791924893,
                "bbox" : {
                    "left" : -179.9,
                    "right" : 179.9,
                    "top" : 85,
                    "bottom" : -85
                }
            },
            "params" : {
                "url" : "https://data.geopf.fr/wmts",
                "styles" : "normal",
                "version" : "1.0.0",
                "format" : "image/png",
                "projection" : "EPSG:3857",
                "minScale" : 1066.364791924893,
                "maxScale" : 559082264.0287179,
                "extent" : {
                    "left" : -179.9,
                    "right" : 179.9,
                    "top" : 85,
                    "bottom" : -85
                },
                "legends" : [
                    {
                        "format" : "image/jpeg",
                        "url" : "https://data.geopf.fr/annexes/ressources/legendes/LEGEND.jpg",
                        "minScaleDenominator" : "200"
                    }
                ],
                "title" : "Plan IGN",
                "description" : "<p>Cartographie multi-échelles sur le territoire national, issue des bases de données vecteur de l’IGN, mis à jour régulièrement et réalisée selon un processus entièrement automatisé.</p>\n",
                "tileMatrixSetLimits" : {
                    "0" : {
                        "minTileRow" : "0",
                        "maxTileRow" : "0",
                        "minTileCol" : "0",
                        "maxTileCol" : "0"
                    },
                    "1" : {
                        "minTileRow" : "0",
                        "maxTileRow" : "1",
                        "minTileCol" : "0",
                        "maxTileCol" : "1"
                    },
                    "2" : {
                        "minTileRow" : "0",
                        "maxTileRow" : "3",
                        "minTileCol" : "0",
                        "maxTileCol" : "3"
                    },
                    "3" : {
                        "minTileRow" : "0",
                        "maxTileRow" : "7",
                        "minTileCol" : "0",
                        "maxTileCol" : "7"
                    },
                    "4" : {
                        "minTileRow" : "0",
                        "maxTileRow" : "15",
                        "minTileCol" : "0",
                        "maxTileCol" : "15"
                    },
                    "5" : {
                        "minTileRow" : "0",
                        "maxTileRow" : "31",
                        "minTileCol" : "0",
                        "maxTileCol" : "31"
                    },
                    "6" : {
                        "minTileRow" : "0",
                        "maxTileRow" : "63",
                        "minTileCol" : "0",
                        "maxTileCol" : "63"
                    },
                    "7" : {
                        "minTileRow" : "0",
                        "maxTileRow" : "127",
                        "minTileCol" : "0",
                        "maxTileCol" : "127"
                    },
                    "8" : {
                        "minTileRow" : "0",
                        "maxTileRow" : "255",
                        "minTileCol" : "0",
                        "maxTileCol" : "255"
                    },
                    "9" : {
                        "minTileRow" : "0",
                        "maxTileRow" : "511",
                        "minTileCol" : "0",
                        "maxTileCol" : "511"
                    },
                    "10" : {
                        "minTileRow" : "1",
                        "maxTileRow" : "1022",
                        "minTileCol" : "0",
                        "maxTileCol" : "1023"
                    },
                    "11" : {
                        "minTileRow" : "3",
                        "maxTileRow" : "2044",
                        "minTileCol" : "0",
                        "maxTileCol" : "2047"
                    },
                    "12" : {
                        "minTileRow" : "6",
                        "maxTileRow" : "4089",
                        "minTileCol" : "1",
                        "maxTileCol" : "4094"
                    },
                    "13" : {
                        "minTileRow" : "13",
                        "maxTileRow" : "8178",
                        "minTileCol" : "2",
                        "maxTileCol" : "8189"
                    },
                    "14" : {
                        "minTileRow" : "26",
                        "maxTileRow" : "16357",
                        "minTileCol" : "4",
                        "maxTileCol" : "16379"
                    },
                    "15" : {
                        "minTileRow" : "53",
                        "maxTileRow" : "32714",
                        "minTileCol" : "9",
                        "maxTileCol" : "32758"
                    },
                    "16" : {
                        "minTileRow" : "107",
                        "maxTileRow" : "65428",
                        "minTileCol" : "18",
                        "maxTileCol" : "65517"
                    },
                    "17" : {
                        "minTileRow" : "214",
                        "maxTileRow" : "130857",
                        "minTileCol" : "36",
                        "maxTileCol" : "131035"
                    },
                    "18" : {
                        "minTileRow" : "429",
                        "maxTileRow" : "261714",
                        "minTileCol" : "72",
                        "maxTileCol" : "262071"
                    },
                    "19" : {
                        "minTileRow" : "858",
                        "maxTileRow" : "523429",
                        "minTileCol" : "145",
                        "maxTileCol" : "524142"
                    }
                },
                "TMSLink" : "PM_0_19",
                "matrixIds" : [
                    "0",
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12",
                    "13",
                    "14",
                    "15",
                    "16",
                    "17",
                    "18",
                    "19"
                ],
                "tileMatrices" : {
                    "0" : {
                        "matrixId" : "0",
                        "matrixHeight" : 1,
                        "matrixWidth" : 1,
                        "scaleDenominator" : 559082264.0287179,
                        "tileHeight" : 256,
                        "tileWidth" : 256,
                        "topLeftCorner" : {
                            "x" : -20037508.3427892,
                            "y" : 20037508.3427892
                        }
                    },
                    "1" : {
                        "matrixId" : "1",
                        "matrixHeight" : 2,
                        "matrixWidth" : 2,
                        "scaleDenominator" : 279541132.01435894,
                        "tileHeight" : 256,
                        "tileWidth" : 256,
                        "topLeftCorner" : {
                            "x" : -20037508.3427892,
                            "y" : 20037508.3427892
                        }
                    },
                    "2" : {
                        "matrixId" : "2",
                        "matrixHeight" : 4,
                        "matrixWidth" : 4,
                        "scaleDenominator" : 139770566.0071793,
                        "tileHeight" : 256,
                        "tileWidth" : 256,
                        "topLeftCorner" : {
                            "x" : -20037508.3427892,
                            "y" : 20037508.3427892
                        }
                    },
                    "3" : {
                        "matrixId" : "3",
                        "matrixHeight" : 8,
                        "matrixWidth" : 8,
                        "scaleDenominator" : 69885283.00358965,
                        "tileHeight" : 256,
                        "tileWidth" : 256,
                        "topLeftCorner" : {
                            "x" : -20037508.3427892,
                            "y" : 20037508.3427892
                        }
                    },
                    "4" : {
                        "matrixId" : "4",
                        "matrixHeight" : 16,
                        "matrixWidth" : 16,
                        "scaleDenominator" : 34942641.50179486,
                        "tileHeight" : 256,
                        "tileWidth" : 256,
                        "topLeftCorner" : {
                            "x" : -20037508.3427892,
                            "y" : 20037508.3427892
                        }
                    },
                    "5" : {
                        "matrixId" : "5",
                        "matrixHeight" : 32,
                        "matrixWidth" : 32,
                        "scaleDenominator" : 17471320.75089743,
                        "tileHeight" : 256,
                        "tileWidth" : 256,
                        "topLeftCorner" : {
                            "x" : -20037508.3427892,
                            "y" : 20037508.3427892
                        }
                    },
                    "6" : {
                        "matrixId" : "6",
                        "matrixHeight" : 64,
                        "matrixWidth" : 64,
                        "scaleDenominator" : 8735660.375448715,
                        "tileHeight" : 256,
                        "tileWidth" : 256,
                        "topLeftCorner" : {
                            "x" : -20037508.3427892,
                            "y" : 20037508.3427892
                        }
                    },
                    "7" : {
                        "matrixId" : "7",
                        "matrixHeight" : 128,
                        "matrixWidth" : 128,
                        "scaleDenominator" : 4367830.1877243575,
                        "tileHeight" : 256,
                        "tileWidth" : 256,
                        "topLeftCorner" : {
                            "x" : -20037508.3427892,
                            "y" : 20037508.3427892
                        }
                    },
                    "8" : {
                        "matrixId" : "8",
                        "matrixHeight" : 256,
                        "matrixWidth" : 256,
                        "scaleDenominator" : 2183915.0938621787,
                        "tileHeight" : 256,
                        "tileWidth" : 256,
                        "topLeftCorner" : {
                            "x" : -20037508.3427892,
                            "y" : 20037508.3427892
                        }
                    },
                    "9" : {
                        "matrixId" : "9",
                        "matrixHeight" : 512,
                        "matrixWidth" : 512,
                        "scaleDenominator" : 1091957.5469310894,
                        "tileHeight" : 256,
                        "tileWidth" : 256,
                        "topLeftCorner" : {
                            "x" : -20037508.3427892,
                            "y" : 20037508.3427892
                        }
                    },
                    "10" : {
                        "matrixId" : "10",
                        "matrixHeight" : 1024,
                        "matrixWidth" : 1024,
                        "scaleDenominator" : 545978.7734655464,
                        "tileHeight" : 256,
                        "tileWidth" : 256,
                        "topLeftCorner" : {
                            "x" : -20037508.3427892,
                            "y" : 20037508.3427892
                        }
                    },
                    "11" : {
                        "matrixId" : "11",
                        "matrixHeight" : 2048,
                        "matrixWidth" : 2048,
                        "scaleDenominator" : 272989.38673277217,
                        "tileHeight" : 256,
                        "tileWidth" : 256,
                        "topLeftCorner" : {
                            "x" : -20037508.3427892,
                            "y" : 20037508.3427892
                        }
                    },
                    "12" : {
                        "matrixId" : "12",
                        "matrixHeight" : 4096,
                        "matrixWidth" : 4096,
                        "scaleDenominator" : 136494.69336638608,
                        "tileHeight" : 256,
                        "tileWidth" : 256,
                        "topLeftCorner" : {
                            "x" : -20037508.3427892,
                            "y" : 20037508.3427892
                        }
                    },
                    "13" : {
                        "matrixId" : "13",
                        "matrixHeight" : 8192,
                        "matrixWidth" : 8192,
                        "scaleDenominator" : 68247.34668319322,
                        "tileHeight" : 256,
                        "tileWidth" : 256,
                        "topLeftCorner" : {
                            "x" : -20037508.3427892,
                            "y" : 20037508.3427892
                        }
                    },
                    "14" : {
                        "matrixId" : "14",
                        "matrixHeight" : 16384,
                        "matrixWidth" : 16384,
                        "scaleDenominator" : 34123.673341596535,
                        "tileHeight" : 256,
                        "tileWidth" : 256,
                        "topLeftCorner" : {
                            "x" : -20037508.3427892,
                            "y" : 20037508.3427892
                        }
                    },
                    "15" : {
                        "matrixId" : "15",
                        "matrixHeight" : 32768,
                        "matrixWidth" : 32768,
                        "scaleDenominator" : 17061.83667079829,
                        "tileHeight" : 256,
                        "tileWidth" : 256,
                        "topLeftCorner" : {
                            "x" : -20037508.3427892,
                            "y" : 20037508.3427892
                        }
                    },
                    "16" : {
                        "matrixId" : "16",
                        "matrixHeight" : 65536,
                        "matrixWidth" : 65536,
                        "scaleDenominator" : 8530.918335399145,
                        "tileHeight" : 256,
                        "tileWidth" : 256,
                        "topLeftCorner" : {
                            "x" : -20037508.3427892,
                            "y" : 20037508.3427892
                        }
                    },
                    "17" : {
                        "matrixId" : "17",
                        "matrixHeight" : 131072,
                        "matrixWidth" : 131072,
                        "scaleDenominator" : 4265.459167699572,
                        "tileHeight" : 256,
                        "tileWidth" : 256,
                        "topLeftCorner" : {
                            "x" : -20037508.3427892,
                            "y" : 20037508.3427892
                        }
                    },
                    "18" : {
                        "matrixId" : "18",
                        "matrixHeight" : 262144,
                        "matrixWidth" : 262144,
                        "scaleDenominator" : 2132.7295838497826,
                        "tileHeight" : 256,
                        "tileWidth" : 256,
                        "topLeftCorner" : {
                            "x" : -20037508.3427892,
                            "y" : 20037508.3427892
                        }
                    },
                    "19" : {
                        "matrixId" : "19",
                        "matrixHeight" : 524288,
                        "matrixWidth" : 524288,
                        "scaleDenominator" : 1066.364791924893,
                        "tileHeight" : 256,
                        "tileWidth" : 256,
                        "topLeftCorner" : {
                            "x" : -20037508.3427892,
                            "y" : 20037508.3427892
                        }
                    }
                },
                "nativeResolutions" : [
                    "156543.0339280410",
                    "78271.51696402048",
                    "39135.75848201023",
                    "19567.87924100512",
                    "9783.939620502561",
                    "4891.969810251280",
                    "2445.984905125640",
                    "1222.992452562820",
                    "611.4962262814100",
                    "305.7481131407048",
                    "152.8740565703525",
                    "76.43702828517624",
                    "38.21851414258813",
                    "19.10925707129406",
                    "9.554628535647032",
                    "4.777314267823516",
                    "2.388657133911758",
                    "1.194328566955879",
                    "0.5971642834779395",
                    "0.2985821417389697"
                ]
            }
        };
        var minimap = document.createElement("pnx-mini-map");
        minimap.className = "pnx-photo-viewer-mini-map";
        minimap.setAttribute("slot", "bottom-left");
        minimap.map = this.getMap();
        minimap.options = {
            layers : [
                new GeoportalWMTS({
                    layer : "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2",
                    configuration : LAYER_CONFIG
                }),
                this.layerPanoramax
            ],
            width : 48,
            height : 48,
            disableOverviewDragging : true,
            disableOverviewBBox : true
        };
        minimap.addEventListener("toggle", (e) => {
            let status = e.detail.status;
            if (status) {
                this.photoViewerPanoramax.classList.add("pnx-photo-viewer-container--minimap-open");
            } else {
                this.photoViewerPanoramax.classList.remove("pnx-photo-viewer-container--minimap-open");
            }
        });
        this.photoViewerMiniMap = minimap;
        return minimap;
    }

    /**
     * Supprime le positionnement du widget "Annotations switch" du viewer 
     * de photos de Panoramax
     */
    removeWidgetAnnotationsSwitch () {
        if (!this.photoViewerPanoramax) {
            logger.warn("Panoramax photo viewer is not available");
            return;
        }
        // on supprime le switch d'annotations, qui n'est pas pertinent pour notre usage,
        var pnxAnnotationsSwitch = this.photoViewerPanoramax.querySelector("pnx-annotations-switch");
        if (pnxAnnotationsSwitch) {
            pnxAnnotationsSwitch.remove();
        }
    }

    /**
     * Supprime le widget "Picture legend" du viewer de photos de Panoramax
     * On supprime le mode drawer pour le widget de légende des photos
     */
    removeWidgetPictureLegendDrawer () {
        if (!this.photoViewerPanoramax) {
            logger.warn("Panoramax photo viewer is not available");
            return;
        }
        // on supprime le mode drawer pour le widget de légende des photos,
        // pour l'afficher directement dans le viewer, en haut à gauche
        var pnxBottomDrawer = this.photoViewerPanoramax.querySelector("pnx-bottom-drawer");
        if (pnxBottomDrawer) {
            pnxBottomDrawer.remove();
        }
    }

    /**
     * Supprime le widget de player de séquence du viewer de photos de Panoramax
     */
    removeWidgetPlayer () {
        if (!this.photoViewerPanoramax) {
            logger.warn("Panoramax photo viewer is not available");
            return;
        }
        // on supprime le player de séquence, qui n'est pas pertinent pour notre usage,
        var pnxPlayer = this.photoViewerPanoramax.querySelector("pnx-widget-player");
        if (pnxPlayer) {
            pnxPlayer.remove();
        }
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
            // empêche les events sur la couche Panoramax pendant que la preview est ouverte
            this.preventPointerMoveOnMap(markerElement);
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
                stopEvent : false
            });
            map.addOverlay(this.previewPopupOverlay);
            // empêche les events sur la couche Panoramax pendant que la preview est ouverte
            this.preventPointerMoveOnMap(this.previewPopupElement);
        }

        this.previewPopupOverlay.setPosition(position);
    }

    /**
     * Affiche la prévisualisation selon le type de couche Panoramax.
     *
     * @param {ol.Feature} feature - Entité à prévisualiser.
     */
    displayPreview (feature) {
        let properties = feature.getProperties();
        var type = properties.layer || properties["mvt:layer"];

        // stocke la feature survolée
        this.selectedFeature = feature;
        var pfeature = this._transformToPanoramaxFeature(feature);
        switch (type) {
            case "grid":
                // preview des statistiques panoramax
                if (this.options.interactions["grid"].active && 
                    this.options.interactions["grid"].actions.includes("preview")
                ) {
                    this.displayPreviewGrid(pfeature.coordinates, pfeature.properties);
                }
                break;
            case "sequences":
                // la prévisualisation d'une image parmis la séquence
                if (this.options.interactions["sequences"].active && 
                    this.options.interactions["sequences"].actions.includes("preview")
                ) {
                    this.displayPreviewSequence(pfeature.coordinates, pfeature.properties);
                }
                break;
            case "pictures":
                if (this.options.interactions["pictures"].active && 
                    this.options.interactions["pictures"].actions.includes("preview")
                ) {
                    // preview de l'image panoramax
                    this.displayPreviewPicture(pfeature.coordinates, pfeature.properties);
                }
                break;
            default:
                logger.warn("Unknown feature type :", type);
        }
    }

    /**
     * Transforme une feature OL en PanoramaxPreviewFeature
     * @param {ol.Feature} feature - Feature OL
     * @returns {PanoramaxPreviewFeature} Feature Panoramax pour prévisualisation
     * @private
     */
    _transformToPanoramaxFeature (feature) {
        return {
            coordinates : feature.getFlatCoordinates(),
            extent : feature.getExtent(),
            pointerCoordinate : feature.pointerCoordinate,
            properties : feature.getProperties()
        };
    };

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
     * @param {PanoramaxPreviewGridLayer} feature - Propriétés de l'entité survolée.
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

        this.setPopup(coordinates, content);
        this.setMarker(coordinates);
    }

    /**
     * Affiche la prévisualisation d'une entité de type `sequences`.
     *
     * @param {Array<Number>} coordinates - Coordonnées du point survolé.
     * @param {PanoramaxPreviewSequenceLayer} feature - Propriétés de l'entité survolée.
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
            ? `<img src="${api}/collections/${encodedPictureId}/thumb.jpg" alt="" class="pnx-preview-picture-popup__img" width="240">`
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

        this.setPopup(coordinates, content);
        this.setMarker(coordinates);
    }

    /**
     * Affiche la prévisualisation d'une entité de type `pictures`.
     *
     * @param {Array<Number>} coordinates - Coordonnées du point survolé.
     * @param {PanoramaxPreviewPictureLayer} feature - Propriétés de l'entité survolée.
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
            ? `<img src="${api}/pictures/${encodedPictureId}/thumb.jpg" alt="" class="pnx-preview-picture-popup__img" width="240">`
            : "";
        var content = `
            <p class="${className}">
                <samp>
                    <strong>ID :</strong> ${id || "-"} <br>
                    date : ${ts || "-"} <br>
                    type : ${type || "-"}
                </samp>
                ${imageHtml}
            </p>
        `;
        this.setPopup(coordinates, content);
        this.setMarker(coordinates);
    }

    // ################################################################### //
    // ######################## methods visualization #################### //
    // ################################################################### //

    /**
     * Applique la taille de fenêtre de visualisation spécifiée dans les options,
     * en ajoutant la classe CSS correspondante au container de la fenêtre de visualisation.
     * @param {String} size - Taille de la fenêtre de visualisation : "small", "medium", "large", "fullscreen", ou "fullscreen-map".
     */
    setSizeWindow (size) {
        var container = this.panelPanoramaxViewerContainer;
        if (!container) {
            return;
        }

        container.classList.remove("pnx-visualization-window-size-small", "pnx-visualization-window-size-medium", "pnx-visualization-window-size-large", "pnx-visualization-window-size-fullscreen", "pnx-visualization-window-size-fullscreen-map");
        switch (size) {
            case "small":
                container.classList.add("pnx-visualization-window-size-small");
                this.stopMapViewportSync();
                container._pnxFullscreen = false;
                break;
            case "medium":
                container.classList.add("pnx-visualization-window-size-medium");
                this.stopMapViewportSync();
                container._pnxFullscreen = false;
                break;
            case "large":
                container.classList.add("pnx-visualization-window-size-large");
                this.stopMapViewportSync();
                container._pnxFullscreen = false;
                break;
            case "fullscreen":
                container.classList.add("pnx-visualization-window-size-fullscreen");
                container._pnxFullscreen = true;
                this.stopMapViewportSync();
                break;
            case "fullscreen-map":
                container.classList.add("pnx-visualization-window-size-fullscreen-map");
                container._pnxFullscreen = false;
                this.startMapViewportSync();
                break;
            default:
                logger.warn("Unknown visualization window size :", size);
                container.classList.add("pnx-visualization-window-size-medium");
                this.stopMapViewportSync();
                break;
        }
    }

    /**
     * Synchronise la position et la taille de la fenêtre de visualisation
     * avec la carte (mode fullscreen-map)
     * 
     * @private
     */
    startMapViewportSync () {
        var self = this;
        if (this.mapViewportSyncListener) {
            return; // Évite d'ajouter plusieurs écouteurs
        }

        var map = this.getMap();
        var updateMapViewport = () => {
            if (!self.panelPanoramaxViewerContainer || !map) {
                return;
            }
            var mapViewport = map.getViewport();
            var rect = mapViewport.getBoundingClientRect();
            
            self.panelPanoramaxViewerContainer.style.setProperty("--pnx-map-top", rect.top + "px");
            self.panelPanoramaxViewerContainer.style.setProperty("--pnx-map-left", rect.left + "px");
            self.panelPanoramaxViewerContainer.style.setProperty("--pnx-map-width", rect.width + "px");
            self.panelPanoramaxViewerContainer.style.setProperty("--pnx-map-height", rect.height + "px");
        };

        // Calcul initial
        updateMapViewport();

        // Mise à jour lors du redimensionnement de la fenêtre
        this.mapViewportSyncListener = updateMapViewport;
        window.addEventListener("resize", this.mapViewportSyncListener);

        // Mise à jour lors du défilement
        window.addEventListener("scroll", this.mapViewportSyncListener);

        // Mise à jour lors des changements nécessaires (ex: pan, zoom)
        var map = this.getMap();
        if (map) {
            map.on("change:size", this.mapViewportSyncListener);
        }
    }

    /**
     * Arrête la synchronisation de la position et la taille
     * 
     * @private
     */
    stopMapViewportSync () {
        if (!this.mapViewportSyncListener) {
            return;
        }
        window.removeEventListener("resize", this.mapViewportSyncListener);
        window.removeEventListener("scroll", this.mapViewportSyncListener);
        var map = this.getMap();
        if (map) {
            map.un("change:size", this.mapViewportSyncListener);
        }
        this.mapViewportSyncListener = null;
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
    _getMapboxLayerByType (type) {
        if (!type) {
            return null;
        }
        if (!this.PANORAMAX_LAYERS_TYPES.includes(type)) {
            return null;
        }
        if (!this.layerPanoramax) {
            return null;
        }

        var mapboxLayers = this.layerPanoramax.get("mapbox-layers");
        // INFO
        // On part toujours du style enregistré de la couche Panoramax
        var mapboxStyle = this.layerPanoramax.get("mapbox-style");  
        if (!Array.isArray(mapboxLayers)) {  
            return null;  
        }
        if (!mapboxStyle || !Array.isArray(mapboxStyle.layers)) {  
            return null;  
        }

        var field = mapboxLayers.find(l => l.includes(type));
        if (!field) {
            return null;
        }
        var originalMapboxLayer = mapboxStyle.layers.find(l => l.id === field);
        if (!originalMapboxLayer) {
            return null;
        }
        return originalMapboxLayer;
    }

    /**
     * Ajoute un filtre sur le type de photo à la couche Mapbox correspondante.
     * Si le filtre est exclusif, il remplace le filtre existant.
     * Sinon, il ajoute le filtre au tableau des filtres existants.
     *
     * @param {Array|undefined} filter - Filtre existant de la couche Mapbox.
     * @param {String} value - Type de photo à filtrer : "flat" ou "equirectangular".
     * @returns {Array} Nouveau tableau de filtres pour la couche Mapbox.
     * @private
     */
    _addFilterTypeToMapboxLayer (filter, value) {
        var exclusive = this.options.buttonsWindow.filters.exclusive;
        if (exclusive || !filter) {
            filter = ["all", ["==", ["get", "type"], value]];
        } else {
            if (Array.isArray(filter)) {
                // on recherche si il existe déjà un element 'field' dans la liste des filtres
                // si oui, on le remplace
                // si non, on l'ajoute
                var typeFilterIndex = filter.findIndex(f => Array.isArray(f) && f[0] === "==" && f[1][1] === "type");
                if (typeFilterIndex !== -1) {
                    filter[typeFilterIndex] = ["==", ["get", "type"], value];
                } else {
                    filter.push(["==", ["get", "type"], value]);
                }
            } else {
                filter = ["all", ["==", ["get", "type"], value]];
            }
        }
        return filter;
    }

    /**
     * Ajoute un filtre sur la plage de dates à la couche Mapbox correspondante.
     * Si le filtre est exclusif, il remplace le filtre existant.
     * Sinon, il ajoute le filtre au tableau des filtres existants.
     *
     * @param {Array|undefined} filters - Filtres existants de la couche Mapbox.
     * @param {String} field - Nom du champ de date dans les propriétés de la feature.
     * @param {Date|null} minDate - Date minimale à filtrer.
     * @param {Date|null} maxDate - Date maximale à filtrer.
     * @returns {Array|null} Nouveau tableau de filtres pour la couche Mapbox, ou `null` si aucun filtre n'est appliqué.
     * @private
     */
    _addFilterDateToMapboxLayer (filters, field, minDate, maxDate) {
        var exclusive = this.options.buttonsWindow.filters.exclusive;
        var newFilters = [];
        if (minDate && minDate instanceof Date) {
            newFilters.push([">=", ["get", field], minDate.toISOString().split("T")[0]]);
        }
        if (maxDate && maxDate instanceof Date) {
            newFilters.push(["<=", ["get", field], maxDate.toISOString().split("T")[0]]);
        }
        if (newFilters.length > 0) {
            if (exclusive || !filters) {
                if (newFilters.length === 2) {
                    newFilters.unshift("all");
                }
                filters = newFilters;
            } else {
                if (Array.isArray(filters)) {
                    var dateMinFilterIndex = filters.findIndex(f => Array.isArray(f) && f[0] === ">=" && f[1][1] === field);
                    var dateMaxFilterIndex = filters.findIndex(f => Array.isArray(f) && f[0] === "<=" && f[1][1] === field);
                    if (dateMinFilterIndex !== -1) {
                        filters[dateMinFilterIndex] = newFilters[0];
                    } else {
                        filters.push(newFilters[0]);
                    }
                    if (dateMaxFilterIndex !== -1) {
                        filters[dateMaxFilterIndex] = newFilters[1];
                    } else {
                        filters.push(newFilters[1]);
                    }
                }
            }
            // EVOLUTION :
            // colorer les séquences contenant des photos prises 
            // dans la plage de dates sélectionnée (ex. en bleu)
            // filters.paint["circle-color"] = "#0000FF"; 
        } else {
            // si pas de filtre, on supprime les filtres existants
            return null;
        }
        return filters;
    }

    /**
     * Filtre des couches mapbox selon le type de photo sélectionné.
     * 
     * @param {String|null} value - Type de photo à filtrer : 
     * "flat", "equirectangular", ou `null` pour réinitialiser le filtre.
     * @returns {Array<Object>} Tableau d'objets de style Mapbox.
     * @private
     */
    filterCameraToMapboxLayer (value) {
        var mapboxLayers = [];
        for (let index = 0; index < this.PANORAMAX_LAYERS_TYPES.length; index++) {
            const type = this.PANORAMAX_LAYERS_TYPES[index];
            var mapboxLayer = this._getMapboxLayerByType(type);
            if (!mapboxLayer) {
                continue;
            }
            if (type === "pictures") {
                if (value === "flat" || value === "equirectangular") {
                    mapboxLayer.filter = this._addFilterTypeToMapboxLayer(mapboxLayer.filter, value);
                } else {
                    // supprimer uniquement le filtre sur le type de photo, 
                    // et pas tous les filtres existants !
                    if (mapboxLayer.filter && Array.isArray(mapboxLayer.filter)) {
                        mapboxLayer.filter = mapboxLayer.filter.filter(f => !(Array.isArray(f) && f[0] === "==" && f[1][1] === "type"));
                        // si il reste que le filtre ["all"], on supprime tout le filtre
                        if (Array.isArray(mapboxLayer.filter) && mapboxLayer.filter.length === 1 && mapboxLayer.filter[0] === "all") {
                            delete mapboxLayer.filter;
                        }
                    }
                }
            } else if (type === "sequences") {
                if (value === "flat" || value === "equirectangular") {
                    mapboxLayer.filter = this._addFilterTypeToMapboxLayer(mapboxLayer.filter, value);
                } else {
                    if (mapboxLayer.filter && Array.isArray(mapboxLayer.filter)) {
                        mapboxLayer.filter = mapboxLayer.filter.filter(f => !(Array.isArray(f) && f[0] === "==" && f[1][1] === "type"));
                        if (Array.isArray(mapboxLayer.filter) && mapboxLayer.filter.length === 1 && mapboxLayer.filter[0] === "all") {
                            delete mapboxLayer.filter;
                        }
                    }
                }
            } else if (type === "grid") {
                // TODO filtrer la couche de grille
                // comment filtrer la couche de grille en fonction du type de photo sélectionné ?
                // ex. afficher uniquement les cellules contenant des photos 360° ?
            }
            mapboxLayers.push(mapboxLayer);
        }
        return mapboxLayers;
    }

    /**
     * Filtre des couches mapbox selon la plage de dates sélectionnée.
     * 
     * @param {Date|null} minDate - Date minimale à filtrer.
     * @param {Date|null} maxDate - Date maximale à filtrer.
     * @returns {Array<Object>} Tableau d'objets de style Mapbox.
     * @private
     */
    filterDateToMapboxLayer (minDate, maxDate) {
        var mapboxLayers = [];
        for (let index = 0; index < this.PANORAMAX_LAYERS_TYPES.length; index++) {
            const type = this.PANORAMAX_LAYERS_TYPES[index];
            var mapboxLayer = this._getMapboxLayerByType(type);
            if (!mapboxLayer) {
                continue;
            }
            if (type === "pictures") {
                var pictureFilters = this._addFilterDateToMapboxLayer(mapboxLayer.filter, "ts", minDate, maxDate);
                if (pictureFilters) {
                    mapboxLayer.filter = pictureFilters;
                } else {
                    // supprimer uniquement le filtre sur le type de date, 
                    // et pas tous les filtres existants !
                    if (mapboxLayer.filter && Array.isArray(mapboxLayer.filter)) {
                        mapboxLayer.filter = mapboxLayer.filter.filter(f => !(Array.isArray(f) && (f[0] === ">=" || f[0] === "<=") && f[1][1] === "ts"));
                        // si il reste que le filtre ["all"], on supprime tout le filtre
                        if (Array.isArray(mapboxLayer.filter) && mapboxLayer.filter.length === 1 && mapboxLayer.filter[0] === "all") {
                            delete mapboxLayer.filter;
                        }
                    }
                }
            } else if (type === "sequences") {
                var sequenceFilters = this._addFilterDateToMapboxLayer(mapboxLayer.filter, "date", minDate, maxDate);
                if (sequenceFilters) {
                    mapboxLayer.filter = sequenceFilters;
                } else {
                    if (mapboxLayer.filter && Array.isArray(mapboxLayer.filter)) {
                        mapboxLayer.filter = mapboxLayer.filter.filter(f => !(Array.isArray(f) && (f[0] === ">=" || f[0] === "<=") && f[1][1] === "date"));
                        if (Array.isArray(mapboxLayer.filter) && mapboxLayer.filter.length === 1 && mapboxLayer.filter[0] === "all") {
                            delete mapboxLayer.filter;
                        }
                    }
                }
            } else if (type === "grid") {
                // TODO filtrer la couche de grille
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
     * 
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
     * 
     * @param {String} value - nom du rendu sélectionné.
     * @return {Array<Object>} Tableau d'objets de style Mapbox filtrés selon le rendu sélectionné.
     * @private
     * @todo implémenter les autres types de filtres !
     */
    filterRenderToMapboxLayer (value) {
        var mapboxLayers = [];
        return mapboxLayers;
    }

    resetAllGroupFilters (options = {}) {
        const groups = [
            "group-filter-dates",
            "group-filter-periodes",
            "group-filter-types",
            "group-filter-renders"
        ];
        groups.forEach(group => {
            this.resetGroupFilter(group, options);
        });	
    }

    resetGroupFilter (group, options = {}) {
        var silent = options.silent === true;
        var elements = this.panelPanoramaxOptions.elements;
        var groupElements = elements[group];
        if (!groupElements) {
            return;
        }
        
        this.isResetEventPropagation = options.isReset === true;

        Array.from(groupElements).forEach(el => {
            if (el.type === "input" || el.type === "radio") {
                el.checked = (el.dataset.default === "true");
                if (!silent && el.checked) {
                    el.dispatchEvent(new Event("change", { "bubbles" : true }));
                }
            } else if (el.type === "button") {
                el.setAttribute("aria-pressed", "false");
            } else if (el.type === "date") {
                el.value = "";
            }
        });

        this.isResetEventPropagation = false;
    }

    applyGroupFilter (group, options = {}) {
        var silent = options.silent === true;
        var value = options.value;
        var elements = this.panelPanoramaxOptions.elements;
        var groupElements = elements[group];
        if (!groupElements) {
            return;
        }

        this.isResetEventPropagation = options.isReset === true;

        switch (group) {
            case "group-filter-types":
                // Si value est fournie, chercher l'élément via le texte du label associé
                // On compare les valeurs "Tout", "Classique" ou "360°"
                if (value !== undefined) {
                    Array.from(groupElements).forEach(el => {
                        if (el.type === "input" || el.type === "radio") {
                            var label = this.panelPanoramaxOptions.querySelector("label[for='" + el.id + "']");
                            var labelValue = label.innerText;
                            el.checked = (labelValue === value) || (String(el.value) === String(value));
                        }
                    });
                }
                // Dispatcher l'événement sur les éléments input/radio cochés
                Array.from(groupElements).forEach(el => {
                    if ((el.type === "input" || el.type === "radio") && el.checked && !silent) {
                        el.dispatchEvent(new Event("change", { "bubbles" : true }));
                    }
                });
                break;

            case "group-filter-periodes":
                // TODO
                break;

            case "group-filter-dates":
                // TODO
                break;

            case "group-filter-renders":
                // TODO
                break;
        }

        this.isResetEventPropagation = false;
    }

    /**
     * Applique les filtres sélectionnés à la couche Panoramax.
     * 
     * @param {Array<Object>} mapboxLayers - format Mapbox Style.
     * @returns {Promise} Promise résolue lorsque les filtres sont appliqués.
     */
    async applyFilters (mapboxLayers) {
        // INFO 
        // par defaut, les filtres ne sont pas cumulatifs : 
        // ex. si on applique un filtre de type de photo, 
        // puis un filtre de date, le second filtre écrase le premier, 
        // au lieu de les cumuler (ex. filtrer par type de photo ET par date)
        
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

        // Pour forcer la mise à jour du cache interne de ol-mapbox-style
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

    /**
     * Met à jour la position du panneau de filtres Panoramax 
     * pour qu'il soit aligné avec le panneau de boutons d'ouverture du viewer.
     * @private
     */
    updateFiltersPanelPosition () {
        if (!this.panelPanoramaxOptions || !this.panelPanoramaxButtonsContainer) {
            return;
        }
        var dialogRect = this.panelPanoramaxButtonsContainer.getBoundingClientRect();
        this.panelPanoramaxOptions.style.left = dialogRect.left + "px";
        this.panelPanoramaxOptions.style.top = "";
        this.panelPanoramaxOptions.style.bottom = (window.innerHeight - dialogRect.top + 6) + "px";
    }

    /**
     * Lie les événements de redimensionnement et de défilement 
     * pour mettre à jour la position du panneau de filtres Panoramax.
     * @private
     */
    bindFiltersPanelPositioning () {
        if (this._onPanoramaxOptionsReposition) {
            return;
        }
        this._onPanoramaxOptionsReposition = this.updateFiltersPanelPosition.bind(this);
        window.addEventListener("resize", this._onPanoramaxOptionsReposition);
        window.addEventListener("scroll", this._onPanoramaxOptionsReposition, true);
    }

    /**
     * Délie les événements de redimensionnement et de défilement
     * @private
     */
    unbindFiltersPanelPositioning () {
        if (!this._onPanoramaxOptionsReposition) {
            return;
        }
        window.removeEventListener("resize", this._onPanoramaxOptionsReposition);
        window.removeEventListener("scroll", this._onPanoramaxOptionsReposition, true);
        this._onPanoramaxOptionsReposition = null;
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
        var container = this.panelPanoramaxViewerContainer;
        if (!container) {
            return;
        }
        this.buttonPanoramaxShow.click();
        // reset du fullscreen si besoin
        this.setSizeWindow(this.options.visualizationWindow.size || "medium");
        this.dispatchEvent({
            type : this.CLOSED_PANORAMAX_EVENT
        });
        this.dispatchEvent({
            type : this.FULLSCREEN_PANORAMAX_EVENT,
            data : {
                fullscreen : false
            },
        });
        // Bloque l'envoi/rechargement de la page
        e.preventDefault();
    }

    /**
     * Gère le clic de retour sur la carte avec
     * fermeture du panneau Panoramax.
     *
     * @param {Event} e - Événement DOM du bouton de retour.
     * @private
     */
    onReturnPanoramaxClick (e) {
        var container = this.panelPanoramaxViewerContainer;
        if (!container) {
            return;
        }
        this.hidePhotoViewer();
        this.showButtonsPanel();
        // reset du fullscreen si besoin
        this.setSizeWindow(this.options.visualizationWindow.size || "medium");
        this.dispatchEvent({
            type : this.CLOSED_PANORAMAX_EVENT
        });
        this.dispatchEvent({
            type : this.FULLSCREEN_PANORAMAX_EVENT,
            data : {
                fullscreen : false
            },
        });
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
        this.resetPreview();
    }

    /**
     * Gère le clic d'ouverture du menu des options.
     *
     * @param {Event} e - Événement DOM du bouton des options.
     * @private
     */
    onOpenPanoramaxOptionsClick (e) {
        logger.debug(e);
        if (!this.panelPanoramaxOptions || !this.btnPanoramaxOptions) {
            return;
        }

        var panel = this.panelPanoramaxOptions;
        var button = this.btnPanoramaxOptions;
        var open = button.getAttribute("aria-pressed") === "true";

        if (!open) {
            panel.classList.replace("gpf-visible", "gpf-hidden");
            this.unbindFiltersPanelPositioning();
            return;
        }

        panel.classList.replace("gpf-hidden", "gpf-visible");
        //this.updateFiltersPanelPosition();
        //this.bindFiltersPanelPositioning();
    }

    /**
     * Gère le clic de réinitialisation des filtres Panoramax.
     * @param {Event} e - Événement DOM du bouton de réinitialisation.
     */
    onResetPanoramaxFiltersClick (e) {
        // réinitialiser tous les filtres à leur état initial
        // ainsi que le rendu de la couche
        var mapboxLayers = this.originalStyleLayerPanoramax.layers;
        this.applyFilters(mapboxLayers)
            .then(() => {
                this.resetAllGroupFilters();
            })
            .then(() => {
                this.dispatchEvent(this.FILTER_INIT_PANORAMAX_EVENT);
            })
            .catch((err) => {
                logger.error("Error applying initial Panoramax filters", err);
            });
    }

    /**
     * Gère le changement de type d'image dans les filtres Panoramax.
     *
     * @param {Event} e - Événement DOM du sélecteur de type.
     * @param {String} value - Valeur du type d'image sélectionné.
     * @private
     */
    onChangePanoramaxFilterByType (e, value) {
        logger.debug("onChangePanoramaxFilterByType", e);
        if (!e || !e.target) {
            return;
        }

        if (this.isResetEventPropagation) {
            return;
        }

        var selectedType = (value || "").toLowerCase();
        var cameraType = null;

        if (selectedType === "classique") {
            cameraType = "flat";
        } else if (selectedType === "360°" || selectedType === "360") {
            cameraType = "equirectangular";
        }

        var mapboxLayers = this.filterCameraToMapboxLayer(cameraType);

        var self = this;
        this.applyFilters(mapboxLayers)
            .then((mapboxLayers) => {
                if (!self.options.buttonsWindow.filters.exclusive) {
                    // dans le cas où les filtres ne sont pas exclusifs, 
                    // on garde les autres filtres appliqués (ex. période, dates, rendu)
                    var style = self.layerPanoramax.get("mapbox-style");
                    style.layers = mapboxLayers;
                    self.layerPanoramax.set("mapbox-style", style);
                    logger.debug("Panoramax mapbox-style updated");
                }
                self.dispatchEvent({
                    type : self.FILTER_TYPE_PANORAMAX_EVENT,
                    data : {
                        value : selectedType,
                        mapboxLayers : mapboxLayers
                    }
                });
            })
            .then(() => {
                // reset des autres filtres (ex. période, dates, rendu)
                if (self.options.buttonsWindow.filters.exclusive) {
                    self.resetGroupFilter("group-filter-periodes", { silent : true });
                    self.resetGroupFilter("group-filter-dates", { silent : true });
                    self.resetGroupFilter("group-filter-render", { silent : true });
                }
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

        if (this.isResetEventPropagation) {
            return;
        }

        var selectedValue = parseInt(e.target.value, 10);
        if (e.target.ariaPressed === "false") {
            selectedValue = null;
        }
        var mapboxLayers = this.filterPeriodeToMapboxLayer(selectedValue);

        var self = this;
        this.applyFilters(mapboxLayers)
            .then((mapboxLayers) => {
                if (!self.options.buttonsWindow.filters.exclusive) {
                    // dans le cas où les filtres ne sont pas exclusifs, 
                    // on garde les autres filtres appliqués (ex. période, dates, rendu)
                    var style = self.layerPanoramax.get("mapbox-style");
                    style.layers = mapboxLayers;
                    self.layerPanoramax.set("mapbox-style", style);
                    logger.debug("Panoramax mapbox-style updated");
                }
                self.dispatchEvent({
                    type : self.FILTER_PERIODE_PANORAMAX_EVENT,
                    data : {
                        value : selectedValue,
                        mapboxLayers : mapboxLayers
                    }
                });
            })
            .then(() => {
                // reset des autres filtres
                if (self.options.buttonsWindow.filters.exclusive) {
                    self.resetGroupFilter("group-filter-types", { silent : true });
                    self.resetGroupFilter("group-filter-render", { silent : true });
                }
                self.resetGroupFilter("group-filter-dates", { silent : true });
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

        if (this.isResetEventPropagation) {
            return;
        }

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

        var self = this;
        this.applyFilters(mapboxLayers)
            .then((mapboxLayers) => {
                if (!self.options.buttonsWindow.filters.exclusive) {
                    // dans le cas où les filtres ne sont pas exclusifs, 
                    // on garde les autres filtres appliqués (ex. période, dates, rendu)
                    var style = self.layerPanoramax.get("mapbox-style");
                    style.layers = mapboxLayers;
                    self.layerPanoramax.set("mapbox-style", style);
                }
                self.dispatchEvent({
                    type : self.FILTER_DATES_PANORAMAX_EVENT,
                    data : {
                        startDate : startValue,
                        endDate : endValue,
                        mapboxLayers : mapboxLayers
                    }
                });
            })
            .then(() => {
                // reset des autres filtres
                if (self.options.buttonsWindow.filters.exclusive) {
                    self.resetGroupFilter("group-filter-types", { silent : true });
                    self.resetGroupFilter("group-filter-render", { silent : true });
                }
                self.resetGroupFilter("group-filter-periodes", { silent : true });
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
        this.options.background.active = !this.options.background.active;
        if (this.options.background.active) {
            this.setBackground(this.options.background)
                .then(() => { logger.log("background layer loaded !"); })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            this.resetBackground();
        }
    }
 
    /**
     * Gère le clic d'activation/désactivation de l'affichage des couches dans le gestionnaire de couches.
     *
     * @param {Event} e - Événement DOM du bouton de gestion des couches.
     * @private
     */
    onToggleChoiceDisplayLayerPanoramaxClick (e) {
        logger.debug(e);
        this.displayable = !this.displayable;

        if (this.groupPanoramax) {
            this.groupPanoramax.set("display", this.displayable);
        }
        if (this.layerPanoramax) {
            this.layerPanoramax.set("display", this.displayable);
        }
        if (this.backgroundPanoramax) {
            this.backgroundPanoramax.set("display", this.displayable);
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

    /**
     * Gère le clic de retour sur la carte avec fermeture du panneau Panoramax.
     *
     * @param {Event} e - Événement DOM du bouton de retour.
     * @private
     */
    onClickPnxViewerWidgetBack (e) {
        this.onReturnPanoramaxClick(e);
    }

    /**
     * Gère le clic de fermeture du panneau Panoramax.
     *
     * @param {Event} e - Événement DOM du bouton de fermeture.
     * @private
     */
    onClickPnxViewerWidgetClose (e) {
        this.onClosePanoramaxClick(e);
    }

    /**
     * Gère le clic de mise en plein écran du panneau Panoramax.
     *
     * @param {Event} e - Événement DOM du bouton de plein écran.
     * @private
     */
    onClickPnxViewerWidgetFullScreen (e) {
        var container = this.panelPanoramaxViewerContainer;
        if (!container) {
            return;
        }
        if (container._pnxFullscreen) {
            this.setSizeWindow("fullscreen-map");
        } else {
            this.setSizeWindow("fullscreen");
        }
        this.dispatchEvent({
            type : this.FULLSCREEN_PANORAMAX_EVENT,
            data : {
                fullscreen : container._pnxFullscreen,
            },
        });
    }

    /**
     * Gère le clic du bouton de zoom personnalisé du panneau Panoramax.
     *
     * @param {Event} e - Événement DOM du bouton de zoom.
     * @private
     */
    onClickPnxViewerWidgetZoom (e) {
        // TODO : implémenter le comportement du bouton de zoom personnalisé
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
