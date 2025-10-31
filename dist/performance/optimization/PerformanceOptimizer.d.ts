/**
 * Performance Optimization Engine
 *
 * Automated performance tuning recommendations and optimization execution
 * for ML systems, swarm coordination, and resource allocation
 */
/// <reference types="node" />
import { PerformanceSnapshot } from '../metrics/MLPerformanceMetrics';
import { BottleneckDetector } from '../bottleneck/BottleneckDetector';
import { SwarmMonitor } from '../swarm/SwarmMonitor';
import { EventEmitter } from 'events';
export interface OptimizationStrategy {
    id: string;
    name: string;
    description: string;
    category: 'ml_performance' | 'swarm_coordination' | 'resource_allocation' | 'network_optimization';
    priority: 'critical' | 'high' | 'medium' | 'low';
    estimatedImpact: {
        performanceImprovement: number;
        resourceSavings: number;
        riskLevel: number;
    };
    implementation: {
        automatic: boolean;
        duration: number;
        requiredResources: string[];
        potentialSideEffects: string[];
    };
    conditions: {
        requiredMetrics: Array<{
            metricPath: string;
            operator: '>' | '<' | '=' | '!=';
            value: number;
        }>;
        prerequisites: string[];
        conflicts: string[];
    };
    actions: OptimizationAction[];
}
export interface OptimizationAction {
    id: string;
    type: 'parameter_tuning' | 'resource_scaling' | 'topology_change' | 'algorithm_switch' | 'cache_optimization' | 'configuration_update';
    description: string;
    targetComponent: string;
    parameters: Record<string, any>;
    rollbackPlan: string;
    validationSteps: string[];
}
export interface OptimizationPlan {
    id: string;
    timestamp: Date;
    targetBottlenecks: string[];
    strategies: OptimizationStrategy[];
    estimatedTotalImpact: {
        performanceImprovement: number;
        resourceSavings: number;
        implementationTime: number;
        riskLevel: number;
    };
    executionOrder: string[];
    dependencies: Map<string, string[]>;
    rollbackProcedures: string[];
}
export interface OptimizationResult {
    planId: string;
    strategyId: string;
    timestamp: Date;
    status: 'pending' | 'executing' | 'completed' | 'failed' | 'rolled_back';
    beforeMetrics: PerformanceSnapshot;
    afterMetrics?: PerformanceSnapshot;
    impact: {
        performanceChange: number;
        resourceChange: number;
        errorRateChange: number;
    };
    executionLogs: string[];
    errors?: string[];
    rollbackRequired: boolean;
}
export interface OptimizationRecommendation {
    id: string;
    timestamp: Date;
    category: string;
    title: string;
    description: string;
    impact: 'high' | 'medium' | 'low';
    effort: 'easy' | 'moderate' | 'complex';
    risk: 'low' | 'medium' | 'high';
    currentMetrics: any;
    targetMetrics: any;
    implementation: {
        steps: string[];
        estimatedTime: number;
        requiredPermissions: string[];
        rollbackPossible: boolean;
    };
    supportingData: {
        historicalTrends: any[];
        benchmarkComparisons: any[];
        expectedROI: number;
    };
}
export declare class PerformanceOptimizer extends EventEmitter {
    private bottleneckDetector;
    private swarmMonitor;
    private optimizationStrategies;
    private activeOptimizations;
    private optimizationHistory;
    private optimizationQueue;
    private isOptimizing;
    constructor(bottleneckDetector: BottleneckDetector, swarmMonitor: SwarmMonitor);
    private initializeOptimizationStrategies;
    private addOptimizationStrategy;
    analyzeAndOptimize(metrics: PerformanceSnapshot): Promise<OptimizationPlan[]>;
    private generateOptimizationRecommendations;
    private isStrategyApplicable;
    private getNestedValue;
    private createRecommendationFromStrategy;
    private extractRelevantMetrics;
    private calculateTargetMetrics;
    private generateProactiveRecommendations;
    private calculateRecommendationScore;
    private createOptimizationPlans;
    private convertRecommendationToStrategy;
    private calculateTotalImpact;
    private planExecutionOrder;
    private prioritizeOptimizationPlans;
    executeOptimizationPlan(planId: string): Promise<boolean>;
    private executeOptimizationStrategy;
    private executeOptimizationAction;
    private validateActionResult;
    private rollbackAction;
    private captureCurrentMetrics;
    private calculateOptimizationImpact;
    private calculateMetricChange;
    private calculateResourceChange;
    private startOptimizationEngine;
    getOptimizationQueue(): OptimizationPlan[];
    getActiveOptimizations(): OptimizationResult[];
    getOptimizationHistory(limit?: number): OptimizationResult[];
    getAvailableStrategies(): OptimizationStrategy[];
    rollbackOptimization(strategyId: string): Promise<boolean>;
    stop(): void;
}
//# sourceMappingURL=PerformanceOptimizer.d.ts.map