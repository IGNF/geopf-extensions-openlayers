export default Reporting;
export type IocInput = InputActionByDefaut;
export type IocForm = FormActionByDefaut;
export type IocDrawing = DrawingActionByDefaut;
export type IocService = ServiceActionByDefaut;
export type ReportingOptions = {
    /**
     * - Définit si le widget est replié au chargement.
     */
    collapsed?: boolean | undefined;
    /**
     * - Permet de déplacer le panneau du widget.
     */
    draggable?: boolean | undefined;
    /**
     * - Active l’ajout automatique des événements sur la carte.
     */
    auto?: boolean | undefined;
    /**
     * - Liste des thématiques proposées dans le formulaire.
     */
    thematics?: string[] | undefined;
    /**
     * - Format d’export des dessins (ex : "geojson", "kml").
     */
    format?: string | undefined;
    /**
     * - Icône utilisée pour le point de signalement (URL ou base64).
     */
    icon?: string | undefined;
    /**
     * - Élément DOM à utiliser comme conteneur principal.
     */
    element?: HTMLElement | undefined;
    /**
     * - Sélecteur ou identifiant du conteneur cible.
     */
    target?: string | undefined;
    /**
     * - Fonction de rendu personnalisée.
     */
    render?: Function | undefined;
    /**
     * - Position CSS du widget sur la carte.
     */
    position?: string | undefined;
    /**
     * - Ajoute ou retire l’espace autour du panneau.
     */
    gutter?: boolean | undefined;
};
/**
 * @typedef {Object} ReportingOptions
 * @property {boolean} [collapsed=true] - Définit si le widget est replié au chargement.
 * @property {boolean} [draggable=false] - Permet de déplacer le panneau du widget.
 * @property {boolean} [auto=true] - Active l’ajout automatique des événements sur la carte.
 * @property {Array<string>} [thematics] - Liste des thématiques proposées dans le formulaire.
 * @property {string} [format="geojson"] - Format d’export des dessins (ex : "geojson", "kml").
 * @property {string} [icon] - Icône utilisée pour le point de signalement (URL ou base64).
 * @property {HTMLElement} [element] - Élément DOM à utiliser comme conteneur principal.
 * @property {string} [target] - Sélecteur ou identifiant du conteneur cible.
 * @property {Function} [render] - Fonction de rendu personnalisée.
 * @property {string} [position] - Position CSS du widget sur la carte.
 * @property {boolean} [gutter] - Ajoute ou retire l’espace autour du panneau.
 */
/**
 * @classdesc
 *
 * Reporting control.
 * This control allows users to report issues or provide feedback on the map.
 *
 * @alias ol.control.Reporting
 * @module Reporting
*/
declare class Reporting extends Control {
    /**
     * @constructor
     * @param {Object} [options] - options
     * @param {Boolean} [options.collapsed=true] - specify if control is collapsed (true) or not (false)
     * @param {Boolean} [options.draggable=false] - specify if control is draggable (true) or not (false)
     * @param {Boolean} [options.auto=true] - specify if control add some stuff auto
     * @param {Array} [options.thematics] - specify the list of thematics
     * @param {String} [options.format="geojson"] - specify the format for export (default: "geojson")
     * @param {String} [options.icon] - specify the icon for point entry (default: base64 encoded SVG)
     * @param {HTMLElement} [options.element] - specify the DOM element to append the control
     * @param {String} [options.target] - specify the target element to append the control
     * @param {Function} [options.render] - specify the render function
     * @description
     * The Reporting control is a custom OpenLayers control that allows users to report issues or provide
     * feedback on the map. It provides a user interface for inputting details about the report, including
     * the location, description, and thematic category of the issue.
     * @fires reporting:sending
     * @fires reporting:opened
     * @example
     * var reporting = new ol.control.Reporting();
     * map.addControl(reporting);
     */
    constructor(options?: {
        collapsed?: boolean | undefined;
        draggable?: boolean | undefined;
        auto?: boolean | undefined;
        thematics?: any[] | undefined;
        format?: string | undefined;
        icon?: string | undefined;
        element?: HTMLElement | undefined;
        target?: string | undefined;
        render?: Function | undefined;
    });
    container: HTMLElement;
    /**
     * Overwrite OpenLayers setMap method
     *
     * @param {Map} map - Map.
     */
    setMap(map: Map): void;
    /**
     * Get container
     *
     * @returns {HTMLElement} container
     */
    getContainer(): HTMLElement;
    /**
     * Returns true if widget is collapsed (minimized), false otherwise
     *
     * @returns {Boolean} collapsed - true if widget is collapsed
     */
    getCollapsed(): boolean;
    /**
     * Collapse or display widget main container
     *
     * @param {Boolean} collapsed - True to collapse widget, False to display it
     */
    setCollapsed(collapsed: boolean): void;
    collapsed: boolean | undefined;
    /**
     * Set the components for the Reporting control.
     * @private
     * @param {Map} map - The OpenLayers map instance to set for the components.
     * @description
     * This method initializes the IoC (Inversion of Control) components for the Reporting control.
     * It sets up the input, form, service, and drawing actions by creating instances of the respective classes.
     */
    private _setComponents;
    iocInput: InputActionByDefaut | undefined;
    iocForm: FormActionByDefaut | undefined;
    iocService: ServiceActionByDefaut | undefined;
    iocDrawing: DrawingActionByDefaut | undefined;
    /**
     * Add ioc
     * @param {IocInput} input - instance
     */
    setComponentInput(input: IocInput): void;
    /**
     * Add ioc
     * @param {IocForm} form - instance
     */
    setComponentForm(form: IocForm): void;
    /**
     * Add ioc
     * @param {IocService} service - instance
     */
    setComponentService(service: IocService): void;
    /**
     * Add ioc
     * @param {IocDrawing} drawing - instance
     */
    setComponentDrawing(drawing: IocDrawing): void;
    uid: number | undefined;
    options: {
        collapsed: boolean;
        draggable: boolean;
        auto: boolean;
        thematics: string[];
    } | undefined;
    /** {Boolean} specify if control is draggable (true) or not (false) */
    draggable: boolean | undefined;
    /** {Boolean} specify if control add some stuff auto */
    auto: boolean | undefined;
    /** @private */
    private buttonReportingShow;
    /** @private */
    private panelReportingContainer;
    /** @private */
    private panelReportingHeaderContainer;
    /** @private */
    private panelReportingFooterContainer;
    /** @private */
    private reportingBtnAnnulerFooter;
    /** @private */
    private reportingBtnSuivantFooter;
    /** @private */
    private buttonReportingClose;
    /** @private */
    private divReportingTitle;
    /** @private */
    private labelReportingIcon;
    /** @private */
    private buttonReportingSubmit;
    /** @private */
    private spanReportingError;
    /** @private */
    private inputReportingContainer;
    /** @private */
    private formReportingContainer;
    /** @private */
    private sendReportingContainer;
    /** @private */
    private drawingReportingContainer;
    step: any;
    stepContainer: {
        name: string;
        footer: boolean;
        header: boolean;
        next: number;
        prev: number;
        action: null;
        container: null;
    }[] | undefined;
    /** {Object} raw data */
    data: any;
    /** {Array} specify some events listener */
    eventsListeners: any[] | undefined;
    /**
     * event triggered when the reporting panel is opened
     * @event reporting:opened
     * @defaultValue "reporting:opened"
     * @group Events
     * @description
     * This event is dispatched when the reporting panel is opened.
     * It indicates that the reporting process has started and the user can begin inputting data.
     * This event can be used to perform additional actions when the reporting panel is opened,
     * such as initializing the input fields or updating the UI to reflect the reporting state.
     */
    OPENED_REPORTING_EVENT: string | undefined;
    /**
     * event triggered at the end of the reporting process
     * @event reporting:sending
     * @defaultValue "reporting:sending"
     * @group Events
     * @description
     * This event is dispatched when the reporting data is successfully sent.
     * It contains the reporting data that was sent.
     * This event can be used to perform additional actions after the reporting data is sent,
     * such as updating the UI or notifying other components.
     */
    SEND_REPORTING_EVENT: string | undefined;
    /**
     * Add events listener on map (called by setMap)
     *
     * @param {Map} map - map
     * @private
     */
    private _addEventsListeners;
    /**
     * Remove events listener on map (called by setMap)
     * @private
     */
    private _removeEventsListeners;
    /**
     * Set the current step of the reporting process.
     * @param {*} num - The step number to set.
     * @returns {void}
     * @description
     * This method sets the current step of the reporting process.
     * It updates the visibility of the step containers,
     * activates the corresponding IoC action,
     * and updates the reporting title and footer display.
     * It is typically called when the user navigates to a different step in the reporting process,
     * such as moving from the input step to the form step or the send step.
     */
    setStep(num: any): void;
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
    nextStep(): void;
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
    prevStep(): void;
    clear(): void;
    /**
     * Handle the click event on the "Show Reporting" button.
     * @param {*} e - The click event object.
     * @private
     */
    private onShowReportingClick;
    /**
     * Handle the click event on the "Previous Reporting" button.
     * @param {*} e - The click event object.
     * @private
     */
    private onPrevReportingClick;
    /**
     * Handle the click event on the "Next Reporting" button.
     * @param {*} e - The click event object.
     * @private
     */
    private onNextReportingClick;
    /**
     * Handle the click event on the "Close Reporting" button.
     * @param {*} e - The click event object.
     * @private
     */
    private onCloseReportingClick;
    /**
     * Handle the click event on the "Cancel Reporting" button.
     * @param {*} e - The click event object.
     * @private
     */
    private onCancelReportingClick;
    /**
     * Handle the form submission event for the reporting form.
     * @param {*} e - The form submission event object.
     * @private
     */
    private onReportingFormSubmit;
    /**
     * Handle the click event on the "Show Form Drawing Reporting" button.
     * @param {*} e - The click event object.
     * @private
     */
    private onShowFormDrawingReportingClick;
    /**
     * Handle the click event on the "Show Form Input Reporting" button.
     * @param {*} e - The click event object.
     * @private
     */
    private onEntryFormNameReportingChange;
    /**
     * Handle the change event on the "Form Theme Reporting" select element.
     * @param {*} e - The change event object.
     * @private
     */
    private onSelectFormThemeReportingChange;
    /**
     * Handle the change event on the "Form Description Reporting" textarea element.
     * @param {*} e - The change event object.
     * @private
     */
    private onEntryFormDescReportingChange;
    /**
     * Handle the change event on the "Send Mail Reporting" input element.
     * @param {*} e - The change event object.
     * @private
     */
    private onEntrySendMailReportingChange;
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
     * @private
     */
    private onShowSendReportingClick;
    #private;
}
/**
 * @typedef {InputActionByDefaut} IocInput
 * @property {function(Map):void} setMap - Définit la carte.
 * @property {function(string):void} setIcon - Définit l'icône.
 * @property {function():Object} getData - Retourne les données.
 * @property {function():void} clear - Réinitialise l'action.
 * @property {function():void} active - Active l'action.
 * @property {function():void} disable - Désactive l'action.
 * @description Instance d'action d'entrée pour le contrôle Reporting (IoC).
 */
declare class InputActionByDefaut {
    /**
     * @classdesc
     * Input action for the Reporting control.
     * This class handles user input on the map, specifically capturing single click events
     * to set coordinates for a reporting action.
     * @constructor
     * @alias InputActionByDefaut
     * @param {Map} [map] - Optional OpenLayers map instance.
     * @description
     * The constructor initializes the action with an optional map instance.
     * If no map is provided, it defaults to null.
     * It also initializes properties for data, coordinates, and event listeners.
     */
    constructor(map?: Map);
    map: Map | null;
    data: {
        location: {
            type: string;
            crs: {
                type: string;
                properties: {
                    name: string;
                };
            };
            features: {
                type: string;
                crs: {
                    type: string;
                    properties: {
                        name: string;
                    };
                };
                geometry: {
                    type: string;
                    coordinates: any;
                };
                properties: {
                    description: string;
                    date: string;
                    author: string;
                };
            }[];
        };
    } | null;
    coordinate: any;
    listener: import("ol/events").EventsKey | null;
    icon: string;
    /**
     * Set the map for this action
     * @api
     * @param {Map} map - Map.
     */
    setMap(map: Map): void;
    /**
     * Set the icon for this action
     * @api
     * @param {String} icon - Icon URL or base64 encoded string.
     * @description
     * This method sets the icon for the input action.
     * It updates the icon property with the provided value.
     * If the icon is not provided, it defaults to a base64 encoded SVG string.
     */
    setIcon(icon: string): void;
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
    getData(): any;
    /**
     * Clear the data and remove the event listener
     * @api
     * @description
     * This method resets the data and coordinate properties to null,
     * and removes the event listener if it exists.
     */
    clear(): void;
    marker: Overlay | null | undefined;
    /**
     * Activate the action by adding event listeners
     * @api
     * @description
     * This method sets up the action to listen for single click events on the map.
     * When a single click occurs, it triggers the handler method to capture the coordinates.
     */
    active(): void;
    /**
     * Disable the action by removing event listeners
     * @api
     * @description
     * This method removes the event listeners that were added during activation.
     */
    disable(): void;
    _addEventsListeners(): void;
    _removeEventsListeners(): void;
    _handler(e: any): void;
}
/**
 * @typedef {FormActionByDefaut} IocForm
 * @property {function(HTMLElement):void} setForm - Définit le formulaire.
 * @property {function():Object} getData - Retourne les données du formulaire.
 * @property {function():void} clear - Réinitialise le formulaire.
 * @property {function():void} active - Active l'action.
 * @property {function():void} disable - Désactive l'action.
 * @description Instance d'action de formulaire pour le contrôle Reporting (IoC).
 */
declare class FormActionByDefaut {
    /**
     * @classdesc
     * Form action for the Reporting control.
     * This class handles form submission and captures data from the form fields.
     * @constructor
     * @alias FormActionByDefaut
     * @param {HTMLFormElement} form - The form element to be managed by this action.
     * @description
     * The constructor initializes the action with a form element.
     * It sets up properties for data, form, and submit button.
     * The form and submit button will be set by the IoC (Inversion of Control) container.
     * The data property is initialized to null, indicating no data has been captured yet.
     */
    constructor(form: HTMLFormElement);
    data: {
        name: FormDataEntryValue;
        desc: FormDataEntryValue;
        theme: FormDataEntryValue;
    } | null;
    form: HTMLElement | null;
    submit: Element | null;
    error: Element | null;
    message: Element | null;
    /**
     * Activate the action by adding event listeners
     * @api
     * @description
     * This method sets up the action to listen for the form submission event.
     * When the form is submitted, it triggers the handler method to capture the form data.
     */
    active(): void;
    /**
     * Disable the action by removing event listeners
     * @api
     * @description
     * This method does not perform any action in this implementation.
     * It is intended to be overridden in subclasses if needed.
     */
    disable(): void;
    /**
     * Set the form for this action
     * @api
     * @param {HTMLElement} form DOM element - The form element to be set for this action.
     */
    setForm(form: HTMLElement): void;
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
    getData(): any;
    /**
     * Clear the data and reset the form
     * @api
     * @description
     * This method resets the data property to null,
     * effectively clearing any previously captured form data.
     * It is intended to be called when the form needs to be reset or cleared.
     */
    clear(): void;
    _addEventsListeners(): void;
    _handler(e: any): boolean;
}
/**
 * @typedef {DrawingActionByDefaut} IocDrawing
 * @property {function(Map):void} setMap - Définit la carte.
 * @property {function(HTMLElement):void} setTarget - Définit le conteneur DOM.
 * @property {function(String):void} setFormat - Définit le format d'export.
 * @property {function():Object} getData - Retourne les données du dessin.
 * @property {function():void} clear - Réinitialise le dessin.
 * @property {function():void} active - Active l'action.
 * @property {function():void} disable - Désactive l'action.
 * @description Instance d'action de dessin pour le contrôle Reporting (IoC).
 */
declare class DrawingActionByDefaut {
    /**
     * @classdesc
     * Drawing action for the Reporting control.
     * This class handles drawing actions on the map, allowing users to create and manage drawings.
     * @constructor
     * @alias DrawingActionByDefaut
     * @param {Map} [map] - Optional OpenLayers map instance.
     * @description
     * The constructor initializes the action with an optional map instance.
     * If no map is provided, it defaults to null.
     * It also initializes properties for data, map, DOM elements, and the Drawing instance.
     * The Drawing instance is used to manage the drawing functionality on the map.
     * The DOM elements for the drawing button and panel will be set by the IoC (Inversion of Control) container.
     */
    constructor(map?: Map);
    data: {
        drawing: any;
    } | null;
    format: string;
    map: Map | null;
    dom: HTMLElement | null;
    Drawing: Drawing | null;
    DrawingBtn: Element | null;
    DrawingPanel: Element | null;
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
    active(): void;
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
    disable(): void;
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
    clear(): void;
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
    getData(): any;
    /**
     * Set the map for this action
     * @api
     * @param {Map} map - Map.
     * @description
     * This method sets the map instance for the Drawing action.
     * It initializes the Drawing instance if it is not already created.
     * If the Drawing instance is already initialized, it simply updates the map property.
     * This method is typically called when the map is ready or when the Drawing action needs to be associated with a specific map instance.
     */
    setMap(map: Map): void;
    /**
     * Set the target DOM element for the Drawing action
     * @api
     * @param {HTMLElement} dom - The DOM element to set as the target for the Drawing action.
     */
    setTarget(dom: HTMLElement): void;
    /**
     * Set the format for exporting drawings
     * @api
     * @param {String} format - The format to set for exporting drawings.
     */
    setFormat(format: string): void;
    _initializeDrawing(): void;
}
/**
 * @typedef {ServiceActionByDefaut} IocService
 * @property {function(Object):Promise} send - Envoie les données au service.
 * @property {function():void} clear - Réinitialise l'action.
 * @property {function():void} active - Active l'action.
 * @property {function():void} disable - Désactive l'action.
 * @description Instance d'action de service pour le contrôle Reporting (IoC).
 */
declare class ServiceActionByDefaut {
    /**
     * Activate the action by adding event listeners
     * @api
     * @description
     * This method does not perform any action in this implementation.
     * It is intended to be overridden in subclasses if needed.
     */
    active(): void;
    /**
     * Disable the action by removing event listeners
     * @api
     * @description
     * This method does not perform any action in this implementation.
     * It is intended to be overridden in subclasses if needed.
     */
    disable(): void;
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
    send(data: any): Promise<any>;
    /**
     * Clear the data
     * @api
     * @description
     * This method does not perform any action in this implementation.
     * It is intended to be overridden in subclasses if needed.
     */
    clear(): void;
}
import Control from "../Control";
import Map from "ol/Map";
import Overlay from "ol/Overlay";
import Drawing from "../Drawing/Drawing";
//# sourceMappingURL=Reporting.d.ts.map