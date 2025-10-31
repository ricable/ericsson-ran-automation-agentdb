/**
 * Cognitive RAN Performance Monitoring Orchestrator
 * Coordinates all performance monitoring components and provides unified interface
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
import { SystemHealth } from '../../types/performance';
export declare class PerformanceOrchestrator extends EventEmitter {
    private components;
    private isRunning;
    private healthCheckInterval;
    private coordinationInterval;
    constructor();
    /**
     * Initialize all monitoring components
     */
    private initializeComponents;
    /**
     * Setup coordination between components
     */
    private setupComponentCoordination;
    /**
     * Start the complete performance monitoring system
     */
    start(): Promise<void>;
    /**
     * Stop the performance monitoring system
     */
    stop(): Promise<void>;
    /**
     * Start health checks for all components
     */
    private startHealthChecks;
    /**
     * Start coordination tasks
     */
    private startCoordinationTasks;
    /**
     * Perform system health check
     */
    private performSystemHealthCheck;
    /**
     * Perform coordination tasks between components
     */
    private performCoordinationTasks;
    /**
     * Sync metrics between components
     */
    private syncComponentMetrics;
    /**
     * Trigger conditional analysis based on system state
     */
    private triggerConditionalAnalysis;
    /**
     * Optimize component performance
     */
    private optimizeComponentPerformance;
    /**
     * Get comprehensive system health
     */
    getSystemHealth(): Promise<SystemHealth>;
    /**
     * Get comprehensive performance overview
     */
    getPerformanceOverview(): Promise<any>;
    /**
     * Generate on-demand performance report
     */
    generatePerformanceReport(type?: 'executive' | 'technical' | 'trend' | 'incident'): Promise<any>;
    /**
     * Get component status
     */
    getComponentStatus(): any;
    /**
     * Export all performance data
     */
    exportAllData(format?: 'json' | 'csv'): string;
    /**
     * Get monitoring statistics
     */
    getMonitoringStatistics(): any;
}
//# sourceMappingURL=PerformanceOrchestrator.d.ts.map