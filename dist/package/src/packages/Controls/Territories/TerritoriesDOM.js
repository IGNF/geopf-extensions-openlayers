import Sortable from "sortablejs";

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
     * https://github.com/SortableJS/Sortable?tab=readme-ov-file#options
     * @param {*} elementDraggable - element to make draggable
     * @param {*} context - context for the draggable element
     * @returns {*} Sortable instance
     */
    createDraggableElement : function (elementDraggable, context) {
        const sortable = Sortable.create(elementDraggable, {
            animation : 150,
            handle : ".gpf-btn-icon-territories-draggable",
            draggable : ".draggable-territories-view",
            ghostClass : "gpf-territories-view-ghost",
            onEnd : function (e) {
                context.onReorderTerritoriesViews(e);
            }
        });
        return sortable;     
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
        button.setAttribute("aria-label", "Sélectionner un territoire");
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
        var idBtnApply = "gpf-territories-apply-id";

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
                        id="${idBtnApply}" 
                        class="gpf-button gpf-button fr-btn fr-btn--tertiary" 
                        aria-describedby="gpf-territories-apply-id-messages">Appliquer</button>
                    <div class="fr-messages-group" id="gpf-territories-apply-id-messages" aria-live="polite"></div>
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

        var inputApply = shadow.getElementById(idBtnApply);
        if (inputApply) {
            inputApply.addEventListener("click", (e) => {
                self.onApplyTerritoriesClick(e);
            }, false);
        }
        return shadow.firstChild;
    },

    // ################################################################### //
    // ####################### Methods for dialog  ####################### //
    // ################################################################### //
    _createTerritoriesPanelMenuViewsDivElement : function (title, description) {
        var div = document.createElement("div");
        div.className = "territories-views gpf-panel__menuviews_territories";
        div.appendChild(this._createTerritoriesButtonOpenMenuViewsElement(title, description));
        div.appendChild(this._createTerritoriesPanelMenuViewsElement(title));
        return div;
    },

    _createTerritoriesButtonOpenMenuViewsElement : function (title, description) {
        var self = this;

        var button = document.createElement("button");
        // INFO: Ajout d'une SPAN pour enlever des marges de 6px dans CHROMIUM (?!)
        var span = document.createElement("span");
        button.appendChild(span);
        button.id = "gpf-territories-button-open-views-id";
        button.classList.add("gpf-btn", "gpf-btn--tertiary", "gpf-btn-icon");
        button.classList.add("fr-btn", "fr-btn--tertiary");
        button.setAttribute("aria-label", title);
        button.setAttribute("title", description);
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", false);
        button.setAttribute("aria-controls", "gpf-territories-views-container-id");
        button.setAttribute("type", "button");
        button.innerHTML = title;

        // Close all results and panels when minimizing the widget
        if (button.addEventListener) {
            button.addEventListener("click", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                var collapse = document.getElementById(e.target.getAttribute("aria-controls"));
                if (!collapse) {
                    return;
                }
                if (status) {
                    collapse.classList.remove("gpf-visible");
                    collapse.classList.add("gpf-hidden");
                } else {
                    collapse.classList.add("gpf-visible");
                    collapse.classList.remove("gpf-hidden");
                }
                self.onShowTerritoriesViewsClick(e);
            });
        } else if (button.attachEvent) {
            button.attachEvent("onclick", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                var collapse = document.getElementById(e.target.getAttribute("aria-controls"));
                if (!collapse) {
                    return;
                }
                if (status) {
                    collapse.classList.remove("gpf-visible");
                    collapse.classList.add("gpf-hidden");
                } else {
                    collapse.classList.add("gpf-visible");
                    collapse.classList.remove("gpf-hidden");
                }
                self.onShowTerritoriesViewsClick(e);
            });
        }

        return button;
    },

    _createTerritoriesPanelMenuViewsElement : function (title) {
        var dialog = document.createElement("dialog");
        dialog.id = "gpf-territories-views-container-id";
        dialog.className = "fr-modal__body gpf-panel__views_territories-menu gpf-hidden";
        dialog.appendChild(this._createTerritoriesMenuAddViewElement(title));
        dialog.appendChild(this._createTerritoriesMenuListViewElement());
        return dialog;
    },
    _createTerritoriesMenuAddViewElement : function (title) {
        var self = this;

        var buttonId = "gpf-territories-views-back-button-id";
        var inputId = "gpf-territories-views-input-id";
        var formId = "gpf-territories-views-form-id";
        var submitId = "gpf-territories-views-submit-id";

        var strContainer = `
        <div>
            <button 
                id="${buttonId}" 
                class="fr-btn fr-icon-arrow-left-line fr-btn--icon-left fr-btn--tertiary-no-outline"
                aria-pressed="false" 
                aria-controls="gpf-territories-views-container-id gpf-territories-button-open-views-id"
                title="Retour au sélecteur de territoires" 
                type="button">
                ${title}
            </button>
            <form id="${formId}">
                <fieldset 
                    class="fr-fieldset" 
                    id="add-view-form-fieldset" 
                    aria-labelledby="add-view-form-fieldset-legend add-view-form-fieldset-messages">
                    <legend 
                        class="fr-fieldset__legend" 
                        id="add-view-form-fieldset-legend"> 
                        Ajouter la vue actuelle 
                    </legend>
                    <div class="fr-fieldset__element">
                        <div class="fr-input-group" id="${inputId}-input-group-view">
                            <label class="fr-label" for="${inputId}"> Nom </label>
                            <input class="fr-input" aria-describedby="${inputId}-messages" id="${inputId}" type="text">
                            <div class="fr-messages-group" id="${inputId}-messages" aria-live="polite"></div>
                        </div>
                    </div>
                    <div class="fr-messages-group" id="add-view-form-fieldset-messages" aria-live="polite">
                        <p class="fr-message fr-message--error gpf-hidden" id="${inputId}-message-error-duplicate-id">Ce nom est déjà utilisé</p>
                        <p class="fr-message fr-message--error gpf-hidden" id="${inputId}-message-error-empty-id">Le nom est vide</p>
                    </div>
                </fieldset>
            </form>
            <input type="submit" id="${submitId}" value="Ajouter" class="fr-btn">
            <hr class="fr-m-1v"/>
        </div>
        `;
        var container = stringToHTML(strContainer);

        // ajout du shadow DOM pour creer les listeners
        const shadow = container.attachShadow({ mode : "open" });
        shadow.innerHTML = strContainer.trim();

        var button = shadow.getElementById(buttonId);
        if (button) {
            button.addEventListener("click", (e) => {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);

                var controls = e.target.getAttribute("aria-controls").split(" ");

                var collapse = document.getElementById(controls[0]);
                if (!collapse) {
                    return;
                }
                collapse.classList.remove("gpf-visible");
                collapse.classList.add("gpf-hidden");

                var button = document.getElementById(controls[1]);
                if (!button) {
                    return;
                }
                button.setAttribute("aria-pressed", "false");
                // reinit 
                var input = document.getElementById(inputId);
                if (input) {
                    input.value = "";
                    var emptyMessage = document.getElementById(inputId + "-message-error-empty-id");
                    var duplicateMessage = document.getElementById(inputId + "-message-error-duplicate-id");
                    if (emptyMessage) {
                        emptyMessage.classList.add("gpf-hidden");
                    }
                    if (duplicateMessage) {
                        duplicateMessage.classList.add("gpf-hidden");
                    }
                }
                self.onCloseTerritoriesViewsClick(e);
            }, false);
        }
        var form = shadow.getElementById(formId);
        if (form) {
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                var input = document.getElementById(inputId);
                if (input) {
                    self.onAddTerritoriesViewClick(e, input.value);
                }
            }, false);
        }
        var submit = shadow.getElementById(submitId);
        if (submit) {
            submit.addEventListener("click", (e) => {
                e.preventDefault();
                var input = document.getElementById(inputId);
                if (input) {
                    var territory = self.territories.find(e => e.data.title === input.value);
                    var emptyMessage = document.getElementById(inputId + "-message-error-empty-id");
                    var duplicateMessage = document.getElementById(inputId + "-message-error-duplicate-id");

                    // Check if input is empty
                    if (input.value === "") {
                        if (emptyMessage) {
                            emptyMessage.classList.remove("gpf-hidden");
                        }
                        if (duplicateMessage) {
                            duplicateMessage.classList.add("gpf-hidden");
                        }
                        return;
                    }
                    // Check if territory with same name exists
                    if (territory) {
                        if (duplicateMessage) {
                            duplicateMessage.classList.remove("gpf-hidden");
                        }
                        if (emptyMessage) {
                            emptyMessage.classList.add("gpf-hidden");
                        }
                        return;
                    }
                    // Hide both error messages if valid
                    if (emptyMessage) {
                        emptyMessage.classList.add("gpf-hidden");
                    }
                    if (duplicateMessage) {
                        duplicateMessage.classList.add("gpf-hidden");
                    }
                    self.onAddTerritoriesViewClick(e, input.value);
                }
            }, false);
        }

        return shadow.firstChild;
    },

    _createTerritoriesMenuListViewElement : function () {
        var self = this;
        
        var buttonId = "gpf-territories-views-reset-button-id";
        var countId = "gpf-territories-views-count-id";

        var strContainer = `
        <div class="gpf-panel__views_territories-listview">
            <!-- Menu de la liste des vues -->
            <div class="gpf-panel__views_territories-listview-header">
                <div class="gpf-panel__views_territories-listview-count">
                    <span class="fr-label" style="padding-right: 10px; font-weight: bolder;"> Territoires </span>
                    <span 
                        class="fr-badge fr-badge--sm fr-badge--info fr-badge--no-icon" 
                        id="${countId}"> 0 </span>
                </div>
                <button 
                    id="${buttonId}" 
                    class="fr-btn fr-btn--sm fr-btn--tertiary-no-outline"
                    title="Réinitialiser la liste des territoires" 
                    type="button">
                    Réinitialiser
                </button>
            </div>
            <!-- Liste des vues -->
            <div 
                id="gpf-territories-views-listview-entries-id"
                class="gpf-panel__views_territories-listview-entries">
            </div>
        </div>
        `;
        var container = stringToHTML(strContainer);

        // ajout du shadow DOM pour creer les listeners
        const shadow = container.attachShadow({ mode : "open" });
        shadow.innerHTML = strContainer.trim();

        var button = shadow.getElementById(buttonId);
        if (button) {
            button.addEventListener("click", (e) => {
                self.onResetTerritoriesViewClick(e);
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
            // Test si la vignette est demandée ou non (SVG ou DSFR)
            // On propose une image par défaut (cf. img/image-not-found.png)
            var DefaultImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFvSURBVHgB7ZfBisIwEIb/aIWKHsXH8OCT+lBevHgRjwp6EBEREdRqTbKZLN3FXT20yRyK80FIqJR8mf4drDqfjUWNaKBmiDA3IsyNCHMjwtyIMDcizI0Ic/O5wsYA7bZCkjxfb7UQlWjCnY7CaJRhNtM/0nSAyUQjTRViEU3Yug+t8Tj3ws2mcpVVWCw0Gm4Hmv9Wvioq1jcdRaLbVX6+XCyUK+p0ql2VgevVYjhM/LVQolSYqni7AVlm/aB4UKXT9LvyFI35PE40goVJ9nSiYb0cPfrVyvh1Aa21BjYb4+KCIIKFiwhQNzgcSFphvTb/ugMdZLnULhbq6TBlCcowSex2v7dTRvd74+PxLq90kMEg8dGpQuUKF1GgR01VpvF4AP1+A3lu/frVOB4ttltT+QWsXGHakN7+V5mkQ9zv7++l33s95efS+4ZEIqRNVc1xUDu3UTp4OeTfGjcizI0IcyPC3IgwNyLMjQhzUzvhL49qosB5TImnAAAAAElFTkSuQmCC";
            
            var thumbnail = o.thumbnail || DefaultImage;
            var iconDiv = "";
            var icon = o.icon || DefaultImage;
            if (icon.startsWith("fr-icon-")) {
                iconDiv = `
                <button 
                    type="button" 
                    class="fr-btn fr-btn--lg ${icon} fr-btn--tertiary-no-outline">
                </button>`;
            } else {
                iconDiv = `
                <svg>       
                    <image id="icon-${o.id}" xlink:href="${icon}" style="width:100%;"/>    
                </svg>`;
            }
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
                        ${iconDiv}
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
    },

    _createTerritoryView : function (o) {
        var self = this;
        
        var buttonId = "gpf-territories-view-entry-button-id-" + o.id;
        if (o) {
            var entry = stringToHTML(`
            <div class="gpf-panel__views_territories-listview-entry draggable-territories-view">
                <!-- ${o.title} -->
                <div style="display: flex;flex-direction: row;align-items: center;">    
                    <span class="gpf-btn gpf-btn-icon-territories-draggable gpf-btn--tertiary"></span>
                    <label class="gpf-label fr-label" title="${o.description}">${o.title}</label>
                </div>
                <button 
                    id="${buttonId}" 
                    type="button" 
                    class="fr-btn fr-btn--sm fr-btn--icon-left fr-btn--tertiary-no-outline gpf-btn gpf-btn-icon-territories-remove gpf-btn--tertiary"></button>
            </div>
            `);
            var div = entry.firstChild;
            if (div) {
                div.addEventListener("click", (e) => {
                    // some stuff to select the view
                    self.onViewTerritoryClick(e, o.id);
                });
                var button = entry.querySelector("#" + buttonId);
                if (button) {
                    button.addEventListener("click", (e) => {
                        e.stopPropagation();
                        // some stuff to remove the view
                        self.onViewTerritoryRemoveClick(e, o.id);
                    });
                }
            }
            return entry.firstChild;
        }
    }

};

export default TerritoriesDOM;
