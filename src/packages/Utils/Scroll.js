/**
 * @file Fichiers liés au scroll / à la visibilité d'éléments.
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/} Pour plus d'infos.
 */


/**
 * Indique si l'élément est visible dans la vue courante
 * @param {Element} element Élément à vérifier
 * @returns {Boolean} Vrai si l'élément est visible.
 */
function isElementInView (element) {
    var bounding = element.getBoundingClientRect();

    return (
        bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <=
    (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <=
    (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Vérifie si un élément est scrollable ou non
 * @param {Element} element Élément à vérifier
 * @returns {Boolean} Vrai si c'est le cas.
 */
function isScrollable (element) {
    return element && element.clientHeight < element.scrollHeight;
}

/**
 * Vérifie si un élément enfant est dans l'aire de scroll de son parent.
 * Si ce n'est pas le cas, scroll au niveau du parent
 * @param {Element} activeElement Élément actif (élément enfant)
 * @param {Element} scrollParent Élément parent
 */
function maintainScrollVisibility (activeElement, scrollParent) {
    const { offsetHeight, offsetTop } = activeElement;
    const { offsetHeight : parentOffsetHeight, scrollTop } = scrollParent;

    const isAbove = offsetTop < scrollTop;
    const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight;

    if (isAbove) {
        scrollParent.scrollTo(0, offsetTop);
    } else if (isBelow) {
        scrollParent.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight);
    }
}

export {
    isElementInView,
    isScrollable,
    maintainScrollVisibility
};