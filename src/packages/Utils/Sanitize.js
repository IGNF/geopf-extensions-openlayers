/**
 * sanitizeHtml.js
 *
 * Sanitize une chaîne de caractères HTML issue d'une propriété
 * de fichier géographique (GeoJSON, KML, GPX) via DOMPurify.
 *
 * Dépendance : dompurify >= 3.x
 *   npm install dompurify
 *
 * Usage ESM (navigateur / Vite / Vue 3) :
 *   import { sanitizeHtml } from './sanitizeHtml.js';
 *
 */

import DOMPurify from "dompurify";

// ─── Configuration par défaut ─────────────────────────────────────────────────
//
// Objectif : autoriser un sous-ensemble sûr de HTML de mise en forme
// (gras, italique, liens, listes…) tout en bloquant tout vecteur XSS.
//
// Pour un mode "texte pur" (aucune balise conservée), voir STRICT_CONFIG.
//
const DEFAULT_CONFIG = {
    // Balises HTML autorisées (mise en forme inoffensive)
    ALLOWED_TAGS : [
        "b", "strong", "i", "em", "u", "s", "br", "p",
        "ul", "ol", "li", "a", "span", "small", "sup", "sub",
    ],

    // Attributs autorisés par balise
    ALLOWED_ATTR : ["href", "title", "target", "rel"],

    // Force le wrap dans <body> → évite les injections de niveau document
    FORCE_BODY : true,

    // Bloque les data-* (exploitables via JS)
    ALLOW_DATA_ATTR : false,

    // Retourne une string (pas un nœud DOM)
    RETURN_DOM : false,
    RETURN_DOM_FRAGMENT : false,
};

// ─── Configuration stricte (texte pur, zéro balise) ──────────────────────────
//
// À utiliser si la valeur doit être insérée dans un contexte
// où aucune balise HTML n'est attendue (attribut, tooltip, title…).
//
const STRICT_CONFIG = {
    ALLOWED_TAGS : [],   // Aucune balise conservée
    ALLOWED_ATTR : [],
    KEEP_CONTENT : true, // Le texte brut est conservé, seules les balises sont supprimées
    FORCE_BODY : true,
    ALLOW_DATA_ATTR : false,
    RETURN_DOM : false,
    RETURN_DOM_FRAGMENT : false,
};

// ─── Fonction principale ──────────────────────────────────────────────────────

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
export function sanitizeHtml (input, options = {}) {
    // Valeurs non-string (number, null, undefined, boolean) → retournées telles quelles
    if (typeof input !== "string") {return input;}

    const { strict = false, config = {}, purify = DOMPurify } = options;

    const baseConfig = strict ? STRICT_CONFIG : DEFAULT_CONFIG;
    const finalConfig = { ...baseConfig, ...config };

    return purify.sanitize(input, finalConfig);
}

/**
 * Sanitize a string extracted from an XML payload (WMS/WMTS GetCapabilities).
 * This is safer than sanitizing the whole XML because XML parsing must remain
 * intact; only the text values that are later inserted in the DOM are cleaned.
 *
 * @param {String|Number|undefined|null} input
 * @returns {String}
 */
export function sanitizeXmlText (input) {
    if (input === null || input === undefined) {return "";}

    const safeString = String(input).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
    return sanitizeHtml(safeString, { strict : true });
}

/**
 * Validate an imported link or image URL and encode it for display as HTML text.
 * Relative URLs keep the same document base as DOM href/src assignments.
 *
 * @param {String|undefined|null} input - Imported URL.
 * @returns {String|undefined|null} Validated HTTP(S) URL.
 * @throws {Error} If the URL is invalid or uses an unsupported protocol.
 */
export function sanitizeUrl (input) {
    if (input === null || input === undefined || input === "") {return input;}
    if (typeof input !== "string") {
        throw new Error("L'URL importée doit être une chaîne de caractères.");
    }

    const url = new URL(input, document.baseURI);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
        throw new Error("L'URL importée doit utiliser le protocole HTTP ou HTTPS.");
    }
    return url.href;
}

/**
 * Clean static or dynamic OpenLayers attributions while preserving their shape.
 *
 * @param {String|Array<String>|Function|undefined|null} input - Source attributions.
 * @returns {String|Array<String>|Function|undefined|null} Sanitized attributions.
 */
export function sanitizeAttributions (input) {
    if (typeof input === "function") {
        return (frameState) => sanitizeAttributions(input(frameState));
    }
    if (Array.isArray(input)) {
        return input.map((attribution) => sanitizeHtml(attribution));
    }
    return sanitizeHtml(input);
}

// ─── Hook DOMPurify : sécuriser les liens ────────────────────────────────────
//
// Interdit les href commençant par javascript: ou data:
// même si DOMPurify les autorise déjà par défaut — double sécurité.
//
DOMPurify.addHook("afterSanitizeAttributes", (node) => {
    if (node.tagName === "A") {
        const href = node.getAttribute("href") || "";
        if (/^\s*(javascript|data|vbscript):/i.test(href)) {
            node.removeAttribute("href");
        }
        // Forcer rel="noopener noreferrer" sur les liens externes
        if (href.startsWith("http")) {
            node.setAttribute("target", "_blank");
            node.setAttribute("rel", "noopener noreferrer");
        }
    }
});