## Extension Geoplateforme OpenLayers, 🔖 version __VERSION__

__DATE__
> 🚀 Release Extension Geoplateforme openlayers

### Unreleased

<https://github.com/IGNF/geopf-extensions-openlayers/compare/__VERSION__...HEAD>

### 🎉 Summary

Nouveau widget Panoramax, refonte de l'outil "ControlList", corrections d'UI multiples

### 💥 Breaking changes

### 📖 Changelog

* ✨ [Added]

  - Panoramax : 🎉 nouveau widget de visualisation de photos immersives ! (#492)
  - Panoramax : Ajout de l'orientation du déplacement dans la minimap du PhotoViewer (#532)
  - LayerSwitcher : Possibilité de rendre une couche affichable ou non dans le gestionnaire (#533)
  - Panoramax : Option `exclusive` pour cumuler ou non les filtres (#549)

* 🔨 [Changed]

  - AdvancedSearch : conversion des coordonnées renseignés dans les inputs en changeant de système ou d'unité via les dropdowns (#518) 
  - LayerSwitcher : le tooltip au survol de l'entrée de la couche affiche son titre (#505)
  - LayerSwitcher : pas de title si on affiche une tooltip (#546)
  - Panoramax : la couche Panoramax n'est pas affiché par défaut dans le gestionnaire de couches (#533)
  - Panoramax : modification de l'icone orientation dans la minimap (#536)
  - Panoramax : affichage de la couche Panoramax qu'à partir du niveau 9 par défaut (#543)
  - ContextMenu : ajout d’une méthode publique pour mettre à jour/ajouter des entrées personnalisées (#517)
  - ControlList: Catalogue d'outils devient réorganisable + adaptation dsfr (#535)
  - Panoramax : filtre 360° activé pour le type d'image (#545)
  - Tooltip: ajoute un délai avant affichage (#546)
  - Tooltip: affichage des tooltips en-dessous de l’élément survolé (#546)

* 🔥 [Deprecated]

* 🔥 [Removed]

* 🐛 [Fixed]

  - DSFR: ne surcharge plus le style fr-tabs global (#512)
  - LayerSwitcher : le label "éditer" s'affiche au lieu de "style" pour les couches non TMS (#516)
  - Catalog: correction du nom des icones pours les thèmes "Océans" et "Société" (#519)
  - Panoramax : correction sur l'affichage de la previsualisation des images (#534)
  - Panoramax : fix l’icone en mode sombre (#539)
  - Interactions : fix sur le nettoyage des interactions utilisateurs (#537)
  
* 🔒 [Security]

  - LayerImport : sanitize sur les imports de fichiers gpx, kml, geojson (#511)

---
