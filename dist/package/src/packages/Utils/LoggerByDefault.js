import * as Log from "loglevel";

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
    getLogger : function (name) {
        // on définit process si non défini dans l'environnement
        if (typeof process === "undefined") {
            var process = {};
            process.env = {
                VERBOSE : false
            };
        }
        (process.env.VERBOSE) ? Log.enableAll() : Log.disableAll();
        var logname = name || "default";
        return Log.getLogger(logname);
    },
    /**
     * desactive tous les loggers
     * @function disableAll
     */
    disableAll : function () {
        var loggers = Log.getLoggers();
        for (const key in loggers) {
            if (Object.hasOwnProperty.call(loggers, key)) {
                const logger = loggers[key];
                logger.disableAll();
            }
        }
    },
    /**
     * active tous les loggers
     * @function enableAll
     */
    enableAll : function () {
        var loggers = Log.getLoggers();
        for (const key in loggers) {
            if (Object.hasOwnProperty.call(loggers, key)) {
                const logger = loggers[key];
                logger.enableAll();
            }
        }
    }
};

export default LoggerByDefault;

// Expose Export as ol.control.Catalog (for a build bundle)
if (window.Gp) {
    window.Gp.Logger = LoggerByDefault;
}
