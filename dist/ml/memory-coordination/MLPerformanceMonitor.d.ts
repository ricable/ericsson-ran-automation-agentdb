/**
 * MLPerformanceMonitor - Real-time Performance Monitoring for ML Memory Coordination
 * Comprehensive tracking of memory usage, performance metrics, and optimization
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
import { MLPatternStorage } from './MLPatternStorage';
import { CrossAgentMemoryCoordinator } from './CrossAgentMemoryCoordinator';
export interface PerformanceMetrics {
    timestamp: number;
    memoryUsage: MemoryUsageMetrics;
    transferMetrics: TransferMetrics;
    searchMetrics: SearchMetrics;
    learningMetrics: LearningMetrics;
    systemMetrics: SystemMetrics;
    agentMetrics: AgentPerformanceMetrics[];
}
export interface MemoryUsageMetrics {
    totalMemoryGB: number;
    usedMemoryGB: number;
    availableMemoryGB: number;
    memoryUtilization: number;
    vectorIndexMemoryGB: number;
    patternMemoryGB: number;
    agentDBMemoryGB: number;
    compressionRatio: number;
    memoryGrowthRate: number;
    memoryEfficiency: number;
}
export interface TransferMetrics {
    totalTransfers: number;
    successfulTransfers: number;
    failedTransfers: number;
    averageLatency: number;
    minLatency: number;
    maxLatency: number;
    throughputMBps: number;
    dataTransferredGB: number;
    compressionRatio: number;
    crossAgentSuccessRate: number;
    activeConnections: number;
}
export interface SearchMetrics {
    totalSearches: number;
    successfulSearches: number;
    averageSearchTime: number;
    minSearchTime: number;
    maxSearchTime: number;
    searchesPerSecond: number;
    vectorSearchTime: number;
    patternMatchingTime: number;
    cacheHitRate: number;
    searchAccuracy: number;
    resultRelevanceScore: number;
}
export interface LearningMetrics {
    totalEpisodes: number;
    successfulEpisodes: number;
    averageSuccessRate: number;
    learningRate: number;
    adaptationCount: number;
    patternCreationRate: number;
    knowledgeTransferRate: number;
    crossAgentLearningRate: number;
    patternEvolutionRate: number;
    convergenceScore: number;
}
export interface SystemMetrics {
    cpuUtilization: number;
    memoryUtilization: number;
    diskUtilization: number;
    networkLatency: number;
    systemLoad: number;
    availableThreads: number;
    ioWaitTime: number;
    contextSwitches: number;
    interruptRate: number;
    systemStability: number;
}
export interface AgentPerformanceMetrics {
    agentId: string;
    agentType: string;
    isActive: boolean;
    responseTime: number;
    throughput: number;
    memoryUsage: number;
    successRate: number;
    errorRate: number;
    lastActivity: number;
    uptime: number;
    connectionQuality: number;
    resourceUtilization: number;
}
export interface PerformanceThresholds {
    memoryUsageWarning: number;
    memoryUsageCritical: number;
    latencyWarning: number;
    latencyCritical: number;
    successRateWarning: number;
    successRateCritical: number;
    throughputWarning: number;
    throughputCritical: number;
    memoryGrowthRateWarning: number;
    memoryGrowthRateCritical: number;
}
export interface PerformanceAlert {
    alertId: string;
    severity: 'info' | 'warning' | 'critical';
    category: 'memory' | 'latency' | 'throughput' | 'success_rate' | 'system';
    message: string;
    current_value: number;
    threshold: number;
    timestamp: number;
    resolved: boolean;
    resolution_time?: number;
    suggested_actions: string[];
}
export interface PerformanceOptimization {
    optimizationId: string;
    type: 'memory_cleanup' | 'cache_optimization' | 'index_rebuild' | 'compression_adjustment';
    description: string;
    impact: {
        memory_saved: number;
        performance_improvement: number;
        latency_reduction: number;
    };
    execution_time: number;
    success: boolean;
    timestamp: number;
}
export interface PerformanceHistory {
    timeframe: 'minute' | 'hour' | 'day' | 'week' | 'month';
    dataPoints: number;
    metrics: {
        timestamps: number[];
        memoryUsage: number[];
        transferLatency: number[];
        searchTime: number[];
        successRate: number[];
        throughput: number[];
    };
    trends: {
        memory_trend: 'increasing' | 'decreasing' | 'stable';
        latency_trend: 'increasing' | 'decreasing' | 'stable';
        performance_trend: 'improving' | 'degrading' | 'stable';
    };
    anomalies: PerformanceAnomaly[];
}
export interface PerformanceAnomaly {
    anomalyId: string;
    timestamp: number;
    metric: string;
    value: number;
    expectedValue: number;
    deviation: number;
    severity: 'low' | 'medium' | 'high';
    description: string;
    potential_causes: string[];
}
export interface MLPerformanceMonitorConfig {
    monitoring_interval: number;
    history_retention: number;
    alert_thresholds: PerformanceThresholds;
    auto_optimization_enabled: boolean;
    real_time_monitoring: boolean;
    detailed_logging: boolean;
    performance_baselines: {
        memory_usage: number;
        latency: number;
        throughput: number;
        success_rate: number;
    };
}
export declare class MLPerformanceMonitor extends EventEmitter {
    private config;
    private patternStorage;
    private crossAgentCoordinator;
    private isMonitoring;
    private monitoringInterval;
    private performanceHistory;
    private activeAlerts;
    private recentMetrics;
    private performanceBaselines;
    private optimizationQueue;
    private activeOptimizations;
    private currentMetrics;
    private trendAnalysis;
    private anomalyDetector;
    private performancePredictor;
    constructor(config: MLPerformanceMonitorConfig);
    /**
     * Initialize performance monitoring system
     */
    initialize(patternStorage: MLPatternStorage, crossAgentCoordinator: CrossAgentMemoryCoordinator): Promise<void>;
    /**
     * Start real-time performance monitoring
     */
    startMonitoring(): Promise<void>;
    /**
     * Stop performance monitoring
     */
    stopMonitoring(): Promise<void>;
    /**
     * Get current performance metrics
     */
    getCurrentMetrics(): Promise<PerformanceMetrics>;
    /**
     * Get performance history for specified timeframe
     */
    getPerformanceHistory(timeframe: string): Promise<PerformanceHistory>;
    /**
     * Get active performance alerts
     */
    getActiveAlerts(): Promise<PerformanceAlert[]>;
    /**
     * Execute performance optimization
     */
    optimizePerformance(optimizationType: string): Promise<PerformanceOptimization>;
    /**
     * Get comprehensive performance report
     */
    generatePerformanceReport(timeframe?: string): Promise<any>;
    private initializePerformanceBaselines;
    private initializeAnalytics;
    private initializeBaselineMetrics;
    private setupRealTimeMonitoring;
    private initializeAlertSystem;
    private setupPerformanceAnalytics;
    private initializeAutoOptimization;
    private collectMetrics;
    private analyzePerformance;
    private checkAlerts;
    private updateHistory;
    private updateTimeframeHistory;
    private createNewHistory;
    private getMaxDataPoints;
    private calculateTrends;
    private calculateTrend;
    private createAlert;
    private getSuggestedActions;
    private isAlertResolved;
    private collectSystemMetrics;
    private collectAgentMetrics;
    private createOptimization;
    private executeMemoryCleanup;
    private executeCacheOptimization;
    private executeIndexRebuild;
    private executeCompressionAdjustment;
    private calculatePerformanceSummary;
    private generateRecommendations;
    private suggestOptimizations;
    private calculateHealthScore;
}
export default MLPerformanceMonitor;
//# sourceMappingURL=MLPerformanceMonitor.d.ts.map