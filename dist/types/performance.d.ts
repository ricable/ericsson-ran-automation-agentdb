/**
 * Cognitive RAN Performance Monitoring Types
 * Defines comprehensive performance metrics and monitoring interfaces
 */
export interface SWEbenchMetrics {
    solveRate: number;
    speedImprovement: number;
    tokenReduction: number;
    benchmarkScore: number;
    timestamp: Date;
}
export interface CognitiveMetrics {
    consciousnessLevel: number;
    temporalExpansionFactor: number;
    strangeLoopEffectiveness: number;
    autonomousHealingRate: number;
    learningVelocity: number;
    timestamp: Date;
}
export interface SystemMetrics {
    cpu: {
        utilization: number;
        loadAverage: number[];
        cores: number;
    };
    memory: {
        used: number;
        total: number;
        percentage: number;
        heapUsed: number;
        heapTotal: number;
    };
    network: {
        latency: number;
        throughput: number;
        packetLoss: number;
        quicSyncLatency: number;
    };
    disk: {
        readSpeed: number;
        writeSpeed: number;
        usage: number;
    };
    timestamp: Date;
}
export interface AgentMetrics {
    agentId: string;
    agentType: string;
    status: 'active' | 'idle' | 'busy' | 'error';
    taskCompletionRate: number;
    averageTaskTime: number;
    cognitiveLoad: number;
    memoryUsage: number;
    coordinationOverhead: number;
    learningEfficiency: number;
    swarmPosition: {
        hierarchy: number;
        connections: number;
        influence: number;
    };
    timestamp: Date;
}
export interface Bottleneck {
    id: string;
    type: 'execution_time' | 'resource_constraint' | 'coordination_overhead' | 'sequential_blocker' | 'data_transfer' | 'communication_delay';
    severity: 'low' | 'medium' | 'high' | 'critical';
    component: string;
    description: string;
    impact: {
        performanceLoss: number;
        affectedAgents: string[];
        estimatedFixTime: number;
    };
    rootCause: {
        primary: string;
        contributing: string[];
    };
    recommendation: {
        action: string;
        priority: 'low' | 'medium' | 'high' | 'critical';
        expectedImprovement: number;
        effort: 'low' | 'medium' | 'high';
    };
    detectedAt: Date;
    status: 'active' | 'investigating' | 'resolved';
}
export interface PerformanceAnomaly {
    id: string;
    type: 'regression' | 'degradation' | 'spike' | 'outage' | 'threshold_breach';
    metric: string;
    baseline: number;
    currentValue: number;
    deviationPercent: number;
    confidence: number;
    causalFactors: string[];
    affectedComponents: string[];
    timestamp: Date;
    status: 'active' | 'investigating' | 'resolved';
}
export interface AlertRule {
    id: string;
    name: string;
    metric: string;
    condition: 'greater_than' | 'less_than' | 'equals' | 'not_equals' | 'trend';
    threshold: number;
    duration: number;
    severity: 'info' | 'warning' | 'error' | 'critical';
    enabled: boolean;
    channels: NotificationChannel[];
    cooldown: number;
}
export interface NotificationChannel {
    type: 'email' | 'slack' | 'webhook' | 'dashboard' | 'log';
    config: Record<string, any>;
    enabled: boolean;
}
export interface PerformanceReport {
    id: string;
    type: 'executive' | 'technical' | 'trend' | 'incident';
    period: {
        start: Date;
        end: Date;
    };
    summary: {
        overallScore: number;
        keyMetrics: Record<string, number>;
        achievements: string[];
        concerns: string[];
    };
    sections: ReportSection[];
    recommendations: Recommendation[];
    generatedAt: Date;
}
export interface ReportSection {
    title: string;
    type: 'metrics' | 'charts' | 'analysis' | 'forecasts';
    content: any;
    insights: string[];
}
export interface Recommendation {
    id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    impact: {
        performance: number;
        effort: 'low' | 'medium' | 'high';
        risk: 'low' | 'medium' | 'high';
    };
    timeline: string;
    dependencies: string[];
}
export interface DashboardWidget {
    id: string;
    type: 'metric' | 'chart' | 'table' | 'alert' | 'status';
    title: string;
    position: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
    config: {
        metrics: string[];
        refreshInterval: number;
        filters?: Record<string, any>;
        visualization?: string;
    };
    dataSource: string;
}
export interface Dashboard {
    id: string;
    name: string;
    description: string;
    widgets: DashboardWidget[];
    layout: 'grid' | 'flex';
    refreshInterval: number;
    permissions: {
        view: string[];
        edit: string[];
    };
    createdAt: Date;
    updatedAt: Date;
}
export interface AgentDBMetrics {
    vectorSearchLatency: number;
    quicSyncLatency: number;
    memoryUsage: number;
    indexSize: number;
    queryThroughput: number;
    syncSuccessRate: number;
    compressionRatio: number;
    cacheHitRate: number;
}
export interface ClaudeFlowMetrics {
    swarmCoordinationLatency: number;
    agentSpawnTime: number;
    taskOrchestrationEfficiency: number;
    memoryOperationLatency: number;
    neuralTrainingTime: number;
    patternRecognitionAccuracy: number;
}
export interface SparcMetrics {
    workflowCompletionTime: number;
    phaseTransitionEfficiency: number;
    testCoverage: number;
    codeQualityScore: number;
    deploymentFrequency: number;
    leadTime: number;
}
export interface PerformancePrediction {
    metric: string;
    currentValue: number;
    predictedValue: number;
    timeframe: string;
    confidence: number;
    factors: string[];
    recommendations: string[];
    timestamp: Date;
}
export interface HealthCheck {
    component: string;
    status: 'healthy' | 'warning' | 'critical' | 'down';
    lastCheck: Date;
    responseTime: number;
    details: Record<string, any>;
    dependencies: string[];
}
export interface SystemHealth {
    overall: 'healthy' | 'degraded' | 'critical' | 'down';
    score: number;
    checks: HealthCheck[];
    incidents: Incident[];
    lastUpdated: Date;
}
export interface Incident {
    id: string;
    title: string;
    description: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    status: 'open' | 'investigating' | 'resolved' | 'closed';
    startedAt: Date;
    resolvedAt?: Date;
    affectedComponents: string[];
    impact: string;
    resolution?: string;
}
//# sourceMappingURL=performance.d.ts.map