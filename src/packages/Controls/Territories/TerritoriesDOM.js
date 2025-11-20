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

var TerritoriesDOM = {

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
        container.id = this._addUID("GPterritories");
        container.className = "GPwidget gpf-widget gpf-widget-button gpf-mobile-fullscreen";
        return container;
    },

    // ################################################################### //
    // ################### Methods of main container ##################### //
    // ################################################################### //

    /**
     * Show Territories
     *
     * @returns {HTMLElement} DOM element
     */
    _createShowTerritoriesPictoElement : function () {
        var self = this;

        var button = document.createElement("button");
        // INFO: Ajout d'une SPAN pour enlever des marges de 6px dans CHROMIUM (?!)
        var span = document.createElement("span");
        button.appendChild(span);
        button.id = this._addUID("GPshowTerritoriesPicto");
        button.classList.add("GPshowOpen", "GPshowAdvancedToolPicto", "GPshowTerritoriesPicto");
        button.classList.add("gpf-btn", "gpf-btn--tertiary", "gpf-btn-icon", "gpf-btn-icon-territories");
        button.classList.add("fr-icon-france-line");
        button.classList.add("fr-btn", "fr-btn--tertiary");
        button.setAttribute("aria-label", "Sélecteur de territoire");
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", false);
        button.setAttribute("type", "button");

        // Close all results and panels when minimizing the widget
        if (button.addEventListener) {
            button.addEventListener("click", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                self.onShowTerritoriesClick(e);
            });
        } else if (button.attachEvent) {
            button.attachEvent("onclick", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                self.onShowTerritoriesClick(e);
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
    _createTerritoriesPanelElement : function () {
        var dialog = document.createElement("dialog");
        dialog.id = this._addUID("GPterritoriesPanel");
        dialog.className = "GPpanel gpf-panel fr-modal";

        return dialog;
    },

    _createTerritoriesPanelDivElement : function () {
        var div = document.createElement("div");
        div.className = "gpf-panel__territories";
        return div;
    },

    /**
     * Create Header Panel
     *
     * @returns {HTMLElement} DOM element
     */
    _createTerritoriesPanelHeaderElement : function () {
        var container = document.createElement("div");
        container.className = "gpf-panel__header_territories";
        return container;
    },
    _createTerritoriesPanelIconElement : function () {
        var label = document.createElement("label");
        label.className = "gpf-btn-header-territories gpf-btn-icon-header-territories";
        label.title = "Selecteur de territoires";
        return label;
    },
    _createTerritoriesPanelTitleElement : function (title) {
        var div = document.createElement("div");
        div.className = "gpf-panel__title_territories";
        div.innerHTML = title;
        return div;
    },
    _createTerritoriesPanelCloseElement : function () {
        var self = this;

        var btnClose = document.createElement("button");
        btnClose.id = "GPterritoriesPanelClose";
        btnClose.className = "gpf-btn gpf-btn-icon-close fr-btn--close fr-btn fr-btn--tertiary-no-outline fr-m-1w";
        btnClose.title = "Fermer le panneau";

        var span = document.createElement("span");
        span.className = "GPelementHidden gpf-visible"; // afficher en dsfr
        span.innerText = "Fermer";

        btnClose.appendChild(span);

        // Link panel close / visibility checkbox
        if (btnClose.addEventListener) {
            btnClose.addEventListener("click", function () {
                document.getElementById(self._addUID("GPshowTerritoriesPicto")).click();
                self.onCloseTerritoriesClick();
            }, false);
        } else if (btnClose.attachEvent) {
            btnClose.attachEvent("onclick", function () {
                document.getElementById(self._addUID("GPshowTerritoriesPicto")).click();
                self.onCloseTerritoriesClick();
            });
        }

        return btnClose;
    },
    _createTerritoriesPanelOptionsElement : function (title, description) {
        var self = this;

        var content = "&#x2630";

        var idButton = "gpf-territories-button-option-id";
        var idInputUpload = "gpf-territories-upload-id";
        var idClose = "gpf-territories-upload-close-id";
        var idToggle = "gpf-territories-toggle-messages";
        var idBtnModify = "gpf-territories-modify-id";

        var strContainer = `
        <div>
            <button type="button" 
                id="${idButton}"
                class="fr-btn fr-btn--tertiary-no-outline" 
                role="territories-button-options" 
                aria-expanded="false" 
                aria-controls="gpf-territories-upload-container-id">
                ${content}
            </button>
            <dialog id="gpf-territories-upload-container-id" class="fr-modal__body fr-upload-group gpf-hidden">
                <div class="gpf-territories-header-upload">
                    <button 
                        id="${idClose}"
                        type="button" 
                        class="gpf-btn gpf-btn-icon-close fr-btn--close fr-btn fr-btn--tertiary-no-outline fr-m-1w"
                        aria-expanded="false"
                        title="Fermer le panneau">
                        <span>Fermer</span>
                    </button>
                </div>
                <label class="fr-label">
                    ${title}
                    <span class="fr-hint-text">${description}</span>
                </label>
                <fieldset class="fr-fieldset">
                    <div class="fr-fieldset__element">
                        <div class="fr-toggle fr-m-2v">
                            <input 
                                id="${idToggle}" 
                                class="fr-toggle__input" 
                                type="checkbox" 
                                aria-describedby="gpf-territories-toggle-messages">
                            <label class="fr-toggle__label" for="${idToggle}">Compléter la liste</label>
                            <div class="fr-messages-group" id="gpf-territories-toggle-messages" aria-live="polite"></div>
                        </div>
                    </div>
                    <div class="fr-fieldset__element">
                        <input 
                            id="${idInputUpload}" 
                            class="fr-upload" 
                            aria-describedby="gpf-territories-upload-id-messages" 
                            type="file" 
                            name="upload">
                        <div class="fr-messages-group" id="gpf-territories-upload-id-messages" aria-live="polite"></div>
                    </div>
                </fieldset>
                <fieldset class="fr-fieldset">
                    <button 
                        id="${idBtnModify}" 
                        class="gpf-button gpf-button fr-btn--tertiary fr-btn--tertiary" 
                        aria-describedby="gpf-territories-modify-id-messages">Modifier les territoires</button>
                    <div class="fr-messages-group" id="gpf-territories-modify-id-messages" aria-live="polite"></div>
                </fieldset>
            </dialog>
        </div>
        `;
        var container = stringToHTML(strContainer);

        // ajout du shadow DOM pour creer les listeners
        const shadow = container.attachShadow({ mode : "open" });
        shadow.innerHTML = strContainer.trim();

        var button = shadow.getElementById(idButton);
        if (button) {
            button.addEventListener("click", (e) => {
                e.target.ariaExpanded = !(e.target.ariaExpanded === "true");
                var collapse = document.getElementById(e.target.getAttribute("aria-controls"));
                if (!collapse) {
                    return;
                }
                if (e.target.ariaExpanded === "true") {
                    collapse.classList.add("gpf-visible");
                    collapse.classList.remove("gpf-hidden");
                } else {
                    collapse.classList.remove("gpf-visible");
                    collapse.classList.add("gpf-hidden");
                }
            }, false);
        }

        var close = shadow.getElementById(idClose);
        if (close) {
            close.addEventListener("click", (e) => {
                e.target.ariaExpanded = !(e.target.ariaExpanded === "true");
                var button = document.getElementById(idButton);
                button.click();
            });
        }

        // INFO
        // https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications
        var inputUpload = shadow.getElementById(idInputUpload);
        if (inputUpload) {
            inputUpload.addEventListener("change", (e) => {
                self.onUploadFileClick(e);
            }, false);
        }

        var toggle = shadow.getElementById(idToggle);
        if (idToggle) {
            toggle.addEventListener("click", (e) => {
                console.log(e.target.checked);
                self.onUploadToggleClick(e);
            });
        }

        var inputModify = shadow.getElementById(idBtnModify);
        if (inputModify) {
            inputModify.addEventListener("change", (e) => {
                // TODO: A implémenter
                self.onModifyTerritoriesClick(e);
            }, false);
        }
        return shadow.firstChild;
    },

    // ################################################################### //
    // ####################### Methods for entries ####################### //
    // ################################################################### //

    _createTerritoriesElement : function () {
        var div = document.createElement("div");
        div.className = "territories-entries gpf-panel__body_territories fr-modal__body";
        return div;
    },

    _createTerritoryEntry : function (o) {
        var self = this;
        
        if (o) {
            // test si la vignette est renseignée
            var defaultImage = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB3aWR0aD0iNTgxLjAwMDAwMHB0IiBoZWlnaHQ9IjM1Ni4wMDAwMDBwdCIgdmlld0JveD0iMCAwIDU4MS4wMDAwMDAgMzU2LjAwMDAwMCIKIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPgoKPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsMzU2LjAwMDAwMCkgc2NhbGUoMC4xMDAwMDAsLTAuMTAwMDAwKSIKZmlsbD0iI2I0YjNiMyIgc3Ryb2tlPSJub25lIj4KPHBhdGggZD0iTTAgMTc4MCBsMCAtMTc4MCAyOTA1IDAgMjkwNSAwIDAgMTc4MCAwIDE3ODAgLTI5MDUgMCAtMjkwNSAwIDAKLTE3ODB6Ii8+CjwvZz4KPC9zdmc+Cg==";
            var thumbnail = o.thumbnail || defaultImage;
            var icon = o.icon || defaultImage;
            var id = o.id.toLowerCase();
            // tile dsfr
            var entry = stringToHTML(`
            <div class="gpf-tile fr-tile fr-tile--sm">
                <div class="fr-tile__body">
                    <div class="fr-tile__content">
                        <p class="fr-tile__title">
                            <label class="gpf-label fr-label" title="${o.description}">${o.title}</label>
                        </p>
                    </div>
                </div>
                <div class="gpf-tile__header fr-tile__header">
                    <div class="fr-tile__pictogram fr-tile__thumbnail">
                        <img id="thumbnail-${o.id}" src="${thumbnail}" width="100%" height="100%" title="${o.description}"/>
                    </div>
                    <div class="fr-tile__pictogram fr-tile__icon fr-tile__icon--${id}">
                        <svg>       
                            <image id="icon-${o.id}" xlink:href="${icon}" style="width:100%;"/>    
                        </svg>
                    </div>
                </div>
            </div>
            `);
            // add event click on main div
            var div = entry.firstChild;
            if (div) {
                div.addEventListener("click", (e) => {
                    self.onImageTerritoriesClick(e, o.id);
                });
            }
            return entry.firstChild;
        }
    }

};

export default TerritoriesDOM;
