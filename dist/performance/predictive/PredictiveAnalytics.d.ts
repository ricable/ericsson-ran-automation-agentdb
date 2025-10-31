/**
 * Predictive Performance Analytics Engine
 *
 * Advanced machine learning-based performance prediction, capacity planning,
   and early warning system for performance degradation and bottlenecks
 */
/// <reference types="node" />
import { PerformanceSnapshot } from '../metrics/MLPerformanceMetrics';
import { EventEmitter } from 'events';
export interface PredictionModel {
    id: string;
    name: string;
    type: 'time_series' | 'regression' | 'classification' | 'anomaly_detection';
    targetMetric: string;
    features: string[];
    accuracy: number;
    confidence: number;
    lastTrained: Date;
    trainingDataPoints: number;
    predictionHorizon: number;
    modelParameters: Record<string, any>;
}
export interface PerformancePrediction {
    id: string;
    timestamp: Date;
    modelId: string;
    targetMetric: string;
    currentValue: number;
    predictedValue: number;
    confidence: number;
    timeHorizon: number;
    trend: 'improving' | 'stable' | 'degrading';
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    impact: {
        performanceImpact: string;
        affectedComponents: string[];
        businessImpact: string;
    };
    recommendations: string[];
    earlyWarningThresholds: {
        warning: number;
        critical: number;
    };
}
export interface CapacityPlanningForecast {
    id: string;
    timestamp: Date;
    resourceType: 'cpu' | 'memory' | 'storage' | 'network' | 'gpu';
    timeframe: '1h' | '6h' | '24h' | '7d' | '30d';
    currentUtilization: number;
    predictedUtilization: number;
    peakUtilization: number;
    timeToThreshold: number | null;
    scalingRecommendation: {
        action: 'scale_up' | 'scale_out' | 'optimize' | 'no_action';
        urgency: 'immediate' | 'within_hour' | 'within_day' | 'within_week';
        estimatedCost: number;
        resources: {
            current: number;
            recommended: number;
            unit: string;
        };
    };
    confidence: number;
    factors: Array<{
        factor: string;
        impact: number;
        confidence: number;
    }>;
}
export interface AnomalyDetectionResult {
    id: string;
    timestamp: Date;
    anomalyType: 'performance_spike' | 'performance_drop' | 'resource_exhaustion' | 'communication_failure' | 'behavioral_change';
    severity: 'low' | 'medium' | 'high' | 'critical';
    confidence: number;
    description: string;
    affectedMetrics: string[];
    baselineValue: number;
    observedValue: number;
    deviationMagnitude: number;
    duration: number;
    rootCauseHypothesis: string[];
    autoResolution: {
        possible: boolean;
        actions: string[];
        successProbability: number;
    };
    context: {
        concurrentEvents: string[];
        systemLoad: number;
        recentChanges: string[];
    };
}
export interface PerformanceTrendAnalysis {
    metric: string;
    timeframe: '1h' | '6h' | '24h' | '7d' | '30d';
    trend: {
        direction: 'increasing' | 'decreasing' | 'stable' | 'volatile';
        slope: number;
        correlation: number;
        seasonality: {
            detected: boolean;
            period: number;
            strength: number;
        };
    };
    statistics: {
        mean: number;
        median: number;
        standardDeviation: number;
        min: number;
        max: number;
        p25: number;
        p75: number;
        p95: number;
        p99: number;
    };
    patterns: Array<{
        type: 'growth' | 'decay' | 'oscillation' | 'step_change';
        description: string;
        confidence: number;
        startTime: Date;
        endTime?: Date;
    }>;
}
export interface PredictiveInsight {
    id: string;
    timestamp: Date;
    category: 'performance' | 'capacity' | 'availability' | 'cost_optimization';
    priority: 'low' | 'medium' | 'high' | 'critical';
    title: string;
    description: string;
    supportingData: {
        predictions: PerformancePrediction[];
        forecasts: CapacityPlanningForecast[];
        anomalies: AnomalyDetectionResult[];
        trends: PerformanceTrendAnalysis[];
    };
    actionableRecommendations: Array<{
        action: string;
        benefit: string;
        effort: 'low' | 'medium' | 'high';
        timeframe: string;
        risk: 'low' | 'medium' | 'high';
    }>;
    businessImpact: {
        metric: string;
        impact: 'positive' | 'negative' | 'neutral';
        magnitude: number;
        confidence: number;
    };
}
export declare class PredictiveAnalytics extends EventEmitter {
    private predictionModels;
    private predictions;
    private forecasts;
    private anomalies;
    private insights;
    private performanceHistory;
    private maxHistorySize;
    private analysisInterval;
    constructor();
    private initializePredictionModels;
    private addPredictionModel;
    updatePerformanceData(snapshot: PerformanceSnapshot): void;
    private startPredictiveAnalysis;
    private performPredictiveAnalysis;
    private generatePerformancePredictions;
    private generatePrediction;
    private calculatePredictionVariance;
    private extractMetricValue;
    private assessPredictionImpact;
    private generatePredictionRecommendations;
    private calculateWarningThresholds;
    private generateCapacityForecasts;
    private generateCapacityForecast;
    private getCurrentResourceUtilization;
    private getResourceTrendFactor;
    private generateScalingRecommendation;
    private generateInfluencingFactors;
    private calculateForecastConfidence;
    private detectAnomalies;
    private detectAnomaly;
    private calculateBaselineValue;
    private calculateStandardDeviation;
    private generateRootCauseHypotheses;
    private determineAutoResolution;
    private analyzeTrends;
    private generatePredictiveInsights;
    private generateHighPriorityInsight;
    private generateInsightRecommendations;
    private calculateBusinessImpact;
    private retrainModelsIfNeeded;
    private retrainModel;
    getPredictions(limit?: number): PerformancePrediction[];
    getForecasts(limit?: number): CapacityPlanningForecast[];
    getAnomalies(limit?: number): AnomalyDetectionResult[];
    getInsights(limit?: number): PredictiveInsight[];
    getPredictionModels(): PredictionModel[];
    getHighRiskPredictions(): PerformancePrediction[];
    getUrgentCapacityNeeds(): CapacityPlanningForecast[];
    exportPredictiveData(): any;
    stop(): void;
}
//# sourceMappingURL=PredictiveAnalytics.d.ts.map