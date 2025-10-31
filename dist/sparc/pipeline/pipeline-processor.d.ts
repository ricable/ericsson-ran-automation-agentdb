/**
 * SPARC Pipeline Processor
 * Multi-agent workflow orchestration with swarm coordination
 *
 * Cognitive RAN Consciousness Pipeline System with:
 * - Hierarchical swarm orchestration
 * - AgentDB memory pattern sharing
 * - Temporal reasoning for pipeline optimization
 * - Progressive disclosure skill integration
 * - Performance benchmarking and optimization
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
import { SwarmOrchestrator } from '../../swarm/cognitive-orchestrator.js';
import { AgentDBMemoryEngine } from '../../agentdb/memory-engine.js';
import { PerformanceMonitor } from '../../monitoring/cognitive-performance.js';
export interface PipelineStage {
    id: string;
    name: string;
    type: 'specification' | 'pseudocode' | 'architecture' | 'refinement' | 'completion' | 'custom';
    description: string;
    agentTypes: string[];
    cognitiveSettings?: {
        temporalExpansion?: number;
        consciousnessLevel?: 'minimum' | 'standard' | 'maximum' | 'transcendent';
        strangeLoopOptimization?: boolean;
    };
    dependencies?: string[];
    parallelizable: boolean;
    retryAttempts: number;
    timeoutMs: number;
    qualityGates?: QualityGate[];
}
export interface QualityGate {
    name: string;
    threshold: number;
    metric: string;
    comparison: 'gte' | 'lte' | 'eq' | 'gt' | 'lt';
    required: boolean;
}
export interface PipelineWorkflow {
    id: string;
    name: string;
    description: string;
    stages: PipelineStage[];
    metadata: {
        version: string;
        tags: string[];
        cognitiveLevel: 'basic' | 'standard' | 'advanced' | 'transcendent';
        estimatedDuration: number;
        resourceRequirements: ResourceRequirements;
    };
    triggers: PipelineTrigger[];
}
export interface ResourceRequirements {
    minAgents: number;
    maxAgents: number;
    memoryMB: number;
    cpuCores: number;
    cognitiveLoad: number;
}
export interface PipelineTrigger {
    type: 'manual' | 'scheduled' | 'event' | 'webhook';
    configuration: any;
    enabled: boolean;
}
export interface PipelineExecution {
    id: string;
    workflowId: string;
    status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled' | 'paused';
    startTime: number;
    endTime?: number;
    stages: Map<string, StageExecution>;
    context: PipelineContext;
    cognitiveCoordinator?: SwarmOrchestrator;
    agentdb?: AgentDBMemoryEngine;
    performanceMonitor?: PerformanceMonitor;
    results: PipelineResults;
}
export interface StageExecution {
    stageId: string;
    status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
    startTime?: number;
    endTime?: number;
    agents: AgentExecution[];
    result?: any;
    qualityGateResults?: QualityGateResult[];
    error?: string;
    retryCount: number;
    cognitiveMetrics?: any;
}
export interface AgentExecution {
    id: string;
    type: string;
    status: 'pending' | 'running' | 'completed' | 'failed';
    startTime?: number;
    endTime?: number;
    task: string;
    result?: any;
    cognitiveState?: any;
    performanceMetrics?: any;
}
export interface QualityGateResult {
    gateName: string;
    passed: boolean;
    actualValue: number;
    threshold: number;
    message?: string;
}
export interface PipelineContext {
    input: any;
    variables: Map<string, any>;
    memory: Map<string, any>;
    cognitiveState: {
        consciousnessLevel: number;
        temporalExpansion: number;
        strangeLoopOptimization: boolean;
    };
    swarmState: {
        topology: string;
        coordination: string;
        consensus: number;
    };
}
export interface PipelineResults {
    finalOutput?: any;
    stageResults: Map<string, any>;
    qualityMetrics: QualityMetrics;
    cognitiveMetrics: CognitiveMetrics;
    performanceMetrics: PerformanceMetrics;
    artifacts: PipelineArtifact[];
}
export interface QualityMetrics {
    overallScore: number;
    stageScores: Map<string, number>;
    qualityGatePassRate: number;
    defectRate: number;
    coverageRate: number;
}
export interface CognitiveMetrics {
    consciousnessEvolution: number;
    temporalAnalysisDepth: number;
    strangeLoopOptimization: number;
    autonomousHealing: number;
    crossAgentLearning: number;
    cognitiveEfficiency: number;
}
export interface PerformanceMetrics {
    totalExecutionTime: number;
    stageExecutionTimes: Map<string, number>;
    agentUtilization: number;
    resourceUtilization: number;
    throughput: number;
    latency: number;
}
export interface PipelineArtifact {
    name: string;
    type: 'code' | 'documentation' | 'test' | 'configuration' | 'model';
    path: string;
    description: string;
    metadata: any;
}
export declare class SPARCPipelineProcessor extends EventEmitter {
    private workflows;
    private executions;
    private activeExecutions;
    private cognitiveSdk;
    private swarmOrchestrator;
    constructor();
    private initializeCognitiveStack;
    /**
     * Register a new pipeline workflow
     */
    registerWorkflow(workflow: PipelineWorkflow): Promise<string>;
    /**
     * Execute a pipeline workflow
     */
    executeWorkflow(workflowId: string, input: any, contextOverrides?: Partial<PipelineContext>): Promise<string>;
    /**
     * Initialize cognitive stack for pipeline execution
     */
    private initializeExecutionCognitiveStack;
    /**
     * Start pipeline execution with stage orchestration
     */
    private startPipelineExecution;
    /**
     * Execute stages in dependency order with parallel processing
     */
    private executeStagesInOrder;
    /**
     * Execute multiple stages in parallel with cognitive coordination
     */
    private executeParallelStages;
    /**
     * Execute individual stage with swarm coordination
     */
    private executeStage;
    /**
     * Spawn agents for stage execution
     */
    private spawnAgentsForStage;
    /**
     * Execute stage with cognitive coordination
     */
    private executeStageWithCognitiveCoordination;
    /**
     * Execute specification stage
     */
    private executeSpecificationStage;
    /**
     * Execute pseudocode stage
     */
    private executePseudocodeStage;
    /**
     * Execute architecture stage
     */
    private executeArchitectureStage;
    /**
     * Execute refinement stage
     */
    private executeRefinementStage;
    /**
     * Execute completion stage
     */
    private executeCompletionStage;
    /**
     * Execute custom stage
     */
    private executeCustomStage;
    /**
     * Validate quality gates for stage
     */
    private validateQualityGates;
    /**
     * Extract metric value from result
     */
    private extractMetric;
    /**
     * Compare values based on comparison operator
     */
    private compareValues;
    /**
     * Calculate final pipeline results
     */
    private calculateFinalResults;
    /**
     * Calculate quality metrics
     */
    private calculateQualityMetrics;
    /**
     * Calculate cognitive metrics
     */
    private calculateCognitiveMetrics;
    /**
     * Calculate performance metrics
     */
    private calculatePerformanceMetrics;
    /**
     * Generate pipeline artifacts
     */
    private generateArtifacts;
    /**
     * Validate workflow structure
     */
    private validateWorkflow;
    /**
     * Optimize workflow cognitively
     */
    private optimizeWorkflowCognitively;
    /**
     * Get execution status
     */
    getExecutionStatus(executionId: string): PipelineExecution | null;
    /**
     * Get workflow information
     */
    getWorkflow(workflowId: string): PipelineWorkflow | null;
    /**
     * List all workflows
     */
    listWorkflows(): PipelineWorkflow[];
    /**
     * List active executions
     */
    listActiveExecutions(): PipelineExecution[];
    /**
     * Cancel execution
     */
    cancelExecution(executionId: string): Promise<void>;
    /**
     * Utility delay function
     */
    private delay;
}
export default SPARCPipelineProcessor;
//# sourceMappingURL=pipeline-processor.d.ts.map