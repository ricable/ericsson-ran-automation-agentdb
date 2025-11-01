"use strict";
/**
 * Template Variant Generator Examples
 *
 * Comprehensive examples demonstrating how to use the variant generator system
 * for different RAN deployment scenarios.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantGeneratorManager = exports.runAllExamples = exports.exampleAdvancedScenarios = exports.examplePerformanceAnalysis = exports.exampleBatchGeneration = exports.exampleHybridDeployment = exports.exampleNightTimeSleepMode = exports.exampleHighSpeedTrainDeployment = exports.exampleUrbanDeployment = void 0;
const variant_generator_manager_1 = require("../variant-generator-manager");
Object.defineProperty(exports, "VariantGeneratorManager", { enumerable: true, get: function () { return variant_generator_manager_1.VariantGeneratorManager; } });
// Example 1: Urban High-Capacity Deployment
async function exampleUrbanDeployment() {
    console.log('=== Urban High-Capacity Deployment Example ===');
    const manager = new variant_generator_manager_1.VariantGeneratorManager();
    const urbanContext = {
        populationDensity: 'ultra_high',
        buildingType: 'sky_scraper',
        trafficPattern: 'business_district',
        stadiumEvents: false,
        transportHubs: true,
        capacityBoost: 'maximum'
    };
    const combinedContext = {
        primaryScenario: 'urban',
        urbanContext,
        globalSettings: {
            cellCount: 200,
            trafficProfile: 'high',
            energyMode: 'performance',
            targetEnvironment: 'urban_dense_financial_district',
            customOverrides: {
                'SystemConfiguration.deploymentName': 'Manhattan Financial District',
                'SystemConfiguration.operator': 'Example Telecom'
            }
        }
    };
    try {
        const result = await manager.generateVariant('base_4g_template', combinedContext);
        console.log('✅ Urban variant generated successfully');
        console.log(`📊 Generation time: ${result.metadata.generationTime}ms`);
        console.log(`🔧 Optimizations applied: ${result.metadata.optimizationsApplied}`);
        console.log(`📈 Capacity improvement: ${result.performance.estimatedCapacityImprovement}%`);
        console.log(`⚡ Energy savings: ${result.performance.estimatedEnergySavings}%`);
        if (result.validation.warnings.length > 0) {
            console.log('⚠️ Warnings:');
            result.validation.warnings.forEach(warning => console.log(`  - ${warning}`));
        }
        // Get specific recommendations
        const urbanGenerator = manager['urbanGenerator'];
        const recommendations = urbanGenerator.getUrbanRecommendations(urbanContext);
        console.log('\n💡 Urban deployment recommendations:');
        recommendations.forEach(rec => console.log(`  • ${rec}`));
        return result;
    }
    catch (error) {
        console.error('❌ Failed to generate urban variant:', error);
        throw error;
    }
}
exports.exampleUrbanDeployment = exampleUrbanDeployment;
// Example 2: High-Speed Train Deployment
async function exampleHighSpeedTrainDeployment() {
    console.log('\n=== High-Speed Train Deployment Example ===');
    const manager = new variant_generator_manager_1.VariantGeneratorManager();
    const mobilityContext = {
        mobilityType: 'high_speed_train',
        speedRange: { min: 200, max: 350 },
        handoverFrequency: 'very_high',
        cellSize: 'large',
        trafficPattern: 'continuous',
        servicePriority: 'data',
        redundancyLevel: 'maximum'
    };
    const combinedContext = {
        primaryScenario: 'mobility',
        mobilityContext,
        globalSettings: {
            cellCount: 50,
            trafficProfile: 'medium',
            energyMode: 'balanced',
            targetEnvironment: 'high_speed_railway',
            customOverrides: {
                'SystemConfiguration.deploymentName': 'Tokyo-Osaka High-Speed Rail',
                'SystemConfiguration.mobilityOptimization': true
            }
        }
    };
    try {
        const result = await manager.generateVariant('base_5g_template', combinedContext);
        console.log('✅ Mobility variant generated successfully');
        console.log(`📊 Generation time: ${result.metadata.generationTime}ms`);
        console.log(`🔧 Custom functions: ${result.metadata.customFunctionsGenerated}`);
        console.log(`📈 Latency improvement: ${result.performance.estimatedLatencyImprovement}%`);
        console.log(`⚡ Energy savings: ${result.performance.estimatedEnergySavings}%`);
        // Get mobility recommendations
        const mobilityGenerator = manager['mobilityGenerator'];
        const recommendations = mobilityGenerator.getMobilityRecommendations(mobilityContext);
        console.log('\n💡 High-speed train deployment recommendations:');
        recommendations.forEach(rec => console.log(`  • ${rec}`));
        return result;
    }
    catch (error) {
        console.error('❌ Failed to generate mobility variant:', error);
        throw error;
    }
}
exports.exampleHighSpeedTrainDeployment = exampleHighSpeedTrainDeployment;
// Example 3: Night-Time Sleep Mode
async function exampleNightTimeSleepMode() {
    console.log('\n=== Night-Time Sleep Mode Example ===');
    const manager = new variant_generator_manager_1.VariantGeneratorManager();
    const sleepContext = {
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
    };
    const combinedContext = {
        primaryScenario: 'sleep',
        sleepContext,
        globalSettings: {
            cellCount: 100,
            trafficProfile: 'low',
            energyMode: 'energy_saving',
            targetEnvironment: 'residential_night_time',
            customOverrides: {
                'SystemConfiguration.deploymentName': 'Suburban Residential Area',
                'SystemConfiguration.energyOptimization': true
            }
        }
    };
    try {
        const result = await manager.generateVariant('base_4g_template', combinedContext);
        console.log('✅ Sleep mode variant generated successfully');
        console.log(`📊 Generation time: ${result.metadata.generationTime}ms`);
        console.log(`🔧 Conditions added: ${result.metadata.conditionsAdded}`);
        console.log(`📈 Energy savings: ${result.performance.estimatedEnergySavings}%`);
        console.log(`⚡ Capacity reduction: ${Math.abs(result.performance.estimatedCapacityImprovement)}%`);
        // Get sleep mode recommendations
        const sleepGenerator = manager['sleepGenerator'];
        const recommendations = sleepGenerator.getSleepRecommendations(sleepContext);
        console.log('\n💡 Sleep mode deployment recommendations:');
        recommendations.forEach(rec => console.log(`  • ${rec}`));
        return result;
    }
    catch (error) {
        console.error('❌ Failed to generate sleep mode variant:', error);
        throw error;
    }
}
exports.exampleNightTimeSleepMode = exampleNightTimeSleepMode;
// Example 4: Hybrid Deployment (Urban + Mobility)
async function exampleHybridDeployment() {
    console.log('\n=== Hybrid Urban + Mobility Deployment Example ===');
    const manager = new variant_generator_manager_1.VariantGeneratorManager();
    const urbanContext = {
        populationDensity: 'high',
        buildingType: 'mixed',
        trafficPattern: 'mixed_use',
        stadiumEvents: false,
        transportHubs: true,
        capacityBoost: 'high'
    };
    const mobilityContext = {
        mobilityType: 'mixed_transport',
        speedRange: { min: 0, max: 120 },
        handoverFrequency: 'medium',
        cellSize: 'medium',
        trafficPattern: 'continuous',
        servicePriority: 'mixed',
        redundancyLevel: 'standard'
    };
    const combinedContext = {
        primaryScenario: 'hybrid',
        urbanContext,
        mobilityContext,
        hybridConfig: {
            scenarios: ['urban', 'mobility'],
            weights: { urban: 0.6, mobility: 0.4 },
            transitionRules: {
                'high_traffic': 'urban_priority',
                'peak_hours': 'mobility_priority',
                'night_time': 'energy_saving'
            }
        },
        globalSettings: {
            cellCount: 150,
            trafficProfile: 'high',
            energyMode: 'balanced',
            targetEnvironment: 'urban_transport_hub',
            customOverrides: {
                'SystemConfiguration.deploymentName': 'Central Station Area',
                'SystemConfiguration.hybridMode': true
            }
        }
    };
    try {
        const result = await manager.generateVariant('base_5g_template', combinedContext);
        console.log('✅ Hybrid variant generated successfully');
        console.log(`📊 Generation time: ${result.metadata.generationTime}ms`);
        console.log(`🔧 Total optimizations: ${result.metadata.optimizationsApplied}`);
        console.log(`🔀 Hybrid configuration applied with weights:`, combinedContext.hybridConfig?.weights);
        console.log(`📈 Capacity improvement: ${result.performance.estimatedCapacityImprovement}%`);
        console.log(`⚡ Energy savings: ${result.performance.estimatedEnergySavings}%`);
        console.log(`⏱️ Latency improvement: ${result.performance.estimatedLatencyImprovement}%`);
        return result;
    }
    catch (error) {
        console.error('❌ Failed to generate hybrid variant:', error);
        throw error;
    }
}
exports.exampleHybridDeployment = exampleHybridDeployment;
// Example 5: Batch Generation for Multiple Scenarios
async function exampleBatchGeneration() {
    console.log('\n=== Batch Generation Example ===');
    const manager = new variant_generator_manager_1.VariantGeneratorManager();
    const scenarios = [
        // Urban scenarios
        {
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
                targetEnvironment: 'financial_district',
                customOverrides: {}
            }
        },
        // Mobility scenarios
        {
            primaryScenario: 'mobility',
            mobilityContext: {
                mobilityType: 'motorway',
                speedRange: { min: 80, max: 150 },
                handoverFrequency: 'high',
                cellSize: 'large',
                trafficPattern: 'bursty',
                servicePriority: 'mixed',
                redundancyLevel: 'high'
            },
            globalSettings: {
                cellCount: 50,
                trafficProfile: 'medium',
                energyMode: 'balanced',
                targetEnvironment: 'highway_corridor',
                customOverrides: {}
            }
        },
        // Sleep mode scenarios
        {
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
                cellCount: 100,
                trafficProfile: 'low',
                energyMode: 'energy_saving',
                targetEnvironment: 'weekend_mode',
                customOverrides: {}
            }
        }
    ];
    try {
        const startTime = Date.now();
        const results = await manager.generateBatchVariants('base_4g_template', scenarios);
        const totalTime = Date.now() - startTime;
        console.log(`✅ Batch generation completed in ${totalTime}ms`);
        console.log(`📊 Generated ${Object.keys(results).length} variants:`);
        Object.entries(results).forEach(([scenarioKey, result]) => {
            console.log(`\n  📋 ${scenarioKey}:`);
            console.log(`    ✅ Success: ${result.validation.valid ? 'Yes' : 'No'}`);
            console.log(`    ⏱️ Generation time: ${result.metadata.generationTime}ms`);
            console.log(`    🔧 Optimizations: ${result.metadata.optimizationsApplied}`);
            console.log(`    📈 Performance: Capacity ${result.performance.estimatedCapacityImprovement}%, Energy ${result.performance.estimatedEnergySavings}%`);
            if (!result.validation.valid) {
                console.log(`    ❌ Errors: ${result.validation.errors.join(', ')}`);
            }
        });
        return results;
    }
    catch (error) {
        console.error('❌ Batch generation failed:', error);
        throw error;
    }
}
exports.exampleBatchGeneration = exampleBatchGeneration;
// Example 6: Performance Statistics and Recommendations
async function examplePerformanceAnalysis() {
    console.log('\n=== Performance Analysis Example ===');
    const manager = new variant_generator_manager_1.VariantGeneratorManager();
    // Generate several variants to collect statistics
    console.log('Generating variants for performance analysis...');
    await exampleUrbanDeployment();
    await exampleHighSpeedTrainDeployment();
    await exampleNightTimeSleepMode();
    await exampleHybridDeployment();
    // Get generation statistics
    const stats = manager.getGenerationStatistics();
    console.log('\n📊 Generation Statistics:');
    console.log(`  • Total generations: ${stats.totalGenerations}`);
    console.log(`  • Success rate: ${stats.successRate}%`);
    console.log(`  • Average generation time: ${stats.averageGenerationTime}ms`);
    console.log(`  • Variant type distribution:`);
    Object.entries(stats.variantTypeDistribution).forEach(([type, count]) => {
        console.log(`    - ${type}: ${count}`);
    });
    console.log('\n🕐 Recent generations:');
    stats.recentGenerations.forEach((gen, index) => {
        console.log(`  ${index + 1}. ${gen.variantType} - ${gen.success ? '✅' : '❌'} (${gen.generationTime}ms)`);
    });
    // Get recommendations
    console.log('\n💡 System Recommendations:');
    const currentHour = new Date().getHours();
    const recommendations = manager.getRecommendations({
        globalSettings: {
            cellCount: 100,
            trafficProfile: currentHour >= 7 && currentHour <= 19 ? 'high' : 'low',
            energyMode: 'balanced'
        }
    });
    recommendations.forEach(rec => console.log(`  • ${rec}`));
    return stats;
}
exports.examplePerformanceAnalysis = examplePerformanceAnalysis;
// Example 7: Advanced Scenario Testing
async function exampleAdvancedScenarios() {
    console.log('\n=== Advanced Scenario Testing ===');
    const manager = new variant_generator_manager_1.VariantGeneratorManager();
    // Test edge cases and complex scenarios
    const advancedScenarios = [
        {
            name: 'Stadium Event Mode',
            context: {
                primaryScenario: 'urban',
                urbanContext: {
                    populationDensity: 'ultra_high',
                    buildingType: 'mixed',
                    trafficPattern: 'mixed_use',
                    stadiumEvents: true,
                    transportHubs: true,
                    capacityBoost: 'maximum'
                },
                globalSettings: {
                    cellCount: 300,
                    trafficProfile: 'high',
                    energyMode: 'performance',
                    targetEnvironment: 'stadium_event',
                    customOverrides: {
                        'SystemConfiguration.eventMode': true,
                        'SystemConfiguration.temporaryCapacity': true
                    }
                }
            }
        },
        {
            name: 'Airport Deployment',
            context: {
                primaryScenario: 'mobility',
                mobilityContext: {
                    mobilityType: 'airport',
                    speedRange: { min: 0, max: 50 },
                    handoverFrequency: 'medium',
                    cellSize: 'small',
                    trafficPattern: 'scheduled',
                    servicePriority: 'data',
                    redundancyLevel: 'high'
                },
                globalSettings: {
                    cellCount: 80,
                    trafficProfile: 'medium',
                    energyMode: 'balanced',
                    targetEnvironment: 'airport_terminal',
                    customOverrides: {
                        'SystemConfiguration.aviationMode': true,
                        'SystemConfiguration.priorityServices': true
                    }
                }
            }
        },
        {
            name: 'Holiday Energy Saving',
            context: {
                primaryScenario: 'sleep',
                sleepContext: {
                    sleepModeType: 'holiday',
                    energySavingLevel: 'maximum',
                    wakeUpTriggers: ['emergency_call', 'network_alarm'],
                    minimumCapacityGuarantee: 10,
                    trafficProfile: 'mixed',
                    environmentalConsiderations: {
                        temperatureRange: { min: -5, max: 35 },
                        powerSource: 'solar',
                        backupPower: true
                    },
                    serviceObligations: {
                        emergencyServices: true,
                        criticalInfrastructure: false,
                        premiumUsers: false
                    }
                },
                globalSettings: {
                    cellCount: 50,
                    trafficProfile: 'low',
                    energyMode: 'energy_saving',
                    targetEnvironment: 'holiday_season',
                    customOverrides: {
                        'SystemConfiguration.holidayMode': true,
                        'SystemConfiguration.renewableEnergy': true
                    }
                }
            }
        }
    ];
    const results = [];
    for (const scenario of advancedScenarios) {
        console.log(`\n🧪 Testing: ${scenario.name}`);
        try {
            const result = await manager.generateVariant('base_5g_template', scenario.context);
            console.log(`✅ ${scenario.name} - Success`);
            console.log(`   Performance: Capacity ${result.performance.estimatedCapacityImprovement}%, Energy ${result.performance.estimatedEnergySavings}%`);
            if (result.validation.warnings.length > 0) {
                console.log(`   Warnings: ${result.validation.warnings.join(', ')}`);
            }
            results.push({ name: scenario.name, success: true, result });
        }
        catch (error) {
            console.error(`❌ ${scenario.name} - Failed:`, error);
            results.push({ name: scenario.name, success: false, error });
        }
    }
    const successCount = results.filter(r => r.success).length;
    console.log(`\n📊 Advanced scenarios completed: ${successCount}/${results.length} successful`);
    return results;
}
exports.exampleAdvancedScenarios = exampleAdvancedScenarios;
// Main function to run all examples
async function runAllExamples() {
    console.log('🚀 Template Variant Generator - Complete Example Suite\n');
    try {
        await exampleUrbanDeployment();
        await exampleHighSpeedTrainDeployment();
        await exampleNightTimeSleepMode();
        await exampleHybridDeployment();
        await exampleBatchGeneration();
        await examplePerformanceAnalysis();
        await exampleAdvancedScenarios();
        console.log('\n🎉 All examples completed successfully!');
    }
    catch (error) {
        console.error('\n💥 Example suite failed:', error);
        throw error;
    }
}
exports.runAllExamples = runAllExamples;
//# sourceMappingURL=variant-generator-examples.js.map