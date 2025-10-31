/**
 * Cognitive RAN Real-Time Monitoring Dashboard
 * Provides <1s updates for system health, agent performance, and cognitive metrics
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
import { Dashboard, DashboardWidget } from '../../types/performance';
export declare class RealTimeDashboard extends EventEmitter {
    private dashboard;
    private updateInterval;
    private readonly updateIntervalMs;
    private connectedClients;
    constructor();
    /**
     * Start real-time dashboard
     */
    start(): Promise<void>;
    /**
     * Stop real-time dashboard
     */
    stop(): Promise<void>;
    /**
     * Initialize dashboard configuration
     */
    private initializeDashboard;
    /**
     * Update dashboard with latest data
     */
    private updateDashboard;
    /**
     * Collect data for all dashboard widgets
     */
    private collectDashboardData;
    /**
     * Generate system health data
     */
    private generateSystemHealthData;
    /**
     * Generate cognitive metrics data
     */
    private generateCognitiveData;
    /**
     * Generate SWE-Bench performance data
     */
    private generateSWEbenchData;
    /**
     * Generate AgentDB performance data
     */
    private generateAgentDBData;
    /**
     * Generate system resources data
     */
    private generateSystemData;
    /**
     * Generate active agents data
     */
    private generateAgentsData;
    /**
     * Generate performance alerts data
     */
    private generateAlertsData;
    /**
     * Generate alert message based on component and severity
     */
    private generateAlertMessage;
    /**
     * Generate bottlenecks data
     */
    private generateBottlenecksData;
    /**
     * Register client for real-time updates
     */
    registerClient(client: any): void;
    /**
     * Unregister client
     */
    unregisterClient(client: any): void;
    /**
     * Broadcast data to all connected clients
     */
    private broadcastToClients;
    /**
     * Get dashboard configuration
     */
    getDashboard(): Dashboard;
    /**
     * Update widget configuration
     */
    updateWidget(widgetId: string, updates: Partial<DashboardWidget>): void;
    /**
     * Add new widget to dashboard
     */
    addWidget(widget: DashboardWidget): void;
    /**
     * Remove widget from dashboard
     */
    removeWidget(widgetId: string): void;
    /**
     * Get dashboard metrics summary
     */
    getMetricsSummary(): any;
}
//# sourceMappingURL=RealTimeDashboard.d.ts.map