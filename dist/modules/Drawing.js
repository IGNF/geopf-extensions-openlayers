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

/***/ "./src/packages/Controls/Drawing/DrawingDOM.js":
/*!*****************************************************!*\
  !*** ./src/packages/Controls/Drawing/DrawingDOM.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utils/LoggerByDefault */ "./src/packages/Utils/LoggerByDefault.js");

var logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__["default"].getLogger("DrawingDOM");
var DrawingDOM = {
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
    container.id = this._addUID("GPdrawing");
    container.className = "GPwidget gpf-widget gpf-widget-button";
    return container;
  },
  // ################################################################### //
  // ################### Methods of main container ##################### //
  // ################################################################### //

  /**
   * Show mouse position control
   *
   * @returns {DOMElement} DOM element
   */
  _createShowDrawingPictoElement: function _createShowDrawingPictoElement() {
    var self = this;
    var button = document.createElement("button");
    button.id = this._addUID("GPshowDrawingPicto");
    button.className = "GPshowOpen GPshowAdvancedToolPicto GPshowDrawingPicto gpf-btn gpf-btn-icon gpf-btn-icon-drawing fr-btn";
    button.title = this.options.labels.control;
    button.setAttribute("tabindex", "0");
    button.setAttribute("aria-pressed", false);

    // gestionnaire d'evenement :
    // on ouvre le menu de saisie de saisie
    // L'ouverture/Fermeture permet de faire le menage
    // (reinitialisation)
    if (button.addEventListener) {
      button.addEventListener("click", function (e) {
        var status = e.target.ariaPressed === "true";
        e.target.setAttribute("aria-pressed", !status);
        self.onShowDrawingClick(e);
      });
    } else if (button.attachEvent) {
      button.attachEvent("onclick", function (e) {
        var status = e.target.ariaPressed === "true";
        e.target.setAttribute("aria-pressed", !status);
        self.onShowDrawingClick(e);
      });
    }
    return button;
  },
  /**
   * Drawing panel
   *
   * @returns {DOMElement} DOM element
   */
  _createDrawingPanelElement: function _createDrawingPanelElement() {
    var dialog = document.createElement("dialog");
    dialog.id = this._addUID("GPdrawingPanel");
    dialog.className = "GPpanel gpf-panel fr-modal";
    return dialog;
  },
  _createDrawingPanelDivElement: function _createDrawingPanelDivElement() {
    var div = document.createElement("div");
    div.className = "gpf-panel__body fr-modal__body";
    return div;
  },
  _createDrawingToolsDivSections: function _createDrawingToolsDivSections() {
    var div = document.createElement("div");
    div.className = "gpf-panel__content fr-modal__content";
    return div;
  },
  // ################################################################### //
  // ####################### Panel container ########################### //
  // ################################################################### //

  /**
  * Creates drawing Panel header DOM structure
  * @returns {DOMElement} DOM element
  */
  _createDrawingPanelHeaderElement: function _createDrawingPanelHeaderElement() {
    /*
     * <div class="GPpanelHeader">
     *     <div class="GPpanelTitle">Annoter la carte</div>
     *     <div id="GPdrawingPanelClose" class="GPpanelClose" title="Fermer le panneau"></div>
     * </div>
     */

    var container = document.createElement("div");
    container.className = "GPpanelHeader gpf-panel__header fr-modal__header fr-m-1w";
    var divTitle = document.createElement("div");
    divTitle.className = "GPpanelTitle gpf-panel__title fr-modal__title fr-m-1w";
    divTitle.innerHTML = this.options.controlLabel || "Annoter la carte";
    container.appendChild(divTitle);
    var divClose = document.createElement("button");
    divClose.id = this._addUID("GPdrawingPanelClose");
    divClose.className = "GPpanelClose GPdrawingPanelClose gpf-btn gpf-btn-icon-close fr-btn--close fr-btn fr-btn--secondary fr-m-1w";
    divClose.title = "Fermer le panneau";

    // Link panel close / visibility checkbox
    var dtObj = this;
    if (divClose.addEventListener) {
      divClose.addEventListener("click", function () {
        document.getElementById(dtObj._addUID("GPshowDrawingPicto")).click();
      }, false);
    } else if (divClose.attachEvent) {
      divClose.attachEvent("onclick", function () {
        document.getElementById(dtObj._addUID("GPshowDrawingPicto")).click();
      });
    }
    var span = document.createElement("span");
    span.className = "GPelementHidden gpf-visible"; // afficher en dsfr
    span.innerText = "Fermer";
    divClose.appendChild(span);
    container.appendChild(divClose);
    return container;
  },
  /**
   * Creates drawing tools section.
   *
   * @returns {DOMElement} DOM element
   */
  _createDrawingToolsSections: function _createDrawingToolsSections() {
    var tools = [];
    this.dtOptions = {};
    if (this.options.tools.points) {
      this.dtOptions.points = {
        label: this.options.labels.points,
        active: false,
        panel: "draw",
        id: "point"
      };
    }
    if (this.options.tools.lines) {
      this.dtOptions.lines = {
        label: this.options.labels.lines,
        active: false,
        panel: "draw",
        id: "line"
      };
    }
    if (this.options.tools.polygons) {
      this.dtOptions.polygons = {
        label: this.options.labels.polygons,
        active: false,
        panel: "draw",
        id: "polygon"
      };
    }
    if (this.options.tools.holes) {
      this.dtOptions.holes = {
        label: this.options.labels.holes,
        active: false,
        panel: "draw",
        id: "holes"
      };
    }
    if (this.options.tools.text) {
      this.dtOptions.text = {
        label: this.options.labels.text,
        active: false,
        panel: "draw",
        id: "text"
      };
    }
    if (this.options.tools.edit) {
      this.dtOptions.edit = {
        label: this.options.labels.edit,
        active: false,
        panel: "edit",
        id: "edit"
      };
    }
    if (this.options.tools.display) {
      this.dtOptions.display = {
        label: this.options.labels.display,
        active: false,
        panel: "edit",
        id: "display"
      };
    }
    if (this.options.tools.tooltip) {
      this.dtOptions.tooltip = {
        label: this.options.labels.tooltip,
        active: false,
        panel: "edit",
        id: "tooltip"
      };
    }
    if (this.options.tools.remove) {
      this.dtOptions.remove = {
        label: this.options.labels.remove,
        active: false,
        panel: "edit",
        id: "remove"
      };
    }
    // ajout drawing tools
    if (this.dtOptions.points || this.dtOptions.lines || this.dtOptions.polygons || this.dtOptions.text) {
      tools.push(this._createDrawingToolSection(this.options.labels.creatingTools, "draw"));
    }
    // ajout editing tools
    if (this.dtOptions.edit || this.dtOptions.display || this.dtOptions.tooltip || this.dtOptions.remove) {
      tools.push(this._createDrawingToolSection(this.options.labels.editingTools, "edit"));
    }
    // ajout export tools
    if (this.options.tools["export"]) {
      tools.push(this._createSavingSection(this.options.labels["export"], this.options.labels.exportTitle));
    }
    return tools;
  },
  /**
   * Creates drawing tool section DOM structure.
   *
   * @param {String} sectionLabel - section title
   * @param {String} panelType - Drawing ("draw") or editing ("edit") tools panel
   * @returns {DOMElement} DOM element
   */
  _createDrawingToolSection: function _createDrawingToolSection(sectionLabel, panelType) {
    /*
     * Exemple panelType == "draw"
     *
     * <div class="drawing-tool-section">
     *     <p class="drawing-tool-section-title">Outils de création</p>
     *     <ul class="drawing-tools-flex-display">
     *         <li id="drawing-tool-point" class="drawing-tool" title="Placer des points"></li>
     *         <li id="drawing-tool-line" class="drawing-tool" title="Dessiner des lignes"></li>
     *         <li id="drawing-tool-polygon" class="drawing-tool" title="Dessiner des polygones"></li>
     *         <li id="drawing-tool-text" class="drawing-tool" title="Ecrire sur la carte"></li>
     *     </ul>
     * </div>
     */
    var container = document.createElement("div");
    container.className = "drawing-tool-section fr-m-1w";
    var p = document.createElement("p");
    p.className = "drawing-tool-section-title fr-m-1w";
    p.innerHTML = sectionLabel;
    container.appendChild(p);
    var ul = document.createElement("ul");
    ul.className = "drawing-tools-flex-display fr-m-1w";
    var context = this;
    // li click handler function
    function liClickHandler(e) {
      /* jshint validthis: true */
      // this == elem clicked
      context._handleDOMToolClick(e, this.id, context);
      context._handleToolClick(e, this.id, context);
    }
    for (var type in this.dtOptions) {
      if (this.dtOptions[type].panel !== panelType) {
        continue;
      }
      var li = document.createElement("li");
      li.className = "drawing-tool fr-m-1w";
      li.id = this._addUID("drawing-tool-" + this.dtOptions[type].id);
      li.title = this.dtOptions[type].label;
      li.addEventListener("click", liClickHandler);
      ul.appendChild(li);
    }
    container.appendChild(ul);
    return container;
  },
  /**
   * Creates drawing tool section DOM structure.
   *
   * @param {String} buttonLabel - Button label
   * @param {String} buttonTitle - Button title
   * @returns {DOMElement} DOM element
   */
  _createSavingSection: function _createSavingSection(buttonLabel, buttonTitle) {
    /*
     * <div class="drawing-tool-section drawing-tools-flex-display">
     *     <button title="Exporter en KML" class="tool-form-submit drawing-button" id="drawing-export" type="button">Exporter</button>
     * </div>
     */
    var container = document.createElement("div");
    container.className = "drawing-tool-section drawing-tools-flex-display fr-m-1w";
    var button = document.createElement("button");
    button.title = buttonTitle;
    button.className = "tool-form-submit drawing-button fr-btn fr-btn--secondary fr-m-1w";
    button.id = this._addUID("drawing-export");
    button.type = "button";
    button.textContent = buttonLabel;
    var context = this;
    /** export function */
    button.onclick = function () {
      context.onExportFeatureClick();
    };
    container.appendChild(button);
    return container;
  },
  /**
   * Creates input for color choosing
   *
   * @param {Object} options - options
   * @param {String} options.defaultValue - defaultValue
   * @param {String} options.className - input className
   * @returns {DOMElement} - created li element
   */
  _createMarkersChooser: function _createMarkersChooser(options) {
    var li = document.createElement("li");
    li.className = options.className;
    for (var i = 0; i < this.options.markersList.length; i++) {
      // radio bouton pour la selection
      var inputElem = document.createElement("input");
      inputElem.type = "radio";
      inputElem.name = "marker";
      inputElem.id = this._addUID("marker-" + i);
      inputElem.value = this.options.markersList[i].src;
      inputElem.className = "marker-input-radio";
      if (options.defaultValue === inputElem.value) {
        inputElem.checked = true;
      }
      li.appendChild(inputElem);
      // label pour l'affichage du marker
      var labelElem = document.createElement("label");
      labelElem.className = "marker-label"; // utile ?
      labelElem.setAttribute("for", inputElem.id);
      var imgElem = document.createElement("img");
      imgElem.src = inputElem.value;
      labelElem.appendChild(imgElem);
      li.appendChild(labelElem);
    }
    return li;
  },
  /**
   * Creates input for color choosing
   *
   * @param {Object} options - options
   * @param {String} options.label - label
   * @param {String} options.type - input type for element ("color")
   * @param {String} options.defaultValue - defaultValue
   * @param {String} options.id - input id
   * @param {String} options.title - input title
   * @param {String} options.className - input className
   * @returns {DOMElement} - created li element
   */
  _createStylingElement: function _createStylingElement(options) {
    var li = document.createElement("li");
    li.className = options.className;
    var textNode = document.createTextNode(options.label);
    li.appendChild(textNode);
    var inputElem = document.createElement("input");
    try {
      inputElem.type = options.type;
    } catch (e) {
      // ie 11 input type== color ne marche pas...
      inputElem.type = "text";
    }
    inputElem.id = options.id;
    inputElem.value = options.defaultValue;
    if (options.title) {
      inputElem.title = options.title;
    }
    // si options.type == "checkbox"
    if (options.checked !== undefined) {
      inputElem.checked = options.checked;
    }
    // si options.type == "range"
    if (options.min !== undefined) {
      inputElem.min = options.min;
    }
    if (options.max !== undefined) {
      inputElem.max = options.max;
    }
    if (options.step !== undefined) {
      inputElem.step = options.step;
    }
    li.appendChild(inputElem);
    return li;
  },
  /**
   * Creates Styling div to include in popup.
   *
   * @param {Object} options - toolId selected
   * @param {String} options.geomType - gemeotryType selected ("Point", "Line" or "Polygon")
   * @param {Object} options.labels - values to title
   * @param {Object} options.initValues - values to init fields
   * @param {Function} options.applyFunc - function called when apply is selected
   * @returns {DOMElement} DOM element created
   */
  _createStylingDiv: function _createStylingDiv(options) {
    var div = document.createElement("div");
    div.className = "gp-styling-div";
    var ul = document.createElement("ul");
    var li = null;
    /*
     * TODO : finir de remplir la div pour tous les styles éditables.
     */
    var geomType = options.geomType.toLowerCase();
    switch (geomType) {
      case "point&text":
      case "point":
        li = this._createMarkersChooser({
          className: "gp-styling-option",
          // defaultValue : this.options.markersList[0].src
          defaultValue: options.initValues.markerSrc
        });
        ul.appendChild(li);
        li = this._createStylingElement({
          type: "range",
          className: "gp-styling-option",
          label: this.options.labels.markerSize,
          title: "petit, moyen ou grand",
          id: this._addUID("markerSize"),
          min: 5,
          max: 15,
          step: 5,
          defaultValue: options.initValues.markerSize * 10
        });
        ul.appendChild(li);
        // EVOL
        // proposer une palette de couleur pour peindre un pictogramme monochrome
        // li = this._createStylingElement({
        //     type : "color",
        //     className : "gp-styling-option",
        //     label : this.options.labels.markerColor,
        //     id : this._addUID("markerColor"),
        //     defaultValue : options.initValues.markerColor
        // });
        // ul.appendChild(li);
        if (options.initValues.markerCustom) {
          // FIXME que faire des icones customisés ?
        }
        if (geomType === "point&text") {
          li = this._createStylingElement({
            type: "checkbox",
            className: "gp-styling-option",
            label: this.options.labels.labelDisplay,
            id: this._addUID("labelDisplay"),
            checked: options.initValues.labelDisplay,
            defaultValue: options.initValues.labelDisplay
          });
          ul.appendChild(li);
        }
        break;
      case "text":
        li = this._createStylingElement({
          type: "color",
          className: "gp-styling-option",
          label: this.options.labels.fillColor,
          id: this._addUID("fillColor"),
          defaultValue: options.initValues.fillColor
        });
        ul.appendChild(li);
        li = this._createStylingElement({
          type: "color",
          className: "gp-styling-option",
          label: this.options.labels.strokeColor,
          id: this._addUID("strokeColor"),
          defaultValue: options.initValues.strokeColor
        });
        ul.appendChild(li);
        li = this._createStylingElement({
          type: "range",
          className: "gp-styling-option",
          label: this.options.labels.strokeWidth,
          title: "1 à 10 pixels",
          id: this._addUID("strokeWidth"),
          min: 1,
          max: 10,
          step: 1,
          defaultValue: options.initValues.strokeWidth
        });
        ul.appendChild(li);
        break;
      case "line":
        li = this._createStylingElement({
          type: "color",
          className: "gp-styling-option",
          label: this.options.labels.strokeColor,
          id: this._addUID("strokeColor"),
          defaultValue: options.initValues.strokeColor
        });
        ul.appendChild(li);
        li = this._createStylingElement({
          type: "range",
          className: "gp-styling-option",
          label: this.options.labels.strokeWidth,
          title: "1 à 10 pixels",
          id: this._addUID("strokeWidth"),
          min: 1,
          max: 10,
          step: 1,
          defaultValue: options.initValues.strokeWidth
        });
        ul.appendChild(li);
        break;
      case "polygon":
        li = this._createStylingElement({
          type: "color",
          className: "gp-styling-option",
          label: this.options.labels.strokeColor,
          id: this._addUID("strokeColor"),
          defaultValue: options.initValues.strokeColor
        });
        ul.appendChild(li);
        li = this._createStylingElement({
          type: "range",
          className: "gp-styling-option",
          label: this.options.labels.strokeWidth,
          title: "1 à 10 pixels",
          id: this._addUID("strokeWidth"),
          min: 1,
          max: 10,
          step: 1,
          defaultValue: options.initValues.strokeWidth
        });
        ul.appendChild(li);
        li = this._createStylingElement({
          type: "color",
          className: "gp-styling-option",
          label: this.options.labels.fillColor,
          id: this._addUID("fillColor"),
          defaultValue: options.initValues.fillColor
        });
        ul.appendChild(li);
        li = this._createStylingElement({
          type: "range",
          className: "gp-styling-option",
          label: this.options.labels.fillOpacity,
          title: "0 (transparent) à 100% (opaque)",
          id: this._addUID("fillOpacity"),
          min: 0,
          max: 10,
          step: 1,
          defaultValue: options.initValues.fillOpacity * 10
        });
        ul.appendChild(li);
        break;
      default:
        logger.log("Unhandled geometry type for styling.");
    }
    div.appendChild(ul);
    // apply button
    var applyButton = document.createElement("input");
    applyButton.type = "button";
    applyButton.className = "gp-styling-button";
    applyButton.value = this.options.labels.applyToObject;
    /** click sur applyButton */
    applyButton.onclick = function () {
      options.applyFunc.call(this, "apply");
    };
    div.appendChild(applyButton);
    // set default button
    var setDefaultButton = document.createElement("input");
    setDefaultButton.type = "button";
    setDefaultButton.value = this.options.labels.setAsDefault;
    setDefaultButton.className = "gp-styling-button";
    /** click sur set Default Button */
    setDefaultButton.onclick = function () {
      options.applyFunc.call(this, "default");
    };
    div.appendChild(setDefaultButton);
    // cancel Button
    var cancelButton = document.createElement("input");
    cancelButton.type = "button";
    // cancelButton.value = "X" ;
    cancelButton.className = "gp-styling-button closer";
    /** click sur cancel Button */
    cancelButton.onclick = function () {
      options.applyFunc.call(this, "cancel");
    };
    div.appendChild(cancelButton);
    return div;
  },
  /**
   * Creates Text editing div to include in popup.
   *
   * @param {Object} options - options for popup
   * @param {String} options.geomType - gemeotryType selected ("Point", "Line" or "Polygon")
   * @param {String} options.text - text to fill input.
   * @param {String} options.key - property name called when text is to be saved.
   * @param {String} options.measure - measure to fill input.
   * @param {String} options.placeholder - placeholder for text input.
   * @param {String} options.inputId - text input id.
   * @param {Function} options.applyFunc - function called when text is to be saved.
   * @returns {DOMElement} DOM element created
   * @private
   */
  _createLabelDiv: function _createLabelDiv(options) {
    var popup = document.createElement("div");
    popup.className = "gp-label-div";
    var inputLabel = null;
    if (options.geomType === "Text") {
      inputLabel = document.createElement("input");
      inputLabel.type = "text";
      inputLabel.className = "gp-input-label-style";
    } else {
      inputLabel = document.createElement("textArea");
      inputLabel.rows = 2;
      inputLabel.cols = 40;
      inputLabel.className = "gp-textarea-att-label-style";
    }
    if (options.text) {
      inputLabel.value = options.text;
    }
    inputLabel.autocomplete = "off";
    inputLabel.placeholder = options.placeholder;
    inputLabel.id = options.inputId;
    popup.appendChild(inputLabel);
    // blur
    inputLabel.onblur = function () {
      options.applyFunc.call(this, options.key, inputLabel.value, true);
    };
    // keyup
    inputLabel.onkeyup = function (evtk) {
      if (options.geomType === "Text" && evtk.keyCode === 13) {
        options.applyFunc.call(this, options.key, inputLabel.value, true);
      }
      if (evtk.keyCode === 27) {
        options.applyFunc.call(this, options.key, inputLabel.value, false);
      }
    };
    if (options.measure && options.geomType !== "Text") {
      var inputMeasure = document.createElement("input");
      inputMeasure.type = "text";
      inputMeasure.readonly = true;
      inputMeasure.className = "gp-input-measure-style";
      inputMeasure.value = options.measure;
      popup.appendChild(inputMeasure);
    }
    if (options.geomType !== "Text") {
      // apply button
      var applyButton = document.createElement("input");
      applyButton.type = "button";
      applyButton.className = "gp-styling-button";
      applyButton.value = this.options.labels.saveDescription;
      /** click sur applyButton */
      applyButton.onclick = function () {
        options.applyFunc.call(this, options.key, inputLabel.value, true);
      };
      popup.appendChild(applyButton);
      // cancel Button
      var cancelButton = document.createElement("input");
      cancelButton.type = "button";
      cancelButton.className = "gp-styling-button closer";
      /** click sur cancel Button */
      cancelButton.onclick = function () {
        options.applyFunc.call(this, options.key, inputLabel.value, false);
      };
      popup.appendChild(cancelButton);
    }
    return popup;
  },
  /**
   * Handles drawing tool selection from a DOM point of view.
   *
   * @param {Event} e - DOM Event
   * @param {String} toolId - toolId selected
   * @param {DrawingDOM} context - Drawing control instance
   */
  _handleDOMToolClick: function _handleDOMToolClick(e, toolId, context) {
    for (var availType in context.dtOptions) {
      var availToolId = context._addUID("drawing-tool-" + context.dtOptions[availType].id);
      var li = document.getElementById(availToolId);
      // ce n'est pas l'outil selectionne : on le desactive (s'il ne l'était pas déjà).
      if (availToolId !== toolId) {
        li.className = "drawing-tool";
        context.dtOptions[availType].active = false;
        continue;
      }
      // ici, c'est le l'outil selectionne
      if (context.dtOptions[availType].active) {
        li.className = "drawing-tool";
      } else {
        li.className = "drawing-tool drawing-tool-active";
      }
      context.dtOptions[availType].active = !context.dtOptions[availType].active;
    }
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DrawingDOM);

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

/***/ "./src/packages/Controls/Utils/Markers.js":
/*!************************************************!*\
  !*** ./src/packages/Controls/Utils/Markers.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Marker = {
  lightOrange: "data:image/png;base64,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IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICB4bWxuczpHSU1QPSJodHRwOi8vd3d3LmdpbXAub3JnL3htcC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgeG1wTU06RG9jdW1lbnRJRD0iZ2ltcDpkb2NpZDpnaW1wOjkyYWVkNjM2LWY3MDMtNDAzOC1hNzM4LWZiYzYxYzZlMTljNCIKICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5NWMzZWI3NC0zYWRmLTRkYzUtOWZjZS1iODQ4NTc3Nzg4ODQiCiAgIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0NjI3ZDg3NC1lZDIyLTRiZTUtYTlkNS00NDlmMzVhZDIxYzgiCiAgIGRjOkZvcm1hdD0iaW1hZ2UvcG5nIgogICBHSU1QOkFQST0iMi4wIgogICBHSU1QOlBsYXRmb3JtPSJMaW51eCIKICAgR0lNUDpUaW1lU3RhbXA9IjE2ODQ5NDE5Mjc4OTUzMDYiCiAgIEdJTVA6VmVyc2lvbj0iMi4xMC4zMCIKICAgdGlmZjpPcmllbnRhdGlvbj0iMSIKICAgeG1wOkNyZWF0b3JUb29sPSJHSU1QIDIuMTAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDphM2U3ZWQ1MS0xNTI4LTRhYjAtODVjOS0zNzNkNzgxZGM2ZmMiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkdpbXAgMi4xMCAoTGludXgpIgogICAgICBzdEV2dDp3aGVuPSIyMDIzLTA1LTI0VDE3OjI1OjI3KzAyOjAwIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PofUkY4AAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfnBRgPGRuA4VZTAAAFcElEQVRYw82YW2xbVRaGv7XP8bHjXByHQkNhWigdVX1AikRBMBoQ8wASl4fRqPDAAxIPKAVxeRqQRohHBEVCaoGKUBCl4qHcNKCZVKMRRQxtgTaACLRKqlwB14NzM2ni2D2XvXjgBFXQOnFiA1uy/HB89u9/7bX+vf4l1HnpK57hTNCE0AzqAS5gAAuEID5KiWSiLPf4tp7YUjcSu4yLZzdi2IJyNXANcBlwAdAKzAHTwDhwDKEPywC+GZWHbPi7IKOvZIWguAnlr8BtwJ+AxDJeDYCPgF6Ed0hkh+Weov5mZLTHJMDeBjwYk0itYJtKTOpZML3SbYNfnYz2SBr0buARYENcFytdFvga2AGyT7p14Vcjoz3ShOgdKDuAi+pUewpMIDyCypvSreWGk9HdroOEV2F4A1hfTxGJCX2D5U7U/UzuD6NaXq49NRJhBsOjwMVLEtE4gaL4W5cV3IsxPEoizDT0ZLTHcSH6M/BWLLlVwpQKuPzhb+i8sRkv04Y/e5rvPigxtnM9trKU2k0D28A5LN3RsmXbrbFOU8DtQLpqfJqu97nh6TydmzvwWpOI8VDbxqbrkmz62yk+/Ps6yoe8KkeV/hHHfgrMNyrNEkBX1SAktgRs3T7ApV1rSWayiEkDLmLSJDNZLu1ay9btAyS2BEsEuWuZ99WKyRhgHeCcn8wGw/qbOnAS3jmfOwmP9Td1kNhQDduJcUwjyciS0RJXMMkWkPPUo/z4XFxZRhZII8mEwFCsT+f5xXTE7FAOteduItVaZodyhNPVZDeKccJGkxmsChIMOvTt6aRSzIP+7A9rRKWYp29PJ8GgsyqcVauZSADaj+IDTecWvBlD4e01HKjM07XtOOuuy+A2X0BYmib/8SxfvLWRYm8LdqZaCvkI/SDBci6nld0ze7KCLa4F3gSurR4MB5x1FnMhiCeor9hJiPKmWpbGp3EU2IbJFuTe5XfStbczLxgP7K0IPcCFDWhnJoFuMAek2/oNbWdku/WxHATejT1JPZcPvINysFYiK+gAFkXTK6H+MyhXADeseJ9fmrVDM6X080/+p1M2/yFsD1zjEIauEeMAqNpQE16oaKiqwfjYeLk+fuYl10HDq7DsBTavxs8o6FzFKez/dM3rLx9LjUyVxcb7yVkfzmpXFbACJURHIxgyxkyu1ml6qL0Z4YX4xl7Jfrrgm9Ov9bX/e++x1tHCgkQ11lgELGA4sBp3iHRbH5GDwJPAFLXo6KJnDmTh/aG2w2/3t47VSGQxs1zAE9U2s9pEjx3hXuBloCa7G1rxv8o3f/7SkUz/UFFWMqGRWMpHAqsDbl00KGotIXM7MawF7gKSS5oJJRospI7v+rD96Ikp8aV2EgrkVPW4OnIy6SVL9ZubvZgyaOVyYDfwl2oNqVWiXNEb231oTe+/BrzvK9Gy01MFyoiOKzIEmqsEfjGf/39U1yHgosJFUXhlFMl+z9E/nkvhVNHZsjux+9Caf77RnyzMBaJLmW4RrWAlB3Y4Uh13HLOA4wQjo6O2IRPNxVV4JuG5Et2SSelzjtFLzsZQ0NIZ8/2rx7K9+/paxqbKvyh4Bc4AFQxzau23Dow7FS+nHmfEUz05OqINH8+evXJPJVOuE93XkY4eSziaXcQpB2b+vZNt7+/8IPPl2OxPRMJ4dDsLzIho3hpzamJ6aqJ0ei6qtZAasmZ2OS1RyOMd6egBIzSFVoKj4y1Hnvhv+8cD02ZOkEmgIKITVnXKWDs1ksvNrgbTbRSZ46cypY50aWcllIsyKXvr8GTyi9f6WvePFGVQhO8EPW2NzI+OfV2pF2bDTgbg8D/aJeVUspd1BK3/G24u7/skO3+iYP3h3LdhI/B+AGodUpo8WKwoAAAAAElFTkSuQmCC",
  darkOrange: "data:image/png;base64,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czpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICB4bWxuczpHSU1QPSJodHRwOi8vd3d3LmdpbXAub3JnL3htcC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgeG1wTU06RG9jdW1lbnRJRD0iZ2ltcDpkb2NpZDpnaW1wOjIxNDZjMzUzLWIxZjItNGVjOC04NzQ3LTIwMGEyYWExM2ViMyIKICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2NGViNmI2Ni03Y2I2LTRkZGUtYTI3OS01MGY0ZWFiZGFhODAiCiAgIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1ODRhM2VjZC1kNGFmLTQ3NjItYjA1ZS04ODk2MGQ4ZTk0Y2MiCiAgIGRjOkZvcm1hdD0iaW1hZ2UvcG5nIgogICBHSU1QOkFQST0iMi4wIgogICBHSU1QOlBsYXRmb3JtPSJMaW51eCIKICAgR0lNUDpUaW1lU3RhbXA9IjE2ODQ5NDE5MDM3ODI2MTQiCiAgIEdJTVA6VmVyc2lvbj0iMi4xMC4zMCIKICAgdGlmZjpPcmllbnRhdGlvbj0iMSIKICAgeG1wOkNyZWF0b3JUb29sPSJHSU1QIDIuMTAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoxYzNjOGRkZi1kMjVkLTQ4YzQtYTAwYS0yMmU3ZDYwMzg1YjYiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkdpbXAgMi4xMCAoTGludXgpIgogICAgICBzdEV2dDp3aGVuPSIyMDIzLTA1LTI0VDE3OjI1OjAzKzAyOjAwIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PuhCAHgAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfnBRgPGQOTjc4FAAAFdklEQVRYw82YW2gcZRTHf+eb2dlkc9lsrFYr2notfSgWxKKiog8VvIFI9UFQEaWtYPFJfREfRRSEeqlttViLD/WGisYXrShWpfWC1WpSN5eN3cZumkuTzWY3c/mOD9lI0WSTTXbVA8M8zMz3n//5zvl/5xyhxqb3ewYvaERpAvUAFzCABUIQH6GAHyvKa76tJbbUjMRW4+LbC7GsQbgCWA+sAs4AWoA8MAxkgEMo32LoxDO98oIN/xdk9IGUYEYvRrgduAW4Gogt4NMA+BroQHkfm+qW3aP6n5HRTSYG9hZga5lEwyKWKZVJvQCmQ3bZ4F8no5skAXov8BiwspwXizUL9APPgOyVXTr5r5HRzdKI1TsRngHOqlHuKTCI8hhG3padWqw7GX3IddDwcixvAefXUkTKhH7HcBfifi8vh1E1H1cfGkGYxPI4cM68RGw5zf3y3S7IuedgeZwgTNZ1Z3Sz46LRNcA7Zcmd25yGgPWP/M7q65toTLZSHBvn6OcFDm07n6g0n9oNAxsR54DsjBYs2251QWAbgFuBREX/tF3rc9+zA6xa3U5jSxwxHmpbueyqOOvvOM7rj67g1JfedFTNagngVtR+B0zUK8xiwLqKTmhcE3Dblk4uXbecRDKFmATgIiZBIpni0nXLuW1LJ41rgnmcvG6B59WiyRhgBeDM+UZipWHthnbcmDf7b8Y81m5oJ7GyErZTxjH1JCPzesu4ghtvBpkjH2X6uXFlAVEg9SMjhEAamFsyp4Yjcuks1s6uXdZacuksU8OVZDcC0mW8OpFRQqBruvqdwwpdDh+9cjaF0QHQv/2wRhRGB6afdzkVkKZxtDoyVaqZBKCHEXygcXafjhi63l3G9tIEGzYe4ZKrksSbzmCqMEz6mzE+eedC+juaiUYqhZCPchgkqKB4SzxntqQEO7oceBu4srIzHIitsMTOBOMJ1leCkxAMmEpRWt6Vg8BGTConOxZeSVdfzmwxHmpvRtkJnFmHcuYksBkxH8tO69e1nJEd1sdhP/BBuUippfnA+3jsr5ZI9TnzV33mFcB/DuEi4LpFr/PPZu3LkanES08fOltWnxe2Ba5xCEPXiHEAVG2oMS9UNFTVINOXKdamn3nQdSC8HMMeYPVS+hkFzQdObl9m2Zu7+xt6hkKx5fXktGumdNXyZQUKiPZGkDbGnFxqp+kh9kaUHeUTezHr6WRkxt/oa/toT39Lby6QqMoci4BJDB8vpTtEdlkflf3A08AQ1ejoTM8cyeRnudYD72Zb+qokMhNZLuCJaqtZaqDLLi0i7EHYDVTV7oZW/J9PNf3wanfycLoki5nQSFnKewKrnW5NNMhtKRDlt6EsB+4G4vM2/UrUNd5w5Pl028FfiuJL9SQUyKrqEXXkaNyLF2o3N9vUYKB0AbAduKFSQWqVKFv0+rYfXdbx4aB3qqQLDk8VKCKaUSQNmi0F/ujAwB9RTYeAMwoXabg2QvZ5jl4ym8Ip6FjgDm7/bdl7bw3Ec/lItEJyWyAS0RJWsmC7I9WM45hJHCfo6e21dZlozlju3pjnSnRT0tMXHdFzT8dQ0EJoTr2eSXXs7W/uG/pnwiswBZQw5NXaYw5knJKXVY8p8VSP9vZo3cezp1v2nniDK9FD7V70RMxoaganGJmJT0+0frbtt+RPfVN/EQnLo9sxYEREB6wxxweHhwYL4/mo2kSqi43c5zRH8GS7Fz1shMZQJTg41PzVU7+2fdNZNHlBTgI5ER20qkPG2qGebHZsSTpULzJH8slCe6ywrWTlrGTM3tw9Ef/xjUzLvp6idIlwQtBxa2Sit6+/VCvMuu0MwIE726RBSqlViaDli6Gm4t6e1MQveet3Z4+F9cD7Ewo4WRJBbaaSAAAAAElFTkSuQmCC",
  red: "data:image/png;base64,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293bv2fa/f0ASM5yljz/NiUAAA0aaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA0LjQuMC1FeGl2MiI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICB4bWxuczpHSU1QPSJodHRwOi8vd3d3LmdpbXAub3JnL3htcC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgeG1wTU06RG9jdW1lbnRJRD0iZ2ltcDpkb2NpZDpnaW1wOmI5YjA2YTAwLWZkOTQtNDc5MC1hNzIzLTlkMGUwNGRiNTRlNyIKICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1MTQ3ZGU5Yi1kOTA0LTRlNWYtYjIyYy0wZmMzOGRmMWI3ZGEiCiAgIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4YzBjNTI2YS1lYTkyLTQxYWItODM5Yy05OWFhYTM0YjdlYzciCiAgIGRjOkZvcm1hdD0iaW1hZ2UvcG5nIgogICBHSU1QOkFQST0iMi4wIgogICBHSU1QOlBsYXRmb3JtPSJMaW51eCIKICAgR0lNUDpUaW1lU3RhbXA9IjE2ODQ5NDE2NDAxNTU0MjYiCiAgIEdJTVA6VmVyc2lvbj0iMi4xMC4zMCIKICAgdGlmZjpPcmllbnRhdGlvbj0iMSIKICAgeG1wOkNyZWF0b3JUb29sPSJHSU1QIDIuMTAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDowMjQ4MDc5ZS1kMTYyLTQxZmItOGViYS1lMzY2NTRiNGRjMjYiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkdpbXAgMi4xMCAoTGludXgpIgogICAgICBzdEV2dDp3aGVuPSIyMDIzLTA1LTI0VDE3OjIwOjQwKzAyOjAwIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PkaovgIAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfnBRgPFCiKn0kIAAAFfUlEQVRYw82YTWxc1RXHf+e+N2/GH+Px2IEEV02AgqIsIkwgoYS2ahepVGCBUOiCRRdsAAnECthErBBCICGFj4gqRQqBRSABUrVm1URtCSATJ5ASZCPHH0kGgx1/xJl5nvH7uIcFY4iIM/GzZyhHenqL994993/u+f/fOUeos+nNnkHCJoQWRD0UFzCARYhQCVB8NFWWTwNbT99SNxC3GZfIXg9sADYDWxCuRekEskARYQplFPgEOAr045ph6bXRzwKM3pEX5mduQLkHuAvYCqSW8GkIfAT0IBwknT8lH87o/w2M3mpSqL0LeLQKIrOMZSpVUC8hpkf6bPiTg9FbpBn0L8ATwLoqL5ZrFjgNPAeyV47p3E8GRjdLE6r3oTwHXF0n7ikwgfAEIvvlqJYbDkY3uw4a3YLyNrC2niJSBXQG4c+Ie0yORnGSj5OnRhzlUJ4ErrkikBAoAjPVe7ik4F6D8iRxlGvoyegmx4X4NwgHgM6a8fUyIfc8doZbf99Ca66N0uwF+v7tc3DnWoJK6gqep1C2g3NEjsdLlm03GXSbAe4GmmvGZ91vA3Y8P8aN6ztoyaYxxsPaNrbcnmbbvV/x9ONdnPnA+w71otaMcDfYPqDUmDQTUgjdNYPQsSHkgYf62di9mmwujzHNgIsxzWRzeTZ2r+aBh/rp2BDWDLLQjSzpf7VMMIpB6QKcy77Tuc6wdVsHbspbfJspj63bOuhcV8u3g9KFJtufWQbHakfLdQUv3YrI4qwQ+e65616Jr6mknE4KJgIGgctLZnEq5vRgAWsXLyKttZweLFCcqiW7cdVP1DgwQoQwUNPJxIDDG7vXMDszBvqjDWvM7MwYb+xew8SAUzNowgCSDEwyNVMJQU8AAdC06DvBtOG/76xirlLi3u0nufn2HJmWTir+FJ9+PMu7B66nr6eVYLpWCgUoJ0DCGoq3wv/MbXkhmlkN7Ad+XTMY4kBTl6XlKnA8IQ4U/xyUx8wlB3ZpKvcC23Hz49K79Ep6GeWM8VB7J8pfgasaUM6cAx5EzPvSZ4OGljNy1AYIh4C/L6lASWYBcBCHQ0mBJOfM94rk+WjwAsKvgN8te51LK7kPpm3zK89OrZH1v4zaQ9c4RJFrxDgAqjbSlBcpGqlqODoyWq5TP1OtnoU9wPqV9DMKWlRnfJ+/6q3XKpmhSRVbXU8uuhb6Hq1eVsBHdDiGQWPMuZV1mpuMB/aPCK8CXcsMjs6pufCm3/7PPZXs8LhKnJBjMTCH4f2VdIfIcRsgcgh4FpgkiY4u9Mwqc4fn2468M58dSQhkIbNcwBPVNrPSRJdjWgb2AK8BidrdSCX4PGw5/re53IlBK8uZ0EhVyodCq/1uXTTIzfrExZ0oq4H7gfQSmv54IMqcfNFv7/0ilkCSg1CgoKon1ZEv017ar9/cbEvGEFeuQ9mF8IdaBamFuBB7I7tKq3r+EXjnK0tPTxUoIzqqyCBooRIGM2NjX8d1HQIuKFys0cYY2eeJ3riYwinorHUndvmr3nt7Pj1eVNEa5LZALKIVrBTAnopVRx3HzOE44dDwsG3IRHPBxrtTnkv8p5yjLzvoLy72oaC+mvOvz+V79pZbRyYvJbwC80AFQ1GtPevAqFPxCuoxL57ql8ND2vDx7MVW2JTOuMQPdxDvSInmF/yU1ZT+Nd92eGcp97+RH4BE1XHHLDAtomPWmK8mpiYn/AvFOCmRGmLTm53WOOKpDhM/YqApQsLe+dYPnym1f9xvTVGQc8C4iE5Y1Ulj7eRQoTC7Ih1qFJiTQc7vwN9ZUbk6Z+ydp6L0Z2+Ws/uGrAyI8I2gF6yR0vDI6Uq9fDbsZACO3NQuGa3kr3XC7H+ClvJeP1/6IrbBqbNno0b4+xbMlmARngcRbAAAAABJRU5ErkJggg==",
  turquoiseBlue: "data:image/png;base64,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/MUi8H5G35QHBm+BvjV3bu1znD4AWZpV+gY4OARGS5S97vHu3u65/XunPb8fN2tyj8UDOK0AAA0aaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA0LjQuMC1FeGl2MiI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICB4bWxuczpHSU1QPSJodHRwOi8vd3d3LmdpbXAub3JnL3htcC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgeG1wTU06RG9jdW1lbnRJRD0iZ2ltcDpkb2NpZDpnaW1wOjEwNGNlNWFhLTE1YzctNGI4Yi1iOGU1LTFmYWQyNWFiYzBhZCIKICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpkNDMyZTY1Zi0xOThhLTQxM2EtYWYyMy1jNzhlNzczNGRlN2QiCiAgIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyNzExODVkMi03MWZiLTRhZDMtYTJmMi1iNjM3OWU3MDc1OTEiCiAgIGRjOkZvcm1hdD0iaW1hZ2UvcG5nIgogICBHSU1QOkFQST0iMi4wIgogICBHSU1QOlBsYXRmb3JtPSJMaW51eCIKICAgR0lNUDpUaW1lU3RhbXA9IjE2ODQ5NDE4NjYyMzgzMjQiCiAgIEdJTVA6VmVyc2lvbj0iMi4xMC4zMCIKICAgdGlmZjpPcmllbnRhdGlvbj0iMSIKICAgeG1wOkNyZWF0b3JUb29sPSJHSU1QIDIuMTAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo1NGFiYzNkYS1lZWJiLTRlZjctYjdjNS04ZDRjODY5OGVjODMiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkdpbXAgMi4xMCAoTGludXgpIgogICAgICBzdEV2dDp3aGVuPSIyMDIzLTA1LTI0VDE3OjI0OjI2KzAyOjAwIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Pj0tlUwAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfnBRgPGBru/VeEAAAABmJLR0QA/wD/AP+gvaeTAAAFO0lEQVRYw9WYe2xTVRzHTx97dYS5B1UHa+/tY12dDoOKWyIGlfgHkCkSNTHGwHxA3NiAP/A5x4CMKEzdYL29YyAyBxKQZbI+NvYIaowaH9Ogi2GRbGjcFrbBNrq2a2/9nq5LCFnbbfSOeZJPTs/t6Tm/7/39zu+cU0IiXc7WSImNX0BsZiVYAhigmah5tHklsZrjSYtJSuZtaeSiiJU3gHUwfC9oARfBIHBP1DzaPH1eRuzmp0E6aTgSNX9EWMwSvOkMGPgG+CpguG8a0H7nA78zkMYqye0V0lYXDSHrYUw7cE5TxM04/b+38+vJ+RPRt0eIjVeAAhhyCQizFDKJEBjndaCY49Di4+CRlzFxfwSE3Ciol9i4DSBujoRUy7HIszFxdwSF3CioBy8qm1g5ufhirHwyJqwHrrDGWTlg8hFL1URN2+EF0XFPkyYuSWwhUVgnT2CygXBG3dFcM7bz1/au1u7OK9/93eWidUlHe1dCc810EsUAsXOPQZCI3rGZ6Wb4EXAEM0SCUFnZduz6T/09l4bHXYOCz+f0+XxeWg+7XYM/4vnKtlqHJHSIOrAHlYMFYmawRNCKycaDGZLVfMRdf/nPDpfXM+abotDnpy93dtzXfNgdZg+im2uimJ6h66UTeIMZsrat1jvkdPRRb/imLt4hl6N3DfqFEIPvOMzDJYspJsWfbUKEyFNttcKoyzkKo4UgYoRRt3OE9guT1br984nsmQ7gCWbIipaj4xeu9v/hFQTPlG7B89+u9v9O+4UQQ8f/BSlaVM8kgBOhji4p9mpvwQ+Wfwddjp6bQw2u8g44HT3535/tTUa/0Eccvg4sFDE1m2PBZkx2LVRqVcLQvG/PDDX1/tVxze38x+UZH6O1He28b764qgwtxOcf327eBGLFE9NikiD3qzDZhVBJgCJH3KubDnkfbD4s5Jw74qM1bcvDnxq8/vHt1SrS9InIJ2m7OQ4UYsKhCB9lJqHj0gPsHJzPvsS9w8rRRPDptI40M8PlH9fOJ5M5K008rsZmIwi5gc4QN9Zja8zn+5epch9PTFepU1iGuVunVqeyS9g0iv8zy96l0WiSjIsXx28iJEJhaONkMGB5YP14bkmI1SzIz1T0pRa9VKnNzCjUMcwWUAS2BtgWYLJN+xTo1OyrOhW7xsAwqnSGkd3i+uGjkT5Xw6DLt3AdEKQNB4YXbdtwQpuVuRtG7pwhxWA7vJgRib0nDuSDvtkIkjYcHE3aVWjRLL9/zyyETPK2Vq3OidAaOhiPDLcbxo3MRIik0eReWPnO15pHHiqbpYhS6hkNw7wAz0To6GM5hAzH3wkDa6b7x4bEwnkUfMnP6idX7Nex7GxElIDNerV6hU6jSdbp9RHck2w0w/FaGGoJm7KtnCfmWNlF1fOrK3Q6bekMRFABO7QM8yxewFLUi+5JSxPpAmcxy0gjt1Rytir4NcHKCfJTH/al5j1j1hr0pWEML55YD+x2GP6cVqNZZjQYEvUsG4vP4v8jKju5L1p6qnytxGKa6qogyOorBpVbXvxMe69xdxABb9I0DAGvIIRWp7NsBsJIoWVZKfaXuf+jMKp2b6z8+Adb4aErNwpCCh5J2pnfoH0ga08g7invBfaQjXjjuQifhyEgLdNolJP5UqR17y+QnSwvk1i565OZK6F8RzubvWwvDH8LvKZnmHXY8HKws+sNLJtI5muJ/7hYElOzJ1V+fN9R7CVDClPJOVXuqo06vS4HQjTwgDKDZRXk/1JiD7wrieFLk6T1lczCXUVK7aPZinS9XrTw+Q+Tql7SUmvGuQAAAABJRU5ErkJggg==",
  defaultOffset: [-25.5, -32]
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Marker);

/***/ }),

/***/ "./src/packages/Controls/Utils/MarkersOther.js":
/*!*****************************************************!*\
  !*** ./src/packages/Controls/Utils/MarkersOther.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var MarkersOther = {
  /**
   * portail icons used by drawing control with a good ratio !
   *
   * @example
   * image size : [32, 41]
   * scale : 32 / Math.min(size[0], size[1]) = 1
   */
  drawing_portail: [{
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAApCAMAAABjq9sOAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAClFBMVEUAAAD//////////////////////////////////////////////////////////fv/+fL//////////////////////////////////////////////////////////////////////////////////////v7//////fr/////+vL//////////////////Pj//////////////////////////////////////////////////////////////////////////v7//////////////////////////////////////v7//////////////////////////////////////////////////////////////////////////////v7/////////////9+v/9ej/9+z/7tT/3q3/y3//v2D/uU//+O7/5L3/xW//piH/mQH/mAD//v7/79f/yXj/oxr/lwD/mQD//fv/58T/tkr/mQL//v3/58P/sTz/79b/tUf/x3X/mQP/5Lv/oRX/ng3/s0H/w2n/u1b/4rf/8Nr/9eb/7tX/pBv/x3P/8d7/3av/79j///7/zH//mgX/2qP//vz/9+3/wGH/qyz/6Mb/vFj/sj//7NH/wGL/rTP/6sr/+fH/yXf/oBP/37H/2aH/6sz/nw//oBT/0pD/+vT/9OX/uE7/pB3/y33/7ND//Pj/26b/mwj/nAn/sT7/w2r/zYL/8+P/ulT/mwb/5Lz/qCj/+/b/1JT/nQz/nQ3/9uj/w2j/mAH/9un/6sv/skH/lwH/3Kf/pB7/pR7/3Kj/nAj/y37/+/f/8t//mQT/rDD/rDH/1JX/7tb/4LT/pR//z4j/z4n/vFn/7dP/4rn//fq31ydlAAAAY3RSTlMAAAMQLWqp1fMBEUOe6Pn8/gUukuz+CU3EW9kGUNsCMsvxrzbuePq1/OD++P3qw/2N+0j2GMcHYx68BOkMd/x2IKf+pjrS0WDvXxSL+Cy3TEsIdRyhoDXINOSK8rY72mnrhe2jCycJAAAAAWJLR0QB/wIt3gAAAAd0SU1FB+cFGQAhKnVAysoAAAMmSURBVDjLY2AAA0ZGJmYWVjZ2juRkDnY2VhZmJkZGBiTAyMnFzcPLxy+QkpqaIsDPx8vDzcWJpIJRUEhYRDQtPSMzKzs7KzMjPU1URFhIEK6CUUxcIjknNy+/oBAMCvLzcnOSJcTFGGHyklJFxSWlZYWF5WBQWFhWWlJcJCUJUcEoLSNbUVlVDZWFqqmuqqyQlZEGqZCTV6iprStDkQeqKKurrVGQlwMawMWTXN+ALg9S0VCfzMPFyCAorpjW2ASzvQwIYOymxjRFcUEGLqWa5pZCqONa27Ky2lqhji1saa5R4mJQVklpL4M6rKOzq7u7q7MD6uCy9hQVZQZVtZ5eML+woK+/KBkIivr7CiAivT1qqgzqGhPA3MKy7ImTksFg0sRssEMKCyZoqDNoak2GKJ8ydVoyFEybOgUiNllLk0F7+gwwp2zmrGQ4mDUT7KzCGdO1GZJTZkMUzJmLUDB3DkTB7JRkBp3p8yAK5i9AKFgwH6Jg3nQdBt2FiyD2LV5SBJMvWrIYIrZooS6Dnv5SCKesPQ2mIK0dEpyFS/X1GAwMly2H8FasXAWRX7VyBURk+TJDAwYj49VroAG3dt16oC1F69ethQbtmtXGRgwmphs2boKq2Lxl67ZtW7dshspv2rjB1ITBzFxn+44yeGTu3AmPzrId23XMzRg4LSwrdu2GJQdQkoQxd++qsLTgZGC0MrLes3cfZoLZv3ePtZEVMM0x2tjqHDh4CD3JHdp62M7eBpxqOR0cnY4cPYaaaI8dPeLk7MAJSfZyLq4Vx08UIqkoLDx5qsLNRQ6WMQTdPfasO42sYPOZsx6eiKzF6eXtc27HebiKwvM7zvl4e3EiZU5fv+TcC4icdTFX1M8XNXv7yyZfaoEpaLmULBuAIs/AEGivsrAd4ozCze0LVYICUeUZGIND+C63gTJQYVNbMV9oMJoBQBVh4clXroKC+uqV5PAIDHmgCsnIimv7Cgv3Xa+IlMQiDwzyqOiUG1Om3EiJjrLBpgDojBi7mxcu3LSLCcYqD1QRGzft1q1pcbE45IExH59w+3ZCvBUuBUBnJCYlJaI6AABB269xUXFElwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMy0wNS0yNVQwMDoyOTozNyswMDowMEpaoL8AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjMtMDUtMjRUMjI6NDM6MjIrMDA6MDB1WI3HAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg==",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAApCAMAAABjq9sOAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACplBMVEUAAAD//////////////////////////////////////////////////////////fz/9/P//////////////////////////////////////////////////////////////////////////////////////v7//////Pr/////////////////////+/n//////////////////////////////////////////////////////////////////////////v7//////////////////////////////////////v7//////////////////////////////////////////////////////////////////////////////v7/////////////8+3/8er/9O7/5dj/zrX/s4z/oHH/lmL/9fD/2MT/qX7/ejj/Zxz/Zhn/Zhr//v7/59z/rof/djL/ZBf/Zxv//fz/3Mr/k13/aBz/ZRn//f3/i1D/5tr/kVr/ZRj/rIP//v3/1sL/cy3/byf/jVX/pnn/aB3/mmf/077/6d7/8On/5tn/dzT/q4H/6+H/zbP/lmH/s43/ah//yK3/9O//oXL/gUP/3cz/m2n/jVT/5Nb/onP/hkn/4ND/9vL/rob/cSv/0Ln/x6r/Zxr/Yxb/pXn/8+7/4NH/cCj/ciz/vZz/+PX/7+f/lWH/eDT/sov/49X/+/n/ya//ayH/bCP/jFL/pnr/tJD/7ub/mWb/ZBb/aiD/18P/fj3/+vf/vp//bSX/bib/v5//pXj/8uv/yrD/eDX/eTb/y7H/bCL/soz/7OL/18T/g0b/hEb/v6D/cy7/wKH/9vP/5tv/jlX/59v/0rz/ejf/uJX/nGr/aR//nGv/g0X/1cD//PvyoJNrAAAAYnRSTlMAAAMQLWqp1fMBEUOe6Pn8/gUukuz+CU3EW9kGUNsCMsvxrzbuePq1/OD4/erD/Y37SPYYxwdjHrwE6Qx3/HYgp/6mOtLRYO9fFIv4LLdMSwh1HKGgNcg05IrytjvaaeuF7djGYAwAAAABYktHRAH/Ai3eAAAAB3RJTUUH5wUZACErAkf6XAAAA0JJREFUOMtjYAADRkYmZhZWNnaOpCQOdjZWFmYmRkYGJMDIycXNw8vHL5CckpIswM/Hy8PNxYmkglFQSFhENDUtPSMzKyszIz0tVVREWEgQroJRTFwiKTsnNy+/oBAICvLzcnOykyTExRhh8pJSRcUlpWWFheVgUFhYVlpSXCQlCVHBKC0jW1FZVV1TjgRqqqsqK2RlpEEq5OQVaivrygrLUUBhWV1lrYK8HNAALp6k+oZGNHmgisaG+iQeLkYGQXHF1KZ8mO2NZWUwtYX5TamK4oIMXErNLa0FEKGatvbMzPa2GoiSgtaWZiUuBmWV5I5GiHxnV3dPb29Pd1cnREVjR7KKMoOqWl9/IcTICROLkoCgaOIEiJWF/X1qqgzqGpPA3MKyycVgeaCK4slgTxXmT9JQZ9AUmAJRPnVaRRIUVEybChGbIqDJoDV9BpjTOHNWEhzMmgl2VuGM6VoMScmzwQrK5sxFKJg7pwysYHZyEoP29HkQE+YvQChYMB9iwrzp2gw6CxeBFRQsXlIEky9ashgcMoWLFuow6OotBXOWLV+xEqZg5Yrly8CalurpMugbrFoNMWLN2nUQ+XVr10AMWL3KQJ/B0Gj9BkhINm7ctBkkv3nTRqjAhvVGhgzGJlu2boMG7fYdO3ft2rljOzTot23dYmLMYGqmvXvPXmgE7i3bt69sLzQ69+7ZrW1mysBpblGx/0AjLLGBAITdeGB/hYU5JwOjpaHVwUOHMRPMkaMHrQwtgWmO0dpGO+VYAXqSK+g4bmtnDU61nPYOjgvaURNdYWP7Kkcne05Ispdzdqk4cbIGSUVhzanTFa7OcrCMIejmfnDTmQKEgoIzZw+6eyCyFqenl/e5PeVwIwrL95zz9vLkRMqcPr5J5y/AHFpYcPG8qK8Pavb2k026dBkaGo2XryTJ+qPIMzAE2KlcXbEN7IyCbR1XVQIDUOUZGIOC+a61VwMtKay+foMvJAjNAKCK0LCkm7dAIX3rZlJYOIY8UIVkRMXtI4WFR25XREhikQcGeWRU8p27d+8lR0VaY1MAdEa0bdr9+2m20UFY5YEqYmJrHzyojY3BIQ+M+bj4hw/j4yxxKQA6IyExMQHVAQBpWLIaKI0lIgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMy0wNS0yNVQwMDoyOTozNyswMDowMEpaoL8AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjMtMDUtMjRUMjI6NDQ6MDYrMDA6MDAh7rXQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg==",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAApCAMAAABjq9sOAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACbVBMVEUAAAD/////////////////////////////////////////////////////////+/v/8vL//////////////////////////////////////////////////////////////////////////////////////v7/////+vr/////////////////////+Pj//////////////////////////////////////////////////////////////////////////v7//////////////////////////////////////v7//////////////////////////////////////////////////////////////////////////////v7/////////////6+v/6Oj/7Oz/1NT/ra3/f3//YGD/T0//7u7/vb3/b2//ISH/AQH/AAD//v7/19f/eHj/Ghr/+/v/xMT/Skr/AgL//f3/w8P/PDz/1tb/R0f/dXX/AwP/u7v/FRX/DQ3/QUH/aWn/Vlb/t7f/2tr/5ub/1dX/Gxv/c3P/3t7/q6v/2Nj/BQX/o6P//Pz/7e3/YWH/LCz/xsb/WFj/Pz//0dH/YmL/MzP/ysr/8fH/d3f/ExP/sbH/oaH/zMz/Dw//FBT/kJD/9PT/5eX/Tk7/HR3/fX3/0ND/+Pj/pqb/CAj/CQn/Pj7/amr/goL/4+P/VFT/Bgb/vLz/KCj/9vb/lJT/DAz/aGj/6en/y8v/p6f/Hh7/qKj/fn7/9/f/39//BAT/MDD/MTH/lZX/tLT/Hx//iIj/iYn/WVn/09P/ubn/+vpgzcAPAAAAYnRSTlMAAAMQLWqp1fMBEUOe6Pn8/gUukuz+CU3EW9kGUNsCMsvxrzbuePq1/OD4/erD/Y37SPYYxwdjHrwE6Qx3/HYgp/6mOtLRYO9fFIv4LLdMSwh1HKGgNcg05IrytjvaaeuF7djGYAwAAAABYktHRAH/Ai3eAAAAB3RJTUUH5wUZACErAkf6XAAAAu1JREFUOMtjYAADRkYmZhZWNnaOpCQOdjZWFmYmRkYGJMDIycXNw8vHL5CckpIswM/Hy8PNxYmkglFQSFhENDUtPSMzKyszIz0tVVREWEgQroJRTFwiKTsnNy+/AAzy83JzspMkxMUYYfKSUoVFxSUFSKCkuKhQShKiglFaRra0rLyiAAVUlJeVyspIg1TIyStUVlUXYIDqqkoFeTmgAVw8STW1BVhAbU0SDxcjg6C4YmpdPTYF9XWpiuKCDFxKlQ2NMLGm5szM5iYYr7GhUomLQVkluQXmsNa29o6O9rZWmINbklWUGVTVOrug3u/uKUwCgsKebmiAdHWqqTKoa/RCuVl9YHmgir4sqJZeDXUGTYEMCK9/wsQkKJg4oR8iliGgyaA1aTKEM2VqEhxMnQIRmzxJiyEpeRqEM30GQsGM6RCxaclJDNqTZkI4s2YjFMyeBRGbOUmbQWfOXAhn3vxCmHzh/HkQsblzdBh09RbAfJ0KU5AKC5kFeroM+gYLF0F4i5cshcgvXbIYIrJooYE+g6HRsuVQ9StWrgLaUrhq5QqowPJlRoYMxiar16yFCqxbv2Hjxg3r10G5a9esNjFmMDXT3rQZEYVbtiDYmzdpm5kycJpblG7dhi26t20ttTDnZGC0NLTavmMnpnzTju1WhpbANMdobaOdsisfXT5/w25bO2twquW0d3Dc04ymIr95j6OTPSck2cs5u5Tu3YeqYN/+UldnOVjGEHRz375yLbL8ugMH3T0QWYvT08v70ObDCPnDmw95e3lyImVOH9+knCMIBUdzRH19ULO3n2zSMXjibjyWJOuPIs/AEGCnMqcF6ox1LXNUAgNQ5RkYg4L5aprBGai+uYgvJAjNAKCK0LCk4ydACk4cTwoLx5AHqpCMKD0JDPKdp0ojJLHIA4M8Mir5dH//6eSoSGtsCoDOiLY9c+TIGdvoIKzyQBUxsRPPnp0YG4NDHhjzcfHnzsXHWeJSAHRGQmJiAqoDAOgCnVLAYqeOAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIzLTA1LTI1VDAwOjI5OjM3KzAwOjAwSlqgvwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMy0wNS0yNFQyMjo0NDoxOSswMDowMBsMxacAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAAElFTkSuQmCC",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAApCAMAAABjq9sOAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACf1BMVEUAAAD//////////////////////////////////////////////////////////P3/9Pn//////////////////////////////////////////////////////////////////////////////////////v7/////+/3/////9fr/////////////////+vz//////////////////////////////////////////////////////////////////////////v7//////////////////////////////////////v7//////////////////////////////////////////////////////////////////////////////v7/////////////7/f/7PX/8Pf/3O7/vd7/mcv/gL//c7n/8fj/yuT/jMX/Tab/NJn/MZj/Mpj//v7/3+//k8n/R6P/L5f/M5n//P3/0Of/brb//f7/z+f/Y7H/MJf/bLX/kcf/yeT/Q6H/PZ7/ZrP/h8P/d7v/xeL/4fD/6/X/3e7/SaT/j8f/5PH/u93/crn//v//mMz/N5r/tdr/gcD/Vqv/0ej/ebz/ZrL/2uz/gsD/XK3/1er/8/n/ksn/QaD/wN//tNn/1ur/P5//QqD/ptL/9vr/6vT/cbj/l8v/+vz/t9v/OJv/Opz/ZLH/iMP/m83/6fP/d7r/N5v/Uqj/Mpn/+Pv/qdT/PJ3/7fb/Z7L/uNz/SqT/S6X/udz/OZz/mMv/5fL/drr/Waz/Wqz/qtT/RKH/q9T/9Pn/3u7/Z7P/w+D/TKX/oM//PZ3/erz/Npr/3O3/x+L/+/0F2pMDAAAAY3RSTlMAAAMQLWqp1fMBEUOe6Pn8/gUukuz+CU3EW9kGUNsCMsvxrzbuePq1/OD++P3qw/2N+0j2GMcHYx68BOkMd/x2IKf+pjrS0WDvXxSL+Cy3TEsIdRyhoDXINOSK8rY72mnrhe2jCycJAAAAAWJLR0QB/wIt3gAAAAd0SU1FB+cFGQAhKwJH+lwAAAM4SURBVDjLdZNnWxNBFIVnEZGEGpBeROkSuoIUwS4KFkTFQp+wFEWzk+AmEFhEDBZQlA5ioxcRsCDYELADSvlBbnY2kACeTztz3r1znztnAOBEEAYbDDcabTKG0HiT0UbDDQYEAXRECIQmpmbmFpaS7GyJpYW5mamJUKBDECIr6802ZE5uXv6lS/l5uTmkzWZrK9EyQdja2cPLBVeuSinEipJevVJwGdrb2RJa38FRJi+8RiOk4IQQfa1QLnN0wATh5OyiLCqWUgodUdLiIqWLs5OGcN3ipiopZZBCT4gpLVG5bXFlCwhNobxsta8hyuTQVEgAkd1W8rpUezrDSvstvU5utRMB4TZV+Q18PqIqbubn36ygMELdKFdtEwJ3D4ma4X+pvHX7zp3btyr5goxa4uEOPL3uViHsV9+TQVaye9WYQFV3vTyBt899bomYGvkDyOmBvIZrBEnv+3gD3+0PMV5bp4K8VHW1eO/hdl/gR9ZzC6ahES6rsYFrC9WTfgBKmjiAbm5ZAVqaaQ5okkAgJltxhUdtK0DbI1yhlRQD/8dPOIB6+kym9WXPnnKTQU8e+4OAwOe4IVpNagFSTeO954EBICi4vQOvOru6sd/d1Yl3OtqDg0BIaE8vnjRT1dfCniJr6avCo6V6e0JDwI6d/QMv+NEOvhwaHh56OciP/sVA/84dICxcPPKK5i+Qpl+/pmn+OulXI+LwMCDYFaEsf8PH6a0mk2/5UL0pV0bsEgAiMiRq9N3Y2sCMvRuNColkM0dE7xaPq6nVkaPU4zGx0VxqBXv27mtr1g8dYt637du/R4Bj73rgoPLDR90aiPr0WXnogKv2YYgOx432Tejknhr8Mhp3ZOVpCY7GJ0xOKZZLIMXUZEL8UYHO4zx2HBZMaw9B1NcCm+PH9J/3CRf47Tt/CPX9B3Q5qecDkBjr8VON26Amhn56nErU9wGRdNr8129NfJH0t9z8TNKqAixxNhnOzGpGPTsDk8+t8VnC4bxybgyhP3PK8w7r+OzIL1yU/J2f/yu5eCF6PYBtIyVmYXp6ISYlaV2fJVLTVIuLqrTU//jszadnLC1lpEf+D2DbyMzKytRv4B+n7ayGbXJj1gAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMy0wNS0yNVQwMDoyOTozNyswMDowMEpaoL8AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjMtMDUtMjRUMjI6NDQ6MjkrMDA6MDCVg8JEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg==",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAApCAMAAABjq9sOAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACslBMVEUAAAD////////////////////////////////////////////////////////+/fz79/T////////////////////////////////////////////////////////////////////////////////////+/v7////9/Pv////79/X////////////////9+/r////////////////////////////////////////////////////////////////////////+/v7////////////////////////////////////+/v7////////////////////////////////////////////////////////////////////////////+/v7////////////58+/48ez69PDz5dzpzr3cspnUoIDQlXP69PHt18rYqIzDeU27ZjS6ZTG6ZTL+/v7059/brpPCdUe6Yy+7ZjP+/fzv29DOkm67ZzS6ZDH+/f3v28/LiWO6YzD05t/OkGy6ZDDarJH+/v3t1snAckO+bj3MjWbUn4DXpYfRmXfr08X16eH48Ovz5t3CdknZqo/26+TozLvQlXL//v7dspi8aTfmyLXUoIHGgFbv3NHSm3m5Yy/LjGby49rVoYLIhVzx39X79vPbrZK/cEHq0MDmxrS6ZjK5Yi/58/Dx4Na+bz/AcULhvab8+Pb47+rPlHHCd0ncsZf9+/rnybe9aji9azrLi2TXpojdtJv37unt18nFfVK7ZTL8+vjivqm+bTziv6n58e3WpIfWpYfx4NXMjWfnyrjCd0rDeEvoyrm9azncsZj27OXRmHbHg1nIg1rt2Mriv6rAckTjwKv79vS8ajm9ajnXpYj05t7r0sPDeUzfuKC+bT3Sm3q8aTbIglns1cf9/Pua7OXrAAAAY3RSTlMAAAMQLWqp1fMBEUOe6Pn8/gUukuz+CU3EW9kGUNsCMsvxrzbuePq1/OD++P3qw/2N+0j2GMcHYx68BOkMd/x2IKf+pjrS0WDvXxSL+Cy3TEsIdRyhoDXINOSK8rY72mnrhe2jCycJAAAAAWJLR0QB/wIt3gAAAAd0SU1FB+cFGQAhKwJH+lwAAANISURBVDjLY2AAA0ZGJmYWVjZ2juRkDnY2VhZmJkZGBiTAyMnFzcPLxy+QkpqaIsDPx8vDzcWJpIJRUEhYRDQtPSMzKzs7KzMjPU1URFhIEK6CUUxcIjknNy+/oLAICAoL8vNyc5IlxMUYYfKSUsUlpWXlRUUVYFBUVF5WWlIsJQlRwSgtI1tZVV1TW4EEamuqqyplZaRBKuTkFerqGxqLKlBAUWNDfZ2CvBzQAC6e5KbmFjR5oIqW5qZkHi5GBkFxxbTWApjtLY2NMLVFBa1piuKCDFxKbe0dhRCh2s6u7u6uzlqIksKO9jYlLgZllZSeFoh8TW9f/4QJ/X29NRAVLT0pKsoMqmoTJxVBjJw8pTgZCIqnTIZYWTRpopoqg7rGVDC3qHFayfRkMJheMg3sqaKCqRrqDJpaMyDKZ86qS4aCulkzIWIztDQZtNNmgzktc+Ymw8HcOWBnFc1O02ZITpkHVjB/wUKEgoUL5oMVzEtJZtBJWwQxYfEShIIliyEmLErTYdBdugysoHD5imKYfPGK5eCQKVq2VJdBT38lWMGq1T1rYArW9KxeBVawUl+PwcBw7TqIk9dv2AiR37hhPURk3VpDAwYj402bITHdsmXrQqAtxQu3boEEbe3mTcZGDCam27bvgAbtzl279+zZvWsnNOh3bN9masJgZq6zt3c+NALnz585c/58aHTO792rY27GwGlhWblvPzQ5HQClyQPQRLV/X6WlBScDo5WR9cFDhzETzOEjB62NrIBpjtHGVufosUL0JFd4/KidvQ041XI6ODqd6EJNdEUtJ084OTtwQpK9nItr5anTtUgqimrPnK10c5GDZQxBd4+DW88VIhQU7jx/0MMTkbU4vbx9LlysgBtRVHHxgo+3FydS5vT1S869BHNoUeHlK6J+vqjZ2182+eo1aGjUXrueLBuAIs/AEGivcqPnJtgZhbdu31AJCkSVZ2AMDuG7cxKU3otqTpbwhQajGQBUERaefPceKKjv3U0Oj8CQB6qQjKy8f7io6MH9ykhJLPLAII+KTnn46NHDlOgoG2wKgM6IsUt//DjdLiYYqzxQRWxc3ZMndXGxOOSBMR+f8PRpQrwVLgVAZyQmJSWiOgAArqa4BP2YBKMAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDUtMjVUMDA6Mjk6MzcrMDA6MDBKWqC/AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTA1LTI0VDIyOjQ0OjQ2KzAwOjAwpaS7KgAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAASUVORK5CYII=",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAApCAMAAABjq9sOAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAChVBMVEUAAAD//////////////////////////////////////////////////////////vv//fL//////////////////////////////////////////////////////////////////////////////////////v7//////vr//////////////////////vj//////v///////////////////////////////////////////////////////////////////v7//////////////////////////////////////v7//////////////////////////////////////////////////////////////////////////////v7//////////////Ov/++j//Oz/+dT/863/7X//6mD/50///O7/9r3/62//4SH/3QH/3AD//v7/+df/7Xj/4Br/3QD//vv/98T/5kr/3QL//v3/98P/5Tz/+db/5kf/7HX/3QP/9rv/4BX/3g3/5UH/6WD/62n/6Fb/9bf/+tr/++b/+dX/4Bv/7HP/+t7///7/86v/+dj/3QX/8qP//vz//O3/6mH/4iz/98b/6Fj/5T//+dH/6mL/4zP/+Mr//fH/7Hf/3xP/9LH/8qH/6mn/+Mz/3g//3xT/8JD//fT/++X/507/4B3/7X3/+ND//vj/86b/3Qj/3gn/5T7/62r/7oL/++P/6FT/3Qb/9rz/4ij//fb/8ZT/3gz//Oj/62j/3AH//On/+Mv/86f/4R7/86j/7n7//vf/+t//3QT/4zD/4zH/8JX/3xX/3gj/9bT/4R//74j/74n/6Fn/+dP/9bn//vrsMn7uAAAAYnRSTlMAAAMQLWqp1fMBEUOe6Pn8/gUukuz+CU3EW9kGUNsCMsvxrzbuePq1/OD4/erD/Y37SPYYxwdjHrwE6Qx3/HYgp/6mOtLRYO9fFIv4LLdMSwh1HKGgNcg05IrytjvaaeuF7djGYAwAAAABYktHRAH/Ai3eAAAAB3RJTUUH5wUZACErAkf6XAAAAxZJREFUOMtjYAADRkYmZhZWNnaOpCQOdjZWFmYmRkYGJMDIycXNw8vHL5CckpIswM/Hy8PNxYmkglFQSFhENDUtPSMzKyszIz0tVVREWEgQroJRTFwiKTsnNy+/AAzy83JzspMkxMUYYfKSUoVFxSVAqVIwADJKiosKpSQhKhilZWTLyisqobJQNZUV5WWyMtIgFXLyClXVNQUo8iBTaqqrFOTlgAZw8STV1qHLg1TU1SbxcDEyCIorptY3IGxHuKShPlVRXJCBS6mqsakAKt3c0tra0gxVUtDUWKXExaCsktwGFahs7+js6ursaIc6uKAtWUWZQVWtuwfML8jv7etPAoL+vt58iEhPt5oqg7rGBDC3oCBrYmESGBROzALbUpA/QUOdQVMgA6J80uQpSVAwZfIkiFiGgCaD1tRpEM70GUlwMGM6RGzaVC2GpOSZEM6s2QgFs2dBxGYmJzFoT50D4cydh1Awby5EbM5UbQad+QsgnIWLCmHyhYsWQsQWzNdh0NVbDPX1klSYgtQlUKHFeroM+gZLl0GUL1+xEiK/csVyiMiypQb6DIZGq1ZD1a9Zuw5oS+G6tWugAqtXGRkyGJus37ARKrBp85atW7ds3gTlbtyw3sSYwdRMe9t2RGTu2IGIzu3btM1MGTjNLcp27oIlB0Rslxbs2llmYc7JwGhpaLV7z17MBNO8Z7eVoSUwzTFa22jv238APckd2HLQ1s4anGo57R0cD7Wgqig40HLI0cmeE5Ls5Zxdyg4fQVZQUHDkaJmrsxwsYwi6ue9euxFJRcGmY8fdPRBZi9PTy/vE9pNwFQUnt5/w9vLkRMqcPr5JOacQOet0jqivD2r29pNNOnMWpuDsmSRZfxR5BoYAO5X5becgcbSpbb5KYACqPANjUDBfbQsoAxU0tBTxhQShGQBUERqWdP4CKKgvnE8KC8eQB6qQjCi7uLegYO+lsghJLPLAII+MSr48adLl5KhIa2wKgM6Itr1y6tQV2+ggrPJAFTGxU65enRIbg0MeGPNx8deuxcdZ4lIAdEZCYmICqgMA6f6os3UKuXAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDUtMjVUMDA6Mjk6MzcrMDA6MDBKWqC/AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTA1LTI0VDIyOjQ0OjU4KzAwOjAwOTHA6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAASUVORK5CYII=",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAApCAMAAABjq9sOAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACr1BMVEUAAAD////////////////////////////////////////////////////////7/v3y+/n////////////////////////////////////////////////////////////////////////////////////+/v7////6/f3////y+/r////////////////4/fz//////v/////////////////////////////////////////////////////////////////+/v7////////////////////////////////////+/v7////////////////////////////////////////////////////////////////////////////+/v7////////////r+ffo+PXs+ffU8+2t591/28tg0r5Pzbju+vi97ORv1sQhwKUBt5gAtpf+/v7X9O942ckavqIAtZYAt5j7/v3E7udKy7UCt5j9/v7D7uY8x7DW8+5Hy7QAtpZ118cDt5i77OQVvKANup1BybJg0b5p1cJWz7q36uLa9PDm9/XV8u4bvqNz18be9fGr59zY8+9/2ssFuJmj5dr8/v7t+fdh0r8sw6rG7+hYz7s/ybHR8uxi0r8zxazK8Onx+/l32MgTvJ+x6N+h5Nlp1MLM8OoPu54UvJ+Q39L0/Prl9/ROzbcdv6N92srQ8ez4/fym5tsIuJoJuZs+yLBq1cOC28zj9/NUz7oGuJq87OMowaf2/PuU4NQMupwNupyU4dTo+PZo1MIBtpdq1cLp+fbL8OoBtpan5tsev6Mev6So5twIuZt+2sv3/Pvf9fJUzroEt5gwxKsxxKuV4NQVvaCV4dTW8+/X8++06eEfv6T7/f2I3c6J3c9Zz7wFuJrT8u256+L6/f3ow7cxAAAAY3RSTlMAAAMQLWqp1fMBEUOe6Pn8/gUukuz+CU3EW9kGUNsCMsvxrzbuePq1/OD++P3qw/2N+0j2GMcHYx68BOkMd/x2IKf+pjrS0WDvXxSL+Cy3TEsIdRyhoDXINOSK8rY72mnrhe2jCycJAAAAAWJLR0QB/wIt3gAAAAd0SU1FB+cFGQAhKwJH+lwAAAMvSURBVDjLY2AAA0ZGJmYWVjZ2juRkDnY2VhZmJkZGBiTAyMnFzcPLxy+QkpqaIsDPx8vDzcWJpIJRUEhYRDQtPSMzKzs7KzMjPU1URFhIEK6CUUxcIjknNy+/oBAMCvLzcnOSJcTFGGHyklJFxSWlZYWF5WBQWFhWWlJcJCUJUcEoLSNbUVlVDZWFqqmuqqyQlZEGqZCTV6iprStDkQeqKKurrVGQlwMawMWTXN/QiCYPVNHYUJ/Mw8XIICiumNbUDLO9sawMprawuSlNUVyQgUuppqW1EOq4tvaOjvY2qGMLW1tqlLgYlFVSOhuhDuvq7unt7enugjq4sTNFRZlBVa2vH8wvLJgwsSgZCIomTiiAiPT3qakyqGtMAnMLG7Mng+WBKiZngx1SWDBJQ51BU2sKRPnUadOToWD6tKkQsSlamgzaM2aCOY2zZifDwexZYGcVzpyhzZCcMgesoGzuPISCeXPLwArmpCQz6MyYDzFhwUKEgoULICbMn6HDoLtoMcS+JUuLYPJFS5dAxBYv0mXQ018G4ZQtT4MpSFsOiZrCZfp6DAaGK1ZCeKtWr4HIr1m9CiKycoWhAYOR8dp10IBbv2Ej0JaijRvWQ4N23VpjIwYT002bt0BVbN22fceO7du2QuW3bN5kasJgZq6zc1cZLBGU7d5dBksaZbt26pibMXBaWFbs2QtLDqAkCWPu3VNhacHJwGhlZL1v/wHMBHPw0D5rIytgmmO0sdU5fOQoepI7euy4nb0NONVyOjg6nWg/iZpoT7afcHJ24IQkezkX14pTpwuRVBQWnjlb4eYiB8sYgu4e+zacQ1aw9fwFD09E1uL08va5eOkyXEXh5UsXfby9OJEyp69fcu4VRM66mivq54uavf1lk6+1whRcv5EsG4Aiz8AQaK+yaDnEGYVbly9SCQpElWdgDA7hu9kOykCFze23+EKD0QwAqggLT759BxTUd24nh0dgyANVSEbevXegsPDA/buRkljkgUEeFZ3y4OHDBynRUTbYFACdEWP36MqVR3YxwVjlgSpi46Y/fjw9LhaHPDDm4xOePEmIt8KlAOiMxKSkRFQHAAAsgrQ2sknLAAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMy0wNS0yNVQwMDoyOTozNyswMDowMEpaoL8AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjMtMDUtMjRUMjI6NDU6MTIrMDA6MDD2yfpjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg==",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAApCAMAAABjq9sOAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACfFBMVEUAAAD////////////////////////////////////////////////////////8/vz0/fT////////////////////////////////////////////////////////////////////////////////////+/v7////7/vv////1/fX////////////////6/vr//////v/////////////////////////////////////////////////////////////////+/v7////////////////////////////////////+/v7////////////////////////////////////////////////////////////////////////////+/v7////////////v/O/s++zw/PDc+dy9872Z7ZmA6oBz53Px/PHK9sqM64xN4U003TQx3DEy3DL+/v7f+d+T7ZNH4Ecv3C8z3TP8/vzQ99Bu5m79/v3P989j5WMw3DBs5myR7JHJ9slD4EM93j1m5WaA6YCH64d36HfF9cXh+uHr++vd+d1J4EmP7I/k+uT+//6787ty53KY7Zg33Te18rWB6oFW4lbR99F56Hna+dqC6oJc41zV+NXz/fOS7JJB30HA9MC08rQy3TKH6ofW+NY/3j9C30Km8Kb2/fbq++px53GX7Zfa+Nr6/vq387c43Tg63jpk5WSI64ib7pvp++lS4lL4/fip8ak83jzt/O1n5We487hK4UpL4Uu587k53TmY7pj4/vjl+uV26HZZ41la41qq8KpE30Sr8Kv0/fQ53jne+d7D9cNM4Uyg76B66Ho23TbH9cf7/vts+qXUAAAAY3RSTlMAAAMQLWqp1fMBEUOe6Pn8/gUukuz+CU3EW9kGUNsCMsvxrzbuePq1/OD++P3qw/2N+0j2GMcHYx68BOkMd/x2IKf+pjrS0WDvXxSL+Cy3TEsIdRyhoDXINOSK8rY72mnrhe2jCycJAAAAAWJLR0QB/wIt3gAAAAd0SU1FB+cFGQAhKwJH+lwAAAM8SURBVDjLdZP3X9NQFMVfFIUWLJRpVcoeYlVEQEUExIUyFFFRcfJqqiyb12paDQQKpQXZorJXARcbFRC3oohb/yHTJIUW8fyU5Hxz7/3cdx4ArDBs2XK7FSvtHSB0sF+5wm75MgwDVsIEQkenVSJnF/mlS3IXZ9EqJ0ehwIrAxK5u7h644vKVnNzcnCuXFbiHu5ureJ7APL1Ww7z8gqtKAjEilFcL8vPgai9PzOJL1qjU166TCGlYIURev6ZWrZFwBLZ2nbf2xk0lobESobx5Q+u9bq2ZkPr4UoVFNNLYCNFFhZSvj5QpIHSC6uLFvpkoVkMnIQbEXn54idLSnWZkeVaW4H5eYiD0p3SlXH9ElOnLy/VlBIcQpTrKXwgCAuUGmv/FWFF561ZlhZEvSBvkgQEgKLiqGnF+TW0dZFRXW8MRqLoqOAiEhNazr4huUKsgK5W6gR0EKetDQ8D6sNsc3niHgryoO43ct9th68EG/C77Qt9rgvNquseOhe7iGwCUN7MAqW9ZAFr0JAs0yyGQ4a1chbb2BaC9javQisvAxo5OFiC6ulUWX9XdxW4GdXZsBJs297CAiezFLQDeS5pYoGfzJhC+pa+fG/n+g4ec//DBfe5Lf9+WcBCx9dFjbtN09cAg00U1OFDNrZZ4/GhrBIiMGhoe4Vc7Ojb+5Mn42Ci/+pHhoahIEL1N9tRI8gdIko2NJMkfJ2l8KtsWDQTbd2h1z/g4mcyZNPGheqbT7tguAFhMxM6Jyal/AzM1ObEzIobJHBa7S/bcQCyOHGF4Hhcfy6ZWkLA7sV1vGzpET7cn7kkQcLGX7t2nffGSMFn//+q1dv9eqeViiA8kTQy8sco9Mfr2XdLBhaslOJSc8v6DZr4J0nx4n5J8SGB1OVPTYP6MZVBEfMz3SEu1vd6HveGnWb4JMfsZeh+x8QFIjw+cM3xhCeLL+Fzg0XRbH2AZx0Rfp83xRcppteh4xqICDHEiE377bl71928w8+Q/PkNITml/TCFU9kN7SrKEz6z8dJb8569fP+VZp2OXApgxzsQpZmYUcWcylvQZ4uw56vdv6tzZ//jMyZ+/8OfPhfMx/wOYMS5mZ1+0HeAvs9msMpv5tz0AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDUtMjVUMDA6Mjk6MzcrMDA6MDBKWqC/AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTA1LTI0VDIyOjQ1OjQxKzAwOjAwj8HumgAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAASUVORK5CYII=",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAApCAMAAABjq9sOAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACr1BMVEUAAAD////////////////////////////////////////////////////////9/vv5+/L////////////////////////////////////////////////////////////////////////////////////+/v7////9/fr////5+/P////////////////8/fn////////////////////////////////////////////////////////////////////////+/v7////////////////////////////////////+/v7////////////////////////////////////////////////////////////////////////////+/v7////////////3+uz1+en3+u3t9Nbd6rHK34W912i20lj4+u/j7sDD23ajxyyWvw6VvguVvgz+/v7u9drH3X+gxSWUvgmWvw39/vvm8Me00VP+/v3m8MauzkXu9Nmz0FDG3HyUvgrj7r+exCCbwhqwz0rB2XGWvw+51F7h7Lrv9dz0+Oft9NehxifF3Hrx9t/c6a+201j+//7K3oaYwBHZ56j+/vy+12moyjfn8Mn2+uy61WCwzkns89P3+u6+12qryz7p8c35+/HH3X6dwx7e67XY56aVvg2UvQjq8s6cwhuexB/R45b6/PT0+Oa20leVvgqhxijJ3oT8/fna6KqYwBOZwRavzkfB2XLL34nz+OS41F2UvQmYwBKmyDGWvwz7/PfS5JmawRebwhjT5JrB2XD1+erp8s79/vzb6ayiximixir7/PbJ3oOZwRXK3oTx9+Cpyzuqyzvj7sGexCH5+/KZwBSwz0vu9dng7LijxivO4Y6awRjO4Y+61WGXwBHt89Wpyzri7bz9/frM0I39AAAAY3RSTlMAAAMQLWqp1fMBEUOe6Pn8/gUukuz+CU3EW9kGUNsCMsvxrzbuePq1/OD++P3qw/2N+0j2GMcHYx68BOkMd/x2IKf+pjrS0WDvXxSL+Cy3TEsIdRyhoDXINOSK8rY72mnrhe2jCycJAAAAAWJLR0QB/wIt3gAAAAd0SU1FB+cFGQAhKwJH+lwAAANESURBVDjLY2AAA0ZGJmYWVjZ2juRkDnY2VhZmJkZGBiTAyMnFzcPLxy+QkpqaIsDPx8vDzcWJpIJRUEhYRDQtPSMzKzs7KzMjPU1URFhIEK6CUUxcIjknNy+/oLAICAoL8vNyc5IlxMUYYfKSUsUlpWXlhUUVYFBUWF5WWlIsJQlRwSgtI1tZVV1QWIEECguqqyplZaRBKuTkFWpq68qLKlBAUXldbY2CvBzQAC6e5PoGdHmQiob6ZB4uRgZBccW0xgKY7U3l5U0wdkFjmqK4IAOXUk1zSyHUca1tWVltrVDHFrY01yhxMSirpLQ3QeQ7Oru6e3q6uzo7ICqa2lNUlBlU1Xr7iiBG9k8oTgaC4gn9ECuL+nrVVBnUNSaCuUXlk0omJ4PB5JJJYEcXFUzUUGfQ1JoCUT512vRkKJg+bSpEbIqWJoN22gwwp2nmrGQ4mDUT7KyiGWnaDMmz54AVlM+dh1Awb245WMGc2ckMOvMXQBQsXIRQsGghRMGC+ToMuouXgBUULl1WDJMvXrYUHDJFSxbrMujpLwdzVqxsT4MpSGtfuQKsabm+HoOB4arVECPWrF0HkV+3dg3EgNWrDA0YjIzXb9gICbhNm+cBbSmet3kTJGg3blhvbMRgYrpl6zZo0G7fsXPXrp07tkODftvWLaYmDGbmOrv3rIQmk5V79+3buxKadFbu2a1jbsbAaWFZ2bwfYknFAVCaPABhb9zfXGlpwcnAaGVkffDQYcwEc+ToQWsjK2CaY7Sx1Uk9Voie5Ap3HreztwGnWk4HR6cTbU0oKoqa2k44OTtwQpK9nIvryVOnNyKpKNp45tRJNxc5WMYQdPc4e+48UrovPH/hoIcnImtxenn7XNxTATeiqGLPRR9vL06kzOnrl5x7CZGzLl8R9fNFzd7+sslHr0JDY+PVo8myASjyDAyB9irX2q+DnVF4vf2aSlAgqjwDY3AIX30bKPkWFdy4yRcajGYAUEVYePKt26Cgvn0rOTwCQx6oQjKy8s7doqK79yojJbHIA4M8Knr2/QcP7s+OjrLBpgDojBi7h48ePbSLCcYqD1QRGzf98ePpcbE45IExH5/w5ElCvBUuBUBnJCYlJaI6AADXv7i4Kd/lawAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMy0wNS0yNVQwMDoyOTozNyswMDowMEpaoL8AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjMtMDUtMjRUMjI6NDk6NDUrMDA6MDBhsioHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg==",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAApCAMAAABjq9sOAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACnVBMVEUAAAD////////////////////////////////////////////////////////7/fvy+fL////////////////////////////////////////////////////////////////////////////////////+/v7////6/Pr////////////////////4/Pj////////////////////////////////////////////////////////////////////////+/v7////////////////////////////////////+/v7////////////////////////////////////////////////////////////////////////////+/v7////////////r9uvo9Ojs9uzU69St2K1/w39gtWBPrU/u9+694L1vu28hlyEBiAEAhwD+/v7X7Nd4wHgalBoAhgAAiAD7/fvE48RKqkoCiAL9/v3D48M8pDzW7NZHqUd1vnUDiAO737sVkRUNjg1BpkFgtGBpuWkCiQJWsFa33bfa7drm8+bV69UblBtzvXPe796r16vY7Nj+//4FigWj1KP8/fzt9u1htWEsnCzG5Mbr9etYsVg/pT/R6dFitmIzoDPK5srx+PF3wHcTkBOx2rGh06EAhQDM58wPjg8UkRSQy5D0+vTl8uVOrE4dlR19wn3Q6dD4/Pim1aYIiwgJjAk+pD5qumqCxYLj8uNUr1QGiga837womij2+/aUzZQMjQwNjQ1ouGgBhwFquWrp9OnL5ssBhgGn1qcelR4elh6o1qj2+vZ+w373+/ff8N8EiAQwnjAxnjGVzZUVkhUJiwm03LQflh+IyIiJyIlZsVnT6tP8/vy53rn6/Pq97PRtAAAAYnRSTlMAAAMQLWqp1fMBEUOe6Pn8/gUukuz+CU3EW9kGUNsCMsvxrzbuePq1/OD4/erD/Y37SPYYxwdjHrwE6Qx3/HYgp/6mOtLRYO9fFIv4LLdMSwh1HKGgNcg05IrytjvaaeuF7djGYAwAAAABYktHRAH/Ai3eAAAAB3RJTUUH5wUZACErAkf6XAAAAzFJREFUOMtjYAADRkYmZhZWNnaOpCQOdjZWFmYmRkYGJMDIycXNw8vHL5CckpIswM/Hy8PNxYmkglFQSFhENDUtPSMzKyszIz0tVVREWEgQroJRTFwiKTsnNy+/AAzy83JzspMkxMUYYfKSUoVFxSWlBQVlYFBQUFpSXFQoJQlRwSgtI1teUVkFlYWqqaqsKJeVkQapkJNXqK6pLUWRB6oora2pVpCXAxrAxZNUV48uD1JRX5fEw8XIICiumNrQCLO9FAhg7MaGVEVxQQYupeqm5gKo41pa29paW6COLWhuqlbiYlBWSW4vhQh0dHZ19/R0d3V2QFSUtierKDOoqvX2gfkF+f0TCpOAoHBCfz5EpK9XTZVBXWMimFtQmjVpchIYTJ6UBXZIQf5EDXUGTYEMiPIpU6clQcG0qVMgYhkCmgxa02eAOaUzZyXBwayZYGcVzJiuxZA0ew5Ewdx5CAXz5kIUzJmdxKA9fT5EwYKFCAULF0AUzJ+uzaCzaDHEviVLC2HyhUuXQMQWL9Jh0NVbBuEsb0+FKUhtXw4RW6any6BvsGIlhLdq9RqI/JrVqyAiK1cY6DMYGq1dBwnJ0vUbNgJDYvLGDeuhAuvWGhkyGJts2rwFGrRbt23fsWP7tq3QoN+yeZOJMYOpmfbOXcuhEbi8dPfu0uXQ6Fy+a6e2mSkDp7lF+Z69pbBUUABLd2Wle/eUW5hzMjBaGlrt238AM8Ec3L/PytASmOYYrW20Uw4dRk9yh48ctbWzBqdaTnsHx2Otx1ET7fHWY45O9pyQZC/n7FJ+4mQBkoqCglOny12d5WAZQ9DN/cyGLcgKtp495+6ByFqcnl7e53ddgKsouLDrvLeXJydS5vTxTcq5iMhZl3JEfX1Qs7efbNLlK9DQKL1yOUnWH0WegSHATmVRO8QZBVfbF6kEBqDKMzAGBfPVtYIyUEFjaxFfSBCaAUAVoWFJ166Dgvr6taSwcAx5oArJiPIbBwoKDtwsj5DEIg8M8sio2bemTLk1OyrSGpsCoDOibW9fvHjbNjoIqzxQRUzsnbt378TG4JAHxnxc/L178XGWuBQAnZGQmJiA6gAAFLyvxAL3bxQAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDUtMjVUMDA6Mjk6MzcrMDA6MDBKWqC/AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTA1LTI0VDIyOjQ5OjU2KzAwOjAwnPAwBAAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAASUVORK5CYII=",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAApCAMAAABjq9sOAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAClFBMVEUAAAD////////////////////////////////////////////////////////7//3y//n////////////////////////////////////////////////////////////////////////////////////+//7////6//3////y//r////////////////4//z////////////////////////////////////////////////////////////////////////+//7////////////////////////////////////+//7////////////////////////////////////////////////////////////////////////////+//7////////////r//fo//Xs//fU/+6t/95//8tg/79P/7nu//i9/+Rv/8Uh/6YB/5kA/5j+//7X/+94/8ka/6MA/5cA/5n7//3E/+dK/7YC/5n9//7D/+c8/7HW/+9H/7V1/8cD/5m7/+QV/6EN/55B/7Np/8NW/7u3/+La//Dm//XV/+4b/6Rz/8fe//Gr/93Y/+/+//9//8wF/5qj/9r8//7t//dh/8As/6vG/+hY/7w//7LR/+xi/8Az/63K/+rx//l3/8kT/6Cx/9+h/9nM/+oP/58U/6CQ/9L0//rl//RO/7gd/6R9/8vQ/+z4//ym/9sI/5sJ/5w+/7Fq/8OC/83j//NU/7oG/5u8/+Qo/6j2//uU/9QM/50N/53o//Zo/8MB/5jp//bL/+pB/7IB/5en/9we/6Qe/6Wo/9wI/5x+/8v3//vf//IE/5kw/6wx/6yV/9TW/+60/+Af/6WI/8+J/89Z/7zT/+25/+L6//2DMMmrAAAAY3RSTlMAAAMQLWqp1fMBEUOe6Pn8/gUukuz+CU3EW9kGUNsCMsvxrzbuePq1/OD++P3qw/2N+0j2GMcHYx68BOkMd/x2IKf+pjrS0WDvXxSL+Cy3TEsIdRyhoDXINOSK8rY72mnrhe2jCycJAAAAAWJLR0QB/wIt3gAAAAd0SU1FB+cFGQAhKwJH+lwAAAMmSURBVDjLY2AAA0ZGJmYWVjZ2juRkDnY2VhZmJkZGBiTAyMnFzcPLxy+QkpqaIsDPx8vDzcWJpIJRUEhYRDQtPSMzKzs7KzMjPU1URFhIEK6CUUxcIjknNy+/oBAMCvLzcnOSJcTFGGHyklJFxSWlZYWF5WBQWFhWWlJcJCUJUcEoLSNbUVlVDZWFqqmuqqyQlZEGqZCTV6iprStDkQeqKKurrVGQlwMawMWTXN+ALg9S0VCfzMPFyCAorpjW2ASzvQwIYOymxjRFcUEGLqWa5pZCqONa27Ky2lqhji1saa5R4mJQVklpL4M6rKOzq7u7q7MD6uCy9hQVZQZVtZ5eML+woK+/KBkIivr7CiAivT1qqgzqGhPA3MKy7ImTksFg0sRssEMKCyZoqDNoak2GKJ8ydVoyFEybOgUiNllLk0F7+gwwp2zmrGQ4mDUT7KzCGdO1GZJTZkMUzJmLUDB3DkTB7JRkBp3p8yAK5i9AKFgwH6Jg3nQdBt2FiyD2LV5SBJMvWrIYIrZooS6Dnv5SCKesPQ2mIK0dEpyFS/X1GAwMly2H8FasXAWRX7VyBURk+TJDAwYj49VroAG3dt16oC1F69ethQbtmtXGRgwmphs2boKq2Lxl67ZtW7dshspv2rjB1ITBzFxn+44yeGTu3AmPzrId23XMzRg4LSwrdu2GJQdQkoQxd++qsLTgZGC0MrLes3cfZoLZv3ePtZEVMM0x2tjqHDh4CD3JHdp62M7eBpxqOR0cnY4cPYaaaI8dPeLk7MAJSfZyLq4Vx08UIqkoLDx5qsLNRQ6WMQTdPfasO42sYPOZsx6eiKzF6eXtc27HebiKwvM7zvl4e3EiZU5fv+TcC4icdTFX1M8XNXv7yyZfaoEpaLmULBuAIs/AEGivsrAd4ozCze0LVYICUeUZGIND+C63gTJQYVNbMV9oMJoBQBVh4clXroKC+uqV5PAIDHmgCsnIimv7Cgv3Xa+IlMQiDwzyqOiUG1Om3EiJjrLBpgDojBi7mxcu3LSLCcYqD1QRGzft1q1pcbE45IExH59w+3ZCvBUuBUBnJCYlJaI6AABB269xUXFElwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMy0wNS0yNVQwMDoyOTozNyswMDowMEpaoL8AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjMtMDUtMjRUMjI6NTA6MDYrMDA6MDDpi8pqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg==",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAApCAMAAABjq9sOAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACbVBMVEUAAAD////////////////////////////////////////////////////////7///y///////////////////////////////////////////////////////////////////////////////////////+///////6///////////////////////4///////////////////////////////////////////////////////////////////////////+///////////////////////////////////////+///////////////////////////////////////////////////////////////////////////////+///////////////r///o///s///U//+t//9///9g//9P///u//+9//9v//8h//8B//8A///+///X//94//8a///7///E//9K//8C///9///D//88///W//9H//91//8D//+7//8V//8N//9B//9p//9W//+3///a///m///V//8b//9z///e//+r///Y//8F//+j///8///t//9h//8s///G//9Y//8////R//9i//8z///K///x//93//8T//+x//+h///M//8P//8U//+Q///0///l//9O//8d//99///Q///4//+m//8I//8J//8+//9q//+C///j//9U//8G//+8//8o///2//+U//8M//9o///p///L//+n//8e//+o//9+///3///f//8E//8w//8x//+V//+0//8f//+I//+J//9Z///T//+5///6//8Ngdu6AAAAYnRSTlMAAAMQLWqp1fMBEUOe6Pn8/gUukuz+CU3EW9kGUNsCMsvxrzbuePq1/OD4/erD/Y37SPYYxwdjHrwE6Qx3/HYgp/6mOtLRYO9fFIv4LLdMSwh1HKGgNcg05IrytjvaaeuF7djGYAwAAAABYktHRAH/Ai3eAAAAB3RJTUUH5wUZACErAkf6XAAAAu1JREFUOMtjYAADRkYmZhZWNnaOpCQOdjZWFmYmRkYGJMDIycXNw8vHL5CckpIswM/Hy8PNxYmkglFQSFhENDUtPSMzKyszIz0tVVREWEgQroJRTFwiKTsnNy+/AAzy83JzspMkxMUYYfKSUoVFxSUFSKCkuKhQShKiglFaRra0rLyiAAVUlJeVyspIg1TIyStUVlUXYIDqqkoFeTmgAVw8STW1BVhAbU0SDxcjg6C4YmpdPTYF9XWpiuKCDFxKlQ2NMLGm5szM5iYYr7GhUomLQVkluQXmsNa29o6O9rZWmINbklWUGVTVOrug3u/uKUwCgsKebmiAdHWqqTKoa/RCuVl9YHmgir4sqJZeDXUGTYEMCK9/wsQkKJg4oR8iliGgyaA1aTKEM2VqEhxMnQIRmzxJiyEpeRqEM30GQsGM6RCxaclJDNqTZkI4s2YjFMyeBRGbOUmbQWfOXAhn3vxCmHzh/HkQsblzdBh09RbAfJ0KU5AKC5kFeroM+gYLF0F4i5cshcgvXbIYIrJooYE+g6HRsuVQ9StWrgLaUrhq5QqowPJlRoYMxiar16yFCqxbv2Hjxg3r10G5a9esNjFmMDXT3rQZEYVbtiDYmzdpm5kycJpblG7dhi26t20ttTDnZGC0NLTavmMnpnzTju1WhpbANMdobaOdsisfXT5/w25bO2twquW0d3Dc04ymIr95j6OTPSck2cs5u5Tu3YeqYN/+UldnOVjGEHRz375yLbL8ugMH3T0QWYvT08v70ObDCPnDmw95e3lyImVOH9+knCMIBUdzRH19ULO3n2zSMXjibjyWJOuPIs/AEGCnMqcF6ox1LXNUAgNQ5RkYg4L5aprBGai+uYgvJAjNAKCK0LCk4ydACk4cTwoLx5AHqpCMKD0JDPKdp0ojJLHIA4M8Mir5dH//6eSoSGtsCoDOiLY9c+TIGdvoIKzyQBUxsRPPnp0YG4NDHhjzcfHnzsXHWeJSAHRGQmJiAqoDAOgCnVLAYqeOAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIzLTA1LTI1VDAwOjI5OjM3KzAwOjAwSlqgvwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMy0wNS0yNFQyMjo1MDoyMSswMDowMG4J85kAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAAElFTkSuQmCC",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAApCAMAAABjq9sOAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACu1BMVEUAAAD////////////////////////////////////////////////////////8/f3y9/r////////////////////////////////////////////////////////////////////////////////////+/v7////6/P3////z9/r////////////////5+/z//////v/////////////////////////////////////////////////////////////////+/v7////////////////////////////////////+/v7////////////////////////////////////////////////////////////////////////////+/v7////////////s8/jp8fft9PjW5vCwz+KEtdJno8hXmcLu9fnA2Oh1q80qfrIMa6cJaqYKaqb+/v7Z6PF+sdAkea8HaKULa6f8/f3G3epRlcAJaab9/f7G3OpEjrsHaaXY5/FOlL97rs8Iaab9/v6+2Ocfdq0Yc6tJkb1no8dvqMsIaaUNbKhdncS61ebb6fLn8PbX5vAle7B5rs7f7POuzuGFtdMPbainyt/8/f5oo8g1hbbI3utfnsVHkLzT5O/u9PhppMk8ibjM4Ozx9/p9sNAcda200eSlyN4La6YGaKVwqMvO4e0Zc6wddq2Vv9j0+Pvm8PZWmMIme7GDs9LS5O/+/v/5+/ypy98Rb6kTcKpGj7xxqcyIt9Pk7/VcnMQQbqj7/f0wgbQKaqf3+vyYwdkVcaoWcquZwdpvp8vq8vfN4e1JkL2rzOAnfLEofLGszOH2+vyCs9ITb6mDtNLg7PNbnMQ5h7c5h7jA2egfd66awtry9/pvqMoSb6kMbKe30+UpfbGNutaOutZgn8XV5vC81ub7/P0PF+8/AAAAY3RSTlMAAAMQLWqp1fMBEUOe6Pn8/gUukuz+CU3EW9kGUNsCMsvxrzbuePq1/OD++P3qw/2N+0j2GMcHYx68BOkMd/x2IKf+pjrS0WDvXxSL+Cy3TEsIdRyhoDXINOSK8rY72mnrhe2jCycJAAAAAWJLR0QB/wIt3gAAAAd0SU1FB+cFGQAhKwJH+lwAAANLSURBVDjLY2AAA0ZGJmYWVjZ2juRkDnY2VhZmJkZGBiTAyMnFzcPLxy+QkpqaIsDPx8vDzcWJpIJRUEhYRDQtPSMzKzs7KzMjPU1URFhIEK6CUUxcIjknNy+/oLAICAoL8vNyc5IlxMUYYfKSUsUlpWXlhUUVYFBUWF5WWlIsJQlRwSgtI1tZVV1QU4EEagqqqyplZaRBKuTkFWrr6huKKlBAUUN9Xa2CvBzQAC6e5MYmdHmQiqbGZB4uRgZBccW05gKY7S3l5S0wdkFzmqK4IAOXUmtbeyFEqKajs6urs6MGoqSwva1ViYtBWSWluwci39vXP2HixAn9fb0QFT3dKSrKDKpqkyYXQYycMrU4GQiKp06BWFk0eZKaKoO6xjQwt6ghuwQsD1RRkg12dFHBNA11Bk2t6RDlM2bOSoaCWTNnQMSma2kyaKfNBnNa5sxNhoO5c1rACmanaTMkp8wDKyifvwChYMH8crCCeSnJDDoLF4EVNCxeglCwZHEDWMGihToMukuXgRUULl9RDJMvXrEcHDJFy5bqMujprwRzVq1ekwZTkLZm9SqwppX6egwGhmvXQYxYv2EjRH7jhvUQA9atNTRgMDLetBns5IqWLVu3bU9O3r5t6xaowOZNxkYMJqY7du6CBG3L7j179+3bu2c3RL5o184dpiYMZuY6+w+shkRg4erygwfLV0OirmL1gf065mYMnBaWh9oOQ/RUHAGlySMQdsvhtkOWFpwMjFZG1kePHcdMMCdOHrU2sgKmOUYbW53UU4XoSa5wzWk7extwquV0cHQ6c7YFRUVRy9kzTs4OnJBkL+fiWnnuPLKKopYLFyvdXORgGUPQ3ePS5SuFCAWFu68e9fBEZC1OL2+fa9cr4EYUVRy45uPtxYmUOX39knNvIHLWzVuifr6o2dtfNvnkbWhotNy+kywbgCLPwBBor3L33n2wMwrvr7mrEhSIKs/AGBzC13j2AdCSogdnS/hCg9EMAKoIC09++AgU1I8eJodHYMgDVUhGHnp8oqjoxJNDkZJY5IFBHhWd8nTGjKcp0VE22BQAnRFj9+zGjWd2McFY5YEqYuNmPX8+Ky4Whzww5uMTXrxIiLfCpQDojMSkpERUBwAAPAa7YJpbYIgAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDUtMjVUMDA6Mjk6MzcrMDA6MDBKWqC/AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTA1LTI0VDIyOjUwOjM0KzAwOjAw8JvcoAAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAASUVORK5CYII=",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAApCAMAAABjq9sOAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACzVBMVEUAAAD////////////////////////////////////////////////////////7/Pzy9Pb////////////////////////////////////////////////////////////////////////////////////+/v7////6+/v////////////////////4+fr////////////////////////////////////////////////////////////////////////+/v7////////////////////////////////////+/v7////////////////////////////////////////////////////////////////////////////+/v7////////////r7/Ho7O/s7/LU2+GtusZ/lKdge5JPbIfu8fO9yNFvh5whRWYBK1AAKE8AKU/+/v7X3uR4j6IaP2EAJk0AKlD7/PzEztZKZ4ICK1EAKE79/f3DzdY8XHkAJ03W3eNHZYB1jKADK1EAJ067xtAVO14NNVlBYHxgepHr7vFpgpgCLFFWcou3ws3a4OXm6u3V2+IbQWMBK1Fzip7e4+iruMVPbIbY3uQFLlOjssD8/f3t8PJhe5IsT27Gz9hYc4w/X3vR2d9ifJMzVXPK09vx8/V3jqITOVyxvcmhsL4AKVAAJUzM1NwPNloUOl2QorP09vfl6e1Oa4UdQmN9k6bQ2N/4+fqmtMIIL1QJMVY+XXpqg5mCl6nj6OxUcYoAJkwGL1S8x9EoSmr2+PmUpbUMM1cNNFiUprVogZgBKE5qgpjp7PDL1NsBJ06ntcIeQmQeQ2WotsP29/l9kqUIMVV+k6b3+Pnf5OlUcIoEKlAwUnExUnG9yNKVprYVPF4IMFUJMFVBYH3X3uO0wMwfRGWInK0MNFiJnK5ZdI3T2uEwUnC5xM/6+/yAxxLtAAAAYnRSTlMAAAMQLWqp1fMBEUOe6Pn8/gUukuz+CU3EW9kGUNsCMsvxrzbuePq1/OD4/erD/Y37SPYYxwdjHrwE6Qx3/HYgp/6mOtLRYO9fFIv4LLdMSwh1HKGgNcg05IrytjvaaeuF7djGYAwAAAABYktHRAH/Ai3eAAAAB3RJTUUH5wUZACErAkf6XAAAA0hJREFUOMtjYAADRkYmZhZWNnaOpCQOdjZWFmYmRkYGJMDIycXNw8vHL5CckpIswM/Hy8PNxYmkglFQSFhENDUtPSMzKyszIz0tVVREWEgQroJRTFwiKTsnNy+/oBAICvLzcnOykyTExRhh8pJSRcUlpWWFheVgUFhYVlpSXCQlCVHBKC0jW1FZVV1TjgRqqqsqK2RlpEEq5OQVauvqGwrLUUBhQ31drYK8HNAALp6kxiZ0eZCKpsYkHi5GBkFxxdTmFpjtrWVlrTB2S3OqorggA5dSbVs7xP7Cmo7Orq7OjhqIkpr2tlolLgZlle6eBoh8b1//hIkTJ/T39UJUNPR0qygzqKpNmgzmF06ZOq0oCQiKpk2dAhGZPElNlUFdY3p+IdhRM2aC5YEqZs4AO7owf7qGOoOmQAZE+azZc5KgYM7sWRCxDAFNBq2588Cc1vkLkuBgwfxWsIJ5c7UYkroXghWULVqMULB4URlYwcLuJAbtuUvAChqWLkMoWLYU7LHCJXO1GXSWrwArKFi5qggmX7RqZQFYwYrlOgy6eqvBCtas7UmFKUjtWbsGrGC1ni6DvsG69RAnb9i4CSK/aeMGiMj6dQb6DIZGm7dAQrp167btQFuKtm/b2goJ6y2bjQwZjE127NwFCdrW3Xv27tu3d89uiHzhrp07TIwZTM209x84CI3AgwcPHTp4EBqdBw/s1zYzZeA0t6g4fKQGlthAAJqojhyusDDnZGC0NLQ6euw4ZoI5cfKolaElMM0xWttop5w6jZ7kTp85a2tnDU61nPYOjuc6z6OoKDzfec7RyZ4TkuzlnF0qLlysQVJRWHPpcoWrsxwsYwi6uV+5eg0p3dfsvn7D3QORtTg9vbxv3roNN6Lw9q2b3l6enEiZ08c3KecOzJLCmrv3RH19ULO3n2zSfWjiLq95cD9J1h9FnoEhwE5lec9DcCQXPOpZrhIYgCrPwBgUzNfYCcpAhS2Pn/CFBKEZAFQRGpb09BkopJ89TQoLx5AHqpCMqHj+orDwxcuKCEks8sAgj4zqfjVr1qvuqEhrbAqAzoi2ff3mzWvb6CCs8kAVMbFz3r6dExuDQx4Y83Hx797Fx1niUgB0RkJiYgKqAwC8prs7Sn3FCAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMy0wNS0yNVQwMDoyOTozNyswMDowMEpaoL8AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjMtMDUtMjRUMjI6NTA6NDMrMDA6MDA/+es3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg==",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAApCAMAAABjq9sOAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACfFBMVEUAAAD////////////////////////////////////////////////////////8/P709P3////////////////////////////////////////////////////////////////////////////////////+/v7////7+/7////19f3////////////////6+v7///////7////////////////////////////////////////////////////////////////+/v7////////////////////////////////////+/v7////////////////////////////////////////////////////////////////////////////+/v7////////////v7/zs7Pvw8Pzc3Pm9vfOZme2AgOpzc+fx8fzKyvaMjOtNTeE0NN0xMdwyMtz+/v7f3/mTk+1HR+AvL9wzM938/P7Q0Pdubub9/f7Pz/djY+UwMNxsbOaRkezJyfZDQ+A9Pd5mZuWAgOmHh+t3d+jFxfXh4frr6/vd3flJSeCPj+zk5Pr+/v+7u/NycueYmO03N921tfKBgepWVuLR0fd5eeja2vmCgupcXOPV1fjz8/2SkuxBQd/AwPS0tPIyMt2Hh+rW1vg/P95CQt+mpvD29v3q6vtxceeXl+3a2vj6+v63t/M4ON06Ot5kZOWIiOubm+7p6ftSUuL4+P2pqfE8PN7t7fxnZ+W4uPNKSuFLS+G5ufM5Od2YmO74+P7l5fp2duhZWeNaWuOqqvBERN+rq/D09P05Od7e3vnDw/VMTOGgoO96eug2Nt3Hx/X7+/4Nm4E+AAAAY3RSTlMAAAMQLWqp1fMBEUOe6Pn8/gUukuz+CU3EW9kGUNsCMsvxrzbuePq1/OD++P3qw/2N+0j2GMcHYx68BOkMd/x2IKf+pjrS0WDvXxSL+Cy3TEsIdRyhoDXINOSK8rY72mnrhe2jCycJAAAAAWJLR0QB/wIt3gAAAAd0SU1FB+cFGQAhKwJH+lwAAAM8SURBVDjLdZP3X9NQFMVfFIUWLJRpVcoeYlVEQEUExIUyFFFRcfJqqiyb12paDQQKpQXZorJXARcbFRC3oohb/yHTJIUW8fyU5Hxz7/3cdx4ArDBs2XK7FSvtHSB0sF+5wm75MgwDVsIEQkenVSJnF/mlS3IXZ9EqJ0ehwIrAxK5u7h644vKVnNzcnCuXFbiHu5ureJ7APL1Ww7z8gqtKAjEilFcL8vPgai9PzOJL1qjU166TCGlYIURev6ZWrZFwBLZ2nbf2xk0lobESobx5Q+u9bq2ZkPr4UoVFNNLYCNFFhZSvj5QpIHSC6uLFvpkoVkMnIQbEXn54idLSnWZkeVaW4H5eYiD0p3SlXH9ElOnLy/VlBIcQpTrKXwgCAuUGmv/FWFF561ZlhZEvSBvkgQEgKLiqGnF+TW0dZFRXW8MRqLoqOAiEhNazr4huUKsgK5W6gR0EKetDQ8D6sNsc3niHgryoO43ct9th68EG/C77Qt9rgvNquseOhe7iGwCUN7MAqW9ZAFr0JAs0yyGQ4a1chbb2BaC9javQisvAxo5OFiC6ulUWX9XdxW4GdXZsBJs297CAiezFLQDeS5pYoGfzJhC+pa+fG/n+g4ec//DBfe5Lf9+WcBCx9dFjbtN09cAg00U1OFDNrZZ4/GhrBIiMGhoe4Vc7Ojb+5Mn42Ci/+pHhoahIEL1N9tRI8gdIko2NJMkfJ2l8KtsWDQTbd2h1z/g4mcyZNPGheqbT7tguAFhMxM6Jyal/AzM1ObEzIobJHBa7S/bcQCyOHGF4Hhcfy6ZWkLA7sV1vGzpET7cn7kkQcLGX7t2nffGSMFn//+q1dv9eqeViiA8kTQy8sco9Mfr2XdLBhaslOJSc8v6DZr4J0nx4n5J8SGB1OVPTYP6MZVBEfMz3SEu1vd6HveGnWb4JMfsZeh+x8QFIjw+cM3xhCeLL+Fzg0XRbH2AZx0Rfp83xRcppteh4xqICDHEiE377bl71928w8+Q/PkNITml/TCFU9kN7SrKEz6z8dJb8569fP+VZp2OXApgxzsQpZmYUcWcylvQZ4uw56vdv6tzZ//jMyZ+/8OfPhfMx/wOYMS5mZ1+0HeAvs9msMpv5tz0AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDUtMjVUMDA6Mjk6MzcrMDA6MDBKWqC/AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTA1LTI0VDIyOjUwOjU2KzAwOjAwoWvEDgAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAASUVORK5CYII=",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAApCAMAAABjq9sOAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACTFBMVEUAAAD////////////////////////////////////////////////////////9/v/5+v/////////////////////////////////////////////////////////////////////////////////////+/v/////8/f/////////////////////8/P///////v/////////////////////////////////////////////////////////////////+/v/////////////////////////////////////+/v/////////////////////////////////////////////////////////////////////////////+/v/////////////2+P/09//r8P/Y5P/D1P+1yv+txP/3+f/g6f+7z/+Xtf+Iqv+Hqf/+/v/s8f/A0v+Usv+GqP/9/f/j6/+qwv+kvv+pwf++0f+Gqf/f6P+RsP+Orv+mv/+0yv+5zf+Jq/+wxv/d5//t8v/z9v+Us/+90P/v9P/X4/+Kq//U4P/9/v/2+f+cuP/k7P/1+P+xx/+lv//p7/+2yv+gu//m7f/4+v+Qr//a5P/T3/+FqP/n7f/L2v/6+//y9v+sxP+Vs//C1P/8/P/V4f+LrP+Mrf+6zf/F1f/y9f+vxv+KrP+atv/7/P/N2/+Nrf+Nrv+4zP/W4v+VtP+WtP/6/P/C0/+MrP/D0//w9P+euv+SsP+Ssf/N3P/c5v/I1//q8P/e5//8/f/tCMxjAAAAYnRSTlMAAAMQLWqp1fMBEUOe6Pn8/gUukuz+CU3EW9kGUNsCMsvxrzbuePq1/OD4/erD/Y37SPYYxwdjHrwE6Qx3/HYgp/6mOtLRYO9fFIv4LLdMSwh1HKGgNcg05IrytjvaaeuF7djGYAwAAAABYktHRAH/Ai3eAAAAB3RJTUUH5wUZACErAkf6XAAAAyFJREFUOMt1k+db01AUxm+U1QKllT0KAlXUInsjoOICRREVFZGRMMrKTSFlBVoKKGgZUqZShiJDUUARFyrrHzPkJrRlnE855/09J+9z7jkAcIFhx47b2NrZO+C4g72drc3xYxgGLAITiR2dnCUuUqKkhJC6SJydHMUiCwKTnXB1cydKy8pVFRWq8rJSwt3N9YRsj8A8PL3wyqrqGhJyQdZUV1XiXp4emKB7+1Dq2jqalbiAkK6rVVM+3ojAfP3kmvoGkld5hmyo18j9fHcJ/4CTVH0jbaWzBN1YT50M8GcbiJ1wddN+fZdoUuNOYgzIPAOJZqE/ZGiaEb7JZiLQUwbEQVRLK+TNaXVtbTotbxa2tlBBYhCsIPQ0KrR3dD57/vxZZ0c7Img9oQgGp06XdkHUsvsFhbNBvehGv4RdpadPgZAzL7kU0hVqnA91BWcaki/PhICz0nKEG3p6BaC3x4Bq5dKz4FyfikuY/lf4XrzqZzhA1XcO4ANGDqAHh8zA0CDnGxoHcKDsG0bAyKgZGB1BwHCfEoSO1aL/vX5DCTr15jWq1Y6FgvNh4ygx6QkBIPQmVBsPOw/CIya0KGudnEL61CQaLdRORISDyKjpt5xlknk3w/kcmnnHF95OR0WC6Jj3s3NotMx848KHDwuN80iHc7PvY6JBbJzy46KJf0AT/ekTbeKf07T4URkXC0TxCZqWz4ywBVDYO5L53KJJiBcBLDEyaWl55eDCfFleSopMZHcOS76gLPkK968c1JekpCZzWytKu3hpVMdYLy2jG710OU2E1t4//Ypm9ZtlDwjXVjVX0/2Fw5Bdu/79x5wl8PPX0vUb5tMSZWTe/L1ovgxILv6+mZkhsjjOW1l41br5star3LNuWZ/3bTm+/IefBvP3Hy6/Y6UDkJ2qGNMjG3BOP6a4m22tAyznnkSt27UBSZ1acj9nXwOWeJCLb6ztjnptA899eEBnCe9Hms0VCFc2NY+8D9HZkT/OGzAaDMaBvMfJhwGsjScpW+vrWylPcg7VWSL/KbW9TT3NP0JnX76gcGensCDxKIC1UVRcXGRt4D+SPpTGEJHXggAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMy0wNS0yNVQwMDoyOTozNyswMDowMEpaoL8AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjMtMDUtMjRUMjI6NTE6MDYrMDA6MDAGSaFUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg==",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAApCAMAAABjq9sOAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAClFBMVEUAAAD////////////////////////////////////////////////////////9+//58v/////////////////////////////////////////////////////////////////////////////////////+/v/////9+v/////68v/////////////////8+P/////////////////////////////////////////////////////////////////////////+/v/////////////////////////////////////+/v/////////////////////////////////////////////////////////////////////////////+/v/////////////36//16P/37P/u1P/erf/Lf/+/YP+5T//47v/kvf/Fb/+mIf+ZAf+YAP/+/v/v1//JeP+jGv+XAP+ZAP/9+//nxP+2Sv+ZAv/+/f/nw/+xPP/v1v+1R//Hdf+ZA//ku/+hFf+eDf+zQf/Daf+7Vv/it//w2v/15v/u1f+kG//Hc//x3v/dq//v2P///v/Mf/+aBf/ao//+/P/37f/AYf+rLP/oxv+8WP+yP//s0f/AYv+tM//qyv/58f/Jd/+gE//fsf/Zof/qzP+fD/+gFP/SkP/69P/05f+4Tv+kHf/Lff/s0P/8+P/bpv+bCP+cCf+xPv/Dav/Ngv/z4/+6VP+bBv/kvP+oKP/79v/UlP+dDP+dDf/26P/DaP+YAf/26f/qy/+yQf+XAf/cp/+kHv+lHv/cqP+cCP/Lfv/79//y3/+ZBP+sMP+sMf/Ulf/u1v/gtP+lH//PiP/Pif+8Wf/t0//iuf/9+v/1rAt3AAAAY3RSTlMAAAMQLWqp1fMBEUOe6Pn8/gUukuz+CU3EW9kGUNsCMsvxrzbuePq1/OD++P3qw/2N+0j2GMcHYx68BOkMd/x2IKf+pjrS0WDvXxSL+Cy3TEsIdRyhoDXINOSK8rY72mnrhe2jCycJAAAAAWJLR0QB/wIt3gAAAAd0SU1FB+cFGQAhKwJH+lwAAAMmSURBVDjLY2AAA0ZGJmYWVjZ2juRkDnY2VhZmJkZGBiTAyMnFzcPLxy+QkpqaIsDPx8vDzcWJpIJRUEhYRDQtPSMzKzs7KzMjPU1URFhIEK6CUUxcIjknNy+/oBAMCvLzcnOSJcTFGGHyklJFxSWlZYWF5WBQWFhWWlJcJCUJUcEoLSNbUVlVDZWFqqmuqqyQlZEGqZCTV6iprStDkQeqKKurrVGQlwMawMWTXN+ALg9S0VCfzMPFyCAorpjW2ASzvQwIYOymxjRFcUEGLqWa5pZCqONa27Ky2lqhji1saa5R4mJQVklpL4M6rKOzq7u7q7MD6uCy9hQVZQZVtZ5eML+woK+/KBkIivr7CiAivT1qqgzqGhPA3MKy7ImTksFg0sRssEMKCyZoqDNoak2GKJ8ydVoyFEybOgUiNllLk0F7+gwwp2zmrGQ4mDUT7KzCGdO1GZJTZkMUzJmLUDB3DkTB7JRkBp3p8yAK5i9AKFgwH6Jg3nQdBt2FiyD2LV5SBJMvWrIYIrZooS6Dnv5SCKesPQ2mIK0dEpyFS/X1GAwMly2H8FasXAWRX7VyBURk+TJDAwYj49VroAG3dt16oC1F69ethQbtmtXGRgwmphs2boKq2Lxl67ZtW7dshspv2rjB1ITBzFxn+44yeGTu3AmPzrId23XMzRg4LSwrdu2GJQdQkoQxd++qsLTgZGC0MrLes3cfZoLZv3ePtZEVMM0x2tjqHDh4CD3JHdp62M7eBpxqOR0cnY4cPYaaaI8dPeLk7MAJSfZyLq4Vx08UIqkoLDx5qsLNRQ6WMQTdPfasO42sYPOZsx6eiKzF6eXtc27HebiKwvM7zvl4e3EiZU5fv+TcC4icdTFX1M8XNXv7yyZfaoEpaLmULBuAIs/AEGivsrAd4ozCze0LVYICUeUZGIND+C63gTJQYVNbMV9oMJoBQBVh4clXroKC+uqV5PAIDHmgCsnIimv7Cgv3Xa+IlMQiDwzyqOiUG1Om3EiJjrLBpgDojBi7mxcu3LSLCcYqD1QRGzft1q1pcbE45IExH59w+3ZCvBUuBUBnJCYlJaI6AABB269xUXFElwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMy0wNS0yNVQwMDoyOTozNyswMDowMEpaoL8AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjMtMDUtMjRUMjI6NTE6MjArMDA6MDAnvJMTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg==",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAApCAMAAABjq9sOAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACbVBMVEUAAAD/////////////////////////////////////////////////////////+///8v///////////////////////////////////////////////////////////////////////////////////////v//////+v//////////////////////+P///////////////////////////////////////////////////////////////////////////v///////////////////////////////////////v///////////////////////////////////////////////////////////////////////////////v//////////////6///6P//7P//1P//rf//f///YP//T///7v//vf//b///If//Af//AP///v//1///eP//Gv//+///xP//Sv//Av///f//w///PP//1v//R///df//A///u///Ff//Df//Qf//af//Vv//t///2v//5v//1f//G///c///3v//q///2P//Bf//o////P//7f//Yf//LP//xv//WP//P///0f//Yv//M///yv//8f//d///E///sf//of//zP//D///FP//kP//9P//5f//Tv//Hf//ff//0P//+P//pv//CP//Cf//Pv//av//gv//4///VP//Bv//vP//KP//9v//lP//DP//aP//6f//y///p///Hv//qP//fv//9///3///BP//MP//Mf//lf//tP//H///iP//if//Wf//0///uf//+v8BRUUXAAAAYnRSTlMAAAMQLWqp1fMBEUOe6Pn8/gUukuz+CU3EW9kGUNsCMsvxrzbuePq1/OD4/erD/Y37SPYYxwdjHrwE6Qx3/HYgp/6mOtLRYO9fFIv4LLdMSwh1HKGgNcg05IrytjvaaeuF7djGYAwAAAABYktHRAH/Ai3eAAAAB3RJTUUH5wUZACErAkf6XAAAAu1JREFUOMtjYAADRkYmZhZWNnaOpCQOdjZWFmYmRkYGJMDIycXNw8vHL5CckpIswM/Hy8PNxYmkglFQSFhENDUtPSMzKyszIz0tVVREWEgQroJRTFwiKTsnNy+/AAzy83JzspMkxMUYYfKSUoVFxSUFSKCkuKhQShKiglFaRra0rLyiAAVUlJeVyspIg1TIyStUVlUXYIDqqkoFeTmgAVw8STW1BVhAbU0SDxcjg6C4YmpdPTYF9XWpiuKCDFxKlQ2NMLGm5szM5iYYr7GhUomLQVkluQXmsNa29o6O9rZWmINbklWUGVTVOrug3u/uKUwCgsKebmiAdHWqqTKoa/RCuVl9YHmgir4sqJZeDXUGTYEMCK9/wsQkKJg4oR8iliGgyaA1aTKEM2VqEhxMnQIRmzxJiyEpeRqEM30GQsGM6RCxaclJDNqTZkI4s2YjFMyeBRGbOUmbQWfOXAhn3vxCmHzh/HkQsblzdBh09RbAfJ0KU5AKC5kFeroM+gYLF0F4i5cshcgvXbIYIrJooYE+g6HRsuVQ9StWrgLaUrhq5QqowPJlRoYMxiar16yFCqxbv2Hjxg3r10G5a9esNjFmMDXT3rQZEYVbtiDYmzdpm5kycJpblG7dhi26t20ttTDnZGC0NLTavmMnpnzTju1WhpbANMdobaOdsisfXT5/w25bO2twquW0d3Dc04ymIr95j6OTPSck2cs5u5Tu3YeqYN/+UldnOVjGEHRz375yLbL8ugMH3T0QWYvT08v70ObDCPnDmw95e3lyImVOH9+knCMIBUdzRH19ULO3n2zSMXjibjyWJOuPIs/AEGCnMqcF6ox1LXNUAgNQ5RkYg4L5aprBGai+uYgvJAjNAKCK0LCk4ydACk4cTwoLx5AHqpCMKD0JDPKdp0ojJLHIA4M8Mir5dH//6eSoSGtsCoDOiLY9c+TIGdvoIKzyQBUxsRPPnp0YG4NDHhjzcfHnzsXHWeJSAHRGQmJiAqoDAOgCnVLAYqeOAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIzLTA1LTI1VDAwOjI5OjM3KzAwOjAwSlqgvwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMy0wNS0yNFQyMjo1MTo0MiswMDowMHZMi70AAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAAElFTkSuQmCC",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAApCAQAAAD+fOO3AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfnBRkAISsCR/pcAAADj0lEQVRIx5WWO2xURxSGvzN7H7a0AdFRkFSQBovKqcCyBF0kmlDS0SHRpkJKEYmGEBeENImFRJMoLlLk4caJrCguEDSguMEijYMQAu+uwfZ672v+FHe93nu9fnCmO3P+f87jn7nXGDIBNPiAD5limgk+oglsssoyf/E3/7FBAcZIEzKd0CXd1yslPve+ULm897kSvdJ9XdIJmfaBhzqnu1qTL5QrUVeb2tCGNtVVolyF5LWmuzqnUCPg47qsJalQqi2tq63W0GprXVtKVUjSki5rfIfC+rWP8xlf6GNPSoLf3RruDo6YCIet8CU/s21llCDiU77S6YJtMvZtEgJCxmlgz/mceVLDAY4Jbh4OL3cytinQaW4ygQMnOM4NJv2h8GEKD5Pc4LhwhFzgiifZA9fQqlMkeLjCBUJHk2s6VpBW4EIYITExIVYhMSClQMe4RjPgDNMixVfgJdhhgCjz0yDC8KQ0sGnOBFxUU2S1XsfENAaeBg5Hb4gCMsZQ0y46pnBFZQuiCrykiIkqnRAFOKYcZ0uC4fQj3J7+OyKsEleA46zjpMzXTnMjhmm4WlYeGScd8d7Q0VoY6Y8dvu6rzv0Qv3e0rFaxx48IFb52lsOg5XiGH67N8GQjCbKKVqABnmeOR+YdrgLJSGsUIq1pxeEwzyPHApkjqOWQ0KMYeAp6JLXzAxxkLDie8NRqMzYKenTpss02Xbr0KGpSjzB4yhNHh1nzAWFtZCKj119ZTakQEmCeWTqOlAUWjZhG7draYHRWu+YNYgwWWSB1iJfcsdcBcaWMHZK6fIQjJsBec4eXyBnkLDFjPiKCfUS0C4eICCv4miVyw4HBFj8xZ4oJD6QoH9UIE3PMsWXQF6FY5RtbbhCPuIdV9cU0sH+4x2p5kitrxfOYGVsPR3RieHgxIbbODI/xxoAADHJ+Y5Zk5w0cBQ+JIWGW38ltkNNOx8UaD2zR9V+jupTLV8nJFnnA2u73dahkg2W+5XkwshPl8PiXeyxbxV+ZO3/wvXWiWhll+hHW4Tv+tBpx1Xr8wK+WjhEMKIQRMIal/MKP9DjYhD7RQylRRy211VZLHSWS9FCT4ggmdFUvvLr9f4S2uvLSC109EhyEmrqtd4U21FZbGyqkd7qt5hEJQOiU5pXnequ3yqVc8zp1ZHif4rxWvFKl8tKKzr8XHIQCXfdvvLz8G11X8J4E/U7cUkst3Tqo+v8BGqkQrMMFpyAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDUtMjVUMDA6Mjk6MzcrMDA6MDBKWqC/AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTA1LTI0VDIyOjUyOjAxKzAwOjAwKNkk2QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAASUVORK5CYII=",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAApCAQAAAD+fOO3AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfnBRkAISsCR/pcAAAD/0lEQVRIx5WVP2wcRRTGf29u9/44a5/Pd2cHEagIEgoFRYSQHMtSQkVJOsoICUVKi+gokFIgghubArAipTHCBVL448ZBFiI0caQ4whGKFRoTx3aS89k+fL7b3ZtHcb7zzdkOyWyzOzPf99773jezQsdQgAS9vMIIo7zJqwTAvyyzyG/8zj9UaIBw6FBUNKfn9Kquad3GsY001FAjja2Nta5relXPaU5FO1DSEd3nDT7kAwZiiaixS0gMeCTJkMbHUzaYYpK/iMQlUMjwLp8wHFNli01C3DhJ+snSgwd/8Dk32JV9AoUM7/Opvl6nRInQTa6lDkny5EkhS3zGD00KAYUk7/GFvrbDKtvoUSKhCH28xDHkAR8zQygIqOEtvtbTO6xQ4UiN25n08jLHkNt8xIJYo5DlEqdrrP4vvLlaYZUanOYSWcXgc4bzMSW2D9S9/7gU25SI4Txn8A0BF7SvSsmpXVES9FGgQB8Jh0RQSlTRPi4QeJxktEGZyIELOfKkSAAN6pQodwQQIsr04I1y0uOsBhFbXVoPUSS5B/BJkSbJupPjFoMkAjlrGMHUiBydsxTa8JaNCmTbfgCIqIFhxHDKml2HW8iR6uqGkCLn7FF2sYZThuMqobM5cwDeosg4MyEqHDekwDoLCcyhHjAknG8LkDJYugDW6XunuLaLELCGkuA7C3WiQyiUiLoz4yNQMtwXm3ZqjdiicYCgwZbjFUgjlvuGW8am8RynldnoomiwQdmxmkcaY7llmCXyCZwcYtZYp9qeqbLOGrETP8CHiFmPBe567wywje2wasgaFTL4QMQuOx2roBgG8OAuCx5lJs3bgclSdrKwVKhgWu3qckaWAGOZpGwImWXOp0i669gKYLHt9/34aYr4MMcsoUF5xBV5HDBIoqt9sve47UwwSIA85gqPUCMQc5MxY3MMwBEm2odDnhymwZfcJBYMCOzwPdOeFuh9JkXzRszjKdNMsyMtP6IsMy6LPRRJHkmhQJIiPcifTLDc3Gb2FLbMMyab/RSOOErNzQX6kU3GmMcKbQIQiPmZSannySKHngWhnzxSZ5JfiKVN2lJceco1mUtRJHOgDAUyFEmpzHGNp/v/1458BRb5igd9FLrOJ4BPgV74mwkWOxvrFCxwg28p5+nHdOSgGPrJQ5lv+NX1RbdiNab4KREOEbSVUISAIRIhP/IdNZ5FIPCQCe6kGdxraLN5g6ThDhM87L4tD/RMYJ5xVrIU9+7ABEWysMI4tw9etoc3/TpTUimQxWDIUkAqTHGd5x2KntAZjat6T+9pVTXWGT2hz41vUgzrktVN3VSruqTDLwQHRT29aJ9YtWqf6EX1XpAAFA30spa0pJc1OBr+H/Nbm042akI7AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIzLTA1LTI1VDAwOjI5OjM3KzAwOjAwSlqgvwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMy0wNS0yNFQyMjo1MjoyOCswMDowMP9kZncAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAAElFTkSuQmCC",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAApCAQAAAD+fOO3AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfnBRkAISsCR/pcAAAEJklEQVRIx5XVT2xc1RUG8N+9M2M79tgxJDLR1MHYjosQrdRFVFUKUSToqsuy6xJVqpDYVuy6qMSiKmSTdNHWQmKTqllUon+yIFRRVbohSAQRgRxRJXWwSQzGjpzYnsnMOyzsOPPGNoX7Nk9P9/vO+b7z5yVdJ6Bi2FEnnfI9j6vjrnlX/cu/3bSmQ7LnCZHikXguXo9b0SzarWIzNmIjNqNVFO1oxq14PZ6LRyJFFyp1Ra95ys/9zKPNtOmuVeta6DNoVN2A/vClc2Z97H4qEwQH/NjLTrSsWrTonnKcIQ0No/r4j99420Z6SBAc8FO/iu+u+Z8b1iVlpYEw6AkThqVrfu0vWxSJoM9P/LY49qWP3RL7mSQkRzzlUfkTv3RBK0lE9gO/j+PLPrQk7QvfNtqY7zskvecXrqQiBwe95Piaj/4vnCRZ8pE1jnvJwZDVPOP5phtu98BDKBSix87kthuaPO8ZtazuhRhZdb2kPYSaMVOmjKmVSJJw3aoY8YJ61YxTLQs25S549h2ThlTRds91CwoPa79pwaj+U2aqno36psVS9GTGMYM73+qGDbrWlWOyaFpfPT2bnYy8ZqOUfMOkoS7KZMikRknIhjWRncye7uQ7Jf0V44Z3+T9sXKXkwx2d7OnsSKT1nqv1PYqZ1Hto10VyJOsPnVLx+rsidZ+K/lJBO4L+rEg9gLZiT4JCu4cwUWTLyUAp1bs2SpEeZLbhbknagMRyNpeLsram21q7CFpua/Z4lQtz2bu5GFHbiZkkN833pNs272ZXq4eaEbnwbnYx3T9grCSiac6c1Z0vq+bMaZYEjDkg3Xex6ooP+n501C2drj5bN2fJQQPYdMeKdqlXK47q4wNXqlbMVn54ODfMl3qvbcnS9izYNacNh1UKs1aylosuDZgy0jO2WdLR2X7rho+YMsAlF7WysOjVvHTYjGpP+dL2Uy5nzYzD8pJXLYqcaHvH6UoxboI9OqAMZ8K4Ssdr3tFOMol7/ux8f0wa+1qKwJgn9IfzzruX2N4iYd6ZdHXUtKF9KQJDpo1KHzprfuta3tKqcNnpvNowsc8oQcWEhrzqtMuKLW/yA7u0/d1sbk5qSHvOQtIwKTfN+of2A2t3FmEKX3gjXdpKsldGYNS0oUiXvOGLh//Xh5tU4qrf+WTMpP5dGQyYMsZ/nXW1u7C5+1LibX+0MuGoSlcOoWLc46z4g3+W+yL3BNp0zt9qrWMO7TgRkkOOqbX81Z9s+jqCxKfOen/EkwbZ3sODnjTC+876tHdb9mYgcdkZC4+ZVgVV0x5jwRnv7V62uwjAm87ltUkNWd4q3ppz3vRNT4jxuBDt1Xgr3orViHZciPH4xvgtihNxrYjP4rMoIq7FiW8FJ0Q1Xiw+70Qnis/jxah+SwJC1OOVWI7leCXq+8O/AuFKp/3c1qOQAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIzLTA1LTI1VDAwOjI5OjM3KzAwOjAwSlqgvwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMy0wNS0yNFQyMjo1Mjo0MiswMDowMJ17ML4AAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAAElFTkSuQmCC",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAApCAQAAAD+fOO3AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfnBRkAISsCR/pcAAAER0lEQVRIx5XVS2xV1xXG8d/evrbxC7CpMbVSECGg2qlRU5tXDEVNOmmHzazDqFIVKdOqsw4qZVA1RZGgg7ZWpEyoyqBS+qADgpxSOglYkIQE2aFCIuGNMcEOhsu9Z3WAgXts0yb7zI7O919nfevbeycNK6BJl2/YY69vWa8Tcy4445/+5VOz6iTLrhApuuPFeDOuxL167W4xF7fjdszF3aJei3txJd6MF6M7UjSoUkP1ZgN+4sd67qRZ110xYx5tuq3Tq0t7uOmgMWfdT2VA0Ob7fm503iUf+9iMcp1ugwb1a+PffuUd8+kxIGjzI7+ILTdMmHBLVu40UFht2LCvSVN+6c8PEImgxQ/9unjmgnFT6vLyJik02eJ71svn/Mxh1SQR2bf9rhi54B/OS0/y+KHRNvqB9fJJP3U6FTlY5VUjNxz9v3KS5LyjbjDiVatC1my3l+446ZNF8lAsPLEI8YmT7vCS3ZqzTi/HyosmRIM8FFbYbJttNltRgiRhwkWx0ss6Kzbbe8dHZhusC9mQYWu0oGrahA8VHs9+1kf6dey1ueKF6JxztlQ9222X7kfv1ui1yvES4qxd2jvTC9meIl/zecnnAdsb5A9itN2AaGjkc9cU2Z7s2Vq+Wuq/YsiaRdNI1hhSKflwVS17NltXTzMl73v1LBOlrEdvaR4z6sm6rDXUSoB2LctmoEV7CVATtGZF0lz62ar6soC6aqmxZokim846SoCbbpcqPfyz226WAB0y09lkpVhbAsyZMr8EMG/KXAmwVqUwmb3XVPRpa6iZfeCUakledcoHpai16dNUeC87ku6v9HQpqnOOedflhXfhsncdK9UPT1sp3Xek4rT323duNan26INsxjHn9enCrKs+VS3Vb7ZVO+87XTFjrLJ9Yx50WlNDG/edc25hL5BLySgM2qhSGDOTVR0x3mWHPkXJzCZZTU3WVDKv0GeHLsYdUc3CJa/naxs8r3XR+NLCUx7nCqM2yNe87pLIiZrj9jUXWw2zTALKcr5jSHPdbxxXSzKJL/zJoY4Ysam045bKwyYjOsIhh3yRWPAmXLA/nem3Q88TESH02KFf+tABFx58lh/0qnDCvnxr0PATthK0GDYo37LPCUXyCECi5m/GKveGfVNadi8kA4ZV7hnzd7XHmXnoeLjhrTTeY6evLzEz0G+nnkjj3nLj8f3akI/EGb917hnbdS4BdNpmE/9xwJnGwZaOnsQ7/mDmOUNaGhChxZDnmPF7R8u5WHx23XXQX1dUn7f+kRMh2WDUiqq/+KO7/hcg8ZkDTq31XasXRsdqe/RyygGfLb76lpyeiRP2u7jFTq2g1S5buGi/k0tvzuVv8rcdzLPbDGjSZMCIPOugt33ZFeKpOBy1y/FGvBGXI2pxOJ6KL61/gBiNqXpMxmTUI6Zi9CvJCVGJV4rrtahFcT1eicpXBBCiM16L6ZiO16LzyfL/AjzmtojnBFLlAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIzLTA1LTI1VDAwOjI5OjM3KzAwOjAwSlqgvwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMy0wNS0yNFQyMjo1Mjo1NCswMDowMDIBBRoAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAAElFTkSuQmCC",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAApCAQAAAD+fOO3AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfnBRkAISsCR/pcAAAEXklEQVRIx5XVS2xdxR3H8c/MuX5g/CBGTQzkATIggQt1K7fNgzgI5YVDWmjaRdsdrRQhsa2666ISi6o0m6SLtu6CRYIS1Er0EdGYEKV1GwlbTaxGRYkCgWAiYuKH4kaxfX3PdOHg3HPttDBnNXPm9x39/vObmaCqJci0WGOzLb5orWb8xyVnnfQ3H5pWIVRpQkEe3OUrvq/Piko2G8shR1SXGvKsYtJRB/3TlBSWAhJ1HvFD39N+LUz40EVjptFipQes0a41mXBIv3eUQxGQuMNWP7Zp2rtO+YcrKov0JLPKRht0auHvfuZNN8ItQOIO3/KT9PCoYwaMiUV3EnIrbbPdauG8n/r9AiKQqNfn55UH3/GqIRXR8i2X+arvekR2wY8cNRcEUtTtV3nPv/3WiFhYubYluS/5gUfFYXudCXlMtHlRz6iD/1dOEI04aJQeL2pLojpP2HPNG4Zr5EmuoiJfyEcVYtgbrrHHE+pKmj2ft15wTF7lPUnu9LBVuOK864JbG5c7pkd3a3zeYMlDtkwbNCGrkke9drhXI2Zc9hd/lS8iogmDOrVt8VDJU6l5yqnC6tEe39CxKLjXal/wuwLilG9qbQ5PRZsr8QNXC8436KuSE3Tos6FQjas+UIk2R11z8X2panq9XvfV7EZwn171Vf3kfXNRV9QxH8YKYVnrnmWiFN1jrbxqZMx80BE1JLOFqS0al81Ao5ZCf1aiIcpDjeCG8rKAshs1wEAejWfaCm4/Nl6IzqfFHfdxoTJtMsajc/X5uoLXScOmlwCmDZss1Gad+ty56O26fJ3mqjUzJx03U5DPOO5kIWrN1qnLvR0NKN/t8SpAMOU1h723OPKew14zVWUgedzdlA2UnDHSuv5JQ8pVObviiBEPaMeEi86ZKWS13pNaGXGmZFJ/3dceixu9pVRViVmnnb55FsgK7iu2eExdrt9kNGfAiXa73F+ISZDJlJVlskL1c/fbpZ0TBsxFyWUvZ2NdntVUc/JvfdXbeafndMnGvOyyFAPzBu1ryHttY5kEFNPANr0aKn5h0HwQCVx32JG70k7d0v9AJEm3HdqSI464HrhZm+SS/eFsp11W3RaRJB2e0Sn8ywGXFqbFBbdyQ/ZlUxtt13hbQKPtNsqm7DMkDxYBBOb9SX/97E5fF5c9C9F6O9TN6vdn87cy82nNk6teCSc67Na5xEaSPGi3jhROeMXVsPi7Kh+Bs37pwpf1WbEEsMLTunnXAWert7Vw9QTe9BuTW/VqqEIkDXptZdKvHS9edrV314xD/tg096xHFyuRRF2e0zTnD16tOaa1gMCoA06v9R0rb3pnpW9bw2kHjNY+fUtuz8CQ/T7q8Ywm0GS3Hj6y3/DSl3P5l/x1h7Lpp61XUrLeTtm0Q173WVuSVqejaf5i2pv2pospzaejaXX6zPoFxKZ0vpKG0lCqpHQ+bfpccpJUSi/kn5RTOeWfpBdS6XMCSFJzeimNp/H0Umq+vfy/0JikOgfvvUIAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDUtMjVUMDA6Mjk6MzcrMDA6MDBKWqC/AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTA1LTI0VDIyOjUzOjA1KzAwOjAwM1Rr9AAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAASUVORK5CYII=",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAApCAQAAAD+fOO3AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfnBRkAISsCR/pcAAADzElEQVRIx5WVTUxUVxiG33tnhmF0iJ0iCVF+NJpghTSUVNOoTTMrCS1qm4mJZVFSu+h048Jg2dCdSatb3TWkTaw2ISkbBY2waGBBJGmsoggkasEfyDhDsQjM33m6YGjnzgw4fmd1v++8z7nnnPecYykrkCSXylStD/WRGlQjv6RFTWtMv2tIM/pHacnK0lgOuaW31KQ2tSiQci3bcSstySUvPuNOa159+kV/6G9h5QOQPHpHX+lzvR21ZjWhO/pL85ICqtW7qlOlylFMl/WjxpXM/gtJCB+tDEOMQU6xEwtlNYudnGKQGMAwrfjIk7cxYRink20OaXbbRifjGJigLQuBKOEYU0mGacFeVy6ETQvDJGGKY5RkENg0MZpmiEMbitfaIYZIwyhN2KvjB+iG+xwuSi7EYe4DdBNAwkMrCy/owFU0wEUHL2CBVjwiQG+am1TkdSsjSDvtBCnLq1VwkzT0EhD7iUUI5y3WcfqZ5BnPmKSf43mLGyYCMfaLTpO4x/acXT/NQwxrYXjI6RxnbOceJkGnuJZI9eQUj/IgS76KeMDRnEF6SKS4Zqt+xR5Ttq88Cmm3nFa1tFsheRzmG9OKrXpblUlr2tG5TrvkUm64tEt1jsy0kpYqbXmNlh2Fcm1Wodiscsf3sozktWVsbXIUFhUvCIhr0fG9SbZkbEXdqnAUHuu5Y03W5vxcjx2ZCrmlqK0Jr9nrKER1XbE8QEzXFXVk9sprNGHrltfUa4uj1KNLeuXIvNIl9TgyW1Qvr9Et0czSU47k+KyaLm5nvGC4TRfVOT2O8BSWaLaoVG/8g9/0pVYcI/i0Tw2qlDSrMY3m7FSpuvWZvCP6VHg5SXqGUMFzV0JJwXyIGUhzEq+wqGEgyQB7ij7OexggCQPUYAnhppm5JS7gL0pexgWWYI5m3KzuMH6+JT3L1zmHqlCz+IY5SHEG///XqsUOrhgzSvA1CIsgoxjDZXZkvS4ImwPcSXKFmg0BNfxKEv7kAHbuy+ChnfkluihdV+7jO5Zhni/w5Jkdi62cNyuPCOEuKHcT4hFmhfNsxVJ+IBroh0EaCwLeYxAM/TSgdQLxCVNwscAdXcFFgCk+XlcuSZRyhtgC4ZyV8BFmAWJ0UKoNAaKKn4nfJ5j10LgIMg5xfqJqw/EziH2MwFVq/wPUchVghPdfK88g2niS5PuMtf38QBKe0FaUPGPtc7yMcAIPHk4QgZecy7JuEYgq+kjdpZFG7kKKviJmn4M4yGSKG9wgBZMcfCO5Vo0XNpEECUyEcObgviHCz1miRDm70ez/BYYI/lv2W3BZAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIzLTA1LTI1VDAwOjI5OjM3KzAwOjAwSlqgvwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMy0wNS0yNFQyMjo1MzoxNiswMDowMM4WcfcAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAAElFTkSuQmCC",
    anchor: [0.5, 1]
  }],
  /**
   * api icons used by drawing control with a good ratio !
   *
   * @example
   * image size : [43, 32]
   * scale : 32 / Math.min(size[0], size[1]) = 1
   */
  drawing_api: [{
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAgCAYAAACLmoEDAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH5wUZACIosGP4JQAABapJREFUWMO1mGtsFFUUgL9zZ6bdbaEP2kpRCYj4wlciRMHEHxo0MdHEqDFG/aExvmJiYmJ8G2P0B8YYYozC+oivCAl/VMRqIkTBUIygCAiNlr6oQAttd9vS7bQ7c48/pq0QdtvZFU9yM5nZOfd895xz7zmzQomibwFlgACVCCPUI1QDCcAFAsBHydBDP2ejOEAlyN2l2XRLhaUcyCDUsoQsK4DrgCuBRmAWcALoAfbQyDaUn1nGAZrRUk1KSV59DwhpRLgLuAe4JsZMPwPrsGzA0CuP/M+wugYwCMJFKM+g3IVQEU8ZgCywAeF1LH/ioPJwfPvFpUGA4LEYeBW4DSlCP3JLBXAfSgXCC7i0TS0jhpjYXk0BHjXAE8BtaMn57gK3IzxBjhpdE18xNiyKg3ADcD/glpbtExJF5AGUGwDnjMJqChBqgccRZhVYTDTCk8bks/zvzwIeBWr1vXiwcUNpgCuAqwuCgtKwtIcFtzqU19Ywls5waGPI8d8aUeS0SET3KxAuB34kRu7Gh1VuRCjPDyqWhbcMsGI1VJ1fCRPH/wX3DrHjyX46N9XlBY5O65XAT0RFZEaPxYMVlpAvvxSoXjTIsteGqTp/LvAvbNXiuSx7dZiqRZkCfnOAy9B4HHFhhagy5d9WsxcmmXN5XZ75DHOunEPVecmC8ypz0XjbtZjjJ5H3qQLGcxHJb1CkHPGcghkpFFrIaRL/6ILBAsbA7zvBWLov7+/+QB/+8ZFpfJc5s7CKRWlFCfPCDhxI0JKyaDh8ql44TMtaJd2SLAAbAn8BNg5GvDRQLEIzUdNy6iYTIMgm+H3VXMYz3Vz8UAavqoHc0HEOpMZpSc0nyJYVgM0RNTixYGMltq5BEM4DvkdYlGcxkRg3xKsAcR1sEBJkwQbONFbaEVYCnfLwzOds3JxV4CiwLq8XZGLYwGFsyMEfgPEhZwZQC3xO1PPGamZiV3hNAcqFCJ8Ay+PqTSM7EO6/86PGv347Uo6xEFqD41isiepHhe9zXU8Pk71Ocf1sCg+4HVgNzCuVUpWjA1nz3B3vn7PxSNZ4AbjGYkJrjOPY0BqxAuNJ389eMjjk7204i3meLRoWop70ZeBJwIuvHLnGKnZ7R2LbU183fHVs2PFdo65G6SiR71QRUcCiBChpA/vFaGvRjd4E8EKUtcBNeSv+NLxtfV778011m3YeSmSciYyWU94QUJ24CIAVGLXo98UUBQAmvp26UFYDHcXoDo6azPrds5t3dSfSjkElArFMDYmuIhbEiqgVQRStQLWmaNgJYCXNZuAdou+qGSUXEvzQmty1fvfsDiMgseIhgqqoyBE1prUkWACOESJ8DHzJdEePRlHd31Pe8vb2mt3jgdgYoAIYBR/YY6DJJBKHS//f4BIA0sAbqlwMXJUXQuDYsNOb2lHd3JX2sqe/ogKCTjbwgkU1CxxE5E+gO51MnqjO5YpqZE5leGTSb+zNhawOleGpJydd/RxjX+yb1bzlYLJXmAp/FF7FqAqoBsAI0KmwxXHdzxS+u7mzswU4MT+Tof3gwf/02RcxpaCzz6ltqLKvJD19zAju5KYOlfCntsTOF7+t33pkyPUdE9U6VUVExoERVdKCdomY1hCOqxCM9veHlbW14Di0tbdP2So9DU7y8M7nTAbHfFBfGSyt8PRaI5FjuwbcQx/+Uv3r34Ou7xp1VMkBaRE5BhwVkW7Xcw+j5KwNkFyouA71Cxbwx759+TLqzEjHKo8yx97RUBm+7TnMG/Rl+N3tNU1rm6v3ey5pgaOo/q3QU5FI9I6OjfkiguN5nLt8OZs//XRmx5wpWIDvnp6duLR+9KXaZPjgjs7k1mebGtals6bDiPY7IpnusrKReb5PeVkZB1pbi57/P6fByVKXDPzOtPtmwtX1f/Qm0u3pRL/b0+VXL2xEVbm+r49v+vtLnv8f2Pk64kl5WH4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDUtMjVUMDA6Mjg6NTkrMDA6MDAzyLlbAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTA1LTI0VDIzOjAyOjM4KzAwOjAwnw8TLgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,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",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,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",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,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",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,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",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,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",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,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",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,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",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,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",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,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",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,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",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAgCAYAAACLmoEDAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH5wUZACIosGP4JQAABQ5JREFUWMO9mNtvFFUcxz+/M9N2d1HaQgEbNVy8hEiURIIBEx98MTGRhIR/wMQnHzThQXwyPhkfjBcwBg0mKiJiTIiYoCQKEWOoEZWLXCIt2+VWWnrZddvSLTszXx9ma8tll9m2+EtOJrtnzvd85nd+8zu/M8Z0TZr6y4A2oBlIAT4QACWgAAwCkwPMpjWlP23YSchHgLXAU8BK4B7gLmAE6AWOAT8DvwKnroP+X0wC6R6kl5F+RVKC1oH0EtKiG1bljkIa0nKkT5BGE4JOtNHKuOUVnTsKa0gPIX2NVK4TdKKVkb5CehBpesGb0KutSO/PAHQq8JaK3h2B9ZA2IA3PEHSiDVf0vDvh1TakA7MEOtF+qOgmwkiauhzwGPBErUdaBb3rwGuFljwUvoXwzziVVYvNtcCjwE/MWkqTfKQ3q8WqSeE6qb9L6pE0IimQNNIp9Twn9SNFNWL3DaSZ5vvrYBuR9lSb9AFp6JiUlRTqeguPSNll0lAV2Kii25h0eZOYUWM5l0D6UZh/Cz23EuYthXQN3UVUD5PrrB73p6p1NIBvVSY0aGqAWm98moSW1LMA/1TrGICRPAzcqm8IBvphtIZuYbZhI6ATCG/VeQpSH0EUwvDU/0MY/hB0urr3QuBMRX+WLN4QXkAaq5Yzm6XxV6WuLun8FWmsSzr/itQ1VxqvkWfHKrqzuDHENcEypLO1krwvBXOlYJ6kuVLgS8FtNoWzSEuT1ghJw0DAZWBnrSULwCuCNwQUwQtqv1gR8AVxzZtoQ0he9cRb4sPAZ8Ca6S7SFOsAnr9//foz/tGjuAjCyOF5EZEzDMiUSjzV28vWyoDkqcsMpG7gPeBdoH3amNJlNzT00b0bNvSncrmFQczhKi2seP2a4Gp/OlN6eMFC2huiOjw76d0M8DqwEWioGzSKoswvv/y8cOPGPf6VKyU8z1cMWUnVEmYCIkSAyDs4aU6d9e3JsXevAluJz1vPUGcoNWSzudbNm4/7fX2t+L7JbIqAYjkpvsT87YKlofihnk1hEhjOEYdCdz1DXaFQaN6x41D68OE8vi/MIouXvNIsvppFYJGZIjNMKIPUUj9sDCzgR+AD4GqiMeVyMOfAgd+bd+7sxrmEx3EzJJNZj5zrnB5sbCHwKfANt0s9EqkTJ07P27LliF27FiUANcAp/u5wzMF3LpW6NNM6Mg+8hbQceLwahNfX19eydeuhhlzu6s33yOC/g64wosp70YXZ38CFfDo90lwu11XI3PDsRsWjxymX3yUMh295W6k0fvfu3Yfm7N/fh9nEuHh5hZMMpIC42MkJ9nu+/7lg37O53Glg5P5CgWxX1wy/yMTZIfJ6evZGCxZ8KudexLlJzSAI0x0dR1q2bz9j5bLwPANMEmZ2zWBUIg+cc2adIfTLCIr9/eGc1la+X7aMs9nsf3IzP06Y4Q4fLjj4OGhrW6VM5kmci9PUuXPnW7Zt+8O/eLEk3/eQykDezK4Al83sgt/gX0KUoyjAyqHwPdoWL+bEX3/dNNWsnH3Kq1erobv7uCsW3wmbmpbiXLsrFofn7tr1W+bgwT4aG/MGl5EuCnrTTU19Y+PjpYmHvW/tGn7cvv32fpkN2Am7e9++1NiKFa+FLa0vZDoOHVy0adNONzTUjXODnlnhQmPjaHupRFNjI6c6O+vWn8VTJQTz55f8XO5tLU992XTiZD6VzQ6Wi8WSlixBEk8PDLB3cHDa+v8CFsk24crxS5QAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDUtMjVUMDA6Mjg6NTkrMDA6MDAzyLlbAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTA1LTI0VDIzOjA4OjQ3KzAwOjAwdKD6FwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,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",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,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",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,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",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,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",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAgCAYAAACLmoEDAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH5wUZACIpx2TIswAABa9JREFUWMOtmGtoHFUUx3/nzkyym7R5tIlNfdCH9f0CLdoK/aCoICiUFkTUDxWxKoLQL0oREdEPikjxGaP9oLVW8IOo2GqpilqJlfporU2oaZKNaW3SZrOb12aSnbnHD7PV1O42s2sPDBdm773nd8/933PurFChvYxSBQhQCzIBTQL1QAJwgQDwFbIDkD4X1In6cjdSkU+3UthqIAvSCJfnYCWwCrgGaAHmAOPAALC/Bb5T2LMcOtpBK/VZ0RLfQgmhReAu4B7ghhgT7QG2WfjQwOBDFbgua0QrigERuEThCYW7BGrijC2EMwd8KPCChUMO6PoyEMqSQQDiwTLgWWC1lDG+gFQD3KdQI/CkC92UIQsTt2MbigcNwGPAaq1c7y6wRuCxPDS0liHh2LAKjsDNwDrArew8R1bYkfs1ms85q7BtKAKNwKMSnfRii0GBcMZz8l2J/nOAh4HGt2JGN+5WGuBq4PpSoIA2X8fAojtxqhtpmMqQ/fNTwhO/0KLRofxvdAFWClwFfEMM7caGVbhVovR6OqhgF9/B8MpNUHchtURbW3vRvYz+sIF06jPmFwMmmu8WYDdREZk1YrFgBS6niL4UqF/KyPLnGKu7kAXwL2zdMhYsf5axuqVkS4TNAa7UmBxxYYWoMhU9V3MXk5x3FfOLzGfmXcO8uiUkS82rsEBj5vty0k+i2EsFjIcrUtyhCNXi4ZQSpFByIadZ7NQFjJRwhj/E+FSGoWK/+8MM+SeYOEPosmcVVsEqdGmUkU6DHe4g0dmG1ZCxU8aFjHW+iWY6SZaADYE/ABuHI5YMFKxAO9Gl5ZRDJkCQI7HveRZMZ+m/9EGyXh3N+VFOdLQx3dnGBUGOqhKweaILTizYWMJuRUVgCbBLYGmRxQBgXEKvBsTFsQFhkAMb4JzBSY9EqSu1Hpk1z8bVrALHgG3FoiCFxwY4U6M4/jBMj+LMAmqB94nuvLFKWOwS34aicLHAu8CKuOPOYD8IrNvasvqP/up9GAuhNTiOxZootdT4PqsGBmgtF7YA7AFrgE3AwkopFT2WM8MbN5+39tO8SXkBuMZiQmuM49jQGrEC00nfz102Mur/1nwOCz1bNixEd9KngQ2AFx8wioxibSrx/Xfbmzd8Mu4c9x113EIFk0IPRUQBixKgZAwcFKNdZd/0CsCLFd4EbpOydkdJe909n89/4rMjiR+zDq4oM6tJYUmqhUYgykSTFt1VTlEAoPDt1KeRFHrLGTtpstl9c7e2H03szRhcBbESHbTCI1ErYkGsiFoRRNEaVBvKhi0Aawa+BF4n+q6a1ULyQXfy65/2z93WKxgk1oaIoCoq8pca01URLMBxCAXeAT7mDKknuoArg9W/d7Y3vPJrINM2BqgQXUt9YL+BHSaROFrx/waXRU0GeFHRS4Fri0EIMO4MDv5Y39qe9VK50yWuAoJqYW2CRTUHHEbkENCfSSbH6/P5si4yp1hBuwr8FpLfpIRjJ1/MbPP4UwfmfNR+OPnVIMjJ7Y+2VzGqAqoBMAGkFL5yXPc9hS9uT6U6gfELsll6Dh+u8H+cGdaGMuSkGuts8zOeJh8RjPtvmgrC3sTuvTubNn476v7lm6igiaoiItPAhCoZQftETFcIJ1QIJtPpsLaxERyH7p6ef3xVLIOZEd5o9mYdw+baoOk6T2tuFAygDLt9f+6tf/vnEfeIb9R1FM0DGRE5DhwTkX7Xc4+i5K0NkHyouA5Nixbx+4EDRSV1Vux5rxfHVq2tDZtfdfAW+jIytqfhtR176t84aKjKCBxD9YjCQE0iMTg5NeWLCI7ncf6KFXy5ZcusPs4aLMDjc79INE1e8VQybHygL9H+7c5zHt+WM8O9oibtiGT7q6omFvo+1VVVdHR1lT3//5bBTEsG8/2Mm3rJtYkPBqsPZoYTPWn6Rv1ky2JUlZuGhtieTlc8/98L/TvfZZ49dwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMy0wNS0yNVQwMDoyODo1OSswMDowMDPIuVsAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjMtMDUtMjRUMjM6MTA6MDQrMDA6MDATW3FEAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg==",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,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",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,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",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,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",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,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",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,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",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,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",
    anchor: [0.5, 1]
  }, {
    src: "data:image/png;base64,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",
    anchor: [0.5, 1]
  }]
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MarkersOther);

/***/ }),

/***/ "./src/packages/Formats/GPX.js":
/*!*************************************!*\
  !*** ./src/packages/Formats/GPX.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ol_format_GPX__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/format/GPX */ "ol/format/GPX");
/* harmony import */ var ol_format_GPX__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ol_format_GPX__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ol_geom_MultiLineString__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/geom/MultiLineString */ "ol/geom/MultiLineString");
/* harmony import */ var ol_geom_MultiLineString__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ol_geom_MultiLineString__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ol_geom_LineString__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/geom/LineString */ "ol/geom/LineString");
/* harmony import */ var ol_geom_LineString__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ol_geom_LineString__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Styling */ "./src/packages/Formats/Styling.js");
/* harmony import */ var _Utils_Parser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Utils/Parser */ "./src/packages/Utils/Parser.js");
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
// import openlayers

// import Geometry


// import local



/**
 * @classdesc
 *
 * Extended Styles GPX format to export (internal use only !)
 *
 * SPEC
 * cf. https://www.topografix.com/gpx.asp
 *
 *
 * @constructor
 * @alias ol.format.GPXExtended
 * @extends {ol.format.GPX}
 * @type {ol.format.GPXExtended}
 * @param {Object} options - Options
 * @param {Object} [options.defaultStyle] - Styles by default
 * @param {String} [options.orderBy] - Sort by key the feature before writing. By default, no sorting
 * @param {Object} [options.extensions] - Add properties to file root
 * @param {function} [options.readExtensions] - Reading extensions (native)
 */
var GPX = /*#__PURE__*/function (_olGPX) {
  /**
   * See {@link ol.format.GPXExtended}
   * @module GPXExtended
   * @alias module:~formats/GPXExtended
   * @param {*} options - options
   * @example
   * import GPXExtended from from "gpf-ext-ol/formats/GPXExtended"
   * ou 
   * import { GPXExtended } from "gpf-ext-ol"
   */
  function GPX(options) {
    var _this;
    _classCallCheck(this, GPX);
    _this = _callSuper(this, GPX, [options]);
    if (!(_this instanceof GPX)) {
      throw new TypeError("ERROR CLASS_CONSTRUCTOR");
    }
    _this.options = options || {};

    // INFO
    // surcharge de la callback : readExtensions
    if (_this.options.readExtensions && typeof _this.options.readExtensions === "function") {
      var clbk = _this.options.readExtensions; // callback definie par l'utilisateur
      _this.options.readExtensions = function (feature, node) {
        this.readExtensions(feature, node);
        clbk.call(this, feature, node);
      };
    } else {
      _this.options.readExtensions = _this.readExtensions;
    }

    // INFO
    // defaultStyle est un objet de type Style
    if (_this.options.defaultStyle === null || typeof _this.options.defaultStyle === "undefined") {
      _this.options.defaultStyle = {};
    }
    _this.source = null;
    return _possibleConstructorReturn(_this, _this);
  }

  /**
   * Read Extend Styles for Features.
   * This function overloads ol.format.GPX.readFeatures ...
   *
   * @see ol.format.GPX.prototype.readFeatures
   * @param {Document|Node} source - Source.
   * @param {olx.format.ReadOptions=} options - options.
   * @return {Array.<ol.Feature>} Features.
   */
  _inherits(GPX, _olGPX);
  return _createClass(GPX, [{
    key: "readFeatures",
    value: function readFeatures(source, options) {
      // INFO
      // le travail de lecture des extensions du format est porté
      // par la callback des options : readExtensions
      var features = _get(_getPrototypeOf(GPX.prototype), "readFeatures", this).call(this, source, options);

      // String ou Dom
      if (typeof source === "string") {
        this.source = _Utils_Parser__WEBPACK_IMPORTED_MODULE_4__["default"].parse(source);
      } else if (source !== null) {
        this.source = source;
      }

      // INFO
      // on applique les styles par defaut definis avec l'option defaultStyle
      // sauf sur les features qui possèdent des extensions.
      // les features avec extensions sont traité au préalable
      // dans la callback des options : readExtensions
      var self = this;
      features.forEach(function (feature, index, array) {
        feature.setId(index + 1);
        // HACK : enregistrement de la description de la balise 'desc' du format GPX
        var value = feature.getProperties().desc;
        if (value) {
          feature.setProperties({
            description: value
          });
        }
        var featureStyleFunction = feature.getStyleFunction();
        if (!featureStyleFunction) {
          var styleFunction = _Styling__WEBPACK_IMPORTED_MODULE_3__["default"].defineStyleFunctionByDefault(self.options.defaultStyle);
          if (styleFunction) {
            feature.setStyle(styleFunction);
          }
        }
      });
      return features;
    }

    /**
     * Write Extend Styles for Features.
     * This function overloads ol.format.GPX.writeFeatures ...
     *
     * @see ol.format.GPX.prototype.writeFeatures
     * @param {Object[]} features - Features.
     * @param {Object} options - Options.
     *
     * @return {String} Result or null.
     */
  }, {
    key: "writeFeatures",
    value: function writeFeatures(features, options) {
      // INFO
      // il n'est pas possible de surcharger les parsers d'OpenLayers (private),
      // on decide de (re)parser la sortie d'OpenLayers afin d'y placer les balises
      // d'extensions

      // on met à jour les properties de styles
      features.forEach(function (feature, index, array) {
        // HACK : enregistrement de la description dans la balise 'desc' du format GPX
        var value = feature.getProperties().description;
        if (value) {
          feature.setProperties({
            desc: value
          });
        }
        _Styling__WEBPACK_IMPORTED_MODULE_3__["default"].definePropertiesFromStyle(feature);

        // HACK : Le type surfacique n'existe pas au format GPX,
        // on doit la transformer en un lineaire.
        // Par contre, on garde un trace de la transformation :
        // * le style surfacique
        // * le type de geometrie initiale
        var type = feature.getGeometry().getType();
        if (type === "Polygon") {
          // creation d'une copie pour ne pas modifier les features de carte
          var fp = feature.clone();
          fp.set("type", type);
          fp.setGeometry(new (ol_geom_LineString__WEBPACK_IMPORTED_MODULE_2___default())(feature.getGeometry().getCoordinates()));
          features.push(fp);
          // feature à supprimer de l'export
          array.splice(index, 1);
        } else if (type === "MultiPolygon") {
          // creation d'une copie pour ne pas modifier les features de carte
          var fm = feature.clone();
          fm.set("type", type);
          fm.setGeometry(new (ol_geom_MultiLineString__WEBPACK_IMPORTED_MODULE_1___default())(feature.getGeometry().getCoordinates()));
          features.push(fm);
          // feature à supprimer de l'export
          array.splice(index, 1);
        }
      });

      // tri des features en fonction de la balise "number" || "id" || "order"
      if (this.options.orderBy !== undefined) {
        var key = this.options.orderBy;
        if (key) {
          var sortFct = function sortFct(a, b) {
            var cmpA = a.get(key) || 0;
            var cmpB = b.get(key) || 0;
            return cmpA.toString().localeCompare(cmpB.toString(), undefined, {
              numeric: true
            });
          };
          features.sort(sortFct);
        }
      }

      // nodes
      var gpxNode = _get(_getPrototypeOf(GPX.prototype), "writeFeaturesNode", this).call(this, features, options);
      if (gpxNode === null) {
        return null;
      }

      // on ajoute les extensions à la racine pour les metadonnées de calcul
      if (this.options.hasOwnProperty("extensions")) {
        this.writeRootExtensions_(gpxNode, this.options.extensions);
      }

      // INFO
      // à chaque fois qu'un style est trouvé dans un feature,
      // on appelle la fonction d'insertion des balises extensions dans le DOM.
      this.processExtensions_(gpxNode, features, {
        extensions: this.writeExtensions_
      });

      // dom -> string
      var gpxStringExtended = _Utils_Parser__WEBPACK_IMPORTED_MODULE_4__["default"].toString(gpxNode);
      if (!gpxStringExtended) {
        return null;
      }

      // format string
      var gpxStringFormatted = _Utils_Parser__WEBPACK_IMPORTED_MODULE_4__["default"].format(gpxStringExtended);
      if (gpxStringFormatted === "") {
        return null;
      }
      return gpxStringFormatted;
    }

    /**
     * Callback to read extensions from options : readExtensions
     *
     * @param {*} feature - ...
     * @param {*} node - ...
     */
  }, {
    key: "readExtensions",
    value: function readExtensions(feature, node) {
      var _node = node;
      // recherche de la properties de type Node ou Element
      // si le node n'est pas renseigné...
      if (!node) {
        var props = feature.getProperties();
        for (var key in props) {
          if (Object.hasOwnProperty.call(props, key)) {
            var _element = props[key];
            if (_element instanceof Node) {
              _node = _element;
              break;
            }
          }
        }
      }
      if (!_node) {
        // eslint-disable-next-line no-console
        console.warn("node not found !");
        return;
      }

      // ex. de nodes :
      // <extensions>
      //     <marker-size>medium</marker-size>
      //     <marker-symbol></marker-symbol>
      //     <marker-color>#ffffff</marker-color>
      // </extensions>
      for (var index = 0; index < _node.childNodes.length; index++) {
        var element = _node.childNodes[index];
        if (element.nodeType === 1) {
          feature.set(element.nodeName, element.textContent);
        }
      }

      // cas particulier du format GPX :
      // il n'existe pas de surfacique sur ce format, mais il est possible de forcer
      // la transformation en polygone pour des besoins particuliers de visualisation
      _Styling__WEBPACK_IMPORTED_MODULE_3__["default"].APPLY_CONVERT_GEOM_GPX = true;
      var style = _Styling__WEBPACK_IMPORTED_MODULE_3__["default"].defineStyleFromProperties(feature);
      if (style) {
        feature.setStyle(style);
      }
    }

    /**
     * ...
     * @param {*} key ...
     * @returns {Object} json
     * @todo
     */
  }, {
    key: "readRootExtensions",
    value: function readRootExtensions(key) {
      var value = {};
      // Rechercher :
      // <metadata>
      //   <extensions xmlns="http://www.w3.org/1999/xhtml">
      //     <data name="geoportail:compute">{...}</data>
      //   </extensions>
      // </metadata>

      var firstNodeLevelGpx = this.source.childNodes[0]; // gpx
      var searchChildNodesMeta = firstNodeLevelGpx.childNodes; // search metadata
      for (var k = 0; k < searchChildNodesMeta.length; k++) {
        var nodeMeta = searchChildNodesMeta[k];
        if (nodeMeta.nodeName === "metadata") {
          var searchChildNodesExt = nodeMeta.childNodes; // search extensions
          for (var i = 0; i < searchChildNodesExt.length; i++) {
            var nodeExt = searchChildNodesExt[i];
            if (nodeExt.nodeName === "extensions") {
              var searchChildNodesData = nodeExt.childNodes; // search data
              for (var j = 0; j < searchChildNodesData.length; j++) {
                var nodeData = searchChildNodesData[j];
                if (nodeData.nodeName === "data") {
                  var name = nodeData.attributes[0];
                  if (name && name.nodeName === "name") {
                    if (name.nodeValue === key) {
                      value = JSON.parse(nodeData.textContent);
                      break;
                    }
                  }
                }
              }
            }
          }
        }
      }
      return value;
    }

    /**
     * ...
     *
     * @param {*} doc - ...
     * @param {*} extensions - ...
     * @param {Boolean} [xml=false] - write tag xml or json
     */
  }, {
    key: "writeRootExtensions_",
    value: function writeRootExtensions_(doc, extensions, xml) {
      // TODO namespace ?
      var metadata = document.createElement("metadata");
      var extensionsRoot = document.createElement("extensions");
      // INFO
      // convert JSON to XML (dom)
      // * type string :
      // { typestring: "string" } -> <typestring>string</typestring>
      //
      // * type object :
      // { typeobject: { typestring1: "string", typestring2: "string" } }
      // -> <typeobject>
      //      <typestring1>string</typestring1>
      //      <typestring2>string</typestring2>
      //    </typeobject>
      //
      // * type array :
      // { typearray : ["item1", "item2"] }
      // -> <typearray type="array" index=2>
      //      <value>item1</value>
      //      <value>item2</value>
      //    </typearray>
      //
      // * type array of array
      // -> <typearray type="array" index=1>
      //      <value type="array" index=2>
      //          <value>1</value>
      //          <value>2</value>
      //      </value>
      //    </typearray>
      //
      // * type array of object
      // -> <typearray type="array" index=2>
      //      <value>
      //          <typestring1>string</typestring1>
      //          <typestring2>string</typestring2>
      //      </value>
      //      <value>
      //          <typestring1>string</typestring1>
      //          <typestring2>string</typestring2>
      //      </value>
      //    </typearray>
      function toDOM(node, json) {
        for (var key in json) {
          if (Object.hasOwnProperty.call(json, key)) {
            var element = json[key] || ""; // au cas où...
            var tag = document.createElement(key);
            // eslint-disable-next-line valid-typeof
            if (typeof element === "string" || typeof element === "number") {
              tag.innerHTML = element;
              node.appendChild(tag);
            } else if (element instanceof Array) {
              tag.setAttribute("type", "array");
              tag.setAttribute("index", element.length);
              for (var index = 0; index < element.length; index++) {
                var item = element[index] || ""; // au cas où...
                var n = document.createElement("value");
                if (typeof item === "string" || typeof item === "number") {
                  n.innerHTML = item;
                  tag.appendChild(n);
                } else if (item instanceof Array) {
                  n.setAttribute("type", "array");
                  n.setAttribute("index", item.length);
                  for (var i = 0; i < item.length; i++) {
                    var value = item[i] || ""; // au cas où...
                    var k = document.createElement("value");
                    if (typeof value === "string" || typeof value === "number") {
                      k.innerHTML = value;
                      n.appendChild(k);
                    }
                  }
                  tag.appendChild(n);
                } else if (item instanceof Object) {
                  tag.appendChild(toDOM(n, item));
                } else {
                  // "Unknown element !"
                }
              }
              node.appendChild(tag);
            } else if (element instanceof Object) {
              node.appendChild(toDOM(tag, element));
            } else {
              // "Unknown element !"
            }
          }
        }
        return node;
      }
      if (xml) {
        // structure xml
        toDOM(extensionsRoot, extensions);
      } else {
        // structure json par defaut
        // ex.
        // <metadata>
        //   <extensions xmlns="http://www.w3.org/1999/xhtml">
        //     <data name="geoportail:compute">{...}</data>
        //   </extensions>
        // </metadata>
        for (var key in extensions) {
          if (Object.hasOwnProperty.call(extensions, key)) {
            var value = extensions[key];
            var dataElement = document.createElement("data");
            dataElement.setAttribute("name", key);
            var data = document.createTextNode(JSON.stringify(value));
            dataElement.appendChild(data);
            extensionsRoot.appendChild(dataElement);
          }
        }
      }
      metadata.appendChild(extensionsRoot);
      // insertion en 1ere place !
      var firstChild = doc.firstChild;
      doc.insertBefore(metadata, firstChild);
    }

    /**
     * ...
     *
     * @param {Object} feature - ...
     * @param {DOMElement} node - ...
     * @private
     */
  }, {
    key: "writeExtensions_",
    value: function writeExtensions_(feature, node) {
      // creation du DOM
      var extensionsNode = document.createElementNS(node.parentNode.namespaceURI, "extensions");
      _Styling__WEBPACK_IMPORTED_MODULE_3__["default"].getListTags().forEach(function (key) {
        if (feature.get(key)) {
          var extension = document.createElementNS(node.parentNode.namespaceURI, key);
          extension.innerHTML = feature.get(key);
          extensionsNode.appendChild(extension);
        }
      });
      node.appendChild(extensionsNode);
    }

    /**
     * ...
     *
     * @param {DOMElement} doc - ...
     * @param {Object} features - ...
     * @param {Object} actions - ...
     * @private
     */
  }, {
    key: "processExtensions_",
    value: function processExtensions_(doc, features, actions) {
      // INFO
      // OpenLayers ne gère pas tous les tags du format GPX : ex. metadata
      // Liste des tags :
      // * wpt
      // * rte
      // * trk
      // On peut y placer nos balises extensions.

      var index = -1;
      var nodes = doc.childNodes;
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        switch (node.nodeName) {
          case "wpt":
          case "rte":
          case "trk":
            index++;
            var feature = features[index];
            var style = feature.getStyle();
            if (style) {
              var fct = actions.extensions;
              if (fct && typeof fct === "function") {
                fct(feature, node);
              }
            }
            break;
          case "metadata":
            break;
          default:
            // on ne devrait jamais passer à ce niveau !?
            // eslint-disable-next-line no-console
            console.warn("nodename unknown :", node.nodeName);
            break;
        }
      }
    }
  }]);
}((ol_format_GPX__WEBPACK_IMPORTED_MODULE_0___default()));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GPX);

// Expose GPX as ol.source.GPXExtended. (for a build bundle)
if (window.ol && window.ol.format) {
  window.ol.format.GPXExtended = GPX;
}

/***/ }),

/***/ "./src/packages/Formats/GeoJSON.js":
/*!*****************************************!*\
  !*** ./src/packages/Formats/GeoJSON.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ol_format_GeoJSON__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/format/GeoJSON */ "ol/format/GeoJSON");
/* harmony import */ var ol_format_GeoJSON__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ol_format_GeoJSON__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Styling */ "./src/packages/Formats/Styling.js");
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
// import openlayers

// import local


/**
 * @classdesc
 *
 * Extended Styles GeoJSON format to export (internal use only !)
 *
 * SPEC
 * cf. https://github.com/mapbox/simplestyle-spec/
 * cf. https://geojson.org/
 *
 *
 * @constructor
 * @alias ol.format.GeoJSONExtended
 * @extends {ol.format.GeoJSON}
 * @type {ol.format.GeoJSONExtended}
 * @param {Object} options - Options
 * @param {Object} [options.defaultStyle] - Styles by default
 * @param {Object} [options.extensions] - Add properties to file root
 */
var GeoJSON = /*#__PURE__*/function (_olGeoJSON) {
  /**
   * See {@link ol.format.GeoJSONExtended}
   * @module GeoJSONExtended
   * @alias module:~formats/GeoJSONExtended
   * @param {*} options - options
   * @example
   * import GeoJSONExtended from "gpf-ext-ol/formats/GeoJSONExtended"
   * ou 
   * import { GeoJSONExtended } from "gpf-ext-ol"
   */
  function GeoJSON(options) {
    var _this;
    _classCallCheck(this, GeoJSON);
    _this = _callSuper(this, GeoJSON, [options]);
    if (!(_this instanceof GeoJSON)) {
      throw new TypeError("ERROR CLASS_CONSTRUCTOR");
    }
    _this.options = options || {};

    // INFO
    // defaultStyle est un objet de type Style
    if (_this.options.defaultStyle === null || typeof _this.options.defaultStyle === "undefined") {
      _this.options.defaultStyle = {};
    }
    _this.source = null;
    return _possibleConstructorReturn(_this, _this);
  }

  /**
   * Read Extend Styles for Features.
   * This function overloads ol.format.GeoJSON.readFeatures ...
   *
   * @see ol.format.GeoJSON.prototype.readFeatures
   * @param {Object|String} source - Source.
   * @param {olx.format.ReadOptions} [options] - Options.
   * @return {Array.<ol.Feature>} Features.
   */
  _inherits(GeoJSON, _olGeoJSON);
  return _createClass(GeoJSON, [{
    key: "readFeatures",
    value: function readFeatures(source, options) {
      var _this2 = this;
      var features = _get(_getPrototypeOf(GeoJSON.prototype), "readFeatures", this).call(this, source, options);

      // String ou Object
      if (typeof source === "string") {
        this.source = JSON.parse(source);
      } else if (source !== null) {
        this.source = source;
      }
      features.forEach(function (feature) {
        var featureStyleFunction = feature.getStyleFunction();
        // existe t il déjà une fonction de style ?
        // si oui, on l'applique !
        if (featureStyleFunction) {
          var styles = featureStyleFunction.call(_this2, feature, 0);
          if (styles && styles.length !== 0) {
            feature.setStyle(styles[0]);
          }
        } else {
          // à ce niveau, il n'existe pas de styles, donc :
          // soit, on applique les styles par defaut
          // soit, on prend en compte les styles definis dans les properties / tag du fichier
          // les styles définis ecrasent les styles par defaut...
          var style = _Styling__WEBPACK_IMPORTED_MODULE_1__["default"].defineStyleFromProperties(feature);
          if (style) {
            feature.setStyle(style);
          } else {
            // si aucun style disponible, on utilisera le style par defaut defini
            // par l'utilisateur ou l'application
            var styleFunction = _Styling__WEBPACK_IMPORTED_MODULE_1__["default"].defineStyleFunctionByDefault(_this2.options.defaultStyle);
            if (styleFunction) {
              feature.setStyle(styleFunction);
              _Styling__WEBPACK_IMPORTED_MODULE_1__["default"].definePropertiesFromStyle(feature);
            }
          }
        }
      });
      return features;
    }

    /**
     * Write Extend Styles for Features.
     * This function overloads ol.format.GeoJSON.writeFeatures ...
     *
     * @see ol.format.GeoJSON.prototype.writeFeatures
     * @param {Array.<ol.Feature>} features - Features.
     * @param {Object} [options] - Options.
     *
     * @return {String} Result.
     */
  }, {
    key: "writeFeatures",
    value: function writeFeatures(features, options) {
      // on met à jour les properties de styles
      features.forEach(function (feature) {
        _Styling__WEBPACK_IMPORTED_MODULE_1__["default"].definePropertiesFromStyle(feature);
      });
      var geoJSONObject = this.writeFeaturesObject(features, options);

      // ajout des properties à la racine du fichier
      // ex. options : {
      //   extensions : { /* liste des objets à ajouter */ }
      // }
      if (this.options.hasOwnProperty("extensions")) {
        Object.assign(geoJSONObject, this.options.extensions);
      }
      return JSON.stringify(geoJSONObject);
    }

    /**
     * ...
     * @param {*} key ...
     * @returns {Object} json
     */
  }, {
    key: "readRootExtensions",
    value: function readRootExtensions(key) {
      return this.source[key];
    }
  }]);
}((ol_format_GeoJSON__WEBPACK_IMPORTED_MODULE_0___default()));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GeoJSON);

// Expose GeoJSON as ol.source.GeoJSONExtended. (for a build bundle)
if (window.ol && window.ol.format) {
  window.ol.format.GeoJSONExtended = GeoJSON;
}

/***/ }),

/***/ "./src/packages/Formats/KML.js":
/*!*************************************!*\
  !*** ./src/packages/Formats/KML.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ol_format_KML__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/format/KML */ "ol/format/KML");
/* harmony import */ var ol_format_KML__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ol_format_KML__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ol_style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/style */ "ol/style");
/* harmony import */ var ol_style__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ol_style__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Styling */ "./src/packages/Formats/Styling.js");
/* harmony import */ var _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Utils/ColorUtils */ "./src/packages/Utils/ColorUtils.js");
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Utils/LoggerByDefault */ "./src/packages/Utils/LoggerByDefault.js");
/* harmony import */ var _Utils_Parser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Utils/Parser */ "./src/packages/Utils/Parser.js");
/* harmony import */ var _Utils_Helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Utils/Helper */ "./src/packages/Utils/Helper.js");
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
// import openlayers


// import local





var logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_4__["default"].getLogger("extended KML format");

/**
 * @classdesc
 *
 * Extended Styles KML format to export (internal use only !)
 *
 * INFO
 * only ol.Control is a user-extendable class.
 * Everything else requires integration with the original openlayers source and a new ol.js
 * to be built with your new classes incorporated.
 *
 * SPEC
 * cf. https://developers.google.com/kml/forum/advanced
 *
 * ISSUES
 * cf. https://github.com/openlayers/openlayers/issues/4829
 * cf. https://github.com/openlayers/openlayers/issues/4460
 * cf. https://github.com/openlayers/openlayers/pull/5590
 * cf. https://github.com/openlayers/openlayers/issues/5229
 * cf. https://github.com/openlayers/openlayers/issues/3371
 *
 * @constructor
 * @alias ol.format.KMLExtended
 * @type {ol.format.KMLExtended}
 * @extends {ol.format.KML}
 * @param {Object} options - Options
 * @param {Object} [options.extensions] - Add properties to file root
 */
var KML = /*#__PURE__*/function (_olKML) {
  /**
   * See {@link ol.format.KMLExtended}
   * @module KMLExtended
   * @alias module:~formats/KMLExtended
   * @param {*} options - options
   * @example
   * import KMLExtended from "gpf-ext-ol/formats/KMLExtended"
   * ou 
   * import { KMLExtended } from "gpf-ext-ol"
   */
  function KML(options) {
    var _this;
    _classCallCheck(this, KML);
    _this = _callSuper(this, KML, [options]);
    if (!(_this instanceof KML)) {
      throw new TypeError("ERROR CLASS_CONSTRUCTOR");
    }
    options = options || {};

    // INFO
    // source DOM (Document ou Node)
    _this.source = null;

    // INFO
    // gestion des extensions
    _this.extensions = options.extensions || null;

    // INFO
    // defaultStyle est un tableau d'objet de type Style
    if (options.defaultStyle && !Array.isArray(options.defaultStyle)) {
      options.defaultStyle = [options.defaultStyle];
    }
    if (options.defaultStyle === null || typeof options.defaultStyle === "undefined") {
      options.defaultStyle = [];
    }
    return _possibleConstructorReturn(_this, _this);
  }

  /**
   *
   * En lecture, on surcharge la méthode readFeatures.
   * ✔️ In : kml string + features du format original
   * ✔️ Out : features étendus avec des styles, et des metadatas (name ou extendData)
   * > on modifie les features du format original avec les fonctionnalités non gérées.
   *
   * En écriture, on surcharge la méthode writeFearures.
   * ✔️ In : kml du format original + features étendus
   * ✔️ Out : kml étendu avec des styles, et des metadatas (name ou extendData)
   * > on modifie le kml généré par le format original avec les fonctionnalités que nous avons ajoutées aux features.
   *
   * Le principe
   * On parse le kml, et on lit (get) ou on ajoute (set) des fonctionnalités.
   *
   * Les getters vont lire le kml (ex. LabelExtendStyle), et ajouter le style ainsi que le nom du label dans le feature original.
   * getLabelIconStyle (appel des 2 fonctions suivantes)
   * getLabelExtendStyle (New)
   * getHotSpotIconStyle (Bug sur la lecture du  hotspot)
   * getExtendData (New)
   *
   * Les setters vont écrire dans le dom du kml original les fonctionnalités ajoutées dans les features.
   * setLabelExtendStyle (New)
   * setHotSpotIconStyle (Bug sur l'écriture du hotspot)
   * setNameData (Bug suppression de cette balise du format par défaut).
   *
   */

  /**
   * Fonction de lecture du KML avec fonction de traitement en fonction du type
   * PlaceMark (Label ou Marker).
   * Les traitements sont de 2 types :
   *  - creation de styles étendus ou correctifs sur le KML
   *  - ajout de styles étendus sur les features
   *
   * @param {DOMElement} kmlNode - kml nodes
   * @param {Object[]} features - features
   * @param {Object} process - process
   *
   * @example
   * // ajoute des fonctionnalités dans le KML
   * _processKml(kmlDoc, {
   *   labelStyle : createStyleLabel,
   *   iconStyle  : createStyleIcon
   * });
   *
   * // lit des fonctionnalités du KML non impl. par OpenLayers
   * _processKml(kmlNode, {
   *   labelStyle : getStyleToFeatureLabel,
   *   iconStyle  : getStyleToFeatureIcon,
   *   extendedData : getExtendedData
   * });
   */
  _inherits(KML, _olKML);
  return _createClass(KML, [{
    key: "_processKml",
    value: function _processKml(kmlNode, features, process) {
      var firstNodeLevel = kmlNode.nodeName === "#document" ? kmlNode.childNodes[0].childNodes : kmlNode.childNodes;

      // Si le DOM contient un seul objet, le noeud est directement un PlaceMark
      // sinon, c'est un ensemble de noeuds PlaceMark contenus dans le noeud Document.
      var nodes = firstNodeLevel;
      for (var ik = 0; ik < firstNodeLevel.length; ik++) {
        var element = firstNodeLevel[ik];
        if (element.nodeName === "Document") {
          nodes = element.childNodes;
          break;
        }
        if (element.nodeName === "Placemark") {
          nodes = [element];
          break;
        }
      }

      // On recherche les PlaceMark de type Point ayant un Style...
      // Le style peut être placé directement dans le PlaceMark
      // ou lié avec un id (share)
      var stylesUrl = {}; // listes des styles
      var index = -1; // index du features...
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        switch (node.nodeName) {
          case "Style":
            // INFO
            // pour le traitement des balises Styles liées avec styleUrl,
            // elles doivent être toujours déclarées avant les PlaceMark !
            // On ne prend en compte que celles qui sont identifiées via un ID !
            var id = node.attributes[0];
            if (id && id.nodeName === "id") {
              var _k = id.nodeValue;
              var _v = node;
              stylesUrl[_k] = _v;
            }
            break;
          case "Placemark":
            index++;
            var types = node.childNodes; // Point, LineString, Polygon, Style, ...
            var point = false;
            var line = false;
            var poly = false;
            var domStyles = null; // dom
            var hdlDomStyle = null; // dom
            var domExtendedData = null; // dom
            var domNameTag = node; // dom
            for (var j = 0; j < types.length; j++) {
              switch (types[j].nodeName) {
                case "Polygon":
                  poly = true;
                  break;
                case "LineString":
                  line = true;
                  break;
                case "Point":
                  point = true;
                  break;
                case "Style":
                  hdlDomStyle = types[j];
                  domStyles = types[j].childNodes; // liste de styles
                  break;
                case "styleUrl":
                  // style avec lien vers...
                  var _idStyle = types[j].textContent.slice(1);
                  if (stylesUrl[_idStyle]) {
                    domStyles = stylesUrl[_idStyle].childNodes;
                  }
                  break;
                case "ExtendedData":
                  domExtendedData = types[j].childNodes;
                  break;
                case "name":
                  domNameTag = null;
                  break;
                default:
                // on ne traite pas les autres informations ...
                // car elles seront gérées par defaut par le format standard...
              }
            }

            // On traite les balises kml:extendedData pour tous les objets !
            if (domExtendedData) {
              logger.log("ExtendedData :", domExtendedData);
              var fctExtend = process.extendedData;
              if (fctExtend && typeof fctExtend === "function") {
                fctExtend(features[index], domExtendedData);
              }
            }

            // On traite la balise kml:name
            if (domNameTag) {
              logger.log("Name :", domNameTag);
              var fctName = process.nameData;
              if (fctName && typeof fctName === "function") {
                fctName(features[index], domNameTag);
              }
            }

            // On a un Marker avec un Style.
            // Il peut être associé avec un Label !
            // Les markers sans styles ne doivent pas être gérées par les styles par defaut
            // car le KML met en place une punaise google !
            if (point && domStyles && domStyles.length !== 0) {
              var labelStyleDom = null;
              var iconStyleDom = null;
              // On recherche le type de Style
              for (var k = 0; k < domStyles.length; k++) {
                switch (domStyles[k].nodeName) {
                  case "LabelStyle":
                    labelStyleDom = domStyles[k];
                    break;
                  case "IconStyle":
                    iconStyleDom = domStyles[k];
                    break;
                  default:
                  // on ne traite pas les autres informations ...
                }
              }

              // Pour un label, il nous faut un titre !
              var labelName = features[index].getProperties().name;
              var labelDescription = features[index].getProperties().description;
              var value = labelName || labelDescription;
              logger.trace(value);

              // C'est uniquement un Label !
              if (!iconStyleDom && labelStyleDom) {
                var fctLabel = process.labelStyle;
                if (fctLabel && typeof fctLabel === "function") {
                  fctLabel(features[index], labelStyleDom);
                }
                // C'est uniquement un marker !
              } else if (iconStyleDom && !labelStyleDom) {
                var fctIcon = process.iconStyle;
                if (fctIcon && typeof fctIcon === "function") {
                  fctIcon(features[index], iconStyleDom);
                }
                // C'est un marker avec un label !
              } else if (iconStyleDom && labelStyleDom) {
                var fctIconLabel = process.iconLabelStyle;
                if (fctIconLabel && typeof fctIconLabel === "function") {
                  fctIconLabel(features[index], iconStyleDom, labelStyleDom);
                }
              } else {
                // ...
              }
            } else {
              var feature = features[index];
              var style = feature.getStyle();
              if (style && typeof style === "function") {
                var fstyles = style.call(this, feature, 0);
                if (fstyles && fstyles.length !== 0) {
                  style = fstyles[0];
                }
              }
              if (poly) {
                var fctPoly = process.polygonStyle;
                if (fctPoly && typeof fctPoly === "function") {
                  fctPoly(features[index], domStyles);
                }
              }
              if (line) {
                var fctLine = process.lineStringStyle;
                if (fctLine && typeof fctLine === "function") {
                  fctLine(features[index], domStyles);
                }
              }

              // INFO
              // On est sur un Point mais sans style dans le DOM.
              // On regarde le style dans le Feature : Icon ou Circle ?
              if (point && style) {
                var image = style.getImage();
                if (image && image instanceof ol_style__WEBPACK_IMPORTED_MODULE_1__.Circle) {
                  var fctCircle = process.circleStyle;
                  if (fctCircle && typeof fctCircle === "function") {
                    fctCircle(features[index], hdlDomStyle);
                  }
                } else if (image && image instanceof ol_style__WEBPACK_IMPORTED_MODULE_1__.Icon) {
                  var fctPoint = process.pointStyle;
                  if (fctPoint && typeof fctPoint === "function") {
                    fctPoint(features[index], hdlDomStyle);
                  }
                } else {
                  // ...
                }
              }
            }
            break;
          default:
            logger.trace("tag is not processing !");
        }
      }
    }

    /**
     * Write Extend for Features.
     * This function overloads ol.format.KML.writeFeatures ...
     *
     * @see ol.format.KML.prototype.writeFeatures
     * @param {Object[]} features - Features.
     * @param {Object} options - Options.
     *
     * @return {String} kml string formatted
     */
  }, {
    key: "writeFeatures",
    value: function writeFeatures(features, options) {
      logger.log("overload : ol.format.KML.writeFeatures");
      var kmlNode = _get(_getPrototypeOf(KML.prototype), "writeFeaturesNode", this).call(this, features, options);
      if (kmlNode === null) {
        return null;
      }

      // on ajoute les extensions à la racine pour les metadonnées de calcul
      if (this.hasOwnProperty("extensions")) {
        this._writeRootExtensions(kmlNode, this.extensions);
      }

      // On ajoute les styles étendus
      var kmlStringExtended = this._writeExtendStylesFeatures(kmlNode, features, options);

      // On realise un formattage du KML
      var kmlStringFormatted = _Utils_Parser__WEBPACK_IMPORTED_MODULE_5__["default"].format(kmlStringExtended);
      if (kmlStringFormatted === "") {
        return null;
      }
      return kmlStringFormatted;
    }
  }, {
    key: "_writeExtendStylesFeatures",
    value:
    /**
     * Write Extended Styles for each features
     *
     * @param {DOMElement} kmlNode - kml nodes
     * @param {Object[]} features - features
     * @param {Object} options - options
     *
     * @returns {String} kml string extended
     *
     * @private
     */
    function _writeExtendStylesFeatures(kmlNode, features, options) {
      // RGB Colors (RRGGBB) To KML Colors (AABBGGRR)
      function __convertRGBColorsToKML(data, opacity) {
        var strColor = data.toString(16);
        if (strColor.charAt(0) === "#") {
          strColor = strColor.slice(1);
        }
        opacity = opacity || 1;
        opacity = parseInt(opacity * 255, 10);
        opacity = opacity.toString(16);
        var color = opacity;
        color = color + strColor.substr(4, 2);
        color = color + strColor.substr(2, 2);
        color = color + strColor.substr(0, 2);
        return color.toLowerCase();
      }

      /**
       * C'est un Label !
       * On va donc y ajouter qq styles sur le Label (police, halo, ...) :
       * Insertion : PlaceMark>Style>LabelStyle
       *
       * @param {Object} feature - feature
       * @param {DOMElement} node - node
       *
       * @example
       *      <LabelStyleSimpleExtensionGroup fontFamily="Arial" haloColor="16777215" haloRadius="2" haloOpacity="1"/>
       */
      var __createExtendedStyleLabel = function __createExtendedStyleLabel(feature, node) {
        logger.trace("label with style :", node);
        if (!feature) {
          return;
        }

        // Si pas de style defini, c'est donc que l'on va utiliser celui par defaut...
        if (feature.getStyle() instanceof ol_style__WEBPACK_IMPORTED_MODULE_1__.Style) {
          var textStyle = feature.getStyle().getText();
          if (!textStyle) {
            return;
          }
          var _fontFamily = "Sans";
          var _fontSize = "16px";
          var _font = textStyle.getFont();
          if (_font) {
            var splits = _font.split(" ", 2);
            _fontSize = splits[0];
            _fontFamily = splits[1];
          }
          var strokeTextStyle = feature.getStyle().getText().getStroke();
          if (!strokeTextStyle) {
            return;
          }
          if (strokeTextStyle instanceof ol_style__WEBPACK_IMPORTED_MODULE_1__.Stroke) {
            var _haloColor = __convertRGBColorsToKML("#FFFFFF"); // Par defaut
            var color = strokeTextStyle.getColor();
            // array ?
            if (Array.isArray(color)) {
              var cf = "rgba(";
              cf += color[0] + ",";
              cf += color[1] + ",";
              cf += color[2] + ",";
              cf += color[3] + ")";
              color = cf;
            }
            if (_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["default"].isRGB(color)) {
              var colorHex = _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["default"].rgbaToHex(color);
              _haloColor = __convertRGBColorsToKML(colorHex.hex, colorHex.opacity);
            } else {
              _haloColor = __convertRGBColorsToKML(color);
            }
            var _haloRadius = strokeTextStyle.getWidth() || "0";
            var _haloOpacity = "1"; // TODO lire param

            if (node && node.getElementsByTagName("LabelStyleSimpleExtensionGroup").length === 0) {
              var labelExtended = document.createElementNS(kmlNode.namespaceURI, "LabelStyleSimpleExtensionGroup");
              labelExtended.setAttribute("fontSize", _fontSize);
              labelExtended.setAttribute("fontFamily", _fontFamily);
              labelExtended.setAttribute("haloColor", _haloColor);
              labelExtended.setAttribute("haloRadius", _haloRadius);
              labelExtended.setAttribute("haloOpacity", _haloOpacity);
              node.appendChild(labelExtended);
            }
          }
          var fImageStyle = feature.getStyle().getImage();
          if (!fImageStyle) {
            return;
          }
          if (fImageStyle instanceof ol_style__WEBPACK_IMPORTED_MODULE_1__.Circle) {
            var strokeColor = null;
            var strokeWidth = null;
            if (fImageStyle.getStroke()) {
              strokeWidth = fImageStyle.getStroke().getWidth();
              strokeColor = fImageStyle.getStroke().getColor();
              // array ?
              if (Array.isArray(strokeColor)) {
                var cfs = "rgba(";
                cfs += strokeColor[0] + ",";
                cfs += strokeColor[1] + ",";
                cfs += strokeColor[2] + ",";
                cfs += strokeColor[3] + ")";
                strokeColor = cfs;
              }
              if (_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["default"].isRGB(strokeColor)) {
                var strokeColorHex = _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["default"].rgbaToHex(strokeColor);
                strokeColor = __convertRGBColorsToKML(strokeColorHex.hex, strokeColorHex.opacity);
              } else {
                strokeColor = __convertRGBColorsToKML(strokeColor);
              }
            }
            var fillColor = null;
            if (fImageStyle.getFill()) {
              fillColor = fImageStyle.getFill().getColor();
              // array ?
              if (Array.isArray(fillColor)) {
                var cff = "rgba(";
                cff += fillColor[0] + ",";
                cff += fillColor[1] + ",";
                cff += fillColor[2] + ",";
                cff += fillColor[3] + ")";
                fillColor = cff;
              }
              if (_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["default"].isRGB(fillColor)) {
                var fillColorHex = _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["default"].rgbaToHex(fillColor);
                fillColor = __convertRGBColorsToKML(fillColorHex.hex, fillColorHex.opacity);
              } else {
                fillColor = __convertRGBColorsToKML(fillColor);
              }
            }
            if (node && node.getElementsByTagName("ObjectSimpleExtensionGroup").length === 0) {
              var iconExtended = document.createElementNS(kmlNode.namespaceURI, "ObjectSimpleExtensionGroup");
              iconExtended.setAttribute("type", "circle"); // FIXME type circle only !
              iconExtended.setAttribute("radius", fImageStyle.getRadius());
              iconExtended.setAttribute("fillColor", fillColor);
              iconExtended.setAttribute("strokeColor", strokeColor);
              iconExtended.setAttribute("strokeWidth", strokeWidth);
              node.appendChild(iconExtended);
            }
          }
        }
      };

      /**
       * C'est un marker !
       * On va donc ajouter la balise hotspot :
       *  Traiter le cas où les unités sont de type
       *   - FRACTION
       *   - PIXELS
       *  Insertion du correctif dans le noeud : <PlaceMark><Style>IconStyle
       *
       * @param {Object} feature - ol feature
       * @param {DOMElement} node - node
       *
       *  @example
       *  <Style><IconStyle>
       *      <hotSpot x="0.5"  y="1" xunits="fraction" yunits="fraction"/>
       *  </IconStyle></Style>
       */
      var __createExtendedStyleIcon = function __createExtendedStyleIcon(feature, node) {
        logger.trace("marker with style (hotspot):", node);
        if (!feature) {
          return;
        }

        // Si pas de style defini, c'est donc que l'on va utiliser celui par defaut...
        if (feature.getStyle() instanceof ol_style__WEBPACK_IMPORTED_MODULE_1__.Style) {
          var fImageStyle = feature.getStyle().getImage();
          if (!fImageStyle) {
            return;
          }
          if (fImageStyle instanceof ol_style__WEBPACK_IMPORTED_MODULE_1__.Icon) {
            var x = 0;
            var y = 0;
            var xunits = "pixels";
            var yunits = "pixels";
            var size = fImageStyle.getSize();
            var anchor = fImageStyle.getAnchor(); // pixels ! but anchor_ in the current unit !

            if (anchor.length) {
              x = anchor[0];
              y = anchor[1];
              if (yunits === "fraction") {
                y = y === 1 ? 0 : 1 - y; // cf. fixme contribution à faire !
              } else {
                y = yunits === "pixels" && y === size[1] ? 0 : size[1] - y; // cf. fixme contribution à faire !
              }
            }
            if (node && node.getElementsByTagName("hotSpot").length === 0) {
              var hotspot = document.createElementNS(kmlNode.namespaceURI, "hotSpot");
              hotspot.setAttribute("x", x);
              hotspot.setAttribute("y", y);
              hotspot.setAttribute("xunits", xunits);
              hotspot.setAttribute("yunits", yunits);
              node.appendChild(hotspot);
            }
          }
        }
      };

      /**
       * ...
       * @param {*} feature - feature
       * @param {DOMElement} node - node
       */
      var __createExtendedStyleToCircle = function __createExtendedStyleToCircle(feature, node) {
        if (!feature) {
          return;
        }

        // Si pas de style defini, c'est donc que l'on va utiliser celui par defaut...
        if (feature.getStyle() instanceof ol_style__WEBPACK_IMPORTED_MODULE_1__.Style) {
          var fImageStyle = feature.getStyle().getImage();
          if (!fImageStyle) {
            return;
          }
          if (fImageStyle instanceof ol_style__WEBPACK_IMPORTED_MODULE_1__.Circle) {
            var strokeColor = null;
            var strokeWidth = null;
            if (fImageStyle.getStroke()) {
              strokeWidth = fImageStyle.getStroke().getWidth();
              strokeColor = fImageStyle.getStroke().getColor();
              // array ?
              if (Array.isArray(strokeColor)) {
                var cf = "rgba(";
                cf += strokeColor[0] + ",";
                cf += strokeColor[1] + ",";
                cf += strokeColor[2] + ",";
                cf += strokeColor[3] + ")";
                strokeColor = cf;
              }
              if (_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["default"].isRGB(strokeColor)) {
                var colorHex = _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["default"].rgbaToHex(strokeColor);
                strokeColor = __convertRGBColorsToKML(colorHex.hex, colorHex.opacity);
              } else {
                strokeColor = __convertRGBColorsToKML(strokeColor);
              }
            }
            var fillColor = null;
            if (fImageStyle.getFill()) {
              fillColor = fImageStyle.getFill().getColor();
              // array ?
              if (Array.isArray(fillColor)) {
                var cfi = "rgba(";
                cfi += fillColor[0] + ",";
                cfi += fillColor[1] + ",";
                cfi += fillColor[2] + ",";
                cfi += fillColor[3] + ")";
                fillColor = cfi;
              }
              if (_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["default"].isRGB(fillColor)) {
                var fillColorImgHex = _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["default"].rgbaToHex(fillColor);
                fillColor = __convertRGBColorsToKML(fillColorImgHex.hex, fillColorImgHex.opacity);
              } else {
                fillColor = __convertRGBColorsToKML(fillColor);
              }
            }
            if (node && node.getElementsByTagName("ObjectSimpleExtensionGroup").length === 0) {
              var labelStyle = document.createElementNS(kmlNode.namespaceURI, "LabelStyle");
              var circleExtended = document.createElementNS(kmlNode.namespaceURI, "ObjectSimpleExtensionGroup");
              circleExtended.setAttribute("type", "circle"); // FIXME type circle only !
              circleExtended.setAttribute("radius", fImageStyle.getRadius());
              circleExtended.setAttribute("fillColor", fillColor);
              circleExtended.setAttribute("strokeColor", strokeColor);
              circleExtended.setAttribute("strokeWidth", strokeWidth);
              labelStyle.appendChild(circleExtended);
              node.appendChild(labelStyle);
            }
          }
        }
      };

      /**
       * ...
       * @param {*} feature - feature
       * @param {DOMElement} node - node
       */
      var __createExtendedStyleToPoint = function __createExtendedStyleToPoint(feature, node) {};

      // TODO
      var __createExtendedStyleToIconLabel = function __createExtendedStyleToIconLabel(feature, nodeIconStyle, nodeLabelStyle) {
        logger.trace("write an icon with a label");
        __createExtendedStyleIcon(feature, nodeIconStyle);
        __createExtendedStyleLabel(feature, nodeLabelStyle);
      };

      // TODO
      var __setNameData = function __setNameData(feature, tags) {
        for (var i = 0; i < tags.length; i++) {
          var tag = tags[i];
          if (tag.nodeName === "name") {
            return;
          }
        }
        var labelName = feature.getProperties().name;
        if (labelName) {
          var name = document.createElement("name");
          name.innerHTML = labelName;
          tags.appendChild(name);
        }
      };

      // TODO
      var _setExtendedDataStyle = function _setExtendedDataStyle(feature, node) {
        if (node && node.length) {
          var removeNodes = [];
          for (var k = 0; k < node.length; k++) {
            var element = node[k];
            if (element.nodeName === "Data") {
              var key = element.getAttribute("name");
              if (_Styling__WEBPACK_IMPORTED_MODULE_2__["default"].getListTags().includes(key)) {
                removeNodes.push(element);
              }
            }
          }
          if (removeNodes && removeNodes.length) {
            removeNodes.forEach(function (e) {
              e.remove();
            });
          }
        }
      };

      // On ajoute les styles étendus dans le DOM
      this._processKml(kmlNode, features, {
        labelStyle: __createExtendedStyleLabel,
        iconStyle: __createExtendedStyleIcon,
        iconLabelStyle: __createExtendedStyleToIconLabel,
        circleStyle: __createExtendedStyleToCircle,
        pointStyle: __createExtendedStyleToPoint,
        nameData: __setNameData,
        extendedData: _setExtendedDataStyle
      });

      // On convertit le DOM en String...
      var kmlStringExtended = _Utils_Parser__WEBPACK_IMPORTED_MODULE_5__["default"].toString(kmlNode);
      if (!kmlStringExtended) {
        return null;
      }
      return kmlStringExtended;
    }
  }, {
    key: "_writeRootExtensions",
    value:
    /**
     * ...
     *
     * @param {*} kmlNode - ...
     * @param {*} extensions - ...
     */
    function _writeRootExtensions(kmlNode, extensions) {
      var extendDataElement = document.createElementNS(kmlNode.namespaceURI, "ExtendedData");
      // on boucle sur toutes les clefs
      for (var key in extensions) {
        if (Object.hasOwnProperty.call(extensions, key)) {
          var value = extensions[key];
          var dataElement = document.createElementNS(kmlNode.namespaceURI, "Data");
          dataElement.setAttribute("name", key);
          var data = document.createTextNode(JSON.stringify(value));
          dataElement.appendChild(data);
          extendDataElement.appendChild(dataElement);
        }
      }
      // insertion en 1ere place !
      var firstChild = kmlNode.firstChild;
      kmlNode.insertBefore(extendDataElement, firstChild);
    }

    /**
     * Read Extend for Features.
     * This function overloads ol.format.KML.readFeatures ...
     *
     * @see ol.format.KML.prototype.readFeatures
     * @param {Document|Node} source - Source.
     * @param {olx.format.ReadOptions=} options - options.
     * @return {Array.<ol.Feature>} Features.
     */
  }, {
    key: "readFeatures",
    value: function readFeatures(source, options) {
      logger.log("overload : ol.format.KML.readFeatures");

      // String ou Dom
      if (typeof source === "string") {
        this.source = _Utils_Parser__WEBPACK_IMPORTED_MODULE_5__["default"].parse(source);
      } else if (source !== null) {
        this.source = source;
      }
      var features = this._readExtendStylesFeatures(source, options);
      logger.trace("Styles étendus", features);

      // On met à jour les attributs de style dans les features
      features.forEach(function (feature) {
        _Styling__WEBPACK_IMPORTED_MODULE_2__["default"].definePropertiesFromStyle(feature);
      });
      return features;
    }
  }, {
    key: "_readExtendStylesFeatures",
    value:
    /**
     * Read Extended Styles for each features
     *
     * @param {(Document|Node|ArrayBuffer|Object|String)} source - source
     * @param {olx.format.ReadOptions=} options - options
     *
     * @returns {Object[]} features
     *
     * @private
     */
    function _readExtendStylesFeatures(source, options) {
      var features = _get(_getPrototypeOf(KML.prototype), "readFeatures", this).call(this, source, options);
      var kmlDoc = null;
      var kmlString = "";
      if (typeof source === "string") {
        kmlString = source;
      } else {
        kmlString = source.documentElement.outerHTML;
      }

      // On 'deformatte' le KML afin d'eviter des pb de parsing...
      kmlString = kmlString.replace(/\n/g, "");
      kmlString = kmlString.replace(/(>)\s*(<)/g, "$1$2");

      // On met en place un Parser sur le KML
      kmlDoc = _Utils_Parser__WEBPACK_IMPORTED_MODULE_5__["default"].parse(kmlString);
      if (kmlDoc === null) {
        // au cas où...
        return features;
      }

      // KML Colors (AABBGGRR) To RGB Colors (RRGGBB)
      function __convertKMLColorsToRGB(data) {
        var color = "";
        color = color + data.substr(6, 2);
        color = color + data.substr(4, 2);
        color = color + data.substr(2, 2);
        var hex = parseInt(color, 16).toString(16);
        var comp = "";
        var len = hex.length || 0;
        for (var i = 0; i < 6 - len; i++) {
          comp += "0";
        }
        hex = "#" + comp + hex;
        return hex;
      }

      /**
       * Gestion des styles étendus sur le Label
       *
       * @param {Object} feature - ol feature
       * @param {DOMElement} node - node
       *
       * @example
       * <Placemark>
       *  <description>Un label</description>
       *  <name>C'est un label étendu !</name>
       *  <Style>
       *    <IconStyle>
       *      <Icon>
       *        <href>data:image/png;base64,...</href>
       *      </Icon>
       *    </IconStyle>
       *    <LabelStyle>
       *      <color>ffffffff</color>
       *      <colorMode>normal</colorMode>
       *      <scale>1.85</scale>
       *      <LabelStyleSimpleExtensionGroup haloColor="16711680" haloRadius="5" haloOpacity="1"/>
       *    </LabelStyle>
       *  </Style>
       *  <Point>
       *    <coordinates>2,48</coordinates>
       *  </Point>
       * </Placemark>
       */
      var __getExtendedStyleToFeatureLabel = function __getExtendedStyleToFeatureLabel(feature, node) {
        logger.trace("label with style :", node);
        if (!feature) {
          return;
        }

        // label
        var _text = feature.getProperties().name;
        var _color = __convertKMLColorsToRGB("ff000000"); // "#000000"
        var _colorHalo = "#FFFFFF";
        var _radiusHalo = 0;
        // var _opacityHalo = 1; // TODO
        var _font = "Sans";
        var _fontSize = "16px";

        // cercle
        var _circleType = null;
        var _circleRadius = 5;
        var _circleFillColor = "#000000";
        var _circleStrokeColor = "#ffffff";
        var _circleStrokeWidth = 1;

        // On recherche les balises du Style
        var bLabelStyleSimpleExtensionGroup = false;
        var bObjectSimpleExtensionGroup = false;
        var nodeStyles = node.childNodes;
        for (var k = 0; k < nodeStyles.length; k++) {
          switch (nodeStyles[k].nodeName) {
            case "scale":
              // TODO
              break;
            case "colorMode":
              // TODO
              break;
            case "color":
              _color = __convertKMLColorsToRGB(nodeStyles[k].textContent);
              break;
            case "LabelStyleSimpleExtensionGroup":
              bLabelStyleSimpleExtensionGroup = true;
              var attributs = nodeStyles[k].attributes;
              for (var l = 0; l < attributs.length; l++) {
                switch (attributs[l].nodeName) {
                  case "fontFamily":
                    _font = attributs[l].nodeValue;
                    break;
                  case "fontSize":
                    _fontSize = attributs[l].nodeValue;
                    break;
                  case "haloColor":
                    _colorHalo = __convertKMLColorsToRGB(attributs[l].nodeValue);
                    break;
                  case "haloRadius":
                    _radiusHalo = parseInt(attributs[l].nodeValue, 10);
                    break;
                  case "haloOpacity":
                    // _opacityHalo = parseFloat(attributs[l].nodeValue);
                    // TODO opacité !
                    // if (_opacityHalo !== 1) {
                    //     _colorHalo = Color.hexToRgba(_colorHalo, _opacityHalo);
                    // }
                    break;
                  default:
                }
              }
              break;
            case "ObjectSimpleExtensionGroup":
              bObjectSimpleExtensionGroup = true;
              var attributsExt = nodeStyles[k].attributes;
              for (var ll = 0; ll < attributsExt.length; ll++) {
                // type="circle" radius="15" fillColor="7f3737a0" strokeColor="cc000000" strokeWidth="2"
                switch (attributsExt[ll].nodeName) {
                  case "type":
                    _circleType = attributsExt[ll].nodeValue;
                    break;
                  case "radius":
                    _circleRadius = parseInt(attributsExt[ll].nodeValue, 10);
                    break;
                  case "fillColor":
                    var fillColorValue = attributsExt[ll].nodeValue;
                    var fillOpacity = Math.round(_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["default"].num(fillColorValue.substr(0, 2)) / 255 * 10) / 10;
                    var fillColorHexa = __convertKMLColorsToRGB(fillColorValue);
                    _circleFillColor = _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["default"].hexToRgba(fillColorHexa, fillOpacity);
                    break;
                  case "strokeColor":
                    var strokeColorValue = attributsExt[ll].nodeValue;
                    var strokeOpacity = Math.round(_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["default"].num(strokeColorValue.substr(0, 2)) / 255 * 10) / 10;
                    var strokeColorHexa = __convertKMLColorsToRGB(strokeColorValue);
                    _circleStrokeColor = _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["default"].hexToRgba(strokeColorHexa, strokeOpacity);
                    break;
                  case "strokeWidth":
                    _circleStrokeWidth = parseInt(attributsExt[ll].nodeValue, 10);
                    break;
                  default:
                }
              }
              break;
            default:
            // on ne traite pas les autres informations ...
          }
        }
        var StyleInstance = null;
        if (bObjectSimpleExtensionGroup && _circleType === "circle") {
          StyleInstance = new ol_style__WEBPACK_IMPORTED_MODULE_1__.Circle({
            radius: _circleRadius,
            fill: new ol_style__WEBPACK_IMPORTED_MODULE_1__.Fill({
              color: _circleFillColor
            }),
            stroke: new ol_style__WEBPACK_IMPORTED_MODULE_1__.Stroke({
              color: _circleStrokeColor,
              width: _circleStrokeWidth
            })
          });
        } else if (bLabelStyleSimpleExtensionGroup) {
          // INFO
          // on ajoute une image magique 1x1 pixel invisible
          // afin d'eviter l'affichage d'une punaise google !
          StyleInstance = new ol_style__WEBPACK_IMPORTED_MODULE_1__.Icon({
            src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNiYAAAAAkAAxkR2eQAAAAASUVORK5CYII=",
            size: [51, 38],
            anchor: [25.5, 38],
            anchorOrigin: "top-left",
            anchorXUnits: "pixels",
            anchorYUnits: "pixels"
          });
        } else {
          // ...
        }
        // On reconstruit le style !
        feature.setStyle(new ol_style__WEBPACK_IMPORTED_MODULE_1__.Style({
          image: StyleInstance,
          text: new ol_style__WEBPACK_IMPORTED_MODULE_1__.Text({
            font: _fontSize + " " + _font,
            textAlign: "left",
            text: _text,
            // offsetX : 5, // FIXME valeur arbitraire MAIS esthétique !
            fill: new ol_style__WEBPACK_IMPORTED_MODULE_1__.Fill({
              color: _color
            }),
            stroke: new ol_style__WEBPACK_IMPORTED_MODULE_1__.Stroke({
              color: _colorHalo,
              width: _radiusHalo
            })
          })
        }));
      };

      /**
       * Gestion des styles étendus sur un Marker
       *
       * > correctif sur la balise kml:hostSpot
       * - problème avec 'hotspot y === 0' (?)
       *
       * @param {Object} feature - ol feature
       * @param {DOMElement} node - node
       *
       * @example
       * <Placemark>
       *   <Style>
       *     <IconStyle>
       *       <Icon>
       *         <href>data:image/png;base64,...</href>
       *       </Icon>
       *       <hotSpot x="25.5" y="0" xunits="pixels" yunits="pixels"/>
       *     </IconStyle>
       *   </Style>
       *   <Point>
       *     <coordinates>2,48</coordinates>
       *   </Point>
       * </Placemark>
       */
      var __getExtendedStyleToFeatureIcon = function __getExtendedStyleToFeatureIcon(feature, node) {
        logger.trace("hotspot :", node);

        // marker
        var _src = null;
        var _scale = null;
        var _color = __convertKMLColorsToRGB("ffffffff");
        var _bSizeIcon = false;
        var _sizeW = 51;
        var _sizeH = 38;
        var _bHotSpot = false;
        var _anchorX = 25.5;
        var _anchorXUnits = "pixels";
        var _anchorY = 38;
        var _anchorYUnits = "pixels";
        var nodeStyles = node.childNodes;
        var bIconStyle = false;
        for (var k = 0; k < nodeStyles.length; k++) {
          switch (nodeStyles[k].nodeName) {
            case "Icon":
              bIconStyle = true;
              var nodes = nodeStyles[k].childNodes;
              for (var i = 0; i < nodes.length; i++) {
                switch (nodes[i].nodeName) {
                  case "href":
                    _src = nodes[i].textContent;
                    break;
                  case "gx:w":
                    _bSizeIcon = true;
                    _sizeW = parseFloat(nodes[i].textContent);
                    break;
                  case "gx:h":
                    _bSizeIcon = true;
                    _sizeH = parseFloat(nodes[i].textContent);
                    break;
                  default:
                }
              }
              break;
            case "hotSpot":
              _bHotSpot = true;
              var attributs = nodeStyles[k].attributes;
              for (var l = 0; l < attributs.length; l++) {
                switch (attributs[l].nodeName) {
                  case "x":
                    _anchorX = parseFloat(attributs[l].nodeValue);
                    break;
                  case "y":
                    _anchorY = parseFloat(attributs[l].nodeValue);
                    break;
                  case "yunits":
                    _anchorXUnits = attributs[l].nodeValue;
                    break;
                  case "xunits":
                    _anchorYUnits = attributs[l].nodeValue;
                    break;
                  default:
                }
              }
              break;
            case "scale":
              _scale = parseFloat(nodeStyles[k].textContent);
              break;
            case "color":
              _color = __convertKMLColorsToRGB(nodeStyles[k].textContent);
              break;
            default:
            // on ne traite pas les autres informations ...
          }
        }
        var StyleInstance = null;
        if (bIconStyle) {
          // une image magique 1x1 pixel invisible
          var optionsIcon = {
            src: _src || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNiYAAAAAkAAxkR2eQAAAAASUVORK5CYII=",
            color: _color,
            crossOrigin: "anonymous",
            // cf. https://gis.stackexchange.com/questions/121555/wms-server-with-cors-enabled/147403#147403
            scale: _scale || 1
          };
          if (_bSizeIcon) {
            _Utils_Helper__WEBPACK_IMPORTED_MODULE_6__["default"].mergeParams(optionsIcon, {
              size: [_sizeW, _sizeH]
            });
          }
          if (_bHotSpot) {
            _Utils_Helper__WEBPACK_IMPORTED_MODULE_6__["default"].mergeParams(optionsIcon, {
              anchor: [_anchorX, _anchorY],
              anchorOrigin: "bottom-left",
              anchorXUnits: _anchorXUnits || "pixels",
              anchorYUnits: _anchorYUnits || "pixels"
            });
          }
          StyleInstance = new ol_style__WEBPACK_IMPORTED_MODULE_1__.Icon(optionsIcon);
        }

        // existe il déjà le style du label ?
        var featureStyleFunction = feature.getStyleFunction();
        if (featureStyleFunction) {
          var _styles = featureStyleFunction(feature, 0);
          if (_styles && !Array.isArray(_styles)) {
            _styles = [_styles];
          }
          if (_styles && _styles.length !== 0) {
            var _style = _styles.length === 1 ? _styles[0] : _styles[_styles.length - 1];
            // on écrase l'icone magic du label !
            feature.setStyle(new ol_style__WEBPACK_IMPORTED_MODULE_1__.Style({
              image: StyleInstance,
              text: _style.getText()
            }));
          }
        }
      };

      /**
       * Gestion de la balise kml:ExtendedData
       *
       * @param {Object} feature - ol feature
       * @param {DOMElement[]} extend - extend
       *
       * @example
       * //--> Marker (Point), LineString, Polygon
       * <ExtendedData>
       *    <Data name="attributetitle">
       *        <displayName>title</displayName>
       *        <value>Titre à concatener avec la valeur de la balise "kml:description"</value>
       *    </Data>
       * </ExtendedData>
       * //--> Label
       * <ExtendedData>
       *    <Data name="label">
       *        <value>PARIS</value> // valeur à remplacer dans "kml:name"
       *    </Data>
       *    <Data name="attributetitle">
       *        <displayName>title</displayName>
       *        <value>Titre à concatener avec la valeur de la balise "kml:description"</value>
       *    </Data>
       * </ExtendedData>
       */
      var __getExtendedData = function __getExtendedData(feature, extend) {
        logger.trace("extendData :", extend);
        if (!feature) {
          return;
        }
        var props = {};
        var _fname = feature.get("name") || "";
        var _fdescription = feature.get("description") || "";
        var _ftitle = null;
        for (var i = 0; i < extend.length; i++) {
          var data = extend[i];
          var name = data.attributes[0]; // 1 seul attribut !
          var nodes = data.childNodes;
          if (name.nodeName === "name") {
            switch (name.nodeValue) {
              // compatibilité ancien geoportail !
              case "label":
                _fname = data.textContent;
                props.name = _fname;
                break;
              // compatibilité ancien geoportail !
              case "title":
              case "attributetitle":
                for (var j = 0; j < nodes.length; j++) {
                  if (nodes[j].nodeName === "value") {
                    _ftitle = nodes[j].textContent;
                  }
                }
                break;
              default:
                props[name.nodeValue] = data.textContent;
                break;
            }
          }
        }

        // Modification des properties "name" et "description"
        if (_ftitle) {
          _fdescription = _fdescription ? _ftitle + " : " + _fdescription : _ftitle;
          props.description = _fdescription;
        }
        if (Object.keys(props).length) {
          feature.setProperties(props, true);
        }
      };

      /**
       * TODO
       * ...
       *
       * @param {Object} feature - ol feature
       * @param {DOMElement} nodeIconStyle - icon style
       * @param {DOMElement} nodeLabelStyle - label style
       * @example
       * ...
       */
      var __getExtendedStyleToFeatureIconLabel = function __getExtendedStyleToFeatureIconLabel(feature, nodeIconStyle, nodeLabelStyle) {
        logger.trace("display icon and label");
        __getExtendedStyleToFeatureLabel(feature, nodeLabelStyle);
        __getExtendedStyleToFeatureIcon(feature, nodeIconStyle);
      };

      // TODO...
      var __getStyleToDefaultFeature = function __getStyleToDefaultFeature(feature, node) {};

      // On lit les styles étendus et on les ajoute aux features
      this._processKml(kmlDoc, features, {
        lineStringStyle: __getStyleToDefaultFeature,
        polygonStyle: __getStyleToDefaultFeature,
        pointStyle: __getStyleToDefaultFeature,
        labelStyle: this.showPointNames_ ? __getExtendedStyleToFeatureLabel : null,
        iconStyle: __getExtendedStyleToFeatureIcon,
        iconLabelStyle: this.showPointNames_ ? __getExtendedStyleToFeatureIconLabel : __getExtendedStyleToFeatureIcon,
        extendedData: __getExtendedData
      });
      return features;
    }
  }, {
    key: "readRootExtensions",
    value:
    /**
     * ...
     * @param {*} key ...
     * @returns {Object} json
     */
    function readRootExtensions(key) {
      var value = {};
      // Rechercher le tag avec la clef : geoportail:compute
      // <ExtendedData>
      //   <Data name="geoportail:compute">{...}</Data>
      // </ExtendedData>
      var firstNodeLevelKml = this.source.nodeName === "#document" ? this.source.childNodes[0] : this.source;
      var childNodesLevel = firstNodeLevelKml.childNodes;
      for (var i = 0; i < childNodesLevel.length; i++) {
        var node1 = childNodesLevel[i];
        if (node1.nodeName === "ExtendedData") {
          var childNodesExtended = node1.childNodes;
          for (var j = 0; j < childNodesExtended.length; j++) {
            var node2 = childNodesExtended[j];
            if (node2.nodeName === "Data") {
              var name = node2.attributes[0];
              if (name && name.nodeName === "name") {
                if (name.nodeValue === key) {
                  value = JSON.parse(node2.textContent);
                  break;
                }
              }
            }
          }
        }
      }
      return value;
    }
  }]);
}((ol_format_KML__WEBPACK_IMPORTED_MODULE_0___default()));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (KML);

// Expose KML as ol.source.KMLExtended. (for a build bundle)
if (window.ol && window.ol.format) {
  window.ol.format.KMLExtended = KML;
}

/***/ }),

/***/ "./src/packages/Formats/Styling.js":
/*!*****************************************!*\
  !*** ./src/packages/Formats/Styling.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils/ColorUtils */ "./src/packages/Utils/ColorUtils.js");
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Utils/LoggerByDefault */ "./src/packages/Utils/LoggerByDefault.js");
/* harmony import */ var _Controls_Utils_Markers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Controls/Utils/Markers */ "./src/packages/Controls/Utils/Markers.js");
/* harmony import */ var ol_Feature__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/Feature */ "ol/Feature");
/* harmony import */ var ol_Feature__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ol_Feature__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var ol_style_Style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/style/Style */ "ol/style/Style");
/* harmony import */ var ol_style_Style__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ol_style_Style__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var ol_style_Circle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/style/Circle */ "ol/style/Circle");
/* harmony import */ var ol_style_Circle__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ol_style_Circle__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var ol_style_Icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/style/Icon */ "ol/style/Icon");
/* harmony import */ var ol_style_Icon__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ol_style_Icon__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var ol_style_Fill__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/style/Fill */ "ol/style/Fill");
/* harmony import */ var ol_style_Fill__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(ol_style_Fill__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var ol_style_Stroke__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/style/Stroke */ "ol/style/Stroke");
/* harmony import */ var ol_style_Stroke__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(ol_style_Stroke__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var ol_style_Text__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/style/Text */ "ol/style/Text");
/* harmony import */ var ol_style_Text__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(ol_style_Text__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var ol_geom_Polygon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/geom/Polygon */ "ol/geom/Polygon");
/* harmony import */ var ol_geom_Polygon__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(ol_geom_Polygon__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var ol_geom_MultiPolygon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/geom/MultiPolygon */ "ol/geom/MultiPolygon");
/* harmony import */ var ol_geom_MultiPolygon__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(ol_geom_MultiPolygon__WEBPACK_IMPORTED_MODULE_11__);



// import ol

// import Style






// import geom


var logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_1__["default"].getLogger("styling");
(ol_Feature__WEBPACK_IMPORTED_MODULE_3___default().prototype).setPropertyFill = function () {
  var style = this.getStyle();
  if (!style) {
    return;
  }
  if (Array.isArray(style) && style.length === 0) {
    return;
  }
  var fill = style.getFill();
  if (fill) {
    var colorFill = fill.getColor();
    // array
    if (Array.isArray(colorFill)) {
      var cf = "rgba(";
      cf += colorFill[0] + ",";
      cf += colorFill[1] + ",";
      cf += colorFill[2] + ",";
      cf += colorFill[3] + ")";
      colorFill = cf;
    }
    if (_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_0__["default"].isRGB(colorFill)) {
      var oColorFill = _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_0__["default"].rgbaToHex(colorFill);
      this.set("fill", oColorFill.hex);
      this.set("fill-opacity", oColorFill.opacity);
    } else {
      this.set("fill", colorFill);
      this.set("fill-opacity", 1);
    }
  }
};
(ol_Feature__WEBPACK_IMPORTED_MODULE_3___default().prototype).setPropertyStroke = function () {
  var style = this.getStyle();
  if (!style) {
    return;
  }
  if (Array.isArray(style) && style.length === 0) {
    return;
  }
  var stroke = style.getStroke();
  if (stroke) {
    var colorStroke = stroke.getColor();
    // array
    if (Array.isArray(colorStroke)) {
      var cs = "rgba(";
      cs += colorStroke[0] + ",";
      cs += colorStroke[1] + ",";
      cs += colorStroke[2] + ",";
      cs += colorStroke[3] + ")";
      colorStroke = cs;
    }
    if (_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_0__["default"].isRGB(colorStroke)) {
      var oColorStroke = _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_0__["default"].rgbaToHex(colorStroke);
      this.set("stroke", oColorStroke.hex);
      this.set("stroke-opacity", oColorStroke.opacity);
    } else {
      this.set("stroke", colorStroke);
      this.set("stroke-opacity", 1);
    }
    this.set("stroke-width", stroke.getWidth());
  }
};
(ol_Feature__WEBPACK_IMPORTED_MODULE_3___default().prototype).setPropertyLabel = function () {
  var style = this.getStyle();
  if (!style) {
    return;
  }
  if (Array.isArray(style) && style.length === 0) {
    return;
  }
  var isName = this.get("name") !== undefined;
  var label = style.getText();
  if (label && isName) {
    var fill = style.getText().getFill();
    if (fill) {
      var colorFill = fill.getColor();
      // array
      if (Array.isArray(colorFill)) {
        var cf = "rgba(";
        cf += colorFill[0] + ",";
        cf += colorFill[1] + ",";
        cf += colorFill[2] + ",";
        cf += colorFill[3] + ")";
        colorFill = cf;
      }
      if (_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_0__["default"].isRGB(colorFill)) {
        var oColorFill = _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_0__["default"].rgbaToHex(colorFill);
        this.set("label-fill", oColorFill.hex);
        this.set("label-fill-opacity", oColorFill.opacity);
      } else {
        this.set("label-fill", colorFill);
        this.set("label-fill-opacity", 1);
      }
    }
    var stroke = style.getText().getStroke();
    if (stroke) {
      var colorStroke = stroke.getColor();
      // array
      if (Array.isArray(colorStroke)) {
        var cs = "rgba(";
        cs += colorStroke[0] + ",";
        cs += colorStroke[1] + ",";
        cs += colorStroke[2] + ",";
        cs += colorStroke[3] + ")";
        colorStroke = cs;
      }
      if (_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_0__["default"].isRGB(colorStroke)) {
        var oColorStroke = _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_0__["default"].rgbaToHex(colorStroke);
        this.set("label-stroke", oColorStroke.hex);
        this.set("label-stroke-opacity", oColorStroke.opacity);
      } else {
        this.set("label-stroke", colorStroke);
        this.set("label-stroke-opacity", 1);
      }
      this.set("label-stroke-width", stroke.getWidth());
    }
    this.set("label-font", style.getText().getFont() || Styling.DEFAULT_TEXT.font);
    this.set("label-textAlign", style.getText().getTextAlign() || Styling.DEFAULT_TEXT.textAlign);
  }
};
(ol_Feature__WEBPACK_IMPORTED_MODULE_3___default().prototype).setPropertyMarker = function () {
  var style = this.getStyle();
  if (!style) {
    return;
  }
  if (Array.isArray(style) && style.length === 0) {
    return;
  }
  var image = style.getImage();
  if (image) {
    // si le tag image est seul...
    // c'est soit un marker ou soit un cercle !
    if (image instanceof (ol_style_Icon__WEBPACK_IMPORTED_MODULE_6___default())) {
      var color = image.getColor();
      // array
      if (Array.isArray(color)) {
        var c = "rgba(";
        c += color[0] + ",";
        c += color[1] + ",";
        c += color[2] + ",";
        c += color[3] + ")";
        color = c;
      }
      // feature.set("marker-color", ""); // par defaut
      if (color) {
        var colorIcon = _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_0__["default"].rgbaToHex(color);
        this.set("marker-color", colorIcon.hex);
      }
      var scaleIcon = image.getScale();
      switch (Math.round(scaleIcon * 2) / 2) {
        case 0:
        case 0.5:
          this.set("marker-size", "small");
          break;
        case 1:
          this.set("marker-size", "medium");
          break;
        case 1.5:
        case 2:
          this.set("marker-size", "large");
          break;
        default:
          // this.set("marker-size", ""); // par defaut
          break;
      }
      // feature.set("marker-symbol", ""); // par defaut
      var srcImage = image.getSrc();
      if (srcImage) {
        this.set("marker-symbol", srcImage);
      }
      // INFO
      // cas particulier où un objet est transformé :
      //  * un cercle est transformé en icone
      //  > les attributs du cercle sont à supprimer !
      this.unset("circle-fill");
      this.unset("circle-fill-opacity");
      this.unset("circle-stroke");
      this.unset("circle-stroke-width");
      this.unset("circle-stroke-opacity");
      this.unset("circle-radius");
    } else {
      var fillImg = image.getFill();
      if (fillImg) {
        var colorFillImg = fillImg.getColor();
        // array
        if (Array.isArray(colorFillImg)) {
          var cfi = "rgba(";
          cfi += colorFillImg[0] + ",";
          cfi += colorFillImg[1] + ",";
          cfi += colorFillImg[2] + ",";
          cfi += colorFillImg[3] + ")";
          colorFillImg = cfi;
        }
        if (_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_0__["default"].isRGB(colorFillImg)) {
          var oColorFillImg = _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_0__["default"].rgbaToHex(colorFillImg);
          this.set("circle-fill", oColorFillImg.hex);
          this.set("circle-fill-opacity", oColorFillImg.opacity);
        } else {
          this.set("circle-fill", colorFillImg);
          this.set("circle-fill-opacity", 1);
        }
      }
      var strokeImg = image.getStroke();
      if (strokeImg) {
        var colorStrokeImg = strokeImg.getColor();
        // array
        if (Array.isArray(colorStrokeImg)) {
          var csi = "rgba(";
          csi += colorStrokeImg[0] + ",";
          csi += colorStrokeImg[1] + ",";
          csi += colorStrokeImg[2] + ",";
          csi += colorStrokeImg[3] + ")";
          colorStrokeImg = csi;
        }
        if (_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_0__["default"].isRGB(colorStrokeImg)) {
          var oColorStrokeImg = _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_0__["default"].rgbaToHex(colorStrokeImg);
          this.set("circle-stroke", oColorStrokeImg.hex);
          this.set("circle-stroke-opacity", oColorStrokeImg.opacity);
        } else {
          this.set("circle-stroke", colorStrokeImg);
          this.set("circle-stroke-opacity", 1);
        }
        this.set("circle-stroke-width", strokeImg.getWidth());
      }
      var radius = image.getRadius();
      this.set("circle-radius", radius);
    }
  }
};

/**
 * @module Styling
 * @alias Gp.Styling
 * @private
 * @todo ...
 * @description
 * A simple specification for styling GeoJSON / GPX / KML data.
 *
 * @see ol.format.GeoJSONExtended
 * @see ol.format.KMLExtended
 * @see ol.format.GPXExtended
 *
 * @example
 * feature.getStyle(); // null
 * feature.getProperties(); // {"stroke": "#ff0000", "stroke-width": 2}
 * Styling.defineStyleFromProperties(feature);
 * feature.getStyle(); // [Object Style]
 *
 * feature.getStyle(); // [Object Style]
 * feature.getProperties(); // {}
 * Styling.definePropertiesFromStyle(feature);
 * feature.getProperties(); // {"stroke": "#ff0000", "stroke-width": 2}
 *
 * var style = feature.getStyle(); // [Object Style]
 * var tag = Styling.setTag(style, "GPX");
 *
 * ex. output GeoJSON:
 * ```json
 *  "properties": {
 *   "stroke": "#ff0000",
 *   "stroke-width": 2
 *  }
 * ```
 */
var Styling = {
  /**
   * Options to convert geometry
   */
  APPLY_CONVERT_GEOM_GPX: true,
  /**
   * Default icon style options
   */
  DEFAULT_ICON: {
    src: _Controls_Utils_Markers__WEBPACK_IMPORTED_MODULE_2__["default"]["lightOrange"],
    anchor: [0.5, 1],
    scale: 1
  },
  /**
   * Default circle style options
   */
  DEFAULT_CIRCLE: {
    radius: 10,
    fill: {
      opacity: 1,
      color: [0, 0, 0, 1]
    },
    stroke: {
      width: 1,
      opacity: 1,
      color: [0, 0, 0, 1]
    }
  },
  /**
   * Default stroke style options
   */
  DEFAULT_STROKE: {
    width: 5,
    opacity: 1,
    color: [250, 250, 250, 1]
  },
  /**
   * Default fill style options
   */
  DEFAULT_FILL: {
    opacity: 1,
    color: [0, 0, 0, 1]
  },
  /**
   * Default text style options
   * @see https://openlayers.org/en/v6.15.1/apidoc/module-ol_style_Text-Text.html
   */
  DEFAULT_TEXT: {
    font: "16px sans",
    textAlign: "left",
    stroke: {
      color: [250, 250, 250, 1],
      width: 5,
      opactity: 1
    },
    fill: {
      opacity: 1,
      color: [0, 0, 0, 1]
    }
    // offsetX
    // offsetY
    // placement
    // scale
    // rotation
    // justify
    // padding
  },
  /**
   * All styling tags
   * @function getListTags
   * @returns {Array} all styling tags
   * @example
   * "type", // type de geometrie
   * "fill",
   * "fill-opacity",
   * "stroke",
   * "stroke-opacity",
   * "stroke-width",
   * "circle-fill",
   * "circle-fill-opacity",
   * "circle-stroke",
   * "circle-stroke-opacity",
   * "circle-stroke-width",
   * "circle-radius",
   * "marker-symbol",
   * "marker-color",
   * "marker-size"
   */
  getListTags: function getListTags() {
    return ["type", "fill", "fill-opacity", "stroke", "stroke-opacity", "stroke-width", "circle-fill", "circle-fill-opacity", "circle-stroke", "circle-stroke-opacity", "circle-stroke-width", "circle-radius", "marker-symbol", "marker-color", "marker-size", "label-fill", "label-fill-opacity", "label-stroke", "label-stroke-width", "label-stroke-opacity", "label-font", "label-textAlign"];
  },
  /**
   * Transform feature properties to a native style
   *
   * @function defineStyleFromProperties
   * @param {*} feature - ...
   * @returns {*} style - ...
   * @public
   *
   * @description
   * A la lecture du format :
   * > tag styling ---> feature properties ---> feature style
   *
   * Les balises de 'styling' du fichier sont ajoutées dans les properties de chaque features
   * (opération native sous OpenLayers):
   *
   * Ex. avec le format GeoJSON :
   * ```json
   * "properties": {
   *    "stroke": "#000000",      -> feature.get("stroke");
   *    "stroke-width": 13,       -> feature.get("stroke-width");
   *    "stroke-opacity": 0.8,    -> feature.get("stroke-opacity");
   *    "fill": "#a03737",        -> feature.get("fill");
   *    "fill-opacity": 0.5       -> feature.get("fill-opacity");
   * }
   * ```
   *
   * Ensuite, les properties des features sont transformées dans le style natif :
   *
   * ```js
   * // Ex.
   * feature.setStyle(new Style({
   *  fill : new FillStyle({
   *      color : Color.hexToRgba(feature.get("fill"), feature.get("fill-opacity") || 1)
   *  }),
   *  stroke : new StrokeStyle({
   *      color : Color.hexToRgba(feature.get("stroke"), feature.get("stroke-opacity"))
   *      width : feature.get("stroke-width")
   *  })
   * }));
   * ```
   */
  defineStyleFromProperties: function defineStyleFromProperties(feature) {
    // style
    var style = null;

    // les options de styles définis dans le format
    var options = {};

    // properties :
    // "marker-size" -> icon
    // "marker-symbol" -> icon
    // "marker-color" -> icon
    var marker = null;
    if (feature.get("marker-color") || feature.get("marker-size") || feature.get("marker-symbol")) {
      marker = {};
      // icone par defaut
      marker["src"] = this.DEFAULT_ICON.src;
      marker["anchor"] = this.DEFAULT_ICON.anchor;
      var symbolMarker = feature.get("marker-symbol");
      if (symbolMarker) {
        if (symbolMarker.search("data:image/png;base64") !== -1) {
          // icone du portail
          marker["src"] = symbolMarker;
        } else {
          // TODO
          // utiliser les symboles de Maki
          // (cf. https://labs.mapbox.com/maki-icons/)
        }
      }
      var colorMarker = feature.get("marker-color");
      if (_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_0__["default"].isHex(colorMarker)) {
        marker["color"] = _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_0__["default"].hexToRgba(colorMarker, 1);
      }
      var size = feature.get("marker-size");
      if (size) {
        switch (size) {
          case "small":
            marker["scale"] = 0.5;
            break;
          case "medium":
            marker["scale"] = 1;
            break;
          case "large":
            marker["scale"] = 1.5;
            break;
          default:
            marker["scale"] = this.DEFAULT_ICON.scale;
            break;
        }
      }
    }

    // properties :
    // "stroke" -> line / polygon
    // "stroke-opacity" -> line / polygon
    // "stroke-width" -> line / polygon
    var stroke = null;
    if (feature.get("stroke") || feature.get("stroke-opacity") || feature.get("stroke-width")) {
      stroke = {};
      stroke["color"] = _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_0__["default"].hexToRgba(feature.get("stroke"), +feature.get("stroke-opacity") || this.DEFAULT_STROKE.opacity);
      stroke["width"] = +feature.get("stroke-width") || this.DEFAULT_STROKE.width;
    }

    // properties :
    // "fill" -> polygon
    // "fill-opacity" -> polygon
    var fill = null;
    if (feature.get("fill") || feature.get("fill-opacity")) {
      fill = {};
      fill["color"] = _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_0__["default"].hexToRgba(feature.get("fill"), +feature.get("fill-opacity") || this.DEFAULT_FILL.opacity);
    }

    // properties :
    // "label-fill",
    // "label-fill-opacity",
    // "label-stroke",
    // "label-stroke-width",
    // "label-stroke-opacity",
    // "label-font",
    // "label-textAlign"
    // "name" -> text
    var labelStroke = null;
    var labelFill = null;
    var isLabel = feature.get("name") !== "";
    if (isLabel) {
      if (feature.get("label-fill") || feature.get("label-fill-opacity")) {
        labelFill = {};
        labelFill["color"] = _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_0__["default"].hexToRgba(feature.get("label-fill"), +feature.get("label-fill-opacity") || this.DEFAULT_TEXT.fill.opacity);
      }
      if (feature.get("label-stroke") || feature.get("label-stroke-opacity") || feature.get("label-stroke-width")) {
        labelStroke = {};
        labelStroke["color"] = _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_0__["default"].hexToRgba(feature.get("label-stroke"), +feature.get("label-stroke-opacity") || this.DEFAULT_TEXT.stroke.opacity);
        labelStroke["width"] = +feature.get("label-stroke-width") || this.DEFAULT_TEXT.stroke.width;
      }
    }

    // properties :
    // "circle-fill"
    // "circle-stroke"
    // "circle-stroke-width"
    // "circle-radius"
    var circleRadius = feature.get("circle-radius") || this.DEFAULT_CIRCLE.radius;
    var circleStroke = null;
    if (feature.get("circle-stroke") || feature.get("circle-stroke-opacity") || feature.get("circle-stroke-width")) {
      circleStroke = {};
      circleStroke["color"] = _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_0__["default"].hexToRgba(feature.get("circle-stroke"), +feature.get("circle-stroke-opacity") || this.DEFAULT_CIRCLE.stroke.opacity);
      circleStroke["width"] = +feature.get("circle-stroke-width") || this.DEFAULT_CIRCLE.stroke.width;
    }
    var circleFill = null;
    if (feature.get("circle-fill") || feature.get("circle-fill-opacity")) {
      circleFill = {};
      circleFill["color"] = _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_0__["default"].hexToRgba(feature.get("circle-fill"), +feature.get("circle-fill-opacity") || this.DEFAULT_CIRCLE.fill.opacity);
    }

    // options du Style en fonction du type de geometrie
    var type = feature.getGeometry().getType();
    switch (type) {
      case "Circle":
      case "Point":
      case "MultiPoint":
        // Cercle
        var isCircle = false;
        var optionsCircle = {};
        if (circleStroke) {
          optionsCircle["stroke"] = new (ol_style_Stroke__WEBPACK_IMPORTED_MODULE_8___default())(circleStroke);
        }
        if (circleFill) {
          optionsCircle["fill"] = new (ol_style_Fill__WEBPACK_IMPORTED_MODULE_7___default())(circleFill);
        }
        if (Object.keys(optionsCircle).length !== 0) {
          isCircle = true;
          optionsCircle["radius"] = +circleRadius; // Conversion en nombre
          options["image"] = new (ol_style_Circle__WEBPACK_IMPORTED_MODULE_5___default())(optionsCircle);
        }
        // Ponctuel
        if (marker) {
          options["image"] = new (ol_style_Icon__WEBPACK_IMPORTED_MODULE_6___default())(marker);
        }
        // Label
        if (isLabel) {
          var optionsText = {};
          if (labelStroke) {
            optionsText["stroke"] = new (ol_style_Stroke__WEBPACK_IMPORTED_MODULE_8___default())(labelStroke);
          }
          if (labelFill) {
            optionsText["fill"] = new (ol_style_Fill__WEBPACK_IMPORTED_MODULE_7___default())(labelFill);
          }
          if (Object.keys(optionsText).length !== 0) {
            optionsText["text"] = feature.get("name");
            optionsText["textAlign"] = feature.get("label-textAlign") || this.DEFAULT_TEXT.textAlign;
            optionsText["font"] = feature.get("label-font") || this.DEFAULT_TEXT.font;
            options["text"] = new (ol_style_Text__WEBPACK_IMPORTED_MODULE_9___default())(Object.assign({}, this.DEFAULT_TEXT, optionsText));
          } else {
            // on applique un style par defaut sur le label
            // pour un marker ou un cercle
            if (marker || isCircle) {
              var styleText = new (ol_style_Text__WEBPACK_IMPORTED_MODULE_9___default())(Object.assign({}, this.DEFAULT_TEXT, {
                fill: new (ol_style_Fill__WEBPACK_IMPORTED_MODULE_7___default())(this.DEFAULT_TEXT.fill),
                stroke: new (ol_style_Stroke__WEBPACK_IMPORTED_MODULE_8___default())(this.DEFAULT_TEXT.stroke)
              }));
              if (styleText) {
                var cloneStyleText = styleText.clone();
                cloneStyleText.setText(feature.get("name"));
                options["text"] = cloneStyleText;
              }
            }
          }
        }
        break;
      case "Polygon":
      case "MultiPolygon":
        if (stroke) {
          options["stroke"] = new (ol_style_Stroke__WEBPACK_IMPORTED_MODULE_8___default())(stroke);
        }
        if (fill) {
          options["fill"] = new (ol_style_Fill__WEBPACK_IMPORTED_MODULE_7___default())(fill);
        }
        break;
      case "LineString":
      case "MultiLineString":
        if (stroke) {
          options["stroke"] = new (ol_style_Stroke__WEBPACK_IMPORTED_MODULE_8___default())(stroke);
        }
        if (this.APPLY_CONVERT_GEOM_GPX && fill) {
          // INFO
          // Lors d'une transformation de type de geometrie, le type est renseigné.
          // Pour le format GPX,
          // -> on transforme une surface vers ligne lors de l'écriture
          // -> on transforme une ligne vers une surface lors de la lecture si le type est précisé !
          var initType = feature.get("type");
          if (initType && (initType === "Polygon" || initType === "MultiPolygon")) {
            options["fill"] = new (ol_style_Fill__WEBPACK_IMPORTED_MODULE_7___default())(fill);
            var f = feature.clone();
            var ClassPoly = type === "LineString" ? (ol_geom_Polygon__WEBPACK_IMPORTED_MODULE_10___default()) : (ol_geom_MultiPolygon__WEBPACK_IMPORTED_MODULE_11___default());
            feature.setGeometry(new ClassPoly([f.getGeometry().getCoordinates()]));
          }
        }
        break;
      default:
        break;
    }

    // si aucun style disponible, on utilisera le style par defaut defini
    // par l'utilisateur ou l'application
    if (Object.keys(options).length !== 0) {
      style = new (ol_style_Style__WEBPACK_IMPORTED_MODULE_4___default())(options);
    }
    return style;
  },
  /**
   * Define a default style function to apply to a feature
   *
   * @function defineStyleFunctionByDefault
   * @param {Object} defaultStyle - ...
   * @returns {Function} style function
   * @public
   *
   * @description
   * ...
   */
  defineStyleFunctionByDefault: function defineStyleFunctionByDefault(defaultStyle) {
    if (!defaultStyle) {
      return [];
    }
    if (Object.keys(defaultStyle).length === 0) {
      return [];
    }

    // les styles par defaut
    var styleFunction = function styleFunction(feature, resolution) {
      var style = null;
      var type = feature.getGeometry().getType();
      switch (type) {
        case "Point":
        case "MultiPoint":
          // on n'a aucune information sur le type de style à appliquer sur un "Point" :
          // * label ou
          // * marker ou
          // * marker avec label
          // donc, c'est en fonction des styles par defaut...
          var opts = {};
          if (defaultStyle.getImage()) {
            opts["image"] = defaultStyle.getImage();
          }
          if (defaultStyle.getText() && feature.get("name")) {
            var styleText = defaultStyle.getText().clone();
            styleText.setText(feature.get("name"));
            opts["text"] = styleText;
          }
          style = new (ol_style_Style__WEBPACK_IMPORTED_MODULE_4___default())(opts);
          break;
        case "Circle":
          var optsc = {};
          var optsCircle = {};
          if (defaultStyle.getFill()) {
            optsCircle.fill = defaultStyle.getFill();
          }
          if (defaultStyle.getStroke()) {
            optsCircle.stroke = defaultStyle.getStroke();
          }
          if (defaultStyle.getText() && feature.get("name")) {
            var styleTextCircle = defaultStyle.getText().clone();
            styleTextCircle.setText(feature.get("name"));
            optsc.text = styleTextCircle;
          }
          if (Object.keys(optsCircle).length !== 0) {
            // FIXME param radius ?
            optsCircle.radius = 3;
            optsc.image = new (ol_style_Circle__WEBPACK_IMPORTED_MODULE_5___default())(optsCircle);
          }
          style = new (ol_style_Style__WEBPACK_IMPORTED_MODULE_4___default())(optsc);
          break;
        case "Polygon":
        case "MultiPolygon":
          var optsp = {};
          if (defaultStyle.getFill()) {
            optsp.fill = defaultStyle.getFill();
          }
          if (defaultStyle.getStroke()) {
            optsp.stroke = defaultStyle.getStroke();
          }
          style = new (ol_style_Style__WEBPACK_IMPORTED_MODULE_4___default())(optsp);
          break;
        case "LineString":
        case "LinearRing":
        case "MultiLineString":
          var optsl = {};
          if (defaultStyle.getStroke()) {
            optsl.stroke = defaultStyle.getStroke();
          }
          style = new (ol_style_Style__WEBPACK_IMPORTED_MODULE_4___default())(optsl);
          break;
      }
      return [style];
    };
    return styleFunction;
  },
  /**
   * Transform a native style to feature properties by type of geometry
   *
   * @todo not yet implemented !
   * @param {*} feature - feature
   */
  definePropertiesFromStyleByType: function definePropertiesFromStyleByType(feature) {
    var geomType = feature.getGeometry().getType();
    switch (geomType) {
      case "Point":
      case "MultiPoint":
        feature.setPropertyMarker();
        feature.setPropertyLabel();
        break;
      case "LineString":
      case "MultiLineString":
        feature.setPropertyStroke();
        break;
      case "Polygon":
      case "MultiPolygon":
        feature.setPropertyStroke();
        feature.setPropertyFill();
        break;
      default:
        break;
    }
  },
  /**
   * Transform a native style to feature properties
   *
   * @function definePropertiesFromStyle
   * @param {*} feature - ...
   * @public
   *
   * @description
   * A l'écriture du format.
   * > feature style --> feature properties --> tag styling
   *
   * Le style natif est récupéré pour chaque feature :
   *
   * ```js
   * // Ex.
   * var style = feature.getStyle();
   * ```
   *
   * Ensuite, le style natif est transformé en properties pour chaque feature :
   *
   * ```js
   * // Ex.
   * var stroke = style.getStroke();
   * var oColorStroke = Color.rgbaToHex(stroke.getColor());
   * feature.set("stroke", oColorStroke.hex); // #000000
   * feature.set("stroke-opacity", oColorStroke.opacity); // 0.8
   * ```
   *
   * Et, chaque properties des features sont ecrites dans le format du fichier
   * (opération native sous OpenLayers) :
   *
   * Ex. avec le format GeoJSON :
   * ```json
   * "properties": {
   *    "stroke": "#000000",
   *    "stroke-opacity": 0.8
   * }
   * ```
   */
  definePropertiesFromStyle: function definePropertiesFromStyle(feature) {
    var style = feature.getStyle() || feature.getStyleFunction();
    if (style) {
      // style ajouté via une fonction, pour les styles par defaut par ex.
      if (typeof style === "function") {
        var styles = style.call(this, feature, 0);
        if (styles && styles.length !== 0) {
          style = Array.isArray(styles) ? styles[0] : styles;
          feature.setStyle(style);
        } else {
          // au cas où...
          return;
        }
      }
      this.definePropertiesFromStyleByType(feature);
    }
  },
  /**
   * Transform a native style to tags 'styling' into the format
   *
   * @function defineTagFromStyle
   * @param {*} style - ...
   * @param {String} format - ...
   * @returns {String} tags stringify into the format (json / xml)
   * @todo
   * @public
   *
   * @description
   * A partir d'un style natif, on le transforme en balise de 'styling' dans le format demandé,
   * que l'on peut ensuite inserer dans le fichier.
   * > style ---> tag styling
   *
   */
  defineTagFromStyle: function defineTagFromStyle(style, format) {
    logger.trace("todo...");
    return null;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Styling);

/***/ }),

/***/ "./src/packages/Utils/ColorUtils.js":
/*!******************************************!*\
  !*** ./src/packages/Utils/ColorUtils.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @module ColorUtils
 * @alias module:~utils/ColorUtils
 * @description
 * ...
 *
 * @example
 * import ColorUtils from "gpf-ext-ol/utils/ColorUtils"
 * ou 
 * import {ColorUtils} from "gpf-ext-ol
 * 
 * ColorUtils.hex();
 * ColorUtils.num();
 * ColorUtils.arrayTorgba();
 * ColorUtils.arrayToHex();
 * ColorUtils.rgbaToHex();
 * ColorUtils.hexToRgba();
 * ColorUtils.isHex();
 * ColorUtils.isRGB();
 */
var ColorUtils = {
  /**
   * Number to hex conversion
   *
   * @param {Number} number - 0-255
   * @returns {String} hex value
   */
  hex: function hex(number) {
    if (number > 255) {
      throw new Error("'" + number + "'' is greater than 255(0xff);");
    }
    var str = Number(number).toString(16);
    return ("0" + str).slice(-2);
  },
  /**
   * Hexa to number conversion
   *
   * @param {*} hexa 00-FF
   * @returns {Number} number value
   */
  num: function num(hexa) {
    return parseInt(hexa, 16);
  },
  /**
   * Converts an array ([255,255,255,1]) to rgba string
   *
   * @function arrayToRgba
   * @param {Array} values - array of values
   * @returns {String} A color of RGB or RGBA format
   */
  arrayToRgba: function arrayToRgba(values) {
    if (!Array.isArray(values)) {
      throw new Error("Not an array !");
    }
    var red = values[0];
    var green = values[1];
    var blue = values[2];
    var alpha = values[3] || 1;
    var result = "rgba(" + red + ", " + green + ", " + blue + ", " + parseFloat(alpha) + ")";
    return result;
  },
  /**
   * Converts an array ([255,255,255,1]) to #RRGGBBAA
   *
   * @function arrayToHex
   * @param {Array} values - array of values
   * @returns {Object}  hex and opacity formated values
   */
  arrayToHex: function arrayToHex(values) {
    if (!Array.isArray(values)) {
      throw new Error("Not an array !");
    }
    var red = values[0];
    var green = values[1];
    var blue = values[2];
    var alpha = values[3];
    var elems = [this.hex(red), this.hex(green), this.hex(blue)];
    var result = {};
    result.hex = "#" + elems.join("");
    if (alpha) {
      // elems.push(hex(alpha));
      result.opacity = parseFloat(alpha);
    }
    return result;
  },
  /**
   * Converts rgba string to #RRGGBBAA
   * (Code adapted from : https://gist.github.com/mstssk/afda4ce9e5c335fd79cd)
   *
   * @function rgbaToHex
   * @param {String} rgba - A color of RGB or RGBA format.
   * @returns {Object} hex and opacity formated values
   */
  rgbaToHex: function rgbaToHex(rgba) {
    var regex = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(0?.?\d+)\s*)?\)/;
    var parsed = regex.exec(rgba);
    if (!parsed) {
      throw new Error("Invalid format: " + rgba);
    }
    var red = parsed[1];
    var green = parsed[2];
    var blue = parsed[3];
    var alpha = parsed[4];
    var elems = [this.hex(red), this.hex(green), this.hex(blue)];
    var result = {};
    result.hex = "#" + elems.join("");
    if (alpha) {
      // elems.push(hex(alpha));
      result.opacity = parseFloat(alpha);
    }
    return result;
  },
  /**
   * Converts hex color and opacity value to rgba string.
   * (Code adapted from : http://stackoverflow.com/a/5624139)
   *
   * @function hexToRgba
   * @param {String} hex - A color value on RGB format (hexa).
   * @param {Number} opacity - A opacity value.
   * @returns {String} A color of RGB or RGBA format
   */
  hexToRgba: function hexToRgba(hex, opacity) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    if (!hex) {
      throw new Error("Invalid format");
    }
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });
    var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    rgb = rgb ? {
      r: parseInt(rgb[1], 16),
      g: parseInt(rgb[2], 16),
      b: parseInt(rgb[3], 16)
    } : null;
    var result = rgb ? "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + opacity + ")" : null;
    return result;
  },
  /**
   * Determine if value is a correct hexa color.
   * @param {*} value - hex color (#FFFFFF)
   * @returns {Boolean} True if value is a hexa color
   */
  isHex: function isHex(value) {
    if (!value) {
      return false;
    }
    if (value.charAt(0) !== "#") {
      return false;
    }
    var regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    var parsed = regex.exec(value);
    if (!parsed) {
      return false;
    }
    return true;
  },
  /**
   * Determine if value is a correct rgba color.
   * @param {*} value - rgba color (rgba(125,125,125,1))
   * @returns {Boolean} True if value is a rgba color
   */
  isRGB: function isRGB(value) {
    if (!value) {
      return false;
    }
    var regex = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(0?.?\d+)\s*)?\)/;
    var parsed = regex.exec(value);
    if (!parsed) {
      return false;
    }
    return true;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ColorUtils);

/***/ }),

/***/ "./src/packages/Utils/Draggable.js":
/*!*****************************************!*\
  !*** ./src/packages/Utils/Draggable.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LoggerByDefault */ "./src/packages/Utils/LoggerByDefault.js");

var logger = _LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__["default"].getLogger("draggable");

/**
 * @module Draggable
 * @alias module:~utils/Draggable
 * @fixme conflit entre la position et le mode draggable
 * @private
 * @description
 * ...
 *
 * @example
 * dragElement();
 */
var Draggable = {
  /**
  * A draggable HTML element with JavaScript and CSS.
  *
  * @function dragElement
  * @param {DOMElement} element - element
  * @param {DOMElement} header - header (optional)
  * @param {DOMElement} container - container (optional)
  * @see https://www.w3schools.com/howto/howto_js_draggable.asp
  * @see https://stackoverflow.com/questions/52231588/how-to-constrain-div-drag-space-no-jquery
  * @example
  *   // CSS :
  *       // #element { position: absolute; }
  *   // HTML :
  *       // <div id="container">
  *       //   <div id="element">
  *       //     <div id="header"/>
  *       //      <div/> ...
  *       //     </div>
  *       //   </div>
  *       // </div>
  *   // JS :
  *       var element = document.getElementById("element");
  *       Draggable.dragElement(element, header, container);
  */
  dragElement: function dragElement(element, header, container) {
    var offsetX, offsetY;
    var isDragReady = false;
    var dragoffset = {
      x: 0,
      y: 0
    };
    if (header) {
      header.addEventListener("mousedown", dragMouseDown, true);
    } else {
      element.addEventListener("mousedown", dragMouseDown, true);
    }

    // TODO mettre en place les contraintes
    // var constraints = {};
    // if (container) {
    //     constraints = {
    //         width : container.clientWidth,
    //         height : container.clientHeight,
    //         top : container.offsetTop,
    //         left : container.offsetLeft
    //     };
    // }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      isDragReady = true;

      // get the mouse cursor position at startup
      e._pageX = e._pageX || e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
      e._pageY = e._pageY || e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
      dragoffset.x = e._pageX - element.offsetLeft;
      dragoffset.y = e._pageY - element.offsetTop;
      document.addEventListener("mouseup", closeDragElement, true);
      document.addEventListener("mousemove", elementDrag, true);
    }
    function closeDragElement() {
      /* stop moving when mouse button is released: */
      isDragReady = false;
      document.removeEventListener("mouseup", closeDragElement, true);
      document.removeEventListener("mousemove", elementDrag, true);
    }
    function elementDrag(e) {
      e = e || window.event;
      // e.preventDefault();

      // cf. https://jsfiddle.net/nbbg08mg/2/
      if (isDragReady) {
        e._pageX = e._pageX || e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
        e._pageY = e._pageY || e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
        var parentLeft = container ? container.offsetLeft : element.parentElement.offsetLeft;
        var parentTop = container ? container.offsetTop : element.parentElement.parentElement.offsetTop; // hack pas jolie !
        logger.trace("parent offset", parentLeft, parentTop);

        // left/right constraint
        if (e._pageX - dragoffset.x < 0 - parentLeft) {
          offsetX = 0 - parentLeft;
        } else if (e._pageX - dragoffset.x + element.clientWidth > document.body.clientWidth) {
          offsetX = document.body.clientWidth - element.clientWidth;
        } else {
          offsetX = e._pageX - dragoffset.x;
        }
        logger.trace("left/right constraint", offsetX);

        // top/bottom constraint
        if (e._pageY - dragoffset.y < 0 - parentTop) {
          offsetY = 0 - parentTop;
        } else if (e._pageY - dragoffset.y + element.clientHeight > document.body.clientHeight) {
          offsetY = document.body.clientHeight - element.clientHeight;
        } else {
          offsetY = e._pageY - dragoffset.y;
        }
        logger.trace("top/bottom constraint", offsetY);

        // set the element's new position:
        element.style.top = offsetY + "px";
        element.style.bottom = "unset";
        element.style.left = offsetX + "px";
        element.style.right = "unset";
      }
    }
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Draggable);

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

/***/ "./src/packages/Utils/Parser.js":
/*!**************************************!*\
  !*** ./src/packages/Utils/Parser.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LoggerByDefault */ "./src/packages/Utils/LoggerByDefault.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }

var logger = _LoggerByDefault__WEBPACK_IMPORTED_MODULE_0__["default"].getLogger("parser");

/**
* @module Parser
* @alias module:~utils/Parser
* @description
* ...
*
* @example
* parse();
* toString();
*/
var Parser = {
  /**
   * ...
   *
   * @param {String} xml - XML string
   * @returns {DOMElement} doc
   */
  parse: function parse(xml) {
    var doc = null;
    var parser = null;
    var scope = typeof window !== "undefined" ? window : null;
    if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && window === null) {
      // code for nodejs
      var DOMParser = (__webpack_require__(/*! xmldom */ "xmldom").DOMParser);
      parser = new DOMParser();
      doc = parser.parseFromString(xml, "text/xml");
    } else if (scope.DOMParser) {
      // code for modern browsers
      parser = new scope.DOMParser();
      doc = parser.parseFromString(xml, "text/xml");
    } else if (scope.ActiveXObject) {
      // code for old IE browsers
      doc = new scope.ActiveXObject("Microsoft.XMLDOM");
      doc.async = false;
      doc.loadXML(xml);
    } else {
      logger.log("Incompatible environment for DOM Parser !");
    }
    var errorNode = doc.querySelector("parsererror");
    if (errorNode) {
      // INFO parsing failed
      // eslint-disable-next-line no-console
      console.error(errorNode);
      return null;
    }
    logger.trace(doc);
    return doc;
  },
  /**
   * ...
   *
   * @param {DOMElement} doc - doc
   * @returns {String} XML string
   */
  toString: function toString(doc) {
    // TODO
    // try catch pour les exceptions !
    // cf. https://developer.mozilla.org/en-US/docs/Web/API/XMLSerializer/serializeToString
    var oSerializer = new XMLSerializer();
    var xml = oSerializer.serializeToString(doc);
    logger.trace(xml);
    return xml;
  },
  /**
   * ...
   * cf. https://stackoverflow.com/questions/376373/pretty-printing-xml-with-javascript/
   *
   * @param {String} xml - XML string
   * @returns {String} XML string formatted
   */
  format: function format(xml) {
    var reg = /(>)\s*(<)(\/*)/g; // updated Mar 30, 2015
    var wsexp = / *(.*) +\n/g;
    var contexp = /(<.+>)(.+\n)/g;
    xml = xml.replace(reg, "$1\n$2$3").replace(wsexp, "$1\n").replace(contexp, "$1\n$2");
    var formatted = "";
    var lines = xml.split("\n");
    var indent = 0;
    var lastType = "other";
    // 4 types of tags - single, closing, opening, other (text, doctype, comment) - 4*4 = 16 transitions
    var transitions = {
      "single->single": 0,
      "single->closing": -1,
      "single->opening": 0,
      "single->other": 0,
      "closing->single": 0,
      "closing->closing": -1,
      "closing->opening": 0,
      "closing->other": 0,
      "opening->single": 1,
      "opening->closing": 0,
      "opening->opening": 1,
      "opening->other": 1,
      "other->single": 0,
      "other->closing": -1,
      "other->opening": 0,
      "other->other": 0
    };
    for (var i = 0; i < lines.length; i++) {
      var ln = lines[i];
      var single = Boolean(ln.match(/<.+\/>/)); // is this line a single tag? ex. <br />
      var closing = Boolean(ln.match(/<\/.+>/)); // is this a closing tag? ex. </a>
      var opening = Boolean(ln.match(/<[^!].*>/)); // is this even a tag (that's not <!something>)
      var type = single ? "single" : closing ? "closing" : opening ? "opening" : "other";
      var fromTo = lastType + "->" + type;
      lastType = type;
      var padding = "";
      indent += transitions[fromTo];
      for (var j = 0; j < indent; j++) {
        padding += "\t";
      }
      if (fromTo === "opening->closing") {
        formatted = formatted.substr(0, formatted.length - 1) + ln + "\n"; // substr removes line break (\n) from prev loop
      } else {
        formatted += padding + ln + "\n";
      }
    }
    logger.trace(formatted);
    return formatted;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Parser);

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

/***/ "./src/packages/CSS/Controls/Drawing/GPFdrawing.css":
/*!**********************************************************!*\
  !*** ./src/packages/CSS/Controls/Drawing/GPFdrawing.css ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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

/***/ "ol/Collection":
/*!********************************!*\
  !*** external "ol.Collection" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = ol.Collection;

/***/ }),

/***/ "ol/Feature":
/*!*****************************!*\
  !*** external "ol.Feature" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = ol.Feature;

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

/***/ "ol/events/condition":
/*!**************************************!*\
  !*** external "ol.events.condition" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = ol.events.condition;

/***/ }),

/***/ "ol/extent":
/*!****************************!*\
  !*** external "ol.extent" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = ol.extent;

/***/ }),

/***/ "ol/format/GPX":
/*!********************************!*\
  !*** external "ol.format.GPX" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = ol.format.GPX;

/***/ }),

/***/ "ol/format/GeoJSON":
/*!************************************!*\
  !*** external "ol.format.GeoJSON" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = ol.format.GeoJSON;

/***/ }),

/***/ "ol/format/KML":
/*!********************************!*\
  !*** external "ol.format.KML" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = ol.format.KML;

/***/ }),

/***/ "ol/geom":
/*!**************************!*\
  !*** external "ol.geom" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = ol.geom;

/***/ }),

/***/ "ol/geom/LineString":
/*!*************************************!*\
  !*** external "ol.geom.LineString" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = ol.geom.LineString;

/***/ }),

/***/ "ol/geom/MultiLineString":
/*!******************************************!*\
  !*** external "ol.geom.MultiLineString" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = ol.geom.MultiLineString;

/***/ }),

/***/ "ol/geom/MultiPolygon":
/*!***************************************!*\
  !*** external "ol.geom.MultiPolygon" ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = ol.geom.MultiPolygon;

/***/ }),

/***/ "ol/geom/Polygon":
/*!**********************************!*\
  !*** external "ol.geom.Polygon" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = ol.geom.Polygon;

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

/***/ "ol/proj":
/*!**************************!*\
  !*** external "ol.proj" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = ol.proj;

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

/***/ }),

/***/ "ol/style/Circle":
/*!**********************************!*\
  !*** external "ol.style.Circle" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = ol.style.Circle;

/***/ }),

/***/ "ol/style/Fill":
/*!********************************!*\
  !*** external "ol.style.Fill" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = ol.style.Fill;

/***/ }),

/***/ "ol/style/Icon":
/*!********************************!*\
  !*** external "ol.style.Icon" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = ol.style.Icon;

/***/ }),

/***/ "ol/style/Stroke":
/*!**********************************!*\
  !*** external "ol.style.Stroke" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = ol.style.Stroke;

/***/ }),

/***/ "ol/style/Style":
/*!*********************************!*\
  !*** external "ol.style.Style" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = ol.style.Style;

/***/ }),

/***/ "ol/style/Text":
/*!********************************!*\
  !*** external "ol.style.Text" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = ol.style.Text;

/***/ }),

/***/ "xmldom":
/*!***************************************************************************!*\
  !*** external {"commonjs2":"xmldom","commonjs":"xmldom","amd":"require"} ***!
  \***************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = undefined;

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
/*!**************************************************!*\
  !*** ./src/packages/Controls/Drawing/Drawing.js ***!
  \**************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CSS_Controls_Drawing_GPFdrawing_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../CSS/Controls/Drawing/GPFdrawing.css */ "./src/packages/CSS/Controls/Drawing/GPFdrawing.css");
/* harmony import */ var _Control__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Control */ "./src/packages/Controls/Control.js");
/* harmony import */ var ol_Observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/Observable */ "ol/Observable");
/* harmony import */ var ol_Observable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ol_Observable__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ol_Collection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/Collection */ "ol/Collection");
/* harmony import */ var ol_Collection__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ol_Collection__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var ol_Overlay__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/Overlay */ "ol/Overlay");
/* harmony import */ var ol_Overlay__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ol_Overlay__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var ol_proj__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/proj */ "ol/proj");
/* harmony import */ var ol_proj__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ol_proj__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var ol_source_Vector__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/source/Vector */ "ol/source/Vector");
/* harmony import */ var ol_source_Vector__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ol_source_Vector__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var ol_layer_Vector__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/layer/Vector */ "ol/layer/Vector");
/* harmony import */ var ol_layer_Vector__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(ol_layer_Vector__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var ol_style__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/style */ "ol/style");
/* harmony import */ var ol_style__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(ol_style__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var ol_geom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/geom */ "ol/geom");
/* harmony import */ var ol_geom__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(ol_geom__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var ol_interaction__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/interaction */ "ol/interaction");
/* harmony import */ var ol_interaction__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(ol_interaction__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var ol_events_condition__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/events/condition */ "ol/events/condition");
/* harmony import */ var ol_events_condition__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(ol_events_condition__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var ol_sphere__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/sphere */ "ol/sphere");
/* harmony import */ var ol_sphere__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(ol_sphere__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../Utils/LoggerByDefault */ "./src/packages/Utils/LoggerByDefault.js");
/* harmony import */ var _Utils_Interactions__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../Utils/Interactions */ "./src/packages/Controls/Utils/Interactions.js");
/* harmony import */ var _Utils_MarkersOther__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../Utils/MarkersOther */ "./src/packages/Controls/Utils/MarkersOther.js");
/* harmony import */ var _Utils_Draggable__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../Utils/Draggable */ "./src/packages/Utils/Draggable.js");
/* harmony import */ var _Utils_SelectorID__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../Utils/SelectorID */ "./src/packages/Utils/SelectorID.js");
/* harmony import */ var _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../Utils/ColorUtils */ "./src/packages/Utils/ColorUtils.js");
/* harmony import */ var _DrawingDOM__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./DrawingDOM */ "./src/packages/Controls/Drawing/DrawingDOM.js");
/* harmony import */ var _Formats_KML__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../Formats/KML */ "./src/packages/Formats/KML.js");
/* harmony import */ var _Formats_GeoJSON__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../Formats/GeoJSON */ "./src/packages/Formats/GeoJSON.js");
/* harmony import */ var _Formats_GPX__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../Formats/GPX */ "./src/packages/Formats/GPX.js");
/* harmony import */ var _LayerSwitcher_LayerSwitcher__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../LayerSwitcher/LayerSwitcher */ "./src/packages/Controls/LayerSwitcher/LayerSwitcher.js");
var _Drawing;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// import CSS

// import "../../CSS/Controls/Drawing/GPFdrawingStyle.css";
// import OpenLayers
// import Control from "ol/control/Control";












// import local






// DOM

// import local with ol dependencies




var logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_13__["default"].getLogger("Drawing");

/**
 * @classdesc
 *
 * Drawing Control.
 *
 * @constructor
 * @alias ol.control.Drawing
 * @type {ol.control.Drawing}
 * @extends {ol.control.Control}
 * @param {Object} options - options for function call.
 * @param {Boolean} [options.collapsed = true] - Specify if Drawing control should be collapsed at startup. Default is true.
 * @param {Boolean} [options.draggable = false] - Specify if widget is draggable
 * @param {Object} [options.layer = {}] - Openlayers layer that will hosts created features. If none, an empty vector layer will be created.
 * @param {Object} [options.popup = {}] - Popup informations
 * @param {Boolean} [options.popup.display = true] - Specify if popup is displayed when create a drawing
 * @param {Function} [options.popup.function] - Function to display popup informations if you want to cutomise it. You may also provide your own function with params : {geomType / feature / saveFunc(message) / closeFunc()}. This function must return the DOM object of the popup content.
 * @param {Object} [options.layerDescription = {}] - Layer informations to be displayed in LayerSwitcher widget (only if a LayerSwitcher is also added to the map)
 * @param {String} [options.layerDescription.title = "Croquis"] - Layer title to be displayed in LayerSwitcher
 * @param {String} [options.layerDescription.description = "Mon croquis"] - Layer description to be displayed in LayerSwitcher
 * @param {Object} options.tools - Tools to display in the drawing toolbox. All by default.
 * @param {Boolean} [options.tools.points = true] - Display points drawing tool
 * @param {Boolean} [options.tools.lines = true] - Display lines drawing tool
 * @param {Boolean} [options.tools.polygons = true] - Display polygons drawing tool
 * @param {Boolean} [options.tools.holes = false] - Display polygons with holes drawing tool
 * @param {Boolean} [options.tools.text = true] - Display text drawing tool
 * @param {Boolean} [options.tools.remove = true] - Display feature removing tool
 * @param {Boolean} [options.tools.display = true] - Display style editing tool
 * @param {Boolean} [options.tools.tooltip = true] - Display text editing tool
 * @param {Boolean} [options.tools.edit = true] - Display editing tool
 * @param {Boolean} [options.tools.export = true] - Display exporting tool
 * @param {Boolean} [options.tools.measure = false] - Display measure drawing into popup info
 * @param {String} [options.labels] - Labels for Control
 * @param {String} [options.labels.control] - Label for Control
 * @param {String} [options.labels.points] - Label for points drawing tool
 * @param {String} [options.labels.lines] - Label for lines drawing tool
 * @param {String} [options.labels.polygons] - Label for polygons drawing tool
 * @param {String} [options.labels.holes] - Label for polygons with holes drawing tool
 * @param {String} [options.labels.text] - Label for text drawing tool
 * @param {String} [options.labels.edit] - Label for editing tool
 * @param {String} [options.labels.display] - Label for style editing tool
 * @param {String} [options.labels.tooltip] - Label for text editing tool
 * @param {String} [options.labels.remove] - Label for feature removing tool
 * @param {String} [options.labels.export] - Label for exporting tool.
 * @param {String} [options.labels.exportTitle] - Title for exporting tool.
 * @param {String} [options.labels.applyToObject] - Label for apply to object button.
 * @param {String} [options.labels.saveDescription] - Label for save description button.
 * @param {String} [options.labels.setAsDefault] - Label for set as default style button.
 * @param {String} [options.labels.strokeColor] - Label for stroke color.
 * @param {String} [options.labels.strokeWidth] - Label for stroke width.
 * @param {String} [options.labels.fillColor] - Label for fill color.
 * @param {String} [options.labels.fillOpacity] - Label for fillOpacity.
 * @param {String} [options.labels.markerSize] - Label for markerSize.
 * @param {Array.<Object>} [options.markersList = [{"src" : "data:image/png;base64,xxxx", "anchor" : [0.5,1]}]] - List of markers src to be used for points with their anchor offsets See {@link http://openlayers.org/en/latest/apidoc/ol.style.Icon.html OpenLayers params} for anchor offset options.
 * @param {Object} options.defaultStyles - Default styles applying to geometries (labels, lines and polygons).
 * @param {String} [options.defaultStyles.textFillColor = "#000000"] - Text fill color for labels (RGB hex value).
 * @param {String} [options.defaultStyles.textStrokeColor = "#FFFFFF"] - Text surrounding color for labels (RGB hex value).
 * @param {String} [options.defaultStyles.strokeColor = "#ffcc33"] - Stroke color (RGB hex value).
 * @param {Number} [options.defaultStyles.strokeWidth = 2] - Stroke width in pixels.
 * @param {String} [options.defaultStyles.polyStrokeColor = "#ffcc33"] - Stroke color (RGB hex value) for polygons.
 * @param {Number} [options.defaultStyles.polyStrokeWidth = 2] - Stroke width in pixels for polygons.
 * @param {String} [options.defaultStyles.polyFillColor = "#ffffff"] - Polygons fill color (RGB hex value).
 * @param {Number} [options.defaultStyles.polyFillOpacity = 0.2] - Polygon fill opacity (alpha value between 0:transparent and 1:opaque).
 * @param {Object} options.cursorStyle - cursor (circle) style when drawing or editing.
 * @param {String} [options.cursorStyle.fillColor = "rgba(0, 153, 255, 1)"] - Cursor fill color.
 * @param {String} [options.cursorStyle.strokeColor = "#FFF"] - Cursor stroke color.
 * @param {String} [options.cursorStyle.strokeWidth = 1] - Cursor surrounding stroke width.
 * @param {String} [options.cursorStyle.radius = 6] - Cursor radius.
 * @example
 * var drawing = new ol.control.Drawing({
 *   collapsed : false,
 *   draggable : true,
 *   layerswitcher : {
 *      title : "Dessins",
 *      description : "Mes dessins..."
 *   },
 *   markersList : [{
 *      src : "http://api.ign.fr/api/images/api/markers/marker_01.png",
 *      anchor : [0.5, 1]
 *   }],
 *   defaultStyles : {},
 *   cursorStyle : {},
 *   tools : {
 *      points : true,
 *      lines : true,
 *      polygons :true,
 *      holes : true,
 *      text : false,
 *      remove : true,
 *      display : true,
 *      tooltip : true,
 *      export : true,
 *      measure : true
 *   },
 *   popup : {
 *      display : true,
 *      function : function (params) {
 *          var container = document.createElement("div");
 *          // - params.geomType;
 *          // - params.feature;
 *          // Les 2 fonctions ferment la popup avec ou sans sauvegarde des informations
 *          // dans les properties de la feature (key : description)
 *          // - params.saveFunc(message);
 *          // - params.closeFunc();
 *          return container;
 *      }
 * });
 */
var Drawing = (_Drawing = /*#__PURE__*/function (_Control) {
  /**
   * See {@link ol.control.Drawing}
   * @module Drawing
   * @alias module:~controls/Drawing
   * @param {*} options - options
   * @example
   * import Drawing from "gpf-ext-ol/controls/Drawing"
   * ou 
   * import { Drawing } from "gpf-ext-ol"
   */
  function Drawing(options) {
    var _this;
    _classCallCheck(this, Drawing);
    options = options || {};

    // call ol.control.Control constructor
    _this = _callSuper(this, Drawing, [{
      element: options.element,
      target: options.target,
      render: options.render
    }]);
    if (!(_this instanceof Drawing)) {
      throw new TypeError("ERROR CLASS_CONSTRUCTOR");
    }
    _this._initialize(options);

    // init control DOM container
    _this._container = _this._initContainer();

    // ajout du container
    _this.element ? _this.element.appendChild(_this._container) : _this.element = _this._container;
    return _possibleConstructorReturn(_this, _this);
  }

  /**
   * Default tools to display for widget
   *
   * @private
   */
  _inherits(Drawing, _Control);
  return _createClass(Drawing, [{
    key: "setMap",
    value:
    /**
     * Overload of {@link http://openlayers.org/en/latest/apidoc/ol.control.Control.html#setMap ol.control.Control.setMap()} method, called when control is added to or removed from map.
     *
     * @param {Object} map - {@link http://openlayers.org/en/latest/apidoc/ol.Map.html ol.Map} object.
     */
    function setMap(map) {
      var _this2 = this;
      // call original setMap method
      _get(_getPrototypeOf(Drawing.prototype), "setMap", this).call(this, map);
      if (this.getMap() && this.eventKey) {
        (0,ol_Observable__WEBPACK_IMPORTED_MODULE_2__.unByKey)(this.eventKey);
      }

      // nothing else to do if map == null
      if (map == null) {
        return;
      }

      // position
      if (this.options.position) {
        this.setPosition(this.options.position);
      }

      // mode "draggable"
      if (this.draggable) {
        _Utils_Draggable__WEBPACK_IMPORTED_MODULE_16__["default"].dragElement(this._drawingPanel, this._drawingPanelHeader, this.options.position ? null : map.getTargetElement());
      }

      // mode "collapsed"
      if (!this.collapsed) {
        this._showDrawingButton.setAttribute("aria-pressed", true);
      }
      if (this.layer) {
        // ajout du layer de dessin à la carte s'il n'y est pas déjà
        this.setLayer(this.layer);
      }

      // gestion des suppressions "externes" de la couche de dessin.
      this.eventKey = this.getMap().getLayers().on("remove", function (evtRm) {
        if (evtRm.element === _this2.layer) {
          // FIXME object comparison
          // found layer removed.
          _this2.layer = null;
          // on supprime l'interaction en cours si besoin
          if (_this2.interactionCurrent) {
            _this2.getMap().removeInteraction(_this2.interactionCurrent);
            _this2.interactionCurrent = null;
          }
        }
      });
    }

    /**
     * Export features of current drawing layer (KML by default).
     *
     * @returns {String} a representation of drawn features (KML, GPX or GeoJSON) or null if not possible.
     */
  }, {
    key: "exportFeatures",
    value: function exportFeatures() {
      var result = null;
      if (_Control__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.getMap.call(this) == null) {
        logger.log("Impossible to export : control isn't attached to any map.");
        return result;
      }
      if (!this.layer) {
        logger.log("Impossible to export : no layer is hosting features.");
        return result;
      }
      if (!this.layer.getSource() || !this.layer.getSource().getFeatures() || !this.layer.getSource().getFeatures().length) {
        logger.log("Impossible to export : no features found.");
        return result;
      }

      // on invalide les features...
      if (this.featuresCollectionSelected) {
        this.featuresCollectionSelected.clear();
      }
      var ClassName = null;
      switch (this.getExportFormat()) {
        case "KML":
          ClassName = new _Formats_KML__WEBPACK_IMPORTED_MODULE_20__["default"]({
            writeStyles: true
          });
          break;
        case "GPX":
          ClassName = new _Formats_GPX__WEBPACK_IMPORTED_MODULE_22__["default"]({
            // readExtensions : function (ext) {/* only extensions nodes from wpt, rte and trk can be processed */ }
          });
          break;
        case "GEOJSON":
          ClassName = new _Formats_GeoJSON__WEBPACK_IMPORTED_MODULE_21__["default"]({});
          break;
        default:
          break;
      }
      if (!ClassName) {
        logger.log("Impossible to export : format unknown !?");
        return result;
      }
      var featProj = this.layer.getSource().getProjection();
      featProj = featProj || this.getMap().getView().getProjection();
      result = ClassName.writeFeatures(this.layer.getSource().getFeatures(), {
        dataProjection: "EPSG:4326",
        featureProjection: featProj
      });
      return result;
    }

    // ################################################################### //
    // #################### user interface methods ####################### //
    // ################################################################### //

    /**
     * Collapse or display control main container
     *
     * @param {Boolean} collapsed - True to collapse control, False to display it
     */
  }, {
    key: "setCollapsed",
    value: function setCollapsed(collapsed) {
      if (collapsed === undefined) {
        logger.error("[ERROR] Drawing:setCollapsed - missing collapsed parameter");
        return;
      }
      if (collapsed && this.collapsed || !collapsed && !this.collapsed) {
        return;
      }
      // on simule l'ouverture du panneau après un click
      this.onShowDrawingClick();
      this._showDrawingButton.click();
    }

    /**
     * Setter for Export Name.
     *
     * @param {String} name - Export Name. By default, "Croquis".
     */
  }, {
    key: "setExportName",
    value: function setExportName(name) {
      this._exportName = name;
    }

    /**
     * getter for Export Name.
     *
     * @returns {String} export name
     */
  }, {
    key: "getExportName",
    value: function getExportName() {
      return this._exportName;
    }

    /**
     * Setter for Export format (KML, GPX or GeoJSON).
     *
     * @param {String} format - Export format. By default, "KML".
     */
  }, {
    key: "setExportFormat",
    value: function setExportFormat(format) {
      this._exportFormat = format ? format.toUpperCase() : "KML";
      switch (format.toUpperCase()) {
        case "KML":
          this._exportExt = ".kml";
          this._exportMimeType = "application/vnd.google-earth.kml+xml";
          break;
        case "GPX":
          this._exportExt = ".gpx";
          this._exportMimeType = "application/gpx+xml";
          break;
        case "GEOJSON":
          this._exportExt = ".geojson";
          this._exportMimeType = "application/geo+json";
          break;
        default:
          // redefine format by default !
          this._exportFormat = "KML";
          break;
      }
    }

    /**
     * getter for Export format.
     *
     * @returns {String} export format
     */
  }, {
    key: "getExportFormat",
    value: function getExportFormat() {
      return this._exportFormat;
    }

    /**
     * Sets vector layer to hosts feature.
     *
     * @param {ol.layer.Vector} vlayer - vector layer
     */
  }, {
    key: "setLayer",
    value: function setLayer(vlayer) {
      var _this3 = this;
      if (!vlayer) {
        this.layer = null;
        return;
      }
      if (!(vlayer instanceof (ol_layer_Vector__WEBPACK_IMPORTED_MODULE_7___default()))) {
        logger.log("no valid layer given for hosting drawn features.");
        return;
      }

      // ajout du layer de dessin à la carte s'il n'y est pas déjà
      var layers = this.getMap().getLayers();
      if (layers) {
        var found = false;
        layers.forEach(function (mapLayer) {
          if (mapLayer === vlayer) {
            logger.trace("layer already in map. Not adding.");
            found = true;
          }
        });
        // si le layer n'est pas sur la carte, on l'ajoute.
        if (!found) {
          this.getMap().addLayer(vlayer);
        }
        // style par defaut !
        // application des styles ainsi que ceux par defaut de ol sur le layer
        vlayer.getSource().getFeatures().forEach(function (feature) {
          var style = feature.getStyle();
          if (typeof style !== "function") {
            return;
          }
          var featureStyleFunction = feature.getStyleFunction();
          if (featureStyleFunction) {
            var styles = featureStyleFunction.call(_this3, feature, 0);
            if (styles && styles.length !== 0) {
              feature.setStyle(Array.isArray(styles) ? styles[0] : styles);
            }
          }
        });
        this.layer = vlayer;

        // Si un layer switcher est présent dans la carte, on lui affecte des informations pour cette couche
        this.getMap().getControls().forEach(function (control) {
          if (control instanceof _LayerSwitcher_LayerSwitcher__WEBPACK_IMPORTED_MODULE_23__["default"]) {
            // un layer switcher est présent dans la carte
            var layerId = _this3.layer.gpLayerId;
            // on n'ajoute des informations que s'il n'y en a pas déjà (si le titre est le numéro par défaut)
            if (control._layers[layerId].title === layerId) {
              control.addLayer(_this3.layer, {
                title: _this3.options.layerDescription.title,
                description: _this3.options.layerDescription.description
              });
            }
          }
        });
      }
    }

    /**
     * Get vector layer
     *
     * @returns {Object} layer - isocurve layer
     */
  }, {
    key: "getLayer",
    value: function getLayer() {
      return this.layer;
    }

    /**
     * Get container
     *
     * @returns {DOMElement} container
     */
  }, {
    key: "getContainer",
    value: function getContainer() {
      return this._container;
    }

    // ################################################################### //
    // ######################## initialize control ####################### //
    // ################################################################### //

    /**
     * Gets marker options in options.markersList given its src.
     *
     * @param {String} src - marker image URI,
     * @returns {Object} markers options
     * @private
     */
  }, {
    key: "_getsMarkersOptionsFromSrc",
    value: function _getsMarkersOptionsFromSrc(src) {
      var markerOptions = null;
      for (var i = 0; i < this.options.markersList.length; i++) {
        if (src && this.options.markersList[i].src === src) {
          markerOptions = this.options.markersList[i];
          return markerOptions;
        }
      }
      return markerOptions;
    }

    /**
     * Converts markerElement options into Openlayers IconStyles options.
     *
     * @param {Object} markerElement - marker element
     * @returns {Object} ol.Style.Icon constructor options.
     * @private
     */
  }, {
    key: "_getIconStyleOptions",
    value: function _getIconStyleOptions(markerElement) {
      var iconOptions = {};
      Object.keys(markerElement).forEach(function (key) {
        switch (key) {
          case "src":
          case "size":
          case "scale":
          case "color":
          case "anchor":
          case "anchorOrigin":
          case "anchorXUnits":
          case "anchorYUnits":
            iconOptions[key] = markerElement[key];
            break;
        }
      });
      return iconOptions;
    }

    /**
     * Initialize control (called by Drawing constructor)
     *
     * @method _initialize
     * @param {Object} options - control options (set by user)
     * @private
     */
  }, {
    key: "_initialize",
    value: function _initialize(options) {
      var _this4 = this;
      // determination d'un uid
      this._uid = _Utils_SelectorID__WEBPACK_IMPORTED_MODULE_17__["default"].generate();

      // export name / format / ...
      this._exportName = "Croquis";
      this._exportFormat = "KML";
      this._exportMimeType = "application/vnd.google-earth.kml+xml";
      this._exportExt = ".kml";
      options = options || {};
      // Set default options
      this.options = options;
      if (!this.options.layerDescription) {
        this.options.layerDescription = {
          title: "Croquis",
          description: "Mon croquis"
        };
      }

      // applying default tools
      if (!this.options.tools) {
        this.options.tools = {};
      }
      Object.keys(Drawing.DefaultTools).forEach(function (key) {
        if (!_this4.options.tools.hasOwnProperty(key)) {
          _this4.options.tools[key] = Drawing.DefaultTools[key];
        }
      });
      // styles par defaut lors du dessin
      if (!this.options.cursorStyle) {
        this.options.cursorStyle = {};
      }
      Object.keys(Drawing.DefaultCursorStyle).forEach(function (key) {
        if (!_this4.options.cursorStyle.hasOwnProperty(key)) {
          _this4.options.cursorStyle[key] = Drawing.DefaultCursorStyle[key];
        }
      });
      this.options.collapsed = options.collapsed !== undefined ? options.collapsed : true;
      /** {Boolean} specify if Drawing control is collapsed (true) or not (false) */
      this.collapsed = this.options.collapsed;
      this.options.draggable = options.draggable !== undefined ? options.draggable : false;
      /** {Boolean} specify if Drawing control is draggable (true) or not (false) */
      this.draggable = this.options.draggable;
      this.options.markersList = options.markersList || _Utils_MarkersOther__WEBPACK_IMPORTED_MODULE_15__["default"]["drawing_api"];

      // applying default labels
      if (!this.options.labels) {
        this.options.labels = {};
      }
      Object.keys(Drawing.DefaultLabels).forEach(function (key) {
        if (!_this4.options.labels.hasOwnProperty(key)) {
          _this4.options.labels[key] = Drawing.DefaultLabels[key];
        }
      });

      // applying default styles
      if (!this.options.defaultStyles) {
        this.options.defaultStyles = {};
      }
      Object.keys(Drawing.DefaultStyles).forEach(function (key) {
        if (!options.defaultStyles.hasOwnProperty(key)) {
          _this4.options.defaultStyles[key] = Drawing.DefaultStyles[key];
          return;
        }
        if (key === "polyFillOpacity" && (options.defaultStyles[key] < 0 || options.defaultStyles[key] > 1)) {
          logger.log("Wrong value (" + options.defaultStyles[key] + ") for defaultStyles.polyFillOpactity. Must be between 0 and 1");
          _this4.options.defaultStyles[key] = Drawing.DefaultStyles[key];
          return;
        }
        if (key === "strokeWidth" || key === "polyStrokeWidth") {
          var intValue = parseInt(options.defaultStyles[key], 10);
          if (isNaN(intValue) || intValue < 0) {
            logger.log("Wrong value (" + options.defaultStyles[key] + ") for defaultStyles.strokeWidth. Must be a positive interger value.");
            _this4.options.defaultStyles[key] = Drawing.DefaultStyles[key];
            return;
          }
          _this4.options.defaultStyles[key] = intValue;
        }
        if (key === "markerSize") {
          var floatValue = parseFloat(options.defaultStyles[key]);
          if (isNaN(floatValue) || floatValue < 0) {
            logger.log("Wrong value (" + options.defaultStyles[key] + ") for defaultStyles.markerSize. Must be a positive value.");
            _this4.options.defaultStyles[key] = Drawing.DefaultStyles[key];
            return;
          }
          _this4.options.defaultStyles[key] = floatValue;
        }
      });
      this.interactionCurrent = null;
      this.interactionSelectEdit = null;
      this.featuresCollectionSelected = null;
      this.stylingOvl = null;
      this.popupOvl = null;
      this.layer = null;
      if (this.options.layer && this.options.layer instanceof (ol_layer_Vector__WEBPACK_IMPORTED_MODULE_7___default())) {
        this.layer = this.options.layer;
      }

      // detection du support : desktop ou tactile
      // FIXME : utile ?
      this._isDesktop = this._detectSupport();

      // applying default popup
      if (!this.options.popup) {
        this.options.popup = {
          display: true,
          apply: null
        };
      }
    }

    /**
     * Creates empty layer to host features
     *
     * @private
     */
  }, {
    key: "_createEmptyLayer",
    value: function _createEmptyLayer() {
      var features = new (ol_Collection__WEBPACK_IMPORTED_MODULE_3___default())();
      var layer = new (ol_layer_Vector__WEBPACK_IMPORTED_MODULE_7___default())({
        source: new (ol_source_Vector__WEBPACK_IMPORTED_MODULE_6___default())({
          features: features
        })
      });
      // on rajoute le champ gpResultLayerId permettant d'identifier une couche crée par le composant.
      layer.gpResultLayerId = "drawing";
      // on le rajoute au controle (et à la carte)
      this.setLayer(layer);
    }

    /**
     * this method is called by the constructor.
     * this information is useful to switch to touch mode.
     * Detection : test for desktop or tactile
     *
     * @method _detectSupport
     *
     * @returns {Boolean} is desktop
     * @private
     */
  }, {
    key: "_detectSupport",
    value: function _detectSupport() {
      // TODO
      // Choix de gérer la détection dans le code du composant au lieu du DOM car :
      // Utilisation de l'implémentation Leaflet
      // http://leafletjs.com/reference.html#browser

      var isDesktop = true;
      var userAgent = window.navigator.userAgent.toLowerCase();
      if (userAgent.indexOf("iphone") !== -1 || userAgent.indexOf("ipod") !== -1 || userAgent.indexOf("ipad") !== -1 || userAgent.indexOf("android") !== -1 || userAgent.indexOf("mobile") !== -1 || userAgent.indexOf("blackberry") !== -1 || userAgent.indexOf("tablet") !== -1 || userAgent.indexOf("phone") !== -1 || userAgent.indexOf("touch") !== -1) {
        isDesktop = false;
      }
      if (userAgent.indexOf("msie") !== -1 || userAgent.indexOf("trident") !== -1) {
        isDesktop = true;
      }
      return isDesktop;
    }

    // ################################################################### //
    // ######################## methods handle dom ####################### //
    // ################################################################### //

    /**
     * Create control main container (called by Drawing constructor)
     *
     * @method _initContainer
     *
     * @returns {DOMElement} DOM element
     * @private
     */
  }, {
    key: "_initContainer",
    value: function _initContainer() {
      // creation du container principal
      var container = this._createMainContainerElement();
      var picto = this._showDrawingButton = this._createShowDrawingPictoElement();
      container.appendChild(picto);
      var panel = this._drawingPanel = this._createDrawingPanelElement();
      var panelDiv = this._createDrawingPanelDivElement();
      panel.appendChild(panelDiv);
      var header = this._drawingPanelHeader = this._createDrawingPanelHeaderElement();
      panelDiv.appendChild(header);
      var sections = this._createDrawingToolsDivSections();
      panelDiv.appendChild(sections);
      var tools = this._createDrawingToolsSections();
      for (var i = 0; i < tools.length; i++) {
        sections.appendChild(tools[i]);
      }
      container.appendChild(panel);
      return container;
    }

    // ################################################################### //
    // ##################### handlers events to control ################## //
    // ################################################################### //

    /**
     * Callback de fin de dessin de geometrie
     * @param {Object} feature - ol feature
     * @param {String} geomType - geometry type
     * @param {Boolean} clean - clean last feature
     *
     * @private
     */
  }, {
    key: "_drawEndFeature",
    value: function _drawEndFeature(feature, geomType) {
      // application des styles par defaut.
      var style = null;
      switch (geomType) {
        case "Point":
          style = new ol_style__WEBPACK_IMPORTED_MODULE_8__.Style({
            image: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Icon(this._getIconStyleOptions(this.options.markersList[0]))
          });
          break;
        case "LineString":
          style = new ol_style__WEBPACK_IMPORTED_MODULE_8__.Style({
            stroke: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Stroke({
              color: this.options.defaultStyles.strokeColor,
              width: this.options.defaultStyles.strokeWidth
            })
          });
          break;
        case "Polygon":
          style = new ol_style__WEBPACK_IMPORTED_MODULE_8__.Style({
            fill: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Fill({
              color: _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_18__["default"].hexToRgba(this.options.defaultStyles.polyFillColor, this.options.defaultStyles.polyFillOpacity)
            }),
            stroke: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Stroke({
              color: this.options.defaultStyles.polyStrokeColor,
              width: this.options.defaultStyles.polyStrokeWidth
            })
          });
          break;
      }
      feature.setStyle(style);

      // gestion des mesures
      this._updateMeasure(feature, geomType);
      if (this.options.popup.display) {
        // creation overlay pour saisie du label
        // contexte
        var context = this;

        /**
        * Enregistrement de la valeur saisie dans l'input.
        *
        * @param {String} key - clef de l'attribut.
        * @param {String} value - valeur de l'attribut.
        * @param {Boolean} save - true si on garde le label.
        */
        var setAttValue = function setAttValue(key, value, save) {
          context.getMap().removeOverlay(context.popupOvl);
          context.popupOvl = null;
          if (save && value && value.trim().length > 0) {
            var obj = {};
            obj[key] = value.replace(/\n/g, "<br>");
            feature.setProperties(obj);
          }
        };
        var popup = null;
        var popupByDefault = true;
        var displayFunction = this.options.popup["function"];
        if (displayFunction && typeof displayFunction === "function") {
          // la sauvegarde et la fermeture sont des actions à implementer par l'utilisateur
          // par contre, la destruction est à gerer en interne
          popup = displayFunction.call(context, {
            feature: feature,
            geomType: geomType,
            closeFunc: function closeFunc() {
              setAttValue(null, false);
            },
            saveFunc: function saveFunc(message) {
              setAttValue(message, true);
            }
          });
          if (popup) {
            // on est sûr que la popup customisée existe,
            // donc on n'utilise pas celle par defaut...
            popupByDefault = false;
            // FIXME comment forcer le focus sur une div ?
            popup.tabIndex = -1; // hack sur le focus sur une div ?
            popup.onblur = function () {
              context.getMap().removeOverlay(context.popupOvl);
              context.popupOvl = null;
            };
          }
        }
        // use popup by default
        if (popupByDefault) {
          // function by default
          popup = this._createLabelDiv({
            applyFunc: setAttValue,
            inputId: this._addUID("att-input"),
            placeholder: "Saisir une description...",
            measure: this.options.tools.measure ? feature.getProperties().measure : null,
            geomType: geomType,
            key: "description"
          });
        }
        // un peu de menage...
        if (this.popupOvl) {
          this.getMap().removeOverlay(this.popupOvl);
          this.popupOvl = null;
        }
        // creation de l'overlay
        this.popupOvl = new (ol_Overlay__WEBPACK_IMPORTED_MODULE_4___default())({
          element: popup,
          // FIXME : autres valeurs.
          positioning: "top-center"
          // stopEvent : false
        });
        this.getMap().addOverlay(this.popupOvl);
        var geomExtent = feature.getGeometry().getExtent();
        this.popupOvl.setPosition([(geomExtent[0] + geomExtent[2]) / 2, (geomExtent[1] + geomExtent[3]) / 2]);
        if (document.getElementById(this._addUID("att-input"))) {
          document.getElementById(this._addUID("att-input")).focus();
        }
      }
    }

    /**
     * Creates Interaction for features removal.
     *
     * @returns {SelectInteraction} created interaction.
     * @private
     */
  }, {
    key: "_createRemoveInteraction",
    value: function _createRemoveInteraction() {
      var _this5 = this;
      var interaction = new ol_interaction__WEBPACK_IMPORTED_MODULE_10__.Select({
        // features : this.layer.getSource().getFeaturesCollection(),
        layers: [this.layer],
        style: false
      });
      interaction.on("select", function (seEv) {
        if (!seEv || !seEv.selected || seEv.selected.length === 0) {
          return;
        }
        _this5.layer.getSource().removeFeature(seEv.selected[0]);
        // suppression puis rajout de l'interaction pour appliquer le changement tout de suite...
        _this5.getMap().removeInteraction(_this5.interactionCurrent);
        _this5.interactionCurrent = _this5._createRemoveInteraction();
        _this5.getMap().addInteraction(_this5.interactionCurrent);
      });
      return interaction;
    }

    /**
     * Creates Interaction for features style definition.
     *
     * @returns {ol.interaction.Select} created interaction.
     * @private
     */
  }, {
    key: "_createStylingInteraction",
    value: function _createStylingInteraction() {
      var _this6 = this;
      var interaction = new ol_interaction__WEBPACK_IMPORTED_MODULE_10__.Select({
        layers: [this.layer],
        style: false
      });
      interaction.on("select", function (seEv) {
        // suppression de toute popup existante
        if (_this6.stylingOvl) {
          _this6.getMap().removeOverlay(_this6.stylingOvl);
        }
        if (!seEv || !seEv.selected || seEv.selected.length === 0) {
          return;
        }
        var valuesColor = null;
        var hexColor = null;
        var popupOvl = null;
        var geomType = null;
        var initValues = {};

        // FIXME
        // l'appel feature.getStyle() est parfois nul pour des geometries Point
        // avec un style par defaut !

        var geom = seEv.selected[0].getGeometry();
        var style = seEv.selected[0].getStyle();
        if (geom instanceof ol_geom__WEBPACK_IMPORTED_MODULE_9__.Point || geom instanceof ol_geom__WEBPACK_IMPORTED_MODULE_9__.MultiPoint) {
          // INFO
          // on determine si c'est un marker (ou cercle), un label ou les 2.
          // un label a un pixel transparent comme icone
          if (style && style.getImage() && typeof style.getImage().getSrc === "function" && style.getImage().getSrc() !== _this6.options.defaultStyles.textIcon1x1.src) {
            geomType = "Point";
            // on traite un marker
            // mais si c'est un cercle !?
            if (typeof style.getImage().getSrc === "function") {
              initValues.markerSrc = style.getImage().getSrc();
              initValues.markerSize = style.getImage().getScale() || 1;
              initValues.markerAnchor = style.getImage().getAnchor();
              if (style.getImage().getColor()) {
                valuesColor = style.getImage().getColor();
                if (Array.isArray(valuesColor)) {
                  // FIXME Array !?
                  valuesColor = "rgba(" + valuesColor.join() + ")";
                } else {
                  initValues.markerColor = valuesColor;
                }
                hexColor = _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_18__["default"].isRGB(valuesColor) ? _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_18__["default"].rgbaToHex(valuesColor) : {
                  hex: valuesColor,
                  opacity: 1
                };
                initValues.markerColor = hexColor.hex;
                initValues.markerOpacity = hexColor.opacity;
              } else {
                initValues.markerColor = _this6.options.markersList[0].color || "#ffffff";
              }
            } else {
              initValues.markerSrc = _this6.options.markersList[0].src;
              initValues.markerSize = _this6.options.markersList[0].scale || 1;
              initValues.markerColor = _this6.options.markersList[0].color || "#ffffff";
              initValues.markerAnchor = _this6.options.markersList[0].anchor;
            }
            initValues.markerCustom = !_this6._getsMarkersOptionsFromSrc(initValues.markerSrc);
          }
          if (style && style.getText()) {
            var labelName = seEv.selected[0].getProperties().name;
            if (labelName) {
              // test si on a un marker avec un label
              geomType = geomType === "Point" ? "Point&Text" : "Text";
              if (style.getText().getStroke() && style.getText().getStroke().getColor()) {
                valuesColor = style.getText().getStroke().getColor();
                if (Array.isArray(valuesColor)) {
                  // FIXME Array !?
                  valuesColor = "rgba(" + valuesColor.join() + ")";
                } else {
                  initValues.strokeColor = valuesColor;
                }
                hexColor = _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_18__["default"].isRGB(valuesColor) ? _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_18__["default"].rgbaToHex(valuesColor) : {
                  hex: valuesColor,
                  opacity: 1
                };
                initValues.strokeColor = hexColor.hex;
                initValues.strokeOpacity = hexColor.opacity;
              }
              if (style.getText().getStroke() && style.getText().getStroke().getWidth()) {
                initValues.strokeWidth = style.getText().getStroke().getWidth();
              }
              if (style.getText().getFill() && style.getText().getFill().getColor()) {
                valuesColor = style.getText().getFill().getColor();
                if (Array.isArray(valuesColor)) {
                  valuesColor = "rgba(" + valuesColor.join() + ")";
                } else {
                  initValues.fillColor = valuesColor;
                }
                hexColor = _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_18__["default"].isRGB(valuesColor) ? _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_18__["default"].rgbaToHex(valuesColor) : {
                  hex: valuesColor,
                  opacity: 1
                };
                initValues.fillColor = hexColor.hex;
                initValues.fillOpacity = hexColor.opacity;
              }
              initValues.strokeColor = initValues.hasOwnProperty("strokeColor") ? initValues.strokeColor : _this6.options.defaultStyles.textStrokeColor;
              initValues.strokeWidth = initValues.hasOwnProperty("strokeWidth") ? initValues.strokeWidth : _this6.options.defaultStyles.textStrokeWidth;
              initValues.fillColor = initValues.hasOwnProperty("fillColor") ? initValues.fillColor : _this6.options.defaultStyles.textFillColor;
              // Par defaut, pour un marker avec un label, on affiche le label si le tag "name" est renseigné.
              if (geomType === "Point&Text") {
                var value = style.getText().getText();
                if (!value) {
                  style.getText().setText(labelName);
                }
                var checked = seEv.selected[0].get("checked");
                initValues.labelDisplay = checked === undefined ? _this6.options.defaultStyles.labelDisplay : checked;
              }
            }
          }
        } else if (geom instanceof ol_geom__WEBPACK_IMPORTED_MODULE_9__.LineString || geom instanceof ol_geom__WEBPACK_IMPORTED_MODULE_9__.MultiLineString) {
          geomType = "Line";
          if (style && style.getStroke()) {
            if (style.getStroke().getWidth()) {
              initValues.strokeWidth = style.getStroke().getWidth();
            }
            if (style.getStroke().getColor()) {
              valuesColor = style.getStroke().getColor();
              if (Array.isArray(valuesColor)) {
                valuesColor = "rgba(" + valuesColor.join() + ")";
              } else {
                initValues.strokeColor = valuesColor;
              }
              hexColor = _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_18__["default"].isRGB(valuesColor) ? _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_18__["default"].rgbaToHex(valuesColor) : {
                hex: valuesColor,
                opacity: 1
              };
              initValues.strokeColor = hexColor.hex;
              initValues.strokeOpacity = hexColor.opacity;
            }
          }
          initValues.strokeWidth = initValues.hasOwnProperty("strokeWidth") ? initValues.strokeWidth : _this6.options.defaultStyles.strokeWidth;
          initValues.strokeColor = initValues.hasOwnProperty("strokeColor") ? initValues.strokeColor : _this6.options.defaultStyles.strokeColor;
        } else if (geom instanceof ol_geom__WEBPACK_IMPORTED_MODULE_9__.Polygon || geom instanceof ol_geom__WEBPACK_IMPORTED_MODULE_9__.MultiPolygon) {
          geomType = "Polygon";
          if (style && style.getStroke()) {
            if (style.getStroke().getWidth()) {
              initValues.strokeWidth = style.getStroke().getWidth();
            }
            if (style.getStroke().getColor()) {
              valuesColor = style.getStroke().getColor();
              if (Array.isArray(valuesColor)) {
                valuesColor = "rgba(" + valuesColor.join() + ")";
              } else {
                initValues.strokeColor = valuesColor;
              }
              hexColor = _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_18__["default"].isRGB(valuesColor) ? _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_18__["default"].rgbaToHex(valuesColor) : {
                hex: valuesColor,
                opacity: 1
              };
              initValues.strokeColor = hexColor.hex;
              initValues.strokeOpacity = hexColor.opacity;
            }
          }
          if (style && style.getFill()) {
            if (style.getFill().getColor()) {
              valuesColor = style.getFill().getColor();
              if (Array.isArray(valuesColor)) {
                valuesColor = "rgba(" + valuesColor.join() + ")";
              } else {
                initValues.fillColor = valuesColor;
              }
              hexColor = _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_18__["default"].isRGB(valuesColor) ? _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_18__["default"].rgbaToHex(valuesColor) : {
                hex: valuesColor,
                opacity: 1
              };
              initValues.fillColor = hexColor.hex;
              initValues.fillOpacity = hexColor.opacity;
            }
          }
          initValues.strokeWidth = initValues.hasOwnProperty("strokeWidth") ? initValues.strokeWidth : _this6.options.defaultStyles.polyStrokeWidth;
          initValues.strokeColor = initValues.hasOwnProperty("strokeColor") ? initValues.strokeColor : _this6.options.defaultStyles.polyStrokeColor;
          initValues.fillColor = initValues.hasOwnProperty("fillColor") ? initValues.fillColor : _this6.options.defaultStyles.polyFillColor;
          initValues.fillOpacity = initValues.hasOwnProperty("fillOpacity") ? initValues.fillOpacity : _this6.options.defaultStyles.polyFillOpacity;
        }
        if (!geomType) {
          logger.log("Unhandled geometry type for styling.");
          return;
        }
        var dtObj = _this6;
        /**
        * function called when apply button is pressed.
        *
        * @param {String} action - "apply" (to selected object), "default" (set as default), "cancel" (do nothing).
        */
        var applyStyle = function applyStyle(action) {
          if (action === "cancel") {
            dtObj.getMap().removeOverlay(popupOvl);
            return;
          }
          var setDefault = action !== "apply";
          var fillColorElem = document.getElementById(dtObj._addUID("fillColor"));
          var fillOpacityElem = document.getElementById(dtObj._addUID("fillOpacity"));
          var strokeColorElem = document.getElementById(dtObj._addUID("strokeColor"));
          var strokeWidthElem = document.getElementById(dtObj._addUID("strokeWidth"));
          var markerSizeElem = document.getElementById(dtObj._addUID("markerSize"));
          // var markerColorElem = document.getElementById(dtObj._addUID("markerColor"));
          switch (geomType.toLowerCase()) {
            case "text":
              if (setDefault) {
                dtObj.options.defaultStyles.textStrokeColor = strokeColorElem.value;
                dtObj.options.defaultStyles.textStrokeWidth = strokeWidthElem.value;
                dtObj.options.defaultStyles.textFillColor = fillColorElem.value;
              } else {
                seEv.selected[0].setStyle(new ol_style__WEBPACK_IMPORTED_MODULE_8__.Style({
                  text: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Text({
                    font: "16px sans",
                    textAlign: "left",
                    text: style.getText().getText(),
                    fill: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Fill({
                      color: fillColorElem.value
                    }),
                    stroke: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Stroke({
                      color: strokeColorElem.value,
                      width: parseInt(strokeWidthElem.value, 10)
                    })
                  })
                }));
              }
              break;
            case "point&text":
            case "point":
              var labelDisplay = document.querySelector("input[type='checkbox']");
              // FIXME cas où le marker n'est pas dans la liste ?
              // si le marker n'existe pas dans le liste, on ne souhaite donc que changer la couleur du
              // pictogramme ou la taille..., on garde donc le picto initial.
              var markerSelected = null;
              var scale = parseInt(markerSizeElem.value, 10) / 10;
              var markerChecked = document.querySelector("input[name='marker']:checked");
              if (markerChecked) {
                markerSelected = dtObj._getsMarkersOptionsFromSrc(markerChecked.value);
                markerSelected.scale = scale;
                // markerSelected.color = markerColorElem.value;
              }
              if (setDefault) {
                dtObj.options.defaultStyles.markerSize = scale;
                if (dtObj.options.markersList.length > 1) {
                  // index du marker dans la liste des markers
                  var idxMarker = dtObj.options.markersList.findIndex(function (mrk) {
                    if (mrk === markerSelected) {
                      // FIXME object comparison
                      return true;
                    }
                    return false;
                  });
                  if (idxMarker > 0) {
                    // on enleve le marker de son ancienne position
                    dtObj.options.markersList.splice(idxMarker, 1);
                    // on le place en tête de liste
                    dtObj.options.markersList.splice(0, 0, markerSelected);
                  }
                }
                if (geomType.toLowerCase() === "point&text") {
                  dtObj.options.defaultStyles.textStrokeColor = initValues.strokeColor;
                  dtObj.options.defaultStyles.textStrokeWidth = initValues.strokeWidth;
                  dtObj.options.defaultStyles.textFillColor = initValues.fillColor;
                  dtObj.options.defaultStyles.labelDisplay = initValues.labelDisplay;
                }
              } else {
                var text = {};
                if (geomType.toLowerCase() === "point&text") {
                  seEv.selected[0].set("checked", labelDisplay.checked);
                  text = {
                    text: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Text({
                      font: "16px sans",
                      textAlign: "left",
                      text: labelDisplay.checked ? seEv.selected[0].get("name") : "",
                      fill: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Fill({
                        color: initValues.fillColor
                      }),
                      stroke: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Stroke({
                        color: initValues.strokeColor,
                        width: parseInt(initValues.strokeWidth, 10)
                      })
                    })
                  };
                }
                if (markerSelected) {
                  seEv.selected[0].setStyle(new ol_style__WEBPACK_IMPORTED_MODULE_8__.Style(Object.assign({
                    image: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Icon(dtObj._getIconStyleOptions(markerSelected))
                  }, text)));
                } else {
                  // FIXME anchor !?
                  seEv.selected[0].setStyle(new ol_style__WEBPACK_IMPORTED_MODULE_8__.Style(Object.assign({
                    image: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Icon({
                      src: initValues.markerSrc,
                      // on garde le pictogramme initial !
                      // color : markerColorElem.value, // on recupère la couleur !
                      anchor: initValues.markerAnchor,
                      // on garde la position initial !
                      anchorOrigin: "top-left",
                      anchorXUnits: "pixels",
                      anchorYUnits: "pixels",
                      scale: scale
                    })
                  }, text)));
                }
              }
              break;
            case "line":
              if (setDefault) {
                dtObj.options.defaultStyles.strokeColor = strokeColorElem.value;
                dtObj.options.defaultStyles.strokeWidth = parseInt(strokeWidthElem.value, 10);
              } else {
                seEv.selected[0].setStyle(new ol_style__WEBPACK_IMPORTED_MODULE_8__.Style({
                  stroke: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Stroke({
                    width: parseInt(strokeWidthElem.value, 10),
                    color: strokeColorElem.value
                  })
                }));
              }
              break;
            case "polygon":
              var opacity = parseInt(fillOpacityElem.value, 10) / 10;
              if (setDefault) {
                dtObj.options.defaultStyles.polyStrokeColor = strokeColorElem.value;
                dtObj.options.defaultStyles.polyFillColor = fillColorElem.value;
                dtObj.options.defaultStyles.polyFillOpacity = opacity;
                dtObj.options.defaultStyles.polyStrokeWidth = parseInt(strokeWidthElem.value, 10);
              } else {
                seEv.selected[0].setStyle(new ol_style__WEBPACK_IMPORTED_MODULE_8__.Style({
                  stroke: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Stroke({
                    width: parseInt(strokeWidthElem.value, 10),
                    color: strokeColorElem.value
                  }),
                  fill: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Fill({
                    // color : fillColorElem.value
                    color: _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_18__["default"].hexToRgba(fillColorElem.value, opacity)
                  })
                }));
              }
              break;
          }
          if (!setDefault) {
            // application des styles par defaut
            // fermeture de la popup (si on applique le style à l'objet)
            dtObj.getMap().removeOverlay(popupOvl);
          }
        };
        var popupDiv = _this6._createStylingDiv({
          geomType: geomType,
          initValues: initValues,
          applyFunc: applyStyle
        });
        popupOvl = new (ol_Overlay__WEBPACK_IMPORTED_MODULE_4___default())({
          element: popupDiv,
          // FIXME : autres valeurs.
          positioning: "top-center"
          // stopEvent : false
        });
        _this6.getMap().addOverlay(popupOvl);
        popupOvl.setPosition(seEv.mapBrowserEvent.coordinate);
        _this6.stylingOvl = popupOvl;
        // suppression puis rajout de l'interaction pour appliquer le changement tout de suite...
        _this6.getMap().removeInteraction(_this6.interactionCurrent);
        _this6.interactionCurrent = _this6._createStylingInteraction();
        _this6.getMap().addInteraction(_this6.interactionCurrent);
      });
      return interaction;
    }

    /**
     * Creates Interaction for text definition.
     *
     * @returns {SelectInteraction} created interaction.
     * @private
     */
  }, {
    key: "_createLabelInteraction",
    value: function _createLabelInteraction() {
      var _this7 = this;
      var interaction = new ol_interaction__WEBPACK_IMPORTED_MODULE_10__.Select({
        layers: [this.layer],
        style: false
      });
      interaction.on("select", function (seEv) {
        // suppression de toute popup existante
        if (_this7.labelOvl) {
          _this7.getMap().removeOverlay(_this7.labelOvl);
        }
        if (!seEv || !seEv.selected || seEv.selected.length === 0) {
          return;
        }
        var popupOvl = null;
        var geomType = null;
        var _textValue = null;
        var _measure = null;
        var geom = seEv.selected[0].getGeometry();
        var style = seEv.selected[0].getStyle();
        if (geom instanceof ol_geom__WEBPACK_IMPORTED_MODULE_9__.Point || geom instanceof ol_geom__WEBPACK_IMPORTED_MODULE_9__.MultiPoint) {
          // on determine si c'est un marker ou un label.
          var _label = seEv.selected[0].getProperties().name;
          if (style && style.getText() && _label) {
            geomType = "Text";
          } else if (style && style.getImage()) {
            geomType = "Point";
          }
        } else if (geom instanceof ol_geom__WEBPACK_IMPORTED_MODULE_9__.LineString || geom instanceof ol_geom__WEBPACK_IMPORTED_MODULE_9__.MultiLineString) {
          geomType = "Line";
        } else if (geom instanceof ol_geom__WEBPACK_IMPORTED_MODULE_9__.Polygon || geom instanceof ol_geom__WEBPACK_IMPORTED_MODULE_9__.MultiPolygon) {
          geomType = "Polygon";
        } else {
          logger.log("Geometry type for styling not supported .");
          return;
        }
        if (!geomType) {
          logger.log("Unhandled geometry type for styling.");
          return;
        }
        if (geomType === "Text") {
          // pour les labels on récupère la valeur dans le style
          _textValue = style.getText().getText();
        } else {
          // pour les autres, c'est un attribut du feature
          // choix à faire entre description (KML et GeoJSON) ou desc (GPX)
          var featProps = seEv.selected[0].getProperties();
          if (featProps && (featProps.hasOwnProperty("description") || featProps.hasOwnProperty("desc"))) {
            _textValue = featProps["description"] || featProps["desc"];
          }
          if (featProps && featProps.hasOwnProperty("measure")) {
            _measure = featProps["measure"];
          }
        }
        var context = _this7;
        /**
         * Enregistrement de la valeur saisie dans l'input.
         *
         * @param {String} key - clef de l'attribut.
         * @param {String} value - valeur de l'attribut.
         * @param {Boolean} save - true si on garde le label.
         */
        var setTextValue = function setTextValue(key, value, save) {
          context.getMap().removeOverlay(popupOvl);
          if (!save) {
            return;
          }
          var feature = seEv.selected[0];
          if (geomType === "Text") {
            var style = feature.getStyle();
            style.getText().setText(value);
            feature.setProperties({
              name: value
            });
            feature.setStyle(style);
            return;
          }
          var obj = {};
          obj[key] = value.replace(/\n/g, "<br>");
          feature.setProperties(obj);
        };
        var popupDiv = _this7._createLabelDiv({
          applyFunc: setTextValue,
          inputId: _this7._addUID("label-input"),
          placeholder: geomType === "Text" ? "Saisir un label..." : "Saisir une description...",
          text: _textValue,
          key: "description",
          measure: _this7.options.tools.measure ? _measure : null,
          geomType: geomType
        });
        popupOvl = new (ol_Overlay__WEBPACK_IMPORTED_MODULE_4___default())({
          element: popupDiv,
          // FIXME : autres valeurs.
          positioning: "top-center"
          // stopEvent : false
        });
        _this7.getMap().addOverlay(popupOvl);
        popupOvl.setPosition(seEv.mapBrowserEvent.coordinate);
        document.getElementById(_this7._addUID("label-input")).focus();
        _this7.labelOvl = popupOvl;
        // suppression puis rajout de l'interaction pour appliquer le changement tout de suite...
        _this7.getMap().removeInteraction(_this7.interactionCurrent);
        _this7.interactionCurrent = _this7._createLabelInteraction();
        _this7.getMap().addInteraction(_this7.interactionCurrent);
      });
      return interaction;
    }

    /**
     * Callback de fin de modification du dessin afin de mettre à jour la mesure
     * TODO
     * @param {Object} feature - ol feature
     * @param {String} geomType - geometry type
     *
     * @private
     */
  }, {
    key: "_updateMeasure",
    value: function _updateMeasure(feature, geomType) {
      logger.log(feature);
      var measure = null;
      var projection = this.getMap().getView().getProjection();

      // arrondi
      function __roundDecimal(nombre, precision) {
        precision = precision || 2;
        var factor = Math.pow(10, precision);
        return Math.round(nombre * factor) / factor;
      }
      var type = geomType || feature.getProperties().type;
      switch (type) {
        case "Point":
          var coordinatesPoint = feature.getGeometry().getCoordinates();
          var c = (0,ol_proj__WEBPACK_IMPORTED_MODULE_5__.transform)(coordinatesPoint, projection, "EPSG:4326");
          measure = "lon : ";
          measure += __roundDecimal(c[0], 4) + "°";
          measure += " / ";
          measure += "lat : ";
          measure += __roundDecimal(c[1], 4) + "°";
          break;
        case "LineString":
          var measureLength = 0;
          var coordinatesLine = feature.getGeometry().getCoordinates();
          for (var i = 0, ii = coordinatesLine.length - 1; i < ii; ++i) {
            var c1 = (0,ol_proj__WEBPACK_IMPORTED_MODULE_5__.transform)(coordinatesLine[i], projection, "EPSG:4326");
            var c2 = (0,ol_proj__WEBPACK_IMPORTED_MODULE_5__.transform)(coordinatesLine[i + 1], projection, "EPSG:4326");
            measureLength += (0,ol_sphere__WEBPACK_IMPORTED_MODULE_12__.getDistance)(c1, c2);
          }
          measure = measureLength > 1000 ? __roundDecimal(measureLength / 1000, 3) + " km" : __roundDecimal(measureLength, 3) + " m";
          break;
        case "Polygon":
          var measureArea = 0;
          var geom = feature.getGeometry().clone();
          var coordinatesAera = geom.getLinearRing(0).getCoordinates();
          measureArea = Math.abs((0,ol_sphere__WEBPACK_IMPORTED_MODULE_12__.getArea)(new ol_geom__WEBPACK_IMPORTED_MODULE_9__.Polygon([coordinatesAera])));

          // FIXME on se limite à des trous uniquement !
          // cad les polygones sont strictement contenus dans le 1er !
          var rings = geom.getLinearRings();
          if (rings.length > 1) {
            for (var ij = 1; ij < rings.length; ij++) {
              var coordinatesRings = rings[ij].getCoordinates();
              measureArea -= Math.abs((0,ol_sphere__WEBPACK_IMPORTED_MODULE_12__.getArea)(new ol_geom__WEBPACK_IMPORTED_MODULE_9__.Polygon([coordinatesRings])));
            }
          }
          measure = measureArea > 1000000 ? __roundDecimal(measureArea / 1000000, 3) + " km^2" : __roundDecimal(measureArea, 2) + " m^2";
          break;
      }

      // enregistrement de la mesure dans la feature
      feature.setProperties({
        measure: measure,
        type: type
      });
    }

    /**
     * Handles click on drawing tools icons
     *
     * @param {Event} clickEvent - click event
     * @param {String} toolId - selected tool Id
     * @param {Drawing} context - Drawing control.
     * @private
     */
  }, {
    key: "_handleToolClick",
    value: function _handleToolClick(clickEvent, toolId, context) {
      var _this8 = this;
      var map = context.getMap();
      if (!map) {
        logger.trace("Drawing control not attached to any map.");
        return;
      }
      // on supprime  les interactions des autres extensions
      _Utils_Interactions__WEBPACK_IMPORTED_MODULE_14__["default"].unset(map, {
        current: "Drawing"
      });

      // on supprime l'interaction courante s'il y en a une.
      if (context.interactionCurrent) {
        map.removeInteraction(context.interactionCurrent);
        context.interactionCurrent = null;
      }

      // on supprime l'interaction de selection courante s'il y en a une.
      if (context.interactionSelectEdit) {
        map.removeInteraction(context.interactionSelectEdit);
        context.interactionSelectEdit = null;
      }

      // on supprime la popup courante s'il y en a une.
      if (context.popupOvl) {
        context.getMap().removeOverlay(context.popupOvl);
        context.popupOvl = null;
      }

      // si aucune couche de dessin, on en crée une vide.
      if (!this.layer) {
        this._createEmptyLayer();
      }
      switch (toolId) {
        case this._addUID("drawing-tool-point"):
          if (context.dtOptions["points"].active) {
            context.interactionCurrent = new ol_interaction__WEBPACK_IMPORTED_MODULE_10__.Draw({
              stopClick: true,
              // features : context.layer.getSource().getFeaturesCollection(),
              source: context.layer.getSource(),
              style: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Style({
                image: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Icon(this._getIconStyleOptions(this.options.markersList[0]))
              }),
              type: "Point"
            });
            context.interactionCurrent.on("drawend", function (deEv) {
              // ajout eventuel d'un attribut description sur le feature
              context._drawEndFeature(deEv.feature, "Point");
            }, context);
          }
          break;
        case this._addUID("drawing-tool-line"):
          if (context.dtOptions["lines"].active) {
            context.interactionCurrent = new ol_interaction__WEBPACK_IMPORTED_MODULE_10__.Draw({
              stopClick: true,
              // features : context.layer.getSource().getFeaturesCollection(),
              source: context.layer.getSource(),
              style: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Style({
                image: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Circle({
                  radius: this.options.cursorStyle.radius,
                  stroke: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Stroke({
                    color: this.options.cursorStyle.strokeColor,
                    width: this.options.cursorStyle.strokeWidth
                  }),
                  fill: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Fill({
                    color: this.options.cursorStyle.fillColor
                  })
                }),
                stroke: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Stroke({
                  color: this.options.defaultStyles.strokeColor,
                  width: this.options.defaultStyles.strokeWidth
                })
              }),
              type: "LineString"
            });
            context.interactionCurrent.on("drawend", function (deEv) {
              // ajout eventuel d'un attribut description sur le feature
              context._drawEndFeature(deEv.feature, "LineString");
            }, context);
          }
          break;
        case this._addUID("drawing-tool-polygon"):
          if (context.dtOptions["polygons"].active) {
            context.interactionCurrent = new ol_interaction__WEBPACK_IMPORTED_MODULE_10__.Draw({
              stopClick: true,
              // features : context.layer.getSource().getFeaturesCollection(),
              source: context.layer.getSource(),
              style: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Style({
                image: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Circle({
                  radius: this.options.cursorStyle.radius,
                  stroke: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Stroke({
                    color: this.options.cursorStyle.strokeColor,
                    width: this.options.cursorStyle.strokeWidth
                  }),
                  fill: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Fill({
                    color: this.options.cursorStyle.fillColor
                  })
                }),
                stroke: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Stroke({
                  color: this.options.defaultStyles.polyStrokeColor,
                  width: this.options.defaultStyles.polyStrokeWidth
                }),
                fill: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Fill({
                  color: _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_18__["default"].hexToRgba(this.options.defaultStyles.polyFillColor, this.options.defaultStyles.polyFillOpacity)
                })
              }),
              type: "Polygon"
            });
            context.interactionCurrent.on("drawend", function (deEv) {
              // ajout eventuel d'un attribut description sur le feature
              context._drawEndFeature(deEv.feature, "Polygon");
            }, context);
          }
          break;
        case this._addUID("drawing-tool-holes"):
          if (context.dtOptions["holes"].active) {
            // selection du polygone à modifier
            context.interactionSelectEdit = new ol_interaction__WEBPACK_IMPORTED_MODULE_10__.Select({
              stopClick: true,
              condition: ol_events_condition__WEBPACK_IMPORTED_MODULE_11__.pointerMove,
              layers: [this.layer]
            });
            context.interactionSelectEdit.setProperties({
              name: "Drawing",
              source: context
            });
            map.addInteraction(context.interactionSelectEdit);

            // saisie
            context.interactionCurrent = new ol_interaction__WEBPACK_IMPORTED_MODULE_10__.Draw({
              stopClick: true,
              features: this.interactionSelectEdit.getFeatures(),
              style: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Style({
                image: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Circle({
                  radius: this.options.cursorStyle.radius,
                  stroke: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Stroke({
                    color: this.options.cursorStyle.strokeColor,
                    width: this.options.cursorStyle.strokeWidth
                  }),
                  fill: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Fill({
                    color: this.options.cursorStyle.fillColor
                  })
                }),
                stroke: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Stroke({
                  color: this.options.defaultStyles.polyStrokeColor,
                  width: this.options.defaultStyles.polyStrokeWidth
                }),
                fill: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Fill({
                  color: _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_18__["default"].hexToRgba(this.options.defaultStyles.polyFillColor, this.options.defaultStyles.polyFillOpacity)
                })
              }),
              type: "Polygon"
            });
            context.interactionCurrent.on("drawstart", function (deEv) {}, context);
            context.interactionCurrent.on("drawend", function (deEv) {
              // recuperation du feature selectionné
              var features = context.interactionSelectEdit.getFeatures();
              if (features.getLength()) {
                // choix sur le 1er feature de la liste
                var feature = features.item(0);
                var hole = deEv.feature.getGeometry().getCoordinates()[0];
                // test pour savoir si le polygone est entièrement
                // inclu dans l'autre afin de faciliter les calculs d'aire !
                var bHoleIsIncluded = true;
                for (var i = 0; i < hole.length; i++) {
                  if (!feature.getGeometry().intersectsCoordinate(hole[i])) {
                    bHoleIsIncluded = false;
                    break;
                  }
                }
                if (!bHoleIsIncluded) {
                  return;
                }
                // ajout du rings
                feature.getGeometry().appendLinearRing(new ol_geom__WEBPACK_IMPORTED_MODULE_9__.LinearRing(hole));
                // enregistrement !
                deEv.feature = feature;
                // finalisation du dessin...
                context._drawEndFeature(deEv.feature, "Polygon");
              }
            }, context);
          }
          break;
        case this._addUID("drawing-tool-text"):
          // text : creation de points invisibles avec un label.
          if (context.dtOptions["text"].active) {
            context.interactionCurrent = new ol_interaction__WEBPACK_IMPORTED_MODULE_10__.Draw({
              stopClick: true,
              // features : context.layer.getSource().getFeaturesCollection(),
              source: context.layer.getSource(),
              style: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Style({
                image: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Circle({
                  radius: this.options.cursorStyle.radius,
                  stroke: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Stroke({
                    color: this.options.cursorStyle.strokeColor,
                    width: this.options.cursorStyle.strokeWidth
                  }),
                  fill: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Fill({
                    color: this.options.cursorStyle.fillColor
                  })
                })
              }),
              type: "Point"
            });
            context.interactionCurrent.on("drawend", function (deEv) {
              // creation overlay pour saisie du label
              var popupOvl = null;
              /**
              * Enregistrement de la valeur saisie dans l'input.
              *
              * @param {String} key - clef du label
              * @param {String} value - valeur du label
              * @param {Boolean} save - true si on garde le label.
              */
              var setTextValue = function setTextValue(key, value, save) {
                context.getMap().removeOverlay(popupOvl);
                if (!save) {
                  // removes feature from overlay.
                  context.layer.getSource().removeFeature(deEv.feature);
                  return;
                }
                var obj = {};
                obj[key] = value;
                deEv.feature.setProperties(obj);
                deEv.feature.setStyle(new ol_style__WEBPACK_IMPORTED_MODULE_8__.Style({
                  // HACK : on ajoute un icone invisible de 1x1 pixel afin d'eviter
                  // l'affichage d'une punaise google !
                  image: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Icon(context._getIconStyleOptions(context.options.defaultStyles.textIcon1x1)),
                  text: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Text({
                    textAlign: "left",
                    font: "16px sans",
                    text: value,
                    fill: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Fill({
                      color: context.options.defaultStyles.textFillColor
                    }),
                    stroke: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Stroke({
                      color: context.options.defaultStyles.textStrokeColor,
                      width: 3
                    })
                  })
                }));
              };
              var popup = _this8._createLabelDiv({
                applyFunc: setTextValue,
                inputId: context._addUID("label-input"),
                geomType: "Text",
                key: "name",
                placeholder: "Saisir un label..."
              });
              popupOvl = new (ol_Overlay__WEBPACK_IMPORTED_MODULE_4___default())({
                element: popup,
                // FIXME : autres valeurs.
                positioning: "top-center" // par defaut, top-left...
                // stopEvent : false
              });
              context.getMap().addOverlay(popupOvl);
              popupOvl.setPosition(deEv.feature.getGeometry().getCoordinates());
              document.getElementById(_this8._addUID("label-input")).focus();
            });
          }
          break;
        case this._addUID("drawing-tool-edit"):
          if (context.dtOptions["edit"].active) {
            this.featuresCollectionSelected = new (ol_Collection__WEBPACK_IMPORTED_MODULE_3___default())();
            context.interactionSelectEdit = new ol_interaction__WEBPACK_IMPORTED_MODULE_10__.Select({
              condition: ol_events_condition__WEBPACK_IMPORTED_MODULE_11__.singleClick,
              layers: [this.layer],
              features: this.featuresCollectionSelected
            });
            context.interactionSelectEdit.on("select", function (e) {
              // ...
            });
            context.interactionSelectEdit.setProperties({
              name: "Drawing",
              source: context
            });
            map.addInteraction(context.interactionSelectEdit);
            context.interactionCurrent = new ol_interaction__WEBPACK_IMPORTED_MODULE_10__.Modify({
              stopClick: true,
              // features : context.layer.getSource().getFeaturesCollection(),
              features: this.interactionSelectEdit.getFeatures(),
              style: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Style({
                image: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Circle({
                  radius: this.options.cursorStyle.radius,
                  stroke: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Stroke({
                    color: this.options.cursorStyle.strokeColor,
                    width: this.options.cursorStyle.strokeWidth
                  }),
                  fill: new ol_style__WEBPACK_IMPORTED_MODULE_8__.Fill({
                    color: this.options.cursorStyle.fillColor
                  })
                })
              })
              // deleteCondition : function (/* event */) { return false },
              // insertVertexCondition : function (/* event */) { return false }
            });
            context.interactionCurrent.on("modifyend", function (deEv) {
              var feature = deEv.features.item(0);
              context._updateMeasure(feature);
            });
          }
          break;
        case this._addUID("drawing-tool-display"):
          if (context.dtOptions["display"].active) {
            context.interactionCurrent = this._createStylingInteraction();
          }
          break;
        case this._addUID("drawing-tool-tooltip"):
          if (context.dtOptions["tooltip"].active) {
            context.interactionCurrent = this._createLabelInteraction();
          }
          break;
        case this._addUID("drawing-tool-remove"):
          if (context.dtOptions["remove"].active) {
            context.interactionCurrent = context._createRemoveInteraction();
          }
          break;
        default:
          logger.trace("unhandled tool type");
      }
      if (context.interactionCurrent) {
        context.interactionCurrent.setProperties({
          name: "Drawing",
          source: this
        });
        map.addInteraction(context.interactionCurrent);
      }
      logger.log("interactions", map.getInteractions());
    }

    // ################################################################### //
    // ####################### handlers events to dom #################### //
    // ################################################################### //

    /**
     * this method is called by event 'click' on 'GPshowDrawingPicto' tag label
     * (cf. this._createShowDrawingPictoElement),
     * and toggles event 'mousemove' on map.
     *
     * @method onShowDrawingClick
     * @private
     */
  }, {
    key: "onShowDrawingClick",
    value: function onShowDrawingClick() {
      var map = this.getMap();
      // on supprime toutes les interactions
      _Utils_Interactions__WEBPACK_IMPORTED_MODULE_14__["default"].unset(map);
      var opened = this._showDrawingButton.ariaPressed;
      this.collapsed = !(opened === "true"); // on génère nous même l'evenement OpenLayers de changement de propriété
      // (utiliser mousePosition.on("change:collapsed", function(e) ) pour s'abonner à cet évènement)
      this.dispatchEvent("change:collapsed");

      // on deselectionne les Tools
      for (var toolsType in this.dtOptions) {
        if (this.dtOptions.hasOwnProperty(toolsType)) {
          if (this.dtOptions[toolsType].active) {
            var toolsId = this._addUID("drawing-tool-" + this.dtOptions[toolsType].id);
            document.getElementById(toolsId).className = "drawing-tool";
            this.dtOptions[toolsType].active = false;
          }
        }
      }
    }

    /**
     * this method is called by event 'click' on 'drawing-export' tag button.
     *
     * @method onExportFeatureClick
     * @private
     */
  }, {
    key: "onExportFeatureClick",
    value: function onExportFeatureClick() {
      var content = this.exportFeatures();
      if (!content) {
        return;
      }
      var link = document.createElement("a");
      // FIXME : determiner le bon charset !
      var charset = "utf-8";
      link.setAttribute("href", "data:" + this._exportMimeType + ";charset=" + charset + "," + encodeURIComponent(content));
      link.setAttribute("download", this.getExportName() + this._exportExt);
      if (document.createEvent) {
        var event = document.createEvent("MouseEvents");
        event.initEvent("click", true, true);
        link.dispatchEvent(event);
      } else {
        link.click();
      }
    }
  }]);
}(_Control__WEBPACK_IMPORTED_MODULE_1__["default"]), _defineProperty(_Drawing, "DefaultTools", {
  points: true,
  lines: true,
  polygons: true,
  holes: false,
  text: true,
  remove: true,
  display: true,
  tooltip: true,
  edit: true,
  "export": true,
  measure: false
}), _defineProperty(_Drawing, "DefaultLabels", {
  control: "Annoter la carte",
  creatingTools: "Outils de création",
  points: "Placer des points",
  lines: "Dessiner des lignes",
  polygons: "Dessiner des polygones",
  holes: "Créer des trous sur un polygone",
  text: "Ecrire sur la carte",
  editingTools: "Outils d'édition",
  edit: "Editer les tracés",
  display: "Modifier l'apparence des objets",
  tooltip: "Modifier les textes / infos-bulles",
  remove: "Supprimer des objets",
  "export": "Exporter",
  exportTitle: "Exporter en KML",
  applyToObject: "Appliquer à l'objet",
  saveDescription: "Enregistrer",
  setAsDefault: "Définir par défaut",
  strokeColor: "Couleur du trait : ",
  strokeWidth: "Epaisseur du trait : ",
  fillColor: "Couleur de remplissage : ",
  fillOpacity: "Opacité du remplissage : ",
  markerSize: "Taille du pictogramme : ",
  markerColor: "Couleur du pictogramme : ",
  labelDisplay: "Afficher le label : "
}), _defineProperty(_Drawing, "DefaultStyles", {
  textFillColor: "#000000",
  textStrokeColor: "#FFFFFF",
  textStrokeWidth: 6,
  // INFO : cette option n'est pas surchargeable via les options du constructeur !
  textIcon1x1: {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNiYAAAAAkAAxkR2eQAAAAASUVORK5CYII=",
    anchor: [0, 0]
  },
  polyFillColor: "#ffffff",
  polyFillOpacity: 0.4,
  polyStrokeColor: "#ffcc33",
  polyStrokeWidth: 4,
  strokeColor: "#ffcc33",
  strokeWidth: 4,
  markerSize: 1,
  markerColor: "#ffcc33",
  // INFO : cette option n'est pas surchargeable via les options du constructeur !
  labelDisplay: true
}), _defineProperty(_Drawing, "DefaultCursorStyle", {
  radius: 6,
  strokeColor: "#FFF",
  strokeWidth: 1,
  fillColor: "rgba(0, 153, 255, 1)"
}), _Drawing);

// on récupère les méthodes de la classe commune Drawing
Object.assign(Drawing.prototype, _DrawingDOM__WEBPACK_IMPORTED_MODULE_19__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Drawing);

// Expose Drawing as ol.control.Drawing (for a build bundle)
if (window.ol && window.ol.control) {
  window.ol.control.Drawing = Drawing;
}
})();

Drawing = __webpack_exports__["default"];
/******/ })()
;
//# sourceMappingURL=Drawing.js.map