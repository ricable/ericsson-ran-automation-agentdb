"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSVParameterProcessor = void 0;
class CSVParameterProcessor {
    constructor(config = { strictMode: false, skipInvalidRows: true, validateConstraints: true, mergeDuplicates: true }) {
        this.config = config;
        this.startTime = Date.now();
    }
    /**
     * Process StructParameters.csv for parameter hierarchy and structure
     */
    async processStructParameters(filePath) {
        console.log(`Processing StructParameters.csv from ${filePath}`);
        try {
            const fs = require('fs').promises;
            const csv = require('csv-parser');
            const parameters = [];
            const parameterHierarchy = new Map();
            const parameterGroups = new Map();
            const errors = [];
            const warnings = [];
            const createReadStream = require('fs').createReadStream;
            const stream = createReadStream(filePath)
                .pipe(csv())
                .on('data', (row) => {
                try {
                    const structParam = this.parseStructParameterRow(row);
                    if (structParam) {
                        const parameter = this.convertStructParameterToRTB(structParam);
                        parameters.push(parameter);
                        // Build hierarchy information
                        parameterHierarchy.set(parameter.id, [structParam.moClass, structParam.parentStructure]);
                        // Build group information
                        const groupKey = `${structParam.moClass}_${structParam.parentStructure}`;
                        if (!parameterGroups.has(groupKey)) {
                            parameterGroups.set(groupKey, []);
                        }
                        parameterGroups.get(groupKey).push(parameter.id);
                    }
                }
                catch (error) {
                    const errorMsg = `Error processing StructParameters row: ${error}`;
                    if (this.config.strictMode) {
                        throw new Error(errorMsg);
                    }
                    else {
                        errors.push(errorMsg);
                        console.warn(errorMsg);
                    }
                }
            });
            await new Promise((resolve, reject) => {
                stream.on('end', resolve);
                stream.on('error', reject);
            });
            const stats = this.generateProcessingStats(parameters.length, 0);
            console.log(`StructParameters processing complete: ${parameters.length} parameters processed`);
            return {
                parameters,
                parameterHierarchy,
                parameterGroups,
                stats,
                errors,
                warnings
            };
        }
        catch (error) {
            throw new Error(`Failed to process StructParameters.csv: ${error}`);
        }
    }
    /**
     * Process Spreadsheets_Parameters.csv for detailed specifications
     */
    async processSpreadsheetParameters(filePath) {
        console.log(`Processing Spreadsheets_Parameters.csv from ${filePath}`);
        try {
            const fs = require('fs').promises;
            const csv = require('csv-parser');
            const parameters = [];
            const parameterHierarchy = new Map();
            const parameterGroups = new Map();
            const errors = [];
            const warnings = [];
            const createReadStream = require('fs').createReadStream;
            const stream = createReadStream(filePath)
                .pipe(csv())
                .on('data', (row) => {
                try {
                    const spreadsheetParam = this.parseSpreadsheetParameterRow(row);
                    if (spreadsheetParam) {
                        const parameter = this.convertSpreadsheetParameterToRTB(spreadsheetParam);
                        parameters.push(parameter);
                        // Build hierarchy information
                        const hierarchy = this.buildParameterHierarchy(spreadsheetParam);
                        parameterHierarchy.set(parameter.id, hierarchy);
                        // Build group information
                        const groupKey = spreadsheetParam.category || 'default';
                        if (!parameterGroups.has(groupKey)) {
                            parameterGroups.set(groupKey, []);
                        }
                        parameterGroups.get(groupKey).push(parameter.id);
                        // Add feature-based grouping
                        if (spreadsheetParam.feature) {
                            const featureKey = `feature_${spreadsheetParam.feature}`;
                            if (!parameterGroups.has(featureKey)) {
                                parameterGroups.set(featureKey, []);
                            }
                            parameterGroups.get(featureKey).push(parameter.id);
                        }
                    }
                }
                catch (error) {
                    const errorMsg = `Error processing SpreadsheetParameters row: ${error}`;
                    if (this.config.strictMode) {
                        throw new Error(errorMsg);
                    }
                    else {
                        errors.push(errorMsg);
                        console.warn(errorMsg);
                    }
                }
            });
            await new Promise((resolve, reject) => {
                stream.on('end', resolve);
                stream.on('error', reject);
            });
            const stats = this.generateProcessingStats(parameters.length, 0);
            console.log(`Spreadsheets_Parameters processing complete: ${parameters.length} parameters processed`);
            return {
                parameters,
                parameterHierarchy,
                parameterGroups,
                stats,
                errors,
                warnings
            };
        }
        catch (error) {
            throw new Error(`Failed to process Spreadsheets_Parameters.csv: ${error}`);
        }
    }
    /**
     * Merge parameters from both CSV sources
     */
    async mergeParameters(structResult, spreadsheetResult) {
        console.log(`Merging parameters from ${structResult.parameters.length} struct and ${spreadsheetResult.parameters.length} spreadsheet parameters`);
        const mergedParameters = [];
        const parameterMap = new Map();
        const mergedHierarchy = new Map();
        const mergedGroups = new Map();
        const errors = [...structResult.errors, ...spreadsheetResult.errors];
        const warnings = [...structResult.warnings, ...spreadsheetResult.warnings];
        // First, add struct parameters
        for (const param of structResult.parameters) {
            parameterMap.set(param.id, param);
            mergedHierarchy.set(param.id, structResult.parameterHierarchy.get(param.id) || []);
        }
        // Then merge spreadsheet parameters (richer data)
        for (const spreadsheetParam of spreadsheetResult.parameters) {
            const existingParam = parameterMap.get(spreadsheetParam.id);
            if (existingParam) {
                // Merge with existing parameter
                const mergedParam = this.mergeParameters(existingParam, spreadsheetParam);
                parameterMap.set(spreadsheetParam.id, mergedParam);
            }
            else {
                // Add new parameter
                parameterMap.set(spreadsheetParam.id, spreadsheetParam);
            }
            // Update hierarchy with spreadsheet data
            const spreadsheetHierarchy = spreadsheetResult.parameterHierarchy.get(spreadsheetParam.id);
            if (spreadsheetHierarchy) {
                mergedHierarchy.set(spreadsheetParam.id, spreadsheetHierarchy);
            }
        }
        // Convert map to array
        mergedParameters.push(...Array.from(parameterMap.values()));
        // Merge groups
        for (const [key, values] of structResult.parameterGroups) {
            mergedGroups.set(key, values);
        }
        for (const [key, values] of spreadsheetResult.parameterGroups) {
            if (mergedGroups.has(key)) {
                const existing = mergedGroups.get(key);
                mergedGroups.set(key, [...new Set([...existing, ...values])]);
            }
            else {
                mergedGroups.set(key, values);
            }
        }
        const stats = this.generateProcessingStats(mergedParameters.length, 0);
        console.log(`Merge complete: ${mergedParameters.length} total parameters`);
        return {
            parameters: mergedParameters,
            parameterHierarchy: mergedHierarchy,
            parameterGroups: mergedGroups,
            stats,
            errors,
            warnings
        };
    }
    /**
     * Parse StructParameters.csv row
     */
    parseStructParameterRow(row) {
        try {
            return {
                parameterName: this.cleanString(row['Parameter Name'] || row.parameterName || row.name),
                parameterType: this.cleanString(row['Parameter Type'] || row.parameterType || row.type),
                moClass: this.cleanString(row['MO Class'] || row.moClass || row.class),
                parentStructure: this.cleanString(row['Parent Structure'] || row.parentStructure || row.parent),
                structureLevel: parseInt(row['Structure Level'] || row.structureLevel) || 0,
                description: this.cleanString(row.Description || row.description),
                defaultValue: this.parseValue(row['Default Value'] || row.defaultValue),
                constraints: this.cleanString(row.Constraints || row.constraints),
                source: 'StructParameters.csv'
            };
        }
        catch (error) {
            console.warn(`Failed to parse struct parameter row: ${error}`);
            return null;
        }
    }
    /**
     * Parse Spreadsheets_Parameters.csv row
     */
    parseSpreadsheetParameterRow(row) {
        try {
            return {
                name: this.cleanString(row.Name || row.name || row['Parameter Name']),
                moClass: this.cleanString(row['MO Class'] || row.moClass || row.Class),
                parameterType: this.cleanString(row['Parameter Type'] || row.parameterType || row.Type),
                vsDataType: this.cleanString(row['VS Data Type'] || row.vsDataType || row.DataType),
                description: this.cleanString(row.Description || row.description),
                defaultValue: this.parseValue(row['Default Value'] || row.defaultValue),
                allowedValues: this.cleanString(row['Allowed Values'] || row.allowedValues),
                minValue: row['Min Value'] || row.minValue ? parseInt(row['Min Value'] || row.minValue) : undefined,
                maxValue: row['Max Value'] || row.maxValue ? parseInt(row['Max Value'] || row.maxValue) : undefined,
                pattern: this.cleanString(row.Pattern || row.pattern),
                category: this.cleanString(row.Category || row.category),
                subCategory: this.cleanString(row['Sub Category'] || row.subCategory),
                feature: this.cleanString(row.Feature || row.feature),
                deprecated: row.Deprecated || row.deprecated === 'true' || row.deprecated === 'TRUE',
                introduced: this.cleanString(row.Introduced || row.introduced),
                documentation: this.cleanString(row.Documentation || row.documentation)
            };
        }
        catch (error) {
            console.warn(`Failed to parse spreadsheet parameter row: ${error}`);
            return null;
        }
    }
    /**
     * Convert StructParameter to RTBParameter
     */
    convertStructParameterToRTB(structParam) {
        return {
            id: `${structParam.moClass}.${structParam.parameterName}`,
            name: structParam.parameterName,
            vsDataType: structParam.parameterType,
            type: this.mapParameterTypeToType(structParam.parameterType),
            constraints: this.parseConstraints(structParam.constraints),
            description: structParam.description,
            defaultValue: structParam.defaultValue,
            hierarchy: [structParam.moClass, structParam.parentStructure],
            source: structParam.source,
            extractedAt: new Date(),
            structureGroups: [structParam.parentStructure]
        };
    }
    /**
     * Convert SpreadsheetParameter to RTBParameter
     */
    convertSpreadsheetParameterToRTB(spreadsheetParam) {
        const constraints = [];
        // Range constraints
        if (spreadsheetParam.minValue !== undefined || spreadsheetParam.maxValue !== undefined) {
            constraints.push({
                type: 'range',
                value: {
                    min: spreadsheetParam.minValue,
                    max: spreadsheetParam.maxValue
                },
                severity: 'error'
            });
        }
        // Enum constraints
        if (spreadsheetParam.allowedValues) {
            const enumValues = spreadsheetParam.allowedValues.split(',').map(v => v.trim());
            constraints.push({
                type: 'enum',
                value: enumValues,
                severity: 'error'
            });
        }
        // Pattern constraints
        if (spreadsheetParam.pattern) {
            constraints.push({
                type: 'pattern',
                value: spreadsheetParam.pattern,
                severity: 'error'
            });
        }
        return {
            id: `${spreadsheetParam.moClass}.${spreadsheetParam.name}`,
            name: spreadsheetParam.name,
            vsDataType: spreadsheetParam.vsDataType,
            type: this.mapParameterTypeToType(spreadsheetParam.parameterType),
            constraints,
            description: spreadsheetParam.description,
            defaultValue: spreadsheetParam.defaultValue,
            hierarchy: [spreadsheetParam.moClass, spreadsheetParam.category || 'root'],
            source: 'Spreadsheets_Parameters.csv',
            extractedAt: new Date(),
            structureGroups: [spreadsheetParam.category || 'default', spreadsheetParam.subCategory].filter(Boolean)
        };
    }
    /**
     * Merge two RTBParameter objects
     */
    mergeParameters(existing, newParam) {
        const merged = {
            ...existing,
            ...newParam,
            constraints: this.mergeConstraints(existing.constraints, newParam.constraints),
            description: newParam.description || existing.description,
            defaultValue: newParam.defaultValue !== undefined ? newParam.defaultValue : existing.defaultValue,
            hierarchy: [...new Set([...existing.hierarchy, ...newParam.hierarchy])],
            structureGroups: [...new Set([...(existing.structureGroups || []), ...(newParam.structureGroups || [])])],
            navigationPaths: [...new Set([...(existing.navigationPaths || []), ...(newParam.navigationPaths || [])])]
        };
        // Update source to reflect merge
        merged.source = `${existing.source} + ${newParam.source}`;
        return merged;
    }
    /**
     * Merge constraint arrays
     */
    mergeConstraints(existing, newConstraints) {
        if (!existing && !newConstraints)
            return {};
        if (!existing)
            return newConstraints || {};
        if (!newConstraints)
            return existing;
        if (Array.isArray(existing) && Array.isArray(newConstraints)) {
            // Merge constraint arrays
            const merged = [...existing];
            for (const newConstraint of newConstraints) {
                const existingIndex = merged.findIndex(c => c.type === newConstraint.type);
                if (existingIndex >= 0) {
                    merged[existingIndex] = { ...merged[existingIndex], ...newConstraint };
                }
                else {
                    merged.push(newConstraint);
                }
            }
            return merged;
        }
        return { ...existing, ...newConstraints };
    }
    /**
     * Build parameter hierarchy from spreadsheet parameter
     */
    buildParameterHierarchy(param) {
        const hierarchy = [param.moClass];
        if (param.category && param.category !== 'default') {
            hierarchy.push(param.category);
        }
        if (param.subCategory) {
            hierarchy.push(param.subCategory);
        }
        if (param.feature) {
            hierarchy.push(param.feature);
        }
        return hierarchy;
    }
    /**
     * Parse constraints string into ConstraintSpec array
     */
    parseConstraints(constraintsStr) {
        if (!constraintsStr)
            return [];
        const constraints = [];
        try {
            // Parse common constraint patterns
            if (constraintsStr.includes('range') || constraintsStr.includes('min') || constraintsStr.includes('max')) {
                const rangeMatch = constraintsStr.match(/range\s*\[?\s*(\d+)\s*,\s*(\d+)\s*\]?/);
                if (rangeMatch) {
                    constraints.push({
                        type: 'range',
                        value: {
                            min: parseInt(rangeMatch[1]),
                            max: parseInt(rangeMatch[2])
                        },
                        severity: 'error'
                    });
                }
            }
            if (constraintsStr.includes('enum') || constraintsStr.includes('values')) {
                const enumMatch = constraintsStr.match(/enum\s*\[?\s*([^\]]+)\s*\]?/);
                if (enumMatch) {
                    const values = enumMatch[1].split(',').map(v => v.trim().replace(/['"]/g, ''));
                    constraints.push({
                        type: 'enum',
                        value: values,
                        severity: 'error'
                    });
                }
            }
            if (constraintsStr.includes('pattern') || constraintsStr.includes('regex')) {
                const patternMatch = constraintsStr.match(/pattern\s*[=:]\s*([^\s,;]+)/);
                if (patternMatch) {
                    constraints.push({
                        type: 'pattern',
                        value: patternMatch[1].replace(/['"]/g, ''),
                        severity: 'error'
                    });
                }
            }
        }
        catch (error) {
            console.warn(`Failed to parse constraints: ${constraintsStr}`);
        }
        return constraints;
    }
    /**
     * Map parameter type to TypeScript type
     */
    mapParameterTypeToType(paramType) {
        const typeMap = {
            'int': 'number',
            'integer': 'number',
            'long': 'number',
            'float': 'number',
            'double': 'number',
            'decimal': 'number',
            'string': 'string',
            'text': 'string',
            'boolean': 'boolean',
            'bool': 'boolean',
            'date': 'Date',
            'datetime': 'Date',
            'timestamp': 'Date',
            'enum': 'string',
            'list': 'string[]',
            'array': 'any[]',
            'object': 'object'
        };
        const normalizedType = paramType.toLowerCase();
        return typeMap[normalizedType] || 'string';
    }
    /**
     * Parse value from string
     */
    parseValue(value) {
        if (value === undefined || value === null || value === '') {
            return undefined;
        }
        const str = String(value).trim();
        // Handle boolean values
        if (str.toLowerCase() === 'true')
            return true;
        if (str.toLowerCase() === 'false')
            return false;
        // Handle numeric values
        const numValue = Number(str);
        if (!isNaN(numValue) && isFinite(numValue)) {
            return numValue;
        }
        // Handle quoted strings
        if ((str.startsWith('"') && str.endsWith('"')) ||
            (str.startsWith("'") && str.endsWith("'"))) {
            return str.slice(1, -1);
        }
        return str;
    }
    /**
     * Clean and normalize string values
     */
    cleanString(value) {
        if (value === undefined || value === null) {
            return '';
        }
        return String(value).trim().replace(/\s+/g, ' ');
    }
    /**
     * Generate processing statistics
     */
    generateProcessingStats(parameterCount, relationshipCount) {
        const endTime = Date.now();
        const processingTime = (endTime - this.startTime) / 1000;
        const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
        return {
            xmlProcessingTime: 0,
            hierarchyProcessingTime: processingTime,
            validationTime: 0,
            totalParameters: parameterCount,
            totalMOClasses: 0,
            totalRelationships: relationshipCount,
            memoryUsage,
            errorCount: 0,
            warningCount: 0
        };
    }
    /**
     * Validate processed parameters
     */
    async validateProcessedParameters(parameters) {
        const validParameters = [];
        const validationErrors = [];
        for (const parameter of parameters) {
            const errors = this.validateParameter(parameter);
            if (errors.length === 0) {
                validParameters.push(parameter);
            }
            else {
                validationErrors.push(`Parameter ${parameter.id}: ${errors.join(', ')}`);
            }
        }
        console.log(`Parameter validation complete: ${validParameters.length} valid, ${validationErrors.length} errors`);
        return { validParameters, validationErrors };
    }
    /**
     * Validate individual parameter
     */
    validateParameter(parameter) {
        const errors = [];
        if (!parameter.id)
            errors.push('Missing ID');
        if (!parameter.name)
            errors.push('Missing name');
        if (!parameter.type)
            errors.push('Missing type');
        if (!parameter.vsDataType)
            errors.push('Missing vsDataType');
        // Validate MO class format
        if (parameter.id && !parameter.id.includes('.')) {
            errors.push('Invalid parameter ID format (expected MOClass.parameterName)');
        }
        // Validate constraints
        if (parameter.constraints && Array.isArray(parameter.constraints)) {
            for (const constraint of parameter.constraints) {
                if (!constraint.type)
                    errors.push('Constraint missing type');
            }
        }
        return errors;
    }
}
exports.CSVParameterProcessor = CSVParameterProcessor;
//# sourceMappingURL=csv-processor.js.map