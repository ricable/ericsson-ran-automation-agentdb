/**
 * Reinforcement Learning Engine for RAN Optimization
 * Multi-objective optimization with hybrid algorithms and AgentDB integration
 */
import { NeuralNetwork } from '../neural/neural-network';
export interface RLState {
    timestamp: number;
    network_state: NetworkState;
    mobility_state: MobilityState;
    energy_state: EnergyState;
    coverage_state: CoverageState;
    capacity_state: CapacityState;
}
export interface RLAction {
    action_type: 'handover' | 'power_control' | 'beamforming' | 'resource_allocation';
    target_cell?: string;
    target_user?: string;
    parameters: Record<string, number>;
    confidence: number;
    expected_reward: number;
}
export interface RLReward {
    total_reward: number;
    component_rewards: {
        mobility: number;
        energy: number;
        coverage: number;
        capacity: number;
    };
    reward_breakdown: RewardComponent[];
    causal_factors: CausalFactor[];
}
export interface PolicyNetwork {
    actor: NeuralNetwork;
    critic: NeuralNetwork;
    target_actor: NeuralNetwork;
    target_critic: NeuralNetwork;
    optimizer: string;
    learning_rate: number;
    discount_factor: number;
    tau: number;
}
export interface TrainingEpisode {
    episode_id: string;
    start_time: number;
    end_time: number;
    states: RLState[];
    actions: RLAction[];
    rewards: RLReward[];
    total_reward: number;
    success_metrics: SuccessMetrics;
    policy_version: string;
    causal_insights: CausalInsight[];
}
export interface MultiObjectiveConfig {
    objectives: {
        mobility: {
            weight: number;
            target: number;
            priority: number;
        };
        energy: {
            weight: number;
            target: number;
            priority: number;
        };
        coverage: {
            weight: number;
            target: number;
            priority: number;
        };
        capacity: {
            weight: number;
            target: number;
            priority: number;
        };
    };
    algorithm: 'PPO' | 'A3C' | 'DDPG' | 'SAC' | 'HYBRID';
    exploration_strategy: 'epsilon_greedy' | 'boltzmann' | 'ucb' | 'thompson';
    update_frequency: number;
    target_update_frequency: number;
}
export declare class ReinforcementLearningEngine {
    private agentDB;
    private experienceReplay;
    private policyOptimizer;
    private rewardCalculator;
    private distributedCoordinator;
    private policyNetworks;
    private activePolicies;
    private trainingHistory;
    private performanceMetrics;
    private config;
    constructor(config: MultiObjectiveConfig);
    initialize(): Promise<void>;
    /**
     * Select optimal action using current policy and multi-objective optimization
     */
    selectAction(state: RLState, available_actions: RLAction[]): Promise<RLAction>;
    /**
     * Process environment feedback and update policies
     */
    processFeedback(state: RLState, action: RLAction, nextState: RLState, reward: RLReward, done: boolean): Promise<void>;
    /**
     * Update policies using multiple reinforcement learning algorithms
     */
    private updatePolicies;
    /**
     * Calculate multi-objective action values
     */
    private calculateMultiObjectiveActionValues;
    /**
     * Apply exploration strategy for action selection
     */
    private applyExplorationStrategy;
    /**
     * Epsilon-greedy action selection with multi-objective values
     */
    private epsilonGreedySelection;
    /**
     * Boltzmann (softmax) action selection
     */
    private boltzmannSelection;
    /**
     * Upper Confidence Bound (UCB) selection
     */
    private ucbSelection;
    /**
     * Thompson sampling for action selection
     */
    private thompsonSampling;
    /**
     * Initialize policy networks for each objective
     */
    private initializePolicyNetworks;
    /**
     * Setup distributed training coordination
     */
    private setupDistributedTraining;
    /**
     * Initialize experience replay with pattern recognition
     */
    private initializeExperienceReplay;
    private calculateExperiencePriority;
    private extractCausalInsights;
    private shouldUpdatePolicy;
    private weightedValue;
    private calculateCurrentEpsilon;
    private calculateTemperature;
    private calculateUCBConstant;
    private getActionCount;
    private getTotalActionCount;
    private getActionStatistics;
    private sampleFromPosterior;
    private gaussianRandom;
    private initializeNetworkWeights;
    private loadPretrainedPolicies;
    private setupPerformanceMonitoring;
    private getMultiObjectivePolicies;
    private calculateObjectiveValue;
    private calculateWeightedValue;
    private synthesizeOptimalAction;
    private storeActionSelection;
    private loadHistoricalExperiences;
    private updateMetaPolicy;
    private softUpdateTargetNetworks;
    private storePolicyUpdate;
    private syncLearningWithDistributedAgents;
    private handleDistributedPolicyUpdate;
    private handleSharedExperience;
    shutdown(): Promise<void>;
    private savePolicies;
    private saveMetrics;
}
export interface MultiObjectiveValue {
    mobility: number;
    energy: number;
    coverage: number;
    capacity: number;
    combined: number;
    confidence: number;
}
export interface RewardComponent {
    component: string;
    value: number;
    weight: number;
    causal_factors: CausalFactor[];
}
export interface CausalFactor {
    factor: string;
    influence: number;
    confidence: number;
    temporal_delay: number;
}
export interface CausalInsight {
    type: string;
    source: string;
    target: string;
    strength: number;
    confidence: number;
    temporal_delay: number;
}
export interface SuccessMetrics {
    handover_success_rate: number;
    energy_efficiency: number;
    coverage_quality: number;
    capacity_utilization: number;
    overall_performance: number;
}
export interface NetworkState {
    cells: CellState[];
    users: UserState[];
    congestion_level: number;
    interference_level: number;
}
export interface MobilityState {
    handover_events: HandoverEvent[];
    user_velocities: Map<string, number>;
    ping_pong_rate: number;
    mobility_prediction_accuracy: number;
}
export interface EnergyState {
    power_consumption: Map<string, number>;
    energy_efficiency: number;
    sleep_mode_utilization: number;
    green_energy_usage: number;
}
export interface CoverageState {
    signal_quality_map: Map<string, number>;
    coverage_holes: CoverageHole[];
    beamforming_effectiveness: number;
    user_satisfaction: number;
}
export interface CapacityState {
    throughput_map: Map<string, number>;
    latency_distribution: LatencyStats;
    spectral_efficiency: number;
    resource_utilization: number;
}
export interface CellState {
    cell_id: string;
    load: number;
    signal_strength: number;
    power_consumption: number;
    active_users: number;
}
export interface UserState {
    user_id: string;
    current_cell: string;
    signal_quality: number;
    throughput: number;
    latency: number;
}
export interface HandoverEvent {
    user_id: string;
    source_cell: string;
    target_cell: string;
    success: boolean;
    interruption_time: number;
}
export interface CoverageHole {
    location: {
        lat: number;
        lng: number;
    };
    severity: number;
    affected_users: number;
}
export interface LatencyStats {
    mean: number;
    p50: number;
    p95: number;
    p99: number;
}
export interface ActionStatistics {
    count: number;
    success_rate: number;
    average_reward: number;
    variance: number;
}
export declare class RLPerformanceMetrics {
    private actionCounts;
    private rewards;
    private actionSelectionTimes;
    recordActionSelection(time: number): void;
    recordReward(reward: RLReward): void;
    getActionCount(action: RLAction): number;
    getTotalActionCount(): number;
    getActionStatistics(action: RLAction): ActionStatistics;
    private actionKey;
}
//# sourceMappingURL=reinforcement-learning-engine.d.ts.map