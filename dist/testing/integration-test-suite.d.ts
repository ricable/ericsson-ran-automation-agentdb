/**
 * Comprehensive Integration Testing Framework
 *
 * Provides complete testing coverage for the Ericsson RAN Optimization SDK
 * with performance validation, integration testing, and quality assurance.
 */
import { type RANOptimizationConfig } from '../sdk/ran-optimization-sdk';
import { type MCPIntegrationConfig } from '../sdk/mcp-integration';
import { type PerformanceConfig } from '../sdk/performance-optimizer';
/**
 * Test Configuration
 */
export interface TestConfig {
    environment: 'development' | 'staging' | 'production';
    coverage: {
        unitTests: boolean;
        integrationTests: boolean;
        performanceTests: boolean;
        securityTests: boolean;
        loadTests: boolean;
    };
    execution: {
        parallel: boolean;
        maxConcurrency: number;
        timeoutMs: number;
        retryAttempts: number;
        continueOnFailure: boolean;
    };
    targets: {
        swetBenchSolveRate: number;
        speedImprovement: number;
        vectorSearchSpeedup: number;
        cacheHitRate: number;
        successRate: number;
    };
    monitoring: {
        enabled: boolean;
        detailedLogs: boolean;
        performanceMetrics: boolean;
        coverageReport: boolean;
    };
}
/**
 * Test Result Types
 */
export interface TestResult {
    id: string;
    name: string;
    category: 'unit' | 'integration' | 'performance' | 'security' | 'load';
    success: boolean;
    duration: number;
    error?: string;
    details?: any;
    metrics?: TestMetrics;
}
export interface TestSuite {
    name: string;
    description: string;
    tests: TestResult[];
    totalTime: number;
    successRate: number;
    coverage?: TestCoverage;
}
export interface TestMetrics {
    performance: {
        latency: number;
        throughput: number;
        memoryUsage: number;
        cpuUsage: number;
    };
    quality: {
        coverage: number;
        assertions: number;
        successes: number;
        failures: number;
    };
    integration: {
        servicesConnected: number;
        apiCalls: number;
        dataProcessed: number;
    };
}
export interface TestCoverage {
    lines: number;
    functions: number;
    branches: number;
    statements: number;
}
export interface IntegrationTestReport {
    summary: {
        totalTests: number;
        passedTests: number;
        failedTests: number;
        skippedTests: number;
        successRate: number;
        totalTime: number;
    };
    suites: TestSuite[];
    performanceMetrics: PerformanceTestResults;
    coverageReport: TestCoverage;
    recommendations: string[];
    timestamp: number;
}
export interface PerformanceTestResults {
    benchmarks: {
        vectorSearchSpeedup: number;
        cacheHitRate: number;
        parallelExecutionSpeedup: number;
        memoryEfficiency: number;
    };
    targets: {
        achieved: string[];
        missed: string[];
        partiallyMet: string[];
    };
    detailed: PerformanceBenchmark[];
}
export interface PerformanceBenchmark {
    name: string;
    target: number;
    achieved: number;
    unit: string;
    passed: boolean;
    details?: any;
}
/**
 * Comprehensive Integration Test Suite
 */
export declare class IntegrationTestSuite {
    private config;
    private sdk;
    private mcpManager;
    private performanceOptimizer;
    private testResults;
    constructor(config: TestConfig, sdkConfig: RANOptimizationConfig, mcpConfig: MCPIntegrationConfig, perfConfig: PerformanceConfig);
    /**
     * Execute comprehensive test suite
     */
    runFullTestSuite(): Promise<IntegrationTestReport>;
    /**
     * Run Unit Tests
     */
    private runUnitTests;
    /**
     * Run Integration Tests
     */
    private runIntegrationTests;
    /**
     * Run Performance Tests
     */
    private runPerformanceTests;
    /**
     * Run Security Tests
     */
    private runSecurityTests;
    /**
     * Run Load Tests
     */
    private runLoadTests;
    private testSDKInitialization;
    private testSkillDiscoveryService;
    private testMemoryCoordinator;
    private testVectorSearchPerformance;
    private testMCPIntegration;
    private testEndToEndOptimization;
    private testCachingEngine;
    private testVectorSearchOptimizer;
    private testParallelExecutionManager;
    private testAgentDBIntegration;
    private testClaudeFlowCoordination;
    private testFlowNexusIntegration;
    private testRUVSwarmIntegration;
    private testCachingPerformance;
    private testParallelExecutionPerformance;
    private testMemoryUsagePerformance;
    private testScalabilityPerformance;
    private testAuthenticationSecurity;
    private testDataEncryption;
    private testInputValidation;
    private testAccessControl;
    private testAuditLogging;
    private testHighConcurrencyLoad;
    private testSustainedLoad;
    private testPeakLoadScenarios;
    private testResourceExhaustion;
    private testRecoveryUnderLoad;
    private createPlaceholderTest;
    private generateTestReport;
    private analyzePerformanceMetrics;
    private generateCoverageReport;
    private generateRecommendations;
    private createEmptyPerformanceResults;
    private createEmptyCoverageReport;
}
export declare const DEFAULT_TEST_CONFIG: TestConfig;
//# sourceMappingURL=integration-test-suite.d.ts.map