import Logger from "../../Utils/LoggerByDefault";
import checkDsfr from "../Utils/CheckDsfr";

var logger = Logger.getLogger("DrawingDOM");

/**
 * DrawingDOM
 * @type {Object}
 */
var DrawingDOM = {

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
        container.id = this._addUID("GPdrawing");
        container.className = "GPwidget gpf-widget gpf-widget-button gpf-mobile-fullscreen";
        return container;
    },

    // ################################################################### //
    // ################### Methods of main container ##################### //
    // ################################################################### //

    /**
     * Show mouse position control
     *
     * @returns {DOMElement} DOM element
     */
    _createShowDrawingPictoElement : function () {
        var self = this;

        var button = document.createElement("button");
        // INFO: Ajout d'une SPAN pour enlever des marges de 6px dans CHROMIUM (?!)
        var span = document.createElement("span");
        button.appendChild(span);
        button.id = this._addUID("GPshowDrawingPicto");
        button.className = "GPshowOpen GPshowAdvancedToolPicto GPshowDrawingPicto gpf-btn gpf-btn--tertiary gpf-btn-icon gpf-btn-icon-drawing fr-btn fr-btn--tertiary";
        button.setAttribute("aria-label", this.options.labels.control);
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", false);
        button.setAttribute("type", "button");


        // gestionnaire d'evenement :
        // on ouvre le menu de saisie de saisie
        // L'ouverture/Fermeture permet de faire le menage
        // (reinitialisation)
        if (button.addEventListener) {
            button.addEventListener("click", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                self.onShowDrawingClick(e);
            });
        } else if (button.attachEvent) {
            button.attachEvent("onclick", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                self.onShowDrawingClick(e);
            });
        }

        return button;
    },

    /**
     * Drawing panel
     *
     * @returns {DOMElement} DOM element
     */
    _createDrawingPanelElement : function () {
        var dialog = document.createElement("dialog");
        dialog.id = this._addUID("GPdrawingPanel");
        dialog.className = "GPpanel gpf-panel fr-modal";

        return dialog;
    },

    _createDrawingPanelDivElement : function () {
        var div = document.createElement("div");
        div.className = "gpf-panel__body fr-modal__body";
        return div;
    },

    _createDrawingToolsDivSections : function () {
        var div = document.createElement("div");
        div.className = "gpf-panel__content fr-px-3w fr-modal__content";
        return div;
    },

    // ################################################################### //
    // ####################### Panel container ########################### //
    // ################################################################### //

    /**
    * Creates drawing Panel header DOM structure
    * @returns {DOMElement} DOM element
    */
    _createDrawingPanelHeaderElement : function () {
        /*
         * <div class="GPpanelHeader">
         *     <div class="GPpanelTitle">Annoter la carte</div>
         *     <div id="GPdrawingPanelClose" class="GPpanelClose" title="Fermer le panneau"></div>
         * </div>
         */

        var container = document.createElement("div");
        container.className = "GPpanelHeader gpf-panel__header fr-modal__header fr-m-1w";

        var divTitle = document.createElement("div");
        divTitle.className = "GPpanelTitle gpf-panel__title fr-modal__title fr-pt-4w";
        divTitle.innerHTML = this.options.controlLabel || "Annoter la carte";
        container.appendChild(divTitle);

        var divClose = document.createElement("button");
        divClose.id = this._addUID("GPdrawingPanelClose");
        divClose.className = "GPpanelClose GPdrawingPanelClose gpf-btn gpf-btn-icon-close fr-btn--close fr-btn fr-btn--tertiary-no-outline fr-m-1w";
        divClose.title = "Fermer le panneau";

        // Link panel close / visibility checkbox
        var dtObj = this;
        if (divClose.addEventListener) {
            divClose.addEventListener("click", function () {
                document.getElementById(dtObj._addUID("GPshowDrawingPicto")).click();
            }, false);
        } else if (divClose.attachEvent) {
            divClose.attachEvent("onclick", function () {
                document.getElementById(dtObj._addUID("GPshowDrawingPicto")).click();
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
     * Creates drawing tools section.
     *
     * @returns {DOMElement} DOM element
     */
    _createDrawingToolsSections : function () {
        var tools = [];

        this.dtOptions = {};
        if (this.options.tools.points) {
            this.dtOptions.points = {
                label : this.options.labels.points,
                active : false,
                panel : "draw",
                id : "point"
            };
        }
        if (this.options.tools.lines) {
            this.dtOptions.lines = {
                label : this.options.labels.lines,
                active : false,
                panel : "draw",
                id : "line"
            };
        }
        if (this.options.tools.polygons) {
            this.dtOptions.polygons = {
                label : this.options.labels.polygons,
                active : false,
                panel : "draw",
                id : "polygon"
            };
        }
        if (this.options.tools.holes) {
            this.dtOptions.holes = {
                label : this.options.labels.holes,
                active : false,
                panel : "draw",
                id : "holes"
            };
        }
        if (this.options.tools.text) {
            this.dtOptions.text = {
                label : this.options.labels.text,
                active : false,
                panel : "draw",
                id : "text"
            };
        }
        if (this.options.tools.edit) {
            this.dtOptions.edit = {
                label : this.options.labels.edit,
                active : false,
                panel : "edit",
                id : "edit"
            };
        }
        if (this.options.tools.display) {
            this.dtOptions.display = {
                label : this.options.labels.display,
                active : false,
                panel : "edit",
                id : "display"
            };
        }
        if (this.options.tools.tooltip) {
            this.dtOptions.tooltip = {
                label : this.options.labels.tooltip,
                active : false,
                panel : "edit",
                id : "tooltip"
            };
        }
        if (this.options.tools.remove) {
            this.dtOptions.remove = {
                label : this.options.labels.remove,
                active : false,
                panel : "edit",
                id : "remove"
            };
        }
        // ajout drawing tools
        if (this.dtOptions.points ||
            this.dtOptions.lines ||
            this.dtOptions.polygons ||
            this.dtOptions.text) {
            tools.push(this._createDrawingToolSection(this.options.labels.creatingTools, "draw"));
        }
        // ajout editing tools
        if (this.dtOptions.edit ||
            this.dtOptions.display ||
            this.dtOptions.tooltip ||
            this.dtOptions.remove) {
            tools.push(this._createDrawingToolSection(this.options.labels.editingTools, "edit"));
        }
        // ajout export tools
        if (this.options.tools.export) {
            tools.push(this._createSavingSection(
                this.options.labels.export,
                this.options.labels.exportTitle
            ));
        }

        return tools;
    },

    /**
     * Creates drawing tool section DOM structure.
     *
     * @param {String} sectionLabel - section title
     * @param {String} panelType - Drawing ("draw") or editing ("edit") tools panel
     * @returns {DOMElement} DOM element
     */
    _createDrawingToolSection : function (sectionLabel, panelType) {
        /*
         * Exemple panelType == "draw"
         *
         * <div class="drawing-tool-section">
         *     <p class="drawing-tool-section-title">Outils de création</p>
         *     <ul class="drawing-tools-flex-display">
         *         <li id="drawing-tool-point" class="drawing-tool" title="Placer des points"></li>
         *         <li id="drawing-tool-line" class="drawing-tool" title="Dessiner des lignes"></li>
         *         <li id="drawing-tool-polygon" class="drawing-tool" title="Dessiner des polygones"></li>
         *         <li id="drawing-tool-text" class="drawing-tool" title="Ecrire sur la carte"></li>
         *     </ul>
         * </div>
         */
        var container = document.createElement("div");
        container.className = "drawing-tool-section fr-mx-2w";

        var p = document.createElement("p");
        p.className = "drawing-tool-section-title";
        p.innerHTML = sectionLabel;
        container.appendChild(p);

        var ul = document.createElement("div");
        ul.className = "drawing-tools-flex-display";
        var context = this;
        // li click handler function
        function liClickHandler (e) {
            /* jshint validthis: true */
            // this == elem clicked
            context._handleDOMToolClick(e, this.id, context);
            context._handleToolClick(e, this.id, context);
        }
        for (var type in this.dtOptions) {
            if (this.dtOptions[type].panel !== panelType) {
                continue;
            }
            var li = document.createElement("button");
            li.className = "drawing-tool fr-btn fr-btn--tertiary gpf-btn--tertiary";
            li.id = this._addUID("drawing-tool-" + this.dtOptions[type].id);
            li.title = this.dtOptions[type].label;
            li.addEventListener("click", liClickHandler);
            ul.appendChild(li);
        }
        container.appendChild(ul);

        return container;
    },

    /**
     * Creates drawing tool section DOM structure.
     *
     * @param {String} buttonLabel - Button label
     * @param {String} buttonTitle - Button title
     * @returns {DOMElement} DOM element
     */
    _createSavingSection : function (buttonLabel, buttonTitle) {
        /*
         * <div class="drawing-tool-section drawing-tools-flex-display">
         *     <button title="Exporter en KML" class="tool-form-submit drawing-button" id="drawing-export" type="button">Exporter</button>
         * </div>
         */
        var container = document.createElement("div");
        container.className = "drawing-tool-section drawing-tools-flex-display fr-m-1w";

        var button = document.createElement("button");
        button.title = buttonTitle;
        button.className = "tool-form-submit drawing-button fr-btn fr-btn--secondary gpf-btn--secondary fr-m-1w";
        button.id = this._addUID("drawing-export");
        button.setAttribute("type", "button");
        button.textContent = buttonLabel;
        var context = this;
        /** export function */
        button.onclick = function () {
            context.onExportFeatureClick();
        };
        container.appendChild(button);

        return container;
    },

    /**
     * Creates input for color choosing
     *
     * @param {Object} options - options
     * @param {String} options.defaultValue - defaultValue
     * @param {String} options.className - input className
     * @returns {DOMElement} - created li element
     */
    _createMarkersChooser : function (options) {
        var li = document.createElement("div");
        li.className = options.className;
        var globalHiddenInput = document.createElement("input");
        globalHiddenInput.type = "checkbox";
        globalHiddenInput.className = "gpf-custom-dropdown-toggle";
        globalHiddenInput.id = this._addUID(`gpf-custom-dropdown-toggle`);
        li.appendChild(globalHiddenInput);
        var span = document.createElement("span");
        span.innerText = "Sélectionner le pictogramme :";
        li.appendChild(span);
        for (var i = 0; i < this.options.markersList.length; i++) {
            var hiddenInput = document.createElement("input");
            hiddenInput.type = "radio";
            hiddenInput.name = "gpf-dropdown-radio-style";
            hiddenInput.value = this.options.markersList[i].src;
            hiddenInput.className = "gpf-custom-dropdown-display";
            hiddenInput.id = this._addUID(`gpf-custom-dropdown-display-${i}`);
            li.appendChild(hiddenInput);
            if (i === 0) {
                hiddenInput.checked = true;
            }
            var labelToggle = document.createElement("label");
            labelToggle.htmlFor = this._addUID(`gpf-custom-dropdown-toggle`);
            labelToggle.className = "fr-select GPselect gpf-select";
            li.appendChild(labelToggle);
            var selectedImg = document.createElement("img");
            selectedImg.src = this.options.markersList[i].src;
            selectedImg.alt = `Option ${i + 1}`;
            labelToggle.appendChild(selectedImg);
        }

        var dropdownOptions = document.createElement("div");
        dropdownOptions.className = "gpf-custom-dropdown-options";
        li.append(dropdownOptions);
        for (var i = 0; i < this.options.markersList.length; i++) {
            var label = document.createElement("label");
            label.htmlFor = this._addUID(`gpf-custom-dropdown-display-${i}`);
            label.className = "gpf-custom-dropdown-option";
            dropdownOptions.appendChild(label);
            var optionImg = document.createElement("img");
            optionImg.src = this.options.markersList[i].src;
            optionImg.alt = `Option ${i + 1}`;
            label.appendChild(optionImg);
            label.addEventListener("click", () => {globalHiddenInput.click();});
        }
        return li;
    },

    /**
     * Creates input for color choosing
     *
     * @param {Object} options - options
     * @param {String} options.label - label
     * @param {String} options.type - input type for element ("color")
     * @param {String} options.defaultValue - defaultValue
     * @param {String} options.id - input id
     * @param {String} options.title - input title
     * @param {String} options.className - input className
     * @returns {DOMElement} - created li element
     */
    _createStylingElement : function (options) {
        var li = document.createElement("div");
        li.className = options.className;
        var textNode = document.createTextNode(options.label);
        li.appendChild(textNode);
        var inputElem = document.createElement("input");
        try {
            inputElem.type = options.type;
        } catch (e) {
            // ie 11 input type== color ne marche pas...
            inputElem.type = "text";
        }
        if (options.type === "range") {
            // For DSFR
            li.dataset.frJsRange = "true";
            li.title = options.label;

            var value = options.defaultValue;
            value = Math.round(((value - options.min) / (options.max - options.min)) * 100);
            li.style.setProperty("--progress-right", value + "%");

            inputElem.addEventListener("change", (e) => {
                e.target.parentNode.style.setProperty("--progress-right", `${((e.target.value - options.min) / (options.max - options.min)) * 100}%`);
            });
        }
        inputElem.id = options.id;
        inputElem.value = options.defaultValue;
        if (options.title) {
            inputElem.title = options.title;
        }
        // si options.type == "checkbox"
        if (options.checked !== undefined) {
            inputElem.checked = options.checked;
        }
        // si options.type == "range"
        if (options.min !== undefined) {
            inputElem.min = options.min;
        }
        if (options.max !== undefined) {
            inputElem.max = options.max;
        }
        if (options.step !== undefined) {
            inputElem.step = options.step;
        }
        li.appendChild(inputElem);
        return li;
    },

    /**
     * Creates Styling div to include in popup.
     *
     * @param {Object} options - toolId selected
     * @param {String} options.geomType - gemeotryType selected ("Point", "Line" or "Polygon")
     * @param {Object} options.labels - values to title
     * @param {Object} options.initValues - values to init fields
     * @param {Function} options.applyFunc - function called when apply is selected
     * @returns {DOMElement} DOM element created
     */
    _createStylingDiv : function (options) {
        var dialog = document.createElement("dialog");
        dialog.className = "gp-styling-div gpf-panel fr-modal gpf-visible GPelementVisible";
        var mainDiv = document.createElement("div");
        mainDiv.className = "gpf-modal__body fr-modal__body";
        dialog.appendChild(mainDiv);

        // header DSFR
        if (checkDsfr()) {
            var header = document.createElement("div");
            header.className = "GPpanelHeader gpf-panel__header fr-modal__header fr-m-1w";

            var divTitle = document.createElement("div");
            divTitle.className = "GPpanelTitle gpf-panel__title fr-modal__title fr-pt-4w";
            divTitle.innerHTML = "Modifier le style";
            header.appendChild(divTitle);

            var divClose = document.createElement("button");
            divClose.id = this._addUID("GPdrawingStylePanelClose");
            divClose.className = "GPpanelClose GPdrawingStylePanelClose gpf-btn gpf-btn-icon-close fr-btn--close fr-btn fr-btn--tertiary-no-outline fr-m-1w";
            divClose.title = "Fermer le panneau";

            // Link panel close / visibility checkbox
            var dtObj = this;
            if (divClose.addEventListener) {
                divClose.addEventListener("click", function () {
                    options.applyFunc.call(this, "cancel");
                }, false);
            } else if (divClose.attachEvent) {
                divClose.attachEvent("onclick", function () {
                    options.applyFunc.call(this, "cancel");
                });
            }

            var span = document.createElement("span");
            span.className = "GPelementHidden gpf-visible"; // afficher en dsfr
            span.innerText = "Fermer";

            divClose.appendChild(span);

            header.appendChild(divClose);

            mainDiv.appendChild(header);
        }

        var div = document.createElement("div");
        div.className = "gpf-panel__content fr-px-3w fr-modal__content";
        mainDiv.appendChild(div);

        var ul = document.createElement("div");
        var li = null;
        /*
         * TODO : finir de remplir la div pour tous les styles éditables.
         */
        var geomType = options.geomType.toLowerCase();
        switch (geomType) {
            case "point&text":
            case "point":
                li = this._createMarkersChooser({
                    className : "gp-styling-option",
                    // defaultValue : this.options.markersList[0].src
                    defaultValue : options.initValues.markerSrc
                });
                ul.appendChild(li);
                li = this._createStylingElement({
                    type : "range",
                    className : "gp-styling-option fr-range fr-range--sm",
                    label : this.options.labels.markerSize,
                    title : "petit, moyen ou grand",
                    id : this._addUID("markerSize"),
                    min : 5,
                    max : 15,
                    step : 5,
                    defaultValue : options.initValues.markerSize * 10
                });
                ul.appendChild(li);
                // EVOL
                // proposer une palette de couleur pour peindre un pictogramme monochrome
                // li = this._createStylingElement({
                //     type : "color",
                //     className : "gp-styling-option",
                //     label : this.options.labels.markerColor,
                //     id : this._addUID("markerColor"),
                //     defaultValue : options.initValues.markerColor
                // });
                // ul.appendChild(li);
                if (options.initValues.markerCustom) {
                    // FIXME que faire des icones customisés ?
                }
                if (geomType === "point&text") {
                    li = this._createStylingElement({
                        type : "checkbox",
                        className : "gp-styling-option",
                        label : this.options.labels.labelDisplay,
                        id : this._addUID("labelDisplay"),
                        checked : options.initValues.labelDisplay,
                        defaultValue : options.initValues.labelDisplay
                    });
                    ul.appendChild(li);
                }
                break;
            case "text":
                li = this._createStylingElement({
                    type : "color",
                    className : "gp-styling-option",
                    label : this.options.labels.fillColor,
                    id : this._addUID("fillColor"),
                    defaultValue : options.initValues.fillColor
                });
                ul.appendChild(li);
                li = this._createStylingElement({
                    type : "color",
                    className : "gp-styling-option",
                    label : this.options.labels.strokeColor,
                    id : this._addUID("strokeColor"),
                    defaultValue : options.initValues.strokeColor
                });
                ul.appendChild(li);
                li = this._createStylingElement({
                    type : "range",
                    className : "gp-styling-option",
                    label : this.options.labels.strokeWidth,
                    title : "1 à 10 pixels",
                    id : this._addUID("strokeWidth"),
                    min : 1,
                    max : 10,
                    step : 1,
                    defaultValue : options.initValues.strokeWidth
                });
                ul.appendChild(li);
                break;
            case "line":
                li = this._createStylingElement({
                    type : "color",
                    className : "gp-styling-option",
                    label : this.options.labels.strokeColor,
                    id : this._addUID("strokeColor"),
                    defaultValue : options.initValues.strokeColor
                });
                ul.appendChild(li);
                li = this._createStylingElement({
                    type : "range",
                    className : "gp-styling-option fr-range fr-range--sm",
                    label : this.options.labels.strokeWidth,
                    title : "1 à 10 pixels",
                    id : this._addUID("strokeWidth"),
                    min : 1,
                    max : 10,
                    step : 1,
                    defaultValue : options.initValues.strokeWidth
                });
                ul.appendChild(li);
                break;
            case "polygon":
                li = this._createStylingElement({
                    type : "color",
                    className : "gp-styling-option",
                    label : this.options.labels.strokeColor,
                    id : this._addUID("strokeColor"),
                    defaultValue : options.initValues.strokeColor
                });
                ul.appendChild(li);
                li = this._createStylingElement({
                    type : "range",
                    className : "gp-styling-option fr-range fr-range--sm",
                    label : this.options.labels.strokeWidth,
                    title : "1 à 10 pixels",
                    id : this._addUID("strokeWidth"),
                    min : 1,
                    max : 10,
                    step : 1,
                    defaultValue : options.initValues.strokeWidth
                });
                ul.appendChild(li);
                li = this._createStylingElement({
                    type : "color",
                    className : "gp-styling-option",
                    label : this.options.labels.fillColor,
                    id : this._addUID("fillColor"),
                    defaultValue : options.initValues.fillColor
                });
                ul.appendChild(li);
                li = this._createStylingElement({
                    type : "range",
                    className : "gp-styling-option fr-range fr-range--sm",
                    label : this.options.labels.fillOpacity,
                    title : "0 (transparent) à 100% (opaque)",
                    id : this._addUID("fillOpacity"),
                    min : 0,
                    max : 10,
                    step : 1,
                    defaultValue : options.initValues.fillOpacity * 10
                });
                ul.appendChild(li);
                break;
            default:
                logger.log("Unhandled geometry type for styling.");
        }
        div.appendChild(ul);
        var divWrapper = document.createElement("div");
        divWrapper.className = "gpf-flex-row";
        div.appendChild(divWrapper);
        // apply button
        var applyButton = document.createElement("input");
        applyButton.type = "button";
        applyButton.className = "gp-styling-button fr-btn fr-btn--secondary";
        applyButton.value = this.options.labels.applyToObject;
        /** click sur applyButton */
        applyButton.onclick = function () {
            options.applyFunc.call(this, "apply");
        };
        // set default button
        var setDefaultButton = document.createElement("input");
        setDefaultButton.type = "button";
        setDefaultButton.value = this.options.labels.setAsDefault;
        setDefaultButton.className = "gp-styling-button fr-btn fr-btn--tertiary";
        /** click sur set Default Button */
        setDefaultButton.onclick = function () {
            options.applyFunc.call(this, "default");
        };
        divWrapper.appendChild(setDefaultButton);
        divWrapper.appendChild(applyButton);
        // cancel Button
        var cancelButton = document.createElement("input");
        cancelButton.type = "button";
        // cancelButton.value = "X" ;
        cancelButton.className = "gp-styling-button closer";
        /** click sur cancel Button */
        cancelButton.onclick = function () {
            options.applyFunc.call(this, "cancel");
        };
        div.appendChild(cancelButton);
        return dialog;
    },

    /**
     * Creates Text editing div to include in popup.
     *
     * @param {Object} options - options for popup
     * @param {String} options.geomType - gemeotryType selected ("Point", "Line" or "Polygon")
     * @param {String} options.text - text to fill input.
     * @param {String} options.key - property name called when text is to be saved.
     * @param {String} options.measure - measure to fill input.
     * @param {String} options.placeholder - placeholder for text input.
     * @param {String} options.inputId - text input id.
     * @param {Function} options.applyFunc - function called when text is to be saved.
     * @returns {DOMElement} DOM element created
     * @private
     */
    _createLabelDiv : function (options) {
        var popup = document.createElement("dialog");
        popup.className = "gp-label-div gpf-panel fr-modal gpf-visible GPelementVisible";
        var mainDiv = document.createElement("div");
        mainDiv.className = "gpf-modal__body fr-modal__body";
        popup.appendChild(mainDiv);
        // header DSFR
        if (checkDsfr()) {
            var header = document.createElement("div");
            header.className = "GPpanelHeader gpf-panel__header fr-modal__header fr-m-1w";

            var divTitle = document.createElement("div");
            divTitle.className = "GPpanelTitle gpf-panel__title fr-modal__title fr-pt-4w";
            divTitle.innerHTML = "Ajouter une description";
            if (options.geomType === "Text") {
                divTitle.innerHTML = "Texte de l'annotation";
            }
            header.appendChild(divTitle);

            var divClose = document.createElement("button");
            divClose.id = this._addUID("GPdrawingStylePanelClose");
            divClose.className = "GPpanelClose GPdrawingStylePanelClose gpf-btn gpf-btn-icon-close fr-btn--close fr-btn fr-btn--tertiary-no-outline fr-m-1w";
            divClose.title = "Fermer le panneau";

            // Link panel close / visibility checkbox
            var dtObj = this;
            if (divClose.addEventListener) {
                divClose.addEventListener("click", function () {
                    options.applyFunc.call(this, "cancel");
                }, false);
            } else if (divClose.attachEvent) {
                divClose.attachEvent("onclick", function () {
                    options.applyFunc.call(this, "cancel");
                });
            }

            var span = document.createElement("span");
            span.className = "GPelementHidden gpf-visible"; // afficher en dsfr
            span.innerText = "Fermer";

            divClose.appendChild(span);

            header.appendChild(divClose);

            mainDiv.appendChild(header);
        }
        var div = document.createElement("div");
        div.className = "gpf-panel__content fr-px-3w fr-modal__content";
        mainDiv.appendChild(div);
        var inputLabel = null;
        if (options.geomType === "Text") {
            inputLabel = document.createElement("input");
            inputLabel.type = "text";
            inputLabel.className = "gp-input-label-style fr-input fr-mb-3w";
        } else {
            inputLabel = document.createElement("textArea");
            inputLabel.rows = 2;
            inputLabel.cols = 40;
            inputLabel.className = "gp-textarea-att-label-style fr-input";
        }

        if (options.text) {
            inputLabel.value = options.text;
        }

        inputLabel.autocomplete = "off";
        inputLabel.placeholder = options.placeholder;
        inputLabel.id = options.inputId;
        div.appendChild(inputLabel);
        // keyup
        inputLabel.onkeyup = function (evtk) {
            if (options.geomType === "Text" && evtk.keyCode === 13) {
                options.applyFunc.call(this, options.key, inputLabel.value, true);
            }
            if (evtk.keyCode === 27) {
                options.applyFunc.call(this, options.key, inputLabel.value, false);
            }
        };

        if (options.measure && options.geomType !== "Text") {
            var inputMeasure = document.createElement("input");
            inputMeasure.type = "text";
            inputMeasure.readonly = true;
            inputMeasure.className = "gp-input-measure-style";
            inputMeasure.value = options.measure;
            div.appendChild(inputMeasure);
        }

        // apply button
        var applyButton = document.createElement("input");
        applyButton.type = "button";
        applyButton.className = "gp-styling-button fr-btn fr-btn--tertiary";
        applyButton.value = this.options.labels.saveDescription;
        /** click sur applyButton */
        applyButton.onclick = function () {
            options.applyFunc.call(this, options.key, inputLabel.value, true);
        };
        div.appendChild(applyButton);
        // cancel Button
        var cancelButton = document.createElement("input");
        cancelButton.type = "button";
        cancelButton.className = "gp-styling-button closer";
        /** click sur cancel Button */
        cancelButton.onclick = function () {
            options.applyFunc.call(this, options.key, inputLabel.value, false);
        };
        div.appendChild(cancelButton);

        return popup;
    },

    /**
     * Handles drawing tool selection from a DOM point of view.
     *
     * @param {Event} e - DOM Event
     * @param {String} toolId - toolId selected
     * @param {DrawingDOM} context - Drawing control instance
     */
    _handleDOMToolClick : function (e, toolId, context) {
        for (var availType in context.dtOptions) {
            var availToolId = context._addUID("drawing-tool-" + context.dtOptions[availType].id);
            var li = document.getElementById(availToolId);
            // ce n'est pas l'outil selectionne : on le desactive (s'il ne l'était pas déjà).
            if (availToolId !== toolId) {
                li.className = "drawing-tool fr-btn fr-btn--tertiary gpf-btn--tertiary";
                context.dtOptions[availType].active = false;
                continue;
            }
            // ici, c'est le l'outil selectionne
            if (context.dtOptions[availType].active) {
                li.className = "drawing-tool fr-btn fr-btn--tertiary gpf-btn--tertiary";
            } else {
                li.className = "drawing-tool drawing-tool-active fr-btn fr-btn--tertiary gpf-btn--tertiary";
            }
            context.dtOptions[availType].active = !context.dtOptions[availType].active;
        }
    }

};

export default DrawingDOM;
