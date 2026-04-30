// import CSS
import "../../CSS/Controls/Toggle/GPFtoggle.scss";
import Logger from "../../Utils/LoggerByDefault";
import Helper from "../../Utils/Helper";
import Toggle from "./Toggle";
import Dialog from "./Dialog";

var logger = Logger.getLogger("toggle");

/**
 * @classdesc
 * Contrôle de base créant un toggle avec contenu.
 *
 * @alias ol.control.ToggleContent
 * @module ToggleContent
 */
class ToggleContent extends Toggle {

    /**
     * Constructeur du contrôle ToggleContent.
     * @constructor
     * @param {ToggleContentOptions} options Options du constructeur
     */
    constructor (options) {
        super(options);
    }

    setMap (map) {
        super.setMap(map);

        if (map) {
            this.dialog.setMap(map);
        }
    }

    /**
     * Initialise le contrôle ToggleInteraction (appelé par le constructeur).
     * @protected
     * @param {ToggleContentOptions} options Options du constructeur
     */
    _initialize (options) {
        super._initialize(options);
        /**
         * Nom de la classe (heritage)
         * @private
         */
        this.CLASSNAME = "ToggleInteraction";

        this.ariaAttribute = "aria-extended";
    }

    /**
     * Définit la position du panneau (droite ou gauche).
     * @param {String} position Position du panneau ("left" ou "right")
     */
    setDialogPosition (position) {
        this.dialog.setPos(position);
    }

    /**
     * Définit la taille du panneau (sm ou md).
     * @param {String} size Taille du panneau (sm ou md)
     */
    setDialogSize (size) {
        this.dialog.setDialogSize(size);
    }

    /**
     * Ajoute les écouteurs d"événements sur les éléments du contrôle.
     * @protected
     * @param {ToggleContentOptions} options Options du constructeur
     */
    _initEvents (options) {
        super._initEvents(options);

        this.dialog.on("dialog:close", (e) => {
            this.getActive() && this.setActive(false);
        });
    }

    /**
     * Initialise le conteneur DOM principal du contrôle.
     * @protected
     * @param {ToggleContentOptions} options Options du constructeur
     */
    _initContainer (options) {
        super._initContainer(options);

        this.dialog = new Dialog({
            ...options,
            className : `dialog-${this.CLASSNAME.toLowerCase()}`,
        });

        this.element.setAttribute("aria-controls", this.dialog.getElement().id);
    }

    /**
     * Fonction utilitaire pour paramétrer facilement le dialog.
     * 
     * @param {Object} options Élements du dialog
     * @param {String} options.title Titre
     * @param {String} options.icon Icône
     * @param {String|Element} options.content Contenu du dialog.
     */
    setContent (options) {
        this.dialog.setContent(options);
    }

    /**
     * Retourne le dialog associé au toggle
     * @returns {Dialog} Objet dialog
     */
    getDialog () {
        return this.dialog;
    }

    /**
     * Retourne le titre du dialog (contenu).
     * @returns {String} Contenu du titre
     */
    getDialogTitle () {
        return this.dialog.getDialogTitle();
    }

    /**
     * Ajoute un titre au dialog.
     * @param {String} title Titre à remplacer
     */
    setDialogTitle (title) {
        this.dialog.setDialogTitle(title);
    }

    /**
     * Retourne le contenu du dialog.
     * 
     * @returns {Element} Contenu de la modale
     */
    getDialogContent () {
        return this.dialog.getDialogContent();
    }

    /**
     * Ajoute un contenu au dialog.
     * 
     * @param {Element|String|null} content Contenu du dialog
     */
    setDialogContent (content) {
        this.dialog.setDialogContent(content);
    }



    /**
     * Sélectionne le premier élément du dialog correspondant
     * au sélecteur CSS.
     * 
     * @param {String} selector Sélecteur CSS.
     * @returns {Element} Premier élément correspondant au sélecteur.
     */
    querySelector (selector) {
        return this.dialog.querySelector(selector);
    }

    /**
     * Sélectionne tous les éléments du dialog correspondant
     * au selecteur CSS.
     * 
     * @param {String} selector Sélecteur CSS
     * @returns {NodeList} Liste des élements correspondant au sélecteur
     */
    querySelectorAll (selector) {
        return this.dialog.querySelectorAll(selector);
    }

    /**
     * @param {Boolean} active Indique si le contrôle doit être activé ou non
     * @param {Boolean} [silent] Si vrai, n'envoie pas d'événement `change:active`
     * @override
     */
    setActive (active, silent) {
        super.setActive(active, silent);
        if (this.getActive()) {
            // Ouvre la modale
            this.dialog.show();
        } else {
            // Ferme la modale
            this.dialog.close();
        }
    }

}

export default ToggleContent;

// Expose ToggleContent as ol.control.ToggleContent (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.ToggleContent = ToggleContent;
}
