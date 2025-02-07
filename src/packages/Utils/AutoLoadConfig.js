import Gp from "geoportal-access-lib";

(function () {
    var scripts = document.getElementsByTagName("script");

    var key = scripts[scripts.length - 1].getAttribute("data-key");
    var url = scripts[scripts.length - 1].getAttribute("data-url");
    var timeout = scripts[scripts.length - 1].getAttribute("data-timeout");

    // callback
    var success = function (data) {
        // Pas de messages en mode prod
        console.log("GetConfig success!");
        window.Gp.Config = data;
    };

    // callback
    var error = function (e) {
        throw new Error("Configuration load failed : " + e.message);
    };

    if (!key && !url) {
        // pas de message d'information !
        // console.log("WARNING : parameters missing 'data-key' and 'data-url', the loading of configuration can not be done !");
        return;
    }

    var options = {
        apiKey : key,
        sync : true,
        onSuccess : success,
        onFailure : error
    };

    if (url) {
        options.customConfigFile = url;
        options.callbackSuffix = "";
    }

    if (timeout) {
        options.timeOut = timeout;
    }

    // test d'existance de la varibale globale Gp.Config
    if (window.Gp) {
        // appel du service
        Gp.Services.getConfig(options);
    }
})();
