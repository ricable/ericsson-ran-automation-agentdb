/**
 * Performance Thresholds and Targets
 *
 * Defines critical, warning, and optimal thresholds for all performance metrics
 */
import { MLPerformanceMetrics, PerformanceTargets } from './MLPerformanceMetrics';
export declare class PerformanceThresholds {
    static readonly PERFORMANCE_TARGETS: PerformanceTargets;
    static readonly CRITICAL_THRESHOLDS: Partial<MLPerformanceMetrics>;
    static readonly WARNING_THRESHOLDS: Partial<MLPerformanceMetrics>;
    static readonly OPTIMAL_THRESHOLDS: Partial<MLPerformanceMetrics>;
    static evaluateMetric(metricName: string, currentValue: number, category: keyof MLPerformanceMetrics): 'critical' | 'warning' | 'optimal' | 'normal';
    static getThresholdValue(metricName: string, severity: 'critical' | 'warning' | 'optimal', category: keyof MLPerformanceMetrics): number | undefined;
    static calculatePerformanceScore(metrics: MLPerformanceMetrics): number;
    static getRecommendations(metricName: string, currentValue: number, severity: 'critical' | 'warning', category: keyof MLPerformanceMetrics): string[];
}
//# sourceMappingURL=PerformanceThresholds.d.ts.map