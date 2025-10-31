/**
 * MCP Integration Layer for Flow-Nexus Platform Coordination
 *
 * Provides seamless integration between Claude-Flow, Flow-Nexus, and RUV-Swarm
 * with comprehensive error handling, authentication, and performance monitoring.
 */
/**
 * MCP Integration Configuration
 */
export interface MCPIntegrationConfig {
    claudeFlow: {
        enabled: boolean;
        topology: 'hierarchical' | 'mesh' | 'ring' | 'star';
        maxAgents: number;
        strategy: 'balanced' | 'specialized' | 'adaptive';
    };
    flowNexus: {
        enabled: boolean;
        autoAuth: boolean;
        creditManagement: {
            autoRefill: boolean;
            threshold: number;
            amount: number;
        };
        sandbox: {
            template: string;
            environment: Record<string, string>;
            packages: string[];
        };
    };
    ruvSwarm: {
        enabled: boolean;
        topology: 'mesh' | 'hierarchical' | 'ring' | 'star';
        maxAgents: number;
        strategy: 'balanced' | 'specialized' | 'adaptive';
    };
    performance: {
        timeoutMs: number;
        retryAttempts: number;
        batchSize: number;
        parallelism: number;
    };
}
/**
 * MCP Integration Manager
 * Orchestrates all MCP services with comprehensive error handling
 */
export declare class MCPIntegrationManager {
    private config;
    private claudeFlowSwarmId?;
    private flowNexusAuthenticated;
    private ruvSwarmId?;
    private performanceMetrics;
    constructor(config: MCPIntegrationConfig);
    /**
     * Initialize all MCP services
     */
    initialize(): Promise<InitializationResult>;
    /**
     * Initialize Claude-Flow swarm coordination
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
     * Orchestrate comprehensive task execution across all MCP services
     */
    orchestrateTask(task: OrchestrationTask): Promise<OrchestrationResult>;
    /**
     * Execute task via Claude-Flow
     */
    private executeClaudeFlowTask;
    /**
     * Execute task via Flow-Nexus
     */
    private executeFlowNexusTask;
    /**
     * Execute task via RUV-Swarm
     */
    private executeRUVSwarmTask;
    /**
     * Authenticate with Flow-Nexus
     */
    private authenticateFlowNexus;
    /**
     * Manage Flow-Nexus credits
     */
    private manageFlowNexusCredits;
    /**
     * Create Flow-Nexus sandbox
     */
    private createFlowNexusSandbox;
    /**
     * Get current credit balance
     */
    private getCreditBalance;
    /**
     * Calculate performance gain from multiple services
     */
    private calculatePerformanceGain;
    /**
     * Get current performance metrics
     */
    private getPerformanceMetrics;
    /**
     * Health check for all MCP services
     */
    healthCheck(): Promise<HealthCheckResult>;
    /**
     * Shutdown all MCP services gracefully
     */
    shutdown(): Promise<ShutdownResult>;
}
export interface ServiceInitializationResult {
    service: string;
    success: boolean;
    swarmId?: string;
    authenticated?: boolean;
    sandboxId?: string;
    credits?: number;
    configuration?: any;
    error?: string;
    initTime: number;
}
export interface InitializationResult {
    success: boolean;
    services: ServiceInitializationResult[];
    totalTime: number;
    performanceMetrics: Record<string, number>;
    error?: string;
}
export interface OrchestrationTask {
    id: string;
    title: string;
    description: string;
    priority?: 'low' | 'medium' | 'high' | 'critical';
    strategy?: 'parallel' | 'sequential' | 'adaptive';
    maxAgents?: number;
    template?: string;
    variables?: Record<string, any>;
    agents?: Array<{
        type: string;
        name: string;
        capabilities: string[];
    }>;
}
export interface ServiceExecutionResult {
    service: string;
    success: boolean;
    taskId?: string;
    deploymentId?: string;
    agentsSpawned?: number;
    executionTime: number;
    output?: string;
    error?: string;
}
export interface OrchestrationResult {
    taskId: string;
    success: boolean;
    title: string;
    results: ServiceExecutionResult[];
    totalTime: number;
    performanceGain: number;
    error?: string;
}
export interface ServiceHealthResult {
    service: string;
    healthy: boolean;
    status: string;
    lastCheck: number;
    metadata?: Record<string, any>;
}
export interface HealthCheckResult {
    overall: 'healthy' | 'degraded' | 'unhealthy';
    services: ServiceHealthResult[];
    timestamp: number;
}
export interface ServiceShutdownResult {
    service: string;
    success: boolean;
    message: string;
}
export interface ShutdownResult {
    success: boolean;
    services: ServiceShutdownResult[];
    timestamp: number;
}
export declare const DEFAULT_MCP_CONFIG: MCPIntegrationConfig;
//# sourceMappingURL=mcp-integration.d.ts.map