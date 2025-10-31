/**
 * Performance Monitoring with Sub-Second Anomaly Detection
 * Real-time performance monitoring, anomaly detection, and automated response
 */
import { StreamMessage, StreamAgent } from '../stream-chain/core';
export interface PerformanceMetrics {
    timestamp: number;
    source: string;
    latency: {
        processing: number;
        endToEnd: number;
        network: number;
    };
    throughput: {
        messages: number;
        data: number;
        requests: number;
    };
    resources: {
        cpu: number;
        memory: number;
        disk: number;
        network: number;
    };
    errors: {
        rate: number;
        count: number;
        types: {
            [type: string]: number;
        };
    };
    availability: {
        uptime: number;
        downtime: number;
        incidents: number;
    };
    quality: {
        successRate: number;
        accuracy: number;
        consistency: number;
    };
}
export interface AnomalyDetection {
    id: string;
    timestamp: number;
    source: string;
    type: 'performance' | 'availability' | 'quality' | 'resource' | 'behavioral' | 'predictive';
    severity: 'low' | 'medium' | 'high' | 'critical';
    confidence: number;
    description: string;
    indicators: {
        metric: string;
        currentValue: number;
        expectedValue: number;
        deviation: number;
        threshold: number;
    }[];
    context: {
        duration: number;
        frequency: number;
        impact: string;
        affectedComponents: string[];
    };
    rootCause: {
        likely: string[];
        confidence: number;
        evidence: string[];
    };
    response: {
        automated: boolean;
        actions: string[];
        escalationRequired: boolean;
        estimatedResolutionTime: number;
    };
}
export interface PerformanceThreshold {
    metric: string;
    category: 'latency' | 'throughput' | 'resource' | 'error' | 'availability' | 'quality';
    operator: '>' | '<' | '=' | '>=' | '<=';
    threshold: number;
    severity: 'low' | 'medium' | 'high' | 'critical';
    windowMs: number;
    consecutive: number;
}
export interface AnomalyDetectionConfig {
    detectionIntervalMs: number;
    responseTimeThresholdMs: number;
    enablePredictiveDetection: boolean;
    enableRealTimeAlerting: boolean;
    enableAutomatedResponse: boolean;
    anomalyRetentionPeriodMs: number;
    metricsRetentionPeriodMs: number;
    learningRate: number;
    adaptationEnabled: boolean;
    alertingChannels: string[];
}
export interface PerformanceBaseline {
    metric: string;
    baseline: number;
    variance: number;
    trend: 'increasing' | 'decreasing' | 'stable';
    seasonality: {
        daily: number[];
        weekly: number[];
        monthly: number[];
    };
    lastUpdated: number;
    confidence: number;
}
export declare class PerformanceMonitor implements StreamAgent {
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
    private metricsHistory;
    private anomalyHistory;
    private baselines;
    private thresholds;
    private anomalyDetector;
    private predictiveEngine;
    private responseManager;
    private learningEngine;
    private alertingSystem;
    constructor(config: AnomalyDetectionConfig);
    /**
     * Process messages and monitor performance
     */
    process(message: StreamMessage): Promise<StreamMessage>;
    /**
     * Collect current performance metrics
     */
    private collectPerformanceMetrics;
    /**
     * Detect anomalies in current metrics
     */
    private detectAnomalies;
    /**
     * Check metric against threshold
     */
    private checkThreshold;
    /**
     * Detect pattern-based anomalies
     */
    private detectPatternAnomalies;
    /**
     * Handle detected anomaly
     */
    private handleAnomaly;
    /**
     * Update performance baselines
     */
    private updateBaselines;
    /**
     * Predict future anomalies
     */
    private predictFutureAnomalies;
    /**
     * Adapt thresholds based on recent performance
     */
    private adaptThresholds;
    /**
     * Get metric value from metrics object
     */
    private getMetricValue;
    /**
     * Evaluate condition
     */
    private evaluateCondition;
    /**
     * Get anomaly type from category
     */
    private getAnomalyType;
    /**
     * Calculate anomaly frequency
     */
    private calculateAnomalyFrequency;
    /**
     * Assess business impact
     */
    private assessBusinessImpact;
    /**
     * Identify root causes
     */
    private identifyRootCauses;
    /**
     * Generate response actions
     */
    private generateResponseActions;
    /**
     * Estimate resolution time
     */
    private estimateResolutionTime;
    /**
     * Take preventive action
     */
    private takePreventiveAction;
    /**
     * Find active anomaly
     */
    private findActiveAnomaly;
    /**
     * Get system metrics
     */
    private getSystemMetrics;
    /**
     * Get application metrics
     */
    private getApplicationMetrics;
    /**
     * Get network metrics
     */
    private getNetworkMetrics;
    /**
     * Calculate message throughput
     */
    private calculateMessageThroughput;
    /**
     * Calculate uptime
     */
    private calculateUptime;
    /**
     * Calculate downtime
     */
    private calculateDowntime;
    /**
     * Calculate success rate
     */
    private calculateSuccessRate;
    /**
     * Calculate accuracy
     */
    private calculateAccuracy;
    /**
     * Calculate consistency
     */
    private calculateConsistency;
    /**
     * Initialize performance thresholds
     */
    private initializeThresholds;
    /**
     * Start monitoring loop
     */
    private startMonitoring;
    /**
     * Perform periodic health checks
     */
    private performHealthChecks;
    /**
     * Clean up old data
     */
    private cleanupOldData;
    /**
     * Generate unique ID
     */
    private generateId;
    /**
     * Get performance monitor status
     */
    getStatus(): any;
}
export default PerformanceMonitor;
//# sourceMappingURL=anomaly-detector.d.ts.map