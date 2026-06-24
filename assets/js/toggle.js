/* theme par defaut : dsfr */
(function () {
    localStorage.setItem("theme", "dsfr");
    if (document.getElementById("slider")) {
        document.getElementById("slider").checked = false;
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
        // FIX ME - on cache panoramax en mode classique en attendant son implémentation
        const div = document.querySelector('div[id^="GPpanoramax"]');
        if (div) {
            div.style.display = '';
        }
    } else {
        localStorage.setItem("theme", "portail");
        document.getElementById("labelSlider").innerHTML = "Classique";
        enableStylesheet(portail);
        disableStylesheet(dsfr);
        // FIX ME - on cache panoramax en mode classique en attendant son implémentation
        const div = document.querySelector('div[id^="GPpanoramax"]');
        if (div) {
            div.style.display = 'none';
        }
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