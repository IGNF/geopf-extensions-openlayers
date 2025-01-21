import LayerImport from "../LayerImport/LayerImport";

var title = "contextMenu";

var ContextMenuDOM = {

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
        container.id = this._addUID("GPpointInfo");
        container.className = "GPpointInfo GPwidget gpf-widget gpf-widget-button";
        return container;
    },

    // ################################################################### //
    // ################### Methods of main container ##################### //
    // ################################################################### //

    /**
 * Show PointInfo
 *
 * @returns {DOMElement} DOM element
 */
    _createShowPointInfoPictoElement : function () {
        var self = this;

        var button = document.createElement("button");
        button.id = this._addUID("GPshowPointInfoPicto");
        button.className = "GPshowOpen GPshowAdvancedToolPicto GPshowPointInfoPicto gpf-btn gpf-btn-icon gpf-btn-icon-widget fr-btn";
        button.title = `${title}`;
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", false);
        button.setAttribute("type", "button");

        // Close all results and panels when minimizing the pointInfo
        if (button.addEventListener) {
            button.addEventListener("click", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                self.onShowPointInfoClick(e);
            });
        } else if (button.attachEvent) {
            button.attachEvent("onclick", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                self.onShowPointInfoClick(e);
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
    _createPointInfoPanelElement : function () {
        var dialog = document.createElement("dialog");
        dialog.id = this._addUID("GPpointInfoPanel");
        dialog.className = "GPpanel gpf-panel fr-modal";

        return dialog;
    },

    _createPointInfoPanelDivElement : function () {
        var div = document.createElement("div");
        div.className = "gpf-panel__pointInfo";
        return div;
    },

    /**
 * Create Header Panel
 *
 * @returns {DOMElement} DOM element
 */
    _createPointInfoPanelHeaderElement : function () {
        var container = document.createElement("div");
        container.className = "GPpointInfoHeader gpf-panel__header_pointInfo";
        return container;
    },
    _createPointInfoPanelIconElement : function () {
        var label = document.createElement("label");
        label.className = "GPpanelHeader gpf-btn-header-pointInfo gpf-btn-icon-header-pointInfo";
        label.title = `Adresse et coordonnées`;
        return label;
    },
    _createPointInfoPanelTitleElement : function () {
        var div = document.createElement("div");
        div.className = "GPpanelTitle gpf-panel__title_pointInfo fr-pt-4w";
        div.innerHTML = `Adresse et coordonnées`;
        return div;
    },
    _createPointInfoPanelCloseElement : function () {
        var self = this;

        var btnClose = document.createElement("button");
        btnClose.className = "GPpanelClose GPpointInfoPanelClose gpf-btn gpf-btn-icon-close fr-btn--close fr-btn fr-btn--tertiary-no-outline";
        btnClose.title = "Fermer le panneau";

        var span = document.createElement("span");
        span.className = "GPelementHidden gpf-visible"; // afficher en dsfr
        span.innerText = "Fermer";

        btnClose.appendChild(span);

        // Link panel close / visibility checkbox
        if (btnClose.addEventListener) {
            btnClose.addEventListener("click", function () {
                document.getElementById(self._addUID("GPshowPointInfoPicto")).click();
                console.log("close info point");
                self.onClosePointInfoClick();
            }, false);
        } else if (btnClose.attachEvent) {
            btnClose.attachEvent("onclick", function () {
                document.getElementById(self._addUID("GPshowPointInfoPicto")).click();
                self.onClosePointInfoClick();
            });
        }

        return btnClose;
    },

    // ################################################################### //
    // ####################### Methods for entries ####################### //
    // ################################################################### //

    _createEntriesElement : function () {
        var div = document.createElement("div");
        div.className = "point-info-content gpf-panel__body fr-modal__body";
        var divContent = document.createElement("div");
        div.appendChild(divContent);
        return div;
    }

};

export default ContextMenuDOM;