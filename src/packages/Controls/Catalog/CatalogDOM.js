var title = "";

var CatalogDOM = {

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
        container.id = this._addUID("GPcatalog");
        container.className = "GPwidget gpf-widget gpf-widget-button";
        return container;
    },

    // ################################################################### //
    // ################### Methods of main container ##################### //
    // ################################################################### //

    /**
     * Show Catalog
     *
     * @returns {DOMElement} DOM element
     */
    _createShowCatalogPictoElement : function () {
        var self = this;

        var button = document.createElement("button");
        button.id = this._addUID("GPshowCatalogPicto");
        button.className = "GPshowOpen GPshowAdvancedToolPicto GPshowCatalogPicto gpf-btn gpf-btn-icon gpf-btn-icon-catalog fr-btn";
        button.title = `${title}`;
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", false);
        button.setAttribute("type", "button");

        // Close all results and panels when minimizing the widget
        if (button.addEventListener) {
            button.addEventListener("click", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                self.onShowCatalogClick();
            });
        } else if (button.attachEvent) {
            button.attachEvent("onclick", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                self.onShowCatalogClick();
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
    _createCatalogPanelElement : function () {
        var dialog = document.createElement("dialog");
        dialog.id = this._addUID("GPcatalogPanel");
        dialog.className = "GPpanel gpf-panel fr-modal";

        return dialog;
    },

    _createCatalogPanelDivElement : function () {
        var div = document.createElement("div");
        div.className = "gpf-panel__body fr-modal__body";
        return div;
    },

    _createCatalogPanelContentElement : function () {
        var div = document.createElement("div");
        div.className = "gpf-panel__content fr-modal__content";
        return div;
    },

    /**
     * Create Header Panel
     *
     * @returns {DOMElement} DOM element
     */
    _createCatalogPanelHeaderElement : function () {
        var container = document.createElement("div");
        container.className = "gpf-panel__header fr-modal__header";
        return container;
    },
    _createCatalogPanelTitleElement : function () {
        var div = document.createElement("div");
        div.className = "gpf-panel__title fr-modal__title fr-pt-4w";
        div.innerHTML = `${title}`;
        return div;
    },
    _createCatalogPanelCloseElement : function () {
        var self = this;

        var btnClose = document.createElement("button");
        btnClose.className = "gpf-btn gpf-btn-icon-close fr-btn--close fr-btn fr-btn--tertiary-no-outline fr-m-1w";
        btnClose.title = "Fermer le panneau";

        // Link panel close / visibility checkbox
        if (btnClose.addEventListener) {
            btnClose.addEventListener("click", function () {
                document.getElementById(self._addUID("GPshowCatalogPicto")).click();
                self.onCloseCatalogClick();
            }, false);
        } else if (btnClose.attachEvent) {
            btnClose.attachEvent("onclick", function () {
                document.getElementById(self._addUID("GPshowCatalogPicto")).click();
                self.onCloseCatalogClick();
            });
        }

        var span = document.createElement("span");
        span.className = "GPelementHidden gpf-visible"; // afficher en dsfr
        span.innerText = "Fermer";

        btnClose.appendChild(span);

        return btnClose;
    },

    // ################################################################### //
    // ####################### Methods for panel ######################### //
    // ################################################################### //
    
    _createCatalogContentEntries : function () {
        return `<div class="catalog-container-content" style="padding:10px">
         <!-- titre -->
         <div class="catalog-container-title">
            <div class="fr-title">
                <h5 style="margin:unset">Gérer vos couches de données</h5>
            </div>
         </div>
         <!-- barre de recherche -->
         <!-- https://www.systeme-de-design.gouv.fr/composants-et-modeles/composants/barre-de-recherche -->
         <div class="catalog-container-search" style="padding-top:10px;padding-bottom:20px">
            <div class="fr-search-bar" id="header-search" role="search">
                <label class="fr-label" for="search-input">
                    Recherche
                </label>
                <input class="fr-input" placeholder="Rechercher" type="search" id="search-input" name="search-input">
                <button class="fr-btn" title="Rechercher">
                    Rechercher
                </button>
            </div>
         </div>
         <!-- onglets -->
         <!-- https://www.systeme-de-design.gouv.fr/composants-et-modeles/composants/onglet -->
         <div class="catalog-container-tabs">
            <div class="fr-tabs">
                    <ul class="fr-tabs__list" role="tablist" aria-label="[A modifier | nom du système d'onglet]">
                        <li role="presentation">
                            <button id="tabpanel-404" class="fr-tabs__tab" tabindex="-1" role="tab" aria-selected="false" aria-controls="tabpanel-404-panel">Label Tab 1</button>
                        </li>
                        <li role="presentation">
                            <button id="tabpanel-406" class="fr-tabs__tab" tabindex="0" role="tab" aria-selected="true" aria-controls="tabpanel-406-panel">Label Tab 2</button>
                        </li>
                    </ul>
                    <div id="tabpanel-404-panel" class="fr-tabs__panel" role="tabpanel" aria-labelledby="tabpanel-404" tabindex="0">
                        <!-- données de test -->
                        <p>
                            <div class="tabcontent">Test 1</div>
                        </p>
                    </div>
                    <div id="tabpanel-406-panel" class="fr-tabs__panel fr-tabs__panel--selected" role="tabpanel" aria-labelledby="tabpanel-406" tabindex="0">
                        <!-- données de test -->
                        <p>
                            <div class="tabcontent">
                                <fieldset class="fr-fieldset" id="checkboxes" aria-labelledby="checkboxes-legend checkboxes-messages">
                                    <div class="fr-fieldset__element">
                                        <div class="fr-checkbox-group">
                                            <input name="checkboxes-1" id="checkboxes-1" type="checkbox" aria-describedby="checkboxes-1-messages">
                                            <label class="fr-label" for="checkboxes-1">
                                                Libellé case à cocher
                                            </label>
                                            <div class="fr-messages-group" id="checkboxes-1-messages" aria-live="assertive">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="fr-fieldset__element">
                                        <div class="fr-checkbox-group">
                                            <input checked name="checkboxes-2" id="checkboxes-2" type="checkbox" aria-describedby="checkboxes-2-messages">
                                            <label class="fr-label" for="checkboxes-2">
                                                Libellé case à cocher
                                            </label>
                                            <div class="fr-messages-group" id="checkboxes-2-messages" aria-live="assertive">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="fr-fieldset__element">
                                        <div class="fr-checkbox-group">
                                            <input name="checkboxes-3" id="checkboxes-3" type="checkbox" aria-describedby="checkboxes-3-messages">
                                            <label class="fr-label" for="checkboxes-3">
                                                Libellé case à cocher
                                            </label>
                                            <div class="fr-messages-group" id="checkboxes-3-messages" aria-live="assertive">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="fr-messages-group" id="checkboxes-messages" aria-live="assertive">
                                    </div>
                                </fieldset>
                            </div>
                        </p>
                    </div>
            </div>
         </div>
        </div>`;
    }

};

export default CatalogDOM;