
#!/bin/bash

PUBLISH_DIR=build/release/geoportal-extensions-openlayers

# sources et definitions
npx rimraf dist/src 
cp -r src/ dist/ 
npm run generate-types 
npx rimraf ${PUBLISH_DIR}/src/ 
rsync -va dist/src/ ${PUBLISH_DIR}/src/ --exclude='bundle.*'

# doc
npx rimraf ${PUBLISH_DIR}/doc/ 
rsync -va doc/ ${PUBLISH_DIR}/doc/ 

# ressources annexes
cp LICENCE.md README.md ${PUBLISH_DIR}/ 

# themes : 
# FIXME utiliser la commande : npm run generate-themes
# au lieu de reconstruire avec npm run build:bundle 
npx rimraf ${PUBLISH_DIR}/css/ 
mkdir ${PUBLISH_DIR}/css/ 
cp dist/bundle/Dsfr.css dist/bundle/Portail.css ${PUBLISH_DIR}/css 

# save
npx rimraf dist/package && rsync -va ${PUBLISH_DIR}/* dist/package --exclude='*.tgz'

# package
cd ${PUBLISH_DIR} && npm pack

exit 0
