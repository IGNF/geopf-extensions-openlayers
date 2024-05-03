# Information

> construction du package des sources

## remise à plat des paths

```js
import Drawing from "geoportal-extensions-openlayers/controls/Drawing"
import {
    Drawing,
    Route
} from "geoportal-extensions-openlayers/controls"

import LayerWMTS from "geoportal-extensions-openlayers/layers/LayerWMTS";
import {
    LayerWMTS as GeoportalWMTS,
    LayerWMS as GeoportalWMS
} from "geoportal-extensions-openlayers/layers";
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
    } from "geoportal-extensions-openlayers";
```
