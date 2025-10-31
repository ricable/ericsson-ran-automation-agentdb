/**
 * Stream-Chain Integration Patterns with Parallel Processing
 * Phase 2: Advanced Pipeline Integration for Multi-Agent ML Workflows
 */
import { StreamProcessor, StreamContext } from '../stream-chain-core';
import { AgentDB } from '../../agentdb/agentdb-core';
import { TemporalReasoningCore } from '../../temporal/temporal-core';
export interface IntegrationPattern {
    id: string;
    name: string;
    type: PatternType;
    description: string;
    configuration: PatternConfiguration;
    performance: PatternPerformance;
    createdAt: Date;
    updatedAt: Date;
}
export declare enum PatternType {
    SEQUENTIAL = "sequential",
    PARALLEL = "parallel",
    PIPELINE = "pipeline",
    FAN_OUT = "fan_out",
    FAN_IN = "fan_in",
    MAP_REDUCE = "map_reduce",
    WORKFLOW = "workflow",
    EVENT_DRIVEN = "event_driven",
    STREAMING = "streaming",
    BATCH = "batch"
}
export interface PatternConfiguration {
    concurrency: number;
    timeout: number;
    retryPolicy: RetryConfiguration;
    errorHandling: ErrorHandlingConfiguration;
    loadBalancing: LoadBalancingConfiguration;
    monitoring: MonitoringConfiguration;
    optimization: OptimizationConfiguration;
}
export interface RetryConfiguration {
    maxAttempts: number;
    backoffStrategy: BackoffStrategy;
    retryableErrors: string[];
    maxDelay: number;
}
export declare enum BackoffStrategy {
    LINEAR = "linear",
    EXPONENTIAL = "exponential",
    FIXED = "fixed",
    ADAPTIVE = "adaptive"
}
export interface ErrorHandlingConfiguration {
    strategy: ErrorHandlingStrategy;
    deadLetterQueue: boolean;
    errorThreshold: number;
    circuitBreaker: CircuitBreakerConfiguration;
}
export declare enum ErrorHandlingStrategy {
    RETRY = "retry",
    FAIL_FAST = "fail_fast",
    FALLBACK = "fallback",
    CIRCUIT_BREAKER = "circuit_breaker",
    DEAD_LETTER = "dead_letter"
}
export interface CircuitBreakerConfiguration {
    enabled: boolean;
    failureThreshold: number;
    recoveryTimeout: number;
    monitoringPeriod: number;
}
export interface LoadBalancingConfiguration {
    strategy: LoadBalancingStrategy;
    affinity: boolean;
    healthChecks: boolean;
    weights: LoadBalancingWeights;
}
export declare enum LoadBalancingStrategy {
    ROUND_ROBIN = "round_robin",
    LEAST_CONNECTIONS = "least_connections",
    WEIGHTED_ROUND_ROBIN = "weighted_round_robin",
    HASH_BASED = "hash_based",
    ADAPTIVE = "adaptive"
}
export interface LoadBalancingWeights {
    cpu: number;
    memory: number;
    network: number;
    custom: {
        [key: string]: number;
    };
}
export interface MonitoringConfiguration {
    metrics: MetricConfiguration[];
    tracing: TracingConfiguration;
    logging: LoggingConfiguration;
    alerting: AlertingConfiguration;
}
export interface MetricConfiguration {
    name: string;
    type: MetricType;
    aggregation: AggregationType;
    labels: {
        [key: string]: string;
    };
}
export declare enum MetricType {
    COUNTER = "counter",
    GAUGE = "gauge",
    HISTOGRAM = "histogram",
    SUMMARY = "summary"
}
export declare enum AggregationType {
    SUM = "sum",
    AVERAGE = "average",
    MIN = "min",
    MAX = "max",
    PERCENTILE = "percentile"
}
export interface TracingConfiguration {
    enabled: boolean;
    samplingRate: number;
    propagationFormat: PropagationFormat;
    includePayloads: boolean;
}
export declare enum PropagationFormat {
    TRACE_CONTEXT = "trace_context",
    B3 = "b3",
    JAEGER = "jaeger",
    ZIPKIN = "zipkin"
}
export interface LoggingConfiguration {
    level: LogLevel;
    format: LogFormat;
    structured: boolean;
    correlation: boolean;
}
export declare enum LogLevel {
    TRACE = "trace",
    DEBUG = "debug",
    INFO = "info",
    WARN = "warn",
    ERROR = "error",
    FATAL = "fatal"
}
export declare enum LogFormat {
    JSON = "json",
    TEXT = "text",
    STRUCTURED = "structured"
}
export interface AlertingConfiguration {
    enabled: boolean;
    channels: AlertChannel[];
    rules: AlertRule[];
    escalation: EscalationPolicy;
}
export interface AlertChannel {
    type: ChannelType;
    configuration: ChannelConfiguration;
    enabled: boolean;
}
export declare enum ChannelType {
    EMAIL = "email",
    SLACK = "slack",
    WEBHOOK = "webhook",
    SMS = "sms",
    PAGER_DUTY = "pager_duty"
}
export interface ChannelConfiguration {
    [key: string]: any;
}
export interface AlertRule {
    name: string;
    condition: string;
    threshold: number;
    duration: number;
    severity: AlertSeverity;
    enabled: boolean;
}
export declare enum AlertSeverity {
    INFO = "info",
    WARNING = "warning",
    ERROR = "error",
    CRITICAL = "critical"
}
export interface EscalationPolicy {
    enabled: boolean;
    levels: EscalationLevel[];
    timeout: number;
}
export interface EscalationLevel {
    level: number;
    timeout: number;
    channels: string[];
    autoResolve: boolean;
}
export interface OptimizationConfiguration {
    autoScaling: boolean;
    loadPrediction: boolean;
    resourceOptimization: boolean;
    performanceTuning: boolean;
    adaptiveRouting: boolean;
}
export interface PatternPerformance {
    throughput: number;
    latency: number;
    errorRate: number;
    resourceUtilization: ResourceUtilization;
    efficiency: number;
    reliability: number;
    scalability: number;
}
export interface ResourceUtilization {
    cpu: number;
    memory: number;
    network: number;
    storage: number;
    custom: {
        [key: string]: number;
    };
}
export declare class StreamChainIntegrationPatterns {
    private streamChain;
    private agentDB;
    private temporalCore;
    private patternRegistry;
    private activeExecutions;
    constructor(agentDB: AgentDB, temporalCore: TemporalReasoningCore);
    createSequentialPattern(name: string, processors: StreamProcessor[], config?: Partial<PatternConfiguration>): Promise<IntegrationPattern>;
    createParallelPattern(name: string, processorGroups: StreamProcessor[][], config?: Partial<PatternConfiguration>): Promise<IntegrationPattern>;
    createPipelinePattern(name: string, stages: PipelineStage[], config?: Partial<PatternConfiguration>): Promise<IntegrationPattern>;
    createFanOutPattern(name: string, sourceProcessor: StreamProcessor, fanOutProcessors: StreamProcessor[], config?: Partial<PatternConfiguration>): Promise<IntegrationPattern>;
    createFanInPattern(name: string, sourceProcessors: StreamProcessor[], aggregatorProcessor: StreamProcessor, config?: Partial<PatternConfiguration>): Promise<IntegrationPattern>;
    createMapReducePattern(name: string, mapProcessor: StreamProcessor, reduceProcessor: StreamProcessor, config?: Partial<PatternConfiguration>): Promise<IntegrationPattern>;
    createWorkflowPattern(name: string, workflow: WorkflowDefinition, config?: Partial<PatternConfiguration>): Promise<IntegrationPattern>;
    createEventDrivenPattern(name: string, eventHandlers: EventHandler[], config?: Partial<PatternConfiguration>): Promise<IntegrationPattern>;
    createStreamingPattern(name: string, streamProcessors: StreamProcessor[], config?: Partial<PatternConfiguration>): Promise<IntegrationPattern>;
    createBatchPattern(name: string, batchProcessor: StreamProcessor, config?: Partial<PatternConfiguration>): Promise<IntegrationPattern>;
    executePattern(patternId: string, data: any, options?: ExecutionOptions): Promise<PatternExecutionResult>;
    private executeSequentialPattern;
    private executeParallelPattern;
    private executePipelinePattern;
    private executeFanOutPattern;
    private executeFanInPattern;
    private executeMapReducePattern;
    private executeWorkflowPattern;
    private executeEventDrivenPattern;
    private executeStreamingPattern;
    private executeBatchPattern;
    private generatePatternId;
    private generateExecutionId;
    private mergeConfiguration;
    private getDefaultSequentialConfig;
    private getDefaultParallelConfig;
    private getDefaultPipelineConfig;
    private getDefaultFanOutConfig;
    private getDefaultFanInConfig;
    private getDefaultMapReduceConfig;
    private getDefaultWorkflowConfig;
    private getDefaultEventDrivenConfig;
    private getDefaultStreamingConfig;
    private getDefaultBatchConfig;
    private convertProcessorsToSteps;
    private convertStagesToSteps;
    private createStepConfig;
    private topologicalSort;
    private getDependencies;
    private chunkData;
    private mergeResults;
    private createExecutionContext;
    private storeEventHandlers;
    private getEventHandlers;
    private parseEvent;
    private handlerMatchesEvent;
    private updatePatternPerformance;
    getPattern(patternId: string): IntegrationPattern | undefined;
    getAllPatterns(): IntegrationPattern[];
    getActiveExecutions(): PatternExecution[];
    deletePattern(patternId: string): Promise<void>;
    getPatternMetrics(patternId: string): Promise<PatternMetrics>;
}
export interface PipelineStage {
    name: string;
    processors: StreamProcessor[];
    parallel?: boolean;
}
export interface WorkflowNode {
    id: string;
    name: string;
    processor: StreamProcessor;
    metadata?: any;
}
export interface WorkflowEdge {
    source: string;
    target: string;
    condition?: string;
}
export interface WorkflowDefinition {
    nodes: WorkflowNode[];
    edges: WorkflowEdge[];
    metadata?: any;
}
export interface EventHandler {
    id: string;
    name: string;
    processor: StreamProcessor;
    eventTypes: string[];
    priority: number;
    enabled: boolean;
}
export interface ExecutionOptions {
    agentId?: string;
    correlationId?: string;
    metadata?: {
        [key: string]: any;
    };
    timeout?: number;
    retryPolicy?: Partial<RetryConfiguration>;
}
export interface PatternExecution {
    id: string;
    patternId: string;
    status: ExecutionStatus;
    startTime: Date;
    endTime: Date | null;
    input: any;
    output: any;
    error: Error | null;
    metrics: {
        [key: string]: any;
    };
    context: StreamContext;
}
export declare enum ExecutionStatus {
    PENDING = "pending",
    RUNNING = "running",
    COMPLETED = "completed",
    FAILED = "failed",
    CANCELLED = "cancelled"
}
export interface PatternExecutionResult {
    executionId: string;
    patternId: string;
    status: ExecutionStatus;
    startTime: Date;
    endTime: Date;
    duration: number;
    input: any;
    output: any;
    metrics: {
        [key: string]: any;
    };
    success: boolean;
    error?: string;
}
export interface Event {
    id: string;
    type: string;
    source: string;
    timestamp: Date;
    payload: any;
    metadata: {
        [key: string]: any;
    };
}
export interface PatternMetrics {
    patternId: string;
    patternName: string;
    patternType: PatternType;
    totalExecutions: number;
    successfulExecutions: number;
    failedExecutions: number;
    averageLatency: number;
    throughput: number;
    errorRate: number;
    resourceUtilization: ResourceUtilization;
    lastUpdated: Date;
}
export default StreamChainIntegrationPatterns;
//# sourceMappingURL=integration-patterns.d.ts.map