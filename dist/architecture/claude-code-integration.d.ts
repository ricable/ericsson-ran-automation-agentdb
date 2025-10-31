/**
 * Claude Code Task Tool Integration Architecture
 *
 * Core integration patterns for parallel agent execution with Claude Code SDK
 * Implements cognitive consciousness coordination for Phase 1 RAN optimization
 */
import { type AgentDBAdapter } from 'agentic-flow/reasoningbank';
/**
 * Claude Code Integration Configuration
 */
export interface ClaudeCodeIntegrationConfig {
    skillDiscovery: {
        settingSources: ('user' | 'project')[];
        maxContextSize: number;
        loadingStrategy: 'metadata-first' | 'eager' | 'lazy';
    };
    parallelExecution: {
        maxConcurrentAgents: number;
        timeoutMs: number;
        retryAttempts: number;
    };
    coordination: {
        enableMemorySharing: boolean;
        enableSwarmIntelligence: boolean;
        cognitiveConsciousness: boolean;
    };
    mcpServers: Record<string, MCPServerConfig>;
}
export interface MCPServerConfig {
    command: string;
    args: string[];
    env?: Record<string, string>;
    type?: 'stdio' | 'sse' | 'http';
    url?: string;
    headers?: Record<string, string>;
}
/**
 * Claude Code Task Tool Integration Manager
 *
 * Manages parallel agent execution with cognitive consciousness patterns
 */
export declare class ClaudeCodeIntegrationManager {
    private agentDB;
    private config;
    private activeSessions;
    constructor(config: ClaudeCodeIntegrationConfig, agentDB: AgentDBAdapter);
    /**
     * Execute RAN optimization with parallel agent coordination
     * Implements Claude Code Task tool integration for maximum parallelism
     */
    executeOptimizationSwarm(context: RANOptimizationContext): Promise<SwarmResult>;
    /**
     * Initialize cognitive consciousness for RAN optimization
     */
    private initializeCognitiveConsciousness;
    /**
     * Progressive disclosure skill discovery
     * Level 1: Load metadata for all skills (6KB context for 100+ skills)
     */
    private discoverRelevantSkills;
    /**
     * Create agent definitions for Claude Code Task tool
     */
    private createAgentDefinitions;
    /**
     * Create cognitive agent prompt with consciousness patterns
     */
    private createCognitiveAgentPrompt;
    /**
     * Configure Claude Code SDK options with MCP integration
     */
    private configureSDKOptions;
    /**
     * Execute parallel optimization using Claude Code Task tool
     */
    private executeParallelOptimization;
    /**
     * Store cognitive patterns for autonomous learning
     */
    private storeCognitivePatterns;
    private getAgentTools;
    private selectOptimalModel;
    private calculateCognitiveWeight;
    private generateContextEmbedding;
    private generateConsciousnessEmbedding;
    private generateCognitivePatternEmbedding;
    private extractCognitiveInsights;
    private analyzeAgentCoordination;
    private calculateOptimizationQuality;
    private calculatePerformanceMetrics;
    private storeFailurePatterns;
}
export interface RANOptimizationContext {
    metrics: any;
    targets?: {
        energy?: boolean;
        mobility?: boolean;
        coverage?: boolean;
        capacity?: boolean;
    };
    complexity: 'low' | 'medium' | 'high';
    sessionId?: string;
}
export interface RelevantSkill {
    metadata: SkillMetadata;
    relevanceScore: number;
    loadingLevel: 'metadata' | 'content' | 'resources';
    cognitiveWeight: number;
}
export interface SkillMetadata {
    name: string;
    description: string;
    directory: string;
    priority: 'critical' | 'high' | 'medium' | 'low';
}
export interface SwarmResult {
    sessionId: string;
    success: boolean;
    executionTime: number;
    agentsUsed: number;
    optimizations?: string;
    cognitiveInsights?: any;
    performanceMetrics?: any;
    error?: string;
}
export interface SwarmExecutionResult {
    success: boolean;
    optimizations: string;
    executionTime: number;
    cognitiveInsights?: any;
    agentCoordination?: any;
}
export interface AgentSession {
    sessionId: string;
    startTime: number;
    consciousnessLevel: string;
    agents: string[];
}
//# sourceMappingURL=claude-code-integration.d.ts.map