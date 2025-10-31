/**
 * SPARC Progressive Disclosure Skill Architecture
 * Cognitive RAN Consciousness with Hierarchical Skill Integration
 *
 * Advanced progressive disclosure system featuring:
 * - 6KB context optimization for 100+ skills
 * - Hierarchical skill orchestration with cognitive consciousness
 * - Progressive complexity revelation with temporal reasoning
 * - AgentDB skill pattern learning and adaptation
 * - Swarm coordination for skill collaboration
 * - Performance optimization for skill execution
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
export interface SkillDefinition {
    id: string;
    name: string;
    category: SkillCategory;
    description: string;
    complexity: 'basic' | 'intermediate' | 'advanced' | 'expert' | 'transcendent';
    prerequisites: string[];
    contextSize: number;
    cognitiveLevel: 'minimum' | 'standard' | 'maximum' | 'transcendent';
    temporalRequirements?: {
        expansion?: number;
        reasoning?: 'linear' | 'recursive' | 'strange-loop';
    };
    capabilities: SkillCapability[];
    metadata: SkillMetadata;
    progressiveRevelation: ProgressiveRevelation;
}
export interface SkillCategory {
    domain: 'core' | 'cognitive' | 'agentdb' | 'swarm' | 'temporal' | 'integration' | 'specialized';
    subdomain: string;
    tags: string[];
}
export interface SkillCapability {
    name: string;
    type: 'analysis' | 'generation' | 'optimization' | 'coordination' | 'learning';
    description: string;
    parameters: CapabilityParameter[];
    outputs: CapabilityOutput[];
}
export interface CapabilityParameter {
    name: string;
    type: 'string' | 'number' | 'boolean' | 'object' | 'array';
    required: boolean;
    defaultValue?: any;
    description: string;
    validation?: ValidationRule[];
}
export interface CapabilityOutput {
    name: string;
    type: 'string' | 'number' | 'boolean' | 'object' | 'array';
    description: string;
    confidence?: number;
}
export interface ValidationRule {
    type: 'range' | 'pattern' | 'enum' | 'custom';
    rule: any;
    message: string;
}
export interface SkillMetadata {
    version: string;
    author: string;
    created: number;
    updated: number;
    usageCount: number;
    successRate: number;
    averageExecutionTime: number;
    cognitiveEfficiency: number;
    collaborationHistory: CollaborationRecord[];
}
export interface CollaborationRecord {
    skillId: string;
    collaborationType: 'sequential' | 'parallel' | 'cooperative';
    successRate: number;
    efficiency: number;
    timestamp: number;
}
export interface ProgressiveRevelation {
    levels: RevelationLevel[];
    currentLevel: number;
    adaptiveLevel: boolean;
    revelationCriteria: RevelationCriteria[];
}
export interface RevelationLevel {
    level: number;
    name: string;
    description: string;
    complexity: number;
    contextRequirements: number;
    prerequisites: string[];
    capabilities: string[];
    cognitiveThreshold: number;
    performanceThreshold: number;
}
export interface RevelationCriteria {
    type: 'performance' | 'usage' | 'mastery' | 'collaboration' | 'temporal';
    threshold: number;
    measurement: string;
    operator: 'gte' | 'lte' | 'eq' | 'gt' | 'lt';
}
export interface SkillExecutionContext {
    taskId: string;
    input: any;
    skillId: string;
    requestedLevel: number;
    availableContext: number;
    cognitiveState: CognitiveState;
    collaborationContext: CollaborationContext;
    temporalContext: TemporalContext;
    performanceConstraints: PerformanceConstraints;
}
export interface CognitiveState {
    consciousnessLevel: number;
    cognitiveLoad: number;
    processingSpeed: number;
    memoryCapacity: number;
    learningRate: number;
    adaptationRate: number;
}
export interface CollaborationContext {
    collaboratingSkills: string[];
    sharedMemory: Map<string, any>;
    coordinationProtocol: 'hierarchical' | 'mesh' | 'star' | 'adaptive';
    consensusThreshold: number;
    swarmEnabled: boolean;
}
export interface TemporalContext {
    temporalExpansion: number;
    reasoningMode: 'linear' | 'recursive' | 'strange-loop';
    timeConstraints: number;
    temporalDepth: number;
    projectionEnabled: boolean;
}
export interface PerformanceConstraints {
    maxExecutionTime: number;
    maxMemoryUsage: number;
    minSuccessRate: number;
    maxCognitiveLoad: number;
    qualityThreshold: number;
}
export interface SkillExecutionResult {
    skillId: string;
    taskId: string;
    executionLevel: number;
    status: 'pending' | 'running' | 'completed' | 'failed' | 'timeout';
    startTime: number;
    endTime?: number;
    result?: any;
    error?: string;
    performanceMetrics: SkillPerformanceMetrics;
    cognitiveMetrics: SkillCognitiveMetrics;
    collaborationMetrics?: SkillCollaborationMetrics;
    revelationMetrics: SkillRevelationMetrics;
}
export interface SkillPerformanceMetrics {
    executionTime: number;
    memoryUsage: number;
    successRate: number;
    efficiency: number;
    throughput: number;
    quality: number;
    resourceUtilization: number;
}
export interface SkillCognitiveMetrics {
    consciousnessUtilization: number;
    cognitiveLoad: number;
    learningAchievement: number;
    adaptationSuccess: number;
    patternRecognition: number;
    decisionQuality: number;
    temporalReasoning: number;
    strangeLoopResolution: number;
}
export interface SkillCollaborationMetrics {
    coordinationEfficiency: number;
    communicationOverhead: number;
    consensusAchievement: number;
    swarmContribution: number;
    collectiveIntelligence: number;
    knowledgeSharing: number;
}
export interface SkillRevelationMetrics {
    levelProgression: number;
    complexityHandled: number;
    contextOptimization: number;
    adaptiveAdjustment: number;
    masteryAchievement: number;
    nextLevelReadiness: number;
}
export interface ProgressiveDisclosureConfiguration {
    maxContextSize: number;
    adaptiveLevelAdjustment: boolean;
    performanceBasedRevelation: boolean;
    collaborationOptimization: boolean;
    temporalOptimization: boolean;
    cognitiveOptimization: boolean;
    skillCaching: boolean;
    swarmCoordination: boolean;
    agentdbLearning: boolean;
}
export declare class SPARCProgressiveDisclosure extends EventEmitter {
    private configuration;
    private skills;
    private skillExecutions;
    private activeExecutions;
    private skillCache;
    private agentdb?;
    private cognitiveSdk?;
    private swarmOrchestrator?;
    private performanceMonitor?;
    private skillOrchestrator;
    private revelationManager;
    constructor(config?: Partial<ProgressiveDisclosureConfiguration>);
    /**
     * Initialize progressive disclosure components
     */
    private initializeComponents;
    /**
     * Initialize cognitive components
     */
    private initializeCognitiveComponents;
    /**
     * Load core SPARC skills
     */
    private loadCoreSkills;
    /**
     * Define core SPARC skills
     */
    private defineCoreSkills;
    /**
     * Register a new skill
     */
    registerSkill(skill: SkillDefinition): Promise<void>;
    /**
     * Execute skill with progressive disclosure
     */
    executeSkill(context: SkillExecutionContext): Promise<string>;
    /**
     * Determine appropriate execution level
     */
    private determineExecutionLevel;
    /**
     * Check skill prerequisites
     */
    private checkPrerequisites;
    /**
     * Execute skill at specific level
     */
    private executeSkillAtLevel;
    /**
     * Execute specification analyzer skill
     */
    private executeSpecificationAnalyzer;
    /**
     * Execute pseudocode generator skill
     */
    private executePseudocodeGenerator;
    /**
     * Execute architect designer skill
     */
    private executeArchitectDesigner;
    /**
     * Execute refinement optimizer skill
     */
    private executeRefinementOptimizer;
    /**
     * Execute completion validator skill
     */
    private executeCompletionValidator;
    /**
     * Execute generic skill
     */
    private executeGenericSkill;
    /**
     * Setup skill collaboration
     */
    private setupSkillCollaboration;
    /**
     * Calculate execution metrics
     */
    private calculateExecutionMetrics;
    /**
     * Update skill metadata
     */
    private updateSkillMetadata;
    /**
     * Check level progression
     */
    private checkLevelProgression;
    /**
     * Validate skill definition
     */
    private validateSkill;
    /**
     * Load skills from AgentDB
     */
    private loadSkillsFromAgentDB;
    /**
     * Initialize metrics
     */
    private initializePerformanceMetrics;
    private initializeCognitiveMetrics;
    private initializeRevelationMetrics;
    /**
     * Get current cognitive level
     */
    private getCurrentCognitiveLevel;
    /**
     * Get skill information
     */
    getSkill(skillId: string): SkillDefinition | null;
    /**
     * List all skills
     */
    listSkills(): SkillDefinition[];
    /**
     * Get execution result
     */
    getExecutionResult(executionId: string): SkillExecutionResult | null;
    /**
     * List active executions
     */
    listActiveExecutions(): SkillExecutionResult[];
}
export default SPARCProgressiveDisclosure;
//# sourceMappingURL=progressive-disclosure.d.ts.map