"use strict";
/**
 * Distributed Training Coordinator for Swarm-Based ML Training
 *
 * Coordinates distributed reinforcement learning, causal inference, and DSPy
 * optimization across multiple agents with hierarchical topology management.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainingOptimizer = exports.WorkerProgressClient = exports.WorkerCommandClient = exports.MetricsCollector = exports.FaultToleranceManager = exports.CheckpointManager = exports.ParameterSyncer = exports.GradientAggregator = exports.LoadBalancer = exports.TopologyManager = exports.DistributedTrainingCoordinator = exports.WorkerStatus = exports.TrainingJobStatus = exports.TrainingJobType = void 0;
const events_1 = require("events");
var TrainingJobType;
(function (TrainingJobType) {
    TrainingJobType["REINFORCEMENT_LEARNING"] = "reinforcement_learning";
    TrainingJobType["CAUSAL_INFERENCE"] = "causal_inference";
    TrainingJobType["DSPY_OPTIMIZATION"] = "dspy_optimization";
    TrainingJobType["HYBRID_TRAINING"] = "hybrid_training";
})(TrainingJobType || (exports.TrainingJobType = TrainingJobType = {}));
var TrainingJobStatus;
(function (TrainingJobStatus) {
    TrainingJobStatus["PENDING"] = "pending";
    TrainingJobStatus["RUNNING"] = "running";
    TrainingJobStatus["COMPLETED"] = "completed";
    TrainingJobStatus["FAILED"] = "failed";
    TrainingJobStatus["CANCELLED"] = "cancelled";
})(TrainingJobStatus || (exports.TrainingJobStatus = TrainingJobStatus = {}));
var WorkerStatus;
(function (WorkerStatus) {
    WorkerStatus["AVAILABLE"] = "available";
    WorkerStatus["BUSY"] = "busy";
    WorkerStatus["MAINTENANCE"] = "maintenance";
    WorkerStatus["FAILED"] = "failed";
})(WorkerStatus || (exports.WorkerStatus = WorkerStatus = {}));
// ============================================================================
// Distributed Training Coordinator
// ============================================================================
class DistributedTrainingCoordinator extends events_1.EventEmitter {
    constructor(config, logger) {
        super();
        this.config = config;
        this.logger = logger;
        this.workers = new Map();
        this.trainingJobs = new Map();
        this.initializeComponents();
        this.setupEventHandlers();
    }
    initializeComponents() {
        this.topologyManager = new HierarchicalTopologyManager(this.config);
        this.loadBalancer = new AdaptiveLoadBalancer();
        this.gradientAggregator = new FederatedGradientAggregator();
        this.parameterSyncer = new ParameterSyncManager();
        this.checkpointManager = new DistributedCheckpointManager();
        this.faultToleranceManager = new FaultToleranceManager();
        this.metricsCollector = new TrainingMetricsCollector();
    }
    setupEventHandlers() {
        this.topologyManager.on('topology_changed', (topology) => {
            this.logger.info('Training topology changed:', topology);
            this.emit('topology_changed', topology);
        });
        this.loadBalancer.on('rebalance_required', (reason) => {
            this.logger.info(`Load rebalance required: ${reason}`);
            this.rebalanceWorkers();
        });
        this.gradientAggregator.on('aggregation_complete', (aggregation) => {
            this.handleGradientAggregation(aggregation);
        });
        this.faultToleranceManager.on('worker_failed', (workerId) => {
            this.handleWorkerFailure(workerId);
        });
    }
    // ============================================================================
    // Public API
    // ============================================================================
    /**
     * Submit a distributed training job
     *
     * @param jobConfig Training job configuration
     * @returns Training job ID
     */
    async submitTrainingJob(jobConfig) {
        const jobId = this.generateJobId();
        const job = {
            id: jobId,
            type: this.determineJobType(jobConfig),
            config: jobConfig,
            status: TrainingJobStatus.PENDING,
            assignedWorkers: [],
            progress: {
                epoch: 0,
                totalEpochs: jobConfig.hyperparameters.epochs || 100,
                stepsCompleted: 0,
                totalSteps: 0,
                currentLoss: Infinity,
                bestLoss: Infinity,
                convergenceMetrics: this.initializeConvergenceMetrics()
            },
            startTime: new Date(),
            metrics: this.initializeTrainingMetrics()
        };
        this.trainingJobs.set(jobId, job);
        try {
            // Schedule job execution
            await this.scheduleTrainingJob(job);
            this.logger.info(`Training job submitted successfully: ${jobId}`);
            return jobId;
        }
        catch (error) {
            this.trainingJobs.delete(jobId);
            this.logger.error(`Failed to submit training job: ${error.message}`);
            throw error;
        }
    }
    /**
     * Get training job status and progress
     *
     * @param jobId Training job ID
     * @returns Training job details
     */
    async getJobStatus(jobId) {
        const job = this.trainingJobs.get(jobId);
        if (!job) {
            throw new Error(`Training job not found: ${jobId}`);
        }
        // Update progress from workers
        await this.updateJobProgress(job);
        return { ...job };
    }
    /**
     * Cancel a running training job
     *
     * @param jobId Training job ID
     */
    async cancelTrainingJob(jobId) {
        const job = this.trainingJobs.get(jobId);
        if (!job) {
            throw new Error(`Training job not found: ${jobId}`);
        }
        if (job.status !== TrainingJobStatus.RUNNING) {
            throw new Error(`Cannot cancel job in status: ${job.status}`);
        }
        // Notify all assigned workers to stop
        await this.notifyWorkersToStop(job);
        // Update job status
        job.status = TrainingJobStatus.CANCELLED;
        job.endTime = new Date();
        this.logger.info(`Training job cancelled: ${jobId}`);
        this.emit('job_cancelled', job);
    }
    /**
     * Register a new worker node
     *
     * @param workerInfo Worker node information
     * @returns Worker ID
     */
    async registerWorker(workerInfo) {
        const workerId = this.generateWorkerId();
        const worker = {
            id: workerId,
            address: workerInfo.address,
            status: WorkerStatus.AVAILABLE,
            capabilities: workerInfo.capabilities,
            currentLoad: {
                currentJobs: 0,
                maxJobs: workerInfo.capabilities.maxConcurrency,
                cpuUtilization: 0,
                memoryUtilization: 0,
                networkUtilization: 0
            },
            performance: {
                avgResponseTime: 0,
                avgThroughput: 0,
                errorRate: 0,
                reliabilityScore: 1.0,
                lastUpdated: new Date()
            },
            lastHeartbeat: new Date()
        };
        this.workers.set(workerId, worker);
        await this.topologyManager.addWorker(worker);
        this.logger.info(`Worker registered successfully: ${workerId}`);
        this.emit('worker_registered', worker);
        return workerId;
    }
    /**
     * Unregister a worker node
     *
     * @param workerId Worker ID
     */
    async unregisterWorker(workerId) {
        const worker = this.workers.get(workerId);
        if (!worker) {
            throw new Error(`Worker not found: ${workerId}`);
        }
        // Check if worker has active jobs
        if (worker.currentLoad.currentJobs > 0) {
            await this.migrateWorkerJobs(worker);
        }
        this.workers.delete(workerId);
        await this.topologyManager.removeWorker(workerId);
        this.logger.info(`Worker unregistered: ${workerId}`);
        this.emit('worker_unregistered', workerId);
    }
    /**
     * Get comprehensive training metrics
     *
     * @param jobId Training job ID (optional)
     * @returns Training metrics
     */
    getTrainingMetrics(jobId) {
        if (jobId) {
            const job = this.trainingJobs.get(jobId);
            if (!job) {
                throw new Error(`Training job not found: ${jobId}`);
            }
            return Promise.resolve(job.metrics);
        }
        return this.metricsCollector.getAggregatedMetrics();
    }
    /**
     * Optimize training configuration based on current performance
     *
     * @param jobId Training job ID
     */
    async optimizeTraining(jobId) {
        const job = this.trainingJobs.get(jobId);
        if (!job) {
            throw new Error(`Training job not found: ${jobId}`);
        }
        const optimizer = new TrainingOptimizer();
        const recommendations = await optimizer.generateRecommendations(job);
        // Apply auto-optimizations if enabled
        if (this.config.autoOptimization) {
            await this.applyOptimizations(job, recommendations.filter(r => r.autoApply));
        }
        return recommendations;
    }
    // ============================================================================
    // Private Methods
    // ============================================================================
    async scheduleTrainingJob(job) {
        // Determine optimal workers for this job
        const selectedWorkers = await this.selectOptimalWorkers(job);
        // Assign workers to job
        job.assignedWorkers = selectedWorkers.map(w => w.id);
        // Update worker loads
        selectedWorkers.forEach(worker => {
            worker.currentLoad.currentJobs++;
            worker.status = WorkerStatus.BUSY;
        });
        // Create training topology
        const topology = await this.topologyManager.createTrainingTopology(job);
        // Initialize parameter synchronization
        await this.parameterSyncer.initializeJob(job, topology);
        // Start training on assigned workers
        await this.startTrainingOnWorkers(job, topology);
        // Update job status
        job.status = TrainingJobStatus.RUNNING;
        this.emit('job_started', job);
    }
    async selectOptimalWorkers(job) {
        const availableWorkers = Array.from(this.workers.values())
            .filter(w => w.status === WorkerStatus.AVAILABLE)
            .filter(w => this.isWorkerCompatible(w, job.config));
        return this.loadBalancer.selectWorkers(availableWorkers, job.config.distributedConfig.maxWorkers, job.config.resources);
    }
    isWorkerCompatible(worker, config) {
        // Check algorithm compatibility
        if (!worker.capabilities.supportedAlgorithms.includes(config.algorithm)) {
            return false;
        }
        // Check resource requirements
        if (worker.capabilities.maxMemory < config.resources.memory) {
            return false;
        }
        if (config.resources.gpu && !worker.capabilities.hasGPU) {
            return false;
        }
        return true;
    }
    async startTrainingOnWorkers(job, topology) {
        const promises = job.assignedWorkers.map(async (workerId, index) => {
            const worker = this.workers.get(workerId);
            const workerConfig = this.generateWorkerConfig(job, index, topology);
            return this.sendTrainingCommand(worker, workerConfig);
        });
        await Promise.all(promises);
    }
    generateWorkerConfig(job, workerIndex, topology) {
        return {
            jobId: job.id,
            workerIndex,
            totalWorkers: job.assignedWorkers.length,
            config: job.config,
            topology: topology.getWorkerTopology(workerIndex),
            peers: topology.getWorkerPeers(workerIndex),
            syncStrategy: this.config.synchronizationStrategy,
            compressionEnabled: this.config.compressionEnabled
        };
    }
    async sendTrainingCommand(worker, config) {
        const commandClient = new WorkerCommandClient(worker.address);
        await commandClient.startTraining(config);
    }
    async updateJobProgress(job) {
        const progressPromises = job.assignedWorkers.map(async (workerId) => {
            const worker = this.workers.get(workerId);
            const progressClient = new WorkerProgressClient(worker.address);
            return progressClient.getProgress(job.id);
        });
        const workerProgresses = await Promise.all(progressPromises);
        // Aggregate progress from all workers
        job.progress = this.aggregateWorkerProgress(workerProgresses);
        job.metrics = this.aggregateWorkerMetrics(workerProgresses);
    }
    aggregateWorkerProgress(progresses) {
        const totalSteps = progresses.reduce((sum, p) => sum + p.stepsCompleted, 0);
        const avgLoss = progresses.reduce((sum, p) => sum + p.currentLoss, 0) / progresses.length;
        const minLoss = Math.min(...progresses.map(p => p.bestLoss));
        return {
            epoch: Math.max(...progresses.map(p => p.epoch)),
            totalEpochs: progresses[0]?.totalEpochs || 0,
            stepsCompleted: totalSteps,
            totalSteps: progresses[0]?.totalSteps || 0,
            currentLoss: avgLoss,
            bestLoss: minLoss,
            convergenceMetrics: this.aggregateConvergenceMetrics(progresses)
        };
    }
    handleGradientAggregation(aggregation) {
        // Update global model with aggregated gradients
        this.parameterSyncer.updateGlobalModel(aggregation);
        // Distribute updated parameters to workers
        this.parameterSyncer.broadcastParameters(aggregation.metadata);
        this.emit('gradient_aggregated', aggregation);
    }
    async handleWorkerFailure(workerId) {
        const worker = this.workers.get(workerId);
        if (!worker)
            return;
        this.logger.error(`Worker failure detected: ${workerId}`);
        // Migrate running jobs to other workers
        await this.migrateWorkerJobs(worker);
        // Update worker status
        worker.status = WorkerStatus.FAILED;
        // Emit failure event
        this.emit('worker_failed', workerId);
    }
    async migrateWorkerJobs(failedWorker) {
        const affectedJobs = Array.from(this.trainingJobs.values())
            .filter(job => job.assignedWorkers.includes(failedWorker.id));
        for (const job of affectedJobs) {
            await this.migrateJob(job, failedWorker);
        }
    }
    async migrateJob(job, failedWorker) {
        // Remove failed worker from job
        job.assignedWorkers = job.assignedWorkers.filter(id => id !== failedWorker.id);
        // Select replacement worker
        const replacementWorkers = await this.selectOptimalWorkers(job);
        if (replacementWorkers.length > 0) {
            const replacementWorker = replacementWorkers[0];
            job.assignedWorkers.push(replacementWorker.id);
            // Resume training on replacement worker
            await this.resumeTrainingOnWorker(job, replacementWorker, failedWorker.id);
        }
    }
    async resumeTrainingOnWorker(job, worker, failedWorkerId) {
        // Get latest checkpoint
        const checkpoint = await this.checkpointManager.getLatestCheckpoint(job.id);
        // Generate worker config with checkpoint info
        const workerConfig = this.generateWorkerConfig(job, 0, null); // Simplified
        workerConfig.checkpoint = checkpoint;
        workerConfig.failedWorkerId = failedWorkerId;
        await this.sendTrainingCommand(worker, workerConfig);
    }
    async notifyWorkersToStop(job) {
        const promises = job.assignedWorkers.map(async (workerId) => {
            const worker = this.workers.get(workerId);
            const commandClient = new WorkerCommandClient(worker.address);
            await commandClient.stopTraining(job.id);
        });
        await Promise.all(promises);
    }
    async rebalanceWorkers() {
        // Implement load rebalancing logic
        this.logger.info('Rebalancing worker loads...');
    }
    determineJobType(config) {
        if (config.algorithm.includes('rl') || config.algorithm.includes('reinforcement')) {
            return TrainingJobType.REINFORCEMENT_LEARNING;
        }
        else if (config.algorithm.includes('causal') || config.algorithm.includes('gpcm')) {
            return TrainingJobType.CAUSAL_INFERENCE;
        }
        else if (config.algorithm.includes('dspy') || config.algorithm.includes('program')) {
            return TrainingJobType.DSPY_OPTIMIZATION;
        }
        else {
            return TrainingJobType.HYBRID_TRAINING;
        }
    }
    initializeConvergenceMetrics() {
        return {
            gradientNorm: Infinity,
            parameterChanges: [],
            lossImprovement: 0,
            validationScore: 0,
            earlyStoppingPatience: 10
        };
    }
    initializeTrainingMetrics() {
        return {
            loss: [],
            accuracy: [],
            throughput: [],
            latency: [],
            resourceUtilization: [],
            communicationOverhead: {
                bytesTransmitted: 0,
                bytesReceived: 0,
                messagesSent: 0,
                messagesReceived: 0,
                averageLatency: 0,
                compressionRatio: 1,
                retransmissions: 0
            }
        };
    }
    generateJobId() {
        return `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    generateWorkerId() {
        return `worker_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    // ============================================================================
    // Lifecycle Management
    // ============================================================================
    /**
     * Start the distributed training coordinator
     */
    async start() {
        this.logger.info('Starting Distributed Training Coordinator...');
        // Start all components
        await this.topologyManager.start();
        await this.loadBalancer.start();
        await this.gradientAggregator.start();
        await this.parameterSyncer.start();
        await this.checkpointManager.start();
        await this.faultToleranceManager.start();
        await this.metricsCollector.start();
        this.logger.info('Distributed Training Coordinator started successfully');
    }
    /**
     * Stop the distributed training coordinator
     */
    async stop() {
        this.logger.info('Stopping Distributed Training Coordinator...');
        // Stop all running jobs
        await this.stopAllJobs();
        // Stop all components
        await this.metricsCollector.stop();
        await this.faultToleranceManager.stop();
        await this.checkpointManager.stop();
        await this.parameterSyncer.stop();
        await this.gradientAggregator.stop();
        await this.loadBalancer.stop();
        await this.topologyManager.stop();
        this.logger.info('Distributed Training Coordinator stopped');
    }
    async stopAllJobs() {
        const runningJobs = Array.from(this.trainingJobs.values())
            .filter(job => job.status === TrainingJobStatus.RUNNING);
        const stopPromises = runningJobs.map(job => this.cancelTrainingJob(job.id));
        await Promise.all(stopPromises);
    }
}
exports.DistributedTrainingCoordinator = DistributedTrainingCoordinator;
// Abstract interfaces for supporting classes
class TopologyManager extends events_1.EventEmitter {
}
exports.TopologyManager = TopologyManager;
class LoadBalancer extends events_1.EventEmitter {
}
exports.LoadBalancer = LoadBalancer;
class GradientAggregator extends events_1.EventEmitter {
}
exports.GradientAggregator = GradientAggregator;
class ParameterSyncer {
}
exports.ParameterSyncer = ParameterSyncer;
class CheckpointManager {
}
exports.CheckpointManager = CheckpointManager;
class FaultToleranceManager extends events_1.EventEmitter {
}
exports.FaultToleranceManager = FaultToleranceManager;
class MetricsCollector {
}
exports.MetricsCollector = MetricsCollector;
// Client interfaces for worker communication
class WorkerCommandClient {
    constructor(address) { }
}
exports.WorkerCommandClient = WorkerCommandClient;
class WorkerProgressClient {
    constructor(address) { }
}
exports.WorkerProgressClient = WorkerProgressClient;
class TrainingOptimizer {
}
exports.TrainingOptimizer = TrainingOptimizer;
//# sourceMappingURL=distributed-training-coordinator.js.map