# Information

> construction du package des sources

## remise à plat des paths

```js
import Drawing from "geopf-extensions-openlayers/controls/Drawing"
import {
    Drawing,
    Route
} from "geopf-extensions-openlayers/controls"

import LayerWMTS from "geopf-extensions-openlayers/layers/LayerWMTS";
import {
    LayerWMTS as GeoportalWMTS,
    LayerWMS as GeoportalWMS
} from "geopf-extensions-openlayers/layers";
```

utilisation standard :

```js
    import {
        version,
        date,
        LoggerUtils as Logger,
        LayerWMTS as GeoportalWMTS,
        LayerWMS as GeoportalWMS,
        Drawing,
        Isocurve,
        Route,
        LayerImport,
        GeoportalAttribution,
        ElevationPath,
        MeasureArea,
        MeasureAzimuth,
        MeasureLength,
        LayerSwitcher,
        MousePosition as GeoportalMousePosition,
        ReverseGeocode,
        SearchEngine,
        GetFeatureInfo
    } from "geopf-extensions-openlayers";
```

## creation du changelog

> workflow de creation / mise à jour du changelog lors d'une publication d'une release

