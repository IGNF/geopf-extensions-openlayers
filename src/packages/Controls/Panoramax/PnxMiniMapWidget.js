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
 */

/**
 * Webcomponent Panoramax affichant le controle GeoportalOverviewMap (DSFR).
 * @extends {LitElement}
 * @example
 * <pnx-mini-map map=map options='{"collapsed": false, "view": {"center": [0, 0], "zoom": 2}}'></pnx-mini-map>
 */
class MiniMap extends LitElement {

    /**
     * @constructor
     * @param {import("ol/Map").default} [map] - Instance de carte OpenLayers à associer à la mini-map.
     * @param {MiniMapOptions} [options={}] - Options de configuration du contrôle de mini-map.
     */
    constructor (map, options = {}) {
        super();

        this._map = map || null;
        this._options = options && typeof options === "object" ? options : {};
        this._overviewControl = null;

        this._isSyncingView = false;
        this._onMainMapMoveEnd = null;
        this._onMiniMapMoveEnd = null;

        this._centerMarkerOverlay = null;

        this._container = null;
    }

    // Méthode du cycle de vie Web Component :
    // Lorsque le composant est ajouté au DOM
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

        // recuperer les coordonnées de la picture courante pour centrer la mini-map dessus
        customElements.whenDefined("pnx-photo-viewer").then(() => {
            this._parent = this.closest("pnx-photo-viewer");
            console.warn("MiniMap connected to DOM", this._parent);
            this._parent.onceReady()
                .then(() => {
                    this._parent.psv.addEventListener("picture-loaded", (e) => {
                        console.warn("Updating mini-map center to picture position", e);
                        // Récupérer les coordonnées de l'image (généralement en lat/lon EPSG:4326)
                        const pictureConfig = e.detail;
                        
                        if (pictureConfig && pictureConfig.lon !== undefined && pictureConfig.lat !== undefined) {
                            let coordinates = [pictureConfig.lon, pictureConfig.lat];
                            
                            // Transformer dans la projection de la mini-map si nécessaire
                            const overviewMap = this._overviewControl.getOverviewMap && this._overviewControl.getOverviewMap();
                            if (overviewMap) {
                                const overviewProj = overviewMap.getView().getProjection().getCode();
                                if (overviewProj !== "EPSG:4326") {
                                    coordinates = olProjTransform(coordinates, "EPSG:4326", overviewProj);
                                }
                            }
                            
                            // Mettre à jour la position du marker
                            this._updateCenterMarkerOverlayPosition(coordinates);
                        }
                    });
                });
        });
    }

    // Méthode du cycle de vie Web Component :
    // Lorsque le composant est retiré du DOM
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

    /**
     * Assigne une carte OpenLayers à la mini-map via l'attribut HTML "map" en JSON.
     * @param {import("ol/Map").default} map - Instance de carte OpenLayers à associer à la mini-map.
     */
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

    /**
     * Assigne des options à la mini-map via l'attribut HTML "options" en JSON.
     * @param {Object} options - Options à appliquer à la mini-map.
     */
    set options (options) {
        this._removeOverviewMap();
        this._options = options && typeof options === "object" ? options : {};
        this.requestUpdate();
        this._renderOverviewMap();
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

        this._centerMarkerOverlay = new Overlay({
            element : markerElement,
            positioning : "center-center",
            stopEvent : false
        });
        overviewMap.addOverlay(this._centerMarkerOverlay);
        this._centerMarkerOverlay.setPosition(miniView.getCenter());
    }

    _updateCenterMarkerOverlayPosition (position) {
        if (!position || !this._overviewControl || !this._centerMarkerOverlay) {
            return;
        }

        var overviewMap = this._overviewControl.getOverviewMap && this._overviewControl.getOverviewMap();
        var miniView = overviewMap && overviewMap.getView && overviewMap.getView();

        if (miniView) {
            this._isSyncingView = true;
            miniView.setCenter(position);
            this._isSyncingView = false;
        }

        this._centerMarkerOverlay.setPosition(position);
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
            options.collapsed = true;
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

        this._overviewControl = new GeoportalOverviewMap(options);
        this._map.addControl(this._overviewControl);
        this._initCenterMarkerOverlay(); // FIXME centrer sur la pictureID courrante !
        this._onViewSync();
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
                    width: 100%;
                    height: 100%;
                    position: relative;
                    left: unset;
                    bottom: unset;
                }
                .pnx-mini-map__container .ol-overviewmap .ol-overviewmap-map {
                    width: 100%;
                    height: 100%;
                }
                .pnx-mini-map__container .ol-overviewmap button {
                    width: 48px;
                    height: 48px;
                    padding: unset;
                }
                .pnx-mini-map__center-marker {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 14px;
                    height: 14px;
                    border: 2px solid #d64f00;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.9);
                    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2);
                    pointer-events: none;
                    z-index: 2;
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
