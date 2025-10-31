/**
 * Ericsson RAN Optimization SDK - Core Integration
 *
 * Comprehensive Agent SDK integration with Claude-Flow coordination,
 * progressive disclosure architecture, and AgentDB memory patterns.
 *
 * Performance Targets:
 * - 84.8% SWE-Bench solve rate
 * - 2.8-4.4x speed improvement through parallel execution
 * - 6KB context for 100+ skills
 * - <1ms QUIC synchronization
 * - 150x faster vector search
 */
import { type AgentDBAdapter } from 'agentic-flow/reasoningbank';
/**
 * Core SDK Configuration Interface
 */
export interface RANOptimizationConfig {
    claudeFlow: {
        topology: 'hierarchical' | 'mesh' | 'ring' | 'star';
        maxAgents: number;
        strategy: 'balanced' | 'specialized' | 'adaptive';
    };
    agentDB: {
        dbPath: string;
        quantizationType: 'binary' | 'scalar' | 'product';
        cacheSize: number;
        enableQUICSync: boolean;
        syncPeers?: string[];
    };
    skillDiscovery: {
        maxContextSize: number;
        loadingStrategy: 'metadata-first' | 'eager' | 'lazy';
        cacheEnabled: boolean;
    };
    performance: {
        parallelExecution: boolean;
        cachingEnabled: boolean;
        benchmarkingEnabled: boolean;
        targetSpeedImprovement: number;
    };
    environment: 'development' | 'staging' | 'production';
}
/**
 * Progressive Skill Discovery Service
 * Implements 3-level loading: Metadata -> Content -> Resources
 */
export declare class SkillDiscoveryService {
    private skillMetadata;
    private skillContent;
    private agentDB;
    constructor(agentDB: AgentDBAdapter);
    /**
     * Level 1: Load metadata for all skills (6KB context for 100+ skills)
     */
    loadSkillMetadata(): Promise<SkillMetadata[]>;
    /**
     * Level 2: Load full skill content when triggered
     */
    loadSkillContent(skillName: string): Promise<SkillContent>;
    /**
     * Level 3: Load referenced resources on demand
     */
    loadSkillResource(skillName: string, resourcePath: string): Promise<string>;
    /**
     * Find relevant skills based on context
     */
    findRelevantSkills(context: RANContext): Promise<SkillMetadata[]>;
    private scanSkillDirectories;
    private readSkillFile;
    private parseYAMLFrontmatter;
    private inferCategory;
    private inferPriority;
    private generateMetadataEmbedding;
    private generateContextEmbedding;
}
/**
 * Memory Integration Patterns
 * Cross-agent memory coordination via AgentDB
 */
export declare class MemoryCoordinator {
    private agentDB;
    private memoryCache;
    constructor(agentDB: AgentDBAdapter);
    /**
     * Store architectural decisions with persistence
     */
    storeDecision(decision: ArchitecturalDecision): Promise<void>;
    /**
     * Retrieve context for agents
     */
    getContext(agentType: string, contextKey?: string): Promise<AgentContext>;
    /**
     * Cross-agent memory sharing
     */
    shareMemory(fromAgent: string, toAgent: string, memoryData: any, priority?: 'low' | 'medium' | 'high' | 'critical'): Promise<void>;
    private generateDecisionEmbedding;
    private vectorizeContext;
    private createDefaultContext;
    private generateMemoryEmbedding;
}
/**
 * Main RAN Optimization SDK Class
 * Orchestrates all components for production deployment
 */
export declare class RANOptimizationSDK {
    private config;
    private agentDB;
    private skillDiscovery;
    private memoryCoordinator;
    private swarmId;
    constructor(config: RANOptimizationConfig);
    /**
     * Initialize SDK with all components
     */
    initialize(): Promise<void>;
    /**
     * Execute RAN optimization with Claude-Flow coordination
     */
    optimizeRANPerformance(metrics: RANMetrics): Promise<OptimizationResult>;
    /**
     * Performance benchmarking
     */
    runPerformanceBenchmark(): Promise<BenchmarkResult>;
    private calculatePerformanceGain;
    private generateTestQueries;
    private calculateOverallScore;
    private calculateCacheHitRate;
    private generateOptimizationRecommendations;
}
export interface SkillMetadata {
    name: string;
    description: string;
    directory: string;
    contextSize: number;
    category: string;
    priority: 'critical' | 'high' | 'medium' | 'low';
}
export interface SkillContent {
    name: string;
    content: string;
    metadata: SkillMetadata;
    loadedAt: number;
}
export interface ArchitecturalDecision {
    id: string;
    title: string;
    context: string;
    decision: string;
    alternatives: string[];
    consequences: string[];
    confidence: number;
    timestamp: number;
}
export interface AgentContext {
    agentType: string;
    initialized: number;
    settings: Record<string, any>;
    memory: any[];
}
export interface MemoryPattern {
    data: any;
    timestamp: number;
    type: string;
}
export interface RANContext {
    metrics?: RANMetrics;
    optimization_type?: string;
    [key: string]: any;
}
export interface RANMetrics {
    energy_efficiency: number;
    mobility_performance: number;
    coverage_quality: number;
    capacity_utilization: number;
    user_experience: number;
    [key: string]: any;
}
export interface OptimizationResult {
    success: boolean;
    optimizations?: string;
    error?: string;
    executionTime: number;
    agentsUsed: number;
    performanceGain: number;
}
export interface BenchmarkResult {
    overall: {
        score: number;
        totalTime: number;
        targetMet: boolean;
    };
    vectorSearch: {
        avgLatency: number;
        target: boolean;
        achieved: boolean;
        throughput: number;
    };
    skillDiscovery: {
        loadTime: number;
        skillsLoaded: number;
        targetMet: boolean;
    };
    memoryCoordination: {
        responseTime: number;
        targetMet: boolean;
        cacheHitRate: number;
    };
    recommendations: string[];
}
export declare const DEFAULT_CONFIG: RANOptimizationConfig;
//# sourceMappingURL=ran-optimization-sdk.d.ts.map