const stringToHTML = (str) => {
    var support = function () {
        if (!window.DOMParser) {
            return false;
        }
        var parser = new DOMParser();
        try {
            parser.parseFromString("x", "text/html");
        } catch (err) {
            return false;
        }
        return true;
    };

    // If DOMParser is supported, use it
    if (support()) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(str, "text/html");
        return doc.body;
    }

    // Otherwise, fallback to old-school method
    var dom = document.createElement("div");
    dom.innerHTML = str;
    return dom;
};

var CatalogDOM = {

    /**
     * Generate an ID from a text
     *
     * @param {String} text - text
     * @returns {String} id - id
     */
    generateID : function (text) {
        return Math.abs(Array.from(text).reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0));
    },

    /**
    * Add uuid to the tag ID
    * @param {String} id - id selector
    * @returns {String} uid - id selector with an unique id
    */
    _addUID : function (id) {
        var uid = (this.uid) ? id + "-" + this.uid : id;
        return uid;
    },

    /**
     * Main container (DOM)
     *
     * @returns {HTMLElement} DOM element
     */
    _createMainContainerElement : function () {
        var container = document.createElement("div");
        container.id = this._addUID("GPcatalog");
        container.className = "GPwidget gpf-widget gpf-widget-button gpf-mobile-fullscreen";
        return container;
    },

    // ################################################################### //
    // ################### Methods of main container ##################### //
    // ################################################################### //

    /**
     * Show Catalog
     *
     * @returns {HTMLElement} DOM element
     */
    _createShowCatalogPictoElement : function () {
        var self = this;

        var button = document.createElement("button");
        // INFO: Ajout d'une SPAN pour enlever des marges de 6px dans CHROMIUM (?!)
        var span = document.createElement("span");
        button.appendChild(span);
        button.id = this._addUID("GPshowCatalogPicto");
        button.classList.add("GPshowOpen", "GPshowAdvancedToolPicto", "GPshowCatalogPicto");
        button.classList.add("gpf-btn", "gpf-btn--tertiary", "gpf-btn-icon", "gpf-btn-icon-catalog");
        // button.classList.add("icon--ri", "icon--ri--map-2-line");
        button.classList.add("fr-btn", "fr-btn--tertiary");
        button.setAttribute("aria-label", "Catalogue de données");
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", false);
        button.setAttribute("type", "button");

        // Close all results and panels when minimizing the widget
        if (button.addEventListener) {
            button.addEventListener("click", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                self.onShowCatalogClick(e);
            });
        } else if (button.attachEvent) {
            button.attachEvent("onclick", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                self.onShowCatalogClick(e);
            });
        }

        return button;
    },

    // ################################################################### //
    // ################### Methods of panel container #################### //
    // ################################################################### //

    /**
     * Create Container Panel
     *
     * @returns {HTMLElement} DOM element
     */
    _createCatalogPanelElement : function () {
        var dialog = document.createElement("dialog");
        dialog.id = this._addUID("GPcatalogPanel");
        dialog.className = "GPpanel gpf-panel fr-modal";

        return dialog;
    },

    /**
     * Container Panel Size
     * @param {*} size - sm, md, lg
     * @returns  {HTMLElement} DOM element
     * @fixme revoir le fonctionnement des tailles !?
     * @description
     * - sm : small (default)
     * - md : medium
     * - lg : large
     * - xl : extra large
     * cf. https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/modale#taille
     */
    _createCatalogPanelDivSizeElement : function (size) {
        if (!size) {
            size = "md";
        }
        var className = "";
        switch (size) {
            case "sm":
                className = "fr-col-8";
                break;
            case "md":
                className = "fr-col-10";
                break;
            case "lg":
                className = "fr-col-12";
                break;
            case "xl":
                className = "fr-col-14";
                break;
            default:
                break;
        }
        var div = document.createElement("div");
        div.className = className;
        return div;
    },

    _createCatalogPanelDivElement : function () {
        var div = document.createElement("div");
        div.className = "gpf-panel__body fr-modal__body";
        return div;
    },

    _createCatalogPanelContentDivElement : function () {
        var div = document.createElement("div");
        div.className = "gpf-panel__content fr-modal__content";
        return div;
    },

    /**
     * Create Header Panel
     *
     * @returns {HTMLElement} DOM element
     */
    _createCatalogPanelHeaderElement : function () {
        var container = document.createElement("div");
        // on n'utilise pas le dsfr !
        container.className = "GPpanelHeader gpf-panel__header_catalog";
        return container;
    },
    _createCatalogPanelTitleElement : function (title) {
        var div = document.createElement("div");
        // on n'utilise pas le dsfr !
        div.className = "GPpanelTitle gpf-panel__title_catalog";
        div.innerHTML = title;
        return div;
    },
    _createCatalogPanelIconElement : function (title) {
        var label = document.createElement("label");
        label.className = "gpf-btn-header-catalog gpf-btn-icon-header-catalog";
        label.title = title;
        return label;
    },
    _createCatalogPanelCloseElement : function () {
        var self = this;

        var btnClose = document.createElement("button");
        btnClose.id = this._addUID("GPcatalogPanelClose");
        btnClose.className = "GPpanelClose GPcatalogPanelClose gpf-btn gpf-btn-icon-close fr-btn--close fr-btn fr-btn--tertiary-no-outline";
        btnClose.title = "Fermer le panneau";

        // Link panel close / visibility checkbox
        if (btnClose.addEventListener) {
            btnClose.addEventListener("click", function () {
                document.getElementById(self._addUID("GPshowCatalogPicto")).click();
                self.onCloseCatalogClick();
            }, false);
        } else if (btnClose.attachEvent) {
            btnClose.attachEvent("onclick", function () {
                document.getElementById(self._addUID("GPshowCatalogPicto")).click();
                self.onCloseCatalogClick();
            });
        }

        var span = document.createElement("span");
        span.className = "GPelementHidden gpf-hidden";
        span.innerText = "Fermer";

        btnClose.appendChild(span);

        return btnClose;
    },

    // ################################################################### //
    // ####################### Methods for panel ######################### //
    // ################################################################### //

    _createCatalogContentDivElement : function () {
        var container = stringToHTML(`<div class="catalog-container-content" style=""></div>`);
        return container.firstChild;
    },
    _createCatalogContentTitleElement : function (title) {
        var container = stringToHTML(`
        <!-- titre -->
        <div class="catalog-container-title">
            <div class="fr-title">
                <h5 style="margin:unset">${title}</h5>
            </div>
        </div>
        `);
        return container.firstChild;
    },
    _createCatalogContentSearchGlobalElement : function (label) {
        var strContainer = `
        <!-- barre de recherche globale -->
        <!-- https://www.systeme-de-design.gouv.fr/composants-et-modeles/composants/barre-de-recherche -->
        <div class="catalog-container-search-global" style="padding:10px;">
            <div class="fr-search-bar" id="catalog-header-search-global" role="search" style="justify-content: center;">
                <label class="fr-label" for="catalog-input-search-global">
                    Recherche
                </label>
                <div class="input-wrapper" style="width:100%;">
                    <input class="fr-input" placeholder="${label}" type="text" id="catalog-input-search-global" name="search-input" incremental>
                    <button type="button" id="catalog-button-reset-search-global" class="clear-btn" aria-label="Effacer le texte">
                        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-opacity="0.8"/>
                            <line x1="6" y1="6" x2="14" y2="14"/>
                            <line x1="14" y1="6" x2="6" y2="14"/>
                        </svg>
                    </button>
                </div>
                <button id="catalog-button-search-global" class="fr-btn" title="${label}">
                    Rechercher
                </button>
            </div>
        </div>
        `;
        var container = stringToHTML(strContainer);

        // ajout du shadow DOM pour creer les listeners
        const shadow = container.attachShadow({ mode : "open" });
        shadow.innerHTML = strContainer.trim();

        // event listener sur le DOM
        var button = shadow.getElementById("catalog-button-search-global");
        if (button) {
            button.addEventListener("click", (e) => {
                e.target.value = input.value; // synchronisation
                this.onSearchGlobalCatalogButtonClick(e);
            });
        }

        var reset = shadow.getElementById("catalog-button-reset-search-global");
        if (reset) {
            reset.addEventListener("click", (e) => {
                input.value = ""; // synchronisation
                this.onSearchGlobalCatalogButtonResetClick(e);
            });
        }

        var input = shadow.getElementById("catalog-input-search-global");
        if (input) {
            input.addEventListener("input", (e) => {
                // on n'active la recherche que si le texte fait plus de 2 caractères
                if (e.target.value.length < 3 && e.target.value.length > 0) {
                    return;
                }
                this.onSearchGlobalCatalogInputChange(e);
            });
        }

        return shadow;
    },
    /**
     * Create Waiting Panel
     *
     * @returns {HTMLElement} DOM element
     */
    _createCatalogWaitingElement : function () {
        var div = document.createElement("div");
        div.id = this._addUID("GPcatalogCalcWaitingContainer");
        // /* GPwaitingContainer */
        // /* gpf-waiting */
        div.className = "GPwaitingContainerHidden gpf-waiting--hidden";

        var p = document.createElement("p");
        p.className = "GPwaitingContainerInfo gpf-waiting_info";
        p.innerHTML = "Recherche en cours...";

        div.appendChild(p);

        return div;
    },
    /**
     * Create Catalog Content Categories Tabs
     * 
     * @param {Categories} categories - categories to create tabs
     * @returns {HTMLElement} DOM element
     * @description
     * - create the tabs for categories
     * - each tab has a button to select the category
     * - each tab has a panel with subcategories (if any)
     * - each subcategory has a radio button to select it
     * - each subcategory has a panel with layers
     */
    _createCatalogContentCategoriesTabs : function (categories) {
        // les onglets
        var strCategoriesTabButtons = "";
        var tmplCategoryTabButton = (i, id, title, selected) => {
            var className = "GPtabButton fr-tabs__tab";
            var value = "false";
            var tabindex = -1;
            if (selected) {
                className = "GPtabButton GPtabButtonActive fr-tabs__tab";
                value = "true";
                tabindex = 0;
            }
            // le listener sur le bouton permet de récuperer à partir de l'ID la catégorie (id) :
            // > "tabbutton-${i}_${id}".split('_')[1]
            // et l'attribut 'aria-controls' permet de retrouver le panneau du contenu
            return `
            <li class="GPtabList" role="presentation">
                <button 
                    id="tabbutton-${i}_${id}" 
                    class="${className}" 
                    data-category="${id}"
                    tabindex="${tabindex}" 
                    role="tabbutton" 
                    aria-selected="${value}" 
                    aria-controls="tabpanel-${i}-panel_${id}">
                    ${title}
                </button>
            </li>
            `;
        };
        // INFO
        // on crée une barre de recherche spécifique à la catégorie
        //   - activée (add('fr-tabs__panel--selected') si la catégorie a l'option search=true,
        //   - sinon cachée par defaut (remove('fr-tabs__panel--selected'))
        // l'activation/désactivation est gérée dans le listener de l'onglet
        // cf. this.onSelectCatalogTabClick
        var tmplSearchSpecificBar = (active, title) => {
            var className = "gpf-hidden";
            if (active) {
                className = "fr-tabs__panel--selected";
            }                
            return `
            <!-- barre de recherche spécifique à la catégorie -->
            <div id="catalog-container-search-specific" class="fr-tabs__list ${className}" style="padding:10px;justify-content:center;">
                <div class="fr-search-bar" id="catalog-header-search-specific" role="search" style="width:100%;">
                    <label class="fr-label" for="catalog-input-search-specific">
                        Recherche dans la catégorie
                    </label>
                    <div class="input-wrapper" style="width:100%">
                        <input class="fr-input" placeholder="${title}" type="text" id="catalog-input-search-specific" name="search-input-specific" incremental>
                        <button type="button" id="catalog-button-reset-search-specific" class="clear-btn" aria-label="Effacer le texte">
                            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-opacity="0.8"/>
                                <line x1="6" y1="6" x2="14" y2="14"/>
                                <line x1="14" y1="6" x2="6" y2="14"/>
                            </svg>
                        </button>
                    </div>
                    <button id="catalog-button-search-specific" class="fr-btn" title="${title}">
                        Rechercher
                    </button>
                </div>
            </div>
            `;
        };
        // une sous catégorie
        var tmplSubCategoryRadio = (id, subcategory) => {
            var checked = (subcategory.default) ? "checked" : "";
            return `
            <div class="fr-fieldset__element fr-fieldset__element--inline">
                <div class="fr-radio-group fr-radio-group--sm">
                    <input 
                        type="radio" 
                        ${checked} 
                        id="radio-inline_${subcategory.id}" 
                        data-category="${subcategory.id}"
                        name="radio-inline-${id}" 
                        role="radio-inline-section"
                        aria-controls="tabcontent-${subcategory.id}">
                    <label class="fr-label" for="radio-inline_${subcategory.id}">
                        ${subcategory.title}
                    </label>
                </div>
            </div>
            `;
        };
        // les sous catégories
        var tmplSubCategoriesRadios = (id, subcategories) => {
            // chaque sous categories à son propre container de couches
            // et son bouton radio de groupe
            var strTabContents = "";
            var strSubCategoriesRadios = "";
            for (let j = 0; j < subcategories.length; j++) {
                const subcategory = subcategories[j];
                strSubCategoriesRadios += tmplSubCategoryRadio(id, subcategory);
                var hidden = "";
                if (!subcategory.default) {
                    hidden = "GPelementHidden gpf-hidden";
                }
                strTabContents += `<div class="tabcontent ${hidden}" data-category="${id}" role="tabpanel-section" id="tabcontent-${subcategory.id}"></div>`;
            }
            return `
            <!-- boutons radio des sous categories -->
            <fieldset class="fr-fieldset" id="radio-inline_${id}" aria-labelledby="radio-inline-legend radio-inline-messages" style="margin:unset;">
                ${strSubCategoriesRadios}
                <div class="fr-messages-group" id="radio-inline-messages" aria-live="assertive"></div>
            </fieldset>
            <!-- panneaux des sous categories -->
            ${strTabContents}
            `;
        };
        // le panneau de chaque catégorie 
        // avec calcul de la hauteur en fonction de la barre de recherche specifique
        var strCategoriesTabPanelContents = "";
        var tmplCategoryTabPanelContent = (i, id, selected, search, subcategories, active) => {
            var className = "GPtabContent fr-tabs__panel";
            var tabindex = -1;
            if (selected) {
                className = "GPtabContent GPtabContentSelected fr-tabs__panel fr-tabs__panel--selected";
                tabindex = 0;
            }
            // on crée un panneau vide
            var strTabContent = `<div class=\"tabcontent\" data-category="${id}" style=\"content-visibility: auto;contain-intrinsic-size:50px;\"></div>`;
            if (subcategories) {
                // sauf si la catégorie a des sous catégories
                strTabContent = tmplSubCategoriesRadios(id, subcategories);
            }
            // INFO
            // le max height est fixé à 250px pour éviter que le panneau soit trop grand
            // mais il faudrait pouvoir le configurer dynamiquement en fonction de la presence
            // ou non de la barre de recherche spécifique qui decale le panneau vers le bas
            // cf. var tabHeight dans le main container
            var height = "330px";
            if (active && !search) {
                height = "390px";
            }
            return `
            <!-- panneaux -->
            <div id="tabpanel-${i}-panel_${id}" 
                class="${className}" 
                role="tabpanel" 
                aria-labelledby="tabbutton-${i}_${id}" 
                tabindex="${tabindex}" 
                style="max-height: ${height};overflow-y: auto; padding: 1em; contain: content;">
                ${strTabContent}
            </div>
            `;
        };
        // INFO
        // il faut determiner si la barre de recherche est active ou non
        var currentActiveBar = false;
        var hasActiveBar = false;
        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            // on vérifie si une catégorie a l'option search=true
            if (category.search) {
                hasActiveBar = true;
            }
            if (category.default && category.search) {
                // si la catégorie par defaut a l'option search=true, on doit activer la barre de recherche spécifique
                // à l'ouverture du contrôle
                currentActiveBar = true;
            }
        }
        // INFO
        // création des onglets
        // un barre de recherche spécifique à la catégorie est positionnée par défaut (hidden)
        // et elle sera activée si la catégorie a l'option search=true
        // chaque catégorie a son propre onglet
        // et son propre panneau de contenu
        // chaque panneau de contenu a des sous catégories (ou pas)
        for (let j = 0; j < categories.length; j++) {
            const category = categories[j];
            strCategoriesTabButtons += tmplCategoryTabButton(j, category.id, category.title, category.default);
            strCategoriesTabPanelContents += tmplCategoryTabPanelContent(j, category.id, category.default, category.search, category.items, hasActiveBar);
        }
        // on ajoute la barre de recherche spécifique à la catégorie
        const titleSpecifBar = "Rechercher une donnée dans la catégorie";
        var strSearchSpecificBar = tmplSearchSpecificBar(currentActiveBar, titleSpecifBar);
        // FIXME 
        // le calcul de la hauteur est realisé à la main pour pallier le manque de JS DSFR (?)
        // style="--tabs-height: 294px;"
        var tabHeight = "369px"; // par defaut
        if (hasActiveBar) {
            tabHeight = "434px"; // si la barre de recherche spécifique est active
        }
        var strContainer = `
        <!-- onglets -->
        <div id="GPcatalogContainerTabs" class="catalog-container-tabs">
            <div class="GPtabs fr-tabs" style="--tabs-height: ${tabHeight};">
                <ul class="GPtabsList fr-tabs__list" role="tablist" aria-label="presentation">
                    ${strCategoriesTabButtons}
                </ul>
                ${strSearchSpecificBar}
                ${strCategoriesTabPanelContents}
            </div>
        </div>
        `;
        var container = stringToHTML(strContainer.trim());

        // ajout du shadow DOM pour creer les listeners
        const shadow = container.attachShadow({ mode : "open" });
        shadow.innerHTML = strContainer.trim();

        // event listener sur le DOM
        var panelSections = shadow.querySelectorAll("[role=\"tabpanel-section\"]");
        var radios = shadow.querySelectorAll("[role=\"radio-inline-section\"]");
        if (radios) {
            radios.forEach((radio) => {
                radio.addEventListener("change", (e) => {
                    for (let j = 0; j < panelSections.length; j++) {
                        const section = panelSections[j];
                        var category = section.getAttribute("data-category");
                        if (category === e.target.name.split("-")[2]) {
                            section.classList.add("gpf-hidden");
                            section.classList.add("GPelementHidden");
                        }
                    }
                    var panel = document.getElementById(e.target.getAttribute("aria-controls"));
                    panel.classList.remove("gpf-hidden");
                    panel.classList.remove("GPelementHidden");
                    this.onToggleCatalogRadioChange(e, e.target.getAttribute("data-category"));
                });
            });
        }
        var panelContents = shadow.querySelectorAll("[role=\"tabpanel\"]");
        var buttons = shadow.querySelectorAll("[role=\"tabbutton\"]");
        if (buttons) {
            buttons.forEach((btn) => {
                btn.addEventListener("click", (e) => {
                    // gestion de l'affichage

                    // modifier les autres buttons :
                    //   tabindex=-1
                    //   aria-selected=false
                    for (let i = 0; i < buttons.length; i++) {
                        const button = buttons[i];
                        button.setAttribute("tabindex", -1);
                        button.ariaSelected = false;
                        button.classList.remove("GPtabButtonActive");
                    }
                    // modif tabindex=0
                    e.target.setAttribute("tabindex", 0);
                    // modif aria-selected=true
                    e.target.ariaSelected = true;
                    e.target.classList.add("GPtabButtonActive");
                    // modifier les autres panneaux :
                    //   supp class fr-tabs__panel--selected
                    //   modif tabindex=-1
                    for (let j = 0; j < panelContents.length; j++) {
                        const panel = panelContents[j];
                        panel.setAttribute("tabindex", -1);
                        panel.classList.remove("fr-tabs__panel--selected");
                        panel.classList.remove("GPtabContentSelected");
                        panel.classList.add("gpf-hidden");
                        panel.classList.add("GPelementHidden");
                    }
                    // recup id du panneau avec aria-controls
                    //   ajouter class fr-tabs__panel--selected
                    //   modif tabindex=0
                    var panel = document.getElementById(e.target.getAttribute("aria-controls"));
                    panel.setAttribute("tabindex", 0);
                    panel.classList.add("fr-tabs__panel--selected");
                    panel.classList.add("GPtabContentSelected");
                    panel.classList.remove("gpf-hidden");
                    panel.classList.remove("GPelementHidden");
                    // appel
                    this.onSelectCatalogTabClick(e, e.target.getAttribute("data-category") );
                });
            });
        }
        var searchBtn = shadow.getElementById("catalog-button-search-specific");
        if (searchBtn) {
            searchBtn.addEventListener("click", (e) => {
                e.target.value = searchInput.value; // synchronisation
                this.onSearchSpecificCatalogButtonClick(e);
            });
        }
        var resetBtn = shadow.getElementById("catalog-button-reset-search-specific");
        if (resetBtn) {
            resetBtn.addEventListener("click", (e) => {
                searchInput.value = ""; // synchronisation
                this.onSearchSpecificCatalogButtonResetClick(e);
            });
        }

        var searchInput = shadow.getElementById("catalog-input-search-specific");
        if (searchInput) {
            searchInput.addEventListener("input", (e) => {
                // on n'active la recherche que si le texte fait plus de 2 caractères
                if (e.target.value.length < 3 && e.target.value.length > 0) {
                    return;
                }
                this.onSearchSpecificCatalogInputChange(e);
            });
        }

        return shadow;
    },
    /**
     * Create Catalog Content Category Tab Content (layers)
     *
     * @param {Categories} category - category to create tab content
     * @param {*} layersFiltered - filtered layers for the category
     * @param {Boolean} nodata - do not write the data to the DOM
     * @returns {HTMLElement} DOM element
     * @description
     * - create the content for a category tab
     * - each layer has a checkbox to select it
     * - each layer has a panel with information
     */
    _createCatalogContentCategoryTabContent : async function (category, layersFiltered, nodata) {
        var layers = Object.values(layersFiltered).sort((a, b) => a.title.localeCompare(b.title, "fr", { sensitivity : "base" })); // object -> array
        const batchSize = 10; // nombre d'éléments à traiter par lot
        var blocks = [];

        var strElements = "";
        var tmplElement = (i, name, title, service, description, informations, thumbnail, categoryId) => {
            // ajout de la vignette si elle existe
            // le thumbnail est optionnel
            var tmplThumbnail = (thumbnail) => {
                if (thumbnail) {
                    // si thumbnail est une URL ou une data URI
                    // ex. data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIA...
                    // ex. https://...
                    // on utilise la vignette fournie
                    if (thumbnail.startsWith("data:") || thumbnail.startsWith("http")) {
                        return `
                        <div class="catalog-thumbnail" style="width:50px; height:50px; margin-right:10px; flex-shrink:0; display:flex; align-items:center; justify-content:center; overflow:hidden;">
                            <img src="${thumbnail}" alt="Aperçu de la couche" style="min-width:100%;min-height:100%;object-fit:cover;"/>
                        </div>
                        `;
                    } else {
                        // TODO
                        // sinon, on considère que c'est une URL relative
                        // ex. img/thumbnail.png
                        thumbnail = "default";
                    }
                    // si thumbnail = "default", on utilise l'icone par defaut
                    if (thumbnail === "default") {
                        return `<div class="catalog-thumbnail-default" style="width:50px; height:50px; margin-right:10px; flex-shrink:0; display:flex; align-items:center; justify-content:center; overflow:hidden;"></div>`;
                    }
                }
                return "";
            };
            // par defaut, on prend le 1er producteur
            var producerName = informations.producers ? informations.producers[0].name : "";
            // on affiche tous les producteurs sous forme de tag
            // ex. producers : [{name,url},{name,url},...]
            var tmplProducers = (producers) => {
                if (!producers) {
                    return ``;
                }
                var data = "";
                for (let i = 0; i < producers.length; i++) {
                    const producer = producers[i];
                    data += `
                        <a href="${producer.url}" target="_blank" class="fr-tag fr-tag--sm fr-icon-arrow-right-line fr-tag--icon-left">
                            ${producer.name}
                        </a>
                    `;
                }
                return data;
            };
            // on a une liste de metadonnées, mais on affiche uniquement
            // la métadonnée de donnée
            // ex. metadatas : [url,url,...]
            var tmplMetadatas = (metadatas) => {
                if (!metadatas) {
                    return ``;
                }
                var data = "";
                for (let i = 0; i < metadatas.length; i++) {
                    const metadata = metadatas[i];
                    if (metadata.includes("catalogue/dataset")) {
                        return `
                            <a href="${metadata}" target="_blank" class="fr-link fr-icon-arrow-right-line fr-link--icon-right">
                                Voir la fiche détaillée
                            </a>
                        `;
                    }
                }
                return data;
            };
            // INFO
            // informations non utilisées
            // ex. thematics : [{name,url},{name,url},...]
            var tmplThematics = (thematics) => {
                if (!thematics) {
                    return ``;
                }
                var data = "";
                for (let i = 0; i < thematics.length; i++) {
                    const thematic = thematics[i];
                    data += `
                        <a href="${thematic.url}" target="_blank" class="fr-tag fr-tag--sm fr-icon-arrow-right-line fr-tag--icon-left">
                            ${thematic.name}
                        </a>
                    `;
                }
                return data;
            };

            return `
            <div 
                class="fr-fieldset__element" 
                id="fieldset-${categoryId}_${name}-${service}"
                style="contain: content;">
                <div class="fr-checkbox-group gpf-flex" style="justify-content:flex-start;padding-top:5px;padding-bottom:5px;box-shadow: inset 0 1px 0 0 var(--border-default-grey),0 0 0 0 var(--border-default-grey);">
                    <input
                        class="fr-input"
                        name="checkboxes-${categoryId}"
                        id="checkboxes-${categoryId}-${i}_${name}-${service}"
                        type="checkbox"
                        data-layer="${name}:${service}"/>
                    <label 
                        for="checkboxes-${categoryId}-${i}_${name}-${service}"
                        style="position: relative; bottom: 12px;">
                    </label>
                    <div class="catalog-thumbnail-container" style="">
                        ${tmplThumbnail(thumbnail)}
                    </div>
                    <div style="width: 100%;">
                        <label 
                            class="GPlabelActive fr-label"
                            role="label-collapse-more-${categoryId}"
                            aria-controls="catalog-collapse-more-${i}-${categoryId}"
                            title="${title}"
                            style="display: -webkit-box; width: 100%; text-overflow: ellipsis; overflow: hidden; white-space: normal; cursor: pointer; line-height: 1.9em; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
                            ${title}
                        </label>
                        <span class="GPlabelActive fr-label fr-hint-text">${producerName}</span>
                    </div>
                    <button 
                        id="catalog-collapse-more-${i}-${categoryId}"
                        role="button-collapse-more-${categoryId}"
                        class="catalog-collapse-show gpf-btn gpf-btn-icon gpf-btn-icon-catalog-collapse fr-btn fr-btn--tertiary gpf-btn--tertiary" 
                        type="button" 
                        title="En savoir plus sur la couche" 
                        tabindex="0" 
                        aria-pressed="false"
                        aria-controls="catalog-info-more-${i}-${categoryId}"
                        style="position: relative;">
                    </button>
                </div>
                <div class="gpf-hidden" id="catalog-info-more-${i}-${categoryId}">
                    <p>
                        <span class="fr-label fr-message" style="word-break: break-all;">${name} - ${service}</span>
                        ${tmplProducers(informations.producers)}
                    </p>
                    <p>
                        ${description}
                    </p>
                    ${tmplMetadatas(informations.metadatas)}
                </div>
            </div>
            `;
        };

        var strSections = "";
        var tmplSection = (id, categoryId, title, icon, count, data) => {
            // INFO
            // - on propose un compteur de couches
            // - on ajoute un bouton pour ouvrir/fermer la section
            // - on ajoute un icone avant le titre de la section (optionnel)
            // - par defaut, les sections sont fermées
            // - on n'utilise pas le composant DSFR "fr-accordion"
            // - ...
            var classNameIcon = (icon && icon.startsWith("fr-icon")) ? icon : "";
            var idCollapseSection = `section-accordion-${categoryId}-${id}`;
            return `
            <!-- section -->
            <section 
                id="section-${categoryId}-${id}" 
                data-category="${categoryId}"
                data-id="${id}"
                class="fr-accordion" style="contain: content;">
                <h3 class="fr-accordion__title">
                    <button class="GPcatalogButtonSection fr-accordion__btn gpf-accordion__btn" role="section-collapse-${categoryId}" aria-expanded="false" aria-controls="${idCollapseSection}">
                        <span class="GPshowCatalogAdvancedTools gpf-hidden"></span>
                        <span class="catalog-section-icon ${classNameIcon}" role="section-icon-collapse-${categoryId}" style="width: calc(100% - 2rem);">${title}</span>
                        <span class="catalog-section-count" role="section-count-collapse-${categoryId}" id="section-count-${categoryId}-${id}" style="position: absolute; right: 1.25rem;">${count}</span>
                    </button>
                </h3>
                <div class="fr-collapse GPelementHidden" id="${idCollapseSection}">
                    ${data}
                </div>
            </section>
            `;
        };

        // INFO
        // les couches par catégorie sont filtrées au préalable
        // on ajoute la repartition des couches par section (regroupement) !
        var isSection = category.section;
        if (isSection) {
            // on procède à un tri
            // ex. tri sur le champ 'thematic'
            layers = layers.sort((a, b) => {
                return a[category.filter.field][0].localeCompare(b[category.filter.field][0]);
            });
        }

        var sections = {};
        // regroupement par sections (ou pas) sur les couches
        var lstElements = [];
        for (let i = 0; i < layers.length; i += batchSize) {
            for (let j = i; j < Math.min(i + batchSize, layers.length); j++) {
                const layer = layers[j];
                const infos = {
                    producers : layer.producer_urls, // tableau d'objets [{name,url}]
                    thematics : layer.thematic_urls, // tableau d'objets [{name,url}]
                    metadatas : layer.metadata_urls  // tableau
                };
                var strElement = tmplElement(j, layer.name, layer.label, layer.service, layer.description, infos, layer.thumbnail, category.id);
                // INFO
                // a t on des sections (regroupements) ?
                // - oui, si elle correspond au filtre, on ajoute la couche dans la section
                //   sinon, on ecarte cette couche (normalement, dans la section "Autres")
                // - non, on ajoute directement la couche dans la sous categorie
                if (isSection) {
                    var value = layer[category.filter.field];
                    if (Array.isArray(value)) {
                        // FIXME on ne gère que le premier élément du tableau
                        // ex. thematics : ["Réseau routier", "Transport"]
                        value = value[0];
                    }
                    if (value) {
                        if (!sections.hasOwnProperty(value)) {
                            sections[value] = "";
                        }
                        sections[value] += strElement;
                    } else {
                        // au cas où...
                        if (!sections.hasOwnProperty("Autres")) {
                            sections["Autres"] = "";
                        }
                        sections["Autres"] += strElement;
                    }
                } else {
                    strElements += strElement;
                    lstElements.push(strElement);
                }
            }
            // Pause pour laisser respirer l'UI
            await new Promise(resolve => setTimeout(resolve, 0));
        }

        if (strElements !== "") {
            var container = stringToHTML(strElements);
            const shadow = container.attachShadow({ mode : "open" });
            shadow.innerHTML = strElements.trim();
            blocks.push({
                domid : `checkboxes-${category.id}`,
                rows : lstElements,
                fragment : shadow,
                debug : {
                    type : "layers",
                    desc : "liste des couches pour une categorie",
                    title : category.title
                }
            });
            if (nodata) {
                strElements = "";
            }
        }

        if (isSection) {
            category.sections = [];
            // creation des sections de regroupement
            // et ajout des couches dans les sections
            for (const title in sections) {
                if (Object.prototype.hasOwnProperty.call(sections, title)) {
                    const data = sections[title];
                    var lstElementsBySection = [];
                    var array = [...data.matchAll(/"fr-fieldset__element"/g)];
                    for (let index = 0; index < array.length; index++) {
                        const el = array[index];
                        lstElementsBySection.push(el.input);
                    }
                    var count = array.length;
                    var id = this.generateID(title);
                    var icon = "";
                    if (category.icon && category.iconJson) {
                        // on cherche l'icone dans le json
                        const found = category.iconJson.find(obj => obj.name === title);
                        if (found) {
                            icon = found.icon;
                        } else {
                            icon = "fr-icon-folder-2-fill"; // icone par defaut !
                        }
                    }
                    var strSection = tmplSection(id, category.id, title, icon, count, (nodata) ? "" : data);
                    strSections += strSection;

                    // DEBUG
                    // on enregistre les valeurs des sections dans l'objet category
                    category.sections.push(title);

                    if (strSection !== "") {
                        var container = stringToHTML(data);
                        const shadow = container.attachShadow({ mode : "open" });
                        shadow.innerHTML = data.trim();
                        blocks.push({
                            domid : `section-accordion-${category.id}-${id}`,
                            rows : lstElementsBySection,
                            fragment : shadow,
                            debug : {
                                type : "section",
                                desc : "liste des couches pour une section",
                                title : title,
                                id : id,
                                category : category.id
                            }
                        });
                    }
                }
            }
        }

        var strContainer = `
            <!-- liste de données -->
            <div class="fr-accordions-group" 
                id="checkboxes-${category.id}" 
                data-category="${category.id}"
                data-sections="${strSections ? true : false}"
                aria-labelledby="checkboxes-legend checkboxes-messages"
                style="contain: content;">
                ${strSections || strElements}
            </div>
        `;
        var container = stringToHTML(strContainer);

        // ajout du shadow DOM pour creer les listeners
        const shadow = container.attachShadow({ mode : "open" });
        shadow.innerHTML = strContainer.trim();

        return {
            dom : shadow,
            blocks : blocks
        };
    },

    /**
     * Update DOM listeners
     * @param {HTMLElement} content - ...
     * @param {String} id  - ...
     */
    _updateListenersLayersDOM : function (content, id) {
        // on met à jour les listeners sur les couches
    
        // selection d'une couche
        var inputName = `checkboxes-${id}`;
        var inputs = content.querySelectorAll("[name=" + "\"" + inputName + "\"]");
        if (inputs) {
            inputs.forEach((input) => {
                input.addEventListener("click", (e) => {
                    // appel gestionnaire d'evenement pour traitement :
                    // - ajout ou pas de la couche à la carte
                    // - envoi d'un evenement avec la conf tech
                    this.onSelectCatalogEntryClick(e);
                });
            });
        }
        // ouverture d'une sous section ex. theme routier
        var buttonName = `section-collapse-${id}`;
        var buttons = content.querySelectorAll("[role=" + "\"" + buttonName + "\"]");
        if (buttons) {
            buttons.forEach((button) => {
                button.addEventListener("click", (e) => {
                    e.target.ariaExpanded = !(e.target.ariaExpanded === "true");
                    var collapseId = e.target.getAttribute("aria-controls");
                    var collapse = document.getElementById(collapseId);
                    if (!collapse) {
                        return;
                    }
                    var sectionId = collapseId.replace("section-accordion", "section");
                    var section = document.getElementById(sectionId);
                    var categoryId = (section) ? section.dataset.category : null;
                    if (e.target.ariaExpanded === "true") {
                        collapse.classList.add("fr-collapse--expanded");
                        collapse.classList.remove("GPelementHidden");
                        if (section) {
                            section.classList.add("catalog-section-full");
                            this.updateVisibilitySectionsByCategory(sectionId, categoryId, false);
                        }
                        // scroll auto sur le bouton cliqué (dsfr oblige de passer par scrollTop sur le container au lieu de scrollIntoView)
                        const container = button.closest("div[id^=\"tabpanel-\"]");
                        const buttonRect = button.getBoundingClientRect();
                        const containerRect = container.getBoundingClientRect();
                        const offset = buttonRect.top - containerRect.top;

                        container.scrollTo({
                            top : container.scrollTop + offset,
                            behavior : "smooth"
                        });
                    } else {
                        collapse.classList.remove("fr-collapse--expanded");
                        collapse.classList.add("GPelementHidden");
                        if (section) {
                            section.classList.remove("catalog-section-full");
                            this.updateVisibilitySectionsByCategory(sectionId, categoryId, true);
                        }
                    }
                    this.onToggleCatalogSectionClick(e, categoryId, collapseId);
                }, false);
            });
        }

        // ouverture du menu "En savoir plus" d'une couche
        var buttonNameMore = `button-collapse-more-${id}`;
        var buttonsMore = content.querySelectorAll("[role=" + "\"" + buttonNameMore + "\"]");
        if (buttonsMore) {
            buttonsMore.forEach((button) => {
                button.addEventListener("click", (e) => {
                    e.target.ariaPressed = !(e.target.ariaPressed === "true");
                    var collapse = document.getElementById(e.target.getAttribute("aria-controls"));
                    if (!collapse) {
                        return;
                    }
                    if (e.target.ariaPressed === "true") {
                        collapse.classList.add("gpf-visible");
                        collapse.classList.remove("gpf-hidden");
                        // scroll auto sur le bouton cliqué (dsfr oblige de passer par scrollTop sur le container au lieu de scrollIntoView)
                        button.closest("div[id^=\"tabpanel-\"]");
                        const container = button.closest("div[id^=\"tabpanel-\"]");
                        const buttonRect = button.getBoundingClientRect();
                        const containerRect = container.getBoundingClientRect();
                        const offset = buttonRect.top - containerRect.top;

                        container.scrollTo({
                            top : container.scrollTop + offset,
                            behavior : "smooth"
                        });
                    } else {
                        collapse.classList.remove("gpf-visible");
                        collapse.classList.add("gpf-hidden");
                    }
                    // appel gestionnaire d'evenement pour traitement :
                    // - afficher les infos de la rubrique "En savoir plus"
                    this.onToggleCatalogMoreLearnClick(e);
                }, false);
            });
        }

        var labelNameMore = `label-collapse-more-${id}`;
        var labelsMore = content.querySelectorAll("[role=" + "\"" + labelNameMore + "\"]");
        if (labelsMore) {
            labelsMore.forEach((label) => {
                label.addEventListener("click", (e) => {
                    var button = document.getElementById(e.target.getAttribute("aria-controls"));
                    if (!button) {
                        return;
                    }
                    button.click();
                }, false);
            });
        }

        // ouverture d'une sous section ex. theme routier
        // sur le clic de l'icone
        // pour faciliter l'ouverture de la section
        var spanIconName = `section-icon-collapse-${id}`;
        var spanIcons = content.querySelectorAll("[role=" + "\"" + spanIconName + "\"]");
        if (spanIcons) {
            spanIcons.forEach((span) => {
                span.addEventListener("click", (e) => {
                    e.target.parentElement.click();
                });
            });
        }
        // ouverture d'une sous section ex. theme routier
        // sur le clic du compteur de couches
        // pour faciliter l'ouverture de la section
        var spanCountName = `section-count-collapse-${id}`;
        var spanCounts = content.querySelectorAll("[role=" + "\"" + spanCountName + "\"]");
        if (spanCounts) {
            spanCounts.forEach((span) => {
                span.addEventListener("click", (e) => {
                    e.target.parentElement.click();
                });
            });
        }
    },

    updateVisibilitySectionsByCategory (sectionId, categoryId, visible) {
        // rendre les sections visibles ou non de la sous-categorie
        var selector = `[id^="section-${categoryId}-"]`;
        var sections = document.querySelectorAll(selector);
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            if (section.id === sectionId) {
                continue;
            }
            if (visible) {
                var idCount = `section-count-${categoryId}-${section.getAttribute("data-id")}`;
                var countDom = document.getElementById(idCount);
                var count = parseInt(countDom.textContent, 10);
                if (count === 0) {
                    continue;
                }
                section.classList.remove("gpf-hidden");
                section.classList.remove("GPelementHidden");
            } else {
                section.classList.add("gpf-hidden");
                section.classList.add("GPelementHidden");
            }
        }
    }

};

export default CatalogDOM;
