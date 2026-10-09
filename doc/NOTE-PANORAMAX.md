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

## Essai de migration v4 vers v5.3.1

La page [Panoramax v5.3.1](../samples-src/pages/tests/Panoramax/pages-ol-panoramax-modules-dsfr-v5.3.1.html) utilise le bundle photo `build/cjs/index_photoviewer.js` publié sur jsDelivr. L'exemple v4.4.0 et la `peerDependency` restent inchangés : cet essai ne déclare pas encore une compatibilité générale avec v5.

Le bundle CJS v5.3.1 n'est pas directement interchangeable avec le script standalone v4 :

- Il attend un objet `exports` fourni par son environnement.
- Chargé comme script classique, sa variable globale `ol` écrase celle d'OpenLayers.
- La page de test le charge dans une fonction isolée avec un objet `exports` local, puis attend la promesse `panoramaxReady` avant de créer la carte.
- Aucun ancien fichier `photoviewer.css` n'est chargé dans cette page.

Ce chargeur est expérimental : il nécessite le réseau et `new Function`, incompatible avec une CSP qui interdit `unsafe-eval`. Pour une intégration de production, préférer un import npm traité par le bundler ou le mode ESM avec une import map adaptée, plutôt que d'assouplir la CSP.

### Résultats du test navigateur du 9 octobre 2026

| Vérification | Résultat |
|---|---|
| Enregistrement de `pnx-photo-viewer`, conservation de `ol.Map` | OK avec le chargeur isolé |
| Initialisation de la carte et du contrôle | OK |
| Ouverture de la photo, métadonnées et rendu du panorama | OK |
| Mini-carte OpenLayers | Affichée |
| Masquer puis afficher la photo | OK |
| Retirer puis réinsérer le contrôle et recharger la photo | OK, sans exception JavaScript pendant le scénario v5 |
| Viewport réduit | Photo chargée ; mise en page mobile non validée, légende encombrante et débordement observés |

Le scénario de retrait/réinsertion duplique les widgets de zoom en v4 comme en v5. L'avertissement Photo Sphere Viewer concernant `shouldGoFast` est également présent en v4. Ces problèmes préexistants ne sont pas corrigés par cet essai. Des réponses HTTP 404 de ressources externes ont été observées ; leur impact complet n'a pas été évalué.

Les filtres, le partage, le plein écran et la navigation entre photos n'ont pas été validés. Une compilation de développement des modules a été effectuée via `npm run sample:modules -- --port 8096 --no-open`. ESLint termine sans erreur, avec 959 avertissements sur les sources existantes. Le build de production et la génération de documentation/types n'ont pas été exécutés pour cet essai limité à une page d'exemple.