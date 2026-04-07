import InputColor from "../Input/InputColor.js";
import FlatStyleForm from "./FlatStyleForm.js";
// import InputColor from './InputColor.js';

// Création du formulaire de style
/**
 * Formulaire de gestion du style
 * @constant
 * @type {FlatStyleForm}
 */
const styleForm = new FlatStyleForm();

// POINT //

styleForm.addCustomSelect({
    label : "Forme",
    property : "circle-form",
    type : "form",
    options : {
        none : "Sans",
        marker : "Marqueur",
        circle : "Cercle",
        square : "Carré",
        triangle : "Triangle",
    },
    disabled : true,
});

styleForm.addCustomSelect({
    label : "Couleur",
    property : "circle-fill-color",
    type : "color",
});

styleForm.addCustomInput({
    label : "Taille",
    labelInfo : "(pt)",
    property : "circle-radius",
});

styleForm.addBreak("circle-form");
// styleForm.addInput('Bordure', 'circle-stroke-color', new InputColor());
styleForm.addCustomSelect({
    label : "Bordure",
    property : "circle-stroke-color",
    type : "color",
});

styleForm.addCustomInput({
    label : "Taille",
    labelInfo : "(pt)",
    property : "circle-stroke-width",
});

styleForm.addBreak("circle-stroke");

// styleForm.addCustomSelect({
//     label : "Symbole",
//     property : "circle-glyph",
//     type : "icon",
//     fonts : ["remixicon"],
// });
// styleForm.addInput('Couleur', 'circle-symbol-color', new InputColor());
// styleForm.addBreak("circle-symbol");

// POLYGONE //

// Pattern : nécessite plus de travail
// const inputPattern = styleForm.addCustomSelect({
//     label : "Motif",
//     property : "fill-pattern-config",
//     options : {
//         "" : "Plein",
//         "hatch;0" : "Lignes verticales",
//         "hatch;90" : "Lignes horizontales",
//         "hatch;45" : "Diagonales (droite)",
//         "hatch;135" : "Diagonales (gauche)",
//         "cross;1" : "Quadrillage",
//         "dot;1" : "Points",
//         "tile;1" : "Carrés",
//         "caps" : "Triangles",
//         "crosses" : "Croix",
//         "wave" : "Vagues",
//         "forest2" : "Arbres",
//     },
//     type : "pattern",
//     disabled : true,
// });

// // styleForm.addInput('Couleur', 'fill-color', new InputColor());
// styleForm.addCustomSelect({
//     label : "Couleur",
//     property : "fill-color",
//     type : "color",
// });

// const inputFillSize = styleForm.addCustomInput({
//     label : "Taille",
//     property : "fill-pattern-scale",
// });

// /* Désactive les options du pattern si aucun pattern n'est choisi */
// inputPattern.input.addEventListener("change", e => {
//     if (e.target.value) {
//         inputFillColor.setDisabled(false);
//         inputFillSize.input.disabled = false;
//     } else {
//         inputFillColor.setDisabled(true);
//         inputFillSize.input.disabled = true;
//     }
// });
// styleForm.addBreak("fill-patern");

styleForm.addCustomSelect({
    label : "Couleur",
    property : "fill-color",
    type : "color",
});

styleForm.addCustomInput({
    label : "Opacité",
    property : "fill-color-opacity",
    attributes : {
        step : 0.1,
        max : 1
    },
});
styleForm.addBreak("fill-style");


// LIGNE / POLYGONE //

styleForm.addCustomSelect({
    label : "Bordure",
    property : "stroke-line-dash",
    options : {
        "" : "Continue",
        "5,5" : "Tiret",
        "0,5" : "Pointillé",
        "10,5,0,5" : "Tirets irréguliers",
    },
    type : "stroke",
});
// styleForm.addInput('Couleur', 'stroke-color', new InputColor());
styleForm.addCustomSelect({
    label : "Couleur",
    property : "stroke-color",
    type : "color",
});
styleForm.addCustomInput({
    label : "Taille",
    labelInfo : "(pt)",
    property : "stroke-width",
});

// LIGNE //

// Disabled : true car non géré par l'application de base
styleForm.addBreak("line-arrow");
styleForm.addCustomSelect({
    label : "Début",
    // disabled : true,
    property : "line-arrow-start",
    options : {
        "" : "Simple",
        "triangle" : "Flèche",
        "circle" : "Rond",
        "square" : "Carré",
    },
    type : "arrow",
    disabled : true,
});

styleForm.addCustomSelect({
    label : "Fin",
    property : "line-arrow-end",
    options : {
        "" : "Simple",
        "triangle" : "Flèche",
        "circle" : "Rond",
        "square" : "Carré",
    },
    type : "arrow",
    disabled : true,
});

export default styleForm;

// Expose styleForm as ol.control.styleForm (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.styleForm = styleForm;
}