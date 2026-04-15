# CHANGELOG EXTENSION GEOPORTAL

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
- [CHANGELOG EXTENSION GEOPORTAL](#changelog-extension-geoportal)

- [Extension Geoplateforme OpenLayers, 🔖 version 1.0.0-beta.0](#extension-geoplateforme-openlayers--version-100-beta0)
  - [Unreleased](#unreleased)
  - [🎉 Summary](#-summary)
  - [💥 Breaking changes](#-breaking-changes)
  - [📖 Changelog](#-changelog)
- [Extension Geoplateforme OpenLayers, 🔖 version 1.0.0-beta.1](#extension-geoplateforme-openlayers--version-100-beta1)
  - [Unreleased](#unreleased-1)
  - [🎉 Summary](#-summary-1)
  - [💥 Breaking changes](#-breaking-changes-1)
  - [📖 Changelog](#-changelog-1)
- [Extension Geoplateforme OpenLayers, 🔖 version 1.0.0-beta.2](#extension-geoplateforme-openlayers--version-100-beta2)
  - [Unreleased](#unreleased-2)
  - [🎉 Summary](#-summary-2)
  - [💥 Breaking changes](#-breaking-changes-2)
  - [📖 Changelog](#-changelog-2)
- [Extension Geoplateforme OpenLayers, 🔖 version 1.0.0-beta.3](#extension-geoplateforme-openlayers--version-100-beta3)
  - [Unreleased](#unreleased-3)
  - [🎉 Summary](#-summary-3)
  - [💥 Breaking changes](#-breaking-changes-3)
  - [📖 Changelog](#-changelog-3)
- [Extension Geoplateforme OpenLayers, 🔖 version 1.0.0-beta.4](#extension-geoplateforme-openlayers--version-100-beta4)
  - [Unreleased](#unreleased-4)
  - [🎉 Summary](#-summary-4)
  - [💥 Breaking changes](#-breaking-changes-4)
  - [📖 Changelog](#-changelog-4)
- [Extension Geoplateforme OpenLayers, 🔖 version 1.0.0-beta.5](#extension-geoplateforme-openlayers--version-100-beta5)
  - [Unreleased](#unreleased-5)
  - [🎉 Summary](#-summary-5)
  - [💥 Breaking changes](#-breaking-changes-5)
  - [📖 Changelog](#-changelog-5)
- [Extension Geoplateforme OpenLayers, 🔖 version 1.0.0-beta.6](#extension-geoplateforme-openlayers--version-100-beta6)
  - [Unreleased](#unreleased-6)
  - [🎉 Summary](#-summary-6)
  - [💥 Breaking changes](#-breaking-changes-6)
  - [📖 Changelog](#-changelog-6)
- [Extension Geoplateforme OpenLayers, 🔖 version 1.0.0-beta.7](#extension-geoplateforme-openlayers--version-100-beta7)
  - [Unreleased](#unreleased-7)
  - [🎉 Summary](#-summary-7)
  - [💥 Breaking changes](#-breaking-changes-7)
  - [📖 Changelog](#-changelog-7)
- [Extension Geoplateforme OpenLayers, 🔖 version 1.0.0-beta.8](#extension-geoplateforme-openlayers--version-100-beta8)
  - [Unreleased](#unreleased-8)
  - [🎉 Summary](#-summary-8)
  - [💥 Breaking changes](#-breaking-changes-8)
  - [📖 Changelog](#-changelog-8)
- [Extension Geoplateforme OpenLayers, 🔖 version 1.0.0-beta.9](#extension-geoplateforme-openlayers--version-100-beta9)
  - [Unreleased](#unreleased-9)
  - [🎉 Summary](#-summary-9)
  - [💥 Breaking changes](#-breaking-changes-9)
  - [📖 Changelog](#-changelog-9)
- [Extension Geoplateforme OpenLayers, 🔖 version 1.0.0-beta.10](#extension-geoplateforme-openlayers--version-100-beta10)
  - [Unreleased](#unreleased-10)
  - [🎉 Summary](#-summary-10)
  - [💥 Breaking changes](#-breaking-changes-10)
  - [📖 Changelog](#-changelog-10)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
## Extension Geoplateforme OpenLayers, 🔖 version 1.0.0-beta.3

2025-02-27
> 🚀 Release Extension Geoplateforme openlayers

### Unreleased

<https://github.com/IGNF/geopf-extensions-openlayers/compare/1.0.0-beta.3...HEAD>

### 🎉 Summary

Ajout d'options pour exporter les croquis, mieux filtrer les résultats issus de la recherche.
Refonte graphique de la barre de recherche et ajout d'un menu contextuel au clic droit sur la carte.
Fixage des versions openlayers en 10.3.1 et ol-mapbox-style en 12.3.5.

### 💥 Breaking changes

### 📖 Changelog

* ✨ [Added]

  - LayerSwitcher : ajout d'un bouton d'édition des données de type vecteur via l'option `options.allowEdit:true` (#342)
  - SearchEngine : ajout d'un filtre sur les données en fonction de leur projection (#353) 
  - Export : ajout d'un control Export ou Save pour exporter les croquis (#343)
 
* 🔨 [Changed]

  - ContextMenu: refacto et documentation du code du menu contextuel (#340)
  - ContextMenu: Adresse : affichage du nom de commune quand il n'y a pas d'adresse (#351)
  - SearchEngine : Le srésultats de recherche sont listés dans un panel unique (#346)

* 🔥 [Deprecated]

* 🔥 [Removed]

* 🐛 [Fixed]

  - ContextMenu : correction pour affichage du menu en mode dark (#332, #333)
  - Export : mise en conformité DSFR du bouton Export (#334)
  - LocationSelector : fenêtre transparente en mode classique et pas assez large en mode DSFR (#349)
  - LayerImport : fenêtre d'affichage des getCapabilities agrandie (#349)
  - Search : ajout wfs fonctionnel et filtre automatique des suggests selon la configuration si liste non spécifiée (#352, #358)
  - AdvancedSearch : correction de la recherche avancée et évolution de  l'UX (#354)
  - GetFeatureInfo : ajout de propriétés liées au style des labels à ignorer dans l'affichage (#357)
 
* 🔒 [Security]


---
## Extension Geoplateforme OpenLayers, 🔖 version 1.0.0-beta.4

2025-04-24
> 🚀 Release Extension Geoplateforme openlayers

### Unreleased

<https://github.com/IGNF/geopf-extensions-openlayers/compare/1.0.0-beta.4...HEAD>

### 🎉 Summary

Ajout de la fonctionnalité pour passer les couches raster ou TMS en noir et blanc et amélioration de l'affichage des résultats des calculs dans les panels.

### 💥 Breaking changes

### 📖 Changelog

* ✨ [Added]

  - searchEngine : ajout d'une option pour afficher la recherche par coordonnées dans la recherche avancée (#363)
  - isocurve : ajout d'un panel affichant les informations du calcul d'isochrone (#364)
  - layerSwitcher : bouton permettant de passer une couche en noir et blanc (#367) pour raster et (#370) pour tuiles vecteur en mode DSFR
  - layerSwitcher : bouton permettant de passer une couche en noir et blanc en mode classique (#371)

* 🔨 [Changed]

  - route: amélioration de la lisibilité du panel de résultats de l'itinéraire (#362)
  - elevationPath : changement du style des résultats textuels en mode DSFR (#373)

* 🔥 [Deprecated]

* 🔥 [Removed]

* 🐛 [Fixed]

  - export : le menu d'export des calculs n'apparait qu'une fois le calcul réalisé (#364)
  - catalog : verification que la configuration des couches est disponible (#369)
  - css : précision règle css qui doit s'appliquer uniquement aux éléments dialog (#375)

* 🔒 [Security]


---
## Extension Geoplateforme OpenLayers, 🔖 version 1.0.0-beta.5

2025-07-11
> 🚀 Release Extension Geoplateforme openlayers

### Unreleased

<https://github.com/IGNF/geopf-extensions-openlayers/compare/1.0.0-beta.5...HEAD>

### 🎉 Summary

### 💥 Breaking changes

### 📖 Changelog

* ✨ [Added]

  - Catalog: Ajout de méthodes publiques pour ajouter une config partielle, activer ou desactiver l'affichage d'une couche (#378)
  - LayerSwitcher : Ajout des méthodes publiques forget et listen pour (des)activer l'écouteur d'ajout de couche sur la carte (#389)
  - Reporting : Nouvel outil de signalement (#392)
  - LayerSwitcher : Ajout d'un menu selecteur de style pour les couches TMS (#377)
  - Territories : Customisation du choix des entités du sélecteur (#398)

* 🔨 [Changed]

  - Buttons : style arrondi (#383 #384 #386)
  - Geolocate : Centrage de la vue sur le marker quand cliqué (#376)

* 🔥 [Deprecated]

* 🔥 [Removed]

* 🐛 [Fixed]

  - Drawing: Prise en compte de l'option layerDescription (#380)
  - LayerSwitcher : passage en noir et blanc sur des tuiles vecteur après changement de style (#382)
  - Profil alti : les pentes sont mal calculées (#385)
  - LayerSwitcher : le nom des couches se grise correctement quand la vue sort de son emprise (#390)
  - Search : la fenêtre de résultats se ferme à la perte du focus (#391)
  - MousePosition : désactivation de l'interaction mouseMove au survol de la fenêtre MousePosition (#395)
  - SearchEngine : Nettoyage des réponses après une recherche avancée (#397)
  
* 🔒 [Security]


---
## Extension Geoplateforme OpenLayers, 🔖 version 1.0.0-beta.6

2025-09-18
> 🚀 Release Extension Geoplateforme openlayers

### Unreleased

<https://github.com/IGNF/geopf-extensions-openlayers/compare/1.0.0-beta.6...HEAD>

### 🎉 Summary

Release post-été : Nouvelles features sur le layerswitcher et le widget des territoires.

Corrections diverses sur l'ensemble des widgets, et reprise de la documentation développeur.

### 💥 Breaking changes

### 📖 Changelog

* ✨ [Added]

  - Territories : Ajout d'un menu option pour permettre de charger une configuration des territoires (#408)
  - LayerSwitcher : Possibilité d'ajouter des outils externes (#418)
  - LayerSwitcher : Option pour verrouiller une couche (#414)
  - LayerSwitcher : Tooltips avancés en HTML sur le survol des couches (#420)
  - SearchEngine : la sélection du résultat entraîne désormais un zoom par rapport à son emprise (#432)
  - Reverse Geocode : ajout d'un bouton pour copier un résultat dans le presse-papier (#415)
  - LayerSwitcher : ajout de documentation et d'événements génériques (301cfff)

* 🔨 [Changed]

  - Compute : réduction du nombre de chiffres significatifs des coordonnées envoyés pour les requêtes itinéraires et isochrones (#411)
  - Zoom : changement des icones de zoom en mode DSFR (#412)
  - Catalogue : reprises sur le style du panel et du menu (#401)
  - Documentation : Nouvelle version de la jsdoc (#413)
  - MousePosition : possibilité de cacher le formulaire de paramétrage avancé (#425)
  
* 🔥 [Deprecated]

* 🔥 [Removed]

* 🐛 [Fixed]

  - MousePosition : Edition des coordonnées (#407 #416)
  - Layerswitcher : Menu contextuel en mode mobile sans items vides (#417)
  - ControlList et ZoomOut : Tooltips cassées (#419)
  - Coordinates : homogénéisation de l'affichage des coordonnées dans l'ordre lat,lon (#421)
  - ContextMenu : correction recherche commune par wfs et interrogation service alti (#438)
  - Report : correction du workflow en cas de croquis ou d'email non renseigné lors d'un signalement (725dc53 et d11d147)


* 🔒 [Security]


---
## Extension Geoplateforme OpenLayers, 🔖 version 1.0.0-beta.7

2025-12-05
> 🚀 Release Extension Geoplateforme openlayers

### Unreleased

<https://github.com/IGNF/geopf-extensions-openlayers/compare/1.0.0-beta.7...HEAD>

### 🎉 Summary

Mise à jour des icônes DSFR pour les boutons pictogrammes des widgets.
Refontes majeures : 
- la barre de recherche
- le gestionnaire de couches
- le catalogue

### 💥 Breaking changes

### 📖 Changelog

* ✨ [Added]

  - Contextual Menu : Ajout du getFeatureInfo dans les entrées du menu contextuel (#442)
  - LayerSwitcher : Gestion des noms des styles MapBox issus de cartes.gouv.fr (#455)
  - Territories : Mode DragNDrop des territoires (#468)
  - Search : Nouvelle barre de recherche au DSFR (#471)

* 🔨 [Changed]

  - Catalog : refonte et optimisation du widget (#423)
  - LayerSwitcher : refonte complète de l'outil (#434)
  - Contextual Menu : Changement nom de l'entrée isochrone (3d228a692c8d51155bbdf8c8c32bb51629b6a03f)
  - ReverseGeocode : changement titre modale et message si pas de résultat trouvé (#453)
  - GetFeatureInfo : corrections diverse sur l'UI du panel de résultats (#448)
  - Icones : Mise à jour des icônes DSFR pour les boutons (#462)
  - Territories : Ajout d'un menu de gestion des territoires (#464)

* 🔥 [Deprecated]

* 🔥 [Removed]

* 🐛 [Fixed]

  - LayerSwitcher : Drag & drop sous Chrome (#444)
  - Contextual Menu : GetFeatureInfo via menu contextuel conserve état du widget associé (#445)
  - GetFeatureInfo : Possibilité de sélectionner à la souris le contenu renvoyer par le GFI (#446)
  - ReverseGeocode :  Application de la bonne classe css au panel de résultats pour affichage mobile (#456)
  - LayerSwitcher : correctif sur les vignettes par défaut
  - OverviewMap : correctif sur le zoom min(1) et max(8) par défaut
  - DSFR Tooltips : affichage au-dessus des modales de contrôles (#458)
  - Catalog : correctifs et performance avec l'option 'optimisation:none|on-demand|clusterize'

* 🔒 [Security]


---
## Extension Geoplateforme OpenLayers, 🔖 version 1.0.0-beta.8

2026-02-11
> 🚀 Release Extension Geoplateforme openlayers

### Unreleased

<https://github.com/IGNF/geopf-extensions-openlayers/compare/1.0.0-beta.8...HEAD>

### 🎉 Summary

Corrections sur le layerSwitcher et amélioration de l'affichage des couches dans le cartalogue

### 💥 Breaking changes

### 📖 Changelog

* ✨ [Added]

* 🔨 [Changed]

  - Cartalog : ajout d'une option pour mettre en avant des couches dans les categories (#473)
  - Cartalog : ajout d'une option pour ordonner la liste des couches (fd34a4013860db2c831cef5febbf9d553b2e9a0a)
  - UI : changement contenu labels affichés au survol (#474)
  - Territories : ajout des territoires d'outre-mer
  - Layerswitcher : affichage des titres des couches sur deux lignes en mode DSFR (#476)
  - Route : ajout d'une option pour se passer de l'option "compute" en mode itinéraire piéton (#483, #486)

* 🔥 [Deprecated]

* 🔥 [Removed]

  - LayerSwitcher : retrait hack pour affichage description TMS au lieu du titre (ff0c3434b5e3f6b3be729d0fe4969416bb00e706)

* 🐛 [Fixed]

  - Layerswitcher : correction hauteur du dialog qui empechait l'interaction de zoom (#472)
  - Layerswitcher : correction du style du compteur (#466)
  - ContextMenu : correction de la fermeture du menu contextuel en cas de clic sur d'autres boutons (#472)
  - Territories : correctif sur la reinitialisation par defaut des territoires
  - Drawing : suppression de l'overlay si le widget est fermé (#477)
  - Layers : permettre l'utilisation du zoom client en supprimant les contraintes de resolutions pour les niveau 20 et 21 (#478)
  - Layerswitcher : modification du titre du gestionnaire de couches quand on change de style MapBox (#480)
  
* 🔒 [Security]


---
## Extension Geoplateforme OpenLayers, 🔖 version 1.0.0-beta.9

2026-03-11
> 🚀 Release Extension Geoplateforme openlayers

### Unreleased

<https://github.com/IGNF/geopf-extensions-openlayers/compare/1.0.0-beta.9...HEAD>

### 🎉 Summary

Release qui contient des corrections diverses, principalement liées à de l'UI.

### 💥 Breaking changes

### 📖 Changelog

* ✨ [Added]

* 🔨 [Changed]

* 🔥 [Deprecated]

* 🔥 [Removed]

* 🐛 [Fixed]

  - Buttons : en mode classique, réaffichage correct des boutons et des icones (#487)
  - SearchEngine : recherche guidée parcellaire sur les DROM-COM (#491)
  - Reporting: suppression de la classe gpf-button-no-gutter par défaut (#493)
  - Territories: suppression d'une classe qui empeche la tooltip de s'afficher (#494)
  - MousePosition: supprime l'ajout d'une balise <body> dans le panel (#495)

* 🔒 [Security]

  - Build : transformation images en base 64 pour se passer de lodash.template (#488)
---
## Extension Geoplateforme OpenLayers, 🔖 version 1.0.0-beta.10

2026-04-15
> 🚀 Release Extension Geoplateforme openlayers

### Unreleased

<https://github.com/IGNF/geopf-extensions-openlayers/compare/1.0.0-beta.10...HEAD>

### 🎉 Summary

Corrections et changements mineurs sur le paramétrage et les événements exposés de plusieurs widgets.

### 💥 Breaking changes

### 📖 Changelog

* ✨ [Added]

- territories : ajout d'événements et de nouvelles méthodes sur le widget des territoires (#496)

* 🔨 [Changed]

- perf: écoute évènement moveend sur map au lieu de change:resolution sur view (#500)
- searchengine : exception de recherche pour communes à moins de 3 caractères. (#502)

* 🔥 [Deprecated]

* 🔥 [Removed]

* 🐛 [Fixed]
  
- attributions : correction de la surchage sur l'option collapse du widget d'attributions (#498)

* 🔒 [Security]


---
