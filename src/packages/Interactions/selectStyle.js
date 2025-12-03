import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
import CircleStyle from "ol/style/Circle";
import MultiPoint from "ol/geom/MultiPoint";

import mapPinIcon from "../Controls/SearchEngine/map-pin-2-fill.svg";

/** Get all points in coordinates
 * @param {Array<coordinate>} coords
 * @returns {Array<coordinate>}
 * @private
 */
function getFlatCoordinates (coords) {
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

/** Default syle
 * @param {String} type Geometry type
 * @param {ol.style.Image} img Image style for points
 * @returns {ol.style.Style|Array<ol.style.Style>} Style
 */
function selectStyle (type, featureType, img) {
    const stroke = new Stroke({
        color : "#33b1ff",
        width : 2,
    });
    const fill = new Fill({
        color : "rgb(51, 177, 255, 0.2)" 
    });
    const image = img || new Icon({
        src : mapPinIcon,
        color : "#000091",
        anchor : [0.5, 1],
    });
    const circle = new CircleStyle({
        stroke : new Stroke({ 
            color : "#fff", 
            width : 2 
        }),
        fill : new Fill({ 
            color : "#33b1ff",
        }),
        radius : 4,
    });
    const wcircle = new CircleStyle({
        stroke : new Stroke({ 
            color : "#33b1ff", 
            width : 2 
        }),
        fill : new Fill({ 
            color : "#fff",
        }),
        radius : 5,
    });

    switch (type) {
        case "Point": {
            return new Style({
                image : image,
            });
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
                        new Style({
                            stroke : new Stroke({
                                color : "#33b1ff",
                                lineDash : [5, 6],
                                width : 2,
                            }),
                            fill : fill,
                        })
                    ];
                }
                case "LineString":
                default: {
                    return [
                        new Style({
                            image : wcircle,
                            stroke : stroke,
                            fill : fill,
                        }),
                        new Style({
                            image : circle,
                            geometry : (f) => new MultiPoint( getFlatCoordinates(f.getGeometry().getCoordinates() ) )
                        })
                    ];
                }
            }
        }
    }
}

// Default syle cache
const defaultStyle = {};

["Point", "LineString", "Polygon"].forEach(type => {
    defaultStyle[type] = selectStyle(type);
    ["Point", "LineString", "Polygon"].forEach(ftype => {
        defaultStyle[`${type}_${ftype}`] = selectStyle(type, ftype);
    });
});

export { defaultStyle, selectStyle, getFlatCoordinates };