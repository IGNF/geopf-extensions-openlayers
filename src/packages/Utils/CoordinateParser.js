/**
 * @module CoordinateParser
 * @description
 * Détection et lecture d'un couple de coordonnées géographiques (WGS84) saisi
 * sous forme de texte libre (copié depuis différents outils).
 *
 * Module volontairement autonome (aucune dépendance OpenLayers ou DOM)
 * afin d'être testable et réutilisable indépendamment des contrôles.
 *
 * Formats reconnus pour chaque valeur :
 * - degrés décimaux (DD) : `48.502496`, `+48.502496`, `-3.38`, `48.502496°`
 * - degrés et minutes décimales (DDM) : `48° 30.1497'`
 * - degrés, minutes et secondes (DMS) : `48°30'08.9"`
 * - point cardinal optionnel, avant ou après la valeur : `N`, `S`, `E`, `W` ou `O` (ouest)
 *
 * Règles principales :
 * - la saisie complète doit correspondre à un couple (aucun nombre n'est extrait d'un texte) ;
 * - les deux valeurs utilisent le même format, et soit toutes deux un point cardinal, soit aucune ;
 * - les degrés décimaux sans symbole ni point cardinal doivent comporter des décimales, sauf si les
 *   valeurs sont séparées explicitement par `,`, `;` ou `/` (`48, 2` accepté, `48 2` rejeté) ;
 * - latitude dans [-90, 90], longitude dans [-180, 180], minutes et secondes < 60 ;
 * - un signe négatif combiné à un point cardinal est rejeté ;
 * - la virgule décimale n'est acceptée que si les valeurs ne sont pas séparées par une virgule.
 */

/**
 * Résultat d'une détection de coordonnées.
 * @typedef {Object} ParsedCoordinate
 * @property {Number} lon - Longitude en degrés décimaux (WGS84).
 * @property {Number} lat - Latitude en degrés décimaux (WGS84).
 * @property {"latlon"|"lonlat"|"cardinal"} order - Ordre des axes retenu.
 * @property {"DD"|"DDM"|"DMS"} format - Format de saisie détecté.
 */

const SEPARATORS = {
    "." : /\s*[,;/]\s*|\s+/g,
    "," : /\s*[;/]\s*|\s+/g
};
const FORMATS = ["DMS", "DDM", "DD"];
// Longueurs (après normalisation) en dehors desquelles la saisie n'est pas analysée
const MIN_INPUT_LENGTH = 3;
const MAX_INPUT_LENGTH = 100;

/**
 * Normalise les caractères typographiques usuels.
 * @param {String} text Texte brut
 * @returns {String} Texte normalisé
 */
function normalize (text) {
    return text
        .replace(/[\u00A0\u2007\u2009\u200A\u202F]/g, " ")
        .replace(/[\u00BA\u02DA]/g, "°")
        .replace(/[\u2032\u2019\u2018\u00B4`]/g, "'")
        .replace(/[\u2033\u201D\u201C]/g, "\"")
        .replace(/''/g, "\"")
        .replace(/\u2212/g, "-")
        .replace(/\s+/g, " ")
        .trim()
        .toUpperCase();
}

/**
 * Construit les expressions régulières d'une valeur pour un séparateur décimal.
 * @param {String} decimal Séparateur décimal ("." ou ",")
 * @returns {Object<String, RegExp>} Expressions par format
 */
function buildPatterns (decimal) {
    const d = decimal === "." ? "\\." : ",";
    const prefix = "^(?:([NSEWO])\\s*)?([+-])?\\s*";
    const suffix = "(?:\\s*([NSEWO]))?$";
    const deg = "(\\d{1,3})";
    const fraction = `(?:${d}\\d+)?`;
    /* eslint-disable security/detect-non-literal-regexp */
    return {
        DMS : new RegExp(`${prefix}${deg}\\s*°\\s*(\\d{1,2})\\s*'\\s*(\\d{1,2}${fraction})\\s*"?${suffix}`),
        DDM : new RegExp(`${prefix}${deg}\\s*°\\s*(\\d{1,2}${fraction})\\s*'?${suffix}`),
        DD : new RegExp(`${prefix}(\\d{1,3}${fraction})\\s*(°)?${suffix}`)
    };
    /* eslint-enable security/detect-non-literal-regexp */
}

const PATTERNS = {
    "." : buildPatterns("."),
    "," : buildPatterns(",")
};

/**
 * Convertit une chaîne numérique en nombre.
 * @param {String} value Valeur
 * @param {String} decimal Séparateur décimal
 * @returns {Number} Nombre
 */
function toNumber (value, decimal) {
    return Number(decimal === "," ? value.replace(",", ".") : value);
}

/**
 * Lit une valeur unique (latitude ou longitude).
 * @param {String} text Valeur normalisée
 * @param {String} decimal Séparateur décimal
 * @returns {Object|null} Valeur lue ou null
 */
function parseValue (text, decimal) {
    const patterns = PATTERNS[decimal];
    for (const format of FORMATS) {
        const match = patterns[format].exec(text);
        if (!match) {
            continue;
        }
        const prefixCardinal = match[1];
        const sign = match[2];
        const suffixCardinal = match[match.length - 1];
        if (prefixCardinal && suffixCardinal) {
            return null;
        }
        const cardinal = prefixCardinal || suffixCardinal || null;
        if (cardinal && sign === "-") {
            return null;
        }

        let value;
        // indicateurs utiles uniquement au format DD (voir isConsistentPair)
        let hasDecimals = false;
        let hasDegreeSymbol = false;
        if (format === "DD") {
            value = toNumber(match[3], decimal);
            hasDecimals = match[3].includes(decimal);
            hasDegreeSymbol = !!match[4];
        } else {
            const degrees = Number(match[3]);
            const minutes = toNumber(match[4], decimal);
            const seconds = format === "DMS" ? toNumber(match[5], decimal) : 0;
            if (minutes >= 60 || seconds >= 60) {
                return null;
            }
            value = degrees + minutes / 60 + seconds / 3600;
        }
        if (!Number.isFinite(value)) {
            return null;
        }
        if (sign === "-") {
            value = -value;
        }
        return {
            value,
            cardinal,
            format,
            hasDecimals,
            hasDegreeSymbol
        };
    }
    return null;
}

/**
 * Indique si un couple de valeurs lues est cohérent.
 * @param {Object} first Première valeur
 * @param {Object} second Seconde valeur
 * @param {Boolean} explicitSeparator Valeurs séparées par `,`, `;` ou `/` (et non un simple espace)
 * @returns {Boolean} true si cohérent
 */
function isConsistentPair (first, second, explicitSeparator) {
    if (first.format !== second.format) {
        return false;
    }
    if (!!first.cardinal !== !!second.cardinal) {
        return false;
    }
    if (first.format === "DD") {
        if (first.hasDegreeSymbol !== second.hasDegreeSymbol) {
            return false;
        }
        if (!first.cardinal && !first.hasDegreeSymbol && !explicitSeparator && !(first.hasDecimals && second.hasDecimals)) {
            return false;
        }
    }
    return true;
}

/**
 * Indique si une latitude et une longitude sont dans les bornes WGS84.
 * @param {Number} lat Latitude
 * @param {Number} lon Longitude
 * @returns {Boolean} true si valide
 */
function inBounds (lat, lon) {
    return Math.abs(lat) <= 90 && Math.abs(lon) <= 180;
}

/**
 * Transforme un couple de valeurs en interprétations (lat/lon).
 * @param {Object} first Première valeur
 * @param {Object} second Seconde valeur
 * @returns {Array<Object>} Interprétations possibles
 */
function interpretPair (first, second) {
    const results = [];
    if (first.cardinal) {
        const isLat = (c) => c === "N" || c === "S";
        if (isLat(first.cardinal) === isLat(second.cardinal)) {
            return results;
        }
        const latValue = isLat(first.cardinal) ? first : second;
        const lonValue = isLat(first.cardinal) ? second : first;
        // valeurs positives : un signe "-" combiné à un point cardinal est rejeté par parseValue
        const lat = latValue.cardinal === "S" ? -latValue.value : latValue.value;
        const lon = (lonValue.cardinal === "W" || lonValue.cardinal === "O") ? -lonValue.value : lonValue.value;
        if (inBounds(lat, lon)) {
            results.push({ lat, lon, order : "cardinal" });
        }
        return results;
    }
    if (inBounds(first.value, second.value)) {
        results.push({ lat : first.value, lon : second.value, order : "latlon" });
    }
    if (first.value !== second.value && inBounds(second.value, first.value)) {
        results.push({ lat : second.value, lon : first.value, order : "lonlat" });
    }
    return results;
}

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
function parseCoordinates (text) {
    if (typeof text !== "string") {
        return [];
    }
    const normalized = normalize(text);
    if (normalized.length < MIN_INPUT_LENGTH || normalized.length > MAX_INPUT_LENGTH) {
        return [];
    }

    const pairs = [];
    for (const decimal of [".", ","]) {
        if (decimal === "," && normalized.includes(".")) {
            continue;
        }
        const separator = SEPARATORS[decimal];
        separator.lastIndex = 0;
        let match;
        while ((match = separator.exec(normalized)) !== null) {
            const left = normalized.slice(0, match.index);
            const right = normalized.slice(match.index + match[0].length);
            if (!left || !right) {
                continue;
            }
            const first = parseValue(left, decimal);
            const second = first ? parseValue(right, decimal) : null;
            if (first && second && isConsistentPair(first, second, match[0].trim() !== "")) {
                pairs.push([first, second]);
            }
        }
    }

    // Plusieurs découpages différents => saisie ambiguë
    const distinct = new Set(pairs.map(([a, b]) => `${a.value}|${a.cardinal}|${b.value}|${b.cardinal}`));
    if (distinct.size !== 1) {
        return [];
    }

    const [first, second] = pairs[0];
    return interpretPair(first, second).map((result) => ({
        ...result,
        format : first.format
    }));
}

/**
 * Formate une valeur en degrés décimaux pour l'affichage.
 * @param {Number} value Valeur
 * @param {Number} precision Nombre de décimales
 * @returns {String} Valeur formatée
 */
function formatDegrees (value, precision) {
    return `${Number(value.toFixed(precision))}°`;
}

/**
 * Construit un libellé lisible (texte brut) pour une coordonnée détectée.
 *
 * @param {ParsedCoordinate} coordinate Coordonnée détectée
 * @param {Object} [options] Options
 * @param {Number} [options.precision=6] Nombre de décimales affichées
 * @returns {String} Libellé
 */
function formatCoordinateLabel (coordinate, options) {
    const precision = options && typeof options.precision === "number" ? options.precision : 6;
    const label = `Latitude ${formatDegrees(coordinate.lat, precision)}, Longitude ${formatDegrees(coordinate.lon, precision)}`;
    return coordinate.order === "lonlat" ? `${label}` : label;
}

export {
    parseCoordinates,
    formatCoordinateLabel
};
