/**
 * Stream Performance Optimizer with Batching, Caching, and Adaptive Routing
 * Phase 2: High-Performance Stream Processing for Multi-Agent ML Workflows
 */
import { StreamProcessor } from '../stream-chain-core';
import { AgentDB } from '../../agentdb/agentdb-core';
import { TemporalReasoningCore } from '../../temporal/temporal-core';
export interface PerformanceOptimizerConfig {
    batching: BatchingConfig;
    caching: CachingConfig;
    adaptiveRouting: AdaptiveRoutingConfig;
    loadBalancing: LoadBalancingConfig;
    memoryManagement: MemoryManagementConfig;
    cpuOptimization: CPUOptimizationConfig;
    networkOptimization: NetworkOptimizationConfig;
    monitoring: PerformanceMonitoringConfig;
}
export interface BatchingConfig {
    enabled: boolean;
    strategy: BatchingStrategy;
    maxBatchSize: number;
    maxWaitTime: number;
    minBatchSize: number;
    adaptive: boolean;
    compressionEnabled: boolean;
    parallelProcessing: boolean;
    maxParallelBatches: number;
}
export declare enum BatchingStrategy {
    TIME_BASED = "time_based",
    SIZE_BASED = "size_based",
    HYBRID = "hybrid",
    ADAPTIVE = "adaptive",
    PRIORITY_BASED = "priority_based"
}
export interface CachingConfig {
    enabled: boolean;
    strategy: CacheStrategy;
    maxSize: number;
    ttl: number;
    evictionPolicy: EvictionPolicy;
    compressionEnabled: boolean;
    serializationFormat: SerializationFormat;
    distributed: boolean;
    cacheWarmup: boolean;
    prefetchEnabled: boolean;
}
export declare enum CacheStrategy {
    LRU = "lru",
    LFU = "lfu",
    FIFO = "fifo",
    RANDOM = "random",
    TTL_BASED = "ttl_based",
    ADAPTIVE = "adaptive"
}
export declare enum EvictionPolicy {
    LRU = "lru",
    LFU = "lfu",
    FIFO = "fifo",
    RANDOM = "random",
    TTL_BASED = "ttl_based"
}
export declare enum SerializationFormat {
    JSON = "json",
    MSGPACK = "msgpack",
    PROTOBUF = "protobuf",
    AVRO = "avro",
    FLATBUFFERS = "flatbuffers"
}
export interface AdaptiveRoutingConfig {
    enabled: boolean;
    strategy: RoutingStrategy;
    healthCheckInterval: number;
    failureThreshold: number;
    recoveryTimeout: number;
    loadMetrics: LoadMetric[];
    routingTable: RoutingTableConfig;
    circuitBreaker: CircuitBreakerConfig;
}
export declare enum RoutingStrategy {
    ROUND_ROBIN = "round_robin",
    WEIGHTED_ROUND_ROBIN = "weighted_round_robin",
    LEAST_CONNECTIONS = "least_connections",
    LEAST_RESPONSE_TIME = "least_response_time",
    HASH_BASED = "hash_based",
    ADAPTIVE = "adaptive",
    PREDICTIVE = "predictive"
}
export declare enum LoadMetric {
    CPU_USAGE = "cpu_usage",
    MEMORY_USAGE = "memory_usage",
    NETWORK_IO = "network_io",
    DISK_IO = "disk_io",
    RESPONSE_TIME = "response_time",
    ERROR_RATE = "error_rate",
    THROUGHPUT = "throughput",
    QUEUE_LENGTH = "queue_length"
}
export interface RoutingTableConfig {
    updateInterval: number;
    maxEntries: number;
    ttl: number;
    persistToDisk: boolean;
}
export interface CircuitBreakerConfig {
    enabled: boolean;
    failureThreshold: number;
    timeout: number;
    halfOpenMaxCalls: number;
    monitoringPeriod: number;
}
export interface LoadBalancingConfig {
    enabled: boolean;
    algorithm: LoadBalancingAlgorithm;
    weights: LoadBalancingWeights;
    healthChecks: boolean;
    stickiness: boolean;
    affinity: LoadBalancingAffinity;
}
export declare enum LoadBalancingAlgorithm {
    ROUND_ROBIN = "round_robin",
    WEIGHTED_ROUND_ROBIN = "weighted_round_robin",
    LEAST_CONNECTIONS = "least_connections",
    WEIGHTED_LEAST_CONNECTIONS = "weighted_least_connections",
    RANDOM = "random",
    CONSISTENT_HASH = "consistent_hash",
    MAGLEV_HASH = "maglev_hash",
    Rendezvous_HASH = "rendezvous_hash"
}
export interface LoadBalancingWeights {
    cpu: number;
    memory: number;
    network: number;
    disk: number;
    custom: {
        [key: string]: number;
    };
}
export interface LoadBalancingAffinity {
    enabled: boolean;
    type: AffinityType;
    key: string;
    ttl: number;
}
export declare enum AffinityType {
    SESSION = "session",
    USER = "user",
    GEOGRAPHIC = "geographic",
    CUSTOM = "custom"
}
export interface MemoryManagementConfig {
    enabled: boolean;
    maxHeapSize: number;
    gcThreshold: number;
    gcStrategy: GCStrategy;
    memoryPool: MemoryPoolConfig;
    compressionEnabled: boolean;
    lazyLoading: boolean;
    evictionPolicy: MemoryEvictionPolicy;
}
export declare enum GCStrategy {
    AUTOMATIC = "automatic",
    MANUAL = "manual",
    INCREMENTAL = "incremental",
    GENERATIONAL = "generational",
    CONCURRENT = "concurrent"
}
export interface MemoryPoolConfig {
    enabled: boolean;
    initialSize: number;
    maxSize: number;
    growthFactor: number;
    shrinkThreshold: number;
    objectTypes: string[];
}
export declare enum MemoryEvictionPolicy {
    LRU = "lru",
    LFU = "lfu",
    FIFO = "fifo",
    RANDOM = "random",
    PRIORITY_BASED = "priority_based"
}
export interface CPUOptimizationConfig {
    enabled: boolean;
    threadPool: ThreadPoolConfig;
    affinity: CPUAffinityConfig;
    simdEnabled: boolean;
    vectorization: VectorizationConfig;
    asyncProcessing: boolean;
    parallelism: number;
}
export interface ThreadPoolConfig {
    corePoolSize: number;
    maxPoolSize: number;
    keepAliveTime: number;
    queueSize: number;
    rejectionPolicy: RejectionPolicy;
}
export declare enum RejectionPolicy {
    ABORT = "abort",
    CALLER_RUNS = "caller_runs",
    DISCARD = "discard",
    DISCARD_OLDEST = "discard_oldest"
}
export interface CPUAffinityConfig {
    enabled: boolean;
    cpuMask: number[];
    strategy: AffinityStrategy;
}
export declare enum AffinityStrategy {
    AUTO = "auto",
    MANUAL = "manual",
    NUMA_AWARE = "numa_aware",
    CACHE_AWARE = "cache_aware"
}
export interface VectorizationConfig {
    enabled: boolean;
    instructionSet: InstructionSet;
    autoDetect: boolean;
    fallbackEnabled: boolean;
}
export declare enum InstructionSet {
    SSE = "sse",
    AVX = "avx",
    AVX2 = "avx2",
    AVX512 = "avx512",
    NEON = "neon"
}
export interface NetworkOptimizationConfig {
    enabled: boolean;
    compression: NetworkCompressionConfig;
    multiplexing: MultiplexingConfig;
    pipelining: PipeliningConfig;
    connectionPooling: ConnectionPoolingConfig;
    keepAlive: KeepAliveConfig;
}
export interface NetworkCompressionConfig {
    enabled: boolean;
    algorithm: CompressionAlgorithm;
    level: CompressionLevel;
    threshold: number;
}
export declare enum CompressionAlgorithm {
    GZIP = "gzip",
    DEFLATE = "deflate",
    BROTLI = "brotli",
    LZ4 = "lz4",
    ZSTD = "zstd"
}
export declare enum CompressionLevel {
    NONE = 0,
    FASTEST = 1,
    FAST = 3,
    DEFAULT = 6,
    BEST = 9
}
export interface MultiplexingConfig {
    enabled: boolean;
    maxStreams: number;
    streamTimeout: number;
    priority: boolean;
}
export interface PipeliningConfig {
    enabled: boolean;
    maxConcurrent: number;
    batchSize: number;
    timeout: number;
}
export interface ConnectionPoolingConfig {
    enabled: boolean;
    maxConnections: number;
    minConnections: number;
    maxIdleTime: number;
    validationQuery: string;
}
export interface KeepAliveConfig {
    enabled: boolean;
    interval: number;
    timeout: number;
    probes: number;
}
export interface PerformanceMonitoringConfig {
    enabled: boolean;
    metricsInterval: number;
    profilingEnabled: boolean;
    alerting: AlertingConfig;
    dashboards: DashboardConfig;
    retention: RetentionConfig;
}
export interface AlertingConfig {
    enabled: boolean;
    channels: AlertChannel[];
    rules: AlertRule[];
    escalation: EscalationPolicy[];
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
    name: string;
    levels: EscalationLevel[];
    timeout: number;
    enabled: boolean;
}
export interface EscalationLevel {
    level: number;
    timeout: number;
    channels: string[];
    autoResolve: boolean;
}
export interface DashboardConfig {
    enabled: boolean;
    refreshInterval: number;
    panels: DashboardPanel[];
}
export interface DashboardPanel {
    name: string;
    type: PanelType;
    query: string;
    visualization: VisualizationConfig;
}
export declare enum PanelType {
    GRAPH = "graph",
    GAUGE = "gauge",
    TABLE = "table",
    STAT = "stat",
    HEATMAP = "heatmap"
}
export interface VisualizationConfig {
    [key: string]: any;
}
export interface RetentionConfig {
    metrics: number;
    logs: number;
    traces: number;
    profiles: number;
}
export declare class StreamPerformanceOptimizer {
    private config;
    private agentDB;
    private temporalCore;
    private batchManager;
    private cacheManager;
    private routingManager;
    private loadBalancer;
    private memoryManager;
    private cpuOptimizer;
    private networkOptimizer;
    private performanceMonitor;
    constructor(agentDB: AgentDB, temporalCore: TemporalReasoningCore, config?: Partial<PerformanceOptimizerConfig>);
    initialize(): Promise<void>;
    createOptimizedStreamProcessor(baseProcessor: StreamProcessor): StreamProcessor;
    createBatchProcessor(processors: StreamProcessor[]): StreamProcessor;
    createCacheAwareProcessor(baseProcessor: StreamProcessor): StreamProcessor;
    createAdaptiveRoutingProcessor(processors: Map<string, StreamProcessor>, routingStrategy: RoutingStrategy): StreamProcessor;
    optimizeThroughput(targetThroughput: number): Promise<OptimizationResult>;
    optimizeLatency(targetLatency: number): Promise<OptimizationResult>;
    optimizeMemory(targetMemoryUsage: number): Promise<OptimizationResult>;
    private mergeWithDefaults;
    private setupAdaptiveOptimization;
    private setupPerformanceMonitoring;
    private checkComponentHealth;
    private generateProcessingId;
    private generateCacheKey;
    private hashData;
    private processBatchWithProcessors;
    private calculateOptimalBatchSize;
    private measureCurrentThroughput;
    private calculateThroughputImprovement;
    private measureCurrentLatency;
    private calculateLatencyImprovement;
    private measureCurrentMemoryUsage;
    private calculateMemoryImprovement;
    private performAdaptiveOptimization;
    getPerformanceMetrics(): Promise<PerformanceMetrics>;
    shutdown(): Promise<void>;
}
export interface OptimizationResult {
    success: boolean;
    optimizations: string[];
    targetThroughput?: number;
    targetLatency?: number;
    targetMemoryUsage?: number;
    achievedThroughput?: number;
    achievedLatency?: number;
    achievedMemoryUsage?: number;
    improvement: number;
    optimizationTime: number;
    error?: string;
    timestamp: Date;
}
export interface PerformanceMetrics {
    throughput: number;
    latency: number;
    memoryUsage: number;
    cacheHitRate: number;
    errorRate: number;
    timestamp: Date;
}
export default StreamPerformanceOptimizer;
//# sourceMappingURL=stream-performance-optimizer.d.ts.map