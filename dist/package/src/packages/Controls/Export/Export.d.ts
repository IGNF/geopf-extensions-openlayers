export default ButtonExport;
/**
 * @classdesc
 *
 * button that will plug into a widget and export the contents of the calculation
 *
 * @constructor
 * @alias ol.control.Export
 * @param {Object} options - options for function call.
 * @param {Number} [options.id] - Ability to add an identifier on the widget (advanced option)
 * @param {String} [options.download = "true"] - triggering the download of the file
 * @param {String} [options.format = "geojson"] - geojson / kml / gpx
 * @param {String} [options.name = "export"] - export name file
 * @param {String} [options.description = "export"] - export description put into file
 * @param {String} [options.title = "Exporter"] - button name
 * @param {String} [options.kind = "secondary"] - button type : primary | secondary | tertiary
 * @param {Boolean} [options.menu = false] - displays the menu
 * @param {String} [options.direction = "row"] - buttons and menus layout
 * @param {Object} [options.icons] - icons
 * @param {String} [options.icons.menu = "\u2630 "] - displays the menu icon, or otherwise left blank if you don't want it
 * @param {String} [options.icons.button = "export"] - displays the button icon : save or export icon, or otherwise left blank if you don't want it
 * @param {Function} [options.callback] - with a callback, the implementation is your responsibility
 * @param {DOMElement} [options.target] - target where the button will plug in. By default, the target is 'container-buttons-plugin' into the wikdget
 * @param {Object} [options.control] - instance of control
 * @param {Object} [options.layer] - the layer instance is retrieved from the control, but you can defined it
 * @fires button:clicked
 * @example
 * // pluggued widget Export into control Isocurve
 * var iso = new ol.control.Isocurve();
 * map.addControl(iso);
 *
 * // method : call render()
 * var export = new ButtonExport();
 * export.setDownload(true);
 * export.setControl(iso);
 * export.setTarget(<!-- DOMElement -->);
 * export.setName("export");
 * export.setFormat("geojson");
 * export.setDescription("Export Isochrone");
 * export.setTitle("Exporter");
 * export.setMenu(false);
 * export.render(); // <-- direct call to render function !
 * export.on("button:clicked", (data) => { console.log(data); });
 *
 * // method : call map.addControl()
 * var export = new ButtonExport();
 * export.setDownload(true);
 * export.setControl(iso);
 * export.setTarget(<!-- DOMElement -->);
 * export.setName("export");
 * export.setFormat("geojson");
 * export.setDescription("Export Isochrone");
 * export.setTitle("Exporter");
 * export.setKind("secondary");
 * export.setMenu(false);
 * export.on("button:clicked", (data) => { console.log(data); });
 * map.addControl(export); // <-- using the OpenLayers mechanism, don't call to render function !
 *
 * // use control options instead of setters
 * var export = new ButtonExport({
 *   download : true,
 *   control : iso,
 *   target : <!-- DOMElement -->,
 *   name : "export",
 *   description : "Export Isochrone",
 *   format : "geojson",
 *   title : "Exporter",
 *   menu : false,
 *   callback : (content, layer) => {
 *      console.log(content, layer);
 *   }
 * });
 * map.addControl(export);
 *
 * // method with passing option into the control Isocurve
 * var iso = new ol.control.Isocurve({ export : true });
 * // with control options :
 * var iso = new ol.control.Isocurve({ export : {
 *   download : false,
 *   name : "save-iso",
 *   format : "geojson",
 *   title : "Sauvegarde",
 *   menu : false
 * }});
 */
declare class ButtonExport {
    /**
     * See {@link ol.control.Export}
     * @module ButtonExport
     * @alias module:~controls/ButtonExport
     * @param {Object} [options] - options
     * @example
     * import ButtonExport from "gpf-ext-ol/controls/ButtonExport"
     * ou
     * import { ButtonExport } from "gpf-ext-ol"
     */
    constructor(options?: Object);
    /**
     * Nom de la classe (heritage)
     * @private
     */
    private CLASSNAME;
    /**
     * Response to the export of the route calculation
     * (only for jsdoc)
     *
     * @example
     * // GeoJSON format
     * {
     *   "type":"FeatureCollection",
     *   "features":[...],
     *   "geoportail:compute":{
     *     "points":[ [2.588024210134887, 48.84192678293002 ] ],
     *     "transport":"Voiture",
     *     "exclusions":[...],
     *     "computation":"fastest",
     *     "results":{ <!-- Service --> }
     * }
     *
     * @see {@link https://ignf.github.io/geoportal-access-lib/latest/jsdoc/Gp.Services.RouteResponse.html|Service}
     */
    EXPORT_ROUTE: {};
    /**
     * Response to the export of the isochron calculation
     * (only for jsdoc)
     *
     * @example
     * // GeoJSON format
     * {
     *    "type":"FeatureCollection",
     *    "features":[...],
     *    "geoportail:compute":{
     *       "transport":"Pieton",
     *       "computation":"time",
     *       "exclusions":[
     *
     *       ],
     *       "direction":"departure",
     *       "point":[ 2.587835382718464, 48.84192678293002 ],
     *       "results":{
     *          "message":"",
     *          "id":"",
     *          "location":{
     *             "x":"2.587835382718464",
     *             "y":"48.84192678293002"
     *          },
     *          "srs":"EPSG:4326",
     *          "geometry":{
     *             "type":"Polygon",
     *             "coordinates":[[...]]
     *          },
     *         "time":180,
     *         "distance":""
     *      }
     *    }
     * }
     *
     * @see {@link https://ignf.github.io/geoportal-access-lib/latest/jsdoc/Gp.Services.IsoCurveResponse.html|Service}
     */
    EXPORT_ISOCHRON: {};
    /**
     * Response to the export of the profile calculation
     * (only for jsdoc)
     *
     * @example
     * // GeoJSON format
     * {
     *  "type":"FeatureCollection",
     *   "features":[...],
     *   "geoportail:compute":{
     *      "greaterSlope":76,
     *      "meanSlope":7,
     *      "distancePlus":84,
     *      "distanceMinus":48,
     *      "ascendingElevation":5,
     *      "descendingElevation":-4,
     *      "altMin":"92,04",
     *      "altMax":"96,71",
     *      "distance":163,
     *      "unit":"m",
     *      "points":[
     *        {
     *            "z":95.68,
     *            "lon":2.5874,
     *            "lat":48.8419,
     *            "acc":2.5,
     *            "dist":0,
     *            "slope":0
     *         }
     *      ]
     *   }
     * }
     *
     * @see {@link https://ignf.github.io/geoportal-access-lib/latest/jsdoc/Gp.Services.AltiResponse.html|Service}
     */
    EXPORT_PROFILE: {};
    uid: any;
    extension: string | null;
    mimeType: string | null;
    container: HTMLDivElement | null;
    button: any;
    inputName: any;
    inputDesc: any;
    menu: any;
    menuClassHidden: string;
    /**
     * Render DOM
     *
     * @public
     */
    public render(): void;
    /**
     * Initialize options
     * (called by constructor)
     *
     * @param {Object} options - options
     * @private
     */
    private initOptions;
    options: {
        layer: null;
        control: null;
        target: null;
        download: boolean;
        format: string;
        name: string;
        description: string;
        title: string;
        kind: string;
        menu: boolean;
        icons: {
            menu: string;
            button: string;
        };
        callback: null;
    } | undefined;
    /**
     * Initialize container
     * (called by constructor)
     *
     * @private
     * @todo menu des options
     */
    private initContainer;
    /**
     * ...
     *
     * @param {String} str - ...
     * @returns {DOMElement} - ...
     * @private
     */
    private stringToHTML;
    /**
     * ...
     * @returns {Boolean} - ...
     * @private
     */
    private isPluggableControl;
    /**
     * ...
     * @param {Object} layer - ...
     * @param {Object} [data] - ...
     * @param {Object} [style] - ...
     * @returns {String} - ...
     * @private
     */
    private exportFeatures;
    /**
     * ...
     * @param {*} e - Click
     */
    onClickButtonExport(e: any): void;
    /**
     *
     * @param {*} e - Click
     */
    onChangeRadioFormat(e: any): void;
    /**
     *
     * @param {*} e - Click
     */
    onChangeInputName(e: any): void;
    /**
     *
     * @param {*} e - Click
     */
    onChangeInputDesc(e: any): void;
    /**
     *
     * @param {*} e - Click
     */
    onClickButtonToggleOptions(e: any): void;
    /**
     * Get container
     *
     * @returns {DOMElement} container
     */
    getContainer(): DOMElement;
    /**
     * ...
     * @param {Object} control - ...
     * @public
     */
    public setControl(control: Object): void;
    /**
     * ...
     * @param {DOMElement} target - ...
     * @public
     */
    public setTarget(target: DOMElement): void;
    /**
     * ...
     * @param {String} format - ...
     * @public
     */
    public setFormat(format: string): void;
    /**
     * ...
     * @param {String} name - ...
     * @public
     */
    public setName(name: string): void;
    /**
     * ...
     * @param {String} desc - ...
     * @public
     */
    public setDescription(desc: string): void;
    /**
     * ...
     * @param {String} title - ...
     * @public
     */
    public setTitle(title: string): void;
    /**
     * ...
     * @param {String} type - ...
     * @public
     */
    public setKind(type: string): void;
    /**
     * ...
     * @param {Boolean} active - ...
     * @public
     */
    public setMenu(active: boolean): void;
    /**
     * ...
     * @param {*} layer  - ...
     * @public
     */
    public setLayer(layer: any): void;
    /**
     * ...
     * @param {Boolean} value - ...
     * @public
     */
    public setDownload(value: boolean): void;
}
//# sourceMappingURL=Export.d.ts.map