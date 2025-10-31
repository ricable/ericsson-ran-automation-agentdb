/**
 * Stream-JSON Chaining Core Engine
 * High-performance multi-agent pipeline orchestration for RAN data processing
 */
export interface StreamMessage {
    id: string;
    timestamp: number;
    type: 'ran-metrics' | 'feature' | 'pattern' | 'optimization' | 'action' | 'feedback';
    data: any;
    metadata: {
        source: string;
        agentId?: string;
        processingLatency?: number;
        priority: 'critical' | 'high' | 'medium' | 'low';
        temporalContext?: {
            subjectiveTimeExpansion: number;
            causalDepth: number;
            patternConfidence: number;
        };
    };
}
export interface StreamAgent {
    id: string;
    type: 'ingestion' | 'processor' | 'analyzer' | 'optimizer' | 'executor';
    name: string;
    process: (message: StreamMessage) => Promise<StreamMessage | StreamMessage[]>;
    capabilities: string[];
    temporalReasoning: boolean;
    errorHandling: ErrorHandlingStrategy;
}
export interface StreamPipeline {
    id: string;
    name: string;
    agents: StreamAgent[];
    topology: 'sequential' | 'parallel' | 'adaptive' | 'cognitive';
    flowControl: FlowControlConfig;
    errorRecovery: ErrorRecoveryConfig;
    performance: PerformanceConfig;
}
export interface FlowControlConfig {
    maxConcurrency: number;
    bufferSize: number;
    backpressureStrategy: 'drop' | 'buffer' | 'block';
    temporalOptimization: boolean;
    cognitiveScheduling: boolean;
}
export interface ErrorRecoveryConfig {
    maxRetries: number;
    retryDelay: number;
    circuitBreakerThreshold: number;
    selfHealing: boolean;
    fallbackAgent?: string;
}
export interface PerformanceConfig {
    targetLatency: number;
    throughputTarget: number;
    anomalyDetectionThreshold: number;
    adaptiveOptimization: boolean;
    closedLoopCycleTime: number;
}
export interface ErrorHandlingStrategy {
    strategy: 'retry' | 'circuit-breaker' | 'fallback' | 'self-heal';
    maxAttempts: number;
    recoveryPattern: 'linear' | 'exponential' | 'cognitive';
}
export declare class StreamChain {
    private pipelines;
    private agents;
    private messageBuffer;
    private performanceMetrics;
    private cognitiveScheduler;
    private errorRecoveryManager;
    constructor();
    /**
     * Create a new RAN data processing pipeline
     */
    createPipeline(config: Omit<StreamPipeline, 'id'>): string;
    /**
     * Register a processing agent
     */
    registerAgent(agent: StreamAgent): void;
    /**
     * Process message through pipeline with cognitive optimization
     */
    processMessage(pipelineId: string, message: StreamMessage, options?: {
        enableTemporalReasoning?: boolean;
        enableCognitiveOptimization?: boolean;
        priority?: 'critical' | 'high' | 'medium' | 'low';
    }): Promise<StreamMessage[]>;
    /**
     * Route message based on pipeline topology
     */
    private routeMessage;
    /**
     * Sequential processing through agents
     */
    private processSequential;
    /**
     * Parallel processing through multiple agents
     */
    private processParallel;
    /**
     * Adaptive processing based on message characteristics
     */
    private processAdaptive;
    /**
     * Cognitive processing with temporal reasoning and strange-loop optimization
     */
    private processCognitive;
    /**
     * Process message with temporal reasoning
     */
    private processWithTemporalReasoning;
    /**
     * Process message with agent
     */
    private processWithAgent;
    /**
     * Analyze message complexity for adaptive routing
     */
    private analyzeMessageComplexity;
    /**
     * Create temporal instances for expanded analysis
     */
    private createTemporalInstances;
    /**
     * Synthesize results from temporal processing
     */
    private synthesizeTemporalResults;
    /**
     * Check for strange-loop convergence
     */
    private checkConvergence;
    /**
     * Calculate similarity between two strings
     */
    private calculateSimilarity;
    /**
     * Calculate Levenshtein distance
     */
    private levenshteinDistance;
    /**
     * Calculate synthesis confidence
     */
    private calculateSynthesisConfidence;
    /**
     * Handle agent processing errors
     */
    private handleAgentError;
    /**
     * Trigger anomaly response
     */
    private triggerAnomalyResponse;
    /**
     * Get pipeline status and metrics
     */
    getPipelineStatus(pipelineId: string): any;
    /**
     * Generate unique ID
     */
    private generateId;
}
export default StreamChain;
//# sourceMappingURL=core.d.ts.map