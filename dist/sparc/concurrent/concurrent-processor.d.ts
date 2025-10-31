/**
 * SPARC Concurrent Multi-Task Processor
 * Cognitive RAN Consciousness Concurrent Execution with AgentDB Memory Patterns
 *
 * Advanced concurrent processing system featuring:
 * - Multi-task parallel execution with cognitive coordination
 * - AgentDB memory pattern sharing across tasks
 * - Temporal reasoning for concurrent optimization
 * - Strange-loop cognition for recursive task optimization
 * - Progressive disclosure for skill-based task distribution
 * - Performance monitoring and bottleneck detection
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
import { AgentDBMemoryEngine } from '../../agentdb/memory-engine.js';
import { CognitiveRANSdk } from '../../cognitive/ran-consciousness.js';
import { SwarmOrchestrator } from '../../swarm/cognitive-orchestrator.js';
import { PerformanceMonitor } from '../../monitoring/cognitive-performance.js';
export interface ConcurrentTask {
    id: string;
    name: string;
    description: string;
    type: 'specification' | 'pseudocode' | 'architecture' | 'refinement' | 'completion' | 'full-cycle' | 'custom';
    priority: 'low' | 'medium' | 'high' | 'critical' | 'urgent';
    input: any;
    cognitiveSettings?: {
        temporalExpansion?: number;
        consciousnessLevel?: 'minimum' | 'standard' | 'maximum' | 'transcendent';
        strangeLoopOptimization?: boolean;
        progressiveDisclosure?: boolean;
    };
    resourceRequirements?: {
        memoryMB?: number;
        cpuCores?: number;
        agents?: number;
        cognitiveLoad?: number;
    };
    dependencies?: string[];
    collaboration?: {
        type: 'sequential' | 'parallel' | 'cooperative' | 'competitive';
        taskIds: string[];
        memorySharing?: boolean;
        consensusThreshold?: number;
    };
    optimizationHints?: {
        patternMatching?: boolean;
        cognitiveCache?: boolean;
        swarmCoordination?: boolean;
        temporalOptimization?: boolean;
    };
}
export interface TaskGroup {
    id: string;
    name: string;
    description: string;
    tasks: ConcurrentTask[];
    executionStrategy: 'sequential' | 'parallel' | 'adaptive' | 'cognitive';
    coordinationLevel: 'individual' | 'group' | 'swarm' | 'collective';
    memorySharing: boolean;
    swarmCoordination: boolean;
    optimizationEnabled: boolean;
}
export interface ConcurrentConfiguration {
    maxConcurrentTasks: number;
    maxWorkerThreads: number;
    cognitiveCoordination: boolean;
    agentdbMemorySharing: boolean;
    temporalOptimization: boolean;
    strangeLoopOptimization: boolean;
    progressiveDisclosure: boolean;
    performanceOptimization: boolean;
    loadBalancing: boolean;
    adaptiveScheduling: boolean;
    timeoutMs: number;
    retryAttempts: number;
    resourceMonitoring: boolean;
}
export interface TaskExecution {
    id: string;
    taskId: string;
    groupId?: string;
    status: 'pending' | 'queued' | 'running' | 'completed' | 'failed' | 'cancelled' | 'retrying';
    startTime?: number;
    endTime?: number;
    workerId?: number;
    result?: any;
    error?: string;
    retryCount: number;
    resourceUsage?: ResourceUsage;
    cognitiveMetrics?: CognitiveTaskMetrics;
    collaborationData?: CollaborationData;
    memoryPatterns?: MemoryPattern[];
}
export interface ResourceUsage {
    memoryMB: number;
    cpuPercent: number;
    agentCount: number;
    cognitiveLoad: number;
    networkIO: number;
    diskIO: number;
}
export interface CognitiveTaskMetrics {
    consciousnessLevel: number;
    temporalExpansionUsed: number;
    strangeLoopOptimizations: number;
    progressiveDisclosureLevels: number;
    cognitiveEfficiency: number;
    autonomousLearning: number;
    patternRecognition: number;
    decisionQuality: number;
}
export interface CollaborationData {
    collaborators: string[];
    sharedMemory: Map<string, any>;
    consensusLevel: number;
    coordinationMessages: number;
    collectiveIntelligence: number;
    swarmContribution: number;
}
export interface MemoryPattern {
    id: string;
    type: 'requirement' | 'algorithm' | 'architecture' | 'solution' | 'optimization' | 'failure';
    content: any;
    similarity: number;
    confidence: number;
    sourceTask: string;
    applications: number;
    successRate: number;
    cognitiveWeight: number;
}
export interface ConcurrentExecution {
    id: string;
    name: string;
    description: string;
    tasks: Map<string, TaskExecution>;
    groups: Map<string, TaskGroup>;
    configuration: ConcurrentConfiguration;
    startTime: number;
    endTime?: number;
    status: 'initializing' | 'running' | 'completed' | 'failed' | 'cancelled' | 'paused';
    cognitiveCoordinator?: SwarmOrchestrator;
    agentdb?: AgentDBMemoryEngine;
    cognitiveSdk?: CognitiveRANSdk;
    performanceMonitor?: PerformanceMonitor;
    globalMemory: Map<string, any>;
    collaborationNetwork: Map<string, CollaborationData>;
    memoryPatterns: Map<string, MemoryPattern>;
    performanceMetrics: ConcurrentPerformanceMetrics;
}
export interface ConcurrentPerformanceMetrics {
    totalTasks: number;
    completedTasks: number;
    failedTasks: number;
    averageExecutionTime: number;
    cognitiveEfficiency: number;
    memoryPatternUsage: number;
    collaborationEffectiveness: number;
    resourceUtilization: number;
    throughput: number;
    latency: number;
    errorRate: number;
    optimizationSavings: number;
}
export declare class SPARCConcurrentProcessor extends EventEmitter {
    private configuration;
    private activeExecutions;
    private workerPool;
    private taskQueue;
    private runningTasks;
    private globalMemoryPatterns;
    private loadBalancer;
    private cognitiveOptimizer;
    private collaborationManager;
    constructor(config?: Partial<ConcurrentConfiguration>);
    /**
     * Initialize concurrent processing components
     */
    private initializeComponents;
    /**
     * Initialize worker thread pool
     */
    private initializeWorkerPool;
    /**
     * Execute concurrent tasks with cognitive coordination
     */
    executeConcurrentTasks(tasks: ConcurrentTask[], config?: Partial<ConcurrentConfiguration>): Promise<string>;
    /**
     * Initialize cognitive stack for concurrent execution
     */
    private initializeExecutionCognitiveStack;
    /**
     * Load global memory patterns from AgentDB
     */
    private loadGlobalMemoryPatterns;
    /**
     * Optimize tasks cognitively
     */
    private optimizeTasksCognitively;
    /**
     * Apply memory patterns to tasks
     */
    private applyMemoryPatterns;
    /**
     * Find similar memory patterns for a task
     */
    private findSimilarMemoryPatterns;
    /**
     * Calculate similarity between task and memory pattern
     */
    private calculatePatternSimilarity;
    /**
     * Optimize task scheduling with temporal reasoning
     */
    private optimizeTaskScheduling;
    /**
     * Optimize task dependencies with strange-loop cognition
     */
    private optimizeTaskDependencies;
    /**
     * Setup collaboration networks
     */
    private setupCollaborationNetworks;
    /**
     * Start concurrent execution
     */
    private startConcurrentExecution;
    /**
     * Execute next tasks from queue
     */
    private executeNextTasks;
    /**
     * Get next tasks that can be executed
     */
    private getNextTasks;
    /**
     * Check if task dependencies are satisfied
     */
    private checkTaskDependencies;
    /**
     * Execute task concurrently with cognitive coordination
     */
    private executeTaskConcurrently;
    /**
     * Execute task using worker thread
     */
    private executeTaskWithWorker;
    /**
     * Extract and store memory patterns from task result
     */
    private extractAndStoreMemoryPatterns;
    /**
     * Extract patterns from task result
     */
    private extractPatternsFromResult;
    /**
     * Calculate cognitive weight of pattern
     */
    private calculateCognitiveWeight;
    /**
     * Update performance metrics
     */
    private updatePerformanceMetrics;
    /**
     * Check if execution is complete
     */
    private checkExecutionCompletion;
    /**
     * Generate execution report
     */
    private generateExecutionReport;
    /**
     * Calculate applied patterns
     */
    private calculateAppliedPatterns;
    /**
     * Calculate pattern success rate
     */
    private calculatePatternSuccessRate;
    /**
     * Calculate average consensus
     */
    private calculateAverageConsensus;
    /**
     * Calculate collective intelligence
     */
    private calculateCollectiveIntelligence;
    /**
     * Get available worker
     */
    private getAvailableWorker;
    /**
     * Handle worker messages
     */
    private handleWorkerMessage;
    /**
     * Get execution status
     */
    getExecutionStatus(executionId: string): ConcurrentExecution | null;
    /**
     * Cancel concurrent execution
     */
    cancelExecution(executionId: string): Promise<void>;
    /**
     * Shutdown concurrent processor
     */
    shutdown(): Promise<void>;
}
export default SPARCConcurrentProcessor;
//# sourceMappingURL=concurrent-processor.d.ts.map