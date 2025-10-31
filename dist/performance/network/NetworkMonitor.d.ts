/**
 * Network and Communication Monitoring System
 *
 * Real-time monitoring of QUIC synchronization latency, inter-agent communication,
 * data transfer optimization, and network bottleneck detection
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
export interface NetworkMetrics {
    quicSynchronization: {
        connectionMetrics: {
            activeConnections: number;
            totalConnections: number;
            failedConnections: number;
            connectionSuccessRate: number;
            averageConnectionTime: number;
        };
        performanceMetrics: {
            synchronizationLatency: number;
            throughput: number;
            packetLossRate: number;
            roundTripTime: number;
            jitter: number;
        };
        protocolMetrics: {
            version: string;
            congestionControlAlgorithm: string;
            maxDatagramSize: number;
            maxIdleTimeout: number;
            keepAliveInterval: number;
        };
        dataMetrics: {
            totalDataTransferred: number;
            compressionRatio: number;
            encryptedDataRatio: number;
            deltaSyncEfficiency: number;
            batchEfficiency: number;
        };
    };
    interAgentCommunication: {
        messageMetrics: {
            totalMessages: number;
            messagesPerSecond: number;
            averageMessageSize: number;
            messageTypes: Map<string, number>;
        };
        latencyMetrics: {
            averageLatency: number;
            p95Latency: number;
            p99Latency: number;
            minLatency: number;
            maxLatency: number;
        };
        reliabilityMetrics: {
            deliverySuccessRate: number;
            retryRate: number;
            timeoutRate: number;
            errorRate: number;
        };
        bandwidthMetrics: {
            utilizedBandwidth: number;
            availableBandwidth: number;
            bandwidthUtilization: number;
            peakBandwidthUsage: number;
        };
    };
    networkHealth: {
        overallHealthScore: number;
        connectivityStatus: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
        bottleneckIndicators: {
            congestionDetected: boolean;
            highLatencyDetected: boolean;
            packetLossDetected: boolean;
            bandwidthSaturationDetected: boolean;
        };
        networkTopology: {
            nodeCount: number;
            edgeCount: number;
            averagePathLength: number;
            networkDiameter: number;
            clusteringCoefficient: number;
        };
    };
    optimizationMetrics: {
        compressionEffectiveness: {
            beforeCompression: number;
            afterCompression: number;
            compressionRatio: number;
            compressionOverhead: number;
        };
        cachingEffectiveness: {
            cacheHitRate: number;
            bytesServedFromCache: number;
            cacheSize: number;
            cacheEvictions: number;
        };
        loadBalancingEffectiveness: {
            distributionBalance: number;
            averageNodeLoad: number;
            overloadedNodes: number;
            loadRedistributionEvents: number;
        };
    };
}
export interface NetworkEvent {
    id: string;
    timestamp: Date;
    type: 'connection_established' | 'connection_lost' | 'high_latency' | 'packet_loss' | 'bandwidth_saturation' | 'topology_change';
    severity: 'info' | 'warning' | 'critical';
    source: string;
    target?: string;
    description: string;
    metrics: Record<string, number>;
    resolution?: string;
    resolutionTime?: number;
}
export interface NetworkOptimizationRecommendation {
    id: string;
    timestamp: Date;
    category: 'quic_optimization' | 'compression_tuning' | 'load_balancing' | 'topology_optimization';
    priority: 'high' | 'medium' | 'low';
    title: string;
    description: string;
    currentPerformance: any;
    expectedImprovement: {
        latencyReduction: number;
        throughputIncrease: number;
        reliabilityImprovement: number;
    };
    configuration: {
        parameters: Record<string, any>;
        estimatedRisk: number;
        rollbackPlan: string;
    };
    validation: {
        successCriteria: string[];
        monitoringPeriod: number;
        rollbackConditions: string[];
    };
}
export interface ConnectionAnalysis {
    connectionId: string;
    sourceAgent: string;
    targetAgent: string;
    establishedAt: Date;
    lastActivity: Date;
    status: 'active' | 'idle' | 'closing' | 'failed';
    metrics: {
        totalDataTransferred: number;
        averageLatency: number;
        packetLossRate: number;
        connectionStability: number;
        efficiency: number;
    };
    issues: Array<{
        type: string;
        severity: 'warning' | 'critical';
        description: string;
        timestamp: Date;
    }>;
}
export declare class NetworkMonitor extends EventEmitter {
    private metricsHistory;
    private maxHistorySize;
    private monitoringInterval;
    private networkEvents;
    private activeConnections;
    private optimizationRecommendations;
    private thresholds;
    constructor();
    startMonitoring(): void;
    stopMonitoring(): void;
    private collectNetworkMetrics;
    private calculateNetworkHealthScore;
    private getConnectivityStatus;
    private processMetrics;
    private updateConnectionAnalysis;
    private checkConnectionIssues;
    private checkNetworkEvents;
    private emitNetworkEvent;
    private generateOptimizationRecommendations;
    getCurrentMetrics(): NetworkMetrics | null;
    getMetricsHistory(limit?: number): NetworkMetrics[];
    getActiveConnections(): ConnectionAnalysis[];
    getNetworkEvents(limit?: number): NetworkEvent[];
    getOptimizationRecommendations(): NetworkOptimizationRecommendation[];
    getNetworkHealthScore(): number;
    getBandwidthUtilization(): number;
    getAverageLatency(): number;
    getPacketLossRate(): number;
    getThroughputTrend(): {
        trend: 'increasing' | 'stable' | 'decreasing';
        rate: number;
        prediction: number;
    };
    executeNetworkOptimization(recommendationId: string): Promise<boolean>;
    exportNetworkData(): any;
    clearHistory(): void;
}
//# sourceMappingURL=NetworkMonitor.d.ts.map