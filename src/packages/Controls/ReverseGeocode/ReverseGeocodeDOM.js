import checkDsfr from "../Utils/CheckDsfr";

var ReverseGeocodeDOM = {

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
        container.id = this._addUID("GPreverseGeocoding");
        container.className = "GPwidget gpf-widget gpf-widget-button gpf-mobile-fullscreen";
        return container;
    },

    // ################################################################### //
    // ################### Methods of main container ##################### //
    // ################################################################### //

    /**
     * Show ReverseGeocoding
     *
     * @returns {DOMElement} DOM element
     */
    _createShowReverseGeocodingPictoElement : function () {
        // contexte d'execution
        var self = this;

        var button = document.createElement("button");
        // INFO: Ajout d'une SPAN pour enlever des marges de 6px dans CHROMIUM (?!)
        var span = document.createElement("span");
        button.appendChild(span);
        button.id = this._addUID("GPshowReverseGeocodingPicto");
        button.className = "GPshowOpen GPshowAdvancedToolPicto GPshowReverseGeocodingPicto gpf-btn gpf-btn--tertiary gpf-btn-icon gpf-btn-icon-reverse fr-btn fr-btn--tertiary";
        button.setAttribute("aria-label", "Ouvrir la recherche inverse");
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", false);
        button.setAttribute("type", "button");

        // Close all results and panels when minimizing the widget
        if (button.addEventListener) {
            button.addEventListener("click", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                self.onShowReverseGeocodingClick(e);
            });
        } else if (button.attachEvent) {
            button.attachEvent("onclick", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                self.onShowReverseGeocodingClick(e);
            });
        }

        return button;
    },

    /**
     * Create Waiting Panel
     *
     * @returns {DOMElement} DOM element
     */
    _createReverseGeocodingWaitingElement : function () {
        var div = document.createElement("div");
        div.id = this._addUID("GPreverseGeocodingCalcWaitingContainer");
        div.className = "GPwaitingContainer GPwaitingContainerHidden gpf-waiting gpf-waiting--hidden";

        var p = document.createElement("p");
        p.className = "GPwaitingContainerInfo gpf-waiting_info";
        p.innerHTML = "Recherche en cours...";

        div.appendChild(p);

        return div;
    },

    /**
     * Reverse geocoding results panel element.
     *
     * @returns {DOMElement} DOM element
     */
    _createReverseGeocodingResultsPanelElement : function () {
        var resultsPanelDiv = document.createElement("div");
        resultsPanelDiv.id = this._addUID("GPreverseGeocodingResultsPanel");
        resultsPanelDiv.className = "GPpanel GPelementHidden gpf-panel gpf-panel-reverse gpf-panel--hidden";
        return resultsPanelDiv;
    },

    /**
     * Reverse geocoding results list.
     *
     * @returns {DOMElement} DOM element
     */
    _createReverseGeocodingResultsListElement : function () {
        var container = document.createElement("div");
        container.id = this._addUID("GPreverseGeocodingResultsList");
        container.className = "gpf-panel__list";
        container.setAttribute("tabindex", "0");
        // Results are dynamically filled in Javascript by reverse geocoding service
        return container;
    },

    /**
     *  Add Result
     * (results dynamically generate !)
     *
     * @param {String} locationDescription - reverse geocoded location results
     * @param {Number} id - ID
     */
    _createReverseGeocodingResultElement : function (locationDescription, id) {
        // contexte
        var context = this;

        var container = document.getElementById(this._addUID("GPreverseGeocodingResultsList"));

        var div = document.createElement("div");
        div.id = this._addUID("GPreverseGeocodedLocation_" + id);
        div.setAttribute("tabindex", "0");
        div.className = "GPautoCompleteProposal gpf-panel__items";
        div.innerHTML = locationDescription;
        div.title = locationDescription;

        if (div.addEventListener) {
            div.addEventListener("mouseover", function (e) {
                context.onReverseGeocodingResultMouseOver(e);
            });
            div.addEventListener("focus", function (e) {
                context.onReverseGeocodingResultMouseOver(e);
            });
            div.addEventListener("mouseout", function (e) {
                context.onReverseGeocodingResultMouseOut(e);
            });
            div.addEventListener("blur", function (e) {
                context.onReverseGeocodingResultMouseOut(e);
            });
            div.addEventListener("click", function (e) {
                if (typeof context.onReverseGeocodingResultClick === "function") {
                    context.onReverseGeocodingResultClick(e);
                }
            });
        } else if (div.attachEvent) {
            div.attachEvent("onmouseover", function (e) {
                context.onReverseGeocodingResultMouseOver(e);
            });
            div.attachEvent("onmouseout", function (e) {
                context.onReverseGeocodingResultMouseOut(e);
            });
            div.attachEvent("onclick", function (e) {
                if (typeof context.onReverseGeocodingResultClick === "function") {
                    context.onReverseGeocodingResultClick(e);
                }
            });
        }

        container.appendChild(div);
    },

    // ################################################################### //
    // ######################### Inputs panel ############################ //
    // ################################################################### //

    /**
     * Create Container Panel
     *
     * @returns {DOMElement} DOM element
     */
    _createReverseGeocodingPanelElement : function () {
        var dialog = document.createElement("dialog");
        dialog.id = this._addUID("GPreverseGeocodingPanel");
        dialog.className = "GPpanel gpf-panel fr-modal";

        return dialog;
    },

    _createReverseGeocodingPanelDivElement : function () {
        var div = document.createElement("div");
        div.className = "gpf-panel__body fr-modal__body";
        return div;
    },

    /**
     * Create Header Panel
     *
     * @returns {DOMElement} DOM element
     */
    _createReverseGeocodingPanelHeaderElement : function () {
        var container = document.createElement("div");
        container.className = "GPpanelHeader gpf-panel__header fr-modal__header";
        // info: on sépare les appels pour la création du picto de retour,
        // du titre et de la croix de fermeture pour les récupérer dans le composant
        return container;
    },

    /**
     * Create return picto in panel header
     *
     * @returns {DOMElement} DOM element
     */
    _createReverseGeocodingPanelReturnPictoElement : function () {
        // contexte
        var self = this;

        var buttonNew = document.createElement("button");
        buttonNew.id = this._addUID("GPreverseGeocodingReturnPicto");
        buttonNew.title = "Nouvelle recherche";
        buttonNew.className = "GPreturnPicto GPimportPanelReturnPicto gpf-btn gpf-btn-icon-return fr-btn fr-btn--close fr-btn--tertiary-no-outline fr-m-1w";

        buttonNew.classList.add("GPelementHidden");
        buttonNew.classList.add("gpf-hidden");

        if (checkDsfr()) {
            var returnSpan = document.createElement("span");
            returnSpan.className = "GPelementHidden gpf-visible";
            returnSpan.innerHTML = "Retour";
            buttonNew.appendChild(returnSpan);
        }

        if (buttonNew.addEventListener) {
            buttonNew.addEventListener("click", function (e) {
                document.getElementById(self._addUID("GPreverseGeocodingResultsPanel")).className = "GPelementHidden gpf-panel--hidden";
                document.getElementById(self._addUID("GPreverseGeocodingForm")).className = "GPform gpf-panel__content fr-modal__content";
                document.getElementById(self._addUID("GPreverseGeocodingHeaderTitle")).innerHTML = "Recherche inverse";
                document.getElementById(self._addUID("GPreverseGeocodingReturnPicto")).classList.add("GPelementHidden");
                document.getElementById(self._addUID("GPreverseGeocodingReturnPicto")).classList.add("gpf-hidden");
                self.onGPreverseGeocodingReturnPictoClick(e);
            });
        } else if (buttonNew.attachEvent) {
            buttonNew.attachEvent("onclick", function (e) {
                document.getElementById(self._addUID("GPreverseGeocodingResultsPanel")).className = "GPelementHidden gpf-panel--hidden";
                document.getElementById(self._addUID("GPreverseGeocodingForm")).className = "GPform gpf-panel__content fr-modal__content";
                document.getElementById(self._addUID("GPreverseGeocodingHeaderTitle")).innerHTML = "Recherche inverse";
                document.getElementById(self._addUID("GPreverseGeocodingReturnPicto")).classList.add("GPelementHidden");
                document.getElementById(self._addUID("GPreverseGeocodingReturnPicto")).classList.add("gpf-hidden");
                self.onGPreverseGeocodingReturnPictoClick(e);
            });
        }
        return buttonNew;
    },

    /**
     * Create Header Title Panel
     *
     * @returns {DOMElement} DOM element
     */
    _createReverseGeocodingPanelTitleElement : function () {
        var div = document.createElement("div");
        div.className = "GPpanelTitle gpf-panel__title fr-modal__title fr-pt-4w";
        div.id = this._addUID("GPreverseGeocodingHeaderTitle");
        div.innerHTML = "Recherche inverse";
        return div;
    },

    /**
     * Create Header close div
     *
     * @returns {DOMElement} DOM element
     */
    _createReverseGeocodingPanelCloseElement : function () {
        // contexte
        var self = this;

        var divClose = document.createElement("button");
        divClose.id = this._addUID("GPreverseGeocodingPanelClose");
        divClose.className = "GPpanelClose GPreverseGeocodingPanelClose gpf-btn gpf-btn-icon-close fr-btn--close fr-btn fr-btn--tertiary-no-outline fr-m-1w";
        divClose.title = "Fermer le panneau";

        // Link panel close / visibility checkbox
        if (divClose.addEventListener) {
            divClose.addEventListener("click", function () {
                document.getElementById(self._addUID("GPshowReverseGeocodingPicto")).click();
            }, false);
            divClose.addEventListener("keydown", function (event) {
                if (event.keyCode === 13) {
                    document.getElementById(self._addUID("GPshowReverseGeocodingPicto")).click();
                }
            }, false);
        } else if (divClose.attachEvent) {
            divClose.attachEvent("onclick", function () {
                document.getElementById(self._addUID("GPshowReverseGeocodingPicto")).click();
            });
            divClose.attachEvent("onkeydown", function (event) {
                if (event.keyCode === 13) {
                    document.getElementById(self._addUID("GPshowReverseGeocodingPicto")).click();
                }
            });
        }

        var span = document.createElement("span");
        span.className = "GPelementHidden gpf-visible"; // afficher en dsfr
        span.innerText = "Fermer";

        divClose.appendChild(span);

        return divClose;
    },

    /**
     * Create Form
     * see event !
     *
     * @returns {DOMElement} DOM element
     */
    _createReverseGeocodingPanelFormElement : function () {
        // contexte d'execution
        var self = this;

        var form = document.createElement("form");
        form.id = this._addUID("GPreverseGeocodingForm");
        form.className = "GPform gpf-panel__content fr-modal__content";

        if (form.addEventListener) {
            form.addEventListener("submit", function (e) {
                e.preventDefault();
                self.onReverseGeocodingSubmit();
            });
        } else if (form.attachEvent) {
            form.attachEvent("onsubmit", function (e) {
                e.preventDefault();
                self.onReverseGeocodingSubmit();
            });
        }

        return form;
    },

    // ################################################################### //
    // ####################### Choice mode into form ##################### //
    // ################################################################### //

    /**
     * Create Container to Mode choice geocoding type
     *
     * @param {Array} resources - geocoding resources to be displayed (and used)
     * @returns {DOMElement} DOM element
     */
    _createReverseGeocodingFormModeChoiceGeocodingTypeElement : function (resources) {
        // contexte d'execution
        var context = this;

        var div = document.createElement("div");
        div.className = "GPflexInput gpf-flex gpf-flex-reverse fr-mb-1w";

        var label = document.createElement("label");
        label.id = "label-recherche-par";
        label.className = "GPlabel gpf-label fr-label";
        label.innerHTML = "Recherche par";
        label.title = "Recherche par";
        div.appendChild(label);

        var select = document.createElement("select");
        select.setAttribute("aria-labelledby", "label-recherche-par");
        select.className = "GPselect gpf-select fr-select";
        // gestionnaire d'evenement : on stocke la valeur du type de geocodage,
        // utilisé dans la requête de géocodage inverse
        if (select.addEventListener) {
            select.addEventListener("change", function (e) {
                context.onReverseGeocodingTypeChange(e);
            });
        } else if (select.attachEvent) {
            select.attachEvent("onchange", function (e) {
                context.onReverseGeocodingTypeChange(e);
            });
        }

        // on prend soit les valeurs passées par l'utilisateur, soit des valeurs par défaut
        if (!resources || !Array.isArray(resources)) {
            resources = ["StreetAddress", "PositionOfInterest", "CadastralParcel"];
        }
        for (var i = 0; i < resources.length; i++) {
            switch (resources[i]) {
                case "PositionOfInterest":
                    var POIOption = document.createElement("option");
                    POIOption.value = "PositionOfInterest";
                    POIOption.text = "Lieux/toponymes";
                    select.appendChild(POIOption);
                    break;
                case "StreetAddress":
                    var SAOption = document.createElement("option");
                    SAOption.value = "StreetAddress";
                    SAOption.text = "Adresses";
                    select.appendChild(SAOption);
                    break;
                case "CadastralParcel":
                    var CPOption = document.createElement("option");
                    CPOption.value = "CadastralParcel";
                    CPOption.text = "Parcelles cadastrales";
                    select.appendChild(CPOption);
                    break;
                default:
                    break;
            }
        }

        div.appendChild(select);

        return div;
    },

    /**
     * Create Container to Mode choice geocoding delimitation
     *
     * @param {Array} delimitations - geocoding delimitations to be displayed (and used)
     * @returns {DOMElement} DOM element
     */
    _createReverseGeocodingFormModeChoiceGeocodingDelimitationElement : function (delimitations) {
        // contexte d'execution
        var context = this;

        var div = document.createElement("div");
        div.className = "GPflexInput gpf-flex gpf-flex-reverse fr-mb-2w";

        var label = document.createElement("label");
        label.id = "label-delimitation";
        label.className = "GPlabel gpf-label fr-label";
        label.innerHTML = "Délimitation";
        label.title = "Délimitation";
        div.appendChild(label);

        var select = document.createElement("select");
        select.setAttribute("aria-labelledby", "label-delimitation");
        select.className = "GPselect gpf-select fr-select";
        // gestionnaire d'evenement : on stocke la valeur du type de délimitation,
        // et on modifie l'événement de pointage sur la carte en fonction
        if (select.addEventListener) {
            select.addEventListener("change", function (e) {
                context.onReverseGeocodingDelimitationChange(e);
            });
        } else if (select.attachEvent) {
            select.attachEvent("onchange", function (e) {
                context.onReverseGeocodingDelimitationChange(e);
            });
        }

        // on prend soit les valeurs passées par l'utilisateur, soit des valeurs par défaut
        if (!delimitations || !Array.isArray(delimitations)) {
            delimitations = ["Point", "Circle", "Extent"];
        }
        for (var i = 0; i < delimitations.length; i++) {
            switch (delimitations[i].toLowerCase()) {
                case "point":
                    var pointOption = document.createElement("option");
                    pointOption.value = "point";
                    pointOption.text = "Pointer un lieu";
                    select.appendChild(pointOption);
                    break;
                case "circle":
                    var circleOption = document.createElement("option");
                    circleOption.value = "circle";
                    circleOption.text = "Dessiner un cercle";
                    select.appendChild(circleOption);
                    break;
                case "extent":
                    var extentOption = document.createElement("option");
                    extentOption.value = "extent";
                    extentOption.text = "Dessiner une emprise";
                    select.appendChild(extentOption);
                    break;
                default:
                    break;
            }
        }

        div.appendChild(select);

        return div;
    },

    // ################################################################### //
    // ########################### Submit Form ########################### //
    // ################################################################### //

    /**
     * Create Submit Form Element
     *
     * @returns {DOMElement} DOM element
     */
    _createReverseGeocodingSubmitFormElement : function () {
        var input = document.createElement("input");
        input.id = this._addUID("GPreverseGeocodingSubmit");
        input.className = "GPsubmit gpf-btn fr-btn";
        input.type = "submit";
        input.value = "Rechercher";

        return input;
    }

};

export default ReverseGeocodeDOM;
