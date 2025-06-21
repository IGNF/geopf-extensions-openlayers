/**
 * @description
 * MyFormAction is an action that handles a form submission.
 * It is designed to be used with an Inversion of Control (IoC) container,
 * where the form and submit button are injected.
 * It listens for the form's submit event, captures the form data,
 * and provides methods to retrieve the data and clear it.
 * This example is a simple implementation that can be extended
 * to handle more complex forms and data processing.
 */
class MyFormAction {
    constructor (form) {
        console.info("MyFormAction constructor");
        this.data = null;
        this.form = null; // will be set by the IoC
        this.submit = null; // will be set by the IoC
    }

    // ######################################################## //
    // ########################## API ######################### //

    active () {
        console.info("MyFormAction active");
        this.#addEventsListeners();
    }
    disable () {
        console.info("MyFormAction disable");
    }
    setForm (form) {
        console.info("MyFormAction form");
        this.form = form;
        this.submit = this.form.querySelector("input[type=\"submit\"]");
        // add a new field : title
        this.#addField();
    }
    getData () {
        console.info("MyFormAction data");
        this.submit.click(); // simulate form submission
        return this.data || {};
    }
    clear () {
        console.info("MyFormAction clear");
        this.data = null;
    }

    // ######################################################## //
    // ######################### privates ##################### //

    #addEventsListeners () {
        this.form.addEventListener("submit", this.#handler.bind(this), {once : true});
    }
    #handler (e) {
        console.info("MyFormAction handler", e);
        e.preventDefault();
        // on récupère les données du formulaire
        var formData = new FormData(e.target);
        // on transforme les données du formulaire en objet 
        this.data = {
            title : formData.get("GPreportingLabelTitle"),
            desc : formData.get("GPreportingTextDesc"),
            theme : formData.get("GPreportingSelectTheme")
        };
    }
    #addField () {
        console.info("MyFormAction addField");

        var div = document.createElement("div");
        div.className = "fr-input-group";

        var label = document.createElement("label");
        label.setAttribute("for", "GPreportingLabelTitle");
        label.className = "gpf-label fr-label";
        label.textContent = "Titre du signalement";
        div.appendChild(label);

        var input = document.createElement("input");
        input.type = "text";
        input.id = "GPreportingLabelTitle";
        input.name = "GPreportingLabelTitle";
        input.className = "gpf-input fr-input",
        input.placeholder = "Titre du signalement";
        div.appendChild(input);

        this.form.replaceChild(div, this.form.firstChild);
    }

}

if (typeof window !== "undefined") {
    window.MyFormAction = MyFormAction;
}
// EOF
