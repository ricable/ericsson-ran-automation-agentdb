/**
 * MLPatternStorage - Phase 2 ML Development Memory Coordination
 * Advanced pattern storage with AgentDB integration for RL, causal inference, and DSPy components
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
export interface TrainingEpisode {
    episode_id: string;
    timestamp: number;
    algorithm: 'reinforcement_learning' | 'causal_inference' | 'dspy_optimization';
    domain: 'mobility' | 'energy' | 'coverage' | 'capacity' | 'performance';
    input_state: Float32Array;
    actions_taken: PolicyAction[];
    rewards: number[];
    outcome: EpisodeOutcome;
    performance_metrics: PerformanceMetrics;
    causal_factors?: CausalFactor[];
    temporal_signature: TemporalSignature;
    cross_agent_applicable: boolean;
    success_rate: number;
    confidence: number;
}
export interface CausalInsight {
    insight_id: string;
    type: 'handover_success' | 'energy_efficiency' | 'coverage_optimization' | 'capacity_management';
    target_variable: string;
    causal_factors: CausalFactor[];
    intervention_recommendations: InterventionRecommendation[];
    confidence: number;
    temporal_validity: TimeWindow;
    cross_agent_transferability: number;
    learned_from: string[];
}
export interface OptimizationPattern {
    pattern_id: string;
    name: string;
    category: PatternCategory;
    vector_signature: Float32Array;
    success_rate: number;
    improvement_magnitude: number;
    applicable_domains: string[];
    required_capabilities: string[];
    temporal_patterns: TemporalPattern[];
    causal_relationships: CausalRelationship[];
    reinforcement_score: number;
    adaptation_count: number;
    last_success: number;
}
export interface MemoryCoordinatorConfig {
    agentdb_config: {
        swarmId: string;
        syncProtocol: 'QUIC';
        persistenceEnabled: boolean;
        crossAgentLearning: boolean;
        patternRecognition: boolean;
    };
    vector_config: {
        dimensions: number;
        quantizationBits: number;
        indexingMethod: 'HNSW';
        similarityThreshold: number;
    };
    ml_config: {
        learningRate: number;
        patternRetention: number;
        crossAgentTransferThreshold: number;
        reinforcementInterval: number;
    };
    performance_config: {
        memoryQuotaGB: number;
        syncLatencyTarget: number;
        searchSpeedTarget: number;
        autoOptimizationEnabled: boolean;
    };
}
export interface MemoryStats {
    totalPatterns: number;
    rlEpisodes: number;
    causalInsights: number;
    optimizationPatterns: number;
    crossAgentShared: number;
    memoryUsageGB: number;
    searchLatency: number;
    syncLatency: number;
    learningRate: number;
    compressionRatio: number;
}
export declare class MLPatternStorage extends EventEmitter {
    private config;
    private agentDB;
    private cognitiveCore;
    private vectorIndex;
    private quantizationEngine;
    private crossAgentCoordinator;
    private performanceMonitor;
    private learningEngine;
    private trainingEpisodes;
    private causalInsights;
    private optimizationPatterns;
    private agentMemories;
    private memoryStats;
    private activeConnections;
    private syncIntervals;
    constructor(config: MemoryCoordinatorConfig);
    /**
     * Initialize ML pattern storage system
     */
    initialize(): Promise<void>;
    /**
     * Store RL training episode with automatic pattern extraction
     */
    storeRLTrainingEpisode(episode: TrainingEpisode): Promise<string>;
    /**
     * Retrieve causal insights with contextual matching
     */
    retrieveCausalInsights(query: CausalQuery): Promise<CausalInsight[]>;
    /**
     * Share optimization patterns between agents
     */
    shareOptimizationPatterns(patterns: OptimizationPattern[]): Promise<void>;
    /**
     * Learn from execution outcomes and update patterns
     */
    learnFromExecution(outcomes: ExecutionOutcome[]): Promise<void>;
    /**
     * Get comprehensive memory statistics
     */
    getStatistics(): Promise<MemoryStats>;
    /**
     * Optimize memory performance and cleanup
     */
    optimizeMemory(): Promise<void>;
    private initializeMemoryStats;
    private setupComponents;
    private initializeAgentDB;
    private initializeVectorIndexing;
    private initializeCognitiveCore;
    private initializeCrossAgentCoordination;
    private initializePerformanceMonitoring;
    private enableQUICSynchronization;
    private extractLearningPatterns;
    private calculateTransferability;
    private vectorizeCausalQuery;
    private hashToFloat;
    private isInsightApplicable;
    private isWithinTimeWindow;
    private calculateContextualMatch;
    private findSimilarPatterns;
    private updatePatternFromOutcome;
    private createPatternFromOutcome;
    private storeExecutionOutcome;
    private consolidateMemory;
    private updateMemoryStats;
    private getStats;
}
export interface CausalQuery {
    target_variable: string;
    context_factors: string[];
    temporal_window?: TimeWindow;
    confidence_threshold?: number;
    domain?: string;
    limit?: number;
}
export interface TimeWindow {
    start: number;
    end: number;
}
export interface PolicyAction {
    action_id: string;
    type: string;
    parameters: Record<string, number>;
    timestamp: number;
    outcome: string;
}
export interface EpisodeOutcome {
    success: boolean;
    total_reward: number;
    final_state: Float32Array;
    completion_time: number;
    error_count: number;
}
export interface PerformanceMetrics {
    improvement_percentage: number;
    efficiency_gain: number;
    latency_reduction: number;
    accuracy_improvement: number;
}
export interface CausalFactor {
    factor: string;
    influence: number;
    confidence: number;
    temporal_delay: number;
}
export interface TemporalSignature {
    time_of_day: number;
    day_of_week: number;
    seasonal_factor: number;
    trend_duration: number;
}
export interface PatternCategory {
    type: string;
    subcategory: string;
    complexity: 'low' | 'medium' | 'high';
}
export interface TemporalPattern {
    period: 'hourly' | 'daily' | 'weekly' | 'seasonal';
    strength: number;
    phase: number;
}
export interface CausalRelationship {
    cause: string;
    effect: string;
    strength: number;
    delay: number;
}
export interface InterventionRecommendation {
    intervention: string;
    expected_effect: number;
    confidence: number;
    implementation_cost: number;
}
export interface AgentMemorySpace {
    agentId: string;
    agentType: string;
    memoryPatterns: string[];
    sharedPatterns: string[];
    lastSync: number;
}
export interface ExecutionOutcome {
    outcome_id: string;
    task_type: string;
    domain: string;
    category: PatternCategory;
    success: boolean;
    improvement: number;
    input_vector: Float32Array;
    required_capabilities: string[];
    temporal_patterns?: TemporalPattern[];
    causal_relationships?: CausalRelationship[];
}
export default MLPatternStorage;
//# sourceMappingURL=MLPatternStorage.d.ts.map