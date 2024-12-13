import Sortable from "sortablejs";
import checkDsfr from "../Utils/CheckDsfr";

var LayerSwitcherDOM = {

    /**
     * Creation du drag and drop
     *
     * @param {Object} elementDraggable - Element HTML (DOM) Container
     * @param {Object} context - this
     */
    _createDraggableElement : function (elementDraggable, context) {
        // FIXME retirer cette détection user-agent pour solution propre
        // option forcefallback pour réparer sortable sous Chrome 97
        // option forcefallback casse le layerswitcher du portail sous firefox
        let handleClass = ".GPlayerName";
        if (checkDsfr()) {
            handleClass = ".GPlayerDragNDrop";
        }
        if (navigator.userAgent.match(/chrome|chromium|crios/i)) {
            Sortable.create(elementDraggable, {
                handle : handleClass,
                draggable : ".draggable-layer",
                ghostClass : "GPghostLayer",
                animation : 200,
                forceFallback : true,
                // Call event function on drag and drop
                onEnd : function (e) {
                    // FIXME pas terrrible, mais il faut bien passer ce contexte...
                    context._onEndDragAndDropLayerClick(e);
                }
            });
        } else {
            Sortable.create(elementDraggable, {
                handle : handleClass,
                draggable : ".draggable-layer",
                ghostClass : "GPghostLayer",
                animation : 200,
                // Call event function on drag and drop
                onEnd : function (e) {
                    // FIXME pas terrrible, mais il faut bien passer ce contexte...
                    context._onEndDragAndDropLayerClick(e);
                }
            });
        }
    },

    // ################################################################### //
    // ######################### Main container ########################## //
    // ################################################################### //

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
     * Creation du container principal (DOM)
     *
     * @returns {DOMElement} container - layer switcher DOM element
     */
    _createMainContainerElement : function () {
        var container = document.createElement("div");
        container.id = this._addUID("GPlayerSwitcher");
        container.className = "GPwidget gpf-widget gpf-mobile-fullscreen gpf-widget-button";
        return container;
    },

    /**
     * Creation du container principal d"affichage des layers (DOM)
     *
     * @returns {DOMElement} input - element for minimizing/maximizing the layer switcher
     */
    _createMainLayersShowElement : function () {
        // <!-- Hidden checkbox for minimizing/maximizing -->
        var input = document.createElement("input");
        input.id = this._addUID("GPshowLayersList");
        input.type = "checkbox";
        return input;
    },

    /**
     * Creation du container principal des layers (DOM)
     *
     * @returns {DOMElement} container - layers list container
     */
    _createMainLayersElement : function () {
        // ajout de la liste des layers dans le container principal
        // <div id="GPlayersList" class="GPpanel">
        //   (...)
        // </div>
        var dialog = document.createElement("dialog");
        dialog.id = this._addUID("GPlayersList");
        dialog.className = "GPpanel gpf-panel fr-modal";
        return dialog;
    },

    _createMainLayersDivElement : function () {
        var div = document.createElement("div");
        div.className = "GPpanelBody gpf-panel__body_ls fr-modal__body";
        return div;
    },

    /**
     * Creation du container du picto du controle (DOM)
     *
     * @returns {DOMElement} label
     */
    _createMainPictoElement : function () {
        var self = this;

        var button = document.createElement("button");
        // INFO: Ajout d'une SPAN pour enlever des marges de 6px dans CHROMIUM (?!)
        var span = document.createElement("span");
        button.appendChild(span);
        button.id = this._addUID("GPshowLayersListPicto");
        button.className = "GPshowOpen GPshowAdvancedToolPicto GPshowLayersListPicto gpf-btn gpf-btn--tertiary gpf-btn-icon gpf-btn-icon-layerswitcher fr-btn fr-btn--tertiary";
        button.htmlFor = this._addUID("GPshowLayersList");
        button.setAttribute("aria-label", "Afficher/masquer le gestionnaire de couches");
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", false);
        button.setAttribute("type", "button");

        if (button.addEventListener) {
            button.addEventListener("click", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                document.getElementById(self._addUID("GPshowLayersList")).checked = status;
                if (document.getElementById(self._addUID("GPshowLayersList")).checked) {
                    document.getElementById(self._addUID("GPlayerInfoPanel")).classList.remove("GPlayerInfoPanelOpened", "gpf-visible");
                    document.getElementById(self._addUID("GPlayerInfoPanel")).classList.add("GPlayerInfoPanelClosed", "gpf-hidden");
                }
                self.onShowLayerSwitcherClick(e);
            });
        } else if (button.attachEvent) {
            button.attachEvent("onclick", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                if (document.getElementById(self._addUID("GPshowLayersList")).checked) {
                    document.getElementById(self._addUID("GPlayerInfoPanel")).classList.remove("GPlayerInfoPanelOpened", "gpf-visible");
                    document.getElementById(self._addUID("GPlayerInfoPanel")).classList.add("GPlayerInfoPanelClosed", "gpf-hidden");
                }
                self.onShowLayerSwitcherClick(e);
            });
        }

        return button;
    },

    _createMainCounterLayersElement : function () {
        var span = document.createElement("span");
        span.id = this._addUID("GPlayerCounter");
        span.className = "GPlayerCounter";
        span.innerHTML = "0";
        return span;
    },

    /**
     * Creation du container du panneau d"information (DOM)
     *
     * @returns {DOMElement} container
     */
    _createMainInfoElement : function () {
        // gestion du panneau d"information dans le container principal
        // <div id="GPlayerInfoPanel" class="GPlayerInfoPanelClosed">...</div>
        var divP = document.createElement("dialog");
        divP.id = this._addUID("GPlayerInfoPanel");
        divP.className = "GPpanel GPlayerInfoPanelClosed gpf-panel fr-modal";
        return divP;
    },

    _createMainInfoDivElement : function () {
        var div = document.createElement("div");
        div.className = "gpf-panel__body fr-modal__body";
        return div;
    },

    // ################################################################### //
    // ######################### Layer container ######################### //
    // ################################################################### //

    _createLayersPanelHeaderElement : function () {
        var container = document.createElement("div");
        // FIXME on n'utilise pas le dsfr !
        // container.className = "GPpanelHeader gpf-panel__header fr-modal__header";
        container.className = "GPpanelHeader gpf-panel__header_ls";
        return container;
    },
    _createLayersPanelIconElement : function () {
        var label = document.createElement("label");
        label.className = "GPpanelIcon gpf-btn-header gpf-btn-icon-layers";
        label.title = "Couches de données";
        return label;
    },
    _createLayersPanelTitleElement : function () {
        var div = document.createElement("div");
        div.className = "GPpanelTitle gpf-panel__title_ls";
        div.id = this._addUID("GPlayersHeaderTitle");
        div.innerHTML = "Couches de données";
        return div;
    },
    _createLayersPanelCloseElement : function () {
        // contexte
        var self = this;

        var btnClose = document.createElement("button");
        btnClose.id = this._addUID("GPlayersPanelClose");
        btnClose.className = "GPpanelClose GPlayersPanelClose gpf-btn gpf-btn-icon-close fr-btn--close fr-btn fr-btn--tertiary-no-outline fr-m-1w";
        btnClose.title = "Fermer le panneau";

        var span = document.createElement("span");
        span.className = "GPelementHidden gpf-visible fr-mx-1w"; // afficher en dsfr
        span.innerText = "Fermer";

        btnClose.appendChild(span);

        // Link panel close / visibility checkbox
        if (btnClose.addEventListener) {
            btnClose.addEventListener("click", function () {
                document.getElementById(self._addUID("GPshowLayersListPicto")).click();
            }, false);
        } else if (btnClose.attachEvent) {
            btnClose.attachEvent("onclick", function () {
                document.getElementById(self._addUID("GPshowLayersListPicto")).click();
            });
        }

        return btnClose;
    },

    /**
     * Creation du container du layer (DOM)
     *
     * @param {Object} obj - options de la couche à ajouter dans le layer switcher
     * @param {Object} obj.layer - couche (ol ou leaflet)
     * @param {String} obj.id - identifiant de la couche (pour ol ou leaflet)
     * @param {String} obj.title - nom de la couche à afficher dans le controle
     * @param {String} obj.description - description de la couche à afficher
     * @param {Boolean} obj.visibility - visibilité de la couche dans la carte (true or false)
     * @param {Float} obj.opacity - opacité de la couche
     *
     * @returns {DOMElement} container
     */
    _createContainerLayerElement : function (obj) {
        // exemple :
        // <div id="GPlayerSwitcher_ID_Layer1" class="GPlayerSwitcher_layer outOfRange">
        //     <!-- Basic toolbar : visibility / layer name
        //     _createBasicToolElement
        //           _createBasicToolVisibilityElement
        //           _createBasicToolNameElement
        //     -->
        //     <!-- Hidden checkbox + label for showing advanced toolbar
        //     _createAdvancedToolShowElement
        //     -->
        //     <!-- Advanced toolbar : layer info / opacity slider / opacity value / removal
        //     _createAdvancedToolElement
        //           _createAdvancedToolDeleteElement
        //           _createAdvancedToolInformationElement
        //           _createAdvancedToolOpacityElement
        //     -->
        // </div>

        // <!-- Layer entry in layer list -->
        // <!-- Every item is marked with layerID, which is defined at layer import -->
        var container = document.createElement("div");
        container.id = this._addUID("GPlayerSwitcher_ID_" + obj.id);
        container.className = "GPlayerSwitcher_layer gpf-panel__content fr-modal__content draggable-layer";

        // ajout des outils basiques (visibility / layer name)
        container.appendChild(this._createBasicToolElement(obj));

        // ajout bouton des outils avancés
        container.appendChild(this._createAdvancedToolShowElement(obj));

        // liste des outils avancés (layer info / opacity slider / opacity value / removal)
        container.appendChild(this._createAdvancedToolElement(obj));

        return container;
    },

    // ################################################################### //
    // ############################ Layer tool ########################### //
    // ################################################################### //

    /**
     * Creation du container des outils basiques du layer (DOM)
     *
     * @param {Object} obj - options de la couche à ajouter dans le layer switcher
     *
     * @returns {DOMElement} container
     */
    _createBasicToolElement : function (obj) {
        // exemple :
        // <div id="GPbasicTools_ID_1" class="GPlayerBasicTools">
        //      <!-- _createBasicToolVisibilityElement -->
        //      <!-- _createBasicToolNameElement -->
        // </div>

        var div = document.createElement("div");
        div.id = this._addUID("GPbasicTools_ID_" + obj.id);
        div.className = "GPlayerBasicTools";

        div.appendChild(this._createBasicToolNameElement(obj));
        div.appendChild(this._createBasicToolVisibilityElement(obj));
        div.appendChild(this._createBasicToolDragNDropElement(obj));

        return div;
    },

    _createBasicToolDragNDropElement : function (obj) {
        // INFO inactif en mode classique !
        var button = document.createElement("div");
        button.id = this._addUID("GPdragndropPicto_ID_" + obj.id);
        button.className = "GPelementHidden GPlayerDragNDrop gpf-btn gpf-btn-icon gpf-btn-icon-ls-dragndrop gpf-btn--tertiary fr-btn fr-btn--tertiary-no-outline fr-m-1w";
        button.title = "Deplacer la couche";
        button.setAttribute("tabindex", "0");

        var self = this;
        if (button.addEventListener) {
            button.addEventListener("click", function (e) {
                self._onStartDragAndDropLayerClick(e);
            });
        } else if (button.attachEvent) {
            button.attachEvent("onclick", function (e) {
                self._onStartDragAndDropLayerClick(e);
            });
        }

        return button;
    },

    /**
     * Creation du nom du layer (DOM)
     *
     * @param {Object} obj - options de la couche à ajouter dans le layer switcher
     *
     * @returns {DOMElement} container
     */
    _createBasicToolNameElement : function (obj) {
        // exemple :
        // <span id="GPname_ID_Layer1" class="GPlayerName" title="Quartiers prioritaires de la ville">Quartiers prioritaires de la ville</span>
        var label = document.createElement("label");
        label.id = this._addUID("GPname_ID_" + obj.id);
        label.className = "GPlayerName gpf-label gpf-label-name fr-label";
        label.title = obj.description || obj.title;
        label.innerHTML = obj.title;

        return label;
    },

    /**
     * Creation de l'icone de visibilité du layer (DOM)
     *
     * @param {Object} obj - options de la couche à ajouter dans le layer switcher

     * @returns {DOMElement[]} array containing input and label elements
     */
    _createBasicToolVisibilityElement : function (obj) {
        var visible = (typeof obj.visibility !== "undefined") ? obj.visibility : true;

        var button = document.createElement("button");
        button.id = this._addUID("GPvisibilityPicto_ID_" + obj.id);
        button.className = "GPlayerVisibility gpf-btn gpf-btn-icon gpf-btn-icon-ls-visibility fr-btn fr-btn--tertiary gpf-btn--tertiary";
        button.title = "Afficher/masquer la couche";
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", visible);
        button.setAttribute("type","button");

        var context = this;
        if (button.addEventListener) {
            button.addEventListener("click", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                context._onVisibilityLayerClick(e);
            });
        } else if (button.attachEvent) {
            button.attachEvent("onclick", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                context._onVisibilityLayerClick(e);
            });
        }

        return button;
    },

    /**
     * Creation de l'affichage du menu des outils avancés du layer (DOM)
     *
     * @param {Object} obj - options de la couche à ajouter dans le layer switcher
     *
     * @returns {DOMElement[]} array containing input and label elements
     */
    _createAdvancedToolShowElement : function (obj) {
        var button = document.createElement("button");
        button.id = this._addUID("GPshowAdvancedTools_ID_" + obj.id);

        button.className = "GPshowAdvancedToolPicto GPshowMoreOptionsImage GPshowMoreOptions GPshowLayerAdvancedTools gpf-btn gpf-btn-icon gpf-btn-icon-ls-collapse fr-btn--sm fr-btn--tertiary gpf-btn--tertiary";
        button.title = "Plus d'outils";
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", false);
        button.setAttribute("type","button");

        var self = this;
        if (button.addEventListener) {
            button.addEventListener("click", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                var element = document.getElementById(self._addUID("GPadvancedTools_ID_" + obj.id));
                if (status) {
                    element.classList.replace("GPelementVisible", "GPelementHidden");
                    element.classList.replace("gpf-visible", "gpf-hidden");
                } else {
                    element.classList.replace("GPelementHidden", "GPelementVisible");
                    element.classList.replace("gpf-hidden", "gpf-visible");
                }
            });
        } else if (button.attachEvent) {
            button.attachEvent("onclick", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                element.classList.replace("GPelementVisible", "GPelementHidden");
                element.classList.replace("gpf-visible", "gpf-hidden");
            });
        }

        return button;
    },

    /**
     * Creation du container des outils avancés du layer (DOM)
     *
     * @param {Object} obj - options de la couche à ajouter dans le layer switcher
     *
     * @returns {DOMElement} container
     */
    _createAdvancedToolElement : function (obj) {
        // exemple :
        // <div id="GPadvancedTools_ID_Layer1" class="GPlayerAdvancedTools">
        //     <!-- _createAdvancedToolDeleteElement -->
        //     <!-- _createAdvancedToolInformationElement -->
        //     <!-- _createAdvancedToolOpacityElement -->
        // </div>

        var container = document.createElement("div");
        container.id = this._addUID("GPadvancedTools_ID_" + obj.id);
        container.className = "GPelementHidden GPlayerAdvancedTools gpf-hidden";

        container.appendChild(this._createAdvancedToolDeleteElement(obj));
        container.appendChild(this._createAdvancedToolInformationElement(obj));

        if (obj.type !== "feature") {
            var array = this._createAdvancedToolOpacityElement(obj);
            for (var i = 0; i < array.length; i++) {
                container.appendChild(array[i]);
            }
        }

        container.appendChild(this._createAdvancedToolExtentElement(obj));

        if (checkDsfr()) {
            var btn = document.createElement("button");
            btn.className = "GPlayerAdvancedToolsContextual fr-btn gpf-btn gpf-btn--tertiary fr-btn--tertiary-no-outline";
            btn.setAttribute("aria-pressed", false);
            if (btn.addEventListener) {
                btn.addEventListener("click", function (e) {
                    var status = (e.target.ariaPressed === "true");
                    e.target.setAttribute("aria-pressed", !status);
                });
            } else if (btn.attachEvent) {
                btn.attachEvent("onclick", function (e) {
                    var status = (e.target.ariaPressed === "true");
                    e.target.setAttribute("aria-pressed", !status);
                });
            }

            var contextual = document.createElement("div");
            contextual.appendChild(this._createAdvancedToolDeleteElement(obj, true));
            contextual.appendChild(this._createAdvancedToolInformationElement(obj, true));
            contextual.appendChild(this._createAdvancedToolExtentElement(obj, true));

            container.appendChild(btn);
            container.appendChild(contextual);
        }
        return container;
    },

    /**
     * Creation de l'icone de suppression du layer (DOM)
     *
     * @param {Object} obj - options de la couche à ajouter dans le layer switcher
     * @param {Boolean} contextual - est-ce que le bouton est dans le menu contextuel ? Default false
     *
     * @returns {DOMElement} container
     */
    _createAdvancedToolDeleteElement : function (obj, contextual = false) {
        var button = document.createElement("button");
        if (!contextual) {
            button.id = this._addUID("GPremove_ID_" + obj.id);
        } else {
            button.id = this._addUID("GPremoveContextual_ID_" + obj.id);
        }
        button.className = "GPlayerRemove gpf-btn gpf-btn-icon gpf-btn-icon-ls-remove fr-btn fr-btn--tertiary gpf-btn--tertiary";
        button.title = "Supprimer la couche";
        button.layerId = obj.id;
        if (contextual) {
            button.innerText = "Supprimer";
        }
        button.setAttribute("tabindex", "0");
        button.setAttribute("type", "button");

        var context = this;
        if (button.addEventListener) {
            button.addEventListener("click", function (e) {
                context._onDropLayerClick(e);
            });
        } else if (button.attachEvent) {
            button.attachEvent("onclick", function (e) {
                context._onDropLayerClick(e);
            });
        }

        return button;
    },

    /**
     * Creation de l'icone d'information du layer (DOM)
     *
     * @param {Object} obj - options de la couche à ajouter dans le layer switcher
     * @param {Boolean} contextual - est-ce que le bouton est dans le menu contextuel ? Default false
     *
     * @returns {DOMElement} container
     */
    _createAdvancedToolInformationElement : function (obj, contextual = false) {
        // exemple :
        // <div id="GPinfo_ID_Layer1" class="GPlayerInfo" title="Informations/légende" onclick="GPopenLayerInfo(this);"></div>

        var btnInfo = document.createElement("button");
        if (!contextual) {
            btnInfo.id = this._addUID("GPinfo_ID_" + obj.id);
        } else {
            btnInfo.id = this._addUID("GPinfoContextual_ID_" + obj.id);
        }
        btnInfo.className = "GPlayerInfo GPlayerInfoClosed gpf-btn gpf-btn-icon gpf-btn-icon-ls-info fr-btn fr-btn--tertiary gpf-btn--tertiary";
        // hack pour garder un emplacement vide
        if (!obj.title || !obj.description) {
            btnInfo.style.opacity = "0";
            btnInfo.style.visibility = "hidden";
            if (contextual) {
                btnInfo.style.display = "none";
            }
        }
        btnInfo.title = "Informations/légende";
        btnInfo.layerId = obj.id;
        if (contextual) {
            btnInfo.innerText = "Informations";
        }
        btnInfo.setAttribute("tabindex", "0");
        btnInfo.setAttribute("type", "button");

        // add event on click
        var context = this;
        if (btnInfo.addEventListener) {
            btnInfo.addEventListener(
                "click",
                function (e) {
                    context._onOpenLayerInfoClick(e);
                }
            );
        } else if (btnInfo.attachEvent) {
            // internet explorer
            btnInfo.attachEvent(
                "onclick",
                function (e) {
                    context._onOpenLayerInfoClick(e);
                }
            );
        }

        return btnInfo;
    },

    /**
     * Creation de l'icone de gestion de l'opacité du layer (DOM)
     *
     * @param {Object} obj - options de la couche à ajouter dans le layer switcher
     *
     * @returns {DOMElement[]} array of two containers
     */
    _createAdvancedToolOpacityElement : function (obj) {
        // exemple :
        // <div id="GPopacity_ID_Layer1" class="GPlayerOpacity" title="Opacité">
        //   <input id="GPopacityRange_ID_Layer1" type="range" value="100" oninput="GPchangeLayerOpacity(this);" onchange="GPchangeLayerOpacity(this);">
        // </div>
        // <div class="GPlayerOpacityValue" id="GPopacityValueDiv_ID_Layer1">
        //   <span id="GPopacityValue_ID_Layer1">100</span>
        //   %
        // </div>

        var list = [];

        // curseur pour changer l'opacité
        var divO = document.createElement("div");
        divO.id = this._addUID("GPopacity_ID_" + obj.id);
        divO.className = "GPlayerOpacity fr-range fr-range--sm";
        // For DSFR
        divO.dataset.frJsRange = "true";
        divO.title = "Opacité";

        var opacity = (typeof obj.opacity !== "undefined") ? obj.opacity : 1;
        opacity = Math.round(opacity * 100);
        divO.style.setProperty("--progress-right", opacity + "%");

        var input = document.createElement("input");
        input.id = this._addUID("GPopacityValueDiv_ID_" + obj.id);
        input.type = "range";
        input.value = opacity;
        input.ariaLabel = "Opacité";

        // add event for opacity change
        var context = this;
        if (input.addEventListener) {
            input.addEventListener(
                "change",
                function (e) {
                    context._onChangeLayerOpacity(e);
                }
            );
        } else if (input.attachEvent) {
            // internet explorer
            input.attachEvent(
                "onchange",
                function (e) {
                    context._onChangeLayerOpacity(e);
                }
            );
        }

        if (input.addEventListener) {
            input.addEventListener(
                "input",
                function (e) {
                    context._onChangeLayerOpacity(e);
                }
            );
        } else if (input.attachEvent) {
            // internet explorer
            input.attachEvent(
                "oninput",
                function (e) {
                    context._onChangeLayerOpacity(e);
                }
            );
        }

        divO.appendChild(input);

        // Valeur d'opacité
        var divC = document.createElement("div");
        divC.id = this._addUID("GPopacityValueDiv_ID_" + obj.id);
        divC.className = "GPlayerOpacityValue";

        var span = document.createElement("span");
        span.id = this._addUID("GPopacityValue_ID_" + obj.id);
        span.className = "gpf-range__output fr-range__output gpf-visible";
        span.innerHTML = opacity + "%";

        divC.appendChild(span);

        list.push(divO);
        list.push(divC);

        return list;
    },

    /**
     * Creation de l'icone de zoom sur extent (DOM)
     *
     * @param {Object} obj - options de la couche à ajouter dans le layer switcher
     * @param {Boolean} contextual - est-ce que le bouton est dans le menu contextuel ? Default false
     *
     * @returns {DOMElement} container
     */
    _createAdvancedToolExtentElement : function (obj, contextual = false) {
        // FIXME inactif en mode classique !
        var button = document.createElement("button");
        if (!contextual) {
            button.id = this._addUID("GPextent_ID_" + obj.id);
        } else {
            button.id = this._addUID("GPextentContextual_ID_" + obj.id);
        }
        button.className = "GPelementHidden GPlayerExtent gpf-btn gpf-btn-icon gpf-btn-icon-ls-extent fr-btn fr-btn--tertiary gpf-btn--tertiary";
        button.title = "Zoomer dans l'étendue";
        button.layerId = obj.id;
        if (contextual) {
            button.innerText = "Zoomer";
        }
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", true);
        button.setAttribute("type", "button");

        var context = this;
        if (button.addEventListener) {
            button.addEventListener("click", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                context._onZoomToExtentClick(e);
            });
        } else if (button.attachEvent) {
            button.attachEvent("onclick", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                context._onZoomToExtentClick(e);
            });
        }

        return button;
    },

    // ################################################################### //
    // ############################ Layer info ########################### //
    // ################################################################### //

    /**
     * Creation du container du layer info (DOM)
     *
     * TODO GPlayerInfoPopup : ???
     * TODO GPlayerInfoLink  : mettre en forme les échelles !
     *
     * @param {Object} obj - options de la couche à ajouter dans le layer switcher
     *
     * @returns {DOMElement} container
     */
    _createContainerLayerInfoElement : function (obj) {
        var container = document.createElement("div");

        var header = document.createElement("div");
        // FIXME on n'utilise pas le dsfr !
        // container.className = "GPpanelHeader gpf-panel__header fr-modal__header";
        header.className = "gpf-panel__header_ls";
        container.appendChild(header);

        var label = document.createElement("label");
        label.className = "GPlayerInfo gpf-btn-header gpf-btn-icon-ls-info";
        label.title = "Informations";
        header.appendChild(label);

        var title = document.createElement("div");
        title.id = this._addUID("GPlayerInfoTitle");
        title.innerHTML = obj.title;
        title.className = "gpf-panel__title_ls";
        header.appendChild(title);

        var btnClose = document.createElement("button");
        btnClose.id = this._addUID("GPlayerInfoClose");
        btnClose.className = "GPpanelClose GPlayersPanelClose gpf-btn gpf-btn-icon-close fr-btn--close fr-btn fr-btn--tertiary-no-outline fr-m-1w";
        btnClose.title = "Fermer la fenêtre";

        var self = this;
        /** Call event function on close click */
        var onCloseClick = function () {
            document.getElementById(self._addUID("GPlayerInfoPanel")).classList.add("GPlayerInfoPanelClosed", "gpf-hidden");
            document.getElementById(self._addUID("GPlayerInfoPanel")).classList.remove("GPlayerInfoPanelOpened", "gpf-visible");
            document.getElementById(obj.id).classList.add("GPlayerInfoClosed");
            document.getElementById(obj.id).classList.remove("GPlayerInfoOpened");
        };
        if (btnClose.addEventListener) {
            btnClose.addEventListener("click", onCloseClick);
        } else if (btnClose.attachEvent) {
            // internet explorer
            btnClose.attachEvent("onclick", onCloseClick);
        }
        this.addEventListener("layerswitcher:remove", (e) => {
            if (parseInt(obj.id.split("-")[0].split("GPinfo_ID_")[1]) === e.layer.id) {
                document.getElementById(self._addUID("GPlayerInfoPanel")).classList.add("GPlayerInfoPanelClosed", "gpf-hidden");
                document.getElementById(self._addUID("GPlayerInfoPanel")).classList.remove("GPlayerInfoPanelOpened", "gpf-visible");
            }
        });
        header.appendChild(btnClose);
        container.appendChild(header);

        var content = document.createElement("div");
        content.id = this._addUID("GPlayerInfoContent");
        content.className = "gpf-panel__content fr-modal__content";
        container.appendChild(content);

        if (obj.quicklookUrl) {
            var quick = document.createElement("div");
            quick.id = this._addUID("GPlayerInfoQuicklook");
            quick.title = "Afficher un aperçu de la couche";
            var refquick = document.createElement("a");
            refquick.href = obj.quicklookUrl;
            refquick.appendChild(quick);
            content.appendChild(refquick);
        }

        var desc = document.createElement("div");
        desc.id = this._addUID("GPlayerInfoDescription");
        desc.innerHTML = obj.description;
        content.appendChild(desc);

        if (obj.metadata) {
            var mtd = document.createElement("div");
            mtd.id = this._addUID("GPlayerInfoMetadata");

            var mtdtitle = document.createElement("div");
            mtdtitle.className = "GPlayerInfoSubtitle";
            mtdtitle.innerHTML = "Métadonnées";
            mtd.appendChild(mtdtitle);

            for (var i = 0; i < obj.metadata.length; i++) {
                var urlmtd = obj.metadata[i].url;

                var mtdlink = document.createElement("div");
                mtdlink.className = "GPlayerInfoLink";

                var refmtd = document.createElement("a");
                refmtd.href = urlmtd;
                refmtd.innerHTML = urlmtd;
                mtdlink.appendChild(refmtd);
                mtd.appendChild(mtdlink);
            }

            if (obj.metadata.length !== 0) {
                content.appendChild(mtd);
            }
        }

        if (obj.legends) {
            var lgd = document.createElement("div");
            lgd.id = this._addUID("GPlayerInfoLegend");

            var lgdtitle = document.createElement("div");
            lgdtitle.className = "GPlayerInfoSubtitle";
            lgdtitle.innerHTML = "Légende";
            lgd.appendChild(lgdtitle);

            var legends = {};
            var maxScale = obj.maxScaleDenominator || 560000000;

            // on crée un tableau temporaire pour ordonner les légendes selon le dénominateur d'échelle
            for (var k = 0; k < obj.legends.length; k++) {
                var minScale = obj.legends[k].minScaleDenominator;
                if (minScale) {
                    var s = minScale.toString();
                    minScale = Math.round(parseInt(s.substring(0, 3), 10) / 10) * Math.pow(10, s.length - 2);
                } else {
                    minScale = 270;
                }
                legends[minScale] = obj.legends[k];
            }

            for (var scale in legends) {
                if (legends.hasOwnProperty(scale)) {
                    var urllgd = legends[scale].url;
                    // on n'affiche pas les légendes pointant vers "nolegend.jpg"
                    if (typeof urllgd === "string" && urllgd.toLowerCase().indexOf("nolegend.jpg") === -1) {
                        // TODO GPlayerInfoPopup
                        var lgdlink = document.createElement("div");
                        lgdlink.className = "GPlayerInfoLink";

                        maxScale = legends[scale].maxScaleDenominator || maxScale;

                        var reflgd = document.createElement("a");
                        reflgd.className = "fr-link";
                        reflgd.href = urllgd;
                        reflgd.target = "_blank";
                        reflgd.innerHTML = "Du 1/" + scale + " au 1/" + maxScale;
                        lgdlink.appendChild(reflgd);
                        lgd.appendChild(lgdlink);
                    } else {
                        delete legends[scale];
                    }
                }
            }

            if (Object.keys(legends).length !== 0) {
                content.appendChild(lgd);
            }
        }

        return container;
    }
};

export default LayerSwitcherDOM;
