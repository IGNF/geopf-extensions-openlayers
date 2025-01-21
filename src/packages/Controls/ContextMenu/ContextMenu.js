// https://jsfiddle.net/ignfgeoportail/uy8Ls1m2/
// https://www.npmjs.com/package/ol-contextmenu

// import CSS
import "../../CSS/Controls/ContextMenu/GPFcontextMenu.css";

// import OpenLayers
import Control from "../Control";
import Overlay from "ol/Overlay";
import Feature from "ol/Feature";
import olKML from "ol/format/KML";
import Polyline from "ol/format/Polyline";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import {
    transform as olTransformProj,
    get as olGetProj,
    transformExtent as olTransformExtentProj,
    fromLonLat as olFromLonLat
} from "ol/proj";
import {
    Icon,
    Stroke,
    Style,
    Circle,
    Fill
} from "ol/style";

// import local
import Utils from "../../Utils/Helper";
import Markers from "../Utils/Markers";
import SelectorID from "../../Utils/SelectorID";
import Logger from "../../Utils/LoggerByDefault";
import Draggable from "../../Utils/Draggable";

// DOM
import ContextMenuDOM from "./ContextMenuDOM";
import olContextMenu from "ol-contextmenu";
import Route from "../Route/Route";
import LayerSwitcher from "../LayerSwitcher/LayerSwitcher";
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
 * 
 * @fires custom:action
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
            map.addLayer(this.layerFeature);

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
            panel : true
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

        this.PinStyle = new Style({
            image : new Icon({
                src : Markers["lightOrange"],
                anchor : [0.5, 1],
                snapToPixel : true
            })});
        this.sourceLayerFeature = new VectorSource();

        this.layerFeature = new VectorLayer({source : this.sourceLayerFeature});

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

    to4326 (coord) {
        return olTransformProj([
            parseFloat(coord[0]), parseFloat(coord[1])
        ], "EPSG:3857", "EPSG:4326");
    }

    computeIsochrone (evt) {
        var isocurve = this.getMap().getControls().getArray().filter(control => control.CLASSNAME == "Isocurve")[0];
        isocurve._pictoIsoButton.click();
        isocurve._pictoIsoButton.setAttribute("aria-pressed", true);
        let clickedCoordinate = this.to4326(evt.coordinate);
        var data = isocurve.getData();
        data.point = clickedCoordinate;
        isocurve.setData(data);
    }

    displayLegend (evt) {
        var legend = this.getMap().getControls().getArray().filter(control => control.CLASSNAME == "Legends")[0];
        legend.buttonLegendsShow.click();
        legend.buttonLegendsShow.setAttribute("aria-pressed", true);
    }

    openCatalogue (evt) {
        var catalog = this.getMap().getControls().getArray().filter(control => control.CLASSNAME == "Catalog")[0];
        catalog.buttonCatalogShow.click();
        catalog.buttonCatalogShow.setAttribute("aria-pressed", true);
    }

    displayAdressAndCoordinate (evt) {
        let clickedCoordinate = this.to4326(evt.coordinate);
        this.panelPointInfoEntriesContainer.innerHTML = "";   
    
        this.sourceLayerFeature.clear();
        var feature = new Feature({
            type : "place",
            geometry : new Point(olFromLonLat(clickedCoordinate))
        });
        feature.setStyle(this.PinStyle);
        this.sourceLayerFeature.addFeature(feature);
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

        fetch("https://data.geopf.fr/altimetrie/1.0/calcul/alti/rest/elevation.json?gp-access-lib=3.4.2&lon=" + clickedCoordinate[0] + "&lat=" + clickedCoordinate[1] + "&indent=false&crs=%27CRS:84%27&resource=ign_rge_alti_wld&measures=false&zonly=true")
            .then(res => {
                return res.json();
            })
            .then(json => {
                if (json.elevations) {
                    altitude.innerHTML = "Altitude : " + json.elevations[0] + "m";
                }
            });

        fetch("https://data.geopf.fr/geocodage/reverse?gp-access-lib=3.4.2&index=parcel&searchgeom={%22type%22:%22Circle%22,%22coordinates%22:[" + clickedCoordinate[0] + "," + clickedCoordinate[1] + "],%22radius%22:100}&lon=" + clickedCoordinate[0] + "&lat=" + clickedCoordinate[1] + "&limit=1")
            .then(res => {
                return res.json();
            })
            .then(json => {
                if (json.features.length > 0) {
                    parcel.innerHTML = "Parcelle : " + json.features[0].properties.districtcode + " / " + json.features[0].properties.section + " / " + json.features[0].properties.number;
                }
            });

        fetch("https://data.geopf.fr/geocodage/reverse?gp-access-lib=3.4.2&index=address&searchgeom={%22type%22:%22Circle%22,%22coordinates%22:[" + clickedCoordinate[0] + "," + clickedCoordinate[1] + "],%22radius%22:100}&lon=" + clickedCoordinate[0] + "&lat=" + clickedCoordinate[1] + "&limit=1&category=commune")
            .then(res => {
                return res.json();
            })
            .then(json => {
                if (json.features.length > 0) {
                    address.innerHTML = json.features[0].properties.label;
                }
            });
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
        this.sourceLayerFeature.clear();
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