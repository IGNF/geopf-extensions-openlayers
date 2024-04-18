declare namespace _default {
    export { target };
    export { suggest };
    export { getSuggestions };
    export { getName };
    export { getService };
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
declare function getSuggestions(i: any): any;
declare function getName(): any;
declare function getService(): any;
//# sourceMappingURL=Search.d.ts.map