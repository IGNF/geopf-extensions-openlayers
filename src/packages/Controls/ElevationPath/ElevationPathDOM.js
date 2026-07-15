import checkDsfr from "../Utils/CheckDsfr";

var ElevationPathDOM = {

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
     * @returns {HTMLElement} DOM element
     */
    _createMainContainerElement : function () {
        var container = document.createElement("div");
        container.id = this._addUID("GPelevationPath");
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
     * @returns {HTMLElement} DOM element
     */
    _createShowElevationPathPictoElement : function () {
        // contexte d'execution
        var context = this;

        var button = document.createElement("button");
        // INFO: Ajout d'une SPAN pour enlever des marges de 6px dans CHROMIUM (?!)
        var span = document.createElement("span");
        button.appendChild(span);
        button.id = this._addUID("GPshowElevationPathPicto");
        button.classList.add("GPshowOpen", "GPshowAdvancedToolPicto", "GPshowElevationPathPicto");
        button.classList.add("gpf-btn", "gpf-btn--tertiary", "gpf-btn-icon", "gpf-btn-icon-elevation");
        // button.classList.add("icon--ri", "icon--ri--line-chart-line");
        button.classList.add("fr-btn", "fr-btn--tertiary");
        button.setAttribute("aria-label", "Profil altimétrique");
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", false);
        button.setAttribute("type", "button");

        // gestionnaire d'evenement :
        // on ouvre le menu de saisie de saisie
        // L'ouverture/Fermeture permet de faire le menage
        // (reinitialisation)
        if (button.addEventListener) {
            button.addEventListener("click", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                context.onShowElevationPathClick(e);
            });
        } else if (button.attachEvent) {
            button.attachEvent("onclick", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                context.onShowElevationPathClick(e);
            });
        }

        return button;
    },

    // ################################################################### //
    // ######################### Methods to Panel ######################## //
    // ################################################################### //

    /**
     * Create Container Panel
     *
     * FIXME
     * don't call this._createElevationPathPanelHeaderElement
     * don't call this._createElevationPathPanelProfilElement
     *
     * @returns {HTMLElement} DOM element
     */
    _createElevationPathPanelElement : function () {
        var dialog = document.createElement("dialog");
        dialog.id = this._addUID("GPelevationPathPanel");
        dialog.className = "GPpanel gpf-panel fr-modal";

        // dialog.appendChild(this._createElevationPathPanelHeaderElement());
        // dialog.appendChild(this._createElevationPathPanelProfilElement());

        return dialog;
    },

    _createElevationPathPanelDivElement : function () {
        var div = document.createElement("div");
        div.className = "gpf-panel__body fr-modal__body";
        return div;
    },

    _createDrawingButtonsPluginDiv : function () {
        var div = document.createElement("div");
        div.className = "container-buttons-plugin fr-mx-2w";
        return div;
    },

    /**
     * Create Form
     * see evenement !
     *
     * @returns {HTMLElement} DOM element
     */
    _createElevationPathPanelProfilElement : function () {
        var wrapper = document.createElement("div");
        wrapper.className = "GPelevationPathProfilWrapper";
        var div = document.createElement("div");
        div.id = "GPelevationPathProfil";
        wrapper.appendChild(div);

        return wrapper;
    },

    /**
     * Create Waiting Panel
     *
     * @returns {HTMLElement} DOM element
     */
    _createElevationPathWaitingElement : function () {
        var div = document.createElement("div");
        div.id = this._addUID("GPelevationPathCalcWaitingContainer");
        div.className = "GPwaitingContainer GPwaitingContainerHidden gpf-waiting gpf-waiting--hidden";

        var p = document.createElement("p");
        p.className = "GPwaitingContainerInfo gpf-waiting_info";
        p.innerHTML = "Recherche en cours...";

        div.appendChild(p);

        return div;
    },

    /**
     * Create information Panel
     *
     * @returns {HTMLElement} DOM element
     */
    _createElevationPathInformationsElement : function () {
        var div = document.createElement("div");
        div.id = this._addUID("GPelevationPathInformationsContainer");

        var p = document.createElement("p");
        p.className = "GPelevationPathInformations";
        p.innerHTML = "Aucune information...";
        div.appendChild(p);

        return div;
    },

    /**
     * Add a information into Panel
     *
     * @param {String} name - name of item
     * @param {String} value - value of item
     * @returns {HTMLElement} DOM element
     */
    _addElevationPathInformationsItem : function (name, value) {
        var div = document.getElementById(this._addUID("GPelevationPathInformationsContainer"));

        if (div) {
            var p = document.createElement("p");
            p.className = "GPelevationPathInformations";
            var nameEl = document.createElement("span");
            nameEl.innerText = name;
            var valueEl = document.createElement("span");
            valueEl.innerText = value;
            p.appendChild(nameEl);
            p.appendChild(valueEl);
            div.appendChild(p);
        }

        return div;
    }
};

export default ElevationPathDOM;
