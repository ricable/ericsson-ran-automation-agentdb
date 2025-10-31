"use strict";
/**
 * Business KPI Monitoring System
 * RAN optimization effectiveness, energy efficiency, mobility performance, and coverage quality
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessKPIMonitor = void 0;
const events_1 = require("events");
const logger_1 = require("../../utils/logger");
const metrics_collector_1 = require("../deployment/metrics-collector");
const alert_manager_1 = require("../deployment/alert-manager");
const dashboard_manager_1 = require("../deployment/dashboard-manager");
class BusinessKPIMonitor extends events_1.EventEmitter {
    constructor() {
        super();
        this.currentKPIs = null;
        this.historicalKPIs = [];
        this.optimizationImpacts = [];
        this.businessTargets = new Map();
        this.businessInsights = [];
        this.benchmarks = new Map();
        this.logger = (0, logger_1.createLogger)('BusinessKPIMonitor');
        this.metricsCollector = new metrics_collector_1.MetricsCollector('business_kpi');
        this.alertManager = new alert_manager_1.AlertManager();
        this.dashboardManager = new dashboard_manager_1.DashboardManager();
        this.initializeMonitoring();
    }
    initializeMonitoring() {
        // Setup monitoring intervals
        setInterval(() => this.collectBusinessMetrics(), 60000); // Every minute
        setInterval(() => this.analyzeTrends(), 300000); // Every 5 minutes
        setInterval(() => this.evaluateTargets(), 600000); // Every 10 minutes
        setInterval(() => this.generateBusinessInsights(), 900000); // Every 15 minutes
        setInterval(() => this.generateBusinessReport(), 600000); // Every 10 minutes
        // Initialize benchmarks
        this.initializeBenchmarks();
        this.logger.info('Business KPI monitoring initialized');
        this.emit('monitoring:initialized');
    }
    /**
     * Initialize industry benchmarks
     */
    initializeBenchmarks() {
        this.benchmarks.set('energyEfficiency.target', 0.5); // kWh/GB
        this.benchmarks.set('handoverSuccessRate.target', 99.5); // %
        this.benchmarks.set('coverage.target', 99.0); // %
        this.benchmarks.set('availability.target', 99.99); // %
        this.benchmarks.set('customerSatisfaction.target', 85); // 0-100
    }
    /**
     * Collect business metrics from various sources
     */
    async collectBusinessMetrics() {
        try {
            const kpis = await this.generateBusinessKPIs();
            this.currentKPIs = kpis;
            this.historicalKPIs.push(kpis);
            // Keep only last 1440 metrics (24 hours at 1-minute intervals)
            if (this.historicalKPIs.length > 1440) {
                this.historicalKPIs.shift();
            }
            // Store metrics
            await this.storeBusinessMetrics(kpis);
            // Check for business alerts
            await this.checkBusinessAlerts(kpis);
            this.emit('metrics:collected', kpis);
        }
        catch (error) {
            this.logger.error('Failed to collect business metrics:', error);
        }
    }
    /**
     * Generate comprehensive business KPIs
     */
    async generateBusinessKPIs() {
        // In a real implementation, these would come from:
        // - RAN performance monitoring systems
        // - Energy management systems
        // - Network management systems
        // - Customer experience platforms
        // - Billing systems
        const timestamp = new Date();
        // Simulate realistic RAN KPIs with some variation
        const energyEfficiency = this.generateEnergyEfficiencyMetrics();
        const mobilityPerformance = this.generateMobilityPerformanceMetrics();
        const coverageQuality = this.generateCoverageQualityMetrics();
        const capacityManagement = this.generateCapacityManagementMetrics();
        const userExperience = this.generateUserExperienceMetrics();
        const networkReliability = this.generateNetworkReliabilityMetrics();
        return {
            timestamp,
            networkId: 'RAN-NET-001',
            region: 'EU-WEST',
            energyEfficiency,
            mobilityPerformance,
            coverageQuality,
            capacityManagement,
            userExperience,
            networkReliability
        };
    }
    /**
     * Generate energy efficiency metrics
     */
    generateEnergyEfficiencyMetrics() {
        // Add realistic variation to simulate real data
        const baseEnergyPerGB = 0.45 + (Math.random() - 0.5) * 0.1;
        const baseGreenEnergyRatio = 35 + (Math.random() - 0.5) * 10;
        return {
            totalEnergyConsumption: 150000 + Math.random() * 10000,
            energyPerSite: 2500 + Math.random() * 500,
            energyPerGB: baseEnergyPerGB,
            greenEnergyRatio: baseGreenEnergyRatio,
            costPerGB: 0.08 + (Math.random() - 0.5) * 0.02,
            savingsFromOptimization: 12 + Math.random() * 8 // %
        };
    }
    /**
     * Generate mobility performance metrics
     */
    generateMobilityPerformanceMetrics() {
        return {
            handoverSuccessRate: 99.2 + Math.random() * 0.6,
            handoverLatency: 45 + Math.random() * 20,
            pingPongRate: 0.8 + Math.random() * 0.4,
            callDropRate: 0.15 + Math.random() * 0.1,
            mobilityRobustnessIndex: 85 + Math.random() * 10,
            averageUserSpeed: 25 + Math.random() * 15,
            cellReselectionTime: 120 + Math.random() * 40 // ms
        };
    }
    /**
     * Generate coverage quality metrics
     */
    generateCoverageQualityMetrics() {
        const excellent = 85 + Math.random() * 10;
        const good = 12 + Math.random() * 3;
        const fair = 2.5 + Math.random() * 1;
        const poor = Math.max(0, 100 - excellent - good - fair);
        return {
            coverageArea: 1250 + Math.random() * 100,
            populationCoverage: 98.5 + Math.random() * 1.2,
            signalStrengthDistribution: {
                excellent,
                good,
                fair,
                poor
            },
            coverageHoles: Math.floor(Math.random() * 5),
            interferenceLevel: 15 + Math.random() * 10,
            qualityOfServiceScore: 88 + Math.random() * 8 // 0-100
        };
    }
    /**
     * Generate capacity management metrics
     */
    generateCapacityManagementMetrics() {
        return {
            totalTraffic: 4500 + Math.random() * 500,
            peakThroughput: 850 + Math.random() * 150,
            averageThroughput: 320 + Math.random() * 80,
            cellUtilization: 65 + Math.random() * 15,
            congestionEvents: Math.floor(Math.random() * 3),
            loadBalancingEfficiency: 92 + Math.random() * 6,
            capacityHeadroom: 25 + Math.random() * 10 // %
        };
    }
    /**
     * Generate user experience metrics
     */
    generateUserExperienceMetrics() {
        return {
            customerSatisfactionScore: 82 + Math.random() * 10,
            netPromoterScore: 35 + Math.random() * 20,
            averageDataRate: 45 + Math.random() * 25,
            latencyExperience: 28 + Math.random() * 12,
            applicationPerformanceScore: 87 + Math.random() * 8,
            complaintRate: 2.5 + Math.random() * 2 // per 1000 users
        };
    }
    /**
     * Generate network reliability metrics
     */
    generateNetworkReliabilityMetrics() {
        return {
            availability: 99.98 + Math.random() * 0.015,
            meanTimeBetweenFailures: 850 + Math.random() * 200,
            meanTimeToRepair: 15 + Math.random() * 10,
            serviceImpactEvents: Math.floor(Math.random() * 2),
            networkHealthScore: 92 + Math.random() * 6,
            selfHealingSuccessRate: 94 + Math.random() * 5 // %
        };
    }
    /**
     * Store business metrics
     */
    async storeBusinessMetrics(kpis) {
        try {
            // Energy efficiency metrics
            await this.metricsCollector.recordMetric('energy_per_gb', kpis.energyEfficiency.energyPerGB);
            await this.metricsCollector.recordMetric('green_energy_ratio', kpis.energyEfficiency.greenEnergyRatio);
            await this.metricsCollector.recordMetric('energy_savings', kpis.energyEfficiency.savingsFromOptimization);
            // Mobility metrics
            await this.metricsCollector.recordMetric('handover_success_rate', kpis.mobilityPerformance.handoverSuccessRate);
            await this.metricsCollector.recordMetric('handover_latency', kpis.mobilityPerformance.handoverLatency);
            await this.metricsCollector.recordMetric('call_drop_rate', kpis.mobilityPerformance.callDropRate);
            // Coverage metrics
            await this.metricsCollector.recordMetric('population_coverage', kpis.coverageQuality.populationCoverage);
            await this.metricsCollector.recordMetric('coverage_quality_score', kpis.coverageQuality.qualityOfServiceScore);
            // Capacity metrics
            await this.metricsCollector.recordMetric('cell_utilization', kpis.capacityManagement.cellUtilization);
            await this.metricsCollector.recordMetric('load_balancing_efficiency', kpis.capacityManagement.loadBalancingEfficiency);
            // User experience metrics
            await this.metricsCollector.recordMetric('customer_satisfaction', kpis.userExperience.customerSatisfactionScore);
            await this.metricsCollector.recordMetric('net_promoter_score', kpis.userExperience.netPromoterScore);
            await this.metricsCollector.recordMetric('complaint_rate', kpis.userExperience.complaintRate);
            // Reliability metrics
            await this.metricsCollector.recordMetric('network_availability', kpis.networkReliability.availability);
            await this.metricsCollector.recordMetric('network_health_score', kpis.networkReliability.networkHealthScore);
        }
        catch (error) {
            this.logger.error('Failed to store business metrics:', error);
        }
    }
    /**
     * Check for business alerts
     */
    async checkBusinessAlerts(kpis) {
        const alerts = [];
        // Energy efficiency alerts
        if (kpis.energyEfficiency.energyPerGB > this.benchmarks.get('energyEfficiency.target') * 1.5) {
            alerts.push({
                level: 'warning',
                title: 'High Energy Consumption',
                message: `Energy per GB is ${kpis.energyEfficiency.energyPerGB.toFixed(3)} kWh/GB (target: ${this.benchmarks.get('energyEfficiency.target')})`,
                category: 'energy',
                value: kpis.energyEfficiency.energyPerGB,
                target: this.benchmarks.get('energyEfficiency.target')
            });
        }
        // Mobility alerts
        if (kpis.mobilityPerformance.handoverSuccessRate < this.benchmarks.get('handoverSuccessRate.target')) {
            alerts.push({
                level: 'error',
                title: 'Low Handover Success Rate',
                message: `Handover success rate is ${kpis.mobilityPerformance.handoverSuccessRate.toFixed(2)}% (target: ${this.benchmarks.get('handoverSuccessRate.target')}%)`,
                category: 'mobility',
                value: kpis.mobilityPerformance.handoverSuccessRate,
                target: this.benchmarks.get('handoverSuccessRate.target')
            });
        }
        // Coverage alerts
        if (kpis.coverageQuality.populationCoverage < this.benchmarks.get('coverage.target')) {
            alerts.push({
                level: 'warning',
                title: 'Low Population Coverage',
                message: `Population coverage is ${kpis.coverageQuality.populationCoverage.toFixed(2)}% (target: ${this.benchmarks.get('coverage.target')}%)`,
                category: 'coverage',
                value: kpis.coverageQuality.populationCoverage,
                target: this.benchmarks.get('coverage.target')
            });
        }
        // Availability alerts
        if (kpis.networkReliability.availability < this.benchmarks.get('availability.target')) {
            alerts.push({
                level: 'critical',
                title: 'Low Network Availability',
                message: `Network availability is ${kpis.networkReliability.availability.toFixed(4)}% (target: ${this.benchmarks.get('availability.target')}%)`,
                category: 'reliability',
                value: kpis.networkReliability.availability,
                target: this.benchmarks.get('availability.target')
            });
        }
        // Customer satisfaction alerts
        if (kpis.userExperience.customerSatisfactionScore < this.benchmarks.get('customerSatisfaction.target')) {
            alerts.push({
                level: 'warning',
                title: 'Low Customer Satisfaction',
                message: `Customer satisfaction score is ${kpis.userExperience.customerSatisfactionScore.toFixed(1)} (target: ${this.benchmarks.get('customerSatisfaction.target')})`,
                category: 'experience',
                value: kpis.userExperience.customerSatisfactionScore,
                target: this.benchmarks.get('customerSatisfaction.target')
            });
        }
        // Send alerts
        for (const alert of alerts) {
            await this.alertManager.sendAlert({
                level: alert.level,
                title: alert.title,
                message: alert.message,
                category: alert.category,
                value: alert.value,
                target: alert.target,
                timestamp: new Date()
            });
        }
    }
    /**
     * Analyze business trends
     */
    async analyzeTrends() {
        if (this.historicalKPIs.length < 60)
            return; // Need at least 1 hour of data
        try {
            const recentKPIs = this.historicalKPIs.slice(-60); // Last hour
            // Analyze trends for key metrics
            const energyTrend = this.calculateTrend(recentKPIs.map(k => k.energyEfficiency.energyPerGB));
            const mobilityTrend = this.calculateTrend(recentKPIs.map(k => k.mobilityPerformance.handoverSuccessRate));
            const coverageTrend = this.calculateTrend(recentKPIs.map(k => k.coverageQuality.populationCoverage));
            const satisfactionTrend = this.calculateTrend(recentKPIs.map(k => k.userExperience.customerSatisfactionScore));
            // Detect significant trends
            await this.detectSignificantTrends(energyTrend, mobilityTrend, coverageTrend, satisfactionTrend);
        }
        catch (error) {
            this.logger.error('Failed to analyze business trends:', error);
        }
    }
    /**
     * Calculate trend from array of values
     */
    calculateTrend(values) {
        if (values.length < 2)
            return { slope: 0, direction: 'stable', changePercent: 0 };
        const n = values.length;
        const sumX = (n * (n - 1)) / 2;
        const sumY = values.reduce((sum, val) => sum + val, 0);
        const sumXY = values.reduce((sum, val, index) => sum + val * index, 0);
        const sumX2 = (n * (n - 1) * (2 * n - 1)) / 6;
        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const direction = Math.abs(slope) < 0.01 ? 'stable' : slope > 0 ? 'increasing' : 'decreasing';
        const changePercent = values.length > 1 ? ((values[values.length - 1] - values[0]) / values[0]) * 100 : 0;
        return { slope, direction, changePercent };
    }
    /**
     * Detect significant business trends
     */
    async detectSignificantTrends(energyTrend, mobilityTrend, coverageTrend, satisfactionTrend) {
        // Energy consumption trending up (bad)
        if (energyTrend.direction === 'increasing' && Math.abs(energyTrend.changePercent) > 5) {
            await this.alertManager.sendAlert({
                level: 'warning',
                title: 'Energy Consumption Trending Up',
                message: `Energy per GB increased by ${energyTrend.changePercent.toFixed(1)}% in the last hour`,
                category: 'energy',
                trend: energyTrend,
                timestamp: new Date()
            });
        }
        // Mobility performance trending down (bad)
        if (mobilityTrend.direction === 'decreasing' && Math.abs(mobilityTrend.changePercent) > 2) {
            await this.alertManager.sendAlert({
                level: 'error',
                title: 'Mobility Performance Declining',
                message: `Handover success rate decreased by ${Math.abs(mobilityTrend.changePercent).toFixed(2)}% in the last hour`,
                category: 'mobility',
                trend: mobilityTrend,
                timestamp: new Date()
            });
        }
        // Customer satisfaction trending down (bad)
        if (satisfactionTrend.direction === 'decreasing' && Math.abs(satisfactionTrend.changePercent) > 3) {
            await this.alertManager.sendAlert({
                level: 'warning',
                title: 'Customer Satisfaction Declining',
                message: `Customer satisfaction decreased by ${Math.abs(satisfactionTrend.changePercent).toFixed(1)} points in the last hour`,
                category: 'experience',
                trend: satisfactionTrend,
                timestamp: new Date()
            });
        }
        // Coverage trending up (good)
        if (coverageTrend.direction === 'increasing' && Math.abs(coverageTrend.changePercent) > 1) {
            await this.alertManager.sendAlert({
                level: 'info',
                title: 'Coverage Improving',
                message: `Population coverage improved by ${coverageTrend.changePercent.toFixed(2)}% in the last hour`,
                category: 'coverage',
                trend: coverageTrend,
                timestamp: new Date()
            });
        }
    }
    /**
     * Evaluate business targets
     */
    async evaluateTargets() {
        if (!this.currentKPIs)
            return;
        for (const [targetId, target] of this.businessTargets.entries()) {
            try {
                const currentValue = this.getTargetCurrentValue(target.category, target.metric);
                target.current = currentValue;
                // Update target status
                const performance = (currentValue / target.target) * 100;
                const timeRemaining = target.deadline.getTime() - Date.now();
                const totalDuration = target.deadline.getTime() - (Date.now() - 7 * 24 * 60 * 60 * 1000); // Assume 7-day targets
                const progress = 1 - (timeRemaining / totalDuration);
                if (performance >= 100) {
                    target.status = 'exceeded';
                }
                else if (performance >= target.tolerance) {
                    target.status = 'on_track';
                }
                else if (performance < target.tolerance && progress > 0.8) {
                    target.status = 'at_risk';
                }
                else {
                    target.status = 'missed';
                }
                // Update trend
                target.trend = this.calculateTargetTrend(target);
                // Check for target alerts
                if (target.status === 'at_risk' || target.status === 'missed') {
                    await this.alertManager.sendAlert({
                        level: target.status === 'missed' ? 'error' : 'warning',
                        title: `Business Target ${target.status === 'missed' ? 'Missed' : 'At Risk'}: ${targetId}`,
                        message: `Target ${target.metric} is ${target.current.toFixed(2)} (target: ${target.target}, deadline: ${target.deadline.toISOString()})`,
                        targetId,
                        category: target.category,
                        timestamp: new Date()
                    });
                }
            }
            catch (error) {
                this.logger.error(`Failed to evaluate target ${targetId}:`, error);
            }
        }
    }
    /**
     * Get current value for a target metric
     */
    getTargetCurrentValue(category, metric) {
        if (!this.currentKPIs)
            return 0;
        switch (category) {
            case 'energy':
                switch (metric) {
                    case 'energyPerGB': return this.currentKPIs.energyEfficiency.energyPerGB;
                    case 'greenEnergyRatio': return this.currentKPIs.energyEfficiency.greenEnergyRatio;
                    default: return 0;
                }
            case 'mobility':
                switch (metric) {
                    case 'handoverSuccessRate': return this.currentKPIs.mobilityPerformance.handoverSuccessRate;
                    case 'handoverLatency': return this.currentKPIs.mobilityPerformance.handoverLatency;
                    default: return 0;
                }
            case 'coverage':
                switch (metric) {
                    case 'populationCoverage': return this.currentKPIs.coverageQuality.populationCoverage;
                    case 'qualityScore': return this.currentKPIs.coverageQuality.qualityOfServiceScore;
                    default: return 0;
                }
            case 'capacity':
                switch (metric) {
                    case 'cellUtilization': return this.currentKPIs.capacityManagement.cellUtilization;
                    case 'loadBalancingEfficiency': return this.currentKPIs.capacityManagement.loadBalancingEfficiency;
                    default: return 0;
                }
            case 'quality':
                switch (metric) {
                    case 'customerSatisfaction': return this.currentKPIs.userExperience.customerSatisfactionScore;
                    case 'netPromoterScore': return this.currentKPIs.userExperience.netPromoterScore;
                    default: return 0;
                }
            case 'reliability':
                switch (metric) {
                    case 'availability': return this.currentKPIs.networkReliability.availability;
                    case 'networkHealthScore': return this.currentKPIs.networkReliability.networkHealthScore;
                    default: return 0;
                }
            default:
                return 0;
        }
    }
    /**
     * Calculate target trend
     */
    calculateTargetTrend(target) {
        if (this.historicalKPIs.length < 30)
            return 'stable';
        const recentKPIs = this.historicalKPIs.slice(-30); // Last 30 minutes
        const values = recentKPIs.map(kpis => this.getTargetCurrentValue(target.category, target.metric));
        const trend = this.calculateTrend(values);
        return trend.direction;
    }
    /**
     * Generate business insights
     */
    async generateBusinessInsights() {
        if (!this.currentKPIs || this.historicalKPIs.length < 60)
            return;
        const insights = [];
        // Energy efficiency insights
        if (this.currentKPIs.energyEfficiency.energyPerGB < 0.4) {
            insights.push({
                id: this.generateId(),
                type: 'achievement',
                category: 'energy',
                title: 'Excellent Energy Efficiency',
                description: `Energy per GB is ${this.currentKPIs.energyEfficiency.energyPerGB.toFixed(3)} kWh/GB, exceeding industry standards`,
                impact: 'high',
                confidence: 95,
                actionable: false,
                relatedMetrics: ['energyPerGB', 'greenEnergyRatio'],
                timestamp: new Date()
            });
        }
        // Mobility insights
        if (this.currentKPIs.mobilityPerformance.handoverSuccessRate > 99.5) {
            insights.push({
                id: this.generateId(),
                type: 'achievement',
                category: 'mobility',
                title: 'Outstanding Mobility Performance',
                description: `Handover success rate of ${this.currentKPIs.mobilityPerformance.handoverSuccessRate.toFixed(2)}% demonstrates excellent network optimization`,
                impact: 'high',
                confidence: 90,
                actionable: false,
                relatedMetrics: ['handoverSuccessRate', 'mobilityRobustnessIndex'],
                timestamp: new Date()
            });
        }
        // Coverage insights
        if (this.currentKPIs.coverageQuality.signalStrengthDistribution.poor > 5) {
            insights.push({
                id: this.generateId(),
                type: 'opportunity',
                category: 'coverage',
                title: 'Coverage Optimization Opportunity',
                description: `${this.currentKPIs.coverageQuality.signalStrengthDistribution.poor.toFixed(1)}% of area has poor signal strength`,
                impact: 'medium',
                confidence: 85,
                actionable: true,
                recommendations: [
                    'Perform drive test in poor coverage areas',
                    'Consider additional cell sites or repeaters',
                    'Optimize antenna tilts and power levels'
                ],
                relatedMetrics: ['signalStrengthDistribution', 'coverageHoles'],
                timestamp: new Date()
            });
        }
        // Capacity insights
        if (this.currentKPIs.capacityManagement.cellUtilization > 80) {
            insights.push({
                id: this.generateId(),
                type: 'risk',
                category: 'capacity',
                title: 'High Cell Utilization Risk',
                description: `Cell utilization at ${this.currentKPIs.capacityManagement.cellUtilization.toFixed(1)}% may lead to congestion`,
                impact: 'high',
                confidence: 88,
                actionable: true,
                recommendations: [
                    'Monitor traffic patterns closely',
                    'Consider load balancing optimizations',
                    'Plan capacity expansion for peak hours'
                ],
                relatedMetrics: ['cellUtilization', 'congestionEvents'],
                timestamp: new Date()
            });
        }
        // User experience insights
        if (this.currentKPIs.userExperience.customerSatisfactionScore < 75) {
            insights.push({
                id: this.generateId(),
                type: 'risk',
                category: 'experience',
                title: 'Customer Satisfaction Concern',
                description: `Customer satisfaction score of ${this.currentKPIs.userExperience.customerSatisfactionScore.toFixed(1)} is below target`,
                impact: 'high',
                confidence: 92,
                actionable: true,
                recommendations: [
                    'Analyze customer feedback and complaint patterns',
                    'Review network performance in affected areas',
                    'Implement targeted quality improvements'
                ],
                relatedMetrics: ['customerSatisfactionScore', 'complaintRate'],
                timestamp: new Date()
            });
        }
        // Update insights list
        this.businessInsights = [...this.businessInsights.filter(i => Date.now() - i.timestamp.getTime() < 24 * 60 * 60 * 1000), ...insights]; // Keep last 24 hours
        this.emit('insights:generated', insights);
    }
    /**
     * Generate business report
     */
    async generateBusinessReport() {
        if (!this.currentKPIs)
            return;
        try {
            const report = {
                timestamp: new Date(),
                summary: {
                    networkId: this.currentKPIs.networkId,
                    region: this.currentKPIs.region,
                    overallScore: this.calculateOverallBusinessScore(),
                    keyHighlights: this.getKeyHighlights(),
                    criticalIssues: this.getCriticalIssues()
                },
                kpis: this.currentKPIs,
                targets: Array.from(this.businessTargets.values()),
                insights: this.businessInsights.slice(-10),
                trends: await this.analyzeLongTermBusinessTrends(),
                optimizationImpacts: this.optimizationImpacts.slice(-5),
                recommendations: await this.generateBusinessRecommendations()
            };
            await this.dashboardManager.updateDashboard('business', report);
            this.emit('business:report_generated', report);
        }
        catch (error) {
            this.logger.error('Failed to generate business report:', error);
        }
    }
    /**
     * Calculate overall business score
     */
    calculateOverallBusinessScore() {
        if (!this.currentKPIs)
            return 0;
        let score = 0;
        let weights = 0;
        // Energy efficiency (20% weight)
        score += Math.max(0, 100 - (this.currentKPIs.energyEfficiency.energyPerGB / 0.5) * 100) * 0.2;
        weights += 0.2;
        // Mobility performance (20% weight)
        score += (this.currentKPIs.mobilityPerformance.handoverSuccessRate / 100) * 100 * 0.2;
        weights += 0.2;
        // Coverage quality (20% weight)
        score += (this.currentKPIs.coverageQuality.populationCoverage / 100) * 100 * 0.2;
        weights += 0.2;
        // User experience (20% weight)
        score += (this.currentKPIs.userExperience.customerSatisfactionScore / 100) * 100 * 0.2;
        weights += 0.2;
        // Network reliability (20% weight)
        score += (this.currentKPIs.networkReliability.availability / 100) * 100 * 0.2;
        weights += 0.2;
        return weights > 0 ? Math.round(score / weights) : 0;
    }
    /**
     * Get key highlights
     */
    getKeyHighlights() {
        if (!this.currentKPIs)
            return [];
        const highlights = [];
        if (this.currentKPIs.energyEfficiency.savingsFromOptimization > 15) {
            highlights.push(`Energy savings of ${this.currentKPIs.energyEfficiency.savingsFromOptimization.toFixed(1)}% achieved`);
        }
        if (this.currentKPIs.mobilityPerformance.handoverSuccessRate > 99.5) {
            highlights.push(`Excellent mobility performance with ${this.currentKPIs.mobilityPerformance.handoverSuccessRate.toFixed(2)}% handover success rate`);
        }
        if (this.currentKPIs.coverageQuality.populationCoverage > 99) {
            highlights.push(`Outstanding coverage reaching ${this.currentKPIs.coverageQuality.populationCoverage.toFixed(2)}% of population`);
        }
        if (this.currentKPIs.userExperience.customerSatisfactionScore > 85) {
            highlights.push(`High customer satisfaction score of ${this.currentKPIs.userExperience.customerSatisfactionScore.toFixed(1)}`);
        }
        if (this.currentKPIs.networkReliability.availability > 99.99) {
            highlights.push(`Exceptional network availability at ${this.currentKPIs.networkReliability.availability.toFixed(4)}%`);
        }
        return highlights;
    }
    /**
     * Get critical issues
     */
    getCriticalIssues() {
        if (!this.currentKPIs)
            return [];
        const issues = [];
        if (this.currentKPIs.energyEfficiency.energyPerGB > 0.6) {
            issues.push(`High energy consumption at ${this.currentKPIs.energyEfficiency.energyPerGB.toFixed(3)} kWh/GB`);
        }
        if (this.currentKPIs.mobilityPerformance.callDropRate > 0.5) {
            issues.push(`Elevated call drop rate of ${this.currentKPIs.mobilityPerformance.callDropRate.toFixed(2)}%`);
        }
        if (this.currentKPIs.capacityManagement.cellUtilization > 85) {
            issues.push(`Critical cell utilization at ${this.currentKPIs.capacityManagement.cellUtilization.toFixed(1)}%`);
        }
        if (this.currentKPIs.userExperience.customerSatisfactionScore < 70) {
            issues.push(`Low customer satisfaction score of ${this.currentKPIs.userExperience.customerSatisfactionScore.toFixed(1)}`);
        }
        if (this.currentKPIs.networkReliability.availability < 99.9) {
            issues.push(`Network availability below target at ${this.currentKPIs.networkReliability.availability.toFixed(4)}%`);
        }
        return issues;
    }
    /**
     * Analyze long-term business trends
     */
    async analyzeLongTermTrends() {
        if (this.historicalKPIs.length < 240)
            return null; // Need at least 4 hours
        const last4Hours = this.historicalKPIs.slice(-240);
        return {
            energyEfficiency: this.calculateTrend(last4Hours.map(k => k.energyEfficiency.energyPerGB)),
            mobilityPerformance: this.calculateTrend(last4Hours.map(k => k.mobilityPerformance.handoverSuccessRate)),
            coverageQuality: this.calculateTrend(last4Hours.map(k => k.coverageQuality.populationCoverage)),
            userExperience: this.calculateTrend(last4Hours.map(k => k.userExperience.customerSatisfactionScore)),
            networkReliability: this.calculateTrend(last4Hours.map(k => k.networkReliability.availability))
        };
    }
    /**
     * Generate business recommendations
     */
    async generateBusinessRecommendations() {
        const recommendations = [];
        if (!this.currentKPIs)
            return recommendations;
        // Energy recommendations
        if (this.currentKPIs.energyEfficiency.energyPerGB > 0.5) {
            recommendations.push('Implement advanced energy-saving features during low traffic periods');
        }
        // Mobility recommendations
        if (this.currentKPIs.mobilityPerformance.handoverLatency > 60) {
            recommendations.push('Optimize handover parameters to reduce latency');
        }
        // Coverage recommendations
        if (this.currentKPIs.coverageQuality.coverageHoles > 3) {
            recommendations.push('Address coverage gaps with targeted network improvements');
        }
        // Capacity recommendations
        if (this.currentKPIs.capacityManagement.congestionEvents > 5) {
            recommendations.push('Implement advanced load balancing to reduce congestion');
        }
        // Experience recommendations
        if (this.currentKPIs.userExperience.complaintRate > 5) {
            recommendations.push('Investigate root causes of customer complaints');
        }
        return recommendations;
    }
    /**
     * Record optimization impact
     */
    recordOptimizationImpact(impact) {
        this.optimizationImpacts.push(impact);
        this.logger.info(`Recorded optimization impact for ${impact.optimizationType}`);
        this.emit('optimization:impact_recorded', impact);
    }
    /**
     * Set business target
     */
    setBusinessTarget(target) {
        const fullTarget = {
            ...target,
            current: 0,
            status: 'on_track',
            trend: 'stable'
        };
        this.businessTargets.set(`${target.category}_${target.metric}`, fullTarget);
        this.logger.info(`Set business target: ${target.category}.${target.metric} = ${target.target}`);
    }
    /**
     * Get current KPIs
     */
    getCurrentKPIs() {
        return this.currentKPIs;
    }
    /**
     * Get historical KPIs
     */
    getHistoricalKPIs(limit) {
        if (limit) {
            return this.historicalKPIs.slice(-limit);
        }
        return this.historicalKPIs;
    }
    /**
     * Get business insights
     */
    getBusinessInsights() {
        return this.businessInsights;
    }
    /**
     * Get optimization impacts
     */
    getOptimizationImpacts() {
        return this.optimizationImpacts;
    }
    /**
     * Get business targets
     */
    getBusinessTargets() {
        return Array.from(this.businessTargets.values());
    }
    /**
     * Generate unique ID
     */
    generateId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}
exports.BusinessKPIMonitor = BusinessKPIMonitor;
//# sourceMappingURL=business-kpi-monitor.js.map