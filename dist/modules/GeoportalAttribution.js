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

/***/ "./src/packages/Utils/LayerUtils.js":
/*!******************************************!*\
  !*** ./src/packages/Utils/LayerUtils.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
* @module LayerUtils
* @alias module:~utils/LayerUtils
* @description
* ...
*
* @example
* import LayerUtils from "gpf-ext-ol/utils/LayerUtils"
* ou 
* import {LayerUtils} from "gpf-ext-ol

* LayerUtils.getZoomLevelFromScaleDenominator();
* LayerUtils.getAttributions();
* LayerUtils.intersects();
*/
var LayerUtils = {
  /**
   * Obtenir le ZoomLevel à partir du ScaleDenominator
   * @function getZoomLevelFromScaleDenominator
   * @param {Number} scaleDenominator - the scale denominator
   * @param {String} crs - the crs
   *
   * @returns {Integer} zoom level
   */
  getZoomLevelFromScaleDenominator: function getZoomLevelFromScaleDenominator(scaleDenominator, crs) {
    // ------------------------------------------------- //
    // Code issu de l'API Geoportal/Catalogue/Config.js  //
    // ------------------------------------------------- //
    //     var configuration = Gp.Config;
    //     var general = configuration.generalOptions;
    //     var layers  = configuration.layersContext;
    //
    //     for (var tms in general.tileMatrixSets) {
    //         var tileMatrixSet = general.tileMatrixSets[tms];
    //         // IGN's WMTS bug : epsg:nnnn instead of EPSG:nnnn
    //         var crs = tileMatrixSet.supportedCRS = tileMatrixSet.supportedCRS.replace(/epsg/,"EPSG");
    //
    //         if (!Geoportal.Catalogue.CRSRESOLUTIONS.hasOwnProperty(crs)) {
    //             var p= new OpenLayers.Projection(crs);
    //             Geoportal.Catalogue.CRSRESOLUTIONS[crs]= [];
    //             var matrixIds= tileMatrixSet.matrixIds;
    //             for (var i= 0, li= matrixIds.length; i<li; ++i) {
    //                 var mid= matrixIds[i];
    //                 Geoportal.Catalogue.CRSRESOLUTIONS[crs].push(
    //                     0.00028*mid.scaleDenominator
    //                     /(OpenLayers.METERS_PER_INCH*OpenLayers.INCHES_PER_UNIT[p.getUnits()]));
    //                     mid.supportedCRS= mid.supportedCRS.replace(/epsg/,"EPSG");
    //                 }
    //                 Geoportal.Catalogue.CRSRESOLUTIONS[crs].sort(function (a,b){ return b-a; });
    //             }
    //         }
    //         var llR= Geoportal.Catalogue.CRSRESOLUTIONS['CRS:84'];
    //         if (!llR) {
    //             llR= Geoportal.Catalogue.CRSRESOLUTIONS['CRS:84']= general.resolutions.slice();
    //         }
    //         var wmR= Geoportal.Catalogue.CRSRESOLUTIONS['EPSG:3857'];
    //         if (!wmR) {//FIXME : should never happened !!
    //             // reproject resolutions from CRS84 to WebMercator (transform resolutions from degree/px to meter/px)
    //             wmR= Geoportal.Catalogue.CRSRESOLUTIONS['EPSG:3857']= new Array(llR.length);
    //             for (var i= 0, len= llR.length; i<len; i++) {
    //                 var pt= new OpenLayers.LonLat(llR[i], 0);
    //                 pt.transform(OpenLayers.Projection.CRS84, OpenLayers.Projection.WebMercator);
    //                 wmR[i]= pt.lon;
    //             }
    //         }
    //         Geoportal.Catalogue.RESOLUTIONS= wmR;
    //
    //         var getResolutionsFromCRS= function(crs) {
    //             if (OpenLayers.Projection.WebMercator.isAliasOf(crs)) {
    //                 return wmR;
    //             }
    //             if (OpenLayers.Projection.CRS84.isAliasOf(crs)) {
    //                 return llR;
    //             }
    //             return Geoportal.Catalogue.CRSRESOLUTIONS[crs]?Geoportal.Catalogue.CRSRESOLUTIONS[crs]:null ;
    //         };
    //
    //         var retrieveZoomFromResolution= function(resolutions, resolution) {
    //             for (var i= 0, li= resolutions.length; i<li; i++) {
    //                 if (resolutions[i]-resolution <= resolutions[li-1]) {
    //                     return i;
    //                 }
    //             }
    //             return -1;
    //         };
    //
    //         var getZoomLevelFromScaleDenominator= function(scaleDenominator,crs) {
    //             var resolution= scaleDenominator * 0.00028;
    //             var R= getResolutionsFromCRS(crs);
    //             if (R) {
    //                 return retrieveZoomFromResolution(R,resolution);
    //             }
    //             resolution= resolution/(OpenLayers.METERS_PER_INCH * OpenLayers.INCHES_PER_UNIT["degrees"]);
    //             return retrieveZoomFromResolution(llR,resolution);
    //         };
    //
    //         var getZoomLevelFromResolution= function(resolution,crs){
    //             var R= getResolutionsFromCRS(crs);
    //             if (R) {
    //                 return retrieveZoomFromResolution(R,resolution);
    //             }
    //             var pt0= new OpenLayers.LonLat(0, 0);
    //             var pt1= new OpenLayers.LonLat(1, 0);
    //             pt0.transform(new OpenLayers.Projection(crs),OpenLayers.Projection.CRS84);
    //             pt1.transform(new OpenLayers.Projection(crs),OpenLayers.Projection.CRS84);
    //             resolution= resolution*(Math.abs(pt1.lon-pt0.lon));
    //             return retrieveZoomFromResolution(llR,resolution);
    //         };

    // par defaut, on utilise la projection WebMercator (EPSG:3857 = PM)
    // soit la liste des resolutions natives
    var resolutionsNatives = {};
    switch (crs) {
      case "EPSG:2154":
        resolutionsNatives = {
          0: 104579.224549894,
          1: 52277.5323537905,
          2: 26135.4870785954,
          3: 13066.8913818,
          4: 6533.2286041135,
          5: 3266.5595244627,
          6: 1633.2660045974,
          7: 816.629554986,
          8: 408.3139146768,
          9: 204.1567415109,
          10: 102.0783167832,
          11: 51.0391448966,
          12: 25.5195690743,
          13: 12.7597836936,
          14: 6.379891636,
          15: 3.1899457653,
          16: 1.5949728695,
          17: 0.7974864315,
          18: 0.3987432149,
          19: 0.1993716073,
          20: 0.0996858037,
          21: 0.0498429018
        };
        break;
      default:
        resolutionsNatives = {
          0: 156543.033928041,
          1: 78271.51696402048,
          2: 39135.758482010235,
          3: 19567.87924100512,
          4: 9783.93962050256,
          5: 4891.96981025128,
          6: 2445.98490512564,
          7: 1222.99245256282,
          8: 611.49622628141,
          9: 305.7481131407048,
          10: 152.8740565703525,
          11: 76.43702828517624,
          12: 38.21851414258813,
          13: 19.10925707129406,
          14: 9.554628535647032,
          15: 4.777314267823516,
          16: 2.388657133911758,
          17: 1.194328566955879,
          18: 0.5971642834779395,
          19: 0.2985821417389697,
          20: 0.1492910708694849,
          21: 0.0746455354347424
        };
        break;
    }

    // gestion des autres SRS
    // TODO
    // if (crs) {
    // }

    var resolution = scaleDenominator * 0.00028;
    for (var index in resolutionsNatives) {
      if (resolutionsNatives.hasOwnProperty(index)) {
        if (resolutionsNatives[index] <= resolution) {
          index = parseInt(index, 10);
          return index;
        }
      }
    }
    return 0; // -1 ?
  },
  /**
   * Get attributions list for a layer, based on current zoom and extent
   *
   * @function getAttributions
   * @param {Object} params - function params
   * @param {Array.<Float>} params.extent - map current geographical extent (EPSG:4326) : [top, left, bottom, right] = [maxy, minx, miny, maxx]
   * @param {Number} params.zoom - map current zoom
   * @param {String} params.crs - map current projection code (ex "EPSG:2154")
   * @param {Boolean} params.visibility - layer visibility
   * @param {Gp.Services.Config.Originator} params.originators - resource originators (from Gp.Config.layers[].originators)
   * @returns {Object} attributions - associative array, mapping originators url (keys) with their properties : html attributions elements
   */
  getAttributions: function getAttributions(params) {
    var zoom = params.zoom;
    var attributions = [];
    if (params.originators != null && params.visibility) {
      // drawLogo = boolean, true if attribution should be displayed (zoom, extent), false otherwise
      var drawLogo;
      for (var j = 0, jl = params.originators.length; j < jl; j++) {
        drawLogo = true;
        var originator = params.originators[j];
        var constraints = params.originators[j].constraints || [];
        for (var k = 0, kl = constraints.length; k < kl; k++) {
          var constraint = constraints[k];
          drawLogo = true;
          var minZoomLevel = this.getZoomLevelFromScaleDenominator(constraint.maxScaleDenominator, params.crs);
          var maxZoomLevel = this.getZoomLevelFromScaleDenominator(constraint.minScaleDenominator, params.crs) || 21;

          // min zoom constraints
          if (minZoomLevel && minZoomLevel > zoom) {
            drawLogo = false;
          }

          // max zoom constraints
          if (drawLogo && maxZoomLevel && maxZoomLevel < zoom) {
            drawLogo = false;
          }

          // bbox constraints
          var bbox = constraint.bbox;
          if (drawLogo && bbox) {
            drawLogo = false;
            var viewExtent = params.extent;
            if (viewExtent) {
              var bounds = [bbox.top, bbox.left, bbox.bottom, bbox.right];
              if (this.intersects(viewExtent, bounds)) {
                // at least one constraint matches the map ones
                drawLogo = true;
                break;
              }
            }
          }
        }
        if (drawLogo) {
          // on a un originator qui correspond au zoom et à l'étendue.

          var logo = originator.logo;
          var url = originator.url;
          var name = originator.name ? originator.name : "";
          var text = originator.attribution;
          var container = document.createElement("div");
          container.className = "gp-control-attribution";

          // on crée un lien dans tous les cas (même s'il ne pointe pas vers une référence), pour avoir accès à la class CSS (pour surcharge)
          var link = null;
          link = document.createElement("a");
          link.className = "gp-control-attribution-link";
          link.target = "_blank";
          container.appendChild(link);
          if (url) {
            link.href = url;
          }
          var bImage = !!logo;
          var image = null;
          // si on a un logo, on l'affiche à l'interieur du lien
          if (bImage) {
            image = document.createElement("img");
            if (link) {
              image.className = "gp-control-attribution-image";
              link.appendChild(image);
            } else {
              image.className = "";
              container.appendChild(image);
            }
            image.src = logo;
            image.title = text || name;
            image.style.height = "30px";
            image.style.width = "30px";
          } else {
            // sinon, on affiche le nom de l'originator, ou sa description ou l'url.
            if (name) {
              link.textContent = name;
            } else if (text) {
              link.textContent = text;
            } else if (url) {
              link.textContent = url;
            } else {
              link.textContent = "";
            }
          }
          attributions.push(container.innerHTML + " ");
        }
      }
    }
    return attributions;
  },
  /**
   * Determines if one extent (extent1) intersects another (extent2)
   *
   * @function intersects
   * @param {Array.<Float>} extent1 - First extent : [top, left, bottom, right] = [maxy, minx, miny, maxx]
   * @param {Array.<Float>} extent2 - Second extent : [top, left, bottom, right] = [maxy, minx, miny, maxx]
   * @return {Boolean} intersects - True if the two extents intersect, false otherwise.
   */
  intersects: function intersects(extent1, extent2) {
    var intersectsX = extent1[1] <= extent2[3] && extent2[1] <= extent1[3];
    var intersectsY = extent1[2] <= extent2[0] && extent2[2] <= extent1[0];
    return intersectsX && intersectsY;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LayerUtils);

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

/***/ "./src/packages/CSS/Controls/Attribution/GPFattribution.css":
/*!******************************************************************!*\
  !*** ./src/packages/CSS/Controls/Attribution/GPFattribution.css ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "ol/control/Attribution":
/*!*****************************************!*\
  !*** external "ol.control.Attribution" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = ol.control.Attribution;

/***/ }),

/***/ "ol/proj":
/*!**************************!*\
  !*** external "ol.proj" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = ol.proj;

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
/*!*******************************************************************!*\
  !*** ./src/packages/Controls/Attribution/GeoportalAttribution.js ***!
  \*******************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CSS_Controls_Attribution_GPFattribution_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../CSS/Controls/Attribution/GPFattribution.css */ "./src/packages/CSS/Controls/Attribution/GPFattribution.css");
/* harmony import */ var ol_control_Attribution__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/control/Attribution */ "ol/control/Attribution");
/* harmony import */ var ol_control_Attribution__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ol_control_Attribution__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ol_proj__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/proj */ "ol/proj");
/* harmony import */ var ol_proj__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ol_proj__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Utils_LayerUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Utils/LayerUtils */ "./src/packages/Utils/LayerUtils.js");
/* harmony import */ var _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Utils/LoggerByDefault */ "./src/packages/Utils/LoggerByDefault.js");
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

// import "../../CSS/Controls/Attribution/GPFattributionStyle.css";
// import OpenLayers


// import local


var logger = _Utils_LoggerByDefault__WEBPACK_IMPORTED_MODULE_4__["default"].getLogger("geoportalattribution");

/**
 * @classdesc
 * OpenLayers Control to manage Originators for layer resources
 *
 * @constructor
 * @extends {ol.control.Attribution}
 * @alias ol.control.GeoportalAttribution
 * @type {ol.control.GeoportalAttribution}
 * @param {Object} options - ol.control.Attribution options (see {@link http://openlayers.org/en/latest/apidoc/ol.control.Attribution.html ol.Control.Attribution})
 * @fires attributions:update
 * @example
 * var attribution = new ol.control.GeoportalAttribution({
 *   collapsed : false
 * });
 * map.addControl(attribution);
 * // listeners for attributions update :
 * attribution.on("attributions:update", function (e) {});
 */
var GeoportalAttribution = /*#__PURE__*/function (_Attribution) {
  /**
   * See {@link ol.control.GeoportalAttribution}
   * @module GeoportalAttribution
   * @alias module:~controls/GeoportalAttribution
   * @param {*} options - options
   * @example
   * import GeoportalAttribution from "gpf-ext-ol/controls/GeoportalAttribution"
   * ou 
   * import { GeoportalAttribution } from "gpf-ext-ol"
   */
  function GeoportalAttribution(options) {
    var _this;
    _classCallCheck(this, GeoportalAttribution);
    options = options || {};

    // Attributions are not collapsible for ol/source/OSM except if ...
    options.collapsible = true;
    options.collapsed = true;
    _this = _callSuper(this, GeoportalAttribution, [options]);
    if (!(_this instanceof GeoportalAttribution)) {
      throw new TypeError("ERROR CLASS_CONSTRUCTOR");
    }
    return _possibleConstructorReturn(_this, _this);
  }

  /**
   * Overload setMap function, that enables to catch map events, such as movend events.
   *
   * @param {ol.Map} map - Map.
   */
  _inherits(GeoportalAttribution, _Attribution);
  return _createClass(GeoportalAttribution, [{
    key: "setMap",
    value: function setMap(map) {
      var _this2 = this;
      if (map != null) {
        // Remove default ol.control.Attribution
        var ctrls = map.getControls();
        ctrls.forEach(function (ctrl) {
          if (ctrl instanceof GeoportalAttribution) {
            return;
          }
          if (ctrl) {
            var classList = ctrl.element.classList;
            for (var i = 0; i < classList.length; i++) {
              if (classList[i] === "ol-attribution") {
                ctrls.remove(ctrl);
                break;
              }
            }
          }
        });

        // on récupère les attributions des couches déjà ajoutées à la carte.
        this._updateAttributions(map);

        // At every map movement, layers attributions have to be updated,
        // according to map and originators zoom and extent.
        map.on("moveend", function () {
          _this2._updateAttributions(map);
        });
        map.getLayers().on("add", function () {
          _this2._updateAttributions(map);
        });
        map.getLayers().on("remove", function () {
          _this2._updateAttributions(map);
        });
      }
      _get(_getPrototypeOf(GeoportalAttribution.prototype), "setMap", this).call(this, map);
    }

    /**
     * Update map layers attributions
     *
     * @param {ol.Map} map - Map.
     * @private
     */
  }, {
    key: "_updateAttributions",
    value: function _updateAttributions(map) {
      var _this3 = this;
      // get map parameters
      var mapAttributions = {};
      var view = map.getView();
      // extent, then convert to geographical coordinates
      var extent = view.calculateExtent(map.getSize());
      var mapProjection = view.getProjection().getCode();
      var geoExtent = (0,ol_proj__WEBPACK_IMPORTED_MODULE_2__.transformExtent)(extent, mapProjection, "EPSG:4326");
      // transform extent from [minx, miny, maxx, maxy] to [maxy, minx, miny, maxx]
      var standardExtent = [geoExtent[3], geoExtent[0], geoExtent[1], geoExtent[2]];
      // zoom
      var zoom = view.getZoom();
      // layers
      var layers = map.getLayers().getArray();

      // info : This option suppresses warnings about functions inside of loops.
      /* jshint loopfunc: true */

      // loop on layers to get their originators, if there is at least one originator, and if layer is visible.
      for (var i = 0; i < layers.length; i++) {
        // distinguish case of ol.layer.Group (which is made up of layers with their own source)
        // and other ol.layer (with their own source)
        if (layers[i].getSource) {
          // single ol.layer
          this._updateLayerAttributions(layers[i], mapAttributions, standardExtent, mapProjection, zoom);
        } else if (layers[i].getLayers) {
          // ol.layer.Group
          var lyrs = layers[i].getLayers();
          lyrs.forEach(function (lyr) {
            if (lyr.getSource) {
              _this3._updateLayerAttributions(lyr, mapAttributions, standardExtent, mapProjection, zoom);
            } else {
              logger.log("cannot find layer source in layergroup ", layers[i]);
            }
          });
        }
      }
    }

    /**
     * Update a layer attributions
     *
     * @param {ol.layer} layer - layer
     * @param {Object} mapAttributions - object recensing attributions already added, to prevent displaying twice the same producer
     * @param {Array} mapExtent - map current extent
     * @param {String} mapCrs - map current crs
     * @param {Number} mapZoom - map current zoom
     * @private
     */
  }, {
    key: "_updateLayerAttributions",
    value: function _updateLayerAttributions(layer, mapAttributions, mapExtent, mapCrs, mapZoom) {
      if (!layer) {
        logger.trace("layer is null !?");
        return;
      }
      var src = layer.getSource();
      if (!src) {
        logger.trace("source is not yet loaded !");
        return;
      }
      if (!mapAttributions) {
        mapAttributions = {};
      }
      var attributions = [];
      var visibility = layer.getVisible();
      var originators = src._originators;

      // info : clean previous attributions ONLY for Geoportal Layers (when src._originators is defined)
      if (typeof originators !== "undefined") {
        src.setAttributions(); // clean
      }
      if (originators && visibility) {
        // get layer's attributions array
        var layerAttributions = _Utils_LayerUtils__WEBPACK_IMPORTED_MODULE_3__["default"].getAttributions({
          extent: mapExtent,
          crs: mapCrs,
          zoom: mapZoom,
          visibility: visibility,
          originators: originators
        });
        for (var j = 0; j < layerAttributions.length; j++) {
          var attributionj = layerAttributions[j];
          // check that this attribution hasn't been added yet for another layer
          if (!mapAttributions.hasOwnProperty(attributionj)) {
            // add attribution html
            attributions.push(attributionj);

            // add attribution to mapAttributions, to manage all layers attributions
            mapAttributions[attributionj] = true;
          }
        }
        ;

        // update source attribution
        if (attributions.length !== 0) {
          src.setAttributions(attributions);
          /**
          * event triggered when the attributions are updated
          *
          * @event attributions:update
          * @type Object
          * @property {Array} attributions - list of attributions
          */
          this.dispatchEvent({
            type: "attributions:update",
            attributions: attributions
          });
        }
      }
    }
  }]);
}((ol_control_Attribution__WEBPACK_IMPORTED_MODULE_1___default()));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GeoportalAttribution);

// Expose GeoportalAttribution as ol.control.GeoportalAttribution (for a build bundle)
if (window.ol && window.ol.control) {
  window.ol.control.GeoportalAttribution = GeoportalAttribution;
}
})();

GeoportalAttribution = __webpack_exports__["default"];
/******/ })()
;
//# sourceMappingURL=GeoportalAttribution.js.map