/* eslint-disable no-console */
const fse = require("fs-extra");
const path = require("path");
var yargs = require('yargs');
const child_process = require("child_process");
const fg = require("fast-glob");
const base64Img = require("base64-img");

async function main () {
    const argv = yargs
    .usage("Usage: $0 [options]")
    .version(false)
    .option("version", {
        alias: "v",
        description: "",
        type: "string",
        nargs: 1,
        demandOption: false,
    })
    .option("date", {
        alias: "d",
        description: "",
        type: "string",
        nargs: 1
    })
    .help()
    .alias("help", "h")
    .epilog("Pour plus d'informations, CONSULTER LE FICHIER 'README.md' !")
    .argv;

    // console.log("options", argv);
    var version = argv.version;
    var date = argv.date;

    // creation du répertoire de build
    const builddir = "dist/package";
    fse.removeSync(path.join(builddir));
    fse.mkdirSync(path.join(builddir), { recursive : true });
    console.log("✔ correctly mkdir package dir !");
    
    // copie des sources 
    const copyFilter = (src, dest) => {
        if (src.includes("bundle")) {
            return false;
        }
        return true;
    };
    fse.removeSync(path.join(builddir, "src"));
    fse.mkdirSync(path.join(builddir, "src"), { recursive : true });
    console.log("✔ correctly mkdir src dir !");
    
    fse.copySync("src", path.join(builddir, "src"), { filter : copyFilter });
    console.log("✔ correctly copy src dir !");

    // encodage base64 des images contenues dans les css
    const entries = fg.globSync(path.join(builddir, "src", "**/*.{css,scss}"));
    for (let index = 0; index < entries.length; index++) {
        const entry = entries[index];
        
        let result = "";
        const lines = fse.readFileSync(path.resolve(entry), "utf8").split("\n");
        lines.forEach(line => {
            let start = line.indexOf("url");
            if (start >= 0) {
                start = line.indexOf("(", start);
                let end = line.indexOf(")");
                let url = line.substring(start + 1, end);
                if (url.startsWith("\"") || url.startsWith("'")) {
                    // quotes are optional in CSS - let's get rid of them if they're there
                    url = url.substring(1, url.length - 1);
                }
                if (!url.startsWith("data:")) {
                    url = path.normalize(url);
                    url = path.join(path.dirname(entry), url);
                    const data = base64Img.base64Sync(url);
                    line = line.substring(0, start) + "('" + data + "'" + line.substring(end);
                }
            }
            result += line + "\n";
        });
        fse.writeFileSync(entry, result);
    }
    console.log("✔ correctly encode css dir !");

    // generation des definitions
    var typescmd = "npm run generate-types";
    try {
        child_process.execSync(`${typescmd}`);
        console.log("✔ correctly generate types dir !");
    } catch (e) {
        console.error(e);
        process.exit(1);
    }

    fse.copySync(path.join("dist", "src"), path.join(builddir, "src"), { filter : copyFilter });
    console.log("✔ correctly copy types dir !");
    
    // copie des ressources annexes
    fse.copySync("doc/README.md", path.join(builddir, "README.md"));
    fse.copySync("doc/DOCUMENTATION.md", path.join(builddir, "DOCUMENTATION.md"));
    fse.copySync("LICENCE.md", path.join(builddir, "LICENCE.md"));
    fse.copySync("DEPENDENCIES.md", path.join(builddir, "DEPENDENCIES.md"));
    console.log("✔ correctly copy resources files !");
    
    // creation du package.json
    const pkg = fse.readJsonSync("./package.json");
    delete pkg.scripts;
    delete pkg.devDependencies;
    if (version) {
        pkg.version = version;
    }
    if (date) {
        pkg.date = date;
    }
    fse.writeJsonSync(path.join(builddir, "package.json"), pkg, { spaces : 2 });
    console.log("✔ correctly create package.json !");
    
    // creation du .npmignore
    fse.outputFileSync(path.join(builddir, ".npmignore"), "*.tgz");
    console.log("✔ correctly create git ignore !");
    
    // copie et/ou generation des themes 
    fse.removeSync(path.join(builddir, "css"));
    fse.mkdirSync(path.join(builddir, "css"), { recursive : true });
    console.log("✔ correctly mkdir css dir !");
    
    var bundlecmd = "npm run build:bundle";
    try {
        child_process.execSync(`${bundlecmd}`);
        console.log("✔ correctly generate bundle dir !");
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
    fse.copySync(path.join("dist", "bundle", "Dsfr.css"), path.join(builddir, "css", "Dsfr.css"));
    fse.copySync(path.join("dist", "bundle", "Classic.css"), path.join(builddir, "css", "Classic.css"));
    fse.copySync(path.join("dist", "bundle", "Dsfr.css.map"), path.join(builddir, "css", "Dsfr.css.map"));
    fse.copySync(path.join("dist", "bundle", "Classic.css.map"), path.join(builddir, "css", "Classic.css.map"));
    console.log("✔ correctly copy css files !");
    
    // creation du package tgz
    var packcmd = "npm pack";
    try {
        child_process.execSync(`${packcmd}`, { cwd : path.join(builddir) });
        console.log("✔ correctly create package tgz !");
    } catch (e) {
        console.error(e);
        process.exit(1);
    }

    // creation lien symbolic
    var srcPath = path.join(builddir, "geopf-extensions-openlayers-" + pkg.version + ".tgz");
    var destPath = path.join(builddir, "geopf-extensions-openlayers.tgz");
    fse.ensureSymlinkSync(srcPath, destPath);
    console.log("✔ correctly link package tgz !");
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});

process.exit(0);
