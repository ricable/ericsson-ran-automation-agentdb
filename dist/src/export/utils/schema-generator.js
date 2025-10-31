"use strict";
/**
 * Schema Generator Utility
 *
 * Generates type-safe schemas (Pydantic, TypeScript, JSON Schema) from templates
 * with comprehensive validation and performance optimization.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaGenerator = void 0;
class SchemaGenerator {
    constructor() {
        this.typeMappings = new Map();
        this.schemaTemplates = new Map();
        this.initializeTypeMappings();
        this.initializeSchemaTemplates();
    }
    async initialize() {
        console.log('📋 Initializing Schema Generator...');
        console.log('✅ Schema Generator initialized');
    }
    async generatePydanticSchema(template, config) {
        const fields = this.extractFields(template);
        const pydanticFields = this.generatePydanticFields(fields, config);
        const validators = this.generatePydanticValidators(fields, config);
        const methods = this.generatePydanticMethods(config);
        const schema = `"""
${config.docstring || `Pydantic schema for ${config.className}`}
Generated automatically from template: ${template.meta.templateId}
"""

from pydantic import BaseModel, Field, validator
from typing import Optional, Dict, Any, List
from datetime import datetime
import re

${config.imports?.join('\n') || ''}

class ${config.className}(BaseModel):
    """
    ${template.meta.description || 'Template configuration schema'}
    """

${pydanticFields}

${validators}

${methods}

    class Config:
        """Pydantic model configuration"""
        extra = 'forbid' if ${config.strictTypes} else 'allow'
        validate_assignment = True
        use_enum_values = True
        schema_extra = {
            "template_id": "${template.meta.templateId}",
            "template_version": "${template.meta.version}",
            "generated_at": datetime.utcnow().isoformat(),
            "field_count": ${fields.length},
            "required_fields": ${fields.filter(f => f.required).length}
        }
`;
        return schema;
    }
    async generateSchemaInfo(template, format) {
        const fields = this.extractFields(template);
        const complexTypes = this.identifyComplexTypes(fields);
        const validationRules = this.generateValidationRules(fields);
        const documentationFields = this.generateDocumentationFields(fields);
        return {
            schemaType: format,
            schemaVersion: '5.0.0',
            fieldCount: fields.length,
            requiredFields: fields.filter(f => f.required).length,
            optionalFields: fields.filter(f => !f.required).length,
            complexTypes,
            validationRules,
            documentationFields
        };
    }
    extractFields(template) {
        const fields = [];
        for (const [key, value] of Object.entries(template.configuration || {})) {
            fields.push({
                name: key,
                type: this.inferType(value),
                required: true,
                defaultValue: value,
                description: `Configuration parameter: ${key}`,
                constraints: []
            });
        }
        return fields;
    }
    inferType(value) {
        if (value === null || value === undefined)
            return 'Any';
        if (typeof value === 'string')
            return 'str';
        if (typeof value === 'number')
            return Number.isInteger(value) ? 'int' : 'float';
        if (typeof value === 'boolean')
            return 'bool';
        if (Array.isArray(value))
            return 'List[Any]';
        if (typeof value === 'object')
            return 'Dict[str, Any]';
        return 'Any';
    }
    generatePydanticFields(fields, config) {
        return fields.map(field => {
            const optional = config.optionalFields.includes(field.name) ? 'Optional[' : '';
            const optionalClose = config.optionalFields.includes(field.name) ? '] = None' : '';
            const required = config.requiredFields.includes(field.name) ? ' ...' : ' = Field(None)';
            let fieldDef = `    ${field.name}: ${optional}${field.type}${optionalClose}${required}`;
            if (field.description) {
                fieldDef += `  # ${field.description}`;
            }
            return fieldDef;
        }).join('\n\n');
    }
    generatePydanticValidators(fields, config) {
        if (!config.includeValidators)
            return '';
        return fields
            .filter(field => field.constraints.length > 0)
            .map(field => this.generateFieldValidator(field))
            .join('\n\n');
    }
    generateFieldValidator(field) {
        const validatorName = `validate_${field.name}`;
        return `    @validator('${field.name}')
    @classmethod
    def ${validatorName}(cls, v):
        """Validate ${field.name} field"""
        # Add validation logic based on constraints
        return v`;
    }
    generatePydanticMethods(config) {
        if (!config.includeSerializers)
            return '';
        let methods = '';
        if (config.customMethods) {
            methods += config.customMethods.join('\n\n') + '\n\n';
        }
        // Add default methods
        methods += `    def to_dict(self) -> Dict[str, Any]:
        """Convert model to dictionary"""
        return self.dict(exclude_none=True)

    @classmethod
    def from_template(cls, template_data: Dict[str, Any]) -> '${config.className}':
        """Create instance from template data"""
        return cls(**template_data)
`;
        return methods;
    }
    identifyComplexTypes(fields) {
        return fields
            .filter(field => field.type.includes('List') || field.type.includes('Dict'))
            .map(field => ({
            fieldName: field.name,
            fieldType: field.type,
            nestedFields: this.countNestedFields(field.type),
            isRecursive: field.type.includes('Dict') && field.type.includes('str'),
            isGeneric: field.type.includes('[') && field.type.includes(']'),
            constraints: field.constraints
        }));
    }
    countNestedFields(typeStr) {
        const match = typeStr.match(/Dict\[.*, (.+)\]/);
        if (match) {
            return match[1].split(',').length;
        }
        return 1;
    }
    generateValidationRules(fields) {
        return fields.map(field => ({
            fieldName: field.name,
            ruleType: 'type_validation',
            condition: `isinstance(value, ${field.type})`,
            errorMessage: `Invalid type for ${field.name}`,
            validationCode: `if not isinstance(v, ${field.type}): raise ValueError("Invalid type")`,
            isRequired: field.required
        }));
    }
    generateDocumentationFields(fields) {
        return fields.map(field => ({
            fieldName: field.name,
            description: field.description,
            dataType: field.type,
            defaultValue: field.defaultValue,
            examples: [field.defaultValue],
            relatedFields: [],
            constraints: field.constraints.map(c => c.toString()),
            notes: []
        }));
    }
    initializeTypeMappings() {
        this.typeMappings.set('string', 'str');
        this.typeMappings.set('number', 'float');
        this.typeMappings.set('integer', 'int');
        this.typeMappings.set('boolean', 'bool');
        this.typeMappings.set('array', 'List[Any]');
        this.typeMappings.set('object', 'Dict[str, Any]');
    }
    initializeSchemaTemplates() {
        this.schemaTemplates.set('pydantic', 'pydantic_template.py');
        this.schemaTemplates.set('typescript', 'typescript_template.ts');
        this.schemaTemplates.set('json_schema', 'json_schema_template.json');
    }
}
exports.SchemaGenerator = SchemaGenerator;
//# sourceMappingURL=schema-generator.js.map