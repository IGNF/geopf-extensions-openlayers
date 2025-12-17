import BaseObject from "ol/Object";
import Logger from "../../Utils/LoggerByDefault";
import Helper from "../../Utils/Helper";
import Control from "../Control";
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
        this.tabNavClass = "GPF-tabnav";

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

    }

    /**
     * Ajoute plusieurs items à la navigation.
     * @param {Array<TabNavItem>} items Liste des items à ajouter
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
     * @param {TabNavItem} item Item à ajouter
     */
    addItem (item) {
        if (!item) {
            return;
        }

        const btnId = Helper.getUid("tabNavLink");
        const contentId = Helper.getUid("tabNavContent");

        // Création de la puce
        const li = document.createElement("li");
        li.className = `fr-nav__item fr-tabnav__item  ${this.tabNavClass}__item`;
        li.setAttribute("role", "presentation");

        // Création du bouton
        const button = document.createElement("button");
        button.type = "button";
        button.id = btnId;
        button.setAttribute("role", "tab");
        button.setAttribute("aria-controls", contentId);
        button.setAttribute("aria-selected", "false");
        button.innerHTML = item.label;

        let buttonClasses = `fr-nav__link fr-tabnav__link ${this.tabNavClass}__link`;
        if (item.icon) {
            buttonClasses += ` ${item.icon} fr-btn--icon-left ${this.tabNavClass}__link-btn`;
        }
        button.className = buttonClasses;

        if (item.title) {
            button.title = item.title;
        }

        // Stockage des callbacks
        button._onTabOpen = item.onOpen;
        button._onTabClose = item.onClose;

        // Événement click
        button.addEventListener("click", this._handleClick.bind(this));

        li.appendChild(button);
        this.navigationList.appendChild(li);

        // Création du contenu lié à l'onglet
        const content = document.createElement("div");
        content.id = contentId;
        content.setAttribute("aria-labelledby", btnId);
        content.setAttribute("role", "tabpanel");
        content.className = "fr-tabnav__panel fr-hidden GPF-hidden";

        if (typeof item.content === "string") {
            content.innerHTML = item.content;
        } else if (item.content instanceof HTMLElement) {
            content.appendChild(item.content);
        }
        this.contentContainer.appendChild(content);
    }

    /**
     * Booléen retournant le nombre d'item dans la navigation
     * @returns {Boolean} Vrai si contient des éléments
     */
    hasNavItem () {
        return !!this.element.querySelectorAll(this.selectors.NAVIGATION_ITEM).length;
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
     * @returns {HTMLButtonElement|null} Bouton actuellement sélectionné
     */
    getCurrentLink () {
        return this.element.querySelector(this.selectors.CURRENT_LINK);
    }

    /**
     * Définit le lien courant et gère l'affichage du contenu.
     * @param {HTMLButtonElement} link Bouton à activer
     */
    setCurrentLink (link) {
        const currentLink = this.getCurrentLink();

        if (currentLink === link) {
            return;
        }

        if (currentLink) {
            // Fermeture de l'onglet actuel
            currentLink.ariaSelected = false;
            const currentContent = currentLink.ariaControlsElements?.[0];
            currentContent?.classList.add("fr-hidden", "GPF-hidden");

            this.dispatchEvent({
                type : this.selectors.CLOSE_TAB,
                tab : currentLink,
                content : currentContent,
            });

            if (typeof currentLink._onTabClose === "function") {
                currentLink._onTabClose(currentLink, currentContent);
            }
        }

        // Ouverture du nouvel onglet
        link.ariaSelected = true;
        const content = link.ariaControlsElements?.[0];
        content?.classList.remove("fr-hidden", "GPF-hidden");

        this.dispatchEvent({
            type : this.selectors.OPEN_TAB,
            tab : link,
            content : content
        });

        if (typeof link._onTabOpen === "function") {
            link._onTabOpen(link, content);
        }
    }

    /**
     * Vérifie si la navigation contient des items.
     * @returns {Boolean} True si au moins un item existe
     */
    hasItems () {
        return this.navigationList.children.length > 0;
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
        this.element.classList.remove("fr-hidden", "GPF-hidden");
    }

    /**
     * Masque la navigation.
     */
    hide () {
        this.element.classList.add("fr-hidden", "GPF-hidden");
    }

    /**
     * Affiche un item.
     * @param {HTMLDivElement} item Item à afficher
     */
    showItem (item) {
        item.classList.remove("fr-hidden", "GPF-hidden");
    }

    /**
     * Masque un item.
     * @param {HTMLDivElement} item Item à masquer
     */
    hideItem (item) {
        item.classList.add("fr-hidden", "GPF-hidden");
    }

    /**
     * Sélectionne le premier onglet.
     */
    selectFirst () {
        const firstLink = this.element.querySelector(this.selectors.NAVIGATION_LINK);
        if (firstLink) {
            this.setCurrentLink(firstLink);
        }
    }

    /**
     * Supprime tous les items de la navigation.
     */
    clear () {
        this.navigationList.replaceChildren();
    }

}

export default TabNav;

// Expose TabNav as ol.control.TabNav (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.TabNav = TabNav;
}
