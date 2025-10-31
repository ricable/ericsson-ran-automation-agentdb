/**
 * Swarm Performance Monitoring System
 *
 * Real-time monitoring of agent coordination, task distribution,
 * communication patterns, and swarm health metrics
 */
/// <reference types="node" />
import { SwarmPerformanceMetrics } from '../metrics/MLPerformanceMetrics';
import { EventEmitter } from 'events';
export interface AgentStatus {
    id: string;
    type: string;
    status: 'active' | 'idle' | 'busy' | 'failed' | 'recovering';
    currentTask?: string;
    lastHeartbeat: Date;
    resourceUsage: {
        cpu: number;
        memory: number;
        network: number;
    };
    performance: {
        tasksCompleted: number;
        averageTaskDuration: number;
        successRate: number;
        errorCount: number;
    };
    capabilities: string[];
    location?: string;
}
export interface TaskMetrics {
    id: string;
    type: string;
    status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
    assignedAgent?: string;
    createdAt: Date;
    startedAt?: Date;
    completedAt?: Date;
    duration?: number;
    priority: 'low' | 'medium' | 'high' | 'critical';
    complexity: 'simple' | 'moderate' | 'complex' | 'expert';
    dependencies: string[];
    resourceRequirements: {
        cpu: number;
        memory: number;
        specializedCapability?: string;
    };
    result?: any;
    error?: string;
}
export interface CommunicationMetrics {
    sourceAgent: string;
    targetAgent: string;
    messageType: 'task_assignment' | 'result_sharing' | 'coordination' | 'heartbeat' | 'data_sync';
    timestamp: Date;
    latency: number;
    dataSize: number;
    success: boolean;
    retryCount?: number;
}
export interface SwarmTopology {
    type: 'hierarchical' | 'mesh' | 'ring' | 'star' | 'adaptive';
    agents: AgentNode[];
    connections: AgentConnection[];
    efficiency: number;
    bottleneckNodes: string[];
    optimizationSuggestions: string[];
}
export interface AgentNode {
    id: string;
    type: string;
    status: AgentStatus['status'];
    capabilities: string[];
    connections: string[];
    load: number;
    performance: number;
}
export interface AgentConnection {
    source: string;
    target: string;
    latency: number;
    bandwidth: number;
    reliability: number;
    messageCount: number;
}
export interface SwarmHealthIndicator {
    overallHealth: number;
    agentHealth: {
        healthyAgents: number;
        totalAgents: number;
        failedAgents: number;
        recoveringAgents: number;
    };
    taskHealth: {
        tasksInQueue: number;
        runningTasks: number;
        completedTasks: number;
        failedTasks: number;
        averageWaitTime: number;
    };
    communicationHealth: {
        averageLatency: number;
        messageSuccessRate: number;
        activeConnections: number;
        networkUtilization: number;
    };
    resourceHealth: {
        cpuUtilization: number;
        memoryUtilization: number;
        networkUtilization: number;
        resourceContention: boolean;
    };
}
export declare class SwarmMonitor extends EventEmitter {
    private agents;
    private tasks;
    private communications;
    private topology;
    private healthHistory;
    private monitoringInterval;
    private maxCommunicationHistory;
    constructor();
    registerAgent(agent: AgentStatus): void;
    updateAgentStatus(agentId: string, updates: Partial<AgentStatus>): void;
    unregisterAgent(agentId: string): void;
    createTask(task: Omit<TaskMetrics, 'id'>): string;
    updateTask(taskId: string, updates: Partial<TaskMetrics>): void;
    completeTask(taskId: string, result?: any, error?: string): void;
    recordCommunication(communication: Omit<CommunicationMetrics, 'timestamp'>): void;
    getSwarmMetrics(): SwarmPerformanceMetrics;
    private calculateTaskDistributionBalance;
    private estimateConsensusSpeed;
    private calculateSynchronizationAccuracy;
    private calculateNetworkUtilization;
    private estimateDiskIOPS;
    getSwarmHealth(): SwarmHealthIndicator;
    private countActiveConnections;
    private updateTopology;
    private calculateTopologyEfficiency;
    private identifyBottleneckNodes;
    private generateOptimizationSuggestions;
    getTopology(): SwarmTopology | null;
    getAgents(): AgentStatus[];
    getActiveAgents(): AgentStatus[];
    getTasks(filter?: {
        status?: TaskMetrics['status'];
        agentId?: string;
        timeRange?: {
            start: Date;
            end: Date;
        };
    }): TaskMetrics[];
    getCommunications(filter?: {
        sourceAgent?: string;
        targetAgent?: string;
        messageType?: CommunicationMetrics['messageType'];
        timeRange?: {
            start: Date;
            end: Date;
        };
    }): CommunicationMetrics[];
    getHealthHistory(limit?: number): SwarmHealthIndicator[];
    private startMonitoring;
    private checkAgentHealth;
    stopMonitoring(): void;
    clearHistory(): void;
    exportMetrics(): any;
}
//# sourceMappingURL=SwarmMonitor.d.ts.map