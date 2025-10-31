/**
 * Progressive Disclosure Skill Discovery Service
 *
 * Implements 3-level skill loading architecture for 6KB context with 100+ skills
 * Provides cognitive consciousness integration for Phase 1 RAN optimization
 */
import { type AgentDBAdapter } from 'agentic-flow/reasoningbank';
/**
 * Skill Discovery Configuration
 */
export interface SkillDiscoveryConfig {
    levels: {
        metadata: {
            enabled: boolean;
            maxContextSize: number;
            cacheEnabled: boolean;
            cacheTTL: number;
        };
        content: {
            enabled: boolean;
            lazyLoading: boolean;
            preloadCritical: boolean;
            cacheEnabled: boolean;
        };
        resources: {
            enabled: boolean;
            onDemandLoading: boolean;
            cacheEnabled: boolean;
        };
    };
    cognitive: {
        enableConsciousnessFiltering: boolean;
        relevanceThreshold: number;
        learningEnabled: boolean;
        patternRecognition: boolean;
    };
    performance: {
        parallelLoading: boolean;
        batchSize: number;
        compressionEnabled: boolean;
        indexingStrategy: 'vector' | 'hybrid' | 'metadata';
    };
}
/**
 * Skill Metadata (Level 1)
 */
export interface SkillMetadata {
    name: string;
    description: string;
    directory: string;
    category: SkillCategory;
    priority: 'critical' | 'high' | 'medium' | 'low';
    contextSize: number;
    tags: string[];
    cognitiveWeight: number;
    relevanceScore?: number;
    consciousnessLevel?: 'basic' | 'enhanced' | 'maximum';
    loadingLevel: 'metadata' | 'content' | 'resources';
    lastAccessed?: number;
    accessCount: number;
    filePath: string;
    frontmatter: any;
}
/**
 * Skill Content (Level 2)
 */
export interface SkillContent {
    name: string;
    content: string;
    metadata: SkillMetadata;
    loadedAt: number;
    size: number;
    compressed?: boolean;
    embedding?: number[];
}
/**
 * Skill Resources (Level 3)
 */
export interface SkillResource {
    skillName: string;
    resourcePath: string;
    content: string;
    type: 'code' | 'documentation' | 'configuration' | 'template';
    loadedAt: number;
}
/**
 * Skill Category
 */
export type SkillCategory = 'agentdb-integration' | 'flow-nexus-integration' | 'github-integration' | 'swarm-intelligence' | 'performance-analysis' | 'methodology-reasoning' | 'specialized-skills' | 'cognitive-ran';
/**
 * Progressive Skill Discovery Service
 */
export declare class ProgressiveSkillDiscoveryService {
    private agentDB;
    private config;
    private metadataCache;
    private contentCache;
    private resourceCache;
    private cognitiveState;
    private learningPatterns;
    constructor(config: SkillDiscoveryConfig, agentDB: AgentDBAdapter);
    /**
     * Initialize progressive skill discovery
     */
    initialize(): Promise<void>;
    /**
     * Level 1: Load metadata for all skills (always active)
     * Achieves 6KB context for 100+ skills through minimal metadata
     */
    loadAllSkillMetadata(): Promise<SkillMetadata[]>;
    /**
     * Level 2: Load full skill content when triggered
     */
    loadSkillContent(skillName: string): Promise<SkillContent>;
    /**
     * Level 3: Load referenced resources on demand
     */
    loadSkillResource(skillName: string, resourcePath: string): Promise<SkillResource>;
    /**
     * Find relevant skills based on context with cognitive consciousness
     */
    findRelevantSkills(context: RANContext): Promise<RelevantSkillResult[]>;
    /**
     * Progressive content loading based on cognitive scoring
     */
    progressivelyLoadSkills(relevantSkills: RelevantSkillResult[], context: RANContext): Promise<LoadedSkillSet>;
    /**
     * Initialize cognitive consciousness for skill discovery
     */
    private initializeCognitiveConsciousness;
    private scanSkillDirectories;
    private loadSkillMetadata;
    private parseYAMLFrontmatter;
    private inferCategory;
    private calculateBaseCognitiveWeight;
    private readSkillFile;
    private extractSkillContent;
    private inferResourceType;
    private generateContextEmbedding;
    private generateContentEmbedding;
    private applyCognitiveConsciousnessFiltering;
    private calculateCognitiveScore;
    private determineLoadingStrategy;
    private determineRecommendedLevel;
    private estimateLoadTime;
    private loadSkillResources;
    private updateAccessPattern;
    private storeMetadataInAgentDB;
    private storeContentInAgentDB;
    private storeResourceInAgentDB;
    private storeLoadingPattern;
    private storeSearchPattern;
    private storeProgressiveLoadingPattern;
    private generateMetadataEmbedding;
    private startBackgroundLearning;
    private performBackgroundLearning;
    /**
     * Get service statistics
     */
    getStatistics(): SkillDiscoveryStatistics;
    /**
     * Clear caches
     */
    clearCaches(): void;
}
export interface CognitiveState {
    consciousnessLevel: 'basic' | 'enhanced' | 'maximum';
    learningEnabled: boolean;
    patternRecognition: boolean;
    initializedAt: number;
}
export interface LearningPattern {
    skillName: string;
    accessPattern: number[];
    cognitiveScore: number;
    lastUpdated: number;
}
export interface RANContext {
    metrics?: any;
    optimizationType?: string;
    targets?: string[];
    complexity?: 'low' | 'medium' | 'high';
    sessionId?: string;
}
export interface RelevantSkillResult {
    skill: SkillMetadata;
    relevanceScore: number;
    cognitiveScore: number;
    loadingStrategy: string;
    recommendedLevel: 'metadata' | 'content' | 'resources';
    estimatedLoadTime: number;
}
export interface LoadedSkillSet {
    metadata: SkillMetadata[];
    content: SkillContent[];
    resources: SkillResource[];
    totalLoadTime: number;
    cognitiveInsights: {
        consciousnessLevel: string;
        loadingStrategy: string;
        optimizationApplied: boolean;
    };
}
export interface SkillDiscoveryStatistics {
    totalSkills: number;
    loadedContent: number;
    loadedResources: number;
    totalContextSize: number;
    cognitiveLevel: string;
    learningEnabled: boolean;
}
//# sourceMappingURL=progressive-skill-discovery.d.ts.map