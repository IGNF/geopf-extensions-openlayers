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

/***/ "./src/packages/Controls/Editor/EditorDOM.js":
/*!***************************************************!*\
  !*** ./src/packages/Controls/Editor/EditorDOM.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var EditorDOM = {
  /**
  * Add uuid to the tag ID
  * @param {String} id - id selector
  * @returns {String} uid - id selector with an unique id
  */
  _addUID: function _addUID(id) {
    var uid = this._uid ? id + "-" + this._uid : id;
    return uid;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EditorDOM);

/***/ }),

/***/ "./src/packages/Controls/Editor/Event.js":
/*!***********************************************!*\
  !*** ./src/packages/Controls/Editor/Event.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
* managing events
*
* See {@link http://krasimirtsonev.com/blog/article/javascript-managing-events-dispatch-listen}
* See {@link https://github.com/krasimir/EventBus}
*
* @property {Event} "editor:layer:onclickvisibility" - event ...
* @property {Event} "editor:layer:onclickclone" - event ...
* @property {Event} "editor:layer:onclickremove" - event ...
* @property {Event} "editor:style:oneditjson" - event ...
* @property {Event} "editor:style:scale:onchangemin" - event ...
* @property {Event} "editor:style:scale:onchangemax" - event ...
* @property {Event} "editor:legend:onclickedition" - event ...
* @property {Event} "editor:legend:onchangevalue" - event ...
* @property {Event} "editor:filter:oneditjson" - event ...
* @property {Event} "editor:themes:onclickimage" - event ...
* @property {Event} "editor:themes:onclicktitle" - event ...
* @property {Event} "editor:search:onsubmit" - event ...
* @property {Event} "editor:search:onautocomplete" - event ...
* @property {Event} "editor:group:oncollapse" - event ...
* @property {Event} "editor:onloaded" - event ...
*
* @mixin
*
* @example
* // dispatch event
* EventBus.dispatch(EventEditor.layer.visibility, e);
* // listener
* EventBus.addEventListener(EventEditor.layer.visibility, function (e) {...}, this);
*/
var EventEditor = {
  /** evenement sur la fin de chargement de l'editeur */
  onloaded: "editor:onloaded",
  layer: {
    /** evenement sur la visibilité : clic sur le bouton 'oeil' */
    onclickvisibility: "editor:layer:onclickvisibility",
    /** evenement sur la duplication : clic sur le bouton
    (not yet implemented !) */
    onclickclone: "editor:layer:onclickclone",
    /** evenement sur la suppression : clic sur le bouton
    (not yet implemented !) */
    onclickremove: "editor:layer:onclickremove"
  },
  legend: {
    /** evenement sur l'affichage du mode edition */
    onclickedition: "editor:legend:onclickedition",
    /** evenement sur la modification d'une valeur */
    onchangevalue: "editor:legend:onchangevalue"
  },
  group: {
    /**  evenement pour deplier/plier le groupe
    (not yet implemented !) */
    oncollapse: "editor:group:oncollapse"
  },
  style: {
    /** evenement sur l'édition du style
    (not yet implemented !) */
    oneditjson: "editor:style:oneditjson",
    /** evenement sur la modification de l'echelle d'affichage */
    scale: {
      onchangemin: "editor:style:scale:onchangemin",
      onchangemax: "editor:style:scale:onchangemax"
    }
  },
  filter: {
    /** evenement sur l'édition du filtre
    (not yet implemented !) */
    oneditjson: "editor:filter:oneditjson"
  },
  themes: {
    /** evenement sur le clic de l'image */
    onclickimage: "editor:themes:onclickimage",
    /** evenement sur le clic du titre */
    onclicktitle: "editor:themes:onclicktitle"
  },
  search: {
    /** evenement sur la recherche */
    onsubmit: "editor:search:onsubmit",
    onautocomplete: "editor:search:onautocomplete"
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EventEditor);

/***/ }),

/***/ "./src/packages/Controls/Editor/Filter.js":
/*!************************************************!*\
  !*** ./src/packages/Controls/Editor/Filter.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var eventbusjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! eventbusjs */ "./node_modules/eventbusjs/lib/eventbus.min.js");
/* harmony import */ var eventbusjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(eventbusjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Event */ "./src/packages/Controls/Editor/Event.js");
/* harmony import */ var _Utils_Helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utils/Helper */ "./src/packages/Utils/Helper.js");
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Utils/LoggerByDefault */ "./src/packages/Utils/LoggerByDefault.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




var logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_3__["default"].getLogger("editor-filter");

/**
 * @classdesc
 *
 * MapBox filter management
 *
 * @constructor
 * @alias ol.style.editor.Filter
 * @param {Object} options - options for function call.
 * @example
 *   var filter = new Filter ({
 *      target : ...,
 *      position : 1, // identifiant de position (unique !)
 *      tools : {
 *          edition : false
 *      },
 *      title : "Filtres (JSON)",
 *      obj : {
 *          filter : []
 *      }
 *   });
 *  filter.add();
 *  filter.display(true);
 *  filter.getContainer();
 */
var Filter = /*#__PURE__*/function () {
  function Filter(options) {
    _classCallCheck(this, Filter);
    logger.trace("[constructor] Filter", options);

    // options
    this.options = options || {
      // default...
      target: null,
      position: 0,
      tools: null,
      title: null,
      obj: null
    };
    if (!(this instanceof Filter)) {
      throw new TypeError("ERROR CLASS_CONSTRUCTOR");
    }
    this._initialize();
    this._initContainer();
  }

  /**
   * Initialize component
   * (called by constructor)
   *
   * @private
   */
  return _createClass(Filter, [{
    key: "_initialize",
    value: function _initialize() {
      // unique editor id (optional!)
      this.id = this.options.id || null;
      if (!this.options.target) {
        // cf. add()
      }
      if (!this.options.position) {
        this.options.position = 0;
      }
      var _toolsDefault = {
        edition: false
      };
      if (!this.options.tools) {
        this.options.tools = _toolsDefault;
      }
      _Utils_Helper__WEBPACK_IMPORTED_MODULE_2__["default"].mergeParams(this.options.tools, _toolsDefault, false);
      if (!this.options.obj) {
        // choix d'avoir un objet vide pour une edition futur...
        this.options.obj = {
          filter: []
        };
      }
      if (!this.options.title) {
        this.options.title = "JSON Filtres :";
      }
      this.container = null;

      // DOM : className or id
      this.name = {
        target: "GPEditorMapBoxFilterTarget",
        container: "GPEditorMapBoxFilterContainer",
        containerjson: "GPEditorMapBoxFilterJsonContainer",
        jsonlabel: "GPEditorMapBoxFilterTitleJson",
        jsondisplay: "GPEditorMapBoxFilterDisplayJson",
        containertoolsedit: "GPEditorMapBoxFilterToolsEditionContainer"
      };
    }

    /**
     * Graphical rendering of the component
     * (called by constructor)
     *
     * @private
     * @example
     * <div class="GPEditorMapBoxFilterContainer">
     *  <div class ="GPEditorMapBoxFilterJsonontainer">
     *     <label class="GPEditorMapBoxFilterTitleJson">JSON Filtres :</label>
     *     <pre class="GPEditorMapBoxFilterDisplayJson">...</pre>
     *  </div>
     *  <div class ="GPEditorMapBoxStyleToolsEditionContainer"></div>
     * </div>
     */
  }, {
    key: "_initContainer",
    value: function _initContainer() {
      // contexte
      var self = this;
      var _found = false;
      var _filter = JSON.parse(JSON.stringify(this.options.obj)); // on manipule une copie  !

      // FIXME tag filter est obselete !
      // on doit utiliser les expressions dans "paint" ou "layout" !
      if (_filter.filter) {
        _found = true;
        if (_filter.filter.length === 0) {
          logger.info("tag 'filter' is empty !");
        }
      }
      var div = document.createElement("div");
      div.className = this.name.container;
      var json = null;
      if (_found) {
        json = JSON.stringify(_filter.filter, null, 4);
      }
      var divJson = document.createElement("div");
      divJson.className = this.name.containerjson;
      var labelJson = document.createElement("label");
      labelJson.className = this.name.jsonlabel;
      labelJson.innerHTML = this.options.title;
      divJson.appendChild(labelJson);
      var preJson = document.createElement("pre");
      preJson.className = this.name.jsondisplay;
      preJson.innerHTML = json;
      if (preJson.addEventListener) {
        preJson.addEventListener("click", function (e) {
          if (self.options.tools.edition) {
            self.onEditJsonFilterMapBox(e);
          }
        });
      } else if (preJson.attachEvent) {
        preJson.attachEvent("onclick", function (e) {
          if (self.options.tools.edition) {
            self.onEditJsonFilterMapBox(e);
          }
        });
      }
      divJson.appendChild(preJson);
      div.appendChild(divJson);
      if (this.options.tools.edition) {
        var divEdit = document.createElement("div");
        divEdit.className = this.name.containertoolsedit;
        div.appendChild(divEdit);
      }

      // main container
      this.container = div;
    }

    // ################################################################### //
    // ##################### public methods ############################## //
    // ################################################################### //
    /**
     * Add element into target DOM
     * @returns {Object} - Legend instance
     */
  }, {
    key: "add",
    value: function add() {
      if (!this.options.target) {
        if (!document.getElementById(this.name.target)) {
          var div = document.createElement("div");
          div.id = this.name.target;
          var node = document.documentElement || document.getElementsByTagName("body")[0] || document.getElementsByTagName("head")[0];
          node.appendChild(div);
        }
        this.options.target = document.getElementById(this.name.target);
      }
      if (this.container) {
        this.options.target.appendChild(this.container);
      }
      return this;
    }

    /**
     * Set display container or get
     *
     * @param {Boolean} display - show/hidden container or get status
     * @returns {Boolean} - true/false
     */
  }, {
    key: "display",
    value: function display(_display) {
      logger.trace("display()", _display);
      if (typeof _display !== "undefined") {
        this.container.style.display = _display ? "flex" : "none";
      }
      return this.container.style.display === "flex";
    }

    /**
     * Get container (DOM)
     *
     * @returns {DOMElement} DOM element
     */
  }, {
    key: "getContainer",
    value: function getContainer() {
      return this.container;
    }

    // ################################################################### //
    // ####################### handlers events to dom #################### //
    // ################################################################### //
    /**
     * this method is called by event '' on '' tag form...
     *
     * 'e' contains the option object into 'e.target.data' !
     * 'e' contains the id editor into 'e.target.editorID' !
     *
     * @param {Object} e - HTMLElement
     * @private
     * @fires Filter#editor:style:oneditjson
     */
  }, {
    key: "onEditJsonFilterMapBox",
    value: function onEditJsonFilterMapBox(e) {
      logger.trace("onEditJsonFilterMapBox", e);
      e.editorID = this.id;
      e.data = this.options;
      eventbusjs__WEBPACK_IMPORTED_MODULE_0___default().dispatch(_Event__WEBPACK_IMPORTED_MODULE_1__["default"].filter.oneditjson, e);
    }
  }]);
}();
;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Filter);

/***/ }),

/***/ "./src/packages/Controls/Editor/Group.js":
/*!***********************************************!*\
  !*** ./src/packages/Controls/Editor/Group.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var eventbusjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! eventbusjs */ "./node_modules/eventbusjs/lib/eventbus.min.js");
/* harmony import */ var eventbusjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(eventbusjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Event */ "./src/packages/Controls/Editor/Event.js");
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utils/LoggerByDefault */ "./src/packages/Utils/LoggerByDefault.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



var logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_2__["default"].getLogger("editor-group");

/**
 * @classdesc
 *
 * MapBox group management
 *
 * @constructor
 * @alias ol.style.editor.Group
 * @param {Object} options - options for function call.
 * @example
 *   var group = new Group ({
 *      title : "MyGroup",
 *      collapse : true, // plier/deplier
 *      target : ...
 *   });
 *   group.add();
 *   group.add();
 */
var Group = /*#__PURE__*/function () {
  function Group(options) {
    _classCallCheck(this, Group);
    logger.trace("[constructor] Group", options);

    // options
    this.options = options || {
      // default...
    };
    if (!(this instanceof Group)) {
      throw new TypeError("ERROR CLASS_CONSTRUCTOR");
    }
    this._initialize();
    this._initContainer();
  }

  /**
   * Initialize component
   * (called by constructor)
   *
   * @private
   */
  return _createClass(Group, [{
    key: "_initialize",
    value: function _initialize() {
      // unique editor id (optional!)
      this.id = this.options.id || null;
      if (!this.options.target) {
        // cf. add()
      }
      if (!this.options.title) {
        // cf. summary
        this.options.title = "Détails du groupe...";
      }

      // plier par defaut
      if (typeof this.options.collapse === "undefined") {
        this.options.collapse = true;
      }
      this.container = null;

      // DOM : className or id
      this.name = {
        target: "GPEditorMapBoxGroupTarget",
        container: "GPEditorMapBoxGroupContainer",
        details: "GPEditorMapBoxGroupDetails",
        summary: "GPEditorMapBoxGroupSummary"
      };
    }

    /**
     * Graphical rendering of the component
     * (called by constructor)
     *
     * @private
     * @example
     * <div class="GPEditorMapBoxGroupContainer">...</div>
     */
  }, {
    key: "_initContainer",
    value: function _initContainer() {
      var div = document.createElement("div");
      div.className = this.name.container;

      // FIXME pas compatible IE !
      // https://caniuse.com/#search=details
      // cf. https://css-tricks.com/quick-reminder-that-details-summary-is-the-easiest-way-ever-to-make-an-accordion/
      var details = document.createElement("details");
      details.className = this.name.details;
      details.open = !this.options.collapse;
      div.appendChild(details);
      var summary = document.createElement("summary");
      summary.className = this.name.summary;
      summary.innerHTML = this.options.title;
      details.appendChild(summary);

      // main container
      this.container = div;
    }

    // ################################################################### //
    // ##################### public methods ############################## //
    // ################################################################### //
    /**
     * Add element into target DOM
     */
  }, {
    key: "add",
    value: function add() {
      if (!this.options.target) {
        if (!document.getElementById(this.name.target)) {
          var div = document.createElement("div");
          div.id = this.name.target;
          var node = document.documentElement || document.getElementsByTagName("body")[0] || document.getElementsByTagName("head")[0];
          node.appendChild(div);
        }
        this.options.target = document.getElementById(this.name.target);
      }
      if (this.container) {
        this.options.target.appendChild(this.container);
      }
    }

    /**
     * Set display container (DOM)
     *
     * @param {Boolean} display - show/hidden container
     */
  }, {
    key: "display",
    value: function display(_display) {
      this.container.style.display = _display ? "flex" : "none";
    }

    /**
     * Get container (DOM)
     *
     * @returns {DOMElement} DOM element
     */
  }, {
    key: "getContainer",
    value: function getContainer() {
      var nodes = this.container.childNodes;
      if (nodes.length) {
        // retourne le noeud "details" !
        return nodes[0];
      }
      // sinon le container principal
      return this.container;
    }

    // ################################################################### //
    // ####################### handlers events to dom #################### //
    // ################################################################### //
    /**
     * this method is called by event '' on '' tag form
     *
     * NOT USED !
     * @param {Object} e - HTMLElement
     * @private
     * @fires Group#editor:group:oncollapse
     */
  }, {
    key: "onCollapseGroupMapBox",
    value: function onCollapseGroupMapBox(e) {
      logger.trace("onCollapseGroupMapBox", e);
      e.editorID = this.id;
      e.data = this.options;
      eventbusjs__WEBPACK_IMPORTED_MODULE_0___default().dispatch(_Event__WEBPACK_IMPORTED_MODULE_1__["default"].group.oncollapse, e);
    }
  }]);
}();
;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Group);

/***/ }),

/***/ "./src/packages/Controls/Editor/Layer.js":
/*!***********************************************!*\
  !*** ./src/packages/Controls/Editor/Layer.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var eventbusjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! eventbusjs */ "./node_modules/eventbusjs/lib/eventbus.min.js");
/* harmony import */ var eventbusjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(eventbusjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Event */ "./src/packages/Controls/Editor/Event.js");
/* harmony import */ var _Style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Style */ "./src/packages/Controls/Editor/Style.js");
/* harmony import */ var _Legend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Legend */ "./src/packages/Controls/Editor/Legend.js");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Filter */ "./src/packages/Controls/Editor/Filter.js");
/* harmony import */ var _Utils_Helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Utils/Helper */ "./src/packages/Utils/Helper.js");
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Utils/LoggerByDefault */ "./src/packages/Utils/LoggerByDefault.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }







var logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_6__["default"].getLogger("editor-layer");

/**
 * @classdesc
 *
 * MapBox filter management
 *
 * @constructor
 * @alias ol.style.editor.Layer
 * @param {Object} options - options for function call.
 * @example
 *   var layers = new Layer ({
 *      target : ...,
 *      position : 1, // identifiant de position (unique !)
 *      tools : {
 *          "visibility" : true, // afficher l'icone de visibilité
 *          "icon" : {
 *              "image" : true, // afficher l'icone "oeil" (defaut) ou une checkbox
 *              "anchor" : "start" | "end"  // afficher l'icone au debut ou à la fin (defaut)
 *          },
 *          "type" : true,       // afficher l'icone du type de geometrie
 *          "pin" : true,        // afficher l'icone de puce
 *          "remove" : false,    // TODO afficher l'icone de suppression
 *          "clone" : false      // TODO afficher l'icone de duplication
 *      },
 *      obj : {
 *          "id": "ocs - vegetation", // MANDATORY
 *          "type": "fill", // OPTIONAL
 *          "source": "pyramide_proto", // OPTIONAL
 *          "source-layer": "ocs_vegetation_surf" // OPTIONAL
 *      }
 *   });
 *  layers.addLegend(oLegend);
 *  layers.slotLegend();
 *  layers.addStyle(oStyle);
 *  layers.addFilter(oFilter);
 *  layers.add();
 *  layers.active(false);
 *  layers.visibility(false);
 *  layers.display(false);
 *  layers.collapse();
 *  EventBus.addEventListener("editor:layer:onclickvisibility", function (e) {
 *     // e.target.data : options !
 *     // e.target.editorID : id or null
 *   }, this);
 */
var Layer = /*#__PURE__*/function () {
  function Layer(options) {
    _classCallCheck(this, Layer);
    logger.trace("[constructor] Layer", options);

    // options
    this.options = options || {};
    if (!(this instanceof Layer)) {
      throw new TypeError("ERROR CLASS_CONSTRUCTOR");
    }
    this._initialize();
    this._initContainer();
  }

  // ################################################################### //
  // ##################### private methods ############################# //
  // ################################################################### //
  /**
   * Initialize component
   * (called by constructor)
   *
   * @private
   */
  return _createClass(Layer, [{
    key: "_initialize",
    value: function _initialize() {
      // unique editor id (optional!)
      this.id = this.options.id || null; // null si le layer n'appartient pas à un editeur !

      if (!this.options.target) {
        // cf. add()
      }
      if (!this.options.position) {
        this.options.position = 0;
      }
      var _toolsDefault = {
        visibility: true,
        icon: {
          image: true,
          anchor: "end"
        },
        type: true,
        pin: true,
        remove: false,
        // TODO
        clone: false // TODO
      };
      if (!this.options.tools) {
        this.options.tools = _toolsDefault;
      }
      _Utils_Helper__WEBPACK_IMPORTED_MODULE_5__["default"].mergeParams(this.options.tools, _toolsDefault, false);
      var _objDefault = {
        id: "",
        type: "",
        // icone sur le type de geometrie
        source: "",
        "source-layer": ""
      };
      if (!this.options.obj) {
        this.options.obj = _objDefault;
      }
      _Utils_Helper__WEBPACK_IMPORTED_MODULE_5__["default"].mergeParams(this.options.obj, _objDefault, false);

      // legende intégrée
      this.bSlotLegend = false;

      // obj
      this.oFilter = null;
      this.oStyle = null;
      this.oLegend = null;

      // dom
      this.container = null;
      this.DomVisibility = null;
      this.DomToggle = null;

      // DOM : className or id
      this.name = {
        target: "GPEditorMapBoxLayerTarget",
        container: "GPEditorMapBoxLayerContainer",
        containerlegend: "GPEditorMapBoxLayerLegendContainer",
        containertitle: "GPEditorMapBoxLayerTitleContainer",
        imagelabelinput: "GPEditorMapBoxLayerImageInput",
        imagelabel: "GPEditorMapBoxLayerImageLabel",
        typeimg: "GPEditorMapBoxLayerTypeImage",
        titleinput: "GPEditorMapBoxLayerTitleInput",
        titlelabel: "GPEditorMapBoxLayerTitleLabel",
        containertools: "GPEditorMapBoxToolsContainer",
        visibilityinput: "GPEditorMapBoxToolsVisibilityInput",
        visibilitylabel: "GPEditorMapBoxToolsVisibilityLabel",
        visibilityinputdisable: "GPEditorMapBoxToolsVisibilityInputDisable",
        visibilitylabeldisable: "GPEditorMapBoxToolsVisibilityLabelDisable"
      };
    }

    /**
     * Graphical rendering of the component
     * (called by constructor)
     *
     * @private
     * @example
     * // >> Titre 1          |OOO| <- menu tools : visibility, clone, remove
     * // >> Titre 2          |OXX| <- affichage configurable (cf. options.tools)
     * // Event : clic sur le titre -> ex. affiche le menu des styles / filtres
     * //       : clic visibility, clone, remove
     * // DOM :
     *      <div class="GPEditorMapBoxLayerContainer">
     *          <div id="GPEditorMapBoxLayerTitleContainer-45" class="GPEditorMapBoxLayerTitleContainer">
     *              <input id="GPEditorMapBoxLayerImageInput-45" class="GPEditorMapBoxLayerImageInput" type="checkbox">
     *              <label class="GPEditorMapBoxLayerImageLabel" for="GPEditorMapBoxLayerImageInput-45"></label>
     *              <input id="GPEditorMapBoxLayerTitleInput-45" class="GPEditorMapBoxLayerTitleInput" type="checkbox">
     *              <label class="GPEditorMapBoxLayerTitleLabel" for="GPEditorMapBoxLayerTitleInput-45" title="...">...</label>
     *          </div>
     *          <div id="GPEditorMapBoxToolsContainer-45" class="GPEditorMapBoxToolsContainer">
     *              <input id="GPEditorMapBoxToolsVisibilityInput-45" type="checkbox" class="GPEditorMapBoxToolsVisibilityInput">
     *              <label for="GPEditorMapBoxToolsVisibilityInput-45" id="GPEditorMapBoxToolsVisibilityLabel-45" class="GPEditorMapBoxToolsVisibilityLabel" title="Afficher/masquer la couche"></label>
     *          </div>
     *      </div>
     */
  }, {
    key: "_initContainer",
    value: function _initContainer() {
      // contexte
      var self = this;
      var obj = this.options.obj;
      var div = document.createElement("div");
      div.className = this.name.container;

      // title
      var divTitle = document.createElement("div");
      divTitle.id = this.name.containertitle + "-" + this.options.position;
      divTitle.className = this.name.containertitle;

      // puce
      if (this.options.tools.pin) {
        // Optionnel !
        // input
        var inputImage = document.createElement("input");
        inputImage.id = this.name.imagelabelinput + "-" + this.options.position;
        inputImage.className = this.name.imagelabelinput;
        inputImage.type = "checkbox";
        divTitle.appendChild(inputImage);
        // puce
        var labelImage = document.createElement("label");
        labelImage.className = this.name.imagelabel;
        labelImage.htmlFor = inputImage.id;
        if (labelImage.addEventListener) {
          labelImage.addEventListener("click", function (e) {
            self.onClickLayerMapBox(e);
          });
        } else if (labelImage.attachEvent) {
          labelImage.attachEvent("onclick", function (e) {
            self.onClickLayerMapBox(e);
          });
        }
        divTitle.appendChild(labelImage);
      }

      // tools :
      // visibility, (remove, clone)
      var _addTools = function _addTools() {
        var divTools = document.createElement("div");
        divTools.id = this.name.containertools + "-" + this.options.position;
        divTools.className = this.name.containertools;

        // visibility
        if (this.options.tools.visibility) {
          var inputTools = document.createElement("input");
          inputTools.id = this.name.visibilityinput + "-" + this.options.position;
          inputTools.className = this.options.tools.icon.image ? this.name.visibilityinput : this.name.visibilityinputdisable;
          inputTools.type = "checkbox";
          inputTools.checked = "checked"; // par défaut, à modifier via visibility(true|false) !

          // event for visibility change
          if (inputTools.addEventListener) {
            inputTools.addEventListener("click", function (e) {
              self.onVisibilityLayerMapBox(e);
            });
          } else if (inputTools.attachEvent) {
            // internet explorer
            inputTools.attachEvent("onclick", function (e) {
              self.onVisibilityLayerMapBox(e);
            });
          }
          divTools.appendChild(inputTools);
          // enregistrement utile pour la méthode : visibility()
          this.DomVisibility = inputTools;
          var labelTools = document.createElement("label");
          labelTools.htmlFor = this.name.visibilityinput + "-" + this.options.position;
          labelTools.id = this.name.visibilitylabel + "-" + this.options.position;
          labelTools.className = this.options.tools.icon.image ? this.name.visibilitylabel : this.name.visibilitylabeldisable;
          labelTools.title = "Afficher/masquer la couche";
          divTools.appendChild(labelTools);
          div.appendChild(divTools);
        }

        // clone
        if (this.options.tools.clone) {
          // TODO...
          logger.warn("Dom for tools clone, it's not yet implemented !");
        }

        // remove
        if (this.options.tools.remove) {
          // TODO...
          logger.warn("Dom for tools remove, it's not yet implemented !");
        }
      };

      // ajout des outils au debut du composant
      if (this.options.tools.icon.anchor === "start") {
        _addTools.apply(this);
      }

      // type
      if (this.options.tools.type && obj.type) {
        // Optionnel !
        var imgType = document.createElement("img");
        imgType.className = this.name.typeimg;
        // FIXME il faudrait faire la difference entre :
        // - icone uniquement : SYMBOL-ICON
        // - texte uniquement : SYMBOL-TEXT
        // - les 2 : SYMBOL
        // Mais il nous faut les styles complets (paint & layout)
        // pour determiner les 3 types !
        switch (obj.type.toUpperCase()) {
          case "SYMBOL-ICON":
            // not used !
            imgType.style["background-position"] = "0px 0";
            break;
          case "SYMBOL-TEXT":
            // not used !
            imgType.style["background-position"] = "-194px 0";
            break;
          case "SYMBOL":
            imgType.style["background-position"] = "-84px 0";
            break;
          case "LINE":
            imgType.style["background-position"] = "-28px 0";
            break;
          case "FILL":
            imgType.style["background-position"] = "-56px 0";
            break;
          case "BACKGROUND":
            imgType.style["background-position"] = "-140px 0";
            break;
          case "CIRCLE":
            imgType.style["background-position"] = "-168px 0";
            break;
          default:
            // type inconnu ou non pris en charge ou par defaut
            imgType.style["background-position"] = "-112px 0";
        }
        divTitle.appendChild(imgType);
      }

      // container legend (empty)
      var divLegend = document.createElement("div");
      divLegend.id = this.name.containerlegend + "-" + this.options.position;
      divLegend.className = this.name.containerlegend;
      divTitle.appendChild(divLegend);

      // input
      var inputTitle = document.createElement("input");
      inputTitle.id = this.name.titleinput + "-" + this.options.position;
      inputTitle.className = this.name.titleinput;
      inputTitle.type = "checkbox";
      divTitle.appendChild(inputTitle);

      // label for
      var labelTitle = document.createElement("label");
      labelTitle.className = this.name.titlelabel;
      labelTitle.htmlFor = inputTitle.id;
      labelTitle.innerHTML = obj["id"] || obj["source-layer"] || obj["source"];
      labelTitle.title = obj["source-layer"] || obj["source"] || obj["id"];
      if (labelTitle.addEventListener) {
        labelTitle.addEventListener("click", function (e) {
          self.onClickLayerMapBox(e);
        });
      } else if (labelTitle.attachEvent) {
        labelTitle.attachEvent("onclick", function (e) {
          self.onClickLayerMapBox(e);
        });
      }
      divTitle.appendChild(labelTitle);
      // enregistrement utile pour la méthode : collapse()
      this.DomToggle = labelTitle;
      div.appendChild(divTitle);

      // ajout des outils au fin du composant
      if (this.options.tools.icon.anchor === "end") {
        _addTools.apply(this);
      }

      // main container
      this.container = div;
    }

    // ################################################################### //
    // ##################### public methods ############################## //
    // ################################################################### //
    /**
     * Add element into target DOM
     * @returns {Object} - Layer instance
     */
  }, {
    key: "add",
    value: function add() {
      logger.trace("add()");
      if (!this.options.target) {
        if (!document.getElementById(this.name.target)) {
          var div = document.createElement("div");
          div.id = this.name.target;
          var node = document.documentElement || document.getElementsByTagName("body")[0] || document.getElementsByTagName("head")[0];
          node.appendChild(div);
        }
        this.options.target = document.getElementById(this.name.target);
      }
      if (this.container) {
        this.options.target.appendChild(this.container);
      }
      return this;
    }

    /**
     * Add style in the submenu
     *
     * @param {Object} style - style object
     */
  }, {
    key: "addStyle",
    value: function addStyle(style) {
      logger.trace("addStyle()", style);
      if (style && _typeof(style) === "object" && style instanceof _Style__WEBPACK_IMPORTED_MODULE_2__["default"]) {
        this.oStyle = style;
        this.oStyle.display(false); // par defaut !
      }
    }

    /**
     * Add filter in the submenu
     *
     * @param {Object} filter - filter object
     */
  }, {
    key: "addFilter",
    value: function addFilter(filter) {
      logger.trace("addFilter()", filter);
      if (filter && _typeof(filter) === "object" && filter instanceof _Filter__WEBPACK_IMPORTED_MODULE_4__["default"]) {
        this.oFilter = filter;
        this.oFilter.display(false); // par defaut !
      }
    }

    /**
     * Add Legend in the submenu
     *
     * @param {Object} legend - legend object
     */
  }, {
    key: "addLegend",
    value: function addLegend(legend) {
      logger.trace("addLegend()", legend);
      if (legend && _typeof(legend) === "object" && legend instanceof _Legend__WEBPACK_IMPORTED_MODULE_3__["default"]) {
        this.oLegend = legend;
        this.oLegend.display(false); // par defaut !
      }
    }

    /**
     * Integrate Legend to the layer container
     */
  }, {
    key: "slotLegend",
    value: function slotLegend() {
      // cas particulier :
      // on souhaite intégrer une partie de la legende dans le container du layer.
      var legend = this.oLegend;
      if (legend) {
        // FIXME c'est pourri...
        var node = null;
        var nodesLvl1 = this.container.childNodes;
        if (nodesLvl1.length) {
          // selon où se situe l'icone de visibilité : au debut ou à la fin...
          var idx = this.options.tools.icon.anchor === "start" ? 1 : 0;
          var nodesLvl2 = nodesLvl1[idx].childNodes;
          // on recherche le container de la legende
          for (var i = 0; i < nodesLvl2.length; i++) {
            var curnode = nodesLvl2[i];
            if (curnode.id.indexOf(this.name.containerlegend) !== -1) {
              node = curnode;
            }
          }
        }
        if (node) {
          var render = legend.getRenderContainer();
          if (render) {
            node.appendChild(render);
            // legende intégrée
            this.bSlotLegend = true;
          }
        }
      }
    }

    // ################################################################### //
    // ##################### public methods ############################## //
    // ################################################################### //
    /**
     * Set visibility or get
     *
     * @param {Boolean} display - set visibility or undefined to get status
     * @returns {Boolean} - true/false
     */
  }, {
    key: "visibility",
    value: function visibility(display) {
      logger.trace("visibility()", display);
      if (!this.options.tools.visibility) {
        return;
      }
      if (typeof display !== "undefined") {
        this.DomVisibility.checked = display ? "checked" : "";
      }
      return this.DomVisibility.checked;
    }

    /**
    * Collapse a layer panel (event)
    */
  }, {
    key: "collapse",
    value: function collapse() {
      logger.trace("collapse()");
      this.DomToggle.click();
    }

    /**
    * Click on visibility icon (event)
    */
  }, {
    key: "visible",
    value: function visible() {
      logger.trace("visible()");
      if (!this.options.tools.visibility) {
        return;
      }
      this.DomVisibility.click();
    }

    /**
     * Set collapse or get
     *
     * @param {Boolean} display - show/hidden container or get status
     * @returns {Boolean} - true/false
     */
  }, {
    key: "display",
    value: function display(_display) {
      logger.trace("display()", _display);
      var checked = document.getElementById(this.DomToggle.htmlFor).checked;
      if (typeof _display !== "undefined") {
        this.container.style.display = _display ? "inline-flex" : "none";
        if (this.oStyle) {
          this.oStyle.display(_display && checked);
        }
        if (this.oFilter) {
          this.oFilter.display(_display && checked);
        }
        if (this.oLegend) {
          this.oLegend.display(_display && checked);
        }
      }
      return checked;
    }

    /**
     * Set disabled/enabled status or get
     *
     * @param {Boolean} active - disable/enable layer interaction or get status
     * @returns {Boolean} - true/false
     */
  }, {
    key: "active",
    value: function active(_active) {
      logger.trace("active()", _active);
      if (typeof _active !== "undefined") {
        this.container.className = _active ? this.name.container : this.name.container + " disabled";
      }
      return this.container.className === this.name.container;
    }

    /**
     * Get container (DOM)
     *
     * @returns {DOMElement} DOM element
     */
  }, {
    key: "getContainer",
    value: function getContainer() {
      return this.container;
    }

    // ################################################################### //
    // ####################### handlers events to dom #################### //
    // ################################################################### //
    /**
     * this method is called by event '' on '' tag form
     *
     * @param {Object} e - HTMLElement
     * @private
     */
  }, {
    key: "onClickLayerMapBox",
    value: function onClickLayerMapBox(e) {
      logger.trace("onClickLayerMapBox", e);
      var id = e.target.htmlFor.substring(e.target.htmlFor.indexOf("-"));
      var checked = document.getElementById(e.target.htmlFor).checked;

      // gestion des inputs
      if (e.target.htmlFor === this.name.imagelabelinput + id) {
        document.getElementById(this.name.titleinput + id).checked = !checked;
      }
      if (e.target.htmlFor === this.name.titleinput + id) {
        // si options.pin:false, ce DOM n'existe pas !
        if (document.getElementById(this.name.imagelabelinput + id)) {
          document.getElementById(this.name.imagelabelinput + id).checked = !checked;
        }
      }

      // ouverture du panneau des styles / filtres
      if (this.oStyle) {
        this.oStyle.display(!checked);
      }
      if (this.oFilter) {
        this.oFilter.display(!checked);
      }
      // attention,
      // si la legende est non editable, elle ne se trouve pas dans le sous menu !
      if (this.oLegend && this.oLegend.isEditable()) {
        this.oLegend.display(!checked);
      }
    }

    /**
     * this method is called by event '' on '' tag form...
     *
     * 'e' contains the option object into 'e.target.data' !
     * 'e' contains the id editor into 'e.target.editorID' !
     *
     * @param {Object} e - HTMLElement
     * @private
     * @fires Layer#editor:layer:onclickvisibility
     */
  }, {
    key: "onVisibilityLayerMapBox",
    value: function onVisibilityLayerMapBox(e) {
      logger.trace("onVisibilityLayerMapBox", e);
      e.editorID = this.id;
      e.data = this.options;
      eventbusjs__WEBPACK_IMPORTED_MODULE_0___default().dispatch(_Event__WEBPACK_IMPORTED_MODULE_1__["default"].layer.onclickvisibility, e);
    }

    /**
     * this method is called by event '' on '' tag form...
     *
     * 'e' contains the option object into 'e.target.data' !
     * 'e' contains the id editor into 'e.target.editorID' !
     *
     * @param {Object} e - HTMLElement
     * @private
     * @fires Layer#editor:layer:onclickclone
     */
  }, {
    key: "onCloneLayerMapBox",
    value: function onCloneLayerMapBox(e) {
      logger.trace("onCloneLayerMapBox", e);
      e.editorID = this.id;
      e.data = this.options;
      eventbusjs__WEBPACK_IMPORTED_MODULE_0___default().dispatch(_Event__WEBPACK_IMPORTED_MODULE_1__["default"].layer.onclickclone, e);
    }

    /**
     * this method is called by event '' on '' tag form...
     *
     * 'e' contains the option object into 'e.target.data' !
     * 'e' contains the id editor into 'e.target.editorID' !
     *
     * @param {Object} e - HTMLElement
     * @private
     * @fires Layer#editor:layer:onclickremove
     */
  }, {
    key: "onRemoveLayerMapBox",
    value: function onRemoveLayerMapBox(e) {
      logger.trace("onRemoveLayerMapBox", e);
      e.editorID = this.id;
      e.data = this.options;
      eventbusjs__WEBPACK_IMPORTED_MODULE_0___default().dispatch(_Event__WEBPACK_IMPORTED_MODULE_1__["default"].layer.onclickremove, e);
    }
  }]);
}();
;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layer);

/***/ }),

/***/ "./src/packages/Controls/Editor/Legend.js":
/*!************************************************!*\
  !*** ./src/packages/Controls/Editor/Legend.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var eventbusjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! eventbusjs */ "./node_modules/eventbusjs/lib/eventbus.min.js");
/* harmony import */ var eventbusjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(eventbusjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Event */ "./src/packages/Controls/Editor/Event.js");
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utils/LoggerByDefault */ "./src/packages/Utils/LoggerByDefault.js");
/* harmony import */ var _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Utils/ColorUtils */ "./src/packages/Utils/ColorUtils.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




var logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_2__["default"].getLogger("editor-legend");

/**
 * @classdesc
 *
 * MapBox Legend management
 *
 * @constructor
 * @alias ol.style.editor.Legend
 * @param {Object} options - options for function call.
 * @param {Object} [options.target = null] - ...
 * @param {Number} [options.position = 0] -  ...
 * @param {Number} [options.id = null] - (internal) ...
 * @param {Object} [options.sprites = null] - ...
 * @param {String} [options.sprites.url] - ...
 * @param {Object} [options.sprites.size] - {h:, w:} ...
 * @param {Object} [options.sprites.json] - ...
 * @param {Object} options.obj - ...
 * @param {String} [options.obj.title] - ...
 * @param {Boolean} [options.obj.editable = true] - ...
 * @param {Object} options.obj.paint - ...
 * @param {Object} options.obj.layout - ...
 * @example
 *   var legend = new Legend ({
 *      target : ...,
 *      position : 1, // identifiant de position (unique !)
 *      sprites : {
 *          url : "http://localhost/sprites.png",
 *          size : { w : 450, h : 550 },
 *          json : {
 *              icon-1 : {x:,y:,height:,width:,pixelRatio:},
 *              icon-2 : {x:,y:,height:,width:,pixelRatio:}
 *          }
 *      },
 *      obj : {
 *          title : "",
 *          editable : true, // tag non standard issue du style json dédié à l'edition
 *          paint : {"fill-color": "#2BB3E1"},
 *          layout : {visibility:"none"}
 *      }
 *   });
 *  legend.add();
 *  legend.display(true);
 *  legend.isEditable();
 *  legend.getRenderContainer();
 *  legend.getToolsContainer();
 *  legend.getContainer();
 */
var Legend = /*#__PURE__*/function () {
  function Legend(options) {
    _classCallCheck(this, Legend);
    logger.trace("[constructor] Legend", options);

    // options
    this.options = options || {
      // default...
      target: null,
      position: 0,
      sprites: null,
      obj: null
    };
    if (!(this instanceof Legend)) {
      throw new TypeError("ERROR CLASS_CONSTRUCTOR");
    }
    this._initialize();
    this._initContainer();
  }

  // ################################################################### //
  // ########################## init methods ########################### //
  // ################################################################### //
  /**
   * Initialize component
   * (called by constructor)
   *
   * @private
   */
  return _createClass(Legend, [{
    key: "_initialize",
    value: function _initialize() {
      // unique editor id (optional!)
      this.id = this.options.id || null;
      if (!this.options.target) {
        // cf. add()
      }

      // permet d'avoir un identifiant de position dans la liste des layers
      if (!this.options.position) {
        this.options.position = 0;
      }
      if (!this.options.obj) {
        // choix d'avoir un objet vide pour une edition...
        this.options.obj = {
          title: "vide...",
          editable: true,
          paint: {
            "fill-color": "#FFFFFF"
          }
        };
      }

      // la legende est elle editable ?
      // le tag 'editable' est à placer dans le fichier de style (dans le layer)...
      var _editable = this.options.obj.editable;
      this.editable = typeof _editable !== "undefined" ? _editable : false;

      // liste des caractéristiques de la legende par defaut
      this.legendRender = {
        type: "fill",
        values: {
          width: 1,
          stroke: "#FFFFFF",
          color: "#000000",
          opacity: 1
        }
      };

      // DOM : pointer
      this.container = null;
      this.rendercontainer = null;
      this.toolscontainer = null;

      // DOM : className or id
      this.name = {
        target: "GPEditorMapBoxLegendTarget",
        container: "GPEditorMapBoxLegendContainer",
        containerlegendrender: "GPEditorMapBoxLegendRenderContainer",
        legendrender: "GPEditorMapBoxLegendRender",
        legendeditable: "GPEditorMapBoxLegendEditable",
        legendtitle: "GPEditorMapBoxLegendTitle",
        containerlegendtools: "GPEditorMapBoxLegendToolsContainer"
      };

      // DOM : Label menu Edition
      this.labels = {
        "line-color": "Couleur du trait",
        "line-width": "Epaisseur du trait",
        "line-opacity": "Opacité du trait",
        "fill-color": "Couleur de remplissage",
        "fill-opacity": "Opacité du remplissage"
      };
    }

    /**
     * Graphical rendering of the component
     * (called by constructor)
     *
     * @private
     * @example
     * <div class="GPEditorMapBoxLegendContainer">
     *  <div class="GPEditorMapBoxLegendRenderContainer">
     *      <div class="GPEditorMapBoxLegendRender GPEditorMapBoxLegendEditable legend-circle" style="..."></div>
     *      <span class="GPEditorMapBoxLegendTitle">test circle editable...</span>
     *  </div>
     *  <div class="GPEditorMapBoxLegendToolsContainer">...</div>
     * </div>
     */
  }, {
    key: "_initContainer",
    value: function _initContainer() {
      var _obj = this.options.obj;
      var div = document.createElement("div");
      div.className = this.name.container;

      // INFO
      // on recherche les informations dans le tag 'paint' en priorité, mais pour
      // les icones ou textes, les informations peuvent se trouver aussi dans le tag 'layout'...
      // on fusionnne paint et layout par facilité
      var style = Object.assign({}, _obj.paint, _obj.layout);

      // liste des properties mapbox
      // ex. fill-color
      var keys = Object.keys(style);
      if (keys.length === 0) {
        logger.info("tag 'paint' or 'layout' is empty !");
        return;
      }

      // FIXME
      // - gestion de type plus complexe : texte avec/sans symbole ou symbole !
      // - pour les textes ou icones, les info peuvent être aussi dans le tag 'layout' !
      var params = {};
      var bFound = false;
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        // recherche du type
        // ex. fill
        if (/fill-/.test(key) || /line-/.test(key) || /circle-/.test(key) || /background-/.test(key) || /text-/.test(key) || /icon-/.test(key)) {
          // style geré & trouvé
          bFound = true;
          var title = _obj.title || "";

          // INFO
          // le type texte ou icone est difficile à trouver car les 2 types cohabitent,
          // on le gère en symbole...
          var type = key.split("-")[0];
          if (type === "text" || type === "icon") {
            type = "symbol";
          }
          this.legendRender = this._getProperties(type, style);
          params = {
            edit: this.editable,
            title: title,
            type: this.legendRender.type,
            values: this.legendRender.values
          };
          div.appendChild(this._createElementIconLegend(params));

          // on stoppe la recherche
          break;
        }
      }

      // legende avec un style indeterminé ou non géré !?
      if (!bFound) {
        // on prend la legende par defaut
        params = {
          edit: this.editable,
          title: "",
          type: this.legendRender.type,
          values: this.legendRender.values
        };
        div.appendChild(this._createElementIconLegend(params));
        logger.warn("legend type unknown, default legend used...");
      }

      // ajout mode edition graphique de la legende
      this.toolscontainer = this._createElementEditionLegend(params);
      div.appendChild(this.toolscontainer);

      // main container
      this.container = div;
    }

    // ################################################################### //
    // ##################### private methods ############################# //
    // ################################################################### //
    /**
    * Get properties supported
    *
    * @param {Object} type - fill, line, circle, text, icon...
    * @param {Object} values - raw values from the JSON file
    * @returns {Object} - { type : (fill | line | circle | symbol), values : valuesSupported }
    *
    * @private
    * @example
    *
    * // TODO
    * // symbol with text (1) / symbol without text (2) / text (3)
    * // "layout":{
    * //      "icon-image":"{maki}-11",          <!--- IT'S A SYMBOL (1) (2)-->
    * //      "text-font":[
    * //           "Open Sans Semibold",
    * //           "Arial Unicode MS Bold"
    * //       ],
    * //       "text-field":"{name_en}",         <!--- IT'S A TEXT (1) (3)-->
    * //       "text-max-width":9,
    * //       "text-padding":2,
    * //       "text-offset":[
    * //            0,
    * //            0.6
    * //       ],
    * //       "text-anchor":"top",
    * //       "text-size":12
    * // },
    * // "paint":{
    * //     "text-color":"#666",
    * //     "text-halo-color":"#ffffff",
    * //     "text-halo-width":1,
    * //     "text-halo-blur":0.5
    * // },
    *
    */
  }, {
    key: "_getProperties",
    value: function _getProperties(type, values) {
      // cas particulier du symbole complexe
      // il existe plusieurs types pour un symbole :
      // - text
      // - icon
      // - icon with text
      if (type === "symbol") {
        var isTextValue = values["text-field"];
        var isIconValue = values["icon-image"];
        type = isTextValue && isIconValue ? "icon" : isTextValue ? "text" : isIconValue ? "icon" : "unknow";
        if (type === "unknow") {
          logger.warn("type unknow !?");
          return;
        }
      }
      var valuesSupported = {};
      for (var key in values) {
        if (Object.hasOwnProperty.call(values, key)) {
          var val = values[key];
          if (Legend.PROPERTIES[type].includes(key)) {
            var prop = key.replace(type, "").slice(1);
            var value = this._getValue(val);
            if (value) {
              // cas particulier des sprites
              if (prop === "pattern" || prop === "image") {
                if (!this.options.sprites || !this.options.sprites.json || !this.options.sprites.json[value]) {
                  var k = type + ":" + prop;
                  logger.warn("sprites mandatory for key ", k);
                  break;
                }
              }
              valuesSupported[prop] = value;
            }
          } else {
            logger.warn("property not supported : ", key);
          }
        }
      }
      return {
        type: type,
        values: valuesSupported
      };
    }

    /**
    * Render thumbnail (SVG)
    *
    * @param {Object} type - fill, line, circle, text, ...
    * @param {Object} values - {"color":..., "width":..., "stroke":...., "opacity":...}
    * @returns {Boolean} true/false
    *
    * @private
    * @example
    * (...)
    */
  }, {
    key: "_renderThumbnail",
    value: function _renderThumbnail(type, values) {
      // div de rendu de la legende
      var div = this.rendercontainer;
      if (!div) {
        return false;
      }

      // SVG
      var svg = null;
      // facteur grossissement (x10) pour le trait
      var factor = 3;

      // valeur par defaut
      if (!values.color) {
        values.color = "#FFFFFF";
      }
      // en fonction du type, on y ajoute le style
      switch (type) {
        case "text":
          var styleText = "font-size: 5em;font-weight: bold;";
          svg = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><text x='50' y='50' fill='%color%' fill-opacity='%opacity%'  text-anchor='middle' dominant-baseline='central' style='%style%'> T </text></svg>\")";
          div.style["background"] = svg.replace("%color%", values.color.indexOf("rgb") === 0 ? values.color : _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["default"].hexToRgba(values.color, 1)).replace("%opacity%", values.opacity || 1).replace("%style%", styleText);
          break;
        case "icon":
          if (values.image) {
            // FIXME on reste dans le paradigme d'utilisation du SVG...,
            // mais probleme de ratio de l'image !?
            svg = "<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' width='27px' height='27px' x='0' y='0' viewBox='%x% %y% %w% %h%'><image width='%W%px' height='%H%px' href='%URL%'/></svg>".replace("%x%", this.options.sprites.json[values.image].x).replace("%y%", this.options.sprites.json[values.image].y).replace(/%w%/g, this.options.sprites.json[values.image].width).replace(/%h%/g, this.options.sprites.json[values.image].height).replace("%W%", this.options.sprites.size.w).replace("%H%", this.options.sprites.size.h).replace("%URL%", this.options.sprites.url);
            div.innerHTML = svg;
          } else {
            var styleTextIcon = "fill: transparent;stroke-width: 10;";
            svg = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><path d='M 50,20 80,82.5 20,82.5 z' stroke='%color%' style='%style%'/></svg>\")";
            div.style["background"] = svg.replace("%color%", values.color.indexOf("rgb") === 0 ? values.color : _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["default"].hexToRgba(values.color, 1)).replace("%style%", styleTextIcon);
          }
          break;
        case "line":
          var lstrockedasharray = Array.isArray(values["dasharray"]) ? values["dasharray"].join(" ") : 0;
          svg = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><line x1='0' y1='100' x2='100' y2='0' stroke='%color%' stroke-width='%stroke-width%' stroke-opacity='%stroke-opacity%' stroke-dasharray='%stroke-dasharray%' /></svg>\")";
          // svg = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><path d='M0 99 L99 0 L100 1 L1 100' stroke='%color%' stroke-width='%width%' stroke-opacity='%opacity%' stroke-dasharray='%dasharray%' /></svg>\")";
          div.style["background"] = svg.replace("%color%", values.color.indexOf("rgb") === 0 ? values.color : _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["default"].hexToRgba(values.color, 1)).replace("%stroke-opacity%", values.opacity || 1).replace("%stroke-dasharray%", lstrockedasharray).replace("%stroke-width%", (values.width || 0) * factor);
          break;
        case "circle":
          var cstrockcolor = values["stroke-color"] || "#FFFFFF";
          svg = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><circle cx='50' cy='50' r='40' stroke='%stroke-color%' stroke-width='%stroke-width%' stroke-opacity='%strock-opacity%' fill='%color%' fill-opacity='%opacity%' /></svg>\")";
          div.style["background"] = svg.replace("%color%", values.color.indexOf("rgb") === 0 ? values.color : _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["default"].hexToRgba(values.color, 1)).replace("%opacity%", values.opacity || 1).replace("%stroke-color%", cstrockcolor.indexOf("rgb") === 0 ? cstrockcolor : _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["default"].hexToRgba(cstrockcolor, 1)).replace("%stroke-opacity%", values["stroke-opacity"] || 1).replace("%stroke-width%", (values["stroke-width"] || 0) * factor);
          break;
        case "background":
        case "fill":
          if (values.pattern) {
            svg = "<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' width='27px' height='27px' x='0' y='0' viewBox='%x% %y% %w% %h%'><image width='%W%px' height='%H%px' href='%URL%'/></svg>".replace("%x%", this.options.sprites.json[values.pattern].x).replace("%y%", this.options.sprites.json[values.pattern].y).replace(/%w%/g, this.options.sprites.json[values.pattern].width).replace(/%h%/g, this.options.sprites.json[values.pattern].height).replace("%W%", this.options.sprites.size.w).replace("%H%", this.options.sprites.size.h).replace("%URL%", this.options.sprites.url);
            div.innerHTML = svg;
          } else {
            var fstrokecolor = values["outline-color"] || "#FFFFFF";
            svg = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><rect x='0' y='0' width='100' height='100' rx='5' ry='5' stroke='%stroke-color%' stroke-width='3' fill='%color%' fill-opacity='%opacity%' /></svg>\")";
            div.style["background"] = svg.replace("%color%", values.color.indexOf("rgb") === 0 ? values.color : _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["default"].hexToRgba(values.color, 1)).replace("%opacity%", values.opacity || 1).replace("%stroke-color%", fstrokecolor.indexOf("rgb") === 0 ? fstrokecolor : _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["default"].hexToRgba(fstrokecolor, 1));
          }
          break;
        default:
          logger.warn("type not found, no thumbnail...");
          return false;
      }
      return true;
    }

    /**
     * Get value
     *
     * @param {*} value - value of a property (ex. "#2BB3E1")
     * @returns {*} return a verified value (ex. color": "#2BB3E1")
     *
     * @private
     * @example
     * // type simple for fill, line or circle type with string :
     * // "paint": {
     * //     "fill-color": "#2BB3E1"
     * // }
     *
     * // type simple for fill, line or circle type with array :
     * // "paint": {
     * //     "line-dasharray": [2,10]
     * // }
     *
     * // TODO type complexe : not yet implemented !
     * // "paint": {
     * //     "fill-color": [
     * //          "match",
     * //          ["get","symbo"],
     * //          "ZONE_BOISEE","#A7DA81",
     * //          "ZONE_MANGROVE","#7E8AB5",
     * //          "#A7DA81"
     * //      ]
     * // }
     *
     * // other type complexe :
     * // "paint": {
     * //     "fill-color": {
     * //        "base": 1,
     * //        "stops": [
     * //        [
     * //          15.5,
     * //         "#f2eae2"
     * //        ],
     * //        [
     * //          16,
     * //          "#dfdbd7"
     * //        ]
     * //        ]
     * //     }
     * // }
     */
  }, {
    key: "_getValue",
    value: function _getValue(value) {
      var result = null;
      if (typeof value === "string") {
        result = value;
      } else if (typeof value === "number") {
        result = value;
      } else if (Array.isArray(value)) {
        // cas d'un tableau de valeurs numériques : [1,2,3]
        var isNumber = true;
        value.forEach(function (v) {
          if (typeof v !== "number") {
            isNumber = false;
          }
        });
        if (isNumber) {
          result = value;
        }
      } else if (_typeof(value) === "object") {
        result = null;
        if ("stops" in value) {
          // on realise un ordre inversé sur les zooms
          value.stops.sort(function (a, b) {
            var numA = a[0];
            var numB = b[0];
            if (numA > numB) {
              return -1;
            }
            if (numA < numB) {
              return 1;
            }
            return 0;
          });
          // et, on prend le plus petit zoom
          var lastStopsValue = value.stops.slice(-1);
          result = lastStopsValue[0][1];
        }
      } else {
        logger.warn("value not supported !");
      }
      return result;
    }

    // ################################################################### //
    // ######################### DOM methods ############################# //
    // ################################################################### //
    /**
    * Create a Graphical Legend Icon
    *
    * @param {Object} params - param
    * @param {String} params.title - title
    * @param {String} params.type - fill, line, circle, text, icon, ...
    * @param {String} params.values - {"color": "#2BB3E1", "width": 10, "opacity": 0.5, "stroke": "#2BB3E1"}
    * @param {Boolean} params.edit - editable with a colorPicker for only line, fill and circle legend !
    * @returns {DOMElement} DOM element
    *
    * @private
    * @example
    *   <div class="GPEditorMapBoxLegendRenderContainer">
    *       <div class="GPEditorMapBoxLegendRender GPEditorMapBoxLegendEditable legend-fill"
    *           style="background: url(&quot;data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><rect x='0' y='0' width='100' height='100' rx='5' ry='5' fill='rgba(255, 255, 255, 1)' fill-opacity='1' /></svg>&quot;);">
    *       </div>
    *       <span class="GPEditorMapBoxLegendTitle">vide...</span>
    * </div>
    */
  }, {
    key: "_createElementIconLegend",
    value: function _createElementIconLegend(params) {
      // contexte
      var self = this;
      var container = document.createElement("div");
      container.className = this.name.containerlegendrender;
      var div = this.rendercontainer = document.createElement("div");
      div.className = this.name.legendrender;
      if (params.edit) {
        div.className += " ";
        div.className += this.name.legendeditable;
        if (div.addEventListener) {
          div.addEventListener("click", function (e) {
            self.onEditionLegendMapBox(e);
          });
        } else if (div.attachEvent) {
          div.attachEvent("onclick", function (e) {
            self.onEditionLegendMapBox(e);
          });
        }
      }

      // type de legende
      var type = params.type;

      // TODO className
      // div.className += " legend-not-implemented";
      // ajout du style sur la div de rendu
      if (this._renderThumbnail(type, params.values)) {
        // className possibles :
        // " legend-text"
        // " legend-icon"
        // " legend-background"
        // " legend-line"
        // " legend-line-not-editable"
        // " legend-circle"
        // " legend-circle-not-editable"
        // " legend-fill"
        // " legend-fill-not-editable"
        div.className += params.edit ? " legend-" + type : " legend-" + type + "-not-editable";
      } else {
        div.className += " legend-unknow";
      }
      container.appendChild(div);
      var span = document.createElement("span");
      span.className = this.name.legendtitle;
      span.innerHTML = params.title || "";
      container.appendChild(span);
      return container;
    }

    /**
    * Create a Graphical Legend Edition
    *
    * @param {Object} params - param
    * @param {String} params.type - fill, line, (TODO : circle, icon or text)
    * @param {String} params.values - {"fill-color": "#2BB3E1"}
    * @param {Boolean} params.edit - editable with a colorPicker for only line and fill legend !
    * @returns {DOMElement} DOM element
    *
    * @private
    * @example
    *   <div class="GPEditorMapBoxLegendToolsContainer">
    *       <div class="legend-styling-div">
    *           <label for="stroke-color">Couleur du trait</label>
    *           <input class="legend-styling" id="stroke-color" title="" type="color">
    *       </div>
    *       <div class="legend-styling-div">
    *           <label for="stroke-width">Epaisseur du trait</label>
    *           <input class="legend-styling" id="stroke-width" title="" type="range" min="0" max="10" step="1" value="1">
    *       </div>
    *       <div class="legend-styling-div">
    *           <label for="stroke-opacity">Opacité du trait</label>
    *           <input class="legend-styling" id="stroke-opacity" title="" type="range" min="0" max="1" step="0.1" value="1">
    *       </div>
    *       <div class="legend-styling-div">
    *           <label for="fill-color">Couleur de remplissage</label>
    *        <input class="legend-styling" id="fill-color" title="" type="color">
    *       </div>
    *       <div class="legend-styling-div">
    *           <label for="fill-opacity">Opacité du remplissage</label>
    *           <input class="legend-styling" id="fill-opacity" title="" type="range" min="0" max="1" step="0.1" value="1">
    *       </div>
    *   </div>
    */
  }, {
    key: "_createElementEditionLegend",
    value: function _createElementEditionLegend(params) {
      // contexte
      var self = this;
      var container = document.createElement("div");
      container.className = this.name.containerlegendtools;

      // uniquement les elements editables !
      if (!params.edit) {
        return container;
      }

      // on ne traite que l'edition du mode 'traits' ou 'surfaciques'
      // mode 'line'
      switch (params.type) {
        case "line":
          createLineColor.call(self);
          createLineWidth.call(self);
          createLineOpacity.call(self);
          break;
        case "background":
        case "fill":
          createFillColor.call(self);
          createFillOpacity.call(self);
          break;
        default:
          break;
      }

      // couleur du trait
      function createLineColor() {
        var linecolor = document.createElement("div");
        linecolor.className = "legend-styling-div";
        var lLineColor = document.createElement("label");
        lLineColor.className = "legend-line";
        lLineColor.htmlFor = this.id ? "line-color-" + this.id : "line-color";
        lLineColor.innerHTML = this.labels["line-color"];
        var inputLineColor = document.createElement("input");
        inputLineColor.className = "legend-styling";
        inputLineColor.id = this.id ? "line-color-" + this.id : "line-color";
        inputLineColor.title = "Selectionner une couleur de trait";
        inputLineColor.type = "color";
        inputLineColor.value = params.values.color;
        inputLineColor.setAttribute("data-id", "line-color");
        if (inputLineColor.addEventListener) {
          inputLineColor.addEventListener("change", function (e) {
            self._renderThumbnail(params.type, Object.assign(params.values, {
              color: e.target.value
            }));
            self.onChangeValueLegendMapBox(e);
          });
        } else if (inputLineColor.attachEvent) {
          inputLineColor.attachEvent("onchange", function (e) {
            self._renderThumbnail(params.type, Object.assign(params.values, {
              color: e.target.value
            }));
            self.onChangeValueLegendMapBox(e);
          });
        }
        linecolor.appendChild(lLineColor);
        linecolor.appendChild(inputLineColor);
        container.appendChild(linecolor);
      }

      // epaisseur du trait
      function createLineWidth() {
        var linewidth = document.createElement("div");
        linewidth.className = "legend-styling-div";
        var lLineWidth = document.createElement("label");
        lLineWidth.className = "legend-line";
        lLineWidth.htmlFor = this.id ? "line-width-" + this.id : "line-width";
        lLineWidth.innerHTML = this.labels["line-width"];
        var inputLineWidth = document.createElement("input");
        inputLineWidth.className = "legend-styling";
        inputLineWidth.id = this.id ? "line-width-" + this.id : "line-width";
        inputLineWidth.title = params.values.width;
        inputLineWidth.type = "range";
        inputLineWidth.min = "0";
        inputLineWidth.max = "10";
        inputLineWidth.step = "1";
        inputLineWidth.defaultValue = params.values.width;
        inputLineWidth.setAttribute("data-id", "line-width");
        if (inputLineWidth.addEventListener) {
          inputLineWidth.addEventListener("change", function (e) {
            logger.trace(e);
            e.target.title = e.target.value;
            self._renderThumbnail(params.type, Object.assign(params.values, {
              width: e.target.value
            }));
            self.onChangeValueLegendMapBox(e);
          });
        } else if (inputLineWidth.attachEvent) {
          inputLineWidth.attachEvent("onchange", function (e) {
            logger.trace(e);
            e.target.title = e.target.value;
            self._renderThumbnail(params.type, Object.assign(params.values, {
              width: e.target.value
            }));
            self.onChangeValueLegendMapBox(e);
          });
        }
        linewidth.appendChild(lLineWidth);
        linewidth.appendChild(inputLineWidth);
        container.appendChild(linewidth);
      }

      // opacité du trait
      function createLineOpacity() {
        var lineopacity = document.createElement("div");
        lineopacity.className = "legend-styling-div";
        var lLineOpacity = document.createElement("label");
        lLineOpacity.className = "legend-line";
        lLineOpacity.htmlFor = this.id ? "line-opacity-" + this.id : "line-opacity";
        lLineOpacity.innerHTML = this.labels["line-opacity"];
        var inputLineOpacity = document.createElement("input");
        inputLineOpacity.className = "legend-styling";
        inputLineOpacity.id = this.id ? "line-opacity-" + this.id : "line-opacity";
        inputLineOpacity.title = params.values.opacity;
        inputLineOpacity.type = "range";
        inputLineOpacity.min = "0";
        inputLineOpacity.max = "1";
        inputLineOpacity.step = "0.1";
        inputLineOpacity.defaultValue = params.values.opacity;
        inputLineOpacity.setAttribute("data-id", "line-opacity");
        if (inputLineOpacity.addEventListener) {
          inputLineOpacity.addEventListener("change", function (e) {
            logger.trace(e);
            e.target.title = e.target.value;
            self._renderThumbnail(params.type, Object.assign(params.values, {
              opacity: e.target.value
            }));
            self.onChangeValueLegendMapBox(e);
          });
        } else if (inputLineOpacity.attachEvent) {
          inputLineOpacity.attachEvent("onchange", function (e) {
            logger.trace(e);
            e.target.title = e.target.value;
            self._renderThumbnail(params.type, Object.assign(params.values, {
              opacity: e.target.value
            }));
            self.onChangeValueLegendMapBox(e);
          });
        }
        lineopacity.appendChild(lLineOpacity);
        lineopacity.appendChild(inputLineOpacity);
        container.appendChild(lineopacity);
      }

      // couleur de remplissage
      function createFillColor() {
        var fillcolor = document.createElement("div");
        fillcolor.className = "legend-styling-div";
        var lFillColor = document.createElement("label");
        lFillColor.className = "legend-fill";
        lFillColor.htmlFor = this.id ? "fill-color-" + this.id : "fill-color";
        lFillColor.innerHTML = this.labels["fill-color"];
        var inputFillColor = document.createElement("input");
        inputFillColor.className = "legend-styling";
        inputFillColor.id = this.id ? "fill-color-" + this.id : "fill-color";
        inputFillColor.title = "Selectionner une couleur de remplissage";
        inputFillColor.type = "color";
        inputFillColor.value = params.values.color;
        inputFillColor.setAttribute("data-id", "fill-color");
        if (inputFillColor.addEventListener) {
          inputFillColor.addEventListener("change", function (e) {
            self._renderThumbnail(params.type, Object.assign(params.values, {
              color: e.target.value
            }));
            self.onChangeValueLegendMapBox(e);
          });
        } else if (inputFillColor.attachEvent) {
          inputFillColor.attachEvent("onchange", function (e) {
            self._renderThumbnail(params.type, Object.assign(params.values, {
              color: e.target.value
            }));
            self.onChangeValueLegendMapBox(e);
          });
        }
        fillcolor.appendChild(lFillColor);
        fillcolor.appendChild(inputFillColor);
        container.appendChild(fillcolor);
      }

      // opacité du remplissage
      function createFillOpacity() {
        var fillopacity = document.createElement("div");
        fillopacity.className = "legend-styling-div";
        var lFillOpacity = document.createElement("label");
        lFillOpacity.className = "legend-fill";
        lFillOpacity.htmlFor = this.id ? "fill-opacity-" + this.id : "fill-opacity";
        lFillOpacity.innerHTML = this.labels["fill-opacity"];
        var inputFillOpacity = document.createElement("input");
        inputFillOpacity.className = "legend-styling";
        inputFillOpacity.id = this.id ? "fill-opacity-" + this.id : "fill-opacity";
        inputFillOpacity.title = params.values.opacity;
        inputFillOpacity.type = "range";
        inputFillOpacity.min = "0";
        inputFillOpacity.max = "1";
        inputFillOpacity.step = "0.1";
        inputFillOpacity.defaultValue = params.values.opacity;
        inputFillOpacity.setAttribute("data-id", "fill-opacity");
        if (inputFillOpacity.addEventListener) {
          inputFillOpacity.addEventListener("change", function (e) {
            e.target.title = e.target.value;
            self._renderThumbnail(params.type, Object.assign(params.values, {
              opacity: e.target.value
            }));
            self.onChangeValueLegendMapBox(e);
          });
        } else if (inputFillOpacity.attachEvent) {
          inputFillOpacity.attachEvent("onchange", function (e) {
            e.target.title = e.target.value;
            self._renderThumbnail(params.type, Object.assign(params.values, {
              opacity: e.target.value
            }));
            self.onChangeValueLegendMapBox(e);
          });
        }
        fillopacity.appendChild(lFillOpacity);
        fillopacity.appendChild(inputFillOpacity);
        container.appendChild(fillopacity);
      }
      return container;
    }

    // ################################################################### //
    // ##################### public methods ############################## //
    // ################################################################### //
    /**
     * Add element into target DOM
     *
     * @returns {Object} - Legend instance
     */
  }, {
    key: "add",
    value: function add() {
      if (!this.options.target) {
        if (!document.getElementById(this.name.target)) {
          var div = document.createElement("div");
          div.id = this.name.target;
          var node = document.documentElement || document.getElementsByTagName("body")[0] || document.getElementsByTagName("head")[0];
          node.appendChild(div);
        }
        this.options.target = document.getElementById(this.name.target);
      }
      if (this.container) {
        this.options.target.appendChild(this.container);
      }
      return this;
    }

    /**
     * Set display container or get
     *
     * @param {Boolean} display - show/hidden container or get status
     * @returns {Boolean} - true/false
     */
  }, {
    key: "display",
    value: function display(_display) {
      logger.trace("display()", _display);
      if (typeof _display !== "undefined") {
        this.container.style.display = _display ? "flex" : "none";
      }
      return this.container.style.display === "flex";
    }

    /**
     * Is editable
     *
     * @returns {Boolean} - true/false
     */
  }, {
    key: "isEditable",
    value: function isEditable() {
      return this.editable;
    }

    /**
     * Get container Legend Render (DOM)
     *
     * @returns {DOMElement} DOM element
     * @see Layer.prototype.slotLegend()
     * @example
     *  <div class="GPEditorMapBoxLegendRender legend-(line|fill|background|text|icon|circle|unknow)" style="..."></div>
     */
  }, {
    key: "getRenderContainer",
    value: function getRenderContainer() {
      return this.rendercontainer;
    }

    /**
     * Get container Legend Tools (DOM)
     *
     * @returns {DOMElement} DOM element
     * @see Layer.prototype.slotLegend()
     * @example
     *  <div class="GPEditorMapBoxLegendToolsContainer">...</div>
     */
  }, {
    key: "getToolsContainer",
    value: function getToolsContainer() {
      return this.toolscontainer;
    }

    /**
     * Get container (DOM)
     *
     * @returns {DOMElement} DOM element
     */
  }, {
    key: "getContainer",
    value: function getContainer() {
      return this.container;
    }

    // ################################################################### //
    // ####################### handlers events to dom #################### //
    // ################################################################### //
    /**
     * this method is called by event '' on '' tag form...
     *
     * 'e' contains the option object into 'e.target.data' !
     * 'e' contains the id editor into 'e.target.editorID' !
     *
     * @param {Object} e - HTMLElement
     * @private
     * @fires Legend#editor:legend:onclickedition
     */
  }, {
    key: "onEditionLegendMapBox",
    value: function onEditionLegendMapBox(e) {
      logger.trace("onEditionLegendMapBox", e);
      e.editorID = this.id;
      e.data = this.options;
      eventbusjs__WEBPACK_IMPORTED_MODULE_0___default().dispatch(_Event__WEBPACK_IMPORTED_MODULE_1__["default"].legend.onclickedition, e);
    }

    /**
     * this method is called by event '' on '' tag form...
     *
     * 'e' contains the option object into 'e.target.data' !
     * 'e' contains the id editor into 'e.target.editorID' !
     *
     * @param {Object} e - HTMLElement
     * @private
     * @fires Legend#editor:legend:onchangevalue
     */
  }, {
    key: "onChangeValueLegendMapBox",
    value: function onChangeValueLegendMapBox(e) {
      logger.trace("onChangeValueLegendMapBox", e);
      e.editorID = this.id;
      e.data = this.options;
      eventbusjs__WEBPACK_IMPORTED_MODULE_0___default().dispatch(_Event__WEBPACK_IMPORTED_MODULE_1__["default"].legend.onchangevalue, e);
    }
  }]);
}();
;

// ################################################################### //
// ########################## CONSTANTES ############################# //
// ################################################################### //

/**
 * List of supported properties
 */
Legend.PROPERTIES = {
  line: ["line-color", "line-dasharray", "line-opacity", "line-width"],
  fill: ["fill-color", "fill-opacity", "fill-outline-color", "fill-pattern"],
  background: ["background-color", "background-opacity", "background-pattern"],
  circle: ["circle-color", "circle-opacity", "circle-stroke-color", "circle-stroke-opacity", "circle-stroke-width"],
  icon: ["icon-color", "icon-image", "icon-opacity", "__icon-size"],
  text: ["__text-anchor", "text-color", "text-field", "__text-font", "__text-opacity", "__text-size"]
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Legend);

/***/ }),

/***/ "./src/packages/Controls/Editor/Search.js":
/*!************************************************!*\
  !*** ./src/packages/Controls/Editor/Search.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var eventbusjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! eventbusjs */ "./node_modules/eventbusjs/lib/eventbus.min.js");
/* harmony import */ var eventbusjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(eventbusjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Event */ "./src/packages/Controls/Editor/Event.js");
/* harmony import */ var _Utils_Helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utils/Helper */ "./src/packages/Utils/Helper.js");
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Utils/LoggerByDefault */ "./src/packages/Utils/LoggerByDefault.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




var logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_3__["default"].getLogger("editor-search");

/**
 * @classdesc
 *
 * TODO MapBox search management
 *
 * @constructor
 * @alias ol.style.editor.Search
 * @param {Object} options - options for function call.
 * @todo
 * @example
 *   var Search = new Search ({
 *      target : ...,
 *      tools : {
 *          // ...
 *      }
 *      title : "Filtres de recherche :",
 *      obj : {}
 *   });
 *  Search.add();
 *  Search.display(true);
 *  Search.getContainer();
 */
var Search = /*#__PURE__*/function () {
  function Search(options) {
    _classCallCheck(this, Search);
    logger.trace("[constructor] Search", options);

    // options
    this.options = options || {
      // default...
      target: null,
      tools: null,
      title: null,
      obj: null
    };
    if (!(this instanceof Search)) {
      throw new TypeError("ERROR CLASS_CONSTRUCTOR");
    }
    this._initialize();
    this._initContainer();
  }

  /**
   * Initialize component
   * (called by constructor)
   *
   * @private
   */
  return _createClass(Search, [{
    key: "_initialize",
    value: function _initialize() {
      // unique editor id (optional!)
      this.id = this.options.id || null;
      if (!this.options.target) {
        // cf. add()
      }
      var _toolsDefault = {};
      if (!this.options.tools) {
        this.options.tools = _toolsDefault;
      }
      _Utils_Helper__WEBPACK_IMPORTED_MODULE_2__["default"].mergeParams(this.options.tools, _toolsDefault, false);
      if (!this.options.obj) {
        // choix d'avoir un objet vide pour une edition futur...
        this.options.obj = {};
      }
      if (!this.options.title) {
        this.options.title = "Recherche de couches :";
      }
      this.container = null;

      // DOM : className or id
      this.name = {
        target: "GPEditorMapBoxSearchTarget",
        container: "GPEditorMapBoxSearchContainer"
        // TODO ...
      };
    }

    /**
     * Graphical rendering of the component
     * (called by constructor)
     *
     * @private
     * @example
     * <div class="GPEditorMapBoxSearchContainer">
     *  // ...
     * </div>
     */
  }, {
    key: "_initContainer",
    value: function _initContainer() {
      // contexte
      // var self = this;
      var _search = JSON.parse(JSON.stringify(this.options.obj)); // on manipule une copie  !

      if (_search.layers) {
        if (_search.layers.length === 0) {
          logger.info("tag 'layers' is empty !");
        }
      }
      var div = document.createElement("div");
      div.className = this.name.container;

      // TODO...
      // outil de recherche des couches mapbox.
      // 2 modes de recherches : exact ou par autocompletion
      // affichage des resultats directement dans la liste des couches
      // la recherche porte sur les champs suiavnts (options):
      // * id (par defaut)
      // * source-layer (par defaut)
      // * type (ex. Symbol)
      // * field (ex. HOPITAL_PONC) > recherche dans le champs filtre
      // main container
      this.container = div;
    }

    // ################################################################### //
    // ##################### public methods ############################## //
    // ################################################################### //
    /**
     * Add element into target DOM
     * @returns {Object} - Search instance
     */
  }, {
    key: "add",
    value: function add() {
      if (!this.options.target) {
        if (!document.getElementById(this.name.target)) {
          var div = document.createElement("div");
          div.id = this.name.target;
          var node = document.documentElement || document.getElementsByTagName("body")[0] || document.getElementsByTagName("head")[0];
          node.appendChild(div);
        }
        this.options.target = document.getElementById(this.name.target);
      }
      if (this.container) {
        this.options.target.appendChild(this.container);
      }
      return this;
    }

    /**
     * Set display container or get
     *
     * @param {Boolean} display - show/hidden container or get status
     * @returns {Boolean} - true/false
     */
  }, {
    key: "display",
    value: function display(_display) {
      logger.trace("display()", _display);
      if (typeof _display !== "undefined") {
        this.container.style.display = _display ? "flex" : "none";
      }
      return this.container.style.display === "flex";
    }

    /**
     * Get container (DOM)
     *
     * @returns {DOMElement} DOM element
     */
  }, {
    key: "getContainer",
    value: function getContainer() {
      return this.container;
    }

    // ################################################################### //
    // ####################### handlers events to dom #################### //
    // ################################################################### //
    /**
     * this method is called by event '' on '' tag form...
     *
     * 'e' contains the option object into 'e.target.data' !
     * 'e' contains the id editor into 'e.target.editorID' !
     *
     * @param {Object} e - HTMLElement
     * @private
     * @fires Search#editor:search:onsubmit
     */
  }, {
    key: "onSubmitSearchLayersMapBox",
    value: function onSubmitSearchLayersMapBox(e) {
      logger.trace("onSubmitSearchLayersMapBox", e);
      e.editorID = this.id;
      e.data = this.options;
      eventbusjs__WEBPACK_IMPORTED_MODULE_0___default().dispatch(_Event__WEBPACK_IMPORTED_MODULE_1__["default"].search.onsubmit, e);
    }

    /**
     * this method is called by event '' on '' tag form...
     *
     * 'e' contains the option object into 'e.target.data' !
     * 'e' contains the id editor into 'e.target.editorID' !
     *
     * @param {Object} e - HTMLElement
     * @private
     * @fires Search#editor:search:onautocomplete
     */
  }, {
    key: "onAutocompleteSearchLayersMapBox",
    value: function onAutocompleteSearchLayersMapBox(e) {
      logger.trace("onAutocompleteSearchLayersMapBox", e);
      e.editorID = this.id;
      e.data = this.options;
      eventbusjs__WEBPACK_IMPORTED_MODULE_0___default().dispatch(_Event__WEBPACK_IMPORTED_MODULE_1__["default"].search.onautocomplete, e);
    }
  }]);
}();
;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Search);

/***/ }),

/***/ "./src/packages/Controls/Editor/Style.js":
/*!***********************************************!*\
  !*** ./src/packages/Controls/Editor/Style.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var eventbusjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! eventbusjs */ "./node_modules/eventbusjs/lib/eventbus.min.js");
/* harmony import */ var eventbusjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(eventbusjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Event */ "./src/packages/Controls/Editor/Event.js");
/* harmony import */ var _Utils_Helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utils/Helper */ "./src/packages/Utils/Helper.js");
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Utils/LoggerByDefault */ "./src/packages/Utils/LoggerByDefault.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




var logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_3__["default"].getLogger("editor-style");

/**
 * @classdesc
 *
 * MapBox styles management
 *
 * @constructor
 * @alias ol.style.editor.Style
 * @param {Object} options - options for function call.
 * @example
 *   var style = new Style ({
 *      target : ...,
 *      position : 1, // identifiant de position (unique !)
 *      tools : {
 *          edition : false,
 *          scale : true
 *      },
 *      title : "Styles (JSON)",
 *      obj : {
 *          paint : {},
 *          layout : {}
 *      }
 *   });
 *  style.add();
 *  style.display(true);
 *  style.getContainer();
 */
var Style = /*#__PURE__*/function () {
  function Style(options) {
    _classCallCheck(this, Style);
    logger.trace("[constructor] Style", options);

    // options
    this.options = options || {
      // default...
      target: null,
      position: 0,
      tools: null,
      title: null,
      obj: null
    };
    if (!(this instanceof Style)) {
      throw new TypeError("ERROR CLASS_CONSTRUCTOR");
    }
    this._initialize();
    this._initContainer();
  }

  /**
   * Initialize component
   * (called by constructor)
   *
   * @private
   */
  return _createClass(Style, [{
    key: "_initialize",
    value: function _initialize() {
      // unique editor id (optional!)
      this.id = this.options.id || null;
      if (!this.options.target) {
        // cf. add()
      }
      if (!this.options.position) {
        this.options.position = 0;
      }
      var _toolsDefault = {
        scale: true,
        edition: false
      };
      if (!this.options.tools) {
        this.options.tools = _toolsDefault;
      }
      _Utils_Helper__WEBPACK_IMPORTED_MODULE_2__["default"].mergeParams(this.options.tools, _toolsDefault, false);
      if (!this.options.obj) {
        // choix d'avoir un objet vide pour une edition futur...
        this.options.obj = {
          paint: {},
          layout: {}
        };
      }
      if (!this.options.title) {
        this.options.title = "JSON Styles :";
      }
      this.container = null;

      // DOM : className or id
      this.name = {
        target: "GPEditorMapBoxStyleTarget",
        container: "GPEditorMapBoxStyleContainer",
        containerjson: "GPEditorMapBoxStyleJsonContainer",
        jsonlabel: "GPEditorMapBoxStyleJsonTitle",
        jsondisplay: "GPEditorMapBoxStyleJsonDisplay",
        containertoolsscale: "GPEditorMapBoxStyleToolsScaleContainer",
        scaletitle: "GPEditorMapBoxStyleScaleTitle",
        containertoolsminscale: "GPEditorMapBoxStyleToolsScaleMinContainer",
        scalelabelmin: "GPEditorMapBoxStyleScaleLabelMin",
        scaleinputmin: "GPEditorMapBoxStyleScaleInputMin",
        containertoolsmaxscale: "GPEditorMapBoxStyleToolsScaleMaxContainer",
        scalelabelmax: "GPEditorMapBoxStyleScaleLabelMax",
        scaleinputmax: "GPEditorMapBoxStyleScaleInputMax",
        containertoolsedit: "GPEditorMapBoxStyleToolsEditionContainer"
      };
    }

    /**
     * Graphical rendering of the component
     * ie. this.container
     * (called by constructor)
     *
     * @private
     * @example
     * <div class="GPEditorMapBoxStyleContainer">
     *   <div class ="GPEditorMapBoxStyleJsonContainer">
     *      <label class="GPEditorMapBoxStyleJsonTitle">JSON Styles :</label>
     *      <pre class="GPEditorMapBoxStyleJsonDisplay">...</pre>
     *   </div>
     *   <div class ="GPEditorMapBoxStyleToolsScaleContainer"></div>
     *   <div class ="GPEditorMapBoxStyleToolsEditionContainer"></div>
     * </div>
     */
  }, {
    key: "_initContainer",
    value: function _initContainer() {
      // contexte
      var self = this;
      var _found = false;
      var _obj = JSON.parse(JSON.stringify(this.options.obj)); // on manipule une copie  !
      var _style = {};

      // styles into tag 'paint' ?
      if (_obj.paint) {
        _found = true;
        _style.paint = _obj.paint;
        if (Object.keys(_obj.paint).length === 0) {
          logger.info("tag 'paint' is empty !");
        }
      }

      // if not, search into tag 'layout' !
      if (_obj.layout) {
        _found = true;
        _style.layout = _obj.layout;
        // FIXME delete visibility from display ?
        if (_obj.layout.visibility) {
          delete _style.visibility;
        }
        if (Object.keys(_obj.layout).length === 0) {
          logger.info("tag 'layout' is empty !");
        }
      }
      var div = document.createElement("div");
      div.className = this.name.container;
      var json = null;
      if (_found) {
        var strJson = JSON.stringify(_style, null, 4);
        json = this._syntaxHighlight(strJson);
      }
      var divJson = document.createElement("div");
      divJson.className = this.name.containerjson;
      var label = document.createElement("label");
      label.className = this.name.jsonlabel;
      label.innerHTML = this.options.title;
      divJson.appendChild(label);
      var pre = document.createElement("pre");
      pre.className = this.name.jsondisplay;
      pre.innerHTML = json;
      if (pre.addEventListener) {
        pre.addEventListener("click", function (e) {
          if (self.options.tools.edition) {
            self.onEditJsonStyleMapBox(e);
          }
        });
      } else if (pre.attachEvent) {
        pre.attachEvent("onclick", function (e) {
          if (self.options.tools.edition) {
            self.onEditJsonStyleMapBox(e);
          }
        });
      }
      divJson.appendChild(pre);
      div.appendChild(divJson);

      // scale
      if (this.options.tools.scale) {
        div.appendChild(this._createElementToolsScale({
          min: _style.layout ? _style.layout.minzoom : 0,
          max: _style.layout ? _style.layout.maxzoom : 21
        }));
      }

      // TODO menu d'edition
      if (this.options.tools.edition) {
        div.appendChild(this._createElementToolsEdition());
      }

      // main container
      this.container = div;
    }

    /**
     * Graphical rendering of the scale tools
     *
     * @param {Object} scale - {min,max} or 0|21
     * @returns {DOMElement} DOM element
     *
     * @private
     * @example
     *   <div class ="GPEditorMapBoxStyleToolsScaleContainer"></div>
     */
  }, {
    key: "_createElementToolsScale",
    value: function _createElementToolsScale(scale) {
      logger.trace("_createElementToolsScale");
      var self = this;
      var obj = this.options.obj;
      var divToolsScale = document.createElement("div");
      divToolsScale.className = this.name.containertoolsscale;

      // FIXME Titre ?
      // var label = document.createElement("label");
      // label.className = this.name.scaletitle;
      // label.innerHTML = "Scale :";
      // divToolsScale.appendChild(label);
      var divMin = document.createElement("div");
      divMin.className = this.name.containertoolsminscale;
      var labelMin = document.createElement("label");
      labelMin.className = this.name.scalelabelmin;
      labelMin.innerHTML = "min :";
      divMin.appendChild(labelMin);
      var inputMin = document.createElement("input");
      inputMin.className = this.name.scaleinputmin;
      inputMin.type = "range";
      inputMin.value = scale.min || 0;
      inputMin.title = scale.min || 0;
      inputMin.disabled = false;
      inputMin.min = 0;
      inputMin.max = 21;
      inputMin.data = obj; // on lie le DOM et la couche, utile lors d'evenement !
      if (inputMin.addEventListener) {
        inputMin.addEventListener("change", function (e) {
          self.onChangeStyleScaleMinMapBox(e);
        });
      } else if (inputMin.appendChild) {
        inputMin.appendChild("onchange", function (e) {
          self.onChangeStyleScaleMinMapBox(e);
        });
      }
      divMin.appendChild(inputMin);
      divToolsScale.appendChild(divMin);
      var divMax = document.createElement("div");
      divMax.className = this.name.containertoolsmaxscale;
      var labelMax = document.createElement("label");
      labelMax.className = this.name.scalelabelmax;
      labelMax.innerHTML = "max :";
      divMax.appendChild(labelMax);
      var inputMax = document.createElement("input");
      inputMax.className = this.name.scaleinputmin;
      inputMax.type = "range";
      inputMax.value = scale.max || 21;
      inputMax.title = scale.max || 21;
      inputMax.disabled = false;
      inputMax.min = 0;
      inputMax.max = 21;
      inputMax.data = obj; // on lie le DOM et la couche, utile lors d'evenement !
      if (inputMax.addEventListener) {
        inputMax.addEventListener("change", function (e) {
          self.onChangeStyleScaleMaxMapBox(e);
        });
      } else if (inputMax.appendChild) {
        inputMax.appendChild("onchange", function (e) {
          self.onChangeStyleScaleMaxMapBox(e);
        });
      }
      divMax.appendChild(inputMax);
      divToolsScale.appendChild(divMax);
      return divToolsScale;
    }

    /**
     * Graphical rendering of the edition tools
     *
     * @returns {DOMElement} DOM element
     *
     * @private
     * @example
     *   <div class ="GPEditorMapBoxStyleToolsScaleContainer"></div>
     */
  }, {
    key: "_createElementToolsEdition",
    value: function _createElementToolsEdition() {
      logger.warn("_createElementToolsEdition, it's not yet implemented !");
      var divToolsEdit = document.createElement("div");
      divToolsEdit.className = this.name.containertoolsedit;
      return divToolsEdit;
    }

    // ################################################################### //
    // ##################### private methods ############################# //
    // ################################################################### //
    /**
     * Transform a JSON into a DOM with a syntax in color
     *
     * @private
     * @param {Object} json - json.
     * @returns {DOMElement} dom element
     */
  }, {
    key: "_syntaxHighlight",
    value: function _syntaxHighlight(json) {
      json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, function (match) {
        var cls = "gp-json-number";
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = "gp-json-key";
          } else {
            cls = "gp-json-string";
          }
        } else if (/true|false/.test(match)) {
          cls = "gp-json-boolean";
        } else if (/null/.test(match)) {
          cls = "gp-json-null";
        }
        return "<span class='" + cls + "'>" + match + "</span>";
      });
    }

    // ################################################################### //
    // ##################### public methods ############################## //
    // ################################################################### //
    /**
     * Add element into target DOM
     * @returns {Object} - Legend instance
     */
  }, {
    key: "add",
    value: function add() {
      if (!this.options.target) {
        if (!document.getElementById(this.name.target)) {
          var div = document.createElement("div");
          div.id = this.name.target;
          var node = document.documentElement || document.getElementsByTagName("body")[0] || document.getElementsByTagName("head")[0];
          node.appendChild(div);
        }
        this.options.target = document.getElementById(this.name.target);
      }
      if (this.container) {
        this.options.target.appendChild(this.container);
      }
      return this;
    }

    /**
     * Set display container or get
     *
     * @param {Boolean} display - show/hidden container or get status
     * @returns {Boolean} - true/false
     */
  }, {
    key: "display",
    value: function display(_display) {
      logger.trace("display()", _display);
      if (typeof _display !== "undefined") {
        this.container.style.display = _display ? "flex" : "none";
      }
      return this.container.style.display === "flex";
    }

    /**
     * Get container (DOM)
     *
     * @returns {DOMElement} DOM element
     */
  }, {
    key: "getContainer",
    value: function getContainer() {
      return this.container;
    }

    // ################################################################### //
    // ####################### handlers events to dom #################### //
    // ################################################################### //
    /**
     * this method is called by event '' on '' tag form...
     *
     * 'e' contains the option object into 'e.target.data' !
     * 'e' contains the id editor into 'e.target.editorID' !
     *
     * @param {Object} e - HTMLElement
     * @private
     * @fires Style#editor:style:oneditjson
     */
  }, {
    key: "onEditJsonStyleMapBox",
    value: function onEditJsonStyleMapBox(e) {
      logger.trace("onEditJsonStyleMapBox", e);
      e.editorID = this.id;
      e.data = this.options;
      eventbusjs__WEBPACK_IMPORTED_MODULE_0___default().dispatch(_Event__WEBPACK_IMPORTED_MODULE_1__["default"].style.oneditjson, e);
    }

    /**
     * this method is called by event '' on '' tag form...
     *
     * 'e' contains the option object into 'e.target.data' !
     * 'e' contains the id editor into 'e.target.editorID' !
     *
     * @param {Object} e - HTMLElement
     * @private
     * @fires Style#editor:style:scale:onchangemin
     */
  }, {
    key: "onChangeStyleScaleMinMapBox",
    value: function onChangeStyleScaleMinMapBox(e) {
      logger.trace("onChangeStyleScaleMinMapBox", e);
      e.editorID = this.id;
      e.data = this.options;
      eventbusjs__WEBPACK_IMPORTED_MODULE_0___default().dispatch(_Event__WEBPACK_IMPORTED_MODULE_1__["default"].style.scale.onchangemin, e);
    }

    /**
     * this method is called by event '' on '' tag form...
     *
     * 'e' contains the option object into 'e.target.data' !
     * 'e' contains the id editor into 'e.target.editorID' !
     *
     * @param {Object} e - HTMLElement
     * @private
     * @fires Style#editor:style:scale:onchangemax
     */
  }, {
    key: "onChangeStyleScaleMaxMapBox",
    value: function onChangeStyleScaleMaxMapBox(e) {
      logger.trace("onChangeStyleScaleMaxMapBox", e);
      e.editorID = this.id;
      e.data = this.options;
      eventbusjs__WEBPACK_IMPORTED_MODULE_0___default().dispatch(_Event__WEBPACK_IMPORTED_MODULE_1__["default"].style.scale.onchangemax, e);
    }
  }]);
}();
;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Style);

/***/ }),

/***/ "./src/packages/Controls/Editor/Themes.js":
/*!************************************************!*\
  !*** ./src/packages/Controls/Editor/Themes.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var eventbusjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! eventbusjs */ "./node_modules/eventbusjs/lib/eventbus.min.js");
/* harmony import */ var eventbusjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(eventbusjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Event */ "./src/packages/Controls/Editor/Event.js");
/* harmony import */ var _Utils_Helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utils/Helper */ "./src/packages/Utils/Helper.js");
/* harmony import */ var _Utils_SelectorID__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Utils/SelectorID */ "./src/packages/Utils/SelectorID.js");
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Utils/LoggerByDefault */ "./src/packages/Utils/LoggerByDefault.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }





var logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_4__["default"].getLogger("editor-themes");

/**
 * @classdesc
 *
 * Mapbox Themes management
 *
 * @constructor
 * @alias ol.style.editor.Theme
 * @param {Object} options - options for function call.
 * @example
 *   var theme = new Themes ({
 *        "target": "",
 *        "tools": {
 *          "thumbnails": true,
 *          "button" : {
 *              "visible" : true,
 *              "type" : "radio" (par defaut) | "checkbox"
 *          }
 *        },
 *        "obj": {
 *          "themesSummary": "", // Titre du composant (non graphique !)
 *          "themes": [{
 *             "thumbnail": "data/images/layer0.png",
 *             "name": "standard0",
 *             "url": "data/styles/layer0.json",
 *             "description": "",
 *             "selected" : true
 *          },{
 *             "thumbnail": "data/images/layer1.png",
 *             "name": "standard1",
 *             "url": "data/styles/layer1.json",
 *             "description": ""
 *          }]
 *        }
 *   });
 *  theme.add();
 *  theme.display(true);
 *  theme.getContainer();
 */
var Themes = /*#__PURE__*/function () {
  function Themes(options) {
    _classCallCheck(this, Themes);
    logger.trace("[constructor] Themes", options);

    // options
    this.options = options || {
      // TODO default...
    };
    if (!(this instanceof Themes)) {
      throw new TypeError("ERROR CLASS_CONSTRUCTOR");
    }
    this._initialize();
    this._initContainer();
  }

  /**
   * Initialize component
   * (called by constructor)
   *
   * @private
   */
  return _createClass(Themes, [{
    key: "_initialize",
    value: function _initialize() {
      // unique editor id (optional!)
      this.id = this.options.id || null;
      if (!this.options.target) {
        // cf. add()
      }
      var _toolsDefault = {
        thumbnails: true,
        button: {
          visible: true,
          type: "radio"
        }
      };
      if (!this.options.tools || Object.keys(this.options.tools).length === 0) {
        this.options.tools = _toolsDefault;
      }
      _Utils_Helper__WEBPACK_IMPORTED_MODULE_2__["default"].mergeParams(this.options.tools, _toolsDefault, false);
      if (typeof this.options.obj === "undefined" || this.options.obj === null || !this.options.obj) {
        // vide par defaut ?
        this.options.obj = {
          themesSummary: "",
          themes: []
        };
      }
      this.container = null;

      // DOM : className or id
      this.name = {
        target: "GPEditorMapBoxThemeTarget",
        container: "GPEditorMapBoxThemesContainer",
        containertheme: "GPEditorMapBoxThemeContainer",
        containerthemeID: "GPEditorMapBoxThemeContainer_ID_",
        input: "GPEditorMapBoxThemeInput",
        inputID: "GPEditorMapBoxThemeInput_ID_",
        label: "GPEditorMapBoxThemeTitle",
        labelID: "GPEditorMapBoxThemeTitle_ID_",
        image: "GPEditorMapBoxThemeImage",
        imageID: "GPEditorMapBoxThemeImage_ID_",
        message: "GPEditorMapBoxThemeMessage"
      };
    }

    /**
     * Graphical rendering of the component
     * (called by constructor)
     *
     * @private
     * @example
     *  <div class="GPEditorMapBoxThemesContainer">
     *      <div id="GPEditorMapBoxThemeContainer-1" class="GPEditorMapBoxThemeContainer">
     *          <input type="radio" id="GPEditorMapBoxThemeInput-1" class="GPEditorMapBoxThemeInput" name="1552920176933">
     *          <img class="GPEditorMapBoxThemeImage" src="http://image1.png" alt="Description1"></img>
     *          <label for="GPEditorMapBoxThemeInput-1" class="GPEditorMapBoxThemeTitle">Titre1</label>
     *      </div>
     *      <div id="GPEditorMapBoxThemeContainer-2" class="GPEditorMapBoxThemeContainer">
     *          <input type="radio" id="GPEditorMapBoxThemeInput-2" class="GPEditorMapBoxThemeInput" name="1552920176934">
     *          <img class="GPEditorMapBoxThemeImage" src="http://image2.png" alt="Description2"></img>
     *          <label for="GPEditorMapBoxThemeInput-2" class="GPEditorMapBoxThemeTitle">Titre2</label>
     *      </div>
     * </div>
     */
  }, {
    key: "_initContainer",
    value: function _initContainer() {
      // contexte
      var self = this;
      var obj = this.options.obj;
      var id = this.id || _Utils_SelectorID__WEBPACK_IMPORTED_MODULE_3__["default"].generate();

      // div principale
      var div = document.createElement("div");
      div.className = this.name.container;
      div.title = obj.themesSummary || "";
      var _lstThemes = obj.themes;
      if (_lstThemes) {
        for (var i = 0; i < _lstThemes.length; i++) {
          var _theme = _lstThemes[i];

          // div pour chaque theme
          var divTheme = document.createElement("div");
          divTheme.id = this.name.containerthemeID + i + "_" + id;
          divTheme.className = this.name.containertheme;
          divTheme.tabIndex = i;

          // url du style est obligatoire !
          var _url = _theme.url;
          // style selectionné par defaut (uniquement en mode radio-button !?)
          var _selected = _theme.selected || false;
          if (_url) {
            // bouton
            var button = this.options.tools.button;
            if (button.visible) {
              var _type = button.type === "checkbox" ? "checkbox" : "radio";
              var _button = document.createElement("input");
              _button.type = _type;
              _button.id = this.name.inputID + i + "_" + id;
              _button.className = this.name.input;
              _button.name = id;
              _button.checked = _selected;
              _button.data = _url; // on lie le DOM et la couche, utile lors d'evenement !
              if (_button.addEventListener) {
                _button.addEventListener("click", function (e) {
                  self.onClickThemeTitleMapBox(e);
                });
              } else if (_button.attachEvent) {
                _button.attachEvent("onclick", function (e) {
                  self.onClickThemeTitleMapBox(e);
                });
              }
              divTheme.appendChild(_button);
            }
            // vignette
            if (this.options.tools.thumbnails) {
              if (_theme.thumbnail) {
                var _img = document.createElement("img");
                _img.id = this.name.imageID + i + "_" + id;
                _img.className = this.name.image;
                _img.src = _theme.thumbnail;
                _img.alt = _theme.thumbnail;
                _img.title = _theme.description || ""; // une description au survol de l'image ou titre...
                _img.data = _url; // on lie le DOM et la couche, utile lors d'evenement !
                if (_img.addEventListener) {
                  _img.addEventListener("click", function (e) {
                    self.onClickThemeImageMapBox(e);
                    // maj du radio button
                    var nodes = e.target.parentElement.childNodes;
                    if (nodes) {
                      var node = nodes[0];
                      if (node.tagName.toLowerCase() === "input") {
                        node.checked = !node.checked;
                      }
                    }
                  });
                } else if (_img.attachEvent) {
                  _img.attachEvent("onclick", function (e) {
                    self.onClickThemeImageMapBox(e);
                    var nodes = e.target.parentElement.childNodes;
                    if (nodes) {
                      var node = nodes[0];
                      if (node.tagName.toLowerCase() === "input") {
                        node.checked = !node.checked;
                      }
                    }
                  });
                }
                divTheme.appendChild(_img);
              }
            }
            // label
            if (_theme.name) {
              var _label = document.createElement("label");
              _label.id = this.name.labelID + i + "_" + id;
              if (this.options.tools.button.visible) {
                _label.htmlFor = _button.id;
              }
              _label.className = this.name.label;
              _label.innerHTML = _theme.name;
              _label.title = _theme.description || ""; // une description au survol de l'image ou titre...
              _label.data = _url; // on lie le DOM et la couche, utile lors d'evenement !
              if (!this.options.tools.button.visible) {
                if (_label.addEventListener) {
                  _label.addEventListener("click", function (e) {
                    self.onClickThemeTitleMapBox(e);
                  });
                } else if (_label.attachEvent) {
                  _label.attachEvent("onclick", function (e) {
                    self.onClickThemeTitleMapBox(e);
                  });
                }
              }
              divTheme.appendChild(_label);
            }
          } else {
            var _msg = document.createElement("label");
            _msg.className = this.name.message;
            _msg.innerHTML = "Thème non disponible...";
            divTheme.appendChild(_msg);
          }
          div.appendChild(divTheme);
        }
      }
      this.container = div;
    }

    // ################################################################### //
    // ##################### public methods ############################## //
    // ################################################################### //
    /**
     * Add element into target DOM
     * @returns {Object} - Legend instance
     */
  }, {
    key: "add",
    value: function add() {
      if (!this.options.target) {
        if (!document.getElementById(this.name.target)) {
          var div = document.createElement("div");
          div.id = this.name.target;
          var node = document.documentElement || document.getElementsByTagName("body")[0] || document.getElementsByTagName("head")[0];
          node.appendChild(div);
        }
        this.options.target = document.getElementById(this.name.target);
      }
      if (this.container) {
        this.options.target.appendChild(this.container);
      }
      return this;
    }

    /**
     * Set display container or get
     *
     * @param {Boolean} display - show/hidden container or get status
     * @returns {Boolean} - true/false
     */
  }, {
    key: "display",
    value: function display(_display) {
      logger.trace("display()", _display);
      if (typeof _display !== "undefined") {
        this.container.style.display = _display ? "flex" : "none";
      }
      return this.container.style.display === "flex";
    }

    /**
     * Get container (DOM)
     *
     * @returns {DOMElement} DOM element
     */
  }, {
    key: "getContainer",
    value: function getContainer() {
      return this.container;
    }

    // ################################################################### //
    // ####################### handlers events to dom #################### //
    // ################################################################### //
    /**
     * this method is called by event '' on '' tag form
     *
     * @param {Object} e - HTMLElement
     * @private
     * @fires Themes#editor:themes:image
     */
  }, {
    key: "onClickThemeImageMapBox",
    value: function onClickThemeImageMapBox(e) {
      logger.trace("onClickThemeImageMapBox", e);
      e.editorID = this.id;
      e.data = this.options;
      if (this.options.tools.button.type === "checkbox") {
        // GPEditorMapBoxThemeInput_ID_0_1571317605868
        var targetIDX = e.target.previousSibling.id.substring(e.target.previousSibling.id.lastIndexOf("_") + 1);
        var _inputs = document.getElementsByClassName(this.name.input);
        for (var i = 0; i < _inputs.length; i++) {
          var el = _inputs[i];
          if (el.id === e.target.previousSibling.id) {
            continue;
          }
          var elIDX = el.id.substring(el.id.lastIndexOf("_") + 1);
          if (elIDX !== targetIDX) {
            continue;
          }
          el.checked = false;
        }
      }
      eventbusjs__WEBPACK_IMPORTED_MODULE_0___default().dispatch(_Event__WEBPACK_IMPORTED_MODULE_1__["default"].themes.onclickimage, e);
    }

    /**
     * this method is called by event '' on '' tag form
     *
     * @param {Object} e - HTMLElement
     * @private
     * @fires Themes#editor:themes:title
     */
  }, {
    key: "onClickThemeTitleMapBox",
    value: function onClickThemeTitleMapBox(e) {
      logger.trace("onClickThemeTitleMapBox", e);
      e.editorID = this.id;
      e.data = this.options;
      if (this.options.tools.button.type === "checkbox") {
        // GPEditorMapBoxThemeInput_ID_0_1571317605868
        var targetIDX = e.target.id.substring(e.target.id.lastIndexOf("_") + 1);
        var _inputs = document.getElementsByClassName(this.name.input);
        for (var i = 0; i < _inputs.length; i++) {
          var el = _inputs[i];
          if (el.id === e.target.id) {
            continue;
          }
          var elIDX = el.id.substring(el.id.lastIndexOf("_") + 1);
          if (elIDX !== targetIDX) {
            continue;
          }
          el.checked = false;
        }
      }
      eventbusjs__WEBPACK_IMPORTED_MODULE_0___default().dispatch(_Event__WEBPACK_IMPORTED_MODULE_1__["default"].themes.onclicktitle, e);
    }
  }]);
}();
;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Themes);

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

/***/ "./node_modules/eventbusjs/lib/eventbus.min.js":
/*!*****************************************************!*\
  !*** ./node_modules/eventbusjs/lib/eventbus.min.js ***!
  \*****************************************************/
/***/ (function(module) {

(function(root,factory){if(true)module.exports=factory();else {}})(this,function(){var EventBusClass={};EventBusClass=function(){this.listeners={}};EventBusClass.prototype={addEventListener:function(type,callback,scope){var args=[];var numOfArgs=arguments.length;for(var i=0;i<numOfArgs;i++){args.push(arguments[i])}args=args.length>3?args.splice(3,args.length-1):[];if(typeof this.listeners[type]!="undefined"){this.listeners[type].push({scope:scope,callback:callback,args:args})}else{this.listeners[type]=[{scope:scope,callback:callback,args:args}]}},removeEventListener:function(type,callback,scope){if(typeof this.listeners[type]!="undefined"){var numOfCallbacks=this.listeners[type].length;var newArray=[];for(var i=0;i<numOfCallbacks;i++){var listener=this.listeners[type][i];if(listener.scope==scope&&listener.callback==callback){}else{newArray.push(listener)}}this.listeners[type]=newArray}},hasEventListener:function(type,callback,scope){if(typeof this.listeners[type]!="undefined"){var numOfCallbacks=this.listeners[type].length;if(callback===undefined&&scope===undefined){return numOfCallbacks>0}for(var i=0;i<numOfCallbacks;i++){var listener=this.listeners[type][i];if((scope?listener.scope==scope:true)&&listener.callback==callback){return true}}}return false},dispatch:function(type,target){var event={type:type,target:target};var args=[];var numOfArgs=arguments.length;for(var i=0;i<numOfArgs;i++){args.push(arguments[i])}args=args.length>2?args.splice(2,args.length-1):[];args=[event].concat(args);if(typeof this.listeners[type]!="undefined"){var listeners=this.listeners[type].slice();var numOfCallbacks=listeners.length;for(var i=0;i<numOfCallbacks;i++){var listener=listeners[i];if(listener&&listener.callback){var concatArgs=args.concat(listener.args);listener.callback.apply(listener.scope,concatArgs)}}}},getEvents:function(){var str="";for(var type in this.listeners){var numOfCallbacks=this.listeners[type].length;for(var i=0;i<numOfCallbacks;i++){var listener=this.listeners[type][i];str+=listener.scope&&listener.scope.className?listener.scope.className:"anonymous";str+=" listen for '"+type+"'\n"}}return str}};var EventBus=new EventBusClass;return EventBus});

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

/***/ "./src/packages/CSS/Controls/Editor/GPFeditor.css":
/*!********************************************************!*\
  !*** ./src/packages/CSS/Controls/Editor/GPFeditor.css ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/*!************************************************!*\
  !*** ./src/packages/Controls/Editor/Editor.js ***!
  \************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CSS_Controls_Editor_GPFeditor_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../CSS/Controls/Editor/GPFeditor.css */ "./src/packages/CSS/Controls/Editor/GPFeditor.css");
/* harmony import */ var eventbusjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! eventbusjs */ "./node_modules/eventbusjs/lib/eventbus.min.js");
/* harmony import */ var eventbusjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(eventbusjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Utils_Helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utils/Helper */ "./src/packages/Utils/Helper.js");
/* harmony import */ var _Utils_SelectorID__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Utils/SelectorID */ "./src/packages/Utils/SelectorID.js");
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Utils/LoggerByDefault */ "./src/packages/Utils/LoggerByDefault.js");
/* harmony import */ var _Style__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Style */ "./src/packages/Controls/Editor/Style.js");
/* harmony import */ var _Themes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Themes */ "./src/packages/Controls/Editor/Themes.js");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Filter */ "./src/packages/Controls/Editor/Filter.js");
/* harmony import */ var _Legend__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Legend */ "./src/packages/Controls/Editor/Legend.js");
/* harmony import */ var _Layer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Layer */ "./src/packages/Controls/Editor/Layer.js");
/* harmony import */ var _Group__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Group */ "./src/packages/Controls/Editor/Group.js");
/* harmony import */ var _Event__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Event */ "./src/packages/Controls/Editor/Event.js");
/* harmony import */ var _Search__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Search */ "./src/packages/Controls/Editor/Search.js");
/* harmony import */ var _EditorDOM__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./EditorDOM */ "./src/packages/Controls/Editor/EditorDOM.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// import CSS

// import "../../CSS/Controls/Editor/GPFeditorStyle.css";
// import library

// import local












// DOM

var logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_4__["default"].getLogger("editor");

/**
 * @classdesc
 *
 * Editor Styles MapBox...
 *
 * @constructor
 * @alias ol.style.Editor
 * @param {Object} options - options for function call.
 * @fires editor:layer:onclickvisibility
 * @fires editor:layer:onclickclone
 * @fires editor:layer:onclickremove
 * @fires editor:style:oneditjson
 * @fires editor:style:scale:onchangemin
 * @fires editor:style:scale:onchangemax
 * @fires editor:legend:onclickedition
 * @fires editor:legend:onchangevalue
 * @fires editor:filter:oneditjson
 * @fires editor:themes:onclickimage
 * @fires editor:themes:onclicktitle
 * @fires editor:group:oncollapse
 * @fires editor:onloaded
 * @example
 *   var editor = new Editor ({
 *      target : "",
 *      style : "data/styles/layer.json",
 *      themes: {
 *          themesSummary : "",
 *          themes : [{
 *             "thumbnail": "data/images/layer0.png",
 *             "name": "standard0",
 *             "url": "data/styles/layer0.json",
 *             "description": "",
 *             "selected" : true
 *          },{
 *             "thumbnail": "data/images/layer1.png",
 *             "name": "standard1",
 *             "url": "data/styles/layer1.json",
 *             "description": ""
 *          }]
 *      },
 *      scope : this,
 *      events : {
 *          "editor:layer:onclickvisibility" : ...,
 *          "editor:layer:onclickclone" : ...,
 *          "editor:layer:onclickremove" : ...,
 *          "editor:style:oneditjson" : ...,
 *          "editor:style:scale:onchangemin" : ...,
 *          "editor:style:scale:onchangemax" : ...,
 *          "editor:filter:oneditjson" : ...,
 *          "editor:themes:onclickimage" : this._onClickEventImageTheme(),
 *          "editor:themes:onclicktitle" : function(e) {...}
 *      },
 *      tools : {
 *          // afficher/cacher les themes (par defaut) ou utiliser les options
 *          themes : true | false | {
 *              target : "...",
 *              tools : {
 *                  "thumbnails": true,
 *                  "button": { visible : true, type : "checkbox" }
 *              },
 *          },
 *          layers : true | false,     // afficher les couches (layers)
 *          search : true | false,     // TODO : afficher l'outil de recheche de couches
 *          style : true | false,      // afficher les styles (sous menu layers)
 *          filter : true | false,     // afficher les filtres (sous menu layers)
 *          legend : true | false,     // afficher les legendes (layers)
 *          group : true | false,      // grouper les couches, l'option 'sort' doit être activée (layers)
 *          groupAuto : true | false,  // definir la construction automatiques des groupes
 *          sort : true | false,       // trier les couches (layers)
 *          sortBy : "id|class|geom",  // definir le type de tri (layers)
 *          sortOrder : "asc, desc",   // definir l'ordre de tri (layers)
 *          title : true | false       // afficher les titres des rubriques,
 *          collapse : true | false | undefined // afficher et/ou plier les couches ou ne pas afficher l'option,
 *          type : true | false,       // afficher le type de geometrie (layers)
 *          pin : true | false,        // afficher la puce pour chaque couche (layers)
 *          visibility : true | false, // afficher l'icone de visibilité (layers),
 *          icon : {                   // afficher l'icone "oeil" ou "checkbox" (layers),
 *              "image" : true,
 *              "anchor" : "start" // afficher l'icone au debut ou à la fin de la ligne
 *          },
 *          editable : true | false    // active l'edition de la legende (legendes)
 *      }
 *   });
 *   // options par defaut
 *   {
 *      themes : false,
 *      layers : true,
 *      search : false,
 *      style : false,
 *      filter : false,
 *      legend : false,
 *      group : false,
 *      groupAuto : false,
 *      sort : true,
 *      sortBy : "id",
 *      sortOrder : "asc",
 *      title : true,
 *      collapse : undefined,
 *      type : true,
 *      pin : true,
 *      visibility : true,
 *      icon : {
 *          image : true,
 *          anchor : "end"
 *      },
 *      editable : true
 *   }
 *   // Context
 *   editor.setContext("map", map);
 *   editor.setContext("layer", layer);
 *   // create DOM
 *   editor.createElement()
 *     .then(() => {
 *       console.warn(editor.getID());
 *       console.log(this.getContext("map"));
 *       console.log(this.getContext("layer"));
 *     })
 *     .catch(error => {});
 *   // possibility to add listeners with globale variable : eventbus
 *   eventbus.addEventListener("editor:style:scale:onchangemin", function (e) {...});
 */
var Editor = /*#__PURE__*/function () {
  function Editor(options) {
    _classCallCheck(this, Editor);
    logger.trace("[constructor] Editor", options);

    // options
    this.options = options || {
      // TODO default...
    };
    if (!(this instanceof Editor)) {
      throw new TypeError("ERROR CLASS_CONSTRUCTOR");
    }
    this._initialize();
  }

  /**
   * Initialize component
   * (called by constructor)
   *
   * @private
   */
  return _createClass(Editor, [{
    key: "_initialize",
    value: function _initialize() {
      // gestion des options
      if (!this.options.target) {
        logger.info("La 'target' n'est pas renseignée (options.target).");
      }
      if (!this.options.style) {
        logger.error("Le 'style' MapBox n'est pas renseigné (options.style) !");
        return;
      }
      if (this.options.events) {
        this._initEvents();
      } else {
        logger.warn("Les 'handlers' ne sont pas renseignés (options.events) !");
      }
      if (!this.options.themes) {
        logger.info("Les 'themes' MapBox ne sont pas renseignés (options.themes).");
      }

      // options par defaut
      var _toolsDefault = {
        themes: false,
        layers: true,
        search: false,
        style: false,
        filter: false,
        legend: false,
        group: false,
        groupAuto: false,
        sort: true,
        sortBy: "id",
        sortOrder: "asc",
        title: true,
        collapse: undefined,
        type: true,
        pin: true,
        visibility: true,
        icon: {
          image: true,
          anchor: "end"
        },
        editable: true
      };
      if (!this.options.tools) {
        logger.trace("Utilisation des outils MapBox par défaut (options.tools).");
        this.options.tools = _toolsDefault;
      }
      _Utils_Helper__WEBPACK_IMPORTED_MODULE_2__["default"].mergeParams(this.options.tools, _toolsDefault, false);

      // id unique
      this.id = this.options.id || _Utils_SelectorID__WEBPACK_IMPORTED_MODULE_3__["default"].generate();

      // context
      this.context = {};
      // property layers
      this.layers = [];
      // dom container
      this.container = null;
      // dom name
      this.name = {
        target: "GPEditorMapBoxTarget",
        container: "GPEditorMapBoxContainer",
        containerID: "GPEditorMapBoxContainer_ID_",
        containerLayers: "GPEditorMapBoxLayersContainer",
        titleLayers: "GPEditorMapBoxLayersTitle",
        titleLayersID: "GPEditorMapBoxLayersTitle_ID_",
        titleThemes: "GPEditorMapBoxThemesTitle",
        titleThemesID: "GPEditorMapBoxThemesTitle_ID_",
        sep: "GPEditorMapBoxSep"
      };
      // style json
      this.mapbox = {};
      // INFO
      // sprites :
      // {
      //     url : null,
      //     size : {
      //         h : null,
      //         w : null
      //     },
      //     json : {}
      // }
      this.sprites = {};
    }

    /**
    * Initialize events with handlers
    * (called by constructor)
    *
    * List Events :
    *          "editor:layer:visibility"
    *          "editor:layer:clone"
    *          "editor:layer:remove"
    *          "editor:style:edit"
    *          "editor:style:minScale"
    *          "editor:style:maxScale"
    *          "editor:filter:edit"
    *          "editor:themes:image",
    *          "editor:themes:title"
    * @private
    */
  }, {
    key: "_initEvents",
    value: function _initEvents() {
      var ctx = this.options.scope || this;
      var events = this.options.events;
      if (events) {
        for (var event in events) {
          if (events.hasOwnProperty(event)) {
            var handler = events[event];
            // test sur les events disponibles !
            if (handler) {
              if (!eventbusjs__WEBPACK_IMPORTED_MODULE_1___default().hasEventListener(event, handler, ctx)) {
                eventbusjs__WEBPACK_IMPORTED_MODULE_1___default().addEventListener(event, handler, ctx);
              }
            }
          }
        }
      }
    }

    /**
     * Graphical rendering of the component
     * (called by constructor)
     *
     * @example
     *  <div class="GPEditorMapBoxContainer" id="GPEditorMapBoxContainer_ID_0">
     *    <div id="GPEditorMapBoxThemesTitle" class="GPEditorMapBoxThemesTitle">Liste des 'thèmes'</div>
     *    <div class="GPEditorMapBoxThemesContainer">
     *      ...
     *    </div>
     *    <div id="GPEditorMapBoxLayersTitle" class="GPEditorMapBoxLayersTitle">Liste des 'couches'</div>
     *    <div class="GPEditorMapBoxLayersContainer">
     *      <div class="GPEditorMapBoxLayerContainer">
     *          <div id="GPEditorMapBoxLayerTitleContainer-0_1" class="GPEditorMapBoxLayerTitleContainer">
     *              <label class="GPEditorMapBoxLayerImageLabel"></label>
     *              <input id="GPEditorMapBoxLayerTitleInput-0_1" class="GPEditorMapBoxLayerTitleInput" type="checkbox">
     *              <label class="GPEditorMapBoxLayerTitleLabel" for="GPEditorMapBoxLayerTitleInput-0_1" title="states">population_lt_2m</label>
     *          </div>
     *      </div>
     *      <div class="GPEditorMapBoxLayerContainer">...</div>
     *      <div class="GPEditorMapBoxLayerContainer">...</div>
     *    </div>
     *  </div>
     * @private
     */
  }, {
    key: "_initContainer",
    value: function _initContainer() {
      logger.trace(this.mapbox);

      // existance d'un autre container (editeur) ?
      // var _idx = 0;
      // var elements = document.querySelectorAll("div[id^=" + this.name.containerID + "]");
      // for (var j = 0; j < elements.length; j++) {
      //     var element = elements[j];
      //     var num = parseInt(element.id.substring(element.id.lastIndexOf("_") + 1), 10);
      //     if (num > _idx) {
      //         _idx = num;
      //     }
      // }
      // if (elements.length) {
      //     _idx += 1;
      // }
      // container principal de l'editeur
      var div = document.createElement("div");
      div.id = this.name.containerID + this.id;
      div.className = this.name.container;

      // Themes
      var _toolsThemes = this.options.tools.themes;
      if (_toolsThemes && this.options.themes) {
        // title
        if (this.options.tools.title) {
          var titleThemes = document.createElement("div");
          titleThemes.id = this.name.titleThemesID + this.id;
          titleThemes.className = this.name.titleThemes;
          titleThemes.innerHTML = "Liste des 'thèmes'";
          div.appendChild(titleThemes);
        }

        // lien vers les styles
        var themes = new _Themes__WEBPACK_IMPORTED_MODULE_6__["default"]({
          id: this.id,
          target: div,
          tools: _typeof(_toolsThemes) === "object" ? _toolsThemes : {},
          obj: this.options.themes
        });
        themes.add();
      }

      // TODO : Recheche / filtre de couches
      if (this.options.tools.search) {
        var search = new _Search__WEBPACK_IMPORTED_MODULE_12__["default"]({
          id: this.id,
          target: div,
          tools: {},
          obj: this.mapbox.layers // liste des objets layers
        });
        search.add();
      }
      for (var source in this.mapbox.sources) {
        if (this.mapbox.sources.hasOwnProperty(source)) {
          if (this.options.tools.layers) {
            // multisources ? Si oui, on renseigne un titre...
            var multisources = Object.keys(this.mapbox.sources).length > 1 ? 1 : 0;
            if (multisources) {
              var hr = document.createElement("hr");
              hr.className = this.name.sep;
              div.appendChild(hr);
            }
            // title
            if (this.options.tools.title) {
              var titleLayers = document.createElement("div");
              titleLayers.id = this.name.titleLayersID + this.id;
              titleLayers.className = this.name.titleLayers;
              titleLayers.innerHTML = multisources ? "Liste des 'couches' (" + source + ")" : "Liste des 'couches'";
              div.appendChild(titleLayers);
            }
          }

          // gestion de l'ordre avant tri avec la metadata 'order'
          var _layers = this.mapbox.layers.slice(); // clone

          // une fois les layers triés, la metadata:geoportail:order permet
          // de savoir l'emplacement du layers dans le fichier de style.
          _layers.forEach(function (layer, order) {
            // on écarte les layers sans source: ex. "background"
            // if (!layer.source) {
            //     return;
            // }
            // ajout de la metadata d'ordre
            var _metadata = layer["metadata"];
            if (_metadata) {
              _metadata["geoportail:order"] = order;
            } else {
              layer["metadata"] = {
                "geoportail:order": order
              };
            }
          });
          // tri des layers
          if (this.options.tools.sort) {
            var sortBy = this.options.tools.sortBy;
            var sortOrder = this.options.tools.sortOrder;
            var sortFct = function sortFct(a, b) {
              // si on utilise les groupements utilisateurs, ils doivent
              // tous être renseignés sinon..., ça va coincer !
              var result = 0;
              if (a["metadata"] && a["metadata"]["geoportail:group"] && b["metadata"] && b["metadata"]["geoportail:group"]) {
                var cmpA = null;
                var cmpB = null;
                cmpA = a["metadata"]["geoportail:group"];
                cmpB = b["metadata"]["geoportail:group"];
                result = cmpA.localeCompare(cmpB);
              } else {
                switch (sortBy) {
                  case "geom":
                    result = sortOrder === "asc" ? a.type.localeCompare(b.type) || a.id.localeCompare(b.id) : b.type.localeCompare(a.type) || b.id.localeCompare(a.id);
                    break;
                  case "class":
                    result = sortOrder === "asc" ? a["source-layer"].localeCompare(b["source-layer"]) || a.id.localeCompare(b.id) : b["source-layer"].localeCompare(a["source-layer"]) || b.id.localeCompare(a.id);
                    break;
                  case "id":
                  default:
                    // tri sur l'id par defaut
                    result = sortOrder === "asc" ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
                    break;
                }
              }
              return result;
            };
            _layers.sort(sortFct);
          }
          logger.trace("Layers : ", _layers);

          // gestion des groupes avec la metadata de groupe
          var groupBy = this.options.tools.sortBy; // le même type de tri que les couches !
          var groupAuto = this.options.tools.groupAuto;
          var _groups = {}; // liste et comptage des layers dans chaque groupes
          _layers.forEach(function (layer) {
            // on écarte les layers sans source: ex. "background"
            // if (!layer.source) {
            //     return;
            // }
            // balise metadata
            var _metadata = layer["metadata"];
            // s'il existe déjà une meta de groupe, on l'utilise...
            // sinon, on la met en place.
            if (_metadata && _metadata["geoportail:group"]) {
              var _groupName = _metadata["geoportail:group"];
              _groups[_groupName] = _groups[_groupName] ? _groups[_groupName] + 1 : 1;
            } else {
              var _field = null;
              switch (groupBy) {
                case "class":
                  _field = layer["source-layer"];
                  break;
                case "geom":
                  _field = layer.type;
                  break;
                case "id":
                default:
                  _field = layer.id;
                  break;
              }
              var _newGroupName = _field;
              if (groupAuto) {
                // separateur
                var _regex = /_|-|:|=/; // TODO à definir via une option !

                // index
                var _idx = _field.search(_regex);
                // y'a t il un separateur ?
                _newGroupName = _idx !== -1 ? _field.substring(0, _idx).trim() : _field;
              }
              // on compte le nombre d'entrée dans un groupe
              _groups[_newGroupName] = _groups[_newGroupName] ? _groups[_newGroupName] + 1 : 1;

              // ajout de la metadata de groupe
              if (_metadata) {
                _metadata["geoportail:group"] = _newGroupName;
              } else {
                layer["metadata"] = {
                  "geoportail:group": _newGroupName
                };
              }
            }
          });
          logger.trace("Groups : ", _groups);

          // container principal des couches
          var divLayers = document.createElement("div");
          divLayers.className = this.name.containerLayers;
          div.appendChild(divLayers);
          var details;
          if (this.options.tools.collapse !== undefined) {
            details = document.createElement("details");
            details.className = "";
            details.open = !this.options.tools.collapse;
            divLayers.appendChild(details);
            var summary = document.createElement("summary");
            summary.className = "";
            summary.innerHTML = "";
            details.appendChild(summary);
          }

          // container courant (cf. groupe) pour l'ajout des elements
          var target = this.options.tools.collapse !== undefined ? details : divLayers;

          // Ex. Layers, Styles, Groups et Filtres
          //  "id": "ocs - vegetation",
          //  "type": "fill",
          //  "source": "pyramide_proto",
          //  "source-layer": "ocs_vegetation_surf",
          //  "metadata" : {
          //      "geoportail:group": "ocs"
          //  },
          //  "layout": {
          //    "visibility": "visible"
          //  },
          //  "filter": ["in","symbo",
          //      "SURFACE_D_EAU",
          //      "BASSIN",
          //      "ZONE_MARINE"
          //  ],
          //  "paint": {
          //    "fill-color": "#2BB3E1"
          //  }
          var index = -1;
          for (var ii = 0; ii < _layers.length; ii++) {
            var data = _layers[ii];
            index++;

            // traitement dans l'ordre des sources
            if (data.source === source) {
              // Groups
              // INFO la gestion des groupes est basée sur la balise metadata::geoportail:group
              // ainsi que sur l'ordre des couches.
              // il n'y a pas de regroupement sans tri des couches !
              if (this.options.tools.group && this.options.tools.sort) {
                var mtd = data.metadata;
                // creation du container de groupe
                // si le tag metadata existe
                if (mtd) {
                  var grp = data.metadata["geoportail:group"];
                  if (grp) {
                    // le groupe doit contenir plus d'un element
                    if (_groups[grp] > 1) {
                      // le groupe est déjà créé, on en veut plus par la suite...
                      _groups[grp] = -1;
                      // creation du groupe
                      var oGroup = new _Group__WEBPACK_IMPORTED_MODULE_10__["default"]({
                        id: this.id,
                        target: this.options.tools.collapse !== undefined ? details : divLayers,
                        title: grp,
                        collapse: true
                      });
                      oGroup.add();
                      // le nouveau container pour les elements suivants
                      target = oGroup.getContainer();
                    } else if (_groups[grp] === 1) {
                      // l'element est seul, donc pas d'ajout dans le
                      // groupe en cours
                      target = this.options.tools.collapse !== undefined ? details : divLayers;
                    } else {
                      // on ajoute l'element dans le groupe courant...
                    }
                  } else {
                    target = this.options.tools.collapse !== undefined ? details : divLayers;
                  }
                } else {
                  target = this.options.tools.collapse !== undefined ? details : divLayers;
                }
              }
              // Layers
              if (this.options.tools.layers) {
                var oLayer = new _Layer__WEBPACK_IMPORTED_MODULE_9__["default"]({
                  id: this.id,
                  target: target,
                  position: index + "_" + this.id,
                  // unique !
                  tools: {
                    visibility: this.options.tools.visibility,
                    icon: this.options.tools.icon,
                    type: this.options.tools.type,
                    pin: this.options.tools.pin
                  },
                  obj: {
                    id: data.id,
                    type: data.type,
                    source: data.source,
                    "source-layer": data["source-layer"]
                  }
                });
                oLayer.add();
                // update visibility layer
                if (data.layout && data.layout.visibility && data.layout.visibility === "none") {
                  oLayer.visibility(false);
                }
                // sauvegarde des layers
                this.layers.push(oLayer);
              }
              // Legende
              if (this.options.tools.legend) {
                // gestion de l'edition de la legende :
                // l'option "editable" est prioritaire sur le tag "editable" du fichier de style !
                var isEditable = this.options.tools.editable;
                if (typeof isEditable === "undefined") {
                  isEditable = data.editable;
                }
                var oLegend = new _Legend__WEBPACK_IMPORTED_MODULE_8__["default"]({
                  id: this.id,
                  target: target,
                  sprites: this.sprites,
                  obj: {
                    id: data.id,
                    source: data.source,
                    title: data.id,
                    editable: typeof isEditable !== "undefined" ? isEditable : false,
                    paint: data.paint,
                    layout: data.layout
                  }
                });
                oLegend.add();
                oLegend.display(false);
                if (oLayer) {
                  oLayer.addLegend(oLegend);
                  oLayer.slotLegend(); // integration de la legende dans le container du layers !
                }
              }
              // Style
              if (this.options.tools.style) {
                var oStyle = new _Style__WEBPACK_IMPORTED_MODULE_5__["default"]({
                  id: this.id,
                  target: target,
                  position: index + "_" + this.id,
                  // unique !,
                  obj: {
                    id: data.id,
                    source: data.source,
                    layout: data.layout,
                    paint: data.paint
                  }
                });
                oStyle.add();
                oStyle.display(false);
                if (oLayer) {
                  oLayer.addStyle(oStyle);
                }
                // update visibility layer
                if (data.layout && data.layout.visibility && data.layout.visibility === "none") {
                  oLayer.visibility(false);
                }
              }
              // Filter
              if (this.options.tools.filter) {
                var oFilter = new _Filter__WEBPACK_IMPORTED_MODULE_7__["default"]({
                  id: this.id,
                  target: target,
                  position: index + "_" + this.id,
                  // unique !,
                  obj: {
                    id: data.id,
                    source: data.source,
                    filter: data.Filter
                  }
                });
                oFilter.add();
                oFilter.display(false);
                if (oLayer) {
                  oLayer.addFilter(oFilter);
                }
              }
            } else {
              // on ecarte un layer car il n'est pas reconnu dans la source
              // on decremente la position du layer
              if (index >= 0) {
                index--;
              }
            }
          }
        }
      }

      // sauvegarde
      this.container = div;

      // container principal
      if (!this.options.target) {
        if (!document.getElementById(this.name.target)) {
          var _target = document.createElement("div");
          _target.id = this.name.target;
          var node = document.getElementsByTagName("body")[0] || document.getElementsByTagName("head")[0] || document.documentElement;
          node.appendChild(_target);
        }
        this.options.target = document.getElementById(this.name.target);
      }
      if (this.container) {
        this.options.target.appendChild(this.container);
      }
      // dispatch event
      eventbusjs__WEBPACK_IMPORTED_MODULE_1___default().dispatch(_Event__WEBPACK_IMPORTED_MODULE_11__["default"].onloaded, this);
    }

    /**
     * Getting Sprites informations
     * (called by _initialize)
     *
     * @param {String} sprites - url des sprites
     * @returns {Promise} - promise
     * @private
     */
  }, {
    key: "_getSprites",
    value: function _getSprites(sprites) {
      var self = this;

      // on ne doit pas mettre de promise en échec...
      // car on souhaite continuer le traitement même si on n'a pas de sprites !
      // si le protocole est mapbox://
      if (sprites && sprites.startsWith("mapbox://")) {
        return new Promise(function (resolve, reject) {
          logger.error("Protocole mapbox:// non géré !");
          resolve(self);
        });
      }
      // si pas de sprites
      if (!sprites) {
        return new Promise(function (resolve, reject) {
          logger.error("Auncun sprites disponibles !");
          resolve(self);
        });
      }
      var fetchSpritesImage = function fetchSpritesImage() {
        var spritesImage = sprites + ".png";
        return fetch(spritesImage, {
          credentials: "same-origin"
        }).then(function (response) {
          if (response.ok) {
            return response.blob().then(function (blob) {
              self.sprites.url = spritesImage;
              // decode de l'image
              var theImage = new Image();
              theImage.src = spritesImage;
              return theImage.decode().then(function () {
                self.sprites.size = {};
                self.sprites.size.h = theImage.height;
                self.sprites.size.w = theImage.width;
              });
            })["catch"](function (error) {
              logger.warn("fetch image sprites exception :", error);
            });
          } else {
            var err = new Error("HTTP status code: " + response.status);
            throw err;
          }
        })["catch"](function (error) {
          return new Promise(function (resolve, reject) {
            logger.error("fetch image sprites exception :", error);
            reject(error);
          });
        });
      };
      var fetchSpritesJson = function fetchSpritesJson() {
        var spritesJson = sprites + ".json";
        return fetch(spritesJson, {
          credentials: "same-origin"
        }).then(function (response) {
          if (response.ok) {
            return response.json().then(function (json) {
              self.sprites.json = json;
            })["catch"](function (error) {
              logger.warn("fetch json sprites exception :", error);
            });
          } else {
            var err = new Error("HTTP status code: " + response.status);
            throw err;
          }
        })["catch"](function (error) {
          return new Promise(function (resolve, reject) {
            logger.error("fetch json sprites exception :", error);
            reject(error);
          });
        });
      };

      // promise
      return Promise.all([fetchSpritesImage(), fetchSpritesJson()]);
    }

    // ################################################################### //
    // ########################## INTERFACE ############################## //
    // ################################################################### //
    /**
     * Create Editor
     *
     * @returns {Promise} - promise
     */
  }, {
    key: "createElement",
    value: function createElement() {
      var self = this;
      // objet json
      if (_typeof(this.options.style) === "object") {
        this.mapbox = this.options.style;
        // les sprites sont utiles que si on veut une legende !
        if (this.options.tools.legend) {
          return this._getSprites(this.mapbox.sprite).then(function () {
            // init du DOM
            self._initContainer();
            return self;
          })["catch"](function (error) {
            logger.warn("fetch sprites exception :", error);
          });
        } else {
          return new Promise(function (resolve, reject) {
            self._initContainer();
            resolve(self);
          });
        }
      }

      // url
      if (typeof this.options.style === "string") {
        return fetch(this.options.style, {
          credentials: "same-origin"
        }).then(function (response) {
          // sauvegarde du json
          return response.json().then(function (style) {
            self.mapbox = style;
          }).then(function () {
            // les sprites sont utiles que si on veut une legende !
            if (self.options.tools.legend) {
              return self._getSprites(self.mapbox.sprite).then(function () {
                // init du DOM
                self._initContainer();
                return self;
              })["catch"](function (error) {
                logger.warn("fetch sprites exception :", error);
              });
            } else {
              return new Promise(function (resolve, reject) {
                self._initContainer();
                resolve(self);
              });
            }
          })["catch"](function (error) {
            logger.error("json exception :", error);
          });
        })["catch"](function (error) {
          logger.error("fetch exception :", error);
        });
      }
    }

    /**
     * Set display container (DOM)
     *
     * @param {Boolean} display - show/hidden container
     */
  }, {
    key: "display",
    value: function display(_display) {
      this.container.style.display = _display ? "block" : "none";
    }
  }, {
    key: "setContext",
    value: function setContext(key, value) {
      this.context[key] = value;
    }
  }, {
    key: "getContext",
    value: function getContext(key) {
      return this.context[key];
    }

    // ################################################################### //
    // ##################### public methods ############################## //
    // ################################################################### //
    /**
     * Get id editor
     * @returns {Number} id
     */
  }, {
    key: "getID",
    value: function getID() {
      return this.id;
    }

    /**
     * Get container (DOM)
     * @returns {DOMElement} DOM element
     */
  }, {
    key: "getContainer",
    value: function getContainer() {
      return this.container;
    }

    /**
     * Get Style (json)
     * @returns {Object} Style MapBox
     */
  }, {
    key: "getStyle",
    value: function getStyle() {
      return this.mapbox;
    }

    /**
     * Get layer style (json)
     * @param {Number} i - index
     * @returns {Object} Style MapBox of a layers
     */
  }, {
    key: "getStyleLayer",
    value: function getStyleLayer(i) {
      var layer = null;
      var o = this.getLayer(i);
      var id = o.options.obj.id;
      for (var k = 0; k < this.mapbox.layers.length; k++) {
        var l = this.mapbox.layers[k];
        if (l.id === id) {
          layer = l;
          break;
        }
      }
      return layer;
    }

    /**
     * Get layer object from json style
     * @param {Number} i - index into style json
     * @returns {Object} Style MapBox of a layers
     */
  }, {
    key: "getLayerFromStyle",
    value: function getLayerFromStyle(i) {
      var layer = null;
      var l = this.mapbox.layers[i];
      for (var k = 0; k < this.getLayers().length; k++) {
        var o = this.getLayer(k);
        if (l.id === o.options.obj.id) {
          layer = o;
          break;
        }
      }
      return layer;
    }

    /**
     * Get a list of layer object sorted or not (see options.tools.sort)
     * @returns {Array} - List of layer object
     * @see {ol.style.editor.Layer}
     */
  }, {
    key: "getLayers",
    value: function getLayers() {
      return this.layers;
    }

    /**
     * Get the layer object from a list sorted or not (see options.tools.sort)
     * @param {Number} i - index
     * @returns {Object} - layer object
     * @see {ol.style.editor.Layer}
     */
  }, {
    key: "getLayer",
    value: function getLayer(i) {
      return this.layers[i];
    }
  }]);
}();
;

// on récupère les méthodes de la classe DOM
_Utils_Helper__WEBPACK_IMPORTED_MODULE_2__["default"].assign(Editor.prototype, _EditorDOM__WEBPACK_IMPORTED_MODULE_13__["default"]);

// ################################################################### //
// ####################### handlers events to dom #################### //
// ################################################################### //

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Editor);

// Expose Editor as ol.editor.View (for a build bundle)
if (window.ol && window.ol.style) {
  window.ol.style.Editor = Editor;
}
})();

Editor = __webpack_exports__["default"];
/******/ })()
;
//# sourceMappingURL=Editor.js.map