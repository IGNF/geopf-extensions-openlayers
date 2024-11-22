import checkDsfr from "../Utils/CheckDsfr";

var IsoDOM = {

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
        container.id = this._addUID("GPisochron");
        container.className = "GPwidget gpf-widget gpf-widget-button gpf-mobile-fullscreen";
        return container;
    },

    // ################################################################### //
    // ################# Methods to display Main Panel ################### //
    // ################################################################### //

    /**
     * Show iso control
     * see event !
     *
     * @returns {DOMElement} DOM element
     */
    _createShowIsoPictoElement : function () {
        // contexte d'execution
        var context = this;

        var button = document.createElement("button");
        // INFO: Ajout d'une SPAN pour enlever des marges de 6px dans CHROMIUM (?!)
        var span = document.createElement("span");
        button.appendChild(span);
        button.id = this._addUID("GPshowIsochronPicto");
        button.className = "GPshowOpen GPshowAdvancedToolPicto GPshowIsochronPicto gpf-btn gpf-btn--tertiary gpf-btn-icon gpf-btn-icon-isocurve fr-btn fr-btn--tertiary";
        button.setAttribute("aria-label", "Calculer une isochrone");
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", false);
        button.setAttribute("type", "button");

        // gestionnaire d'evenement :
        // on ouvre le menu de saisie du calcul d'isochrone
        // L'ouverture/Fermeture permet de faire le menage
        // (reinitialisation)
        if (button.addEventListener) {
            button.addEventListener("click", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                context.onShowIsoPanelClick(e);
            });
        } else if (button.attachEvent) {
            button.attachEvent("onclick", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                context.onShowIsoPanelClick(e);
            });
        }

        return button;
    },

    // ################################################################### //
    // ################## Methods to display Inputs Panel ################ //
    // ################################################################### //

    /**
     * Create Container Panel
     *
     * FIXME
     * don't call this._createIsoPanelHeaderElement
     * don't call this._createIsoPanelFormElement
     *
     * @returns {DOMElement} DOM element
     */
    _createIsoPanelElement : function () {
        var dialog = document.createElement("dialog");
        dialog.id = this._addUID("GPisochronPanel");
        dialog.className = "GPpanel gpf-panel fr-modal";

        // dialog.appendChild(this._createIsoPanelHeaderElement());
        // dialog.appendChild(this._createIsoPanelFormElement());

        return dialog;
    },

    _createIsoPanelDivElement : function () {
        var div = document.createElement("div");
        div.className = "gpf-panel__body fr-modal__body";
        return div;
    },

    /**
     * Create Header Panel
     *
     * @returns {DOMElement} DOM element
     */
    _createIsoPanelHeaderElement : function () {
        var self = this;

        var container = document.createElement("div");
        container.className = "GPpanelHeader gpf-panel__header fr-modal__header";

        var div = document.createElement("div");
        div.className = "GPpanelTitle gpf-panel__title fr-modal__title fr-pt-4w";
        div.innerHTML = "Calcul d'isochrone";
        container.appendChild(div);

        // on desactive l'impl. reduction de la fenetre
        // var divReduce  = document.createElement("div");
        // divReduce.id = this._addUID("GPisochronPanelReduce");
        // divReduce.className = "GPpanelReduce";
        // divReduce.title = "Masquer le panneau";
        //
        // if (divReduce.addEventListener) {
        //     divReduce.addEventListener("click", function () {
        //         if ( typeof self.onReduceIsoPanelClick === "function") {
        //             document.getElementById(self._addUID("GPshowIsochron")).checked = false;
        //             self.onReduceIsoPanelClick();
        //         }
        //     }, false);
        // } else if (divReduce.attachEvent) {
        //     divReduce.attachEvent("onclick", function () {
        //         if ( typeof self.onReduceIsoPanelClick === "function") {
        //             document.getElementById(self._addUID("GPshowIsochron")).checked = false;
        //             self.onReduceIsoPanelClick();
        //         }
        //     });
        // }
        // container.appendChild(divReduce);

        var divClose = document.createElement("button");
        divClose.id = this._addUID("GPisochronPanelClose");
        divClose.className = "GPpanelClose GPisochronPanelClose gpf-btn gpf-btn-icon-close fr-btn--close fr-btn fr-btn--tertiary-no-outline fr-m-1w";
        divClose.title = "Fermer le panneau";

        // Link panel close / visibility checkbox
        if (divClose.addEventListener) {
            divClose.addEventListener("click", function () {
                document.getElementById(self._addUID("GPshowIsochronPicto")).click();
            }, false);
        } else if (divClose.attachEvent) {
            divClose.attachEvent("onclick", function () {
                document.getElementById(self._addUID("GPshowIsochronPicto")).click();
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
     * Create Form
     * see evenement !
     *
     * @returns {DOMElement} DOM element
     */
    _createIsoPanelFormElement : function () {
        // contexte d'execution
        var self = this;

        var form = document.createElement("form");
        form.id = this._addUID("GPisochronForm");
        form.className = "GPform gpf-panel__content gpf-mobile-form fr-modal__content";

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            self.onIsoComputationSubmit(e);
            return false;
        });

        return form;
    },

    /**
     * Create Waiting Panel
     *
     * @returns {DOMElement} DOM element
     */
    _createIsoWaitingElement : function () {
        var div = document.createElement("div");
        div.id = this._addUID("GPisochronCalcWaitingContainer");
        div.className = "GPwaitingContainer GPwaitingContainerHidden gpf-waiting gpf-waiting--hidden";

        var p = document.createElement("p");
        p.className = "GPwaitingContainerInfo gpf-waiting_info";
        p.innerHTML = "Recherche en cours...";

        div.appendChild(p);

        return div;
    },

    /**
     * Create Footer Panel
     *
     * @returns {DOMElement} DOM element
     */
    _createIsoPanelFooterElement : function () {
        var container = document.createElement("div");
        container.className = "GPpanelFooter gpf-panel__footer fr-modal__footer";

        return container;
    },

    /**
     * Create Point label
     *
     * @returns {DOMElement} DOM element
     */
    _createIsoPanelFormPointLabel : function () {
        var p = document.createElement("p");
        p.id = this._addUID("GPisochronPointLabelP");
        p.className = "gpf-label fr-label";
        p.innerHTML = "Départ";

        return p;
    },

    // ################################################################### //
    // ############# Methods to the type choice into form ################ //
    // ################################################################### //

    /**
     * Create Container to type choice
     *
     * FIXME
     * don't call this._createIsoPanelFormTypeChoiceChronElement
     * don't call this._createIsoPanelFormTypeChoiceDistElement
     *
     * @returns {DOMElement} DOM element
     */
    _createIsoPanelFormTypeChoiceElement : function () {
        var div = document.createElement("div");
        div.id = this._addUID("GPisochronChoice");
        div.className = "fr-mt-2w";

        // div.appendChild(this._createIsoPanelFormTypeChoiceChronElement());
        // div.appendChild(this._createIsoPanelFormTypeChoiceDistElement());

        return div;
    },

    /**
     * Create Type choice Chron
     * see event !
     * FIXME event not useful
     * @param {Boolean} checked - checked
     * @returns {DOMElement} DOM element
     */
    _createIsoPanelFormTypeChoiceChronElement : function (checked) {
        var self = this;

        var div = document.createElement("div");
        div.className = "GPisochronChoiceAlt gpf-flex gpf-flex-isocurve gpf-radio-group fr-radio-group";

        var input = document.createElement("input");
        input.id = this._addUID("GPisochronChoiceAltChron");
        input.name = "GPisochronChoiceMode";
        input.type = "radio";
        input.checked = !!(checked);
        if (input.addEventListener) {
            input.addEventListener("change", function (e) {
                document.getElementById(self._addUID("GPisochronValueChron")).className = "GPflexInput gpf-flex fr-mt-1w";
                document.getElementById(self._addUID("GPisochronValueDist")).className = "GPelementHidden gpf-hidden";
                document.getElementById(self._addUID("GPisochronValueChronLabelP")).className = "gpf-label fr-label";
                document.getElementById(self._addUID("GPisochronValueDistLabelP")).className = "GPelementHidden gpf-hidden";
                document.getElementById(self._addUID("GPisochronSubmit")).value = "Calculer l'isochrone";
                self.onIsoTypeChoiceChange(e);
            }, false);
        } else if (input.attachEvent) {
            input.attachEvent("onchange", function () {
                document.getElementById(self._addUID("GPisochronValueChron")).className = "GPflexInput gpf-flex fr-mt-1w";
                document.getElementById(self._addUID("GPisochronValueDist")).className = "GPelementHidden gpf-hidden";
                document.getElementById(self._addUID("GPisochronValueChronLabelP")).className = "gpf-label fr-label";
                document.getElementById(self._addUID("GPisochronValueDistLabelP")).className = "GPelementHidden gpf-hidden";
                document.getElementById(self._addUID("GPisochronSubmit")).value = "Calculer l'isochrone";
                self.onIsoTypeChoiceChange();
            });
        }
        // info: Internet explorer support
        input.value = "isochron";
        div.appendChild(input);

        var label = document.createElement("label");
        label.className = "GPisochronChoiceAltImg gpf-label fr-label";
        label.htmlFor = this._addUID("GPisochronChoiceAltChron");
        label.innerHTML = "Durée";
        label.title = "Durée";
        div.appendChild(label);

        var span = document.createElement("span");
        span.id = this._addUID("GPisochronChoiceAltChronTxt");
        span.className = "gpf-hidden";
        span.innerHTML = "Durée";
        if (span.addEventListener) {
            span.addEventListener("click", function () {
                document.getElementById(self._addUID("GPisochronChoiceAltChron")).click();
            }, false);
        } else if (span.attachEvent) {
            span.attachEvent("onclick", function () {
                document.getElementById(self._addUID("GPisochronChoiceAltChron")).click();
            });
        }
        div.appendChild(span);

        return div;
    },

    /**
     * Create Type choice Dist
     * see event !
     * FIXME event not useful
     * @param {Boolean} checked - checked
     * @returns {DOMElement} DOM element
     */
    _createIsoPanelFormTypeChoiceDistElement : function (checked) {
        var self = this;

        var div = document.createElement("div");
        div.className = "GPisochronChoiceAlt gpf-flex gpf-flex-isocurve gpf-radio-group fr-radio-group";

        var input = document.createElement("input");
        input.id = this._addUID("GPisochronChoiceAltDist");
        input.name = "GPisochronChoiceMode";
        input.type = "radio";
        input.checked = !!(checked);
        if (input.addEventListener) {
            input.addEventListener("change", function (e) {
                document.getElementById(self._addUID("GPisochronValueDist")).className = "GPflexInput gpf-flex fr-mt-1w";
                document.getElementById(self._addUID("GPisochronValueChron")).className = "GPelementHidden gpf-hidden";
                document.getElementById(self._addUID("GPisochronValueDistLabelP")).className = "gpf-label fr-label";
                document.getElementById(self._addUID("GPisochronValueChronLabelP")).className = "GPelementHidden gpf-hidden";
                document.getElementById(self._addUID("GPisochronSubmit")).value = "Calculer l'isodistance";
                self.onIsoTypeChoiceChange(e);
            }, false);
        } else if (input.attachEvent) {
            input.attachEvent("onchange", function () {
                document.getElementById(self._addUID("GPisochronValueDist")).className = "GPflexInput gpf-flex fr-mt-1w";
                document.getElementById(self._addUID("GPisochronValueChron")).className = "GPelementHidden gpf-hidden";
                document.getElementById(self._addUID("GPisochronValueDistLabelP")).className = "gpf-label fr-label";
                document.getElementById(self._addUID("GPisochronValueChronLabelP")).className = "GPelementHidden gpf-hidden";
                document.getElementById(self._addUID("GPisochronSubmit")).value = "Calculer l'isodistance";
                self.onIsoTypeChoiceChange();
            });
        }
        // info: Internet explorer support
        input.value = "isodistance";
        div.appendChild(input);

        var label = document.createElement("label");
        label.className = "GPisochronChoiceAltImg gpf-label fr-label";
        label.htmlFor = this._addUID("GPisochronChoiceAltDist");
        label.innerHTML = "Distance";
        label.title = "Distance";

        div.appendChild(label);

        var span = document.createElement("span");
        span.id = this._addUID("GPisochronChoiceAltDistTxt");
        span.className = "gpf-hidden";
        span.innerHTML = "Distance";
        if (span.addEventListener) {
            span.addEventListener("click", function () {
                document.getElementById(self._addUID("GPisochronChoiceAltDist")).click();
            }, false);
        } else if (span.attachEvent) {
            span.attachEvent("onclick", function () {
                document.getElementById(self._addUID("GPisochronChoiceAltDist")).click();
            });
        }
        div.appendChild(span);

        return div;
    },

    // ################################################################### //
    // ############### Methods to the value iso into form ################ //
    // ################################################################### //

    /**
     * Create isochron inputs label
     * see event !
     * @param {Boolean} checked - checked
     * @returns {DOMElement} DOM element
     */
    _createIsoPanelFormLabelIsochronElement : function (checked) {
        var context = this;
        var p = document.createElement("p");
        p.id = this._addUID("GPisochronValueChronLabelP");
        p.className = (checked) ? "gpf-label fr-label" : "GPelementHidden gpf-hidden";
        p.innerHTML = "Définir un temps de trajet";

        return p;
    },

    /**
     * Create isochron inputs values
     * see event !
     * @param {Boolean} checked - checked
     * @returns {DOMElement} DOM element
     */
    _createIsoPanelFormValueIsochronElement : function (checked) {
        // contexte
        var context = this;

        var div = document.createElement("div");
        div.id = this._addUID("GPisochronValueChron");
        div.className = (checked) ? "GPflexInput gpf-flex fr-mt-1w" : "GPelementHidden gpf-hidden";

        var input1 = document.createElement("input");
        input1.id = this._addUID("GPisochronValueChronInput1");
        input1.className = "gpf-input fr-input";
        input1.min = "0";
        input1.step = "1";
        input1.value = "0";
        input1.type = "number";
        input1.title = "Temps";
        if (input1.addEventListener) {
            input1.addEventListener("change", function (e) {
                if (typeof context.onIsoValueChronTimeMinuteChange === "function") {
                    context.onIsoValueChronTimeHourChange(e);
                }
            });
        } else if (input1.attachEvent) {
            input1.attachEvent("onchange", function (e) {
                if (typeof context.onIsoValueChronTimeMinuteChange === "function") {
                    context.onIsoValueChronTimeHourChange(e);
                }
            });
        }
        div.appendChild(input1);

        var label1 = document.createElement("label");
        label1.innerHTML = "h";
        label1.className = "gpf-label fr-label";
        div.appendChild(label1);

        var input2 = document.createElement("input");
        input2.id = this._addUID("GPisochronValueChronInput2");
        input2.className = "gpf-input fr-input";
        input2.min = "0";
        input2.max = "59";
        input2.step = "1";
        input2.value = "0";
        input2.type = "number";
        input2.title = "Heures";
        if (input2.addEventListener) {
            input2.addEventListener("change", function (e) {
                if (typeof context.onIsoValueChronTimeMinuteChange === "function") {
                    context.onIsoValueChronTimeMinuteChange(e);
                }
            });
        } else if (input2.attachEvent) {
            input2.attachEvent("onchange", function (e) {
                if (typeof context.onIsoValueChronTimeMinuteChange === "function") {
                    context.onIsoValueChronTimeMinuteChange(e);
                }
            });
        }
        div.appendChild(input2);

        var label2 = document.createElement("label");
        label2.innerHTML = "min";
        label2.className = "gpf-label fr-label";
        div.appendChild(label2);

        return div;
    },

    /**
     * Create isodistance inputs label
     * see event !
     * @param {Boolean} checked - checked
     * @returns {DOMElement} DOM element
     */
    _createIsoPanelFormLabelIsodistanceElement : function (checked) {
        var context = this;
        var p = document.createElement("p");
        p.id = this._addUID("GPisochronValueDistLabelP");
        p.className = (checked) ? "gpf-label fr-label" : "GPelementHidden gpf-hidden";
        p.innerHTML = "Définir une distance";

        return p;
    },

    /**
     * Create isodistance inputs values
     * see event !
     * @param {Boolean} checked - checked
     * @returns {DOMElement} DOM element
     */
    _createIsoPanelFormValueIsodistanceElement : function (checked) {
        // contexte
        var context = this;

        var div = document.createElement("div");
        div.id = this._addUID("GPisochronValueDist");
        div.className = (checked) ? "GPflexInput gpf-flex fr-mt-1w" : "GPelementHidden gpf-hidden";

        var input1 = document.createElement("input");
        input1.id = this._addUID("GPisochronValueDistInput");
        input1.className = "gpf-input fr-input fr-ml-1w";
        input1.min = "0";
        input1.step = "any";
        input1.value = "0";
        input1.type = "number";
        input1.title = "Distance";
        if (input1.addEventListener) {
            input1.addEventListener("change", function (e) {
                if (typeof context.onIsoValueDistChange === "function") {
                    context.onIsoValueDistChange(e);
                }
            });
        } else if (input1.attachEvent) {
            input1.attachEvent("onchange", function (e) {
                if (typeof context.onIsoValueDistChange === "function") {
                    context.onIsoValueDistChange(e);
                }
            });
        }
        div.appendChild(input1);

        var label1 = document.createElement("label");
        label1.innerHTML = "km";
        label1.className = "gpf-label fr-label";
        div.appendChild(label1);

        return div;
    },

    // ################################################################### //
    // ############ Methods to the mode choice into form ################# //
    // ################################################################### //

    /**
     * Create Mode choice transport
     * see event !
     * FIXME event not useful
     * @param {Array} transports - transports in a list
     * @returns {DOMElement} DOM element
     */
    _createIsoPanelFormModeChoiceTransportElement : function (transports) {
        // contexte d'execution
        var context = this;

        var divContainer = document.createElement("div");
        divContainer.id = this._addUID("GPisochronTransportChoice");

        var label = document.createElement("label");
        label.className = "GPisochronModeLabel gpf-label fr-label";
        label.innerHTML = "Choisir un mode de déplacement";
        divContainer.appendChild(label);

        var radioContainer = document.createElement("div");

        /* jshint -W083 */
        for (var i = 0; i < transports.length; i++) {
            var transport = transports[i];

            var div = document.createElement("div");
            div.className = "GPisochronTransportChoice gpf-flex gpf-radio-group fr-radio-group";

            if (transport === "Voiture") {
                var inputCar = document.createElement("input");
                inputCar.id = this._addUID("GPisochronTransportCar");
                inputCar.type = "radio";
                inputCar.name = "GPisochronTransport";
                if (i === 0) {
                    inputCar.checked = true;
                }
                // gestionnaire d'evenement :
                // on stocke le mode de transport,
                // utilisation pour la requête sur le service de calcul d'itiniraire
                if (inputCar.addEventListener) {
                    inputCar.addEventListener("change", function (e) {
                        context.onIsoModeTransportChange(e);
                    });
                } else if (inputCar.attachEvent) {
                    inputCar.attachEvent("onchange", function (e) {
                        context.onIsoModeTransportChange(e);
                    });
                }
                // info : internet explorer support
                inputCar.value = "Voiture";
                div.appendChild(inputCar);

                var labelCar = document.createElement("label");
                labelCar.className = "GPisochronTransportImg gpf-label fr-label";
                labelCar.htmlFor = this._addUID("GPisochronTransportCar");
                labelCar.title = "Voiture";
                labelCar.innerHTML = "Voiture";
                div.appendChild(labelCar);
            }

            if (transport === "Pieton") {
                var inputPedestrian = document.createElement("input");
                inputPedestrian.id = this._addUID("GPisochronTransportPedestrian");
                inputPedestrian.type = "radio";
                inputPedestrian.name = "GPisochronTransport";
                if (i === 0) {
                    inputPedestrian.checked = true;
                }
                // gestionnaire d'evenement :
                // on stocke le mode de transport,
                // utilisation pour la requête sur le service de calcul d'itiniraire
                if (inputPedestrian.addEventListener) {
                    inputPedestrian.addEventListener("change", function (e) {
                        context.onIsoModeTransportChange(e);
                    });
                } else if (inputPedestrian.attachEvent) {
                    inputPedestrian.attachEvent("onchange", function (e) {
                        context.onIsoModeTransportChange(e);
                    });
                }
                // info : internet explorer support
                inputPedestrian.value = "Pieton";
                div.appendChild(inputPedestrian);

                var labelPedestrian = document.createElement("label");
                labelPedestrian.className = "GPisochronTransportImg gpf-label fr-label";
                labelPedestrian.htmlFor = this._addUID("GPisochronTransportPedestrian");
                labelPedestrian.title = "Piéton";
                labelPedestrian.innerHTML = "Piéton";
                div.appendChild(labelPedestrian);
            }

            radioContainer.appendChild(div);
        }
        divContainer.appendChild(radioContainer);

        return divContainer;
    },

    /**
     * Create Mode choice direction
     * see event!
     *
     * @param {Array} directions - directions to display in list ("Departure", "Arrival"). First element will be selected by default
     * @returns {DOMElement} DOM element
     */
    _createIsoPanelFormModeChoiceDirectionElement : function (directions) {
        // contexte d'execution
        var self = this;

        var div = document.createElement("div");
        div.id = this._addUID("GPisochronDirectionChoice");
        div.className = "fr-my-2w";

        var label = document.createElement("label");
        label.innerHTML = "Définir un sens de parcours";
        label.className = "fr-label";
        div.appendChild(label);

        var select = document.createElement("select");
        select.id = this._addUID("GPisochronDirectionSelect");
        select.className = "GPselect gpf-select fr-select";
        select.title = "Sens de parcours";
        // gestionnaire d'evenement :
        // on stocke la valeur du mode de calcul,
        // utilisation pour la requête sur le service de calcul d'iso
        select.addEventListener("change", function (e) {
            self.onIsoModeDirectionChange(e);
        });

        for (var i = 0; i < directions.length; i++) {
            var direction = directions[i];
            if (direction.toLowerCase() === "departure") {
                var departureOption = document.createElement("option");
                if (i === 0) {
                    departureOption.selected = "selected";
                }
                departureOption.value = "departure";
                departureOption.text = "Départ";
                select.appendChild(departureOption);
            }
            if (direction.toLowerCase() === "arrival") {
                var arrivalOption = document.createElement("option");
                if (i === 0) {
                    arrivalOption.selected = "selected";
                }
                arrivalOption.value = "arrival";
                arrivalOption.text = "Arrivée";
                select.appendChild(arrivalOption);
            }
        }
        div.appendChild(select);

        return div;
    },

    // ################################################################### //
    // ################# Methods to the choice exclusions ################ //
    // ################################################################### //

    /**
     * Label to Exclusions Options
     *
     * @returns {DOMElement} DOM element
     */
    _createShowIsoExclusionsPictoElement : function () {
        var self = this;

        var button = document.createElement("button");
        button.id = this._addUID("GPshowIsoExclusionsPicto");
        var hidden = "";
        if (checkDsfr()) {
            hidden = "GPelementHidden gpf-hidden";
        }
        button.className = `GPshowAdvancedToolPicto GPshowMoreOptionsImage GPshowMoreOptions GPshowIsoExclusionsPicto ${hidden} gpf-btn fr-btn--sm fr-btn--tertiary gpf-btn--tertiary fr-icon-arrow-down-fill`;
        button.title = "Exclusions";
        // button.style.top = "240px";
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", true);

        // Close all results and panels when minimizing the widget
        if (button.addEventListener) {
            button.addEventListener("click", function (e) {
                e.preventDefault();
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                self.onShowIsoSettingsClick(e);
            });
        } else if (button.attachEvent) {
            button.attachEvent("onclick", function (e) {
                e.preventDefault();
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                self.onShowIsoSettingsClick(e);
            });
        }

        return button;
    },

    /**
     * Create Container to Exclusions
     *
     * @returns {DOMElement} DOM element
     */
    _createIsoPanelFormExclusionsElement : function () {
        var div = document.createElement("div");
        div.id = this._addUID("GPisoExclusions");

        var label = document.createElement("label");
        label.className = "GPisoExclusionsLabel gpf-label fr-label";
        label.innerHTML = "Passages autorisés";
        div.appendChild(label);

        // div.appendChild(this._createIsoPanelFormExclusionOptionsElement());

        return div;
    },

    /**
     * Create Exclusions Options
     * see event !
     * FIXME event not useful
     * @param {Array} exclusions - exclusions to display in list
     * @returns {DOMElement} DOM element
     */
    _createIsoPanelFormExclusionOptionsElement : function (exclusions) {
        // contexte d'execution
        var context = this;

        var div = document.createElement("div");
        div.className = "GPisoExclusionsOptions gpf-flex fr-checkbox-group fr-m-1w";

        /* jshint -W083 */
        for (var value in exclusions) {
            if (exclusions.hasOwnProperty(value)) {
                var status = exclusions[value];
                switch (value) {
                    case "toll":
                        var inputToll = document.createElement("input");
                        inputToll.id = this._addUID("GPisoExclusionsToll");
                        inputToll.type = "checkbox";
                        inputToll.name = "Péages";
                        inputToll.checked = !status;
                        // gestionnaire d'evenement :
                        // on stocke l'exclusion,
                        // utilisation pour la requête sur le service de calcul d'itiniraire
                        if (inputToll.addEventListener) {
                            inputToll.addEventListener("change", function (e) {
                                context.onIsoExclusionsChange(e);
                            });
                        } else if (inputToll.attachEvent) {
                            inputToll.attachEvent("onchange", function (e) {
                                context.onIsoExclusionsChange(e);
                            });
                        }
                        // info : internet explorer support
                        inputToll.value = "Toll";
                        div.appendChild(inputToll);

                        var labelToll = document.createElement("label");
                        labelToll.className = "GPisoExclusionsOption";
                        labelToll.htmlFor = this._addUID("GPisoExclusionsToll");
                        labelToll.innerHTML = "Péages";
                        div.appendChild(labelToll);
                        break;

                    case "tunnel":
                        var inputTunnel = document.createElement("input");
                        inputTunnel.id = this._addUID("GPisoExclusionsTunnel");
                        inputTunnel.type = "checkbox";
                        inputTunnel.name = "Tunnel";
                        inputTunnel.checked = !status;
                        // gestionnaire d'evenement :
                        // on stocke l'exclusion,
                        // utilisation pour la requête sur le service de calcul d'itiniraire
                        if (inputTunnel.addEventListener) {
                            inputTunnel.addEventListener("change", function (e) {
                                context.onIsoExclusionsChange(e);
                            });
                        } else if (inputTunnel.attachEvent) {
                            inputTunnel.attachEvent("onchange", function (e) {
                                context.onIsoExclusionsChange(e);
                            });
                        }
                        // info : internet explorer support
                        inputTunnel.value = "Tunnel";
                        div.appendChild(inputTunnel);

                        var labelTunnel = document.createElement("label");
                        labelTunnel.className = "GPisoExclusionsOption";
                        labelTunnel.htmlFor = this._addUID("GPisoExclusionsTunnel");
                        labelTunnel.innerHTML = "Tunnels";
                        div.appendChild(labelTunnel);
                        break;

                    case "bridge":
                        var inputBridge = document.createElement("input");
                        inputBridge.id = this._addUID("GPisoExclusionsBridge");
                        inputBridge.type = "checkbox";
                        inputBridge.name = "Ponts";
                        inputBridge.checked = !status;
                        // gestionnaire d'evenement :
                        // on stocke l'exclusion,
                        // utilisation pour la requête sur le service de calcul d'itiniraire
                        if (inputBridge.addEventListener) {
                            inputBridge.addEventListener("change", function (e) {
                                context.onIsoExclusionsChange(e);
                            });
                        } else if (inputBridge.attachEvent) {
                            inputBridge.attachEvent("onchange", function (e) {
                                context.onIsoExclusionsChange(e);
                            });
                        }
                        // info : internet explorer support
                        inputBridge.value = "Bridge";
                        div.appendChild(inputBridge);

                        var labelBridge = document.createElement("label");
                        labelBridge.className = "GPisoExclusionsOption";
                        labelBridge.htmlFor = this._addUID("GPisoExclusionsBridge");
                        labelBridge.innerHTML = "Ponts";
                        div.appendChild(labelBridge);
                        break;
                }
            }
        }

        return div;
    },

    // ################################################################### //
    // ############################### Submit Form ####################### //
    // ################################################################### //


    /**
     * Create Submit Form Element
     *
     * @returns {DOMElement} DOM element
     */
    _createIsoSubmitFormElement : function () {
        var input = document.createElement("input");
        input.id = this._addUID("GPisochronSubmit");
        input.className = "GPsubmit gpf-btn fr-btn";
        input.type = "submit";
        input.value = "Calculer l'isochrone";

        return input;
    },

    // ################################################################### //
    // ############################### Reset picto ####################### //
    // ################################################################### //

    /**
     * Create Reset Picto Element
     *
     * @returns {DOMElement} DOM element
     */
    _createIsoFormResetElement : function () {
        var self = this;

        var buttonReset = document.createElement("button");
        buttonReset.id = this._addUID("GPisochronReset");
        buttonReset.className = "GPresetPicto GPisochronReset gpf-btn gpf-btn-icon-reset gpf-btn-icon-isocurve-reset fr-btn fr-btn--secondary gpf-btn--secondary";
        buttonReset.title = "Réinitialiser les paramètres";
        buttonReset.setAttribute("tabindex", "0");
        buttonReset.setAttribute("aria-pressed", false);

        buttonReset.addEventListener("click", function (e) {
            var status = (e.target.ariaPressed === "true");
            e.target.setAttribute("aria-pressed", !status);
            self.onIsoResetClick(e);
        });

        return buttonReset;
    }
};

export default IsoDOM;
