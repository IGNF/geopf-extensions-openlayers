// import CSS
import "../../CSS/Controls/Reporting/GPFreporting.css";

// import OpenLayers
import Control from "../Control";
import Widget from "../Widget";
import { unByKey as olObservableUnByKey } from "ol/Observable";
import Overlay from "ol/Overlay";

// import local
import Utils from "../../Utils/Helper";
import SelectorID from "../../Utils/SelectorID";
import Logger from "../../Utils/LoggerByDefault";
import Draggable from "../../Utils/Draggable";

// DOM
import ReportingDOM from "./ReportingDOM";
import Drawing from "../Drawing/Drawing";

var logger = Logger.getLogger("reporting");

// ################################################################### //
// ########################## IoC actions ############################ //
// ################################################################### //

class InputActionByDefaut {

    /**
     * @classdesc
     * Input action for the Reporting control.
     * This class handles user input on the map, specifically capturing single click events
     * to set coordinates for a reporting action.
     * @constructor
     * @alias InputActionByDefaut
     * @type {InputActionByDefaut}
     * @param {ol.Map} [map] - Optional OpenLayers map instance.
     * @description
     * The constructor initializes the action with an optional map instance.
     * If no map is provided, it defaults to null.
     * It also initializes properties for data, coordinates, and event listeners.
     */
    constructor (map /* optionnel !!! */) {
        logger.info("InputActionByDefaut constructor");
        this.map = map || null; // will be set by the IoC
        this.data = null;
        this.coordinate = null;
        this.listener = null;
        this.icon = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAzNiIgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4Ij48cGF0aCBmaWxsPSIjMDAwMDkxIiBkPSJNMTguMzY0IDMuNjM2YTkgOSAwIDAgMSAwIDEyLjcyOEwxMiAyMi43MjhsLTYuMzY0LTYuMzY0QTkgOSAwIDAgMSAxOC4zNjQgMy42MzZaTTEyIDhhMiAyIDAgMSAwIDAgNCAyIDIgMCAwIDAgMC00WiIvPjwvc3ZnPg==";
    }

    // ######################################################## //
    // ########################## API ######################### //

    /**
     * Set the map for this action
     * @api
     * @param {ol.Map} map - Map.
     */
    setMap (map) {
        logger.info("InputActionByDefaut map");
        this.map = map;
    }
    /**
     * Set the icon for this action
     * @api
     * @param {String} icon - Icon URL or base64 encoded string.
     * @description
     * This method sets the icon for the input action.
     * It updates the icon property with the provided value.
     * If the icon is not provided, it defaults to a base64 encoded SVG string.
     */
    setIcon (icon) {
        logger.info("InputActionByDefaut icon");
        if (icon) {
            this.icon = icon;
        }
    }
    /**
     * Get the data for this action
     * @api
     * @returns {Object} data - Data for this action.
     * @description
     * This method returns a GeoJSON FeatureCollection with a single Point feature.
     * The Point's coordinates are set to the last clicked coordinate on the map.
     * The FeatureCollection also includes a CRS (Coordinate Reference System) definition
     * based on the map's current projection.
     * @example
     * var data = inputAction.getData();
     * console.log(data);
     * // Output:
     * // {
     * //   location: {
     * //     type: "FeatureCollection",
     * //     crs: {
     * //       type: "name",
     * //       properties: {
     * //         name: "EPSG:4326"
     * //       }
     * //     },
     * //     features: [
     * //       {
     * //         type: "Feature",
     * //         geometry: {
     * //           type: "Point",
     * //           coordinates: [longitude, latitude]
     * //         },
     * //         properties: {
     * //           description: "Point de signalement",
     * //           date: "2023-10-01T12:00:00Z",
     * //         },
     * //       }
     * //     ]
     * //   }
     * // }
     */
    getData () {
        logger.info("InputActionByDefaut data");
        var projection = this.map.getView().getProjection();
        if (!this.coordinate) {
            this.coordinate = this.map.getView().getCenter();
        }
        var geometry = {
            type : "FeatureCollection",
            crs : {
                type : "name",
                properties : {
                    name : projection.getCode()
                }
            },
            features : [
                {
                    type : "Feature",
                    crs : {
                        type : "name",
                        properties : {
                            name : projection.getCode()
                        }
                    },
                    geometry : {
                        type : "Point",
                        coordinates : this.coordinate || [0, 0]
                    },
                    properties : {
                        description : "Point de signalement",
                        date : new Date().toISOString(),
                        author : "Anonyme"
                    }
                }
            ]
        };
        this.data = {
            location : geometry
        };
        return this.data || { location : null };
    }
    /**
     * Clear the data and remove the event listener
     * @api
     * @description
     * This method resets the data and coordinate properties to null,
     * and removes the event listener if it exists.
     */
    clear () {
        logger.info("InputActionByDefaut clear");
        this.data = null;
        this.coordinate = null;
        if (this.listener) {
            olObservableUnByKey(this.listener);
            this.listener = null;
        }
        if (this.marker != null) {
            this.map.removeOverlay(this.marker);
            this.marker = null;
        }
    }
    /**
     * Activate the action by adding event listeners
     * @api
     * @description
     * This method sets up the action to listen for single click events on the map.
     * When a single click occurs, it triggers the handler method to capture the coordinates.
     */
    active () {
        this._addEventsListeners();
    }
    /**
     * Disable the action by removing event listeners
     * @api
     * @description
     * This method removes the event listeners that were added during activation.
     */
    disable () {
        this._removeEventsListeners();
    }

    // ######################################################## //
    // ######################### privates ##################### //

    _addEventsListeners () {
        logger.info("InputActionByDefaut active");
        if (!this.map) {
            return;
        }
        this.listener = this.map.on("singleclick", this._handler.bind(this));
    }
    _removeEventsListeners () {
        logger.info("InputActionByDefaut disable");
        if (!this.map) {
            return;
        }
        olObservableUnByKey(this.listener);
    }
    _handler (e) {
        logger.info("InputActionByDefaut handler", e);
        if (!this.map) {
            return;
        }
        this.coordinate = e.coordinate;
        // on supprime le marqueur précédent
        if (this.marker != null) {
            this.map.removeOverlay(this.marker);
            this.marker = null;
        }
        // on ajoute un marqueur sur la carte
        var markerDiv = document.createElement("img");
        markerDiv.src = this.icon;
        this.marker = new Overlay({
            position : this.coordinate,
            positioning : "center-center",
            element : markerDiv,
            stopEvent : false
        });
        this.map.addOverlay(this.marker);
    }

}

class FormActionByDefaut {

    /**
     * @classdesc
     * Form action for the Reporting control.
     * This class handles form submission and captures data from the form fields.
     * @constructor
     * @alias FormActionByDefaut
     * @type {FormActionByDefaut}
     * @param {HTMLFormElement} form - The form element to be managed by this action.
     * @description
     * The constructor initializes the action with a form element.
     * It sets up properties for data, form, and submit button.
     * The form and submit button will be set by the IoC (Inversion of Control) container.
     * The data property is initialized to null, indicating no data has been captured yet.
     */
    constructor (form) {
        logger.info("FormActionByDefaut constructor");
        this.data = null;
        this.form = null; // will be set by the IoC
        this.submit = null;
        this.error = null;
        this.message = null;
    }
    /**
     * Activate the action by adding event listeners
     * @api
     * @description
     * This method sets up the action to listen for the form submission event.
     * When the form is submitted, it triggers the handler method to capture the form data.
     */
    active () {
        logger.info("FormActionByDefaut active");
        this._addEventsListeners();
    }
    /**
     * Disable the action by removing event listeners
     * @api
     * @description
     * This method does not perform any action in this implementation.
     * It is intended to be overridden in subclasses if needed.
     */
    disable () {
        logger.info("FormActionByDefaut disable");
    }
    /**
     * Set the form for this action
     * @api
     * @param {*} form 
     */
    setForm (form) {
        logger.info("FormActionByDefaut form");
        this.form = form;
        this.submit = this.form.querySelector("input[type=\"submit\"]");
        this.error = this.form.querySelector("#GPreportingFormFieldset");
        this.message = this.form.querySelector("#GPreportingFormFieldsetMessages");
    }
    /**
     * Get the data for this action
     * @api
     * @returns {Object} data - Data for this action.
     * @description
     * This method retrieves the data captured from the form submission.
     * It simulates a form submission by clicking the submit button,
     * and returns the data as an object.
     * @example
     * var data = formAction.getData();
     * console.log(data);
     * // Output:
     * // {
     * //   name: "Report Name",
     * //   desc: "Report Description",
     * //   theme: "Selected Theme"
     * // }
     */
    getData () {
        logger.info("FormActionByDefaut data");
        this.submit.click(); // simulate form submission
        if (!this.data) {
            this.error.classList.add("fr-fieldset--error");
            this.message.classList.replace("gpf-hidden", "gpf-visible");
        } else {
            this.error.classList.remove("fr-fieldset--error");
            this.message.classList.replace("gpf-visible", "gpf-hidden");
        }
        return this.data;
    }
    /**
     * Clear the data and reset the form
     * @api
     * @description
     * This method resets the data property to null,
     * effectively clearing any previously captured form data.
     * It is intended to be called when the form needs to be reset or cleared.
     */
    clear () {
        logger.info("FormActionByDefaut clear");
        this.data = null;
    }

    // ######################################################## //
    // ######################### privates ##################### //

    _addEventsListeners () {
        this.form.addEventListener("submit", this._handler.bind(this), {once : true});
    }
    _handler (e) {
        logger.info("FormActionByDefaut handler", e);
        e.preventDefault();
        // on récupère les données du formulaire
        var formData = new FormData(e.target);
        var name = formData.get("GPreportingLabelName");
        var desc = formData.get("GPreportingTextDesc");
        var theme = formData.get("GPreportingSelectTheme");
        // on transforme les données du formulaire en objet
        if (name && desc && theme) {
            this.data = {
                name : name,
                desc : desc,
                theme : theme
            };
        }
        return false;
    }

}

class DrawingActionByDefaut {

    /**
     * @classdesc
     * Drawing action for the Reporting control.
     * This class handles drawing actions on the map, allowing users to create and manage drawings.
     * @constructor
     * @alias DrawingActionByDefaut
     * @type {DrawingActionByDefaut}
     * @param {ol.Map} [map] - Optional OpenLayers map instance.
     * @description
     * The constructor initializes the action with an optional map instance.
     * If no map is provided, it defaults to null.
     * It also initializes properties for data, map, DOM elements, and the Drawing instance.
     * The Drawing instance is used to manage the drawing functionality on the map.
     * The DOM elements for the drawing button and panel will be set by the IoC (Inversion of Control) container.
     */
    constructor (map) {
        logger.info("DrawingActionByDefaut constructor");
        this.data = null;
        this.format = "geojson"; // default format for export
        this.map = map || null; // will be set by the IoC
        this.dom = null; // will be set by the IoC
        // containers
        this.Drawing = null; // widget
        this.DrawingBtn = null; // bouton picto
        this.DrawingPanel = null; // panneau
    }
    /**
     * Activate the action by adding event listeners
     * @api
     * @description
     * This method initializes the Drawing instance if it is not already created.
     * It sets the Drawing instance to be active and configures its panel.
     * The Drawing instance allows users to create and manage drawings on the map.
     * It also sets the position of the Drawing panel to be relative, allowing it to be positioned within its parent container.
     * If the Drawing instance is already initialized, it simply makes the Drawing panel visible.
     * This method is typically called when the user wants to start drawing on the map.
     */
    active () {
        logger.info("ServiceActionByDefaut active");
        if (!this.Drawing) {
            this._initializeDrawing();
        }
        // this.DrawingBtn.setAttribute("aria-pressed", true);
        this.Drawing.setCollapsed(false);
        this.DrawingPanel.style.position = "relative";
        this.DrawingPanel.style.left = "0px";
        this.DrawingPanel.style.top = "0px";
        this.DrawingPanel.style.bottom = "unset";
        this.DrawingPanel.style.right = "unset";
    }
    /**
     * Disable the action by removing event listeners
     * @api
     * @description
     * This method collapses the Drawing instance, effectively hiding the drawing panel.
     * It is typically called when the user wants to stop drawing or hide the drawing panel.
     * If the Drawing instance is not initialized, it simply returns without performing any action.
     * This method is intended to be called when the drawing functionality is no longer needed.
     * It ensures that the Drawing panel is hidden and the Drawing instance is not active.
     */
    disable () {
        logger.info("DrawingActionByDefaut disable");
        if (!this.Drawing) {
            return;
        }
        this.Drawing.setCollapsed(true);
        // this.DrawingBtn.setAttribute("aria-pressed", false);
    }
    /**
     * Clear the data 
     * @api
     * @description
     * This method resets the data property to null,
     * effectively clearing any previously captured drawing data.
     * It is intended to be called when the drawing needs to be reset or cleared.
     * It does not perform any action on the Drawing instance itself.
     * This method is useful when the user wants to start a new drawing or discard the current drawing.
     * It ensures that the data property is cleared, allowing for a fresh start on the next drawing action.
     * It does not remove the Drawing instance or its event listeners, allowing the user to continue drawing if desired.
     */
    clear () {
        logger.info("DrawingActionByDefaut clear");
        this.data = null;
    }
    /**
     * Get the data for this action
     * @api
     * @returns {Object} data - Data for this action.
     * @description
     * This method retrieves the data captured from the drawing.
     * It exports the features from the Drawing instance
     * and returns them as an object.
     * If no drawing data is available, it returns an empty object.
     * @example
     * var data = drawingAction.getData();
     * console.log(data);
     * // Output:
     * // {
     * //   drawing: {
     * //     type: "FeatureCollection",
     * //     features: [...]
     * //   }
     * // }
     */
    getData () {
        logger.info("DrawingActionByDefaut data");
        // on récupère les données du dessin
        if (this.Drawing) {
            var content = this.Drawing.exportFeatures();
            this.data = {
                drawing : (this.format.toLowerCase() === "geojson") ? JSON.parse(content) : content
            }; 
        }
        return this.data || { drawing : null };
    }
    /**
     * Set the map for this action
     * @api
     * @param {ol.Map} map - Map.
     * @description
     * This method sets the map instance for the Drawing action.
     * It initializes the Drawing instance if it is not already created.
     * If the Drawing instance is already initialized, it simply updates the map property.
     * This method is typically called when the map is ready or when the Drawing action needs to be associated with a specific map instance.
     */
    setMap (map) {
        logger.info("DrawingActionByDefaut map");
        this.map = map;
    }
    /**
     * Set the target DOM element for the Drawing action
     * @api
     * @param {DOMElement} dom - The DOM element to set as the target for the Drawing action.
     */
    setTarget (dom) {
        logger.info("DrawingActionByDefaut target");
        if (!dom) {
            logger.warn("DrawingActionByDefaut target is null");
            return;
        }
        this.dom = dom;
    }
    /**
     * Set the format for exporting drawings
     * @api
     * @param {String} format - The format to set for exporting drawings.
     */
    setFormat (format) {
        logger.info("DrawingActionByDefaut format");
        if (format) {
            this.format = format;
        }
    }

    // ######################################################## //
    // ######################### privates ##################### //

    _initializeDrawing () {
        logger.info("DrawingActionByDefaut initializeDrawing");
        if (!this.map) {
            return;
        }
        var id = 1000;
        this.Drawing = new Drawing({
            target : this.dom,
            id : id,
            layerDescription : {
                title : "Signalement",
                description : "Dessin de signalement",
            },
            popup : {
                display : false
            },
            tools : {
                export : false
            }
        });

        this.Drawing.setExportFormat(this.format);

        var container = this.Drawing.getContainer();
        container.className = "";

        var button = this.DrawingBtn = container.querySelector("#GPshowDrawingPicto-" + id);
        if (button) {
            button.style.display = "none";
        }

        var panel = this.DrawingPanel = container.querySelector("#GPdrawingPanel-" + id);
        if (panel) {
            panel.style.position = "relative";
            panel.style.left = "0px";
            panel.style.top = "0px";
            panel.style.bottom = "unset";
            panel.style.right = "unset";
            panel.style.margin = "auto";
        }

        var header = container.querySelector(".gpf-panel__header");
        if (header) {
            header.style.display = "none";
        }
        // on ajoute le widget de dessin à la carte
        this.map.addControl(this.Drawing);
    }

}

class ServiceActionByDefaut {

    constructor () {
        logger.info("ServiceActionByDefaut constructor");
    }
    /**
     * Activate the action by adding event listeners
     * @api
     * @description
     * This method does not perform any action in this implementation.
     * It is intended to be overridden in subclasses if needed.
     */
    active () {
        logger.info("ServiceActionByDefaut active");
    }
    /**
     * Disable the action by removing event listeners
     * @api
     * @description
     * This method does not perform any action in this implementation.
     * It is intended to be overridden in subclasses if needed.
     */
    disable () {
        logger.info("ServiceActionByDefaut disable");
    }
    /**
     * Send data to the service
     * @api
     * @param {Object} data - Data to send.
     * @returns {Promise} - A promise that resolves when the data is sent.
     * @description
     * This method is intended to send data to a service.
     * It currently throws an error indicating that the method is not implemented.
     * @example
     * var serviceAction = new ServiceActionByDefaut();
     * serviceAction.send(data);
     * // Output data to the service :
     * // {
     * //   location: { ... }, // GeoJSON FeatureCollection with Point geometry
     * //   name: "Report Name",
     * //   desc: "Report Description",
     * //   theme: "Selected Theme",
     * //   drawing: { ... } // GeoJSON FeatureCollection with drawing features
     * // }
     */
    send (data) {
        logger.info("ServiceActionByDefaut send");
        return Promise.reject(new Error("ServiceActionByDefaut send not implemented"));
    }
    /**
     * Clear the data 
     * @api
     * @description
     * This method does not perform any action in this implementation.
     * It is intended to be overridden in subclasses if needed.
     */
    clear () {
        logger.info("ServiceActionByDefaut clear");
    }

}

// ################################################################### //
// ########################## Class Reporting ######################## //
// ################################################################### //

/**
 * @classdesc
 *
 * Reporting control.
 * This control allows users to report issues or provide feedback on the map.
 *
 * @constructor
 * @alias ol.control.Reporting
 * @type {ol.control.Reporting}
 * @extends {ol.control.Control}
 * @param {Object} options - options for function call.
 * @fires reporting:sending
 * @fires reporting:opened
 * @example
 * var reporting = new ol.control.Reporting();
 * map.addControl(reporting);
 */
var Reporting = class Reporting extends Control {

    /**
     * See {@link ol.control.Reporting}
     * @module Reporting
     * @alias module:~controls/Reporting
     * @param {Object} [options] - options
     * @param {Boolean} [options.collapsed=true] - specify if control is collapsed (true) or not (false)
     * @param {Boolean} [options.draggable=false] - specify if control is draggable (true) or not (false)
     * @param {Boolean} [options.auto=true] - specify if control add some stuff auto
     * @param {Array} [options.thematics] - specify the list of thematics
     * @param {String} [options.format="geojson"] - specify the format for export (default: "geojson")
     * @param {String} [options.icon] - specify the icon for point entry (default: base64 encoded SVG)
     * @param {DOMElement} [options.element] - specify the DOM element to append the control
     * @param {String} [options.target] - specify the target element to append the control
     * @param {Function} [options.render] - specify the render function
     * @description
     * The Reporting control is a custom OpenLayers control that allows users to report issues or provide
     * feedback on the map. It provides a user interface for inputting details about the report, including
     * the location, description, and thematic category of the issue.
     * @example
     * import Reporting from "gpf-ext-ol/controls/Reporting"
     * ou 
     * import { Reporting } from "gpf-ext-ol"
     */
    constructor (options) {
        options = options || {};
        
        // call ol.control.Control constructor
        super({
            element : options.element,
            target : options.target,
            render : options.render
        });

        if (!(this instanceof Reporting)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        // initialisation du composant
        this.#initialize(options);

        // Reporting main DOM container
        this.container = this.#initContainer();

        // ajout du container
        (this.element) ? this.element.appendChild(this.container) : this.element = this.container;

        return this;
    }

    // ################################################################### //
    // ##################### public methods ############################## //
    // ################################################################### //

    /**
     * Overwrite OpenLayers setMap method
     *
     * @param {ol.Map} map - Map.
     */
    setMap (map) {
        if (map) {
            // on selectionne le panneau de la 1ère étape
            this.setStep(0);

            // on initialise les actions IoC
            // (Input, Form, Service)
            this._setComponents(map);

            // mode "draggable"
            if (this.draggable) {
                Draggable.dragElement(
                    this.panelReportingContainer,
                    this.panelReportingHeaderContainer,
                    this.options.position ? null : map.getTargetElement()
                );
            }
            // mode "collapsed"
            if (!this.collapsed) {
                this.buttonReportingShow.click();
            }

            // ajout des evenements sur la carte
            if (this.auto) {
                this._addEventsListeners(map);
            }
        } else {
            // suppression des evenements sur la carte
            // pour les futurs suppressions de couche
            if (this.auto) {
                this._removeEventsListeners();
            }
        }

        // on appelle la méthode setMap originale d'OpenLayers
        super.setMap(map);

        // position
        if (this.options.position) {
            this.setPosition(this.options.position);
        }

        // reunion du bouton avec le précédent
        if (this.options.gutter === false) {
            this.getContainer().classList.add("gpf-button-no-gutter");
        }
    }

    /**
     * Get container
     *
     * @returns {DOMElement} container
     */
    getContainer () {
        return this.container;
    }

    /**
     * Returns true if widget is collapsed (minimized), false otherwise
     *
     * @returns {Boolean} collapsed - true if widget is collapsed
     */
    getCollapsed () {
        return this.collapsed;
    }

    /**
     * Collapse or display widget main container
     *
     * @param {Boolean} collapsed - True to collapse widget, False to display it
     */
    setCollapsed (collapsed) {
        if (collapsed === undefined) {
            return;
        }
        if ((collapsed && this.collapsed) || (!collapsed && !this.collapsed)) {
            return;
        }
        if (collapsed) {
            this.buttonReportingClose.click();
        } else {
            this.buttonReportingShow.click();
        }
        this.collapsed = collapsed;
    }
    // ################################################################### //
    // ##################### public methods IoC ########################## //
    // ################################################################### //

    /**
     * Set the components for the Reporting control.
     * @private
     * @param {ol.Map} map - The OpenLayers map instance to set for the components.
     * @description
     * This method initializes the IoC (Inversion of Control) components for the Reporting control.
     * It sets up the input, form, service, and drawing actions by creating instances of the respective classes.
     */
    _setComponents (map) {
        // on initialise les actions IoC
        if (!this.iocInput) {
            this.iocInput = new InputActionByDefaut();
        }
        this.iocInput.setMap(map);
        this.iocInput.setIcon(this.options.icon || null);

        if (!this.iocForm) {
            this.iocForm = new FormActionByDefaut();
        }
        this.iocForm.setForm(this.formReportingContainer);

        if (!this.iocService) {
            this.iocService = new ServiceActionByDefaut();
        }

        if (!this.iocDrawing) {
            this.iocDrawing = new DrawingActionByDefaut();
        }
        this.iocDrawing.setFormat(this.options.format || "geojson");
        this.iocDrawing.setMap(map);
        this.iocDrawing.setTarget(this.drawingReportingContainer);
        
        this.stepContainer[0].action = this.iocInput;
        this.stepContainer[1].action = this.iocForm;
        this.stepContainer[2].action = this.iocService;
        this.stepContainer[3].action = this.iocDrawing;
    }

    setComponentInput (input) {
        // TODO 
        // verifier si l'input est une instance de InputActionByDefaut
        // if (input instanceof InputActionByDefaut)
        this.iocInput = input;
    }

    setComponentForm (form) {
        this.iocForm = form;
    }

    setComponentService (service) {
        this.iocService = service;
    }

    setComponentDrawing (drawing) {
        this.iocDrawing = drawing;
    }

    // ################################################################### //
    // #################### privates methods ############################# //
    // ################################################################### //
    
    /**
     * Initialize Reporting control (called by Reporting constructor)
     *
     * @param {Object} options - constructor options
     * @private
     */
    #initialize (options) {
        this.uid = SelectorID.generate();

        // set default options
        this.options = {
            collapsed : true,
            draggable : false,
            auto : true,
            thematics : [
                "Réseau routier",
                "Bâtiment",
                "Toponyme",
                "Touristique/randonnée",
                "Borne cadastrale",
                "Hydrographie",
                "Végétation",
                "Autre"
            ]
        };

        // merge with user options
        Utils.assign(this.options, options);

        /** {Boolean} specify if control is collapsed (true) or not (false) */
        this.collapsed = this.options.collapsed;

        /** {Boolean} specify if control is draggable (true) or not (false) */
        this.draggable = this.options.draggable;

        /** {Boolean} specify if control add some stuff auto */
        this.auto = this.options.auto;

        this.buttonReportingShow = null;

        this.panelReportingContainer = null;
        this.panelReportingHeaderContainer = null; // usefull for the dragNdrop
        this.panelReportingFooterContainer = null;
        this.reportingBtnAnnulerFooter = null;
        this.reportingBtnSuivantFooter = null;
        this.buttonReportingClose = null;
        this.divReportingTitle = null;

        this.buttonReportingSubmit = null;
        this.spanReportingError = null;

        this.inputReportingContainer = null;
        this.formReportingContainer = null;
        this.sendReportingContainer = null;
        this.drawingReportingContainer = null;

        this.step = 0;
        this.stepContainer = [
            {
                name : "", 
                footer : true,
                header : true,
                next : 1, 
                prev : -1,
                action : null, // this.iocInput
                container : null // this.inputReportingContainer
            },
            {
                name : "Décrire le signalement",  
                footer : true,
                header : true,
                next : 2, 
                prev : 0, 
                action : null, // this.iocForm
                container : null // this.formReportingContainer
            },
            {
                name : "Envoyer un signalement", 
                footer : false, 
                header : true,
                next : -1, 
                prev : 1, 
                action : null, // this.iocService
                container : null // this.sendReportingContainer
            },
            {
                name : "Dessiner sur la carte",
                footer : true,
                header : true,
                next : 1, 
                prev : 1, 
                action : null, // this.iocDrawing
                container : null // this.drawingReportingContainer
            },
        ];

        // will be set by the IoC
        this.iocInput = null;
        this.iocForm = null;
        this.iocService = null;
        this.iocDrawing = null;

        /** {Object} raw data */
        this.data = null;

        /** {Array} specify some events listener */
        this.eventsListeners = [];
    }

    /**
     * Create control main container (DOM initialize)
     *
     * @returns {DOMElement} DOM element
     * @private
     */
    #initContainer () {
        // create main container
        var container = this._createMainContainerElement();

        var picto = this.buttonReportingShow = this._createShowReportingPictoElement();
        container.appendChild(picto);

        // panel
        var reportingPanel = this.panelReportingContainer = this._createReportingPanelElement();
        var reportingPanelDiv = this._createReportingPanelDivElement();
        reportingPanel.appendChild(reportingPanelDiv);

        // header
        var reportingPanelHeader = this.panelReportingHeaderContainer = this._createReportingPanelHeaderElement();
        // icone
        var reportingPanelIcon = this._createReportingPanelIconElement();
        reportingPanelHeader.appendChild(reportingPanelIcon);
        // title
        var reportingPanelTitle = this.divReportingTitle = this._createReportingPanelTitleElement();
        reportingPanelHeader.appendChild(reportingPanelTitle);
        // close picto
        var reportingCloseBtn = this.buttonReportingClose = this._createReportingPanelCloseElement();
        reportingPanelHeader.appendChild(reportingCloseBtn);
        
        // footer
        var reportingPanelFooter = this.panelReportingFooterContainer = this._createReportingPanelFooterElement();
        var BtnAnnulerFooter = this.reportingBtnAnnulerFooter = this._createReportingButtonAnnulerFooterElement();
        var BtnSuivantFooter = this.reportingBtnSuivantFooter = this._createReportingButtonSuivantFooterElement();
        reportingPanelFooter.appendChild(BtnAnnulerFooter);
        reportingPanelFooter.appendChild(BtnSuivantFooter);

        // step container for the custom code
        var input = this.inputReportingContainer = this._createReportingPanelInputElement();
        this.stepContainer[0].container = input;
        var form = this.formReportingContainer = this._createReportingPanelFormElement(this.options.thematics);
        this.stepContainer[1].container = form;
        var send = this.sendReportingContainer = this._createReportingPanelSendElement();
        this.stepContainer[2].container = send;
        var draw = this.drawingReportingContainer = this._createReportingPanelDrawingElement();
        this.stepContainer[3].container = draw;
        
        var submit = this.buttonReportingSubmit = this._createReportingSubmitFormElement();
        form.appendChild(submit);

        var error = this.spanReportingError = this._createReportingErrorSendElement();
        send.appendChild(error);

        reportingPanelDiv.appendChild(reportingPanelHeader);
        reportingPanelDiv.appendChild(input);
        reportingPanelDiv.appendChild(form);
        reportingPanelDiv.appendChild(send);
        reportingPanelDiv.appendChild(draw);
        reportingPanelDiv.appendChild(reportingPanelFooter);

        container.appendChild(reportingPanel);

        logger.log(container);

        return container;
    }

    /**
     * Add events listener on map (called by setMap)
     * 
     * @param {*} map - map
     * @private
     */
    _addEventsListeners (map) {
        var self = this;
        this.eventsListeners["custom:action"] = function (e) {
            logger.trace(e);
        };
        // the event custom:action is associate with an openlayers event 
        map.getLayers().on("some:event", this.eventsListeners["custom:action"]);
    }

    /**
     * Remove events listener on map (called by setMap)
     * @private
     */
    _removeEventsListeners () {
        var map = this.getMap();
        map.getLayers().un("some:event", this.eventsListeners["custom:action"]);
        delete this.eventsListeners["custom:action"];
    }

    // ################################################################### //
    // ############################ steps ################################ //
    // ################################################################### //

    /**
     * Set the current step of the reporting process.
     * @param {*} num 
     * @returns {void}
     * @description
     * This method sets the current step of the reporting process.
     * It updates the visibility of the step containers,
     * activates the corresponding IoC action,
     * and updates the reporting title and footer display.
     * It is typically called when the user navigates to a different step in the reporting process,
     * such as moving from the input step to the form step or the send step.
     */
    setStep (num) {
        if (num === undefined) {
            return;
        }
        
        // on reinitialise les panneaux par defaut et on desactive les actions IoC
        for (let index = 0; index < this.stepContainer.length; index++) {
            const element = this.stepContainer[index].container;
            element.classList.replace("gpf-visible", "gpf-hidden");
            var action = this.stepContainer[index].action;
            if (action) {
                action.disable();
                action.clear();
            }
        }

        // étape active
        this.step = num;
        var panel = this.stepContainer[num].container;
        panel.classList.replace("gpf-hidden", "gpf-visible");
        // on active l'action IoC
        var action = this.stepContainer[num].action;
        if (action) {
            // puis, on active l'action IoC courrante
            action.active();
        }
        // on modifie le titre
        this.divReportingTitle.innerHTML = this.stepContainer[num].name;
        // on modifie l'affichage du footer
        this.panelReportingFooterContainer.style.display = (this.stepContainer[num].footer) ? "flex" : "none";
        this.reportingBtnAnnulerFooter.style.display = (this.stepContainer[num].prev === -1) ? "none" : "flex";
        this.reportingBtnSuivantFooter.style.display = (this.stepContainer[num].next === -1) ? "none" : "flex";
    }

    /**
     * Move to the next step in the reporting process.
     * This method checks if there is a next step available.
     * @returns {void}
     * @description
     * This method is used to navigate to the next step in the reporting process.
     * It retrieves the next step from the stepContainer array based on the current step index.
     * If a next step exists (indicated by a valid index), it retrieves the action associated with the current step,
     * clears its data, and disables it.
     * The data from the current action is merged into the reporting data object.
     */
    nextStep () {
        var current = this.step;
        var next = this.stepContainer[current].next;
        if (next !== -1) {
            var action = this.stepContainer[current].action;
            if (action) {
                // on récupère les données de l'action IoC courrante
                var data = action.getData();
                // si les données sont vides, on ne va pas plus loin !
                if (!data) {
                    return;
                }
                logger.trace("Reporting nextStep", data);
                this.data = Object.assign({}, this.data, data);
                // puis, on desactive l'action IoC courrante
                action.disable();
                action.clear();
            }
            // on passe à l'étape suivante
            this.setStep(next);
        }
    }

    /**
     * Move to the previous step in the reporting process.
     * This method checks if there is a previous step available.
     * If there is a previous step, it clears the current action's data
     * and sets the step to the previous one.
     * @returns {void}
     * @description
     * This method is used to navigate back to the previous step in the reporting process.
     * It retrieves the previous step from the stepContainer array based on the current step index.
     * If a previous step exists (indicated by a valid index), it clears the current action's data
     * and sets the step to the previous one.
     * The current action's data is cleared to ensure that any unsaved changes are discarded.
     * This method is typically called when the user wants to go back to the previous step
     * in the reporting process, allowing them to review or modify their input before proceeding.
     * It is useful for scenarios where users may need to correct or change their input
     * before finalizing their report.
     * If the current step does not have a previous step (indicated by prev being -1),
     * the method does nothing, effectively preventing navigation to a non-existent step.
     * This ensures that the reporting process remains linear and prevents users from navigating
     * to steps that are not part of the defined workflow.
     */
    prevStep () {
        var current = this.step;
        var prev = this.stepContainer[current].prev;
        if (prev !== -1) {
            var action = this.stepContainer[current].action;
            if (action) {
                // on ne récupère pas les données de l'action IoC courrante car on abandonne l'étape
                // on desactive l'action IoC
                action.clear();
            }
            // on passe à l'étape précédente
            this.setStep(prev);
        }
    }

    clear () {
        // on reinitialise les panneaux par defaut et on desactive les actions IoC
        for (let index = 0; index < this.stepContainer.length; index++) {
            const element = this.stepContainer[index].container;
            element.classList.replace("gpf-visible", "gpf-hidden");
            var action = this.stepContainer[index].action;
            if (action) {
                action.disable();
                action.clear();
            }
        }
        // on supprime la couche de signalement
        // créée par l'outil de dessin
        var drawing =  this.iocDrawing.Drawing;
        if (drawing) {
            var layer = drawing.getLayer();
            var map = this.getMap();
            if (layer) {
                map.removeLayer(layer);
                drawing.setLayer();
            }
        }
    }
    // ################################################################### //
    // ######################## event dom ################################ //
    // ################################################################### //
    
    /**
     * Handle the click event on the "Show Reporting" button.
     * @param {*} e - The click event object.
     */
    onShowReportingClick (e) {
        logger.trace("onShowReportingClick", e);
        var opened = this.buttonReportingShow.ariaPressed;
        if (opened === "true") {
            this.onPanelOpen();
        }
        this.collapsed = !(opened === "true");
        this.dispatchEvent("change:collapsed");

        if (this.collapsed) {
            this.clear();
        } else {
            // doit on revenir à la 1ére étape ?
            this.setStep(0);
            /**
             * event triggered when the reporting panel is opened
             * @event reporting:opened
             * @description
             * This event is dispatched when the reporting panel is opened.
             * It indicates that the reporting process has started and the user can begin inputting data.
             * This event can be used to perform additional actions when the reporting panel is opened,
             * such as initializing the input fields or updating the UI to reflect the reporting state.
             */
            this.dispatchEvent("reporting:opened");
        }
    }

    /**
     * Handle the click event on the "Previous Reporting" button.
     * @param {*} e - The click event object.
     */
    onPrevReportingClick (e) {
        logger.trace("onPrevReportingClick", e);
        this.prevStep();
    }
    
    /**
     * Handle the click event on the "Next Reporting" button.
     * @param {*} e - The click event object.
     */
    onNextReportingClick (e) {
        logger.trace("onNextReportingClick", e);
        this.nextStep();
    }

    /**
     * Handle the click event on the "Close Reporting" button.
     * @param {*} e - The click event object.
     */
    onCloseReportingClick (e) {
        logger.trace("onCloseReportingClick", e);
        this.clear();
    }

    /**
     * Handle the click event on the "Cancel Reporting" button.
     * @param {*} e - The click event object.
     */
    onCancelReportingClick (e) {
        logger.trace("onCancelReportingClick", e);
        this.clear();
        this.setStep(0);
    }

    // ######################################### //
    // ############# Panel Form ################ //

    /**
     * Handle the form submission event for the reporting form.
     * @param {*} e - The form submission event object.
     */
    onReportingFormSubmit (e) {
        logger.trace("onReportingFormSubmit", e);
    }

    /**
     * Handle the click event on the "Show Form Drawing Reporting" button.
     * @param {*} e - The click event object.
     */
    onShowFormDrawingReportingClick (e) {
        logger.trace("onShowFormDrawingReportingClick", e);
        this.setStep(3);
    }

    /**
     * Handle the click event on the "Show Form Input Reporting" button.
     * @param {*} e - The click event object.
     */
    onEntryFormNameReportingChange (e) {
        logger.trace("onEntryFormNameReportingChange", e);
    }

    /**
     * Handle the change event on the "Form Theme Reporting" select element.
     * @param {*} e - The change event object.
     */
    onSelectFormThemeReportingChange (e) {
        logger.trace("onSelectFormThemeReportingChange", e);
    }

    /**
     * Handle the change event on the "Form Description Reporting" textarea element.
     * @param {*} e - The change event object.
     */
    onEntryFormDescReportingChange (e) {
        logger.trace("onEntryFormDescReportingChange", e);
    }

    // ######################################### //
    // ############# Panel Send ################ //

    /**
     * Handle the change event on the "Send Mail Reporting" input element.
     * @param {*} e - The change event object.
     */
    onEntrySendMailReportingChange (e) {
        logger.trace("onEntrySendMailReportingChange", e);
    }

    /**
     * Handle the click event on the "Send Reporting" button.
     * @param {*} e - {mail, name, desc, theme, drawing, location}
     * @fires reporting:send
     * @description
     * This method is called when the user clicks on the "Send Reporting" button.
     * It is responsible for handling the click event and processing the reporting data.
     * It retrieves the mail from the event, updates the data object,
     * and sends the reporting data to the server or processes it as needed.
     * If the sending is successful, it clears the data and resets the step to the first step.
     * If there is an error during the sending process, it displays an error message for a limited time.
     */
    onShowSendReportingClick (e) {
        logger.trace("onShowSendReportingClick", e);
        // get the mail from the event
        this.data = Object.assign({}, this.data, {
            mail : e.mail
        });

        // send the reporting data to the server or process it as needed
        logger.info("Reporting data to send:", this.data);
        
        // call the service action to send the data
        this.iocService.send(this.data)
            .then(() => {
                // clear data after sending
                this.data = null;
                var drawing =  this.iocDrawing.Drawing;
                var layer = drawing.getLayer();
                var map = this.getMap();
                if (layer) {
                    map.removeLayer(layer);
                    drawing.setLayer();
                }
            })
            .then(() => {
                // FIXME ?
                // reset the step to the first step
                this.setStep(0);
            })
            .then(() => {
                /**
                 * event triggered at the end of the reporting process
                 * @event reporting:sending
                 * @description
                 * This event is dispatched when the reporting data is successfully sent.
                 * It contains the reporting data that was sent.
                 * This event can be used to perform additional actions after the reporting data is sent,
                 * such as updating the UI or notifying other components.
                 */
                this.dispatchEvent({
                    type : "reporting:sending",
                    data : this.data
                });
            })
            .catch((e) => {
            // UI error message !
                this.spanReportingError.classList.replace("gpf-hidden", "gpf-visible");
                setTimeout(() => {
                    this.spanReportingError.classList.replace("gpf-visible", "gpf-hidden");
                }, 5000);
                logger.error(e);
            });
    }

};

// on récupère les méthodes de la classe DOM
Object.assign(Reporting.prototype, ReportingDOM);
Object.assign(Reporting.prototype, Widget);

export default Reporting;

// Expose Export as ol.control.Reporting (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.Reporting = Reporting;
}
