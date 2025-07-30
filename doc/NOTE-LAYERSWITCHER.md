# Informations utiles sur le gestionnaire de couches (Copilot)

> Questions / Réponses realisées avec Copilot

## Voici un résumé de l’utilisation de la classe `LayerSwitcher`

### Résumé d’utilisation de la classe LayerSwitcher

La classe `LayerSwitcher` est un contrôle OpenLayers permettant à l’utilisateur de gérer dynamiquement les couches d’une carte :  
- **Afficher/Masquer** les couches,
- **Changer l’ordre** des couches (drag & drop),
- **Modifier l’opacité**,
- **Basculer en niveaux de gris** (pour les couches compatibles),
- **Afficher les informations** (titre, description, légende, métadonnées, aperçu),
- **Zoomer sur l’étendue** d’une couche,
- **Supprimer** une couche,
- **Déclencher des actions avancées** via des outils personnalisés.

### Principales fonctionnalités

- Prend en charge tous types de couches OpenLayers (WMS, WMTS, vecteur, etc.).
- Permet de configurer chaque couche (titre, description, légendes, métadonnées, etc.).
- Gère les événements liés aux couches (ajout, suppression, modification de visibilité, opacité, etc.).
- S’intègre facilement à la carte via `map.addControl(new LayerSwitcher(...))`.
- Offre une API d’événements pour réagir aux actions utilisateur.

### Exemple d’utilisation

```javascript
import LayerSwitcher from "gpf-ext-ol/controls/LayerSwitcher";

const layerSwitcher = new LayerSwitcher({
    layers: [
        {
            layer: myLayer,
            config: {
                title: "Ma couche",
                description: "Description de la couche"
            }
        }
    ],
    options: {
        collapsed: false,
        panel: true,
        counter: true,
        allowEdit: true,
        allowGrayScale: true
    }
});

map.addControl(layerSwitcher);
```

### Événements disponibles

Vous pouvez écouter les événements pour réagir aux actions :

```javascript
layerSwitcher.on("layerswitcher:add", e => console.log("Ajout couche", e.layer));
layerSwitcher.on("layerswitcher:remove", e => console.log("Suppression couche", e.layer));
layerSwitcher.on("layerswitcher:change:opacity", e => console.log("Opacité", e.opacity));
layerSwitcher.on("layerswitcher:change:visibility", e => console.log("Visibilité", e.visibility));
```

---

**En résumé :**  
`LayerSwitcher` facilite la gestion interactive des couches sur une carte OpenLayers, 
tout en offrant de nombreuses options de personnalisation et une API d’événements riche pour les développeurs.

## Voici un résumé des principales options disponibles pour le contrôle **LayerSwitcher**

- **id** : Identifiant unique du widget (utile si plusieurs LayerSwitcher sur la même page).
- **collapsed** *(booléen, défaut : true)* : Définit si le widget est replié (caché) ou déplié au chargement.
- **draggable** *(booléen)* : Permet de déplacer le panneau du LayerSwitcher à la souris.
- **counter** *(booléen)* : Affiche un compteur du nombre de couches visibles.
- **panel** *(booléen)* : Affiche un en-tête (header) dans le panneau du LayerSwitcher.
- **gutter** *(booléen)* : Ajoute ou retire l’espace (gutter) autour du panneau.
- **allowEdit** *(booléen, défaut : true)* : Affiche le bouton d’édition pour les couches éditables (vecteur).
- **allowGrayScale** *(booléen, défaut : true)* : Affiche le bouton N&B (niveaux de gris) pour les couches compatibles.
- **allowTooltips** *(booléen, défaut : false)* : Active l’affichage des info-bulles (tooltips) sur les éléments du widget.
- **advancedTools** *(array)* : Liste d’outils personnalisés à afficher pour chaque couche (boutons d’action, icônes, callbacks, etc.).
- **layers** *(array)* : Liste des couches à configurer à l’initialisation, chaque entrée pouvant contenir :
  - **layer** : Objet `ol.layer.Layer` à gérer.
  - **config** : Métadonnées associées (titre, description, légendes, métadonnées, quicklookUrl, etc.).

---

**Résumé** :  
Les options du LayerSwitcher permettent de personnaliser l’apparence, le comportement, les fonctionnalités et les actions disponibles pour chaque couche, afin d’adapter le widget à vos besoins cartographiques et ergonomiques.

## Voici un exemple complet d’utilisation du contrôle **LayerSwitcher** avec OpenLayers

````javascript
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {fromLonLat} from 'ol/proj';
import LayerSwitcher from 'src/packages/Controls/LayerSwitcher/LayerSwitcher.js';

// Création des couches
const osmLayer = new TileLayer({
    source: new OSM(),
    visible: true,
    opacity: 1,
    title: 'Fond OpenStreetMap'
});

const vectorLayer = new VectorLayer({
    source: new VectorSource(),
    visible: true,
    opacity: 0.7,
    title: 'Annotations'
});

// Création de la carte
const map = new Map({
    target: 'map',
    layers: [osmLayer, vectorLayer],
    view: new View({
        center: fromLonLat([2.35, 48.85]), // Paris
        zoom: 12
    })
});

// Ajout du LayerSwitcher avec options et métadonnées
const layerSwitcher = new LayerSwitcher({
    layers: [
        {
            layer: osmLayer,
            config: {
                title: "Fond OpenStreetMap",
                description: "Fond cartographique OSM",
                locked: true // couche verrouillée
            }
        },
        {
            layer: vectorLayer,
            config: {
                title: "Annotations",
                description: "Couches d’annotations éditables"
            }
        }
    ],
    options: {
        collapsed: false,
        panel: true,
        counter: true,
        allowEdit: true,
        allowGrayScale: true,
        allowTooltips: true,
        advancedTools: [
            {
                label: 'Exporter',
                icon: '📤',
                cb: (e, instance, layer, options) => {
                    alert("Export de la couche : " + layer.get("title"));
                }
            },
            {
                label: 'Info',
                icon: '<svg width="16" height="16" fill="currentColor"><circle cx="8" cy="8" r="7" stroke="black" stroke-width="1" fill="none"/><text x="8" y="12" text-anchor="middle" font-size="10" fill="black">i</text></svg>',
                // Pas de cb : déclenche l'événement layerswitcher:custom
            }
        ]
    }
});

map.addControl(layerSwitcher);

// Exemple d’écoute d’événements
layerSwitcher.on("layerswitcher:add", function (e) {
    console.log("Couche ajoutée :", e.layer);
});
layerSwitcher.on("layerswitcher:remove", function (e) {
    console.log("Couche supprimée :", e.layer);
});
layerSwitcher.on("layerswitcher:edit", function (e) {
    alert("Edition de la couche : " + e.layer.get("title"));
});
layerSwitcher.on("layerswitcher:custom", function (e) {
    alert("Action personnalisée sur : " + e.layer.get("title") + " (" + e.action + ")");
});
````

**À placer dans une page HTML avec un conteneur** :

```html
<div id="map" style="width:100%;height:600px;"></div>
<script type="module" src="example-layerswitcher.js"></script>
```

---

**Ce que montre cet exemple :**
- Création de couches raster et vecteur,
- Ajout de métadonnées (titre, description, verrouillage),
- Activation des options avancées (édition, N&B, tooltips, outils personnalisés),
- Gestion des événements du LayerSwitcher,
- Utilisation d’outils avancés avec ou sans callback.

Cet exemple est prêt à l’emploi pour tester toutes les fonctionnalités principales du LayerSwitcher.

## Voici une explication sur l’objet `layerOptions` dans le LayerSwitcher

### Fonctionnement de l’objet `layerOptions`

L’objet `layerOptions` est une structure centrale utilisée en interne par le LayerSwitcher pour stocker toutes les informations et états associés à chaque couche affichée dans le widget.

### Où est-il créé ?
`layerOptions` est construit dans la méthode privée `_createLayerDiv(layerOptions)` et lors de l’ajout d’une couche via `addLayer` ou `_addMapLayers`.  
Il regroupe à la fois :
- les propriétés de la couche OpenLayers (`layer`, `id`, `opacity`, `visibility`, etc.),
- les métadonnées de configuration (titre, description, légendes, etc.),
- les états d’interface (editable, grayable, inRange, locked, etc.),
- les références DOM (div associée à la couche).

### Principaux champs de `layerOptions` :

- **layer** : la référence à l’objet `ol.layer.Layer` concerné.
- **id** : identifiant unique de la couche dans le LayerSwitcher.
- **name, service, type** : informations complémentaires (souvent pour les couches Geoportail).
- **opacity, visibility, grayscale, locked** : états d’affichage de la couche.
- **inRange** : indique si la couche est visible dans la vue courante (zoom/emprise).
- **title, description** : informations affichées dans la liste et les tooltips.
- **legends, metadata, quicklookUrl** : ressources associées à la couche.
- **editable, grayable** : indique si la couche est éditable ou peut passer en N&B.
- **advancedTools** : liste des outils personnalisés à afficher pour la couche.
- **div** : référence à la div DOM représentant la couche dans le LayerSwitcher.

### Utilité

- Permet de centraliser toutes les informations nécessaires à l’affichage, à l’interaction et à la gestion de chaque couche dans le widget.
- Facilite la synchronisation entre l’état de la carte, la configuration utilisateur et l’interface graphique.
- Sert de point d’accès unique pour toutes les opérations (édition, suppression, changement d’opacité, etc.).

---

**Résumé :**  
`layerOptions` est l’objet de référence pour chaque couche dans le LayerSwitcher : il regroupe toutes les données, états et références nécessaires à la gestion et à l’affichage de la couche dans le widget.

## Voici une explication sur la notion de couches « grisées » (hors plage de visibilité, via `isInRange`) dans la classe `LayerSwitcher`

### Couches grisées (isInRange)

Dans le widget **LayerSwitcher**, une couche peut apparaître « grisée » dans la liste des couches. Cela signifie que la couche n’est **pas visible** dans la vue courante de la carte, pour l’une des raisons suivantes :

- **Niveau de zoom inadapté** :  
  La résolution actuelle de la carte (zoom) ne correspond pas à la plage de zoom définie pour la couche (`minResolution`/`maxResolution`).  
  Exemple : une couche n’est visible qu’à grande échelle, mais l’utilisateur est trop dézoomé.

- **Étendue géographique non couverte** :  
  L’emprise actuelle de la carte (la zone affichée) ne recoupe pas l’étendue spatiale définie pour la couche (`extent`).  
  Exemple : la couche ne couvre que la France, mais l’utilisateur regarde l’Afrique.

### Fonctionnement dans le code

La méthode `isInRange(layer, map)` vérifie ces deux critères :
- Si la résolution de la carte est hors de la plage de la couche, ou
- Si l’étendue de la carte n’intersecte pas celle de la couche.

Si l’un de ces cas est vrai, la couche est considérée comme « hors plage » et la classe CSS `outOfRange` est ajoutée à son élément DOM dans la liste.  
Visuellement, cela la grise et affiche un message d’information au survol.

### Utilité

- **Informer l’utilisateur** que la couche n’est pas visible dans la vue courante, sans la masquer de la liste.
- **Éviter la confusion** : l’utilisateur comprend pourquoi une couche n’apparaît pas sur la carte.
- **Accessibilité** : un message d’info est ajouté au survol du nom de la couche.

---

**Résumé :**  
Une couche « grisée » dans le LayerSwitcher indique qu’elle n’est pas visible à cause du zoom ou de l’emprise courante. Cela améliore l’expérience utilisateur en rendant explicite la raison de l’absence de la couche sur la carte.

## Voici une explication concernant les couches verrouillées dans le LayerSwitcher

### Couches verrouillées (locked)

Dans le widget **LayerSwitcher**, une couche peut être affichée comme « verrouillée ».  
Cela signifie que certaines actions sur cette couche sont désactivées pour l’utilisateur, généralement pour éviter sa suppression ou la modification de ses propriétés essentielles.

### Fonctionnement

- Une couche verrouillée affiche une icône de cadenas ou un indicateur visuel spécifique dans la liste des couches.
- Les boutons d’action associés à la couche (suppression, édition, modification de visibilité, etc.) peuvent être désactivés ou masqués.
- Le verrouillage peut être défini lors de la configuration de la couche, par exemple via une propriété `locked: true` dans la configuration passée au LayerSwitcher.

### Utilité

- **Protéger les couches critiques** : Empêcher la suppression ou la modification accidentelle de couches de fond, de référence ou indispensables à l’application.
- **Clarifier l’interface** : L’utilisateur comprend immédiatement qu’il ne peut pas agir sur cette couche, ce qui évite les erreurs et la confusion.

### Exemple de configuration

```javascript
const layerSwitcher = new LayerSwitcher({
    layers: [
        {
            layer: baseLayer,
            config: {
                title: "Fond de carte",
                locked: true // Cette couche sera verrouillée
            }
        }
    ]
});
```

---

**Résumé :**  
Une couche verrouillée dans le LayerSwitcher est protégée contre certaines actions utilisateur (suppression, édition, etc.), ce qui garantit la stabilité et la cohérence de la carte affichée.

## Voici une explication concernant les couches dites **éditables** dans le LayerSwitcher

### Couches éditables (editable)

Dans le widget **LayerSwitcher**, une couche peut être marquée comme « éditable ».
Cela signifie que l’utilisateur a la possibilité de modifier le contenu ou le style de cette couche directement depuis l’interface du LayerSwitcher.

### Fonctionnement

- Une couche éditable affiche un bouton ou une icône d’édition dans la liste des couches.
- En cliquant sur ce bouton, l’utilisateur peut accéder à des outils permettant :
  - d’ajouter, modifier ou supprimer des objets géographiques (pour les couches vecteur),
  - de changer le style ou les propriétés de la couche,
  - ou d’ouvrir un panneau d’édition dédié selon la configuration.
- L’éditabilité est généralement activée pour les couches de type vecteur, via une propriété `allowEdit: true` dans la configuration du LayerSwitcher ou de la couche.

### Utilité

- **Permettre la saisie ou la correction de données** directement sur la carte.
- **Personnaliser l’apparence** ou le contenu d’une couche sans quitter l’application.
- **Faciliter la gestion collaborative** des données cartographiques.

### Exemple de configuration

```javascript
const layerSwitcher = new LayerSwitcher({
    layers: [
        {
            layer: vectorLayer,
            config: {
                title: "Annotations",
                // L’option allowEdit peut aussi être définie globalement dans options
            }
        }
    ],
    options: {
        allowEdit: true // Active l’édition pour les couches compatibles
    }
});
```

---

**Résumé :**  
Une couche éditable dans le LayerSwitcher permet à l’utilisateur de modifier son contenu ou son style via l’interface, principalement pour les couches vecteur, ce qui enrichit l’interactivité et la personnalisation de la carte.

## Voici une explication concernant les couches en mode **N&B** (niveaux de gris) dans le LayerSwitcher

### Couches en mode N&B (niveaux de gris)

Dans le widget **LayerSwitcher**, certaines couches peuvent être affichées en mode « noir et blanc » (N&B), aussi appelé mode **niveaux de gris**.  
Cette fonctionnalité permet de désaturer l’affichage d’une couche pour la rendre visuellement moins dominante ou pour mettre en valeur d’autres informations cartographiques superposées.

### Fonctionnement

- Un bouton ou une option « N&B » (grayscale) est disponible pour chaque couche compatible (principalement les couches raster, comme WMS ou WMTS).
- Lorsque l’utilisateur active ce mode, la couche est affichée en niveaux de gris sur la carte.
- Techniquement, cela peut être réalisé via un filtre CSS appliqué au rendu de la couche, ou via une modification du style côté serveur ou client.
- L’état N&B est conservé tant que l’utilisateur ne le désactive pas.

### Utilité

- **Améliorer la lisibilité** : Le mode N&B permet de faire ressortir des couches thématiques ou des annotations colorées en atténuant le fond cartographique.
- **Personnalisation** : L’utilisateur peut adapter l’apparence des couches selon ses besoins d’analyse ou de présentation.
- **Accessibilité** : Peut aider certains utilisateurs à mieux distinguer les informations importantes.

### Exemple de configuration

```javascript
const layerSwitcher = new LayerSwitcher({
    layers: [
        {
            layer: rasterLayer,
            config: {
                title: "Ortho N&B"
            }
        }
    ],
    options: {
        allowGrayScale: true // Active le bouton N&B pour les couches compatibles
    }
});
```

---

**Résumé :**  
Le mode N&B dans le LayerSwitcher permet d’afficher certaines couches en niveaux de gris, offrant ainsi une meilleure lisibilité et une personnalisation avancée de la carte pour l’utilisateur.

## Voici une explication concernant les **actions utilisateurs via l’option `advancedTools`** dans le LayerSwitcher

### Actions utilisateurs via l’option `advancedTools`

L’option **`advancedTools`** du LayerSwitcher permet d’ajouter des boutons ou outils personnalisés pour chaque couche dans la liste des couches.  
Ces outils offrent à l’utilisateur des actions avancées ou spécifiques, adaptées à vos besoins métier.

### Fonctionnement

- L’option `advancedTools` est un tableau d’objets, chaque objet représentant un outil personnalisé.
- Pour chaque outil, vous pouvez définir :
  - `label` : le texte affiché sur le bouton,
  - `icon` : une icône SVG ou une URL d’image,
  - `cb` : une fonction callback exécutée lors du clic sur l’outil (reçoit en paramètres l’événement, le LayerSwitcher, la couche concernée, et les options de l’outil),
  - `styles` : des styles CSS personnalisés pour le bouton.
- Les outils apparaissent dans l’interface du LayerSwitcher, à côté de chaque couche.

### Utilité

- **Ajouter des fonctionnalités spécifiques** à vos couches (export, analyse, affichage de popups, etc.).
- **Personnaliser l’expérience utilisateur** en proposant des actions adaptées à chaque couche.
- **Centraliser les outils** liés à la gestion des couches dans une interface unique.

### Exemple de configuration

```javascript
const layerSwitcher = new LayerSwitcher({
    layers: [
        {
            layer: myLayer,
            config: {
                title: "Ma couche"
            }
        }
    ],
    options: {
        advancedTools: [
            {
                label: "Exporter",
                icon: "📤",
                cb: (e, layerSwitcher, layer, options) => {
                    // Action personnalisée à exécuter
                    alert("Export de la couche : " + layer.get("title"));
                },
                styles: {
                    color: "blue"
                }
            }
        ]
    }
});
```

### Exemples de possibilités des actions utilisateurs (`advancedTools`)

L’option `advancedTools` permet d’ajouter une grande variété de boutons d’action personnalisés pour chaque couche dans le LayerSwitcher.  
Voici quelques exemples concrets :

- **Bouton avec icône SVG inline**  
  Permet d’ajouter un bouton avec une icône vectorielle personnalisée et une action JavaScript :
  ```javascript
  {
      label: 'One',
      icon: '<svg ...></svg>',
      cb: (e, instance, layer, options) => {
          console.log("Action One", e, instance, layer, options);
      }
  }
  ```

- **Bouton sans icône (icône par défaut)**  
  Un simple bouton texte qui déclenche une action :
  ```javascript
  {
      label: 'Two',
      cb: (e, instance, layer, options) => {
          console.log("Action Two", e, instance, layer, options);
      }
  }
  ```

- **Bouton avec icône depuis une URL**  
  Pratique pour réutiliser des pictogrammes existants :
  ```javascript
  {
      label: 'Three',
      icon: 'url/vers/mon-icone.svg',
      cb: () => window.history.back()
  }
  ```

- **Bouton de notification ou d’intégration avec d’autres systèmes**  
  Par exemple, pour publier un événement ou notifier l’application :
  ```javascript
  {
      label: 'Four',
      icon: '<svg ...></svg>',
      cb: (e, instance, layer, options) => {
          // Publier une notification, ouvrir un panneau, etc.
      }
  }
  ```

- **Bouton stylisé**  
  Vous pouvez personnaliser le style du bouton via la propriété `styles` :
  ```javascript
  {
      label: 'Exporter',
      icon: '📤',
      cb: (e, instance, layer, options) => {
          alert("Export de la couche : " + layer.get("title"));
      },
      styles: {
          color: "blue"
      }
  }
  ```

- **Bouton avec un icone dsfr**  
  Permet d'utiliser les icones du DSFR :
  ```javascript
  {
      label: 'Exporter',
      icon: 'fr-icon-export',
      cb: (e, instance, layer, options) => {
          alert("Export de la couche : " + layer.get("title"));
      },
      styles: {
          color: "blue"
      }
  }
  ```

Si l’option `cb` n’est pas renseignée dans un objet `advancedTools`, le bouton est tout de même affiché et, lors du clic, **un événement personnalisé est déclenché** par le LayerSwitcher (généralement `layerswitcher:custom`).  
Cet événement contient les informations sur le bouton cliqué, la couche concernée, etc.

**Exemple d’utilisation :**

```javascript
layerSwitcher.on("layerswitcher:custom", (e) => {
    // e contient : event, layerSwitcher, layer, options (du bouton)
    console.log("Action custom déclenchée :", e);
});
```

Cela permet de centraliser la gestion des actions non définies directement par une fonction `cb`, et d’ajouter des comportements dynamiques ou contextuels selon le bouton cliqué.

---

**Résumé :**  
L’option `advancedTools` du LayerSwitcher permet d’ajouter facilement des boutons d’action personnalisés pour chaque couche, afin d’enrichir l’interface et de proposer des fonctionnalités avancées adaptées à vos besoins.

## Voici une explication détaillée du fonctionnement des **tooltips** dans le LayerSwitcher

---

### Fonctionnement des tooltips dans le LayerSwitcher

Le LayerSwitcher propose une option `allowTooltips` qui permet d’afficher des info-bulles (tooltips) sur les éléments de l’interface, afin d’améliorer l’ergonomie et l’accessibilité.

### Initialisation

- Lors de l’ajout du contrôle à la carte (`setMap`), si l’option `allowTooltips` est activée, le module `ToolTips` initialise un conteneur HTML dédié pour les info-bulles.
- Ce conteneur est un `<div>` positionné en absolu, stylisé pour ressembler à une info-bulle classique.

### Activation sur les éléments

- Chaque nom de couche du LayerSwitcher recoit un attribut `data-tooltip` contenant le texte à afficher.
- Le module `ToolTips` ajoute des écouteurs d’événements `mouseenter` et `mouseleave` sur ces éléments :
  - Au survol (`mouseenter`), le contenu du tooltip est affiché près du curseur.
  - À la sortie (`mouseleave`), le tooltip disparaît.

### Contenu des tooltips

- Pour le nom d’une couche, le tooltip affiche généralement le titre complet ou la description.
- Pour les couches hors plage ou verrouillées, un message spécifique explique la raison de l’état.

### Utilité

- **Accessibilité** : Les tooltips aident à comprendre la fonction de chaque élément, même sans documentation.
- **Aide contextuelle** : Ils fournissent des explications sur l’état ou l’action possible.
- **Ergonomie** : Ils évitent la surcharge visuelle tout en offrant une aide à la demande.

### Exemple d’activation

```javascript
const layerSwitcher = new LayerSwitcher({
    options: {
        allowTooltips: true // Active l’affichage des tooltips
    }
});
```

---

**Résumé :**  
Les tooltips dans le LayerSwitcher sont des info-bulles contextuelles qui s’affichent au survol des éléments, facilitant la compréhension et l’utilisation du gestionnaire de couches, notamment pour les utilisateurs novices ou en situation de handicap.
