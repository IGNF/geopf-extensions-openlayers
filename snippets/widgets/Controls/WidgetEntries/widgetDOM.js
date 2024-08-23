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
        div.className = "gpf-panel__widget";
        return div;
    },

    /**
     * Create Header Panel
     *
     * @returns {DOMElement} DOM element
     */
    _createWidgetPanelHeaderElement : function () {
        var container = document.createElement("div");
        container.className = "gpf-panel__header_widget";
        return container;
    },
    _createWidgetPanelIconElement : function () {
        var label = document.createElement("label");
        label.className = "gpf-btn-header-widget gpf-btn-icon-header-widget";
        label.title = `${title}`;
        return label;
    },
    _createWidgetPanelTitleElement : function () {
        var div = document.createElement("div");
        div.className = "gpf-panel__title_widget";
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

        return btnClose;
    },

    // ################################################################### //
    // ####################### Methods for entries ####################### //
    // ################################################################### //
    
    _createEntriesElement : function () {
        var div = document.createElement("div");
        div.className = "widget-entries gpf-panel__body fr-modal__body";
        return div;
    }

};

export default WidgetDOM;