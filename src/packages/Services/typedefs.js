/**
 * Typedefs partagés pour les Services SearchService.
 * Ce fichier centralise les types réutilisables afin que typedoc génère des docs cohérentes.
 */

/**
 * Options de construction d'un service de recherche.
 * @typedef {Object} AbstractSearchServiceOptions
 * @property {String} [apiKey] - Clé API pour les services IGN.
 * @property {Boolean} [ssl=true] - Forcer HTTPS.
 * @property {AutocompleteOptions} [autocompleteOptions] - Options de l'autocomplétion.
 * @property {SearchOptions} [searchOptions] - Options de la recherche finale.
 * @property {GeocodeOptions} [geocodeOptions] - Options de géocodage.
 * @property {Boolean} [autocomplete=true]
 * @property {String} [index="address,poi"]
 * @property {Number} [limit=1]
 * @property {Boolean} [returnTrueGeometry=false]
 * @property {Boolean|CoordinateDetectionOptions} [coordinateDetection=false] - Détection locale d'un couple de coordonnées (IGNSearchService).
 * Désactivée par défaut (option absente ou `false`). `true` ou `{}` l'activent avec un zoom de 15.
 * Voir {@link CoordinateDetectionOptions} pour les valeurs possibles.
 */

/**
 * Options de détection locale d'un couple de coordonnées saisi dans la recherche simple.
 * Lorsqu'un couple est reconnu (ex. "48.502496, 3.384179", "48° 30.1497' N, 3° 23.0507' E",
 * "48°30'08.9\"N 3°23'03.0\"E", "48, 2"), il est proposé en suggestion et aucune requête
 * d'autocomplétion / de géocodage Géoplateforme n'est envoyée (les requêtes en cours sont ignorées).
 * Les deux interprétations latitude/longitude puis longitude/latitude sont proposées si elles sont valides.
 * Les coordonnées ne sont pas enregistrées dans l'historique.
 * Les valeurs entières sans symbole ni point cardinal ne sont reconnues qu'avec un séparateur `,`, `;` ou `/` ("48, 2" oui, "48 2" non).
 * La saisie est réanalysée à chaque modification du contenu (frappe, effacement, coller...).
 *
 * Valeurs possibles de l'option `coordinateDetection` :
 * - non renseignée, `null` ou `false` (défaut) : détection désactivée ;
 * - `true` : détection activée, zoom par défaut (15) ;
 * - `{}` : équivaut à `true` (détection activée, zoom par défaut 15) ;
 * - `{ zoom : 12 }` : détection activée, la carte est centrée sur les coordonnées au zoom 12 ;
 * - `{ zoom : (e) => ... }` : détection activée, le zoom est calculé par la fonction à chaque recherche ;
 * - `{ active : false, ... }` : détection désactivée (les autres propriétés sont ignorées).
 *
 * @example
 * coordinateDetection : true                 // activée, zoom 15
 * coordinateDetection : {}                   // activée, zoom 15
 * coordinateDetection : { zoom : 18 }        // activée, zoom 18
 * coordinateDetection : { zoom : (e) => 12 } // activée, zoom calculé
 * coordinateDetection : { active : false }   // désactivée
 *
 * @typedef {Object} CoordinateDetectionOptions
 * @property {Boolean} [active=true] - Active la détection. Seul `false` la désactive explicitement.
 * @property {Number|Function} [zoom=15] - Niveau de zoom sur lequel la carte se centre lorsqu'on sélectionne
 * des coordonnées détectées. Peut être un nombre, ou une fonction recevant l'événement "search"
 * et retournant un niveau de zoom. Si la propriété est absente ou n'est ni un nombre ni une fonction,
 * la valeur par défaut (15) est utilisée.
 */

/**
 * Options pour l'autocomplétion.
 * @typedef {Object} AutocompleteOptions
 * @property {Object} [serviceOptions] - Options passées à Gp.Services.autoComplete
 * @property {Number} [maximumResponses] - Nombre maximal de réponses retournées
 * @property {Boolean} [triggerGeocode=false] - Si vrai, déclenche une requête de géocodage lorsque l'autocomplétion échoue
 * @property {Number} [triggerDelay=1000] - Délai (ms) avant déclenchement du géocodage automatique
 * @property {Boolean} [prettifyResults=false] - Si vrai, embellit/filtre les résultats
 */


/**
 * Résultat d'une autocomplétion (voir {@link https://ignf.github.io/geoportal-access-lib/latest/jsdoc/Gp.Services.AutoComplete.SuggestedLocation.html})
 * @typedef {Object} AutocompleteResult
 * @property {"StreetAddress"|"PositionOfInterest"|"Coordinates"} type - Type de suggestion ("Coordinates" : couple de coordonnées détecté localement, voir {@link CoordinateDetectionOptions}).
 * @property {Position} position - Coordonnées du point, dans le système de coordonnées spécifiées.
 * @property {String} commune - Nom de la commune.
 * @property {String} fullText - Texte complet représentant la suggestion.
 * @property {String} postalCode - Code postal de la suggestion.
 * @property {Number} classification - Nombre utilisé pour classigier l'importance de l'endroit suggéré de 1 (plus important) à 7 (moins important)
 * @property {Array<String>} [poiType] - Types POI détaillés.
 * @property {String} [street] - Nom de la rue (types "StreetAddress" seulement).
 * @property {String} [kind] - Nature du point d'intérêt, e.g. "prefecture", "municipality"... (types "PositionOfInterest" seulement).
 */


/**
 * Objet envoyé pour le géocodage
 * @typedef {Object} IGNSearchObject
 * @property {AutocompleteResult|String} location - Objet utilisé pour faire la requête.
 * Peut être soit le résultat de l'autocomplétion ou une chaîne de caractère.
 * @property {IGNSearchFilter} [filters] - Filtres optionnels pour la recherche
 */

/**
 * Filtres optionnels pour le géocodage.
 * Les filtres dépendent du type de recherche : adresses, toponymes ou parcelles cadastrales
 * @typedef {Object} IGNSearchFilter
 * @property {string} [postalCode] - Code postal (adresses, toponymes).
 * @property {string} [inseeCode] - Code INSEE (adresses, toponymes).
 * @property {string} [city] - Nom de la ville (adresses, toponymes).
 * @property {string} [type] - Type de toponyme (toponymes uniquement).
 * @property {string} [codeDepartement] - Code département (parcelles cadastrales uniquement).
 * @property {string} [codeCommune] - Code commune (parcelles cadastrales uniquement).
 * @property {string} [nomCommune] - Nom de la commune (parcelles cadastrales uniquement).
 * @property {string} [codeCommuneAbs] - Code commune abs (parcelles cadastrales uniquement).
 * @property {string} [codeArrondissement] - Code arrondissement (parcelles cadastrales uniquement).
 * @property {string} [section] - Section cadastrale (parcelles cadastrales uniquement).
 * @property {string} [numero] - Numéro de parcelle (parcelles cadastrales uniquement).
 * @property {string} [feuille] - Feuille cadastrale (parcelles cadastrales uniquement).
 */



/**
 * Position dans un système de coordonnées.
 * @typedef {Object} Position
 * @property {Number} x - Longitude.
 * @property {Number} y - Latitude.
 */


/**
 * Erreur du service (voir {@link https://ignf.github.io/geoportal-access-lib/latest/jsdoc/Gp.Error.html})
 * @typedef {Object} ErrorService
 * @property {string} message - Message d'erreur retourné par le service.
 * @property {number} status - Code de statut (-1 si inconnu).
 * @property {string} type - Type d'erreur (ex. "UNKNOWN_ERROR").
 * @property {string} name - Nom de l'erreur (ex. "ErrorService").
 * @property {string} [stack] - Stack trace de l'erreur, si disponible.
 */

/**
 * Options pour la recherche finale (géocodage).
 * @typedef {Object} SearchOptions
 * @property {Object} [serviceOptions] - Options passées à Gp.Services.geocode.
 * @property {Number} [maximumResponses] - Nombre maximal de réponses.
 * @property {Boolean} [filterLayers] - Active le filtrage des résultats par couche.
 * @property {String|Array<String>} [index] - Indexs utilisés (ex. "address,poi").
 * @property {Number} [limit] - Limite de résultats.
 */

/**
 * Options pour le géocodage manuel.
 * @typedef {Object} GeocodeOptions
 * @property {Object} [serviceOptions] - Options passées à Gp.Services.geocode.
 * @property {String} [location] - Texte à géocoder.
 * @property {Function} [onSuccess] - Callback en cas de succès.
 * @property {Function} [onFailure] - Callback en cas d'échec.
 */

/**
 * Résultat d'une recherche (géocodage final).
 * @typedef {Object} SearchResult
 * @property {import("ol/Feature").default} feature - Feature OL contenant la géométrie.
 * @property {import("ol/Feature").default|undefined} [extent] - Étendue si zone géographique.
 * @property {String} [infoPopup] - Texte à afficher dans un popup.
 */

