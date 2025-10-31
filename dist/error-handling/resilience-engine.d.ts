/**
 * Resilience Engine with Self-Healing Patterns
 * Advanced error handling, recovery, and system resilience for RAN optimization
 */
import { StreamMessage, StreamAgent } from '../stream-chain/core';
export interface ErrorEvent {
    id: string;
    timestamp: number;
    source: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    type: 'system' | 'network' | 'optimization' | 'execution' | 'communication' | 'data';
    category: 'timeout' | 'connection' | 'validation' | 'resource' | 'logic' | 'performance' | 'security';
    message: string;
    details: any;
    context: {
        component: string;
        operation: string;
        parameters?: any;
        environment: string;
    };
    impact: {
        affectedComponents: string[];
        userImpact: 'none' | 'minimal' | 'moderate' | 'severe' | 'critical';
        businessImpact: 'none' | 'low' | 'medium' | 'high' | 'critical';
        estimatedDowntime?: number;
    };
    detection: {
        method: 'active' | 'passive' | 'predictive';
        source: string;
        latency: number;
    };
}
export interface RecoveryAction {
    id: string;
    errorId: string;
    strategy: 'retry' | 'circuit-breaker' | 'fallback' | 'self-heal' | 'graceful-degradation' | 'isolation';
    status: 'pending' | 'executing' | 'completed' | 'failed' | 'bypassed';
    startTime: number;
    endTime?: number;
    configuration: {
        maxAttempts: number;
        retryDelay: number;
        backoffStrategy: 'linear' | 'exponential' | 'adaptive';
        timeoutMs: number;
    };
    execution: {
        attempt: number;
        attemptsRemaining: number;
        lastError?: string;
        progress: number;
    };
    result: {
        success: boolean;
        recoveryTime: number;
        rootCauseIdentified: boolean;
        permanentFix: boolean;
        lessons: string[];
    };
}
export interface CircuitBreakerState {
    id: string;
    component: string;
    state: 'closed' | 'open' | 'half-open';
    failureCount: number;
    failureThreshold: number;
    successThreshold: number;
    timeoutMs: number;
    lastFailureTime: number;
    nextAttemptTime: number;
    statistics: {
        totalRequests: number;
        totalFailures: number;
        totalSuccesses: number;
        averageResponseTime: number;
        lastFailureRate: number;
    };
}
export interface HealthCheck {
    id: string;
    component: string;
    type: 'liveness' | 'readiness' | 'deep' | 'custom';
    status: 'healthy' | 'degraded' | 'unhealthy' | 'unknown';
    lastCheck: number;
    responseTime: number;
    details: {
        [checkName: string]: {
            status: 'pass' | 'fail' | 'warn';
            message?: string;
            duration?: number;
        };
    };
    dependencies: {
        [dependency: string]: 'healthy' | 'degraded' | 'unhealthy' | 'unknown';
    };
}
export interface ResilienceConfig {
    circuitBreakerThreshold: number;
    circuitBreakerTimeoutMs: number;
    maxRetryAttempts: number;
    baseRetryDelayMs: number;
    maxRetryDelayMs: number;
    healthCheckIntervalMs: number;
    healthCheckTimeoutMs: number;
    enablePredictiveFailureDetection: boolean;
    enableSelfHealing: boolean;
    enableGracefulDegradation: boolean;
    enableFaultIsolation: boolean;
    errorRetentionPeriodMs: number;
    recoveryActionTimeoutMs: number;
}
export interface ResilienceMetrics {
    errorRate: number;
    recoveryRate: number;
    meanTimeToRecovery: number;
    meanTimeBetweenFailures: number;
    circuitBreakerTrips: number;
    selfHealingSuccessRate: number;
    availability: number;
    resilienceScore: number;
}
export declare class ResilienceEngine implements StreamAgent {
    id: string;
    type: "monitor";
    name: string;
    capabilities: string[];
    temporalReasoning: boolean;
    errorHandling: {
        strategy: "self-heal";
        maxAttempts: number;
        recoveryPattern: "adaptive";
    };
    private config;
    private errorHistory;
    private recoveryActions;
    private circuitBreakers;
    private healthChecks;
    private failurePredictor;
    private selfHealingEngine;
    private gracefulDegradationManager;
    private faultIsolationManager;
    private metrics;
    constructor(config: ResilienceConfig);
    /**
     * Process messages and monitor for errors
     */
    process(message: StreamMessage): Promise<StreamMessage>;
    /**
     * Detect errors in incoming messages
     */
    private detectErrors;
    /**
     * Handle detected errors
     */
    private handleError;
    /**
     * Create recovery action for error
     */
    private createRecoveryAction;
    /**
     * Determine recovery strategy based on error
     */
    private determineRecoveryStrategy;
    /**
     * Execute recovery action
     */
    private executeRecovery;
    /**
     * Execute retry recovery
     */
    private executeRetryRecovery;
    /**
     * Execute circuit breaker recovery
     */
    private executeCircuitBreakerRecovery;
    /**
     * Execute self-healing recovery
     */
    private executeSelfHealingRecovery;
    /**
     * Execute graceful degradation recovery
     */
    private executeGracefulDegradationRecovery;
    /**
     * Execute fallback recovery
     */
    private executeFallbackRecovery;
    /**
     * Execute isolation recovery
     */
    private executeIsolationRecovery;
    /**
     * Perform health checks
     */
    private performHealthChecks;
    /**
     * Perform health check for specific component
     */
    private performComponentHealthCheck;
    /**
     * Update circuit breakers
     */
    private updateCircuitBreakers;
    /**
     * Predict potential failures
     */
    private predictFailures;
    /**
     * Take preventive action based on prediction
     */
    private takePreventiveAction;
    /**
     * Update resilience metrics
     */
    private updateMetrics;
    /**
     * Calculate overall resilience score
     */
    private calculateResilienceScore;
    /**
     * Get circuit breaker for component
     */
    private getCircuitBreaker;
    /**
     * Get overall health status
     */
    private getOverallHealthStatus;
    /**
     * Check system resources
     */
    private checkSystemResources;
    /**
     * Start health monitoring
     */
    private startHealthMonitoring;
    /**
     * Clean up old data
     */
    private cleanupOldData;
    /**
     * Create error event
     */
    private createErrorEvent;
    /**
     * Generate unique ID
     */
    private generateId;
    /**
     * Initialize metrics
     */
    private initializeMetrics;
    /**
     * Get resilience engine status
     */
    getStatus(): any;
}
export default ResilienceEngine;
//# sourceMappingURL=resilience-engine.d.ts.map