var MeasureAzimuthDOM = {

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
        container.id = this._addUID("GPmeasureAzimuth");
        container.className = "GPwidget gpf-widget";
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
    _createShowMeasureAzimuthPictoElement : function () {
        // contexte d'execution
        var context = this;

        var button = document.createElement("button");
        button.id = this._addUID("GPshowMeasureAzimuthPicto");
        button.className = "GPshowOpen GPshowAdvancedToolPicto gpf-btn fr-btn";
        button.title = "Mesurer un azimut";
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", false);


        // gestionnaire d'evenement :
        // on ouvre le menu de saisie...
        // L'ouverture/Fermeture permet de faire le menage
        // (reinitialisation)
        if (button.addEventListener) {
            button.addEventListener("click", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                context.onShowMeasureAzimuthClick(e);
            });
        } else if (button.attachEvent) {
            button.attachEvent("onclick", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                context.onShowMeasureAzimuthClick(e);
            });
        }

        return button;
    }
};

export default MeasureAzimuthDOM;