"use strict";
/**
 * Conflict Detection System for Template Merging
 *
 * Identifies and categorizes conflicts between templates during the merging process.
 * Supports advanced conflict detection with pattern recognition and ML-based predictions.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictDetector = void 0;
const logger_1 = require("../../utils/logger");
class ConflictDetector {
    constructor(options = {}) {
        this.logger = new logger_1.Logger('ConflictDetector');
        this.conflictPatterns = new Map();
        this.options = {
            enableMLPrediction: false,
            strictTypeChecking: true,
            detectStructuralConflicts: true,
            analyzeConditionalConflicts: true,
            cachePatterns: true,
            maxRecursionDepth: 10,
            ...options
        };
    }
    /**
     * Detect conflicts between multiple templates
     */
    async detectConflicts(templates) {
        const startTime = Date.now();
        this.logger.info(`Starting conflict detection for ${templates.length} templates`);
        const conflicts = [];
        const parameterMap = new Map();
        // Build parameter map
        for (let i = 0; i < templates.length; i++) {
            const template = templates[i];
            const priority = template.meta?.priority || 0;
            this.extractParameters(template.configuration || {}, '', parameterMap, template, priority, i);
        }
        // Detect conflicts for each parameter
        for (const [parameter, values] of parameterMap.entries()) {
            if (values.length > 1) {
                const parameterConflicts = await this.detectParameterConflicts(parameter, values);
                conflicts.push(...parameterConflicts);
            }
        }
        // Detect structural conflicts
        if (this.options.detectStructuralConflicts) {
            const structuralConflicts = await this.detectStructuralConflicts(templates);
            conflicts.push(...structuralConflicts);
        }
        // Detect conditional conflicts
        if (this.options.analyzeConditionalConflicts) {
            const conditionalConflicts = await this.detectConditionalConflicts(templates);
            conflicts.push(...conditionalConflicts);
        }
        // Detect function conflicts
        const functionConflicts = await this.detectFunctionConflicts(templates);
        conflicts.push(...functionConflicts);
        // Detect metadata conflicts
        const metadataConflicts = await this.detectMetadataConflicts(templates);
        conflicts.push(...metadataConflicts);
        // Analyze and categorize conflicts
        await this.analyzeConflicts(conflicts);
        const detectionTime = Date.now() - startTime;
        this.logger.info(`Conflict detection completed`, {
            totalConflicts: conflicts.length,
            detectionTime,
            conflictsByType: this.getConflictsByType(conflicts)
        });
        return conflicts;
    }
    /**
     * Extract parameters from template configuration
     */
    extractParameters(obj, path, parameterMap, template, priority, templateIndex, depth = 0) {
        if (depth > this.options.maxRecursionDepth) {
            this.logger.warn(`Maximum recursion depth exceeded at path: ${path}`);
            return;
        }
        for (const [key, value] of Object.entries(obj)) {
            const currentPath = path ? `${path}.${key}` : key;
            if (this.isObject(value) && !Array.isArray(value) && !this.isSpecialValue(value)) {
                this.extractParameters(value, currentPath, parameterMap, template, priority, templateIndex, depth + 1);
            }
            else {
                if (!parameterMap.has(currentPath)) {
                    parameterMap.set(currentPath, []);
                }
                parameterMap.get(currentPath).push({
                    template,
                    value,
                    priority,
                    index: templateIndex
                });
            }
        }
    }
    /**
     * Detect conflicts for a specific parameter
     */
    async detectParameterConflicts(parameter, values) {
        const conflicts = [];
        const uniqueValues = new Map();
        // Group by value equality
        for (const { template, value, priority, index } of values) {
            const valueKey = this.getValueKey(value);
            if (!uniqueValues.has(valueKey)) {
                uniqueValues.set(valueKey, []);
            }
            uniqueValues.get(valueKey).push({ template, value, priority, index });
        }
        // If we have multiple unique values, there's a conflict
        if (uniqueValues.size > 1) {
            const conflictGroups = Array.from(uniqueValues.values());
            const allValues = conflictGroups.flat();
            const templates = allValues.map(v => v.template.meta?.description || v.template.meta?.source || 'unknown');
            const priorities = allValues.map(v => v.priority);
            const conflictValues = allValues.map(v => v.value);
            const conflictType = this.determineConflictType(conflictValues);
            const severity = this.determineSeverity(parameter, conflictType, priorities);
            const conflict = {
                parameter,
                templates,
                priorities,
                conflictType,
                values: conflictValues,
                resolution: {
                    strategy: 'highest_priority',
                    reasoning: `Conflict detected for parameter ${parameter} with ${uniqueValues.size} different values`,
                    resolved: false
                },
                resolved: false,
                context: await this.buildConflictContext(parameter, conflictValues, templates),
                severity,
                requiresManualIntervention: severity === 'critical' || conflictType === 'conditional'
            };
            conflicts.push(conflict);
        }
        return conflicts;
    }
    /**
     * Detect structural conflicts between templates
     */
    async detectStructuralConflicts(templates) {
        const conflicts = [];
        const structureMap = new Map();
        // Analyze template structures
        for (const template of templates) {
            const structure = this.analyzeStructure(template.configuration || {});
            const structureKey = JSON.stringify(structure);
            if (!structureMap.has(structureKey)) {
                structureMap.set(structureKey, []);
            }
            structureMap.get(structureKey).push({
                template,
                structure,
                priority: template.meta?.priority || 0
            });
        }
        // Detect structural conflicts
        if (structureMap.size > 1) {
            const structures = Array.from(structureMap.values());
            const templates = structures.map(s => s[0].template.meta?.description || 'unknown');
            const priorities = structures.map(s => s[0].priority);
            const conflict = {
                parameter: '__template_structure__',
                templates,
                priorities,
                conflictType: 'structure',
                values: structures.map(s => s[0].structure),
                resolution: {
                    strategy: 'merge',
                    reasoning: 'Templates have different structural layouts - deep merge required',
                    resolved: false
                },
                resolved: false,
                severity: 'medium',
                requiresManualIntervention: false
            };
            conflicts.push(conflict);
        }
        return conflicts;
    }
    /**
     * Detect conditional logic conflicts
     */
    async detectConditionalConflicts(templates) {
        const conflicts = [];
        const conditionMap = new Map();
        // Collect all conditions
        for (const template of templates) {
            const conditions = template.conditions || {};
            for (const [key, condition] of Object.entries(conditions)) {
                if (!conditionMap.has(key)) {
                    conditionMap.set(key, []);
                }
                conditionMap.get(key).push({
                    template,
                    condition,
                    priority: template.meta?.priority || 0
                });
            }
        }
        // Detect condition conflicts
        for (const [conditionKey, conditionList] of conditionMap.entries()) {
            if (conditionList.length > 1) {
                const templates = conditionList.map(c => c.template.meta?.description || 'unknown');
                const priorities = conditionList.map(c => c.priority);
                const values = conditionList.map(c => c.condition);
                // Check for contradictory conditions
                if (this.hasContradictoryConditions(values)) {
                    const conflict = {
                        parameter: `condition.${conditionKey}`,
                        templates,
                        priorities,
                        conflictType: 'conditional',
                        values,
                        resolution: {
                            strategy: 'conditional',
                            reasoning: `Contradictory conditions detected for ${conditionKey}`,
                            resolved: false
                        },
                        resolved: false,
                        severity: 'high',
                        requiresManualIntervention: true
                    };
                    conflicts.push(conflict);
                }
            }
        }
        return conflicts;
    }
    /**
     * Detect function conflicts
     */
    async detectFunctionConflicts(templates) {
        const conflicts = [];
        const functionMap = new Map();
        // Collect all custom functions
        for (const template of templates) {
            const functions = template.custom || [];
            for (const func of functions) {
                if (!functionMap.has(func.name)) {
                    functionMap.set(func.name, []);
                }
                functionMap.get(func.name).push({
                    template,
                    func,
                    priority: template.meta?.priority || 0
                });
            }
        }
        // Detect function conflicts
        for (const [funcName, funcList] of functionMap.entries()) {
            if (funcList.length > 1) {
                const templates = funcList.map(f => f.template.meta?.description || 'unknown');
                const priorities = funcList.map(f => f.priority);
                const values = funcList.map(f => f.func);
                // Check for different implementations
                if (this.hasDifferentFunctionImplementations(values)) {
                    const conflict = {
                        parameter: `function.${funcName}`,
                        templates,
                        priorities,
                        conflictType: 'function',
                        values,
                        resolution: {
                            strategy: 'highest_priority',
                            reasoning: `Different implementations detected for function ${funcName}`,
                            resolved: false
                        },
                        resolved: false,
                        severity: 'medium',
                        requiresManualIntervention: true
                    };
                    conflicts.push(conflict);
                }
            }
        }
        return conflicts;
    }
    /**
     * Detect metadata conflicts
     */
    async detectMetadataConflicts(templates) {
        const conflicts = [];
        const metadataFields = ['version', 'environment', 'author', 'tags'];
        for (const field of metadataFields) {
            const values = templates.map(t => t.meta?.[field]).filter(v => v !== undefined);
            if (values.length > 1) {
                const uniqueValues = new Set(values.map(v => Array.isArray(v) ? JSON.stringify(v.sort()) : v));
                if (uniqueValues.size > 1) {
                    const templatesWithValues = templates.filter(t => t.meta?.[field] !== undefined);
                    const templateNames = templatesWithValues.map(t => t.meta?.description || 'unknown');
                    const priorities = templatesWithValues.map(t => t.meta?.priority || 0);
                    const conflict = {
                        parameter: `metadata.${field}`,
                        templates: templateNames,
                        priorities,
                        conflictType: 'metadata',
                        values: Array.from(uniqueValues),
                        resolution: {
                            strategy: field === 'tags' || field === 'author' ? 'merge' : 'highest_priority',
                            reasoning: `Metadata conflict detected for field ${field}`,
                            resolved: false
                        },
                        resolved: false,
                        severity: 'low',
                        requiresManualIntervention: false
                    };
                    conflicts.push(conflict);
                }
            }
        }
        return conflicts;
    }
    /**
     * Analyze and enhance conflicts with additional context
     */
    async analyzeConflicts(conflicts) {
        for (const conflict of conflicts) {
            // Apply ML prediction if enabled
            if (this.options.enableMLPrediction) {
                const recommendedStrategy = await this.predictResolutionStrategy(conflict);
                if (recommendedStrategy && conflict.resolution.strategy !== recommendedStrategy) {
                    conflict.resolution.strategy = recommendedStrategy;
                    conflict.resolution.reasoning += ` (ML recommended: ${recommendedStrategy})`;
                }
            }
            // Update pattern cache
            if (this.options.cachePatterns) {
                this.updateConflictPatterns(conflict);
            }
        }
    }
    /**
     * Build conflict context
     */
    async buildConflictContext(parameter, values, templates) {
        const parameterType = this.inferParameterType(values);
        const historicalConflicts = this.getHistoricalConflictCount(parameter);
        const recommendedResolution = this.getRecommendedResolution(parameter, values);
        return {
            inheritanceDepth: parameter.split('.').length,
            inheritancePath: parameter.split('.'),
            parameterType,
            constraints: [],
            historicalConflicts,
            recommendedResolution
        };
    }
    /**
     * Determine conflict type based on values
     */
    determineConflictType(values) {
        const types = values.map(v => this.getValueType(v));
        const uniqueTypes = new Set(types);
        if (uniqueTypes.size > 1) {
            return 'type';
        }
        const mainType = types[0];
        if (mainType === 'object') {
            return 'structure';
        }
        return 'value';
    }
    /**
     * Determine conflict severity
     */
    determineSeverity(parameter, conflictType, priorities) {
        if (conflictType === 'conditional') {
            return 'critical';
        }
        if (conflictType === 'function') {
            return 'high';
        }
        if (conflictType === 'structure') {
            return 'medium';
        }
        // Check priority differences
        const maxPriority = Math.max(...priorities);
        const minPriority = Math.min(...priorities);
        if (maxPriority - minPriority > 5) {
            return 'medium';
        }
        return 'low';
    }
    /**
     * Get value key for comparison
     */
    getValueKey(value) {
        if (value === null || value === undefined) {
            return 'null';
        }
        if (typeof value === 'object') {
            return JSON.stringify(value, Object.keys(value).sort());
        }
        return String(value);
    }
    /**
     * Get value type
     */
    getValueType(value) {
        if (Array.isArray(value))
            return 'array';
        if (value === null)
            return 'null';
        return typeof value;
    }
    /**
     * Infer parameter type from values
     */
    inferParameterType(values) {
        const types = values.map(v => this.getValueType(v));
        const typeCounts = types.reduce((acc, type) => {
            acc[type] = (acc[type] || 0) + 1;
            return acc;
        }, {});
        return Object.keys(typeCounts).reduce((a, b) => typeCounts[a] > typeCounts[b] ? a : b);
    }
    /**
     * Check if value is an object
     */
    isObject(value) {
        return value !== null && typeof value === 'object' && !Array.isArray(value);
    }
    /**
     * Check if value is a special value that should not be recursed into
     */
    isSpecialValue(value) {
        return value instanceof Date || value instanceof RegExp || value instanceof Function;
    }
    /**
     * Analyze template structure
     */
    analyzeStructure(obj, depth = 0) {
        if (depth > 5 || !this.isObject(obj)) {
            return this.getValueType(obj);
        }
        const structure = {};
        for (const [key, value] of Object.entries(obj)) {
            if (this.isObject(value)) {
                structure[key] = this.analyzeStructure(value, depth + 1);
            }
            else {
                structure[key] = this.getValueType(value);
            }
        }
        return structure;
    }
    /**
     * Check for contradictory conditions
     */
    hasContradictoryConditions(conditions) {
        // Simple implementation - could be enhanced with more sophisticated logic
        const conditionsStr = conditions.map(c => JSON.stringify(c));
        return new Set(conditionsStr).size > 1;
    }
    /**
     * Check for different function implementations
     */
    hasDifferentFunctionImplementations(functions) {
        const implementations = functions.map(f => JSON.stringify(f.body || ''));
        return new Set(implementations).size > 1;
    }
    /**
     * Predict resolution strategy using ML (placeholder)
     */
    async predictResolutionStrategy(conflict) {
        // Placeholder for ML-based prediction
        // Could be enhanced with actual ML model
        return null;
    }
    /**
     * Update conflict patterns cache
     */
    updateConflictPatterns(conflict) {
        const patternKey = `${conflict.conflictType}:${conflict.parameter.split('.')[0]}`;
        if (!this.conflictPatterns.has(patternKey)) {
            this.conflictPatterns.set(patternKey, {
                pattern: patternKey,
                frequency: 0,
                commonResolution: conflict.resolution.strategy,
                successRate: 0
            });
        }
        const pattern = this.conflictPatterns.get(patternKey);
        pattern.frequency++;
    }
    /**
     * Get historical conflict count
     */
    getHistoricalConflictCount(parameter) {
        const patternKey = `${parameter.split('.')[0]}`;
        const pattern = this.conflictPatterns.get(patternKey);
        return pattern ? pattern.frequency : 0;
    }
    /**
     * Get recommended resolution
     */
    getRecommendedResolution(parameter, values) {
        const patternKey = `${parameter.split('.')[0]}`;
        const pattern = this.conflictPatterns.get(patternKey);
        return pattern ? pattern.commonResolution : 'highest_priority';
    }
    /**
     * Get conflicts by type
     */
    getConflictsByType(conflicts) {
        return conflicts.reduce((acc, conflict) => {
            acc[conflict.conflictType] = (acc[conflict.conflictType] || 0) + 1;
            return acc;
        }, {});
    }
    /**
     * Get conflict patterns
     */
    getConflictPatterns() {
        return Array.from(this.conflictPatterns.values());
    }
    /**
     * Clear conflict patterns cache
     */
    clearPatterns() {
        this.conflictPatterns.clear();
    }
}
exports.ConflictDetector = ConflictDetector;
//# sourceMappingURL=conflict-detector.js.map