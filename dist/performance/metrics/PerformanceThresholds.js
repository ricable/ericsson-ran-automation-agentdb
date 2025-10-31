"use strict";
/**
 * Performance Thresholds and Targets
 *
 * Defines critical, warning, and optimal thresholds for all performance metrics
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceThresholds = void 0;
class PerformanceThresholds {
    static evaluateMetric(metricName, currentValue, category) {
        const criticalThreshold = this.CRITICAL_THRESHOLDS[category]?.[metricName];
        const warningThreshold = this.WARNING_THRESHOLDS[category]?.[metricName];
        const optimalThreshold = this.OPTIMAL_THRESHOLDS[category]?.[metricName];
        if (criticalThreshold !== undefined) {
            // For metrics where lower is better (like latency)
            if (metricName.includes('Speed') || metricName.includes('Latency')) {
                if (currentValue > criticalThreshold)
                    return 'critical';
                if (currentValue > warningThreshold)
                    return 'warning';
                if (currentValue < optimalThreshold)
                    return 'optimal';
            }
            // For metrics where higher is better (like accuracy, efficiency)
            else {
                if (currentValue < criticalThreshold)
                    return 'critical';
                if (currentValue < warningThreshold)
                    return 'warning';
                if (currentValue > optimalThreshold)
                    return 'optimal';
            }
        }
        return 'normal';
    }
    static getThresholdValue(metricName, severity, category) {
        const thresholds = {
            critical: this.CRITICAL_THRESHOLDS,
            warning: this.WARNING_THRESHOLDS,
            optimal: this.OPTIMAL_THRESHOLDS
        };
        return thresholds[severity][category]?.[metricName];
    }
    static calculatePerformanceScore(metrics) {
        let totalScore = 0;
        let metricCount = 0;
        for (const category of Object.keys(metrics)) {
            const categoryMetrics = metrics[category];
            for (const metricName of Object.keys(categoryMetrics)) {
                const currentValue = categoryMetrics[metricName];
                const target = this.PERFORMANCE_TARGETS[category]?.[metricName];
                if (target !== undefined && typeof currentValue === 'number') {
                    // Normalize to 0-1 scale
                    let normalizedScore;
                    if (metricName.includes('Speed') || metricName.includes('Latency')) {
                        // Lower is better
                        normalizedScore = Math.min(1, target / currentValue);
                    }
                    else {
                        // Higher is better
                        normalizedScore = Math.min(1, currentValue / target);
                    }
                    totalScore += normalizedScore;
                    metricCount++;
                }
            }
        }
        return metricCount > 0 ? totalScore / metricCount : 0;
    }
    static getRecommendations(metricName, currentValue, severity, category) {
        const recommendations = [];
        switch (category) {
            case 'reinforcementLearning':
                if (metricName === 'trainingSpeed') {
                    recommendations.push('Optimize neural network architecture for faster training', 'Implement gradient accumulation and mixed precision training', 'Increase computational resources or use GPU acceleration');
                }
                else if (metricName === 'convergenceRate') {
                    recommendations.push('Adjust learning rate and optimization algorithm', 'Implement curriculum learning techniques', 'Increase training data quality and diversity');
                }
                break;
            case 'causalInference':
                if (metricName === 'discoverySpeed') {
                    recommendations.push('Optimize causal graph algorithms with parallel processing', 'Implement incremental causal discovery methods', 'Use approximate causal inference for faster results');
                }
                else if (metricName === 'causalAccuracy') {
                    recommendations.push('Increase sample size and data quality', 'Implement ensemble causal discovery methods', 'Use domain knowledge to constrain causal search space');
                }
                break;
            case 'dspyOptimization':
                if (metricName === 'mobilityImprovement') {
                    recommendations.push('Enhance mobility prediction models with more features', 'Implement adaptive handover algorithms', 'Optimize cell selection and load balancing strategies');
                }
                else if (metricName === 'handoverSuccess') {
                    recommendations.push('Improve signal quality prediction accuracy', 'Implement predictive handover decision making', 'Optimize handover timing and parameter thresholds');
                }
                break;
            case 'agentdbIntegration':
                if (metricName === 'vectorSearchSpeed') {
                    recommendations.push('Optimize vector indexing with HNSW or IVF algorithms', 'Implement query caching and result memoization', 'Scale AgentDB cluster for better parallel processing');
                }
                else if (metricName === 'synchronizationLatency') {
                    recommendations.push('Optimize QUIC protocol configuration for lower latency', 'Implement delta synchronization to reduce data transfer', 'Use compression for synchronization payloads');
                }
                break;
            case 'cognitiveConsciousness':
                if (metricName === 'temporalExpansionRatio') {
                    recommendations.push('Optimize temporal reasoning algorithms for efficiency', 'Implement hierarchical temporal processing', 'Use WASM acceleration for temporal computations');
                }
                else if (metricName === 'autonomousHealingEfficiency') {
                    recommendations.push('Enhance anomaly detection and root cause analysis', 'Implement automated remediation workflows', 'Improve predictive failure detection models');
                }
                break;
        }
        return recommendations;
    }
}
exports.PerformanceThresholds = PerformanceThresholds;
PerformanceThresholds.PERFORMANCE_TARGETS = {
    reinforcementLearning: {
        trainingSpeed: 1.0,
        convergenceRate: 0.95,
        policyAccuracy: 0.90 // >90%
    },
    causalInference: {
        discoverySpeed: 150,
        causalAccuracy: 0.85,
        predictionPrecision: 0.90 // >90%
    },
    dspyOptimization: {
        mobilityImprovement: 0.15,
        handoverSuccess: 0.95,
        coverageOptimization: 0.80 // >80%
    },
    agentdbIntegration: {
        vectorSearchSpeed: 1.0,
        memoryEfficiency: 0.97,
        synchronizationLatency: 1.0 // <1ms QUIC sync
    },
    cognitiveConsciousness: {
        temporalExpansionRatio: 1000,
        autonomousHealingEfficiency: 0.90,
        consciousnessEvolutionScore: 0.80 // >80%
    }
};
PerformanceThresholds.CRITICAL_THRESHOLDS = {
    reinforcementLearning: {
        trainingSpeed: 5.0,
        convergenceRate: 0.70,
        policyAccuracy: 0.60,
        rewardOptimization: 0.50 // <50% is critical
    },
    causalInference: {
        discoverySpeed: 50,
        causalAccuracy: 0.60,
        predictionPrecision: 0.70 // <70% is critical
    },
    dspyOptimization: {
        mobilityImprovement: 0.05,
        handoverSuccess: 0.80,
        coverageOptimization: 0.60 // <60% is critical
    },
    agentdbIntegration: {
        vectorSearchSpeed: 10.0,
        memoryEfficiency: 0.50,
        synchronizationLatency: 10.0 // >10ms is critical
    },
    cognitiveConsciousness: {
        temporalExpansionRatio: 100,
        autonomousHealingEfficiency: 0.50,
        consciousnessEvolutionScore: 0.40 // <40% is critical
    }
};
PerformanceThresholds.WARNING_THRESHOLDS = {
    reinforcementLearning: {
        trainingSpeed: 2.0,
        convergenceRate: 0.85,
        policyAccuracy: 0.75,
        rewardOptimization: 0.65 // <65% is warning
    },
    causalInference: {
        discoverySpeed: 100,
        causalAccuracy: 0.75,
        predictionPrecision: 0.80 // <80% is warning
    },
    dspyOptimization: {
        mobilityImprovement: 0.10,
        handoverSuccess: 0.90,
        coverageOptimization: 0.70 // <70% is warning
    },
    agentdbIntegration: {
        vectorSearchSpeed: 2.0,
        memoryEfficiency: 0.75,
        synchronizationLatency: 2.0 // >2ms is warning
    },
    cognitiveConsciousness: {
        temporalExpansionRatio: 500,
        autonomousHealingEfficiency: 0.70,
        consciousnessEvolutionScore: 0.60 // <60% is warning
    }
};
PerformanceThresholds.OPTIMAL_THRESHOLDS = {
    reinforcementLearning: {
        trainingSpeed: 0.5,
        convergenceRate: 0.98,
        policyAccuracy: 0.95,
        rewardOptimization: 0.90 // >90% is optimal
    },
    causalInference: {
        discoverySpeed: 200,
        causalAccuracy: 0.92,
        predictionPrecision: 0.95 // >95% is optimal
    },
    dspyOptimization: {
        mobilityImprovement: 0.20,
        handoverSuccess: 0.98,
        coverageOptimization: 0.90 // >90% is optimal
    },
    agentdbIntegration: {
        vectorSearchSpeed: 0.5,
        memoryEfficiency: 0.99,
        synchronizationLatency: 0.5 // <0.5ms is optimal
    },
    cognitiveConsciousness: {
        temporalExpansionRatio: 1500,
        autonomousHealingEfficiency: 0.95,
        consciousnessEvolutionScore: 0.90 // >90% is optimal
    }
};
//# sourceMappingURL=PerformanceThresholds.js.map