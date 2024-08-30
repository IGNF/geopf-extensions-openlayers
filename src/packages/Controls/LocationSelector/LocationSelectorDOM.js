import ID from "../../Utils/SelectorID";
import Logger from "../../Utils/LoggerByDefault";
import GeocodeUtils from "../../Utils/GeocodeUtils";
import checkDsfr from "../Utils/CheckDsfr";

var logger = Logger.getLogger("LocationSelectorDOM");

var LocationSelectorDOM = {

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
     * @returns {DOMElement} DOM element
     */
    _createMainContainerElement : function () {
        var container = document.createElement("div");
        container.className = this._addUID("GPlocationPoint"); // ceci permet de gerer les groupes de points !
        container.className += " GPwidget gpf-widget ";
        return container;
    },

    /**
     * Create Container Point
     * see event !
     *
     * @param {Number} id - tag ID
     * @param {Number} display  - display
     * @returns {DOMElement} DOM element
     */
    _createLocationPointElement : function (id, display) {
        var div = document.createElement("div");
        div.id = this._addUID("GPlocationPoint_" + id);
        div.className = (display) ? "GPflexInput GPlocationStageFlexInput gpf-flex" : "GPflexInput GPelementHidden gpf-flex gpf-hidden";
        div.style.cssText = "";

        return div;
    },

    /**
     * Create Container Point
     * see event !
     *
     * @param {Number} id - tag ID
     * @param {String} text - label
     * @returns {DOMElement} DOM element
     */
    _createLocationPointLabelElement : function (id, text) {
        // contexte d'execution
        var self = this;

        var buttonOrigin = document.createElement("button");
        buttonOrigin.id = this._addUID("GPlocationOriginLabel_" + id);
        buttonOrigin.innerHTML = text;
        buttonOrigin.className = "GPlocationOriginLabel gpf-btn gpf-btn-icon-label fr-btn fr-btn--secondary gpf-btn--secondary";
        buttonOrigin.setAttribute("type", "button");
        buttonOrigin.addEventListener("click", function (e) {
            var i = ID.index(this.id);
            var points = document.getElementsByClassName(self._addUID("GPlocationPoint"));
            for (var j = 0; j < points.length; j++) {
                var tag = points[j].childNodes[0].id;
                var id = ID.index(tag);
                document.getElementById(self._addUID("GPlocationPoint_" + id)).style.cssText = "";
            }
            document.getElementById(self._addUID("GPlocationOriginCoords_" + i)).value = "";
            document.getElementById(self._addUID("GPlocationOrigin_" + i)).value = "";
            document.getElementById(self._addUID("GPlocationPoint_" + i)).style.cssText = "";
            document.getElementById(self._addUID("GPlocationOriginPointer_" + i)).checked = false;
            document.getElementById(self._addUID("GPlocationOrigin_" + i)).className = "GPelementShow gpf-show  gpf-input fr-input";
            document.getElementById(self._addUID("GPlocationOriginCoords_" + i)).className = "GPelementHidden gpf-hidden";
            if (document.getElementById(self._addUID("GPlocationStageRemove_" + i))) {
                document.getElementById(self._addUID("GPlocationStageRemove_" + i)).className = "GPlocationStageRemove gpf-btn gpf-btn-icon-remove fr-btn--sm fr-btn--secondary gpf-btn--secondary";
            }
            if (document.getElementById(self._addUID("GPlocationStageAdd"))) {
                document.getElementById(self._addUID("GPlocationStageAdd")).className = "GPlocationStageAdd gpf-btn gpf-btn-icon-add fr-btn--sm fr-btn--secondary gpf-btn--secondary fr-mt-2w";
            }
            // document.getElementById(self._addUID("GPlocationOriginCoords_" + i)).disabled = true;
            self.onLocationClearPointClick(e);
        });

        return buttonOrigin;
    },

    /**
     * Create Input AutoComplete Point tag
     *
     * @param {Number} id - tag ID
     * @returns {DOMElement} DOM element
     */
    _createLocationAutoCompleteteInputElement : function (id) {
        // contexte d'execution
        var self = this;

        var inputOrigin = document.createElement("input");
        inputOrigin.id = this._addUID("GPlocationOrigin_" + id);
        inputOrigin.className = "GPelementShow gpf-show gpf-input fr-input";
        inputOrigin.type = "text";
        inputOrigin.placeholder = "Saisir une adresse, un lieu...";
        inputOrigin.autocomplete = "off";
        inputOrigin.addEventListener("keyup", function (e) {
            var charCode = e.which || e.keyCode;
            if (charCode === 13 || charCode === 10 || charCode === 38 || charCode === 40) {
                return;
            }

            var i = ID.index(this.id);
            if (document.getElementById(self._addUID("GPlocationOrigin_" + i)).value.length > 2) {
                document.getElementById(self._addUID("GPlocationAutoCompleteList_" + i)).classList.replace("GPelementHidden", "GPelementVisible");
                document.getElementById(self._addUID("GPlocationAutoCompleteList_" + i)).classList.replace("gpf-hidden", "gpf-visible");
            } else {
                document.getElementById(self._addUID("GPlocationAutoCompleteList_" + i)).classList.replace("GPelementVisible", "GPelementHidden");
                document.getElementById(self._addUID("GPlocationAutoCompleteList_" + i)).classList.replace("gpf-visible", "gpf-hidden");
            }
            // gestionnaire d'evenement :
            // on récupère la valeur de saisie pour une requête sur le service d'autocompletion.
            // le resultat de la requête nous permet de recuperer les coordonnées du point...
            self.onAutoCompleteSearchText(e);
        });

        inputOrigin.addEventListener("keydown", function (e) {
            var charCode = e.which || e.keyCode;

            var container = document.getElementById(self._addUID("GPlocationAutoCompleteResult_" + id));

            // si aucun container !?
            if (!container) {
                return;
            }

            var curr = container.getElementsByClassName("GPautoCompleteProposal current");
            var list = container.getElementsByClassName("GPautoCompleteProposal");

            // si aucune suggestion, on ne va pas plus loin !
            var length = list.length;
            if (!length) {
                return;
            }

            var current = null;

            // si aucun item courant, on prend le 1er !
            if (!curr.length) {
                current = list[0];
                current.className = "GPautoCompleteProposal current";
                current.style.color = "#000000";
                current.style["background-color"] = "#CEDBEF";
                return;
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
                    logger.log("arrow up");
                    current.className = "GPautoCompleteProposal";
                    prev.className = "GPautoCompleteProposal current";
                    prev.style.color = "#000000";
                    prev.style["background-color"] = "#CEDBEF";
                    break;
                case 40: // arrow down
                    logger.log("arrow down");
                    current.className = "GPautoCompleteProposal";
                    next.className = "GPautoCompleteProposal current";
                    next.style.color = "#000000";
                    next.style["background-color"] = "#CEDBEF";
                    break;
                case 13: // enter
                    logger.log("enter");
                    current.click(e);
                    break;
            }

            current.focus();
        });

        return inputOrigin;
    },

    /**
     * Create Input Coordinate Point tag
     *
     * @param {Number} id - tag ID
     * @returns {DOMElement} DOM element
     */
    _createLocationCoordinateInputElement : function (id) {
        // contexte d'execution
        var self = this;

        var inputOriginCoord = document.createElement("input");
        inputOriginCoord.id = this._addUID("GPlocationOriginCoords_" + id);
        inputOriginCoord.className = "GPelementHidden gpf-input gpf-hidden fr-input";
        inputOriginCoord.type = "text";
        inputOriginCoord.disabled = false;
        inputOriginCoord.addEventListener("click", function () {
            var i = ID.index(this.id);
            document.getElementById(self._addUID("GPlocationOriginLabel_" + i)).click();
        });
        return inputOriginCoord;
    },

    /**
     * Create Show Pointer tag
     *
     * @param {Number} id - tag ID
     * @returns {DOMElement} DOM element
     */
    _createLocationPointerShowInputElement : function (id) {
        var inputOriginPointer = document.createElement("input");
        inputOriginPointer.id = this._addUID("GPlocationOriginPointer_" + id);
        inputOriginPointer.className = "GPelementHidden gpf-hidden";
        inputOriginPointer.type = "checkbox";

        return inputOriginPointer;
    },

    /**
     * Create Input Pointer tag
     *
     * @param {Number} id - tag ID
     * @returns {DOMElement} DOM element
     */
    _createLocationPointerInputElement : function (id) {
        // contexte d'execution
        var self = this;

        var buttonOriginPointer = document.createElement("button");
        buttonOriginPointer.id = this._addUID("GPlocationOriginPointerImg_" + id);
        buttonOriginPointer.htmlFor = this._addUID("GPlocationOriginPointer_" + id);
        buttonOriginPointer.className = "GPlocationOriginPointerImg gpf-btn gpf-btn-icon-pointer fr-btn";
        buttonOriginPointer.title = "Pointer un lieu sur la carte";
        buttonOriginPointer.setAttribute("type", "button");
        buttonOriginPointer.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            var i = ID.index(this.id);
            var points = document.getElementsByClassName(self._addUID("GPlocationPoint"));
            var j;
            var tag;
            var id;
            for (j = 0; j < points.length; j++) {
                tag = points[j].childNodes[0].id;
                id = ID.index(tag);
                if (i !== id) {
                    document.getElementById(self._addUID("GPlocationOriginPointer_" + id)).checked = false;
                    if (document.getElementById(self._addUID("GPlocationOriginCoords_" + id)).value === "Pointer un lieu sur la carte") {
                        document.getElementById(self._addUID("GPlocationOriginCoords_" + id)).value = "";
                        document.getElementById(self._addUID("GPlocationOrigin_" + id)).className = "GPelementShow gpf-show  gpf-input fr-input";
                        document.getElementById(self._addUID("GPlocationOriginCoords_" + id)).className = "GPelementHidden gpf-hidden";
                    }
                }
            }
            if (document.getElementById(self._addUID("GPlocationOriginPointer_" + i)).checked) {
                document.getElementById(self._addUID("GPlocationOriginCoords_" + i)).value = "";
                for (j = 0; j < points.length; j++) {
                    tag = points[j].childNodes[0].id;
                    id = ID.index(tag);
                    document.getElementById(self._addUID("GPlocationPoint_" + id)).style.cssText = "";
                }
                if (document.getElementById(self._addUID("GPlocationStageRemove_" + i))) {
                    document.getElementById(self._addUID("GPlocationStageRemove_" + i)).className = "GPlocationStageRemove  gpf-btn gpf-btn-icon-remove fr-btn--sm fr-btn--secondary gpf-btn--secondary";
                }
                if (document.getElementById(self._addUID("GPlocationStageAdd"))) {
                    document.getElementById(self._addUID("GPlocationStageAdd")).className = "GPlocationStageAdd gpf-btn gpf-btn-icon-add fr-btn--sm fr-btn--secondary gpf-btn--secondary fr-mt-2w";
                }
                document.getElementById(self._addUID("GPlocationOriginPointer_" + i)).checked = false;
                document.getElementById(self._addUID("GPlocationOrigin_" + i)).className = "GPelementShow gpf-show  gpf-input fr-input";
                document.getElementById(self._addUID("GPlocationOriginCoords_" + i)).className = "GPelementHidden gpf-hidden";
            } else {
                document.getElementById(self._addUID("GPlocationOriginCoords_" + i)).value = "Pointer un lieu sur la carte";
                for (j = 0; j < points.length; j++) {
                    tag = points[j].childNodes[0].id;
                    id = ID.index(tag);
                    if (i === id) {
                        document.getElementById(self._addUID("GPlocationPoint_" + id)).style.cssText = "";
                    } else {
                        document.getElementById(self._addUID("GPlocationPoint_" + id)).style.display = "none";
                    }
                }
                if (document.getElementById(self._addUID("GPlocationStageRemove_" + i))) {
                    document.getElementById(self._addUID("GPlocationStageRemove_" + i)).className = "GPelementHidden gpf-hidden";
                }
                if (document.getElementById(self._addUID("GPlocationStageAdd"))) {
                    document.getElementById(self._addUID("GPlocationStageAdd")).className = "GPelementHidden gpf-hidden";
                }
                document.getElementById(self._addUID("GPlocationOriginPointer_" + i)).checked = true;
                document.getElementById(self._addUID("GPlocationOrigin_" + i)).className = "GPelementHidden gpf-hidden";
                document.getElementById(self._addUID("GPlocationOriginCoords_" + i)).className = "GPelementShow gpf-show gpf-input fr-input";
                document.getElementById(self._addUID("GPlocationOriginCoords_" + i)).disabled = true;
            }
            // gestionnaire d'evenement :
            // on stocke la valeur du point, utilisée pour la requête sur le service de calcul d'itiniraire
            self.onActivateMapPointClick(e);
        });

        return buttonOriginPointer;
    },

    /**
     * Create Remove Point tag
     * see event !
     *
     * @param {Number} id - tag ID
     * @returns {DOMElement} DOM element
     */
    _createLocationRemovePointElement : function (id) {
        // contexte d'execution
        var self = this;

        var buttonRm = document.createElement("button");
        buttonRm.id = this._addUID("GPlocationStageRemove_" + id);
        buttonRm.className = "GPlocationOpen GPlocationStageRemove gpf-btn gpf-btn-icon-remove fr-btn--sm fr-btn--secondary gpf-btn--secondary";
        buttonRm.title = "Supprimer l'étape";
        buttonRm.setAttribute("tabindex", "0");
        buttonRm.setAttribute("aria-pressed", false);
        buttonRm.setAttribute("type", "button");
        buttonRm.addEventListener("click", function (e) {
            var status = (e.target.ariaPressed === "true");
            e.target.setAttribute("aria-pressed", !status);
            var points = document.getElementsByClassName(self._addUID("GPlocationPoint"));
            var last = points.length - 1;
            var start = points[0].childNodes[0].id;
            var end = points[last].childNodes[0].id;

            var startID = ID.index(start);
            var endID = ID.index(end);

            if (id !== startID && id !== endID) {
                var i = ID.index(this.id);
                document.getElementById(self._addUID("GPlocationPoint_" + i)).className = "GPflexInput GPelementHidden gpf-flex gpf-hidden";
                document.getElementById(self._addUID("GPlocationOrigin_" + i)).value = "";
                document.getElementById(self._addUID("GPlocationOrigin_" + i)).className = "GPelementShow gpf-show gpf-input fr-input";
                document.getElementById(self._addUID("GPlocationOriginCoords_" + i)).value = "";
                document.getElementById(self._addUID("GPlocationOriginCoords_" + i)).className = "GPelementHidden gpf-hidden";
                document.getElementById(self._addUID("GPlocationStageAdd")).style.display = "";
                document.getElementById(self._addUID("GPlocationPoint_" + i)).parentElement.previousSibling.classList.add("GPelementHidden", "gpf-hidden");
                // Moving up exclusions picto
                // var exclusionsPictoTop = document.getElementById(self._addUID("GPshowLocationExclusionsPicto")).style.top;
                // document.getElementById(self._addUID("GPshowLocationExclusionsPicto")).style.top = (parseInt(exclusionsPictoTop) - 33).toString() + "px";

                // gestionnaire d'evenement :
                // on supprime le point, utilisé pour la requête sur le service d'itiniraire
                self.onLocationRemovePointClick(e);
            }
        });

        return buttonRm;
    },

    /**
     * Create Add Point tag
     * see event !
     *
     * @returns {DOMElement} DOM element
     */
    _createLocationAddPointElement : function () {
        // contexte d'execution
        var self = this;

        var buttonAdd = document.createElement("button");
        buttonAdd.id = this._addUID("GPlocationStageAdd");
        buttonAdd.className = "GPlocationOpen GPlocationStageAdd gpf-btn gpf-btn-icon-add fr-btn--sm fr-btn--secondary gpf-btn--secondary fr-mt-2w";
        buttonAdd.title = "Ajouter une étape";
        if (checkDsfr()) {
            buttonAdd.innerText = "Ajouter une étape";
        }
        buttonAdd.setAttribute("tabindex", "0");
        buttonAdd.setAttribute("aria-pressed", false);
        buttonAdd.setAttribute("type", "button");
        buttonAdd.addEventListener("click", function (e) {
            var lastStage = 1;
            var nbStages = 0;
            var points = document.getElementsByClassName(self._addUID("GPlocationPoint"));
            for (var i = 1; i < points.length - 1; i++) {
                var tag = points[i].childNodes[0].id;
                var id = ID.index(tag);
                if (document.getElementById(self._addUID("GPlocationPoint_" + id))) {
                    if (document.getElementById(self._addUID("GPlocationPoint_" + id)).className === "GPflexInput GPelementHidden gpf-flex gpf-hidden") {
                        if (lastStage === 1) {
                            lastStage = id;
                        }
                    } else {
                        nbStages++;
                    }
                }
            }
            // FIXME algo à revoir : lastStage = id hors si id = 300 sur 3 points !?
            if (lastStage < points.length) {
                document.getElementById(self._addUID("GPlocationPoint_" + lastStage)).className = "GPflexInput GPlocationStageFlexInput gpf-flex";
                document.getElementById(self._addUID("GPlocationPoint_" + lastStage)).parentElement.previousSibling.classList.remove("GPelementHidden", "gpf-hidden");
                // Moving down exclusions picto
                // var exclusionsPictoTop = document.getElementById(self._addUID("GPshowLocationExclusionsPicto")).style.top;
                // document.getElementById(self._addUID("GPshowLocationExclusionsPicto")).style.top = (parseInt(exclusionsPictoTop) + 33).toString() + "px";
            }
            if (nbStages === 4) {
                document.getElementById(self._addUID("GPlocationStageAdd")).style.display = "none";
            }
            // gestionnaire d'evenement :
            // on ajoute le point, utilisé pour la requête sur le service d'itiniraire
            var status = (e.target.ariaPressed === "true");
            e.target.setAttribute("aria-pressed", !status);
            self.onLocationAddPointClick(e);
        });

        return buttonAdd;
    },

    _createLocationAutoCompleteElement : function (id) {
        var div = document.createElement("div");
        div.id = this._addUID("GPlocationAutoCompleteList_" + id);
        div.className = "GPlocationAutoCompleteList GPelementHidden gpf-panel gpf-hidden fr-modal"; // GPpanel ?

        // FIXME on decompose la fonction pour les besoins du controle,
        // on ajoutera ces childs à la main...
        // div.appendChild(this._createLocationAutoCompleteResultElement ());

        return div;
    },

    /**
     * Create Results autocompletion to the point
     * see event!
     *
     * @param {Number} id - tag ID
     * @returns {DOMElement} DOM element
     */
    _createLocationAutoCompleteResultElement : function (id) {
        // contexte d'execution
        var self = this;

        var div = document.createElement("div");
        div.id = this._addUID("GPlocationAutoCompleteResult_" + id);
        div.className = "GPadvancedAutoCompleteResult gpf-panel__list";

        if (div.addEventListener) {
            div.addEventListener("click", function (e) {
                self.onAutoCompletedResultsItemClick(e);
                document.getElementById(self._addUID("GPlocationAutoCompleteList_" + id)).classList.replace("GPelementHidden", "GPelementVisible");
                document.getElementById(self._addUID("GPlocationAutoCompleteList_" + id)).classList.replace("gpf-hidden", "gpf-visible");
            }, false);
        } else if (div.attachEvent) {
            div.attachEvent("onclick", function (e) {
                self.onAutoCompletedResultsItemClick(e);
                document.getElementById(self._addUID("GPlocationAutoCompleteList_" + id)).classList.replace("GPelementHidden", "GPelementVisible");
                document.getElementById(self._addUID("GPlocationAutoCompleteList_" + id)).classList.replace("gpf-hidden", "gpf-visible");
            });
        }

        return div;
    },

    /**
     * Autocompletion result to a point.
     * Proposals are dynamically filled in Javascript by autocomplete service
     *
     * TODO formaliser le contenu des reponse
     *
     * @param {Number} id - tag ID
     * @param {Object} location - suggested location result
     * @param {Number} n  - number of the point
     */
    _createLocationAutoCompletedLocationElement : function (id, location, n) {
        var container = document.getElementById(this._addUID("GPlocationAutoCompleteResult_" + id));

        var div = document.createElement("div");
        div.id = this._addUID("AutoCompletedLocation_" + n);
        div.className = "GPautoCompleteProposal gpf-panel__items";
        div.innerHTML = GeocodeUtils.getSuggestedLocationFreeform(location);

        container.appendChild(div);
    },

    /**
    * Display Coordinate
    * @param {String} value - a Coordinate
    */
    GPdisplayCoordinate : function (value) {
        var points = document.getElementsByClassName(this._addUID("GPlocationPoint"));
        for (var i = 0; i < points.length; i++) {
            var tag = points[i].childNodes[0].id;
            var id1 = ID.index(tag);
            if (document.getElementById(this._addUID("GPlocationOriginPointer_" + id1)).checked) {
                document.getElementById(this._addUID("GPlocationOriginCoords_" + id1)).value = value;
                document.getElementById(this._addUID("GPlocationOriginCoords_" + id1)).disabled = false;
                for (var j = 0; j < points.length; j++) {
                    tag = points[j].childNodes[0].id;
                    var id2 = ID.index(tag);
                    document.getElementById(this._addUID("GPlocationPoint_" + id2)).style.cssText = "";
                    if (document.getElementById(this._addUID("GPlocationStageRemove_" + id2))) {
                        document.getElementById(this._addUID("GPlocationStageRemove_" + id2)).className = "GPlocationStageRemove gpf-btn gpf-btn-icon-remove fr-btn--sm fr-btn--secondary gpf-btn--secondary";
                    }
                }
                document.getElementById(this._addUID("GPlocationOriginPointer_" + id1)).checked = false;
                if (document.getElementById(this._addUID("GPlocationStageAdd"))) {
                    document.getElementById(this._addUID("GPlocationStageAdd")).className = "GPlocationStageAdd gpf-btn gpf-btn-icon-add fr-btn--sm";
                }
                return;
            }
        }
    }
};

export default LocationSelectorDOM;
