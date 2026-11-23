/**
 * Répétition multiWorld opt-in.
 *
 * Tant qu'aucune source n'a opté pour wrapX (flag _gpWrapOptIn), rien ne change.
 * OSM / XYZ / VectorTile ont wrapX par défaut : ce n'est pas un opt-in.
 * Dès qu'une source GeoPF est créée avec wrapX (cartes.gouv.fr, sample),
 * les couches tuilées ajoutées ensuite héritent du wrap, une emprise absolue
 * devient un clip répété en X, et les overlays sont recopiés sur les mondes visibles.
 *
 * @module WorldRepeat
 */
import OlMap from "ol/Map";
import Overlay from "ol/Overlay";
import TileImage from "ol/source/TileImage";
import LayerUtils from "./LayerUtils";

const GHOST = "gpWorldGhost";
const WATCH = "gpWorldRepeatWatch";
const ADOPTED = "gpWrapAdopted";
const GROUP_WATCH = "gpWrapGroupWatch";
const CATALOGUE = "_catalogueExtent";

/** @type {WeakMap<Object, Map<Number, Object>>} */
const ghostSets = new WeakMap();
let syncing = false;

/**
 * @param {Array<Number>|undefined} extent
 * @returns {Boolean}
 */
function isFiniteExtent (extent) {
    return !!(extent && extent.length === 4 &&
        isFinite(extent[0]) && isFinite(extent[1]) &&
        isFinite(extent[2]) && isFinite(extent[3]));
}

/**
 * WMTS / TileWMS / XYZ. Pas les VectorTile (wrapX true par défaut OL).
 *
 * @param {Object} source
 * @returns {Boolean}
 */
function isRasterTileSource (source) {
    return source instanceof TileImage;
}

/**
 * Ramène x dans l'emprise monde 0 de la projection. y inchangé.
 * Copie le couple : le marqueur GFI garde le clic brut.
 *
 * @param {Array<Number>} coordinate
 * @param {Object} projection - ol.proj.Projection
 * @returns {Array<Number>}
 */
export function wrapToWorld0 (coordinate, projection) {
    if (!coordinate || coordinate.length < 2) {
        return coordinate;
    }
    const wrapped = [coordinate[0], coordinate[1]];
    const world = projectionWorld(projection);
    if (!world) {
        return wrapped;
    }
    const worlds = Math.floor((wrapped[0] - world.extent[0]) / world.width);
    wrapped[0] -= worlds * world.width;
    return wrapped;
}

/**
 * @param {Object} projection
 * @returns {{extent : Array<Number>, width : Number}|null}
 */
function projectionWorld (projection) {
    if (!projection || typeof projection.isGlobal !== "function" || !projection.isGlobal()) {
        return null;
    }
    const extent = projection.getExtent();
    if (!isFiniteExtent(extent)) {
        return null;
    }
    const width = extent[2] - extent[0];
    if (!width) {
        return null;
    }
    return {
        extent : extent,
        width : width
    };
}

/**
 * @param {Object} map
 * @param {{extent : Array<Number>, width : Number}} world
 * @returns {{minW : Number, maxW : Number}|null}
 */
function visibleWorldRange (map, world) {
    const size = map.getSize();
    const view = map.getView && map.getView();
    if (!size || !view || typeof view.calculateExtent !== "function") {
        return null;
    }
    const viewExtent = view.calculateExtent(size);
    let minW = Math.floor((viewExtent[0] - world.extent[0]) / world.width);
    let maxW = Math.floor((viewExtent[2] - world.extent[0] - 1e-9) / world.width);
    if (maxW < minW) {
        return null;
    }
    if (maxW - minW > 8) {
        const center = view.getCenter();
        const mid = center ? Math.round((center[0] - (world.extent[0] + world.extent[2]) / 2) / world.width) : 0;
        minW = mid - 4;
        maxW = mid + 4;
    }
    return {
        minW : minW,
        maxW : maxW
    };
}

/**
 * @param {Object} layer
 * @param {Function} fn
 */
function forEachLeaf (layer, fn) {
    if (!layer) {
        return;
    }
    const kids = layer.getLayers && layer.getLayers();
    if (kids && typeof kids.forEach === "function") {
        kids.forEach((child) => {
            forEachLeaf(child, fn);
        });
        return;
    }
    fn(layer);
}

/**
 * Vrai si une source de la carte a demandé wrapX.
 * Le défaut OL (OSM, XYZ, VectorTile) ne compte pas.
 *
 * @param {Object} map
 * @returns {Boolean}
 */
function mapWraps (map) {
    let wraps = false;
    const layers = map.getLayers && map.getLayers();
    if (!layers || typeof layers.forEach !== "function") {
        return false;
    }
    layers.forEach((layer) => {
        forEachLeaf(layer, (leaf) => {
            const source = leaf.getSource && leaf.getSource();
            if (source && source._gpWrapOptIn) {
                wraps = true;
            }
        });
    });
    return wraps;
}

/**
 * ol/source/Source n'a pas setWrapX. getTileCoordForTileUrlFunction lit wrapX_ à chaque tuile.
 *
 * @param {Object} source
 */
function enableSourceWrapX (source) {
    if (!isRasterTileSource(source) || !source.getWrapX || source.getWrapX()) {
        return;
    }
    source.wrapX_ = true;
    source._gpWrapOptIn = true;
    if (typeof source.changed === "function") {
        source.changed();
    }
}

/**
 * @param {Object} map
 * @param {Object} layer
 */
function adoptLayer (map, layer) {
    if (!layer) {
        return;
    }
    const kids = layer.getLayers && layer.getLayers();
    if (kids && typeof kids.forEach === "function") {
        if (!layer.get(GROUP_WATCH)) {
            layer.set(GROUP_WATCH, true);
            kids.on("add", () => {
                adoptAll(map);
            });
        }
        kids.forEach((child) => {
            adoptLayer(map, child);
        });
        return;
    }
    if (layer.get(ADOPTED) || !mapWraps(map)) {
        return;
    }
    enableSourceWrapX(layer.getSource && layer.getSource());
    if (layer.get(CATALOGUE)) {
        if (layer.getExtent && layer.getExtent()) {
            layer.setExtent(undefined);
        }
    } else if (layer.getExtent && isFiniteExtent(layer.getExtent())) {
        const extent = layer.getExtent().slice();
        layer.setExtent(undefined);
        LayerUtils.enableRepeatingExtentClip(layer, extent);
    }
    layer.set(ADOPTED, true);
}

/**
 * @param {Object} map
 */
function adoptAll (map) {
    if (!mapWraps(map)) {
        return;
    }
    const layers = map.getLayers();
    if (!layers || typeof layers.getArray !== "function") {
        return;
    }
    layers.getArray().slice().forEach((layer) => {
        adoptLayer(map, layer);
    });
    syncOverlays(map);
}

/**
 * @param {Object} map
 */
function watchMap (map) {
    if (!map || map.get(WATCH)) {
        return;
    }
    map.set(WATCH, true);
    const layers = map.getLayers();
    if (layers && typeof layers.on === "function") {
        layers.on("add", () => {
            adoptAll(map);
        });
    }
    map.on("moveend", () => {
        syncOverlays(map);
    });
    adoptAll(map);
}

/**
 * @param {HTMLElement} element
 */
function stripIds (element) {
    if (!element || !element.removeAttribute) {
        return;
    }
    element.removeAttribute("id");
    if (!element.querySelectorAll) {
        return;
    }
    const nodes = element.querySelectorAll("[id]");
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].removeAttribute("id");
    }
}

/**
 * Copie visuelle. Pas d'id, pas d'autoPan, les clics traversent.
 *
 * @param {Object} overlay
 * @returns {Object}
 */
function createGhost (overlay) {
    const offset = overlay.getOffset() || [0, 0];
    const ghost = new Overlay({
        stopEvent : false,
        insertFirst : overlay.insertFirst,
        positioning : overlay.getPositioning(),
        offset : offset.slice(),
        className : overlay.element ? overlay.element.className : undefined,
        autoPan : false
    });
    ghost.set(GHOST, true);
    return ghost;
}

/**
 * @param {Object} overlay
 * @param {Object} ghost
 * @returns {Boolean}
 */
function syncGhostElement (overlay, ghost) {
    const src = overlay.getElement();
    if (!src) {
        return false;
    }
    let el = ghost.getElement();
    if (!el) {
        el = src.cloneNode(true);
        stripIds(el);
        ghost.setElement(el);
        return true;
    }
    if (el.className !== src.className) {
        el.className = src.className;
    }
    if (el.innerHTML !== src.innerHTML) {
        el.innerHTML = src.innerHTML;
        stripIds(el);
    }
    return true;
}

/**
 * @param {Object} overlay
 * @param {Object} ghost
 * @param {Array<Number>} position
 */
function syncGhost (overlay, ghost, position) {
    if (!syncGhostElement(overlay, ghost)) {
        return;
    }
    const offset = overlay.getOffset() || [0, 0];
    const ghostOffset = ghost.getOffset() || [0, 0];
    if (offset[0] !== ghostOffset[0] || offset[1] !== ghostOffset[1]) {
        ghost.setOffset(offset.slice());
    }
    if (ghost.getPositioning() !== overlay.getPositioning()) {
        ghost.setPositioning(overlay.getPositioning());
    }
    const current = ghost.getPosition();
    if (!current || current[0] !== position[0] || current[1] !== position[1]) {
        ghost.setPosition(position);
    }
}

/**
 * @param {Object} overlay
 */
function clearGhosts (overlay) {
    const byWorld = ghostSets.get(overlay);
    if (!byWorld) {
        return;
    }
    byWorld.forEach((ghost) => {
        const ghostMap = ghost.getMap();
        if (ghostMap) {
            ghostMap.removeOverlay(ghost);
        }
    });
    ghostSets.delete(overlay);
}

/**
 * @param {Object} map
 */
function syncOverlays (map) {
    if (!map || syncing || typeof map.getOverlays !== "function") {
        return;
    }
    syncing = true;
    try {
        const overlays = map.getOverlays().getArray().slice();
        const wrapping = mapWraps(map);
        const view = map.getView && map.getView();
        const world = wrapping ? projectionWorld(view && view.getProjection()) : null;
        const range = world ? visibleWorldRange(map, world) : null;
        overlays.forEach((overlay) => {
            if (!overlay || overlay.get(GHOST)) {
                return;
            }
            if (!range) {
                clearGhosts(overlay);
                return;
            }
            const position = overlay.getPosition();
            if (!position || !overlay.getElement()) {
                clearGhosts(overlay);
                return;
            }
            const base = Math.floor((position[0] - world.extent[0]) / world.width);
            let byWorld = ghostSets.get(overlay);
            if (!byWorld) {
                // globalThis.Map : l'import ol/Map ne doit pas masquer Map JS.
                byWorld = new globalThis.Map();
                ghostSets.set(overlay, byWorld);
            }
            const wanted = new Set();
            for (let w = range.minW; w <= range.maxW; w++) {
                if (w === base) {
                    continue;
                }
                wanted.add(w);
                let ghost = byWorld.get(w);
                if (!ghost) {
                    ghost = createGhost(overlay);
                    byWorld.set(w, ghost);
                    map.addOverlay(ghost);
                }
                syncGhost(overlay, ghost, [
                    position[0] + (w - base) * world.width,
                    position[1]
                ]);
            }
            byWorld.forEach((ghost, w) => {
                if (!wanted.has(w)) {
                    map.removeOverlay(ghost);
                    byWorld.delete(w);
                }
            });
        });
    } finally {
        syncing = false;
    }
}

/**
 * Patch idempotent de ol.Map / ol.Overlay. Un seul prototype OL par page.
 */
function install () {
    if (!Overlay || !Overlay.prototype || !OlMap || !OlMap.prototype) {
        return;
    }
    // Un bundle webpack par contrôle : le flag doit vivre sur le prototype OL partagé.
    if (Overlay.prototype._gpWorldRepeatPatched) {
        return;
    }
    Overlay.prototype._gpWorldRepeatPatched = true;
    const origSetMap = Overlay.prototype.setMap;
    const origSetPosition = Overlay.prototype.setPosition;
    const origSetElement = Overlay.prototype.setElement;
    const origAddLayer = OlMap.prototype.addLayer;

    Overlay.prototype.setMap = function (map) {
        const prev = this.getMap();
        if (!map && prev && !this.get(GHOST)) {
            clearGhosts(this);
        }
        origSetMap.call(this, map);
        if (map && !this.get(GHOST)) {
            watchMap(map);
        }
    };

    Overlay.prototype.setPosition = function (position) {
        origSetPosition.call(this, position);
        if (this.get(GHOST)) {
            return;
        }
        const map = this.getMap();
        if (map) {
            syncOverlays(map);
        }
    };

    Overlay.prototype.setElement = function (element) {
        origSetElement.call(this, element);
        if (this.get(GHOST)) {
            return;
        }
        const map = this.getMap();
        if (map) {
            syncOverlays(map);
        }
    };

    OlMap.prototype.addLayer = function (layer) {
        if (!this.get(WATCH)) {
            watchMap(this);
        }
        return origAddLayer.call(this, layer);
    };
}

install();

export default install;
