/**
 * Sanitize une chaîne HTML avec DOMPurify.
 *
 * @param {String}  input              - Valeur brute issue de la propriété (GeoJSON / KML / GPX).
 * @param {Object}  [options]          - Options optionnelles.
 * @param {Boolean} [options.strict]   - true → texte pur (aucune balise conservée).
 *                                       false (défaut) → mise en forme sûre autorisée.
 * @param {Object}  [options.config]   - Surcharge partielle de la config DOMPurify.
 * @param {Object}  [options.purify]   - Instance DOMPurify à utiliser (utile en Node.js avec jsdom).
 *
 * @returns {String} Chaîne sanitizée, sûre pour une insertion dans le DOM.
 *
 * @example
 * // Valeur avec XSS dans une propriété GeoJSON
 * const raw = feature.properties.description;          // "<img src=x onerror=alert(1)> Paris"
 * const safe = sanitizeHtml(raw);                      // " Paris"
 *
 * // Mode strict pour un attribut title
 * const title = sanitizeHtml(feature.properties.nom, { strict: true });
 *
 */
export function sanitizeHtml(input: string, options?: {
    strict?: boolean | undefined;
    config?: any;
    purify?: any;
}): string;
//# sourceMappingURL=Sanitize.d.ts.map