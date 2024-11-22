# Extension Geoplateforme OpenLayers, 🔖 version __VERSION__

__DATE__
> 🚀 Release Extension Geoplateforme openlayers

## Unreleased

<https://github.com/IGNF/geopf-extensions-openlayers/compare/1.0.0-beta.0...HEAD>

## 🎉 Summary

* mise à jour des dependances (ex. openlayers)
* mise à jour de la documentation
* modification du processus de build
* passage des extensions en mode DSFR
* ajout de nouvelles extensions (ex. catalogue)
* ajout d'un demonstrateur dans differents frameworks (ex. vuejs, react...)

## 💥 Breaking changes

Les widgets utilisent la version > 8.2.0 d'OpenLayers
Un nouvelle version du GFI avec un fonctionnement et des options differentes de l'ancien widget.

## 📖 Changelog

* ✨ [Added]

  * WFS : Affichage des couches WFS Géoplateforme (#265)
  * SearchEngine : Ajout de l'option `markerUrl` pour afficher un marker de position personnalisé (#197)
  * Catalog : Nouveau widget Catalog (#155)
  * Territories : Nouveau widget Selecteur de territoires (#115)
  * Legends : Nouveau widget Legends (#103)
  * OverviewMap : Nouveau widget GeoportalOverviewMap (#81)
  * FullScreen : Nouveau widget GeoportalFullScreen (#79)
  * Zoom : Nouveau widget GeoportalZoom (#63)
  * SearchEngine : Ajout d'une couche sur la carte sur une sélection du service de recherche (#46)
  * SearchEngine : Ajout d'un filtre d'affichage pour les couches uniquement en TMS/WMTS (#14)
  * CI : Demo sur les frameworks vue, react et angular afin de valider les extensions (#16)

* 🔨 [Changed]

  * Export : Utilisation independante d'un contrôle
  * Catalog : Ajout du widget dans le thème classique (#209)
  * GetFeatureInfo : Nouvelle version du GFI (#169)
  * Mise à jour de la documentation pour les nouveaux widgets (#170)
  * SearchEngine : Modification de l'option `opened:false` en `collapsible:true`
  * CI : Build des binaires et des sources du projet (#13)
  * Responsive : Amelioration sur le responsive des widgets en mode mobile (#230)
  * UX : Panel unique par côté (#236)

* 🔥 [Deprecated]

* 🔥 [Removed]

* 🐛 [Fixed]

  * layerswitcher : zoomToExtent sur les données importées (vecteurs et services) (#232)
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
  * update dependency ol-mapbox-style to v12.3.5
  * update dependency @mapbox/mapbox-gl-style-spec to v14.7.1
  * update dependency css-loader to v7
  * update dependency geoportal-access-lib to v3.4.4
  * update dependency webpack-dev-server to v5
  * update dependency proj4 to v2.14.0

---
