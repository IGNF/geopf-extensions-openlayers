import SelectorID from "../../Utils/SelectorID";
import checkDsfr from "../Utils/CheckDsfr";

var LayerImportDOM = {

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
     * Map loading
     *
     * @returns {DOMElement} container
     */
    _createLoadingElement : function () {
        var div = document.createElement("div");
        div.id = "GPmapLoading";
        div.className = "";
        return div;
    },

    /**
     * Main container (DOM)
     *
     * @returns {DOMElement} DOM element
     */
    _createMainContainerElement : function () {
        var container = document.createElement("div");
        container.id = this._addUID("GPimport");
        container.className = "GPwidget gpf-widget gpf-widget-button gpf-mobile-fullscreen";
        return container;
    },

    // ################################################################### //
    // ######################### show widget ############################# //
    // ################################################################### //


    /**
     * Show Import
     *
     * @returns {DOMElement} DOM element
     */
    _createShowImportPictoElement : function () {
        // contexte d'execution
        var self = this;

        var button = document.createElement("button");
        // INFO: Ajout d'une SPAN pour enlever des marges de 6px dans CHROMIUM (?!)
        var span = document.createElement("span");
        button.appendChild(span);
        button.id = this._addUID("GPshowImportPicto");
        button.className = "GPshowOpen GPshowAdvancedToolPicto GPshowImportPicto gpf-btn gpf-btn--tertiary gpf-btn-icon gpf-btn-icon-import fr-btn fr-btn--tertiary";
        button.setAttribute("aria-label", "Ouvrir l'import de couches");
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", false);
        button.setAttribute("type", "button");

        // Close all results and panels when minimizing the widget
        if (button.addEventListener) {
            button.addEventListener("click", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                self._onShowImportClick(e);
            });
        } else if (button.attachEvent) {
            button.attachEvent("onclick", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                self._onShowImportClick(e);
            });
        }

        return button;
    },

    // ################################################################### //
    // ################################ Panel ############################ //
    // ################################################################### //

    /**
     * Create Container Panel
     *
     * @returns {DOMElement} DOM element
     */
    _createImportPanelElement : function () {
        var dialog = document.createElement("dialog");
        dialog.id = this._addUID("GPimportPanel");
        dialog.className = "GPpanel gpf-panel fr-modal";

        return dialog;
    },

    _createImportPanelDivElement : function () {
        var div = document.createElement("div");
        div.className = "gpf-panel__body fr-modal__body";
        return div;
    },

    /**
     * Create Header Panel
     *
     * @returns {DOMElement} DOM element
     */
    _createImportPanelHeaderElement : function () {
        var container = document.createElement("div");
        container.className = "GPpanelHeader GPelementVisible gpf-visible gpf-panel__header fr-modal__header";
        return container;
    },

    /**
     * Create Return PIcto into Panel
     *
     * @returns {DOMElement} DOM element
     */
    _createImportPanelReturnPictoElement : function () {
        var self = this;
        // return picto
        var returnDiv = document.createElement("button");
        returnDiv.id = this._addUID("GPimportPanelReturnPicto");
        returnDiv.title = "Masquer le panneau";
        returnDiv.className = "GPreturnPicto GPimportPanelReturnPicto GPelementHidden gpf-hidden gpf-btn gpf-btn-icon-return fr-btn fr-btn--close fr-btn--tertiary-no-outline";
        
        if (checkDsfr()) {
            var returnSpan = document.createElement("span");
            returnSpan.className = "GPelementHidden";
            returnSpan.innerHTML = "Retour";
            returnDiv.appendChild(returnSpan);
        }
        if (returnDiv.addEventListener) {
            returnDiv.addEventListener("click", function (e) {
                // on ferme le panneau
                document.getElementById(self._addUID("GPshowImportPicto")).click();
                // on nettoie la fenêtre de résultats
                self._onReturnPictoClick(e);
                // on rouvre le panneau vierge
                document.getElementById(self._addUID("GPshowImportPicto")).click();
            });
        } else if (returnDiv.attachEvent) {
            returnDiv.attachEvent("onclick", function (e) {
                document.getElementById(self._addUID("GPshowImportPicto")).click();
                self._onReturnPictoClick(e);
                document.getElementById(self._addUID("GPshowImportPicto")).click();
            });
        }
        return returnDiv;
    },

    /**
     * Create Header Title Panel
     *
     * @returns {DOMElement} DOM element
     */
    _createImportPanelTitleElement : function () {
        var div = document.createElement("div");
        div.id = this._addUID("GPimportHeaderTitle");
        div.className = "GPpanelTitle gpf-panel__title fr-modal__title fr-pt-4w";
        div.innerHTML = "Import de données";
        return div;
    },

    /**
     * Create Header close div
     *
     * @returns {DOMElement} DOM element
     */
    _createImportPanelCloseElement : function () {
        // contexte
        var self = this;

        var divClose = document.createElement("button");
        divClose.id = this._addUID("GPimportPanelClose");
        divClose.className = "GPpanelClose GPimportPanelClose gpf-btn gpf-btn-icon-close fr-btn--close fr-btn fr-btn--tertiary-no-outline";
        divClose.title = "Fermer le panneau";

        // Link panel close / visibility checkbox
        if (divClose.addEventListener) {
            divClose.addEventListener("click", function () {
                document.getElementById(self._addUID("GPshowImportPicto")).click();
            }, false);
        } else if (divClose.attachEvent) {
            divClose.attachEvent("onclick", function () {
                document.getElementById(self._addUID("GPshowImportPicto")).click();
            });
        }

        var span = document.createElement("span");
        span.className = "GPelementHidden gpf-visible"; // afficher en dsfr
        span.innerText = "Fermer";

        divClose.appendChild(span);

        return divClose;
    },

    // ################################################################### //
    // ########################### Form panel ############################ //
    // ################################################################### //

    /**
     * Create Form
     * see event !
     *
     * @returns {DOMElement} DOM element
     */
    _createImportPanelFormElement : function () {
        // contexte d'execution
        var self = this;

        var form = document.createElement("form");
        form.id = this._addUID("GPimportForm");
        form.className = "GPform GPelementVisible gpf-visible gpf-mobile-form gpf-panel__content fr-modal__content";

        // TODO ?
        if (form.addEventListener) {
            form.addEventListener("submit", function (e) {
                e.preventDefault();
                self._onImportSubmit();
            });
        } else if (form.attachEvent) {
            form.attachEvent("onsubmit", function (e) {
                e.preventDefault();
                self._onImportSubmit();
            });
        }

        return form;
    },

    /**
     * Create Container for import type choice
     *
     * @param {Array} importTypes - import types to be displayed (and used)
     * @returns {DOMElement} DOM element
     */
    _createImportTypeLineElement : function (importTypes) {
        // contexte d'execution
        var context = this;

        var div = document.createElement("div");
        div.id = this._addUID("GPimportTypeLine");
        div.className = "GPimportInputLine";

        var label = document.createElement("label");
        label.id = this._addUID("GPimportTypeLabel");
        label.className = "GPlabel gpf-label fr-label";
        label.innerHTML = "Type de donnée";
        label.title = "Type de donnée";
        div.appendChild(label);

        var select = document.createElement("select");
        select.setAttribute("aria-labelledby", this._addUID("GPimportTypeLabel"));
        select.className = "GPselect gpf-select fr-select";
        // gestionnaire d'evenement : on stocke la valeur du type d'import
        if (select.addEventListener) {
            select.addEventListener("change", function (e) {
                if (this.value === "KML" || this.value === "GPX" || this.value === "GeoJSON" || this.value === "MAPBOX") {
                    // static import
                    document.getElementById(context._addUID("GPimportStaticParams")).className = "GPelementVisible gpf-visible fr-my-4w";
                    document.getElementById(context._addUID("GPimportServiceParams")).className = "GPelementHidden gpf-hidden";
                } else if (this.value === "WMS" || this.value === "WMTS" || this.value === "WFS") {
                    // service import
                    document.getElementById(context._addUID("GPimportServiceParams")).className = "GPelementVisible gpf-visible fr-my-4w";
                    document.getElementById(context._addUID("GPimportStaticParams")).className = "GPelementHidden gpf-hidden";
                }
                context._onImportTypeChange(e);
            });
        } else if (select.attachEvent) {
            select.attachEvent("onchange", function () {
                if (this.value === "KML" || this.value === "GPX" || this.value === "GeoJSON" || this.value === "MAPBOX") {
                    // static import
                    document.getElementById(context._addUID("GPimportStaticParams")).className = "GPelementVisible gpf-visible fr-my-4w";
                    document.getElementById(context._addUID("GPimportServiceParams")).className = "GPelementHidden gpf-hidden";
                } else if (this.value === "WMS" || this.value === "WMTS" || this.value === "WFS") {
                    // service import
                    document.getElementById(context._addUID("GPimportServiceParams")).className = "GPelementVisible gpf-visible fr-my-4w";
                    document.getElementById(context._addUID("GPimportStaticParams")).className = "GPelementHidden gpf-hidden";
                }
                context._onImportTypeChange();
            });
        }
        select.id = this._addUID("GPimportTypeSelect");

        // on prend soit les valeurs passées par l'utilisateur, soit des valeurs par défaut
        if (!importTypes || !Array.isArray(importTypes)) {
            importTypes = [
                "KML",
                "GPX",
                "GeoJSON",
                "MAPBOX",
                "WMS",
                "WMTS",
                "WFS"
            ];
        }
        var option;
        for (var i = 0; i < importTypes.length; i++) {
            option = document.createElement("option");
            option.value = importTypes[i];
            option.text = (importTypes[i] === "MAPBOX") ? "Tuiles vectorielles" : importTypes[i];
            select.appendChild(option);
        }

        div.appendChild(select);

        return div;
    },

    /**
     * Create Waiting Panel
     *
     * @returns {DOMElement} DOM element
     */
    _createImportWaitingElement : function () {
        var div = document.createElement("div");
        div.id = this._addUID("GPimportWaitingContainer");
        div.className = "GPwaitingContainer GPwaitingContainerHidden gpf-waiting gpf-waiting--hidden";

        var p = document.createElement("p");
        p.className = "GPwaitingContainerInfo gpf-waiting_info";
        p.innerHTML = "Recherche en cours...";
        div.appendChild(p);

        return div;
    },

    // ################################################################### //
    // ##### Params for static import (KML / GPX / GeoJSON) ############## //
    // ################################################################### //

    /**
     * Create container for KML/GPX/GeoJSON parameters
     * @param {String} currentType - GeoJSON, GPX or KML value
     * @returns {DOMElement} DOM element
     */
    _createImportStaticParamsContainer : function (currentType) {
        var div = document.createElement("div");
        div.id = this._addUID("GPimportStaticParams");
        if (currentType === "KML" || currentType === "GPX" || currentType === "GeoJSON" || currentType === "MAPBOX") {
            div.className = "GPelementVisible gpf-visible fr-my-4w";
        } else {
            div.className = "GPelementHidden gpf-hidden";
        }

        return div;
    },

    /**
     * Create name label for KML/GPX/GeoJSON parameters
     *
     * @returns {DOMElement} DOM element
     */
    _createStaticNameLabel : function () {
        var div = document.createElement("div");
        div.className = "GPimportInputLine fr-mb-1w";

        var label = document.createElement("label");
        label.className = "GPlabel gpf-label fr-label";
        label.htmlFor = this._addUID("GPimportName");
        label.innerHTML = "Nom";
        label.title = "Nom";
        div.appendChild(label);

        var input = document.createElement("input");
        input.type = "text";
        input.id = this._addUID("GPimportName");
        input.className = "GPinput gpf-input fr-input";
        div.appendChild(input);

        return div;
    },

    /**
     * Create import choice for KML/GPX/GeoJSON parameters (local or url)
     *
     * @returns {DOMElement} DOM element
     */
    _createStaticModeChoiceDiv : function () {
        var div = document.createElement("div");
        div.id = this._addUID("GPimportChoice");
        div.className = "fr-my-1w";
        return div;
    },

    /**
     * Create local import choice for KML/GPX/GeoJSON parameters
     *
     * @returns {DOMElement} DOM element
     */
    _createStaticLocalChoiceDiv : function () {
        var context = this;

        var div = document.createElement("div");
        div.className = "GPimportChoiceAlt gpf-radio-group fr-radio-group";

        var input = document.createElement("input");
        input.type = "radio";
        if (input.addEventListener) {
            input.addEventListener("change", function (e) {
                document.getElementById(context._addUID("GPimportValueLocal")).className = "GPimportInputLine fr-mb-1w";
                document.getElementById(context._addUID("GPimportValueUrl")).className = "GPelementHidden gpf-hidden";
                context._onStaticImportTypeChange(e);
            });
        } else if (input.appendChild) {
            input.appendChild("onchange", function () {
                document.getElementById(context._addUID("GPimportValueLocal")).className = "GPimportInputLine fr-mb-1w";
                document.getElementById(context._addUID("GPimportValueUrl")).className = "GPelementHidden gpf-hidden";
                context._onStaticImportTypeChange();
            });
        }
        input.name = "GPimportChoiceMode";
        input.value = "local";
        input.checked = true;
        input.id = this._addUID("GPimportChoiceAltLocal");
        div.appendChild(input);

        var label = document.createElement("label");
        label.className = "GPimportChoiceAltTxt gpf-label fr-label";
        label.htmlFor = this._addUID("GPimportChoiceAltLocal");
        label.innerHTML = "par fichier local";
        label.title = "par fichier local";
        div.appendChild(label);

        return div;
    },

    /**
     * Create url import choice for KML/GPX/GeoJSON parameters
     *
     * @returns {DOMElement} DOM element
     */
    _createStaticUrlChoiceDiv : function () {
        var context = this;

        var div = document.createElement("div");
        div.className = "GPimportChoiceAlt gpf-radio-group fr-radio-group";

        var input = document.createElement("input");
        input.type = "radio";
        if (input.addEventListener) {
            input.addEventListener("change", function (e) {
                document.getElementById(context._addUID("GPimportValueUrl")).className = "GPimportInputLine";
                document.getElementById(context._addUID("GPimportValueLocal")).className = "GPelementHidden gpf-hidden";
                context._onStaticImportTypeChange(e);
            });
        } else if (input.appendChild) {
            input.appendChild("onchange", function () {
                document.getElementById(context._addUID("GPimportValueUrl")).className = "GPimportInputLine";
                document.getElementById(context._addUID("GPimportValueLocal")).className = "GPelementHidden gpf-hidden";
                context._onStaticImportTypeChange();
            });
        }
        input.id = this._addUID("GPimportChoiceAltUrl");
        input.name = "GPimportChoiceMode";
        input.value = "url";
        input.checked = false;
        div.appendChild(input);

        var label = document.createElement("label");
        label.className = "GPimportChoiceAltTxt gpf-label fr-label";
        label.htmlFor = this._addUID("GPimportChoiceAltUrl");
        label.innerHTML = "par URL";
        label.title = "par URL";
        div.appendChild(label);

        return div;
    },

    /**
     * Create input div for KML/GPX/GeoJSON parameters local import
     *
     * @returns {DOMElement} DOM element
     */
    _createStaticLocalInputDiv : function () {
        var div = document.createElement("div");
        div.id = this._addUID("GPimportValueLocal");
        div.className = "GPimportInputLine";
        return div;
    },

    /**
     * Create input label for KML/GPX/GeoJSON parameters local import
     *
     * @returns {DOMElement} DOM element
     */
    _createStaticLocalInputLabel : function () {
        var label = document.createElement("label");
        label.className = "GPlabel gpf-label fr-label fr-mb-1w";
        label.htmlFor = this._addUID("GPimportFile");
        label.innerHTML = "Fichier local";
        label.title = "Fichier local";
        return label;
    },

    /**
     * Create file input for KML/GPX/GeoJSON parameters local import
     *
     * @returns {DOMElement} DOM element
     */
    _createStaticLocalInput : function () {
        var input = document.createElement("input");
        input.type = "file";
        input.id = this._addUID("GPimportFile");
        input.className = "GPimportInputFile gpf-upload fr-upload";
        return input;
    },

    /**
     * Create input div for KML/GPX/GeoJSON parameters url import
     *
     * @returns {DOMElement} DOM element
     */
    _createStaticUrlInputDiv : function () {
        var div = document.createElement("div");
        div.id = this._addUID("GPimportValueUrl");
        div.className = "GPelementHidden gpf-hidden";
        return div;
    },

    /**
     * Create input label for KML/GPX/GeoJSON parameters url import
     *
     * @returns {DOMElement} DOM element
     */
    _createStaticUrlInputLabel : function () {
        var label = document.createElement("label");
        label.className = "GPlabel gpf-label fr-label";
        label.htmlFor = this._addUID("GPimportUrl");
        label.innerHTML = "URL";
        label.title = "URL";
        return label;
    },

    /**
     * Create url input for KML/GPX/GeoJSON parameters url import
     *
     * @returns {DOMElement} DOM element
     */
    _createStaticUrlInput : function () {
        var input = document.createElement("input");
        input.type = "text";
        input.id = this._addUID("GPimportUrl");
        input.className = "GPinput gpf-input fr-input";
        return input;
    },

    // ################################################################### //
    // ######## Params for service params import (WMS//WMTS/WFS) ######### //
    // ################################################################### //

    /**
     * Create container for WMS/WMTS/WFS parameters
     * @param {String} currentType - WMS, WMTS or WFS value
     * @returns {DOMElement} DOM element
     */
    _createServiceParamsContainer : function (currentType) {
        var div = document.createElement("div");
        div.id = this._addUID("GPimportServiceParams");
        if (currentType === "WMS" || currentType === "WMTS" || currentType === "WFS") {
            div.className = "GPelementVisible gpf-visible";
        } else {
            div.className = "GPelementHidden gpf-hidden";
        }

        return div;
    },

    /**
     * Create div for WMS/WMTS/WFS url
     *
     * @returns {DOMElement} DOM element
     */
    _createServiceUrlDiv : function () {
        var div = document.createElement("div");
        div.className = "GPimportInputLine";
        return div;
    },

    /**
     * Create input label for WMS/WMTS/WFS url
     *
     * @returns {DOMElement} DOM element
     */
    _createServiceUrlInputLabel : function () {
        var label = document.createElement("label");
        label.className = "GPlabel gpf-label fr-label";
        label.htmlFor = this._addUID("GPimportServiceUrl");
        label.innerHTML = "URL du service";
        label.title = "URL du service";
        return label;
    },

    /**
     * Create input for WMS/WMTS/WFS parameters url
     *
     * @returns {DOMElement} DOM element
     */
    _createServiceUrlInput : function () {
        var input = document.createElement("input");
        input.type = "text";
        input.id = this._addUID("GPimportServiceUrl");
        input.className = "GPinput gpf-input fr-input";
        return input;
    },

    // ################################################################### //
    // ########################### Submit Form ########################### //
    // ################################################################### //

    /**
     * Create Submit Form Element
     *
     * @returns {DOMElement} DOM element
     */
    _createImportSubmitFormElement : function () {
        var input = document.createElement("input");
        input.id = this._addUID("GPimportSubmit");
        input.className = "GPsubmit gpf-btn fr-btn";
        input.type = "submit";
        input.value = "Importer";

        return input;
    },

    // ################################################################### //
    // ########################### GetCap Panel ########################## //
    // ################################################################### //

    /**
     * Create GetCap Panel Element
     *
     * @returns {DOMElement} DOM element
     */
    _createImportGetCapPanelElement : function () {
        var div = document.createElement("div");
        div.id = this._addUID("GPimportGetCapPanel");
        div.className = "GPpanel GPelementHidden gpf-panel fr-modal gpf-hidden";
        return div;
    },

    /**
     * Create GetCap Panel Header Element
     *
     * @returns {DOMElement} DOM element
     */
    _createImportGetCapPanelHeaderElement : function () {
        // contexte
        var context = this;

        var container = document.createElement("div");
        container.className = "GPpanelHeader gpf-panel__header fr-modal__header";

        // panel title
        var panelTitle = document.createElement("div");
        panelTitle.className = "GPpanelTitle gpf-panel__title fr-modal__title fr-pt-4w";
        panelTitle.innerHTML = "Couches accessibles";
        panelTitle.title = "Couches accessibles";
        container.appendChild(panelTitle);

        // close picto
        var closeDiv = document.createElement("button");
        closeDiv.className = "GPpanelClose GPimportGetCapPanelClose gpf-btn gpf-btn-icon-close fr-btn--close fr-btn fr-btn--tertiary-no-outline fr-m-1w";
        closeDiv.title = "Fermer le panneau";
        closeDiv.id = this._addUID("GPimportGetCapPanelClose");
        if (closeDiv.addEventListener) {
            closeDiv.addEventListener("click", function () {
                document.getElementById(context._addUID("GPshowImportPicto")).click();
                document.getElementById(context._addUID("GPimportGetCapPanel")).classList.replace("GPelementVisible", "GPelementHidden");
                document.getElementById(context._addUID("GPimportGetCapPanel")).classList.replace("gpf-visible", "gpf-hidden");
                context._onGetCapPanelClose();
            });
        } else if (closeDiv.attachEvent) {
            closeDiv.attachEvent("click", function () {
                document.getElementById(context._addUID("GPshowImportPicto")).click();
                document.getElementById(context._addUID("GPimportGetCapPanel")).classList.replace("GPelementVisible", "GPelementHidden");
                document.getElementById(context._addUID("GPimportGetCapPanel")).classList.replace("gpf-visible", "gpf-hidden");
                context._onGetCapPanelClose();
            });
        }

        var span = document.createElement("span");
        span.className = "GPelementHidden gpf-visible"; // afficher en dsfr
        span.innerText = "Fermer";

        closeDiv.appendChild(span);

        container.appendChild(closeDiv);

        return container;
    },

    /**
     * Create GetCap Results List Element
     *
     * @returns {DOMElement} DOM element
     */
    _createImportGetCapResultsContainer : function () {
        var container = document.createElement("div");
        container.className = "GPimportGetCapRoot gpf-panel__list";
        container.id = this._addUID("GPimportGetCapResults");

        return container;
    },

    _addImportGetCapResultListRubrique : function (title, container) {
        var ul = document.createElement("ul");
        ul.className = "GPimportGetCapListRubrique";
        ul.title = title;

        container.appendChild(ul);
        return container;
    },

    _addImportGetCapResultRubrique : function (title, container) {
        var li = document.createElement("li");
        li.className = "GPimportGetCapRubrique gpf-panel__items_layerimport"; /* gpf-panel__items */

        // input
        var input = document.createElement("input");
        input.id = "GPimportGetCapRubrique-" + SelectorID.generate();
        input.className = "GPimportGetCapRubrique";
        input.type = "checkbox";
        li.appendChild(input);

        // label for
        var label = document.createElement("label");
        label.className = "GPimportGetCapRubriqueTitle gpf-label fr-btn fr-btn--secondary";
        label.htmlFor = input.id;
        label.innerHTML = title;
        label.title = title;
        li.appendChild(label);

        container.appendChild(li);
        return container;
    },

    _addImportGetCapResultListLayer : function (container) {
        var ul = document.createElement("ul");
        ul.className = "GPimportGetCapListLayer";

        container.appendChild(ul);
        return container;
    },

    _addImportGetCapResultLayer : function (description, id, container) {
        var li = document.createElement("li");
        li.className = "GPimportGetCapProposal gpf-panel__items_layerimport gpf-panel__items";
        li.innerHTML = description.content;
        li.title = description.title;
        li.id = "GPimportGetCapProposal_" + id;

        var context = this;
        if (li.addEventListener) {
            li.addEventListener("click", function (e) {
                context._onGetCapResponseLayerClick(e);
            });
        } else if (li.attachEvent) {
            li.attachEvent("onclick", function () {
                context._onGetCapResponseLayerClick();
            });
        }

        container.appendChild(li);
        return container;
    },

    // ################################################################### //
    // ########################### MapBox Panel ########################## //
    // ################################################################### //

    /**
     * Create MapBox Panel Element
     *
     * @returns {DOMElement} DOM element
     */
    _createImportMapBoxPanelElement : function () {
        var div = document.createElement("div");
        div.id = this._addUID("GPimportMapBoxPanel");
        div.className = "GPpanel GPelementHidden gpf-panel fr-modal gpf-hidden";
        return div;
    },

    /**
     * Create MapBox Panel Header Element
     *
     * @returns {DOMElement} DOM element
     */
    _createImportMapBoxPanelHeaderElement : function () {
        // contexte
        var context = this;

        var container = document.createElement("div");
        container.className = "GPpanelHeader gpf-panel__header fr-modal__header";

        // return picto
        var returnDiv = document.createElement("button");
        returnDiv.id = this._addUID("GPimportMapBoxPanelReturnPicto");
        returnDiv.title = "Nouvel import";
        returnDiv.className = "GPreturnPicto GPimportMapBoxPanelReturnPicto gpf-btn gpf-btn-icon-return fr-btn fr-btn--secondary gpf-btn--secondary";
        if (returnDiv.addEventListener) {
            returnDiv.addEventListener("click", function (e) {
                document.getElementById(context._addUID("GPshowImportPicto")).click();
                context._onMapBoxReturnPictoClick(e);
            });
        } else if (returnDiv.attachEvent) {
            returnDiv.attachEvent("onclick", function (e) {
                document.getElementById(context._addUID("GPshowImportPicto")).click();
                context._onMapBoxReturnPictoClick(e);
            });
        }
        container.appendChild(returnDiv);

        // panel title
        var panelTitle = document.createElement("div");
        panelTitle.className = "GPpanelTitle gpf-panel__title fr-modal__title fr-pt-4w";
        panelTitle.innerHTML = "Edition des styles";
        panelTitle.title = "Edition des styles";
        container.appendChild(panelTitle);

        // close picto
        var closeDiv = document.createElement("button");
        closeDiv.className = "GPpanelClose GPimportMapBoxPanelClose gpf-btn gpf-btn-icon-close fr-btn--close fr-btn fr-btn--tertiary-no-outline fr-m-1w";
        closeDiv.title = "Fermer le panneau";
        closeDiv.id = this._addUID("GPimportMapBoxPanelClose");
        if (closeDiv.addEventListener) {
            closeDiv.addEventListener("click", function () {
                document.getElementById(context._addUID("GPshowImportPicto")).click();
                document.getElementById(context._addUID("GPimportMapBoxPanel")).style.display = "none";
                context._onMapBoxPanelClose();
            });
        } else if (closeDiv.attachEvent) {
            closeDiv.attachEvent("click", function () {
                document.getElementById(context._addUID("GPshowImportPicto")).click();
                document.getElementById(context._addUID("GPimportMapBoxPanel")).style.display = "none";
                context._onMapBoxPanelClose();
            });
        }

        var span = document.createElement("span");
        span.className = "GPelementHidden gpf-visible"; // afficher en dsfr
        span.innerText = "Fermer";

        closeDiv.appendChild(span);

        container.appendChild(closeDiv);

        return container;
    },

    /**
     * Create MapBox Results List Element
     *
     * @returns {DOMElement} DOM element
     */
    _createImportMapBoxResultsContainer : function () {
        var container = document.createElement("div");
        container.className = "GPimportMapBoxpRoot";
        container.id = this._addUID("GPimportMapBoxResults");
        return container;
    }

    // _addImportMapBoxResultListSource : function (id, source, container) {
    //     var ul = document.createElement("ul");
    //     ul.className = "GPimportMapBoxListSource";
    //     ul.title = id;
    //
    //     var label = document.createElement("label");
    //     label.className = "GPimportMapBoxListSourceTitle";
    //     label.innerHTML = "Listes des couches pour la source '" + id + "' :";
    //     label.title = source.attribution || id;
    //     ul.appendChild(label);
    //
    //     container.appendChild(ul);
    //     return container;
    // },
    //
    // _addImportMapBoxResultSource : function (layer, container) {
    //     var li = document.createElement("li");
    //     li.className = "GPimportMapBoxSource";
    //
    //     // input
    //     var input = document.createElement("input");
    //     input.id = "GPimportMapBoxSource-" + SelectorID.generate();
    //     input.className = "GPimportMapBoxSource";
    //     input.type = "checkbox";
    //     li.appendChild(input);
    //
    //     // label for
    //     var name = layer["source-layer"] || layer.id || layer.source;
    //     var label = document.createElement("label");
    //     label.className = "GPimportMapBoxSourceTitle";
    //     label.htmlFor = input.id;
    //     label.innerHTML = name;
    //     label.title = JSON.stringify(layer.metadata) || name;
    //     li.appendChild(label);
    //
    //     container.appendChild(li);
    //     return container;
    // },
    //
    // _addImportMapBoxStyleSource : function (layer, container) {
    //     // contexte
    //     var self = this;
    //
    //     var _style = false;
    //     var _obj = {};
    //     var _layer = JSON.parse(JSON.stringify(layer)); // on utilise une copie  !
    //     if (_layer.paint && Object.keys(_layer.paint).length) {
    //         _style = true;
    //         _obj.paint = _layer.paint;
    //     }
    //
    //     // pas de style dans paint, on teste dans layout !
    //     if (_layer.layout && Object.keys(_layer.layout).length) {
    //         _style = true;
    //         _obj.layout = _layer.layout;
    //         // on supprime visibility à l'affichage uniquement
    //         // cf. _addImportMapBoxVisibilitySource !
    //         if (_layer.layout.visibility) {
    //             delete _obj.visibility;
    //         }
    //     }
    //
    //     function syntaxHighlight (json) {
    //         json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    //         return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, function (match) {
    //             var cls = "gp-json-number";
    //             if (/^"/.test(match)) {
    //                 if (/:$/.test(match)) {
    //                     cls = "gp-json-key";
    //                 } else {
    //                     cls = "gp-json-string";
    //                 }
    //             } else if (/true|false/.test(match)) {
    //                 cls = "gp-json-boolean";
    //             } else if (/null/.test(match)) {
    //                 cls = "gp-json-null";
    //             }
    //             return "<span class='" + cls + "'>" + match + "</span>";
    //         });
    //     }
    //
    //     var div = document.createElement("div");
    //     div.className = "GPimportMapBoxSourceStyle";
    //
    //     if (_style) {
    //         var strJson = JSON.stringify(_obj, null, 4);
    //
    //         var label = document.createElement("label");
    //         label.innerHTML = "JSON Styles :";
    //         div.appendChild(label);
    //         var pre = document.createElement("pre");
    //         pre.className = "GPimportMapBoxJsonEdit";
    //         pre.innerHTML = syntaxHighlight(strJson);
    //         if (pre.addEventListener) {
    //             pre.addEventListener("click", function (e) {
    //                 self._onSwitchStyleEditSourceMapBox(e);
    //             });
    //         } else if (pre.appendChild) {
    //             pre.appendChild("onclick", function (e) {
    //                 self._onSwitchStyleEditSourceMapBox(e);
    //             });
    //         }
    //         div.appendChild(pre);
    //     }
    //
    //     container.appendChild(div);
    //     return container;
    // },
    //
    // _addImportMapBoxFilterSource : function (layer, container) {
    //     // contexte
    //     var self = this;
    //
    //     var _filter = false;
    //     // FIXME tag filter est obselete !
    //     // on doit utiliser les expressions dans "paint" ou "layout" !
    //     if (layer.filter && layer.filter.length) {
    //         _filter = true;
    //     }
    //
    //     var div = document.createElement("div");
    //     div.className = "GPimportMapBoxSourceFilter";
    //
    //     if (_filter) {
    //         var label = document.createElement("label");
    //         label.innerHTML = "JSON Filtres :";
    //         div.appendChild(label);
    //         var pre = document.createElement("pre");
    //         pre.className = "GPimportMapBoxJsonEdit";
    //         pre.innerHTML = JSON.stringify(layer.filter, null, 4);
    //         if (pre.addEventListener) {
    //             pre.addEventListener("click", function (e) {
    //                 self._onSwitchFilterEditSourceMapBox(e);
    //             });
    //         } else if (pre.appendChild) {
    //             pre.appendChild("onclick", function (e) {
    //                 self._onSwitchFilterEditSourceMapBox(e);
    //             });
    //         }
    //         div.appendChild(pre);
    //     }
    //
    //     container.appendChild(div);
    //     return container;
    // },
    //
    // _addImportMapBoxScaleSource : function (layer, container) {
    //     // contexte
    //     var self = this;
    //
    //     var _scaleMin = layer.minzoom || 0;
    //     var _scaleMax = layer.maxzoom || 21;
    //
    //     var div = document.createElement("div");
    //     div.className = "GPimportMapBoxSourceScale";
    //
    //     var labelMin = document.createElement("label");
    //     labelMin.className = "GPimportMapBoxSourceScaleLabel";
    //     labelMin.innerHTML = "minZoom :";
    //     div.appendChild(labelMin);
    //
    //     var inputMin = document.createElement("input");
    //     inputMin.className = "GPimportMapBoxSourceScaleInput";
    //     inputMin.type = "range";
    //     inputMin.value = _scaleMin;
    //     inputMin.title = _scaleMin;
    //     inputMin.disabled = false;
    //     inputMin.min = 0;
    //     inputMin.max = 21;
    //     if (inputMin.addEventListener) {
    //         inputMin.addEventListener("change", function (e) {
    //             self._onChangeScaleMinSourceMapBox(e, layer);
    //         });
    //     } else if (inputMin.appendChild) {
    //         inputMin.appendChild("onchange", function (e) {
    //             self._onChangeScaleMinSourceMapBox(e, layer);
    //         });
    //     }
    //     div.appendChild(inputMin);
    //
    //     div.appendChild(document.createElement("br"));
    //
    //     var labelMax = document.createElement("label");
    //     labelMax.className = "GPimportMapBoxSourceScaleLabel";
    //     labelMax.innerHTML = "maxZoom :";
    //     div.appendChild(labelMax);
    //
    //     var inputMax = document.createElement("input");
    //     inputMax.className = "GPimportMapBoxSourceScaleInput";
    //     inputMax.type = "range";
    //     inputMax.value = _scaleMax;
    //     inputMax.title = _scaleMax;
    //     inputMax.disabled = false;
    //     inputMax.min = 0;
    //     inputMax.max = 21;
    //     if (inputMax.addEventListener) {
    //         inputMax.addEventListener("change", function (e) {
    //             self._onChangeScaleMaxSourceMapBox(e, layer);
    //         });
    //     } else if (inputMax.appendChild) {
    //         inputMax.appendChild("onchange", function (e) {
    //             self._onChangeScaleMaxSourceMapBox(e, layer);
    //         });
    //     }
    //     div.appendChild(inputMax);
    //
    //     container.appendChild(div);
    //     return container;
    // },
    //
    // _addImportMapBoxVisibilitySource : function (layer, container) {
    //     // contexte
    //     var self = this;
    //
    //     var _visibility = true;
    //     if (layer.layout && layer.layout.visibility && layer.layout.visibility === "none") {
    //         _visibility = false;
    //     }
    //
    //     var div = document.createElement("div");
    //     div.className = "GPimportMapBoxSourceVisibility";
    //
    //     var label = document.createElement("label");
    //     label.className = "GPimportMapBoxSourceVisibilityLabel";
    //     label.innerHTML = "Visibilité :";
    //     div.appendChild(label);
    //
    //     var input = document.createElement("input");
    //     input.className = "GPimportMapBoxSourceVisibilityInput";
    //     input.type = "checkbox";
    //     input.checked = _visibility;
    //     input.disabled = false;
    //     if (input.addEventListener) {
    //         input.addEventListener("change", function (e) {
    //             self._onChangeVisibilitySourceMapBox(e, layer);
    //         });
    //     } else if (input.appendChild) {
    //         input.appendChild("onchange", function (e) {
    //             self._onChangeVisibilitySourceMapBox(e, layer);
    //         });
    //     }
    //     div.appendChild(input);
    //
    //     container.appendChild(div);
    //     return container;
    // }
};

export default LayerImportDOM;
