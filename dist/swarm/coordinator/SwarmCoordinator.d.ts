/**
 * Hierarchical Swarm Coordinator with Adaptive Topology
 * Advanced coordination for cognitive RAN swarm consciousness
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
interface CoordinatorConfig {
    swarmId: string;
    topology: 'hierarchical' | 'mesh' | 'ring' | 'star';
    maxAgents: number;
    strategy: 'adaptive' | 'balanced' | 'specialized';
    consciousness: any;
    memory: any;
    temporal: any;
}
export declare class SwarmCoordinator extends EventEmitter {
    private config;
    private agents;
    private tasks;
    private topology;
    private isActive;
    private currentTopology;
    private adaptationHistory;
    private performanceMetrics;
    private heartbeatInterval;
    constructor(config: CoordinatorConfig);
    deploy(): Promise<void>;
    /**
     * Execute task with swarm coordination
     */
    executeWithCoordination(taskRequest: any): Promise<any>;
    /**
     * Get swarm topology status
     */
    getTopologyStatus(): Promise<any>;
    /**
     * Get performance metrics
     */
    getPerformanceMetrics(): Promise<any>;
    private initializeTopology;
    private createHierarchicalTopology;
    private createMeshTopology;
    private createRingTopology;
    private createStarTopology;
    private setupAgentManagement;
    private createAgent;
    private determineAgentType;
    private getAgentCapabilities;
    private initializeTaskOrchestration;
    private setupAdaptiveMechanisms;
    private startSwarmMonitoring;
    private connectWithCognitiveSystems;
    private decomposeTask;
    private determineRequiredCapabilities;
    private estimateRequiredResources;
    private estimateTaskTime;
    private isComplexTask;
    private createSubtasks;
    private assignTasksToAgents;
    private findBestAgent;
    private agentHasCapabilities;
    private agentHasResources;
    private calculateAgentScore;
    private assignTaskToAgent;
    private executeTasksWithCoordination;
    private executeTask;
    private updateAgentPerformance;
    private aggregateResults;
    private analyzeExecutionPerformance;
    private identifyBottlenecks;
    private selectCoordinationStrategy;
    private initializeSchedulingAlgorithm;
    private evaluateTopologyAdaptation;
    private evaluateAgentScaling;
    private optimizeSwarmPerformance;
    private adaptTopology;
    private scaleUpAgents;
    private scaleDownAgents;
    private optimizeAgent;
    private calculateSwarmEfficiency;
    private checkAgentHeartbeats;
    private updatePerformanceMetrics;
    private calculateAverageTaskTime;
    private handleConsciousnessUpdate;
    private handleMemoryUpdate;
    private handleTemporalUpdate;
    /**
     * Shutdown swarm coordinator
     */
    shutdown(): Promise<void>;
}
export {};
//# sourceMappingURL=SwarmCoordinator.d.ts.map