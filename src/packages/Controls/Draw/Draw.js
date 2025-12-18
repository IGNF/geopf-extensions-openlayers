// import CSS
import Collection from "ol/Collection.js";
import "../../CSS/Controls/Draw/GPFdraw.scss";
import Logger from "../../Utils/LoggerByDefault";
import ToggleContent from "../Toggle/ToggleContent";
import { Interaction, Select } from "ol/interaction";
import SelectingInteraction from "../../Interactions/Selecting";
import ToggleInteraction from "../Toggle/ToggleInteraction";
import { Map } from "ol";

var logger = Logger.getLogger("draw");

/**
 * @classdesc
 * Contrôle de dessin.
 *
 * @alias ol.control.Draw
 * @module Draw
 */
class Draw extends ToggleContent {

    /**
     * Constructeur du contrôle Draw.
     * @constructor
     * @param {ToggleContentOptions} options Options du constructeur
     * @fires change:active
     */
    constructor (options) {
        super(options);
    }
  
    /**
     * Initialise le contrôle Draw (appelé par le constructeur).
     * @protected
     * @param {ToggleContentOptions} options Options du constructeur
     */
    _initialize (options) {
        super._initialize(options);
        /**
         * Nom de la classe (heritage)
         * @private
         */
        this.CLASSNAME = "Draw";

        /**
         * Tableau des toggle interactions contenant les interactions de dessin
         * @type {Collection<ToggleInteraction>}
         */
        this.toggleInteractions = new Collection();

        options.icon ??= "fr-icon-pen-nib-line";
        options.title ??= "Annoter la carte";
        options.size ??= "sm";

        if (!(options.select instanceof Select)) {
            options.select = new SelectingInteraction();
            this.on("change:active", (e) => {
                options.select.clear();
                options.select.setActive(e.target.getActive());
            });
        }

        /**
         * Interaction de sélection
         * @type {Select}
         */
        this.select = options.select;
    }

    /**
     * Renvoie l'intéraction de sélection lié au contrôle
     * @returns {Select} Intéraction de sélection
     */
    getSelect () {
        return this.select;
    }

    /**
     * @param {DrawOptions} options Options du contrôle
     * @override
     */
    _initEvents (options) {
        super._initEvents(options);
        // Gère les interactions (une seule active à la fois)
        this.toggleInteractions.on("add", function (e) {
            const array = e.target;
            const toggle = e.element;
            toggle.on("change:active", (e) => {
                array.forEach(t => {
                    // Désactive toutes les interactions sauf celle sur laquelle on a cliqué
                    if (t !== e.target) {
                        t.toggleActive(false);
                    }
                });
            });
        }.bind(this));

        // Ferme l'interaction si on ferme la modale
        this.dialog.on("dialog:close", (e) => {
            this.getActiveToggle()?.setActive(false);
        });
    }

    /**
     * Récupère l'intéraction active si elle existe
     * @returns {ToggleInteraction|undefined} Interaction active (s'il y'en a une)
     */
    getActiveToggle () {
        let t;
        for (let i = 0; i < this.toggleInteractions.getLength(); i++) {
            const toggle = this.toggleInteractions.item(i);
            if (toggle.getActive()) {
                t = toggle;
                break;
            }
        }
        return t;
    }

    /**
     * @param {DrawOptions} options Options du constructeur
     * @override
     */
    _initContainer (options) {
        super._initContainer(options);

        // Ajout d'un conteneur
        const btnGroup = document.createElement("div");
        btnGroup.className = "GPF-btn-group fr-btns-group fr-btns-group--icon-left";
        this.btnGroup = btnGroup;
        this.dialog.setDialogContent(btnGroup, false);
    }

    /**
     * @param {Map} map Carte à ajouter
     * @override
     */
    setMap (map) {
        this.select && this.getMap()?.removeInteraction(this.select);
        
        super.setMap(map);

        if (map) {
            this.toggleInteractions.forEach(i => {
                i.setMap(map);
            });
            this.select && map.addInteraction(this.select);
        }
    }

    /**
     * Ajoute une interaction au contrôle
     * @param {InteractionOptions} options Options pour l'ajout de l'intéraction
     */
    addInteraction (options) {
        if (!options.interaction instanceof Interaction) {
            return;
        }

        const toggle = new ToggleInteraction(options);
        toggle.setTarget(this.btnGroup);
        toggle.setMap(this.getMap());
        toggle.button.classList.remove("fr-btn--tertiary-no-outline");
        toggle.button.classList.add("fr-btn--tertiary");

        this.toggleInteractions.push(toggle);
    }

}

export default Draw;

// Expose Draw as ol.control.Draw (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.Draw = Draw;
}
