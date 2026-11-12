
# Informations utiles sur le positionnement (Copilot)

> Questions / Réponses realisées avec Copilot

## Voici comment fonctionne le positionnement des pictogrammes (widgets/contrôles) sur la carte

Le positionnement du contrôle **LayerSwitcher** (et donc de son pictogramme d’ouverture) sur la carte est géré via l’option **position** passée au constructeur, puis appliquée dans la méthode **setPosition** (appelée dans setMap).

Dans le code, tu retrouves :

```javascript
// Dans setMap()
if (this.options.position) {
    this.setPosition(this.options.position);
}
```

La méthode **setPosition** (héritée ou à surcharger) applique généralement une classe CSS ou un style inline sur le conteneur principal du widget (this.container) pour le placer dans un coin de la carte (ex : top-left, top-right, etc.).

L’option position détermine la position du widget (et donc du pictogramme) sur la carte.
Tu peux personnaliser la position en modifiant la valeur de position ou les styles associés dans le CSS du widget.

### Fonctionnement du positionnement (classe Control.js)

- **L’option `position`** (ex : `"top-left"`, `"bottom-right"`, etc.) est transmise au contrôle lors de son ajout.
- La méthode `setPosition(pos)` du contrôle appelle la classe interne `PositionFactory`.
- `PositionFactory` crée (si besoin) des conteneurs dédiés pour chaque coin de la carte (`position-container-top-left`, etc.) dans le conteneur d’overlays d’OpenLayers.
- Le contrôle (et donc son pictogramme) est déplacé dans le bon conteneur selon la position demandée.
- Les styles CSS associés à ces conteneurs assurent l’ancrage visuel.

### Exemple d’utilisation

```javascript
const layerSwitcher = new LayerSwitcher({
    position: "top-right"
});
map.addControl(layerSwitcher);
```

### Pour personnaliser

- **Ajoute ou modifie les styles CSS** des classes `.position-container-top-left`, `.position-container-bottom-right`, etc. pour ajuster l’apparence ou l’espacement.
- **Ajoute d’autres ancres** si besoin en complétant le tableau `ANCHORS` et en adaptant la logique de `PositionFactory`.

### Résumé

- Le positionnement est entièrement géré par la classe `ControlExtended` et `PositionFactory`.
- Tu peux placer n’importe quel contrôle (et donc pictogramme) dans un des coins de la carte en passant l’option `position`.
- Le système est extensible et centralisé, ce qui facilite la maintenance et la personnalisation.

Même sans l’option `position`, tu peux positionner le pictogramme ou le panneau du contrôle **LayerSwitcher** (ou tout autre contrôle) en utilisant uniquement du CSS, grâce à un positionnement absolu ou fixe.

### Exemple de positionnement absolu en CSS

Supposons que ton conteneur principal ait une classe ou un id, par exemple `.ol-control-layerswitcher` ou `#GPlayerSwitcher`.

Ajoute dans ton CSS :

```css
/* Positionnement absolu en haut à droite */
.ol-control-layerswitcher {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1000;
}

/* Ou en bas à gauche */
.ol-control-layerswitcher {
    position: absolute;
    bottom: 20px;
    left: 20px;
    z-index: 1000;
}
```

### À retenir

- Le positionnement CSS fonctionne toujours, même sans l’option JS `position`.
- Tu peux utiliser `position: absolute;`, `fixed;` ou même `grid-area` si tu utilises une grille CSS.
- Le positionnement via l’option `position` est utile pour automatiser et centraliser la gestion, mais le CSS reste prioritaire si tu veux forcer une position spécifique.

---

**En résumé** :  
Le positionnement peut être géré uniquement en CSS, sans l’option JS, en ciblant le conteneur du contrôle et en appliquant les règles de positionnement souhaitées.

## Ancrage haut des panneaux Classic et DSFR

Pour les contrôles utilisant `position`, la position du bouton et celle du panneau
sont distinctes. Les boutons conservent leur coin et leur ordre dans leur colonne.
Le panneau s'ouvre en haut de la carte, à gauche pour `top-left` et `bottom-left`,
ou à droite pour `top-right` et `bottom-right`, à côté de la colonne de boutons.
Il s'agit du haut de la carte, pas du haut de la fenêtre du navigateur.

### Répartition des responsabilités

- `PositionFactory` dans `Control.js` applique `top: 0` aux dialogues `GPpanel`
    qu'il positionne. Le calcul du côté et des décalages horizontaux est commun aux
    deux thèmes ; les dialogues associés conservent leur décalage horizontal cumulé.
- En Classic, les colonnes occupent toute la hauteur de la carte. Les colonnes
    hautes alignent leurs boutons avec `flex-start`, les colonnes basses avec
    `flex-end`. Leur largeur de 32 px et leurs marges existantes sont conservées.
- Les dimensions, marges et styles DSFR restent dans leur feuille de thème,
    inchangée. La fonction `checkDsfr()` est conservée ; le calcul d'ancrage n'en a
    plus besoin et son import inutilisé est retiré de `Control.js` uniquement.
- `PanelManager` ferme déjà les panneaux d'un même côté, en regroupant les
    colonnes hautes et basses : aucune nouvelle gestion d'ouverture n'est ajoutée.

Les éléments `GPpanel` qui ne sont pas des dialogues ne sont pas repositionnés
par cette logique. Les contrôles sans `position` restent régis par leur CSS ou
leur intégration dans une cible externe. Les règles mobiles et les mécanismes de
déplacement manuel ne sont pas remplacés par une nouvelle politique globale.

### Vérifications du 28 octobre 2026

La recette utilise une carte locale vide de 700 × 600 px, décalée de 24 px dans
la page, avec Route et LayerImport dans chacune des quatre colonnes. Elle compare
le calcul compilé précédent avec la source modifiée de `Control.js`, chargée dans
le navigateur avec un adaptateur des imports pour réutiliser les contrôles des
exemples générés. La feuille source Classic modifiée est chargée séparément.

- Les huit panneaux Classic s'ouvrent à la coordonnée verticale 0 de la carte,
    avec un retrait horizontal de 32 px du côté de leur bouton.
- Les coordonnées des boutons sont identiques à celles précédant le changement.
- Après réduction de la hauteur de la carte à 430 px, les huit panneaux restent
    ancrés en haut à l'ouverture.
- Les espaces vides des colonnes laissent la carte recevoir les événements de
    pointeur. Ouvrir un panneau ferme toujours celui déjà ouvert du même côté.
- Deux dialogues associés conservent leurs décalages horizontaux cumulés ; un
    panneau secondaire non-dialogue conserve ses coordonnées.
- Après stabilisation des polices, les coordonnées DSFR comparées avant/après
    sont identiques. Les positions mobiles comparées à 390 px de largeur restent
    également inchangées en Classic et DSFR.

Cette recette valide le calcul source et les consommateurs retenus, pas une
nouvelle distribution compilée ni tous les widgets. L'exécution terminal n'étant
pas disponible pendant cette intervention, les commandes suivantes restent à
exécuter avant validation des distributions :

```sh
npx eslint src/packages/Controls/Control.js
npm run build:modules
npm run build:bundle
```

Les cas multi-cartes, les déplacements manuels et les positionnements spécialisés
nécessitent une recette complémentaire. Les sélecteurs globaux du gestionnaire
de panneaux multi-cartes ne sont pas refondus dans cette modification.