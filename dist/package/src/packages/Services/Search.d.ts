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
 */
declare function suggest(text: any): Object;
declare function clear(): void;
declare function getSuggestions(): any[];
declare function getNames(): any[];
declare function getTitles(): any[];
declare function setIndex(value: any): void;
declare function setFields(value: any): void;
declare function setSize(value: any): void;
declare function setUrl(value: any): void;
declare function setMaximumResponses(value: any): void;
/**
 * Filtre sur la liste des services à selectionner
 * @param {Array} value - liste de service
 */
declare function setFiltersByService(value: any[]): void;
/**
 * Filtre sur les "purs" couches vecteurs tuilés
 * @param {Array} value - liste des couches
 */
declare function setFiltersByTMS(value: any[]): void;
/**
 * Mise à jour de la liste des "purs" couches vecteurs tuilés
 * @param {String} value - url
 */
declare function updateFilterByTMS(value: string): Promise<string[]>;
/**
 * Filtre sur les couches à exclure
 * @param {Array} value - liste des projections
 */
declare function setFiltersByProjection(value: any[]): void;
//# sourceMappingURL=Search.d.ts.map