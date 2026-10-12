## Extension Geoplateforme OpenLayers, 🔖 version __VERSION__

__DATE__
> 🚀 Release Extension Geoplateforme openlayers

### Unreleased

<https://github.com/IGNF/geopf-extensions-openlayers/compare/__VERSION__...HEAD>

### 🎉 Summary

### 💥 Breaking changes

### 📖 Changelog

* ✨ [Added]

  - Catalog : ajout de l’option `producer` pour afficher/masquer le nom du producteur d’une couche (#600)
  - LayerImport : affichage de messages d'erreurs en cas d'import invalide (#598)

* 🔨 [Changed]

  - Documentation : mise à jour de la documentation opensource du projet (#595)

* 🔥 [Deprecated]

* 🔥 [Removed]

* 🐛 [Fixed]

  - Drawing / Measures : sur Safari, le clic ne permettait pas de tracer et le double-clic sélectionnait le texte de l'infobulle ("Double-cliquer pour terminer", mesures) au lieu de terminer la saisie (#574)
  - LayerSwitcher : les écouteurs d’événements de chaque couche sont bien supprimés au retrait de la couche ou du contrôle (#596)
  - Catalog : ne plante pas si un layer n’a pas de description (#597)
  - Search : utilisation du bon paramètre ("postcode") en paramètre de requete geocodage pour le code postal (#604)

* 🔒 [Security]

---
