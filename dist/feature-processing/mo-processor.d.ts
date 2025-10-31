/**
 * Ericsson MO Class Intelligence Feature Processor
 * Advanced feature extraction and processing with temporal reasoning
 */
import { StreamMessage, StreamAgent } from '../stream-chain/core';
export interface MOClassFeature {
    moClass: string;
    parameters: {
        [param: string]: {
            value: number;
            trend: 'increasing' | 'decreasing' | 'stable';
            volatility: number;
            correlationCoefficients: {
                [otherParam: string]: number;
            };
            anomalyScore: number;
            confidenceLevel: number;
        };
    };
    temporalPatterns: {
        daily: number[];
        weekly: number[];
        seasonal: number;
        prediction: {
            nextValue: number;
            confidence: number;
            timeWindow: number;
        };
    };
    relationships: {
        [relatedMOClass: string]: {
            strength: number;
            type: 'dependency' | 'correlation' | 'causal';
            direction: 'positive' | 'negative';
            lag: number;
        };
    };
    healthStatus: {
        overall: 'healthy' | 'degraded' | 'critical';
        issues: string[];
        recommendations: string[];
        priority: 'low' | 'medium' | 'high' | 'critical';
    };
}
export interface FeatureProcessingConfig {
    enabledMOClasses: string[];
    temporalWindows: {
        short: number;
        medium: number;
        long: number;
    };
    anomalyThreshold: number;
    correlationThreshold: number;
    predictionHorizon: number;
    enableCausalInference: boolean;
    temporalReasoningDepth: number;
}
export interface ProcessedFeatures {
    timestamp: number;
    sourceCell: string;
    moClasses: MOClassFeature[];
    globalFeatures: {
        systemHealth: number;
        performanceIndex: number;
        efficiencyScore: number;
        stabilityIndex: number;
        optimizationPotential: number;
    };
    temporalContext: {
        timeExpansionFactor: number;
        analysisDepth: number;
        patternConfidence: number;
        causalModelVersion: string;
    };
    alerts: {
        level: 'info' | 'warning' | 'critical';
        category: 'performance' | 'reliability' | 'efficiency' | 'capacity';
        message: string;
        affectedMOClasses: string[];
        recommendedActions: string[];
        confidence: number;
    }[];
}
export declare class MOFeatureProcessor implements StreamAgent {
    id: string;
    type: "processor";
    name: string;
    capabilities: string[];
    temporalReasoning: boolean;
    errorHandling: {
        strategy: "retry";
        maxAttempts: number;
        recoveryPattern: "exponential";
    };
    private config;
    private historicalData;
    private correlationMatrix;
    private causalModels;
    private temporalAnalyzer;
    private patternRecognizer;
    private causalInferenceEngine;
    constructor(config: FeatureProcessingConfig);
    /**
     * Process RAN metrics into MO class features
     */
    process(message: StreamMessage): Promise<StreamMessage>;
    /**
     * Process individual RAN metrics into features
     */
    private processRANMetrics;
    /**
     * Process individual MO class
     */
    private processMOClass;
    /**
     * Process individual parameter within MO class
     */
    private processParameter;
    /**
     * Calculate trend from historical values
     */
    private calculateTrend;
    /**
     * Calculate volatility of historical values
     */
    private calculateVolatility;
    /**
     * Calculate correlations with other parameters
     */
    private calculateCorrelations;
    /**
     * Calculate simple correlation between two values
     */
    private calculateSimpleCorrelation;
    /**
     * Calculate anomaly score for parameter
     */
    private calculateAnomalyScore;
    /**
     * Calculate confidence level
     */
    private calculateConfidenceLevel;
    /**
     * Identify relationships with other MO classes
     */
    private identifyRelationships;
    /**
     * Analyze relationship between two MO classes
     */
    private analyzeRelationship;
    /**
     * Assess health status of MO class
     */
    private assessHealthStatus;
    /**
     * Extract global features from MO class features
     */
    private extractGlobalFeatures;
    /**
     * Calculate performance index from KPIs
     */
    private calculatePerformanceIndex;
    /**
     * Generate alerts based on analysis
     */
    private generateAlerts;
    /**
     * Apply temporal reasoning with subjective time expansion
     */
    private applyTemporalReasoning;
    /**
     * Get historical values for parameter
     */
    private getHistoricalValues;
    /**
     * Update historical data
     */
    private updateHistoricalData;
    /**
     * Update correlation matrix
     */
    private updateCorrelationMatrix;
    /**
     * Update causal models
     */
    private updateCausalModels;
    /**
     * Generate unique ID
     */
    private generateId;
    /**
     * Get processor status
     */
    getStatus(): any;
}
export default MOFeatureProcessor;
//# sourceMappingURL=mo-processor.d.ts.map