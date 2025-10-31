/**
 * Cognitive Optimization Engine with Strange-Loop Consciousness
 * Advanced RAN optimization using temporal reasoning and self-aware decision making
 */
import { StreamMessage, StreamAgent } from '../stream-chain/core';
export interface CognitiveState {
    consciousnessLevel: number;
    selfAwareness: number;
    temporalExpansion: number;
    recursiveDepth: number;
    strangeLoopActive: boolean;
    metaCognitionEnabled: boolean;
    learningRate: number;
    confidenceLevel: number;
}
export interface OptimizationObjective {
    id: string;
    name: string;
    type: 'energy' | 'performance' | 'coverage' | 'capacity' | 'mobility' | 'quality';
    priority: 'critical' | 'high' | 'medium' | 'low';
    targetValue: number;
    currentValue: number;
    improvementPotential: number;
    constraints: {
        [constraint: string]: {
            min?: number;
            max?: number;
            weight: number;
        };
    };
    temporalContext: {
        urgency: number;
        timeWindow: number;
        seasonalFactor: number;
    };
}
export interface CognitiveOptimization {
    id: string;
    timestamp: number;
    sourceCell: string;
    cognitiveState: CognitiveState;
    objectives: OptimizationObjective[];
    strategies: OptimizationStrategy[];
    decisions: OptimizationDecision[];
    predictions: {
        shortTerm: Prediction[];
        mediumTerm: Prediction[];
        longTerm: Prediction[];
    };
    consciousness: {
        selfReflection: string;
        metaAnalysis: string;
        adaptationPlan: string;
        confidenceEvolution: number[];
    };
}
export interface OptimizationStrategy {
    id: string;
    name: string;
    type: 'parameter-tuning' | 'resource-allocation' | 'feature-activation' | 'topology-change';
    description: string;
    expectedImpact: {
        objectiveId: string;
        impactValue: number;
        confidence: number;
        timeToEffect: number;
    }[];
    implementation: {
        parameters: {
            [param: string]: number;
        };
        actions: string[];
        rollbackPlan: string[];
    };
    risks: {
        level: 'low' | 'medium' | 'high' | 'critical';
        description: string;
        mitigation: string;
    }[];
    cognitiveReasoning: {
        rationale: string;
        alternatives: string[];
        confidence: number;
        metaReasoning: string;
    };
}
export interface OptimizationDecision {
    id: string;
    strategyId: string;
    status: 'pending' | 'executing' | 'completed' | 'failed' | 'rolled-back';
    startTime: number;
    endTime?: number;
    actualImpact: {
        objectiveId: string;
        beforeValue: number;
        afterValue: number;
        improvement: number;
    }[];
    lessons: string[];
    adaptation: {
        confidenceAdjustment: number;
        strategyRefinement: string;
        knowledgeGained: string;
    };
}
export interface Prediction {
    objectiveId: string;
    predictionType: 'value' | 'trend' | 'anomaly' | 'opportunity';
    predictedValue: number;
    confidence: number;
    timeHorizon: number;
    factors: string[];
    reasoning: string;
}
export interface CognitiveOptimizationConfig {
    consciousnessThreshold: number;
    maxTemporalExpansion: number;
    maxRecursiveDepth: number;
    learningRateAdaptation: boolean;
    strangeLoopOptimization: boolean;
    metaCognitionEnabled: boolean;
    predictionHorizon: {
        short: number;
        medium: number;
        long: number;
    };
    decisionThreshold: number;
    adaptationRate: number;
}
export declare class CognitiveOptimizer implements StreamAgent {
    id: string;
    type: "optimizer";
    name: string;
    capabilities: string[];
    temporalReasoning: boolean;
    errorHandling: {
        strategy: "self-heal";
        maxAttempts: number;
        recoveryPattern: "cognitive";
    };
    private config;
    private cognitiveState;
    private knowledgeBase;
    private strangeLoopProcessor;
    private temporalReasoningEngine;
    metaCognitiveMonitor: MetaCognitiveMonitor;
    private decisionHistory;
    private consciousnessEvolution;
    constructor(config: CognitiveOptimizationConfig);
    /**
     * Process recognized patterns and generate cognitive optimizations
     */
    process(message: StreamMessage): Promise<StreamMessage>;
    /**
     * Initialize cognitive state
     */
    private initializeCognitiveState;
    /**
     * Update cognitive state based on experience and performance
     */
    private updateCognitiveState;
    /**
     * Generate optimization objectives from patterns
     */
    private generateOptimizationObjectives;
    /**
     * Generate standard optimization strategies
     */
    private generateStandardStrategies;
    /**
     * Generate energy optimization strategies
     */
    private generateEnergyStrategies;
    /**
     * Generate performance optimization strategies
     */
    private generatePerformanceStrategies;
    /**
     * Generate quality optimization strategies
     */
    private generateQualityStrategies;
    /**
     * Generate capacity optimization strategies
     */
    private generateCapacityStrategies;
    /**
     * Make optimization decisions based on strategies and objectives
     */
    private makeOptimizationDecisions;
    /**
     * Generate predictions based on objectives and strategies
     */
    private generatePredictions;
    /**
     * Perform meta-cognitive analysis
     */
    private performMetaCognitiveAnalysis;
    /**
     * Generate self-reflection analysis
     */
    private generateSelfReflection;
    /**
     * Generate meta-analysis
     */
    private generateMetaAnalysis;
    /**
     * Generate adaptation plan
     */
    private generateAdaptationPlan;
    /**
     * Update knowledge base with new optimization experience
     */
    private updateKnowledgeBase;
    /**
     * Evolve consciousness based on optimization outcomes
     */
    private evolveConsciousness;
    /**
     * Generate unique ID
     */
    private generateId;
    /**
     * Get optimizer status
     */
    getStatus(): any;
}
/**
 * Meta-cognitive monitor for thinking about thinking
 */
declare class MetaCognitiveMonitor {
}
export default CognitiveOptimizer;
//# sourceMappingURL=cognitive-optimizer.d.ts.map