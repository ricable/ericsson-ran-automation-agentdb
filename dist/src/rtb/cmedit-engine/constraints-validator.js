"use strict";
/**
 * ReservedBy Constraints Validator
 *
 * Validates MO dependencies and constraints using reservedBy relationships,
 * ensuring configuration integrity and preventing dependency violations.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstraintsValidator = void 0;
class ConstraintsValidator {
    constructor(reservedByData, moClasses, strictMode = false) {
        this.moClasses = moClasses;
        this.strictMode = strictMode;
        this.validationCache = new Map();
        this.circularDependencyCache = new Map();
        this.reservedByHierarchy = this.buildReservedByHierarchy(reservedByData);
        this.dependencyGraph = this.buildDependencyGraph();
    }
    /**
     * Validate command dependencies and constraints
     */
    validateCommandDependencies(commandMOs, context) {
        const cacheKey = this.generateCacheKey(commandMOs, context);
        if (this.validationCache.has(cacheKey)) {
            return this.validationCache.get(cacheKey);
        }
        const validation = this.performDependencyValidation(commandMOs, context);
        this.validationCache.set(cacheKey, validation);
        return validation;
    }
    /**
     * Validate specific MO configuration for constraint violations
     */
    validateMOConfiguration(moClass, configuration, context) {
        const violations = [];
        const warnings = [];
        const requirements = [];
        // Check MO-specific constraints
        const moConstraints = this.getMOConstraints(moClass);
        for (const constraint of moConstraints) {
            const check = this.evaluateConstraint(constraint, configuration, context);
            if (!check.satisfied) {
                if (constraint.severity === 'error') {
                    violations.push({
                        constraint: constraint.name,
                        description: constraint.description,
                        actualValue: check.actualValue,
                        expectedValue: constraint.expectedValue,
                        impact: this.assessConstraintImpact(constraint, context),
                        resolution: this.suggestConstraintResolution(constraint, configuration)
                    });
                }
                else {
                    warnings.push({
                        constraint: constraint.name,
                        description: constraint.description,
                        actualValue: check.actualValue,
                        recommendedValue: constraint.recommendedValue,
                        impact: 'minimal'
                    });
                }
            }
            requirements.push({
                requirement: constraint.name,
                satisfied: check.satisfied,
                mandatory: constraint.mandatory,
                description: constraint.description
            });
        }
        // Check reservedBy relationships
        const reservedByViolations = this.checkReservedByConstraints(moClass, configuration, context);
        violations.push(...reservedByViolations);
        return {
            isValid: violations.length === 0,
            violations,
            warnings,
            requirements
        };
    }
    /**
     * Check for circular dependencies in MO configurations
     */
    detectCircularDependencies(moConfigurations) {
        const cycleKey = moConfigurations.map(c => c.moClass).sort().join('-');
        if (this.circularDependencyCache.has(cycleKey)) {
            return this.circularDependencyCache.get(cycleKey);
        }
        const cycles = this.findCyclesInConfigurations(moConfigurations);
        this.circularDependencyCache.set(cycleKey, cycles);
        return cycles;
    }
    /**
     * Validate parameter consistency across related MOs
     */
    validateParameterConsistency(configurations, context) {
        const inconsistencies = [];
        const resolvedConflicts = [];
        // Group related MOs
        const relatedGroups = this.groupRelatedMOs(configurations);
        for (const group of relatedGroups) {
            const groupInconsistencies = this.findParameterInconsistencies(group, context);
            inconsistencies.push(...groupInconsistencies);
            const groupConflicts = this.resolveParameterConflicts(group, context);
            resolvedConflicts.push(...groupConflicts);
        }
        return {
            isConsistent: inconsistencies.length === 0,
            inconsistencies,
            resolvedConflicts,
            consistencyScore: this.calculateConsistencyScore(inconsistencies, configurations.length)
        };
    }
    /**
     * Check feature activation dependencies
     */
    validateFeatureDependencies(features, context) {
        const featureGraph = this.buildFeatureDependencyGraph(features);
        const missingDependencies = [];
        const conflicts = [];
        const activationOrder = [];
        // Check for missing dependencies
        for (const feature of features) {
            const dependencies = this.getFeatureDependencies(feature);
            for (const dependency of dependencies) {
                if (!features.includes(dependency)) {
                    missingDependencies.push({
                        feature,
                        missingDependency: dependency,
                        impact: this.assessFeatureDependencyImpact(feature, dependency, context),
                        resolution: `Activate ${dependency} before ${feature}`
                    });
                }
            }
        }
        // Check for conflicting features
        for (let i = 0; i < features.length; i++) {
            for (let j = i + 1; j < features.length; j++) {
                const conflict = this.checkFeatureConflict(features[i], features[j]);
                if (conflict) {
                    conflicts.push(conflict);
                }
            }
        }
        // Determine activation order
        try {
            activationOrder.push(...this.topologicalSortFeatureDependencies(features));
        }
        catch (error) {
            // Circular dependency in features
            conflicts.push({
                feature1: 'unknown',
                feature2: 'unknown',
                conflictType: 'circular_dependency',
                description: 'Circular dependency detected in feature activation',
                resolution: 'Review feature dependencies and resolve circular references'
            });
        }
        return {
            isValid: missingDependencies.length === 0 && conflicts.length === 0,
            missingDependencies,
            conflicts,
            activationOrder,
            featureGraph
        };
    }
    /**
     * Validate configuration against operational constraints
     */
    validateOperationalConstraints(moClass, configuration, context) {
        const violations = [];
        const warnings = [];
        // Check capacity constraints
        const capacityViolations = this.checkCapacityConstraints(moClass, configuration, context);
        violations.push(...capacityViolations);
        // Check performance constraints
        const performanceViolations = this.checkPerformanceConstraints(moClass, configuration, context);
        violations.push(...performanceViolations);
        // Check safety constraints
        const safetyWarnings = this.checkSafetyConstraints(moClass, configuration, context);
        warnings.push(...safetyWarnings);
        return {
            isValid: violations.length === 0,
            violations,
            warnings,
            riskLevel: this.assessOperationalRisk(violations, warnings),
            recommendations: this.generateOperationalRecommendations(violations, warnings, context)
        };
    }
    /**
     * Generate comprehensive constraint report
     */
    generateConstraintReport(configurations, context) {
        const report = {
            summary: {
                totalMOs: configurations.length,
                violationsCount: 0,
                warningsCount: 0,
                dependencyIssues: 0,
                overallCompliance: 'unknown'
            },
            moValidations: [],
            dependencyIssues: [],
            parameterInconsistencies: [],
            featureDependencies: {
                isValid: true,
                missingDependencies: [],
                conflicts: [],
                activationOrder: []
            },
            operationalConstraints: {
                isValid: true,
                violations: [],
                warnings: [],
                riskLevel: 'low'
            },
            recommendations: []
        };
        // Validate each MO
        for (const { moClass, configuration } of configurations) {
            const moValidation = this.validateMOConfiguration(moClass, configuration, context);
            report.moValidations.push({
                moClass,
                ...moValidation
            });
            report.summary.violationsCount += moValidation.violations.length;
            report.summary.warningsCount += moValidation.warnings.length;
        }
        // Check dependencies
        const dependencyValidation = this.validateCommandDependencies(configurations.map(c => c.moClass), context);
        report.dependencyIssues.push(...dependencyValidation.unresolved);
        // Check parameter consistency
        const consistencyValidation = this.validateParameterConsistency(configurations.map(c => ({ moClass: c.moClass, parameters: c.configuration })), context);
        report.parameterInconsistencies.push(...consistencyValidation.inconsistencies);
        // Calculate overall compliance
        const totalIssues = report.summary.violationsCount + report.summary.warningsCount +
            report.dependencyIssues.length + report.parameterInconsistencies.length;
        if (totalIssues === 0) {
            report.summary.overallCompliance = 'full';
        }
        else if (report.summary.violationsCount === 0) {
            report.summary.overallCompliance = 'partial';
        }
        else {
            report.summary.overallCompliance = 'non_compliant';
        }
        // Generate recommendations
        report.recommendations = this.generateComprehensiveRecommendations(report, context);
        return report;
    }
    // Private Methods
    /**
     * Perform dependency validation
     */
    performDependencyValidation(commandMOs, context) {
        const nodes = [];
        const edges = [];
        const unresolved = [];
        const circular = [];
        // Create nodes
        for (const moClass of commandMOs) {
            nodes.push({
                id: moClass,
                moClass,
                type: 'both',
                dependencyCount: this.getDependencyCount(moClass)
            });
        }
        // Create edges based on reservedBy relationships
        for (let i = 0; i < commandMOs.length; i++) {
            for (let j = i + 1; j < commandMOs.length; j++) {
                const relationship = this.findReservedByRelationship(commandMOs[i], commandMOs[j]);
                if (relationship) {
                    edges.push({
                        source: commandMOs[i],
                        target: commandMOs[j],
                        type: this.mapRelationshipType(relationship.relationshipType),
                        weight: this.calculateRelationshipWeight(relationship)
                    });
                }
            }
        }
        // Check for unresolved dependencies
        for (const moClass of commandMOs) {
            const requiredDependencies = this.getRequiredDependencies(moClass);
            for (const dependency of requiredDependencies) {
                if (!commandMOs.includes(dependency)) {
                    unresolved.push({
                        source: moClass,
                        target: dependency,
                        type: 'requires',
                        description: `${moClass} requires ${dependency}`,
                        resolved: false
                    });
                }
            }
        }
        // Detect circular dependencies
        const cycles = this.detectCycles(nodes, edges);
        circular.push(...cycles);
        // Build graph
        const graph = {
            nodes,
            edges,
            components: this.findConnectedComponents(nodes, edges),
            hasCycles: cycles.length > 0
        };
        return {
            isSatisfied: unresolved.length === 0 && cycles.length === 0,
            unresolved,
            circular,
            graph
        };
    }
    /**
     * Get MO constraints
     */
    getMOConstraints(moClass) {
        // Define common MO constraints (would be loaded from configuration)
        const constraints = {
            'EUtranCellFDD': [
                {
                    name: 'qRxLevMin_range',
                    description: 'qRxLevMin must be between -140 and -44 dBm',
                    parameter: 'qRxLevMin',
                    type: 'range',
                    expectedValue: { min: -140, max: -44 },
                    mandatory: true,
                    severity: 'error'
                },
                {
                    name: 'qQualMin_range',
                    description: 'qQualMin must be between -20 and 0 dB',
                    parameter: 'qQualMin',
                    type: 'range',
                    expectedValue: { min: -20, max: 0 },
                    mandatory: true,
                    severity: 'error'
                },
                {
                    name: 'power_optimization',
                    description: 'Transmit power should be optimized for coverage',
                    parameter: 'referenceSignalPower',
                    type: 'optimization',
                    recommendedValue: { min: -60, max: 50 },
                    mandatory: false,
                    severity: 'warning'
                }
            ],
            'ENodeBFunction': [
                {
                    name: 'plmn_configuration',
                    description: 'PLMN configuration must be valid',
                    parameter: 'eNodeBPlmnId',
                    type: 'pattern',
                    expectedValue: { pattern: '^[0-9]{3}-[0-9]{2}$' },
                    mandatory: true,
                    severity: 'error'
                }
            ]
        };
        return constraints[moClass] || [];
    }
    /**
     * Evaluate constraint
     */
    evaluateConstraint(constraint, configuration, context) {
        const actualValue = configuration[constraint.parameter];
        if (actualValue === undefined) {
            return { satisfied: !constraint.mandatory, actualValue: undefined };
        }
        switch (constraint.type) {
            case 'range':
                const { min, max } = constraint.expectedValue;
                return {
                    satisfied: actualValue >= min && actualValue <= max,
                    actualValue
                };
            case 'pattern':
                const regex = new RegExp(constraint.expectedValue.pattern);
                return {
                    satisfied: regex.test(actualValue.toString()),
                    actualValue
                };
            case 'enum':
                return {
                    satisfied: constraint.expectedValue.values.includes(actualValue),
                    actualValue
                };
            case 'optimization':
                // Optimization constraints are warnings, not hard violations
                const { min: optMin, max: optMax } = constraint.expectedValue;
                return {
                    satisfied: actualValue >= optMin && actualValue <= optMax,
                    actualValue
                };
            default:
                return { satisfied: true, actualValue };
        }
    }
    /**
     * Check reservedBy constraints
     */
    checkReservedByConstraints(moClass, configuration, context) {
        const violations = [];
        const relationships = this.reservedByHierarchy.relationships.get(moClass);
        if (!relationships) {
            return violations;
        }
        for (const [targetMO, relationship] of relationships) {
            if (relationship.relationshipType === 'reserves') {
                // Check if reserved MO is properly configured
                const reservedConfig = this.getReservedMOConfiguration(targetMO, configuration);
                if (!this.isReservationValid(relationship, reservedConfig)) {
                    violations.push({
                        constraint: `reservedBy_${targetMO}`,
                        description: `${moClass} reserves ${targetMO} but configuration is invalid`,
                        actualValue: reservedConfig,
                        expectedValue: relationship.constraints,
                        impact: 'configuration_failure',
                        resolution: `Configure ${targetMO} according to reservation constraints`
                    });
                }
            }
        }
        return violations;
    }
    /**
     * Get dependency count for MO
     */
    getDependencyCount(moClass) {
        const dependencies = this.reservedByHierarchy.classDependencies.get(moClass);
        return dependencies ? dependencies.length : 0;
    }
    /**
     * Find reservedBy relationship
     */
    findReservedByRelationship(sourceMO, targetMO) {
        const relationships = this.reservedByHierarchy.relationships.get(sourceMO);
        if (relationships) {
            const relationship = relationships.get(targetMO);
            if (relationship) {
                return relationship;
            }
        }
        return null;
    }
    /**
     * Map relationship type
     */
    mapRelationshipType(reservedByType) {
        const mapping = {
            'reserves': 'reserves',
            'depends_on': 'depends_on',
            'requires': 'requires',
            'modifies': 'modifies',
            'conflicts': 'conflicts'
        };
        return mapping[reservedByType] || 'depends_on';
    }
    /**
     * Calculate relationship weight
     */
    calculateRelationshipWeight(relationship) {
        const weightMapping = {
            'reserves': 10,
            'requires': 8,
            'modifies': 6,
            'depends_on': 4,
            'conflicts': 2
        };
        return weightMapping[relationship.relationshipType] || 1;
    }
    /**
     * Get required dependencies for MO
     */
    getRequiredDependencies(moClass) {
        const dependencies = this.reservedByHierarchy.classDependencies.get(moClass);
        if (!dependencies) {
            return [];
        }
        // Filter for required dependencies
        return dependencies.filter(dep => {
            const relationship = this.findReservedByRelationship(moClass, dep);
            return relationship && relationship.relationshipType === 'requires';
        });
    }
    /**
     * Detect cycles in dependency graph
     */
    detectCycles(nodes, edges) {
        const cycles = [];
        const visited = new Set();
        const recursionStack = new Set();
        const path = [];
        const dfs = (nodeId) => {
            if (recursionStack.has(nodeId)) {
                // Found a cycle
                const cycleStart = path.indexOf(nodeId);
                const cyclePath = path.slice(cycleStart);
                cycles.push({
                    path: [...cyclePath, nodeId],
                    length: cyclePath.length + 1,
                    severity: cyclePath.length <= 3 ? 'high' : cyclePath.length <= 5 ? 'medium' : 'low',
                    resolution: `Break circular dependency: ${cyclePath.join(' -> ')}`
                });
                return true;
            }
            if (visited.has(nodeId)) {
                return false;
            }
            visited.add(nodeId);
            recursionStack.add(nodeId);
            path.push(nodeId);
            // Visit neighbors
            const neighbors = edges.filter(e => e.source === nodeId);
            for (const edge of neighbors) {
                if (dfs(edge.target)) {
                    return true;
                }
            }
            recursionStack.delete(nodeId);
            path.pop();
            return false;
        };
        for (const node of nodes) {
            if (!visited.has(node.id)) {
                dfs(node.id);
            }
        }
        return cycles;
    }
    /**
     * Find connected components
     */
    findConnectedComponents(nodes, edges) {
        const visited = new Set();
        const components = [];
        const bfs = (startNode) => {
            const component = [];
            const queue = [startNode];
            while (queue.length > 0) {
                const nodeId = queue.shift();
                if (visited.has(nodeId)) {
                    continue;
                }
                visited.add(nodeId);
                component.push(nodeId);
                // Add neighbors
                const neighbors = edges
                    .filter(e => e.source === nodeId || e.target === nodeId)
                    .map(e => e.source === nodeId ? e.target : e.source);
                for (const neighbor of neighbors) {
                    if (!visited.has(neighbor)) {
                        queue.push(neighbor);
                    }
                }
            }
            return component;
        };
        for (const node of nodes) {
            if (!visited.has(node.id)) {
                components.push(bfs(node.id));
            }
        }
        return components;
    }
    /**
     * Assess constraint impact
     */
    assessConstraintImpact(constraint, context) {
        if (constraint.severity === 'error') {
            return 'critical';
        }
        else if (constraint.mandatory) {
            return 'high';
        }
        else {
            return 'medium';
        }
    }
    /**
     * Suggest constraint resolution
     */
    suggestConstraintResolution(constraint, configuration) {
        switch (constraint.type) {
            case 'range':
                const { min, max } = constraint.expectedValue;
                return `Set ${constraint.parameter} to a value between ${min} and ${max}`;
            case 'pattern':
                return `Set ${constraint.parameter} to match pattern ${constraint.expectedValue.pattern}`;
            case 'enum':
                return `Set ${constraint.parameter} to one of: ${constraint.expectedValue.values.join(', ')}`;
            default:
                return `Review ${constraint.parameter} configuration`;
        }
    }
    /**
     * Find parameter inconsistencies
     */
    findParameterInconsistencies(group, context) {
        const inconsistencies = [];
        // Find common parameters across MOs
        const commonParameters = this.findCommonParameters(group);
        for (const parameter of commonParameters) {
            const values = group.map(mo => ({
                moClass: mo.moClass,
                value: mo.parameters[parameter]
            })).filter(v => v.value !== undefined);
            if (values.length > 1) {
                const uniqueValues = new Set(values.map(v => JSON.stringify(v.value)));
                if (uniqueValues.size > 1) {
                    inconsistencies.push({
                        parameter,
                        moClasses: values.map(v => v.moClass),
                        values: values.map(v => v.value),
                        inconsistencyType: this.determineInconsistencyType(parameter, values),
                        recommendedValue: this.calculateRecommendedValue(parameter, values),
                        impact: this.assessParameterImpact(parameter, context)
                    });
                }
            }
        }
        return inconsistencies;
    }
    /**
     * Find common parameters across MOs
     */
    findCommonParameters(moGroup) {
        const parameterCounts = new Map();
        for (const mo of moGroup) {
            for (const parameter of Object.keys(mo.parameters)) {
                parameterCounts.set(parameter, (parameterCounts.get(parameter) || 0) + 1);
            }
        }
        // Return parameters that appear in multiple MOs
        return Array.from(parameterCounts.entries())
            .filter(([_, count]) => count > 1)
            .map(([parameter, _]) => parameter);
    }
    /**
     * Determine inconsistency type
     */
    determineInconsistencyType(parameter, values) {
        const numericValues = values.map(v => parseFloat(v.value)).filter(v => !isNaN(v));
        if (numericValues.length === values.length) {
            const range = Math.max(...numericValues) - Math.min(...numericValues);
            if (range > 10)
                return 'large_variation';
            if (range > 1)
                return 'medium_variation';
            return 'minor_variation';
        }
        return 'type_mismatch';
    }
    /**
     * Calculate recommended value
     */
    calculateRecommendedValue(parameter, values) {
        const numericValues = values.map(v => parseFloat(v.value)).filter(v => !isNaN(v));
        if (numericValues.length === values.length) {
            // Use median for numeric values
            const sorted = numericValues.sort((a, b) => a - b);
            return sorted[Math.floor(sorted.length / 2)];
        }
        // Use most common value for non-numeric
        const frequency = new Map();
        for (const v of values) {
            frequency.set(v.value, (frequency.get(v.value) || 0) + 1);
        }
        let maxCount = 0;
        let mostCommon = values[0].value;
        for (const [value, count] of frequency.entries()) {
            if (count > maxCount) {
                maxCount = count;
                mostCommon = value;
            }
        }
        return mostCommon;
    }
    /**
     * Assess parameter impact
     */
    assessParameterImpact(parameter, context) {
        const criticalParameters = [
            'qRxLevMin', 'qQualMin', 'referenceSignalPower',
            'eNodeBPlmnId', 'cellIndividualOffset'
        ];
        if (criticalParameters.includes(parameter)) {
            return 'high';
        }
        else if (parameter.includes('threshold') || parameter.includes('offset')) {
            return 'medium';
        }
        else {
            return 'low';
        }
    }
    /**
     * Group related MOs
     */
    groupRelatedMOs(configurations) {
        const groups = [];
        const visited = new Set();
        for (const config of configurations) {
            if (visited.has(config.moClass)) {
                continue;
            }
            const group = [config];
            visited.add(config.moClass);
            // Find related MOs
            for (const other of configurations) {
                if (!visited.has(other.moClass) && this.areMOsRelated(config.moClass, other.moClass)) {
                    group.push(other);
                    visited.add(other.moClass);
                }
            }
            groups.push(group);
        }
        return groups;
    }
    /**
     * Check if MOs are related
     */
    areMOsRelated(mo1, mo2) {
        const relationship = this.findReservedByRelationship(mo1, mo2) ||
            this.findReservedByRelationship(mo2, mo1);
        return relationship !== null;
    }
    /**
     * Resolve parameter conflicts
     */
    resolveParameterConflicts(group, context) {
        const conflicts = [];
        const inconsistencies = this.findParameterInconsistencies(group, context);
        for (const inconsistency of inconsistencies) {
            conflicts.push({
                parameter: inconsistency.parameter,
                conflictingMOs: inconsistency.moClasses,
                conflictingValues: inconsistency.values,
                resolution: this.parameterConflictResolution(inconsistency),
                applied: false
            });
        }
        return conflicts;
    }
    /**
     * Provide resolution for parameter conflicts
     */
    parameterConflictResolution(inconsistency) {
        switch (inconsistency.inconsistencyType) {
            case 'large_variation':
                return `Standardize ${inconsistency.parameter} across all cells to ${inconsistency.recommendedValue}`;
            case 'type_mismatch':
                return `Ensure ${inconsistency.parameter} has consistent data type across all MOs`;
            default:
                return `Align ${inconsistency.parameter} values to reduce variation`;
        }
    }
    /**
     * Calculate consistency score
     */
    calculateConsistencyScore(inconsistencies, totalMOs) {
        if (totalMOs === 0)
            return 100;
        const penalty = inconsistencies.reduce((sum, inconsistency) => {
            switch (inconsistency.inconsistencyType) {
                case 'large_variation': return sum + 20;
                case 'medium_variation': return sum + 10;
                case 'minor_variation': return sum + 5;
                case 'type_mismatch': return sum + 15;
                default: return sum + 5;
            }
        }, 0);
        return Math.max(0, 100 - penalty);
    }
    /**
     * Build reservedBy hierarchy
     */
    buildReservedByHierarchy(data) {
        const relationshipMap = new Map();
        for (const relationship of data.relationships) {
            if (!relationshipMap.has(relationship.sourceClass)) {
                relationshipMap.set(relationship.sourceClass, new Map());
            }
            relationshipMap.get(relationship.sourceClass).set(relationship.targetClass, relationship);
        }
        return {
            totalRelationships: data.relationships.length,
            relationships: relationshipMap,
            classDependencies: data.classDependencies,
            constraintValidation: new Map(),
            circularDependencies: []
        };
    }
    /**
     * Build dependency graph
     */
    buildDependencyGraph() {
        return {
            nodes: [],
            edges: [],
            components: [],
            hasCycles: false
        };
    }
    /**
     * Generate cache key
     */
    generateCacheKey(commandMOs, context) {
        return commandMOs.sort().join('-') + '-' + context.purpose;
    }
    // Additional helper methods (simplified implementations)
    getReservedMOConfiguration(targetMO, configuration) {
        return configuration[targetMO] || {};
    }
    isReservationValid(relationship, config) {
        return true; // Simplified implementation
    }
    findCyclesInConfigurations(moConfigurations) {
        return []; // Simplified implementation
    }
    getFeatureDependencies(feature) {
        return []; // Simplified implementation
    }
    assessFeatureDependencyImpact(feature, dependency, context) {
        return 'medium'; // Simplified implementation
    }
    buildFeatureDependencyGraph(features) {
        return {}; // Simplified implementation
    }
    checkFeatureConflict(feature1, feature2) {
        return null; // Simplified implementation
    }
    topologicalSortFeatureDependencies(features) {
        return features; // Simplified implementation
    }
    checkCapacityConstraints(moClass, configuration, context) {
        return []; // Simplified implementation
    }
    checkPerformanceConstraints(moClass, configuration, context) {
        return []; // Simplified implementation
    }
    checkSafetyConstraints(moClass, configuration, context) {
        return []; // Simplified implementation
    }
    assessOperationalRisk(violations, warnings) {
        if (violations.length > 5)
            return 'critical';
        if (violations.length > 2)
            return 'high';
        if (violations.length > 0 || warnings.length > 3)
            return 'medium';
        return 'low';
    }
    generateOperationalRecommendations(violations, warnings, context) {
        return []; // Simplified implementation
    }
    generateComprehensiveRecommendations(report, context) {
        const recommendations = [];
        if (report.summary.violationsCount > 0) {
            recommendations.push('Resolve all constraint violations before deployment');
        }
        if (report.dependencyIssues.length > 0) {
            recommendations.push('Review and resolve dependency issues');
        }
        if (report.parameterInconsistencies.length > 0) {
            recommendations.push('Standardize parameter values across related MOs');
        }
        return recommendations;
    }
}
exports.ConstraintsValidator = ConstraintsValidator;
//# sourceMappingURL=constraints-validator.js.map