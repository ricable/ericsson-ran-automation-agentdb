/**
 * Adaptive Learning Core for ReasoningBank
 * Implements adaptive learning algorithms with trajectory tracking and pattern recognition
 */
export interface AdaptiveLearningConfig {
    learningRate: number;
    adaptationThreshold: number;
    trajectoryLength: number;
    patternExtractionEnabled: boolean;
    crossDomainTransfer: boolean;
    temporalWindow: number;
    confidenceDecay: number;
    explorationRate: number;
}
export interface AdaptivePattern {
    id: string;
    pattern_type: 'sequential' | 'temporal' | 'causal' | 'cross_domain';
    pattern_data: any;
    confidence: number;
    performance_score: number;
    temporal_context: any;
    cross_domain_mappings: CrossDomainMapping[];
    adaptation_history: AdaptationHistory[];
    created_at: number;
    last_updated: number;
}
export interface CrossDomainMapping {
    source_domain: string;
    target_domain: string;
    mapping_confidence: number;
    transfer_performance: number;
    adaptation_required: boolean;
}
export interface AdaptationHistory {
    timestamp: number;
    trigger_event: string;
    adaptation_type: 'incremental' | 'radical' | 'transfer';
    performance_impact: number;
    confidence_change: number;
}
export interface AdaptationStrategy {
    strategy_id: string;
    type: 'gradual' | 'aggressive' | 'conservative' | 'exploratory';
    target_metrics: string[];
    adaptation_rate: number;
    risk_tolerance: number;
    constraints: AdaptationConstraint[];
    success_criteria: SuccessCriteria[];
}
export interface AdaptationConstraint {
    constraint_type: 'performance' | 'resource' | 'stability' | 'safety';
    threshold: number;
    priority: number;
    action: 'stop' | 'warn' | 'adjust';
}
export interface SuccessCriteria {
    metric_name: string;
    target_value: number;
    tolerance: number;
    weight: number;
}
export interface LearningSignal {
    signal_id: string;
    signal_type: 'reward' | 'penalty' | 'neutral' | 'exploration';
    magnitude: number;
    source: string;
    temporal_signature: any;
    cross_agent_relevance: number;
    pattern_associations: string[];
}
export interface AdaptationResult {
    adaptation_id: string;
    strategy_applied: AdaptationStrategy;
    performance_before: number;
    performance_after: number;
    confidence_before: number;
    confidence_after: number;
    adaptation_success: boolean;
    learning_signals: LearningSignal[];
    cross_agent_impact: CrossAgentImpact[];
}
export interface CrossAgentImpact {
    agent_type: string;
    impact_type: 'positive' | 'negative' | 'neutral';
    impact_magnitude: number;
    adaptation_suggestion: string;
}
/**
 * Adaptive Learning Core - Implements adaptive learning algorithms for ReasoningBank
 */
export declare class AdaptiveLearningCore {
    private config;
    private patterns;
    private strategies;
    private learningSignals;
    private adaptationHistory;
    private crossDomainMappings;
    private performanceHistory;
    private confidenceDecay;
    private isInitialized;
    private globalLearningRate;
    private adaptationThreshold;
    private explorationDecay;
    private patternExtractionThreshold;
    constructor(config: AdaptiveLearningConfig);
    /**
     * Initialize Adaptive Learning Core
     */
    initialize(): Promise<void>;
    /**
     * Extract adaptive pattern from current state, historical data, and temporal context
     */
    extractPattern(currentState: any, historicalPatterns: any[], temporalContext: any): Promise<AdaptivePattern>;
    /**
     * Generate adaptation strategy based on reasoning pattern and verdict
     */
    generateAdaptation(pattern: any, verdict: any): Promise<AdaptationStrategy>;
    /**
     * Apply adaptation strategy and track results
     */
    applyAdaptation(strategy: AdaptationStrategy, currentPerformance: number, currentConfidence: number): Promise<AdaptationResult>;
    private initializePatternExtraction;
    private setupCrossDomainTransfer;
    private initializeAdaptationStrategies;
    private setupLearningSignalProcessing;
    private initializePerformanceTracking;
    private loadExistingPatterns;
    private extractStateFeatures;
    private extractNumericalFeatures;
    private extractCategoricalFeatures;
    private extractTemporalFeaturesFromState;
    private extractRelationalFeatures;
    private findHistoricalMatches;
    private calculatePatternSimilarity;
    private extractTemporalFeatures;
    private identifyCrossDomainMappings;
    private calculatePatternConfidence;
    private calculateTemporalConsistency;
    private estimatePatternPerformance;
    private determinePatternType;
    private analyzeAdaptationNeeds;
    private calculateAdaptationUrgency;
    private assessRiskLevel;
    private selectStrategyType;
    private generateTargetMetrics;
    private calculateAdaptationRate;
    private determineRiskTolerance;
    private generateConstraints;
    private generateSuccessCriteria;
    private recordAdaptationGeneration;
    private trackPerformanceHistory;
    private updateLearningSignals;
    private validateStrategyConstraints;
    private executeAdaptation;
    private collectLearningSignals;
    private assessCrossAgentImpact;
    private evaluateAdaptationSuccess;
    private updateInternalState;
    private storeAdaptationHistory;
    /**
     * Get comprehensive statistics about adaptive learning
     */
    getStatistics(): Promise<any>;
    private getPatternsByType;
    private getStrategiesByType;
    private getAverageConfidence;
    private getAveragePerformance;
    /**
     * Shutdown Adaptive Learning Core gracefully
     */
    shutdown(): Promise<void>;
}
//# sourceMappingURL=AdaptiveLearningCore.d.ts.map