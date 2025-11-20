import GeoJSON from "ol/format/GeoJSON";
import Logger from "../Utils/LoggerByDefault";
import AbstractSearchService from "./AbstractSearchService";
// import geoportal library access
import Gp from "geoportal-access-lib";
// import local
import Utils from "../Utils/Helper";
import GeocodeUtils from "../Utils/GeocodeUtils";
// Service
import Search from "./Search";
import Feature from "ol/Feature.js";
import Point from "ol/geom/Point.js";

var logger = Logger.getLogger("searchengine");

// logger.log = () => { };

/**
 * @classdesc
 * Service de recherche IGN (utilise les services IGN / Search wrapper).
 *
 * @alias ol.service.IGNSearchService
 * @module SearchService
 * @extends AbstractSearchService
 */
class IGNSearchService extends AbstractSearchService {

    /**
     * Constructeur du service IGN.
     * @constructor
     * @param {AbstractSearchServiceOptions} options Options du service IGN (clé API, index, etc.)
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

    /**
     * Initialise le service avec les options fournies.
     * @protected
     * @override
     * @param {AbstractSearchServiceOptions} options Options de configuration du service
     */
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
            autocomplete : true,
            autocompleteOptions : {
                serviceOptions : {
                    maximumResponses : 10,
                },
                triggerGeocode : false,
                triggerDelay : 1000,
                prettifyResults : true
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

        /**
         * Label du géocodage / de la recherche
         * @type {String}
         */
        this._currentGeocodingLocation;
        /**
         * Liste de résultats d'autocomplétion
         * @type {Array<AutocompleteResult>}
         */
        this._suggestedLocations;
    }


    /**
     * Lance une autocomplétion via le service IGN.
     * @override
     * @param {String} value Texte à envoyer
     */
    autocomplete (value) {
        if (!value) {
            return;
        }

        // on sauvegarde le localisant
        this._currentGeocodingLocation = value;

        // On effectue la requête au service d'autocompletion.
        this._requestAutoComplete({
            text : value,
            onSuccess : this._onSuccessAutoComplete.bind(this),
            onFailure : this._onFailureAutoComplete.bind(this)
        });
    }

    /**
     * @override
     * @param {AutocompleteResult} obj Objet dont le titre dérive
     * @returns {String} Titre à afficher
     */
    getItemTitle (obj) {
        return obj.fullText;
    }

    /**
     * Exécute une requête d'autocomplétion auprès du service IGN.
     * @private
     * @param {Object} settings Paramètres de la requête (texte, callbacks, etc.)
     * @param {String} settings.text Texte à compléter
     * @param {Function} settings.onSuccess Callback en cas de succès
     * @param {Function} settings.onFailure Callback en cas d'échec
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

    /**
     * Fonction appelée en cas de succès de l'autocomplétion.
     * @param {Object} results Résultats de la requête.
     * @param {Array<AutocompleteResult>} results.suggestedLocations Tableau de suggestions.
     */
    _onSuccessAutoComplete (results) {
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

    /**
     * Fonction appelée en cas d'erreur sur le service d'autocomplétion
     * @param {ErrorService} error Erreur renvoyée par le service
     */
    _onFailureAutoComplete (error) {
        let _triggerGeocode = this.options.autocompleteOptions.triggerGeocode;
        let _triggerDelay = this.options.autocompleteOptions.triggerDelay;

        let onSuccess = function (results) {
            logger.log("request from Geocoding", results);
            if (results) {
                this._clearResults();
                // on modifie la structure des reponses pour être
                // compatible avec l'autocomplétion !
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
        // on envoie une requete de geocodage si aucun resultat d'autocomplétion
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
        for (let i = autocompleteResults.length - 1; i >= 0; i--) {
            const autocompleteResult = autocompleteResults[i];
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
     * Lance une recherche sur les services de géocodage de l'IGN
     * @see {@link https://data.geopf.fr/geocodage/search}
     * @see {@link https://data.geopf.fr/geocodage/openapi}
     * @param {IGNSearchObject} object Recherche 
     * @abstract
     */
    search (object) {
        const location = object.location;
        const filters = object.filters ? object.filters : {};

        if (location === undefined) {
            return;
        }
        // on ajoute le texte de l'autocomplétion dans l'input
        let label;
        let index = this.get("index");
        let truegeometry = this.get("returnTrueGeometry");
        if (typeof location === "string") {
            // Location est un texte, on prend les valeurs par défaut
            label = location;
        } else {
            // location est un objet : on vérifie les informations qu'il comporte

            // Récupère les infos (s'il y'en a)
            index = location.type ? location.type : index;
            label = GeocodeUtils.getSuggestedLocationFreeform(location);
            // TODO : AMÉLIORER CETTE PARTIE (REDONDANTE)
            // Enlève l'ajout du prettify
            if ((location.type === "PositionOfInterest" && location.poiType[0] === "administratif" &&
                (location.poiType[1] === "département" || location.poiType[1] === "région"))) {
                label = label.substring(0, label.length - (location.poiType[1].length + 2));
            }

            if (index === "PositionOfInterest") {
                // Recherche d'un POI : ajout d'infos supplémentaires
                let poiType = location.poiType[0];
                if (poiType === "administratif" && location.poiType[1]) {
                    poiType = location.poiType[1];
                }
                filters.category = poiType ? poiType : null;

                // Retourne la géométrie pour certains types seulement
                truegeometry = false;
                const trueGeometries = ["administratif", "département", "construction", "hydrographie"];
                for (let i = 0; i < location.poiType.length; i++) {
                    const type = location.poiType[i];
                    if (type !== "lieu-dit habité" && trueGeometries.includes(type)) {
                        truegeometry = true;
                        break;
                    }
                }
            }
            filters.postalCode = location.postalCode ? location.postalCode : null;

            // Retire chaque valeurs nulles
            for (const key in filters) {
                if (!Object.hasOwn(filters, key)) {
                    continue;
                };
                if (filters[key] === null) {
                    delete filters[key];
                }
            }
        }

        // on centre la vue et positionne le marker, à la position reprojetée dans la projection de la carte

        this._requestGeocoding({
            index : index,
            limit : this.get("limit"),
            returnTrueGeometry : truegeometry,
            location : label,
            filters : filters,
            onSuccess : this._onSuccessSearch.bind(this),
            onFailure : this._onFailureSearch.bind(this, location),
        });
        // on sauvegarde le localisant
        this._currentGeocodingLocation = label;
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
        options.maximumResponses = settings.limit;
        // on redefinie les callbacks si les callbacks de service existent
        var bOnSuccess = !!(this.options.geocodeOptions.serviceOptions.onSuccess !== null && typeof this.options.geocodeOptions.serviceOptions.onSuccess === "function");
        if (bOnSuccess) {
            var cbOnSuccess = function (e) {
                settings.onSuccess.bind(this, e);
                this.options.geocodeOptions.serviceOptions.onSuccess.bind(this, e);
            };
            options.onSuccess = cbOnSuccess.bind(this);
        }

        var bOnFailure = !!(this.options.geocodeOptions.serviceOptions.onFailure !== null && typeof this.options.geocodeOptions.serviceOptions.onFailure === "function");
        if (bOnFailure) {
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

    /** Get features based on current search result
     * @param {Number} index Index of the result
     * @returns {Object} Object containing feature and extent (if any)
     */
    getResultFeatures (index) {
        let location = this.getResult(index);
        if (!location) {
            return { featureFilter : null, extent : null  };
        }
        let position = [
            location.position.lon,
            location.position.lat
        ];
        let f, extent;
        if (location.placeAttributes.truegeometry) {
            let geom = location.placeAttributes.truegeometry;
            if (typeof geom === "string") {
                JSON.parse(geom);
            }

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
        } else {
            const geom = new Point(position);
            geom.transform("EPSG:4326", "EPSG:3857");
            f = new Feature({ geometry : geom });
        }

        if (extent) {
            extent.set("infoPopup", this._currentGeocodingLocation);
        }
        f.set("infoPopup", this._currentGeocodingLocation);
        return { feature : f, extent : extent  };
    }
    
    /**
     * Fonction appelée en cas de succès du géocodage
     * 
     * @param {Object} results Résultats de la recherche
     * @private
     */
    _onSuccessSearch (results) {
        this._locations = results.locations;

        const features = this.getResultFeatures(0);

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
            result : features.feature,
            extent : features.extent,
            nbResults : results.locations.length,
        });
    }

    /**
     * Fonction appelée en cas d'erreur renvoyée par le service de géocodage.
     * @param {AutocompleteResult} location Localisation de l'autocomplétion.
     * @param {ErrorService} error Erreur renvoyée par le service.
     */
    _onFailureSearch (location, error) {
        logger.warn(error);
        if (!location || !location.position) {
            this.dispatchEvent({
                type : this.ERROR_EVENT,
                location : location,
                error : error
            });
            return;
        }

        let position = [
            location.position.x,
            location.position.y
        ];

        // Créé le point
        const geom = new Point(position);
        let f = new Feature({ geometry : geom });
        f.set("infoPopup", this._currentGeocodingLocation);

        this.dispatchEvent({
            type : this.SEARCH_EVENT,
            result : f
        });
    }

}

export default IGNSearchService;

// Expose IGNSearchService as ol.service.IGNSearchService (for a build bundle)
if (window.ol) {
    if (!window.ol.service) {
        window.ol.service = {};
    }
    window.ol.service.IGNSearchService = IGNSearchService;
}
