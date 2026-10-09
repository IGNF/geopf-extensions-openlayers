## Extension Geoplateforme OpenLayers, 🔖 version __VERSION__

__DATE__
> 🚀 Release Extension Geoplateforme openlayers

### Unreleased

<https://github.com/IGNF/geopf-extensions-openlayers/compare/__VERSION__...HEAD>

### 🎉 Summary

### 💥 Breaking changes

  - Panoramax : `@panoramax/web-viewer` 4.x n'est plus supporté, la version 5.3.1 ou supérieure est requise

### 📖 Changelog

* ✨ [Added]

  - Reporting : affichage des messages d’erreurs potentiels (#592)
  - Catalog : ajout de l’option `producer` pour afficher/masquer le nom du producteur d’une couche (#600)

* 🔨 [Changed]

  - Panoramax : migration vers `@panoramax/web-viewer` 5.3.1 (`peerDependency` `^5.3.1`) ; le viewer n'est plus fourni en script autonome avec feuille de style séparée, voir `doc/NOTE-PANORAMAX.md`

  - SearchEngine : wfs requetes limitées à 5000 features au lieu de 1000 lors d'une recherche avancée de parcelle par section (#594)

* 🔥 [Deprecated]

* 🔥 [Removed]

* 🐛 [Fixed]

  - ContextMenu : correction de l'affichage de numéro de parcelle cadastrale lorsqu'on clique sur "Adresse & Coordonnées du lieu" (#587)
  - ContextMenu : correction de l’affichage de l’entête du panel (#589)
  - SearchEngine : correction de la recherche de POI des communes de 3 caractères (#593)
  - Panoramax : correctif sur la synchronisation de l'affichage des widgets (#588)
  - Drawing / Measures : sur Safari, le clic ne permettait pas de tracer et le double-clic sélectionnait le texte de l'infobulle ("Double-cliquer pour terminer", mesures) au lieu de terminer la saisie (#574)
  - LayerSwitcher : les écouteurs d’événements de chaque couche sont bien supprimés au retrait de la couche ou du contrôle (#586)
  - Catalog : ne plante pas si un layer n’a pas de description (#597)

* 🔒 [Security]

---
