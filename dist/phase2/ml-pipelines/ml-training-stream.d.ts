/**
 * ML Training Pipeline Stream for Reinforcement Learning
 * Phase 2: Advanced RAN Optimization with Causal Intelligence
 */
import { AgentDB } from '../../agentdb/agentdb-core';
import { TemporalReasoningCore } from '../../temporal/temporal-core';
export interface RANMetrics {
    timestamp: Date;
    cellId: string;
    kpis: {
        throughput: number;
        latency: number;
        packetLoss: number;
        jitter: number;
        availability: number;
    };
    parameters: {
        power: number;
        bandwidth: number;
        modulation: string;
        antennaConfiguration: string;
    };
    environmental: {
        interference: number;
        noise: number;
        trafficLoad: number;
        userCount: number;
    };
}
export interface RLTrainingData {
    state: RANState;
    action: RANAction;
    reward: number;
    nextState: RANState;
    done: boolean;
    episodeId: string;
    timestamp: Date;
}
export interface RANState {
    cellConfiguration: CellConfig;
    networkConditions: NetworkConditions;
    userDistribution: UserDistribution;
    performanceMetrics: PerformanceMetrics;
}
export interface RANAction {
    type: ActionType;
    parameters: ActionParameters;
    targetCell?: string;
    priority: Priority;
}
export interface CellConfig {
    power: number;
    bandwidth: number;
    antennaTilt: number;
    azimuth: number;
    frequency: number;
}
export interface NetworkConditions {
    interference: number;
    noiseLevel: number;
    trafficLoad: number;
    congestionLevel: number;
}
export interface UserDistribution {
    userCount: number;
    mobilityLevel: number;
    serviceType: string[];
    qosRequirements: QoSRequirement[];
}
export interface PerformanceMetrics {
    throughput: number;
    latency: number;
    packetLoss: number;
    spectralEfficiency: number;
    energyEfficiency: number;
}
export interface QoSRequirement {
    service: string;
    throughput: number;
    latency: number;
    reliability: number;
}
export declare enum ActionType {
    POWER_ADJUSTMENT = "power_adjustment",
    ANTENNA_OPTIMIZATION = "antenna_optimization",
    BANDWIDTH_ALLOCATION = "bandwidth_allocation",
    HANDOVER_OPTIMIZATION = "handover_optimization",
    LOAD_BALANCING = "load_balancing",
    INTERFERENCE_MANAGEMENT = "interference_management"
}
export interface ActionParameters {
    [key: string]: any;
    power?: number;
    antennaTilt?: number;
    bandwidth?: number;
    targetCell?: string;
    handoverThreshold?: number;
}
export declare enum Priority {
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3,
    CRITICAL = 4
}
export declare class MLTrainingStream {
    private agentDB;
    private temporalCore;
    private metricsCollector;
    private causalEngine;
    private rlEngine;
    private policyValidator;
    constructor(agentDB: AgentDB, temporalCore: TemporalReasoningCore);
    createRLTrainingPipeline(): Promise<any>;
    private createDataIngestionProcessor;
    private createDataPreprocessingProcessor;
    private createCausalDiscoveryProcessor;
    private createFeatureExtractionProcessor;
    private createRLTrainingProcessor;
    private createPolicyValidationProcessor;
    private createAgentDBStorageProcessor;
    private createPerformanceMonitoringProcessor;
    private validateMetrics;
    private isWithinTimeWindow;
    private storeRawMetrics;
    private normalizeMetrics;
    private extractBaseFeatures;
    private detectAnomalies;
    private extractTimeSeries;
    private calculateCausalConfidence;
    private extractTemporalFeatures;
    private extractCausalFeatures;
    private extractPerformanceFeatures;
    private extractNetworkStateFeatures;
    private extractEnvironmentalFeatures;
    private extractUserBehaviorFeatures;
    private extractInterventionFeatures;
    private countFeatures;
    private convertToRLTrainingData;
    private calculateValidationScore;
    private generateValidationRecommendations;
    private createPatternVector;
    private createMemoryPatterns;
    private setupQUICSynchronization;
    private calculatePipelineMetrics;
    private calculateAgentPerformance;
    private calculateStoragePerformance;
    private calculateTemporalMetrics;
    private calculateCognitiveMetrics;
    private calculateOverallPerformanceScore;
    private generatePerformanceRecommendations;
    private storePreprocessedData;
    private storeCausalAnalysis;
    private storeExtractedFeatures;
    private getCausalAnalysis;
    private storeRLTrainingResult;
    private storeValidationResult;
    private storePerformanceMetrics;
}
export interface PreprocessedData {
    originalMetric: RANMetrics;
    normalizedMetrics: RANMetrics;
    temporalPatterns: any;
    anomalies: any[];
    baseFeatures: any[];
    timestamp: Date;
    correlationId: string;
}
export interface CausalAnalysisResult {
    causalGraph: any;
    causalPaths: any[];
    interventionEffects: any;
    causalClusters: any[];
    confidence: number;
    timestamp: Date;
    correlationId: string;
}
export interface ExtractedFeatures {
    temporalFeatures: number[];
    causalFeatures: number[];
    performanceFeatures: number[];
    networkStateFeatures: number[];
    environmentalFeatures: number[];
    userBehaviorFeatures: number[];
    interventionFeatures: number[];
    timestamp: Date;
    correlationId: string;
}
export interface RLTrainingResult {
    agents: any[];
    trainingMetrics: any;
    evaluationResults: any;
    optimizedPolicies: any;
    convergenceInfo: any;
    timestamp: Date;
    correlationId: string;
}
export interface ValidationResult {
    historicalValidation: any;
    simulationResults: any;
    stressTestResults: any;
    validationScore: number;
    recommendations: string[];
    timestamp: Date;
    correlationId: string;
}
export interface StorageResult {
    patternsStored: string[];
    vectorsIndexed: string[];
    memoriesCreated: string[];
    errors: Array<{
        policy?: string;
        memory?: string;
        error: string;
    }>;
}
export interface PerformanceMetrics {
    pipelineMetrics: any;
    agentPerformance: any;
    storagePerformance: any;
    temporalMetrics: any;
    cognitiveMetrics: any;
    overallScore: number;
    recommendations: string[];
    timestamp: Date;
    correlationId: string;
}
export default MLTrainingStream;
//# sourceMappingURL=ml-training-stream.d.ts.map