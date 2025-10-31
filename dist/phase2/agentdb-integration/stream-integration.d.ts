/**
 * AgentDB Stream Integration with Vector Indexing and QUIC Sync
 * Phase 2: High-Performance Stream Processing with 150x Faster Vector Search
 */
import { StreamProcessor } from '../stream-chain-core';
import { AgentDB } from '../../agentdb/agentdb-core';
import { TemporalReasoningCore } from '../../temporal/temporal-core';
export interface StreamIntegrationConfig {
    vectorIndexing: VectorIndexingConfig;
    quicSync: QUICSyncConfig;
    caching: CachingConfig;
    batchProcessing: BatchProcessingConfig;
    performanceOptimization: PerformanceOptimizationConfig;
    monitoring: StreamMonitoringConfig;
}
export interface VectorIndexingConfig {
    enabled: boolean;
    algorithm: VectorIndexAlgorithm;
    dimension: number;
    efConstruction: number;
    efSearch: number;
    maxConnections: number;
    batchInsertSize: number;
    updateStrategy: IndexUpdateStrategy;
}
export declare enum VectorIndexAlgorithm {
    HNSW = "hnsw",
    IVF_FLAT = "ivf_flat",
    IVF_PQ = "ivf_pq",
    LSH = "lsh",
    FAISS = "faiss",
    ANNOY = "annoy",
    SCANN = "scann"
}
export declare enum IndexUpdateStrategy {
    IMMEDIATE = "immediate",
    BATCH = "batch",
    PERIODIC = "periodic",
    LAZY = "lazy"
}
export interface QUICSyncConfig {
    enabled: boolean;
    endpoint: string;
    port: number;
    maxStreams: number;
    streamTimeout: number;
    connectionTimeout: number;
    keepAlive: boolean;
    maxIdleTimeout: number;
    congestionControl: CongestionControlAlgorithm;
    tls: TLSConfig;
}
export declare enum CongestionControlAlgorithm {
    CUBIC = "cubic",
    BBR = "bbr",
    RENO = "reno",
    HYBRID = "hybrid"
}
export interface TLSConfig {
    enabled: boolean;
    certFile?: string;
    keyFile?: string;
    caFile?: string;
    skipVerify: boolean;
}
export interface CachingConfig {
    enabled: boolean;
    strategy: CachingStrategy;
    maxSize: number;
    ttl: number;
    evictionPolicy: EvictionPolicy;
    compression: boolean;
    serialization: SerializationFormat;
}
export declare enum CachingStrategy {
    LRU = "lru",
    LFU = "lfu",
    FIFO = "fifo",
    RANDOM = "random",
    TTL_BASED = "ttl_based"
}
export declare enum EvictionPolicy {
    LRU = "lru",
    LFU = "lfu",
    FIFO = "fifo",
    RANDOM = "random"
}
export declare enum SerializationFormat {
    JSON = "json",
    MSGPACK = "msgpack",
    PROTOBUF = "protobuf",
    AVRO = "avro"
}
export interface BatchProcessingConfig {
    enabled: boolean;
    batchSize: number;
    maxWaitTime: number;
    parallelism: number;
    retryPolicy: BatchRetryPolicy;
    memoryLimit: number;
}
export interface BatchRetryPolicy {
    maxRetries: number;
    backoffMs: number;
    retryableErrors: string[];
}
export interface PerformanceOptimizationConfig {
    memoryOptimization: MemoryOptimizationConfig;
    cpuOptimization: CPUOptimizationConfig;
    networkOptimization: NetworkOptimizationConfig;
    diskOptimization: DiskOptimizationConfig;
}
export interface MemoryOptimizationConfig {
    enableMemoryPooling: boolean;
    enableGarbageCollection: boolean;
    gcThreshold: number;
    memoryLimit: number;
    enableCompression: boolean;
    compressionLevel: number;
}
export interface CPUOptimizationConfig {
    enableThreadPooling: boolean;
    maxThreads: number;
    enableSIMD: boolean;
    enableVectorization: boolean;
    cpuAffinity: boolean;
}
export interface NetworkOptimizationConfig {
    enableCompression: boolean;
    enableMultiplexing: boolean;
    maxConnections: number;
    keepAlive: boolean;
    enablePipelining: boolean;
}
export interface DiskOptimizationConfig {
    enableWriteBuffering: boolean;
    bufferSize: number;
    enableAsyncWrites: boolean;
    enableReadAhead: boolean;
    enableJournaling: boolean;
}
export interface StreamMonitoringConfig {
    enabled: boolean;
    metricsInterval: number;
    healthCheckInterval: number;
    alertThresholds: AlertThresholds;
    loggingConfig: LoggingConfig;
    tracingConfig: TracingConfig;
}
export interface AlertThresholds {
    latencyMs: number;
    errorRate: number;
    throughputMin: number;
    memoryUsage: number;
    cpuUsage: number;
    diskUsage: number;
}
export interface LoggingConfig {
    level: LogLevel;
    format: LogFormat;
    structured: boolean;
    includePayloads: boolean;
    maxPayloadSize: number;
}
export interface TracingConfig {
    enabled: boolean;
    samplingRate: number;
    spanTimeout: number;
    includePayloads: boolean;
    exportFormat: ExportFormat;
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
export declare enum ExportFormat {
    JAEGER = "jaeger",
    ZIPKIN = "zipkin",
    PROMETHEUS = "prometheus",
    OPENTELEMETRY = "opentelemetry"
}
export interface StreamData {
    id: string;
    timestamp: Date;
    source: string;
    type: StreamDataType;
    payload: any;
    metadata: StreamMetadata;
    vectors: ?StreamVectors;
}
export declare enum StreamDataType {
    RAN_METRICS = "ran_metrics",
    ML_TRAINING = "ml_training",
    CAUSAL_INFERENCE = "causal_inference",
    AGENT_COORDINATION = "agent_coordination",
    OPTIMIZATION_RESULT = "optimization_result",
    PERFORMANCE_METRICS = "performance_metrics",
    ALERT = "alert",
    COMMAND = "command"
}
export interface StreamMetadata {
    correlationId: string;
    causationId: string;
    messageId: string;
    conversationId: string;
    userId?: string;
    sessionId?: string;
    deviceId?: string;
    location?: GeographicLocation;
    tags: string[];
    properties: {
        [key: string]: any;
    };
}
export interface GeographicLocation {
    latitude: number;
    longitude: number;
    altitude?: number;
    accuracy?: number;
    timestamp: Date;
}
export interface StreamVectors {
    embedding: number[];
    semantic: number[];
    temporal: number[];
    contextual: number[];
    features: FeatureVector[];
    metadata: VectorMetadata;
}
export interface FeatureVector {
    name: string;
    vector: number[];
    dimension: number;
    type: FeatureType;
    confidence: number;
}
export declare enum FeatureType {
    NUMERICAL = "numerical",
    CATEGORICAL = "categorical",
    TEMPORAL = "temporal",
    SPATIAL = "spatial",
    SEMANTIC = "semantic",
    BEHAVIORAL = "behavioral"
}
export interface VectorMetadata {
    model: string;
    version: string;
    timestamp: Date;
    dimensions: number;
    similarityMetric: SimilarityMetric;
    indexType: VectorIndexAlgorithm;
}
export declare enum SimilarityMetric {
    COSINE = "cosine",
    EUCLIDEAN = "euclidean",
    DOT_PRODUCT = "dot_product",
    MANHATTAN = "manhattan",
    HAMMING = "hamming"
}
export interface StreamResult {
    id: string;
    inputId: string;
    output: any;
    success: boolean;
    error?: string;
    metrics: ProcessingMetrics;
    timestamp: Date;
    metadata: ResultMetadata;
}
export interface ProcessingMetrics {
    processingTime: number;
    queueTime: number;
    memoryUsage: number;
    cpuUsage: number;
    networkIO: number;
    diskIO: number;
    cacheHitRate: number;
    vectorSearchTime: number;
    syncTime: number;
}
export interface ResultMetadata {
    processorId: string;
    version: string;
    nodeId: string;
    shardId?: string;
    partitionId?: string;
    retryCount: number;
    spanId?: string;
    traceId?: string;
}
export declare class AgentDBStreamIntegration {
    private agentDB;
    private temporalCore;
    private config;
    private vectorIndexer;
    private quicSyncManager;
    private cacheManager;
    private batchProcessor;
    private performanceOptimizer;
    private streamMonitor;
    constructor(agentDB: AgentDB, temporalCore: TemporalReasoningCore, config?: Partial<StreamIntegrationConfig>);
    initialize(): Promise<void>;
    createStreamDataProcessor(): StreamProcessor;
    createVectorSearchProcessor(): StreamProcessor;
    createBatchProcessor(): StreamProcessor;
    createStreamSyncProcessor(): StreamProcessor;
    private parseStreamData;
    private processStreamVectors;
    private optimizeVector;
    private normalizeVector;
    private compressVector;
    private processFeatureVectors;
    private storeStreamData;
    private combineVectors;
    private syncStreamData;
    private updateCache;
    private calculateProcessingMetrics;
    private performHealthCheck;
    private chunkArray;
    private processBatch;
    private mergeWithDefaults;
    private setupQUICConnections;
    private setupVectorIndexes;
    private setupCaching;
    private generateStreamId;
    private generateResultId;
    private generateBatchId;
    private generateSyncId;
    private generateCorrelationId;
    private generateMessageId;
    shutdown(): Promise<void>;
    getMetrics(): Promise<StreamIntegrationMetrics>;
}
export interface VectorSearchQuery {
    id: string;
    vector: number[];
    k: number;
    threshold?: number;
    filter?: any;
    includeMetadata?: boolean;
}
export interface VectorSearchResult {
    queryId: string;
    results: VectorSearchResultItem[];
    totalFound: number;
    searchTime: number;
    confidence: number;
    metadata: {
        algorithm: VectorIndexAlgorithm;
        indexType: VectorIndexAlgorithm;
        dimensions: number;
        efSearch: number;
        timestamp: Date;
    };
}
export interface VectorSearchResultItem {
    id: string;
    score: number;
    distance: number;
    metadata?: any;
}
export interface BatchResult {
    batchId: string;
    inputCount: number;
    results: StreamResult[];
    successCount: number;
    errorCount: number;
    processingTime: number;
    averageLatency: number;
    throughput: number;
    timestamp: Date;
}
export interface SyncResult {
    syncId: string;
    success: boolean;
    syncedItems: number;
    syncTime: number;
    errors: string[];
    timestamp: Date;
}
export interface StreamIntegrationMetrics {
    vectorIndexer: any;
    quicSync: any;
    cache: any;
    batchProcessor: any;
    performanceOptimizer: any;
    streamMonitor: any;
    timestamp: Date;
}
export default AgentDBStreamIntegration;
//# sourceMappingURL=stream-integration.d.ts.map