import OlObject from "ol/Object";

/** Base class for search services
 * 
 */
class SearchServiceBase extends OlObject {

    constructor (options) {
        super();
        options = options || {};
        if (options.searchTab) {
            this._searchTab = options.searchTab || [];
        };
    }

    /** Autocomplete function
     * Dispatchs "searchstart" event when search starts
     * Dispatchs "search" event when search is finished
     * @param {String} search 
     * @param {Object} [options] 
     * @param {String} options.force force search even if search string is less than minChars / enter is pressed
     * @api
     */
    autocomplete (search, options) {
        // Search has started
        this.dispatchEvent({ 
            type : "searchstart", 
            search : search, 
            options : options, 
        });
        // Simulate asynchronous behavior
        setTimeout(function () {
            const result = [];
            const rex = new RegExp(search, "i");
            (this._searchTab || []).forEach((city) => {
                if (rex.test(city.toLowerCase())) {
                    result.push(city);
                }
            });
            // When search is finished
            this.dispatchEvent({ 
                type : "search", 
                search : search, 
                options : options, 
                result : result
            });
        }.bind(this), 200);
    }
    /** Get title of an item
     * @param {*} item 
     * @returns {String} title
     */
    getItemTitle (item) {
        return item;
    }

}

export default SearchServiceBase;

// Expose SearchEngine as ol.control.SearchEngine (for a build bundle)
if (window.ol) {
    if (!window.ol.service) {
        window.ol.service = {};
    }
    window.ol.service.SearchServiceBase = SearchServiceBase;
}
