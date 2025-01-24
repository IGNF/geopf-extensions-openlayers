// import CSS
import "../../CSS/Controls/Export/GPFexport.css";
// import "../../CSS/Controls/Export/GPFexportStyle.css";

// import OpenLayers
import Widget from "../Widget";
import Control from "ol/control/Control";

// import local
import ID from "../../Utils/SelectorID";
import Logger from "../../Utils/LoggerByDefault";
import Utils from "../../Utils/Helper";

// import local with ol dependencies
import KMLExtended from "../../Formats/KML";
import GeoJSONExtended from "../../Formats/GeoJSON";
import GPXExtended from "../../Formats/GPX";

// DOM
import ExportDOM from "./ExportDOM";

var logger = Logger.getLogger("export");

/**
 * @classdesc
 *
 * Export button
 *
 * @constructor
 * @alias ol.control.Export
 * @param {Object} options - options for function call.
 * @param {Number} [options.id] - Ability to add an identifier on the widget (advanced option)
 * @param {String} [options.export = "true"] - triggering the download of the file
 * @param {String} [options.format = "geojson"] - geojson / kml / gpx
 * @param {String} [options.name = "export"] - export name file
 * @param {String} [options.description = "export"] - export description put into file
 * @param {String} [options.title = "Exporter"] - button name
 * @param {String} [options.kind = "secondary"] - button type : primary | secondary | tertiary
 * @param {Boolean} [options.menu = false] - displays the menu
 * @param {Object} [options.icons] - icons
 * @param {String} [options.icons.menu = "\u2630 "] - displays the menu icon
 * @param {Boolean} [options.icons.button = "false"] - displays the button icon
 * @param {Function} [options.callback] - the callback cancels the file download or the implementation is your responsibility
 * @param {DOMElement} [options.target] - target
 * @param {Object} [options.control] - instance of control
 * @param {Object} [options.layer] - the layer instance is retrieved from the control, but you can defined it
 * @fires button:clicked 
 * @example
 * // pluggued widget Export into control Isocurve
 * var iso = new ol.control.Isocurve();
 * map.addControl(iso);
 *
 * // method : call render()
 * var export = new ButtonExport();
 * export.setDownload(true);
 * export.setControl(iso);
 * export.setTarget(<!-- DOMElement -->);
 * export.setName("export");
 * export.setFormat("geojson");
 * export.setDescription("Export Isochrone");
 * export.setTitle("Exporter");
 * export.setMenu(false);
 * export.render(); // <-- direct call to render function !
 * export.on("button:exported", (data) => { console.log(data); });
 *
 * // method : call map.addControl()
 * var export = new ButtonExport();
 * export.setDownload(true);
 * export.setControl(iso);
 * export.setTarget(<!-- DOMElement -->);
 * export.setName("export");
 * export.setFormat("geojson");
 * export.setDescription("Export Isochrone");
 * export.setTitle("Exporter");
 * export.setKind("secondary");
 * export.setMenu(false);
 * export.on("button:exported", (data) => { console.log(data); });
 * map.addControl(export); // <-- using the OpenLayers mechanism, don't call to render function !
 *
 * // use control options instead of setters
 * var export = new ButtonExport({
 *   export : true,
 *   control : iso,
 *   target : <!-- DOMElement -->,
 *   name : "export",
 *   description : "Export Isochrone",
 *   format : "geojson",
 *   title : "Exporter",
 *   menu : false
 * });
 * map.addControl(export);
 *
 * // method with passing option into the control Isocurve
 * var iso = new ol.control.Isocurve({ export : true });
 * // with control options :
 * var iso = new ol.control.Isocurve({ export : {
 *   export : true,
 *   name : "export",
 *   format : "geojson",
 *   title : "Exporter",
 *   menu : false
 * }});
 */
class ButtonExport extends Control {

    /**
     * See {@link ol.control.Export}
     * @module ButtonExport
     * @alias module:~controls/ButtonExport
     * @param {Object} [options] - options
     * @example
     * import ButtonExport from "gpf-ext-ol/controls/ButtonExport"
     * ou 
     * import { ButtonExport } from "gpf-ext-ol"
     */
    constructor (options) {
        options = options || {
            layer : null,
            control : null,
            target : null,
            format : "geojson",
            name : "export",
            description : "export",
            title : "Exporter",
            kind : "secondary",
            menu : false,
            icons : {
                menu : "\u2630 ",
                button : ""
            },
            callback : null
        };

        logger.trace("[constructor] Export", options);

        super({
            element : document.createElement("div"),
            render : options.render,
            target : null
        });

        if (!(this instanceof ButtonExport)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }
        /**
         * Nom de la classe (heritage)
         * @private
         */
        this.CLASSNAME = "Export";
        /**
         * Response to the export of the route calculation
         * (only for jsdoc)
         *
         * @example
         * // GeoJSON format
         * {
         *   "type":"FeatureCollection",
         *   "features":[...],
         *   "geoportail:compute":{
         *     "points":[ [2.588024210134887, 48.84192678293002 ] ],
         *     "transport":"Voiture",
         *     "exclusions":[...],
         *     "computation":"fastest",
         *     "results":{ <!-- Service --> }
         * }
         *
         * @see {@link https://ignf.github.io/geoportal-access-lib/latest/jsdoc/Gp.Services.RouteResponse.html|Service}
         */
        // eslint-disable-next-line no-undef
        this.EXPORT_ROUTE = {};

        /**
         * Response to the export of the isochron calculation
         * (only for jsdoc)
         *
         * @example
         * // GeoJSON format
         * {
         *    "type":"FeatureCollection",
         *    "features":[...],
         *    "geoportail:compute":{
         *       "transport":"Pieton",
         *       "computation":"time",
         *       "exclusions":[
         *
         *       ],
         *       "direction":"departure",
         *       "point":[ 2.587835382718464, 48.84192678293002 ],
         *       "results":{
         *          "message":"",
         *          "id":"",
         *          "location":{
         *             "x":"2.587835382718464",
         *             "y":"48.84192678293002"
         *          },
         *          "srs":"EPSG:4326",
         *          "geometry":{
         *             "type":"Polygon",
         *             "coordinates":[[...]]
         *          },
         *         "time":180,
         *         "distance":""
         *      }
         *    }
         * }
         *
         * @see {@link https://ignf.github.io/geoportal-access-lib/latest/jsdoc/Gp.Services.IsoCurveResponse.html|Service}
         */
        // eslint-disable-next-line no-undef
        this.EXPORT_ISOCHRON = {};

        /**
         * Response to the export of the profile calculation
         * (only for jsdoc)
         *
         * @example
         * // GeoJSON format
         * {
         *  "type":"FeatureCollection",
         *   "features":[...],
         *   "geoportail:compute":{
         *      "greaterSlope":76,
         *      "meanSlope":7,
         *      "distancePlus":84,
         *      "distanceMinus":48,
         *      "ascendingElevation":5,
         *      "descendingElevation":-4,
         *      "altMin":"92,04",
         *      "altMax":"96,71",
         *      "distance":163,
         *      "unit":"m",
         *      "points":[
         *        {
         *            "z":95.68,
         *            "lon":2.5874,
         *            "lat":48.8419,
         *            "acc":2.5,
         *            "dist":0,
         *            "slope":0
         *         }
         *      ]
         *   }
         * }
         *
         * @see {@link https://ignf.github.io/geoportal-access-lib/latest/jsdoc/Gp.Services.AltiResponse.html|Service}
         */
        // eslint-disable-next-line no-undef
        this.EXPORT_PROFILE = {};

        // id unique
        this.uid = options.id || ID.generate();

        // export
        this.extension = null;
        this.mimeType = null;

        // dom
        this.container = null;
        this.button = null;
        this.inputName = null;
        this.inputDesc = null;
        this.menu = null;
        this.menuClassHidden = "GPelementHidden gpf-hidden";

        this.initOptions(options);
        this.initContainer();
    }

    // ################################################################### //
    // ##################### public methods ############################## //
    // ################################################################### //

    /**
     * Render DOM
     *
     * @public
     */
    render () {
        // container principal
        if (!this.options.target) {
            if (this.options.control) {
                // insertion du composant dans le panneau du controle
                var container = this.options.control.getContainer();
                // ex. GP(iso|route)Panel-
                this.options.target = container.lastChild;
            }
        }
        if (this.container) {
            this.options.target.appendChild(this.container);
        }
    }

    // ################################################################### //
    // #################### privates methods ############################# //
    // ################################################################### //

    /**
     * Initialize options
     * (called by constructor)
     *
     * @param {Object} options - options
     * @private
     */
    initOptions (options) {
        this.options = {
            layer : null,
            control : null,
            target : null,
            export : true,
            format : "geojson",
            name : "export",
            description : "export",
            title : "Exporter",
            kind : "secondary",
            menu : false,
            icons : {
                menu : "\u2630 ",
                button : false
            },
            callback : null
        };

        // merge with user options
        Utils.assign(this.options, options);

        if (this.options.layer) {
            // TODO test...
        }

        if (this.options.control) {
            // TODO test...
        }

        if (this.options.target) {
            // TODO test...
        }

        var format = this.options.format;
        (format) ? this.setFormat(format) : this.setFormat("");

        if (!this.options.name) {
            this.setName("export");
        }

        if (!this.options.description) {
            this.setDescription("export");
        }

        if (!this.options.title) {
            this.setTitle("Exporter");
        }

        if (!this.options.kind) {
            this.setKind("secondary");
        }

        if (this.options.menu === undefined) {
            this.setMenu(false);
        }
    }

    /**
     * Initialize container
     * (called by constructor)
     *
     * @private
     * @todo menu des options
     */
    initContainer () {
        // TODO
        // menu des options de l'export :
        // * [ nom ]
        // * format
        // https://www.w3schools.com/howto/howto_css_dropdown.asp
        // https://www.w3schools.com/howto/howto_css_custom_checkbox.asp

        // afficher l'icone du menu
        var title = this.options.title;
        if (this.options.menu) {
            title = this.options.icons.menu + this.options.title;
        }

        var div = document.createElement("div");
        div.id = this._addUID("GPexportContainer");
        div.className = "GPexportMenuContainer fr-m-1w";

        // menu des options
        // utiliser les templates literals avec la substitution ${...}
        var menu = this.stringToHTML(`
            <div class="GPexportMenuHidden gpf-accordion fr-accordion fr-m-1w ${this.menuClassHidden}">
                <h3 class="gpf-accordion__title fr-accordion__title">
                    <button type="button" 
                        id="GPexportBtnMenuContent-${this.uid}"
                        class="gpf-accordion__btn fr-accordion__btn" 
                        aria-expanded="false" aria-controls="GPexportMenuContent-${this.uid}">options</button>
                </h3>
                <div id="GPexportMenuContent-${this.uid}"
                    class="GPexportMenuContent fr-collapse">
                    <div id="GPexportMenuName-${this.uid}" 
                        class="GPexportMenuName">
                        <label class="GPlabel gpf-label fr-label" for="GPexportMenuInputName-${this.uid}" title="Nom">Nom</label>
                        <input type="text" id="GPexportMenuInputName-${this.uid}" class="GPinput gpf-input fr-input">
                    </div>
                    <div id="GPexportMenuDesc-${this.uid}"
                        class="GPexportMenuDesc">
                        <label class="GPlabel gpf-label fr-label" for="GPexportMenuInputDesc-${this.uid}" title="Description">Description</label>
                        <input type="text" id="GPexportMenuInputDesc-${this.uid}" class="GPinput gpf-input fr-input">
                    </div>
                    <div id="GPexportMenuFormat-${this.uid}">
                        <label class="GPlabel gpf-label fr-label" title="Formats">Formats</label>
                        <div class="GPexportMenuFormat fr-radio-group fr-m-1w">
                            <input type="radio" 
                                id="GPmenuFormatGeojson-${this.uid}"
                                name="format" 
                                value="geojson">
                            <label class="fr-label container" for="GPmenuFormatGeojson-${this.uid}">GeoJSON
                                <span class="checkmark"></span>
                            </label>
                        </div>
                        <div class="GPexportMenuFormat fr-radio-group fr-m-1w">
                            <input type="radio" 
                                id="GPmenuFormatKml-${this.uid}"
                                name="format" 
                                value="kml">
                            <label class="fr-label container" for="GPmenuFormatKml-${this.uid}">KML
                                <span class="checkmark"></span>
                            </label>
                        </div>
                        <div class="GPexportMenuFormat fr-radio-group fr-m-1w">
                            <input type="radio" 
                                id="GPmenuFormatGpx-${this.uid}"
                                name="format" 
                                value="gpx">
                            <label class="fr-label container" for="GPmenuFormatGpx-${this.uid}">GPX
                                <span class="checkmark"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        `);

        this.menu = menu.firstChild;
        if (this.menu) {
            if (this.options.menu) {
                var className = this.menu.className;
                this.menu.className = className.replace(this.menuClassHidden, "");
            }
            var format = this.options.format.toUpperCase();
            var radios = this.menu.querySelectorAll(`input[type=radio][name="format"]`);
            for (let i = 0; i < radios.length; i++) {
                var radio = radios[i];
                // radio checked par defaut
                if (radio.id.toUpperCase().includes(format)) {
                    radio.checked = true;
                }
                // ecouteur pour changer de format
                radio.addEventListener("change", (e) => this.onChangeRadioFormat(e));
            }

            var btn = this.menu.querySelector("#GPexportBtnMenuContent-" + this.uid);
            if (btn) {
                btn.addEventListener("click", (e) => this.onClickButtonToggleOptions(e));
            }

            this.inputName = this.menu.querySelector("#GPexportMenuInputName-" + this.uid);
            this.inputDesc = this.menu.querySelector("#GPexportMenuInputDesc-" + this.uid);
        }
        div.appendChild(this.menu);

        // bouton Exporter
        // utiliser les templates literals avec la substitution ${...}
        var button = this.stringToHTML(`
            <button 
                type="button"
                id="${this._addUID("GPexportButton")}" 
                class="GPexportButtonIcon GPsubmit gpf-btn gpf-btn-icon-submit fr-btn fr-m-1w">
                ${title}
            </button>
        `);

        // add event click button
        this.button = button.firstChild;
        if (this.button) {
            this.button.addEventListener("click", (e) => this.onClickButtonExport(e));
        }
        // primary | secondary | tertiary
        switch (this.options.kind) {
            case "tertiary":
                this.button.classList.add("fr-btn--tertiary", "gpf-btn--tertiary");
                break;
            case "secondary":
                this.button.classList.add("fr-btn--secondary", "gpf-btn--secondary");
                break;
            case "primary":
            default:
                break;
        }
        // icon button
        if (!this.options.icons.button) {
            this.button.classList.remove("GPexportButtonIcon", "gpf-btn-icon-submit");
        }
        div.appendChild(this.button);
        
        this.container = div;
    }

    /**
     * ...
     *
     * @param {String} str - ...
     * @returns {DOMElement} - ...
     * @private
     */
    stringToHTML (str) {
        var support = function () {
            if (!window.DOMParser) {
                return false;
            }
            var parser = new DOMParser();
            try {
                parser.parseFromString("x", "text/html");
            } catch (err) {
                return false;
            }
            return true;
        };

        // If DOMParser is supported, use it
        if (support()) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(str, "text/html");
            return doc.body;
        }

        // Otherwise, fallback to old-school method
        var dom = document.createElement("div");
        dom.innerHTML = str;
        return dom;
    }

    /**
     * ...
     * @returns {Boolean} - ...
     * @private
     */
    isPluggableControl () {
        // tester toutes les méthodes des widgets pluggable
        // la méthode getData() n'est pas obligatoire car certains widgets
        // n'ont pas de configuration.
        if (this.options.control &&
            typeof this.options.control.getContainer === "function" &&
            typeof this.options.control.getLayer === "function") {
            return true;
        }
        return false;
    }

    /**
     * ...
     * @param {Object} layer - ...
     * @param {Object} [data] - ...
     * @param {Object} [style] - ...
     * @returns {String} - ...
     * @private
     */
    exportFeatures (layer, data, style) {
        var result = null;
        if (!layer) {
            logger.warn("Impossible to export : no layer is hosting features.");
            return result;
        }
        if (!layer.getSource() ||
            !layer.getSource().getFeatures() ||
            !layer.getSource().getFeatures().length) {
            logger.warn("Impossible to export : no features found.");
            return result;
        }

        // INFO
        // les styles sont bien transmis pour l'outil de dessin
        // mais, ce n'est pas toujours le cas pour certains widgets !?
        // donc, on y ajoute les styles par defaut...
        layer.getSource().getFeatures().forEach((feature) => {
            var style = feature.getStyle();
            if (!style && this.options.control && typeof this.options.control.getStyle === "function") {
                feature.setStyle(this.options.control.getStyle());
            }
        });

        // ajouter les metadonnées de calcul et de configuration
        var options = {
            defaultStyle : style,
            extensions : {}
        };
        if (data) {
            // properties ajoutées à la racine :
            // ex. "geoportail:compute" : {}
            options.extensions = {
                "geoportail:compute" : data
            };
        }

        if (this.options.description) {
            options.extensions.description = (this.inputDesc && this.inputDesc.value) ? this.inputDesc.value : this.options.description;
        }

        var ClassName = null;
        switch (this.options.format.toUpperCase()) {
            case "KML":
                options.writeStyles = true;
                options.showPointNames = true;
                ClassName = new KMLExtended(options);
                break;
            case "GPX":
                ClassName = new GPXExtended(options);
                break;
            case "GEOJSON":
                ClassName = new GeoJSONExtended(options);
                break;
            default:
                break;
        }

        if (!ClassName) {
            logger.warn("Impossible to export : format unknown !?");
            return result;
        }

        var featProj = layer.getSource().getProjection();

        // INFO
        // on determine la projection de la carte
        // si le composant a été ajouté sur la carte via le mécanisme d'OpenLayer...
        var map = this.getMap();
        if (map) {
            featProj = featProj || map.getView().getProjection();
        }

        var features = layer.getSource().getFeatures();

        // INFO
        // par defaut, webmercator ou "EPSG:3857"
        result = ClassName.writeFeatures(features, {
            dataProjection : "EPSG:4326",
            featureProjection : featProj || "EPSG:3857"
        });

        return result;
    }
    // ################################################################### //
    // ######################## event dom ################################ //
    // ################################################################### //

    /**
     * ...
     * @param {*} e - Click
     */
    onClickButtonExport (e) {
        if (!this.isPluggableControl()) {
            logger.warn("Componant not pluggable with the control !");
            // return;
        }

        var layer = (this.options.control && this.options.control.getLayer !== undefined) ? this.options.control.getLayer() : this.options.layer;
        var data = (this.options.control && this.options.control.getData !== undefined) ? this.options.control.getData() : {};
        var style = (this.options.control && this.options.control.getStyle !== undefined) ? this.options.control.getStyle() : {};

        var content = this.exportFeatures(layer, data, style);
        if (!content || content === "null") {
            return;
        }

        /**
         * event triggered when the export is finished
         *
         * @event button:clicked
         * @typedef {Object}
         * @property {Object} type - event
         * @property {Object} target - instance Export
         * @property {String} content - export data
         * @property {Object} layer - layer
         * @example
         * Export.on("button:clicked", function (e) {
         *   console.log(e.target);
         * })
         */
        this.dispatchEvent({
            type : "button:clicked",
            content : content,
            layer : layer
        });

        // INFO
        // la callback annule le download du fichier.
        if (this.options.callback && typeof this.options.callback === "function") {
            this.options.callback(content);
            return;
        }

        if (this.options.export) {
            var link = document.createElement("a");
            // determiner le bon charset !
            var charset = "utf-8";
            link.setAttribute("href", "data:" + this.mimeType + ";charset=" + charset + "," + encodeURIComponent(content));
            link.setAttribute("download", (this.inputName && this.inputName.value) ? this.inputName.value + this.extension : this.options.name + this.extension);
            if (document.createEvent) {
                var event = document.createEvent("MouseEvents");
                event.initEvent("click", true, true);
                link.dispatchEvent(event);
            } else {
                link.click();
            }
        }
    }

    /**
     * 
     * @param {*} e - Click
     */
    onChangeRadioFormat (e) {
        this.setFormat(e.target.value);
    }

    /**
     * 
     * @param {*} e - Click
     */
    onClickButtonToggleOptions (e) {
        e.target.ariaExpanded = !(e.target.ariaExpanded === "true");
        var collapse = this.menu.querySelector("#" + e.target.getAttribute("aria-controls"));
        if (!collapse) {
            return;
        }
        if (e.target.ariaExpanded === "true") {
            collapse.classList.add("fr-collapse--expanded");
            this.menu.classList.add("gpf-full-container");
            collapse.classList.remove("GPelementHidden");
        } else {
            collapse.classList.remove("fr-collapse--expanded");
            this.menu.classList.remove("gpf-full-container");
            collapse.classList.add("GPelementHidden");
        }
    }

    // ################################################################### //
    // ################# public getters/setters ########################## //
    // ################################################################### //
    /**
     * Get container
     *
     * @returns {DOMElement} container
     */
    getContainer () {
        return this.container;
    }

    /**
     * ...
     * @param {Object} control - ...
     * @public
     */
    setControl (control) {
        this.options.control = control;
    }

    /**
     * ...
     * @param {DOMElement} target - ...
     * @public
     */
    setTarget (target) {
        this.options.target = target;
    }

    /**
     * ...
     * @param {String} format - ...
     * @public
     */
    setFormat (format) {
        this.options.format = format.toUpperCase();
        switch (this.options.format) {
            case "KML":
                this.extension = ".kml";
                this.mimeType = "application/vnd.google-earth.kml+xml";
                break;
            case "GPX":
                this.extension = ".gpx";
                this.mimeType = "application/gpx+xml";
                break;
            case "GEOJSON":
                this.extension = ".geojson";
                this.mimeType = "application/geo+json";
                break;
            default:
                // redefine format by default !
                this.options.format = "GEOJSON";
                this.extension = ".geojson";
                this.mimeType = "application/geo+json";
                break;
        }
    }

    /**
     * ...
     * @param {String} name - ...
     * @public
     */
    setName (name) {
        this.options.name = name;
    }

    /**
     * ...
     * @param {String} desc - ...
     * @public
     */
    setDescription (desc) {
        this.options.description = desc;
    }

    /**
     * ...
     * @param {String} title - ...
     * @public
     */
    setTitle (title) {
        this.options.title = title;
        if (this.button) {
            // afficher l'icone du menu / titre
            this.button.textContent = (this.options.menu) ? this.options.icons.menu + title : title;
        }
    }

    /**
     * ...
     * @param {String} type - ...
     * @public
     */
    setKind (type) {
        this.options.kind = type;
        if (this.button) {
            this.button.classList.remove("fr-btn--tertiary", "gpf-btn--tertiary");
            this.button.classList.remove("fr-btn--secondary", "gpf-btn--secondary");
            switch (this.options.kind) {
                case "tertiary":
                    this.button.classList.add("fr-btn--tertiary", "gpf-btn--tertiary");
                    break;
                case "secondary":
                    this.button.classList.add("fr-btn--secondary", "gpf-btn--secondary");
                    break;
                case "primary":
                default:
                    break;
            }
        }
    }

    /**
     * ...
     * @param {Boolean} active - ...
     * @public
     */
    setMenu (active) {
        this.options.menu = active;
        if (this.button) {
            // afficher l'icone du menu / titre
            this.button.textContent = (this.options.menu) ? this.options.icons.menu + this.options.title : this.options.title;
        }
        if (this.menu && this.options.menu) {
            // afficher le menu
            var className = this.menu.className;
            this.menu.className = className.replace(this.menuClassHidden, "");
            // format par defaut
            var format = this.options.format.toUpperCase();
            var radios = this.menu.querySelectorAll(`input[type=radio][name="format"]`);
            for (let i = 0; i < radios.length; i++) {
                var radio = radios[i];
                if (radio.id.toUpperCase().includes(format)) {
                    radio.checked = true;
                }
            }
        }
    }

    /**
     * ...
     * @param {*} layer  - ...
     * @public
     */
    setLayer (layer) {
        this.options.layer = layer;
    }

    /**
     * ...
     * @param {Boolean} value - ...
     * @public
     */
    setDownload (value) {
        this.options.export = value;
    }

};

// on récupère les méthodes de la classe DOM
Object.assign(ButtonExport.prototype, ExportDOM);
Object.assign(ButtonExport.prototype, Widget);

export default ButtonExport;

// Expose Export as ol.control.Export (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.Export = ButtonExport;
}
