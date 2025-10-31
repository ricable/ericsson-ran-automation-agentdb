"use strict";
/**
 * RTB Hierarchical Template System - Complete Priority-Based Template Management
 *
 * A comprehensive system for managing RTB (RAN Template Builder) templates with
 * priority-based inheritance, validation, performance optimization, and integration
 * with existing RTB processor components.
 *
 * Features:
 * - Priority-based template inheritance (0-80 priority levels)
 * - Complex inheritance chain resolution with conflict management
 * - Comprehensive template validation and error handling
 * - Performance optimization with caching and batch processing
 * - Integration with MO hierarchy and schema validation
 * - AgentDB learned pattern integration
 * - Custom function evaluation and conditional logic
 * - Template search and filtering capabilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTemplateMerger = exports.IntegratedTemplateSystem = exports.OptimizationStrategy = exports.PerformanceOptimizer = exports.ValidationSeverity = exports.TemplateValidator = exports.OverrideStrategy = exports.PriorityManager = exports.ResolverInheritanceAnalysisResult = exports.InheritanceGraphNode = exports.InheritanceStrategy = exports.InheritanceResolver = exports.TemplateRegistry = exports.InheritanceAnalysisResult = exports.ParameterMergeContext = exports.MergeConflictRule = exports.InheritanceNode = exports.CircularDependency = exports.TemplatePriority = exports.PriorityTemplateEngine = exports.MergeValidator = exports.ResolutionEngine = exports.ConflictDetector = exports.TemplateMerger = void 0;
// Legacy template merger exports (for backward compatibility)
var template_merger_1 = require("./template-merger");
Object.defineProperty(exports, "TemplateMerger", { enumerable: true, get: function () { return template_merger_1.TemplateMerger; } });
var conflict_detector_1 = require("./conflict-detector");
Object.defineProperty(exports, "ConflictDetector", { enumerable: true, get: function () { return conflict_detector_1.ConflictDetector; } });
var resolution_engine_1 = require("./resolution-engine");
Object.defineProperty(exports, "ResolutionEngine", { enumerable: true, get: function () { return resolution_engine_1.ResolutionEngine; } });
var merge_validator_1 = require("./merge-validator");
Object.defineProperty(exports, "MergeValidator", { enumerable: true, get: function () { return merge_validator_1.MergeValidator; } });
// New priority-based hierarchical template system exports
var priority_engine_1 = require("./priority-engine");
Object.defineProperty(exports, "PriorityTemplateEngine", { enumerable: true, get: function () { return priority_engine_1.PriorityTemplateEngine; } });
Object.defineProperty(exports, "TemplatePriority", { enumerable: true, get: function () { return priority_engine_1.TemplatePriority; } });
Object.defineProperty(exports, "CircularDependency", { enumerable: true, get: function () { return priority_engine_1.CircularDependency; } });
Object.defineProperty(exports, "InheritanceNode", { enumerable: true, get: function () { return priority_engine_1.InheritanceNode; } });
Object.defineProperty(exports, "MergeConflictRule", { enumerable: true, get: function () { return priority_engine_1.MergeConflictRule; } });
Object.defineProperty(exports, "ParameterMergeContext", { enumerable: true, get: function () { return priority_engine_1.ParameterMergeContext; } });
Object.defineProperty(exports, "InheritanceAnalysisResult", { enumerable: true, get: function () { return priority_engine_1.InheritanceAnalysisResult; } });
var template_registry_1 = require("./template-registry");
Object.defineProperty(exports, "TemplateRegistry", { enumerable: true, get: function () { return template_registry_1.TemplateRegistry; } });
var inheritance_resolver_1 = require("./inheritance-resolver");
Object.defineProperty(exports, "InheritanceResolver", { enumerable: true, get: function () { return inheritance_resolver_1.InheritanceResolver; } });
Object.defineProperty(exports, "InheritanceStrategy", { enumerable: true, get: function () { return inheritance_resolver_1.InheritanceStrategy; } });
Object.defineProperty(exports, "InheritanceGraphNode", { enumerable: true, get: function () { return inheritance_resolver_1.InheritanceGraphNode; } });
Object.defineProperty(exports, "ResolverInheritanceAnalysisResult", { enumerable: true, get: function () { return inheritance_resolver_1.ResolverInheritanceAnalysisResult; } });
var priority_manager_1 = require("./priority-manager");
Object.defineProperty(exports, "PriorityManager", { enumerable: true, get: function () { return priority_manager_1.PriorityManager; } });
Object.defineProperty(exports, "OverrideStrategy", { enumerable: true, get: function () { return priority_manager_1.OverrideStrategy; } });
var template_validator_1 = require("./template-validator");
Object.defineProperty(exports, "TemplateValidator", { enumerable: true, get: function () { return template_validator_1.TemplateValidator; } });
Object.defineProperty(exports, "ValidationSeverity", { enumerable: true, get: function () { return template_validator_1.ValidationSeverity; } });
var performance_optimizer_1 = require("./performance-optimizer");
Object.defineProperty(exports, "PerformanceOptimizer", { enumerable: true, get: function () { return performance_optimizer_1.PerformanceOptimizer; } });
Object.defineProperty(exports, "OptimizationStrategy", { enumerable: true, get: function () { return performance_optimizer_1.OptimizationStrategy; } });
var integrated_template_system_1 = require("./integrated-template-system");
Object.defineProperty(exports, "IntegratedTemplateSystem", { enumerable: true, get: function () { return integrated_template_system_1.IntegratedTemplateSystem; } });
/**
 * Factory function to create a complete template merger system
 */
function createTemplateMerger(options) {
    const templateMerger = new TemplateMerger(options?.merger);
    const conflictDetector = new ConflictDetector(options?.conflictDetector);
    const resolutionEngine = new ResolutionEngine(options?.resolutionEngine);
    const mergeValidator = new MergeValidator(options?.validator);
    return {
        templateMerger,
        conflictDetector,
        resolutionEngine,
        mergeValidator,
        // Convenience method for complete merge workflow
        async mergeTemplates(templates) {
            return await templateMerger.mergeTemplates(templates);
        },
        // Statistics and diagnostics
        getSystemStats() {
            return {
                merger: templateMerger.getCacheStats(),
                conflictDetector: conflictDetector.getConflictPatterns(),
                resolutionEngine: resolutionEngine.getResolutionStats(),
                validator: mergeValidator.getRegisteredValidators()
            };
        },
        // Cache management
        clearAllCaches() {
            templateMerger.clearCache();
            conflictDetector.clearPatterns();
            resolutionEngine.clearCache();
        }
    };
}
exports.createTemplateMerger = createTemplateMerger;
/**
 * Default export for easy usage
 */
exports.default = createTemplateMerger;
//# sourceMappingURL=index.js.map