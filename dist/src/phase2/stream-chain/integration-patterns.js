"use strict";
/**
 * Stream-Chain Integration Patterns with Parallel Processing
 * Phase 2: Advanced Pipeline Integration for Multi-Agent ML Workflows
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionStatus = exports.StreamChainIntegrationPatterns = exports.AlertSeverity = exports.ChannelType = exports.LogFormat = exports.LogLevel = exports.PropagationFormat = exports.AggregationType = exports.MetricType = exports.LoadBalancingStrategy = exports.ErrorHandlingStrategy = exports.BackoffStrategy = exports.PatternType = void 0;
const stream_chain_core_1 = require("../stream-chain-core");
var PatternType;
(function (PatternType) {
    PatternType["SEQUENTIAL"] = "sequential";
    PatternType["PARALLEL"] = "parallel";
    PatternType["PIPELINE"] = "pipeline";
    PatternType["FAN_OUT"] = "fan_out";
    PatternType["FAN_IN"] = "fan_in";
    PatternType["MAP_REDUCE"] = "map_reduce";
    PatternType["WORKFLOW"] = "workflow";
    PatternType["EVENT_DRIVEN"] = "event_driven";
    PatternType["STREAMING"] = "streaming";
    PatternType["BATCH"] = "batch";
})(PatternType || (exports.PatternType = PatternType = {}));
var BackoffStrategy;
(function (BackoffStrategy) {
    BackoffStrategy["LINEAR"] = "linear";
    BackoffStrategy["EXPONENTIAL"] = "exponential";
    BackoffStrategy["FIXED"] = "fixed";
    BackoffStrategy["ADAPTIVE"] = "adaptive";
})(BackoffStrategy || (exports.BackoffStrategy = BackoffStrategy = {}));
var ErrorHandlingStrategy;
(function (ErrorHandlingStrategy) {
    ErrorHandlingStrategy["RETRY"] = "retry";
    ErrorHandlingStrategy["FAIL_FAST"] = "fail_fast";
    ErrorHandlingStrategy["FALLBACK"] = "fallback";
    ErrorHandlingStrategy["CIRCUIT_BREAKER"] = "circuit_breaker";
    ErrorHandlingStrategy["DEAD_LETTER"] = "dead_letter";
})(ErrorHandlingStrategy || (exports.ErrorHandlingStrategy = ErrorHandlingStrategy = {}));
var LoadBalancingStrategy;
(function (LoadBalancingStrategy) {
    LoadBalancingStrategy["ROUND_ROBIN"] = "round_robin";
    LoadBalancingStrategy["LEAST_CONNECTIONS"] = "least_connections";
    LoadBalancingStrategy["WEIGHTED_ROUND_ROBIN"] = "weighted_round_robin";
    LoadBalancingStrategy["HASH_BASED"] = "hash_based";
    LoadBalancingStrategy["ADAPTIVE"] = "adaptive";
})(LoadBalancingStrategy || (exports.LoadBalancingStrategy = LoadBalancingStrategy = {}));
var MetricType;
(function (MetricType) {
    MetricType["COUNTER"] = "counter";
    MetricType["GAUGE"] = "gauge";
    MetricType["HISTOGRAM"] = "histogram";
    MetricType["SUMMARY"] = "summary";
})(MetricType || (exports.MetricType = MetricType = {}));
var AggregationType;
(function (AggregationType) {
    AggregationType["SUM"] = "sum";
    AggregationType["AVERAGE"] = "average";
    AggregationType["MIN"] = "min";
    AggregationType["MAX"] = "max";
    AggregationType["PERCENTILE"] = "percentile";
})(AggregationType || (exports.AggregationType = AggregationType = {}));
var PropagationFormat;
(function (PropagationFormat) {
    PropagationFormat["TRACE_CONTEXT"] = "trace_context";
    PropagationFormat["B3"] = "b3";
    PropagationFormat["JAEGER"] = "jaeger";
    PropagationFormat["ZIPKIN"] = "zipkin";
})(PropagationFormat || (exports.PropagationFormat = PropagationFormat = {}));
var LogLevel;
(function (LogLevel) {
    LogLevel["TRACE"] = "trace";
    LogLevel["DEBUG"] = "debug";
    LogLevel["INFO"] = "info";
    LogLevel["WARN"] = "warn";
    LogLevel["ERROR"] = "error";
    LogLevel["FATAL"] = "fatal";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
var LogFormat;
(function (LogFormat) {
    LogFormat["JSON"] = "json";
    LogFormat["TEXT"] = "text";
    LogFormat["STRUCTURED"] = "structured";
})(LogFormat || (exports.LogFormat = LogFormat = {}));
var ChannelType;
(function (ChannelType) {
    ChannelType["EMAIL"] = "email";
    ChannelType["SLACK"] = "slack";
    ChannelType["WEBHOOK"] = "webhook";
    ChannelType["SMS"] = "sms";
    ChannelType["PAGER_DUTY"] = "pager_duty";
})(ChannelType || (exports.ChannelType = ChannelType = {}));
var AlertSeverity;
(function (AlertSeverity) {
    AlertSeverity["INFO"] = "info";
    AlertSeverity["WARNING"] = "warning";
    AlertSeverity["ERROR"] = "error";
    AlertSeverity["CRITICAL"] = "critical";
})(AlertSeverity || (exports.AlertSeverity = AlertSeverity = {}));
// Integration Pattern Implementation
class StreamChainIntegrationPatterns {
    constructor(agentDB, temporalCore) {
        this.streamChain = stream_chain_core_1.StreamChain.getInstance(agentDB, temporalCore);
        this.agentDB = agentDB;
        this.temporalCore = temporalCore;
        this.patternRegistry = new Map();
        this.activeExecutions = new Map();
    }
    // Sequential Pattern
    async createSequentialPattern(name, processors, config) {
        const pattern = {
            id: this.generatePatternId(),
            name,
            type: PatternType.SEQUENTIAL,
            description: `Sequential execution of ${processors.length} processors`,
            configuration: this.mergeConfiguration(this.getDefaultSequentialConfig(), config),
            performance: {
                throughput: 0,
                latency: 0,
                errorRate: 0,
                resourceUtilization: { cpu: 0, memory: 0, network: 0, storage: 0, custom: {} },
                efficiency: 0,
                reliability: 0,
                scalability: 0
            },
            createdAt: new Date(),
            updatedAt: new Date()
        };
        // Create sequential pipeline using StreamChain
        const pipeline = stream_chain_core_1.StreamChain.sequential(...processors);
        await this.streamChain.createPipeline({
            id: pattern.id,
            name: pattern.name,
            type: stream_chain_core_1.StreamType.MULTI_AGENT,
            steps: this.convertProcessorsToSteps(processors)
        });
        this.patternRegistry.set(pattern.id, pattern);
        return pattern;
    }
    // Parallel Pattern
    async createParallelPattern(name, processorGroups, config) {
        const pattern = {
            id: this.generatePatternId(),
            name,
            type: PatternType.PARALLEL,
            description: `Parallel execution of ${processorGroups.length} processor groups`,
            configuration: this.mergeConfiguration(this.getDefaultParallelConfig(), config),
            performance: {
                throughput: 0,
                latency: 0,
                errorRate: 0,
                resourceUtilization: { cpu: 0, memory: 0, network: 0, storage: 0, custom: {} },
                efficiency: 0,
                reliability: 0,
                scalability: 0
            },
            createdAt: new Date(),
            updatedAt: new Date()
        };
        // Create parallel pipelines for each group
        const parallelPipelines = await Promise.all(processorGroups.map(async (group, index) => {
            const pipeline = stream_chain_core_1.StreamChain.sequential(...group);
            return await this.streamChain.createPipeline({
                id: `${pattern.id}_group_${index}`,
                name: `${name} - Group ${index}`,
                type: stream_chain_core_1.StreamType.MULTI_AGENT,
                steps: this.convertProcessorsToSteps(group)
            });
        }));
        // Create master parallel pipeline
        const masterPipeline = stream_chain_core_1.StreamChain.parallel(...parallelPipelines);
        await this.streamChain.createPipeline({
            id: pattern.id,
            name: pattern.name,
            type: stream_chain_core_1.StreamType.MULTI_AGENT,
            steps: [] // Managed by parallel execution
        });
        this.patternRegistry.set(pattern.id, pattern);
        return pattern;
    }
    // Pipeline Pattern
    async createPipelinePattern(name, stages, config) {
        const pattern = {
            id: this.generatePatternId(),
            name,
            type: PatternType.PIPELINE,
            description: `Pipeline with ${stages.length} stages`,
            configuration: this.mergeConfiguration(this.getDefaultPipelineConfig(), config),
            performance: {
                throughput: 0,
                latency: 0,
                errorRate: 0,
                resourceUtilization: { cpu: 0, memory: 0, network: 0, storage: 0, custom: {} },
                efficiency: 0,
                reliability: 0,
                scalability: 0
            },
            createdAt: new Date(),
            updatedAt: new Date()
        };
        // Create pipeline with stages
        const builder = stream_chain_core_1.StreamChain.builder()
            .setName(pattern.name)
            .setType(stream_chain_core_1.StreamType.MULTI_AGENT);
        for (const stage of stages) {
            for (const processor of stage.processors) {
                builder.addStep(stage.name, processor);
            }
        }
        const pipeline = builder.build();
        await this.streamChain.createPipeline({
            id: pattern.id,
            name: pattern.name,
            type: stream_chain_core_1.StreamType.MULTI_AGENT,
            steps: this.convertStagesToSteps(stages)
        });
        this.patternRegistry.set(pattern.id, pattern);
        return pattern;
    }
    // Fan-Out Pattern
    async createFanOutPattern(name, sourceProcessor, fanOutProcessors, config) {
        const pattern = {
            id: this.generatePatternId(),
            name,
            type: PatternType.FAN_OUT,
            description: `Fan-out from 1 source to ${fanOutProcessors.length} processors`,
            configuration: this.mergeConfiguration(this.getDefaultFanOutConfig(), config),
            performance: {
                throughput: 0,
                latency: 0,
                errorRate: 0,
                resourceUtilization: { cpu: 0, memory: 0, network: 0, storage: 0, custom: {} },
                efficiency: 0,
                reliability: 0,
                scalability: 0
            },
            createdAt: new Date(),
            updatedAt: new Date()
        };
        // Create fan-out pipeline
        const steps = [
            this.createStepConfig('source', sourceProcessor),
            ...fanOutProcessors.map((processor, index) => this.createStepConfig(`fan_out_${index}`, processor, ['source']))
        ];
        await this.streamChain.createPipeline({
            id: pattern.id,
            name: pattern.name,
            type: stream_chain_core_1.StreamType.MULTI_AGENT,
            steps
        });
        this.patternRegistry.set(pattern.id, pattern);
        return pattern;
    }
    // Fan-In Pattern
    async createFanInPattern(name, sourceProcessors, aggregatorProcessor, config) {
        const pattern = {
            id: this.generatePatternId(),
            name,
            type: PatternType.FAN_IN,
            description: `Fan-in from ${sourceProcessors.length} processors to 1 aggregator`,
            configuration: this.mergeConfiguration(this.getDefaultFanInConfig(), config),
            performance: {
                throughput: 0,
                latency: 0,
                errorRate: 0,
                resourceUtilization: { cpu: 0, memory: 0, network: 0, storage: 0, custom: {} },
                efficiency: 0,
                reliability: 0,
                scalability: 0
            },
            createdAt: new Date(),
            updatedAt: new Date()
        };
        // Create fan-in pipeline
        const sourceSteps = sourceProcessors.map((processor, index) => this.createStepConfig(`source_${index}`, processor));
        const aggregatorStep = this.createStepConfig('aggregator', aggregatorProcessor, sourceSteps.map(step => step.id));
        await this.streamChain.createPipeline({
            id: pattern.id,
            name: pattern.name,
            type: stream_chain_core_1.StreamType.MULTI_AGENT,
            steps: [...sourceSteps, aggregatorStep]
        });
        this.patternRegistry.set(pattern.id, pattern);
        return pattern;
    }
    // Map-Reduce Pattern
    async createMapReducePattern(name, mapProcessor, reduceProcessor, config) {
        const pattern = {
            id: this.generatePatternId(),
            name,
            type: PatternType.MAP_REDUCE,
            description: 'Map-Reduce pattern for distributed processing',
            configuration: this.mergeConfiguration(this.getDefaultMapReduceConfig(), config),
            performance: {
                throughput: 0,
                latency: 0,
                errorRate: 0,
                resourceUtilization: { cpu: 0, memory: 0, network: 0, storage: 0, custom: {} },
                efficiency: 0,
                reliability: 0,
                scalability: 0
            },
            createdAt: new Date(),
            updatedAt: new Date()
        };
        // Create map-reduce pipeline
        const steps = [
            this.createStepConfig('map', mapProcessor),
            this.createStepConfig('reduce', reduceProcessor, ['map'])
        ];
        await this.streamChain.createPipeline({
            id: pattern.id,
            name: pattern.name,
            type: stream_chain_core_1.StreamType.MULTI_AGENT,
            steps
        });
        this.patternRegistry.set(pattern.id, pattern);
        return pattern;
    }
    // Workflow Pattern
    async createWorkflowPattern(name, workflow, config) {
        const pattern = {
            id: this.generatePatternId(),
            name,
            type: PatternType.WORKFLOW,
            description: `Workflow with ${workflow.nodes.length} nodes and ${workflow.edges.length} edges`,
            configuration: this.mergeConfiguration(this.getDefaultWorkflowConfig(), config),
            performance: {
                throughput: 0,
                latency: 0,
                errorRate: 0,
                resourceUtilization: { cpu: 0, memory: 0, network: 0, storage: 0, custom: {} },
                efficiency: 0,
                reliability: 0,
                scalability: 0
            },
            createdAt: new Date(),
            updatedAt: new Date()
        };
        // Convert workflow to DAG and create pipeline
        const sortedNodes = this.topologicalSort(workflow.nodes, workflow.edges);
        const steps = sortedNodes.map(node => this.createStepConfig(node.id, node.processor, this.getDependencies(node, workflow.edges)));
        await this.streamChain.createPipeline({
            id: pattern.id,
            name: pattern.name,
            type: stream_chain_core_1.StreamType.MULTI_AGENT,
            steps
        });
        this.patternRegistry.set(pattern.id, pattern);
        return pattern;
    }
    // Event-Driven Pattern
    async createEventDrivenPattern(name, eventHandlers, config) {
        const pattern = {
            id: this.generatePatternId(),
            name,
            type: PatternType.EVENT_DRIVEN,
            description: `Event-driven pattern with ${eventHandlers.length} handlers`,
            configuration: this.mergeConfiguration(this.getDefaultEventDrivenConfig(), config),
            performance: {
                throughput: 0,
                latency: 0,
                errorRate: 0,
                resourceUtilization: { cpu: 0, memory: 0, network: 0, storage: 0, custom: {} },
                efficiency: 0,
                reliability: 0,
                scalability: 0
            },
            createdAt: new Date(),
            updatedAt: new Date()
        };
        // Store event handlers for runtime execution
        await this.storeEventHandlers(pattern.id, eventHandlers);
        this.patternRegistry.set(pattern.id, pattern);
        return pattern;
    }
    // Streaming Pattern
    async createStreamingPattern(name, streamProcessors, config) {
        const pattern = {
            id: this.generatePatternId(),
            name,
            type: PatternType.STREAMING,
            description: `Streaming pattern with ${streamProcessors.length} processors`,
            configuration: this.mergeConfiguration(this.getDefaultStreamingConfig(), config),
            performance: {
                throughput: 0,
                latency: 0,
                errorRate: 0,
                resourceUtilization: { cpu: 0, memory: 0, network: 0, storage: 0, custom: {} },
                efficiency: 0,
                reliability: 0,
                scalability: 0
            },
            createdAt: new Date(),
            updatedAt: new Date()
        };
        // Create streaming pipeline
        const pipeline = stream_chain_core_1.StreamChain.sequential(...streamProcessors);
        await this.streamChain.createPipeline({
            id: pattern.id,
            name: pattern.name,
            type: stream_chain_core_1.StreamType.MULTI_AGENT,
            steps: this.convertProcessorsToSteps(streamProcessors)
        });
        this.patternRegistry.set(pattern.id, pattern);
        return pattern;
    }
    // Batch Pattern
    async createBatchPattern(name, batchProcessor, config) {
        const pattern = {
            id: this.generatePatternId(),
            name,
            type: PatternType.BATCH,
            description: 'Batch processing pattern',
            configuration: this.mergeConfiguration(this.getDefaultBatchConfig(), config),
            performance: {
                throughput: 0,
                latency: 0,
                errorRate: 0,
                resourceUtilization: { cpu: 0, memory: 0, network: 0, storage: 0, custom: {} },
                efficiency: 0,
                reliability: 0,
                scalability: 0
            },
            createdAt: new Date(),
            updatedAt: new Date()
        };
        // Create batch pipeline
        await this.streamChain.createPipeline({
            id: pattern.id,
            name: pattern.name,
            type: stream_chain_core_1.StreamType.MULTI_AGENT,
            steps: [this.createStepConfig('batch', batchProcessor)]
        });
        this.patternRegistry.set(pattern.id, pattern);
        return pattern;
    }
    // Pattern Execution
    async executePattern(patternId, data, options) {
        const pattern = this.patternRegistry.get(patternId);
        if (!pattern) {
            throw new Error(`Pattern ${patternId} not found`);
        }
        const executionId = this.generateExecutionId();
        const execution = {
            id: executionId,
            patternId,
            status: ExecutionStatus.RUNNING,
            startTime: new Date(),
            endTime: null,
            input: data,
            output: null,
            error: null,
            metrics: {},
            context: this.createExecutionContext(pattern, options)
        };
        this.activeExecutions.set(executionId, execution);
        try {
            // Enable temporal reasoning for complex patterns
            if (pattern.type === PatternType.WORKFLOW || pattern.type === PatternType.MAP_REDUCE) {
                await this.temporalCore.enableSubjectiveTimeExpansion(200);
            }
            let result;
            switch (pattern.type) {
                case PatternType.SEQUENTIAL:
                    result = await this.executeSequentialPattern(pattern, data, execution);
                    break;
                case PatternType.PARALLEL:
                    result = await this.executeParallelPattern(pattern, data, execution);
                    break;
                case PatternType.PIPELINE:
                    result = await this.executePipelinePattern(pattern, data, execution);
                    break;
                case PatternType.FAN_OUT:
                    result = await this.executeFanOutPattern(pattern, data, execution);
                    break;
                case PatternType.FAN_IN:
                    result = await this.executeFanInPattern(pattern, data, execution);
                    break;
                case PatternType.MAP_REDUCE:
                    result = await this.executeMapReducePattern(pattern, data, execution);
                    break;
                case PatternType.WORKFLOW:
                    result = await this.executeWorkflowPattern(pattern, data, execution);
                    break;
                case PatternType.EVENT_DRIVEN:
                    result = await this.executeEventDrivenPattern(pattern, data, execution);
                    break;
                case PatternType.STREAMING:
                    result = await this.executeStreamingPattern(pattern, data, execution);
                    break;
                case PatternType.BATCH:
                    result = await this.executeBatchPattern(pattern, data, execution);
                    break;
                default:
                    throw new Error(`Unsupported pattern type: ${pattern.type}`);
            }
            execution.status = ExecutionStatus.COMPLETED;
            execution.endTime = new Date();
            execution.output = result;
            // Update pattern performance metrics
            await this.updatePatternPerformance(pattern, execution);
            const executionResult = {
                executionId,
                patternId,
                status: execution.status,
                startTime: execution.startTime,
                endTime: execution.endTime,
                duration: execution.endTime.getTime() - execution.startTime.getTime(),
                input: execution.input,
                output: execution.output,
                metrics: execution.metrics,
                success: true
            };
            this.activeExecutions.delete(executionId);
            return executionResult;
        }
        catch (error) {
            execution.status = ExecutionStatus.FAILED;
            execution.endTime = new Date();
            execution.error = error;
            const executionResult = {
                executionId,
                patternId,
                status: execution.status,
                startTime: execution.startTime,
                endTime: execution.endTime,
                duration: execution.endTime.getTime() - execution.startTime.getTime(),
                input: execution.input,
                output: null,
                metrics: execution.metrics,
                success: false,
                error: error.message
            };
            this.activeExecutions.delete(executionId);
            return executionResult;
        }
    }
    // Pattern Execution Implementations
    async executeSequentialPattern(pattern, data, execution) {
        return await this.streamChain.executePipeline(pattern.id, data);
    }
    async executeParallelPattern(pattern, data, execution) {
        // Create parallel execution with worker threads
        const concurrency = pattern.configuration.concurrency;
        const chunks = this.chunkData(data, concurrency);
        const promises = chunks.map(async (chunk, index) => {
            const groupId = `${pattern.id}_group_${index}`;
            return await this.streamChain.executePipeline(groupId, chunk);
        });
        const results = await Promise.all(promises);
        return this.mergeResults(results);
    }
    async executePipelinePattern(pattern, data, execution) {
        return await this.streamChain.executePipeline(pattern.id, data);
    }
    async executeFanOutPattern(pattern, data, execution) {
        const fanOutCount = pattern.configuration.concurrency;
        const chunks = this.chunkData(data, fanOutCount);
        const promises = chunks.map(async (chunk, index) => {
            const stepId = `fan_out_${index}`;
            return await this.streamChain.executePipeline(`${pattern.id}_${stepId}`, chunk);
        });
        const results = await Promise.all(promises);
        return results; // Return array of results for fan-out
    }
    async executeFanInPattern(pattern, data, execution) {
        // First execute all source processors in parallel
        const sourcePromises = data.map(async (item, index) => {
            const stepId = `source_${index}`;
            return await this.streamChain.executePipeline(`${pattern.id}_${stepId}`, item);
        });
        const sourceResults = await Promise.all(sourcePromises);
        // Then execute aggregator
        return await this.streamChain.executePipeline(`${pattern.id}_aggregator`, sourceResults);
    }
    async executeMapReducePattern(pattern, data, execution) {
        // Map phase
        const mapResult = await this.streamChain.executePipeline(`${pattern.id}_map`, data);
        // Reduce phase
        return await this.streamChain.executePipeline(`${pattern.id}_reduce`, mapResult);
    }
    async executeWorkflowPattern(pattern, data, execution) {
        return await this.streamChain.executePipeline(pattern.id, data);
    }
    async executeEventDrivenPattern(pattern, data, execution) {
        const eventHandlers = await this.getEventHandlers(pattern.id);
        const event = this.parseEvent(data);
        const results = [];
        for (const handler of eventHandlers) {
            if (this.handlerMatchesEvent(handler, event)) {
                try {
                    const result = await handler.processor.process(event, execution.context);
                    results.push(result);
                }
                catch (error) {
                    console.error(`Event handler ${handler.id} failed:`, error);
                }
            }
        }
        return results;
    }
    async executeStreamingPattern(pattern, data, execution) {
        return await this.streamChain.executePipeline(pattern.id, data);
    }
    async executeBatchPattern(pattern, data, execution) {
        return await this.streamChain.executePipeline(pattern.id, data);
    }
    // Helper Methods
    generatePatternId() {
        return `pattern_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    generateExecutionId() {
        return `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    mergeConfiguration(defaultConfig, customConfig) {
        if (!customConfig)
            return defaultConfig;
        return {
            concurrency: customConfig.concurrency ?? defaultConfig.concurrency,
            timeout: customConfig.timeout ?? defaultConfig.timeout,
            retryPolicy: { ...defaultConfig.retryPolicy, ...customConfig.retryPolicy },
            errorHandling: { ...defaultConfig.errorHandling, ...customConfig.errorHandling },
            loadBalancing: { ...defaultConfig.loadBalancing, ...customConfig.loadBalancing },
            monitoring: { ...defaultConfig.monitoring, ...customConfig.monitoring },
            optimization: { ...defaultConfig.optimization, ...customConfig.optimization }
        };
    }
    getDefaultSequentialConfig() {
        return {
            concurrency: 1,
            timeout: 30000,
            retryPolicy: {
                maxAttempts: 3,
                backoffStrategy: BackoffStrategy.EXPONENTIAL,
                retryableErrors: ['NetworkError', 'TimeoutError'],
                maxDelay: 5000
            },
            errorHandling: {
                strategy: ErrorHandlingStrategy.RETRY,
                deadLetterQueue: true,
                errorThreshold: 0.1,
                circuitBreaker: {
                    enabled: true,
                    failureThreshold: 5,
                    recoveryTimeout: 30000,
                    monitoringPeriod: 60000
                }
            },
            loadBalancing: {
                strategy: LoadBalancingStrategy.ROUND_ROBIN,
                affinity: false,
                healthChecks: true,
                weights: { cpu: 1, memory: 1, network: 1, custom: {} }
            },
            monitoring: {
                metrics: [
                    { name: 'throughput', type: MetricType.COUNTER, aggregation: AggregationType.SUM, labels: {} },
                    { name: 'latency', type: MetricType.HISTOGRAM, aggregation: AggregationType.AVERAGE, labels: {} },
                    { name: 'error_rate', type: MetricType.GAUGE, aggregation: AggregationType.AVERAGE, labels: {} }
                ],
                tracing: {
                    enabled: true,
                    samplingRate: 0.1,
                    propagationFormat: PropagationFormat.TRACE_CONTEXT,
                    includePayloads: false
                },
                logging: {
                    level: LogLevel.INFO,
                    format: LogFormat.JSON,
                    structured: true,
                    correlation: true
                },
                alerting: {
                    enabled: true,
                    channels: [],
                    rules: [],
                    escalation: {
                        enabled: false,
                        levels: [],
                        timeout: 300000
                    }
                }
            },
            optimization: {
                autoScaling: true,
                loadPrediction: false,
                resourceOptimization: true,
                performanceTuning: true,
                adaptiveRouting: false
            }
        };
    }
    getDefaultParallelConfig() {
        const config = this.getDefaultSequentialConfig();
        config.concurrency = 4;
        config.loadBalancing.strategy = LoadBalancingStrategy.LEAST_CONNECTIONS;
        config.optimization.adaptiveRouting = true;
        return config;
    }
    getDefaultPipelineConfig() {
        return this.getDefaultSequentialConfig();
    }
    getDefaultFanOutConfig() {
        const config = this.getDefaultSequentialConfig();
        config.concurrency = 8;
        config.loadBalancing.strategy = LoadBalancingStrategy.HASH_BASED;
        return config;
    }
    getDefaultFanInConfig() {
        return this.getDefaultSequentialConfig();
    }
    getDefaultMapReduceConfig() {
        const config = this.getDefaultSequentialConfig();
        config.concurrency = 4;
        config.optimization.autoScaling = true;
        config.monitoring.tracing.samplingRate = 0.5;
        return config;
    }
    getDefaultWorkflowConfig() {
        const config = this.getDefaultSequentialConfig();
        config.concurrency = 2;
        config.errorHandling.strategy = ErrorHandlingStrategy.CIRCUIT_BREAKER;
        config.optimization.loadPrediction = true;
        return config;
    }
    getDefaultEventDrivenConfig() {
        const config = this.getDefaultSequentialConfig();
        config.concurrency = 10;
        config.loadBalancing.strategy = LoadBalancingStrategy.ADAPTIVE;
        config.monitoring.tracing.samplingRate = 0.2;
        return config;
    }
    getDefaultStreamingConfig() {
        const config = this.getDefaultSequentialConfig();
        config.timeout = 5000;
        config.concurrency = 3;
        config.errorHandling.strategy = ErrorHandlingStrategy.DEAD_LETTER;
        return config;
    }
    getDefaultBatchConfig() {
        const config = this.getDefaultSequentialConfig();
        config.timeout = 300000; // 5 minutes
        config.concurrency = 1;
        config.optimization.resourceOptimization = true;
        return config;
    }
    convertProcessorsToSteps(processors) {
        return processors.map((processor, index) => this.createStepConfig(`step_${index}`, processor, index > 0 ? [`step_${index - 1}`] : []));
    }
    convertStagesToSteps(stages) {
        const steps = [];
        const dependencies = [];
        for (const stage of stages) {
            for (const processor of stage.processors) {
                steps.push(this.createStepConfig(stage.name, processor, [...dependencies]));
            }
            dependencies.push(stage.name);
        }
        return steps;
    }
    createStepConfig(id, processor, dependencies = []) {
        return {
            id,
            name: id,
            type: 'TRANSFORM',
            processor,
            dependencies,
            parallelism: 1,
            retryPolicy: {
                maxAttempts: 3,
                backoffMs: 1000,
                maxBackoffMs: 10000,
                retryableErrors: ['NetworkError', 'TimeoutError']
            }
        };
    }
    topologicalSort(nodes, edges) {
        // Implement topological sort for DAG
        const sorted = [];
        const visited = new Set();
        const inDegree = new Map();
        // Calculate in-degrees
        nodes.forEach(node => inDegree.set(node.id, 0));
        edges.forEach(edge => {
            inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1);
        });
        // Queue nodes with no dependencies
        const queue = nodes.filter(node => inDegree.get(node.id) === 0);
        while (queue.length > 0) {
            const current = queue.shift();
            sorted.push(current);
            visited.add(current.id);
            // Update in-degrees of dependent nodes
            const outgoingEdges = edges.filter(edge => edge.source === current.id);
            for (const edge of outgoingEdges) {
                inDegree.set(edge.target, inDegree.get(edge.target) - 1);
                if (inDegree.get(edge.target) === 0) {
                    const targetNode = nodes.find(node => node.id === edge.target);
                    if (targetNode && !visited.has(targetNode.id)) {
                        queue.push(targetNode);
                    }
                }
            }
        }
        return sorted;
    }
    getDependencies(node, edges) {
        return edges
            .filter(edge => edge.target === node.id)
            .map(edge => edge.source);
    }
    chunkData(data, concurrency) {
        if (!Array.isArray(data)) {
            return [data];
        }
        const chunks = [];
        const chunkSize = Math.ceil(data.length / concurrency);
        for (let i = 0; i < data.length; i += chunkSize) {
            chunks.push(data.slice(i, i + chunkSize));
        }
        return chunks;
    }
    mergeResults(results) {
        if (results.length === 0)
            return null;
        if (results.length === 1)
            return results[0];
        // For arrays, concatenate them
        if (results.every(result => Array.isArray(result))) {
            return results.flat();
        }
        // For objects, merge them
        return results.reduce((merged, result) => ({ ...merged, ...result }), {});
    }
    createExecutionContext(pattern, options) {
        return {
            pipelineId: pattern.id,
            stepId: '',
            agentId: options?.agentId || 'pattern_executor',
            timestamp: new Date(),
            correlationId: options?.correlationId || this.generateExecutionId(),
            metadata: new Map(Object.entries(options?.metadata || {})),
            memory: this.agentDB,
            temporal: this.temporalCore
        };
    }
    async storeEventHandlers(patternId, handlers) {
        const key = `event_handlers:${patternId}`;
        await this.agentDB.store(key, {
            handlers,
            timestamp: new Date()
        });
    }
    async getEventHandlers(patternId) {
        const key = `event_handlers:${patternId}`;
        const result = await this.agentDB.retrieve(key);
        return result?.handlers || [];
    }
    parseEvent(data) {
        return {
            id: data.id || this.generateExecutionId(),
            type: data.type || 'unknown',
            source: data.source || 'unknown',
            timestamp: new Date(data.timestamp || Date.now()),
            payload: data.payload || data,
            metadata: data.metadata || {}
        };
    }
    handlerMatchesEvent(handler, event) {
        return !handler.eventTypes || handler.eventTypes.includes(event.type);
    }
    async updatePatternPerformance(pattern, execution) {
        const duration = execution.endTime.getTime() - execution.startTime.getTime();
        const success = execution.status === ExecutionStatus.COMPLETED;
        // Update pattern performance metrics
        pattern.performance.latency = (pattern.performance.latency + duration) / 2;
        pattern.performance.reliability = (pattern.performance.reliability + (success ? 1 : 0)) / 2;
        pattern.performance.throughput = success ? 1000 / duration : pattern.performance.throughput;
        // Store updated pattern
        this.patternRegistry.set(pattern.id, pattern);
        await this.agentDB.store(`pattern:${pattern.id}`, pattern);
    }
    // Pattern Management
    getPattern(patternId) {
        return this.patternRegistry.get(patternId);
    }
    getAllPatterns() {
        return Array.from(this.patternRegistry.values());
    }
    getActiveExecutions() {
        return Array.from(this.activeExecutions.values());
    }
    async deletePattern(patternId) {
        this.patternRegistry.delete(patternId);
        await this.agentDB.delete(`pattern:${patternId}`);
        await this.agentDB.delete(`event_handlers:${patternId}`);
    }
    async getPatternMetrics(patternId) {
        const pattern = this.patternRegistry.get(patternId);
        if (!pattern) {
            throw new Error(`Pattern ${patternId} not found`);
        }
        const executions = Array.from(this.activeExecutions.values())
            .filter(exec => exec.patternId === patternId);
        return {
            patternId,
            patternName: pattern.name,
            patternType: pattern.type,
            totalExecutions: executions.length,
            successfulExecutions: executions.filter(e => e.status === ExecutionStatus.COMPLETED).length,
            failedExecutions: executions.filter(e => e.status === ExecutionStatus.FAILED).length,
            averageLatency: pattern.performance.latency,
            throughput: pattern.performance.throughput,
            errorRate: pattern.performance.errorRate,
            resourceUtilization: pattern.performance.resourceUtilization,
            lastUpdated: new Date()
        };
    }
}
exports.StreamChainIntegrationPatterns = StreamChainIntegrationPatterns;
var ExecutionStatus;
(function (ExecutionStatus) {
    ExecutionStatus["PENDING"] = "pending";
    ExecutionStatus["RUNNING"] = "running";
    ExecutionStatus["COMPLETED"] = "completed";
    ExecutionStatus["FAILED"] = "failed";
    ExecutionStatus["CANCELLED"] = "cancelled";
})(ExecutionStatus || (exports.ExecutionStatus = ExecutionStatus = {}));
exports.default = StreamChainIntegrationPatterns;
//# sourceMappingURL=integration-patterns.js.map