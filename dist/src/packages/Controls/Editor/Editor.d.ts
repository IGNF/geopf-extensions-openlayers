export default Editor;
export type EditorOptions = {
    /**
     * - Sélecteur ou élément DOM cible pour l’insertion de l’éditeur.
     */
    target?: string | HTMLElement | undefined;
    /**
     * - URL du style MapBox ou objet JSON du style.
     */
    style?: string | any;
    /**
     * - Liste des thèmes MapBox (voir exemple).
     */
    themes?: any;
    /**
     * - Contexte d’exécution pour les handlers d’événements.
     */
    scope?: any;
    /**
     * - Dictionnaire des handlers d’événements personnalisés.
     */
    events?: any;
    /**
     * - Configuration des outils et options d’affichage (voir ci-dessous).
     */
    tools?: any;
    /**
     * - Identifiant unique du widget.
     */
    id?: string | number | undefined;
    /**
     * - Afficher la liste des couches.
     */
    layers?: boolean | undefined;
    /**
     * - Afficher l’outil de recherche de couches.
     */
    search?: boolean | undefined;
    /**
     * - Afficher l’édition des filtres.
     */
    filter?: boolean | undefined;
    /**
     * - Afficher l’édition des légendes.
     */
    legend?: boolean | undefined;
    /**
     * - Grouper les couches.
     */
    group?: boolean | undefined;
    /**
     * - Construction automatique des groupes.
     */
    groupAuto?: boolean | undefined;
    /**
     * - Activer le tri des couches.
     */
    sort?: boolean | undefined;
    /**
     * - Critère de tri ("id", "class", "geom").
     */
    sortBy?: string | undefined;
    /**
     * - Ordre de tri ("asc", "desc").
     */
    sortOrder?: string | undefined;
    /**
     * - Afficher les titres des rubriques.
     */
    title?: boolean | undefined;
    /**
     * - Afficher/plie les groupes de couches.
     */
    collapse?: boolean | undefined;
    /**
     * - Afficher le type de géométrie.
     */
    type?: boolean | undefined;
    /**
     * - Afficher la puce pour chaque couche.
     */
    pin?: boolean | undefined;
    /**
     * - Afficher l’icône de visibilité.
     */
    visibility?: boolean | undefined;
    /**
     * - Configuration de l’icône de visibilité.
     */
    icon?: {
        /**
         * - Afficher l’icône image.
         */
        image?: boolean | undefined;
        /**
         * - Position de l’icône ("start" ou "end").
         */
        anchor?: string | undefined;
    } | undefined;
    /**
     * - Activer l’édition des légendes.
     */
    editable?: boolean | undefined;
};
/**
 * @typedef {Object} EditorOptions
 * @property {string|HTMLElement} [target] - Sélecteur ou élément DOM cible pour l’insertion de l’éditeur.
 * @property {string|Object} style - URL du style MapBox ou objet JSON du style.
 * @property {Object} [themes] - Liste des thèmes MapBox (voir exemple).
 * @property {Object} [scope] - Contexte d’exécution pour les handlers d’événements.
 * @property {Object} [events] - Dictionnaire des handlers d’événements personnalisés.
 * @property {Object} [tools] - Configuration des outils et options d’affichage (voir ci-dessous).
 * @property {string|number} [id] - Identifiant unique du widget.
 *
 * @property {boolean|Object} [tools.themes=false] - Afficher/cacher les thèmes ou config avancée.
 * @property {boolean} [tools.layers=true] - Afficher la liste des couches.
 * @property {boolean} [tools.search=false] - Afficher l’outil de recherche de couches.
 * @property {boolean} [tools.style=false] - Afficher l’édition des styles.
 * @property {boolean} [tools.filter=false] - Afficher l’édition des filtres.
 * @property {boolean} [tools.legend=false] - Afficher l’édition des légendes.
 * @property {boolean} [tools.group=false] - Grouper les couches.
 * @property {boolean} [tools.groupAuto=false] - Construction automatique des groupes.
 * @property {boolean} [tools.sort=true] - Activer le tri des couches.
 * @property {string} [tools.sortBy="id"] - Critère de tri ("id", "class", "geom").
 * @property {string} [tools.sortOrder="asc"] - Ordre de tri ("asc", "desc").
 * @property {boolean} [tools.title=true] - Afficher les titres des rubriques.
 * @property {boolean|undefined} [tools.collapse] - Afficher/plie les groupes de couches.
 * @property {boolean} [tools.type=true] - Afficher le type de géométrie.
 * @property {boolean} [tools.pin=true] - Afficher la puce pour chaque couche.
 * @property {boolean} [tools.visibility=true] - Afficher l’icône de visibilité.
 * @property {Object} [tools.icon] - Configuration de l’icône de visibilité.
 * @property {boolean} [tools.icon.image=true] - Afficher l’icône image.
 * @property {string} [tools.icon.anchor="end"] - Position de l’icône ("start" ou "end").
 * @property {boolean} [tools.editable=true] - Activer l’édition des légendes.
 */
/**
 * @classdesc
 *
 * Editor Styles MapBox...
 *
 * @alias ol.style.Editor
 * @module Editor
 */
declare class Editor {
    /**
     * @constructor
    * @param {EditorOptions} options - options for function call.
    * @fires editor:layer:onclickvisibility
    * @fires editor:layer:onclickclone
    * @fires editor:layer:onclickremove
    * @fires editor:style:oneditjson
    * @fires editor:style:scale:onchangemin
    * @fires editor:style:scale:onchangemax
    * @fires editor:legend:onclickedition
    * @fires editor:legend:onchangevalue
    * @fires editor:filter:oneditjson
    * @fires editor:themes:onclickimage
    * @fires editor:themes:onclicktitle
    * @fires editor:group:oncollapse
    * @fires editor:onloaded
    * @example
    *   var editor = new Editor ({
    *      target : "",
    *      style : "data/styles/layer.json",
    *      themes: {
    *          themesSummary : "",
    *          themes : [{
    *             "thumbnail": "data/images/layer0.png",
    *             "name": "standard0",
    *             "url": "data/styles/layer0.json",
    *             "description": "",
    *             "selected" : true
    *          },{
    *             "thumbnail": "data/images/layer1.png",
    *             "name": "standard1",
    *             "url": "data/styles/layer1.json",
    *             "description": ""
    *          }]
    *      },
    *      scope : this,
    *      events : {
    *          "editor:layer:onclickvisibility" : ...,
    *          "editor:layer:onclickclone" : ...,
    *          "editor:layer:onclickremove" : ...,
    *          "editor:style:oneditjson" : ...,
    *          "editor:style:scale:onchangemin" : ...,
    *          "editor:style:scale:onchangemax" : ...,
    *          "editor:filter:oneditjson" : ...,
    *          "editor:themes:onclickimage" : this._onClickEventImageTheme(),
    *          "editor:themes:onclicktitle" : function(e) {...}
    *      },
    *      tools : {
    *          // afficher/cacher les themes (par defaut) ou utiliser les options
    *          themes : true | false | {
    *              target : "...",
    *              tools : {
    *                  "thumbnails": true,
    *                  "button": { visible : true, type : "checkbox" }
    *              },
    *          },
    *          layers : true | false,     // afficher les couches (layers)
    *          search : true | false,     // TODO : afficher l'outil de recheche de couches
    *          style : true | false,      // afficher les styles (sous menu layers)
    *          filter : true | false,     // afficher les filtres (sous menu layers)
    *          legend : true | false,     // afficher les legendes (layers)
    *          group : true | false,      // grouper les couches, l'option 'sort' doit être activée (layers)
    *          groupAuto : true | false,  // definir la construction automatiques des groupes
    *          sort : true | false,       // trier les couches (layers)
    *          sortBy : "id|class|geom",  // definir le type de tri (layers)
    *          sortOrder : "asc, desc",   // definir l'ordre de tri (layers)
    *          title : true | false       // afficher les titres des rubriques,
    *          collapse : true | false | undefined // afficher et/ou plier les couches ou ne pas afficher l'option,
    *          type : true | false,       // afficher le type de geometrie (layers)
    *          pin : true | false,        // afficher la puce pour chaque couche (layers)
    *          visibility : true | false, // afficher l'icone de visibilité (layers),
    *          icon : {                   // afficher l'icone "oeil" ou "checkbox" (layers),
    *              "image" : true,
    *              "anchor" : "start" // afficher l'icone au debut ou à la fin de la ligne
    *          },
    *          editable : true | false    // active l'edition de la legende (legendes)
    *      }
    *   });
    *   // options par defaut
    *   {
    *      themes : false,
    *      layers : true,
    *      search : false,
    *      style : false,
    *      filter : false,
    *      legend : false,
    *      group : false,
    *      groupAuto : false,
    *      sort : true,
    *      sortBy : "id",
    *      sortOrder : "asc",
    *      title : true,
    *      collapse : undefined,
    *      type : true,
    *      pin : true,
    *      visibility : true,
    *      icon : {
    *          image : true,
    *          anchor : "end"
    *      },
    *      editable : true
    *   }
    *   // Context
    *   editor.setContext("map", map);
    *   editor.setContext("layer", layer);
    *   // create DOM
    *   editor.createElement()
    *     .then(() => {
    *       console.warn(editor.getID());
    *       console.log(this.getContext("map"));
    *       console.log(this.getContext("layer"));
    *     })
    *     .catch(error => {});
    *   // possibility to add listeners with globale variable : eventbus
    *   eventbus.addEventListener("editor:style:scale:onchangemin", function (e) {...});
     */
    constructor(options: EditorOptions);
    options: EditorOptions;
    /**
     * Initialize component
     * (called by constructor)
     *
     * @private
     */
    private _initialize;
    id: string | number | undefined;
    context: {} | undefined;
    layers: any[] | undefined;
    container: HTMLDivElement | null | undefined;
    name: {
        target: string;
        container: string;
        containerID: string;
        containerLayers: string;
        titleLayers: string;
        titleLayersID: string;
        titleThemes: string;
        titleThemesID: string;
        sep: string;
    } | undefined;
    mapbox: any;
    sprites: {} | undefined;
    /**
    * Initialize events with handlers
    * (called by constructor)
    *
    * List Events :
    *          "editor:layer:visibility"
    *          "editor:layer:clone"
    *          "editor:layer:remove"
    *          "editor:style:edit"
    *          "editor:style:minScale"
    *          "editor:style:maxScale"
    *          "editor:filter:edit"
    *          "editor:themes:image",
    *          "editor:themes:title"
    * @private
    */
    private _initEvents;
    /**
     * Graphical rendering of the component
     * (called by constructor)
     *
     * @example
     *  <div class="GPEditorMapBoxContainer" id="GPEditorMapBoxContainer_ID_0">
     *    <div id="GPEditorMapBoxThemesTitle" class="GPEditorMapBoxThemesTitle">Liste des 'thèmes'</div>
     *    <div class="GPEditorMapBoxThemesContainer">
     *      ...
     *    </div>
     *    <div id="GPEditorMapBoxLayersTitle" class="GPEditorMapBoxLayersTitle">Liste des 'couches'</div>
     *    <div class="GPEditorMapBoxLayersContainer">
     *      <div class="GPEditorMapBoxLayerContainer">
     *          <div id="GPEditorMapBoxLayerTitleContainer-0_1" class="GPEditorMapBoxLayerTitleContainer">
     *              <label class="GPEditorMapBoxLayerImageLabel"></label>
     *              <input id="GPEditorMapBoxLayerTitleInput-0_1" class="GPEditorMapBoxLayerTitleInput" type="checkbox">
     *              <label class="GPEditorMapBoxLayerTitleLabel" for="GPEditorMapBoxLayerTitleInput-0_1" title="states">population_lt_2m</label>
     *          </div>
     *      </div>
     *      <div class="GPEditorMapBoxLayerContainer">...</div>
     *      <div class="GPEditorMapBoxLayerContainer">...</div>
     *    </div>
     *  </div>
     * @private
     */
    private _initContainer;
    /**
     * Getting Sprites informations
     * (called by _initialize)
     *
     * @param {String} sprites - url des sprites
     * @returns {Promise} - promise
     * @private
     */
    private _getSprites;
    /**
     * Create Editor
     *
     * @returns {Promise} - promise
     */
    createElement(): Promise<any>;
    /**
     * Set display container (DOM)
     *
     * @param {Boolean} display - show/hidden container
     */
    display(display: boolean): void;
    setContext(key: any, value: any): void;
    getContext(key: any): any;
    /**
     * Get id editor
     * @returns {Number} id
     */
    getID(): number;
    /**
     * Get container (DOM)
     * @returns {HTMLElement} DOM element
     */
    getContainer(): HTMLElement;
    /**
     * Get Style (json)
     * @returns {Object} Style MapBox
     */
    getStyle(): any;
    /**
     * Get layer style (json)
     * @param {Number} i - index
     * @returns {Object} Style MapBox of a layers
     */
    getStyleLayer(i: number): any;
    /**
     * Get layer object from json style
     * @param {Number} i - index into style json
     * @returns {Object} Style MapBox of a layers
     */
    getLayerFromStyle(i: number): any;
    /**
     * Get a list of layer object sorted or not (see options.tools.sort)
     * @returns {Array} - List of layer object
     * @see {ol.style.editor.Layer}
     */
    getLayers(): any[];
    /**
     * Get the layer object from a list sorted or not (see options.tools.sort)
     * @param {Number} i - index
     * @returns {Object} - layer object
     * @see {ol.style.editor.Layer}
     */
    getLayer(i: number): any;
}
//# sourceMappingURL=Editor.d.ts.map