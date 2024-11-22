declare namespace _default {
    export { target };
    export { suggest };
    export { clear };
    export { getSuggestions };
    export { getNames };
    export { getTitles };
    export { setIndex };
    export { setFields };
    export { setSize };
    export { setUrl };
    export { setMaximumResponses };
    export { setFiltersByService };
    export { setFiltersByTMS };
    export { updateFilterByTMS };
    export { setFiltersByProjection };
    export { setFiltersByLayerPriority };
    export { setFilterWMTSPriority };
}
export default _default;
/**
 * Interface pour les evenements
 * @example
 * target.dispatchEvent(new CustomEvent("myEvent", { detail : {} }));
 * target.addEventListener("myEvent", handler);
 */
declare const target: EventTarget;
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
declare function suggest(text: any): Object;
/**
 * Clear
 */
declare function clear(): void;
/**
 * Liste des suggestions (unique)
 * @returns {Array} Liste des suggestions (unique)
 */
declare function getSuggestions(): any[];
/**
 * Liste des noms (unique)
 * @returns  {Array} Liste des noms (unique)
 */
declare function getNames(): any[];
/**
 * Liste des titres (unique)
 * @returns {Array} Liste des titres (unique)
 */
declare function getTitles(): any[];
/**
 * Renseigne le nom de l'indexe
 * @param {String} value - nom de l'indexe
 * @see m_index
 */
declare function setIndex(value: string): void;
/**
 * Renseigne la liste des champs de recherche
 * @param {Array} value - liste des champs de recherche
 * @see m_fields
 */
declare function setFields(value: any[]): void;
/**
 * Renseigne le nombre de suggestions du service
 * @param {Number} value - le nombre de suggestions du service
 * @see m_size
 */
declare function setSize(value: number): void;
/**
 * Renseigne l'url du service
 * @param {String} value - url du service
 * @see m_url
 */
declare function setUrl(value: string): void;
/**
 * Renseigne le nombre de réponse souhaitée
 * @param {Number} value - nombre de réponse
 * @see m_maximumResponses
 */
declare function setMaximumResponses(value: number): void;
/**
 * Filtre sur la liste des services à selectionner
 * @param {String} value - liste de service
 * @see m_filterByService
 */
declare function setFiltersByService(value: string): void;
/**
 * Filtre sur les "purs" couches vecteurs tuilés
 * @param {String} value - liste des couches
 * @see m_filterByTMS
 */
declare function setFiltersByTMS(value: string): void;
/**
 * Mise à jour de la liste des "purs" couches vecteurs tuilés
 * @param {String} value - url
 */
declare function updateFilterByTMS(value: string): Promise<any[]>;
/**
 * Filtre sur les couches à exclure
 * @param {String} value - liste des projections
 * @see m_filterByProjection
 */
declare function setFiltersByProjection(value: string): void;
/**
 * Filtre sur les couches prioritaires dans la recherche
 * @param {String} value - liste des couches prioritaires
 * @see m_filterByLayerPriority
 */
declare function setFiltersByLayerPriority(value: string): void;
/**
 * Active ou non le filtre 'strange'
 * @param {Boolean} value - active le filtre
 */
declare function setFilterWMTSPriority(value: boolean): void;
//# sourceMappingURL=Search.d.ts.map