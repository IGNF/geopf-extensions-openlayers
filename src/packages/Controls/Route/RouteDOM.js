import ID from "../../Utils/SelectorID";
import Logger from "../../Utils/LoggerByDefault";
import GeocodeUtils from "../../Utils/GeocodeUtils";
import checkDsfr from "../Utils/CheckDsfr";

var logger = Logger.getLogger("RouteDOM");

var RouteDOM = {

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
        container.id = this._addUID("GProute");
        container.className = "GPwidget gpf-widget gpf-widget-button gpf-mobile-fullscreen";
        return container;
    },

    // ################################################################### //
    // ################# Methods to display Main Panel ################### //
    // ################################################################### //

    /**
     * Show route control
     * see event !
     *
     * @returns {DOMElement} DOM element
     */
    _createShowRoutePictoElement : function () {
        // contexte d'execution
        var context = this;

        var button = document.createElement("button");
        // INFO: Ajout d'une SPAN pour enlever des marges de 6px dans CHROMIUM (?!)
        var span = document.createElement("span");
        button.appendChild(span);
        button.id = this._addUID("GPshowRoutePicto");
        button.className = "GPshowOpen GPshowAdvancedToolPicto GPshowRoutePicto gpf-btn gpf-btn--tertiary gpf-btn-icon gpf-btn-icon-route fr-btn fr-btn--tertiary";
        button.setAttribute("aria-label", "Ouvrir le calcul d'itinéraire");
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", false);
        button.setAttribute("type", "button");

        // gestionnaire d'evenement :
        // on ouvre le menu de saisie du calcul d'itiniraire
        // L'ouverture/Fermeture permet de faire le menage
        // (reinitialisation)
        if (button.addEventListener) {
            button.addEventListener("click", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                context.onShowRoutePanelClick(e);
            });
        } else if (button.attachEvent) {
            button.attachEvent("onclick", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                context.onShowRoutePanelClick(e);
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
     * don't call this._createRoutePanelHeaderElement
     * don't call this._createRoutePanelFormElement
     * don't call this._createRoutePanelResultsElement
     *
     * @returns {DOMElement} DOM element
     */
    _createRoutePanelElement : function () {
        var dialog = document.createElement("dialog");
        dialog.id = this._addUID("GProutePanel");
        dialog.className = "GPpanel gpf-panel fr-modal";

        // dialog.appendChild(this._createRoutePanelHeaderElement());
        // dialog.appendChild(this._createRoutePanelFormElement());
        // dialog.appendChild(this._createRoutePanelResultsElement());

        return dialog;
    },

    _createRoutePanelDivElement : function () {
        var div = document.createElement("div");
        div.className = "gpf-panel__body fr-modal__body";
        return div;
    },

    /**
     * Create Header Panel
     *
     * @returns {DOMElement} DOM element
     */
    _createRoutePanelHeaderElement : function () {
        // contexte d'execution
        var self = this;

        var container = document.createElement("div");
        container.className = "GPpanelHeader gpf-panel__header fr-modal__header";

        var div = document.createElement("div");
        div.className = "GPpanelTitle gpf-panel__title fr-modal__title fr-pt-4w";
        div.innerHTML = "Calcul d'itinéraire";
        container.appendChild(div);

        var divClose = document.createElement("button");
        divClose.id = this._addUID("GProutePanelClose");
        divClose.className = "GPpanelClose GProutePanelClose gpf-btn gpf-btn-icon-close fr-btn--close fr-btn fr-btn--tertiary-no-outline fr-m-1w";
        divClose.title = "Masquer le panneau";

        // Link panel close / visibility checkbox
        if (divClose.addEventListener) {
            divClose.addEventListener("click", function () {
                document.getElementById(self._addUID("GPshowRoutePicto")).click();
            }, false);
        } else if (divClose.attachEvent) {
            divClose.attachEvent("onclick", function () {
                document.getElementById(self._addUID("GPshowRoutePicto")).click();
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
     * Create Footer Panel
     *
     * @returns {DOMElement} DOM element
     */
    _createRoutePanelFooterElement : function () {
        var container = document.createElement("div");
        container.className = "GPpanelFooter gpf-panel__footer fr-modal__footer";

        return container;
    },

    /**
     * Create Point label
     *
     * @param {String} innerHTML text to display
     * @param {Boolean} display should the label be dsiplayed?
     * @returns {DOMElement} DOM element
     */
    _createRoutePanelFormPointLabel : function (innerHTML, display = true) {
        var p = document.createElement("p");
        p.innerHTML = innerHTML;
        var classesToAdd = !display ? " GPelementHidden gpf-hidden" : "";
        p.className = "GProutePointLabelP gpf-label fr-label" + classesToAdd;

        return p;
    },

    /**
     * Create Form
     * see evenement !
     *
     * @returns {DOMElement} DOM element
     */
    _createRoutePanelFormElement : function () {
        // contexte d'execution
        var self = this;

        var form = document.createElement("form");
        form.id = this._addUID("GProuteForm");
        form.className = "gpf-panel__content fr-modal__content";
        form.setAttribute("onkeypress", "return event.keyCode != 13;"); // FIXME hack pour desactiver l'execution via 'enter' au clavier !

        form.addEventListener("submit", function (e) {
            logger.log(e);
            e.preventDefault();

            // points
            var points = document.getElementsByClassName(self._addUID("GPlocationPoint"));

            // Must have at least two origin points
            var start = points[0].childNodes[0].id;
            var end = points[points.length - 1].childNodes[0].id;
            var startID = ID.index(start);
            var endID = ID.index(end);

            if ((document.getElementById(self._addUID("GPlocationOrigin_" + startID)).value === "" &&
                document.getElementById(self._addUID("GPlocationOriginCoords_" + startID)).value === "") ||
                (document.getElementById(self._addUID("GPlocationOrigin_" + endID)).value === "" &&
                    document.getElementById(self._addUID("GPlocationOriginCoords_" + endID)).value === "")) {
                return false;
            }

            // Send stages to results panel
            self._addRouteResultsStagesValuesElement(points);

            // on peut récuperer les valeurs utiles pour les transmettre au service d'iti...
            // - le mode de calcul
            // - le mode de transport
            // - les exclusions
            // Les points sont déjà stockés dans l'application.

            // computation mode params
            var modeComputation = null;
            if (document.getElementById(self._addUID("GProuteComputationChoice"))) {
                // plus rapide ?
                if (document.getElementById(self._addUID("GProuteComputationFastest"))) {
                    if (document.getElementById(self._addUID("GProuteComputationFastest")).checked) {
                        modeComputation = document.getElementById(self._addUID("GProuteComputationFastest")).value;
                    }
                }
                // plus court ?
                if (document.getElementById(self._addUID("GProuteComputationShortest"))) {
                    if (document.getElementById(self._addUID("GProuteComputationShortest")).checked) {
                        modeComputation = document.getElementById(self._addUID("GProuteComputationShortest")).value;
                    }
                }
            }

            // transport mode params
            var modeTransport = null;
            // voiture ?
            if (document.getElementById(self._addUID("GProuteTransportCar"))) {
                if (document.getElementById(self._addUID("GProuteTransportCar")).checked) {
                    modeTransport = document.getElementById(self._addUID("GProuteTransportCar")).value;
                }
            }
            // pieton ?
            if (document.getElementById(self._addUID("GProuteTransportPedestrian"))) {
                if (document.getElementById(self._addUID("GProuteTransportPedestrian")).checked) {
                    modeTransport = document.getElementById(self._addUID("GProuteTransportPedestrian")).value;
                }
            }

            // exclusions params
            var exclusions = [];
            var exclusionsElement = document.getElementsByClassName("GProuteExclusionsOption");
            for (var j = 0; j < exclusionsElement.length; j++) {
                var id = exclusionsElement[j].htmlFor;
                var el = document.getElementById(id);
                if (!el.checked) {
                    exclusions.push(el.value);
                }
            }

            self.onRouteComputationSubmit({
                computation : modeComputation,
                transport : modeTransport,
                exclusions : exclusions
            });

            // FIXME mise à jour du controle dans le composant JS !
            // document.getElementById(self._addUID("GProuteForm")).className = "GPelementHidden";
            // document.getElementById(self._addUID("GProuteResultsPanel")).className = "";

            return false;
        });

        return form;
    },

    /**
     * Create Results Panel
     *
     * @returns {DOMElement} DOM element
     */
    _createRoutePanelResultsElement : function () {
        var container = document.createElement("div");
        container.id = this._addUID("GProuteResultsPanel");
        container.className = "GPelementHidden gpf-hidden";

        container.appendChild(this._createRouteResultsStagesElement());
        container.appendChild(this._createRouteResultsElement());
        container.appendChild(this._createRouteShowResultsDetailsElement());
        container.appendChild(this._createRouteResultsDetailsElement());

        return container;
    },

    /**
     * Create Waiting Panel
     *
     * @returns {DOMElement} DOM element
     */
    _createRouteWaitingElement : function () {
        var div = document.createElement("div");
        div.id = this._addUID("GProuteCalcWaitingContainer");
        div.className = "GPwaitingContainer GPwaitingContainerHidden gpf-waiting gpf-waiting--hidden";

        var p = document.createElement("p");
        p.className = "GPwaitingContainerInfo gpf-waiting_info";
        p.innerHTML = "Recherche en cours...";

        div.appendChild(p);

        return div;
    },

    // ################################################################### //
    // ############### Methods to the window results ##################### //
    // ################################################################### //

    /**
     * Create Results Stages
     * (results dynamically generate !)
     *
     * @returns {DOMElement} DOM element
     */
    _createRouteResultsStagesElement : function () {
        var div = document.createElement("div");
        div.id = this._addUID("GProuteResultsStages");
        return div;
    },

    /**
     * Add Stages Results
     *
     * @param {DOMElement} points - list of points
     */
    _addRouteResultsStagesValuesElement : function (points) {
        document.getElementById(this._addUID("GProuteResultsStages")).innerHTML = "";
        for (var i = 0; i < points.length; i++) {
            var tag = points[i].childNodes[0].id;
            var id = ID.index(tag);
            if (document.getElementById(this._addUID("GPlocationPoint_" + id)).className === "GPflexInput GPlocationStageFlexInput gpf-flex") {
                var resultStage = document.createElement("div");
                resultStage.className = "GProuteResultsStages";
                var resultStageLabel = document.createElement("div");
                resultStageLabel.className = "GProuteResultStageLabel";
                resultStageLabel.innerHTML = document.getElementById(this._addUID("GPlocationOriginLabel_" + id)).innerHTML + " :";
                resultStage.appendChild(resultStageLabel);
                var resultStageValue = document.createElement("div");
                resultStageValue.className = "GProuteResultStageValue";
                var elementCoords = document.getElementById(this._addUID("GPlocationOriginCoords_" + id));
                var stageCoords = elementCoords.value;
                var visible = (elementCoords.className === "GPelementVisible gpf-visible");
                if (stageCoords !== null && stageCoords !== "" && visible) {
                    resultStageValue.innerHTML = stageCoords;
                } else {
                    resultStageValue.innerHTML = document.getElementById(this._addUID("GPlocationOrigin_" + id)).value;
                }
                resultStage.appendChild(resultStageValue);
                if (resultStageValue.innerHTML !== "") {
                    document.getElementById(this._addUID("GProuteResultsStages")).appendChild(resultStage);
                }
            }
        }
    },

    /**
     * Create Show Results
     * see event!
     *
     * @returns {DOMElement} DOM element
     */
    _createRouteResultsElement : function () {
        // contexte
        var self = this;

        var container = document.createElement("div");
        container.id = this._addUID("GProuteResults");

        // FIXME Route results are dynamically filled in Javascript by route service
        var divValue = document.createElement("div");
        divValue.id = this._addUID("GProuteResultsValues");
        container.appendChild(divValue);

        var divMode = document.createElement("div");
        divMode.id = this._addUID("GProuteResultsMode");

        var select = document.createElement("select");
        select.id = this._addUID("GProuteResultsComputationSelect");
        select.className = "GPselect gpf-select fr-select";
        // gestionnaire d'evenement :
        // on stocke la valeur du mode de calcul, et on relance le calcul d'itiniraire
        select.addEventListener("change", function (e) {
            self.onRouteModeComputationChangeAndRun(e);
        });

        var computes = [{
            code : "fastest",
            label : "Plus rapide"
        }, {
            code : "shortest",
            label : "Plus court"
        }];

        for (var i = 0; i < computes.length; i++) {
            var option = document.createElement("option");
            option.value = computes[i].code;
            option.text = computes[i].label;
            select.appendChild(option);
        }
        divMode.appendChild(select);
        container.appendChild(divMode);

        var divNew = document.createElement("div");
        divNew.id = this._addUID("GProuteResultsNew");
        divNew.className = "GPresetPicto gpf-btn gpf-btn-icon-reset fr-btn fr-btn--secondary gpf-btn--secondary";
        divNew.title = "Modifier le calcul";
        divNew.addEventListener("click", function (e) {
            document.getElementById(self._addUID("GProuteResultsPanel")).className = "GPelementHidden gpf-hidden";
            document.getElementById(self._addUID("GProuteForm")).className = "gpf-panel__content fr-modal__content";
            self.onShowRouteResultsNewClick(e);
        });
        container.appendChild(divNew);

        return container;
    },

    /**
     * Add Results Duration and Distance
     * (results dynamically generate !)
     * see event!
     * @param {Number} distance - distance
     * @param {Number} duration - duration
     * @param {Function} fconvert - fconvert
     *
     * @returns {DOMElement} DOM element
     */
    _addRouteResultsValuesElement : function (distance, duration, fconvert) {
        var div = document.getElementById(this._addUID("GProuteResultsValues"));

        // clean !
        if (div.childElementCount) {
            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }
        }

        var containerDistance = document.createElement("div");
        containerDistance.className = "GProuteResultsValue";

        var labelDistance = document.createElement("label");
        labelDistance.className = "GProuteResultsValueLabel";
        labelDistance.innerHTML = "Distance :";
        containerDistance.appendChild(labelDistance);

        var distanceLabel = 0;
        var isKm = parseInt(distance / 1000, 10);

        if (!isKm) {
            distanceLabel = Math.round(distance) + " m";
        } else {
            var distanceArrondi = Math.round(distance);
            distanceArrondi = distanceArrondi / 1000;
            distanceLabel = distanceArrondi + " km";
        }

        var divDistance = document.createElement("div");
        divDistance.id = this._addUID("GProuteResultsValueDist");
        divDistance.innerHTML = distanceLabel;
        containerDistance.appendChild(divDistance);

        div.appendChild(containerDistance);

        var containerDuration = document.createElement("div");
        containerDuration.className = "GProuteResultsValue";

        var labelDuration = document.createElement("label");
        labelDuration.className = "GProuteResultsValueLabel";
        labelDuration.innerHTML = "Durée :";
        containerDuration.appendChild(labelDuration);

        var divDuration = document.createElement("div");
        divDuration.id = this._addUID("GProuteResultsValueDist");
        divDuration.innerHTML = fconvert(duration);
        containerDuration.appendChild(divDuration);

        div.appendChild(containerDuration);

        return div;
    },

    /**
     * Create Show Results Details
     *
     * @returns {DOMElement} DOM element
     */
    _createRouteShowResultsDetailsElement : function () {
        var div = document.createElement("div");
        div.className = "GProuteResultsShowDetailsDiv gpf-flex fr-checkbox-group fr-m-1w";
        if (!checkDsfr()) {
            var divBorderUp = document.createElement("div");
            divBorderUp.className = "GPfakeBorder GPfakeBorderLeft";
            div.appendChild(divBorderUp);
        }
        var input = document.createElement("input");
        input.id = this._addUID("GProuteResultsShowDetails");
        input.type = "checkbox";
        div.appendChild(input);
        var labelShow = document.createElement("label");
        labelShow.className = "gpf-label fr-label";
        labelShow.htmlFor = this._addUID("GProuteResultsShowDetails");
        labelShow.innerHTML = "Afficher le détail";
        div.appendChild(labelShow);
        if (!checkDsfr()) {
            var labelHide = document.createElement("label");
            labelHide.htmlFor = this._addUID("GProuteResultsShowDetails");
            labelHide.innerHTML = "Masquer le détail";
            div.appendChild(labelHide);
            var divBorderDown = document.createElement("div");
            divBorderDown.className = "GPfakeBorder";
            div.appendChild(divBorderDown);
        }
        return div;
    },

    /**
     *  Create Results Details
     *
     * @returns {DOMElement} DOM element
     */
    _createRouteResultsDetailsElement : function () {
        // <!-- Route results details are dynamically filled in Javascript by route service -->
        var div = document.createElement("div");
        div.id = this._addUID("GProuteResultsDetails");
        return div;
    },

    /**
     *  Add Results Details
     * (results dynamically generate !)
     * @param {Object[]} instructions - instructions
     * @param {Function} fconvert - fconvert
     *
     * @returns {DOMElement} DOM element
     */
    _addRouteResultsDetailsElement : function (instructions, fconvert) {
        // contexte
        var context = this;

        var div = document.getElementById(this._addUID("GProuteResultsDetails"));

        // clean !
        if (div.childElementCount) {
            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }
        }

        // calcul des valeurs cumulé !
        var distanceCumul = 0;
        var durationCumul = 0;

        /* jshint -W083 */
        for (var i = 0; i < instructions.length; i++) {
            var id = i + 1;

            var o = instructions[i];

            var divNum = document.createElement("div");
            divNum.className = "GProuteResultsDetailsNumber";
            divNum.innerHTML = id + ".";
            div.appendChild(divNum);

            durationCumul += parseFloat(o.duration);
            distanceCumul += parseFloat(o.distance);

            var distance = 0;
            var isCumulKm = parseInt(distanceCumul / 1000, 10);
            if (!isCumulKm) {
                distance = Math.round(distanceCumul) + " m";
            } else {
                var distanceArrondi = Math.round(distanceCumul);
                distanceArrondi = distanceArrondi / 1000;
                distance = distanceArrondi + " km";
            }

            var divIns = document.createElement("div");
            divIns.className = "GProuteResultsDetailsInstruction";
            divIns.id = this._addUID("GProuteResultsDetailsInstruction_" + id);
            divIns.title = "distance : " + distance + " / " + "temps : " + fconvert(durationCumul);
            divIns.innerHTML = o.instruction;

            divIns.addEventListener("mouseover", function (e) {
                context.onRouteResultsDetailsMouseOver(e);
            });
            divIns.addEventListener("mouseout", function (e) {
                context.onRouteResultsDetailsMouseOut(e);
            });
            divIns.addEventListener("click", function (e) {
                // mode mobile !
                if (typeof context.onRouteResultsDetailsClick === "function") {
                    context.onRouteResultsDetailsClick(e);
                }
            });
            div.appendChild(divIns);
        }

        return div;
    },

    // ################################################################### //
    // ################### Methods to the form points #################### //
    // ################# OVERWRITTEN BY LOCATIONSELECTOR ! ################# //

    /**
     * Create Point
     * see event !
     * OVERWRITTEN BY LOCATIONSELECTOR !
     * (version initial without LOCATIONSELECTOR PLUGIN)
     * @param {Integer} n - n
     * @param {String} text - text
     * @param {Boolean} visibility - visibility
     *
     * @returns {DOMElement} DOM element
     */
    _createRoutePanelFormPointElement : function (n, text, visibility) {
        // contexte d'execution
        var context = this;

        var div = document.createElement("div");
        div.id = "GProutePoint" + n;
        div.className = (visibility) ? "GPflexInput GProuteStageFlexInput" : "GPflexInput GProuteStageFlexInputHidden";

        var labelOrigin = document.createElement("label");
        labelOrigin.id = "GProuteOriginLabel" + n;
        labelOrigin.htmlFor = "GProuteOrigin" + n;
        labelOrigin.innerHTML = text;
        labelOrigin.addEventListener("click", function () {
            var i = this.id.charAt(this.id.length - 1);
            document.getElementById("GProuteOriginCoords" + i).value = "";
            for (var j = 1; j < 8; j++) {
                document.getElementById("GProutePoint" + j).style.display = "flex";
            }
            document.getElementById("GProuteForm").className = "gpf-panel__content fr-modal__content";
            document.getElementById("GProuteOriginPointer" + i).checked = false;
            document.getElementById("GProuteOrigin" + i).className = "GPelementVisible gpf-visible";
            document.getElementById("GProuteOriginCoords" + i).className = "GPelementHidden gpf-hidden";
        });
        div.appendChild(labelOrigin);

        var inputOrigin = document.createElement("input");
        inputOrigin.id = "GProuteOrigin" + n;
        inputOrigin.className = "GPelementVisible gpf-visible";
        inputOrigin.type = "text";
        inputOrigin.placeholder = "Saisir une adresse, un lieu...";
        inputOrigin.addEventListener("keyup", function (e) {
            var charCode = e.which || e.keyCode;
            if (charCode === 13 || charCode === 10) {
                return;
            }
            var i = this.id.charAt(this.id.length - 1);
            if (document.getElementById("GProuteOrigin" + i).value.length > 2) {
                document.getElementById("GProuteAutoCompleteList" + i).style.display = "block";
            } else {
                document.getElementById("GProuteAutoCompleteList" + i).style.display = "none";
            }
            // gestionnaire d'evenement :
            // on récupère la valeur de saisie pour une requête sur le service d'autocompletion.
            // le resultat de la requête nous permet de recuperer les coordonnées du point...
            context.onAutoCompleteSearchText(e);
        });
        inputOrigin.addEventListener("blur", function () {
            var i = this.id.charAt(this.id.length - 1);
            document.getElementById("GProuteAutoCompleteList" + i).style.display = "none";
        });
        div.appendChild(inputOrigin);

        var inputOriginCoord = document.createElement("input");
        inputOriginCoord.id = "GProuteOriginCoords" + n;
        inputOriginCoord.className = "GPelementHidden gpf-hidden";
        inputOriginCoord.type = "text";
        inputOriginCoord.disabled = true;
        div.appendChild(inputOriginCoord);

        var inputOriginPointer = document.createElement("input");
        inputOriginPointer.id = "GProuteOriginPointer" + n;
        inputOriginPointer.type = "checkbox";
        div.appendChild(inputOriginPointer);

        var labelOriginPointer = document.createElement("label");
        labelOriginPointer.id = "GProuteOriginPointerImg" + n;
        labelOriginPointer.htmlFor = "GProuteOriginPointer" + n;
        labelOriginPointer.className = "GProuteOriginPointerImg";
        labelOriginPointer.title = "Pointer un lieu sur la carte";
        labelOriginPointer.addEventListener("click", function (evt) {
            evt.preventDefault();
            evt.stopPropagation();
            var i = this.id.charAt(this.id.length - 1);
            var j;
            for (j = 1; j < 8; j++) {
                if (i !== j) {
                    document.getElementById("GProuteOriginPointer" + j).checked = false;
                    if (document.getElementById("GProuteOriginCoords" + j).value === "Pointer un lieu sur la carte") {
                        document.getElementById("GProuteOriginCoords" + j).value = "";
                        document.getElementById("GProuteOrigin" + j).className = "GPelementVisible gpf-visible";
                        document.getElementById("GProuteOriginCoords" + j).className = "GPelementHidden gpf-hidden";
                    }
                }
            }
            if (document.getElementById("GProuteOriginPointer" + i).checked) {
                document.getElementById("GProuteOriginCoords" + i).value = "";
                for (j = 1; j < 8; j++) {
                    document.getElementById("GProutePoint" + j).style.display = "flex";
                }
                document.getElementById("GProuteForm").className = "gpf-panel__content fr-modal__content";
                document.getElementById("GProuteOriginPointer" + i).checked = false;
                document.getElementById("GProuteOrigin" + i).className = "GPelementVisible gpf-visible";
                document.getElementById("GProuteOriginCoords" + i).className = "GPelementHidden gpf-hidden";
            } else {
                document.getElementById("GProuteOriginCoords" + i).value = "Pointer un lieu sur la carte";
                for (j = 1; j < 8; j++) {
                    if (i === j) {
                        document.getElementById("GProutePoint" + j).style.display = "flex";
                    } else {
                        document.getElementById("GProutePoint" + j).style.display = "none";
                    }
                }
                document.getElementById("GProuteForm").className = "GProuteFormMini gpf-panel__content fr-modal__content";
                document.getElementById("GProuteOriginPointer" + i).checked = true;
                document.getElementById("GProuteOrigin" + i).className = "GPelementHidden gpf-hidden";
                document.getElementById("GProuteOriginCoords" + i).className = "GPelementVisible gpf-visible";
            }
            // gestionnaire d'evenement :
            // on stocke la valeur du point, utilisée pour la requête sur le service de calcul d'itiniraire
            context.onRouteMapPointClick(evt);
        });
        div.appendChild(labelOriginPointer);

        return div;
    },

    /**
     * Create Remove Point tag
     * see event !
     * OVERWRITTEN BY LOCATIONSELECTOR !
     * (version initial without LOCATIONSELECTOR PLUGIN)
     * @param {Integer} n - n
     *
     * @returns {DOMElement} DOM element
     */
    _createRoutePanelFormRemoveStageElement : function (n) {
        // contexte d'execution
        var context = this;

        var divRm = document.createElement("div");
        divRm.id = "GProuteStageRemove" + n;
        divRm.className = "GProuteStageRemove";
        divRm.title = "Supprimer l'étape";
        if (n !== 1 && n !== 7) {
            divRm.addEventListener("click", function (e) {
                var i = this.id.charAt(this.id.length - 1);
                document.getElementById("GProutePoint" + i).className = "GPflexInput GProuteStageFlexInputHidden";
                document.getElementById("GProuteOrigin" + i).value = "";
                document.getElementById("GProuteOrigin" + i).className = "GPelementVisible gpf-visible";
                document.getElementById("GProuteOriginCoords" + i).value = "";
                document.getElementById("GProuteOriginCoords" + i).className = "GPelementHidden gpf-hidden";
                document.getElementById("GProuteStageAdd").style.display = "";
                // Moving up exclusions picto
                // var exclusionsPictoTop = document.getElementById("GPshowRouteExclusionsPicto").style.top;
                // document.getElementById("GPshowRouteExclusionsPicto").style.top = (parseInt(exclusionsPictoTop, 10) - 33).toString() + "px";
                // gestionnaire d'evenement :
                // on supprime le point, utilisé pour la requête sur le service d'itiniraire
                context.onRouteRemovePointClick(e);
            });
        }
        return divRm;
    },

    /**
     * Create Add Point tag
     * see event !
     * OVERWRITTEN BY LOCATIONSELECTOR !
     * (version initial without LOCATIONSELECTOR PLUGIN)
     *
     * @returns {DOMElement} DOM element
     */
    _createRoutePanelFormAddStageElement : function () {
        // contexte d'execution
        var context = this;

        var divAdd = document.createElement("div");
        divAdd.id = "GProuteStageAdd";
        divAdd.title = "Ajouter une étape";
        divAdd.addEventListener("click", function (e) {
            var lastStage = 1;
            var nbStages = 0;
            for (var i = 2; i < 7; i++) {
                if (document.getElementById("GProutePoint" + i).className === "GPflexInput GProuteStageFlexInputHidden") {
                    if (lastStage === 1) {
                        lastStage = i;
                    }
                } else {
                    nbStages++;
                }
            }
            if (lastStage < 7) {
                document.getElementById("GProutePoint" + lastStage).className = "GPflexInput GProuteStageFlexInput";
                // Moving down exclusions picto
                // var exclusionsPictoTop = document.getElementById("GPshowRouteExclusionsPicto").style.top;
                // document.getElementById("GPshowRouteExclusionsPicto").style.top = (parseInt(exclusionsPictoTop, 10) + 33).toString() + "px";
            }
            if (nbStages === 4) {
                document.getElementById("GProuteStageAdd").style.display = "none";
            }
            // gestionnaire d'evenement :
            // on ajoute le point, utilisé pour la requête sur le service d'itiniraire
            context.onRouteAddPointClick(e);
        });

        return divAdd;
    },

    /**
     * Create Results autocompletion to the point
     * see event!
     * OVERWRITTEN BY LOCATIONSELECTOR !
     * (version initial without LOCATIONSELECTOR PLUGIN)
     * @param {Integer} n - n
     *
     * @returns {DOMElement} DOM element
     */
    _createRoutePanelFormAutoCompleteListElement : function (n) {
        // contexte d'execution
        var context = this;

        var div = document.createElement("div");
        div.id = "GProuteAutoCompleteList" + n;
        div.className = "GPadvancedAutoCompleteList";

        if (div.addEventListener) {
            div.addEventListener("click", function (e) {
                context.onAutoCompletedResultsItemClick(e);
                document.getElementById("GProuteAutoCompleteList" + n).style.display = "none";
            }, false);
        } else if (div.attachEvent) {
            div.attachEvent("onclick", function (e) {
                context.onAutoCompletedResultsItemClick(e);
                document.getElementById("GProuteAutoCompleteList" + n).style.display = "none";
            });
        }

        // Proposals are dynamically filled in Javascript by autocomplete service
        // <div class="GPautoCompleteProposal">...</div>

        return div;
    },

    /**
     * Autocompletion result to a point.
     * Proposals are dynamically filled in Javascript by autocomplete service
     * OVERWRITTEN BY LOCATIONSELECTOR !
     * (version initial without LOCATIONSELECTOR PLUGIN)
     *
     *
     * @param {Object} location - suggested location results
     * @param {Number} n  - number of the point
     * @param {Number} id - ID
     */
    _createRouteAutoCompletedLocationElement : function (location, n, id) {
        var container = document.getElementById("GProuteAutoCompleteList" + n);

        var div = document.createElement("div");
        div.id = "AutoCompletedLocation" + id;
        div.className = "GPautoCompleteProposal";
        div.innerHTML = GeocodeUtils.getSuggestedLocationFreeform(location);

        container.appendChild(div);
    },

    // ################################################################### //
    // ############## Methods to the choice mode into form ############### //
    // ################################################################### //

    /**
     * Create Mode choice transport
     * see event !
     * FIXME event not useful
     * @param {String[]} transports - transports
     *
     * @returns {DOMElement} DOM element
     */
    _createRoutePanelFormModeChoiceTransportElement : function (transports) {
        // contexte d'execution
        var context = this;

        var divContainer = document.createElement("div");
        divContainer.id = this._addUID("GProuteTransportChoice");

        var label = document.createElement("label");
        label.className = "GProuteModeLabel gpf-label fr-label";
        label.innerHTML = "Choisir un mode de déplacement";
        divContainer.appendChild(label);

        var divRadio = document.createElement("div");
        divRadio.className = "gpf-radio-btn-group";
        /* jshint -W083 */
        for (var i = 0; i < transports.length; i++) {
            var transport = transports[i];

            var div = document.createElement("div");
            div.className = "GProuteTransportChoice gpf-flex gpf-radio-group fr-radio-group fr-my-1w";

            if (transport === "Voiture") {
                var inputCar = document.createElement("input");
                inputCar.id = this._addUID("GProuteTransportCar");
                inputCar.type = "radio";
                inputCar.name = "GProuteTransport";
                inputCar.value = "Voiture";
                if (i === 0) {
                    inputCar.checked = true;
                }
                // gestionnaire d'evenement :
                // on stocke le mode de transport,
                // utilisation pour la requête sur le service de calcul d'itiniraire
                if (inputCar.addEventListener) {
                    inputCar.addEventListener("change", function (e) {
                        context.onRouteModeTransportChange(e);
                    });
                } else if (inputCar.attachEvent) {
                    inputCar.attachEvent("onchange", function (e) {
                        context.onRouteModeTransportChange(e);
                    });
                }
                div.appendChild(inputCar);

                var labelCar = document.createElement("label");
                labelCar.className = "GProuteTransportImg gpf-label fr-label";
                labelCar.htmlFor = this._addUID("GProuteTransportCar");
                labelCar.title = "Voiture";
                labelCar.innerHTML = "Voiture";
                div.appendChild(labelCar);
            }

            if (transport === "Pieton") {
                var inputPedestrian = document.createElement("input");
                inputPedestrian.id = this._addUID("GProuteTransportPedestrian");
                inputPedestrian.type = "radio";
                inputPedestrian.name = "GProuteTransport";
                inputPedestrian.value = "Pieton";
                if (i === 0) {
                    inputPedestrian.checked = true;
                }
                // gestionnaire d'evenement :
                // on stocke le mode de transport,
                // utilisation pour la requête sur le service de calcul d'itiniraire
                if (inputPedestrian.addEventListener) {
                    inputPedestrian.addEventListener("change", function (e) {
                        context.onRouteModeTransportChange(e);
                    });
                } else if (inputPedestrian.attachEvent) {
                    inputPedestrian.attachEvent("onchange", function (e) {
                        context.onRouteModeTransportChange(e);
                    });
                }
                div.appendChild(inputPedestrian);

                var labelPedestrian = document.createElement("label");
                labelPedestrian.className = "GProuteTransportImg gpf-label fr-label";
                labelPedestrian.htmlFor = this._addUID("GProuteTransportPedestrian");
                labelPedestrian.title = "Piéton";
                labelPedestrian.innerHTML = "Piéton";
                div.appendChild(labelPedestrian);
            }

            divRadio.appendChild(div);
        }
        divContainer.appendChild(divRadio);

        return divContainer;
    },

    /**
     * Create Mode choice computation
     * see event!
     *
     * @returns {DOMElement} DOM element
     */
    _createRoutePanelFormModeChoiceComputeElement : function () {
        // contexte d'execution
        var context = this;

        var divContainer = document.createElement("div");
        divContainer.id = this._addUID("GProuteComputationChoice");
        divContainer.className = "fr-mt-2w";

        var label = document.createElement("label");
        label.className = "GProuteComputationLabel gpf-label fr-label";
        label.innerHTML = "Mode de calcul";
        divContainer.appendChild(label);

        var divRadio = document.createElement("div");
        divRadio.className = "gpf-radio-btn-group";

        var div = document.createElement("div");
        div.className = "GProuteComputationChoice gpf-flex gpf-radio-group fr-radio-group fr-my-1w";
        var inputFastest = document.createElement("input");
        inputFastest.id = this._addUID("GProuteComputationFastest");
        inputFastest.type = "radio";
        inputFastest.name = "GProuteComputation";
        inputFastest.value = "fastest";
        inputFastest.checked = true;
        // gestionnaire d'evenement :
        // on stocke le mode de transport,
        // utilisation pour la requête sur le service de calcul d'itiniraire
        if (inputFastest.addEventListener) {
            inputFastest.addEventListener("change", function (e) {
                context.onRouteModeComputationChange(e);
            });
        } else if (inputFastest.attachEvent) {
            inputFastest.attachEvent("onchange", function (e) {
                context.onRouteModeComputationChange(e);
            });
        }
        div.appendChild(inputFastest);

        var labelFastest = document.createElement("label");
        labelFastest.className = "gpf-label fr-label";
        labelFastest.htmlFor = this._addUID("GProuteComputationFastest");
        labelFastest.title = "Plus rapide";
        labelFastest.innerHTML = "Plus rapide";
        div.appendChild(labelFastest);
        divRadio.appendChild(div);

        var div2 = document.createElement("div");
        div2.className = "GProuteComputationChoice gpf-flex gpf-radio-group fr-radio-group fr-my-1w";
        var inputShortest = document.createElement("input");
        inputShortest.id = this._addUID("GProuteComputationShortest");
        inputShortest.type = "radio";
        inputShortest.name = "GProuteComputation";
        inputShortest.value = "shortest";
        // gestionnaire d'evenement :
        // on stocke le mode de transport,
        // utilisation pour la requête sur le service de calcul d'itiniraire
        if (inputShortest.addEventListener) {
            inputShortest.addEventListener("change", function (e) {
                context.onRouteModeComputationChange(e);
            });
        } else if (inputShortest.attachEvent) {
            inputShortest.attachEvent("onchange", function (e) {
                context.onRouteModeComputationChange(e);
            });
        }
        div2.appendChild(inputShortest);

        var labelShortest = document.createElement("label");
        labelShortest.className = "gpf-label fr-label";
        labelShortest.htmlFor = this._addUID("GProuteComputationShortest");
        labelShortest.title = "Plus court";
        labelShortest.innerHTML = "Plus court";
        div2.appendChild(labelShortest);

        divRadio.appendChild(div2);
        divContainer.appendChild(divRadio);

        return divContainer;
    },

    // ################################################################### //
    // ################# Methods to the choice exclusions ################ //
    // ################################################################### //

    /**
     * Label to Exclusions Options
     * see event !
     * FIXME event not useful
     *
     * @returns {DOMElement} DOM element
     */
    _createShowRouteExclusionsPictoElement : function () {
        // contexte d'execution
        var context = this;

        var button = document.createElement("button");
        button.id = this._addUID("GPshowRouteExclusionsPicto");
        var hidden = "";
        if (checkDsfr()) {
            hidden = "GPelementHidden gpf-hidden";
        }
        button.className = `GPshowAdvancedToolPicto GPshowMoreOptionsImage GPshowMoreOptions GPshowRouteExclusionsPicto ${hidden} gpf-btn fr-btn--sm fr-btn--tertiary gpf-btn--tertiary fr-icon-arrow-down-fill`;
        button.title = "Exclusions";
        // button.style.top = "185px";
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", true);

        // gestionnaire d'evenement :
        // on ouvre le menu des options des exclusions
        if (button.addEventListener) {
            button.addEventListener("click", function (e) {
                e.preventDefault();
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                context.onShowRouteExclusionsClick(e);
            });
        } else if (button.attachEvent) {
            button.attachEvent("onclick", function (e) {
                e.preventDefault();
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                context.onShowRouteExclusionsClick(e);
            });
        }

        return button;
    },

    /**
     * Create Container to Exclusions
     *
     * @returns {DOMElement} DOM element
     */
    _createRoutePanelFormExclusionsElement : function () {
        var div = document.createElement("div");
        div.id = this._addUID("GProuteExclusions");
        div.className = "fr-mt-2w";

        var label = document.createElement("label");
        label.className = "GProuteExclusionsLabel fr-label";
        label.innerHTML = "Passages autorisés";
        div.appendChild(label);

        // div.appendChild(this._createRoutePanelFormExclusionOptionsElement());

        return div;
    },

    /**
     * Create Exclusions Options
     * see event !
     * FIXME event not useful
     * @param {Object[]} exclusions - exclusions
     *
     * @returns {DOMElement} DOM element
     */
    _createRoutePanelFormExclusionOptionsElement : function (exclusions) {
        // contexte d'execution
        var context = this;

        var div = document.createElement("div");
        div.className = "GProuteExclusionsOptions gpf-flex fr-checkbox-group fr-m-1w";

        /* jshint -W083 */
        for (var value in exclusions) {
            if (exclusions.hasOwnProperty(value)) {
                var status = exclusions[value];
                switch (value) {
                    case "toll":
                        var inputToll = document.createElement("input");
                        inputToll.id = this._addUID("GProuteExclusionsToll");
                        inputToll.type = "checkbox";
                        inputToll.value = "Toll";
                        inputToll.name = "Peage";
                        inputToll.checked = !status;
                        // gestionnaire d'evenement :
                        // on stocke l'exclusion,
                        // utilisation pour la requête sur le service de calcul d'itiniraire
                        if (inputToll.addEventListener) {
                            inputToll.addEventListener("change", function (e) {
                                context.onRouteExclusionsChange(e);
                            });
                        } else if (inputToll.attachEvent) {
                            inputToll.attachEvent("onchange", function (e) {
                                context.onRouteExclusionsChange(e);
                            });
                        }
                        div.appendChild(inputToll);

                        var labelToll = document.createElement("label");
                        labelToll.className = "GProuteExclusionsOption";
                        labelToll.htmlFor = this._addUID("GProuteExclusionsToll");
                        labelToll.innerHTML = "Péages";
                        div.appendChild(labelToll);
                        break;

                    case "tunnel":
                        var inputTunnel = document.createElement("input");
                        inputTunnel.id = this._addUID("GProuteExclusionsTunnel");
                        inputTunnel.type = "checkbox";
                        inputTunnel.value = "Tunnel";
                        inputTunnel.name = "Tunnel";
                        inputTunnel.checked = !status;
                        // gestionnaire d'evenement :
                        // on stocke l'exclusion,
                        // utilisation pour la requête sur le service de calcul d'itiniraire
                        if (inputTunnel.addEventListener) {
                            inputTunnel.addEventListener("change", function (e) {
                                context.onRouteExclusionsChange(e);
                            });
                        } else if (inputTunnel.attachEvent) {
                            inputTunnel.attachEvent("onchange", function (e) {
                                context.onRouteExclusionsChange(e);
                            });
                        }
                        div.appendChild(inputTunnel);

                        var labelTunnel = document.createElement("label");
                        labelTunnel.className = "GProuteExclusionsOption";
                        labelTunnel.htmlFor = this._addUID("GProuteExclusionsTunnel");
                        labelTunnel.innerHTML = "Tunnels";
                        div.appendChild(labelTunnel);
                        break;

                    case "bridge":
                        var inputBridge = document.createElement("input");
                        inputBridge.id = this._addUID("GProuteExclusionsBridge");
                        inputBridge.type = "checkbox";
                        inputBridge.value = "Bridge";
                        inputBridge.name = "Ponts";
                        inputBridge.checked = !status;
                        // gestionnaire d'evenement :
                        // on stocke l'exclusion,
                        // utilisation pour la requête sur le service de calcul d'itiniraire
                        if (inputBridge.addEventListener) {
                            inputBridge.addEventListener("change", function (e) {
                                context.onRouteExclusionsChange(e);
                            });
                        } else if (inputBridge.attachEvent) {
                            inputBridge.attachEvent("onchange", function (e) {
                                context.onRouteExclusionsChange(e);
                            });
                        }
                        div.appendChild(inputBridge);

                        var labelBridge = document.createElement("label");
                        labelBridge.className = "GProuteExclusionsOption";
                        labelBridge.htmlFor = this._addUID("GProuteExclusionsBridge");
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
    _createRouteSubmitFormElement : function () {
        var input = document.createElement("input");
        input.id = this._addUID("GProuteSubmit");
        input.className = "GPsubmit gpf-btn gpf-btn-icon-submit fr-btn";
        input.type = "submit";
        input.value = "Calculer l'itinéraire";

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
    _createRouteFormResetElement : function () {
        var self = this;

        var buttonReset = document.createElement("button");
        buttonReset.id = this._addUID("GProuteReset");
        buttonReset.title = "Réinitialiser les paramètres";
        buttonReset.className = "GPresetPicto gpf-btn gpf-btn-icon-reset fr-btn fr-btn--secondary gpf-btn--secondary";
        buttonReset.title = "Réinitialiser les paramètres";
        buttonReset.setAttribute("tabindex", "0");
        buttonReset.setAttribute("aria-pressed", false);
        buttonReset.addEventListener("click", function (e) {
            var status = (e.target.ariaPressed === "true");
            e.target.setAttribute("aria-pressed", !status);
            self.onRouteResetClick(e);
        });

        return buttonReset;
    }
};

export default RouteDOM;
