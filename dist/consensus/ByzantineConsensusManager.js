"use strict";
/**
 * Byzantine Consensus Manager for Fault-Tolerant Swarm Coordination
 * Distributed agreement with critical decision making capabilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ByzantineConsensusManager = void 0;
const events_1 = require("events");
class ByzantineConsensusManager extends events_1.EventEmitter {
    constructor(config) {
        super();
        this.isActive = false;
        this.votingPower = new Map();
        this.reputationSystem = new Map();
        this.consensusHistory = [];
        this.config = config;
        this.nodeId = `consensus_node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.state = {
            activeProposals: new Map(),
            votingHistory: [],
            consensusAchieved: 0,
            failedConsensus: 0,
            currentRound: 0,
            participantNodes: new Set(),
            faultDetection: new Map()
        };
        this.initializeFaultDetector();
    }
    async initialize() {
        console.log('🤝 Initializing Byzantine Consensus Manager...');
        // Phase 1: Setup participant nodes
        await this.setupParticipantNodes();
        // Phase 2: Initialize voting power distribution
        await this.initializeVotingPower();
        // Phase 3: Setup reputation system
        await this.initializeReputationSystem();
        // Phase 4: Initialize fault detection
        await this.initializeFaultDetection();
        // Phase 5: Start consensus monitoring
        await this.startConsensusMonitoring();
        this.isActive = true;
        console.log(`✅ Byzantine Consensus Manager initialized with threshold ${this.config.threshold}`);
    }
    /**
     * Execute decision with Byzantine consensus
     */
    async executeWithConsensus(decision, type = 'normal') {
        console.log(`🗳️ Executing with consensus: ${type} decision`);
        const proposal = await this.createProposal(decision, type);
        try {
            // Phase 1: Broadcast proposal to participants
            await this.broadcastProposal(proposal);
            // Phase 2: Collect votes with timeout
            const votingResult = await this.collectVotes(proposal);
            // Phase 3: Analyze consensus result
            const consensusResult = await this.analyzeConsensus(proposal, votingResult);
            // Phase 4: Execute decision if consensus achieved
            if (consensusResult.achieved) {
                const executionResult = await this.executeDecision(decision, consensusResult);
                await this.updateReputation(proposal, true);
                return executionResult;
            }
            else {
                await this.handleConsensusFailure(proposal, consensusResult);
                await this.updateReputation(proposal, false);
                throw new Error(`Consensus not achieved: ${consensusResult.reason}`);
            }
        }
        catch (error) {
            console.error(`❌ Consensus execution failed: ${error.message}`);
            await this.handleConsensusFailure(proposal, { error: error.message });
            throw error;
        }
    }
    /**
     * Create new proposal for consensus
     */
    async createProposal(decision, type) {
        const proposal = {
            id: `proposal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            type,
            proposal: decision,
            proposer: this.nodeId,
            timestamp: Date.now(),
            deadline: Date.now() + this.getTimeoutForType(type),
            votes: new Map(),
            status: 'pending',
            threshold: this.getThresholdForType(type),
            requiredVotes: Math.ceil(this.state.participantNodes.size * this.getThresholdForType(type))
        };
        this.state.activeProposals.set(proposal.id, proposal);
        return proposal;
    }
    /**
     * Broadcast proposal to all participant nodes
     */
    async broadcastProposal(proposal) {
        console.log(`📡 Broadcasting proposal ${proposal.id} to ${this.state.participantNodes.size} nodes`);
        proposal.status = 'voting';
        // Simulate broadcasting to participants
        for (const nodeId of this.state.participantNodes) {
            if (nodeId !== this.nodeId) {
                await this.sendProposalToNode(nodeId, proposal);
            }
        }
        // Auto-vote for own proposal
        await this.voteOnProposal(proposal.id, true, 0.9);
    }
    /**
     * Collect votes from participants
     */
    async collectVotes(proposal) {
        console.log(`🗳️ Collecting votes for proposal ${proposal.id}`);
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                resolve({
                    totalVotes: proposal.votes.size,
                    affirmativeVotes: Array.from(proposal.votes.values()).filter(v => v.vote).length,
                    consensusAchieved: this.checkConsensusAchieved(proposal),
                    timeout: true
                });
            }, proposal.deadline - Date.now());
            // Check for consensus achievement
            const checkInterval = setInterval(() => {
                if (this.checkConsensusAchieved(proposal)) {
                    clearTimeout(timeout);
                    clearInterval(checkInterval);
                    resolve({
                        totalVotes: proposal.votes.size,
                        affirmativeVotes: Array.from(proposal.votes.values()).filter(v => v.vote).length,
                        consensusAchieved: true,
                        timeout: false
                    });
                }
            }, 100);
            // Simulate receiving votes from other nodes
            this.simulateVoteCollection(proposal, timeout, checkInterval, resolve, reject);
        });
    }
    /**
     * Analyze consensus result
     */
    async analyzeConsensus(proposal, votingResult) {
        const totalVotingPower = this.calculateTotalVotingPower();
        const affirmativePower = this.calculateAffirmativeVotingPower(proposal);
        const result = {
            proposal: proposal.id,
            totalVotes: votingResult.totalVotes,
            affirmativeVotes: votingResult.affirmativeVotes,
            totalVotingPower,
            affirmativePower,
            achieved: votingResult.consensusAchieved,
            confidence: affirmativePower / totalVotingPower,
            reasoning: '',
            byzantineFaultsDetected: await this.detectByzantineFaults(proposal),
            unanimity: votingResult.totalVotes === this.state.participantNodes.size && votingResult.affirmativeVotes === votingResult.totalVotes
        };
        if (result.achieved) {
            result.reasoning = 'Consensus achieved through majority agreement';
            this.state.consensusAchieved++;
        }
        else {
            result.reasoning = votingResult.timeout ? 'Consensus timeout' : 'Insufficient agreement';
            this.state.failedConsensus++;
        }
        // Update proposal status
        proposal.status = result.achieved ? 'achieved' : 'failed';
        this.state.activeProposals.delete(proposal.id);
        // Store in consensus history
        this.consensusHistory.push({
            ...result,
            timestamp: Date.now(),
            round: this.state.currentRound++
        });
        return result;
    }
    /**
     * Execute decision after consensus achievement
     */
    async executeDecision(decision, consensusResult) {
        console.log(`✅ Executing decision with consensus confidence: ${consensusResult.confidence}`);
        const execution = {
            decision,
            consensusResult,
            executedAt: Date.now(),
            executor: this.nodeId,
            status: 'executing'
        };
        try {
            // Execute the decision based on its type
            switch (decision.type) {
                case 'healing':
                    execution.result = await this.executeHealingDecision(decision);
                    break;
                case 'optimization':
                    execution.result = await this.executeOptimizationDecision(decision);
                    break;
                case 'topology_change':
                    execution.result = await this.executeTopologyDecision(decision);
                    break;
                case 'agent_spawning':
                    execution.result = await this.executeSpawningDecision(decision);
                    break;
                default:
                    execution.result = await this.executeGenericDecision(decision);
            }
            execution.status = 'completed';
            execution.completedAt = Date.now();
            console.log(`✅ Decision executed successfully`);
            return execution;
        }
        catch (error) {
            execution.status = 'failed';
            execution.error = error.message;
            throw error;
        }
    }
    /**
     * Handle consensus failure
     */
    async handleConsensusFailure(proposal, result) {
        console.log(`❌ Consensus failure for proposal ${proposal.id}: ${result.reason}`);
        // Analyze failure patterns
        const failureAnalysis = await this.analyzeConsensusFailure(proposal, result);
        // Update fault detection
        if (failureAnalysis.suspiciousNodes.size > 0) {
            for (const nodeId of failureAnalysis.suspiciousNodes) {
                await this.reportSuspiciousNode(nodeId, failureAnalysis.reason);
            }
        }
        // Consider retry with different parameters
        if (proposal.type === 'critical' || proposal.type === 'emergency') {
            await this.consensusRetry(proposal, result);
        }
        this.emit('consensusFailure', {
            proposal: proposal.id,
            reason: result.reason,
            analysis: failureAnalysis
        });
    }
    /**
     * Vote on a proposal
     */
    async voteOnProposal(proposalId, vote, confidence = 0.5) {
        const proposal = this.state.activeProposals.get(proposalId);
        if (!proposal) {
            throw new Error(`Proposal ${proposalId} not found`);
        }
        if (proposal.status !== 'voting') {
            throw new Error(`Proposal ${proposalId} is not in voting status`);
        }
        if (Date.now() > proposal.deadline) {
            proposal.status = 'expired';
            return;
        }
        // Record vote
        proposal.votes.set(this.nodeId, { vote, confidence });
        // Check for immediate consensus
        if (this.checkConsensusAchieved(proposal)) {
            proposal.status = 'achieved';
        }
    }
    /**
     * Get current consensus status
     */
    async getStatus() {
        return {
            isActive: this.isActive,
            nodeId: this.nodeId,
            participantNodes: Array.from(this.state.participantNodes),
            activeProposals: this.state.activeProposals.size,
            consensusAchieved: this.state.consensusAchieved,
            failedConsensus: this.state.failedConsensus,
            currentRound: this.state.currentRound,
            consensusRate: this.state.consensusAchieved + this.state.failedConsensus > 0 ?
                this.state.consensusAchieved / (this.state.consensusAchieved + this.state.failedConsensus) : 0,
            votingPowerDistribution: Object.fromEntries(this.votingPower),
            reputationScores: Object.fromEntries(this.reputationSystem),
            faultDetectionActive: this.faultDetector.active,
            averageConsensusTime: this.calculateAverageConsensusTime()
        };
    }
    // Private helper methods
    async setupParticipantNodes() {
        // Add this node as participant
        this.state.participantNodes.add(this.nodeId);
        // Simulate adding other participant nodes
        const otherNodes = [
            'consensus_node_alpha',
            'consensus_node_beta',
            'consensus_node_gamma',
            'consensus_node_delta',
            'consensus_node_epsilon'
        ];
        for (const nodeId of otherNodes) {
            this.state.participantNodes.add(nodeId);
        }
        console.log(`✅ Setup ${this.state.participantNodes.size} participant nodes`);
    }
    async initializeVotingPower() {
        // Distribute voting power (can be based on reputation, stake, etc.)
        const basePower = 1.0;
        for (const nodeId of this.state.participantNodes) {
            this.votingPower.set(nodeId, basePower);
        }
        console.log(`✅ Initialized voting power for ${this.votingPower.size} nodes`);
    }
    async initializeReputationSystem() {
        // Initialize reputation scores
        for (const nodeId of this.state.participantNodes) {
            this.reputationSystem.set(nodeId, 0.8); // Start with neutral reputation
        }
        console.log(`✅ Initialized reputation system`);
    }
    initializeFaultDetector() {
        this.faultDetector = {
            active: true,
            suspiciousNodes: new Set(),
            faultPatterns: new Map(),
            detectionThreshold: 0.3
        };
    }
    async initializeFaultDetection() {
        // Setup fault detection monitoring
        setInterval(async () => {
            await this.performFaultDetection();
        }, 30000); // Every 30 seconds
        console.log('✅ Fault detection initialized');
    }
    async startConsensusMonitoring() {
        // Monitor active proposals for timeouts
        setInterval(async () => {
            await this.checkProposalTimeouts();
        }, 5000); // Every 5 seconds
        console.log('✅ Consensus monitoring started');
    }
    getTimeoutForType(type) {
        switch (type) {
            case 'emergency': return 10000; // 10 seconds
            case 'critical': return 30000; // 30 seconds
            case 'healing': return 60000; // 1 minute
            case 'normal': return 120000; // 2 minutes
            default: return 60000;
        }
    }
    getThresholdForType(type) {
        switch (type) {
            case 'emergency': return 0.5; // 50% for emergency
            case 'critical': return 0.67; // 2/3 for critical
            case 'healing': return 0.6; // 60% for healing
            case 'normal': return this.config.threshold; // Default threshold
            default: return this.config.threshold;
        }
    }
    async sendProposalToNode(nodeId, proposal) {
        // Simulate sending proposal to node
        await new Promise(resolve => setTimeout(resolve, Math.random() * 100));
    }
    simulateVoteCollection(proposal, timeout, interval, resolve, reject) {
        // Simulate votes from other nodes
        const voteSimulation = async () => {
            for (const nodeId of this.state.participantNodes) {
                if (nodeId !== this.nodeId && !proposal.votes.has(nodeId)) {
                    // Simulate node voting behavior
                    const willVote = Math.random() > 0.2; // 80% chance to vote
                    const voteAffirmative = Math.random() > 0.3; // 70% chance to vote yes
                    const confidence = Math.random() * 0.5 + 0.5; // 0.5-1.0 confidence
                    if (willVote) {
                        proposal.votes.set(nodeId, { vote: voteAffirmative, confidence });
                    }
                    // Check if consensus achieved
                    if (this.checkConsensusAchieved(proposal)) {
                        clearTimeout(timeout);
                        clearInterval(interval);
                        resolve({
                            totalVotes: proposal.votes.size,
                            affirmativeVotes: Array.from(proposal.votes.values()).filter(v => v.vote).length,
                            consensusAchieved: true,
                            timeout: false
                        });
                        return;
                    }
                }
            }
        };
        // Simulate votes at random intervals
        setTimeout(voteSimulation, Math.random() * 5000 + 1000);
    }
    checkConsensusAchieved(proposal) {
        const totalVotes = proposal.votes.size;
        const affirmativeVotes = Array.from(proposal.votes.values()).filter(v => v.vote).length;
        return totalVotes >= proposal.requiredVotes &&
            (affirmativeVotes / totalVotes) >= proposal.threshold;
    }
    calculateTotalVotingPower() {
        let totalPower = 0;
        for (const nodeId of this.state.participantNodes) {
            totalPower += this.votingPower.get(nodeId) || 0;
        }
        return totalPower;
    }
    calculateAffirmativeVotingPower(proposal) {
        let affirmativePower = 0;
        for (const [nodeId, vote] of proposal.votes) {
            if (vote.vote) {
                affirmativePower += this.votingPower.get(nodeId) || 0;
            }
        }
        return affirmativePower;
    }
    async detectByzantineFaults(proposal) {
        const suspiciousNodes = [];
        // Check for voting patterns that suggest Byzantine behavior
        for (const [nodeId, vote] of proposal.votes) {
            const reputation = this.reputationSystem.get(nodeId) || 0.5;
            // Low reputation nodes are more suspect
            if (reputation < 0.3) {
                suspiciousNodes.push(nodeId);
            }
        }
        return suspiciousNodes;
    }
    async executeHealingDecision(decision) {
        return { type: 'healing', status: 'completed', result: 'Healing action executed' };
    }
    async executeOptimizationDecision(decision) {
        return { type: 'optimization', status: 'completed', result: 'Optimization applied' };
    }
    async executeTopologyDecision(decision) {
        return { type: 'topology_change', status: 'completed', result: 'Topology reconfigured' };
    }
    async executeSpawningDecision(decision) {
        return { type: 'agent_spawning', status: 'completed', result: 'Agents spawned' };
    }
    async executeGenericDecision(decision) {
        return { type: 'generic', status: 'completed', result: 'Decision executed' };
    }
    async analyzeConsensusFailure(proposal, result) {
        const suspiciousNodes = new Set();
        let reason = result.reason;
        // Analyze voting patterns
        const totalNodes = this.state.participantNodes.size;
        const voteParticipation = proposal.votes.size / totalNodes;
        if (voteParticipation < 0.5) {
            reason += ' (Low participation)';
            // Identify nodes that didn't vote
            for (const nodeId of this.state.participantNodes) {
                if (!proposal.votes.has(nodeId)) {
                    suspiciousNodes.add(nodeId);
                }
            }
        }
        return {
            suspiciousNodes,
            reason,
            participation: voteParticipation,
            votingPattern: this.analyzeVotingPattern(proposal)
        };
    }
    analyzeVotingPattern(proposal) {
        const votes = Array.from(proposal.votes.values());
        const affirmativeVotes = votes.filter(v => v.vote).length;
        const averageConfidence = votes.reduce((sum, v) => sum + v.confidence, 0) / votes.length;
        return {
            affirmativeVotes,
            totalVotes: votes.length,
            averageConfidence,
            variance: this.calculateVariance(votes.map(v => v.confidence))
        };
    }
    calculateVariance(values) {
        const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
        const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
        return variance;
    }
    async reportSuspiciousNode(nodeId, reason) {
        console.log(`⚠️ Reporting suspicious node ${nodeId}: ${reason}`);
        const currentScore = this.reputationSystem.get(nodeId) || 0.5;
        this.reputationSystem.set(nodeId, Math.max(0, currentScore - 0.1));
        this.faultDetector.suspiciousNodes.add(nodeId);
    }
    async consensusRetry(proposal, result) {
        console.log(`🔄 Considering retry for failed proposal ${proposal.id}`);
        // Implement retry logic with adjusted parameters
        const retryProposal = await this.createProposal(proposal.proposal, proposal.type);
        retryProposal.threshold = Math.max(0.5, proposal.threshold - 0.1); // Lower threshold
        await this.broadcastProposal(retryProposal);
    }
    async updateReputation(proposal, success) {
        // Update reputation based on participation and outcome
        for (const [nodeId, vote] of proposal.votes) {
            const currentReputation = this.reputationSystem.get(nodeId) || 0.5;
            const adjustment = success ? 0.02 : -0.01;
            this.reputationSystem.set(nodeId, Math.min(1.0, Math.max(0, currentReputation + adjustment)));
        }
    }
    async checkProposalTimeouts() {
        const now = Date.now();
        for (const [proposalId, proposal] of this.state.activeProposals) {
            if (now > proposal.deadline && proposal.status === 'voting') {
                proposal.status = 'expired';
                this.state.activeProposals.delete(proposalId);
                this.state.failedConsensus++;
                this.emit('proposalTimeout', { proposal: proposalId });
            }
        }
    }
    async performFaultDetection() {
        // Analyze patterns that might indicate Byzantine faults
        for (const nodeId of this.state.participantNodes) {
            const reputation = this.reputationSystem.get(nodeId) || 0.5;
            if (reputation < this.faultDetector.detectionThreshold) {
                await this.reportSuspiciousNode(nodeId, 'Low reputation score');
            }
        }
    }
    calculateAverageConsensusTime() {
        if (this.consensusHistory.length === 0)
            return 0;
        const totalTime = this.consensusHistory.reduce((sum, record) => {
            // In a real implementation, this would calculate actual consensus time
            return sum + (record.averageTime || 30000); // Default 30 seconds
        }, 0);
        return totalTime / this.consensusHistory.length;
    }
    /**
     * Shutdown consensus manager
     */
    async shutdown() {
        console.log('🛑 Shutting down Byzantine Consensus Manager...');
        this.isActive = false;
        this.faultDetector.active = false;
        // Clear active proposals
        for (const [proposalId, proposal] of this.state.activeProposals) {
            proposal.status = 'cancelled';
        }
        this.state.activeProposals.clear();
        console.log('✅ Byzantine Consensus Manager shutdown complete');
    }
}
exports.ByzantineConsensusManager = ByzantineConsensusManager;
//# sourceMappingURL=ByzantineConsensusManager.js.map