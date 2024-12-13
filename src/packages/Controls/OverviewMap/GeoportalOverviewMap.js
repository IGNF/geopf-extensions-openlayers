// import CSS
import "../../CSS/Controls/OverviewMap/GPFoverviewMap.css";
// import local
import Logger from "../../Utils/LoggerByDefault";
import SelectorID from "../../Utils/SelectorID";
import GeoportalWMTS from "../../Layers/LayerWMTS";
// import ol
import OverviewMap from "ol/control/OverviewMap";

var logger = Logger.getLogger("overviewMap");

/**
 * @classdesc
 * OpenLayers Control to manage overviewMap
 *
 * @constructor
 * @extends {ol.control.OverviewMap}
 * @alias ol.control.GeoportalOverviewMap
 * @type {ol.control.GeoportalOverviewMap}
 * @param {Object} options - ol.control.OverviewMap options (see {@link http://openlayers.org/en/latest/apidoc/ol.control.OverviewMap.html ol.Control.OverviewMap})
 * @fire overviewmap:toggle
 * @example
 * var overviewmap = new ol.control.GeoportalOverviewMap({
 *   position: "top-left"
 * });
 * map.addControl(overviewmap);
 */
var GeoportalOverviewMap = class GeoportalOverviewMap extends OverviewMap {

    /**
     * See {@link ol.control.GeoportalOverviewMap}
     * @module GeoportalOverviewMap
     * @alias module:~controls/GeoportalOverviewMap
     * @param {*} options - options
     * @example
     * import GeoportalOverviewMap from "gpf-ext-ol/controls/GeoportalOverviewMap"
     * ou
     * import { GeoportalOverviewMap } from "gpf-ext-ol"
     */
    constructor (options) {
        options = options || {};

        /**
         * Layer by default
         */
        const LAYER_CONFIG = {
            "name" : "GEOGRAPHICALGRIDSYSTEMS.MAPS.OVERVIEW",
            "globalConstraint" : {
                "maxScaleDenominator" : 279541132.01435894,
                "minScaleDenominator" : 2183915.0938621787,
                "bbox" : {
                    "left" : -179.5,
                    "right" : 179.5,
                    "top" : 75,
                    "bottom" : -75
                }
            },
            "params" : {
                "url" : "https://data.geopf.fr/wmts",
                "styles" : "normal",
                "version" : "1.0.0",
                "format" : "image/jpeg",
                "projection" : "EPSG:3857",
                "minScale" : 2183915.0938621787,
                "maxScale" : 279541132.01435894,
                "extent" : {
                    "left" : -179.5,
                    "right" : 179.5,
                    "top" : 75,
                    "bottom" : -75
                },
                "legends" : [
                    {
                        "format" : "image/jpeg",
                        "url" : "https://data.geopf.fr/annexes/ressources/legendes/LEGEND.jpg",
                        "minScaleDenominator" : "200"
                    }
                ],
                "title" : "Carte Mondiale pour la mini-vue",
                "description" : "Carte Mondiale pour la mini-vue",
                "tileMatrixSetLimits" : {
                    "1" : {
                        "minTileRow" : "0",
                        "maxTileRow" : "1",
                        "minTileCol" : "0",
                        "maxTileCol" : "1"
                    },
                    "2" : {
                        "minTileRow" : "0",
                        "maxTileRow" : "3",
                        "minTileCol" : "0",
                        "maxTileCol" : "3"
                    },
                    "3" : {
                        "minTileRow" : "1",
                        "maxTileRow" : "6",
                        "minTileCol" : "0",
                        "maxTileCol" : "7"
                    },
                    "4" : {
                        "minTileRow" : "2",
                        "maxTileRow" : "13",
                        "minTileCol" : "0",
                        "maxTileCol" : "15"
                    },
                    "5" : {
                        "minTileRow" : "5",
                        "maxTileRow" : "26",
                        "minTileCol" : "0",
                        "maxTileCol" : "31"
                    },
                    "6" : {
                        "minTileRow" : "11",
                        "maxTileRow" : "52",
                        "minTileCol" : "0",
                        "maxTileCol" : "63"
                    },
                    "7" : {
                        "minTileRow" : "22",
                        "maxTileRow" : "105",
                        "minTileCol" : "0",
                        "maxTileCol" : "127"
                    },
                    "8" : {
                        "minTileRow" : "45",
                        "maxTileRow" : "210",
                        "minTileCol" : "0",
                        "maxTileCol" : "255"
                    }
                },
                "TMSLink" : "PM_1_8",
                "matrixIds" : [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8"
                ],
                "tileMatrices" : {
                    "1" : {
                        "matrixId" : "1",
                        "matrixHeight" : 2,
                        "matrixWidth" : 2,
                        "scaleDenominator" : 279541132.01435894,
                        "tileHeight" : 256,
                        "tileWidth" : 256,
                        "topLeftCorner" : {
                            "x" : -20037508.3427892,
                            "y" : 20037508.3427892
                        }
                    },
                    "2" : {
                        "matrixId" : "2",
                        "matrixHeight" : 4,
                        "matrixWidth" : 4,
                        "scaleDenominator" : 139770566.0071793,
                        "tileHeight" : 256,
                        "tileWidth" : 256,
                        "topLeftCorner" : {
                            "x" : -20037508.3427892,
                            "y" : 20037508.3427892
                        }
                    },
                    "3" : {
                        "matrixId" : "3",
                        "matrixHeight" : 8,
                        "matrixWidth" : 8,
                        "scaleDenominator" : 69885283.00358965,
                        "tileHeight" : 256,
                        "tileWidth" : 256,
                        "topLeftCorner" : {
                            "x" : -20037508.3427892,
                            "y" : 20037508.3427892
                        }
                    },
                    "4" : {
                        "matrixId" : "4",
                        "matrixHeight" : 16,
                        "matrixWidth" : 16,
                        "scaleDenominator" : 34942641.50179486,
                        "tileHeight" : 256,
                        "tileWidth" : 256,
                        "topLeftCorner" : {
                            "x" : -20037508.3427892,
                            "y" : 20037508.3427892
                        }
                    },
                    "5" : {
                        "matrixId" : "5",
                        "matrixHeight" : 32,
                        "matrixWidth" : 32,
                        "scaleDenominator" : 17471320.75089743,
                        "tileHeight" : 256,
                        "tileWidth" : 256,
                        "topLeftCorner" : {
                            "x" : -20037508.3427892,
                            "y" : 20037508.3427892
                        }
                    },
                    "6" : {
                        "matrixId" : "6",
                        "matrixHeight" : 64,
                        "matrixWidth" : 64,
                        "scaleDenominator" : 8735660.375448715,
                        "tileHeight" : 256,
                        "tileWidth" : 256,
                        "topLeftCorner" : {
                            "x" : -20037508.3427892,
                            "y" : 20037508.3427892
                        }
                    },
                    "7" : {
                        "matrixId" : "7",
                        "matrixHeight" : 128,
                        "matrixWidth" : 128,
                        "scaleDenominator" : 4367830.1877243575,
                        "tileHeight" : 256,
                        "tileWidth" : 256,
                        "topLeftCorner" : {
                            "x" : -20037508.3427892,
                            "y" : 20037508.3427892
                        }
                    },
                    "8" : {
                        "matrixId" : "8",
                        "matrixHeight" : 256,
                        "matrixWidth" : 256,
                        "scaleDenominator" : 2183915.0938621787,
                        "tileHeight" : 256,
                        "tileWidth" : 256,
                        "topLeftCorner" : {
                            "x" : -20037508.3427892,
                            "y" : 20037508.3427892
                        }
                    }
                },
                "nativeResolutions" : [
                    "78271.51696402048",
                    "39135.75848201023",
                    "19567.87924100512",
                    "9783.939620502561",
                    "4891.969810251280",
                    "2445.984905125640",
                    "1222.992452562820",
                    "611.4962262814100"
                ]
            }
        };

        // optiopns par defaut
        var className = "ol-overviewmap";
        options.className = options.className || className;
        options.collapseLabel = options.collapseLabel || "";
        options.collapsed = options.collapsed;
        if (options.collapsed === undefined) {
            options.collapsed = true;
        }
        options.label = options.label || "";
        options.tipLabel = "Carte générale";
        options.layers = options.layers || [
            new GeoportalWMTS({
                layer : "GEOGRAPHICALGRIDSYSTEMS.MAPS.OVERVIEW",
                configuration : LAYER_CONFIG
            })
        ];

        super(options);
        /**
         * Nom de la classe (heritage)
         * @private
         */
        this.CLASSNAME = "OverviewMap";
        this.container = null;
        this.options = options;
    }

    _createContainerPosition (map) {
        this.container = map.getOverlayContainerStopEvent();
        this.options.target = this.container;
        if (this.options.position) {
            var id = "position-container-" + this.options.position;
            if (!document.getElementById(id)) {
                // Creation manuelle du container de position
                var div = document.createElement("div");
                div.id = id;
                div.classList.add("position");
                div.classList.add(id);
                this.container.appendChild(div);
            }
            this.options.target = this.container.children[id];
        }
    }

    _initContainer () {
        // UID interne pour chaque controle
        this._uid = this.options.id || SelectorID.generate();

        // Ajout / Suppression des attributs du DOM
        this.element.id = "GPoverviewMap-" +  this._uid;
        this.element.classList.add("GPwidget", "gpf-widget", "gpf-widget-button");
        this.element.classList.remove("ol-control");

        var elements = this.element.childNodes;
        // button
        var button = elements[1];
        button.id = "GPshowOverviewMap-" +  this._uid;
        button.classList.add("GPshowOpen", "GPshowAdvancedToolPicto", "GPshowOverviewMap", "gpf-btn-icon", "gpf-btn-icon-overviewmap", "fr-btn", "fr-btn--tertiary", "gpf-btn--tertiary");
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", !this.options.collapsed);
        button.setAttribute("type", "button");
        button.removeAttribute("title");
        button.setAttribute("aria-label", this.options.tipLabel);
        var self = this;
        if (button.addEventListener) {
            button.addEventListener("click", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                /**
                 * event triggered on toggle map
                 * @event overviewmap:toggle
                 */
                self.dispatchEvent({
                    type : "overviewmap:toggle",
                    status : status
                });
            });
        } else if (button.attachEvent) {
            button.attachEvent("onclick", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                self.dispatchEvent({
                    type : "overviewmap:toggle",
                    status : status
                });
            });
        }

        // Surcharge CSS de positionnement par defaut
        if (this.options.position) {
            this.element.style.position = "unset";
        }

        // reunion du bouton avec le précédent
        if (this.options.gutter === false) {
            this.element.classList.add("gpf-button-no-gutter");
        }
    }

    /**
     * Overload setMap function
     *
     * @param {ol.Map} map - Map.
     */
    setMap (map) {
        if (map) {
            this._createContainerPosition(map);
            this._initContainer();
        }
        this.setTarget(this.options.target);
        super.setMap(map);
    }

    /**
     * Get container
     *
     * @returns {DOMElement} container
     */
    getContainer () {
        return this.container;
    }

};

export default GeoportalOverviewMap;

// Expose GeoportalOverviewMap as ol.control.GeoportalOverviewMap (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.GeoportalOverviewMap = GeoportalOverviewMap;
}
