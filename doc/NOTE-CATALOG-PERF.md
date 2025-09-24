# Informations utiles sur le gestionnaire du catalogue (Copilot)

> Questions / Réponses realisées avec Copilot

## Voici plusieurs pistes concrètes pour optimiser et améliorer les performances

<https://web.dev/articles/dom-size-and-interactivity?hl=fr>

<https://learn.microsoft.com/en-us/microsoft-edge/devtools/performance/selector-stats>

### 1. **Chargement asynchrone et lazy loading**

- ✅ **Chargement différé des couches** : Ne charge que la configuration ou les couches visibles à l’ouverture du panneau, ou lors d’un changement d’onglet/catégorie.
- ✔️ **Pagination ou virtualisation** : Si le catalogue contient beaucoup de couches, affiche-les par pages ou utilise une liste virtuelle (DOM limité aux éléments visibles).

---

### 2. **Manipulation DOM efficace**

- ✔️ **Minimiser les accès et modifications DOM** : Utilise des fragments (`DocumentFragment`) pour construire les listes avant insertion, évite les suppressions/ajouts répétés.
- ✔️ **Batch update** : Grouper les modifications DOM lors des filtres ou changements de catégories.

---

### 3. **Optimisation des filtres et recherches**

- ❌ **Pré-indexation** : Prépare un index (par critère de recherche) lors du chargement pour accélérer les recherches.
- ✅ **Debounce sur la recherche** : Ajoute un délai (debounce) sur l’input de recherche pour éviter de recalculer à chaque frappe.

---

### 4. **Gestion mémoire et objets**

- ✅ **Nettoyage des listeners** : Vérifie que tous les écouteurs sont bien retirés lors de la destruction ou du retrait du contrôle.
- ❌ **Réutilisation des objets** : Réutilise les objets de configuration et évite les copies profondes inutiles.

---

### 5. **Affichage et rendu**

- ✔️ **Affichage conditionnel** : Ne crée les éléments DOM des catégories/onglets que lorsqu’ils sont affichés.
- ✅ **Utilisation de classes CSS** : Préfère masquer/afficher via des classes plutôt que de supprimer/ajouter des éléments DOM.

---

### 6. **Optimisation du tri et des boucles**

- ✔️ **Tri une seule fois** : Trie la liste des couches une seule fois lors du chargement, pas à chaque ajout.
- ✔️ **Boucles efficaces** : Utilise `for...of` ou `Object.keys()` pour itérer sur les objets, évite les boucles imbriquées inutiles.

---

### 7. **Exemple d’amélioration sur le filtre de recherche**

✅ Ajoute un debounce sur la recherche :

````javascript
// ...existing code...
onSearchCatalogInputChange () {
    clearTimeout(this._searchTimeout);
    this._searchTimeout = setTimeout(() => {
        this.onSearchCatalogButtonClick();
    }, 200); // 200ms de délai
}
// ...existing code...
````

---

### 8. **Audit et outils**

- **Profiler navigateur** : Utilise les outils de profilage (Chrome DevTools) pour repérer les lenteurs lors de l’ouverture du catalogue ou de la recherche.
- **Audit Lighthouse** : Pour vérifier l’impact sur le temps de chargement et la réactivité.

---

### 9. **Documentation et bonnes pratiques**

- ✔️ Documente les points critiques (ex : pourquoi tel choix de structure, comment étendre le contrôle sans impacter les perfs).
- ❌ Ajoute des tests de performance si le catalogue évolue.

---

**En résumé** :  

- Charge et affiche uniquement ce qui est nécessaire.
- Optimise les accès DOM et les traitements en mémoire.
- Nettoie bien les ressources.
- Utilise les outils de profilage pour cibler les vrais points à améliorer.

## ...