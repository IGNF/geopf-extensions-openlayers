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
     * Dispatchs "autocomplete" event when finished
     * @param {String} search 
     * @param {Object} [options] 
     * @param {String} options.force force search even if search string is less than minChars / enter is pressed
     * @api
     */
    _search (search, options, what) {
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
                type : what, 
                search : search, 
                options : options, 
                result : result
            });
        }.bind(this), 200);
    }
    autocomplete (search, options) {
        this._search(search, options, "autocomplete");
    }
    search (search, options) {
        this._search(search, options, "search");
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
