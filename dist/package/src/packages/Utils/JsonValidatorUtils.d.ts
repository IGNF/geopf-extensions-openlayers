export default JsonValidatorUtils;
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
declare class JsonValidatorUtils {
    ajv: Ajv;
    schemas: {};
    loadSchemas(): void;
    validate(type: any, data: any): {
        valid: boolean;
        errors: import("ajv").ErrorObject<string, Record<string, any>, unknown>[] | null | undefined;
    } | {
        valid: boolean;
        errors?: undefined;
    };
}
import Ajv from "ajv";
//# sourceMappingURL=JsonValidatorUtils.d.ts.map