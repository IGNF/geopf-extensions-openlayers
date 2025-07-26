var ToolTips = {
    /** 
     * ID du container 
     */
    id : "gpf-tooltips-html",
    /** 
     * Initialisation du container de tooltips
     */
    init : function () {
        if (document.getElementById(this.id)) {
            return;
        }
        const tooltip = document.createElement("div");
        tooltip.id = this.id;
        tooltip.style.cssText = `
            position: fixed;
            background: #333;
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 14px;
            max-width: 300px;
            z-index: 99999;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.15s;
        `;
        document.body.appendChild(tooltip);
    },
    /**
     * Active les evenements sur le tooltip pour un element
     * 
     * Le contenu du tooltip est récuperé dans l'attribut 'data-tooltip'
     * de l'element.
     * 
     * @param {*} element - ...
     */
    active : function (element) {
        var self = this;
        var content = element.getAttribute("data-tooltip");
        if (!content) {
            return;
        }
        element.addEventListener("mouseenter", e => {
            var tooltip = document.getElementById(self.id);
            if (!tooltip) {
                return;
            }
            tooltip.innerHTML = content;
            const rect = element.getBoundingClientRect();
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
            tooltip.style.left = `${rect.left + rect.width / 2}px`;
            tooltip.style.transform = "translateX(-50%)";
            tooltip.style.opacity = "1";
        });

        element.addEventListener("mouseleave", () => {
            var tooltip = document.getElementById(self.id);
            if (!tooltip) {
                return;
            }
            tooltip.style.opacity = "0";
        });
    }
};

export default ToolTips;