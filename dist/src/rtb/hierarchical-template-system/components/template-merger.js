"use strict";
/**
 * Template Merger - Priority-Based Conflict Resolution Implementation
 *
 * Handles merging of multiple templates with intelligent conflict resolution.
 * Supports multiple resolution strategies and maintains template integrity
 * throughout the merging process.
 *
 * Features:
 * - Priority-based parameter resolution
 * - Custom function merging with conflict detection
 * - Conditional logic preservation and combination
 * - Deep configuration merging with conflict tracking
 * - Performance optimization for large template sets
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateMerger = void 0;
const interfaces_1 = require("../interfaces");
/**
 * Template Merger implementation
 */
class TemplateMerger {
    constructor(config) {
        this.config = config;
    }
    /**
     * Merge multiple templates with conflict resolution
     */
    async merge(templates, strategy = interfaces_1.ConflictResolutionStrategy.HIGHEST_PRIORITY_WINS) {
        const startTime = Date.now();
        if (templates.length === 0) {
            throw new Error('No templates provided for merging');
        }
        if (templates.length === 1) {
            return templates[0];
        }
        // Sort templates by priority (lowest number = highest priority)
        const sortedTemplates = [...templates].sort((a, b) => a.priority - b.priority);
        // Detect conflicts
        const conflicts = await this.detectConflicts(sortedTemplates);
        // Resolve conflicts based on strategy
        const resolvedConflicts = await this.resolveConflicts(conflicts, strategy);
        // Merge template metadata
        const mergedMeta = this.mergeMetadata(sortedTemplates, resolvedConflicts);
        // Merge configurations
        const mergedConfiguration = this.mergeConfigurations(sortedTemplates, resolvedConflicts);
        // Merge custom functions
        const mergedCustomFunctions = await this.mergeCustomFunctions(sortedTemplates.map(t => t.custom || []));
        // Merge conditions
        const mergedConditions = await this.mergeConditions(sortedTemplates.map(t => t.conditions || {}));
        // Merge evaluations
        const mergedEvaluations = this.mergeEvaluations(sortedTemplates.map(t => t.evaluations || {}));
        // Create merged template
        const mergedTemplate = {
            meta: mergedMeta,
            custom: mergedCustomFunctions,
            configuration: mergedConfiguration,
            conditions: mergedConditions,
            evaluations: mergedEvaluations,
            priority: Math.min(...sortedTemplates.map(t => t.priority)),
            inheritanceChain: this.buildMergedInheritanceChain(sortedTemplates),
            conflictResolution: strategy,
            validationRules: this.mergeValidationRules(sortedTemplates)
        };
        // Record processing time
        const processingTime = Date.now() - startTime;
        if (this.config.performanceMonitoring) {
            this.recordMergingMetrics(sortedTemplates, processingTime, resolvedConflicts.length);
        }
        console.log(`[TemplateMerger] Merged ${templates.length} templates in ${processingTime}ms with ${resolvedConflicts.length} conflicts resolved`);
        return mergedTemplate;
    }
    /**
     * Resolve parameter conflicts using specified strategy
     */
    async resolveConflicts(conflicts, strategy) {
        const resolvedConflicts = [];
        for (const conflict of conflicts) {
            try {
                const resolved = await this.resolveConflict(conflict, strategy);
                resolvedConflicts.push(resolved);
            }
            catch (error) {
                console.error(`[TemplateMerger] Error resolving conflict for ${conflict.parameterPath}:`, error);
                // Add conflict as unresolved with error
                resolvedConflicts.push({
                    ...conflict,
                    resolutionReason: `Error during resolution: ${error.message}`
                });
            }
        }
        return resolvedConflicts;
    }
    /**
     * Merge custom functions from multiple templates
     */
    async mergeCustomFunctions(functions) {
        const functionMap = new Map();
        const functionConflicts = [];
        // Group functions by name
        for (const templateFunctions of functions) {
            for (const func of templateFunctions) {
                if (functionMap.has(func.name)) {
                    // Track conflicts
                    const existingConflict = functionConflicts.find(c => c.name === func.name);
                    if (existingConflict) {
                        existingConflict.functions.push(func);
                    }
                    else {
                        functionConflicts.push({
                            name: func.name,
                            functions: [functionMap.get(func.name), func]
                        });
                    }
                }
                else {
                    functionMap.set(func.name, func);
                }
            }
        }
        // Resolve function conflicts
        for (const conflict of functionConflicts) {
            const resolvedFunction = await this.resolveFunctionConflict(conflict.functions);
            functionMap.set(conflict.name, resolvedFunction);
        }
        return Array.from(functionMap.values());
    }
    /**
     * Merge conditional logic from multiple templates
     */
    async mergeConditions(conditions) {
        const mergedConditions = {};
        const conditionConflicts = [];
        // Group conditions by key
        for (const templateConditions of conditions) {
            for (const [key, condition] of Object.entries(templateConditions)) {
                if (mergedConditions[key]) {
                    // Track conflicts
                    const existingConflict = conditionConflicts.find(c => c.key === key);
                    if (existingConflict) {
                        existingConflict.conditions.push(condition);
                    }
                    else {
                        conditionConflicts.push({
                            key,
                            conditions: [mergedConditions[key], condition]
                        });
                    }
                }
                else {
                    mergedConditions[key] = condition;
                }
            }
        }
        // Resolve condition conflicts
        for (const conflict of conditionConflicts) {
            const resolvedCondition = await this.resolveConditionConflict(conflict.conditions);
            mergedConditions[conflict.key] = resolvedCondition;
        }
        return mergedConditions;
    }
    // ============================================================================
    // PRIVATE METHODS
    // ============================================================================
    /**
     * Detect conflicts between templates
     */
    async detectConflicts(templates) {
        const conflicts = [];
        const parameterMap = new Map();
        // Build parameter map
        for (const template of templates) {
            for (const [parameterPath, value] of Object.entries(template.configuration)) {
                if (!parameterMap.has(parameterPath)) {
                    parameterMap.set(parameterPath, []);
                }
                parameterMap.get(parameterPath).push({ template, value });
            }
        }
        // Find conflicts (parameters with different values across templates)
        for (const [parameterPath, values] of parameterMap) {
            if (values.length > 1) {
                const uniqueValues = new Set(values.map(v => JSON.stringify(v.value)));
                if (uniqueValues.size > 1) {
                    conflicts.push({
                        parameterPath,
                        conflictingTemplates: values.map(v => ({
                            templateId: v.template.meta.version,
                            priority: v.template.priority,
                            value: v.value
                        })),
                        resolutionStrategy: interfaces_1.ConflictResolutionStrategy.HIGHEST_PRIORITY_WINS
                    });
                }
            }
        }
        return conflicts;
    }
    /**
     * Resolve a single conflict using the specified strategy
     */
    async resolveConflict(conflict, strategy) {
        const resolvedConflict = { ...conflict };
        switch (strategy) {
            case interfaces_1.ConflictResolutionStrategy.HIGHEST_PRIORITY_WINS:
                // Sort by priority (lowest number = highest priority)
                const highestPriority = conflict.conflictingTemplates.reduce((min, current) => current.priority < min.priority ? current : min);
                resolvedConflict.resolvedValue = highestPriority.value;
                resolvedConflict.resolutionReason = `Selected value from template '${highestPriority.templateId}' with highest priority ${highestPriority.priority}`;
                break;
            case interfaces_1.ConflictResolutionStrategy.LOWEST_PRIORITY_WINS:
                // Sort by priority (highest number = lowest priority)
                const lowestPriority = conflict.conflictingTemplates.reduce((max, current) => current.priority > max.priority ? current : max);
                resolvedConflict.resolvedValue = lowestPriority.value;
                resolvedConflict.resolutionReason = `Selected value from template '${lowestPriority.templateId}' with lowest priority ${lowestPriority.priority}`;
                break;
            case interfaces_1.ConflictResolutionStrategy.MERGE_WITH_WARNING:
                // Attempt to merge values if they're objects, otherwise use highest priority
                const values = conflict.conflictingTemplates.map(t => t.value);
                if (values.every(v => typeof v === 'object' && v !== null)) {
                    resolvedConflict.resolvedValue = this.deepMergeObjects(...values);
                    resolvedConflict.resolutionReason = 'Merged object values from conflicting templates';
                }
                else {
                    const highestPriority = conflict.conflictingTemplates.reduce((min, current) => current.priority < min.priority ? current : min);
                    resolvedConflict.resolvedValue = highestPriority.value;
                    resolvedConflict.resolutionReason = `Cannot merge non-object values, used highest priority template '${highestPriority.templateId}'`;
                }
                break;
            case interfaces_1.ConflictResolutionStrategy.CUSTOM_FUNCTION:
                // For now, fall back to highest priority
                // In a full implementation, this would invoke custom resolution functions
                const highestPriorityCustom = conflict.conflictingTemplates.reduce((min, current) => current.priority < min.priority ? current : min);
                resolvedConflict.resolvedValue = highestPriorityCustom.value;
                resolvedConflict.resolutionReason = `Custom resolution not implemented, used highest priority template '${highestPriorityCustom.templateId}'`;
                break;
            case interfaces_1.ConflictResolutionStrategy.FAIL_ON_CONFLICT:
                throw new Error(`Conflict detected for parameter '${conflict.parameterPath}' and strategy is FAIL_ON_CONFLICT`);
            case interfaces_1.ConflictResolutionStrategy.CONFLICT_LOGGING:
                // Log conflict and use highest priority
                const highestPriorityLog = conflict.conflictingTemplates.reduce((min, current) => current.priority < min.priority ? current : min);
                resolvedConflict.resolvedValue = highestPriorityLog.value;
                resolvedConflict.resolutionReason = `Conflict logged, used highest priority template '${highestPriorityLog.templateId}'`;
                console.warn(`[TemplateMerger] Conflict logged: ${conflict.parameterPath}`, conflict);
                break;
            default:
                throw new Error(`Unknown conflict resolution strategy: ${strategy}`);
        }
        return resolvedConflict;
    }
    /**
     * Merge template metadata
     */
    mergeMetadata(templates, resolvedConflicts) {
        const highestPriorityTemplate = templates[0]; // Already sorted by priority
        const allTags = new Set();
        const allAuthors = new Set();
        // Collect all tags and authors
        for (const template of templates) {
            if (template.meta.tags) {
                template.meta.tags.forEach(tag => allTags.add(tag));
            }
            if (template.meta.author) {
                template.meta.author.forEach(author => allAuthors.add(author));
            }
        }
        return {
            version: `merged_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            author: Array.from(allAuthors),
            description: `Merged template: ${templates.map(t => t.meta.description).filter(Boolean).join('; ')}`,
            tags: Array.from(allTags),
            priority: Math.min(...templates.map(t => t.priority)),
            inherits_from: templates.map(t => t.meta.version),
            conflictResolution: resolvedConflicts.length > 0 ? 'resolved' : 'none',
            mergedFrom: templates.map(t => ({
                version: t.meta.version,
                priority: t.priority,
                description: t.meta.description
            })),
            conflictsResolved: resolvedConflicts.length,
            validationRules: []
        };
    }
    /**
     * Merge configurations with conflict resolution
     */
    mergeConfigurations(templates, resolvedConflicts) {
        const mergedConfig = {};
        const resolvedPaths = new Set(resolvedConflicts.map(c => c.parameterPath));
        // Create a map of resolved values
        const resolvedValues = new Map();
        for (const conflict of resolvedConflicts) {
            if (conflict.resolvedValue !== undefined) {
                resolvedValues.set(conflict.parameterPath, conflict.resolvedValue);
            }
        }
        // Process templates in priority order (highest to lowest)
        for (const template of templates) {
            for (const [parameterPath, value] of Object.entries(template.configuration)) {
                // Skip if this parameter was resolved by conflict resolution
                if (resolvedPaths.has(parameterPath)) {
                    mergedConfig[parameterPath] = resolvedValues.get(parameterPath);
                }
                else if (!mergedConfig.hasOwnProperty(parameterPath)) {
                    // First template (highest priority) sets the value
                    mergedConfig[parameterPath] = value;
                }
                // Subsequent templates only set values for parameters that haven't been set yet
            }
        }
        return mergedConfig;
    }
    /**
     * Merge evaluation operators
     */
    mergeEvaluations(evaluations) {
        const mergedEvaluations = {};
        for (const templateEvaluations of evaluations) {
            for (const [key, evaluation] of Object.entries(templateEvaluations)) {
                if (!mergedEvaluations[key]) {
                    mergedEvaluations[key] = evaluation;
                }
            }
        }
        return mergedEvaluations;
    }
    /**
     * Merge validation rules
     */
    mergeValidationRules(templates) {
        const allRules = [];
        const ruleNames = new Set();
        for (const template of templates) {
            if (template.meta.validationRules) {
                for (const rule of template.meta.validationRules) {
                    if (!ruleNames.has(rule.ruleId)) {
                        allRules.push(rule);
                        ruleNames.add(rule.ruleId);
                    }
                }
            }
        }
        return allRules;
    }
    /**
     * Build merged inheritance chain
     */
    buildMergedInheritanceChain(templates) {
        const chain = [];
        for (const template of templates) {
            chain.push({
                templateId: template.meta.version,
                priority: template.priority,
                appliedAt: new Date(),
                appliedParameters: Object.keys(template.configuration),
                overriddenParameters: [],
                conflicts: []
            });
        }
        return chain;
    }
    /**
     * Resolve function conflicts
     */
    async resolveFunctionConflict(functions) {
        // For now, use the function from the highest priority template
        // In a more sophisticated implementation, we could attempt to merge function bodies
        return functions[0];
    }
    /**
     * Resolve condition conflicts
     */
    async resolveConditionConflict(conditions) {
        // For now, use the condition from the highest priority template
        // In a more sophisticated implementation, we could combine conditions
        return conditions[0];
    }
    /**
     * Deep merge objects
     */
    deepMergeObjects(...objects) {
        const result = {};
        for (const obj of objects) {
            for (const [key, value] of Object.entries(obj)) {
                if (value && typeof value === 'object' && !Array.isArray(value)) {
                    if (result[key] && typeof result[key] === 'object' && !Array.isArray(result[key])) {
                        result[key] = this.deepMergeObjects(result[key], value);
                    }
                    else {
                        result[key] = value;
                    }
                }
                else {
                    result[key] = value;
                }
            }
        }
        return result;
    }
    /**
     * Record merging metrics
     */
    recordMergingMetrics(templates, processingTime, conflictCount) {
        if (!this.config.performanceMonitoring)
            return;
        const metrics = {
            templateId: `merge_${Date.now()}`,
            processingTime,
            memoryUsage: process.memoryUsage().heapUsed,
            parameterCount: templates.reduce((sum, t) => sum + Object.keys(t.configuration).length, 0),
            conflictCount,
            warningCount: 0,
            cacheHits: 0,
            cacheMisses: 0
        };
        // Store metrics (in a real implementation, this would use a proper metrics store)
        console.log(`[TemplateMerger] Metrics:`, metrics);
    }
}
exports.TemplateMerger = TemplateMerger;
//# sourceMappingURL=template-merger.js.map