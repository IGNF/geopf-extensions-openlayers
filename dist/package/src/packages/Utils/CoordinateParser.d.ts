/**
 * Résultat d'une détection de coordonnées.
 */
export type ParsedCoordinate = {
    /**
     * - Longitude en degrés décimaux (WGS84).
     */
    lon: number;
    /**
     * - Latitude en degrés décimaux (WGS84).
     */
    lat: number;
    /**
     * - Ordre des axes retenu.
     */
    order: "latlon" | "lonlat" | "cardinal";
    /**
     * - Format de saisie détecté.
     */
    format: "DD" | "DDM" | "DMS";
};
/**
 * Détecte un couple de coordonnées géographiques dans une saisie.
 *
 * @param {String} text Saisie utilisateur
 * @returns {Array<ParsedCoordinate>} Interprétations possibles, la plus probable en premier.
 *  Tableau vide si la saisie n'est pas un couple de coordonnées.
 * @example
 * parseCoordinates("48°30'08.9\"N 3°23'03.0\"E");
 * // [{ lat: 48.50247..., lon: 3.38416..., order: "cardinal", format: "DMS" }]
 */
export function parseCoordinates(text: string): Array<ParsedCoordinate>;
/**
 * Construit un libellé lisible (texte brut) pour une coordonnée détectée.
 *
 * @param {ParsedCoordinate} coordinate Coordonnée détectée
 * @param {Object} [options] Options
 * @param {Number} [options.precision=6] Nombre de décimales affichées
 * @returns {String} Libellé
 */
export function formatCoordinateLabel(coordinate: ParsedCoordinate, options?: {
    precision?: number | undefined;
}): string;
//# sourceMappingURL=CoordinateParser.d.ts.map