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

  - GetFeatureInfo : un marker s'affiche là où la requête d'informations a été réalisée (#607)
  - AdvancedSearch : contrôle du format et des bornes du système de référence des coordonnées saisies dans la recherche par coordonnées, avec messages d'erreur ; option `extent` sur les systèmes de `coordinateSearch.systems` (#654)
  - Catalog : optimisation de la recherche, plus efficace, tolérante aux fautes de frappe et tri des couches trouvées par pertinence dans chaque catégorie ou section (sauf en mode `clusterize`) (#657)

* 🔨 [Changed]

  - Panoramax : migration vers `@panoramax/web-viewer` 5.3.1 (`peerDependency` `^5.3.1`) ; le viewer n'est plus fourni en script autonome avec feuille de style séparée, voir `doc/NOTE-PANORAMAX.md` (#602)
  - ControlList : modification du aria-label "Afficher tout" en "Afficher tous les outils" (#609)
  - LayerImport : possibilité d'importer un flux privé Géoplateforme (#611)
  - AdvancedSearch : la longitude en degrés sexagésimaux se saisit sur 7 chiffres (DDDMMSS, préremplie avec « 0 ») pour permettre les longitudes ≥ 100° (#654)
  - AdvancedSearch : factorisation de l'affichage des messages d'erreur (`_showMessage` / `_clearMessages`) dans `AbstractAdvancedSearch` (#654)
  - Route & Isocurve : utilisation par défaut de la ressource bdtopo-valhalla pour tous les calculs (#652)

* 🔥 [Deprecated]

* 🔥 [Removed]

* 🐛 [Fixed]

  - ContextMenu : retrait du marker d'adresse/coords si le panel est fermé (#610)
  - Catalog : les sous-catégories avec sections n'échouent plus lorsque des couches n'ont pas de thème ou de producteur (regroupées dans « Autres ») (#648)
  - LayerImport : correction du GFI sur les couches issues de flux WMTS importés (#646)
  - AdvancedSearch : gestion de la recherche par coordonnées avec virgule comme séparateur décimal (#654)
 
* 🔒 [Security]

  - Reporting : correctif sur injection HTML dans les paramètres `thematics` (#606)
  - LayerImport : nettoyage des titres, descriptions, attributions et URLs contenus dans les flux WMS/WMTS/KML/GPX/GeoJSON/MapBox (#644)

---
