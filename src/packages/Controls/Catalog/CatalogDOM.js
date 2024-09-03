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
     * @returns {DOMElement} DOM element
     */
    _createMainContainerElement : function () {
        var container = document.createElement("div");
        container.id = this._addUID("GPcatalog");
        container.className = "GPwidget gpf-widget gpf-widget-button";
        return container;
    },

    // ################################################################### //
    // ################### Methods of main container ##################### //
    // ################################################################### //

    /**
     * Show Catalog
     *
     * @returns {DOMElement} DOM element
     */
    _createShowCatalogPictoElement : function () {
        var self = this;

        var button = document.createElement("button");
        button.id = this._addUID("GPshowCatalogPicto");
        button.className = "GPshowOpen GPshowAdvancedToolPicto GPshowCatalogPicto gpf-btn gpf-btn-icon gpf-btn-icon-catalog fr-btn";
        button.title = "Catalogue de données";
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", false);
        button.setAttribute("type", "button");

        // Close all results and panels when minimizing the widget
        if (button.addEventListener) {
            button.addEventListener("click", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                self.onShowCatalogClick();
            });
        } else if (button.attachEvent) {
            button.attachEvent("onclick", function (e) {
                var status = (e.target.ariaPressed === "true");
                e.target.setAttribute("aria-pressed", !status);
                self.onShowCatalogClick();
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
     * @returns {DOMElement} DOM element
     */
    _createCatalogPanelElement : function () {
        var dialog = document.createElement("dialog");
        dialog.id = this._addUID("GPcatalogPanel");
        dialog.className = "GPpanel gpf-panel fr-modal";

        return dialog;
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
     * @returns {DOMElement} DOM element
     */
    _createCatalogPanelHeaderElement : function () {
        var container = document.createElement("div");
        container.className = "gpf-panel__header fr-modal__header";
        return container;
    },
    _createCatalogPanelTitleElement : function (title) {
        var div = document.createElement("div");
        div.className = "gpf-panel__title fr-modal__title fr-pt-4w";
        div.innerHTML = title;
        return div;
    },
    _createCatalogPanelCloseElement : function () {
        var self = this;

        var btnClose = document.createElement("button");
        btnClose.className = "gpf-btn gpf-btn-icon-close fr-btn--close fr-btn fr-btn--tertiary-no-outline fr-m-1w";
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
        span.className = "GPelementHidden gpf-visible"; // afficher en dsfr
        span.innerText = "Fermer";

        btnClose.appendChild(span);

        return btnClose;
    },

    // ################################################################### //
    // ####################### Methods for panel ######################### //
    // ################################################################### //
    
    _createCatalogContentDivElement : function () {
        var container = stringToHTML(`<div class="catalog-container-content" style="padding:10px"></div>`);
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
    _createCatalogContentSearchElement : function () {
        var strContainer = `
        <!-- barre de recherche -->
        <!-- https://www.systeme-de-design.gouv.fr/composants-et-modeles/composants/barre-de-recherche -->
        <div class="catalog-container-search" style="padding-top:10px;padding-bottom:20px">
            <div class="fr-search-bar" id="header-search" role="search">
                <label class="fr-label" for="search-input">
                    Recherche
                </label>
                <input class="fr-input" placeholder="Rechercher" type="search" id="search-input" name="search-input">
                <button id="search-button" class="fr-btn" title="Rechercher">
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
        var button = shadow.getElementById("search-button");
        if (button) {
            button.addEventListener("click", (e) => {
                this.onSearchCatalogButtonClick(e);
            });
        }

        var input = shadow.getElementById("search-input");
        if (input) {
            input.addEventListener("search", (e) => {
                this.onSearchCatalogInputChange(e);
            });
        }

        return shadow;
    },
    /**
     * Create Waiting Panel
     *
     * @returns {DOMElement} DOM element
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
    _createCatalogContentCategoriesTabs : function (categories) {
        var strTabButtons = "";
        var tmplTabButton = (i, id, title, selected) => {
            var value = "false";
            var tabindex = -1;
            if (selected) {
                value = "true";
                tabindex = 0;
            }
            // le listener sur le bouton permet de récuperer à partir de l'ID la catégorie (id) : 
            // > "tabbutton-${i}_${id}".split('_')[1]
            // et l'attribut 'aria-controls' permet de retrouver le panneau du contenu
            return `
            <li role="presentation">
                <button id="tabbutton-${i}_${id}" class="fr-tabs__tab" tabindex="${tabindex}" role="tabbutton" aria-selected="${value}" aria-controls="tabpanel-${i}-panel_${id}">${title}</button>
            </li>
            `;            
        };

        var strSubSections = "";
        var tmplSubSection = (subsection) => {
            var checked = subsection.default;
            return `
            <div class="fr-fieldset__element fr-fieldset__element--inline">
                <div class="fr-radio-group fr-radio-group--sm">
                    <input type="radio" id="radio-inline_${subsection.id}" name="radio-inline" checked=${checked} aria-controls="tabcontent-${subsection.id}">
                    <label class="fr-label" for="radio-inline_${subsection.id}">
                        ${subsection.title}
                    </label>
                </div>
            </div>
            `;
        };
        var tmplSubSections = (id, subsections) => {
            // chaque sous categories à son propre container de couches
            // et son bouton radio de groupe
            var strTabContents = "";
            for (let j = 0; j < subsections.length; j++) {
                const subsection = subsections[j];
                strSubSections += tmplSubSection(subsection);
                strTabContents += `<div class="tabcontent" role="tabpanel-subsection" id="tabcontent-${subsection.id}"></div>`;
            }
            return `
            <fieldset class="fr-fieldset" id="radio-inline_${id}" aria-labelledby="radio-inline-legend radio-inline-messages">
                ${strSubSections}
                <div class="fr-messages-group" id="radio-inline-messages" aria-live="assertive"></div>
            </fieldset>
            ${strTabContents}
            `;
        };

        var strTabPanelContents = "";
        var tmplTabPanelContent = (i, id, selected, subsections) => {
            var className = "fr-tabs__panel";
            var tabindex = -1;
            if (selected) {
                className = "fr-tabs__panel fr-tabs__panel--selected";
                tabindex = 0;
            }
            var strTabContent = "<div class=\"tabcontent\"></div>";
            if (subsections) {
                strTabContent = tmplSubSections(id, subsections);
            }
            // le listener sur le panneau permet de récuperer à partir de l'ID la catégorie (id) : 
            // > "tabpanel-${i}-panel_${id}}".split('_')[1]
            return `
            <div id="tabpanel-${i}-panel_${id}" class="${className}" role="tabpanel" aria-labelledby="tabbutton-${i}_${id}" tabindex="${tabindex}" style="max-height: 250px;overflow-y: auto;">
                ${strTabContent}
            </div>
            `;
        };

        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            strTabButtons += tmplTabButton(i, category.id, category.title, category.default);
            strTabPanelContents += tmplTabPanelContent(i, category.id, category.default, category.items);
        }

        var strContainer = `
        <!-- onglets -->
         <!-- https://www.systeme-de-design.gouv.fr/composants-et-modeles/composants/onglet -->
        <div class="catalog-container-tabs">
            <div class="fr-tabs">
                <ul class="fr-tabs__list" role="tablist" aria-label="[A modifier | nom du système d'onglet]">
                    ${strTabButtons}
                </ul>
                ${strTabPanelContents}
            </div>
        </div>
        `;
        var container = stringToHTML(strContainer.trim());

        // ajout du shadow DOM pour creer les listeners
        const shadow = container.attachShadow({ mode : "open" });
        shadow.innerHTML = strContainer.trim();

        // event listener sur le DOM
        var panelSubSections = shadow.querySelectorAll("[role=\"tabpanel-subsection\"]");
        var radios = shadow.querySelectorAll("[name=\"radio-inline\"]");
        if (radios) {
            radios.forEach((radio) => {
                radio.addEventListener("change", (e) => {
                    for (let j = 0; j < panelSubSections.length; j++) {
                        const panel = panelSubSections[j];
                        panel.classList.add("gpf-hidden");
                    }
                    var panel = document.getElementById(e.target.getAttribute("aria-controls"));
                    panel.classList.remove("gpf-hidden");
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
                    }
                    // modif tabindex=0
                    e.target.setAttribute("tabindex", 0);
                    // modif aria-selected=true
                    e.target.ariaSelected = true;
                    // modifier les autres panneaux :
                    //   supp class fr-tabs__panel--selected
                    //   modif tabindex=-1
                    for (let j = 0; j < panelContents.length; j++) {
                        const panel = panelContents[j];
                        panel.setAttribute("tabindex", -1);
                        panel.classList.remove("fr-tabs__panel--selected");
                        panel.classList.add("gpf-hidden");
                    }
                    // recup id du panneau avec aria-controls
                    //   ajouter class fr-tabs__panel--selected
                    //   modif tabindex=0
                    var panel = document.getElementById(e.target.getAttribute("aria-controls"));
                    panel.setAttribute("tabindex", 0);
                    panel.classList.add("fr-tabs__panel--selected");
                    panel.classList.remove("gpf-hidden");
                    // appel
                    this.onSelectCatalogTabClick(e);
                });
            });
        }

        return shadow;
    },
    _createCatalogContentCategoryTabContent : function (category, layers) {
        // FIXME on n'utilise pas le champ description car il peut contenir du HTML...
        var strElements = "";
        var tmplElement = (i, id, title, service, category) => {
            // le listener sur l'input permet de récuperer à partir de l'ID 
            // la paire name/service pour identifier la couche: 
            // > "checkboxes-${category}-${i}_${id}-${service}".split('_')[1]
            return `
            <div class="fr-fieldset__element" id="fieldset-${category}_${id}-${service}">
                <div class="fr-checkbox-group">
                    <input name="checkboxes-${category}" id="checkboxes-${category}-${i}_${id}-${service}" type="checkbox" aria-describedby="checkboxes-messages-${category}-${i}_${id}-${service}">
                    <label class="fr-label" for="checkboxes-${category}-${i}_${id}-${service}" title="${title}">
                        ${title} (${service})
                    </label>
                    <div class="fr-messages-group" id="checkboxes-messages-${category}-${i}_${id}-${service}" aria-live="assertive"></div>
                </div>
            </div>
            `;
        };
            
        // INFO 
        // les couches par catégorie sont filtrées au préalable
        var i = 0;
        for (const layer in layers) {
            strElements += tmplElement(i, layers[layer].name, layers[layer].title, layers[layer].service, category);
            i++;
        }

        var strContainer = `
            <fieldset class="fr-fieldset" id="checkboxes-${category}" aria-labelledby="checkboxes-legend checkboxes-messages">
                ${strElements}
            </fieldset>
        `;
        var container = stringToHTML(strContainer);

        // ajout du shadow DOM pour creer les listeners
        const shadow = container.attachShadow({ mode : "open" });
        shadow.innerHTML = strContainer.trim();

        // event listener sur le DOM
        var name = `checkboxes-${category}`;
        var inputs = shadow.querySelectorAll("[name=" + "\"" + name + "\"]");
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
        return shadow;
    }

};

export default CatalogDOM;