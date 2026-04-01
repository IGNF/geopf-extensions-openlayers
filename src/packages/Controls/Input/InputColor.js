import CustomSelectGrid from "./CustomSelectGrid.js";
import "../../CSS/Controls/Input/GPFinputColor.scss";

/**
 * @typedef {Object} InputColorConfig
 * @property {string} label Le label de l'input
 * @property {string} [labelInfo] Info supplémentaire du label (ex: unité)
 * @property {string} property La propriété flat style correspondante
 * @property {Boolean} [disabled=false] Si vrai, désactive l'input
 * @property {Object<string, string>} options Les couluers à mettre en options (valeur: libellé)
 */

const defaultColors = {
    "#ffcc33" : "Jaune or",
    "#ffb03b" : "Jaune orangé",
    "#ff7f00" : "Orange",
    "#ff0000" : "Rouge",
    "#ff8fc8" : "Rose clair",
    "#ff24ff" : "Magenta",
    "#2fde30" : "Vert vif",
    "#97c005" : "Vert anis",
    "#008900" : "Vert foncé",
    "#00ff9a" : "Vert menthe",
    "#12d8b6" : "Turquoise",
    "#00ae91" : "Vert sarcelle",
    "#00ffff" : "Cyan",
    "#0a76f6" : "Bleu",
    "#000091" : "Bleu foncé",
    "#cc8bf9" : "Violet clair",
    "#9a00ff" : "Violet",
    "#bc6630" : "Marron",
    "#ffffff" : "Blanc",
    "#cdcdcd" : "Gris clair",
    "#787878" : "Gris",
    "#424242" : "Gris foncé",
    "#000000" : "Noir",
    "" : "Sans couleur",
};

/**
 * @classdesc Input permettant de sélectionner des icônes. Celle-ci sont extraites de remixicon.
 */
class InputColor extends CustomSelectGrid {

    /**
     * Constructeur du contrôle InputColor
     * @param {InputColorConfig} options Options du contrôle
     */
    constructor (options = {}) {
        super(options);

        console.log(this.choices);
    }

    /**
     * @param {InputColorConfig} options Options du contrôle
     * @override
     */
    _initialize (options) {        
        if (!options.options || !Object.keys(options.options).length) {
            // Couleurs par défaut
            options.options = defaultColors;
        }
        
        options.type = "color";
        super._initialize(options);
    }

    /**
     * @param {InputColorConfig} options Options du contrôle
     * @override
     */
    _initContainer (options) {
        super._initContainer(options);
        this.input.type = "text";
        this.element.classList.add("input-style--color");
        // Première valeur : correspond à l'élément de base
        const value = Object.keys(options.options)[0];
        this.inputContainer.style.setProperty("--bg-color", value);
    }

    selectOption (index, silent = false) {
        super.selectOption(index, silent);

        // Màj couleur
        const option = this.choices[index];
        console.log("selected option :", option, "index", index);
        this.inputContainer.style.setProperty("--bg-color", option[0]);
    }

    /**
     * Créé une option avec une valeur et un label
     * @param {String} value Valeur du choix (dépend de la propriété)
     * @param {String} label Libellé à afficher
     * @param {Number} index Indice de l'élément (utile pour les raccourcis claviers)
     * @override
     */
    addChoice (value, label, index) {
        const option = super.addChoice(value, label, index);
        option.style.setProperty("--bg-color", value);
        return option;
    }

}

export default InputColor;