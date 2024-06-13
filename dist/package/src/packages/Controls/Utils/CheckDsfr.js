var checkDsfr = function () {
    // HACK: check si le styl dsfr est chargé via la variable blue-france-sun-113-625
    var style = getComputedStyle(document.documentElement);
    var color = style.getPropertyValue("--blue-france-sun-113-625");
    if (color === "") {
        return false;
    }
    return true;
};

export default checkDsfr;

