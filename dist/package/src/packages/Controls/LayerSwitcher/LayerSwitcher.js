// import CSS
import "../../CSS/Controls/LayerSwitcher/GPFlayerSwitcher.css";
// import "../../CSS/Controls/LayerSwitcher/GPFlayerSwitcherStyle.css";
// import OpenLayers
// import Control from "ol/control/Control";
import Widget from "../Widget";
import Control from "../Control";
import { unByKey as olObservableUnByKey } from "ol/Observable";
import { intersects as olIntersects } from "ol/extent";
import {
    transformExtent as olTransformExtentProj
} from "ol/proj";
// import local
import SelectorID from "../../Utils/SelectorID";
import Logger from "../../Utils/LoggerByDefault";
import Config from "../../Utils/Config";
// DOM
import LayerSwitcherDOM from "./LayerSwitcherDOM";

var logger = Logger.getLogger("layerswitcher");

/**
 * @classdesc
 * OpenLayers Control to manage map layers : their order, visibility and opacity, and display their informations (title, description, legends, metadata...)
 *
 * @constructor
 * @extends {ol.control.Control}
 * @alias ol.control.LayerSwitcher
 * @type {ol.control.LayerSwitcher}
 * @param {Object} options - control options
 * @param {Array} [options.layers] - list of layers to be configured. Each array element is an object, with following properties :
 * @param {ol.layer.Layer} [options.layers.layer] - ol.layer.Layer layer to be configured (that has been added to map)
 * @param {Object} [options.layers.config] - custom configuration object for layer information (title, description, legends, metadata, quicklook url), with following properties :
 * @param {String} [options.layers.config.title] - layer alias, to be displayed in widget layer list. E.g. : "Cartes IGN"
 * @param {String} [options.layers.config.description] - layer description, to be displayed on title hover, or in layer information panel.
 * @param {String} [options.layers.config.quicklookUrl] - link to a quick look image for this layer.
 * @param {Array} [options.layers.config.legends] - array of layer legends. Each array element is an object, with following properties :
 *      - url (String, mandatory) : link to a legend
 *      - minScaleDenominator (Number, optional) : min scale denominator for legend validity.
 * @param {Array} [options.layers.config.metadata] - array of layer metadata. Each array element is an object, with property url (String, mandatory) : link to a metadata
 * @param {Object} [options.options] - ol.control.Control options (see {@link http://openlayers.org/en/latest/apidoc/ol.control.Control.html ol.control.Control})
 * @param {Number} [options.options.id] - Ability to add an identifier on the widget (advanced option)
 * @param {Boolean} [options.options.collapsed = true] - Specify if widget has to be collapsed (true) or not (false) on map loading. Default is true.
 * @param {Boolean} [options.options.panel = false] - Specify if widget has to have a panel header. Default is false.
 * @param {Boolean} [options.options.counter = false] - Specify if widget has to have a counter. Default is false.
 * @fires layerswitcher:add
 * @fires layerswitcher:remove
 * @fires layerswitcher:extent
 * @fires layerswitcher:change:opacity
 * @fires layerswitcher:change:visibility
 * @fires layerswitcher:change:position
 * @example
 * map.addControl(new ol.control.LayerSwitcher(
 *  [
 *      {
 *          layer : wms1,
 *          config : {
 *              title : "test layer name 1",
 *              description : "test layer desc 1",
 *          }
 *      }
 *  ],
 *  {
 *      collapsed : true,
 *      panel : false,
 *      counter : false,
 *      position : "top-left"
 *  }
 * ));
 *
 * LayerSwitcher.on("layerswitcher:add", function (e) {
 *    console.warn("layer", e.layer);
 * });
 * LayerSwitcher.on("layerswitcher:remove", function (e) {
 *    console.warn("layer", e.layer);
 * });
 * LayerSwitcher.on("layerswitcher:change:opacity", function (e) {
 *    console.warn("layer", e.layer, e.opacity);
 * });
 * LayerSwitcher.on("layerswitcher:change:visibility", function (e) {
 *    console.warn("layer", e.layer, e.visibility);
 * });
 * LayerSwitcher.on("layerswitcher:change:position", function (e) {
 *    console.warn("layer", e.layer, e.position);
 * });
 */
var LayerSwitcher = class LayerSwitcher extends Control {

    /**
     * See {@link ol.control.LayerSwitcher}
     * @module LayerSwitcher
     * @alias module:~controls/LayerSwitcher
     * @param {*} options - options
     * @example
     * import LayerSwitcher from "gpf-ext-ol/controls/LayerSwitcher"
     * ou
     * import { LayerSwitcher } from "gpf-ext-ol"
     */
    constructor (options) {
        options = options || {};
        var _options = options.options || {};
        var _layers = options.layers || [];

        // call ol.control.Control constructor
        super(_options);

        if (!(this instanceof LayerSwitcher)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        if (!Array.isArray(_layers)) {
            throw new Error("ERROR WRONG_TYPE : layers should be an array");
        }

        if (typeof _options !== "object") {
            throw new Error("ERROR WRONG_TYPE : options should be an object");
        }

        /**
         * Nom de la classe
         * @private
         */
        this.CLASSNAME = "LayerSwitcher";

        this._initialize(_options, _layers);

        this.container = this._initContainer(_options);

        // ajout du container
        (this.element) ? this.element.appendChild(this.container) : this.element = this.container;

        return this;
    }

    // ################################################################### //
    // ############## public methods (getters, setters) ################## //
    // ################################################################### //

    /**
     * Overload setMap function, that enables to catch map events, such as movend events.
     *
     * @param {ol.Map} map - Map.
     */
    setMap (map) {
        // info : cette méthode est appelée (entre autres?) après un map.addControl() ou map.removeControl()

        if (map) { // dans le cas de l'ajout du contrôle à la map
            // on ajoute les couches
            this._addMapLayers(map);

            // mode "collapsed"
            if (!this.collapsed) {
                this._showLayerSwitcherButton.setAttribute("aria-pressed", true);
            }

            // At every map movement, layer switcher may be updated,
            // according to layers on map, and their range.
            this._listeners.onMoveListener = map.on(
                "moveend",
                () => this._onMapMoveEnd(map)
            );

            // add event listeners when a new layer is added to map, to add it in LayerSwitcher control (and DOM)
            this._listeners.onAddListener = map.getLayers().on(
                "add",
                (evt) => {
                    var layer = evt.element;
                    var id;
                    // on attribue un nouvel identifiant à cette couche,
                    // sauf si c'est une couche qui a déjà été ajoutée dans le LayerSwitcher au préalable (si gpLayerId existe)
                    if (!layer.hasOwnProperty("gpLayerId")) {
                        id = this._layerId;
                        layer.gpLayerId = id;
                        this._layerId++;
                    } else {
                        id = layer.gpLayerId;
                    }
                    if (!this._layers[id]) {
                        this.addLayer(layer);
                    }
                }
            );

            // add event listeners when a layer is removed from map, to remove it from LayerSwitcher control (and DOM)
            this._listeners.onRemoveListener = map.getLayers().on(
                "remove",
                (evt) => {
                    var layer = evt.element;
                    var id = layer.gpLayerId;
                    if (this._layers[id]) {
                        this.removeLayer(layer);
                    }
                }
            );
        } else {
            // we are in a setMap(null) case
            // we forget the listeners linked to the layerSwitcher
            olObservableUnByKey(this._listeners.onMoveListener);
            olObservableUnByKey(this._listeners.onAddListener);
            olObservableUnByKey(this._listeners.onRemoveListener);

            // we put all the layers at Zindex = 0, without changing the visual order
            // in order that the next added layers are not hidden by layers with Zindex > 0
            for (var i = this._layersOrder.length - 1; i >= 0; i--) {
                // this._layersOrder[i].layer.setZIndex(0);
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
     * Add a new layer to control (when added to map) or add new layer configuration
     *
     * @param {ol.layer.Layer} layer - layer to add to layer switcher
     * @param {Object} [config] - additional options for layer configuration
     * @param {Object} [config.title] - layer title (default is layer identifier)
     * @param {Object} [config.description] - layer description (default is null)
     * @param {Object} [config.legends] - layer legends (default is an empty array)
     * @param {Object} [config.metadata] - layer metadata (default is an empty array)
     * @param {Object} [config.quicklookUrl] - layer quicklookUrl (default is null)
     * @fires layerswitcher:add
     * @example
     *   layerSwitcher.addLayer(
     *       gpParcels,
     *       {
     *           title : "Parcelles cadastrales",
     *           description : "description de la couche",
     *           quicklookUrl : "http://quicklookUrl.fr"
     *       }
     *   )
     */
    addLayer (layer, config) {
        var map = this.getMap();
        config = config || {};

        if (!layer) {
            logger.log("[ERROR] LayerSwitcher:addLayer - missing layer parameter");
            return;
        }

        var id = layer.gpLayerId;
        if (typeof id === "undefined") {
            logger.trace("[WARN] LayerSwitcher:addLayer - configuration cannot be set for this layer (layer id not found)", layer);
            return;
        }

        // make sure layer is in map layers
        var isLayerInMap = false;
        map.getLayers().forEach(
            (lyr) => {
                if (lyr.gpLayerId === id) {
                    isLayerInMap = true;
                }
            }
        );
        if (!isLayerInMap) {
            logger.log("[ERROR] LayerSwitcher:addLayer - configuration cannot be set for ", layer, " layer (layer is not in map.getLayers() )");
            return;
        }

        // if layer is not already in layers list, add it to control (layers list and container div)
        if (!this._layers[id]) {
            // 1. add layer to layers list
            var layerInfos = this.getLayerInfo(layer) || {};
            var opacity = layer.getOpacity();
            var visibility = layer.getVisible();
            var isInRange = this.isInRange(layer, map);
            var layerOptions = {
                layer : layer,
                id : id,
                name : layer.name, // only geoportal layers
                service : layer.service, // only geoportal layers
                opacity : opacity != null ? opacity : 1,
                visibility : visibility != null ? visibility : true,
                inRange : isInRange != null ? isInRange : true,
                title : config.title != null ? config.title : (layerInfos._title || id),
                description : config.description || layerInfos._description || null,
                legends : config.legends || layerInfos._legends || [],
                metadata : config.metadata || layerInfos._metadata || [],
                quicklookUrl : config.quicklookUrl || layerInfos._quicklookUrl || null
            };
            this._layers[id] = layerOptions;

            // 2. create layer div (to be added to control main container)
            // Création de la div correspondante à cette couche
            var layerDiv = this._createLayerDiv(layerOptions);
            // on stocke la div dans les options de la couche, pour une éventuelle réorganisation (setZIndex par ex)
            this._layers[id].div = layerDiv;

            // 3. réorganisation des couches si un zIndex est spécifié
            // FIXME :
            //  _forceNullzIndex !?
            //  getZIndex() retourne undefined au lieu de 0 !?
            if ((layer.getZIndex && layer.getZIndex() !== 0 && typeof layer.getZIndex() !== "undefined") || layer._forceNullzIndex) {
                // réorganisation des couches si un zIndex est spécifié
                this._updateLayersOrder();
            } else {
                // sinon on ajoute la couche au dessus des autres
                this._layersOrder.unshift(layerOptions);
                this._lastZIndex++;
                layer.setZIndex(this._lastZIndex);
                this._layerListContainer.insertBefore(layerDiv, this._layerListContainer.firstChild);
                // this._layerListContainer.insertBefore(layerDiv,
                //     (this.options.panel) ?
                //         this._layerListContainer.childNodes[1] : this._layerListContainer.firstChild);
            }

            // 3. Add listeners for opacity and visibility changes
            this._listeners.updateLayerOpacity = layer.on(
                "change:opacity",
                (e) => this._updateLayerOpacity(e)
            );
            this._listeners.updateLayerVisibility = layer.on(
                "change:visible",
                (e) => this._updateLayerVisibility(e)
            );

            if (this._layers[id].onZIndexChangeEvent == null) {
                this._layers[id].onZIndexChangeEvent = layer.on(
                    "change:zIndex",
                    () => this._updateLayersOrder()
                );
            }

            // user may also add a new configuration for an already added layer
        } else {
            // add new configuration parameters to layer informations
            for (var prop in config) {
                if (config.hasOwnProperty(prop)) {
                    this._layers[id][prop] = config[prop];
                }
            }
            // set new title in layer div
            if (config.title) {
                var nameDiv = document.getElementById(this._addUID("GPname_ID_" + id));
                if (nameDiv) {
                    nameDiv.innerHTML = config.title;
                    nameDiv.title = config.description || config.title;
                }
            }
            // add layer info picto if necessary
            var infodiv = document.getElementById(this._addUID("GPinfo_ID_" + id));
            if (!document.getElementById(this._addUID("GPinfo_ID_" + id)) && config.description) {
                var advancedTools = document.getElementById(this._addUID("GPadvancedTools_ID_" + id));
                if (advancedTools) {
                    advancedTools.appendChild(
                        this._createAdvancedToolInformationElement({
                            id : id
                        })
                    );
                }
            }
            // close layer info element if open, to update information.
            if (infodiv && infodiv.className === "GPlayerInfoOpened") {
                document.getElementById(this._addUID("GPlayerInfoPanel")).classList.add("GPlayerInfoPanelClosed", "gpf-hidden");
                // infodiv.className = "GPlayerInfo";
            }
        }
        // on met à jour le compteur
        this._updateLayerCounter();
        /**
         * event triggered when a layer is added
         *
         * @event layerswitcher:add
         * @property {Object} type - event
         * @property {Object} layer - layer
         * @property {Object} target - instance LayerSwitcher
         * @example
         * LayerSwitcher.on("layerswitcher:add", function (e) {
         *   console.log(e.layer);
         * })
         */
        this.dispatchEvent({
            type : "layerswitcher:add",
            layer : this._layers[id]
        });
    };

    /**
     * Remove a layer from control
     *
     * @param {ol.layer.Layer} layer - layer.
     * @fires layerswitcher:remove
     * @deprecated on the future version ...
     */
    removeLayer (layer) {
        if (!layer) {
            return;
        }

        olObservableUnByKey(this._listeners.updateLayerOpacity);
        olObservableUnByKey(this._listeners.updateLayerVisibility);
        // olObservableUnByKey(this._listeners.updateLayersOrder);

        logger.trace(layer);

        var layerID = layer.gpLayerId;
        // var layerList = document.getElementById(this._addUID("GPlayersList")).firstChild;
        // close layer info element if open.
        var infodiv = document.getElementById(this._addUID("GPinfo_ID_" + layerID));
        if (infodiv && infodiv.className === "GPlayerInfoOpened") {
            document.getElementById(this._addUID("GPlayerInfoPanel")).classList.add("GPlayerInfoPanelClosed", "gpf-hidden");
            // infodiv.className = "GPlayerInfo";
        }
        // remove layer div
        var layerDiv = document.getElementById(this._addUID("GPlayerSwitcher_ID_" + layerID));
        if (layerDiv) {
            this._layerListContainer.removeChild(layerDiv);
        }

        var layerIndex = Math.abs(layer.getZIndex() - this._lastZIndex);
        // on retire la couche de la liste ordonnée des layers
        this._layersOrder.splice(layerIndex, 1);
        this._lastZIndex--;
        // on met à jour les zindex des couches restantes
        var layerOrderTemp = this._layersOrder;
        for (var i = 0; i < layerOrderTemp.length; i++) {
            layerOrderTemp[i].layer.setZIndex(this._lastZIndex - i);
        }

        /**
         * event triggered when a layer is removed
         *
         * @event layerswitcher:add
         * @property {Object} type - event
         * @property {Object} layer - layer
         * @property {Object} target - instance LayerSwitcher
         * @example
         * LayerSwitcher.on("layerswitcher:remove", function (e) {
         *   console.log(e.layer);
         * })
         */
        this.dispatchEvent({
            type : "layerswitcher:remove",
            layer : this._layers[layerID]
        });

        // on retire la couche de la liste des layers
        delete this._layers[layerID];

        // on met à jour le compteur
        this._updateLayerCounter();
    }

    /**
     * Collapse or display control main container
     *
     * @param {Boolean} collapsed - True to collapse control, False to display it
     */
    setCollapsed (collapsed) {
        if (collapsed === undefined) {
            logger.log("[ERROR] LayerSwitcher:setCollapsed - missing collapsed parameter");
            return;
        }
        var isCollapsed = !document.getElementById(this._addUID("GPshowLayersList")).checked;
        if ((collapsed && isCollapsed) || (!collapsed && !isCollapsed)) {
            return;
        }
        // on simule l'ouverture du panneau après un click
        if (!isCollapsed) {
            // var layers = document.getElementsByClassName("GPlayerInfoOpened");
            // for (var i = 0; i < layers.length; i++) {
            //     layers[i].className = "GPlayerInfo";
            // }
            document.getElementById(this._addUID("GPlayerInfoPanel")).classList.add("GPlayerInfoPanelClosed", "gpf-hidden");
        }
        document.getElementById(this._addUID("GPshowLayersList")).checked = !collapsed;
    }

    /**
     * Returns true if widget is collapsed (minimize), false otherwise
     * @returns {Boolean} is collapsed
     */
    getCollapsed () {
        return this.collapsed;
    }

    /**
     * Display or hide removeLayerPicto from layerSwitcher for this layer
     *
     * @param {ol.layer.Layer} layer - ol.layer to be configured
     * @param {Boolean} removable - specify if layer can be remove from layerSwitcher (true) or not (false). Default is true
     */
    setRemovable (layer, removable) {
        if (!layer) {
            return;
        }
        var layerID = layer.gpLayerId;
        if (layerID == null) { // on teste si layerID est null ou undefined
            logger.log("[LayerSwitcher:setRemovable] layer should be added to map before calling setRemovable method");
            return;
        }
        var removalDiv = document.getElementById(this._addUID("GPremove_ID_" + layerID));
        if (removalDiv) {
            if (removable === false) {
                removalDiv.style.display = "none";
            } else if (removable === true) {
                removalDiv.style.display = "block";
            } else {

            }
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

    // ################################################################### //
    // ##################### init component ############################## //
    // ################################################################### //

    /**
     * Initialize LayerSwitcher control (called by constructor)
     *
     * @param {Object} options - ol.control.Control options (see {@link http://openlayers.org/en/latest/apidoc/ol.control.Control.html ol.control.Control})
     * @param {Array} layers - list of layers to be configured. Each array element is an object, with following properties :
     * @private
     */
    _initialize (options, layers) {
        // identifiant du contrôle : utile pour suffixer les identifiants CSS (pour gérer le cas où il y en a plusieurs dans la même page)
        this._uid = options.id || SelectorID.generate();

        this.options = options;
        this.options.layers = layers;

        // {Object} control layers list. Each key is a layer id, and its value is an object of layers options (layer, id, opacity, visibility, title, description...)
        this._layers = {};
        // [Array] array of ordered control layers
        this._layersOrder = [];
        // [Object] associative array of layers ordered by zindex (keys are zindex values, and corresponding values are arrays of layers at this zindex)
        this._layersIndex = {};
        // {Number} layers max z index, to order layers using their z index
        this._lastZIndex = 0;
        // {Number} layers max id, incremented when a new layer is added
        this._layerId = 0;
        /** {Boolean} true if widget is collapsed, false otherwise */
        this.collapsed = (options.collapsed !== undefined) ? options.collapsed : true;
        // div qui contiendra les div des listes.
        this._layerListContainer = null;
        // [Object] listeners added to the layerSwitcher saved here in order to delete them if we remove the control from the map)
        this._listeners = {};

        // add options layers to layerlist.
        // (seulement les couches configurées dans les options du layerSwitcher par l'utilisateur),
        // les autres couches de la carte seront ajoutées dans la méthode setMap
        for (var i = 0; i < layers.length; i++) {
            // recup la layer, son id,
            var layer = layers[i].layer;
            if (layer) {
                var id;
                // si elles ont déjà un identifiant (gpLayerId), on le récupère, sinon on en crée un nouveau, en incrémentant this_layerId.
                if (!layer.hasOwnProperty("gpLayerId")) {
                    id = this._layerId;
                    layer.gpLayerId = id;
                    this._layerId++;
                } else {
                    id = layer.gpLayerId;
                }

                // et les infos de la conf si elles existent (title, description, legends, quicklook, metadata)
                var conf = layers[i].config || {};
                var opacity = layer.getOpacity();
                var visibility = layer.getVisible();
                var layerOptions = {
                    layer : layer, // la couche ol.layer concernée
                    id : id,
                    name : layer.name, // only geoportal layers
                    service : layer.service, // only geoportal layers
                    opacity : opacity != null ? opacity : 1,
                    visibility : visibility != null ? visibility : true,
                    title : conf.title != null ? conf.title : conf.id ? conf.id : id,
                    description : conf.description || null,
                    legends : conf.legends || [],
                    metadata : conf.metadata || [],
                    quicklookUrl : conf.quicklookUrl || null
                };
                this._layers[id] = layerOptions;
            }
        }
    }

    /**
     * Create control main container (called by constructor)
     *
     * @returns {DOMElement} container - control container
     * @private
     */
    _initContainer () {
        // creation du container principal
        var container = this._createMainContainerElement();

        // ajout dans le container principal d'affichage des layers
        var input = this._createMainLayersShowElement();
        container.appendChild(input);

        // gestion du mode "collapsed"
        if (!this.collapsed) {
            input.checked = "checked";
            this.collapsed = false;
        } else {
            this.collapsed = true;
        }

        // on ajoute un écouteur d'évènement sur le bouton (checkbox) de dépliement/repliement des couches,
        // pour modifier la propriété this.collapsed quand on clique dessus
        var context = this;
        // event listener
        var changeCollapsed = function (e) {
            this.collapsed = !e.target.checked;
            // on génère nous même l'evenement OpenLayers de changement de pté
            // (utiliser layerSwitcher.on("change:collapsed", function ) pour s'abonner à cet évènement)
            this.dispatchEvent("change:collapsed");
        };
        input.addEventListener(
            "click",
            function (e) {
                changeCollapsed.call(context, e);
            }
        );

        // ajout dans le container principal du picto du controle
        var picto = this._showLayerSwitcherButton = this._createMainPictoElement();
        container.appendChild(picto);

        // ajout du compteur de couches
        container.classList.add("GplayerSwitcher-counterRemoved");
        if (this.options.counter) {
            container.classList.remove("GplayerSwitcher-counterRemoved");
            container.classList.add("GplayerSwitcher-counterAdded");
            var counter = this._layerSwitcherCounter =  this._createMainCounterLayersElement();
            picto.appendChild(counter);
        }

        // ajout dans le container principal de la liste des layers
        var divL = this._createMainLayersElement();
        container.appendChild(divL);

        // header ?
        if (this.options.panel) {
            // header
            var panelHeader = this._createLayersPanelHeaderElement();
            divL.appendChild(panelHeader);
            // icon
            var panelIcon = this._createLayersPanelIconElement();
            panelHeader.appendChild(panelIcon);
            // title
            var panelTitle = this._createLayersPanelTitleElement();
            panelHeader.appendChild(panelTitle);
            // close picto
            var panelClose = this._createLayersPanelCloseElement();
            panelHeader.appendChild(panelClose);
        }

        var div = this._layerListContainer = this._createMainLayersDivElement();
        divL.appendChild(div);

        // creation du mode draggable
        this._createDraggableElement(div, this);

        // ajout dans le container principal du panneau d'information
        var divI = this._createMainInfoElement();
        var divD = this._createMainInfoDivElement();
        divI.appendChild(divD);
        container.appendChild(divI);

        return container;
    }

    /**
     * Add all map layers to control main container
     *
     * @param {Object} map - ol.Map object, to which control is added
     * @private
     */
    _addMapLayers (map) {
        this._layersIndex = {};

        // on parcourt toutes les couches de la carte, pour les ajouter à la liste du controle si ce n'est pas déjà le cas.
        // idée : le layerSwitcher doit représenter l'ensemble des couches de la carte.
        map.getLayers().forEach((layer) => {
            // ajout des couches de la carte à la liste
            var id = null;
            // si elles ont déjà un identifiant (gpLayerId), on le récupère, sinon on en crée un nouveau, en incrémentant this_layerId.
            if (!layer.hasOwnProperty("gpLayerId")) {
                id = this._layerId;
                layer.gpLayerId = id;
                this._layerId++;
            } else {
                id = layer.gpLayerId;
            }

            var layerInfos = this.getLayerInfo(layer) || {};
            if (!this._layers[id]) {
                // si la couche n'est pas encore dans la liste des layers (this._layers), on l'ajoute
                var opacity = layer.getOpacity();
                var visibility = layer.getVisible();
                var isInRange = this.isInRange(layer, map);
                var layerOptions = {
                    layer : layer,
                    id : id,
                    name : layer.name, // only geoportal layers
                    service : layer.service, // only geoportal layers
                    opacity : opacity != null ? opacity : 1,
                    visibility : visibility != null ? visibility : true,
                    inRange : isInRange != null ? isInRange : true,
                    title : layerInfos._title || id,
                    description : layerInfos._description || null,
                    legends : layerInfos._legends || [],
                    metadata : layerInfos._metadata || [],
                    quicklookUrl : layerInfos._quicklookUrl || null
                };
                this._layers[id] = layerOptions;
            } else {
                // si elle existe déjà, on met à jour ses informations (visibility, opacity, inRange)
                this._layers[id].opacity = layer.getOpacity();
                this._layers[id].visibility = layer.getVisible();
                this._layers[id].inRange = this.isInRange(layer, map);
            }
            // on met à jour le compteur
            this._updateLayerCounter();

            // Ajout de listeners sur les changements d'opacité, visibilité
            this._listeners.updateLayerOpacity = layer.on(
                "change:opacity",
                (e) => this._updateLayerOpacity(e)
            );
            this._listeners._updateLayerVisibility = layer.on(
                "change:visible",
                (e) => this._updateLayerVisibility(e)
            );

            // récupération des zindex des couches s'ils existent, pour les ordonner.
            if (layer.getZIndex !== undefined) {
                var layerIndex = layer.getZIndex() || 0; // FIXME le zIndex peut être undefined !? donc par defaut à 0 !
                if (!this._layersIndex[layerIndex] || !Array.isArray(this._layersIndex[layerIndex])) {
                    this._layersIndex[layerIndex] = [];
                }
                this._layersIndex[layerIndex].push(this._layers[id]);
            };
        });

        // on récupère l'ordre d'affichage des couches entre elles dans la carte, à partir de zindex.
        for (var zindex in this._layersIndex) {
            if (this._layersIndex.hasOwnProperty(zindex)) {
                var layers = this._layersIndex[zindex];
                for (var l = 0; l < layers.length; l++) { // à ce stade layers[l] est une couche de this._layers.
                    // on conserve l'ordre des couches : la première est celle qui se situe tout en haut, et la dernière est le "fond de carte"
                    this._layersOrder.unshift(layers[l]);
                    // et on réordonne les couches avec des zindex, uniques.
                    this._lastZIndex++;
                    layers[l].layer.setZIndex(this._lastZIndex);
                    if (this._layers[layers[l].layer.gpLayerId].onZIndexChangeEvent == null) {
                        this._layers[layers[l].layer.gpLayerId].onZIndexChangeEvent = layers[l].layer.on(
                            "change:zIndex",
                            () => this._updateLayersOrder()
                        );
                    }
                }
            }
        }

        // on ajoute les div correspondantes aux différentes couches (dans l'ordre inverse d'affichage) dans le controle.
        for (var j = 0; j < this._layersOrder.length; j++) {
            var layerOptions = this._layersOrder[j];
            var layerDiv = this._createLayerDiv(layerOptions);
            if (!this._layerListContainer.querySelector("#" + layerDiv.id)) {
                this._layerListContainer.appendChild(layerDiv);
            }
            // on stocke la div dans les options de la couche, pour une éventuelle réorganisation (setZIndex par ex)
            this._layers[layerOptions.id].div = layerDiv;
        }
    }

    /**
     * create layer div (to append to control DOM element).
     *
     * @param {Object} layerOptions - layer options (id, title, description, legends, metadata, quicklookUrl ...)
     *
     * @returns {DOMElement} DOM element
     *
     * @private
     */
    _createLayerDiv (layerOptions) {
        var isLegends = layerOptions.legends && layerOptions.legends.length !== 0;
        var isMetadata = layerOptions.metadata && layerOptions.metadata.length !== 0;
        var isQuicklookUrl = layerOptions.quicklookUrl;
        // on n'affiche les informations que si elles sont renseignées (pour ne pas avoir un panneau vide)
        if (isLegends || isMetadata || isQuicklookUrl) {
            layerOptions.displayInformationElement = true;
        }

        // ajout d'une div pour cette layer dans le control
        var layerDiv = this._createContainerLayerElement(layerOptions);

        if (!layerOptions.inRange) {
            layerDiv.classList.add("outOfRange");
        }

        return layerDiv;
    }

    // ################################################################### //
    // ######################### DOM events ############################## //
    // ################################################################### //

    /**
     * ...
     *
     * @method onShowLayerSwitcherClick
     * @param { event } e évènement associé au clic
     * @private
     */
    onShowLayerSwitcherClick (e) {
        if (e.target.ariaPressed === "true") {
            this.onPanelOpen();
        }
        var opened = this._showLayerSwitcherButton.ariaPressed;
        this.collapsed = !(opened === "true");// on génère nous même l'evenement OpenLayers de changement de propriété
        // (utiliser mousePosition.on("change:collapsed", function(e) ) pour s'abonner à cet évènement)
        this.dispatchEvent("change:collapsed");
        // on recalcule la position
        if (this.options.position && !this.collapsed) {
            this.updatePosition(this.options.position);
        }
    }

    /**
     * update layer counter
     */
    _updateLayerCounter () {
        if (this._layerSwitcherCounter) {
            this._layerSwitcherCounter.innerHTML = Object.keys(this._layers).length;
        }
    }

    /**
     * Change layer opacity on layer opacity picto click
     *
     * @param {Object} e - event
     * @private
     */
    _onChangeLayerOpacity (e) {
        e.target.parentNode.style.setProperty("--progress-right", e.target.value + "%");
        var divId = e.target.id; // ex GPvisibilityPicto_ID_26
        var layerID = SelectorID.index(divId); // ex. 26
        var layer = this._layers[layerID].layer;

        var opacityValue = e.target.value;
        var opacityId = document.getElementById(this._addUID("GPopacityValue_ID_" + layerID));
        opacityId.innerHTML = opacityValue + "%";

        layer.setOpacity(opacityValue / 100);
    }

    /**
     * Update picto opacity value on layer opacity change
     *
     * @param {Object} e - event
     * @fires layerswitcher:change:opacity
     * @private
     */
    _updateLayerOpacity (e) {
        var opacity = e.target.getOpacity();
        if (opacity > 1) {
            opacity = 1;
        }
        if (opacity < 0) {
            opacity = 0;
        }
        var id = e.target.gpLayerId;

        var layerOpacityInput = document.getElementById(this._addUID("GPopacityValueDiv_ID_" + id));
        if (layerOpacityInput) {
            layerOpacityInput.value = Math.round(opacity * 100);
        }

        var layerOpacitySpan = document.getElementById(this._addUID("GPopacityValue_ID_" + id));
        if (layerOpacitySpan) {
            layerOpacitySpan.innerHTML = Math.round(opacity * 100) + "%";
        }

        /**
         * event triggered when an opacity layer is changed
         *
         * @event layerswitcher:change:opacity
         * @property {Object} type - event
         * @property {Object} opacity - opacity
         * @property {Object} layer - layer
         * @property {Object} target - instance LayerSwitcher
         * @example
         * LayerSwitcher.on("layerswitcher:change", function (e) {
         *   console.log(e.opacity);
         * })
         */
        this.dispatchEvent({
            type : "layerswitcher:change:opacity",
            opacity : opacity,
            layer : this._layers[id]
        });
    }

    /**
     * Change layer visibility on layer visibility picto click
     *
     * @param {Object} e - event
     * @private
     */
    _onVisibilityLayerClick (e) {
        var divId = e.target.id; // ex GPvisibilityPicto_ID_26
        var layerID = SelectorID.index(divId); // ex. 26
        var layer = this._layers[layerID].layer;
        layer.setVisible((e.target.ariaPressed === "true"));
    }

    /**
     * Change picto visibility on layer visibility change
     *
     * @param {Object} e - event
     * @fires layerswitcher:change:visibility
     * @private
     */
    _updateLayerVisibility (e) {
        var visible = e.target.getVisible();
        var id = e.target.gpLayerId;
        var layerVisibility = document.getElementById(this._addUID("GPvisibilityPicto_ID_" + id));
        if (layerVisibility) {
            layerVisibility.ariaPressed = visible;
        }

        /**
         * event triggered when an visibility layer is changed
         *
         * @event layerswitcher:change:visibility
         * @property {Object} type - event
         * @property {Object} visibility - visibility
         * @property {Object} layer - layer
         * @property {Object} target - instance LayerSwitcher
         * @example
         * LayerSwitcher.on("layerswitcher:change:visibility", function (e) {
         *   console.log(e.visibility);
         * })
         */
        this.dispatchEvent({
            type : "layerswitcher:change:visibility",
            visibility : visible,
            layer : this._layers[id]
        });
    }

    /**
     * Change layers order in layerswitcher (control container) on a layer index change (on map) or when a layer is added to a specific zindex
     * @todo fires layerswitcher:change:zindex
     * @private
     */
    _updateLayersOrder () {
        // info :
        // 1. on récupère les zindex et les couches associées dans un tableau associatif (objet)
        // 2. on réordonne les couche selon leur index : on leur attribue de nouveaux zindex uniques
        // 3. on vide le container des layers, et rajoute les div des couches dans l'ordre décroissant des zindex

        var map = this.getMap();
        if (!map) {
            return;
        }
        this._layersIndex = {};
        var layerIndex;
        var id;

        // on parcourt toutes les couches pour récupérer leur ordre :
        // on stocke les couches dans un tableau associatif ou les clés sont les zindex, et les valeurs sont des tableaux des couches à ce zindex.
        map.getLayers().forEach(
            (layer) => {
                id = layer.gpLayerId;

                // on commence par désactiver temporairement l'écouteur d'événements sur le changement de zindex.
                olObservableUnByKey(this._layers[id].onZIndexChangeEvent);
                this._layers[id].onZIndexChangeEvent = null;

                // on ajoute la couche dans le tableau (de l'objet this._layersIndex) correspondant à son zindex
                layerIndex = null;
                if (layer.getZIndex !== undefined) {
                    layerIndex = layer.getZIndex();
                    if (!this._layersIndex[layerIndex] || !Array.isArray(this._layersIndex[layerIndex])) {
                        this._layersIndex[layerIndex] = [];
                    }
                    this._layersIndex[layerIndex].push(this._layers[id]);
                };
            }
        );

        // on réordonne les couches entre elles dans la carte, à partir des zindex stockés ci-dessus.
        this._lastZIndex = 0;
        this._layersOrder = [];
        for (var zindex in this._layersIndex) {
            if (this._layersIndex.hasOwnProperty(zindex)) {
                var layers = this._layersIndex[zindex];
                for (var l = 0; l < layers.length; l++) { // à ce stade layers[l] est une couche de this._layers.
                    // on conserve l'ordre des couches : la première est celle qui se situe tout en haut, et la dernière est le "fond de carte"
                    this._layersOrder.unshift(layers[l]);
                    // et on réordonne les couches avec des zindex, uniques.
                    this._lastZIndex++;
                    // layers[l].layer.setZIndex(lastZIndex);
                    // et on réactive l'écouteur d'événement sur les zindex
                    if (this._layers[layers[l].layer.gpLayerId].onZIndexChangeEvent == null) {
                        this._layers[layers[l].layer.gpLayerId].onZIndexChangeEvent = layers[l].layer.on(
                            "change:zIndex",
                            () => this._updateLayersOrder()
                        );
                    }
                }
            }
        }

        if (this._layerListContainer) {
            // on vide le container précédent
            for (let index = 0; index < this._layerListContainer.childNodes.length; index++) {
                const element = this._layerListContainer.childNodes[index];
                if (element.id === "") {
                    continue;
                }
                element.remove();
            }
            // et on rajoute les div correspondantes aux différentes couches, dans l'ordre décroissant des zindex
            for (var j = 0; j < this._layersOrder.length; j++) {
                var layerOptions = this._layersOrder[j];
                this._layerListContainer.appendChild(layerOptions.div);
            }
        } else {
            logger.log("[ol.control.LayerSwitcher] _updateLayersOrder : layer list container not found to update layers order ?!");
        }
    }

    /**
     * Open layer information panel on picto click
     *
     * @param {Event} e - MouseEvent
     * @private
     */
    _onOpenLayerInfoClick (e) {
        var id = e.target.id; // ex GPvisibilityPicto_ID_26
        var layerID = SelectorID.index(id); // ex. 26
        var layerOptions = this._layers[layerID];

        var panel;
        var info;

        // Close layer info panel
        var divId = document.getElementById(e.target.id);
        if (divId.classList.contains("GPlayerInfoOpened")) {
            divId.classList.remove("GPlayerInfoOpened");
            divId.classList.add("GPlayerInfoClosed");

            panel = document.getElementById(this._addUID("GPlayerInfoPanel"));
            panel.classList.remove("GPlayerInfoPanelOpened", "gpf-visible");
            panel.classList.add("GPlayerInfoPanelClosed", "gpf-hidden");

            info = document.getElementById(this._addUID("GPlayerInfoContent"));
            if (info) {
                info.parentNode.remove();
            }
            return;
        }

        // Open layer info panel
        if (divId.classList.contains("GPlayerInfoClosed")) {
            divId.classList.remove("GPlayerInfoClosed");
            divId.classList.add("GPlayerInfoOpened");
        }

        panel = document.getElementById(this._addUID("GPlayerInfoPanel"));
        panel.classList.remove("GPlayerInfoPanelClosed", "gpf-hidden");
        panel.classList.add("GPlayerInfoPanelOpened", "gpf-visible");

        info = document.getElementById(this._addUID("GPlayerInfoContent"));
        if (info) {
            info.parentNode.remove();
        }

        // on récupère les infos associées au layer pour mettre dynamiquement le contenu du panel d'informations
        var obj = {
            id : id,
            title : layerOptions.title,
            description : layerOptions.description,
            quicklookUrl : layerOptions.quicklookUrl,
            metadata : layerOptions.metadata,
            legends : layerOptions.legends
        };
        // get layer max scale denominator
        var maxResolution = layerOptions.layer.getMaxResolution();
        if (maxResolution === Infinity) {
            obj._maxScaleDenominator = 560000000;
        } else {
            obj._maxScaleDenominator = Math.round(maxResolution / 0.00028);
        }
        var infoLayer = this._createContainerLayerInfoElement(obj);
        panel.firstChild.appendChild(infoLayer);
    }

    /**
     * remove layer from layer switcher and map on picto click
     *
     * @param {Event} e - MouseEvent
     * @private
     */
    _onDropLayerClick (e) {
        var divId = e.target.id; // ex GPvisibilityPicto_ID_26
        var layerID = SelectorID.index(divId); // ex. 26
        var layer = this._layers[layerID].layer;

        // le retrait de la couche va déclencher l'ecouteur d'évenement,
        // et appeler this.removeLayer qui va supprimer la div.
        this.getMap().getLayers().remove(layer);
    }

    /**
     * change layers order (on map) on drag and drop (on control container)
     *
     * @param {Event} e - CustomEvent
     * @private
     */
    _onEndDragAndDropLayerClick (e) {
        logger.trace(e);
        // INFO : e.oldIndex et e.newIndex marchent en mode AMD mais pas Bundle.
        var map = this.getMap();

        // on récupère l'ordre des div dans le contrôle pour réordonner les couches (avec zindex)
        var matchesLayers = document.querySelectorAll("div.GPlayerSwitcher_layer");
        var maxZIndex = matchesLayers.length;
        // on vide la liste ordonnée avant de la remplir avec l'ordre des couches selon les div.
        this._layersOrder = [];
        for (var i = 0; i < matchesLayers.length; i++) {
            var tag = matchesLayers[i].id;
            var id = SelectorID.index(tag);
            var layer = this._layers[id].layer;

            // on commence par désactiver temporairement l'écouteur d'événements sur le changement de zindex.
            olObservableUnByKey(this._layers[id].onZIndexChangeEvent);
            this._layers[id].onZIndexChangeEvent = null;

            if (layer.setZIndex) {
                // maxZIndex--;
                layer.setZIndex(maxZIndex);
                this._layersOrder.push(this._layers[id]);
                maxZIndex--;
            }

            // et on réactive l'écouteur d'événement sur les zindex
            if (this._layers[id].onZIndexChangeEvent == null) {
                this._layers[id].onZIndexChangeEvent = layer.on(
                    "change:zIndex",
                    () => this._updateLayersOrder()
                );
            }
        }

        // mise à jour de la visu
        map.updateSize();

        /**
         * event triggered when an position layer is changed
         *
         * @event layerswitcher:change:visibility
         * @property {Object} type - event
         * @property {Object} position - position
         * @property {Object} layer - layer
         * @property {Object} layers - layers sorted
         * @property {Object} target - instance LayerSwitcher
         * @example
         * LayerSwitcher.on("layerswitcher:change:position", function (e) {
         *   console.log(e.position);
         * })
         */
        this.dispatchEvent({
            type : "layerswitcher:change:position",
            position : e.newIndex,
            layer : this._layersOrder[e.newIndex],
            layers : this._layersOrder
        });
    }

    /**
     * change layers order (on map) on drag and drop (on control container)
     *
     * @param {Event} e - DragNDrop Event
     * @private
     */
    _onStartDragAndDropLayerClick (e) {
        logger.debug(e);
    }

    /**
     * zoom to extent
     * @fixme dot it for other user data
     * @param {PointerEvent} e - Event
     */
    _onZoomToExtentClick (e) {
        logger.debug(e);

        // FIXME
        // le zoom to extent fonctionne par defaut pour les couches raster TMS/WMS/WMTS issues du catalogue
        // et pour les données utilisateurs de type vecteur
        // mais doit aussi le faire pour les données utilisateurs du type :
        // * raster par moissonnage (imports)
        // * style mapbox (imports)

        var domIDShort = e.target.id; // ex GPvisibilityPicto_ID_26
        var domIDLong = SelectorID.index(domIDShort); // ex. 26
        var data = this._layers[domIDLong];

        var extent = null;
        var error = null;

        var map = this.getMap();
        // cas d'un layer vecteur 
        // - importé, 
        // - d'un croquis, 
        // - d'une couche de calcul
        // - enregistré sur l'espace personnel
        if (data.layer.hasOwnProperty("gpResultLayerId") && 
            (data.layer.gpResultLayerId.split(":")[0] === "layerimport" || 
            data.layer.gpResultLayerId.split(":")[0] === "drawing" || 
            data.layer.gpResultLayerId.split(":")[0] === "compute" ||
            data.layer.gpResultLayerId.split(":")[0] === "bookmark"
            )) {
            // TODO : appeler fonc  tion commune
            // zoom sur l'étendue des entités récupérées (si possible)
            if (map.getView() && map.getSize()) {
                var sourceExtent = data.layer.getExtent();
                if (!sourceExtent) {
                    var source = data.layer.getSource();
                    if (source && source.getExtent) {
                        sourceExtent = source.getExtent();
                    } else {
                        sourceExtent = source.getTileGrid().getExtent();
                    }
                }
                if (sourceExtent && sourceExtent[0] !== Infinity) {
                    map.getView().fit(sourceExtent, map.getSize());
                }
            }
        } else {
            try {   
                // Check if configuration is loaded
                if (!Config.isConfigLoaded()) {
                    throw "ERROR : contract key configuration has to be loaded to load Geoportal layers.";
                }

                var layerName = data.layer.name || data.layer.getSource().name;
                var layerService = data.layer.service || data.layer.getSource().service;
                var layerId = Config.configuration.getLayerId(layerName, layerService);
                if (!layerId) {
                    throw "ERROR : Layer ID not found into the catalogue !?";
                }

                var globalConstraints = Config.configuration.getGlobalConstraints(layerId);
                if (globalConstraints) {
                    if (!map || !map.getView()) {
                        return;
                    }
                    var view = map.getView();
                    var crsTarget = view.getProjection();

                    // récupération de l'étendue (en EPSG:4326 par défaut),
                    // et reprojection dans la projection de la couche
                    var bbox = [
                        globalConstraints.extent.left,
                        globalConstraints.extent.bottom,
                        globalConstraints.extent.right,
                        globalConstraints.extent.top
                    ];
                    var crsSource = globalConstraints.crs;
                    // projection par defaut
                    if (!crsSource) {
                        crsSource = "EPSG:4326";
                    }

                    extent = olTransformExtentProj(bbox, crsSource, crsTarget);
                    if (extent) {
                        view.fit(extent);
                    }
                }
            } catch (e) {
                error = e;
            }
        }

        /**
         * event triggered when an zoom extent is done
         *
         * @event layerswitcher:zoom
         * @property {Object} type - event
         * @property {Object} extent - extent (map projection)
         * @property {Object} layer - layer
         * @property {String} error - error
         * @property {Object} target - instance LayerSwitcher
         * @example
         * LayerSwitcher.on("layerswitcher:extent", function (e) {
         *   console.log(e.extent);
         * })
         */
        this.dispatchEvent({
            type : "layerswitcher:extent",
            extent : extent,
            layer : data,
            error : error
        });
    }

    /**
     * check layers range on map movement
     *
     * @param {ol.Map} map - ol map on which event occured
     * @private
     */
    _onMapMoveEnd (map) {
        // pour chaque couche de la map, on vérifie qu'elle soit toujours dans la visu (inRange)
        map.getLayers().forEach(
            (layer) => {
                var id = layer.gpLayerId;
                if (this._layers[id]) {
                    var layerOptions = this._layers[id];

                    // Check if layer is out of range.
                    var layerDiv;
                    if (this.isInRange(layer, map) && !layerOptions.inRange) {
                        layerOptions.inRange = true;
                        layerDiv = document.getElementById(this._addUID("GPlayerSwitcher_ID_" + id));
                        layerDiv.classList.remove("outOfRange");
                    } else if (!this.isInRange(layer, map) && layerOptions.inRange) {
                        layerOptions.inRange = false;
                        layerDiv = document.getElementById(this._addUID("GPlayerSwitcher_ID_" + id));
                        layerDiv.classList.add("outOfRange");
                    }
                }
            }
        );
    }

    // ################################################################### //
    // ############################ Utils ################################ //
    // ################################################################### //

    /**
     * Returns Layer Container Id associated with given olLayer
     *
     * @param {ol.layer.Layer} olLayer - ol layer object
     * @returns {String} - div container Id ; null if layer not found.
     */
    getLayerDOMId (olLayer) {
        var foundId = null;

        this.getMap().getLayers().forEach((layer) => {
            if (layer === olLayer) {
                foundId = layer.hasOwnProperty("gpLayerId") ? layer.gpLayerId : null;
            }
        });

        // TODO : recuperer "GPlayerSwitcher_ID" depuis une constante
        return foundId !== null ? this._addUID("GPlayerSwitcher_ID_" + foundId) : null;
    }

    /**
     * Check if map view is out of layer range (in terms of extent and zoom)
     *
     * @param {Object} layer - the ol.layer object
     * @param {Object} map   - the ol.Map object
     * @returns {Boolean} outOfRange - false if map view is out of layer range
     */
    isInRange (layer, map) {
        if (!map) {
            return;
        }
        // check if map zoom is in layer zoom range
        var mapResolution = map.getView().getResolution();
        if (mapResolution > layer.getMaxResolution() || mapResolution < layer.getMinResolution()) {
            return false;
        }

        // check if map extent intersects layer extent (if defined)
        var mapExtent = map.getView().calculateExtent(map.getSize());
        var layerExtent = layer.getExtent();
        if (layerExtent && !olIntersects(mapExtent, layerExtent)) {
            return false;
        }

        return true;
    }

    /**
     * Get layer informations : title, description, quicklookurl, legends, metadata
     *
     * @param {Object} layer - the ol.layer object
     * @returns {Object} layerInfo - layer informations
     */
    getLayerInfo (layer) {
        var layerInfo = {};
        if (layer.getProperties !== undefined && layer.getSource !== undefined) {
            var layerProperties = layer.getProperties();
            var src = layerProperties.source;
            if (src) {
                layerInfo._title = src._title || layerProperties.title || layerProperties.id || "";
                layerInfo._description = src._description || layerProperties.description || "";
                layerInfo._quicklookUrl = src._quicklookUrl || layerProperties.quicklookUrl || "";
                layerInfo._metadata = src._metadata || layerProperties.metadata || [];
                layerInfo._legends = src._legends || layerProperties.legends || [];
            }
        }
        return layerInfo;
    }

};

// on récupère les méthodes de la classe commune LayerSwitcherDOM
Object.assign(LayerSwitcher.prototype, LayerSwitcherDOM);
Object.assign(LayerSwitcher.prototype, Widget);

export default LayerSwitcher;

// Expose LayerSwitcher as ol.control.LayerSwitcher (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.LayerSwitcher = LayerSwitcher;
}
