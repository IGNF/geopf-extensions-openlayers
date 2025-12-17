import Helper from "../../Utils/Helper";
import Logger from "../../Utils/LoggerByDefault";
import ControlExtended from "../Control";
import TabNav from "./TabNav";

var logger = Logger.getLogger("dialog");

/**
 * Classes de position du panneau
 * @enum {String}
 */
const positionClasses = {
    RIGHT : "__right",
    LEFT : "__left",
};

/**
 * Classes des tailles possible du panneau
 * @enum {String}
 */
const sizeClasses = {
    SM : "--sm",
    MD : "--md",
};

/**
 * @classdesc
 * Classe gérant un dialog HTML avec titre, icône et contenu.
 *
 * @alias Dialog
 * @module Dialog
 */
class Dialog extends ControlExtended {

    /**
     * Constructeur du Dialog.
     * @constructor
     * @param {DialogOptions} options Options du constructeur
     */
    constructor (options = {}) {
        super(options);

        // Initialise le composant
        this._initialize(options);

        // Initialise le conteneur
        this.element = this._initContainer(options);

        // Initialise les événements liés au conteneur et au contrôle
        this._initEvents(options);

        // Références aux éléments du DOM
        this.dialogTitle = this.querySelector(this.selectors.TITLE);
        this.dialogIcon = this.querySelector(this.selectors.ICON);
        this.dialogContent = this.querySelector(this.selectors.CONTENT);

        // Initialisation du contenu
        this.setContent(options);
        this.setPos(options.position);
        this.setSize(options.size);

        // Ajout de la navigation tertiaire si des items sont fournis
        if (options.items.length) {
            this.setTabNav(options.items, options.labelTabNav);
        }

        this.onOpenCallback = options.onOpen;
        this.onCloseCallback = options.onClose;
    }

    setMap (map) {
        super.setMap(map);
        if (map) {
            this.tabNav?.setMap(map);

            // Sélection du premier onglet
            this.tabNav?.selectFirst();
        }
    }

    /**
     * Initialise le contrôle Toggle (appelé par le constructeur).
     * @protected
     * @param {DialogOptions} options Options du constructeur
     */
    _initialize (options) {
        this.dialogClass = "GPF-dialog";
        options.id ??= this.dialogClass;

        this.selectors = {
            TITLE : `.${this.dialogClass}__title-name`,
            BUTTON_GROUP : `.${this.dialogClass}__btns-group`,
            BUTTONS : `.${this.dialogClass}__btns-group button`,
            BTN_CLOSE : `.${this.dialogClass}__close-btn`,
            ICON : `.${this.dialogClass}__title-icon`,
            CONTENT : `.${this.dialogClass}__content`,
            OPEN_EVENT : "dialog:open",
            CHANGE_CONTENT : "dialog:change:content",
            CLOSE_EVENT : "dialog:close",
        };

        // Initialisation de la navigation tertiaire
        this.tabNav = null;
        options.items ??= [];
    }

    /**
     * Crée le conteneur principal du dialog.
     * @private
     * @param {DialogOptions} options Options de construction
     * @returns {HTMLDialogElement} Dialog HTML avec le contenu
     */
    _initContainer (options) {
        const container = document.createElement("dialog");
        container.className = this.dialogClass;
        container.id = options.id;

        if (options.className) {
            container.classList.add(options.className);
        }

        // Création du header
        const header = document.createElement("div");
        header.className = `${this.dialogClass}__header`;

        // Titre
        const title = document.createElement("div");
        title.className = `${this.dialogClass}__title`;

        const titleIcon = document.createElement("span");
        titleIcon.className = `${this.dialogClass}__title-icon fr-icon fr-icon--sm`;

        const titleName = document.createElement("span");
        titleName.className = `${this.dialogClass}__title-name`;

        title.appendChild(titleIcon);
        title.appendChild(titleName);

        // Boutons
        const buttons = document.createElement("div");
        buttons.className = `${this.dialogClass}__buttons`;

        const btnsGroup = document.createElement("div");
        btnsGroup.className = `${this.dialogClass}__btns-group`;

        const closeBtn = this.closeBtn = document.createElement("button");
        closeBtn.type = "button";
        closeBtn.className = `fr-btn fr-btn--sm fr-btn--tertiary-no-outline fr-icon fr-icon-close-line ${this.dialogClass}__close-btn`;
        closeBtn.title = "Fermer le panneau";
        closeBtn.setAttribute("aria-label", "Fermer le panneau");
        closeBtn.setAttribute("aria-controls", container.id);
        buttons.appendChild(btnsGroup);
        buttons.appendChild(closeBtn);

        header.appendChild(title);
        header.appendChild(buttons);

        // Conteneur pour la navigation tertiaire
        const navContainer = document.createElement("div");
        navContainer.className = `${this.dialogClass}__nav-container`;

        // Contenu
        const content = document.createElement("div");
        content.className = `${this.dialogClass}__content`;

        container.appendChild(header);
        container.appendChild(navContainer);
        container.appendChild(content);

        return container;
    }

    /**
     * Ajoute les écouteurs d'événements sur les éléments du contrôle.
     * @protected
     * @param {DialogOptions} options Options du constructeur
     */
    _initEvents (options) {
        this.closeBtn.onclick = () => {
            this.close();
        };
    }

    /**
     * Définit la position du panneau (droite ou gauche).
     * @param {String} position Position du panneau ("left" ou "right")
     */
    setPos (position) {
        if (Object.keys(positionClasses).includes(position?.toUpperCase())) {
            this.element.classList.add(`${this.dialogClass}${positionClasses[position?.toUpperCase()]}`);
        }
    }

    /**
     * Définit la taille du panneau (sm ou md).
     * @param {String} size Taille du panneau (sm ou md)
     */
    setSize (size) {
        if (Object.keys(sizeClasses).includes(size?.toUpperCase())) {
            this.element.classList.add(`${this.dialogClass}${sizeClasses[size?.toUpperCase()]}`);
        }
    }

    /**
     * Fonction utilitaire pour paramétrer facilement le dialog.
     * 
     * @param {Object} options Élements du dialog
     * @param {String} options.title Titre
     * @param {String} options.icon Icône
     * @param {String|Element} options.content Contenu du dialog.
     */
    setContent (options = {}) {
        this.setDialogTitle(options.title);
        this.setIcon(options.icon, options.title);
        this.setDialogContent(options.content);
    }

    /**
     * Fonction utilitaire pour paramétrer facilement l'icône.
     * @param {String} icon Icône
     * @param {String} [title] Titre
     */
    setIcon (icon, title) {
        this.dialogIcon.classList.remove(this.icon);
        if (icon) {
            this.icon = icon;
            Helper.setIcon(this.dialogIcon, icon, title);
        }
    }

    /**
     * Retourne l'élément principal du contrôle.
     * @returns {HTMLDialogElement} Élément HTML du contrôle (balise dialog)
     */
    getElement () {
        return this.element;
    }


    /**
     * Retourne le titre du dialog (contenu).
     * @returns {String} Contenu du titre
     */
    getDialogTitle () {
        return this.dialogTitle ? this.dialogTitle.textContent : "";
    }

    /**
     * Ajoute un titre au dialog.
     * @param {String} title Titre à remplacer
     */
    setDialogTitle (title) {
        if (this.dialogTitle && typeof title === "string") {
            this.dialogTitle.textContent = title;
        }
    }

    /**
     * Retourne le contenu du dialog.
     * 
     * @returns {Element} Contenu du dialog
     */
    getDialogContent () {
        return this.dialogContent;
    }

    /**
     * Ajoute un contenu au dialog.
     * 
     * @param {Element|String|null} content Contenu du dialog
     * @param {Boolean} [clear=true] Si vrai, efface le contenu du dialog
     */
    setDialogContent (content, clear = true) {
        if (!this.dialogContent) {
            return;
        }

        if (clear) {
            this.dialogContent.innerHTML = "";
        }

        if (typeof content === "string") {
            this.dialogContent.innerHTML = content;
        } else if (content instanceof HTMLElement) {
            this.dialogContent.appendChild(content);
        }
    }

    /**
     * Sélectionne le premier élément du dialog correspondant
     * au sélecteur CSS.
     * 
     * @param {String} selector Sélecteur CSS.
     * @returns {Element} Premier élément correspondant au sélecteur.
     */
    querySelector (selector) {
        return this.element.querySelector(selector);
    }

    /**
     * Sélectionne tous les éléments du dialog correspondant
     * au selecteur CSS.
     * 
     * @param {String} selector Sélecteur CSS
     * @returns {NodeList} Liste des élements correspondant au sélecteur
     */
    querySelectorAll (selector) {
        return this.element.querySelectorAll(selector);
    }

    /**
     * Ouvre le dialog.
     */
    show () {
        this.element.show();
        this.dispatchEvent(this.selectors.OPEN_EVENT);
        if (this.onOpenCallback) {
            this.onOpenCallback();
        }
    }

    /**
     * Ferme le dialog.
     */
    close () {
        if (this.isOpen()) {
            this.element.close();
            this.dispatchEvent(this.selectors.CLOSE_EVENT);
            if (this.onCloseCallback) {
                this.onCloseCallback();
            }
        }
    }

    /**
     * Vérifie si le dialog est ouvert.
     * @returns {Boolean} True si le dialog est ouvert
     */
    isOpen () {
        return this.element.open;
    }

    /**
     * Ajoute une navigation tertiaire au dialog.
     * @param {Array<TabNavItem>} items Liste des items de navigation
     * @param {String} [label] Attribut aria label de la navigation tertiaire
     */
    setTabNav (items, label) {
        if (!items || !Array.isArray(items) || items.length === 0) {
            // Supprime la navigation si elle existe
            if (this.tabNav) {
                this.tabNav.setMap(null);
            }
            return;
        }

        const navContainer = this.querySelector(`.${this.dialogClass}__nav-container`);
        
        // Création de la navigation
        this.tabNav = new TabNav({
            items : items,
            contentContainer : this.getDialogContent(),
            ariaLabel : label,
            target : navContainer,
        });

        // Gestion de la visibilité de la navigation
        if (this.tabNav.hasItems()) {
            navContainer.classList.remove("fr-hidden", "GPF-hidden");
        } else {
            navContainer.classList.add("fr-hidden", "GPF-hidden");
        }
    }

    /**
     * Retourne l'instance de la navigation tertiaire.
     * @returns {TabNav|null} Instance de TabNav ou null
     */
    getTabNav () {
        return this.tabNav;
    }

    /**
     * Ajoute un item à la navigation tertiaire.
     * @param {TabNavItem} item Item à ajouter
     */
    addTabNavItem (item) {
        if (!this.tabNav) {
            this.setTabNav([item]);
        } else {
            this.tabNav.addItem(item);
            const navContainer = this.querySelector(`.${this.dialogClass}__nav-container`);
            if (this.tabNav.hasItems()) {
                navContainer.classList.remove("fr-hidden", "GPF-hidden");
            }
        }
    }

    /**
     * Supprime tous les items de la navigation tertiaire.
     */
    clearTabNav () {
        if (this.tabNav) {
            this.tabNav.clear();
            const navContainer = this.querySelector(`.${this.dialogClass}__nav-container`);
            navContainer.classList.add("fr-hidden", "GPF-hidden");
        }
    }

}

export default Dialog;

// Expose Dialog as ol.control.Dialog (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.Dialog = Dialog;
}
