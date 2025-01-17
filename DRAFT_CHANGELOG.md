## Extension Geoplateforme OpenLayers, 🔖 version __VERSION__

__DATE__
> 🚀 Release Extension Geoplateforme openlayers

### Unreleased

<https://github.com/IGNF/geopf-extensions-openlayers/compare/__VERSION__...HEAD>

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
