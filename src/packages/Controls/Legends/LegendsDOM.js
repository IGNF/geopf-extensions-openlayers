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
     * @returns {HTMLElement} DOM element
     */
    _createMainContainerElement : function () {
        var container = document.createElement("div");
        container.id = this._addUID("GPlegends");
        container.className = "GPwidget gpf-widget gpf-widget-button gpf-mobile-fullscreen";
        return container;
    },

    // ################################################################### //
    // ################### Methods of main container ##################### //
    // ################################################################### //

    /**
     * Show Legends
     *
     * @returns {HTMLElement} DOM element
     */
    _createShowLegendsPictoElement : function () {
        // contexte d'execution
        var self = this;

        var button = document.createElement("button");
        // INFO: Ajout d'une SPAN pour enlever des marges de 6px dans CHROMIUM (?!)
        var span = document.createElement("span");
        button.appendChild(span);
        button.id = this._addUID("GPshowLegendsPicto");
        button.classList.add("GPshowOpen", "GPshowAdvancedToolPicto", "GPshowLegendsPicto");
        button.classList.add("gpf-btn", "gpf-btn--tertiary", "gpf-btn-icon", "gpf-btn-icon-legends");
        // button.classList.add("icon--ri", "icon--ri--list-indefinite");
        button.classList.add("fr-btn", "fr-btn--tertiary");
        button.setAttribute("aria-label", "Légende");
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", false);
        button.setAttribute("type", "button");

        // Close all results and panels when minimizing the widget
        if (button.addEventListener) {
            button.addEventListener("click", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                self.onShowLegendsClick(e);
            });
        } else if (button.attachEvent) {
            button.attachEvent("onclick", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                self.onShowLegendsClick(e);
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
    _createLegendsPanelElement : function () {
        var dialog = document.createElement("dialog");
        dialog.id = this._addUID("GPlegendsPanel");
        dialog.className = "GPpanel gpf-panel fr-modal";

        return dialog;
    },

    _createLegendsPanelDivElement : function () {
        var div = document.createElement("div");
        div.className = "gpf-panel__legends";
        return div;
    },

    // ################################################################### //
    // ####################### Methods dynamics ########################## //
    // ################################################################### //

    _createLegendElement : function () {
        var div = document.createElement("div");
        div.className = "legends-entries gpf-panel__body fr-modal__body";
        return div;
    },

    _createLegendEntry : function (o) {
        // Liste des informations :
        // id
        // title
        // legends
        // metadatas
        // desc
        // url
        // partners

        const stringToHTML = (str) => {
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
        };

        if (o) {
            if (o.legends && o.legends.length) {
                var url = o.legends[0].url; // 1ere valeur par defaut
                var entry = stringToHTML(`
                    <div
                        id="${o.id}"
                        class="legend-entry-container">
                        <label class="legend-entry-title gpf-label-legends-name fr-label">${o.title}</label>
                        <button
                            id="GPcollapseLegend_ID_${o.id}"
                            class="legend-entry-show gpf-btn gpf-btn-icon gpf-btn-icon-legends-collapse fr-btn fr-btn--tertiary gpf-btn--tertiary"
                            type="button"
                            title=""
                            tabindex="0"
                            aria-pressed="false"></button>
                        <div id="GPlegend_ID_${o.id}" class="legend-entry-image gpf-hidden">
                            <div>
                                <div class="placeholder"></div>
                                <img class="fr-fluid-img" src="${url}" alt="" loading="lazy" />
                            </div>
                            <p>
                                <a href="${url}" target="_blank" class="fr-link fr-text--xs">Ouvrir la légende dans un nouvel onglet</a>
                            </p>
                        </div>
                    </div>
                `);
                // add event click button
                var button = entry.firstChild.querySelector("button");
                if (button) {
                    button.addEventListener("click", (e) => {
                        var status = (e.target.ariaPressed === "true");
                        e.target.setAttribute("aria-pressed", !status);
                        var element = document.getElementById("GPlegend_ID_" + o.id);
                        (status) ?
                            element.classList.replace("gpf-visible", "gpf-hidden") : element.classList.replace("gpf-hidden", "gpf-visible");
                    });
                }
                return entry.firstChild;
            }
        }
    }

};

export default LegendsDOM;
