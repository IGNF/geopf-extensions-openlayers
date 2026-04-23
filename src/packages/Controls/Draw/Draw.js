// import CSS
import Collection from "ol/Collection.js";
import "../../CSS/Controls/Draw/GPFdraw.scss";
import Logger from "../../Utils/LoggerByDefault";
import ToggleContent from "../Toggle/ToggleContent";
import { Interaction, Modify, Select, Snap } from "ol/interaction";
import SelectingInteraction from "../../Interactions/Selecting";
import ToggleInteraction from "../Toggle/ToggleInteraction";
import { Map } from "ol";
import checkDsfr from "../Utils/CheckDsfr";
import DrawingInteraction from "../../Interactions/Drawing";
import VectorSource from "ol/source/Vector";
import FlatStyleForm from "../StyleDialog/FlatStyleForm";
import StyleDialog from "../StyleDialog/StyleDialog";
import VectorLayer from "ol/layer/Vector";
import DrawInteraction from "ol/interaction/Draw";
import Feature from "ol/Feature";
import { createDefaultStyle } from "ol/style/flat";
import { asArray, asString } from "ol/color";
import Dialog from "../Toggle/Dialog";
import ModifyingInteraction from "../../Interactions/Modifying";
import { SelectEvent } from "ol/interaction/Select";

/**
 * @typedef {Object} DrawOptions
 * @property {String} [label] Libellé associé à l'input.
 * @property {String|HTMLElement} [icon="fr-icon-pen-nib-line"] - Classe à ajouter au bouton ou élément svg (inline) ou élément HTML à ajouter avant le label (type span).
 * @property {String} [title="Annoter la carte"] Attribut title / aria-label.
 * @property {String} [size="sm"] Taille du panneau ("sm" ou "lg").
 * @property {String} [position=right] Position du panneau ("left" ou "right").
 * @property {Select} [select] Interaction de sélection lié au contrôle. Si aucune interaction n'est donnée, ajoute une interaction de type {@link SelectingInteraction SelectingInteraction}.
 * @property {VectorSource} [source] Source à ajouter au contrôle initialement. Peut-être fait après via la méthode `setSource`. Si aucune source n'est donnée, en ajoute une de base.
 * @property {Boolean|Modify} [modify=true] Si faux, n'ajoute pas d'interaction pour modifier les objets. Sinon, ajoute une interaction de type {@link ModifyingInteraction ModifyingInteraction}, héritant de {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_Modify-Modify.html Modify}, qui s'active à la sélection d'un objet. Une interaction de type `Modify` peut aussi être passée en paramètre (auquel cas ).
 * @property {Boolean|Snap} [snap=false] Si vrai, ajoute une interaction {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_Snap-Snap.html Snap}, qui s'active au moment du dessin. La source utilisée est celle définie via la méthode `setSource` du contrôle. Une interaction de type `Snap` peut aussi être passée en paramètre.
 * @property {Boolean} [addToMap=true] Si vrai, ajoute une couche par défaut à la carte. Cela n'a pas d'effet si une source est donnée via le paramètrr `source`.
 * @property {Boolean|Dialog} [style=true] Si vrai, ajoute un panneau de style qui sera contrôlé par la sélection liée à ce contrôle. Si faux, n'ajoute aucun style.
 * Le contenu de ce panneau est géré par les formulaires donné dans le paramètre `forms`.
 * Un dialogue peut aussi être mis directement sur ce paramètre.
 * @property {Boolean|OnStyleCallBack} [onStyle] Fonction par défaut à appliquer lors d'un changement de style. 3 valeurs sont possibles :
 * - Aucune valeur / `true` : Modifie le style des features sélectionnés. Aucun événement style ne sera envoyé sur le contrôle Draw (il est possible de les écouter via `getStyleDialog().on("style")`).
 * - `false` : Aucune action par défaut n'est effectuée. Les modifications du style sont écoutable via les événements de type `"style"` (`draw.on("style", callback)`);
 * - fonction de type {@link OnStyleCallBack OnStyleCallBack} : La fonction sera appliquée, aucun événement ne sera envoyé sur le contrôle Draw (il est possible de les écouter via `getStyleDialog().on("style")`).
 * 
 * Le paramètre n'est pas pris en compte si `style=false`.
 * @property {Array<StyleDialogTabNav>} [forms=[]] Si `style=true`, ajoute les formulaires dans le dialogue. Si `style=true` mais que le paramètre est vide ou nul, des formulaires par défauts seront ajoutés. Non pris en compte si `style=false`.
 * @property {Array<InteractionOptions>|Boolean} [drawingInteractions=[]] Interactions à ajouter dans le contrôle. Mettre à `false` pour ne pas ajouter d'interactions par défaut. aucune Si aucun objet n'est donné, ajoutera trois interactions de dessin, de types respectifs : `Point`, `LineString`, `Polygon`. Voir interaction de dessin openlayer : {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_Draw-Draw.html | Draw}
 */

/**
 * @callback OnStyleCallBack
 * @param {String} property Nom de la propriété flatstyle
 * @param {any} value Valeur correspondante
 * @param {Array<Feature>} features Entités sur lesquelles appliquer le style.
 * Si une sélection est passée dans le dialogue de style, le paramètre correspondra aux entités sélectionnées, récupérées via la méthode `getFeatures()`.
 */

/**
 * @typedef {Object} StyleDialogTabNav Options pour une navigation tertiaire du dialogue de style.
 * @property {String} label Libellé de la navigation.
 * @property {FlatStyleForm} form Formulaire de style correspondant.
 * @property {String} [title] Titre associé (attribut title).
 */

/**
 * @typedef {Object} InteractionOptions
 * @property {DrawInteraction} interaction - L'interaction de dessin OpenLayers à ajouter (Voir {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_Interaction-Interaction.html | Interaction})
 * @property {String} label - Libellé de l'interaction
 * @property {String} [icon] - Icône de l'interaction
 */



/// VALEURS PAR DÉFAUTS ///
// TODO : Mettre ça dans un autre fichier ?
// Style actuel
const currentStyle = createDefaultStyle();

// Couleur par défaut du texte
currentStyle["text-fill-color"] = "#000000";
// Taille par défaut du texte
currentStyle["text-font-size"] = "10";
// Valeur d'opacité par défaut
currentStyle["fill-color-opacity"] = "0.4";

// Couche utilisée pour transformer le flat style en style openlayers
const layerStyle = new VectorLayer({ style : currentStyle });

/**
 * @type {Object<RegExp, Function>} Objet prenant des propriétés flat style
 * et une fonction de transformation correspondante.
 * L'ordre des transformeurs est importante : si une propriété correspond à plusieurs
 * clé de l'objet, la dernière clé sera utilisée comme transformeur.
 * 
 * Si la propriété n'est pas dedans, la valeur est laisée sans changement.
 */
const flatStyleTransformers = {
    // Transforme le "sans couleur" en couleur valide
    "color" : (/** @type {String} */ v) => v === "" ? "#00000000" : v,
    // Transforme la valeur en tableau de nombre
    "dash" : (/** @type {String} */ v) => {
        if (v === "") {
            return [0];
        } else {
            return v.split(",").map(elem => parseFloat(elem) * currentStyle["stroke-width"]);
        }
    },
    // Transforme la valeur en nombre
    "width|radius|size|offset|opacity" : (/** @type {Number} */ v) => parseFloat(v),
    // Font pour les textes : transforme en font CSS
    "text-font$" : (/** @type {String} */ v) => `${parseInt(v)}px sans-serif`,
    // Applique la valeur de l'opacité à la couleur
    "^fill-color$" : (/** @type {String} */ v) => {
        if (v === "") {
            return "#00000000";
        } else {
            const fillColor = asArray(v);
            fillColor[3] = currentStyle["fill-color-opacity"];
            return asString(fillColor);
        }
    },
};

// Libellés des boutons pour les interactions par défaut
const defaultInteractionsLabel = {
    "Point" : "Point",
    "LineString" : "Ligne",
    "Polygon" : "Surface",
};

// Icônes DSFR des interactions par défaut
const dsfrDefaultIcons = {
    "Point" : "fr-icon-map-pin-2-line",
    "LineString" : "fr-icon-ign-dessiner-trace-line",
    "Polygon" : "fr-icon-ign-shape-3-fill",
};

// Icônes non-DSFR des interactions par défaut
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
                this.source && i.interaction?.setSource?.(this.source);
                this.addInteraction(i);
            });
        } else if (options.drawingInteractions !== false) {
            // Ajoute les interactions par défaut si le param est différent de false
            this.icons = checkDsfr() ? dsfrDefaultIcons : defaultIcons;
            /** @type {Array<DrawingInteraction>} Interactions par défaut */
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
                    icon : this.icons[interaction._type],
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
        options.style ??= true;
        options.addToMap ??= true;
        options.modify ??= true;
        options.snap ??= false;


        // Tableau vide par défaut, les interactions sont ajoutés à la fin du constructeur
        options.drawingInteractions ??= [];

        if (!(options.select instanceof Select)) {
            options.select = new SelectingInteraction({
                style : null,
            });
        }

        this.modify = options.modify;
        // Création de l'interaction de modification des objets
        if (options.modify !== false && !(options.modify instanceof Modify)) {
            this.modify = new ModifyingInteraction({
                select : options.select,
            });
        }

        if (!(options.source instanceof VectorSource)) {
            this.source = new VectorSource({});
            if (options.addToMap) {
                // On ajoute la source à une couche, que l'on ajoutera sur la carte.
                this.layer = new VectorLayer({
                    source : this.source
                });
            }
        } else {
            this.source = options.source;
        }

        this.snap = options.snap;
        // Création de l'interaction snap
        if (options.snap === true) {
            this.snap = new Snap({ 
                source : this.source,
            });
        }


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

        if (options.style === true) {
            this.styleDialog = new StyleDialog({
                id : "style-dialog",
                title : "Configuration du style",
                position : "left",
                forms : options.forms,
                select : this.select,
                onOpen : this.onOpenStyleDialog.bind(this),
                onClose : function () {
                    // Déselectionne la sélection courante
                    const features = [...carte.getSelect().getFeatures().getArray()]
                    this.getSelect().getFeatures().clear();
                    this.getSelect().dispatchEvent(new SelectEvent("select", [], [features], undefined));
                },
            });
        } else if (options.style instanceof Dialog) {
            this.styleDialog = options.style;
        }
    }

    /**
     * Fonction à l'ouverture du dialogue de style.
     * Permet d'initialiser le formulaire
     * @param {Event} e Événement envoyé par l'ouverture du dialog
     * @private
     */
    onOpenStyleDialog (e) {
        // Initialise les formulaires
        const feature = this.getStyleDialog().getSelect().getFeatures().item(0);
        if (!feature) {
            return;
        }
        setTimeout(() => {
            const flatStyle = this.getFlatStyle(feature);
            this.getStyleDialog().setFormValues(flatStyle);
        });
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
                // Désactive le toggle actif
                this.activeToggle?.setActive(false, true);
                if (e.target.getActive()) {
                    this.activeToggle = e.target;
                } else {
                    this.activeToggle = null;
                    this.select.setActive(true);
                }
            });
            toggle.getInteraction()?.on(["drawstart", "drawend", "drawabort"], this.dispatchEvent.bind(this));
        }.bind(this));

        // Ferme l'interaction si on ferme la modale
        this.dialog.on("dialog:close", () => {
            this.activeToggle?.setActive(false);
            this.activeToggle = null;
        });

        this.on("change:active", (e) => {
            try {
                this.select.clear();
            } catch {
                const features = this.select.getFeatures().getArray();
                this.select.getFeatures().clear();
                this.select.dispatchEvent(new SelectEvent("select", [], features, undefined));
                for (const property in this.select.featureLayerAssociation_) {
                    delete this.select.featureLayerAssociation_[property];
                }
            }
            this.select.setActive(e.target.getActive());
        });

        if (options.style) {
            const onStyle = options.onStyle;
            if (onStyle === false) {
                // Aucune action. Les événements sont renvoyés sur le contrôle.
                this.styleDialog.on("style", (e) => this.dispatchEvent(e));
            } else if (typeof onStyle === "function") {
                // Fonction donnée par l'user
                this.styleDialog.on("style", (e) => {
                    const { property, value } = e;
                    const features = [...this.getSelect().getFeatures().getArray()];
                    onStyle.call(this, property, value, features);
                });
            } else {
                this.styleDialog.on("style", (e) => {
                    const { property, value } = e;
                    const features = [...this.getSelect().getFeatures().getArray()];
                    this.defaultOnStyle(property, value, features);
                });

                // Applique le style courant à la fin du dessin
                this.on("drawend", (e) => {
                    if (e.feature) {
                        const styleFn = layerStyle.getStyleFunction();
                        e.feature.setStyle(styleFn(e.feature));
                    }
                });
            }
        }
    }

    /**
     * Ajoute une propriété flat style sur une entité
     * Les propriétés flat style sont récupérable via
     * `feature.get("flatStyle")` ou via la méthode `getFlatStyle(feature)` du contrôle
     * {@link Draw | Draw}
     * 
     * @param {Feature} feature Entité sur laquelle appliquer la propriété
     * @param {String} property Propriété flat style
     * @param {any} value Valeur correspondante
     * @private
     */
    setFlatStyleProperty (feature, property, value) {
        let flatStyle = feature.get("flatStyle");
        if (flatStyle === undefined) {
            feature.set("flatStyle", {});
        }
        flatStyle = feature.get("flatStyle");
        flatStyle[property] = value;
    }

    /**
     * Récupère le style flat style pour l'appliquer à un formulaire.
     * Cela concatène les valeurs actuelles et, si une entité est donnée en paramètre,
     * les propriétés de l'entité surchargent les valeurs par défaut.
     * 
     * @param {Feature} [feature] Entité depuis laquelle récupérer les propriété flatStyle
     * @returns {Object} formulaire de style flat style
     * @public
     */
    getFlatStyle (feature) {
        return Object.assign(currentStyle, feature.get("flatStyle"));
    }

    /**
     * Fonction par défaut appliquant un style sur des entités.
     * 
     * @param {String} property Nom de la propriété flatstyle
     * @param {any} value Valeur correspondante
     * @param {Array<Feature>} features Entités sur lesquelles appliquer le style.
     * @private
     */
    defaultOnStyle (property, value, features) {
        // Transforme la valeur (en fonction de son type)
        let transformer = (v) => v;
        for (const key in flatStyleTransformers) {
            if (RegExp(key, "i").test(property)) {
                transformer = flatStyleTransformers[key];
                // Pas de break pour que la dernière propriété correspondant
                // à la regex soit prise en compte
            }
        }

        // TODO : améliorer car pas très propre
        // Si modif de stroke-width, on modifie le dash aussi
        if (property === "stroke-width") {
            const dash = currentStyle["stroke-line-dash"];
            const oldWidth = currentStyle[property];
            const newWidth = transformer(value);
            if (dash) {
                currentStyle["stroke-line-dash"] = dash.map(elem => elem / oldWidth * newWidth);
            }
        }
        // Modifie la propriété text-font si on modifie la taille du texte
        else if (property === "text-font-size") {
            let fontTransformer;
            const fontProperty = "text-font";
            for (const key in flatStyleTransformers) {
                if (RegExp(key, "i").test(fontProperty)) {
                    fontTransformer = flatStyleTransformers[key];
                    break;
                }
            }
            currentStyle[fontProperty] = fontTransformer(value);
        }
        // Modifie la couleur en fonction de l'opacité
        else if (property === "fill-color-opacity") {
            const fillColor = asArray(currentStyle["fill-color"]);
            fillColor[3] = transformer(value);
            currentStyle["fill-color"] = fillColor;
        }

        // Change le style actuel
        currentStyle[property] = transformer(value);
        // Applique le nouveau style à la couche
        layerStyle.setStyle(currentStyle);
        const styleFn = layerStyle.getStyleFunction();

        // Et modifie les entités selon la fonction de style
        features.forEach(feature => {
            feature.setStyle(styleFn(feature));
            // Pour retrouver la valeur
            this.setFlatStyleProperty(feature, property, transformer(value));
        });
    }

    /**
     * Renvoie l'interaction de sélection lié au contrôle
     * @returns {Select} interaction de sélection
     */
    getSelect () {
        return this.select;
    }

    /**
     * Récupère l'interaction active si elle existe
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
     * @param {Map} map Carte à ajouter
     * @override
     */
    setMap (map) {
        this.select && this.getMap()?.removeInteraction(this.select);

        super.setMap(map);

        if (map) {
            this.modify && map.addInteraction(this.modify);
            this.toggleInteractions.forEach(i => {
                i.setMap(map);
            });
            this.select && map.addInteraction(this.select);

            this.styleDialog && map.addControl(this.styleDialog);

            this.layer && map.addLayer(this.layer);

            this.snap && map.addInteraction(this.snap);
        }
    }

    /**
     * Retourne la source utilisée actuellement
     * @returns {VectorSource} Source actuelle
     */
    getSource () {
        return this.source;
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

        // Recréée une interaction snap (car impossible de modifier la source directement).
        if (this.snap) {
            this.snap = new Snap({ source : this.source });
            this.snap.setMap(this.getMap());
        }
    }

    /**
     * Ajoute une interaction au contrôle
     * @param {InteractionOptions} options Options pour l'ajout de l'interaction
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

    /**
     * Renvoie le dialogue de style, s'il est ajouté au contrôleur.
     * 
     * @returns {StyleDialog|undefined} Dialogue de style
     */
    getStyleDialog () {
        return this.styleDialog;
    }

}

export default Draw;
export { dsfrDefaultIcons, defaultIcons };

// Expose Draw as ol.control.Draw (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.Draw = Draw;
}
