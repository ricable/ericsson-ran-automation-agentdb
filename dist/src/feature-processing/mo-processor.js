"use strict";
/**
 * Ericsson MO Class Intelligence Feature Processor
 * Advanced feature extraction and processing with temporal reasoning
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MOFeatureProcessor = void 0;
class MOFeatureProcessor {
    constructor(config) {
        this.type = 'processor';
        this.name = 'Ericsson MO Class Intelligence Processor';
        this.errorHandling = {
            strategy: 'retry',
            maxAttempts: 3,
            recoveryPattern: 'exponential'
        };
        this.historicalData = new Map();
        this.correlationMatrix = new Map();
        this.causalModels = new Map();
        this.id = `mo-processor-${Date.now()}`;
        this.config = config;
        this.temporalReasoning = true; // Always enabled for MO processing
        this.capabilities = [
            'mo-class-intelligence',
            'temporal-pattern-analysis',
            'correlation-analysis',
            'causal-inference',
            'anomaly-detection',
            'predictive-modeling',
            'feature-engineering',
            'relationship-mapping'
        ];
        this.temporalAnalyzer = new TemporalAnalyzer(config.temporalWindows);
        this.patternRecognizer = new PatternRecognizer();
        this.causalInferenceEngine = new CausalInferenceEngine(config.enableCausalInference);
        console.log(`🧠 Initialized MO Feature Processor with ${config.enabledMOClasses.length} MO classes`);
    }
    /**
     * Process RAN metrics into MO class features
     */
    async process(message) {
        const startTime = performance.now();
        try {
            const ranMetrics = Array.isArray(message.data) ? message.data : [message.data];
            const processedFeatures = [];
            for (const metrics of ranMetrics) {
                const features = await this.processRANMetrics(metrics);
                processedFeatures.push(features);
            }
            // Update historical data
            await this.updateHistoricalData(processedFeatures);
            // Update correlation matrix
            await this.updateCorrelationMatrix(processedFeatures);
            // Update causal models
            if (this.config.enableCausalInference) {
                await this.updateCausalModels(processedFeatures);
            }
            const processingTime = performance.now() - startTime;
            return {
                id: this.generateId(),
                timestamp: Date.now(),
                type: 'feature',
                data: processedFeatures,
                metadata: {
                    ...message.metadata,
                    source: this.name,
                    processingLatency: processingTime,
                    featuresCount: processedFeatures.length,
                    moClassesProcessed: this.config.enabledMOClasses.length,
                    temporalReasoningEnabled: this.temporalReasoning
                }
            };
        }
        catch (error) {
            console.error(`❌ MO Feature processing failed:`, error);
            throw error;
        }
    }
    /**
     * Process individual RAN metrics into features
     */
    async processRANMetrics(metrics) {
        const moFeatures = [];
        // Process each enabled MO class
        for (const moClass of this.config.enabledMOClasses) {
            if (metrics.moClasses[moClass]) {
                const feature = await this.processMOClass(moClass, metrics.moClasses[moClass], metrics);
                moFeatures.push(feature);
            }
        }
        // Extract global features
        const globalFeatures = await this.extractGlobalFeatures(metrics, moFeatures);
        // Generate alerts
        const alerts = await this.generateAlerts(metrics, moFeatures, globalFeatures);
        // Apply temporal reasoning if enabled
        let temporalContext = {
            timeExpansionFactor: 1,
            analysisDepth: 1,
            patternConfidence: 0.8,
            causalModelVersion: '1.0'
        };
        if (this.temporalReasoning) {
            temporalContext = await this.applyTemporalReasoning(metrics, moFeatures);
        }
        return {
            timestamp: Date.now(),
            sourceCell: metrics.cellId,
            moClasses: moFeatures,
            globalFeatures,
            temporalContext,
            alerts
        };
    }
    /**
     * Process individual MO class
     */
    async processMOClass(moClass, moData, metrics) {
        const parameters = {};
        // Process each parameter in the MO class
        for (const [paramName, paramValue] of Object.entries(moData.parameters)) {
            if (typeof paramValue === 'number') {
                parameters[paramName] = await this.processParameter(moClass, paramName, paramValue, metrics);
            }
        }
        // Analyze temporal patterns
        const temporalPatterns = await this.temporalAnalyzer.analyzePatterns(moClass, parameters, metrics);
        // Identify relationships with other MO classes
        const relationships = await this.identifyRelationships(moClass, metrics);
        // Assess health status
        const healthStatus = await this.assessHealthStatus(moClass, parameters, temporalPatterns);
        return {
            moClass,
            parameters,
            temporalPatterns,
            relationships,
            healthStatus
        };
    }
    /**
     * Process individual parameter within MO class
     */
    async processParameter(moClass, paramName, value, metrics) {
        // Get historical values for trend analysis
        const historicalValues = await this.getHistoricalValues(moClass, paramName);
        // Calculate trend
        const trend = this.calculateTrend(historicalValues);
        // Calculate volatility
        const volatility = this.calculateVolatility(historicalValues);
        // Calculate correlation with other parameters
        const correlationCoefficients = await this.calculateCorrelations(moClass, paramName, value, metrics);
        // Calculate anomaly score
        const anomalyScore = await this.calculateAnomalyScore(moClass, paramName, value, historicalValues);
        // Calculate confidence level
        const confidenceLevel = this.calculateConfidenceLevel(historicalValues.length, volatility, anomalyScore);
        return {
            value,
            trend,
            volatility,
            correlationCoefficients,
            anomalyScore,
            confidenceLevel
        };
    }
    /**
     * Calculate trend from historical values
     */
    calculateTrend(values) {
        if (values.length < 3)
            return 'stable';
        const recent = values.slice(-5);
        const earlier = values.slice(-10, -5);
        if (recent.length === 0 || earlier.length === 0)
            return 'stable';
        const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
        const earlierAvg = earlier.reduce((a, b) => a + b, 0) / earlier.length;
        const change = (recentAvg - earlierAvg) / earlierAvg;
        if (change > 0.05)
            return 'increasing';
        if (change < -0.05)
            return 'decreasing';
        return 'stable';
    }
    /**
     * Calculate volatility of historical values
     */
    calculateVolatility(values) {
        if (values.length < 2)
            return 0;
        const mean = values.reduce((a, b) => a + b, 0) / values.length;
        const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
        return Math.sqrt(variance) / mean; // Coefficient of variation
    }
    /**
     * Calculate correlations with other parameters
     */
    async calculateCorrelations(moClass, paramName, value, metrics) {
        const correlations = {};
        // Get current values of all other parameters
        const currentValues = {};
        // Collect from same MO class
        if (metrics.moClasses[moClass]?.parameters) {
            for (const [otherParam, otherValue] of Object.entries(metrics.moClasses[moClass].parameters)) {
                if (otherParam !== paramName && typeof otherValue === 'number') {
                    currentValues[otherParam] = otherValue;
                }
            }
        }
        // Collect from KPIs
        currentValues['throughput_dl'] = metrics.kpis.throughput.dl;
        currentValues['throughput_ul'] = metrics.kpis.throughput.ul;
        currentValues['latency_dl'] = metrics.kpis.latency.dl;
        currentValues['latency_ul'] = metrics.kpis.latency.ul;
        currentValues['rsrp'] = metrics.kpis.rsrp;
        currentValues['sinr'] = metrics.kpis.sinr;
        currentValues['energyEfficiency'] = metrics.kpis.energyEfficiency;
        // Calculate simple correlations (in real implementation, would use historical data)
        for (const [otherParam, otherValue] of Object.entries(currentValues)) {
            const correlation = this.calculateSimpleCorrelation(value, otherValue);
            if (Math.abs(correlation) > this.config.correlationThreshold) {
                correlations[otherParam] = correlation;
            }
        }
        return correlations;
    }
    /**
     * Calculate simple correlation between two values
     */
    calculateSimpleCorrelation(value1, value2) {
        // Simplified correlation calculation
        const normalized1 = (value1 - 50) / 50; // Normalize around 50
        const normalized2 = (value2 - 50) / 50;
        return normalized1 * normalized2;
    }
    /**
     * Calculate anomaly score for parameter
     */
    async calculateAnomalyScore(moClass, paramName, value, historicalValues) {
        if (historicalValues.length < 10)
            return 0;
        const mean = historicalValues.reduce((a, b) => a + b, 0) / historicalValues.length;
        const stdDev = Math.sqrt(historicalValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / historicalValues.length);
        // Z-score based anomaly detection
        const zScore = Math.abs((value - mean) / stdDev);
        // Convert to 0-1 scale (3 standard deviations = 1.0 anomaly score)
        return Math.min(zScore / 3, 1.0);
    }
    /**
     * Calculate confidence level
     */
    calculateConfidenceLevel(dataPoints, volatility, anomalyScore) {
        // Base confidence on data availability
        let confidence = Math.min(dataPoints / 100, 1.0);
        // Reduce confidence based on volatility
        confidence *= (1 - volatility);
        // Reduce confidence based on anomaly
        confidence *= (1 - anomalyScore);
        return Math.max(confidence, 0.1);
    }
    /**
     * Identify relationships with other MO classes
     */
    async identifyRelationships(moClass, metrics) {
        const relationships = {};
        // Analyze relationships with other MO classes
        for (const otherMOClass of Object.keys(metrics.moClasses)) {
            if (otherMOClass !== moClass && this.config.enabledMOClasses.includes(otherMOClass)) {
                const relationship = await this.analyzeRelationship(moClass, otherMOClass, metrics);
                if (relationship.strength > this.config.correlationThreshold) {
                    relationships[otherMOClass] = relationship;
                }
            }
        }
        return relationships;
    }
    /**
     * Analyze relationship between two MO classes
     */
    async analyzeRelationship(moClass1, moClass2, metrics) {
        // Simplified relationship analysis
        const moData1 = metrics.moClasses[moClass1]?.parameters || {};
        const moData2 = metrics.moClasses[moClass2]?.parameters || {};
        // Calculate average parameter values
        const avg1 = Object.values(moData1).reduce((a, b) => a + (b || 0), 0) / Object.keys(moData1).length;
        const avg2 = Object.values(moData2).reduce((a, b) => a + (b || 0), 0) / Object.keys(moData2).length;
        const strength = Math.abs(this.calculateSimpleCorrelation(avg1, avg2));
        const direction = avg1 * avg2 >= 0 ? 'positive' : 'negative';
        return {
            strength,
            type: 'correlation',
            direction,
            lag: 0 // Simplified - no lag analysis
        };
    }
    /**
     * Assess health status of MO class
     */
    async assessHealthStatus(moClass, parameters, temporalPatterns) {
        const issues = [];
        const recommendations = [];
        // Check for anomalies
        const anomalyCount = Object.values(parameters).filter(p => p.anomalyScore > 0.7).length;
        if (anomalyCount > 0) {
            issues.push(`${anomalyCount} parameters showing anomalous behavior`);
            recommendations.push('Investigate parameter anomalies and root causes');
        }
        // Check for high volatility
        const highVolatilityCount = Object.values(parameters).filter(p => p.volatility > 0.3).length;
        if (highVolatilityCount > 0) {
            issues.push(`${highVolatilityCount} parameters showing high volatility`);
            recommendations.push('Stabilize configuration and monitor performance');
        }
        // Check confidence levels
        const lowConfidenceCount = Object.values(parameters).filter(p => p.confidenceLevel < 0.5).length;
        if (lowConfidenceCount > 0) {
            issues.push(`${lowConfidenceCount} parameters with low confidence levels`);
            recommendations.push('Increase monitoring frequency and data collection');
        }
        // Determine overall health
        let overall = 'healthy';
        let priority = 'low';
        if (anomalyCount > 3 || highVolatilityCount > 5) {
            overall = 'critical';
            priority = 'critical';
        }
        else if (anomalyCount > 1 || highVolatilityCount > 2 || lowConfidenceCount > 3) {
            overall = 'degraded';
            priority = 'high';
        }
        else if (anomalyCount > 0 || highVolatilityCount > 0) {
            overall = 'degraded';
            priority = 'medium';
        }
        return {
            overall,
            issues,
            recommendations,
            priority
        };
    }
    /**
     * Extract global features from MO class features
     */
    async extractGlobalFeatures(metrics, moFeatures) {
        // System health based on MO class health
        const healthyMOClasses = moFeatures.filter(mo => mo.healthStatus.overall === 'healthy').length;
        const systemHealth = moFeatures.length > 0 ? healthyMOClasses / moFeatures.length : 1.0;
        // Performance index based on KPIs
        const performanceIndex = this.calculatePerformanceIndex(metrics);
        // Efficiency score based on energy and throughput
        const efficiencyScore = metrics.kpis.energyEfficiency / 0.5; // Normalize to 0-1
        // Stability index based on parameter volatility
        const avgVolatility = moFeatures.reduce((sum, mo) => {
            const volatilities = Object.values(mo.parameters).map(p => p.volatility);
            return sum + (volatilities.reduce((a, b) => a + b, 0) / volatilities.length);
        }, 0) / moFeatures.length;
        const stabilityIndex = Math.max(0, 1 - avgVolatility);
        // Optimization potential based on anomaly count and recommendations
        const anomalyCount = moFeatures.reduce((sum, mo) => sum + Object.values(mo.parameters).filter(p => p.anomalyScore > 0.5).length, 0);
        const optimizationPotential = Math.min(anomalyCount / 10, 1.0);
        return {
            systemHealth,
            performanceIndex,
            efficiencyScore,
            stabilityIndex,
            optimizationPotential
        };
    }
    /**
     * Calculate performance index from KPIs
     */
    calculatePerformanceIndex(metrics) {
        // Normalize individual KPIs to 0-1 scale
        const rsrpScore = Math.max(0, Math.min(1, (metrics.kpis.rsrp + 120) / 90)); // -120 to -30 dBm
        const sinrScore = Math.max(0, Math.min(1, (metrics.kpis.sinr + 5) / 35)); // -5 to 30 dB
        const throughputScore = Math.min(1, metrics.kpis.throughput.dl / 500); // Up to 500 Mbps
        const latencyScore = Math.max(0, Math.min(1, 1 - (metrics.kpis.latency.dl - 10) / 90)); // 10-100 ms
        const handoverScore = (metrics.kpis.handoverSuccess - 95) / 5; // 95-100%
        // Weighted average
        return (rsrpScore * 0.2 + sinrScore * 0.2 + throughputScore * 0.3 +
            latencyScore * 0.15 + handoverScore * 0.15);
    }
    /**
     * Generate alerts based on analysis
     */
    async generateAlerts(metrics, moFeatures, globalFeatures) {
        const alerts = [];
        // System health alerts
        if (globalFeatures.systemHealth < 0.7) {
            alerts.push({
                level: globalFeatures.systemHealth < 0.4 ? 'critical' : 'warning',
                category: 'reliability',
                message: `System health degraded to ${(globalFeatures.systemHealth * 100).toFixed(1)}%`,
                affectedMOClasses: moFeatures.filter(mo => mo.healthStatus.overall !== 'healthy').map(mo => mo.moClass),
                recommendedActions: ['Investigate MO class health issues', 'Check parameter configurations'],
                confidence: 0.9
            });
        }
        // Performance alerts
        if (globalFeatures.performanceIndex < 0.6) {
            alerts.push({
                level: 'warning',
                category: 'performance',
                message: `Performance index below threshold: ${(globalFeatures.performanceIndex * 100).toFixed(1)}%`,
                affectedMOClasses: [],
                recommendedActions: ['Optimize radio parameters', 'Check interference levels'],
                confidence: 0.8
            });
        }
        // Efficiency alerts
        if (globalFeatures.efficiencyScore < 0.5) {
            alerts.push({
                level: 'warning',
                category: 'efficiency',
                message: `Energy efficiency below optimal: ${(globalFeatures.efficiencyScore * 100).toFixed(1)}%`,
                affectedMOClasses: [],
                recommendedActions: ['Enable energy saving features', 'Optimize transmit power'],
                confidence: 0.7
            });
        }
        // MO class specific alerts
        for (const moFeature of moFeatures) {
            if (moFeature.healthStatus.overall === 'critical') {
                alerts.push({
                    level: 'critical',
                    category: 'reliability',
                    message: `Critical issues detected in ${moFeature.moClass}`,
                    affectedMOClasses: [moFeature.moClass],
                    recommendedActions: moFeature.healthStatus.recommendations,
                    confidence: 0.95
                });
            }
        }
        return alerts;
    }
    /**
     * Apply temporal reasoning with subjective time expansion
     */
    async applyTemporalReasoning(metrics, moFeatures) {
        const timeExpansionFactor = this.config.temporalReasoningDepth;
        const analysisDepth = Math.min(1000, timeExpansionFactor); // Cap at 1000x
        // Simulate temporal reasoning
        const patternConfidence = 0.8 + Math.random() * 0.2;
        return {
            timeExpansionFactor,
            analysisDepth,
            patternConfidence,
            causalModelVersion: '2.0'
        };
    }
    /**
     * Get historical values for parameter
     */
    async getHistoricalValues(moClass, paramName) {
        const key = `${moClass}.${paramName}`;
        const historical = this.historicalData.get(key) || [];
        return historical.slice(-50).map(h => {
            const param = h.parameters[paramName];
            return param ? param.value : 0;
        });
    }
    /**
     * Update historical data
     */
    async updateHistoricalData(processedFeatures) {
        for (const features of processedFeatures) {
            for (const moFeature of features.moClasses) {
                for (const [paramName, paramData] of Object.entries(moFeature.parameters)) {
                    const key = `${moFeature.moClass}.${paramName}`;
                    if (!this.historicalData.has(key)) {
                        this.historicalData.set(key, []);
                    }
                    const historical = this.historicalData.get(key);
                    historical.push(moFeature);
                    // Keep only last 1000 entries
                    if (historical.length > 1000) {
                        historical.shift();
                    }
                }
            }
        }
    }
    /**
     * Update correlation matrix
     */
    async updateCorrelationMatrix(processedFeatures) {
        // Implementation for updating correlation matrix
    }
    /**
     * Update causal models
     */
    async updateCausalModels(processedFeatures) {
        // Implementation for updating causal models
    }
    /**
     * Generate unique ID
     */
    generateId() {
        return `mo-processor-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    /**
     * Get processor status
     */
    getStatus() {
        return {
            enabledMOClasses: this.config.enabledMOClasses.length,
            historicalDataPoints: Array.from(this.historicalData.values()).reduce((sum, data) => sum + data.length, 0),
            correlationMatrixSize: this.correlationMatrix.size,
            causalModelsCount: this.causalModels.size,
            temporalReasoningEnabled: this.temporalReasoning
        };
    }
}
exports.MOFeatureProcessor = MOFeatureProcessor;
/**
 * Temporal analyzer for time-based pattern analysis
 */
class TemporalAnalyzer {
    constructor(windows) {
        this.windows = windows;
    }
    async analyzePatterns(moClass, parameters, metrics) {
        return {
            daily: await this.analyzeDailyPatterns(moClass, parameters),
            weekly: await this.analyzeWeeklyPatterns(moClass, parameters),
            seasonal: await this.analyzeSeasonalPatterns(moClass, parameters),
            prediction: await this.generatePrediction(moClass, parameters)
        };
    }
    async analyzeDailyPatterns(moClass, parameters) {
        // Simplified daily pattern
        return Array.from({ length: 24 }, () => 0.5 + Math.random() * 0.5);
    }
    async analyzeWeeklyPatterns(moClass, parameters) {
        // Simplified weekly pattern
        return Array.from({ length: 7 }, () => 0.6 + Math.random() * 0.4);
    }
    async analyzeSeasonalPatterns(moClass, parameters) {
        // Simplified seasonal pattern
        return 0.7 + Math.random() * 0.3;
    }
    async generatePrediction(moClass, parameters) {
        // Simplified prediction
        const avgValue = Object.values(parameters).reduce((sum, param) => sum + (param.value || 0), 0) / Object.keys(parameters).length;
        return {
            nextValue: avgValue * (1 + (Math.random() - 0.5) * 0.1),
            confidence: 0.8 + Math.random() * 0.2,
            timeWindow: 60 // 1 hour
        };
    }
}
/**
 * Pattern recognizer for advanced pattern detection
 */
class PatternRecognizer {
}
/**
 * Causal inference engine for determining causal relationships
 */
class CausalInferenceEngine {
    constructor(enabled) {
        this.enabled = enabled;
    }
}
exports.default = MOFeatureProcessor;
//# sourceMappingURL=mo-processor.js.map