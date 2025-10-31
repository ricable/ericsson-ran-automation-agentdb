/**
 * Cognitive RAN Bottleneck Detection System
 * Automated identification of performance bottlenecks using AgentDB patterns
 * and causal inference for root cause analysis
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
import { Bottleneck } from '../../types/performance';
export declare class BottleneckDetector extends EventEmitter {
    private anomalyThresholds;
    private baselineMetrics;
    private historicalData;
    private detectionInterval;
    private readonly detectionIntervalMs;
    constructor();
    /**
     * Start bottleneck detection
     */
    start(): Promise<void>;
    /**
     * Stop bottleneck detection
     */
    stop(): Promise<void>;
    /**
     * Initialize performance thresholds
     */
    private initializeThresholds;
    /**
     * Initialize baseline metrics
     */
    private initializeBaselines;
    /**
     * Main detection cycle
     */
    private runDetectionCycle;
    /**
     * Detect performance bottlenecks
     */
    private detectBottlenecks;
    /**
     * Detect system resource bottlenecks
     */
    private detectSystemBottlenecks;
    /**
     * Detect cognitive performance bottlenecks
     */
    private detectCognitiveBottlenecks;
    /**
     * Detect AgentDB bottlenecks
     */
    private detectAgentDBBottlenecks;
    /**
     * Detect coordination bottlenecks
     */
    private detectCoordinationBottlenecks;
    /**
     * Detect performance anomalies
     */
    private detectAnomalies;
    /**
     * Detect performance regressions
     */
    private detectRegressions;
    /**
     * Detect threshold breaches
     */
    private detectThresholdBreaches;
    /**
     * Detect trend anomalies
     */
    private detectTrendAnomalies;
    /**
     * Calculate trend in data series
     */
    private calculateTrend;
    /**
     * Update metrics data
     */
    updateMetrics(type: string, metrics: any): void;
    /**
     * Get active bottlenecks
     */
    getActiveBottlenecks(): Bottleneck[];
    /**
     * Get performance insights
     */
    getPerformanceInsights(): any;
}
//# sourceMappingURL=BottleneckDetector.d.ts.map