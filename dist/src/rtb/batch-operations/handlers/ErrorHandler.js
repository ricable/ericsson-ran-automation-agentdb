"use strict";
/**
 * Error Handler with Intelligent Retry Mechanisms
 *
 * Advanced error handling system with cognitive retry strategies, automatic recovery,
 * and intelligent fallback mechanisms for Ericsson RAN batch operations.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
/**
 * Error Handler
 */
class ErrorHandler {
    constructor() {
        this.errorPatterns = new Map();
        this.retryHistory = new Map();
        this.recoveryStrategies = new Map();
        this.notificationSystem = new NotificationSystem();
        this.initializeErrorPatterns();
        this.initializeRecoveryStrategies();
    }
    /**
     * Handle command error with intelligent retry and recovery
     */
    async handleCommandError(errorResult, strategy, nodeId, context) {
        const startTime = Date.now();
        try {
            console.log(`Handling command error for ${nodeId}: ${errorResult.error}`);
            // Classify the error
            const classification = await this.classifyError(errorResult);
            // Check if error is retryable
            if (this.isRetryableError(errorResult, classification, strategy.retry)) {
                const retryResult = await this.executeRetryStrategy(errorResult, strategy.retry, nodeId, context, classification);
                if (retryResult.success) {
                    return {
                        recovered: true,
                        recoveryAction: {
                            id: 'retry_recovery',
                            type: 'restart',
                            triggerConditions: ['retryable_error'],
                            config: {},
                            estimatedTime: retryResult.totalDelay
                        },
                        retryAttempt: retryResult.attempt,
                        errorClassification: classification,
                        processingTime: Date.now() - startTime,
                        recoveryDetails: {
                            strategy: 'intelligent_retry',
                            successProbability: retryResult.successProbability,
                            estimatedRecoveryTime: retryResult.totalDelay,
                            context: { attempts: retryResult.attempt.attemptNumber }
                        }
                    };
                }
            }
            // Try fallback strategies
            const fallbackResult = await this.executeFallbackStrategy(errorResult, strategy.fallback, nodeId, context, classification);
            if (fallbackResult.success) {
                return {
                    recovered: true,
                    recoveryAction: fallbackResult.action,
                    recoveryCommand: fallbackResult.recoveryCommand,
                    errorClassification: classification,
                    processingTime: Date.now() - startTime,
                    recoveryDetails: {
                        strategy: fallbackResult.action.type,
                        successProbability: fallbackResult.successProbability,
                        estimatedRecoveryTime: fallbackResult.estimatedTime,
                        context: fallbackResult.context
                    }
                };
            }
            // Error could not be recovered
            return {
                recovered: false,
                errorClassification: classification,
                processingTime: Date.now() - startTime,
                recoveryDetails: {
                    strategy: 'none',
                    successProbability: 0,
                    estimatedRecoveryTime: 0,
                    context: { reason: 'No recovery strategy available' }
                }
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error in error handler';
            console.error(`Error handling failed: ${errorMessage}`);
            return {
                recovered: false,
                errorClassification: {
                    type: 'error_handler_failure',
                    category: 'systemic',
                    severity: 'critical',
                    recommendedAction: 'Manual intervention required',
                    confidence: 1.0
                },
                processingTime: Date.now() - startTime,
                recoveryDetails: {
                    strategy: 'none',
                    successProbability: 0,
                    estimatedRecoveryTime: 0,
                    context: { error: errorMessage }
                }
            };
        }
    }
    /**
     * Classify error using ML and pattern matching
     */
    async classifyError(errorResult) {
        const errorMessage = errorResult.error || 'Unknown error';
        // Check against known error patterns
        for (const [patternId, pattern] of this.errorPatterns) {
            if (pattern.pattern.test(errorMessage)) {
                return {
                    ...pattern.classification,
                    confidence: pattern.successRate
                };
            }
        }
        // Use ML-based classification for unknown errors
        const mlClassification = await this.classifyErrorWithML(errorMessage);
        return mlClassification;
    }
    /**
     * Check if error is retryable
     */
    isRetryableError(errorResult, classification, retryConfig) {
        const errorMessage = errorResult.error || '';
        // Check non-retryable patterns
        for (const pattern of retryConfig.nonRetryablePatterns) {
            if (new RegExp(pattern, 'i').test(errorMessage)) {
                return false;
            }
        }
        // Check retryable patterns
        for (const pattern of retryConfig.retryablePatterns) {
            if (new RegExp(pattern, 'i').test(errorMessage)) {
                return true;
            }
        }
        // Check error classification
        if (classification.category === 'permanent') {
            return false;
        }
        if (classification.category === 'temporary' || classification.category === 'intermittent') {
            return true;
        }
        // Default behavior: retry on most errors
        return classification.severity !== 'critical';
    }
    /**
     * Execute intelligent retry strategy
     */
    async executeRetryStrategy(errorResult, retryConfig, nodeId, context, classification) {
        const historyKey = `${nodeId}_${errorResult.commandId}`;
        const history = this.retryHistory.get(historyKey) || [];
        let attemptNumber = history.length + 1;
        let totalDelay = 0;
        // Check if we've exceeded max attempts
        if (attemptNumber > retryConfig.maxAttempts) {
            return {
                success: false,
                attempt: {
                    attemptNumber,
                    maxAttempts: retryConfig.maxAttempts,
                    nextRetryDelay: 0,
                    retryStrategy: 'exhausted',
                    backoffFactor: 1
                },
                totalDelay,
                successProbability: 0
            };
        }
        // Calculate retry delay with intelligent backoff
        const delay = this.calculateRetryDelay(attemptNumber, retryConfig, classification);
        totalDelay += delay;
        // Wait before retry
        await this.sleep(delay);
        // Attempt recovery based on error classification
        const recoverySuccess = await this.attemptErrorRecovery(errorResult, classification, nodeId, context);
        // Record retry attempt
        const retryAttempt = {
            attemptNumber,
            maxAttempts: retryConfig.maxAttempts,
            nextRetryDelay: attemptNumber < retryConfig.maxAttempts ?
                this.calculateRetryDelay(attemptNumber + 1, retryConfig, classification) : 0,
            retryStrategy: this.selectRetryStrategy(classification, attemptNumber),
            backoffFactor: Math.pow(retryConfig.backoffMultiplier, attemptNumber - 1)
        };
        history.push(retryAttempt);
        this.retryHistory.set(historyKey, history);
        return {
            success: recoverySuccess,
            attempt: retryAttempt,
            totalDelay,
            successProbability: this.calculateRetrySuccessProbability(classification, attemptNumber)
        };
    }
    /**
     * Calculate intelligent retry delay
     */
    calculateRetryDelay(attemptNumber, retryConfig, classification) {
        // Base delay with exponential backoff
        let baseDelay = retryConfig.baseDelay * Math.pow(retryConfig.backoffMultiplier, attemptNumber - 1);
        // Apply jitter if enabled
        if (retryConfig.jitter) {
            const jitterAmount = baseDelay * 0.1; // 10% jitter
            baseDelay += (Math.random() - 0.5) * 2 * jitterAmount;
        }
        // Adjust based on error classification
        if (classification.category === 'temporary') {
            baseDelay *= 0.5; // Faster retry for temporary errors
        }
        else if (classification.category === 'intermittent') {
            baseDelay *= 1.5; // Slower retry for intermittent errors
        }
        // Adjust based on severity
        if (classification.severity === 'critical') {
            baseDelay *= 2; // Longer delay for critical errors
        }
        // Ensure within bounds
        return Math.max(Math.min(baseDelay, retryConfig.maxDelay), 100); // Min 100ms
    }
    /**
     * Select optimal retry strategy
     */
    selectRetryStrategy(classification, attemptNumber) {
        if (attemptNumber === 1) {
            return 'immediate_retry';
        }
        if (classification.category === 'temporary') {
            return 'exponential_backoff';
        }
        if (classification.category === 'intermittent') {
            return 'linear_backoff';
        }
        return 'adaptive_retry';
    }
    /**
     * Attempt error recovery
     */
    async attemptErrorRecovery(errorResult, classification, nodeId, context) {
        try {
            // Apply recovery actions based on error classification
            const recoveryStrategy = this.selectRecoveryStrategy(classification);
            const strategyFunction = this.recoveryStrategies.get(recoveryStrategy);
            if (!strategyFunction) {
                console.warn(`Recovery strategy not found: ${recoveryStrategy}`);
                return false;
            }
            const result = await strategyFunction(errorResult, nodeId, context, classification);
            return result;
        }
        catch (error) {
            console.error(`Error recovery attempt failed: ${error}`);
            return false;
        }
    }
    /**
     * Select recovery strategy based on error classification
     */
    selectRecoveryStrategy(classification) {
        switch (classification.type) {
            case 'network_timeout':
                return 'network_recovery';
            case 'authentication_error':
                return 'auth_recovery';
            case 'resource_unavailable':
                return 'resource_recovery';
            case 'synchronization_error':
                return 'sync_recovery';
            case 'configuration_error':
                return 'config_recovery';
            case 'system_overload':
                return 'load_balancing_recovery';
            default:
                return 'generic_recovery';
        }
    }
    /**
     * Execute fallback strategy
     */
    async executeFallbackStrategy(errorResult, fallbackStrategies, nodeId, context, classification) {
        // Sort fallback strategies by priority
        const sortedStrategies = [...fallbackStrategies].sort((a, b) => b.priority - a.priority);
        for (const strategy of sortedStrategies) {
            try {
                // Check if trigger conditions are met
                if (this.meetsTriggerConditions(errorResult, strategy.triggerConditions, classification)) {
                    const result = await this.executeFallback(strategy, errorResult, nodeId, context);
                    if (result.success) {
                        return {
                            success: true,
                            action: {
                                id: strategy.id,
                                type: strategy.type,
                                triggerConditions: strategy.triggerConditions,
                                config: strategy.config,
                                estimatedTime: result.estimatedTime
                            },
                            recoveryCommand: result.recoveryCommand,
                            successProbability: this.calculateFallbackSuccessProbability(strategy, classification),
                            estimatedTime: result.estimatedTime,
                            context: { strategy: strategy.id, fallbackApplied: true }
                        };
                    }
                }
            }
            catch (error) {
                console.error(`Fallback strategy ${strategy.id} failed: ${error}`);
                // Continue with next strategy
            }
        }
        // No fallback strategy succeeded
        return {
            success: false,
            action: {
                id: 'no_fallback',
                type: 'skip',
                triggerConditions: [],
                config: {},
                estimatedTime: 0
            },
            successProbability: 0,
            estimatedTime: 0,
            context: { reason: 'No suitable fallback strategy' }
        };
    }
    /**
     * Execute a specific fallback strategy
     */
    async executeFallback(strategy, errorResult, nodeId, context) {
        switch (strategy.type) {
            case 'alternative_command':
                return await this.executeAlternativeCommand(strategy, errorResult, nodeId);
            case 'different_template':
                return await this.executeDifferentTemplate(strategy, errorResult, nodeId);
            case 'manual_intervention':
                return await this.requestManualIntervention(strategy, errorResult, nodeId, context);
            case 'skip':
                return { success: true, estimatedTime: 0 };
            case 'rollback':
                return await this.executeRollback(strategy, errorResult, nodeId);
            default:
                throw new Error(`Unknown fallback strategy type: ${strategy.type}`);
        }
    }
    /**
     * Execute alternative command fallback
     */
    async executeAlternativeCommand(strategy, errorResult, nodeId) {
        const alternativeCommand = strategy.config.alternativeCommand;
        if (!alternativeCommand) {
            throw new Error('Alternative command not specified in fallback config');
        }
        const recoveryCommand = {
            ...errorResult,
            command: alternativeCommand,
            commandId: `fallback_${errorResult.commandId}_${Date.now()}`
        };
        return {
            success: true,
            recoveryCommand,
            estimatedTime: 2000 // 2 seconds
        };
    }
    /**
     * Execute different template fallback
     */
    async executeDifferentTemplate(strategy, errorResult, nodeId) {
        // Generate recovery command with different template
        const recoveryCommand = {
            ...errorResult,
            commandId: `template_fallback_${errorResult.commandId}_${Date.now()}`,
            template: strategy.config.alternativeTemplate
        };
        return {
            success: true,
            recoveryCommand,
            estimatedTime: 5000 // 5 seconds
        };
    }
    /**
     * Request manual intervention fallback
     */
    async requestManualIntervention(strategy, errorResult, nodeId, context) {
        // Send notification for manual intervention
        await this.notificationSystem.sendNotification({
            type: 'manual_intervention_required',
            severity: 'high',
            message: `Manual intervention required for node ${nodeId}`,
            context: {
                nodeId,
                commandId: errorResult.commandId,
                error: errorResult.error,
                batchId: context.batchId
            }
        });
        return {
            success: false,
            estimatedTime: 0
        };
    }
    /**
     * Execute rollback fallback
     */
    async executeRollback(strategy, errorResult, nodeId) {
        const rollbackCommand = {
            ...errorResult,
            command: this.generateRollbackCommand(errorResult.command),
            commandId: `rollback_${errorResult.commandId}_${Date.now()}`,
            type: 'DELETE' // Rollback commands are typically DELETE operations
        };
        return {
            success: true,
            recoveryCommand: rollbackCommand,
            estimatedTime: 3000 // 3 seconds
        };
    }
    /**
     * Generate rollback command
     */
    generateRollbackCommand(originalCommand) {
        // Simple rollback command generation
        if (originalCommand.includes('cmedit set')) {
            return originalCommand.replace('cmedit set', 'cmedit set --rollback');
        }
        else if (originalCommand.includes('cmedit create')) {
            return originalCommand.replace('cmedit create', 'cmedit delete');
        }
        else {
            return `${originalCommand} --rollback`;
        }
    }
    /**
     * Check if fallback trigger conditions are met
     */
    meetsTriggerConditions(errorResult, triggerConditions, classification) {
        if (triggerConditions.length === 0) {
            return true; // No conditions means always trigger
        }
        for (const condition of triggerConditions) {
            if (this.evaluateTriggerCondition(condition, errorResult, classification)) {
                return true;
            }
        }
        return false;
    }
    /**
     * Evaluate trigger condition
     */
    evaluateTriggerCondition(condition, errorResult, classification) {
        const errorMessage = errorResult.error || '';
        switch (condition) {
            case 'retryable_error':
                return classification.category !== 'permanent';
            case 'network_error':
                return errorMessage.includes('network') || errorMessage.includes('connection');
            case 'timeout_error':
                return errorMessage.includes('timeout');
            case 'authentication_error':
                return errorMessage.includes('auth') || errorMessage.includes('unauthorized');
            case 'critical_error':
                return classification.severity === 'critical';
            default:
                return errorMessage.toLowerCase().includes(condition.toLowerCase());
        }
    }
    /**
     * Calculate fallback success probability
     */
    calculateFallbackSuccessProbability(strategy, classification) {
        // Base probability depends on strategy type
        let baseProbability = 0.5;
        switch (strategy.type) {
            case 'alternative_command':
                baseProbability = 0.8;
                break;
            case 'different_template':
                baseProbability = 0.7;
                break;
            case 'manual_intervention':
                baseProbability = 0.3; // Lower probability since it requires human intervention
                break;
            case 'skip':
                baseProbability = 1.0; // Always succeeds (by doing nothing)
                break;
            case 'rollback':
                baseProbability = 0.9;
                break;
        }
        // Adjust based on error classification
        if (classification.category === 'temporary') {
            baseProbability *= 1.2;
        }
        else if (classification.category === 'permanent') {
            baseProbability *= 0.5;
        }
        // Adjust based on severity
        if (classification.severity === 'critical') {
            baseProbability *= 0.7;
        }
        return Math.min(Math.max(baseProbability, 0.1), 1.0);
    }
    /**
     * Calculate retry success probability
     */
    calculateRetrySuccessProbability(classification, attemptNumber) {
        let baseProbability = 0.6;
        // Adjust based on error classification
        if (classification.category === 'temporary') {
            baseProbability = 0.9;
        }
        else if (classification.category === 'intermittent') {
            baseProbability = 0.7;
        }
        else if (classification.category === 'permanent') {
            baseProbability = 0.1;
        }
        // Decrease probability with each attempt
        baseProbability *= Math.pow(0.8, attemptNumber - 1);
        return Math.min(Math.max(baseProbability, 0.05), 0.95);
    }
    /**
     * ML-based error classification (mock implementation)
     */
    async classifyErrorWithML(errorMessage) {
        // Mock ML classification - in production, this would use actual ML models
        const lowerError = errorMessage.toLowerCase();
        // Simple rule-based classification
        if (lowerError.includes('timeout')) {
            return {
                type: 'network_timeout',
                category: 'temporary',
                severity: 'medium',
                recommendedAction: 'Retry with exponential backoff',
                confidence: 0.9
            };
        }
        if (lowerError.includes('unauthorized') || lowerError.includes('authentication')) {
            return {
                type: 'authentication_error',
                category: 'permanent',
                severity: 'high',
                recommendedAction: 'Check credentials and permissions',
                confidence: 0.95
            };
        }
        if (lowerError.includes('connection') || lowerError.includes('network')) {
            return {
                type: 'network_error',
                category: 'intermittent',
                severity: 'medium',
                recommendedAction: 'Retry with network recovery',
                confidence: 0.85
            };
        }
        if (lowerError.includes('not found') || lowerError.includes('does not exist')) {
            return {
                type: 'resource_not_found',
                category: 'permanent',
                severity: 'high',
                recommendedAction: 'Verify resource existence',
                confidence: 0.9
            };
        }
        // Default classification
        return {
            type: 'unknown_error',
            category: 'intermittent',
            severity: 'medium',
            recommendedAction: 'Retry with fallback strategy',
            confidence: 0.5
        };
    }
    /**
     * Initialize error patterns
     */
    initializeErrorPatterns() {
        const patterns = [
            {
                id: 'timeout_pattern',
                pattern: /timeout|timed out/i,
                classification: {
                    type: 'network_timeout',
                    category: 'temporary',
                    severity: 'medium',
                    recommendedAction: 'Retry with increased timeout',
                    confidence: 0.9
                },
                recommendedActions: [{
                        id: 'retry_with_timeout',
                        type: 'restart',
                        triggerConditions: ['timeout_error'],
                        config: { increaseTimeout: true },
                        estimatedTime: 5000
                    }],
                successRate: 0.85,
                frequency: 0.3
            },
            {
                id: 'auth_pattern',
                pattern: /unauthorized|authentication|login failed/i,
                classification: {
                    type: 'authentication_error',
                    category: 'permanent',
                    severity: 'high',
                    recommendedAction: 'Check authentication credentials',
                    confidence: 0.95
                },
                recommendedActions: [{
                        id: 'auth_recovery',
                        type: 'escalate',
                        triggerConditions: ['authentication_error'],
                        config: { escalateToAdmin: true },
                        estimatedTime: 10000
                    }],
                successRate: 0.95,
                frequency: 0.1
            },
            {
                id: 'connection_pattern',
                pattern: /connection.*refused|connection.*failed|network.*error/i,
                classification: {
                    type: 'network_error',
                    category: 'intermittent',
                    severity: 'medium',
                    recommendedAction: 'Retry with network recovery',
                    confidence: 0.85
                },
                recommendedActions: [{
                        id: 'network_recovery',
                        type: 'restart',
                        triggerConditions: ['network_error'],
                        config: { networkReset: true },
                        estimatedTime: 3000
                    }],
                successRate: 0.8,
                frequency: 0.2
            }
        ];
        for (const pattern of patterns) {
            this.errorPatterns.set(pattern.id, pattern);
        }
    }
    /**
     * Initialize recovery strategies
     */
    initializeRecoveryStrategies() {
        this.recoveryStrategies.set('network_recovery', this.networkRecoveryStrategy.bind(this));
        this.recoveryStrategies.set('auth_recovery', this.authRecoveryStrategy.bind(this));
        this.recoveryStrategies.set('resource_recovery', this.resourceRecoveryStrategy.bind(this));
        this.recoveryStrategies.set('sync_recovery', this.syncRecoveryStrategy.bind(this));
        this.recoveryStrategies.set('config_recovery', this.configRecoveryStrategy.bind(this));
        this.recoveryStrategies.set('load_balancing_recovery', this.loadBalancingRecoveryStrategy.bind(this));
        this.recoveryStrategies.set('generic_recovery', this.genericRecoveryStrategy.bind(this));
    }
    // Recovery strategy implementations
    async networkRecoveryStrategy(errorResult, nodeId, context, classification) {
        // Simulate network recovery
        await this.sleep(1000);
        return Math.random() > 0.2; // 80% success rate
    }
    async authRecoveryStrategy(errorResult, nodeId, context, classification) {
        // Authentication recovery usually requires human intervention
        await this.notificationSystem.sendNotification({
            type: 'authentication_failure',
            severity: 'high',
            message: `Authentication failed for node ${nodeId}`,
            context: { nodeId, error: errorResult.error }
        });
        return false;
    }
    async resourceRecoveryStrategy(errorResult, nodeId, context, classification) {
        // Simulate resource recovery
        await this.sleep(2000);
        return Math.random() > 0.3; // 70% success rate
    }
    async syncRecoveryStrategy(errorResult, nodeId, context, classification) {
        // Simulate synchronization recovery
        await this.sleep(3000);
        return Math.random() > 0.4; // 60% success rate
    }
    async configRecoveryStrategy(errorResult, nodeId, context, classification) {
        // Configuration recovery
        await this.sleep(1500);
        return Math.random() > 0.25; // 75% success rate
    }
    async loadBalancingRecoveryStrategy(errorResult, nodeId, context, classification) {
        // Load balancing recovery
        await this.sleep(2000);
        return Math.random() > 0.35; // 65% success rate
    }
    async genericRecoveryStrategy(errorResult, nodeId, context, classification) {
        // Generic recovery - just wait and retry
        await this.sleep(1000);
        return Math.random() > 0.5; // 50% success rate
    }
    /**
     * Utility function to sleep
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    /**
     * Public API methods
     */
    getRetryHistory(nodeId, commandId) {
        return this.retryHistory.get(`${nodeId}_${commandId}`) || [];
    }
    clearRetryHistory(nodeId, commandId) {
        if (nodeId && commandId) {
            this.retryHistory.delete(`${nodeId}_${commandId}`);
        }
        else {
            this.retryHistory.clear();
        }
    }
    getErrorStatistics() {
        return {
            totalPatterns: this.errorPatterns.size,
            totalRecoveryStrategies: this.recoveryStrategies.size,
            retryHistorySize: Array.from(this.retryHistory.values())
                .reduce((sum, history) => sum + history.length, 0)
        };
    }
}
exports.ErrorHandler = ErrorHandler;
/**
 * Simple notification system
 */
class NotificationSystem {
    async sendNotification(notification) {
        console.log(`[${notification.severity.toUpperCase()}] ${notification.message}`);
        // In production, this would send actual notifications
    }
}
//# sourceMappingURL=ErrorHandler.js.map