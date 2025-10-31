/**
 * Action Execution Engine with Closed-Loop Feedback
 * Automated RAN optimization execution with real-time feedback and self-correction
 */
import { StreamMessage, StreamAgent } from '../stream-chain/core';
import { RANMetrics } from '../data-ingestion/ran-ingestion';
export interface ActionExecution {
    id: string;
    decisionId: string;
    sourceCell: string;
    actionType: 'parameter-change' | 'feature-activation' | 'resource-allocation' | 'topology-modification';
    status: 'pending' | 'executing' | 'completed' | 'failed' | 'rolled-back' | 'paused';
    startTime: number;
    endTime?: number;
    execution: {
        phase: 'preparation' | 'validation' | 'implementation' | 'verification' | 'finalization';
        progress: number;
        stepsCompleted: number;
        totalSteps: number;
        currentStep?: string;
    };
    parameters: {
        [paramName: string]: {
            previousValue: number | string | boolean;
            targetValue: number | string | boolean;
            currentValue?: number | string | boolean;
            unit?: string;
        };
    };
    rollback: {
        available: boolean;
        triggered: boolean;
        reason?: string;
        originalValues: {
            [param: string]: any;
        };
    };
    safety: {
        checksPassed: number;
        checksFailed: number;
        warnings: string[];
        stopConditions: string[];
    };
    impact: {
        expected: {
            kpi: string;
            direction: 'increase' | 'decrease';
            magnitude: number;
            timeToEffect: number;
        }[];
        measured: {
            kpi: string;
            beforeValue: number;
            afterValue: number;
            change: number;
            confidence: number;
        }[];
    };
    feedback: {
        realTimeMetrics: RANMetrics[];
        anomalyDetections: {
            timestamp: number;
            type: string;
            severity: 'low' | 'medium' | 'high' | 'critical';
            description: string;
        }[];
        userFeedback?: {
            rating: number;
            comments: string;
            timestamp: number;
        };
    };
    learning: {
        effectivenessScore: number;
        adaptationNeeded: boolean;
        lessons: string[];
        knowledgeGained: string;
    };
}
export interface ExecutionConfig {
    maxConcurrentExecutions: number;
    executionTimeout: number;
    verificationTimeout: number;
    rollbackTimeout: number;
    safetyCheckInterval: number;
    feedbackSamplingRate: number;
    enableAutoRollback: boolean;
    enablePredictiveVerification: boolean;
    enableRealTimeAdaptation: boolean;
    minConfidenceThreshold: number;
    maxImpactThreshold: number;
}
export interface ClosedLoopMetrics {
    cycleTime: number;
    responseTime: number;
    successRate: number;
    rollbackRate: number;
    averageImprovement: number;
    learningRate: number;
    adaptationFrequency: number;
    anomalyDetectionRate: number;
}
export interface ExecutionPlan {
    id: string;
    name: string;
    description: string;
    actions: ActionExecution[];
    dependencies: {
        [actionId: string]: string[];
    };
    schedule: {
        startTime: number;
        phases: {
            name: string;
            duration: number;
            actions: string[];
        }[];
    };
    rollback: {
        strategy: 'immediate' | 'gradual' | 'conditional';
        triggers: string[];
        timeout: number;
    };
}
export declare class ActionExecutionEngine implements StreamAgent {
    id: string;
    type: "executor";
    name: string;
    capabilities: string[];
    temporalReasoning: boolean;
    errorHandling: {
        strategy: "self-heal";
        maxAttempts: number;
        recoveryPattern: "adaptive";
    };
    private config;
    private activeExecutions;
    private executionHistory;
    private executionQueue;
    private safetyMonitor;
    private feedbackController;
    private adaptationEngine;
    private rollbackManager;
    private closedLoopMetrics;
    constructor(config: ExecutionConfig);
    /**
     * Process optimization decisions and execute actions
     */
    process(message: StreamMessage): Promise<StreamMessage>;
    /**
     * Create execution from optimization decision
     */
    private createExecution;
    /**
     * Determine action type from strategy
     */
    private determineActionType;
    /**
     * Calculate total steps for execution
     */
    private calculateTotalSteps;
    /**
     * Extract parameters from strategy
     */
    private extractParameters;
    /**
     * Get current parameter value from RAN
     */
    private getCurrentParameterValue;
    /**
     * Get parameter unit
     */
    private getParameterUnit;
    /**
     * Process execution queue
     */
    private processExecutionQueue;
    /**
     * Start execution of an action
     */
    private startExecution;
    /**
     * Execute a specific phase of the execution
     */
    private executePhase;
    /**
     * Execute preparation phase
     */
    private executePreparationPhase;
    /**
     * Execute validation phase
     */
    private executeValidationPhase;
    /**
     * Execute implementation phase
     */
    private executeImplementationPhase;
    /**
     * Execute verification phase
     */
    private executeVerificationPhase;
    /**
     * Execute finalization phase
     */
    private executeFinalizationPhase;
    /**
     * Validate parameter value
     */
    private validateParameter;
    /**
     * Set parameter value in RAN
     */
    private setParameterValue;
    /**
     * Monitor for immediate adverse effects
     */
    private monitorImmediateEffects;
    /**
     * Collect current metrics from RAN
     */
    private collectCurrentMetrics;
    /**
     * Detect critical issues in metrics
     */
    private detectCriticalIssues;
    /**
     * Verify expected impact
     */
    private verifyExpectedImpact;
    /**
     * Calculate measured impact
     */
    private calculateMeasuredImpact;
    /**
     * Extract KPI value from metrics
     */
    private extractKPIValue;
    /**
     * Generate learning insights
     */
    private generateLearningInsights;
    /**
     * Clean up execution resources
     */
    private cleanupExecution;
    /**
     * Monitor active executions
     */
    private monitorActiveExecutions;
    /**
     * Collect feedback from active executions
     */
    private collectFeedback;
    /**
     * Adapt execution strategies based on feedback
     */
    private adaptExecutionStrategies;
    /**
     * Update closed-loop metrics
     */
    private updateMetrics;
    /**
     * Calculate success rate
     */
    private calculateSuccessRate;
    /**
     * Calculate average improvement
     */
    private calculateAverageImprovement;
    /**
     * Calculate rollback rate
     */
    private calculateRollbackRate;
    /**
     * Initialize metrics
     */
    private initializeMetrics;
    /**
     * Generate unique ID
     */
    private generateId;
    /**
     * Get execution engine status
     */
    getStatus(): any;
}
export default ActionExecutionEngine;
//# sourceMappingURL=execution-engine.d.ts.map