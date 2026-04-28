export default MiniMap;
export type MiniMapOptions = any;
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
declare class MiniMap extends LitElement {
    /**
     * @constructor
     * @param {import("ol/Map").default} [map] - Instance de carte OpenLayers à associer à la mini-map.
     * @param {MiniMapOptions} [options={}] - Options de configuration du contrôle de mini-map.
     */
    constructor(map?: import("ol/Map").default, options?: MiniMapOptions);
    _map: import("ol/Map").default | null;
    _options: any;
    _overviewControl: GeoportalOverviewMap | null;
    _isSyncingView: boolean;
    _onMainMapMoveEnd: (() => void) | null;
    _onMiniMapMoveEnd: (() => void) | null;
    _centerMarkerOverlay: Overlay | null;
    _container: Element | null;
    _parent: Element | null | undefined;
    createRenderRoot(): this;
    firstUpdated(): void;
    /**
     * Assigne une carte OpenLayers à la mini-map via l'attribut HTML "map" en JSON.
     * @param {import("ol/Map").default} map - Instance de carte OpenLayers à associer à la mini-map.
     */
    set map(map: import("ol/Map").default);
    get map(): import("ol/Map").default;
    /**
     * Assigne des options à la mini-map via l'attribut HTML "options" en JSON.
     * @param {Object} options - Options à appliquer à la mini-map.
     */
    set options(options: any);
    get options(): any;
    _initCenterMarkerOverlay(): void;
    _updateCenterMarkerOverlayPosition(position: any): void;
    _removeCenterMarkerOverlay(): void;
    _onViewSync(): void;
    _unViewSync(): void;
    _renderOverviewMap(): void;
    _removeOverviewMap(): void;
    render(): import("lit-html").TemplateResult<1>;
}
import { LitElement } from "lit";
import GeoportalOverviewMap from "../OverviewMap/GeoportalOverviewMap";
import Overlay from "ol/Overlay";
//# sourceMappingURL=PnxMiniMapWidget.d.ts.map