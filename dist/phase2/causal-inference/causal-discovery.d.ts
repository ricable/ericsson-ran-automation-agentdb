/**
 * Causal Inference Pipeline with GPCM Integration
 * Phase 2: Advanced Causal Discovery for RAN Optimization
 */
import { AgentDB } from '../../agentdb/agentdb-core';
export interface CausalGraph {
    nodes: CausalNode[];
    edges: CausalEdge[];
    metadata: CausalGraphMetadata;
}
export interface CausalNode {
    id: string;
    name: string;
    type: NodeType;
    properties: NodeProperties;
    temporalProfile: TemporalProfile;
}
export declare enum NodeType {
    CONFIGURATION = "configuration",
    ENVIRONMENTAL = "environmental",
    PERFORMANCE = "performance",
    USER_BEHAVIOR = "user_behavior",
    NETWORK_STATE = "network_state",
    INTERVENTION = "intervention"
}
export interface NodeProperties {
    domain: DomainType;
    measurable: boolean;
    controllable: boolean;
    lag: number;
    volatility: number;
    seasonal: boolean;
}
export declare enum DomainType {
    CONTINUOUS = "continuous",
    DISCRETE = "discrete",
    BINARY = "binary",
    CATEGORICAL = "categorical"
}
export interface TemporalProfile {
    trend: TrendType;
    seasonality: SeasonalityPattern;
    autocorrelation: number;
    periodicity: number;
}
export declare enum TrendType {
    INCREASING = "increasing",
    DECREASING = "decreasing",
    STATIONARY = "stationary",
    CYCLIC = "cyclic"
}
export interface SeasonalityPattern {
    detected: boolean;
    period: number;
    strength: number;
    phase: number;
}
export interface CausalEdge {
    id: string;
    source: string;
    target: string;
    strength: number;
    direction: CausalDirection;
    lag: number;
    confidence: number;
    type: EdgeType;
    mechanism: CausalMechanism;
}
export declare enum CausalDirection {
    POSITIVE = "positive",
    NEGATIVE = "negative",
    NONLINEAR = "nonlinear"
}
export declare enum EdgeType {
    DIRECT = "direct",
    MEDIATED = "mediated",
    CONFOUNDING = "confounding",
    COLLIDER = "collider"
}
export interface CausalMechanism {
    type: MechanismType;
    parameters: MechanismParameters;
    functionalForm: FunctionalForm;
    uncertainty: UncertaintyEstimate;
}
export declare enum MechanismType {
    LINEAR = "linear",
    NONLINEAR = "nonlinear",
    THRESHOLD = "threshold",
    ADAPTIVE = "adaptive",
    STOCHASTIC = "stochastic"
}
export interface MechanismParameters {
    coefficients: number[];
    intercept: number;
    nonlinearity: number;
    threshold?: number;
    variance: number;
}
export interface FunctionalForm {
    equation: string;
    variables: string[];
    interactions: Interaction[];
}
export interface Interaction {
    variables: string[];
    coefficient: number;
    significance: number;
}
export interface UncertaintyEstimate {
    confidenceInterval: [number, number];
    standardError: number;
    pValue: number;
    bayesianPosterior: BayesianPosterior;
}
export interface BayesianPosterior {
    mean: number;
    variance: number;
    distribution: DistributionType;
    credibleInterval: [number, number];
}
export declare enum DistributionType {
    NORMAL = "normal",
    BETA = "beta",
    GAMMA = "gamma",
    STUDENT_T = "student_t"
}
export interface CausalGraphMetadata {
    algorithm: CausalAlgorithm;
    discoveryDate: Date;
    dataPeriod: DataPeriod;
    validationResults: ValidationResults;
    qualityMetrics: QualityMetrics;
}
export declare enum CausalAlgorithm {
    PC = "pc",
    GES = "ges",
    GES_BIC = "ges_bic",
    GES_BDeu = "ges_bdeu",
    GPCM = "gpcm",
    NOTEARS = "notears",
    DAGMA = "dagma"
}
export interface DataPeriod {
    start: Date;
    end: Date;
    granularity: TimeGranularity;
    completeness: number;
}
export declare enum TimeGranularity {
    SECOND = "second",
    MINUTE = "minute",
    HOUR = "hour",
    DAY = "day",
    WEEK = "week"
}
export interface ValidationResults {
    crossValidation: CrossValidationResult;
    sensitivityAnalysis: SensitivityResult;
    robustnessCheck: RobustnessResult;
    externalValidation: ExternalValidationResult;
}
export interface CrossValidationResult {
    folds: number;
    avgStability: number;
    stabilityVariance: number;
    consensusEdges: string[];
    variableEdges: string[];
}
export interface SensitivityResult {
    parameterSensitivity: ParameterSensitivity[];
    overallSensitivity: number;
    criticalParameters: string[];
}
export interface ParameterSensitivity {
    parameter: string;
    sensitivity: number;
    impactOnGraph: number;
    threshold: number;
}
export interface RobustnessResult {
    noiseRobustness: number;
    missingDataRobustness: number;
    sampleSizeRobustness: number;
    overallRobustness: number;
}
export interface ExternalValidationResult {
    interventionValidation: InterventionValidation[];
    predictiveAccuracy: number;
    counterfactualAccuracy: number;
}
export interface InterventionValidation {
    intervention: Intervention;
    predictedEffect: number;
    actualEffect: number;
    accuracy: number;
}
export interface Intervention {
    type: InterventionType;
    target: string;
    magnitude: number;
    timestamp: Date;
    duration: number;
}
export declare enum InterventionType {
    POWER_ADJUSTMENT = "power_adjustment",
    ANTENNA_TILT = "antenna_tilt",
    BANDWIDTH_CHANGE = "bandwidth_change",
    HANDOVER_PARAMETER = "handover_parameter",
    LOAD_BALANCING = "load_balancing"
}
export interface QualityMetrics {
    sparsity: number;
    density: number;
    avgDegree: number;
    maxDegree: number;
    clustering: number;
    pathLength: number;
    dagCheck: boolean;
    cyclicEdges: string[];
}
export declare class CausalDiscoveryEngine {
    private agentDB;
    private temporalCore;
    private gpcmModel;
    private validationEngine;
    constructor(agentDB: AgentDB);
    discoverCausalRelationships(timeSeriesData: TimeSeriesData, config: CausalDiscoveryConfig): Promise<CausalGraph>;
    analyzeCausalPaths(causalGraph: CausalGraph): Promise<CausalPathAnalysis>;
    predictInterventionEffects(causalGraph: CausalGraph): Promise<InterventionPrediction[]>;
    discoverCausalClusters(causalGraph: CausalGraph): Promise<CausalCluster[]>;
    private preprocessTimeSeriesData;
    private detectTemporalPatterns;
    private performGrangerCausalityAnalysis;
    private runGPCM;
    private runNOTEARS;
    private runDAGMA;
    private runConstraintBased;
    private integrateTemporalInformation;
    private discoverCausalMechanisms;
    private calculateQualityMetrics;
    private storeCausalGraph;
    private findAllCausalPaths;
    private analyzePath;
    private identifyCriticalPaths;
    private generatePotentialInterventions;
    private calculateCausalEffect;
    private estimateEffectUncertainty;
    private predictTemporalDynamics;
    private assessInterventionFeasibility;
    private predictSideEffects;
    private calculateExpectedImprovement;
    private cleanTimeSeries;
    private adjustSeasonality;
    private normalizeTimeSeries;
    private selectOptimalLags;
    private calculateMissingValueRate;
    private countOutliers;
    private testStationarity;
    private analyzeTrend;
    private detectSeasonality;
    private calculateAutocorrelation;
    private detectChangePoints;
    private calculateComplexity;
    private calculateGrangerCausality;
    private identifyCausalMechanism;
    private calculateClusteringCoefficient;
    private calculateAveragePathLength;
    private createCausalGraphVector;
    private detectCausalCommunities;
    private calculateInternalCausality;
    private identifyExternalInfluences;
    private classifyClusterType;
    private calculateClusterStability;
    private assessOptimizationPotential;
    private generateClusterInterventions;
}
export interface TimeSeriesData {
    timestamps: Date[];
    values: {
        [variable: string]: number[];
    };
    metadata: {
        [variable: string]: any;
    };
}
export interface CausalDiscoveryConfig {
    algorithm: CausalAlgorithm;
    maxLag?: number;
    significanceLevel?: number;
    minEdgeStrength?: number;
    temporalWindow?: number;
    validationMethod?: string;
}
export interface PreprocessedTimeSeriesData {
    original: TimeSeriesData;
    cleaned: TimeSeriesData;
    adjusted: TimeSeriesData;
    normalized: {
        [variable: string]: number[];
    };
    optimalLags: number[];
    preprocessingMetadata: {
        missingValueRate: number;
        outlierCount: number;
        stationarityTests: any[];
    };
}
export interface TemporalPattern {
    variable: string;
    trend: TrendInfo;
    seasonality: SeasonalityPattern;
    autocorrelation: AutocorrelationInfo;
    changePoints: ChangePoint[];
    cycles: Cycle[];
    complexity: number;
}
export interface TrendInfo {
    type: TrendType;
    slope: number;
    confidence: number;
}
export interface AutocorrelationInfo {
    maxCorrelation: number;
    lag: number;
    significance: boolean;
}
export interface ChangePoint {
    index: number;
    timestamp: Date;
    magnitude: number;
    confidence: number;
}
export interface Cycle {
    period: number;
    strength: number;
    phase: number;
}
export interface GrangerCausalityResult {
    cause: string;
    effect: string;
    fStatistic: number;
    pValue: number;
    lag: number;
    direction: CausalDirection;
    strength: number;
}
export interface CausalPathAnalysis {
    directPaths: PathInfo[];
    indirectPaths: PathInfo[];
    confoundingPaths: PathInfo[];
    mediatorPaths: PathInfo[];
    criticalPaths: PathInfo[];
    pathStrengths: Map<string, number>;
    pathEffects: Map<string, number>;
}
export declare enum PathType {
    DIRECT = "direct",
    INDIRECT = "indirect",
    CONFOUNDING = "confounding",
    MEDIATOR = "mediator"
}
export interface PathInfo {
    path: string[];
    type: PathType;
    strength: number;
    effect: number;
    confidence: number;
    mechanism: string;
}
export interface InterventionPrediction {
    intervention: Intervention;
    causalEffect: CausalEffect;
    uncertainty: EffectUncertainty;
    temporalDynamics: TemporalDynamics;
    feasibility: FeasibilityAssessment;
    sideEffects: SideEffect[];
    expectedImprovement: number;
    confidence: number;
    timestamp: Date;
}
export interface CausalEffect {
    effect: number;
    confidence: number;
    confidenceInterval: [number, number];
    method: string;
}
export interface EffectUncertainty {
    variance: number;
    standardError: number;
    credibleInterval: [number, number];
    sensitivity: number;
}
export interface TemporalDynamics {
    immediateEffect: number;
    shortTermEffect: number;
    longTermEffect: number;
    convergenceTime: number;
    oscillation: boolean;
}
export interface FeasibilityAssessment {
    feasible: boolean;
    technicalFeasibility: number;
    operationalFeasibility: number;
    costFeasibility: number;
    risks: string[];
    mitigation: string[];
}
export interface SideEffect {
    target: string;
    effect: number;
    probability: number;
    severity: 'low' | 'medium' | 'high';
}
export interface CausalCluster {
    id: string;
    nodes: string[];
    internalCausality: number;
    externalInfluences: ExternalInfluence[];
    clusterType: ClusterType;
    stabilityScore: number;
    optimizationPotential: number;
    recommendedInterventions: Intervention[];
}
export interface ExternalInfluence {
    source: string;
    strength: number;
    direction: CausalDirection;
    lag: number;
}
export declare enum ClusterType {
    CONFIGURATION = "configuration",
    PERFORMANCE = "performance",
    ENVIRONMENTAL = "environmental",
    USER_BEHAVIOR = "user_behavior",
    MIXED = "mixed"
}
export interface Community {
    nodes: string[];
    modularity: number;
    cohesion: number;
}
export interface GrangerResult {
    fStatistic: number;
    pValue: number;
    optimalLag: number;
    direction: CausalDirection;
    strength: number;
}
export default CausalDiscoveryEngine;
//# sourceMappingURL=causal-discovery.d.ts.map