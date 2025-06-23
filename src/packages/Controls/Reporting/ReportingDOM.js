var title = "reporting";

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

var ReportingDOM = {

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
        container.id = this._addUID("GPreporting");
        container.className = "gpf-widget gpf-widget-button gpf-mobile-fullscreen gpf-button-no-gutter";
        return container;
    },

    // ################################################################### //
    // ################### Methods of main container ##################### //
    // ################################################################### //

    /**
     * Show Reporting
     *
     * @returns {DOMElement} DOM element
     */
    _createShowReportingPictoElement : function () {
        var self = this;

        var button = document.createElement("button");
        var span = document.createElement("span");
        button.appendChild(span);
        button.id = this._addUID("GPshowReportingPicto");
        button.className = "gpf-btn gpf-btn--tertiary gpf-btn-icon gpf-btn-icon-reporting fr-btn fr-btn--tertiary ";
        button.title = `${title}`;
        button.setAttribute("aria-label", "Signalement");
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", false);
        button.setAttribute("type", "button");

        // Close all results and panels when minimizing the reporting
        if (button.addEventListener) {
            button.addEventListener("click", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                self.onShowReportingClick(e);
            });
        } else if (button.attachEvent) {
            button.attachEvent("onclick", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                self.onShowReportingClick(e);
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
    _createReportingPanelElement : function () {
        var dialog = document.createElement("dialog");
        dialog.id = this._addUID("GPreportingPanel");
        dialog.className = "GPpanel gpf-panel fr-modal";

        return dialog;
    },

    _createReportingPanelDivElement : function () {
        var div = document.createElement("div");
        div.className = "gpf-panel__body fr-modal__body";
        return div;
    },

    /**
     * Create Header Panel
     *
     * @returns {DOMElement} DOM element
     */
    _createReportingPanelHeaderElement : function () {
        var container = document.createElement("div");
        container.className = "gpf-panel__header fr-modal__header gpf-panel__header_reporting";
        return container;
    },
    _createReportingPanelIconElement : function () {
        // contexte d'execution
        var self = this;

        var label = document.createElement("label");
        label.className = "gpf-btn-header gpf-btn-icon-header-reporting";
        label.title = "Retour à l'étape précédente";
        label.addEventListener("click", function (e) {
            self.onPrevReportingClick(e);
        });
        return label;
    },
    _createReportingPanelTitleElement : function (title) {
        var div = document.createElement("div");
        div.className = "gpf-panel__title fr-modal__title fr-pt-4w";
        div.innerHTML = title || "";
        return div;
    },
    _createReportingPanelCloseElement : function () {
        var self = this;

        var btnClose = document.createElement("button");
        btnClose.className = "gpf-btn gpf-btn-icon-close fr-btn--close fr-btn fr-btn--tertiary-no-outline fr-m-1w";
        btnClose.title = "Fermer le panneau";

        // Link panel close / visibility checkbox
        if (btnClose.addEventListener) {
            btnClose.addEventListener("click", function (e) {
                document.getElementById(self._addUID("GPshowReportingPicto")).click();
                self.onCloseReportingClick(e);
            }, false);
        } else if (btnClose.attachEvent) {
            btnClose.attachEvent("onclick", function (e) {
                document.getElementById(self._addUID("GPshowReportingPicto")).click();
                self.onCloseReportingClick(e);
            });
        }

        var span = document.createElement("span");
        span.className = "gpf-visible"; // afficher en dsfr
        span.innerText = "Fermer";

        btnClose.appendChild(span);

        return btnClose;
    },

    /** 
     * Create Reporting Panel Footer
     * @todo
     */
    _createReportingPanelFooterElement : function () {
        var self = this;

        var container = document.createElement("div");
        container.className = "gpf-panel__footer fr-modal__footer gpf-panel__footer_reporting gpf-visible";

        var btnAnnuler = document.createElement("button");
        btnAnnuler.className = "gpf-btn gpf-btn--tertiary gpf-btn-icon-annuler fr-btn fr-btn--tertiary fr-m-1w";
        btnAnnuler.title = "Annuler";
        btnAnnuler.textContent = "Annuler";

        if (btnAnnuler.addEventListener) {
            btnAnnuler.addEventListener("click", function (e) {
                self.onCancelReportingClick(e);
            }, false);
        } else if (btnAnnuler.attachEvent) {
            btnAnnuler.attachEvent("onclick", function (e) {
                self.onCancelReportingClick(e);
            });
        }
        container.appendChild(btnAnnuler);

        var btnSuivant = document.createElement("button");
        btnSuivant.className = "gpf-btn gpf-btn--primary gpf-btn-icon-suivant fr-btn fr-btn--primary fr-m-1w";
        btnSuivant.title = "Suivant";
        btnSuivant.textContent = "Suivant";

        if (btnSuivant.addEventListener) {
            btnSuivant.addEventListener("click", function (e) {
                self.onNextReportingClick(e);
            }, false);
        } else if (btnSuivant.attachEvent) {
            btnSuivant.attachEvent("onclick", function (e) {
                self.onNextReportingClick(e);
            });
        }
        container.appendChild(btnSuivant);

        return container;
    },
    // ################################################################### //
    // ############################# windows ############################# //
    // ################################################################### //

    /**
     * Create input panel
     */
    _createReportingPanelInputElement : function () {
        // - header : sans titre
        // - content : message
        // - footer
        var panel = document.createElement("div");
        panel.id = this._addUID("GPreportingPanelInput");
        panel.className = "gpf-panel__content fr-modal__content fr-px-3w gpf-hidden";

        var p = document.createElement("p");
        p.innerHTML = "Cliquez sur la carte à l'endroit que vous souhaitez corriger.";
        p.className = "gpf-label fr-label";

        panel.appendChild(p);

        return panel;
    },

    /**
     * Create panel form
     *
     * @returns {DOMElement} DOM element
     */
    _createReportingPanelFormElement : function (thematics) {
        // - header : titre
        // - content : formulaire
        // - footer

        // contexte d'execution
        var self = this;

        var form = document.createElement("form");
        form.id = this._addUID("GPreportingForm");
        form.className = "gpf-panel__content fr-modal__content gpf-hidden";

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            var nameValue = document.getElementById(idName).value;
            var descValue = document.getElementById(idDesc).value;
            var themeContainer = document.getElementById(idTheme);
            var themeValue = themeContainer.options[themeContainer.selectedIndex].textContent;
            self.onReportingFormSubmit({
                target : e.target,
                name : nameValue,
                desc : descValue,
                theme : themeValue
            });
            return false;
        });

        var idName = this._addUID("GPreportingFormLabelName");
        var divName = `
        <div class="fr-input-group">
            <label class="gpf-label fr-label" for="${idName}">Nom (obligatoire)</label>
            <input class="gpf-input fr-input" type="text" id="${idName}" name="GPreportingLabelName">
        </div>
        `;

        var idTheme = this._addUID("GPreportingFormSelectTheme");
        var divTheme = `
        <div class="fr-select-group">
            <label class="gpf-label fr-label" for="${idTheme}">
                Objet du signalement (obligatoire)  
            </label>  
            <select class="gpf-select fr-select" id="${idTheme}" name="GPreportingSelectTheme">
                <option value="" selected disabled >Sélectionner une option</option>
                ${thematics.map((theme) => { return `<option value="${theme}">${theme}</option>`; }).join("")}  
            </select>
        </div>
        `;

        var idDesc = this._addUID("GPreportingFormTextDesc");
        var divDesc = `
        <div class="fr-input-group">
            <label class="gpf-label fr-label" for="${idDesc}">      
                Description (obligatoire)    
            </label>    
            <textarea class="gpf-input fr-input" id="${idDesc}" name="GPreportingTextDesc"></textarea>
        </div>
        `;

        var idBtn = this._addUID("GPreportingFormButtonDrawing");
        var divBtn = `
        <div class="gpf-btn-group">
            <button id="${idBtn}" class="gpf-btn fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-edit-box-line">
                Dessiner sur la carte
            </button>
        </div>
        `;

        var strContainer = `
            ${divName}
            ${divTheme}
            ${divDesc}
            ${divBtn}
        `;
        var container = stringToHTML(strContainer);

        // ajout du shadow DOM pour creer les listeners
        const shadow = container.attachShadow({ mode : "open" });
        shadow.innerHTML = strContainer.trim();

        // listener sur le DOM
        var button = shadow.getElementById(idBtn);
        if (button) {
            button.addEventListener("click", (e) => {
                this.onShowFormDrawingReportingClick(e);
            });
        }

        // utile ?
        var input = shadow.getElementById(idName);
        if (input) {
            input.addEventListener("change", (e) => {
                this.onEntryFormNameReportingChange(e);
            });
        }

        // utile ?
        var select = shadow.getElementById(idTheme);
        if (select) {
            select.addEventListener("change", (e) => {
                this.onSelectFormThemeReportingChange(e);
            });
        }

        // utile ?
        var text = shadow.getElementById(idDesc);
        if (text) {
            text.addEventListener("change", (e) => {
                this.onEntryFormDescReportingChange(e);
            });
        }
        
        form.appendChild(shadow);

        return form;
    },

    /**
     * Create the submit button
     * 
     * @returns {DOMElement} DOM element
     * @description Create the submit button for the reporting form.
     * This button is used to submit the reporting form.
     * It is hidden.
     * The form will be submitted when the user clicks on the button "Suivant".
     */
    _createReportingSubmitFormElement : function () {
        var input = document.createElement("input");
        input.id = this._addUID("GPreportingSubmit");
        input.className = "gpf-btn fr-btn gpf-hidden";
        input.type = "submit";
        input.value = "";
        return input;
    },

    /**
     * Create panel drawing
     */
    _createReportingPanelDrawingElement : function () {
        // TODO : 
        // - header
        // - content : injection d'un outil drawing
        // - footer
        var panel = document.createElement("div");
        panel.id = this._addUID("GPreportingPanelDrawing");
        panel.className = "gpf-panel__content fr-modal__content gpf-hidden";

        return panel;
    },

    /**
     * Create panel send reporting
     */
    _createReportingPanelSendElement : function () {
        // - header : titre
        // - content : label + email + btn envoyer
        // - footer : pas de footer !
        var panel = document.createElement("div");
        panel.id = this._addUID("GPreportingPanelSend");
        panel.className = "gpf-panel__content fr-modal__content fr-px-3w gpf-hidden";

        var idMail = this._addUID("GPreportingLabelEmail");
        var divMail = `
        <div class="fr-input-group">
            <label class="gpf-label fr-label" for="${idMail}">Adresse courriel
                <span class="fr-hint-text">Pour valider le signalement, renseignez votre adresse courriel. Nous vous tiendrons informés de sa prise en compte.</span>
            </label>
            <input class="gpf-input fr-input" type="text" id="${idMail}" name="GPreportingLabelEmail" required>
        </div>
        `;

        var idBtn = this._addUID("GPreportingButtonEnvoyer");
        var divBtn =`
        <div class="gpf-btn-group fr-pb-1w">
            <button id="${idBtn}" class="gpf-btn fr-btn fr-btn--primary">
                Envoyer
            </button>
        </div>
        `;

        var strContainer = `
            ${divMail}
            ${divBtn}
        `;
        var container = stringToHTML(strContainer);

        // ajout du shadow DOM pour creer les listeners
        const shadow = container.attachShadow({ mode : "open" });
        shadow.innerHTML = strContainer.trim();

        // listener sur le DOM
        var button = shadow.getElementById(idBtn);
        if (button) {
            button.addEventListener("click", (e) => {
                this.onShowSendReportingClick({
                    target : e.target,
                    mail : document.getElementById(idMail).value
                });
            });
        }

        // utile ?
        var input = shadow.getElementById(idMail);
        if (input) {
            input.addEventListener("change", (e) => {
                this.onEntrySendMailReportingChange(e);
            });
        }

        panel.appendChild(shadow);

        return panel;
    },
    _createReportingErrorSendElement : function () {
        var idError = this._addUID("GPreportingSpanError");
        var spanError = document.createElement("span");
        spanError.id = idError;
        spanError.className = "gpf-error fr-error fr-error-text gpf-hidden";
        spanError.innerHTML = "Une erreur est survenue lors de l'envoi du signalement. <br> Veuillez réessayer plus tard.";
        return spanError;
    }
};

export default ReportingDOM;