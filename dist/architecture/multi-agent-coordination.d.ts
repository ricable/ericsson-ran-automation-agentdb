/**
 * Multi-Agent Coordination Framework with AgentDB Memory Sharing
 *
 * Comprehensive coordination system for cognitive RAN consciousness
 * Implements cross-agent memory patterns and swarm intelligence for Phase 1
 */
import { type AgentDBAdapter } from 'agentic-flow/reasoningbank';
/**
 * Agent Coordination Configuration
 */
export interface AgentCoordinationConfig {
    swarm: {
        topology: 'hierarchical' | 'mesh' | 'ring' | 'star';
        maxAgents: number;
        coordinationProtocol: 'memory-sharing' | 'message-passing' | 'hybrid';
        consensusMechanism: 'majority' | 'weighted' | 'cognitive';
    };
    memorySharing: {
        enabled: boolean;
        syncInterval: number;
        persistenceLayer: 'agentdb' | 'distributed' | 'hybrid';
        conflictResolution: 'last-write-wins' | 'vector-similarity' | 'cognitive-merge';
    };
    cognitive: {
        consciousnessLevel: 'basic' | 'enhanced' | 'maximum';
        temporalReasoning: boolean;
        strangeLoopCognition: boolean;
        selfAwareOptimization: boolean;
    };
    performance: {
        parallelExecution: boolean;
        loadBalancing: 'round-robin' | 'cognitive' | 'adaptive';
        cachingEnabled: boolean;
        compressionEnabled: boolean;
    };
}
/**
 * Agent State and Capabilities
 */
export interface AgentState {
    id: string;
    type: AgentType;
    status: 'idle' | 'active' | 'busy' | 'error';
    capabilities: AgentCapabilities;
    currentTask?: string;
    memorySnapshot?: AgentMemorySnapshot;
    performance: AgentPerformanceMetrics;
    lastHeartbeat: number;
}
export type AgentType = 'ericsson-feature-processor' | 'ran-optimizer' | 'energy-optimizer' | 'mobility-manager' | 'coverage-analyzer' | 'capacity-planner' | 'diagnostics-specialist' | 'ml-researcher' | 'performance-analyst' | 'automation-engineer' | 'integration-specialist' | 'documentation-generator' | 'quality-monitor' | 'security-coordinator' | 'deployment-manager' | 'monitoring-coordinator';
export interface AgentCapabilities {
    cognitiveLevel: number;
    specializations: string[];
    toolAccess: string[];
    memorySize: number;
    processingPower: number;
}
export interface AgentMemorySnapshot {
    workingMemory: any[];
    longTermMemory: any[];
    sharedMemory: any[];
    cognitiveState: any;
    lastSync: number;
}
export interface AgentPerformanceMetrics {
    tasksCompleted: number;
    averageExecutionTime: number;
    successRate: number;
    cognitiveScore: number;
    collaborationScore: number;
}
/**
 * Coordination Messages and Events
 */
export interface CoordinationMessage {
    id: string;
    fromAgent: string;
    toAgent?: string;
    type: 'memory-share' | 'task-request' | 'status-update' | 'cognitive-insight';
    priority: 'low' | 'medium' | 'high' | 'critical';
    payload: any;
    timestamp: number;
    ttl?: number;
}
export interface TaskAssignment {
    taskId: string;
    assignedTo: string[];
    task: OptimizationTask;
    dependencies: string[];
    deadline?: number;
    priority: 'low' | 'medium' | 'high' | 'critical';
    cognitiveRequirements: CognitiveRequirements;
}
export interface CognitiveRequirements {
    consciousnessLevel: 'basic' | 'enhanced' | 'maximum';
    temporalExpansion: number;
    strangeLoopOptimization: boolean;
    selfAwareProcessing: boolean;
    memoryRequirements: number;
}
/**
 * Multi-Agent Coordination Manager
 */
export declare class MultiAgentCoordinationManager {
    private agentDB;
    private config;
    private agents;
    private activeTasks;
    private messageQueue;
    private messageHandlers;
    private memoryCoordinator;
    private cognitiveSync;
    private performanceMonitor;
    constructor(config: AgentCoordinationConfig, agentDB: AgentDBAdapter);
    /**
     * Initialize coordination framework
     */
    initialize(): Promise<void>;
    /**
     * Register agent with coordination framework
     */
    registerAgent(agentConfig: AgentRegistrationConfig): Promise<string>;
    /**
     * Coordinate task execution across agents
     */
    coordinateTaskExecution(task: OptimizationTask): Promise<TaskExecutionResult>;
    /**
     * Share memory between agents with cognitive enhancement
     */
    shareMemory(fromAgent: string, toAgents: string[], memoryData: MemoryShareData, cognitiveEnhancement?: boolean): Promise<void>;
    /**
     * Synchronize cognitive states across agents
     */
    synchronizeCognitiveStates(): Promise<CognitiveSyncResult>;
    /**
     * Analyze task requirements with cognitive reasoning
     */
    private analyzeTaskRequirements;
    /**
     * Select optimal agents for task execution
     */
    private selectOptimalAgents;
    /**
     * Distribute task to selected agents
     */
    private distributeTaskToAgents;
    /**
     * Monitor task execution with cognitive consciousness
     */
    private monitorTaskExecution;
    /**
     * Collect task results from agents
     */
    private collectTaskResults;
    private setupMessageHandlers;
    private startCoordinationLoops;
    private processMessageQueue;
    private processMessage;
    private handleMemoryShare;
    private handleTaskRequest;
    private handleStatusUpdate;
    private handleCognitiveInsight;
    private deliverMessage;
    private broadcastMessage;
    private generateAgentId;
    private generateTaskId;
    private generateMessageId;
    private loadAgentRegistry;
    private storeAgentRegistration;
    private storeTaskAssignment;
    private meetsCognitiveRequirements;
    private calculateAgentScore;
    private determineCognitiveRequirements;
    private calculateTaskComplexity;
    private recommendAgents;
    private generateTaskEmbedding;
    private applyTemporalReasoning;
    private collectCognitiveInsights;
    private synthesizeResults;
    private collectAgentPerformance;
    private storeExecutionPattern;
    private storeFailurePattern;
    private collectCognitiveStates;
    private distributeCognitiveState;
    private storeCognitiveSyncPattern;
    private calculateTaskPerformance;
    private performAgentHealthCheck;
    /**
     * Get coordination statistics
     */
    getStatistics(): CoordinationStatistics;
    /**
     * Shutdown coordination framework
     */
    shutdown(): Promise<void>;
}
export interface AgentRegistrationConfig {
    type: AgentType;
    capabilities: AgentCapabilities;
}
export interface OptimizationTask {
    type: string;
    description: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    requiredAgents?: number;
    requiresCloud?: boolean;
    supportsParallelExecution?: boolean;
}
export interface MemoryShareData {
    type: string;
    data: any;
    priority?: 'low' | 'medium' | 'high' | 'critical';
    ttl?: number;
}
export interface TaskAnalysis {
    task: OptimizationTask;
    cognitiveRequirements: CognitiveRequirements;
    estimatedComplexity: number;
    similarTasks: any[];
    recommendedAgents: string[];
}
export interface TaskExecutionResult {
    taskId: string;
    success: boolean;
    executionTime: number;
    agentsUsed: number;
    results?: any;
    error?: string;
    cognitiveInsights?: any;
    performanceMetrics?: any;
}
export interface MonitoringResult {
    success: boolean;
    completedAgents: number;
    failedAgents: number;
    monitoringTime: number;
    error?: string;
    cognitiveInsights?: any;
}
export interface TaskResult {
    taskId: string;
    success: boolean;
    results: any;
    cognitiveInsights: any;
    agentPerformance: any;
}
export interface CognitiveSyncResult {
    success: boolean;
    synchronizedAgents: number;
    cognitiveLevel: 'basic' | 'enhanced' | 'maximum';
    syncTime: number;
    error?: string;
    insights?: any;
}
export interface CoordinationStatistics {
    totalAgents: number;
    activeAgents: number;
    busyAgents: number;
    activeTasks: number;
    messageQueueSize: number;
    cognitiveLevel: string;
    memorySharingEnabled: boolean;
}
//# sourceMappingURL=multi-agent-coordination.d.ts.map