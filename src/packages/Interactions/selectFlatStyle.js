import MultiPoint from "ol/geom/MultiPoint";

import mapPinIcon from "../Controls/SearchEngine/map-pin-2-fill.svg";
import VectorLayer from "ol/layer/Vector";
import Feature from "ol/Feature";

/** Get all points in coordinates
 * @param {Feature|Array<coordinate>} coords Coordinates or feature
 * @returns {Array<coordinate>} Flat coordinates array
 * @private
 */
function getFlatCoordinates (coords) {
    if (coords.getGeometry) {
        coords = coords.getGeometry().getCoordinates();
    }
    if (coords && coords[0].length && coords[0][0].length) {
        var c = [];
        for (var i=0; i<coords.length; i++) {
            c = c.concat(getFlatCoordinates(coords[i]));
        }
        return c;
    } else {
        return coords;
    }
}

/** Default flat style
 * @param {String} type Geometry type
 * @param {String} featureType Current feature geometry type or "select"
 * @param {String} iconSrc Icon source for points
 * @returns {Object|Array<Object>} Flat style
 */
function selectFlatStyle (type, featureType, iconSrc) {
    if (type==="select") {
        const style = selectFlatStyle("Point", "select", iconSrc);
        style.push({
            "shape-points" : 4,
            "shape-radius" : 6,
            "shape-stroke-color" : "#33b1ff",
            "shape-stroke-width" : 1,
        });
        return style;
    }

    const iconSource = iconSrc || mapPinIcon;

    switch (type) {
        case "Point": {
            return [
                {
                    "icon-src" : iconSource,
                    "icon-color" : "#000091",
                    "icon-anchor" : [0.5, 1],
                    "stroke-color" : "#33b1ff",
                    "stroke-width" : 2,
                    "fill-color" : "rgba(51, 177, 255, 0.2)",
                },
                {
                    "circle-radius" : 4,
                    "circle-fill-color" : "#33b1ff",
                    "circle-stroke-color" : "#fff",
                    "circle-stroke-width" : 2,
                    geometry : (f) => new MultiPoint( getFlatCoordinates(f) )
                }
            ];
        }
        case "LineString":
        case "Polygon": 
        default: {
            switch (featureType) {
                case "Point": {
                    return [];
                }
                case "Polygon": {
                    return [
                        {
                            "stroke-color" : "#33b1ff",
                            "stroke-line-dash" : [5, 6],
                            "stroke-width" : 2,
                            "fill-color" : "rgba(51, 177, 255, 0.2)",
                        }
                    ];
                }
                case "LineString":
                default: {
                    return [
                        {
                            "circle-radius" : 5,
                            "circle-fill-color" : "#fff",
                            "circle-stroke-color" : "#33b1ff",
                            "circle-stroke-width" : 2,
                            "stroke-color" : "#33b1ff",
                            "stroke-width" : 2,
                            "fill-color" : "rgba(51, 177, 255, 0.2)",
                        },
                        {
                            "circle-radius" : 4,
                            "circle-fill-color" : "#33b1ff",
                            "circle-stroke-color" : "#fff",
                            "circle-stroke-width" : 2,
                            geometry : (f) => new MultiPoint( getFlatCoordinates(f) )
                        }
                    ];
                }
            }
        }
    }
}

function selectStyle (type, featureType, iconSrc) {
    const flatStyle = selectFlatStyle(type, featureType, iconSrc);
    const styles = new VectorLayer({style : flatStyle}).getStyleFunction()(new Feature());
    return styles.length > 1 ? styles : styles[0];
}

// Default flat style cache
const defaultFlatStyle = {};

["Point", "LineString", "Polygon"].forEach(type => {
    defaultFlatStyle[type] = selectStyle(type);
    ["Point", "LineString", "Polygon"].forEach(ftype => {
        defaultFlatStyle[`${type}_${ftype}`] = selectStyle(type, ftype);
    });
});

export { defaultFlatStyle, selectStyle, getFlatCoordinates };
