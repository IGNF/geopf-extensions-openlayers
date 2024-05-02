/* theme par defaut : portail */
(function () {
    localStorage.setItem("theme", "portail");
    if (document.getElementById("slider")) {
        document.getElementById("slider").checked = true;
    }
})();

function toggleTheme () {
    var portail = document.querySelectorAll("link[id='portail']");
    var dsfr = document.querySelectorAll("link[id^=dsfr]");

    if (localStorage.getItem("theme") === "portail") {
        localStorage.setItem("theme", "dsfr");
        document.getElementById("labelSlider").innerHTML = "DSFR";
        enableStylesheet(dsfr);
        disableStylesheet(portail);
    } else {
        localStorage.setItem("theme", "portail");
        document.getElementById("labelSlider").innerHTML = "Classique";
        enableStylesheet(portail);
        disableStylesheet(dsfr);
    }
}

function enableStylesheet (nodes) {
    nodes.forEach(node => {
        node.rel = "stylesheet";
    });
}

function disableStylesheet (nodes) {
    nodes.forEach(node => {
        node.rel = "alternate stylesheet";
    });
}