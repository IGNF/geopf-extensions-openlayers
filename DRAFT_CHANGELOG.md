# Extension Geoplateforme OpenLayers, 🔖 version __VERSION__

__DATE__
> 🚀 Release Extension Geoplateforme openlayers

## Unreleased

<https://github.com/IGNF/geopf-extensions-openlayers/compare/main%40%7B1year%7D...main>

En attente de la 1ère release :
<https://github.com/IGNF/geopf-extensions-openlayers/compare/v1.0.0...HEAD>

## 🎉 Summary

* mise à jour des dependances
* mise à jour de la documentation
* modification du processus de build
* passage des extensions en mode DSFR
* ajout d'un demonstrateur

## 💥 Breaking changes

Un nouvelle version du GFI avec un fonctionnement et des options differentes de l'ancien widget.

## 📖 Changelog

* ✨ [Added]

  * SearchEngine : Ajout de l'option `markerUrl` pour afficher un marker de position personnalisé (#197)
  * Catalog: Nouveau widget Catalog (#155)
  * Territories: Nouveau widget Selecteur de territoires (#115)
  * Legends: Nouveau widget Legends (#103)
  * OverviewMap: Nouveau widget GeoportalOverviewMap (#81)
  * FullScreen: Nouveau widget GeoportalFullScreen (#79)
  * Zoom: Nouveau widget GeoportalZoom (#63)
  * SearchEngine : Ajout d'une couche sur la carte sur une sélection du service de recherche (#46)
  * SearchEngine : Ajout d'un filtre d'affichage pour les couches uniquement en TMS/WMTS (#14)
  * CI : Demo sur les frameworks vue, react et angular afin de valider les extensions (#16)

* 🔨 [Changed]

  * Catalog: Ajout du widget dans le thème classique (#209)
  * GetFeatureInfo : Nouvelle version du GFI (#169)
  * Mise à jour de la documentation pour les nouveaux widgets (#170)
  * SearchEngine : Modification de l'option `opened:false` en `collapsible:true`
  * CI : Build des binaires et des sources du projet (#13)

* 🔥 [Deprecated]

* 🔥 [Removed]

* 🐛 [Fixed]

  * layerswitcher : zoomToExtent sur les données importées (vecteurs et services) (#232)￼
     - Ajout du zoom to extent pour le vecteur
     - Ajout du zoom to extent pour le WMS et WMTS
  * LayerImport : Fix (#231)
  * Zoom : changer style classique des boutons zoom + et - (#227)
  * Measures : Fix (#109)
  * LayerSwitcher : divers correctifs dsfr (#64) (#173)
  * SearchEngine : Correction sur la recherche avancée de la parcelle Cadastrale (#61)
  * Route : Problème de css DSFR en mode saisie du point d'arriver ou de départ (#60)
  * MousePosition : Affichage des coordonnées en sexagésimaux en DSFR (#57)
  * ElevationPath : Positionnement du profil sur la carte (#55)
  
* 🔒 [Security]

  * replace dependency xmldom with @xmldom/xmldom
  * update dependency ol-mapbox-style to v12.3.3
  * update dependency @mapbox/mapbox-gl-style-spec to v14.4.0
  * update dependency css-loader to v7
  * update dependency geoportal-access-lib to v3.4.2
  * update dependency webpack-dev-server to v5
  * update dependency proj4 to v2.11.0

---
