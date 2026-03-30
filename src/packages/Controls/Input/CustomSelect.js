import Helper from "../../Utils/Helper.js";
import "../../CSS/Controls/Input/GPFcustomSelect.scss";
import DefaultInput from "./DefaultInput.js";
import { isElementInView, isScrollable, maintainScrollVisibility } from "../../Utils/Scroll.js";

/**
 * @typedef {Object} CustomSelectConfig
 * @property {string} label Le label de l'input
 * @property {string} [labelInfo] Info supplémentaire du label (ex: unité)
 * @property {string} property La propriété flat style correspondante
 * @property {string} [type] Type de l'input
 * @property {Boolean} [disabled=false] Si vrai, désactive l'input
 * @property {Object<string, string>} options Les options de la sélection (valeur: libellé)
 */

/**
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/} Pour voir l'inspiration pour les contrôles clavier
 */
class CustomSelect extends DefaultInput {

    /**
     * Constructeur du contrôle CustomSelect
     * @param {CustomSelectConfig} options Options du contrôle
     */
    constructor (options = {}) {
        super(options);
    }

    /**
     * @param {CustomSelectConfig} options Options du contrôle
     * @override
     */
    _initialize (options) {
        super._initialize(options);
        options.options ||= {};
        this.type = options.type || "";
        this.baseOptionId = Helper.getUid("input-style__option");
        this.open = false;

        /**
         * Liste des actions possibles au clavier
         */
        this.selectActions = {
            Close : 0, // Ferme l'input
            CloseSelect : 1, // Ferme l'input et sélectionne l'option
            Open : 2, // Ouvre l'input
            First : 3, // Sélectionne la première option
            Last : 4, // Sélectionne la dernière option
            Down : 5, // Sélectionne l'option positionné en dessous
            Up : 6, // Sélectionne l'option positionné au dessus
            PageDown : 7, // Décale la sélection vers le bas (plusiseurs lignes)
            PageUp : 8, // Décale la sélection vers le haut (plusiseurs lignes)
            Left : 9, // Sélectionne l'option positionné à gauche
            Right : 10, // Sélectionne l'option positionné à droite
            BeginRow : 11, // Sélectionne l'option positionné au début de la ligne
            EndRow : 12, // Sélectionne l'option positionné à la fin de la ligne
            Select : 13, // Sélectionne l'option choisie
            Type : 14, // Écriture au clavier
        };

        this.pageSize = 6;

        this.isDragging = false;
        this.startY;
        this.startBottom;

        this.dragFct = this.drag.bind(this);
        this.stopDraggingFct = this.stopDragging.bind(this);

        this.choices = Object.entries(options.options);
        this.options = options.options;
    }


    /**
     * @param {CustomSelectConfig} options Options du contrôle
     * @override
     */
    _initContainer (options) {
        super._initContainer(options);
        this.element.classList.add("input-style-select");

        // Lie le label à l'input
        const optionsContainerId = Helper.getUid("option-container");
        const btnId = Helper.getUid("input-style__container");
        this.label.htmlFor = btnId;

        // Première valeur : correspond à l'élément de base
        const value = Object.keys(options.options)[0];

        // Création du container de l'input, avec les rôles nécessaire pour l'accessibilité
        this.inputContainer.id = btnId;
        this.inputContainer.className = "input-style__container";
        this.inputContainer.ariaExpanded = false;
        this.inputContainer.role = "combobox";
        this.inputContainer.ariaHasPopup = "listbox";
        this.inputContainer.setAttribute("aria-activedescendant", "");
        this.inputContainer.setAttribute("aria-labelledby", this.label.id);
        this.inputContainer.setAttribute("aria-controls", optionsContainerId);

        this.inputContainer.dataset.type = this.type;
        this.inputContainer.dataset.value = value;
        this.inputContainer.ariaSelected = true;

        // Pour les type = color seulement (provisoire)
        this.inputContainer.style.setProperty("--bg-color", value);

        // Élément choisi (visible en permanence)
        this.choice = document.createElement("span");
        this.choice.className = "input-style__option-value";
        this.choice.ariaHidden = true;
        this.inputContainer.appendChild(this.choice);

        // Conteneur des options
        this.optionsContainer = document.createElement("div");
        this.optionsContainer.id = optionsContainerId;
        this.optionsContainer.tabIndex = -1;
        this.optionsContainer.role = "listbox";
        this.optionsContainer.className = "input-style__options-container";

        // Mode mobile : drag possible de la modale d'options
        this.dragDiv = document.createElement("div");
        this.dragDiv.className = "input-style__options-container-drag";
        this.dragHandle = document.createElement("div");
        this.dragHandle.className = "input-style__options-container-drag-handle";
        this.dragDiv.appendChild(this.dragHandle);
        this.optionsContainer.appendChild(this.dragDiv);

        // Là où seront placées les options
        this.optionsContent = document.createElement("div");
        this.optionsContent.className = "input-style__options-container-content";
        this.optionsContent.tabIndex = -1;
        this.optionsContainer.appendChild(this.optionsContent);

        // Ajoute les choix dans le conteneur des options
        let i = 0;
        for (const [key, value] of this.choices) {
            const option = this.addChoice(key, value, i);
            i++;
            this.optionsContent.appendChild(option);
        }

        // Ajout des éléments à l'input
        this.element.appendChild(this.inputContainer);
        this.element.appendChild(this.optionsContainer);
    }

    /**
     * @param {Boolean} bool Si vrai, désactive le contrôle
     * @override
     */
    setDisabled (bool) {
        super.setDisabled(bool);
        if (bool) {
            this.inputContainer.tabIndex = -1;
            this.inputContainer.ariaDisabled = true;
        } else {
            this.inputContainer.tabIndex = 0;
            this.inputContainer.ariaDisabled = false;
        }
    }

    /**
     * @param {CustomSelectConfig} options Options du contrôle
     * @override
     */
    _initEvents (options) {
        super._initEvents(options);

        // Recréé un dispositif similaire au label d'un input
        this.label.addEventListener("click", () => {
            !this.get("disabled") && this.inputContainer.focus({ focusVisible : true });
        });

        // Gestion du focus out / blur
        this.inputContainer.addEventListener("blur", this.onComboBlur.bind(this));
        this.optionsContainer.addEventListener("focusout", this.onComboBlur.bind(this));

        // Change la valeur du aria expended au clic sur l'input
        this.inputContainer.addEventListener("click", () => {
            !this.get("disabled") && this.collapse(this.inputContainer.ariaExpanded === "true");
        });

        // Gère le clic sur une option
        this.optionsContainer.addEventListener("mousedown", this.onComboClick.bind(this));

        // Gère la navigation clavier
        this.inputContainer.addEventListener("keydown", this.onComboKeyDown.bind(this));

        // Sélectionne une option lorsque la valeur de l'input change
        this.input.addEventListener("change", (e) => {
            if (e.target.value !== undefined) {
                // Trouve l'index
                let index = this.choices.findIndex((arr) => arr[0] === e.target.value);
                // Cas où la valeur n'est pas trouvé : premier élément
                index = index === -1 ? 0 : index;
                this.selectOption(index, true);
            }
        });

        // Pour le mobile / petits écrans
        this.dragDiv.addEventListener("mousedown", this.startDragging.bind(this));
        this.dragDiv.addEventListener("touchstart", this.startDragging.bind(this));
    }

    /**
     * Mets l'élément en "aria-selected = true" et déselectionne l'élément courant.
     * @param {Element} elem Élément à sélectionner
     */
    setCurrentOption (elem) {
        const current = this.getCurrentOption();
        if (current) {
            current.ariaSelected = false;
        }
        if (elem) {
            this.inputContainer.setAttribute("aria-activedescendant", elem.id);
            elem.ariaSelected = true;
        }
    }

    /**
     * Retourne l'élément sélectionné dans les options
     * @returns {Element | null} Item sélectionné
     */
    getCurrentOption () {
        return this.optionsContent.querySelector("[aria-selected=true]");
    }

    /**
     * Commence à dragger la modale
     * @param {MouseEvent|TouchEvent} e Événement à gérer
     */
    startDragging (e) {
        e.preventDefault();
        this.isDragging = true;
        if (e.type === "mousedown") {
            this.startY = e.clientY;
        } else if (e.type === "touchstart") {
            // Pour le mobile
            this.startY = e.touches[0].clientY;
        }

        // Pour ne pas dépasser la valeur de la modale
        this.startHeight = parseInt(getComputedStyle(this.optionsContent).height);

        // Ajout d'événements qui seront enlevés via stopDragging
        document.addEventListener("mousemove", this.dragFct);
        document.addEventListener("mouseup", this.stopDraggingFct);
        document.addEventListener("touchmove", this.dragFct);
        document.addEventListener("touchstop", this.stopDraggingFct);
    }

    /**
     * Bouge la modale
     * @param {MouseEvent|TouchEvent} e Événement à gérer
     */
    drag (e) {
        if (!this.isDragging) {
            return;
        };
        let clientY;
        // Le client Y est différent en fonction de l'événement
        if (e.type === "mousemove") {
            clientY = e.clientY;
        } else if (e.type === "touchmove") {
            // Pour le mobile
            clientY = e.touches[0].clientY;
        }
        const deltaY = clientY - this.startY;
        // Prends la plus petite valeur entre la valeur initiale et le delta actuel;
        const height = Math.min(this.initialHeight, Math.max(this.startHeight - deltaY, 0));
        if (height < 50) {
            this.stopDragging();
            setTimeout(() => this.collapse(true), 300);
        }
        else {
            this.optionsContent.style.height = height + "px";
        }
    }

    /**
     * Arrête de bouger la modale
     */
    stopDragging () {
        this.isDragging = false;
        // Enlève les écouteurs d'événements
        document.removeEventListener("mousemove", this.dragFct);
        document.removeEventListener("mouseup", this.stopDraggingFct);
        // Pour le mobile
        document.removeEventListener("touchmove", this.dragFct);
        document.removeEventListener("touchstop", this.stopDraggingFct);
    }

    /**
     * Renvoie une action en fonction de l'événement de clavier.
     * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/} Pour plus d'info
     * @param {KeyboardEvent} event Événement à gérer
     * @param {Boolean} menuOpen Vrai si le menu est ouvert
     * @returns {Number} Nombre correspondant à l'action
     */
    getActionFromKey (event, menuOpen) {
        const { key, altKey, ctrlKey, metaKey } = event;
        // metakey : Command pour mac
        // Clés relevant de l'action d'ouverture
        const openKeys = ["ArrowDown", "ArrowUp", "Enter", " "];
        // Gère l'ouverture si le menu est fermé
        if (!menuOpen && openKeys.includes(key)) {
            return this.selectActions.Open;
        }

        // Home et end change l'option que ça soit fermé ou ouvert
        if (key === "Home" && ctrlKey || key === "Home" && metaKey) {
            return this.selectActions.First;
        }
        if (key === "Home") {
            // Pour le cas "grid"
            return this.selectActions.BeginRow;
        }
        if (key === "End" && ctrlKey || key === "End" && metaKey) {
            return this.selectActions.Last;
        }
        if (key === "End") {
            // Pour le cas "grid"
            return this.selectActions.EndRow;
        }

        // Pas pris en compte pour le moment : écriture au clavier
        if (
            key === "Backspace" ||
            key === "Clear" ||
            (key.length === 1 && key !== " " && !altKey && !ctrlKey && !metaKey)
        ) {
            return this.selectActions.Type;
        }

        // Gère les clés si le menu est ouvert
        // Voir selectActions pour savoir ce que chaque action fait
        if (menuOpen) {
            if (key === "ArrowUp" && altKey) {
                return this.selectActions.CloseSelect;
            } else if (key === "ArrowDown" && !altKey) {
                return this.selectActions.Down;
            } else if (key === "ArrowUp") {
                return this.selectActions.Up;
            } else if (key === "ArrowLeft") {
                // Pour le cas "grid"
                return this.selectActions.Left;
            } else if (key === "ArrowRight") {
                // Pour le cas "grid"
                return this.selectActions.Right;
            } else if (key === "PageUp") {
                return this.selectActions.PageUp;
            } else if (key === "PageDown") {
                return this.selectActions.PageDown;
            } else if (key === "Escape") {
                return this.selectActions.Close;
            } else if (key === "Enter" || key === " ") {
                return this.selectActions.CloseSelect;
            }
        }
    }

    /**
     * Gère l'événement `click` sur la liste de choix / le bouton select
     * @param {MouseEvent} event Événement à gérer
     */
    onComboClick (event) {
        // Vérifie si la liste est ouverte et que l'on a bien cliqué sur le conteneur des options
        if (this.open && event.target === this.optionsContainer) {
            this.collapse(true);
        }
    }

    /**
     * Gère l'événement `blur` ou `focusout` sur la liste de choix / le bouton select
     * @param {FocusEvent} event Événement à gérer
     */
    onComboBlur (event) {
        // Pas d'action si relatedTarget est dans la liste des options ou sur le bouton
        if (this.optionsContainer.contains(event.relatedTarget) || this.inputContainer.contains(event.relatedTarget)) {
            return;
        }

        // Choisis l'option actuelle et ferme la modale
        if (this.open) {
            this.selectOption(this.activeIndex);
            this.collapse(true);
        }
    }

    /**
     * Fonction gérant les événements clavier pour la liste
     * @param {KeyboardEvent} event Événement de clavier à gérer
     * @returns {void}
     */
    onComboKeyDown (event) {
        const { key } = event;
        const max = this.choices.length - 1;
        // Récupère l'action
        const action = this.getActionFromKey(event, this.open);

        if (this.get("disabled")) {
            return;
        }

        switch (action) {
            case this.selectActions.Last:
            case this.selectActions.First:
            case this.selectActions.BeginRow:
            case this.selectActions.EndRow:
                this.collapse(false);
            // intentional fallthrough
            case this.selectActions.Down:
            case this.selectActions.Up:
            case this.selectActions.PageUp:
            case this.selectActions.PageDown:
            case this.selectActions.Left:
            case this.selectActions.Right:
                event.preventDefault();
                return this.onOptionChange(
                    this.getUpdatedIndex(this.activeIndex, max, action)
                );
            case this.selectActions.CloseSelect:
                event.preventDefault();
                this.selectOption(this.activeIndex);
            // intentional fallthrough
            case this.selectActions.Close:
                event.preventDefault();
                return this.collapse(true);
            case this.selectActions.Type:
                return this.onComboType(key);
            case this.selectActions.Open:
                event.preventDefault();
                return this.collapse(false);
        }
    }
    /**
     * Ferme le panneau de sélection
     * @param {Boolean} bool Vrai si on doit fermer le panneau
     */
    collapse (bool) {
        // Enlève la hauteur mise en mode mobile
        this.optionsContent.style.removeProperty("height");

        const activeID = bool ? "" : `${this.baseOptionId}-${this.activeIndex}`;
        this.open = !bool;
        this.inputContainer.setAttribute("aria-activedescendant", activeID);
        this.inputContainer.setAttribute("aria-expanded", `${this.open}`);

        this.initialHeight = this.open && parseInt(getComputedStyle(this.optionsContent).height);

        // Mets l'option en état "current"
        activeID && this.optionsContent.querySelector(activeID)?.setAttribute("aria-selected", true);
        this.setVisible();
    }

    /**
     * Vérifie si l'élément est visible et si ce n'est pas
     * ajuste sa position
     */
    setVisible () {
        this.optionsContainer.style.removeProperty("top");
        window.customSelect = this;
        if (this.open) {
            const btnPos = this.inputContainer.getBoundingClientRect();
            // Positionne le conteneur en dessous du bouton
            this.optionsContainer.style.top = (btnPos.height + btnPos.top) + "px";
            
            // Vérifie la hauteur de l'élément
            const { height, top, bottom } = this.optionsContainer.getBoundingClientRect();
            console.log(height, top, bottom);
            if (bottom > document.documentElement.clientHeight) {
                // Ne se voit pas, place l'élément au dessus du bouton
                this.optionsContainer.style.top = Math.max(top - height - btnPos.height, 0) + "px";
            }
        }
    }

    /**
     * Indique si le panneau des options est ouvert.
     * @returns {Boolean} Vrai si le panneau est fermé. Faux sinon.
     */
    isCollapsed () {
        return this.inputContainer.ariaExpanded === "false";
    }

    /**
     * Change l'indice de sélection en fonction de l'action en cours
     * @param {Number} currentIndex Indice courrant
     * @param {Number} maxIndex Indice max
     * @param {Number} action Type d'action
     * @returns {Number} nouvel indice
     */
    getUpdatedIndex (currentIndex, maxIndex, action) {
        // Cas aucune option sélectionnée
        let defaultIndex = 0;
        if (currentIndex === undefined) {
            defaultIndex = undefined;
            currentIndex = -1;
        }
        switch (action) {
            case this.selectActions.First:
            case this.selectActions.BeginRow:
                return 0;
            case this.selectActions.Last:
            case this.selectActions.EndRow:
                return maxIndex;
            case this.selectActions.Up:
                return Math.max(0, currentIndex - 1);
            case this.selectActions.Down:
                return Math.min(maxIndex, currentIndex + 1);
            case this.selectActions.PageUp:
                return Math.max(0, currentIndex - this.pageSize);
            case this.selectActions.PageDown:
                return Math.min(maxIndex, currentIndex + this.pageSize);
            default:
                // On retourne undefined si c'était le cas au début
                // Et qu'aucune action ne change l'indice
                return (defaultIndex === undefined) ? undefined : currentIndex;
        }
    }

    /**
     * Sélectionne une option et envoi un événement `change` sur l'input.
     * @param {Number} index Indice de l'élément à sélectionner
     * @param {Boolean} silent Si vrai, n'envoie pas d'événement change
     * @returns {void}
     */
    selectOption (index, silent = false) {
        // Pas d'indice choisi, on s'arrête là
        if (index === undefined) {
            return;
        }
        this.activeIndex = index;

        // Màj aria-selected
        const options = this.optionsContent.querySelectorAll("[role=option]");
        [...options].forEach((optionEl) => {
            optionEl.setAttribute("aria-selected", "false");
        });
        options[index].setAttribute("aria-selected", "true");
        const option = this.choices[index];

        // Mets la valeur dans le choix
        this.inputContainer.dataset.value = option[0];
        this.inputContainer.style.setProperty("--bg-color", option[0]);
        this.inputContainer.ariaLabel = option[1];
        this.input.value = option[0];
        if (this.type === "icon") {
            this.choice.className = "input-style__option-value";
            if (option[0].trim().length) {
                this.choice.classList.add(option[0]);
            }
        }

        // Envoi un événement si nécessaire
        if (!silent) {
            this.input.dispatchEvent(new Event("change"));
        }
    }

    /**
     * Gère le changement d'option
     * @param {Number} [index] Indice de l'option à sélectionner
     */
    onOptionChange (index) {
        // Pas d'indice choisi, on s'arrête là
        if (index === undefined) {
            // Réinitialise le aria-activedescendant
            this.inputContainer.setAttribute("aria-activedescendant", "");
            return;
        }
        
        // Change l'indice en cours state
        this.activeIndex = index;

        // Màj de aria-activedescendant (accessibilité)
        this.inputContainer.setAttribute("aria-activedescendant", `${this.baseOptionId}-${index}`);

        // Choisi l'option sélectionné et met à jour son aria-selected
        const options = this.optionsContent.querySelectorAll("[role=option]");
        [...options].forEach((optionEl) => {
            optionEl.ariaSelected = false;
        });
        options[index].ariaSelected = true;

        // Scroll pour maintenir l'option dans la vue
        if (isScrollable(this.optionsContent)) {
            maintainScrollVisibility(options[index], this.optionsContent);
        }

        // Assure que la nouvelle option est visible sur l'écran
        if (!isElementInView(options[index])) {
            options[index].scrollIntoView({ behavior : "smooth", block : "nearest" });
        }
    }

    /**
     * Gère les différentes actions à mettre en place au clic sur une option
     * @param {Number} index Indice de l'option cliqué
     */
    onOptionClick (index) {
        this.onOptionChange(index);
        this.selectOption(index);
        this.collapse(true);
    }

    /**
     * Gère la réaction en cas d'écriture dans l'interface (pour l'instant ne fait rien)
     * @param {String} key Touche clavier
     * @returns {void}
     */
    onComboType (key) {
        console.log(key);
    }

    /**
     * Créé une option avec une valeur et un label
     * @param {String} value Valeur du choix (dépend de la propriété)
     * @param {String} label Libellé à afficher
     * @param {Number} index Indice de l'élément (utile pour les raccourcis claviers)
     * @returns {HTMLButtonElement} Option à ajouter
     */
    addChoice (value, label, index) {
        // Bouton de l'option
        const option = document.createElement("button");
        option.role = "option";
        option.id = `${this.baseOptionId}-${index}`;
        option.ariaSelected = false;
        option.dataset.type = this.type;
        option.dataset.value = value;
        option.tabIndex = -1;
        // option.style.setProperty("--bg-color", value);

        // Si la valeur est la même que la valeur choisi, on la sélectionne
        if (value === this.choice.dataset.value) {
            option.ariaSelected = true;
            // L'indice courant est celui sélectionné
            this.activeIndex = index;
        }

        // Icône / pictogramme de l'option
        const choice = document.createElement("span");
        choice.className = "input-style__option-value";
        choice.ariaHidden = true;

        // Pour les icônes seulement 
        // TODO : à déplacer dans un autre fichier
        if (this.type === "icon" && value.trim().length) {
            choice.classList.add(value);
        }

        // Label du bouton
        const lab = document.createElement("span");
        lab.id = `${this.baseOptionId}-${index}__label`;
        lab.className = "fr-label input-style__option-label";
        lab.innerText = label;

        // Mets le label dans l'attribut "labelled by" de l'option
        option.setAttribute("aria-labelled-by", lab.id);

        // Gère le clic sur une option
        option.addEventListener("click", (event) => {
            event.stopPropagation();
            this.onOptionClick(index);
        });

        option.appendChild(choice);
        option.appendChild(lab);
        return option;
    }

}

export default CustomSelect;

// Expose CustomSelect as ol.control.CustomSelect (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.CustomSelect = CustomSelect;
} 