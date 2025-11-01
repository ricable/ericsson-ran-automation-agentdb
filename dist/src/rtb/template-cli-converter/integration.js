"use strict";
/**
 * RTB Template Inheritance System Integration
 *
 * Provides seamless integration between the template-to-CLI converter
 * and the existing RTB hierarchical template inheritance system.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RtbTemplateIntegration = void 0;
const index_1 = require("./index");
const hierarchical_template_system_1 = require("../hierarchical-template-system");
/**
 * RTB Template Integration Class
 *
 * Integrates the template-to-CLI converter with the existing RTB
 * hierarchical template inheritance system.
 */
class RtbTemplateIntegration {
    constructor(templateSystem, config = {}) {
        this.integrationHistory = new Map();
        this.config = {
            enableInheritanceProcessing: true,
            enablePriorityOptimization: true,
            enableTemplateValidation: true,
            enableMergeResultAnalysis: true,
            ...config
        };
        this.templateSystem = templateSystem;
        this.templateRegistry = new hierarchical_template_system_1.TemplateRegistry();
        this.priorityEngine = new hierarchical_template_system_1.PriorityTemplateEngine();
        this.cliConverter = new index_1.TemplateToCliConverter(this.config.converterConfig);
        this.initializeIntegration();
    }
    /**
     * Convert RTB template with inheritance processing
     */
    async convertTemplateWithInheritance(template, context, options) {
        const startTime = Date.now();
        const templateId = this.generateTemplateId(template);
        console.log(`Starting integrated conversion for template ${templateId}...`);
        try {
            // Phase 1: Template inheritance processing
            const inheritanceResult = await this.processTemplateInheritance(template, context, options);
            // Phase 2: Template validation (if enabled)
            const validationResult = this.config.enableTemplateValidation && !options?.skipValidation
                ? await this.validateTemplate(inheritanceResult.mergedTemplate)
                : { isValid: true, errors: [], warnings: [] };
            if (!validationResult.isValid) {
                throw new Error(`Template validation failed: ${validationResult.errors.join(', ')}`);
            }
            // Phase 3: CLI conversion with context enhancement
            const enhancedContext = this.enhanceConversionContext(context, inheritanceResult, template);
            const conversionStartTime = Date.now();
            const commandSet = await this.cliConverter.convertTemplate(inheritanceResult.mergedTemplate, enhancedContext);
            // Phase 4: Integration analysis and optimization
            const integrationInsights = await this.analyzeIntegration(template, inheritanceResult, commandSet, Date.now() - conversionStartTime);
            // Phase 5: Create integrated result
            const result = {
                originalTemplate: {
                    id: templateId,
                    version: template.meta?.version || '1.0.0',
                    priority: template.meta?.priority || 0,
                    inheritsFrom: template.meta?.inherits_from
                },
                mergeResult: inheritanceResult.mergeResult,
                commandSet,
                integrationStats: this.calculateIntegrationStats(inheritanceResult, commandSet, Date.now() - startTime),
                insights: integrationInsights
            };
            // Store in history
            this.integrationHistory.set(templateId, result);
            console.log(`Integrated conversion completed in ${Date.now() - startTime}ms`);
            return result;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.error(`Integrated conversion failed: ${errorMessage}`);
            throw new Error(`Integrated conversion failed: ${errorMessage}`);
        }
    }
    /**
     * Convert multiple templates with batch processing
     */
    async convertTemplatesBatch(templates, context, options) {
        console.log(`Starting batch conversion for ${templates.length} templates...`);
        const results = [];
        const maxConcurrency = options?.maxConcurrency || 5;
        if (options?.processInParallel && templates.length > 1) {
            // Process in parallel
            const batches = this.createTemplateBatches(templates, maxConcurrency);
            for (const batch of batches) {
                const batchPromises = batch.map(template => this.convertTemplateWithInheritance(template, context, options)
                    .catch(error => {
                    console.error(`Template conversion failed: ${error.message}`);
                    if (options?.continueOnError) {
                        return null;
                    }
                    throw error;
                }));
                const batchResults = await Promise.all(batchPromises);
                results.push(...batchResults.filter(result => result !== null));
            }
        }
        else {
            // Process sequentially
            for (const template of templates) {
                try {
                    const result = await this.convertTemplateWithInheritance(template, context, options);
                    results.push(result);
                }
                catch (error) {
                    console.error(`Template conversion failed: ${error.message}`);
                    if (!options?.continueOnError) {
                        throw error;
                    }
                }
            }
        }
        console.log(`Batch conversion completed: ${results.length}/${templates.length} templates processed`);
        return results;
    }
    /**
     * Process template inheritance
     */
    async processTemplateInheritance(template, context, options) {
        const startTime = Date.now();
        if (!this.config.enableInheritanceProcessing && !options?.forceInheritanceProcessing) {
            return {
                mergedTemplate: template,
                processingTime: Date.now() - startTime
            };
        }
        // Process inheritance through the template system
        const mergeResult = await this.templateSystem.processTemplateInheritance(template, {
            resolveConflicts: true,
            validateResult: true,
            optimizeForPriority: options?.optimizeForPriority ?? this.config.enablePriorityOptimization
        });
        return {
            mergedTemplate: mergeResult.template,
            mergeResult,
            processingTime: Date.now() - startTime
        };
    }
    /**
     * Validate template
     */
    async validateTemplate(template) {
        const errors = [];
        const warnings = [];
        // Basic template validation
        if (!template.configuration || Object.keys(template.configuration).length === 0) {
            errors.push('Template has no configuration parameters');
        }
        // Validate template metadata
        if (!template.meta) {
            warnings.push('Template has no metadata');
        }
        else {
            if (!template.meta.version) {
                warnings.push('Template has no version information');
            }
            if (!template.meta.author || template.meta.author.length === 0) {
                warnings.push('Template has no author information');
            }
        }
        // Validate conditional logic
        if (template.conditions) {
            for (const [conditionId, condition] of Object.entries(template.conditions)) {
                if (!condition.if || !condition.then) {
                    errors.push(`Invalid condition structure: ${conditionId}`);
                }
            }
        }
        // Validate evaluation logic
        if (template.evaluations) {
            for (const [evalId, evaluation] of Object.entries(template.evaluations)) {
                if (!evaluation.eval) {
                    errors.push(`Invalid evaluation structure: ${evalId}`);
                }
            }
        }
        return {
            isValid: errors.length === 0,
            errors,
            warnings
        };
    }
    /**
     * Enhance conversion context with inheritance information
     */
    enhanceConversionContext(context, inheritanceResult, originalTemplate) {
        const enhancedContext = {
            ...context,
            parameters: {
                ...context.parameters,
                // Add inheritance-related parameters
                templatePriority: originalTemplate.meta?.priority || 0,
                inheritanceDepth: inheritanceResult.mergeResult?.inheritanceChain.inheritanceDepth || 0,
                conflictsResolved: inheritanceResult.mergeResult?.resolvedConflicts.length || 0
            }
        };
        // Add merge result information if available
        if (inheritanceResult.mergeResult) {
            enhancedContext.parameters.mergeInfo = {
                totalTemplates: inheritanceResult.mergeResult.mergeStats.totalTemplates,
                conflictsDetected: inheritanceResult.mergeResult.mergeStats.conflictsDetected,
                conflictsResolved: inheritanceResult.mergeResult.mergeStats.conflictsResolved
            };
        }
        return enhancedContext;
    }
    /**
     * Analyze integration results
     */
    async analyzeIntegration(template, inheritanceResult, commandSet, conversionTime) {
        const insights = [];
        // Analyze inheritance complexity
        if (inheritanceResult.mergeResult) {
            const inheritanceDepth = inheritanceResult.mergeResult.inheritanceChain.inheritanceDepth;
            if (inheritanceDepth > 5) {
                insights.push({
                    type: 'inheritance',
                    category: 'warning',
                    description: `Deep inheritance depth detected: ${inheritanceDepth}`,
                    target: 'template_inheritance',
                    recommendation: 'Consider flattening template inheritance hierarchy',
                    confidence: 0.8
                });
            }
            const conflictsResolved = inheritanceResult.mergeResult.resolvedConflicts.length;
            if (conflictsResolved > 0) {
                insights.push({
                    type: 'conflict',
                    category: 'info',
                    description: `Resolved ${conflictsResolved} template conflicts`,
                    target: 'template_conflicts',
                    recommendation: 'Review conflict resolutions for optimization opportunities',
                    confidence: 0.9
                });
            }
        }
        // Analyze command generation
        const commandComplexity = commandSet.metadata.complexity;
        if (commandComplexity === 'critical') {
            insights.push({
                type: 'risk',
                category: 'warning',
                description: 'Generated command set has critical complexity',
                target: 'command_set',
                recommendation: 'Consider splitting into multiple smaller deployments',
                confidence: 0.85
            });
        }
        const commandCount = commandSet.commands.length;
        if (commandCount > 100) {
            insights.push({
                type: 'performance',
                category: 'recommendation',
                description: `Large command set generated: ${commandCount} commands`,
                target: 'command_optimization',
                recommendation: 'Enable batch processing and parallel execution',
                confidence: 0.9
            });
        }
        // Analyze processing time
        const totalProcessingTime = inheritanceResult.processingTime + conversionTime;
        if (totalProcessingTime > 5000) {
            insights.push({
                type: 'performance',
                category: 'warning',
                description: `Long processing time: ${totalProcessingTime}ms`,
                target: 'processing_performance',
                recommendation: 'Consider template optimization or caching',
                confidence: 0.7
            });
        }
        return insights;
    }
    /**
     * Calculate integration statistics
     */
    calculateIntegrationStats(inheritanceResult, commandSet, totalTime) {
        return {
            inheritanceProcessingTime: inheritanceResult.processingTime,
            cliConversionTime: totalTime - inheritanceResult.processingTime,
            totalIntegrationTime: totalTime,
            templateComplexity: {
                inheritanceDepth: inheritanceResult.mergeResult?.inheritanceChain.inheritanceDepth || 0,
                mergeConflictsResolved: inheritanceResult.mergeResult?.resolvedConflicts.length || 0,
                parameterCount: Object.keys(inheritanceResult.mergedTemplate.configuration || {}).length,
                conditionalLogicCount: Object.keys(inheritanceResult.mergedTemplate.conditions || {}).length
            },
            commandMetrics: {
                totalCommands: commandSet.commands.length,
                criticalCommands: commandSet.commands.filter(cmd => cmd.critical).length,
                rollbackCommands: commandSet.rollbackCommands.length,
                validationCommands: commandSet.validationCommands.length
            }
        };
    }
    /**
     * Generate template ID
     */
    generateTemplateId(template) {
        const name = template.meta?.description || 'unnamed';
        const version = template.meta?.version || '1.0.0';
        const priority = template.meta?.priority || 0;
        return `${name}_${version}_priority${priority}`;
    }
    /**
     * Create template batches for parallel processing
     */
    createTemplateBatches(templates, batchSize) {
        const batches = [];
        for (let i = 0; i < templates.length; i += batchSize) {
            batches.push(templates.slice(i, i + batchSize));
        }
        return batches;
    }
    /**
     * Get integration history
     */
    getIntegrationHistory() {
        return new Map(this.integrationHistory);
    }
    /**
     * Get conversion statistics
     */
    getConversionStatistics() {
        const history = Array.from(this.integrationHistory.values());
        if (history.length === 0) {
            return {
                totalConversions: 0,
                averageProcessingTime: 0,
                averageCommandCount: 0,
                complexityDistribution: {}
            };
        }
        const totalConversions = history.length;
        const averageProcessingTime = history.reduce((sum, result) => sum + result.integrationStats.totalIntegrationTime, 0) / totalConversions;
        const averageCommandCount = history.reduce((sum, result) => sum + result.commandSet.commands.length, 0) / totalConversions;
        const complexityDistribution = {};
        for (const result of history) {
            const complexity = result.commandSet.metadata.complexity;
            complexityDistribution[complexity] = (complexityDistribution[complexity] || 0) + 1;
        }
        return {
            totalConversions,
            averageProcessingTime,
            averageCommandCount,
            complexityDistribution
        };
    }
    /**
     * Clear integration history
     */
    clearHistory() {
        this.integrationHistory.clear();
    }
    /**
     * Initialize integration components
     */
    initializeIntegration() {
        console.log('Initializing RTB Template Integration...');
        // Register with template system if needed
        if (this.templateSystem) {
            // Integration-specific initialization
        }
        console.log('RTB Template Integration initialized successfully');
    }
}
exports.RtbTemplateIntegration = RtbTemplateIntegration;
//# sourceMappingURL=integration.js.map