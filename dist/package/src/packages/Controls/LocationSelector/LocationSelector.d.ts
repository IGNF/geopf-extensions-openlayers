export default LocationSelector;
/**
 * @classdesc
 *
 * LocationSelector component. Enables to select a location, using autocompletion or picking location on the map
 *
 * @alias ol.control.LocationSelector
 * @module LocationSelector
*/
declare class LocationSelector extends Control {
    /**
     * @constructor
     * @param {Object} [options] - component options
     * @param {String} [options.apiKey] - API key for autocomplete service call. The key "calcul" is used by default.
     * @param {Boolean} [options.ssl = true] - use of ssl or not (default true, service requested using https protocol)
     * @param {Boolean} [options.displayInfo = true] - whether to display info in a popup or not (not implemented yet) Default is true
     * @param {Object} [options.tag] - tag options
     * @param {Number} [options.tag.id = 1] - order id number in a locations group, in case several LocationSelector are used. For instance in route case : departure tag id should be 0, arrival tag id should be 1, and other ones : 2, 3, ...
     * @param {Number} [options.tag.groupId = null] - locationSelector global component id (in case locationSelector is called by another graphic component, e.g. route control)
     * @param {String} [options.tag.label] - text to display in component (e.g. "Departure"). Default is ">"
     * @param {Object} [options.tag.markerOpts] - options to use your own marker. Default is a lightOrange marker.
     * @param {String} [options.tag.markerOpts.url] - marker base64 encoded url (ex "data:image/png;base64,...""). Mandatory for a custom marker
     * @param {Array} [options.tag.markerOpts.offset] - Offsets in pixels used when positioning the overlay. The first element in the array is the horizontal offset. A positive value shifts the overlay right. The second element in the array is the vertical offset. A positive value shifts the overlay down. Default is [0, 0]. (see {@link http://openlayers.org/en/latest/apidoc/ol.Overlay.html ol.Overlay})
     * @param {Boolean} [options.tag.display = true] - whether to display or hide component. Default is true
     * @param {Boolean} [options.tag.addOption = false] - whether to display picto to add another LocationSelector (in case of route control)
     * @param {Boolean} [options.tag.removeOption = false] - whether to display picto to remove a LocationSelector (in case of route control)
     * @param {Object} [options.autocompleteOptions] - autocomplete service options (see {@link http://ignf.github.io/geoportal-access-lib/latest/jsdoc/module-Services.html#~autoComplete Gp.Services.autoComplete()} to know all autocomplete options)
     * @example
     *  var locationselector = new LocationSelector({
     *      apiKey : "",
     *      tag : {
     *         id : 1,
     *         groupId : null,
     *         label : "Départ",
     *         markerOpts : {
     *              url : "...",
     *              offset : [0,0]
     *         },
     *         display : true
     *      },
     *      autocompleteOptions : {}
     *  });
     */
    constructor(options?: {
        apiKey?: string | undefined;
        ssl?: boolean | undefined;
        displayInfo?: boolean | undefined;
        tag?: {
            id?: number | undefined;
            groupId?: number | undefined;
            label?: string | undefined;
            markerOpts?: {
                url?: string | undefined;
                offset?: any[] | undefined;
            } | undefined;
            display?: boolean | undefined;
            addOption?: boolean | undefined;
            removeOption?: boolean | undefined;
        } | undefined;
        autocompleteOptions?: any;
    });
    /**
     * Nom de la classe (heritage)
     * @private
     */
    private CLASSNAME;
    _container: HTMLElement;
    /**
     * initialize component
     *
     * @param {Object} options - options
     * @private
     */
    private initialize;
    options: {
        tag: {
            id: number;
            groupId: null;
            label: string;
            display: boolean;
            addOption: boolean;
            removeOption: boolean;
        };
        displayInfo: boolean;
        autocompleteOptions: {};
    } | undefined;
    /** uuid */
    _uid: number | undefined;
    /** container map
     * @private
    */
    private _map;
    /** container principal des entrées
     * @private */
    private _inputsContainer;
    /** container du label du point
     * @private*/
    private _buttonLabel;
    /** container de la saisi de l'autocompletion
     * @private */
    private _inputAutoComplete;
    /** container du pointer de saisi sur la carte
     * @private */
    private _inputShowPointerContainer;
    /** label du pointer de saisi sur la carte (avec img)
     * @private */
    private _inputShowPointer;
    /** container des coordonnées
     * @private */
    private _inputCoordinateContainer;
    /** elements pour ajouter ou supprimer un nouveau point
     * @private */
    private _addPointElement;
    /** @private */
    private _removePointElement;
    /** coordonnées du point selectionné, en EPSG:4326
     * @private */
    private _coordinate;
    /** container des reponses de l'autocompletion
     * @private */
    private _suggestedContainer;
    /** @private */
    private _suggestedList;
    /** listes des reponses de l'autocompletion
     * @private */
    private _suggestedLocations;
    /** localisant
     * @private */
    private _currentLocation;
    /** ressources du services d'autocompletion (ayant droit!)
     * @private */
    private _resources;
    listenerKey: import("ol/events").EventsKey | null | undefined;
    /**
     * initialize marker : url and offset
     *
     * @private
     */
    private _initMarker;
    /** @private */
    private _marker;
    /** @private */
    private _markerUrl;
    /** @private */
    private _markerOffset;
    /**
     * get coordinate
     *
     * @returns {Array} this._coordinate - point coordinate (EPSG:4326) : [lon, lat]
     */
    getCoordinate(): any[];
    /**
     * set coordinate
     * @param {Object} coordinate - Coordinate in the map projection by default, otherwise, the projection is entered in the following parameter
     * @param {String} crs - Coordinate projection
     */
    setCoordinate(coordinate: any, crs: string): void;
    /**
     * clean all and input
     */
    clear(): void;
    /**
     * clear all results and the marker.
     */
    clearResults(): void;
    /**
     * initialize component container
     *
     * @returns {HTMLElement} DOM element
     * @private
     */
    private _initContainer;
    /**
     * this method is called by event 'click' on 'GPlocationOrigin' input
     *
     * @private
     */
    private onAutoCompleteInputClick;
    /**
     * this method is called by event 'keyup' on 'GProuteOrigin' tag input
     * (cf. this._createRouteAutoCompleteteInputElement), and it gets the value of input.
     * this value is passed as a parameter for the service autocomplete (text).
     * the results of the request are displayed into a drop down menu.
     * FIXME
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    private onAutoCompleteSearchText;
    /**
     * this method is called by event 'click' on 'GPautoCompleteResultsList' tag div
     * (cf. this._createAutoCompleteListElement), and it selects the location.
     * this location displays a marker on the map.
     * FIXME
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    private onAutoCompletedResultsItemClick;
    /**
     * this method is called by event 'click' on 'GProuteOriginPointerImg' tag input
     * (cf. this._createRoutePointerInputElement), and it create or remove the event of click map.
     *
     * @private
     */
    private onActivateMapPointClick;
    /**
     * this method is called by event 'click' on 'GProuteOriginLabel' tag label
     * (cf. this._createRoutePointLabelElement).
     * this point is erased.
     *Missing
     * @private
     */
    private onLocationClearPointClick;
    /**
     * this method is called by event 'click' on 'GProuteStageRemove' tag input
     * (cf. this._createRouteRemovePointElement).
     * this point is deleted
     *
     * @private
     */
    private onLocationRemovePointClick;
    /**
     * TODO this method is called by event 'click' on 'GProuteStageAdd' tag input
     * (cf. this._createRouteAddPointElement).
     * this point is added as a parameter for the service route.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    private onLocationAddPointClick;
    /**
     * this method is called by event 'click' on map
     * (cf. this.onRouteMapPointClick), and it gets the coordinate of click on map.
     * this point is saved as a parameter for the service route.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    private onMouseMapClick;
    /**
     * this sends the label to the panel.
     *
     * @param {String} label - label suggested location
     * @private
     */
    private _setLabel;
    /**
     * this change the cursor of the map when entering a point.
     *
     * @param {String} cursor - cursor style
     * @private
     */
    private _setCursor;
    /**
     * this sends the coordinates to the panel.
     *
     * @method _setCoordinate
     * @param {Array} olCoordinate - ol.Coordinate object [lon, lat] ou [x, y] (proj = map proj system)
     * @param {Object} crs - coordinate CRS (ol.proj.Projection)
     * @private
     */
    private _setCoordinate;
    /**
     * this method is called by this.on*ResultsItemClick()
     * and set center at given position.
     *
     * @param {Array} position - ol.Coordinate object [lon, lat] (en lat/lon : "EPSG:4326")
     * @private
     */
    private _setPosition;
    /**
     * this method is called by this.on*ResultsItemClick()
     * and displays a marker.
     * FIXME : marker IGN et informations ?
     *
     * @param {Array} position - ol.Coordinate object [lon, lat] ou [x, y]
     * @param {Object} information - suggested or geocoded information
     * @param {Boolean} display - display a popup information
     * @private
     */
    private _setMarker;
    /**
     * this method is called by this.onAutoCompleteSearchText()
     * and it clears all suggested location.
     *
     * @private
     */
    private _clearSuggestedLocation;
    /**
     * this method is called by event 'click' on map
     * and it hide suggested locations
     *
     * @private
     */
    private _hideSuggestedLocation;
    /**
     * this method is called by this.onAutoCompleteSearchText()
     * and it clears all suggested location.
     *
     * @private
     */
    private _displaySuggestedLocation;
    /**
     * this method is called by this.onAutoCompleteSearch()
     * and executes a request to the service.
     *
     * @param {Object} settings - service settings
     * @param {String}   settings.text - text
     * @param {Function} settings.onSuccess - callback
     * @param {Function} settings.onFailure - callback
     * @private
     */
    private _requestAutoComplete;
    /**
     * this method is called by this.onAutoCompleteSearchText()
     * and fills the container of the location list.
     * it creates a HTML Element per location
     * (cf. this. ...)
     *
     * @param {Object[]} locations - locations
     *
     * @private
     */
    private _fillAutoCompletedLocationListContainer;
}
import Control from "ol/control/Control";
//# sourceMappingURL=LocationSelector.d.ts.map