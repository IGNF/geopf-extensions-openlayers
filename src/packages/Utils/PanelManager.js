const exceptions = ["GPoverviewMap", "GPfullScreen"];

// widgets dont l'ouverture doit désactiver le GetFeatureInfo
const gfiIncompatiblePanels = ["GPdrawing"];

// état du GetFeatureInfo avant sa désactivation par un widget incompatible
var gfiActiveBeforePanel = false;

function getGetFeatureInfoControl (widget) {
    var map = (widget && typeof widget.getMap === "function") ? widget.getMap() : null;
    if (!map) {
        return null;
    }
    return map.getControls().getArray().filter(control => control.CLASSNAME === "GetFeatureInfo")[0] || null;
}

function getSameSideOpenedPanel (position, openedPanelID) {
    // on ajoute aux exceptions le panel qui vient d'être ouvert
    var exceptionPanel = [...exceptions, openedPanelID];
    var controlPanels = [];
    if (position && position.includes("left")) {
        var bottomLeft = document.getElementById("position-container-bottom-left");
        var topLeft = document.getElementById("position-container-top-left");
        controlPanels = [...bottomLeft.children, ...topLeft.children];
    }
    if (position && position.includes("right")) {
        var bottomRight = document.getElementById("position-container-bottom-right");
        var topRight = document.getElementById("position-container-top-right");
        controlPanels = [...bottomRight.children, ...topRight.children];
    }
    // on ne ferme que les panles déjà ouverts qui ne sont pas exceptions
    return controlPanels.filter(p => {
        var panelID = p.id.match(/(\w+)-[0-9]+/)[1];
        var isException = exceptionPanel.includes(panelID);
        var isOpened = p.getElementsByTagName("button")[0].getAttribute("aria-pressed");
        if (isOpened === "true" && !isException) {
            return p;
        }
    });
}

var PanelManager = function (position, openedPanelID, widget) {
    var openedPanel = getSameSideOpenedPanel(position, openedPanelID);
    // on ferme tous les panels ouverts
    openedPanel.forEach((panel) => {
        // Si panel du GFI, on ferme le panel en cliquant sur le bouton de fermeture du panel
        var closeButton = panel.querySelector(".GPcloseGetFeatureInfo") || panel.getElementsByTagName("button")[0];
        closeButton.click();
    });

    if (gfiIncompatiblePanels.includes(openedPanelID)) {
        var gfi = getGetFeatureInfoControl(widget);
        if (gfi) {
            gfiActiveBeforePanel = gfi.getActive();
            gfi.setActive(false);
        }
    }
};

/**
 * Réactive le GetFeatureInfo à la fermeture d'un widget incompatible.
 *
 * @param {String} closedPanelID - id du widget fermé
 * @param {Object} widget - instance du widget fermé
 */
var PanelManagerClose = function (closedPanelID, widget) {
    if (!gfiIncompatiblePanels.includes(closedPanelID)) {
        return;
    }
    var gfi = getGetFeatureInfoControl(widget);
    if (gfi && gfiActiveBeforePanel) {
        gfi.setActive(true);
    }
    gfiActiveBeforePanel = false;
};

export default PanelManager;
export { PanelManagerClose };
