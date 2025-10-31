/**
 * Cognitive RAN Performance Data Collector
 * Real-time collection of system, agent, and cognitive performance metrics
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
export declare class PerformanceCollector extends EventEmitter {
    private collectionInterval;
    private metricsBuffer;
    private readonly maxBufferSize;
    private readonly collectionIntervalMs;
    constructor();
    /**
     * Start performance data collection
     */
    start(): Promise<void>;
    /**
     * Stop performance data collection
     */
    stop(): Promise<void>;
    /**
     * Initialize metrics buffers
     */
    private initializeBuffers;
    /**
     * Collect all performance metrics in parallel
     */
    private collectAllMetrics;
    /**
     * Collect system performance metrics
     */
    private collectSystemMetrics;
    /**
     * Collect cognitive consciousness metrics
     */
    private collectCognitiveMetrics;
    /**
     * Collect SWE-Bench performance metrics
     */
    private collectSWEbenchMetrics;
    /**
     * Collect AgentDB performance metrics
     */
    private collectAgentDBMetrics;
    /**
     * Collect Claude-Flow performance metrics
     */
    private collectClaudeFlowMetrics;
    /**
     * Collect SPARC methodology metrics
     */
    private collectSparcMetrics;
    /**
     * Store metrics in circular buffer
     */
    private storeMetrics;
    /**
     * Get recent metrics for analysis
     */
    getMetrics(type: string, limit?: number): any[];
    /**
     * Get metrics in time range
     */
    getMetricsInTimeRange(type: string, start: Date, end: Date): any[];
    /**
     * Get current system health summary
     */
    getHealthSummary(): any;
    /**
     * Export metrics for analysis
     */
    exportMetrics(type?: string, format?: 'json' | 'csv'): string;
}
//# sourceMappingURL=PerformanceCollector.d.ts.map