import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins : [
        vue(),
    ],
    resolve : {
        alias : [
            { find : "@", replacement : fileURLToPath(new URL("./src", import.meta.url)) },
            // Vite 5 ne gère pas les imports CSS "with { type: 'css' }" de l'ESM de Panoramax : bundle CJS photo
            {
                find : /^@panoramax\/web-viewer$/,
                replacement : fileURLToPath(new URL("./node_modules/@panoramax/web-viewer/build/cjs/index_photoviewer.js", import.meta.url))
            }
        ]
    }
});
