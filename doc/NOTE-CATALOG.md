# Informations utiles sur le gestionnaire de catalogue (Copilot)

> Questions / Réponses realisées avec Copilot

## Exemples

### Exemple minimal

```js
var catalog = new ol.control.Catalog({
    position: "top-left",
    collapsed : false,
    draggable : true
});
catalog.on("catalog:loaded", (e) => {
    console.log(e);
});
catalog.on("catalog:layer:add", (e) => {
    console.log(e);
});
catalog.on("catalog:layer:remove", (e) => {
    console.log(e);
});
```

---

### Exemple sur la **configuration**

```js
var catalog = new ol.control.Catalog({

});
```

---

### Exemple sur la barre de recherche globale

Affichage de la barre de recherche globale avec un critère de recherche sur le nom des services.

Par défaut, les critère sont : `["name","title","description"]`

```js
var catalog = new ol.control.Catalog({
    search : { 
        display : true,
        label : "Rechercher une donnée sur un service",
        criteria : [
            "service"
        ]
    }
});
```

La recherche est active à partir du 3eme caractère saisi dans la barre de recherche.

---

### Exemple sur les categories

Le filtre sur les catégories permet de regrouper et d’afficher dynamiquement les couches selon un critère, rendant la navigation plus claire et adaptée à chaque besoin utilisateur.

Le **filtre sur les catégories** dans le widget Catalog permet d’afficher uniquement les couches qui correspondent à un critère précis dans chaque onglet (catégorie).

- Chaque catégorie peut définir une propriété `filter` :

  ```js
  filter: {
      field: "service",
      value: "WMTS"
  }
  ```

  Seules les couches dont la propriété `service` vaut `"WMTS"` seront affichées dans cette catégorie.

- Le filtre peut porter sur n’importe quel champ des couches (ex : `service`, `thematic`, `producer`, etc.).
- La valeur peut être une chaîne (`"WMTS"`), un tableau (`["Hydrologie", "Agriculture"]`), ou `"*"` pour tout afficher.

```js
var catalog = new ol.control.Catalog({
categories : [
    {
        title : "Données",
        id : "data"
    },
    {
        title : "WMTS",
        default : false,
        filter : {
            field : "service",
            value : "WMTS"
        }
    },
    {
        title : "WMS",
        filter : {
            field : "service",
            value : "WMS"
        }
    },
    {
        title : "TMS",
        default : true,
        filter : {
            field : "service",
            value : "TMS"
        }
    },
    {
        title : "WFS",
        default : false,
        filter : {
            field : "service",
            value : "WFS"
        }
    }
]
});
```

---

### Exemple sur les sous-categories

Les **sous-catégories** dans le widget Catalog sont des regroupements à l’intérieur d’une catégorie principale.  
Elles apparaissent généralement sous forme de boutons radio ou de sections dans l’interface du catalogue.

- Chaque catégorie peut contenir un tableau `items` qui représente ses sous-catégories.
- Une sous-catégorie possède des propriétés comme :
  - `title` : le nom affiché.
  - `id` : identifiant unique.
  - `default` : indique si elle est sélectionnée par défaut.
  - `section` : si `true`, la sous-catégorie est divisée en sections thématiques.
  - `icon` et `iconJson` : pour afficher des icônes spécifiques aux sections.
  - `filter` : permet de filtrer les couches selon un critère (ex : thématique, producteur…).

- Les sous-catégories permettent de structurer et de filtrer l’affichage des couches dans le catalogue.
- Elles facilitent la navigation et la recherche par regroupement thématique ou fonctionnel.

```js
var catalog = new ol.control.Catalog({
    categories : [
        {
            title : "Données",
            id : "data",
            items : [
                {
                    title : "WMTS",
                    default : true,
                    filter : {
                        field : "service",
                        value : "WMTS"
                    }
                },
                {
                    title : "WMS",
                    filter : {
                        field : "service",
                        value : "WMS"
                    }
                },
                {
                    title : "TMS",
                    filter : {
                        field : "service",
                        value : "TMS"
                    }
                },
                {
                    title : "Tout",
                    filter : null
                }
            ]
        }
    ]
});
```

---

### Exemple sur les sections

Les **sections** dans le widget Catalog sont des regroupements dynamiques à l’intérieur d’une sous-catégorie, souvent utilisés pour organiser les couches par **thème** (ex : "Hydrologie", "Agriculture", "Transports").

- Une sous-catégorie avec `section: true` et un `filter` sur un champ (ex : `thematic`) va créer automatiquement une section pour chaque valeur trouvée dans ce champ parmi les couches.
- Chaque section affiche les couches correspondant à ce thème.
- On peut associer une icône à chaque section via la propriété `iconJson`.
- Les sections facilitent la navigation dans le catalogue en regroupant visuellement les couches par thème ou autre critère.
- Elles permettent d’afficher des icônes et des titres pour chaque groupe, rendant l’interface plus claire et intuitive.

```js
var catalog = new ol.control.Catalog({
    categories : [
        {
            title : "Données",
            id : "data",
            items : [
                {
                    title : "Thème",
                    default : true,
                    section : true,
                    filter : {
                        field : "thematic",
                        value : ["Hydrologie", "Agriculture", "Transports"]
                    },
                    icon: true,
                    iconJson: [
                        { id: "hydro", name: "Hydrologie", icon: "fr-icon-water-fill" },
                        { id: "agri", name: "Agriculture", icon: "fr-icon-leaf-fill" },
                        { id: "trans", name: "Transports", icon: "fr-icon-bus-fill" }
                    ]
                },
                {
                    title : "Producteur",
                    section : true,
                    filter : {
                        field : "producer",
                        value : "*"
                    }
                }
            ]
        }
    ]
});
```

---

## Voici une explication sur la configuration des **catégories**, **sous-catégories** et **sections** dans le widget Catalog

---

### 1. **Catégories**

- **Définition** : Ce sont les onglets principaux du catalogue (ex : "Données", "Cartes", "Images").
- **Propriétés principales** :
  - `title` : Titre affiché dans l’onglet.
  - `id` : Identifiant unique (utilisé pour la gestion interne).
  - `default` : Si `true`, cette catégorie est sélectionnée par défaut à l’ouverture.
  - `search` : Si `true`, affiche une barre de recherche spécifique à la catégorie.
  - `filter` : Permet de filtrer les couches selon un champ et une valeur (ex : `{ field: "thematic", value: "Hydrologie" }`).
  - `items` : Tableau de sous-catégories.

**Exemple** :
```javascript
categories: [
    {
        title: "Données",
        id: "data",
        default: true,
        search: true,
        filter: null,
        items: [ ... ] // sous-catégories
    }
]
```

---

### 2. **Sous-catégories**

- **Définition** : Ce sont des regroupements à l’intérieur d’une catégorie, affichés sous forme de boutons radio.
- **Propriétés principales** :
  - `title` : Titre de la sous-catégorie.
  - `id` : Identifiant unique.
  - `default` : Si `true`, sélectionnée par défaut.
  - `section` : Si `true`, la sous-catégorie est divisée en sections thématiques.
  - `icon` : Si `true`, affiche une icône pour chaque section.
  - `iconJson` : Tableau d’icônes (DSFR ou SVG) pour les sections.
  - `filter` : Filtre appliqué à la sous-catégorie (ex : `{ field: "thematic", value: ["Agriculture", "Transports"] }`).
  - `sections` : Liste des sections (remplie dynamiquement selon le filtre).

**Exemple** :
```javascript
items: [
    {
        title: "Toutes les données",
        id: "all",
        default: true,
        section: false,
        filter: null
    },
    {
        title: "Par thématique",
        id: "thematic",
        section: true,
        icon: true,
        filter: { field: "thematic", value: "*" }
    }
]
```

---

### 3. **Sections**

- **Définition** : Ce sont des regroupements thématiques à l’intérieur d’une sous-catégorie (ex : "Hydrologie", "Agriculture").
- **Fonctionnement** :
  - Si `section: true` et un `filter` est défini, le widget va regrouper les couches selon la valeur du champ du filtre (ex : toutes les couches dont `thematic` vaut "Hydrologie" seront dans la section "Hydrologie").
  - Les icônes des sections sont définies via `iconJson` (mapping entre nom et icône).
  - Les sections sont créées dynamiquement à partir des valeurs présentes dans les couches.

**Exemple** :
```javascript
{
    title: "Par thématique",
    id: "thematic",
    section: true,
    icon: true,
    iconJson: [
        { id: "hydro", name: "Hydrologie", icon: "fr-icon-water-fill" },
        { id: "agri", name: "Agriculture", icon: "fr-icon-leaf-fill" }
    ],
    filter: { field: "thematic", value: "*" }
}
```

---

### **Résumé visuel**

```
Catégorie ("Données")
 └─ Sous-catégorie ("Toutes les données")
 └─ Sous-catégorie ("Par thématique")
      ├─ Section "Hydrologie" (icône)
      ├─ Section "Agriculture" (icône)
      └─ Section "Transports" (icône)
```

---

### **À retenir**

- Les catégories structurent le catalogue en onglets.
- Les sous-catégories permettent des regroupements ou des filtres supplémentaires.
- Les sections regroupent dynamiquement les couches selon une propriété (thématique, producteur, etc.).
- Les icônes DSFR ou SVG peuvent être associées aux sections pour un affichage visuel.

## Voici une explication sur l’option **configuration** du widget Catalog

---

### Option `configuration`

L’option `configuration` permet de définir **comment** et **où** le widget Catalog va récupérer la liste des couches à afficher.  
Elle peut contenir :

- **type** : `"json"` ou `"service"`  
  Indique si la configuration provient d’un ou plusieurs fichiers JSON ou d’un service distant.
- **urls** : Tableau d’URLs de fichiers de configuration JSON à charger (ex : catalogue de couches, métadonnées, etc.).
- **data** : Objet de configuration déjà chargé (optionnel, utile pour injecter directement une config JS).
- **autres propriétés** : Selon le schéma utilisé.

### Exemple :

```javascript
configuration: {
    type: "json",
    urls: [
        "https://raw.githubusercontent.com/IGNF/cartes.gouv.fr-entree-carto/main/public/data/layers.json",
        "https://raw.githubusercontent.com/IGNF/cartes.gouv.fr-entree-carto/main/public/data/edito.json"
    ]
}
```

---

### Fonctionnement

- **Au démarrage**, le widget va charger les fichiers JSON listés dans `urls` (ou utiliser l’objet `data` si fourni).
- Il fusionne les données pour obtenir la liste complète des couches, thématiques, producteurs, etc.
- Il enrichit chaque couche avec des propriétés utiles pour le catalogue (service, catégories, icônes, etc.).
- Il utilise ces données pour construire dynamiquement l’interface du catalogue.

---

### Points importants

- **type** : `"json"` est le plus courant, `"service"` permettrait d’interroger une API distante (non implémenté dans l’exemple).
- **urls** : Tu peux fournir plusieurs fichiers, ils seront fusionnés.
- **data** : Si tu as déjà la configuration en mémoire, tu peux l’injecter directement (pas de chargement réseau).

---

### Résumé

- L’option `configuration` est le cœur du widget Catalog : elle détermine la source et le format des données affichées.
- Elle permet de personnaliser le catalogue selon tes besoins (données locales, distantes, ou injectées dynamiquement).

---

## Voici une explication sur la notion de **Topics** dans le widget Catalog

---

### Qu’est-ce que les Topics ?

Les **Topics** sont des listes de valeurs thématiques, de producteurs ou de services utilisées pour enrichir et organiser les couches du catalogue.  
Ils servent à :
- Regrouper les couches par thématique (ex : "Hydrologie", "Agriculture", "Transports").
- Associer des couches à des producteurs (ex : "IGN", "BRGM", "Météo-France").
- Afficher des icônes ou des liens spécifiques pour chaque thème ou producteur.
- Permettre des filtres ou des regroupements dynamiques dans l’interface du catalogue.

---

### Où sont-ils définis ?

- Les Topics sont généralement stockés dans un fichier JSON (ex : `topics.json`) ou inclus dans la configuration du catalogue (`data.topics`).
- Ils peuvent aussi être injectés localement via le fichier `Topics` importé dans le code :
  ```javascript
  import Topics from "./topics.json";
  ```

---

### Structure typique d’un Topic

Exemple pour les thématiques :

```json
{
  "thematic": [
    { "id": "hydro", "name": "Hydrologie", "icon": "fr-icon-water-fill" },
    { "id": "agri", "name": "Agriculture", "icon": "fr-icon-leaf-fill" },
    { "id": "trans", "name": "Transports", "icon": "fr-icon-bus-fill" }
  ],
  "producer": [
    { "id": "IGN", "name": "IGN", "icon": "fr-icon-map-fill" },
    { "id": "BRGM", "name": "BRGM", "icon": "fr-icon-earth-fill" }
  ],
  "service": [
    { "id": "wmts", "name": "WMTS", "icon": "fr-icon-earth-line" },
    { "id": "wms", "name": "WMS", "icon": "fr-icon-earth-fill" }
  ]
}
```

---

### Utilisation dans le widget Catalog

- **Pour afficher des icônes** :  
  Lorsqu’une sous-catégorie ou une section demande des icônes (`icon: true`), le widget va chercher dans les Topics le mapping entre le nom et l’icône.
- **Pour générer des liens** :  
  Les méthodes comme `getInformationsCatalog("producer", ...)` ou `getInformationsCatalog("thematic", ...)` utilisent les Topics pour construire des URLs ou des fiches détaillées.
- **Pour filtrer ou regrouper** :  
  Les Topics permettent de filtrer les couches selon leur thématique ou producteur, et d’afficher des sections thématiques dynamiques.

---

### Exemple d’utilisation dans le code

```javascript
// Recherche d’une icône pour une thématique
const thematicIcon = Topics.thematic.find(t => t.name === "Hydrologie")?.icon;

// Génération d’un lien vers la fiche producteur
const producerInfo = Topics.producer.find(p => p.name === "IGN");
const url = "https://cartes.gouv.fr/catalogue/search?organization=" + producerInfo.id;
```

---

### Résumé

- Les Topics sont des listes de référence pour enrichir, filtrer et organiser les couches du catalogue.
- Ils permettent d’associer des icônes, des liens et des regroupements thématiques ou producteurs.
- Ils sont utilisés dynamiquement pour l’affichage et la navigation dans le widget Catalog.

---
