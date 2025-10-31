/**
 * Performance Optimization Engine
 *
 * Implements caching strategies, 150x faster vector search optimization,
 * and comprehensive performance monitoring for the Ericsson RAN Optimization SDK.
 */
import { type AgentDBAdapter } from 'agentic-flow/reasoningbank';
/**
 * Performance Configuration
 */
export interface PerformanceConfig {
    caching: {
        enabled: boolean;
        strategy: 'lru' | 'lfu' | 'fifo' | 'custom';
        maxSize: number;
        ttlMs: number;
        compressionEnabled: boolean;
    };
    vectorSearch: {
        hnswConfig: {
            M: number;
            efConstruction: number;
            efSearch: number;
        };
        quantization: 'binary' | 'scalar' | 'product' | 'none';
        mmrEnabled: boolean;
        mmrLambda: number;
        targetSpeedup: number;
    };
    parallelism: {
        enabled: boolean;
        maxConcurrency: number;
        batchSize: number;
        loadBalancing: 'round-robin' | 'least-connections' | 'adaptive';
    };
    memory: {
        compressionEnabled: boolean;
        gcOptimization: boolean;
        poolSize: number;
        threshold: number;
    };
    monitoring: {
        enabled: boolean;
        metricsInterval: number;
        alertThresholds: {
            latency: number;
            errorRate: number;
            memoryUsage: number;
        };
    };
}
/**
 * Performance Metrics
 */
export interface PerformanceMetrics {
    averageLatency: number;
    p95Latency: number;
    p99Latency: number;
    throughput: number;
    cacheHitRate: number;
    cacheMissRate: number;
    cacheSize: number;
    searchLatency: number;
    searchAccuracy: number;
    speedupFactor: number;
    memoryUsage: number;
    memoryEfficiency: number;
    compressionRatio: number;
    errorRate: number;
    timeoutRate: number;
    successRate: number;
    cpuUsage: number;
    networkIO: number;
    diskIO: number;
}
/**
 * Caching Engine
 */
export declare class CachingEngine {
    private cache;
    private accessOrder;
    private config;
    constructor(config: PerformanceConfig['caching']);
    /**
     * Get value from cache
     */
    get(key: string): any | null;
    /**
     * Set value in cache
     */
    set(key: string, value: any): void;
    /**
     * Clear cache
     */
    clear(): void;
    /**
     * Get cache statistics
     */
    getStats(): CacheStats;
    private updateAccess;
    private removeFromAccessOrder;
    private evict;
    private compress;
    private decompress;
    private calculateSize;
    private calculateHitRate;
    private calculateMemoryUsage;
    private calculateCompressionRatio;
    private recordHit;
    private recordMiss;
}
/**
 * Vector Search Optimizer
 */
export declare class VectorSearchOptimizer {
    private agentDB;
    private config;
    private searchCache;
    private metrics;
    constructor(agentDB: AgentDBAdapter, config: PerformanceConfig['vectorSearch']);
    /**
     * Optimized vector search with caching and MMR
     */
    optimizedSearch(queryEmbedding: number[], options: SearchOptions): Promise<OptimizedSearchResult>;
    /**
     * Execute optimized search with HNSW and MMR
     */
    private executeOptimizedSearch;
    /**
     * Post-process search results
     */
    private postProcessResults;
    /**
     * Batch search for multiple queries
     */
    batchSearch(queries: Array<{
        embedding: number[];
        options: SearchOptions;
    }>): Promise<BatchSearchResult>;
    /**
     * Get current performance metrics
     */
    getMetrics(): PerformanceMetrics;
    /**
     * Get search optimization statistics
     */
    getOptimizationStats(): SearchOptimizationStats;
    private generateCacheKey;
    private calculateSpeedupFactor;
    private calculateDiversityScore;
    private calculateRelevanceScore;
    private calculatePatternDistance;
    private initializeMetrics;
    private updateMetrics;
}
/**
 * Parallel Execution Manager
 */
export declare class ParallelExecutionManager {
    private config;
    private activeTasks;
    private metrics;
    constructor(config: PerformanceConfig['parallelism']);
    /**
     * Execute tasks in parallel with controlled concurrency
     */
    executeParallel<T>(tasks: Array<Task<T>>, options?: ParallelExecutionOptions): Promise<ParallelExecutionResult<T>>;
    /**
     * Execute a single batch of tasks
     */
    private executeBatch;
    /**
     * Execute a single task
     */
    private executeTask;
    /**
     * Create task batches based on load balancing strategy
     */
    private createBatches;
    /**
     * Create adaptive batch based on task complexity
     */
    private createAdaptiveBatch;
    /**
     * Calculate speedup factor
     */
    private calculateSpeedup;
    /**
     * Get current execution metrics
     */
    getMetrics(): PerformanceMetrics;
    /**
     * Get active tasks status
     */
    getActiveTasks(): TaskExecution[];
    private initializeMetrics;
}
export interface CacheEntry {
    key: string;
    value: any;
    timestamp: number;
    compressed: boolean;
    size: number;
}
export interface CacheStats {
    size: number;
    maxSize: number;
    hitRate: number;
    memoryUsage: number;
    compressionRatio: number;
}
export interface SearchOptions {
    k: number;
    domain?: string;
    filters?: Record<string, any>;
    hybridWeights?: {
        vectorSimilarity: number;
        metadataScore: number;
    };
}
export interface SearchResult {
    patterns: any[];
    context: string;
    confidence: number;
    searchLatency: number;
    cacheHitRate: number;
    diversityScore: number;
    relevanceScore: number;
}
export interface OptimizedSearchResult extends SearchResult {
    fromCache: boolean;
    searchTime: number;
    speedupFactor: number;
}
export interface BatchSearchResult {
    results: (SearchResult | null)[];
    totalTime: number;
    averageTimePerQuery: number;
    batchSize: number;
    successRate: number;
}
export interface SearchOptimizationStats {
    searchMetrics: PerformanceMetrics;
    cacheStats: CacheStats;
    optimizationConfig: PerformanceConfig['vectorSearch'];
    speedupAchieved: number;
    targetSpeedup: number;
    targetMet: boolean;
}
export interface Task<T> {
    id: string;
    execute: () => Promise<T>;
    priority?: number;
    estimatedDuration?: number;
}
export interface TaskExecution {
    id: string;
    startTime: number;
    endTime?: number;
    status: 'running' | 'completed' | 'failed';
    error?: string;
}
export interface BatchResult<T> {
    results: T[];
    executionTime: number;
    concurrencyUsed: number;
    successRate: number;
}
export interface ParallelExecutionOptions {
    maxConcurrency?: number;
    batchSize?: number;
    timeoutMs?: number;
}
export interface ParallelExecutionResult<T> {
    results: T[];
    totalTime: number;
    tasksExecuted: number;
    concurrencyAchieved: number;
    speedupFactor: number;
    successRate: number;
    error?: string;
}
export declare const DEFAULT_PERFORMANCE_CONFIG: PerformanceConfig;
//# sourceMappingURL=performance-optimizer.d.ts.map