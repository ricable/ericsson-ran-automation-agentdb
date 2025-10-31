/**
 * MemoryCoordinationManager - Main Integration for Phase 2 ML Memory Coordination
 * Orchestrates all memory coordination components for optimal ML development workflow
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
import { MemoryCoordinatorConfig } from './MLPatternStorage';
import { CrossAgentConfig } from './CrossAgentMemoryCoordinator';
import { MLPerformanceMonitorConfig } from './MLPerformanceMonitor';
import { TemporalMemoryConfig } from './TemporalMemoryPatterns';
export interface MemoryCoordinationManagerConfig {
    agentdb_config: any;
    pattern_storage_config: MemoryCoordinatorConfig;
    cross_agent_config: CrossAgentConfig;
    performance_monitor_config: MLPerformanceMonitorConfig;
    temporal_patterns_config: TemporalMemoryConfig;
    cognitive_config: {
        level: 'minimum' | 'medium' | 'maximum';
        temporalExpansion: number;
        strangeLoopOptimization: boolean;
        autonomousAdaptation: boolean;
    };
    system_config: {
        enableAutoOptimization: boolean;
        enableRealTimeMonitoring: boolean;
        enablePredictiveAnalysis: boolean;
        enableCrossAgentLearning: boolean;
        syncInterval: number;
        optimizationInterval: number;
        healthCheckInterval: number;
    };
}
export interface MemoryCoordinationStatus {
    status: 'initializing' | 'running' | 'optimizing' | 'error' | 'stopped';
    components: {
        agentdb: ComponentStatus;
        pattern_storage: ComponentStatus;
        cross_agent_coordinator: ComponentStatus;
        performance_monitor: ComponentStatus;
        temporal_patterns: ComponentStatus;
        cognitive_core: ComponentStatus;
    };
    system_metrics: {
        totalMemoryUsage: number;
        activeAgents: number;
        patternsStored: number;
        crossAgentTransfers: number;
        averageLatency: number;
        systemHealth: number;
    };
    performance_indicators: {
        learning_rate: number;
        adaptation_speed: number;
        pattern_discovery_rate: number;
        anomaly_detection_accuracy: number;
        forecasting_accuracy: number;
        cross_agent_success_rate: number;
    };
}
export interface ComponentStatus {
    initialized: boolean;
    active: boolean;
    last_health_check: number;
    health_score: number;
    error_count: number;
    last_error?: string;
}
export interface MemoryCoordinationMetrics {
    timestamp: number;
    storage_metrics: any;
    coordination_metrics: any;
    performance_metrics: any;
    temporal_metrics: any;
    cognitive_metrics: any;
    overall_health: number;
}
export interface CoordinationRequest {
    requestId: string;
    type: 'store_pattern' | 'retrieve_patterns' | 'share_knowledge' | 'analyze_performance' | 'forecast_trends';
    priority: 'low' | 'medium' | 'high' | 'critical';
    data: any;
    metadata: {
        source_agent: string;
        target_agents?: string[];
        domain?: string;
        time_constraints?: {
            deadline: number;
            max_latency: number;
        };
        quality_requirements?: {
            min_confidence: number;
            min_accuracy: number;
        };
    };
}
export interface CoordinationResponse {
    requestId: string;
    success: boolean;
    data: any;
    metadata: {
        processing_time: number;
        confidence: number;
        quality_score: number;
        components_used: string[];
        performance_impact: any;
    };
    errors?: string[];
}
export declare class MemoryCoordinationManager extends EventEmitter {
    private config;
    private status;
    private agentDB;
    private patternStorage;
    private crossAgentCoordinator;
    private performanceMonitor;
    private temporalPatterns;
    private cognitiveCore;
    private isInitialized;
    private isRunning;
    private healthCheckInterval;
    private optimizationInterval;
    private activeRequests;
    private requestHistory;
    private metricsHistory;
    private performanceBaseline;
    constructor(config: MemoryCoordinationManagerConfig);
    /**
     * Initialize the memory coordination system
     */
    initialize(): Promise<void>;
    /**
     * Start the memory coordination system
     */
    start(): Promise<void>;
    /**
     * Process coordination request
     */
    processRequest(request: CoordinationRequest): Promise<CoordinationResponse>;
    /**
     * Get system status
     */
    getStatus(): Promise<MemoryCoordinationStatus>;
    /**
     * Get comprehensive metrics
     */
    getMetrics(): Promise<MemoryCoordinationMetrics>;
    /**
     * Perform system optimization
     */
    optimizeSystem(): Promise<any>;
    /**
     * Stop the memory coordination system
     */
    stop(): Promise<void>;
    private initializeStatus;
    private updateStatus;
    private updateComponentStatus;
    private setupSystemMonitoring;
    private setupComponentCommunication;
    private initializeCognitiveIntegration;
    private startHealthChecks;
    private startAutoOptimization;
    private performHealthCheck;
    private updateAllComponentStatuses;
    private getComponentHealthScore;
    private calculateOverallHealth;
    private shouldOptimize;
    private enablePredictiveAnalysis;
    private enableCrossAgentLearning;
    private validateRequest;
    private handleStorePattern;
    private handleRetrievePatterns;
    private handleShareKnowledge;
    private handleAnalyzePerformance;
    private handleForecastTrends;
    private calculateResponseConfidence;
    private calculateQualityScore;
    private calculatePerformanceImpact;
    private calculateSystemMetrics;
    private calculatePerformanceIndicators;
    private optimizeCrossAgentCoordination;
    private optimizeTemporalPatterns;
    private optimizeCognitiveCore;
    private calculateOptimizationImprovement;
}
export default MemoryCoordinationManager;
//# sourceMappingURL=MemoryCoordinationManager.d.ts.map