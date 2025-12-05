## Extension Geoplateforme OpenLayers, 🔖 version __VERSION__

__DATE__
> 🚀 Release Extension Geoplateforme openlayers

### Unreleased

<https://github.com/IGNF/geopf-extensions-openlayers/compare/__VERSION__...HEAD>

### 🎉 Summary

Mise à jour des icônes DSFR pour les boutons pictogrammes des widgets et refonte de la barre de recherche.

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
