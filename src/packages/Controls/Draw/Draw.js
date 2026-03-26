// import CSS
import Collection from "ol/Collection.js";
import "../../CSS/Controls/Draw/GPFdraw.scss";
import Logger from "../../Utils/LoggerByDefault";
import ToggleContent from "../Toggle/ToggleContent";
import { Interaction, Select } from "ol/interaction";
import SelectingInteraction from "../../Interactions/Selecting";
import ToggleInteraction from "../Toggle/ToggleInteraction";
import { Map } from "ol";
import checkDsfr from "../Utils/CheckDsfr";
import DrawingInteraction from "../../Interactions/Drawing";
import VectorSource from "ol/source/Vector";


/**
 * @typedef {Object} DrawOptions
 * @property {String} [label] Libellé associé à l'input.
 * @property {String|HTMLElement} [icon="fr-icon-pen-nib-line"] - Classe à ajouter au bouton ou élément svg (inline) ou élément HTML à ajouter avant le label (type span).
 * @property {String} [title="Annoter la carte"] Attribut title / aria-label.
 * @property {String} [size="sm"] Taille du panneau ("sm" ou "lg").
 * @property {String} [position=right] Position du panneau ("left" ou "right").
 * @property {Select} [select] Interaction de sélection lié au contrôle. Si aucune interaction n'est donnée, ajoute une interaction de type {@link SelectingInteraction SelectingInteraction}.
 * @property {String} [style=false] Si vrai, ajoute un panneau de style qui sera contrôlé par la sélection liée à ce contrôle. Un dialog par défaut contenant un formulaire de style et une édition de texte seront ajoutés dans ce dialog.
 * @property {Array<InteractionOptions} [drawingInteractions] Interactions à ajouter dans le contrôle. Si aucun objet n'est donné, ajoutera trois interactions de dessin, de types respectifs : `Point`, `LineString`, `Polygon`. Voir interaction de dessin openlayer : {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_Draw-Draw.html | Draw}
 */

/**
 * @typedef {Object} InteractionOptions
 * @property {Interaction} interaction - L'interaction de dessin OpenLayers à ajouter (Voir {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_Interaction-Interaction.html | Interaction})
 * @property {String} label - Libellé de l'interaction
 * @property {String} [icon] - Icône de l'interaction
 */

const defaultInteractionsLabel = {
    "Point" : "Point",
    "LineString" : "Ligne",
    "Polygon" : "Surface",
};

const dsfrDefaultIcons = {
    "Point" : "fr-icon-map-pin-2-line",
    "LineString" : "fr-icon-ign-dessiner-trace-line",
    "Polygon" : "fr-icon-ign-shape-3-fill",
};
const defaultIcons = {
    "Point" : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z"></path></svg>`,
    "LineString" : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2 11H4V13H2V11ZM6 11H18V13H6V11ZM20 11H22V13H20V11Z"></path></svg>`,
    "Polygon" : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7.82929 20C7.41746 21.1652 6.30622 22 5 22C3.34315 22 2 20.6569 2 19C2 17.6938 2.83481 16.5825 4 16.1707V7.82929C2.83481 7.41746 2 6.30622 2 5C2 3.34315 3.34315 2 5 2C6.30622 2 7.41746 2.83481 7.82929 4H16.1707C16.5825 2.83481 17.6938 2 19 2C20.6569 2 22 3.34315 22 5C22 6.30622 21.1652 7.41746 20 7.82929V16.1707C21.1652 16.5825 22 17.6938 22 19C22 20.6569 20.6569 22 19 22C17.6938 22 16.5825 21.1652 16.1707 20H7.82929ZM7.82929 18H16.1707C16.472 17.1476 17.1476 16.472 18 16.1707V7.82929C17.1476 7.52801 16.472 6.85241 16.1707 6H7.82929C7.52801 6.85241 6.85241 7.52801 6 7.82929V16.1707C6.85241 16.472 7.52801 17.1476 7.82929 18ZM5 6C5.55228 6 6 5.55228 6 5C6 4.44772 5.55228 4 5 4C4.44772 4 4 4.44772 4 5C4 5.55228 4.44772 6 5 6ZM19 6C19.5523 6 20 5.55228 20 5C20 4.44772 19.5523 4 19 4C18.4477 4 18 4.44772 18 5C18 5.55228 18.4477 6 19 6ZM19 20C19.5523 20 20 19.5523 20 19C20 18.4477 19.5523 18 19 18C18.4477 18 18 18.4477 18 19C18 19.5523 18.4477 20 19 20ZM5 20C5.55228 20 6 19.5523 6 19C6 18.4477 5.55228 18 5 18C4.44772 18 4 18.4477 4 19C4 19.5523 4.44772 20 5 20Z"></path></svg>`,
};

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
     * @param {DrawOptions} options Options du constructeur
     * @fires change:active
     */
    constructor (options) {
        super(options);

        if (options.drawingInteractions instanceof Array && options.drawingInteractions.length) {
            // Ajoute les interactions de dessin
            options.drawingInteractions.forEach(i => {
                this.addInteraction(i);
            });
        } else {
            // Ajoute les interactions par défaut
            const icons = checkDsfr() ? dsfrDefaultIcons : defaultIcons;
            /** @type {Array<DrawingInteraction} Interactions par défaut */
            const interactions = [];
            // Création des interactions de dessin
            Object.keys(defaultInteractionsLabel).forEach((k, index) => {
                interactions.push(new DrawingInteraction({
                    type : k,
                    source : this.source,
                    select : this.select,
                    selectOnDrawEnd : true,
                }));
                interactions[index].setActive(false);
            });

            // Ajout des interactions au contrôle
            interactions.forEach(interaction => {
                this.addInteraction({
                    interaction : interaction,
                    label : defaultInteractionsLabel[interaction._type],
                    icon : icons[interaction._type],
                });
            });
        }
    }

    /**
     * Initialise le contrôle Draw (appelé par le constructeur).
     * @protected
     * @param {DrawOptions} options Options du constructeur
     */
    _initialize (options) {
        /**
         * Tableau des toggle interactions contenant les interactions de dessin
         * @type {Collection<ToggleInteraction>}
         */
        this.toggleInteractions = new Collection();

        options.icon ??= "fr-icon-pen-nib-line";
        options.title ??= "Annoter la carte";
        options.size ??= "sm";
        options.position ??= "right";
        options.style ??= false;

        // Tableau vide par défaut, les interactions sont ajoutés à la fin du constructeur
        options.drawingInteractions ??= [];

        if (!(options.select instanceof Select)) {
            options.select = new SelectingInteraction();
        }

        // Source pour le dessin
        this.source = new VectorSource({});

        super._initialize(options);
        /**
         * Nom de la classe (heritage)
         * @private
         */
        this.CLASSNAME = "Draw";

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
            toggle.getInteraction()?.on(["drawstart", "drawend", "drawabort"], this.dispatchEvent.bind(this));
        }.bind(this));

        // Ferme l'interaction si on ferme la modale
        this.dialog.on("dialog:close", (e) => {
            this.getActiveToggle()?.setActive(false);
        });

        this.on("change:active", (e) => {
            try {
                this.select.clear();
            } catch {
                const features = this.getFeatures().getArray();
                this.select.getFeatures().clear();
                this.select.dispatchEvent(new SelectEvent("select", [], features, undefined));
                for (const property in this.select.featureLayerAssociation_) {
                    delete this.select.featureLayerAssociation_[property];
                }
            }
            this.select.setActive(e.target.getActive());
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
     * Modifie la source pour les interactions de dessins
     * @param {VectorSource} source Source à ajouter
     */
    setSource (source) {
        if (!(source instanceof VectorSource)) {
            // La source n'est pas valide, on remplace par une source vide
            this.source = new VectorSource({});
        } else {
            this.source = source;
        }
        // Applique la nouvelle source sur chaque interaction
        this.toggleInteractions.forEach(toggle => {
            toggle.getInteraction().setSource?.(this.source);
        });
    }

    /**
     * Ajoute une interaction au contrôle
     * @param {InteractionOptions} options Options pour l'ajout de l'intéraction
     */
    addInteraction (options) {
        if (!options.interaction instanceof Interaction) {
            console.error("L'objet donné ne contient pas d'interaction OpenLayers dans le paramètre `interaction`");
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
