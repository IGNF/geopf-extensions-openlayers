// import CSS
import "../../CSS/Controls/GetFeatureInfo/GPFgetFeatureInfo.css";

// import OpenLayers
import Widget from "../Widget";
import Control from "../Control";
import VectorTileSource from "ol/source/VectorTile";
import VectorSource from "ol/source/Vector";
import TileWMSSource from "ol/source/TileWMS";
import WMTSSource from "ol/source/WMTS";
import ImageWMSSource from "ol/source/ImageWMS";
// import local
import Utils from "../../Utils/Helper";
import SelectorID from "../../Utils/SelectorID";
import Logger from "../../Utils/LoggerByDefault";
import Draggable from "../../Utils/Draggable";
import AsyncData from "../Utils/AsyncData";

// DOM
import GetFeatureInfoDOM from "./GetFeatureInfoDOM";

var logger = Logger.getLogger("getFeatureInfo");

/**
 * @classdesc
 *
 * GetFeatureInfo button
 *
 * @constructor
 * @alias ol.control.GetFeatureInfo
 * @type {ol.control.GetFeatureInfo}
 * @extends {ol.control.Control}
 * @param {Object} options - options for function call.
 *
 * @fires custom:action
 * @example
 * var getFeatureInfo = new ol.control.GetFeatureInfo();
 * map.addControl(getFeatureInfo);
 */
var GetFeatureInfo = class GetFeatureInfo extends Control {

    /**
     * See {@link ol.control.GetFeatureInfo}
     * @module GetFeatureInfo
     * @alias module:~controls/GetFeatureInfo
     * @param {Object} [options] - options
     * @example
     * import GetFeatureInfo from "gpf-ext-ol/controls/GetFeatureInfo"
     * ou
     * import { GetFeatureInfo } from "gpf-ext-ol"
     */
    constructor (options) {
        options = options || {};
        // call ol.control.Control constructor
        super(options);

        if (!(this instanceof GetFeatureInfo)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }
        /**
         * Nom de la classe (heritage)
         * @private
         */
        this.CLASSNAME = "GetFeatureInfo";
        // initialisation du composant
        this.initialize(options);

        // GetFeatureInfo main DOM container
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
            // mode "draggable"
            if (this.draggable) {
                Draggable.dragElement(
                    this.panelGetFeatureInfoContainer,
                    this.panelGetFeatureInfoHeaderContainer,
                    map.getTargetElement()
                );
            }
            // mode "collapsed"
            if (!this.collapsed) {
                this.buttonGetFeatureInfoShow.setAttribute("aria-pressed", true);
            }

            // some stuff

            // ajout des evenements sur la carte
            if (this.auto) {
                this.addEventsListeners(map);
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

        // position
        if (this.options.position) {
            this.setPosition(this.options.position);
        }

        // reunion du bouton avec le précédent
        if (this.options.gutter === false) {
            this.element.classList.add("gpf-button-no-gutter");
        }
    }

    // ################################################################### //
    // ################### getters / setters ############################# //
    // ################################################################### //


    // ################################################################### //
    // #################### privates methods ############################# //
    // ################################################################### //

    /**
     * Initialize GetFeatureInfo control (called by GetFeatureInfo constructor)
     *
     * @param {Object} options - constructor options
     * @private
     */
    initialize (options) {
        this.uid = options.id || SelectorID.generate();

        // set default options
        this.options = {
            collapsed : true,
            draggable : false,
            auto : true
        };

        // merge with user options
        Utils.assign(this.options, options);

        /** {Boolean} specify if control is collapsed (true) or not (false) */
        this.collapsed = this.options.collapsed;

        /** {Boolean} specify if control is draggable (true) or not (false) */
        this.draggable = this.options.draggable;

        /** {Boolean} specify if control add some stuff auto */
        this.auto = this.options.auto;

        this.buttonGetFeatureInfoShow = null;
        this.panelGetFeatureInfoContainer = null;
        this.getFeatureInfoPanelDiv = null;
        this.panelGetFeatureInfoHeaderContainer = null; // usefull for the dragNdrop
        this.buttonGetFeatureInfoClose = null;
        this.getFeatureInfoAccordionGroup = null;
        this.panelGetFeatureInfoEntriesContainer = null;

        /** {Array} specify some events listeners */
        this.eventsListeners = [];

        /** GFI settings */
        this.pixel = [];
        this.coordinates = [];
        this.layers = [];
        this.res = null;
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

        var picto = this.buttonGetFeatureInfoShow = this._createShowGetFeatureInfoPictoElement();
        container.appendChild(picto);

        // panel
        var getFeatureInfoPanel = this.panelGetFeatureInfoContainer = this._createGetFeatureInfoPanelElement();
        var getFeatureInfoPanelDiv = this.getFeatureInfoPanelDiv = this._createGetFeatureInfoPanelDivElement();
        getFeatureInfoPanel.appendChild(getFeatureInfoPanelDiv);

        // header
        var getFeatureInfoPanelHeader = this.panelGetFeatureInfoHeaderContainer = this._createGetFeatureInfoPanelHeaderElement();
        // icone
        // var getFeatureInfoPanelIcon = this._createGetFeatureInfoPanelIconElement();
        // getFeatureInfoPanelHeader.appendChild(getFeatureInfoPanelIcon);
        // title
        var getFeatureInfoPanelTitle = this._createGetFeatureInfoPanelTitleElement();
        getFeatureInfoPanelHeader.appendChild(getFeatureInfoPanelTitle);
        // close picto
        var getFeatureInfoCloseBtn = this.buttonGetFeatureInfoClose = this._createGetFeatureInfoPanelCloseElement();
        getFeatureInfoPanelHeader.appendChild(getFeatureInfoCloseBtn);

        getFeatureInfoPanelDiv.appendChild(getFeatureInfoPanelHeader);

        // container for the custom code
        var accordionGroup = this.getFeatureInfoAccordionGroup = this._createGetFeatureInfoAccordionGroup();
        getFeatureInfoPanelDiv.appendChild(accordionGroup);

        container.appendChild(getFeatureInfoPanel);

        logger.log(container);

        return container;
    }

    /**
     * Add events listeners on map (called by setMap)
     *
     * @param {*} map - map
     * @private
     */
    addEventsListeners (map) {
        var self = this;
        this.eventsListeners["singleclick"] = function (e) {
            logger.trace(e);
            self.onMapClick(e);
        };
        // the event custom:action is associate with an openlayers event
        map.on("singleclick", this.eventsListeners["singleclick"]);
    }

    /**
     * Remove events listeners on map (called by setMap)
     * @private
     */
    removeEventsListeners () {
        var map = this.getMap();
        map.getLayers().un("singleclick", this.eventsListeners["singleclick"]);
        delete this.eventsListeners["singleclick"];
    }

    /**
     * Tells if control is active or not
     * @private
     * @return { Boolean } true if active false if not
     */
    getFeatureInfoIsActive () {
        return this.buttonGetFeatureInfoShow.getAttribute("aria-pressed");
    }


    /**
     * event handler
     * @param {Event} e évènement de click
     * @private
     */
    onMapClick (e) {
        if (this.getFeatureInfoIsActive() === "true") {
            this.getFeatureInfoAccordionGroup.remove();
            this.layers = e.map.getLayers().getArray().filter((l) => {
                // On ne passe au GFI que les layers visibles
                if (l.isVisible(e.map.getView()) && l.getOpacity() > 0){
                    return l;
                }
                // tri le tableau des layers selon le z-index pour avoir le même affichage que dans le layerswitcher
            }).sort((a, b) => b.getZIndex() - a.getZIndex());
            if (this.layers.length > 0) {
                var accordionGroup = this.getFeatureInfoAccordionGroup = this._createGetFeatureInfoAccordionGroup();
                this.getFeatureInfoPanelDiv.appendChild(accordionGroup);
                this.map = e.map;
                this.pixel = e.pixel;
                this.coordinates = e.coordinate;
                this.res = e.map.getView().getResolution();
                this.displayGetFeatureInfo();
            }
            // Aucun layer visible sur la carte
            else {
                // rien à afficher car pas de couches visibles sur la carte, on s'arrête là.
                return;
            }
        }
    }

    /**
     * Main render function
     * @param { ol.Layer } layer layer openlayer
     * @return { Object } gfiLayer
     * {
     *      format : "wmts",
     *      layer: layer,
     *      url :  url          pour wmts et wms
     * }
     * @private
     */
    getGetFeatureInfoLayer (layer) {
        var gfiLayer =  {};
        let format = this.getLayerFormat(layer);
        gfiLayer = {
            format : format,
            layer : layer
        };
        if (format === "wmts") {
            let url = layer.getSource().getFeatureInfoUrl(
                this.coordinates,
                this.res,
                this.map.getView().getProjection(),
                {
                    INFOFORMAT : "text/html",
                    STYLES : ""
                }
            );
            gfiLayer = {
                ...gfiLayer,
                ...{
                    url : url
                }
            };
        }
        if (format === "wms") {
            let url = layer.getSource().getFeatureInfoUrl(
                this.coordinates,
                this.res,
                this.map.getView().getProjection(),
                {
                    INFO_FORMAT : "text/html",
                    STYLES : ""
                }
            );
            gfiLayer = {
                ...gfiLayer,
                ...{
                    url : url
                }
            };
        }
        return gfiLayer;
    }

    /**
     * Main render function
     * @param { ol.Layer } layer layer openlayer
     * @return { Array } Array of ol features
     * @private
     */
    getFeaturesAtClick (layer) {
        var features = [];
        this.getMap().forEachFeatureAtPixel(this.pixel, function (feature, olLayer) {
            if (layer == olLayer) {
                features.push(feature);
            }
        });
        return features;
    }

    /**
     * Main render function
     * @param { Object } gfiLayer layer openlayer
     * @return { Object } gfi result
     * {
     *      layername : "layername",
     *      content: "html"
     * }
     * @private
     */
    async getGetFeatureInfoContent (gfiLayer) {
        var content = null;
        if (gfiLayer.format === "vector") {
            var features = this.getFeaturesAtClick(gfiLayer.layer);
            if (features) {
                content = this.features2html(features);
            }
            return content;
        }
        else {
            return fetch(gfiLayer.url)
                .then((res) => res.text())
                .then((text) => {
                    var exception = false;
                    if (text.trim().length === 0 ||
                        text.indexOf("ServiceExceptionReport") !== -1 ||
                        text.indexOf("java.lang.NullPointerException") !== -1 ||
                        text.indexOf("java.lang.OutOfMemoryError") !== -1 ||
                        text.indexOf("not queryable") !== -1 ||
                        text.indexOf("No data") !== -1 ||
                        text.indexOf("non interrogeable") !== -1) {
                        // rien à afficher
                        exception = true;
                    }
                    if (!exception)  {
                        var dom = this.stringToHTML(text);
                        if (dom && dom.innerHTML && dom.innerHTML.trim().length > 0) {
                            return text;
                        }
                        // HTML est vide
                        else {
                            return null;
                        }
                    }
                    else {
                        return null;
                    }
                })
                .catch((error) => {
                    logger.log(error);
                    return error;
                });
        }
    }

    /**
     * Get layer title
     *
     * @param {Object} gfiLayer - the layer object used by the gfi widget
     * @returns {String} layerTitle - layer title
     */
    getLayerTitle (gfiLayer) {
        if (gfiLayer.layer.getProperties !== undefined && gfiLayer.layer.getSource !== undefined) {
            var layerProperties = gfiLayer.layer.getProperties();
            var src = layerProperties.source;
            var layerTitle = "";
            if (src) {
                layerTitle = src._title || src.name || layerProperties.title || layerProperties.name || src.url_ || "Couche de données";
            }
        }
        return layerTitle;
    }

    /**
     * Main render function
     * @private
     */
    displayGetFeatureInfo () {
        var gfiLayers = this.layers.map((l) => {
            return this.getGetFeatureInfoLayer(l);
        });

        // Structuration de l'objet pour afficher les GFI par layer
        var gfiContent = gfiLayers.map((gfiLayer) => {
            var layername = this.getLayerTitle(gfiLayer);

            var content = null;
            var accordeon = this._createGetFeatureInfoLayerAccordion(layername);
            // on affiche pas l'entrée avant d'être confirmation qu'elle aura du contenu renvoyé
            accordeon.style.display = "none";
            var pending = true;
            return new AsyncData({
                ...gfiLayer,
                ...{
                    layername : layername,
                    content : content,
                    contentDiv : accordeon,
                    pending : pending
                }
            });
        });
        // Ajout des accordéons par layer selon leur index sur la carte
        for (let i = 0; i < gfiContent.length; i++) {
            this.getFeatureInfoAccordionGroup.append(gfiContent[i].data.contentDiv);
        }
        // Abonnement aux modifications de la valeur du contenu GFI.
        gfiContent.forEach((data) => {
            data.subscribe((key, value) => {
                if (key == "content") {
                    data.set("pending", false);
                    if (data.get("content")) {
                        data.get("contentDiv").querySelector("div.fr-collapse").innerHTML = data.get("content");
                        // on affiche la pop-up car il y a au moins une entrée à afficher
                        this.buttonGetFeatureInfoClose.setAttribute("aria-pressed", true);
                        // du contenu est renvoyé : on affiche l'entrée
                        data.get("contentDiv").style.display = "block";
                    }
                    else {
                        // pas de contenu renvoyé : on retire l'entrée du DOM
                        data.get("contentDiv").remove();
                    }
                    // s'il n'y a aucun contenu renvoyé par le GFI
                    if (gfiContent.filter(gfi => gfi.get("pending") === true).length == 0
                        && gfiContent.filter(gfi => gfi.get("content")).length == 0) {
                        // on n'affiche pas la pop-up car pas de données
                        this.buttonGetFeatureInfoClose.setAttribute("aria-pressed", false);
                    }
                }
            });
        });

        // Lancement des requêtes GFI
        gfiContent.forEach((asyncD) => {
            this.getGetFeatureInfoContent(asyncD.data)
                .then((res) => {
                    asyncD.set("content", res);
                });
        });
    }

    /**
     * Return layer format
     *
     * @param {ol.layer.Layer} l - layer openlayers
     * @return {String} format - layer format can be wms, wmts, vector or unknown
     *
     */
    getLayerFormat (l) {
        // la fonction 'getType' existe uniquement en mode source es6.
        // le bundle ol ne fournit pas cette fonction !?
        var type = (typeof l.getType === "function") ? l.getType() : null;
        var source = l.getSource();
        if (type) {
            if (type === "VECTOR" || type === "VECTOR_TILE") {
                return "vector";
            }
            if (type === "TILE") {
                if (source.tileGrid) {
                    return "wmts";
                } else {
                    return "wms";
                }
            }
            if (type === "IMAGE") {
                return "wms";
            }
        } else {
            if (source instanceof TileWMSSource || source instanceof ImageWMSSource) {
                return "wms";
            }
            if (source instanceof WMTSSource) {
                return "wmts";
            }
            if (source instanceof VectorSource || source instanceof VectorTileSource) {
                return "vector";
            }
        }
        return "unknown";
    }

    /**
     * Gets HTML content from features array
     *
     * @param {Array.<ol.Features>} features - openlayers features Array
     * @returns {HTMLElement} HTML content.
     */
    features2html (features) {
        var content = document.createElement("div");
        features.forEach(function (f) {
            var props = f.getProperties();
            // si la properties 'render' est presente,
            // on ajoute directement le rendu HTML dans la balise principale
            if (props.hasOwnProperty("render")) {
                // content.innerHTML = props["render"].trim();
                // content.appendChild(props["render"]);
                content.insertAdjacentHTML("beforeend", props["render"]);
            } else {
                if (props.hasOwnProperty("name")) {
                    var nameDiv = document.createElement("div");
                    nameDiv.className = "gp-att-name-div";
                    // nameDiv.appendChild(document.createTextNode(props["name"])) ;
                    nameDiv.insertAdjacentHTML("afterbegin", props["name"]);
                    content.appendChild(nameDiv);
                }
                if (props.hasOwnProperty("description")) {
                    var descDiv = document.createElement("div");
                    descDiv.className = "gp-att-description-div";
                    // descDiv.appendChild(document.createTextNode(props["description"])) ;
                    descDiv.insertAdjacentHTML("afterbegin", props["description"]);
                    content.appendChild(descDiv);
                }
                var p = null;
                var others = false;
                var oDiv = null;
                var ul = null;
                var li = null;
                // Liste des properties à retirer de la visualisation :
                var listForbidden = [
                    // styles
                    "fill",
                    "fill-opacity",
                    "stroke",
                    "stroke-opacity",
                    "stroke-width",
                    "marker-symbol",
                    "marker-color",
                    "marker-size",
                    "geometry", // geometrie
                    "value",
                    "name", // déjà traité
                    "description", // déjà traité
                    "styleUrl",
                    "extensionsNode_", // extensions GPX
                    "icon" // ajouté par la 3D en cas de switch
                ];
                for (p in props) {
                    if (props[p] === undefined) {
                        continue;
                    }
                    if (listForbidden.indexOf(p) !== -1) {
                        continue;
                    }
                    if (!others) {
                        oDiv = document.createElement("div");
                        oDiv.className = "gp-att-others-div";
                        ul = document.createElement("ul");
                        others = true;
                    }
                    li = document.createElement("li");
                    var span = document.createElement("span");
                    span.className = "gp-attname-others-span";
                    span.appendChild(document.createTextNode(p + " : "));
                    li.appendChild(span);
                    li.appendChild(document.createTextNode(props[p]));
                    ul.appendChild(li);
                }
                if (ul) {
                    oDiv.appendChild(ul);
                    content.appendChild(oDiv);
                }
            }
        });

        // pas de contenu !
        if (!content.hasChildNodes()) {
            content = "";
        }
        else {
            content = content.innerHTML;
        }
        return content;
    }

    // ################################################################### //
    // ######################## event dom ################################ //
    // ################################################################### //

    /**
     * ...
     * @param {*} e - ...
     */
    onShowGetFeatureInfoClick (e) {
        if (e.target.ariaPressed === "true") {
            this.onPanelOpen();
        }
        // ouverture du panel pas systématique quand on clic sur le bouton d'activation
        // donc on doit fermer explicitement le panel quand on désactive le GFI
        if (e.target.ariaPressed === "false"){
            this.buttonGetFeatureInfoClose.setAttribute("aria-pressed", false);
        }
        logger.trace(e);
    }

    /**
     * ...
     * @param {*} e - ...
     */
    onCloseGetFeatureInfoClick (e) {
        logger.trace(e);
    }

    /**
     * ...
     * @param {*} e - ...
     */
    onGetFeatureInfoComputationSubmit (e) {
        logger.trace(e);
    }

};

// on récupère les méthodes de la classe DOM
Object.assign(GetFeatureInfo.prototype, GetFeatureInfoDOM);
Object.assign(GetFeatureInfo.prototype, Widget);

export default GetFeatureInfo;

// Expose Export as ol.control.GetFeatureInfo (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.GetFeatureInfo = GetFeatureInfo;
}
