"use strict";
/**
 * Template Registry - Centralized Template Storage and Management
 *
 * Provides efficient storage, retrieval, indexing, and metadata management
 * for RTB templates with priority-based organization.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateRegistry = void 0;
/**
 * Template Registry
 *
 * Centralized storage and management system for RTB templates
 * with efficient indexing, search, and metadata tracking.
 */
class TemplateRegistry {
    constructor(config = {}) {
        this.templates = new Map();
        this.metadata = new Map();
        this.indexes = {
            category: new Map(),
            priority: new Map(),
            environment: new Map(),
            tag: new Map(),
            author: new Map(),
            source: new Map(),
            parameter: new Map(),
            customFunction: new Map(),
            inheritance: new Map()
        };
        this.cache = new Map();
        this.validationResults = new Map();
        this.accessStats = new Map();
        this.config = {
            enableValidation: config.enableValidation ?? true,
            enableCaching: config.enableCaching ?? true,
            cacheSize: config.cacheSize ?? 1000,
            enableIndexing: config.enableIndexing ?? true,
            indexParameters: config.indexParameters ?? true,
            indexCustomFunctions: config.indexCustomFunctions ?? true,
            enableVersioning: config.enableVersioning ?? false,
            maxVersions: config.maxVersions ?? 10,
            compressionThreshold: config.compressionThreshold ?? 10240
        };
    }
    /**
     * Register a template in the registry
     */
    async registerTemplate(name, template, priority) {
        // Validate template if enabled
        if (this.config.enableValidation) {
            const validationResult = await this.validateTemplate(template);
            this.validationResults.set(name, validationResult);
            if (!validationResult.isValid) {
                throw new Error(`Template validation failed: ${validationResult.errors.map(e => e.message).join(', ')}`);
            }
        }
        // Generate template hash and metadata
        const hash = this.generateTemplateHash(template);
        const size = this.calculateTemplateSize(template);
        const now = new Date();
        // Check if template already exists
        const existingMeta = this.metadata.get(name);
        // Store template
        this.templates.set(name, template);
        // Create metadata
        const meta = {
            name,
            priority,
            hash,
            size,
            createdAt: existingMeta?.createdAt || now,
            updatedAt: now,
            accessCount: existingMeta?.accessCount || 0,
            lastAccessed: existingMeta?.lastAccessed || now,
            validationStatus: this.validationResults.get(name)?.isValid ? 'valid' : 'pending',
            dependencies: this.extractDependencies(template),
            dependents: [],
            tags: new Set(template.meta?.tags || []),
            indexes: {}
        };
        this.metadata.set(name, meta);
        // Update indexes if enabled
        if (this.config.enableIndexing) {
            this.updateIndexes(name, template, priority);
        }
        // Update dependency relationships
        this.updateDependencyRelationships(name, meta.dependencies);
        // Clear cache for this template
        this.clearCacheForTemplate(name);
    }
    /**
     * Get template from registry
     */
    getTemplate(name) {
        const template = this.templates.get(name);
        if (template) {
            this.updateAccessStats(name);
        }
        return template;
    }
    /**
     * Get template metadata
     */
    getTemplateMetadata(name) {
        return this.metadata.get(name);
    }
    /**
     * Search templates with filters
     */
    async searchTemplates(filter) {
        const startTime = Date.now();
        // Start with all templates, then apply filters
        let candidates = Array.from(this.templates.keys());
        // Apply filters
        if (filter.category) {
            const categories = Array.isArray(filter.category) ? filter.category : [filter.category];
            candidates = candidates.filter(name => categories.some(cat => this.indexes.category.get(cat)?.has(name)));
        }
        if (filter.priorityRange) {
            candidates = candidates.filter(name => {
                const meta = this.metadata.get(name);
                return meta &&
                    meta.priority.level >= filter.priorityRange.min &&
                    meta.priority.level <= filter.priorityRange.max;
            });
        }
        if (filter.environment) {
            candidates = candidates.filter(name => this.indexes.environment.get(filter.environment)?.has(name));
        }
        if (filter.tags && filter.tags.length > 0) {
            candidates = candidates.filter(name => filter.tags.some(tag => this.indexes.tag.get(tag)?.has(name)));
        }
        if (filter.author) {
            candidates = candidates.filter(name => this.indexes.author.get(filter.author)?.has(name));
        }
        if (filter.source) {
            candidates = candidates.filter(name => this.indexes.source.get(filter.source)?.has(name));
        }
        if (filter.hasInheritance !== undefined) {
            candidates = candidates.filter(name => {
                const meta = this.metadata.get(name);
                return meta?.dependencies.length > 0 === filter.hasInheritance;
            });
        }
        if (filter.isActive !== undefined) {
            candidates = candidates.filter(name => {
                const meta = this.metadata.get(name);
                return meta?.validationStatus === 'valid' === filter.isActive;
            });
        }
        // Build results
        const results = candidates.map(name => {
            const template = this.templates.get(name);
            const priority = this.metadata.get(name).priority;
            return {
                name,
                template,
                priority,
                relevanceScore: this.calculateRelevanceScore(name, filter)
            };
        });
        // Sort by relevance score
        results.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
        // Build facets
        const facets = this.buildSearchFacets(candidates);
        const searchTime = Date.now() - startTime;
        return {
            templates: results,
            totalCount: results.length,
            facets,
            searchTime
        };
    }
    /**
     * Get templates by category
     */
    getTemplatesByCategory(category) {
        const names = this.indexes.category.get(category) || new Set();
        return Array.from(names).map(name => ({
            name,
            template: this.templates.get(name)
        })).filter(item => item.template);
    }
    /**
     * Get templates by priority range
     */
    getTemplatesByPriority(minPriority, maxPriority) {
        const results = [];
        for (let level = minPriority; level <= maxPriority; level++) {
            const names = this.indexes.priority.get(level) || new Set();
            for (const name of names) {
                const template = this.templates.get(name);
                if (template) {
                    results.push({ name, template });
                }
            }
        }
        return results;
    }
    /**
     * Get templates that inherit from a specific template
     */
    getTemplateDependents(parentName) {
        const meta = this.metadata.get(parentName);
        if (!meta)
            return [];
        return meta.dependents.map(name => ({
            name,
            template: this.templates.get(name)
        })).filter(item => item.template);
    }
    /**
     * Get template dependencies
     */
    getTemplateDependencies(name) {
        const meta = this.metadata.get(name);
        if (!meta)
            return [];
        return meta.dependencies.map(depName => ({
            name: depName,
            template: this.templates.get(depName)
        })).filter(item => item.template);
    }
    /**
     * Remove template from registry
     */
    removeTemplate(name) {
        const removed = this.templates.delete(name);
        if (removed) {
            // Remove metadata
            const meta = this.metadata.get(name);
            if (meta) {
                this.metadata.delete(name);
                // Remove from indexes
                this.removeFromIndexes(name, meta);
                // Update dependency relationships
                this.removeDependencyRelationships(name, meta.dependencies);
            }
            // Clear cache
            this.clearCacheForTemplate(name);
            // Remove validation results
            this.validationResults.delete(name);
            // Remove access stats
            this.accessStats.delete(name);
        }
        return removed;
    }
    /**
     * Update template in registry
     */
    async updateTemplate(name, template, priority) {
        const existingTemplate = this.templates.get(name);
        const existingMeta = this.metadata.get(name);
        if (!existingTemplate || !existingMeta) {
            throw new Error(`Template '${name}' not found`);
        }
        // Merge template data
        const updatedTemplate = { ...existingTemplate, ...template };
        // Merge priority info
        const updatedPriority = { ...existingMeta.priority, ...priority };
        // Re-register with updates
        await this.registerTemplate(name, updatedTemplate, updatedPriority);
    }
    /**
     * Validate template
     */
    async validateTemplate(template) {
        // This is a placeholder - actual validation would be implemented
        // based on the RTB schema and business rules
        const errors = [];
        const warnings = [];
        // Basic structure validation
        if (!template.configuration) {
            errors.push({
                code: 'MISSING_CONFIGURATION',
                message: 'Template must have configuration object',
                severity: 'error'
            });
        }
        // Validate custom functions
        if (template.custom) {
            for (const func of template.custom) {
                if (!func.name || !func.body) {
                    errors.push({
                        code: 'INVALID_CUSTOM_FUNCTION',
                        message: `Invalid custom function: ${func.name}`,
                        severity: 'error'
                    });
                }
            }
        }
        return {
            isValid: errors.length === 0,
            errors,
            warnings,
            metadata: {
                validationTime: 0,
                parametersValidated: Object.keys(template.configuration || {}).length,
                constraintsChecked: 0
            }
        };
    }
    /**
     * Generate template hash
     */
    generateTemplateHash(template) {
        const content = JSON.stringify(template);
        return Buffer.from(content).toString('base64').slice(0, 16);
    }
    /**
     * Calculate template size
     */
    calculateTemplateSize(template) {
        return JSON.stringify(template).length;
    }
    /**
     * Extract template dependencies
     */
    extractDependencies(template) {
        const dependencies = [];
        // Extract from metadata
        if (template.meta?.inherits_from) {
            if (Array.isArray(template.meta.inherits_from)) {
                dependencies.push(...template.meta.inherits_from);
            }
            else {
                dependencies.push(template.meta.inherits_from);
            }
        }
        // Extract from evaluations (could contain template references)
        if (template.evaluations) {
            for (const [key, evalOp] of Object.entries(template.evaluations)) {
                // Simple regex to find template references
                const templateRefs = (evalOp.eval || '').match(/\b[A-Z][a-zA-Z0-9_]*Template\b/g) || [];
                dependencies.push(...templateRefs);
            }
        }
        return [...new Set(dependencies)];
    }
    /**
     * Update search indexes
     */
    updateIndexes(name, template, priority) {
        // Category index
        this.indexes.category.set(priority.category, (this.indexes.category.get(priority.category) || new Set()).add(name));
        // Priority index
        this.indexes.priority.set(priority.level, (this.indexes.priority.get(priority.level) || new Set()).add(name));
        // Environment index
        if (template.meta?.environment) {
            this.indexes.environment.set(template.meta.environment, (this.indexes.environment.get(template.meta.environment) || new Set()).add(name));
        }
        // Tag index
        if (template.meta?.tags) {
            for (const tag of template.meta.tags) {
                this.indexes.tag.set(tag, (this.indexes.tag.get(tag) || new Set()).add(name));
            }
        }
        // Author index
        if (template.meta?.author) {
            for (const author of template.meta.author) {
                this.indexes.author.set(author, (this.indexes.author.get(author) || new Set()).add(name));
            }
        }
        // Source index
        if (priority.source) {
            this.indexes.source.set(priority.source, (this.indexes.source.get(priority.source) || new Set()).add(name));
        }
        // Parameter index (if enabled)
        if (this.config.indexParameters && template.configuration) {
            for (const paramName of Object.keys(template.configuration)) {
                this.indexes.parameter.set(paramName, (this.indexes.parameter.get(paramName) || new Set()).add(name));
            }
        }
        // Custom function index (if enabled)
        if (this.config.indexCustomFunctions && template.custom) {
            for (const func of template.custom) {
                this.indexes.customFunction.set(func.name, (this.indexes.customFunction.get(func.name) || new Set()).add(name));
            }
        }
    }
    /**
     * Remove from indexes
     */
    removeFromIndexes(name, meta) {
        // Remove from all indexes
        for (const index of Object.values(this.indexes)) {
            for (const [key, names] of index) {
                names.delete(name);
                if (names.size === 0) {
                    index.delete(key);
                }
            }
        }
    }
    /**
     * Update dependency relationships
     */
    updateDependencyRelationships(name, dependencies) {
        for (const dep of dependencies) {
            const depMeta = this.metadata.get(dep);
            if (depMeta && !depMeta.dependents.includes(name)) {
                depMeta.dependents.push(name);
            }
        }
    }
    /**
     * Remove dependency relationships
     */
    removeDependencyRelationships(name, dependencies) {
        for (const dep of dependencies) {
            const depMeta = this.metadata.get(dep);
            if (depMeta) {
                const index = depMeta.dependents.indexOf(name);
                if (index > -1) {
                    depMeta.dependents.splice(index, 1);
                }
            }
        }
    }
    /**
     * Calculate relevance score for search
     */
    calculateRelevanceScore(name, filter) {
        let score = 0;
        const meta = this.metadata.get(name);
        if (!meta)
            return 0;
        // Category match
        if (filter.category) {
            const categories = Array.isArray(filter.category) ? filter.category : [filter.category];
            if (categories.includes(meta.priority.category)) {
                score += 10;
            }
        }
        // Priority range match
        if (filter.priorityRange) {
            if (meta.priority.level >= filter.priorityRange.min &&
                meta.priority.level <= filter.priorityRange.max) {
                score += 5;
            }
        }
        // Tag matches
        if (filter.tags) {
            const matchingTags = filter.tags.filter(tag => meta.tags.has(tag));
            score += matchingTags.length * 3;
        }
        // Access frequency bonus
        score += Math.min(meta.accessCount / 10, 5);
        return score;
    }
    /**
     * Build search facets
     */
    buildSearchFacets(candidateNames) {
        const facets = {
            categories: {},
            priorities: {},
            environments: {},
            tags: {}
        };
        for (const name of candidateNames) {
            const meta = this.metadata.get(name);
            if (!meta)
                continue;
            // Category facet
            facets.categories[meta.priority.category] =
                (facets.categories[meta.priority.category] || 0) + 1;
            // Priority facet
            const priorityKey = `${meta.priority.level} (${meta.priority.category})`;
            facets.priorities[priorityKey] = (facets.priorities[priorityKey] || 0) + 1;
            // Environment facet
            const template = this.templates.get(name);
            if (template?.meta?.environment) {
                facets.environments[template.meta.environment] =
                    (facets.environments[template.meta.environment] || 0) + 1;
            }
            // Tag facets
            for (const tag of meta.tags) {
                facets.tags[tag] = (facets.tags[tag] || 0) + 1;
            }
        }
        return facets;
    }
    /**
     * Update access statistics
     */
    updateAccessStats(name) {
        const stats = this.accessStats.get(name) || { count: 0, lastAccess: new Date() };
        stats.count++;
        stats.lastAccess = new Date();
        this.accessStats.set(name, stats);
        // Update metadata
        const meta = this.metadata.get(name);
        if (meta) {
            meta.accessCount = stats.count;
            meta.lastAccessed = stats.lastAccess;
        }
    }
    /**
     * Clear cache for template
     */
    clearCacheForTemplate(name) {
        for (const [key] of this.cache) {
            if (key.startsWith(`${name}:`)) {
                this.cache.delete(key);
            }
        }
    }
    /**
     * Get registry statistics
     */
    getRegistryStats() {
        const stats = {
            totalTemplates: this.templates.size,
            totalSize: Array.from(this.metadata.values()).reduce((sum, meta) => sum + meta.size, 0),
            categories: {},
            priorities: {},
            averageInheritanceDepth: 0,
            validationStatus: {},
            cacheHitRate: 0,
            indexSize: 0
        };
        let totalInheritanceDepth = 0;
        let inheritanceCount = 0;
        for (const meta of this.metadata.values()) {
            // Categories
            stats.categories[meta.priority.category] =
                (stats.categories[meta.priority.category] || 0) + 1;
            // Priorities
            const priorityKey = `${meta.priority.level}`;
            stats.priorities[priorityKey] = (stats.priorities[priorityKey] || 0) + 1;
            // Validation status
            stats.validationStatus[meta.validationStatus] =
                (stats.validationStatus[meta.validationStatus] || 0) + 1;
            // Inheritance depth
            if (meta.dependencies.length > 0) {
                totalInheritanceDepth += meta.dependencies.length;
                inheritanceCount++;
            }
        }
        stats.averageInheritanceDepth = inheritanceCount > 0 ? totalInheritanceDepth / inheritanceCount : 0;
        // Calculate index size
        for (const index of Object.values(this.indexes)) {
            for (const names of index.values()) {
                stats.indexSize += names.size;
            }
        }
        return stats;
    }
    /**
     * Clear all data
     */
    clear() {
        this.templates.clear();
        this.metadata.clear();
        this.cache.clear();
        this.validationResults.clear();
        this.accessStats.clear();
        for (const index of Object.values(this.indexes)) {
            index.clear();
        }
    }
}
exports.TemplateRegistry = TemplateRegistry;
//# sourceMappingURL=template-registry.js.map