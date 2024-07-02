/**
 * Panneau generique pour les widgets
 *
 * @example
 * import PanelDOM from "./Panel.js";
 * var panel = new PanelDOM(uid);
 *
 * panel.add("drawing", "Annoter la carte", cb);
 * panel
 *   .add("elevationpath", "Profil Altimétrique", cb)
 *   .insertBtn("reduce", cb)
 *   .insertBtn("info", cb);
 * panel.add("isocurve", "Calcul d'isochrone", cb);
 * panel.add("import", "Import de données", cb);
 * panel
 *   .add("layerSwitcher", "Couches de données", cb)
 *   .insertIcon();
 * panel.add("mousePosition", "Coordonnées", cb);
 * panel
 *   .add("reverseGeocoding", "Recherche inverse", cb)
 *   .insertBtn("reduce", cb, { class : "hidden" });
 * panel.add("route", "Calcul d'itinéraire", cb);
 *
 * @mixin
 */
class PanelDOM {

    constructor (uid) {
        this.uid = uid;

        this.name = null;
        this.container = null;
        this.header = null;
        this.headerTitle = null;
        this.headerClose = null;
        this.headerBtnReduce = null;
        this.headerBtnInfo = null;
        this.headerIcon = null;
    }

    /**
     * ...
     * @param {*} name -
     * @param {*} title -
     * @param {*} cb -
     * @returns {DOMElement} -
     */
    add (name, title, cb) {
        this.name = name;
        this.container = this.#createPanelElement();
        var div = this.#createPanelDivElement();

        this.header = this.#createPanelHeaderElement();
        this.headerTitle = this.#createPanelTitleElement(title);
        this.headerClose = this.#createPanelCloseElement(cb);

        header.appendChild(headerClose);
        header.appendChild(headerTitle);
        div.appendChild(header);
        this.container.appendChild(div);

        return this.container;
    }

    /**
     * ...
     * @param {*} name -
     * @param {*} cb -
     * @param {*} options -
     * @returns {DOMElement} -
     */
    insertBtn (name, cb, options) {
        if (!this.container) {
            return;
        }
        this.header.insertBefore(this.#createPanelButtonElement(name, cb, options), this.headerTitle);
        return this.container;
    }

    /**
     * ...
     * @returns {DOMElement} -
     */
    insertIcon () {
        if (!this.container) {
            return;
        }
        this.header.insertBefore(this.#createPanelIconElement(), this.headerTitle);
        return this.container;
    }

    #createPanelElement () {
        var dialog = document.createElement("dialog");
        dialog.id = "GP" + this.name + "Panel-" + this.uid;
        dialog.className = "GPpanel gpf-panel fr-modal";
        return dialog;
    }
    #createPanelDivElement () {
        var div = document.createElement("div");
        div.className = "gpf-panel__body fr-modal__body";
        return div;
    }
    #createPanelHeaderElement () {
        var divHeader = document.createElement("div");
        divHeader.className = "GPpanelHeader gpf-panel__header fr-modal__header";
        return divHeader;
    }
    #createPanelTitleElement (title) {
        var divTitle = document.createElement("div");
        divTitle.className = "GPpanelTitle gpf-panel__title fr-modal__title fr-pt-4w";
        divTitle.innerHTML = title; // ex. Calcul d'itinéraire
        return divTitle;
    }
    #createPanelCloseElement (cb) {
        var btnClose = document.createElement("button");
        btnClose.id = "GP" + this.name + "PanelClose-" + this.uid;
        btnClose.className = "GPpanelClose gpf-btn gpf-btn-icon-close fr-btn--close fr-btn fr-btn--tertiary-no-outline fr-m-1w";
        btnClose.classList.add("GP" + this.name + "PanelClose");
        btnClose.title = "Masquer le panneau";

        // Link panel close / visibility checkbox
        if (btnClose.addEventListener) {
            btnClose.addEventListener("click", cb, false);
        } else if (btnClose.attachEvent) {
            btnClose.attachEvent("onclick", cb);
        }

        var spanClose = document.createElement("span");
        spanClose.className = "GPelementHidden gpf-visible"; // afficher en dsfr
        spanClose.innerText = "Fermer";
        btnClose.appendChild(spanClose);

        return btnClose;
    }
    #createPanelButtonElement (name, cb, options) {
        var id = null;
        var className = null;
        if (name === "reduce") {
            id = "GP" + this.name + "ReturnPicto";
            className = "GPreturnPicto";
        } else if (name === "info") {
            id = "GP" + this.name + "PanelInfo";
            className = "GPpanelInfo";
        } else {
            return;
        }

        var button = document.createElement("button");
        button.id = id + "-" + this.uid;
        button.title = options.title || "Nouvelle recherche";
        button.className = "fr-btn fr-btn--secondary";
        button.classList.add("gpf-btn", "gpf-btn--secondary", "gpf-btn-icon-" +  name);
        button.classList.add(id);
        button.classList.add(className);
        if (options.class && options.class === "hidden") {
            button.classList.add("GPelementHidden");
            button.classList.add("gpf-hidden");
        }
        if (button.addEventListener) {
            button.addEventListener("click", cb);
        } else if (button.attachEvent) {
            button.attachEvent("onclick", cb);
        }

        if (name === "reduce") {
            this.headerBtnReduce = button;
        } else if (name === "info") {
            this.headerBtnInfo = button;
        }

        return button;
    }
    #createPanelIconElement () {
        // TODO
    }

};

export default PanelDOM;
