# Contribuer

Si vous souhaitez contribuer au code des extensions Geoplateforme, voici quelques conseils pratiques et règles à suivre.

<!-- toc -->

- [Ouverture d'un ticket (issue)](#ouverture-dun-ticket-issue)
- [Ouvrir une pull request (PR)](#ouvrir-une-pull-request-pr)
  * [On «fork» le projet](#on-%C2%ABfork%C2%BB-le-projet)
  * [On code...](#on-code)
  * [On soumet une PR...](#on-soumet-une-pr)
- [Liens utiles](#liens-utiles)

<!-- tocstop -->

## Ouverture d'un ticket (issue)

Vous pouvez ouvrir un ticket dans les situations suivantes :

* Signaler une erreur que vous ne pouvez pas résoudre vous-même
* Discuter d'un sujet ou d'une idée relative au projet
* Proposer une nouvelle fonctionnalité ou une évolution de fonctionnalité

Votre ticket est ensuite pris en compte par les membres de l'équipe ou de la communauté. Une action peut alors vous être demandée, telle qu'**ouvrir une Pull Request** afin de contribuer...

## Ouvrir une pull request (PR)

Une pull request vous permet de soumettre une proposition d'évolution du code source à l'équipe en charge du projet. Voici comment soumettre une **pull request** !

### On «fork» le projet

- Créez un `fork` du projet sur GitHub.
- Clonez-le en local. Ce `dépôt distant` sur GitHub s'appelle `origin`.
- Ajoutez le dépôt d'origine en tant que `dépôt distant` avec le mot clé : `upstream` (cf. https://help.github.com/articles/configuring-a-remote-for-a-fork/).
- Si vous avez créé votre `fork` il y a quelque temps, assurez-vous de récupérer les modifications dans votre dépôt local (cf. https://help.github.com/articles/syncing-a-fork/).
- Récupérez les modifications le plus souvent possible depuis "upstream" afin d'être le plus à jour possible, de sorte que lorsque vous soumettez votre demande (PR), les conflits de fusion seront plus faciles à résoudre !

### On code...

- Créez une `nouvelle branche` pour travailler. Nommez la :
  - feat/nom-de-la-fonctionnalité ou feature/nom-de-la-fonctionnalité (ex. feat/update-open-source-documents, feature/poi_names_interface) dans le cas d'une branche qui propose une nouvelle fonctionnalité
  - fix/nom-du-problème (ex. fix/1214-search-engine-autocomplete-cadastre, fix/context-menu-parcel) dans le cas d'une branche qui propose une correction à un problème. Si le problème corrigé est lié à une issue, ne pas hésiter à mettre son numéro dans le titre de la branche

- Dans le répertoire local du projet, installez les dépendances du projet :

``` bash
npm install
```

cf. [COMPILE.md](COMPILE.md) pour plus d'infos.

- Écrivez, testez, corrigez votre `code` sur votre copie locale de votre fork.

Les commandes pour lancer les exemples en mode modules ou bundle:

```
npm run sample:modules
npm run sample:bundle
```
Lancez un navigateur avec les pages d'exemples servies à l'adresse https://localhost:8080/samples/index-modules.html ou https://localhost:8080/samples/index-bundle.html
Les pages HTML de test d'utilisation sont dans le répertoire *samples-src/*.


- Suivez les règles de codage du projet. Elles sont définies dans le fichier : .eslintrc (style et convention de codage + syntaxe JavaScript). Vous pouvez vérifier le bon respect de ces règles en lançant la tâche :

```
npm run eslint
```

- Vérifiez, ajoutez ou adaptez les exemples si nécessaire.

    * Les pages d'exemples sont dans le répertoire *samples-src/pages/tests*

- Ajoutez ou modifiez la `documentation` si nécessaire. Si votre PR apporte une modification d'interface à la bibliothèque, mettez à jour la jsDoc en conséquence et vérifiez qu'elle est bien prise en compte.

La commande

```
npm run generate-tsdoc
```

Vous permet de générer la documentation technique du projet dans le répertoire *jsdoc/*.
Ouvrez ensuite dans votre navigateur le fichier *jsdoc/index.html* et vérifiez que vos modifications sont bien prises en compte.

- Ajoutez-vous dans le fichier [CONTRIBUTORS.md](CONTRIBUTORS.md) si vous n'y êtes pas déjà.



- Suivez le formalisme [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) pour rédiger vos commits.

- **feature** or **feat** : pour l'ajout de nouvelles fonctionnalités ;
- **fix** : pour les corrections de bogues ;
- **refactor** : pour le refactoring du code ;
- **test** : pour les changements liés aux tests ;
- **doc** : pour les changements liés à la documentation ;
- **chore** : pour les tâches de maintenance sans impact sur le code source ou les tests
  (dépendances, configuration, outils...).

Le scope entre parenthèses est le nom du widget impacté.

- Squashez vos commits en un seul avec le `rebase interactif` (cf. https://help.github.com/articles/interactive-rebase) ou via d'autres méthodes (cf. https://gist.github.com/patik/b8a9dc5cd356f9f6f980 par exemple)

- Poussez cette branche sur votre dépôt, sur le dépôt marqué `origin`.


### On soumet une PR...

- Depuis votre `fork`, ouvrez une demande de `pull request` sur cette branche (cf. https://help.github.com/articles/creating-a-pull-request/) et ciblez la branche `main` du dépôt d'origine...
- Référencez tous les problèmes ainsi que la documentation sur votre PR.
- Ajoutez un ou plusieurs labels à votre PR
- Utilisez dans vos `commit` des fonctionnalités de GitHub (ex. "Fix #37.").
- Si le responsable demande des modifications supplémentaires, il suffit de les pousser vers votre branche locale, la `pull request` se met à jour automatiquement.
- Une fois que la `pull request` est approuvée, les responsables du projet effectueront le merge (cf. https://help.github.com/articles/merging-a-pull-request/).


## Liens utiles

  https://help.github.com/articles/configuring-a-remote-for-a-fork/
  https://help.github.com/articles/syncing-a-fork/
  https://help.github.com/articles/about-pull-requests/
  https://help.github.com/articles/creating-a-pull-request/
  https://help.github.com/articles/checking-out-pull-requests-locally/
  https://help.github.com/articles/merging-a-pull-request/
  https://help.github.com/articles/about-pull-request-merges/
  https://help.github.com/articles/interactive-rebase

Un exemple de contribution sur un projet (en français) :
https://git-scm.com/book/fr/v2/GitHub-Contribution-%C3%A0-un-projet
