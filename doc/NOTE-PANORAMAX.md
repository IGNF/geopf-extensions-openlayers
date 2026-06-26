# Fonctionnement du widget **Panoramax**

---

## Architecture générale

Le widget est une classe `Panoramax extends Control` (OpenLayers) composée de
deux fichiers :

- Panoramax.js — logique principale (~2800 lignes)
- PanoramaxDOM.js — génération du DOM

---

## Cycle de vie

### 1. Construction

```
constructor → initialize() → initContainer()
```

- `initialize()` : stocke les options, crée les propriétés d'état (`collapsed`, `hover`, `auto`, références DOM, listeners…)
- `initContainer()` : construit tout le DOM — deux panneaux principaux :
  - **`panelPanoramaxViewerContainer`** : le visualiseur de photos
  - **`panelPanoramaxButtonsContainer`** : les boutons de contrôle (filtres, contributions, fond de carte…)

### 2. Attachement à la carte (`setMap`)

- Active le mode **draggable** si besoin
- Déclenche l'ouverture si `collapsed: false`
- Appelle `addEventsListeners(map)` si `auto: true` (écoute `click` et `pointermove`)

### 3. Ouverture du panneau (`onShowPanoramaxClick`)

Appelle `load()` qui enchaîne de façon asynchrone :

1. `setLayerGroup()` — crée un `LayerGroup` OL pour regrouper les couches
2. `setBackground()` — charge une couche de fond (style Mapbox Vector)
3. `setLayer()` — charge la couche Panoramax (TMS vecteur `MapboxVectorLayer`)
4. `initButtons()` — affiche le panneau des boutons
5. `initVisualizationWindow()` → `setSizeWindow()` — applique la taille (small/medium/large/fullscreen/fullscreen-map)
6. `initPhotoViewer()` — crée le web component `<pnx-photo-viewer>` et ses widgets

### 4. Fermeture (`reset`)

Supprime les couches, réinitialise le viewer, les boutons, les overlays de prévisualisation.

---

## Interactions carte

| Événement | Comportement |
|---|---|
| `click` sur `pictures` | Ouvre le viewer avec `displayPhotoViewer(sequenceId, pictureId)` |
| `click` sur `grid` | Zoom +4 niveaux |
| `click` sur `sequences` | Zoom +2 niveaux |
| `pointermove` (debounce 300ms) | Affiche une popup de prévisualisation (`displayPreview`) si `hover: true` |

---

## Viewer de photos

Basé sur le web component `<pnx-photo-viewer>` de `@panoramax/web-viewer`. Des widgets personnalisés y sont injectés via des slots :

- `pnx-button` (retour, fermeture, plein écran) → slots `top-left`/`top-right`/`bottom-right`
- `pnx-widget-zoom`
- `pnx-picture-legend`

Au `ready`, certains widgets natifs sont supprimés (`pnx-widget-player`, `pnx-annotations-switch`, `pnx-bottom-drawer`).

---

## Filtres (couche Mapbox)

Les filtres modifient directement le JSON de style Mapbox de la couche, puis rappellent `applyStyle()` de `ol-mapbox-style` :
- **Type** : filtre `["==", ["get", "type"], "flat"|"equirectangular"]` sur les couches `pictures` et `sequences`
- **Dates** : filtre `[">=", "ts", ...]` / `["<=", "ts", ...]`
- **Période** : calcule un intervalle de dates avec `date-fns/subMonths`
- **Reset** : réapplique `originalStyleLayerPanoramax` (snapshot du style initial)

> ⚠️ Limites connues : les filtres ne sont **pas cumulatifs** (chaque filtre écrase le précédent).

---

## Modes de fenêtre (`setSizeWindow`)

| Mode | Comportement |
|---|---|
| `small/medium/large` | Classes CSS fixes, `stopMapViewportSync()` |
| `fullscreen` | `<dialog>` en position fixe 100vw×100vh |
| `fullscreen-map` | Synchronise position/taille avec `map.getViewport().getBoundingClientRect()` via `startMapViewportSync()` (écoute `resize`, `scroll`, `change:size`) |