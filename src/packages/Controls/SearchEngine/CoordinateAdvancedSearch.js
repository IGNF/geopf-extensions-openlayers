// import CSS
import AbstractAdvancedSearch from "./AbstractAdvancedSearch";
import Logger from "../../Utils/LoggerByDefault";
import CRS from "../../CRS/CRS";
import Helper from "../../Utils/Helper";
import {
    transform as olProjTransform,
    get as olProjGet
} from "ol/proj";
import MathUtils from "../../Utils/MathUtils";
import Feature from "ol/Feature.js";
import Point from "ol/geom/Point.js";

let logger = Logger.getLogger("abstractAdvancedSearch");

/**
 * @classdesc
 * Contrôle de recherche avancée par coordonnées
 * (saisie pour différents systèmes de coordonnées et unités correspondantes).
 *
 * @alias ol.control.CoordinateAdvancedSearch
 * @module CoordinateAdvancedSearch
 */
class CoordinateAdvancedSearch extends AbstractAdvancedSearch {

    /**
     * Constructeur.
     *
     * @constructor
     * @param {CoordinateAdvancedSearchOptions} [options] Options du contrôle
     */
    constructor (options) {
        super(options);

        // validation gérée par _validateCoordinates
        this.element.setAttribute("novalidate", "");
        this.element.dataset.unitType = this.get("unitType");
        this.element.dataset.unit = this.unit.value;
    }

    /**
     * @override
     * @protected
     * @param {CoordinateAdvancedSearchOptions} options Options d'initialisation
     */
    initialize (options) {
        if (!options.name) {
            options.name = "Coordonnées";
        }
        super.initialize(options);

        this._initCoordinateSearchSystems(options);
        this._initCoordinateSearchUnits(options);

        this._boundOnLonLatBeforeInput = this._onlonLatBeforeInput.bind(this);
        this._boundOnLonLatInput = this._onlonLatInput.bind(this);

        this._currentCoordinateSystem = this._coordinateSearchSystems[0];
        this._currentUnit = this._coordinateSearchUnits[this._currentCoordinateSystem.type];

        this.set("unitType", this._currentCoordinateSystem.type);
        this.set("unit", this._currentUnit[0].code);

        /**
         * Nom de la classe (heritage)
         * @private
         */
        this.CLASSNAME = "CoordinateAdvancedSearch";
    }

    /**
     * @private
     * @param {CoordinateAdvancedSearchOptions} [options] Options d'initialisation possibles (options.coordinateSearch.systems)
     */
    _initCoordinateSearchSystems (options) {
        this._coordinateSearchSystems = [];
        // on donne la possibilité à l'utilisateur de modifier
        // la liste des systèmes à afficher
        // Ex. this.options.coordinateSearch.systems

        // systemes de projection disponible par defaut
        // (extent : bornes [minX, minY, maxX, maxY] dans l'unité native du CRS)
        let projectionSystemsByDefault = [{
            label : "G\u00e9ographique",
            crs : "EPSG:4326",
            type : "Geographical",
            extent : [-180, -90, 180, 90]
        }, {
            label : "Web Mercator",
            crs : "EPSG:3857",
            type : "Metric",
            // projected bounds EPSG (https://epsg.io/3857)
            extent : [-20037508.34, -20048966.10, 20037508.34, 20048966.10]
        }, {
            label : "Lambert 93",
            crs : "EPSG:2154",
            type : "Metric",
            // projected bounds EPSG (https://epsg.io/2154)
            extent : [-378305.81, 6005281.21, 1320649.57, 7235612.72]
        }];

        if (options && options.coordinateSearch && options.coordinateSearch.systems) {
            let systems = options.coordinateSearch.systems;
            // on ajoute les definitions d'un systeme de reference fournies par l'utilisateur
            for (let i = 0; i < systems.length; i++) {
                let sys = systems[i];
                this._setSystem(sys);
            }
        }

        // on ajoute les systèmes de projections par défaut
        if (this._coordinateSearchSystems.length === 0) {
            for (let j = 0; j < projectionSystemsByDefault.length; j++) {
                this._setSystem(projectionSystemsByDefault[j]);
            }
        }
    }

    /**
     * @private
     * @param {CoordinateAdvancedSearchOptions} [options] Options d'initialisation possibles (options.coordinateSearch.units)
     */
    _initCoordinateSearchUnits (options) {
        this._coordinateSearchUnits = [];
        // on donne la possibilité à l'utilisateur de modifier
        // la liste des unités à afficher
        // Ex.
        // this.options.units : ["DEC", "DMS"]

        // unités disponible par defaut
        let projectionUnitsByDefault = {
            Geographical : [{
                code : "DEC",
                label : "Degrés décimaux",
                format : MathUtils.coordinateToDecimal
            }, {
                code : "DMS",
                label : "Degrés sexagésimaux",
                format : MathUtils.coordinateToDMS
            }],
            Metric : [{
                code : "M",
                label : "Mètres",
                format : MathUtils.coordinateToMeter
            }, {
                code : "KM",
                label : "Kilomètres",
                format : MathUtils.coordinateToKMeter
            }]
        };

        if (options && options.coordinateSearch && options.coordinateSearch.units) {
            let units = options.coordinateSearch.units;
            for (let type in projectionUnitsByDefault) {
                if (projectionUnitsByDefault.hasOwnProperty(type)) {
                    let found = false;
                    for (let j = 0; j < projectionUnitsByDefault[type].length; j++) {
                        let obj = projectionUnitsByDefault[type][j];
                        for (let i = 0; i < units.length; i++) {
                            let unit = units[i];
                            if (obj.code === unit) {
                                found = true;
                                if (!this._coordinateSearchUnits[type]) {
                                    this._coordinateSearchUnits[type] = [];
                                }
                                this._coordinateSearchUnits[type].push(obj);
                            }
                        }
                    }
                    if (!found) {
                        this._coordinateSearchUnits[type] = projectionUnitsByDefault[type];
                    }
                }
            }
        }

        // au cas où...
        if (typeof this._coordinateSearchUnits === "object" && Object.keys(this._coordinateSearchUnits).length === 0) {
            this._coordinateSearchUnits = projectionUnitsByDefault;
        }
    }

    /**
     * Définit un système de projection supplémentaire et charge sa définition CRS si nécessaire.
     *
     * @private
     * @param {CoordinateSearchSystem} system Description du système de projection
     * @returns {void}
     */
    _setSystem (system) {
        if (typeof system !== "object") {
            logger.log("[ERROR] CoordinateAdvancedSearch:_setSystem - system parameter should be an object");
            return;
        }
        if (!system.crs) {
            logger.error("crs not defined !");
            return;
        }
        if (!system.label) {
            logger.warn("crs label not defined, use crs code by default.");
            system.label = system.crs;
        }
        if (!system.type) {
            logger.warn("type srs not defined, use 'Metric' by default.");
            system.type = "Metric";
        }

        // chargement de la definition de la projection
        // même si déjà chargé...
        CRS.loadByName(system.crs);

        if (!olProjGet(system.crs)) {
            logger.error("crs '{}' not available into proj4 definitions !", system.crs);
            return;
        }

        if (!system.extent) {
            system.extent = olProjGet(system.crs).getExtent() || undefined;
        }

        // add system to control systems
        for (var j = 0; j < this._coordinateSearchSystems.length; j++) {
            var obj = this._coordinateSearchSystems[j];
            if (system.crs === obj.crs) {
                // warn user
                logger.info("crs '{}' already configured", obj.crs);
            }
        }
        system.code = this._coordinateSearchSystems.length;
        this._coordinateSearchSystems.push(system);
    }

    /**
     * Set les valeurs entrées en paramètre dans les inputs longitude / latitude.
     *
     * @public
     * @param {Array} coords [Longitude / X, lat Latitude / Y]
     */
    setCoordinates (coords) {
        const lonInput = this.lon.querySelector("input");
        const latInput = this.lat.querySelector("input");

        if (lonInput) {
            lonInput.value = coords[0];
        }

        if (latInput) {
            latInput.value = coords[1];
        }
    }

    /**
    * Récupère les coordonnées saisies dans les inputs.
    *
    * - En mode DMS : retourne les valeurs sous forme de chaînes.
    * - Sinon : retourne les valeurs sous forme de nombres.
    *
    * @public
    * @returns {[String, String]|[Number, Number]|undefined} current coordinates set
    */
    getCoordinates () {
        const lon = this.lon.querySelector("input").value;
        const lat = this.lat.querySelector("input").value;

        // Cas DMS : on conserve les strings
        if (this.get("unit") === "DMS") {
            return (lon.length === this._dmsLength("lon") && lat.length === this._dmsLength("lat")) ? [lon, lat] : undefined;
        }

        const coords = [parseFloat(lon.replace(",", ".")), parseFloat(lat.replace(",", "."))];

        // si une des deux coordonnées n'a pu être récupéré correctement, on renvoie undefined
        if (Number.isNaN(coords[0]) || Number.isNaN(coords[1])) {
            return undefined;
        }

        return coords;
    }

    /**
     * Crée un conteneur d'étiquette pour un élément d'input.
     *
     * @private
     * @param {String} text Texte de l'étiquette
     * @param {String} type Classe CSS du conteneur
     * @param {HTMLElement} [input] Élément input à rattacher
     * @param {Boolean} [mandatory=false] Indique si le champ est obligatoire
     * @returns {HTMLElement} Élément conteneur (div)
     */
    _getLabelContainer (text, type, input, mandatory = false) {
        const container = document.createElement("div");
        container.className = type;
        const label = this._createLabel(text, mandatory);
        container.appendChild(label);
        if (input) {
            label.setAttribute("for", input.id);
            container.appendChild(input);
        }
        return container;
    }

    /**
     * Crée un élément label.
     *
     * @private
     * @param {String} text Texte du label
     * @param {Boolean} [mandatory=false] Ajoute un astérisque si vrai
     * @returns {HTMLLabelElement} Élément label créé
     */
    _createLabel (text, mandatory = false) {
        const label = document.createElement("label");
        label.className = "fr-label";
        const star = mandatory ? "*" : "";
        label.textContent = text + star;
        return label;
    }

    /**
     * Met à jour le texte d'un label existant.
     *
     * @private
     * @param {String} text Nouveau texte
     * @param {HTMLElement} container Conteneur contenant le label à mettre à jour
     * @param {Boolean} [mandatory=false] Indique si le champ est obligatoire
     */
    _updateLabel (text, container, mandatory = false) {
        const label = container.querySelector("label");
        const star = mandatory ? "*" : "";
        label.innerText = text + star;
    }

    /**
     * @override
     * @protected
     */
    addInputs () {
        super.addInputs();

        // Indication champs obligatoire
        const div = document.createElement("div");
        const mandatory = document.createElement("span");
        mandatory.className = "GPLabelHint fr-hint-text";
        mandatory.textContent = "* Tous les champs sont obligatoires";
        div.appendChild(mandatory);
        this.inputs.push(div);

        // Système de référence
        const systemSelect = this.system = document.createElement("select");
        systemSelect.className = "fr-select";
        systemSelect.id = systemSelect.name = Helper.getUid("CoordinateAdvancedSearch-system-");
        const systemContainer = this._getLabelContainer("Système de référence", "fr-select-group", systemSelect, true);
        this.inputs.push(systemContainer);

        this._coordinateSearchSystems.forEach((elem, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.selected = !index;
            option.innerText = elem.label;
            systemSelect.appendChild(option);
        });

        // Unité correspondantes
        const unitSelect = this.unit = document.createElement("select");
        unitSelect.className = "fr-select";
        unitSelect.id = unitSelect.name = Helper.getUid("CoordinateAdvancedSearch-unit-");
        const unitContainer = this._getLabelContainer("Unité", "fr-select-group", unitSelect, true);
        this.inputs.push(unitContainer);

        for (let j = 0; j < this._currentUnit.length; j++) {
            const unit = this._currentUnit[j];
            const option = document.createElement("option");
            option.value = (unit.code) ? unit.code : j;;
            option.textContent = unit.label || j;
            unitSelect.appendChild(option);
        }

        // Longitude et Latitude / X et Y
        const values = this.lonLatInputs = document.createElement("div");
        values.className = "GPLonLatInputs";
        
        // Latitude / Y
        const latWrapper = this.lat = this.createCoordinateInput("lat");
        values.appendChild(latWrapper);

        // Longitude / X
        const lonWrapper = this.lon = this.createCoordinateInput("lon");
        values.appendChild(lonWrapper);

        this.inputs.push(values);
    }

    /**
     * Crée le wrapper (label + input + masques) pour une composante de coordonnées (lon/lat).
     *
     * @private
     * @param {"lon"|"lat"} type Type de composante ("lon" ou "lat")
     * @returns {HTMLElement} Wrapper contenant l'input et éléments associés
     */
    createCoordinateInput (type) {
        // type = "lon" or "lat"
        const wrapper = document.createElement("div");
        wrapper.className = "GPCoordinateWrapper";

        // Label
        const labelText = type === "lon" ? "Longitude" : "Latitude";
        const label = this._createLabel(labelText, true);
        wrapper.appendChild(label);

        // Input container
        const inputContainer = document.createElement("div");
        inputContainer.className = "GPCoordinateInputs";
        wrapper.appendChild(inputContainer);

        // Input
        const div = document.createElement("div");
        const input = document.createElement("input");
        input.className = "GPCoordinateInput fr-input";
        input.type = "text";
        input.name = type;
        input.inputMode = "numeric";
        input.autocomplete = "off";
        input.required = true;
        input.id = Helper.getUid(`CoordinateAdvancedSearch-${type}-`);
        div.appendChild(input);
        inputContainer.appendChild(div);

        // Lie le label à l'input
        label.setAttribute("for", input.id);

        // Mask
        const mask = document.createElement("div");
        mask.className = "display-mask";
        mask.textContent = this._format("", type);
        div.appendChild(mask);

        // Cardinal points
        inputContainer.appendChild(this._createSelectCardinals(type));

        // Error message
        const messages = document.createElement("div");
        messages.className = "GPMessagesGroup fr-messages-group";
        messages.setAttribute("aria-live", "polite");
        wrapper.appendChild(messages);

        return wrapper;
    }

    /**
     * Crée la liste des points cardinaux (N/S ou O/E) pour un champ de coordonnées.
     *
     * @private
     * @param {String} baseName "lon" ou "lat"
     * @returns {HTMLSelectElement|undefined} Élément select des cardinaux ou undefined si non applicable
     */
    _createSelectCardinals (baseName) {
        const options = {
            lon : ["O", "E"],
            lat : ["N", "S"],
        };

        if (!options[baseName]) {
            return;
        } else {
            const cardinals = document.createElement("select");
            cardinals.className = "fr-select";
            cardinals.id = cardinals.name = Helper.getUid("CoordinateAdvancedSearch-cardinal-");

            options[baseName].forEach(value => {
                const option = document.createElement("option");
                option.value = option.textContent = value;
                cardinals.appendChild(option);
            });

            return cardinals;
        }
    }

    /**
     * @override
     * @protected
     * @param {CoordinateAdvancedSearchOptions} options Options d'initialisation
     */
    _initEvents (options) {
        super._initEvents(options);

        this.system.addEventListener("change", this._updateSystem.bind(this));

        this.unit.addEventListener("change", this._updateUnits.bind(this));

        this.on("change:unitType", this._updateInputsLabel.bind(this));

        this.on("change:unit", this._updateInputs.bind(this));
    }

    /**
     * Met à jour le système de référence sélectionné et réinitialise les unités disponibles.
     *
     * @private
     * @param {Event} e Événement change provenant du select système
     */
    _updateSystem (e) {
        const crs = this._coordinateSearchSystems[e.target.value].crs;
        this._clearMessages();

        if (crs !== this._currentCoordinateSystem.crs) {
            // transformation des coordonnées dans le nouveau système selectionné
            let coords = this.getCoordinates();
            let newCoords;
            if (coords) {
                // conversion des coordonnées dans l'unité par défaut du système de coordonnées
                coords = this._normalizeCoordinatesUnit(coords);
                newCoords = olProjTransform(coords, this._currentCoordinateSystem.crs, crs);
                newCoords[0] = newCoords[0].toFixed(2);
                newCoords[1] = newCoords[1].toFixed(2);
            } else {
                newCoords = ["", ""];
            }
            
            this._currentCoordinateSystem = this._coordinateSearchSystems[e.target.value];
            this._currentUnit = this._coordinateSearchUnits[this._currentCoordinateSystem.type];
            this.unit.replaceChildren();
            for (let j = 0; j < this._currentUnit.length; j++) {
                const unit = this._currentUnit[j];
                const option = document.createElement("option");
                option.value = (unit.code) ? unit.code : j;
                option.textContent = unit.label || j;
                this.unit.appendChild(option);
            }
            e.target.closest("form").dataset.unit = this.unit.value;
            this.set("unit", this.unit.value);
            e.target.closest("form").dataset.unitType = this._currentCoordinateSystem.type;
            this.set("unitType", this._currentCoordinateSystem.type);

            // remplissage des inputs coordonnées avec les coordonnées calculés plus haut
            this.setCoordinates(newCoords);
        }
    }

    /**
     * Met à jour l'unité sélectionnée et stocke la valeur dans le dataset du formulaire.
     *
     * @private
     * @param {Event} e Événement change provenant du select unité
     */
    _updateUnits (e) {
        const value = e.target.value;
        this._clearMessages();
        if (this.get("unit") !== value) {
            e.target.closest("form").dataset.unit = value;
            this.set("unit", value);
        }
    }

    /**
     * Met à jour les labels des inputs en fonction du type d'unités (géographique vs métrique).
     *
     * @private
     */
    _updateInputsLabel () {
        const unitType = this.get("unitType");
        const degree = unitType === "Geographical";
        const labels = {
            "lon" : degree ? "Longitude" : "X",
            "lat" : degree ? "Latitude" : "Y",
        };
        this._updateLabel(labels.lon, this.lon, true);
        this._updateLabel(labels.lat, this.lat, true);

        // Reset la valeur
        this.lon.querySelector("input").value = "";
        this.lat.querySelector("input").value = "";
    }

    /**
     * Met à jour les inputs lorsque l'unité change (conversion ou activation du masquage pour DMS).
     *
     * @private
     */
    _updateInputs () {
        const unit = this.get("unit");
        let factor = 1;
        if (this.get("unitType") === "Metric") {
            factor = unit === "KM" ? 0.001 : 1000;
        }
        // TODO : Faire convertion ?!
        if (unit === "DMS") {
            this.lonLatInputs.querySelectorAll("input").forEach(input => {
                const type = input.name;
                const decCoord = this._decimalToCompactDMS(input.value, type);
                
                // Remplit l'input avec la valeur DMS (longitude vide préremplie à "0" pour DDDMMSS)
                input.value = input.value === "" ? this._emptyDMSValue(type) : decCoord.value;

                // Met à jour le mask visuel
                const mask = input.parentElement.querySelector(".display-mask");
                if (mask) {
                    mask.textContent = this._format(input.value, type);
                }

                // Met à jour le select cardinal juste après l'input
                const cardinalSelect = input.closest(".GPCoordinateInputs").querySelector("select");
                if (cardinalSelect) {
                    cardinalSelect.value = decCoord.cardinal;
                }

                input.minLength = String(this._dmsLength(type));
                input.maxLength = String(this._dmsLength(type));
                input.addEventListener("beforeinput", this._boundOnLonLatBeforeInput);
                input.addEventListener("input", this._boundOnLonLatInput);
            });
        } else {
            this.lonLatInputs.querySelectorAll("input").forEach(input => {
                if (unit === "DEC") {
                    const cardinal = input.closest(".GPCoordinateInputs").querySelector("select").value;
                    input.value = input.value === this._emptyDMSValue(input.name) ? "" : this._decimalCompactDMSToDecimal(input.value, input.name, cardinal);
                } else {
                    const value = input.value.replace(",", ".");
                    input.value = value === "" || isNaN(value) ? "" : parseFloat(value) * factor;
                }
                input.removeAttribute("minLength");
                input.removeAttribute("maxLength");
                input.removeEventListener("beforeinput", this._boundOnLonLatBeforeInput);
                input.removeEventListener("input", this._boundOnLonLatInput);
            });
            this._resetMasks();
        }
    }

    /**
     * Réinitialise les masques DMS des inputs.
     *
     * @private
     */
    _resetMasks () {
        this.lonLatInputs.querySelectorAll("input").forEach(input => {
            const mask = input.parentElement.querySelector(".display-mask");
            if (mask) {
                mask.textContent = this._format(input.value, input.name);
            }
        });
    }

    /**
     * Nombre de chiffres attendus pour une coordonnée DMS compacte.
     *
     * @private
     * @param {"lon"|"lat"} type Type de coordonnée
     * @returns {Number} 7 (DDDMMSS) pour la longitude, 6 (DDMMSS) pour la latitude
     */
    _dmsLength (type) {
        return type === "lon" ? 7 : 6;
    }

    /**
     * Valeur initiale d'un input DMS vide.
     *
     * @private
     * @param {"lon"|"lat"} type Type de coordonnée
     * @returns {String} "0" pour la longitude, "" sinon
     */
    _emptyDMSValue (type) {
        return type === "lon" ? "0" : "";
    }

    /**
     * Découpe une coordonnée DMS compacte en degrés, minutes, secondes.
     *
     * @private
     * @param {String} dms Chaîne DMS compacte (DDDMMSS ou DDMMSS)
     * @param {"lon"|"lat"} type Type de coordonnée
     * @returns {Array<Number>} [degrés, minutes, secondes]
     */
    _splitCompactDMS (dms, type) {
        const clean = String(dms).padStart(this._dmsLength(type), "0");
        const n = clean.length;
        return [
            parseInt(clean.slice(0, n - 4), 10),
            parseInt(clean.slice(n - 4, n - 2), 10),
            parseInt(clean.slice(n - 2), 10)
        ];
    }

    /**
     * Validation avant saisie pour les formats DMS : n'autorise que les chiffres (évite les lettres).
     *
     * @private
     * @param {InputEvent} e Événement beforeinput
     */
    _onlonLatBeforeInput (e) {
        // const regex = /^(?:\d{2}°\d{2}'\d{2}(?:"|''))$|^\d{6}$/;
        const regex = /^\d+$/;
        // Vérifie si c'est un chiffre
        // TODO : améliorer cela ? vis à vis du insertLineBreak (touche entrée)
        if (e.inputType.startsWith("insert") && e.inputType != "insertLineBreak" && !regex.test(e.data)) {
            e.preventDefault();
        }
    }

    /**
     * Formate une chaîne compacte en DMS (DDD°MM'SS" ou DD°MM'SS").
     *
     * @private
     * @param {String} value Valeur brute (caractères numériques)
     * @param {"lon"|"lat"} type Type de coordonnées
     * @returns {String} Chaîne formatée (ex. "012°34'56\"")
     */
    _format (value, type) {
        const n = this._dmsLength(type);
        const v = value.padEnd(n, "_");
        return `${v.slice(0, n - 4)}°${v.slice(n - 4, n - 2)}'${v.slice(n - 2, n)}"`;
    }

    /**
     * Met à jour l'affichage du masque pendant la saisie DMS.
     *
     * @private
     * @param {InputEvent} e Événement input
     */
    _onlonLatInput (e) {
        const value = e.target.value;
        const mask = e.target.parentElement.querySelector(".display-mask");
        mask.textContent = this._format(value, e.target.name);
    }

    /**
     * Normalise des coordonnées selon l’unité actuellement sélectionnée.
     *
     * Convertit :
     * - les coordonnées DMS en degrés décimaux,
     * - les coordonnées en kilomètres vers des mètres,
     * - les autres valeurs en nombres flottants.
     *
     * @private
     * @param {Array<String|Number>} coords Tableau contenant les coordonnées [lon, lat]
     * @returns {Array<Number>} Tableau normalisé contenant [lon, lat]
     */
    _normalizeCoordinatesUnit (coords) {
        let lon = String(coords[0]).replace(",", ".");
        let lat = String(coords[1]).replace(",", ".");
        if (this.get("unit") === "DMS") {
            // Transforme les DMS en degrés décimaux
            lon = this._decimalCompactDMSToDecimal(lon, "lon", this.lon.querySelector("select").value);
            lat = this._decimalCompactDMSToDecimal(lat, "lat", this.lat.querySelector("select").value);
        } else if (this.get("unit") === "KM") {
            // Transforme les kilomètres en mètre
            lon = parseFloat(lon) * 1000;
            lat = parseFloat(lat) * 1000;
        } else {
            // Récupère les valeurs en float
            lon = parseFloat(lon);
            lat = parseFloat(lat);
        }
        return [lon, lat];
    }

    /**
     * Convertit une coordonnée DMS compacte (DDDMMSS ou DDMMSS + cardinal)
     * en degrés décimaux.
     *
     * Exemple :
     * "0022108", "E" -> 2.3522
     * "0022108", "O" -> -2.3522
     * "485124", "N" -> 48.8566
     * "485124", "S" -> -48.8566
     *
     * @private
     * @param {String} dms Chaîne DMS compacte (7 chiffres DDDMMSS en longitude, 6 chiffres DDMMSS en latitude)
     * @param {"lon"|"lat"} type Type de coordonnée
     * @param {String} cardinal Point cardinal ("N","S","E","O")
     * @returns {Number} Coordonnée en degrés décimaux
     */
    _decimalCompactDMSToDecimal (dms, type, cardinal) {
        const [degres, minutes, secondes] = this._splitCompactDMS(dms, type);

        let decimal = degres + minutes / 60 + secondes / 3600;

        // Gestion du signe via cardinal
        if (
            (type === "lat" && cardinal === "S") ||
            (type === "lon" && cardinal === "O")
        ) {
            decimal = -decimal;
        }

        return decimal;
    }

    /**
     * Convertit une coordonnée décimale en format DMS compact :
     * DDDMMSS (longitude) ou DDMMSS (latitude) + point cardinal.
     *
     * Exemple :
     *  2.3522  (lon) -> { value: "0022108", cardinal: "E" }
     * -2.3522  (lon) -> { value: "0022108", cardinal: "O" }
     * 48.8566  (lat) -> { value: "485124", cardinal: "N" }
     * -48.8566 (lat) -> { value: "485124", cardinal: "S" }
     *
     * @private
     * @param {String|Number} decimal Coordonnée décimale
     * @param {"lon"|"lat"} type Type de coordonnée
     * @returns {{value: String, cardinal: String}}
     */
    _decimalToCompactDMS (decimal, type) {
        decimal = String(decimal).replace(",", ".");
        const abs = Math.abs(decimal);

        const degres = Math.floor(abs);

        const minutesFloat = (abs - degres) * 60;
        const minutes = Math.floor(minutesFloat);

        const secondes = Math.round((minutesFloat - minutes) * 60);

        // Gestion du point cardinal
        let cardinal;

        if (type === "lon") {
            cardinal = decimal < 0 ? "O" : "E";
        } else {
            cardinal = decimal < 0 ? "S" : "N";
        }

        return {
            value : [
                String(degres).padStart(this._dmsLength(type) - 4, "0"),
                String(minutes).padStart(2, "0"),
                String(secondes).padStart(2, "0")
            ].join(""),
            cardinal
        };
    }

    /**
     * @override
     * @protected
     * @param {PointerEvent} e Événement de soumission
     */
    _onSearch (e) {
        super._onSearch(e);
        this._clearMessages();
        if (!this._validateCoordinates()) {
            return;
        }
        // Récupère les valeurs des inputs
        let coords = this.getCoordinates();
        let normalizedCoords = this._normalizeCoordinatesUnit(coords);
        
        // Projette les coordonnées dans les coordonnées de la carte
        const mapProj = this.getMap().getView().getProjection().getCode();
        const currentProj = this._currentCoordinateSystem.crs;
        if (mapProj !== currentProj) {
            normalizedCoords = olProjTransform(normalizedCoords, currentProj, mapProj);
        }

        const geom = new Point(normalizedCoords);
        const f = new Feature({ geometry : geom });
        // Ajout des coordonnées pour le popup dans l'unité d'origine
        f.set("infoPopup", this._createInfoPopup(coords[0], coords[1]));

        this.dispatchEvent({
            type : "search",
            result : f,
        });
    }

    /**
     * Vérifie le format et les bornes des coordonnées saisies,
     * et affiche les messages d'erreur sous les champs concernés.
     *
     * @private
     * @returns {Boolean} true si les coordonnées sont valides
     */
    _validateCoordinates () {
        const geographical = this.get("unitType") === "Geographical";
        const labels = {
            lon : geographical ? "La longitude" : "La valeur X",
            lat : geographical ? "La latitude" : "La valeur Y"
        };
        const types = ["lon", "lat"];
        let valid = true;

        types.forEach(type => {
            const value = this[type].querySelector("input").value.trim();
            if (!value) {
                this._showMessage(type, `${labels[type]} est obligatoire.`);
                valid = false;
            } else if (!this._isValidCoordinateFormat(value, type)) {
                this._showMessage(type, `${labels[type]} saisie ne correspond pas au format attendu (${this._getFormatHint(type)}).`);
                valid = false;
            }
        });
        if (!valid) {
            return false;
        }

        const system = this._currentCoordinateSystem;
        if (!system.extent) {
            return true;
        }
        const coords = this._normalizeCoordinatesUnit(this.getCoordinates());
        types.forEach((type, i) => {
            const min = system.extent[i];
            const max = system.extent[i + 2];
            if (coords[i] < min || coords[i] > max) {
                this._showMessage(type, `${labels[type]} saisie est en dehors du champ de définition du système ${system.label} : [${this._formatBound(min, type)} ; ${this._formatBound(max, type)}].`);
                valid = false;
            }
        });
        return valid;
    }

    /**
     * Vérifie le format d'une coordonnée selon l'unité courante.
     *
     * @private
     * @param {String} value Valeur saisie
     * @param {"lon"|"lat"} type Type de coordonnée
     * @returns {Boolean} true si le format est correct
     */
    _isValidCoordinateFormat (value, type) {
        if (this.get("unit") === "DMS") {
            if (!new RegExp(`^\\d{${this._dmsLength(type)}}$`).test(value)) {
                return false;
            }
            const [, minutes, secondes] = this._splitCompactDMS(value, type);
            return minutes < 60 && secondes < 60;
        }
        return /^[-+]?(\d+([.,]\d*)?|[.,]\d+)$/.test(value);
    }

    /**
     * Description du format attendu pour l'unité courante.
     *
     * @private
     * @param {"lon"|"lat"} type Type de coordonnée
     * @returns {String} Description du format
     */
    _getFormatHint (type) {
        switch (this.get("unit")) {
            case "DMS":
                return type === "lon"
                    ? "7 chiffres DDDMMSS, minutes et secondes inférieures à 60"
                    : "6 chiffres DDMMSS, minutes et secondes inférieures à 60";
            case "DEC":
                return "nombre décimal en degrés";
            case "KM":
                return "nombre en kilomètres";
            case "M":
                return "nombre en mètres";
            default:
                return "nombre";
        }
    }

    /**
     * Formate une borne (exprimée dans l'unité native du CRS) dans l'unité courante.
     *
     * @private
     * @param {Number} value Borne en degrés ou en mètres
     * @param {"lon"|"lat"} type Type de coordonnée
     * @returns {String} Borne formatée
     */
    _formatBound (value, type) {
        const fmt = (n) => n.toLocaleString("fr-FR", { maximumFractionDigits : 2 });
        switch (this.get("unit")) {
            case "DMS": {
                const dms = this._decimalToCompactDMS(value, type);
                const [d, m, s] = this._splitCompactDMS(dms.value, type);
                return `${d}°${String(m).padStart(2, "0")}'${String(s).padStart(2, "0")}" ${dms.cardinal}`;
            }
            case "DEC":
                return `${fmt(value)}°`;
            case "KM":
                return `${fmt(value / 1000)} km`;
            default:
                return `${fmt(value)} m`;
        }
    }

    /**
     * Construit le contenu HTML à afficher dans la popup à partir des coordonnées fournies.
     *
     * @private
     * @param {Number|String} lon Valeur X / longitude
     * @param {Number|String} lat Valeur Y / latitude
     * @returns {String} Contenu HTML (string) à injecter dans la popup
     */
    _createInfoPopup (lon, lat) {
        let x, y, valueX, valueY;
        if (this.get("unitType") === "Geographical") {
            x = "Longitude";
            y = "Latitude";

            if (this.get("unit") === "DMS") {
                const [lonD, lonM, lonS] = this._splitCompactDMS(this.lon.querySelector("input").value, "lon");
                const lonCardinal = this.lon.querySelector("select").value;
                valueX = `${lonD}°${lonM}'${lonS}" ${lonCardinal}`;

                const [latD, latM, latS] = this._splitCompactDMS(this.lat.querySelector("input").value, "lat");
                const latCardinal = this.lat.querySelector("select").value;
                valueY = `${latD}°${latM}'${latS}" ${latCardinal}`;
            } else {
                valueX = `${lon.toFixed(2)} °`;
                valueY = `${lat.toFixed(2)} °`;
            }
        } else {
            y = "Y";
            x = "X";
            valueY = `${lat.toFixed(2)} ${this.get("unit").toLowerCase()}`;
            valueX = `${lon.toFixed(2)} ${this.get("unit").toLowerCase()}`;
        }
        const infoPopup = `<b>${y} : </b>${valueY}<br><b>${x} : </b>${valueX}`;
        return infoPopup;
    }


    /**
     * Réinitialise les champs du formulaire.
     * @param {PointerEvent} e Événement d'effacement
     * @protected
     */
    _onErase (e) {
        super._onErase(e);
        if (this.get("unit") === "DMS") {
            this.lonLatInputs.querySelectorAll("input").forEach(input => {
                input.value = this._emptyDMSValue(input.name);
            });
        }
        this._resetMasks();
        this._clearMessages();
    }

}

export default CoordinateAdvancedSearch;

// Expose CoordinateAdvancedSearch as ol.control.CoordinateAdvancedSearch (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.CoordinateAdvancedSearch = CoordinateAdvancedSearch;
}
