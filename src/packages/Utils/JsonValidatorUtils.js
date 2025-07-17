import Ajv from "ajv";
// import Ajv2020 from "ajv/dist/2020";

// liste des schemas
import CatalogSchema from "./schemas/catalog.schema.json";
import TerrotoriesSchema from "./schemas/territories.schema.json";
import LayerWmtsSchema from "./schemas/layer-wmts.schema.json";
import LayerWmsSchema from "./schemas/layer-wms.schema.json";
import LayerWfsSchema from "./schemas/layer-wfs.schema.json";
import LayerTmsSchema from "./schemas/layer-tms.schema.json";

/**
 * @module JsonValidatorUtils
 * @alias module:~utils/JsonValidatorUtils
 * @description
 * ...
 * 
 * @example
 * import { JsonValidatorUtils } from './src/packages/Utils/JsonValidatorUtils.js';
 * const validator = new JsonValidatorUtils();
 * const result = validator.validate('catalog', configData);
 * if (result.valid) {
 *   console.log('✅ Config valide');
 * } else {
 *   console.error('❌ Erreurs:', result.errors);
 * }
 */
var JsonValidatorUtils = class JsonValidatorUtils {

    constructor () {
        this.ajv = new Ajv({ strict : false, allErrors : true });
        
        this.schemas = {};
        this.loadSchemas();
    }

    loadSchemas () {
        this.ajv.addSchema(CatalogSchema, CatalogSchema.$id);
        this.schemas[CatalogSchema.$id] = CatalogSchema;
        
        this.ajv.addSchema(TerrotoriesSchema, TerrotoriesSchema.$id);
        this.schemas[TerrotoriesSchema.$id] = TerrotoriesSchema;

        this.ajv.addSchema(LayerWmtsSchema, LayerWmtsSchema.$id);
        this.schemas[LayerWmtsSchema.$id] = LayerWmtsSchema;

        this.ajv.addSchema(LayerWmsSchema, LayerWmsSchema.$id);
        this.schemas[LayerWmsSchema.$id] = LayerWmsSchema;

        this.ajv.addSchema(LayerWfsSchema, LayerWfsSchema.$id);
        this.schemas[LayerWfsSchema.$id] = LayerWfsSchema;

        this.ajv.addSchema(LayerTmsSchema, LayerTmsSchema.$id);
        this.schemas[LayerTmsSchema.$id] = LayerTmsSchema;
    }

    validate (type, data) {
        if (!this.schemas[type]) {
            throw new Error(`Aucun schéma trouvé pour le type "${type}"`);
        }

        const validate = this.ajv.getSchema(type);
        const valid = validate(data);

        if (!valid) {
            return {
                valid : false,
                errors : validate.errors
            };
        }

        return { valid : true };
    }

};

export default JsonValidatorUtils;

// Expose Export as JsonValidatorUtils (for a build bundle)
if (window.Gp) {
    window.Gp.JsonValidatorUtils = JsonValidatorUtils;
}
