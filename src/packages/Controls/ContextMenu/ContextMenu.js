// https://jsfiddle.net/ignfgeoportail/uy8Ls1m2/
// https://www.npmjs.com/package/ol-contextmenu

// import CSS
import "../../CSS/Controls/ContextMenu/GPFcontextMenu.css";

// import OpenLayers
import Control from "../Control";
import Overlay from "ol/Overlay";
import {
    transform as olTransformProj,
    fromLonLat as olFromLonLat
} from "ol/proj";

// import local
import Utils from "../../Utils/Helper";
import Markers from "../Utils/Markers";
import SelectorID from "../../Utils/SelectorID";
import Logger from "../../Utils/LoggerByDefault";

// DOM
import ContextMenuDOM from "./ContextMenuDOM";
import olContextMenu from "ol-contextmenu";
import Route from "../Route/Route";
import Widget from "../Widget";

var logger = Logger.getLogger("contextMenu");

/**
 * @classdesc
 *
 * ContextMenu button
 *
 * @constructor
 * @alias ol.control.ContextMenu
 * @type {ol.control.ContextMenu}
 * @extends {ol.control.Control}
 * @param {Object} options - options for function call.
 *    la clé contextMenuItemsOptions permet de paramétrer 
 *    un tableau d'item dont le format est hérité de la librairie
 *    {@link https://www.npmjs.com/package/ol-contextmenu}
 * 
 *    ex : { contextMenuItemsOptions : itemsOpt }
 * 
 * @example
 * var contextMenu = new ol.control.ContextMenu();
 * map.addControl(contextMenu);
 */
var ContextMenu = class ContextMenu extends Control {

    /**
     * See {@link ol.control.ContextMenu}
     * @module ContextMenu
     * @alias module:~controls/ContextMenu
     * @param {Object} [options] - options
     * @example
     * import ContextMenu from "gpf-ext-ol/controls/ContextMenu"
     * ou 
     * import { ContextMenu } from "gpf-ext-ol"
     */
    constructor (options) {
        options = options || {};
        
        // call ol.control.Control constructor
        super({
            element : options.element,
            target : options.target,
            render : options.render
        });

        if (!(this instanceof ContextMenu)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        /**
        * Nom de la classe (heritage)
        * @private
        */
        this.CLASSNAME = "ContextMenu";

        // initialisation du composant
        this.initialize(options);

        // ContextMenu main DOM container
        this.container = this.initContainer();

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
            // some stuff
            map.addControl(this.contextmenu);
            map.addOverlay(this._marker);

            // ajout des evenements sur la carte
            if (this.auto) {
                this.addEventsListeners();
            }
        } else {
            // suppression des evenements sur la carte
            // pour les futurs suppressions de couche
            if (this.auto) {
                this.removeEventsListeners();
            }
        }

        // on appelle la méthode setMap originale d'OpenLayers
        super.setMap(map);
    }

    // ################################################################### //
    // ################### getters / setters ############################# //
    // ################################################################### //


    // ################################################################### //
    // #################### privates methods ############################# //
    // ################################################################### //
    
    /**
     * Initialize ContextMenu control (called by ContextMenu constructor)
     *
     * @param {Object} options - constructor options
     * @private
     */
    initialize (options) {
        this.uid = SelectorID.generate();

        // set default options
        this.options = {
            collapsed : true,
            draggable : false,
            auto : true,
            panel : true,
            contextMenuItemsOptions : []
        };

        // merge with user options
        Utils.assign(this.options, options);

        /** {Boolean} specify if control is collapsed (true) or not (false) */
        this.collapsed = this.options.collapsed;

        /** {Boolean} specify if control is draggable (true) or not (false) */
        this.draggable = this.options.draggable;

        /** {Boolean} specify if control add some stuff auto */
        this.auto = this.options.auto;

        this.buttonContextMenuShow = null;
        this.panelContextMenuContainer = null;
        this.panelContextMenuHeaderContainer = null; // usefull for the dragNdrop
        this.buttonContextMenuClose = null;

        this.panelContextMenuEntriesContainer = null;

        /** {Array} specify some events listeners */
        this.eventsListeners = [];
        this.controlList = []; 

        // Point pour le calcul d'itinéraire
        this.itiPoints =  new Array(7);

        this._marker = new Overlay({
            element : this._createPinDOMOverlay(Markers["lightOrange"]),
            stopEvent : false,
            offset : Markers.defaultOffset
        });;

        var contextMenuItems = this.getAvailableContextMenuControls.call(this);
        this.contextMenuItemsOptions = [];
        if (options.contextMenuItemsOptions instanceof Array 
            && options.contextMenuItemsOptions
            && options.contextMenuItemsOptions.length > 0) {
            this.contextMenuItemsOptions = options.contextMenuItemsOptions.map((item) => ({ ...item, classname : "ol-context-menu-custom fr-text--md"}));
        }
        this.contextmenu = new olContextMenu(
            {
                defaultItems : false, // defaultItems are (for now) Zoom In/Zoom Out
                width : 250,
                items : contextMenuItems
            }
        );
    }

    /**
     * Create control main container (DOM initialize)
     *
     * @returns {DOMElement} DOM element
     * @private
     */
    initContainer () {
        // create main container
        var container = this._createMainContainerElement();

        var picto = this.buttonPointInfoShow = this._createShowPointInfoPictoElement();
        container.appendChild(picto);

        // panel
        var pointInfoPanel = this.panelPointInfoContainer = this._createPointInfoPanelElement();
        var pointInfoPanelDiv = this._createPointInfoPanelDivElement();
        pointInfoPanel.appendChild(pointInfoPanelDiv);

        // container for the custom code
        var pointInfoEntriesDiv = this.panelPointInfoEntriesContainer = this._createEntriesElement();
        pointInfoPanel.appendChild(pointInfoEntriesDiv);


        // header ?
        // if (this.options.panel) {
        var pointInfoPanelHeader = this.panelPointInfoHeaderContainer = this._createPointInfoPanelHeaderElement();
        // icone
        var pointInfoPanelIcon = this._createPointInfoPanelIconElement();
        pointInfoPanelHeader.appendChild(pointInfoPanelIcon);
        // title
        var pointInfoPanelTitle = this._createPointInfoPanelTitleElement();
        pointInfoPanelHeader.appendChild(pointInfoPanelTitle);
        // close picto
        var pointInfoCloseBtn = this.buttonPointInfoClose = this._createPointInfoPanelCloseElement();
        pointInfoPanelHeader.appendChild(pointInfoCloseBtn);
        pointInfoPanelDiv.appendChild(pointInfoPanelHeader);
        // }

        container.appendChild(pointInfoPanel);

        logger.log(container);

        return container;
    }

    /**
     * Add events listeners on map (called by setMap)
     * 
     * @private
     */
    addEventsListeners () {
        this.contextmenu.on("open", (evt) => {evt.this = this; this.onOpenContextMenu(evt);});
        this.contextmenu.on("close", (evt) => {evt.this = this; this.onCloseContextMenu(evt);});
    }

    /**
     * Remove events listeners on map (called by setMap)
     * @private
     */
    removeEventsListeners () {
    }

    /**
     * Add tools if added to the map Controls list
     * @private
     * @returns { Object } liste d'items par défaut du menu contextuel si control actif sur la carte
     */
    getAvailableContextMenuControls () {
        var allItems = [
            {
                text : "Adresse / Coordonnées",
                classname : "ol-context-menu-custom fr-text--md",
                callback : this.displayAdressAndCoordinate.bind(this),
                control_CLASSNAME : "ContextMenu"
            },
            {
                text : "Itinéraire depuis ce lieu",
                classname : "ol-context-menu-custom fr-text--md",
                callback : this.defineStartPoint.bind(this),
                control_CLASSNAME : "Route"
            },
            {
                text : "Itinéraire vers ce lieu",
                classname : "ol-context-menu-custom fr-text--md",
                callback : this.defineEndPoint.bind(this),
                control_CLASSNAME : "Route"
            },
            {
                text : "Isochrone - à proximité",
                classname : "ol-context-menu-custom fr-text--md",
                callback : this.computeIsochrone.bind(this),
                control_CLASSNAME : "Isocurve"
            },
            {
                text : "Ajouter des cartes / données",
                classname : "ol-context-menu-custom fr-text--md",
                callback : this.openCatalogue.bind(this),
                control_CLASSNAME : "Catalog"
            },
            "separator",
            {
                text : "Afficher la légende",
                classname : "ol-context-menu-custom fr-text--md",
                callback : this.displayLegend.bind(this),
                control_CLASSNAME : "Legends"
            }
        ];
        var map = this.getMap();
        var controls = [];
        if (map) {
            controls = map.getControls().getArray();
        }
        var items = allItems.filter((item) => {
            let control = controls.filter((control) => control.CLASSNAME && control.CLASSNAME == item.control_CLASSNAME);
            if (control.length > 0 || item == "separator") {
                return item;
            }
        });
        Array.prototype.push.apply(items, this.contextMenuItemsOptions);
        return items;
    }

    // ################################################################### //
    // ######################## Contextmenu specific code ################################ //
    // ################################################################### //
    /**
     * 
     * ---- Ajouter un point sur la carte 
     * 
     * Fonction utilisée lors d'un clique droit sur la carte 
     * Il s'agit d'afficher un marqueur et de stocker les coordonnées de ce point
     * Et tout cela en intéragissant avec le formulaire des paramètres de l'itinéraire 
     * @param {*} evt event
     * 
     */
    defineStartPoint (evt) {
        // on récupère les coordonnées du point cliqué
        let clickedCoordinate = this.to4326(evt.coordinate);
        var route = this.getMap().getControls().getArray().filter(control => control.CLASSNAME == "Route")[0];
        route._showRouteButton.click();
        route._showRouteButton.setAttribute("aria-pressed", true);
        this.itiPoints[0] = clickedCoordinate;
        route.setData({ points : this.itiPoints });
    }
  
    /**
     * ---- Ajouter un point sur la carte 
     * 
     * Fonction utilisée lors d'un clique droit sur la carte 
     * Il s'agit d'afficher un marqueur et de stocker les coordonnées de ce point
     * Et tout cela en intéragissant avec le formulaire des paramètres de l'itinéraire 
     * 
     * @param {*} evt event
     */
    defineEndPoint (evt) {
        // on récupère les coordonnées du point cliqué
        let clickedCoordinate = this.to4326(evt.coordinate);
        var route = this.getMap().getControls().getArray().filter(control => control.CLASSNAME == "Route")[0];
        route._showRouteButton.click();
        route._showRouteButton.setAttribute("aria-pressed", true);
        this.itiPoints[6] = clickedCoordinate;
        route.setData({ points : this.itiPoints });
    }

    /**
     * Convertit les coordonnées en EPSG:4326
     *  
     * @param { Array } coord Coordonnées en 3857
     * @returns { Array } tableau de coordonnées en 4326
     */
    to4326 (coord) {
        return olTransformProj([
            parseFloat(coord[0]), parseFloat(coord[1])
        ], "EPSG:3857", "EPSG:4326");
    }

    /**
     * Fonction qui lance le calcul d'isochrone 
     * pour les coordonnées sous le clic
     * 
     * @param {*} evt event
     */
    computeIsochrone (evt) {
        var isocurve = this.getMap().getControls().getArray().filter(control => control.CLASSNAME == "Isocurve")[0];
        isocurve._pictoIsoButton.click();
        isocurve._pictoIsoButton.setAttribute("aria-pressed", true);
        let clickedCoordinate = this.to4326(evt.coordinate);
        var data = isocurve.getData();
        data.point = clickedCoordinate;
        isocurve.setData(data);
    }

    /**
     * Fonction qui ouvre le widget des légendes
     * 
     * @param {*} evt event
     */
    displayLegend (evt) {
        var legend = this.getMap().getControls().getArray().filter(control => control.CLASSNAME == "Legends")[0];
        legend.buttonLegendsShow.click();
        legend.buttonLegendsShow.setAttribute("aria-pressed", true);
    }

    /**
     * Fonction qui ouvre le widget Catalogue
     * 
     * @param {*} evt event
     */
    openCatalogue (evt) {
        var catalog = this.getMap().getControls().getArray().filter(control => control.CLASSNAME == "Catalog")[0];
        catalog.buttonCatalogShow.click();
        catalog.buttonCatalogShow.setAttribute("aria-pressed", true);
    }

    /**
     * Fonction qui ouvre un panel qui affiche les coordonnées et l'adresse sous le clic
     * 
     * @param {*} evt event
     */
    displayAdressAndCoordinate (evt) {
        let clickedCoordinate = this.to4326(evt.coordinate);
        this.panelPointInfoEntriesContainer.innerHTML = "";   
    
        this._marker.setPosition(olFromLonLat(clickedCoordinate));

        this.buttonPointInfoShow.click();
        this.buttonPointInfoShow.setAttribute("aria-pressed", true);
        var coordinate = document.createElement("div");
        coordinate.innerHTML = clickedCoordinate[0].toFixed(6) + ", " + clickedCoordinate[1].toFixed(6);
        var address = document.createElement("div");
        var parcel = document.createElement("div");
        var altitude = document.createElement("div");
        this.panelPointInfoEntriesContainer.appendChild(coordinate);
        this.panelPointInfoEntriesContainer.appendChild(address);
        this.panelPointInfoEntriesContainer.appendChild(parcel);
        this.panelPointInfoEntriesContainer.appendChild(altitude);

        var altiOptions = {
            rawResponse : false, // true|false
            scope : null, // this
            onSuccess : function (json) {
                if (json.elevations.length > 0 && json.elevations[0].z) {
                    altitude.innerHTML = "Altitude : " + json.elevations[0].z + "m";
                }
            },
            onFailure : function (error) {},
            // spécifique au service
            positions : [{lon : clickedCoordinate[0], lat : clickedCoordinate[1]}],
            outputFormat : "json" // json|xml
        };
        Gp.Services.getAltitude(altiOptions);

        var geocodageParcelOptions = {
            onSuccess : function (json) {
                if (json.locations.length > 0) {
                    parcel.innerHTML = "Parcelle : " + json.locations[0].placeAttributes.districtcode + " / " + json.locations[0].placeAttributes.section + " / " + json.locations[0].placeAttributes.number;
                }
            },
            onFailure : function (error) {},
            // spécifique au service
            position : {lon : clickedCoordinate[0], lat : clickedCoordinate[1]},
            searchGeometry : { type : "Circle", coordinates : [clickedCoordinate[0], clickedCoordinate[1]], radius : 100 },
            index : "CadastralParcel",
            maximumResponses : 1
        };
        Gp.Services.reverseGeocode(geocodageParcelOptions);

        var geocodageAdressOptions = {
            onSuccess : function (json) {
                if (json.locations.length > 0) {
                    address.innerHTML = json.locations[0].placeAttributes.label;
                }
            },
            onFailure : function (error) {},
            // spécifique au service
            position : {lon : clickedCoordinate[0], lat : clickedCoordinate[1]},
            searchGeometry : { type : "Circle", coordinates : [clickedCoordinate[0], clickedCoordinate[1]], radius : 100 },
            index : "StreetAddress",
            maximumResponses : 1
        };
        Gp.Services.reverseGeocode(geocodageAdressOptions);
    }
    

    // ################################################################### //
    // ######################## event dom ################################ //
    // ################################################################### //
    
    /**
     * ...
     * @param {*} e - ...
     */
    onShowPointInfoClick (e) {
        if (e.target.ariaPressed === "true") {
            this.onPanelOpen();
        }
        logger.trace(e);
        var opened = this.buttonPointInfoShow.ariaPressed;
        this.collapsed = !(opened === "true");
        this.dispatchEvent("change:collapsed");
        // on recalcule la position
        if (this.options.position && !this.collapsed) {
            this.updatePosition(this.options.position);
        }
    }

    /**
     * ...
     * @param {*} e - ...
     */
    onClosePointInfoClick (e) {
        logger.trace(e);
        this._marker.setPosition(undefined);
    }

    /**
     * ...
     * @param {*} e - ...
     */
    onCloseContextMenu (e) {
        e.target.clear();
    }

    /**
     * ...
     * @param {*} e - ...
     */
    onOpenContextMenu (e) {
        var addMenuToolsEventListeners = () => {
            e.this.controlList = []; 
            var controlArray = e.this.getMap().getControls().getArray().filter(control => control.CLASSNAME == "Route");
            if (controlArray.length > 0) {
                controlArray[0].on("route:newresults", () => {
                    e.this.itiPoints = new Array(7);
                });
            }
        };
        var contextMenuItems = e.this.getAvailableContextMenuControls();
        e.target.clear();
        e.target.extend(contextMenuItems);
        addMenuToolsEventListeners();
    }

};

// on récupère les méthodes de la classe DOM
Object.assign(ContextMenu.prototype, ContextMenuDOM);
// on récupère les méthodes d'une classe applicable à tous les contextMenus'
Object.assign(ContextMenu.prototype, ContextMenu);
Object.assign(ContextMenu.prototype, Widget);

export default ContextMenu;

// Expose Export as ol.control.ContextMenu (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.ContextMenu = ContextMenu;
}