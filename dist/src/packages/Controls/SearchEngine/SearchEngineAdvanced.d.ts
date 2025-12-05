export default SearchEngineAdvanced;
/**
 * @classdesc
 * Contrôle de recherche avancée permettant de rechercher via d'autres manières.
 * Gère aussi l'ajout des élements sur la carte etc.
 *
 * @extends {Control}
 * @module SearchEngineAdvanced
 */
declare class SearchEngineAdvanced extends Control {
    /**
     * Constructeur du contrôle de recherche avancée.
     * @param {SearchEngineAdvancedOptions} options - Options du constructeur.
     */
    constructor(options: SearchEngineAdvancedOptions);
    geolocation: Geolocation;
    layer: Vector<VectorSource<OlFeature<import("ol/geom").Geometry>>, OlFeature<import("ol/geom").Geometry>>;
    selectInteraction: Select;
    popup: Overlay;
    /**
     * Initialise les options du contrôle.
     * @param {SearchEngineAdvancedOptions} options - Options du constructeur.
     * @private
     */
    private initialize;
    /**
     * Nom de la classe (heritage)
     * @private
    */
    private CLASSNAME;
    /**
     * @type {Array<AbstractAdvancedSearch>}
     */
    _searchForms: Array<AbstractAdvancedSearch>;
    /**
     * Si vrai, écoute les clics sur le document pour gérer
     * la modale de recherche avancée
     * @type {Boolean}
     */
    listenToClick: boolean | undefined;
    /**
     * Retourne la couche utilisée pour afficher les résultats.
     * @returns {Layer} Couche des résultats
     */
    getLayer(): Layer;
    /**
     * Initialise les événements du contrôle (géolocalisation, navigation clavier, recherche).
     * @param {SearchEngineAdvancedOptions} options Options du constructeur.
     * @private
     */
    private _initEvents;
    /**
     * Crée un événement de recherche à partir d'un objet (Feature ou Point).
     * @param {Object|Point|OlFeature} obj Objet à afficher (Feature ou Point)
     * @param {String} [info] Texte affiché dans la popup
     * @returns {Object} Événement normalisé de type "search"
     */
    createEvent(obj: any | Point | OlFeature, info?: string): any;
    /**
     * Initialise le conteneur principal du contrôle et les sous-composants.
     * @param {SearchEngineAdvancedOptions} options Options du constructeur
     * @private
     */
    private _initContainer;
    baseSearchEngine: SearchEngineGeocodeIGN | undefined;
    locationBtn: HTMLButtonElement | undefined;
    advancedBtn: HTMLButtonElement | undefined;
    advancedContainer: HTMLDivElement | undefined;
    eraseBtn: HTMLButtonElement | undefined;
    /**
     * Fonction active si la recherche avancée est active
     * @param {PointerEvent} e Événement de clic sur le document
     */
    _onDocumentClick(e: PointerEvent): void;
    /**
     * Ajoute les résultats (features) sur la carte et ajuste la vue.
     * @param {Object} e Événement de recherche contenant result/extent
     */
    addResultToMap(e: any): void;
    /**
     * Ajoute les infos au popup
     * @param {Feature} [feature] Feature à ajouter. Si non fourni
     * @param {Number[]} [position] Position du popup
     */
    _setPopupInfo(feature?: Feature, position?: number[]): void;
    /**
     * Callback lors de la sélection d'une feature (affiche le popup).
     * @param {SelectEvent} e Événement de sélection
     * @private
     */
    private _onSelectElement;
    /**
     * Crée et retourne l'overlay popup pour afficher les infos de feature.
     * @private
     * @param {PopupButton[]} popupButtons - Bouton à ajouter dans le popup (en plus de la suppression / fermeture).
     * @returns {Overlay} Overlay du popups
     */
    private _createPopup;
    _popupDiv: HTMLDivElement | undefined;
    _popupContent: HTMLDivElement | undefined;
    _popupBtns: HTMLDivElement | undefined;
    /**
     * Définit le contenu HTML du popup.
     * @param {String} content Contenu HTML à afficher
     */
    setPopupContent(content: string): void;
    /**
     * Crée le bouton de fermeture du popup.
     * @returns {HTMLButtonElement} Bouton de fermeture
     * @private
     */
    private _addCloseButton;
    /**
     * Ferme le popup et désélectionne la feature.
     * @returns {Boolean} false
     * @private
     */
    private _closePopup;
    /**
     * Crée le bouton de suppression du marqueur.
     * @returns {HTMLButtonElement} Bouton de suppression
     * @private
     */
    private _addRemoveButton;
    /**
     * Supprime la feature sélectionnée de la couche et ferme le popup.
     * @private
     */
    private _removeFeature;
    /**
     * Crée un bouton personnalisé pour le popup.
     * @param {PopupButton} popupButton - Configuration du bouton.
     * @returns {HTMLButtonElement} Bouton HTML
     */
    _createCustomPopupButton(popupButton: PopupButton): HTMLButtonElement;
    /**
     * Crée le bouton de géolocalisation.
     * @returns {HTMLButtonElement} Bouton de géolocalisation
     * @private
     */
    private _getGeolocButton;
    /**
     * Callback lors d'un résultat de recherche avancée.
     * @param {Object} e Événement de recherche avancée
     * @private
     */
    private onAdvancedSearchResult;
    /**
     * Ferme toutes les accordéons et affiche les sections
     */
    closeAllSections(): void;
}
import Control from "../Control";
import Geolocation from "ol/Geolocation";
import OlFeature from "ol/Feature";
import VectorSource from "ol/source/Vector";
import Vector from "ol/layer/Vector";
import Select from "ol/interaction/Select";
import Overlay from "ol/Overlay.js";
import AbstractAdvancedSearch from "./AbstractAdvancedSearch";
import { Layer } from "ol/layer";
import Point from "ol/geom/Point";
import SearchEngineGeocodeIGN from "./SearchEngineGeocodeIGN";
import Feature from "ol/Feature";
//# sourceMappingURL=SearchEngineAdvanced.d.ts.map