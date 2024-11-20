var MeasureLengthDOM = {

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
        container.id = this._addUID("GPmeasureLength");
        container.className = "GPwidget gpf-widget gpf-widget-button";
        return container;
    },

    // ################################################################### //
    // ################### Methods of main container ##################### //
    // ################################################################### //

    /**
     * Show control
     * see event !
     *
     * @returns {DOMElement} DOM element
     */
    _createShowMeasureLengthPictoElement : function () {
        // contexte d'execution
        var context = this;

        var button = document.createElement("button");
        // INFO: Ajout d'une SPAN pour enlever des marges de 6px dans CHROMIUM (?!)
        var span = document.createElement("span");
        button.appendChild(span);
        button.id = this._addUID("GPshowMeasureLengthPicto");
        button.className = "GPshowOpen GPshowAdvancedToolPicto gpf-btn gpf-btn--tertiary gpf-btn-icon gpf-btn-icon-length fr-btn fr-btn--tertiary";
        button.setAttribute("aria-label", "Mesurer une distance");
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", false);
        button.setAttribute("type", "button");

        // gestionnaire d'evenement :
        // on ouvre le menu de saisie...
        // L'ouverture/Fermeture permet de faire le menage
        // (reinitialisation)
        if (button.addEventListener) {
            button.addEventListener("click", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                context.onShowMeasureLengthClick(e);
            });
        } else if (button.attachEvent) {
            button.attachEvent("onclick", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                context.onShowMeasureLengthClick(e);
            });
        }

        return button;
    }
};

export default MeasureLengthDOM;
