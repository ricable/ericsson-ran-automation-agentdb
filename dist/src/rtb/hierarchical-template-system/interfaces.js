"use strict";
/**
 * Hierarchical Template System - Phase 2 Architecture
 *
 * Implements priority-based template inheritance engine for RTB configuration system.
 * Provides foundation for template variants, frequency relations, and conflict resolution.
 *
 * Priority Levels (lower number = higher priority):
 * - agentdb: 0     - RAN-AUTOMATION-AGENTDB overrides (highest)
 * - base: 9        - Non-variant parameters (foundation)
 * - urban: 20      - Urban/UAL high capacity variants
 * - mobility: 30   - High mobility (fast train/motorways)
 * - sleep: 40      - Sleep mode night optimization
 * - frequency_4g4g: 50  - 4G4G frequency relations
 * - frequency_4g5g: 60  - 4G5G frequency relations (EN-DC)
 * - frequency_5g5g: 70  - 5G5G frequency relations (NR-NR DC)
 * - frequency_5g4g: 80  - 5G4G frequency relations (fallback)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateConflictError = exports.TemplateValidationError = exports.TemplateInheritanceError = exports.TemplateSystemError = exports.ConflictResolutionStrategy = exports.FrequencyBand = exports.TemplateVariantType = exports.TemplatePriority = void 0;
// ============================================================================
// CORE INTERFACES
// ============================================================================
/**
 * Template priority levels for inheritance resolution
 */
var TemplatePriority;
(function (TemplatePriority) {
    TemplatePriority[TemplatePriority["AGENTDB"] = 0] = "AGENTDB";
    TemplatePriority[TemplatePriority["BASE"] = 9] = "BASE";
    TemplatePriority[TemplatePriority["URBAN"] = 20] = "URBAN";
    TemplatePriority[TemplatePriority["MOBILITY"] = 30] = "MOBILITY";
    TemplatePriority[TemplatePriority["SLEEP"] = 40] = "SLEEP";
    TemplatePriority[TemplatePriority["FREQUENCY_4G4G"] = 50] = "FREQUENCY_4G4G";
    TemplatePriority[TemplatePriority["FREQUENCY_4G5G"] = 60] = "FREQUENCY_4G5G";
    TemplatePriority[TemplatePriority["FREQUENCY_5G5G"] = 70] = "FREQUENCY_5G5G";
    TemplatePriority[TemplatePriority["FREQUENCY_5G4G"] = 80] = "FREQUENCY_5G4G"; // 5G4G fallback relations
})(TemplatePriority || (exports.TemplatePriority = TemplatePriority = {}));
/**
 * Template variant types for specialized configurations
 */
var TemplateVariantType;
(function (TemplateVariantType) {
    TemplateVariantType["BASE"] = "base";
    TemplateVariantType["URBAN"] = "urban";
    TemplateVariantType["UAL_HIGH_CAPACITY"] = "ual_high_capacity";
    TemplateVariantType["HIGH_MOBILITY"] = "high_mobility";
    TemplateVariantType["SLEEP_MODE"] = "sleep_mode";
    TemplateVariantType["COASTAL"] = "coastal";
    TemplateVariantType["RURAL"] = "rural";
    TemplateVariantType["DENSE_URBAN"] = "dense_urban";
    TemplateVariantType["SUBURBAN"] = "suburban";
})(TemplateVariantType || (exports.TemplateVariantType = TemplateVariantType = {}));
/**
 * Frequency band configurations
 */
var FrequencyBand;
(function (FrequencyBand) {
    FrequencyBand["LTE_800"] = "lte_800";
    FrequencyBand["LTE_1800"] = "lte_1800";
    FrequencyBand["LTE_2100"] = "lte_2100";
    FrequencyBand["LTE_2600"] = "lte_2600";
    FrequencyBand["NR_700"] = "nr_700";
    FrequencyBand["NR_3500"] = "nr_3500";
    FrequencyBand["NR_26000"] = "nr_26000";
    FrequencyBand["NR_28000"] = "nr_28000";
})(FrequencyBand || (exports.FrequencyBand = FrequencyBand = {}));
/**
 * Conflict resolution strategies
 */
var ConflictResolutionStrategy;
(function (ConflictResolutionStrategy) {
    ConflictResolutionStrategy["HIGHEST_PRIORITY_WINS"] = "highest_priority_wins";
    ConflictResolutionStrategy["LOWEST_PRIORITY_WINS"] = "lowest_priority_wins";
    ConflictResolutionStrategy["MERGE_WITH_WARNING"] = "merge_with_warning";
    ConflictResolutionStrategy["CUSTOM_FUNCTION"] = "custom_function";
    ConflictResolutionStrategy["FAIL_ON_CONFLICT"] = "fail_on_conflict";
    ConflictResolutionStrategy["CONFLICT_LOGGING"] = "conflict_logging";
})(ConflictResolutionStrategy || (exports.ConflictResolutionStrategy = ConflictResolutionStrategy = {}));
// ============================================================================
// ERROR TYPES
// ============================================================================
/**
 * Base template system error
 */
class TemplateSystemError extends Error {
    constructor(message, code, templateId, parameterPath) {
        super(message);
        this.code = code;
        this.templateId = templateId;
        this.parameterPath = parameterPath;
        this.name = 'TemplateSystemError';
    }
}
exports.TemplateSystemError = TemplateSystemError;
/**
 * Template inheritance error
 */
class TemplateInheritanceError extends TemplateSystemError {
    constructor(message, templateId, inheritanceChain, conflictingTemplates) {
        super(message, 'INHERITANCE_ERROR', templateId);
        this.templateId = templateId;
        this.inheritanceChain = inheritanceChain;
        this.conflictingTemplates = conflictingTemplates;
        this.name = 'TemplateInheritanceError';
    }
}
exports.TemplateInheritanceError = TemplateInheritanceError;
/**
 * Template validation error
 */
class TemplateValidationError extends TemplateSystemError {
    constructor(message, templateId, validationErrors) {
        super(message, 'VALIDATION_ERROR', templateId);
        this.validationErrors = validationErrors;
        this.name = 'TemplateValidationError';
    }
}
exports.TemplateValidationError = TemplateValidationError;
/**
 * Template conflict error
 */
class TemplateConflictError extends TemplateSystemError {
    constructor(message, conflicts) {
        super(message, 'CONFLICT_ERROR', conflicts[0]?.conflictingTemplates[0]?.templateId);
        this.conflicts = conflicts;
        this.name = 'TemplateConflictError';
    }
}
exports.TemplateConflictError = TemplateConflictError;
//# sourceMappingURL=interfaces.js.map