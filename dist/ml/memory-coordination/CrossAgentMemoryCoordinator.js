"use strict";
/**
 * CrossAgentMemoryCoordinator - Memory Sharing Protocols for ML Development
 * Enables seamless knowledge sharing between ML-developer, researcher, and analyst agents
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrossAgentMemoryCoordinator = void 0;
const events_1 = require("events");
class CrossAgentMemoryCoordinator extends events_1.EventEmitter {
    constructor(config) {
        super();
        this.agentRegistry = new Map();
        this.sharedMemorySpaces = new Map();
        this.transferProtocols = new Map();
        this.activeTransfers = new Map();
        this.transferHistory = [];
        this.config = config;
        this.initializeKnowledgeGraph();
        this.initializeTransferMetrics();
    }
    /**
     * Initialize cross-agent memory coordinator
     */
    async initialize() {
        console.log('🤝 Initializing Cross-Agent Memory Coordinator...');
        try {
            // Phase 1: Register supported agents
            await this.registerAgents();
            // Phase 2: Setup shared memory spaces
            await this.setupSharedMemorySpaces();
            // Phase 3: Initialize transfer protocols
            await this.initializeTransferProtocols();
            // Phase 4: Setup knowledge transfer graph
            await this.setupKnowledgeTransferGraph();
            // Phase 5: Enable synchronization services
            await this.enableSynchronization();
            console.log('✅ Cross-Agent Memory Coordinator initialized');
            this.emit('initialized', { agentCount: this.agentRegistry.size });
        }
        catch (error) {
            console.error('❌ Cross-Agent Memory Coordinator initialization failed:', error);
            throw error;
        }
    }
    /**
     * Register a new agent for cross-agent memory sharing
     */
    async registerAgent(agentInfo) {
        console.log(`📝 Registering agent: ${agentInfo.agentId} (${agentInfo.agentType})`);
        try {
            // Validate agent configuration
            this.validateAgentConfig(agentInfo);
            // Register agent
            this.agentRegistry.set(agentInfo.agentId, { ...agentInfo, isConnected: true, lastSync: Date.now() });
            // Create knowledge node
            this.knowledgeGraph.nodes.set(agentInfo.agentId, {
                nodeId: agentInfo.agentId,
                agentType: agentInfo.agentType,
                knowledgeDomain: this.getPrimaryDomain(agentInfo),
                knowledgeScore: 0.5,
                contributionScore: 0.5,
                receptionScore: 0.5,
                activeConnections: []
            });
            // Setup agent-specific memory space if needed
            await this.setupAgentMemorySpace(agentInfo);
            // Establish connections with compatible agents
            await this.establishAgentConnections(agentInfo);
            console.log(`✅ Agent ${agentInfo.agentId} registered successfully`);
            this.emit('agent_registered', { agentId: agentInfo.agentId, agentType: agentInfo.agentType });
        }
        catch (error) {
            console.error(`❌ Failed to register agent ${agentInfo.agentId}:`, error);
            throw error;
        }
    }
    /**
     * Share memory pattern with target agents
     */
    async sharePattern(patternId, shareData) {
        console.log(`📚 Sharing pattern ${patternId} with agents...`);
        try {
            // Determine eligible target agents based on pattern and transferability
            const targetAgents = await this.findEligibleAgents(shareData);
            if (targetAgents.length === 0) {
                console.log(`ℹ️ No eligible agents found for pattern ${patternId}`);
                return;
            }
            // Create transfer protocol
            const transferProtocol = {
                protocolId: this.generateTransferId(),
                sourceAgent: this.config.swarmId,
                targetAgents: targetAgents.map(a => a.agentId),
                memoryType: shareData.type,
                transferData: shareData.pattern,
                metadata: {
                    transferId: this.generateTransferId(),
                    timestamp: Date.now(),
                    dataSize: JSON.stringify(shareData.pattern).length,
                    compressedSize: 0,
                    transferDuration: 0,
                    successRate: shareData.confidence,
                    applicableDomains: this.extractApplicableDomains(shareData.pattern),
                    requiredCapabilities: this.extractRequiredCapabilities(shareData.pattern),
                    confidence: shareData.confidence,
                    crossAgentTransferability: shareData.transferability
                },
                compressionEnabled: this.config.compressionEnabled,
                encryptionEnabled: this.config.encryptionEnabled,
                priority: this.determineTransferPriority(shareData)
            };
            // Compress data if enabled
            if (this.config.compressionEnabled) {
                transferProtocol.transferData = await this.compressData(shareData.pattern);
                transferProtocol.metadata.compressedSize = JSON.stringify(transferProtocol.transferData).length;
            }
            // Transfer to each target agent
            const transferPromises = targetAgents.map(async (agent) => {
                return await this.transferToAgent(transferProtocol, agent);
            });
            const results = await Promise.allSettled(transferPromises);
            // Process transfer results
            await this.processTransferResults(transferProtocol, results);
            // Update knowledge graph
            await this.updateKnowledgeGraph(transferProtocol, results);
            console.log(`✅ Pattern ${patternId} shared with ${results.filter(r => r.status === 'fulfilled').length} agents`);
            this.emit('pattern_shared', {
                patternId,
                targetCount: targetAgents.length,
                successCount: results.filter(r => r.status === 'fulfilled').length
            });
        }
        catch (error) {
            console.error(`❌ Failed to share pattern ${patternId}:`, error);
            throw error;
        }
    }
    /**
     * Broadcast pattern to all compatible agents
     */
    async broadcastPattern(patternId, broadcastData) {
        console.log(`📡 Broadcasting pattern ${patternId} to all agents...`);
        try {
            // Find all agents that match recommended domains
            const compatibleAgents = Array.from(this.agentRegistry.values()).filter(agent => broadcastData.recommended_for.some(domain => agent.activeDomains.includes(domain) ||
                agent.capabilities.some(cap => cap.includes(domain))));
            if (compatibleAgents.length === 0) {
                console.log(`ℹ️ No compatible agents found for broadcast ${patternId}`);
                return;
            }
            // Create broadcast transfer protocol
            const broadcastProtocol = {
                protocolId: this.generateTransferId(),
                sourceAgent: broadcastData.source_agent,
                targetAgents: compatibleAgents.map(a => a.agentId),
                memoryType: broadcastData.type,
                transferData: broadcastData.pattern,
                metadata: {
                    transferId: this.generateTransferId(),
                    timestamp: Date.now(),
                    dataSize: JSON.stringify(broadcastData.pattern).length,
                    compressedSize: 0,
                    transferDuration: 0,
                    successRate: broadcastData.confidence,
                    applicableDomains: broadcastData.recommended_for,
                    requiredCapabilities: [],
                    confidence: broadcastData.confidence,
                    crossAgentTransferability: 0.8 // High transferability for broadcasts
                },
                compressionEnabled: this.config.compressionEnabled,
                encryptionEnabled: this.config.encryptionEnabled,
                priority: 'medium'
            };
            // Execute broadcast
            await this.executeBroadcast(broadcastProtocol);
            console.log(`📡 Pattern ${patternId} broadcasted to ${compatibleAgents.length} agents`);
            this.emit('pattern_broadcasted', {
                patternId,
                agentCount: compatibleAgents.length
            });
        }
        catch (error) {
            console.error(`❌ Failed to broadcast pattern ${patternId}:`, error);
            throw error;
        }
    }
    /**
     * Request specific knowledge from other agents
     */
    async requestKnowledge(request) {
        console.log(`🔍 Requesting knowledge: ${request.query}`);
        try {
            // Find agents with relevant knowledge
            const knowledgeableAgents = await this.findKnowledgeableAgents(request);
            if (knowledgeableAgents.length === 0) {
                console.log(`ℹ️ No agents found with relevant knowledge for ${request.query}`);
                return [];
            }
            // Send knowledge requests to eligible agents
            const requestPromises = knowledgeableAgents.map(async (agent) => {
                return await this.sendKnowledgeRequest(agent, request);
            });
            const responses = await Promise.allSettled(requestPromises);
            // Process successful responses
            const successfulResponses = [];
            for (const response of responses) {
                if (response.status === 'fulfilled') {
                    successfulResponses.push(response.value);
                }
            }
            // Rank responses by relevance and confidence
            successfulResponses.sort((a, b) => (b.relevance * 0.7 + b.confidence * 0.3) -
                (a.relevance * 0.7 + a.confidence * 0.3));
            console.log(`🎯 Received ${successfulResponses.length} knowledge responses`);
            return successfulResponses.slice(0, request.limit || 10);
        }
        catch (error) {
            console.error(`❌ Failed to request knowledge:`, error);
            return [];
        }
    }
    /**
     * Submit feedback on shared patterns
     */
    async submitFeedback(feedback) {
        console.log(`💬 Submitting feedback for pattern ${feedback.patternId}`);
        try {
            // Validate feedback
            this.validateFeedback(feedback);
            // Find shared pattern
            const sharedPattern = await this.findSharedPattern(feedback.patternId);
            if (!sharedPattern) {
                throw new Error(`Pattern ${feedback.patternId} not found in shared memory`);
            }
            // Add feedback to pattern
            sharedPattern.feedback.push({
                agentId: feedback.agentId,
                feedbackType: feedback.feedbackType,
                rating: feedback.rating,
                comments: feedback.comments,
                timestamp: Date.now(),
                context: feedback.context
            });
            // Update pattern metrics
            if (feedback.feedbackType === 'success') {
                sharedPattern.successRate = (sharedPattern.successRate * 0.8) + (feedback.rating * 0.2);
            }
            else if (feedback.feedbackType === 'adaptation') {
                sharedPattern.adaptationCount++;
            }
            // Update agent usage metrics
            sharedPattern.usageByAgent.set(feedback.agentId, (sharedPattern.usageByAgent.get(feedback.agentId) || 0) + 1);
            // Update knowledge graph with feedback
            await this.updateKnowledgeGraphFromFeedback(feedback);
            console.log(`✅ Feedback submitted for pattern ${feedback.patternId}`);
            this.emit('feedback_submitted', { patternId: feedback.patternId, rating: feedback.rating });
        }
        catch (error) {
            console.error(`❌ Failed to submit feedback:`, error);
            throw error;
        }
    }
    /**
     * Get comprehensive statistics
     */
    async getStats() {
        try {
            const agentStats = this.calculateAgentStats();
            const transferStats = this.calculateTransferStats();
            const knowledgeGraphStats = this.calculateKnowledgeGraphStats();
            const memorySpaceStats = this.calculateMemorySpaceStats();
            return {
                agents: agentStats,
                transfers: transferStats,
                knowledgeGraph: knowledgeGraphStats,
                memorySpaces: memorySpaceStats,
                performance: {
                    totalTransfers: this.transferMetrics.totalTransfers,
                    successfulTransfers: this.transferMetrics.successfulTransfers,
                    successRate: this.transferMetrics.totalTransfers > 0 ?
                        this.transferMetrics.successfulTransfers / this.transferMetrics.totalTransfers : 0,
                    averageLatency: this.transferMetrics.averageLatency,
                    totalDataTransferred: this.transferMetrics.totalDataTransferred,
                    compressionRatio: this.transferMetrics.compressionRatio,
                    crossAgentSuccessRate: this.transferMetrics.crossAgentSuccessRate
                }
            };
        }
        catch (error) {
            console.error('❌ Failed to get statistics:', error);
            return null;
        }
    }
    // Private helper methods
    initializeKnowledgeGraph() {
        this.knowledgeGraph = {
            nodes: new Map(),
            edges: new Map(),
            transferPaths: new Map(),
            efficiency: 0.5,
            lastUpdate: Date.now()
        };
    }
    initializeTransferMetrics() {
        this.transferMetrics = {
            totalTransfers: 0,
            successfulTransfers: 0,
            averageLatency: 0,
            totalDataTransferred: 0,
            compressionRatio: 1.0,
            crossAgentSuccessRate: 0.5
        };
    }
    async registerAgents() {
        const defaultAgents = [
            {
                agentId: 'ml-developer-1',
                agentType: 'ml-developer',
                capabilities: ['reinforcement_learning', 'pattern_recognition', 'model_training'],
                activeDomains: ['mobility', 'energy', 'performance'],
                memoryQuotaGB: 10,
                syncPriority: 1,
                lastSync: Date.now(),
                isConnected: false
            },
            {
                agentId: 'ml-researcher-1',
                agentType: 'ml-researcher',
                capabilities: ['causal_inference', 'algorithm_development', 'experimental_analysis'],
                activeDomains: ['causal_analysis', 'algorithm_optimization'],
                memoryQuotaGB: 15,
                syncPriority: 1,
                lastSync: Date.now(),
                isConnected: false
            },
            {
                agentId: 'ml-analyst-1',
                agentType: 'ml-analyst',
                capabilities: ['data_analysis', 'performance_monitoring', 'trend_analysis'],
                activeDomains: ['performance', 'monitoring', 'analytics'],
                memoryQuotaGB: 8,
                syncPriority: 2,
                lastSync: Date.now(),
                isConnected: false
            }
        ];
        for (const agent of defaultAgents) {
            await this.registerAgent(agent);
        }
    }
    async setupSharedMemorySpaces() {
        const sharedSpace = {
            spaceId: 'ml-development-space',
            participants: Array.from(this.agentRegistry.values()),
            sharedPatterns: new Map(),
            accessControls: [],
            synchronizationRules: [
                {
                    ruleId: 'auto-share-success',
                    condition: 'success_rate > 0.8',
                    action: {
                        type: 'immediate',
                        targetAgents: ['all'],
                        filters: { minConfidence: 0.8 },
                        compressionLevel: 5
                    },
                    priority: 1,
                    enabled: true
                }
            ],
            lastConsolidation: Date.now(),
            totalSharedMemory: 0
        };
        this.sharedMemorySpaces.set(sharedSpace.spaceId, sharedSpace);
    }
    async initializeTransferProtocols() {
        // Initialize default transfer protocols
        const protocols = [
            {
                name: 'rl-episode-sharing',
                type: 'rl_episode',
                priority: 'high',
                compression: true,
                encryption: false
            },
            {
                name: 'causal-insight-sharing',
                type: 'causal_insight',
                priority: 'medium',
                compression: true,
                encryption: true
            },
            {
                name: 'optimization-pattern-sharing',
                type: 'optimization_pattern',
                priority: 'high',
                compression: true,
                encryption: false
            }
        ];
        for (const protocol of protocols) {
            this.transferProtocols.set(protocol.name, {
                protocolId: this.generateTransferId(),
                sourceAgent: this.config.swarmId,
                targetAgents: [],
                memoryType: protocol.type,
                transferData: null,
                metadata: {
                    transferId: '',
                    timestamp: Date.now(),
                    dataSize: 0,
                    compressedSize: 0,
                    transferDuration: 0,
                    successRate: 0.8,
                    applicableDomains: [],
                    requiredCapabilities: [],
                    confidence: 0.8,
                    crossAgentTransferability: 0.7
                },
                compressionEnabled: protocol.compression,
                encryptionEnabled: protocol.encryption,
                priority: protocol.priority
            });
        }
    }
    async setupKnowledgeTransferGraph() {
        // Create initial connections between compatible agents
        const agents = Array.from(this.agentRegistry.values());
        for (let i = 0; i < agents.length; i++) {
            for (let j = i + 1; j < agents.length; j++) {
                const agent1 = agents[i];
                const agent2 = agents[j];
                if (this.areAgentsCompatible(agent1, agent2)) {
                    await this.createKnowledgeConnection(agent1.agentId, agent2.agentId);
                }
            }
        }
    }
    async enableSynchronization() {
        // Setup periodic synchronization
        setInterval(async () => {
            await this.performPeriodicSync();
        }, this.config.syncInterval);
    }
    validateAgentConfig(agent) {
        if (!agent.agentId || !agent.agentType) {
            throw new Error('Agent ID and type are required');
        }
        if (!this.config.supportedAgents.includes(agent.agentType)) {
            throw new Error(`Agent type ${agent.agentType} is not supported`);
        }
        if (agent.memoryQuotaGB > this.config.maxMemoryPerAgent) {
            throw new Error(`Memory quota exceeds maximum allowed`);
        }
    }
    getPrimaryDomain(agent) {
        return agent.activeDomains[0] || 'general';
    }
    async setupAgentMemorySpace(agent) {
        // Implementation for agent-specific memory space setup
    }
    async establishAgentConnections(agent) {
        const compatibleAgents = Array.from(this.agentRegistry.values())
            .filter(a => a.agentId !== agent.agentId && this.areAgentsCompatible(agent, a));
        for (const compatibleAgent of compatibleAgents) {
            await this.createKnowledgeConnection(agent.agentId, compatibleAgent.agentId);
        }
    }
    areAgentsCompatible(agent1, agent2) {
        // Check domain overlap
        const domainOverlap = agent1.activeDomains.some(domain => agent2.activeDomains.includes(domain));
        // Check capability complementarity
        const capabilityComplement = agent1.capabilities.some(cap => !agent2.capabilities.includes(cap));
        return domainOverlap || capabilityComplement;
    }
    async createKnowledgeConnection(sourceId, targetId) {
        // Update source node connections
        const sourceNode = this.knowledgeGraph.nodes.get(sourceId);
        if (sourceNode) {
            sourceNode.activeConnections.push(targetId);
        }
        // Create knowledge edge
        const edgeId = `${sourceId}-${targetId}`;
        this.knowledgeGraph.edges.set(edgeId, {
            edgeId,
            sourceNode: sourceId,
            targetNode: targetId,
            transferCount: 0,
            successRate: 0.5,
            averageLatency: 0,
            bandwidthUsage: 0,
            lastTransfer: 0
        });
    }
    async findEligibleAgents(shareData) {
        return Array.from(this.agentRegistry.values()).filter(agent => shareData.confidence >= this.config.transferThreshold &&
            (shareData.applicableDomains?.some((domain) => agent.activeDomains.includes(domain)) || true));
    }
    determineTransferPriority(shareData) {
        if (shareData.confidence > 0.9 && shareData.transferability > 0.8)
            return 'critical';
        if (shareData.confidence > 0.8 && shareData.transferability > 0.6)
            return 'high';
        if (shareData.confidence > 0.6)
            return 'medium';
        return 'low';
    }
    extractApplicableDomains(pattern) {
        // Extract domains from pattern based on its structure and content
        return pattern.domain ? [pattern.domain] : [];
    }
    extractRequiredCapabilities(pattern) {
        // Extract required capabilities from pattern
        return pattern.required_capabilities || [];
    }
    async compressData(data) {
        // Simple compression simulation - in real implementation would use actual compression
        return {
            compressed: true,
            data: JSON.stringify(data),
            originalSize: JSON.stringify(data).length
        };
    }
    async transferToAgent(protocol, agent) {
        const startTime = performance.now();
        try {
            // Simulate transfer to agent
            await new Promise(resolve => setTimeout(resolve, Math.random() * 100));
            const transferTime = performance.now() - startTime;
            // Update transfer metrics
            this.transferMetrics.totalTransfers++;
            this.transferMetrics.successfulTransfers++;
            this.transferMetrics.totalDataTransferred += protocol.metadata.dataSize;
            this.transferMetrics.averageLatency =
                (this.transferMetrics.averageLatency + transferTime) / 2;
            return {
                success: true,
                agentId: agent.agentId,
                transferTime,
                receivedSize: protocol.metadata.dataSize
            };
        }
        catch (error) {
            this.transferMetrics.totalTransfers++;
            return {
                success: false,
                agentId: agent.agentId,
                error: error.message
            };
        }
    }
    async processTransferResults(protocol, results) {
        const successfulTransfers = results.filter(r => r.status === 'fulfilled').length;
        const totalTransfers = results.length;
        // Update transfer protocol metadata
        protocol.metadata.successRate = successfulTransfers / totalTransfers;
        protocol.metadata.transferDuration = performance.now();
        // Store in transfer history
        this.transferHistory.push({
            transferId: protocol.protocolId,
            timestamp: Date.now(),
            sourceAgent: protocol.sourceAgent,
            targetAgents: protocol.targetAgents,
            successRate: protocol.metadata.successRate,
            dataSize: protocol.metadata.dataSize
        });
    }
    async updateKnowledgeGraph(protocol, results) {
        // Update knowledge graph edges based on transfer results
        for (const result of results) {
            if (result.status === 'fulfilled') {
                const edgeId = `${protocol.sourceAgent}-${result.value.agentId}`;
                const edge = this.knowledgeGraph.edges.get(edgeId);
                if (edge) {
                    edge.transferCount++;
                    edge.lastTransfer = Date.now();
                    edge.successRate = (edge.successRate + 1) / 2;
                    edge.bandwidthUsage += protocol.metadata.dataSize;
                }
            }
        }
        this.knowledgeGraph.lastUpdate = Date.now();
    }
    async executeBroadcast(protocol) {
        const broadcastPromises = protocol.targetAgents.map(targetAgentId => {
            const targetAgent = this.agentRegistry.get(targetAgentId);
            if (targetAgent) {
                return this.transferToAgent(protocol, targetAgent);
            }
            return Promise.resolve({ success: false, agentId: targetAgentId });
        });
        const results = await Promise.allSettled(broadcastPromises);
        await this.processTransferResults(protocol, results);
    }
    async findKnowledgeableAgents(request) {
        return Array.from(this.agentRegistry.values()).filter(agent => agent.capabilities.some(cap => request.domains.some(domain => cap.includes(domain)) ||
            request.capabilities.includes(cap)));
    }
    async sendKnowledgeRequest(agent, request) {
        // Simulate knowledge request
        await new Promise(resolve => setTimeout(resolve, Math.random() * 200));
        return {
            agentId: agent.agentId,
            knowledge: this.generateMockKnowledge(request),
            relevance: Math.random(),
            confidence: Math.random() * 0.5 + 0.5,
            timestamp: Date.now()
        };
    }
    generateMockKnowledge(request) {
        return {
            type: 'mock_knowledge',
            query: request.query,
            content: `Mock knowledge response for ${request.query}`,
            sources: ['mock_source_1', 'mock_source_2']
        };
    }
    async findSharedPattern(patternId) {
        for (const space of this.sharedMemorySpaces.values()) {
            const pattern = space.sharedPatterns.get(patternId);
            if (pattern)
                return pattern;
        }
        return null;
    }
    validateFeedback(feedback) {
        if (!feedback.patternId || !feedback.agentId || !feedback.feedbackType) {
            throw new Error('Invalid feedback: missing required fields');
        }
        if (feedback.rating < 1 || feedback.rating > 5) {
            throw new Error('Invalid feedback: rating must be between 1 and 5');
        }
    }
    async updateKnowledgeGraphFromFeedback(feedback) {
        // Update knowledge graph based on feedback
        const sourceNode = this.knowledgeGraph.nodes.get(feedback.agentId);
        if (sourceNode) {
            if (feedback.feedbackType === 'success') {
                sourceNode.contributionScore = Math.min(1.0, sourceNode.contributionScore + 0.1);
            }
            else if (feedback.feedbackType === 'failure') {
                sourceNode.contributionScore = Math.max(0.0, sourceNode.contributionScore - 0.05);
            }
        }
    }
    calculateAgentStats() {
        const agents = Array.from(this.agentRegistry.values());
        return {
            total: agents.length,
            connected: agents.filter(a => a.isConnected).length,
            byType: agents.reduce((acc, agent) => {
                acc[agent.agentType] = (acc[agent.agentType] || 0) + 1;
                return acc;
            }, {}),
            totalMemoryQuota: agents.reduce((sum, agent) => sum + agent.memoryQuotaGB, 0)
        };
    }
    calculateTransferStats() {
        return {
            total: this.transferMetrics.totalTransfers,
            successful: this.transferMetrics.successfulTransfers,
            averageLatency: this.transferMetrics.averageLatency,
            totalDataTransferred: this.transferMetrics.totalDataTransferred,
            compressionRatio: this.transferMetrics.compressionRatio
        };
    }
    calculateKnowledgeGraphStats() {
        return {
            nodes: this.knowledgeGraph.nodes.size,
            edges: this.knowledgeGraph.edges.size,
            transferPaths: this.knowledgeGraph.transferPaths.size,
            efficiency: this.knowledgeGraph.efficiency,
            lastUpdate: this.knowledgeGraph.lastUpdate
        };
    }
    calculateMemorySpaceStats() {
        const spaces = Array.from(this.sharedMemorySpaces.values());
        return {
            totalSpaces: spaces.length,
            totalSharedPatterns: spaces.reduce((sum, space) => sum + space.sharedPatterns.size, 0),
            totalSharedMemory: spaces.reduce((sum, space) => sum + space.totalSharedMemory, 0)
        };
    }
    async performPeriodicSync() {
        // Implementation for periodic synchronization
    }
    generateTransferId() {
        return `transfer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}
exports.CrossAgentMemoryCoordinator = CrossAgentMemoryCoordinator;
exports.default = CrossAgentMemoryCoordinator;
//# sourceMappingURL=CrossAgentMemoryCoordinator.js.map