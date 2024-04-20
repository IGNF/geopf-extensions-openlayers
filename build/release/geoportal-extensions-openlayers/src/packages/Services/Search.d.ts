declare namespace _default {
    export { target };
    export { suggest };
    export { clear };
    export { getSuggestions };
    export { getNames };
    export { setIndex };
    export { setFields };
    export { setsize };
    export { setUrl };
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
declare function setIndex(value: any): void;
declare function setFields(value: any): void;
declare function setsize(value: any): void;
declare function setUrl(value: any): void;
//# sourceMappingURL=Search.d.ts.map