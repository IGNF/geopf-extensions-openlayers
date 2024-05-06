# Information

> construction du package des bundles

## config webpack

<https://webpack.js.org/configuration/extending-configurations/>

## bundles par modules

> on n'expose pas la variable **Gp**
> car on expose le nom du module

Les **externals** sont ajoutés pour gèrer les dependances des autres modules

Ex. de commande :

```sh
./node_modules/.bin/webpack --config build/webpack/controls.webpack.config.js --env entry=GeoportalAttribution --mode=development
./node_modules/.bin/webpack --config build/webpack/controls.webpack.config.js --env entry=Drawing --mode=development
./node_modules/.bin/webpack --config build/webpack/controls.webpack.config.js --env entry=Editor --mode=development
./node_modules/.bin/webpack --config build/webpack/controls.webpack.config.js --env entry=ElevationPath --mode=development
./node_modules/.bin/webpack --config build/webpack/controls.webpack.config.js --env entry=Export --mode=development
./node_modules/.bin/webpack --config build/webpack/controls.webpack.config.js --env entry=GetFeatureInfo --mode=development
./node_modules/.bin/webpack --config build/webpack/controls.webpack.config.js --env entry=Isocurve --mode=development
./node_modules/.bin/webpack --config build/webpack/controls.webpack.config.js --env entry=LayerImport --mode=development
./node_modules/.bin/webpack --config build/webpack/controls.webpack.config.js --env entry=LayerSwitcher --mode=development
./node_modules/.bin/webpack --config build/webpack/controls.webpack.config.js --env entry=LocationSelector --mode=development
./node_modules/.bin/webpack --config build/webpack/controls.webpack.config.js --env entry=MousePosition --mode=development
./node_modules/.bin/webpack --config build/webpack/controls.webpack.config.js --env entry=ReverseGeocode --mode=development
./node_modules/.bin/webpack --config build/webpack/controls.webpack.config.js --env entry=Route --mode=development
./node_modules/.bin/webpack --config build/webpack/controls.webpack.config.js --env entry=SearchEngine --mode=development
./node_modules/.bin/webpack --config build/webpack/controls.webpack.config.js --env entry=MeasureArea --mode=development
./node_modules/.bin/webpack --config build/webpack/controls.webpack.config.js --env entry=MeasureLength --mode=development
./node_modules/.bin/webpack --config build/webpack/controls.webpack.config.js --env entry=MeasureAzimuth --mode=development

./node_modules/.bin/webpack --config build/webpack/formats.webpack.config.js --mode=development
./node_modules/.bin/webpack --config build/webpack/layers.webpack.config.js --mode=development
./node_modules/.bin/webpack --config build/webpack/crs.webpack.config.js --mode=development
```

ou

```sh
./node_modules/.bin/webpack --config build/webpack/modules.webpack.config.js --mode=development
```

ou

```sh
./node_modules/.bin/webpack --config build/webpack/controls.webpack.config.js --env entry=GeoportalAttribution,Drawing,Editor,ElevationPath,Export,GetFeatureInfo,Isocurve,LayerImport,LayerSwitcher,LocationSelector,MousePosition,ReverseGeocode,Route,SearchEngine,MeasureArea,MeasureLength,MeasureAzimuth --mode=development
```

## bundle complet

> on expose la variable **Gp*

TODO : proj4 doit il être exposé ?

```sh
./node_modules/.bin/webpack --config build/webpack/bundle.webpack.config.js
```

## CSS par thèmes

chaque process (packages ou modules) extrait les css par thème
