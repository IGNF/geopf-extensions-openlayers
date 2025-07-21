/**
* managing events
*
* See {@link http://krasimirtsonev.com/blog/article/javascript-managing-events-dispatch-listen}
* See {@link https://github.com/krasimir/EventBus}
*
* @event "editor:layer:onclickvisibility" - event ...
* @event "editor:layer:onclickclone" - event ...
* @event "editor:layer:onclickremove" - event ...
* @event "editor:style:oneditjson" - event ...
* @event "editor:style:scale:onchangemin" - event ...
* @event "editor:style:scale:onchangemax" - event ...
* @event "editor:legend:onclickedition" - event ...
* @event "editor:legend:onchangevalue" - event ...
* @event "editor:filter:oneditjson" - event ...
* @event "editor:themes:onclickimage" - event ...
* @event "editor:themes:onclicktitle" - event ...
* @event "editor:search:onsubmit" - event ...
* @event "editor:search:onautocomplete" - event ...
* @event "editor:group:oncollapse" - event ...
* @event "editor:onloaded" - event ...
*
* @mixin
*
* @example
* // dispatch event
* EventBus.dispatch(EventEditor.layer.visibility, e);
* // listener
* EventBus.addEventListener(EventEditor.layer.visibility, function (e) {...}, this);
*/
var EventEditor = {
    /** evenement sur la fin de chargement de l'editeur */
    onloaded : "editor:onloaded",
    layer : {
        /** evenement sur la visibilité : clic sur le bouton 'oeil' */
        onclickvisibility : "editor:layer:onclickvisibility",
        /** evenement sur la duplication : clic sur le bouton
        (not yet implemented !) */
        onclickclone : "editor:layer:onclickclone",
        /** evenement sur la suppression : clic sur le bouton
        (not yet implemented !) */
        onclickremove : "editor:layer:onclickremove"
    },
    legend : {
        /** evenement sur l'affichage du mode edition */
        onclickedition : "editor:legend:onclickedition",
        /** evenement sur la modification d'une valeur */
        onchangevalue : "editor:legend:onchangevalue"
    },
    group : {
        /**  evenement pour deplier/plier le groupe
        (not yet implemented !) */
        oncollapse : "editor:group:oncollapse"
    },
    style : {
        /** evenement sur l'édition du style
        (not yet implemented !) */
        oneditjson : "editor:style:oneditjson",
        /** evenement sur la modification de l'echelle d'affichage */
        scale : {
            onchangemin : "editor:style:scale:onchangemin",
            onchangemax : "editor:style:scale:onchangemax"
        }
    },
    filter : {
        /** evenement sur l'édition du filtre
        (not yet implemented !) */
        oneditjson : "editor:filter:oneditjson"
    },
    themes : {
        /** evenement sur le clic de l'image */
        onclickimage : "editor:themes:onclickimage",
        /** evenement sur le clic du titre */
        onclicktitle : "editor:themes:onclicktitle"
    },
    search : {
        /** evenement sur la recherche */
        onsubmit : "editor:search:onsubmit",
        onautocomplete : "editor:search:onautocomplete"
    }
};

export default EventEditor;
