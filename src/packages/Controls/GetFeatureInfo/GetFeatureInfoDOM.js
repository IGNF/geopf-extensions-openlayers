var GetFeatureInfoDOM = {

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
        container.id = this._addUID("GPgetFeatureInfo");
        container.className = "GPwidget";
        return container;
    },

    // ################################################################### //
    // ################# Methods to display Main Panel ################### //
    // ################################################################### //

    /**
     * Creation du container du picto du controle (DOM)
     * @returns {DOMElement} DOM element
     */
    _createMainPictoElement : function () {
        var self = this;

        var button = document.createElement("button");
        button.id = this._addUID("GPgetFeatureInfoPicto");
        button.className = "GPshowOpen GPshowAdvancedToolPicto";
        button.title = "activer/desactiver l'interrogation des couches";
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", false);

        if (button.addEventListener) {
            button.addEventListener("click", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                self.onActivateGetFeatureInfoElementChange(e);
            });
        } else if (button.attachEvent) {
            button.attachEvent("onclick", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                self.onActivateGetFeatureInfoElementChange(e);
            });
        }
        return button;
    }
};

export default GetFeatureInfoDOM;
