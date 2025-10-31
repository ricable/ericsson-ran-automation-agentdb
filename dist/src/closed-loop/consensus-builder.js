"use strict";
/**
 * Consensus Builder for Closed-Loop Optimization
 * Implements distributed consensus for optimization decisions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsensusBuilder = void 0;
const events_1 = require("events");
class ConsensusBuilder extends events_1.EventEmitter {
    constructor(config) {
        super();
        this.activeVoting = new Map();
        this.votingTimeouts = new Map();
        this.config = {
            maxRetries: 3,
            ...config
        };
    }
    /**
     * Build consensus for optimization proposals
     */
    async buildConsensus(proposals, agents = []) {
        if (proposals.length === 0) {
            throw new Error('No proposals provided for consensus building');
        }
        if (proposals.length === 1) {
            // Single proposal - auto-approve if meets minimum quality
            const proposal = proposals[0];
            if (this.evaluateProposalQuality(proposal) >= 0.6) {
                return {
                    approved: true,
                    approvedProposal: proposal,
                    threshold: this.config.threshold,
                    votes: [{
                            proposalId: proposal.id,
                            votes: 1,
                            agents: ['auto-approve']
                        }]
                };
            }
        }
        // Multi-proposal consensus building
        const votes = [];
        // Simulate votes from optimization agents
        const agentVotes = await this.collectAgentVotes(proposals, agents);
        votes.push(...agentVotes);
        // Calculate consensus result
        const result = this.calculateConsensusResult(proposals[0].id, votes);
        this.activeVoting.set(proposals[0].id, result);
        this.emit('votesCollected', result);
        // Check if consensus is reached
        if (result.consensusReached && result.approvalPercentage >= this.config.threshold) {
            return {
                approved: true,
                approvedProposal: proposals[0],
                threshold: this.config.threshold,
                votes: this.transformVotesToResultFormat(votes)
            };
        }
        return {
            approved: false,
            rejectionReason: `Consensus not reached: ${result.approvalPercentage.toFixed(1)}% < ${this.config.threshold}%`,
            threshold: this.config.threshold,
            votes: this.transformVotesToResultFormat(votes)
        };
    }
    /**
     * Simulate collection of votes from optimization agents
     */
    async collectAgentVotes(proposals, agents) {
        const votes = [];
        const targetAgents = agents.length > 0 ? agents : this.getDefaultOptimizationAgents();
        for (const proposal of proposals) {
            for (const agent of targetAgents) {
                const vote = await this.generateAgentVote(proposal, agent);
                votes.push(vote);
            }
        }
        return votes;
    }
    /**
     * Get default optimization agents
     */
    getDefaultOptimizationAgents() {
        return [
            {
                id: 'energy-optimizer',
                type: 'energy',
                capabilities: ['energy-efficiency', 'power-management'],
                weight: 1.0
            },
            {
                id: 'mobility-manager',
                type: 'mobility',
                capabilities: ['handover', 'cell-reselection'],
                weight: 1.0
            },
            {
                id: 'coverage-analyzer',
                type: 'coverage',
                capabilities: ['signal-strength', 'cell-planning'],
                weight: 1.0
            },
            {
                id: 'capacity-planner',
                type: 'capacity',
                capabilities: ['traffic-management', 'resource-allocation'],
                weight: 1.0
            },
            {
                id: 'performance-optimizer',
                type: 'performance',
                capabilities: ['qos-optimization', 'latency-reduction'],
                weight: 1.0
            }
        ];
    }
    /**
     * Generate a vote from an optimization agent
     */
    async generateAgentVote(proposal, agent) {
        // Simulate agent decision-making based on capabilities and proposal type
        const compatibility = this.calculateAgentCompatibility(agent, proposal);
        const proposalQuality = this.evaluateProposalQuality(proposal);
        const agentConfidence = this.calculateAgentConfidence(agent, proposal);
        let vote;
        const voteThreshold = compatibility * proposalQuality;
        if (voteThreshold > 0.8) {
            vote = 'approve';
        }
        else if (voteThreshold < 0.4) {
            vote = 'reject';
        }
        else {
            vote = 'abstain';
        }
        return {
            proposalId: proposal.id,
            agentId: agent.id,
            vote,
            weight: agent.weight,
            confidence: agentConfidence,
            timestamp: Date.now()
        };
    }
    /**
     * Calculate agent compatibility with proposal
     */
    calculateAgentCompatibility(agent, proposal) {
        // Check if proposal type matches agent capabilities
        const typeCompatibility = agent.type === proposal.type ? 1.0 : 0.5;
        // Check for specific capability matches
        const capabilityMatches = agent.capabilities.filter(cap => proposal.name.toLowerCase().includes(cap.toLowerCase()) ||
            proposal.type.toLowerCase().includes(cap.toLowerCase())).length;
        const capabilityScore = Math.min(1.0, capabilityMatches / agent.capabilities.length);
        return (typeCompatibility + capabilityScore) / 2;
    }
    /**
     * Evaluate proposal quality
     */
    evaluateProposalQuality(proposal) {
        const impactScore = Math.min(1.0, proposal.expectedImpact / 100);
        const confidenceScore = proposal.confidence;
        const priorityScore = Math.min(1.0, proposal.priority / 10);
        const riskPenalty = proposal.riskLevel === 'high' ? 0.2 :
            proposal.riskLevel === 'medium' ? 0.1 : 0;
        return (impactScore + confidenceScore + priorityScore) / 3 - riskPenalty;
    }
    /**
     * Calculate agent confidence in proposal
     */
    calculateAgentConfidence(agent, proposal) {
        const baseConfidence = 0.7;
        const compatibility = this.calculateAgentCompatibility(agent, proposal);
        const capabilityBonus = agent.capabilities.length * 0.05;
        return Math.min(1.0, baseConfidence + (compatibility * 0.3) + capabilityBonus);
    }
    /**
     * Calculate consensus result from votes
     */
    calculateConsensusResult(proposalId, votes) {
        const relevantVotes = votes.filter(v => v.proposalId === proposalId);
        if (relevantVotes.length === 0) {
            return {
                proposalId,
                totalVotes: 0,
                approvalVotes: 0,
                rejectionVotes: 0,
                abstainVotes: 0,
                approvalPercentage: 0,
                threshold: this.config.threshold,
                consensusReached: false,
                votes: []
            };
        }
        const weightedApprovals = relevantVotes
            .filter(v => v.vote === 'approve')
            .reduce((sum, v) => sum + (v.weight * v.confidence), 0);
        const weightedRejections = relevantVotes
            .filter(v => v.vote === 'reject')
            .reduce((sum, v) => sum + (v.weight * v.confidence), 0);
        const weightedAbstains = relevantVotes
            .filter(v => v.vote === 'abstain')
            .reduce((sum, v) => sum + (v.weight * v.confidence), 0);
        const totalWeight = relevantVotes.reduce((sum, v) => sum + v.weight, 0);
        const approvalPercentage = totalWeight > 0 ? (weightedApprovals / totalWeight) * 100 : 0;
        const consensusThreshold = this.config.votingMechanism === 'unanimous' ? 100 :
            this.config.votingMechanism === 'weighted' ? this.config.threshold :
                Math.max(50, this.config.threshold * 0.8);
        return {
            proposalId,
            totalVotes: relevantVotes.length,
            approvalVotes: relevantVotes.filter(v => v.vote === 'approve').length,
            rejectionVotes: relevantVotes.filter(v => v.vote === 'reject').length,
            abstainVotes: relevantVotes.filter(v => v.vote === 'abstain').length,
            approvalPercentage,
            threshold: consensusThreshold,
            consensusReached: approvalPercentage >= consensusThreshold,
            votes: relevantVotes
        };
    }
    /**
     * Get active voting results
     */
    getActiveVoting() {
        return Array.from(this.activeVoting.values());
    }
    /**
     * Cleanup voting results
     */
    cleanupVoting(proposalId) {
        this.activeVoting.delete(proposalId);
        const timeout = this.votingTimeouts.get(proposalId);
        if (timeout) {
            clearTimeout(timeout);
            this.votingTimeouts.delete(proposalId);
        }
    }
    /**
     * Transform votes to result format
     */
    transformVotesToResultFormat(votes) {
        const proposalVotes = new Map();
        votes.forEach(vote => {
            if (!proposalVotes.has(vote.proposalId)) {
                proposalVotes.set(vote.proposalId, { votes: 0, agents: [] });
            }
            const proposalVote = proposalVotes.get(vote.proposalId);
            if (vote.vote === 'approve') {
                proposalVote.votes += vote.weight;
            }
            proposalVote.agents.push(vote.agentId);
        });
        return Array.from(proposalVotes.entries()).map(([proposalId, data]) => ({
            proposalId,
            votes: data.votes,
            agents: data.agents
        }));
    }
    /**
     * Shutdown consensus builder
     */
    shutdown() {
        // Cleanup all active voting
        for (const proposalId of this.activeVoting.keys()) {
            this.cleanupVoting(proposalId);
        }
        this.activeVoting.clear();
        this.votingTimeouts.clear();
    }
}
exports.ConsensusBuilder = ConsensusBuilder;
//# sourceMappingURL=consensus-builder.js.map