var LegendsDOM = {

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
        container.id = this._addUID("GPlegends");
        container.className = "GPwidget gpf-widget gpf-widget-button";
        return container;
    },

    // ################################################################### //
    // ################### Methods of main container ##################### //
    // ################################################################### //

    /**
     * Show Legends
     *
     * @returns {DOMElement} DOM element
     */
    _createShowLegendsPictoElement : function () {
        // contexte d'execution
        var self = this;

        var button = document.createElement("button");
        button.id = this._addUID("GPshowLegendsPicto");
        button.className = "GPshowOpen GPshowAdvancedToolPicto GPshowLegendsPicto gpf-btn gpf-btn-icon gpf-btn-icon-legends fr-btn";
        button.title = "Afficher les légendes";
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", false);
        button.setAttribute("type", "button");

        // Close all results and panels when minimizing the widget
        if (button.addEventListener) {
            button.addEventListener("click", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                self.onShowLegendsClick();
            });
        } else if (button.attachEvent) {
            button.attachEvent("onclick", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                self.onShowLegendsClick();
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
    _createLegendsPanelElement : function () {
        var dialog = document.createElement("dialog");
        dialog.id = this._addUID("GPlegendsPanel");
        dialog.className = "GPpanel gpf-panel fr-modal";

        return dialog;
    },

    _createLegendsPanelDivElement : function () {
        var div = document.createElement("div");
        div.className = "gpf-panel__body fr-modal__body";
        return div;
    },

    /**
     * Create Header Panel
     *
     * @returns {DOMElement} DOM element
     */
    _createLegendsPanelHeaderElement : function () {
        var container = document.createElement("div");
        container.className = "GPpanelHeader gpf-panel__header fr-modal__header";
        return container;
    },
    _createLegendsPanelIconElement : function () {
        var label = document.createElement("label");
        label.className = "GPpanelIcon gpf-btn-header gpf-btn-icon-legends";
        label.title = "Légendes";
        return label;
    },
    _createLegendsPanelTitleElement : function () {
        var div = document.createElement("div");
        div.className = "GPpanelTitle gpf-panel__title_legends";
        div.id = this._addUID("GPlegendsHeaderTitle");
        div.innerHTML = "Légendes";
        return div;
    },
    _createLegendsPanelCloseElement : function () {
        // contexte
        var self = this;

        var btnClose = document.createElement("button");
        btnClose.id = this._addUID("GPlegendsPanelClose");
        btnClose.className = "GPpanelClose GPlegendsPanelClose gpf-btn gpf-btn-icon-close fr-btn--close fr-btn fr-btn--tertiary-no-outline fr-m-1w";
        btnClose.title = "Fermer le panneau";

        // Link panel close / visibility checkbox
        if (btnClose.addEventListener) {
            btnClose.addEventListener("click", function () {
                document.getElementById(self._addUID("GPshowLegendsListPicto")).click();
            }, false);
        } else if (btnClose.attachEvent) {
            btnClose.attachEvent("onclick", function () {
                document.getElementById(self._addUID("GPshowLegendsListPicto")).click();
            });
        }

        return btnClose;
    },


    // ################################################################### //
    // ####################### Methods dynamics ########################## //
    // ################################################################### //

    _createLegendEntry : function (o) {
        console.log(o);
        // <div id="${ID}" class="legend-entry">
        //     <input type="checkbox" 
        //         id="legend-entry-${ID}-show">
        //     <label 
        //         for="legend-entry-${ID}-show" 
        //         class="legend-entry-title">${TITLE}</label>
        //     <p class="legend-entry-container">
        //         <img src="${URL}" alt="${DESCRIPTION}">
        //     </p>
        // </div>
    }

};

export default LegendsDOM;