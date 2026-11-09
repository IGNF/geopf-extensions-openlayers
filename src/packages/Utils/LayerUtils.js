import { apply as applyTransform } from "ol/transform";

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
    getZoomLevelFromScaleDenominator : function (scaleDenominator, crs) {
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
                    0 : 104579.224549894,
                    1 : 52277.5323537905,
                    2 : 26135.4870785954,
                    3 : 13066.8913818,
                    4 : 6533.2286041135,
                    5 : 3266.5595244627,
                    6 : 1633.2660045974,
                    7 : 816.629554986,
                    8 : 408.3139146768,
                    9 : 204.1567415109,
                    10 : 102.0783167832,
                    11 : 51.0391448966,
                    12 : 25.5195690743,
                    13 : 12.7597836936,
                    14 : 6.379891636,
                    15 : 3.1899457653,
                    16 : 1.5949728695,
                    17 : 0.7974864315,
                    18 : 0.3987432149,
                    19 : 0.1993716073,
                    20 : 0.0996858037,
                    21 : 0.0498429018
                };
                break;
            default:
                resolutionsNatives = {
                    0 : 156543.033928041,
                    1 : 78271.51696402048,
                    2 : 39135.758482010235,
                    3 : 19567.87924100512,
                    4 : 9783.93962050256,
                    5 : 4891.96981025128,
                    6 : 2445.98490512564,
                    7 : 1222.99245256282,
                    8 : 611.49622628141,
                    9 : 305.7481131407048,
                    10 : 152.8740565703525,
                    11 : 76.43702828517624,
                    12 : 38.21851414258813,
                    13 : 19.10925707129406,
                    14 : 9.554628535647032,
                    15 : 4.777314267823516,
                    16 : 2.388657133911758,
                    17 : 1.194328566955879,
                    18 : 0.5971642834779395,
                    19 : 0.2985821417389697,
                    20 : 0.1492910708694849,
                    21 : 0.0746455354347424
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
    getAttributions : function (params) {
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
                    if (minZoomLevel && (minZoomLevel > zoom)) {
                        drawLogo = false;
                    }

                    // max zoom constraints
                    if (drawLogo && maxZoomLevel && (maxZoomLevel < zoom)) {
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

                    var bImage = !!(logo);
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
     * @returns {Boolean} intersects - True if the two extents intersect, false otherwise.
     */
    intersects : function (extent1, extent2) {
        var intersectsX = (extent1[1] <= extent2[3]) && (extent2[1] <= extent1[3]);
        var intersectsY = (extent1[2] <= extent2[0]) && (extent2[2] <= extent1[0]);
        return intersectsX && intersectsY;
    },

    /**
     * True si l'emprise catalogue est régionale (pas ≈ monde entier).
     * Les couches globales (PLANIGN, ortho…) ne doivent PAS recevoir de
     * `layer.extent` : ça coupe les copies multiWorld.
     *
     * @function isRegionalCatalogueExtent
     * @param {Array.<Number>} extent - [minx, miny, maxx, maxy]
     * @param {Array.<Number>} worldExtent - emprise projection
     * @returns {Boolean}
     */
    isRegionalCatalogueExtent : function (extent, worldExtent) {
        if (!extent || !worldExtent) {
            return !!extent;
        }
        var worldW = worldExtent[2] - worldExtent[0];
        var worldH = worldExtent[3] - worldExtent[1];
        if (!worldW || !worldH) {
            return true;
        }
        var w = extent[2] - extent[0];
        var h = extent[3] - extent[1];
        return (w / worldW) < 0.95 || (h / worldH) < 0.95;
    },

    /**
     * multiWorld / wrapX : borne les GetTile à l'emprise catalogue sans poser
     * `layer.extent` absolu seul (sinon pas de répétition hors monde 0).
     *
     * Skip URL hors bbox (après wrapX, tileCoord en monde 0) — même rôle
     * que `bounds` MapLibre. Le dessin exact (toutes les copies en X, Y fixe)
     * est fait par enableRepeatingExtentClip. Pas de `layer.extent` :
     * OL n'en accepte qu'un, incompatible avec multiWorld (#10387).
     * À n'utiliser que pour les couches régionales (voir isRegionalCatalogueExtent).
     *
     * @function constrainSourceToCatalogueExtent
     * @param {Object} source - ol.source.TileImage (WMTS / TileWMS)
     * @param {Array.<Number>} catalogueExtent - [minx, miny, maxx, maxy] en proj source
     * @returns {undefined}
     */
    constrainSourceToCatalogueExtent : function (source, catalogueExtent) {
        if (!source || !catalogueExtent || typeof source.getTileUrlFunction !== "function") {
            return;
        }
        var originalTileUrlFunction = source.getTileUrlFunction();
        if (typeof originalTileUrlFunction !== "function") {
            return;
        }
        source._catalogueExtent = catalogueExtent;

        source.setTileUrlFunction(function (tileCoord, pixelRatio, projection) {
            if (!tileCoord) {
                return undefined;
            }
            var tileGrid = source.getTileGridForProjection
                ? source.getTileGridForProjection(projection)
                : source.getTileGrid();
            if (tileGrid && typeof tileGrid.getTileCoordExtent === "function") {
                var tileExtent = tileGrid.getTileCoordExtent(tileCoord);
                // OL : [minx, miny, maxx, maxy]
                if (tileExtent[2] < catalogueExtent[0] ||
                    tileExtent[0] > catalogueExtent[2] ||
                    tileExtent[3] < catalogueExtent[1] ||
                    tileExtent[1] > catalogueExtent[3]) {
                    return undefined;
                }
            }
            return originalTileUrlFunction.call(source, tileCoord, pixelRatio, projection);
        });
    },

    /**
     * Clip d'affichage répété : même rectangle catalogue sur chaque copie
     * de monde en longitude, latitude fixe (pas de wrap Y).
     *
     * Équivalent visuel de `layer.extent` en prod sur le monde 0, sans
     * casser la répétition multiWorld (OL : un seul extent par couche).
     * Même principe que MapLibre `renderWorldCopies` + `source.bounds`.
     *
     * @function enableRepeatingExtentClip
     * @param {Object} layer - ol.layer.Tile
     * @param {Array.<Number>} catalogueExtent - [minx, miny, maxx, maxy]
     * @returns {undefined}
     */
    enableRepeatingExtentClip : function (layer, catalogueExtent) {
        if (!layer || !catalogueExtent || typeof layer.on !== "function") {
            return;
        }
        layer.set("_catalogueExtent", catalogueExtent.slice());
        var clipped = false;

        var addWorldPolygon = function (context, frameState, inverse, dx) {
            var extent = [
                catalogueExtent[0] + dx,
                catalogueExtent[1],
                catalogueExtent[2] + dx,
                catalogueExtent[3]
            ];
            var corners = [
                [extent[0], extent[3]],
                [extent[2], extent[3]],
                [extent[2], extent[1]],
                [extent[0], extent[1]]
            ];
            var transform = frameState.coordinateToPixelTransform;
            for (var i = 0; i < corners.length; i++) {
                applyTransform(transform, corners[i]);
                if (inverse) {
                    applyTransform(inverse, corners[i]);
                }
            }
            context.moveTo(Math.round(corners[0][0]), Math.round(corners[0][1]));
            context.lineTo(Math.round(corners[1][0]), Math.round(corners[1][1]));
            context.lineTo(Math.round(corners[2][0]), Math.round(corners[2][1]));
            context.lineTo(Math.round(corners[3][0]), Math.round(corners[3][1]));
            context.closePath();
        };

        layer.on("prerender", function (event) {
            var context = event.context;
            var frameState = event.frameState;
            if (!context || !frameState || !frameState.viewState) {
                return;
            }
            var projection = frameState.viewState.projection;
            var projExtent = projection && projection.getExtent && projection.getExtent();
            var viewExtent = frameState.extent;
            if (!projExtent || !viewExtent) {
                return;
            }
            var worldWidth = projExtent[2] - projExtent[0];
            if (!worldWidth) {
                return;
            }
            var minWorld = Math.floor((viewExtent[0] - catalogueExtent[2]) / worldWidth);
            var maxWorld = Math.ceil((viewExtent[2] - catalogueExtent[0]) / worldWidth);
            if (maxWorld < minWorld) {
                return;
            }
            if (maxWorld - minWorld > 8) {
                var centerX = frameState.viewState.center[0];
                var mid = Math.round((centerX - (catalogueExtent[0] + catalogueExtent[2]) / 2) / worldWidth);
                minWorld = mid - 4;
                maxWorld = mid + 4;
            }
            context.save();
            context.beginPath();
            for (var w = minWorld; w <= maxWorld; w++) {
                addWorldPolygon(context, frameState, event.inversePixelTransform, w * worldWidth);
            }
            context.clip();
            clipped = true;
        });

        layer.on("postrender", function (event) {
            if (clipped && event.context) {
                event.context.restore();
                clipped = false;
            }
        });
    }
};

export default LayerUtils;
