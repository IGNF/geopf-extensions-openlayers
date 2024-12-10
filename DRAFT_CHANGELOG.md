## Extension Geoplateforme OpenLayers, 🔖 version __VERSION__

__DATE__
> 🚀 Release Extension Geoplateforme openlayers

### Unreleased

<https://github.com/IGNF/geopf-extensions-openlayers/compare/__VERSION__...HEAD>

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
