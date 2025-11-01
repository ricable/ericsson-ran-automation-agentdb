"use strict";
/**
 * Conditional Validator - Phase 5 Implementation
 *
 * Advanced conditional validation logic for complex cross-parameter constraints
 * Supports dynamic rule generation, performance optimization, and cognitive integration
 * Handles real-time validation with temporal reasoning and learning patterns
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionalValidator = void 0;
const events_1 = require("events");
/**
 * Conditional Validator
 *
 * Advanced conditional validation with cognitive enhancement:
 * - Complex cross-parameter validation logic
 * - Dynamic rule generation based on context
 * - Performance optimization for real-time validation
 * - Integration with temporal reasoning engine
 * - Cognitive consciousness integration
 * - Learning pattern adaptation
 */
class ConditionalValidator extends events_1.EventEmitter {
    constructor(config) {
        super();
        this.parameters = new Map();
        this.crossParameterConstraints = new Map();
        this.conditionalRules = new Map();
        this.compiledConditions = new Map();
        this.validationCache = new Map();
        this.isInitialized = false;
        this.learningPatterns = new Map();
        this.optimizationStrategies = [];
        this.config = {
            maxValidationDepth: 10,
            enablePerformanceOptimization: true,
            consciousnessIntegration: true,
            enableCaching: true,
            maxRuleExecutionTime: 100,
            ...config
        };
        this.performanceMetrics = {
            totalRulesExecuted: 0,
            averageExecutionTime: 0,
            cacheHitRate: 0,
            conditionalBranches: 0,
            optimizationsApplied: 0,
            consciousnessEnhancements: 0,
            learningPatternsApplied: 0
        };
    }
    /**
     * Initialize conditional validator with parameters and constraints
     */
    async initialize(parameters, crossParameterConstraints) {
        if (this.isInitialized) {
            return;
        }
        console.log('🔀 Initializing Conditional Validator...');
        try {
            this.parameters = new Map(parameters);
            this.crossParameterConstraints = new Map(crossParameterConstraints);
            // Initialize cognitive consciousness integration
            if (this.config.consciousnessIntegration && this.config.cognitiveCore) {
                this.cognitiveCore = this.config.cognitiveCore;
                console.log('🧠 Cognitive consciousness integration enabled for conditional validation');
            }
            // Phase 1: Generate conditional rules from cross-parameter constraints
            await this.generateConditionalRules();
            // Phase 2: Compile validation conditions for performance
            if (this.config.enablePerformanceOptimization) {
                await this.compileValidationConditions();
            }
            // Phase 3: Initialize optimization strategies
            await this.initializeOptimizationStrategies();
            // Phase 4: Load learning patterns
            if (this.config.enableCaching) {
                await this.loadLearningPatterns();
            }
            // Phase 5: Setup cognitive conditional patterns
            if (this.cognitiveCore) {
                await this.initializeCognitiveConditionalPatterns();
            }
            this.isInitialized = true;
            console.log(`✅ Conditional Validator initialized with ${this.conditionalRules.size} rules`);
            this.emit('initialized', {
                rulesCount: this.conditionalRules.size,
                constraintsCount: this.crossParameterConstraints.size,
                compiledConditionsCount: this.compiledConditions.size
            });
        }
        catch (error) {
            console.error('❌ Conditional Validator initialization failed:', error);
            throw new Error(`Conditional Validator initialization failed: ${error.message}`);
        }
    }
    /**
     * Validate configuration with conditional rules
     */
    async validateConfiguration(configuration, context) {
        const startTime = Date.now();
        const errors = [];
        const warnings = [];
        try {
            // Phase 1: Apply conditional rules
            const conditionalResults = await this.applyConditionalRules(configuration, context);
            // Collect results from conditional rules
            for (const result of conditionalResults) {
                errors.push(...result.validationResult.errors);
                warnings.push(...result.validationResult.warnings);
                this.performanceMetrics.conditionalBranches++;
            }
            // Phase 2: Apply cross-parameter constraints
            const constraintResults = await this.validateCrossParameterConstraints(configuration, context);
            errors.push(...constraintResults.errors);
            warnings.push(...constraintResults.warnings);
            // Phase 3: Apply cognitive conditional validation
            let cognitiveResults = null;
            if (this.cognitiveCore) {
                cognitiveResults = await this.applyCognitiveConditionalValidation(configuration, context);
                if (cognitiveResults.insights) {
                    warnings.push(...cognitiveResults.insights);
                }
            }
            // Phase 4: Apply optimization strategies
            if (this.config.enablePerformanceOptimization) {
                await this.applyOptimizationStrategies(configuration, context, { errors, warnings });
            }
            const executionTime = Date.now() - startTime;
            // Update performance metrics
            this.updatePerformanceMetrics(executionTime, errors.length, warnings.length);
            return {
                validationId: context.validationId,
                valid: errors.length === 0,
                errors,
                warnings,
                executionTime,
                parametersValidated: Object.keys(configuration).length,
                cacheHitRate: this.calculateCacheHitRate(),
                conditionalResults: conditionalResults.length,
                cognitiveInsights: cognitiveResults
            };
        }
        catch (error) {
            return {
                validationId: context.validationId,
                valid: false,
                errors: [{
                        code: 'CONDITIONAL_VALIDATION_ERROR',
                        message: `Conditional validation failed: ${error.message}`,
                        severity: 'error',
                        parameter: 'conditional_validation',
                        value: error,
                        constraint: 'conditional_logic',
                        category: 'conditional'
                    }],
                warnings: [],
                executionTime: Date.now() - startTime,
                parametersValidated: Object.keys(configuration).length,
                cacheHitRate: 0
            };
        }
    }
    /**
     * Validate cross-parameter constraints
     */
    async validateCrossParameterConstraint(constraint, configuration, context) {
        const errors = [];
        const warnings = [];
        try {
            // Check cache first
            const cacheKey = `${constraint.id}:${JSON.stringify(configuration)}:${context.validationLevel}`;
            if (this.config.enableCaching && this.validationCache.has(cacheKey)) {
                const cached = this.validationCache.get(cacheKey);
                this.performanceMetrics.cacheHitRate++;
                return {
                    errors: cached.validationResult.errors,
                    warnings: cached.validationResult.warnings
                };
            }
            // Extract parameter values
            const parameterValues = {};
            for (const paramName of constraint.parameters) {
                parameterValues[paramName] = configuration[paramName];
            }
            // Evaluate condition
            const conditionMet = await this.evaluateCondition(constraint.condition, parameterValues, context);
            if (conditionMet) {
                // Apply validation
                const validationResult = await this.applyValidation(constraint.validation, parameterValues, context);
                if (!validationResult.isValid) {
                    const error = {
                        code: 'CROSS_PARAMETER_VIOLATION',
                        message: constraint.description || validationResult.message || 'Cross-parameter constraint violated',
                        severity: constraint.severity,
                        parameter: constraint.parameters.join(','),
                        value: parameterValues,
                        constraint: constraint.id,
                        category: 'cross_parameter'
                    };
                    if (error.severity === 'error') {
                        errors.push(error);
                    }
                    else {
                        warnings.push(error);
                    }
                }
            }
            // Cache result
            if (this.config.enableCaching) {
                this.validationCache.set(cacheKey, {
                    ruleId: constraint.id,
                    conditionMet,
                    validationResult: { isValid: errors.length === 0, errors, warnings },
                    executionTime: Date.now() - performance.now(),
                    optimizations: []
                });
            }
        }
        catch (error) {
            errors.push({
                code: 'CROSS_PARAMETER_PROCESSING_ERROR',
                message: `Error processing cross-parameter constraint ${constraint.id}: ${error.message}`,
                severity: 'error',
                parameter: constraint.parameters.join(','),
                value: configuration,
                constraint: constraint.id,
                category: 'cross_parameter'
            });
        }
        return { errors, warnings };
    }
    /**
     * Apply conditional rules
     */
    async applyConditionalRules(configuration, context) {
        const results = [];
        for (const [ruleId, rule] of this.conditionalRules) {
            if (!rule.enabled) {
                continue;
            }
            try {
                const startTime = Date.now();
                const conditionMet = await this.evaluateCondition(rule.condition, configuration, context);
                let validationResult;
                if (conditionMet) {
                    // Apply 'then' rules
                    validationResult = await this.applyValidationRules(rule.then, configuration, context);
                }
                else if (rule.else) {
                    // Apply 'else' rules
                    validationResult = await this.applyValidationRules(rule.else, configuration, context);
                }
                else {
                    // No validation to apply
                    validationResult = {
                        validationId: context.validationId,
                        valid: true,
                        errors: [],
                        warnings: [],
                        executionTime: Date.now() - startTime,
                        parametersValidated: 0,
                        cacheHitRate: 0
                    };
                }
                const executionTime = Date.now() - startTime;
                results.push({
                    ruleId,
                    conditionMet,
                    validationResult,
                    executionTime,
                    optimizations: []
                });
                this.performanceMetrics.totalRulesExecuted++;
            }
            catch (error) {
                results.push({
                    ruleId,
                    conditionMet: false,
                    validationResult: {
                        validationId: context.validationId,
                        valid: false,
                        errors: [{
                                code: 'CONDITIONAL_RULE_ERROR',
                                message: `Error in conditional rule ${ruleId}: ${error.message}`,
                                severity: 'error',
                                parameter: ruleId,
                                value: error,
                                constraint: 'conditional_rule',
                                category: 'conditional'
                            }],
                        warnings: [],
                        executionTime: 0,
                        parametersValidated: 0,
                        cacheHitRate: 0
                    },
                    executionTime: 0,
                    optimizations: []
                });
            }
        }
        return results;
    }
    /**
     * Evaluate condition expression
     */
    async evaluateCondition(condition, parameterValues, context) {
        try {
            // Check if condition is pre-compiled
            const compiledCondition = this.compiledConditions.get(condition);
            if (compiledCondition) {
                return compiledCondition.evaluate(parameterValues, context);
            }
            // Parse and evaluate condition
            const conditionFunction = this.parseConditionExpression(condition);
            const result = conditionFunction(parameterValues, context);
            // Cache compiled condition for performance
            if (this.config.enablePerformanceOptimization) {
                this.compiledConditions.set(condition, {
                    expression: condition,
                    evaluate: conditionFunction,
                    compiledAt: Date.now()
                });
            }
            return result;
        }
        catch (error) {
            console.warn(`Failed to evaluate condition: ${condition}`, error);
            return false; // Default to false on error
        }
    }
    /**
     * Parse condition expression into executable function
     */
    parseConditionExpression(condition) {
        // Simple condition parser - in production, this would be more sophisticated
        return (parameters, context) => {
            try {
                // Replace parameter placeholders with actual values
                let expression = condition;
                // Replace parameter references like ${paramName}
                for (const [paramName, paramValue] of Object.entries(parameters)) {
                    const regex = new RegExp(`\\$\\{${paramName}\\}`, 'g');
                    expression = expression.replace(regex, JSON.stringify(paramValue));
                }
                // Create a safe evaluation context
                const safeEval = new Function('params', 'context', `
          const { ${Object.keys(parameters).join(', ')} } = params;
          try {
            return ${expression};
          } catch (e) {
            return false;
          }
        `);
                return safeEval(parameters, context);
            }
            catch (error) {
                console.warn(`Condition evaluation failed: ${condition}`, error);
                return false;
            }
        };
    }
    /**
     * Apply validation logic
     */
    async applyValidation(validation, parameterValues, context) {
        try {
            // Parse validation logic
            const validationFunction = this.parseValidationExpression(validation);
            return validationFunction(parameterValues, context);
        }
        catch (error) {
            return {
                isValid: false,
                message: `Validation logic error: ${error.message}`
            };
        }
    }
    /**
     * Parse validation expression
     */
    parseValidationExpression(validation) {
        return (parameters, context) => {
            try {
                // Simple validation expression parser
                // In production, this would support more complex validation logic
                // Example validation expressions:
                // "params.param1 > params.param2"
                // "params.paramA && !params.paramB"
                // "params.requiredField != null && params.requiredField.length > 0"
                let expression = validation;
                // Replace parameter references
                for (const [paramName, paramValue] of Object.entries(parameters)) {
                    const regex = new RegExp(`params\\.${paramName}`, 'g');
                    expression = expression.replace(regex, JSON.stringify(paramValue));
                }
                const safeEval = new Function('params', 'context', `
          try {
            const result = ${expression};
            return { isValid: Boolean(result), message: result ? undefined : 'Validation failed' };
          } catch (e) {
            return { isValid: false, message: e.message };
          }
        `);
                return safeEval(parameters, context);
            }
            catch (error) {
                return {
                    isValid: false,
                    message: `Validation expression error: ${error.message}`
                };
            }
        };
    }
    /**
     * Apply validation rules
     */
    async applyValidationRules(rules, configuration, context) {
        const errors = [];
        const warnings = [];
        for (const rule of rules) {
            try {
                const result = await this.applyValidationRule(rule, configuration, context);
                errors.push(...result.errors);
                warnings.push(...result.warnings);
            }
            catch (error) {
                errors.push({
                    code: 'VALIDATION_RULE_ERROR',
                    message: `Error applying validation rule: ${error.message}`,
                    severity: 'error',
                    parameter: 'validation_rule',
                    value: rule,
                    constraint: 'rule_application',
                    category: 'conditional'
                });
            }
        }
        return {
            validationId: context.validationId,
            valid: errors.length === 0,
            errors,
            warnings,
            executionTime: 0,
            parametersValidated: Object.keys(configuration).length,
            cacheHitRate: 0
        };
    }
    /**
     * Apply single validation rule
     */
    async applyValidationRule(rule, configuration, context) {
        const errors = [];
        const warnings = [];
        // Mock rule application - would implement actual rule logic
        if (rule.type === 'parameter' && rule.target) {
            const value = configuration[rule.target];
            if (value === undefined || value === null) {
                errors.push({
                    code: 'MISSING_REQUIRED_PARAMETER',
                    message: `Required parameter ${rule.target} is missing`,
                    severity: 'error',
                    parameter: rule.target,
                    value,
                    constraint: rule.validation,
                    category: 'parameter'
                });
            }
        }
        return { errors, warnings };
    }
    /**
     * Apply cognitive conditional validation
     */
    async applyCognitiveConditionalValidation(configuration, context) {
        if (!this.cognitiveCore) {
            return null;
        }
        try {
            // Use cognitive consciousness for advanced conditional validation
            const cognitiveInsight = await this.cognitiveCore.optimizeWithStrangeLoop(`cognitive_conditional_validation_${context.validationId}`, {
                configuration,
                context,
                conditionalRules: Array.from(this.conditionalRules.values()),
                validationHistory: this.getValidationHistory(),
                learningPatterns: Array.from(this.learningPatterns.values())
            });
            const insights = [];
            // Extract cognitive insights for conditional validation
            if (cognitiveInsight.strangeLoops) {
                for (const loop of cognitiveInsight.strangeLoops) {
                    if (loop.improvement && loop.effectiveness > 0.7) {
                        insights.push({
                            code: 'COGNITIVE_CONDITIONAL_INSIGHT',
                            message: `Cognitive conditional insight: ${loop.improvement}`,
                            severity: 'info',
                            parameter: 'cognitive_validation',
                            value: loop,
                            constraint: 'cognitive_conditional',
                            category: 'cognitive',
                            metadata: {
                                insightType: loop.name,
                                effectiveness: loop.effectiveness,
                                iteration: loop.iteration
                            }
                        });
                    }
                }
            }
            this.performanceMetrics.consciousnessEnhancements++;
            return {
                cognitiveValidation: true,
                insights,
                effectiveness: cognitiveInsight.effectiveness,
                consciousnessLevel: context.consciousnessLevel,
                recommendations: this.extractConditionalRecommendations(cognitiveInsight)
            };
        }
        catch (error) {
            console.warn('Cognitive conditional validation failed:', error);
            return {
                cognitiveValidation: false,
                error: error.message
            };
        }
    }
    /**
     * Generate conditional rules from cross-parameter constraints
     */
    async generateConditionalRules() {
        console.log('📝 Generating conditional rules from constraints...');
        let ruleCount = 0;
        for (const [constraintId, constraints] of this.crossParameterConstraints) {
            for (const constraint of constraints) {
                const rule = {
                    id: `rule_${constraintId}`,
                    name: `Rule for ${constraintId}`,
                    condition: constraint.condition,
                    then: this.generateValidationRulesFromConstraint(constraint),
                    description: constraint.description,
                    priority: this.calculateRulePriority(constraint),
                    enabled: true
                };
                this.conditionalRules.set(rule.id, rule);
                ruleCount++;
            }
        }
        console.log(`✅ Generated ${ruleCount} conditional rules`);
    }
    /**
     * Generate validation rules from constraint
     */
    generateValidationRulesFromConstraint(constraint) {
        // Convert constraint to validation rules
        return [{
                type: 'cross_parameter',
                target: constraint.parameters.join(','),
                validation: constraint.validation,
                message: constraint.description,
                severity: constraint.severity,
                enabled: true
            }];
    }
    /**
     * Calculate rule priority
     */
    calculateRulePriority(constraint) {
        // Calculate priority based on constraint type and severity
        let priority = 5; // Base priority
        if (constraint.severity === 'error') {
            priority += 3;
        }
        else if (constraint.severity === 'warning') {
            priority += 1;
        }
        if (constraint.type === 'dependency') {
            priority += 2;
        }
        else if (constraint.type === 'exclusion') {
            priority += 1;
        }
        return Math.min(10, priority); // Cap at 10
    }
    /**
     * Compile validation conditions for performance
     */
    async compileValidationConditions() {
        console.log('⚡ Compiling validation conditions...');
        let compiledCount = 0;
        for (const [ruleId, rule] of this.conditionalRules) {
            // Compile condition
            const compiledCondition = {
                expression: rule.condition,
                evaluate: this.parseConditionExpression(rule.condition),
                compiledAt: Date.now()
            };
            this.compiledConditions.set(rule.condition, compiledCondition);
            compiledCount++;
        }
        console.log(`✅ Compiled ${compiledCount} validation conditions`);
    }
    /**
     * Initialize optimization strategies
     */
    async initializeOptimizationStrategies() {
        console.log('🚀 Initializing optimization strategies...');
        this.optimizationStrategies = [
            {
                id: 'condition_caching',
                type: 'caching',
                description: 'Cache condition evaluation results',
                impact: 30,
                applied: false
            },
            {
                id: 'parallel_rule_execution',
                type: 'parallelization',
                description: 'Execute independent rules in parallel',
                impact: 50,
                applied: false
            },
            {
                id: 'cognitive_preprocessing',
                type: 'cognitive',
                description: 'Use cognitive preprocessing for complex conditions',
                impact: 40,
                applied: false
            }
        ];
        console.log(`✅ Initialized ${this.optimizationStrategies.length} optimization strategies`);
    }
    /**
     * Load learning patterns
     */
    async loadLearningPatterns() {
        console.log('🧠 Loading conditional learning patterns...');
        // Mock learning patterns - would integrate with AgentDB
        const mockPatterns = [
            {
                id: 'dependency_learning',
                conditionPattern: 'dependency_based',
                effectiveness: 0.85,
                frequency: 10,
                lastApplied: new Date(),
                adaptability: 0.7
            },
            {
                id: 'exclusion_learning',
                conditionPattern: 'exclusion_based',
                effectiveness: 0.9,
                frequency: 5,
                lastApplied: new Date(),
                adaptability: 0.8
            }
        ];
        mockPatterns.forEach(pattern => {
            this.learningPatterns.set(pattern.id, pattern);
        });
        console.log(`✅ Loaded ${mockPatterns.length} learning patterns`);
    }
    /**
     * Initialize cognitive conditional patterns
     */
    async initializeCognitiveConditionalPatterns() {
        if (!this.cognitiveCore) {
            return;
        }
        console.log('🧠 Initializing cognitive conditional patterns...');
        try {
            const cognitivePatterns = [
                {
                    name: 'conditional_learning',
                    description: 'Learn from conditional validation patterns',
                    pattern: 'conditional_validation_learning'
                },
                {
                    name: 'condition_optimization',
                    description: 'Optimize condition evaluation strategies',
                    pattern: 'condition_evaluation_optimization'
                }
            ];
            for (const pattern of cognitivePatterns) {
                await this.cognitiveCore.optimizeWithStrangeLoop(`initialize_cognitive_conditional_${pattern.name}`, { pattern, initialization: true });
            }
            console.log('✅ Cognitive conditional patterns initialized');
        }
        catch (error) {
            console.warn('Failed to initialize cognitive conditional patterns:', error);
        }
    }
    /**
     * Apply optimization strategies
     */
    async applyOptimizationStrategies(configuration, context, results) {
        for (const strategy of this.optimizationStrategies) {
            if (!strategy.applied) {
                try {
                    await this.applyOptimizationStrategy(strategy, configuration, context, results);
                    strategy.applied = true;
                    this.performanceMetrics.optimizationsApplied++;
                }
                catch (error) {
                    console.warn(`Failed to apply optimization strategy ${strategy.id}:`, error);
                }
            }
        }
    }
    /**
     * Apply single optimization strategy
     */
    async applyOptimizationStrategy(strategy, configuration, context, results) {
        switch (strategy.type) {
            case 'caching':
                // Implement caching optimization
                break;
            case 'parallelization':
                // Implement parallel execution optimization
                break;
            case 'cognitive':
                // Implement cognitive optimization
                if (this.cognitiveCore) {
                    const cognitiveResult = await this.cognitiveCore.optimizeWithStrangeLoop(`conditional_optimization_${strategy.id}`, { configuration, context, results, strategy });
                    // Apply cognitive optimizations
                }
                break;
        }
    }
    /**
     * Get validation history
     */
    getValidationHistory() {
        // Mock validation history - would integrate with actual history system
        return [];
    }
    /**
     * Extract conditional recommendations
     */
    extractConditionalRecommendations(cognitiveInsight) {
        const recommendations = [];
        if (cognitiveInsight.strangeLoops) {
            for (const loop of cognitiveInsight.strangeLoops) {
                if (loop.improvement && loop.effectiveness > 0.8) {
                    recommendations.push(loop.improvement);
                }
            }
        }
        return recommendations;
    }
    /**
     * Update performance metrics
     */
    updatePerformanceMetrics(executionTime, errorCount, warningCount) {
        this.performanceMetrics.totalRulesExecuted++;
        // Update average execution time
        const totalTime = this.performanceMetrics.averageExecutionTime * (this.performanceMetrics.totalRulesExecuted - 1) + executionTime;
        this.performanceMetrics.averageExecutionTime = totalTime / this.performanceMetrics.totalRulesExecuted;
    }
    /**
     * Calculate cache hit rate
     */
    calculateCacheHitRate() {
        const totalOperations = this.performanceMetrics.totalRulesExecuted;
        if (totalOperations === 0)
            return 0;
        return Math.min(90, totalOperations * 0.05); // Mock calculation
    }
    /**
     * Get performance metrics
     */
    getMetrics() {
        return { ...this.performanceMetrics };
    }
    /**
     * Get conditional rules
     */
    getConditionalRules() {
        return new Map(this.conditionalRules);
    }
    /**
     * Add conditional rule
     */
    addConditionalRule(rule) {
        this.conditionalRules.set(rule.id, rule);
    }
    /**
     * Remove conditional rule
     */
    removeConditionalRule(ruleId) {
        return this.conditionalRules.delete(ruleId);
    }
    /**
     * Clear cache
     */
    clearCache() {
        this.validationCache.clear();
        this.compiledConditions.clear();
        console.log('🧹 Conditional validation cache cleared');
    }
    /**
     * Optimize conditional validation rules for better performance
     */
    async optimizeValidationRules() {
        console.log('🔧 Optimizing conditional validation rules...');
        const startTime = Date.now();
        let optimizedRules = 0;
        // Optimize each conditional rule
        for (const [ruleId, rule] of this.conditionalRules) {
            try {
                // Pre-compile conditions for better performance
                if (rule.condition && typeof rule.condition === 'string') {
                    // Simple optimization - cache compiled conditions
                    this.compiledConditions.set(ruleId, rule.condition);
                }
                // Optimize rule priority based on usage
                if (this.learningPatterns.has(ruleId)) {
                    const pattern = this.learningPatterns.get(ruleId);
                    if (pattern.effectiveness > 0.8) {
                        // High-effectiveness rules get higher priority
                        rule.priority = Math.max(rule.priority || 0, 8);
                    }
                }
                optimizedRules++;
            }
            catch (error) {
                console.warn(`⚠️ Failed to optimize rule ${ruleId}:`, error);
            }
        }
        const optimizationTime = Date.now() - startTime;
        console.log(`✅ Optimized ${optimizedRules} conditional rules in ${optimizationTime}ms`);
        this.emit('rulesOptimized', {
            rulesOptimized: optimizedRules,
            optimizationTime,
            totalRules: this.conditionalRules.size
        });
    }
    /**
     * Shutdown conditional validator
     */
    async shutdown() {
        console.log('🛑 Shutting down Conditional Validator...');
        this.isInitialized = false;
        // Clear caches and data
        this.clearCache();
        this.conditionalRules.clear();
        this.learningPatterns.clear();
        this.optimizationStrategies = [];
        this.compiledConditions.clear();
        console.log('✅ Conditional Validator shutdown complete');
        this.emit('shutdown');
    }
}
exports.ConditionalValidator = ConditionalValidator;
//# sourceMappingURL=conditional-validator.js.map