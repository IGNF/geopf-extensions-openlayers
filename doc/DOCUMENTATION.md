**version provisoire**

# Extension Géoplateforme pour OpenLayers

![GitHub package.json version](https://img.shields.io/github/package-json/v/IGNF/geopf-extensions-openlayers?filename=package.json)

<!-- toc -->

- [Extension Géoplateforme pour OpenLayers](#extension-géoplateforme-pour-openlayers)
  - [Mise en oeuvre](#mise-en-oeuvre)
    - [Téléchargement](#téléchargement)
      - [Téléchargement direct](#téléchargement-direct)
      - [Récupération avec NPM](#récupération-avec-npm)
      - [Accès direct](#accès-direct)
    - [Intégration dans une page web](#intégration-dans-une-page-web)
    - [Configuration de l'accès à la Géoplateforme](#configuration-de-laccès-à-la-géoplateforme)
      - [Optimisation du chargement : configuration locale](#optimisation-du-chargement--configuration-locale)
    - [Appel de l'extension dans un module ES6](#appel-de-lextension-dans-un-module-es6)
  - [Compatibilités](#compatibilités)
    - [Versions de OpenLayers supportées](#versions-de-openlayers-supportées)
    - [Navigateurs supportés](#navigateurs-supportés)
  - [Fonctionnalités](#fonctionnalités)
    - [Systèmes de coordonnées](#systèmes-de-coordonnées)
    - [Affichage des couches WMTS Géoplateforme](#WMTS)
    - [Affichage des couches WMS Géoplateforme](#WMS)
    - [Affichage d'une couche Vecteur Tuilé Géoplateforme](#VT)
    - [Affichage dynamique des attributions](#attributions)
    - [Widget de gestion d'empilement des couches](#layerswitcher)
    - [Barre de recherche utilisant le service de géocodage IGN](#geocode)
    - [Obtention d'une adresse, d'un nom de lieu, ... au clic sur la carte](#reverse)
    - [Calculs d'itinéraires à partir du service de la Géoplateforme](#route)
    - [Calculs d'isochrones / isodistances à partir du service de la Géoplateforme](#isocurve)
    - [Coordonnées et altitude en un point de la carte à l'aide du service d'altimétrie de la Géoplateforme](#mp)
    - [Outils de croquis](#drawing)
    - [Import de couches](#layerimport)
    - [Profil altimétrique d'un traçé à l'aide du service d'altimétrie de la Géoplateforme](#ep)
    - [Outils de mesures](#measure)
    - [Accès aux informations attributaires des couches](#getfeatureinfo)
    - [Widget d'export](#export)
    - [Widget de catalogue de couche](#catalog)
    - [Widget de legendes](#legends)
    - [Widget de centrage sur territoire](#territories)
    - [Widget de mini carte](#overviewMap)
    - [Widget de zoom](#zoom)
    - [Widget de plein écran](#fullscreen)

Les fonctionnalités proposées par l'extension Géoplateforme pour OpenLayers sont à utiliser en complément de la bibliothèque [OpenLayers dans ses versions 8 et
supérieures](https://openlayers.org/)

<a name="readme-top"></a>

<a id="mise-en-oeuvre"></a>
## Mise en oeuvre

L'utilisation de l'extension Géoplateforme pour OpenLayers se fait
via les étapes suivantes :

- [Téléchargement de l'extension Géoplateforme](#download)
- [Intégration de l'extension dans une page web](#integration)
- [Configuration de l'accès à la Géoplateforme](#config)

Une documentation technique (**jsdoc**), une **demo**
et un **generateur de carte** sont disponibles [ici](https://ignf.github.io/geoportal-extensions-openlayers/).

<a id="téléchargement"></a>

### Téléchargement

Vous pouvez récupérer les extensions Géoplateforme pour OpenLayers
soit par [téléchargement direct](#download-direct),
soit en utilisant le [gestionnaire de dépendances javascript NPM](#download-npm).

Les extensions Géoplateforme pour OpenLayers peuvent être
récupérées sous 2 formats :

- toutes les extensions dans un seul fichier :

```text
    .
    ├── Dsfr.css
    ├── Classic.css
    ├── GpfExtOL.css
    ├── GpfExtOL.js
    └── GpfExtOL.js.map
```

- ou une extension par fichier JS avec la CSS associée (liste non ehaustive) :

```text
    .
    ├── GpfExtOl-CRS.js
    ├── GpfExtOl-CRS.js.map
    ├── GpfExtOl-Drawing.css
    ├── GpfExtOl-Drawing.js
    ├── GpfExtOl-Drawing.js.map
    ├── Dsfr.css
    ├── GpfExtOl-Editor.css
    ├── GpfExtOl-Editor.js
    ├── GpfExtOl-Editor.js.map
    ├── GpfExtOl-ElevationPath.css
    ├── GpfExtOl-ElevationPath.js
    ├── GpfExtOl-ElevationPath.js.map
    ├── GpfExtOl-Export.css
    ├── GpfExtOl-Export.js
    ├── GpfExtOl-Export.js.map
    ├── GpfExtOl-Formats.js
    ├── GpfExtOl-Formats.js.map
    ├── GpfExtOl-GeoportalAttribution.css
    ├── GpfExtOl-GeoportalAttribution.js
    ├── GpfExtOl-GeoportalAttribution.js.map
    ├── GpfExtOl-GeoportalMousePosition.css
    ├── GpfExtOl-GeoportalMousePosition.js
    ├── GpfExtOl-GeoportalMousePosition.js.map
    ├── GpfExtOl-GetFeatureInfo.css
    ├── GpfExtOl-GetFeatureInfo.js
    ├── GpfExtOl-GetFeatureInfo.js.map
    ├── GpfExtOl-Isocurve.css
    ├── GpfExtOl-Isocurve.js
    ├── GpfExtOl-Isocurve.js.map
    ├── GpfExtOl-LayerImport.css
    ├── GpfExtOl-LayerImport.js
    ├── GpfExtOl-LayerImport.js.map
    ├── GpfExtOl-Layers.js
    ├── GpfExtOl-Layers.js.map
    ├── GpfExtOl-LayerSwitcher.css
    ├── GpfExtOl-LayerSwitcher.js
    ├── GpfExtOl-LayerSwitcher.js.map
    ├── GpfExtOl-LocationSelector.css
    ├── GpfExtOl-LocationSelector.js
    ├── GpfExtOl-LocationSelector.js.map
    ├── GpfExtOl-MeasureArea.css
    ├── GpfExtOl-MeasureArea.js
    ├── GpfExtOl-MeasureArea.js.map
    ├── GpfExtOl-MeasureAzimuth.css
    ├── GpfExtOl-MeasureAzimuth.js
    ├── GpfExtOl-MeasureAzimuth.js.map
    ├── GpfExtOl-MeasureLength.css
    ├── GpfExtOl-MeasureLength.js
    ├── GpfExtOl-MeasureLength.js.map
    ├── Classic.css
    ├── GpfExtOl-ReverseGeocode.css
    ├── GpfExtOl-ReverseGeocode.js
    ├── GpfExtOl-ReverseGeocode.js.map
    ├── GpfExtOl-Route.css
    ├── GpfExtOl-Route.js
    ├── GpfExtOl-Route.js.map
    ├── GpfExtOl-SearchEngine.css
    ├── GpfExtOl-SearchEngine.js
    └── GpfExtOl-SearchEngine.js.map

```

Il existe 2 thèmes pour les extensions :

- DSFR
- Classic

Les scripts d'OpenLayers s'obtiennent sur [la page de téléchargement d'OpenLayers](https://openlayers.org/download/).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a id="téléchargement-direct"></a>

#### Téléchargement direct

> **TODO**
> bundle ou bundles par modules + thèmes

Vous pouvez télécharger la dernière version de l'extension Géoplateforme
pour OpenLayers directement sur [la page des releases des extensions Géoplateforme](https://github.com/IGNF/geopf-extensions-openlayers/releases).

L'archive téléchargée (.zip) comprend l'arborescence décrite ci-dessus.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a id="récupération-avec-npm"></a>

#### Récupération avec NPM

> **TODO**
> sources ou modules ES6 uniquement

L'extension Géoplateforme pour OpenLayers est aussi disponible dans les dépôts [NPM](https://www.npmjs.com/package/geopf-extensions-openlayers).

Prérequis : [NodeJS](https://nodejs.org/en/) et [npm](https://www.npmjs.com/) installés.

```sh
npm i geopf-extensions-openlayers
```
<a id="accès-direct"></a>

#### Accès direct

Vous pouvez aussi choisir d'utiliser des fichiers hébergés en ligne,
pour y accéder directement, lors de vos tests par exemple.
Cependant, pour une utilisation en production, nous vous conseillons
de télécharger ces fichiers et de les héberger vous-même, sur le même serveur
qui héberge votre application.

Par exemple sur Github Pages :

```text
todo : liste des bundles !
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a id="intégration-dans-une-page-web"></a>

### Intégration dans une page web

Dézippez l'extension géoplateforme dans l'arborescence votre de serveur web.
Vous pouvez positionner à votre guise les fichiers css et javascript.

Intégrez l'extension géoplateforme pour OpenLayers dans votre page web classiquement
à l'aide d'une balise **script** pour charger le fichier javascript
et d'une balise **link** pour charger le fichier css en plus des balises
correspondantes utilisées pour charger la bibliothèque OpenLayers.

Exemple en mode "Classic" :
``` html

<!-- Library OpenLayers -->
<link rel="stylesheet" href="../../resources/vendor/ol/v8.2.0/ol.css" />
<script src="../../resources/vendor/ol/v8.2.0/ol.js"></script>

<!-- Library Access Geoportal Service -->
<script src="../../../node_modules/geoportal-access-lib/dist/GpServices.js"></script>

<!-- Classic IGN theme -->
<link rel="stylesheet" href="../../../dist/bundle/Classic.css" />    

<!-- Extension Géoplateforme pour OpenLayers -->
<link rel="stylesheet" href="../../../dist/bundle/GpfExtOL.css" />
<script src="../../../dist/bundle/GpfExtOL.js"></script>
```

Exemple en mode "DSFR" :
``` html

<!-- Library OpenLayers -->
<link rel="stylesheet" href="ol/v8.2.0/ol.css" />
<script src="ol/v8.2.0/ol.js"></script>

<!-- Library Access Geoportal Service -->
<script src="GpServices.js"></script>

<!-- DSFR theme -->
<link rel="stylesheet" href="@gouvfr/dsfr/dist/dsfr.css" />
<link rel="stylesheet" href="@gouvfr/dsfr/dist/utility/icons/icons.css" />
<link rel="stylesheet" href="Dsfr.css" /> 

<!-- Extension Géoplateforme pour OpenLayers -->
<link rel="stylesheet" href="GpfExtOL.css" />
<script src="GpfExtOL.js"></script>
```


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a id="configuration-de-laccès-à-la-géoplateforme"></a>

### Configuration de l'accès à la Géoplateforme

> **TODO**
> valider le mécanisme des clefs !

L'extension Géoplateforme pour OpenLayers exploite les services web exposés
par la Géoplateforme. Ceux-ci sont en libre accès.

Vous pouvez cependant paramétrer l'utilisation de l'extension avec une ou
plusieurs thématiques Géoplateforme qui correspondent à vos besoins en générant
un fichier de configuration local à partir de
[cette interface](https://geoplateforme-configuration.onrender.com/)
ou en passant par le paramètre apiKey.

Si ni apiKey, ni fichier de configuration local n'est spécifié, l'utilisateur
récupérera une configuration complète avec toutes les ressources
de la Géoplateforme (qui pourra donc être très volumineuse).

Vous pouvez configurer les extensions des manières suivantes :

**Méthode 1** : Au chargement de l'extension en utilisant l'attribut "data-key"
de la balise **script** de chargement de l'extension :

``` html
<script data-key="THEME" src="chemin/vers/bundle.js"></script>
```

Thèmes multiples : Si vous devez utiliser plusieurs thématiques, il est possible
de mettre une liste de thèmes dans l'attribut data-key :

``` html
<script data-key="THEME-1,THEME-2,THEME-3" src="chemin/vers/bundle.js"></script>
```

Votre utilisation des fonctionnalités de l'extension Géoplateforme sera alors
simplement conditionnée par la réception de l'événement onload de la page web,
comme sur l'exemple suivant :

``` html
<html>
    <head>
        <!-- Library OpenLayers -->
        <link rel="stylesheet" href="ol.css" />
        <script src="ol.js"></script>
        <!-- Classic IGN theme -->
        <link rel="stylesheet" href="Classic.css" />
        <!-- Extension Géoplateforme pour OpenLayers -->
        <link rel="stylesheet" href="GpfExtOL.css" />
        <script src="GpfExtOL.js" data-key="THEME"></script>
    </head>
    <body>
        <script>
            window.onload = function () {
                // votre utilisation de l'extension Géoplateforme pour OpenLayers
            }
        </script>
    </body>
</html>
```

**Méthode 2** : A la fin du chargement de la page en utilisant
la fonction [Gp.Services.GetConfig()](https://github.com/IGNF/geoportal-access-lib#getConfig)
et en conditionnant alors l'utilisation de l'extension à l'exécution de la fonction
de rappel onSuccess passée en paramètres de Gp.Services.getConfig()
comme sur l'exemple suivant :

``` html
<html>
    <head>
        <!-- Library OpenLayers -->
        <link rel="stylesheet" href="ol.css" />
        <script src="ol.js"></script>
        <!-- Classic IGN theme -->
        <link rel="stylesheet" href="Classic.css" />
        <!-- Extension Géoplateforme pour OpenLayers -->
        <link rel="stylesheet" href="GpfExtOL.css" />
        <script src="GpfExtOL.js" data-key="THEME"></script>
    </head>
    <body>
        <script>
            window.onload = function () {
                Gp.Services.getConfig({
                    apiKey: 'THEME',
                    onSuccess: function (response) {
                        // votre utilisation de l'extension Géoplateforme pour OpenLayers
                    }
                });
            }
        </script>
    </body>
</html>
```

Thèmes multiples : Si vous devez utiliser plusieurs thématiques, il est possible
de mettre une liste de clés dans l'attribut apiKey de la fonction getConfig :

``` html
<html>
    <head>
        <!-- Library OpenLayers -->
        <link rel="stylesheet" href="ol.css" />
        <script src="ol.js"></script>
        <!-- Classic IGN theme -->
        <link rel="stylesheet" href="Classic.css" />
        <!-- Extension Géoplateforme pour OpenLayers -->
        <link rel="stylesheet" href="GpfExtOL.css" />
        <script src="GpfExtOL.js" data-key="THEME"></script>
    </head>
    <body>
        <script>
            window.onload = function () {
                Gp.Services.getConfig({
                    apiKey: 'THEME-1,THEME-2,THEME-3',
                    onSuccess: function (response) {
                        // votre utilisation de l'extension Géoplateforme pour OpenLayers
                    }
                });
            }
        </script>
    </body>
</html>
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a id="optimisation-du-chargement--configuration-locale"></a>

#### Optimisation du chargement : configuration locale

Vous pouvez améliorer le temps de chargement de votre page en mettant en cache
sur votre plateforme un fichier de configuration Géoplateforme,
qui contient les information nécéssaires des ressources
que vous souhaitez utiliser uniquement.
Il vous suffit pour cela de récupérer le fichier de configuration
(customConfig.json) obtenu à l'aide [de cet utilitaire en ligne](https://geoplateforme-configuration.onrender.com/).

Enregistrez ce fichier sur votre plateforme et paramétrez l'extension
Géoplateforme de la manière suivante (selon les méthodes citées précédemment) :

**Méthode 1** : Utilisez l'attribut "data-url" de la balise **script** chargeant
l'extension pour pointer vers votre fichier :

``` html
<script data-url="chemin/vers/customConfig.json" src="chemin/vers/bundle.js"></script>
```

Votre utilisation des fonctionnalités de l'extension Géoplateforme sera alors
simplement conditionnée par la réception de l'événement onload de la page web,
comme sur l'exemple suivant :

``` html
<html>
    <head>
        <!-- Library OpenLayers -->
        ...
        <script data-url="chemin/vers/customConfig.json" src="chemin/vers/bundle.js"></script>
    </head>
    <body>
        <script>
            window.onload = function () {
                // votre utilisation de l'extension Géoplateforme pour OpenLayers
            }
        </script>
    </body>
</html>
```

**Méthode 2** : Utilisez le paramètre *customConfigFile*
de la fonction Gp.Services.getConfig() pour pointer vers votre fichier,
ainsi que le paramètre *callbackSuffix*, de la manière suivante :

``` html
<html>
    ...
    <body>
        <script>
            window.onload = function () {
                Gp.Services.getConfig({
                    customConfigFile: 'chemin/vers/customConfig.json',
                    callbackSuffix : '',
                    onSuccess: function (response) {
                        // votre utilisation de l'extension Géoplateforme pour OpenLayers
                    }
                });
            }
        </script>
    </body>
</html>
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a id="appel-de-lextension-dans-un-module-es6"></a>

### Appel de l'extension dans un module ES6

> **TODO**
> decrire les imports !

Le module de l'extension expose de multiples exports nommés
(dont le module openlayers étendu).

L'utilisateur a le choix entre plusieurs méthodes d'import.

**Méthode 1** : import des exports nommés du module

``` javascript
```

**Méthode 2** : import d'un objet d’espace de noms pour le module

``` javascript
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a id="compatibilités"></a>

## Compatibilités

### Versions de OpenLayers supportées

Les **releases de l'extension Géoplateforme pour OpenLayers** peuvent s'utiliser
avec les **version 8.2.0 et supérieures** d'OpenLayers.

### Navigateurs supportés

Navigateur | version
-----------|--------
Chrome     | Versions récentes (119+)
Firefox    | Versions récentes (119+)
Edge       | Versions récentes (119+)
Safari     | Versions récentes (17.1+)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a id="fonctionnalités"></a>

## Fonctionnalités

<a id="crs"></a>

<a id="systèmes-de-coordonnées"></a>

### Systèmes de coordonnées

OpenLayers utilise par défaut les systèmes de coordonnées mondiaux "standards" :
EPSG:4326 (coordonnées géographiques) et EPSG:3857
(Projection Web Mercator utilisée par Google, Bings, OSM ... et le Géoplateforme)
comme expliqué [ici](https://openlayers.org/en/latest/apidoc/module-ol_proj.html).

L'extension Géoplateforme pour OpenLayers embarque de nombreuses projections
en *EPSG*, *CRS* ainsi que sous le registre *IGNF*.

Il est possible d'utiliser ces projections :

Exemple :

``` javascript

// création d'une vue OpenLayers avec la projection définie
var view = new ol.View({
    center: [48, 2],
    zoom: 12,
    projection: "IGNF:RGF93G"
})
```

La définition d'autres systèmes de coordonnées est cependant possible
par l'adjonction de la bibliothèque [Proj4js](https://github.com/proj4js/proj4js)
permettant de définir des systèmes de coordonnées et d'effectuer des transformations
de coordonnées entre systèmes. Cette bibliothèque est directement compatible
avec OpenLayers.

L'extension Géoplateforme pour OpenLayers **intègre nativement cette bibliothèque**.
Si vous l'utilisez vous pouvez donc directement définir les systèmes de coordonnées
que vous souhaitez selon la syntaxe proj4 et utiliser les alias ainsi définis en
paramètres des fonctions d'OpenLayers.

Exemple :

``` javascript
// Définition de la Projection UTM 20N
proj4.defs("EPSG:4559",
    "+proj=utm +zone=20 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs") ;

// création d'une vue OpenLayers avec la projection définie
var view = new ol.View({
    center: [656481, 1796270],
    zoom: 12,
    projection: "EPSG:4559"
})
```

NB :

- Le site [epsg.io](http://epsg.io/) recense un grand nombre de registres de
  systèmes de coordonnées avec leurs définitions.
- Les définitions des systèmes de coordonnées du registre IGN-F peuvent être
  trouvées [ici](https://geodesie.ign.fr/contenu/fichiers/IGNF.xml).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a id="WMTS"></a>

### Affichage des couches WMTS Géoplateforme

Le modèle de données OpenLayers fait la distinction entre la notion de couche
(ol.layer) et la notion de source de données (ol.source).
Ainsi, une carte OpenLayers est constituée d'un empilement de "ol.layer",
avec des propriétés relatives à leurs visibilité sur la carte,
dont le contenu est alimenté par des "ol.source", avec des propriétés relatives
à la manière d'obtenir ces données.

L'extension Géoplateforme pour OpenLayers propose deux manières d'accéder
aux couches Géoplateforme selon ce modèle :

1. On souhaite une mise en oeuvre simple, où on saisit uniquement le nom de sa
   couche, et d'éventuels paramètres d'affichage (visibilité ou opacité).
   Définition d'un [layer WMTS Géoplateforme](#layerWMTS).

2. On souhaite pouvoir paramétrer plus finement l'affichage de sa couche
   dans la carte, ainsi que d'éventuels paramètres du service (format, style, ...).
   Définition d'une [source WMTS Géoplateforme](#sourceWMTS).

<a id="layerWMTS"></a>

#### Utilisation d'un layer WMTS Géoplateforme

L'affichage se fait par la création d'une nouvelle instance de la classe
[ol.layer.GeoportalWMTS](https://ignf.github.io/geopf-extensions-openlayers/jsdoc/ol.layer.GeoportalWMTS.html),
de la manière suivante :

``` javascript
new ol.layer.GeoportalWMTS(options);
```

Cette fonction retourne un objet **ol.layer.GeoportalWMTS**,
qui hérite de l'objet OpenLayers *ol.layer.Tile*,
qui peut ainsi être interprété par la librairie OpenLayers pour l'ajout dans la carte.

##### Exemple d'utilisation

Affichage simple des ortho-images du Géoplateforme :
création d'une *layer* Géoplateforme, et ajout à la *map* OpenLayers.

``` javascript
var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.GeoportalWMTS({
                layer: "ORTHOIMAGERY.ORTHOPHOTOS"
            })
        ],
        view: new ol.View({
            center: [288074.8449901076, 6247982.515792289],
            zoom: 12
        })
    });
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

##### Affichage en Lambert 93 (EPSG:2154)

La Géoplateforme diffuse aussi des ressources WMTS en projection Lambert 93.
Pour permettre de les afficher, l'extension Géoplateforme pour OpenLayers
pré-définit l'alias "EPSG:2154" correspondant à cette projection.

Il suffit alors de paramétrer la carte OpenLayers avec cette projection
et d'y rajouter la ressource WMTS de la même manière que précédemment.

``` javascript
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.GeoportalWMTS({
            layer: "ORTHOIMAGERY.ORTHOPHOTOS.BDORTHO.L93"
        })
    ],
    view: new ol.View({
        center: [600000, 6750000],
        zoom: 12,
        projection : "EPSG:2154"
    })
});
```

NB : D'autres systèmes de coordonnées peuvent être définis et utilisés : [plus d'informations...](#crs)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a id="sourceWMTS"/>

#### Utilisation d'une source WMTS Géoplateforme

Cette méthode permet plus de paramétrages :
on crée une nouvelle instance de la classe [ol.source.GeoportalWMTS](https://ignf.github.io/geopf-extensions-openlayers/jsdoc/ol.source.GeoportalWMTS.html),
de la manière suivante :

``` javascript
var gpsource = new ol.source.GeoportalWMTS(options);
```

Cette fonction retourne un objet **ol.source.GeoportalWMTS**,
qui hérite de l'objet OpenLayers *ol.source.WMTS*.
Cette source sert ensuite à la création d'un *layer* OpenLayers
qui pourra ensuite être ajouté à la carte.

``` javascript
var layer = new ol.layer.Tile({
    source : gpsource
});
```

##### Exemple d'utilisation

Affichage simple des ortho-images du Géoplateforme :
création d'un *layer* OpenLayers associé à une *source* Géoplateforme,
et ajout à la *map* OpenLayers.

``` javascript
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.GeoportalWMTS({
                layer: "ORTHOIMAGERY.ORTHOPHOTOS"
            }),
            opacity: 0.7
        })
    ],
    view: new ol.View({
        center: [288074.8449901076, 6247982.515792289],
        zoom: 12
    })
});
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

##### Affichage en Lambert 93 (EPSG:2154)

La Géoplateforme diffuse aussi des ressources WMTS en projection Lambert 93.
Pour permettre de les afficher, l'extension Géoplateforme pour OpenLayers
pré-définit l'alias "EPSG:2154" correspondant à cette projection.

Il suffit alors de paramétrer la carte OpenLayers avec cette projection
et d'y rajouter la ressource WMTS de la même manière que précédemment.

``` javascript
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.GeoportalWMTS({
                layer: "ORTHOIMAGERY.ORTHOPHOTOS.BDORTHO.L93"
            }),
            opacity: 0.7
        })
    ],
    view: new ol.View({
        center: [600000, 6750000],
        zoom: 12,
        projection : "EPSG:2154"
    })
});
```

NB : D'autres systèmes de coordonnées peuvent être définis et utilisés : [plus d'informations...](#crs)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a id="WMS"></a>

### Affichage des couches WMS Géoplateforme

Le modèle de données OpenLayers fait la distinction entre la notion de couche (ol.layer)
et la notion de source de données (ol.source).
Ainsi, une carte OpenLayers est constituée d'un empilement de "ol.layer",
avec des propriétés relatives à leurs visibilité sur la carte,
dont le contenu est alimenté par des "ol.source",
avec des propriétés relatives à la manière d'obtenir ces données.

L'extension Géoplateforme pour OpenLayers propose deux manières d'accéder
aux couches Géoplateforme selon ce modèle :

1. on souhaite une mise en oeuvre simple, où on saisit uniquement le nom de sa
   couche, et d'éventuels paramètres d'affichage (visibilité ou opacité).
   Définition d'un [layer WMS Géoplateforme](#layerWMS).

2. On souhaite pouvoir paramétrer plus finement l'affichage de sa couche dans la carte,
   ainsi que d'éventuels paramètres du service (format, style, ...).
   Définitions d'une [source WMS Géoplateforme](#sourceWMS).

<a id="layerWMS"></a>

#### Utilisation d'un layer WMS Géoplateforme

L'affichage se fait par la création d'une nouvelle
instance de la classe [ol.layer.GeoportalWMS](https://ignf.github.io/geopf-extensions-openlayers/jsdoc/ol.layer.GeoportalWMS.html),
de la manière suivante :

``` javascript
new ol.layer.GeoportalWMTS(options);
```

Cette fonction retourne un objet **ol.layer.GeoportalWMS**,
qui hérite de l'objet OpenLayers *ol.layer.Tile*,
qui peut ainsi être interprété par la librairie OpenLayers pour l'ajout dans la carte.

##### Exemple d'utilisation

Affichage d'une couche du serveur WMS INSPIRE raster
du Géoplateforme (OI.OrthoimageCoverage) sur une carte en EPSG:4326.

``` javascript
var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.GeoportalWMS({
        layer: "OI.OrthoimageCoverage",
      })
    ],
    view: new ol.View({
      center: [2, 46],
      zoom: 12,
      projection: "EPSG:4326"
    })
});
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a id="sourceWMS"></a>

#### Utilisation d'une source WMS Géoplateforme

Cette méthode permet plus de paramétrages :
on crée une nouvelle instance de la classe [ol.source.GeoportalWMS](https://ignf.github.io/geopf-extensions-openlayers/jsdoc/ol.source.GeoportalWMS.html),
de la manière suivante :

``` javascript
var gpsource = new ol.source.GeoportalWMS(options);
```

Cette fonction retourne un objet **ol.source.GeoportalWMS**,
qui hérite de l'objet OpenLayers *ol.source.TileWMS*.
Cette source sert ensuite à la création d'un *layer* OpenLayers qui pourra ensuite
être ajouté à la carte.

``` javascript
var layer = new ol.layer.Tile({
    source : gpsource
});
```

##### Exemple d'utilisation

Utilisation des service WMS INSPIRE raster (OI.OrthoimageCoverage) du Géoplateforme :
création d'un *layer* OpenLayers associés à un *source* Géoplateforme,
et ajout à la *map* OpenLayers.

``` javascript
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.GeoportalWMS({
                layer: "OI.OrthoimageCoverage",
            })
        })
    ],
    view: new ol.View({
        center: [-61.55, 16.25],
        zoom: 12,
        projection : "EPSG:4326"
    })
});
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a id="VT"></a>

### Affichage d'une couche Vecteur Tuilé Géoplateforme

L'affichage se fait par la création d'une nouvelle instance
de la classe [ol.layer.GeoportalMapBox](https://ignf.github.io/geopf-extensions-openlayers/jsdoc/ol.layer.GeoportalMapBox.html),
de la manière suivante :

``` javascript
new ol.layer.GeoportalMapBox(options);
```

Cette fonction retourne un objet **ol.layer.GeoportalMapBox**,
qui hérite de l'objet OpenLayers *ol.layer.VectorTile*,
qui peut ainsi être interprété par la librairie OpenLayers pour l'ajout dans la carte.

**Exemple d'utilisation:**

Affichage de la couche *PLAN.IGN* du Géoplateforme avec le style *classique*
sur une carte en EPSG:4326.

``` javascript
var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.GeoportalMapBox({
        layer  : "PLAN.IGN",
        style  : "classique"
      })
    ],
    view: new ol.View({
      center: [2, 46],
      zoom: 12,
      projection: "EPSG:4326"
    })
});
```

Il est possible d'y ajouter des options :

``` javascript
var LayerMapBox = new ol.layer.GeoportalMapBox({
     layer  : "PLAN.IGN",
     style  : "classique",
     source : "plan_ign", // cas de plusieurs sources
     ssl: true
}, {
     opacity: 0.7,
     visible: true,
     declutter: true
     ...
});
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a id="layerswitcher"></a>

### Widget de gestion d'empilement des couches

Ce widget permet à l'utilisateur de gérer l'empilement des couches composant
la carte ol.Map et, pour chacune d'elles, d'agir sur la visibilité, l'opacité et
d'afficher des informations qui lui sont associées
(titre, description, métadonnées, légende).

Son utilisation se fait par la création d'un nouveau contrôle, instance de la
classe [ol.control.LayerSwitcher](https://ignf.github.io/geopf-extensions-openlayers/jsdoc/ol.control.LayerSwitcher.html),
que l'on peut ensuite ajouter à la carte comme [les autres contrôles OpenLayers](https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html#addControl),
de la manière suivante :

``` javascript
var layerSwitcher = new ol.control.LayerSwitcher(opts) ;
map.addControl(layerSwitcher);
```

Le widget affiche l'ensemble des couches composant la carte ol.Map.

Pour chaque couche de la carte ol.Map, le widget affiche son titre et sa description
(par défaut : l'identifiant OpenLayers de la couche),
et, si elles sont spécifiées, des informations plus détaillées :
légendes, métadonnées, aperçu rapide.

La récupération de ces informations n'est pas la même selon la manière dont
chaque couche a été ajoutée à la carte :

- Couches ajoutées via la [fonctionnalité d'affichage simple des couches WMS](#WMS) ou
  [WMTS du Géoplateforme](#WMTS) de l'extension pour OpenLayers :
  ces informations sont disponibles car elles ont été chargées
  par lors de la [configuration de l'accès à la Géoplateforme](#config),
  il n'y a donc rien à faire de particulier.

- Autres couches : afin d'afficher ces informations, il est nécessaire de les
  spécifier dans les options du widget.

#### Exemples d'utilisation

##### Utilisation simple

Ajout du widget de gestion de l'empilement des couches.
Paramétrage des couches non Géoplateforme.

``` javascript
// couche OSM (non Géoplateforme)
var osmLyr = new ol.layer.Tile({
    source: new ol.source.OSM()
});
// Création de la carte
var map = new ol.Map({
    target: 'map',
    layers: [
        osmLyr,
        // couche Géoplateforme
        new ol.layer.GeoportalWMTS({
            layer: "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2",
        })
    ],
    view: new ol.View({
        center: [288074.8449901076, 6247982.515792289],
        zoom: 12
    })
});    
// Création du Layer Switcher
var lsControl = new ol.control.LayerSwitcher({
    // paramétrage de l'affichage de la couche OSM
    layers : [{
        layer: osmLyr,
        config: {
            title: "OSM",
            description: "Couche OpenStreet Map"
        }
    }]
});
// Ajout du LayerSwitcher à la carte
map.addControl(lsControl);
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a id="geocode"></a>

### Barre de recherche

La barre de recherche permet de positionner la carte à partir de la saisie d'un
localisant dont la position sera retournée par le service de géocodage de l'IGN.

La saisie de localisants peut s'accompagner d'un mode d'autocomplétion s'appuyant
sur le service d'autocomplétion de la Géoplateforme.

Son utilisation se fait par la création d'un nouveau contrôle,
instance de la calsse [ol.control.SearchEngine](https://ignf.github.io/geopf-extensions-openlayers/jsdoc/ol.control.SearchEngine.html),
que l'on peut ensuite ajouter à la carte comme
[les autres contrôles OpenLayers](https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html#addControl),
de la manière suivante :

``` javascript
var search = new ol.control.SearchEngine(opts) ;
map.addControl(search);
```

#### Exemples d'utilisation

##### Utilisation simple

Ajout du moteur de recherche sans paramétrage particulier.

``` javascript
// Création de la carte
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.GeoportalWMTS({
            layer: "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2"
        })
    ],
    view: new ol.View({
        center: [288074.8449901076, 6247982.515792289],
        zoom: 12
    })
});

// Creation du controle
var searchControl = new ol.control.SearchEngine({
});

// Ajout à la carte
map.addControl(searchControl);
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a id="route"></a>

### Calculs d'itinéraires

Le widget de calcul d'itinéraires permet d'intéragir avec une carte OpenLayers pour effectuer des calculs d'itinéraires utilisant le service dédié de la Géoplateforme.

Son utilisation se fait par la création d'un nouveau contrôle instance de la cla
se [ol.control.Route](https://ignf.github.io/geopf-extensions-openlayers/jsdoc/ol.control.Route.html),
que l'on peut ensuite ajouter à la carte comme [les autres contrôles OpenLayers](https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html#addControl),
de la manière suivante :

``` javascript
var route = new ol.control.Route(opts) ;
map.addControl(route);
```

#### Exemples d'utilisation

##### Utilisation simple

Ajout du widget sans paramétrage particulier.

``` javascript
// Création de la carte
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.GeoportalWMTS({
            layer: "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2"
        })
    ],
    view: new ol.View({
        center: [288074.8449901076, 6247982.515792289],
        zoom: 12
    })
});

// Creation du controle
var routeControl = new ol.control.Route({
});

// Ajout à la carte
map.addControl(routeControl);
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a id="isocurve"></a>

### Calculs d'isochrones / isodistances

Ce widget permet d'intéragir avec une carte OpenLayers pour effectuer des
calculs d'isochrones / isodistances utilisant le service dédié de la Géoplateforme.

Son utilisation se fait par la création d'un nouveau contrôle,
instance de la classe [ol.control.Isocurve()](https://ignf.github.io/geopf-extensions-openlayers/jsdoc/ol.control.Isocurve.html),
que l'on peut ensuite ajouter à la carte comme [les autres contrôles OpenLayers](https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html#addControl),
de la manière suivante :

``` javascript
var iso = new ol.control.Isocurve(opts);
map.addControl(iso);
```

#### Exemples d'utilisation

##### Utilisation simple

Ajout du widget sans paramétrage particulier.

``` javascript
// Création de la carte
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.GeoportalWMTS({
            layer: "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2"
        })
    ],
    view: new ol.View({
        center: [288074.8449901076, 6247982.515792289],
        zoom: 12
    })
});

// Creation du controle
var isoControl = new ol.control.Isocurve({
});

// Ajout à la carte
map.addControl(isoControl);
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a id="mp"></a>

### Coordonnées et altitude en un point de la carte

Ce widget permet d'afficher les coordonnées d'un point choisi par l'internaute
sur une carte OpenLayers dans un ou plusieurs systèmes de coordonnées.
Ces coordonnées peuvent comprendre l'altitude obtenue à l'aide du service
d'altimétrie de la Géoplateforme.
Un mode "édition" permet de localiser des coordonnées sur la carte en éditant
les coordonnées affichées dans le widget.

Son utilisation se fait par la création d'un nouveau contrôle,
instance de la classe [ol.control.GeoportalMousePosition](https://ignf.github.io/geopf-extensions-openlayers/jsdoc/ol.control.GeoportalMousePosition.html),
que l'on peut ensuite ajouter à la carte comme [les autres contrôles OpenLayers](https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html#addControl),
de la manière suivante :

``` javascript
var mp = new ol.control.GeoportalMousePosition(opts);
map.addControl(mp);
```

#### Exemples d'utilisation

##### Utilisation simple

Ajout du widget sans paramétrage particulier.

``` javascript
// Création de la carte
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.GeoportalWMTS({
            layer: "ORTHOIMAGERY.ORTHOPHOTOS"
        })
    ],
    view: new ol.View({
        center: [288074.8449901076, 6247982.515792289],
        zoom: 12
    })
});

// Creation du controle
var mpControl = new ol.control.GeoportalMousePosition({
});

// Ajout à la carte
map.addControl(mpControl);
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a id="attributions"></a>

### Affichage dynamique des attributions

Ce widget a pour but d'afficher les attributions associées aux couches visibles
sur la carte.
Il étend les fonctionnalités du contrôle natif d'OpenLayers ([ol.control.Attribution](https://openlayers.org/en/latest/apidoc/module-ol_control_Attribution-Attribution.html))
dont il hérite en permettant l'affichage des attributions en fonction
du positionnement de la carte (centre, zoom) pour les couches ayant
des originators multiples.

Les couches Géoplateforme (de type [WMS](#WMS) ou [WMTS](#WMTS))
possèdent nativement cette propriété.
Pour les autres, le paramétrage dynamique des originators
se fait par l'adjonction à l'objet source de la couche de la propriété "\_originators", tableau de [Gp.Services.Config.Originator](http://ignf.github.io/geoportal-access-lib/latest/jsdoc/Gp.Services.Config.Originator.html).

Son utilisation se fait par la création d'un nouveau contrôle,
instance de la classe [ol.control.GeoportalAttribution](https://ignf.github.io/geopf-extensions-openlayers/jsdoc/ol.control.GeoportalAttribution.html),
que l'on peut ensuite ajouter à la carte comme [les autres contrôles OpenLayers](https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html#addControl),
de la manière suivante :

``` javascript
var att = new ol.control.GeoportalAttribution(opts);
map.addControl(att);
```

#### Exemples d'utilisation

##### Utilisation simple

Ajout du widget sans paramétrage particulier.

``` javascript
// Création de la carte
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.GeoportalWMTS({
            layer: "ORTHOIMAGERY.ORTHOPHOTOS"
        })
    ],
    view: new ol.View({
        center: [288074.8449901076, 6247982.515792289],
        zoom: 12
    })
});

// Creation du controle
var attControl = new ol.control.GeoportalAttribution({
});

// Ajout à la carte
map.addControl(attControl);
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a id="reverse"/>

### Adresse ou lieu en un point de la carte

Ce widget permet d'obtenir un ensemble de localisants Géographiques
(adresses, toponymes ou parcelles cadastrales) en un point ou une zone
(cercle ou emprise rectangulaire) saisie interactivement par l'internaute
çsur une carte OpenLayers.

Son utilisation se fait par la création d'un nouveau contrôle, instance de la
classe [ol.control.ReverseGeocode](https://ignf.github.io/geopf-extensions-openlayers/jsdoc/ol.control.ReverseGeocode.html),
que l'on peut ensuite ajouter à la carte comme [les autres contrôles OpenLayers](https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html#addControl),
de la manière suivante :

``` javascript
var reverse = new ol.control.ReverseGeocode(opts);
map.addControl(reverse);
```

#### Exemples d'utilisation

##### Utilisation simple

Ajout du widget sans paramétrage particulier.

``` javascript
// Création de la carte
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.GeoportalWMTS({
            layer: "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2"
        })
    ],
    view: new ol.View({
        center: [288074.8449901076, 6247982.515792289],
        zoom: 12
    })
});

// Creation du controle
var rvControl = new ol.control.ReverseGeocode({
});

// Ajout à la carte
map.addControl(rvControl);
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a id="drawing"/>

### Outils de croquis

Ce widget propose un ensemble d'outils de croquis
permettant de dessiner sur une carte OpenLayers :
poser des markers, dessiner des lignes, polygones ou faire des écritures dans
des styles choisis par l'internaute.

Son utilisation se fait par la création d'un nouveau contrôle,
instance de la classe [ol.control.Drawing](https://ignf.github.io/geopf-extensions-openlayers/jsdoc/ol.control.Drawing.html),
que l'on peut ensuite ajouter à la carte comme [les autres contrôles OpenLayers](https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html#addControl),
de la manière suivante :

``` javascript
var drawing = new ol.control.Drawing(opts);
map.addControl(drawing);
```

#### Exemples d'utilisation

##### Utilisation simple

Ajout du widget sans paramétrage particulier.

``` javascript
// Création de la carte
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.GeoportalWMTS({
            layer: "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2"
        })
    ],
    view: new ol.View({
        center: [288074.8449901076, 6247982.515792289],
        zoom: 12
    })
});

// Creation du controle
var drawControl = new ol.control.Drawing({
});

// Ajout à la carte
map.addControl(drawControl);
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a id="layerimport"/>

### Widget d'import de couches

Ce widget permet à un internaute d'importer ses propres données géographiques
dans des formats standards en superposition des données d'une carte OpenLayers.

Son utilisation se fait par la création d'un nouveau contrôle,
instance de la classe [ol.control.LayerImport](https://ignf.github.io/geopf-extensions-openlayers/jsdoc/ol.control.LayerImport.html),
que l'on peut ensuite ajouter à la carte comme [les autres contrôles OpenLayers](https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html#addControl),
de la manière suivante :

``` javascript
var lyrImport = new ol.control.LayerImport(opts);
map.addControl(lyrImport);
```

#### Exemples d'utilisation

##### Utilisation simple

Ajout du widget sans paramétrage particulier.

``` javascript
// Création de la carte
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.GeoportalWMTS({
            layer: "ORTHOIMAGERY.ORTHOPHOTOS"
        })
    ],
    view: new ol.View({
        center: [288074.8449901076, 6247982.515792289],
        zoom: 12
    })
});

// Creation du controle
var lyrImport = new ol.control.LayerImport({
});

// Ajout à la carte
map.addControl(lyrImport);
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a id="ep"/>

### Profil altimétrique le long d'un traçé

Ce widget permet d'afficher le profil altimétrique d'un traçé saisi
par l'internaute sur une carte OpenLayers.
Le profil est calculé à l'aide du service d'altimétrie de la Géoplateforme.

Son utilisation se fait par la création d'un nouveau contrôle, instance de la
classe [ol.control.ElevationPath](https://ignf.github.io/geopf-extensions-openlayers/jsdoc/ol.control.ElevationPath.html),
que l'on peut ensuite ajouter à la carte comme [les autres contrôles OpenLayers](https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html#addControl),
de la manière suivante :

``` javascript
var ep = new ol.control.ElevationPath(opts);
map.addControl(ep);
```

#### Exemples d'utilisation

##### Utilisation simple

Ajout du widget sans paramétrage particulier.

``` javascript
// Création de la carte
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.GeoportalWMTS({
            layer: "ORTHOIMAGERY.ORTHOPHOTOS"
        })
    ],
    view: new ol.View({
        center: [288074.8449901076, 6247982.515792289],
        zoom: 12
    })
});

// Creation du controle
var ep = new ol.control.ElevationPath({
});

// Ajout à la carte
map.addControl(ep);
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a id="measure"/>

### Outils de mesures

Trois widgets sont proposés permettant à un internaute d'effectuer des mesures
sur une carte OpenLayers :
mesures de distance, de surface et d'azimuth.

Leur utilisation se fait par la création d'un nouveau contrôle,
instance de la classe [ol.control.MeasureLength](https://ignf.github.io/geopf-extensions-openlayers/jsdoc/ol.control.MeasureLength.html),
pour les distances ; [ol.control.MeasureArea](https://ignf.github.io/geopf-extensions-openlayers/jsdoc/ol.control.MeasureArea.html),
pour les surfaces ou [ol.control.MeasureAzimuth](https://ignf.github.io/geopf-extensions-openlayers/jsdoc/ol.control.MeasureAzimuth.html)
pour les mesures d'azimuth que l'on peut ensuite ajouter à la carte
comme [les autres contrôles OpenLayers](https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html#addControl),
de la manière suivante :

``` javascript
var length = new ol.control.MeasureLength(opts);
map.addControl(length);
```

#### Exemples d'utilisation

##### Utilisation simple

Ajout du widget sans paramétrage particulier.

``` javascript
// Création de la carte
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.GeoportalWMTS({
            layer: "ORTHOIMAGERY.ORTHOPHOTOS"
        })
    ],
    view: new ol.View({
        center: [288074.8449901076, 6247982.515792289],
        zoom: 12
    })
});

// Creation du controle
var length = new ol.control.MeasureLength({
});

// Ajout à la carte
map.addControl(length);
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a id="getfeatureinfo"/>

### Accès aux informations attributaires des couches

Ce widget permet, au clic sur la carte,
d'afficher dans une popup les informations attributaires des couches présentes
dans la carte et spécifiées dans le widget.

Dans le cas des couches vecteur, ces informations correspondent aux informations
attributaires des objets localisés au point cliqué.
Dans le cas des couches raster (WMS et WMTS), c'est le contenu de la réponse
d'une requête GetFeatureInfo sur la première couche qui est affiché.

Lorsque le contrôle est activé pour plusieurs couches, les informations affichées
seront celles de la première couche visible rencontrée dans la carte
(en partant du haut de la pile des couches).

Son utilisation se fait par la création d'un nouveau contrôle,
instance de la classe [ol.control.GetFeatureInfo](https://ignf.github.io/geopf-extensions-openlayers/jsdoc/ol.control.GetFeatureInfo.html),
que l'on peut ensuite ajouter à la carte comme [les autres contrôles OpenLayers](https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html#addControl),
de la manière suivante :

``` javascript
var getFeatureInfo = new ol.control.GetFeatureInfo(opts);
map.addControl(getFeatureInfo);
```

#### Exemples d'utilisation

##### Utilisation simple pour une seule couche

Ajout du widget sans paramétrage particulier.

``` javascript
// Création de la couche que l'on souhaite interroger
var orthos = new ol.layer.GeoportalWMTS({
    layer: "ORTHOIMAGERY.ORTHOPHOTOS"
});

// Création de la carte
var map = new ol.Map({
    target: 'map',
    layers: [
        orthos
    ],
    view: new ol.View({
        center: [288074.8449901076, 6247982.515792289],
        zoom: 12
    })
});

// Création du contrôle, et activation pour la couche orthos créée ci-dessus
var getfeatureinfo = new ol.control.GetFeatureInfo({
    layers : [
        {
            obj : orthos
        }
    ]
});

// Ajout à la carte
map.addControl(getfeatureinfo);
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a id="export"/>

### Widget d'export

Ce widget permet de se **plugguer** sur un contrôle existant afin d'exporter
le calcul dans un format donné.
L'export embarque toutes les informations nécessaire à la reconstruction du
traitement (tracé et résultat du calcul) en utilisant par exemple l'outil d'import.

On peut utiliser ce widget sur les contrôles suivants :

- itinéraire,
- isochrone,
- profil altimétrique

Avec la possibilité de choisir le format de sortie :

- KML
- GPX
- GEOJSON (défaut)

Son utilisation se fait par la création d'un nouveau contrôle,
instance de la classe [ol.control.Export](https://ignf.github.io/geopf-extensions-openlayers/jsdoc/ol.control.Export.html),
que l'on peut ensuite ajouter à la carte comme [les autres contrôles OpenLayers](https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html#addControl),
de la manière suivante :

``` javascript
var export = new ol.control.Export(opts);
map.addControl(export);
```

#### Exemples d'utilisation

Il existe différentes méthodes pour ajouter le widget.

##### Utilisation via les setters

Ajout du widget en utilisant les *setters*

``` javascript
// Creation du controle de calcul d'itineraire
var route = new ol.control.Route();
map.addControl(route);

// Ajout du controle d'export
var exportRoute = new ol.control.Export();
exportRoute.setControl(route);
exportRoute.setTarget(document.getElementById("btnExportRoute")); // (*)
exportRoute.setFormat("geojson");
exportRoute.setName("export-route");
exportRoute.setTitle("Exporter Iti");
exportRoute.setMenu(true);
exportRoute.on("export:compute", (e) => { console.log("Export Route", e); });
map.addControl(exportRoute);
// (*)
// Le bouton d'export est ajouté dans la balise utilisateur pré definie "btnExportRoute"
```

##### Utilisation via les options

Ajout du widget avec utilisation des *options*

``` javascript
// Creation du controle de calcul d'isochrone
var iso = new ol.control.Isocurve();
map.addControl(iso);

// Ajout du controle d'export
var exportIso = new ol.control.Export({
    control: iso,
    target: null, // (*)
    format: "kml",
    name: "export-iso",
    title : "Exporter Iso",
    menu: false
});
exportIso.on("export:compute", (e) => { console.log("Export Iso", e); });
map.addControl(exportIso);
// (*)
// Le bouton d'export est ajouté dans le widget Isocurve
```

##### Utilisation directement dans le contrôle associé

Ajout du widget directement en paramètre du contrôle associé

``` javascript
// Creation du controle de calcul d'isochrone
var profil = new ol.control.ElevationPath({ export : true  });
profil.on("export:compute", (e) => { console.log("Export Profil", e); });
map.addControl(profil);
```

On peut ajouter les options du widget "Export" :

``` javascript
// Creation du controle de calcul d'isochrone
var iso = new ol.control.Isocurve({
    export : {
      // control : this, <!-- implicite ! -->
      target : null,
      name : "export",
      format : "geojson",
      title : "Exporter",
      menu : true
    }
});
iso.on("export:compute", (e) => { console.log("Export Isochrone", e); });
map.addControl(iso);
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a id="catalog"></a>

### widget de catalogue de couche

Afficher une liste des couches du catalogue GPF avec ou sans filtrage et
avec ou sans catégorisation des données.
La sélection d'une couche permet l'ajout sur la carte.

#### Les options

```json
{
            title : "Gérer vos couches de données",
            layerLabel : "title",
            layerFilter : [],
            search : { 
                display : true, 
                criteria : [
                    "name",
                    "title",
                    "description"
                ]
            },
            addToMap : true,
            categories : [
                {
                    title : "Données",
                    filter : null
                }
            ],
            configuration : {
                type : "json",
                urls : [
                    "https://raw.githubusercontent.com/IGNF/cartes.gouv.fr-entree-carto/main/public/data/layers.json",
                    "https://raw.githubusercontent.com/IGNF/cartes.gouv.fr-entree-carto/main/public/data/edito.json"
                ]
            },
}
```

#### Les évenements

On peut s'abonner à des événements :

- catalog:loaded
- catalog:layer:add
- catalog:layer:remove

```js
var catalog = new ol.control.Catalog({
    position: "top-left",
    collapsed : false
});
catalog.on("catalog:loaded", (e) => {});
catalog.on("catalog:layer:add", (e) => {});
catalog.on("catalog:layer:remove", (e) => {});
map.addControl(catalog);
```

#### Exemples d'utilisation

- Exemple complet avec toutes les options

```js
var catalog = new ol.control.Catalog({
    position: "top-left",
    layerLabel : "name",
    search : { 
        display : true, 
        criteria : [
            "name"
        ]
    },
    categories : [
        {
            title : "Fonds de carte",
            filter : {
                field : "base",
                value : "true"
            }
        },
        {
            title : "Données",
            items : [
                {
                    title : "Thème",
                    default : true,
                    section : true,
                    filter : {
                        field : "thematic",
                        value : ["Hydrologie", "Agriculture","Transports"]
                    }
                },
                {
                    title : "Producteur",
                    section : true,
                    filter : {
                        field : "producer",
                        value : "*"
                    }
                },
                {
                    title : "Autres",
                    filter : null
                }
            ]
        }
    ],
    configuration : {
        type : "json",
        data : data // objet json
    }
});
map.addControl(catalog);
```

- Option sur les catégories

```js
var catalog = new ol.control.Catalog({
    categories : [
        {
                                title : "Données",
                                id : "data",
                                items : [
                                    {
                                        title : "WMTS",
                                        default : true,
                                        filter : {
                                            field : "service",
                                            value : "WMTS"
                                        }
                                    },
                                    {
                                        title : "WMS",
                                        filter : {
                                            field : "service",
                                            value : "WMS"
                                        }
                                    },
                                    {
                                        title : "TMS",
                                        filter : {
                                            field : "service",
                                            value : "TMS"
                                        }
                                    },
                                    {
                                        title : "Tout",
                                        filter : null
                                    }
                                ]
        }
    ]
});
map.addControl(catalog);
```

```js
var catalog = new ol.control.Catalog({
    categories : [
                            {
                                title : "Données",
                                id : "data"
                            },
                            {
                                title : "WMTS",
                                default : false,
                                filter : {
                                    field : "service",
                                    value : "WMTS"
                                }
                            },
                            {
                                title : "WMS",
                                filter : {
                                    field : "service",
                                    value : "WMS"
                                }
                            },
                            {
                                title : "TMS",
                                default : true,
                                filter : {
                                    field : "service",
                                    value : "TMS"
                                }
                            }
    ]
});
map.addControl(catalog);
```

- Option sur le filtrage des couches

```js
var catalog = new ol.control.Catalog({
    position: "top-left",
    layerLabel : "name",
    layerFilter : [
        {
            field : "service",
            value : "WMTS"
        }
    ]
});
map.addControl(catalog);
```

#### Constituer le fichier de configuration des couches

Il existe plusieurs modes :

- L'appel des json ou du service est embarqué au widget,
  la constitution de la configuration est donc à la charge du widget.
  Le widget doit donc, à son initialisation, requêter
  soit les jsons,
  soit le service pour obtenir la configuration.
  Dans ce mode, on a plusieurs options pour surcharger le comportement :
  - choisir l'utilisation du service ou des jsons : options.type
  - liste des urls du service ou des jsons : options.urls

  ```json
  configuration : {
    type : "json",
    urls : [
          "https://raw.githubusercontent.com/IGNF/cartes.gouv.fr-entree-carto/main/public/data/layers.json",
           "https://raw.githubusercontent.com/IGNF/cartes.gouv.fr-entree-carto/main/public/data/edito.json"
    ]
  }
  ```

  Ex.
  
  ```js
    var catalog = new ol.control.Catalog({
        position: "top-left",
        configuration : {
            type : "json",
            urls : [
                // INFO facultatif si la config est déjà chargée
                // "https://raw.githubusercontent.com/IGNF/cartes.gouv.fr-entree-carto/main/public/data/layers.json",
                "https://raw.githubusercontent.com/IGNF/cartes.gouv.fr-entree-carto/main/public/data/edito.json"
            ]
        }
    });
    map.addControl(catalog);
  ```

- L'appel des json ou du service est completement à la charge du developpeur.
  Il doit construire le json d'entrée pour l'option de configuration.
  Dans ce mode, on a plusieurs options à renseigner :
  - choisir l'utilisation du service ou des jsons : options.type
  - fournir l'objet json : options.data

  Si on choisit le type:json, on doit fournir dans l'option data, le merge des jsons

  ```json
    configuration : {
       type : "json",
       data : {...} // objet json
  }
  ```

#### Spécification du ficher de configuration

Les informations sur le fichier de configuration sont disponible sur le projet :
<https://github.com/IGNF/geoportal-configuration>

- schema : <https://raw.githubusercontent.com/IGNF/geoportal-configuration/new-url/doc/schema.json>
- jsdoc : <https://raw.githubusercontent.com/IGNF/geoportal-configuration/new-url/doc/schema.jsdoc>
- exemples : <https://github.com/IGNF/geoportal-configuration/tree/new-url/dist>

D'autres informations sont disponible dans la jsdoc du projet : <https://github.com/IGNF/geoportal-access-lib>

- <https://ignf.github.io/geoportal-access-lib/latest/jsdoc/Gp.Services.Config.html>
- <https://ignf.github.io/geoportal-access-lib/latest/jsdoc/Gp.Services.Config.Layer.html>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<a id="legends"></a>

### Widget des légendes

Widget avec un bouton et un panneau d'affichage des légendes et des informations
des couches présentes sur la carte.

Il existe 2 méthodes pour intégrer des légendes :

- en mode auto, un écouteur sur l'ajout ou la suppression de couche sur la carte
est présent pour ajouter ou retirer une legende
  
- en mode manuel, les légendes sont ajoutées via un setter :

```js
    // methods publics
    legends.adds(layers);
    legends.add(layer);
    legends.remove(layer)
```

#### Les événements

- un écouteur d'ajout de couche permet d'y ajouter une légende associée (si mode auto activé !).
- un écouteur de suppression de couche permet de supprimer la légende associée.
- un écouteur de modification de couche permet de mettre à jour la légende associée.

#### Comment obtenir la légende d'une couche ?

> Les légendes sont extraites du fichier d'aggregat des getcapabilities

```json
    // ex. https://github.com/IGNF/geoportal-configuration/blob/new-url/dist/transportsConfig.json
    "legends": [
            {
            "format": "image/png",
            "url": "https://data.geopf.fr/annexes/ressources/legendes/SECUROUTE.TE.1TE-legend.png",
            "minScaleDenominator": "8000"
            }
    ]
```

#### Exemples d'utilisation

```js
var legends = new ol.control.Legends({
  collapse: true,
  draggable: true,
  auto: true,
  panel: true
});
// methods publics
legends.adds(layers);
legends.add(layer);
legends.remove(layer)
// fire events
legends.on("legends::add", cb);
legends.on("legends::remove", cb);
map.addControl(legends);
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a id="territories"></a>

### Widget de centrage sur territoires

Ce widget permet de centrer la visualisation cartographique sur un territoire défini. Une configuration par défaut est disponible, mais les territoires sont également configurables.

Par défaut, les territoires utilisés par le widget sont définis dans le fichier "Controls/Territories/Territories.json".

#### Exemples d'utilisation

```js
    // Ajout du contrôle de gestion  des legendes
    territories = new ol.control.Territories({
        collapsed: false,
        draggable: true,
        position: "top-right",
        panel: true,
        auto: true,
        thumbnail : false,
        reduce: false,
        tiles: 0
    });
    map.addControl(territories);
    
    // ajout en debut de la liste
    territories.setTerritory({
        "id": "PAR",
        "title": "Paris",
        "description": "test...", 
        "bbox": [2.21, 48.80, 2.43, 48.92],
        "thumbnail": "./PARIS.png"
    })
    
    // ajout à la fin de la liste
    territories.setTerritory({
        "id": "UNK",
        "title": "territoire inconnu",
        "description": "", 
        "bbox": [],
        "thumbnail": ""
    });
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a id="overviewMap"></a>

### Widget de mini carte

Ce widget est herité du contrôle natif d'OpenLayers [ol.Control.OverviewMap](http://openlayers.org/en/latest/apidoc/ol.control.OverviewMap.html).

Par défaut, on utilise la couche **GEOGRAPHICALGRIDSYSTEMS.MAPS.OVERVIEW**.

#### Exemples d'utilisation

```js
var overview = new ol.control.GeoportalOverviewMap({
    position : "bottom-left",
    collapsed: false
});
map.addControl(overview);
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<a id="zoom"></a>

### Widget de zoom

Ce widget est herité du contrôle natif d'OpenLayers [ol.Control.Zoom](http://openlayers.org/en/latest/apidoc/ol.control.Zoom.html).

#### Exemples d'utilisation

```js
var zoom = new ol.control.GeoportalZoom({
    position : "bottom-left"
);
map.addControl(zoom);
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<a id="fullscreen"></a>

### Widget de plein écran

Ce widget est herité du contrôle natif d'OpenLayers [ol.Control.FullScreen](http://openlayers.org/en/latest/apidoc/ol.control.FullScreen.html)

#### Exemples d'utilisation

```js
var fullscreen = new ol.control.GeoportalFullScreen({
    position : "top-right"
});
map.addControl(fullscreen);
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>
