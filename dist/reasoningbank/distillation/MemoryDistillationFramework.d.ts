/**
 * Memory Distillation Framework for ReasoningBank
 * Implements knowledge compression for efficient storage and cross-agent sharing
 */
export interface MemoryDistillationConfig {
    compressionRatio: number;
    knowledgeRetention: number;
    crossAgentEnabled: boolean;
    temporalDistillation: boolean;
    adaptiveDistillation: boolean;
    distillationFrequency: number;
    qualityThreshold: number;
    maxDistillationSize: number;
}
export interface DistillationTask {
    task_id: string;
    task_type: 'policy_distillation' | 'pattern_distillation' | 'trajectory_distillation' | 'knowledge_distillation';
    source_data: any;
    distillation_config: DistillationParameters;
    priority: 'high' | 'medium' | 'low';
    created_at: number;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    result?: DistillationResult;
    error_message?: string;
}
export interface DistillationParameters {
    compression_method: 'quantization' | 'pruning' | 'knowledge_compression' | 'hybrid';
    compression_ratio: number;
    quality_preservation: number;
    temporal_weighting: number;
    cross_agent_relevance_weight: number;
    adaptive_threshold: number;
    distillation_algorithm: string;
    algorithm_parameters: any;
}
export interface DistillationResult {
    result_id: string;
    distilled_data: DistilledData;
    compression_achieved: number;
    quality_preserved: number;
    knowledge_retention: number;
    distillation_time: number;
    memory_savings: number;
    cross_agent_applicability: number;
    temporal_validity: number;
    quality_metrics: DistillationQualityMetrics;
    metadata: DistillationMetadata;
}
export interface DistilledData {
    data_id: string;
    data_type: 'compressed_policy' | 'knowledge_pattern' | 'trajectory_summary' | ' distilled_insights';
    core_knowledge: CoreKnowledge;
    compressed_representation: CompressedRepresentation;
    essential_features: EssentialFeature[];
    distilled_patterns: DistilledPattern[];
    cross_agent_mappings: CrossAgentMapping[];
    temporal_summaries: TemporalSummary[];
    metadata: DataMetadata;
}
export interface CoreKnowledge {
    knowledge_id: string;
    knowledge_type: 'policy' | 'pattern' | 'strategy' | 'insight';
    core_concepts: CoreConcept[];
    decision_rules: DecisionRule[];
    performance_indicators: PerformanceIndicator[];
    causal_relationships: CausalRelationship[];
    adaptation_strategies: AdaptationStrategy[];
    knowledge_importance: number;
    transferability: number;
}
export interface CoreConcept {
    concept_id: string;
    concept_name: string;
    concept_definition: string;
    concept_attributes: ConceptAttribute[];
    concept_relationships: ConceptRelationship[];
    importance_score: number;
    abstraction_level: number;
}
export interface ConceptAttribute {
    attribute_name: string;
    attribute_value: any;
    attribute_type: 'numerical' | 'categorical' | 'temporal' | 'relational';
    importance_weight: number;
    variability: number;
}
export interface ConceptRelationship {
    related_concept: string;
    relationship_type: 'causal' | 'correlational' | 'hierarchical' | 'temporal';
    relationship_strength: number;
    relationship_direction: 'bidirectional' | 'unidirectional';
    confidence: number;
}
export interface DecisionRule {
    rule_id: string;
    rule_condition: string;
    rule_action: string;
    rule_confidence: number;
    rule_applicability: number;
    temporal_validity: TemporalValidity;
    exceptions: RuleException[];
}
export interface TemporalValidity {
    valid_from: number;
    valid_until: number;
    decay_rate: number;
    seasonal_factors: SeasonalFactor[];
}
export interface SeasonalFactor {
    season_type: string;
    season_start: number;
    season_end: number;
    impact_factor: number;
}
export interface RuleException {
    exception_condition: string;
    exception_action: string;
    exception_reason: string;
}
export interface PerformanceIndicator {
    indicator_id: string;
    indicator_name: string;
    indicator_value: number;
    indicator_target: number;
    measurement_method: string;
    temporal_trend: TemporalTrend;
    confidence_interval: ConfidenceInterval;
}
export interface TemporalTrend {
    trend_direction: 'increasing' | 'decreasing' | 'stable' | 'cyclical';
    trend_strength: number;
    trend_period: number;
    prediction_confidence: number;
}
export interface ConfidenceInterval {
    lower_bound: number;
    upper_bound: number;
    confidence_level: number;
}
export interface CausalRelationship {
    relationship_id: string;
    cause: string;
    effect: string;
    causal_strength: number;
    temporal_lag: number;
    confidence: number;
    context_factors: string[];
}
export interface AdaptationStrategy {
    strategy_id: string;
    strategy_type: 'incremental' | 'radical' | 'transformative';
    adaptation_triggers: AdaptationTrigger[];
    expected_outcomes: ExpectedOutcome[];
    resource_requirements: ResourceRequirement[];
    risk_assessment: RiskAssessment;
}
export interface AdaptationTrigger {
    trigger_type: string;
    trigger_condition: string;
    trigger_threshold: number;
    trigger_frequency: number;
}
export interface ExpectedOutcome {
    outcome_description: string;
    outcome_probability: number;
    outcome_impact: number;
    time_to_achieve: number;
}
export interface ResourceRequirement {
    resource_type: string;
    resource_quantity: number;
    resource_quality: number;
    availability_constraint: string;
}
export interface RiskAssessment {
    risk_level: 'low' | 'medium' | 'high' | 'critical';
    risk_factors: RiskFactor[];
    mitigation_strategies: MitigationStrategy[];
    residual_risk: number;
}
export interface RiskFactor {
    factor_name: string;
    factor_probability: number;
    factor_impact: number;
    factor_mitigation: string;
}
export interface MitigationStrategy {
    strategy_name: string;
    strategy_effectiveness: number;
    implementation_cost: number;
    time_to_implement: number;
}
export interface CompressedRepresentation {
    representation_id: string;
    compression_method: string;
    original_size: number;
    compressed_size: number;
    compression_ratio: number;
    encoding_scheme: EncodingScheme;
    decompression_time: number;
    quality_loss: number;
}
export interface EncodingScheme {
    scheme_type: 'huffman' | 'arithmetic' | 'dictionary' | 'neural' | 'hybrid';
    codebook_size: number;
    encoding_efficiency: number;
    decoding_complexity: number;
}
export interface EssentialFeature {
    feature_id: string;
    feature_name: string;
    feature_importance: number;
    feature_representation: any;
    feature_stability: number;
    feature_transferability: number;
    temporal_relevance: number;
}
export interface DistilledPattern {
    pattern_id: string;
    pattern_type: 'sequential' | 'temporal' | 'causal' | 'behavioral';
    pattern_signature: PatternSignature;
    pattern_frequency: number;
    pattern_strength: number;
    generalization_level: number;
    cross_domain_applicability: number;
}
export interface PatternSignature {
    signature_vector: number[];
    signature_hash: string;
    signature_similarity_threshold: number;
    temporal_markers: TemporalMarker[];
}
export interface TemporalMarker {
    marker_type: string;
    marker_timestamp: number;
    marker_significance: number;
    marker_duration: number;
}
export interface CrossAgentMapping {
    mapping_id: string;
    source_agent_type: string;
    target_agent_type: string;
    mapping_confidence: number;
    mapping_transformation: MappingTransformation;
    transfer_success_rate: number;
    adaptation_overhead: number;
}
export interface MappingTransformation {
    transformation_type: 'direct' | 'feature_extraction' | 'abstraction' | 'specialization';
    transformation_parameters: any;
    transformation_complexity: number;
    transformation_accuracy: number;
}
export interface TemporalSummary {
    summary_id: string;
    summary_period: TemporalPeriod;
    key_events: KeyEvent[];
    trend_analysis: TrendAnalysis;
    anomaly_detection: AnomalyDetection[];
    predictive_insights: PredictiveInsight[];
}
export interface TemporalPeriod {
    start_time: number;
    end_time: number;
    period_duration: number;
    temporal_resolution: number;
}
export interface KeyEvent {
    event_id: string;
    event_timestamp: number;
    event_type: string;
    event_significance: number;
    event_impact: number;
}
export interface TrendAnalysis {
    trend_direction: string;
    trend_magnitude: number;
    trend_confidence: number;
    trend_periodicity: number;
    trend_stability: number;
}
export interface AnomalyDetection {
    anomaly_id: string;
    anomaly_timestamp: number;
    anomaly_type: string;
    anomaly_severity: number;
    anomaly_description: string;
}
export interface PredictiveInsight {
    insight_id: string;
    insight_prediction: string;
    prediction_confidence: number;
    prediction_horizon: number;
    insight_applicability: number;
}
export interface DataMetadata {
    data_id: string;
    data_version: string;
    creation_timestamp: number;
    last_modified: number;
    data_provenance: DataProvenance;
    quality_metrics: DataQualityMetrics;
    usage_statistics: UsageStatistics;
}
export interface DataProvenance {
    source_system: string;
    source_data_id: string;
    processing_history: ProcessingStep[];
    data_lineage: DataLineage[];
    quality_assurance: QualityAssuranceRecord[];
}
export interface ProcessingStep {
    step_id: string;
    step_name: string;
    step_timestamp: number;
    step_parameters: any;
    step_result: any;
}
export interface DataLineage {
    lineage_id: string;
    parent_data_id: string;
    transformation_applied: string;
    transformation_timestamp: number;
}
export interface QualityAssuranceRecord {
    qa_check_id: string;
    qa_check_type: string;
    qa_check_result: boolean;
    qa_check_timestamp: number;
    qa_checker: string;
}
export interface DataQualityMetrics {
    completeness: number;
    accuracy: number;
    consistency: number;
    timeliness: number;
    validity: number;
    overall_quality_score: number;
}
export interface UsageStatistics {
    access_count: number;
    last_accessed: number;
    access_patterns: AccessPattern[];
    user_feedback: UserFeedback[];
    performance_metrics: PerformanceMetric[];
}
export interface AccessPattern {
    pattern_id: string;
    access_frequency: number;
    access_type: string;
    access_context: any;
    temporal_pattern: string;
}
export interface UserFeedback {
    feedback_id: string;
    feedback_rating: number;
    feedback_comment: string;
    feedback_timestamp: number;
    feedback_provider: string;
}
export interface PerformanceMetric {
    metric_name: string;
    metric_value: number;
    metric_timestamp: number;
    metric_context: any;
}
export interface DistillationQualityMetrics {
    fidelity_score: number;
    knowledge_completeness: number;
    generalization_ability: number;
    transfer_efficiency: number;
    temporal_consistency: number;
    cross_agent_compatibility: number;
    compression_quality: number;
    overall_quality_score: number;
}
export interface DistillationMetadata {
    distillation_id: string;
    distillation_timestamp: number;
    distillation_duration: number;
    distillation_algorithm: string;
    distillation_parameters: any;
    source_data_info: SourceDataInfo;
    processing_statistics: ProcessingStatistics;
    validation_results: ValidationResults;
}
export interface SourceDataInfo {
    source_data_type: string;
    source_data_size: number;
    source_data_quality: number;
    source_data_complexity: number;
    source_characteristics: DataCharacteristics;
}
export interface DataCharacteristics {
    data_volume: number;
    data_variety: number;
    data_velocity: number;
    data_veracity: number;
    data_value: number;
}
export interface ProcessingStatistics {
    cpu_usage: number;
    memory_usage: number;
    processing_steps: number;
    cache_hits: number;
    cache_misses: number;
    optimization_applied: string[];
}
export interface ValidationResults {
    validation_method: string;
    validation_score: number;
    validation_metrics: ValidationMetric[];
    validation_errors: ValidationError[];
    validation_warnings: ValidationWarning[];
}
export interface ValidationMetric {
    metric_name: string;
    metric_value: number;
    metric_threshold: number;
    metric_status: 'pass' | 'fail' | 'warning';
}
export interface ValidationError {
    error_code: string;
    error_description: string;
    error_severity: 'critical' | 'major' | 'minor';
    error_resolution: string;
}
export interface ValidationWarning {
    warning_code: string;
    warning_description: string;
    warning_impact: string;
    warning_recommendation: string;
}
/**
 * Memory Distillation Framework - Knowledge compression for efficient storage and sharing
 */
export declare class MemoryDistillationFramework {
    private config;
    private distillationQueue;
    private activeDistillations;
    private completedDistillations;
    private distillationHistory;
    private distilledKnowledgeBase;
    private crossAgentMappings;
    private isInitialized;
    private totalDistillations;
    private totalMemorySavings;
    private averageCompressionRatio;
    private averageQualityPreservation;
    private averageDistillationTime;
    constructor(config: MemoryDistillationConfig);
    /**
     * Initialize Memory Distillation Framework
     */
    initialize(): Promise<void>;
    /**
     * Distill policy knowledge for efficient storage
     */
    distillPolicy(policyId: string, policyData: any, distillationConfig?: Partial<DistillationParameters>): Promise<DistillationResult>;
    /**
     * Distill learning patterns for cross-agent sharing
     */
    distillPatterns(patterns: any[], distillationConfig?: Partial<DistillationParameters>): Promise<DistillationResult>;
    /**
     * Distill trajectory data into essential insights
     */
    distillTrajectory(trajectoryData: any, distillationConfig?: Partial<DistillationParameters>): Promise<DistillationResult>;
    /**
     * General knowledge distillation
     */
    distillKnowledge(knowledgeData: any, distillationConfig?: Partial<DistillationParameters>): Promise<DistillationResult>;
    /**
     * Get distilled knowledge by ID
     */
    getDistilledKnowledge(dataId: string): DistilledData | undefined;
    /**
     * Get cross-agent mappings for knowledge transfer
     */
    getCrossAgentMappings(sourceAgentType: string, targetAgentType: string): CrossAgentMapping[];
    /**
     * Get comprehensive statistics about distillation operations
     */
    getStatistics(): Promise<any>;
    private initializeDistillationAlgorithms;
    private setupCompressionMethods;
    private initializeKnowledgeExtraction;
    private setupCrossAgentMapping;
    private initializeTemporalDistillation;
    private setupAdaptiveDistillation;
    private loadExistingDistilledKnowledge;
    private setupScheduledDistillation;
    private executeDistillationTask;
    private analyzeSourceData;
    private assessDataComplexity;
    private calculateNestingDepth;
    private countDataTypes;
    private collectDataTypes;
    private extractDataCharacteristics;
    private hasTemporalData;
    private hasNumericData;
    private hasCategoricalData;
    private hasRelationalData;
    private estimatePatternCount;
    private extractCoreKnowledge;
    private extractCoreConcepts;
    private extractConceptAttributes;
    private extractConceptRelationships;
    private extractDecisionRules;
    private extractPerformanceIndicators;
    private extractCausalRelationships;
    private extractAdaptationStrategies;
    private applyCompression;
    private extractEssentialFeatures;
    private distillPatternsFromData;
    private createCrossAgentMappings;
    private createTemporalSummaries;
    private createDataMetadata;
    private calculateDistillationQuality;
    private calculateTransferEfficiency;
    private calculateTemporalConsistency;
    private calculateCrossAgentCompatibility;
    private createDistillationMetadata;
    private calculateMemorySavings;
    private calculateCrossAgentApplicability;
    private calculateTemporalValidity;
    private getDataTypeFromTaskType;
    private updateStatistics;
    private storeCrossAgentMappings;
    private getKnowledgeTypeStatistics;
    private performScheduledDistillation;
    /**
     * Shutdown Memory Distillation Framework gracefully
     */
    shutdown(): Promise<void>;
}
//# sourceMappingURL=MemoryDistillationFramework.d.ts.map