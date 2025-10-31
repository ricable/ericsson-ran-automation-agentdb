/**
 * RAN Data Ingestion Layer
 * High-performance data ingestion with temporal reasoning and real-time processing
 */
import { StreamMessage, StreamAgent } from '../stream-chain/core';
export interface RANMetrics {
    timestamp: number;
    source: string;
    cellId: string;
    kpis: {
        rsrp: number;
        rsrq: number;
        rssi: number;
        sinr: number;
        throughput: {
            dl: number;
            ul: number;
        };
        latency: {
            dl: number;
            ul: number;
        };
        energyConsumption: number;
        energyEfficiency: number;
        handoverSuccess: number;
        handoverLatency: number;
        coverageArea: number;
        signalStrength: number[];
    };
    moClasses: {
        [moClass: string]: {
            parameters: {
                [param: string]: number;
            };
            status: string;
            lastUpdate: number;
        };
    };
    environment: {
        timeOfDay: number;
        dayOfWeek: number;
        season: string;
        weatherConditions: string;
        eventIndicators: string[];
    };
}
export interface IngestionConfig {
    sources: DataSource[];
    bufferSize: number;
    batchSize: number;
    batchTimeout: number;
    compressionEnabled: boolean;
    temporalReasoningEnabled: boolean;
    realTimeProcessing: boolean;
    anomalyDetection: boolean;
}
export interface DataSource {
    id: string;
    type: 'ericsson-oss' | 'counter-manager' | 'probe' | 'simulator' | 'file' | 'api';
    endpoint: string;
    credentials?: {
        username?: string;
        password?: string;
        apiKey?: string;
        certificate?: string;
    };
    pollingInterval: number;
    dataFormat: 'json' | 'xml' | 'csv' | 'binary';
    compression: 'gzip' | 'lz4' | 'none';
    filters: {
        cellIds?: string[];
        moClasses?: string[];
        kpiRanges?: {
            [kpi: string]: {
                min: number;
                max: number;
            };
        };
    };
}
export declare class RANIngestionAgent implements StreamAgent {
    id: string;
    type: "ingestion";
    name: string;
    capabilities: string[];
    temporalReasoning: boolean;
    errorHandling: {
        strategy: "self-heal";
        maxAttempts: number;
        recoveryPattern: "exponential";
    };
    private config;
    private dataSources;
    private activeConnections;
    private temporalProcessor;
    private anomalyDetector;
    private dataBuffer;
    constructor(config: IngestionConfig);
    /**
     * Process incoming data streams
     */
    process(message: StreamMessage): Promise<StreamMessage>;
    /**
     * Start data ingestion from configured sources
     */
    startIngestion(): Promise<void>;
    /**
     * Stop data ingestion
     */
    stopIngestion(): Promise<void>;
    /**
     * Connect to data source
     */
    private connectToSource;
    /**
     * Connect to Ericsson OSS
     */
    private connectToEricssonOSS;
    /**
     * Connect to REST API
     */
    private connectToAPI;
    /**
     * Connect to file source
     */
    private connectToFile;
    /**
     * Connect to simulator
     */
    private connectToSimulator;
    /**
     * Start polling for data
     */
    private startPolling;
    /**
     * Fetch data from source
     */
    private fetchData;
    /**
     * Fetch from Ericsson OSS
     */
    private fetchFromEricssonOSS;
    /**
     * Fetch from REST API
     */
    private fetchFromAPI;
    /**
     * Fetch from file
     */
    private fetchFromFile;
    /**
     * Fetch from simulator
     */
    private fetchFromSimulator;
    /**
     * Check if metrics pass filters
     */
    private passesFilters;
    /**
     * Get KPI value by name
     */
    private getKPIValue;
    /**
     * Calculate load factor based on time of day
     */
    private calculateLoadFactor;
    /**
     * Get current season
     */
    private getCurrentSeason;
    /**
     * Get random weather condition
     */
    private getRandomWeather;
    /**
     * Convert message to RAN metrics
     */
    private convertToRANMetrics;
    /**
     * Convert features to RAN metrics
     */
    private convertFeaturesToMetrics;
    /**
     * Check if buffer should be flushed
     */
    private shouldFlushBuffer;
    /**
     * Process batch of metrics
     */
    private processBatch;
    /**
     * Compress batch data
     */
    private compressBatch;
    /**
     * Disconnect from data source
     */
    private disconnectFromSource;
    /**
     * Generate unique ID
     */
    private generateId;
    /**
     * Get ingestion status
     */
    getStatus(): any;
}
export default RANIngestionAgent;
//# sourceMappingURL=ran-ingestion.d.ts.map