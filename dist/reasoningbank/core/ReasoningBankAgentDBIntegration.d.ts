/**
 * ReasoningBank AgentDB Integration - Prime Citizen for Phase 2 ML Infrastructure
 * Core integration class that unifies adaptive learning with AgentDB's 150x faster vector search
 */
export interface ReasoningBankConfig {
    agentDB: {
        swarmId: string;
        syncProtocol: 'QUIC' | 'TCP' | 'UDP';
        persistenceEnabled: boolean;
        crossAgentLearning: boolean;
        vectorDimension: number;
        indexingStrategy: 'HNSW' | 'IVF' | 'FLAT';
        quantization: {
            enabled: boolean;
            bits: number;
        };
    };
    adaptiveLearning: {
        learningRate: number;
        adaptationThreshold: number;
        trajectoryLength: number;
        patternExtractionEnabled: boolean;
        crossDomainTransfer: boolean;
    };
    temporalReasoning: {
        subjectiveTimeExpansion: number;
        temporalPatternWindow: number;
        causalInferenceEnabled: boolean;
        predictionHorizon: number;
    };
    performance: {
        cacheEnabled: boolean;
        quantizationEnabled: boolean;
        parallelProcessingEnabled: boolean;
        memoryCompressionEnabled: boolean;
    };
}
export interface AdaptivePolicy {
    id: string;
    version: string;
    domain: string;
    policy_data: any;
    performance_metrics: PolicyPerformanceMetrics;
    adaptation_history: AdaptationEvent[];
    cross_agent_applicability: number;
    temporal_patterns: TemporalPattern[];
    created_at: number;
    last_updated: number;
}
export interface PolicyPerformanceMetrics {
    accuracy: number;
    efficiency: number;
    robustness: number;
    adaptability: number;
    cross_agent_transfer_success: number;
    temporal_prediction_accuracy: number;
    overall_score: number;
}
export interface AdaptationEvent {
    timestamp: number;
    trigger: string;
    adaptation_type: 'policy_update' | 'parameter_tuning' | 'architecture_change';
    performance_impact: number;
    confidence: number;
    causal_factors: string[];
}
export interface TemporalPattern {
    pattern_id: string;
    sequence: any[];
    temporal_dependencies: TemporalDependency[];
    prediction_confidence: number;
    time_horizon: number;
    recurrence_frequency: number;
}
export interface TemporalDependency {
    source: string;
    target: string;
    temporal_lag: number;
    strength: number;
    confidence: number;
}
export interface ReasoningPattern {
    id: string;
    type: 'adaptive' | 'temporal' | 'causal' | 'cross_agent';
    pattern_data: any;
    trajectory: TrajectoryData;
    verdict: PolicyVerdict;
    adaptation: AdaptationStrategy;
    performance_history: PerformanceHistory[];
    cross_agent_validations: CrossAgentValidation[];
}
export interface TrajectoryData {
    trajectory_id: string;
    states: any[];
    actions: any[];
    rewards: any[];
    performance_metrics: any[];
    causal_insights: any[];
    temporal_context: any;
}
export interface PolicyVerdict {
    strategy: string;
    confidence: number;
    expected_performance: number;
    risk_assessment: number;
    cross_agent_suitability: number;
    temporal_validity: number;
}
export interface AdaptationStrategy {
    type: 'gradual' | 'aggressive' | 'conservative';
    target_metrics: string[];
    adaptation_rate: number;
    constraints: any[];
    success_criteria: any[];
}
export interface PerformanceHistory {
    timestamp: number;
    metrics: any;
    context: any;
    adaptations: any[];
}
export interface CrossAgentValidation {
    agent_type: string;
    validation_timestamp: number;
    performance_impact: number;
    applicability_score: number;
    adaptation_required: boolean;
}
/**
 * ReasoningBank AgentDB Integration - Prime Citizen Architecture
 */
export declare class ReasoningBankAgentDBIntegration {
    private config;
    private agentDB;
    private adaptiveLearning;
    private trajectoryTracker;
    private verdictJudgment;
    private memoryDistillation;
    private temporalIntegrator;
    private performanceEngine;
    private rlEngine;
    private temporalReasoning;
    private activePolicies;
    private learningPatterns;
    private crossAgentMemory;
    private performanceMetrics;
    private isInitialized;
    constructor(config: ReasoningBankConfig);
    /**
     * Initialize ReasoningBank AgentDB integration
     */
    initialize(): Promise<void>;
    /**
     * Execute adaptive RL training with ReasoningBank integration
     */
    adaptiveRLTraining(): Promise<AdaptivePolicy>;
    /**
     * Analyze reasoning patterns from current state and historical data
     */
    private analyzeReasoningPattern;
    /**
     * Calculate cross-agent applicability for reasoning patterns
     */
    private calculateCrossAgentApplicability;
    /**
     * Extract temporal patterns from reasoning patterns
     */
    private extractTemporalPatterns;
    /**
     * Initialize core components
     */
    private initializeComponents;
    private initializeAgentDB;
    private initializeAdaptiveLearning;
    private initializeTrajectoryTracking;
    private initializeVerdictJudgment;
    private initializeMemoryDistillation;
    private initializeTemporalIntegration;
    private initializePerformanceOptimization;
    private setupCrossAgentLearning;
    private loadExistingReasoningPatterns;
    private startContinuousLearningLoops;
    private getCurrentState;
    private getHistoricalPatterns;
    private getPerformanceHistory;
    private getCrossAgentValidations;
    private calculatePolicyMetrics;
    private syncWithCrossAgentMemory;
    private storeLearningPattern;
    /**
     * Get comprehensive statistics about ReasoningBank integration
     */
    getStatistics(): Promise<any>;
    /**
     * Shutdown ReasoningBank integration gracefully
     */
    shutdown(): Promise<void>;
}
//# sourceMappingURL=ReasoningBankAgentDBIntegration.d.ts.map