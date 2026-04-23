import GeoportalOverviewMap from "../OverviewMap/GeoportalOverviewMap";
import { LitElement, html } from "lit";

class EmbeddedGeoportalOverviewMap extends GeoportalOverviewMap {

    _createContainerPosition (map) {
        this.container = this.options.target || map.getOverlayContainerStopEvent();
    }

}

/**
 * Webcomponent Panoramax affichant le controle GeoportalOverviewMap (DSFR).
 */
class MiniMap extends LitElement {

    constructor () {
        super();

        this._map = null;
        this._options = {};
        this._overviewControl = null;

        this._container = null;
    }

    connectedCallback () {
        super.connectedCallback();

        if (!this.style.width) {
            this.style.width = "220px";
        }
        if (!this.style.height) {
            this.style.height = "140px";
        }
        this.style.display = "block";
    }

    disconnectedCallback () {
        this._removeOverviewMap();
        super.disconnectedCallback();
    }

    createRenderRoot () {
        return this;
    }

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

    /**
     * @param {Object} map - Carte OpenLayers principale.
     */
    setMap (map) {
        this.map = map;
    }

    /**
    * @param {Object} options - Options du controle GeoportalOverviewMap.
     */
    setOptions (options) {
        this.options = options;
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

    _normalizeOptions (options) {
        var normalized = Object.assign({}, options);

        // Alias pratique pour permettre { layer: myLayer }.
        if (normalized.layer && !normalized.layers) {
            normalized.layers = [normalized.layer];
        }

        delete normalized.layer;
        return normalized;
    }

    _renderOverviewMap () {
        if (!this.isConnected || !this._map || this._overviewControl || !this._container) {
            return;
        }

        var options = Object.assign({}, this._getOptionsFromAttribute(), this._options);
        options = this._normalizeOptions(options);
        options.target = this._container;

        if (options.collapsed === undefined) {
            options.collapsed = false;
        }
        if (options.collapsible === undefined) {
            options.collapsible = false;
        }

        this._overviewControl = new EmbeddedGeoportalOverviewMap(options);
        this._map.addControl(this._overviewControl);
    }

    render () {
        return html`<div class="pnx-mini-map__container"></div>`;
    }

    _removeOverviewMap () {
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
