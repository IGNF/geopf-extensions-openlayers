export default ButtonExport;
/**
 * @classdesc
 *
 * button that will plug into a widget and export the contents of the calculation
 *
 * @alias ol.control.Export
 * @module Export
 */
declare class ButtonExport extends Control {
    /**
     * @constructor
    * @param {Object} options - options for function call.
    * @param {Number} [options.id] - Ability to add an identifier on the widget (advanced option)
    * @param {String} [options.download = "true"] - triggering the download of the file
    * @param {String} [options.format = "geojson"] - geojson / kml / gpx
    * @param {String} [options.name = "export"] - export name file
    * @param {String} [options.description = "export"] - export description put into file
    * @param {String} [options.title = "Exporter"] - button name
    * @param {String} [options.kind = "secondary"] - button type : primary | secondary | tertiary
    * @param {Boolean} [options.menu = false] - displays the menu
    * @param {Object} [options.menuOptions] - options of the menu.
    * @param {Boolean} [options.menuOptions.outside = false] - displays all element outside of menu
    * @param {Boolean} [options.menuOptions.above = false] - displays menu above or not of the button
    * @param {Boolean} [options.menuOptions.labelName = true] - displays the label name
    * @param {Boolean} [options.menuOptions.labelDesc = true] - displays the label description
    * @param {Boolean} [options.menuOptions.selectFormat = true] - displays the select format
    * @param {String} [options.direction = "row"] - buttons and menus layout
    * @param {Object} [options.icons] - icons
    * @param {String} [options.icons.menu = "\u2630 "] - displays the menu icon, or otherwise left blank if you don't want it
    * @param {String} [options.icons.button = "export"] - displays the button icon : save or export icon, or otherwise left blank if you don't want it
    * @param {Function} [options.callback] - with a callback, the implementation is your responsibility
    * @param {HTMLElement} [options.target] - target where the button will plug in. By default, the target is 'container-buttons-plugin' into the wikdget
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
    * export.setTarget(<!-- HTMLElement -->);
    * export.setName("export");
    * export.setFormat("geojson");
    * export.setDescription("Export Isochrone");
    * export.setTitle("Exporter");
    * export.setMenu(true);
    * export.setMenuOptions({
    *   outside : false,
    *   labelName : true,
    *   labelDesc : true,
    *   selectFormat : true
    * });
    * export.render(); // <-- direct call to render function !
    * export.on("button:clicked", (data) => { console.log(data); });
    *
    * // method : call map.addControl()
    * var export = new ButtonExport();
    * export.setDownload(true);
    * export.setControl(iso);
    * export.setTarget(<!-- HTMLElement -->);
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
    *   target : <!-- HTMLElement -->,
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
    *   menu : true
    * }});
     */
    constructor(options: {
        id?: number | undefined;
        download?: string | undefined;
        format?: string | undefined;
        name?: string | undefined;
        description?: string | undefined;
        title?: string | undefined;
        kind?: string | undefined;
        menu?: boolean | undefined;
        menuOptions?: {
            outside?: boolean | undefined;
            above?: boolean | undefined;
            labelName?: boolean | undefined;
            labelDesc?: boolean | undefined;
            selectFormat?: boolean | undefined;
        } | undefined;
        direction?: string | undefined;
        icons?: {
            menu?: string | undefined;
            button?: string | undefined;
        } | undefined;
        callback?: Function | undefined;
        target?: HTMLElement | undefined;
        control?: any;
        layer?: any;
    });
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
    uid: number;
    /** @private */
    private extension;
    /** @private */
    private mimeType;
    /** @private */
    private container;
    /** @private */
    private button;
    /** @private */
    private buttonOptions;
    /** @private */
    private inputName;
    /** @private */
    private inputDesc;
    /** @private */
    private menu;
    /** @private */
    private menuClassHidden;
    /**
     * event triggered when the export is finished
     *
     * @event button:clicked
     * @defaultValue "button:clicked"
     * @group Events
     * @typedef {Object}
     * @property {Object} type - event
     * @property {Object} target - instance Export
     * @property {String} content - export data
     * @property {String} name - name
     * @property {String} description - description
     * @property {String} format - format : kml, geojson, ...
     * @property {Object} layer - layer
     * @example
     * Export.on("button:clicked", function (e) {
     *   console.log(e.target);
     * })
     */
    BUTTON_EXPORT_CLICKED_EVENT: string;
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
        direction: string;
        menu: boolean;
        menuOptions: {
            above: boolean;
            outside: boolean;
            labelName: boolean;
            labelDesc: boolean;
            selectFormat: boolean;
        };
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
     * @returns {HTMLElement} - ...
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
     * @param {Layer} layer - ...
     * @param {Object} [data] - ...
     * @param {Object} [style] - ...
     * @returns {String} - ...
     * @private
     */
    private exportFeatures;
    /**
     * ...
     * @param {Event} e - Click
     * @private
     */
    private onClickButtonExport;
    /**
     *
     * @param {Event} e - Click
     * @private
     */
    private onChangeRadioFormat;
    /**
     *
     * @param {Event} e - Click
     * @private
     */
    private onChangeInputName;
    /**
     *
     * @param {Event} e - Focus
     * @private
     */
    private onFocusInputName;
    /**
     *
     * @param {Event} e - Click
     * @private
     */
    private onChangeInputDesc;
    /**
     *
     * @param {Event} e - Focus
     * @private
     */
    private onFocusInputDesc;
    /**
     *
     * @param {Event} e - Click
     * @private
     */
    private onClickButtonToggleOptions;
    /**
     *
     * @param {Event} e - Click
     * @private
     */
    private onClickButtonValidate;
    /**
     *
     * @param {Event} e - Click
     * @private
     */
    private onClickButtonCancel;
    /**
     * Get container
     *
     * @returns {HTMLElement} container
     */
    getContainer(): HTMLElement;
    /**
     * ...
     * @param {Object} control - ...
     * @public
     */
    public setControl(control: any): void;
    /**
     * ...
     * @param {HTMLElement} target - ...
     * @public
     */
    public setTarget(target: HTMLElement): void;
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
     * @param {Object} opts - ...
     * @todo ...
     */
    setMenuOptions(opts: any): void;
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
import Control from "ol/control/Control";
//# sourceMappingURL=Export.d.ts.map