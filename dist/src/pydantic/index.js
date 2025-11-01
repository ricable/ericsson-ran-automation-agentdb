"use strict";
/**
 * Phase 5 Implementation - Pydantic Schema Generation Module
 *
 * Main entry point for XML to Pydantic model generation with comprehensive
 * type mapping, validation, and cognitive learning integration
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValidationFramework = exports.createSchemaEngine = exports.createTypeMapper = exports.createXmlToPydanticGenerator = exports.XmlToPydanticGenerator = exports.ValidationFramework = exports.SchemaEngine = exports.TypeMapper = void 0;
var type_mapper_1 = require("./type-mapper");
Object.defineProperty(exports, "TypeMapper", { enumerable: true, get: function () { return type_mapper_1.TypeMapper; } });
var schema_engine_1 = require("./schema-engine");
Object.defineProperty(exports, "SchemaEngine", { enumerable: true, get: function () { return schema_engine_1.SchemaEngine; } });
var validation_framework_1 = require("./validation-framework");
Object.defineProperty(exports, "ValidationFramework", { enumerable: true, get: function () { return validation_framework_1.ValidationFramework; } });
var xml_to_pydantic_generator_1 = require("./xml-to-pydantic-generator");
Object.defineProperty(exports, "XmlToPydanticGenerator", { enumerable: true, get: function () { return xml_to_pydantic_generator_1.XmlToPydanticGenerator; } });
/**
 * Convenience function to create a complete XML to Pydantic generator
 */
function createXmlToPydanticGenerator(config) {
    return new XmlToPydanticGenerator(config);
}
exports.createXmlToPydanticGenerator = createXmlToPydanticGenerator;
/**
 * Convenience function to create a type mapper
 */
function createTypeMapper(config) {
    return new TypeMapper(config);
}
exports.createTypeMapper = createTypeMapper;
/**
 * Convenience function to create a schema engine
 */
function createSchemaEngine(config) {
    return new SchemaEngine(config);
}
exports.createSchemaEngine = createSchemaEngine;
/**
 * Convenience function to create a validation framework
 */
function createValidationFramework(config) {
    return new ValidationFramework(config);
}
exports.createValidationFramework = createValidationFramework;
// Re-export common utilities
__exportStar(require("../types/rtb-types"), exports);
//# sourceMappingURL=index.js.map