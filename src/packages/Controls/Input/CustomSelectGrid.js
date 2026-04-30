import "../../CSS/Controls/Input/GPFcustomSelectGrid.scss";
import CustomSelect from "./CustomSelect.js";

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
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/} Pour voir l'inspiration
 */
class CustomSelectGrid extends CustomSelect {

    /**
     * Constructeur du contrôle CustomSelectGrid
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
        /**
         * Définit le nombre de colonne dans la grille (utilisé pour màj l'index)
         * @type {Number}
         */
        this.columnNb = 6;
        this.pageSize = 5;
    }

    /**
     * @param {CustomSelectConfig} options Options du contrôle
     * @override
     */
    _initContainer (options) {
        super._initContainer(options);
        this.element.classList.add("input-style-select-grid");
    }

    /**
     * @param {Number} currentIndex Indice courrant
     * @param {Number} maxIndex Indice max
     * @param {Number} action Type d'action
     * @returns {Number} nouvel indice
     * @override
     */
    getUpdatedIndex (currentIndex, maxIndex, action) {
        // Cas aucune option sélectionnée
        let defaultIndex = 0;

        // Pour mettre l'indice à la fin / au début de la ligne
        let modulo;
        if (currentIndex === undefined) {
            defaultIndex = undefined;
            currentIndex = (this.columnNb - 1) * -1;
            modulo = 0;
        } else {
            modulo = currentIndex % this.columnNb;
        }

        switch (action) {
            case this.selectActions.Left:
                return Math.max(0, currentIndex - 1);
            case this.selectActions.Right:
                return Math.min(maxIndex, Math.max(currentIndex + 1, 0));
            case this.selectActions.Down:
                return Math.min(maxIndex, currentIndex + this.columnNb);
            case this.selectActions.Up:
                return Math.max(0, currentIndex - this.columnNb);
            case this.selectActions.First:
                return 0;
            case this.selectActions.Last:
                return maxIndex;
            case this.selectActions.BeginRow:
                return Math.max(0, currentIndex - modulo);
            case this.selectActions.EndRow:
                return Math.min(maxIndex, currentIndex + ((this.columnNb - 1) - modulo));
            case this.selectActions.PageUp:
                return Math.max(0, currentIndex - (this.pageSize * this.columnNb));
            case this.selectActions.PageDown:
                return Math.min(maxIndex, currentIndex + (this.pageSize * this.columnNb));
            default:
                // On retourne undefined si c'était le cas au début
                // Et qu'aucune action ne change l'indice
                return (defaultIndex === undefined) ? undefined : currentIndex;
        }
    }

    /**
     * @param {String} value Valeur du choix (dépend de la propriété)
     * @param {String} label Libellé à afficher
     * @param {Number} index Indice de l'élément (utile pour les raccourcis claviers)
     * @returns {HTMLButtonElement} Option ajoutée
     * @override
     */
    addChoice (value, label, index) {
        const option = super.addChoice(value, label, index);

        // Retire le label
        option.removeAttribute("aria-labelled-by");
        option.ariaLabel = label;
        option.title = label;
        option.lastChild.remove();
        return option;
    }

}

export default CustomSelectGrid;

// Expose CustomSelectGrid as ol.control.CustomSelectGrid (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.CustomSelectGrid = CustomSelectGrid;
}