"use strict";
/**
 * Application Performance Monitoring (APM) System
 * Response times, throughput, error rates, and user experience metrics
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.APMMonitor = void 0;
const events_1 = require("events");
const logger_1 = require("../../utils/logger");
const metrics_collector_1 = require("../deployment/metrics-collector");
const alert_manager_1 = require("../deployment/alert-manager");
const dashboard_manager_1 = require("../deployment/dashboard-manager");
class APMMonitor extends events_1.EventEmitter {
    constructor(thresholds) {
        super();
        this.activeTransactions = new Map();
        this.activeTraces = new Map();
        this.historicalMetrics = [];
        this.serviceDependencies = new Map();
        this.monitoringInterval = null;
        this.logger = (0, logger_1.createLogger)('APMMonitor');
        this.metricsCollector = new metrics_collector_1.MetricsCollector('apm');
        this.alertManager = new alert_manager_1.AlertManager();
        this.dashboardManager = new dashboard_manager_1.DashboardManager();
        this.thresholds = {
            responseTime: { warning: 500, critical: 2000 },
            errorRate: { warning: 5, critical: 10 },
            throughput: { warning: 100, critical: 50 },
            apdex: { warning: 0.7, critical: 0.5 },
            ...thresholds
        };
        this.initializeMonitoring();
    }
    initializeMonitoring() {
        // Setup monitoring intervals
        setInterval(() => this.collectMetrics(), 30000); // Every 30 seconds
        setInterval(() => this.analyzePerformance(), 60000); // Every minute
        setInterval(() => this.checkDependencies(), 45000); // Every 45 seconds
        setInterval(() => this.generateAPMReport(), 300000); // Every 5 minutes
        this.logger.info('APM monitoring initialized');
        this.emit('monitoring:initialized');
    }
    /**
     * Start a new transaction
     */
    startTransaction(transactionData) {
        const transactionId = this.generateId();
        const traceId = transactionData.traceId || this.generateId();
        const transaction = {
            id: transactionId,
            name: transactionData.name,
            type: transactionData.type,
            startTime: new Date(),
            status: 'pending',
            tags: transactionData.tags || {},
            metrics: {
                cpu: 0,
                memory: 0,
                databaseCalls: 0,
                cacheHits: 0,
                cacheMisses: 0
            }
        };
        this.activeTransactions.set(transactionId, transaction);
        // Create or update trace
        if (!this.activeTraces.has(traceId)) {
            const trace = {
                traceId,
                transactions: [],
                rootTransaction: transactionId,
                startTime: new Date(),
                status: 'pending',
                service: 'ran-automation',
                version: '1.0.0'
            };
            this.activeTraces.set(traceId, trace);
        }
        const trace = this.activeTraces.get(traceId);
        trace.transactions.push(transaction);
        this.emit('transaction:started', { transactionId, traceId, transaction });
        return transactionId;
    }
    /**
     * End a transaction
     */
    async endTransaction(transactionId, error) {
        const transaction = this.activeTransactions.get(transactionId);
        if (!transaction) {
            this.logger.warn(`Transaction ${transactionId} not found`);
            return;
        }
        transaction.endTime = new Date();
        transaction.duration = transaction.endTime.getTime() - transaction.startTime.getTime();
        transaction.status = error ? 'error' : 'success';
        transaction.error = error;
        // Update trace status
        const trace = this.activeTraces.get(this.findTraceId(transactionId));
        if (trace) {
            if (error) {
                trace.status = 'error';
            }
            if (trace.transactions.every(t => t.status !== 'pending')) {
                trace.endTime = new Date();
                trace.totalDuration = trace.endTime.getTime() - trace.startTime.getTime();
            }
        }
        // Store transaction metrics
        await this.storeTransactionMetrics(transaction);
        // Remove from active transactions
        this.activeTransactions.delete(transactionId);
        this.emit('transaction:completed', { transactionId, transaction });
        // Check for performance alerts
        await this.checkTransactionAlerts(transaction);
    }
    /**
     * Add custom metrics to transaction
     */
    addTransactionMetrics(transactionId, metrics) {
        const transaction = this.activeTransactions.get(transactionId);
        if (!transaction)
            return;
        Object.assign(transaction.metrics, metrics);
    }
    /**
     * Add tags to transaction
     */
    addTransactionTags(transactionId, tags) {
        const transaction = this.activeTransactions.get(transactionId);
        if (!transaction)
            return;
        Object.assign(transaction.tags, tags);
    }
    /**
     * Find trace ID for transaction
     */
    findTraceId(transactionId) {
        for (const [traceId, trace] of this.activeTraces.entries()) {
            if (trace.transactions.some(t => t.id === transactionId)) {
                return traceId;
            }
        }
        return '';
    }
    /**
     * Store transaction metrics
     */
    async storeTransactionMetrics(transaction) {
        try {
            if (!transaction.duration)
                return;
            await this.metricsCollector.recordMetric('transaction_duration', transaction.duration, {
                name: transaction.name,
                type: transaction.type,
                status: transaction.status
            });
            await this.metricsCollector.recordMetric('transaction_status', transaction.status === 'success' ? 1 : 0, {
                name: transaction.name,
                type: transaction.type
            });
            // Store custom metrics
            for (const [key, value] of Object.entries(transaction.metrics)) {
                await this.metricsCollector.recordMetric(`transaction_${key}`, value, {
                    transactionName: transaction.name
                });
            }
        }
        catch (error) {
            this.logger.error('Failed to store transaction metrics:', error);
        }
    }
    /**
     * Check transaction performance alerts
     */
    async checkTransactionAlerts(transaction) {
        if (!transaction.duration)
            return;
        // Response time alerts
        if (transaction.duration > this.thresholds.responseTime.critical) {
            await this.alertManager.sendAlert({
                level: 'critical',
                title: 'Critical Response Time',
                message: `Transaction ${transaction.name} took ${transaction.duration}ms`,
                transactionId: transaction.id,
                timestamp: new Date()
            });
        }
        else if (transaction.duration > this.thresholds.responseTime.warning) {
            await this.alertManager.sendAlert({
                level: 'warning',
                title: 'Slow Response Time',
                message: `Transaction ${transaction.name} took ${transaction.duration}ms`,
                transactionId: transaction.id,
                timestamp: new Date()
            });
        }
        // Error alerts
        if (transaction.status === 'error') {
            await this.alertManager.sendAlert({
                level: 'error',
                title: 'Transaction Error',
                message: `Transaction ${transaction.name} failed: ${transaction.error}`,
                transactionId: transaction.id,
                timestamp: new Date()
            });
        }
    }
    /**
     * Collect application metrics
     */
    async collectMetrics() {
        try {
            const metrics = await this.generateApplicationMetrics();
            this.historicalMetrics.push(metrics);
            // Keep only last 1000 metrics (about 8.3 hours at 30-second intervals)
            if (this.historicalMetrics.length > 1000) {
                this.historicalMetrics.shift();
            }
            // Store metrics
            await this.storeApplicationMetrics(metrics);
            this.emit('metrics:collected', metrics);
        }
        catch (error) {
            this.logger.error('Failed to collect APM metrics:', error);
        }
    }
    /**
     * Generate application metrics
     */
    async generateApplicationMetrics() {
        const completedTransactions = Array.from(this.activeTraces.values())
            .filter(trace => trace.status !== 'pending')
            .flatMap(trace => trace.transactions);
        const successfulTransactions = completedTransactions.filter(t => t.status === 'success');
        const failedTransactions = completedTransactions.filter(t => t.status === 'error');
        const durations = completedTransactions.filter(t => t.duration).map(t => t.duration);
        const calculatePercentile = (values, percentile) => {
            if (values.length === 0)
                return 0;
            const sorted = [...values].sort((a, b) => a - b);
            const index = Math.ceil((percentile / 100) * sorted.length) - 1;
            return sorted[Math.max(0, index)];
        };
        return {
            timestamp: new Date(),
            service: 'ran-automation',
            version: '1.0.0',
            environment: process.env.NODE_ENV || 'development',
            throughput: {
                requests: completedTransactions.length,
                errors: failedTransactions.length,
                successRate: completedTransactions.length > 0 ? (successfulTransactions.length / completedTransactions.length) * 100 : 100,
                errorRate: completedTransactions.length > 0 ? (failedTransactions.length / completedTransactions.length) * 100 : 0
            },
            responseTimes: {
                avg: durations.length > 0 ? durations.reduce((sum, d) => sum + d, 0) / durations.length : 0,
                p50: calculatePercentile(durations, 50),
                p95: calculatePercentile(durations, 95),
                p99: calculatePercentile(durations, 99),
                max: durations.length > 0 ? Math.max(...durations) : 0,
                min: durations.length > 0 ? Math.min(...durations) : 0
            },
            resources: {
                cpu: 0,
                memory: 0,
                activeConnections: this.activeTransactions.size,
                databaseConnections: 0 // Would collect from database connection pool
            },
            errors: {
                count: failedTransactions.length,
                rate: completedTransactions.length > 0 ? (failedTransactions.length / completedTransactions.length) * 100 : 0,
                types: this.categorizeErrors(failedTransactions),
                messages: failedTransactions.slice(0, 10).map(t => t.error || '').filter(Boolean)
            },
            userExperience: {
                apdexScore: this.calculateApdexScore(durations),
                satisfactionScore: this.calculateSatisfactionScore(durations),
                bounceRate: this.calculateBounceRate(),
                engagementTime: this.calculateEngagementTime()
            }
        };
    }
    /**
     * Categorize errors
     */
    categorizeErrors(failedTransactions) {
        return failedTransactions.reduce((acc, transaction) => {
            const errorType = this.categorizeError(transaction.error || '');
            acc[errorType] = (acc[errorType] || 0) + 1;
            return acc;
        }, {});
    }
    /**
     * Categorize individual error
     */
    categorizeError(error) {
        if (!error)
            return 'unknown';
        if (error.includes('timeout'))
            return 'timeout';
        if (error.includes('connection'))
            return 'connection';
        if (error.includes('database') || error.includes('sql'))
            return 'database';
        if (error.includes('auth') || error.includes('unauthorized'))
            return 'authentication';
        if (error.includes('validation') || error.includes('invalid'))
            return 'validation';
        return 'application';
    }
    /**
     * Calculate Apdex score (Application Performance Index)
     */
    calculateApdexScore(durations) {
        if (durations.length === 0)
            return 1;
        const satisfiedThreshold = this.thresholds.responseTime.warning;
        const toleratedThreshold = this.thresholds.responseTime.critical;
        const satisfied = durations.filter(d => d <= satisfiedThreshold).length;
        const tolerated = durations.filter(d => d > satisfiedThreshold && d <= toleratedThreshold).length;
        const frustrated = durations.filter(d => d > toleratedThreshold).length;
        return (satisfied + (tolerated / 2)) / durations.length;
    }
    /**
     * Calculate satisfaction score
     */
    calculateSatisfactionScore(durations) {
        // Simplified satisfaction calculation based on response times
        const apdex = this.calculateApdexScore(durations);
        return Math.round(apdex * 100);
    }
    /**
     * Calculate bounce rate
     */
    calculateBounceRate() {
        // Simplified bounce rate calculation
        // In a real implementation, this would track user sessions
        return 0;
    }
    /**
     * Calculate engagement time
     */
    calculateEngagementTime() {
        // Simplified engagement time calculation
        // In a real implementation, this would track user interaction time
        return 0;
    }
    /**
     * Store application metrics
     */
    async storeApplicationMetrics(metrics) {
        try {
            await this.metricsCollector.recordMetric('throughput_requests', metrics.throughput.requests);
            await this.metricsCollector.recordMetric('throughput_errors', metrics.throughput.errors);
            await this.metricsCollector.recordMetric('throughput_success_rate', metrics.throughput.successRate);
            await this.metricsCollector.recordMetric('throughput_error_rate', metrics.throughput.errorRate);
            await this.metricsCollector.recordMetric('response_time_avg', metrics.responseTimes.avg);
            await this.metricsCollector.recordMetric('response_time_p95', metrics.responseTimes.p95);
            await this.metricsCollector.recordMetric('response_time_p99', metrics.responseTimes.p99);
            await this.metricsCollector.recordMetric('apdex_score', metrics.userExperience.apdexScore);
            await this.metricsCollector.recordMetric('satisfaction_score', metrics.userExperience.satisfactionScore);
        }
        catch (error) {
            this.logger.error('Failed to store application metrics:', error);
        }
    }
    /**
     * Analyze performance patterns
     */
    async analyzePerformance() {
        if (this.historicalMetrics.length < 10)
            return;
        try {
            const recentMetrics = this.historicalMetrics.slice(-20); // Last 10 minutes
            // Analyze response time trends
            const responseTimeTrend = this.analyzeTrend(recentMetrics.map(m => m.responseTimes.avg));
            // Analyze error rate trends
            const errorRateTrend = this.analyzeTrend(recentMetrics.map(m => m.throughput.errorRate));
            // Detect performance degradation
            await this.detectPerformanceDegradation(responseTimeTrend, errorRateTrend);
        }
        catch (error) {
            this.logger.error('Failed to analyze performance:', error);
        }
    }
    /**
     * Analyze trend from array of values
     */
    analyzeTrend(values) {
        if (values.length < 2)
            return { slope: 0, direction: 'stable' };
        const n = values.length;
        const sumX = (n * (n - 1)) / 2;
        const sumY = values.reduce((sum, val) => sum + val, 0);
        const sumXY = values.reduce((sum, val, index) => sum + val * index, 0);
        const sumX2 = (n * (n - 1) * (2 * n - 1)) / 6;
        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const direction = Math.abs(slope) < 0.1 ? 'stable' : slope > 0 ? 'increasing' : 'decreasing';
        return { slope, direction };
    }
    /**
     * Detect performance degradation
     */
    async detectPerformanceDegradation(responseTimeTrend, errorRateTrend) {
        // Response time degradation
        if (responseTimeTrend.direction === 'increasing' && responseTimeTrend.slope > 10) {
            await this.alertManager.sendAlert({
                level: 'warning',
                title: 'Performance Degradation Detected',
                message: `Response times are increasing (slope: ${responseTimeTrend.slope.toFixed(2)})`,
                timestamp: new Date()
            });
        }
        // Error rate increase
        if (errorRateTrend.direction === 'increasing' && errorRateTrend.slope > 1) {
            await this.alertManager.sendAlert({
                level: 'error',
                title: 'Error Rate Increasing',
                message: `Error rate is increasing (slope: ${errorRateTrend.slope.toFixed(2)})`,
                timestamp: new Date()
            });
        }
        // Check current metrics against thresholds
        const currentMetrics = this.historicalMetrics[this.historicalMetrics.length - 1];
        if (currentMetrics) {
            await this.checkCurrentMetricsThresholds(currentMetrics);
        }
    }
    /**
     * Check current metrics against thresholds
     */
    async checkCurrentMetricsThresholds(metrics) {
        // Response time thresholds
        if (metrics.responseTimes.avg > this.thresholds.responseTime.critical) {
            await this.alertManager.sendAlert({
                level: 'critical',
                title: 'Critical Response Time',
                message: `Average response time: ${metrics.responseTimes.avg.toFixed(2)}ms`,
                timestamp: new Date()
            });
        }
        else if (metrics.responseTimes.avg > this.thresholds.responseTime.warning) {
            await this.alertManager.sendAlert({
                level: 'warning',
                title: 'High Response Time',
                message: `Average response time: ${metrics.responseTimes.avg.toFixed(2)}ms`,
                timestamp: new Date()
            });
        }
        // Error rate thresholds
        if (metrics.throughput.errorRate > this.thresholds.errorRate.critical) {
            await this.alertManager.sendAlert({
                level: 'critical',
                title: 'Critical Error Rate',
                message: `Error rate: ${metrics.throughput.errorRate.toFixed(2)}%`,
                timestamp: new Date()
            });
        }
        else if (metrics.throughput.errorRate > this.thresholds.errorRate.warning) {
            await this.alertManager.sendAlert({
                level: 'warning',
                title: 'High Error Rate',
                message: `Error rate: ${metrics.throughput.errorRate.toFixed(2)}%`,
                timestamp: new Date()
            });
        }
        // Apdex score thresholds
        if (metrics.userExperience.apdexScore < this.thresholds.apdex.critical) {
            await this.alertManager.sendAlert({
                level: 'critical',
                title: 'Critical User Experience',
                message: `Apdex score: ${metrics.userExperience.apdexScore.toFixed(2)}`,
                timestamp: new Date()
            });
        }
        else if (metrics.userExperience.apdexScore < this.thresholds.apdex.warning) {
            await this.alertManager.sendAlert({
                level: 'warning',
                title: 'Poor User Experience',
                message: `Apdex score: ${metrics.userExperience.apdexScore.toFixed(2)}`,
                timestamp: new Date()
            });
        }
    }
    /**
     * Check service dependencies
     */
    async checkDependencies() {
        for (const [name, dependency] of this.serviceDependencies.entries()) {
            try {
                const health = await this.checkDependencyHealth(dependency);
                // Update dependency status
                dependency.status = health.status;
                dependency.responseTime = health.responseTime;
                dependency.errorRate = health.errorRate;
                dependency.lastCheck = new Date();
                dependency.slaCompliance = health.slaCompliance;
                // Check for dependency alerts
                if (dependency.status === 'down') {
                    await this.alertManager.sendAlert({
                        level: 'critical',
                        title: `Service Dependency Down: ${name}`,
                        message: `Dependency ${name} (${dependency.type}) is not responding`,
                        dependency: name,
                        timestamp: new Date()
                    });
                }
                else if (dependency.status === 'degraded') {
                    await this.alertManager.sendAlert({
                        level: 'warning',
                        title: `Service Dependency Degraded: ${name}`,
                        message: `Dependency ${name} (${dependency.type}) is experiencing issues`,
                        dependency: name,
                        timestamp: new Date()
                    });
                }
            }
            catch (error) {
                this.logger.error(`Failed to check dependency ${name}:`, error);
            }
        }
    }
    /**
     * Check individual dependency health
     */
    async checkDependencyHealth(dependency) {
        try {
            const startTime = Date.now();
            // Perform health check based on dependency type
            let isHealthy = false;
            switch (dependency.type) {
                case 'database':
                    isHealthy = await this.checkDatabaseHealth(dependency);
                    break;
                case 'cache':
                    isHealthy = await this.checkCacheHealth(dependency);
                    break;
                case 'api':
                    isHealthy = await this.checkAPIHealth(dependency);
                    break;
                default:
                    isHealthy = await this.checkGenericHealth(dependency);
            }
            const responseTime = Date.now() - startTime;
            return {
                status: isHealthy ? (responseTime < 1000 ? 'healthy' : 'degraded') : 'down',
                responseTime,
                errorRate: isHealthy ? 0 : 100,
                slaCompliance: isHealthy ? 100 : 0
            };
        }
        catch (error) {
            return {
                status: 'down',
                responseTime: 0,
                errorRate: 100,
                slaCompliance: 0
            };
        }
    }
    /**
     * Check database health
     */
    async checkDatabaseHealth(dependency) {
        // Simplified database health check
        // In production, would perform actual database query
        return true;
    }
    /**
     * Check cache health
     */
    async checkCacheHealth(dependency) {
        // Simplified cache health check
        // In production, would perform actual cache operation
        return true;
    }
    /**
     * Check API health
     */
    async checkAPIHealth(dependency) {
        try {
            const response = await fetch(dependency.endpoint, {
                method: 'GET',
                timeout: 5000,
                headers: { 'User-Agent': 'APM-Monitor/1.0' }
            });
            return response.ok;
        }
        catch {
            return false;
        }
    }
    /**
     * Check generic health
     */
    async checkGenericHealth(dependency) {
        try {
            const response = await fetch(dependency.endpoint, {
                method: 'GET',
                timeout: 5000
            });
            return response.ok;
        }
        catch {
            return false;
        }
    }
    /**
     * Generate APM report
     */
    async generateAPMReport() {
        try {
            const currentMetrics = this.historicalMetrics[this.historicalMetrics.length - 1];
            if (!currentMetrics)
                return;
            const report = {
                timestamp: new Date(),
                summary: {
                    service: currentMetrics.service,
                    version: currentMetrics.version,
                    environment: currentMetrics.environment,
                    activeTransactions: this.activeTransactions.size,
                    activeTraces: this.activeTraces.size
                },
                performance: {
                    throughput: currentMetrics.throughput,
                    responseTimes: currentMetrics.responseTimes,
                    userExperience: currentMetrics.userExperience
                },
                errors: currentMetrics.errors,
                dependencies: Array.from(this.serviceDependencies.values()),
                trends: await this.analyzeLongTermTrends(),
                recommendations: await this.generatePerformanceRecommendations(currentMetrics)
            };
            await this.dashboardManager.updateDashboard('apm', report);
            this.emit('apm:report_generated', report);
        }
        catch (error) {
            this.logger.error('Failed to generate APM report:', error);
        }
    }
    /**
     * Analyze long-term trends
     */
    async analyzeLongTermTrends() {
        if (this.historicalMetrics.length < 100)
            return null;
        const lastHour = this.historicalMetrics.slice(-120); // Last hour at 30-second intervals
        return {
            responseTime: this.analyzeTrend(lastHour.map(m => m.responseTimes.avg)),
            errorRate: this.analyzeTrend(lastHour.map(m => m.throughput.errorRate)),
            throughput: this.analyzeTrend(lastHour.map(m => m.throughput.requests)),
            apdex: this.analyzeTrend(lastHour.map(m => m.userExperience.apdexScore))
        };
    }
    /**
     * Generate performance recommendations
     */
    async generatePerformanceRecommendations(metrics) {
        const recommendations = [];
        // Response time recommendations
        if (metrics.responseTimes.avg > this.thresholds.responseTime.warning) {
            recommendations.push('Optimize slow database queries and API calls');
        }
        // Error rate recommendations
        if (metrics.throughput.errorRate > this.thresholds.errorRate.warning) {
            recommendations.push('Investigate and fix root causes of errors');
        }
        // User experience recommendations
        if (metrics.userExperience.apdexScore < this.thresholds.apdex.warning) {
            recommendations.push('Improve application performance to enhance user experience');
        }
        // Resource recommendations
        if (metrics.resources.activeConnections > 100) {
            recommendations.push('Consider connection pooling optimization');
        }
        return recommendations;
    }
    /**
     * Register service dependency
     */
    registerDependency(dependency) {
        const fullDependency = {
            ...dependency,
            status: 'healthy',
            responseTime: 0,
            errorRate: 0,
            lastCheck: new Date(),
            slaCompliance: 100
        };
        this.serviceDependencies.set(dependency.name, fullDependency);
        this.logger.info(`Registered service dependency: ${dependency.name}`);
    }
    /**
     * Get current metrics
     */
    getCurrentMetrics() {
        return this.historicalMetrics[this.historicalMetrics.length - 1] || null;
    }
    /**
     * Get historical metrics
     */
    getHistoricalMetrics(limit) {
        if (limit) {
            return this.historicalMetrics.slice(-limit);
        }
        return this.historicalMetrics;
    }
    /**
     * Get active transactions
     */
    getActiveTransactions() {
        return Array.from(this.activeTransactions.values());
    }
    /**
     * Get service dependencies
     */
    getServiceDependencies() {
        return Array.from(this.serviceDependencies.values());
    }
    /**
     * Generate unique ID
     */
    generateId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}
exports.APMMonitor = APMMonitor;
//# sourceMappingURL=apm-monitor.js.map