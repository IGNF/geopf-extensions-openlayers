const exceptions = ["GPoverviewMap", "GPfullScreen"];

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

var PanelManager = function (position, openedPanelID) {
    var openedPanel = getSameSideOpenedPanel(position, openedPanelID);
    if (openedPanel.length > 0) {
        openedPanel[0].getElementsByTagName("button")[0].click();
    }
};

export default PanelManager;
