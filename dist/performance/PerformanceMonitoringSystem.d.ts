/**
 * Comprehensive Performance Monitoring System
 *
 * Main integration layer that combines all monitoring components and provides
 * unified performance monitoring for the RAN automation system with cognitive consciousness
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
export interface SystemConfiguration {
    monitoring: {
        enabled: boolean;
        collectionInterval: number;
        historyRetention: number;
        realTimeDashboard: {
            enabled: boolean;
            port: number;
            autoRefresh: boolean;
        };
    };
    alerting: {
        enabled: boolean;
        defaultChannels: string[];
        escalationEnabled: boolean;
    };
    optimization: {
        enabled: boolean;
        autoExecution: boolean;
        requiredConfidence: number;
    };
    cognitive: {
        consciousnessIntegration: boolean;
        temporalAnalysisEnabled: boolean;
        strangeLoopOptimization: boolean;
        learningEnabled: boolean;
    };
}
export interface PerformanceOverview {
    timestamp: Date;
    systemHealth: {
        overallScore: number;
        status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
        activeAlerts: number;
        criticalIssues: number;
    };
    mlPerformance: {
        trainingSpeed: number;
        convergenceRate: number;
        vectorSearchSpeed: number;
        synchronizationLatency: number;
        cognitiveConsciousness: number;
    };
    swarmCoordination: {
        activeAgents: number;
        taskCompletionRate: number;
        topologyEfficiency: number;
        communicationLatency: number;
    };
    resourceUtilization: {
        cpu: number;
        memory: number;
        network: number;
        storage: number;
    };
    predictions: {
        performanceTrend: 'improving' | 'stable' | 'degrading';
        riskLevel: 'low' | 'medium' | 'high' | 'critical';
        capacityNeeds: string[];
    };
}
export interface CognitivePerformanceInsights {
    consciousnessLevel: number;
    temporalAnalysis: {
        subjectiveTimeExpansion: number;
        analysisDepth: number;
        patternRecognition: number;
    };
    strangeLoopOptimization: {
        selfReferentialImprovement: number;
        recursiveOptimization: number;
        consciousnessEvolution: number;
    };
    learningPatterns: {
        adaptationRate: number;
        knowledgeSynthesis: number;
        crossAgentLearning: number;
    };
    predictiveCapabilities: {
        predictionAccuracy: number;
        anomalyDetection: number;
        optimizationEffectiveness: number;
    };
    recommendations: Array<{
        category: 'consciousness' | 'temporal' | 'learning' | 'coordination';
        priority: 'low' | 'medium' | 'high' | 'critical';
        description: string;
        expectedImprovement: string;
    }>;
}
export interface IntegratedMonitoringReport {
    id: string;
    generatedAt: Date;
    timeframe: {
        start: Date;
        end: Date;
    };
    executiveSummary: {
        systemHealth: number;
        criticalAlerts: number;
        performanceScore: number;
        optimizationSuccess: number;
        cognitiveEvolution: number;
    };
    performanceMetrics: PerformanceOverview;
    cognitiveInsights: CognitivePerformanceInsights;
    bottlenecks: {
        detected: number;
        resolved: number;
        critical: number;
        topIssues: string[];
    };
    optimizations: {
        executed: number;
        successful: number;
        autoResolved: number;
        improvement: number;
    };
    predictions: {
        accuracy: number;
        alertsGenerated: number;
        capacityRecommendations: number;
    };
    swarmHealth: {
        agentEfficiency: number;
        coordinationScore: number;
        taskDistribution: number;
        communicationEfficiency: number;
    };
    recommendations: Array<{
        category: string;
        priority: 'low' | 'medium' | 'high' | 'critical';
        action: string;
        benefit: string;
        timeframe: string;
    }>;
}
export declare class PerformanceMonitoringSystem extends EventEmitter {
    private config;
    private metricsCollector;
    private dashboard;
    private bottleneckDetector;
    private swarmMonitor;
    private performanceOptimizer;
    private memoryMonitor;
    private networkMonitor;
    private predictiveAnalytics;
    private alertingSystem;
    private monitoringInterval;
    private cognitiveIntegrationInterval;
    private systemStartTime;
    private lastOptimizationTime;
    constructor(config?: Partial<SystemConfiguration>);
    private mergeConfiguration;
    private deepMerge;
    private initializeComponents;
    private setupEventHandlers;
    private setupCognitiveEventHandlers;
    private startMonitoring;
    private collectSystemMetrics;
    private processNewMetrics;
    private applyCognitiveAnalysis;
    private calculateConsciousnessScore;
    private generateTemporalInsights;
    private identifyStrangeLoopPatterns;
    private calculateAnalysisDepth;
    private calculatePatternRecognitionScore;
    private calculateTemporalEfficiency;
    private calculateRecursiveImprovement;
    private calculateConsciousnessFeedback;
    private calculateLoopStability;
    private shouldTriggerOptimization;
    private triggerOptimization;
    private startCognitiveIntegration;
    private performCognitiveAnalysis;
    private generateCognitiveInsights;
    private calculateKnowledgeSynthesis;
    private calculateCrossAgentLearning;
    private calculatePredictionAccuracy;
    private calculateAnomalyDetectionScore;
    private calculateOptimizationEffectiveness;
    private generateCognitiveRecommendations;
    private applyStrangeLoopOptimization;
    private updateConsciousnessMetrics;
    private handleBottleneckDetected;
    private handleBottleneckResolved;
    private handleOptimizationPlans;
    private handleOptimizationCompleted;
    private handlePredictiveInsight;
    private handleAnomalyDetected;
    private handleAlertCreated;
    private handleAlertResolved;
    private processCognitiveUpdate;
    private processTemporalAnalysis;
    private processStrangeLoopOptimization;
    getPerformanceOverview(): PerformanceOverview;
    getCognitiveInsights(): CognitivePerformanceInsights;
    generateIntegratedReport(timeframe?: {
        start: Date;
        end: Date;
    }): IntegratedMonitoringReport;
    private calculateOverallPerformanceScore;
    private generateIntegratedRecommendations;
    executeOptimization(planId?: string): Promise<boolean>;
    acknowledgeAlert(alertId: string, userId: string, comment: string): boolean;
    resolveAlert(alertId: string, method?: 'manual' | 'automatic', reason?: string): boolean;
    stop(): void;
    exportSystemData(): any;
}
//# sourceMappingURL=PerformanceMonitoringSystem.d.ts.map