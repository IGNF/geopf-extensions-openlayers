# Fonctionnement du widget **Panoramax**

## Architecture et cycle de vie

`ol.control.Panoramax` étend `ol.control.Control`. Son implémentation se trouve dans `src/packages/Controls/Panoramax/` :

- `Panoramax.js` pilote les couches OpenLayers, le viewer et les interactions ;
- `PanoramaxDOM.js` construit les panneaux et boutons ;
- `PictureLegendWidget.js` fournit la légende, le géocodage inverse et le lien de partage ;
- `PnxMiniMapWidget.js` ajoute une mini-carte au viewer.

À la construction, le contrôle initialise ses options et son DOM. Lors de l'ouverture, il charge le groupe de couches Panoramax, le fond optionnel, le panneau d'options, la fenêtre de visualisation et le composant `<pnx-photo-viewer>`. Le viewer est créé une seule fois par instance ; son cycle de vie est nettoyé lors d'un retrait de la carte afin de permettre un `map.removeControl()` suivi d'un `map.addControl()`.

`collapsed: false` ouvre le contrôle dès son attachement. Avec `auto: true` (valeur par défaut), les écouteurs de clic et de survol sont ajoutés automatiquement à la carte.

## Configuration utile

```js
var panoramax = new ol.control.Panoramax({
  collapsed: true,
  auto: true,
  hover: true,
  position: "bottom-left",
  layer: {
    url: "https://api.panoramax.xyz/api/map/style.json",
    name: "Panoramax"
  },
  background: {
    active: false
  },
  buttonsWindow: {
    filters: {
      display: true,
      exclusive: false,
      content: { types: true, dates: true, periodes: true }
    }
  },
  visualizationWindow: {
    size: "fullscreen-map"
  },
  viewer: {
    endpoint: "https://explore.panoramax.fr/api",
    share: {
      url: "https://cartes.gouv.fr/explorer-les-cartes/",
      type: "geoplateforme"
    },
    pnxOptions: {
      psvOptions: {}
    }
  }
});

map.addControl(panoramax);
```

Les cibles expérimentales `buttonsWindow.target` et `visualizationWindow.target` acceptent un `HTMLElement`, un identifiant ou un sélecteur CSS. L'option `viewer.pnxOptions.psvOptions` est affectée à la propriété `psv-options` du web component ; ne pas la transmettre avec `setAttribute`.

## Interactions avec la carte

| Couche | Comportement par défaut au clic |
|---|---|
| `grid` | Zoom sur la position sélectionnée |
| `sequences` | Zoom ou recentrage vers le niveau 17 |
| `pictures` | Ouvre l'image dans le viewer |

Les interactions se configurent avec `interactions.grid`, `interactions.sequences` et `interactions.pictures`, chacun possédant `active` et `actions`. Le survol affiche une prévisualisation lorsque `hover: true`.

## Ouverture programmée

Une image peut être ouverte depuis une URL ou une action externe en définissant, dans cet ordre, les propriétés OpenLayers `sequence`, `picture` et `display` :

```js
panoramax.setCollapsed(false);
panoramax.set("sequence", sequenceId);
panoramax.set("picture", pictureId);
panoramax.set("display", true);
```

Si le viewer n'est pas encore prêt, le contrôle attend l'événement `pnx:ready` avant de sélectionner l'image. Pour fermer le viewer sans fermer le contrôle, utiliser `panoramax.set("display", false)`.

## Viewer et partage

Le widget repose sur `<pnx-photo-viewer>` de `@panoramax/web-viewer`. Les widgets optionnels sont `btnBack`, `btnClose`, `btnZoom`, `btnFullscreen`, `cmpPictureLegend` et `cmpMinimap`. Au signal `ready` du viewer, les widgets natifs Player, annotations et légende basse sont retirés au profit des composants intégrés au contrôle.

`viewer.share` configure le lien affiché dans la légende personnalisée :

| `type` | URL produite |
|---|---|
| `panoramax` (défaut) | URL Explore Panoramax avec `pic`, `seq` et la position courante |
| `geoplateforme` | URL `.../photo/{sequence}/{picture}/{lat},{lon}/{zoom}` |

`viewer.share.url` permet de remplacer la base utilisée pour le type choisi. Les identifiants et les coordonnées sont encodés lors de la construction du lien.

## Filtres

Les filtres modifient le style Mapbox de la couche puis appliquent le style mis à jour avec `applyStyle()` : type d'image, intervalle de dates et période relative. Le bouton de réinitialisation restaure le style initial de la couche.

`buttonsWindow.filters.exclusive` contrôle leur combinaison : à `true` (défaut), l'activation d'un filtre désactive les autres ; à `false`, les filtres actifs sont cumulés.

## Événements publics

| Événement | Déclenchement |
|---|---|
| `pnx:opened` / `pnx:closed` | Ouverture ou fermeture du contrôle |
| `pnx:ready` | Viewer initialisé et prêt à être utilisé |
| `pnx:fullscreen` | Changement du mode plein écran |
| `pnx:data:clicked` / `pnx:data:hovered` | Interaction avec une entité Panoramax |
| `pnx:filter:init`, `pnx:filter:dates`, `pnx:filter:periode`, `pnx:filter:type`, `pnx:filter:render` | Initialisation ou application d'un filtre |

Les changements des propriétés `picture`, `sequence` et `display` émettent respectivement `change:picture`, `change:sequence` et `change:display`.

## Modes de fenêtre

| Mode | Comportement |
|---|---|
| `small`, `medium`, `large` | Taille fixe via classe CSS |
| `fullscreen` | `<dialog>` fixe sur toute la fenêtre (`100dvw` x `100dvh`) |
| `fullscreen-map` | Fenêtre calée sur `map.getViewport()` et resynchronisée lors de `resize`, `scroll` et `change:size` |

## Migration de Panoramax v4.4.0 vers v5.3.1

Le widget requiert `@panoramax/web-viewer` `^5.3.1` (`peerDependency`). Le code du contrôle n'importe pas la bibliothèque : l'application doit enregistrer les web components `pnx-*` avant la création du contrôle.

La v5 n'est plus distribuée en script autonome `photoviewer.js` + `photoviewer.css` : le CSS est embarqué dans les composants et le champ `exports` du package ne publie que `.` (ESM). Selon l'environnement :

| Environnement | Chargement |
|---|---|
| Application avec bundler (Vite, Webpack) | `import "@panoramax/web-viewer";` |
| Page HTML sans bundler | Bundle `build/cjs/index_photoviewer.js` encapsulé, voir ci-dessous |
| Page HTML avec modules ES | `build/esm/index.js` et import map ([documentation Panoramax](https://docs.panoramax.fr/web-viewer/)) |

Le bundle CJS ne peut pas être chargé tel quel par `<script>` : il attend un objet `exports` et sa variable globale `ol` écrase OpenLayers. Les exemples utilisent donc [photoviewer.js](../samples-src/resources/vendor/panoramax/v5.3.1/photoviewer.js), généré à partir de `node_modules/@panoramax/web-viewer/build/cjs/index_photoviewer.js` : le code est placé dans une IIFE qui définit `exports` localement et expose `window.Panoramax`, sans `eval` ni CSS séparé.

```html
<script src="photoviewer.js"></script>
```

Les exemples [v4.4.0](../samples-src/pages/tests/Panoramax/pages-ol-panoramax-modules-dsfr-v4.4.0.html) et [v5.3.1](../samples-src/pages/tests/Panoramax/pages-ol-panoramax-modules-dsfr-v5.3.1.html) permettent de comparer les deux versions.

