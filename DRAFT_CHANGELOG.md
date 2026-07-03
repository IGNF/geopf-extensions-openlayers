## Extension Geoplateforme OpenLayers, 🔖 version __VERSION__

__DATE__
> 🚀 Release Extension Geoplateforme openlayers

### Unreleased

<https://github.com/IGNF/geopf-extensions-openlayers/compare/__VERSION__...HEAD>

### 🎉 Summary

- Résolution d'alertes de sécurité remontées par codeQL.
- Export de la fonction utilitaire : **sanitizeHtml()**
  ```js
  import { sanitizeHtml } from "geopf-extensions-openlayers";
  (...)
  label.innerHTML = sanitizeHtml(value, { strict : true });
  ```

### 💥 Breaking changes

### 📖 Changelog

* ✨ [Added]

  - Catalog : recherche non sensible à la casse ou aux accents (#558)

* 🔨 [Changed]

  - Panoramax : possibilité de déclencher l'ouverture du _PhotoViewer_ programmatiquement (#550)
  - Legends : chargement asynchrone des images de légende (#)
  - Legends : modification texte alternatif et ajout d’un lien pour ouvrir dans un nouvel onglet (#)

* 🔥 [Deprecated]

* 🔥 [Removed]

* 🐛 [Fixed]

  - Panoramax : correctif sur l'orientation dans la minimap au chargement de la photo (#551)
  - Panoramax : modification du z-index par défaut du photoviewer pour être au-dessus des modales DFSR (#552)
  - Panoramax : reinitialisation des filtres (#556)
  - Catalog : améliorer la gestion des critères de recherche pour inclure des valeurs issues de tableaux (#555)
  - Catalog : amélioration des vignettes de couches (chargement, tailles, couleurs, dark mode) (#)
  - Isocurve : correctif sur l'évenement de fin de traitement (#557)
  - Drawing : correctif sur l'ouverture du panneau de dessin (#557)
  - MousePosition : conservation de l'ordre lat/lon y/x pour l'affichage des coordonnées (#560)
  - LayerSwitcher : correctif sur le drag n' drop en conflit avec le slider d'opacité (#562)
  - ControlList : fixe l’événement change:collapsed (#561)
  
* 🔒 [Security]

  - Territories : correctifs sur les failles XSS (#563)

---
