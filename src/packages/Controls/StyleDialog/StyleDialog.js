import { Select } from "ol/interaction.js";
import Dialog from "../Toggle/Dialog.js";
import FlatStyleForm from "./FlatStyleForm.js";
import checkDsfr from "../Utils/CheckDsfr.js";
import styleForm from "./styleForm.js";
import labelForm from "./labelForm.js";
import { defaultIcons, dsfrDefaultIcons } from "../Draw/Draw.js";

/**
 * @typedef StyleDialogOptions Options du constructeur du dialogue de style
 * @property {String} [id] - Identifiant unique du dialog
 * @property {String} [title] - Titre du dialog
 * @property {Select} [select] - Interaction de sélection. Si fournie, lie l'ouverture du dialogue avec la sélection d'un objet (écoute de l'événement `select.on("select")`)
 * @property {Array<StyleDialogTabNav>} [forms] Formulaires de style, avec un titre et un label pour la navigation. Si vide ou nul, des formulaires par défauts seront ajoutés :
 * - `Style` : Modification du style (voir fichier {@link ./styleForm.js} )
 * - `Texte` : Modification de l'éqtiquette (voir fichier {@link ./labelForm.js} )
 * @property {String} [icon] - Classe CSS de l'icône du dialog
 * @property {String} [position="right"] - Position du dialog ("left" ou "right")
 * @property {String} [size="md"] - Taille du dialog ("sm" ou "md")
 * @property {String} [className] - Nom de classe CSS additionnel
 * @property {Function} [onOpen] - Callback appelé à l'ouverture du dialog
 * @property {Function} [onClose] - Callback appelé à la fermeture du dialog
*/

/**
 * @typedef {Object} StyleDialogTabNav Options pour une navigation tertiaire du dialog de style.
 * @property {String} label Libellé de la navigation.
 * @property {FlatStyleForm} form Formulaire de style correspondant. 
 * @property {String} [title] Titre associé (attribut title).
 */

/**
 * Classe utilitaire pour la construction d'un dialogue pour la gestion du style.
 * 
 * Lie notamment le dialog avec une interaction de sélection, afin d'ouvrir le dialogue
 * lorsqu'il y'a une sélection d'un ou de plusieurs objets.
 * Si aucune sélection n'est donné, la gestion du dialogue est laissée à l'utilisateur·ice.
 */
class StyleDialog extends Dialog {

    /**
     * Constructeur du contrôle StyleDialog.
     * @constructor
     * @param {StyleDialogOptions} options Options du constructeur
     */
    constructor (options) {
        super(options);

        // Ajout de la navigation tertiaire
        options.forms.forEach(tab => {
            this.addTabNavItem({
                label : tab.label,
                content : tab.form.getContent(),
                title : tab.title,
            });
        });
    }

    /**
     * @protected
     * @param {StyleDialogOptions} options Options du contrôle
     * @override
     */
    _initialize (options) {
        super._initialize(options);
        /**
         * Nom de la classe (heritage)
         * @private
         */
        this.CLASSNAME = "StyleDialog";
        options.forms ??= [];
        options.labelTabNav = "Gestion du style";

        // Aucun formulaire, on met du contenu par défaut
        if (options.forms.length === 0) {
            options.forms.push(
                {
                    label : "Style",
                    form : styleForm,
                    title : "Configuration du style"
                },
                {
                    label : "Texte",
                    form : labelForm,
                    title : "Configuration du texte"
                },
            );
        }
        this.forms = options.forms;

        // Icônes
        this.icons = checkDsfr() ? dsfrDefaultIcons : defaultIcons;
    }

    /**
     * @protected
     * @param {StyleDialogOptions} options Options du contrôle
     * @override
     */
    _initContainer (options) {
        super._initContainer(options);
    }

    /**
     * @protected
     * @param {StyleDialogOptions} options Options du contrôle
     * @override
     */
    _initEvents (options) {
        super._initEvents(options);
        if (options.select instanceof Select) {
            this.select = options.select;
            this.select.on("select", (e) => {
                if (e.selected && e.selected.length) {
                    // Récupère les types de géométries
                    const geomType = e.selected[0].getGeometry().getType();
                    this.setDialogTitle(geomType);
                    this.setIcon(this.icons[geomType]);
                    
                    const gTypes = {};
                    e.target.getFeatures().forEach(f => {
                        gTypes[f.getGeometry().getType()] = true;
                    });

                    // Ajoute les types de géométries en classes CSS
                    this.getElement().classList.remove(...Object.keys(this.icons));
                    this.getElement().classList.add(...Object.keys(gTypes));

                    this.show();
                } else {
                    // Aucune sélection : fermeture du dialog.
                    this.close();
                }
            });
        }

        // Propage l'événement pour pouvoir l'écouter sur StyleDialog
        this.forms.forEach(form => {
            form.form.on("style", (e) => {
                this.dispatchEvent(e);
            });
        });
    }

    /**
     * Renvoie l'intéraction de sélection lié au contrôle
     * @returns {Select} Intéraction de sélection
     */
    getSelect () {
        return this.select;
    }



    /**
     * Retourne les formulaires dans le dialogue de style
     * @returns {Array<FlatStyleForm>} Formulaires liés au dialogue de style
     */
    getForms () {
        return this.forms.map(form => form.form);
    }

}

export default StyleDialog;

// Expose StyleDialog as ol.control.StyleDialog (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.StyleDialog = StyleDialog;
} 