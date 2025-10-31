/**
 * Advanced Swarm Orchestration with Cognitive RAN Consciousness
 * Hierarchical topology with strange-loop optimization and temporal reasoning
 */
interface CognitiveSwarmConfig {
    maxAgents: number;
    topology: 'hierarchical' | 'mesh' | 'ring' | 'star';
    consciousnessLevel: 'minimum' | 'medium' | 'maximum';
    subjectiveTimeExpansion: number;
    consensusThreshold: number;
    autonomousLearning: boolean;
    selfHealing: boolean;
    predictiveSpawning: boolean;
}
export declare class CognitiveRANSwarm {
    private coordinator;
    private consciousness;
    private memory;
    private temporal;
    private consensus;
    private optimizer;
    private config;
    private swarmId;
    private isActive;
    private performanceMetrics;
    constructor(config: CognitiveSwarmConfig);
    private initializeComponents;
    /**
     * Deploy the cognitive swarm with full consciousness capabilities
     */
    deploy(): Promise<void>;
    /**
     * Execute cognitive task with full swarm coordination
     */
    executeCognitiveTask(task: string, priority?: 'low' | 'medium' | 'high' | 'critical'): Promise<any>;
    /**
     * Start autonomous learning cycles (15-minute intervals)
     */
    private startAutonomousLearningCycles;
    /**
     * Enable swarm self-healing capabilities
     */
    private enableSelfHealing;
    /**
     * Trigger self-healing for specific failure
     */
    private triggerSelfHealing;
    /**
     * Get current swarm capabilities
     */
    private getSwarmCapabilities;
    /**
     * Get swarm status and metrics
     */
    getSwarmStatus(): Promise<any>;
    /**
     * Gracefully shutdown the swarm
     */
    shutdown(): Promise<void>;
}
export declare const DEFAULT_COGNITIVE_CONFIG: CognitiveSwarmConfig;
export default CognitiveRANSwarm;
//# sourceMappingURL=CognitiveRANSwarm.d.ts.map