import PanelManager from "../Utils/PanelManager";
// Mixin pour ajouter des méthodes communes à tous les widgets.

// voir fichiers DOM  et assign
// modifier snippets.
var Widget = {
    /**
     * This method is called when a widget opens a panel
     * It calls the panelManager to automatically close other panels
     */
    onPanelOpen : function () {
        // On récupère l'id du widget à partir de l'id du DOM de la forme GPwidgetName-1876465465
        PanelManager(this.options.position, this.element.id.match(/(\w+)-[0-9]+/)[1]);
    }
};

export default Widget;