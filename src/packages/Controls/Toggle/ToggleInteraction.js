// import CSS
import "../../CSS/Controls/Toggle/GPFtoggle.scss";
import Control from "../Control";
import Logger from "../../Utils/LoggerByDefault";
import Helper from "../../Utils/Helper";
import Toggle from "./Toggle";
import { Interaction } from "ol/interaction";

var logger = Logger.getLogger("toggle");

/**
 * @classdesc
 * Contrôle de base créant un toggle avec interaction.
 *
 * @alias ol.control.ToggleInteraction
 * @module Toggle
 */
class ToggleInteraction extends Toggle {

    /**
     * Constructeur du contrôle ToggleInteraction.
     * @constructor
     * @param {ToggleInteractionOptions} options Options du constructeur
     */
    constructor (options) {
        super(options);
    }

    /**
     * Initialise le contrôle ToggleInteraction (appelé par le constructeur).
     * @protected
     * @param {ToggleInteractionOptions} options Options du constructeur
     */
    _initialize (options) {
        super._initialize(options);
        /**
         * Nom de la classe (heritage)
         * @private
         */
        this.CLASSNAME = "ToggleInteraction";
        this._boundIntChangeActive = this._onInteractionChangeActive.bind(this);
        this.setInteraction(options.interaction);
    }

    /**
     * Ajoute les écouteurs d'événements sur les éléments du contrôle.
     * @protected
     * @param {ToggleInteractionOptions} options Options du constructeur
     */
    _initEvents (options) {
        super._initEvents(options);
    }

    setMap (map) {
        // Enlève l'interaction précédente (si elle et la carte existe)
        this.getInteraction() && this.getMap()?.removeInteraction(this.getInteraction());
        super.setMap(map);

        // Ajoute l'interaction à la carte (si elles existent)
        this.getInteraction() && this.getMap()?.addInteraction(this.getInteraction());
    }


    /**
     * Ajoute une interaction au toggle. Enlève la précédente interaction de la carte.
     * @param {Interaction} [interaction] Interaction openlayer
     */
    setInteraction (interaction) {
        // Enlève l'interaction précédente (si elle et la carte existe)
        if (this.getInteraction()) {
            this.getMap()?.removeInteraction(this.getInteraction());
            this.getInteraction().un("change:active", this._boundIntChangeActive);
        }

        // Ajoute l'interaction à la carte (si elles existent)
        this.interaction = interaction;
        interaction && this.getMap()?.addInteraction(interaction);
        interaction.on("change:active", this._boundIntChangeActive);
    }

    /**
     * Retourne l'interaction lié au toggle.
     * @returns {Interaction} Interaction openlayer (si elle existe)
     */
    getInteraction () {
        return this.interaction;
    }


    /**
     * @param {Boolean} active Indique si le contrôle doit être activé ou non
     * @param {Boolean} [silent] Si vrai, n'envoie pas d'événement `change:active`
     * @override
     */
    setActive (active, silent) {
        super.setActive(active, silent);
        this.getInteraction()?.setActive(active);
    }

    _onInteractionChangeActive (e) {
        this.setActive(e.target.getActive());
    }

}

export default ToggleInteraction;

// Expose ToggleInteraction as ol.control.ToggleInteraction (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.ToggleInteraction = ToggleInteraction;
}
