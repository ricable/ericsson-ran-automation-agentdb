/**
 * Stream-Chain Core Infrastructure for Multi-Agent ML Workflows
 * Phase 2: Reinforcement Learning and Causal Inference Coordination
 */
import { AgentDB } from '../agentdb/agentdb-core';
import { TemporalReasoningCore } from '../temporal/temporal-core';
export interface StreamPipeline {
    id: string;
    name: string;
    type: StreamType;
    status: StreamStatus;
    throughput: number;
    latency: number;
    errorRate: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare enum StreamType {
    ML_TRAINING = "ml_training",
    CAUSAL_INFERENCE = "causal_inference",
    MULTI_AGENT = "multi_agent",
    REAL_TIME_OPTIMIZATION = "real_time_optimization",
    MEMORY_COORDINATION = "memory_coordination",
    PERFORMANCE_MONITORING = "performance_monitoring"
}
export declare enum StreamStatus {
    INITIALIZING = "initializing",
    RUNNING = "running",
    PAUSED = "paused",
    STOPPED = "stopped",
    ERROR = "error"
}
export interface StreamStep {
    id: string;
    name: string;
    type: StepType;
    processor: StreamProcessor;
    dependencies: string[];
    parallelism: number;
    retryPolicy: RetryPolicy;
    performance: StepPerformance;
}
export declare enum StepType {
    TRANSFORM = "transform",
    FILTER = "filter",
    AGGREGATE = "aggregate",
    VALIDATE = "validate",
    STORE = "store",
    DISTRIBUTE = "distribute",
    MONITOR = "monitor"
}
export interface StreamProcessor {
    process(data: any, context: StreamContext): Promise<any>;
    initialize?(config: any): Promise<void>;
    cleanup?(): Promise<void>;
    healthCheck?(): Promise<boolean>;
}
export interface StreamContext {
    pipelineId: string;
    stepId: string;
    agentId: string;
    timestamp: Date;
    correlationId: string;
    metadata: Map<string, any>;
    memory: AgentDB;
    temporal: TemporalReasoningCore;
}
export interface RetryPolicy {
    maxAttempts: number;
    backoffMs: number;
    maxBackoffMs: number;
    retryableErrors: string[];
}
export interface StepPerformance {
    avgProcessingTime: number;
    throughput: number;
    errorRate: number;
    lastProcessed: Date;
    totalProcessed: number;
}
export declare class StreamChain {
    private static instance;
    private pipelines;
    private steps;
    private eventBus;
    private agentDB;
    private temporalCore;
    constructor(agentDB: AgentDB, temporalCore: TemporalReasoningCore);
    static getInstance(agentDB: AgentDB, temporalCore: TemporalReasoningCore): StreamChain;
    static builder(): StreamPipelineBuilder;
    static sequential(...processors: StreamProcessor[]): StreamPipeline;
    static parallel(pipelines: StreamPipeline[]): StreamPipeline;
    createPipeline(config: PipelineConfig): Promise<StreamPipeline>;
    addStep(pipelineId: string, stepConfig: StepConfig): Promise<StreamStep>;
    executePipeline(pipelineId: string, inputData: any): Promise<any>;
    private executeStepsSequentially;
    private executeStepWithRetry;
    private canExecuteStep;
    private storeIntermediateResult;
    private updateStepPerformance;
    private isRetryableError;
    private setupEventHandlers;
    private generateId;
    private generateCorrelationId;
    private getCurrentAgentId;
    private getDefaultRetryPolicy;
    private sleep;
    getPipeline(pipelineId: string): StreamPipeline | undefined;
    getAllPipelines(): StreamPipeline[];
    getPipelineSteps(pipelineId: string): StreamStep[];
    pausePipeline(pipelineId: string): Promise<void>;
    resumePipeline(pipelineId: string): Promise<void>;
    stopPipeline(pipelineId: string): Promise<void>;
    getPipelinePerformance(pipelineId: string): PipelinePerformance | undefined;
}
export interface PipelineConfig {
    id?: string;
    name: string;
    type: StreamType;
    steps: StepConfig[];
}
export interface StepConfig {
    id?: string;
    name: string;
    type: StepType;
    processor: StreamProcessor;
    dependencies?: string[];
    parallelism?: number;
    retryPolicy?: RetryPolicy;
    config?: any;
}
export interface PipelinePerformance {
    pipelineId: string;
    pipelineName: string;
    status: StreamStatus;
    totalSteps: number;
    avgStepLatency: number;
    totalThroughput: number;
    avgErrorRate: number;
    lastUpdated: Date;
}
export declare class StreamPipelineBuilder {
    private config;
    private stepConfigs;
    setId(id: string): StreamPipelineBuilder;
    setName(name: string): StreamPipelineBuilder;
    setType(type: StreamType): StreamPipelineBuilder;
    addStep(id: string, processor: StreamProcessor, type?: StepType): StreamPipelineBuilder;
    addSubPipeline(id: string, pipeline: StreamPipeline): StreamPipelineBuilder;
    build(): StreamPipeline;
}
export declare class StreamMap {
    static transform<T, R>(mapper: (item: T, context: StreamContext) => Promise<R>): StreamProcessor;
}
export declare class StreamFilter {
    static filter<T>(predicate: (item: T, context: StreamContext) => Promise<boolean>): StreamProcessor;
}
export declare class StreamFlatMap {
    static flatMap<T, R>(mapper: (item: T, context: StreamContext) => Promise<R[]>): StreamProcessor;
}
export declare class StreamReduce {
    static reduce<T, R>(reducer: (acc: R, item: T, context: StreamContext) => Promise<R>, initialValue: R): StreamProcessor;
}
export default StreamChain;
//# sourceMappingURL=stream-chain-core.d.ts.map