"use strict";
/**
 * Performance Monitor Utility
 *
 * Production-ready performance monitoring with metrics collection,
  real-time analysis, and optimization recommendations for the export system.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceMonitor = void 0;
class PerformanceMonitor {
    constructor(enabled = true) {
        this.metrics = [];
        this.activeExports = new Map();
        this.enabled = enabled;
        this.statistics = {
            totalExports: 0,
            averageProcessingTime: 0,
            peakProcessingTime: 0,
            minProcessingTime: Infinity,
            averageMemoryUsage: 0,
            peakMemoryUsage: 0,
            cacheHitRate: 0,
            throughput: 0,
            errorRate: 0,
            performanceDistribution: {
                p50: 0,
                p75: 0,
                p90: 0,
                p95: 0,
                p99: 0
            }
        };
    }
    async initialize() {
        if (!this.enabled)
            return;
        console.log('📊 Initializing Performance Monitor...');
        // Start periodic statistics update
        this.updateInterval = setInterval(() => {
            this.updateStatistics();
        }, 5000); // Update every 5 seconds
        console.log('✅ Performance Monitor initialized');
    }
    startExport(templateId) {
        if (!this.enabled) {
            return this.createEmptyMetrics(templateId);
        }
        const startTime = Date.now();
        const startMemory = process.memoryUsage().heapUsed;
        const metrics = {
            templateId,
            startTime,
            memoryUsage: {
                start: startMemory,
                peak: startMemory,
                end: startMemory
            },
            cacheHits: 0,
            cacheMisses: 0
        };
        this.activeExports.set(templateId, metrics);
        return metrics;
    }
    recordValidation(templateId, validationTime) {
        if (!this.enabled)
            return;
        const metrics = this.activeExports.get(templateId);
        if (metrics) {
            metrics.validationTime = validationTime;
            this.updatePeakMemory(metrics);
        }
    }
    recordSchemaGeneration(templateId, schemaTime) {
        if (!this.enabled)
            return;
        const metrics = this.activeExports.get(templateId);
        if (metrics) {
            metrics.schemaGenerationTime = schemaTime;
            this.updatePeakMemory(metrics);
        }
    }
    recordMetadataGeneration(templateId, metadataTime) {
        if (!this.enabled)
            return;
        const metrics = this.activeExports.get(templateId);
        if (metrics) {
            metrics.metadataGenerationTime = metadataTime;
            this.updatePeakMemory(metrics);
        }
    }
    recordFileWrite(templateId, fileWriteTime) {
        if (!this.enabled)
            return;
        const metrics = this.activeExports.get(templateId);
        if (metrics) {
            metrics.fileWriteTime = fileWriteTime;
            this.updatePeakMemory(metrics);
        }
    }
    recordCacheHit(templateId) {
        if (!this.enabled)
            return;
        const metrics = this.activeExports.get(templateId);
        if (metrics) {
            metrics.cacheHits++;
        }
    }
    recordCacheMiss(templateId) {
        if (!this.enabled)
            return;
        const metrics = this.activeExports.get(templateId);
        if (metrics) {
            metrics.cacheMisses++;
        }
    }
    completeExport(templateId) {
        if (!this.enabled) {
            return this.createEmptyMetrics(templateId);
        }
        const metrics = this.activeExports.get(templateId);
        if (!metrics) {
            return this.createEmptyMetrics(templateId);
        }
        const endTime = Date.now();
        metrics.endTime = endTime;
        metrics.totalProcessingTime = endTime - metrics.startTime;
        metrics.memoryUsage.end = process.memoryUsage().heapUsed;
        // Move to completed metrics
        this.metrics.push(metrics);
        this.activeExports.delete(templateId);
        // Keep only last 1000 metrics
        if (this.metrics.length > 1000) {
            this.metrics.shift();
        }
        // Update statistics
        this.updateStatistics();
        return metrics;
    }
    getStatistics() {
        return { ...this.statistics };
    }
    getActiveExports() {
        return this.activeExports.size;
    }
    getMetrics(templateId) {
        if (templateId) {
            return this.metrics.filter(m => m.templateId === templateId);
        }
        return [...this.metrics];
    }
    reset() {
        this.metrics = [];
        this.activeExports.clear();
        this.statistics = {
            totalExports: 0,
            averageProcessingTime: 0,
            peakProcessingTime: 0,
            minProcessingTime: Infinity,
            averageMemoryUsage: 0,
            peakMemoryUsage: 0,
            cacheHitRate: 0,
            throughput: 0,
            errorRate: 0,
            performanceDistribution: {
                p50: 0,
                p75: 0,
                p90: 0,
                p95: 0,
                p99: 0
            }
        };
    }
    async shutdown() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        this.reset();
        console.log('🛑 Performance Monitor shutdown complete');
    }
    createEmptyMetrics(templateId) {
        return {
            templateId,
            startTime: Date.now(),
            memoryUsage: {
                start: 0,
                peak: 0,
                end: 0
            },
            cacheHits: 0,
            cacheMisses: 0
        };
    }
    updatePeakMemory(metrics) {
        const currentMemory = process.memoryUsage().heapUsed;
        if (currentMemory > metrics.memoryUsage.peak) {
            metrics.memoryUsage.peak = currentMemory;
        }
    }
    updateStatistics() {
        if (this.metrics.length === 0)
            return;
        const processingTimes = this.metrics
            .filter(m => m.totalProcessingTime !== undefined)
            .map(m => m.totalProcessingTime);
        const memoryUsages = this.metrics.map(m => m.memoryUsage.peak);
        const totalCacheHits = this.metrics.reduce((sum, m) => sum + m.cacheHits, 0);
        const totalCacheRequests = this.metrics.reduce((sum, m) => sum + m.cacheHits + m.cacheMisses, 0);
        this.statistics.totalExports = this.metrics.length;
        this.statistics.averageProcessingTime = this.average(processingTimes);
        this.statistics.peakProcessingTime = Math.max(...processingTimes);
        this.statistics.minProcessingTime = Math.min(...processingTimes);
        this.statistics.averageMemoryUsage = this.average(memoryUsages);
        this.statistics.peakMemoryUsage = Math.max(...memoryUsages);
        this.statistics.cacheHitRate = totalCacheRequests > 0 ? totalCacheHits / totalCacheRequests : 0;
        this.statistics.throughput = this.calculateThroughput();
        this.statistics.performanceDistribution = this.calculateDistribution(processingTimes);
    }
    average(numbers) {
        if (numbers.length === 0)
            return 0;
        return numbers.reduce((sum, n) => sum + n, 0) / numbers.length;
    }
    calculateThroughput() {
        const recentMetrics = this.metrics.filter(m => m.endTime && (Date.now() - m.endTime) < 60000 // Last minute
        );
        return recentMetrics.length / 60; // Exports per second
    }
    calculateDistribution(numbers) {
        if (numbers.length === 0) {
            return { p50: 0, p75: 0, p90: 0, p95: 0, p99: 0 };
        }
        const sorted = [...numbers].sort((a, b) => a - b);
        return {
            p50: this.percentile(sorted, 50),
            p75: this.percentile(sorted, 75),
            p90: this.percentile(sorted, 90),
            p95: this.percentile(sorted, 95),
            p99: this.percentile(sorted, 99)
        };
    }
    percentile(sortedArray, p) {
        if (sortedArray.length === 0)
            return 0;
        const index = Math.ceil((p / 100) * sortedArray.length) - 1;
        return sortedArray[Math.max(0, index)];
    }
}
exports.PerformanceMonitor = PerformanceMonitor;
//# sourceMappingURL=performance-monitor.js.map