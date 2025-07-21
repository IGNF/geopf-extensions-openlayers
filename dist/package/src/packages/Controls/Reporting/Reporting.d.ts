export default Reporting;
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
declare class Reporting {
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
    constructor(options?: {
        collapsed?: boolean | undefined;
        draggable?: boolean | undefined;
        auto?: boolean | undefined;
        thematics?: any[] | undefined;
        format?: string | undefined;
        icon?: string | undefined;
        element?: any;
        target?: string | undefined;
        render?: Function | undefined;
    });
    container: DOMElement;
    element: any;
    /**
     * Overwrite OpenLayers setMap method
     *
     * @param {ol.Map} map - Map.
     */
    setMap(map: ol.Map): void;
    /**
     * Get container
     *
     * @returns {DOMElement} container
     */
    getContainer(): DOMElement;
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
     * @param {ol.Map} map - The OpenLayers map instance to set for the components.
     * @description
     * This method initializes the IoC (Inversion of Control) components for the Reporting control.
     * It sets up the input, form, service, and drawing actions by creating instances of the respective classes.
     */
    private _setComponents;
    iocInput: any;
    iocForm: any;
    iocService: any;
    iocDrawing: any;
    setComponentInput(input: any): void;
    setComponentForm(form: any): void;
    setComponentService(service: any): void;
    setComponentDrawing(drawing: any): void;
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
    buttonReportingShow: any;
    panelReportingContainer: any;
    panelReportingHeaderContainer: any;
    panelReportingFooterContainer: any;
    reportingBtnAnnulerFooter: any;
    reportingBtnSuivantFooter: any;
    buttonReportingClose: any;
    divReportingTitle: any;
    labelReportingIcon: any;
    buttonReportingSubmit: any;
    spanReportingError: any;
    inputReportingContainer: any;
    formReportingContainer: any;
    sendReportingContainer: any;
    drawingReportingContainer: any;
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
     * Add events listener on map (called by setMap)
     *
     * @param {*} map - map
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
     */
    onShowReportingClick(e: any): void;
    /**
     * Handle the click event on the "Previous Reporting" button.
     * @param {*} e - The click event object.
     */
    onPrevReportingClick(e: any): void;
    /**
     * Handle the click event on the "Next Reporting" button.
     * @param {*} e - The click event object.
     */
    onNextReportingClick(e: any): void;
    /**
     * Handle the click event on the "Close Reporting" button.
     * @param {*} e - The click event object.
     */
    onCloseReportingClick(e: any): void;
    /**
     * Handle the click event on the "Cancel Reporting" button.
     * @param {*} e - The click event object.
     */
    onCancelReportingClick(e: any): void;
    /**
     * Handle the form submission event for the reporting form.
     * @param {*} e - The form submission event object.
     */
    onReportingFormSubmit(e: any): void;
    /**
     * Handle the click event on the "Show Form Drawing Reporting" button.
     * @param {*} e - The click event object.
     */
    onShowFormDrawingReportingClick(e: any): void;
    /**
     * Handle the click event on the "Show Form Input Reporting" button.
     * @param {*} e - The click event object.
     */
    onEntryFormNameReportingChange(e: any): void;
    /**
     * Handle the change event on the "Form Theme Reporting" select element.
     * @param {*} e - The change event object.
     */
    onSelectFormThemeReportingChange(e: any): void;
    /**
     * Handle the change event on the "Form Description Reporting" textarea element.
     * @param {*} e - The change event object.
     */
    onEntryFormDescReportingChange(e: any): void;
    /**
     * Handle the change event on the "Send Mail Reporting" input element.
     * @param {*} e - The change event object.
     */
    onEntrySendMailReportingChange(e: any): void;
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
    onShowSendReportingClick(e: any): void;
    #private;
}
//# sourceMappingURL=Reporting.d.ts.map