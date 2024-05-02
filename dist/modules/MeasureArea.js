/*!
 * @brief geoportal-extensions-openlayers
 *
 * This software is released under the licence CeCILL-B (Free BSD compatible)
 * @see http://www.cecill.info/licences/Licence_CeCILL-B_V1-en.txt
 * @see http://www.cecill.info/licences/Licence_CeCILL-B_V1-fr.txt
 * @see http://www.cecill.info/
 *
 * @copyright copyright (c) IGN 
 * @license CeCILL-B
 * @author IGN
 * @version 3.0.0
 * @date 01/02/2024
 *
 */

/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/packages/Controls/Control.js":
/*!******************************************!*\
  !*** ./src/packages/Controls/Control.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ol_control_Control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/control/Control */ "ol/control/Control");
/* harmony import */ var ol_control_Control__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ol_control_Control__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ControlExtended = /*#__PURE__*/function (_Control) {
  function ControlExtended(options) {
    _classCallCheck(this, ControlExtended);
    return _callSuper(this, ControlExtended, [options]);
  }
  _inherits(ControlExtended, _Control);
  return _createClass(ControlExtended, [{
    key: "setPosition",
    value: function setPosition(pos) {
      var instance = new PositionFactory(this);
      instance.set(pos);
    }
  }]);
}((ol_control_Control__WEBPACK_IMPORTED_MODULE_0___default()));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ControlExtended);

/**
 * gestion des anchors
 */
var ANCHORS = ["top-left", "top-right", "bottom-left", "bottom-right"];

/**
 * Position
 * @private
 * @todo revoir les css des widgets car les panneaux sont en position:absolute
 */
var _PositionFactory_brand = /*#__PURE__*/new WeakSet();
var PositionFactory = /*#__PURE__*/function () {
  /**
   * constructor
   * @param {*} caller - ...
   */
  function PositionFactory(caller) {
    _classCallCheck(this, PositionFactory);
    /**
     * ...
     * @param {*} name  - ...
     * @returns {Boolean} ...
     */
    _classPrivateMethodInitSpec(this, _PositionFactory_brand);
    this.caller = caller;
    _assertClassBrand(_PositionFactory_brand, this, _createContainer).call(this, "top-left");
    _assertClassBrand(_PositionFactory_brand, this, _createContainer).call(this, "top-right");
    _assertClassBrand(_PositionFactory_brand, this, _createContainer).call(this, "bottom-left");
    _assertClassBrand(_PositionFactory_brand, this, _createContainer).call(this, "bottom-right");
    return this;
  }
  return _createClass(PositionFactory, [{
    key: "set",
    value:
    /**
     * ...
     * @param {*} pos - ...
     * @public
     */
    function set(pos) {
      if (!ANCHORS.includes(pos.toLowerCase())) {
        return;
      }
      // positionnement de l'element
      _assertClassBrand(_PositionFactory_brand, this, _setAnchor).call(this, pos);
      document.getElementById("position-container-" + pos).appendChild(this.caller.element);
    }
  }]);
}();
function _existContainer(name) {
  var div = document.getElementById("position-container-" + name);
  if (div) {
    return true;
  }
  return false;
}
/**
 * ...
 * @param {*} name - ...
 * @private
 */
function _createContainer(name) {
  if (_assertClassBrand(_PositionFactory_brand, this, _existContainer).call(this, name)) {
    return;
  }
  // INFO
  // positionner les classes position-container-[left|right|top|bottom]
  // ex. { position:relative; height:50px; width:100%; }
  var div = document.createElement("div");
  div.id = "position-container-" + name;
  div.className = "position-container-" + name;
  var container = this.caller.getMap().getOverlayContainerStopEvent();
  container.appendChild(div);
}
/**
 * ...
 * @param {*} pos - ...
 * @todo
 */
function _setAnchor(pos) {
  var sizeW = function sizeW(pos) {
    var element = document.getElementById("position-container-" + pos);
    var width = element.offsetWidth;
    return width;
  };
  var sizeH = function sizeH(pos) {
    var element = document.getElementById("position-container-" + pos);
    var height = element.offsetHeight;
    return height;
  };
  var clear = function clear(element) {
    element.style.top = "unset";
    element.style.bottom = "unset";
    element.style.left = "unset";
    element.style.right = "unset";
  };

  // on supprime le style de positionnement (top, left...) 
  // car on souhaite une nouvelle position
  clear(this.caller.element);
  this.caller.element.style.position = "unset"; // div.GPwidget

  // on recherche les panneaux (panel) :
  // * panel de formulaire
  // * panel de resultats
  var panels = Array.from(this.caller.element.getElementsByClassName("GPpanel"));
  if (panels.length === 0) {
    return;
  }
  panels.forEach(function (e) {
    clear(e);
  });
  var panel = panels[0];
  // on modifie le positionnement du menu (dialog ou div : panel) 
  // en fonction du bouton
  // ex. bouton : bottom-left, menu : bottom:0px; left:50px
  switch (pos.toLowerCase()) {
    case "top-left":
      panel.style.top = "0px";
      panel.style.left = sizeW(pos) + "px"; // container 50px + padding de 5px
      break;
    case "bottom-left":
      panel.style.bottom = "0px";
      panel.style.left = sizeW(pos) + "px";
      break;
    case "top-right":
      panel.style.top = "0px";
      panel.style.right = sizeW(pos) + "px";
      break;
    case "bottom-right":
      panel.style.bottom = "0px";
      panel.style.right = sizeW(pos) + "px";
      break;
    default:
      break;
  }
}
;

/***/ }),

/***/ "./src/packages/Controls/LayerSwitcher/LayerSwitcher.js":
/*!**************************************************************!*\
  !*** ./src/packages/Controls/LayerSwitcher/LayerSwitcher.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CSS_Controls_LayerSwitcher_GPFlayerSwitcher_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../CSS/Controls/LayerSwitcher/GPFlayerSwitcher.css */ "./src/packages/CSS/Controls/LayerSwitcher/GPFlayerSwitcher.css");
/* harmony import */ var _Control__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Control */ "./src/packages/Controls/Control.js");
/* harmony import */ var ol_Observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/Observable */ "ol/Observable");
/* harmony import */ var ol_Observable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ol_Observable__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ol_extent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/extent */ "ol/extent");
/* harmony import */ var ol_extent__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ol_extent__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Utils_SelectorID__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Utils/SelectorID */ "./src/packages/Utils/SelectorID.js");
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Utils/LoggerByDefault */ "./src/packages/Utils/LoggerByDefault.js");
/* harmony import */ var _LayerSwitcherDOM__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./LayerSwitcherDOM */ "./src/packages/Controls/LayerSwitcher/LayerSwitcherDOM.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
// import CSS

// import "../../CSS/Controls/LayerSwitcher/GPFlayerSwitcherStyle.css";
// import OpenLayers
// import Control from "ol/control/Control";



// import local


// DOM

var logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_5__["default"].getLogger("layerswitcher");

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
 * @param {Boolean} [options.options.collapsed = true] - Specify if widget has to be collapsed (true) or not (false) on map loading. Default is true.
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
 *      collapsed : true
 *  }
 * ));
 */
var LayerSwitcher = /*#__PURE__*/function (_Control) {
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
  function LayerSwitcher(options) {
    var _this;
    _classCallCheck(this, LayerSwitcher);
    options = options || {};
    var _options = options.options || {};
    var _layers = options.layers || [];

    // call ol.control.Control constructor
    _this = _callSuper(this, LayerSwitcher, [{
      element: _options.element,
      target: _options.target,
      render: _options.render
    }]);
    if (!(_this instanceof LayerSwitcher)) {
      throw new TypeError("ERROR CLASS_CONSTRUCTOR");
    }
    if (!Array.isArray(_layers)) {
      throw new Error("ERROR WRONG_TYPE : layers should be an array");
    }
    if (_typeof(_options) !== "object") {
      throw new Error("ERROR WRONG_TYPE : options should be an object");
    }
    _this._initialize(_options, _layers);
    _this.container = _this._initContainer(_options);

    // ajout du container
    _this.element ? _this.element.appendChild(_this.container) : _this.element = _this.container;
    return _possibleConstructorReturn(_this, _this);
  }

  // ################################################################### //
  // ############## public methods (getters, setters) ################## //
  // ################################################################### //

  /**
   * Overload setMap function, that enables to catch map events, such as movend events.
   *
   * @param {ol.Map} map - Map.
   */
  _inherits(LayerSwitcher, _Control);
  return _createClass(LayerSwitcher, [{
    key: "setMap",
    value: function setMap(map) {
      var _this2 = this;
      // info : cette méthode est appelée (entre autres?) après un map.addControl() ou map.removeControl()

      if (map) {
        // dans le cas de l'ajout du contrôle à la map
        // on ajoute les couches
        this._addMapLayers(map);

        // At every map movement, layer switcher may be updated,
        // according to layers on map, and their range.
        this._listeners.onMoveListener = map.on("moveend", function () {
          return _this2._onMapMoveEnd(map);
        });

        // add event listeners when a new layer is added to map, to add it in LayerSwitcher control (and DOM)
        this._listeners.onAddListener = map.getLayers().on("add", function (evt) {
          var layer = evt.element;
          var id;
          // on attribue un nouvel identifiant à cette couche,
          // sauf si c'est une couche qui a déjà été ajoutée dans le LayerSwitcher au préalable (si gpLayerId existe)
          if (!layer.hasOwnProperty("gpLayerId")) {
            id = _this2._layerId;
            layer.gpLayerId = id;
            _this2._layerId++;
          } else {
            id = layer.gpLayerId;
          }
          if (!_this2._layers[id]) {
            _this2.addLayer(layer);
          }
        });

        // add event listeners when a layer is removed from map, to remove it from LayerSwitcher control (and DOM)
        this._listeners.onRemoveListener = map.getLayers().on("remove", function (evt) {
          var layer = evt.element;
          var id = layer.gpLayerId;
          if (_this2._layers[id]) {
            _this2.removeLayer(layer);
          }
        });
      } else {
        // we are in a setMap(null) case
        // we forget the listeners linked to the layerSwitcher
        (0,ol_Observable__WEBPACK_IMPORTED_MODULE_2__.unByKey)(this._listeners.onMoveListener);
        (0,ol_Observable__WEBPACK_IMPORTED_MODULE_2__.unByKey)(this._listeners.onAddListener);
        (0,ol_Observable__WEBPACK_IMPORTED_MODULE_2__.unByKey)(this._listeners.onRemoveListener);

        // we put all the layers at Zindex = 0, without changing the visual order
        // in order that the next added layers are not hidden by layers with Zindex > 0
        for (var i = this._layersOrder.length - 1; i >= 0; i--) {
          this._layersOrder[i].layer.setZIndex(0);
        }
      }

      // on appelle la méthode setMap originale d'OpenLayers
      _get(_getPrototypeOf(LayerSwitcher.prototype), "setMap", this).call(this, map);

      // position
      if (this.options.position) {
        this.setPosition(this.options.position);
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
  }, {
    key: "addLayer",
    value: function addLayer(layer, config) {
      var _this3 = this;
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
      map.getLayers().forEach(function (lyr) {
        if (lyr.gpLayerId === id) {
          isLayerInMap = true;
        }
      });
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
          layer: layer,
          id: id,
          opacity: opacity != null ? opacity : 1,
          visibility: visibility != null ? visibility : true,
          inRange: isInRange != null ? isInRange : true,
          title: config.title != null ? config.title : layerInfos._title || id,
          description: config.description || layerInfos._description || null,
          legends: config.legends || layerInfos._legends || [],
          metadata: config.metadata || layerInfos._metadata || [],
          quicklookUrl: config.quicklookUrl || layerInfos._quicklookUrl || null
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
        if (layer.getZIndex && layer.getZIndex() !== 0 && typeof layer.getZIndex() !== "undefined" || layer._forceNullzIndex) {
          // réorganisation des couches si un zIndex est spécifié
          this._updateLayersOrder();
        } else {
          // sinon on ajoute la couche au dessus des autres
          this._layersOrder.unshift(layerOptions);
          this._lastZIndex++;
          layer.setZIndex(this._lastZIndex);
          this._layerListContainer.insertBefore(layerDiv, this._layerListContainer.firstChild);
        }

        // 3. Add listeners for opacity and visibility changes
        this._listeners.updateLayerOpacity = layer.on("change:opacity", function (e) {
          return _this3._updateLayerOpacity(e);
        });
        this._listeners.updateLayerVisibility = layer.on("change:visible", function (e) {
          return _this3._updateLayerVisibility(e);
        });
        if (this._layers[id].onZIndexChangeEvent == null) {
          this._layers[id].onZIndexChangeEvent = layer.on("change:zIndex", function () {
            return _this3._updateLayersOrder();
          });
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
            advancedTools.appendChild(this._createAdvancedToolInformationElement({
              id: id
            }));
          }
        }
        // close layer info element if open, to update information.
        if (infodiv && infodiv.className === "GPlayerInfoOpened") {
          document.getElementById(this._addUID("GPlayerInfoPanel")).className = "GPlayerInfoPanelClosed";
          infodiv.className = "GPlayerInfo";
        }
      }
    }
  }, {
    key: "removeLayer",
    value:
    /**
     * Remove a layer from control
     *
     * @param {ol.layer.Layer} layer - layer.
     * @deprecated on the future version ...
     */
    function removeLayer(layer) {
      if (!layer) {
        return;
      }
      (0,ol_Observable__WEBPACK_IMPORTED_MODULE_2__.unByKey)(this._listeners.updateLayerOpacity);
      (0,ol_Observable__WEBPACK_IMPORTED_MODULE_2__.unByKey)(this._listeners.updateLayerVisibility);
      // olObservableUnByKey(this._listeners.updateLayersOrder);

      logger.trace(layer);
      var layerID = layer.gpLayerId;
      var layerList = document.getElementById(this._addUID("GPlayersList")).firstChild;
      // close layer info element if open.
      var infodiv = document.getElementById(this._addUID("GPinfo_ID_" + layerID));
      if (infodiv && infodiv.className === "GPlayerInfoOpened") {
        document.getElementById(this._addUID("GPlayerInfoPanel")).className = "GPlayerInfoPanelClosed";
        infodiv.className = "GPlayerInfo";
      }
      // remove layer div
      var layerDiv = document.getElementById(this._addUID("GPlayerSwitcher_ID_" + layerID));
      if (layerDiv) {
        layerList.removeChild(layerDiv);
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
      // on retire la couche de la liste des layers
      delete this._layers[layerID];
    }

    /**
     * Collapse or display control main container
     *
     * @param {Boolean} collapsed - True to collapse control, False to display it
     */
  }, {
    key: "setCollapsed",
    value: function setCollapsed(collapsed) {
      if (collapsed === undefined) {
        logger.log("[ERROR] LayerSwitcher:setCollapsed - missing collapsed parameter");
        return;
      }
      var isCollapsed = !document.getElementById(this._addUID("GPshowLayersList")).checked;
      if (collapsed && isCollapsed || !collapsed && !isCollapsed) {
        return;
      }
      // on simule l'ouverture du panneau après un click
      if (!isCollapsed) {
        var layers = document.getElementsByClassName("GPlayerInfoOpened");
        for (var i = 0; i < layers.length; i++) {
          layers[i].className = "GPlayerInfo";
        }
        document.getElementById(this._addUID("GPlayerInfoPanel")).className = "GPlayerInfoPanelClosed";
      }
      document.getElementById(this._addUID("GPshowLayersList")).checked = !collapsed;
    }

    /**
     * Returns true if widget is collapsed (minimize), false otherwise
     * @returns {Boolean} is collapsed
     */
  }, {
    key: "getCollapsed",
    value: function getCollapsed() {
      return this.collapsed;
    }

    /**
     * Display or hide removeLayerPicto from layerSwitcher for this layer
     *
     * @param {ol.layer.Layer} layer - ol.layer to be configured
     * @param {Boolean} removable - specify if layer can be remove from layerSwitcher (true) or not (false). Default is true
     */
  }, {
    key: "setRemovable",
    value: function setRemovable(layer, removable) {
      if (!layer) {
        return;
      }
      var layerID = layer.gpLayerId;
      if (layerID == null) {
        // on teste si layerID est null ou undefined
        logger.log("[LayerSwitcher:setRemovable] layer should be added to map before calling setRemovable method");
        return;
      }
      var removalDiv = document.getElementById(this._addUID("GPremove_ID_" + layerID));
      if (removalDiv) {
        if (removable === false) {
          removalDiv.style.display = "none";
        } else if (removable === true) {
          removalDiv.style.display = "block";
        } else {}
      }
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
  }, {
    key: "_initialize",
    value: function _initialize(options, layers) {
      // identifiant du contrôle : utile pour suffixer les identifiants CSS (pour gérer le cas où il y en a plusieurs dans la même page)
      this._uid = _Utils_SelectorID__WEBPACK_IMPORTED_MODULE_4__["default"].generate();
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
      this.collapsed = options.collapsed !== undefined ? options.collapsed : true;
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
            layer: layer,
            // la couche ol.layer concernée
            id: id,
            opacity: opacity != null ? opacity : 1,
            visibility: visibility != null ? visibility : true,
            title: conf.title != null ? conf.title : conf.id ? conf.id : id,
            description: conf.description || null,
            legends: conf.legends || [],
            metadata: conf.metadata || [],
            quicklookUrl: conf.quicklookUrl || null
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
  }, {
    key: "_initContainer",
    value: function _initContainer() {
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
      var changeCollapsed = function changeCollapsed(e) {
        this.collapsed = !e.target.checked;
        // on génère nous même l'evenement OpenLayers de changement de pté
        // (utiliser layerSwitcher.on("change:collapsed", function ) pour s'abonner à cet évènement)
        this.dispatchEvent("change:collapsed");
      };
      input.addEventListener("click", function (e) {
        changeCollapsed.call(context, e);
      });

      // ajout dans le container principal du picto du controle
      var picto = this._createMainPictoElement();
      container.appendChild(picto);

      // ajout dans le container principal de la liste des layers
      var divL = this._createMainLayersElement();
      container.appendChild(divL);
      var div = this._layerListContainer = this._createMainLayersDivElement();
      divL.appendChild(div);

      // creation du mode draggable
      this._createDraggableElement(div, this);

      // ajout dans le container principal du panneau d'information
      var divI = this._createMainInfoElement();
      container.appendChild(divI);
      return container;
    }

    /**
     * Add all map layers to control main container
     *
     * @param {Object} map - ol.Map object, to which control is added
     * @private
     */
  }, {
    key: "_addMapLayers",
    value: function _addMapLayers(map) {
      var _this4 = this;
      this._layersIndex = {};

      // on parcourt toutes les couches de la carte, pour les ajouter à la liste du controle si ce n'est pas déjà le cas.
      // idée : le layerSwitcher doit représenter l'ensemble des couches de la carte.
      map.getLayers().forEach(function (layer) {
        // ajout des couches de la carte à la liste
        var id;
        // si elles ont déjà un identifiant (gpLayerId), on le récupère, sinon on en crée un nouveau, en incrémentant this_layerId.
        if (!layer.hasOwnProperty("gpLayerId")) {
          id = _this4._layerId;
          layer.gpLayerId = id;
          _this4._layerId++;
        } else {
          id = layer.gpLayerId;
        }
        var layerInfos = _this4.getLayerInfo(layer) || {};
        if (!_this4._layers[id]) {
          // si la couche n'est pas encore dans la liste des layers (this._layers), on l'ajoute
          var opacity = layer.getOpacity();
          var visibility = layer.getVisible();
          var isInRange = _this4.isInRange(layer, map);
          var layerOptions = {
            layer: layer,
            id: id,
            opacity: opacity != null ? opacity : 1,
            visibility: visibility != null ? visibility : true,
            inRange: isInRange != null ? isInRange : true,
            title: layerInfos._title || id,
            description: layerInfos._description || null,
            legends: layerInfos._legends || [],
            metadata: layerInfos._metadata || [],
            quicklookUrl: layerInfos._quicklookUrl || null
          };
          _this4._layers[id] = layerOptions;
        } else {
          // si elle existe déjà, on met à jour ses informations (visibility, opacity, inRange)
          _this4._layers[id].opacity = layer.getOpacity();
          _this4._layers[id].visibility = layer.getVisible();
          _this4._layers[id].inRange = _this4.isInRange(layer, map);
        }

        // Ajout de listeners sur les changements d'opacité, visibilité
        _this4._listeners.updateLayerOpacity = layer.on("change:opacity", function (e) {
          return _this4._updateLayerOpacity(e);
        });
        _this4._listeners._updateLayerVisibility = layer.on("change:visible", function (e) {
          return _this4._updateLayerVisibility(e);
        });

        // récupération des zindex des couches s'ils existent, pour les ordonner.
        if (layer.getZIndex !== undefined) {
          var layerIndex = layer.getZIndex() || 0; // FIXME le zIndex peut être undefined !? donc par defaut à 0 !
          if (!_this4._layersIndex[layerIndex] || !Array.isArray(_this4._layersIndex[layerIndex])) {
            _this4._layersIndex[layerIndex] = [];
          }
          _this4._layersIndex[layerIndex].push(_this4._layers[id]);
        }
        ;
      });

      // on récupère l'ordre d'affichage des couches entre elles dans la carte, à partir de zindex.
      for (var zindex in this._layersIndex) {
        if (this._layersIndex.hasOwnProperty(zindex)) {
          var layers = this._layersIndex[zindex];
          for (var l = 0; l < layers.length; l++) {
            // à ce stade layers[l] est une couche de this._layers.
            // on conserve l'ordre des couches : la première est celle qui se situe tout en haut, et la dernière est le "fond de carte"
            this._layersOrder.unshift(layers[l]);
            // et on réordonne les couches avec des zindex, uniques.
            this._lastZIndex++;
            layers[l].layer.setZIndex(this._lastZIndex);
            if (this._layers[layers[l].layer.gpLayerId].onZIndexChangeEvent == null) {
              this._layers[layers[l].layer.gpLayerId].onZIndexChangeEvent = layers[l].layer.on("change:zIndex", function () {
                return _this4._updateLayersOrder();
              });
            }
          }
        }
      }

      // on ajoute les div correspondantes aux différentes couches (dans l'ordre inverse d'affichage) dans le controle.
      for (var j = 0; j < this._layersOrder.length; j++) {
        var layerOptions = this._layersOrder[j];
        var layerDiv = this._createLayerDiv(layerOptions);
        this._layerListContainer.appendChild(layerDiv);
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
  }, {
    key: "_createLayerDiv",
    value: function _createLayerDiv(layerOptions) {
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
     * Change layer opacity on layer opacity picto click
     *
     * @param {Object} e - event
     * @private
     */
  }, {
    key: "_onChangeLayerOpacity",
    value: function _onChangeLayerOpacity(e) {
      var divId = e.target.id; // ex GPvisibilityPicto_ID_26
      var layerID = _Utils_SelectorID__WEBPACK_IMPORTED_MODULE_4__["default"].index(divId); // ex. 26
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
     * @private
     */
  }, {
    key: "_updateLayerOpacity",
    value: function _updateLayerOpacity(e) {
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
    }

    /**
     * Change layer visibility on layer visibility picto click
     *
     * @param {Object} e - event
     * @private
     */
  }, {
    key: "_onVisibilityLayerClick",
    value: function _onVisibilityLayerClick(e) {
      var divId = e.target.id; // ex GPvisibilityPicto_ID_26
      var layerID = _Utils_SelectorID__WEBPACK_IMPORTED_MODULE_4__["default"].index(divId); // ex. 26
      var layer = this._layers[layerID].layer;
      layer.setVisible(e.target.checked);
    }

    /**
     * Change picto visibility on layer visibility change
     *
     * @param {Object} e - event
     * @private
     */
  }, {
    key: "_updateLayerVisibility",
    value: function _updateLayerVisibility(e) {
      var visible = e.target.getVisible();
      var id = e.target.gpLayerId;
      var layerVisibilityInput = document.getElementById(this._addUID("GPvisibility_ID_" + id));
      if (layerVisibilityInput) {
        layerVisibilityInput.checked = visible;
      }
    }

    /**
     * Change layers order in layerswitcher (control container) on a layer index change (on map) or when a layer is added to a specific zindex
     *
     * @private
     */
  }, {
    key: "_updateLayersOrder",
    value: function _updateLayersOrder() {
      var _this5 = this;
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
      map.getLayers().forEach(function (layer) {
        id = layer.gpLayerId;

        // on commence par désactiver temporairement l'écouteur d'événements sur le changement de zindex.
        (0,ol_Observable__WEBPACK_IMPORTED_MODULE_2__.unByKey)(_this5._layers[id].onZIndexChangeEvent);
        _this5._layers[id].onZIndexChangeEvent = null;

        // on ajoute la couche dans le tableau (de l'objet this._layersIndex) correspondant à son zindex
        layerIndex = null;
        if (layer.getZIndex !== undefined) {
          layerIndex = layer.getZIndex();
          if (!_this5._layersIndex[layerIndex] || !Array.isArray(_this5._layersIndex[layerIndex])) {
            _this5._layersIndex[layerIndex] = [];
          }
          _this5._layersIndex[layerIndex].push(_this5._layers[id]);
        }
        ;
      });

      // on réordonne les couches entre elles dans la carte, à partir des zindex stockés ci-dessus.
      this._lastZIndex = 0;
      this._layersOrder = [];
      for (var zindex in this._layersIndex) {
        if (this._layersIndex.hasOwnProperty(zindex)) {
          var layers = this._layersIndex[zindex];
          for (var l = 0; l < layers.length; l++) {
            // à ce stade layers[l] est une couche de this._layers.
            // on conserve l'ordre des couches : la première est celle qui se situe tout en haut, et la dernière est le "fond de carte"
            this._layersOrder.unshift(layers[l]);
            // et on réordonne les couches avec des zindex, uniques.
            this._lastZIndex++;
            // layers[l].layer.setZIndex(lastZIndex);
            // et on réactive l'écouteur d'événement sur les zindex
            if (this._layers[layers[l].layer.gpLayerId].onZIndexChangeEvent == null) {
              this._layers[layers[l].layer.gpLayerId].onZIndexChangeEvent = layers[l].layer.on("change:zIndex", function () {
                return _this5._updateLayersOrder();
              });
            }
          }
        }
      }
      if (this._layerListContainer) {
        // on vide le container précédent
        while (this._layerListContainer.firstChild) {
          this._layerListContainer.removeChild(this._layerListContainer.firstChild);
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
  }, {
    key: "_onOpenLayerInfoClick",
    value: function _onOpenLayerInfoClick(e) {
      var divId = e.target.id; // ex GPvisibilityPicto_ID_26
      var layerID = _Utils_SelectorID__WEBPACK_IMPORTED_MODULE_4__["default"].index(divId); // ex. 26
      var layerOptions = this._layers[layerID];
      var panel;
      var info;

      // Close layer info panel
      divId = document.getElementById(e.target.id);
      if (divId.className === "GPlayerInfoOpened") {
        if (divId.classList !== undefined) {
          divId.classList.remove("GPlayerInfoOpened");
          divId.classList.add("GPlayerInfo");
        }
        panel = document.getElementById(this._addUID("GPlayerInfoPanel"));
        if (panel.classList !== undefined) {
          panel.classList.remove("GPpanel");
          panel.classList.remove("GPlayerInfoPanelOpened");
          panel.classList.add("GPlayerInfoPanelClosed");
        }
        info = document.getElementById(this._addUID("GPlayerInfoContent"));
        panel.removeChild(info);
        return;
      }
      var layers = document.getElementsByClassName("GPlayerInfoOpened");
      for (var i = 0; i < layers.length; i++) {
        layers[i].className = "GPlayerInfo";
      }

      // Open layer info panel
      if (divId.classList !== undefined) {
        divId.classList.remove("GPlayerInfo");
        divId.classList.add("GPlayerInfoOpened");
      }
      panel = document.getElementById(this._addUID("GPlayerInfoPanel"));
      if (panel.classList !== undefined) {
        panel.classList.add("GPpanel");
        panel.classList.remove("GPlayerInfoPanelClosed");
        panel.classList.add("GPlayerInfoPanelOpened");
      }
      info = document.getElementById(this._addUID("GPlayerInfoContent"));
      if (info) {
        panel.removeChild(info);
      }

      // on récupère les infos associées au layer pour mettre dynamiquement le contenu du panel d'informations
      var obj = {
        title: layerOptions.title,
        description: layerOptions.description,
        quicklookUrl: layerOptions.quicklookUrl,
        metadata: layerOptions.metadata,
        legends: layerOptions.legends
      };
      // get layer max scale denominator
      var maxResolution = layerOptions.layer.getMaxResolution();
      if (maxResolution === Infinity) {
        obj._maxScaleDenominator = 560000000;
      } else {
        obj._maxScaleDenominator = Math.round(maxResolution / 0.00028);
      }
      var infoLayer = this._createContainerLayerInfoElement(obj);
      panel.appendChild(infoLayer);
    }

    /**
     * remove layer from layer switcher and map on picto click
     *
     * @param {Event} e - MouseEvent
     * @private
     */
  }, {
    key: "_onDropLayerClick",
    value: function _onDropLayerClick(e) {
      var divId = e.target.id; // ex GPvisibilityPicto_ID_26
      var layerID = _Utils_SelectorID__WEBPACK_IMPORTED_MODULE_4__["default"].index(divId); // ex. 26
      var layer = this._layers[layerID].layer;

      // le retrait de la couche va déclencher l'ecouteur d'évenement,
      // et appeler this.removeLayer qui va supprimer la div.
      this.getMap().getLayers().remove(layer);
    }

    /**
     * change layers order (on map) on drag and drop (on control container)
     *
     * @private
     */
  }, {
    key: "_onDragAndDropLayerClick",
    value: function _onDragAndDropLayerClick() {
      var _this6 = this;
      // INFO : e.oldIndex et e.newIndex marchent en mode AMD mais pas Bundle.
      var map = this.getMap();

      // on récupère l'ordre des div dans le contrôle pour réordonner les couches (avec zindex)
      var matchesLayers = document.querySelectorAll("div.GPlayerSwitcher_layer");
      var maxZIndex = matchesLayers.length;
      // on vide la liste ordonnée avant de la remplir avec l'ordre des couches selon les div.
      this._layersOrder = [];
      for (var i = 0; i < matchesLayers.length; i++) {
        var tag = matchesLayers[i].id;
        var id = _Utils_SelectorID__WEBPACK_IMPORTED_MODULE_4__["default"].index(tag);
        var layer = this._layers[id].layer;

        // on commence par désactiver temporairement l'écouteur d'événements sur le changement de zindex.
        (0,ol_Observable__WEBPACK_IMPORTED_MODULE_2__.unByKey)(this._layers[id].onZIndexChangeEvent);
        this._layers[id].onZIndexChangeEvent = null;
        if (layer.setZIndex) {
          // maxZIndex--;
          layer.setZIndex(maxZIndex);
          this._layersOrder.push(this._layers[id]);
          maxZIndex--;
        }

        // et on réactive l'écouteur d'événement sur les zindex
        if (this._layers[id].onZIndexChangeEvent == null) {
          this._layers[id].onZIndexChangeEvent = layer.on("change:zIndex", function () {
            return _this6._updateLayersOrder();
          });
        }
      }

      // mise à jour de la visu
      map.updateSize();
    }

    /**
     * check layers range on map movement
     *
     * @param {ol.Map} map - ol map on which event occured
     * @private
     */
  }, {
    key: "_onMapMoveEnd",
    value: function _onMapMoveEnd(map) {
      var _this7 = this;
      // pour chaque couche de la map, on vérifie qu'elle soit toujours dans la visu (inRange)
      map.getLayers().forEach(function (layer) {
        var id = layer.gpLayerId;
        if (_this7._layers[id]) {
          var layerOptions = _this7._layers[id];

          // Check if layer is out of range.
          var layerDiv;
          if (_this7.isInRange(layer, map) && !layerOptions.inRange) {
            layerOptions.inRange = true;
            layerDiv = document.getElementById(_this7._addUID("GPlayerSwitcher_ID_" + id));
            layerDiv.classList.remove("outOfRange");
          } else if (!_this7.isInRange(layer, map) && layerOptions.inRange) {
            layerOptions.inRange = false;
            layerDiv = document.getElementById(_this7._addUID("GPlayerSwitcher_ID_" + id));
            layerDiv.classList.add("outOfRange");
          }
        }
      });
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
  }, {
    key: "getLayerDOMId",
    value: function getLayerDOMId(olLayer) {
      var foundId = null;
      this.getMap().getLayers().forEach(function (layer) {
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
  }, {
    key: "isInRange",
    value: function isInRange(layer, map) {
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
      if (layerExtent && !(0,ol_extent__WEBPACK_IMPORTED_MODULE_3__.intersects)(mapExtent, layerExtent)) {
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
  }, {
    key: "getLayerInfo",
    value: function getLayerInfo(layer) {
      var layerInfo = {};
      if (layer.getProperties !== undefined && layer.getSource !== undefined) {
        var layerProperties = layer.getProperties();
        var src = layerProperties.source;
        if (src) {
          layerInfo._title = src._title || layerProperties.id || "";
          layerInfo._description = src._description || "";
          layerInfo._quicklookUrl = src._quicklookUrl || "";
          layerInfo._metadata = src._metadata || [];
          layerInfo._legends = src._legends || [];
        }
      }
      return layerInfo;
    }
  }]);
}(_Control__WEBPACK_IMPORTED_MODULE_1__["default"]);

// on récupère les méthodes de la classe commune LayerSwitcherDOM
Object.assign(LayerSwitcher.prototype, _LayerSwitcherDOM__WEBPACK_IMPORTED_MODULE_6__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LayerSwitcher);

// Expose LayerSwitcher as ol.control.LayerSwitcher (for a build bundle)
if (window.ol && window.ol.control) {
  window.ol.control.LayerSwitcher = LayerSwitcher;
}

/***/ }),

/***/ "./src/packages/Controls/LayerSwitcher/LayerSwitcherDOM.js":
/*!*****************************************************************!*\
  !*** ./src/packages/Controls/LayerSwitcher/LayerSwitcherDOM.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var sortablejs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sortablejs */ "./node_modules/sortablejs/modular/sortable.esm.js");

var LayerSwitcherDOM = {
  /**
   * Creation du drag and drop
   *
   * @param {Object} elementDraggable - Element HTML (DOM) Container
   * @param {Object} context - this
   */
  _createDraggableElement: function _createDraggableElement(elementDraggable, context) {
    // FIXME retirer cette détection user-agent pour solution propre
    // option forcefallback pour réparer sortable sous Chrome 97
    // option forcefallback casse le layerswitcher du portail sous firefox
    if (navigator.userAgent.match(/chrome|chromium|crios/i)) {
      sortablejs__WEBPACK_IMPORTED_MODULE_0__["default"].create(elementDraggable, {
        handle: ".GPlayerName",
        draggable: ".draggable-layer",
        ghostClass: "GPghostLayer",
        animation: 200,
        forceFallback: true,
        // Call event function on drag and drop
        onEnd: function onEnd(e) {
          // FIXME pas terrrible, mais il faut bien passer ce contexte...
          context._onDragAndDropLayerClick(e);
        }
      });
    } else {
      sortablejs__WEBPACK_IMPORTED_MODULE_0__["default"].create(elementDraggable, {
        handle: ".GPlayerName",
        draggable: ".draggable-layer",
        ghostClass: "GPghostLayer",
        animation: 200,
        // Call event function on drag and drop
        onEnd: function onEnd(e) {
          // FIXME pas terrrible, mais il faut bien passer ce contexte...
          context._onDragAndDropLayerClick(e);
        }
      });
    }
  },
  // ################################################################### //
  // ######################### Main container ########################## //
  // ################################################################### //

  /**
  * Add uuid to the tag ID
  * @param {String} id - id selector
  * @returns {String} uid - id selector with an unique id
  */
  _addUID: function _addUID(id) {
    var uid = this._uid ? id + "-" + this._uid : id;
    return uid;
  },
  /**
   * Creation du container principal (DOM)
   *
   * @returns {DOMElement} container - layer switcher DOM element
   */
  _createMainContainerElement: function _createMainContainerElement() {
    var container = document.createElement("div");
    container.id = this._addUID("GPlayerSwitcher");
    container.className = "GPwidget gpf-widget gpf-widget-button";
    return container;
  },
  /**
   * Creation du container principal d"affichage des layers (DOM)
   *
   * @returns {DOMElement} input - element for minimizing/maximizing the layer switcher
   */
  _createMainLayersShowElement: function _createMainLayersShowElement() {
    // <!-- Hidden checkbox for minimizing/maximizing -->
    var input = document.createElement("input");
    input.id = this._addUID("GPshowLayersList");
    input.type = "checkbox";
    return input;
  },
  /**
   * Creation du container principal des layers (DOM)
   *
   * @returns {DOMElement} container - layers list container
   */
  _createMainLayersElement: function _createMainLayersElement() {
    // ajout de la liste des layers dans le container principal
    // <div id="GPlayersList" class="GPpanel">
    //   (...)
    // </div>
    var dialog = document.createElement("dialog");
    dialog.id = this._addUID("GPlayersList");
    dialog.className = "GPpanel gpf-panel fr-modal";
    return dialog;
  },
  _createMainLayersDivElement: function _createMainLayersDivElement() {
    var div = document.createElement("div");
    div.className = "gpf-panel__body fr-modal__body";
    return div;
  },
  /**
   * Creation du container du picto du controle (DOM)
   *
   * @returns {DOMElement} label
   */
  _createMainPictoElement: function _createMainPictoElement() {
    var self = this;
    var button = document.createElement("button");
    button.id = this._addUID("GPshowLayersListPicto");
    button.className = "GPshowOpen GPshowAdvancedToolPicto gpf-btn gpf-btn-icon-layerswitcher fr-btn";
    button.htmlFor = this._addUID("GPshowLayersList");
    button.title = "Afficher/masquer le gestionnaire de couches";
    button.setAttribute("tabindex", "0");
    button.setAttribute("aria-pressed", false);
    if (button.addEventListener) {
      button.addEventListener("click", function (e) {
        var status = e.target.ariaPressed === "true";
        e.target.setAttribute("aria-pressed", !status);
        document.getElementById(self._addUID("GPshowLayersList")).checked = status;
        if (document.getElementById(self._addUID("GPshowLayersList")).checked) {
          var layers = document.getElementsByClassName("GPlayerInfoOpened");
          for (var i = 0; i < layers.length; i++) {
            layers[i].className = "GPlayerInfo";
          }
          document.getElementById(self._addUID("GPlayerInfoPanel")).className = "GPlayerInfoPanelClosed";
        }
      });
    } else if (button.attachEvent) {
      button.attachEvent("onclick", function (e) {
        var status = e.target.ariaPressed === "true";
        e.target.setAttribute("aria-pressed", !status);
        if (document.getElementById(self._addUID("GPshowLayersList")).checked) {
          var layers = document.getElementsByClassName("GPlayerInfoOpened");
          for (var i = 0; i < layers.length; i++) {
            layers[i].className = "GPlayerInfo";
          }
          document.getElementById(self._addUID("GPlayerInfoPanel")).className = "GPlayerInfoPanelClosed";
        }
      });
    }
    return button;
  },
  /**
   * Creation du container du panneau d"information (DOM)
   *
   * @returns {DOMElement} container
   */
  _createMainInfoElement: function _createMainInfoElement() {
    // gestion du panneau d"information dans le container principal
    // <div id="GPlayerInfoPanel" class="GPlayerInfoPanelClosed">...</div>
    var div = document.createElement("div");
    div.id = this._addUID("GPlayerInfoPanel");
    div.className = "GPpanel GPlayerInfoPanelClosed gpf-panel fr-modal";
    return div;
  },
  // ################################################################### //
  // ######################### Layer container ######################### //
  // ################################################################### //

  /**
   * Creation du container du layer (DOM)
   *
   * @param {Object} obj - options de la couche à ajouter dans le layer switcher
   * @param {Object} obj.layer - couche (ol ou leaflet)
   * @param {String} obj.id - identifiant de la couche (pour ol ou leaflet)
   * @param {String} obj.title - nom de la couche à afficher dans le controle
   * @param {String} obj.description - description de la couche à afficher
   * @param {Boolean} obj.visibility - visibilité de la couche dans la carte (true or false)
   * @param {Float} obj.opacity - opacité de la couche
   *
   * @returns {DOMElement} container
   */
  _createContainerLayerElement: function _createContainerLayerElement(obj) {
    // exemple :
    // <div id="GPlayerSwitcher_ID_Layer1" class="GPlayerSwitcher_layer outOfRange">
    //     <!-- Basic toolbar : visibility / layer name
    //     _createBasicToolElement
    //           _createBasicToolVisibilityElement
    //           _createBasicToolNameElement
    //     -->
    //     <!-- Hidden checkbox + label for showing advanced toolbar
    //     _createAdvancedToolShowElement
    //     -->
    //     <!-- Advanced toolbar : layer info / opacity slider / opacity value / removal
    //     _createAdvancedToolElement
    //           _createAdvancedToolDeleteElement
    //           _createAdvancedToolInformationElement
    //           _createAdvancedToolOpacityElement
    //     -->
    // </div>

    // <!-- Layer entry in layer list -->
    // <!-- Every item is marked with layerID, which is defined at layer import -->
    var container = document.createElement("div");
    container.id = this._addUID("GPlayerSwitcher_ID_" + obj.id);
    container.className = "GPlayerSwitcher_layer gpf-panel__content fr-modal__content draggable-layer";

    // ajout des outils basiques (visibility / layer name)
    container.appendChild(this._createBasicToolElement(obj));

    // liste des outils avancés (layer info / opacity slider / opacity value / removal)
    var array = this._createAdvancedToolShowElement(obj);
    for (var i = 0; i < array.length; i++) {
      container.appendChild(array[i]);
    }

    // ajout des outils avancés
    container.appendChild(this._createAdvancedToolElement(obj));
    return container;
  },
  // ################################################################### //
  // ############################ Layer tool ########################### //
  // ################################################################### //

  /**
   * Creation du container des outils basiques du layer (DOM)
   *
   * @param {Object} obj - options de la couche à ajouter dans le layer switcher
   *
   * @returns {DOMElement} container
   */
  _createBasicToolElement: function _createBasicToolElement(obj) {
    // exemple :
    // <div id="GPbasicTools_ID_1" class="GPlayerBasicTools">
    //      <!-- _createBasicToolVisibilityElement -->
    //      <!-- _createBasicToolNameElement -->
    // </div>

    var div = document.createElement("div");
    div.id = this._addUID("GPbasicTools_ID_" + obj.id);
    div.className = "GPlayerBasicTools";
    div.appendChild(this._createBasicToolNameElement(obj));
    var array = this._createBasicToolVisibilityElement(obj);
    for (var i = 0; i < array.length; i++) {
      div.appendChild(array[i]);
    }
    return div;
  },
  /**
   * Creation du nom du layer (DOM)
   *
   * @param {Object} obj - options de la couche à ajouter dans le layer switcher
   *
   * @returns {DOMElement} container
   */
  _createBasicToolNameElement: function _createBasicToolNameElement(obj) {
    // exemple :
    // <span id="GPname_ID_Layer1" class="GPlayerName" title="Quartiers prioritaires de la ville">Quartiers prioritaires de la ville</span>
    var label = document.createElement("label");
    label.id = this._addUID("GPname_ID_" + obj.id);
    label.className = "GPlayerName gpf-label fr-label";
    label.title = obj.description || obj.title;
    label.innerHTML = obj.title;
    return label;
  },
  /**
   * Creation de l'icone de visibilité du layer (DOM)
   *
   * @param {Object} obj - options de la couche à ajouter dans le layer switcher
    * @returns {DOMElement[]} array containing input and label elements
   */
  _createBasicToolVisibilityElement: function _createBasicToolVisibilityElement(obj) {
    // exemple :
    // <input type="checkbox" id="GPvisibility_ID_Layer1" checked="">
    // <label for="GPvisibility_ID_Layer1" id="GPvisibilityPicto_ID_Layer1" class="GPlayerVisibility" title="Afficher/masquer la couche"></label>

    var list = [];
    var checked = typeof obj.visibility !== "undefined" ? obj.visibility : true;
    var id = this._addUID("GPvisibility_ID_" + obj.id);
    var input = document.createElement("input");
    input.id = id;
    input.type = "checkbox";
    input.checked = checked;
    var label = document.createElement("label");
    label.htmlFor = id;
    label.id = this._addUID("GPvisibilityPicto_ID_" + obj.id);
    label.className = "GPlayerVisibility gpf-label fr-label";
    label.title = "Afficher/masquer la couche";

    // add event for visibility change
    var context = this;
    if (input.addEventListener) {
      input.addEventListener("click", function (e) {
        context._onVisibilityLayerClick(e);
      });
    } else if (input.attachEvent) {
      // internet explorer
      input.attachEvent("onclick", function (e) {
        context._onVisibilityLayerClick(e);
      });
    }
    list.push(input);
    list.push(label);
    return list;
  },
  /**
   * Creation de l'affichage du menu des outils avancés du layer (DOM)
   *
   * @param {Object} obj - options de la couche à ajouter dans le layer switcher
   *
   * @returns {DOMElement[]} array containing input and label elements
   */
  _createAdvancedToolShowElement: function _createAdvancedToolShowElement(obj) {
    // <input type="checkbox" id="GPshowAdvancedTools_ID_Layer1">
    // <label for="GPshowAdvancedTools_ID_Layer1" id="GPshowAdvancedToolsPicto_ID_Layer1" class="GPshowMoreOptions GPshowLayerAdvancedTools" title="Plus d'outils"></label>

    var list = [];
    var label = document.createElement("label");
    label.id = this._addUID("GPshowAdvancedToolsPicto_ID_" + obj.id);
    label.htmlFor = this._addUID("GPshowAdvancedTools_ID_" + obj.id);
    label.title = "Plus d'outils";
    label.className = "GPshowMoreOptions GPshowLayerAdvancedTools gpf-label fr-label";
    var input = document.createElement("input");
    input.type = "checkbox";
    input.id = this._addUID("GPshowAdvancedTools_ID_" + obj.id);
    list.push(input);
    list.push(label);
    return list;
  },
  /**
   * Creation du container des outils avancés du layer (DOM)
   *
   * @param {Object} obj - options de la couche à ajouter dans le layer switcher
   *
   * @returns {DOMElement} container
   */
  _createAdvancedToolElement: function _createAdvancedToolElement(obj) {
    // exemple :
    // <div id="GPadvancedTools_ID_Layer1" class="GPlayerAdvancedTools">
    //     <!-- _createAdvancedToolDeleteElement -->
    //     <!-- _createAdvancedToolInformationElement -->
    //     <!-- _createAdvancedToolOpacityElement -->
    // </div>

    var container = document.createElement("div");
    container.id = this._addUID("GPadvancedTools_ID_" + obj.id);
    container.className = "GPlayerAdvancedTools";
    container.appendChild(this._createAdvancedToolDeleteElement(obj));

    // si on n'a de l'informations à afficher, on met en place ce composant
    if (obj.title && obj.description) {
      container.appendChild(this._createAdvancedToolInformationElement(obj));
    }
    if (obj.type !== "feature") {
      var array = this._createAdvancedToolOpacityElement(obj);
      for (var i = 0; i < array.length; i++) {
        container.appendChild(array[i]);
      }
    }
    return container;
  },
  /**
   * Creation de l'icone de suppression du layer (DOM)
   *
   * @param {Object} obj - options de la couche à ajouter dans le layer switcher
   *
   * @returns {DOMElement} container
   */
  _createAdvancedToolDeleteElement: function _createAdvancedToolDeleteElement(obj) {
    // exemple :
    // <div id="GPremove_ID_Layer1" class="GPlayerRemove" title="Supprimer la couche" onclick="GPdropLayer(this);"></div>

    var div = document.createElement("div");
    div.id = this._addUID("GPremove_ID_" + obj.id);
    div.className = "GPlayerRemove";
    div.title = "Supprimer la couche";
    div.layerId = obj.id;
    var context = this;
    if (div.addEventListener) {
      div.addEventListener("click", function (e) {
        context._onDropLayerClick(e);
      });
    } else if (div.attachEvent) {
      // internet explorer
      div.attachEvent("onclick", function (e) {
        context._onDropLayerClick(e);
      });
    }
    return div;
  },
  /**
   * Creation de l'icone d'information du layer (DOM)
   *
   * @param {Object} obj - options de la couche à ajouter dans le layer switcher
   *
   * @returns {DOMElement} container
   */
  _createAdvancedToolInformationElement: function _createAdvancedToolInformationElement(obj) {
    // exemple :
    // <div id="GPinfo_ID_Layer1" class="GPlayerInfo" title="Informations/légende" onclick="GPopenLayerInfo(this);"></div>

    var div = document.createElement("div");
    div.id = this._addUID("GPinfo_ID_" + obj.id);
    div.className = "GPlayerInfo";
    div.title = "Informations/légende";
    div.layerId = obj.id;
    // add event on click
    var context = this;
    if (div.addEventListener) {
      div.addEventListener("click", function (e) {
        context._onOpenLayerInfoClick(e);
      });
    } else if (div.attachEvent) {
      // internet explorer
      div.attachEvent("onclick", function (e) {
        context._onOpenLayerInfoClick(e);
      });
    }
    return div;
  },
  /**
   * Creation de l'icone de gestion de l'opacité du layer (DOM)
   *
   * @param {Object} obj - options de la couche à ajouter dans le layer switcher
   *
   * @returns {DOMElement[]} array of two containers
   */
  _createAdvancedToolOpacityElement: function _createAdvancedToolOpacityElement(obj) {
    // exemple :
    // <div id="GPopacity_ID_Layer1" class="GPlayerOpacity" title="Opacité">
    //   <input id="GPopacityRange_ID_Layer1" type="range" value="100" oninput="GPchangeLayerOpacity(this);" onchange="GPchangeLayerOpacity(this);">
    // </div>
    // <div class="GPlayerOpacityValue" id="GPopacityValueDiv_ID_Layer1">
    //   <span id="GPopacityValue_ID_Layer1">100</span>
    //   %
    // </div>

    var list = [];

    // curseur pour changer l'opacité
    var divO = document.createElement("div");
    divO.id = this._addUID("GPopacity_ID_" + obj.id);
    divO.className = "GPlayerOpacity";
    divO.title = "Opacité";
    var opacity = typeof obj.opacity !== "undefined" ? obj.opacity : 1;
    opacity = Math.round(opacity * 100);
    var input = document.createElement("input");
    input.id = this._addUID("GPopacityValueDiv_ID_" + obj.id);
    input.type = "range";
    input.value = opacity;
    input.ariaLabel = "Opacité";

    // add event for opacity change
    var context = this;
    if (input.addEventListener) {
      input.addEventListener("change", function (e) {
        context._onChangeLayerOpacity(e);
      });
    } else if (input.attachEvent) {
      // internet explorer
      input.attachEvent("onchange", function (e) {
        context._onChangeLayerOpacity(e);
      });
    }
    if (input.addEventListener) {
      input.addEventListener("input", function (e) {
        context._onChangeLayerOpacity(e);
      });
    } else if (input.attachEvent) {
      // internet explorer
      input.attachEvent("oninput", function (e) {
        context._onChangeLayerOpacity(e);
      });
    }
    divO.appendChild(input);

    // Valeur d'opacité
    var divC = document.createElement("div");
    divC.id = this._addUID("GPopacityValueDiv_ID_" + obj.id);
    divC.className = "GPlayerOpacityValue";
    var span = document.createElement("span");
    span.id = this._addUID("GPopacityValue_ID_" + obj.id);
    span.innerHTML = opacity + "%";
    divC.appendChild(span);
    list.push(divO);
    list.push(divC);
    return list;
  },
  // ################################################################### //
  // ############################ Layer info ########################### //
  // ################################################################### //

  /**
   * Creation du container du layer info (DOM)
   *
   * TODO GPlayerInfoPopup : ???
   * TODO GPlayerInfoLink  : mettre en forme les échelles !
   *
   * @param {Object} obj - options de la couche à ajouter dans le layer switcher
   *
   * @returns {DOMElement} container
   */
  _createContainerLayerInfoElement: function _createContainerLayerInfoElement(obj) {
    var container = document.createElement("div");
    container.id = this._addUID("GPlayerInfoContent");
    var title = document.createElement("div");
    title.id = this._addUID("GPlayerInfoTitle");
    title.innerHTML = obj.title;
    container.appendChild(title);
    if (obj.quicklookUrl) {
      var quick = document.createElement("div");
      quick.id = this._addUID("GPlayerInfoQuicklook");
      quick.title = "Afficher un aperçu de la couche";
      var refquick = document.createElement("a");
      refquick.href = obj.quicklookUrl;
      refquick.appendChild(quick);
      container.appendChild(refquick);
    }
    var close = document.createElement("div");
    close.id = this._addUID("GPlayerInfoClose");
    close.title = "Fermer la fenêtre";
    var self = this;
    /** Call event function on close click */
    var onCloseClick = function onCloseClick() {
      document.getElementById(self._addUID("GPlayerInfoPanel")).className = "GPlayerInfoPanelClosed";
      var layers = document.getElementsByClassName("GPlayerInfoOpened");
      for (var i = 0; i < layers.length; i++) {
        layers[i].className = "GPlayerInfo";
      }
    };
    if (close.addEventListener) {
      close.addEventListener("click", onCloseClick);
    } else if (close.attachEvent) {
      // internet explorer
      close.attachEvent("onclick", onCloseClick);
    }
    container.appendChild(close);
    var desc = document.createElement("div");
    desc.id = this._addUID("GPlayerInfoDescription");
    desc.innerHTML = obj.description;
    container.appendChild(desc);
    if (obj.metadata) {
      var mtd = document.createElement("div");
      mtd.id = this._addUID("GPlayerInfoMetadata");
      var mtdtitle = document.createElement("div");
      mtdtitle.className = "GPlayerInfoSubtitle";
      mtdtitle.innerHTML = "Métadonnées";
      mtd.appendChild(mtdtitle);
      for (var i = 0; i < obj.metadata.length; i++) {
        var urlmtd = obj.metadata[i].url;
        var mtdlink = document.createElement("div");
        mtdlink.className = "GPlayerInfoLink";
        var refmtd = document.createElement("a");
        refmtd.href = urlmtd;
        refmtd.innerHTML = urlmtd;
        mtdlink.appendChild(refmtd);
        mtd.appendChild(mtdlink);
      }
      if (obj.metadata.length !== 0) {
        container.appendChild(mtd);
      }
    }
    if (obj.legends) {
      var lgd = document.createElement("div");
      lgd.id = this._addUID("GPlayerInfoLegend");
      var lgdtitle = document.createElement("div");
      lgdtitle.className = "GPlayerInfoSubtitle";
      lgdtitle.innerHTML = "Légende";
      lgd.appendChild(lgdtitle);
      var legends = {};
      var maxScale = obj.maxScaleDenominator || 560000000;

      // on crée un tableau temporaire pour ordonner les légendes selon le dénominateur d'échelle
      for (var k = 0; k < obj.legends.length; k++) {
        var minScale = obj.legends[k].minScaleDenominator;
        if (minScale) {
          var s = minScale.toString();
          minScale = Math.round(parseInt(s.substring(0, 3), 10) / 10) * Math.pow(10, s.length - 2);
        } else {
          minScale = 270;
        }
        legends[minScale] = obj.legends[k];
      }
      for (var scale in legends) {
        if (legends.hasOwnProperty(scale)) {
          var urllgd = legends[scale].url;
          // on n'affiche pas les légendes pointant vers "nolegend.jpg"
          if (typeof urllgd === "string" && urllgd.toLowerCase().indexOf("nolegend.jpg") === -1) {
            // TODO GPlayerInfoPopup
            var lgdlink = document.createElement("div");
            lgdlink.className = "GPlayerInfoLink";
            maxScale = legends[scale].maxScaleDenominator || maxScale;
            var reflgd = document.createElement("a");
            reflgd.href = urllgd;
            reflgd.innerHTML = "Du 1/" + scale + " au 1/" + maxScale;
            lgdlink.appendChild(reflgd);
            lgd.appendChild(lgdlink);
          } else {
            delete legends[scale];
          }
        }
      }
      if (Object.keys(legends).length !== 0) {
        container.appendChild(lgd);
      }
    }
    return container;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LayerSwitcherDOM);

/***/ }),

/***/ "./src/packages/Controls/Measures/MeasureAreaDOM.js":
/*!**********************************************************!*\
  !*** ./src/packages/Controls/Measures/MeasureAreaDOM.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var MeasureAreaDOM = {
  /**
  * Add uuid to the tag ID
  * @param {String} id - id selector
  * @returns {String} uid - id selector with an unique id
  */
  _addUID: function _addUID(id) {
    var uid = this._uid ? id + "-" + this._uid : id;
    return uid;
  },
  /**
   * Main container (DOM)
   *
   * @returns {DOMElement} DOM element
   */
  _createMainContainerElement: function _createMainContainerElement() {
    var container = document.createElement("div");
    container.id = this._addUID("GPmeasureArea");
    container.className = "GPwidget gpf-widget gpf-widget-button";
    return container;
  },
  // ################################################################### //
  // ################### Methods of main container ##################### //
  // ################################################################### //

  /**
   * Show control
   * see event !
   *
   * @returns {DOMElement} DOM element
   */
  _createShowMeasureAreaPictoElement: function _createShowMeasureAreaPictoElement() {
    // contexte d'execution
    var context = this;
    var button = document.createElement("button");
    button.id = this._addUID("GPshowMeasureAreaPicto");
    button.className = "GPshowOpen GPshowAdvancedToolPicto gpf-btn gpf-btn-icon gpf-btn-icon-area fr-btn";
    button.title = "Mesurer une surface";
    button.setAttribute("tabindex", "0");
    button.setAttribute("aria-pressed", false);

    // gestionnaire d'evenement :
    // on ouvre le menu de saisie...
    // L'ouverture/Fermeture permet de faire le menage
    // (reinitialisation)
    if (button.addEventListener) {
      button.addEventListener("click", function (e) {
        var status = e.target.ariaPressed === "true";
        e.target.setAttribute("aria-pressed", !status);
        context.onShowMeasureAreaClick(e);
      });
    } else if (button.attachEvent) {
      button.attachEvent("onclick", function (e) {
        var status = e.target.ariaPressed === "true";
        e.target.setAttribute("aria-pressed", !status);
        context.onShowMeasureAreaClick(e);
      });
    }
    return button;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MeasureAreaDOM);

/***/ }),

/***/ "./src/packages/Controls/Measures/Measures.js":
/*!****************************************************!*\
  !*** ./src/packages/Controls/Measures/Measures.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ol_Overlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/Overlay */ "ol/Overlay");
/* harmony import */ var ol_Overlay__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ol_Overlay__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ol_interaction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/interaction */ "ol/interaction");
/* harmony import */ var ol_interaction__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ol_interaction__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ol_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/style */ "ol/style");
/* harmony import */ var ol_style__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ol_style__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ol_layer_Vector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/layer/Vector */ "ol/layer/Vector");
/* harmony import */ var ol_layer_Vector__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ol_layer_Vector__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var ol_source_Vector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/source/Vector */ "ol/source/Vector");
/* harmony import */ var ol_source_Vector__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ol_source_Vector__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Utils/LoggerByDefault */ "./src/packages/Utils/LoggerByDefault.js");
/* harmony import */ var _Utils_Interactions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Utils/Interactions */ "./src/packages/Controls/Utils/Interactions.js");
/* harmony import */ var _LayerSwitcher_LayerSwitcher__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../LayerSwitcher/LayerSwitcher */ "./src/packages/Controls/LayerSwitcher/LayerSwitcher.js");
// import OpenLayers





// import local


// import local with ol dependencies


// Derived from OpenLayers measure example
// http://openlayers.org/en/latest/examples/measure.html

var logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_5__["default"].getLogger("measures");

/**
 * @type {ol.control.Measures}
 * @abstract
 * Measures Tools :
 * - length
 * - aera
 * - azimut
 */
var Measures = {
  // ****************************************************************** //
  // > Default Styles
  // ****************************************************************** //

  /*
   * Pointer
   */
  DEFAULT_POINTER_STYLE: new ol_style__WEBPACK_IMPORTED_MODULE_2__.Circle({
    radius: 5,
    stroke: new ol_style__WEBPACK_IMPORTED_MODULE_2__.Stroke({
      color: "#002A50",
      width: 2
    }),
    fill: new ol_style__WEBPACK_IMPORTED_MODULE_2__.Fill({
      color: "rgba(255, 155, 0, 0.7)"
    })
  }),
  /*
   * Measures style line
   */
  DEFAULT_DRAW_START_STYLE: new ol_style__WEBPACK_IMPORTED_MODULE_2__.Style({
    fill: new ol_style__WEBPACK_IMPORTED_MODULE_2__.Fill({
      color: "rgba(0, 183, 152, 0.2)"
    }),
    stroke: new ol_style__WEBPACK_IMPORTED_MODULE_2__.Stroke({
      color: "#002A50",
      lineDash: [10, 10],
      width: 2
    })
  }),
  /*
   * Measures final style line
   */
  DEFAULT_DRAW_FINISH_STYLE: new ol_style__WEBPACK_IMPORTED_MODULE_2__.Style({
    fill: new ol_style__WEBPACK_IMPORTED_MODULE_2__.Fill({
      color: "rgba(0, 183, 152, 0.3)"
    }),
    stroke: new ol_style__WEBPACK_IMPORTED_MODULE_2__.Stroke({
      color: "#002A50",
      width: 3
    })
  }),
  // ****************************************************************** //
  // > ToolBox : these tools work together
  // ****************************************************************** //
  // sample :
  // tools[name_control][0].(active|instance|map)
  // tools : {
  //      MeasureLength : [
  //          { active : true, instance : [Object MeasureLength], map : "map1" },
  //          { active : true, instance : [Object MeasureLength], map : "map2" }
  //      ],
  //      MeasureArea : [],
  //      MeasureAzimuth : []
  // }
  tools: {
    MeasureLength: [],
    MeasureArea: [],
    MeasureAzimuth: []
  },
  // ****************************************************************** //
  // > Variables
  // ****************************************************************** //

  /**
   * Global measure draw interaction
   * @type {ol.interaction.Draw}
   */
  measureDraw: null,
  /**
   * Global vector source for measure
   * @type {ol.source.Vector}
   */
  measureSource: null,
  /**
   * Global vector layer for measure
   * @type {ol.layer.Vector}
   */
  measureVector: null,
  /**
   * Currently drawn feature.
   * @type {ol.Feature}
   */
  sketch: null,
  /**
   * The measure tooltip element.
   * @type {Element}
   */
  measureTooltipElement: null,
  /**
   * Overlay to show the measurement.
   * @type {ol.Overlay}
   */
  measureTooltip: null,
  /**
   * TODO The help tooltip element.
   * @type {Element}
   */
  helpTooltipElement: null,
  /**
   * TODO Overlay to show the help.
   * @type {ol.Overlay}
   */
  helpTooltip: null,
  // ****************************************************************** //
  // > Methods Public
  // ****************************************************************** //

  /** Desactived Tool Measure */
  clean: function clean() {
    var _class = this.CLASSNAME;
    logger.trace("[" + _class + "] deactived tool !");
    // sur la desactivation de l'outil de mesure
    // on fait un nettoyage des ressources
    // ainsi que le DOM
    this.clearMeasure();
    this.clearMeasureToolTip();
    this.removeMeasureEvents();
    this._pictoContainer.setAttribute("aria-pressed", false);
  },
  // ****************************************************************** //
  // > Methods Events
  // ****************************************************************** //

  /**
   * Handle pointer move.
   *
   * @param {ol.MapBrowserEvent} e - The event.
   */
  onPointerMoveHandler: function onPointerMoveHandler(e) {
    if (e.dragging) {
      return;
    }

    /** @type {ol.Coordinate|undefined} */
    var tooltipCoord = e.coordinate;
    if (this.sketch) {
      var output;
      var geom = this.sketch.getGeometry();
      output = this.format(geom);
      if (geom.getType() === "LineString") {
        tooltipCoord = geom.getLastCoordinate();
      } else if (geom.getType() === "Polygon") {
        tooltipCoord = geom.getInteriorPoint().getCoordinates();
      } else {
        return;
      }
      this.measureTooltipElement.innerHTML = output;
      this.measureTooltip.setPosition(tooltipCoord);
    }
  },
  /**
   * Main program !
   * This method is called by event 'click' on control picto
   *
   * @param {Object} e - HTMLElement
   * @param {String} type - LineString or Polygon
   * @private
   */
  onShowMeasureClick: function onShowMeasureClick(e, type) {
    var map = this.getMap();
    var currentMapId = map.getTargetElement().id;

    // contexte d'execution
    var context = typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : null;
    if (context) {
      // Pour info
      // les objets de mesures ont du code partagé
      // (afin de gerer les interactions entre eux).
      // Dans un mode "modules", on partage cet objet (this.tools) via le contexte
      // d'execution (ex. avec window)
      this.tools = context.gpShareMeasures || {};
    }

    // desactivation des controles de mesures sur la carte courrante
    var mySelf = this.CLASSNAME; // this.constructor.name : pas possible en mode minifié/manglifié !
    for (var className in this.tools) {
      if (this.tools.hasOwnProperty(className)) {
        var measures = this.tools[className];
        for (var i = 0; i < measures.length; i++) {
          var o = measures[i];
          if (o && o.active && className !== mySelf && o.map === currentMapId) {
            o.active = false;
            if (o.instance !== null) {
              // au cas où le controle a été supprimé !
              o.instance.clean();
            }
          }
        }
      }
    }

    // desactivation des autres interactions parasites
    _Utils_Interactions__WEBPACK_IMPORTED_MODULE_6__["default"].unset(map, {
      current: "Measures"
    });
    var opened = this._pictoContainer.ariaPressed;
    if (opened === "true") {
      this.addMeasureEvents();
      this.initMeasureInteraction();
      this.addMeasureInteraction(type);
      for (var j = 0; j < this.tools[mySelf].length; j++) {
        if (this.tools[mySelf][j].map === currentMapId) {
          this.tools[mySelf][j].active = true;
        }
      }
    } else {
      this.clearMeasure();
      this.clearMeasureToolTip();
      this.removeMeasureEvents();
      for (var k = 0; k < this.tools[mySelf].length; k++) {
        if (this.tools[mySelf][k].map === currentMapId) {
          this.tools[mySelf][k].active = false;
        }
      }
    }
  },
  // ****************************************************************** //
  // > Methods not Public
  // ****************************************************************** //

  /**
   * Clear all dom tooltip of length, area or azimut object.
   */
  clearMeasureToolTip: function clearMeasureToolTip() {
    var map = this.getMap();
    if (!map) {
      return;
    }
    var mapContainer = map.getTargetElement();
    // au cas où il y'aurait plusieurs container de carte !
    var overlays = mapContainer.getElementsByClassName("ol-overlaycontainer");
    for (var k = 0; k < overlays.length; k++) {
      var nodes = overlays[k];
      var len = nodes.children.length;
      var nodesToRemove = [];
      for (var i = 0; i < len; i++) {
        var node = nodes.children[i];
        if (node.children.length !== 0) {
          var child = node.children[0];
          if (child.className === "GPmeasureTooltip GPmeasureTooltip-static" || child.className === "GPmeasureTooltip GPmeasureTooltip-measure") {
            nodesToRemove.push(node);
          }
        }
      }
      for (var j = 0; j < nodesToRemove.length; j++) {
        nodes.removeChild(nodesToRemove[j]);
      }
    }
  },
  /**
   * Clear all length, area or azimut object.
   */
  clearMeasure: function clearMeasure() {
    var map = this.getMap();

    // FIXME !?
    // if (this.measureTooltip) {
    //     map.removeOverlay(this.measureTooltip);
    //     this.measureTooltip = null;
    // }

    if (this.measureVector) {
      map.removeLayer(this.measureVector);
      this.measureVector = null;
    }
    if (this.measureDraw) {
      map.removeInteraction(this.measureDraw);
      this.measureDraw = null;
    }
  },
  /**
   * Creates a new measure tooltip
   * FIXME bug d'affichage de la tooltip de saisie en cours si on ne termine pas
   * la saisie  !?
   *
   * @param {ol.Map} map - The Map.
   */
  createMeasureTooltip: function createMeasureTooltip(map) {
    if (this.measureTooltipElement) {
      this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement);
    }
    this.measureTooltipElement = document.createElement("div");
    this.measureTooltipElement.className = "GPmeasureTooltip GPmeasureTooltip-measure";
    this.measureTooltip = new (ol_Overlay__WEBPACK_IMPORTED_MODULE_0___default())({
      element: this.measureTooltipElement,
      stopEvent: false,
      offset: [0, -15],
      positioning: "bottom-center"
    });
    map.addOverlay(this.measureTooltip);
  },
  /**
   * TODO evolution
   * Creates a new help tooltip
   *
   * @param {ol.Map} map - The Map.
   */
  createHelpTooltip: function createHelpTooltip(map) {
    if (this.helpTooltipElement) {
      this.helpTooltipElement.parentNode.removeChild(this.helpTooltipElement);
    }
    this.helpTooltipElement = document.createElement("div");
    this.helpTooltipElement.className = "tooltip hidden";
    this.helpTooltip = new (ol_Overlay__WEBPACK_IMPORTED_MODULE_0___default())({
      element: this.helpTooltipElement,
      stopEvent: false,
      offset: [15, 0],
      positioning: "center-left"
    });
    map.addOverlay(this.helpTooltip);
  },
  /**
   * Creates a style for drawing
   *
   * @param {Object} styles - styles.
   */
  createStylingMeasureInteraction: function createStylingMeasureInteraction(styles) {
    this.options.styles = styles || {};

    // style de depart
    logger.trace("style start", this.options.styles.start);

    // Creation à partir des styles par défaut
    var startStyleOpts = {
      image: Measures.DEFAULT_POINTER_STYLE,
      fill: Measures.DEFAULT_DRAW_START_STYLE.getFill(),
      stroke: Measures.DEFAULT_DRAW_START_STYLE.getStroke()
    };
    // ecrasement à partir des propriétés renseignées
    if (this.options.styles.hasOwnProperty("pointer") && this.options.styles.pointer instanceof Image) {
      startStyleOpts.image = this.options.styles.pointer;
    }
    if (this.options.styles.hasOwnProperty("start") && this.options.styles.start instanceof ol_style__WEBPACK_IMPORTED_MODULE_2__.Style) {
      if (this.options.styles.start.getFill() != null) {
        startStyleOpts.fill = this.options.styles.start.getFill();
      }
      if (this.options.styles.start.getStroke() != null) {
        startStyleOpts.stroke = this.options.styles.start.getStroke();
      }
    }
    this.options.styles.start = new ol_style__WEBPACK_IMPORTED_MODULE_2__.Style(startStyleOpts);

    // style de fin
    logger.trace("style finish", this.options.styles.finish);
    var finishStyleOpts = {
      fill: Measures.DEFAULT_DRAW_FINISH_STYLE.getFill(),
      stroke: Measures.DEFAULT_DRAW_FINISH_STYLE.getStroke()
    };
    // ecrasement à partir des propriétés renseignées
    if (this.options.styles.hasOwnProperty("finish") && this.options.styles.finish instanceof ol_style__WEBPACK_IMPORTED_MODULE_2__.Style) {
      if (this.options.styles.finish.getFill() != null) {
        finishStyleOpts.fill = this.options.styles.finish.getFill();
      }
      if (this.options.styles.finish.getStroke() != null) {
        finishStyleOpts.stroke = this.options.styles.finish.getStroke();
      }
    }
    this.options.styles.finish = new ol_style__WEBPACK_IMPORTED_MODULE_2__.Style(finishStyleOpts);
  },
  /**
   * Add the measure interaction
   *
   * @param {String} type - LineString or Polygon.
   */
  addMeasureInteraction: function addMeasureInteraction(type) {
    var map = this.getMap();

    // Creates and adds the interaction
    var self = this;
    this.measureDraw = new ol_interaction__WEBPACK_IMPORTED_MODULE_1__.Draw({
      source: this.measureSource,
      // condition : permet de gerer la suppression des derniers points saisis
      condition: function condition(event) {
        if (event.originalEvent.ctrlKey) {
          if (self.sketch) {
            this.removeLastPoint();
          }
          return false;
        }
        return true;
      },
      type: type,
      style: this.options.styles.start || Measures.DEFAULT_DRAW_START_STYLE
    });
    this.measureDraw.setProperties({
      name: "Measures",
      source: this
    });
    map.addInteraction(this.measureDraw);

    // Create tooltips
    this.createMeasureTooltip(map);

    // Event start measuring
    this.measureDraw.on("drawstart", function (evt) {
      // set sketch
      self.sketch = evt.feature;
    });

    // Event end measuring
    this.measureDraw.on("drawend", function () {
      // FIXME MaJ de la tooltip en mode mobile !
      if (self.sketch) {
        var output;
        var tooltipCoord;
        var geom = self.sketch.getGeometry();
        output = self.format(geom);
        if (geom.getType() === "LineString") {
          tooltipCoord = geom.getLastCoordinate();
        } else if (geom.getType() === "Polygon") {
          tooltipCoord = geom.getInteriorPoint().getCoordinates();
        } else {
          return;
        }
        self.measureTooltipElement.innerHTML = output;
        self.measureTooltip.setPosition(tooltipCoord);
      }
      self.measureTooltipElement.className = "GPmeasureTooltip GPmeasureTooltip-static";
      self.measureTooltip.setOffset([0, -7]);

      // unset sketch
      self.sketch = null;
      // unset tooltip so that a new one can be created
      self.measureTooltipElement = null;
      self.createMeasureTooltip(map);
    });
  },
  /**
   * Init the measure interaction
   */
  initMeasureInteraction: function initMeasureInteraction() {
    var _this = this;
    var map = this.getMap();
    this.measureSource = new (ol_source_Vector__WEBPACK_IMPORTED_MODULE_4___default())();
    this.measureVector = new (ol_layer_Vector__WEBPACK_IMPORTED_MODULE_3___default())({
      source: this.measureSource,
      style: this.options.styles.finish || Measures.DEFAULT_DRAW_FINISH_STYLE
    });

    // on rajoute le champ gpResultLayerId permettant d'identifier une couche crée par le composant.
    this.measureVector.gpResultLayerId = "measure";
    map.addLayer(this.measureVector);

    // Si un layer switcher est présent dans la carte, on lui affecte des informations pour cette couche
    map.getControls().forEach(function (control) {
      if (control instanceof _LayerSwitcher_LayerSwitcher__WEBPACK_IMPORTED_MODULE_7__["default"]) {
        // un layer switcher est présent dans la carte
        var layerId = _this.measureVector.gpLayerId;
        // on n'ajoute des informations que s'il n'y en a pas déjà (si le titre est le numéro par défaut)
        if (control._layers[layerId].title === layerId) {
          control.addLayer(_this.measureVector, {
            title: _this.options.layerDescription.title,
            description: _this.options.layerDescription.description
          });
        }
      }
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Measures);

/***/ }),

/***/ "./src/packages/Controls/ToolBoxMeasure/MeasureToolBox.js":
/*!****************************************************************!*\
  !*** ./src/packages/Controls/ToolBoxMeasure/MeasureToolBox.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CSS_Controls_ToolBoxMeasure_GPFtoolBoxMeasure_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../CSS/Controls/ToolBoxMeasure/GPFtoolBoxMeasure.css */ "./src/packages/CSS/Controls/ToolBoxMeasure/GPFtoolBoxMeasure.css");
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Utils/LoggerByDefault */ "./src/packages/Utils/LoggerByDefault.js");
/* harmony import */ var _Utils_Helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utils/Helper */ "./src/packages/Utils/Helper.js");
/* harmony import */ var _Utils_SelectorID__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Utils/SelectorID */ "./src/packages/Utils/SelectorID.js");
/* harmony import */ var _MeasureToolBoxDOM__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MeasureToolBoxDOM */ "./src/packages/Controls/ToolBoxMeasure/MeasureToolBoxDOM.js");
// import CSS

// import "../../CSS/Controls/ToolBoxMeasure/GPFtoolBoxMeasureStyle.css";
// import local



// DOM

var logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_1__["default"].getLogger("toolbox");

/**
 * @type {ol.control.MeasureToolBox}
 * MeasureToolBox - Boite à outils (ToolBox) pour les outils de mesures.
 * - distance
 * - aire
 * - azimut
 */
var MeasureToolBox = {
  /**
   * liste des uid/map (pour chaque toolbox)
   * { map : uid }
   * Ex. { "map1" : 465456456486845 }
   */
  _toolbox: {},
  /**
   * Ajout d'un controle dans la ToolBox.
   * Creation de la toolbox si besoin...
   *
   * @param {ol.Map} map - map
   * @param {ol.control.Control} ctrl - objet à ajouter
   */
  add: function add(map, ctrl) {
    logger.trace("ToolBox.add()", ctrl);
    if (!map) {
      logger.trace("map doesn't exist !?");
      return;
    }

    // contexte d'execution
    var context = typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : null;
    if (context) {
      // Pour info
      // l'objet ToolBox devrait être partagé avec les outils de mesures...,
      // mais, ce n'est pas le cas pour le mode modules cad un module par extension.
      // c'est pourquoi, on l'enregistre dans le contexte, qui lui est partagé (ex. window)
      this._toolbox = context.gpShareMeasureToolBox || {};
    }
    var mapContainer = map.getTargetElement();
    var mapDocument = mapContainer.ownerDocument;
    var mapId = mapContainer.id;
    if (!this._toolbox || Object.keys(this._toolbox).length === 0) {
      this._toolbox = {};
      this._toolbox[mapId] = _Utils_SelectorID__WEBPACK_IMPORTED_MODULE_3__["default"].generate();
    } else {
      if (!this._toolbox[mapId]) {
        this._toolbox[mapId] = _Utils_SelectorID__WEBPACK_IMPORTED_MODULE_3__["default"].generate();
      }
    }
    var uid = this._toolbox[mapId];
    if (!mapDocument.getElementById(this.getToolBoxID(uid))) {
      logger.trace("create toolbox !");
      // creation et ajout de la toolbox sur la map
      var toolboxContainer = this._createToolBoxContainerElement(uid);
      toolboxContainer.style.pointerEvents = "auto"; // ajout pour ol6
      var overlaysContainer = mapContainer.getElementsByClassName("ol-overlaycontainer-stopevent");
      overlaysContainer[0].appendChild(toolboxContainer);
      // mapContainer.appendChild(toolboxContainer);
    }

    // ajout du widget dans la toolbox
    var widgetContainer = mapDocument.getElementById(this.getWidgetID(uid));
    ctrl.setTarget(widgetContainer);
    if (context) {
      // Pour info
      // on partage (enregistre) l'objet ToolBox dans le contexte d'execution !
      context.gpShareMeasureToolBox = this._toolbox;
    }
    logger.trace("add control to toolbox !");
  }
};
_Utils_Helper__WEBPACK_IMPORTED_MODULE_2__["default"].assign(MeasureToolBox, _MeasureToolBoxDOM__WEBPACK_IMPORTED_MODULE_4__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MeasureToolBox);

/***/ }),

/***/ "./src/packages/Controls/ToolBoxMeasure/MeasureToolBoxDOM.js":
/*!*******************************************************************!*\
  !*** ./src/packages/Controls/ToolBoxMeasure/MeasureToolBoxDOM.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var MeasureToolBoxDOM = {
  _toolboxId: "GPtoolbox-measure-main",
  _buttonId: "GPtoolbox-measure-button",
  _widgetId: "GPtoolbox-measure-widget",
  /**
  * get toolBox ID
  * @param {Number} uid - uid
  * @returns {String} id selector unique
  */
  getToolBoxID: function getToolBoxID(uid) {
    return uid ? this._toolboxId + "-" + uid : this._toolboxId;
  },
  /**
  * get button ID
  * @param {Number} uid - uid
  * @returns {String} id selector unique
  */
  getButtonID: function getButtonID(uid) {
    return uid ? this._buttonId + "-" + uid : this._buttonId;
  },
  /**
  * get toolBox Container for widget
  * @param {Number} uid - uid
  * @returns {String} id selector unique
  */
  getWidgetID: function getWidgetID(uid) {
    return uid ? this._widgetId + "-" + uid : this._widgetId;
  },
  /**
   * Main container (DOM)
   * @param {Number} uid - uid
   * @returns {DOMElement} DOM element
   */
  _createToolBoxContainerElement: function _createToolBoxContainerElement(uid) {
    // <div id="GPtoolbox-measure-main">
    //   <button id="GPtoolbox-measure-button">&#9776;</button>
    //   <div id="GPtoolbox-measure-widget">
    //     <!-- HERE : widgets tools measures -->
    //   </div>
    // </div>
    var container = document.createElement("div");
    container.id = this.getToolBoxID(uid);
    container.className = "GPshowAdvancedToolPicto";
    var button = document.createElement("button");
    button.id = this.getButtonID(uid);
    button.className = "GPshowOpen GPshowAdvancedToolPicto GPshowToolBoxPicto gpf-btn gpf-btn-icon-toolbox fr-btn";
    button.setAttribute("tabindex", "0");
    button.setAttribute("aria-pressed", false);
    var self = this;
    button.addEventListener("click", function (e) {
      var status = e.target.ariaPressed === "true";
      e.target.setAttribute("aria-pressed", !status);
      this.blur(); // permet de perdre le focus !
      var widget = document.getElementById(self.getWidgetID(uid));
      if (widget.style.display === "block") {
        widget.style.display = "none";
      } else {
        widget.style.display = "block";
      }
    });
    container.appendChild(button);
    var widget = document.createElement("div");
    widget.id = this.getWidgetID(uid);
    widget.addEventListener("click", function () {

      /*
          e.preventDefault();
           // FIXME desactiver tous les outils sur
          // l'ouverture/fermeture de la toolbox ?
           var current = e.target.parentNode.getAttribute("for");
          var widgets = this.querySelectorAll("div > input");
          for (var i = 0; i < widgets.length; i++) {
              var id = widgets[i].id;
               if (document.getElementById(id) &&
                  document.getElementById(id).checked &&
                  document.querySelector("#" + id + " + label")) {
                      document.querySelector("#" + id + " + label").click();
                      // document.getElementById(id).checked = true;
              }
               if (current === id && widgets[i].checked) {
                  widgets[i].checked = false;
              } else if (current === id && !widgets[i].checked) {
                  widgets[i].checked = true;
              }
          }
      */
    }, false);
    container.appendChild(widget);
    return container;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MeasureToolBoxDOM);

/***/ }),

/***/ "./src/packages/Controls/Utils/Interactions.js":
/*!*****************************************************!*\
  !*** ./src/packages/Controls/Utils/Interactions.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ol_control_Control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/control/Control */ "ol/control/Control");
/* harmony import */ var ol_control_Control__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ol_control_Control__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ol_interaction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/interaction */ "ol/interaction");
/* harmony import */ var ol_interaction__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ol_interaction__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utils/LoggerByDefault */ "./src/packages/Utils/LoggerByDefault.js");
/* harmony import */ var _Utils_Helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Utils/Helper */ "./src/packages/Utils/Helper.js");
// import OpenLayers


// import local


var logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_2__["default"].getLogger("interactions");

/**
 * @private
 * @description
 * Pourquoi et comment l'utiliser ?
 * Cette classe permet de gérer les interactions entre chaque extension.
 * Une extension qui active une interaction avec la carte, doit desactiver
 * les autres interactions issues d'autre extensions.
 * La désactivation d'une interaction s'accompagne d'actions telles que
 * le nettoyage des dessins, l'état du composant graphique, ...
 *
 * Ex
 * // desactive toutes les interactions avec l'opération par defaut : clean
 * Interactions.unset(map);
 * // desactive les interactions sauf celles de Drawing. On execute des
 * // operations particulieres : status, collapse et message
 * Interactions.unset(map, {
 *    current : "Drawing",
 *    status : false,
 *    collapse : true,
 *    messsage : ["WARNING", "Ceci est un avertissement !"]
 * });
 *
 * Dans le code de l'extension, il faut placer des informations dans l'interaction :
 * interaction.setProperties({
 *     name : "Drawing",
 *     source : this
 * });
 */
var Interactions = {
  /**
   * Liste des extensions qui utilisent le mécanisme des interactions
   */
  _extensions: ["Measures", "ElevationPath", "Drawing"],
  /**
   * Options par defaut
   * - current : ex. "Drawing"
   *       c'est l'extension qui demande la desactivation des autres interactions.
   *       Par defaut, toutes les interactions sont desactivées.
   * - clean :
   *       c'est la suppression des interactions, des dessins de la carte,
   *       ainsi que la reinitialisation de l'état graphique.
   *       Les extensions doivent implementer la méthode 'clean()'.
   *       Par defaut, tous les dessins sont supprimés
   */
  _options: {
    current: null,
    clean: null
  },
  /**
   * Permet de desactive les interactions (Draw) de la carte pour les extensions,
   * sauf l'interaction courrante (si elle est renseignée avec l'option 'current').
   * Il est possible d'ajouter des fonctionnalités via les options.
   * Par defaut, l'option 'clean' est renseignée...
   *
   * @param {Object} map - the map
   * @param {Object} options - options
   */
  unset: function unset(map, options) {
    logger.trace("unset()");
    var opts = {};
    _Utils_Helper__WEBPACK_IMPORTED_MODULE_3__["default"].mergeParams(opts, this._options);
    _Utils_Helper__WEBPACK_IMPORTED_MODULE_3__["default"].mergeParams(opts, options);
    var interactions = map.getInteractions().getArray();
    for (var i = 0; i < interactions.length; i++) {
      if (interactions[i].getActive() && (interactions[i] instanceof ol_interaction__WEBPACK_IMPORTED_MODULE_1__.Draw || interactions[i] instanceof ol_interaction__WEBPACK_IMPORTED_MODULE_1__.Select || interactions[i] instanceof ol_interaction__WEBPACK_IMPORTED_MODULE_1__.Modify)) {
        var prop = interactions[i].getProperties();
        var name = prop.name;
        if (typeof name !== "undefined" && this._extensions.indexOf(name) > -1) {
          // doit on desactiver l'interaction courrante ?
          if (opts.current && opts.current === name) {
            continue;
          }
          interactions[i].setActive(false);
          // instance de l'extension
          var source = prop.source;
          if (typeof source !== "undefined" && source instanceof (ol_control_Control__WEBPACK_IMPORTED_MODULE_0___default())) {
            // opérations sur le composant graphique
            for (var action in opts) {
              if (opts.hasOwnProperty(action)) {
                if (action === "current") {
                  continue;
                }
                if (typeof source[action] === "function") {
                  var args = Array.isArray(opts[action]) ? opts[action] : [opts[action]];
                  source[action].apply(source, args);
                }
              }
            }
          }
        } else {
          interactions[i].setActive(false);
        }
      }
    }
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Interactions);

/***/ }),

/***/ "./src/packages/Utils/Helper.js":
/*!**************************************!*\
  !*** ./src/packages/Utils/Helper.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/**
* @module Helper
* @alias module:~utils/HelperUtils
* @description
* ...
*
* @example
* import HelperUtils from "gpf-ext-ol/utils/HelperUtils"
* ou 
* import {HelperUtils} from "gpf-ext-ol
* 
* HelperUtils.detectSupport();
* HelperUtils.assign();
* HelperUtils.mergeParams();
*/
var Helper = {
  /**
   * this method is called by the constructor.
   * this information is useful to switch to touch mode.
   * Detection : test for desktop or tactile
   *
   * @function detectSupport
   * @returns {Boolean} isDesktop - true for desktop userAgent, false for mobile
   */
  detectSupport: function detectSupport() {
    var isDesktop = true;
    var userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.indexOf("iphone") !== -1 || userAgent.indexOf("ipod") !== -1 || userAgent.indexOf("ipad") !== -1 || userAgent.indexOf("android") !== -1 || userAgent.indexOf("mobile") !== -1 || userAgent.indexOf("blackberry") !== -1 || userAgent.indexOf("tablet") !== -1 || userAgent.indexOf("phone") !== -1 || userAgent.indexOf("touch") !== -1) {
      isDesktop = false;
    }
    if (userAgent.indexOf("msie") !== -1 || userAgent.indexOf("trident") !== -1) {
      isDesktop = true;
    }
    return isDesktop;
  },
  /**
   *  Copies all source object members to dest
   *
   * @function assign
   * @param {Object} dest - destination object where properties and method will be copied
   * @param {Object} source - source object from which properties and method will be copied
   * @returns {Object} dest
   */
  assign: function assign(dest, source) {
    dest = dest || {};
    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        dest[prop] = source[prop];
      }
    }
    return dest;
  },
  /**
   * Merge two objects parameters (deeper than assign)
   *
   * @function mergeParams
   * @param {Object} dest     - destination object where properties and method will be merge
   * @param {Object} source   - source object from which properties and method will be merge
   * @param {Boolean} replace - replace destination value by source if exists or not (true by default)
   */
  mergeParams: function mergeParams(dest, source, replace) {
    if (!dest || !source) {
      return;
    }
    if (typeof replace === "undefined") {
      replace = true;
    }
    for (var param in source) {
      if (source.hasOwnProperty(param)) {
        if (_typeof(source[param]) === "object") {
          if (dest.hasOwnProperty(param)) {
            this.mergeParams(dest[param], source[param], replace);
          } else {
            dest[param] = source[param];
          }
        } else {
          if (dest.hasOwnProperty(param)) {
            if (replace) {
              dest[param] = source[param];
            }
          } else {
            dest[param] = source[param];
          }
        }
      }
    }
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Helper);

/***/ }),

/***/ "./src/packages/Utils/LoggerByDefault.js":
/*!***********************************************!*\
  !*** ./src/packages/Utils/LoggerByDefault.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var loglevel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! loglevel */ "./node_modules/loglevel/lib/loglevel.js");
/* harmony import */ var loglevel__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(loglevel__WEBPACK_IMPORTED_MODULE_0__);


/**
 * @module LoggerByDefault
 * @alias module:~utils/Logger
 * @description
 * ...
 *
 * @example
 * import Logger from "gpf-ext-ol/utils/LoggerByDefault"
 * ou 
 * import {Logger} from "gpf-ext-ol
 * 
 * Logger.getLogger();
 * Logger.disableAll();
 * Logger.enableAll();
 */
var LoggerByDefault = {
  /**
   * creation d'un logger statique
   *
   * @function getLogger
   * @param {String} [name="default"] - the logger name
   * @returns {Object} logger
   */
  getLogger: function getLogger(name) {
    // on définit process si non défini dans l'environnement
    if (typeof process === "undefined") {
      var process = {};
      process.env = {
        VERBOSE: false
      };
    }
    process.env.VERBOSE ? loglevel__WEBPACK_IMPORTED_MODULE_0__.enableAll() : loglevel__WEBPACK_IMPORTED_MODULE_0__.disableAll();
    var logname = name || "default";
    return loglevel__WEBPACK_IMPORTED_MODULE_0__.getLogger(logname);
  },
  /**
   * desactive tous les loggers
   * @function disableAll
   */
  disableAll: function disableAll() {
    var loggers = loglevel__WEBPACK_IMPORTED_MODULE_0__.getLoggers();
    for (var key in loggers) {
      if (Object.hasOwnProperty.call(loggers, key)) {
        var logger = loggers[key];
        logger.disableAll();
      }
    }
  },
  /**
   * active tous les loggers
   * @function enableAll
   */
  enableAll: function enableAll() {
    var loggers = loglevel__WEBPACK_IMPORTED_MODULE_0__.getLoggers();
    for (var key in loggers) {
      if (Object.hasOwnProperty.call(loggers, key)) {
        var logger = loggers[key];
        logger.enableAll();
      }
    }
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LoggerByDefault);

/***/ }),

/***/ "./src/packages/Utils/SelectorID.js":
/*!******************************************!*\
  !*** ./src/packages/Utils/SelectorID.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @module SelectorID
 * @alias module:~utils/SelectorID
 * @private
 * @description
 * formalisme d'un tag ID :
 * -> NAME(_ORDER)-1460636385836
 *
 * @example
 * Ex.
 *   GProutePoints-1460636385836
 *   GProutePoint_10-1460636385836
 */
var SelectorID = {
  /**
   * Construction d'un identifiant statique basé sur le timestamp,
   * et qui s'incremente de +1 à chaque appel
   * @function generate
   */
  generate: function () {
    var timestamp = Math.floor(Date.now());
    return function () {
      return timestamp++;
    };
  }(),
  /**
   * nom du tag
   * @function name
   * @param {String} id - the id
   * @returns {String} index
   */
  name: function name(id) {
    var name = null;
    var i = id.lastIndexOf("-");
    if (i === -1) {
      name = id;
    } else {
      name = id.substring(0, i);
    }
    return name;
  },
  /**
   * numero d'identifiant du tag
   *
   * @function index
   * @param {String} id - the id
   * @returns {String} index
   */
  index: function index(id) {
    var index = null;
    var name = this.name(id);
    // if (name !== id) {
    var i = name.lastIndexOf("_");
    if (i !== -1) {
      index = name.substring(i + 1);
    }
    // }

    return index;
  },
  /**
   * uuid du tag
   *
   * @function uuid
   * @param {String} id - the id
   * @returns {String} uuid
   */
  uuid: function uuid(id) {
    var uuid = null;
    var i = id.lastIndexOf("-");
    if (i !== -1) {
      uuid = parseInt(id.substring(i + 1), 10);
    }
    return uuid;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SelectorID);

/***/ }),

/***/ "./node_modules/loglevel/lib/loglevel.js":
/*!***********************************************!*\
  !*** ./node_modules/loglevel/lib/loglevel.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
* loglevel - https://github.com/pimterry/loglevel
*
* Copyright (c) 2013 Tim Perry
* Licensed under the MIT license.
*/
(function (root, definition) {
    "use strict";
    if (true) {
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(this, function () {
    "use strict";

    // Slightly dubious tricks to cut down minimized file size
    var noop = function() {};
    var undefinedType = "undefined";
    var isIE = (typeof window !== undefinedType) && (typeof window.navigator !== undefinedType) && (
        /Trident\/|MSIE /.test(window.navigator.userAgent)
    );

    var logMethods = [
        "trace",
        "debug",
        "info",
        "warn",
        "error"
    ];

    var _loggersByName = {};
    var defaultLogger = null;

    // Cross-browser bind equivalent that works at least back to IE6
    function bindMethod(obj, methodName) {
        var method = obj[methodName];
        if (typeof method.bind === 'function') {
            return method.bind(obj);
        } else {
            try {
                return Function.prototype.bind.call(method, obj);
            } catch (e) {
                // Missing bind shim or IE8 + Modernizr, fallback to wrapping
                return function() {
                    return Function.prototype.apply.apply(method, [obj, arguments]);
                };
            }
        }
    }

    // Trace() doesn't print the message in IE, so for that case we need to wrap it
    function traceForIE() {
        if (console.log) {
            if (console.log.apply) {
                console.log.apply(console, arguments);
            } else {
                // In old IE, native console methods themselves don't have apply().
                Function.prototype.apply.apply(console.log, [console, arguments]);
            }
        }
        if (console.trace) console.trace();
    }

    // Build the best logging method possible for this env
    // Wherever possible we want to bind, not wrap, to preserve stack traces
    function realMethod(methodName) {
        if (methodName === 'debug') {
            methodName = 'log';
        }

        if (typeof console === undefinedType) {
            return false; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives
        } else if (methodName === 'trace' && isIE) {
            return traceForIE;
        } else if (console[methodName] !== undefined) {
            return bindMethod(console, methodName);
        } else if (console.log !== undefined) {
            return bindMethod(console, 'log');
        } else {
            return noop;
        }
    }

    // These private functions always need `this` to be set properly

    function replaceLoggingMethods() {
        /*jshint validthis:true */
        var level = this.getLevel();

        // Replace the actual methods.
        for (var i = 0; i < logMethods.length; i++) {
            var methodName = logMethods[i];
            this[methodName] = (i < level) ?
                noop :
                this.methodFactory(methodName, level, this.name);
        }

        // Define log.log as an alias for log.debug
        this.log = this.debug;

        // Return any important warnings.
        if (typeof console === undefinedType && level < this.levels.SILENT) {
            return "No console available for logging";
        }
    }

    // In old IE versions, the console isn't present until you first open it.
    // We build realMethod() replacements here that regenerate logging methods
    function enableLoggingWhenConsoleArrives(methodName) {
        return function () {
            if (typeof console !== undefinedType) {
                replaceLoggingMethods.call(this);
                this[methodName].apply(this, arguments);
            }
        };
    }

    // By default, we use closely bound real methods wherever possible, and
    // otherwise we wait for a console to appear, and then try again.
    function defaultMethodFactory(methodName, _level, _loggerName) {
        /*jshint validthis:true */
        return realMethod(methodName) ||
               enableLoggingWhenConsoleArrives.apply(this, arguments);
    }

    function Logger(name, factory) {
      // Private instance variables.
      var self = this;
      /**
       * The level inherited from a parent logger (or a global default). We
       * cache this here rather than delegating to the parent so that it stays
       * in sync with the actual logging methods that we have installed (the
       * parent could change levels but we might not have rebuilt the loggers
       * in this child yet).
       * @type {number}
       */
      var inheritedLevel;
      /**
       * The default level for this logger, if any. If set, this overrides
       * `inheritedLevel`.
       * @type {number|null}
       */
      var defaultLevel;
      /**
       * A user-specific level for this logger. If set, this overrides
       * `defaultLevel`.
       * @type {number|null}
       */
      var userLevel;

      var storageKey = "loglevel";
      if (typeof name === "string") {
        storageKey += ":" + name;
      } else if (typeof name === "symbol") {
        storageKey = undefined;
      }

      function persistLevelIfPossible(levelNum) {
          var levelName = (logMethods[levelNum] || 'silent').toUpperCase();

          if (typeof window === undefinedType || !storageKey) return;

          // Use localStorage if available
          try {
              window.localStorage[storageKey] = levelName;
              return;
          } catch (ignore) {}

          // Use session cookie as fallback
          try {
              window.document.cookie =
                encodeURIComponent(storageKey) + "=" + levelName + ";";
          } catch (ignore) {}
      }

      function getPersistedLevel() {
          var storedLevel;

          if (typeof window === undefinedType || !storageKey) return;

          try {
              storedLevel = window.localStorage[storageKey];
          } catch (ignore) {}

          // Fallback to cookies if local storage gives us nothing
          if (typeof storedLevel === undefinedType) {
              try {
                  var cookie = window.document.cookie;
                  var cookieName = encodeURIComponent(storageKey);
                  var location = cookie.indexOf(cookieName + "=");
                  if (location !== -1) {
                      storedLevel = /^([^;]+)/.exec(
                          cookie.slice(location + cookieName.length + 1)
                      )[1];
                  }
              } catch (ignore) {}
          }

          // If the stored level is not valid, treat it as if nothing was stored.
          if (self.levels[storedLevel] === undefined) {
              storedLevel = undefined;
          }

          return storedLevel;
      }

      function clearPersistedLevel() {
          if (typeof window === undefinedType || !storageKey) return;

          // Use localStorage if available
          try {
              window.localStorage.removeItem(storageKey);
          } catch (ignore) {}

          // Use session cookie as fallback
          try {
              window.document.cookie =
                encodeURIComponent(storageKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
          } catch (ignore) {}
      }

      function normalizeLevel(input) {
          var level = input;
          if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
              level = self.levels[level.toUpperCase()];
          }
          if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
              return level;
          } else {
              throw new TypeError("log.setLevel() called with invalid level: " + input);
          }
      }

      /*
       *
       * Public logger API - see https://github.com/pimterry/loglevel for details
       *
       */

      self.name = name;

      self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,
          "ERROR": 4, "SILENT": 5};

      self.methodFactory = factory || defaultMethodFactory;

      self.getLevel = function () {
          if (userLevel != null) {
            return userLevel;
          } else if (defaultLevel != null) {
            return defaultLevel;
          } else {
            return inheritedLevel;
          }
      };

      self.setLevel = function (level, persist) {
          userLevel = normalizeLevel(level);
          if (persist !== false) {  // defaults to true
              persistLevelIfPossible(userLevel);
          }

          // NOTE: in v2, this should call rebuild(), which updates children.
          return replaceLoggingMethods.call(self);
      };

      self.setDefaultLevel = function (level) {
          defaultLevel = normalizeLevel(level);
          if (!getPersistedLevel()) {
              self.setLevel(level, false);
          }
      };

      self.resetLevel = function () {
          userLevel = null;
          clearPersistedLevel();
          replaceLoggingMethods.call(self);
      };

      self.enableAll = function(persist) {
          self.setLevel(self.levels.TRACE, persist);
      };

      self.disableAll = function(persist) {
          self.setLevel(self.levels.SILENT, persist);
      };

      self.rebuild = function () {
          if (defaultLogger !== self) {
              inheritedLevel = normalizeLevel(defaultLogger.getLevel());
          }
          replaceLoggingMethods.call(self);

          if (defaultLogger === self) {
              for (var childName in _loggersByName) {
                _loggersByName[childName].rebuild();
              }
          }
      };

      // Initialize all the internal levels.
      inheritedLevel = normalizeLevel(
          defaultLogger ? defaultLogger.getLevel() : "WARN"
      );
      var initialLevel = getPersistedLevel();
      if (initialLevel != null) {
          userLevel = normalizeLevel(initialLevel);
      }
      replaceLoggingMethods.call(self);
    }

    /*
     *
     * Top-level API
     *
     */

    defaultLogger = new Logger();

    defaultLogger.getLogger = function getLogger(name) {
        if ((typeof name !== "symbol" && typeof name !== "string") || name === "") {
            throw new TypeError("You must supply a name when creating a logger.");
        }

        var logger = _loggersByName[name];
        if (!logger) {
            logger = _loggersByName[name] = new Logger(
                name,
                defaultLogger.methodFactory
            );
        }
        return logger;
    };

    // Grab the current global log variable in case of overwrite
    var _log = (typeof window !== undefinedType) ? window.log : undefined;
    defaultLogger.noConflict = function() {
        if (typeof window !== undefinedType &&
               window.log === defaultLogger) {
            window.log = _log;
        }

        return defaultLogger;
    };

    defaultLogger.getLoggers = function getLoggers() {
        return _loggersByName;
    };

    // ES6 default export, for compatibility
    defaultLogger['default'] = defaultLogger;

    return defaultLogger;
}));


/***/ }),

/***/ "./src/packages/CSS/Controls/LayerSwitcher/GPFlayerSwitcher.css":
/*!**********************************************************************!*\
  !*** ./src/packages/CSS/Controls/LayerSwitcher/GPFlayerSwitcher.css ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/packages/CSS/Controls/Measures/GPFmeasureArea.css":
/*!***************************************************************!*\
  !*** ./src/packages/CSS/Controls/Measures/GPFmeasureArea.css ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/packages/CSS/Controls/ToolBoxMeasure/GPFtoolBoxMeasure.css":
/*!************************************************************************!*\
  !*** ./src/packages/CSS/Controls/ToolBoxMeasure/GPFtoolBoxMeasure.css ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/sortablejs/modular/sortable.esm.js":
/*!*********************************************************!*\
  !*** ./node_modules/sortablejs/modular/sortable.esm.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MultiDrag: () => (/* binding */ MultiDragPlugin),
/* harmony export */   Sortable: () => (/* binding */ Sortable),
/* harmony export */   Swap: () => (/* binding */ SwapPlugin),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**!
 * Sortable 1.15.2
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }
  return _typeof(obj);
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var version = "1.15.2";

function userAgent(pattern) {
  if (typeof window !== 'undefined' && window.navigator) {
    return !! /*@__PURE__*/navigator.userAgent.match(pattern);
  }
}
var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
var Edge = userAgent(/Edge/i);
var FireFox = userAgent(/firefox/i);
var Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
var IOS = userAgent(/iP(ad|od|hone)/i);
var ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i);

var captureMode = {
  capture: false,
  passive: false
};
function on(el, event, fn) {
  el.addEventListener(event, fn, !IE11OrLess && captureMode);
}
function off(el, event, fn) {
  el.removeEventListener(event, fn, !IE11OrLess && captureMode);
}
function matches( /**HTMLElement*/el, /**String*/selector) {
  if (!selector) return;
  selector[0] === '>' && (selector = selector.substring(1));
  if (el) {
    try {
      if (el.matches) {
        return el.matches(selector);
      } else if (el.msMatchesSelector) {
        return el.msMatchesSelector(selector);
      } else if (el.webkitMatchesSelector) {
        return el.webkitMatchesSelector(selector);
      }
    } catch (_) {
      return false;
    }
  }
  return false;
}
function getParentOrHost(el) {
  return el.host && el !== document && el.host.nodeType ? el.host : el.parentNode;
}
function closest( /**HTMLElement*/el, /**String*/selector, /**HTMLElement*/ctx, includeCTX) {
  if (el) {
    ctx = ctx || document;
    do {
      if (selector != null && (selector[0] === '>' ? el.parentNode === ctx && matches(el, selector) : matches(el, selector)) || includeCTX && el === ctx) {
        return el;
      }
      if (el === ctx) break;
      /* jshint boss:true */
    } while (el = getParentOrHost(el));
  }
  return null;
}
var R_SPACE = /\s+/g;
function toggleClass(el, name, state) {
  if (el && name) {
    if (el.classList) {
      el.classList[state ? 'add' : 'remove'](name);
    } else {
      var className = (' ' + el.className + ' ').replace(R_SPACE, ' ').replace(' ' + name + ' ', ' ');
      el.className = (className + (state ? ' ' + name : '')).replace(R_SPACE, ' ');
    }
  }
}
function css(el, prop, val) {
  var style = el && el.style;
  if (style) {
    if (val === void 0) {
      if (document.defaultView && document.defaultView.getComputedStyle) {
        val = document.defaultView.getComputedStyle(el, '');
      } else if (el.currentStyle) {
        val = el.currentStyle;
      }
      return prop === void 0 ? val : val[prop];
    } else {
      if (!(prop in style) && prop.indexOf('webkit') === -1) {
        prop = '-webkit-' + prop;
      }
      style[prop] = val + (typeof val === 'string' ? '' : 'px');
    }
  }
}
function matrix(el, selfOnly) {
  var appliedTransforms = '';
  if (typeof el === 'string') {
    appliedTransforms = el;
  } else {
    do {
      var transform = css(el, 'transform');
      if (transform && transform !== 'none') {
        appliedTransforms = transform + ' ' + appliedTransforms;
      }
      /* jshint boss:true */
    } while (!selfOnly && (el = el.parentNode));
  }
  var matrixFn = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  /*jshint -W056 */
  return matrixFn && new matrixFn(appliedTransforms);
}
function find(ctx, tagName, iterator) {
  if (ctx) {
    var list = ctx.getElementsByTagName(tagName),
      i = 0,
      n = list.length;
    if (iterator) {
      for (; i < n; i++) {
        iterator(list[i], i);
      }
    }
    return list;
  }
  return [];
}
function getWindowScrollingElement() {
  var scrollingElement = document.scrollingElement;
  if (scrollingElement) {
    return scrollingElement;
  } else {
    return document.documentElement;
  }
}

/**
 * Returns the "bounding client rect" of given element
 * @param  {HTMLElement} el                       The element whose boundingClientRect is wanted
 * @param  {[Boolean]} relativeToContainingBlock  Whether the rect should be relative to the containing block of (including) the container
 * @param  {[Boolean]} relativeToNonStaticParent  Whether the rect should be relative to the relative parent of (including) the contaienr
 * @param  {[Boolean]} undoScale                  Whether the container's scale() should be undone
 * @param  {[HTMLElement]} container              The parent the element will be placed in
 * @return {Object}                               The boundingClientRect of el, with specified adjustments
 */
function getRect(el, relativeToContainingBlock, relativeToNonStaticParent, undoScale, container) {
  if (!el.getBoundingClientRect && el !== window) return;
  var elRect, top, left, bottom, right, height, width;
  if (el !== window && el.parentNode && el !== getWindowScrollingElement()) {
    elRect = el.getBoundingClientRect();
    top = elRect.top;
    left = elRect.left;
    bottom = elRect.bottom;
    right = elRect.right;
    height = elRect.height;
    width = elRect.width;
  } else {
    top = 0;
    left = 0;
    bottom = window.innerHeight;
    right = window.innerWidth;
    height = window.innerHeight;
    width = window.innerWidth;
  }
  if ((relativeToContainingBlock || relativeToNonStaticParent) && el !== window) {
    // Adjust for translate()
    container = container || el.parentNode;

    // solves #1123 (see: https://stackoverflow.com/a/37953806/6088312)
    // Not needed on <= IE11
    if (!IE11OrLess) {
      do {
        if (container && container.getBoundingClientRect && (css(container, 'transform') !== 'none' || relativeToNonStaticParent && css(container, 'position') !== 'static')) {
          var containerRect = container.getBoundingClientRect();

          // Set relative to edges of padding box of container
          top -= containerRect.top + parseInt(css(container, 'border-top-width'));
          left -= containerRect.left + parseInt(css(container, 'border-left-width'));
          bottom = top + elRect.height;
          right = left + elRect.width;
          break;
        }
        /* jshint boss:true */
      } while (container = container.parentNode);
    }
  }
  if (undoScale && el !== window) {
    // Adjust for scale()
    var elMatrix = matrix(container || el),
      scaleX = elMatrix && elMatrix.a,
      scaleY = elMatrix && elMatrix.d;
    if (elMatrix) {
      top /= scaleY;
      left /= scaleX;
      width /= scaleX;
      height /= scaleY;
      bottom = top + height;
      right = left + width;
    }
  }
  return {
    top: top,
    left: left,
    bottom: bottom,
    right: right,
    width: width,
    height: height
  };
}

/**
 * Checks if a side of an element is scrolled past a side of its parents
 * @param  {HTMLElement}  el           The element who's side being scrolled out of view is in question
 * @param  {String}       elSide       Side of the element in question ('top', 'left', 'right', 'bottom')
 * @param  {String}       parentSide   Side of the parent in question ('top', 'left', 'right', 'bottom')
 * @return {HTMLElement}               The parent scroll element that the el's side is scrolled past, or null if there is no such element
 */
function isScrolledPast(el, elSide, parentSide) {
  var parent = getParentAutoScrollElement(el, true),
    elSideVal = getRect(el)[elSide];

  /* jshint boss:true */
  while (parent) {
    var parentSideVal = getRect(parent)[parentSide],
      visible = void 0;
    if (parentSide === 'top' || parentSide === 'left') {
      visible = elSideVal >= parentSideVal;
    } else {
      visible = elSideVal <= parentSideVal;
    }
    if (!visible) return parent;
    if (parent === getWindowScrollingElement()) break;
    parent = getParentAutoScrollElement(parent, false);
  }
  return false;
}

/**
 * Gets nth child of el, ignoring hidden children, sortable's elements (does not ignore clone if it's visible)
 * and non-draggable elements
 * @param  {HTMLElement} el       The parent element
 * @param  {Number} childNum      The index of the child
 * @param  {Object} options       Parent Sortable's options
 * @return {HTMLElement}          The child at index childNum, or null if not found
 */
function getChild(el, childNum, options, includeDragEl) {
  var currentChild = 0,
    i = 0,
    children = el.children;
  while (i < children.length) {
    if (children[i].style.display !== 'none' && children[i] !== Sortable.ghost && (includeDragEl || children[i] !== Sortable.dragged) && closest(children[i], options.draggable, el, false)) {
      if (currentChild === childNum) {
        return children[i];
      }
      currentChild++;
    }
    i++;
  }
  return null;
}

/**
 * Gets the last child in the el, ignoring ghostEl or invisible elements (clones)
 * @param  {HTMLElement} el       Parent element
 * @param  {selector} selector    Any other elements that should be ignored
 * @return {HTMLElement}          The last child, ignoring ghostEl
 */
function lastChild(el, selector) {
  var last = el.lastElementChild;
  while (last && (last === Sortable.ghost || css(last, 'display') === 'none' || selector && !matches(last, selector))) {
    last = last.previousElementSibling;
  }
  return last || null;
}

/**
 * Returns the index of an element within its parent for a selected set of
 * elements
 * @param  {HTMLElement} el
 * @param  {selector} selector
 * @return {number}
 */
function index(el, selector) {
  var index = 0;
  if (!el || !el.parentNode) {
    return -1;
  }

  /* jshint boss:true */
  while (el = el.previousElementSibling) {
    if (el.nodeName.toUpperCase() !== 'TEMPLATE' && el !== Sortable.clone && (!selector || matches(el, selector))) {
      index++;
    }
  }
  return index;
}

/**
 * Returns the scroll offset of the given element, added with all the scroll offsets of parent elements.
 * The value is returned in real pixels.
 * @param  {HTMLElement} el
 * @return {Array}             Offsets in the format of [left, top]
 */
function getRelativeScrollOffset(el) {
  var offsetLeft = 0,
    offsetTop = 0,
    winScroller = getWindowScrollingElement();
  if (el) {
    do {
      var elMatrix = matrix(el),
        scaleX = elMatrix.a,
        scaleY = elMatrix.d;
      offsetLeft += el.scrollLeft * scaleX;
      offsetTop += el.scrollTop * scaleY;
    } while (el !== winScroller && (el = el.parentNode));
  }
  return [offsetLeft, offsetTop];
}

/**
 * Returns the index of the object within the given array
 * @param  {Array} arr   Array that may or may not hold the object
 * @param  {Object} obj  An object that has a key-value pair unique to and identical to a key-value pair in the object you want to find
 * @return {Number}      The index of the object in the array, or -1
 */
function indexOfObject(arr, obj) {
  for (var i in arr) {
    if (!arr.hasOwnProperty(i)) continue;
    for (var key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === arr[i][key]) return Number(i);
    }
  }
  return -1;
}
function getParentAutoScrollElement(el, includeSelf) {
  // skip to window
  if (!el || !el.getBoundingClientRect) return getWindowScrollingElement();
  var elem = el;
  var gotSelf = false;
  do {
    // we don't need to get elem css if it isn't even overflowing in the first place (performance)
    if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
      var elemCSS = css(elem);
      if (elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX == 'auto' || elemCSS.overflowX == 'scroll') || elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY == 'auto' || elemCSS.overflowY == 'scroll')) {
        if (!elem.getBoundingClientRect || elem === document.body) return getWindowScrollingElement();
        if (gotSelf || includeSelf) return elem;
        gotSelf = true;
      }
    }
    /* jshint boss:true */
  } while (elem = elem.parentNode);
  return getWindowScrollingElement();
}
function extend(dst, src) {
  if (dst && src) {
    for (var key in src) {
      if (src.hasOwnProperty(key)) {
        dst[key] = src[key];
      }
    }
  }
  return dst;
}
function isRectEqual(rect1, rect2) {
  return Math.round(rect1.top) === Math.round(rect2.top) && Math.round(rect1.left) === Math.round(rect2.left) && Math.round(rect1.height) === Math.round(rect2.height) && Math.round(rect1.width) === Math.round(rect2.width);
}
var _throttleTimeout;
function throttle(callback, ms) {
  return function () {
    if (!_throttleTimeout) {
      var args = arguments,
        _this = this;
      if (args.length === 1) {
        callback.call(_this, args[0]);
      } else {
        callback.apply(_this, args);
      }
      _throttleTimeout = setTimeout(function () {
        _throttleTimeout = void 0;
      }, ms);
    }
  };
}
function cancelThrottle() {
  clearTimeout(_throttleTimeout);
  _throttleTimeout = void 0;
}
function scrollBy(el, x, y) {
  el.scrollLeft += x;
  el.scrollTop += y;
}
function clone(el) {
  var Polymer = window.Polymer;
  var $ = window.jQuery || window.Zepto;
  if (Polymer && Polymer.dom) {
    return Polymer.dom(el).cloneNode(true);
  } else if ($) {
    return $(el).clone(true)[0];
  } else {
    return el.cloneNode(true);
  }
}
function setRect(el, rect) {
  css(el, 'position', 'absolute');
  css(el, 'top', rect.top);
  css(el, 'left', rect.left);
  css(el, 'width', rect.width);
  css(el, 'height', rect.height);
}
function unsetRect(el) {
  css(el, 'position', '');
  css(el, 'top', '');
  css(el, 'left', '');
  css(el, 'width', '');
  css(el, 'height', '');
}
function getChildContainingRectFromElement(container, options, ghostEl) {
  var rect = {};
  Array.from(container.children).forEach(function (child) {
    var _rect$left, _rect$top, _rect$right, _rect$bottom;
    if (!closest(child, options.draggable, container, false) || child.animated || child === ghostEl) return;
    var childRect = getRect(child);
    rect.left = Math.min((_rect$left = rect.left) !== null && _rect$left !== void 0 ? _rect$left : Infinity, childRect.left);
    rect.top = Math.min((_rect$top = rect.top) !== null && _rect$top !== void 0 ? _rect$top : Infinity, childRect.top);
    rect.right = Math.max((_rect$right = rect.right) !== null && _rect$right !== void 0 ? _rect$right : -Infinity, childRect.right);
    rect.bottom = Math.max((_rect$bottom = rect.bottom) !== null && _rect$bottom !== void 0 ? _rect$bottom : -Infinity, childRect.bottom);
  });
  rect.width = rect.right - rect.left;
  rect.height = rect.bottom - rect.top;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
var expando = 'Sortable' + new Date().getTime();

function AnimationStateManager() {
  var animationStates = [],
    animationCallbackId;
  return {
    captureAnimationState: function captureAnimationState() {
      animationStates = [];
      if (!this.options.animation) return;
      var children = [].slice.call(this.el.children);
      children.forEach(function (child) {
        if (css(child, 'display') === 'none' || child === Sortable.ghost) return;
        animationStates.push({
          target: child,
          rect: getRect(child)
        });
        var fromRect = _objectSpread2({}, animationStates[animationStates.length - 1].rect);

        // If animating: compensate for current animation
        if (child.thisAnimationDuration) {
          var childMatrix = matrix(child, true);
          if (childMatrix) {
            fromRect.top -= childMatrix.f;
            fromRect.left -= childMatrix.e;
          }
        }
        child.fromRect = fromRect;
      });
    },
    addAnimationState: function addAnimationState(state) {
      animationStates.push(state);
    },
    removeAnimationState: function removeAnimationState(target) {
      animationStates.splice(indexOfObject(animationStates, {
        target: target
      }), 1);
    },
    animateAll: function animateAll(callback) {
      var _this = this;
      if (!this.options.animation) {
        clearTimeout(animationCallbackId);
        if (typeof callback === 'function') callback();
        return;
      }
      var animating = false,
        animationTime = 0;
      animationStates.forEach(function (state) {
        var time = 0,
          target = state.target,
          fromRect = target.fromRect,
          toRect = getRect(target),
          prevFromRect = target.prevFromRect,
          prevToRect = target.prevToRect,
          animatingRect = state.rect,
          targetMatrix = matrix(target, true);
        if (targetMatrix) {
          // Compensate for current animation
          toRect.top -= targetMatrix.f;
          toRect.left -= targetMatrix.e;
        }
        target.toRect = toRect;
        if (target.thisAnimationDuration) {
          // Could also check if animatingRect is between fromRect and toRect
          if (isRectEqual(prevFromRect, toRect) && !isRectEqual(fromRect, toRect) &&
          // Make sure animatingRect is on line between toRect & fromRect
          (animatingRect.top - toRect.top) / (animatingRect.left - toRect.left) === (fromRect.top - toRect.top) / (fromRect.left - toRect.left)) {
            // If returning to same place as started from animation and on same axis
            time = calculateRealTime(animatingRect, prevFromRect, prevToRect, _this.options);
          }
        }

        // if fromRect != toRect: animate
        if (!isRectEqual(toRect, fromRect)) {
          target.prevFromRect = fromRect;
          target.prevToRect = toRect;
          if (!time) {
            time = _this.options.animation;
          }
          _this.animate(target, animatingRect, toRect, time);
        }
        if (time) {
          animating = true;
          animationTime = Math.max(animationTime, time);
          clearTimeout(target.animationResetTimer);
          target.animationResetTimer = setTimeout(function () {
            target.animationTime = 0;
            target.prevFromRect = null;
            target.fromRect = null;
            target.prevToRect = null;
            target.thisAnimationDuration = null;
          }, time);
          target.thisAnimationDuration = time;
        }
      });
      clearTimeout(animationCallbackId);
      if (!animating) {
        if (typeof callback === 'function') callback();
      } else {
        animationCallbackId = setTimeout(function () {
          if (typeof callback === 'function') callback();
        }, animationTime);
      }
      animationStates = [];
    },
    animate: function animate(target, currentRect, toRect, duration) {
      if (duration) {
        css(target, 'transition', '');
        css(target, 'transform', '');
        var elMatrix = matrix(this.el),
          scaleX = elMatrix && elMatrix.a,
          scaleY = elMatrix && elMatrix.d,
          translateX = (currentRect.left - toRect.left) / (scaleX || 1),
          translateY = (currentRect.top - toRect.top) / (scaleY || 1);
        target.animatingX = !!translateX;
        target.animatingY = !!translateY;
        css(target, 'transform', 'translate3d(' + translateX + 'px,' + translateY + 'px,0)');
        this.forRepaintDummy = repaint(target); // repaint

        css(target, 'transition', 'transform ' + duration + 'ms' + (this.options.easing ? ' ' + this.options.easing : ''));
        css(target, 'transform', 'translate3d(0,0,0)');
        typeof target.animated === 'number' && clearTimeout(target.animated);
        target.animated = setTimeout(function () {
          css(target, 'transition', '');
          css(target, 'transform', '');
          target.animated = false;
          target.animatingX = false;
          target.animatingY = false;
        }, duration);
      }
    }
  };
}
function repaint(target) {
  return target.offsetWidth;
}
function calculateRealTime(animatingRect, fromRect, toRect, options) {
  return Math.sqrt(Math.pow(fromRect.top - animatingRect.top, 2) + Math.pow(fromRect.left - animatingRect.left, 2)) / Math.sqrt(Math.pow(fromRect.top - toRect.top, 2) + Math.pow(fromRect.left - toRect.left, 2)) * options.animation;
}

var plugins = [];
var defaults = {
  initializeByDefault: true
};
var PluginManager = {
  mount: function mount(plugin) {
    // Set default static properties
    for (var option in defaults) {
      if (defaults.hasOwnProperty(option) && !(option in plugin)) {
        plugin[option] = defaults[option];
      }
    }
    plugins.forEach(function (p) {
      if (p.pluginName === plugin.pluginName) {
        throw "Sortable: Cannot mount plugin ".concat(plugin.pluginName, " more than once");
      }
    });
    plugins.push(plugin);
  },
  pluginEvent: function pluginEvent(eventName, sortable, evt) {
    var _this = this;
    this.eventCanceled = false;
    evt.cancel = function () {
      _this.eventCanceled = true;
    };
    var eventNameGlobal = eventName + 'Global';
    plugins.forEach(function (plugin) {
      if (!sortable[plugin.pluginName]) return;
      // Fire global events if it exists in this sortable
      if (sortable[plugin.pluginName][eventNameGlobal]) {
        sortable[plugin.pluginName][eventNameGlobal](_objectSpread2({
          sortable: sortable
        }, evt));
      }

      // Only fire plugin event if plugin is enabled in this sortable,
      // and plugin has event defined
      if (sortable.options[plugin.pluginName] && sortable[plugin.pluginName][eventName]) {
        sortable[plugin.pluginName][eventName](_objectSpread2({
          sortable: sortable
        }, evt));
      }
    });
  },
  initializePlugins: function initializePlugins(sortable, el, defaults, options) {
    plugins.forEach(function (plugin) {
      var pluginName = plugin.pluginName;
      if (!sortable.options[pluginName] && !plugin.initializeByDefault) return;
      var initialized = new plugin(sortable, el, sortable.options);
      initialized.sortable = sortable;
      initialized.options = sortable.options;
      sortable[pluginName] = initialized;

      // Add default options from plugin
      _extends(defaults, initialized.defaults);
    });
    for (var option in sortable.options) {
      if (!sortable.options.hasOwnProperty(option)) continue;
      var modified = this.modifyOption(sortable, option, sortable.options[option]);
      if (typeof modified !== 'undefined') {
        sortable.options[option] = modified;
      }
    }
  },
  getEventProperties: function getEventProperties(name, sortable) {
    var eventProperties = {};
    plugins.forEach(function (plugin) {
      if (typeof plugin.eventProperties !== 'function') return;
      _extends(eventProperties, plugin.eventProperties.call(sortable[plugin.pluginName], name));
    });
    return eventProperties;
  },
  modifyOption: function modifyOption(sortable, name, value) {
    var modifiedValue;
    plugins.forEach(function (plugin) {
      // Plugin must exist on the Sortable
      if (!sortable[plugin.pluginName]) return;

      // If static option listener exists for this option, call in the context of the Sortable's instance of this plugin
      if (plugin.optionListeners && typeof plugin.optionListeners[name] === 'function') {
        modifiedValue = plugin.optionListeners[name].call(sortable[plugin.pluginName], value);
      }
    });
    return modifiedValue;
  }
};

function dispatchEvent(_ref) {
  var sortable = _ref.sortable,
    rootEl = _ref.rootEl,
    name = _ref.name,
    targetEl = _ref.targetEl,
    cloneEl = _ref.cloneEl,
    toEl = _ref.toEl,
    fromEl = _ref.fromEl,
    oldIndex = _ref.oldIndex,
    newIndex = _ref.newIndex,
    oldDraggableIndex = _ref.oldDraggableIndex,
    newDraggableIndex = _ref.newDraggableIndex,
    originalEvent = _ref.originalEvent,
    putSortable = _ref.putSortable,
    extraEventProperties = _ref.extraEventProperties;
  sortable = sortable || rootEl && rootEl[expando];
  if (!sortable) return;
  var evt,
    options = sortable.options,
    onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1);
  // Support for new CustomEvent feature
  if (window.CustomEvent && !IE11OrLess && !Edge) {
    evt = new CustomEvent(name, {
      bubbles: true,
      cancelable: true
    });
  } else {
    evt = document.createEvent('Event');
    evt.initEvent(name, true, true);
  }
  evt.to = toEl || rootEl;
  evt.from = fromEl || rootEl;
  evt.item = targetEl || rootEl;
  evt.clone = cloneEl;
  evt.oldIndex = oldIndex;
  evt.newIndex = newIndex;
  evt.oldDraggableIndex = oldDraggableIndex;
  evt.newDraggableIndex = newDraggableIndex;
  evt.originalEvent = originalEvent;
  evt.pullMode = putSortable ? putSortable.lastPutMode : undefined;
  var allEventProperties = _objectSpread2(_objectSpread2({}, extraEventProperties), PluginManager.getEventProperties(name, sortable));
  for (var option in allEventProperties) {
    evt[option] = allEventProperties[option];
  }
  if (rootEl) {
    rootEl.dispatchEvent(evt);
  }
  if (options[onName]) {
    options[onName].call(sortable, evt);
  }
}

var _excluded = ["evt"];
var pluginEvent = function pluginEvent(eventName, sortable) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    originalEvent = _ref.evt,
    data = _objectWithoutProperties(_ref, _excluded);
  PluginManager.pluginEvent.bind(Sortable)(eventName, sortable, _objectSpread2({
    dragEl: dragEl,
    parentEl: parentEl,
    ghostEl: ghostEl,
    rootEl: rootEl,
    nextEl: nextEl,
    lastDownEl: lastDownEl,
    cloneEl: cloneEl,
    cloneHidden: cloneHidden,
    dragStarted: moved,
    putSortable: putSortable,
    activeSortable: Sortable.active,
    originalEvent: originalEvent,
    oldIndex: oldIndex,
    oldDraggableIndex: oldDraggableIndex,
    newIndex: newIndex,
    newDraggableIndex: newDraggableIndex,
    hideGhostForTarget: _hideGhostForTarget,
    unhideGhostForTarget: _unhideGhostForTarget,
    cloneNowHidden: function cloneNowHidden() {
      cloneHidden = true;
    },
    cloneNowShown: function cloneNowShown() {
      cloneHidden = false;
    },
    dispatchSortableEvent: function dispatchSortableEvent(name) {
      _dispatchEvent({
        sortable: sortable,
        name: name,
        originalEvent: originalEvent
      });
    }
  }, data));
};
function _dispatchEvent(info) {
  dispatchEvent(_objectSpread2({
    putSortable: putSortable,
    cloneEl: cloneEl,
    targetEl: dragEl,
    rootEl: rootEl,
    oldIndex: oldIndex,
    oldDraggableIndex: oldDraggableIndex,
    newIndex: newIndex,
    newDraggableIndex: newDraggableIndex
  }, info));
}
var dragEl,
  parentEl,
  ghostEl,
  rootEl,
  nextEl,
  lastDownEl,
  cloneEl,
  cloneHidden,
  oldIndex,
  newIndex,
  oldDraggableIndex,
  newDraggableIndex,
  activeGroup,
  putSortable,
  awaitingDragStarted = false,
  ignoreNextClick = false,
  sortables = [],
  tapEvt,
  touchEvt,
  lastDx,
  lastDy,
  tapDistanceLeft,
  tapDistanceTop,
  moved,
  lastTarget,
  lastDirection,
  pastFirstInvertThresh = false,
  isCircumstantialInvert = false,
  targetMoveDistance,
  // For positioning ghost absolutely
  ghostRelativeParent,
  ghostRelativeParentInitialScroll = [],
  // (left, top)

  _silent = false,
  savedInputChecked = [];

/** @const */
var documentExists = typeof document !== 'undefined',
  PositionGhostAbsolutely = IOS,
  CSSFloatProperty = Edge || IE11OrLess ? 'cssFloat' : 'float',
  // This will not pass for IE9, because IE9 DnD only works on anchors
  supportDraggable = documentExists && !ChromeForAndroid && !IOS && 'draggable' in document.createElement('div'),
  supportCssPointerEvents = function () {
    if (!documentExists) return;
    // false when <= IE11
    if (IE11OrLess) {
      return false;
    }
    var el = document.createElement('x');
    el.style.cssText = 'pointer-events:auto';
    return el.style.pointerEvents === 'auto';
  }(),
  _detectDirection = function _detectDirection(el, options) {
    var elCSS = css(el),
      elWidth = parseInt(elCSS.width) - parseInt(elCSS.paddingLeft) - parseInt(elCSS.paddingRight) - parseInt(elCSS.borderLeftWidth) - parseInt(elCSS.borderRightWidth),
      child1 = getChild(el, 0, options),
      child2 = getChild(el, 1, options),
      firstChildCSS = child1 && css(child1),
      secondChildCSS = child2 && css(child2),
      firstChildWidth = firstChildCSS && parseInt(firstChildCSS.marginLeft) + parseInt(firstChildCSS.marginRight) + getRect(child1).width,
      secondChildWidth = secondChildCSS && parseInt(secondChildCSS.marginLeft) + parseInt(secondChildCSS.marginRight) + getRect(child2).width;
    if (elCSS.display === 'flex') {
      return elCSS.flexDirection === 'column' || elCSS.flexDirection === 'column-reverse' ? 'vertical' : 'horizontal';
    }
    if (elCSS.display === 'grid') {
      return elCSS.gridTemplateColumns.split(' ').length <= 1 ? 'vertical' : 'horizontal';
    }
    if (child1 && firstChildCSS["float"] && firstChildCSS["float"] !== 'none') {
      var touchingSideChild2 = firstChildCSS["float"] === 'left' ? 'left' : 'right';
      return child2 && (secondChildCSS.clear === 'both' || secondChildCSS.clear === touchingSideChild2) ? 'vertical' : 'horizontal';
    }
    return child1 && (firstChildCSS.display === 'block' || firstChildCSS.display === 'flex' || firstChildCSS.display === 'table' || firstChildCSS.display === 'grid' || firstChildWidth >= elWidth && elCSS[CSSFloatProperty] === 'none' || child2 && elCSS[CSSFloatProperty] === 'none' && firstChildWidth + secondChildWidth > elWidth) ? 'vertical' : 'horizontal';
  },
  _dragElInRowColumn = function _dragElInRowColumn(dragRect, targetRect, vertical) {
    var dragElS1Opp = vertical ? dragRect.left : dragRect.top,
      dragElS2Opp = vertical ? dragRect.right : dragRect.bottom,
      dragElOppLength = vertical ? dragRect.width : dragRect.height,
      targetS1Opp = vertical ? targetRect.left : targetRect.top,
      targetS2Opp = vertical ? targetRect.right : targetRect.bottom,
      targetOppLength = vertical ? targetRect.width : targetRect.height;
    return dragElS1Opp === targetS1Opp || dragElS2Opp === targetS2Opp || dragElS1Opp + dragElOppLength / 2 === targetS1Opp + targetOppLength / 2;
  },
  /**
   * Detects first nearest empty sortable to X and Y position using emptyInsertThreshold.
   * @param  {Number} x      X position
   * @param  {Number} y      Y position
   * @return {HTMLElement}   Element of the first found nearest Sortable
   */
  _detectNearestEmptySortable = function _detectNearestEmptySortable(x, y) {
    var ret;
    sortables.some(function (sortable) {
      var threshold = sortable[expando].options.emptyInsertThreshold;
      if (!threshold || lastChild(sortable)) return;
      var rect = getRect(sortable),
        insideHorizontally = x >= rect.left - threshold && x <= rect.right + threshold,
        insideVertically = y >= rect.top - threshold && y <= rect.bottom + threshold;
      if (insideHorizontally && insideVertically) {
        return ret = sortable;
      }
    });
    return ret;
  },
  _prepareGroup = function _prepareGroup(options) {
    function toFn(value, pull) {
      return function (to, from, dragEl, evt) {
        var sameGroup = to.options.group.name && from.options.group.name && to.options.group.name === from.options.group.name;
        if (value == null && (pull || sameGroup)) {
          // Default pull value
          // Default pull and put value if same group
          return true;
        } else if (value == null || value === false) {
          return false;
        } else if (pull && value === 'clone') {
          return value;
        } else if (typeof value === 'function') {
          return toFn(value(to, from, dragEl, evt), pull)(to, from, dragEl, evt);
        } else {
          var otherGroup = (pull ? to : from).options.group.name;
          return value === true || typeof value === 'string' && value === otherGroup || value.join && value.indexOf(otherGroup) > -1;
        }
      };
    }
    var group = {};
    var originalGroup = options.group;
    if (!originalGroup || _typeof(originalGroup) != 'object') {
      originalGroup = {
        name: originalGroup
      };
    }
    group.name = originalGroup.name;
    group.checkPull = toFn(originalGroup.pull, true);
    group.checkPut = toFn(originalGroup.put);
    group.revertClone = originalGroup.revertClone;
    options.group = group;
  },
  _hideGhostForTarget = function _hideGhostForTarget() {
    if (!supportCssPointerEvents && ghostEl) {
      css(ghostEl, 'display', 'none');
    }
  },
  _unhideGhostForTarget = function _unhideGhostForTarget() {
    if (!supportCssPointerEvents && ghostEl) {
      css(ghostEl, 'display', '');
    }
  };

// #1184 fix - Prevent click event on fallback if dragged but item not changed position
if (documentExists && !ChromeForAndroid) {
  document.addEventListener('click', function (evt) {
    if (ignoreNextClick) {
      evt.preventDefault();
      evt.stopPropagation && evt.stopPropagation();
      evt.stopImmediatePropagation && evt.stopImmediatePropagation();
      ignoreNextClick = false;
      return false;
    }
  }, true);
}
var nearestEmptyInsertDetectEvent = function nearestEmptyInsertDetectEvent(evt) {
  if (dragEl) {
    evt = evt.touches ? evt.touches[0] : evt;
    var nearest = _detectNearestEmptySortable(evt.clientX, evt.clientY);
    if (nearest) {
      // Create imitation event
      var event = {};
      for (var i in evt) {
        if (evt.hasOwnProperty(i)) {
          event[i] = evt[i];
        }
      }
      event.target = event.rootEl = nearest;
      event.preventDefault = void 0;
      event.stopPropagation = void 0;
      nearest[expando]._onDragOver(event);
    }
  }
};
var _checkOutsideTargetEl = function _checkOutsideTargetEl(evt) {
  if (dragEl) {
    dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
  }
};

/**
 * @class  Sortable
 * @param  {HTMLElement}  el
 * @param  {Object}       [options]
 */
function Sortable(el, options) {
  if (!(el && el.nodeType && el.nodeType === 1)) {
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(el));
  }
  this.el = el; // root element
  this.options = options = _extends({}, options);

  // Export instance
  el[expando] = this;
  var defaults = {
    group: null,
    sort: true,
    disabled: false,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(el.nodeName) ? '>li' : '>*',
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: false,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: true,
    direction: function direction() {
      return _detectDirection(el, this.options);
    },
    ghostClass: 'sortable-ghost',
    chosenClass: 'sortable-chosen',
    dragClass: 'sortable-drag',
    ignore: 'a, img',
    filter: null,
    preventOnFilter: true,
    animation: 0,
    easing: null,
    setData: function setData(dataTransfer, dragEl) {
      dataTransfer.setData('Text', dragEl.textContent);
    },
    dropBubble: false,
    dragoverBubble: false,
    dataIdAttr: 'data-id',
    delay: 0,
    delayOnTouchOnly: false,
    touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
    forceFallback: false,
    fallbackClass: 'sortable-fallback',
    fallbackOnBody: false,
    fallbackTolerance: 0,
    fallbackOffset: {
      x: 0,
      y: 0
    },
    supportPointer: Sortable.supportPointer !== false && 'PointerEvent' in window && !Safari,
    emptyInsertThreshold: 5
  };
  PluginManager.initializePlugins(this, el, defaults);

  // Set default options
  for (var name in defaults) {
    !(name in options) && (options[name] = defaults[name]);
  }
  _prepareGroup(options);

  // Bind all private methods
  for (var fn in this) {
    if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
      this[fn] = this[fn].bind(this);
    }
  }

  // Setup drag mode
  this.nativeDraggable = options.forceFallback ? false : supportDraggable;
  if (this.nativeDraggable) {
    // Touch start threshold cannot be greater than the native dragstart threshold
    this.options.touchStartThreshold = 1;
  }

  // Bind events
  if (options.supportPointer) {
    on(el, 'pointerdown', this._onTapStart);
  } else {
    on(el, 'mousedown', this._onTapStart);
    on(el, 'touchstart', this._onTapStart);
  }
  if (this.nativeDraggable) {
    on(el, 'dragover', this);
    on(el, 'dragenter', this);
  }
  sortables.push(this.el);

  // Restore sorting
  options.store && options.store.get && this.sort(options.store.get(this) || []);

  // Add animation state manager
  _extends(this, AnimationStateManager());
}
Sortable.prototype = /** @lends Sortable.prototype */{
  constructor: Sortable,
  _isOutsideThisEl: function _isOutsideThisEl(target) {
    if (!this.el.contains(target) && target !== this.el) {
      lastTarget = null;
    }
  },
  _getDirection: function _getDirection(evt, target) {
    return typeof this.options.direction === 'function' ? this.options.direction.call(this, evt, target, dragEl) : this.options.direction;
  },
  _onTapStart: function _onTapStart( /** Event|TouchEvent */evt) {
    if (!evt.cancelable) return;
    var _this = this,
      el = this.el,
      options = this.options,
      preventOnFilter = options.preventOnFilter,
      type = evt.type,
      touch = evt.touches && evt.touches[0] || evt.pointerType && evt.pointerType === 'touch' && evt,
      target = (touch || evt).target,
      originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0] || evt.composedPath && evt.composedPath()[0]) || target,
      filter = options.filter;
    _saveInputCheckedState(el);

    // Don't trigger start event when an element is been dragged, otherwise the evt.oldindex always wrong when set option.group.
    if (dragEl) {
      return;
    }
    if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
      return; // only left button and enabled
    }

    // cancel dnd if original target is content editable
    if (originalTarget.isContentEditable) {
      return;
    }

    // Safari ignores further event handling after mousedown
    if (!this.nativeDraggable && Safari && target && target.tagName.toUpperCase() === 'SELECT') {
      return;
    }
    target = closest(target, options.draggable, el, false);
    if (target && target.animated) {
      return;
    }
    if (lastDownEl === target) {
      // Ignoring duplicate `down`
      return;
    }

    // Get the index of the dragged element within its parent
    oldIndex = index(target);
    oldDraggableIndex = index(target, options.draggable);

    // Check filter
    if (typeof filter === 'function') {
      if (filter.call(this, evt, target, this)) {
        _dispatchEvent({
          sortable: _this,
          rootEl: originalTarget,
          name: 'filter',
          targetEl: target,
          toEl: el,
          fromEl: el
        });
        pluginEvent('filter', _this, {
          evt: evt
        });
        preventOnFilter && evt.cancelable && evt.preventDefault();
        return; // cancel dnd
      }
    } else if (filter) {
      filter = filter.split(',').some(function (criteria) {
        criteria = closest(originalTarget, criteria.trim(), el, false);
        if (criteria) {
          _dispatchEvent({
            sortable: _this,
            rootEl: criteria,
            name: 'filter',
            targetEl: target,
            fromEl: el,
            toEl: el
          });
          pluginEvent('filter', _this, {
            evt: evt
          });
          return true;
        }
      });
      if (filter) {
        preventOnFilter && evt.cancelable && evt.preventDefault();
        return; // cancel dnd
      }
    }
    if (options.handle && !closest(originalTarget, options.handle, el, false)) {
      return;
    }

    // Prepare `dragstart`
    this._prepareDragStart(evt, touch, target);
  },
  _prepareDragStart: function _prepareDragStart( /** Event */evt, /** Touch */touch, /** HTMLElement */target) {
    var _this = this,
      el = _this.el,
      options = _this.options,
      ownerDocument = el.ownerDocument,
      dragStartFn;
    if (target && !dragEl && target.parentNode === el) {
      var dragRect = getRect(target);
      rootEl = el;
      dragEl = target;
      parentEl = dragEl.parentNode;
      nextEl = dragEl.nextSibling;
      lastDownEl = target;
      activeGroup = options.group;
      Sortable.dragged = dragEl;
      tapEvt = {
        target: dragEl,
        clientX: (touch || evt).clientX,
        clientY: (touch || evt).clientY
      };
      tapDistanceLeft = tapEvt.clientX - dragRect.left;
      tapDistanceTop = tapEvt.clientY - dragRect.top;
      this._lastX = (touch || evt).clientX;
      this._lastY = (touch || evt).clientY;
      dragEl.style['will-change'] = 'all';
      dragStartFn = function dragStartFn() {
        pluginEvent('delayEnded', _this, {
          evt: evt
        });
        if (Sortable.eventCanceled) {
          _this._onDrop();
          return;
        }
        // Delayed drag has been triggered
        // we can re-enable the events: touchmove/mousemove
        _this._disableDelayedDragEvents();
        if (!FireFox && _this.nativeDraggable) {
          dragEl.draggable = true;
        }

        // Bind the events: dragstart/dragend
        _this._triggerDragStart(evt, touch);

        // Drag start event
        _dispatchEvent({
          sortable: _this,
          name: 'choose',
          originalEvent: evt
        });

        // Chosen item
        toggleClass(dragEl, options.chosenClass, true);
      };

      // Disable "draggable"
      options.ignore.split(',').forEach(function (criteria) {
        find(dragEl, criteria.trim(), _disableDraggable);
      });
      on(ownerDocument, 'dragover', nearestEmptyInsertDetectEvent);
      on(ownerDocument, 'mousemove', nearestEmptyInsertDetectEvent);
      on(ownerDocument, 'touchmove', nearestEmptyInsertDetectEvent);
      on(ownerDocument, 'mouseup', _this._onDrop);
      on(ownerDocument, 'touchend', _this._onDrop);
      on(ownerDocument, 'touchcancel', _this._onDrop);

      // Make dragEl draggable (must be before delay for FireFox)
      if (FireFox && this.nativeDraggable) {
        this.options.touchStartThreshold = 4;
        dragEl.draggable = true;
      }
      pluginEvent('delayStart', this, {
        evt: evt
      });

      // Delay is impossible for native DnD in Edge or IE
      if (options.delay && (!options.delayOnTouchOnly || touch) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
        if (Sortable.eventCanceled) {
          this._onDrop();
          return;
        }
        // If the user moves the pointer or let go the click or touch
        // before the delay has been reached:
        // disable the delayed drag
        on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
        on(ownerDocument, 'touchend', _this._disableDelayedDrag);
        on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
        on(ownerDocument, 'mousemove', _this._delayedDragTouchMoveHandler);
        on(ownerDocument, 'touchmove', _this._delayedDragTouchMoveHandler);
        options.supportPointer && on(ownerDocument, 'pointermove', _this._delayedDragTouchMoveHandler);
        _this._dragStartTimer = setTimeout(dragStartFn, options.delay);
      } else {
        dragStartFn();
      }
    }
  },
  _delayedDragTouchMoveHandler: function _delayedDragTouchMoveHandler( /** TouchEvent|PointerEvent **/e) {
    var touch = e.touches ? e.touches[0] : e;
    if (Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1))) {
      this._disableDelayedDrag();
    }
  },
  _disableDelayedDrag: function _disableDelayedDrag() {
    dragEl && _disableDraggable(dragEl);
    clearTimeout(this._dragStartTimer);
    this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function _disableDelayedDragEvents() {
    var ownerDocument = this.el.ownerDocument;
    off(ownerDocument, 'mouseup', this._disableDelayedDrag);
    off(ownerDocument, 'touchend', this._disableDelayedDrag);
    off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
    off(ownerDocument, 'mousemove', this._delayedDragTouchMoveHandler);
    off(ownerDocument, 'touchmove', this._delayedDragTouchMoveHandler);
    off(ownerDocument, 'pointermove', this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function _triggerDragStart( /** Event */evt, /** Touch */touch) {
    touch = touch || evt.pointerType == 'touch' && evt;
    if (!this.nativeDraggable || touch) {
      if (this.options.supportPointer) {
        on(document, 'pointermove', this._onTouchMove);
      } else if (touch) {
        on(document, 'touchmove', this._onTouchMove);
      } else {
        on(document, 'mousemove', this._onTouchMove);
      }
    } else {
      on(dragEl, 'dragend', this);
      on(rootEl, 'dragstart', this._onDragStart);
    }
    try {
      if (document.selection) {
        // Timeout neccessary for IE9
        _nextTick(function () {
          document.selection.empty();
        });
      } else {
        window.getSelection().removeAllRanges();
      }
    } catch (err) {}
  },
  _dragStarted: function _dragStarted(fallback, evt) {
    awaitingDragStarted = false;
    if (rootEl && dragEl) {
      pluginEvent('dragStarted', this, {
        evt: evt
      });
      if (this.nativeDraggable) {
        on(document, 'dragover', _checkOutsideTargetEl);
      }
      var options = this.options;

      // Apply effect
      !fallback && toggleClass(dragEl, options.dragClass, false);
      toggleClass(dragEl, options.ghostClass, true);
      Sortable.active = this;
      fallback && this._appendGhost();

      // Drag start event
      _dispatchEvent({
        sortable: this,
        name: 'start',
        originalEvent: evt
      });
    } else {
      this._nulling();
    }
  },
  _emulateDragOver: function _emulateDragOver() {
    if (touchEvt) {
      this._lastX = touchEvt.clientX;
      this._lastY = touchEvt.clientY;
      _hideGhostForTarget();
      var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
      var parent = target;
      while (target && target.shadowRoot) {
        target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
        if (target === parent) break;
        parent = target;
      }
      dragEl.parentNode[expando]._isOutsideThisEl(target);
      if (parent) {
        do {
          if (parent[expando]) {
            var inserted = void 0;
            inserted = parent[expando]._onDragOver({
              clientX: touchEvt.clientX,
              clientY: touchEvt.clientY,
              target: target,
              rootEl: parent
            });
            if (inserted && !this.options.dragoverBubble) {
              break;
            }
          }
          target = parent; // store last element
        }
        /* jshint boss:true */ while (parent = parent.parentNode);
      }
      _unhideGhostForTarget();
    }
  },
  _onTouchMove: function _onTouchMove( /**TouchEvent*/evt) {
    if (tapEvt) {
      var options = this.options,
        fallbackTolerance = options.fallbackTolerance,
        fallbackOffset = options.fallbackOffset,
        touch = evt.touches ? evt.touches[0] : evt,
        ghostMatrix = ghostEl && matrix(ghostEl, true),
        scaleX = ghostEl && ghostMatrix && ghostMatrix.a,
        scaleY = ghostEl && ghostMatrix && ghostMatrix.d,
        relativeScrollOffset = PositionGhostAbsolutely && ghostRelativeParent && getRelativeScrollOffset(ghostRelativeParent),
        dx = (touch.clientX - tapEvt.clientX + fallbackOffset.x) / (scaleX || 1) + (relativeScrollOffset ? relativeScrollOffset[0] - ghostRelativeParentInitialScroll[0] : 0) / (scaleX || 1),
        dy = (touch.clientY - tapEvt.clientY + fallbackOffset.y) / (scaleY || 1) + (relativeScrollOffset ? relativeScrollOffset[1] - ghostRelativeParentInitialScroll[1] : 0) / (scaleY || 1);

      // only set the status to dragging, when we are actually dragging
      if (!Sortable.active && !awaitingDragStarted) {
        if (fallbackTolerance && Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) < fallbackTolerance) {
          return;
        }
        this._onDragStart(evt, true);
      }
      if (ghostEl) {
        if (ghostMatrix) {
          ghostMatrix.e += dx - (lastDx || 0);
          ghostMatrix.f += dy - (lastDy || 0);
        } else {
          ghostMatrix = {
            a: 1,
            b: 0,
            c: 0,
            d: 1,
            e: dx,
            f: dy
          };
        }
        var cssMatrix = "matrix(".concat(ghostMatrix.a, ",").concat(ghostMatrix.b, ",").concat(ghostMatrix.c, ",").concat(ghostMatrix.d, ",").concat(ghostMatrix.e, ",").concat(ghostMatrix.f, ")");
        css(ghostEl, 'webkitTransform', cssMatrix);
        css(ghostEl, 'mozTransform', cssMatrix);
        css(ghostEl, 'msTransform', cssMatrix);
        css(ghostEl, 'transform', cssMatrix);
        lastDx = dx;
        lastDy = dy;
        touchEvt = touch;
      }
      evt.cancelable && evt.preventDefault();
    }
  },
  _appendGhost: function _appendGhost() {
    // Bug if using scale(): https://stackoverflow.com/questions/2637058
    // Not being adjusted for
    if (!ghostEl) {
      var container = this.options.fallbackOnBody ? document.body : rootEl,
        rect = getRect(dragEl, true, PositionGhostAbsolutely, true, container),
        options = this.options;

      // Position absolutely
      if (PositionGhostAbsolutely) {
        // Get relatively positioned parent
        ghostRelativeParent = container;
        while (css(ghostRelativeParent, 'position') === 'static' && css(ghostRelativeParent, 'transform') === 'none' && ghostRelativeParent !== document) {
          ghostRelativeParent = ghostRelativeParent.parentNode;
        }
        if (ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement) {
          if (ghostRelativeParent === document) ghostRelativeParent = getWindowScrollingElement();
          rect.top += ghostRelativeParent.scrollTop;
          rect.left += ghostRelativeParent.scrollLeft;
        } else {
          ghostRelativeParent = getWindowScrollingElement();
        }
        ghostRelativeParentInitialScroll = getRelativeScrollOffset(ghostRelativeParent);
      }
      ghostEl = dragEl.cloneNode(true);
      toggleClass(ghostEl, options.ghostClass, false);
      toggleClass(ghostEl, options.fallbackClass, true);
      toggleClass(ghostEl, options.dragClass, true);
      css(ghostEl, 'transition', '');
      css(ghostEl, 'transform', '');
      css(ghostEl, 'box-sizing', 'border-box');
      css(ghostEl, 'margin', 0);
      css(ghostEl, 'top', rect.top);
      css(ghostEl, 'left', rect.left);
      css(ghostEl, 'width', rect.width);
      css(ghostEl, 'height', rect.height);
      css(ghostEl, 'opacity', '0.8');
      css(ghostEl, 'position', PositionGhostAbsolutely ? 'absolute' : 'fixed');
      css(ghostEl, 'zIndex', '100000');
      css(ghostEl, 'pointerEvents', 'none');
      Sortable.ghost = ghostEl;
      container.appendChild(ghostEl);

      // Set transform-origin
      css(ghostEl, 'transform-origin', tapDistanceLeft / parseInt(ghostEl.style.width) * 100 + '% ' + tapDistanceTop / parseInt(ghostEl.style.height) * 100 + '%');
    }
  },
  _onDragStart: function _onDragStart( /**Event*/evt, /**boolean*/fallback) {
    var _this = this;
    var dataTransfer = evt.dataTransfer;
    var options = _this.options;
    pluginEvent('dragStart', this, {
      evt: evt
    });
    if (Sortable.eventCanceled) {
      this._onDrop();
      return;
    }
    pluginEvent('setupClone', this);
    if (!Sortable.eventCanceled) {
      cloneEl = clone(dragEl);
      cloneEl.removeAttribute("id");
      cloneEl.draggable = false;
      cloneEl.style['will-change'] = '';
      this._hideClone();
      toggleClass(cloneEl, this.options.chosenClass, false);
      Sortable.clone = cloneEl;
    }

    // #1143: IFrame support workaround
    _this.cloneId = _nextTick(function () {
      pluginEvent('clone', _this);
      if (Sortable.eventCanceled) return;
      if (!_this.options.removeCloneOnHide) {
        rootEl.insertBefore(cloneEl, dragEl);
      }
      _this._hideClone();
      _dispatchEvent({
        sortable: _this,
        name: 'clone'
      });
    });
    !fallback && toggleClass(dragEl, options.dragClass, true);

    // Set proper drop events
    if (fallback) {
      ignoreNextClick = true;
      _this._loopId = setInterval(_this._emulateDragOver, 50);
    } else {
      // Undo what was set in _prepareDragStart before drag started
      off(document, 'mouseup', _this._onDrop);
      off(document, 'touchend', _this._onDrop);
      off(document, 'touchcancel', _this._onDrop);
      if (dataTransfer) {
        dataTransfer.effectAllowed = 'move';
        options.setData && options.setData.call(_this, dataTransfer, dragEl);
      }
      on(document, 'drop', _this);

      // #1276 fix:
      css(dragEl, 'transform', 'translateZ(0)');
    }
    awaitingDragStarted = true;
    _this._dragStartId = _nextTick(_this._dragStarted.bind(_this, fallback, evt));
    on(document, 'selectstart', _this);
    moved = true;
    if (Safari) {
      css(document.body, 'user-select', 'none');
    }
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function _onDragOver( /**Event*/evt) {
    var el = this.el,
      target = evt.target,
      dragRect,
      targetRect,
      revert,
      options = this.options,
      group = options.group,
      activeSortable = Sortable.active,
      isOwner = activeGroup === group,
      canSort = options.sort,
      fromSortable = putSortable || activeSortable,
      vertical,
      _this = this,
      completedFired = false;
    if (_silent) return;
    function dragOverEvent(name, extra) {
      pluginEvent(name, _this, _objectSpread2({
        evt: evt,
        isOwner: isOwner,
        axis: vertical ? 'vertical' : 'horizontal',
        revert: revert,
        dragRect: dragRect,
        targetRect: targetRect,
        canSort: canSort,
        fromSortable: fromSortable,
        target: target,
        completed: completed,
        onMove: function onMove(target, after) {
          return _onMove(rootEl, el, dragEl, dragRect, target, getRect(target), evt, after);
        },
        changed: changed
      }, extra));
    }

    // Capture animation state
    function capture() {
      dragOverEvent('dragOverAnimationCapture');
      _this.captureAnimationState();
      if (_this !== fromSortable) {
        fromSortable.captureAnimationState();
      }
    }

    // Return invocation when dragEl is inserted (or completed)
    function completed(insertion) {
      dragOverEvent('dragOverCompleted', {
        insertion: insertion
      });
      if (insertion) {
        // Clones must be hidden before folding animation to capture dragRectAbsolute properly
        if (isOwner) {
          activeSortable._hideClone();
        } else {
          activeSortable._showClone(_this);
        }
        if (_this !== fromSortable) {
          // Set ghost class to new sortable's ghost class
          toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : activeSortable.options.ghostClass, false);
          toggleClass(dragEl, options.ghostClass, true);
        }
        if (putSortable !== _this && _this !== Sortable.active) {
          putSortable = _this;
        } else if (_this === Sortable.active && putSortable) {
          putSortable = null;
        }

        // Animation
        if (fromSortable === _this) {
          _this._ignoreWhileAnimating = target;
        }
        _this.animateAll(function () {
          dragOverEvent('dragOverAnimationComplete');
          _this._ignoreWhileAnimating = null;
        });
        if (_this !== fromSortable) {
          fromSortable.animateAll();
          fromSortable._ignoreWhileAnimating = null;
        }
      }

      // Null lastTarget if it is not inside a previously swapped element
      if (target === dragEl && !dragEl.animated || target === el && !target.animated) {
        lastTarget = null;
      }

      // no bubbling and not fallback
      if (!options.dragoverBubble && !evt.rootEl && target !== document) {
        dragEl.parentNode[expando]._isOutsideThisEl(evt.target);

        // Do not detect for empty insert if already inserted
        !insertion && nearestEmptyInsertDetectEvent(evt);
      }
      !options.dragoverBubble && evt.stopPropagation && evt.stopPropagation();
      return completedFired = true;
    }

    // Call when dragEl has been inserted
    function changed() {
      newIndex = index(dragEl);
      newDraggableIndex = index(dragEl, options.draggable);
      _dispatchEvent({
        sortable: _this,
        name: 'change',
        toEl: el,
        newIndex: newIndex,
        newDraggableIndex: newDraggableIndex,
        originalEvent: evt
      });
    }
    if (evt.preventDefault !== void 0) {
      evt.cancelable && evt.preventDefault();
    }
    target = closest(target, options.draggable, el, true);
    dragOverEvent('dragOver');
    if (Sortable.eventCanceled) return completedFired;
    if (dragEl.contains(evt.target) || target.animated && target.animatingX && target.animatingY || _this._ignoreWhileAnimating === target) {
      return completed(false);
    }
    ignoreNextClick = false;
    if (activeSortable && !options.disabled && (isOwner ? canSort || (revert = parentEl !== rootEl) // Reverting item into the original list
    : putSortable === this || (this.lastPutMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) && group.checkPut(this, activeSortable, dragEl, evt))) {
      vertical = this._getDirection(evt, target) === 'vertical';
      dragRect = getRect(dragEl);
      dragOverEvent('dragOverValid');
      if (Sortable.eventCanceled) return completedFired;
      if (revert) {
        parentEl = rootEl; // actualization
        capture();
        this._hideClone();
        dragOverEvent('revert');
        if (!Sortable.eventCanceled) {
          if (nextEl) {
            rootEl.insertBefore(dragEl, nextEl);
          } else {
            rootEl.appendChild(dragEl);
          }
        }
        return completed(true);
      }
      var elLastChild = lastChild(el, options.draggable);
      if (!elLastChild || _ghostIsLast(evt, vertical, this) && !elLastChild.animated) {
        // Insert to end of list

        // If already at end of list: Do not insert
        if (elLastChild === dragEl) {
          return completed(false);
        }

        // if there is a last element, it is the target
        if (elLastChild && el === evt.target) {
          target = elLastChild;
        }
        if (target) {
          targetRect = getRect(target);
        }
        if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, !!target) !== false) {
          capture();
          if (elLastChild && elLastChild.nextSibling) {
            // the last draggable element is not the last node
            el.insertBefore(dragEl, elLastChild.nextSibling);
          } else {
            el.appendChild(dragEl);
          }
          parentEl = el; // actualization

          changed();
          return completed(true);
        }
      } else if (elLastChild && _ghostIsFirst(evt, vertical, this)) {
        // Insert to start of list
        var firstChild = getChild(el, 0, options, true);
        if (firstChild === dragEl) {
          return completed(false);
        }
        target = firstChild;
        targetRect = getRect(target);
        if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, false) !== false) {
          capture();
          el.insertBefore(dragEl, firstChild);
          parentEl = el; // actualization

          changed();
          return completed(true);
        }
      } else if (target.parentNode === el) {
        targetRect = getRect(target);
        var direction = 0,
          targetBeforeFirstSwap,
          differentLevel = dragEl.parentNode !== el,
          differentRowCol = !_dragElInRowColumn(dragEl.animated && dragEl.toRect || dragRect, target.animated && target.toRect || targetRect, vertical),
          side1 = vertical ? 'top' : 'left',
          scrolledPastTop = isScrolledPast(target, 'top', 'top') || isScrolledPast(dragEl, 'top', 'top'),
          scrollBefore = scrolledPastTop ? scrolledPastTop.scrollTop : void 0;
        if (lastTarget !== target) {
          targetBeforeFirstSwap = targetRect[side1];
          pastFirstInvertThresh = false;
          isCircumstantialInvert = !differentRowCol && options.invertSwap || differentLevel;
        }
        direction = _getSwapDirection(evt, target, targetRect, vertical, differentRowCol ? 1 : options.swapThreshold, options.invertedSwapThreshold == null ? options.swapThreshold : options.invertedSwapThreshold, isCircumstantialInvert, lastTarget === target);
        var sibling;
        if (direction !== 0) {
          // Check if target is beside dragEl in respective direction (ignoring hidden elements)
          var dragIndex = index(dragEl);
          do {
            dragIndex -= direction;
            sibling = parentEl.children[dragIndex];
          } while (sibling && (css(sibling, 'display') === 'none' || sibling === ghostEl));
        }
        // If dragEl is already beside target: Do not insert
        if (direction === 0 || sibling === target) {
          return completed(false);
        }
        lastTarget = target;
        lastDirection = direction;
        var nextSibling = target.nextElementSibling,
          after = false;
        after = direction === 1;
        var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);
        if (moveVector !== false) {
          if (moveVector === 1 || moveVector === -1) {
            after = moveVector === 1;
          }
          _silent = true;
          setTimeout(_unsilent, 30);
          capture();
          if (after && !nextSibling) {
            el.appendChild(dragEl);
          } else {
            target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
          }

          // Undo chrome's scroll adjustment (has no effect on other browsers)
          if (scrolledPastTop) {
            scrollBy(scrolledPastTop, 0, scrollBefore - scrolledPastTop.scrollTop);
          }
          parentEl = dragEl.parentNode; // actualization

          // must be done before animation
          if (targetBeforeFirstSwap !== undefined && !isCircumstantialInvert) {
            targetMoveDistance = Math.abs(targetBeforeFirstSwap - getRect(target)[side1]);
          }
          changed();
          return completed(true);
        }
      }
      if (el.contains(dragEl)) {
        return completed(false);
      }
    }
    return false;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function _offMoveEvents() {
    off(document, 'mousemove', this._onTouchMove);
    off(document, 'touchmove', this._onTouchMove);
    off(document, 'pointermove', this._onTouchMove);
    off(document, 'dragover', nearestEmptyInsertDetectEvent);
    off(document, 'mousemove', nearestEmptyInsertDetectEvent);
    off(document, 'touchmove', nearestEmptyInsertDetectEvent);
  },
  _offUpEvents: function _offUpEvents() {
    var ownerDocument = this.el.ownerDocument;
    off(ownerDocument, 'mouseup', this._onDrop);
    off(ownerDocument, 'touchend', this._onDrop);
    off(ownerDocument, 'pointerup', this._onDrop);
    off(ownerDocument, 'touchcancel', this._onDrop);
    off(document, 'selectstart', this);
  },
  _onDrop: function _onDrop( /**Event*/evt) {
    var el = this.el,
      options = this.options;

    // Get the index of the dragged element within its parent
    newIndex = index(dragEl);
    newDraggableIndex = index(dragEl, options.draggable);
    pluginEvent('drop', this, {
      evt: evt
    });
    parentEl = dragEl && dragEl.parentNode;

    // Get again after plugin event
    newIndex = index(dragEl);
    newDraggableIndex = index(dragEl, options.draggable);
    if (Sortable.eventCanceled) {
      this._nulling();
      return;
    }
    awaitingDragStarted = false;
    isCircumstantialInvert = false;
    pastFirstInvertThresh = false;
    clearInterval(this._loopId);
    clearTimeout(this._dragStartTimer);
    _cancelNextTick(this.cloneId);
    _cancelNextTick(this._dragStartId);

    // Unbind events
    if (this.nativeDraggable) {
      off(document, 'drop', this);
      off(el, 'dragstart', this._onDragStart);
    }
    this._offMoveEvents();
    this._offUpEvents();
    if (Safari) {
      css(document.body, 'user-select', '');
    }
    css(dragEl, 'transform', '');
    if (evt) {
      if (moved) {
        evt.cancelable && evt.preventDefault();
        !options.dropBubble && evt.stopPropagation();
      }
      ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);
      if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== 'clone') {
        // Remove clone(s)
        cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
      }
      if (dragEl) {
        if (this.nativeDraggable) {
          off(dragEl, 'dragend', this);
        }
        _disableDraggable(dragEl);
        dragEl.style['will-change'] = '';

        // Remove classes
        // ghostClass is added in dragStarted
        if (moved && !awaitingDragStarted) {
          toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, false);
        }
        toggleClass(dragEl, this.options.chosenClass, false);

        // Drag stop event
        _dispatchEvent({
          sortable: this,
          name: 'unchoose',
          toEl: parentEl,
          newIndex: null,
          newDraggableIndex: null,
          originalEvent: evt
        });
        if (rootEl !== parentEl) {
          if (newIndex >= 0) {
            // Add event
            _dispatchEvent({
              rootEl: parentEl,
              name: 'add',
              toEl: parentEl,
              fromEl: rootEl,
              originalEvent: evt
            });

            // Remove event
            _dispatchEvent({
              sortable: this,
              name: 'remove',
              toEl: parentEl,
              originalEvent: evt
            });

            // drag from one list and drop into another
            _dispatchEvent({
              rootEl: parentEl,
              name: 'sort',
              toEl: parentEl,
              fromEl: rootEl,
              originalEvent: evt
            });
            _dispatchEvent({
              sortable: this,
              name: 'sort',
              toEl: parentEl,
              originalEvent: evt
            });
          }
          putSortable && putSortable.save();
        } else {
          if (newIndex !== oldIndex) {
            if (newIndex >= 0) {
              // drag & drop within the same list
              _dispatchEvent({
                sortable: this,
                name: 'update',
                toEl: parentEl,
                originalEvent: evt
              });
              _dispatchEvent({
                sortable: this,
                name: 'sort',
                toEl: parentEl,
                originalEvent: evt
              });
            }
          }
        }
        if (Sortable.active) {
          /* jshint eqnull:true */
          if (newIndex == null || newIndex === -1) {
            newIndex = oldIndex;
            newDraggableIndex = oldDraggableIndex;
          }
          _dispatchEvent({
            sortable: this,
            name: 'end',
            toEl: parentEl,
            originalEvent: evt
          });

          // Save sorting
          this.save();
        }
      }
    }
    this._nulling();
  },
  _nulling: function _nulling() {
    pluginEvent('nulling', this);
    rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = lastDownEl = cloneHidden = tapEvt = touchEvt = moved = newIndex = newDraggableIndex = oldIndex = oldDraggableIndex = lastTarget = lastDirection = putSortable = activeGroup = Sortable.dragged = Sortable.ghost = Sortable.clone = Sortable.active = null;
    savedInputChecked.forEach(function (el) {
      el.checked = true;
    });
    savedInputChecked.length = lastDx = lastDy = 0;
  },
  handleEvent: function handleEvent( /**Event*/evt) {
    switch (evt.type) {
      case 'drop':
      case 'dragend':
        this._onDrop(evt);
        break;
      case 'dragenter':
      case 'dragover':
        if (dragEl) {
          this._onDragOver(evt);
          _globalDragOver(evt);
        }
        break;
      case 'selectstart':
        evt.preventDefault();
        break;
    }
  },
  /**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
  toArray: function toArray() {
    var order = [],
      el,
      children = this.el.children,
      i = 0,
      n = children.length,
      options = this.options;
    for (; i < n; i++) {
      el = children[i];
      if (closest(el, options.draggable, this.el, false)) {
        order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
      }
    }
    return order;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function sort(order, useAnimation) {
    var items = {},
      rootEl = this.el;
    this.toArray().forEach(function (id, i) {
      var el = rootEl.children[i];
      if (closest(el, this.options.draggable, rootEl, false)) {
        items[id] = el;
      }
    }, this);
    useAnimation && this.captureAnimationState();
    order.forEach(function (id) {
      if (items[id]) {
        rootEl.removeChild(items[id]);
        rootEl.appendChild(items[id]);
      }
    });
    useAnimation && this.animateAll();
  },
  /**
   * Save the current sorting
   */
  save: function save() {
    var store = this.options.store;
    store && store.set && store.set(this);
  },
  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
  closest: function closest$1(el, selector) {
    return closest(el, selector || this.options.draggable, this.el, false);
  },
  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function option(name, value) {
    var options = this.options;
    if (value === void 0) {
      return options[name];
    } else {
      var modifiedValue = PluginManager.modifyOption(this, name, value);
      if (typeof modifiedValue !== 'undefined') {
        options[name] = modifiedValue;
      } else {
        options[name] = value;
      }
      if (name === 'group') {
        _prepareGroup(options);
      }
    }
  },
  /**
   * Destroy
   */
  destroy: function destroy() {
    pluginEvent('destroy', this);
    var el = this.el;
    el[expando] = null;
    off(el, 'mousedown', this._onTapStart);
    off(el, 'touchstart', this._onTapStart);
    off(el, 'pointerdown', this._onTapStart);
    if (this.nativeDraggable) {
      off(el, 'dragover', this);
      off(el, 'dragenter', this);
    }
    // Remove draggable attributes
    Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
      el.removeAttribute('draggable');
    });
    this._onDrop();
    this._disableDelayedDragEvents();
    sortables.splice(sortables.indexOf(this.el), 1);
    this.el = el = null;
  },
  _hideClone: function _hideClone() {
    if (!cloneHidden) {
      pluginEvent('hideClone', this);
      if (Sortable.eventCanceled) return;
      css(cloneEl, 'display', 'none');
      if (this.options.removeCloneOnHide && cloneEl.parentNode) {
        cloneEl.parentNode.removeChild(cloneEl);
      }
      cloneHidden = true;
    }
  },
  _showClone: function _showClone(putSortable) {
    if (putSortable.lastPutMode !== 'clone') {
      this._hideClone();
      return;
    }
    if (cloneHidden) {
      pluginEvent('showClone', this);
      if (Sortable.eventCanceled) return;

      // show clone at dragEl or original position
      if (dragEl.parentNode == rootEl && !this.options.group.revertClone) {
        rootEl.insertBefore(cloneEl, dragEl);
      } else if (nextEl) {
        rootEl.insertBefore(cloneEl, nextEl);
      } else {
        rootEl.appendChild(cloneEl);
      }
      if (this.options.group.revertClone) {
        this.animate(dragEl, cloneEl);
      }
      css(cloneEl, 'display', '');
      cloneHidden = false;
    }
  }
};
function _globalDragOver( /**Event*/evt) {
  if (evt.dataTransfer) {
    evt.dataTransfer.dropEffect = 'move';
  }
  evt.cancelable && evt.preventDefault();
}
function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvent, willInsertAfter) {
  var evt,
    sortable = fromEl[expando],
    onMoveFn = sortable.options.onMove,
    retVal;
  // Support for new CustomEvent feature
  if (window.CustomEvent && !IE11OrLess && !Edge) {
    evt = new CustomEvent('move', {
      bubbles: true,
      cancelable: true
    });
  } else {
    evt = document.createEvent('Event');
    evt.initEvent('move', true, true);
  }
  evt.to = toEl;
  evt.from = fromEl;
  evt.dragged = dragEl;
  evt.draggedRect = dragRect;
  evt.related = targetEl || toEl;
  evt.relatedRect = targetRect || getRect(toEl);
  evt.willInsertAfter = willInsertAfter;
  evt.originalEvent = originalEvent;
  fromEl.dispatchEvent(evt);
  if (onMoveFn) {
    retVal = onMoveFn.call(sortable, evt, originalEvent);
  }
  return retVal;
}
function _disableDraggable(el) {
  el.draggable = false;
}
function _unsilent() {
  _silent = false;
}
function _ghostIsFirst(evt, vertical, sortable) {
  var firstElRect = getRect(getChild(sortable.el, 0, sortable.options, true));
  var childContainingRect = getChildContainingRectFromElement(sortable.el, sortable.options, ghostEl);
  var spacer = 10;
  return vertical ? evt.clientX < childContainingRect.left - spacer || evt.clientY < firstElRect.top && evt.clientX < firstElRect.right : evt.clientY < childContainingRect.top - spacer || evt.clientY < firstElRect.bottom && evt.clientX < firstElRect.left;
}
function _ghostIsLast(evt, vertical, sortable) {
  var lastElRect = getRect(lastChild(sortable.el, sortable.options.draggable));
  var childContainingRect = getChildContainingRectFromElement(sortable.el, sortable.options, ghostEl);
  var spacer = 10;
  return vertical ? evt.clientX > childContainingRect.right + spacer || evt.clientY > lastElRect.bottom && evt.clientX > lastElRect.left : evt.clientY > childContainingRect.bottom + spacer || evt.clientX > lastElRect.right && evt.clientY > lastElRect.top;
}
function _getSwapDirection(evt, target, targetRect, vertical, swapThreshold, invertedSwapThreshold, invertSwap, isLastTarget) {
  var mouseOnAxis = vertical ? evt.clientY : evt.clientX,
    targetLength = vertical ? targetRect.height : targetRect.width,
    targetS1 = vertical ? targetRect.top : targetRect.left,
    targetS2 = vertical ? targetRect.bottom : targetRect.right,
    invert = false;
  if (!invertSwap) {
    // Never invert or create dragEl shadow when target movemenet causes mouse to move past the end of regular swapThreshold
    if (isLastTarget && targetMoveDistance < targetLength * swapThreshold) {
      // multiplied only by swapThreshold because mouse will already be inside target by (1 - threshold) * targetLength / 2
      // check if past first invert threshold on side opposite of lastDirection
      if (!pastFirstInvertThresh && (lastDirection === 1 ? mouseOnAxis > targetS1 + targetLength * invertedSwapThreshold / 2 : mouseOnAxis < targetS2 - targetLength * invertedSwapThreshold / 2)) {
        // past first invert threshold, do not restrict inverted threshold to dragEl shadow
        pastFirstInvertThresh = true;
      }
      if (!pastFirstInvertThresh) {
        // dragEl shadow (target move distance shadow)
        if (lastDirection === 1 ? mouseOnAxis < targetS1 + targetMoveDistance // over dragEl shadow
        : mouseOnAxis > targetS2 - targetMoveDistance) {
          return -lastDirection;
        }
      } else {
        invert = true;
      }
    } else {
      // Regular
      if (mouseOnAxis > targetS1 + targetLength * (1 - swapThreshold) / 2 && mouseOnAxis < targetS2 - targetLength * (1 - swapThreshold) / 2) {
        return _getInsertDirection(target);
      }
    }
  }
  invert = invert || invertSwap;
  if (invert) {
    // Invert of regular
    if (mouseOnAxis < targetS1 + targetLength * invertedSwapThreshold / 2 || mouseOnAxis > targetS2 - targetLength * invertedSwapThreshold / 2) {
      return mouseOnAxis > targetS1 + targetLength / 2 ? 1 : -1;
    }
  }
  return 0;
}

/**
 * Gets the direction dragEl must be swapped relative to target in order to make it
 * seem that dragEl has been "inserted" into that element's position
 * @param  {HTMLElement} target       The target whose position dragEl is being inserted at
 * @return {Number}                   Direction dragEl must be swapped
 */
function _getInsertDirection(target) {
  if (index(dragEl) < index(target)) {
    return 1;
  } else {
    return -1;
  }
}

/**
 * Generate id
 * @param   {HTMLElement} el
 * @returns {String}
 * @private
 */
function _generateId(el) {
  var str = el.tagName + el.className + el.src + el.href + el.textContent,
    i = str.length,
    sum = 0;
  while (i--) {
    sum += str.charCodeAt(i);
  }
  return sum.toString(36);
}
function _saveInputCheckedState(root) {
  savedInputChecked.length = 0;
  var inputs = root.getElementsByTagName('input');
  var idx = inputs.length;
  while (idx--) {
    var el = inputs[idx];
    el.checked && savedInputChecked.push(el);
  }
}
function _nextTick(fn) {
  return setTimeout(fn, 0);
}
function _cancelNextTick(id) {
  return clearTimeout(id);
}

// Fixed #973:
if (documentExists) {
  on(document, 'touchmove', function (evt) {
    if ((Sortable.active || awaitingDragStarted) && evt.cancelable) {
      evt.preventDefault();
    }
  });
}

// Export utils
Sortable.utils = {
  on: on,
  off: off,
  css: css,
  find: find,
  is: function is(el, selector) {
    return !!closest(el, selector, el, false);
  },
  extend: extend,
  throttle: throttle,
  closest: closest,
  toggleClass: toggleClass,
  clone: clone,
  index: index,
  nextTick: _nextTick,
  cancelNextTick: _cancelNextTick,
  detectDirection: _detectDirection,
  getChild: getChild
};

/**
 * Get the Sortable instance of an element
 * @param  {HTMLElement} element The element
 * @return {Sortable|undefined}         The instance of Sortable
 */
Sortable.get = function (element) {
  return element[expando];
};

/**
 * Mount a plugin to Sortable
 * @param  {...SortablePlugin|SortablePlugin[]} plugins       Plugins being mounted
 */
Sortable.mount = function () {
  for (var _len = arguments.length, plugins = new Array(_len), _key = 0; _key < _len; _key++) {
    plugins[_key] = arguments[_key];
  }
  if (plugins[0].constructor === Array) plugins = plugins[0];
  plugins.forEach(function (plugin) {
    if (!plugin.prototype || !plugin.prototype.constructor) {
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(plugin));
    }
    if (plugin.utils) Sortable.utils = _objectSpread2(_objectSpread2({}, Sortable.utils), plugin.utils);
    PluginManager.mount(plugin);
  });
};

/**
 * Create sortable instance
 * @param {HTMLElement}  el
 * @param {Object}      [options]
 */
Sortable.create = function (el, options) {
  return new Sortable(el, options);
};

// Export
Sortable.version = version;

var autoScrolls = [],
  scrollEl,
  scrollRootEl,
  scrolling = false,
  lastAutoScrollX,
  lastAutoScrollY,
  touchEvt$1,
  pointerElemChangedInterval;
function AutoScrollPlugin() {
  function AutoScroll() {
    this.defaults = {
      scroll: true,
      forceAutoScrollFallback: false,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: true
    };

    // Bind all private methods
    for (var fn in this) {
      if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
        this[fn] = this[fn].bind(this);
      }
    }
  }
  AutoScroll.prototype = {
    dragStarted: function dragStarted(_ref) {
      var originalEvent = _ref.originalEvent;
      if (this.sortable.nativeDraggable) {
        on(document, 'dragover', this._handleAutoScroll);
      } else {
        if (this.options.supportPointer) {
          on(document, 'pointermove', this._handleFallbackAutoScroll);
        } else if (originalEvent.touches) {
          on(document, 'touchmove', this._handleFallbackAutoScroll);
        } else {
          on(document, 'mousemove', this._handleFallbackAutoScroll);
        }
      }
    },
    dragOverCompleted: function dragOverCompleted(_ref2) {
      var originalEvent = _ref2.originalEvent;
      // For when bubbling is canceled and using fallback (fallback 'touchmove' always reached)
      if (!this.options.dragOverBubble && !originalEvent.rootEl) {
        this._handleAutoScroll(originalEvent);
      }
    },
    drop: function drop() {
      if (this.sortable.nativeDraggable) {
        off(document, 'dragover', this._handleAutoScroll);
      } else {
        off(document, 'pointermove', this._handleFallbackAutoScroll);
        off(document, 'touchmove', this._handleFallbackAutoScroll);
        off(document, 'mousemove', this._handleFallbackAutoScroll);
      }
      clearPointerElemChangedInterval();
      clearAutoScrolls();
      cancelThrottle();
    },
    nulling: function nulling() {
      touchEvt$1 = scrollRootEl = scrollEl = scrolling = pointerElemChangedInterval = lastAutoScrollX = lastAutoScrollY = null;
      autoScrolls.length = 0;
    },
    _handleFallbackAutoScroll: function _handleFallbackAutoScroll(evt) {
      this._handleAutoScroll(evt, true);
    },
    _handleAutoScroll: function _handleAutoScroll(evt, fallback) {
      var _this = this;
      var x = (evt.touches ? evt.touches[0] : evt).clientX,
        y = (evt.touches ? evt.touches[0] : evt).clientY,
        elem = document.elementFromPoint(x, y);
      touchEvt$1 = evt;

      // IE does not seem to have native autoscroll,
      // Edge's autoscroll seems too conditional,
      // MACOS Safari does not have autoscroll,
      // Firefox and Chrome are good
      if (fallback || this.options.forceAutoScrollFallback || Edge || IE11OrLess || Safari) {
        autoScroll(evt, this.options, elem, fallback);

        // Listener for pointer element change
        var ogElemScroller = getParentAutoScrollElement(elem, true);
        if (scrolling && (!pointerElemChangedInterval || x !== lastAutoScrollX || y !== lastAutoScrollY)) {
          pointerElemChangedInterval && clearPointerElemChangedInterval();
          // Detect for pointer elem change, emulating native DnD behaviour
          pointerElemChangedInterval = setInterval(function () {
            var newElem = getParentAutoScrollElement(document.elementFromPoint(x, y), true);
            if (newElem !== ogElemScroller) {
              ogElemScroller = newElem;
              clearAutoScrolls();
            }
            autoScroll(evt, _this.options, newElem, fallback);
          }, 10);
          lastAutoScrollX = x;
          lastAutoScrollY = y;
        }
      } else {
        // if DnD is enabled (and browser has good autoscrolling), first autoscroll will already scroll, so get parent autoscroll of first autoscroll
        if (!this.options.bubbleScroll || getParentAutoScrollElement(elem, true) === getWindowScrollingElement()) {
          clearAutoScrolls();
          return;
        }
        autoScroll(evt, this.options, getParentAutoScrollElement(elem, false), false);
      }
    }
  };
  return _extends(AutoScroll, {
    pluginName: 'scroll',
    initializeByDefault: true
  });
}
function clearAutoScrolls() {
  autoScrolls.forEach(function (autoScroll) {
    clearInterval(autoScroll.pid);
  });
  autoScrolls = [];
}
function clearPointerElemChangedInterval() {
  clearInterval(pointerElemChangedInterval);
}
var autoScroll = throttle(function (evt, options, rootEl, isFallback) {
  // Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
  if (!options.scroll) return;
  var x = (evt.touches ? evt.touches[0] : evt).clientX,
    y = (evt.touches ? evt.touches[0] : evt).clientY,
    sens = options.scrollSensitivity,
    speed = options.scrollSpeed,
    winScroller = getWindowScrollingElement();
  var scrollThisInstance = false,
    scrollCustomFn;

  // New scroll root, set scrollEl
  if (scrollRootEl !== rootEl) {
    scrollRootEl = rootEl;
    clearAutoScrolls();
    scrollEl = options.scroll;
    scrollCustomFn = options.scrollFn;
    if (scrollEl === true) {
      scrollEl = getParentAutoScrollElement(rootEl, true);
    }
  }
  var layersOut = 0;
  var currentParent = scrollEl;
  do {
    var el = currentParent,
      rect = getRect(el),
      top = rect.top,
      bottom = rect.bottom,
      left = rect.left,
      right = rect.right,
      width = rect.width,
      height = rect.height,
      canScrollX = void 0,
      canScrollY = void 0,
      scrollWidth = el.scrollWidth,
      scrollHeight = el.scrollHeight,
      elCSS = css(el),
      scrollPosX = el.scrollLeft,
      scrollPosY = el.scrollTop;
    if (el === winScroller) {
      canScrollX = width < scrollWidth && (elCSS.overflowX === 'auto' || elCSS.overflowX === 'scroll' || elCSS.overflowX === 'visible');
      canScrollY = height < scrollHeight && (elCSS.overflowY === 'auto' || elCSS.overflowY === 'scroll' || elCSS.overflowY === 'visible');
    } else {
      canScrollX = width < scrollWidth && (elCSS.overflowX === 'auto' || elCSS.overflowX === 'scroll');
      canScrollY = height < scrollHeight && (elCSS.overflowY === 'auto' || elCSS.overflowY === 'scroll');
    }
    var vx = canScrollX && (Math.abs(right - x) <= sens && scrollPosX + width < scrollWidth) - (Math.abs(left - x) <= sens && !!scrollPosX);
    var vy = canScrollY && (Math.abs(bottom - y) <= sens && scrollPosY + height < scrollHeight) - (Math.abs(top - y) <= sens && !!scrollPosY);
    if (!autoScrolls[layersOut]) {
      for (var i = 0; i <= layersOut; i++) {
        if (!autoScrolls[i]) {
          autoScrolls[i] = {};
        }
      }
    }
    if (autoScrolls[layersOut].vx != vx || autoScrolls[layersOut].vy != vy || autoScrolls[layersOut].el !== el) {
      autoScrolls[layersOut].el = el;
      autoScrolls[layersOut].vx = vx;
      autoScrolls[layersOut].vy = vy;
      clearInterval(autoScrolls[layersOut].pid);
      if (vx != 0 || vy != 0) {
        scrollThisInstance = true;
        /* jshint loopfunc:true */
        autoScrolls[layersOut].pid = setInterval(function () {
          // emulate drag over during autoscroll (fallback), emulating native DnD behaviour
          if (isFallback && this.layer === 0) {
            Sortable.active._onTouchMove(touchEvt$1); // To move ghost if it is positioned absolutely
          }
          var scrollOffsetY = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * speed : 0;
          var scrollOffsetX = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * speed : 0;
          if (typeof scrollCustomFn === 'function') {
            if (scrollCustomFn.call(Sortable.dragged.parentNode[expando], scrollOffsetX, scrollOffsetY, evt, touchEvt$1, autoScrolls[this.layer].el) !== 'continue') {
              return;
            }
          }
          scrollBy(autoScrolls[this.layer].el, scrollOffsetX, scrollOffsetY);
        }.bind({
          layer: layersOut
        }), 24);
      }
    }
    layersOut++;
  } while (options.bubbleScroll && currentParent !== winScroller && (currentParent = getParentAutoScrollElement(currentParent, false)));
  scrolling = scrollThisInstance; // in case another function catches scrolling as false in between when it is not
}, 30);

var drop = function drop(_ref) {
  var originalEvent = _ref.originalEvent,
    putSortable = _ref.putSortable,
    dragEl = _ref.dragEl,
    activeSortable = _ref.activeSortable,
    dispatchSortableEvent = _ref.dispatchSortableEvent,
    hideGhostForTarget = _ref.hideGhostForTarget,
    unhideGhostForTarget = _ref.unhideGhostForTarget;
  if (!originalEvent) return;
  var toSortable = putSortable || activeSortable;
  hideGhostForTarget();
  var touch = originalEvent.changedTouches && originalEvent.changedTouches.length ? originalEvent.changedTouches[0] : originalEvent;
  var target = document.elementFromPoint(touch.clientX, touch.clientY);
  unhideGhostForTarget();
  if (toSortable && !toSortable.el.contains(target)) {
    dispatchSortableEvent('spill');
    this.onSpill({
      dragEl: dragEl,
      putSortable: putSortable
    });
  }
};
function Revert() {}
Revert.prototype = {
  startIndex: null,
  dragStart: function dragStart(_ref2) {
    var oldDraggableIndex = _ref2.oldDraggableIndex;
    this.startIndex = oldDraggableIndex;
  },
  onSpill: function onSpill(_ref3) {
    var dragEl = _ref3.dragEl,
      putSortable = _ref3.putSortable;
    this.sortable.captureAnimationState();
    if (putSortable) {
      putSortable.captureAnimationState();
    }
    var nextSibling = getChild(this.sortable.el, this.startIndex, this.options);
    if (nextSibling) {
      this.sortable.el.insertBefore(dragEl, nextSibling);
    } else {
      this.sortable.el.appendChild(dragEl);
    }
    this.sortable.animateAll();
    if (putSortable) {
      putSortable.animateAll();
    }
  },
  drop: drop
};
_extends(Revert, {
  pluginName: 'revertOnSpill'
});
function Remove() {}
Remove.prototype = {
  onSpill: function onSpill(_ref4) {
    var dragEl = _ref4.dragEl,
      putSortable = _ref4.putSortable;
    var parentSortable = putSortable || this.sortable;
    parentSortable.captureAnimationState();
    dragEl.parentNode && dragEl.parentNode.removeChild(dragEl);
    parentSortable.animateAll();
  },
  drop: drop
};
_extends(Remove, {
  pluginName: 'removeOnSpill'
});

var lastSwapEl;
function SwapPlugin() {
  function Swap() {
    this.defaults = {
      swapClass: 'sortable-swap-highlight'
    };
  }
  Swap.prototype = {
    dragStart: function dragStart(_ref) {
      var dragEl = _ref.dragEl;
      lastSwapEl = dragEl;
    },
    dragOverValid: function dragOverValid(_ref2) {
      var completed = _ref2.completed,
        target = _ref2.target,
        onMove = _ref2.onMove,
        activeSortable = _ref2.activeSortable,
        changed = _ref2.changed,
        cancel = _ref2.cancel;
      if (!activeSortable.options.swap) return;
      var el = this.sortable.el,
        options = this.options;
      if (target && target !== el) {
        var prevSwapEl = lastSwapEl;
        if (onMove(target) !== false) {
          toggleClass(target, options.swapClass, true);
          lastSwapEl = target;
        } else {
          lastSwapEl = null;
        }
        if (prevSwapEl && prevSwapEl !== lastSwapEl) {
          toggleClass(prevSwapEl, options.swapClass, false);
        }
      }
      changed();
      completed(true);
      cancel();
    },
    drop: function drop(_ref3) {
      var activeSortable = _ref3.activeSortable,
        putSortable = _ref3.putSortable,
        dragEl = _ref3.dragEl;
      var toSortable = putSortable || this.sortable;
      var options = this.options;
      lastSwapEl && toggleClass(lastSwapEl, options.swapClass, false);
      if (lastSwapEl && (options.swap || putSortable && putSortable.options.swap)) {
        if (dragEl !== lastSwapEl) {
          toSortable.captureAnimationState();
          if (toSortable !== activeSortable) activeSortable.captureAnimationState();
          swapNodes(dragEl, lastSwapEl);
          toSortable.animateAll();
          if (toSortable !== activeSortable) activeSortable.animateAll();
        }
      }
    },
    nulling: function nulling() {
      lastSwapEl = null;
    }
  };
  return _extends(Swap, {
    pluginName: 'swap',
    eventProperties: function eventProperties() {
      return {
        swapItem: lastSwapEl
      };
    }
  });
}
function swapNodes(n1, n2) {
  var p1 = n1.parentNode,
    p2 = n2.parentNode,
    i1,
    i2;
  if (!p1 || !p2 || p1.isEqualNode(n2) || p2.isEqualNode(n1)) return;
  i1 = index(n1);
  i2 = index(n2);
  if (p1.isEqualNode(p2) && i1 < i2) {
    i2++;
  }
  p1.insertBefore(n2, p1.children[i1]);
  p2.insertBefore(n1, p2.children[i2]);
}

var multiDragElements = [],
  multiDragClones = [],
  lastMultiDragSelect,
  // for selection with modifier key down (SHIFT)
  multiDragSortable,
  initialFolding = false,
  // Initial multi-drag fold when drag started
  folding = false,
  // Folding any other time
  dragStarted = false,
  dragEl$1,
  clonesFromRect,
  clonesHidden;
function MultiDragPlugin() {
  function MultiDrag(sortable) {
    // Bind all private methods
    for (var fn in this) {
      if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
        this[fn] = this[fn].bind(this);
      }
    }
    if (!sortable.options.avoidImplicitDeselect) {
      if (sortable.options.supportPointer) {
        on(document, 'pointerup', this._deselectMultiDrag);
      } else {
        on(document, 'mouseup', this._deselectMultiDrag);
        on(document, 'touchend', this._deselectMultiDrag);
      }
    }
    on(document, 'keydown', this._checkKeyDown);
    on(document, 'keyup', this._checkKeyUp);
    this.defaults = {
      selectedClass: 'sortable-selected',
      multiDragKey: null,
      avoidImplicitDeselect: false,
      setData: function setData(dataTransfer, dragEl) {
        var data = '';
        if (multiDragElements.length && multiDragSortable === sortable) {
          multiDragElements.forEach(function (multiDragElement, i) {
            data += (!i ? '' : ', ') + multiDragElement.textContent;
          });
        } else {
          data = dragEl.textContent;
        }
        dataTransfer.setData('Text', data);
      }
    };
  }
  MultiDrag.prototype = {
    multiDragKeyDown: false,
    isMultiDrag: false,
    delayStartGlobal: function delayStartGlobal(_ref) {
      var dragged = _ref.dragEl;
      dragEl$1 = dragged;
    },
    delayEnded: function delayEnded() {
      this.isMultiDrag = ~multiDragElements.indexOf(dragEl$1);
    },
    setupClone: function setupClone(_ref2) {
      var sortable = _ref2.sortable,
        cancel = _ref2.cancel;
      if (!this.isMultiDrag) return;
      for (var i = 0; i < multiDragElements.length; i++) {
        multiDragClones.push(clone(multiDragElements[i]));
        multiDragClones[i].sortableIndex = multiDragElements[i].sortableIndex;
        multiDragClones[i].draggable = false;
        multiDragClones[i].style['will-change'] = '';
        toggleClass(multiDragClones[i], this.options.selectedClass, false);
        multiDragElements[i] === dragEl$1 && toggleClass(multiDragClones[i], this.options.chosenClass, false);
      }
      sortable._hideClone();
      cancel();
    },
    clone: function clone(_ref3) {
      var sortable = _ref3.sortable,
        rootEl = _ref3.rootEl,
        dispatchSortableEvent = _ref3.dispatchSortableEvent,
        cancel = _ref3.cancel;
      if (!this.isMultiDrag) return;
      if (!this.options.removeCloneOnHide) {
        if (multiDragElements.length && multiDragSortable === sortable) {
          insertMultiDragClones(true, rootEl);
          dispatchSortableEvent('clone');
          cancel();
        }
      }
    },
    showClone: function showClone(_ref4) {
      var cloneNowShown = _ref4.cloneNowShown,
        rootEl = _ref4.rootEl,
        cancel = _ref4.cancel;
      if (!this.isMultiDrag) return;
      insertMultiDragClones(false, rootEl);
      multiDragClones.forEach(function (clone) {
        css(clone, 'display', '');
      });
      cloneNowShown();
      clonesHidden = false;
      cancel();
    },
    hideClone: function hideClone(_ref5) {
      var _this = this;
      var sortable = _ref5.sortable,
        cloneNowHidden = _ref5.cloneNowHidden,
        cancel = _ref5.cancel;
      if (!this.isMultiDrag) return;
      multiDragClones.forEach(function (clone) {
        css(clone, 'display', 'none');
        if (_this.options.removeCloneOnHide && clone.parentNode) {
          clone.parentNode.removeChild(clone);
        }
      });
      cloneNowHidden();
      clonesHidden = true;
      cancel();
    },
    dragStartGlobal: function dragStartGlobal(_ref6) {
      var sortable = _ref6.sortable;
      if (!this.isMultiDrag && multiDragSortable) {
        multiDragSortable.multiDrag._deselectMultiDrag();
      }
      multiDragElements.forEach(function (multiDragElement) {
        multiDragElement.sortableIndex = index(multiDragElement);
      });

      // Sort multi-drag elements
      multiDragElements = multiDragElements.sort(function (a, b) {
        return a.sortableIndex - b.sortableIndex;
      });
      dragStarted = true;
    },
    dragStarted: function dragStarted(_ref7) {
      var _this2 = this;
      var sortable = _ref7.sortable;
      if (!this.isMultiDrag) return;
      if (this.options.sort) {
        // Capture rects,
        // hide multi drag elements (by positioning them absolute),
        // set multi drag elements rects to dragRect,
        // show multi drag elements,
        // animate to rects,
        // unset rects & remove from DOM

        sortable.captureAnimationState();
        if (this.options.animation) {
          multiDragElements.forEach(function (multiDragElement) {
            if (multiDragElement === dragEl$1) return;
            css(multiDragElement, 'position', 'absolute');
          });
          var dragRect = getRect(dragEl$1, false, true, true);
          multiDragElements.forEach(function (multiDragElement) {
            if (multiDragElement === dragEl$1) return;
            setRect(multiDragElement, dragRect);
          });
          folding = true;
          initialFolding = true;
        }
      }
      sortable.animateAll(function () {
        folding = false;
        initialFolding = false;
        if (_this2.options.animation) {
          multiDragElements.forEach(function (multiDragElement) {
            unsetRect(multiDragElement);
          });
        }

        // Remove all auxiliary multidrag items from el, if sorting enabled
        if (_this2.options.sort) {
          removeMultiDragElements();
        }
      });
    },
    dragOver: function dragOver(_ref8) {
      var target = _ref8.target,
        completed = _ref8.completed,
        cancel = _ref8.cancel;
      if (folding && ~multiDragElements.indexOf(target)) {
        completed(false);
        cancel();
      }
    },
    revert: function revert(_ref9) {
      var fromSortable = _ref9.fromSortable,
        rootEl = _ref9.rootEl,
        sortable = _ref9.sortable,
        dragRect = _ref9.dragRect;
      if (multiDragElements.length > 1) {
        // Setup unfold animation
        multiDragElements.forEach(function (multiDragElement) {
          sortable.addAnimationState({
            target: multiDragElement,
            rect: folding ? getRect(multiDragElement) : dragRect
          });
          unsetRect(multiDragElement);
          multiDragElement.fromRect = dragRect;
          fromSortable.removeAnimationState(multiDragElement);
        });
        folding = false;
        insertMultiDragElements(!this.options.removeCloneOnHide, rootEl);
      }
    },
    dragOverCompleted: function dragOverCompleted(_ref10) {
      var sortable = _ref10.sortable,
        isOwner = _ref10.isOwner,
        insertion = _ref10.insertion,
        activeSortable = _ref10.activeSortable,
        parentEl = _ref10.parentEl,
        putSortable = _ref10.putSortable;
      var options = this.options;
      if (insertion) {
        // Clones must be hidden before folding animation to capture dragRectAbsolute properly
        if (isOwner) {
          activeSortable._hideClone();
        }
        initialFolding = false;
        // If leaving sort:false root, or already folding - Fold to new location
        if (options.animation && multiDragElements.length > 1 && (folding || !isOwner && !activeSortable.options.sort && !putSortable)) {
          // Fold: Set all multi drag elements's rects to dragEl's rect when multi-drag elements are invisible
          var dragRectAbsolute = getRect(dragEl$1, false, true, true);
          multiDragElements.forEach(function (multiDragElement) {
            if (multiDragElement === dragEl$1) return;
            setRect(multiDragElement, dragRectAbsolute);

            // Move element(s) to end of parentEl so that it does not interfere with multi-drag clones insertion if they are inserted
            // while folding, and so that we can capture them again because old sortable will no longer be fromSortable
            parentEl.appendChild(multiDragElement);
          });
          folding = true;
        }

        // Clones must be shown (and check to remove multi drags) after folding when interfering multiDragElements are moved out
        if (!isOwner) {
          // Only remove if not folding (folding will remove them anyways)
          if (!folding) {
            removeMultiDragElements();
          }
          if (multiDragElements.length > 1) {
            var clonesHiddenBefore = clonesHidden;
            activeSortable._showClone(sortable);

            // Unfold animation for clones if showing from hidden
            if (activeSortable.options.animation && !clonesHidden && clonesHiddenBefore) {
              multiDragClones.forEach(function (clone) {
                activeSortable.addAnimationState({
                  target: clone,
                  rect: clonesFromRect
                });
                clone.fromRect = clonesFromRect;
                clone.thisAnimationDuration = null;
              });
            }
          } else {
            activeSortable._showClone(sortable);
          }
        }
      }
    },
    dragOverAnimationCapture: function dragOverAnimationCapture(_ref11) {
      var dragRect = _ref11.dragRect,
        isOwner = _ref11.isOwner,
        activeSortable = _ref11.activeSortable;
      multiDragElements.forEach(function (multiDragElement) {
        multiDragElement.thisAnimationDuration = null;
      });
      if (activeSortable.options.animation && !isOwner && activeSortable.multiDrag.isMultiDrag) {
        clonesFromRect = _extends({}, dragRect);
        var dragMatrix = matrix(dragEl$1, true);
        clonesFromRect.top -= dragMatrix.f;
        clonesFromRect.left -= dragMatrix.e;
      }
    },
    dragOverAnimationComplete: function dragOverAnimationComplete() {
      if (folding) {
        folding = false;
        removeMultiDragElements();
      }
    },
    drop: function drop(_ref12) {
      var evt = _ref12.originalEvent,
        rootEl = _ref12.rootEl,
        parentEl = _ref12.parentEl,
        sortable = _ref12.sortable,
        dispatchSortableEvent = _ref12.dispatchSortableEvent,
        oldIndex = _ref12.oldIndex,
        putSortable = _ref12.putSortable;
      var toSortable = putSortable || this.sortable;
      if (!evt) return;
      var options = this.options,
        children = parentEl.children;

      // Multi-drag selection
      if (!dragStarted) {
        if (options.multiDragKey && !this.multiDragKeyDown) {
          this._deselectMultiDrag();
        }
        toggleClass(dragEl$1, options.selectedClass, !~multiDragElements.indexOf(dragEl$1));
        if (!~multiDragElements.indexOf(dragEl$1)) {
          multiDragElements.push(dragEl$1);
          dispatchEvent({
            sortable: sortable,
            rootEl: rootEl,
            name: 'select',
            targetEl: dragEl$1,
            originalEvent: evt
          });

          // Modifier activated, select from last to dragEl
          if (evt.shiftKey && lastMultiDragSelect && sortable.el.contains(lastMultiDragSelect)) {
            var lastIndex = index(lastMultiDragSelect),
              currentIndex = index(dragEl$1);
            if (~lastIndex && ~currentIndex && lastIndex !== currentIndex) {
              // Must include lastMultiDragSelect (select it), in case modified selection from no selection
              // (but previous selection existed)
              var n, i;
              if (currentIndex > lastIndex) {
                i = lastIndex;
                n = currentIndex;
              } else {
                i = currentIndex;
                n = lastIndex + 1;
              }
              for (; i < n; i++) {
                if (~multiDragElements.indexOf(children[i])) continue;
                toggleClass(children[i], options.selectedClass, true);
                multiDragElements.push(children[i]);
                dispatchEvent({
                  sortable: sortable,
                  rootEl: rootEl,
                  name: 'select',
                  targetEl: children[i],
                  originalEvent: evt
                });
              }
            }
          } else {
            lastMultiDragSelect = dragEl$1;
          }
          multiDragSortable = toSortable;
        } else {
          multiDragElements.splice(multiDragElements.indexOf(dragEl$1), 1);
          lastMultiDragSelect = null;
          dispatchEvent({
            sortable: sortable,
            rootEl: rootEl,
            name: 'deselect',
            targetEl: dragEl$1,
            originalEvent: evt
          });
        }
      }

      // Multi-drag drop
      if (dragStarted && this.isMultiDrag) {
        folding = false;
        // Do not "unfold" after around dragEl if reverted
        if ((parentEl[expando].options.sort || parentEl !== rootEl) && multiDragElements.length > 1) {
          var dragRect = getRect(dragEl$1),
            multiDragIndex = index(dragEl$1, ':not(.' + this.options.selectedClass + ')');
          if (!initialFolding && options.animation) dragEl$1.thisAnimationDuration = null;
          toSortable.captureAnimationState();
          if (!initialFolding) {
            if (options.animation) {
              dragEl$1.fromRect = dragRect;
              multiDragElements.forEach(function (multiDragElement) {
                multiDragElement.thisAnimationDuration = null;
                if (multiDragElement !== dragEl$1) {
                  var rect = folding ? getRect(multiDragElement) : dragRect;
                  multiDragElement.fromRect = rect;

                  // Prepare unfold animation
                  toSortable.addAnimationState({
                    target: multiDragElement,
                    rect: rect
                  });
                }
              });
            }

            // Multi drag elements are not necessarily removed from the DOM on drop, so to reinsert
            // properly they must all be removed
            removeMultiDragElements();
            multiDragElements.forEach(function (multiDragElement) {
              if (children[multiDragIndex]) {
                parentEl.insertBefore(multiDragElement, children[multiDragIndex]);
              } else {
                parentEl.appendChild(multiDragElement);
              }
              multiDragIndex++;
            });

            // If initial folding is done, the elements may have changed position because they are now
            // unfolding around dragEl, even though dragEl may not have his index changed, so update event
            // must be fired here as Sortable will not.
            if (oldIndex === index(dragEl$1)) {
              var update = false;
              multiDragElements.forEach(function (multiDragElement) {
                if (multiDragElement.sortableIndex !== index(multiDragElement)) {
                  update = true;
                  return;
                }
              });
              if (update) {
                dispatchSortableEvent('update');
                dispatchSortableEvent('sort');
              }
            }
          }

          // Must be done after capturing individual rects (scroll bar)
          multiDragElements.forEach(function (multiDragElement) {
            unsetRect(multiDragElement);
          });
          toSortable.animateAll();
        }
        multiDragSortable = toSortable;
      }

      // Remove clones if necessary
      if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== 'clone') {
        multiDragClones.forEach(function (clone) {
          clone.parentNode && clone.parentNode.removeChild(clone);
        });
      }
    },
    nullingGlobal: function nullingGlobal() {
      this.isMultiDrag = dragStarted = false;
      multiDragClones.length = 0;
    },
    destroyGlobal: function destroyGlobal() {
      this._deselectMultiDrag();
      off(document, 'pointerup', this._deselectMultiDrag);
      off(document, 'mouseup', this._deselectMultiDrag);
      off(document, 'touchend', this._deselectMultiDrag);
      off(document, 'keydown', this._checkKeyDown);
      off(document, 'keyup', this._checkKeyUp);
    },
    _deselectMultiDrag: function _deselectMultiDrag(evt) {
      if (typeof dragStarted !== "undefined" && dragStarted) return;

      // Only deselect if selection is in this sortable
      if (multiDragSortable !== this.sortable) return;

      // Only deselect if target is not item in this sortable
      if (evt && closest(evt.target, this.options.draggable, this.sortable.el, false)) return;

      // Only deselect if left click
      if (evt && evt.button !== 0) return;
      while (multiDragElements.length) {
        var el = multiDragElements[0];
        toggleClass(el, this.options.selectedClass, false);
        multiDragElements.shift();
        dispatchEvent({
          sortable: this.sortable,
          rootEl: this.sortable.el,
          name: 'deselect',
          targetEl: el,
          originalEvent: evt
        });
      }
    },
    _checkKeyDown: function _checkKeyDown(evt) {
      if (evt.key === this.options.multiDragKey) {
        this.multiDragKeyDown = true;
      }
    },
    _checkKeyUp: function _checkKeyUp(evt) {
      if (evt.key === this.options.multiDragKey) {
        this.multiDragKeyDown = false;
      }
    }
  };
  return _extends(MultiDrag, {
    // Static methods & properties
    pluginName: 'multiDrag',
    utils: {
      /**
       * Selects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be selected
       */
      select: function select(el) {
        var sortable = el.parentNode[expando];
        if (!sortable || !sortable.options.multiDrag || ~multiDragElements.indexOf(el)) return;
        if (multiDragSortable && multiDragSortable !== sortable) {
          multiDragSortable.multiDrag._deselectMultiDrag();
          multiDragSortable = sortable;
        }
        toggleClass(el, sortable.options.selectedClass, true);
        multiDragElements.push(el);
      },
      /**
       * Deselects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be deselected
       */
      deselect: function deselect(el) {
        var sortable = el.parentNode[expando],
          index = multiDragElements.indexOf(el);
        if (!sortable || !sortable.options.multiDrag || !~index) return;
        toggleClass(el, sortable.options.selectedClass, false);
        multiDragElements.splice(index, 1);
      }
    },
    eventProperties: function eventProperties() {
      var _this3 = this;
      var oldIndicies = [],
        newIndicies = [];
      multiDragElements.forEach(function (multiDragElement) {
        oldIndicies.push({
          multiDragElement: multiDragElement,
          index: multiDragElement.sortableIndex
        });

        // multiDragElements will already be sorted if folding
        var newIndex;
        if (folding && multiDragElement !== dragEl$1) {
          newIndex = -1;
        } else if (folding) {
          newIndex = index(multiDragElement, ':not(.' + _this3.options.selectedClass + ')');
        } else {
          newIndex = index(multiDragElement);
        }
        newIndicies.push({
          multiDragElement: multiDragElement,
          index: newIndex
        });
      });
      return {
        items: _toConsumableArray(multiDragElements),
        clones: [].concat(multiDragClones),
        oldIndicies: oldIndicies,
        newIndicies: newIndicies
      };
    },
    optionListeners: {
      multiDragKey: function multiDragKey(key) {
        key = key.toLowerCase();
        if (key === 'ctrl') {
          key = 'Control';
        } else if (key.length > 1) {
          key = key.charAt(0).toUpperCase() + key.substr(1);
        }
        return key;
      }
    }
  });
}
function insertMultiDragElements(clonesInserted, rootEl) {
  multiDragElements.forEach(function (multiDragElement, i) {
    var target = rootEl.children[multiDragElement.sortableIndex + (clonesInserted ? Number(i) : 0)];
    if (target) {
      rootEl.insertBefore(multiDragElement, target);
    } else {
      rootEl.appendChild(multiDragElement);
    }
  });
}

/**
 * Insert multi-drag clones
 * @param  {[Boolean]} elementsInserted  Whether the multi-drag elements are inserted
 * @param  {HTMLElement} rootEl
 */
function insertMultiDragClones(elementsInserted, rootEl) {
  multiDragClones.forEach(function (clone, i) {
    var target = rootEl.children[clone.sortableIndex + (elementsInserted ? Number(i) : 0)];
    if (target) {
      rootEl.insertBefore(clone, target);
    } else {
      rootEl.appendChild(clone);
    }
  });
}
function removeMultiDragElements() {
  multiDragElements.forEach(function (multiDragElement) {
    if (multiDragElement === dragEl$1) return;
    multiDragElement.parentNode && multiDragElement.parentNode.removeChild(multiDragElement);
  });
}

Sortable.mount(new AutoScrollPlugin());
Sortable.mount(Remove, Revert);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sortable);



/***/ }),

/***/ "ol/Observable":
/*!********************************!*\
  !*** external "ol.Observable" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = ol.Observable;

/***/ }),

/***/ "ol/Overlay":
/*!*****************************!*\
  !*** external "ol.Overlay" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = ol.Overlay;

/***/ }),

/***/ "ol/control/Control":
/*!*************************************!*\
  !*** external "ol.control.Control" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = ol.control.Control;

/***/ }),

/***/ "ol/extent":
/*!****************************!*\
  !*** external "ol.extent" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = ol.extent;

/***/ }),

/***/ "ol/geom":
/*!**************************!*\
  !*** external "ol.geom" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = ol.geom;

/***/ }),

/***/ "ol/interaction":
/*!*********************************!*\
  !*** external "ol.interaction" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = ol.interaction;

/***/ }),

/***/ "ol/layer/Vector":
/*!**********************************!*\
  !*** external "ol.layer.Vector" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = ol.layer.Vector;

/***/ }),

/***/ "ol/source/Vector":
/*!***********************************!*\
  !*** external "ol.source.Vector" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = ol.source.Vector;

/***/ }),

/***/ "ol/sphere":
/*!****************************!*\
  !*** external "ol.sphere" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = ol.sphere;

/***/ }),

/***/ "ol/style":
/*!***************************!*\
  !*** external "ol.style" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = ol.style;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*******************************************************!*\
  !*** ./src/packages/Controls/Measures/MeasureArea.js ***!
  \*******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CSS_Controls_Measures_GPFmeasureArea_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../CSS/Controls/Measures/GPFmeasureArea.css */ "./src/packages/CSS/Controls/Measures/GPFmeasureArea.css");
/* harmony import */ var _Control__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Control */ "./src/packages/Controls/Control.js");
/* harmony import */ var ol_sphere__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/sphere */ "ol/sphere");
/* harmony import */ var ol_sphere__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ol_sphere__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ol_geom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/geom */ "ol/geom");
/* harmony import */ var ol_geom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ol_geom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Utils/LoggerByDefault */ "./src/packages/Utils/LoggerByDefault.js");
/* harmony import */ var _Utils_SelectorID__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Utils/SelectorID */ "./src/packages/Utils/SelectorID.js");
/* harmony import */ var _MeasureAreaDOM__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MeasureAreaDOM */ "./src/packages/Controls/Measures/MeasureAreaDOM.js");
/* harmony import */ var _Measures__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Measures */ "./src/packages/Controls/Measures/Measures.js");
/* harmony import */ var _ToolBoxMeasure_MeasureToolBox__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../ToolBoxMeasure/MeasureToolBox */ "./src/packages/Controls/ToolBoxMeasure/MeasureToolBox.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
// import CSS

// import "../../CSS/Controls/Measures/GPFmeasureAreaStyle.css";
// import OpenLayers
// import Control from "ol/control/Control";



// import local


// DOM

// import local with ol dependencies



// Derived from OpenLayers measure example
// http://openlayers.org/en/latest/examples/measure.html

var logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_4__["default"].getLogger("measurearea");

/**
 * @classdesc
 *
 * Tool Measure Area Control. Allows users to measure the length of a path drawn on the map.
 *
 * @constructor
 * @alias ol.control.MeasureArea
 * @type {ol.control.MeasureArea}
 * @extends {ol.control.Control}
 * @param {Object} options - options for function call.
 * @param {Boolean} [options.geodesic = true] - If true, area will be computed on the global sphere using the {@link https://openlayers.org/en/latest/apidoc/module-ol_sphere.html#geodesicArea ol.Sphere.geodesicArea()} function. Otherwise, area will be computed on the projected plane.
 * @param {Object} [options.styles = {}] - styles used when drawing. Specified with following properties.
 * @param {Object} [options.styles.pointer = {}] - Style for mouse pointer when drawing the polygon to measure. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Image-ImageStyle.html ol.style.Image} subclass object.
 * @param {Object} [options.styles.start = {}] - Polygon Style when drawing. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.htmll ol.style.Style} object.
 * @param {Object} [options.styles.finish = {}] - Polygon Style when finished drawing. Specified with an {@link https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.htmll ol.style.Style} object.
 * <!-- @param {Object} [options.tooltip = {}] - NOT YET IMPLEMENTED ! -->
 * @param {Object} [options.layerDescription = {}] - Layer informations to be displayed in LayerSwitcher widget (only if a LayerSwitcher is also added to the map)
 * @param {String} [options.layerDescription.title = "Mesures de surface"] - Layer title to be displayed in LayerSwitcher
 * @param {String} [options.layerDescription.description = "Mes mesures"] - Layer description to be displayed in LayerSwitcher
 * @example
 * var measureArea = new ol.control.MeasureArea({
 *    geodesic : false
 * });
 */
var MeasureArea = /*#__PURE__*/function (_Control) {
  function MeasureArea(options) {
    var _this;
    _classCallCheck(this, MeasureArea);
    /**
     * options
     * @private
     */
    options = options || {};

    // call ol.control.Control constructor
    _this = _callSuper(this, MeasureArea, [{
      element: options.element,
      target: options.target,
      render: options.render
    }]);
    if (!(_this instanceof MeasureArea)) {
      throw new TypeError("ERROR CLASS_CONSTRUCTOR");
    }

    /**
     * Nom de la classe (heritage)
     * @private
     */
    _this.CLASSNAME = "MeasureArea";

    // uuid
    _this._uid = _Utils_SelectorID__WEBPACK_IMPORTED_MODULE_5__["default"].generate();

    // container d'activation du controle
    _this._pictoContainer = null;

    // initialisation du composant
    _this._initialize(options);

    // creation du DOM container
    _this._container = _this._initializeContainer();

    // ajout du container
    _this.element ? _this.element.appendChild(_this._container) : _this.element = _this._container;
    return _possibleConstructorReturn(_this, _this);
  }

  // ################################################################### //
  // ##################### public methods ############################## //
  // ################################################################### //

  /**
   * Overwrite OpenLayers setMap method
   *
   * @param {ol.Map} map - Map.
   */
  _inherits(MeasureArea, _Control);
  return _createClass(MeasureArea, [{
    key: "setMap",
    value: function setMap(map) {
      logger.trace("setMap()");
      var className = this.CLASSNAME;

      // on fait le choix de ne pas activer les events sur la map à l'init de l'outil,
      // mais uniquement à son utilisation !
      if (map) {
        // var self = this;
        // map.on("click", function (e) {
        //     logger.trace("event on map with click!");
        //     self.onPointerMoveHandler(e);
        // });
        //
        // map.on("singleclick", function (e) {
        //     logger.trace("event on map with singleclick!");
        //     self.onPointerMoveHandler(e);
        // });
        //
        // map.on("pointermove", function (e) {
        //     logger.trace("event on map with pointermove!");
        //     self.onPointerMoveHandler(e);
        // });

        if (!this.options.target && !this.options.position) {
          _ToolBoxMeasure_MeasureToolBox__WEBPACK_IMPORTED_MODULE_8__["default"].add(map, this);
        }
      } else {
        this.clean();
      }

      // sauvegarde de l'état de l'outil
      this.tools[className].push({
        instance: map ? this : null,
        active: false,
        map: map ? map.getTargetElement().id : null
      });

      // contexte d'execution
      var context = typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : null;
      if (context) {
        // Pour info
        // les objets de mesures ont du code partagé
        // (afin de gerer les interactions entre eux).
        // Dans un mode "modules", on partage cet objet (this.tools) via le contexte
        // d'execution (ex. avec window)
        if (!context.gpShareMeasures) {
          context.gpShareMeasures = {};
        }
        context.gpShareMeasures[className] = this.tools[className];
      }

      // on appelle la méthode setMap originale d'OpenLayers
      _get(_getPrototypeOf(MeasureArea.prototype), "setMap", this).call(this, map);

      // position
      if (this.options.position) {
        this.setPosition(this.options.position);
      }
    }

    // ################################################################### //
    // ##################### init component ############################## //
    // ################################################################### //

    /**
     * Initialize measure control (called by constructor)
     *
     * @param {Object} options - options
     *
     * @private
     */
  }, {
    key: "_initialize",
    value: function _initialize(options) {
      logger.trace("call MeasureArea::_initialize() : ", options);

      // liste des options
      this.options = {};
      this.options.geodesic = typeof options.geodesic !== "undefined" ? options.geodesic : true;
      this.options.position = typeof options.position !== "undefined" ? options.position : null;
      this.options.target = typeof options.target !== "undefined" ? options.target : null;
      this.options.render = typeof options.render !== "undefined" ? options.render : null;
      this.options.layerDescription = typeof options.layerDescription !== "undefined" ? options.layerDescription : {
        title: "Mesures de surface",
        description: "Mes mesures"
      };

      // gestion des styles !
      this.createStylingMeasureInteraction(options.styles);
    }

    /**
     * initialize component container (DOM)
     *
     * @returns {DOMElement} DOM element
     *
     * @private
     */
  }, {
    key: "_initializeContainer",
    value: function _initializeContainer() {
      logger.trace("call MeasureArea::_initializeContainer() : ", this._uid);
      var container = this._createMainContainerElement();
      ;
      var picto = this._pictoContainer = this._createShowMeasureAreaPictoElement();
      container.appendChild(picto);
      return container;
    }

    // ################################################################### //
    // ##################### overridden methods ########################## //
    // ################################################################### //

    /**
     * Add all events on map
     *
     * @private
     */
  }, {
    key: "addMeasureEvents",
    value: function addMeasureEvents() {
      var _this2 = this;
      logger.trace("call MeasureArea::addMeasureEvents()");
      var map = this.getMap();
      map.on("singleclick", function (e) {
        return _this2.onPointerMoveHandler(e);
      });
      map.on("pointermove", function (e) {
        return _this2.onPointerMoveHandler(e);
      });
    }

    /**
     * Remove all events on map
     *
     * @private
     */
  }, {
    key: "removeMeasureEvents",
    value: function removeMeasureEvents() {
      var _this3 = this;
      logger.trace("call MeasureArea::removeMeasureEvents()");
      var map = this.getMap();
      map.un("singleclick", function (e) {
        return _this3.onPointerMoveHandler(e);
      });
      map.un("pointermove", function (e) {
        return _this3.onPointerMoveHandler(e);
      });
    }

    /**
     * Format length output.
     *
     * @param {ol.geom.Polygon} polygon - geometry polygon.
     * @return {String} The formatted output.
     * @private
     */
  }, {
    key: "format",
    value: function format(polygon) {
      logger.trace("call MeasureArea::format()");
      var measure;
      if (this.options.geodesic) {
        var geom = polygon.clone();
        var coordinates = geom.getLinearRing(0).getCoordinates();
        measure = Math.abs((0,ol_sphere__WEBPACK_IMPORTED_MODULE_2__.getArea)(new ol_geom__WEBPACK_IMPORTED_MODULE_3__.Polygon([coordinates])));
      } else {
        measure = polygon.getArea();
      }
      var output;
      if (measure > 1000000) {
        output = Math.round(measure / 1000000 * 100) / 100 + " " + "km<sup>2</sup>";
      } else if (measure > 100000) {
        output = Math.round(measure / 1000000 * 1000) / 1000 + " " + "km<sup>2</sup>";
      } else if (measure > 1000) {
        output = Math.round(measure / 10) * 10 + " " + "m<sup>2</sup>";
      } else {
        output = Math.round(measure * 100) / 100 + " " + "m<sup>2</sup>";
      }
      return output;
    }

    // ################################################################### //
    // ####################### handlers events to dom #################### //
    // ################################################################### //

    /**
     * this method is called by event 'click' on picto
     *
     * @param {Object} e - HTMLElement
     *
     * @private
     */
  }, {
    key: "onShowMeasureAreaClick",
    value: function onShowMeasureAreaClick(e) {
      logger.trace("call MeasureArea::onShowMeasureAreaClick()", e);

      // appel de la methode commune
      this.onShowMeasureClick(e, "Polygon");
    }
  }]);
}(_Control__WEBPACK_IMPORTED_MODULE_1__["default"]);

// on récupère les mixins de la classe "MeasureAreaDOM" ainsi que celles
// de "Measures".
Object.assign(MeasureArea.prototype, _Measures__WEBPACK_IMPORTED_MODULE_7__["default"]);
Object.assign(MeasureArea.prototype, _MeasureAreaDOM__WEBPACK_IMPORTED_MODULE_6__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MeasureArea);

// Expose MeasureArea as ol.control.MeasureArea (for a build bundle)
if (window.ol && window.ol.control) {
  window.ol.control.MeasureArea = MeasureArea;
}
})();

MeasureArea = __webpack_exports__["default"];
/******/ })()
;
//# sourceMappingURL=MeasureArea.js.map