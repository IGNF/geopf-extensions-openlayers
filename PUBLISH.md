# Publier

La publication des extensions est sur le registre NPM : <https://www.npmjs.com/package/geopf-extensions-openlayers>

## Procedure de mise à jour du token

Depuis la dépréciation des tokens classiques npm, voici comment configurer une publication npm via GitHub Actions en utilisant les granular access tokens (tokens à accès granulaire).

1. Créer un granular access token sur npm

- Connectez-vous sur npmjs.com
- Allez dans **Account Settings → Access Tokens**
- Cliquez sur **Generate New Token → Granular Access Token**
  - Configurez le token :
  - Token name : choisissez un nom --> **NPM_GEOPORTAL_TOKEN**
  - Expiration : choisissez une durée appropriée -> **90 jours**
  - Packages and scopes : sélectionnez les packages concernés -> **tous**
  - Permissions : choisissez **Read and write** pour pouvoir publier

2. Ajouter le token aux secrets GitHub

- Dans le repository GitHub, allez dans **Settings → Secrets and variables → Actions**
- Cliquez sur **Manage organization secrets**
- Cliquez sur l'édition du token **NPM_GEOPORTAL_TOKEN** et collez le nouveau token

**Note**
> Le token expire au bout de 90 jours !

## Publication

La publication est déclenchée par une GitHub Actions lors de la creation d'un tag.
cf. `.github/workflows/release.yml`