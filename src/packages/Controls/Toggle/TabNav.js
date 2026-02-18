import BaseObject from "ol/Object";
import Logger from "../../Utils/LoggerByDefault";
import Helper from "../../Utils/Helper";
import Control from "../Control";
import Collection from "ol/Collection";
import TabNavItem from "./TabNavItem";
var logger = Logger.getLogger("tabnav");

/**
 * @classdesc
 * Classe gérant une navigation tertiaire avec onglets.
 *
 * @alias TabNav
 * @module TabNav
 * @extends {Control}
 */
class TabNav extends Control {

    /**
     * Constructeur du TabNav.
     * @constructor
     * @param {TabNavOptions} options Options du constructeur
     */
    constructor (options = {}) {
        super(options);

        // Initialisation du composant
        this._initialize(options);

        // Création du conteneur
        this._initContainer(options);

        // Initialisation des événements
        this._initEvents(options);

        this.navigationList = this.element.querySelector(this.selectors.NAVIGATION_LIST);

        // Ajout des items
        if (options.items) {
            this.addItems(options.items);
        }
    }

    /**
     * @param {TabNavOptions} options Options de construction
     */
    _initialize (options) {
        super._initialize(options);
        this.tabNavClass = "GPF-tabnav";

        this.items = new Collection();

        const tabClass = ".fr-tabnav";
        this.selectors = {
            NAVIGATION : `${tabClass}`,
            NAVIGATION_LIST : `${tabClass} ${tabClass}__list`,
            NAVIGATION_ITEM : `${tabClass}  ${tabClass}__item`,
            NAVIGATION_LINK : `${tabClass}  ${tabClass}__link`,
            CURRENT_LINK : `${tabClass} ${tabClass}__link[aria-selected="true"]`,
            OPEN_TAB : "panel:tab:open",
            CLOSE_TAB : "panel:tab:close",
        };

        if (!options.contentContainer) {
            const container = document.createElement("div");
            container.id = Helper.getUid("GPF-tabnav__container");
            container.className = "GPF-tabnav__container";
            options.contentContainer = container;
        }

        this.contentContainer = options.contentContainer;
    }

    setMap (map) {
        super.setMap(map);
        if (map && this.contentContainer.classList.contains(`${this.tabNavClass}__container`)) {
            // Si le conteneur n'est pas ajouté, on le place juste après
            // L'élément principal
            this.element.after(this.contentContainer);
        }
    }

    /**
     * Crée le conteneur principal de la navigation.
     * @protected
     * @param {TabNavOptions} options Options de construction
     * @returns {HTMLElement} Élément div de navigation
     */
    _initContainer (options) {
        super._initContainer(options);
        this.element = document.createElement("div");
        this.element.className = `${this.tabNavClass} fr-nav fr-tabnav`;

        const ul = document.createElement("ul");
        ul.className = `fr-nav__list fr-tabnav__list ${this.tabNavClass}__list`;
        ul.setAttribute("role", "tablist");
        ul.setAttribute("aria-label", options.label || "Navigation");

        this.element.appendChild(ul);

        return this.element;
    }

    /**
     * @param {TabNavOptions} options Options du constructeur
     */
    _initEvents (options) {
        super._initEvents(options);

        this.items.on("add", (e) => {
            const item = e.element;
            item.getButton().addEventListener("click", (e) => {
                this.setCurrentLink(item);
            });
        });
    }

    /**
     * Ajoute plusieurs items à la navigation.
     * @param {Array<TabNavItemOptions>} items Liste des items à ajouter
     */
    addItems (items) {
        if (!Array.isArray(items)) {
            this.addItem(items);
            return;
        }

        this.navigationList.replaceChildren();
        items.forEach(item => this.addItem(item));
    }

    /**
     * Ajoute un item à la navigation.
     * @param {TabNavItemOptions} option Item à ajouter
     */
    addItem (option) {
        if (!option) {
            return;
        }
        const item = new TabNavItem(option);
        this.items.push(item);
        this.navigationList.appendChild(item.getElement());
        this.contentContainer.appendChild(item.getContent());
    }

    /**
     * Booléen retournant le nombre d'item dans la navigation
     * @returns {Boolean} Vrai si contient des éléments
     */
    hasNavItem () {
        return !!this.items.length;
    }

    /**
     * Gère le clic sur un onglet.
     * @private
     * @param {PointerEvent} e Événement de click sur le bouton
     */
    _handleClick (e) {
        const currentLink = this.getCurrentLink();

        if (currentLink === e.target) {
            return;
        }

        this.setCurrentLink(e.target);
    }

    /**
     * Retourne le lien actuellement sélectionné.
     * @returns {TabNavItem|null} Bouton actuellement sélectionné
     */
    getCurrentLink () {
        return this.currentItem;
    }

    /**
     * Définit le lien courant et gère l'affichage du contenu.
     * @param {TabNavItem} link Bouton à activer
     */
    setCurrentLink (link) {
        const currentLink = this.getCurrentLink();

        if (currentLink === link) {
            return;
        }

        if (currentLink) {
            // Fermeture de l'onglet actuel
            currentLink.setSelected(false);
        }

        this.currentItem = link;
        link.setSelected(true);
    }

    /**
     * Vérifie si la navigation contient des items.
     * @returns {Boolean} True si au moins un item existe
     */
    hasItems () {
        return this.items.getLength() > 0;
    }

    /**
     * Retourne l'élément principal de la navigation.
     * @returns {HTMLElement} Élément div de navigation
     */
    getElement () {
        return this.element;
    }

    /**
     * Affiche la navigation.
     */
    show () {
        this.element.classList.remove("fr-hidden", "GPelementHidden");
    }

    /**
     * Masque la navigation.
     */
    hide () {
        this.element.classList.add("fr-hidden", "GPelementHidden");
    }

    /**
     * Affiche un item.
     * @param {TabNavItem} item Item à afficher
     */
    showItem (item) {
        item.show();
    }

    /**
     * Masque un item.
     * @param {TabNavItem} item Item à masquer
     */
    hideItem (item) {
        item.hide();
    }

    /**
     * Sélectionne le premier onglet.
     */
    selectFirst () {
        this.items.item(0) && this.setCurrentLink(this.items.item(0));
    }

    /**
     * Supprime tous les items de la navigation.
     */
    clear () {
        this.navigationList.replaceChildren();
        this.items.clear();
    }

}

export default TabNav;

// Expose TabNav as ol.control.TabNav (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.TabNav = TabNav;
}
