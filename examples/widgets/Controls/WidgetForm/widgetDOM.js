var title = "widget";

var WidgetDOM = {

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
        container.id = this._addUID("GPwidget");
        container.className = "GPwidget gpf-widget gpf-widget-button";
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
        button.id = this._addUID("GPshowWidgetPicto");
        button.className = "GPshowOpen GPshowAdvancedToolPicto GPshowWidgetPicto gpf-btn gpf-btn-icon gpf-btn-icon-widget fr-btn";
        button.title = `${title}`;
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", false);
        button.setAttribute("type", "button");

        // Close all results and panels when minimizing the widget
        if (button.addEventListener) {
            button.addEventListener("click", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                self.onShowWidgetClick();
            });
        } else if (button.attachEvent) {
            button.attachEvent("onclick", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                self.onShowWidgetClick();
            });
        }

        return button;
    },

    // ################################################################### //
    // ################### Methods of panel container #################### //
    // ################################################################### //

    /**
     * Create Container Panel
     *
     * @returns {DOMElement} DOM element
     */
    _createWidgetPanelElement : function () {
        var dialog = document.createElement("dialog");
        dialog.id = this._addUID("GPwidgetPanel");
        dialog.className = "GPpanel gpf-panel fr-modal";

        return dialog;
    },

    _createWidgetPanelDivElement : function () {
        var div = document.createElement("div");
        div.className = "gpf-panel__body fr-modal__body";
        return div;
    },

    /**
     * Create Header Panel
     *
     * @returns {DOMElement} DOM element
     */
    _createWidgetPanelHeaderElement : function () {
        var container = document.createElement("div");
        container.className = "gpf-panel__header fr-modal__header";
        return container;
    },
    _createWidgetPanelTitleElement : function () {
        var div = document.createElement("div");
        div.className = "gpf-panel__title fr-modal__title fr-pt-4w";
        div.innerHTML = `${title}`;
        return div;
    },
    _createWidgetPanelCloseElement : function () {
        var self = this;

        var btnClose = document.createElement("button");
        btnClose.className = "gpf-btn gpf-btn-icon-close fr-btn--close fr-btn fr-btn--tertiary-no-outline fr-m-1w";
        btnClose.title = "Fermer le panneau";

        // Link panel close / visibility checkbox
        if (btnClose.addEventListener) {
            btnClose.addEventListener("click", function () {
                document.getElementById(self._addUID("GPshowWidgetPicto")).click();
                self.onCloseWidgetClick();
            }, false);
        } else if (btnClose.attachEvent) {
            btnClose.attachEvent("onclick", function () {
                document.getElementById(self._addUID("GPshowWidgetPicto")).click();
                self.onCloseWidgetClick();
            });
        }

        var span = document.createElement("span");
        span.className = "GPelementHidden gpf-visible"; // afficher en dsfr
        span.innerText = "Fermer";

        btnClose.appendChild(span);

        return btnClose;
    },

    // ################################################################### //
    // ####################### Methods for form ####################### //
    // ################################################################### //
    
    /**
     * Create Form
     * see evenement !
     *
     * @returns {DOMElement} DOM element
     */
    _createWidgetPanelFormElement : function () {
        // contexte d'execution
        var self = this;

        var form = document.createElement("form");
        form.id = this._addUID("GPwidgetForm");
        form.className = "GPform gpf-panel__content fr-modal__content";

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            self.onWidgetComputationSubmit(e);
            return false;
        });

        return form;
    },

};

export default WidgetDOM;