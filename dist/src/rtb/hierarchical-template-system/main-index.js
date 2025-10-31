"use strict";
/**
 * Hierarchical Template System - Phase 2 Architecture
 *
 * Complete implementation of priority-based template inheritance engine
 * for RTB configuration system with comprehensive variant generation,
 * conflict resolution, and validation capabilities.
 *
 * Main Features:
 * - Priority-based template inheritance (0-80 priority levels)
 * - Specialized variant generation (urban, mobility, sleep mode)
 * - Frequency relation management (4G4G, 4G5G, 5G5G, 5G4G)
 * - Intelligent conflict resolution with multiple strategies
 * - Comprehensive validation against XML constraints
 * - Performance optimization and caching
 * - Event-driven processing with metrics
 *
 * Usage Example:
 * ```typescript
 * import { PriorityTemplateEngine, TemplatePriority } from './hierarchical-template-system';
 *
 * // Initialize the engine
 * const engine = new PriorityTemplateEngine({
 *   cachingEnabled: true,
 *   defaultConflictStrategy: ConflictResolutionStrategy.HIGHEST_PRIORITY_WINS,
 *   performanceMonitoring: true
 * });
 *
 * // Register templates
 * await engine.registerTemplate(baseTemplate);
 * await engine.registerTemplate(urbanVariant);
 *
 * // Resolve inheritance chain
 * const chain = await engine.resolveInheritance('urban_variant');
 *
 * // Merge templates
 * const merged = await engine.mergeTemplates(['base', 'urban', 'mobility']);
 * ```
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
exports.SYSTEM_CAPABILITIES = exports.HIERARCHICAL_TEMPLATE_SYSTEM_VERSION = exports.createTemplateEngine = exports.FREQUENCY_BANDS = exports.TEMPLATE_VARIANTS = exports.TEMPLATE_PRIORITIES = exports.DEFAULT_ENGINE_CONFIG = exports.TemplateConflictError = exports.TemplateValidationError = exports.TemplateInheritanceError = exports.TemplateSystemError = exports.PriorityTemplateEngine = void 0;
// Core Engine
var priority_template_engine_1 = require("./priority-template-engine");
Object.defineProperty(exports, "PriorityTemplateEngine", { enumerable: true, get: function () { return priority_template_engine_1.PriorityTemplateEngine; } });
// All Components
__exportStar(require("./components"), exports);
// Main Interfaces and Types
__exportStar(require("./interfaces"), exports);
// Re-export for convenience
var interfaces_1 = require("./interfaces");
// Error Types
Object.defineProperty(exports, "TemplateSystemError", { enumerable: true, get: function () { return interfaces_1.TemplateSystemError; } });
Object.defineProperty(exports, "TemplateInheritanceError", { enumerable: true, get: function () { return interfaces_1.TemplateInheritanceError; } });
Object.defineProperty(exports, "TemplateValidationError", { enumerable: true, get: function () { return interfaces_1.TemplateValidationError; } });
Object.defineProperty(exports, "TemplateConflictError", { enumerable: true, get: function () { return interfaces_1.TemplateConflictError; } });
// Default configuration for common use cases
exports.DEFAULT_ENGINE_CONFIG = {
    cachingEnabled: true,
    maxCacheSize: 1000,
    defaultConflictStrategy: 'highest_priority_wins',
    parallelProcessing: true,
    maxConcurrentOperations: 10,
    validationStrictness: 'strict',
    performanceMonitoring: true,
    detailedLogging: false
};
// Priority level constants for easy reference
exports.TEMPLATE_PRIORITIES = {
    AGENTDB: 0,
    BASE: 9,
    URBAN: 20,
    MOBILITY: 30,
    SLEEP: 40,
    FREQUENCY_4G4G: 50,
    FREQUENCY_4G5G: 60,
    FREQUENCY_5G5G: 70,
    FREQUENCY_5G4G: 80
};
// Template variant type constants
exports.TEMPLATE_VARIANTS = {
    BASE: 'base',
    URBAN: 'urban',
    UAL_HIGH_CAPACITY: 'ual_high_capacity',
    HIGH_MOBILITY: 'high_mobility',
    SLEEP_MODE: 'sleep_mode',
    COASTAL: 'coastal',
    RURAL: 'rural',
    DENSE_URBAN: 'dense_urban',
    SUBURBAN: 'suburban'
};
// Frequency band constants
exports.FREQUENCY_BANDS = {
    LTE_800: 'lte_800',
    LTE_1800: 'lte_1800',
    LTE_2100: 'lte_2100',
    LTE_2600: 'lte_2600',
    NR_700: 'nr_700',
    NR_3500: 'nr_3500',
    NR_26000: 'nr_26000',
    NR_28000: 'nr_28000'
};
// Utility function to create a template engine with sensible defaults
function createTemplateEngine(config) {
    const finalConfig = { ...exports.DEFAULT_ENGINE_CONFIG, ...config };
    return new PriorityTemplateEngine(finalConfig);
}
exports.createTemplateEngine = createTemplateEngine;
// Version information
exports.HIERARCHICAL_TEMPLATE_SYSTEM_VERSION = '2.0.0';
// System capabilities
exports.SYSTEM_CAPABILITIES = {
    maxTemplates: 10000,
    maxInheritanceDepth: 10,
    maxParametersPerTemplate: 5000,
    maxCustomFunctions: 100,
    supportedConflictStrategies: [
        'highest_priority_wins',
        'lowest_priority_wins',
        'merge_with_warning',
        'custom_function',
        'fail_on_conflict',
        'conflict_logging'
    ],
    supportedVariantTypes: Object.values(exports.TEMPLATE_VARIANTS),
    supportedFrequencyBands: Object.values(exports.FREQUENCY_BANDS)
};
//# sourceMappingURL=main-index.js.map