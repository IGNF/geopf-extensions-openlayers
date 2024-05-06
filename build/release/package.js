/* eslint-disable no-console */
const fse = require("fs-extra");
const path = require("path");
const child_process = require("child_process");

async function main () {
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
    
    // copie de la doc
    fse.mkdirSync(path.join(builddir, "doc"), { recursive : true });
    fse.copySync("doc", path.join(builddir, "doc"));
    console.log("✔ correctly copy doc dir !");
    
    // copie des ressources annexes
    fse.copySync("README.md", path.join(builddir, "README.md"));
    fse.copySync("LICENCE.md", path.join(builddir, "LICENCE.md"));
    console.log("✔ correctly copy resources files !");
    
    // creation du package.json
    const pkg = fse.readJsonSync("./package.json");
    delete pkg.scripts;
    delete pkg.devDependencies;
    fse.writeJsonSync(path.join(builddir, "package.json"), pkg, { spaces : 2 });
    console.log("✔ correctly create package.json !");
    
    // creation du .npmignore
    fse.outputFileSync(path.join(builddir, ".npmignore"), "*.tgz");
    console.log("✔ correctly create git ignore !");
    
    // copie et/ou generation des themes 
    fse.removeSync(path.join(builddir, "css"));
    fse.mkdirSync(path.join(builddir, "css"), { recursive : true });
    console.log("✔ correctly mkdir css dir !");
    
    if (!fse.pathExistsSync(path.join("dist", "bundle"))) {
        var bundlecmd = "npm run build:bundle";
        try {
            child_process.execSync(`${bundlecmd}`);
            console.log("✔ correctly generate bundle dir !");
        } catch (e) {
            console.error(e);
            process.exit(1);
        }
    }
    fse.copySync(path.join("dist", "bundle", "Dsfr.css"), path.join(builddir, "css", "Dsfr.css"));
    fse.copySync(path.join("dist", "bundle", "Classic.css"), path.join(builddir, "css", "Classic.css"));
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
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});

process.exit(0);