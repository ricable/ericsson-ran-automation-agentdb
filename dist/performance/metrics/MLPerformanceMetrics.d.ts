/**
 * ML Performance Metrics Architecture
 *
 * Comprehensive performance tracking for Phase 2 ML implementation
 * with real-time analytics and optimization recommendations
 */
export interface MLPerformanceMetrics {
    reinforcementLearning: {
        trainingSpeed: number;
        convergenceRate: number;
        policyAccuracy: number;
        rewardOptimization: number;
        memoryUsage: number;
        throughput: number;
    };
    causalInference: {
        discoverySpeed: number;
        causalAccuracy: number;
        predictionPrecision: number;
        graphComplexity: number;
        modelSize: number;
        inferenceLatency: number;
    };
    dspyOptimization: {
        mobilityImprovement: number;
        optimizationSpeed: number;
        adaptationRate: number;
        handoverSuccess: number;
        signalQuality: number;
        coverageOptimization: number;
    };
    agentdbIntegration: {
        vectorSearchSpeed: number;
        memoryEfficiency: number;
        synchronizationLatency: number;
        patternRetrievalSpeed: number;
        cacheHitRatio: number;
        storageUtilization: number;
    };
    cognitiveConsciousness: {
        temporalExpansionRatio: number;
        strangeLoopOptimizationRate: number;
        consciousnessEvolutionScore: number;
        autonomousHealingEfficiency: number;
        learningVelocity: number;
    };
}
export interface SwarmPerformanceMetrics {
    agentCoordination: {
        topologyEfficiency: number;
        communicationLatency: number;
        taskDistributionBalance: number;
        consensusSpeed: number;
        synchronizationAccuracy: number;
    };
    agentStates: {
        activeAgents: number;
        idleAgents: number;
        busyAgents: number;
        failedAgents: number;
        agentUtilizationRate: number;
    };
    taskPerformance: {
        taskCompletionRate: number;
        averageTaskDuration: number;
        taskQueueLength: number;
        throughput: number;
        errorRate: number;
    };
    resourceUtilization: {
        cpuUsage: number;
        memoryUsage: number;
        networkBandwidth: number;
        diskIOPS: number;
        gpuUtilization: number;
    };
}
export interface SystemHealthMetrics {
    overallSystemScore: number;
    criticalAlerts: number;
    warningAlerts: number;
    uptime: number;
    availability: number;
    responseTime: number;
    errorRate: number;
    performanceTrend: 'improving' | 'stable' | 'degrading';
}
export interface PerformanceTargets {
    reinforcementLearning: {
        trainingSpeed: number;
        convergenceRate: number;
        policyAccuracy: number;
    };
    causalInference: {
        discoverySpeed: number;
        causalAccuracy: number;
        predictionPrecision: number;
    };
    dspyOptimization: {
        mobilityImprovement: number;
        handoverSuccess: number;
        coverageOptimization: number;
    };
    agentdbIntegration: {
        vectorSearchSpeed: number;
        memoryEfficiency: number;
        synchronizationLatency: number;
    };
    cognitiveConsciousness: {
        temporalExpansionRatio: number;
        autonomousHealingEfficiency: number;
        consciousnessEvolutionScore: number;
    };
}
export interface PerformanceThresholds {
    critical: Partial<MLPerformanceMetrics>;
    warning: Partial<MLPerformanceMetrics>;
    optimal: Partial<MLPerformanceMetrics>;
}
export interface PerformanceAlert {
    id: string;
    timestamp: Date;
    severity: 'critical' | 'warning' | 'info';
    category: 'ml_performance' | 'swarm_coordination' | 'system_health' | 'resource_utilization';
    title: string;
    description: string;
    currentValue: number;
    thresholdValue: number;
    trendDirection: 'increasing' | 'decreasing' | 'stable';
    recommendations: string[];
    affectedComponents: string[];
    autoResolveActions?: string[];
}
export interface PerformanceSnapshot {
    timestamp: Date;
    mlMetrics: MLPerformanceMetrics;
    swarmMetrics: SwarmPerformanceMetrics;
    systemHealth: SystemHealthMetrics;
    activeAlerts: PerformanceAlert[];
    resourceUsage: {
        cpu: number;
        memory: number;
        network: number;
        storage: number;
        gpu: number;
    };
    environmentContext: {
        deploymentEnvironment: 'development' | 'staging' | 'production';
        agentCount: number;
        topology: 'hierarchical' | 'mesh' | 'ring' | 'star';
        workloadType: 'training' | 'inference' | 'optimization' | 'maintenance';
    };
}
export declare class MLPerformanceCollector {
    private metricsHistory;
    private maxHistorySize;
    private collectionInterval;
    private collectionTimer;
    constructor();
    collectMetrics(): Promise<PerformanceSnapshot>;
    private collectMLMetrics;
    private collectSwarmMetrics;
    private collectSystemHealthMetrics;
    private getActiveAlerts;
    private collectResourceUsage;
    private getEnvironmentContext;
    private addToHistory;
    startCollection(): void;
    stopCollection(): void;
    getMetricsHistory(limit?: number): PerformanceSnapshot[];
    getLatestMetrics(): PerformanceSnapshot | null;
    getMetricsByTimeRange(startTime: Date, endTime: Date): PerformanceSnapshot[];
}
//# sourceMappingURL=MLPerformanceMetrics.d.ts.map