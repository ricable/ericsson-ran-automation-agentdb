/**
 * AgentDB Integration Monitoring
 * Specialized monitoring for AgentDB QUIC synchronization performance
 * with <1ms latency targets and vector search optimization
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
import { AgentDBMetrics, PerformanceAnomaly } from '../../types/performance';
export declare class AgentDBMonitor extends EventEmitter {
    private metrics;
    private quicMetrics;
    private vectorMetrics;
    private syncMetrics;
    private monitoringInterval;
    private readonly monitoringIntervalMs;
    private readonly maxMetricsHistory;
    private readonly thresholds;
    constructor();
    /**
     * Start AgentDB monitoring
     */
    start(): Promise<void>;
    /**
     * Stop AgentDB monitoring
     */
    stop(): Promise<void>;
    /**
     * Initialize metric tracking
     */
    private initializeMetricTracking;
    /**
     * Collect AgentDB performance metrics
     */
    private collectAgentDBMetrics;
    /**
     * Measure vector search latency
     */
    private measureVectorSearchLatency;
    /**
     * Measure QUIC synchronization latency
     */
    private measureQUICSyncLatency;
    /**
     * Measure memory usage
     */
    private measureMemoryUsage;
    /**
     * Measure index size
     */
    private measureIndexSize;
    /**
     * Measure query throughput
     */
    private measureQueryThroughput;
    /**
     * Measure sync success rate
     */
    private measureSyncSuccessRate;
    /**
     * Measure compression ratio
     */
    private measureCompressionRatio;
    /**
     * Measure cache hit rate
     */
    private measureCacheHitRate;
    /**
     * Update detailed metrics tracking
     */
    private updateDetailedMetrics;
    /**
     * Check performance thresholds and emit alerts
     */
    private checkPerformanceThresholds;
    /**
     * Check QUIC sync health specifically
     */
    private checkQUICSyncHealth;
    /**
     * Calculate variance of array values
     */
    private calculateVariance;
    /**
     * Get real-time AgentDB metrics
     */
    getCurrentMetrics(): AgentDBMetrics | null;
    /**
     * Get metrics history
     */
    getMetricsHistory(limit?: number): AgentDBMetrics[];
    /**
     * Get QUIC performance summary
     */
    getQUICPerformanceSummary(): any;
    /**
     * Calculate QUIC health score (0-100)
     */
    private calculateQUICHealthScore;
    /**
     * Get vector search performance summary
     */
    getVectorSearchSummary(): any;
    /**
     * Calculate vector search performance score
     */
    private calculateVectorSearchScore;
    /**
     * Detect performance anomalies
     */
    detectAnomalies(): PerformanceAnomaly[];
    /**
     * Get optimization recommendations
     */
    getOptimizationRecommendations(): any[];
    /**
     * Get comprehensive AgentDB health report
     */
    getHealthReport(): any;
    /**
     * Export metrics for external analysis
     */
    exportMetrics(format?: 'json' | 'csv'): string;
}
//# sourceMappingURL=AgentDBMonitor.d.ts.map