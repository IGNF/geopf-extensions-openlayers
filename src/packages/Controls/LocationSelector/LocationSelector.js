// import CSS
import "../../CSS/Controls/LocationSelector/GPFlocation.css";
// import "../../CSS/Controls/LocationSelector/GPFlocationStyle.css";
// import OpenLayers
import Control from "ol/control/Control";
import Overlay from "ol/Overlay";
import { transform as olTransformProj } from "ol/proj";
import { unByKey as olObservableUnByKey } from "ol/Observable";
// import geoportal library access
import Gp from "geoportal-access-lib";
// import local
import Logger from "../../Utils/LoggerByDefault";
import Utils from "../../Utils/Helper";
import GeocodeUtils from "../../Utils/GeocodeUtils";
import SelectorID from "../../Utils/SelectorID";
import Markers from "../Utils/Markers";
// DOM
import LocationSelectorDOM from "./LocationSelectorDOM";

var logger = Logger.getLogger("locationselector");

/**
 * @classdesc
 *
 * LocationSelector component. Enables to select a location, using autocompletion or picking location on the map
 * @constructor
 * @extends {ol.control.Control}
 * @alias ol.control.LocationSelector
 * @type {ol.control.LocationSelector}
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
class LocationSelector extends Control {

    /**
     * See {@link ol.control.LocationSelector}
     * @module LocationSelector
     * @alias module:~controls/LocationSelector
     * @param {*} options - options
     * @example
     * import LocationSelector from "gpf-ext-ol/controls/LocationSelector"
     * ou 
     * import { LocationSelector } from "gpf-ext-ol"
     */
    constructor (options) {
        options = options || {};

        super({
            element : options.element || document.createElement("div"),
            render : options.render,
            target : options.target
        });

        if (!(this instanceof LocationSelector)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }
        /**
         * Nom de la classe (heritage)
         * @private
         */
        this.CLASSNAME = "LocationSelector";
        // initialisation du composant
        this.initialize(options);

        // creation du DOM
        this._container = this._initContainer();

        // ajout du container
        (this.element) ? this.element.appendChild(this._container) : this.element = this._container;

        return this;
    }

    /**
     * initialize component
     *
     * @param {Object} options - options
     */
    initialize (options) {
        // set default options
        this.options = {
            tag : {
                id : 1, // numero d'ordre sur un groupe de locations
                groupId : null, // id du composant global contenant le LocationSelector
                label : ">",
                display : true,
                addOption : false,
                removeOption : false
            },
            displayInfo : true,
            autocompleteOptions : {}
        };

        // merge with user options
        Utils.mergeParams(this.options, options);

        /** uuid */
        this._uid = this.options.tag.groupId || SelectorID.generate();
        // info : si un uid (groupId) est spécifié
        // (par ex si ce composant est appélé par un autre composant graphique)
        // alors on le récupère, sinon c'est qu'il est indépendant : on génère donc un uuid

        /** container map */
        this._map = null;

        /** container principal des entrées  */
        this._inputsContainer = null;

        /** container du label du point */
        this._buttonLabel = null;

        /** container de la saisi de l'autocompletion */
        this._inputAutoComplete = null;

        /** container du pointer de saisi sur la carte */
        this._inputShowPointerContainer = null;

        /** label du pointer de saisi sur la carte (avec img) */
        this._inputShowPointer = null;

        /** container des coordonnées */
        this._inputCoordinateContainer = null;

        /** elements pour ajouter ou supprimer un nouveau point */
        this._addPointElement = null;
        this._removePointElement = null;

        /** coordonnées du point selectionné, en EPSG:4326 */
        this._coordinate = null;

        /** container des reponses de l'autocompletion */
        this._suggestedContainer = null;
        this._suggestedList = null;

        /** listes des reponses de l'autocompletion */
        this._suggestedLocations = [];

        /** localisant */
        this._currentLocation = null;

        /** marker */
        this._initMarker();

        /** ressources du services d'autocompletion (ayant droit!) */
        this._resources = {};

        // listener key for event click on map
        this.listenerKey = null;
    }

    /**
     * initialize marker : url and offset
     *
     * @private
     */
    _initMarker () {
        // init marker properties
        this._marker = null;
        this._markerUrl = "";
        this._markerOffset = [0, 0];

        if (this.options.tag.markerOpts && this.options.tag.markerOpts.url) {
            // get marker src url
            this._markerUrl = this.options.tag.markerOpts.url;

            // get marker offset
            var offset = this.options.tag.markerOpts.offset;
            if (offset) {
                if (Array.isArray(offset) && offset.length === 2) {
                    this._markerOffset = offset;
                } else {
                    logger.log("markerOpts.offset should be an array. e.g. : [0,0]");
                }
            }
        } else {
            // set default options for marker
            this._markerUrl = Markers["lightOrange"];
            this._markerOffset = Markers.defaultOffset;
        }
    }

    // ################################################################### //
    // ########################## publics methods ######################## //
    // ################################################################### //

    /**
     * get coordinate
     *
     * @returns {Array} this._coordinate - point coordinate (EPSG:4326) : [lon, lat]
     */
    getCoordinate () {
        return this._coordinate;
    }

    /**
     * set coordinate
     * @param {Object} coordinate - Coordinate in the map projection by default, otherwise, the projection is entered in the following parameter
     * @param {String} crs - Coordinate projection
     */
    setCoordinate (coordinate, crs) {
        var map = this.getMap();
        var proj = map.getView().getProjection().getCode();
        // on utilise la projection de la carte
        if (!crs) {
            crs = proj;
        }

        this._setCoordinate(coordinate, crs);

        // on utilise toujours la projection de la carte pour placer le marker
        coordinate = olTransformProj(coordinate, crs, proj);
        this._setMarker([
            coordinate[0],
            coordinate[1]
        ], null, false);
    }

    /**
     * clean all and input
     */
    clear () {
        this.clearResults();
        this._buttonLabel.click();
    }

    /**
     * clear all results and the marker.
     */
    clearResults () {
        this._currentLocation = null;
        this._coordinate = null;
        this._hideSuggestedLocation();
        this._clearSuggestedLocation();
        this._setMarker();
        // map.un("click", (e) => this.onMouseMapClick(e));
        olObservableUnByKey(this.listenerKey);
    }

    // ################################################################### //
    // ##################### init component (private) #################### //
    // ################################################################### //

    /**
     * initialize component container
     *
     * @returns {DOMElement} DOM element
     */
    _initContainer () {
        var id = this.options.tag.id;

        // create main container
        var container = this._createMainContainerElement();

        var inputs = this._inputsContainer = this._createLocationPointElement(id, this.options.tag.display);
        container.appendChild(inputs);

        var _buttonLabel = this._buttonLabel = this._createLocationPointLabelElement(id, this.options.tag.label);
        inputs.appendChild(_buttonLabel);
        var _inputAutoComplete = this._inputAutoComplete = this._createLocationAutoCompleteteInputElement(id);
        if (_inputAutoComplete.addEventListener) {
            _inputAutoComplete.addEventListener("click", () => this.onAutoCompleteInputClick());
        } else if (_inputAutoComplete.attachEvent) {
            _inputAutoComplete.attachEvent("onclick", () => this.onAutoCompleteInputClick());
        }
        inputs.appendChild(_inputAutoComplete);
        var _inputCoordinate = this._inputCoordinateContainer = this._createLocationCoordinateInputElement(id);
        inputs.appendChild(_inputCoordinate);
        var _inputShowPointer = this._inputShowPointerContainer = this._createLocationPointerShowInputElement(id);
        inputs.appendChild(_inputShowPointer);
        var _inputPointer = this._inputShowPointer = this._createLocationPointerInputElement(id);
        inputs.appendChild(_inputPointer);

        if (this.options.tag.addOption) {
            var _inputAddStage = this._addPointElement = this._createLocationAddPointElement();
            inputs.appendChild(_inputAddStage);
        }

        if (this.options.tag.removeOption) {
            var _inputRemoveStage = this._removePointElement = this._createLocationRemovePointElement(id);
            inputs.appendChild(_inputRemoveStage);
        }

        var resultsPanel = this._suggestedContainer = this._createLocationAutoCompleteElement(id);
        var results = this._suggestedList = this._createLocationAutoCompleteResultElement(id);
        resultsPanel.appendChild(results);
        container.appendChild(resultsPanel);

        return container;
    }

    // ################################################################### //
    // ###################### handlers events (dom) ###################### //
    // ################################################################### //

    /**
     * this method is called by event 'click' on 'GPlocationOrigin' input
     *
     * @private
     */
    onAutoCompleteInputClick () {
        if (this._inputAutoComplete && this._inputAutoComplete.value.length > 2) {
            this._displaySuggestedLocation();
        }
    }

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
    onAutoCompleteSearchText (e) {
        var value = e.target.value;
        if (!value) {
            return;
        }

        // on recupere les options du service
        var serviceOptions = this.options.autocompleteOptions || {};
        var _customOnSuccess = serviceOptions.onSuccess || null;
        var _customOnFailure = serviceOptions.onFailure || null;

        // on sauvegarde le localisant
        this._currentLocation = value;

        // on limite les requêtes à partir de 3 car. saisie !
        if (value.length < 3) {
            this._clearSuggestedLocation();
            return;
        }

        // INFORMATION
        // on effectue la requête au service d'autocompletion.
        // on met en place des callbacks afin de recuperer les resultats ou
        // les messages d'erreurs du service.
        // les resultats sont affichés dans une liste deroulante.
        // les messages d'erreurs sont affichés sur la console (?)
        var context = this;
        this._requestAutoComplete({
            text : value,
            maximumResponses : 5, // FIXME je limite le nombre de reponse car le container DOM est limité dans l'affichage !!!
            // callback onSuccess
            onSuccess : function (results) {
                if (results) {
                    var locations = results.suggestedLocations;
                    context._fillAutoCompletedLocationListContainer(locations);
                    if (_customOnSuccess) {
                        _customOnSuccess.call(this, results);
                    }
                }
            },
            // callback onFailure
            onFailure : function (error) {
                // FIXME
                // où affiche t on les messages : ex. 'No suggestion matching the search' ?
                // doit on nettoyer la liste des suggestions dernierement enregistrée :
                context._clearSuggestedLocation();
                logger.log(error.message);
                if (_customOnFailure) {
                    _customOnFailure.call(this, error);
                }
            }
        });

        var map = this.getMap();
        map.on(
            "click",
            () => this._hideSuggestedLocation()
        );
        map.on(
            "pointerdrag",
            () => this._hideSuggestedLocation()
        );
    }

    /**
     * this method is called by event 'click' on 'GPautoCompleteResultsList' tag div
     * (cf. this._createAutoCompleteListElement), and it selects the location.
     * this location displays a marker on the map.
     * FIXME
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    onAutoCompletedResultsItemClick (e) {
        var idx = SelectorID.index(e.target.id);

        if (!idx) {
            return;
        }

        // FIXME
        // les coordonnées sont inversées entre les 2 services !?
        // AutoCompletion : lon/lat ("EPSG:4326")
        // Geocoding : lat/lon
        var position = [
            this._suggestedLocations[idx].position.x,
            this._suggestedLocations[idx].position.y
        ];
        // on sauvegarde le point courant (en EPSG:4326, [lon, lat])
        this._coordinate = position;

        var info = {
            type : this._suggestedLocations[idx].type,
            fields : this._suggestedLocations[idx]
        };

        // on ajoute le texte de l'autocomplétion dans l'input
        var label = GeocodeUtils.getSuggestedLocationFreeform(this._suggestedLocations[idx]);
        this._setLabel(label);

        // Info : la position est en EPSG:4326, à transformer dans la projection de la carte
        var view = this.getMap().getView();
        var mapProj = view.getProjection().getCode();
        if (mapProj !== "EPSG:4326") {
            // on retransforme les coordonnées de la position dans la projection de la carte
            position = olTransformProj(position, "EPSG:4326", mapProj);
        }
        // on centre la vue et positionne le marker, à la position reprojetée dans la projection de la carte
        this._setPosition(position);
        this._setMarker(position, info, this.options.displayInfo);
    }

    /**
     * this method is called by event 'click' on 'GProuteOriginPointerImg' tag input
     * (cf. this._createRoutePointerInputElement), and it create or remove the event of click map.
     *
     * @private
     */
    onActivateMapPointClick () {
        var map = this.getMap();

        if (this._inputShowPointerContainer.checked) {
            // on efface l'ancien resultat
            this.clearResults();
            this.listenerKey = map.on(
                "click",
                (e) => this.onMouseMapClick(e)
            );
            this._setCursor("crosshair");
        } else {
            // map.un("click", (e) => this.onMouseMapClick(e));
            olObservableUnByKey(this.listenerKey);
            this._setCursor();
        }
    }

    /**
     * this method is called by event 'click' on 'GProuteOriginLabel' tag label
     * (cf. this._createRoutePointLabelElement).
     * this point is erased.
     *Missing
     * @private
     */
    onLocationClearPointClick () {
        this._setCursor();
        this.clearResults();
    }

    /**
     * this method is called by event 'click' on 'GProuteStageRemove' tag input
     * (cf. this._createRouteRemovePointElement).
     * this point is deleted
     *
     * @private
     */
    onLocationRemovePointClick () {
        this._setCursor();
        this.clearResults();
    }

    /**
     * TODO this method is called by event 'click' on 'GProuteStageAdd' tag input
     * (cf. this._createRouteAddPointElement).
     * this point is added as a parameter for the service route.
     *
     * @param {Object} e - HTMLElement
     */
    onLocationAddPointClick (e) {
        logger.log("onRouteAddPointClick", e);
    }

    // ################################################################### //
    // #################### handlers events (control) #################### //
    // ################################################################### //

    /**
     * this method is called by event 'click' on map
     * (cf. this.onRouteMapPointClick), and it gets the coordinate of click on map.
     * this point is saved as a parameter for the service route.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    onMouseMapClick (e) {
        var coordinate = e.coordinate;
        if (!e.map || !e.map.getView()) {
            return;
        }
        var crs = e.map.getView().getProjection();

        this._setCoordinate(coordinate, crs);

        this._setMarker([
            coordinate[0],
            coordinate[1]
        ], null, false);

        // on desactive l'event sur la map !
        this.onActivateMapPointClick(e);
    }

    // ################################################################### //
    // ################# pivates methods use by events ################### //
    // ################################################################### //

    /**
     * this sends the label to the panel.
     *
     * @param {String} label - label suggested location
     * @private
     */
    _setLabel (label) {
        this._inputAutoComplete.value = label;
    }

    /**
     * this change the cursor of the map when entering a point.
     *
     * @param {String} cursor - cursor style
     * @private
     */
    _setCursor (cursor) {
        var map = this.getMap();
        var div = map.getTargetElement();

        if (cursor) {
            div.style.cursor = cursor;
        } else {
            div.style.cursor = null;
        }
    }

    /**
     * this sends the coordinates to the panel.
     *
     * @method _setCoordinate
     * @param {Array} olCoordinate - ol.Coordinate object [lon, lat] ou [x, y] (proj = map proj system)
     * @param {Object} crs - coordinate CRS (ol.proj.Projection)
     * @private
     */
    _setCoordinate (olCoordinate, crs) {
        // structure
        // ol.Coordinate
        //      [
        //          4   // lon ou x
        //          48  // lat ou y
        //      ]

        // on transforme olCoodinate (dont la projection est celle de la carte) en EPSG:4326
        this._coordinate = olTransformProj(olCoordinate, crs, "EPSG:4326");

        // INFO : si on veut des DMS
        // var coords = ol.coordinate.toStringHDMS(this._coordinate, 2).split("N ");
        // // coords est du type : "48° 00′ 00″ N 2° 00′ 00″ E". On veut récupérer les 2 coordonnées séparément.
        // var lat = coords[0] + "N";
        // var lng = coords[1];

        // Pour avoir des degrés décimaux :
        var lat = this._coordinate[0].toFixed(4);
        var lng = this._coordinate[1].toFixed(4);

        var value = lng + " / " + lat;
        this.GPdisplayCoordinate(value);
    }

    /**
     * this method is called by this.on*ResultsItemClick()
     * and set center at given position.
     *
     * @param {Array} position - ol.Coordinate object [lon, lat] (en lat/lon : "EPSG:4326")
     * @private
     */
    _setPosition (position) {
        var view = this.getMap().getView();
        view.setCenter(position);
    }

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
    _setMarker (position, information, display) {
        var map = this.getMap();
        // remove previous markers
        if (this._marker != null) {
            map.removeOverlay(this._marker);
            this._marker = null;
        }

        if (position) {
            var markerDiv = document.createElement("img");
            markerDiv.src = this._markerUrl;
            this._marker = new Overlay({
                position : position,
                offset : this._markerOffset,
                element : markerDiv,
                stopEvent : false
            });
            map.addOverlay(this._marker);

            if (display) {
                logger.log("marker information : ", information);
            }
            // // FIXME
            // // doit on mettre une information
            // // - correctement construite ?
            // // - uniquement informatif ?
            // // - RIEN ?
            // if (display) {
            //     var popupContent = null;
            //
            //     var values = [];
            //
            //     values.push(information.fields.fullText || "");
            //     values.push(information.fields.street || "");
            //     values.push(information.fields.postalCode || "");
            //     values.push(information.fields.commune || "");
            //
            //     if (information.type === "PositionOfInterest") {
            //         values.push(information.fields.poi || "");
            //         values.push(information.fields.kind || "");
            //     }
            //
            //     popupContent = values.join(" | ");
            //
            //     this._marker.bindPopup(popupContent);
            // }
        }
    }

    /**
     * this method is called by this.onAutoCompleteSearchText()
     * and it clears all suggested location.
     *
     * @private
     */
    _clearSuggestedLocation () {
        // suppression du dom
        this._suggestedLocations = [];
        if (this._suggestedList) {
            while (this._suggestedList.firstChild) {
                this._suggestedList.removeChild(this._suggestedList.firstChild);
            }
        }
    }

    /**
     * this method is called by event 'click' on map
     * and it hide suggested locations
     *
     * @private
     */
    _hideSuggestedLocation () {
        if (this._suggestedContainer) {
            this._suggestedContainer.classList.replace("GPelementVisible", "GPelementHidden");
            this._suggestedContainer.classList.replace("gpf-visible", "gpf-hidden");
        }
    }

    /**
     * this method is called by this.onAutoCompleteSearchText()
     * and it clears all suggested location.
     *
     * @private
     */
    _displaySuggestedLocation () {
        if (this._suggestedContainer) {
            this._suggestedContainer.classList.replace("GPelementHidden", "GPelementVisible");
            this._suggestedContainer.classList.replace("gpf-hidden", "gpf-visible");
        }
    }

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
    _requestAutoComplete (settings) {
        logger.log("_requestAutoComplete()", settings);

        // on ne fait pas de requête si on n'a pas renseigné de parametres !
        if (!settings || Object.keys(settings).length === 0) {
            return;
        }

        // on ne fait pas de requête si la parametre 'text' est vide !
        if (!settings.text) {
            return;
        }

        logger.log(settings);

        var options = {};
        // on recupere les options du service
        Utils.assign(options, this.options.autocompleteOptions);
        // ainsi que la recherche et les callbacks
        Utils.assign(options, settings);

        // les ressources
        var resources = this._resources["AutoCompletion"] || null;
        if (resources && Array.isArray(resources)) {
            if (!options.filterOptions) {
                options.filterOptions = {};
            }
            options.filterOptions.type = resources;
        }

        // cas où la clef API n'est pas renseignée dans les options du service,
        // on utilise celle renseignée au niveau du controle ou la clé "calcul" par défaut.
        options.apiKey = options.apiKey || this.options.apiKey;

        // si l'utilisateur a spécifié le paramètre ssl au niveau du control, on s'en sert
        // true par défaut (https)
        if (typeof options.ssl !== "boolean") {
            if (typeof this.options.ssl === "boolean") {
                options.ssl = this.options.ssl;
            } else {
                options.ssl = true;
            }
        }

        logger.log(options);

        Gp.Services.autoComplete(options);
    }

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
    _fillAutoCompletedLocationListContainer (locations) {
        if (!locations || locations.length === 0) {
            return;
        }

        // on vide la liste avant de la construire
        var element = this._suggestedList;
        if (element.childElementCount) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        }

        for (var i = 0; i < locations.length; i++) {
            // Proposals are dynamically filled in Javascript by autocomplete service
            this._createLocationAutoCompletedLocationElement(this.options.tag.id, locations[i], i);
        }

        // sauvegarde de l'etat des locations
        this._suggestedLocations = locations;
    }

};

// on récupère les méthodes de la classe DOM
Object.assign(LocationSelector.prototype, LocationSelectorDOM);

export default LocationSelector;

// Expose LocationSelector as ol.control.LocationSelector (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.LocationSelector = LocationSelector;
}
