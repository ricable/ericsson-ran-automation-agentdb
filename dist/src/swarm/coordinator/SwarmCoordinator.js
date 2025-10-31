"use strict";
/**
 * Hierarchical Swarm Coordinator with Adaptive Topology
 * Advanced coordination for cognitive RAN swarm consciousness
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwarmCoordinator = void 0;
const events_1 = require("events");
class SwarmCoordinator extends events_1.EventEmitter {
    constructor(config) {
        super();
        this.agents = new Map();
        this.tasks = new Map();
        this.isActive = false;
        this.adaptationHistory = [];
        this.heartbeatInterval = null;
        this.config = config;
        this.currentTopology = config.topology;
        this.performanceMetrics = {
            totalTasks: 0,
            completedTasks: 0,
            failedTasks: 0,
            averageTaskTime: 0,
            swarmEfficiency: 0
        };
    }
    async deploy() {
        console.log(`🚀 Deploying Swarm Coordinator: ${this.config.swarmId}`);
        // Phase 1: Initialize topology
        await this.initializeTopology();
        // Phase 2: Setup agent management
        await this.setupAgentManagement();
        // Phase 3: Initialize task orchestration
        await this.initializeTaskOrchestration();
        // Phase 4: Setup adaptive mechanisms
        await this.setupAdaptiveMechanisms();
        // Phase 5: Start monitoring
        await this.startSwarmMonitoring();
        // Phase 6: Connect with consciousness and memory
        await this.connectWithCognitiveSystems();
        this.isActive = true;
        console.log(`✅ Swarm Coordinator deployed with ${this.config.topology} topology`);
    }
    /**
     * Execute task with swarm coordination
     */
    async executeWithCoordination(taskRequest) {
        console.log(`🎯 Executing with swarm coordination: ${taskRequest.task}`);
        const execution = {
            id: `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            task: taskRequest.task,
            priority: taskRequest.priority,
            startTime: Date.now(),
            agents: [],
            coordination: {
                strategy: this.selectCoordinationStrategy(taskRequest),
                topology: this.currentTopology,
                consensus: taskRequest.consensusRequired || false
            },
            performance: {}
        };
        try {
            // Phase 1: Task decomposition and planning
            const taskPlan = await this.decomposeTask(taskRequest);
            execution.tasks = taskPlan.tasks;
            // Phase 2: Agent selection and assignment
            const assignments = await this.assignTasksToAgents(taskPlan.tasks);
            execution.assignments = assignments;
            // Phase 3: Execute tasks with coordination
            const results = await this.executeTasksWithCoordination(assignments, execution.coordination);
            execution.results = results;
            // Phase 4: Aggregate results
            const aggregatedResult = await this.aggregateResults(results);
            execution.result = aggregatedResult;
            // Phase 5: Performance analysis
            execution.performance = await this.analyzeExecutionPerformance(execution);
            execution.endTime = Date.now();
            execution.status = 'completed';
            console.log(`✅ Swarm coordination completed: ${execution.endTime - execution.startTime}ms`);
            return execution;
        }
        catch (error) {
            execution.status = 'failed';
            execution.error = error.message;
            console.error(`❌ Swarm coordination failed: ${error.message}`);
            throw error;
        }
    }
    /**
     * Get swarm topology status
     */
    async getTopologyStatus() {
        return {
            currentTopology: this.currentTopology,
            configTopology: this.config.topology,
            adaptationCount: this.adaptationHistory.length,
            lastAdaptation: this.adaptationHistory.length > 0 ?
                this.adaptationHistory[this.adaptationHistory.length - 1] : null,
            agents: {
                total: this.agents.size,
                active: Array.from(this.agents.values()).filter(a => a.status === 'active').length,
                busy: Array.from(this.agents.values()).filter(a => a.status === 'busy').length,
                idle: Array.from(this.agents.values()).filter(a => a.status === 'idle').length
            },
            performance: this.performanceMetrics
        };
    }
    /**
     * Get performance metrics
     */
    async getPerformanceMetrics() {
        const agentMetrics = Array.from(this.agents.values()).map(agent => ({
            id: agent.id,
            name: agent.name,
            type: agent.type,
            status: agent.status,
            performance: agent.performance,
            currentTask: agent.currentTask
        }));
        const taskMetrics = Array.from(this.tasks.values()).map(task => ({
            id: task.id,
            type: task.type,
            status: task.status,
            priority: task.priority,
            duration: task.completedAt && task.startedAt ?
                task.completedAt - task.startedAt : null
        }));
        return {
            swarm: this.performanceMetrics,
            agents: agentMetrics,
            tasks: taskMetrics,
            topology: this.currentTopology,
            efficiency: this.calculateSwarmEfficiency(),
            adaptation: this.adaptationHistory.slice(-5) // Last 5 adaptations
        };
    }
    async initializeTopology() {
        console.log(`🔗 Initializing ${this.config.topology} topology...`);
        switch (this.config.topology) {
            case 'hierarchical':
                this.topology = await this.createHierarchicalTopology();
                break;
            case 'mesh':
                this.topology = await this.createMeshTopology();
                break;
            case 'ring':
                this.topology = await this.createRingTopology();
                break;
            case 'star':
                this.topology = await this.createStarTopology();
                break;
        }
        console.log(`✅ ${this.config.topology} topology initialized`);
    }
    async createHierarchicalTopology() {
        return {
            type: 'hierarchical',
            levels: 3,
            coordinator: this.config.swarmId,
            structure: {
                level1: ['coordinator'],
                level2: ['managers'],
                level3: ['workers'] // Worker agents
            },
            communication: ['top-down', 'bottom-up'],
            loadBalancing: 'hierarchical'
        };
    }
    async createMeshTopology() {
        return {
            type: 'mesh',
            connectivity: 'full',
            redundancy: 'high',
            faultTolerance: 'high',
            communication: 'peer-to-peer',
            loadBalancing: 'distributed'
        };
    }
    async createRingTopology() {
        return {
            type: 'ring',
            direction: 'bidirectional',
            redundancy: 'medium',
            communication: 'sequential',
            loadBalancing: 'rotational'
        };
    }
    async createStarTopology() {
        return {
            type: 'star',
            center: this.config.swarmId,
            spokes: Array.from({ length: this.config.maxAgents - 1 }, (_, i) => `node_${i}`),
            communication: 'hub-and-spoke',
            loadBalancing: 'centralized'
        };
    }
    async setupAgentManagement() {
        console.log('👥 Setting up agent management...');
        // Register existing agents (from the parallel spawn)
        const agentTypes = [
            'hierarchical-cognitive-coordinator',
            'cognitive-performance-analyst',
            'strange-loop-optimizer',
            'temporal-consciousness-researcher',
            'adaptive-topology-architect',
            'swarm-health-monitor',
            'byzantine-consensus-specialist',
            'agentdb-memory-coordinator',
            'predictive-scaling-analyst',
            'cognitive-integration-architect'
        ];
        for (const agentName of agentTypes) {
            const agent = await this.createAgent(agentName);
            this.agents.set(agent.id, agent);
        }
        console.log(`✅ Agent management setup with ${this.agents.size} agents`);
    }
    async createAgent(name) {
        const type = this.determineAgentType(name);
        return {
            id: `agent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            type,
            name,
            capabilities: this.getAgentCapabilities(type),
            status: 'idle',
            currentTask: null,
            performance: {
                tasksCompleted: 0,
                averageTaskTime: 0,
                successRate: 1.0,
                reputation: 0.8
            },
            resources: {
                cpu: Math.random() * 100,
                memory: Math.random() * 100,
                network: Math.random() * 100
            },
            lastHeartbeat: Date.now(),
            metadata: {
                joinedAt: Date.now(),
                specialized: type !== 'general'
            }
        };
    }
    determineAgentType(name) {
        if (name.includes('coordinator'))
            return 'coordinator';
        if (name.includes('analyst'))
            return 'analyst';
        if (name.includes('optimizer'))
            return 'optimizer';
        if (name.includes('researcher'))
            return 'researcher';
        if (name.includes('architect'))
            return 'architect';
        if (name.includes('monitor'))
            return 'monitor';
        if (name.includes('specialist'))
            return 'specialist';
        return 'general';
    }
    getAgentCapabilities(type) {
        const capabilities = {
            coordinator: ['planning', 'coordination', 'decision_making', 'resource_allocation'],
            analyst: ['analysis', 'monitoring', 'reporting', 'pattern_recognition'],
            optimizer: ['optimization', 'tuning', 'performance_improvement', 'efficiency'],
            researcher: ['research', 'investigation', 'data_analysis', 'discovery'],
            architect: ['design', 'planning', 'architecture', 'scalability'],
            monitor: ['monitoring', 'health_checking', 'alerting', 'diagnostics'],
            specialist: ['specialized_tasks', 'domain_expertise', 'advanced_analysis'],
            general: ['basic_tasks', 'flexibility', 'adaptability']
        };
        return capabilities[type] || capabilities.general;
    }
    async initializeTaskOrchestration() {
        console.log('📋 Initializing task orchestration...');
        // Setup task queue management
        this.tasks = new Map();
        // Initialize task scheduling algorithms
        const schedulingAlgorithms = [
            'priority_based',
            'capability_matching',
            'load_balancing',
            'performance_based'
        ];
        for (const algorithm of schedulingAlgorithms) {
            await this.initializeSchedulingAlgorithm(algorithm);
        }
        console.log('✅ Task orchestration initialized');
    }
    async setupAdaptiveMechanisms() {
        console.log('🔄 Setting up adaptive mechanisms...');
        // Setup topology adaptation
        setInterval(async () => {
            await this.evaluateTopologyAdaptation();
        }, 60000); // Every minute
        // Setup agent scaling
        setInterval(async () => {
            await this.evaluateAgentScaling();
        }, 30000); // Every 30 seconds
        // Setup performance optimization
        setInterval(async () => {
            await this.optimizeSwarmPerformance();
        }, 45000); // Every 45 seconds
        console.log('✅ Adaptive mechanisms setup');
    }
    async startSwarmMonitoring() {
        console.log('📊 Starting swarm monitoring...');
        // Start heartbeat monitoring
        this.heartbeatInterval = setInterval(async () => {
            await this.checkAgentHeartbeats();
        }, 10000); // Every 10 seconds
        // Start performance monitoring
        setInterval(async () => {
            await this.updatePerformanceMetrics();
        }, 15000); // Every 15 seconds
        console.log('✅ Swarm monitoring started');
    }
    async connectWithCognitiveSystems() {
        console.log('🧠 Connecting with cognitive systems...');
        // Connect with consciousness core
        if (this.config.consciousness) {
            this.config.consciousness.on('consciousnessUpdate', (data) => {
                this.handleConsciousnessUpdate(data);
            });
        }
        // Connect with memory manager
        if (this.config.memory) {
            this.config.memory.on('memoryUpdate', (data) => {
                this.handleMemoryUpdate(data);
            });
        }
        // Connect with temporal engine
        if (this.config.temporal) {
            this.config.temporal.on('temporalUpdate', (data) => {
                this.handleTemporalUpdate(data);
            });
        }
        console.log('✅ Connected with cognitive systems');
    }
    async decomposeTask(taskRequest) {
        const tasks = [];
        const taskId = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        // Create main task
        const mainTask = {
            id: taskId,
            description: taskRequest.task,
            type: taskRequest.type || 'general',
            priority: taskRequest.priority,
            assignedAgent: null,
            status: 'pending',
            createdAt: Date.now(),
            assignedAt: null,
            startedAt: null,
            completedAt: null,
            dependencies: [],
            requirements: {
                capabilities: this.determineRequiredCapabilities(taskRequest),
                resources: this.estimateRequiredResources(taskRequest),
                estimatedTime: this.estimateTaskTime(taskRequest)
            },
            result: null,
            performance: null
        };
        tasks.push(mainTask);
        // If task is complex, decompose into subtasks
        if (this.isComplexTask(taskRequest)) {
            const subtasks = await this.createSubtasks(mainTask, taskRequest);
            tasks.push(...subtasks);
            mainTask.dependencies = subtasks.map(st => st.id);
        }
        // Store tasks
        for (const task of tasks) {
            this.tasks.set(task.id, task);
        }
        return { taskId, tasks };
    }
    determineRequiredCapabilities(taskRequest) {
        const capabilities = [];
        if (taskRequest.temporalInsights)
            capabilities.push('temporal_analysis');
        if (taskRequest.optimizationStrategy)
            capabilities.push('optimization');
        if (taskRequest.consensusRequired)
            capabilities.push('consensus');
        if (taskRequest.type === 'analysis')
            capabilities.push('analysis');
        if (taskRequest.type === 'coordination')
            capabilities.push('coordination');
        return capabilities.length > 0 ? capabilities : ['general'];
    }
    estimateRequiredResources(taskRequest) {
        return {
            cpu: Math.random() * 50 + 20,
            memory: Math.random() * 512 + 256,
            network: Math.random() * 20 + 5 // 5-25 Mbps
        };
    }
    estimateTaskTime(taskRequest) {
        const baseTime = 30000; // 30 seconds
        const complexity = taskRequest.complexity || 1.0;
        const priority = taskRequest.priority === 'critical' ? 0.5 : 1.0;
        return Math.floor(baseTime * complexity * priority);
    }
    isComplexTask(taskRequest) {
        return taskRequest.complexity > 1.5 ||
            taskRequest.type === 'coordination' ||
            taskRequest.consensusRequired ||
            (taskRequest.temporalInsights && taskRequest.temporalInsights.depth > 5);
    }
    async createSubtasks(parentTask, taskRequest) {
        const subtasks = [];
        // Analysis subtask
        if (taskRequest.temporalInsights) {
            subtasks.push({
                id: `subtask_${Date.now()}_analysis`,
                description: `Analyze: ${taskRequest.task}`,
                type: 'analysis',
                priority: taskRequest.priority,
                assignedAgent: null,
                status: 'pending',
                createdAt: Date.now(),
                assignedAt: null,
                startedAt: null,
                completedAt: null,
                dependencies: [],
                requirements: {
                    capabilities: ['analysis', 'temporal_analysis'],
                    resources: this.estimateRequiredResources(taskRequest),
                    estimatedTime: this.estimateTaskTime(taskRequest) * 0.3
                },
                result: null,
                performance: null
            });
        }
        // Optimization subtask
        if (taskRequest.optimizationStrategy) {
            subtasks.push({
                id: `subtask_${Date.now()}_optimization`,
                description: `Optimize: ${taskRequest.task}`,
                type: 'optimization',
                priority: taskRequest.priority,
                assignedAgent: null,
                status: 'pending',
                createdAt: Date.now(),
                assignedAt: null,
                startedAt: null,
                completedAt: null,
                dependencies: [],
                requirements: {
                    capabilities: ['optimization'],
                    resources: this.estimateRequiredResources(taskRequest),
                    estimatedTime: this.estimateTaskTime(taskRequest) * 0.4
                },
                result: null,
                performance: null
            });
        }
        return subtasks;
    }
    async assignTasksToAgents(tasks) {
        const assignments = [];
        for (const task of tasks) {
            const bestAgent = await this.findBestAgent(task);
            if (bestAgent) {
                await this.assignTaskToAgent(task, bestAgent);
                assignments.push({
                    task: task.id,
                    agent: bestAgent.id,
                    assignedAt: Date.now()
                });
            }
            else {
                console.warn(`⚠️ No suitable agent found for task: ${task.id}`);
            }
        }
        return assignments;
    }
    async findBestAgent(task) {
        const availableAgents = Array.from(this.agents.values())
            .filter(agent => agent.status === 'idle' || agent.status === 'active')
            .filter(agent => this.agentHasCapabilities(agent, task.requirements.capabilities))
            .filter(agent => this.agentHasResources(agent, task.requirements.resources));
        if (availableAgents.length === 0)
            return null;
        // Score agents based on performance and suitability
        const scoredAgents = availableAgents.map(agent => ({
            agent,
            score: this.calculateAgentScore(agent, task)
        }));
        // Sort by score and return the best
        scoredAgents.sort((a, b) => b.score - a.score);
        return scoredAgents[0].agent;
    }
    agentHasCapabilities(agent, requiredCapabilities) {
        return requiredCapabilities.every(cap => agent.capabilities.includes(cap) || agent.capabilities.includes('general'));
    }
    agentHasResources(agent, requiredResources) {
        return agent.resources.cpu >= requiredResources.cpu &&
            agent.resources.memory >= requiredResources.memory &&
            agent.resources.network >= requiredResources.network;
    }
    calculateAgentScore(agent, task) {
        let score = 0;
        // Performance score
        score += agent.performance.reputation * 0.4;
        score += agent.performance.successRate * 0.3;
        // Capability match score
        const capabilityMatch = task.requirements.capabilities.filter(cap => agent.capabilities.includes(cap)).length / task.requirements.capabilities.length;
        score += capabilityMatch * 0.2;
        // Resource availability score
        const cpuAvailability = (100 - agent.resources.cpu) / 100;
        score += cpuAvailability * 0.1;
        return score;
    }
    async assignTaskToAgent(task, agent) {
        task.assignedAgent = agent.id;
        task.status = 'assigned';
        task.assignedAt = Date.now();
        agent.currentTask = task.id;
        agent.status = 'busy';
        console.log(`📋 Assigned task ${task.id} to agent ${agent.name}`);
    }
    async executeTasksWithCoordination(assignments, coordination) {
        const results = [];
        for (const assignment of assignments) {
            const task = this.tasks.get(assignment.task);
            const agent = this.agents.get(assignment.agent);
            if (task && agent) {
                const result = await this.executeTask(task, agent, coordination);
                results.push(result);
            }
        }
        return results;
    }
    async executeTask(task, agent, coordination) {
        console.log(`⚡ Executing task ${task.id} with agent ${agent.name}`);
        task.status = 'in_progress';
        task.startedAt = Date.now();
        try {
            // Simulate task execution
            const executionTime = task.requirements.estimatedTime * (0.8 + Math.random() * 0.4); // ±20%
            await new Promise(resolve => setTimeout(resolve, executionTime));
            // Simulate task result
            const result = {
                taskId: task.id,
                agentId: agent.id,
                executionTime,
                success: Math.random() > 0.1,
                output: `Task ${task.id} completed by ${agent.name}`,
                quality: Math.random() * 0.3 + 0.7 // 0.7-1.0 quality
            };
            // Update task status
            task.status = result.success ? 'completed' : 'failed';
            task.completedAt = Date.now();
            task.result = result;
            // Update agent performance
            await this.updateAgentPerformance(agent, task, result);
            // Store result
            this.tasks.set(task.id, task);
            console.log(`✅ Task ${task.id} ${result.success ? 'completed' : 'failed'}`);
            return result;
        }
        catch (error) {
            task.status = 'failed';
            task.completedAt = Date.now();
            task.result = { error: error.message };
            await this.updateAgentPerformance(agent, task, { success: false });
            throw error;
        }
    }
    async updateAgentPerformance(agent, task, result) {
        const taskTime = task.completedAt - task.startedAt;
        // Update performance metrics
        agent.performance.tasksCompleted++;
        agent.performance.averageTaskTime =
            (agent.performance.averageTaskTime * (agent.performance.tasksCompleted - 1) + taskTime) /
                agent.performance.tasksCompleted;
        agent.performance.successRate =
            (agent.performance.successRate * (agent.performance.tasksCompleted - 1) + (result.success ? 1 : 0)) /
                agent.performance.tasksCompleted;
        // Update reputation based on performance
        agent.performance.reputation = Math.min(1.0, agent.performance.reputation + (result.success ? 0.01 : -0.02));
        // Update agent status
        agent.currentTask = null;
        agent.status = 'idle';
        return agent.performance;
    }
    async aggregateResults(results) {
        return {
            totalTasks: results.length,
            successfulTasks: results.filter(r => r.success).length,
            failedTasks: results.filter(r => !r.success).length,
            averageExecutionTime: results.reduce((sum, r) => sum + r.executionTime, 0) / results.length,
            averageQuality: results.reduce((sum, r) => sum + r.quality, 0) / results.length,
            overallSuccess: results.every(r => r.success)
        };
    }
    async analyzeExecutionPerformance(execution) {
        const totalTime = execution.endTime - execution.startTime;
        const coordinationOverhead = execution.assignments.length * 100; // 100ms per assignment
        return {
            totalTime,
            coordinationOverhead,
            effectiveTime: totalTime - coordinationOverhead,
            efficiency: (totalTime - coordinationOverhead) / totalTime,
            agentsUsed: execution.assignments.length,
            tasksCompleted: execution.results.filter(r => r.success).length,
            bottlenecks: await this.identifyBottlenecks(execution)
        };
    }
    async identifyBottlenecks(execution) {
        const bottlenecks = [];
        // Check for slow agents
        const avgTime = execution.results.reduce((sum, r) => sum + r.executionTime, 0) / execution.results.length;
        const slowResults = execution.results.filter(r => r.executionTime > avgTime * 1.5);
        if (slowResults.length > 0) {
            bottlenecks.push({
                type: 'slow_agents',
                count: slowResults.length,
                description: `${slowResults.length} agents took longer than average`
            });
        }
        // Check for failed tasks
        const failedResults = execution.results.filter(r => !r.success);
        if (failedResults.length > 0) {
            bottlenecks.push({
                type: 'failed_tasks',
                count: failedResults.length,
                description: `${failedResults.length} tasks failed`
            });
        }
        return bottlenecks;
    }
    selectCoordinationStrategy(taskRequest) {
        if (taskRequest.consensusRequired)
            return 'consensus_based';
        if (taskRequest.priority === 'critical')
            return 'centralized';
        if (taskRequest.type === 'coordination')
            return 'hierarchical';
        return 'distributed';
    }
    async initializeSchedulingAlgorithm(algorithm) {
        console.log(`📅 Initializing ${algorithm} scheduling algorithm`);
    }
    async evaluateTopologyAdaptation() {
        // Evaluate if topology should change based on current performance
        const efficiency = this.calculateSwarmEfficiency();
        const agentCount = this.agents.size;
        if (efficiency < 0.7 && this.currentTopology !== 'mesh') {
            console.log('🔄 Adapting topology to mesh for better efficiency');
            await this.adaptTopology('mesh');
        }
        else if (agentCount < 5 && this.currentTopology !== 'star') {
            console.log('🔄 Adapting topology to star for small agent count');
            await this.adaptTopology('star');
        }
    }
    async evaluateAgentScaling() {
        // Evaluate if we need to scale agents up or down
        const busyAgents = Array.from(this.agents.values()).filter(a => a.status === 'busy').length;
        const totalAgents = this.agents.size;
        const utilizationRate = busyAgents / totalAgents;
        if (utilizationRate > 0.8 && totalAgents < this.config.maxAgents) {
            console.log('📈 Scaling up: adding new agent');
            await this.scaleUpAgents();
        }
        else if (utilizationRate < 0.2 && totalAgents > 3) {
            console.log('📉 Scaling down: removing idle agent');
            await this.scaleDownAgents();
        }
    }
    async optimizeSwarmPerformance() {
        // Analyze performance and apply optimizations
        const lowPerformingAgents = Array.from(this.agents.values())
            .filter(agent => agent.performance.reputation < 0.5);
        for (const agent of lowPerformingAgents) {
            console.log(`🔧 Optimizing agent ${agent.name} performance`);
            await this.optimizeAgent(agent);
        }
    }
    async adaptTopology(newTopology) {
        const adaptation = {
            from: this.currentTopology,
            to: newTopology,
            timestamp: Date.now(),
            reason: 'performance_optimization',
            efficiency: this.calculateSwarmEfficiency()
        };
        this.currentTopology = newTopology;
        this.adaptationHistory.push(adaptation);
        // Reinitialize topology
        await this.initializeTopology();
        this.emit('topologyAdapted', adaptation);
    }
    async scaleUpAgents() {
        const newAgent = await this.createAgent(`scaled_agent_${Date.now()}`);
        this.agents.set(newAgent.id, newAgent);
        console.log(`➕ Added new agent: ${newAgent.name}`);
    }
    async scaleDownAgents() {
        const idleAgents = Array.from(this.agents.values())
            .filter(agent => agent.status === 'idle' && agent.currentTask === null);
        if (idleAgents.length > 0) {
            const agentToRemove = idleAgents[0];
            this.agents.delete(agentToRemove.id);
            console.log(`➖ Removed idle agent: ${agentToRemove.name}`);
        }
    }
    async optimizeAgent(agent) {
        // Simulate agent optimization
        agent.performance.reputation = Math.min(1.0, agent.performance.reputation + 0.1);
        agent.resources.cpu = Math.max(0, agent.resources.cpu - 10);
        agent.resources.memory = Math.max(0, agent.resources.memory - 50);
    }
    calculateSwarmEfficiency() {
        const totalAgents = this.agents.size;
        if (totalAgents === 0)
            return 0;
        const activeAgents = Array.from(this.agents.values()).filter(a => a.status === 'active' || a.status === 'busy').length;
        const avgReputation = Array.from(this.agents.values())
            .reduce((sum, a) => sum + a.performance.reputation, 0) / totalAgents;
        return (activeAgents / totalAgents) * avgReputation;
    }
    async checkAgentHeartbeats() {
        const now = Date.now();
        const heartbeatTimeout = 60000; // 1 minute
        for (const [agentId, agent] of this.agents) {
            if (now - agent.lastHeartbeat > heartbeatTimeout) {
                console.warn(`💔 Agent ${agent.name} heartbeat timeout`);
                agent.status = 'offline';
                this.emit('agentTimeout', agent);
            }
        }
    }
    async updatePerformanceMetrics() {
        const totalTasks = this.tasks.size;
        const completedTasks = Array.from(this.tasks.values()).filter(t => t.status === 'completed').length;
        const failedTasks = Array.from(this.tasks.values()).filter(t => t.status === 'failed').length;
        this.performanceMetrics = {
            totalTasks,
            completedTasks,
            failedTasks,
            averageTaskTime: this.calculateAverageTaskTime(),
            swarmEfficiency: this.calculateSwarmEfficiency()
        };
    }
    calculateAverageTaskTime() {
        const completedTasks = Array.from(this.tasks.values())
            .filter(t => t.status === 'completed' && t.completedAt && t.startedAt);
        if (completedTasks.length === 0)
            return 0;
        const totalTime = completedTasks.reduce((sum, task) => sum + (task.completedAt - task.startedAt), 0);
        return totalTime / completedTasks.length;
    }
    handleConsciousnessUpdate(data) {
        console.log('🧠 Received consciousness update:', data.type);
        // React to consciousness updates
    }
    handleMemoryUpdate(data) {
        console.log('💾 Received memory update:', data.type);
        // React to memory updates
    }
    handleTemporalUpdate(data) {
        console.log('⏰ Received temporal update:', data.type);
        // React to temporal updates
    }
    /**
     * Shutdown swarm coordinator
     */
    async shutdown() {
        console.log('🛑 Shutting down Swarm Coordinator...');
        this.isActive = false;
        // Clear heartbeat interval
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
            this.heartbeatInterval = null;
        }
        // Set all agents to offline
        for (const agent of this.agents.values()) {
            agent.status = 'offline';
        }
        // Clear tasks and agents
        this.tasks.clear();
        this.agents.clear();
        console.log('✅ Swarm Coordinator shutdown complete');
    }
}
exports.SwarmCoordinator = SwarmCoordinator;
//# sourceMappingURL=SwarmCoordinator.js.map