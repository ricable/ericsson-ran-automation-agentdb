"use strict";
/**
 * Priority Template Engine - Core Implementation
 *
 * Implements the main hierarchical template inheritance engine with priority-based
 * conflict resolution, template merging, and variant generation capabilities.
 *
 * Features:
 * - Priority-based template inheritance (0-80 priority levels)
 * - Intelligent conflict resolution with multiple strategies
 * - Template caching and performance optimization
 * - Comprehensive validation and error handling
 * - Event-driven processing with metrics
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriorityTemplateEngine = void 0;
const interfaces_1 = require("./interfaces");
const components_1 = require("./components");
const lru_cache_1 = require("lru-cache");
/**
 * Main Priority Template Engine implementation
 */
class PriorityTemplateEngine {
    constructor(config) {
        this.templates = new Map();
        this.metrics = new Map();
        this.config = {
            cachingEnabled: true,
            maxCacheSize: 1000,
            defaultConflictStrategy: interfaces_1.ConflictResolutionStrategy.HIGHEST_PRIORITY_WINS,
            parallelProcessing: true,
            maxConcurrentOperations: 10,
            validationStrictness: 'strict',
            performanceMonitoring: true,
            detailedLogging: false,
            ...config
        };
        // Initialize LRU cache for inheritance chains
        this.inheritanceCache = new lru_cache_1.LRUCache({
            max: this.config.maxCacheSize,
            ttl: 1000 * 60 * 15,
            updateAgeOnGet: true
        });
        // Initialize event bus
        this.eventBus = new components_1.TemplateEventBus();
        // Initialize components
        this.initializeComponents();
    }
    /**
     * Register a new template with the engine
     */
    async registerTemplate(template) {
        const startTime = Date.now();
        try {
            // Validate template before registration
            const validationResult = await this.validateTemplate(template);
            if (!validationResult.isValid) {
                throw new interfaces_1.TemplateValidationError(`Template validation failed: ${validationResult.errors.map(e => e.message).join(', ')}`, template.meta.version, validationResult.errors);
            }
            // Check for existing template
            if (this.templates.has(template.meta.version)) {
                console.warn(`[PriorityTemplateEngine] Overriding existing template: ${template.meta.version}`);
            }
            // Store template
            this.templates.set(template.meta.version, template);
            // Clear related cache entries
            this.clearCacheForTemplate(template.meta.version);
            // Record metrics
            const processingTime = Date.now() - startTime;
            this.recordMetrics(template.meta.version, processingTime);
            // Emit event
            await this.emitEvent({
                eventType: 'template_registered',
                templateId: template.meta.version,
                timestamp: new Date(),
                data: { template, validationResult },
                processingTime
            });
            console.log(`[PriorityTemplateEngine] Registered template: ${template.meta.version} (Priority: ${template.priority})`);
        }
        catch (error) {
            await this.emitEvent({
                eventType: 'template_registered',
                templateId: template.meta.version,
                timestamp: new Date(),
                data: { template, error },
                error: error
            });
            throw error;
        }
    }
    /**
     * Resolve template inheritance chain
     */
    async resolveInheritance(templateId) {
        const startTime = Date.now();
        // Check cache first
        if (this.config.cachingEnabled && this.inheritanceCache.has(templateId)) {
            const cached = this.inheritanceCache.get(templateId);
            this.updateCacheMetrics(templateId, true);
            return cached;
        }
        try {
            const template = await this.getTemplate(templateId);
            if (!template) {
                throw new interfaces_1.TemplateSystemError(`Template not found: ${templateId}`, 'TEMPLATE_NOT_FOUND', templateId);
            }
            // Build inheritance chain
            const chain = await this.buildInheritanceChain(template);
            // Resolve conflicts
            chain.conflicts = await this.conflictResolver.detectConflicts(chain.chain.map(link => this.templates.get(link.templateId)).filter(Boolean));
            // Resolve detected conflicts
            if (chain.conflicts.length > 0) {
                chain.conflicts = await Promise.all(chain.conflicts.map(conflict => this.conflictResolver.resolveConflict(conflict, template.conflictResolution || this.config.defaultConflictStrategy)));
            }
            // Cache the result
            if (this.config.cachingEnabled) {
                this.inheritanceCache.set(templateId, chain);
            }
            // Record metrics
            const processingTime = Date.now() - startTime;
            this.recordMetrics(templateId, processingTime);
            // Emit event
            await this.emitEvent({
                eventType: 'template_resolved',
                templateId,
                timestamp: new Date(),
                data: { chain, conflictCount: chain.conflicts.length },
                processingTime
            });
            this.updateCacheMetrics(templateId, false);
            return chain;
        }
        catch (error) {
            await this.emitEvent({
                eventType: 'template_resolved',
                templateId,
                timestamp: new Date(),
                data: { error },
                error: error
            });
            throw error;
        }
    }
    /**
     * Merge multiple templates with conflict resolution
     */
    async mergeTemplates(templateIds, strategy = this.config.defaultConflictStrategy) {
        const startTime = Date.now();
        try {
            // Get all templates
            const templates = await Promise.all(templateIds.map(id => this.getTemplate(id)));
            const validTemplates = templates.filter(Boolean);
            if (validTemplates.length === 0) {
                throw new interfaces_1.TemplateSystemError('No valid templates found for merging', 'NO_TEMPLATES_FOUND');
            }
            // Validate all templates
            for (const template of validTemplates) {
                const validation = await this.validateTemplate(template);
                if (!validation.isValid) {
                    throw new interfaces_1.TemplateValidationError(`Template ${template.meta.version} validation failed`, template.meta.version, validation.errors);
                }
            }
            // Merge templates
            const mergedTemplate = await this.templateMerger.merge(validTemplates, strategy);
            // Cache the merged template
            const mergedId = `merged_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            await this.registerTemplate({
                ...mergedTemplate,
                meta: {
                    ...mergedTemplate.meta,
                    version: mergedId,
                    description: `Merged template from ${templateIds.join(', ')}`
                }
            });
            // Record metrics
            const processingTime = Date.now() - startTime;
            this.recordMetrics(mergedId, processingTime);
            // Emit event
            await this.emitEvent({
                eventType: 'template_merged',
                templateId: mergedId,
                timestamp: new Date(),
                data: { sourceTemplates: templateIds, strategy, mergedTemplate },
                processingTime
            });
            console.log(`[PriorityTemplateEngine] Merged ${templateIds.length} templates into ${mergedId}`);
            return mergedTemplate;
        }
        catch (error) {
            await this.emitEvent({
                eventType: 'template_merged',
                templateId: 'merge_failed',
                timestamp: new Date(),
                data: { templateIds, strategy, error },
                error: error
            });
            throw error;
        }
    }
    /**
     * Generate variant from base template
     */
    async generateVariant(config) {
        const startTime = Date.now();
        try {
            // Get base template
            const baseTemplate = await this.getTemplate(config.baseTemplateId);
            if (!baseTemplate) {
                throw new interfaces_1.TemplateSystemError(`Base template not found: ${config.baseTemplateId}`, 'BASE_TEMPLATE_NOT_FOUND', config.baseTemplateId);
            }
            // Generate variant
            const variantTemplate = await this.variantGenerator.generateCustomVariant(baseTemplate, config);
            // Register variant
            await this.registerTemplate(variantTemplate);
            // Record metrics
            const processingTime = Date.now() - startTime;
            this.recordMetrics(variantTemplate.meta.version, processingTime);
            // Emit event
            await this.emitEvent({
                eventType: 'template_registered',
                templateId: variantTemplate.meta.version,
                timestamp: new Date(),
                data: { config, baseTemplate: config.baseTemplateId, variantTemplate },
                processingTime
            });
            console.log(`[PriorityTemplateEngine] Generated variant: ${variantTemplate.meta.version} from ${config.baseTemplateId}`);
            return variantTemplate;
        }
        catch (error) {
            await this.emitEvent({
                eventType: 'template_registered',
                templateId: 'variant_generation_failed',
                timestamp: new Date(),
                data: { config, error },
                error: error
            });
            throw error;
        }
    }
    /**
     * Validate template against constraints
     */
    async validateTemplate(template) {
        const startTime = Date.now();
        try {
            const validationResult = await this.validator.validate(template);
            // Record metrics
            const processingTime = Date.now() - startTime;
            this.recordMetrics(template.meta.version, processingTime);
            // Emit event
            await this.emitEvent({
                eventType: 'template_validated',
                templateId: template.meta.version,
                timestamp: new Date(),
                data: { template, validationResult },
                processingTime
            });
            return validationResult;
        }
        catch (error) {
            await this.emitEvent({
                eventType: 'template_validated',
                templateId: template.meta.version,
                timestamp: new Date(),
                data: { template, error },
                error: error
            });
            throw error;
        }
    }
    /**
     * Get template by ID
     */
    async getTemplate(templateId) {
        return this.templates.get(templateId) || null;
    }
    /**
     * List templates with optional filtering
     */
    async listTemplates(filter) {
        let templates = Array.from(this.templates.values());
        if (filter) {
            templates = templates.filter(template => {
                if (filter.priority && template.priority !== filter.priority)
                    return false;
                if (filter.variantType && template.meta.variantType !== filter.variantType)
                    return false;
                if (filter.frequencyBand && template.meta.frequencyBand !== filter.frequencyBand)
                    return false;
                if (filter.author && !template.meta.author.includes(filter.author))
                    return false;
                if (filter.tags && !filter.tags.some(tag => template.meta.tags?.includes(tag)))
                    return false;
                if (filter.dateRange) {
                    const templateDate = new Date(template.meta.description); // This should use a proper timestamp field
                    if (templateDate < filter.dateRange.start || templateDate > filter.dateRange.end)
                        return false;
                }
                return true;
            });
        }
        // Sort by priority (lowest number = highest priority)
        templates.sort((a, b) => a.priority - b.priority);
        return templates;
    }
    /**
     * Delete template
     */
    async deleteTemplate(templateId) {
        const deleted = this.templates.delete(templateId);
        if (deleted) {
            // Clear cache entries
            this.clearCacheForTemplate(templateId);
            // Remove metrics
            this.metrics.delete(templateId);
            console.log(`[PriorityTemplateEngine] Deleted template: ${templateId}`);
        }
        return deleted;
    }
    /**
     * Get processing metrics for a template
     */
    getMetrics(templateId) {
        return this.metrics.get(templateId);
    }
    /**
     * Get all processing metrics
     */
    getAllMetrics() {
        return Array.from(this.metrics.values());
    }
    /**
     * Clear all caches
     */
    clearCache() {
        this.inheritanceCache.clear();
        console.log('[PriorityTemplateEngine] Cleared all caches');
    }
    /**
     * Get engine statistics
     */
    getStats() {
        const metrics = Array.from(this.metrics.values());
        const totalTime = metrics.reduce((sum, m) => sum + m.processingTime, 0);
        const avgTime = metrics.length > 0 ? totalTime / metrics.length : 0;
        return {
            templateCount: this.templates.size,
            cacheSize: this.inheritanceCache.size,
            cacheHitRate: this.calculateCacheHitRate(),
            totalProcessingTime: totalTime,
            averageProcessingTime: avgTime
        };
    }
    // ============================================================================
    // PRIVATE METHODS
    // ============================================================================
    /**
     * Initialize component dependencies
     */
    initializeComponents() {
        this.variantGenerator = new components_1.TemplateVariantGenerator(this.config);
        this.templateMerger = new components_1.TemplateMerger(this.config);
        this.conflictResolver = new components_1.TemplateConflictResolver(this.config);
        this.validator = new components_1.TemplateValidator(this.config);
    }
    /**
     * Build inheritance chain for a template
     */
    async buildInheritanceChain(template) {
        const chain = {
            templateId: template.meta.version,
            chain: [],
            resolvedTemplate: template,
            conflicts: [],
            warnings: [],
            processingTime: 0
        };
        const visited = new Set();
        const processingStack = [];
        await this.buildChainRecursive(template, chain, visited, processingStack);
        // Sort chain by priority (lowest number = highest priority)
        chain.chain.sort((a, b) => a.priority - b.priority);
        return chain;
    }
    /**
     * Recursively build inheritance chain
     */
    async buildChainRecursive(template, chain, visited, processingStack) {
        const templateId = template.meta.version;
        // Check for circular dependencies
        if (processingStack.includes(templateId)) {
            throw new interfaces_1.TemplateInheritanceError(`Circular dependency detected: ${processingStack.join(' -> ')} -> ${templateId}`, templateId, processingStack, processingStack);
        }
        if (visited.has(templateId)) {
            return;
        }
        visited.add(templateId);
        processingStack.push(templateId);
        try {
            // Process parent templates
            const parentIds = Array.isArray(template.meta.inherits_from)
                ? template.meta.inherits_from
                : template.meta.inherits_from
                    ? [template.meta.inherits_from]
                    : [];
            for (const parentId of parentIds) {
                const parentTemplate = await this.getTemplate(parentId);
                if (parentTemplate) {
                    await this.buildChainRecursive(parentTemplate, chain, visited, processingStack);
                }
                else {
                    chain.warnings.push({
                        warningId: `missing_parent_${parentId}`,
                        level: 'warning',
                        message: `Parent template not found: ${parentId}`,
                        templateId
                    });
                }
            }
            // Add current template to chain
            chain.chain.push({
                templateId,
                priority: template.priority,
                appliedAt: new Date(),
                appliedParameters: Object.keys(template.configuration),
                overriddenParameters: [],
                conflicts: []
            });
        }
        finally {
            processingStack.pop();
        }
    }
    /**
     * Clear cache entries for a specific template
     */
    clearCacheForTemplate(templateId) {
        // Remove from inheritance cache (both as key and in chain dependencies)
        for (const [key, chain] of this.inheritanceCache.entries()) {
            if (key === templateId || chain.chain.some(link => link.templateId === templateId)) {
                this.inheritanceCache.delete(key);
            }
        }
    }
    /**
     * Record processing metrics
     */
    recordMetrics(templateId, processingTime) {
        if (!this.config.performanceMonitoring)
            return;
        const existingMetrics = this.metrics.get(templateId);
        const metrics = {
            templateId,
            processingTime,
            memoryUsage: process.memoryUsage().heapUsed,
            parameterCount: 0,
            conflictCount: 0,
            warningCount: 0,
            cacheHits: existingMetrics?.cacheHits || 0,
            cacheMisses: existingMetrics?.cacheMisses || 0
        };
        this.metrics.set(templateId, metrics);
    }
    /**
     * Update cache metrics
     */
    updateCacheMetrics(templateId, isHit) {
        if (!this.config.performanceMonitoring)
            return;
        const metrics = this.metrics.get(templateId);
        if (metrics) {
            if (isHit) {
                metrics.cacheHits++;
            }
            else {
                metrics.cacheMisses++;
            }
            this.metrics.set(templateId, metrics);
        }
    }
    /**
     * Calculate cache hit rate
     */
    calculateCacheHitRate() {
        const totalHits = Array.from(this.metrics.values()).reduce((sum, m) => sum + m.cacheHits, 0);
        const totalMisses = Array.from(this.metrics.values()).reduce((sum, m) => sum + m.cacheMisses, 0);
        const total = totalHits + totalMisses;
        return total > 0 ? totalHits / total : 0;
    }
    /**
     * Emit processing event
     */
    async emitEvent(event) {
        try {
            await this.eventBus.publish(event);
        }
        catch (error) {
            console.error('[PriorityTemplateEngine] Error emitting event:', error);
        }
    }
}
exports.PriorityTemplateEngine = PriorityTemplateEngine;
//# sourceMappingURL=priority-template-engine.js.map