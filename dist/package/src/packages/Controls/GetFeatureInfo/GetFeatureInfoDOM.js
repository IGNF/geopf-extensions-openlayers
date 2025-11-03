var GetFeatureInfoDOM = {

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
    * String to html
    * @param {String} str -string to convert
    * @returns {HTMLElement} return dom element
    */
    stringToHTML : function (str) {
        var support = function () {
            if (!window.DOMParser) {
                return false;
            }
            var parser = new DOMParser();
            try {
                parser.parseFromString("x", "text/html");
            } catch (err) {
                return false;
            }
            return true;
        };

        // If DOMParser is supported, use it
        if (support()) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(str, "text/html");
            return doc.body;
        }

        // Otherwise, fallback to old-school method
        var dom = document.createElement("div");
        dom.innerHTML = str;
        return dom;
    },

    /**
     * Main container (DOM)
     *
     * @returns {HTMLElement} DOM element
     */
    _createMainContainerElement : function () {
        var container = document.createElement("div");
        container.id = this._addUID("GPgetFeatureInfo");
        container.className = "GPgetFeatureInfo gpf-widget gpf-widget-button gpf-mobile-fullscreen";
        return container;
    },

    // ################################################################### //
    // ################### Methods of main container ##################### //
    // ################################################################### //

    /**
     * Show GetFeatureInfo
     *
     * @returns {HTMLElement} DOM element
     */
    _createShowGetFeatureInfoPictoElement : function () {
        var self = this;

        var button = document.createElement("button");
        // INFO: Ajout d'une SPAN pour enlever des marges de 6px dans CHROMIUM (?!)
        var span = document.createElement("span");
        button.appendChild(span);
        button.id = this._addUID("GPgetFeatureInfoPicto");
        button.className = "GPshowOpen GPshowAdvancedToolPicto GPgetFeatureInfoPicto gpf-btn gpf-btn--tertiary gpf-btn-icon gpf-btn-icon-getfeatureinfo fr-btn fr-btn--tertiary";
        button.setAttribute("aria-label", "Activer/désactiver l'interrogation des couches");
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", false);
        button.setAttribute("type", "button");

        // Close all results and panels when minimizing the getFeatureInfo
        if (button.addEventListener) {
            button.addEventListener("click", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                self.onShowGetFeatureInfoClick(e);
            });
        } else if (button.attachEvent) {
            button.attachEvent("onclick", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                self.onShowGetFeatureInfoClick(e);
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
    _createGetFeatureInfoPanelElement : function () {
        var dialog = document.createElement("dialog");
        dialog.id = this._addUID("GPgetFeatureInfoPanel");
        dialog.className = "GPpanel gpf-panel fr-modal";

        return dialog;
    },

    _createGetFeatureInfoPanelDivElement : function () {
        var div = document.createElement("div");
        div.className = "GPpanelBody fr-modal__body";
        return div;
    },

    /**
     * Create Header Panel
     *
     * @returns {HTMLElement} DOM element
     */
    _createGetFeatureInfoPanelHeaderElement : function () {
        var container = document.createElement("div");
        container.className = "GPpanelHeader gpf-panel__header_gfi";
        return container;
    },
    _createGetFeatureInfoPanelIconElement : function () {
        var label = document.createElement("label");
        label.className = "GPpanelIcon gpf-btn-header_gfi gpf-btn-icon-header_gfi";
        label.title = "Get Feature Info";
        return label;
    },
    _createGetFeatureInfoPanelTitleElement : function () {
        var div = document.createElement("div");
        div.className = "GPpanelTitle gpf-panel__title_gfi fr-modal__title";
        div.innerHTML = "Infos sur les couches";
        return div;
    },
    _createGetFeatureInfoPanelCloseElement : function () {
        var self = this;

        var btnClose = document.createElement("button");
        btnClose.className = "GPpanelClose GPcloseGetFeatureInfo gpf-btn gpf-btn-icon-close fr-btn--close fr-btn fr-btn--tertiary-no-outline";
        btnClose.title = "Fermer le panneau";

        // Link panel close / visibility checkbox
        if (btnClose.addEventListener) {
            btnClose.addEventListener("click", function (e) {
                btnClose.setAttribute("aria-pressed", false);
                self.onCloseGetFeatureInfoClick();
            }, false);
        } else if (btnClose.attachEvent) {
            btnClose.attachEvent("onclick", function (e) {
                btnClose.setAttribute("aria-pressed", false);
                self.onCloseGetFeatureInfoClick();
            });
        }

        var span = document.createElement("span");
        span.className = "GPelementHidden gpf-visible"; // afficher en dsfr
        span.innerText = "Fermer";

        btnClose.appendChild(span);

        return btnClose;
    },

    /**
     * Create loader
     * @returns {HTMLElement} DOM element
     */
    _createGetFeatureInfoWaitingDiv : function () {
        var waitingDivString = `
        <div class="waiting-div-container"><div class="lds-ring"><div></div><div></div><div></div><div></div></div><div>
        `;
        return waitingDivString;
    },

    /**
     * String to html
     * @param {String} noDataMessage - string à afficher en message de noData du GFI
     * @returns {DOMElement} DOM element
     */
    _createGetFeatureInfoNoData : function (noDataMessage) {
        // contexte d'execution
        // var self = this;
        var div = document.createElement("div");
        div.className = "GPgetFeatureInfoNoData fr-py-2w fr-px-2w";
        console.log(this.stringToHTML(noDataMessage));
        div.insertAdjacentHTML("beforeend", noDataMessage);
        return div;
    },

    // ################################################################### //
    // ####################### Methods for Layer GFI ####################### //
    // ################################################################### //

    /**
     * Create group d'accodeon
     * @returns {HTMLElement} DOM element
     */
    _createGetFeatureInfoAccordionGroup : function () {
        // contexte d'execution
        var self = this;

        var div = document.createElement("div");
        div.id = this._addUID("GPgetFeatureInfoAccordionGroup");
        div.className = "GPgetFeatureInfoAccordionGroup fr-accordions-group";

        return div;
    },

    /**
     * Create accordeon
     * see evenement !
     * @param { String } layername nom du layer
     * @param { String } content contenu du gfi
     * @returns {HTMLElement} DOM element
     */
    _createGetFeatureInfoLayerAccordion : function (layername) {
        var dsfrTemplate = this.stringToHTML(`
            <section class="fr-accordion">
                <h3 class="fr-accordion__title">
                    <button class="GPgfiLayerButton fr-accordion__btn" aria-expanded="false" aria-controls="accordion-${layername}">
                        <span class="GPshowGfiLayerFeature"></span>
                        <span id="gfiLayerName">${layername}</span>
                    </button>
                </h3>
                <div class="fr-collapse GPgetFeatureInfoAccordionContent GPelementHidden" id="accordion-${layername}" style="margin:unset;">
                    ${this._createGetFeatureInfoWaitingDiv()}
                </div>
            </section>
        `);
        var accordeon = dsfrTemplate.firstChild;
        var button = accordeon.querySelector("button, button.fr-accordion__btn");
        button.addEventListener("click", (e) => {
            e.currentTarget.ariaExpanded = !(e.currentTarget.ariaExpanded === "true");
            var collapse = document.getElementById(e.currentTarget.getAttribute("aria-controls"));
            if (e.currentTarget.ariaExpanded === "true") {
                collapse.classList.add("fr-collapse--expanded");
                collapse.classList.remove("GPelementHidden");
                // on centre la vue dans le dialog sur le bouton cliqué
                requestAnimationFrame(() => {
                    button.scrollIntoView({
                        behavior : "smooth",
                        block : "start",
                        inline : "nearest"
                    });
                });
            } else {
                collapse.classList.remove("fr-collapse--expanded");
                collapse.classList.add("GPelementHidden");
            }
        });
        return accordeon;
    },

};

export default GetFeatureInfoDOM;
