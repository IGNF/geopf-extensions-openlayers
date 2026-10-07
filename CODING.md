# CODING.md

Mémo de code pour le dépôt.

## Périmètre

- Projet JavaScript ESM pour OpenLayers
- Point d’entrée public: [src/index.js](src/index.js)
- Artefacts principaux: `dist/bundle` et `dist/modules`

## Règles de code

- Node.js `>=20`
- Indentation à 4 espaces
- Guillemets doubles
- Point-virgule obligatoire
- Espace avant les parenthèses de fonction
- Accolades explicites
- JSDoc à maintenir pour toute API publique
- Conserver le style local des fichiers historiques

## Vérifications

- `npm run eslint`
- `npm run build`
- `npm run generate-types`
- `npm run generate-tsdoc`

## Références

- Installation, exemples et publication: [COMPILE.md](COMPILE.md)
- Branches, commits et PR: [CONTRIBUTING.md](CONTRIBUTING.md)