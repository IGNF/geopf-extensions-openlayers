# Compiler

Si vous souhaitez contribuer au code des extensions Geoplateforme, voici les commandes principales

**Installation des dépendances :**

``` bash
npm install
```
Attention, il peut parfois y avoir du cache. Dans ce cas :
``` bash
rm package-lock.json
npm install --force --verbose
```
**Génération des exemples et mise en place d'un serveur localhost:8080**
``` bash
npm run sample:modules
npm run sample:bundle
```
Lance un navigateur avec les pages d'exemples servies sur l'adresse https://localhost:8080/samples/index-modules.html ou https://localhost:8080/samples/index-bundle.html
Les pages html de test d'utilisation sont dans le répertoire *samples-src/*.

**Build du répertoire dist**

Modules :
``` bash
npm run sample:modules
```

Bundles :
``` bash
npm run sample:bundle
```

Tout : 
``` bash
npm run build
```

Construit les éléments dans le répertoire */dist*.


**Construction du binaire**
``` bash
npm run publish
```
Créé le dossier */dist/package*, et le fichier *.tgz* nommé à partir de la version renseignée dans le package.json (ex. *geopf-extensions-openlayers-1.0.0-beta.1-324.tgz* si la version renseignée des api est 1.0.0-beta.1-234 dans le package.json)
