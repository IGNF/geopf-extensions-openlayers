/**
 * Gestion du service de recherche de couches
 * @see https://geoservices.ign.fr/documentation/services/services-geoplateforme/service-geoplateforme-de-recherche
 */


/** resultats du service */
let m_suggestions = [];

/** gestion annulation du fetch */
let controller = new AbortController();

/** index de recherche */
let m_index = "geoplateforme";

/** liste des champs de recherche */
let m_fields = "title,layer_name";

/** nombre de suggestions du service */
let m_size = "1000";

/** nombre maximum de réponses */
let m_maximumResponses = 5;

/** liste des filtres sur les services */
let m_filterByService = ["WMTS", "TMS"];

/** liste des couches à exclure avec ces projections */
let m_filterByProjection = [];

/** filtres les services uniquement en TMS */
let m_filterByTMS = [
    "ADMIN_EXPRESS",
    "ISOHYPSE",
    "PLAN.IGN",
    "OCSGE_2016",
    "OCSGE_2019",
    "PCI",
    "BDTOPO"
];

/** url du service (template avec ${m_index}) */
let m_url = `https://data.geopf.fr/recherche/api/indexes/${m_index}/suggest`;

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

    let url = new URL(m_url);
    let params = {
        text : text,
        fields : m_fields,
        size : m_size
    };

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    var response = await fetch(url, {
        // FIXME
        // signal : controller.signal
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
    //       ],
    //       "attribution": {
    //             "title": "Ministère de la Transition écologique et de la Cohésion des territoires",
    //             "url": "https://www.ecologie.gouv.fr/",
    //             "logo": {
    //                  "format": "image/png",
    //                  "url": "https://data.geopf.fr/annexes/ressources/logos/mtect.png",
    //                  "width": 294,
    //                  "height": 171
    //             }
    //       }
    //     }
    //   }
    // ]
    if (!results || results.length === 0) {
        return;
    }

    // Attribution d'un score bonus aux couches WMTS puis retriage des résultats
    for (let i = 0; i < results.length; i++) {
        const result = results[i];
        var scoreBonus = result.source.type === "WMTS" || result.source.type === "TMS" ? 10 : 0;
        results[i].score += scoreBonus;
    }
    results.sort((a, b) => b.score - a.score);

    for (let i = 0; i < results.length; i++) {
        const result = results[i];
        var services = (m_filterByService.length === 0 || m_filterByService.includes(result.source.type));
        if (services) {
            if (unique().length >= m_maximumResponses) {
                break;
            }
            // FIXME champs possibles mais pas toujours remplis :
            // srs[], attributions{}, extent{}, metada_url[]
            var o = {
                originators : result.source.attribution || {},
                srs : result.source.srs || [],
                keywords : result.source.keywords || [],
                extent : result.source.extent || {},
                metadata : result.source.metadata_urls || [],
                name : result.source.layer_name,
                title : result.source.title,
                description : result.source.description,
                service : result.source.type,
                url : result.source.url
            };
            if (m_filterByTMS.length) {
                if ((o.service === "WMTS" && m_filterByTMS.includes(o.name)) ||
                    (o.service === "TMS" && !m_filterByTMS.includes(o.name))) {
                    continue;
                }
            }
            if (m_filterByProjection.length) {
                // FIXME Array !?
                if (m_filterByProjection.includes(o.srs[0])) {
                    continue;
                }
            }
            m_suggestions.push(o);
        }
    }

    target.dispatchEvent(
        new CustomEvent("suggest", {
            bubbles : true,
            detail : getSuggestions()
        })
    );

    return getSuggestions();
};

const unique = () => {
    return m_suggestions.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.service === value.service &&
            t.name === value.name &&
            t.title === value.title &&
            t.description === value.description
        ))
    );
};

const clear = () => {
    controller.abort();
    m_suggestions = [];
};

// getter (reponse)
const getSuggestions = () => {
    return unique();
};
const getNames = () => {
    return unique().map((o) => { return o.name; });
};
const getTitles = () => {
    return unique().map((o) => { return o.title; });
};

// setter (conf)
const setIndex = (value) => {
    m_index = value;
};
const setFields = (value) => {
    m_fields = value;
};
const setSize = (value) => {
    m_size = parseInt(value);
};
const setUrl = (value) => {
    m_url = eval("`" + value + "`"); // insecure !
};
const setMaximumResponses = (value) => {
    m_maximumResponses = parseInt(value);
};
/**
 * Filtre sur la liste des services à selectionner
 * @param {Array} value - liste de service
 */
const setFiltersByService = (value) => {
    m_filterByService = value === "" ? [] : value.split(",");
};
/**
 * Filtre sur les couches à exclure
 * @param {Array} value - liste des projections
 */
const setFiltersByProjection = (value) => {
    m_filterByProjection = value === "" ? [] : value.split(",");
};
/**
 * Filtre sur les "purs" couches vecteurs tuilés
 * @param {Array} value - liste des couches
 */
const setFiltersByTMS = (value) => {
    m_filterByTMS = value === "" ? [] : value.split(",");
};
/**
 * Mise à jour de la liste des "purs" couches vecteurs tuilés
 * @param {String} value - url
 */
const updateFilterByTMS = async (value) => {
    var url = value;
    if (!url) {
        url = "https://raw.githubusercontent.com/IGNF/geoportal-configuration/new-url/vectorTileConfig/fullVectorTileConfig.json";
    }
    const response = await fetch(url);
    const results = await response.json();

    if (response.status !== 200) {
        throw new Error(response.message);
    }

    if (!results) {
        throw new Error("Liste vide !");
    }

    var lstName = Object.keys(results.layers).map((k) => { return k.split("$")[0]; });
    if (lstName) {
        setFiltersByTMS(lstName.toString());
    }

    return m_filterByTMS;
};

export default {
    target,
    suggest,
    clear,
    getSuggestions,
    getNames,
    getTitles,
    setIndex,
    setFields,
    setSize,
    setUrl,
    setMaximumResponses,
    setFiltersByService,
    setFiltersByTMS,
    updateFilterByTMS,
    setFiltersByProjection
};
