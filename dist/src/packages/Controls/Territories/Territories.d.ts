export default Territories;
export type TerritoriesOptions = {
    /**
     * - Définit si le widget est replié au chargement.
     */
    collapsed?: boolean | undefined;
    /**
     * - Permet de déplacer le panneau du widget.
     */
    draggable?: boolean | undefined;
    /**
     * - Affiche un en-tête (header) dans le panneau.
     */
    panel?: boolean | undefined;
    /**
     * - Charge automatiquement la liste par défaut des territoires.
     */
    auto?: boolean | undefined;
    /**
     * - Affiche une imagette pour chaque territoire.
     */
    thumbnail?: boolean | undefined;
    /**
     * - Affiche les tuiles en mode réduit (nom uniquement).
     */
    reduce?: boolean | undefined;
    /**
     * - Nombre de tuiles affichées (0 = toutes).
     */
    tiles?: number | undefined;
    /**
     * - Liste personnalisée des territoires à afficher.
     */
    territories?: Territory[] | undefined;
    /**
     * - Options pour l’import de configuration.
     */
    upload?: {
        /**
         * - Active le menu d’import de fichier.
         */
        active?: boolean | undefined;
        /**
         * - Titre du menu d’import.
         */
        title?: string | undefined;
        /**
         * - Description du menu d’import.
         */
        description?: string | undefined;
    } | undefined;
    /**
     * - Options pour la configuration des vues.
     */
    view?: {
        /**
         * - Active le menu de gestion des vues.
         */
        active?: boolean | undefined;
        /**
         * - Titre du menu de gestion des vues.
         */
        title?: string | undefined;
        /**
         * - Description du menu de gestion des vues.
         */
        description?: string | undefined;
    } | undefined;
    /**
     * - Titre affiché dans le panneau.
     */
    title?: string | undefined;
    /**
     * - Position CSS du widget sur la carte.
     */
    position?: string | undefined;
    /**
     * - Ajoute ou retire l’espace autour du panneau.
     */
    gutter?: boolean | undefined;
    /**
     * - Identifiant unique du widget.
     */
    id?: string | number | undefined;
};
export type Territory = {
    /**
     * - IdenObjecttifiant unique du territoire (ex: FRA, MTQ, GLP, ...).
     */
    id: string;
    /**
     * - Titre du territoire.
     */
    title: string;
    /**
     * - Description du territoire.
     */
    description: string;
    /**
     * - Bbox du territoire au format [minx, miny, maxx, maxy] en EPSG:4326.
     */
    bbox: Array<number>;
    /**
     * - Point central du territoire au format [lon, lat] en EPSG:4326.
     */
    point?: number[] | undefined;
    /**
     * - Niveau de zoom à appliquer lors de la sélection du territoire.
     */
    zoom?: number | undefined;
    /**
     * - URL ou data URI de la vignette du territoire (format image tel que PNG, JPEG, SVG).
     */
    thumbnail?: string | undefined;
    /**
     * - URL, data URI ou classe CSS DSFR de l’icône du territoire (format vectoriel SVG).
     */
    icon?: string | undefined;
};
/**
 * @typedef {Object} TerritoriesOptions
 * @property {boolean} [collapsed=true] - Définit si le widget est replié au chargement.
 * @property {boolean} [draggable=false] - Permet de déplacer le panneau du widget.
 * @property {boolean} [panel=true] - Affiche un en-tête (header) dans le panneau.
 * @property {boolean} [auto=false] - Charge automatiquement la liste par défaut des territoires.
 * @property {boolean} [thumbnail=false] - Affiche une imagette pour chaque territoire.
 * @property {boolean} [reduce=false] - Affiche les tuiles en mode réduit (nom uniquement).
 * @property {number} [tiles=3] - Nombre de tuiles affichées (0 = toutes).
 * @property {Array<Territory>} [territories=[]] - Liste personnalisée des territoires à afficher.
 * @property {Object} [upload] - Options pour l’import de configuration.
 * @property {boolean} [upload.active=false] - Active le menu d’import de fichier.
 * @property {string} [upload.title="Ajouter un fichier de configuration"] - Titre du menu d’import.
 * @property {string} [upload.description=""] - Description du menu d’import.
 * @property {Object} [view] - Options pour la configuration des vues.
 * @property {boolean} [view.active=false] - Active le menu de gestion des vues.
 * @property {string} [view.title="Modifier les territoires"] - Titre du menu de gestion des vues.
 * @property {string} [view.description=""] - Description du menu de gestion des vues.
 * @property {string} [title="Sélectionner un territoire"] - Titre affiché dans le panneau.
 * @property {string} [position] - Position CSS du widget sur la carte.
 * @property {boolean} [gutter] - Ajoute ou retire l’espace autour du panneau.
 * @property {string|number} [id] - Identifiant unique du widget.
 */
/**
 * @typedef {Object} Territory
 * @property {string} id - IdenObjecttifiant unique du territoire (ex: FRA, MTQ, GLP, ...).
 * @property {string} title - Titre du territoire.
 * @property {string} description - Description du territoire.
 * @property {Array<number>} bbox - Bbox du territoire au format [minx, miny, maxx, maxy] en EPSG:4326.
 * @property {Array<number>} [point] - Point central du territoire au format [lon, lat] en EPSG:4326.
 * @property {number} [zoom] - Niveau de zoom à appliquer lors de la sélection du territoire.
 * @property {string} [thumbnail] - URL ou data URI de la vignette du territoire (format image tel que PNG, JPEG, SVG).
 * @property {string} [icon] - URL, data URI ou classe CSS DSFR de l’icône du territoire (format vectoriel SVG).
 */
/**Object
 * @classdesc
 *
 * Territories map widget
 *
 * @alias ol.control.Territories
 * @module Territories
*/
declare class Territories extends Control {
    /**
     * @constructor
     * @param {TerritoriesOptions} options - options for function call.
     *
     * @fires territories:loaded
     * @fires territories:change
     * @fires territories:add
     * @fires territories:remove
     * @public
     * @example
     * var territories = new ol.control.Territories({
     *   collapsed: true,
     *   panel: true,
     *   auto: true
     * });
     * map.addControl(territories);
     *
     * or/and
     *
     * var territories = new ol.control.Territories({});
     * territories.setTerritory({id: "MTQ", title: "Martinique", description: "", bbox: [], thumbnail: "data:image/png;base64,..."});
     * territories.setTerritory({id: "GLP", title: "Guadeloupe", description: "", bbox: [], thumbnail: "http://..."});
     * map.addControl(territories);
     * territories.on("territories:loaded", (e) => { console.log(e.data); });
     * territories.on("territories:add", (e) => { console.log(e); });
     * territories.on("territories:remove", (e) => { console.log(e); });
     */
    constructor(options: TerritoriesOptions);
    /**
     * Nom de la classe (heritage)
     * @private
     */
    private CLASSNAME;
    container: HTMLElement;
    /**
     * Overwrite OpenLayers setMap method
     *
     * @param {Map} map - Map.
     */
    setMap(map: Map): void;
    /**
     * Add a territory
     *
     * @param {Territory} territory  - territory
     * @param {Boolean} [isAdded=false] - specify if territory is added manually with "Add view" button
     * @returns {Boolean} - true|false
     * @public
     * @example
     * territories.setTerritory ({
     *  id: "MTQ",
     *  title: "Martinique",
     *  description: "",
     *  bbox: [minx, miny, maxx, maxy],
     *  thumbnail: "data:image/png;base64,..."
     * });
     */
    public setTerritory(territory: Territory, isAdded?: boolean): boolean;
    /**
     * Load a new configuration
     *
     * @param {Array<Territory>} territories - file config
     */
    setTerritories(territories: Array<Territory>): void;
    /**
     * Remove a territory
     *
     * @param {String} territory - territory id (FRA, MTQ, ...)
     * @param {Boolean} [force=false] - force removal even if territory was added manually
     * @returns {Boolean} - true|false
     * @public
     * @example
     * territories.removeTerritory("MTQ"); // id du territoire
     */
    public removeTerritory(territory: string, force?: boolean): boolean;
    /**
     * Remove all territories
     */
    removeTerritories(): void;
    territories: any[] | undefined;
    /**
     * Set collapse
     *
     * @param {Boolean} collapsed - true|false
     * @todo ...
     * @public
     */
    public setCollapse(collapsed: boolean): void;
    collapsed: boolean | undefined;
    /**
     * Mode reduit des tuiles (uniquement le nom du territoire)
     *
     * @param {*} reduce - true|false
     * @public
     */
    public setReduce(reduce: any): void;
    /**
     * Get container
     *
     * @returns {HTMLElement} container
     */
    getContainer(): HTMLElement;
    /**
     * Initialize Territories control (called by Territories constructor)
     *
     * @param {Object} options - constructor options
     * @private
     */
    private initialize;
    uid: any;
    options: {
        collapsed: boolean;
        draggable: boolean;
        panel: boolean;
        upload: {
            active: boolean;
            title: string;
            description: string;
        };
        view: {
            active: boolean;
            title: string;
            description: string;
        };
        title: string;
        auto: boolean;
        thumbnail: boolean;
        reduce: boolean;
        tiles: number;
        territories: never[];
    } | undefined;
    /**
     * @type {Boolean}
     * specify if control is draggable (true) or not (false)
     * */
    draggable: boolean | undefined;
    /**
     * specify if we load the list of territories by default
     * @type {Boolean} */
    auto: boolean | undefined;
    /**
     * @type {Object}
     * upload configuration */
    uploadConfig: any;
    /**
     * @type {Boolean}
     * specify if a list of object territories must be appended or replaced */
    append: boolean | undefined;
    /** @private */
    private buttonTerritoriesShow;
    /** @private */
    private panelTerritoriesContainer;
    /** @private */
    private panelTerritoriesHeaderContainer;
    /** @private */
    private buttonTerritoriesClose;
    /** @private */
    private containerTerritoriesOptions;
    /** @private */
    private panelTerritoriesEntriesContainer;
    /**
     * Create control main container (DOM initialize)
     *
     * @returns {HTMLElement} DOM element
     * @private
     */
    private initContainer;
    /**
     * Close panel option
     * @private
     */
    private closePanelUpLoad;
    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    private onShowTerritoriesClick;
    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    private onCloseTerritoriesClick;
    /**
     * ...
     * @param {Event} e - ...
     * @param {*} id - ...
     * @private
     */
    private onImageTerritoriesClick;
    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    private onUploadFileClick;
    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    private onUploadToggleClick;
    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    private onApplyTerritoriesClick;
    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    private onShowTerritoriesViewsClick;
    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    private onCloseTerritoriesViewsClick;
    /**
     * ...
     * @param {Event} e - ...
     * @param {String} viewName - ...
     * @private
     */
    private onAddTerritoriesViewClick;
    /**
     * ...
     * @param {Event} e - ...
     * @private
     */
    private onResetTerritoriesViewClick;
    /**
     * ...
     * @param {Event} e - ...
     * @param {*} id - ...
     * @private
     */
    private onViewTerritoryClick;
    /**
     * ...
     * @param {Event} e - ...
     * @param {*} id - ...
     * @private
     */
    private onViewTerritoryRemoveClick;
}
import Control from "../Control";
import Map from "ol/Map";
//# sourceMappingURL=Territories.d.ts.map