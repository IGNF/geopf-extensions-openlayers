/**
 * Typedefs partagés pour les contrôles SearchEngine.
 * Ce fichier centralise les types réutilisables afin que typedoc génère des docs cohérentes.
 */

/**
 * @typedef {Object} SearchServiceOptions
 * @property {Boolean} [autocomplete] - Active/désactive l'autocomplétion côté service.
 * @property {Object} [searchOptions] - Options passées au service de recherche.
 * @property {Object} [searchOptions.serviceOptions] - Options spécifiques au service.
 * @property {string[]} [searchOptions.serviceOptions.fields] - Liste de champs à demander au service.
 */

/**
 * @typedef {Object} SearchEngineOptions
 * @property {String} [label] - Libellé associé à l'input.
 * @property {String} [hint] - Texte d'aide / placeholder.
 * @property {SearchServiceOptions|Object} [searchService] - Configuration du service de recherche.
 */

/**
 * @typedef {Object} TextInputElement
 * @property {String} [pattern] - Pattern HTML attendu (chaîne regex).
 * @property {String} [title] - Titre / info du champ.
 * @property {String} [value] - Valeur courante du champ.
 * @property {(e:KeyboardEvent)=>void} [onkeydown] - Gestionnaire keydown.
 * @property {(type:string, listener:Function)=>void} [addEventListener] - Ajout d'écouteur.
 */

/**
 * Résultat d'une autocomplétion (voir {@link https://ignf.github.io/geoportal-access-lib/latest/jsdoc/Gp.Services.AutoComplete.SuggestedLocation.html})
 * @typedef {Object} AutocompleteResult
 * @property {"StreetAddress"|"PositionOfInterest"} type - Type de suggestion.
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
 * Résultat d'une recherche (géocodage final).
 * @typedef {Object} SearchResult
 * @property {import("ol/Feature").default} feature - Feature OL contenant la géométrie.
 * @property {import("ol/Feature").default|undefined} [extent] - Étendue si zone géographique.
 * @property {String} [infoPopup] - Texte à afficher dans un popup.
 */

/**
 * Options pour le contrôle SearchEngineBase.
 * @typedef {Object} SearchEngineBaseOptions
 * @property {HTMLElement|string} [target] - Élément DOM ou sélecteur cible.
 * @property {String} [title="Rechercher"] - Texte du titre du bouton.
 * @property {String} [label=""] - Label affiché.
 * @property {String} [hint=""] - Texte d'aide.
 * @property {Boolean} [search=false] - Comportement en tant que barre de recherche.
 * @property {String} [collapsible=false] - Si vrai, le contrôle est repliable.
 * @property {String} [ariaLabel="Rechercher"] - Libellé ARIA.
 * @property {String} [placeholder=""] - Placeholder de l'input.
 * @property {Number} [minChars=0] - Nombre minimal de caractères pour autocomplétion.
 * @property {Number} [maximumEntries=5] - Nombre maximal d'entrées affichées.
 * @property {boolean|string} [historic=true] - Gestion historique local (false|true|string).
 * @property {import("../../Services/AbstractSearchService").default} [searchService] - Service de recherche.
 */

/**
 * Options pour AbstractAdvancedSearch (formulaires avancés).
 * @typedef {Object} AbstractAdvancedSearchOptions
 * @property {String} name - Nom du formulaire de recherche avancée.
 */

/**
 * Événement de recherche générique.
 * @typedef {Object} SearchEvent
 * @property {String} type - Type d'événement (ex. "search").
 * @property {Object} [detail] - Payload détaillé.
 */

/**
 * Description d'un système de projection utilisable par le contrôle CoordinateAdvancedSearch.
 * @typedef {Object} CoordinateSearchSystem
 * @property {String} crs - Alias CRS (ex. "EPSG:4326").
 * @property {String} [label] - Libellé affiché pour le système.
 * @property {String} [type] - Type d'unités ("Geographical"|"Metric").
 */

/**
 * Options spécifiques à la recherche par coordonnées.
 * @typedef {Object} CoordinateSearchOptions
 * @property {CoordinateSearchSystem[]} [systems] - Liste de systèmes de projection personnalisés.
 * @property {string[]} [units] - Liste de codes d'unités à afficher (ex. ["DEC","DMS","M","KM"]).
 */

/**
 * Options pour le contrôle SearchEngineGeocodeIGN.
 * Étend SearchEngineBaseOptions et ajoute les options spécifiques du service IGN.
 * @typedef {SearchEngineBaseOptions & {
 *   serviceOptions?: AbstractSearchServiceOptions
 * }} SearchEngineGeocodeIGNOptions
 */


/**
 * Options pour le contrôle SearchEngineGeocodeIGN.
 * Étend SearchEngineBaseOptions et ajoute les options spécifiques du service IGN.
 * @typedef {AbstractAdvancedSearchOptions & {coordinateSearch?: CoordinateSearchOptions}} CoordinateAdvancedSearchOptions
 */

/**
 * Options pour ajouter un bouton de popup
 * @typedef {Object} PopupButton
 * @property {string} label - Attribut title du bouton.
 * @property {string} [className] - Classe(s) CSS à appliquer au bouton.
 * @property {string} [icon] - Classe d'icône à ajouter (ex: "fr-icon-delete-line").
 * @property {Object.<string, string>} [attributes] - Attributs HTML supplémentaires (clé/valeur).
 * @property {PopupButtonClickCallback} onClick - Fonction appelée au clic sur le bouton.
 */

/**
 * Callback appelé lors du clic sur un bouton personnalisé du popup.
 * @callback PopupButtonClickCallback
 * @param {Feature} feature - La feature associée au popup.
 * @this SearchEngineAdvanced
 */

/**
 * Options pour le contrôle SearchEngineAdvanced.
 * @typedef {Object} SearchEngineAdvancedOptions
 * @property {import("./AbstractAdvancedSearch").default[]} [advancedSearch] - Liste des recherches avancées à intégrer.
 * @property {PopupButton[]} [popupButtons] - Boutons personnalisés à ajouter dans le popup.
 * @property {SearchEngineGeocodeIGNOptions} [baseSearchOptions] - Options pour le moteur de recherche de base.
 * @property {HTMLElement|String} [target] - Élément DOM ou sélecteur cible.
 * @property {String} [title] - Titre du contrôle.
 * @property {String} [label] - Label affiché.
 * @property {String} [hint] - Texte d'aide.
 * @property {Boolean} [search] - Comportement en tant que barre de recherche.
 * @property {String} [ariaLabel] - Libellé ARIA.
 * @property {String} [placeholder] - Placeholder de l'input.
 * @property {Number} [minChars] - Nombre minimal de caractères pour autocomplétion.
 * @property {Number} [maximumEntries] - Nombre maximal d'entrées affichées.
 * @property {Boolean|String} [historic] - Gestion historique local (false|true|string).
 * @property {import("../../Services/AbstractSearchService").default} [searchService] - Service de recherche.
 */