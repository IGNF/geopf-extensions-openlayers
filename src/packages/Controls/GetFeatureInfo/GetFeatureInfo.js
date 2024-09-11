// import CSS
import "../../CSS/Controls/GetFeatureInfo/GPFgetFeatureInfo.css";

// import OpenLayers
import Control from "../Control";

// import local
import Utils from "../../Utils/Helper";
import SelectorID from "../../Utils/SelectorID";
import Logger from "../../Utils/LoggerByDefault";
import Draggable from "../../Utils/Draggable";

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
 * @param {Object} options - options for function call.
 * 
 * @fires custom:action
 * @example
 * var getFeatureInfo = new ol.control.GetFeatureInfo();
 * map.addControl(getFeatureInfo);
 */
class GetFeatureInfo extends Control {

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
        var layers = options.layers || [];
        // call ol.control.Control constructor
        super({
            element : options.element,
            target : options.target,
            render : options.render
        });

        if (!(this instanceof GetFeatureInfo)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        // initialisation du composant
        this.initialize(options, layers);

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
                    this.options.position ? null : map.getTargetElement()
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
     * @param {Object} layers - layers
     * @private
     */
    initialize (options, layers) {
        this.uid = SelectorID.generate();

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
        this.panelGetFeatureInfoHeaderContainer = null; // usefull for the dragNdrop
        this.buttonGetFeatureInfoClose = null;
        this.formGetFeatureInfoContainer = null;

        this.panelGetFeatureInfoEntriesContainer = null;

        /** {Array} specify some events listeners */
        this.eventsListeners = [];
        this.setLayers(layers);
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
        var getFeatureInfoPanelDiv = this._createGetFeatureInfoPanelDivElement();
        getFeatureInfoPanel.appendChild(getFeatureInfoPanelDiv);

        // container for the custom code
        var form = this.formGetFeatureInfoContainer = this._createGetFeatureInfoPanelFormElement();
        getFeatureInfoPanel.appendChild(form);

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

        container.appendChild(getFeatureInfoPanel);

        logger.log(container);

        return container;
    }

    /**
     * Sets the layers list the control is attached to.
     * @param {Array.<Object>} layers - list of layers which can be requested through the control.
     *
     * @private
     */
    setLayers (layers) {
        if (!layers || !Array.isArray(layers)) {
            logger.log("[ERROR] GetFeatureInfo:setLayers - layers parameter should be a array");
            return;
        }
        this.layers = [];

        for (var i = 0; i < layers.length; ++i) {
            var ind = this.layers.push({}) - 1;

            if (layers[i].event) {
                // if (!this._isValidEvent(layers[i].event)) {
                logger.log("[ERROR] GetFeatureInfo:setLayers - layer event '" + this.layers[i].event + "' is not allowed.");
                // } else {
                this.layers[ind].event = layers[i].event;
                // }
            }

            if (layers[i].infoFormat) {
                this.layers[ind].infoFormat = layers[i].infoFormat;
            }

            this.layers[ind].obj = layers[i].obj;
        }
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
            console.log(e);
            console.log(this.layers);
            logger.trace(e);
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

    // ################################################################### //
    // ######################## event dom ################################ //
    // ################################################################### //
    
    /**
     * ...
     * @param {*} e - ...
     */
    onShowGetFeatureInfoClick (e) {
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

export default GetFeatureInfo;

// Expose Export as ol.control.GetFeatureInfo (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.GetFeatureInfo = GetFeatureInfo;
}