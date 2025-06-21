class MyServiceAction {
    constructor () {
        console.info("MyServiceAction constructor");
        this.url = "https://www.geoportail.gouv.fr/wp-json/wp/v2";
    }
    // ######################################################## //
    // ########################## API ######################### //
    active () {
        console.info("MyServiceAction active");
    }
    disable () {
        console.info("MyServiceAction disable");
    }
    send (data) {
        console.info("MyServiceAction send");
        return this.#send(data);
    }
    clear () {
        console.info("MyServiceAction clear");
    }
    // ######################################################## //
    // ######################### privates ##################### //

    /**
     * @summary
     * Le code est issu de l'appli mobile Carte IGN
     */
    async #send (data) {
        console.info("MyServiceAction #send", data);
        var location = data.location.features[0].geometry.coordinates;
        if (data.location.crs.properties.name !== "EPSG::4326") {
            // reprojection
            location = ol.proj.transform(
                data.location.features[0].geometry.coordinates,
                data.location.crs.properties.name,
                "EPSG:4326"
            );
        }
        const permalink = `https://cartes.gouv.fr/cartes?c=${location[0]},${location[1]}&z=11&l=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2$GEOPORTAIL:OGC:WMTS(1;1;1;0)&w=OverviewMap,SearchEngine,ScaleLine,LayerSwitcher,GetFeatureInfo,Legends,Zoom,FullScreen,Share,Print,Territories,LayerImport,ControlList,ContextMenu&permalink=yes`;
        const anomaly = {
            name: data.name + " (Anomalie) (cartes.gouv.fr)",
            description: data.desc,
            theme: data.theme,
            permalink: permalink,
            id_drawing: "",
            mail: data.mail,
        };

        const drawing = {
            is_anomaly: 1,
            kml: data.drawing,
            layername: data.name,
            name: data.name,
        };

        const drawingRequestBody = {drawing: drawing};
        const drawingResponse = await fetch(this.url + "/drawing", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer undefined",
            },
            mode: "cors",
            credentials: "same-origin",
            body: JSON.stringify(drawingRequestBody),
        });
        const drawingResults = await drawingResponse.json();

        anomaly.id_drawing = drawingResults.drawing[0].id;

        const requestBody = {anomaly: anomaly};
        await fetch(this.url + "/anomaly", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer undefined",
            },
            mode: "cors",
            credentials: "same-origin",
            body: JSON.stringify(requestBody),
        });
    }

}
if (typeof window !== "undefined") {
    window.MyServiceAction = MyServiceAction;
}
// EOF