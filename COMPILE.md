# Compiler

Si vous souhaitez contribuer au code des extensions Geoplateforme, voici les commandes principales

## Installation des dépendances

``` bash
npm install
```

Attention, il peut parfois y avoir du cache.
Dans ce cas :

``` bash
rm package-lock.json
npm install --force --verbose
```

## Génération des exemples

``` bash
npm run sample:modules
npm run sample:bundle
```

Lance un navigateur avec les pages d'exemples servies sur l'adresse https://localhost:8080/samples/index-modules.html ou https://localhost:8080/samples/index-bundle.html

Les pages html de test d'utilisation sont dans le répertoire *samples-src/*.

## Build des sources

> resultat du build dans le répoertoire *dist/*

``` bash
npm run build
npm run build:bundle
npm run build:modules
```

**Construction des modules**

``` bash
npm run publish
```

Créé le dossier */dist/package/*, et le fichier *.tgz* nommé à partir de la version renseignée dans le package.json (ex. *geopf-extensions-openlayers-1.0.0-beta.1-324.tgz* si la version renseignée des api est 1.0.0-beta.1-234 dans le package.json)

## D'autres commandes utiles

``` bash
npm run eslint
npm run generate-types
npm run generate-jsdoc
```
