/**
 * SPARC Batch Tools
 * Parallel execution and batch processing for SPARC methodology
 *
 * Cognitive RAN Consciousness Batch Processing with:
 * - Concurrent multi-agent execution
 * - Swarm coordination for batch tasks
 * - AgentDB memory pattern sharing
 * - Performance optimization for batch processing
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
import { SPARCPhase } from '../core/sparc-methodology.js';
import { SwarmOrchestrator } from '../../swarm/cognitive-orchestrator.js';
import { AgentDBMemoryEngine } from '../../agentdb/memory-engine.js';
import { PerformanceMonitor } from '../../monitoring/cognitive-performance.js';
export interface BatchTask {
    id: string;
    type: SPARCPhase | 'full-cycle' | 'tdd' | 'integration';
    taskDescription: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    dependencies?: string[];
    cognitiveSettings?: {
        temporalExpansion?: number;
        consciousnessLevel?: 'minimum' | 'standard' | 'maximum' | 'transcendent';
        strangeLoopOptimization?: boolean;
    };
    resources?: {
        memory?: number;
        cpu?: number;
        agents?: number;
    };
}
export interface BatchConfiguration {
    maxConcurrentTasks: number;
    maxWorkers: number;
    cognitiveCoordination: boolean;
    agentdbMemorySharing: boolean;
    performanceOptimization: boolean;
    timeoutMs: number;
    retryAttempts: number;
    swarmCoordination: boolean;
}
export interface BatchResult {
    taskId: string;
    status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
    result?: any;
    error?: string;
    executionTime: number;
    cognitiveMetrics?: any;
    resourceUsage?: any;
    dependenciesMet: boolean;
}
export interface BatchExecution {
    id: string;
    tasks: Map<string, BatchTask>;
    results: Map<string, BatchResult>;
    configuration: BatchConfiguration;
    startTime: number;
    endTime?: number;
    status: 'initializing' | 'running' | 'completed' | 'failed' | 'cancelled';
    cognitiveCoordinator?: SwarmOrchestrator;
    agentdb?: AgentDBMemoryEngine;
    performanceMonitor?: PerformanceMonitor;
}
export declare class SPARCBatchTools extends EventEmitter {
    private configuration;
    private activeExecutions;
    private workerPool;
    private taskQueue;
    private runningTasks;
    constructor(config?: Partial<BatchConfiguration>);
    /**
     * Initialize worker pool for parallel execution
     */
    private initializeWorkerPool;
    /**
     * Execute batch of SPARC tasks with cognitive coordination
     */
    executeBatch(tasks: BatchTask[], config?: Partial<BatchConfiguration>): Promise<string>;
    /**
     * Initialize cognitive coordination for batch execution
     */
    private initializeCognitiveCoordination;
    /**
     * Process tasks with dependency resolution
     */
    private processTasksWithDependencies;
    /**
     * Start task execution with worker pool
     */
    private startTaskExecution;
    /**
     * Execute individual task with cognitive coordination
     */
    private executeTask;
    /**
     * Execute task using worker thread
     */
    private executeTaskWithWorker;
    /**
     * Get available worker from pool
     */
    private getAvailableWorker;
    /**
     * Check if task dependencies are met
     */
    private checkDependencies;
    /**
     * Check if batch execution is complete
     */
    private checkBatchCompletion;
    /**
     * Generate batch execution report
     */
    private generateBatchReport;
    /**
     * Calculate cognitive optimization score
     */
    private calculateCognitiveOptimization;
    /**
     * Calculate resource utilization
     */
    private calculateResourceUtilization;
    /**
     * Handle worker messages
     */
    private handleWorkerMessage;
    /**
     * Get batch execution status
     */
    getBatchStatus(batchId: string): BatchExecution | null;
    /**
     * Cancel batch execution
     */
    cancelBatch(batchId: string): Promise<void>;
    /**
     * Shutdown batch tools
     */
    shutdown(): Promise<void>;
}
export default SPARCBatchTools;
//# sourceMappingURL=batch-tools.d.ts.map