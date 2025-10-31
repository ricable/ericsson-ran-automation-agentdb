/**
 * Multi-Agent Coordination Streams with Memory Synchronization
 * Phase 2: Advanced Agent Coordination for RAN Optimization
 */
import { AgentDB } from '../../agentdb/agentdb-core';
import { TemporalReasoningCore } from '../../temporal/temporal-core';
export interface AgentTask {
    id: string;
    name: string;
    type: AgentTaskType;
    priority: TaskPriority;
    assignee?: string;
    dependencies: string[];
    requirements: TaskRequirements;
    estimatedDuration: number;
    deadline?: Date;
    status: TaskStatus;
    progress: TaskProgress;
    resources: ResourceAllocation;
    metadata: TaskMetadata;
}
export declare enum AgentTaskType {
    OPTIMIZATION = "optimization",
    ANALYSIS = "analysis",
    MONITORING = "monitoring",
    COORDINATION = "coordination",
    LEARNING = "learning",
    VALIDATION = "validation",
    INTERVENTION = "intervention",
    REPORTING = "reporting"
}
export declare enum TaskPriority {
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3,
    CRITICAL = 4,
    EMERGENCY = 5
}
export declare enum TaskStatus {
    PENDING = "pending",
    ASSIGNED = "assigned",
    IN_PROGRESS = "in_progress",
    BLOCKED = "blocked",
    COMPLETED = "completed",
    FAILED = "failed",
    CANCELLED = "cancelled"
}
export interface TaskRequirements {
    skills: AgentSkill[];
    resources: ResourceRequirement[];
    permissions: Permission[];
    dependencies: Dependency[];
    collaborationMode: CollaborationMode;
}
export declare enum AgentSkill {
    ENERGY_OPTIMIZATION = "energy_optimization",
    MOBILITY_MANAGEMENT = "mobility_management",
    COVERAGE_ANALYSIS = "coverage_analysis",
    CAPACITY_PLANNING = "capacity_planning",
    PERFORMANCE_ANALYSIS = "performance_analysis",
    DIAGNOSTICS = "diagnostics",
    MACHINE_LEARNING = "machine_learning",
    CAUSAL_INFERENCE = "causal_inference",
    TEMPORAL_REASONING = "temporal_reasoning",
    COGNITIVE_OPTIMIZATION = "cognitive_optimization"
}
export interface ResourceRequirement {
    type: ResourceType;
    amount: number;
    availability: AvailabilityConstraint;
    quality: QualityRequirement;
}
export declare enum ResourceType {
    COMPUTE = "compute",
    MEMORY = "memory",
    STORAGE = "storage",
    NETWORK = "network",
    DATABASE = "database",
    API_ACCESS = "api_access",
    TEMPORAL_CORE = "temporal_core",
    AGENTDB = "agentdb"
}
export interface AvailabilityConstraint {
    startTime: Date;
    endTime: Date;
    exclusivity: boolean;
    preemptible: boolean;
}
export interface QualityRequirement {
    minimum: number;
    preferred: number;
    unit: string;
}
export interface Permission {
    resource: string;
    action: string;
    scope: string;
    duration: number;
}
export interface Dependency {
    taskId: string;
    type: DependencyType;
    strength: number;
    conditional: boolean;
}
export declare enum DependencyType {
    FINISH_TO_START = "finish_to_start",
    START_TO_START = "start_to_start",
    FINISH_TO_FINISH = "finish_to_finish",
    START_TO_FINISH = "start_to_finish"
}
export declare enum CollaborationMode {
    INDEPENDENT = "independent",
    COOPERATIVE = "cooperative",
    COORDINATED = "coordinated",
    COMPETITIVE = "competitive",
    HIERARCHICAL = "hierarchical"
}
export interface TaskProgress {
    percentage: number;
    milestones: Milestone[];
    currentStep: string;
    estimatedRemaining: number;
    blockers: Blocker[];
    issues: Issue[];
}
export interface Milestone {
    id: string;
    name: string;
    completed: boolean;
    completedAt?: Date;
    estimatedCompletion?: Date;
}
export interface Blocker {
    id: string;
    description: string;
    severity: BlockerSeverity;
    resolution?: string;
    resolvedAt?: Date;
}
export declare enum BlockerSeverity {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    CRITICAL = "critical"
}
export interface Issue {
    id: string;
    type: IssueType;
    description: string;
    severity: IssueSeverity;
    status: IssueStatus;
    reportedAt: Date;
    resolvedAt?: Date;
}
export declare enum IssueType {
    TECHNICAL = "technical",
    RESOURCE = "resource",
    DEPENDENCY = "dependency",
    COMMUNICATION = "communication",
    QUALITY = "quality",
    SECURITY = "security"
}
export declare enum IssueSeverity {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    CRITICAL = "critical"
}
export declare enum IssueStatus {
    OPEN = "open",
    IN_PROGRESS = "in_progress",
    RESOLVED = "resolved",
    CLOSED = "closed"
}
export interface ResourceAllocation {
    compute: ComputeAllocation;
    memory: MemoryAllocation;
    storage: StorageAllocation;
    network: NetworkAllocation;
    database: DatabaseAllocation;
    temporalCore: TemporalCoreAllocation;
    agentdb: AgentDBAllocation;
}
export interface ComputeAllocation {
    cores: number;
    cpuType: string;
    acceleration: boolean;
    gpu?: GPUAllocation;
}
export interface GPUAllocation {
    type: string;
    memory: number;
    count: number;
}
export interface MemoryAllocation {
    ram: number;
    cache: number;
    swap: number;
}
export interface StorageAllocation {
    ssd: number;
    hdd: number;
    bandwidth: number;
}
export interface NetworkAllocation {
    bandwidth: number;
    latency: number;
    reliability: number;
}
export interface DatabaseAllocation {
    connections: number;
    storage: number;
    throughput: number;
}
export interface TemporalCoreAllocation {
    timeExpansion: number;
    reasoningDepth: number;
    memoryAccess: boolean;
}
export interface AgentDBAllocation {
    vectorSearch: boolean;
    quicSync: boolean;
    cacheSize: number;
}
export interface TaskMetadata {
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy: string;
    tags: string[];
    category: TaskCategory;
    estimatedValue: number;
    riskAssessment: RiskAssessment;
}
export declare enum TaskCategory {
    OPTIMIZATION = "optimization",
    MAINTENANCE = "maintenance",
    EMERGENCY = "emergency",
    IMPROVEMENT = "improvement",
    RESEARCH = "research",
    MONITORING = "monitoring"
}
export interface RiskAssessment {
    probability: number;
    impact: number;
    riskScore: number;
    mitigation: string[];
}
export interface AgentInfo {
    id: string;
    name: string;
    type: AgentType;
    status: AgentStatus;
    capabilities: AgentCapability[];
    currentLoad: AgentLoad;
    performance: AgentPerformance;
    availability: AgentAvailability;
    location: AgentLocation;
    communication: AgentCommunication;
}
export declare enum AgentType {
    ENERGY_OPTIMIZER = "energy_optimizer",
    MOBILITY_MANAGER = "mobility_manager",
    COVERAGE_ANALYZER = "coverage_analyzer",
    CAPACITY_PLANNER = "capacity_planner",
    PERFORMANCE_ANALYST = "performance_analyst",
    DIAGNOSTICS_SPECIALIST = "diagnostics_specialist",
    ML_RESEARCHER = "ml_researcher",
    AUTOMATION_ENGINEER = "automation_engineer",
    INTEGRATION_SPECIALIST = "integration_specialist",
    COGNITIVE_COORDINATOR = "cognitive_coordinator"
}
export declare enum AgentStatus {
    IDLE = "idle",
    BUSY = "busy",
    UNAVAILABLE = "unavailable",
    MAINTENANCE = "maintenance",
    ERROR = "error"
}
export interface AgentCapability {
    skill: AgentSkill;
    proficiency: ProficiencyLevel;
    experience: number;
    certifications: string[];
}
export declare enum ProficiencyLevel {
    BEGINNER = "beginner",
    INTERMEDIATE = "intermediate",
    ADVANCED = "advanced",
    EXPERT = "expert",
    MASTER = "master"
}
export interface AgentLoad {
    currentTasks: number;
    maxTasks: number;
    cpuUtilization: number;
    memoryUtilization: number;
    networkUtilization: number;
    stressLevel: number;
}
export interface AgentPerformance {
    reliability: number;
    speed: number;
    quality: number;
    efficiency: number;
    satisfaction: number;
    averageCompletionTime: number;
    successRate: number;
}
export interface AgentAvailability {
    available: boolean;
    availableFrom: Date;
    availableTo: Date;
    timezone: string;
    schedule: ScheduleEntry[];
    exceptions: ScheduleException[];
}
export interface ScheduleEntry {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    priority: TaskPriority;
}
export interface ScheduleException {
    date: Date;
    type: ExceptionType;
    reason: string;
}
export declare enum ExceptionType {
    UNAVAILABLE = "unavailable",
    LIMITED = "limited",
    PREFERRED = "preferred"
}
export interface AgentLocation {
    region: string;
    datacenter: string;
    zone: string;
    latency: number;
    bandwidth: number;
}
export interface AgentCommunication {
    protocols: CommunicationProtocol[];
    languages: string[];
    responseTime: number;
    reliability: number;
}
export declare enum CommunicationProtocol {
    HTTP = "http",
    WEBSOCKET = "websocket",
    QUIC = "quic",
    GRPC = "grpc",
    MESSAGE_QUEUE = "message_queue"
}
export declare class MultiAgentCoordinationStreams {
    private agentDB;
    private temporalCore;
    private taskDistributor;
    private memoryCoordinator;
    private performanceMonitor;
    private loadBalancer;
    private conflictResolver;
    constructor(agentDB: AgentDB, temporalCore: TemporalReasoningCore);
    createAgentTaskDistributionStream(): Promise<any>;
    createMemoryCoordinationStream(): Promise<any>;
    createPerformanceMonitoringStream(): Promise<any>;
    createAdaptiveTopologyStream(): Promise<any>;
    private createTaskQueueProcessor;
    private createAgentDiscoveryProcessor;
    private createTaskAssignmentProcessor;
    private createLoadBalancingProcessor;
    private createResourceAllocationProcessor;
    private createMemorySynchronizationProcessor;
    private createKnowledgeSharingProcessor;
    private groupTasksByDependencies;
    private identifyReadyTasks;
    private calculateQueueMetrics;
    private storeQueueState;
    private getAvailableAgents;
    private filterSuitableAgents;
    private scoreAgents;
    private rankAgentsForTasks;
    private calculateTotalCapacity;
    private findBestAvailableAgent;
    private estimateTaskCompletion;
    private calculateResourceAllocation;
    private determineAssignmentType;
    private calculateAssignmentEfficiency;
    private calculateWorkloadBalance;
}
export interface TaskQueueState {
    tasks: AgentTask[];
    readyTasks: AgentTask[];
    taskGroups: Map<string, AgentTask[]>;
    metrics: QueueMetrics;
    lastUpdated: Date;
}
export interface QueueMetrics {
    totalTasks: number;
    pendingTasks: number;
    inProgressTasks: number;
    highPriorityTasks: number;
    overdueTasks: number;
    averageWaitTime: number;
    estimatedTotalTime: number;
}
export interface AgentDiscoveryResult {
    availableAgents: AgentInfo[];
    suitableAgents: AgentInfo[];
    scoredAgents: ScoredAgent[];
    agentRankings: Map<AgentTask, ScoredAgent[]>;
    totalCapacity: number;
    timestamp: Date;
}
export interface ScoredAgent {
    agentId: string;
    agentName: string;
    matchScore: number;
    confidence: number;
    availability: number;
    estimatedPerformance: number;
    capabilityCoverage: number[];
}
export interface TaskAssignmentResult {
    assignments: TaskAssignment[];
    unassignedTasks: AgentTask[];
    assignmentEfficiency: number;
    workloadBalance: number;
    timestamp: Date;
}
export interface TaskAssignment {
    taskId: string;
    agentId: string;
    agentName: string;
    matchScore: number;
    estimatedCompletion: number;
    resourceAllocation: ResourceAllocation;
    confidence: number;
    assignedAt: Date;
    assignmentType: AssignmentType;
}
export declare enum AssignmentType {
    DIRECT = "direct",
    DELEGATED = "delegated",
    COLLABORATIVE = "collaborative",
    SUPERVISED = "supervised"
}
export interface LoadBalancingResult {
    originalWorkload: WorkloadAnalysis;
    imbalancedAgents: ImbalancedAgent[];
    recommendations: LoadBalancingRecommendation[];
    balancingActions: LoadBalancingAction[];
    newWorkload: WorkloadAnalysis;
    improvementScore: number;
    timestamp: Date;
}
export interface WorkloadAnalysis {
    agentWorkloads: Map<string, AgentWorkload>;
    averageWorkload: number;
    workloadVariance: number;
    balanceScore: number;
}
export interface AgentWorkload {
    agentId: string;
    currentLoad: number;
    maxCapacity: number;
    utilization: number;
    stressLevel: number;
}
export interface ImbalancedAgent {
    agentId: string;
    agentName: string;
    imbalanceType: ImbalanceType;
    severity: number;
    recommendedAction: string;
}
export declare enum ImbalanceType {
    OVERLOADED = "overloaded",
    UNDERLOADED = "underloaded",
    MISMATCHED = "mismatched",
    UNAVAILABLE = "unavailable"
}
export interface LoadBalancingRecommendation {
    agentId: string;
    action: BalancingAction;
    targetLoad: number;
    tasksToMove: string[];
    estimatedImprovement: number;
    confidence: number;
}
export declare enum BalancingAction {
    REDISTRIBUTE_TASKS = "redistribute_tasks",
    SCALE_RESOURCES = "scale_resources",
    ADJUST_PRIORITY = "adjust_priority",
    COLLABORATE = "collaborate"
}
export interface LoadBalancingAction {
    taskId: string;
    task: AgentTask;
    fromAgent: AgentInfo;
    toAgent: AgentInfo;
    reason: string;
    estimatedBenefit: number;
    riskLevel: number;
}
export interface ResourceAllocationResult {
    allocations: ResourceAllocationDetail[];
    totalResourcesAllocated: TotalResourcesAllocated;
    resourceUtilization: ResourceUtilization;
    allocationEfficiency: number;
    timestamp: Date;
}
export interface ResourceAllocationDetail {
    taskId: string;
    agentId: string;
    allocation: ResourceAllocation;
    reservation: ResourceReservation;
    agentdbConfig: AgentDBConfig;
    allocatedAt: Date;
    expiresAt: Date;
}
export interface ResourceReservation {
    reservationId: string;
    resources: ResourceAllocation;
    status: ReservationStatus;
    createdAt: Date;
    expiresAt: Date;
}
export declare enum ReservationStatus {
    ACTIVE = "active",
    EXPIRED = "expired",
    RELEASED = "released",
    FAILED = "failed"
}
export interface AgentDBConfig {
    vectorIndexAccess: boolean;
    quicSyncEnabled: boolean;
    cacheSize: number;
    memoryNamespace: string;
    permissions: string[];
}
export interface TotalResourcesAllocated {
    totalCores: number;
    totalMemory: number;
    totalStorage: number;
    totalNetworkBandwidth: number;
    totalDatabaseConnections: number;
}
export interface ResourceUtilization {
    cpuUtilization: number;
    memoryUtilization: number;
    storageUtilization: number;
    networkUtilization: number;
    databaseUtilization: number;
}
export interface MemorySyncData {
    vectors: VectorData[];
    patterns: PatternData[];
    agentStates: AgentStateData[];
    temporalPatterns: TemporalPatternData[];
}
export interface VectorData {
    id: string;
    vector: number[];
    metadata: any;
    timestamp: Date;
}
export interface PatternData {
    id: string;
    pattern: any;
    confidence: number;
    timestamp: Date;
}
export interface AgentStateData {
    agentId: string;
    state: any;
    timestamp: Date;
}
export interface TemporalPatternData {
    id: string;
    pattern: any;
    temporalProfile: any;
    timestamp: Date;
}
export interface MemorySyncResult {
    quicSync: QUICSyncResult;
    vectorSync: VectorSyncResult;
    patternSync: PatternSyncResult;
    stateSync: StateSyncResult;
    temporalSync: TemporalSyncResult;
    totalSyncTime: number;
    syncedItems: number;
    syncQuality: number;
    timestamp: Date;
}
export interface QUICSyncResult {
    enabled: boolean;
    connections: number;
    latency: number;
    bandwidth: number;
    reliability: number;
}
export interface VectorSyncResult {
    vectorsSynced: number;
    indexesUpdated: number;
    syncTime: number;
    errors: string[];
}
export interface PatternSyncResult {
    patternsSynced: number;
    newPatterns: number;
    updatedPatterns: number;
    conflicts: string[];
}
export interface StateSyncResult {
    agentsSynced: number;
    stateSize: number;
    syncTime: number;
    conflicts: string[];
}
export interface TemporalSyncResult {
    patternsSynced: number;
    reasoningStates: number;
    syncTime: number;
    conflicts: string[];
}
export interface KnowledgeSharingResult {
    knowledgeShared: KnowledgeItem[];
    knowledgeVectors: KnowledgeVector[];
    agentMatches: AgentMatch[];
    transfers: KnowledgeTransfer[];
    learningPatterns: LearningPattern[];
    sharingEfficiency: number;
    knowledgeGrowth: number;
    timestamp: Date;
}
export interface KnowledgeItem {
    id: string;
    type: KnowledgeType;
    content: any;
    metadata: any;
    timestamp: Date;
}
export declare enum KnowledgeType {
    OPTIMIZATION_STRATEGY = "optimization_strategy",
    PERFORMANCE_PATTERN = "performance_pattern",
    CAUSAL_RELATIONSHIP = "causal_relationship",
    TEMPORAL_PATTERN = "temporal_pattern",
    BEST_PRACTICE = "best_practice",
    LESSON_LEARNED = "lesson_learned"
}
export interface KnowledgeVector {
    knowledgeId: string;
    vector: number[];
    dimension: number;
    similarityThreshold: number;
}
export interface AgentMatch {
    knowledgeId: string;
    agentId: string;
    similarity: number;
    relevanceScore: number;
    transferBenefit: number;
}
export interface KnowledgeTransfer {
    transferId: string;
    knowledgeId: string;
    fromAgent: string;
    toAgent: string;
    transferMethod: TransferMethod;
    transferTime: number;
    success: boolean;
    feedback: TransferFeedback;
}
export declare enum TransferMethod {
    DIRECT_COPY = "direct_copy",
    ADAPTIVE_TRANSFER = "adaptive_transfer",
    PATTERN_EXTRACTION = "pattern_extraction",
    SYNTHESIS = "synthesis"
}
export interface TransferFeedback {
    usefulness: number;
    accuracy: number;
    applicability: number;
    improvement: string[];
}
export interface LearningPattern {
    patternId: string;
    type: PatternType;
    agents: string[];
    interactions: Interaction[];
    outcomes: Outcome[];
    effectiveness: number;
    timestamp: Date;
}
export declare enum PatternType {
    COLLABORATIVE = "collaborative",
    COMPETITIVE = "competitive",
    HIERARCHICAL = "hierarchical",
    PEER_TO_PEER = "peer_to_peer",
    MENTORING = "mentoring"
}
export interface Interaction {
    fromAgent: string;
    toAgent: string;
    type: InteractionType;
    timestamp: Date;
    outcome: string;
}
export declare enum InteractionType {
    KNOWLEDGE_SHARING = "knowledge_sharing",
    TASK_DELEGATION = "task_delegation",
    COLLABORATION = "collaboration",
    COORDINATION = "coordination",
    COMPETITION = "competition"
}
export interface Outcome {
    agentId: string;
    metric: string;
    value: number;
    improvement: number;
}
export default MultiAgentCoordinationStreams;
//# sourceMappingURL=coordination-streams.d.ts.map