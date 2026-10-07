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
     * @returns {HTMLElement} DOM element
     */
    _createMainContainerElement : function () {
        var container = document.createElement("div");
        container.id = this._addUID("GPpointInfo");
        container.className = "GPpointInfo GPwidget gpf-widget";
        return container;
    },

    // ################################################################### //
    // ################### Methods of main container ##################### //
    // ################################################################### //

    /**
 * Show PointInfo
 *
 * @returns {HTMLElement} DOM element
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
 * @returns {HTMLElement} DOM element
 */
    _createPointInfoPanelElement : function () {
        var dialog = document.createElement("dialog");
        dialog.id = this._addUID("GPpointInfoPanel");
        dialog.className = "GPpanel gpf-panel fr-modal";

        return dialog;
    },

    _createPointInfoPanelDivElement : function () {
        var div = document.createElement("div");
        div.className = "gpf-panel__body fr-modal__body";
        return div;
    },

    // ################################################################### //
    // ####################### Methods for entries ####################### //
    // ################################################################### //

    _createEntriesElement : function () {
        var div = document.createElement("div");
        div.className = "point-info-content gpf-panel__content fr-modal__content";
        var divContent = document.createElement("div");
        div.appendChild(divContent);
        return div;
    },

    _createPinDOMOverlay : function (ImgURL) {
        var div = document.createElement("div");
        var img = document.createElement("img");
        img.src = ImgURL;
        div.appendChild(img);
        return div;
    }
};

export default ContextMenuDOM;