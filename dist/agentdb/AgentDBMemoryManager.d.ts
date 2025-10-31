/**
 * AgentDB Memory Manager with QUIC Synchronization
 * 150x faster vector search with cross-agent learning patterns
 */
interface MemoryConfig {
    swarmId: string;
    syncProtocol: 'QUIC' | 'TCP' | 'UDP';
    persistenceEnabled: boolean;
    crossAgentLearning: boolean;
    patternRecognition: boolean;
}
export declare class AgentDBMemoryManager {
    private config;
    private state;
    private memories;
    private learningPatterns;
    private agentConnections;
    private syncIntervals;
    constructor(config: MemoryConfig);
    initialize(): Promise<void>;
    /**
     * Enable QUIC synchronization for distributed memory
     */
    enableQUICSynchronization(): Promise<void>;
    /**
     * Store memory with automatic indexing and pattern extraction
     */
    store(key: string, value: any, options?: any): Promise<void>;
    /**
     * Retrieve memory with fast vector search
     */
    retrieve(key: string): Promise<any>;
    /**
     * Search memories with vector similarity (150x faster)
     */
    search(query: string, options?: any): Promise<any[]>;
    /**
     * Share learning patterns between agents
     */
    shareLearning(learning: any): Promise<void>;
    /**
     * Store learning patterns for future use
     */
    storeLearningPatterns(patterns: any[]): Promise<void>;
    /**
     * Get learning statistics
     */
    getStatistics(): Promise<any>;
    private initializeMemoryStorage;
    private setupPatternRecognition;
    private initializeCrossAgentLearning;
    private setupPerformanceMonitoring;
    private initializeQUICConnection;
    private performQUICSync;
    private syncMemoryWithQUIC;
    private syncPatternWithQUIC;
    private syncLearningWithAgents;
    private sendLearningToAgent;
    private extractLearningPattern;
    private extractCrossAgentPatterns;
    private calculateCrossAgentApplicability;
    private calculateSimilarity;
    private updateAccessPatterns;
    private shareMemoryWithAgents;
    private sendMemoryToAgent;
    private updatePerformanceMetrics;
    private loadPersistedMemories;
    private getMemoryStatsByPriority;
    private getMemoryStatsByTags;
    private getMemoryStatsByAge;
    private getLearningStatsByType;
    private getLearningStatsByConfidence;
    private getCrossAgentStats;
    /**
     * Shutdown memory manager
     */
    shutdown(): Promise<void>;
    private closeAgentConnection;
    private persistMemories;
}
export {};
//# sourceMappingURL=AgentDBMemoryManager.d.ts.map