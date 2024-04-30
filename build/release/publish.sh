
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

# jsdoc
# FIXME on ne livre pas la jsdoc (trop lourde)
# npm run generate-jsdoc 
# npx rimraf ${PUBLISH_DIR}/jsdoc/ 
# cp -r jsdoc/ ${PUBLISH_DIR}/ 

# themes : 
# FIXME utiliser la commande : npm run generate-themes
npm run build:packages 
npx rimraf ${PUBLISH_DIR}/css/ 
mkdir ${PUBLISH_DIR}/css/ 
cp dist/packages/Dsfr.css dist/packages/Portail.css ${PUBLISH_DIR}/css 

# package
cd ${PUBLISH_DIR} && npm pack
cd .