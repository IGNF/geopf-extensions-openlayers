// import CSS
import "../../CSS/Controls/SearchEngine/GPFsearchEngine.css";
import GeoJSON from "ol/format/GeoJSON";
import Logger from "../../Utils/LoggerByDefault";
// import geoportal library access
import Gp from "geoportal-access-lib";
// import local
import Utils from "../../Utils/Helper";
import GeocodeUtils from "../../Utils/GeocodeUtils";
// Service
import Search from "../../Services/Search";
import Feature from "ol/Feature.js";
import BaseObject from "ol/Object";
import Point from "ol/geom/Point.js";

var logger = Logger.getLogger("searchengine");
/**
 * Options de construction d'un service
 * @typedef {Object} AbstractSearchServiceOptions
 * @property {String} [apiKey] - Clé API utilisée pour les requêtes vers les services IGN
 * @property {Boolean} [ssl=true] - Force l'utilisation du protocole HTTPS si défini à true
 * @property {AutocompleteOptions} [autocompleteOptions] - Options spécifiques à l'autocomplétion
 * @property {SearchOptions} [searchOptions] - Options spécifiques à la recherche finale
 * @property {GeocodeOptions} [geocodeOptions] - Options spécifiques au géocodage
 */

/**
 * Options pour l'autocomplétion
 * @typedef {Object} AutocompleteOptions
 * @property {Object} [serviceOptions] - Options passées à Gp.Services.autoComplete
 * @property {Number} [maximumResponses] - Nombre maximal de réponses retournées
 * @property {Boolean} [triggerGeocode=false] - Si vrai, déclenche une requête de géocodage lorsque l'autocomplétion échoue
 * @property {Number} [triggerDelay=1000] - Délai (ms) avant déclenchement du géocodage automatique
 * @property {Boolean} [prettifyResults=false] - Si vrai, embellit/filtre les résultats
 */

/**
 * Options pour la recherche finale (géocodage)
 * @typedef {Object} SearchOptions
 * @property {Object} [serviceOptions] - Options passées à Gp.Services.geocode
 * @property {Number} [maximumResponses] - Nombre maximal de réponses
 * @property {Boolean} [filterLayers] - Active le filtrage des résultats par couche
 * @property {String|Array<String>} [index] - Indexs utilisés (e.g. "address,poi")
 * @property {Number} [limit] - Limite de résultats
 */

/**
 * Options pour le géocodage (appel manuel de coordonnées via texte)
 * @typedef {Object} GeocodeOptions
 * @property {Object} [serviceOptions] - Options passées à Gp.Services.geocode
 * @property {String} [location] - Texte à géocoder
 * @property {Function} [onSuccess] - Callback exécuté en cas de succès
 * @property {Function} [onFailure] - Callback exécuté en cas d'échec
 */

/**
 * Résultat d'une autocomplétion
 * @typedef {Object} AutocompleteResult
 * @property {String} fullText - Libellé affichable du lieu
 * @property {Object} position - Coordonnées
 * @property {Number} position.x - Longitude
 * @property {Number} position.y - Latitude
 * @property {String} [type] - Type de résultat (e.g. "StreetAddress", "PositionOfInterest")
 * @property {Array<String>} [poiType] - Types détaillés (e.g. ["administratif","région"])
 */

/**
 * Résultat d'une recherche (géocodage final)
 * @typedef {Object} SearchResult
 * @property {import("ol/Feature").default} feature - Feature OL contenant la géométrie
 * @property {import("ol/Feature").default|undefined} [extent] - Étendue si zone géographique
 * @property {String} [infoPopup] - Texte à afficher dans un popup
 */


/**
 * @classdesc
 * AbstractSearchService control
 *
 * @alias ol.control.AbstractSearchService
 * @abstract
 * @module SearchService
*/
class AbstractSearchService extends BaseObject {

    /**
     * @constructor
     * @param {AbstractSearchServiceOptions} options 
     */
    constructor (options) {
        options = options || {};

        // call ol.control.Control constructor
        super(options);

        if ((this.constructor == AbstractSearchService)) {
            throw new TypeError("AbstractSearchService cannot be instantiate");
        }
        /**
         * Nom de la classe (heritage)
         * @private
         */
        this.CLASSNAME = "AbstractSearchService";

        // initialisation du composant
        this.initialize(options);

        return this;
    }

    /**=
     * @param {AbstractSearchServiceOptions} options 
     */
    initialize (options) {
        this.AUTOCOMPLETE_EVENT = "autocomplete";
        this.SEARCH_EVENT = "search";

        this._autocompleteLocations = [];
        this._locations = [];
    }

    /**
     * Récupère le résultat d'une recherche d'autocomplétion.
     * @param {Number} [index] Optionnel. Index du résultat. Si nul, renvoie tous les résultats
     * @returns {Array|AutocompleteResult}
     */
    getAutocompleteLocations (index) {
        if (index === undefined) {
            return this._autocompleteLocations;
        } else {
            return this._autocompleteLocations[index];
        }
    }

    /**
     * Récupère le résultat d'une recherche de kieu (recherche finale).
     * @param {Number} [index] Optionnel. Index du résultat. Si nul, renvoie tous les résultats
     * @returns {Array|SearchResult}
     */
    getResult (index) {
        if (index === undefined) {
            return this._locations;
        } else {
            return this._locations[index];
        }
    }


    /**
     * @param {AutocompleteOptions} obj 
     * @abstract
     */
    autocomplete (obj) { }


    /**
     * @param {SearchOptions} obj 
     * @abstract
     */
    search (obj) { }


    /**
     * @param {SearchOptions} obj 
     * @abstract
     */
    getItemTitle (obj) { 
        return obj;
    }

}


/**
 * @classdesc
 * DefaultSearchService control
 *
 * @alias ol.control.DefaultSearchService
 * @module SearchService
*/
class DefaultSearchService extends AbstractSearchService {

    constructor (options) {
        super();
        options = options || {};
        if (options.searchTab) {
            this._searchTab = options.searchTab || [];
        };
    }

    /** Autocomplete function
     * Dispatchs "searchstart" event when search starts
     * Dispatchs "search" event when search is finished
     * @param {String} search 
     * @param {Object} [options] 
     * @param {String} options.force force search even if search string is less than minChars / enter is pressed
     * @api
     */
    autocomplete (value) {
        // Simulate asynchronous behavior
        this._autocompleteLocations = [];
        const rex = new RegExp(value, "i");
        (this._searchTab || []).forEach((city) => {
            if (rex.test(city.toLowerCase())) {
                this._autocompleteLocations.push(city);
            }
        });
        // When search is finished
        this.dispatchEvent({ 
            type : this.AUTOCOMPLETE_EVENT,
            result : this._autocompleteLocations
        });
    }

    /**
     * @param {SearchOptions} obj 
     */
    search (obj) {
        this.dispatchEvent({ 
            type : this.SEARCH_EVENT, 
            result : obj
        });
    }

}


/**
 * @classdesc
 * IGNSearchService control
 *
 * @alias ol.control.IGNSearchService
 * @module SearchService
*/
class IGNSearchService extends AbstractSearchService {

    /**
     * @constructor
     * @param {AbstractSearchServiceOptions} options 
     */
    constructor (options) {
        options = options || {};

        // call ol.control.Control constructor
        super(options);

        if (!(this instanceof IGNSearchService)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }
        /**
         * Nom de la classe (heritage)
         * @private
         */
        this.CLASSNAME = "IGNSearchService";

        return this;
    }

    initialize (options) {
        super.initialize(options);

        // define default options
        this.options = {
            searchOptions : {
                maximumEntries : 5,
                serviceOptions : {
                    maximumResponses : 10,
                },
                filterLayers : true
            },
            geocodeOptions : {
                serviceOptions : {}
            },
            autocompleteOptions : {
                serviceOptions : {
                    maximumResponses : 5,
                },
                triggerGeocode : false,
                triggerDelay : 1000,
                prettifyResults : false
            },
        };

        Utils.mergeParams(this.options, options);

        // configuration avec gestion des options surchargées du service
        if (this.options.searchOptions) {
            if (this.options.searchOptions.serviceOptions) {
                if (this.options.searchOptions.serviceOptions.url) {
                    Search.setUrl(this.options.searchOptions.serviceOptions.url);
                }
                if (this.options.searchOptions.serviceOptions.fields) {
                    Search.setFields(this.options.searchOptions.serviceOptions.fields);
                }
                if (this.options.searchOptions.serviceOptions.index) {
                    Search.setIndex(this.options.searchOptions.serviceOptions.index);
                }
                if (this.options.searchOptions.serviceOptions.size) {
                    Search.setSize(this.options.searchOptions.serviceOptions.size);
                }
                if (this.options.searchOptions.serviceOptions.maximumResponses) {
                    Search.setMaximumResponses(this.options.searchOptions.serviceOptions.maximumResponses);
                }
            }
            if (this.options.searchOptions.filterServices) {
                Search.setFiltersByService(this.options.searchOptions.filterServices);
            }
            if (this.options.searchOptions.filterLayersPriority) {
                Search.setFiltersByLayerPriority(this.options.searchOptions.filterLayersPriority);
            }
            if (this.options.searchOptions.filterWMTSPriority) {
                Search.setFilterWMTSPriority(this.options.searchOptions.filterWMTSPriority);
            }
            if (this.options.searchOptions.filterTMS === false) {
                Search.setFilterTMS(this.options.searchOptions.filterTMS);
            }
            if (this.options.searchOptions.filterProjections) {
                Search.setFiltersByProjection(this.options.searchOptions.filterProjections);
            }
        }
        // abonnement au service
        Search.target.addEventListener("suggest", (e) => {
            logger.debug(e);
            let suggestResults = e.detail;
            // filtre des suggestions selon la configuration ou l'option filterLayersList
            suggestResults = this._filterResultsFromConfigLayers(suggestResults);

            this._fillSearchedSuggestListContainer(suggestResults);
        });

        this._currentGeocodingLocation = null;
        this._suggestedLocations = [];
    }


    /**
     * @param {AutocompleteOptions} obj 
     * @param {String} obj.value Valeur de l'autocomplete
     * @abstract
     */
    autocomplete (value, obj) { 
        if (!value) {
            return;
        }

        // on sauvegarde le localisant
        this._currentGeocodingLocation = value;

        // // on limite les requêtes à partir de 3 car. saisie !
        // if (value.length < 3) {
        //     this._clearResults();
        //     return;
        // }

        // INFORMATION
        // on effectue la requête au service d'autocompletion.
        // on met en place des callbacks afin de recuperer les resultats ou
        // les messages d'erreurs du service.
        // les resultats sont affichés dans une liste deroulante.
        this._requestAutoComplete({
            text : value,
            // callback onSuccess
            onSuccess : this._onSuccessAutoComplete.bind(this),
            // callback onFailure
            onFailure : this._onFailureAutoComplete.bind(this)
        });
    }

    getItemTitle (obj) {
        return obj.fullText;
    }

    /**
     * Éxécute une requête au service.
     *
     * @param {Object} settings - service settings
     * @param {String} settings.text - text
     * @param {Function} settings.onSuccess - callback
     * @param {Function} settings.onFailure - callback
     * @private
     */
    _requestAutoComplete (settings) {
        // on ne fait pas de requête si on n'a pas renseigné de parametres !
        if (!settings || (typeof settings === "object" && Object.keys(settings).length === 0)) {
            return;
        }

        // on ne fait pas de requête si la parametre 'text' est vide !
        if (!settings.text) {
            return;
        }

        logger.log(settings);

        let options = {};
        // on recupere les options du service
        Utils.assign(options, this.options.autocompleteOptions.serviceOptions);
        // ainsi que la recherche et les callbacks
        Utils.assign(options, settings);

        // cas où la clef API n'est pas renseignée dans les options du service,
        // on utilise celle renseignée au niveau du controle ou la clé "calcul" par défaut.
        options.apiKey = options.apiKey || this.options.apiKey;

        // si l'utilisateur a spécifié le paramètre ssl au niveau du control, on s'en sert
        // true par défaut (https)
        if (typeof options.ssl !== "boolean") {
            if (typeof this.options.ssl === "boolean") {
                options.ssl = this.options.ssl;
            } else {
                options.ssl = true;
            }
        }
        logger.log(options);

        Gp.Services.autoComplete(options);
    }

    _onSuccessAutoComplete (results) {
        console.log("_onSuccessAutoComplete");
        let _maximumEntries = this.options.autocompleteOptions.maximumEntries;
        let _prettifyResults = this.options.autocompleteOptions.prettifyResults;

        logger.log("request from AutoComplete", results);
        if (results) {
            // on sauvegarde l'etat des résultats
            this._suggestedLocations = results.suggestedLocations;
            this._autocompleteLocations = [];
            // on vérifie qu'on n'a pas récupéré des coordonnées nulles (par ex recherche par code postal)
            for (let i = 0; i < this._suggestedLocations.length; i++) {
                let ilocation = this._suggestedLocations[i];
                if (ilocation.position && ilocation.position.x === 0 && ilocation.position.y === 0 && ilocation.fullText) {
                    // si les coordonnées sont nulles, il faut relancer une requête de géocodage avec l'attribut "fullText" récupéré
                    this._getGeocodeCoordinatesFromFullText(ilocation, i);
                } else {
                    // sinon on peut afficher normalement le résultat dans la liste
                    this._autocompleteLocations.push(ilocation);
                }
            };
            // on filtre et enjolive éventuellement les résultats
            if (_prettifyResults === true) {
                this._prettifyAutocompleteResults(this._autocompleteLocations);
            }
            // on ne garde que le nombre de résultats que l'on veut afficher
            if (_maximumEntries) {
                this._autocompleteLocations = this._autocompleteLocations.slice(0, _maximumEntries);
            }

            // on annule eventuellement une requete de geocodage en cours car on obtient des
            // de nouveau des resultats d'autocompletion...
            if (this._triggerHandler) {
                clearTimeout(this._triggerHandler);
                this._triggerHandler = null;
                logger.warn("Cancel a geocode request !");
            }
            this.dispatchEvent({
                type : this.AUTOCOMPLETE_EVENT,
                result : this._autocompleteLocations,
            });
        }
    }

    _onFailureAutoComplete (error) {
        console.log("_onFailureAutoComplete");
        let _triggerGeocode = this.options.autocompleteOptions.triggerGeocode;
        let _triggerDelay = this.options.autocompleteOptions.triggerDelay;

        let onSuccess = function (results) {
            logger.log("request from Geocoding", results);
            if (results) {
                this._clearResults();
                // on modifie la structure des reponses pour être
                // compatible avec l'autocompletion !
                let locations = results.locations;
                for (let i = 0; i < locations.length; i++) {
                    let location = locations[i];
                    location.fullText = GeocodeUtils.getGeocodedLocationFreeform(location);
                    location.position = {
                        x : location.position.lon,
                        y : location.position.lat
                    };
                    this._autocompleteLocations.push(location);
                }
            }
            this.dispatchEvent({
                type : this.AUTOCOMPLETE_EVENT,
                result : this._autocompleteLocations,
            });
        };

        // FIXME
        // où affiche t on les messages : ex. 'No suggestion matching the search' ?
        this._clearResults();
        logger.log(error.message);
        // on envoie une requete de geocodage si aucun resultat d'autocompletion
        // n'a été trouvé ! Et on n'oublie pas d'annuler celle qui est en cours !
        if (error.message === "No suggestion matching the search" && _triggerGeocode /* && value.length === 5 */) {
            if (this._triggerHandler) {
                clearTimeout(this._triggerHandler);
                logger.warn("Cancel the last geocode request !");
            }
            this._triggerHandler = setTimeout(
                function () {
                    logger.warn("Launch a geocode request !");
                    this._requestGeocoding({
                        location : value,
                        // callback onSuccess
                        onSuccess : onSuccess.bind(this),
                        // callback onFailure
                        onFailure : function (error) {
                            logger.log(error.message);
                        }
                    });
                }, _triggerDelay
            );
        }
    }

    /**
     * this method is called by this.onAutoCompleteSearchText()
     * and it clears suggested location from duplicate entries and improve unprecise fulltext entries.
     *
     * @param {Array} autocompleteResults - Array of autocompleteResults to display
     * @private
     */
    _prettifyAutocompleteResults (autocompleteResults) {
        for (var i = autocompleteResults.length - 1; i >= 0; i--) {
            var autocompleteResult = autocompleteResults[i];
            if ((autocompleteResult.type === "StreetAddress" && autocompleteResult.kind === "municipality") ||
            autocompleteResult.type === "PositionOfInterest" && autocompleteResult.poiType[0] === "lieu-dit habité" && autocompleteResult.poiType[1] === "zone d'habitation") {
                // on retire les éléments streetAdress - municipality car déjà pris en compte par POI
                autocompleteResults.splice(i, 1);
            }
            // on précise le type dans le fulltext au POI des types département et région
            if ((autocompleteResult.type === "PositionOfInterest" && autocompleteResult.poiType[0] === "administratif" &&
                (autocompleteResult.poiType[1] === "département" || autocompleteResult.poiType[1] === "région"))) {
                autocompleteResult.fullText = autocompleteResult.fullText + ", " + autocompleteResult.poiType[1];
            }
        };
    }


    /**
     * this method is called by Gp.Services.autoComplete callback in case of success
     * (cf. this.onAutoCompleteSearchText), for suggested locations with null coordinates
     * (case of postalCode research for instance).
     * Send a geocode request with suggested location 'fullText' attribute, to get its coordinates and display it in autocomplete results list container.
     *
     * @param {Gp.Services.AutoCompleteResponse.SuggestedLocation} suggestedLocation - autocompletion result (with null coordinates) to be geocoded
     * @param {Number} i - suggestedLocation position in Gp.Services.AutoCompleteResponse.suggestedLocations autocomplete results list
     * @private
     */
    _getGeocodeCoordinatesFromFullText (suggestedLocation, i) {
        var context = this;
        Gp.Services.geocode({
            apiKey : this.options.apiKey,
            ssl : this.options.ssl,
            q : GeocodeUtils.getSuggestedLocationFreeform(suggestedLocation),
            index : suggestedLocation.type,
            // callback onSuccess
            onSuccess : function (response) {
                logger.log("request from Geocoding (coordinates null)", response);
                if (response.locations && response.locations.length !== 0 && response.locations[0].position) {
                    // on modifie les coordonnées du résultat en EPSG:4326 donc lat,lon
                    /// \TODO verifier si l'inversion des coordonnees est necessaire
                    if (context._suggestedLocations && context._suggestedLocations[i]) {
                        context._suggestedLocations[i].position = {
                            lon : response.locations[0].position.y,
                            lat : response.locations[0].position.x
                        };
                        // et on l'affiche dans la liste
                        context._locationsToBeDisplayed.unshift(context._suggestedLocations[i]);
                        context._fillAutoCompletedLocationListContainer(context._locationsToBeDisplayed);
                    }
                }
            },
            // callback onFailure
            onFailure : function () {
                // si on n'a pas réussi à récupérer les coordonnées, on affiche quand même le résultat
                if (context._suggestedLocations && context._suggestedLocations[i]) {
                    context._createAutoCompletedLocationElement(context._suggestedLocations[i], i);
                }
            }
        });
    }

    _clearResults () {
        this._autocompleteLocations = [];
        this._locations = [];
    }
  


    /**
     * this method is called by event 'click' on 'GPautoCompleteResultsList' tag div
     * (cf. this._createAutoCompleteListElement), and it selects the location.
     * this location displays a marker on the map.
     * @param {Object} location Objet de la recherche
     * @abstract
     */
    search (location) {
        // TODO on souhaite un comportement different pour la selection des reponses
        // de l'autocompletion :
        // - liste deroulante des reponses,
        // - puis possibilité de cliquer sur une suggestion
        // - mais aussi de la choisir avec le clavier (arrow up/down), puis valider
        // par un return
        // cette selection avec les fleches doit mettre à jour le input !
        // (comme un moteur de recherche de navigateur)

        // var idx = SelectorID.index(e.target.id);

        if (location === undefined) {
            return;
        }

        // on ajoute le texte de l'autocomplétion dans l'input
        let label = GeocodeUtils.getSuggestedLocationFreeform(location);

        // on sauvegarde le localisant
        this._currentGeocodingLocation = label;

        // on centre la vue et positionne le marker, à la position reprojetée dans la projection de la carte
        this._requestGeocoding({
            index : "address,poi",
            limit : 1,
            returnTrueGeometry : true,
            location : label,
            onSuccess : this._onSuccessSearch.bind(this),
            onFailure : this._onFailureSearch.bind(this, location),
        });
    }


    /**
     * this method is called by this.onAutoCompleteSearch()
     * and executes a request to the service.
     *
     * @param {Object} settings - service settings
     * @param {String} settings.location - text
     * @param {Function} settings.onSuccess - callback
     * @param {Function} settings.onFailure - callback
     * @private
     */
    _requestGeocoding (settings) {
        // on ne fait pas de requête si on n'a pas renseigné de parametres !
        if (!settings || (typeof settings === "object" && Object.keys(settings).length === 0)) {
            return;
        }

        logger.log(settings);

        var options = {};
        // on recupere les options du service
        Utils.assign(options, this.options.geocodeOptions.serviceOptions);
        // ainsi que la recherche et les callbacks
        Utils.assign(options, settings);
        // on redefinie les callbacks si les callbacks de service existent
        var bOnSuccess = !!(this.options.geocodeOptions.serviceOptions.onSuccess !== null && typeof this.options.geocodeOptions.serviceOptions.onSuccess === "function");
        if (bOnSuccess) {
            console.log("bonsuccess");
            var cbOnSuccess = function (e) {
                settings.onSuccess.bind(this, e);
                this.options.geocodeOptions.serviceOptions.onSuccess.bind(this, e);
            };
            options.onSuccess = cbOnSuccess.bind(this);
        }

        var bOnFailure = !!(this.options.geocodeOptions.serviceOptions.onFailure !== null && typeof this.options.geocodeOptions.serviceOptions.onFailure === "function");
        if (bOnFailure) {
            console.log("bonFailrure");
            var cbOnFailure = function (e) {
                settings.onFailure.bind(this, e);
                this.options.geocodeOptions.serviceOptions.onFailure.bind(this, e);
            };
            options.onFailure = cbOnFailure.bind(this);
        }

        // cas où la clef API n'est pas renseignée dans les options du service,
        // on utilise celle renseignée au niveau du controle ou la clé "calcul" par défaut
        options.apiKey = options.apiKey || this.options.apiKey;

        // si l'utilisateur a spécifié le paramètre ssl au niveau du control, on s'en sert
        // true par défaut (https)
        if (typeof options.ssl !== "boolean") {
            if (typeof this.options.ssl === "boolean") {
                options.ssl = this.options.ssl;
            } else {
                options.ssl = true;
            }
        }

        logger.log(options);

        Gp.Services.geocode(options);
    }

    _onSuccessSearch (results) {
        let position = [
            results.locations[0].position.lon,
            results.locations[0].position.lat
        ];
        let f, extent;
        if (results.locations[0].placeAttributes.truegeometry) {
            let geom = JSON.parse(results.locations[0].placeAttributes.truegeometry);

            let format = new GeoJSON();
            let geometry = format.readGeometry(geom, {
                dataProjection : "EPSG:4326",   // incoming data
                featureProjection : "EPSG:3857" // map projection
            });
            if (geom.type !== "Point" && geom.type !== "MultiPoint") {
                extent = new Feature({ geometry : geometry });
                // Point au milieu
                const geom = new Point(position);
                geom.transform("EPSG:4326", "EPSG:3857");
                f = new Feature({ geometry : geom });
            } else {
                extent = null;
                f = new Feature({ geometry : geometry });
            }
        }

        if (extent) {
            extent.set("infoPopup", this._currentGeocodingLocation);
        }
        f.set("infoPopup", this._currentGeocodingLocation);

        /**
         * event triggered when an element of the results is clicked for autocompletion
         *
         * @event searchengine:autocomplete:click
         * @property {Object} type - event
         * @property {Object} feature - feature renvoyé par le géocodage
         * @property {Object} target - instance SearchEngine
         * @example
         * SearchEngine.on("searchengine:autocomplete:click", function (e) {
         *   console.log(e.location);
         * })
         */
        this.dispatchEvent({
            type : this.SEARCH_EVENT,
            result : f,
            extent : extent,
        });
    }

    _onFailureSearch (location, error) {
        let position = [
            location.position.x,
            location.position.y
        ];

        logger.warn(error);

        /**
         * event triggered when an element of the results is clicked for autocompletion
         *
         * @event searchengine:autocomplete:click
         * @property {Object} type - event
         * @property {Object} location - location
         * @property {Object} target - instance SearchEngine
         * @example
         * SearchEngine.on("searchengine:autocomplete:click", function (e) {
         *   console.log(e.location);
         * })
         */

        const geom = new Point(position);
        let f = new Feature({ geometry : geom });
        f.set("infoPopup", this._currentGeocodingLocation);

        this.dispatchEvent({
            type : this.SEARCH_EVENT,
            result : f
        });
    }

}

export { AbstractSearchService, DefaultSearchService, IGNSearchService };

// Expose SearchEngine as ol.control.SearchEngine (for a build bundle)
if (window.ol) {
    if (!window.ol.service) {
        window.ol.service = {};
    }
    window.ol.service.AbstractSearchService = AbstractSearchService;
    window.ol.service.DefaultSearchService = DefaultSearchService;
    window.ol.service.IGNSearchService = IGNSearchService;
}
