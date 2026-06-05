import checkDsfr from "../Utils/CheckDsfr";
import Sortable from "sortablejs";

var ControlListDOM = {

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
     * @returns {HTMLElement} DOM element
     */
    _createMainContainerElement : function () {
        var container = document.createElement("div");
        container.id = this._addUID("GPcontrolList");
        container.className = "GPwidget gpf-widget gpf-widget-button gpf-mobile-fullscreen";
        return container;
    },

    // ################################################################### //
    // ################# Methods to display Main Panel ################### //
    // ################################################################### //

    /**
     * Show control
     * see event !
     *
     * @returns {HTMLElement} DOM element
     */
    _createShowControlListPictoElement : function () {
        // contexte d'execution
        var context = this;

        var button = document.createElement("button");
        // INFO: Ajout d'une SPAN pour enlever des marges de 6px dans CHROMIUM (?!)
        var span = document.createElement("span");
        button.appendChild(span);
        button.id = this._addUID("GPshowControlListPicto");
        button.classList.add("GPshowOpen", "GPshowAdvancedToolPicto", "GPshowControlListPicto");
        button.classList.add("gpf-btn", "gpf-btn--tertiary", "gpf-btn-icon", "gpf-btn-icon-controllist");
        // button.classList.add("icon--ri", "icon--ri--list-check");
        button.classList.add("fr-btn", "fr-btn--tertiary");
        button.setAttribute("aria-label", "Afficher plus");
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", false);
        button.setAttribute("type", "button");

        // gestionnaire d'evenement :
        // on ouvre le menu
        button.addEventListener("click", function (e) {
            var status = (e.target.ariaPressed === "true");
            e.target.setAttribute("aria-pressed", !status);
            context.onShowControlListPanelClick(e);
        });

        return button;
    },


    // ################################################################### //
    // ################## Methods to display Inputs Panel ################ //
    // ################################################################### //

    /**
     * Create Container Panel
     * @returns {HTMLElement} DOM element
     */
    _createControlListPanelElement : function () {
        var dialog = document.createElement("dialog");
        dialog.id = this._addUID("GPcontrolListPanel");
        dialog.className = "GPpanel gpf-panel fr-modal";

        return dialog;
    },

    _createControlListPanelDivElement : function () {
        var div = document.createElement("div");
        div.className = "gpf-panel__body fr-modal__body";
        return div;
    },

    /**
     * Create Header Panel
     *
     * @returns {HTMLElement} DOM element
     */
    _createControlListPanelHeaderElement : function () {
        var self = this;

        var container = document.createElement("div");
        container.className = "GPpanelHeader gpf-panel__header fr-modal__header fr-pb-0";

        var div = document.createElement("div");
        div.className = "GPpanelTitle gpf-panel__title fr-modal__title fr-pt-4w";
        div.innerHTML = "Mes outils";
        container.appendChild(div);

        var divClose = document.createElement("button");
        divClose.id = this._addUID("GPcontrolListPanelClose");
        divClose.className = "GPpanelClose GPcontrolListPanelClose gpf-btn gpf-btn-icon-close fr-btn--close fr-btn fr-btn--tertiary-no-outline fr-m-1w";
        divClose.title = "Fermer le panneau";

        // Link panel close / visibility checkbox
        if (divClose.addEventListener) {
            divClose.addEventListener("click", function () {
                document.getElementById(self._addUID("GPshowControlListPicto")).click();
            }, false);
        } else if (divClose.attachEvent) {
            divClose.attachEvent("onclick", function () {
                document.getElementById(self._addUID("GPshowControlListPicto")).click();
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
     * Create Content Panel
     *
     * @returns {HTMLElement} DOM element
     */
    _createControlListPanelContentElement : function () {
        var container = document.createElement("div");
        container.className = "gpf-panel__content fr-modal__content fr-p-2v";

        let listContainer = document.createElement("ul");
        listContainer.classList.add("fr-m-0", "fr-p-0");
        container.appendChild(listContainer);

        return container;
    },

    /**
     * Create Footer Panel
     *
     * @param {HTMLElement} controlCatalogelement - DOM element
     * @returns {HTMLElement} DOM element
     */
    _createControlListPanelFooterElement : function (controlCatalogelement) {
        var container = document.createElement("div");
        container.className = "GPpanelFooter gpf-panel__footer fr-modal__footer";
        var addToolsBtn = document.createElement("button");
        addToolsBtn.classList.add("gpf-btn", "gpf-btn--tertiary", "fr-btn", "fr-btn--tertiary");
        addToolsBtn.innerText = "+ Ajouter plus d'outils";
        addToolsBtn.addEventListener("click", function () {
            controlCatalogelement.click();
        });
        container.appendChild(addToolsBtn);
        return container;
    },

    /**
     * Create div for control
     *
     * @param {ol.Control} control control to add in the panel
     * @returns {HTMLElement} DOM element
     */
    _createControlListPanelControl : function (control) {
        let controlContainer;
        try {
            controlContainer = control.getContainer();
        } catch (e) {
            controlContainer = control.container;
        }
        let listElement = document.createElement("li");
        listElement.classList.add("gpf-list-element", "fr-py-0-5v");
        listElement.dataset.name = control.CLASSNAME;
        listElement.setAttribute("role", "button");
        listElement.setAttribute("tabindex", 0);

        let showButton = controlContainer.querySelector(".GPshowOpen");
        let btnWidget = showButton.cloneNode();
        // is active ?
        let isActive = btnWidget.getAttribute("aria-pressed") === "true";
        if (isActive) {
            listElement.classList.add("gpf-list-element--active");
        }

        this._registerControlListStateSync(showButton, listElement);

        // icone (pas dsfr, donc copie depuis le bouton du widget)
        let icon = document.createElement("span");
        icon.className = btnWidget.className;
        icon.classList.add("gpf-list-element-icon", "fr-mx-2v");
        listElement.appendChild(icon);

        // button text
        let listText = document.createElement("span");
        listText.classList.add("gpf-list-element-text");
        if (showButton.ariaLabel) {
            listText.innerText = showButton.ariaLabel;
        } else if (controlContainer.querySelector(".GPpanelTitle")) {
            listText.innerText = controlContainer.querySelector(".GPpanelTitle").innerText;
        } else if (controlContainer.querySelector("[class^='gpf-btn-header-']")) {
            listText.innerText = controlContainer.querySelector("[class^='gpf-btn-header-']").title;
        }
        listElement.appendChild(listText);

        let handler = () => {
            let isActive = listElement.classList.contains("gpf-list-element--active");
            listElement.parentNode.querySelectorAll(".gpf-list-element").forEach((el) => {
                el.classList.remove("gpf-list-element--active");
            });
            if (!isActive) {
                listElement.classList.add("gpf-list-element--active");
            }
            // click sur le bouton du control correspondant
            showButton.click();

            // on force la fermeture de controlllist si encore ouvert
            if (this._pictoControlListButton.getAttribute("aria-pressed") === "true") {
                this._pictoControlListButton.click();
            }
        };

        listElement.addEventListener("click", handler);
        listElement.addEventListener("keydown", (e) => {
            if (["Enter", "Space"].includes(e.code)) {
                handler();
            }
        });
        return listElement;
    },

    _createAccessibleSortableElement : function () {
        let handle = document.createElement("div");
        handle.className = "GPelementHidden GPlayerDragNDrop gpf-btn gpf-btn-icon-ls-draggable gpf-btn--tertiary";
        handle.title = "Deplacer l’outil";

        // Boutons pour déplacer la couche au clavier
        let divKeyboard = document.createElement("div");
        divKeyboard.className = "keyboard-navigation";

        let spanUp = document.createElement("span");
        spanUp.tabIndex = 0;
        spanUp.dataset.direction = "up";
        spanUp.title = spanUp.ariaLabel = "Déplacer l’outil vers le haut";
        spanUp.className = "fr-icon-arrow-up-line fr-icon--sm";
        spanUp.onkeydown = (e) => this._onMoveElement(true, e);

        let spanDown = document.createElement("span");
        spanDown.tabIndex = 0;
        spanDown.dataset.direction = "down";
        spanDown.title = spanDown.ariaLabel = "Déplacer l’outil vers le bas";
        spanDown.className = "fr-icon-arrow-down-line fr-icon--sm";
        spanDown.onkeydown = (e) => this._onMoveElement(false, e);

        divKeyboard.appendChild(spanDown);
        divKeyboard.appendChild(spanUp);

        handle.appendChild(divKeyboard);

        // stop click events
        handle.addEventListener("click", (e) => {
            e.stopImmediatePropagation();
        });

        return handle;
    },

    /**
     * Écouteur d'événement pour modifier la position
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
            this._moveElement(event.currentTarget.closest(".gpf-list-element--sortable"), direction);

            // Change le focus dans le cas où c'est le premier / dernier élément
            if (window.getComputedStyle(event.currentTarget).visibility == "hidden") {
                event.currentTarget.parentNode.querySelector(`[data-direction=${oppositeDirection}]`).focus();
            } else {
                event.currentTarget.focus();
            }
        }
    },

    /**
     * Fonction permettant de déplacer un outil au clavier
     * @param {HTMLElement} element Élément à déplacer
     * @param {up|down} direction Direction dans laquelle déplacer l'outil
     * @returns {Boolean} Vrai si l'opération a fonctionnée.
     */
    _moveElement : function (element, direction) {
        const sortable_list = this._sortables[0];
        if (["up", "down"].includes(direction) == false) {
            return false;
        }
        if (typeof element.dataset.name == "undefined") {
            return false;
        }

        // Attribut pour réorganiser après
        let sortableId = element.dataset.name;
        let order = sortable_list.toArray();
        let index = order.indexOf(sortableId);
        const originalLength = order.length;

        // Retrait de l'objet à déplacer
        order.splice(index, 1);

        // Déplace la couche à la bonne position
        let newIndex;
        if (direction == "down") {
            newIndex = (index === originalLength - 1) ? 0 : index + 1;
        } else if (direction == "up") {
            newIndex = (index === 0) ? order.length : index - 1;
        }
        order.splice(newIndex, 0, sortableId);

        // Applique l'opéaration de tri
        sortable_list.sort(order, true);
        // callback
        this._onSortedEnd();

        return true;
    },

    _sortables : [],

    /**
     * https://github.com/SortableJS/Sortable?tab=readme-ov-file#options
     * @param {HTMLElement} element - element to make sortable
     * @returns {Object} Sortable instance
     * @type {function(HTMLElement): Object}
     */
    _createSortableElement : function (element) {
        if (this._sortables.length) {
            this._sortables[0].destroy();
            this._sortables = [];
        }
        // create sortable
        const sortable = Sortable.create(element, {
            animation : 150,
            handle : ".gpf-btn-icon-ls-draggable", // handle
            draggable : ".gpf-list-element--sortable", // item
            ghostClass : "gpf-list-element--ghost",
            dragClass : "gpf-list-element--drag",
            dataIdAttr : "data-name",
            onEnd : () => {
                this._onSortedEnd();
            },
        });
        this._sortables = [sortable];

        // create accessible handles
        let listElements = [...element.children];
        listElements.forEach((listElement) => {
            listElement.classList.add("gpf-list-element--sortable");
            listElement.appendChild(this._createAccessibleSortableElement());
        });

        return sortable;
    },

};

export default ControlListDOM;
