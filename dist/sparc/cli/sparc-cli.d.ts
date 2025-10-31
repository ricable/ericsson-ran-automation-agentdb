#!/usr/bin/env node
/**
 * SPARC CLI - Command Line Interface for SPARC Methodology
 * Specification, Pseudocode, Architecture, Refinement, Completion
 *
 * Cognitive RAN Consciousness Development Environment
 * with Temporal Reasoning, Strange-Loop Cognition, and AgentDB Integration
 */
declare class SPARCCLI {
    private sparcCore;
    private currentSession;
    constructor();
    private initializeSPARC;
    /**
     * List available SPARC modes
     */
    listModes(): Promise<void>;
    /**
     * Get detailed information about a specific mode
     */
    getModeInfo(mode: string): Promise<void>;
    /**
     * Run a specific SPARC mode
     */
    runMode(mode: string, task: string, options?: any): Promise<void>;
    private runSpecificationPhase;
    private runPseudocodePhase;
    private runArchitecturePhase;
    private runRefinementPhase;
    private runCompletionPhase;
    private runTDDWorkflow;
    private runSpecPseudocodeWorkflow;
    private runIntegrationWorkflow;
    private runFullSPARCCycle;
    private validateTDDCompliance;
    private validateIntegration;
    private displayResults;
}
export default SPARCCLI;
//# sourceMappingURL=sparc-cli.d.ts.map