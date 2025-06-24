/**
 * @description
 * Implementation of a custom input action for the IOC reporting.
 * It is designed to be used with an Inversion of Control (IoC) container,
 * where the map is injected.
 * This action listens to the map's move events and captures the center coordinate
 * when the map stops moving. The captured coordinate is then used to create a
 * GeoJSON feature representing the location of the report.
 * The projecting of coordinates is done from the map's projection to "EPSG:4326".
 */
class MyInputAction {
    constructor (map /* optionnel !!! */) {
        console.info("MyInputAction constructor");
        this.map = map || null;
        this.data = null;
        this.coordinate = null;
        this.listener = null;
        this.marker = null;
        this.icon = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAzNiIgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4Ij48cGF0aCBmaWxsPSIjMDAwMDkxIiBkPSJNMTguMzY0IDMuNjM2YTkgOSAwIDAgMSAwIDEyLjcyOEwxMiAyMi43MjhsLTYuMzY0LTYuMzY0QTkgOSAwIDAgMSAxOC4zNjQgMy42MzZaTTEyIDhhMiAyIDAgMSAwIDAgNCAyIDIgMCAwIDAgMC00WiIvPjwvc3ZnPg==";
}

    // ######################################################## //
    // ########################## API ######################### //

    setMap (map) {
        console.info("MyInputAction map");
        this.map = map;
    }
    setIcon (icon) {
        console.info("MyInputAction icon");
        if (icon) {
            this.icon = icon;
        }
    }
    getData () {
        console.info("MyInputAction data");
        var projection = "EPSG:4326";
        var geometry = {
            type : "FeatureCollection",
            crs : {
                type : "name",
                properties : {
                    name : projection
                }
            },
            features : [
                {
                    type : "Feature",
                    crs : {
                        type : "name",
                        properties : {
                            name : projection
                        }
                    },
                    geometry : {
                        type : "Point",
                        coordinates : this.coordinate || [0, 0]
                    },
                    properties : {
                        description : "Point de signalement",
                        date : new Date().toISOString(),
                        author : "Anonyme"
                    }
                }
            ]
        };
        this.data = {
            location : geometry
        };
        return this.data || { location : null };
    }
    clear () {
        console.info("MyInputAction clear");
        this.data = null;
        this.coordinate = null;
        if (this.listener) {
            ol.Observable.unByKey(this.listener);
            this.listener = null;
        }
        if (this.marker != null) {
            this.map.removeOverlay(this.marker);
            this.marker = null;
        }
    }
    active () {
        this.#addEventsListeners();
    }
    disable () {
        this.#removeEventsListeners();
    }

    // ######################################################## //
    // ######################### privates ##################### //

    #addEventsListeners () {
        console.info("MyInputAction active");
        if (!this.map) {
            return;
        }
        this.listener = this.map.on("moveend", this.#handler.bind(this));
    }
    #removeEventsListeners () {
        console.info("MyInputAction disable");
        if (!this.map) {
            return;
        }
        ol.Observable.unByKey(this.listener);
    }
    #handler (e) {
        console.info("MyInputAction handler", e);
        if (!this.map) {
            return;
        }

        var view = this.map.getView();
        var crs = view.getProjection();
        var coordinate = view.getCenter();
        this.coordinate = ol.proj.transform(coordinate, crs, "EPSG:4326");
        // on supprime le marqueur précédent
        if (this.marker != null) {
            this.map.removeOverlay(this.marker);
            this.marker = null;
        }
        // on ajoute un marqueur sur la carte
        var markerDiv = document.createElement("img");
        markerDiv.src = this.icon;
        this.marker = new ol.Overlay({
            position : coordinate,
            positioning : "center-center",
            element : markerDiv,
            stopEvent : false
        });
        this.map.addOverlay(this.marker);
    }
}

if (typeof window !== "undefined") {
    window.MyInputAction = MyInputAction;
}
// EOF