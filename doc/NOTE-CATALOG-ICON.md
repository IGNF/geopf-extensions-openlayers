# Notion d'icone pour les sections du composant Catalog

Ce document aborde la **configuration des icônes pour les sections**, offrant la
possibilité d'attribuer des icônes spécifiques ou par défaut.

Il **décrit les différentes méthodes pour définir ces configurations**,
qu'elles soient absentes, spécifiques à une section, ou gérées globalement.

Le format des icônes doit adhérer au standard DSFR (`fr-icon-*`).

Le texte **détaille comment les options de recherche de configuration peuvent être
établies**, par exemple via une URL, un objet JSON, ou un fichier local.
Enfin, il **présente les emplacements possibles pour ces configurations**,
incluant des fichiers spécifiques, le fichier de configuration principal
(ex. `entreeCarto.json`), ou des valeurs par défaut internes au composant.

Pour spécifier et rechercher les configurations d'icônes spécifiques à une section,
plusieurs options sont disponibles, permettant une flexibilité quant à l'emplacement 
et la méthode de récupération de ces configurations.

### Activation des icônes de section

Avant de parler des options de configuration, il est important de noter que les
icônes de section sont utilisées si l'option **`icon=true`** est activée pour
une catégorie avec regroupement par section (**`section=true`**).

### Options pour spécifier la configuration d'une section

La configuration d'icônes pour une section peut être gérée de deux manières principales :

1. **Absente** : la **configuration principale par défaut** est utilisée.
2. **Spécifique à la section** : cela nécessite d'interroger une configuration
   locale ou distante propre à cette section.
  
Un format de configuration doit être spécifié pour des sections spécifiques 
comme "thème" et "producteur".

### Sources de configuration possibles

La configuration d'une section peut résider à plusieurs endroits :

* Dans un **fichier spécifique**.
* Dans le **fichier de configuration principale**, tel que `entreeCarto.json`.

Si la configuration d'une section n'est pas trouvée, on utilise la configuration interne au composant lui-même.

### Options de recherche des configurations spécifiques

Il est nécessaire de mettre en place des options pour rechercher ces configurations.
Voici les mécanismes de recherche :

* **Recherche par défaut (si aucune option n'est spécifiée)** :

    Si aucune option de configuration n'est renseignée, le composant interrogera
    par défaut le fichier **`entreeCarto.json`**.
    Si les configurations spécifiques (comme `thematic`, `producer`, etc.)
    sont présentes dans ce fichier, elles seront prises en compte.

* **Recherche via une option de configuration (ex: `option iconJson`)** :

    Pour une configuration fournie directement sous forme de données JSON.

Si une option de configuration est renseignée, mais aucune donnée n'est trouvée, cela déclenche un import dynamique des fichiers JSON locaux.

---

Voici un exemple de la manière dont la section `producer` serait structurée au sein d'un fichier de configuration (comme `entreeCarto.json` s'il n'y a pas d'option spécifique renseignée) :

```json
{
  // ... autres configurations ...

  "thematic": [
    // ... configuration spécifique aux thèmes ...
  ],

  "producer": [
    {
      "id": "ministere-transition",
      "name": "Ministère de la Transition Écologique",
      "icon": "fr-icon-government-line"
    },
    {
      "id": "insee",
      "name": "INSEE",
      "icon": "fr-icon-pie-chart-line"
    }
  ],

  // ... autres configurations ...
}
```

avec

```json
{
  "categories": [
    {
      "title": "Toutes les cartes",
      "id": "data",
      "search": true,
      "items": [
        {
          "title": "Producteur",
          "default": true,
          "section": true,
          "icon": true, // Active l'utilisation des icônes pour cette section
          "filter": {
            "field": "producer", // La clef !
            "value": "*"
          }
        }
      ]
    }
  ]
}
```

Dans cet exemple :

* La clé `"producer"` est un **point d'entrée** dans la configuration, comme mentionné par la source.
* Le contenu du tableau associé à `"producer"` (`[...]`) serait la définition des configurations pour les différents producteurs.
* Pour que ces icônes soient affichées, la catégorie correspondante dans la section `categories` doit avoir l'option **`icon: true`** activée.

Les options de recherche pour ces configurations peuvent inclure des URLs, des objets JSON directs ou un mot-clé `"internal"` pour une configuration interne au composant.

---

Les mécanismes de configuration et les sources des icônes pour la section **`thematic`** sont identiques à ceux de la section `producer`, à la différence majeure, à savoir la **notion de traduction Anglais -> Français du nom de la thématique**.

Un exemple de configuration de catégorie montre comment cela est activé pour les "Thèmes" :

```json
{
  // ... autres configurations ...

  "categories": [
    {
      "title": "Toutes les cartes",
      "id": "data",
      "search": true,
      "items": [
        {
          "title": "Thème",
          "default": true,
          "section": true,
          "icon": true, // Active l'utilisation des icônes pour cette section
          "filter": {
            "field": "thematic", // La clef !
            "value": "*"
          }
        }
      ]
    }
  ]
}
```

La clé **`thematic`** sert de **point d'entrée dans la configuration**.
Cette configuration peut être absente (utilisant alors la configuration principale par défaut),
ou spécifique à la section (locale ou distante).

Voici une structure JSON pour la section `thematic`,
en intégrant la traduction des noms :

```json
{
  // ... autres configurations ...

  "thematic": [
    {
      "id": "environnement",
      "name": {
        "fr": "Environnement",
        "en": "Environment"
      },
      "icon": "fr-icon-leaf-line" // Icône DSFR pour la thématique "Environnement"
    },
    {
      "id": "economie",
      "name": {
        "fr": "Économie et Emploi",
        "en": "Economy and Employment"
      },
      "icon": "fr-icon-bank-line" // Icône DSFR pour la thématique "Économie"
    },
    {
      "id": "social",
      "name": {
        "fr": "Social et Santé",
        "en": "Social and Health"
      },
      "icon": "fr-icon-user-line" // Icône DSFR pour la thématique "Social"
    }
    // ... d'autres thématiques ...
  ],

  "producer": [
    // ... configuration spécifique aux producteurs ...
  ],

  // ... autres configurations ...
}
```

Dans cet exemple, pour la traduction :

* Chaque objet de thématique contient une propriété `"name"` qui est elle-même un objet.
* Cet objet `"name"` possède des clés de langue (ex: `"fr"`, `"en"`) associées à la traduction du nom de la thématique.
