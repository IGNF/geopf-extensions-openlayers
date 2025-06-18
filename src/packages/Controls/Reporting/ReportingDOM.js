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
            self.onReturnReportingClick(e);
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
        container.className = "gpf-panel__footer fr-modal__footer";

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
        // TODO : 
        // - header : sans titre / sans icone return
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
    _createReportingPanelFormElement : function () {
        // TODO : 
        // - header
        // - content : formulaire
        // - footer

        // contexte d'execution
        var self = this;

        var form = document.createElement("form");
        form.id = this._addUID("GPreportingForm");
        form.className = "gpf-panel__content fr-modal__content gpf-hidden";

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            self.onReportingComputationSubmit(e);
            return false;
        });

        var idName = this._addUID("GPreportingLabelName");
        var divName = document.createElement("div");
        divName.className = "fr-input-group";
        divName.innerHTML = `
            <label class="gpf-label fr-label" for="${idName}">Nom (obligatoire)</label>
            <input class="gpf-input fr-input" type="text" id="${idName}" name="GPreportingLabelName">
        `;
        form.appendChild(divName);

        var idTheme = this._addUID("GPreportingSelectTheme");
        var divTheme = document.createElement("div");
        divTheme.className = "fr-select-group";
        divTheme.innerHTML = `
        <label class="gpf-label fr-label" for="${idTheme}">
            Objet du signalement (obligatoire)  
        </label>  
        <select class="gpf-select fr-select" id="${idTheme}" name="GPreportingSelectTheme">
            <option value="" selected disabled >Sélectionner une option</option>
            <option value="1">Option 1</option>    
            <option value="2">Option 2</option>    
            <option value="3">Option 3</option>    
            <option value="4">Option 4</option>  
        </select>
        `;
        form.appendChild(divTheme);

        var idDesc = this._addUID("GPreportingTextDesc");
        var divDesc = document.createElement("div");
        divDesc.className = "fr-input-group";
        divDesc.innerHTML = `
        <label class="gpf-label fr-label" for="${idDesc}">      
            Description (obligatoire)    
        </label>    
        <textarea class="gpf-input fr-input" id="${idDesc}" name="GPreportingTextDesc"></textarea>
        `;
        form.appendChild(divDesc);

        var idBtn = this._addUID("GPreportingButtonDrawing");
        var divBtn = document.createElement("div");
        divBtn.className = "gpf-btn-group";
        divBtn.innerHTML = `
        <button class="gpf-btn fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-edit-box-line">
            Dessiner sur la carte
        </button>
        `;
        form.appendChild(divBtn);

        return form;
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
        // TODO : 
        // - header
        // - content : label + email + btn envoyer
        // - footer : pas de footer !
        var panel = document.createElement("div");
        panel.id = this._addUID("GPreportingPanelSend");
        panel.className = "gpf-panel__content fr-modal__content fr-px-3w gpf-hidden";

        var id = this._addUID("GPreportingLabelEmail");

        var div = document.createElement("div");
        div.className = "fr-input-group";
        div.innerHTML = `
            <label class="gpf-label fr-label" for="${id}">Adresse courriel
                <span class="fr-hint-text">Pour valider le signalement, renseignez votre adresse courriel. Nous vous tiendrons informés de sa prise en compte.</span>
            </label>
            <input class="gpf-input fr-input" type="text" id="${id}" name="${id}">
        `;
        panel.appendChild(div);

        return panel;
    },
};

export default ReportingDOM;