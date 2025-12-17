let uidCounter_ = 0;

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
    detectSupport : function () {
        var isDesktop = true;
        var userAgent = window.navigator.userAgent.toLowerCase();

        if (userAgent.indexOf("iphone") !== -1 ||
            userAgent.indexOf("ipod") !== -1 ||
            userAgent.indexOf("ipad") !== -1 ||
            userAgent.indexOf("android") !== -1 ||
            userAgent.indexOf("mobile") !== -1 ||
            userAgent.indexOf("blackberry") !== -1 ||
            userAgent.indexOf("tablet") !== -1 ||
            userAgent.indexOf("phone") !== -1 ||
            userAgent.indexOf("touch") !== -1) {
            isDesktop = false;
        }

        if (userAgent.indexOf("msie") !== -1 ||
            userAgent.indexOf("trident") !== -1) {
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
    assign : function (dest, source) {
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
    mergeParams : function (dest, source, replace) {
        if (typeof dest === "undefined" || typeof source === "undefined") {
            return;
        }
        if (typeof replace === "undefined") {
            replace = true;
        }
        for (var param in source) {
            if (source.hasOwnProperty(param)) {
                if (typeof source[param] === "object") {
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
    },
    /**
     * Gets a unique ID for an object. This mutates the object so that further calls
     * with the same object as a parameter returns the same value. Unique IDs are generated
     * as a strictly increasing sequence. Adapted from goog.getUid.
     *
     * @param {String} prefix - prefix for the unique ID
     * @param {Object} [obj] The object to get the unique ID for.
     * @return {String} The unique ID for the object.
     * @api
     */
    getUid : function (prefix, obj) {
        if (obj) {
            if (obj.id) {
                return obj.id;
            }
        }
        return prefix + (++uidCounter_);
    },

    /**
     * Ajoute une icône à un élémént avec le style si nécessaire
     * @param {HTMLElement} element Élément sur lequel ajouter l'icône
     * @param {String|HTMLElement} [icon] Icône à ajouter
     * @param {String} [label] Label du bouton (utilisé dans la classe en cas de svg)
     */
    setIcon : function (element, icon, label) {
        let svg = false;
        const regex = /(\.|\\)/;
        if (icon) {
            if (icon.startsWith("<svg")) {
                // FIXME
                // width / height à definir si ces options ne sont pas renseignées inline
                icon = "data:image/svg+xml;base64," + btoa(icon);
                svg = true;
            } else if (!regex.test(icon)) {
                // L'icône n'est pas une URL
                element.classList.add(icon);
            } else {
                // On ajoute l'URL en style après
                svg = true;
            }
        }

        // Ajoute le style SVG
        if (svg) {
            const iconClass = `gpf-btn-icon-ls-tools-${label ? label : Helper.getUid("icon-toggle-button-")}`;
            // Ajoute la classe au bouton
            element.classList.add(iconClass);
            if (!document.querySelector(`style[data-injected="${iconClass.toLowerCase()}"]`)) {
                // Ajoute le style au document s'il n'existe pas encore
                const style = document.createElement("style");
                style.dataset.injected = iconClass.toLowerCase();
                style.textContent = `
                    .${iconClass.toLowerCase()}::before {
                        -webkit-mask-image: url('${icon}');
                        -webkit-mask-repeat: no-repeat;
                        -webkit-mask-position: center;

                        mask-image: url('${icon}');
                        mask-repeat: no-repeat;
                        mask-position: center;
                    }
                `;
                document.head.appendChild(style);
            }
        }
    }
};

export default Helper;
