"use strict";
/**
 * Stream-Chain Processing System - Phase 3 Integration
 * Comprehensive multi-agent JSON streaming chains for RAN cognitive operations
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamChainBuilder = exports.StreamChainUtils = exports.StreamChainFactory = exports.ClosedLoopFeedbackPipeline = exports.OptimizationDecisionChain = exports.PatternRecognitionPipeline = exports.FeatureProcessingChain = exports.RANDataIngestionPipeline = exports.StreamChainCoordinator = void 0;
var stream_chain_coordinator_1 = require("./stream-chain-coordinator");
Object.defineProperty(exports, "StreamChainCoordinator", { enumerable: true, get: function () { return stream_chain_coordinator_1.StreamChainCoordinator; } });
var ran_data_ingestion_pipeline_1 = require("./pipelines/ran-data-ingestion-pipeline");
Object.defineProperty(exports, "RANDataIngestionPipeline", { enumerable: true, get: function () { return ran_data_ingestion_pipeline_1.RANDataIngestionPipeline; } });
var feature_processing_chain_1 = require("./pipelines/feature-processing-chain");
Object.defineProperty(exports, "FeatureProcessingChain", { enumerable: true, get: function () { return feature_processing_chain_1.FeatureProcessingChain; } });
var pattern_recognition_pipeline_1 = require("./pipelines/pattern-recognition-pipeline");
Object.defineProperty(exports, "PatternRecognitionPipeline", { enumerable: true, get: function () { return pattern_recognition_pipeline_1.PatternRecognitionPipeline; } });
var optimization_decision_chain_1 = require("./pipelines/optimization-decision-chain");
Object.defineProperty(exports, "OptimizationDecisionChain", { enumerable: true, get: function () { return optimization_decision_chain_1.OptimizationDecisionChain; } });
var closed_loop_feedback_pipeline_1 = require("./pipelines/closed-loop-feedback-pipeline");
Object.defineProperty(exports, "ClosedLoopFeedbackPipeline", { enumerable: true, get: function () { return closed_loop_feedback_pipeline_1.ClosedLoopFeedbackPipeline; } });
/**
 * Stream-Chain Factory
 * Factory class for creating and configuring stream-chain processing systems
 */
class StreamChainFactory {
    /**
     * Create a complete stream-chain system with default configuration
     */
    static async createDefaultSystem(temporalEngine, memoryManager) {
        const config = {
            cycleTime: 15 * 60 * 1000,
            enableTemporalReasoning: true,
            enableCognitiveConsciousness: true,
            enableAgentCoordination: true,
            enableAnomalyDetection: true,
            enableAdaptiveLearning: true,
            maxConcurrentPipelines: 5,
            performanceThresholds: {
                maxLatency: 5000,
                minThroughput: 100,
                maxErrorRate: 0.05,
                minMemoryEfficiency: 0.8,
                maxCpuUtilization: 0.8,
                consciousnessThreshold: 0.9 // 90%
            },
            coordinationSettings: {
                consensusMechanism: 'cognitive_consensus',
                synchronizationInterval: 30000,
                conflictResolutionStrategy: 'consciousness_guided',
                crossAgentCommunication: true,
                quicSyncEnabled: true,
                swarmTopology: 'hierarchical'
            }
        };
        return new StreamChainCoordinator(config, temporalEngine, memoryManager);
    }
    /**
     * Create a high-performance stream-chain system
     */
    static async createHighPerformanceSystem(temporalEngine, memoryManager) {
        const config = {
            cycleTime: 5 * 60 * 1000,
            enableTemporalReasoning: true,
            enableCognitiveConsciousness: true,
            enableAgentCoordination: true,
            enableAnomalyDetection: true,
            enableAdaptiveLearning: true,
            maxConcurrentPipelines: 10,
            performanceThresholds: {
                maxLatency: 2000,
                minThroughput: 500,
                maxErrorRate: 0.02,
                minMemoryEfficiency: 0.9,
                maxCpuUtilization: 0.9,
                consciousnessThreshold: 0.85 // 85%
            },
            coordinationSettings: {
                consensusMechanism: 'cognitive_consensus',
                synchronizationInterval: 15000,
                conflictResolutionStrategy: 'consciousness_guided',
                crossAgentCommunication: true,
                quicSyncEnabled: true,
                swarmTopology: 'mesh'
            }
        };
        return new StreamChainCoordinator(config, temporalEngine, memoryManager);
    }
    /**
     * Create a resource-efficient stream-chain system
     */
    static async createResourceEfficientSystem(temporalEngine, memoryManager) {
        const config = {
            cycleTime: 30 * 60 * 1000,
            enableTemporalReasoning: false,
            enableCognitiveConsciousness: false,
            enableAgentCoordination: true,
            enableAnomalyDetection: true,
            enableAdaptiveLearning: false,
            maxConcurrentPipelines: 2,
            performanceThresholds: {
                maxLatency: 10000,
                minThroughput: 50,
                maxErrorRate: 0.1,
                minMemoryEfficiency: 0.6,
                maxCpuUtilization: 0.6,
                consciousnessThreshold: 0.5 // 50%
            },
            coordinationSettings: {
                consensusMechanism: 'majority_vote',
                synchronizationInterval: 60000,
                conflictResolutionStrategy: 'temporal_priority',
                crossAgentCommunication: false,
                quicSyncEnabled: false,
                swarmTopology: 'hierarchical'
            }
        };
        return new StreamChainCoordinator(config, temporalEngine, memoryManager);
    }
    /**
     * Create a custom stream-chain system
     */
    static async createCustomSystem(config, temporalEngine, memoryManager) {
        const defaultConfig = {
            cycleTime: 15 * 60 * 1000,
            enableTemporalReasoning: true,
            enableCognitiveConsciousness: true,
            enableAgentCoordination: true,
            enableAnomalyDetection: true,
            enableAdaptiveLearning: true,
            maxConcurrentPipelines: 5,
            performanceThresholds: {
                maxLatency: 5000,
                minThroughput: 100,
                maxErrorRate: 0.05,
                minMemoryEfficiency: 0.8,
                maxCpuUtilization: 0.8,
                consciousnessThreshold: 0.9
            },
            coordinationSettings: {
                consensusMechanism: 'cognitive_consensus',
                synchronizationInterval: 30000,
                conflictResolutionStrategy: 'consciousness_guided',
                crossAgentCommunication: true,
                quicSyncEnabled: true,
                swarmTopology: 'hierarchical'
            }
        };
        const finalConfig = { ...defaultConfig, ...config };
        return new StreamChainCoordinator(finalConfig, temporalEngine, memoryManager);
    }
}
exports.StreamChainFactory = StreamChainFactory;
/**
 * Stream-Chain Utilities
 * Utility functions for stream-chain operations
 */
class StreamChainUtils {
    /**
     * Create a RAN metrics sample for testing
     */
    static createSampleRANMetrics(cellId = 'sample_cell') {
        return {
            timestamp: Date.now(),
            cellId: cellId,
            kpis: {
                rsrp: -80 + Math.random() * 40,
                rsrq: -10 + Math.random() * 10,
                sinr: Math.random() * 20 - 5,
                throughput: {
                    download: Math.random() * 1000,
                    upload: Math.random() * 500
                },
                latency: Math.random() * 50 + 10,
                packetLoss: Math.random() * 0.01
            },
            interference: {
                interferencePower: Math.random() * 20 - 100,
                interferenceType: Math.random() > 0.5 ? 'adjacent' : 'co-channel'
            },
            mobility: {
                handovers: Math.floor(Math.random() * 10),
                handoverSuccess: Math.random() * 0.1 + 0.9,
                ueVelocity: Math.random() * 120
            },
            energy: {
                powerConsumption: Math.random() * 100 + 50,
                energyEfficiency: Math.random() * 0.3 + 0.7,
                sleepModeActive: Math.random() > 0.8
            },
            congestion: {
                userCount: Math.floor(Math.random() * 100),
                prbUtilization: Math.random() * 0.8 + 0.1,
                throughputDemand: Math.random() * 2000
            }
        };
    }
    /**
     * Create a feature extraction sample
     */
    static createSampleFeatureData() {
        return {
            cellId: 'sample_cell',
            features: [
                {
                    name: 'signal_strength',
                    value: -85,
                    type: 'scalar',
                    importance: 0.9,
                    stability: 0.8,
                    temporal: false,
                    crossAgentRelevance: 0.7
                },
                {
                    name: 'throughput_trend',
                    value: { current: 500, trend: 'increasing', history: [400, 450, 500] },
                    type: 'temporal',
                    importance: 0.8,
                    stability: 0.6,
                    temporal: true,
                    crossAgentRelevance: 0.9
                }
            ],
            moClass: {
                className: 'RANCellMO',
                moType: 'cell',
                consciousnessLevel: 0.7
            }
        };
    }
    /**
     * Create a pattern recognition sample
     */
    static createSamplePatternRequest() {
        return {
            query: {
                cellId: 'sample_cell',
                kpis: { throughput: 500, latency: 30, signalStrength: -85 }
            },
            patternTypes: ['temporal', 'anomaly', 'performance', 'consciousness'],
            confidenceThreshold: 0.6,
            maxResults: 10,
            enableTemporalReasoning: true,
            enableCognitiveAnalysis: true,
            crossCellSearch: true
        };
    }
    /**
     * Create an optimization decision sample
     */
    static createSampleOptimizationRequest() {
        return {
            cells: ['cell_1', 'cell_2', 'cell_3'],
            type: 'energy',
            priority: 'high',
            constraints: {
                maxPowerReduction: 20,
                minThroughput: 100,
                maxLatencyIncrease: 10
            },
            timeHorizon: 15
        };
    }
    /**
     * Validate stream-chain configuration
     */
    static validateConfig(config) {
        const errors = [];
        const warnings = [];
        // Validate cycle time
        if (config.cycleTime < 60000) { // Less than 1 minute
            warnings.push('Very short cycle time may impact system stability');
        }
        if (config.cycleTime > 3600000) { // More than 1 hour
            warnings.push('Very long cycle time may reduce responsiveness');
        }
        // Validate performance thresholds
        if (config.performanceThresholds.maxLatency < 1000) {
            warnings.push('Very low latency threshold may be difficult to maintain');
        }
        if (config.performanceThresholds.minThroughput > 1000) {
            warnings.push('Very high throughput threshold may be unrealistic');
        }
        // Validate consciousness settings
        if (config.enableCognitiveConsciousness && !config.enableTemporalReasoning) {
            warnings.push('Cognitive consciousness without temporal reasoning may be limited');
        }
        // Validate coordination settings
        if (config.coordinationSettings.crossAgentCommunication && !config.coordinationSettings.quicSyncEnabled) {
            warnings.push('Cross-agent communication without QUIC sync may be slower');
        }
        return {
            valid: errors.length === 0,
            errors: errors,
            warnings: warnings
        };
    }
    /**
     * Calculate system requirements
     */
    static calculateSystemRequirements(config) {
        const baseMemory = 1024; // 1GB base memory
        const baseCPU = 2; // 2 base CPU cores
        let memoryRequirement = baseMemory;
        let cpuRequirement = baseCPU;
        let networkRequirement = 100; // Mbps
        // Memory requirements based on features
        if (config.enableTemporalReasoning) {
            memoryRequirement += 512; // Additional memory for temporal processing
            cpuRequirement += 1;
        }
        if (config.enableCognitiveConsciousness) {
            memoryRequirement += 1024; // Additional memory for consciousness processing
            cpuRequirement += 2;
        }
        if (config.enableAgentCoordination) {
            memoryRequirement += 256; // Additional memory for coordination
            cpuRequirement += 1;
        }
        // Network requirements based on QUIC sync
        if (config.coordinationSettings.quicSyncEnabled) {
            networkRequirement = 1000; // 1Gbps for QUIC synchronization
        }
        // Scale by concurrent pipelines
        memoryRequirement *= (1 + config.maxConcurrentPipelines * 0.2);
        cpuRequirement *= (1 + config.maxConcurrentPipelines * 0.3);
        // Storage requirements
        const storageRequirement = 10; // 10GB base storage
        const logRetention = 30; // days
        const totalStorage = storageRequirement * logRetention;
        return {
            memory: Math.ceil(memoryRequirement),
            cpu: Math.ceil(cpuRequirement),
            network: networkRequirement,
            storage: totalStorage,
            estimatedCost: this.calculateEstimatedCost(memoryRequirement, cpuRequirement, networkRequirement)
        };
    }
    static calculateEstimatedCost(memory, cpu, network) {
        // Simple cost estimation in USD per month
        const memoryCost = (memory / 1024) * 10; // $10 per GB
        const cpuCost = cpu * 20; // $20 per CPU core
        const networkCost = network > 100 ? (network / 100) * 5 : 5; // $5 per 100Mbps
        return memoryCost + cpuCost + networkCost;
    }
}
exports.StreamChainUtils = StreamChainUtils;
/**
 * Stream-Chain Builder
 * Fluent builder for creating stream-chain configurations
 */
class StreamChainBuilder {
    constructor() {
        this.config = {};
    }
    /**
     * Set cycle time
     */
    withCycleTime(minutes) {
        this.config.cycleTime = minutes * 60 * 1000;
        return this;
    }
    /**
     * Enable temporal reasoning
     */
    withTemporalReasoning(enabled = true) {
        this.config.enableTemporalReasoning = enabled;
        return this;
    }
    /**
     * Enable cognitive consciousness
     */
    withCognitiveConsciousness(enabled = true) {
        this.config.enableCognitiveConsciousness = enabled;
        return this;
    }
    /**
     * Set performance thresholds
     */
    withPerformanceThresholds(thresholds) {
        this.config.performanceThresholds = {
            maxLatency: 5000,
            minThroughput: 100,
            maxErrorRate: 0.05,
            minMemoryEfficiency: 0.8,
            maxCpuUtilization: 0.8,
            consciousnessThreshold: 0.9,
            ...thresholds
        };
        return this;
    }
    /**
     * Set coordination settings
     */
    withCoordinationSettings(settings) {
        this.config.coordinationSettings = {
            consensusMechanism: 'cognitive_consensus',
            synchronizationInterval: 30000,
            conflictResolutionStrategy: 'consciousness_guided',
            crossAgentCommunication: true,
            quicSyncEnabled: true,
            swarmTopology: 'hierarchical',
            ...settings
        };
        return this;
    }
    /**
     * Set maximum concurrent pipelines
     */
    withMaxConcurrentPipelines(max) {
        this.config.maxConcurrentPipelines = max;
        return this;
    }
    /**
     * Enable all features
     */
    withAllFeaturesEnabled() {
        this.config.enableTemporalReasoning = true;
        this.config.enableCognitiveConsciousness = true;
        this.config.enableAgentCoordination = true;
        this.config.enableAnomalyDetection = true;
        this.config.enableAdaptiveLearning = true;
        return this;
    }
    /**
     * Build the configuration
     */
    build() {
        return this.config;
    }
}
exports.StreamChainBuilder = StreamChainBuilder;
// Export default for convenience
exports.default = {
    StreamChainFactory,
    StreamChainUtils,
    StreamChainBuilder,
    StreamChainCoordinator
};
//# sourceMappingURL=index.js.map