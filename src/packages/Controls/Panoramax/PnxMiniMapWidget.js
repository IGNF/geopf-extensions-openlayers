import GeoportalOverviewMap from "../OverviewMap/GeoportalOverviewMap";
import { LitElement, html } from "lit";
import View from "ol/View";

/**
 * Webcomponent Panoramax affichant le controle GeoportalOverviewMap (DSFR).
 */
class MiniMap extends LitElement {

    constructor () {
        super();

        this._map = null;
        this._options = {};
        this._overviewControl = null;

        this._isSyncingView = false;
        this._onMainMapMoveEnd = null;
        this._onMiniMapMoveEnd = null;

        this._container = null;
    }

    // Méthode du cycle de vie Web Component :
    // Lorsque le composant est ajouté au DOM
    connectedCallback () {
        super.connectedCallback();

        // FIXME 
        // les dimensions de la mini-map ne sont pas appliquées correctement via CSS !?
        if (!this.style.width) {
            this.style.width = "200px";
        }
        if (!this.style.height) {
            this.style.height = "150px";
        }
        this.style.display = "block";
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

    _getOptionsFromAttribute () {
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
    }

    // FIXME Conflits de CSS !?
    _applyMiniMapSize () {
        if (!this._overviewControl || !this._container) {
            return;
        }

        var controlElement = this._overviewControl.element;
        if (!controlElement) {
            return;
        }

        this._container.style.width = "100%";
        this._container.style.height = "100%";

        controlElement.style.width = "100%";
        controlElement.style.height = "100%";

        var mapElement = controlElement.querySelector(".ol-overviewmap-map");
        if (mapElement) {
            mapElement.style.width = "100%";
            mapElement.style.height = "100%";
        }

        var overviewMap = this._overviewControl.getOverviewMap && this._overviewControl.getOverviewMap();
        if (overviewMap) {
            overviewMap.updateSize();
        }
    }

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
            miniView.setCenter(mainView.getCenter());
            this._isSyncingView = false;
        };

        this._onMiniMapMoveEnd = () => {
            if (this._isSyncingView) {
                return;
            }
            this._isSyncingView = true;
            mainView.setCenter(miniView.getCenter());
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

    _renderOverviewMap () {
        // isConnected : Web Component API property 
        if (!this.isConnected || !this._map || this._overviewControl || !this._container) {
            return;
        }

        var options = Object.assign({}, this._getOptionsFromAttribute(), this._options);
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
                zoom : 21,
                minZoom : 1,
                maxZoom : 21
            });
        }

        this._overviewControl = new GeoportalOverviewMap(options);
        this._map.addControl(this._overviewControl);
        this._applyMiniMapSize();
        this._onViewSync();
    }

    // Méthode du cycle de vie Lit :
    // La méthode render() est appelée pour définir le contenu HTML du composant.
    render () {
        return html`<div class="pnx-mini-map__container"></div>`;
    }

    _removeOverviewMap () {
        this._unViewSync();

        if (this._overviewControl && this._map) {
            this._map.removeControl(this._overviewControl);
        }

        this._overviewControl = null;

        if (this._container) {
            this._container.innerHTML = "";
        }
    }
    
}

if (!customElements.get("pnx-mini-map")) {
    customElements.define("pnx-mini-map", MiniMap);
}

export default MiniMap;
