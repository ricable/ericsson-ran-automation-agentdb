"use strict";
/**
 * Phase 3 RANOps ENM CLI Integration - Type Definitions
 *
 * This file contains comprehensive TypeScript interfaces for the
 * RANOps ENM CLI integration system, including cognitive command generation,
 * template-to-CLI conversion, and batch operations management.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCommand = exports.isRTBTemplate = exports.iscmeditCommand = exports.ComplexityLevel = exports.ExpertiseLevel = exports.CycleCriticality = exports.DependencyStrength = exports.ExecutionType = exports.ExecutionStatus = exports.RiskLevel = exports.DependencyType = exports.cmeditOperationType = exports.OptimizationGoal = exports.ConfigurationScope = exports.NodeType = void 0;
// ============================================================================
// Core Types and Enums
// ============================================================================
var NodeType;
(function (NodeType) {
    NodeType["ENB"] = "ENB";
    NodeType["GNB"] = "GNB";
    NodeType["CELL_FDD"] = "CellFDD";
    NodeType["CELL_TDD"] = "CellTDD";
    NodeType["SECTOR"] = "Sector";
    NodeType["ANTENNA"] = "Antenna";
})(NodeType || (exports.NodeType = NodeType = {}));
var ConfigurationScope;
(function (ConfigurationScope) {
    ConfigurationScope["NETWORK"] = "network";
    ConfigurationScope["SUBNETWORK"] = "subnetwork";
    ConfigurationScope["MANAGED_ELEMENT"] = "managed_element";
    ConfigurationScope["ME_CONTEXT"] = "me_context";
})(ConfigurationScope || (exports.ConfigurationScope = ConfigurationScope = {}));
var OptimizationGoal;
(function (OptimizationGoal) {
    OptimizationGoal["COVERAGE"] = "coverage";
    OptimizationGoal["CAPACITY"] = "capacity";
    OptimizationGoal["QUALITY"] = "quality";
    OptimizationGoal["ENERGY_EFFICIENCY"] = "energy_efficiency";
    OptimizationGoal["MOBILITY"] = "mobility";
    OptimizationGoal["INTERFERENCE_MITIGATION"] = "interference_mitigation";
})(OptimizationGoal || (exports.OptimizationGoal = OptimizationGoal = {}));
var cmeditOperationType;
(function (cmeditOperationType) {
    cmeditOperationType["GET"] = "get";
    cmeditOperationType["SET"] = "set";
    cmeditOperationType["CREATE"] = "create";
    cmeditOperationType["DELETE"] = "delete";
    cmeditOperationType["MON"] = "mon";
    cmeditOperationType["UNMON"] = "unmon";
})(cmeditOperationType || (exports.cmeditOperationType = cmeditOperationType = {}));
var DependencyType;
(function (DependencyType) {
    DependencyType["RESOURCE"] = "resource";
    DependencyType["DATA"] = "data";
    DependencyType["SEQUENTIAL"] = "sequential";
    DependencyType["EXCLUSIVE"] = "exclusive";
    DependencyType["TEMPORAL"] = "temporal";
    DependencyType["CONFIGURATION"] = "configuration";
})(DependencyType || (exports.DependencyType = DependencyType = {}));
var RiskLevel;
(function (RiskLevel) {
    RiskLevel["LOW"] = "low";
    RiskLevel["MEDIUM"] = "medium";
    RiskLevel["HIGH"] = "high";
    RiskLevel["CRITICAL"] = "critical";
})(RiskLevel || (exports.RiskLevel = RiskLevel = {}));
var ExecutionStatus;
(function (ExecutionStatus) {
    ExecutionStatus["PENDING"] = "pending";
    ExecutionStatus["IN_PROGRESS"] = "in_progress";
    ExecutionStatus["COMPLETED"] = "completed";
    ExecutionStatus["FAILED"] = "failed";
    ExecutionStatus["ROLLED_BACK"] = "rolled_back";
    ExecutionStatus["CANCELLED"] = "cancelled";
})(ExecutionStatus || (exports.ExecutionStatus = ExecutionStatus = {}));
var ExecutionType;
(function (ExecutionType) {
    ExecutionType["SEQUENTIAL"] = "sequential";
    ExecutionType["PARALLEL"] = "parallel";
    ExecutionType["CONDITIONAL"] = "conditional";
    ExecutionType["APPROVAL_REQUIRED"] = "approval_required";
})(ExecutionType || (exports.ExecutionType = ExecutionType = {}));
var DependencyStrength;
(function (DependencyStrength) {
    DependencyStrength["WEAK"] = "weak";
    DependencyStrength["MODERATE"] = "moderate";
    DependencyStrength["STRONG"] = "strong";
    DependencyStrength["MANDATORY"] = "mandatory";
})(DependencyStrength || (exports.DependencyStrength = DependencyStrength = {}));
var CycleCriticality;
(function (CycleCriticality) {
    CycleCriticality["LOW"] = "low";
    CycleCriticality["MEDIUM"] = "medium";
    CycleCriticality["HIGH"] = "high";
    CycleCriticality["CRITICAL"] = "critical";
})(CycleCriticality || (exports.CycleCriticality = CycleCriticality = {}));
var ExpertiseLevel;
(function (ExpertiseLevel) {
    ExpertiseLevel["BEGINNER"] = "beginner";
    ExpertiseLevel["INTERMEDIATE"] = "intermediate";
    ExpertiseLevel["ADVANCED"] = "advanced";
    ExpertiseLevel["EXPERT"] = "expert";
})(ExpertiseLevel || (exports.ExpertiseLevel = ExpertiseLevel = {}));
var ComplexityLevel;
(function (ComplexityLevel) {
    ComplexityLevel["SIMPLE"] = "simple";
    ComplexityLevel["MODERATE"] = "moderate";
    ComplexityLevel["COMPLEX"] = "complex";
    ComplexityLevel["VERY_COMPLEX"] = "very_complex";
})(ComplexityLevel || (exports.ComplexityLevel = ComplexityLevel = {}));
// ============================================================================
// Type Guards and Utilities
// ============================================================================
function iscmeditCommand(obj) {
    return obj &&
        typeof obj.id === 'string' &&
        Object.values(cmeditOperationType).includes(obj.operation) &&
        typeof obj.target === 'string' &&
        Array.isArray(obj.parameters);
}
exports.iscmeditCommand = iscmeditCommand;
function isRTBTemplate(obj) {
    return obj &&
        typeof obj.id === 'string' &&
        typeof obj.name === 'string' &&
        typeof obj.version === 'string' &&
        typeof obj.priority === 'number' &&
        Array.isArray(obj.parameters);
}
exports.isRTBTemplate = isRTBTemplate;
function validateCommand(command) {
    const errors = [];
    const warnings = [];
    if (!command.id) {
        errors.push({
            code: 'MISSING_ID',
            message: 'Command ID is required',
            severity: 'error'
        });
    }
    if (!Object.values(cmeditOperationType).includes(command.operation)) {
        errors.push({
            code: 'INVALID_OPERATION',
            message: `Invalid operation: ${command.operation}`,
            severity: 'error'
        });
    }
    return {
        isValid: errors.length === 0,
        errors,
        warnings,
        suggestions: [],
        metadata: {
            validationTime: new Date(),
            validatorVersion: '1.0.0'
        }
    };
}
exports.validateCommand = validateCommand;
//# sourceMappingURL=ranops-enm-cli-integration.js.map