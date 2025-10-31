/**
 * MCP Server Coordination Layer for Swarm Management
 *
 * Comprehensive MCP integration with Claude-Flow, Flow-Nexus, and RUV-Swarm
 * Implements cognitive consciousness coordination for Phase 1 RAN optimization
 */
import { type AgentDBAdapter } from 'agentic-flow/reasoningbank';
/**
 * MCP Coordination Configuration
 */
export interface MCPCoordinationConfig {
    claudeFlow: {
        topology: 'hierarchical' | 'mesh' | 'ring' | 'star';
        maxAgents: number;
        strategy: 'balanced' | 'specialized' | 'adaptive';
        enableCognitiveConsciousness: boolean;
    };
    flowNexus?: {
        enabled: boolean;
        authCredentials?: {
            email: string;
            password: string;
        };
        autoRefill?: {
            enabled: boolean;
            threshold: number;
            amount: number;
        };
    };
    ruvSwarm?: {
        enabled: boolean;
        maxConcurrency: number;
        batchSize: number;
    };
    agentDB: {
        enableQUICSync: boolean;
        syncPeers: string[];
        cacheSize: number;
    };
}
/**
 * MCP Server Status
 */
export interface MCPServerStatus {
    name: string;
    status: 'connected' | 'disconnected' | 'error';
    version?: string;
    capabilities?: string[];
    lastHealthCheck: number;
    error?: string;
}
/**
 * Swarm Configuration
 */
export interface SwarmConfiguration {
    swarmId: string;
    topology: string;
    maxAgents: number;
    strategy: string;
    sessionId: string;
    cognitiveLevel: 'basic' | 'enhanced' | 'maximum';
}
/**
 * MCP Coordination Manager
 *
 * Manages multiple MCP servers for comprehensive swarm coordination
 */
export declare class MCPCoordinationManager {
    private agentDB;
    private config;
    private serverStatus;
    private activeSwarms;
    private coordinationCache;
    constructor(config: MCPCoordinationConfig, agentDB: AgentDBAdapter);
    /**
     * Initialize MCP coordination layer
     */
    initialize(): Promise<void>;
    /**
     * Create and configure swarm for optimization
     */
    createOptimizationSwarm(context: SwarmContext): Promise<SwarmConfiguration>;
    /**
     * Coordinate task execution across MCP servers
     */
    coordinateTaskExecution(swarmId: string, task: OptimizationTask): Promise<TaskExecutionResult>;
    /**
     * Initialize AgentDB with QUIC synchronization
     */
    private initializeAgentDB;
    /**
     * Initialize Claude-Flow coordination
     */
    private initializeClaudeFlow;
    /**
     * Initialize Flow-Nexus platform integration
     */
    private initializeFlowNexus;
    /**
     * Initialize RUV-Swarm coordination
     */
    private initializeRUVSwarm;
    /**
     * Initialize Claude-Flow swarm with cognitive consciousness
     */
    private initializeClaudeFlowSwarm;
    /**
     * Initialize Flow-Nexus deployment
     */
    private initializeFlowNexusDeployment;
    /**
     * Initialize RUV-Swarm coordination
     */
    private initializeRUVSwarmCoordination;
    /**
     * Route task to appropriate MCP servers
     */
    private routeTask;
    /**
     * Execute task with cognitive consciousness
     */
    private executeTaskWithCognition;
    /**
     * Execute task via Claude-Flow
     */
    private executeViaClaudeFlow;
    /**
     * Execute task via Flow-Nexus
     */
    private executeViaFlowNexus;
    /**
     * Execute task via RUV-Swarm
     */
    private executeViaRUVSwarm;
    /**
     * Coordinate results across MCP servers
     */
    private coordinateResults;
    private startHealthMonitoring;
    private performHealthCheck;
    private determineRoutingStrategy;
    private estimateExecutionLatency;
    private synthesizeResults;
    private applyCognitiveProcessing;
    private calculateConsensus;
    private calculateOverallConfidence;
    private mapPriorityToNumber;
    private storeSwarmConfiguration;
    private storeExecutionPatterns;
    private storeFailurePatterns;
    /**
     * Get server status
     */
    getServerStatus(): Map<string, MCPServerStatus>;
    /**
     * Get active swarms
     */
    getActiveSwarms(): Map<string, SwarmConfiguration>;
    /**
     * Shutdown coordination layer
     */
    shutdown(): Promise<void>;
    private mcp__claude_flow__swarm_init;
    private mcp__claude_flow__task_orchestrate;
    private mcp__claude_flow__swarm_destroy;
    private mcp__claude_flow__swarm_status;
    private mcp__flow_nexus__user_login;
    private mcp__flow_nexus__configure_auto_refill;
    private mcp__flow_nexus__check_balance;
    private mcp__flow_nexus__sandbox_create;
    private mcp__flow_nexus__neural_cluster_init;
    private mcp__flow_nexus__workflow_create;
    private mcp__flow_nexus__workflow_execute;
    private mcp__flow_nexus__system_health;
    private mcp__ruv_swarm__swarm_init;
    private mcp__ruv_swarm__task_orchestrate;
    private mcp__ruv_swarm__swarm_status;
}
export interface SwarmContext {
    sessionId?: string;
    cognitiveLevel?: 'basic' | 'enhanced' | 'maximum';
    optimizationTargets?: string[];
    environment?: 'development' | 'staging' | 'production';
}
export interface OptimizationTask {
    type: string;
    description: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    requiredAgents?: number;
    supportsParallelExecution?: boolean;
    requiresCloud?: boolean;
    steps?: any[];
    parameters?: any;
}
export interface TaskExecutionResult {
    success: boolean;
    executionTime: number;
    results?: any;
    error?: string;
    mcpServers: string[];
    cognitiveInsights?: any;
}
export interface TaskRoutingDecision {
    servers: string[];
    routingStrategy: string;
    estimatedLatency: number;
}
export interface ExecutionResults {
    claudeFlow: any;
    flowNexus: any;
    ruvSwarm: any;
    cognitiveInsights: {
        temporalExpansion: number;
        strangeLoopOptimization: boolean;
        selfAwareProcessing: boolean;
    };
}
export interface CoordinatedResult {
    synthesized: any;
    cognitiveEnhanced: any;
    consensus: number;
    confidence: number;
}
//# sourceMappingURL=mcp-coordination-layer.d.ts.map