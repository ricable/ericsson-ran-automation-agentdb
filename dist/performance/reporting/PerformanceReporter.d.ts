/**
 * Automated Performance Reporting System
 * Generates comprehensive performance reports with actionable insights,
  trend analysis, and predictive maintenance recommendations
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
import { PerformanceReport } from '../../types/performance';
export declare class PerformanceReporter extends EventEmitter {
    private reportSchedule;
    private reportHistory;
    private readonly maxHistorySize;
    constructor();
    /**
     * Start performance reporting
     */
    start(): Promise<void>;
    /**
     * Stop performance reporting
     */
    stop(): Promise<void>;
    /**
     * Initialize report schedules
     */
    private initializeSchedules;
    /**
     * Schedule automated report generation
     */
    private scheduleReport;
    /**
     * Generate performance report
     */
    generateReport(type: 'executive' | 'technical' | 'trend' | 'incident'): Promise<PerformanceReport>;
    /**
     * Get report period based on type
     */
    private getReportPeriod;
    /**
     * Generate report sections based on type
     */
    private generateReportSections;
    /**
     * Generate executive summary section
     */
    private generateExecutiveSummarySection;
    /**
     * Generate system health section
     */
    private generateSystemHealthSection;
    /**
     * Generate KPI section for executive reports
     */
    private generateKPISection;
    /**
     * Generate performance metrics section for technical reports
     */
    private generatePerformanceMetricsSection;
    /**
     * Generate bottleneck analysis section
     */
    private generateBottleneckAnalysisSection;
    /**
     * Generate trend analysis section
     */
    private generateTrendAnalysisSection;
    /**
     * Generate incident analysis section for incident reports
     */
    private generateIncidentAnalysisSection;
    /**
     * Generate report summary
     */
    private generateReportSummary;
    /**
     * Generate recommendations based on report analysis
     */
    private generateRecommendations;
    /**
     * Store report in history
     */
    private storeReport;
    /**
     * Get report by ID
     */
    getReport(reportId: string): PerformanceReport | null;
    /**
     * Get reports by type and date range
     */
    getReports(type?: string, startDate?: Date, endDate?: Date): PerformanceReport[];
    /**
     * Get latest report of specific type
     */
    getLatestReport(type: string): PerformanceReport | null;
    /**
     * Generate custom report on demand
     */
    generateCustomReport(config: {
        type: 'executive' | 'technical' | 'trend' | 'incident';
        period: {
            start: Date;
            end: Date;
        };
        sections?: string[];
        filters?: Record<string, any>;
    }): Promise<PerformanceReport>;
    /**
     * Export report in different formats
     */
    exportReport(reportId: string, format: 'json' | 'pdf' | 'csv' | 'html'): string;
    /**
     * Generate HTML report
     */
    private generateHTMLReport;
    /**
     * Generate CSV report
     */
    private generateCSVReport;
    /**
     * Get reporting statistics
     */
    getReportingStats(): any;
}
//# sourceMappingURL=PerformanceReporter.d.ts.map