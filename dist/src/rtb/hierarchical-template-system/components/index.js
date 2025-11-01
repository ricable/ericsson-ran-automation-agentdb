"use strict";
/**
 * Hierarchical Template System Components - Module Exports
 *
 * Exports all template system components for easy importing and usage.
 * Provides a comprehensive set of tools for template inheritance,
 * variant generation, conflict resolution, and validation.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateConflictError = exports.TemplateValidationError = exports.TemplateInheritanceError = exports.TemplateSystemError = exports.TemplateEventBus = exports.FrequencyRelationManager = exports.TemplateValidator = exports.TemplateConflictResolver = exports.TemplateMerger = exports.TemplateVariantGenerator = exports.PriorityTemplateEngine = void 0;
// Core Components
var priority_template_engine_1 = require("../priority-template-engine");
Object.defineProperty(exports, "PriorityTemplateEngine", { enumerable: true, get: function () { return priority_template_engine_1.PriorityTemplateEngine; } });
// Template Processing Components
var template_variant_generator_1 = require("./template-variant-generator");
Object.defineProperty(exports, "TemplateVariantGenerator", { enumerable: true, get: function () { return template_variant_generator_1.TemplateVariantGenerator; } });
var template_merger_1 = require("./template-merger");
Object.defineProperty(exports, "TemplateMerger", { enumerable: true, get: function () { return template_merger_1.TemplateMerger; } });
var template_conflict_resolver_1 = require("./template-conflict-resolver");
Object.defineProperty(exports, "TemplateConflictResolver", { enumerable: true, get: function () { return template_conflict_resolver_1.TemplateConflictResolver; } });
var template_validator_1 = require("./template-validator");
Object.defineProperty(exports, "TemplateValidator", { enumerable: true, get: function () { return template_validator_1.TemplateValidator; } });
var frequency_relation_manager_1 = require("./frequency-relation-manager");
Object.defineProperty(exports, "FrequencyRelationManager", { enumerable: true, get: function () { return frequency_relation_manager_1.FrequencyRelationManager; } });
// Event System
var template_event_bus_1 = require("./template-event-bus");
Object.defineProperty(exports, "TemplateEventBus", { enumerable: true, get: function () { return template_event_bus_1.TemplateEventBus; } });
// Re-export error types
var interfaces_1 = require("../interfaces");
Object.defineProperty(exports, "TemplateSystemError", { enumerable: true, get: function () { return interfaces_1.TemplateSystemError; } });
Object.defineProperty(exports, "TemplateInheritanceError", { enumerable: true, get: function () { return interfaces_1.TemplateInheritanceError; } });
Object.defineProperty(exports, "TemplateValidationError", { enumerable: true, get: function () { return interfaces_1.TemplateValidationError; } });
Object.defineProperty(exports, "TemplateConflictError", { enumerable: true, get: function () { return interfaces_1.TemplateConflictError; } });
//# sourceMappingURL=index.js.map