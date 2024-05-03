
#!/bin/bash
set -x

PUBLISH_DIR=build/release/geoportal-extensions-openlayers
# sources et definitions
npx rimraf dist/src 
mkdir -p dist/src
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
npx rimraf ${PUBLISH_DIR}/css/
mkdir ${PUBLISH_DIR}/css/
if [ ! -d "dist/bundle/" ]; then
    npm run build:bundle
fi
cp dist/bundle/Dsfr.css dist/bundle/Portail.css ${PUBLISH_DIR}/css 

# save
npx rimraf dist/package && rsync -va ${PUBLISH_DIR}/* dist/package --exclude='*.tgz'

# package
cd ${PUBLISH_DIR} && npm pack

set +x
exit 0
