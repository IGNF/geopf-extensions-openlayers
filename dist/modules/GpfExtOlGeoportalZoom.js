(()=>{var t={3065:function(t,e,o){var n,r;!function(i,l){"use strict";n=function(){var t=function(){},e="undefined",o=typeof window!==e&&typeof window.navigator!==e&&/Trident\/|MSIE /.test(window.navigator.userAgent),n=["trace","debug","info","warn","error"],r={},i=null;function l(t,e){var o=t[e];if("function"==typeof o.bind)return o.bind(t);try{return Function.prototype.bind.call(o,t)}catch(e){return function(){return Function.prototype.apply.apply(o,[t,arguments])}}}function c(){console.log&&(console.log.apply?console.log.apply(console,arguments):Function.prototype.apply.apply(console.log,[console,arguments])),console.trace&&console.trace()}function a(n){return"debug"===n&&(n="log"),typeof console!==e&&("trace"===n&&o?c:void 0!==console[n]?l(console,n):void 0!==console.log?l(console,"log"):t)}function s(){for(var o=this.getLevel(),r=0;r<n.length;r++){var i=n[r];this[i]=r<o?t:this.methodFactory(i,o,this.name)}if(this.log=this.debug,typeof console===e&&o<this.levels.SILENT)return"No console available for logging"}function u(t){return function(){typeof console!==e&&(s.call(this),this[t].apply(this,arguments))}}function f(t,e,o){return a(t)||u.apply(this,arguments)}function p(t,o){var l,c,a,u=this,p="loglevel";function d(t){var o=(n[t]||"silent").toUpperCase();if(typeof window!==e&&p){try{return void(window.localStorage[p]=o)}catch(t){}try{window.document.cookie=encodeURIComponent(p)+"="+o+";"}catch(t){}}}function v(){var t;if(typeof window!==e&&p){try{t=window.localStorage[p]}catch(t){}if(typeof t===e)try{var o=window.document.cookie,n=encodeURIComponent(p),r=o.indexOf(n+"=");-1!==r&&(t=/^([^;]+)/.exec(o.slice(r+n.length+1))[1])}catch(t){}return void 0===u.levels[t]&&(t=void 0),t}}function y(){if(typeof window!==e&&p){try{window.localStorage.removeItem(p)}catch(t){}try{window.document.cookie=encodeURIComponent(p)+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC"}catch(t){}}}function g(t){var e=t;if("string"==typeof e&&void 0!==u.levels[e.toUpperCase()]&&(e=u.levels[e.toUpperCase()]),"number"==typeof e&&e>=0&&e<=u.levels.SILENT)return e;throw new TypeError("log.setLevel() called with invalid level: "+t)}"string"==typeof t?p+=":"+t:"symbol"==typeof t&&(p=void 0),u.name=t,u.levels={TRACE:0,DEBUG:1,INFO:2,WARN:3,ERROR:4,SILENT:5},u.methodFactory=o||f,u.getLevel=function(){return null!=a?a:null!=c?c:l},u.setLevel=function(t,e){return a=g(t),!1!==e&&d(a),s.call(u)},u.setDefaultLevel=function(t){c=g(t),v()||u.setLevel(t,!1)},u.resetLevel=function(){a=null,y(),s.call(u)},u.enableAll=function(t){u.setLevel(u.levels.TRACE,t)},u.disableAll=function(t){u.setLevel(u.levels.SILENT,t)},u.rebuild=function(){if(i!==u&&(l=g(i.getLevel())),s.call(u),i===u)for(var t in r)r[t].rebuild()},l=g(i?i.getLevel():"WARN");var h=v();null!=h&&(a=g(h)),s.call(u)}(i=new p).getLogger=function(t){if("symbol"!=typeof t&&"string"!=typeof t||""===t)throw new TypeError("You must supply a name when creating a logger.");var e=r[t];return e||(e=r[t]=new p(t,i.methodFactory)),e};var d=typeof window!==e?window.log:void 0;return i.noConflict=function(){return typeof window!==e&&window.log===i&&(window.log=d),i},i.getLoggers=function(){return r},i.default=i,i},void 0===(r="function"==typeof n?n.call(e,o,e,t):n)||(t.exports=r)}()}},e={};function o(n){var r=e[n];if(void 0!==r)return r.exports;var i=e[n]={exports:{}};return t[n].call(i.exports,i,i.exports,o),i.exports}o.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return o.d(e,{a:e}),e},o.d=(t,e)=>{for(var n in e)o.o(e,n)&&!o.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},o.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var n={};(()=>{"use strict";o.d(n,{default:()=>h});var t=o(3065);const e={getLogger:function(e){if(void 0===o)var o={env:{VERBOSE:!1}};o.env.VERBOSE?t.enableAll():t.disableAll();var n=e||"default";return t.getLogger(n)},disableAll:function(){var e=t.getLoggers();for(var o in e){if(Object.hasOwnProperty.call(e,o))e[o].disableAll()}},enableAll:function(){var e=t.getLoggers();for(var o in e){if(Object.hasOwnProperty.call(e,o))e[o].enableAll()}}};var r;const i={generate:(r=Math.floor(Date.now()),function(){return r++}),name:function(t){var e=null,o=t.lastIndexOf("-");return e=-1===o?t:t.substring(0,o),e},index:function(t){var e=null,o=this.name(t),n=o.lastIndexOf("_");return-1!==n&&(e=o.substring(n+1)),e},uuid:function(t){var e=null,o=t.lastIndexOf("-");return-1!==o&&(e=parseInt(t.substring(o+1),10)),e}},l=ol.control.Zoom;var c=o.n(l);function a(t){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a(t)}function s(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,u(n.key),n)}}function u(t){var e=function(t,e){if("object"!=a(t)||!t)return t;var o=t[Symbol.toPrimitive];if(void 0!==o){var n=o.call(t,e||"default");if("object"!=a(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"==a(e)?e:e+""}function f(t,e,o){return e=v(e),function(t,e){if(e&&("object"==a(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(t,p()?Reflect.construct(e,o||[],v(t).constructor):e.apply(t,o))}function p(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){}return(p=function(){return!!t})()}function d(){return d="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,o){var n=function(t,e){for(;!{}.hasOwnProperty.call(t,e)&&null!==(t=v(t)););return t}(t,e);if(n){var r=Object.getOwnPropertyDescriptor(n,e);return r.get?r.get.call(arguments.length<3?t:o):r.value}},d.apply(null,arguments)}function v(t){return v=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},v(t)}function y(t,e){return y=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},y(t,e)}e.getLogger("zoom");var g=function(t){function e(t){var o;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(o=f(this,e,[t=t||{}])).container=null,o.options=t,o}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&y(t,e)}(e,t),o=e,(n=[{key:"_createContainerPosition",value:function(t){if(this.container=t.getOverlayContainerStopEvent(),this.options.target=this.container,this.options.position){var e="position-container-"+this.options.position;if(!document.getElementById(e)){var o=document.createElement("div");o.id=e,o.classList.add("position"),o.classList.add(e),this.container.appendChild(o)}this.options.target=this.container.children[e]}}},{key:"_initContainer",value:function(){this._uid=i.generate(),this.element.id="GPzoom-"+this._uid,this.element.classList.add("GPwidget","gpf-widget","gpf-widget-button"),this.element.classList.remove("ol-zoom","ol-unselectable","ol-control");for(var t=this.element.childNodes,e=0;e<t.length;e++){var o=t[e];o.classList.contains("ol-zoom-in")&&(o.classList.remove("ol-zoom-in"),o.classList.add("GPzoomIn","gpf-btn-icon-zoom-in","fr-btn","fr-btn--primary"),o.id="GPzoomIn",o.innerHTML=""),o.classList.contains("ol-zoom-out")&&(o.classList.remove("ol-zoom-out"),o.classList.add("GPzoomOut","gpf-btn-icon-zoom-out","fr-btn","fr-btn--primary"),o.id="GPzoomOut",o.innerHTML="")}this.options.position&&(this.element.style.position="unset")}},{key:"setMap",value:function(t){t&&(this._createContainerPosition(t),this._initContainer(),t.getControls().forEach((function(t){t.element.classList.contains("ol-zoom")&&(t.element.classList.add("ol-hidden"),t.element.style.display="none")}))),this.setTarget(this.options.target),d(v(e.prototype),"setMap",this).call(this,t)}}])&&s(o.prototype,n),r&&s(o,r),Object.defineProperty(o,"prototype",{writable:!1}),o;var o,n,r}(c());const h=g;window.ol&&window.ol.control&&(window.ol.control.GeoportalZoom=g)})(),GpfExtOlGeoportalZoom=n.default})();
//# sourceMappingURL=GpfExtOlGeoportalZoom.js.map