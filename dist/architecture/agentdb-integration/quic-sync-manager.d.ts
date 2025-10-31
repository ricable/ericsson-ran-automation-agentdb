/**
 * QUIC Synchronization Manager for AgentDB Integration
 *
 * High-performance synchronization layer achieving <1ms sync times
 * for distributed ML training and swarm coordination.
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
import { Logger } from 'winston';
export interface QUICConnectionConfig {
    targetNodes: string[];
    port: number;
    maxConnections: number;
    connectionTimeout: number;
    keepAliveInterval: number;
    maxRetransmission: number;
    congestionControl: 'bbr' | 'cubic' | 'reno';
}
export interface SyncData {
    id: string;
    type: SyncDataType;
    payload: any;
    timestamp: Date;
    priority: Priority;
    compression: CompressionType;
    encryption: boolean;
}
export declare enum SyncDataType {
    MODEL_UPDATE = "model_update",
    EXPERIENCE_BATCH = "experience_batch",
    CAUSAL_GRAPH = "causal_graph",
    PATTERN_UPDATE = "pattern_update",
    COORDINATION_MESSAGE = "coordination_message",
    PERFORMANCE_METRICS = "performance_metrics"
}
export declare enum Priority {
    CRITICAL = 1,
    HIGH = 2,
    MEDIUM = 3,
    LOW = 4
}
export declare enum CompressionType {
    NONE = "none",
    LZ4 = "lz4",
    ZSTD = "zstd",
    GZIP = "gzip"
}
export interface SyncResult {
    success: boolean;
    nodeId: string;
    syncId: string;
    latency: number;
    dataSize: number;
    compressionRatio: number;
    error?: Error;
    timestamp: Date;
}
export interface SyncMetrics {
    totalSyncs: number;
    successfulSyncs: number;
    failedSyncs: number;
    averageLatency: number;
    averageThroughput: number;
    compressionSavings: number;
    connectionPoolUtilization: number;
    retryRate: number;
}
export interface ConnectionPool {
    acquire(targetNode: string): Promise<QUICConnection>;
    release(connection: QUICConnection): Promise<void>;
    getConnectionStatus(): Map<string, ConnectionStatus>;
    closeAll(): Promise<void>;
}
export interface QUICConnection {
    id: string;
    targetNode: string;
    isConnected: boolean;
    lastUsed: Date;
    sendSync(data: SyncData): Promise<SyncResult>;
    close(): Promise<void>;
    getConnectionMetrics(): ConnectionMetrics;
}
export interface ConnectionStatus {
    connected: boolean;
    lastPing: Date;
    latency: number;
    bandwidth: number;
    packetLoss: number;
    congestionWindow: number;
}
export interface ConnectionMetrics {
    bytesTransmitted: number;
    bytesReceived: number;
    packetsTransmitted: number;
    packetsReceived: number;
    retransmissions: number;
    rtt: number;
    cwnd: number;
}
export declare class QUICSynchronizationManager extends EventEmitter {
    private connectionPool;
    private compressionEngine;
    private encryptionService;
    private metricsCollector;
    private retryPolicy;
    private logger;
    private config;
    private activeConnections;
    private syncQueue;
    private bandwidthManager;
    private healthChecker;
    constructor(config: QUICConnectionConfig, logger: Logger);
    private initializeComponents;
    private setupEventHandlers;
    /**
     * Synchronize data with target nodes using QUIC protocol
     *
     * @param data Data to synchronize
     * @param targetNodes Target node identifiers
     * @returns Array of sync results
     */
    synchronizeData(data: SyncData, targetNodes?: string[]): Promise<SyncResult[]>;
    /**
     * Subscribe to real-time updates from specific topics
     *
     * @param topics Topics to subscribe to
     * @param callback Callback function for updates
     */
    subscribeToUpdates(topics: string[], callback: UpdateCallback): Promise<void>;
    /**
     * Publish updates to subscribers
     *
     * @param topic Topic to publish to
     * @param update Update data
     */
    publishUpdate(topic: string, update: any): Promise<void>;
    /**
     * Get connection status for all target nodes
     *
     * @returns Map of connection statuses
     */
    getConnectionStatus(): Promise<Map<string, ConnectionStatus>>;
    /**
     * Get comprehensive synchronization metrics
     *
     * @returns Sync metrics object
     */
    getSyncMetrics(): SyncMetrics;
    /**
     * Optimize connection parameters based on current network conditions
     */
    optimizeConnections(): Promise<void>;
    private preprocessData;
    private processSyncQueue;
    private processSyncBatch;
    private syncWithNode;
    private calculateOptimalBatchSize;
    private collectSyncMetrics;
    private updateConnectionParameters;
    private updateConnectionMetrics;
    private handleDegradedConnection;
    private processSyncData;
    private handleModelUpdate;
    private handleExperienceBatch;
    private handleCausalGraphUpdate;
    private handlePatternUpdate;
    private generateSyncId;
    private getSystemLoad;
    /**
     * Start the QUIC synchronization manager
     */
    start(): Promise<void>;
    /**
     * Stop the QUIC synchronization manager
     */
    stop(): Promise<void>;
}
export declare class CompressionEngine {
    compress(data: any, type: CompressionType): Promise<any>;
    private compressLZ4;
    private compressZSTD;
    private compressGzip;
}
export declare class EncryptionService {
    encrypt(data: any): Promise<any>;
    decrypt(data: any): Promise<any>;
}
export declare class MetricsCollector {
    private metrics;
    recordSync(metrics: any): void;
    recordConnectionMetrics(nodeId: string, metrics: ConnectionMetrics): void;
    getMetrics(): SyncMetrics;
    private updateRollingAverages;
}
export declare class PrioritySyncQueue {
    private queue;
    private emitter;
    enqueue(data: SyncData, targets: string[]): void;
    dequeueBatch(batchSize: number): Array<{
        data: SyncData;
        targets: string[];
    }>;
    isEmpty(): boolean;
    on(event: string, listener: Function): void;
}
export type UpdateCallback = (topic: string, data: any) => void;
export interface ConnectionParameters {
    maxStreamId?: number;
    idleTimeout?: number;
    maxPacketSize?: number;
    congestionControl?: string;
}
export interface NetworkConditions {
    latency: number;
    bandwidth: number;
    packetLoss: number;
}
export interface SystemMetrics {
    cpuUsage: number;
    memoryUsage: number;
    networkIO: number;
}
//# sourceMappingURL=quic-sync-manager.d.ts.map