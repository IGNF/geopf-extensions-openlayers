import GeoportalOverviewMap from "../OverviewMap/GeoportalOverviewMap";
import { LitElement, html } from "lit";
import Overlay from "ol/Overlay";
import View from "ol/View";
import {
    transform as olProjTransform,
} from "ol/proj";

/**
 * @typedef {Object} MiniMapOptions
 * @description Options de configuration pour le contrôle de mini-map.
 * @property {Object} [options] - Options de configuration du contrôle de mini-map, définies via l'attribut HTML "options" en JSON.
 * @property {Array<import("ol/layer/Layer").default>} [options.layers] - Couches à afficher dans la mini-map.
 * @property {boolean} [options.collapsed=true] - Indique si la mini-map doit être initialement réduite.
 * @property {boolean} [options.collapsible=true] - Indique si la mini-map peut être réduite par l'utilisateur.
 * @property {import("ol/View").default} [options.view] - Vue à utiliser pour la mini-map. Si non fournie, une vue par défaut est créée.
 * @property {number} [options.width=200] - Largeur de la mini-map en pixels
 * @property {number} [options.height=150] - Hauteur de la mini-map en pixels
 * @property {boolean} [options.disableOverviewDragging=true] - Empêche le déplacement de la mini-map par glisser-déposer.
 * @property {boolean} [options.disableOverviewBBox=true] - Masque la bbox OpenLayers (rectangle de contexte) dans la mini-map.
 */

/**
 * Webcomponent Panoramax affichant le controle GeoportalOverviewMap (DSFR).
 * @extends {LitElement}
 * @example
 * <pnx-mini-map map=map options='{"collapsed": false, "view": {"center": [0, 0], "zoom": 2}}'></pnx-mini-map>
 */
class MiniMap extends LitElement {

    constructor (map, options = {}) {
        super();

        this._map = map || null;
        this._options = options && typeof options === "object" ? options : {};
        this._pictureCoordinates = null;
        this._pictureHeading = null;
        this._overviewControl = null;

        this._isSyncingView = false;
        this._onMainMapMoveEnd = null;
        this._onMiniMapMoveEnd = null;

        this._centerMarkerOverlay = null;

        this._container = null;
    }

    // Méthode du cycle de vie Web Component :
    // Lorsque le composant est ajouté au DOM
    /** @private */
    connectedCallback () {
        super.connectedCallback();

        // les dimensions de la mini-map
        if (!this.style.width) {
            this.style.width = (this._options.width ? this._options.width + "px" : "200px");
        }
        if (!this.style.height) {
            this.style.height = (this._options.height ? this._options.height + "px" : "150px");
        }
        this.style.display = "block";

        // Lors d'un removeControl/addControl, le composant peut être réattaché
        // sans repasser par firstUpdated(). On tente alors de ré-initialiser
        // le contrôle de mini-map si le conteneur existe déjà.
        this._container = this.querySelector(".pnx-mini-map__container") || this._container;
        this._renderOverviewMap();
    }

    // Méthode du cycle de vie Web Component :
    // Lorsque le composant est retiré du DOM
    /** @private */
    disconnectedCallback () {
        this._removeOverviewMap();
        super.disconnectedCallback();
    }

    // Méthode du cycle de vie Lit :
    // Par défaut, Lit utilise un Shadow DOM pour encapsuler 
    // le style et le contenu du composant.
    createRenderRoot () {
        return this;
    }

    // Méthode du cycle de vie Lit :
    // Après le premier rendu du composant et la mise à jour du DOM
    firstUpdated () {
        this._container = this.querySelector(".pnx-mini-map__container");
        this._renderOverviewMap();
    }

    // ################################################################### //
    // ########################### setters ############################### //
    // ################################################################### //

    get map () {
        return this._map;
    }

    set map (map) {
        if (this._map === map) {
            return;
        }

        this._removeOverviewMap();
        this._map = map;
        this.requestUpdate();
        this._renderOverviewMap();
    }

    get options () {
        return this._options;
    }

    set options (options) {
        this._removeOverviewMap();
        this._options = options && typeof options === "object" ? options : {};
        this.requestUpdate();
        this._renderOverviewMap();
    }

    get pictureHeading () {
        return this._pictureHeading;
    }

    set pictureHeading (heading) {
        this._pictureHeading =  heading;
        this._syncToPictureCoordinates();
    }

    get pictureCoordinates () {
        return this._pictureCoordinates;
    }

    set pictureCoordinates (coordinates) {
        if (!Array.isArray(coordinates) || coordinates.length < 2) {
            this._pictureCoordinates = null;
            return;
        }

        var lon = Number(coordinates[0]);
        var lat = Number(coordinates[1]);
        if (!Number.isFinite(lon) || !Number.isFinite(lat)) {
            this._pictureCoordinates = null;
            return;
        }

        this._pictureCoordinates = [lon, lat];
        this._syncToPictureCoordinates();
    }

    /**
     * Met à jour les coordonnées photo utilisées par la mini-map.
     * API explicite destinée au parent (ex. contrôle Panoramax).
     *
     * @param {Array<Number>|null} coordinates - Coordonnées [lon, lat] en EPSG:4326.
     */
    setPhotoCoordinates (coordinates) {
        this.pictureCoordinates = coordinates;
    }

    /**
     * Met à jour la direction de la photo pour orienter le marker
     * @param {Number} heading - orientation en degres
     */
    setPhotoHeading (heading) {
        this.pictureHeading = heading;
    }

    // ################################################################### //
    // ######################## marker overlay ########################### //
    // ################################################################### //

    _initCenterMarkerOverlay () {
        if (!this._overviewControl || this._centerMarkerOverlay) {
            return;
        }

        var overviewMap = this._overviewControl.getOverviewMap && this._overviewControl.getOverviewMap();
        if (!overviewMap) {
            return;
        }

        var miniView = overviewMap.getView && overviewMap.getView();
        if (!miniView) {
            return;
        }

        var markerElement = document.createElement("div");
        markerElement.className = "pnx-mini-map__center-marker";
        markerElement.setAttribute("aria-hidden", "true");

        let markerDirection = document.createElement("div");
        markerDirection.classList.add("pnx-mini-map__center-marker-direction");
        markerElement.appendChild(markerDirection);

        // TODO heading par defaut
        this._centerMarkerOverlay = new Overlay({
            element : markerElement,
            positioning : "center-center",
            stopEvent : false
        });
        overviewMap.addOverlay(this._centerMarkerOverlay);
        this._centerMarkerOverlay.setPosition(miniView.getCenter());
    }

    _updateCenterMarkerOverlayPosition (position) {
        if (!position || !this._overviewControl) {
            return;
        }

        var overviewMap = this._overviewControl.getOverviewMap && this._overviewControl.getOverviewMap();
        var miniView = overviewMap && overviewMap.getView && overviewMap.getView();
        var heading = this._pictureHeading;

        if (miniView) {
            this._isSyncingView = true;
            miniView.setCenter(position);
            this._isSyncingView = false;
        }

        if (this._centerMarkerOverlay) {
            this._centerMarkerOverlay.setPosition(position);
            this._centerMarkerOverlay.getElement().style.transform = `rotate(${heading || 0}deg)`;
        }
    }

    _syncToPictureCoordinates () {
        if (!this._pictureCoordinates || !this._overviewControl) {
            return;
        }

        var overviewMap = this._overviewControl.getOverviewMap && this._overviewControl.getOverviewMap();
        var miniView = overviewMap && overviewMap.getView && overviewMap.getView();
        if (!miniView) {
            return;
        }

        var overviewProj = miniView.getProjection() && miniView.getProjection().getCode();
        var coordinates = this._pictureCoordinates.slice();
        if (overviewProj && overviewProj !== "EPSG:4326") {
            coordinates = olProjTransform(coordinates, "EPSG:4326", overviewProj);
        }

        this._updateCenterMarkerOverlayPosition(coordinates);
    }

    _removeCenterMarkerOverlay () {
        if (!this._overviewControl || !this._centerMarkerOverlay) {
            this._centerMarkerOverlay = null;
            return;
        }

        var overviewMap = this._overviewControl.getOverviewMap && this._overviewControl.getOverviewMap();
        if (overviewMap) {
            overviewMap.removeOverlay(this._centerMarkerOverlay);
        }

        this._centerMarkerOverlay = null;
    }

    // ################################################################### //
    // ########################### view sync ############################# //
    // ################################################################### //

    _onViewSync () {
        if (!this._map || !this._overviewControl) {
            return;
        }

        var overviewMap = this._overviewControl.getOverviewMap && this._overviewControl.getOverviewMap();
        if (!overviewMap) {
            return;
        }

        var mainView = this._map.getView && this._map.getView();
        var miniView = overviewMap.getView && overviewMap.getView();
        if (!mainView || !miniView) {
            return;
        }

        this._onMainMapMoveEnd = () => {
            if (this._isSyncingView) {
                return;
            }
            this._isSyncingView = true;
            var center = mainView.getCenter();
            miniView.setCenter(center);
            this._updateCenterMarkerOverlayPosition(center);
            this._isSyncingView = false;
        };

        this._onMiniMapMoveEnd = () => {
            if (this._isSyncingView) {
                return;
            }
            this._isSyncingView = true;
            var center = miniView.getCenter();
            mainView.setCenter(center);
            this._updateCenterMarkerOverlayPosition(center);
            this._isSyncingView = false;
        };

        this._map.on("moveend", this._onMainMapMoveEnd);
        overviewMap.on("moveend", this._onMiniMapMoveEnd);

        // Synchronisation initiale de la mini-map depuis la carte principale.
        this._onMainMapMoveEnd();
    }

    _unViewSync () {
        if (!this._overviewControl) {
            this._onMainMapMoveEnd = null;
            this._onMiniMapMoveEnd = null;
            this._isSyncingView = false;
            return;
        }

        var overviewMap = this._overviewControl.getOverviewMap && this._overviewControl.getOverviewMap();

        if (this._map && this._onMainMapMoveEnd) {
            this._map.un("moveend", this._onMainMapMoveEnd);
        }
        if (overviewMap && this._onMiniMapMoveEnd) {
            overviewMap.un("moveend", this._onMiniMapMoveEnd);
        }

        this._onMainMapMoveEnd = null;
        this._onMiniMapMoveEnd = null;
        this._isSyncingView = false;
    }

    // ################################################################### //
    // ########################### overview map ########################## //
    // ################################################################### //

    _renderOverviewMap () {
        // isConnected : Web Component API property 
        if (!this.isConnected || !this._map || this._overviewControl || !this._container) {
            return;
        }

        const _getOptionsFromAttribute = () => {
            var raw = this.getAttribute("options");
            if (!raw) {
                return {};
            }

            try {
                var parsed = JSON.parse(raw);
                return parsed && typeof parsed === "object" ? parsed : {};
            } catch (e) {
                return {};
            }
        };
        
        var options = Object.assign({}, _getOptionsFromAttribute(), this._options);
        var configuredLayers = Array.isArray(options.layers) ? options.layers.slice() : [];
        
        options.target = this._container;

        options.layers = configuredLayers.filter((layer) => {
            return layer && typeof layer.getSource === "function";
        });

        if (options.collapsed === undefined) {
            options.collapsed = false;
        }
        if (options.collapsible === undefined) {
            options.collapsible = true;
        }
        if (options.view === undefined) {
            // FIXME zoom ?
            options.view = new View({
                minZoom : 16,
                maxZoom : 21
            });
        }
        if (options.disableOverviewDragging === undefined) {
            options.disableOverviewDragging = true;
        }
        if (options.disableOverviewBBox === undefined) {
            options.disableOverviewBBox = true;
        }

        this._overviewControl = new GeoportalOverviewMap(options);
        this._map.addControl(this._overviewControl);
        this._initCenterMarkerOverlay();
        this._onViewSync();
        this._syncToPictureCoordinates();

        const _dispatch = (status) => {
            this.dispatchEvent(new CustomEvent("toggle", { detail : { status } }));
        };

        if (!options.collapsed) {
            _dispatch(true);
        }

        this._overviewControl.on("overviewmap:toggle", (e) => {
            _dispatch(!e.status);
        });
    }

    _removeOverviewMap () {
        this._unViewSync();
        this._removeCenterMarkerOverlay();

        if (this._overviewControl && this._map) {
            this._map.removeControl(this._overviewControl);
        }

        this._overviewControl = null;

        if (this._container) {
            this._container.innerHTML = "";
        }
    }

    // Méthode du cycle de vie Lit :
    // La méthode render() est appelée pour définir le contenu HTML du composant.
    render () {
        return html`
            <style>
                .pnx-mini-map__container {
                    width: 100%;
                    height: 100%;
                    position: relative;
                }
                .pnx-mini-map__container .ol-overviewmap {
                    position: relative;
                    left: unset;
                    bottom: unset;
                    width: 100%;
                    height: 100%;
                    padding: 0;
                }
                .pnx-mini-map__container .ol-overviewmap::after {
                    content: initial !important;
                }
                .pnx-mini-map__container .ol-overviewmap .ol-overviewmap-map {
                    box-sizing: border-box;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 4px;
                    border: solid 4px var(--background-default-grey);
                    background-color: var(--background-default-grey);
                    box-shadow: var(--raised-shadow);
                }
                .pnx-mini-map__container .ol-overviewmap button {
                    position: absolute !important;
                    bottom: 0;
                    left: 0;
                    width: 48px;
                    height: 48px;
                    padding: unset;
                    opacity: 0;
                    transition: opacity 0s; /* à la fermeture, masquer sans attendre  */
                }
                .pnx-mini-map__container .ol-overviewmap button[aria-pressed="true"] {
                    bottom: 8px;
                    left: 8px;
                    opacity: 1;
                    transition: opacity .15s .3s; /* à l'ouverture, attendre 0.3s et animer en 0.15s */
                }
                .pnx-mini-map__center-marker {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background-color: var(--background-action-high-blue-france);
                    box-shadow: 0 0 0 2px #fff, 0 0 0 3px rgba(0, 0, 0, 0.2);
                    pointer-events: none;
                    z-index: 2;
                }
                .pnx-mini-map__center-marker-direction {
                    width: 20px;
                    height: 20px;
                    background-color: white;
                    clip-path: polygon(50% 18%, 25% 75%, 50% 66%, 75% 75%);
                }
                .pnx-mini-map__container .ol-viewport canvas,
                .pnx-mini-map__container .ol-overlaycontainer {
                    cursor: default;
                }
                .pnx-mini-map__container .ol-overviewmap.ol-collapsed .ol-overviewmap-map {
                    display: block;
                }
                @media (min-width: 36em) {
                    .pnx-photo-viewer-mini-map {
                        transition: width .3s, height .3s;
                    }
                }
                .pnx-photo-viewer-container--minimap-open .pnx-photo-viewer-mini-map {
                    width: 280px !important;
                    height: 150px !important;
                }
                @media (max-width: 35.99em) {
                    .pnx-photo-viewer-container--minimap-open .ol-overviewmap .ol-overviewmap-map {
                        border: none;
                    }
                    /* minimap ouverte */
                    .pnx-photo-viewer-container--minimap-open .pnx-photo-viewer-mini-map {
                        width: 100cqw !important;
                    }
                }
            </style>
            <div class="pnx-mini-map__container"></div>
        `;
    }
    
}

if (!customElements.get("pnx-mini-map")) {
    customElements.define("pnx-mini-map", MiniMap);
}

export default MiniMap;
