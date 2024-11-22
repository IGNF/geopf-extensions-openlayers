/**
 * @classdesc
 * 
 * Gestion du service de recherche de couches
 * 
 * @module Search
 * @alias module:~services/Search
 * @fixme en attente d'evolution du service pour le filtrage sur le type 
 * afin d'écarter des reponses de la recherche (ex. DOWNLOAD)
 * @see https://geoservices.ign.fr/documentation/services/services-geoplateforme/service-geoplateforme-de-recherche
 */

/** resultats du service */
let m_suggestions = [];

/** gestion annulation du fetch */
let controller = new AbortController();

/** index de recherche */
let m_index = "geoplateforme";

/** 
 * liste des champs de recherche
 * valeurs : "title, description, theme, keywords, layer_name"
 */
let m_fields = "title,layer_name";

/** nombre de suggestions du service */
let m_size = "1000";

/** nombre maximum de réponses */
let m_maximumResponses = 10;

/** 
 * liste des filtres sur les services
 * @type {Array}
 * @example
 * valeurs : ["WMTS", "TMS", "WMS", "WFS", ...]
 */
let m_filterByService = ["WMTS", "TMS"];

/** 
 * liste des couches à exclure avec ces projections 
 * @type {Array}
 * @example
 * ["EPSG:4326",...]
 */
let m_filterByProjection = [];

/** 
 * liste des couches priortaires dans la recherche
 * sous la forme : [name]
 * > mettre un poids au score des couches que l'on souhaite 
 * > mettre en avant dans la recherche
 * 
 * @type {Array}
 * @example
 * "PLAN.IGN$GEOPORTAIL:GPP:TMS" ou "PLAN.IGN:TMS" ou "PLAN.IGN"
 * 
 */
let m_filterByLayerPriority = [];

/** Prioriser les couches de type WMTS sur le service WMS */
let m_filterWMTSPriority = false;

/** 
 * filtres les services uniquement en TMS
 * @fixme en attente d'evolution du service pour determiner les "real" couches vecteurs
 * @type {Array}
 */
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
 * @example
 * {
 *   "attribution": {},
 *   "srs": [
 *     "EPSG:3857"
 *   ],
 *   "keywords": [],
 *   "extent": {
 *    "type": "Polygon",
 *     "coordinates": [
 *       [
 *        [
 *           55.9423828,
 *           -21.5354858
 *        ],
 *         [
 *           55.9423828,
 *           51.1237818
 *         ],
 *         [
 *           -63.28125,
 *           51.1237818
 *         ],
 *         [
 *           -63.28125,
 *           -21.5354858
 *         ],
 *         [
 *           55.9423828,
 *           -21.5354858
 *         ]
 *       ]
 *     ]
 *   },
 *   "metadata": [],
 *   "name": "PLAN.IGN",
 *   "title": "Plan IGN",
 *   "description": "Plan IGN personnalisable",
 *   "service": "TMS",
 *   "url": "https://data.geopf.fr/tms/1.0.0/PLAN.IGN"
 * }
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

    // INFO
    // Attribution d'un score bonus aux couches priortaires,
    // puis retriage des résultats en fonction du score
    for (let i = 0; i < results.length; i++) {
        const result = results[i];
        const found = m_filterByLayerPriority.findIndex((element) => { return element.includes(result.source.layer_name); });
        if (found >= 0) {
            results[i].score += 100;
            // console.log("found", result);
        }
    }
    results.sort((a, b) => b.score - a.score);

    var filter = null;
    if (m_filterWMTSPriority) {
        filter = inventory(results);
    }

    for (let i = 0; i < results.length; i++) {
        const result = results[i];
        var services = (m_filterByService.length === 0 || m_filterByService.includes(result.source.type));
        // FIXME 
        // utilisation le champ : result.source.open ?
        if (services) {
            if (unique().length >= m_maximumResponses) {
                break;
            }
            // INFO
            // champs possibles mais pas toujours remplis :
            // srs[], attributions{}, extent{}, metada_url[]
            var o = {
                attribution : result.source.attribution || {},
                srs : result.source.srs || [],
                keywords : result.source.keywords || [],
                extent : result.source.extent || {},
                metadata : result.source.metadata_urls || [], // mapping ?
                name : result.source.layer_name || "",
                title : result.source.title || "",
                description : result.source.description,
                service : result.source.type || "", // mapping
                url : result.source.url || "",
                tech : result.source.tech || {},
                tags : result.source.tags || {},
                theme : result.source.theme || "",
                producer : result.source.producer || ""
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
            if (filter && filter[o.name] && o.service === "WMS") {
                continue;
            }
            m_suggestions.push(o);
            // console.log("suggestion", result);
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

/**
 * Retourne la liste des suggestions sans doublons
 * @returns {Object} liste des suggestions sans doublons
 */
const unique = () => {
    return m_suggestions.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.service === value.service &&
            t.name === value.name &&
            t.title === value.title &&
            t.description === value.description
        ))
    );
    // INFO
    // soit on trie, 
    // soit on laisse le trie natif en fonction du score
    // .sort((a, b) => {
    //     // INFO
    //     // titleA (WMTS)
    //     // titleA (WMS)
    //     // titleA (WFS)
    //     // titleA (TMS)
    //     // titleB (WMTS)
    //     return a.title.localeCompare(b.title) || b.service - a.service;
    // });
};

/**
 * Clear
 */
const clear = () => {
    controller.abort();
    m_suggestions = [];
};

/** 
 * Determine si une couche est associé avec des services WMS et/ou WMTS
 * 
 * true  : WMTS only ou WMTS avec des WMS associés ou pas
 * false : WMS only
 * @param {Array} results - réponse de la recherche
 * @returns {Object} - ...
 * @example
 * {
 *   PLAN.IGN: true, // WMTS et des WMS
 *   BDTOPO:batiments: false // uniquements des WMS
 * }
 */
const inventory = (results) => {
    var inventory = {};
    for (let i = 0; i < results.length; i++) {
        const type = results[i].source.type;
        const name = results[i].source.layer_name;
        if (type === "WMTS" || type === "WMS") {
            if (inventory[name] === undefined) {
                inventory[name] = type === "WMTS";
            }
            inventory[name] ||= type === "WMTS";
        }
    }
    // console.log(inventory);
    return inventory;
};

// getter (reponse)

/**
 * Liste des suggestions (unique)
 * @returns {Array} Liste des suggestions (unique)
 */
const getSuggestions = () => {
    return unique();
};
/**
 * Liste des noms (unique)
 * @returns  {Array} Liste des noms (unique)
 */
const getNames = () => {
    return unique().map((o) => { return o.name; });
};
/**
 * Liste des titres (unique)
 * @returns {Array} Liste des titres (unique)
 */
const getTitles = () => {
    return unique().map((o) => { return o.title; });
};

// setter (conf)

/**
 * Renseigne le nom de l'indexe
 * @param {String} value - nom de l'indexe
 * @see m_index
 */
const setIndex = (value) => {
    m_index = value;
};
/**
 * Renseigne la liste des champs de recherche
 * @param {Array} value - liste des champs de recherche
 * @see m_fields
 */
const setFields = (value) => {
    m_fields = value;
};
/**
 * Renseigne le nombre de suggestions du service
 * @param {Number} value - le nombre de suggestions du service
 * @see m_size
 */
const setSize = (value) => {
    m_size = parseInt(value);
};
/**
 * Renseigne l'url du service
 * @param {String} value - url du service
 * @see m_url
 */
const setUrl = (value) => {
    m_url = eval("`" + value + "`"); // insecure !
};
/**
 * Renseigne le nombre de réponse souhaitée
 * @param {Number} value - nombre de réponse
 * @see m_maximumResponses
 */
const setMaximumResponses = (value) => {
    m_maximumResponses = parseInt(value);
};
/**
 * Filtre sur la liste des services à selectionner
 * @param {String} value - liste de service
 * @see m_filterByService
 */
const setFiltersByService = (value) => {
    m_filterByService = value === "" ? [] : value.split(",");
};
/**
 * Filtre sur les couches à exclure
 * @param {String} value - liste des projections
 * @see m_filterByProjection
 */
const setFiltersByProjection = (value) => {
    m_filterByProjection = value === "" ? [] : value.split(",");
};
/**
 * Filtre sur les couches prioritaires dans la recherche
 * @param {String} value - liste des couches prioritaires
 * @see m_filterByLayerPriority
 */
const setFiltersByLayerPriority = (value) => {
    m_filterByLayerPriority = value === "" ? [] : value.split(",");
};
/** 
 * Active ou non le filtre 'strange' 
 * @param {Boolean} value - active le filtre
 */
const setFilterWMTSPriority = (value) => {
    m_filterWMTSPriority = value;
};
/**
 * Filtre sur les "purs" couches vecteurs tuilés
 * @param {String} value - liste des couches
 * @see m_filterByTMS
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
    setFiltersByProjection,
    setFiltersByLayerPriority,
    setFilterWMTSPriority
};
