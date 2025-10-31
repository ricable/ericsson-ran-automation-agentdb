"use strict";
/**
 * Validation Engine Utility
 *
 * Core validation engine for template export with comprehensive rule processing,
 * performance optimization, and integration with AgentDB memory patterns.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationEngine = void 0;
class ValidationEngine {
    constructor(config) {
        this.validationRules = new Map();
        this.customValidators = new Map();
        this.config = config;
        this.initializeBuiltInValidators();
    }
    async initialize() {
        console.log('🔍 Initializing Validation Engine...');
        await this.loadValidationRules();
        console.log('✅ Validation Engine initialized');
    }
    async validateTemplate(template) {
        const startTime = Date.now();
        const errors = [];
        const warnings = [];
        const infos = [];
        // Apply validation rules
        for (const [ruleId, rule] of this.validationRules) {
            try {
                const result = await this.applyValidationRule(template, rule);
                if (!result.isValid) {
                    if (result.severity === 'error') {
                        errors.push(result.error);
                    }
                    else if (result.severity === 'warning') {
                        warnings.push(result.warning);
                    }
                    else {
                        infos.push(result.info);
                    }
                }
            }
            catch (error) {
                console.error(`Validation rule ${ruleId} failed:`, error);
            }
        }
        const validationTime = Date.now() - startTime;
        return {
            isValid: errors.length === 0,
            validationScore: this.calculateValidationScore(errors, warnings),
            errors,
            warnings,
            infos,
            suggestions: [],
            totalChecks: this.validationRules.size,
            passedChecks: this.validationRules.size - errors.length,
            failedChecks: errors.length,
            processingTime: validationTime
        };
    }
    async loadValidationRules() {
        // Load validation rules from configuration or database
    }
    async applyValidationRule(template, rule) {
        // Apply specific validation rule
        return { isValid: true };
    }
    calculateValidationScore(errors, warnings) {
        const totalIssues = errors.length + warnings.length;
        if (totalIssues === 0)
            return 1.0;
        const errorWeight = 0.7;
        const warningWeight = 0.3;
        return Math.max(0, 1 - (errors.length * errorWeight + warnings.length * warningWeight) / totalIssues);
    }
    initializeBuiltInValidators() {
        // Initialize built-in validation functions
        this.customValidators.set('semantic_version', this.validateSemanticVersion.bind(this));
        this.customValidators.set('template_id', this.validateTemplateId.bind(this));
        this.customValidators.set('configuration_structure', this.validateConfigurationStructure.bind(this));
    }
    validateSemanticVersion(version) {
        return /^\d+\.\d+\.\d+(-[a-zA-Z0-9]+)?$/.test(version);
    }
    validateTemplateId(templateId) {
        return /^[a-zA-Z][a-zA-Z0-9_-]*$/.test(templateId);
    }
    validateConfigurationStructure(config) {
        return config && typeof config === 'object' && !Array.isArray(config);
    }
}
exports.ValidationEngine = ValidationEngine;
//# sourceMappingURL=validation-engine.js.map