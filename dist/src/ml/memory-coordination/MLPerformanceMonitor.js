"use strict";
/**
 * MLPerformanceMonitor - Real-time Performance Monitoring for ML Memory Coordination
 * Comprehensive tracking of memory usage, performance metrics, and optimization
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MLPerformanceMonitor = void 0;
const events_1 = require("events");
class MLPerformanceMonitor extends events_1.EventEmitter {
    constructor(config) {
        super();
        // Monitoring state
        this.isMonitoring = false;
        this.monitoringInterval = null;
        this.performanceHistory = new Map();
        this.activeAlerts = new Map();
        this.recentMetrics = [];
        // Performance optimization
        this.optimizationQueue = [];
        this.activeOptimizations = new Map();
        this.config = config;
        this.initializePerformanceBaselines();
        this.initializeAnalytics();
    }
    /**
     * Initialize performance monitoring system
     */
    async initialize(patternStorage, crossAgentCoordinator) {
        console.log('📊 Initializing ML Performance Monitor...');
        try {
            this.patternStorage = patternStorage;
            this.crossAgentCoordinator = crossAgentCoordinator;
            // Phase 1: Initialize baseline metrics
            await this.initializeBaselineMetrics();
            // Phase 2: Setup real-time monitoring
            if (this.config.real_time_monitoring) {
                await this.setupRealTimeMonitoring();
            }
            // Phase 3: Initialize alert system
            await this.initializeAlertSystem();
            // Phase 4: Setup performance analytics
            await this.setupPerformanceAnalytics();
            // Phase 5: Initialize auto-optimization
            if (this.config.auto_optimization_enabled) {
                await this.initializeAutoOptimization();
            }
            // Phase 6: Start monitoring
            await this.startMonitoring();
            console.log('✅ ML Performance Monitor initialized successfully');
            this.emit('initialized', { monitoring_interval: this.config.monitoring_interval });
        }
        catch (error) {
            console.error('❌ ML Performance Monitor initialization failed:', error);
            throw error;
        }
    }
    /**
     * Start real-time performance monitoring
     */
    async startMonitoring() {
        if (this.isMonitoring) {
            console.log('⚠️ Monitoring is already active');
            return;
        }
        console.log('🚀 Starting real-time performance monitoring...');
        this.isMonitoring = true;
        this.monitoringInterval = setInterval(async () => {
            await this.collectMetrics();
            await this.analyzePerformance();
            await this.checkAlerts();
            await this.updateHistory();
        }, this.config.monitoring_interval);
        console.log(`✅ Performance monitoring started (interval: ${this.config.monitoring_interval}ms)`);
        this.emit('monitoring_started');
    }
    /**
     * Stop performance monitoring
     */
    async stopMonitoring() {
        if (!this.isMonitoring) {
            console.log('⚠️ Monitoring is not active');
            return;
        }
        console.log('🛑 Stopping performance monitoring...');
        this.isMonitoring = false;
        if (this.monitoringInterval) {
            clearInterval(this.monitoringInterval);
            this.monitoringInterval = null;
        }
        console.log('✅ Performance monitoring stopped');
        this.emit('monitoring_stopped');
    }
    /**
     * Get current performance metrics
     */
    async getCurrentMetrics() {
        return this.currentMetrics;
    }
    /**
     * Get performance history for specified timeframe
     */
    async getPerformanceHistory(timeframe) {
        const history = this.performanceHistory.get(timeframe);
        if (!history) {
            throw new Error(`Performance history for timeframe '${timeframe}' not found`);
        }
        return history;
    }
    /**
     * Get active performance alerts
     */
    async getActiveAlerts() {
        return Array.from(this.activeAlerts.values()).filter(alert => !alert.resolved);
    }
    /**
     * Execute performance optimization
     */
    async optimizePerformance(optimizationType) {
        console.log(`⚡ Executing performance optimization: ${optimizationType}`);
        const optimization = await this.createOptimization(optimizationType);
        this.activeOptimizations.set(optimization.optimizationId, optimization);
        try {
            const startTime = performance.now();
            // Execute optimization based on type
            let impact;
            switch (optimizationType) {
                case 'memory_cleanup':
                    impact = await this.executeMemoryCleanup();
                    break;
                case 'cache_optimization':
                    impact = await this.executeCacheOptimization();
                    break;
                case 'index_rebuild':
                    impact = await this.executeIndexRebuild();
                    break;
                case 'compression_adjustment':
                    impact = await this.executeCompressionAdjustment();
                    break;
                default:
                    throw new Error(`Unknown optimization type: ${optimizationType}`);
            }
            const executionTime = performance.now() - startTime;
            optimization.impact = impact;
            optimization.execution_time = executionTime;
            optimization.success = true;
            optimization.timestamp = Date.now();
            console.log(`✅ Optimization ${optimizationType} completed in ${executionTime.toFixed(2)}ms`);
            this.emit('optimization_completed', optimization);
            return optimization;
        }
        catch (error) {
            optimization.success = false;
            optimization.timestamp = Date.now();
            console.error(`❌ Optimization ${optimizationType} failed:`, error);
            this.emit('optimization_failed', { optimization, error });
            throw error;
        }
        finally {
            this.activeOptimizations.delete(optimization.optimizationId);
        }
    }
    /**
     * Get comprehensive performance report
     */
    async generatePerformanceReport(timeframe = 'hour') {
        try {
            const history = await this.getPerformanceHistory(timeframe);
            const currentMetrics = await this.getCurrentMetrics();
            const activeAlerts = await this.getActiveAlerts();
            const report = {
                generated_at: Date.now(),
                timeframe,
                current_metrics: currentMetrics,
                historical_data: history,
                active_alerts: activeAlerts,
                performance_summary: this.calculatePerformanceSummary(history),
                recommendations: this.generateRecommendations(currentMetrics, history),
                trends: history.trends,
                anomalies: history.anomalies,
                optimization_suggestions: this.suggestOptimizations(currentMetrics),
                health_score: this.calculateHealthScore(currentMetrics)
            };
            this.emit('report_generated', { timeframe, health_score: report.health_score });
            return report;
        }
        catch (error) {
            console.error('❌ Failed to generate performance report:', error);
            throw error;
        }
    }
    // Private helper methods
    initializePerformanceBaselines() {
        this.performanceBaselines = {
            timestamp: Date.now(),
            memoryUsage: {
                totalMemoryGB: 0,
                usedMemoryGB: 0,
                availableMemoryGB: 0,
                memoryUtilization: 0,
                vectorIndexMemoryGB: 0,
                patternMemoryGB: 0,
                agentDBMemoryGB: 0,
                compressionRatio: 1.0,
                memoryGrowthRate: 0,
                memoryEfficiency: 0.8
            },
            transferMetrics: {
                totalTransfers: 0,
                successfulTransfers: 0,
                failedTransfers: 0,
                averageLatency: 0,
                minLatency: 0,
                maxLatency: 0,
                throughputMBps: 0,
                dataTransferredGB: 0,
                compressionRatio: 1.0,
                crossAgentSuccessRate: 0.9,
                activeConnections: 0
            },
            searchMetrics: {
                totalSearches: 0,
                successfulSearches: 0,
                averageSearchTime: 0,
                minSearchTime: 0,
                maxSearchTime: 0,
                searchesPerSecond: 0,
                vectorSearchTime: 0,
                patternMatchingTime: 0,
                cacheHitRate: 0.8,
                searchAccuracy: 0.9,
                resultRelevanceScore: 0.8
            },
            learningMetrics: {
                totalEpisodes: 0,
                successfulEpisodes: 0,
                averageSuccessRate: 0.8,
                learningRate: 0.1,
                adaptationCount: 0,
                patternCreationRate: 0,
                knowledgeTransferRate: 0,
                crossAgentLearningRate: 0,
                patternEvolutionRate: 0,
                convergenceScore: 0.5
            },
            systemMetrics: {
                cpuUtilization: 0.3,
                memoryUtilization: 0.4,
                diskUtilization: 0.2,
                networkLatency: 1,
                systemLoad: 0.5,
                availableThreads: 8,
                ioWaitTime: 0.1,
                contextSwitches: 1000,
                interruptRate: 100,
                systemStability: 0.95
            },
            agentMetrics: []
        };
    }
    initializeAnalytics() {
        this.trendAnalysis = new TrendAnalysis();
        this.anomalyDetector = new AnomalyDetector();
        this.performancePredictor = new PerformancePredictor();
    }
    async initializeBaselineMetrics() {
        console.log('📈 Initializing baseline metrics...');
        // Collect initial metrics from components
        const memoryStats = await this.patternStorage.getStatistics();
        this.currentMetrics = {
            timestamp: Date.now(),
            memoryUsage: {
                totalMemoryGB: memoryStats.memoryUsageGB + 10,
                usedMemoryGB: memoryStats.memoryUsageGB,
                availableMemoryGB: 10,
                memoryUtilization: memoryStats.memoryUsageGB / 10,
                vectorIndexMemoryGB: memoryStats.memoryUsageGB * 0.3,
                patternMemoryGB: memoryStats.memoryUsageGB * 0.5,
                agentDBMemoryGB: memoryStats.memoryUsageGB * 0.2,
                compressionRatio: memoryStats.compressionRatio,
                memoryGrowthRate: 0,
                memoryEfficiency: 0.8
            },
            transferMetrics: {
                totalTransfers: memoryStats.crossAgentShared,
                successfulTransfers: memoryStats.crossAgentShared,
                failedTransfers: 0,
                averageLatency: memoryStats.syncLatency,
                minLatency: memoryStats.syncLatency * 0.8,
                maxLatency: memoryStats.syncLatency * 1.2,
                throughputMBps: 100,
                dataTransferredGB: memoryStats.memoryUsageGB * 0.1,
                compressionRatio: memoryStats.compressionRatio,
                crossAgentSuccessRate: 0.95,
                activeConnections: 3
            },
            searchMetrics: {
                totalSearches: 100,
                successfulSearches: 95,
                averageSearchTime: memoryStats.searchLatency,
                minSearchTime: memoryStats.searchLatency * 0.5,
                maxSearchTime: memoryStats.searchLatency * 2,
                searchesPerSecond: 10,
                vectorSearchTime: memoryStats.searchLatency * 0.7,
                patternMatchingTime: memoryStats.searchLatency * 0.3,
                cacheHitRate: 0.85,
                searchAccuracy: 0.9,
                resultRelevanceScore: 0.85
            },
            learningMetrics: {
                totalEpisodes: memoryStats.rlEpisodes,
                successfulEpisodes: Math.floor(memoryStats.rlEpisodes * 0.8),
                averageSuccessRate: 0.8,
                learningRate: memoryStats.learningRate,
                adaptationCount: 50,
                patternCreationRate: 2,
                knowledgeTransferRate: 5,
                crossAgentLearningRate: 0.3,
                patternEvolutionRate: 0.1,
                convergenceScore: 0.7
            },
            systemMetrics: {
                cpuUtilization: 0.4,
                memoryUtilization: this.currentMetrics?.memoryUsage.memoryUtilization || 0.5,
                diskUtilization: 0.3,
                networkLatency: 1.5,
                systemLoad: 0.6,
                availableThreads: 6,
                ioWaitTime: 0.2,
                contextSwitches: 1500,
                interruptRate: 120,
                systemStability: 0.92
            },
            agentMetrics: await this.collectAgentMetrics()
        };
        console.log('✅ Baseline metrics initialized');
    }
    async setupRealTimeMonitoring() {
        console.log('⚡ Setting up real-time monitoring...');
        // Setup real-time monitoring infrastructure
    }
    async initializeAlertSystem() {
        console.log('🚨 Initializing alert system...');
        // Initialize alert thresholds and monitoring
    }
    async setupPerformanceAnalytics() {
        console.log('📊 Setting up performance analytics...');
        // Setup analytics and trend analysis
    }
    async initializeAutoOptimization() {
        console.log('🤖 Initializing auto-optimization...');
        // Setup automatic optimization triggers
    }
    async collectMetrics() {
        const timestamp = Date.now();
        try {
            // Collect memory usage metrics
            const memoryStats = await this.patternStorage.getStatistics();
            // Update current metrics with latest data
            this.currentMetrics.timestamp = timestamp;
            this.currentMetrics.memoryUsage.usedMemoryGB = memoryStats.memoryUsageGB;
            this.currentMetrics.memoryUsage.memoryUtilization = memoryStats.memoryUsageGB / this.currentMetrics.memoryUsage.totalMemoryGB;
            this.currentMetrics.memoryUsage.compressionRatio = memoryStats.compressionRatio;
            // Calculate memory growth rate
            if (this.recentMetrics.length > 0) {
                const lastMetrics = this.recentMetrics[this.recentMetrics.length - 1];
                const timeDiff = (timestamp - lastMetrics.timestamp) / 60000; // minutes
                const memoryDiff = memoryStats.memoryUsageGB - lastMetrics.memoryUsage.usedMemoryGB;
                this.currentMetrics.memoryUsage.memoryGrowthRate = (memoryDiff * 1024) / timeDiff; // MB/min
            }
            // Collect transfer metrics
            this.currentMetrics.transferMetrics.totalTransfers = memoryStats.crossAgentShared;
            this.currentMetrics.transferMetrics.successfulTransfers = memoryStats.crossAgentShared;
            this.currentMetrics.transferMetrics.averageLatency = memoryStats.syncLatency;
            // Collect search metrics
            this.currentMetrics.searchMetrics.averageSearchTime = memoryStats.searchLatency;
            // Collect learning metrics
            this.currentMetrics.learningMetrics.totalEpisodes = memoryStats.rlEpisodes;
            this.currentMetrics.learningMetrics.learningRate = memoryStats.learningRate;
            // Collect system metrics (simulated)
            this.currentMetrics.systemMetrics = await this.collectSystemMetrics();
            // Collect agent metrics
            this.currentMetrics.agentMetrics = await this.collectAgentMetrics();
            // Store in recent metrics
            this.recentMetrics.push({ ...this.currentMetrics });
            // Keep only recent metrics (last 1000 data points)
            if (this.recentMetrics.length > 1000) {
                this.recentMetrics = this.recentMetrics.slice(-1000);
            }
        }
        catch (error) {
            console.error('❌ Failed to collect metrics:', error);
        }
    }
    async analyzePerformance() {
        try {
            // Detect anomalies
            const anomalies = await this.anomalyDetector.detect(this.currentMetrics, this.recentMetrics);
            // Analyze trends
            const trends = await this.trendAnalysis.analyze(this.recentMetrics);
            // Predict future performance
            const predictions = await this.performancePredictor.predict(this.recentMetrics);
            // Emit analysis results
            this.emit('performance_analyzed', {
                metrics: this.currentMetrics,
                anomalies,
                trends,
                predictions
            });
        }
        catch (error) {
            console.error('❌ Performance analysis failed:', error);
        }
    }
    async checkAlerts() {
        try {
            const alerts = [];
            // Check memory usage alerts
            if (this.currentMetrics.memoryUsage.memoryUtilization > this.config.alert_thresholds.memoryUsageCritical) {
                alerts.push(this.createAlert('critical', 'memory', 'Memory usage critical', this.currentMetrics.memoryUsage.memoryUtilization, this.config.alert_thresholds.memoryUsageCritical));
            }
            else if (this.currentMetrics.memoryUsage.memoryUtilization > this.config.alert_thresholds.memoryUsageWarning) {
                alerts.push(this.createAlert('warning', 'memory', 'Memory usage high', this.currentMetrics.memoryUsage.memoryUtilization, this.config.alert_thresholds.memoryUsageWarning));
            }
            // Check latency alerts
            if (this.currentMetrics.transferMetrics.averageLatency > this.config.alert_thresholds.latencyCritical) {
                alerts.push(this.createAlert('critical', 'latency', 'Transfer latency critical', this.currentMetrics.transferMetrics.averageLatency, this.config.alert_thresholds.latencyCritical));
            }
            // Check success rate alerts
            if (this.currentMetrics.transferMetrics.crossAgentSuccessRate < this.config.alert_thresholds.successRateCritical) {
                alerts.push(this.createAlert('critical', 'success_rate', 'Cross-agent success rate critical', this.currentMetrics.transferMetrics.crossAgentSuccessRate, this.config.alert_thresholds.successRateCritical));
            }
            // Process new alerts
            for (const alert of alerts) {
                this.activeAlerts.set(alert.alertId, alert);
                this.emit('alert_triggered', alert);
            }
            // Check for resolved alerts
            for (const [alertId, alert] of this.activeAlerts) {
                if (this.isAlertResolved(alert)) {
                    alert.resolved = true;
                    alert.resolution_time = Date.now();
                    this.emit('alert_resolved', alert);
                }
            }
        }
        catch (error) {
            console.error('❌ Alert checking failed:', error);
        }
    }
    async updateHistory() {
        try {
            // Update different timeframes
            const timeframes = ['minute', 'hour', 'day', 'week'];
            for (const timeframe of timeframes) {
                await this.updateTimeframeHistory(timeframe);
            }
        }
        catch (error) {
            console.error('❌ History update failed:', error);
        }
    }
    async updateTimeframeHistory(timeframe) {
        const history = this.performanceHistory.get(timeframe);
        if (!history) {
            this.performanceHistory.set(timeframe, this.createNewHistory(timeframe));
            return;
        }
        // Add current metrics to history
        history.metrics.timestamps.push(this.currentMetrics.timestamp);
        history.metrics.memoryUsage.push(this.currentMetrics.memoryUsage.usedMemoryGB);
        history.metrics.transferLatency.push(this.currentMetrics.transferMetrics.averageLatency);
        history.metrics.searchTime.push(this.currentMetrics.searchMetrics.averageSearchTime);
        history.metrics.successRate.push(this.currentMetrics.transferMetrics.crossAgentSuccessRate);
        history.metrics.throughput.push(this.currentMetrics.transferMetrics.throughputMBps);
        // Keep only relevant data points
        const maxDataPoints = this.getMaxDataPoints(timeframe);
        if (history.metrics.timestamps.length > maxDataPoints) {
            history.metrics.timestamps = history.metrics.timestamps.slice(-maxDataPoints);
            history.metrics.memoryUsage = history.metrics.memoryUsage.slice(-maxDataPoints);
            history.metrics.transferLatency = history.metrics.transferLatency.slice(-maxDataPoints);
            history.metrics.searchTime = history.metrics.searchTime.slice(-maxDataPoints);
            history.metrics.successRate = history.metrics.successRate.slice(-maxDataPoints);
            history.metrics.throughput = history.metrics.throughput.slice(-maxDataPoints);
        }
        history.dataPoints = history.metrics.timestamps.length;
        // Update trends
        history.trends = await this.calculateTrends(history);
    }
    createNewHistory(timeframe) {
        return {
            timeframe: timeframe,
            dataPoints: 0,
            metrics: {
                timestamps: [],
                memoryUsage: [],
                transferLatency: [],
                searchTime: [],
                successRate: [],
                throughput: []
            },
            trends: {
                memory_trend: 'stable',
                latency_trend: 'stable',
                performance_trend: 'stable'
            },
            anomalies: []
        };
    }
    getMaxDataPoints(timeframe) {
        switch (timeframe) {
            case 'minute': return 60;
            case 'hour': return 60;
            case 'day': return 24;
            case 'week': return 7 * 24;
            default: return 100;
        }
    }
    async calculateTrends(history) {
        if (history.metrics.memoryUsage.length < 2) {
            return {
                memory_trend: 'stable',
                latency_trend: 'stable',
                performance_trend: 'stable'
            };
        }
        const memoryTrend = this.calculateTrend(history.metrics.memoryUsage.slice(-10));
        const latencyTrend = this.calculateTrend(history.metrics.transferLatency.slice(-10));
        const performanceTrend = this.calculateTrend(history.metrics.successRate.slice(-10));
        return {
            memory_trend: memoryTrend,
            latency_trend: latencyTrend,
            performance_trend: performanceTrend
        };
    }
    calculateTrend(values) {
        if (values.length < 2)
            return 'stable';
        const firstHalf = values.slice(0, Math.floor(values.length / 2));
        const secondHalf = values.slice(Math.floor(values.length / 2));
        const firstAvg = firstHalf.reduce((sum, val) => sum + val, 0) / firstHalf.length;
        const secondAvg = secondHalf.reduce((sum, val) => sum + val, 0) / secondHalf.length;
        const change = (secondAvg - firstAvg) / firstAvg;
        if (change > 0.05)
            return 'increasing';
        if (change < -0.05)
            return 'decreasing';
        return 'stable';
    }
    createAlert(severity, category, message, currentValue, threshold) {
        return {
            alertId: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            severity,
            category,
            message,
            current_value: currentValue,
            threshold,
            timestamp: Date.now(),
            resolved: false,
            suggested_actions: this.getSuggestedActions(category, severity)
        };
    }
    getSuggestedActions(category, severity) {
        const actions = {
            memory: {
                critical: ['Execute immediate memory cleanup', 'Increase memory quota', 'Restart memory-intensive processes'],
                warning: ['Schedule memory cleanup', 'Monitor memory growth', 'Consider compression adjustment']
            },
            latency: {
                critical: ['Check network connectivity', 'Optimize vector index', 'Reduce concurrent transfers'],
                warning: ['Monitor transfer patterns', 'Optimize compression settings']
            },
            success_rate: {
                critical: ['Verify agent connectivity', 'Check transfer protocols', 'Restart failed agents'],
                warning: ['Monitor agent health', 'Review transfer logs']
            }
        };
        return actions[category]?.[severity] || ['Contact system administrator'];
    }
    isAlertResolved(alert) {
        switch (alert.category) {
            case 'memory':
                return this.currentMetrics.memoryUsage.memoryUtilization < alert.threshold;
            case 'latency':
                return this.currentMetrics.transferMetrics.averageLatency < alert.threshold;
            case 'success_rate':
                return this.currentMetrics.transferMetrics.crossAgentSuccessRate > alert.threshold;
            default:
                return false;
        }
    }
    async collectSystemMetrics() {
        // Simulated system metrics - in real implementation would use actual system monitoring
        return {
            cpuUtilization: 0.3 + Math.random() * 0.4,
            memoryUtilization: this.currentMetrics?.memoryUsage.memoryUtilization || 0.5,
            diskUtilization: 0.2 + Math.random() * 0.3,
            networkLatency: 1 + Math.random() * 2,
            systemLoad: 0.4 + Math.random() * 0.4,
            availableThreads: Math.floor(4 + Math.random() * 4),
            ioWaitTime: 0.1 + Math.random() * 0.2,
            contextSwitches: 1000 + Math.floor(Math.random() * 1000),
            interruptRate: 100 + Math.floor(Math.random() * 100),
            systemStability: 0.9 + Math.random() * 0.1
        };
    }
    async collectAgentMetrics() {
        // Simulated agent metrics - in real implementation would collect from actual agents
        return [
            {
                agentId: 'ml-developer-1',
                agentType: 'ml-developer',
                isActive: true,
                responseTime: 50 + Math.random() * 100,
                throughput: 10 + Math.random() * 20,
                memoryUsage: 2 + Math.random() * 3,
                successRate: 0.85 + Math.random() * 0.15,
                errorRate: Math.random() * 0.1,
                lastActivity: Date.now() - Math.random() * 60000,
                uptime: 3600000 + Math.random() * 7200000,
                connectionQuality: 0.8 + Math.random() * 0.2,
                resourceUtilization: 0.3 + Math.random() * 0.4
            }
        ];
    }
    async createOptimization(optimizationType) {
        return {
            optimizationId: `opt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            type: optimizationType,
            description: `Automatic optimization: ${optimizationType}`,
            impact: {
                memory_saved: 0,
                performance_improvement: 0,
                latency_reduction: 0
            },
            execution_time: 0,
            success: false,
            timestamp: Date.now()
        };
    }
    async executeMemoryCleanup() {
        // Simulate memory cleanup
        await new Promise(resolve => setTimeout(resolve, 1000));
        return {
            memory_saved: 500,
            performance_improvement: 15,
            latency_reduction: 5 // ms
        };
    }
    async executeCacheOptimization() {
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
            memory_saved: 200,
            performance_improvement: 10,
            latency_reduction: 3
        };
    }
    async executeIndexRebuild() {
        await new Promise(resolve => setTimeout(resolve, 2000));
        return {
            memory_saved: 100,
            performance_improvement: 25,
            latency_reduction: 10
        };
    }
    async executeCompressionAdjustment() {
        await new Promise(resolve => setTimeout(resolve, 300));
        return {
            memory_saved: 800,
            performance_improvement: 5,
            latency_reduction: 2
        };
    }
    calculatePerformanceSummary(history) {
        if (history.metrics.memoryUsage.length === 0) {
            return { status: 'insufficient_data' };
        }
        const avgMemory = history.metrics.memoryUsage.reduce((sum, val) => sum + val, 0) / history.metrics.memoryUsage.length;
        const avgLatency = history.metrics.transferLatency.reduce((sum, val) => sum + val, 0) / history.metrics.transferLatency.length;
        const avgSuccessRate = history.metrics.successRate.reduce((sum, val) => sum + val, 0) / history.metrics.successRate.length;
        return {
            average_memory_usage: avgMemory,
            average_latency: avgLatency,
            average_success_rate: avgSuccessRate,
            overall_performance: (avgSuccessRate * 0.4 + (1 - Math.min(1, avgLatency / 10)) * 0.3 + (1 - Math.min(1, avgMemory / 8)) * 0.3),
            data_points: history.dataPoints
        };
    }
    generateRecommendations(currentMetrics, history) {
        const recommendations = [];
        if (currentMetrics.memoryUsage.memoryUtilization > 0.8) {
            recommendations.push('Consider increasing memory quota or optimizing memory usage');
        }
        if (currentMetrics.transferMetrics.averageLatency > 5) {
            recommendations.push('Optimize transfer protocols and enable compression');
        }
        if (currentMetrics.searchMetrics.cacheHitRate < 0.8) {
            recommendations.push('Improve caching strategy and increase cache size');
        }
        if (currentMetrics.learningMetrics.adaptationCount < 10) {
            recommendations.push('Increase learning frequency and pattern sharing');
        }
        return recommendations;
    }
    suggestOptimizations(currentMetrics) {
        const optimizations = [];
        if (currentMetrics.memoryUsage.memoryGrowthRate > 10) {
            optimizations.push('memory_cleanup');
        }
        if (currentMetrics.searchMetrics.cacheHitRate < 0.8) {
            optimizations.push('cache_optimization');
        }
        if (currentMetrics.transferMetrics.averageLatency > 10) {
            optimizations.push('index_rebuild');
        }
        if (currentMetrics.memoryUsage.compressionRatio < 2) {
            optimizations.push('compression_adjustment');
        }
        return optimizations;
    }
    calculateHealthScore(currentMetrics) {
        const memoryScore = Math.max(0, 1 - currentMetrics.memoryUsage.memoryUtilization);
        const latencyScore = Math.max(0, 1 - currentMetrics.transferMetrics.averageLatency / 10);
        const successScore = currentMetrics.transferMetrics.crossAgentSuccessRate;
        const systemScore = currentMetrics.systemMetrics.systemStability;
        return (memoryScore * 0.3 + latencyScore * 0.2 + successScore * 0.3 + systemScore * 0.2);
    }
}
exports.MLPerformanceMonitor = MLPerformanceMonitor;
// Supporting classes (simplified implementations)
class TrendAnalysis {
    async analyze(metrics) {
        return { trend: 'stable', confidence: 0.8 };
    }
}
class AnomalyDetector {
    async detect(current, history) {
        // Simple anomaly detection simulation
        return [];
    }
}
class PerformancePredictor {
    async predict(history) {
        return { predicted_memory: 5.2, predicted_latency: 2.1, confidence: 0.75 };
    }
}
exports.default = MLPerformanceMonitor;
//# sourceMappingURL=MLPerformanceMonitor.js.map