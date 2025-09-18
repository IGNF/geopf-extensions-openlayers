## Extension Geoplateforme OpenLayers, 🔖 version __VERSION__

__DATE__
> 🚀 Release Extension Geoplateforme openlayers

### Unreleased

<https://github.com/IGNF/geopf-extensions-openlayers/compare/__VERSION__...HEAD>

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
