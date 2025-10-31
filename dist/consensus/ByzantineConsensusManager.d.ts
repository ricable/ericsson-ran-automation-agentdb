/**
 * Byzantine Consensus Manager for Fault-Tolerant Swarm Coordination
 * Distributed agreement with critical decision making capabilities
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
interface ConsensusConfig {
    threshold: number;
    faultTolerance: boolean;
    distributedAgreement: boolean;
    criticalDecisionMaking: boolean;
}
export declare class ByzantineConsensusManager extends EventEmitter {
    private config;
    private state;
    private isActive;
    private nodeId;
    private votingPower;
    private reputationSystem;
    private consensusHistory;
    private faultDetector;
    constructor(config: ConsensusConfig);
    initialize(): Promise<void>;
    /**
     * Execute decision with Byzantine consensus
     */
    executeWithConsensus(decision: any, type?: 'critical' | 'normal' | 'healing' | 'emergency'): Promise<any>;
    /**
     * Create new proposal for consensus
     */
    private createProposal;
    /**
     * Broadcast proposal to all participant nodes
     */
    private broadcastProposal;
    /**
     * Collect votes from participants
     */
    private collectVotes;
    /**
     * Analyze consensus result
     */
    private analyzeConsensus;
    /**
     * Execute decision after consensus achievement
     */
    private executeDecision;
    /**
     * Handle consensus failure
     */
    private handleConsensusFailure;
    /**
     * Vote on a proposal
     */
    voteOnProposal(proposalId: string, vote: boolean, confidence?: number): Promise<void>;
    /**
     * Get current consensus status
     */
    getStatus(): Promise<any>;
    private setupParticipantNodes;
    private initializeVotingPower;
    private initializeReputationSystem;
    private initializeFaultDetector;
    private initializeFaultDetection;
    private startConsensusMonitoring;
    private getTimeoutForType;
    private getThresholdForType;
    private sendProposalToNode;
    private simulateVoteCollection;
    private checkConsensusAchieved;
    private calculateTotalVotingPower;
    private calculateAffirmativeVotingPower;
    private detectByzantineFaults;
    private executeHealingDecision;
    private executeOptimizationDecision;
    private executeTopologyDecision;
    private executeSpawningDecision;
    private executeGenericDecision;
    private analyzeConsensusFailure;
    private analyzeVotingPattern;
    private calculateVariance;
    private reportSuspiciousNode;
    private consensusRetry;
    private updateReputation;
    private checkProposalTimeouts;
    private performFaultDetection;
    private calculateAverageConsensusTime;
    /**
     * Shutdown consensus manager
     */
    shutdown(): Promise<void>;
}
export {};
//# sourceMappingURL=ByzantineConsensusManager.d.ts.map