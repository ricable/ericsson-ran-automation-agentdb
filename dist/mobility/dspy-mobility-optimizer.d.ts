/**
 * DSPy Mobility Optimization System with Causal Intelligence
 * Phase 2 Implementation - 15% Improvement Target
 */
export interface RANState {
    timestamp: number;
    cells: CellState[];
    users: UserState[];
    network_conditions: NetworkConditions;
    mobility_events: MobilityEvent[];
}
export interface CellState {
    cell_id: string;
    location: {
        lat: number;
        lng: number;
    };
    load: number;
    signal_strength: number;
    capacity: number;
    technology: '4G' | '5G' | '6G';
    handover_performance: HandoverMetrics;
}
export interface UserState {
    user_id: string;
    current_cell: string;
    velocity: number;
    direction: number;
    signal_quality: number;
    throughput: number;
    latency: number;
    mobility_history: MobilityHistoryEntry[];
}
export interface MobilityEvent {
    event_id: string;
    user_id: string;
    source_cell: string;
    target_cell: string;
    timestamp: number;
    success: boolean;
    interruption_time: number;
    cause: string;
    causal_factors: CausalFactor[];
}
export interface MobilityStrategy {
    strategy_id: string;
    handover_predictions: HandoverPrediction[];
    parameter_adjustments: ParameterAdjustment[];
    confidence: number;
    expected_improvement: number;
    causal_insights: CausalInsight[];
    temporal_analysis: TemporalAnalysis;
}
export interface CausalGraph {
    nodes: CausalNode[];
    edges: CausalEdge[];
    interventions: Intervention[];
    strength: number;
}
export interface CausalFactor {
    factor: string;
    influence: number;
    confidence: number;
    temporal_delay: number;
}
export declare class DSPyMobilityOptimizer {
    private agentDB;
    private causalEngine;
    private temporalCore;
    private swarmCoordinator;
    private performanceMonitor;
    private targetImprovement;
    constructor(config: MobilityOptimizerConfig);
    /**
     * Core mobility optimization with causal intelligence
     */
    optimizeMobility(currentState: RANState): Promise<MobilityStrategy>;
    /**
     * Vectorize mobility state for AgentDB pattern matching
     */
    private vectorizeMobilityState;
    /**
     * Synthesize mobility strategy from patterns and causal insights
     */
    private synthesizeMobilityStrategy;
    /**
     * Extract mobility-specific causal insights
     */
    private extractMobilityCausalInsights;
    /**
     * Generate handover predictions using causal and temporal analysis
     */
    private generateHandoverPredictions;
    /**
     * Generate parameter adjustments based on causal analysis
     */
    private generateParameterAdjustments;
    /**
     * Store mobility pattern in AgentDB for future learning
     */
    private storeMobilityPattern;
    /**
     * Calculate handover probability using causal model
     */
    private calculateHandoverProbability;
    /**
     * Find optimal target cell for handover
     */
    private findOptimalTargetCell;
    /**
     * Score cell candidate for handover
     */
    private scoreCellCandidate;
    private generateStrategyId;
    private generatePatternId;
    private calculateDistance;
    private calculateStrategyConfidence;
    private calculateExpectedImprovement;
    private isInsightRelevantToUser;
    private calculateOptimalHandoverTiming;
    private calculatePredictionConfidence;
    private extractRelevantCausalFactors;
    private isUserSimilar;
    private generateHandoverRecommendation;
    private calculateCausalConfidence;
    private refineMobilityStrategy;
    private calculateCausalAccuracy;
    private calculateTemporalAccuracy;
    private getCurrentHandoverMargin;
    private calculateOptimalHandoverMargin;
    private getCurrentPowerControl;
    private calculateOptimalPowerControl;
    private extractCellId;
    private loadBaselineMetrics;
}
export interface MobilityOptimizerConfig {
    agentdb_config: any;
    causal_config: any;
    temporal_config: any;
    swarm_config: any;
}
export interface MobilityPattern {
    pattern_id: string;
    timestamp: number;
    type: string;
    domain: string;
    input_state: Float32Array;
    causal_graph: CausalGraph;
    strategy: MobilityStrategy;
    performance_metrics: any;
    success_indicators: any;
    metadata: any;
}
export interface CausalInsight {
    type: string;
    target: string;
    causal_factors: CausalFactor[];
    recommendation: string;
    confidence: number;
}
export interface HandoverPrediction {
    user_id: string;
    current_cell: string;
    target_cell: string;
    probability: number;
    optimal_timing: number;
    confidence: number;
    causal_factors: CausalFactor[];
}
export interface ParameterAdjustment {
    parameter: string;
    cell_id?: string;
    current_value: number;
    target_value: number;
    confidence: number;
    expected_impact: number;
    causal_basis: string;
}
export interface SwarmInsight {
    agent_id: string;
    insight_type: string;
    recommendation: string;
    confidence: number;
    supporting_data: any;
}
export interface ValidationResults {
    expectedImprovement: number;
    metrics: any;
    confidence: number;
}
export interface TemporalAnalysis {
    predictions: any[];
    confidence: number;
    time_horizon: number;
}
export interface NetworkConditions {
    congestion_level: number;
    interference_level: number;
    weather_impact: number;
}
export interface HandoverMetrics {
    success_rate: number;
    avg_interruption_time: number;
    ping_pong_rate: number;
}
export interface MobilityHistoryEntry {
    timestamp: number;
    cell_id: string;
    event_type: string;
    success: boolean;
}
export interface CausalNode {
    id: string;
    type: string;
    properties: any;
}
export interface CausalEdge {
    source: string;
    target: string;
    strength: number;
    confidence: number;
    temporal_delay: number;
}
export interface Intervention {
    target: string;
    action: string;
    expected_effect: number;
    confidence: number;
}
export interface BaselineMetrics {
    handover_success_rate: number;
    average_interruption_time: number;
    mobility_throughput: number;
    ping_pong_rate: number;
}
//# sourceMappingURL=dspy-mobility-optimizer.d.ts.map