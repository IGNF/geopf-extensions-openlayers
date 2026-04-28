export default Panoramax;
export type PanoramaxOptions = {
    /**
     * - Définit si le widget est replié au chargement.
     */
    collapsed?: boolean | undefined;
    /**
     * - Permet de déplacer le panneau du catalogue.
     */
    draggable?: boolean | undefined;
    /**
     * - Active l’ajout automatique des événements sur la carte.
     */
    auto?: boolean | undefined;
    /**
     * - Active l’interaction au survol (pointermove) sur la couche Panoramax.
     */
    hover?: boolean | undefined;
    /**
     * - Affiche un en-tête (header) dans le panneau.
     */
    panel?: boolean | undefined;
    /**
     * - Identifiant unique du widget.
     */
    id?: string | undefined;
    /**
     * - Position CSS du widget sur la carte.
     */
    position?: string | undefined;
    /**
     * - Ajoute ou retire l’espace autour du panneau.
     */
    gutter?: boolean | undefined;
    /**
     * - Options de configuration de la couche de données.
     */
    layer?: {
        /**
         * - URL du style de la couche à charger.
         */
        url?: string | undefined;
        /**
         * - Nom de la couche à afficher dans le gestionnaire de couches.
         */
        name?: string | undefined;
        /**
         * - Zoom minimum pour afficher la couche.
         */
        minZoom?: number | undefined;
        /**
         * - Zoom maximum pour afficher la couche.
         */
        maxZoom?: number | undefined;
    } | undefined;
    /**
     * - Options de configuration de la couche de fond.
     */
    background?: {
        /**
         * - Affiche ou masque la couche de fond.
         */
        active?: boolean | undefined;
        /**
         * - URL du style de la couche de fond à charger.
         */
        url?: string | undefined;
        /**
         * - Nom de la couche de fond à afficher dans le gestionnaire de couches.
         */
        name?: string | undefined;
        /**
         * - Zoom minimum pour afficher la couche de fond.
         */
        minZoom?: number | undefined;
        /**
         * - Zoom maximum pour afficher la couche de fond.
         */
        maxZoom?: number | undefined;
    } | undefined;
    /**
     * - Options de configuration des boutons.
     */
    buttonsWindow?: {
        /**
         * - Affiche ou masque les boutons.
         */
        display?: boolean | undefined;
        /**
         * - **Experimental** -Cible DOM où injecter le panneau des boutons.
         */
        target?: string | HTMLElement | null | undefined;
        /**
         * - Options de configuration des filtres.
         */
        filters?: {
            /**
             * - Affiche ou masque les filtres.
             */
            display?: boolean | undefined;
            /**
             * - Libellé du bouton de filtrage.
             */
            label?: string | undefined;
            /**
             * - Options de configuration du contenu des filtres.
             */
            content?: {
                /**
                 * - Types d'images à filtrer (Tout, classique, 360).
                 */
                types?: any[] | undefined;
                /**
                 * - Plages de dates à filtrer.
                 */
                dates?: any[] | undefined;
            } | undefined;
        } | undefined;
        /**
         * - Options de configuration du bouton de survol.
         */
        hover?: {
            /**
             * - Affiche ou masque le bouton de survol.
             */
            display?: boolean | undefined;
            /**
             * - Libellé du bouton de survol.
             */
            label?: string | undefined;
            /**
             * - Description du bouton de survol.
             */
            description?: string | undefined;
        } | undefined;
        /**
         * - Options de configuration des contributions.
         */
        contributions?: {
            /**
             * - Affiche ou masque les contributions.
             */
            display?: boolean | undefined;
            /**
             * - Libellé du bouton de contribution.
             */
            label?: string | undefined;
            /**
             * - Lien vers la page de contribution.
             */
            link?: string | undefined;
        } | undefined;
        /**
         * - Options de configuration du bouton de styles.
         */
        styles?: {
            /**
             * - Affiche ou masque le bouton de styles.
             */
            display?: boolean | undefined;
            /**
             * - Libellé du bouton de styles.
             */
            label?: string | undefined;
            /**
             * - Description du bouton de styles.
             */
            description?: string | undefined;
            /**
             * - Options de configuration du contenu des styles.
             */
            content?: any;
        } | undefined;
        /**
         * - Options de configuration du bouton de fond.
         */
        background?: {
            /**
             * - Affiche ou masque le bouton de fond de carte.
             */
            display?: boolean | undefined;
            /**
             * - Libellé du bouton de fond de carte.
             */
            label?: string | undefined;
            /**
             * - Description du bouton de fond de carte.
             */
            description?: string | undefined;
        } | undefined;
    } | undefined;
    /**
     * - Options de configuration de la fenêtre de visualisation.
     */
    visualizationWindow?: {
        /**
         * - Affiche ou masque la fenêtre de visualisation.
         */
        display?: boolean | undefined;
        /**
         * - **Experimental** - Cible DOM où injecter le panneau de visualisation.
         */
        target?: string | HTMLElement | null | undefined;
        /**
         * - Taille de la fenêtre de visualisation ("small", "medium", "large", "fullscreen", "fullscreen-map").
         */
        size?: string | undefined;
    } | undefined;
};
export type PanoramaxPreviewFeature = {
    /**
     * - Coordonnées de l'entité en projection carte.
     */
    coordinates: Array<number>;
    /**
     * - Propriétés de l'entité survolée.
     */
    properties: PanoramaxPreviewGridLayer | PanoramaxPreviewSequencesLayer | PanoramaxPreviewPicturesLayer;
    /**
     * - Type de couche ("grid", "sequences" ou "pictures").
     */
    layer: string;
};
/**
 * - Couche de grille (agrégats de points).
 */
export type PanoramaxPreviewGridLayer = {
    /**
     * - Identifiant de la grille.
     */
    id: string;
    /**
     * - Nombre total d'images dans la grille.
     */
    nb_pictures: number;
    /**
     * - Nombre d'images 360 dans la grille.
     */
    nb_360_pictures: number;
    /**
     * - Nombre d'images classiques dans la grille.
     */
    nb_flat_pictures: number;
    /**
     * - Coefficient de densité d'images dans la grille.
     */
    coef: number;
    /**
     * - Coefficient de densité d'images 360 dans la grille.
     */
    coef_360_pictures: number;
    /**
     * - Coefficient de densité d'images classiques dans la grille.
     */
    coef_flat_pictures: number;
};
/**
 * - Couche de séquences (groupes d'images).
 */
export type PanoramaxPreviewSequencesLayer = {
    /**
     * - Identifiant de la séquence.
     */
    id: string;
    /**
     * - Identifiant du compte utilisateur ayant contribué la séquence.
     */
    account_id: string;
    /**
     * - Modèle de la séquence (ex. "equirectangular" ou "flat").
     */
    model: string;
    /**
     * - Type de la séquence (ex. "360" ou "classic").
     */
    type: string;
    /**
     * - Date de contribution de la séquence.
     */
    date: string;
    /**
     * - Précision GPS de la séquence (en mètres).
     */
    gps_accuracy: number;
    /**
     * - Densité de pixels horizontale de la séquence (en pixels/mètre).
     */
    h_pixel_density: number;
};
/**
 * - Couche d'images individuelles.
 */
export type PanoramaxPreviewPicturesLayer = {
    /**
     * - Identifiant de l'image.
     */
    id: string;
    /**
     * - Identifiant du compte utilisateur ayant contribué l'image.
     */
    account_id: string;
    /**
     * - Timestamp de prise de vue de l'image.
     */
    ts: string;
    /**
     * - Cap de prise de vue de l'image (en degrés).
     */
    heading: number;
    /**
     * - Identifiant de la séquence à laquelle appartient l'image.
     */
    sequences: string;
    /**
     * - Type de l'image (ex. "360" ou "classic").
     */
    type: string;
    /**
     * - Modèle de l'image (ex. "equirectangular" ou "flat").
     */
    model: string;
    /**
     * - Précision GPS de l'image (en mètres).
     */
    gps_accuracy: number;
    /**
     * - Densité de pixels horizontale de l'image (en pixels/mètre).
     */
    h_pixel_density: number;
    /**
     * - Identifiant de la première séquence à laquelle appartient l'image.
     */
    first_sequence: string;
};
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
 * @property {Object} [buttonsWindow.filters.content] - Options de configuration du contenu des filtres.
 * @property {Array} [buttonsWindow.filters.content.types] - Types d'images à filtrer (Tout, classique, 360).
 * @property {Array} [buttonsWindow.filters.content.dates] - Plages de dates à filtrer.
 * @property {Object} [buttonsWindow.hover] - Options de configuration du bouton de survol.
 * @property {Boolean} [buttonsWindow.hover.display] - Affiche ou masque le bouton de survol.
 * @property {String} [buttonsWindow.hover.label] - Libellé du bouton de survol.
 * @property {String} [buttonsWindow.hover.description] - Description du bouton de survol.
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
declare class Panoramax extends Control {
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
     *     psv-options: {}
     * }}});
     * map.addControl(panoramax);
     */
    constructor(options?: PanoramaxOptions);
    container: HTMLElement;
    /**
     * Surcharge la méthode `setMap` d'OpenLayers.
     *
     * @param {Map|null} map - Carte cible, ou `null` lors du détachement.
     * @public
     */
    public setMap(map: Map<any, any> | null): void;
    /**
     * Get container
     *
     * @returns {HTMLElement} container
     * @public
     */
    public getContainer(): HTMLElement;
    /**
     * Indique si le widget est replié.
     *
     * @returns {Boolean} `true` si le widget est replié, `false` sinon.
     * @public
     */
    public getCollapsed(): boolean;
    /**
     * Replie ou déplie le conteneur principal du widget.
     *
     * @param {Boolean} collapsed - `true` pour replier, `false` pour afficher.
     * @public
     */
    public setCollapsed(collapsed: boolean): void;
    collapsed: boolean | undefined;
    /**
     * Initialise le contrôle Panoramax (appelé par le constructeur).
     *
     * @param {PanoramaxOptions} options - constructor options
     * @private
     */
    private initialize;
    /** @private */
    private uid;
    options: {
        collapsed: boolean;
        draggable: boolean;
        panel: boolean;
        auto: boolean;
        hover: boolean;
        gutter: boolean;
        position: string;
        group: boolean;
        layer: {
            url: string;
            source: string;
            name: string;
            minZoom: number;
            maxZoom: number;
        };
        background: {
            active: boolean;
            url: string;
            name: string;
            minZoom: number;
            maxZoom: number;
        };
        buttonsWindow: {
            display: boolean;
            target: null;
            position: string;
            order: string[];
            filters: {
                display: boolean;
                label: string;
                description: string;
                content: {
                    dates: boolean;
                    types: boolean;
                    periodes: boolean;
                };
            };
            hover: {
                display: boolean;
                label: string;
                description: string;
            };
            contributions: {
                display: boolean;
                label: string;
                description: string;
                link: string;
            };
            styles: {
                display: boolean;
                label: string;
                description: string;
                content: string[];
            };
            background: {
                display: boolean;
                label: string;
                description: string;
            };
        };
        visualizationWindow: {
            display: boolean;
            target: null;
            position: string;
            size: string;
        };
        viewer: {
            endpoint: string;
            widgets: string[];
            pnxOptions: {
                class: string;
                widgets: boolean;
                "psv-options": {};
            };
        };
    } | undefined;
    /**
     * @type {Boolean}
     * Indique si le contrôle est déplaçable (`true`) ou non (`false`).
     */
    draggable: boolean | undefined;
    /**
     * @type {Boolean}
     * Indique si le contrôle active automatiquement ses comportements.
     */
    auto: boolean | undefined;
    /**
     * @type {Boolean}
     * Indique si l'interaction au survol est activée.
     */
    hover: boolean | undefined;
    /** @private */
    private buttonPanoramaxShow;
    /** @private */
    private panelPanoramaxViewerContainer;
    /** @private */
    private panelPanoramaxButtonsContainer;
    /** @private */
    private panelPanoramaxButtonsHeaderContainer;
    /** @private */
    private btnPanoramaxOptions;
    /** @private */
    private panelPanoramaxOptions;
    /** @private */
    private _onPanoramaxOptionsReposition;
    /** @private */
    private panelPanoramaxFilters;
    /** @private */
    private btnPanoramaxResetFilters;
    /** @private */
    private btnPanoramaxContributions;
    /** @private */
    private btnPanoramaxHover;
    /** @private */
    private btnPanoramaxStyles;
    /** @private */
    private btnPanoramaxBackground;
    /**
     * @type {Boolean}
     * Indique si les interactions de la carte sont actives.
     */
    eventActived: boolean | undefined;
    /**
     * @type {Object<String, Function>}
     * Référence des gestionnaires d'événements enregistrés sur la carte.
     */
    eventsListeners: any;
    /**
     * Types de couches Panoramax disponibles dans le TMS vecteur
     * (https://api.panoramax.xyz/api/map/style.json).
     */
    PANORAMAX_LAYERS_TYPES: string[] | undefined;
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
    OPENED_PANORAMAX_EVENT: string | undefined;
    /**
     * Événement déclenché à l'initialisation du panneau des filtres.
     * @event pnx:filter:init
     * @defaultValue "pnx:filter:init"
     * @group Events
     */
    FILTER_INIT_PANORAMAX_EVENT: string | undefined;
    /**
     * Nom du callback déclenché lors d'un clic sur la couche Panoramax active.
     * @event pnx:data:clicked
     * @defaultValue "pnx:data:clicked"
     * @group Callbacks
     * @description
     * Ce callback est utilisé pour récupérer la première entité touchée
     * au clic (coordonnées et propriétés) sur la couche Panoramax.
     */
    CLICKED_DATA_PANORAMAX_CB: string | undefined;
    /**
     * Nom du callback déclenché lors du survol de la couche Panoramax active.
     * @event pnx:data:hovered
     * @defaultValue "pnx:data:hovered"
     * @group Callbacks
     * @description
     * Ce callback est utilisé pour récupérer la première entité touchée
     * au survol (coordonnées et propriétés) sur la couche Panoramax.
     */
    HOVERED_DATA_PANORAMAX_CB: string | undefined;
    /**
     * Nom de l'événement déclenché quand une plage de dates est saisie.
     * @event pnx:filter:dates
     * @defaultValue "pnx:filter:dates"
     * @group Events
     */
    FILTER_DATES_PANORAMAX_EVENT: string | undefined;
    /**
     * Nom de l'événement déclenché quand une période prédéfinie est sélectionnée.
     * @event pnx:filter:periode
     * @defaultValue "pnx:filter:periode"
     * @group Events
     */
    FILTER_PERIODE_PANORAMAX_EVENT: string | undefined;
    /**
     * Nom de l'événement déclenché quand un type d'image est sélectionné.
     * @event pnx:filter:type
     * @defaultValue "pnx:filter:type"
     * @group Events
     */
    FILTER_TYPE_PANORAMAX_EVENT: string | undefined;
    /**
     * Nom de l'événement déclenché quand les filtres sont appliqués.
     * @event pnx:filter:render
     * @defaultValue "pnx:filter:render"
     * @group Events
     */
    FILTER_RENDER_PANORAMAX_EVENT: string | undefined;
    /**
     * photo viewer
     * @private
     */
    private photoViewerPanoramax;
    /**
     * @type {MapboxVectorLayer}
     * @private
     */
    private layerPanoramax;
    /**
     * @type {MapboxVectorLayer}
     * @private
     */
    private backgroundPanoramax;
    /**
     * @type {MapboxLayerGroup}
     * @private
     */
    private groupPanoramax;
    /**
     * original style layer
     * @type {JSON}
     * @private
     */
    private originalStyleLayerPanoramax;
    /**
     * preview marker overlay
     * @private
     */
    private previewMarkerOverlay;
    /**
     * preview popup overlay
     * @private
     */
    private previewPopupOverlay;
    /**
     * preview popup element
     * @private
     */
    private previewPopupElement;
    /**
     * feature sélectionnée lors du survol (utilisée au click)
     * @private
     */
    private selectedFeature;
    /**
     * map viewport sync listener
     * @private
     */
    private mapViewportSyncListener;
    /**
     * Construit le conteneur principal du contrôle (initialisation DOM).
     *
     * @returns {HTMLElement} DOM element
     * @private
     */
    private initContainer;
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
    private resolveTargetElement;
    onPointerMoveDebounced(handler: any): (...args: any[]) => void;
    /**
     * Ajoute les écouteurs d'événements sur la carte (appelé par `setMap`).
     *
     * @param {Map} map - Instance de carte.
     * @private
     */
    private addEventsListeners;
    /**
     * Supprime les écouteurs d'événements de la carte (appelé par `setMap`).
     * @private
     */
    private removeEventsListeners;
    preventPointerMoveOnMap(elem: any): void;
    allowPointerMoveOnMap(elem: any): void;
    stopImmediatePropagation(e: any): void;
    /**
     * Réinitialise le contenu du panneau à la fermeture.
     */
    reset(): void;
    /** @private */
    private resetGroupLayer;
    /** @private */
    private resetLayer;
    /** @private */
    private resetBackground;
    /** @private */
    private resetButtons;
    /** @private */
    private resetPhotoViewer;
    /** @private */
    private resetVisualizationWindow;
    /** @private */
    private resetPreview;
    /**
     * Charge les éléments du panneau à l'ouverture.
     */
    load(): Promise<void>;
    /**
     * Attends que la couche Mapbox Vector soit prête
     * (source chargée et style appliqué) avant de continuer.
     * @param {MapboxVectorLayer} layer - Couche Mapbox Vector à vérifier.
     * @returns {Promise<MapboxVectorLayer>} Promise résolue avec la couche prête, ou rejetée en cas d'erreur.
     * @private
     */
    private waitForMapboxVectorLayerReady;
    /**
     * Récupère le style JSON de la couche Mapbox Vector et le met en cache dans la couche.
     * @param {MapboxVectorLayer} layer - Couche Mapbox Vector dont on veut récupérer le style JSON.
     * @returns {Promise<Object|null>} Promise résolue avec le style JSON de la couche, ou `null` en cas d'erreur ou si la couche n'est pas définie.
     * @private
     */
    private getStyleJsonFromMapboxVectorLayer;
    /** @private */
    private setLayerGroup;
    /** @private */
    private setLayer;
    /** @private */
    private setBackground;
    /** @private */
    private initButtons;
    /** @private */
    private initVisualizationWindow;
    /** @private */
    private initPhotoViewer;
    /** @private */
    private showButtonsPanel;
    /** @private */
    private hideButtonsPanel;
    /**
     * Crée et configure le viewer de photos de Panoramax,
     * en ajoutant les widgets spécifiés dans les options.
     * @returns {HTMLElement|null} Élément du viewer de photos créé, ou `null` si le conteneur n'est pas disponible.
     */
    createPhotoViewer(): HTMLElement | null;
    /**
     * Affiche le viewer de photos de Panoramax avec l'image
     * spécifiée par les identifiants de séquence et de photo.
     * @param {String} sequenceId - Identifiant de la séquence.
     * @param {String} pictureId - Identifiant de la photo.
     */
    displayPhotoViewer(sequenceId: string, pictureId: string): void;
    /** @private */
    private showPhotoViewer;
    /** @private */
    private hidePhotoViewer;
    /**
     * Ajoute un widget personnalisé au viewer de photos de Panoramax.
     * @param {HTMLElement} widget - Élément du widget à ajouter.
     * @param {HTMLElement} container - Conteneur dans lequel ajouter le widget (le viewer de photos).
     */
    addWidget(widget: HTMLElement, container: HTMLElement): void;
    /**
     * Crée un bouton de retour personnalisé pour le viewer de photos de Panoramax.
     * @returns {HTMLElement} Élément du bouton de retour.
     */
    createWidgetBtnBack(): HTMLElement;
    /**
     * Crée un bouton de fermeture personnalisé pour le viewer de photos de Panoramax.
     * @returns {HTMLElement} Élément du bouton de fermeture.
     */
    createWidgetBtnClose(): HTMLElement;
    /**
     * Crée un bouton de zoom personnalisé pour le viewer de photos de Panoramax.
     * @returns {HTMLElement} Élément du bouton de zoom.
     */
    createWidgetBtnZoom(): HTMLElement;
    /**
     * Crée un bouton de plein écran personnalisé pour le viewer de photos de Panoramax.
     * @returns {HTMLElement} Élément du bouton de plein écran.
     */
    createWidgetBtnFullScreen(): HTMLElement;
    /**
     * Crée un composant de légende des photos personnalisé pour le viewer
     * de photos de Panoramax.
     * @returns {HTMLElement} Élément du composant de légende des photos.
     */
    createWidgetCmpPictureLegend(): HTMLElement;
    /**
     * Crée un composant de minimap personnalisé pour le viewer de photos de Panoramax.
     * @returns {HTMLElement} Élément du composant de minimap.
     */
    createWidgetCmpMinimap(): HTMLElement;
    /**
     * Supprime le positionnement du widget "Annotations switch" du viewer
     * de photos de Panoramax
     */
    removeWidgetAnnotationsSwitch(): void;
    /**
     * Supprime le widget "Picture legend" du viewer de photos de Panoramax
     * On supprime le mode drawer pour le widget de légende des photos
     */
    removeWidgetPictureLegendDrawer(): void;
    /**
     * Supprime le widget de player de séquence du viewer de photos de Panoramax
     */
    removeWidgetPlayer(): void;
    /**
      Affiche ou met à jour le marqueur de prévisualisation.
     *
     * @param {Array<Number>} coordinates - Coordonnées `[x, y]` en projection carte.
     */
    setMarker(coordinates: Array<number>): void;
    /**
     * Affiche ou met à jour la popup de prévisualisation.
     *
     * @param {Array<Number>} coordinates - Coordonnées `[x, y]` en projection carte.
     * @param {String} [content=""] - Contenu HTML injecté dans la popup.
     */
    setPopup(coordinates: Array<number>, content?: string): void;
    /**
     * Affiche la prévisualisation selon le type de couche Panoramax.
     *
     * @param {ol.Feature} feature - Entité à prévisualiser.
     */
    displayPreview(feature: ol.Feature): void;
    /**
     * Transforme une feature OL en PanoramaxPreviewFeature
     * @param {ol.Feature} feature - Feature OL
     * @returns {PanoramaxPreviewFeature} Feature Panoramax pour prévisualisation
     * @private
     */
    private _transformToPanoramaxFeature;
    /**
     * Échappe une valeur pour un affichage HTML sûr.
     *
     * @param {*} value - Valeur à échapper.
     * @returns {String} Valeur échappée.
     * @private
     */
    private _escape;
    /**
     * Affiche la prévisualisation d'une entité de type `grid`.
     *
     * @param {Array<Number>} coordinates - Coordonnées du point survolé.
     * @param {PanoramaxPreviewGridLayer} feature - Propriétés de l'entité survolée.
     * @private
     */
    private displayPreviewGrid;
    /**
     * Affiche la prévisualisation d'une entité de type `sequences`.
     *
     * @param {Array<Number>} coordinates - Coordonnées du point survolé.
     * @param {PanoramaxPreviewSequenceLayer} feature - Propriétés de l'entité survolée.
     * @private
     */
    private displayPreviewSequence;
    /**
     * Affiche la prévisualisation d'une entité de type `pictures`.
     *
     * @param {Array<Number>} coordinates - Coordonnées du point survolé.
     * @param {PanoramaxPreviewPictureLayer} feature - Propriétés de l'entité survolée.
     * @private
     */
    private displayPreviewPicture;
    /**
     * Applique la taille de fenêtre de visualisation spécifiée dans les options,
     * en ajoutant la classe CSS correspondante au container de la fenêtre de visualisation.
     * @param {String} size - Taille de la fenêtre de visualisation : "small", "medium", "large", "fullscreen", ou "fullscreen-map".
     */
    setSizeWindow(size: string): void;
    /**
     * Synchronise la position et la taille de la fenêtre de visualisation
     * avec la carte (mode fullscreen-map)
     *
     * @private
     */
    private startMapViewportSync;
    /**
     * Arrête la synchronisation de la position et la taille
     *
     * @private
     */
    private stopMapViewportSync;
    /**
     * Récupère le style Mapbox de la couche de photos Panoramax.
     * Ex. : pour les types "grid", "sequences", ou "pictures",
     * on retourne le style de la couche correspondante.
     *
     * @param {PanoramaxPreviewLayerType} type - Type de photo sélectionné pour le filtrage.
     * @returns {Object|null} Objet de style Mapbox de la couche de photos, ou `null` si non trouvé.
     * @private
     */
    private getMapboxLayerByType;
    /**
     * Filtre des couches mapbox selon le type de photo sélectionné.
     *
     * @param {String|null} value - Type de photo à filtrer :
     * "flat", "equirectangular", ou `null` pour réinitialiser le filtre.
     * @returns {Array<Object>} Tableau d'objets de style Mapbox.
     * @private
     */
    private filterCameraToMapboxLayer;
    /**
     * Filtre des couches mapbox selon la plage de dates sélectionnée.
     *
     * @param {Date|null} minDate - Date minimale à filtrer.
     * @param {Date|null} maxDate - Date maximale à filtrer.
     * @returns {Array<Object>} Tableau d'objets de style Mapbox.
     * @private
     */
    private filterDateToMapboxLayer;
    /**
     * Filtre des couches mapbox selon une période sélectionnée
     * ex : "last_year = 12", "last_month = 1", etc.
     *
     * @param {Number|null} value - Valeur de la période sélectionnée à filtrer en nombre de mois.
     * @returns {Array<Object>} Tableau d'objets de style Mapbox.
     * @private
     */
    private filterPeriodeToMapboxLayer;
    /**
     * Applique les filtres sélectionnés à la couche Panoramax.
     *
     * @param {String} value - nom du rendu sélectionné.
     * @return {Array<Object>} Tableau d'objets de style Mapbox filtrés selon le rendu sélectionné.
     * @private
     * @todo implémenter les autres types de filtres !
     */
    private filterRenderToMapboxLayer;
    resetAllGroupFilters(): void;
    resetGroupFilter(group: any, options?: {}): void;
    /**
     * Applique les filtres sélectionnés à la couche Panoramax.
     *
     * @param {Array<Object>} mapboxLayers - format Mapbox Style.
     * @returns {Promise} Promise résolue lorsque les filtres sont appliqués.
     */
    applyFilters(mapboxLayers: Array<any>): Promise<any>;
    /**
     * Met à jour la position du panneau de filtres Panoramax
     * pour qu'il soit aligné avec le panneau de boutons d'ouverture du viewer.
     * @private
     */
    private updateFiltersPanelPosition;
    /**
     * Lie les événements de redimensionnement et de défilement
     * pour mettre à jour la position du panneau de filtres Panoramax.
     * @private
     */
    private bindFiltersPanelPositioning;
    /**
     * Délie les événements de redimensionnement et de défilement
     * @private
     */
    private unbindFiltersPanelPositioning;
    /**
     * Gère le clic d'ouverture/fermeture du contrôle Panoramax.
     *
     * @param {Event} e - Événement DOM du bouton d'ouverture.
     * @private
     */
    private onShowPanoramaxClick;
    /**
     * Gère le clic de fermeture du panneau Panoramax.
     *
     * @param {Event} e - Événement DOM du bouton de fermeture.
     * @private
     */
    private onClosePanoramaxClick;
    /**
     * Gère le clic de retour sur la carte avec
     * fermeture du panneau Panoramax.
     *
     * @param {Event} e - Événement DOM du bouton de retour.
     * @private
     */
    private onReturnPanoramaxClick;
    /**
     * Gère le clic d'activation/désactivation du mode de survol dans Panoramax.
     *
     * @param {Event} e - Événement DOM du bouton de survol.
     * @private
     */
    private onToggleChoiceHoverPanoramaxClick;
    /**
     * Gère le clic d'ouverture du menu des options.
     *
     * @param {Event} e - Événement DOM du bouton des options.
     * @private
     */
    private onOpenPanoramaxOptionsClick;
    /**
     * Gère le clic de réinitialisation des filtres Panoramax.
     * @param {Event} e - Événement DOM du bouton de réinitialisation.
     */
    onResetPanoramaxFiltersClick(e: Event): void;
    /**
     * Gère le changement de type d'image dans les filtres Panoramax.
     *
     * @param {Event} e - Événement DOM du sélecteur de type.
     * @param {String} value - Valeur du type d'image sélectionné.
     * @private
     */
    private onChangePanoramaxFilterByType;
    /**
     * Gère le changement de période dans les filtres Panoramax.
     *
     * @param {Event} e - Événement DOM du sélecteur de période.
     * @private
     */
    private onClickPanoramaxFilterByPeriode;
    /**
     * Gère la saisie des dates (début/fin) dans les filtres Panoramax.
     * Déclenche un événement uniquement quand les deux dates sont renseignées.
     *
     * @param {Event} e - Événement DOM des champs date.
     * @private
     */
    private onChangePanoramaxFilterByDates;
    /**
     * Gère le clic d'activation/désactivation de la couche de fond dans Panoramax.
     *
     * @param {Event} e - Événement DOM du bouton de couche de fond.
     * @private
     */
    private onToggleChoiceBackgroundPanoramaxClick;
    /**
     * Gère le changement de mode de rendu dans Panoramax.
     *
     * @param {Event} e - Événement DOM du sélecteur de mode de rendu.
     * @private
     */
    private onSelectPanoramaxRenderClick;
    /**
     * Gère le clic de retour sur la carte avec fermeture du panneau Panoramax.
     *
     * @param {Event} e - Événement DOM du bouton de retour.
     * @private
     */
    private onClickPnxViewerWidgetBack;
    /**
     * Gère le clic de fermeture du panneau Panoramax.
     *
     * @param {Event} e - Événement DOM du bouton de fermeture.
     * @private
     */
    private onClickPnxViewerWidgetClose;
    /**
     * Gère le clic de mise en plein écran du panneau Panoramax.
     *
     * @param {Event} e - Événement DOM du bouton de plein écran.
     * @private
     */
    private onClickPnxViewerWidgetFullScreen;
    /**
     * Gère le clic du bouton de zoom personnalisé du panneau Panoramax.
     *
     * @param {Event} e - Événement DOM du bouton de zoom.
     * @private
     */
    private onClickPnxViewerWidgetZoom;
}
import Control from "../Control";
//# sourceMappingURL=Panoramax.d.ts.map