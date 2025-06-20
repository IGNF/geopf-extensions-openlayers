// import CSS
import "../../CSS/Controls/Reporting/GPFreporting.css";

// import OpenLayers
import Control from "../Control";
import { unByKey as olObservableUnByKey } from "ol/Observable";

// import local
import Utils from "../../Utils/Helper";
import SelectorID from "../../Utils/SelectorID";
import Logger from "../../Utils/LoggerByDefault";
import Draggable from "../../Utils/Draggable";

// DOM
import ReportingDOM from "./ReportingDOM";

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
        this.map = map || null;
        this.data = null;
        this.coordinate = null;
        this.listener = null;
    }

    // ######################################################## //
    // ########################## API ######################### //

    /**
     * Set the map for this action
     * @param {ol.Map} map - Map.
     */
    setMap (map) {
        logger.info("InputActionByDefaut map");
        this.map = map;
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
     */
    getData () {
        logger.info("InputActionByDefaut data");
        var projection = this.map.getView().getProjection();
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
            feature : geometry
        }
        return this.data || { feature : null };
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
    }
    /**
     * Activate the action by adding event listeners
     * @api
     * @description
     * This method sets up the action to listen for single click events on the map.
     * When a single click occurs, it triggers the handler method to capture the coordinates.
     */
    active () {
        this.#addEventsListeners();
    }
    /**
     * Disable the action by removing event listeners
     * @api
     * @description
     * This method removes the event listeners that were added during activation.
     */
    disable () {
        this.#removeEventsListeners();
    }

    // ######################################################## //
    // ######################### privates ##################### //

    #addEventsListeners () {
        logger.info("InputActionByDefaut active");
        if (!this.map) {
            return;
        }
        this.listener = this.map.on("singleclick", this.#handler.bind(this));
    }
    #removeEventsListeners () {
        logger.info("InputActionByDefaut disable");
        if (!this.map) {
            return;
        }
        olObservableUnByKey(this.listener);
    }
    #handler (e) {
        logger.info("InputActionByDefaut handler", e);
        if (!this.map) {
            return;
        }
        this.coordinate = e.coordinate;

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
        this.submit = null; // will be set by the IoC
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
        this.#addEventsListeners();
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
    setForm (form) {
        logger.info("FormActionByDefaut form");
        this.form = form;
        this.submit = this.form.querySelector('input[type="submit"]');
    }
    /**
     * Get the data for this action
     * @api
     * @returns {Object} data - Data for this action.
     * @description
     * This method retrieves the data captured from the form submission.
     * It simulates a form submission by clicking the submit button,
     * and returns the data as an object.
     */
    getData () {
        logger.info("FormActionByDefaut data");
        this.submit.click(); // simulate form submission
        return this.data || {};
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

    #addEventsListeners () {
        this.form.addEventListener("submit", this.#handler.bind(this), {once : true});
    }
    #handler (e) {
        logger.info("FormActionByDefaut handler", e);
        e.preventDefault();
        // on récupère les données du formulaire
        var formData = new FormData(e.target);
        // TODO
        // rendre plus dynamique
        // on transforme les données du formulaire en objet 
        this.data = {
            name : formData.get("GPreportingLabelName"),
            desc : formData.get("GPreportingTextDesc"),
            theme : formData.get("GPreportingSelectTheme")
        };
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
     * @param {Object} data - Data to send.
     * @returns {Promise} - A promise that resolves when the data is sent.
     * @api
     * @description
     * This method is intended to send data to a service.
     * It currently throws an error indicating that the method is not implemented.
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
 * Reporting button
 *
 * @constructor
 * @alias ol.control.Reporting
 * @type {ol.control.Reporting}
 * @extends {ol.control.Control}
 * @param {Object} options - options for function call.
 * 
 * @fires custom:action
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
            this.#setComponents(map);

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
                this.#addEventsListeners(map);
            }


        } else {
            // suppression des evenements sur la carte
            // pour les futurs suppressions de couche
            if (this.auto) {
                this.#removeEventsListeners();
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

    // ################################################################### //
    // ##################### public methods IoC ########################## //
    // ################################################################### //

    #setComponents (map) {
        // on initialise les actions IoC
        if (!this.iocInput) {
            this.iocInput = new InputActionByDefaut();
        }
        // on transmet la map
        this.iocInput.setMap(map);

        if (!this.iocForm) {
            this.iocForm = new FormActionByDefaut();
        }
        this.iocForm.setForm(this.formReportingContainer);

        if (!this.iocService) {
            this.iocService = new ServiceActionByDefaut();
        }
        
        this.stepContainer[0].action = this.iocInput;
        this.stepContainer[1].action = this.iocForm;
        this.stepContainer[2].action = this.iocService;

    }

    setComponentInput (input) {}

    setComponentForm (form) {}

    setComponentService (service) {}

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
    #addEventsListeners (map) {
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
    #removeEventsListeners () {
        var map = this.getMap();
        map.getLayers().un("some:event", this.eventsListeners["custom:action"]);
        delete this.eventsListeners["custom:action"];
    }

    // ################################################################### //
    // ############################ steps ################################ //
    // ################################################################### //

    /**
     * ...
     * @param {*} num 
     * @returns 
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
    }

    /**
     * ...
     * @returns 
     */
    nextStep () {
        var current = this.step;
        var next = this.stepContainer[current].next;
        if (next !== -1) {
            var action = this.stepContainer[current].action;
            if (action) {
                // on récupère les données de l'action IoC courrante
                var data = action.getData();
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
     * ...
     * @returns 
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

    // ################################################################### //
    // ######################## event dom ################################ //
    // ################################################################### //
    
    /**
     * ...
     * @param {*} e - ...
     */
    onShowReportingClick (e) {
        logger.trace("onShowReportingClick", e);
        var opened = this.buttonReportingShow.ariaPressed;
        this.collapsed = !(opened === "true");
        this.dispatchEvent("change:collapsed");

        if (this.collapsed) {
            this.iocInput.disable();
        } else {
            // FIXME doit on revenir à la 1ére étape ?
            this.iocInput.active();
        }
    }

    /**
     * ...
     * @param {*} e - ...
     */
    onPrevReportingClick (e) {
        logger.trace("onPrevReportingClick", e);
        this.prevStep();
    }
    
    /**
     * ...
     * @param {*} e - ...
     */
    onNextReportingClick (e) {
        logger.trace("onNextReportingClick", e);
        this.nextStep();
    }

    /**
     * ...
     * @param {*} e - ...
     */
    onCloseReportingClick (e) {
        logger.trace("onCloseReportingClick", e);
    }

    /**
     * ...
     * @param {*} e - ...
     */
    onCancelReportingClick (e) {
        logger.trace("onCancelReportingClick", e);
        this.setStep(0);
    }

    // ######################################### //
    // ############# Panel Form ################ //

    /**
     * ...
     * @param {*} e - ...
     */
    onReportingFormSubmit (e) {
        logger.trace("onReportingFormSubmit", e);
    }

    /**
     * ...
     * @param {*} e - ...
     */
    onShowFormDrawingReportingClick (e) {
        logger.trace("onShowFormDrawingReportingClick", e);
    }

    /**
     * ...
     * @param {*} e - ...
     */
    onEntryFormNameReportingChange (e) {
        logger.trace("onEntryFormNameReportingChange", e);
    }

    /**
     * ...
     * @param {*} e - ...
     */
    onSelectFormThemeReportingChange (e) {
        logger.trace("onSelectFormThemeReportingChange", e);
    }

    /**
     * ...
     * @param {*} e - ...
     */
    onEntryFormDescReportingChange (e) {
        logger.trace("onEntryFormDescReportingChange", e);
    }

    // ######################################### //
    // ############# Panel Send ################ //

    /**
     * ...
     * @param {*} e - ...
     */
    onEntrySendMailReportingChange (e) {
        logger.trace("onEntrySendMailReportingChange", e);
    }

    /**
     * ...
     * @param {*} e - {target, mail}
     * @description
     * This method is called when the user clicks on the "Send Reporting" button.
     * It is responsible for handling the click event and processing the reporting data.
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
        })
        .then(() => {
            // reset the step to the first step
            this.setStep(0);
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

export default Reporting;

// Expose Export as ol.control.Reporting (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.Reporting = Reporting;
}
