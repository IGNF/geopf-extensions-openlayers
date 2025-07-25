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
     * @returns {DOMElement} DOM element
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
     * @returns {DOMElement} DOM element
     */
    _createShowCatalogPictoElement : function () {
        var self = this;

        var button = document.createElement("button");
        // INFO: Ajout d'une SPAN pour enlever des marges de 6px dans CHROMIUM (?!)
        var span = document.createElement("span");
        button.appendChild(span);
        button.id = this._addUID("GPshowCatalogPicto");
        button.className = "GPshowOpen GPshowAdvancedToolPicto GPshowCatalogPicto gpf-btn gpf-btn--tertiary gpf-btn-icon gpf-btn-icon-catalog fr-btn fr-btn--tertiary";
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
        container.className = "GPpanelHeader gpf-panel__header fr-modal__header";
        return container;
    },
    _createCatalogPanelTitleElement : function (title) {
        var div = document.createElement("div");
        div.className = "GPpanelTitle gpf-panel__title fr-modal__title fr-pt-4w";
        div.innerHTML = title;
        return div;
    },
    _createCatalogPanelCloseElement : function () {
        var self = this;

        var btnClose = document.createElement("button");
        btnClose.id = this._addUID("GPcatalogPanelClose");
        btnClose.className = "GPpanelClose GPcatalogPanelClose gpf-btn gpf-btn-icon-close fr-btn--close fr-btn fr-btn--tertiary-no-outline fr-m-1w";
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
                <input class="fr-input" placeholder="Rechercher une donnée" type="search" id="search-input" name="search-input" incremental>
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
            button.addEventListener("click", () => {
                this.onSearchCatalogButtonClick();
            });
        }

        var input = shadow.getElementById("search-input");
        if (input) {
            input.addEventListener("search", () => {
                this.onSearchCatalogInputChange();
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
                <button id="tabbutton-${i}_${id}" class="${className}" tabindex="${tabindex}" role="tabbutton" aria-selected="${value}" aria-controls="tabpanel-${i}-panel_${id}">${title}</button>
            </li>
            `;
        };
        
        var tmplSubCategoryRadio = (subcategory) => {
            var checked = (subcategory.default) ? "checked" : "";
            return `
            <!-- sous categorie -->
            <div class="fr-fieldset__element fr-fieldset__element--inline">
                <div class="fr-radio-group fr-radio-group--sm">
                    <input type="radio" id="radio-inline_${subcategory.id}" name="radio-inline" ${checked} aria-controls="tabcontent-${subcategory.id}">
                    <label class="fr-label" for="radio-inline_${subcategory.id}">
                        ${subcategory.title}
                    </label>
                </div>
            </div>
            `;
        };
        var tmplSubCategoriesRadios = (id, subcategories) => {
            // chaque sous categories à son propre container de couches
            // et son bouton radio de groupe
            var strTabContents = "";
            var strSubCategoriesRadios = "";
            for (let j = 0; j < subcategories.length; j++) {
                const subcategory = subcategories[j];
                strSubCategoriesRadios += tmplSubCategoryRadio(subcategory);
                var hidden = "";
                if (!subcategory.default) {
                    hidden = "GPelementHidden gpf-hidden";
                }
                strTabContents += `<div class="tabcontent ${hidden}" role="tabpanel-section" id="tabcontent-${subcategory.id}"></div>`;
            }
            return `
            <!-- sous categories -->
            <fieldset class="fr-fieldset" id="radio-inline_${id}" aria-labelledby="radio-inline-legend radio-inline-messages">
                ${strSubCategoriesRadios}
                <div class="fr-messages-group" id="radio-inline-messages" aria-live="assertive"></div>
            </fieldset>
            ${strTabContents}
            `;
        };

        var strCategoriesTabPanelContents = "";
        var tmplCategoryTabPanelContent = (i, id, selected, subcategories) => {
            var className = "GPtabContent fr-tabs__panel";
            var tabindex = -1;
            if (selected) {
                className = "GPtabContent GPtabContentSelected fr-tabs__panel fr-tabs__panel--selected";
                tabindex = 0;
            }
            var strTabContent = "<div class=\"tabcontent\"></div>";
            if (subcategories) {
                strTabContent = tmplSubCategoriesRadios(id, subcategories);
            }
            // le listener sur le panneau permet de récuperer à partir de l'ID la catégorie (id) :
            // > "tabpanel-${i}-panel_${id}}".split('_')[1]
            return `
            <!-- panneaux -->
            <div id="tabpanel-${i}-panel_${id}" class="${className}" role="tabpanel" aria-labelledby="tabbutton-${i}_${id}" tabindex="${tabindex}" style="max-height: 250px;overflow-y: auto; padding: 1em;">
                ${strTabContent}
            </div>
            `;
        };

        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            strCategoriesTabButtons += tmplCategoryTabButton(i, category.id, category.title, category.default);
            strCategoriesTabPanelContents += tmplCategoryTabPanelContent(i, category.id, category.default, category.items);
        }
        /* FIXME style="--tabs-height: 294px;" ajouté à la main pour pallier le manque de JS DSFR */
        var strContainer = `
        <!-- onglets -->
        <div id="GPcatalogContainerTabs" class="catalog-container-tabs">
            <div class="GPtabs fr-tabs" style="--tabs-height: 294px;">
                <ul class="GPtabsList fr-tabs__list" role="tablist" aria-label="[A modifier | nom du système d'onglet]">
                    ${strCategoriesTabButtons}
                </ul>
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
        var radios = shadow.querySelectorAll("[name=\"radio-inline\"]");
        if (radios) {
            radios.forEach((radio) => {
                radio.addEventListener("change", (e) => {
                    for (let j = 0; j < panelSections.length; j++) {
                        const section = panelSections[j];
                        section.classList.add("gpf-hidden");
                        section.classList.add("GPelementHidden");
                    }
                    var panel = document.getElementById(e.target.getAttribute("aria-controls"));
                    panel.classList.remove("gpf-hidden");
                    panel.classList.remove("GPelementHidden");
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
                    this.onSelectCatalogTabClick(e);
                });
            });
        }

        return shadow;
    },
    _createCatalogContentCategoryTabContent : function (category, layersFiltered) {
        var layers = Object.values(layersFiltered).sort((a, b) => a.title.localeCompare(b.title, "fr", { sensitivity : "base" })); // object -> array

        var strElements = "";
        // FIXME doit on utiliser le champ description avec parsing HTML ou string ?
        var tmplElement = (i, name, title, service, description, informations, categoryId) => {
            // ajout des meta informations
            var tmplInfos = (informations) => {
                // les informations sont des tableaux !
                if (!informations.producers && !informations.thematics && !informations.metadatas) {
                    return "";
                }
                var strProducers = "";
                if (informations.producers) {
                    if (informations.producers.length === 1) {
                        strProducers = `
                        <a href="${informations.producers[0].url}" target="_blank" class="fr-link fr-icon-arrow-right-line fr-link--icon-right">
                            Informations sur le producteur - ${informations.producers[0].name}
                        </a>
                        `;
                    } else {
                        var lst = [];
                        for (let i = 0; i < informations.producers.length; i++) {
                            const element = informations.producers[i];
                            lst.push(`
                                <li>
                                    <a href="${element.url}" target="_blank" class="fr-link fr-icon-arrow-right-line fr-link--icon-right">
                                        ${element.name}
                                    </a>
                                </li>
                            `);
                        }
                        strProducers = `
                        <label class="fr-label">Informations sur les producteurs</label>
                        <ul>
                            ${lst.join()}
                        </ul>
                        `;
                    }
                }
                var strThematics = "";
                if (informations.thematics) {
                    if (informations.thematics.length === 1) {
                        strThematics = `
                        <a href="${informations.thematics[0].url}" target="_blank" class="fr-link fr-icon-arrow-right-line fr-link--icon-right">
                            Informations sur le thème - ${informations.thematics[0].name}
                        </a>`;
                    } else {
                        var lst = [];
                        for (let i = 0; i < informations.thematics.length; i++) {
                            const element = informations.thematics[i];
                            lst.push(`
                                <li>
                                    <a href="${element.url}" target="_blank" class="fr-link fr-icon-arrow-right-line fr-link--icon-right">
                                        ${element.name}
                                    </a>
                                </li>
                            `);
                        }
                        strThematics = `
                        <label class="fr-label">Informations sur les thèmes</label>
                        <ul>
                            ${lst.join()}
                        </ul>
                        `;
                    }
                }
                var strMetadatas = "";
                if (informations.metadatas) {
                    var lst = [];
                    for (let i = 0; i < informations.metadatas.length; i++) {
                        const element = informations.metadatas[i];
                        lst.push(`
                            <li>
                                <a href="${element}" target="_blank" class="fr-link fr-icon-arrow-right-line fr-link--icon-right">
                                    ${element}
                                </a>
                            </li>
                        `);
                    }
                    strMetadatas = `
                    <label class="fr-label">Liste des meta données disponibles</label>
                    <ul>
                        ${lst.join()}
                    </ul>
                    `;
                }
                return `
                    <div class="informations-more">
                        ${strProducers}
                        ${strThematics}
                        ${strMetadatas}
                    </div>
                `;
            };
            // le listener sur l'input permet de récuperer à partir de l'ID
            // la paire name/service pour identifier la couche:
            // > "checkboxes-${categoryId}-${i}_${name}-${service}".split('_')[1]
            return `
            <div class="fr-fieldset__element" id="fieldset-${categoryId}_${name}-${service}">
                <div class="fr-checkbox-group">
                    <input
                        name="checkboxes-${categoryId}"
                        id="checkboxes-${categoryId}-${i}_${name}-${service}"
                        type="checkbox"
                        data-layer="${name}:${service}"
                        aria-describedby="checkboxes-messages-${categoryId}-${i}_${name}-${service}">
                    <label class="GPlabelActive fr-label" for="checkboxes-${categoryId}-${i}_${name}-${service}" title="nom technique : ${name}">
                        ${title} (${service})
                    </label>
                    <section class="fr-accordion">
                        <h5 class="fr-accordion__title">
                            <button class="GPcatalogButtonMoreInfo fr-accordion__btn" role="button-collapse-more-${categoryId}" aria-expanded="false" aria-controls="accordion-more-${i}-${categoryId}">
                                <span class="GPshowCatalogAdvancedTools gpf-hidden" role="button-icon-collapse-more-${i}-${categoryId}"></span>En savoir plus
                            </button>
                        </h5>
                        <div class="fr-collapse GPelementHidden" id="accordion-more-${i}-${categoryId}">
                            ${description}
                            <p>
                                ${tmplInfos(informations)}
                            </p>
                        </div>
                    </section>
                    <div class="fr-messages-group" id="checkboxes-messages-${categoryId}-${i}_${name}-${service}" aria-live="assertive"></div>
                </div>
            </div>
            `;
        };

        var tmplSection = (id, categoryId, title, count, data) => {
            // INFO
            // - la maquette ne possède pas de compteur de couches
            // - hack pour le thème dsfr, on masque l'icone collapse du thème classic
            return `
            <!-- section -->
            <section id="section-${categoryId}-${id}" class="fr-accordion" style="">
                <h3 class="fr-accordion__title">
                    <button class="GPcatalogButtonSection fr-accordion__btn" role="button-collapse-${categoryId}" aria-expanded="false" aria-controls="accordion-${categoryId}-${id}">
                        <span class="GPshowCatalogAdvancedTools gpf-hidden" role="button-icon-collapse-${categoryId}"></span>
                        ${title} (<span id="section-count-${categoryId}-${id}">${count}</span>)
                    </button>
                </h3>
                <div class="fr-collapse GPelementHidden" id="accordion-${categoryId}-${id}">
                    ${data}
                </div>
            </section>
            `;
        };

        // INFO
        // les couches par catégorie sont filtrées au préalable
        // on ajoute la repartition par section des couches (regroupement) !
        var isSection = category.section;
        if (isSection) {
            // on procède à un tri
            // ex. tri sur le champ 'thematic'
            layers = layers.sort((a, b) => {
                return a[category.filter.field][0].localeCompare(b[category.filter.field][0]);
            });
        }

        var sections = {};
        // regroupement ou pas des couches par sections
        for (let i = 0; i < layers.length; i++) {
            const layer = layers[i];
            const infos = {
                producers : layer.producer_urls, // tableau d'objets [{name,url}]
                thematics : layer.thematic_urls, // tableau d'objets [{name,url}]
                metadatas : layer.metadata_urls  // tableau
            };
            // INFO
            // a t on des sections (regroupements) ?
            // - oui, si elle correspond au filtre, on ajoute la couche dans la section
            //   sinon, on ecarte cette couche (normalement, dans la section "Autres")
            // - non, on ajoute directement la couche dans la sous categorie
            var element = tmplElement(i, layer.name, layer.title, layer.service, layer.description, infos, category.id);
            if (isSection) {
                var title = layer[category.filter.field][0];
                if (title) {
                    if (!sections.hasOwnProperty(title)) {
                        sections[title] = "";
                    }
                    sections[title] += element;
                } else {
                    // au cas où...
                    sections["Autres"] += element;
                }
            } else {
                strElements += element;
            }
        }

        if (isSection) {
            category.sections = [];
            // creation des sections de regroupement
            // et ajout des couches dans les sections
            for (const title in sections) {
                if (Object.prototype.hasOwnProperty.call(sections, title)) {
                    const data = sections[title];
                    var count = [...data.matchAll(/"fr-fieldset__element"/g)].length;
                    var id = this.generateID(title);
                    strElements += tmplSection(id, category.id, title, count, data);
                    // HACK on enregistre les valeurs des sections dans l'objet category
                    category.sections.push(title);
                }
            }
        }
        var strContainer = `
            <!-- liste de couches -->
            <div class="fr-accordions-group" id="checkboxes-${category.id}" aria-labelledby="checkboxes-legend checkboxes-messages">
                ${strElements}
            </fieldset>
        `;
        var container = stringToHTML(strContainer);

        // ajout du shadow DOM pour creer les listeners
        const shadow = container.attachShadow({ mode : "open" });
        shadow.innerHTML = strContainer.trim();

        // event listener sur le DOM
        var inputName = `checkboxes-${category.id}`;
        var inputs = shadow.querySelectorAll("[name=" + "\"" + inputName + "\"]");
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
        var buttonName = `button-collapse-${category.id}`;
        var buttons = shadow.querySelectorAll("[role=" + "\"" + buttonName + "\"]");
        if (buttons) {
            buttons.forEach((button) => {
                button.addEventListener("click", (e) => {
                    e.target.ariaExpanded = !(e.target.ariaExpanded === "true");
                    var collapse = document.getElementById(e.target.getAttribute("aria-controls"));
                    if (!collapse) {
                        return;
                    }
                    if (e.target.ariaExpanded === "true") {
                        collapse.classList.add("fr-collapse--expanded");
                        collapse.classList.remove("GPelementHidden");
                    } else {
                        collapse.classList.remove("fr-collapse--expanded");
                        collapse.classList.add("GPelementHidden");
                    }
                }, false);
            });
        }
        var buttonNameMore = `button-collapse-more-${category.id}`;
        var buttonsMore = shadow.querySelectorAll("[role=" + "\"" + buttonNameMore + "\"]");
        if (buttonsMore) {
            buttonsMore.forEach((button) => {
                button.addEventListener("click", (e) => {
                    e.target.ariaExpanded = !(e.target.ariaExpanded === "true");
                    var collapse = document.getElementById(e.target.getAttribute("aria-controls"));
                    if (!collapse) {
                        return;
                    }
                    if (e.target.ariaExpanded === "true") {
                        collapse.classList.add("fr-collapse--expanded");
                        collapse.classList.remove("GPelementHidden");
                    } else {
                        collapse.classList.remove("fr-collapse--expanded");
                        collapse.classList.add("GPelementHidden");
                    }
                }, false);
            });
        }
        var spanName = `button-icon-collapse-${category.id}`;
        var spans = shadow.querySelectorAll("[role=" + "\"" + buttonName + "\"]");
        if (spans) {
            spans.forEach((span) => {
                span.addEventListener("click", (e) => {
                    e.target.parentElement.click();
                });
            });
        }
        return shadow;
    }

};

export default CatalogDOM;
