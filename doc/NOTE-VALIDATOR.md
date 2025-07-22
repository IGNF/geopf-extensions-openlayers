# Mise en place d'un validateur des données

via une liste de schemas JSON pour les types de configuration suivantes :

* catalogue
* territoire
* couche wmts
* couche wms
* couche tms
* couche wfs (TODO)

Une liste d'exemples de configurations est disponible : `samples-src/resources/data/configuration/`

## Exemple d'utilisation

En mode bundle

```js
const validator = new Gp.JsonValidatorUtils();
var config = "{...}";
var key = "territories";
const result = validator.validate(key, config);
 if (result.valid) {
    console.log('✅ Config valide');
} else {
    console.error('❌ Erreurs:', result.errors);
}
```

En mode ESM

```js
import JsonValidatorUtils from 'geopf-extensions-openlayers';
const validator = new JsonValidatorUtils();
var config = "{...}";
var key = "territories";
const result = validator.validate(key, config);
 if (result.valid) {
    console.log('✅ Config valide');
} else {
    console.error('❌ Erreurs:', result.errors);
}
```

## La liste des clefs des schemas

* catalog
* territories
* layer-wmts
* layer-wms
* layer-tms
* layer-wfs

La liste des schémas disponibles : `src/packages/Utils/schemas/`

## Utilisation possible

Le widget _Territories_ a besoin de valider un config utilisateur lors de l'import.

Idem pour le chargement d'un import d'une config utilisateur pour le widget _Catalog_.

## Exemples

`npm run build:bundle` et `npm run sample:bundle`

Les exemples sont :

- pages-ol-validator-bundle-catalog.html
- pages-ol-validator-bundle-layer-wmts.html
- pages-ol-validator-bundle-territories.html
- pages-ol-validator-bundle-layer-tms.html  

<img width="828" height="306" alt="image" src="https://github.com/user-attachments/assets/bc3de8b8-5ca8-44e1-8e1d-0dd14156ec8a" />
