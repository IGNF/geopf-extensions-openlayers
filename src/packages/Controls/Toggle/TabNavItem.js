import Logger from "../../Utils/LoggerByDefault";
import Helper from "../../Utils/Helper";
import Control from "../Control";
var logger = Logger.getLogger("tabnav");

/**
 * @classdesc
 * Classe gérant une navigation tertiaire avec onglets.
 *
 * @alias TabNavItem
 * @module TabNavItem
 * @extends {Control}
 */
class TabNavItem extends Control {

    /**
     * Constructeur du TabNavItem.
     * @constructor
     * @param {TabNavItemOptions} options Options du constructeur
     */
    constructor (options = {}) {
        super(options);

        // Initialisation du composant
        this._initialize(options);

        // Création du conteneur
        this._initContainer(options);

        // Initialisation des événements
        this._initEvents(options);
    }

    /**
     * @param {TabNavItemOptions} options Options de construction
     */
    _initialize (options) {
        super._initialize(options);
        this.tabNavItemClass = "GPF-tabnav";

        this.set("selected", false);

        this.selectors = {
            OPEN_TAB : "tab:open",
            CLOSE_TAB : "tab:close",
        };

        this.onOpen = typeof options.onOpen === "function" ? options.onOpen : () => { };
        this.onClose = typeof options.onClose === "function" ? options.onClose : () => { };
    }

    /**
     * Crée le conteneur principal de la navigation.
     * @protected
     * @param {TabNavItemOptions} options Options de construction
     * @returns {HTMLElement} Élément div de navigation
     */
    _initContainer (options) {
        super._initContainer(options);

        if (!options) {
            return;
        }

        const btnId = Helper.getUid("tabNavLink");
        const contentId = Helper.getUid("tabNavContent");

        // Création de la puce
        this.element = document.createElement("li");
        this.element.className = `fr-nav__item fr-tabnav__item  ${this.tabNavItemClass}__item`;
        this.element.setAttribute("role", "presentation");

        // Création du bouton
        this.button = document.createElement("button");
        this.button.type = "button";
        this.button.id = btnId;
        this.button.setAttribute("role", "tab");
        this.button.setAttribute("aria-controls", contentId);
        this.button.setAttribute("aria-selected", "false");
        this.button.innerHTML = options.label;

        let buttonClasses = `fr-nav__link fr-tabnav__link ${this.tabNavItemClass}__link`;
        if (options.icon) {
            buttonClasses += ` ${options.icon} fr-btn--icon-left ${this.tabNavItemClass}__link-btn`;
        }
        this.button.className = buttonClasses;

        if (options.title) {
            this.button.title = options.title;
        }

        this.element.appendChild(this.button);

        // Création du contenu lié à l'onglet
        this.content = document.createElement("div");
        this.content.id = contentId;
        this.content.setAttribute("aria-labelledby", btnId);
        this.content.setAttribute("role", "tabpanel");
        this.content.className = "fr-tabnav__panel fr-hidden GPelementHidden";

        if (typeof options.content === "string") {
            this.content.innerHTML = options.content;
        } else if (options.content instanceof HTMLElement) {
            this.content.appendChild(options.content);
        }

        return this.element;
    }

    /**
     * @param {TabNavItemOptions} options Options du constructeur
     */
    _initEvents (options) {
        super._initEvents(options);

        this.addEventListener(this.selectors.OPEN_TAB, this.onOpen);
        this.addEventListener(this.selectors.CLOSE_TAB, this.onClose);
    }

    /**
     * Retourne l'élément principal de la navigation.
     * @returns {HTMLElement} Élément div de navigation
     */
    getElement () {
        return this.element;
    }

    /**
     * Retourne le bouton de l'item.
     * @returns {HTMLButtonElement} Élément div de navigation
     */
    getButton () {
        return this.button;
    }

    /**
     * Retourne le contenu de l'item.
     * 
     * Attention, cela est différent du conteneur dans lequel il se trouve
     * @returns {HTMLElement} Élément div de navigation
     */
    getContent () {
        return this.content;
    }

    /**
     * Affiche le contenu.
     */
    show () {
        this.content.classList.remove("fr-hidden", "GPelementHidden");
        this.dispatchEvent(this.selectors.OPEN_TAB);
    }

    /**
     * Masque le contenu.
     */
    hide () {
        this.content.classList.add("fr-hidden", "GPelementHidden");
        this.dispatchEvent(this.selectors.CLOSE_TAB);
    }

    /**
     * Sélectionne ou déselectionne l'item
     * @param {Boolean} bool Vrai si l'élément doit être sélectionné.
     */
    setSelected (bool) {
        this.set("selected", bool);
        if (bool) {
            this.button.ariaSelected = true;
            // Affiche le contenu
            this.show();
        } else {
            this.button.ariaSelected = false;
            // Cache le contenu
            this.hide();
        }
    }

    /**
     * Vérifie si l'élément est sélectionné
     * @return {Boolean} Vrai si l'élément est sélectionné.
     */
    isSelected () {
        return this.get("selected");
    }

}

export default TabNavItem;

// Expose TabNavItem as ol.control.TabNavItem (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.TabNavItem = TabNavItem;
}
