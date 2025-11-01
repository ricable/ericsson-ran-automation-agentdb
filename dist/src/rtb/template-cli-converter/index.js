"use strict";
/**
 * Template-to-CLI Converter System
 *
 * Main entry point for the comprehensive template-to-CLI conversion system
 * with cognitive optimization, dependency analysis, and Ericsson RAN expertise.
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
exports.DEVELOPMENT_CONFIG = exports.SAFE_CONFIG = exports.HIGH_PERFORMANCE_CONFIG = exports.DEFAULT_CONFIG = exports.createRanOptimizedConverter = exports.createTemplateToCliConverter = exports.CognitiveOptimizer = exports.EricssonRanExpertise = exports.RollbackManager = exports.DependencyAnalyzer = exports.CommandValidator = exports.BatchCommandGenerator = exports.FdnPathConstructor = exports.TemplateToCliConverter = void 0;
var template_to_cli_converter_1 = require("./template-to-cli-converter");
Object.defineProperty(exports, "TemplateToCliConverter", { enumerable: true, get: function () { return template_to_cli_converter_1.TemplateToCliConverter; } });
var fdn_path_constructor_1 = require("./fdn-path-constructor");
Object.defineProperty(exports, "FdnPathConstructor", { enumerable: true, get: function () { return fdn_path_constructor_1.FdnPathConstructor; } });
var batch_command_generator_1 = require("./batch-command-generator");
Object.defineProperty(exports, "BatchCommandGenerator", { enumerable: true, get: function () { return batch_command_generator_1.BatchCommandGenerator; } });
var command_validator_1 = require("./command-validator");
Object.defineProperty(exports, "CommandValidator", { enumerable: true, get: function () { return command_validator_1.CommandValidator; } });
var dependency_analyzer_1 = require("./dependency-analyzer");
Object.defineProperty(exports, "DependencyAnalyzer", { enumerable: true, get: function () { return dependency_analyzer_1.DependencyAnalyzer; } });
var rollback_manager_1 = require("./rollback-manager");
Object.defineProperty(exports, "RollbackManager", { enumerable: true, get: function () { return rollback_manager_1.RollbackManager; } });
var ericsson_ran_expertise_1 = require("./ericsson-ran-expertise");
Object.defineProperty(exports, "EricssonRanExpertise", { enumerable: true, get: function () { return ericsson_ran_expertise_1.EricssonRanExpertise; } });
var cognitive_optimizer_1 = require("./cognitive-optimizer");
Object.defineProperty(exports, "CognitiveOptimizer", { enumerable: true, get: function () { return cognitive_optimizer_1.CognitiveOptimizer; } });
// Re-export all types for easy access
__exportStar(require("./types"), exports);
/**
 * Factory function to create a configured converter
 */
function createTemplateToCliConverter(config) {
    return new TemplateToCliConverter(config);
}
exports.createTemplateToCliConverter = createTemplateToCliConverter;
/**
 * Factory function to create a converter with Ericsson RAN expertise
 */
function createRanOptimizedConverter(rancConfig, config) {
    const finalConfig = {
        ...config,
        cognitive: {
            enableTemporalReasoning: true,
            enableStrangeLoopOptimization: true,
            consciousnessLevel: 0.9,
            learningMode: 'active',
            ...config?.cognitive
        }
    };
    return new TemplateToCliConverter(finalConfig);
}
exports.createRanOptimizedConverter = createRanOptimizedConverter;
/**
 * Default configuration for production use
 */
exports.DEFAULT_CONFIG = {
    defaultTimeout: 30,
    maxCommandsPerBatch: 50,
    enableCognitiveOptimization: true,
    enableDependencyAnalysis: true,
    validationStrictness: 'normal',
    rollbackStrategy: 'full',
    performanceOptimization: {
        enableParallelExecution: true,
        maxParallelCommands: 8,
        enableBatching: true,
        batchSize: 20
    },
    errorHandling: {
        continueOnError: false,
        maxRetries: 3,
        retryDelay: 1000,
        enableRecovery: true
    },
    cognitive: {
        enableTemporalReasoning: true,
        enableStrangeLoopOptimization: true,
        consciousnessLevel: 0.8,
        learningMode: 'active'
    }
};
/**
 * High-performance configuration for large-scale deployments
 */
exports.HIGH_PERFORMANCE_CONFIG = {
    ...exports.DEFAULT_CONFIG,
    maxCommandsPerBatch: 100,
    performanceOptimization: {
        enableParallelExecution: true,
        maxParallelCommands: 20,
        enableBatching: true,
        batchSize: 50
    },
    cognitive: {
        enableTemporalReasoning: true,
        enableStrangeLoopOptimization: false,
        consciousnessLevel: 0.6,
        learningMode: 'passive'
    }
};
/**
 * Safe configuration for critical operations
 */
exports.SAFE_CONFIG = {
    ...exports.DEFAULT_CONFIG,
    validationStrictness: 'strict',
    rollbackStrategy: 'full',
    performanceOptimization: {
        enableParallelExecution: false,
        maxParallelCommands: 1,
        enableBatching: false,
        batchSize: 1
    },
    errorHandling: {
        continueOnError: false,
        maxRetries: 1,
        retryDelay: 2000,
        enableRecovery: true
    },
    cognitive: {
        enableTemporalReasoning: true,
        enableStrangeLoopOptimization: true,
        consciousnessLevel: 0.9,
        learningMode: 'active'
    }
};
/**
 * Development configuration with verbose output
 */
exports.DEVELOPMENT_CONFIG = {
    ...exports.DEFAULT_CONFIG,
    validationStrictness: 'strict',
    enableCognitiveOptimization: true,
    enableDependencyAnalysis: true,
    cognitive: {
        enableTemporalReasoning: true,
        enableStrangeLoopOptimization: true,
        consciousnessLevel: 1.0,
        learningMode: 'active'
    }
};
//# sourceMappingURL=index.js.map