"use strict";
/**
 * Priority Template Engine - Core Template Inheritance System
 *
 * Handles priority-based template inheritance with support for complex
 * inheritance chains, parameter resolution, and conflict management.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriorityTemplateEngine = exports.TemplatePriority = void 0;
/**
 * Template priority levels (0 = highest, 80 = lowest)
 */
var TemplatePriority;
(function (TemplatePriority) {
    TemplatePriority[TemplatePriority["AGENT_OVERRIDE"] = 0] = "AGENT_OVERRIDE";
    TemplatePriority[TemplatePriority["CONTEXT_SPECIFIC"] = 10] = "CONTEXT_SPECIFIC";
    TemplatePriority[TemplatePriority["AGENTDB_LEARNED"] = 20] = "AGENTDB_LEARNED";
    TemplatePriority[TemplatePriority["FEATURE_SPECIFIC"] = 30] = "FEATURE_SPECIFIC";
    TemplatePriority[TemplatePriority["TECHNOLOGY"] = 40] = "TECHNOLOGY";
    TemplatePriority[TemplatePriority["SCENARIO"] = 50] = "SCENARIO";
    TemplatePriority[TemplatePriority["VARIANT"] = 60] = "VARIANT";
    TemplatePriority[TemplatePriority["BASE"] = 70] = "BASE";
    TemplatePriority[TemplatePriority["DEFAULT"] = 80] = "DEFAULT"; // Default fallback
})(TemplatePriority || (exports.TemplatePriority = TemplatePriority = {}));
/**
 * Priority Template Engine
 *
 * Core engine for handling priority-based template inheritance,
 * parameter resolution, and conflict management.
 */
class PriorityTemplateEngine {
    constructor() {
        this.templates = new Map();
        this.templatePriorities = new Map();
        this.inheritanceCache = new Map();
        this.parameterCache = new Map();
        this.validationCache = new Map();
    }
    /**
     * Register a template with priority information
     */
    registerTemplate(name, template, priority) {
        // Validate template structure
        this.validateTemplateStructure(template);
        // Store template and priority info
        this.templates.set(name, template);
        this.templatePriorities.set(name, {
            ...priority,
            metadata: template.meta,
            resolvedAt: new Date()
        });
        // Clear related caches
        this.clearCacheForTemplate(name);
    }
    /**
     * Resolve template inheritance chain
     */
    resolveInheritanceChain(templateName, context = {}) {
        const cacheKey = this.generateCacheKey(templateName, context);
        // Check cache first
        if (this.inheritanceCache.has(cacheKey)) {
            return this.inheritanceCache.get(cacheKey);
        }
        const template = this.templates.get(templateName);
        if (!template) {
            throw new Error(`Template '${templateName}' not found`);
        }
        const priorityInfo = this.templatePriorities.get(templateName);
        const chain = [priorityInfo];
        const visited = new Set([templateName]);
        const conflicts = [];
        const warnings = [];
        // Build inheritance chain
        const currentTemplate = { ...template };
        const processedTemplates = [templateName];
        // Process inheritance hierarchy
        this.processInheritanceHierarchy(templateName, currentTemplate, chain, visited, processedTemplates, conflicts, warnings, context);
        // Resolve parameter conflicts
        const resolvedTemplate = this.resolveParameterConflicts(currentTemplate, chain, conflicts, context);
        const result = {
            templateName,
            chain: chain.sort((a, b) => a.level - b.level),
            resolvedTemplate,
            conflicts,
            warnings
        };
        // Cache result
        this.inheritanceCache.set(cacheKey, result);
        return result;
    }
    /**
     * Process inheritance hierarchy recursively
     */
    processInheritanceHierarchy(templateName, currentTemplate, chain, visited, processedTemplates, conflicts, warnings, context) {
        const priorityInfo = this.templatePriorities.get(templateName);
        if (!priorityInfo?.inherits_from) {
            return;
        }
        const parents = Array.isArray(priorityInfo.inherits_from)
            ? priorityInfo.inherits_from
            : [priorityInfo.inherits_from];
        for (const parentName of parents) {
            // Check for circular dependencies
            if (visited.has(parentName)) {
                warnings.push(`Circular dependency detected: ${templateName} -> ${parentName}`);
                continue;
            }
            const parentTemplate = this.templates.get(parentName);
            if (!parentTemplate) {
                warnings.push(`Parent template '${parentName}' not found for '${templateName}'`);
                continue;
            }
            const parentPriority = this.templatePriorities.get(parentName);
            // Validate inheritance priority (parent should have lower priority)
            if (parentPriority.level <= priorityInfo.level) {
                warnings.push(`Invalid priority: Parent '${parentName}' (${parentPriority.level}) ` +
                    `has higher or equal priority than child '${templateName}' (${priorityInfo.level})`);
            }
            visited.add(parentName);
            processedTemplates.push(parentName);
            chain.push(parentPriority);
            // Merge parent template
            this.mergeTemplateData(currentTemplate, parentTemplate, conflicts, context);
            // Recursively process parent hierarchy
            this.processInheritanceHierarchy(parentName, currentTemplate, chain, visited, processedTemplates, conflicts, warnings, context);
            visited.delete(parentName);
        }
    }
    /**
     * Merge template data from parent to child
     */
    mergeTemplateData(child, parent, conflicts, context) {
        // Merge configuration parameters
        for (const [key, value] of Object.entries(parent.configuration || {})) {
            if (child.configuration[key] !== undefined) {
                // Conflict detected
                conflicts.push({
                    parameter: key,
                    templates: ['parent', 'child'],
                    values: [value, child.configuration[key]],
                    resolvedValue: child.configuration[key],
                    resolutionStrategy: 'highest_priority',
                    reason: 'Child template overrides parent parameter'
                });
            }
            else {
                child.configuration[key] = value;
            }
        }
        // Merge conditions
        if (parent.conditions && context.preserveConditions !== false) {
            child.conditions = { ...parent.conditions, ...child.conditions };
        }
        // Merge evaluations
        if (parent.evaluations && context.preserveConditions !== false) {
            child.evaluations = { ...parent.evaluations, ...child.evaluations };
        }
        // Merge custom functions
        if (parent.custom && child.custom) {
            for (const func of parent.custom) {
                if (!child.custom.find(f => f.name === func.name)) {
                    child.custom.push(func);
                }
            }
        }
    }
    /**
     * Resolve parameter conflicts using priority rules
     */
    resolveParameterConflicts(template, chain, conflicts, context) {
        const resolved = { ...template };
        for (const conflict of conflicts) {
            switch (context.mergeStrategy || 'override') {
                case 'override':
                    // Highest priority wins
                    resolved.configuration[conflict.parameter] = conflict.resolvedValue;
                    break;
                case 'merge':
                    // Try to merge values if possible
                    const mergedValue = this.mergeParameterValues(conflict.parameter, conflict.values, conflict.templates, chain);
                    resolved.configuration[conflict.parameter] = mergedValue;
                    break;
                case 'append':
                    // Append values (for arrays)
                    if (Array.isArray(conflict.resolvedValue)) {
                        resolved.configuration[conflict.parameter] = [
                            ...conflict.values.filter(v => Array.isArray(v)).flat(),
                            ...conflict.resolvedValue
                        ];
                    }
                    break;
            }
        }
        return resolved;
    }
    /**
     * Merge parameter values intelligently
     */
    mergeParameterValues(parameter, values, templates, chain) {
        // If all values are the same, use that value
        if (values.every(v => JSON.stringify(v) === JSON.stringify(values[0]))) {
            return values[0];
        }
        // For arrays, merge and deduplicate
        if (values.some(v => Array.isArray(v))) {
            const merged = values
                .filter(v => Array.isArray(v))
                .flat()
                .filter((value, index, self) => self.findIndex(v => JSON.stringify(v) === JSON.stringify(value)) === index);
            return merged;
        }
        // For objects, merge properties
        if (values.some(v => typeof v === 'object' && v !== null)) {
            const merged = {};
            for (const value of values) {
                if (typeof value === 'object' && value !== null) {
                    Object.assign(merged, value);
                }
            }
            return merged;
        }
        // Default: use highest priority value
        return values[values.length - 1];
    }
    /**
     * Validate template structure
     */
    validateTemplateStructure(template) {
        if (!template || typeof template !== 'object') {
            throw new Error('Template must be a valid object');
        }
        if (!template.configuration || typeof template.configuration !== 'object') {
            throw new Error('Template must have a configuration object');
        }
        // Validate custom functions if present
        if (template.custom) {
            for (const func of template.custom) {
                if (!func.name || !func.args || !func.body) {
                    throw new Error(`Invalid custom function: ${func.name}`);
                }
            }
        }
    }
    /**
     * Generate cache key for template resolution
     */
    generateCacheKey(templateName, context) {
        const contextHash = JSON.stringify(context);
        return `${templateName}:${Buffer.from(contextHash).toString('base64')}`;
    }
    /**
     * Clear cache for specific template
     */
    clearCacheForTemplate(templateName) {
        // Clear inheritance cache
        for (const [key] of this.inheritanceCache) {
            if (key.startsWith(templateName + ':')) {
                this.inheritanceCache.delete(key);
            }
        }
        // Clear parameter cache
        this.parameterCache.clear();
        this.validationCache.clear();
    }
    /**
     * Get all registered templates
     */
    getRegisteredTemplates() {
        return new Map(this.templatePriorities);
    }
    /**
     * Get template by name
     */
    getTemplate(name) {
        return this.templates.get(name);
    }
    /**
     * Get template priority info
     */
    getTemplatePriority(name) {
        return this.templatePriorities.get(name);
    }
    /**
     * Check if template exists
     */
    hasTemplate(name) {
        return this.templates.has(name);
    }
    /**
     * Remove template
     */
    removeTemplate(name) {
        const removed = this.templates.delete(name) && this.templatePriorities.delete(name);
        if (removed) {
            this.clearCacheForTemplate(name);
        }
        return removed;
    }
    /**
     * Clear all caches
     */
    clearAllCaches() {
        this.inheritanceCache.clear();
        this.parameterCache.clear();
        this.validationCache.clear();
    }
    /**
     * Get cache statistics
     */
    getCacheStats() {
        return {
            inheritanceCache: this.inheritanceCache.size,
            parameterCache: this.parameterCache.size,
            validationCache: this.validationCache.size
        };
    }
}
exports.PriorityTemplateEngine = PriorityTemplateEngine;
//# sourceMappingURL=priority-engine.js.map