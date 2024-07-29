# Extension Geoplateforme OpenLayers, 🔖 version __VERSION__

__DATE__
> 🚀 Release Extension Geoplateforme openlayers

## 🎉 Summary

* mise à jour des dependances
* mise à jour de la documentation
* modification du processus de build
* passage des extensions en mode DSFR
* ajout d'un demonstrateur

## 💥 Breaking changes

## 📖 Changelog

* ✨ [Added]

  * Global: Nouveau widget Selecteur de territoires (#115)
  * Legends: Nouveau widget Legends (#103)
  * OverviewMap: Nouveau widget GeoportalOverviewMap (#81)
  * FullScreen: Nouveau widget GeoportalFullScreen (#79)
  * Zoom: Nouveau widget GeoportalZoom (#63)
  * SearchEngine : Ajout d'une couche sur la carte sur une sélection du service de recherche (#46)
  * SearchEngine : Ajout d'un filtre d'affichage pour les couches uniquement en TMS/WMTS (#14)
  * CI : Demo sur les frameworks vue, react et angular afin de valider les extensions (#16)

* 🔨 [Changed]

  * SearchEngine : Modification de l'option `opened:false` en `collapsible:true`
  * CI : Build des binaires et des sources du projet (#13)

* 🔥 [Deprecated]

* 🔥 [Removed]

* 🐛 [Fixed]

  * Measures : Fix [#109](https://github.com/IGNF/geoportal-extensions-openlayers/issues/109)
  * LayerSwitcher : divers correctifs dsfr (#64)
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
