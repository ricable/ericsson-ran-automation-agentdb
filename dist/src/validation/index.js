"use strict";
/**
 * Complex Validation Rules Engine - Phase 5 Implementation
 * Main integration and public API for the validation system
 *
 * Comprehensive validation system with:
 * - CSV parameter specification processing (~19,000 parameters)
 * - Cross-parameter validation with conditional logic
 * - Real-time validation performance optimization (<300ms)
 * - Integration with cognitive consciousness system
 * - AgentDB memory pattern integration
 * - ReservedBy relationship constraint validation
 * - Pydantic schema generation
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
exports.default = exports.ValidationConstants = exports.ValidationPerformanceMonitor = exports.ValidationUtils = exports.ValidationFactory = exports.ValidationSchemaGenerator = exports.ConditionalValidator = exports.ConstraintProcessor = exports.ValidationEngine = void 0;
var validation_engine_1 = require("./validation-engine");
Object.defineProperty(exports, "ValidationEngine", { enumerable: true, get: function () { return validation_engine_1.ValidationEngine; } });
var constraint_processor_1 = require("./constraint-processor");
Object.defineProperty(exports, "ConstraintProcessor", { enumerable: true, get: function () { return constraint_processor_1.ConstraintProcessor; } });
var conditional_validator_1 = require("./conditional-validator");
Object.defineProperty(exports, "ConditionalValidator", { enumerable: true, get: function () { return conditional_validator_1.ConditionalValidator; } });
var schema_generator_1 = require("./schema-generator");
Object.defineProperty(exports, "ValidationSchemaGenerator", { enumerable: true, get: function () { return schema_generator_1.ValidationSchemaGenerator; } });
// Export all types
__exportStar(require("../types/validation-types"), exports);
// Create and export the main validation factory
const validation_engine_2 = require("./validation-engine");
/**
 * Validation Factory - Creates configured validation instances
 */
class ValidationFactory {
    /**
     * Create a complete validation engine with all components
     */
    static async createValidationEngine(config) {
        const defaultConfig = {
            maxValidationTime: 300,
            cacheEnabled: true,
            cacheTTL: 300000,
            learningEnabled: true,
            consciousnessIntegration: true,
            strictMode: false,
            parallelProcessing: true,
            batchSize: 100,
            maxValidationDepth: 10,
            pydanticIntegration: false,
            agentDBIntegration: false
        };
        const finalConfig = { ...defaultConfig, ...config };
        const validationEngine = new validation_engine_2.ValidationEngine(finalConfig);
        await validationEngine.initialize();
        return validationEngine;
    }
    /**
     * Create validation engine with cognitive consciousness integration
     */
    static async createCognitiveValidationEngine(cognitiveCore, config) {
        const cognitiveConfig = {
            ...config,
            consciousnessIntegration: true,
            cognitiveCore,
            learningEnabled: true,
            cacheEnabled: true
        };
        return this.createValidationEngine(cognitiveConfig);
    }
    /**
     * Create validation engine for production use
     */
    static async createProductionValidationEngine(config) {
        const productionConfig = {
            maxValidationTime: 250,
            cacheEnabled: true,
            cacheTTL: 600000,
            learningEnabled: true,
            consciousnessIntegration: false,
            strictMode: true,
            parallelProcessing: true,
            batchSize: 200,
            maxValidationDepth: 8,
            pydanticIntegration: true,
            agentDBIntegration: true,
            ...config
        };
        return this.createValidationEngine(productionConfig);
    }
    /**
     * Create validation engine for development/testing
     */
    static async createDevelopmentValidationEngine(config) {
        const developmentConfig = {
            maxValidationTime: 500,
            cacheEnabled: true,
            cacheTTL: 60000,
            learningEnabled: true,
            consciousnessIntegration: true,
            strictMode: false,
            parallelProcessing: true,
            batchSize: 50,
            maxValidationDepth: 15,
            pydanticIntegration: false,
            agentDBIntegration: false,
            ...config
        };
        return this.createValidationEngine(developmentConfig);
    }
}
exports.ValidationFactory = ValidationFactory;
/**
 * Validation utilities and helpers
 */
class ValidationUtils {
    /**
     * Validate configuration with minimal setup
     */
    static async validateConfiguration(configuration, options) {
        const validationEngine = await ValidationFactory.createValidationEngine({
            strictMode: options?.strictMode || false,
            cacheEnabled: options?.enableCaching !== false
        });
        const result = await validationEngine.validateConfiguration(configuration, {
            validationId: `quick_${Date.now()}`,
            timestamp: Date.now(),
            configuration,
            validationLevel: options?.level || 'standard'
        });
        await validationEngine.shutdown();
        return result;
    }
    /**
     * Quick parameter validation
     */
    static async validateParameter(parameterName, value, constraints) {
        try {
            // Simple validation logic for basic use cases
            if (!constraints || constraints.length === 0) {
                return true;
            }
            for (const constraint of constraints) {
                if (!this.validateSingleConstraint(constraint, value)) {
                    return false;
                }
            }
            return true;
        }
        catch (error) {
            console.warn(`Parameter validation failed for ${parameterName}:`, error);
            return false;
        }
    }
    /**
     * Validate single constraint
     */
    static validateSingleConstraint(constraint, value) {
        switch (constraint.type) {
            case 'required':
                return value !== undefined && value !== null && value !== '';
            case 'range':
                if (typeof value === 'number') {
                    const range = constraint.value;
                    return (range.min === undefined || value >= range.min) &&
                        (range.max === undefined || value <= range.max);
                }
                return false;
            case 'enum':
                return constraint.value.includes(String(value));
            case 'pattern':
                if (typeof value === 'string') {
                    const regex = new RegExp(constraint.value);
                    return regex.test(value);
                }
                return false;
            default:
                return true;
        }
    }
    /**
     * Extract validation errors by category
     */
    static extractErrorsByCategory(errors, category) {
        return errors.filter(error => error.category === category);
    }
    /**
     * Extract validation errors by severity
     */
    static extractErrorsBySeverity(errors, severity) {
        return errors.filter(error => error.severity === severity);
    }
    /**
     * Format validation results for display
     */
    static formatValidationResults(result) {
        let output = `Validation Results (ID: ${result.validationId})\n`;
        output += `Status: ${result.valid ? '✅ VALID' : '❌ INVALID'}\n`;
        output += `Execution Time: ${result.executionTime}ms\n`;
        output += `Parameters Validated: ${result.parametersValidated}\n`;
        output += `Cache Hit Rate: ${result.cacheHitRate.toFixed(1)}%\n`;
        if (result.errors.length > 0) {
            output += `\nErrors (${result.errors.length}):\n`;
            result.errors.forEach((error, index) => {
                output += `  ${index + 1}. [${error.code}] ${error.message}\n`;
                output += `     Parameter: ${error.parameter} | Category: ${error.category}\n`;
            });
        }
        if (result.warnings.length > 0) {
            output += `\nWarnings (${result.warnings.length}):\n`;
            result.warnings.forEach((warning, index) => {
                output += `  ${index + 1}. [${warning.code}] ${warning.message}\n`;
                output += `     Parameter: ${warning.parameter} | Category: ${warning.category}\n`;
            });
        }
        if (result.cognitiveInsights) {
            output += `\nCognitive Insights: ${result.cognitiveInsights.insights?.length || 0}\n`;
        }
        return output;
    }
    /**
     * Generate validation summary statistics
     */
    static generateValidationSummary(results) {
        if (results.length === 0) {
            return {
                totalValidations: 0,
                successRate: 0,
                averageExecutionTime: 0,
                errorCategories: {},
                mostCommonErrors: []
            };
        }
        const successful = results.filter(r => r.valid).length;
        const totalExecutionTime = results.reduce((sum, r) => sum + r.executionTime, 0);
        const allErrors = results.flatMap(r => r.errors);
        // Count errors by category
        const errorCategories = {};
        allErrors.forEach(error => {
            errorCategories[error.category] = (errorCategories[error.category] || 0) + 1;
        });
        // Count most common errors
        const errorCounts = {};
        allErrors.forEach(error => {
            const key = `${error.code}:${error.parameter}`;
            errorCounts[key] = (errorCounts[key] || 0) + 1;
        });
        const mostCommonErrors = Object.entries(errorCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([error, count]) => ({ error, count }));
        return {
            totalValidations: results.length,
            successRate: (successful / results.length) * 100,
            averageExecutionTime: totalExecutionTime / results.length,
            errorCategories,
            mostCommonErrors,
            totalErrors: allErrors.length,
            totalWarnings: results.reduce((sum, r) => sum + r.warnings.length, 0)
        };
    }
}
exports.ValidationUtils = ValidationUtils;
/**
 * Performance monitoring for validation system
 */
class ValidationPerformanceMonitor {
    constructor() {
        this.metrics = new Map();
        this.startTimes = new Map();
    }
    static getInstance() {
        if (!ValidationPerformanceMonitor.instance) {
            ValidationPerformanceMonitor.instance = new ValidationPerformanceMonitor();
        }
        return ValidationPerformanceMonitor.instance;
    }
    /**
     * Start timing a validation operation
     */
    startTiming(operationId) {
        this.startTimes.set(operationId, Date.now());
    }
    /**
     * End timing and record metrics
     */
    endTiming(operationId, additionalMetrics) {
        const startTime = this.startTimes.get(operationId);
        if (!startTime) {
            console.warn(`No start time found for operation: ${operationId}`);
            return;
        }
        const executionTime = Date.now() - startTime;
        const metrics = {
            executionTime,
            timestamp: Date.now(),
            ...additionalMetrics
        };
        if (!this.metrics.has(operationId)) {
            this.metrics.set(operationId, []);
        }
        this.metrics.get(operationId).push(metrics);
        this.startTimes.delete(operationId);
        // Keep only last 100 metrics per operation
        const operationMetrics = this.metrics.get(operationId);
        if (operationMetrics.length > 100) {
            this.metrics.set(operationId, operationMetrics.slice(-100));
        }
    }
    /**
     * Get performance metrics for an operation
     */
    getMetrics(operationId) {
        const operationMetrics = this.metrics.get(operationId) || [];
        if (operationMetrics.length === 0) {
            return null;
        }
        const executionTimes = operationMetrics.map(m => m.executionTime);
        const averageTime = executionTimes.reduce((sum, time) => sum + time, 0) / executionTimes.length;
        const minTime = Math.min(...executionTimes);
        const maxTime = Math.max(...executionTimes);
        return {
            operationId,
            totalOperations: operationMetrics.length,
            averageExecutionTime: averageTime,
            minExecutionTime: minTime,
            maxExecutionTime: maxTime,
            lastExecution: operationMetrics[operationMetrics.length - 1]?.timestamp,
            metrics: operationMetrics
        };
    }
    /**
     * Get all performance metrics
     */
    getAllMetrics() {
        const allMetrics = {};
        for (const [operationId] of this.metrics) {
            allMetrics[operationId] = this.getMetrics(operationId);
        }
        return allMetrics;
    }
    /**
     * Clear metrics for an operation
     */
    clearMetrics(operationId) {
        if (operationId) {
            this.metrics.delete(operationId);
            this.startTimes.delete(operationId);
        }
        else {
            this.metrics.clear();
            this.startTimes.clear();
        }
    }
}
exports.ValidationPerformanceMonitor = ValidationPerformanceMonitor;
/**
 * Validation constants and defaults
 */
exports.ValidationConstants = {
    // Performance targets
    MAX_VALIDATION_TIME: 300,
    TARGET_CACHE_HIT_RATE: 80,
    TARGET_VALIDATION_COVERAGE: 99.9,
    // Default configuration
    DEFAULT_BATCH_SIZE: 100,
    DEFAULT_CACHE_TTL: 300000,
    DEFAULT_MAX_VALIDATION_DEPTH: 10,
    // Error codes
    ERROR_CODES: {
        UNKNOWN_PARAMETER: 'UNKNOWN_PARAMETER',
        CONSTRAINT_VIOLATION: 'CONSTRAINT_VIOLATION',
        CROSS_PARAMETER_VIOLATION: 'CROSS_PARAMETER_VIOLATION',
        CONDITIONAL_VALIDATION_ERROR: 'CONDITIONAL_VALIDATION_ERROR',
        SCHEMA_VALIDATION_ERROR: 'SCHEMA_VALIDATION_ERROR',
        COGNITIVE_VALIDATION_ERROR: 'COGNITIVE_VALIDATION_ERROR'
    },
    // Validation categories
    CATEGORIES: {
        PARAMETER: 'parameter',
        CONSTRAINT: 'constraint',
        CROSS_PARAMETER: 'cross_parameter',
        MO_CLASS: 'mo_class',
        RESERVED_BY: 'reserved_by',
        CONDITIONAL: 'conditional',
        SCHEMA: 'schema',
        TEMPORAL: 'temporal',
        COGNITIVE: 'cognitive',
        SYSTEM: 'system'
    }
};
// Re-export for convenience
var validation_engine_3 = require("./validation-engine");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return validation_engine_3.ValidationEngine; } });
//# sourceMappingURL=index.js.map