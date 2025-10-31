/**
 * Bottleneck Detection System
 *
 * Automated identification of performance bottlenecks in ML pipelines,
 * swarm coordination, and system resources with predictive analysis
 */
/// <reference types="node" />
import { PerformanceSnapshot } from '../metrics/MLPerformanceMetrics';
import { EventEmitter } from 'events';
export interface Bottleneck {
    id: string;
    timestamp: Date;
    severity: 'critical' | 'high' | 'medium' | 'low';
    category: 'ml_performance' | 'swarm_coordination' | 'system_resources' | 'network_communication';
    component: string;
    metric: string;
    currentValue: number;
    expectedValue: number;
    impact: string;
    rootCause: string;
    recommendations: string[];
    autoResolutionPossible: boolean;
    autoResolutionActions?: string[];
    affectedComponents: string[];
    performanceImpact: {
        throughputLoss: number;
        latencyIncrease: number;
        resourceWaste: number;
    };
}
export interface BottleneckPattern {
    id: string;
    name: string;
    description: string;
    detectionRules: BottleneckRule[];
    category: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
    autoResolution: boolean;
}
export interface BottleneckRule {
    metricPath: string;
    condition: 'greater_than' | 'less_than' | 'deviation_from_baseline' | 'trend_analysis';
    threshold: number;
    timeWindow: number;
    sampleSize: number;
}
export interface BottleneckAnalysis {
    detectedBottlenecks: Bottleneck[];
    performanceImpact: {
        overallPerformanceLoss: number;
        affectedComponents: string[];
        estimatedResolutionTime: number;
        priorityRecommendations: string[];
    };
    trends: {
        emergingBottlenecks: string[];
        improvingMetrics: string[];
        degradingMetrics: string[];
    };
    predictions: {
        likelyBottlenecks: Array<{
            component: string;
            probability: number;
            timeframe: string;
            mitigation: string[];
        }>;
    };
}
export declare class BottleneckDetector extends EventEmitter {
    private performanceHistory;
    private bottleneckPatterns;
    private baselineMetrics;
    private activeBottlenecks;
    private analysisTimer;
    constructor();
    private initializeBottleneckPatterns;
    private addBottleneckPattern;
    updateMetrics(snapshot: PerformanceSnapshot): void;
    private updateBaselineMetrics;
    private updateMetricBaseline;
    analyzeBottlenecks(): BottleneckAnalysis;
    private detectBottlenecks;
    private checkBottleneckPattern;
    private getRecentSnapshots;
    private getMetricValue;
    private detectNegativeTrend;
    private createBottleneckFromPattern;
    private calculateBottleneckImpact;
    private inferRootCause;
    private generateBottleneckRecommendations;
    private generateAutoResolutionActions;
    private identifyAffectedComponents;
    private calculatePerformanceImpactValue;
    private detectPerformanceDegradation;
    private calculateAverageMetrics;
    private calculateMLScore;
    private checkMetricDegradation;
    private detectResourceContention;
    private calculatePerformanceImpact;
    private estimateResolutionTime;
    private analyzeTrends;
    private predictFutureBottlenecks;
    private updateActiveBottlenecks;
    private startContinuousAnalysis;
    getActiveBottlenecks(): Bottleneck[];
    getBottleneckHistory(limit?: number): Bottleneck[];
    attemptAutoResolution(bottleneckId: string): Promise<boolean>;
    stop(): void;
}
//# sourceMappingURL=BottleneckDetector.d.ts.map