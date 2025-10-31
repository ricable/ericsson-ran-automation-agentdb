"use strict";
/**
 * Stream-Chain Core Infrastructure for Multi-Agent ML Workflows
 * Phase 2: Reinforcement Learning and Causal Inference Coordination
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamReduce = exports.StreamFlatMap = exports.StreamFilter = exports.StreamMap = exports.StreamPipelineBuilder = exports.StreamChain = exports.StepType = exports.StreamStatus = exports.StreamType = void 0;
const events_1 = require("events");
var StreamType;
(function (StreamType) {
    StreamType["ML_TRAINING"] = "ml_training";
    StreamType["CAUSAL_INFERENCE"] = "causal_inference";
    StreamType["MULTI_AGENT"] = "multi_agent";
    StreamType["REAL_TIME_OPTIMIZATION"] = "real_time_optimization";
    StreamType["MEMORY_COORDINATION"] = "memory_coordination";
    StreamType["PERFORMANCE_MONITORING"] = "performance_monitoring";
})(StreamType || (exports.StreamType = StreamType = {}));
var StreamStatus;
(function (StreamStatus) {
    StreamStatus["INITIALIZING"] = "initializing";
    StreamStatus["RUNNING"] = "running";
    StreamStatus["PAUSED"] = "paused";
    StreamStatus["STOPPED"] = "stopped";
    StreamStatus["ERROR"] = "error";
})(StreamStatus || (exports.StreamStatus = StreamStatus = {}));
var StepType;
(function (StepType) {
    StepType["TRANSFORM"] = "transform";
    StepType["FILTER"] = "filter";
    StepType["AGGREGATE"] = "aggregate";
    StepType["VALIDATE"] = "validate";
    StepType["STORE"] = "store";
    StepType["DISTRIBUTE"] = "distribute";
    StepType["MONITOR"] = "monitor";
})(StepType || (exports.StepType = StepType = {}));
// Main Stream-Chain Builder
class StreamChain {
    constructor(agentDB, temporalCore) {
        this.pipelines = new Map();
        this.steps = new Map(); // pipelineId -> stepId -> step
        this.agentDB = agentDB;
        this.temporalCore = temporalCore;
        this.eventBus = new events_1.EventEmitter();
        this.setupEventHandlers();
    }
    static getInstance(agentDB, temporalCore) {
        if (!StreamChain.instance) {
            StreamChain.instance = new StreamChain(agentDB, temporalCore);
        }
        return StreamChain.instance;
    }
    // Builder Pattern for Pipeline Construction
    static builder() {
        return new StreamPipelineBuilder();
    }
    // Sequential Pipeline Creation
    static sequential(...processors) {
        const builder = new StreamPipelineBuilder();
        processors.forEach((processor, index) => {
            builder.addStep(`step-${index}`, processor);
        });
        return builder.build();
    }
    // Parallel Pipeline Creation
    static parallel(pipelines) {
        const builder = new StreamPipelineBuilder();
        builder.setType(StreamType.MULTI_AGENT);
        pipelines.forEach((pipeline, index) => {
            builder.addSubPipeline(`parallel-${index}`, pipeline);
        });
        return builder.build();
    }
    // Pipeline Management
    async createPipeline(config) {
        const pipeline = {
            id: config.id || this.generateId(),
            name: config.name,
            type: config.type,
            status: StreamStatus.INITIALIZING,
            throughput: 0,
            latency: 0,
            errorRate: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.pipelines.set(pipeline.id, pipeline);
        this.steps.set(pipeline.id, new Map());
        // Initialize steps
        for (const stepConfig of config.steps) {
            await this.addStep(pipeline.id, stepConfig);
        }
        this.eventBus.emit('pipeline:created', pipeline);
        return pipeline;
    }
    async addStep(pipelineId, stepConfig) {
        const step = {
            id: stepConfig.id || this.generateId(),
            name: stepConfig.name,
            type: stepConfig.type,
            processor: stepConfig.processor,
            dependencies: stepConfig.dependencies || [],
            parallelism: stepConfig.parallelism || 1,
            retryPolicy: stepConfig.retryPolicy || this.getDefaultRetryPolicy(),
            performance: {
                avgProcessingTime: 0,
                throughput: 0,
                errorRate: 0,
                lastProcessed: new Date(),
                totalProcessed: 0
            }
        };
        const pipelineSteps = this.steps.get(pipelineId);
        if (pipelineSteps) {
            pipelineSteps.set(step.id, step);
            await step.processor.initialize?.(stepConfig.config);
            this.eventBus.emit('step:added', { pipelineId, step });
        }
        return step;
    }
    async executePipeline(pipelineId, inputData) {
        const pipeline = this.pipelines.get(pipelineId);
        if (!pipeline) {
            throw new Error(`Pipeline ${pipelineId} not found`);
        }
        const steps = this.steps.get(pipelineId);
        if (!steps || steps.size === 0) {
            throw new Error(`No steps found for pipeline ${pipelineId}`);
        }
        pipeline.status = StreamStatus.RUNNING;
        pipeline.updatedAt = new Date();
        try {
            const context = {
                pipelineId,
                stepId: '',
                agentId: this.getCurrentAgentId(),
                timestamp: new Date(),
                correlationId: this.generateCorrelationId(),
                metadata: new Map(),
                memory: this.agentDB,
                temporal: this.temporalCore
            };
            const result = await this.executeStepsSequentially(Array.from(steps.values()), inputData, context);
            pipeline.status = StreamStatus.RUNNING;
            this.eventBus.emit('pipeline:completed', { pipelineId, result });
            return result;
        }
        catch (error) {
            pipeline.status = StreamStatus.ERROR;
            pipeline.errorRate = Math.min(pipeline.errorRate + 0.01, 1.0);
            this.eventBus.emit('pipeline:error', { pipelineId, error });
            throw error;
        }
    }
    async executeStepsSequentially(steps, data, context) {
        let currentData = data;
        for (const step of steps) {
            if (!this.canExecuteStep(step, context)) {
                continue;
            }
            const startTime = Date.now();
            context.stepId = step.id;
            try {
                currentData = await this.executeStepWithRetry(step, currentData, context);
                // Update step performance
                const processingTime = Date.now() - startTime;
                this.updateStepPerformance(step, processingTime, true);
                // Store intermediate results in AgentDB
                await this.storeIntermediateResult(step, currentData, context);
            }
            catch (error) {
                const processingTime = Date.now() - startTime;
                this.updateStepPerformance(step, processingTime, false);
                throw error;
            }
        }
        return currentData;
    }
    async executeStepWithRetry(step, data, context) {
        let lastError = null;
        for (let attempt = 1; attempt <= step.retryPolicy.maxAttempts; attempt++) {
            try {
                return await step.processor.process(data, context);
            }
            catch (error) {
                lastError = error;
                if (!this.isRetryableError(error, step.retryPolicy)) {
                    throw error;
                }
                if (attempt < step.retryPolicy.maxAttempts) {
                    const backoff = Math.min(step.retryPolicy.backoffMs * Math.pow(2, attempt - 1), step.retryPolicy.maxBackoffMs);
                    await this.sleep(backoff);
                }
            }
        }
        throw lastError;
    }
    canExecuteStep(step, context) {
        // Check if all dependencies are satisfied
        // This is a simplified implementation - in practice, you'd track completion status
        return true;
    }
    async storeIntermediateResult(step, data, context) {
        try {
            const resultKey = `pipeline:${context.pipelineId}:step:${step.id}:result:${context.correlationId}`;
            await this.agentDB.store(resultKey, {
                data,
                timestamp: context.timestamp,
                agentId: context.agentId,
                processingTime: step.performance.avgProcessingTime
            });
        }
        catch (error) {
            console.warn('Failed to store intermediate result:', error);
        }
    }
    updateStepPerformance(step, processingTime, success) {
        step.performance.totalProcessed++;
        step.performance.avgProcessingTime =
            (step.performance.avgProcessingTime * (step.performance.totalProcessed - 1) + processingTime) /
                step.performance.totalProcessed;
        if (!success) {
            step.performance.errorRate =
                (step.performance.errorRate * (step.performance.totalProcessed - 1) + 1) /
                    step.performance.totalProcessed;
        }
        else {
            step.performance.errorRate =
                (step.performance.errorRate * (step.performance.totalProcessed - 1)) /
                    step.performance.totalProcessed;
        }
        step.performance.lastProcessed = new Date();
        step.performance.throughput = 1000 / processingTime; // items per second
    }
    isRetryableError(error, retryPolicy) {
        return retryPolicy.retryableErrors.some(errorType => error.name.includes(errorType) || error.message.includes(errorType));
    }
    setupEventHandlers() {
        this.eventBus.on('pipeline:created', (pipeline) => {
            console.log(`Pipeline created: ${pipeline.name} (${pipeline.id})`);
        });
        this.eventBus.on('step:added', ({ pipelineId, step }) => {
            console.log(`Step added to pipeline ${pipelineId}: ${step.name}`);
        });
        this.eventBus.on('pipeline:completed', ({ pipelineId, result }) => {
            console.log(`Pipeline completed: ${pipelineId}`);
        });
        this.eventBus.on('pipeline:error', ({ pipelineId, error }) => {
            console.error(`Pipeline error: ${pipelineId}`, error);
        });
    }
    // Utility Methods
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
    generateCorrelationId() {
        return `corr_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    }
    getCurrentAgentId() {
        return 'agent_' + process.env.AGENT_ID || 'unknown';
    }
    getDefaultRetryPolicy() {
        return {
            maxAttempts: 3,
            backoffMs: 1000,
            maxBackoffMs: 10000,
            retryableErrors: ['NetworkError', 'TimeoutError', 'TemporaryError']
        };
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    // Pipeline Monitoring and Management
    getPipeline(pipelineId) {
        return this.pipelines.get(pipelineId);
    }
    getAllPipelines() {
        return Array.from(this.pipelines.values());
    }
    getPipelineSteps(pipelineId) {
        const steps = this.steps.get(pipelineId);
        return steps ? Array.from(steps.values()) : [];
    }
    async pausePipeline(pipelineId) {
        const pipeline = this.pipelines.get(pipelineId);
        if (pipeline) {
            pipeline.status = StreamStatus.PAUSED;
            pipeline.updatedAt = new Date();
            this.eventBus.emit('pipeline:paused', { pipelineId });
        }
    }
    async resumePipeline(pipelineId) {
        const pipeline = this.pipelines.get(pipelineId);
        if (pipeline) {
            pipeline.status = StreamStatus.RUNNING;
            pipeline.updatedAt = new Date();
            this.eventBus.emit('pipeline:resumed', { pipelineId });
        }
    }
    async stopPipeline(pipelineId) {
        const pipeline = this.pipelines.get(pipelineId);
        if (pipeline) {
            pipeline.status = StreamStatus.STOPPED;
            pipeline.updatedAt = new Date();
            this.eventBus.emit('pipeline:stopped', { pipelineId });
        }
    }
    // Performance Analytics
    getPipelinePerformance(pipelineId) {
        const pipeline = this.pipelines.get(pipelineId);
        const steps = this.steps.get(pipelineId);
        if (!pipeline || !steps) {
            return undefined;
        }
        const stepPerformances = Array.from(steps.values()).map(step => step.performance);
        const avgStepLatency = stepPerformances.reduce((sum, perf) => sum + perf.avgProcessingTime, 0) / stepPerformances.length;
        const totalThroughput = stepPerformances.reduce((sum, perf) => sum + perf.throughput, 0);
        const avgErrorRate = stepPerformances.reduce((sum, perf) => sum + perf.errorRate, 0) / stepPerformances.length;
        return {
            pipelineId,
            pipelineName: pipeline.name,
            status: pipeline.status,
            totalSteps: steps.size,
            avgStepLatency,
            totalThroughput,
            avgErrorRate,
            lastUpdated: pipeline.updatedAt
        };
    }
}
exports.StreamChain = StreamChain;
// Pipeline Builder
class StreamPipelineBuilder {
    constructor() {
        this.config = {};
        this.stepConfigs = [];
    }
    setId(id) {
        this.config.id = id;
        return this;
    }
    setName(name) {
        this.config.name = name;
        return this;
    }
    setType(type) {
        this.config.type = type;
        return this;
    }
    addStep(id, processor, type) {
        this.stepConfigs.push({
            id,
            name: id,
            type: type || StepType.TRANSFORM,
            processor
        });
        return this;
    }
    addSubPipeline(id, pipeline) {
        // Convert pipeline to sub-pipeline processor
        const processor = {
            process: async (data, context) => {
                return await StreamChain.getInstance(context.memory, context.temporal)
                    .executePipeline(pipeline.id, data);
            }
        };
        this.stepConfigs.push({
            id,
            name: id,
            type: StepType.DISTRIBUTE,
            processor
        });
        return this;
    }
    build() {
        if (!this.config.name || !this.config.type) {
            throw new Error('Pipeline name and type are required');
        }
        const finalConfig = {
            ...this.config,
            steps: this.stepConfigs
        };
        // Return a placeholder pipeline - actual creation happens via StreamChain.createPipeline
        return {
            id: this.config.id || '',
            name: finalConfig.name,
            type: finalConfig.type,
            status: StreamStatus.INITIALIZING,
            throughput: 0,
            latency: 0,
            errorRate: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        };
    }
}
exports.StreamPipelineBuilder = StreamPipelineBuilder;
// Stream Transform Utilities
class StreamMap {
    static transform(mapper) {
        return {
            process: async (data, context) => {
                if (!Array.isArray(data)) {
                    return await mapper(data, context);
                }
                const results = await Promise.all(data.map(item => mapper(item, context)));
                return results;
            }
        };
    }
}
exports.StreamMap = StreamMap;
class StreamFilter {
    static filter(predicate) {
        return {
            process: async (data, context) => {
                if (!Array.isArray(data)) {
                    return (await predicate(data, context)) ? [data] : [];
                }
                const results = await Promise.all(data.map(async (item) => ({
                    item,
                    keep: await predicate(item, context)
                })));
                return results.filter(result => result.keep).map(result => result.item);
            }
        };
    }
}
exports.StreamFilter = StreamFilter;
class StreamFlatMap {
    static flatMap(mapper) {
        return {
            process: async (data, context) => {
                if (!Array.isArray(data)) {
                    return await mapper(data, context);
                }
                const results = await Promise.all(data.map(item => mapper(item, context)));
                return results.flat();
            }
        };
    }
}
exports.StreamFlatMap = StreamFlatMap;
class StreamReduce {
    static reduce(reducer, initialValue) {
        return {
            process: async (data, context) => {
                if (!Array.isArray(data)) {
                    return await reducer(initialValue, data, context);
                }
                let accumulator = initialValue;
                for (const item of data) {
                    accumulator = await reducer(accumulator, item, context);
                }
                return accumulator;
            }
        };
    }
}
exports.StreamReduce = StreamReduce;
exports.default = StreamChain;
//# sourceMappingURL=stream-chain-core.js.map