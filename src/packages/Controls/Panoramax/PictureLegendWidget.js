import { LitElement, css, nothing } from "lit";
import { html } from "lit/static-html.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import Gp from "geoportal-access-lib";

function reverseGeocode (lat, lon, mode = "geoplateforme") {
    if (mode === "geoplateforme") {
        return reverseGeocodeGp(lat, lon);
    } else if (mode === "osm") {
        return reverseGeocodeNominatim(lat, lon);
    }
}

function reverseGeocodeGp (lat, lon) {
    return new Promise((resolve, reject) => {
        Gp.Services.reverseGeocode({
            position : {
                x : lon,
                y : lat
            },
            srs : "EPSG:4326",
            filterOptions : {
                type : ["StreetAddress"]
            },
            onSuccess : function (result) {
                resolve(result);
            },
        });
    })
        .then(res => {
            let locations = res.locations;
            if (locations && locations.length) {
                return locations[0].placeAttributes.label;
            }
            return null;
        });
}

function reverseGeocodeNominatim (lat, lon) {
    return fetch(`${Panoramax.utils.services.NominatimBaseUrl()}/reverse?lat=${lat}&lon=${lon}&zoom=18&format=geocodejson`)
        .then(res => res.json())
        .then(res => geocodeJsonToPlaceName(res?.features?.shift()?.properties?.geocoding));
}

function geocodeJsonToPlaceName (props) {
    // API format @ https://github.com/geocoders/geocodejson-spec/blob/master/draft/README.md
    if (!props || typeof props !== "object") { return ""; }

    // P1 = main name, P2=locality-like, P3=country+high-level admin
    let p1 = props.name;
    let p2 = [], p3 = [];

    switch (props.type) {
        case "hamlet":
        case "croft":
        case "isolated_dwelling":
        case "neighbourhood":
        case "allotments":
        case "quarter":
        case "farm":
        case "farmyard":
        case "industrial":
        case "commercial":
        case "retail":
        case "city_block":
        case "residential":
        case "locality":
        case "district":
            p3.push(props.city);
            p3.push(props.county);
            p3.push(props.state);
            p3.push(props.country);
            break;
        case "city":
            p3.push(props.county);
            p3.push(props.state);
            p3.push(props.country);
            break;
        case "region":
            p3.push(props.county);
            p3.push(props.state);
            p3.push(props.country);
            break;
        case "country":
            break;
        case "house":
        case "housenumber":
            p2.push(props.housenumber);
            p2.push(props.street);
            p2.push(props.locality);
            p2.push(props.district);
            p3.push(props.city);
            p3.push(props.county);
            p3.push(props.state);
            p3.push(props.country);
            break;
        case "street":
        case "road":
        default:
            p2.push(props.street);
            p2.push(props.locality);
            p2.push(props.district);
            p3.push(props.city);
            p3.push(props.county);
            p3.push(props.state);
            p3.push(props.country);
            break;
    }

    p2 = p2.filter(v => v);
    p2 = p2.filter((v, i) => v !== p1 && (i === 0 || p2[i - 1] !== v));
    p2 = p2.length > 0 ? (props.housenumber ? p2.slice(0, 2).join(" ") : p2.shift()) : null;
    if (p2 === p1) { p2 = null; }

    p3 = p3.filter(v => v);
    p3 = p3.filter((v, i) => v !== p1 && (!p2 || !p2.includes(v)) && (i === 0 || p3[i - 1] !== v));

    let res = [p1, p2, p3.shift()].filter(v => v);

    return res.join(", ");
}

export default class PictureLegendWidget extends LitElement {

    static properties = {
        _addr : { state : true },
        _caption : { state : true },
        _hdUrl : { state : true },
        _visibility : { state : true },
        _expanded : { state : true },
    };

    constructor () {
        super();
        this._expanded = true;
    }

    createRenderRoot () {
        return this;
    }

    /** @private */
    connectedCallback () {
        super.connectedCallback();
        //this.setAttribute("exportparts", "btn");

        this._prevSearches = {};
        this._parent = this._parent || this.closest("pnx-photo-viewer");

        Panoramax.utils.widgets.onceParentAvailable(this)
            .then(() => this._parent.onceReady())
            .then(() => {
                //this._onPicChange(this._parent.psv.getPictureMetadata());
                this._parent.psv.addEventListener("picture-loaded", () => {
                    this._onPicChange(this._parent.psv.getPictureMetadata());
                });
            });
    }

    /**
     * Update informations regarding picture.
     * @param {Object} picMeta Picture medata
     * @private
     */
    _onPicChange (picMeta) {
        clearTimeout(this._addrTimer1);
        this._caption = picMeta?.caption;
        this._hdUrl = picMeta?.panorama?.hdUrl;

        if (picMeta) {
            this._visibility = picMeta.properties?.["geovisio:visibility"] || null;
            if (this._visibility === "anyone") { this._visibility = null; }

            const coordsHash = `${picMeta.gps[0].toFixed(4)}/${picMeta.gps[1].toFixed(4)}`;
            if (this._prevSearches[coordsHash]) {
                this._addr = this._prevSearches[coordsHash];
            }
            else if (!this._parent.psv._sequencePlaying) {
                this._addr = "";
                this._addrTimer1 = setTimeout(() => {
                    reverseGeocode(picMeta.gps[1], picMeta.gps[0], "osm")
                        .then(addr => {
                            clearTimeout(this._addrTimer2);
                            this._addr = addr;
                            this._prevSearches[coordsHash] = addr;
                        });
                }, 0);
            }
        }
        else {
            this._visibility = null;
            this._addr = "";
        }
    }

    /** @private */
    _onBackClick () {
        this.dispatchEvent(new CustomEvent("close"));
    }

    /** @private */
    _onExpand () {
        this._expanded = !this._expanded;
    }

    /** @private */
    render () {
        if (!this._caption) { return nothing; }
        return html`
            <style>
                .gpf-picture-legend-widget {
                    display: flex;
                    box-sizing: border-box;
                    width: 450px;
                    min-width: unset;
                    max-width: 450px;
                    border-radius: 4px;
                    color: var(--text-default-grey);
                    background-color: var(--background-default-grey);
                    box-shadow: var(--raised-shadow);
                    transition: opacity 0.2s 0.1s;
                }
                .gpf-picture-legend-widget.is-expanded {
                    --line-clamp: 2;
                }
                .gpf-picture-legend-widget .column.fixed {
                    width: auto;
                }
                .gpf-picture-legend-widget .column-info {
                    flex: 1;
                    --text-spacing: 0 0 1rem;
                }
                .gpf-picture-legend-widget .row {
                    display: flex;
                }
                .gpf-picture-legend-widget pnx-button::part(btn) {
                    box-shadow: none;
                }
                .gpf-picture-legend-widget pnx-button[size="sm"]::part(btn) {
                  width: 32px;
                  height: 32px !important;
                  flex: 0 0 32px;
                }
                .gpf-picture-legend-widget .picture-address {
                    font-weight: 500;
                    flex: 1;
                    margin-right: auto;
                    /* ellipsis */
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: var(--line-clamp, 1);
                    -webkit-box-orient: vertical;
                }
                .gpf-picture-legend-widget .fr-icon-arrow-down-s-line {
                    transition: transform 0.2s ease;
                }
                .gpf-picture-legend-widget .fr-icon-arrow-down-s-line.is-rotated {
                    transform: rotate(180deg);
                }
                .gpf-picture-legend-widget pnx-panel::part(menu) {
                    border-radius: 0;
                }
                @keyframes animatedBackground {
                    from { background-position: 0 0; }
                    to { background-position: 1000px 0; }
                }
                .pnx-placeholder-loading {
                    display: inline-block;
                    height: 100%;
                    width: 100%;
                    background-image: linear-gradient(90deg, #e4e4e4 0%, #f1f1f1 40%, #ededed 60%, #e4e4e4 100%);
                    background-position: 0px 0px;
                    background-repeat: repeat;
                    animation: animatedBackground 5s linear infinite;
                }
                .link {
                    box-sizing: border-box;
                    background-image: none;
                    background-color: var(--background-default-grey);
                    --hover-tint: var(--hover);
                }
            </style>
            <div class="gpf-picture-legend-widget fr-p-1v ${this._expanded ? "is-expanded" : ""}">
                <div class="column fixed">
                    <pnx-button kind="superflat" @click=${this._onBackClick}>
                        <span class="fr-icon-arrow-left-line" aria-hidden="true"></span>
                    </pnx-button>
                </div>
                <div class="column column-info fr-my-2v fr-ml-2v fr-mr-0">
                    <div class="row">
                        <div class="picture-address fr-mt-1v" title=${this._addr || ""}>
                            ${this._addr?.length > 0 ? this._addr : html`<span class="pnx-placeholder-loading">&nbsp;</span>`}
                        </div>
                        <pnx-button-group dir="row" size="sm" class="fr-ml-2v">
                           <pnx-togglable-group padded="false" id="pic-legend-headline-menu" ._parent=${this._parent}>
                                <pnx-button kind="superflat" size="sm" slot="button">
                                    <span class="fr-icon-more-fill" aria-hidden="true"></span>
                                </pnx-button>
                                <pnx-list-group class="pnx-print-hidden" @click=${this._closeMenu}>
                                    <a
                                        class="fr-px-2v fr-py-3v link"
                                        download
                                        target="_blank"
                                        href=${this._hdUrl}
                                        @click=${this._closeGroup}
                                    >Afficher l’image HD</a>
                                    <a
                                        class="fr-px-2v fr-py-3v link"
                                        download
                                        target="_blank"
                                        href="#"
                                        @click=${this._closeGroup}
                                    >Un autre lien</a>
                                </pnx-list-group>
                            </pnx-togglable-group>
                            <pnx-button kind="superflat" size="sm" @click=${this._onExpand}>
                                <span class="fr-icon-arrow-down-s-line ${this._expanded ? "is-rotated" : ""}" aria-hidden="true"></span>
                            </pnx-button>
                        </pnx-button-group>
                    </div>

                    ${this._expanded && this._caption.producer?.length > 0 ? html`
                        <div class="fr-text--sm fr-mt-3v">
                            <span class="fr-icon-account-circle-fill fr-icon--sm" aria-hidden="true"></span>
                            ${this._caption.producer[this._caption.producer.length - 1]}
                        </div>
                    ` : nothing}

                    ${this._expanded && this._caption.date ? html`
                        <hr class="fr-hr">
                        <div class="fr-text--sm fr-mb-0">
                            ${this._caption.date.toLocaleDateString("fr-fr")}
                            <span class="fr-ml-2v fr-link__detail">${unsafeHTML(this._caption.license)}</span>
                        </div>
                    ` : nothing}
                </div>
            </div>
        `;
    }

}

customElements.define("gpf-picture-legend-widget", PictureLegendWidget);
