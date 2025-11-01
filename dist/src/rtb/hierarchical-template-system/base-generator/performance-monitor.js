"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.performanceMonitor = exports.PerformanceMonitor = void 0;
class PerformanceMonitor {
    constructor() {
        this.stageMetrics = new Map();
        this.memoryProfiles = [];
        this.thresholds = [];
        this.isMonitoring = false;
        this.metrics = this.initializeMetrics();
        this.startMemory = process.memoryUsage().heapUsed;
        this.initializeThresholds();
    }
    /**
     * Start performance monitoring
     */
    startMonitoring() {
        this.isMonitoring = true;
        this.metrics.startTime = Date.now();
        this.metrics.memoryUsage.initial = process.memoryUsage().heapUsed;
        console.log('📊 Performance monitoring started');
        console.log(`🧠 Initial memory usage: ${(this.metrics.memoryUsage.initial / 1024 / 1024).toFixed(2)}MB`);
        // Start memory profiling
        this.startMemoryProfiling();
    }
    /**
     * Stop performance monitoring and return results
     */
    stopMonitoring() {
        if (!this.isMonitoring) {
            throw new Error('Performance monitoring not started');
        }
        this.isMonitoring = false;
        this.metrics.endTime = Date.now();
        this.metrics.duration = this.metrics.endTime - this.metrics.startTime;
        this.metrics.memoryUsage.final = process.memoryUsage().heapUsed;
        this.metrics.memoryUsage.delta = this.metrics.memoryUsage.final - this.metrics.memoryUsage.initial;
        this.metrics.memoryUsage.peak = Math.max(...this.memoryProfiles.map(p => p.heapUsed));
        // Stop memory profiling
        this.stopMemoryProfiling();
        // Convert stage metrics map to array
        this.metrics.processingStages = Array.from(this.stageMetrics.values());
        console.log('📊 Performance monitoring stopped');
        console.log(`⏱️  Total duration: ${(this.metrics.duration / 1000).toFixed(2)}s`);
        console.log(`🧠 Final memory usage: ${(this.metrics.memoryUsage.final / 1024 / 1024).toFixed(2)}MB`);
        console.log(`📈 Peak memory usage: ${(this.metrics.memoryUsage.peak / 1024 / 1024).toFixed(2)}MB`);
        console.log(`📊 Memory delta: ${(this.metrics.memoryUsage.delta / 1024 / 1024).toFixed(2)}MB`);
        return this.metrics;
    }
    /**
     * Start monitoring a processing stage
     */
    startStage(stageName) {
        if (!this.isMonitoring) {
            throw new Error('Performance monitoring not started');
        }
        const stageMetrics = {
            stageName,
            startTime: Date.now(),
            endTime: 0,
            duration: 0,
            memoryUsage: process.memoryUsage().heapUsed,
            processedItems: 0,
            itemsPerSecond: 0,
            successRate: 1.0,
            errors: [],
            warnings: []
        };
        this.stageMetrics.set(stageName, stageMetrics);
        console.log(`🔄 Starting stage: ${stageName}`);
    }
    /**
     * Stop monitoring a processing stage
     */
    endStage(stageName, processedItems = 0) {
        const stageMetrics = this.stageMetrics.get(stageName);
        if (!stageMetrics) {
            throw new Error(`Stage '${stageName}' not started`);
        }
        stageMetrics.endTime = Date.now();
        stageMetrics.duration = stageMetrics.endTime - stageMetrics.startTime;
        stageMetrics.processedItems = processedItems;
        stageMetrics.itemsPerSecond = processedItems > 0 ? (processedItems / (stageMetrics.duration / 1000)) : 0;
        stageMetrics.successRate = stageMetrics.errors.length === 0 ? 1.0 : (processedItems - stageMetrics.errors.length) / processedItems;
        console.log(`✅ Completed stage: ${stageName} (${(stageMetrics.duration / 1000).toFixed(2)}s, ${processedItems} items, ${stageMetrics.itemsPerSecond.toFixed(2)} items/s)`);
        // Check performance thresholds
        this.checkThresholds(stageName, stageMetrics);
    }
    /**
     * Record an error in performance monitoring
     */
    recordError(stage, errorType, message, severity = 'medium', context, recovered = false) {
        const error = {
            timestamp: Date.now(),
            stage,
            errorType,
            message,
            severity,
            context,
            recovered
        };
        this.metrics.errors.push(error);
        // Add to stage metrics if stage exists
        const stageMetrics = this.stageMetrics.get(stage);
        if (stageMetrics) {
            stageMetrics.errors.push(message);
        }
        console.error(`❌ Error in ${stage} [${errorType}]: ${message}`);
    }
    /**
     * Record a warning in performance monitoring
     */
    recordWarning(stage, message, suggestion, context) {
        const warning = {
            timestamp: Date.now(),
            stage,
            message,
            suggestion,
            context
        };
        this.metrics.warnings.push(warning);
        // Add to stage metrics if stage exists
        const stageMetrics = this.stageMetrics.get(stage);
        if (stageMetrics) {
            stageMetrics.warnings.push(message);
        }
        console.warn(`⚠️  Warning in ${stage}: ${message}`);
    }
    /**
     * Record a custom metric
     */
    recordCustomMetric(name, value) {
        this.metrics.customMetrics.set(name, value);
    }
    /**
     * Generate performance report
     */
    generateReport() {
        const report = [];
        report.push('# Performance Monitoring Report');
        report.push(`Generated: ${new Date(this.metrics.endTime).toISOString()}`);
        report.push('');
        // Executive Summary
        report.push('## Executive Summary');
        report.push(`- **Total Duration**: ${(this.metrics.duration / 1000).toFixed(2)} seconds`);
        report.push(`- **Peak Memory Usage**: ${(this.metrics.memoryUsage.peak / 1024 / 1024).toFixed(2)} MB`);
        report.push(`- **Memory Delta**: ${(this.metrics.memoryUsage.delta / 1024 / 1024).toFixed(2)} MB`);
        report.push(`- **Total Errors**: ${this.metrics.errors.length}`);
        report.push(`- **Total Warnings**: ${this.metrics.warnings.length}`);
        report.push(`- **Processing Stages**: ${this.metrics.processingStages.length}`);
        report.push('');
        // Stage Performance
        report.push('## Stage Performance');
        for (const stage of this.metrics.processingStages) {
            report.push(`### ${stage.stageName}`);
            report.push(`- **Duration**: ${(stage.duration / 1000).toFixed(2)} seconds`);
            report.push(`- **Items Processed**: ${stage.processedItems.toLocaleString()}`);
            report.push(`- **Throughput**: ${stage.itemsPerSecond.toFixed(2)} items/second`);
            report.push(`- **Success Rate**: ${(stage.successRate * 100).toFixed(1)}%`);
            report.push(`- **Memory Usage**: ${(stage.memoryUsage / 1024 / 1024).toFixed(2)} MB`);
            if (stage.errors.length > 0) {
                report.push(`- **Errors**: ${stage.errors.length}`);
                for (const error of stage.errors) {
                    report.push(`  - ${error}`);
                }
            }
            if (stage.warnings.length > 0) {
                report.push(`- **Warnings**: ${stage.warnings.length}`);
                for (const warning of stage.warnings) {
                    report.push(`  - ${warning}`);
                }
            }
            report.push('');
        }
        // Error Analysis
        if (this.metrics.errors.length > 0) {
            report.push('## Error Analysis');
            const errorsByType = new Map();
            const errorsBySeverity = new Map();
            for (const error of this.metrics.errors) {
                errorsByType.set(error.errorType, (errorsByType.get(error.errorType) || 0) + 1);
                errorsBySeverity.set(error.severity, (errorsBySeverity.get(error.severity) || 0) + 1);
            }
            report.push('### Errors by Type');
            for (const [type, count] of errorsByType) {
                report.push(`- **${type}**: ${count}`);
            }
            report.push('');
            report.push('### Errors by Severity');
            for (const [severity, count] of errorsBySeverity) {
                report.push(`- **${severity}**: ${count}`);
            }
            report.push('');
        }
        // Memory Analysis
        report.push('## Memory Analysis');
        report.push(`- **Initial Memory**: ${(this.metrics.memoryUsage.initial / 1024 / 1024).toFixed(2)} MB`);
        report.push(`- **Final Memory**: ${(this.metrics.memoryUsage.final / 1024 / 1024).toFixed(2)} MB`);
        report.push(`- **Peak Memory**: ${(this.metrics.memoryUsage.peak / 1024 / 1024).toFixed(2)} MB`);
        report.push(`- **Memory Growth**: ${(this.metrics.memoryUsage.delta / 1024 / 1024).toFixed(2)} MB`);
        report.push('');
        if (this.memoryProfiles.length > 1) {
            report.push('### Memory Trend');
            const startMem = this.memoryProfiles[0].heapUsed;
            const endMem = this.memoryProfiles[this.memoryProfiles.length - 1].heapUsed;
            const trend = endMem > startMem ? 'Increasing' : endMem < startMem ? 'Decreasing' : 'Stable';
            report.push(`- **Memory Trend**: ${trend}`);
            report.push(`- **Average Memory**: ${(this.memoryProfiles.reduce((sum, p) => sum + p.heapUsed, 0) / this.memoryProfiles.length / 1024 / 1024).toFixed(2)} MB`);
            report.push('');
        }
        // Optimization Suggestions
        const suggestions = this.generateOptimizationSuggestions();
        if (suggestions.length > 0) {
            report.push('## Optimization Suggestions');
            for (const suggestion of suggestions) {
                report.push(`### ${suggestion.type.toUpperCase()} Optimization (Priority: ${suggestion.priority})`);
                report.push(`**Description**: ${suggestion.description}`);
                report.push(`**Expected Improvement**: ${suggestion.expectedImprovement}`);
                report.push(`**Implementation**: ${suggestion.implementation}`);
                report.push('');
            }
        }
        // Custom Metrics
        if (this.metrics.customMetrics.size > 0) {
            report.push('## Custom Metrics');
            for (const [name, value] of this.metrics.customMetrics) {
                report.push(`- **${name}**: ${JSON.stringify(value)}`);
            }
            report.push('');
        }
        return report.join('\n');
    }
    /**
     * Generate JSON export of metrics
     */
    generateJSON() {
        return JSON.stringify(this.metrics, null, 2);
    }
    /**
     * Generate optimization suggestions
     */
    generateOptimizationSuggestions() {
        const suggestions = [];
        // Memory optimization suggestions
        const memoryGrowthMB = this.metrics.memoryUsage.delta / 1024 / 1024;
        if (memoryGrowthMB > 500) {
            suggestions.push({
                type: 'memory',
                description: 'High memory growth detected during processing',
                expectedImprovement: 'Reduce memory usage by 30-50%',
                implementation: 'Implement streaming processing for large files, increase batch size for garbage collection',
                priority: 'high'
            });
        }
        // CPU optimization suggestions
        for (const stage of this.metrics.processingStages) {
            if (stage.itemsPerSecond < 100 && stage.processedItems > 1000) {
                suggestions.push({
                    type: 'cpu',
                    description: `Low throughput in ${stage.stageName} stage`,
                    expectedImprovement: 'Improve processing speed by 2-3x',
                    implementation: 'Optimize algorithms, use parallel processing, consider worker threads',
                    priority: 'medium'
                });
            }
        }
        // I/O optimization suggestions
        const slowStages = this.metrics.processingStages.filter(s => s.duration > 30000); // > 30 seconds
        if (slowStages.length > 0) {
            suggestions.push({
                type: 'io',
                description: 'Slow processing stages detected',
                expectedImprovement: 'Reduce processing time by 40-60%',
                implementation: 'Use streaming I/O, implement caching, optimize file reading/writing',
                priority: 'high'
            });
        }
        // Error rate optimization
        const totalErrors = this.metrics.errors.length;
        const totalItems = this.metrics.processingStages.reduce((sum, s) => sum + s.processedItems, 0);
        const errorRate = totalItems > 0 ? (totalErrors / totalItems) * 100 : 0;
        if (errorRate > 5) {
            suggestions.push({
                type: 'algorithm',
                description: 'High error rate during processing',
                expectedImprovement: 'Reduce error rate by 80-90%',
                implementation: 'Improve input validation, add better error handling, implement retry mechanisms',
                priority: 'critical'
            });
        }
        return suggestions;
    }
    /**
     * Get real-time status
     */
    getStatus() {
        const currentStage = Array.from(this.stageMetrics.values()).find(s => s.endTime === 0);
        return {
            isMonitoring: this.isMonitoring,
            currentStage: currentStage?.stageName,
            elapsedTime: this.isMonitoring ? Date.now() - this.metrics.startTime : this.metrics.duration,
            currentMemory: process.memoryUsage().heapUsed,
            errorCount: this.metrics.errors.length,
            warningCount: this.metrics.warnings.length
        };
    }
    /**
     * Initialize metrics object
     */
    initializeMetrics() {
        return {
            startTime: 0,
            endTime: 0,
            duration: 0,
            memoryUsage: {
                peak: 0,
                initial: 0,
                final: 0,
                delta: 0
            },
            processingStages: [],
            errors: [],
            warnings: [],
            customMetrics: new Map()
        };
    }
    /**
     * Initialize performance thresholds
     */
    initializeThresholds() {
        this.thresholds = [
            {
                metric: 'memory_growth',
                threshold: 1024,
                operator: '>',
                severity: 'warning',
                action: 'log'
            },
            {
                metric: 'memory_growth',
                threshold: 2048,
                operator: '>',
                severity: 'error',
                action: 'alert'
            },
            {
                metric: 'error_rate',
                threshold: 10,
                operator: '>',
                severity: 'warning',
                action: 'log'
            },
            {
                metric: 'error_rate',
                threshold: 25,
                operator: '>',
                severity: 'error',
                action: 'stop'
            }
        ];
    }
    /**
     * Start memory profiling
     */
    startMemoryProfiling() {
        // Profile memory every 5 seconds
        const profileInterval = setInterval(() => {
            if (!this.isMonitoring) {
                clearInterval(profileInterval);
                return;
            }
            const memUsage = process.memoryUsage();
            const profile = {
                timestamp: Date.now(),
                heapUsed: memUsage.heapUsed,
                heapTotal: memUsage.heapTotal,
                external: memUsage.external,
                rss: memUsage.rss,
                arrayBuffers: memUsage.arrayBuffers || 0
            };
            this.memoryProfiles.push(profile);
            // Keep only last 100 profiles
            if (this.memoryProfiles.length > 100) {
                this.memoryProfiles = this.memoryProfiles.slice(-100);
            }
        }, 5000);
    }
    /**
     * Stop memory profiling
     */
    stopMemoryProfiling() {
        // Profiling stops automatically when isMonitoring is set to false
    }
    /**
     * Check performance thresholds
     */
    checkThresholds(stageName, stageMetrics) {
        for (const threshold of this.thresholds) {
            let value;
            let meetsThreshold = false;
            switch (threshold.metric) {
                case 'memory_growth':
                    value = (process.memoryUsage().heapUsed - this.startMemory) / 1024 / 1024; // MB
                    meetsThreshold = this.evaluateThreshold(value, threshold);
                    break;
                case 'error_rate':
                    value = stageMetrics.processedItems > 0 ? (stageMetrics.errors.length / stageMetrics.processedItems) * 100 : 0;
                    meetsThreshold = this.evaluateThreshold(value, threshold);
                    break;
                default:
                    continue;
            }
            if (meetsThreshold) {
                const message = `Performance threshold exceeded in ${stageName}: ${threshold.metric} ${threshold.operator} ${threshold.threshold} (actual: ${value.toFixed(2)})`;
                if (threshold.severity === 'error') {
                    this.recordError(stageName, 'threshold_exceeded', message, 'high');
                }
                else {
                    this.recordWarning(stageName, message, `Consider performance optimization`);
                }
                if (threshold.action === 'stop') {
                    throw new Error(`Performance threshold exceeded: ${message}`);
                }
            }
        }
    }
    /**
     * Evaluate threshold condition
     */
    evaluateThreshold(value, threshold) {
        switch (threshold.operator) {
            case '>': return value > threshold.threshold;
            case '<': return value < threshold.threshold;
            case '>=': return value >= threshold.threshold;
            case '<=': return value <= threshold.threshold;
            case '=': return value === threshold.threshold;
            default: return false;
        }
    }
}
exports.PerformanceMonitor = PerformanceMonitor;
/**
 * Global performance monitor instance
 */
exports.performanceMonitor = new PerformanceMonitor();
//# sourceMappingURL=performance-monitor.js.map