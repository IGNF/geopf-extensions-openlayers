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
                    document.getElementById(self._addUID("GPlayerStylePanel")).classList.add("GPlayerStylePanelClosed", "gpf-hidden");
                    document.getElementById(self._addUID("GPlayerStylePanel")).classList.remove("GPlayerStylePanelOpened", "gpf-visible");
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
                    document.getElementById(self._addUID("GPlayerStylePanel")).classList.add("GPlayerStylePanelClosed", "gpf-hidden");
                    document.getElementById(self._addUID("GPlayerStylePanel")).classList.remove("GPlayerStylePanelOpened", "gpf-visible");
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

    /**
     * Creation du container du panneau des styles (DOM)
     *
     * @returns {DOMElement} container
     */
    _createMainStyleElement : function () {
        // gestion du panneau d"information dans le container principal
        // <div id="GPlayerInfoPanel" class="GPlayerInfoPanelClosed">...</div>
        var divP = document.createElement("dialog");
        divP.id = this._addUID("GPlayerStylePanel");
        divP.className = "GPpanel GPlayerStylePanelClosed gpf-panel fr-modal";
        return divP;
    },

    _createMainStyleDivElement : function () {
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
     * @param {String} obj.type - feature or vector
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
        if (obj.layer.config && obj.layer.config.serviceParams.id === "GPP:TMS") {
            label.innerHTML = obj.description;
        }

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

        container.appendChild(this._createAdvancedToolDeleteElement(obj.id));
        if (checkDsfr()) {
            var tms = (obj.layer.config && obj.layer.config.serviceParams.id === "GPP:TMS");
            var styles = tms ? obj.layer.config.styles : null;
            container.appendChild(this._createAdvancedToolEditionElement(obj.id, obj.editable, tms, styles));
        }
        container.appendChild(this._createAdvancedToolInformationElement(obj.id, obj.title, obj.description));

        var array = this._createAdvancedToolOpacityElement(obj.id, obj.opacity);
        for (var i = 0; i < array.length; i++) {
            container.appendChild(array[i]);
        }

        container.appendChild(this._createAdvancedToolExtentElement(obj.id));
        container.appendChild(this._createAdvancedToolGreyscaleElement(obj.id, obj.grayable, obj.grayscale));
        if (obj.advancedTools && obj.advancedTools.length) {
            var btn = document.createElement("button");
            btn.className = "GPlayerAdvancedToolsContextualMore fr-btn gpf-btn gpf-btn--tertiary fr-btn--tertiary-no-outline";
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
            var tools = this._createAdvancedToolMoreElement(obj.id, obj.advancedTools);
            for (var j = 0; j < tools.length; j++) {
                contextual.appendChild(tools[j]);
            }
            container.appendChild(btn);
            container.appendChild(contextual);
        }

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
            contextual.appendChild(this._createAdvancedToolDeleteElement(obj.id, true));
            var tms = (obj.layer.config && obj.layer.config.serviceParams.id === "GPP:TMS");
            var styles = tms ? obj.layer.config.styles : null;
            contextual.appendChild(this._createAdvancedToolEditionElement(obj.id, obj.editable, tms, styles, true));
            contextual.appendChild(this._createAdvancedToolInformationElement(obj.id, obj.title, obj.description, true));
            contextual.appendChild(this._createAdvancedToolExtentElement(obj.id, true));
            contextual.appendChild(this._createAdvancedToolGreyscaleElement(obj.id, obj.grayable, obj.grayscale, true));
            if (obj.advancedTools && obj.advancedTools.length) {
                var tools = this._createAdvancedToolMoreElement(obj.id, obj.advancedTools, true);
                for (var k = 0; k < tools.length; k++) {
                    contextual.appendChild(tools[k]);
                }
            }

            container.appendChild(btn);
            container.appendChild(contextual);
        }
        return container;
    },

    /**
     * Creation de l'icone de suppression du layer (DOM)
     *
     * @param {String} id - ID de la couche à ajouter dans le layer switcher
     * @param {Boolean} contextual - est-ce que le bouton est dans le menu contextuel ? Default false
     *
     * @returns {DOMElement} container
     */
    _createAdvancedToolDeleteElement : function (id, contextual = false) {
        var button = document.createElement("button");
        if (!contextual) {
            button.id = this._addUID("GPremove_ID_" + id);
        } else {
            button.id = this._addUID("GPremoveContextual_ID_" + id);
        }
        button.className = "GPlayerRemove gpf-btn gpf-btn-icon gpf-btn-icon-ls-remove fr-btn fr-btn--tertiary gpf-btn--tertiary";
        button.title = "Supprimer la couche";
        button.layerId = id;
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
     * Creation de l'icone d'edition du layer (DOM)
     *
     * @param {String} id - ID de la couche à ajouter dans le layer switcher
     * @param {Boolean} editable - mode editable
     * @param {Boolean} tms - tms ou non
     * @param {Array} styles - styles des tms
     * @param {Boolean} contextual - est-ce que le bouton est dans le menu contextuel ? Default false
     * 
     * @returns {DOMElement} container
     */
    _createAdvancedToolEditionElement : function (id, editable, tms, styles, contextual = false) {
        var button = document.createElement("button");
        if (!contextual) {
            button.id = this._addUID("GPedit_ID_" + id);
        } else {
            button.id = this._addUID("GPeditContextual_ID_" + id);
        }
        button.className = "GPlayerEdit gpf-btn gpf-btn-icon gpf-btn-icon-ls-edit fr-btn fr-btn--tertiary gpf-btn--tertiary";
        button.title = "Editer la couche";
        if (tms) {
            button.title = "Changer de style";
        }
        button.layerId = id;
        if (contextual) {
            button.innerText = "Editer la couche";
            if (tms) {
                button.innerText = "Changer de style";
            }
        }
        button.setAttribute("tabindex", "0");
        button.setAttribute("type", "button");

        // hack pour garder un emplacement vide en mode desktop
        // et cacher l'entrée en mode mobile
        if (!editable || (tms && styles.length === 1)) {
            if (contextual) {
                button.style.display = "none";
            } else {
                button.style.opacity = "0";
                button.style.display = "hidden";
            }
        }

        var context = this;
        if (tms && styles.length > 1) {
            if (button.addEventListener) {
                button.addEventListener("click", function (e) {
                    context._onEditLayerStyleClick(e, styles);
                });
            } else if (button.attachEvent) {
                button.attachEvent("onclick", function (e) {
                    context._onEditLayerStyleClick(e, styles);
                });
            }
        } else {
            if (button.addEventListener) {
                button.addEventListener("click", function (e) {
                    context._onEditLayerClick(e);
                });
            } else if (button.attachEvent) {
                button.attachEvent("onclick", function (e) {
                    context._onEditLayerClick(e);
                });
            }
        }

        return button;
    },

    /**
     * Creation de l'icone d'information du layer (DOM)
     *
     * @param {String} id - ID de la couche à ajouter dans le layer switcher
     * @param {String} title - titre
     * @param {String} description - description
     * @param {Boolean} contextual - est-ce que le bouton est dans le menu contextuel ? Default false
     *
     * @returns {DOMElement} container
     */
    _createAdvancedToolInformationElement : function (id, title, description, contextual = false) {
        // exemple :
        // <div id="GPinfo_ID_Layer1" class="GPlayerInfo" title="Informations/légende" onclick="GPopenLayerInfo(this);"></div>

        var btnInfo = document.createElement("button");
        if (!contextual) {
            btnInfo.id = this._addUID("GPinfo_ID_" + id);
        } else {
            btnInfo.id = this._addUID("GPinfoContextual_ID_" + id);
        }
        btnInfo.className = "GPlayerInfo GPlayerInfoClosed gpf-btn gpf-btn-icon gpf-btn-icon-ls-info fr-btn fr-btn--tertiary gpf-btn--tertiary";
        // hack pour garder un emplacement vide
        if (!title || !description) {
            btnInfo.style.opacity = "0";
            btnInfo.style.visibility = "hidden";
            if (contextual) {
                btnInfo.style.display = "none";
            }
        }
        btnInfo.title = "Informations/légende";
        btnInfo.layerId = id;
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
     * Creation de l'icone de n&b du layer (DOM)
     *
     * @param {String} id - ID de la couche à ajouter dans le layer switcher
     * @param {Boolean} grayable - le mode grisable est il  possible pour ce type de couche
     * @param {Boolean} grayscale - option grisée de la couche
     * @param {Boolean} contextual - est-ce que le bouton est dans le menu contextuel ? Default false
     *
     * @returns {DOMElement} container
     */
    _createAdvancedToolGreyscaleElement : function (id, grayable, grayscale, contextual = false) {
        // exemple :
        // <div id="GPgreyscale_ID_Layer1" class="GPlayerBreyscale" title="Noir & blanc" onclick="GPtoggleGreyscale(this);"></div>
        var _grayscale = (typeof grayscale !== "undefined") ? grayscale : false;

        var btnGreyscale = document.createElement("button");
        if (!contextual) {
            btnGreyscale.id = this._addUID("GPgreyscale_ID_" + id);
        } else {
            btnGreyscale.id = this._addUID("GPgreyscaleContextual_ID_" + id);
        }
        btnGreyscale.className = "GPlayerGreyscale GPlayerGreyscaleOff gpf-btn gpf-btn-icon gpf-btn-icon-ls-greyscale fr-btn fr-btn--tertiary gpf-btn--tertiary";
        if (_grayscale) {
            btnGreyscale.classList.replace("GPlayerGreyscaleOff", "GPlayerGreyscaleOn");
        }
        btnGreyscale.title = "Noir et blanc";
        btnGreyscale.layerId = id;
        if (contextual) {
            btnGreyscale.innerText = "N&B";
        }
        btnGreyscale.setAttribute("aria-pressed", _grayscale);
        btnGreyscale.setAttribute("tabindex", "0");
        btnGreyscale.setAttribute("type", "button");

        // hack pour garder un emplacement vide
        if (!grayable) {
            btnGreyscale.style.opacity = "0";
            btnGreyscale.style.visibility = "hidden";
        }

        // add event on click
        var context = this;
        if (btnGreyscale.addEventListener) {
            btnGreyscale.addEventListener(
                "click",
                function (e) {
                    var status = (e.target.ariaPressed === "true");
                    e.target.setAttribute("aria-pressed", !status);
                    context._onToggleLayerGreyscaleClick(e);
                }
            );
        } else if (btnGreyscale.attachEvent) {
            // internet explorer
            btnGreyscale.attachEvent(
                "onclick",
                function (e) {
                    var status = (e.target.ariaPressed === "true");
                    e.target.setAttribute("aria-pressed", !status);
                    context._onToggleLayerGreyscaleClick(e);
                }
            );
        }

        return btnGreyscale;
    },

    /**
     * Creation de l'icone de gestion de l'opacité du layer (DOM)
     *
     * @param {String} id - ID de la couche à ajouter dans le layer switcher
     * @param {Number} opacity - Valeur de l'opacité
     * 
     * @returns {DOMElement[]} Tableau de 2 containers
     */
    _createAdvancedToolOpacityElement : function (id, opacity) {
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
        divO.id = this._addUID("GPopacity_ID_" + id);
        divO.className = "GPlayerOpacity fr-range fr-range--sm";
        // For DSFR
        divO.dataset.frJsRange = "true";
        divO.title = "Opacité";

        var _opacity = (typeof opacity !== "undefined") ? opacity : 1;
        _opacity = Math.round(_opacity * 100);
        divO.style.setProperty("--progress-right", _opacity + "%");

        var input = document.createElement("input");
        input.id = this._addUID("GPopacityValueDiv_ID_" + id);
        input.type = "range";
        input.value = _opacity;
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
        divC.id = this._addUID("GPopacityValueDiv_ID_" + id);
        divC.className = "GPlayerOpacityValue";

        var span = document.createElement("span");
        span.id = this._addUID("GPopacityValue_ID_" + id);
        span.className = "gpf-range__output fr-range__output gpf-visible";
        span.innerHTML = _opacity + "%";

        divC.appendChild(span);

        list.push(divO);
        list.push(divC);

        return list;
    },

    /**
     * Creation de l'icone de zoom sur extent (DOM)
     *
     * @param {String} id - ID de la couche à ajouter dans le layer switcher
     * @param {Boolean} contextual - est-ce que le bouton est dans le menu contextuel ? Default false
     *
     * @returns {DOMElement} container
     */
    _createAdvancedToolExtentElement : function (id, contextual = false) {
        // FIXME inactif en mode classique !
        var button = document.createElement("button");
        if (!contextual) {
            button.id = this._addUID("GPextent_ID_" + id);
        } else {
            button.id = this._addUID("GPextentContextual_ID_" + id);
        }
        button.className = "GPelementHidden GPlayerExtent gpf-btn gpf-btn-icon gpf-btn-icon-ls-extent fr-btn fr-btn--tertiary gpf-btn--tertiary";
        button.title = "Zoomer dans l'étendue";
        button.layerId = id;
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

    /**
     * Creation des icones pour des outils externes
     * 
     * @param {*} id - ID 
     * @param {*} tools - autres outils 
     * @param {*} contextual - est-ce que le bouton est dans le menu contextuel ? Default false
     *
     * @returns {DOMElement} container
     */
    _createAdvancedToolMoreElement : function (id, tools, contextual = false) {
        var list = [];
        for (let i = 0; i < tools.length; i++) {
            const opts = tools[i];
            const className = `gpf-btn-icon-ls-tools-${opts.label}`;
            const button = document.createElement("button");
            if (!contextual) {
                button.id = this._addUID("GPtools-" + opts.label.toLowerCase() + "_ID_" + id);
            } else {
                button.id = this._addUID("GPtoolsContextual-" + opts.label.toLowerCase() + "_ID_" + id);
            }
            button.className = `GPlayerTools gpf-btn gpf-btn-icon gpf-btn-icon-ls-tools ${className.toLowerCase()} fr-btn fr-btn--tertiary gpf-btn--tertiary`;
            button.title = opts.label;
            button.layerId = id;
            button.setAttribute("tabindex", "0");
            button.setAttribute("type", "button");

            if (contextual) {
                button.innerText = opts.label;
            }

            Object.assign(button.style, opts.styles);

            if (opts.icon) {
                if (opts.icon.startsWith("<svg")) {
                    // FIXME 
                    // width / height à definir si ces options ne sont pas renseignées inline
                    opts.icon = "data:image/svg+xml;base64," + btoa(opts.icon);
                } else if (opts.icon.startsWith("fr-icon")) {
                    // FIXME
                    // à optimiser, le texte est masqué (label) !?
                    button.classList.add(opts.icon);
                } else {
                    // url...
                }
            } else {
                var iconDefault = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23 12L15.9289 19.0711L14.5147 17.6569L20.1716 12L14.5147 6.34317L15.9289 4.92896L23 12ZM3.82843 12L9.48528 17.6569L8.07107 19.0711L1 12L8.07107 4.92896L9.48528 6.34317L3.82843 12Z"></path></svg>`;
                opts.icon = "data:image/svg+xml;base64," + btoa(iconDefault);
            }

            if (!document.querySelector(`style[data-injected="${className.toLowerCase()}"]`)) {
                const style = document.createElement("style");
                style.dataset.injected = className.toLowerCase();
                style.textContent = `
                    .${className.toLowerCase()}::after {
                        width: 100%;
                        height: 100%;
                        -webkit-mask-image: url('${opts.icon}');
                        -webkit-mask-repeat: no-repeat;
                        -webkit-mask-position: center;

                        mask-image: url('${opts.icon}');
                        mask-repeat: no-repeat;
                        mask-position: center;
                    }
                `;
                document.head.appendChild(style);
            }

            var self = this;
            if (button.addEventListener) {
                // button.addEventListener("click", opts.cb.bind(self));
                button.addEventListener("click", (e) => {
                    self._onClickAdvancedToolsMore(e, opts.label, opts.cb);
                });
            } else if (button.attachEvent) {
                // button.attachEvent("onclick", opts.cb.bind(self));
                button.attachEvent("onclick", (e) => {
                    self._onClickAdvancedToolsMore(e, opts.label, opts.cb);
                });
            }
            list.push(button);
        }
        return list;
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
    },

    // ################################################################### //
    // ############################ Layer style ########################### //
    // ################################################################### //

    /**
     * Creation du container du layer style (DOM)
     *
     * @param {Object} obj - options de la couche à ajouter dans le layer switcher
     *
     * @returns {DOMElement} container
     */
    _createContainerLayerStyleElement : function (obj) {
        var container = document.createElement("div");

        var header = document.createElement("div");
        // FIXME on n'utilise pas le dsfr !
        // container.className = "GPpanelHeader gpf-panel__header fr-modal__header";
        header.className = "gpf-panel__header_ls";
        container.appendChild(header);

        var label = document.createElement("label");
        label.className = "GPlayerStyle gpf-btn-header gpf-btn-icon-ls-info";
        label.title = "Informations";
        header.appendChild(label);

        var title = document.createElement("div");
        title.id = this._addUID("GPlayerStyleTitle");
        title.innerHTML = "Options de style";
        title.className = "gpf-panel__title_ls";
        header.appendChild(title);

        var btnClose = document.createElement("button");
        btnClose.id = this._addUID("GPlayerStyleClose");
        btnClose.className = "GPpanelClose GPlayersPanelClose gpf-btn gpf-btn-icon-close fr-btn--close fr-btn fr-btn--tertiary-no-outline fr-m-1w";
        btnClose.title = "Fermer la fenêtre";

        var self = this;
        /** Call event function on close click */
        var onCloseClick = function () {
            document.getElementById(self._addUID("GPlayerStylePanel")).classList.add("GPlayerStylePanelClosed", "gpf-hidden");
            document.getElementById(self._addUID("GPlayerStylePanel")).classList.remove("GPlayerStylePanelOpened", "gpf-visible");
            document.getElementById(obj.div).classList.add("GPlayerStyleClosed");
            document.getElementById(obj.div).classList.remove("GPlayerStyleOpened");
        };
        if (btnClose.addEventListener) {
            btnClose.addEventListener("click", onCloseClick);
        } else if (btnClose.attachEvent) {
            // internet explorer
            btnClose.attachEvent("onclick", onCloseClick);
        }
        this.addEventListener("layerswitcher:remove", (e) => {
            if (parseInt(obj.id.split("-")[0].split("GPinfo_ID_")[1]) === e.layer.id) {
                document.getElementById(self._addUID("GPlayerStylePanel")).classList.add("GPlayerStylePanelClosed", "gpf-hidden");
                document.getElementById(self._addUID("GPlayerStylePanel")).classList.remove("GPlayerStylePanelOpened", "gpf-visible");
            }
        });
        header.appendChild(btnClose);
        container.appendChild(header);

        var content = document.createElement("div");
        content.id = this._addUID("GPlayerStyleContent");
        content.className = "gpf-panel__content fr-modal__content";
        container.appendChild(content);

        var list = document.createElement("div");
        list.id = this._addUID("GPlayerStyleList");

        for (let i = 0; i < obj.styles.length; i++) {
            var style = obj.styles[i];
            var elem = document.createElement("div");
            elem.className = "gpf-flex gpf-radio-group fr-radio-group fr-my-1w";
            var input = document.createElement("input");
            input.type = "radio";
            input.name = this._addUID("styleradio_ID_" + obj.id);
            input.id = this._addUID("styleradio_" + style.name + "_ID_" + obj.id);
            input.value = style.url;
            input.dataset.name = style.name;
            var label = document.createElement("label");
            label.className = "gpf-label fr-label";
            label.innerText = style.title;
            label.htmlFor = this._addUID("styleradio_" + style.name + "_ID_" + obj.id);
            elem.appendChild(input);
            elem.appendChild(label);
            list.appendChild(elem);
            if (obj.layerInfo.layer.styleUrl === style.url) {
                input.checked = true;
            }
            input.addEventListener("change", (e) => {
                self._onChangeStyleLayerClick(e);
            });
        }
        content.appendChild(list);

        return container;
    }
};

export default LayerSwitcherDOM;
