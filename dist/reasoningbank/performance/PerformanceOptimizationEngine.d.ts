/**
 * Performance Optimization Engine for ReasoningBank
 * Leverages AgentDB quantization (32x memory reduction) and HNSW indexing (150x faster search)
 */
export interface PerformanceOptimizationConfig {
    cacheEnabled: boolean;
    quantizationEnabled: boolean;
    parallelProcessingEnabled: boolean;
    memoryCompressionEnabled: boolean;
    hnswIndexingEnabled: boolean;
    cacheSize: number;
    compressionRatio: number;
    quantizationBits: number;
    parallelWorkers: number;
}
export interface OptimizationMetrics {
    search_performance: SearchPerformanceMetrics;
    memory_performance: MemoryPerformanceMetrics;
    cache_performance: CachePerformanceMetrics;
    quantization_performance: QuantizationPerformanceMetrics;
    parallel_processing_metrics: ParallelProcessingMetrics;
    overall_performance: OverallPerformanceMetrics;
}
export interface SearchPerformanceMetrics {
    average_search_time: number;
    queries_per_second: number;
    search_accuracy: number;
    index_size: number;
    indexing_time: number;
    memory_usage: number;
    cache_hit_rate: number;
    hnsw_parameters: HNSWParameters;
}
export interface HNSWParameters {
    m: number;
    ef_construction: number;
    ef_search: number;
    dim: number;
    space: string;
    max_elements: number;
}
export interface MemoryPerformanceMetrics {
    total_memory_usage: number;
    compressed_memory_usage: number;
    compression_ratio: number;
    quantization_memory_savings: number;
    memory_efficiency: number;
    garbage_collection_time: number;
    memory_fragmentation: number;
    peak_memory_usage: number;
}
export interface CachePerformanceMetrics {
    cache_size: number;
    cache_hit_rate: number;
    cache_miss_rate: number;
    eviction_rate: number;
    average_access_time: number;
    cache_utilization: number;
    cache_entries: number;
    cache_efficiency: number;
}
export interface QuantizationPerformanceMetrics {
    quantization_time: number;
    dequantization_time: number;
    quantization_error: number;
    compression_ratio: number;
    bits_per_value: number;
    quantization_accuracy: number;
    memory_savings: number;
    speed_improvement: number;
}
export interface ParallelProcessingMetrics {
    worker_utilization: number;
    task_completion_rate: number;
    average_task_time: number;
    queue_depth: number;
    throughput: number;
    parallel_efficiency: number;
    resource_contention: number;
    load_balance_score: number;
}
export interface OverallPerformanceMetrics {
    total_query_time: number;
    throughput_qps: number;
    latency_p50: number;
    latency_p95: number;
    latency_p99: number;
    error_rate: number;
    availability: number;
    cost_per_query: number;
    performance_score: number;
}
export interface PolicyOptimizationResult {
    policy_id: string;
    optimization_type: 'quantization' | 'indexing' | 'caching' | 'compression' | 'parallel';
    performance_before: OptimizationMetrics;
    performance_after: OptimizationMetrics;
    improvement_percentage: number;
    optimization_cost: number;
    optimization_time: number;
    success: boolean;
    error_message?: string;
    recommendations: OptimizationRecommendation[];
}
export interface OptimizationRecommendation {
    recommendation_type: 'memory' | 'search' | 'cache' | 'parallel' | 'quantization';
    priority: 'high' | 'medium' | 'low';
    description: string;
    expected_improvement: number;
    implementation_cost: number;
    implementation_complexity: number;
    impact_areas: string[];
}
export interface PerformanceProfile {
    profile_id: string;
    profile_name: string;
    optimization_settings: OptimizationSettings;
    performance_metrics: OptimizationMetrics;
    created_at: number;
    last_updated: number;
    usage_count: number;
    success_rate: number;
}
export interface OptimizationSettings {
    quantization: QuantizationSettings;
    indexing: IndexingSettings;
    caching: CachingSettings;
    parallel_processing: ParallelProcessingSettings;
    memory_management: MemoryManagementSettings;
}
export interface QuantizationSettings {
    enabled: boolean;
    bits: number;
    method: 'scalar' | 'product' | 'binary' | 'custom';
    compression_ratio: number;
    accuracy_threshold: number;
    adaptive_quantization: boolean;
    quantization_schedule: QuantizationSchedule;
}
export interface QuantizationSchedule {
    schedule_type: 'fixed' | 'adaptive' | 'performance_based';
    quantization_frequency: number;
    performance_threshold: number;
    accuracy_requirement: number;
    adaptive_parameters: any;
}
export interface IndexingSettings {
    algorithm: 'HNSW' | 'IVF' | 'FLAT' | 'LSH';
    parameters: any;
    build_strategy: 'incremental' | 'batch' | 'online';
    update_frequency: number;
    index_optimization: boolean;
    parallel_indexing: boolean;
}
export interface CachingSettings {
    enabled: boolean;
    cache_size: number;
    eviction_policy: 'LRU' | 'LFU' | 'FIFO' | 'random';
    cache_partitions: number;
    preloading_enabled: boolean;
    cache_warmup: CacheWarmupSettings;
    distributed_caching: boolean;
}
export interface CacheWarmupSettings {
    warmup_strategy: 'popular_queries' | 'sequential' | 'random' | 'adaptive';
    warmup_percentage: number;
    warmup_timeline: number;
    warmup_sources: string[];
}
export interface ParallelProcessingSettings {
    enabled: boolean;
    worker_count: number;
    task_queue_size: number;
    load_balancing_strategy: 'round_robin' | 'least_loaded' | 'hash_based' | 'adaptive';
    affinity_groups: string[];
    max_concurrent_tasks: number;
    task_timeout: number;
}
export interface MemoryManagementSettings {
    compression_enabled: boolean;
    compression_algorithm: 'gzip' | 'lz4' | 'snappy' | 'custom';
    memory_pool_size: number;
    garbage_collection_strategy: 'incremental' | 'generational' | 'concurrent';
    memory_monitoring: boolean;
    auto_tuning: boolean;
    memory_limits: MemoryLimits;
}
export interface MemoryLimits {
    max_heap_size: number;
    max_off_heap_size: number;
    gc_pause_threshold: number;
    memory_pressure_threshold: number;
}
/**
 * Performance Optimization Engine - Optimizes ReasoningBank performance using AgentDB features
 */
export declare class PerformanceOptimizationEngine {
    private config;
    private metrics;
    private performanceProfiles;
    private activeOptimizations;
    private optimizationHistory;
    private isInitialized;
    private cache;
    private quantizationCache;
    private indexCache;
    private compressionCache;
    private workerPool;
    private taskQueue;
    private activeWorkers;
    private queryTimes;
    private memorySnapshots;
    private lastOptimizationTime;
    constructor(config: PerformanceOptimizationConfig);
    /**
     * Initialize Performance Optimization Engine
     */
    initialize(): Promise<void>;
    /**
     * Optimize policy storage using quantization and HNSW
     */
    optimizePolicyStorage(policy: any): Promise<PolicyOptimizationResult>;
    /**
     * Optimize search query performance
     */
    optimizeSearchQuery(query: string, searchContext: any): Promise<any>;
    /**
     * Get performance optimization statistics
     */
    getStatistics(): Promise<any>;
    private initializeHNSWIndexing;
    private initializeQuantization;
    private initializeCaching;
    private initializeParallelProcessing;
    private initializeMemoryCompression;
    private setupPerformanceMonitoring;
    private loadPerformanceProfiles;
    private initializeDefaultProfile;
    private quantizePolicy;
    private createHNSWIndex;
    private extractVectorsFromPolicy;
    private cachePolicy;
    private compressPolicy;
    private parallelOptimizePolicy;
    private processTaskQueue;
    private determineOptimizationType;
    private calculateImprovement;
    private calculateOptimizationCost;
    private generateOptimizationRecommendations;
    private updateInternalMetrics;
    private calculateMemorySavings;
    private getCachedResult;
    private updateCacheMetrics;
    private performHNSWSearch;
    private performStandardSearch;
    private cacheSearchResult;
    private capturePerformanceMetrics;
    private createEmptyMetrics;
    private captureMemorySnapshot;
    private calculateAverageImprovement;
    private calculateTotalMemorySavings;
    private calculateOptimizationFrequency;
    private getCacheStatistics;
    private getParallelProcessingStatistics;
    private getActiveProfile;
    private getProfileUsageStatistics;
    private calculateAverageQueryTime;
    private calculateQueriesPerSecond;
    private calculatePercentileLatency;
    private calculatePerformanceScore;
    /**
     * Shutdown Performance Optimization Engine gracefully
     */
    shutdown(): Promise<void>;
}
//# sourceMappingURL=PerformanceOptimizationEngine.d.ts.map