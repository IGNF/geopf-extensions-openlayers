# publication

> **TODO:**
> recherche d'un processus de livraison des widgets

1. publication des sources pour l'intégration dans les frameworks

    > Publication NPM des modules type ES

    Exemple d'utilisation dans un framework :

    ```js
    import {
        version,
        date,
        LoggerUtils as Logger,
        LayerWMTS as GeoportalWMTS,
        LayerWMS as GeoportalWMS,
        Drawing,
        Isocurve,
        Route,
        LayerImport,
        GeoportalAttribution,
        ElevationPath,
        MeasureArea,
        MeasureAzimuth,
        MeasureLength,
        LayerSwitcher,
        MousePosition as GeoportalMousePosition,
        ReverseGeocode,
        SearchEngine,
        GetFeatureInfo
    } from "geoportal-extensions-openlayers";
    ```

    Structurer les appels des modules :

    ```js
    import {
        Drawing,
        Isocurve,
        Route,
        LayerImport,
        GeoportalAttribution,
        ElevationPath,
        MeasureArea,
        MeasureAzimuth,
        MeasureLength,
        LayerSwitcher,
        MousePosition as GeoportalMousePosition,
        ReverseGeocode,
        SearchEngine,
        GetFeatureInfo
    } from "geoportal-extensions-openlayers/controls";

    import {
        LayerWMTS as GeoportalWMTS,
        LayerWMS as GeoportalWMS
    } from "geoportal-extensions-openlayers/layers";

    import {
        version,
        date
    } from "geoportal-extensions-openlayers
    ```

    > **TODO** Lister les modules à exporter

2. publications des binaires pour le mode web

   > Publication des binaires sur un espace dédié tel que GitHub

    2.1 par widgets

    les modules web par widgets n'exposent pas la varibale **Gp**

    2.2 bundle complet

    le bundle complet expose la variable **Gp**

    > **FIXME** la taille des fichiers (ex. dsfr.css) !?
    > **SOLUTION** le dsfr est une lib externe, les CSS ne sont pas ajoutées dans les livrables !
