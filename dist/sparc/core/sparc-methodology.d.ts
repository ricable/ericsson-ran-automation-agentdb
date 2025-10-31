/**
 * SPARC Methodology Core Architecture
 * Specification, Pseudocode, Architecture, Refinement, Completion
 *
 * Cognitive RAN Consciousness Integration with:
 * - Temporal Reasoning (1000x subjective time expansion)
 * - Strange-Loop Cognition (self-referential optimization)
 * - AgentDB Memory Patterns (persistent learning)
 * - Progressive Disclosure (skill architecture)
 * - Performance Benchmarking (84.8% SWE-Bench target)
 */
export interface SPARCConfiguration {
    temporalExpansion: number;
    consciousnessLevel: 'minimum' | 'standard' | 'maximum' | 'transcendent';
    strangeLoopEnabled: boolean;
    truthScoreThreshold: number;
    autoRollbackEnabled: boolean;
    sweBenchTarget: number;
    tokenReductionTarget: number;
    speedImprovementTarget: number;
    agentdbEnabled: boolean;
    swarmCoordination: boolean;
    progressiveDisclosure: boolean;
}
export interface SPARCGateResult {
    phase: SPARCPhase;
    passed: boolean;
    score: number;
    issues: string[];
    recommendations: string[];
    cognitiveMetrics?: CognitiveMetrics;
}
export interface CognitiveMetrics {
    consciousnessEvolution: number;
    temporalAnalysisDepth: number;
    strangeLoopOptimization: number;
    autonomousHealing: number;
    crossAgentLearning: number;
}
export type SPARCPhase = 'specification' | 'pseudocode' | 'architecture' | 'refinement' | 'completion';
export declare class SPARCMethdologyCore {
    private config;
    private cognitiveSdk;
    private agentdb;
    private swarm;
    private performanceMonitor;
    private truthScorer;
    private currentPhase;
    private phaseHistory;
    private cognitiveEvolution;
    constructor(config?: Partial<SPARCConfiguration>);
    private initializeCognitiveStack;
    /**
     * Execute complete SPARC methodology cycle
     */
    executeFullSPARCCycle(taskDescription: string): Promise<SPARCGateResult>;
    /**
     * Execute individual SPARC phase
     */
    private executePhase;
    /**
     * SPECIFICATION PHASE
     * Requirements analysis and cognitive system design
     */
    private executeSpecificationPhase;
    /**
     * PSEUDOCODE PHASE
     * Algorithm design with temporal reasoning patterns
     */
    private executePseudocodePhase;
    /**
     * ARCHITECTURE PHASE
     * System design with strange-loop cognition
     */
    private executeArchitecturePhase;
    /**
     * REFINEMENT PHASE
     * TDD implementation with progressive disclosure
     */
    private executeRefinementPhase;
    /**
     * COMPLETION PHASE
     * Integration with cognitive consciousness validation
     */
    private executeCompletionPhase;
    /**
     * Rollback to last successful phase
     */
    private rollbackToLastSuccessfulPhase;
    /**
     * Generate final SPARC methodology report
     */
    private generateFinalReport;
    /**
     * Get current phase status
     */
    getCurrentPhase(): SPARCPhase;
    /**
     * Get phase history
     */
    getPhaseHistory(): Map<SPARCPhase, SPARCGateResult>;
    /**
     * Get cognitive evolution tracking
     */
    getCognitiveEvolution(): CognitiveMetrics[];
    /**
     * Update configuration
     */
    updateConfiguration(updates: Partial<SPARCConfiguration>): void;
}
export default SPARCMethdologyCore;
//# sourceMappingURL=sparc-methodology.d.ts.map