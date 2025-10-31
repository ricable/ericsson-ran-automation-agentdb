"use strict";
/**
 * 4G4G Frequency Relations Templates (Priority 50)
 *
 * Comprehensive LTE inter-frequency configuration templates for Ericsson RAN
 * including carrier aggregation, mobility optimization, and interference coordination
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculate4G4GMetrics = exports.getFrequencyRange = exports.getSecondaryCellCount = exports.getSupportedMaxBandwidth = exports.isValidCACombination = exports.FREQ_4G4G_TEMPLATES = exports.COVERAGE_EXPANSION_4G4G_TEMPLATE = exports.INTERFERENCE_4G4G_TEMPLATE = exports.LOAD_BALANCING_4G4G_TEMPLATE = exports.CA_4G4G_TEMPLATE = exports.STANDARD_4G4G_TEMPLATE = exports.EICIC_INTERFERENCE_SETTINGS = exports.STANDARD_CAPACITY_SHARING = exports.CONSERVATIVE_4G4G_HANDOVER = exports.AGGRESSIVE_4G4G_HANDOVER = exports.STANDARD_4G4G_HANDOVER = exports.LTE_BANDS = void 0;
/**
 * Common LTE frequency bands
 */
exports.LTE_BANDS = {
    1: {
        bandNumber: 1,
        frequencyRange: {
            uplink: { start: 1920, end: 1980 },
            downlink: { start: 2110, end: 2170 }
        },
        bandCategory: 'LTE',
        primaryUse: 'CAPACITY'
    },
    3: {
        bandNumber: 3,
        frequencyRange: {
            uplink: { start: 1710, end: 1785 },
            downlink: { start: 1805, end: 1880 }
        },
        bandCategory: 'LTE',
        primaryUse: 'CAPACITY'
    },
    7: {
        bandNumber: 7,
        frequencyRange: {
            uplink: { start: 2500, end: 2570 },
            downlink: { start: 2620, end: 2690 }
        },
        bandCategory: 'LTE',
        primaryUse: 'CAPACITY'
    },
    20: {
        bandNumber: 20,
        frequencyRange: {
            uplink: { start: 832, end: 862 },
            downlink: { start: 791, end: 821 }
        },
        bandCategory: 'LTE',
        primaryUse: 'COVERAGE'
    },
    28: {
        bandNumber: 28,
        frequencyRange: {
            uplink: { start: 703, end: 748 },
            downlink: { start: 758, end: 803 }
        },
        bandCategory: 'LTE',
        primaryUse: 'COVERAGE'
    }
};
/**
 * Standard 4G4G handover configurations
 */
exports.STANDARD_4G4G_HANDOVER = {
    triggerType: 'A3',
    hysteresis: 2,
    timeToTrigger: 320,
    cellIndividualOffset: 0,
    freqSpecificOffset: 0,
    eventBasedConfig: {
        a3Offset: 3
    },
    measurementConfig: {
        reportInterval: 240,
        maxReportCells: 8,
        reportAmount: '8'
    }
};
/**
 * Aggressive 4G4G handover for load balancing
 */
exports.AGGRESSIVE_4G4G_HANDOVER = {
    triggerType: 'A3',
    hysteresis: 1,
    timeToTrigger: 160,
    cellIndividualOffset: 2,
    freqSpecificOffset: 1,
    eventBasedConfig: {
        a3Offset: 1
    },
    measurementConfig: {
        reportInterval: 120,
        maxReportCells: 16,
        reportAmount: '16'
    }
};
/**
 * Conservative 4G4G handover for stability
 */
exports.CONSERVATIVE_4G4G_HANDOVER = {
    triggerType: 'A3',
    hysteresis: 4,
    timeToTrigger: 640,
    cellIndividualOffset: 0,
    freqSpecificOffset: 0,
    eventBasedConfig: {
        a3Offset: 5
    },
    measurementConfig: {
        reportInterval: 480,
        maxReportCells: 4,
        reportAmount: '4'
    }
};
/**
 * Standard capacity sharing configuration
 */
exports.STANDARD_CAPACITY_SHARING = {
    enabled: true,
    strategy: 'LOAD_BALANCING',
    loadBalancingThreshold: 75,
    maxCapacityRatio: 0.7,
    minGuaranteedCapacity: 0.3,
    dynamicRebalancing: true,
    rebalancingInterval: 300
};
/**
 * eICIC interference coordination configuration
 */
exports.EICIC_INTERFERENCE_SETTINGS = {
    enabled: true,
    coordinationType: 'eICIC',
    interBandManagement: {
        almostBlankSubframes: true,
        crsPowerBoost: 6,
        powerControlCoordination: true
    },
    dynamicCoordination: true,
    coordinationInterval: 1000
};
/**
 * Create base 4G4G frequency relation
 */
function createBase4G4GRelation(relationId, referenceBand, relatedBand, priority = 50) {
    return {
        relationId,
        referenceFreq: referenceBand,
        relatedFreq: relatedBand,
        relationType: '4G4G',
        priority,
        adminState: 'UNLOCKED',
        operState: 'ENABLED',
        createdAt: new Date(),
        modifiedAt: new Date(),
        lteConfig: {
            carrierAggregation: false,
            mobilityParams: {
                handoverPreparationTimeout: 1000,
                handoverExecutionTimeout: 2000,
                reestablishmentAllowed: true
            },
            measurementGapConfig: {
                gapPattern: 'GP0',
                gapOffset: 0,
                gapLength: 6,
                gapRepetitionPeriod: 40
            }
        }
    };
}
/**
 * Template 1: Standard 4G4G Inter-frequency (Priority 50)
 * Basic LTE inter-frequency configuration with standard parameters
 */
exports.STANDARD_4G4G_TEMPLATE = {
    templateId: 'FREQ_4G4G_STANDARD_001',
    templateName: 'Standard 4G4G Inter-frequency Configuration',
    templateDescription: 'Basic LTE inter-frequency configuration with standard handover and mobility parameters',
    version: '1.0.0',
    templateType: '4G4G',
    priority: 50,
    baseConfig: createBase4G4GRelation('4G4G_STANDARD', exports.LTE_BANDS[3], exports.LTE_BANDS[1]),
    parameters: [
        {
            name: 'referenceBand',
            type: 'INTEGER',
            description: 'Reference LTE band number',
            defaultValue: 3,
            allowedValues: [1, 3, 7, 20, 28],
            category: 'BASIC'
        },
        {
            name: 'relatedBand',
            type: 'INTEGER',
            description: 'Related LTE band number',
            defaultValue: 1,
            allowedValues: [1, 3, 7, 20, 28],
            category: 'BASIC'
        },
        {
            name: 'handoverHysteresis',
            type: 'INTEGER',
            description: 'Handover hysteresis in dB',
            defaultValue: 2,
            constraints: { min: 0, max: 10 },
            category: 'BASIC'
        },
        {
            name: 'timeToTrigger',
            type: 'INTEGER',
            description: 'Time to trigger in milliseconds',
            defaultValue: 320,
            constraints: { min: 0, max: 5000 },
            category: 'BASIC'
        },
        {
            name: 'a3Offset',
            type: 'INTEGER',
            description: 'A3 event offset in dB',
            defaultValue: 3,
            constraints: { min: -15, max: 15 },
            category: 'ADVANCED'
        }
    ],
    validationRules: [
        {
            name: 'different_bands',
            description: 'Reference and related bands must be different',
            type: 'CONSISTENCY',
            condition: 'referenceBand != relatedBand',
            action: 'ERROR'
        },
        {
            name: 'valid_hysteresis',
            description: 'Hysteresis value must be realistic',
            type: 'RANGE',
            condition: 'handoverHysteresis >= 0 && handoverHysteresis <= 10',
            action: 'ERROR'
        },
        {
            name: 'ttt_consistency',
            description: 'Time to trigger should be proportional to hysteresis',
            type: 'CONSISTENCY',
            condition: 'timeToTrigger >= handoverHysteresis * 100',
            action: 'WARNING'
        }
    ],
    cmeditTemplates: [
        {
            commandName: 'create_freq_relation',
            commandTemplate: 'cmedit set ${nodeId} EUtranFreqRelation.(EUtranFreqRelationId==${relatedBand}) qOffsetFreq=${freqSpecificOffset},threshHigh=${a3Offset}',
            parameterMapping: {
                nodeId: 'nodeId',
                relatedBand: 'relatedBand',
                freqSpecificOffset: 'freqSpecificOffset',
                a3Offset: 'a3Offset'
            },
            description: 'Create LTE frequency relation with basic parameters'
        },
        {
            commandName: 'configure_handover',
            commandTemplate: 'cmedit set ${nodeId} EUtranFreqRelation.(EUtranFreqRelationId==${relatedBand}) hysteresis=${handoverHysteresis},timeToTrigger=${timeToTrigger}',
            parameterMapping: {
                nodeId: 'nodeId',
                relatedBand: 'relatedBand',
                handoverHysteresis: 'handoverHysteresis',
                timeToTrigger: 'timeToTrigger'
            },
            description: 'Configure handover parameters for frequency relation'
        }
    ]
};
/**
 * Template 2: 4G4G Carrier Aggregation (Priority 50)
 * LTE carrier aggregation configuration with multi-band support
 */
exports.CA_4G4G_TEMPLATE = {
    templateId: 'FREQ_4G4G_CA_002',
    templateName: '4G4G Carrier Aggregation Configuration',
    templateDescription: 'LTE carrier aggregation configuration with primary/secondary cell setup and multi-band support',
    version: '1.0.0',
    templateType: '4G4G',
    priority: 50,
    baseConfig: Object.assign(createBase4G4GRelation('4G4G_CA', exports.LTE_BANDS[3], exports.LTE_BANDS[7]), {
        lteConfig: {
            carrierAggregation: true,
            caConfig: {
                primaryCell: 'PCELL_BAND3',
                secondaryCells: ['SCell_BAND7_1', 'SCell_BAND7_2'],
                maxAggregatedBandwidth: 40,
                crossCarrierScheduling: true
            },
            mobilityParams: {
                handoverPreparationTimeout: 1000,
                handoverExecutionTimeout: 2000,
                reestablishmentAllowed: true
            },
            measurementGapConfig: {
                gapPattern: 'GP0',
                gapOffset: 0,
                gapLength: 6,
                gapRepetitionPeriod: 40
            }
        }
    }),
    parameters: [
        {
            name: 'primaryBand',
            type: 'INTEGER',
            description: 'Primary cell band number',
            defaultValue: 3,
            allowedValues: [1, 3, 7, 20, 28],
            category: 'BASIC'
        },
        {
            name: 'secondaryBands',
            type: 'STRING',
            description: 'Comma-separated secondary band numbers',
            defaultValue: '7',
            category: 'BASIC'
        },
        {
            name: 'maxAggregatedBandwidth',
            type: 'INTEGER',
            description: 'Maximum aggregated bandwidth in MHz',
            defaultValue: 40,
            constraints: { min: 10, max: 100 },
            category: 'ADVANCED'
        },
        {
            name: 'crossCarrierScheduling',
            type: 'BOOLEAN',
            description: 'Enable cross-carrier scheduling',
            defaultValue: true,
            category: 'ADVANCED'
        },
        {
            name: 'scellActivationThreshold',
            type: 'INTEGER',
            description: 'SCell activation threshold in dBm',
            defaultValue: -90,
            constraints: { min: -110, max: -70 },
            category: 'EXPERT'
        }
    ],
    validationRules: [
        {
            name: 'ca_band_combination',
            description: 'Valid CA band combination required',
            type: 'CONSISTENCY',
            condition: 'isValidCACombination(primaryBand, secondaryBands)',
            action: 'ERROR'
        },
        {
            name: 'bandwidth_limit',
            description: 'Aggregated bandwidth within supported limits',
            type: 'RANGE',
            condition: 'maxAggregatedBandwidth <= getSupportedMaxBandwidth(primaryBand, secondaryBands)',
            action: 'ERROR'
        },
        {
            name: 'scell_count',
            description: 'Number of secondary cells within limits',
            type: 'RANGE',
            condition: 'getSecondaryCellCount(secondaryBands) <= 4',
            action: 'WARNING'
        }
    ],
    cmeditTemplates: [
        {
            commandName: 'setup_primary_cell',
            commandTemplate: 'cmedit set ${nodeId} EUtranCellFDD=${primaryCellId} primaryCell=true',
            parameterMapping: {
                nodeId: 'nodeId',
                primaryCellId: 'primaryCellId'
            },
            description: 'Configure primary cell for carrier aggregation'
        },
        {
            commandName: 'add_secondary_cells',
            commandTemplate: 'cmedit set ${nodeId} EUtranCellFDD=${secondaryCellId} primaryCell=false,secondaryCell=true,scellActivationThreshold=${scellActivationThreshold}',
            parameterMapping: {
                nodeId: 'nodeId',
                secondaryCellId: 'secondaryCellId',
                scellActivationThreshold: 'scellActivationThreshold'
            },
            description: 'Add secondary cells for carrier aggregation'
        },
        {
            commandName: 'configure_ca',
            commandTemplate: 'cmedit set ${nodeId} ENBFunction carrierAggregation=true,maxAggregatedBandwidth=${maxAggregatedBandwidth},crossCarrierScheduling=${crossCarrierScheduling}',
            parameterMapping: {
                nodeId: 'nodeId',
                maxAggregatedBandwidth: 'maxAggregatedBandwidth',
                crossCarrierScheduling: 'crossCarrierScheduling'
            },
            description: 'Configure carrier aggregation parameters'
        }
    ]
};
/**
 * Template 3: 4G4G Load Balancing (Priority 50)
 * LTE inter-frequency configuration optimized for load balancing
 */
exports.LOAD_BALANCING_4G4G_TEMPLATE = {
    templateId: 'FREQ_4G4G_LB_003',
    templateName: '4G4G Load Balancing Configuration',
    templateDescription: 'LTE inter-frequency configuration optimized for load balancing with aggressive handover parameters',
    version: '1.0.0',
    templateType: '4G4G',
    priority: 50,
    baseConfig: Object.assign(createBase4G4GRelation('4G4G_LB', exports.LTE_BANDS[1], exports.LTE_BANDS[3]), {
        handoverConfig: exports.AGGRESSIVE_4G4G_HANDOVER,
        capacitySharing: exports.STANDARD_CAPACITY_SHARING
    }),
    parameters: [
        {
            name: 'loadBalancingThreshold',
            type: 'INTEGER',
            description: 'Load balancing threshold in percentage',
            defaultValue: 75,
            constraints: { min: 50, max: 90 },
            category: 'BASIC'
        },
        {
            name: 'rebalancingInterval',
            type: 'INTEGER',
            description: 'Load rebalancing interval in seconds',
            defaultValue: 300,
            constraints: { min: 60, max: 1800 },
            category: 'BASIC'
        },
        {
            name: 'handoverAggressiveness',
            type: 'ENUM',
            description: 'Handover aggressiveness level',
            defaultValue: 'MEDIUM',
            allowedValues: ['CONSERVATIVE', 'MEDIUM', 'AGGRESSIVE'],
            category: 'BASIC'
        },
        {
            name: 'maxCapacityRatio',
            type: 'FLOAT',
            description: 'Maximum capacity ratio between frequencies',
            defaultValue: 0.7,
            constraints: { min: 0.5, max: 0.9 },
            category: 'ADVANCED'
        }
    ],
    validationRules: [
        {
            name: 'load_threshold_range',
            description: 'Load balancing threshold must be realistic',
            type: 'RANGE',
            condition: 'loadBalancingThreshold >= 50 && loadBalancingThreshold <= 90',
            action: 'ERROR'
        },
        {
            name: 'rebalancing_frequency',
            description: 'Rebalancing interval should not be too frequent',
            type: 'CONSISTENCY',
            condition: 'rebalancingInterval >= 60',
            action: 'WARNING'
        }
    ],
    cmeditTemplates: [
        {
            commandName: 'configure_load_balancing',
            commandTemplate: 'cmedit set ${nodeId} EUtranFreqRelation.(EUtranFreqRelationId==${relatedBand}) lbTpNonQualFraction=${loadBalancingThreshold}',
            parameterMapping: {
                nodeId: 'nodeId',
                relatedBand: 'relatedBand',
                loadBalancingThreshold: 'loadBalancingThreshold'
            },
            description: 'Configure load balancing parameters'
        },
        {
            commandName: 'setup_capacity_sharing',
            commandTemplate: 'cmedit set ${nodeId} ENBFunction capacitySharing=true,maxCapacityRatio=${maxCapacityRatio},dynamicRebalancing=true,rebalancingInterval=${rebalancingInterval}',
            parameterMapping: {
                nodeId: 'nodeId',
                maxCapacityRatio: 'maxCapacityRatio',
                rebalancingInterval: 'rebalancingInterval'
            },
            description: 'Setup capacity sharing configuration'
        }
    ]
};
/**
 * Template 4: 4G4G Interference Coordination (Priority 50)
 * LTE inter-frequency configuration with eICIC interference coordination
 */
exports.INTERFERENCE_4G4G_TEMPLATE = {
    templateId: 'FREQ_4G4G_IC_004',
    templateName: '4G4G Interference Coordination Configuration',
    templateDescription: 'LTE inter-frequency configuration with enhanced inter-cell interference coordination (eICIC)',
    version: '1.0.0',
    templateType: '4G4G',
    priority: 50,
    baseConfig: Object.assign(createBase4G4GRelation('4G4G_IC', exports.LTE_BANDS[20], exports.LTE_BANDS[3]), {
        interferenceConfig: exports.EICIC_INTERFERENCE_SETTINGS
    }),
    parameters: [
        {
            name: 'icicType',
            type: 'ENUM',
            description: 'Interference coordination type',
            defaultValue: 'eICIC',
            allowedValues: ['ICIC', 'eICIC', 'FeICIC'],
            category: 'BASIC'
        },
        {
            name: 'almostBlankSubframes',
            type: 'BOOLEAN',
            description: 'Enable almost blank subframes',
            defaultValue: true,
            category: 'BASIC'
        },
        {
            name: 'crsPowerBoost',
            type: 'INTEGER',
            description: 'CRS power boost in dB',
            defaultValue: 6,
            constraints: { min: 0, max: 15 },
            category: 'ADVANCED'
        },
        {
            name: 'coordinationInterval',
            type: 'INTEGER',
            description: 'Coordination update interval in milliseconds',
            defaultValue: 1000,
            constraints: { min: 100, max: 10000 },
            category: 'ADVANCED'
        }
    ],
    validationRules: [
        {
            name: 'crs_boost_range',
            description: 'CRS power boost must be within valid range',
            type: 'RANGE',
            condition: 'crsPowerBoost >= 0 && crsPowerBoost <= 15',
            action: 'ERROR'
        },
        {
            name: 'coordination_timing',
            description: 'Coordination interval should be reasonable',
            type: 'CONSISTENCY',
            condition: 'coordinationInterval >= 100 && coordinationInterval <= 10000',
            action: 'WARNING'
        }
    ],
    cmeditTemplates: [
        {
            commandName: 'configure_icic',
            commandTemplate: 'cmedit set ${nodeId} EUtranCellFDD=${cellId} icicType=${icicType},almostBlankSubframes=${almostBlankSubframes}',
            parameterMapping: {
                nodeId: 'nodeId',
                cellId: 'cellId',
                icicType: 'icicType',
                almostBlankSubframes: 'almostBlankSubframes'
            },
            description: 'Configure ICIC parameters'
        },
        {
            commandName: 'setup_crs_boost',
            commandTemplate: 'cmedit set ${nodeId} EUtranCellFDD=${cellId} crsPowerBoost=${crsPowerBoost}',
            parameterMapping: {
                nodeId: 'nodeId',
                cellId: 'cellId',
                crsPowerBoost: 'crsPowerBoost'
            },
            description: 'Configure CRS power boost for interference coordination'
        }
    ]
};
/**
 * Template 5: 4G4G Coverage Expansion (Priority 50)
 * LTE inter-frequency configuration for coverage expansion scenarios
 */
exports.COVERAGE_EXPANSION_4G4G_TEMPLATE = {
    templateId: 'FREQ_4G4G_COV_005',
    templateName: '4G4G Coverage Expansion Configuration',
    templateDescription: 'LTE inter-frequency configuration optimized for coverage expansion with conservative handover parameters',
    version: '1.0.0',
    templateType: '4G4G',
    priority: 50,
    baseConfig: Object.assign(createBase4G4GRelation('4G4G_COV', exports.LTE_BANDS[20], exports.LTE_BANDS[28]), {
        handoverConfig: exports.CONSERVATIVE_4G4G_HANDOVER
    }),
    parameters: [
        {
            name: 'coverageBand',
            type: 'INTEGER',
            description: 'Low frequency coverage band',
            defaultValue: 20,
            allowedValues: [20, 28],
            category: 'BASIC'
        },
        {
            name: 'capacityBand',
            type: 'INTEGER',
            description: 'Higher frequency capacity band',
            defaultValue: 3,
            allowedValues: [1, 3, 7],
            category: 'BASIC'
        },
        {
            name: 'coverageHysteresis',
            type: 'INTEGER',
            description: 'Coverage handover hysteresis in dB',
            defaultValue: 4,
            constraints: { min: 2, max: 8 },
            category: 'ADVANCED'
        },
        {
            name: 'cellReselectionPriority',
            type: 'INTEGER',
            description: 'Cell reselection priority for coverage band',
            defaultValue: 7,
            constraints: { min: 0, max: 7 },
            category: 'ADVANCED'
        }
    ],
    validationRules: [
        {
            name: 'coverage_capacity_separation',
            description: 'Coverage and capacity bands should be different frequency ranges',
            type: 'CONSISTENCY',
            condition: 'getFrequencyRange(coverageBand) < getFrequencyRange(capacityBand)',
            action: 'WARNING'
        },
        {
            name: 'hysteresis_coverage',
            description: 'Higher hysteresis recommended for coverage scenarios',
            type: 'CONSISTENCY',
            condition: 'coverageHysteresis >= 3',
            action: 'WARNING'
        }
    ],
    cmeditTemplates: [
        {
            commandName: 'setup_coverage_priority',
            commandTemplate: 'cmedit set ${nodeId} EUtranCellFDD=${coverageCellId} cellReselectionPriority=${cellReselectionPriority},qRxLevMin=${qRxLevMin}',
            parameterMapping: {
                nodeId: 'nodeId',
                coverageCellId: 'coverageCellId',
                cellReselectionPriority: 'cellReselectionPriority',
                qRxLevMin: 'qRxLevMin'
            },
            description: 'Configure coverage band priority parameters'
        },
        {
            commandName: 'configure_coverage_handover',
            commandTemplate: 'cmedit set ${nodeId} EUtranFreqRelation.(EUtranFreqRelationId==${relatedBand}) hysteresis=${coverageHysteresis},timeToTrigger=${timeToTrigger}',
            parameterMapping: {
                nodeId: 'nodeId',
                relatedBand: 'relatedBand',
                coverageHysteresis: 'coverageHysteresis',
                timeToTrigger: 'timeToTrigger'
            },
            description: 'Configure conservative handover for coverage expansion'
        }
    ]
};
/**
 * Collection of all 4G4G frequency relation templates
 */
exports.FREQ_4G4G_TEMPLATES = [
    exports.STANDARD_4G4G_TEMPLATE,
    exports.CA_4G4G_TEMPLATE,
    exports.LOAD_BALANCING_4G4G_TEMPLATE,
    exports.INTERFERENCE_4G4G_TEMPLATE,
    exports.COVERAGE_EXPANSION_4G4G_TEMPLATE
];
/**
 * Helper functions for 4G4G template validation and configuration
 */
/**
 * Check if band combination is valid for carrier aggregation
 */
function isValidCACombination(primaryBand, secondaryBands) {
    const validCACombinations = [
        [1, 3], [1, 7], [1, 20], [3, 7], [3, 20], [7, 20],
        [1, 3, 7], [1, 3, 20], [3, 7, 20], [1, 7, 20]
    ];
    const secondaryBandList = secondaryBands.split(',').map(b => parseInt(b.trim()));
    const combination = [primaryBand, ...secondaryBandList].sort((a, b) => a - b);
    return validCACombinations.some(validComb => validComb.length === combination.length &&
        validComb.every((band, index) => band === combination[index]));
}
exports.isValidCACombination = isValidCACombination;
/**
 * Get maximum supported aggregated bandwidth for band combination
 */
function getSupportedMaxBandwidth(primaryBand, secondaryBands) {
    const bandLimits = {
        1: 20, 3: 20, 7: 20, 20: 15, 28: 15
    };
    const secondaryBandList = secondaryBands.split(',').map(b => parseInt(b.trim()));
    const allBands = [primaryBand, ...secondaryBandList];
    return Math.min(...allBands.map(band => bandLimits[band] || 10)) * allBands.length;
}
exports.getSupportedMaxBandwidth = getSupportedMaxBandwidth;
/**
 * Get secondary cell count from band string
 */
function getSecondaryCellCount(secondaryBands) {
    return secondaryBands.split(',').filter(b => b.trim()).length;
}
exports.getSecondaryCellCount = getSecondaryCellCount;
/**
 * Get frequency range category for band
 */
function getFrequencyRange(band) {
    const lowBands = [20, 28];
    const midBands = [1, 3];
    const highBands = [7];
    if (lowBands.includes(band))
        return 1;
    if (midBands.includes(band))
        return 2;
    if (highBands.includes(band))
        return 3;
    return 2; // default
}
exports.getFrequencyRange = getFrequencyRange;
/**
 * Calculate frequency relation performance metrics
 */
function calculate4G4GMetrics(config) {
    // Simulated metrics calculation based on configuration
    const baseMetrics = {
        handoverSuccessRate: 0.95,
        averageHandoverLatency: 50,
        interferenceLevel: 0.3,
        capacityUtilization: 0.6,
        userThroughput: { average: 25, peak: 150, cellEdge: 5 },
        callDropRate: 0.01,
        setupSuccessRate: 0.98
    };
    // Adjust metrics based on configuration
    if (config.lteConfig.carrierAggregation) {
        baseMetrics.userThroughput.average *= 1.8;
        baseMetrics.userThroughput.peak *= 2.2;
        baseMetrics.capacityUtilization *= 1.3;
    }
    if (config.handoverConfig.hysteresis < 2) {
        baseMetrics.handoverSuccessRate *= 0.95;
        baseMetrics.averageHandoverLatency *= 0.8;
    }
    if (config.interferenceConfig?.enabled) {
        baseMetrics.interferenceLevel *= 0.5;
        baseMetrics.userThroughput.cellEdge *= 1.3;
    }
    return baseMetrics;
}
exports.calculate4G4GMetrics = calculate4G4GMetrics;
//# sourceMappingURL=freq-4g4g.js.map