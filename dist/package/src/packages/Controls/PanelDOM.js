/**
 * Méthodes génériques de création DOM pour les panneaux des widgets
 *
 */
let PanelDOM = {
    /**
     * Create Header Panel
     *
     * @returns {HTMLElement} DOM element
     */
    _createPanelHeaderElement : function ({ icon, title, btnClassForClose = false, backBtn = false }) {
        let container = document.createElement("div");
        container.classList.add("GPpanelHeader", "gpf-panel__header", "fr-p-1w");

        if (backBtn) {
            let backBtnElement = this._createPanelBackButtonElement();
            container.appendChild(backBtnElement);
            container._backBtn = backBtnElement;
        }

        if (icon) {
            let iconElement = this._createPanelIconElement(icon);
            container.appendChild(iconElement);
            container._icon = iconElement;
        }

        if (title || title === "") {
            let titleElement = this._createPanelTitleElement(title);
            container.appendChild(titleElement);
            container._title = titleElement;
        }

        let closeBtn = this._createPanelCloseElement(btnClassForClose);
        container.appendChild(closeBtn);

        container._closeBtn = closeBtn;

        return container;
    },
    _createPanelIconElement : function (icon) {
        let iconElement = document.createElement("span");
        iconElement.classList.add(`fr-icon-${icon}`, "fr-icon--sm", "fr-mr-1w");
        return iconElement;
    },
    _createPanelTitleElement : function (title) {
        let titleElement = document.createElement("span");
        titleElement.classList.add("GPpanelTitle", "gpf-panel__title");
        titleElement.innerText = title;
        return titleElement;
    },
    _createPanelCloseElement : function (btnClassForClose) {
        let btnClose = document.createElement("button");
        btnClose.type = "button";
        btnClose.classList.add("GPpanelClose", "fr-btn", "fr-btn--sm", "fr-icon-close-line", "fr-btn--tertiary-no-outline", "fr-ml-auto");
        btnClose.innerText = "Fermer le panneau";
        btnClose.title = "Fermer le panneau";

        if (btnClassForClose) {
            btnClose.addEventListener("click", () => {
                let btn = document.getElementById(this._addUID(btnClassForClose));
                if (btn) {
                    btn.click();
                }
            });
        }

        return btnClose;
    },
    _createPanelBackButtonElement : function () {
        let backBtn = document.createElement("button");
        backBtn.type = "button";
        backBtn.classList.add("GPreturnPicto", "fr-btn", "fr-btn--sm", "fr-icon-arrow-left-line", "fr-btn--tertiary-no-outline", "fr-mr-1w", "GPelementHidden", "gpf-hidden");
        backBtn.innerText = "Retour";
        backBtn.title = "Retour";

        return backBtn;
    },
    _createPanelBodyElement : function () {
        let bodyElement = document.createElement("div");
        bodyElement.classList.add("gpf-panel__body", "fr-modal__body");
        return bodyElement;
    },
};

export default PanelDOM;
