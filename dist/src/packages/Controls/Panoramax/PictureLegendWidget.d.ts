export default class PictureLegendWidget extends LitElement {
    static properties: {
        _addr: {
            state: boolean;
        };
        _caption: {
            state: boolean;
        };
        _hdUrl: {
            state: boolean;
        };
        _visibility: {
            state: boolean;
        };
        _expanded: {
            state: boolean;
        };
    };
    _expanded: boolean;
    createRenderRoot(): this;
    _prevSearches: {} | undefined;
    _parent: any;
    /**
     * Update informations regarding picture.
     * @param {Object} picMeta Picture medata
     * @private
     */
    private _onPicChange;
    _caption: any;
    _hdUrl: any;
    _visibility: any;
    _addr: any;
    _addrTimer1: NodeJS.Timeout | undefined;
    /** @private */
    private _onBackClick;
    /** @private */
    private _onExpand;
    /** @private */
    private render;
}
import { LitElement } from "lit";
//# sourceMappingURL=PictureLegendWidget.d.ts.map