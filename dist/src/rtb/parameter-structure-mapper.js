"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterStructureMapper = void 0;
class ParameterStructureMapper {
    constructor(config = {
        enableHierarchicalGrouping: true,
        enableLDNFNavigation: true,
        enableReservedByValidation: true,
        enablePerformanceOptimization: true,
        maxDepth: 10
    }) {
        this.moHierarchy = null;
        this.ldnHierarchy = null;
        this.reservedByHierarchy = null;
        this.config = config;
    }
    async mapStructures(parameters, moHierarchy, ldnHierarchy, reservedByHierarchy) {
        const startTime = Date.now();
        this.moHierarchy = moHierarchy;
        this.ldnHierarchy = ldnHierarchy;
        this.reservedByHierarchy = reservedByHierarchy;
        console.log('[ParameterStructureMapper] Starting structure mapping...');
        // Phase 1: Hierarchical grouping
        const hierarchicalGroups = this.config.enableHierarchicalGrouping
            ? this.createHierarchicalGroups(parameters)
            : new Map();
        // Phase 2: LDN navigation path mapping
        const navigationPaths = this.config.enableLDNFNavigation
            ? this.mapLDNNavigationPaths(parameters)
            : new Map();
        // Phase 3: ReservedBy constraint validation
        const constraints = this.config.enableReservedByValidation
            ? this.mapReservedByConstraints(parameters)
            : new Map();
        // Phase 4: Parameter structure optimization
        const mappedParameters = this.config.enablePerformanceOptimization
            ? this.optimizeParameterStructures(parameters, hierarchicalGroups, navigationPaths, constraints)
            : parameters;
        const processingTime = Date.now() - startTime;
        const result = {
            mappedParameters,
            structureGroups: hierarchicalGroups,
            navigationPaths,
            constraints,
            performanceMetrics: {
                totalMappings: mappedParameters.length,
                hierarchicalGroups: hierarchicalGroups.size,
                navigationPaths: navigationPaths.size,
                constraintViolations: this.countConstraintViolations(constraints),
                processingTime
            }
        };
        console.log(`[ParameterStructureMapper] Structure mapping completed in ${processingTime}ms`);
        return result;
    }
    createHierarchicalGroups(parameters) {
        console.log('[ParameterStructureMapper] Creating hierarchical groups...');
        const groups = new Map();
        const rootGroup = 'root';
        // Initialize root group
        groups.set(rootGroup, []);
        // Group parameters by MO class hierarchy
        parameters.forEach(param => {
            if (!param.hierarchy || param.hierarchy.length === 0) {
                // Parameters without hierarchy go to root
                groups.get(rootGroup).push(param);
                return;
            }
            // Create groups for each hierarchy level
            param.hierarchy.forEach((level, index) => {
                const groupKey = this.generateGroupKey(param.hierarchy.slice(0, index + 1));
                if (!groups.has(groupKey)) {
                    groups.set(groupKey, []);
                }
                groups.get(groupKey).push(param);
            });
            // Add to parent groups
            for (let i = 1; i < param.hierarchy.length; i++) {
                const parentGroupKey = this.generateGroupKey(param.hierarchy.slice(0, i));
                if (!groups.has(parentGroupKey)) {
                    groups.set(parentGroupKey, []);
                }
                groups.get(parentGroupKey).push(param);
            }
        });
        // Create MO class-based groups
        if (this.moHierarchy) {
            this.createMOClassGroups(groups, parameters);
        }
        console.log(`[ParameterStructureMapper] Created ${groups.size} hierarchical groups`);
        return groups;
    }
    createMOClassGroups(groups, parameters) {
        if (!this.moHierarchy)
            return;
        // Group parameters by their associated MO classes
        for (const [moClassId, moClass] of this.moHierarchy.classes) {
            const classParameters = parameters.filter(param => param.name.includes(moClass.name) ||
                this.isRelatedToMOClass(param, moClass));
            if (classParameters.length > 0) {
                const classGroupKey = `mo_class:${moClassId}`;
                groups.set(classGroupKey, classParameters);
                // Create inheritance-based groups
                if (moClass.parentClass && moClass.parentClass !== 'ComTop') {
                    const parentGroupKey = `mo_class:${moClass.parentClass}`;
                    if (!groups.has(parentGroupKey)) {
                        groups.set(parentGroupKey, []);
                    }
                    groups.get(parentGroupKey).push(...classParameters);
                }
                // Create cardinality-based groups
                if (moClass.cardinality) {
                    const cardinalityGroupKey = `cardinality:${moClass.cardinality.type}:${moClass.cardinality.minimum}-${moClass.cardinality.maximum}`;
                    if (!groups.has(cardinalityGroupKey)) {
                        groups.set(cardinalityGroupKey, []);
                    }
                    groups.get(cardinalityGroupKey).push(...classParameters);
                }
            }
        }
        // Create relationship-based groups
        if (this.moHierarchy.relationships.size > 0) {
            this.createRelationshipGroups(groups, parameters);
        }
    }
    createRelationshipGroups(groups, parameters) {
        if (!this.moHierarchy)
            return;
        for (const [relationshipId, relationship] of this.moHierarchy.relationships) {
            const relatedParameters = parameters.filter(param => param.name.includes(relationship.parentId) ||
                this.isRelatedToRelationship(param, relationship));
            if (relatedParameters.length > 0) {
                const relationshipGroupKey = `relationship:${relationship.relationType}:${relationshipId}`;
                groups.set(relationshipGroupKey, relatedParameters);
                // Create count-based groups if relationship has count
                if (relationship.count !== undefined) {
                    const countGroupKey = `count:${relationship.relationType}:${relationship.count}`;
                    if (!groups.has(countGroupKey)) {
                        groups.set(countGroupKey, []);
                    }
                    groups.get(countGroupKey).push(...relatedParameters);
                }
            }
        }
    }
    mapLDNNavigationPaths(parameters) {
        console.log('[ParameterStructureMapper] Mapping LDN navigation paths...');
        const navigationPaths = new Map();
        parameters.forEach(param => {
            if (!param.vsDataType)
                return;
            // Find compatible LDN patterns for this parameter
            const compatiblePatterns = this.findCompatiblePatterns(param.vsDataType);
            compatiblePatterns.forEach(pattern => {
                // Generate navigation path for this parameter
                const navigationPath = this.generateNavigationPath(param, pattern);
                if (navigationPath && navigationPath.length > 0) {
                    const pathKey = `${param.name}:${param.vsDataType}`;
                    if (!navigationPaths.has(pathKey)) {
                        navigationPaths.set(pathKey, []);
                    }
                    navigationPaths.get(pathKey).push(...navigationPath);
                }
            });
        });
        console.log(`[ParameterStructureMapper] Mapped ${navigationPaths.size} navigation paths`);
        return navigationPaths;
    }
    mapReservedByConstraints(parameters) {
        console.log('[ParameterStructureMapper] Mapping reservedBy constraints...');
        const constraints = new Map();
        parameters.forEach(param => {
            if (!param.name)
                return;
            // Find reservedBy relationships for this parameter
            const relationships = this.findReservedByRelationships(param.name);
            relationships.forEach(relationship => {
                const constraintKey = `${param.name}:${relationship.targetClass}`;
                constraints.set(constraintKey, {
                    type: 'reservedBy',
                    sourceParameter: param.name,
                    targetClass: relationship.targetClass,
                    relationshipType: relationship.relationshipType,
                    cardinality: relationship.cardinality,
                    validationFunction: this.generateReservedByValidationFunction(relationship),
                    errorMessage: `Parameter '${param.name}' is reserved by '${relationship.targetClass}'`,
                    severity: 'error'
                });
            });
        });
        console.log(`[ParameterStructureMapper] Mapped ${constraints.size} reservedBy constraints`);
        return constraints;
    }
    optimizeParameterStructures(parameters, groups, navigationPaths, constraints) {
        console.log('[ParameterStructureMapper] Optimizing parameter structures...');
        const optimized = parameters.map(param => {
            const enhanced = { ...param };
            // Add group information
            const applicableGroups = this.findApplicableGroups(param, groups);
            if (applicableGroups.length > 0) {
                enhanced.structureGroups = applicableGroups;
            }
            // Add navigation paths
            const paramNavigationPaths = navigationPaths.get(`${param.name}:${param.vsDataType}`) || [];
            if (paramNavigationPaths.length > 0) {
                enhanced.navigationPaths = paramNavigationPaths;
            }
            // Add constraints
            const paramConstraints = this.findParameterConstraints(param, constraints);
            if (paramConstraints.length > 0) {
                enhanced.constraints = enhanced.constraints || [];
                enhanced.constraints.push(...paramConstraints);
            }
            // Optimize constraints based on hierarchy
            if (enhanced.constraints && enhanced.structureGroups) {
                enhanced.constraints = this.optimizeConstraints(enhanced.constraints, enhanced.structureGroups);
            }
            return enhanced;
        });
        // Remove duplicates and merge similar structures
        const deduplicated = this.deduplicateStructures(optimized);
        console.log(`[ParameterStructureMapper] Optimized ${parameters.length} to ${deduplicated.length} parameters`);
        return deduplicated;
    }
    // Helper methods for structure mapping
    generateGroupKey(hierarchy) {
        return `group:${hierarchy.join('|')}`;
    }
    isRelatedToMOClass(param, moClass) {
        // Check if parameter is related to MO class through naming or hierarchy
        return param.name.includes(moClass.name) ||
            param.hierarchy?.some(level => level.includes(moClass.name)) ||
            moClass.attributes.some(attr => param.name.includes(attr));
    }
    isRelatedToRelationship(param, relationship) {
        return param.name.includes(relationship.parentId) ||
            param.name.includes(relationship.relationType);
    }
    findCompatiblePatterns(vsDataType) {
        if (!this.ldnHierarchy)
            return [];
        // This would implement actual pattern matching logic
        // For now, return a basic implementation
        return [];
    }
    generateNavigationPath(param, pattern) {
        if (!this.ldnHierarchy)
            return null;
        try {
            // Generate navigation path based on parameter and LDN pattern
            const navigationPath = [];
            // Start with ManagedElement
            navigationPath.push('ManagedElement=1');
            // Add components based on pattern
            if (param.hierarchy) {
                navigationPath.push(...param.hierarchy.map((level, index) => `${level}=${index + 1}`));
            }
            // Add parameter-specific navigation
            navigationPath.push(`${param.name}=${param.name}`);
            return navigationPath;
        }
        catch (error) {
            console.warn(`[ParameterStructureMapper] Failed to generate navigation path for ${param.name}:`, error);
            return null;
        }
    }
    findReservedByRelationships(parameterName) {
        if (!this.reservedByHierarchy)
            return [];
        return this.reservedByHierarchy.relationships.values().toArray().filter(relationship => relationship.sourceClass === parameterName);
    }
    generateReservedByValidationFunction(relationship) {
        return (value) => {
            // Implement actual reservedBy validation logic
            // For now, return true (valid)
            return true;
        };
    }
    findApplicableGroups(param, groups) {
        const applicable = [];
        groups.forEach((groupParams, groupKey) => {
            if (groupParams.some(p => p.name === param.name)) {
                applicable.push(groupKey);
            }
        });
        return applicable;
    }
    findParameterConstraints(param, constraints) {
        const paramConstraints = [];
        constraints.forEach((constraint, key) => {
            if (key.startsWith(`${param.name}:`)) {
                paramConstraints.push(constraint);
            }
        });
        return paramConstraints;
    }
    optimizeConstraints(constraints, structureGroups) {
        // Remove duplicate constraints and optimize based on structure groups
        const optimized = new Map();
        constraints.forEach(constraint => {
            const key = `${constraint.type}:${constraint.value || constraint.targetClass}`;
            if (!optimized.has(key)) {
                optimized.set(key, constraint);
            }
            else {
                // Merge constraints
                const existing = optimized.get(key);
                optimized.set(key, {
                    ...existing,
                    severity: constraint.severity || existing.severity,
                    errorMessage: constraint.errorMessage || existing.errorMessage
                });
            }
        });
        // Add structure-based constraints
        if (structureGroups.length > 0) {
            optimized.set('structure:validation', {
                type: 'structure',
                value: structureGroups,
                errorMessage: 'Parameter must respect structure group constraints',
                severity: 'warning'
            });
        }
        return Array.from(optimized.values());
    }
    deduplicateStructures(parameters) {
        const unique = new Map();
        parameters.forEach(param => {
            // Create a unique key based on name, vsDataType, and structure
            const key = `${param.name}:${param.vsDataType}:${param.type}`;
            if (!unique.has(key)) {
                unique.set(key, param);
            }
            else {
                // Merge with existing parameter
                const existing = unique.get(key);
                unique.set(key, this.mergeParameters(existing, param));
            }
        });
        return Array.from(unique.values());
    }
    mergeParameters(existing, newParam) {
        return {
            ...existing,
            description: newParam.description || existing.description,
            defaultValue: newParam.defaultValue !== undefined ? newParam.defaultValue : existing.defaultValue,
            constraints: this.mergeConstraints(existing.constraints || [], newParam.constraints || []),
            structureGroups: this.mergeGroups(existing.structureGroups || [], newParam.structureGroups || []),
            navigationPaths: this.mergePaths(existing.navigationPaths || [], newParam.navigationPaths || []),
            hierarchy: this.mergeHierarchies(existing.hierarchy || [], newParam.hierarchy || [])
        };
    }
    mergeConstraints(existing, newConstraints) {
        const merged = [...existing];
        newConstraints.forEach(newConstraint => {
            const existingIndex = merged.findIndex(c => c.type === newConstraint.type);
            if (existingIndex !== -1) {
                merged[existingIndex] = { ...merged[existingIndex], ...newConstraint };
            }
            else {
                merged.push(newConstraint);
            }
        });
        return merged;
    }
    mergeGroups(existing, newGroups) {
        const merged = new Set(existing);
        newGroups.forEach(group => merged.add(group));
        return Array.from(merged);
    }
    mergePaths(existing, newPaths) {
        const merged = new Set(existing);
        newPaths.forEach(path => merged.add(path));
        return Array.from(merged);
    }
    mergeHierarchies(existing, newHierarchy) {
        const merged = new Set(existing);
        newHierarchy.forEach(level => merged.add(level));
        return Array.from(merged).sort();
    }
    countConstraintViolations(constraints) {
        return constraints.size;
    }
    // Public methods for accessing mapped structures
    getStructureGroups() {
        return this.config.enableHierarchicalGrouping
            ? new Map() // Would return actual groups from last mapping
            : new Map();
    }
    getNavigationPaths() {
        return this.config.enableLDNFNavigation
            ? new Map() // Would return actual paths from last mapping
            : new Map();
    }
    getConstraints() {
        return this.config.enableReservedByValidation
            ? new Map() // Would return actual constraints from last mapping
            : new Map();
    }
    getPerformanceMetrics() {
        return null; // Would return metrics from last mapping
    }
}
exports.ParameterStructureMapper = ParameterStructureMapper;
//# sourceMappingURL=parameter-structure-mapper.js.map