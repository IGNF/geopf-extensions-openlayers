import ID from "../../Utils/SelectorID";
import GeocodeUtils from "../../Utils/GeocodeUtils";
import checkDsfr from "../Utils/CheckDsfr";

var SearchEngineDOM = {

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
        container.id = this._addUID("GPsearchEngine");
        container.className = "GPwidget gpf-widget";
        return container;
    },

    // ################################################################### //
    // ################### Methods of main container ##################### //
    // ################################################################### //

    /**
     * SElement with picto and search input
     * @returns {DOMElement} DOM element
     */
    _createSearchDivElement : function () {
        var searchDiv = document.createElement("div");
        searchDiv.id = this._addUID("GPshowSearchDiv");
        return searchDiv;
    },

    /**
     * Show search engine
     * @param {Boolean} collapsible - ...
     * @returns {DOMElement} DOM element
     */
    _createShowSearchEnginePictoElement : function (collapsible) {
        // contexte d'execution
        var self = this;
        if (checkDsfr()) {
            // Jamais collapsible en DSFR
            collapsible = true;
        }

        var button = document.createElement("button");
        button.id = this._addUID("GPshowSearchEnginePicto");
        button.className = "GPshowOpen GPshowAdvancedToolPicto GPshowSearchEnginePicto gpf-btn gpf-btn-icon-search fr-btn";
        button.title = "Afficher/masquer la recherche par lieux";
        if (checkDsfr()) {
            // Pas la même du bouton fonction en DSFR
            button.title = "Rechercher";
        }
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", !collapsible);
        button.disabled = !collapsible;
        button.setAttribute("type", "button");

        // Close all results and panels when minimizing the widget
        button.addEventListener("click", function (e) {
            if (checkDsfr()) {
                // En DSFR, le bouton fait la même chose que la touche Entrée
                var container = document.getElementById(self._addUID("GPautocompleteResults"));
                var curr = container.getElementsByClassName("GPautoCompleteProposal gpf-panel__items gpf-panel__items_searchengine current");
                var list = container.getElementsByClassName("GPautoCompleteProposal gpf-panel__items gpf-panel__items_searchengine");

                // si aucune suggestion, on ne va pas plus loin !
                var length = list.length;
                if (!length) {
                    return;
                }

                var current = null;

                // si aucun item courant, on prend le 1er !
                if (!curr.length) {
                    current = list[0];
                    current.className = "GPautoCompleteProposal gpf-panel__items gpf-panel__items_searchengine current";
                    current.style.color = "#000000";
                    current.style["background-color"] = "#CEDBEF";
                } else {
                    current = curr[0];
                }
                current.click();
                return;
            }
            var status = (e.target.ariaPressed === "true");
            e.target.setAttribute("aria-pressed", !status);
            if (status) {}

            document.getElementById(self._addUID("GPautoCompleteList")).classList.replace("GPelementVisible", "GPelementHidden");
            document.getElementById(self._addUID("GPautoCompleteList")).classList.replace("gpf-visible", "gpf-hidden");
            document.getElementById(self._addUID("GPgeocodeResultsList")).classList.replace("GPelementVisible", "GPelementHidden");
            document.getElementById(self._addUID("GPgeocodeResultsList")).classList.replace("gpf-visible", "gpf-hidden");
            var showAdvancedSearch = document.getElementById(self._addUID("GPshowAdvancedSearch"));
            if (showAdvancedSearch) {
                showAdvancedSearch.style.display = null;
                document.getElementById(self._addUID("GPadvancedSearchPanel")).classList.replace("GPelementVisible", "GPelementHidden");
                document.getElementById(self._addUID("GPadvancedSearchPanel")).classList.replace("gpf-visible", "gpf-hidden");
            }
            var showGeolocate = document.getElementById(self._addUID("GPshowGeolocate"));
            if (showGeolocate) {
                showGeolocate.style.display = null;
            }
            var showCoordinate = document.getElementById(self._addUID("GPshowSearchByCoordinate"));
            if (showCoordinate) {
                showCoordinate.style.display = null;
            }
            var id = "#GPsearchInput-" + self._uid;
            document.querySelector(id + " input").disabled = false; // FIXME form[id^=GPsearchInput] = #GPsearchInput ?
            if (checkDsfr()) {
                document.querySelector("#GPshowSearchEnginePicto-" + self._uid).disabled = false;
            }
            self.onShowSearchEngineClick(e);
        });

        return button;
    },

    /**
     * Simple search input
     * @param {String} placeholder - placeholder
     *
     * @returns {DOMElement} DOM element
     */
    _createSearchInputElement : function (placeholder) {
        // contexte d'execution
        var self = this;

        var form = document.createElement("form");
        form.id = this._addUID("GPsearchInput");
        form.className = "gpf-panel__content fr-modal__content";
        // Open geocode results panel when submitting the input
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            if (document.getElementById(self._addUID("GPsearchInputText")).value === "") {
                return false;
            }
            document.getElementById(self._addUID("GPgeocodeResultsList")).classList.replace("GPelementHidden", "GPelementVisible");
            document.getElementById(self._addUID("GPgeocodeResultsList")).classList.replace("gpf-hidden", "gpf-visible");

            document.getElementById(self._addUID("GPautoCompleteList")).classList.replace("GPelementVisible", "GPelementHidden");
            document.getElementById(self._addUID("GPautoCompleteList")).classList.replace("gpf-visible", "gpf-hidden");
            // cf. FIXME
            // document.querySelector("#GPsearchInput input").blur ();

            // gestionnaire d'evenement :
            // on récupère la valeur de saisie pour requête sur le service de geocodage
            self.onGeocodingSearchSubmit(e);
            return false;
        });

        var input = document.createElement("input");
        input.id = this._addUID("GPsearchInputText");
        input.className = "GPsearchInputText gpf-input fr-input";
        input.type = "text";
        input.placeholder = placeholder;
        input.autocomplete = "off";
        // Manage autocomplete list appearance when filling the address input
        input.addEventListener("keyup", function (e) {
            var charCode = e.which || e.keyCode;
            if (charCode === 13 || charCode === 10 || charCode === 38 || charCode === 40) {
                return;
            }
            document.getElementById(self._addUID("GPgeocodeResultsList")).classList.replace("GPelementVisible", "GPelementHidden");
            document.getElementById(self._addUID("GPgeocodeResultsList")).classList.replace("gpf-visible", "gpf-hidden");
            if (input.value.length > 2) {
                document.getElementById(self._addUID("GPautoCompleteList")).classList.replace("GPelementHidden", "GPelementVisible");
                document.getElementById(self._addUID("GPautoCompleteList")).classList.replace("gpf-hidden", "gpf-visible");
            } else {
                document.getElementById(self._addUID("GPautoCompleteList")).classList.replace("GPelementVisible", "GPelementHidden");
                document.getElementById(self._addUID("GPautoCompleteList")).classList.replace("gpf-visible", "gpf-hidden");
            }
            // gestionnaire d'evenement :
            // on récupère la valeur de saisie pour requête sur le service d'autocompletion
            self.onAutoCompleteSearchText(e);
        });

        // FIXME ce code interfere avec le click sur la liste des suggested locations !
        // input.addEventListener("blur", function (e) {
        //     document.getElementById(self._addUID("GPautoCompleteList")).style.display = "none";
        // });

        input.addEventListener("keydown", function (e) {
            // FIXME
            // l'action clavier 'enter (13)' lance le submit de la form !
            // Ce comportement n'est pas souhaité car le submit execute un geocodage !
            // Il faut donc trouver le moyen d'eviter le submit sur un return venant
            // seulement d'une selection de suggestion...

            var charCode = e.which || e.keyCode;
            if (charCode === 13) {
                e.preventDefault();
            }
            var container = document.getElementById(self._addUID("GPautocompleteResults"));

            // si aucun container !?
            if (!container) {
                return;
            }

            var curr = container.getElementsByClassName("GPautoCompleteProposal gpf-panel__items gpf-panel__items_searchengine current");
            var list = container.getElementsByClassName("GPautoCompleteProposal gpf-panel__items gpf-panel__items_searchengine");

            // si aucune suggestion, on ne va pas plus loin !
            var length = list.length;
            if (!length) {
                return;
            }

            var current = null;

            // si aucun item courant, on prend le 1er !
            if (!curr.length) {
                current = list[0];
                current.className = "GPautoCompleteProposal gpf-panel__items gpf-panel__items_searchengine current";
                current.style.color = "#000000";
                current.style["background-color"] = "#CEDBEF";
                if (charCode !== 13) {
                    return;
                }
            } else {
                current = curr[0];
            }

            var index = parseInt(ID.index(current.id), 10);
            var next = (index === length - 1) ? list[0] : list[index + 1];
            var prev = (index === 0) ? list[length - 1] : list[index - 1];

            current.style["background-color"] = "";
            current.style.color = "";
            prev.style["background-color"] = "";
            prev.style.color = "";
            next.style["background-color"] = "";
            next.style.color = "";

            switch (charCode) {
                case 38: // arrow up
                    current.className = "GPautoCompleteProposal gpf-panel__items gpf-panel__items_searchengine";
                    prev.className = "GPautoCompleteProposal gpf-panel__items gpf-panel__items_searchengine current";
                    prev.style.color = "#000000";
                    prev.style["background-color"] = "#CEDBEF";
                    current.scrollIntoView();
                    break;
                case 40: // arrow down
                    current.className = "GPautoCompleteProposal gpf-panel__items gpf-panel__items_searchengine";
                    next.className = "GPautoCompleteProposal gpf-panel__items gpf-panel__items_searchengine current";
                    next.style.color = "#000000";
                    next.style["background-color"] = "#CEDBEF";
                    current.scrollIntoView();
                    break;
                case 13: // enter
                    // cf. FIXME
                    e.preventDefault();
                    current.click(e);
                    break;
            }

            current.focus();
        });

        form.appendChild(input);

        return form;
    },

    _createSearchResetElement : function () {
        // contexte d'execution
        var self = this;

        var buttonReset = document.createElement("button");
        buttonReset.id = this._addUID("GPsearchInputReset");
        buttonReset.className = "GPshowOpen GPsearchInputReset gpf-btn gpf-btn-icon-reset gpf-btn-icon-search-reset fr-btn fr-btn--secondary gpf-btn--secondary"; /* not use : fr-btn--close */
        buttonReset.setAttribute("aria-label", "Supprimer la recherche");
        // Reset input
        buttonReset.addEventListener("click", function (e) {
            // FIXME event déclenché sur la frappe "return" dans la zone de saisie !?
            document.getElementById(self._addUID("GPsearchInputText")).value = "";
            document.getElementById(self._addUID("GPautoCompleteList")).classList.replace("GPelementVisible", "GPelementHidden");
            document.getElementById(self._addUID("GPautoCompleteList")).classList.replace("gpf-visible", "gpf-hidden");

            document.getElementById(self._addUID("GPgeocodeResultsList")).classList.replace("GPelementVisible", "GPelementHidden");
            document.getElementById(self._addUID("GPgeocodeResultsList")).classList.replace("gpf-visible", "gpf-hidden");
            self.onSearchResetClick();
        });

        return buttonReset;
    },


    _createButtonsElement : function () {
        var div = document.createElement("div");
        div.className = "GPbuttonsContainer";
        return div;
    },

    _createFirstLineWrapper : function () {
        var div = document.createElement("div");
        div.className = "GPsearchFirstLineWrapper";
        return div;
    },

    _createRadioContainer : function () {
        var div = document.createElement("div");
        div.className = "GPsearchRadioContainer";
        return div;
    },

    _createRadioElements : function () {
        var div = document.createElement("div");
        div.className = "GPsearchRadioElements";
        var choiceLocations = document.createElement("div");
        choiceLocations.className = "GPsearchSplitChoice gpf-flex gpf-radio-group fr-radio-group fr-my-1w";
        var inputLocations = document.createElement("input");
        inputLocations.id = this._addUID("GPsearchSplitLocations");
        inputLocations.type = "radio";
        inputLocations.name = "GPsearchSplit";
        inputLocations.value = "address";
        inputLocations.checked = true;

        choiceLocations.appendChild(inputLocations);

        var labelLocations = document.createElement("label");
        labelLocations.className = "gpf-label fr-label";
        labelLocations.htmlFor = this._addUID("GPsearchSplitLocations");
        labelLocations.title = "Adresses";
        labelLocations.innerHTML = "Adresses";
        choiceLocations.appendChild(labelLocations);
        if (inputLocations.addEventListener) {
            inputLocations.addEventListener("change", function () {
                if (inputLocations.checked) {
                    document.querySelector("[id^='GPautocompleteResultsSuggest']").classList.add("gpf-hidden", "GPelementHidden");
                    document.querySelector("[id^='GPautocompleteResultsLocation']").classList.remove("gpf-hidden", "GPelementHidden");
                } else {
                    document.querySelector("[id^='GPautocompleteResultsSuggest']").classList.remove("gpf-hidden", "GPelementHidden");
                    document.querySelector("[id^='GPautocompleteResultsLocation']").classList.add("gpf-hidden", "GPelementHidden");
                }
            });
        } else if (inputLocations.attachEvent) {
            inputLocations.attachEvent("onchange", function () {
                if (inputLocations.checked) {
                    document.querySelector("[id^='GPautocompleteResultsSuggest']").classList.add("gpf-hidden", "GPelementHidden");
                    document.querySelector("[id^='GPautocompleteResultsLocation']").classList.remove("gpf-hidden", "GPelementHidden");
                } else {
                    document.querySelector("[id^='GPautocompleteResultsSuggest']").classList.remove("gpf-hidden", "GPelementHidden");
                    document.querySelector("[id^='GPautocompleteResultsLocation']").classList.add("gpf-hidden", "GPelementHidden");
                }
            });
        }

        var choiceData = document.createElement("div");
        choiceData.className = "GPsearchSplitChoice gpf-flex gpf-radio-group fr-radio-group fr-my-1w";
        var inputData = document.createElement("input");
        inputData.id = this._addUID("GPsearchSplitData");
        inputData.type = "radio";
        inputData.name = "GPsearchSplit";
        inputData.value = "data";

        choiceData.appendChild(inputData);

        var labelData = document.createElement("label");
        labelData.className = "gpf-label fr-label";
        labelData.htmlFor = this._addUID("GPsearchSplitData");
        labelData.title = "Cartes et données";
        labelData.innerHTML = "Cartes et données";
        choiceData.appendChild(labelData);
        if (inputData.addEventListener) {
            inputData.addEventListener("change", function () {
                if (inputData.checked) {
                    document.querySelector("[id^='GPautocompleteResultsSuggest']").classList.remove("gpf-hidden", "GPelementHidden");
                    document.querySelector("[id^='GPautocompleteResultsLocation']").classList.add("gpf-hidden", "GPelementHidden");
                } else {
                    document.querySelector("[id^='GPautocompleteResultsSuggest']").classList.add("gpf-hidden", "GPelementHidden");
                    document.querySelector("[id^='GPautocompleteResultsLocation']").classList.remove("gpf-hidden", "GPelementHidden");
                }
            });
        } else if (inputData.attachEvent) {
            inputData.attachEvent("onchange", function () {
                if (inputData.checked) {
                    document.querySelector("[id^='GPautocompleteResultsSuggest']").classList.remove("gpf-hidden", "GPelementHidden");
                    document.querySelector("[id^='GPautocompleteResultsLocation']").classList.remove("gpf-hidden", "GPelementHidden");
                } else {
                    document.querySelector("[id^='GPautocompleteResultsSuggest']").classList.remove("gpf-hidden", "GPelementHidden");
                    document.querySelector("[id^='GPautocompleteResultsLocation']").classList.add("gpf-hidden", "GPelementHidden");
                }
            });
        }

        div.appendChild(choiceLocations);
        div.appendChild(choiceData);

        return [div, inputLocations, inputData];
    },

    /**
     * Show advanced search panel
     *
     * @returns {DOMElement} DOM element
     */
    _createShowAdvancedSearchElement : function () {
        // contexte d'execution
        var self = this;

        var span = document.createElement("span");
        span.id = this._addUID("GPshowAdvancedSearch");
        span.className = "GPshowOpen  GPshowAdvancedSearch";
        span.innerText = "Recherche avancée";
        span.setAttribute("tabindex", "0");
        span.setAttribute("aria-pressed", false);

        // Open advanced search
        span.addEventListener("click", function (e) {
            var status = (e.target.ariaPressed === "true");
            e.target.setAttribute("aria-pressed", !status);

            var id = "#GPsearchInput-" + self._uid;
            if (status) {
                document.getElementById(self._addUID("GPadvancedSearchPanel")).classList.replace("GPelementVisible", "GPelementHidden");
                document.getElementById(self._addUID("GPadvancedSearchPanel")).classList.replace("gpf-visible", "gpf-hidden");
                document.querySelector(id + " input").disabled = false;
                // only if displayButtonClose option is set to true
                if (document.querySelector(id + " .GPsearchInputReset")) {
                    document.querySelector(id + " .GPsearchInputReset").disabled = false;
                }
                if (checkDsfr()) {
                    document.querySelector("#GPshowSearchEnginePicto-" + self._uid).disabled = false;
                }
            } else {
                document.getElementById(self._addUID("GPadvancedSearchPanel")).classList.replace("GPelementHidden", "GPelementVisible");
                document.getElementById(self._addUID("GPadvancedSearchPanel")).classList.replace("gpf-hidden", "gpf-visible");
                document.querySelector(id + " input").disabled = true;
                // only if displayButtonClose option is set to true
                if (document.querySelector(id + " .GPsearchInputReset")) {
                    document.querySelector(id + " .GPsearchInputReset").disabled = true;
                }
                if (checkDsfr()) {
                    document.querySelector("#GPshowSearchEnginePicto-" + self._uid).disabled = true;
                }
            }

            document.getElementById(self._addUID("GPautoCompleteList")).classList.replace("GPelementVisible", "GPelementHidden");
            document.getElementById(self._addUID("GPautoCompleteList")).classList.replace("gpf-visible", "gpf-hidden");

            document.getElementById(self._addUID("GPgeocodeResultsList")).classList.replace("GPelementVisible", "GPelementHidden");
            document.getElementById(self._addUID("GPgeocodeResultsList")).classList.replace("gpf-visible", "gpf-hidden");

            document.getElementById(self._addUID("GPcoordinateSearchPanel")).classList.replace("GPelementVisible", "GPelementHidden");
            document.getElementById(self._addUID("GPcoordinateSearchPanel")).classList.replace("gpf-visible", "gpf-hidden");
            document.getElementById(self._addUID("GPshowSearchByCoordinate")).setAttribute("aria-pressed", false);
        });

        return span;
    },

    /**
     * Show geolocate button
     *
     * @returns {DOMElement} DOM element
     */
    _createShowGeolocateElement : function () {
        // contexte d'execution
        var self = this;

        var button = document.createElement("button");
        button.id = this._addUID("GPshowGeolocate");
        button.className = "GPshowOpen GPshowAdvancedToolPicto GPshowGeolocate gpf-btn gpf-btn-icon-search-geolocate fr-btn fr-btn--secondary gpf-btn--secondary fr-m-1w";
        button.title = "Activer la géolocalisation";
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", false);

        // Open advanced search
        button.addEventListener("click", function (e) {
            var status = (e.target.ariaPressed === "true");
            e.target.setAttribute("aria-pressed", !status);
            if (status) {
                // somme stuff...
            }
            self.onShowSearchGeolocateClick(e);
        });

        return button;
    },

    /**
     * Show search by coordinate button
     *
     * @returns {DOMElement} DOM element
     */
    _createShowSearchByCoordinateElement : function () {
        // contexte d'execution
        var self = this;

        var button = document.createElement("button");
        button.id = this._addUID("GPshowSearchByCoordinate");
        button.className = "GPshowOpen GPshowAdvancedToolPicto GPshowSearchByCoordinate gpf-btn gpf-btn-icon-search-coordinate fr-btn fr-btn--secondary gpf-btn--secondary fr-m-1w";
        button.title = "Ouvrir la recherche par coordonnées";
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", false);

        // Open advanced search
        button.addEventListener("click", function (e) {
            var status = (e.target.ariaPressed === "true");
            e.target.setAttribute("aria-pressed", !status);
            var id = "#GPsearchInput-" + self._uid;
            if (status) {
                document.getElementById(self._addUID("GPcoordinateSearchPanel")).classList.replace("GPelementVisible", "GPelementHidden");
                document.getElementById(self._addUID("GPcoordinateSearchPanel")).classList.replace("gpf-visible", "gpf-hidden");
                document.querySelector(id + " input").disabled = false;
                document.querySelector(id + " .GPsearchInputReset").disabled = false;
                if (checkDsfr()) {
                    document.querySelector("#GPshowSearchEnginePicto-" + self._uid).disabled = false;
                }
            } else {
                document.getElementById(self._addUID("GPcoordinateSearchPanel")).classList.replace("GPelementHidden", "GPelementVisible");
                document.getElementById(self._addUID("GPcoordinateSearchPanel")).classList.replace("gpf-hidden", "gpf-visible");
                document.querySelector(id + " input").disabled = true;
                document.querySelector(id + " .GPsearchInputReset").disabled = true;
                if (checkDsfr()) {
                    document.querySelector("#GPshowSearchEnginePicto-" + self._uid).disabled = true;
                }
            }

            document.getElementById(self._addUID("GPautoCompleteList")).classList.replace("GPelementVisible", "GPelementHidden");
            document.getElementById(self._addUID("GPautoCompleteList")).classList.replace("gpf-visible", "gpf-hidden");

            document.getElementById(self._addUID("GPgeocodeResultsList")).classList.replace("GPelementVisible", "GPelementHidden");
            document.getElementById(self._addUID("GPgeocodeResultsList")).classList.replace("gpf-visible", "gpf-hidden");

            document.getElementById(self._addUID("GPadvancedSearchPanel")).classList.replace("GPelementVisible", "GPelementHidden");
            document.getElementById(self._addUID("GPadvancedSearchPanel")).classList.replace("gpf-visible", "gpf-hidden");
            document.getElementById(self._addUID("GPshowAdvancedSearch")).setAttribute("aria-pressed", false);
        });

        return button;
    },



    // ################################################################### //
    // ################### Methods of advanced search #################### //
    // ################################################################### //

    /**
     * Advanced search panel
     *
     * FIXME
     * don't call this._createAdvancedSearchPanelHeaderElement
     * don't call this._createAdvancedSearchPanelFormElement
     *
     * @returns {DOMElement} DOM element
     */
    _createAdvancedSearchPanelElement : function () {
        var div = document.createElement("dialog");
        div.id = this._addUID("GPadvancedSearchPanel");
        div.className = "GPpanel GPelementHidden gpf-panel gpf-hidden fr-modal";

        // FIXME on decompose la fonction pour les besoins du controle,
        // on ajoutera ces childs à la main...
        // div.appendChild(this._createAdvancedSearchPanelHeaderElement ());
        // div.appendChild(this._createAdvancedSearchPanelFormElement ());

        return div;
    },

    _createAdvancedSearchPanelDivElement : function () {
        var div = document.createElement("div");
        div.className = "gpf-panel__body fr-modal__body";
        return div;
    },

    /**
     * Geocoding results
     *
     * FIXME
     * don't call this._createGeocodeResultsListElement
     *
     * @returns {DOMElement} DOM element
     */
    _createGeocodeResultsElement : function () {
        var div = document.createElement("dialog");
        div.id = this._addUID("GPgeocodeResultsList");
        div.className = "GPpanel GPelementHidden gpf-panel gpf-hidden fr-modal";

        div.appendChild(this._createGeocodeResultsHeaderElement());

        // FIXME on decompose la fonction pour les besoins du controle,
        // on ajoutera ces childs à la main...
        // div.appendChild(this._createGeocodeResultsListElement ());

        return div;
    },

    _createGeocodeResultsDivElement : function () {
        var div = document.createElement("div");
        div.className = "gpf-panel__body fr-modal__body";
        return div;
    },

    /**
     * Autocompletion results
     *
     * FIXME
     * don't call this._createAutoCompleteListElement
     *
     * @returns {DOMElement} DOM element
     */
    _createAutoCompleteElement : function () {
        var div = document.createElement("div");
        div.id = this._addUID("GPautoCompleteList");
        div.className = "GPautoCompleteList GPelementHidden gpf-panel fr-modal gpf-hidden "; // GPpanel ?

        // FIXME on decompose la fonction pour les besoins du controle,
        // on ajoutera ces childs à la main...
        // div.appendChild(this._createAutoCompleteListElement ());

        return div;
    },

    /**
     * Coordinate search panel
     *
     * FIXME
     * don't call this._createCoordinateSearchPanelHeaderElement
     * don't call this._createCoordinateSearchPanelFormElement
     *
     * @returns {DOMElement} DOM element
     */
    _createCoordinateSearchPanelElement : function () {
        var div = document.createElement("dialog");
        div.id = this._addUID("GPcoordinateSearchPanel");
        div.className = "GPpanel GPelementHidden gpf-panel gpf-hidden fr-modal";

        // FIXME on decompose la fonction pour les besoins du controle,
        // on ajoutera ces childs à la main...
        // div.appendChild(this._createCoordinateSearchPanelHeaderElement ());
        // div.appendChild(this._createCoordinateSearchPanelFormElement ());

        return div;
    },

    _createCoordinateSearchPanelDivElement : function () {
        var div = document.createElement("div");
        div.className = "gpf-panel__body fr-modal__body";
        return div;
    },

    // ################################################################### //
    // ################### Autocompletion container ###################### //
    // ################################################################### //

    /**
     * Autocompletion results list.
     *
     * @returns {DOMElement} DOM element
     */
    _createAutoCompleteListElement : function () {
        // contexte d'execution
        var self = this;

        var container = document.createElement("div");
        container.id = this._addUID("GPautocompleteResults");
        container.className = "";

        if (container.addEventListener) {
            container.addEventListener("click", function (e) {
                document.getElementById(self._addUID("GPautoCompleteList")).classList.replace("GPelementVisible", "GPelementHidden");
                document.getElementById(self._addUID("GPautoCompleteList")).classList.replace("gpf-visible", "gpf-hidden");
            }, false);
        } else if (container.attachEvent) {
            container.attachEvent("onclick", function (e) {
                document.getElementById(self._addUID("GPautoCompleteList")).classList.replace("GPelementVisible", "GPelementHidden");
                document.getElementById(self._addUID("GPautoCompleteList")).classList.replace("gpf-visible", "gpf-hidden");
            });
        }

        // Proposals are dynamically filled in Javascript by autocomplete or search service
        // <div class="GPautoCompleteProposal">...</div>

        return container;
    },

    _createAutoCompletedLocationContainer () {
        var container = document.createElement("div");
        container.id = this._addUID("GPautocompleteResultsLocation");
        container.className = "GPelementHidden gpf-hidden gpf-select";
        container.size = 20;
        container.autofocus = true;
        return container;
    },
    _createAutoCompletedLocationTitleElement () {
        var container = document.getElementById(this._addUID("GPautocompleteResultsLocation"));
        var label = document.createElement("p");
        label.className = "GPlabel GPlabelTitle gpf-label fr-label";
        label.innerHTML = "Lieux et adresses";
        container.appendChild(label);
    },

    /**
     * Autocompletion result.
     * Proposals are dynamically filled in Javascript by autocomplete service
     *
     * TODO formaliser le contenu des reponse
     *
     * @param {Object} location - suggested or geocoded location results
     * @param {Number} id - ID
     */
    _createAutoCompletedLocationElement : function (location, id) {
        // contexte d'execution
        var self = this;

        var container = document.getElementById(this._addUID("GPautocompleteResultsLocation"));

        var div = document.createElement("p");
        div.id = this._addUID("AutoCompletedLocation_" + id);
        div.className = "GPautoCompleteProposal gpf-panel__items gpf-panel__items_searchengine";
        var value = GeocodeUtils.getSuggestedLocationFreeform(location);
        div.innerHTML = value;
        div.title = value;
        if (div.addEventListener) {
            div.addEventListener("click", function (e) {
                self.onAutoCompletedResultsItemClick(e);
            }, false);
        } else if (div.attachEvent) {
            div.attachEvent("onclick", function (e) {
                self.onAutoCompletedResultsItemClick(e);
            });
        }

        container.appendChild(div);
    },

    _createSearchedSuggestContainer () {
        var container = document.createElement("div");
        container.id = this._addUID("GPautocompleteResultsSuggest");
        container.className = "GPelementHidden gpf-hidden gpf-select";
        container.size = 6;
        container.autofocus = true;
        return container;
    },
    _createSearchedSuggestTitleElement () {
        var container = document.getElementById(this._addUID("GPautocompleteResultsSuggest"));
        var label = document.createElement("p");
        label.className = "GPlabel GPlabelTitle gpf-label fr-label";
        label.innerHTML = "Cartes et données";
        container.appendChild(label);
    },

    /**
     * Autocompletion result of search service.
     * Proposals are dynamically filled in Javascript by autocomplete service
     *
     *
     * @param {Object} suggest - suggested results
     * @param {Number} id - ID
     */
    _createSearchedSuggestElement : function (suggest, id) {
        // contexte d'execution
        var self = this;

        var container = document.getElementById(this._addUID("GPautocompleteResultsSuggest"));

        var div = document.createElement("p");
        div.id = this._addUID("AutoCompletedSuggest_" + id);
        div.className = "GPautoCompleteProposal gpf-panel__items gpf-panel__items_searchengine";
        div.innerHTML = suggest.title + " (" + suggest.service + ")";
        div.dataset.layer = suggest.name;
        div.title = `${suggest.description} (nom technique : ${suggest.name})`;
        if (div.addEventListener) {
            div.addEventListener("click", function (e) {
                self.onSearchedResultsItemClick(e);
            }, false);
        } else if (div.attachEvent) {
            div.attachEvent("onclick", function (e) {
                self.onSearchedResultsItemClick(e);
            });
        }

        container.appendChild(div);
    },

    // ################################################################### //
    // ############### Geocoding with advanced container ################# //
    // ################################################################### //

    /**
     * @returns {DOMElement} DOM element
     */
    _createAdvancedSearchPanelHeaderElement : function () {
        // contexte d'execution
        var self = this;

        var container = document.createElement("div");
        container.className = "GPpanelHeader gpf-panel__header fr-modal__header";

        var divTitle = document.createElement("div");
        divTitle.className = "GPpanelTitle gpf-panel__title fr-modal__title fr-pt-4w";
        divTitle.innerHTML = "Recherche avancée";
        container.appendChild(divTitle);

        var divClose = document.createElement("button");
        divClose.id = this._addUID("GPadvancedSearchClose");
        divClose.className = "GPpanelClose gpf-btn gpf-btn-icon-close fr-btn--close fr-btn fr-btn--tertiary-no-outline fr-m-1w";
        divClose.title = "Fermer la recherche avancée";

        if (divClose.addEventListener) {
            divClose.addEventListener("click", function () {
                var id = "#GPsearchInput-" + self._uid;
                document.querySelector(id + " input").disabled = false;
                // only if displayButtonClose option is set to true
                if (document.querySelector(id + " .GPsearchInputReset")) {
                    document.querySelector(id + " .GPsearchInputReset").disabled = false;
                }
                if (checkDsfr()) {
                    document.querySelector("#GPshowSearchEnginePicto-" + self._uid).disabled = false;
                }
                document.getElementById(self._addUID("GPgeocodeResultsList")).classList.replace("GPelementVisible", "GPelementHidden");
                document.getElementById(self._addUID("GPgeocodeResultsList")).classList.replace("gpf-visible", "gpf-hidden");
                // document.getElementById(self._addUID("GPshowAdvancedSearch")).style.display = "inline-block";
                document.getElementById(self._addUID("GPshowAdvancedSearch")).setAttribute("aria-pressed", false);
                document.getElementById(self._addUID("GPadvancedSearchPanel")).classList.replace("GPelementVisible", "GPelementHidden");
                document.getElementById(self._addUID("GPadvancedSearchPanel")).classList.replace("gpf-visible", "gpf-hidden");
            }, false);
        } else if (divClose.attachEvent) {
            divClose.attachEvent("onclick", function () {
                var id = "#GPsearchInput-" + self._uid;
                document.querySelector(id + " input").disabled = false;
                // only if displayButtonClose option is set to true
                if (document.querySelector(id + " .GPsearchInputReset")) {
                    document.querySelector(id + " .GPsearchInputReset").disabled = false;
                }
                if (checkDsfr()) {
                    document.querySelector("#GPshowSearchEnginePicto-" + self._uid).disabled = false;
                }
                document.getElementById(self._addUID("GPgeocodeResultsList")).classList.replace("GPelementVisible", "GPelementHidden");
                document.getElementById(self._addUID("GPgeocodeResultsList")).classList.replace("gpf-visible", "gpf-hidden");
                // document.getElementById(self._addUID("GPshowAdvancedSearch")).style.display = "inline-block";
                document.getElementById(self._addUID("GPshowAdvancedSearch")).setAttribute("aria-pressed", false);
                document.getElementById(self._addUID("GPadvancedSearchPanel")).classList.replace("GPelementVisible", "GPelementHidden");
                document.getElementById(self._addUID("GPadvancedSearchPanel")).classList.replace("gpf-visible", "gpf-hidden");
            });
        }

        var span = document.createElement("span");
        span.className = "GPelementHidden gpf-visible"; // afficher en dsfr
        span.innerText = "Fermer";

        divClose.appendChild(span);

        container.appendChild(divClose);

        return container;
    },

    /**
     * @param {Object[]} advancedSearchCodes - codes
     *
     * @returns {DOMElement} DOM element
     */
    _createAdvancedSearchPanelFormElement : function (advancedSearchCodes) {
        // contexte d'execution
        var self = this;

        var form = document.createElement("form");
        form.id = this._addUID("GPadvancedSearchForm");
        form.className = "gpf-panel__content fr-modal__content";
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            // data
            var data = [];
            // liste des attributs de la ressource de geocodage
            var id = "#GPadvancedSearchFilters-" + self._uid;
            var matchesFilters = document.querySelectorAll(id + " > div > div > input,select#category");
            for (var i = 0; i < matchesFilters.length; i++) {
                var element = matchesFilters[i];
                data.push({
                    key : element.name,
                    value : element.value
                });
            }

            // gestionnaire d'evenement :
            // on récupère les valeurs de saisies pour requête sur le service de geocodage
            self.onGeocodingAdvancedSearchSubmit(e, data);
            document.getElementById(self._addUID("GPgeocodeResultsList")).classList.replace("GPelementHidden", "GPelementVisible");
            document.getElementById(self._addUID("GPgeocodeResultsList")).classList.replace("gpf-hidden", "gpf-visible");

            return false;
        });

        var div = document.createElement("div");
        div.className = "GPflexInput gpf-flex-column ";

        var label = document.createElement("label");
        label.className = "GPadvancedSearchCodeLabel gpf-label fr-label";
        label.innerHTML = "Recherche par";
        div.appendChild(label);

        var select = this._createAdvancedSearchFormCodeElement(advancedSearchCodes);
        div.appendChild(select);

        // FIXME on decompose la fonction pour les besoins du controle,
        // on ajoutera ces childs à la main...

        // var filters = this._createAdvancedSearchFormFiltersElement ();
        // form.appendChild(filters);

        // var input = this._createAdvancedSearchFormInputElement ();
        // form.appendChild(input);

        form.appendChild(div);

        return form;
    },

    /**
     * @param {Object[]} codes - codes
     * @returns {DOMElement} DOM element
     */
    _createAdvancedSearchFormCodeElement : function (codes) {
        // contexte d'execution
        var self = this;

        var select = document.createElement("select");
        select.id = this._addUID("GPadvancedSearchCode");
        select.title = "Choisir un type de recherche";
        select.className = "GPadvancedSearchCode gpf-select fr-select";
        select.addEventListener("change", function (e) {
            // var idx   = e.target.selectedIndex;
            // var value = e.target.options[idx].value;
            // gestionnaire d'evenement :
            // permet de recuperer des informations diverses...
            self.onGeocodingAdvancedSearchCodeChange(e);
        }, false);

        // liste statique au cas où des codes n'ont pas été passés en entrée
        if (!codes) {
            codes = [{
                id : "PositionOfInterest",
                title : "Lieux/toponymes"
            }, {
                id : "StreetAddress",
                title : "Adresses"
            }, {
                id : "CadastralParcel",
                title : "Parcelles cadastrales"
            }];
        }

        for (var i = 0; i < codes.length; i++) {
            var option = document.createElement("option");
            option.value = codes[i].id;
            option.text = codes[i].title;
            select.appendChild(option);
        }

        return select;
    },

    /**
     * @returns {DOMElement} DOM element
     */
    _createAdvancedSearchFormInputElement : function () {
        var input = document.createElement("input");
        input.type = "submit";
        input.id = this._addUID("GPadvancedSearchSubmit");
        input.className = "GPsubmit gpf-btn gpf-btn-icon-submit  fr-btn fr-btn--secondary gpf-btn--secondary";
        input.value = "Chercher";

        return input;
    },

    /**
     * Filters geocoding.
     *
     * @returns {DOMElement} DOM element
     */
    _createAdvancedSearchFormFiltersElement : function () {
        var container = document.createElement("div");
        container.id = this._addUID("GPadvancedSearchFilters");
        return container;
    },

    /**
     * Create filter container for resources :
     * "PositionOfInterest", "StreetAddress", ...
     *
     * @param {String} code - code of geocoding resource
     * @param {Boolean} display - display
     *
     * @returns {DOMElement} DOM element
     */
    _createAdvancedSearchFiltersTableElement : function (code, display) {
        var container = document.createElement("div");
        container.id = this._addUID(code);
        if (!display) {
            container.style.display = "none";
        }

        return container;
    },

    /**
     * Create filter attribut for a resource :
     * "PositionOfInterest", "StreetAddress", ...
     * Research filters are filled in Javascript depending on developer choice
     *
     * @param {Object} filterAttributes - filter attributes :
     * @param {String} filterAttributes.code - code of geocoding resource
     * @param {String} filterAttributes.name - ID
     * @param {String} filterAttributes.title - label
     * @param {String} filterAttributes.description - description
     * @param {String} filterAttributes.value - value
     *
     * @returns {DOMElement} DOM element
     */
    _createAdvancedSearchFiltersAttributElement : function (filterAttributes) {
        // INFORMATION
        // cette methode peut être appelée si le document n'existe pas, elle
        // permet ainsi de creer une div sans insertion dans le container...

        var container = null;
        var name = filterAttributes.name;
        var title = filterAttributes.title;
        var description = filterAttributes.description;
        var code = filterAttributes.code;
        var value = filterAttributes.value;

        var div = document.createElement("div");
        div.className = "GPflexInput gpf-flex-column ";

        var label = document.createElement("label");
        label.className = "GPadvancedSearchFilterLabel gpf-label fr-label";
        label.htmlFor = name;
        label.title = description || title;
        label.innerHTML = title;
        div.appendChild(label);

        if (name === "category") {
            var select = document.createElement("select");
            select.id = name;
            select.name = name;
            select.title = title;
            select.className = "GPadvancedSearchFilterInput gpf-select fr-select";
            if (value) {
                if (Array.isArray(value)) {
                    for (var i = 0; i < value.length; i++) {
                        var option = document.createElement("option");
                        option.value = value[i];
                        option.text = value[i];
                        select.appendChild(option);
                    }
                }
            }
            div.appendChild(select);
        } else {
            var input = document.createElement("input");
            input.id = name;
            input.className = "GPadvancedSearchFilterInput gpf-input fr-input";
            input.type = "text";
            input.name = name;
            if (value) {
                if (Array.isArray(value)) {
                    var listId = name + "_list";
                    input.setAttribute("list", listId);
                    var dl = document.createElement("datalist");
                    dl.id = listId;
                    for (var i = 0; i < value.length; ++i) {
                        var option = document.createElement("option");
                        option.value = value[i];
                        dl.appendChild(option);
                    }
                    div.appendChild(dl);
                } else {
                    input.value = value;
                }
            }
            div.appendChild(input);
        }

        container = document.getElementById(this._addUID(code));

        if (container) {
            container.appendChild(div);
        } else {
            // le container, c'est la div !
            container = div;
        }

        return container;
    },

    // ################################################################### //
    // ################## Geocoding results container #################### //
    // ################################################################### //

    /**
     * @returns {DOMElement} DOM element
     */
    _createGeocodeResultsHeaderElement : function () {
        var self = this;

        var container = document.createElement("div");
        container.className = "GPpanelHeader gpf-panel__header fr-modal__header";

        var divTitle = document.createElement("div");
        divTitle.className = "GPpanelTitle gpf-panel__title fr-modal__title fr-pt-4w";
        divTitle.innerHTML = "Résultats de la recherche";
        container.appendChild(divTitle);

        var divClose = document.createElement("button");
        divClose.id = this._addUID("GPgeocodeResultsClose");
        divClose.className = "GPpanelClose gpf-btn gpf-btn-icon-close fr-btn--close fr-btn fr-btn--tertiary-no-outline fr-m-1w";
        divClose.title = "Fermer la fenêtre de résultats";

        if (divClose.addEventListener) {
            divClose.addEventListener("click", function () {
                document.getElementById(self._addUID("GPgeocodeResultsList")).classList.replace("GPelementVisible", "GPelementHidden");
                document.getElementById(self._addUID("GPgeocodeResultsList")).classList.replace("gpf-visible", "gpf-hidden");
            }, false);
        } else if (divClose.attachEvent) {
            divClose.attachEvent("onclick", function () {
                document.getElementById(self._addUID("GPgeocodeResultsList")).classList.replace("GPelementVisible", "GPelementHidden");
                document.getElementById(self._addUID("GPgeocodeResultsList")).classList.replace("gpf-visible", "gpf-hidden");
            });
        }

        var span = document.createElement("span");
        span.className = "GPelementHidden gpf-visible"; // afficher en dsfr
        span.innerText = "Fermer";

        divClose.appendChild(span);

        container.appendChild(divClose);

        return container;
    },

    /**
     * Geocoding results list.
     *
     * @returns {DOMElement} DOM element
     */
    _createGeocodeResultsListElement : function () {
        // contexte d'execution
        var self = this;

        var container = document.createElement("div");
        container.id = this._addUID("GPgeocodeResults");
        container.className = "gpf-panel__list";
        container.setAttribute("tabindex", "0");

        if (container.addEventListener) {
            container.addEventListener("click", function (e) {
                if (!e.ctrlKey) {
                    document.getElementById(self._addUID("GPgeocodeResultsList")).classList.replace("GPelementVisible", "GPelementHidden");
                    document.getElementById(self._addUID("GPgeocodeResultsList")).classList.replace("gpf-visible", "gpf-hidden");
                }
                self.onGeocodedResultsItemClick(e);
            }, false);
        } else if (container.attachEvent) {
            container.attachEvent("onclick", function (e) {
                if (!e.ctrlKey) {
                    document.getElementById(self._addUID("GPgeocodeResultsList")).classList.replace("GPelementVisible", "GPelementHidden");
                    document.getElementById(self._addUID("GPgeocodeResultsList")).classList.replace("gpf-visible", "gpf-hidden");
                }
                self.onGeocodedResultsItemClick(e);
            });
        }
        // Results are dynamically filled in Javascript by geocoding service
        // <div class="GPautoCompleteProposal">...</div>

        return container;
    },

    /**
     * Geocoding result.
     * Results are dynamically filled in Javascript by geocoding service
     *
     * TODO formaliser le contenu des reponses
     * FIXME formater la reponse en amont !
     *
     * @param {Object} location - suggested or geocoded location results
     * @param {Number} id - ID
     */
    _createGeocodedLocationElement : function (location, id) {
        var container = document.getElementById(this._addUID("GPgeocodeResults"));

        var div = document.createElement("div");
        div.id = this._addUID("GeocodedLocation_" + id);
        div.className = "GPautoCompleteProposal gpf-panel__items gpf-panel__items_searchengine";

        if (typeof location === "string") {
            div.innerHTML = location;
        } else {
            div.innerHTML = GeocodeUtils.getGeocodedLocationFreeform(location);
        }

        container.appendChild(div);
    },

    // ################################################################### //
    // ################## Coordinate search container #################### //
    // ################################################################### //

    _createCoordinateSearchPanelHeaderElement () {
        // contexte d'execution
        var self = this;

        var container = document.createElement("div");
        container.className = "GPpanelHeader gpf-panel__header fr-modal__header";

        var divTitle = document.createElement("div");
        divTitle.className = "GPpanelTitle gpf-panel__title fr-modal__title fr-pt-4w";
        divTitle.innerHTML = "Recherche par coordonnées";
        container.appendChild(divTitle);

        var divClose = document.createElement("button");
        divClose.id = this._addUID("GPcoordinateSearchClose");
        divClose.className = "GPpanelClose GPcoordinateSearchClose gpf-btn gpf-btn-icon-close fr-btn--close fr-btn fr-btn--tertiary-no-outline fr-m-1w";
        divClose.title = "Fermer la recherche par coordonnées";

        if (divClose.addEventListener) {
            divClose.addEventListener("click", function () {
                var id = "#GPsearchInput-" + self._uid;
                document.querySelector(id + " input").disabled = false;
                // only if displayButtonClose option is set to true
                if (document.querySelector(id + " .GPsearchInputReset")) {
                    document.querySelector(id + " .GPsearchInputReset").disabled = false;
                }
                if (checkDsfr()) {
                    document.querySelector("#GPshowSearchEnginePicto-" + self._uid).disabled = false;
                }
                document.getElementById(self._addUID("GPshowSearchByCoordinate")).setAttribute("aria-pressed", false);
                document.getElementById(self._addUID("GPcoordinateSearchPanel")).classList.replace("GPelementVisible", "GPelementHidden");
                document.getElementById(self._addUID("GPcoordinateSearchPanel")).classList.replace("gpf-visible", "gpf-hidden");
                self.onCoordinateSearchClose();
            }, false);
        } else if (divClose.attachEvent) {
            divClose.attachEvent("onclick", function () {
                var id = "#GPsearchInput-" + self._uid;
                document.querySelector(id + " input").disabled = false;
                // only if displayButtonClose option is set to true
                if (document.querySelector(id + " .GPsearchInputReset")) {
                    document.querySelector(id + " .GPsearchInputReset").disabled = false;
                }
                if (checkDsfr()) {
                    document.querySelector("#GPshowSearchEnginePicto-" + self._uid).disabled = false;
                }
                document.getElementById(self._addUID("GPshowSearchByCoordinate")).setAttribute("aria-pressed", false);
                document.getElementById(self._addUID("GPcoordinateSearchPanel")).classList.replace("GPelementVisible", "GPelementHidden");
                document.getElementById(self._addUID("GPcoordinateSearchPanel")).classList.replace("gpf-visible", "gpf-hidden");
                self.onCoordinateSearchClose();
            });
        }

        var span = document.createElement("span");
        span.className = "GPelementHidden gpf-visible"; // afficher en dsfr
        span.innerText = "Fermer";

        divClose.appendChild(span);

        container.appendChild(divClose);

        return container;
    },
    _createCoordinateSearchPanelFormElement () {
        // contexte d'execution
        var self = this;

        var form = document.createElement("form");
        form.id = this._addUID("GPcoordinateSearchForm");
        form.className = "gpf-panel__content fr-modal__content";
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            self.onShowSearchByCoordinateClick();
            return false;
        });

        return form;
    },

    __createCoordinateSearchDivElement () {
        var div = document.createElement("div");
        div.className = "GPflexInput gpf-flex-column ";
        return div;
    },

    _createCoordinateSearchSystemsLabelElement () {
        var label = document.createElement("label");
        label.className = "GPcoordinateSearchSystemsLabel gpf-label fr-label";
        label.innerHTML = "Système de référence";
        return label;
    },
    _setCoordinateSearchSystemsSelectElement (systems) {
        if (document.getElementById(this._addUID("GPcoordinateSearchSystem"))) {
            document.getElementById(this._addUID("GPcoordinateSearchSystem")).remove();
        }
        // contexte d'execution
        var context = this;

        var selectSystem = document.createElement("select");
        selectSystem.id = this._addUID("GPcoordinateSearchSystem");
        selectSystem.title = "Choisir un système de réference";
        selectSystem.className = "GPselect GPcoordinateSearchSystemsSelect gpf-select fr-select";
        selectSystem.addEventListener("change", function (e) {
            context.onCoordinateSearchSystemChange(e);
        });

        for (var i = 0; i < systems.length; i++) {
            var obj = systems[i];
            var option = document.createElement("option");
            option.value = obj.code;
            option.text = obj.label || i;
            // option.label = obj.label;
            selectSystem.appendChild(option);
        }

        return selectSystem;
    },

    _createCoordinateSearchUnitsLabelElement () {
        var label = document.createElement("label");
        label.className = "GPcoordinateSearchUnitsLabel gpf-label fr-label";
        label.innerHTML = "Unités";
        return label;
    },
    _setCoordinateSearchUnitsSelectElement (units) {
        if (document.getElementById(this._addUID("GPcoordinateSearchUnits"))) {
            document.getElementById(this._addUID("GPcoordinateSearchUnits")).remove();
        }
        // contexte d'execution
        var context = this;

        var selectUnits = document.createElement("select");
        selectUnits.id = this._addUID("GPcoordinateSearchUnits");
        selectUnits.title = "Choisir un type d'unité";
        selectUnits.className = "GPselect GPcoordinateSearchUnitsSelect gpf-select fr-select";
        selectUnits.addEventListener("change", function (e) {
            context.onCoordinateSearchUnitsChange(e);
        });

        for (var j = 0; j < units.length; j++) {
            var obj = units[j];
            var option = document.createElement("option");
            option.value = (obj.code) ? obj.code : j;
            option.text = obj.label || j;
            // option.label = obj.label;
            selectUnits.appendChild(option);
        }

        return selectUnits;
    },

    /**
     * update Label
     * @param {String} type - Geographical or Metric
     * @returns {DOMElement} label
     */
    _setCoordinateSearchLngLabelElement (type) {
        // type geographical ou metric
        if (document.getElementById(this._addUID("GPcoordinateSearchLngLabel"))) {
            document.getElementById(this._addUID("GPcoordinateSearchLngLabel")).remove();
        }
        var labelLng = document.createElement("label");
        labelLng.className = "GPcoordinateSearchLabel gpf-label fr-label";
        labelLng.id = this._addUID("GPcoordinateSearchLngLabel");
        labelLng.htmlFor = "coordinate-lng";
        labelLng.innerHTML = (type === "Geographical") ? "Longitude :" : "Y :";

        return labelLng;
    },
    /**
     * update Input coordinate
     * @param {String} code - ex. DMS : degrés sexadecimaux
     * @returns {DOMElement} input
     */
    _setCoordinateSearchLngInputElement (code) {
        // code DMS ou other
        if (document.getElementById(this._addUID("GPcoordinateSearchLngInput"))) {
            document.getElementById(this._addUID("GPcoordinateSearchLngInput")).remove();
        }
        if (document.getElementById(this._addUID("GPcoordinateSearchLngDMS"))) {
            document.getElementById(this._addUID("GPcoordinateSearchLngDMS")).remove();
        }
        var input = document.createElement("input");
        input.id = this._addUID("GPcoordinateSearchLngInput");
        input.className = "GPcoordinateSearchInput gpf-input fr-input";
        input.title = "Saisir des coordonnées";
        input.name = "coordinate-lng";
        input.type = "number";
        input.step = "any";
        input.required = "";
        switch (code) {
            case "DMS":
                input.title += " géographiques (en sexa)";
                input.className = "GPelementHidden gpf-hidden";
                return this._setCoordinateSearchLngDMSElement();
                break;
            case "DEC":
                input.title += " géographiques (en decimal)";
                input.min = "-180";
                input.max = "180";
                break;
            case "M":
                input.title += " cartésiennes (en mètre)";
                break;
            case "KM":
                input.title += " cartésiennes (en kilomètre)";
                break;
            default:
                break;
        }
        return input;
    },
    _setCoordinateSearchLngDMSElement () {
        var div = document.createElement("div");
        div.id = this._addUID("GPcoordinateSearchLngDMS");
        div.innerHTML = `
        <div class="GPflexInput gpf-flex">
            <input step="1"
                id="GPcoordinatSearchInputSexLonDeg"
                class="gpf-input fr-input"
                name="inputSexLonDeg"
                title="Saisir une valeur de degré entre 0° et 180°"
                type="number"
                required=""
                min="0"
                max="180">
            <label>°</label>
            <input step="1"
                id="GPcoordinatSearchInputSexLonMin"
                class="gpf-input fr-input"
                name="inputSexLonMin"
                title="Saisir une valeur de minute entre 0' et 59'"
                type="number"
                required=""
                min="0"
                max="59">
            <label>'</label>
            <input step="any"
                id="GPcoordinatSearchInputSexLonSec"
                class="gpf-input fr-input"
                name="inputSexLonSec"
                title="Saisir une valeur de seconde entre 0'' et 59''"
                type="number"
                required=""
                min="0"
                max="59.9999">
            <label>"</label>
            <select
                id="GPcoordinatSearchInputSexLonToward"
                class="GPselect gpf-select fr-select"
                title="Saisir une direction pour Est et 0uest"
                name="inputSexLonToward">
                <option value="O">O</option>
                <option value="E" selected="">E</option>
            </select>
        </div>
        `;
        return div;
    },
    /**
     * update Label
     * @param {String} type - Geographical or Metric
     * @returns {DOMElement} label
     */
    _setCoordinateSearchLatLabelElement (type) {
        // type geographical ou metric
        if (document.getElementById(this._addUID("GPcoordinateSearchLatLabel"))) {
            document.getElementById(this._addUID("GPcoordinateSearchLatLabel")).remove();
        }
        var labelLat = document.createElement("label");
        labelLat.className = "GPcoordinateSearchLabel gpf-label fr-label";
        labelLat.id = this._addUID("GPcoordinateSearchLatLabel");
        labelLat.htmlFor = "coordinate-lat";
        labelLat.innerHTML = (type === "Geographical") ? "Latitude :" : "X :";

        return labelLat;
    },
    /**
     * update Input coordinate
     * @param {String} code - ex. DMS : degrés sexadecimaux
     * @returns {DOMElement} input
     */
    _setCoordinateSearchLatInputElement (code) {
        // code DMS ou other
        if (document.getElementById(this._addUID("GPcoordinateSearchLatInput"))) {
            document.getElementById(this._addUID("GPcoordinateSearchLatInput")).remove();
        }
        if (document.getElementById(this._addUID("GPcoordinateSearchLatDMS"))) {
            document.getElementById(this._addUID("GPcoordinateSearchLatDMS")).remove();
        }
        var input = document.createElement("input");
        input.id = this._addUID("GPcoordinateSearchLatInput");
        input.className = "GPcoordinateSearchInput gpf-input fr-input";
        input.title ="Saisir des coordonnées";
        input.name = "coordinate-lat";
        input.type = "number";
        input.step = "any";
        input.required = "";
        switch (code) {
            case "DMS":
                input.title += " géographiques (en sexa)";
                input.className = "GPelementHidden gpf-hidden";
                return this._setCoordinateSearchLatDMSElement();
                break;
            case "DEC":
                input.title += " géographiques (en decimal)";
                input.min = "-180";
                input.max = "180";
                break;
            case "M":
                input.title += " cartésiennes (en mètre)";
                break;
            case "KM":
                input.title += " cartésiennes (en kilomètre)";
                break;
            default:
                break;
        }
        return input;
    },
    _setCoordinateSearchLatDMSElement () {
        var div = document.createElement("div");
        div.id = this._addUID("GPcoordinateSearchLatDMS");
        div.innerHTML = `
        <div class="GPflexInput gpf-flex">
            <input step="1"
                id="GPcoordinatSearchInputSexLatDeg"
                class="gpf-input fr-input"
                name="inputSexLatDeg"
                title="Saisir une valeur de degré entre 0° et 85°"
                type="number"
                required=""
                min="0"
                max="85">
            <label>°</label>
            <input step="1"
                id="GPcoordinatSearchInputSexLatMin"
                class="gpf-input fr-input"
                name="inputSexLatMin"
                title="Saisir une valeur de minute entre 0' et 59'"
                type="number"
                required=""
                min="0"
                max="59">
            <label>'</label>
            <input step="any"
                id="GPcoordinatSearchInputSexLatSec"
                class="gpf-input fr-input"
                name="inputSexLatSec"
                title="Saisir une valeur de seconde entre 0' et 59'"
                type="number"
                required=""
                min="0"
                max="59.9999">
            <label>"</label>
            <select
                id="GPcoordinatSearchInputSexLatToward"
                class="GPselect gpf-select fr-select"
                title="Saisir une direction pour Nord et Sud"
                name="inputSexLatToward">
                <option value="N">N</option>
                <option value="S">S</option>
            </select>
        </div>
        `;
        return div;
    },

    /**
     * submit
     * @returns {DOMElement} input
     */
    _createCoordinateSearchSubmitElement () {
        var input = document.createElement("input");
        input.type = "submit";
        input.id = this._addUID("GPcoordinateSearchSubmit");
        input.className = "GPsubmit gpf-btn gpf-btn-icon-submit  fr-btn fr-btn--secondary gpf-btn--secondary";
        input.value = "Chercher";
        return input;
    },
};

export default SearchEngineDOM;
