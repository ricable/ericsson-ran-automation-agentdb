"use strict";
/**
 * Inheritance Resolver - Advanced Template Inheritance Chain Processing
 *
 * Handles complex inheritance hierarchies, circular dependency detection,
 * parameter conflict resolution, and template merging strategies.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.InheritanceResolver = exports.InheritanceStrategy = void 0;
/**
 * Inheritance resolution strategy
 */
var InheritanceStrategy;
(function (InheritanceStrategy) {
    InheritanceStrategy["OVERRIDE"] = "override";
    InheritanceStrategy["MERGE"] = "merge";
    InheritanceStrategy["APPEND"] = "append";
    InheritanceStrategy["INTERSECT"] = "intersect";
    InheritanceStrategy["CUSTOM"] = "custom"; // Use custom resolver function
})(InheritanceStrategy || (exports.InheritanceStrategy = InheritanceStrategy = {}));
/**
 * Inheritance Resolver
 *
 * Advanced system for resolving complex template inheritance chains,
 * detecting circular dependencies, and managing parameter conflicts.
 */
class InheritanceResolver {
    constructor(registry) {
        this.inheritanceGraph = new Map();
        this.resolutionCache = new Map();
        this.analysisCache = new Map();
        this.conflictRules = new Map();
        this.registry = registry;
        this.initializeDefaultConflictRules();
    }
    /**
     * Resolve template inheritance with advanced conflict handling
     */
    async resolveInheritance(templateName, options = {}) {
        const cacheKey = this.generateResolutionCacheKey(templateName, options);
        // Check cache first
        if (this.resolutionCache.has(cacheKey)) {
            return this.resolutionCache.get(cacheKey);
        }
        // Build inheritance graph
        await this.buildInheritanceGraph();
        // Validate inheritance structure
        const validationErrors = await this.validateInheritanceStructure(templateName, options);
        if (validationErrors.length > 0 && !options.allowCircularDependencies) {
            throw new Error(`Inheritance validation failed: ${validationErrors.map(e => e.message).join(', ')}`);
        }
        // Resolve inheritance chain
        const chain = await this.resolveInheritanceChain(templateName, options);
        // Cache result
        this.resolutionCache.set(cacheKey, chain);
        return chain;
    }
    /**
     * Analyze template inheritance complexity
     */
    async analyzeInheritance(templateName) {
        // Check cache first
        if (this.analysisCache.has(templateName)) {
            return this.analysisCache.get(templateName);
        }
        // Build inheritance graph
        await this.buildInheritanceGraph();
        const node = this.inheritanceGraph.get(templateName);
        if (!node) {
            throw new Error(`Template '${templateName}' not found in inheritance graph`);
        }
        // Calculate inheritance depth
        const depth = this.calculateInheritanceDepth(templateName);
        // Count dependencies
        const dependencies = this.getAllDependencies(templateName);
        // Detect circular dependencies
        const circularDeps = this.detectCircularDependencies(templateName);
        // Analyze parameter conflicts
        const conflicts = await this.analyzeParameterConflicts(templateName);
        // Calculate merge complexity
        const complexity = this.calculateMergeComplexity(templateName);
        // Estimate processing time
        const processingTime = this.estimateProcessingTime(templateName, complexity);
        // Generate recommendations
        const recommendations = this.generateRecommendations(templateName, depth, dependencies, circularDeps, conflicts);
        const result = {
            templateName,
            inheritanceDepth: depth,
            totalDependencies: dependencies.length,
            circularDependencies: circularDeps,
            parameterConflicts: conflicts,
            mergeComplexity: complexity,
            estimatedProcessingTime: processingTime,
            recommendations
        };
        // Cache result
        this.analysisCache.set(templateName, result);
        return result;
    }
    /**
     * Build inheritance graph from all registered templates
     */
    async buildInheritanceGraph() {
        // Clear existing graph
        this.inheritanceGraph.clear();
        // Get all templates from registry
        const templates = this.registry.getRegisteredTemplates();
        // Create nodes for all templates
        for (const [name, priority] of templates) {
            const template = this.registry.getTemplate(name);
            if (template) {
                this.inheritanceGraph.set(name, {
                    name,
                    template,
                    priority,
                    children: new Set(),
                    parents: new Set(),
                    depth: 0,
                    visited: false,
                    visiting: false,
                    resolved: false
                });
            }
        }
        // Build parent-child relationships
        for (const [name, node] of this.inheritanceGraph) {
            const dependencies = this.extractTemplateDependencies(node.template);
            for (const dep of dependencies) {
                const parentNode = this.inheritanceGraph.get(dep);
                if (parentNode) {
                    node.parents.add(dep);
                    parentNode.children.add(name);
                }
            }
        }
        // Calculate depths
        this.calculateDepths();
    }
    /**
     * Extract template dependencies
     */
    extractTemplateDependencies(template) {
        const dependencies = [];
        // From metadata
        if (template.meta?.inherits_from) {
            if (Array.isArray(template.meta.inherits_from)) {
                dependencies.push(...template.meta.inherits_from);
            }
            else {
                dependencies.push(template.meta.inherits_from);
            }
        }
        // From evaluations
        if (template.evaluations) {
            for (const [key, evalOp] of Object.entries(template.evaluations)) {
                // Extract template references from evaluation expressions
                const refs = this.extractTemplateReferences(evalOp.eval);
                dependencies.push(...refs);
            }
        }
        // From conditions
        if (template.conditions) {
            for (const [key, condition] of Object.entries(template.conditions)) {
                const refs = this.extractTemplateReferences(condition.if);
                dependencies.push(...refs);
                if (typeof condition.then === 'string') {
                    const thenRefs = this.extractTemplateReferences(condition.then);
                    dependencies.push(...thenRefs);
                }
                if (typeof condition.else === 'string') {
                    const elseRefs = this.extractTemplateReferences(condition.else);
                    dependencies.push(...elseRefs);
                }
            }
        }
        return [...new Set(dependencies)];
    }
    /**
     * Extract template references from expression
     */
    extractTemplateReferences(expression) {
        const templateRefs = [];
        // Pattern to match template names (CamelCase ending with Template)
        const templatePattern = /\b([A-Z][a-zA-Z0-9_]*Template)\b/g;
        let match;
        while ((match = templatePattern.exec(expression)) !== null) {
            templateRefs.push(match[1]);
        }
        return templateRefs;
    }
    /**
     * Calculate node depths in inheritance graph
     */
    calculateDepths() {
        // Topological sort to calculate depths
        const visited = new Set();
        const processing = new Set();
        const calculateDepth = (nodeName) => {
            if (visited.has(nodeName)) {
                return this.inheritanceGraph.get(nodeName).depth;
            }
            if (processing.has(nodeName)) {
                // Circular dependency detected
                return 0;
            }
            processing.add(nodeName);
            const node = this.inheritanceGraph.get(nodeName);
            let maxParentDepth = 0;
            for (const parentName of node.parents) {
                const parentDepth = calculateDepth(parentName);
                maxParentDepth = Math.max(maxParentDepth, parentDepth);
            }
            node.depth = maxParentDepth + 1;
            processing.delete(nodeName);
            visited.add(nodeName);
            return node.depth;
        };
        // Calculate depths for all nodes
        for (const nodeName of this.inheritanceGraph.keys()) {
            calculateDepth(nodeName);
        }
    }
    /**
     * Resolve inheritance chain with topological sort
     */
    async resolveInheritanceChain(templateName, options) {
        const node = this.inheritanceGraph.get(templateName);
        if (!node) {
            throw new Error(`Template '${templateName}' not found`);
        }
        // Build inheritance chain using topological sort
        const chain = [];
        const conflicts = [];
        const warnings = [];
        const visited = new Set();
        const buildChain = (nodeName, currentChain) => {
            if (visited.has(nodeName)) {
                return;
            }
            // Check for circular dependencies
            if (currentChain.includes(nodeName)) {
                const cycleStart = currentChain.indexOf(nodeName);
                const cycle = currentChain.slice(cycleStart).concat(nodeName);
                warnings.push(`Circular dependency detected: ${cycle.join(' -> ')}`);
                return;
            }
            const currentNode = this.inheritanceGraph.get(nodeName);
            // Process parents first (inheritance order)
            for (const parentName of currentNode.parents) {
                buildChain(parentName, currentChain.concat(nodeName));
            }
            // Add current node to chain
            chain.push(currentNode.priority);
            visited.add(nodeName);
        };
        buildChain(templateName, []);
        // Merge templates in inheritance order
        const resolvedTemplate = await this.mergeTemplates(chain, conflicts, warnings, options);
        return {
            templateName,
            chain: chain.sort((a, b) => a.level - b.level),
            resolvedTemplate,
            conflicts,
            warnings
        };
    }
    /**
     * Merge templates using specified strategy
     */
    async mergeTemplates(chain, conflicts, warnings, options) {
        let mergedTemplate = {
            configuration: {},
            custom: [],
            conditions: {},
            evaluations: {}
        };
        // Process templates in priority order (highest to lowest)
        const sortedChain = [...chain].sort((a, b) => a.level - b.level);
        for (const priorityInfo of sortedChain) {
            const template = this.registry.getTemplate(this.findTemplateByPriority(priorityInfo));
            if (!template) {
                warnings.push(`Template not found for priority: ${priorityInfo.category}`);
                continue;
            }
            // Merge template into result
            await this.mergeTemplate(mergedTemplate, template, priorityInfo, conflicts, warnings, options);
        }
        return mergedTemplate;
    }
    /**
     * Merge two templates
     */
    async mergeTemplate(target, source, priorityInfo, conflicts, warnings, options) {
        // Merge configuration
        await this.mergeConfiguration(target.configuration || {}, source.configuration || {}, priorityInfo, conflicts, options);
        // Merge custom functions
        if (source.custom) {
            target.custom = target.custom || [];
            for (const func of source.custom) {
                const existing = target.custom.find(f => f.name === func.name);
                if (existing) {
                    conflicts.push({
                        parameter: `custom_function:${func.name}`,
                        templates: ['target', 'source'],
                        values: [existing, func],
                        resolvedValue: func,
                        resolutionStrategy: 'highest_priority',
                        reason: `Function override from ${priorityInfo.category}`
                    });
                    // Replace existing function
                    const index = target.custom.indexOf(existing);
                    target.custom[index] = func;
                }
                else {
                    target.custom.push(func);
                }
            }
        }
        // Merge conditions
        if (source.conditions) {
            target.conditions = target.conditions || {};
            for (const [key, condition] of Object.entries(source.conditions)) {
                if (target.conditions[key]) {
                    conflicts.push({
                        parameter: `condition:${key}`,
                        templates: ['target', 'source'],
                        values: [target.conditions[key], condition],
                        resolvedValue: condition,
                        resolutionStrategy: 'highest_priority',
                        reason: `Condition override from ${priorityInfo.category}`
                    });
                }
                target.conditions[key] = condition;
            }
        }
        // Merge evaluations
        if (source.evaluations) {
            target.evaluations = target.evaluations || {};
            for (const [key, evaluation] of Object.entries(source.evaluations)) {
                if (target.evaluations[key]) {
                    conflicts.push({
                        parameter: `evaluation:${key}`,
                        templates: ['target', 'source'],
                        values: [target.evaluations[key], evaluation],
                        resolvedValue: evaluation,
                        resolutionStrategy: 'highest_priority',
                        reason: `Evaluation override from ${priorityInfo.category}`
                    });
                }
                target.evaluations[key] = evaluation;
            }
        }
        // Merge metadata
        if (source.meta) {
            target.meta = { ...target.meta, ...source.meta };
        }
    }
    /**
     * Merge configuration objects
     */
    async mergeConfiguration(target, source, priorityInfo, conflicts, options) {
        for (const [key, sourceValue] of Object.entries(source)) {
            if (target[key] !== undefined) {
                // Conflict detected
                const conflict = await this.resolveParameterConflict(key, target[key], sourceValue, priorityInfo, options);
                conflicts.push(conflict);
                target[key] = conflict.resolvedValue;
            }
            else {
                target[key] = sourceValue;
            }
        }
    }
    /**
     * Resolve parameter conflict using rules
     */
    async resolveParameterConflict(parameter, targetValue, sourceValue, priorityInfo, options) {
        const strategy = options.strategy || InheritanceStrategy.OVERRIDE;
        let resolvedValue = sourceValue;
        let resolutionStrategy = 'highest_priority';
        // Check for custom conflict rules
        const customRule = this.findConflictRule(parameter);
        if (customRule) {
            resolvedValue = await this.applyConflictRule(customRule, [targetValue, sourceValue], [priorityInfo]);
            resolutionStrategy = 'custom';
        }
        else {
            // Apply default strategy
            switch (strategy) {
                case InheritanceStrategy.MERGE:
                    resolvedValue = this.mergeValues(targetValue, sourceValue);
                    resolutionStrategy = 'merge';
                    break;
                case InheritanceStrategy.APPEND:
                    resolvedValue = this.appendValues(targetValue, sourceValue);
                    resolutionStrategy = 'merge';
                    break;
                case InheritanceStrategy.INTERSECT:
                    resolvedValue = this.intersectValues(targetValue, sourceValue);
                    resolutionStrategy = 'merge';
                    break;
                default:
                    // OVERRIDE strategy - source wins
                    resolvedValue = sourceValue;
                    break;
            }
        }
        return {
            parameter,
            templates: ['target', 'source'],
            values: [targetValue, sourceValue],
            resolvedValue,
            resolutionStrategy,
            reason: `Resolution using ${strategy} strategy from ${priorityInfo.category}`
        };
    }
    /**
     * Merge values intelligently
     */
    mergeValues(target, source) {
        // If values are the same, return source
        if (JSON.stringify(target) === JSON.stringify(source)) {
            return source;
        }
        // Array merging
        if (Array.isArray(target) && Array.isArray(source)) {
            return [...new Set([...target, ...source])];
        }
        // Object merging
        if (typeof target === 'object' && typeof source === 'object' &&
            target !== null && source !== null) {
            return { ...target, ...source };
        }
        // Default: return source (higher priority)
        return source;
    }
    /**
     * Append values
     */
    appendValues(target, source) {
        if (Array.isArray(target) && Array.isArray(source)) {
            return [...target, ...source];
        }
        if (typeof target === 'string' && typeof source === 'string') {
            return target + source;
        }
        return source;
    }
    /**
     * Intersect values
     */
    intersectValues(target, source) {
        if (Array.isArray(target) && Array.isArray(source)) {
            return target.filter(value => source.includes(value));
        }
        if (typeof target === 'object' && typeof source === 'object' &&
            target !== null && source !== null) {
            const result = {};
            for (const key of Object.keys(target)) {
                if (key in source) {
                    result[key] = source[key];
                }
            }
            return result;
        }
        return target;
    }
    /**
     * Validate inheritance structure
     */
    async validateInheritanceStructure(templateName, options) {
        const errors = [];
        // Check for circular dependencies
        const circularDeps = this.detectCircularDependencies(templateName);
        for (const circDep of circularDeps) {
            if (circDep.severity === 'error') {
                errors.push({
                    code: 'CIRCULAR_DEPENDENCY',
                    message: circDep.message,
                    template: templateName,
                    severity: 'error'
                });
            }
        }
        // Check inheritance depth
        const depth = this.calculateInheritanceDepth(templateName);
        const maxDepth = options.maxInheritanceDepth || 10;
        if (depth > maxDepth) {
            errors.push({
                code: 'MAX_DEPTH_EXCEEDED',
                message: `Inheritance depth ${depth} exceeds maximum allowed depth of ${maxDepth}`,
                template: templateName,
                severity: 'warning'
            });
        }
        return errors;
    }
    /**
     * Detect circular dependencies
     */
    detectCircularDependencies(templateName) {
        const circularDeps = [];
        const visited = new Set();
        const recursionStack = new Set();
        const path = [];
        const detectCycle = (nodeName) => {
            visited.add(nodeName);
            recursionStack.add(nodeName);
            path.push(nodeName);
            const node = this.inheritanceGraph.get(nodeName);
            if (node) {
                for (const parentName of node.parents) {
                    if (!visited.has(parentName)) {
                        detectCycle(parentName);
                    }
                    else if (recursionStack.has(parentName)) {
                        // Circular dependency found
                        const cycleStart = path.indexOf(parentName);
                        const cycle = path.slice(cycleStart);
                        circularDeps.push({
                            chain: [...cycle, parentName],
                            cycleStart,
                            severity: 'error',
                            resolution: 'break_cycle',
                            message: `Circular dependency: ${cycle.join(' -> ')} -> ${parentName}`
                        });
                    }
                }
            }
            recursionStack.delete(nodeName);
            path.pop();
        };
        detectCycle(templateName);
        return circularDeps;
    }
    /**
     * Calculate inheritance depth
     */
    calculateInheritanceDepth(templateName) {
        const node = this.inheritanceGraph.get(templateName);
        return node ? node.depth : 0;
    }
    /**
     * Get all dependencies for a template
     */
    getAllDependencies(templateName) {
        const dependencies = new Set();
        const visited = new Set();
        const collectDependencies = (nodeName) => {
            if (visited.has(nodeName))
                return;
            visited.add(nodeName);
            const node = this.inheritanceGraph.get(nodeName);
            if (node) {
                for (const parentName of node.parents) {
                    dependencies.add(parentName);
                    collectDependencies(parentName);
                }
            }
        };
        collectDependencies(templateName);
        return Array.from(dependencies);
    }
    /**
     * Analyze parameter conflicts
     */
    async analyzeParameterConflicts(templateName) {
        // This would analyze potential conflicts before resolution
        // Implementation would simulate the merge process
        return [];
    }
    /**
     * Calculate merge complexity
     */
    calculateMergeComplexity(templateName) {
        const node = this.inheritanceGraph.get(templateName);
        if (!node)
            return 0;
        let complexity = 0;
        const visited = new Set();
        const calculateComplexity = (nodeName) => {
            if (visited.has(nodeName))
                return 0;
            visited.add(nodeName);
            const currentNode = this.inheritanceGraph.get(nodeName);
            let nodeComplexity = Object.keys(currentNode.template.configuration || {}).length;
            for (const parentName of currentNode.parents) {
                nodeComplexity += calculateComplexity(parentName);
            }
            return nodeComplexity;
        };
        complexity = calculateComplexity(templateName);
        return complexity;
    }
    /**
     * Estimate processing time
     */
    estimateProcessingTime(templateName, complexity) {
        // Simple estimation based on complexity
        return Math.max(10, complexity * 0.1); // Minimum 10ms
    }
    /**
     * Generate optimization recommendations
     */
    generateRecommendations(templateName, depth, dependencies, circularDeps, conflicts) {
        const recommendations = [];
        if (depth > 5) {
            recommendations.push('Consider reducing inheritance depth for better performance');
        }
        if (dependencies.length > 10) {
            recommendations.push('High number of dependencies may impact maintainability');
        }
        if (circularDeps.length > 0) {
            recommendations.push('Resolve circular dependencies to ensure proper template resolution');
        }
        if (conflicts.length > 20) {
            recommendations.push('Many parameter conflicts detected - consider template restructuring');
        }
        return recommendations;
    }
    /**
     * Find template by priority info
     */
    findTemplateByPriority(priorityInfo) {
        // This would need to be implemented based on registry structure
        // For now, return a placeholder
        return priorityInfo.source || priorityInfo.category;
    }
    /**
     * Find conflict rule for parameter
     */
    findConflictRule(parameter) {
        for (const [pattern, rules] of this.conflictRules) {
            const regex = new RegExp(pattern);
            if (regex.test(parameter)) {
                return rules[0]; // Return first matching rule
            }
        }
        return undefined;
    }
    /**
     * Apply conflict rule
     */
    async applyConflictRule(rule, values, contexts) {
        if (rule.customResolver) {
            return rule.customResolver(values, contexts);
        }
        switch (rule.strategy) {
            case InheritanceStrategy.MERGE:
                return this.mergeValues(values[0], values[1]);
            case InheritanceStrategy.APPEND:
                return this.appendValues(values[0], values[1]);
            case InheritanceStrategy.INTERSECT:
                return this.intersectValues(values[0], values[1]);
            default:
                return values[values.length - 1]; // Last value (highest priority)
        }
    }
    /**
     * Initialize default conflict rules
     */
    initializeDefaultConflictRules() {
        // Array parameters should be merged
        this.conflictRules.set('.*List$|.*Array$|.*Items$', [{
                parameterPattern: /.*List$|.*Array$|.*Items$/,
                strategy: InheritanceStrategy.MERGE,
                priority: 'highest'
            }]);
        // Boolean parameters should use AND logic
        this.conflictRules.set('.*Enabled$|.*Active$|.*Flag$', [{
                parameterPattern: /.*Enabled$|.*Active$|.*Flag$/,
                strategy: InheritanceStrategy.CUSTOM,
                customResolver: (values) => values.some(v => v === true),
                priority: 'highest'
            }]);
        // Numeric parameters should use highest
        this.conflictRules.set('.*Threshold$|.*Limit$|.*Max$|.*Min$', [{
                parameterPattern: /.*Threshold$|.*Limit$|.*Max$|.*Min$/,
                strategy: InheritanceStrategy.CUSTOM,
                customResolver: (values) => Math.max(...values.filter(v => typeof v === 'number')),
                priority: 'highest'
            }]);
    }
    /**
     * Generate resolution cache key
     */
    generateResolutionCacheKey(templateName, options) {
        const optionsHash = JSON.stringify(options);
        return `${templateName}:${Buffer.from(optionsHash).toString('base64')}`;
    }
    /**
     * Clear all caches
     */
    clearCaches() {
        this.resolutionCache.clear();
        this.analysisCache.clear();
    }
    /**
     * Get inheritance graph statistics
     */
    getGraphStats() {
        let totalEdges = 0;
        let maxDepth = 0;
        let totalBranching = 0;
        for (const node of this.inheritanceGraph.values()) {
            totalEdges += node.parents.size;
            maxDepth = Math.max(maxDepth, node.depth);
            totalBranching += node.children.size;
        }
        return {
            totalNodes: this.inheritanceGraph.size,
            totalEdges,
            maxDepth,
            circularDependencies: 0,
            averageBranchingFactor: this.inheritanceGraph.size > 0 ? totalBranching / this.inheritanceGraph.size : 0
        };
    }
}
exports.InheritanceResolver = InheritanceResolver;
//# sourceMappingURL=inheritance-resolver.js.map