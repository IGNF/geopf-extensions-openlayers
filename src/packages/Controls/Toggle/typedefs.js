/**
 * Typedefs partagés pour les contrôles Toggle.
 * Ce fichier centralise les types réutilisables afin que typedoc génère des docs cohérentes.
 */

/**
 * @typedef {Object} ToggleOptions Options de base du toggle
 * @property {String} [label] - Libellé associé à l'input.
 * @property {String} [title] - Attribut title / aria-label.
 * @property {String|HTMLElement} [icon] - Classe à ajouter au bouton ou élément svg (inline) ou élément HTML à ajouter avant le label (type span).
 */

/**
 * @typedef {Object} ToggleContentOptions
 * @property {String} [label] - Libellé associé à l'input.
 * @property {String} [title] - Attribut title / aria-label.
 * @property {String} [content] - Contenu à ajouter.
 * @property {String} [size] - Taille du panneau ("sm" ou "lg").
 * @property {String} [position] - Position du panneau ("left" ou "right").
 */

/**
 * @typedef {Object} ToggleInteractionOptions
 * @property {String} [label] - Libellé associé à l'input.
 * @property {String} [title] - Attribut title / aria-label.
 * @property {import("ol/interaction").Interaction} [interaction] - Interaction à ajouter.
 */

/**
 * Options du constructeur Dialog
 * @typedef {Object} DialogOptions
 * @property {String} [id] - Identifiant unique du dialog
 * @property {String} [title] - Titre du dialog
 * @property {String} [icon] - Classe CSS de l'icône du dialog
 * @property {String|HTMLElement} [content] - Contenu du dialog (HTML string ou élément DOM)
 * @property {String} [position="right"] - Position du dialog ("left" ou "right")
 * @property {String} [size="md"] - Taille du dialog ("sm" ou "md")
 * @property {String} [className] - Nom de classe CSS additionnel
 * @property {Array<TabNavItem>} [items] - Liste des items de navigation tertiaire
 * @property {String} [labelTabNav] - Attribut aria label de la navigation tertiaire
 * @property {Function} [onOpen] - Callback appelé à l'ouverture du dialog
 * @property {Function} [onClose] - Callback appelé à la fermeture du dialog
 */

/**
 * Objet représentant un item de navigation tertiaire
 * @typedef {Object} TabNavItem
 * @property {String} label - Label du bouton
 * @property {String|HTMLElement} [content] - Contenu lié au bouton
 * @property {String} [title] - Titre du bouton
 * @property {String} [icon] - Classe CSS de l'icône du bouton
 * @property {Function} [onOpen] - Callback appelé à l'ouverture de l'onglet
 * @property {Function} [onClose] - Callback appelé à la fermeture de l'onglet
 */

/**
 * Options du constructeur TabNav
 * @typedef {Object} TabNavOptions
 * @property {Array<TabNavItem>} [items] - Liste des items de navigation
 * @property {String} [label] - Label ARIA de la navigation
 * @property {HTMLElement} [contentContainer] - Conteneur du contenu lié aux onglets. Si non fourni, en créé un et l'ajoute juste après les liens.
 */