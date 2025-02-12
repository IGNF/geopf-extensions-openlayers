import proj4 from "proj4";

// Objet interface requête OGC
var OGCRequest = {
    /**
   * Computes data for a given layer of Geoplateforme's WFS
   * @param {string} layer name of the WFS layer
   * @param {Array} attributes list of strings of the relevant attributes to return
   * @param {number} around distance around the point in km for the query, default 0
   * @param {string} geom_name name of the geometry column, default "geom"
   * @param {string} additional_cql cql filter needed other than geometry, e.g. "AND nature_de_l_objet='Bois'", default ""
   * @param {number} epsg epsg number of the layer's CRS, default 4326
   * @param {number} lat Latitude
   * @param {number} lng Longitude
   * @returns {Promise(Array)} results of each attributes (no duplicates)
   */
    computeGenericGPFWFS : async function (layer, attributes, around=0, geom_name="geom", additional_cql="", epsg=4326, getGeom=false, lat, lng) {
        let coord1 = lng;
        let coord2 = lat;
        if (epsg !== 4326) {
            [coord1, coord2] = proj4(proj4.defs("EPSG:4326"), proj4.defs(`EPSG:${epsg}`), [lng, lat]);
        }
        let cql_filter = `INTERSECTS(${geom_name},Point(${coord1}%20${coord2}))`;
        if (around > 0) {
            cql_filter = `DWITHIN(${geom_name},Point(${coord1}%20${coord2}),${around},kilometers)`;
        }
        if (additional_cql) {
            cql_filter += ` ${additional_cql}`;
        }
    
        const results = await fetch(
            `https://data.geopf.fr/wfs/ows?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&typename=${layer}&outputFormat=json&count=50&CQL_FILTER=${cql_filter}`
        );
        const json = await results.json();
    
        const results_attributes = [];
        json.features.forEach((feature) => {
            const feature_attributes = [];
            attributes.forEach((attribute) => {
                feature_attributes.push(feature.properties[attribute]);
            });
            if (getGeom) {
                feature_attributes.push(feature.geometry);
            }
            if (attributes.length === 1 && feature_attributes[0] !== null && !getGeom) {
                results_attributes.push(feature_attributes[0]);
            } else if (attributes.length > 1 || getGeom) {
                results_attributes.push(feature_attributes);
            }
        });
        return results_attributes;
    }
};

export default OGCRequest;
