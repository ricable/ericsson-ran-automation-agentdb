/**
 * CrossAgentMemoryCoordinator - Memory Sharing Protocols for ML Development
 * Enables seamless knowledge sharing between ML-developer, researcher, and analyst agents
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
export interface AgentInfo {
    agentId: string;
    agentType: 'ml-developer' | 'ml-researcher' | 'ml-analyst' | 'performance-analyst' | 'diagnostics-specialist';
    capabilities: string[];
    activeDomains: string[];
    memoryQuotaGB: number;
    syncPriority: number;
    lastSync: number;
    isConnected: boolean;
}
export interface MemoryTransferProtocol {
    protocolId: string;
    sourceAgent: string;
    targetAgents: string[];
    memoryType: 'rl_episode' | 'causal_insight' | 'optimization_pattern' | 'execution_outcome';
    transferData: any;
    metadata: TransferMetadata;
    compressionEnabled: boolean;
    encryptionEnabled: boolean;
    priority: 'low' | 'medium' | 'high' | 'critical';
}
export interface TransferMetadata {
    transferId: string;
    timestamp: number;
    dataSize: number;
    compressedSize: number;
    transferDuration: number;
    successRate: number;
    applicableDomains: string[];
    requiredCapabilities: string[];
    confidence: number;
    crossAgentTransferability: number;
}
export interface SharedMemorySpace {
    spaceId: string;
    participants: AgentInfo[];
    sharedPatterns: Map<string, SharedPattern>;
    accessControls: AccessControl[];
    synchronizationRules: SyncRule[];
    lastConsolidation: number;
    totalSharedMemory: number;
}
export interface SharedPattern {
    patternId: string;
    sourceAgent: string;
    sharedAt: number;
    accessCount: number;
    successRate: number;
    adaptationCount: number;
    lastUsed: number;
    usageByAgent: Map<string, number>;
    feedback: PatternFeedback[];
}
export interface AccessControl {
    agentId: string;
    permissions: Permission[];
    memoryQuota: number;
    rateLimit: number;
}
export interface Permission {
    action: 'read' | 'write' | 'share' | 'modify';
    resourceType: string;
    conditions: string[];
}
export interface SyncRule {
    ruleId: string;
    condition: string;
    action: SyncAction;
    priority: number;
    enabled: boolean;
}
export interface SyncAction {
    type: 'immediate' | 'batch' | 'conditional';
    targetAgents: string[];
    filters: any;
    compressionLevel: number;
}
export interface PatternFeedback {
    agentId: string;
    feedbackType: 'success' | 'failure' | 'improvement' | 'adaptation';
    rating: number;
    comments: string;
    timestamp: number;
    context: any;
}
export interface KnowledgeTransferGraph {
    nodes: Map<string, KnowledgeNode>;
    edges: Map<string, KnowledgeEdge>;
    transferPaths: Map<string, TransferPath>;
    efficiency: number;
    lastUpdate: number;
}
export interface KnowledgeNode {
    nodeId: string;
    agentType: string;
    knowledgeDomain: string;
    knowledgeScore: number;
    contributionScore: number;
    receptionScore: number;
    activeConnections: string[];
}
export interface KnowledgeEdge {
    edgeId: string;
    sourceNode: string;
    targetNode: string;
    transferCount: number;
    successRate: number;
    averageLatency: number;
    bandwidthUsage: number;
    lastTransfer: number;
}
export interface TransferPath {
    pathId: string;
    sequence: string[];
    efficiency: number;
    reliability: number;
    recommendedFor: string[];
}
export interface CrossAgentConfig {
    swarmId: string;
    supportedAgents: string[];
    transferThreshold: number;
    syncInterval: number;
    compressionEnabled: boolean;
    encryptionEnabled: boolean;
    maxMemoryPerAgent: number;
    maxConcurrentTransfers: number;
    feedbackEnabled: boolean;
    autoOptimizationEnabled: boolean;
}
export declare class CrossAgentMemoryCoordinator extends EventEmitter {
    private config;
    private agentRegistry;
    private sharedMemorySpaces;
    private transferProtocols;
    private knowledgeGraph;
    private activeTransfers;
    private transferHistory;
    private transferMetrics;
    constructor(config: CrossAgentConfig);
    /**
     * Initialize cross-agent memory coordinator
     */
    initialize(): Promise<void>;
    /**
     * Register a new agent for cross-agent memory sharing
     */
    registerAgent(agentInfo: AgentInfo): Promise<void>;
    /**
     * Share memory pattern with target agents
     */
    sharePattern(patternId: string, shareData: {
        type: string;
        pattern: any;
        confidence: number;
        transferability: number;
    }): Promise<void>;
    /**
     * Broadcast pattern to all compatible agents
     */
    broadcastPattern(patternId: string, broadcastData: {
        type: string;
        pattern: any;
        source_agent: string;
        confidence: number;
        recommended_for: string[];
    }): Promise<void>;
    /**
     * Request specific knowledge from other agents
     */
    requestKnowledge(request: KnowledgeRequest): Promise<KnowledgeResponse[]>;
    /**
     * Submit feedback on shared patterns
     */
    submitFeedback(feedback: PatternFeedbackSubmission): Promise<void>;
    /**
     * Get comprehensive statistics
     */
    getStats(): Promise<any>;
    private initializeKnowledgeGraph;
    private initializeTransferMetrics;
    private registerAgents;
    private setupSharedMemorySpaces;
    private initializeTransferProtocols;
    private setupKnowledgeTransferGraph;
    private enableSynchronization;
    private validateAgentConfig;
    private getPrimaryDomain;
    private setupAgentMemorySpace;
    private establishAgentConnections;
    private areAgentsCompatible;
    private createKnowledgeConnection;
    private findEligibleAgents;
    private determineTransferPriority;
    private extractApplicableDomains;
    private extractRequiredCapabilities;
    private compressData;
    private transferToAgent;
    private processTransferResults;
    private updateKnowledgeGraph;
    private executeBroadcast;
    private findKnowledgeableAgents;
    private sendKnowledgeRequest;
    private generateMockKnowledge;
    private findSharedPattern;
    private validateFeedback;
    private updateKnowledgeGraphFromFeedback;
    private calculateAgentStats;
    private calculateTransferStats;
    private calculateKnowledgeGraphStats;
    private calculateMemorySpaceStats;
    private performPeriodicSync;
    private generateTransferId;
}
export interface KnowledgeRequest {
    query: string;
    domains: string[];
    capabilities: string[];
    limit?: number;
    minConfidence?: number;
}
export interface KnowledgeResponse {
    agentId: string;
    knowledge: any;
    relevance: number;
    confidence: number;
    timestamp: number;
}
export interface PatternFeedbackSubmission {
    patternId: string;
    agentId: string;
    feedbackType: 'success' | 'failure' | 'improvement' | 'adaptation';
    rating: number;
    comments: string;
    context: any;
}
export interface TransferHistoryEntry {
    transferId: string;
    timestamp: number;
    sourceAgent: string;
    targetAgents: string[];
    successRate: number;
    dataSize: number;
}
export default CrossAgentMemoryCoordinator;
//# sourceMappingURL=CrossAgentMemoryCoordinator.d.ts.map