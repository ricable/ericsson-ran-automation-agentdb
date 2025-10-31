"use strict";
/**
 * Phase 5: Type-Safe Template Export System - Main Index
 *
 * Complete export system with Pydantic schema generation, comprehensive validation,
 * metadata generation, variant generation, and production-ready performance optimization.
 *
 * Features:
 * - <1 second template export times with intelligent caching
 * - 100% schema validation coverage with learned patterns
 * - Cognitive consciousness integration for intelligent optimization
 * - Real-time validation with AgentDB memory patterns
 * - Comprehensive documentation generation (Markdown, HTML, OpenAPI)
 * - Type-safe template variant generation with priority inheritance
 * - Production-ready performance monitoring and metrics
 * - Auto-fix capabilities with 95% confidence thresholds
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PERFORMANCE_TARGETS = exports.FEATURES = exports.BUILD_DATE = exports.VERSION = exports.generateVariants = exports.validateTemplate = exports.batchExport = exports.quickExport = exports.createExportSystem = exports.AgentDBManager = exports.PerformanceMonitor = exports.CacheManager = exports.SchemaGenerator = exports.ValidationEngine = exports.ExportValidator = exports.VariantGenerator = exports.MetadataGenerator = exports.TemplateExporter = void 0;
// Core Export System
var template_exporter_1 = require("./template-exporter");
Object.defineProperty(exports, "TemplateExporter", { enumerable: true, get: function () { return template_exporter_1.TemplateExporter; } });
// Metadata Generation
var metadata_generator_1 = require("./metadata-generator");
Object.defineProperty(exports, "MetadataGenerator", { enumerable: true, get: function () { return metadata_generator_1.MetadataGenerator; } });
// Variant Generation
var variant_generator_1 = require("./variant-generator");
Object.defineProperty(exports, "VariantGenerator", { enumerable: true, get: function () { return variant_generator_1.VariantGenerator; } });
// Validation Framework
var export_validator_1 = require("./export-validator");
Object.defineProperty(exports, "ExportValidator", { enumerable: true, get: function () { return export_validator_1.ExportValidator; } });
// Utility Classes
var validation_engine_1 = require("./utils/validation-engine");
Object.defineProperty(exports, "ValidationEngine", { enumerable: true, get: function () { return validation_engine_1.ValidationEngine; } });
var schema_generator_1 = require("./utils/schema-generator");
Object.defineProperty(exports, "SchemaGenerator", { enumerable: true, get: function () { return schema_generator_1.SchemaGenerator; } });
var cache_manager_1 = require("./utils/cache-manager");
Object.defineProperty(exports, "CacheManager", { enumerable: true, get: function () { return cache_manager_1.CacheManager; } });
var performance_monitor_1 = require("./utils/performance-monitor");
Object.defineProperty(exports, "PerformanceMonitor", { enumerable: true, get: function () { return performance_monitor_1.PerformanceMonitor; } });
var agentdb_manager_1 = require("./utils/agentdb-manager");
Object.defineProperty(exports, "AgentDBManager", { enumerable: true, get: function () { return agentdb_manager_1.AgentDBManager; } });
/**
 * Factory function to create a complete export system with default configuration
 */
function createExportSystem(config) {
    const defaultConfig = {
        defaultExportConfig: {
            outputFormat: 'json',
            includeMetadata: true,
            includeValidation: true,
            includeDocumentation: true,
            outputDirectory: './exports',
            compressionLevel: 'none',
            encryptionEnabled: false,
            batchProcessing: true,
            parallelExecution: true,
            maxConcurrency: 8
        },
        validationConfig: {
            strictMode: false,
            validateConstraints: true,
            validateDependencies: true,
            validateTypes: true,
            validateInheritance: true,
            validatePerformance: true,
            maxProcessingTime: 5000,
            maxMemoryUsage: 512 * 1024 * 1024,
            allowedViolations: [],
            customValidators: []
        },
        cacheConfig: {
            enabled: true,
            maxSize: 1000,
            ttl: 30 * 60 * 1000,
            evictionPolicy: 'lru',
            compressionEnabled: false,
            compressionLevel: 6,
            keyPrefix: 'export_'
        },
        cognitiveConfig: {
            level: 'maximum',
            temporalExpansion: 1000,
            strangeLoopOptimization: true,
            autonomousAdaptation: true
        },
        agentdbConfig: {
            connectionString: 'quic://localhost:8080',
            enableQUICSync: true,
            syncInterval: 5000,
            maxBatchSize: 100,
            compressionEnabled: true,
            encryptionEnabled: false,
            retryAttempts: 3,
            timeout: 10000
        },
        performanceMonitoring: true,
        parallelProcessing: true,
        maxConcurrency: 8
    };
    const finalConfig = { ...defaultConfig, ...config };
    return new TemplateExporter(finalConfig);
}
exports.createExportSystem = createExportSystem;
/**
 * Quick export function for simple use cases
 */
async function quickExport(template, outputPath, format = 'json') {
    const exporter = createExportSystem();
    await exporter.initialize();
    const exportConfig = {
        outputFormat: format,
        outputDirectory: outputPath || './exports',
        includeMetadata: true,
        includeValidation: true,
        includeDocumentation: format === 'pydantic' || format === 'typescript'
    };
    return await exporter.exportTemplate(template, exportConfig);
}
exports.quickExport = quickExport;
/**
 * Batch export function for multiple templates
 */
async function batchExport(templates, outputPath, format = 'json') {
    const exporter = createExportSystem({
        defaultExportConfig: {
            outputFormat: format,
            outputDirectory: outputPath || './exports',
            includeMetadata: true,
            includeValidation: true,
            includeDocumentation: true,
            batchProcessing: true,
            parallelExecution: true,
            maxConcurrency: Math.min(templates.length, 8)
        }
    });
    await exporter.initialize();
    return await exporter.exportTemplates(templates);
}
exports.batchExport = batchExport;
/**
 * Validate template function for standalone validation
 */
async function validateTemplate(template, strictMode = false) {
    const validator = new ExportValidator({
        strictMode,
        enableLearning: true,
        enableAutoFix: true,
        maxAutoFixes: 5,
        validationTimeout: 5000,
        memoryThreshold: 512 * 1024 * 1024,
        enableCognitiveOptimization: true,
        agentdbIntegration: false,
        realTimeValidation: false
    });
    await validator.initialize();
    const result = await validator.validateTemplateExport(template);
    await validator.shutdown();
    return result;
}
exports.validateTemplate = validateTemplate;
/**
 * Generate variants function for template variant generation
 */
async function generateVariants(template, variantTypes) {
    const generator = new VariantGenerator({
        enableCognitiveOptimization: true,
        enableParallelGeneration: true,
        maxConcurrency: 4,
        validationStrictness: 'strict',
        performanceOptimization: true,
        cachingEnabled: true,
        cacheSize: 100,
        includeDocumentation: true,
        generateExamples: true
    });
    await generator.initialize();
    let result;
    if (variantTypes) {
        // Generate specific variants
        const results = [];
        for (const variantType of variantTypes) {
            const variantResult = await generator.generateVariant(template, variantType);
            results.push(variantResult.variant);
        }
        result = {
            originalTemplate: template,
            generatedVariants: results,
            validationResults: [],
            performanceMetrics: [],
            generationTime: 0,
            successRate: results.length / variantTypes.length,
            errors: []
        };
    }
    else {
        // Generate all variants
        result = await generator.generateAllVariants(template);
    }
    await generator.shutdown();
    return result;
}
exports.generateVariants = generateVariants;
// Version information
exports.VERSION = '5.0.0';
exports.BUILD_DATE = new Date().toISOString();
exports.FEATURES = [
    'type-safe-exports',
    'pydantic-schema-generation',
    'comprehensive-validation',
    'cognitive-optimization',
    'agentdb-integration',
    'real-time-validation',
    'auto-fix-capabilities',
    'performance-monitoring',
    'variant-generation',
    'documentation-generation',
    'batch-processing',
    'caching-system',
    'error-recovery'
];
// Performance targets
exports.PERFORMANCE_TARGETS = {
    templateExportTime: 1000,
    validationTime: 500,
    schemaGenerationTime: 200,
    cacheHitRate: 0.8,
    validationCoverage: 1.0,
    memoryUsage: 512 * 1024 * 1024,
    concurrentExports: 8,
    autoFixConfidence: 0.95,
    cognitiveOptimization: 0.9 // >90% effectiveness
};
console.log(`🚀 Phase 5 Type-Safe Template Export System v${exports.VERSION} loaded`);
console.log(`📋 Features: ${exports.FEATURES.join(', ')}`);
console.log(`⚡ Performance targets: <${exports.PERFORMANCE_TARGETS.templateExportTime}ms export time`);
//# sourceMappingURL=index.js.map