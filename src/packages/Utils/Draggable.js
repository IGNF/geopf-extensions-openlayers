import Logger from "./LoggerByDefault";

var logger = Logger.getLogger("draggable");

/**
 * @module Draggable
 * @alias module:~utils/Draggable
 * @fixme conflit entre la position et le mode draggable
 * @private
 * @description
 * ...
 *
 * @example
 * dragElement();
 */
var Draggable = {
    /**
    * A draggable HTML element with JavaScript and CSS.
    *
    * @function dragElement
    * @param {DOMElement} element - element
    * @param {DOMElement} header - header (optional)
    * @param {DOMElement} container - container (optional)
    * @see https://gist.github.com/stephanbogner/75de4e84687ae6065fb0a4d81917543e
    * @see https://stackoverflow.com/questions/48097791/how-to-keep-a-draggable-element-from-being-moved-outside-a-boundary
    * @example
    *   // CSS :
    *       // #element { position: absolute; }
    *   // HTML :
    *       // <div id="container">
    *       //   <div id="element">
    *       //     <div id="header"/>
    *       //      <div/> ...
    *       //     </div>
    *       //   </div>
    *       // </div>
    *   // JS :
    *       var element = document.getElementById("element");
    *       Draggable.dragElement(element, header, container);
    */
    dragElement : function (element, header, container) {
        // Adapted from https://www.w3schools.com/howto/howto_js_draggable.asp
        let dragStartMouseX = 0, dragStartMouseY = 0, diffX = 0, diffY = 0, positionX = 0, positionY = 0;
        if (header) {
            header.addEventListener("mousedown", dragMouseDown, true);
        } else {
            element.addEventListener("mousedown", dragMouseDown, true);
        }
        var rect;
        var viewport = {
            bottom : 0,
            left : 0,
            right : 0,
            top : 0,
        };

        function dragMouseDown (e) {
            e = e || window.event;
            e.preventDefault();

            dragStartMouseX = e.clientX;
            dragStartMouseY = e.clientY;

            rect = element.getBoundingClientRect();
            const viewPortRect = container.getBoundingClientRect();
            viewport = {
                bottom : viewPortRect.bottom,
                left : viewPortRect.left,
                right : viewPortRect.right,
                top : viewPortRect.top,
            };

            document.addEventListener("mouseup", closeDragElement, true);
            document.addEventListener("mousemove", elementDrag, true);
        }

        function closeDragElement () {
            /* stop moving when mouse button is released: */
            positionX -= diffX;
            positionY -= diffY;
            document.removeEventListener("mouseup", closeDragElement, true);
            document.removeEventListener("mousemove", elementDrag, true);
        }

        function elementDrag (e) {
            e = e || window.event;
            // e.preventDefault();
            let currentMouseX = e.clientX;
            let currentMouseY = e.clientY;

            let oldDiffX = diffX;
            let oldDiffY = diffY;

            diffX = dragStartMouseX - currentMouseX;
            diffY = dragStartMouseY - currentMouseY;

            var newLeft = rect.left - diffX;
            var newTop = rect.top - diffY;

            if (newLeft < viewport.left
                || newTop < viewport.top
                || newLeft + rect.width > viewport.right
                || newTop + rect.height > viewport.bottom
            ) {
                // the element will hit the boundary, do nothing...
                diffX = oldDiffX;
                diffY = oldDiffY;
            } else {
                // set the element's new position:
                let newX = positionX - diffX;
                let newY = positionY - diffY;
                element.style.transform = "translate(" + newX + "px," + newY + "px)";
            }
        }
    }
};

export default Draggable;
