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
 * CoordinateAdvancedSearch Base control
 *
 * @alias ol.control.CoordinateAdvancedSearch
 * @module CoordinateAdvancedSearch
*/
class CoordinateAdvancedSearch extends AbstractAdvancedSearch {

    /**
    * @constructor
    * @example
    */
    constructor (options) {
        super(options);

        this.element.dataset.unitType = this.get("unitType");
        this.element.dataset.unit = this.unit.value;
    }

    initialize (options) {
        if (!options.name) {
            options.name = "Coordonnées";
        }
        super.initialize(options);

        this._initCoordinateSearchSystems(options);
        this._initCoordinateSearchUnits(options);

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
     * this method is called by the constructor and initialize the projection
     * systems.
     * getting coordinates in the requested projection :
     * see this.onCoordinateSearchSystemChange()
     *
     * @private
     */
    _initCoordinateSearchSystems (options) {
        this._coordinateSearchSystems = [];
        // on donne la possibilité à l'utilisateur de modifier
        // la liste des systèmes à afficher
        // Ex. this.options.coordinateSearch.systems

        // systemes de projection disponible par defaut
        let projectionSystemsByDefault = [{
            label : "G\u00e9ographique",
            crs : "EPSG:4326",
            type : "Geographical"
        }, {
            label : "Web Mercator",
            crs : "EPSG:3857",
            type : "Metric"
        }, {
            label : "Lambert 93",
            crs : "EPSG:2154",
            type : "Metric"
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
     * this method is called by the constructor and initialize the units.
     * getting coordinates in the requested units :
     * see this.onCoordinateSearchUnitsChange()
     *
     * @private
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
     * Set additional projection system
     *
     * @param {Object} system - projection system
     * @param {String} system.crs - Proj4 crs alias (from proj4 defs) e.g. "EPSG:4326"
     * @param {String} [system.label] - CRS label to be displayed in control. Default is system.crs alias
     * @param {String} [system.type] - CRS units type for coordinates conversion (one of control options.units). Default is "Metric"
     * @private
     */
    /**
     * Définit un système de projection supplémentaire
     *
     * @param {Object} system - système de projection
     * @param {String} system.crs - Alias CRS Proj4 (depuis les définitions proj4), ex. "EPSG:4326"
     * @param {String} [system.label] - Libellé du CRS affiché dans le contrôle. Par défaut, l’alias system.crs
     * @param {String} [system.type] - Type d’unités du CRS pour la conversion des coordonnées. Par défaut : "Metric"
     * @private
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

    _createLabel (text, mandatory = false) {
        const label = document.createElement("label");
        label.className = "fr-label";
        const star = mandatory ? "*" : "";
        label.textContent = text + star;
        return label;
    }


    _updateLabel (text, container, mandatory = false) {
        const label = container.querySelector("label");
        const star = mandatory ? "*" : "";
        label.innerText = text + star;
    }

    /**
     * Ajoute des éléments d'input dans la collection `this.inputs`;
     * Cette méthode est abstraite et doit être surchargée dans les autres classes.
     * @protected
     * @abstract
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
        
        // Longitude / X
        const lonWrapper = this.lon = this.createCoordinateInput("lon");
        values.appendChild(lonWrapper);
        
        // Latitude / Y
        const latWrapper = this.lat = this.createCoordinateInput("lat");
        values.appendChild(latWrapper);
        
        this.inputs.push(values);
    }

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
        mask.textContent = "__°__'__\"";
        // inputContainer.appendChild(mask);
        div.appendChild(mask);

        // Cardinal points
        inputContainer.appendChild(this._createSelectCardinals(type));

        return wrapper;
    }


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

    _initEvents (options) {
        super._initEvents(options);

        this.system.addEventListener("change", this._updateSystem.bind(this));

        this.unit.addEventListener("change", this._updateUnits.bind(this));

        this.on("change:unitType", this._updateInputsLabel.bind(this));

        this.on("change:unit", this._updateInputs.bind(this));
    }

    _updateSystem (e) {
        const crs = this._coordinateSearchSystems[e.target.value].crs;
        if (crs !== this._currentCoordinateSystem.crs) {
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
        }
    }

    _updateUnits (e) {
        const value = e.target.value;
        if (this.get("unit") !== value) {
            e.target.closest("form").dataset.unit = value;
            this.set("unit", value);
        }
    }

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

    _updateInputs () {
        const unit = this.get("unit");
        let factor = 1;
        if (this.get("unitType") === "Metric") {
            factor = unit === "KM" ? 0.001 : 1000;
        }
        if (unit === "DMS") {
            this.lonLatInputs.querySelectorAll("input").forEach(input => {
                input.value = "";
                input.minLength = "6";
                input.maxLength = "6";
                input.addEventListener("beforeinput", this._onlonLatBeforeInput.bind(this));
                input.addEventListener("input", this._onlonLatInput.bind(this));
            });
        } else {
            this.lonLatInputs.querySelectorAll("input").forEach(input => {
                input.value = input.value === "" || isNaN(input.value) ? "" : parseFloat(input.value) * factor;
                input.removeAttribute("minLength");
                input.removeAttribute("maxLength");
                input.removeEventListener("beforeinput", this._onlonLatBeforeInput);
                input.removeEventListener("input", this._onlonLatInput);
            });
        }
    }

    /**
     * 
     * @param {InputEvent} e 
     * @returns 
     */
    _onlonLatBeforeInput (e) {
        // const regex = /^(?:\d{2}°\d{2}'\d{2}(?:"|''))$|^\d{6}$/;
        const regex = /^\d+$/;
        // Vérifie si c'est un chiffre
        if (e.inputType.startsWith("insert") && !regex.test(e.data)) {
            e.preventDefault();
        }
    }

    _format (value) {
        const v = value.padEnd(6, "_");
        return `${v.slice(0,2)}°${v.slice(2,4)}'${v.slice(4,6)}"`;
    }

    /**
     * 
     * @param {InputEvent} e 
     */
    _onlonLatInput (e) {
        const value = e.target.value;
        const mask = e.target.parentElement.querySelector(".display-mask");
        mask.textContent = this._format(value);
    }

    /**
     * 
     * @param {PointerEvent} e
     * @protected
     */
    _onSearch (e) {
        super._onSearch(e);
        // Récupère les valeurs des inputs
        let lon = this.lon.querySelector("input").value;
        let lat = this.lat.querySelector("input").value;
        if (this.get("unit") === "DMS") {
            // Transforme les DMS en degrés décimaux
            lon = MathUtils.dmsToDecimal(
                parseInt(lon.substring(0, 2)),
                parseInt(lon.substring(2, 4)),
                parseInt(lon.substring(4, 6)),
                this.lon.querySelector("select").value
            );
            lat = MathUtils.dmsToDecimal(
                parseInt(lat.substring(0, 2)),
                parseInt(lat.substring(2, 4)),
                parseInt(lat.substring(4, 6)),
                this.lat.querySelector("select").value
            );
        } else if (this.get("unit") === "KM") {
            // Transforme les kilomètres en mètre
            lon = parseFloat(lon) * 1000;
            lat = parseFloat(lat) * 1000;
        } else {
            // Récupère les valeurs en float
            lon = parseFloat(lon);
            lat = parseFloat(lat);
        }

        // Projette les coordonnées dans les coordonnées de la carte
        let coords = [lon, lat];
        const mapProj = this.getMap().getView().getProjection().getCode();
        const currentProj = this._currentCoordinateSystem.crs;
        if (mapProj !== currentProj) {
            coords = olProjTransform(coords, currentProj, mapProj);
        }

        const geom = new Point(coords);
        const f = new Feature({ geometry : geom });
        // Ajout des coordonnées pour le popup
        f.set("infoPopup", this._createInfoPopup(lon, lat));

        this.dispatchEvent({
            type : "search",
            result : f,
        });
    }

    _createInfoPopup (lon, lat) {
        let x, y, valueX, valueY;
        if (this.get("unitType") === "Geographical") {
            x = "Longitude";
            y = "Latitude";

            if (this.get("unit") === "DMS") {
                const lon = this.lon.querySelector("input").value;
                const lonCardinal = this.lon.querySelector("select").value;
                valueX = `${parseInt(lon.substring(0, 2))}°${parseInt(lon.substring(2, 4))}'${parseInt(lon.substring(4, 6))}" ${lonCardinal}`;

                const lat = this.lat.querySelector("input").value;
                const latCardinal = this.lat.querySelector("select").value;
                valueY = `${parseInt(lat.substring(0, 2))}°${parseInt(lat.substring(2, 4))}'${parseInt(lat.substring(4, 6))}" ${latCardinal}`;
            } else {
                valueX = `${lon} °`;
                valueY = `${lat} °`;
            }
        } else {
            x = "X";
            y = "Y";
            valueX = `${lon} ${this.get("unit").toLowerCase()}`;
            valueY = `${lat} ${this.get("unit").toLowerCase()}`;
        }
        const infoPopup = `<b>${x} : </b>${valueX}<br><b>${y} : </b>${valueY}`;
        return infoPopup;
    }

}

export default CoordinateAdvancedSearch;

// Expose CoordinateAdvancedSearch as ol.control.CoordinateAdvancedSearch (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.CoordinateAdvancedSearch = CoordinateAdvancedSearch;
}
