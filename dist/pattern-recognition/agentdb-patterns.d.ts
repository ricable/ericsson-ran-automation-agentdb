/**
 * AgentDB Memory-Based Pattern Recognition System
 * Advanced pattern matching with vector similarity and persistent memory
 */
import { StreamMessage, StreamAgent } from '../stream-chain/core';
import { ProcessedFeatures } from '../feature-processing/mo-processor';
export interface PatternMatch {
    id: string;
    patternId: string;
    confidence: number;
    similarity: number;
    temporalMatch: boolean;
    contextMatch: boolean;
    metadata: {
        matchedAt: number;
        sourcePattern: string;
        vectorDistance: number;
        temporalDistance: number;
        contextAlignment: number;
    };
    predictions: {
        nextStates: string[];
        optimalActions: string[];
        riskFactors: string[];
        confidenceWindow: number;
    };
}
export interface MemoryPattern {
    id: string;
    name: string;
    type: 'temporal' | 'spatial' | 'behavioral' | 'causal' | 'anomaly';
    category: 'performance' | 'reliability' | 'efficiency' | 'capacity' | 'mobility';
    description: string;
    vector: number[];
    temporalSignature: {
        daily: number[];
        weekly: number[];
        seasonal: number;
        trends: {
            direction: 'increasing' | 'decreasing' | 'stable';
            strength: number;
            duration: number;
        }[];
    };
    contextualFeatures: {
        environmental: string[];
        operational: string[];
        network: string[];
    };
    outcomes: {
        successRate: number;
        impactScore: number;
        recommendedActions: string[];
        riskLevel: 'low' | 'medium' | 'high' | 'critical';
    };
    learning: {
        frequency: number;
        lastSeen: number;
        confidence: number;
        reinforcementScore: number;
        adaptationCount: number;
    };
}
export interface PatternRecognitionConfig {
    vectorDimensions: number;
    similarityThreshold: number;
    temporalWindow: number;
    memoryRetention: number;
    learningRate: number;
    enableCausalInference: boolean;
    enableTemporalReasoning: boolean;
    maxPatternsPerCategory: number;
    adaptationThreshold: number;
}
export interface RecognizedPatterns {
    timestamp: number;
    sourceCell: string;
    inputFeatures: ProcessedFeatures;
    matchedPatterns: PatternMatch[];
    novelPatterns: MemoryPattern[];
    contextualInsights: {
        currentContext: string;
        similarContexts: string[];
        contextualConfidence: number;
    };
    predictiveInsights: {
        shortTerm: {
            probability: number;
            outcome: string;
            timeframe: number;
        }[];
        mediumTerm: {
            probability: number;
            outcome: string;
            timeframe: number;
        }[];
        longTerm: {
            probability: number;
            outcome: string;
            timeframe: number;
        }[];
    };
    adaptiveLearning: {
        patternsUpdated: number;
        newPatternsCreated: number;
        confidenceImproved: number;
        memoryConsolidated: boolean;
    };
}
export declare class AgentDBPatternRecognizer implements StreamAgent {
    id: string;
    type: "analyzer";
    name: string;
    capabilities: string[];
    temporalReasoning: boolean;
    errorHandling: {
        strategy: "self-heal";
        maxAttempts: number;
        recoveryPattern: "cognitive";
    };
    private config;
    private patternMemory;
    private vectorIndex;
    private temporalIndex;
    private contextualIndex;
    private learningEngine;
    private causalGraph;
    constructor(config: PatternRecognitionConfig);
    /**
     * Process features and recognize patterns
     */
    process(message: StreamMessage): Promise<StreamMessage>;
    /**
     * Recognize patterns in processed features
     */
    private recognizePatterns;
    /**
     * Generate feature vector from processed features
     */
    private generateFeatureVector;
    /**
     * Perform detailed pattern matching
     */
    private performDetailedMatch;
    /**
     * Check temporal alignment with pattern
     */
    private checkTemporalAlignment;
    /**
     * Check contextual alignment with pattern
     */
    private checkContextualAlignment;
    /**
     * Identify novel patterns
     */
    private identifyNovelPatterns;
    /**
     * Create novel pattern from features
     */
    private createNovelPattern;
    /**
     * Generate contextual insights
     */
    private generateContextualInsights;
    /**
     * Generate predictive insights
     */
    private generatePredictiveInsights;
    /**
     * Calculate adaptive learning metrics
     */
    private calculateAdaptiveLearning;
    /**
     * Extract temporal signature from features
     */
    private extractTemporalSignature;
    /**
     * Extract contextual features from features
     */
    private extractContextualFeatures;
    /**
     * Determine pattern type from features
     */
    private determinePatternType;
    /**
     * Determine pattern category from features
     */
    private determinePatternCategory;
    /**
     * Generate recommended actions
     */
    private generateRecommendedActions;
    /**
     * Find similar contexts
     */
    private findSimilarContexts;
    /**
     * Generate predictions based on pattern
     */
    private generatePredictions;
    /**
     * Update learning based on recognized patterns
     */
    private updateLearning;
    /**
     * Consolidate memory to prevent overflow
     */
    private consolidateMemory;
    /**
     * Initialize base patterns
     */
    private initializeBasePatterns;
    /**
     * Calculate Euclidean distance between vectors
     */
    private calculateEuclideanDistance;
    /**
     * Calculate distance between arrays
     */
    private calculateArrayDistance;
    /**
     * Generate unique ID
     */
    private generateId;
    /**
     * Get pattern recognizer status
     */
    getStatus(): any;
}
export default AgentDBPatternRecognizer;
//# sourceMappingURL=agentdb-patterns.d.ts.map