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