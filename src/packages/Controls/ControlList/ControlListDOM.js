import checkDsfr from "../Utils/CheckDsfr";

var ControlListDOM = {

    /**
    * Add uuid to the tag ID
    * @param {String} id - id selector
    * @returns {String} uid - id selector with an unique id
    */
    _addUID : function (id) {
        var uid = (this._uid) ? id + "-" + this._uid : id;
        return uid;
    },

    /**
     * Main container (DOM)
     *
     * @returns {DOMElement} DOM element
     */
    _createMainContainerElement : function () {
        var container = document.createElement("div");
        container.id = this._addUID("GPcontrolList");
        container.className = "GPwidget gpf-widget gpf-widget-button gpf-mobile-fullscreen";
        return container;
    },

    // ################################################################### //
    // ################# Methods to display Main Panel ################### //
    // ################################################################### //

    /**
     * Show control
     * see event !
     *
     * @returns {DOMElement} DOM element
     */
    _createShowControlListPictoElement : function () {
        // contexte d'execution
        var context = this;

        var button = document.createElement("button");
        // INFO: Ajout d'une SPAN pour enlever des marges de 6px dans CHROMIUM (?!)
        var span = document.createElement("span");
        button.appendChild(span);
        span.innerText = "+";
        button.id = this._addUID("GPshowControlListPicto");
        button.className = "GPshowOpen GPshowAdvancedToolPicto GPshowControlListPicto gpf-btn gpf-btn--tertiary gpf-btn-icon gpf-btn-icon-controllist fr-btn fr-btn--tertiary";
        button.setAttribute("aria-label", "Tous mes outils");
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", false);
        button.setAttribute("type", "button");

        // gestionnaire d'evenement :
        // on ouvre le menu
        if (button.addEventListener) {
            button.addEventListener("click", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                context.onShowControlListPanelClick(e);
            });
        } else if (button.attachEvent) {
            button.attachEvent("onclick", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                context.onShowControlListPanelClick(e);
            });
        }

        return button;
    },


    // ################################################################### //
    // ################## Methods to display Inputs Panel ################ //
    // ################################################################### //

    /**
     * Create Container Panel
     * @returns {DOMElement} DOM element
     */
    _createControlListPanelElement : function () {
        var dialog = document.createElement("dialog");
        dialog.id = this._addUID("GPcontrolListPanel");
        dialog.className = "GPpanel gpf-panel fr-modal";

        return dialog;
    },

    _createControlListPanelDivElement : function () {
        var div = document.createElement("div");
        div.className = "gpf-panel__body fr-modal__body";
        return div;
    },

    /**
     * Create Header Panel
     *
     * @returns {DOMElement} DOM element
     */
    _createControlListPanelHeaderElement : function () {
        var self = this;

        var container = document.createElement("div");
        container.className = "GPpanelHeader gpf-panel__header fr-modal__header";

        var div = document.createElement("div");
        div.className = "GPpanelTitle gpf-panel__title fr-modal__title fr-pt-4w";
        div.innerHTML = "Mes outils";
        container.appendChild(div);

        var divClose = document.createElement("button");
        divClose.id = this._addUID("GPcontrolListPanelClose");
        divClose.className = "GPpanelClose GPcontrolListPanelClose gpf-btn gpf-btn-icon-close fr-btn--close fr-btn fr-btn--tertiary-no-outline fr-m-1w";
        divClose.title = "Fermer le panneau";

        // Link panel close / visibility checkbox
        if (divClose.addEventListener) {
            divClose.addEventListener("click", function () {
                document.getElementById(self._addUID("GPshowControlListPicto")).click();
            }, false);
        } else if (divClose.attachEvent) {
            divClose.attachEvent("onclick", function () {
                document.getElementById(self._addUID("GPshowControlListPicto")).click();
            });
        }

        var span = document.createElement("span");
        span.className = "GPelementHidden gpf-visible"; // afficher en dsfr
        span.innerText = "Fermer";

        divClose.appendChild(span);

        container.appendChild(divClose);

        return container;
    },

    /**
     * Create Content Panel
     *
     * @returns {DOMElement} DOM element
     */
    _createControlListPanelContentElement : function () {
        var container = document.createElement("div");
        container.className = "gpf-panel__content fr-modal__content";
        return container;
    },

    /**
     * Create Footer Panel
     *
     * @param {DOMElement} controlCatalogelement - DOM element
     * @returns {DOMElement} DOM element
     */
    _createControlListPanelFooterElement : function (controlCatalogelement) {
        var container = document.createElement("div");
        container.className = "GPpanelFooter gpf-panel__footer fr-modal__footer";
        var addToolsBtn = document.createElement("button");
        addToolsBtn.classList.add("gpf-btn", "gpf-btn--tertiary", "fr-btn", "fr-btn--tertiary");
        addToolsBtn.innerText = "+ Ajouter plus d'outils";
        addToolsBtn.addEventListener("click", function () {
            controlCatalogelement.click();
        });
        container.appendChild(addToolsBtn);
        return container;
    },

    /**
     * Create div for control
     *
     * @param {ol.Control} control control to add in the panel
     * @returns {DOMElement} DOM element
     */
    _createControlListPanelControl : function (control) {
        let controlContainer;
        try {
            controlContainer = control.getContainer();
        } catch (e) {
            controlContainer = control.container;
        }
        var container = document.createElement("div");
        var btn = controlContainer.querySelector(".GPshowOpen").cloneNode();
        btn.id = btn.id + "-controllist";
        btn.classList.add("inside-control-list");
        container.appendChild(btn);
        var divText = document.createElement("div");
        var spanTitle = document.createElement("span");
        divText.appendChild(spanTitle);
        if (controlContainer.querySelector(".GPshowOpen").ariaLabel) {
            spanTitle.innerText = controlContainer.querySelector(".GPshowOpen").ariaLabel;
        } else if (controlContainer.querySelector(".GPpanelTitle")) {
            spanTitle.innerText = controlContainer.querySelector(".GPpanelTitle").innerText;
        } else if (controlContainer.querySelector("[class^='gpf-btn-header-']")) {
            spanTitle.innerText = controlContainer.querySelector("[class^='gpf-btn-header-']").title;
        }
        if (control.description) {
            var spanDescription = document.createElement("span");
            spanDescription.innerText = control.description;
            divText.appendChild(spanDescription);
        }
        container.appendChild(divText);

        container.addEventListener("click", function () {
            controlContainer.querySelector(".GPshowOpen").click();
        });
        return container;
    },

};

export default ControlListDOM;
