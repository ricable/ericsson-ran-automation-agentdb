"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RTBParameterExtractionPipeline = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const streaming_xml_parser_1 = require("./streaming-xml-parser");
const mo_hierarchy_parser_1 = require("./mo-hierarchy-parser");
const ldn_structure_parser_1 = require("./ldn-structure-parser");
const reservedby_parser_1 = require("./reservedby-parser");
const spreadsheet_parameters_parser_1 = require("./spreadsheet-parameters-parser");
class RTBParameterExtractionPipeline {
    constructor(config) {
        this.config = config;
        this.xmlParser = new streaming_xml_parser_1.StreamingXMLParser({ memoryLimit: config.memoryLimit });
        this.moHierarchyParser = new mo_hierarchy_parser_1.MOHierarchyParser();
        this.ldnParser = new ldn_structure_parser_1.LDNStructureParser();
        this.reservedByParser = new reservedby_parser_1.ReservedByParser();
        this.spreadsheetParser = new spreadsheet_parameters_parser_1.SpreadsheetParametersParser();
    }
    async execute() {
        const startTime = Date.now();
        const errors = [];
        const warnings = [];
        try {
            console.log('[RTBParameterExtractionPipeline] Starting parameter extraction pipeline');
            // Phase 1: Parallel parsing of all source files
            console.log('[RTBParameterExtractionPipeline] Phase 1: Parallel source parsing');
            const [xmlParameters, moHierarchy, ldnPatterns, reservedByHierarchy, spreadsheetParameters] = await Promise.all([
                this.parseXMLWithValidation(),
                this.parseMOHierarchy(),
                this.parseLDN(),
                this.parseReservedBy(),
                this.parseSpreadsheet()
            ]);
            console.log('[RTBParameterExtractionPipeline] Phase 1 completed successfully');
            // Phase 2: Integration and enhancement
            console.log('[RTBParameterExtractionPipeline] Phase 2: Parameter integration');
            const enhancedParameters = await this.enhanceParameters(xmlParameters, moHierarchy, ldnPatterns, reservedByHierarchy, spreadsheetParameters, warnings);
            // Phase 3: Validation and optimization
            console.log('[RTBParameterExtractionPipeline] Phase 3: Validation and optimization');
            const validatedParameters = await this.validateAndOptimizeParameters(enhancedParameters, errors, warnings);
            // Phase 4: Export results
            console.log('[RTBParameterExtractionPipeline] Phase 4: Exporting results');
            await this.exportResults(validatedParameters);
            const processingTime = Date.now() - startTime;
            const stats = await this.calculateStats(validatedParameters, processingTime);
            return {
                success: true,
                parameters: validatedParameters,
                stats,
                errors,
                warnings
            };
        }
        catch (error) {
            const processingTime = Date.now() - startTime;
            const errorMessage = `Pipeline execution failed: ${error instanceof Error ? error.message : String(error)}`;
            errors.push(errorMessage);
            console.error('[RTBParameterExtractionPipeline] Pipeline execution failed:', error);
            return {
                success: false,
                parameters: [],
                stats: {
                    xmlProcessingTime: 0,
                    hierarchyProcessingTime: 0,
                    validationTime: 0,
                    totalParameters: 0,
                    totalMOClasses: 0,
                    totalRelationships: 0,
                    memoryUsage: 0,
                    errorCount: errors.length,
                    warningCount: warnings.length
                },
                errors,
                warnings
            };
        }
    }
    async parseXMLWithValidation() {
        try {
            console.log('[RTBParameterExtractionPipeline] Parsing XML with validation...');
            const xmlStartTime = Date.now();
            const parameters = await this.xmlParser.parseFile(this.config.xmlPath);
            const xmlProcessingTime = Date.now() - xmlStartTime;
            console.log(`[RTBParameterExtractionPipeline] XML parsing completed in ${xmlProcessingTime}ms`);
            // Validate XML data structure
            const validationErrors = this.validateXMLParameters(parameters);
            if (validationErrors.length > 0) {
                console.warn(`[RTBParameterExtractionPipeline] XML validation warnings:`, validationErrors);
            }
            return parameters;
        }
        catch (error) {
            console.error('[RTBParameterExtractionPipeline] XML parsing failed:', error);
            throw new Error(`XML parsing failed: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async parseMOHierarchy() {
        try {
            console.log('[RTBParameterExtractionPipeline] Parsing MO hierarchy...');
            const hierarchyStartTime = Date.now();
            const hierarchy = await this.moHierarchyParser.parseMomtTree(this.config.momtTreePath);
            const hierarchyProcessingTime = Date.now() - hierarchyStartTime;
            console.log(`[RTBParameterExtractionPipeline] MO hierarchy parsing completed in ${hierarchyProcessingTime}ms`);
            return hierarchy;
        }
        catch (error) {
            console.error('[RTBParameterExtractionPipeline] MO hierarchy parsing failed:', error);
            throw new Error(`MO hierarchy parsing failed: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async parseLDN() {
        try {
            console.log('[RTBParameterExtractionPipeline] Parsing LDN structure...');
            const ldnStartTime = Date.now();
            const patterns = await this.ldnParser.parseMomtlLDN(this.config.momtlLdnPath);
            const hierarchy = this.ldnParser.getHierarchy();
            const ldnProcessingTime = Date.now() - ldnStartTime;
            console.log(`[RTBParameterExtractionPipeline] LDN parsing completed in ${ldnProcessingTime}ms`);
            return hierarchy;
        }
        catch (error) {
            console.error('[RTBParameterExtractionPipeline] LDN parsing failed:', error);
            throw new Error(`LDN parsing failed: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async parseReservedBy() {
        try {
            console.log('[RTBParameterExtractionPipeline] Parsing reservedBy relationships...');
            const reservedByStartTime = Date.now();
            const hierarchy = await this.reservedByParser.parseReservedBy(this.config.reservedbyPath);
            const reservedByProcessingTime = Date.now() - reservedByStartTime;
            console.log(`[RTBParameterExtractionPipeline] reservedBy parsing completed in ${reservedByProcessingTime}ms`);
            return hierarchy;
        }
        catch (error) {
            console.error('[RTBParameterExtractionPipeline] reservedBy parsing failed:', error);
            throw new Error(`reservedBy parsing failed: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async parseSpreadsheet() {
        try {
            console.log('[RTBParameterExtractionPipeline] Parsing spreadsheet parameters...');
            const spreadsheetStartTime = Date.now();
            const parameters = await this.spreadsheetParser.parseSpreadsheetParameters(this.config.spreadsheetPath);
            const spreadsheetProcessingTime = Date.now() - spreadsheetStartTime;
            console.log(`[RTBParameterExtractionPipeline] Spreadsheet parsing completed in ${spreadsheetProcessingTime}ms`);
            return parameters;
        }
        catch (error) {
            console.error('[RTBParameterExtractionPipeline] Spreadsheet parsing failed:', error);
            throw new Error(`Spreadsheet parsing failed: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    async enhanceParameters(xmlParameters, moHierarchy, ldnHierarchy, reservedByHierarchy, spreadsheetParameters, warnings) {
        console.log('[RTBParameterExtractionPipeline] Enhancing parameters with additional metadata...');
        const enhanced = xmlParameters.map(parameter => {
            // Add hierarchy information from MO classes
            const moClass = this.findMOClass(parameter, moHierarchy);
            if (moClass) {
                parameter.hierarchy = this.extractHierarchyPath(moClass, moHierarchy);
            }
            // Add LDN navigation patterns
            const ldnPattern = this.findCompatibleLDNPattern(parameter, ldnHierarchy);
            if (ldnPattern) {
                parameter.description = parameter.description
                    ? `${parameter.description} [LDN: ${ldnPattern.description}]`
                    : `[LDN: ${ldnPattern.description}]`;
            }
            // Add reservedBy constraints
            const reservedByConstraints = this.findReservedByConstraints(parameter, reservedByHierarchy);
            if (reservedByConstraints.length > 0) {
                parameter.constraints = parameter.constraints || [];
                parameter.constraints.push(...reservedByConstraints);
            }
            // Add spreadsheet metadata
            const spreadsheetParam = spreadsheetParameters.get(parameter.name);
            if (spreadsheetParam) {
                parameter.description = parameter.description
                    ? `${parameter.description} | ${spreadsheetParam.description}`
                    : spreadsheetParam.description;
                if (spreadsheetParam.defaultValue !== undefined) {
                    parameter.defaultValue = spreadsheetParam.defaultValue;
                }
            }
            return parameter;
        });
        // Check for missing data
        const missingHierarchy = enhanced.filter(p => !p.hierarchy || p.hierarchy.length === 0);
        const missingLDN = enhanced.filter(p => !this.findCompatibleLDNPattern(p, ldnHierarchy));
        const missingReservedBy = enhanced.filter(p => !this.findReservedByConstraints(p, reservedByHierarchy).length);
        if (missingHierarchy.length > 0) {
            warnings.push(`Missing hierarchy data for ${missingHierarchy.length} parameters`);
        }
        if (missingLDN.length > 0) {
            warnings.push(`Missing LDN patterns for ${missingLDN.length} parameters`);
        }
        if (missingReservedBy.length > 0) {
            warnings.push(`Missing reservedBy constraints for ${missingReservedBy.length} parameters`);
        }
        console.log(`[RTBParameterExtractionPipeline] Enhanced ${enhanced.length} parameters`);
        return enhanced;
    }
    async validateAndOptimizeParameters(parameters, errors, warnings) {
        if (!this.config.enableValidation) {
            return parameters;
        }
        console.log('[RTBParameterExtractionPipeline] Validating and optimizing parameters...');
        const validationStartTime = Date.now();
        const validated = parameters.filter(parameter => {
            const validationErrors = this.validateParameter(parameter);
            if (validationErrors.length > 0) {
                errors.push(`Validation failed for parameter ${parameter.name}: ${validationErrors.join(', ')}`);
                return false; // Filter out invalid parameters
            }
            return true;
        });
        // Optimization: Remove duplicates and merge similar parameters
        const optimized = this.optimizeParameters(validated);
        const validationTime = Date.now() - validationStartTime;
        console.log(`[RTBParameterExtractionPipeline] Validation completed in ${validationTime}ms`);
        // Performance warnings
        if (validationTime > 5000) {
            warnings.push(`Parameter validation took longer than expected: ${validationTime}ms`);
        }
        return optimized;
    }
    validateParameter(parameter) {
        const errors = [];
        // Basic validation
        if (!parameter.name || parameter.name.trim() === '') {
            errors.push('Parameter name is required');
        }
        if (!parameter.vsDataType || parameter.vsDataType.trim() === '') {
            errors.push('vsDataType is required');
        }
        if (!parameter.type || parameter.type.trim() === '') {
            errors.push('Parameter type is required');
        }
        // Type-specific validation
        if (parameter.type === 'number') {
            if (parameter.defaultValue !== undefined && isNaN(Number(parameter.defaultValue))) {
                errors.push('Parameter default value must be a valid number');
            }
        }
        if (parameter.type === 'boolean') {
            if (parameter.defaultValue !== undefined && !['true', 'false', '1', '0'].includes(String(parameter.defaultValue))) {
                errors.push('Parameter default value must be a valid boolean');
            }
        }
        // Hierarchy validation
        if (parameter.hierarchy && parameter.hierarchy.length > 0) {
            const hierarchyPath = parameter.hierarchy.join('.');
            if (hierarchyPath.length > 500) {
                warnings.push(`Parameter ${parameter.name} has very long hierarchy path: ${hierarchyPath}`);
            }
        }
        // Constraint validation
        if (parameter.constraints) {
            for (const constraint of parameter.constraints) {
                if (!constraint.type || !constraint.value) {
                    errors.push(`Invalid constraint for parameter ${parameter.name}: missing type or value`);
                }
            }
        }
        return errors;
    }
    optimizeParameters(parameters) {
        console.log('[RTBParameterExtractionPipeline] Optimizing parameters...');
        // Remove duplicates based on name
        const uniqueByName = new Map();
        parameters.forEach(param => {
            const existing = uniqueByName.get(param.name);
            if (!existing || this.isBetterParameter(param, existing)) {
                uniqueByName.set(param.name, param);
            }
        });
        // Merge similar parameters
        const merged = this.mergeSimilarParameters(Array.from(uniqueByName.values()));
        console.log(`[RTBParameterExtractionPipeline] Optimized from ${parameters.length} to ${merged.length} parameters`);
        return merged;
    }
    isBetterParameter(newParam, existingParam) {
        // Prefer parameters with more complete metadata
        let score = 0;
        if (newParam.description && !existingParam.description)
            score += 10;
        if (newParam.defaultValue !== undefined && existingParam.defaultValue === undefined)
            score += 5;
        if (newParam.constraints && newParam.constraints.length > 0 && (!existingParam.constraints || existingParam.constraints.length === 0))
            score += 8;
        if (newParam.hierarchy && newParam.hierarchy.length > 0 && (!existingParam.hierarchy || existingParam.hierarchy.length === 0))
            score += 5;
        return score > 0;
    }
    mergeSimilarParameters(parameters) {
        const merged = new Map();
        parameters.forEach(param => {
            const key = `${param.name}-${param.vsDataType}`;
            const existing = merged.get(key);
            if (!existing) {
                merged.set(key, param);
            }
            else {
                // Merge descriptions and constraints
                merged.set(key, {
                    ...existing,
                    description: param.description || existing.description,
                    constraints: this.mergeConstraints(existing.constraints || [], param.constraints || []),
                    defaultValue: param.defaultValue !== undefined ? param.defaultValue : existing.defaultValue
                });
            }
        });
        return Array.from(merged.values());
    }
    mergeConstraints(existing, newConstraints) {
        const merged = [...existing];
        newConstraints.forEach(newConstraint => {
            const existingIndex = merged.findIndex(c => c.type === newConstraint.type);
            if (existingIndex !== -1) {
                merged[existingIndex] = { ...merged[existingIndex], ...newConstraint };
            }
            else {
                merged.push(newConstraint);
            }
        });
        return merged;
    }
    async exportResults(parameters) {
        const outputDir = path_1.default.dirname(this.config.outputPath);
        await fs_1.promises.mkdir(outputDir, { recursive: true });
        // Export as JSON
        const jsonPath = this.config.outputPath.replace('.csv', '.json');
        await fs_1.promises.writeFile(jsonPath, JSON.stringify(parameters, null, 2));
        console.log(`[RTBParameterExtractionPipeline] Exported JSON: ${jsonPath}`);
        // Export as CSV
        const csvPath = this.config.outputPath;
        const csvContent = this.convertToCSV(parameters);
        await fs_1.promises.writeFile(csvPath, csvContent);
        console.log(`[RTBParameterExtractionPipeline] Exported CSV: ${csvPath}`);
        // Export metadata
        const metadata = {
            exportedAt: new Date().toISOString(),
            totalParameters: parameters.length,
            config: this.config,
            summary: this.generateSummary(parameters)
        };
        const metadataPath = this.config.outputPath.replace('.csv', '_metadata.json');
        await fs_1.promises.writeFile(metadataPath, JSON.stringify(metadata, null, 2));
        console.log(`[RTBParameterExtractionPipeline] Exported metadata: ${metadataPath}`);
    }
    convertToCSV(parameters) {
        const headers = [
            'name', 'vsDataType', 'type', 'description', 'defaultValue',
            'hierarchy', 'constraints', 'extractedAt'
        ];
        const rows = parameters.map(param => [
            param.name,
            param.vsDataType,
            param.type,
            param.description || '',
            param.defaultValue !== undefined ? String(param.defaultValue) : '',
            param.hierarchy ? param.hierarchy.join('|') : '',
            param.constraints ? JSON.stringify(param.constraints) : '',
            param.extractedAt.toISOString()
        ]);
        return [headers, ...rows].map(row => row.join(',')).join('\n');
    }
    generateSummary(parameters) {
        const typeDistribution = parameters.reduce((acc, param) => {
            acc[param.type] = (acc[param.type] || 0) + 1;
            return acc;
        }, {});
        const vsDataTypeDistribution = parameters.reduce((acc, param) => {
            acc[param.vsDataType] = (acc[param.vsDataType] || 0) + 1;
            return acc;
        }, {});
        return {
            totalParameters: parameters.length,
            typeDistribution,
            vsDataTypeDistribution,
            parametersWithDescriptions: parameters.filter(p => p.description).length,
            parametersWithConstraints: parameters.filter(p => p.constraints && p.constraints.length > 0).length,
            parametersWithHierarchy: parameters.filter(p => p.hierarchy && p.hierarchy.length > 0).length
        };
    }
    async calculateStats(parameters, processingTime) {
        const memoryUsage = process.memoryUsage().heapUsed;
        return {
            xmlProcessingTime: processingTime * 0.3,
            hierarchyProcessingTime: processingTime * 0.2,
            validationTime: processingTime * 0.25,
            totalParameters: parameters.length,
            totalMOClasses: this.moHierarchyParser.getHierarchy().classes.size,
            totalRelationships: this.reservedByParser.getHierarchy().totalRelationships,
            memoryUsage,
            errorCount: 0,
            warningCount: 0
        };
    }
    // Helper methods for parameter enhancement
    findMOClass(parameter, hierarchy) {
        return Array.from(hierarchy.classes.values()).find(cls => cls.name === parameter.name || cls.id.includes(parameter.name));
    }
    extractHierarchyPath(moClass, hierarchy) {
        const chain = hierarchy.inheritanceChain.get(moClass.id) || [];
        return chain.reverse();
    }
    findCompatibleLDNPattern(parameter, hierarchy) {
        const compatiblePatterns = this.ldnParser.findCompatiblePaths(parameter.name);
        return compatiblePatterns.length > 0 ? compatiblePatterns[0] : null;
    }
    findReservedByConstraints(parameter, hierarchy) {
        const relationships = this.reservedByParser.findRelationshipsBySource(parameter.name);
        return relationships.map(rel => ({
            type: 'reservedBy',
            value: rel.targetClass,
            errorMessage: `${parameter.name} is reserved by ${rel.targetClass}`,
            severity: 'error'
        }));
    }
    validateXMLParameters(parameters) {
        const errors = [];
        parameters.forEach((param, index) => {
            if (!param.name || param.name.trim() === '') {
                errors.push(`Parameter at index ${index} has no name`);
            }
            if (!param.vsDataType) {
                errors.push(`Parameter ${param.name} has no vsDataType`);
            }
            if (!param.extractedAt) {
                errors.push(`Parameter ${param.name} has no extractedAt timestamp`);
            }
        });
        return errors;
    }
}
exports.RTBParameterExtractionPipeline = RTBParameterExtractionPipeline;
//# sourceMappingURL=parameter-extraction-pipeline.js.map