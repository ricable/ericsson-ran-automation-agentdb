"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterChangeDetector = void 0;
class ParameterChangeDetector {
    constructor(config = {
        strictComparison: true,
        detectConstraintChanges: true,
        detectTypeChanges: true,
        detectMetadataChanges: true,
        generateSemanticVersions: true,
        trackParameterHistory: true,
        maxHistoryVersions: 10,
        impactAnalysisEnabled: true
    }) {
        this.versionHistory = new Map();
        this.parameterHistory = new Map();
        this.changeSets = [];
        this.checksumCache = new Map();
        this.config = config;
    }
    /**
     * Detect changes between old and new templates
     */
    async detectChanges(oldTemplates, newTemplates, changeSetDescription = 'Template update') {
        console.log('🔍 Detecting changes between template versions...');
        const changeSetId = this.generateChangeSetId();
        const timestamp = new Date();
        const parameterChanges = [];
        const templateChanges = [];
        const affectedTemplates = new Set();
        // Build lookup maps
        const oldTemplateMap = new Map(oldTemplates.map(t => [t.templateId, t]));
        const newTemplateMap = new Map(newTemplates.map(t => [t.templateId, t]));
        // Find all template IDs
        const allTemplateIds = new Set([...oldTemplateMap.keys(), ...newTemplateMap.keys()]);
        for (const templateId of allTemplateIds) {
            const oldTemplate = oldTemplateMap.get(templateId);
            const newTemplate = newTemplateMap.get(templateId);
            if (oldTemplate && newTemplate) {
                // Template exists in both versions - detect modifications
                const templateChange = await this.detectTemplateModifications(oldTemplate, newTemplate);
                if (templateChange) {
                    templateChanges.push(templateChange);
                    parameterChanges.push(...templateChange.changes);
                    affectedTemplates.add(templateId);
                }
            }
            else if (!oldTemplate && newTemplate) {
                // New template added
                const templateChange = this.createAddedTemplateChange(newTemplate);
                templateChanges.push(templateChange);
                parameterChanges.push(...templateChange.changes);
                affectedTemplates.add(templateId);
            }
            else if (oldTemplate && !newTemplate) {
                // Template removed
                const templateChange = this.createRemovedTemplateChange(oldTemplate);
                templateChanges.push(templateChange);
                parameterChanges.push(...templateChange.changes);
                affectedTemplates.add(templateId);
            }
        }
        // Analyze impact and generate recommendations
        const summary = this.generateChangeSummary(parameterChanges, templateChanges);
        const recommendedActions = this.generateRecommendedActions(templateChanges);
        const changeSet = {
            id: changeSetId,
            timestamp,
            description: changeSetDescription,
            parameterChanges,
            templateChanges,
            summary,
            affectedTemplates: Array.from(affectedTemplates),
            recommendedActions
        };
        // Store change set
        this.changeSets.push(changeSet);
        console.log(`✅ Change detection complete: ${parameterChanges.length} parameter changes, ${templateChanges.length} template changes`);
        return changeSet;
    }
    /**
     * Detect modifications between two templates
     */
    async detectTemplateModifications(oldTemplate, newTemplate) {
        const changes = [];
        // Compare parameters
        const parameterChanges = await this.detectParameterChanges(oldTemplate.parameters, newTemplate.parameters, oldTemplate.templateId);
        changes.push(...parameterChanges);
        // Compare custom functions
        const functionChanges = this.detectFunctionChanges(oldTemplate, newTemplate);
        if (functionChanges.length > 0) {
            changes.push(...functionChanges);
        }
        // Compare metadata
        const metadataChanges = this.detectMetadataChanges(oldTemplate, newTemplate);
        if (metadataChanges.length > 0) {
            changes.push(...metadataChanges);
        }
        if (changes.length === 0) {
            return null; // No changes detected
        }
        // Determine version change
        const versionChange = this.calculateVersionChange(oldTemplate, newTemplate, changes);
        // Determine impact
        const impact = this.calculateChangeImpact(changes);
        const breakingChange = changes.some(c => c.impact === 'critical' || c.changeType.includes('removed'));
        return {
            templateId: oldTemplate.templateId,
            changeType: this.determineTemplateChangeType(changes),
            changes,
            versionChange,
            impact,
            requiresRegeneration: true,
            breakingChange,
            description: this.generateTemplateChangeDescription(oldTemplate.templateId, changes)
        };
    }
    /**
     * Detect parameter changes between old and new parameter sets
     */
    async detectParameterChanges(oldParameters, newParameters, templateId) {
        const changes = [];
        // Build parameter maps
        const oldParamMap = new Map(oldParameters.map(p => [p.id, p]));
        const newParamMap = new Map(newParameters.map(p => [p.id, p]));
        // Find all parameter IDs
        const allParamIds = new Set([...oldParamMap.keys(), ...newParamMap.keys()]);
        for (const paramId of allParamIds) {
            const oldParam = oldParamMap.get(paramId);
            const newParam = newParamMap.get(paramId);
            if (oldParam && newParam) {
                // Parameter exists in both versions - detect modifications
                const paramChanges = this.detectParameterModifications(oldParam, newParam);
                changes.push(...paramChanges);
            }
            else if (!oldParam && newParam) {
                // New parameter added
                changes.push(this.createAddedParameterChange(newParam, templateId));
            }
            else if (oldParam && !newParam) {
                // Parameter removed
                changes.push(this.createRemovedParameterChange(oldParam, templateId));
            }
        }
        return changes;
    }
    /**
     * Detect modifications between two parameters
     */
    detectParameterModifications(oldParam, newParam) {
        const changes = [];
        // Check for type changes
        if (this.config.detectTypeChanges && oldParam.type !== newParam.type) {
            changes.push({
                parameterId: oldParam.id,
                changeType: 'type_changed',
                oldValue: oldParam.type,
                newValue: newParam.type,
                impact: this.calculateTypeChangeImpact(oldParam.type, newParam.type),
                description: `Parameter type changed from ${oldParam.type} to ${newParam.type}`,
                affectedTemplates: []
            });
        }
        // Check for default value changes
        if (!this.deepEqual(oldParam.defaultValue, newParam.defaultValue)) {
            changes.push({
                parameterId: oldParam.id,
                changeType: 'modified',
                oldValue: oldParam.defaultValue,
                newValue: newParam.defaultValue,
                impact: this.calculateValueChangeImpact(oldParam.defaultValue, newParam.defaultValue, oldParam.type),
                description: `Default value changed from ${oldParam.defaultValue} to ${newParam.defaultValue}`,
                affectedTemplates: []
            });
        }
        // Check for constraint changes
        if (this.config.detectConstraintChanges) {
            const constraintChanges = this.detectConstraintModifications(oldParam, newParam);
            changes.push(...constraintChanges);
        }
        // Check for description changes
        if (this.config.detectMetadataChanges && oldParam.description !== newParam.description) {
            changes.push({
                parameterId: oldParam.id,
                changeType: 'modified',
                oldValue: oldParam.description,
                newValue: newParam.description,
                impact: 'low',
                description: `Parameter description updated`,
                affectedTemplates: []
            });
        }
        return changes;
    }
    /**
     * Detect constraint modifications between parameters
     */
    detectConstraintModifications(oldParam, newParam) {
        const changes = [];
        const oldConstraints = this.normalizeConstraints(oldParam.constraints);
        const newConstraints = this.normalizeConstraints(newParam.constraints);
        // Check for added constraints
        for (const [type, newConstraint] of newConstraints) {
            if (!oldConstraints.has(type)) {
                changes.push({
                    parameterId: oldParam.id,
                    changeType: 'constraint_added',
                    newValue: newConstraint,
                    impact: this.calculateConstraintImpact('added', type, newConstraint),
                    description: `Constraint ${type} added`,
                    affectedTemplates: []
                });
            }
            else {
                // Check for modified constraints
                const oldConstraint = oldConstraints.get(type);
                if (!this.deepEqual(oldConstraint, newConstraint)) {
                    changes.push({
                        parameterId: oldParam.id,
                        changeType: 'constraint_modified',
                        oldValue: oldConstraint,
                        newValue: newConstraint,
                        impact: this.calculateConstraintImpact('modified', type, newConstraint),
                        description: `Constraint ${type} modified`,
                        affectedTemplates: []
                    });
                }
            }
        }
        // Check for removed constraints
        for (const [type, oldConstraint] of oldConstraints) {
            if (!newConstraints.has(type)) {
                changes.push({
                    parameterId: oldParam.id,
                    changeType: 'constraint_removed',
                    oldValue: oldConstraint,
                    impact: this.calculateConstraintImpact('removed', type, oldConstraint),
                    description: `Constraint ${type} removed`,
                    affectedTemplates: []
                });
            }
        }
        return changes;
    }
    /**
     * Detect function changes between templates
     */
    detectFunctionChanges(oldTemplate, newTemplate) {
        const changes = [];
        const oldFunctions = new Map((oldTemplate.template.custom || []).map(f => [f.name, f]));
        const newFunctions = new Map((newTemplate.template.custom || []).map(f => [f.name, f]));
        // Find all function names
        const allFunctionNames = new Set([...oldFunctions.keys(), ...newFunctions.keys()]);
        for (const functionName of allFunctionNames) {
            const oldFunction = oldFunctions.get(functionName);
            const newFunction = newFunctions.get(functionName);
            if (oldFunction && newFunction) {
                // Compare function bodies
                const oldBody = oldFunction.body.join('\n');
                const newBody = newFunction.body.join('\n');
                if (oldBody !== newBody) {
                    changes.push({
                        parameterId: `${oldTemplate.templateId}.function.${functionName}`,
                        changeType: 'modified',
                        oldValue: oldBody,
                        newValue: newBody,
                        impact: 'medium',
                        description: `Custom function ${functionName} modified`,
                        affectedTemplates: [oldTemplate.templateId]
                    });
                }
            }
            else if (!oldFunction && newFunction) {
                // Function added
                changes.push({
                    parameterId: `${oldTemplate.templateId}.function.${functionName}`,
                    changeType: 'added',
                    newValue: newFunction.body.join('\n'),
                    impact: 'medium',
                    description: `Custom function ${functionName} added`,
                    affectedTemplates: [oldTemplate.templateId]
                });
            }
            else if (oldFunction && !newFunction) {
                // Function removed
                changes.push({
                    parameterId: `${oldTemplate.templateId}.function.${functionName}`,
                    changeType: 'removed',
                    oldValue: oldFunction.body.join('\n'),
                    impact: 'high',
                    description: `Custom function ${functionName} removed`,
                    affectedTemplates: [oldTemplate.templateId]
                });
            }
        }
        return changes;
    }
    /**
     * Detect metadata changes between templates
     */
    detectMetadataChanges(oldTemplate, newTemplate) {
        const changes = [];
        // Compare template metadata
        if (!this.deepEqual(oldTemplate.metadata, newTemplate.metadata)) {
            changes.push({
                parameterId: `${oldTemplate.templateId}.metadata`,
                changeType: 'modified',
                oldValue: oldTemplate.metadata,
                newValue: newTemplate.metadata,
                impact: 'low',
                description: 'Template metadata updated',
                affectedTemplates: [oldTemplate.templateId]
            });
        }
        return changes;
    }
    /**
     * Calculate version change based on detected changes
     */
    calculateVersionChange(oldTemplate, newTemplate, changes) {
        const oldVersion = oldTemplate.template.meta?.version || '1.0.0';
        let newVersion = oldVersion;
        let changeType = 'patch';
        let reason = 'No breaking changes detected';
        if (this.config.generateSemanticVersions) {
            const criticalChanges = changes.filter(c => c.impact === 'critical');
            const removalChanges = changes.filter(c => c.changeType.includes('removed'));
            const typeChanges = changes.filter(c => c.changeType === 'type_changed');
            if (criticalChanges.length > 0 || removalChanges.length > 0 || typeChanges.length > 0) {
                // Major version bump for breaking changes
                changeType = 'major';
                newVersion = this.bumpVersion(oldVersion, 'major');
                reason = 'Breaking changes detected';
            }
            else if (changes.some(c => c.changeType === 'added')) {
                // Minor version bump for new features
                changeType = 'minor';
                newVersion = this.bumpVersion(oldVersion, 'minor');
                reason = 'New features added';
            }
            else {
                // Patch version bump for fixes
                changeType = 'patch';
                newVersion = this.bumpVersion(oldVersion, 'patch');
                reason = 'Bug fixes and improvements';
            }
        }
        return {
            oldVersion,
            newVersion,
            changeType,
            reason,
            semverCompliant: this.isSemverCompliant(newVersion)
        };
    }
    /**
     * Create added template change
     */
    createAddedTemplateChange(template) {
        const changes = template.parameters.map(param => ({
            parameterId: param.id,
            changeType: 'added',
            newValue: param,
            impact: 'medium',
            description: `New parameter ${param.name} added`,
            affectedTemplates: [template.templateId]
        }));
        return {
            templateId: template.templateId,
            changeType: 'parameter_added',
            changes,
            versionChange: {
                oldVersion: '0.0.0',
                newVersion: '1.0.0',
                changeType: 'minor',
                reason: 'New template added',
                semverCompliant: true
            },
            impact: 'medium',
            requiresRegeneration: true,
            breakingChange: false,
            description: `New template ${template.templateId} added with ${template.parameters.length} parameters`
        };
    }
    /**
     * Create removed template change
     */
    createRemovedTemplateChange(template) {
        const changes = template.parameters.map(param => ({
            parameterId: param.id,
            changeType: 'removed',
            oldValue: param,
            impact: 'high',
            description: `Parameter ${param.name} removed`,
            affectedTemplates: [template.templateId]
        }));
        return {
            templateId: template.templateId,
            changeType: 'parameter_removed',
            changes,
            versionChange: {
                oldVersion: template.template.meta?.version || '1.0.0',
                newVersion: '2.0.0',
                changeType: 'major',
                reason: 'Template removed',
                semverCompliant: true
            },
            impact: 'high',
            requiresRegeneration: false,
            breakingChange: true,
            description: `Template ${template.templateId} removed`
        };
    }
    /**
     * Create added parameter change
     */
    createAddedParameterChange(parameter, templateId) {
        return {
            parameterId: parameter.id,
            changeType: 'added',
            newValue: parameter,
            impact: this.calculateParameterAdditionImpact(parameter),
            description: `New parameter ${parameter.name} added`,
            affectedTemplates: [templateId]
        };
    }
    /**
     * Create removed parameter change
     */
    createRemovedParameterChange(parameter, templateId) {
        return {
            parameterId: parameter.id,
            changeType: 'removed',
            oldValue: parameter,
            impact: this.calculateParameterRemovalImpact(parameter),
            description: `Parameter ${parameter.name} removed`,
            affectedTemplates: [templateId]
        };
    }
    /**
     * Calculate change impact
     */
    calculateChangeImpact(changes) {
        if (changes.some(c => c.impact === 'critical'))
            return 'critical';
        if (changes.some(c => c.impact === 'high'))
            return 'high';
        if (changes.some(c => c.impact === 'medium'))
            return 'medium';
        return 'low';
    }
    /**
     * Calculate type change impact
     */
    calculateTypeChangeImpact(oldType, newType) {
        const compatibilityMatrix = {
            'string': { 'number': 'critical', 'boolean': 'medium', 'object': 'critical' },
            'number': { 'string': 'high', 'boolean': 'medium', 'object': 'critical' },
            'boolean': { 'string': 'low', 'number': 'medium', 'object': 'high' },
            'object': { 'string': 'critical', 'number': 'critical', 'boolean': 'high' }
        };
        return compatibilityMatrix[oldType]?.[newType] || 'medium';
    }
    /**
     * Calculate value change impact
     */
    calculateValueChangeImpact(oldValue, newValue, type) {
        if (oldValue === undefined && newValue !== undefined)
            return 'low';
        if (oldValue !== undefined && newValue === undefined)
            return 'high';
        if (type === 'boolean')
            return 'medium';
        if (type === 'number' && Math.abs((newValue || 0) - (oldValue || 0)) > 100)
            return 'medium';
        return 'low';
    }
    /**
     * Calculate constraint impact
     */
    calculateConstraintImpact(changeType, constraintType, constraint) {
        if (changeType === 'removed')
            return 'high';
        if (constraintType === 'enum')
            return 'medium';
        if (constraintType === 'range')
            return 'medium';
        return 'low';
    }
    /**
     * Calculate parameter addition impact
     */
    calculateParameterAdditionImpact(parameter) {
        if (parameter.constraints && Array.isArray(parameter.constraints) && parameter.constraints.length > 0) {
            return 'medium';
        }
        return 'low';
    }
    /**
     * Calculate parameter removal impact
     */
    calculateParameterRemovalImpact(parameter) {
        if (parameter.defaultValue !== undefined) {
            return 'medium';
        }
        return 'high';
    }
    /**
     * Generate change set ID
     */
    generateChangeSetId() {
        return `changeset_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    /**
     * Generate change summary
     */
    generateChangeSummary(parameterChanges, templateChanges) {
        const changesByType = {};
        const changesByImpact = {};
        for (const change of parameterChanges) {
            changesByType[change.changeType] = (changesByType[change.changeType] || 0) + 1;
            changesByImpact[change.impact] = (changesByImpact[change.impact] || 0) + 1;
        }
        const breakingChanges = templateChanges.filter(t => t.breakingChange).length;
        const templatesAffected = templateChanges.length;
        const parametersAffected = new Set(parameterChanges.map(c => c.parameterId)).size;
        return {
            totalChanges: parameterChanges.length,
            changesByType,
            changesByImpact,
            breakingChanges,
            templatesAffected,
            parametersAffected
        };
    }
    /**
     * Generate recommended actions
     */
    generateRecommendedActions(templateChanges) {
        const actions = [];
        const breakingChanges = templateChanges.filter(t => t.breakingChange);
        if (breakingChanges.length > 0) {
            actions.push('Review breaking changes and update dependent templates');
        }
        const highImpactChanges = templateChanges.filter(t => t.impact === 'high' || t.impact === 'critical');
        if (highImpactChanges.length > 0) {
            actions.push('Test high-impact changes in development environment');
        }
        const versionChanges = templateChanges.filter(t => t.versionChange.changeType === 'major');
        if (versionChanges.length > 0) {
            actions.push('Update version compatibility documentation');
        }
        if (templateChanges.length > 10) {
            actions.push('Consider incremental rollout for large change sets');
        }
        return actions;
    }
    /**
     * Determine template change type
     */
    determineTemplateChangeType(changes) {
        if (changes.some(c => c.changeType.includes('removed')))
            return 'parameter_removed';
        if (changes.some(c => c.changeType === 'added'))
            return 'parameter_added';
        if (changes.some(c => c.changeType === 'modified'))
            return 'parameter_modified';
        return 'metadata_updated';
    }
    /**
     * Generate template change description
     */
    generateTemplateChangeDescription(templateId, changes) {
        const changeCount = changes.length;
        const changeTypes = [...new Set(changes.map(c => c.changeType))];
        return `Template ${templateId} updated with ${changeCount} changes: ${changeTypes.join(', ')}`;
    }
    /**
     * Bump semantic version
     */
    bumpVersion(version, type) {
        const parts = version.split('.').map(Number);
        if (type === 'patch') {
            parts[2] = (parts[2] || 0) + 1;
        }
        else if (type === 'minor') {
            parts[1] = (parts[1] || 0) + 1;
            parts[2] = 0;
        }
        else if (type === 'major') {
            parts[0] = (parts[0] || 1) + 1;
            parts[1] = 0;
            parts[2] = 0;
        }
        return parts.join('.');
    }
    /**
     * Check if version is semver compliant
     */
    isSemverCompliant(version) {
        return /^\d+\.\d+\.\d+$/.test(version);
    }
    /**
     * Normalize constraints to map format
     */
    normalizeConstraints(constraints) {
        const map = new Map();
        if (!constraints)
            return map;
        if (Array.isArray(constraints)) {
            for (const constraint of constraints) {
                map.set(constraint.type, constraint.value);
            }
        }
        else if (typeof constraints === 'object') {
            for (const [key, value] of Object.entries(constraints)) {
                map.set(key, value);
            }
        }
        return map;
    }
    /**
     * Deep equality check
     */
    deepEqual(a, b) {
        if (a === b)
            return true;
        if (a == null || b == null)
            return false;
        if (typeof a !== typeof b)
            return false;
        if (typeof a === 'object') {
            const keysA = Object.keys(a);
            const keysB = Object.keys(b);
            if (keysA.length !== keysB.length)
                return false;
            for (const key of keysA) {
                if (!keysB.includes(key) || !this.deepEqual(a[key], b[key])) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
    /**
     * Get change history for a template
     */
    getTemplateHistory(templateId) {
        return this.versionHistory.get(templateId) || null;
    }
    /**
     * Get all change sets
     */
    getChangeSets() {
        return [...this.changeSets];
    }
    /**
     * Get change sets by date range
     */
    getChangeSetsByDateRange(startDate, endDate) {
        return this.changeSets.filter(cs => cs.timestamp >= startDate && cs.timestamp <= endDate);
    }
}
exports.ParameterChangeDetector = ParameterChangeDetector;
//# sourceMappingURL=change-detector.js.map