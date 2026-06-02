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
 * @property {boolean} [options.disableOverviewDragging=true] - Empêche le déplacement de la mini-map par glisser-déposer.
 * @property {boolean} [options.disableOverviewBBox=true] - Masque la bbox OpenLayers (rectangle de contexte) dans la mini-map.
 */
/**
 * Webcomponent Panoramax affichant le controle GeoportalOverviewMap (DSFR).
 * @extends {LitElement}
 * @example
 * <pnx-mini-map map=map options='{"collapsed": false, "view": {"center": [0, 0], "zoom": 2}}'></pnx-mini-map>
 */
declare class MiniMap extends LitElement {
    constructor(map: any, options?: {});
    _map: any;
    _options: object;
    _pictureCoordinates: any;
    _overviewControl: GeoportalOverviewMap | null;
    _isSyncingView: boolean;
    _onMainMapMoveEnd: (() => void) | null;
    _onMiniMapMoveEnd: (() => void) | null;
    _centerMarkerOverlay: Overlay | null;
    _container: any;
    createRenderRoot(): this;
    firstUpdated(): void;
    set map(map: any);
    get map(): any;
    set options(options: object);
    get options(): object;
    set pictureCoordinates(coordinates: number[] | null);
    get pictureCoordinates(): number[] | null;
    /**
     * Met à jour les coordonnées photo utilisées par la mini-map.
     * API explicite destinée au parent (ex. contrôle Panoramax).
     *
     * @param {Array<Number>|null} coordinates - Coordonnées [lon, lat] en EPSG:4326.
     */
    setPhotoCoordinates(coordinates: Array<number> | null): void;
    _initCenterMarkerOverlay(): void;
    _updateCenterMarkerOverlayPosition(position: any): void;
    _syncToPictureCoordinates(): void;
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