/** resultats du service */
let suggestions = [];

/** gestion annulation du fetch */
let controller = new AbortController();

/** index de recherche */
let index = "geoplateforme";

/** liste des champs de recherche */
let fields = "title,layer_name";

/** nombre de suggestions */
let size = "100";

/**
 * Interface pour les evenements
 * @example
 * target.dispatchEvent(new CustomEvent("myEvent", { detail : {} }));
 * target.addEventListener("myEvent", handler);
 */
const target = new EventTarget();

/**
 * Appel du service de recherche
 * @param {*} text - recherche
 * @returns {Object} json
 * @fire suggest
 */
const suggest = async (text) => {
    // ex. request
    // https://data.geopf.fr/recherche/api/indexes/geoplateforme/suggest?text=ORTHO&fields=title
    clear();

    controller = new AbortController();

    let url = new URL(`https://data.geopf.fr/recherche/api/indexes/${index}/suggest`);
    let params = {
        text : text,
        fields : fields,
        size : size
    };

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    var response = await fetch(url, {
        signal : controller.signal
    });

    var results = await response.json();

    if (response.status !== 200) {
        throw new Error(response.message);
    }

    // ex. response
    // [
    //   {
    //     "index": "geoplateforme",
    //     "score": 3.4832718,
    //     "source": {
    //       "id": "fc2af911-d9c2-4fc8-aee7-46034eebf821",
    //       "offering_id": "faa4c69c-d03b-4502-af87-7f3667411321",
    //       "index_name": "geoplateforme",
    //       "layer_name": "nl_bdtopo_allauch",
    //       "title": "NL - BD Topo : Allauch",
    //       "description": "Extrait de BD TOPo sur Allauch",
    //       "type": "WMS",
    //       "url": "https://data.geopf.fr/wms-v?service=WMS&version=1.3.0&request=GetMap&layers=nl_bdtopo_allauch&bbox={xmin},{ymin},{xmax},{ymax}&styles={styles}&width={width}&height={height}&srs={srs}&format={format}",
    //       "open": true,
    //       "publication_date": "2023-11-27",
    //       "keywords": [
    //         "BDTOPO",
    //         "Recette"
    //       ],
    //       "extent": {},
    //       "metadata_urls": [],
    //       "srs": [
    //         "EPSG:2154"
    //       ]
    //     }
    //   }
    // ]
    if (!results || results.length === 0) {
        return;
    }

    for (let index = 0; index < results.length; index++) {
        const result = results[index];
        if (result.source.open) {
            suggestions.push({
                name : result.source.layer_name,
                title : result.source.title,
                description : result.source.description,
                service : result.source.type
            });
        }
    }

    target.dispatchEvent(
        new CustomEvent("suggest", {
            bubbles : true,
            detail : suggestions
        })
    );

    return suggestions;
};

const clear = () => {
    controller.abort();
    suggestions = [];
};

const getSuggestions = (i) => {
    return (typeof i !== "undefined") ? suggestions[i] : suggestions;
};
const getName = () => {
    return suggestions.name;
};
const getService = () => {
    return suggestions.service;
};

export default {
    target,
    suggest,
    getSuggestions,
    getName,
    getService
};