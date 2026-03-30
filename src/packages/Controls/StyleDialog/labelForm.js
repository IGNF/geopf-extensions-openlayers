import FlatStyleForm from "./FlatStyleForm.js";

/**
 * Formulaire de gestion de l'étiquette
 * @constant
 * @type {FlatStyleForm}
 */
const labelForm = new FlatStyleForm();

const label = labelForm.addInput("Texte", "text-value", "textarea");
// Update label value on keyup with a delay to avoid too many updates
let tout, value = label.value;
label.addEventListener("keyup", () => {
    if (label.value === value) {return;}
    clearTimeout(tout);
    tout = setTimeout(() => {
        labelForm.dispatchEvent({ type : "style", property : "text-value", value : label.value });
        value = label.value;
    }, 300);
});
label.addEventListener("change", () => {
    clearTimeout(tout);
});

// break
labelForm.addBreak("text");

// Couleur et taille du texte

labelForm.addCustomInput({
    label : "Taille",
    labelInfo : "(pt)",
    property : "text-size",
});

export default labelForm;

// Expose labelForm as ol.control.labelForm (for a build bundle)
if (window.ol && window.ol.control) {
    window.ol.control.labelForm = labelForm;
}