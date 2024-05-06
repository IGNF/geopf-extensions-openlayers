var fs = require("fs");
var path = require("path");
var webpack = require("webpack");
var header = require("string-template");

var BannerWebPackPlugin = webpack.BannerPlugin;

var rootdir = path.join(__dirname, "../..");
var pkg = require(path.join(rootdir, "package.json"));

module.exports = (env, argv) => {
    return {
        /** AJOUT DES LICENCES */
        plugins : [
            new BannerWebPackPlugin({
                banner : header(fs.readFileSync(path.join(rootdir, "build/licences", "licence-proj4js.tmpl"), "utf8"), {
                    __VERSION__ : pkg.dependencies["proj4"],
                }),
                raw : true
            }),
            new BannerWebPackPlugin({
                banner : header(fs.readFileSync(path.join(rootdir, "build/licences", "licence-eventbusjs.tmpl"), "utf8"), {
                    __VERSION__ : pkg.dependencies["eventbusjs"],
                }),
                raw : true
            }),
            new BannerWebPackPlugin({
                banner : header(fs.readFileSync(path.join(rootdir, "build/licences", "licence-sortablejs.tmpl"), "utf8"), {
                    __VERSION__ : pkg.dependencies["sortablejs"],
                }),
                raw : true
            }),
            new BannerWebPackPlugin({
                banner : header(fs.readFileSync(path.join(rootdir, "build/licences", "licence-olms.tmpl"),"utf8"), {
                    __VERSION__ : pkg.dependencies["ol-mapbox-style"],
                }),
                raw : true,
                entryOnly : true
            }),
        ]
    };
};