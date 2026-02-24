var title = "panoramax";

var PanoramaxDOM = {

    /**
    * Add uuid to the tag ID
    * @param {String} id - id selector
    * @returns {String} uid - id selector with an unique id
    */
    _addUID : function (id) {
        var uid = (this.uid) ? id + "-" + this.uid : id;
        return uid;
    },

    /**
     * Main container (DOM)
     *
     * @returns {DOMElement} DOM element
     */
    _createMainContainerElement : function () {
        var container = document.createElement("div");
        container.id = this._addUID("GPpanoramax");
        container.className = "GPwidget gpf-widget gpf-widget-button gpf-mobile-fullscreen";
        return container;
    },

    // ################################################################### //
    // ################### Methods of main container ##################### //
    // ################################################################### //

    /**
     * Show Widget
     *
     * @returns {DOMElement} DOM element
     */
    _createShowWidgetPictoElement : function () {
        var self = this;

        var button = document.createElement("button");
        // INFO: Ajout d'une SPAN pour enlever des marges de 6px dans CHROMIUM (?!)
        var span = document.createElement("span");
        button.appendChild(span);
        button.id = this._addUID("GPshowPanoramaxPicto");
        button.title = `${title}`;
        button.classList.add("GPshowOpen", "GPshowAdvancedToolPicto", "GPshowPanoramaxPicto");
        button.classList.add("gpf-btn", "gpf-btn--tertiary", "gpf-btn-icon", "gpf-btn-icon-panoramax");
        // button.classList.add("icon--ri", "icon--ri--map-2-line");
        button.classList.add("fr-btn", "fr-btn--tertiary");
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", false);
        button.setAttribute("aria-label", `Afficher ${title}`);
        button.setAttribute("type", "button");

        // Close all results and panels when minimizing the widget
        if (button.addEventListener) {
            button.addEventListener("click", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                self.onShowPanoramaxClick(e);
            });
        } else if (button.attachEvent) {
            button.attachEvent("onclick", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                self.onShowPanoramaxClick(e);
            });
        }

        return button;
    },

    // ################################################################### //
    // ################ Methods of panel buttons container ############### //
    // ################################################################### //

    /**
     * Create Container Panel for buttons
     *
     * @returns {DOMElement} DOM element
     */
    _createWidgetPanelButtonsElement : function () {
        var dialog = document.createElement("dialog");
        dialog.id = this._addUID("GPpanoramaxPanelButtons");
        dialog.className = "GPpanel gpf-panel fr-modal";

        return dialog;
    },

    _createWidgetPanelButtonsDivElement : function () {
        var div = document.createElement("div");
        div.className = "gpf-panel__body fr-modal__body";
        return div;
    },

    /**
     * Create Header Panel
     *
     * @param {Boolean} display - true if the header must be displayed, false otherwise
     * @returns {DOMElement} DOM element
     */
    _createWidgetPanelButtonsHeaderElement : function (display) {
        var container = document.createElement("div");
        container.className = "gpf-panel__header fr-modal__header";
        if (!display) {
            container.classList.add("gpf-hidden");
        }
        return container;
    },
    _createWidgetPanelButtonsIconElement : function () {
        var label = document.createElement("label");
        label.className = "GPpanelIcon gpf-btn-header gpf-btn-icon-header-panoramax";
        label.title = `${title}`;
        label.setAttribute("aria-label", `Afficher ${title}`);
        return label;
    },
    _createWidgetPanelButtonsTitleElement : function () {
        var div = document.createElement("div");
        div.className = "gpf-panel__title fr-modal__title fr-pt-4w";
        div.innerHTML = `${title}`;
        return div;
    },
    _createWidgetPanelButtonsCloseElement : function () {
        var self = this;

        var btnClose = document.createElement("button");
        btnClose.className = "gpf-btn gpf-btn-icon-close fr-btn--close fr-btn fr-btn--tertiary-no-outline fr-m-1w";
        btnClose.title = "Fermer le panneau";

        // Link panel close / visibility checkbox
        if (btnClose.addEventListener) {
            btnClose.addEventListener("click", function (e) {
                document.getElementById(self._addUID("GPshowPanoramaxPicto")).click();
                self.onClosePanoramaxClick(e);
            }, false);
        } else if (btnClose.attachEvent) {
            btnClose.attachEvent("onclick", function (e) {
                document.getElementById(self._addUID("GPshowPanoramaxPicto")).click();
                self.onClosePanoramaxClick(e);
            });
        }

        var span = document.createElement("span");
        span.className = "GPelementHidden gpf-visible"; // afficher en dsfr
        span.innerText = "Fermer";

        btnClose.appendChild(span);

        return btnClose;
    },

    // ################################################################### //
    // ####################### Methods for buttons ####################### //
    // ################################################################### //
    
    /**
     * Create buttons
     * see evenement !
     *
     * @returns {DOMElement} DOM element
     */
    _createWidgetButtonsElement : function () {
        var div = document.createElement("div");
        div.className = "gpf-panel__content fr-modal__content";

        return div;
    },

    _createButtonFiltersElement : function (opts) {
        var button = document.createElement("button");
        button.id = this._addUID("GPpanoramaxButtonFilters");
        button.className = "gpf-btn gpf-btn--secondary gpf-btn--icon gpf-btn-icon-filters fr-btn fr-btn--secondary";
        button.title = "Filtres";
        button.setAttribute("aria-label", "Afficher les filtres");
        button.setAttribute("type", "button");

        return button;
    },

    _createButtonContributionsElement : function (opts) {
        var button = document.createElement("button");
        button.id = this._addUID("GPpanoramaxButtonContributions");
        button.className = "gpf-btn gpf-btn--secondary gpf-btn--icon gpf-btn-icon-contributions fr-btn fr-btn--secondary";
        button.title = "Contributions";
        button.setAttribute("aria-label", "Afficher les contributions");
        button.setAttribute("type", "button");

        return button;
    },

    // ################################################################### //
    // ################ Methods of panel viewer container ################ //
    // ################################################################### //

    /**
     * Create Container Panel for photoviewer
     *
     * @returns {DOMElement} DOM element
     */
    _createWidgetPanelViewerElement : function () {
        var dialog = document.createElement("dialog");
        dialog.id = this._addUID("GPpanoramaxPanelViewer");
        dialog.className = "GPpanel gpf-panel fr-modal";
        // Target tag for the photoviewer dialog (see Panoramax.js)
        return dialog;
    },
};

export default PanoramaxDOM;