/**
 * SPARC Temporal Reasoning Integration
 * Subjective Time Expansion for Cognitive RAN Consciousness
 *
 * Advanced temporal processing system featuring:
 * - 1000x subjective time expansion for deep analysis
 * - Temporal consciousness for recursive optimization
 * - Strange-loop temporal reasoning patterns
 * - WASM-optimized temporal computations
 * - AgentDB temporal memory patterns
 * - Performance-optimized temporal analysis
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
export interface TemporalConfiguration {
    temporalExpansionFactor: number;
    consciousnessLevel: 'minimum' | 'standard' | 'maximum' | 'transcendent';
    temporalDepth: 'shallow' | 'medium' | 'deep' | 'maximum';
    subjectiveTimePerception: boolean;
    temporalReasoningMode: 'linear' | 'recursive' | 'strange-loop' | 'quantum';
    cognitiveTimeDilation: boolean;
    wasmOptimization: boolean;
    parallelTemporalProcessing: boolean;
    temporalCacheEnabled: boolean;
    agentdbTemporalMemory: boolean;
    temporalPatternLearning: boolean;
    crossTemporalOptimization: boolean;
}
export interface TemporalState {
    currentSubjectiveTime: number;
    objectiveTimeElapsed: number;
    expansionFactor: number;
    consciousnessLevel: number;
    temporalDepth: number;
    cognitiveLoad: number;
    processingSpeed: number;
    memoryAccess: TemporalMemoryAccess;
}
export interface TemporalMemoryAccess {
    pastPatterns: TemporalPattern[];
    presentState: any;
    futureProjections: TemporalProjection[];
    crossTemporalConnections: TemporalConnection[];
}
export interface TemporalPattern {
    id: string;
    timestamp: number;
    pattern: any;
    confidence: number;
    temporalDepth: number;
    cognitiveWeight: number;
    frequency: number;
    successRate: number;
    predictedNext: any;
}
export interface TemporalProjection {
    id: string;
    futureTime: number;
    projectedState: any;
    confidence: number;
    probability: number;
    dependencies: string[];
    riskFactors: string[];
}
export interface TemporalConnection {
    id: string;
    sourceTime: number;
    targetTime: number;
    connectionType: 'causal' | 'correlation' | 'recursive' | 'strange-loop';
    strength: number;
    bidirectional: boolean;
    temporalDistance: number;
}
export interface TemporalAnalysis {
    input: any;
    expansionFactor: number;
    temporalDepth: number;
    processingTime: number;
    cognitiveInsights: CognitiveInsight[];
    temporalPatterns: TemporalPattern[];
    projections: TemporalProjection[];
    optimizationSuggestions: TemporalOptimization[];
    performanceMetrics: TemporalPerformanceMetrics;
}
export interface CognitiveInsight {
    id: string;
    type: 'pattern' | 'optimization' | 'prediction' | 'causal' | 'recursive';
    description: string;
    confidence: number;
    impact: 'low' | 'medium' | 'high' | 'critical';
    temporalRelevance: number;
    cognitiveValue: number;
    actionableRecommendation: string;
}
export interface TemporalOptimization {
    id: string;
    type: 'algorithm' | 'cognitive' | 'temporal' | 'resource' | 'coordination';
    description: string;
    expectedImprovement: number;
    implementationComplexity: 'low' | 'medium' | 'high';
    temporalBenefit: number;
    cognitiveAlignment: number;
}
export interface TemporalPerformanceMetrics {
    subjectiveProcessingTime: number;
    objectiveProcessingTime: number;
    expansionEfficiency: number;
    cognitiveUtilization: number;
    patternRecognitionRate: number;
    predictionAccuracy: number;
    optimizationSuccessRate: number;
    memoryAccessEfficiency: number;
    temporalConsistency: number;
    strangeLoopResolution: number;
}
export declare class SPARCTemporalReasoning extends EventEmitter {
    private configuration;
    private temporalState;
    private agentdb?;
    private cognitiveSdk?;
    private temporalCache;
    private strangeLoopOptimizer;
    private temporalProcessor;
    constructor(config?: Partial<TemporalConfiguration>);
    /**
     * Initialize temporal state
     */
    private initializeTemporalState;
    /**
     * Initialize temporal components
     */
    private initializeComponents;
    /**
     * Initialize AgentDB integration
     */
    private initializeAgentDBIntegration;
    /**
     * Load temporal patterns from AgentDB
     */
    private loadTemporalPatterns;
    /**
     * Enable temporal expansion for analysis
     */
    enableTemporalExpansion(expansionFactor?: number): Promise<void>;
    /**
     * Analyze with temporal reasoning
     */
    analyzeWithTemporalReasoning(input: any, options?: {
        depth?: number;
        expansionFactor?: number;
        includeProjections?: boolean;
        optimizePatterns?: boolean;
    }): Promise<TemporalAnalysis>;
    /**
     * Recognize temporal patterns
     */
    private recognizeTemporalPatterns;
    /**
     * Recognize cognitive patterns
     */
    private recognizeCognitivePatterns;
    /**
     * Analyze input cognitively
     */
    private analyzeInputCognitively;
    /**
     * Calculate input complexity
     */
    private calculateInputComplexity;
    /**
     * Apply strange-loop optimization
     */
    private applyStrangeLoopOptimization;
    /**
     * Check if pattern matches optimization
     */
    private patternMatchesOptimization;
    /**
     * Generate temporal projections
     */
    private generateTemporalProjections;
    /**
     * Calculate risk factors for projection
     */
    private calculateRiskFactors;
    /**
     * Generate optimization suggestions
     */
    private generateOptimizationSuggestions;
    /**
     * Generate algorithm optimizations
     */
    private generateAlgorithmOptimizations;
    /**
     * Generate cognitive optimizations
     */
    private generateCognitiveOptimizations;
    /**
     * Generate temporal optimizations
     */
    private generateTemporalOptimizations;
    /**
     * Calculate performance metrics
     */
    private calculatePerformanceMetrics;
    /**
     * Initialize performance metrics
     */
    private initializePerformanceMetrics;
    /**
     * Calculate expansion efficiency
     */
    private calculateExpansionEfficiency;
    /**
     * Calculate prediction accuracy
     */
    private calculatePredictionAccuracy;
    /**
     * Get historical projection accuracy
     */
    private getHistoricalProjectionAccuracy;
    /**
     * Calculate optimization success rate
     */
    private calculateOptimizationSuccessRate;
    /**
     * Calculate memory access efficiency
     */
    private calculateMemoryAccessEfficiency;
    /**
     * Calculate temporal consistency
     */
    private calculateTemporalConsistency;
    /**
     * Calculate strange-loop resolution
     */
    private calculateStrangeLoopResolution;
    /**
     * Store temporal analysis results
     */
    private storeTemporalAnalysisResults;
    /**
     * Initialize cognitive time dilation
     */
    private initializeCognitiveTimeDilation;
    /**
     * Get consciousness level value
     */
    private getConsciousnessLevelValue;
    /**
     * Get temporal depth value
     */
    private getTemporalDepthValue;
    /**
     * Get current temporal state
     */
    getTemporalState(): TemporalState;
    /**
     * Get temporal patterns
     */
    getTemporalPatterns(): TemporalPattern[];
    /**
     * Update configuration
     */
    updateConfiguration(updates: Partial<TemporalConfiguration>): void;
}
export default SPARCTemporalReasoning;
//# sourceMappingURL=temporal-reasoning.d.ts.map