
# Extension Géoplateforme pour OpenLayers

Ce projet a pour but de fournir des extensions facilitant l'accès aux ressources de la [Géoplateforme](https://www.cartes.gouv.fr/cartes) pour la bibliothèque cartographique [OpenLayers](https://openlayers.org/) (versions 8 et supérieures).

## Execution locale

Cloner le projet

```bash
  git clone https://github.com/IGNF/geoportal-extensions-openlayers.git
```

Accéder au répertoire du projet

```bash
  cd geoportal-extensions-openlayers
```

Installer les dependances

```bash
  npm install
```

Démarrer le serveur des exemples

```bash
  npm run samples:modules
  npm run samples:bundle
```

Ouvrir le navigateur

```bash
  https://localhost:8080/samples/index-modules.html
```

## Demo

https://ignf.github.io/geoportal-extensions-openlayers/

Utilisation des widgets sur l'application web cartographique :
https://ignf.github.io/cartes.gouv.fr-entree-carto/

## Documentation

[Documentation technique](https://ignf.github.io/geoportal-extensions-openlayers/jsdoc/) 

[Documentation génerale](DOCUMENTATION.md)

## Widgets

- Drawing,
- Isocurve,
- Route,
- LayerImport,
- GeoportalAttribution,
- SearchEngine,
- GetFeatureInfo,
- GeoportalZoom,
- GeoportalOverviewMap,
- ElevationPath,
- MeasureArea,
- MeasureAzimuth,
- MeasureLength,
- LayerSwitcher,
- Legends,
- GeoportalMousePosition,
- ReverseGeocode,
- CRS,
- GeoportalLayerMapBox,
- GeoportalLayerWMTS,
- GeoportalLayerWMS,
- ...

## Usage/Examples

```javascript
import {
    Drawing,
    Isocurve,
    Route,
    LayerImport,
    GeoportalAttribution,
    GeoportalZoom,
    GeoportalOverviewMap,
    ElevationPath,
    MeasureArea,
    MeasureAzimuth,
    MeasureLength,
    LayerSwitcher,
    Legends,
    MousePosition as GeoportalMousePosition,
    ReverseGeocode,
    SearchEngine,
    GetFeatureInfo,
    CRS,
    LayerMapBox as GeoportalLayerMapBox,
    LayerWMTS as GeoportalLayerWMTS
} from "geoportal-extensions-openlayers";

 const map = new Map({
        target : "map",
        layers : [
            new GeoportalLayerMapBox({
                layer : "PLAN.IGN"
            }),
            new GeoportalLayerWMTS({
                layer : "ORTHOIMAGERY.ORTHOPHOTOS"
            })
        ],
        view : new View({
            center : [288074.8449901076, 6247982.515792289],
            zoom : 8,
        })
    });
    
    var overmap = new GeoportalOverviewMap({
        position : "bottom-left"
    });
    map.addControl(overmap);
    
    var zoom = new GeoportalZoom({
        position : "bottom-left"
    });
    map.addControl(zoom);
    
    var drawing = new Drawing({
        position : "top-left"
    });
    map.addControl(drawing);
    
    var iso = new Isocurve({
        position : "bottom-left"
    });
    map.addControl(iso);
    
    var layerImport = new LayerImport({
        position : "bottom-left"
    });
    map.addControl(layerImport);
    
    var legends = new Legends({
        position : "bottom-left"
    });
    map.addControl(legends);

    var layerSwitcher = new LayerSwitcher({
        options : {
            position : "top-right"
        }
    });
    map.addControl(layerSwitcher);
    
    var mp = new GeoportalMousePosition({
        position : "top-right"
    });
    map.addControl(mp);
    
    var route = new Route({
        position : "top-right"
    });
    map.addControl(route);
    
    var reverse = new ReverseGeocode({
        position : "top-right"
    });
    map.addControl(reverse);
    
    var search = new SearchEngine({
        position : "top-right"
    });
    map.addControl(search);
    
    var feature = new GetFeatureInfo({
        options : {
            position : "top-right"
        }
    });
    map.addControl(feature);
    
    var measureLength = new MeasureLength({
        position : "bottom-left"
    });
    map.addControl(measureLength);
    
    var measureArea = new MeasureArea({
        position : "bottom-left"
    });
    map.addControl(measureArea);
    
    var measureAzimuth = new MeasureAzimuth({
        position : "bottom-left"
    });
    map.addControl(measureAzimuth);
    
    var measureProfil = new ElevationPath({
        position : "bottom-left"
    });
    map.addControl(measureProfil);
    
    var attributions = new GeoportalAttribution({
        position : "bottom-right"
    });
    map.addControl(attributions);
```

La bibliothèque d’accès aux services Géoplateforme est une bibliothèque de fonctions javascript permettant d'accéder aux ressources délivrées par les services web de la Géoplateforme.

Elle permet plus particulièrement d'obtenir les ressources disponibles pour une thématique Géoplateforme et d'avoir les paramètres permettant leur utilisation :

```javascript
import Gp from "geoportal-access-lib";

var cfg = new Gp.Services.Config({
    customConfigFile : "https://raw.githubusercontent.com/IGNF/geoportal-configuration/new-url/dist/fullConfig.json",
    onSuccess : () => {
      // load map and some widgets
    },
    onFailure : (e) => {
        console.error(e);
    }
});
cfg.call();
```

## Contributing

Les contributions sont toujours les bienvenues !

## Liens utiles

Voici quelques projets connexes

- https://github.com/IGNF/cartes.gouv.fr-entree-carto
- https://github.com/IGNF/geoportal-access-lib
- https://github.com/IGNF/geoportal-configuration
- https://github.com/IGNF/geoportal-extensions
- ...

## Support

Pour obtenir de l'aide, envoyez un e-mail ou rejoignez notre canal sur *developpez.com* ou creez un ticket sur le projet.

## License

[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)

[AGPL-3.0](https://github.com/IGNF/geoportal-extensions-openlayers?tab=License-1-ov-file)

## Appendix

Ce README est généré avec https://readme.so/fr/editor
