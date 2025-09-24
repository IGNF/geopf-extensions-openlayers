import Sortable from "sortablejs";
import checkDsfr from "../Utils/CheckDsfr";
import ToolTips from "../../Utils/ToolTips";
import Utils from "../../Utils/Helper";
import BaseLayer from "ol/layer/Base";
import { log } from "loglevel";

var LayerSwitcherDOM = {

    /**
     * Creation du drag and drop
     *so
     * @param {Object} elementDraggable - Element HTML (DOM) Container
     * @param {Object} context - this
     */
    _createDraggableElement : function (elementDraggable, context) {
        let handleClass = [".GPtitle"];
        if (checkDsfr()) {
            handleClass.push(".GPlayerDragNDrop");
        }

        // FIXME retirer cette détection user-agent pour solution propre
        // option forcefallback pour réparer sortable sous Chrome 97
        // option forcefallback casse le layerswitcher du portail sous firefox
        // let handleClass = ".GPlayerName";
        const forceFallback = !!navigator.userAgent.match(/chrome|chromium|crios/i);

        // Voir lien suivant pour dragndrop avec tab
        // https://robbymacdonell.medium.com/refactoring-a-sortable-list-for-keyboard-accessibility-2176b34a07f4

        context._sortables = [];
        handleClass.forEach(handle => {
            const sortable = Sortable.create(elementDraggable, {
                handle : handle,
                dataIdAttr : "data-sortable-id", // required to calculate the custom sort
                draggable : ".draggable-layer",
                ghostClass : "GPghostLayer",
                animation : 200,
                forceFallback : forceFallback,
                // Call event function on drag and drop
                onEnd : function (e) {
                    // FIXME pas terrrible, mais il faut bien passer ce contexte...
                    context._onEndDragAndDropLayerClick(e);
                }
            });
            context._sortables.push(sortable);
        });
    },

    /**
     * Fonction permettant de bouger une couche au clavier
     * @param {HTMLElement} element Élément à bouger
     * @param {up|down} direction Direction dans laquelle déplacer la couche
     * @returns {Boolean} Vrai si l'opération a fonctionnée.
     */
    _moveElement : function (element, direction) {
        const sortable_list = this._sortables[0];
        if (["up", "down"].includes(direction) == false) {
            return false;
        }
        if (typeof element.dataset.sortableId == "undefined") {
            return false;
        }

        // Attribut pour réorganiser après
        let sortableId = element.dataset.sortableId;
        let order = sortable_list.toArray();
        let index = order.indexOf(sortableId);

        // Retrait de l'objet à déplacer
        order.splice(index, 1);

        // Déplace la couche à la bonne position
        if (direction == "down") {
            order.splice(index + 1, 0, sortableId);
        } else if (direction == "up") {
            order.splice(index - 1, 0, sortableId);
        }

        // Applique l'opéaration de tri
        sortable_list.sort(order, true);
        // Change le zindex et envoie l'événement
        this._onEndDragAndDropLayerClick({
            newIndex : order.indexOf(sortableId),
        });
        return true;
    },

    /**
     * Écouteur d'événement pour modifier le z-index
     * @param {Boolean} up Vrai si c'est up. Faux si down.
     * @param {KeyboardEvent} event Événement du clavier
     */
    _onMoveElement : function (up, event) {
        if (["Enter", "Space"].includes(event.code)) {
            // Choisit la bonne direction
            const direction = up ? "up" : "down";
            const oppositeDirection = up ? "down" : "up";

            event.stopPropagation();
            event.preventDefault();

            // Déplace l'élément dans la bonne direction
            this._moveElement(event.currentTarget.closest(".draggable-layer"), direction);

            // Change le focus dans le cas où c'est le premier / dernier élément
            if (window.getComputedStyle(event.currentTarget).visibility == "hidden") {
                event.currentTarget.parentNode.querySelector(`[data-direction=${oppositeDirection}]`).focus();
            } else {
                event.currentTarget.focus();
            }
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
     * @returns {HTMLElement} container - layer switcher DOM element
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
     * @returns {HTMLElement} input - element for minimizing/maximizing the layer switcher
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
     * @returns {HTMLElement} container - layers list container
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

    _createMainLayerListElement : function () {
        var div = document.createElement("div");
        div.className = "GPLayerListBody";
        div.setAttribute("role", "list");
        return div;
    },

    /**
     * Creation du container du picto du controle (DOM)
     *
     * @returns {HTMLElement} label
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
     * @returns {HTMLElement} container
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
     * @returns {HTMLElement} container
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
        // on n'utilise pas le dsfr !
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
        // on n'utilise pas le dsfr !
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
     * Créé le conteneur du header
     * @returns {HTMLDivElement} Conteneur
     */
    _createHeaderButtonsDivElement : function () {
        var div = document.createElement("div");
        div.className = "GPbodyHeader";
        div.id = this._addUID("GPbodyHeader");
        return div;
    },

    /**
     * Créé le conteneur des boutons du header
     * @param {Object} options Options
     * @param {String} [options.className] ClassName de l'élément
     * @param {Boolean} [options.left] Optionnel. Place les boutons à gauche si vrai.
     * @param {Boolean} [options.size] Optionnel. Taille des boutons. Par défaut, 'md'.
     * @param {String} [options.id] ClassName de l'élément (utilisé pour l'id aussi)
     * @returns {HTMLDivElement} Contenur de bouton
     */
    _createButtonsGroupElement : function (options) {
        options = options ? options : {};
        let customClass = options.className ? options.className : "";
        let position = options.left ? "left" : "right";
        let classSize = "";
        options.size = options.size ? options.size : "";
        switch (options.size.toLowerCase()) {
            case "sm":
                classSize = "fr-btns-group--sm";
                break;
            case "lg":
                classSize = "fr-btns-group--lg";
                break;
        }

        var div = document.createElement("div");
        div.className = `${customClass} GPbtnsGroup GPbtnsGroup--${position} fr-btns-group fr-btns-group--${position} fr-btns-group--inline-reverse fr-btns-group--inline ${classSize} fr-btns-group--icon-left`;

        let id = options.id !== null ? `${customClass}_ID_${options.id}` : customClass;
        div.id = this._addUID(id);
        return div;
    },

    /**
     * Créé un bouton
     * @param {Object} options Options du bouton (de type LayerSwitcher.HeaderButton)
     * @returns {HTMLButtonElement} Bouton
     */
    _createButtonHeaderElement : function (options) {
        let btn = document.createElement("button");
        btn.className = "fr-btn fr-btn--tertiary gpf-btn ";
        if (options.className) {
            btn.className += options.className;
        }
        if (options.icon) {
            btn.className += options.icon;
        }
        if (options.label) {
            btn.innerHTML = options.label;
        }
        if (options.title) {
            btn.title = options.title;
            btn.ariaLabel = options.title;
        }

        btn.id = this._addUID("GPtools-" + options.label.toLowerCase());

        let self = this;

        btn.addEventListener("click", (e) => {
            self._onClickHeaderButtons(e, options.label, options.cb);
        });

        return btn;
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
     * @param {Boolean} tooltips - active ou non les tooltips HTML
     *
     * @returns {HTMLElement} container
     */
    _createContainerLayerElement : function (obj, tooltips) {
        // exemple :
        // <div id="GPlayerSwitcher_ID_Layer1" class="GPlayerSwitcher_layer outOfRange">
        //     <!-- Basic toolbar : visibility / layer name
        //     _createBasicToolElement
        //           _createVisibilityElement
        //           _createLayerNameElement
        //     -->
        //     <!-- Hidden checkbox + label for showing advanced toolbar
        //     _createAdvancedToolShowElement
        //     -->
        //     <!-- Advanced toolbar : layer info / opacity slider / opacity value / removal
        //     _createAdvancedToolDivElement
        //           _createDeleteElement
        //           _createInformationElement
        //           _createOpacityElement
        //     -->
        // </div>

        // <!-- Layer entry in layer list -->
        // <!-- Every item is marked with layerID, which is defined at layer import -->
        var container = document.createElement("div");
        container.id = this._addUID("GPlayerSwitcher_ID_" + obj.id);
        container.className = "GPlayerSwitcher_layer gpf-panel__content fr-modal__content draggable-layer";

        // ajout des outils basiques (visibility / layer name)
        container.appendChild(this._createBasicToolElement(obj, tooltips));

        // liste des outils avancés (layer info / opacity slider / opacity value / removal)
        container.appendChild(this._createAdvancedToolDivElement(obj));

        container.setAttribute("tabindex", 0);
        container.setAttribute("role", "listitem");
        ["click", "keydown"].forEach(type => {
            container.addEventListener(type, (e) => {
                this._onSelectLayer(e);
            });
        });

        return container;
    },

    // ################################################################### //
    // ############################ Layer tool ########################### //
    // ################################################################### //

    /**
     * Creation du container des outils basiques du layer (DOM)
     *
     * @param {Object} obj - options de la couche à ajouter dans le layer switcher
     * @param {Boolean} tooltips - autoriser ou non les tooltips HTML
     * @returns {HTMLElement} container
     */
    _createBasicToolElement : function (obj, tooltips) {
        // exemple :
        // <div id="GPbasicTools_ID_1" class="GPlayerBasicTools">
        //      <!-- _createBasicToolButtons -->
        //          <!-- _createAdvancedToolShowElement -->
        //          <!-- _createVisibilityElement -->
        //          <!-- _createDeleteElement -->
        //      <!-- _createBasicToolTitleElement -->
        //          <!-- _createLayerThumbnailElement -->
        //          <!-- _createLayerNameDivElement -->
        //              <!-- _createLayerNameElement -->
        //              <!-- _createLayerProducerElement -->
        //      <!-- _createDragNDropElement -->
        // </div>

        var div = document.createElement("div");
        div.id = this._addUID("GPbasicTools_ID_" + obj.id);
        div.className = "GPlayerBasicTools";

        div.appendChild(this._createBasicToolButtons(obj));

        div.appendChild(this._createBasicToolTitleElement(obj, tooltips));

        if (obj.draggable) {
            div.appendChild(this._createDragNDropElement(obj));
        }

        return div;
    },

    /**
     * Creation du groupe de bouton basiques
     *
     * @param {Object} obj - options de la couche à ajouter dans le layer switcher
     * @returns {HTMLElement} container
     */
    _createBasicToolButtons : function (obj) {
        let div = document.createElement("div");
        div.id = this._addUID("GPbasicToolButtons_ID_" + obj.id);
        div.className = "GPbasicToolButtons";

        div.appendChild(this._createAdvancedToolShowElement(obj));
        div.appendChild(this._createVisibilityElement(obj));

        if (obj.deletable) {
            div.appendChild(this._createDeleteElement(obj.id));
        }

        return div;
    },


    /**
     * Creation du container des outils basiques du layer (DOM)
     *
     * @param {Object} obj - options de la couche à ajouter dans le layer switcher
     * @param {Boolean} tooltips - autoriser ou non les tooltips HTML
     * @returns {HTMLElement} container
     */
    _createBasicToolTitleElement : function (obj, tooltips) {
        let div = document.createElement("div");
        div.id = this._addUID("GPtitle_ID_" + obj.id);
        div.className = "GPtitle";

        div.appendChild(this._createLayerThumbnailElement(obj));

        div.appendChild(this._createLayerNameDivElement(obj, tooltips));

        return div;
    },


    /**
     * Creation du container du nom de la couche.
     * Ajoute le nom du producteur de donnée s'il y'en a un.
     *
     * @param {Object} obj - options de la couche à ajouter dans le layer switcher
     * @param {Boolean} tooltips - autoriser ou non les tooltips HTML
     * @returns {HTMLElement} container
     */
    _createLayerNameDivElement : function (obj, tooltips) {
        let div = document.createElement("div");
        div.id = this._addUID("GPlayerTitle_ID_" + obj.id);
        div.className = "GPlayerTitle";

        div.appendChild(this._createLayerNameElement(obj, tooltips));

        div.appendChild(this._createLayerProducerElement(obj, tooltips));

        return div;
    },

    /**
     * Creation du container des outils basiques du layer (DOM)
     *
     * @param {Object} obj - options de la couche à ajouter dans le layer switcher
     * @param {String} obj.thumbnail - Pictogramme de la couche (url ou fichier statique)
     * @returns {HTMLElement} container
     */
    _createLayerThumbnailElement : function (obj) {
        let img = document.createElement("img");
        img.id = this._addUID("GPtitleImage_ID_" + obj.id);
        img.className = "GPtitleImage";
        img.width = "40";
        img.height = "40";
        img.alt = "";

        let defaultSrc = "";

        if (checkDsfr()) {
            defaultSrc = "../../../src/packages/CSS/Controls/LayerSwitcher/img/alt-image.png";
            img.width = "44";
            img.height = "44";
        }

        img.src = obj.thumbnail ? obj.thumbnail : defaultSrc;

        return img;
    },

    /**
     * Creation du nom du layer (DOM)
     *
     * @param {Object} obj - options de la couche à ajouter dans le layer switcher
     * @param {Boolean} tooltips - active ou non les tooltips
     * @returns {HTMLElement} container
     */
    _createLayerNameElement : function (obj, tooltips) {
        // exemple :
        // <span id="GPname_ID_Layer1" class="GPlayerName" title="Quartiers prioritaires de la ville">Quartiers prioritaires de la ville</span>
        var label = document.createElement("div");
        label.id = this._addUID("GPname_ID_" + obj.id);
        label.className = "GPlayerName";
        label.title = obj.description || obj.title;
        if (tooltips) {
            label.dataset.tooltip = obj.description || obj.title;
            ToolTips.active(label);
            label.title = obj.name;
        }
        label.innerHTML = obj.title;
        if (obj.layer.config && obj.layer.config.serviceParams.id === "GPP:TMS") {
            label.innerHTML = obj.description;
        }
        return label;
    },

    /**
     * Creation du container des outils basiques du layer (DOM)
     *
     * @param {Object} obj - options de la couche à ajouter dans le layer switcher
     * @param {Boolean} tooltips - autoriser ou non les tooltips HTML
     * @returns {HTMLElement} container
     */
    _createLayerProducerElement : function (obj, tooltips) {
        let div = document.createElement("div");
        div.id = this._addUID("GPlayerProducer_ID_" + obj.id);
        div.className = "GPlayerProducer";

        div.innerHTML = obj.producer;
        if (tooltips) {
            div.dataset.tooltip = obj.producer;
            ToolTips.active(div);
        }

        return div;
    },

    _createDragNDropElement : function (obj) {
        // INFO inactif en mode classique !
        let button = document.createElement("div");
        button.id = this._addUID("GPdragndropPicto_ID_" + obj.id);
        button.className = "GPelementHidden GPlayerDragNDrop gpf-btn gpf-btn-icon-ls-draggable gpf-btn--tertiary";
        button.title = "Deplacer la couche";
        // button.setAttribute("tabindex", "0");

        let self = this;

        // Boutons pour déplacer la couche au clavier
        let divKeyboard = document.createElement("div");
        divKeyboard.className = "keyboard-navigation";

        let spanUp = document.createElement("span");
        spanUp.tabIndex = 0;
        spanUp.dataset.direction = "up";
        spanUp.title = spanUp.ariaLabel = "Déplacer la couche vers le haut";
        spanUp.className = "fr-icon-arrow-up-line fr-icon--sm";
        spanUp.onkeydown = this._onMoveElement.bind(this, true);

        let spanDown = document.createElement("span");
        spanDown.tabIndex = 0;
        spanDown.dataset.direction = "down";
        spanDown.title = spanDown.ariaLabel = "Déplacer la couche vers le bas";
        spanDown.className = "fr-icon-arrow-down-line fr-icon--sm";
        spanDown.onkeydown = this._onMoveElement.bind(this, false);

        divKeyboard.appendChild(spanDown);
        divKeyboard.appendChild(spanUp);

        button.appendChild(divKeyboard);

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
     * Creation de l'icone de visibilité du layer (DOM)
     *
     * @param {Object} obj - options de la couche à ajouter dans le layer switcher

     * @returns {HTMLElement[]} array containing input and label elements
     */
    _createVisibilityElement : function (obj) {
        var visible = (typeof obj.visibility !== "undefined") ? obj.visibility : true;

        let button = document.createElement("button");
        button.id = this._addUID("GPvisibilityPicto_ID_" + obj.id);

        let className = "gpf-btn-icon-ls-visibility gpf-btn-icon";
        if (checkDsfr()) {
            className = visible ? "fr-icon-eye-line" : "fr-icon-eye-off-line";
        }
        button.className = `GPlayerVisibility gpf-btn ${className} fr-btn fr-btn--sm gpf-btn--tertiary fr-btn--tertiary-no-outline`;

        button.title = "Afficher/masquer la couche";
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", visible);
        button.setAttribute("type","button");

        var context = this;

        let onClick = function (e) {
            var status = (e.target.ariaPressed === "true");
            e.target.setAttribute("aria-pressed", !status);

            if (checkDsfr()) {
                button.classList.toggle("fr-icon-eye-off-line", status);
                button.classList.toggle("fr-icon-eye-line", !status);
            }

            context._onVisibilityLayerClick(e);
        };

        if (button.addEventListener) {
            button.addEventListener("click", onClick);
        } else if (button.attachEvent) {
            button.attachEvent("onclick", onClick);
        }

        return button;
    },

    /**
     * Creation de l'affichage du menu des outils avancés du layer (DOM)
     *
     * @param {Object} obj - options de la couche à ajouter dans le layer switcher
     *
     * @returns {HTMLElement[]} array containing input and label elements
     */
    _createAdvancedToolShowElement : function (obj) {
        let button = document.createElement("button");
        button.id = this._addUID("GPshowAdvancedTools_ID_" + obj.id);

        button.className = "GPshowAdvancedToolPicto GPshowMoreOptionsImage GPshowMoreOptions GPshowLayerAdvancedTools gpf-btn fr-icon-arrow-down-s-line fr-btn--sm fr-btn--tertiary-no-outline";
        button.title = "Plus d'outils";
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", false);
        button.setAttribute("type", "button");

        let self = this;
        const fn = (e) => {
            let status = (e.target.ariaPressed === "true");
            e.target.setAttribute("aria-pressed", !status);
            let element = document.getElementById(self._addUID("GPadvancedTools_ID_" + obj.id));
            if (status) {
                element.classList.replace("GPelementVisible", "GPelementHidden");
                element.classList.replace("gpf-visible", "gpf-hidden");
            } else {
                element.classList.replace("GPelementHidden", "GPelementVisible");
                element.classList.replace("gpf-hidden", "gpf-visible");
            }
        };

        if (button.addEventListener) {
            button.addEventListener("click", fn);
        } else if (button.attachEvent) {
            button.attachEvent("onclick", fn);
        }

        return button;
    },

    /**
     * Creation du container des outils avancés du layer (DOM)
     *
     * @param {Object} obj - options de la couche à ajouter dans le layer switcher
     *
     * @returns {HTMLElement} container
     */
    _createAdvancedToolDivElement : function (obj) {
        // exemple :
        // <div id="GPadvancedTools_ID_Layer1" class="GPlayerAdvancedTools">
        //     <!-- _createDeleteElement -->
        //     <!-- _createInformationElement -->
        //     <!-- _createOpacityElement -->
        // </div>

        let container = document.createElement("div");
        container.id = this._addUID("GPadvancedTools_ID_" + obj.id);
        container.className = "GPelementHidden GPlayerAdvancedTools gpf-hidden";

        // Opacité
        let opacity = document.createElement("div");
        opacity.id = this._addUID("GPopacityContainer_ID_" + obj.id);
        opacity.className = "GPopacityContainer";

        let array = this._createOpacityElement(obj.id, obj.opacity);
        for (let i = 0; i < array.length; i++) {
            opacity.appendChild(array[i]);
        }

        container.appendChild(opacity);

        let btnGroups = this._createButtonsGroupElement({
            className : "GPAdvancedToolBtnsGroup",
            id : obj.id,
            left : true,
            size : "sm",
        });

        // Boutons d'actions
        if (obj.advancedTools && obj.advancedTools instanceof Array) {
            // Récupère les boutons préconfigurés
            const switcherButtons = this.constructor.switcherButtons;

            // N'ajoute aucun élément si un objet vide a été mis
            // Diffère de l'action par défaut (bouton d'info)
            if (!obj.advancedTools.length) {
                return;
            }
            obj.advancedTools.forEach(tool => {
                const key = tool.key;
                if (key && Object.values(switcherButtons).includes(key)) {
                    let fn;
                    // TODO : mettre cela dans une variable statique privée ?
                    switch (key) {
                        case switcherButtons.INFO:
                            fn = this._createInformationElement;
                            break;
                        case switcherButtons.EDIT:
                            fn = this._createEditionElement;
                            break;
                        case switcherButtons.GREYSCALE:
                            fn = this._createGreyscaleElement;
                            break;
                        case switcherButtons.EXTENT:
                            fn = this._createExtentElement;
                            break;
                    }
                    // Si une fonction a bien été trouvée, on créé le bouton qui va avec
                    if (typeof fn === "function") {
                        btnGroups.appendChild(fn.call(this, obj, tool));
                    }
                } else if (tool) {
                    btnGroups.appendChild(this._createAdvancedToolElement(obj, tool));
                }
            });

            container.appendChild(btnGroups);
        } else {
            if (checkDsfr()) {
                btnGroups.appendChild(this._createInformationElement(obj, {}));
                btnGroups.appendChild(this._createEditionElement(obj, {}));
                btnGroups.appendChild(this._createGreyscaleElement(obj, {}));
                btnGroups.appendChild(this._createExtentElement(obj, {}));
            } else {
                btnGroups.appendChild(this._createInformationElement(obj, {}));
                btnGroups.appendChild(this._createGreyscaleElement(obj, {}));
            }
            container.appendChild(btnGroups);
        }
        
        return container;
    },

    /**
     * Configure le bouton selon les options du bouton.
     * 
     * @param {HTMLButtonElement} button Bouton à configurer
     * @param {Object} tool Option du bouton (override les valeurs par défaut)
     * (Objet de type AdvancedToolOption)
     * @param {Boolean} [setClick] Optionnel. Indique si une fonction au clic doit être ajoutée.
     * Vrai par défaut.
     * @returns {HTMLButtonElement} Bouton donné en paramètre
     */
    _setAdvancedToolOptions : function (button, tool, setClick = true) {
        if (!button) {
            return;
        }

        let label;
        if (tool.label) {
            label = tool.label.toLowerCase().replaceAll(" ", "-");
        } else {
            label = tool.icon;
        }
        const iconClass = `gpf-btn-icon-ls-tools-${label}`;
        if (tool.className) {
            button.className += ` ${tool.className} `;
        }
        if (tool.icon) {
            this._setButtonIconStyle(button, iconClass, tool.icon);
        }
        if (tool.label) {
            button.innerHTML = tool.label;
        }
        if (tool.title) {
            button.title = tool.title;
            button.ariaLabel = tool.title;
        }

        if (tool.attributes) {
            // Attributs supplémentaires sur le bouton
            for (const attribute in tool.attributes) {
                if (!Object.hasOwn(tool.attributes, attribute)) {
                    continue;
                }
                const element = tool.attributes[attribute];
                button.setAttribute(attribute, element);
            }
        }

        button.setAttribute("tabindex", "0");
        button.setAttribute("type", "button");

        let self = this;

        if (setClick) {
            button.addEventListener("click", (e) => {
                self._onClickAdvancedToolsMore(e, tool.label, tool.cb);
            });
        }

        return button;
    },

    /**
     * Ajoute une icône personnalisée au bouton
     * 
     * @param {HTMLButtonElement} button Bouton à modifier
     * @param {String} iconClass Classe de l'icône. Peut être une balise svg ou une classe.
     * @param {String} icon Icône en paramètre de l'option avancée
     */
    _setButtonIconStyle : function (button, iconClass, icon) {
        let svg = false;
        const regex = /(\.|\\)/;
        if (icon) {
            if (icon.startsWith("<svg")) {
                // FIXME
                // width / height à definir si ces options ne sont pas renseignées inline
                icon = "data:image/svg+xml;base64," + btoa(icon);
                svg = true;
            } else if (!regex.test(icon)) {
                // L'icône n'est pas une URL
                button.className += icon;
            } else {
                // On ajoute l'URL en style après
                svg = true;
            }
        }

        // Ajoute le style SVG
        if (svg) {
            // Ajoute la classe au bouton
            button.classList.add(iconClass);
            if (!document.querySelector(`style[data-injected="${iconClass.toLowerCase()}"]`)) {
                // Ajoute le style au document s'il n'existe pas encore
                const style = document.createElement("style");
                style.dataset.injected = iconClass.toLowerCase();
                style.textContent = `
                    .${iconClass.toLowerCase()}::before {
                        width: 100%;
                        height: 100%;
                        -webkit-mask-image: url('${icon}');
                        -webkit-mask-repeat: no-repeat;
                        -webkit-mask-position: center;

                        mask-image: url('${icon}');
                        mask-repeat: no-repeat;
                        mask-position: center;
                    }
                `;
                document.head.appendChild(style);
            }
        }
    },

    /**
     * Creation de l'icone de suppression du layer (DOM)
     *
     * @param {String} id - ID de la couche à ajouter dans le layer switcher
     *
     * @returns {HTMLElement} container
     */
    _createDeleteElement : function (id) {
        let button = document.createElement("button");
        button.id = this._addUID("GPremove_ID_" + id);
        
        // Icône et type de bouton
        let className = "gpf-btn-icon-ls-remove gpf-btn-icon";
        if (checkDsfr()) {
            className = "fr-icon-delete-line";
        }
        button.className = `GPlayerRemove gpf-btn ${className} fr-btn fr-btn--sm gpf-btn--tertiary fr-btn--tertiary-no-outline`;
        button.title = "Supprimer la couche";
        button.layerId = id;

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
     * @param {Object} obj - Objet de la couche à configurer
     * @param {String} obj.id - ID de la couche à ajouter dans le layer switcher
     * @param {Boolean} obj.editable - mode editable
     * @param {Boolean} obj.tms - tms ou non
     * @param {Array} obj.styles - styles des tms
     * @param {Object} tool Option du bouton (override les valeurs par défaut)
     * (Objet de type AdvancedToolOption)
     * 
     * @returns {HTMLElement} container
     */
    _createEditionElement : function (obj, tool) {
        let id = obj.id;
        let editable = obj.editable;
        let tms = (obj.layer.config && obj.layer.config.serviceParams.id === "GPP:TMS");
        let styles = tms ? obj.layer.config.styles : null;

        let button = document.createElement("button");
        button.id = this._addUID("GPedit_ID_" + id);
        button.layerId = id;

        // Options du bouton
        let icon = "gpf-btn-icon-ls-edit gpf-btn-icon";
        let label;
        if (checkDsfr()) {
            icon = "fr-icon-pencil-line";
            label = "Style";
        }
        let className = `GPlayerEdit gpf-btn gpf-btn--tertiary fr-btn fr-btn--tertiary-no-outline`;

        const options = {
            icon : icon,
            label : label,
        };

        // Override les fonctions par défaut
        const toolOptions = Utils.assign(options, tool);
        // Ajoute la classe et n'écrase pas les classes nécessaires
        toolOptions.className = className;
        // Ajoute la classe et n'écrase pas les classes nécessaires
        if (tool && tool.className) {
            toolOptions.className += ` ${tool.className}`;
        }
        
        // Mets les attributs du bouton
        this._setAdvancedToolOptions(button, toolOptions, false);

        // hack pour garder un emplacement vide en mode desktop
        // et cacher l'entrée en mode mobile
        if (!editable || (tms && styles.length === 1)) {
            button.disabled = true;
        }

        let context = this;
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
     * @param {Object} obj - Objet de la couche à configurer
     * @param {String} obj.id - ID de la couche à ajouter dans le layer switcher
     * @param {String} obj.title - titre
     * @param {String} obj.description - description
     * @param {Object} tool Option du bouton (override les valeurs par défaut)
     * (Objet de type AdvancedToolOption)
     * 
     * @returns {HTMLElement} container
     */
    _createInformationElement : function (obj, tool) {
        // exemple :
        // <div id="GPinfo_ID_Layer1" class="GPlayerInfo" title="Informations/légende" onclick="GPopenLayerInfo(this);"></div>
        let id = obj.id;
        let title = obj.title;
        let description = obj.description;

        let button = document.createElement("button");
        button.id = this._addUID("GPinfo_ID_" + id);
        button.layerId = id;

        // Options du bouton
        let icon = "gpf-btn-icon-ls-info gpf-btn-icon";
        let label;
        if (checkDsfr()) {
            icon = "fr-icon-information-line";
            label = "Infos";
        }
        let className = `GPlayerInfo GPlayerInfoClosed gpf-btn gpf-btn--tertiary fr-btn fr-btn--tertiary-no-outline`;

        const options = {
            icon : icon,
            label : label,
        };

        const toolOptions = Utils.assign(options, tool);
        toolOptions.className = className;
        // Ajoute la classe et n'écrase pas les classes nécessaires
        if (tool && tool.className) {
            toolOptions.className += ` ${tool.className}`;
        }
        
        // Permet d'override les valeurs par défaut du bouton
        this._setAdvancedToolOptions(button, toolOptions, false);

        // button.title = "Informations/légende";

        if (!title || !description) {
            button.disabled = true;
        }
        // add event on click
        var context = this;
        if (button.addEventListener) {
            button.addEventListener(
                "click",
                function (e) {
                    context._onOpenLayerInfoClick(e);
                }
            );
        } else if (button.attachEvent) {
            // internet explorer
            button.attachEvent(
                "onclick",
                function (e) {
                    context._onOpenLayerInfoClick(e);
                }
            );
        }

        return button;
    },

    /**
     * Creation de l'icone de n&b du layer (DOM)
     *
     * @param {Object} obj - Objet de la couche à configurer
     * @param {String} obj.id - ID de la couche à ajouter dans le layer switcher
     * @param {Boolean} obj.grayable - le mode grisable est il  possible pour ce type de couche
     * @param {Boolean} obj.grayscale - option grisée de la couche
     * @param {Object} tool Option du bouton (override les valeurs par défaut)
     * (Objet de type AdvancedToolOption)
     *
     * @returns {HTMLElement} container
     */
    _createGreyscaleElement : function (obj, tool) {
        // exemple :
        // <div id="GPgreyscale_ID_Layer1" class="GPlayerBreyscale" title="Noir & blanc" onclick="GPtoggleGreyscale(this);"></div>
        let id = obj.id;
        let grayable = obj.grayable;
        let grayscale = obj.grayscale;
        tool = tool ? tool : {};

        var _grayscale = (typeof grayscale !== "undefined") ? grayscale : false;

        let button = document.createElement("button");
        button.id = this._addUID("GPgreyscale_ID_" + id);
        button.layerId = id;

        // Options du bouton
        let icon = "gpf-btn-icon-ls-greyscale gpf-btn-icon";
        let label;
        if (checkDsfr()) {
            icon = "fr-icon-contrast-line";
            label = "Noir et blanc";
        }
        let className = `GPlayerGreyscale GPlayerGreyscaleOff gpf-btn gpf-btn--tertiary fr-btn fr-btn--tertiary-no-outline`;

        const options = {
            icon : icon,
            label : label,
        };

        const toolOptions = Utils.assign(options, tool);
        toolOptions.className = className;
        // Ajoute la classe et n'écrase pas les classes nécessaires
        if (tool && tool.className) {
            toolOptions.className += ` ${tool.className}`;
        }
        
        // Permet d'override les valeurs par défaut du bouton
        this._setAdvancedToolOptions(button, toolOptions, false);

        if (_grayscale) {
            button.classList.replace("GPlayerGreyscaleOff", "GPlayerGreyscaleOn");
        }

        button.setAttribute("aria-pressed", _grayscale);

        // hack pour garder un emplacement vide
        if (!grayable) {
            button.disabled = true;
        }

        // add event on click
        var context = this;
        if (button.addEventListener) {
            button.addEventListener(
                "click",
                function (e) {
                    var status = (e.target.ariaPressed === "true");
                    e.target.setAttribute("aria-pressed", !status);
                    context._onToggleLayerGreyscaleClick(e);
                }
            );
        } else if (button.attachEvent) {
            // internet explorer
            button.attachEvent(
                "onclick",
                function (e) {
                    var status = (e.target.ariaPressed === "true");
                    e.target.setAttribute("aria-pressed", !status);
                    context._onToggleLayerGreyscaleClick(e);
                }
            );
        }

        return button;
    },

    /**
     * Creation de l'icone de gestion de l'opacité du layer (DOM)
     *
     * @param {String} id - ID de la couche à ajouter dans le layer switcher
     * @param {Number} opacity - Valeur de l'opacité
     * 
     * @returns {HTMLElement[]} Tableau de 2 containers
     */
    _createOpacityElement : function (id, opacity) {
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
     * @param {Object} obj - Objet de la couche à configurer
     * @param {String} obj.id - ID de la couche à ajouter dans le layer switcher
     * @param {Object} tool Option du bouton (override les valeurs par défaut)
     * (Objet de type AdvancedToolOption)
     *
     * @returns {HTMLElement} container
     */
    _createExtentElement : function (obj, tool) {
        let id = obj.id;
        // FIXME inactif en mode classique !
        let button = document.createElement("button");
        button.id = this._addUID("GPextent_ID_" + id);
        button.layerId = id;

        tool = tool ? tool : {};

        // Options du bouton
        let icon = "gpf-btn-icon-ls-extent gpf-btn-icon";
        let label;
        if (checkDsfr()) {
            icon = "fr-icon-zoom-in-line";
            label = "Recentrer";
        }
        let className = `GPelementHidden GPlayerExtent gpf-btn--tertiary gpf-btn fr-btn fr-btn--tertiary-no-outline`;

        const options = {
            icon : icon,
            label : label,
        };

        const toolOptions = Utils.assign(options, tool);
        toolOptions.className = className;
        // Ajoute la classe et n'écrase pas les classes nécessaires
        if (tool && tool.className) {
            toolOptions.className += ` ${tool.className}`;
        }
        
        // Permet d'override les valeurs par défaut du bouton
        this._setAdvancedToolOptions(button, toolOptions, false);

        button.setAttribute("aria-pressed", true);

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
     * Création d'un bouton d'outil externe
     * 
     * @param {Object} obj - Objet de la couche à configurer
     * @param {String} obj.id - ID de la couche à ajouter dans le layer switcher
     * @param {Object} tool Option du bouton (override les valeurs par défaut)
     * (Objet de type AdvancedToolOption)
     *
     * @returns {HTMLElement} container
     */
    _createAdvancedToolElement : function (obj, tool) {
        let id = obj.id;
        // FIXME inactif en mode classique !
        let button = document.createElement("button");
        const idLabel = tool.label.toLowerCase().replaceAll(" ", "-");
        button.id = this._addUID("GPtools-" + idLabel + "_ID_" + id);
        button.layerId = id;

        tool = tool ? tool : {};

        // Options du bouton
        let icon = tool.icon;
        let label;
        if (checkDsfr()) {
            label = tool.label;
        }
        let className = `GPlayerTools gpf-btn gpf-btn--tertiary fr-btn fr-btn--tertiary-no-outline`;

        const options = {
            icon : icon,
            label : label,
        };

        const toolOptions = Utils.assign(options, tool);
        toolOptions.className = className;
        // Ajoute la classe et n'écrase pas les classes nécessaires
        if (tool && tool.className) {
            toolOptions.className += ` ${tool.className}`;
        }

        // Permet d'override les valeurs par défaut du bouton
        this._setAdvancedToolOptions(button, toolOptions, false);

        Object.assign(button.style, tool.styles);

        // Désactive le bouton si le type de couche n'est pas supporté
        if (tool.accepted && tool.accepted.length) {
            const layer = obj.layer;
            const layerTypeName = layer.constructor.name;
            let disabled = true;
            for (const type of tool.accepted) {
                // Vérifie si le type est accepté
                if ((typeof type === "string" && type === layerTypeName) || (type.prototype instanceof BaseLayer && layer instanceof type)) {
                    disabled = false;
                    break;
                }
            }
            button.disabled = disabled;
        }

        var self = this;
        if (button.addEventListener) {
            // button.addEventListener("click", tool.cb.bind(self));
            button.addEventListener("click", (e) => {
                self._onClickAdvancedToolsMore(e, tool.label, tool.cb);
            });
        } else if (button.attachEvent) {
            // button.attachEvent("onclick", tool.cb.bind(self));
            button.attachEvent("onclick", (e) => {
                self._onClickAdvancedToolsMore(e, tool.label, tool.cb);
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
     * @returns {HTMLElement} container
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
     * @returns {HTMLElement} container
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
