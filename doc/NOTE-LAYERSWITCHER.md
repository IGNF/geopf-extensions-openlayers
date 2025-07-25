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

## Voici une explication à ajouter à votre documentation concernant les **actions utilisateurs via l’option `advancedTools`** dans le LayerSwitcher

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
