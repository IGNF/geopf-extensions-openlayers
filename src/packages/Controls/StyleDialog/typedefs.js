/**
 * @typedef {Object} InputConfig Configuration pour un type input
 * @property {String} label Le label de l'input
 * @property {String} property La propriété flat style correspondante
 * @property {String|Object} type Le type de l'input. Peut aussi être un type `select`, auquel cas l'élément ajouté est un élément select.
 * Peut être un objet avec une methode getInput()/getElement() pour les inputs personnalisés
 * @property {Object<String, String>} options Les options du select (valeur: libellé)
 * @property {String} label Le label de l'input
 */

/**
 * @typedef {Object} SelectConfig
 * @property {HTMLSelectElement} select L'élément select HTML
 * @property {String} label Le label du select
 * @property {String} property La propriété flat style correspondante
 * @property {Object<String, String>} options Les options du select (valeur: libellé)
 */

/**
 * @typedef {Object} FlatStyleFormConfig Configuration d'un formulaire de style.
 * @property {Boolean} [hasbutton] Indique si le formulaire a un bouton de validation.
 */