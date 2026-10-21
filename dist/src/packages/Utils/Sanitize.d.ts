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
/**
 * Sanitize a string extracted from an XML payload (WMS/WMTS GetCapabilities).
 * This is safer than sanitizing the whole XML because XML parsing must remain
 * intact; only the text values that are later inserted in the DOM are cleaned.
 *
 * @param {String|Number|undefined|null} input
 * @returns {String}
 */
export function sanitizeXmlText(input: string | number | undefined | null): string;
/**
 * Validate an imported link or image URL and encode it for display as HTML text.
 * Relative URLs keep the same document base as DOM href/src assignments.
 *
 * @param {String|undefined|null} input - Imported URL.
 * @returns {String|undefined|null} Validated HTTP(S) URL.
 * @throws {Error} If the URL is invalid or uses an unsupported protocol.
 */
export function sanitizeUrl(input: string | undefined | null): string | undefined | null;
/**
 * Clean static or dynamic OpenLayers attributions while preserving their shape.
 *
 * @param {String|Array<String>|Function|undefined|null} input - Source attributions.
 * @returns {String|Array<String>|Function|undefined|null} Sanitized attributions.
 */
export function sanitizeAttributions(input: string | Array<string> | Function | undefined | null): string | Array<string> | Function | undefined | null;
//# sourceMappingURL=Sanitize.d.ts.map