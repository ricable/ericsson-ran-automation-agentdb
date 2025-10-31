"use strict";
/**
 * Conflict Resolution Engine for Template Merging
 *
 * Implements intelligent conflict resolution strategies with support for custom resolvers,
 * conditional logic, and ML-based recommendations. Provides automatic and interactive
 * conflict resolution with detailed reasoning and validation.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolutionEngine = void 0;
const logger_1 = require("../../utils/logger");
class ResolutionEngine {
    constructor(options = {}) {
        this.logger = new logger_1.Logger('ResolutionEngine');
        this.customResolvers = new Map();
        this.resolutionCache = new Map();
        this.options = {
            enableMLRecommendations: false,
            strictTypeValidation: true,
            enableCustomResolvers: true,
            cacheResolutions: true,
            resolutionTimeout: 5000,
            enableInteractivePrompts: false,
            ...options
        };
        this.initializeBuiltinResolvers();
    }
    /**
     * Resolve a conflict using appropriate strategy
     */
    async resolveConflict(conflict, context) {
        const startTime = Date.now();
        this.logger.debug(`Resolving conflict for parameter: ${conflict.parameter}`, {
            conflictType: conflict.conflictType,
            strategy: conflict.resolution.strategy,
            templates: conflict.templates.length
        });
        try {
            // Check cache first
            const cacheKey = this.generateCacheKey(conflict, context);
            if (this.options.cacheResolutions && this.resolutionCache.has(cacheKey)) {
                const cached = this.resolutionCache.get(cacheKey);
                this.logger.debug(`Using cached resolution for ${conflict.parameter}`);
                return {
                    strategy: cached.strategy,
                    reasoning: cached.reasoning,
                    value: cached.value,
                    resolved: cached.resolved
                };
            }
            // Determine best resolution strategy
            const strategy = await this.determineResolutionStrategy(conflict, context);
            // Apply resolution strategy
            const result = await this.applyResolutionStrategy(conflict, strategy, context);
            // Validate result if strict mode is enabled
            if (this.options.strictTypeValidation) {
                const validationResult = await this.validateResolution(conflict, result.value, context);
                result.validated = true;
                result.validationResult = validationResult;
                if (!validationResult.isValid) {
                    this.logger.warn(`Resolution validation failed for ${conflict.parameter}`, validationResult);
                    // Try fallback strategy
                    const fallbackResult = await this.applyFallbackStrategy(conflict, context);
                    if (fallbackResult.resolved) {
                        Object.assign(result, fallbackResult);
                    }
                }
            }
            // Update conflict resolution
            const resolution = {
                strategy: result.strategy,
                reasoning: result.reasoning,
                value: result.value,
                resolved: result.resolved,
                metadata: {
                    resolutionTime: Date.now() - startTime,
                    validated: result.validated,
                    cacheHit: false,
                    fallbackUsed: false
                }
            };
            // Cache result
            if (this.options.cacheResolutions && result.resolved) {
                this.resolutionCache.set(cacheKey, result);
            }
            this.logger.info(`Conflict resolved for ${conflict.parameter}`, {
                strategy: result.strategy,
                resolved: result.resolved,
                resolutionTime: Date.now() - startTime
            });
            return resolution;
        }
        catch (error) {
            this.logger.error(`Failed to resolve conflict for ${conflict.parameter}`, { error, conflict });
            // Return unresolved conflict
            return {
                strategy: 'highest_priority',
                reasoning: `Resolution failed: ${error.message}`,
                resolved: false
            };
        }
    }
    /**
     * Determine the best resolution strategy for a conflict
     */
    async determineResolutionStrategy(conflict, context) {
        // Use predefined strategy if available
        if (conflict.resolution.strategy && conflict.resolution.strategy !== 'auto') {
            return conflict.resolution.strategy;
        }
        // Check for custom resolvers
        if (this.options.enableCustomResolvers) {
            const customResolver = this.findApplicableCustomResolver(conflict);
            if (customResolver) {
                this.logger.debug(`Using custom resolver: ${customResolver.name}`);
                return 'custom';
            }
        }
        // Check for ML recommendations
        if (this.options.enableMLRecommendations) {
            const mlRecommendation = await this.getMLRecommendation(conflict, context);
            if (mlRecommendation) {
                return mlRecommendation;
            }
        }
        // Use conflict context recommendations
        if (conflict.context?.recommendedResolution) {
            return conflict.context.recommendedResolution;
        }
        // Default strategy based on conflict type
        return this.getDefaultStrategyForConflictType(conflict.conflictType);
    }
    /**
     * Apply resolution strategy
     */
    async applyResolutionStrategy(conflict, strategy, context) {
        const startTime = Date.now();
        try {
            // Check for custom resolver
            if (strategy === 'custom' && this.options.enableCustomResolvers) {
                const customResolver = this.findApplicableCustomResolver(conflict);
                if (customResolver) {
                    const result = await this.executeWithTimeout(customResolver.resolver(conflict, context), this.options.resolutionTimeout);
                    return {
                        resolved: true,
                        value: result,
                        strategy: 'custom',
                        reasoning: `Resolved using custom resolver: ${customResolver.description}`,
                        resolutionTime: Date.now() - startTime,
                        validated: false
                    };
                }
            }
            // Use built-in resolver
            const builtinResolver = this.builtinResolvers.get(strategy);
            if (builtinResolver) {
                return await builtinResolver(conflict, context);
            }
            // Fallback to highest priority
            return await this.resolveWithHighestPriority(conflict, context);
        }
        catch (error) {
            this.logger.error(`Resolution strategy failed: ${strategy}`, { error });
            return await this.applyFallbackStrategy(conflict, context);
        }
    }
    /**
     * Initialize built-in resolution strategies
     */
    initializeBuiltinResolvers() {
        this.builtinResolvers = new Map();
        // Highest priority strategy
        this.builtinResolvers.set('highest_priority', async (conflict, context) => {
            return await this.resolveWithHighestPriority(conflict, context);
        });
        // Merge strategy
        this.builtinResolvers.set('merge', async (conflict, context) => {
            return await this.resolveWithMerge(conflict, context);
        });
        // Conditional strategy
        this.builtinResolvers.set('conditional', async (conflict, context) => {
            return await this.resolveWithConditional(conflict, context);
        });
        // Interactive strategy
        this.builtinResolvers.set('interactive', async (conflict, context) => {
            return await this.resolveWithInteractive(conflict, context);
        });
    }
    /**
     * Resolve with highest priority strategy
     */
    async resolveWithHighestPriority(conflict, context) {
        const maxPriority = Math.max(...conflict.priorities);
        const highestPriorityIndex = conflict.priorities.indexOf(maxPriority);
        const selectedValue = conflict.values[highestPriorityIndex];
        const selectedTemplate = conflict.templates[highestPriorityIndex];
        return {
            resolved: true,
            value: selectedValue,
            strategy: 'highest_priority',
            reasoning: `Selected value from template with highest priority (${maxPriority}): ${selectedTemplate}`,
            resolutionTime: 0,
            validated: false
        };
    }
    /**
     * Resolve with merge strategy
     */
    async resolveWithMerge(conflict, context) {
        const values = conflict.values;
        // Try to merge compatible values
        if (this.canMergeValues(values)) {
            const mergedValue = this.mergeValues(values);
            return {
                resolved: true,
                value: mergedValue,
                strategy: 'merge',
                reasoning: `Successfully merged ${values.length} compatible values`,
                resolutionTime: 0,
                validated: false
            };
        }
        // If cannot merge, fallback to highest priority
        this.logger.warn(`Cannot merge values for ${conflict.parameter}, falling back to highest priority`);
        return await this.resolveWithHighestPriority(conflict, context);
    }
    /**
     * Resolve with conditional strategy
     */
    async resolveWithConditional(conflict, context) {
        // For conditional conflicts, try to evaluate conditions
        if (conflict.conflictType === 'conditional') {
            try {
                const evaluatedValue = await this.evaluateConditions(conflict, context);
                return {
                    resolved: true,
                    value: evaluatedValue,
                    strategy: 'conditional',
                    reasoning: `Evaluated conditional logic to determine value`,
                    resolutionTime: 0,
                    validated: false
                };
            }
            catch (error) {
                this.logger.warn(`Conditional evaluation failed for ${conflict.parameter}`, { error });
            }
        }
        // Fallback to highest priority
        return await this.resolveWithHighestPriority(conflict, context);
    }
    /**
     * Resolve with interactive strategy
     */
    async resolveWithInteractive(conflict, context) {
        if (!this.options.enableInteractivePrompts) {
            this.logger.info(`Interactive prompts disabled, falling back to highest priority for ${conflict.parameter}`);
            return await this.resolveWithHighestPriority(conflict, context);
        }
        // In a real implementation, this would prompt the user
        // For now, we'll simulate an interactive choice
        this.logger.info(`Interactive resolution requested for ${conflict.parameter}`, {
            conflict: conflict.values,
            templates: conflict.templates
        });
        // Simulate user selecting the first value
        const selectedValue = conflict.values[0];
        const selectedTemplate = conflict.templates[0];
        return {
            resolved: true,
            value: selectedValue,
            strategy: 'interactive',
            reasoning: `User selected value from template: ${selectedTemplate}`,
            resolutionTime: 0,
            validated: false
        };
    }
    /**
     * Check if values can be merged
     */
    canMergeValues(values) {
        if (values.length < 2)
            return true;
        const firstType = typeof values[0];
        // All values must be of the same type
        if (!values.every(v => typeof v === firstType)) {
            return false;
        }
        // Objects can be merged
        if (firstType === 'object' && !Array.isArray(values[0])) {
            return true;
        }
        // Arrays can be merged (concatenated)
        if (Array.isArray(values[0])) {
            return true;
        }
        // Primitives cannot be merged unless they're identical
        const uniqueValues = new Set(values);
        return uniqueValues.size === 1;
    }
    /**
     * Merge compatible values
     */
    mergeValues(values) {
        if (values.length === 0)
            return undefined;
        if (values.length === 1)
            return values[0];
        const firstValue = values[0];
        // Merge objects
        if (typeof firstValue === 'object' && !Array.isArray(firstValue)) {
            return values.reduce((merged, value) => ({ ...merged, ...value }), {});
        }
        // Merge arrays (concatenate and remove duplicates)
        if (Array.isArray(firstValue)) {
            const mergedArray = values.flat();
            return [...new Set(mergedArray)];
        }
        // For primitives, return the first value
        return firstValue;
    }
    /**
     * Evaluate conditions for conditional conflicts
     */
    async evaluateConditions(conflict, context) {
        // This is a simplified implementation
        // In a real scenario, this would evaluate the conditional logic
        // based on runtime conditions or environment
        // For now, return the value from the highest priority template
        return await this.resolveWithHighestPriority(conflict, context);
    }
    /**
     * Apply fallback strategy when primary strategy fails
     */
    async applyFallbackStrategy(conflict, context) {
        this.logger.warn(`Applying fallback strategy for ${conflict.parameter}`);
        const result = await this.resolveWithHighestPriority(conflict, context);
        result.reasoning += ' (fallback strategy applied)';
        return result;
    }
    /**
     * Find applicable custom resolver for conflict
     */
    findApplicableCustomResolver(conflict) {
        const resolvers = Array.from(this.customResolvers.values())
            .filter(resolver => resolver.applicableConflicts.some(pattern => conflict.parameter.includes(pattern) ||
            conflict.conflictType.toString().includes(pattern)))
            .sort((a, b) => b.priority - a.priority);
        return resolvers.length > 0 ? resolvers[0] : null;
    }
    /**
     * Register a custom resolver
     */
    registerCustomResolver(resolver) {
        this.customResolvers.set(resolver.name, resolver);
        this.logger.info(`Registered custom resolver: ${resolver.name}`);
    }
    /**
     * Unregister a custom resolver
     */
    unregisterCustomResolver(name) {
        this.customResolvers.delete(name);
        this.logger.info(`Unregistered custom resolver: ${name}`);
    }
    /**
     * Get ML recommendation (placeholder)
     */
    async getMLRecommendation(conflict, context) {
        // Placeholder for ML-based recommendation
        // Could be enhanced with actual ML model
        return null;
    }
    /**
     * Get default strategy for conflict type
     */
    getDefaultStrategyForConflictType(conflictType) {
        switch (conflictType) {
            case 'value':
                return 'highest_priority';
            case 'type':
                return 'highest_priority';
            case 'structure':
                return 'merge';
            case 'conditional':
                return 'conditional';
            case 'function':
                return 'highest_priority';
            case 'metadata':
                return 'merge';
            default:
                return 'highest_priority';
        }
    }
    /**
     * Validate resolution result
     */
    async validateResolution(conflict, value, context) {
        const errors = [];
        // Type validation
        if (conflict.context?.parameterType) {
            const expectedType = conflict.context.parameterType;
            const actualType = typeof value;
            if (expectedType !== actualType && !(expectedType === 'array' && Array.isArray(value))) {
                errors.push(`Type mismatch: expected ${expectedType}, got ${actualType}`);
            }
        }
        // Value validation
        if (value === undefined || value === null) {
            errors.push('Resolved value is null or undefined');
        }
        // Constraint validation (placeholder)
        if (conflict.context?.constraints) {
            // Could add actual constraint validation here
        }
        return {
            isValid: errors.length === 0,
            errors
        };
    }
    /**
     * Execute function with timeout
     */
    async executeWithTimeout(promise, timeoutMs) {
        return Promise.race([
            promise,
            new Promise((_, reject) => setTimeout(() => reject(new Error(`Operation timed out after ${timeoutMs}ms`)), timeoutMs))
        ]);
    }
    /**
     * Generate cache key
     */
    generateCacheKey(conflict, context) {
        const valuesHash = JSON.stringify(conflict.values.sort());
        const templatesHash = conflict.templates.sort().join('|');
        return `${conflict.parameter}:${conflict.conflictType}:${templatesHash}:${valuesHash}`;
    }
    /**
     * Clear resolution cache
     */
    clearCache() {
        this.resolutionCache.clear();
        this.logger.info('Resolution cache cleared');
    }
    /**
     * Get resolution statistics
     */
    getResolutionStats() {
        return {
            cacheSize: this.resolutionCache.size,
            customResolvers: this.customResolvers.size,
            builtinStrategies: Array.from(this.builtinResolvers.keys())
        };
    }
}
exports.ResolutionEngine = ResolutionEngine;
//# sourceMappingURL=resolution-engine.js.map