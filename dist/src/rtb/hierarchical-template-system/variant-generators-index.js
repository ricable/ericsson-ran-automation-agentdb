"use strict";
/**
 * RTB Hierarchical Template System - Variant Generators
 *
 * Comprehensive template variant generation system for RAN deployment scenarios.
 * Supports urban high-capacity, high mobility, and sleep mode variants with
 * intelligent optimization and context-aware generation.
 *
 * Main Components:
 * - VariantGeneratorCore: Core generation engine with template inheritance
 * - UrbanVariantGenerator: High-capacity urban deployment variants (Priority 20)
 * - MobilityVariantGenerator: High-speed mobility variants (Priority 30)
 * - SleepVariantGenerator: Energy-saving sleep mode variants (Priority 40)
 * - VariantGeneratorManager: Unified management and orchestration
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.usageGuidelines = exports.getSystemInfo = exports.generateVariantForScenario = exports.createVariantGeneratorManager = exports.runAllExamples = exports.exampleAdvancedScenarios = exports.examplePerformanceAnalysis = exports.exampleBatchGeneration = exports.exampleHybridDeployment = exports.exampleNightTimeSleepMode = exports.exampleHighSpeedTrainDeployment = exports.exampleUrbanDeployment = exports.VariantGeneratorManager = exports.SleepVariantGenerator = exports.MobilityVariantGenerator = exports.UrbanVariantGenerator = exports.VariantGeneratorCore = void 0;
// Core exports
var variant_generator_core_1 = require("../variant-generator-core");
Object.defineProperty(exports, "VariantGeneratorCore", { enumerable: true, get: function () { return variant_generator_core_1.VariantGeneratorCore; } });
// Variant generators
var urban_variant_1 = require("./urban-variant");
Object.defineProperty(exports, "UrbanVariantGenerator", { enumerable: true, get: function () { return urban_variant_1.UrbanVariantGenerator; } });
var mobility_variant_1 = require("./mobility-variant");
Object.defineProperty(exports, "MobilityVariantGenerator", { enumerable: true, get: function () { return mobility_variant_1.MobilityVariantGenerator; } });
var sleep_variant_1 = require("./sleep-variant");
Object.defineProperty(exports, "SleepVariantGenerator", { enumerable: true, get: function () { return sleep_variant_1.SleepVariantGenerator; } });
// Management and orchestration
var variant_generator_manager_1 = require("../variant-generator-manager");
Object.defineProperty(exports, "VariantGeneratorManager", { enumerable: true, get: function () { return variant_generator_manager_1.VariantGeneratorManager; } });
// Examples and usage patterns
var variant_generator_examples_1 = require("../examples/variant-generator-examples");
Object.defineProperty(exports, "exampleUrbanDeployment", { enumerable: true, get: function () { return variant_generator_examples_1.exampleUrbanDeployment; } });
Object.defineProperty(exports, "exampleHighSpeedTrainDeployment", { enumerable: true, get: function () { return variant_generator_examples_1.exampleHighSpeedTrainDeployment; } });
Object.defineProperty(exports, "exampleNightTimeSleepMode", { enumerable: true, get: function () { return variant_generator_examples_1.exampleNightTimeSleepMode; } });
Object.defineProperty(exports, "exampleHybridDeployment", { enumerable: true, get: function () { return variant_generator_examples_1.exampleHybridDeployment; } });
Object.defineProperty(exports, "exampleBatchGeneration", { enumerable: true, get: function () { return variant_generator_examples_1.exampleBatchGeneration; } });
Object.defineProperty(exports, "examplePerformanceAnalysis", { enumerable: true, get: function () { return variant_generator_examples_1.examplePerformanceAnalysis; } });
Object.defineProperty(exports, "exampleAdvancedScenarios", { enumerable: true, get: function () { return variant_generator_examples_1.exampleAdvancedScenarios; } });
Object.defineProperty(exports, "runAllExamples", { enumerable: true, get: function () { return variant_generator_examples_1.runAllExamples; } });
/**
 * Factory function to create a pre-configured variant generator manager
 * with all generators initialized and ready for use.
 */
function createVariantGeneratorManager() {
    return new VariantGeneratorManager();
}
exports.createVariantGeneratorManager = createVariantGeneratorManager;
/**
 * Quick generation function for common scenarios
 */
async function generateVariantForScenario(scenario, baseTemplateName, customizations) {
    const manager = createVariantGeneratorManager();
    switch (scenario) {
        case 'urban_dense':
            return await manager.generateVariant(baseTemplateName, {
                primaryScenario: 'urban',
                urbanContext: {
                    populationDensity: 'ultra_high',
                    buildingType: 'sky_scraper',
                    trafficPattern: 'business_district',
                    stadiumEvents: false,
                    transportHubs: true,
                    capacityBoost: 'maximum'
                },
                globalSettings: {
                    cellCount: 200,
                    trafficProfile: 'high',
                    energyMode: 'performance',
                    targetEnvironment: 'urban_dense',
                    customOverrides: customizations || {}
                }
            });
        case 'high_speed_train':
            return await manager.generateVariant(baseTemplateName, {
                primaryScenario: 'mobility',
                mobilityContext: {
                    mobilityType: 'high_speed_train',
                    speedRange: { min: 200, max: 350 },
                    handoverFrequency: 'very_high',
                    cellSize: 'large',
                    trafficPattern: 'continuous',
                    servicePriority: 'data',
                    redundancyLevel: 'maximum'
                },
                globalSettings: {
                    cellCount: 50,
                    trafficProfile: 'medium',
                    energyMode: 'balanced',
                    targetEnvironment: 'high_speed_railway',
                    customOverrides: customizations || {}
                }
            });
        case 'night_time':
            return await manager.generateVariant(baseTemplateName, {
                primaryScenario: 'sleep',
                sleepContext: {
                    sleepModeType: 'night_time',
                    energySavingLevel: 'maximum',
                    wakeUpTriggers: ['emergency_call', 'high_traffic', 'time_based'],
                    minimumCapacityGuarantee: 20,
                    trafficProfile: 'residential',
                    environmentalConsiderations: {
                        temperatureRange: { min: 15, max: 25 },
                        powerSource: 'grid',
                        backupPower: true
                    },
                    serviceObligations: {
                        emergencyServices: true,
                        criticalInfrastructure: false,
                        premiumUsers: false
                    }
                },
                globalSettings: {
                    cellCount: 100,
                    trafficProfile: 'low',
                    energyMode: 'energy_saving',
                    targetEnvironment: 'night_time',
                    customOverrides: customizations || {}
                }
            });
        case 'weekend':
            return await manager.generateVariant(baseTemplateName, {
                primaryScenario: 'sleep',
                sleepContext: {
                    sleepModeType: 'weekend',
                    energySavingLevel: 'aggressive',
                    wakeUpTriggers: ['emergency_call', 'scheduled_events'],
                    minimumCapacityGuarantee: 30,
                    trafficProfile: 'mixed',
                    environmentalConsiderations: {
                        temperatureRange: { min: 18, max: 30 },
                        powerSource: 'hybrid',
                        backupPower: true
                    },
                    serviceObligations: {
                        emergencyServices: true,
                        criticalInfrastructure: true,
                        premiumUsers: true
                    }
                },
                globalSettings: {
                    cellCount: 80,
                    trafficProfile: 'low',
                    energyMode: 'energy_saving',
                    targetEnvironment: 'weekend_mode',
                    customOverrides: customizations || {}
                }
            });
        default:
            throw new Error(`Unknown scenario: ${scenario}`);
    }
}
exports.generateVariantForScenario = generateVariantForScenario;
/**
 * Get variant generator system information
 */
function getSystemInfo() {
    return {
        version: '1.0.0',
        name: 'RTB Hierarchical Template System - Variant Generators',
        description: 'Advanced template variant generation for RAN deployment scenarios',
        supportedScenarios: ['urban', 'mobility', 'sleep', 'hybrid'],
        features: [
            'Priority-based template inheritance',
            'Context-aware optimization',
            'Custom function generation',
            'Conditional logic support',
            'Performance estimation',
            'Batch generation',
            'Validation framework',
            'Statistics tracking'
        ],
        performanceTargets: {
            generationTime: '< 100ms per variant',
            batchProcessing: '< 5 seconds for 10 variants',
            memoryUsage: '< 50MB for typical deployments',
            validationTime: '< 10ms per template'
        }
    };
}
exports.getSystemInfo = getSystemInfo;
/**
 * Recommended usage patterns and best practices
 */
exports.usageGuidelines = {
    recommendedPriorities: {
        urban: 20,
        mobility: 30,
        sleep: 40,
        hybrid: 25
    },
    bestPractices: [
        'Always validate generated templates before deployment',
        'Use custom overrides for deployment-specific parameters',
        'Monitor generation statistics for performance optimization',
        'Test variants in staging environments before production',
        'Use batch generation for multiple scenarios',
        'Leverage recommendations for optimal variant selection',
        'Track optimization history for learning and improvement'
    ],
    integrationTips: [
        'Register base templates before variant generation',
        'Use context objects for complex deployment scenarios',
        'Implement proper error handling for generation failures',
        'Cache generated variants for repeated use',
        'Use performance statistics to optimize generation pipeline'
    ]
};
// Default export for convenience
exports.default = {
    VariantGeneratorManager,
    createVariantGeneratorManager,
    generateVariantForScenario,
    getSystemInfo,
    usageGuidelines: exports.usageGuidelines
};
//# sourceMappingURL=variant-generators-index.js.map