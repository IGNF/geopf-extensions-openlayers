var title = "panoramax";

var PanoramaxDOM = {

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
        container.id = this._addUID("GPpanoramax");
        container.className = "GPwidget gpf-widget gpf-widget-button gpf-mobile-fullscreen";
        return container;
    },

    // ################################################################### //
    // ################### Methods of main container ##################### //
    // ################################################################### //

    /**
     * Show Widget
     *
     * @returns {DOMElement} DOM element
     */
    _createShowWidgetPictoElement : function () {
        var self = this;

        var button = document.createElement("button");
        // INFO: Ajout d'une SPAN pour enlever des marges de 6px dans CHROMIUM (?!)
        var span = document.createElement("span");
        button.appendChild(span);
        button.id = this._addUID("GPshowPanoramaxPicto");
        button.title = `${title}`;
        button.classList.add("GPshowOpen", "GPshowAdvancedToolPicto", "GPshowPanoramaxPicto");
        button.classList.add("gpf-btn", "gpf-btn--tertiary", "gpf-btn-icon", "gpf-btn-icon-panoramax");
        // button.classList.add("icon--ri", "icon--ri--map-2-line");
        button.classList.add("fr-btn", "fr-btn--tertiary");
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", false);
        button.setAttribute("aria-label", `Afficher ${title}`);
        button.setAttribute("type", "button");

        // Close all results and panels when minimizing the widget
        if (button.addEventListener) {
            button.addEventListener("click", function (e) {
                var status = (button.getAttribute("aria-pressed") === "true");
                button.setAttribute("aria-pressed", !status);
                self.onShowPanoramaxClick(e);
            });
        } else if (button.attachEvent) {
            button.attachEvent("onclick", function (e) {
                var status = (button.getAttribute("aria-pressed") === "true");
                button.setAttribute("aria-pressed", !status);
                self.onShowPanoramaxClick(e);
            });
        }

        return button;
    },

    // ################################################################### //
    // ################ Methods of panel buttons container ############### //
    // ################################################################### //

    /**
     * Create Container Panel for buttons
     *
     * @returns {DOMElement} DOM element
     */
    _createWidgetPanelButtonsElement : function () {
        var dialog = document.createElement("dialog");
        dialog.id = this._addUID("GPpanoramaxPanelButtons");
        dialog.className = "GPpanel gpf-panel fr-modal";
        return dialog;
    },
    
    _createWidgetPanelButtonsDivElement : function () {
        var div = document.createElement("div");
        div.className = "pnx-buttons-panel__body gpf-panel__body fr-modal__body";
        div.classList.add("gpf-visible");
        return div;
    },

    /**
     * Create Header Panel
     *
     * @param {Boolean} display - true if the header must be displayed, false otherwise
     * @returns {DOMElement} DOM element
     */
    _createWidgetPanelButtonsHeaderElement : function (display) {
        var container = document.createElement("div");
        container.className = "pnx-buttons-panel__header gpf-panel__header fr-modal__header";
        if (!display) {
            container.classList.add("gpf-hidden");
        }
        return container;
    },
    _createWidgetPanelButtonsIconElement : function () {
        var label = document.createElement("label");
        label.className = "GPpanelIcon gpf-btn-header gpf-btn-icon-header-panoramax";
        label.title = `${title}`;
        label.setAttribute("aria-label", `Afficher ${title}`);
        return label;
    },
    _createWidgetPanelButtonsReturnElement : function () {
        var self = this;

        var btnReturn = document.createElement("button");
        btnReturn.className = "gpf-btn gpf-btn-icon-return fr-btn--return fr-btn fr-btn--tertiary-no-outline fr-m-1w";
        btnReturn.title = "Retour au panneau de contrôle";

        // Link panel return / visibility checkbox
        if (btnReturn.addEventListener) {
            btnReturn.addEventListener("click", function (e) {
                self.onReturnPanoramaxClick(e);
            }, false);
        } else if (btnReturn.attachEvent) {
            btnReturn.attachEvent("onclick", function (e) {
                self.onReturnPanoramaxClick(e);
            });
        }

        var span = document.createElement("span");
        span.className = "GPelementHidden gpf-visible"; // afficher en dsfr
        span.innerText = "Retour";

        btnReturn.appendChild(span);

        return btnReturn;
    },
    _createWidgetPanelButtonsTitleElement : function () {
        var div = document.createElement("div");
        div.className = "gpf-panel__title fr-modal__title fr-pt-4w";
        div.innerHTML = `${title}`;
        return div;
    },
    _createWidgetPanelButtonsCloseElement : function () {
        var self = this;

        var btnClose = document.createElement("button");
        btnClose.className = "gpf-btn gpf-btn-icon-close fr-btn--close fr-btn fr-btn--tertiary-no-outline fr-m-1w";
        btnClose.title = "Fermer le panneau";

        // Link panel close / visibility checkbox
        if (btnClose.addEventListener) {
            btnClose.addEventListener("click", function (e) {
                self.onClosePanoramaxClick(e);
            }, false);
        } else if (btnClose.attachEvent) {
            btnClose.attachEvent("onclick", function (e) {
                self.onClosePanoramaxClick(e);
            });
        }

        var span = document.createElement("span");
        span.className = "GPelementHidden gpf-visible"; // afficher en dsfr
        span.innerText = "Fermer";

        btnClose.appendChild(span);

        return btnClose;
    },

    // ################################################################### //
    // ####################### Methods for buttons ####################### //
    // ################################################################### //
    
    /**
     * Create buttons
     * see evenement !
     *
     * @returns {DOMElement} DOM element
     */
    _createWidgetButtonsElement : function () {
        var div = document.createElement("div");
        div.className = "pnx-buttons-panel__content gpf-panel__content fr-modal__content";

        return div;
    },

    _createButtonFiltersElement : function (opts) {
        var self = this;
        // <button type="button" class="fr-btn fr-icon-equalizer-line fr-btn--icon-right fr-btn--secondary">Filtrer</button>
        var button = document.createElement("button");
        button.id = this._addUID("GPpanoramaxButtonFilters");
        button.className = "gpf-btn gpf-btn-icon gpf-btn-icon-background";
        button.classList.add("fr-btn", "fr-icon-equalizer-line", "fr-btn--icon-right", "fr-btn--secondary");
        button.title = opts.label;
        button.setAttribute("aria-label", opts.description);
        button.setAttribute("aria-pressed", "false");
        button.setAttribute("type", "button");
        button.textContent = opts.label;

        if (button.addEventListener) {
            button.addEventListener("click", function (e) {
                var status = (e.target.getAttribute("aria-pressed") === "true");
                e.target.setAttribute("aria-pressed", !status);
                self.onOpenPanoramaxFiltersClick(e);
            });
        } else if (button.attachEvent) {
            button.attachEvent("onclick", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                self.onOpenPanoramaxFiltersClick(e);
            });
        }
        
        return button;
    },

    _createButtonContributionsElement : function (opts) {
        // <a href="[url - à modifier]" target="_self" class="fr-btn fr-icon-external-link-fill fr-btn--icon-right fr-btn--secondary">Contribuer</a>
        var href = document.createElement("a");
        href.id = this._addUID("GPpanoramaxButtonContributions");
        href.className = "fr-btn fr-icon-external-link-fill fr-btn--icon-right fr-btn--secondary";
        href.classList.add("gpf-btn", "gpf-btn-icon", "gpf-btn-icon-background");
        href.title = opts.label;
        href.setAttribute("aria-label", opts.description);
        href.setAttribute("target", "_self");
        href.setAttribute("href", opts.link);
        href.innerHTML = opts.label;

        return href;
    },

    _createButtonChoiceHoverElement : function (active, opts) {
        var self = this;

        var div = document.createElement("div");
        div.id = this._addUID("GPpanoramaxToggle");
        div.className = "pnx-toggle fr-toggle fr-m-2v";

        var messages = document.createElement("div");
        messages.id = this._addUID("GPpanoramaxToggleMessages");
        messages.className = "fr-messages-group";
        messages.setAttribute("aria-live", "polite");
        
        var input = document.createElement("input");
        input.id = this._addUID("GPpanoramaxToggleInput");
        input.className = "pnx-toggle__input fr-toggle__input";
        input.type = "checkbox";
        input.checked = active;
        input.setAttribute("aria-describedby", messages.id);

        if (input.addEventListener) {
            input.addEventListener("click", function (e) {
                self.onToggleChoiceHoverPanoramaxClick(e);
            });
        } else if (input.attachEvent) {
            input.attachEvent("onclick", function (e) {
                self.onToggleChoiceHoverPanoramaxClick(e);
            });
        }

        var label = document.createElement("label");
        label.id = this._addUID("GPpanoramaxToggleLabel");
        label.className = "pnx-toggle__label fr-toggle__label";
        label.setAttribute("title", opts.description);
        label.setAttribute("for", input.id);
        label.innerText = opts.label;

        div.appendChild(input);
        div.appendChild(label);
        div.appendChild(messages);

        return div;
    },

    /**
     * Crée un sélecteur de rendu de carte.
     * @param {Object} opts - Configuration du bouton de styles.
     * @returns {HTMLElement} DOM element
     */
    _createButtonChoiceStyleElement : function (opts) {
        var items = ["Classique", "Type de camera", "Date de prise de vue"];
        if (
            opts &&
            opts.content &&
            Array.isArray(opts.content) &&
            opts.content.length
        ) {
            items = opts.content;
        }

        var self = this;
        var container = document.createElement("div");
        container.id = this._addUID("GPpanoramaxStyleChoice");
        container.className = "pnx-style-choice fr-select-group fr-m-2v";

        var label = document.createElement("label");
        label.className = "fr-label fr-icon-palette-line fr-label--icon-left gpf-icon-color";
        label.setAttribute("for", this._addUID("GPpanoramaxStyleChoiceSelect"));
        label.innerText = (opts && opts.label) || "Rendu";

        var select = document.createElement("select");
        select.id = this._addUID("GPpanoramaxStyleChoiceSelect");
        select.className = "fr-select";
        select.disabled = true; // désactivé par défaut, il s'active une fois les rendus disponibles
        select.setAttribute("title", (opts && opts.description) || "Selectionner un rendu de carte");

        for (var i = 0; i < items.length; i++) {
            var option = document.createElement("option");
            option.value = items[i];
            option.innerText = items[i];
            if (i === 0) {
                option.selected = true;
            }
            select.appendChild(option);
        }

        if (select.addEventListener) {
            select.addEventListener("change", function (e) {
                self.onSelectPanoramaxRenderClick(e);
            });
        } else if (select.attachEvent) {
            select.attachEvent("onchange", function (e) {
                self.onSelectPanoramaxRenderClick(e);
            });
        }

        container.appendChild(label);
        container.appendChild(select);

        return container;
    },

    _createButtonChoiceBackgroundElement : function (active, opts) {
        var self = this;

        var div = document.createElement("div");
        div.id = this._addUID("GPpanoramaxToggleBackground");
        div.className = "pnx-toggle fr-toggle fr-m-2v";

        var messages = document.createElement("div");
        messages.id = this._addUID("GPpanoramaxToggleBackgroundMessages");
        messages.className = "fr-messages-group";
        messages.setAttribute("aria-live", "polite");
        
        var input = document.createElement("input");
        input.id = this._addUID("GPpanoramaxToggleBackgroundInput");
        input.className = "pnx-toggle__input fr-toggle__input";
        input.type = "checkbox";
        input.checked = active;
        input.setAttribute("aria-describedby", messages.id);

        if (input.addEventListener) {
            input.addEventListener("click", function (e) {
                self.onToggleChoiceBackgroundPanoramaxClick(e);
            });
        } else if (input.attachEvent) {
            input.attachEvent("onclick", function (e) {
                self.onToggleChoiceBackgroundPanoramaxClick(e);
            });
        }

        var label = document.createElement("label");
        label.id = this._addUID("GPpanoramaxToggleBackgroundLabel");
        label.className = "pnx-toggle__label fr-toggle__label";
        label.setAttribute("title", opts.description);
        label.setAttribute("for", input.id);
        label.innerText = opts.label;

        div.appendChild(input);
        div.appendChild(label);
        div.appendChild(messages);

        return div;
    },

    // ################################################################### //
    // ####################### Methods for filters ####################### //
    // ################################################################### //

    _createWidgetPanelFiltersElement : function (opts) {
        var panel = document.createElement("div");
        panel.id = this._addUID("GPpanoramaxPanelFilters");
        panel.className = "pnx-filters-panel gpf-panel gpf-hidden fr-p-2w";
        panel.setAttribute("role", "region");
        panel.setAttribute("aria-label", opts.description || "Panneau des filtres Panoramax");

        if (opts.periodes) {
            var periodes = [
                { text : "1 mois", value : 1 },
                { text : "6 mois", value : 6 },
                { text : "1 an", value : 12 }
            ];
            var PeriodeGroup = this._createGroupFiltersByPeriodeElement(periodes);
            panel.appendChild(PeriodeGroup);
        }

        if (opts.dates) {
            var startDateGroup = this._createGroupFiltersByStartDateElement();
            panel.appendChild(startDateGroup);
            
            var endDateGroup = this._createGroupFiltersByEndDateElement();
            panel.appendChild(endDateGroup);
        }
        
        if (opts.types) {
            var values = ["Tout", "Classique", "360°"];
            var typeGroup = this._createGroupFiltersByTypeElement(values);
            panel.appendChild(typeGroup);
        }
        
        if (panel.addEventListener) {
            panel.addEventListener("click", function (e) {
                e.stopPropagation();
            });
        } else if (panel.attachEvent) {
            panel.attachEvent("onclick", function (e) {
                e.stopPropagation();
            });
        }

        return panel;
    },

    _createGroupFiltersByPeriodeElement : function (periodes) {
        var self = this;

        var PeriodeGroup = document.createElement("div");
        PeriodeGroup.className = "pnx-filters-panel__date-predefined";

        var fieldset = document.createElement("fieldset");
        fieldset.className = "fr-tags-group fr-fieldset";

        var legend = document.createElement("legend");
        legend.className = "fr-fieldset__legend";
        legend.innerText = "Date";
        fieldset.appendChild(legend);

        for (var i = 0; i < periodes.length; i++) {
            var fieldsetElement = document.createElement("div");
            fieldsetElement.className = "gpf-fieldset__element fr-fieldset__element";

            var buttonPeriode = document.createElement("button");
            buttonPeriode.className = "fr-tag fr-tag--défaut";
            buttonPeriode.setAttribute("type", "button");
            buttonPeriode.setAttribute("aria-pressed", "false");
            buttonPeriode.dataset.filters = "group-filter-periodes";
            buttonPeriode.innerText = periodes[i].text;
            buttonPeriode.value = periodes[i].value;

            buttonPeriode.addEventListener("click", function (e) {
                var currentButton = e.currentTarget || e.target;
                var status = (currentButton.getAttribute("aria-pressed") === "true");
                currentButton.setAttribute("aria-pressed", !status);

                var groupName = currentButton.dataset.filters;
                var groupButtons = fieldset.querySelectorAll("[data-filters='" + groupName + "']");

                for (var j = 0; j < groupButtons.length; j++) {
                    if (groupButtons[j] !== currentButton) {
                        groupButtons[j].setAttribute("aria-pressed", "false");
                    }
                }

                self.onClickPanoramaxFilterByPeriode(e);
            });

            fieldsetElement.appendChild(buttonPeriode);
            fieldset.appendChild(fieldsetElement);
        }

        PeriodeGroup.appendChild(fieldset);

        return PeriodeGroup;
    },
    _createGroupFiltersByStartDateElement : function () {
        var self = this;

        var startDateGroup = document.createElement("div");
        startDateGroup.className = "pnx-filters-panel__date-start fr-input-group fr-mb-1w";
        
        var fieldset = document.createElement("fieldset");
        fieldset.className = "fr-fieldset";

        var legend = document.createElement("legend");
        legend.className = "fr-fieldset__legend";
        legend.innerText = "De";
        fieldset.appendChild(legend);

        var startDateInput = document.createElement("input");
        startDateInput.id = this._addUID("GPpanoramaxFilterDateStart");
        startDateInput.className = "fr-input";
        startDateInput.setAttribute("type", "date");
        startDateInput.dataset.filters = "group-filter-dates";
        startDateInput.addEventListener("change", function (e) {
            self.onChangePanoramaxFilterByDates(e);
        });

        fieldset.appendChild(startDateInput);
        startDateGroup.appendChild(fieldset);

        return startDateGroup;
    },
    _createGroupFiltersByEndDateElement : function () {
        var self = this;

        var endDateGroup = document.createElement("div");
        endDateGroup.className = "pnx-filters-panel__date-end fr-input-group fr-mb-1w";

        var fieldset = document.createElement("fieldset");
        fieldset.className = "fr-fieldset";

        var legend = document.createElement("legend");
        legend.className = "fr-fieldset__legend";
        legend.innerText = "À";
        fieldset.appendChild(legend);

        var endDateInput = document.createElement("input");
        endDateInput.id = this._addUID("GPpanoramaxFilterDateEnd");
        endDateInput.className = "fr-input";
        endDateInput.setAttribute("type", "date");
        endDateInput.dataset.filters = "group-filter-dates";
        endDateInput.addEventListener("change", function (e) {
            self.onChangePanoramaxFilterByDates(e);
        });

        fieldset.appendChild(endDateInput);
        endDateGroup.appendChild(fieldset);

        return endDateGroup;
    },
    _createGroupFiltersByTypeElement : function (values) {
        var self = this;

        var typeGroup = document.createElement("div");
        typeGroup.className = "pnx-filters-panel__type fr-select-group fr-mb-1w";

        var fieldset = document.createElement("fieldset");
        fieldset.className = "fr-fieldset";

        var legend = document.createElement("legend");
        legend.className = "fr-fieldset__legend";
        legend.innerText = "Type d'image";
        fieldset.appendChild(legend);
        
        var typeSelect = document.createElement("select");
        typeSelect.id = this._addUID("GPpanoramaxFilterType");
        typeSelect.className = "fr-select";
        typeSelect.dataset.filters = "group-filter-types";
        for (var i = 0; i < values.length; i++) {
            var option = document.createElement("option");
            option.value = values[i];
            option.innerText = values[i];
            typeSelect.appendChild(option);
        }

        if (typeSelect.addEventListener) {
            typeSelect.addEventListener("change", function (e) {
                self.onChangePanoramaxFilterByType(e);
            });
        } else if (typeSelect.attachEvent) {
            typeSelect.attachEvent("onchange", function (e) {
                self.onChangePanoramaxFilterByType(e);
            });
        }

        fieldset.appendChild(typeSelect);
        typeGroup.appendChild(fieldset);
        return typeGroup;
    },

    // ################################################################### //
    // ################ Methods of panel viewer container ################ //
    // ################################################################### //

    /**
     * Create Container Panel for photoviewer
     * 
     * @param {Boolean} display - true if the panel header must be displayed, false otherwise
     * @returns {DOMElement} DOM element
     */
    _createWidgetPanelViewerElement : function (display) {
        var dialog = document.createElement("dialog");
        dialog.id = this._addUID("GPpanoramaxPanelViewer");
        dialog.className = "GPpanel pnx-visualization-window-panel gpf-panel fr-modal";
        dialog.classList.add("gpf-hidden"); // la fenêtre de visualisation est masquée par défaut, elle s'affiche au clic sur une image
        
        var header = document.createElement("div");
        header.className = "pnx-visualization-window-panel__header gpf-panel__header fr-modal__header";
        if (!display) {
            header.classList.add("gpf-hidden");
        }
        header.appendChild(this._createWidgetPanelButtonsReturnElement());
        header.appendChild(this._createWidgetPanelButtonsCloseElement());

        dialog.appendChild(header);
        return dialog;
    },
    
    _createWidgetPanelViewerDivElement : function () {
        var div = document.createElement("div");
        div.className = "pnx-visualization-window-panel__body gpf-panel__body fr-modal__body";
        div.classList.add("gpf-hidden");
        // Target tag for the photoviewer dialog (see Panoramax.js)
        return div;
    },
};

export default PanoramaxDOM;