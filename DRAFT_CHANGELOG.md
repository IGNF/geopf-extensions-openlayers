## Extension Geoplateforme OpenLayers, 🔖 version __VERSION__

__DATE__
> 🚀 Release Extension Geoplateforme openlayers

### Unreleased

<https://github.com/IGNF/geopf-extensions-openlayers/compare/__VERSION__...HEAD>

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
