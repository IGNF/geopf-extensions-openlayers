# CHANGELOG EXTENSION GEOPORTAL

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- toc -->

- [Extension Geoplateforme OpenLayers, 🔖 version 1.0.0-beta.0](#extension-geoplateforme-openlayers-%F0%9F%94%96-version-100-beta0)
  * [Unreleased](#unreleased)
  * [🎉 Summary](#%F0%9F%8E%89-summary)
  * [💥 Breaking changes](#%F0%9F%92%A5-breaking-changes)
  * [📖 Changelog](#%F0%9F%93%96-changelog)
- [Extension Geoplateforme OpenLayers, 🔖 version 1.0.0-beta.1](#extension-geoplateforme-openlayers-%F0%9F%94%96-version-100-beta1)
  * [Unreleased](#unreleased-1)
  * [🎉 Summary](#%F0%9F%8E%89-summary-1)
  * [💥 Breaking changes](#%F0%9F%92%A5-breaking-changes-1)
  * [📖 Changelog](#%F0%9F%93%96-changelog-1)
- [Extension Geoplateforme OpenLayers, 🔖 version 1.0.0-beta.2](#extension-geoplateforme-openlayers-%F0%9F%94%96-version-100-beta2)
  * [Unreleased](#unreleased-2)
  * [🎉 Summary](#%F0%9F%8E%89-summary-2)
  * [💥 Breaking changes](#%F0%9F%92%A5-breaking-changes-2)
  * [📖 Changelog](#%F0%9F%93%96-changelog-2)

<!-- tocstop -->

---
## Extension Geoplateforme OpenLayers, 🔖 version 1.0.0-beta.0

2024-11-22
> 🚀 Release Extension Geoplateforme openlayers

### Unreleased

<https://github.com/IGNF/geopf-extensions-openlayers/compare/1.0.0-beta.0...HEAD>

### 🎉 Summary

* mise à jour des dependances (ex. openlayers)
* mise à jour de la documentation
* modification du processus de build
* passage des extensions en mode DSFR
* ajout de nouvelles extensions (ex. catalogue)
* ajout d'un demonstrateur dans differents frameworks (ex. vuejs, react...)

### 💥 Breaking changes

Les widgets utilisent la version > 8.2.0 d'OpenLayers
Un nouvelle version du GFI avec un fonctionnement et des options differentes de l'ancien widget.

### 📖 Changelog

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
## Extension Geoplateforme OpenLayers, 🔖 version 1.0.0-beta.1

2024-12-10
> 🚀 Release Extension Geoplateforme openlayers

### Unreleased

<https://github.com/IGNF/geopf-extensions-openlayers/compare/1.0.0-beta.1...HEAD>

### 🎉 Summary

    - Ajout d'un nouveau Widget ControlList pour lister les widgets ajoutés à la carte
    - Changements de conformité DSFR
    - Fix de rendu de plusieurs widgets
    - Fix pour le chargement de la conffiguration des données GPF en mode data-url  

### 💥 Breaking changes

R.A.S

### 📖 Changelog

* ✨ [Added]

  * ControlList : Ajout d'un nouveau widget (#272, #281) 

* 🔨 [Changed]

   * Drawing : Migration de l'outil en DSFR (#288, #292)
   * Widgets : Possibilité de configurer l'ID du widget (#284)
   * Widgets/DSFR : affichage des boutons des widgets en "tertiary" (#277)
   * Widgets : ajout du CLASSNAME pour tous les widgets (#294)

* 🔥 [Deprecated]

* 🔥 [Removed]

* 🐛 [Fixed]

    * Territories : Optimisation des ressources du widget (#278)
    * Utilisation de l'attribut *data-url* pour charger la configuration en mode browser (#290)
    * Overview : affichage du status actif du bouton (#279)
    * Elevation-path : correction du profil en cas de tracé en boucle (#289)
    * Advanced-search : affichage correct du panneau de recherche avancée (#291)

* 🔒 [Security]


---
## Extension Geoplateforme OpenLayers, 🔖 version 1.0.0-beta.2

2025-01-22
> 🚀 Release Extension Geoplateforme openlayers

### Unreleased

<https://github.com/IGNF/geopf-extensions-openlayers/compare/1.0.0-beta.2...HEAD>

### 🎉 Summary

* upgrade OpenLayers en v10.3.1 🎉
* améliorations UX diverses
* ajout du widget controlList en mode classique
* refonte graphique du widget de dessin

### 💥 Breaking changes

Mise à jour de la dépendance à Openlayers dans sa version 10.3.1

### 📖 Changelog

* ✨ [Added]

  - ajout du widget ControlList en mode classique (#300)
  - ajout d'une option unit au widget de mesure de distance (#317)
  - ajout du menu contextuel en mode DSFR et classique (#329)
  - ajout de documentation de contribution (#327)

* 🔨 [Changed]

  - Ajout d'une croix de fermeture au pop-up issue du clic sur les markers de searchEngine (#313)
  - Augmentation du niveau de zoom lors du centrage par geolocalisation (#313)
  - La fenêtre de résultat du getFeatureInfo ne s'affiche pas si aucune donnée n'est renvoyée (#301)
  - Les zones que l'on peut dessiner pour le geocodage inverse correspondent aux limites du service (#305)
  - Le widget de dessin est retravaillé pour être en meilleur conformité avec le desysgn system de l'etat (mode DSFR) (#328)
  - Mise à jour de la dépendance à la bibliothèque d'accès en version 3.4.6 (79b80e96e3bad19352d36ae479de651e7ec46dc4)
  - MeasureLength : ajout d'une option "unit" pour forcer l'affichage en m ou km (#317)

* 🔥 [Deprecated]

* 🔥 [Removed]

* 🐛 [Fixed]

  - Ajout d'un titre par défaut à la couche vectorielle du drawing (#296)
  - Positionnement de la fenêtre de résultats d'autocomplétion du searchEngine (#307)
  - Mauvais rendu du profil altimétrique (#303) 
  - Correction du rendu et du comportement du bouton "retour" du layerImport et du geocodage inverse (#316)
  - Zoom sur l'étendu pour le format MapBox importé (#320)
  - Correction de l'affichage des résultats de la barre de recherche quand le widget est positionné en coin (#308)
  - Paramétrage du SearchEngine pour filtrer certaines réponses du service d'autocomplétion d'adresses en doublon (#311)
  - Correction de l'affichage des résultats d'autocomplétion en mode mobile (#318)
  - Correction du layerSwitcher en cas de positionnement en mode absolu sir la carte (#324)
  - Correction import de la bibliothèque d'accès sur SourceWFS (#326)
  - Correction sur l'appel de la classe Overlay d'OpenLayers dans le widget de dessin (#330)
  - Meilleur paramétrage lors de l'ajout de couches TMS pour affichage des toponymes (#306)

* 🔒 [Security]


---
