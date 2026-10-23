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

* 🔨 [Changed]

  - Panoramax : migration vers `@panoramax/web-viewer` 5.3.1 (`peerDependency` `^5.3.1`) ; le viewer n'est plus fourni en script autonome avec feuille de style séparée, voir `doc/NOTE-PANORAMAX.md` (#602)
  - ControlList : modification du aria-label "Afficher tout" en "Afficher tous les outils" (#609)
  - LayerImport : possibilité d'importer un flux privé Géoplateforme (#611)

* 🔥 [Deprecated]

* 🔥 [Removed]

* 🐛 [Fixed]

  - ContextMenu : retrait du marker d'adresse/coords si le panel est fermé (#610)
  
* 🔒 [Security]

  - Reporting : correctif sur injection HTML dans les paramètres `thematics` (#606)
  - LayerImport : nettoyage des titres, descriptions, attributions et URLs contenus dans les flux WMS/WMTS/KML/GPX/GeoJSON/MapBox (#644)

---
