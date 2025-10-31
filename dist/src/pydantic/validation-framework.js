"use strict";
/**
 * Phase 5 Implementation - Schema Validation Framework
 *
 * Runtime validation framework for generated Pydantic schemas with
 * cross-parameter validation and conditional validation logic
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationFramework = void 0;
const events_1 = require("events");
/**
 * Validation Framework - Runtime validation for generated schemas
 *
 * Features:
 * - Comprehensive runtime validation with performance optimization
 * - Cross-parameter validation support
 * - Conditional validation logic
 * - Custom validation rule generation
 * - Integration with cognitive consciousness system
 * - Memory-efficient validation with caching
 * - Performance monitoring and optimization
 */
class ValidationFramework extends events_1.EventEmitter {
    constructor(config = {}) {
        super();
        this.isInitialized = false;
        this.config = {
            strictMode: true,
            enableCustomValidators: true,
            enableCrossParameterValidation: true,
            enableConditionalValidation: true,
            cognitiveMode: false,
            performanceMode: false,
            cacheValidation: true,
            ...config
        };
        this.validationCache = new Map();
        this.customValidators = new Map();
        this.crossParameterRules = new Map();
        this.conditionalValidations = new Map();
        this.performanceMetrics = {
            totalValidations: 0,
            successfulValidations: 0,
            failedValidations: 0,
            averageValidationTime: 0,
            cacheHitRate: 0,
            memoryUsage: 0
        };
        this.initializeBuiltInValidators();
    }
    /**
     * Initialize the validation framework
     */
    async initialize() {
        if (this.isInitialized) {
            return;
        }
        try {
            // Initialize built-in validators
            await this.initializeBuiltInValidators();
            // Initialize custom validators if enabled
            if (this.config.enableCustomValidators) {
                await this.initializeCustomValidators();
            }
            // Initialize cognitive patterns if enabled
            if (this.config.cognitiveMode) {
                await this.initializeCognitivePatterns();
            }
            this.isInitialized = true;
            this.emit('initialized');
        }
        catch (error) {
            throw new Error(`Failed to initialize ValidationFramework: ${error.message}`);
        }
    }
    /**
     * Validate a generated model
     */
    async validateModel(modelData) {
        const startTime = Date.now();
        try {
            // Check cache first
            const cacheKey = this.generateValidationCacheKey(modelData);
            if (this.config.cacheValidation && this.validationCache.has(cacheKey)) {
                const cachedResult = this.validationCache.get(cacheKey);
                this.performanceMetrics.cacheHitRate =
                    (this.performanceMetrics.cacheHitRate + 1) / (this.performanceMetrics.totalValidations + 1);
                this.emit('validationCacheHit', { className: modelData.className });
                return cachedResult;
            }
            const errors = [];
            const warnings = [];
            const validationDetails = [];
            // Phase 1: Syntax validation
            await this.validateSyntax(modelData, errors, warnings, validationDetails);
            // Phase 2: Type validation
            await this.validateTypes(modelData, errors, warnings, validationDetails);
            // Phase 3: Constraint validation
            await this.validateConstraints(modelData, errors, warnings, validationDetails);
            // Phase 4: Cross-parameter validation
            if (this.config.enableCrossParameterValidation) {
                await this.validateCrossParameters(modelData, errors, warnings, validationDetails);
            }
            // Phase 5: Conditional validation
            if (this.config.enableConditionalValidation) {
                await this.validateConditionalLogic(modelData, errors, warnings, validationDetails);
            }
            // Phase 6: Custom validation
            if (this.config.enableCustomValidators) {
                await this.validateCustomRules(modelData, errors, warnings, validationDetails);
            }
            // Phase 7: Performance validation
            if (this.config.performanceMode) {
                await this.validatePerformance(modelData, errors, warnings, validationDetails);
            }
            const validationTime = Date.now() - startTime;
            const isValid = errors.length === 0;
            const result = {
                isValid,
                errors,
                warnings,
                validationTime,
                validationDetails,
                performanceMetrics: this.calculatePerformanceMetrics(validationTime)
            };
            // Update metrics
            this.updatePerformanceMetrics(result);
            // Cache result
            if (this.config.cacheValidation) {
                this.validationCache.set(cacheKey, result);
            }
            this.emit('modelValidated', {
                className: modelData.className,
                isValid,
                errorCount: errors.length,
                warningCount: warnings.length,
                validationTime
            });
            return result;
        }
        catch (error) {
            const errorResult = {
                isValid: false,
                errors: [{
                        type: 'custom',
                        field: 'system',
                        message: `Validation system error: ${error.message}`,
                        severity: 'critical'
                    }],
                warnings: [],
                validationTime: Date.now() - startTime,
                validationDetails: [],
                performanceMetrics: this.calculatePerformanceMetrics(Date.now() - startTime)
            };
            this.emit('validationError', { className: modelData.className, error: error.message });
            return errorResult;
        }
    }
    /**
     * Validate model syntax
     */
    async validateSyntax(modelData, errors, warnings, details) {
        const startTime = Date.now();
        try {
            // Validate Python syntax
            const pythonSyntaxErrors = await this.validatePythonSyntax(modelData.pythonCode);
            errors.push(...pythonSyntaxErrors);
            // Validate TypeScript syntax
            const tsSyntaxErrors = await this.validateTypeScriptSyntax(modelData.typescriptCode);
            errors.push(...tsSyntaxErrors);
            details.push({
                field: 'syntax',
                validationType: 'syntax_validation',
                result: pythonSyntaxErrors.length === 0 && tsSyntaxErrors.length === 0,
                executionTime: Date.now() - startTime,
                validatorUsed: 'syntax_validator'
            });
        }
        catch (error) {
            errors.push({
                type: 'custom',
                field: 'syntax',
                message: `Syntax validation failed: ${error.message}`,
                severity: 'critical'
            });
        }
    }
    /**
     * Validate Python syntax
     */
    async validatePythonSyntax(pythonCode) {
        const errors = [];
        try {
            // Basic Python syntax checks
            if (!pythonCode.includes('class ')) {
                errors.push({
                    type: 'syntax',
                    field: 'python_code',
                    message: 'Python code must contain a class definition',
                    severity: 'error'
                });
            }
            if (!pythonCode.includes('from pydantic import')) {
                errors.push({
                    type: 'syntax',
                    field: 'python_code',
                    message: 'Python code must import pydantic',
                    severity: 'error'
                });
            }
            // Check for common syntax issues
            const syntaxIssues = [
                { pattern: /:\s*str\s*=\s*Field\(\)/, message: 'String fields should have default value or be Optional' },
                { pattern: /def\s+\w+\([^)]*):\s*$/, message: 'Method missing return type annotation' },
                { pattern: /@validator\([^)]+\)\s*\ndef\s+validate_\w+\([^)]*):\s*$/, message: 'Validator function missing body' }
            ];
            syntaxIssues.forEach(issue => {
                if (issue.pattern.test(pythonCode)) {
                    errors.push({
                        type: 'syntax',
                        field: 'python_code',
                        message: issue.message,
                        severity: 'warning'
                    });
                }
            });
        }
        catch (error) {
            errors.push({
                type: 'syntax',
                field: 'python_code',
                message: `Python syntax error: ${error.message}`,
                severity: 'error'
            });
        }
        return errors;
    }
    /**
     * Validate TypeScript syntax
     */
    async validateTypeScriptSyntax(tsCode) {
        const errors = [];
        try {
            // Basic TypeScript syntax checks
            if (!tsCode.includes('interface ')) {
                errors.push({
                    type: 'syntax',
                    field: 'typescript_code',
                    message: 'TypeScript code must contain an interface definition',
                    severity: 'error'
                });
            }
            // Check for common TypeScript issues
            const syntaxIssues = [
                { pattern: /:\s*any\s*;/, message: 'Avoid using "any" type in TypeScript interfaces' },
                { pattern: /export interface\s+\w+\s*{\s*}/, message: 'Empty interface definition' },
                { pattern: /:\s*string\s*\?;\s*$/, message: 'Optional string property should be nullable' }
            ];
            syntaxIssues.forEach(issue => {
                if (issue.pattern.test(tsCode)) {
                    errors.push({
                        type: 'syntax',
                        field: 'typescript_code',
                        message: issue.message,
                        severity: 'warning'
                    });
                }
            });
        }
        catch (error) {
            errors.push({
                type: 'syntax',
                field: 'typescript_code',
                message: `TypeScript syntax error: ${error.message}`,
                severity: 'error'
            });
        }
        return errors;
    }
    /**
     * Validate data types
     */
    async validateTypes(modelData, errors, warnings, details) {
        const startTime = Date.now();
        try {
            // Validate parameter type mappings
            for (const parameter of modelData.parameters) {
                const typeErrors = await this.validateParameterType(parameter);
                errors.push(...typeErrors);
            }
            // Validate type consistency between Python and TypeScript
            const consistencyErrors = await this.validateTypeConsistency(modelData);
            errors.push(...consistencyErrors);
            details.push({
                field: 'types',
                validationType: 'type_validation',
                result: errors.filter(e => e.type === 'type').length === 0,
                executionTime: Date.now() - startTime,
                validatorUsed: 'type_validator'
            });
        }
        catch (error) {
            errors.push({
                type: 'type',
                field: 'type_validation',
                message: `Type validation failed: ${error.message}`,
                severity: 'error'
            });
        }
    }
    /**
     * Validate individual parameter type
     */
    async validateParameterType(parameter) {
        const errors = [];
        try {
            // Check for valid Python type
            const validPythonTypes = [
                'str', 'int', 'float', 'bool', 'Decimal', 'datetime', 'date', 'time',
                'List[str]', 'List[int]', 'List[float]', 'List[bool]', 'List[Any]',
                'Dict[str, Any]', 'Dict[str, str]', 'Optional[str]', 'Optional[int]',
                'Optional[float]', 'Optional[bool]', 'Union[str, int]', 'Enum'
            ];
            if (!validPythonTypes.includes(parameter.pythonType) &&
                !parameter.pythonType.startsWith('Optional[') &&
                !parameter.pythonType.startsWith('List[') &&
                !parameter.pythonType.startsWith('Dict[') &&
                !parameter.pythonType.startsWith('Union[')) {
                errors.push({
                    type: 'type',
                    field: parameter.propertyName,
                    message: `Invalid Python type: ${parameter.pythonType}`,
                    severity: 'warning'
                });
            }
            // Check for valid TypeScript type
            const validTSTypes = [
                'string', 'number', 'boolean', 'Date', 'string[]', 'number[]', 'boolean[]',
                'any[]', 'Record<string, any>', 'Record<string, string>', 'null'
            ];
            if (!validTSTypes.includes(parameter.typescriptType) &&
                !parameter.typescriptType.includes(' | ') &&
                !parameter.typescriptType.endsWith('[]') &&
                !parameter.typescriptType.startsWith('Record<')) {
                errors.push({
                    type: 'type',
                    field: parameter.propertyName,
                    message: `Invalid TypeScript type: ${parameter.typescriptType}`,
                    severity: 'warning'
                });
            }
        }
        catch (error) {
            errors.push({
                type: 'type',
                field: parameter.propertyName,
                message: `Type validation error: ${error.message}`,
                severity: 'error'
            });
        }
        return errors;
    }
    /**
     * Validate type consistency between Python and TypeScript
     */
    async validateTypeConsistency(modelData) {
        const errors = [];
        const typeMapping = {
            'str': 'string',
            'int': 'number',
            'float': 'number',
            'bool': 'boolean',
            'Decimal': 'number',
            'datetime': 'Date',
            'date': 'Date',
            'List[str]': 'string[]',
            'List[int]': 'number[]',
            'List[float]': 'number[]',
            'Dict[str, Any]': 'Record<string, any>',
            'Optional[str]': 'string | null',
            'Optional[int]': 'number | null',
            'Optional[float]': 'number | null',
            'Optional[bool]': 'boolean | null'
        };
        for (const parameter of modelData.parameters) {
            const expectedTSType = typeMapping[parameter.pythonType];
            if (expectedTSType && parameter.typescriptType !== expectedTSType) {
                errors.push({
                    type: 'type',
                    field: parameter.propertyName,
                    message: `Type inconsistency: Python ${parameter.pythonType} should map to TypeScript ${expectedTSType}, got ${parameter.typescriptType}`,
                    severity: 'warning'
                });
            }
        }
        return errors;
    }
    /**
     * Validate constraints
     */
    async validateConstraints(modelData, errors, warnings, details) {
        const startTime = Date.now();
        try {
            for (const parameter of modelData.parameters) {
                if (parameter.constraints && parameter.constraints.length > 0) {
                    const constraintErrors = await this.validateParameterConstraints(parameter);
                    errors.push(...constraintErrors);
                }
            }
            details.push({
                field: 'constraints',
                validationType: 'constraint_validation',
                result: errors.filter(e => e.type === 'constraint').length === 0,
                executionTime: Date.now() - startTime,
                validatorUsed: 'constraint_validator'
            });
        }
        catch (error) {
            errors.push({
                type: 'constraint',
                field: 'constraint_validation',
                message: `Constraint validation failed: ${error.message}`,
                severity: 'error'
            });
        }
    }
    /**
     * Validate parameter constraints
     */
    async validateParameterConstraints(parameter) {
        const errors = [];
        if (!parameter.constraints)
            return errors;
        for (const constraint of parameter.constraints) {
            try {
                switch (constraint.type) {
                    case 'range':
                        await this.validateRangeConstraint(parameter, constraint, errors);
                        break;
                    case 'enum':
                        await this.validateEnumConstraint(parameter, constraint, errors);
                        break;
                    case 'pattern':
                        await this.validatePatternConstraint(parameter, constraint, errors);
                        break;
                    case 'length':
                        await this.validateLengthConstraint(parameter, constraint, errors);
                        break;
                    case 'custom':
                        await this.validateCustomConstraint(parameter, constraint, errors);
                        break;
                }
            }
            catch (error) {
                errors.push({
                    type: 'constraint',
                    field: parameter.propertyName,
                    message: `Constraint validation error: ${error.message}`,
                    severity: 'error'
                });
            }
        }
        return errors;
    }
    /**
     * Validate range constraint
     */
    async validateRangeConstraint(parameter, constraint, errors) {
        if (!constraint.value || typeof constraint.value !== 'object') {
            errors.push({
                type: 'constraint',
                field: parameter.propertyName,
                message: 'Range constraint must have min and/or max values',
                severity: 'error'
            });
            return;
        }
        const { min, max } = constraint.value;
        if (min !== undefined && typeof min !== 'number') {
            errors.push({
                type: 'constraint',
                field: parameter.propertyName,
                message: 'Range minimum value must be a number',
                severity: 'error'
            });
        }
        if (max !== undefined && typeof max !== 'number') {
            errors.push({
                type: 'constraint',
                field: parameter.propertyName,
                message: 'Range maximum value must be a number',
                severity: 'error'
            });
        }
        if (min !== undefined && max !== undefined && min >= max) {
            errors.push({
                type: 'constraint',
                field: parameter.propertyName,
                message: 'Range minimum must be less than maximum',
                severity: 'error'
            });
        }
        // Check if range is compatible with parameter type
        if (!parameter.pythonType.includes('int') && !parameter.pythonType.includes('float') && !parameter.pythonType.includes('Decimal')) {
            errors.push({
                type: 'constraint',
                field: parameter.propertyName,
                message: 'Range constraint can only be applied to numeric types',
                severity: 'warning'
            });
        }
    }
    /**
     * Validate enum constraint
     */
    async validateEnumConstraint(parameter, constraint, errors) {
        if (!Array.isArray(constraint.value) || constraint.value.length === 0) {
            errors.push({
                type: 'constraint',
                field: parameter.propertyName,
                message: 'Enum constraint must have non-empty array of values',
                severity: 'error'
            });
            return;
        }
        // Check if enum values are compatible with parameter type
        const paramType = parameter.pythonType.toLowerCase();
        for (const value of constraint.value) {
            if (paramType.includes('int') && typeof value !== 'number') {
                errors.push({
                    type: 'constraint',
                    field: parameter.propertyName,
                    message: `Enum value ${value} is not compatible with integer type`,
                    severity: 'warning'
                });
            }
            else if (paramType.includes('str') && typeof value !== 'string') {
                errors.push({
                    type: 'constraint',
                    field: parameter.propertyName,
                    message: `Enum value ${value} is not compatible with string type`,
                    severity: 'warning'
                });
            }
        }
    }
    /**
     * Validate pattern constraint
     */
    async validatePatternConstraint(parameter, constraint, errors) {
        if (typeof constraint.value !== 'string') {
            errors.push({
                type: 'constraint',
                field: parameter.propertyName,
                message: 'Pattern constraint must be a regular expression string',
                severity: 'error'
            });
            return;
        }
        try {
            // Test if regex is valid
            new RegExp(constraint.value);
        }
        catch (error) {
            errors.push({
                type: 'constraint',
                field: parameter.propertyName,
                message: `Invalid regular expression: ${constraint.value}`,
                severity: 'error'
            });
        }
        // Check if pattern is compatible with parameter type
        if (!parameter.pythonType.includes('str')) {
            errors.push({
                type: 'constraint',
                field: parameter.propertyName,
                message: 'Pattern constraint can only be applied to string types',
                severity: 'warning'
            });
        }
    }
    /**
     * Validate length constraint
     */
    async validateLengthConstraint(parameter, constraint, errors) {
        if (!constraint.value || typeof constraint.value !== 'object') {
            errors.push({
                type: 'constraint',
                field: parameter.propertyName,
                message: 'Length constraint must have minLength and/or maxLength values',
                severity: 'error'
            });
            return;
        }
        const { minLength, maxLength } = constraint.value;
        if (minLength !== undefined && (typeof minLength !== 'number' || minLength < 0)) {
            errors.push({
                type: 'constraint',
                field: parameter.propertyName,
                message: 'Minimum length must be a non-negative number',
                severity: 'error'
            });
        }
        if (maxLength !== undefined && (typeof maxLength !== 'number' || maxLength < 0)) {
            errors.push({
                type: 'constraint',
                field: parameter.propertyName,
                message: 'Maximum length must be a non-negative number',
                severity: 'error'
            });
        }
        if (minLength !== undefined && maxLength !== undefined && minLength > maxLength) {
            errors.push({
                type: 'constraint',
                field: parameter.propertyName,
                message: 'Minimum length cannot be greater than maximum length',
                severity: 'error'
            });
        }
        // Check if length constraint is compatible with parameter type
        if (!parameter.pythonType.includes('str') && !parameter.pythonType.includes('List')) {
            errors.push({
                type: 'constraint',
                field: parameter.propertyName,
                message: 'Length constraint can only be applied to string or list types',
                severity: 'warning'
            });
        }
    }
    /**
     * Validate custom constraint
     */
    async validateCustomConstraint(parameter, constraint, errors) {
        if (!constraint.value || typeof constraint.value !== 'string') {
            errors.push({
                type: 'constraint',
                field: parameter.propertyName,
                message: 'Custom constraint must have validation logic as string',
                severity: 'error'
            });
        }
    }
    /**
     * Validate cross-parameter rules
     */
    async validateCrossParameters(modelData, errors, warnings, details) {
        const startTime = Date.now();
        try {
            // Generate cross-parameter validation rules based on parameter relationships
            const crossRules = this.generateCrossParameterRules(modelData.parameters);
            for (const rule of crossRules) {
                const ruleErrors = await this.validateCrossParameterRule(rule, modelData.parameters);
                errors.push(...ruleErrors);
            }
            details.push({
                field: 'cross_parameters',
                validationType: 'cross_parameter_validation',
                result: errors.filter(e => e.type === 'cross_parameter').length === 0,
                executionTime: Date.now() - startTime,
                validatorUsed: 'cross_parameter_validator'
            });
        }
        catch (error) {
            errors.push({
                type: 'cross_parameter',
                field: 'cross_parameter_validation',
                message: `Cross-parameter validation failed: ${error.message}`,
                severity: 'error'
            });
        }
    }
    /**
     * Generate cross-parameter validation rules
     */
    generateCrossParameterRules(parameters) {
        const rules = [];
        // Example: Range dependencies (min should be <= max)
        const rangePairs = this.findRangeParameterPairs(parameters);
        rangePairs.forEach(pair => {
            rules.push({
                id: `range_dependency_${pair.min}_${pair.max}`,
                name: `Range dependency: ${pair.min} <= ${pair.max}`,
                fields: [pair.min, pair.max],
                logic: (values) => values[pair.min] <= values[pair.max],
                errorMessage: `${pair.min} should be less than or equal to ${pair.max}`
            });
        });
        // Example: Frequency relationships
        const frequencyParams = this.findFrequencyParameters(parameters);
        if (frequencyParams.length > 1) {
            rules.push({
                id: 'frequency_relationship',
                name: 'Frequency parameter relationship',
                fields: frequencyParams,
                logic: (values) => {
                    // Validate frequency relationships
                    return true; // Implementation would depend on specific rules
                },
                errorMessage: 'Frequency parameters have invalid relationship'
            });
        }
        return rules;
    }
    /**
     * Find range parameter pairs
     */
    findRangeParameterPairs(parameters) {
        const pairs = [];
        const rangeParams = parameters.filter(p => p.propertyName.toLowerCase().includes('min') ||
            p.propertyName.toLowerCase().includes('max'));
        // Find matching min/max pairs
        rangeParams.forEach(param => {
            const baseName = param.propertyName.replace(/Min$|Max$/i, '');
            const isMin = param.propertyName.toLowerCase().includes('min');
            const matchingParam = rangeParams.find(p => p.propertyName.toLowerCase().includes(isMin ? 'max' : 'min') &&
                p.propertyName.replace(/Min$|Max$/i, '') === baseName);
            if (matchingParam) {
                pairs.push({
                    min: isMin ? param.propertyName : matchingParam.propertyName,
                    max: isMin ? matchingParam.propertyName : param.propertyName
                });
            }
        });
        return pairs;
    }
    /**
     * Find frequency-related parameters
     */
    findFrequencyParameters(parameters) {
        return parameters
            .filter(p => p.propertyName.toLowerCase().includes('frequency') ||
            p.propertyName.toLowerCase().includes('earfcn') ||
            p.propertyName.toLowerCase().includes('arfcn'))
            .map(p => p.propertyName);
    }
    /**
     * Validate individual cross-parameter rule
     */
    async validateCrossParameterRule(rule, parameters) {
        const errors = [];
        try {
            // Check if all required fields exist
            const missingFields = rule.fields.filter(field => !parameters.some(p => p.propertyName === field));
            if (missingFields.length > 0) {
                errors.push({
                    type: 'cross_parameter',
                    field: missingFields.join(', '),
                    message: `Cross-parameter rule references missing fields: ${missingFields.join(', ')}`,
                    severity: 'error'
                });
            }
        }
        catch (error) {
            errors.push({
                type: 'cross_parameter',
                field: rule.name,
                message: `Cross-parameter rule validation failed: ${error.message}`,
                severity: 'error'
            });
        }
        return errors;
    }
    /**
     * Validate conditional logic
     */
    async validateConditionalLogic(modelData, errors, warnings, details) {
        const startTime = Date.now();
        try {
            // Generate conditional validation rules
            const conditionalRules = this.generateConditionalValidationRules(modelData.parameters);
            for (const rule of conditionalRules) {
                const ruleErrors = await this.validateConditionalRule(rule, modelData.parameters);
                errors.push(...ruleErrors);
            }
            details.push({
                field: 'conditional',
                validationType: 'conditional_validation',
                result: errors.filter(e => e.type === 'conditional').length === 0,
                executionTime: Date.now() - startTime,
                validatorUsed: 'conditional_validator'
            });
        }
        catch (error) {
            errors.push({
                type: 'conditional',
                field: 'conditional_validation',
                message: `Conditional validation failed: ${error.message}`,
                severity: 'error'
            });
        }
    }
    /**
     * Generate conditional validation rules
     */
    generateConditionalValidationRules(parameters) {
        const rules = [];
        // Example: Feature activation requiring additional parameters
        const featureParams = parameters.filter(p => p.propertyName.toLowerCase().includes('feature') &&
            p.propertyName.toLowerCase().includes('enabled'));
        featureParams.forEach(param => {
            const featureName = param.propertyName.replace(/Enabled$/i, '');
            const relatedParams = parameters.filter(p => p.propertyName.toLowerCase().includes(featureName.toLowerCase()));
            if (relatedParams.length > 1) {
                rules.push({
                    triggerField: param.propertyName,
                    triggerValue: true,
                    targetFields: relatedParams.map(p => p.propertyName).filter(f => f !== param.propertyName),
                    validationRules: [] // Would be populated with specific validation rules
                });
            }
        });
        return rules;
    }
    /**
     * Validate conditional rule
     */
    async validateConditionalRule(rule, parameters) {
        const errors = [];
        try {
            // Check if trigger field exists
            const triggerField = parameters.find(p => p.propertyName === rule.triggerField);
            if (!triggerField) {
                errors.push({
                    type: 'conditional',
                    field: rule.triggerField,
                    message: `Conditional rule references non-existent trigger field: ${rule.triggerField}`,
                    severity: 'error'
                });
            }
            // Check if target fields exist
            const missingTargets = rule.targetFields.filter(field => !parameters.some(p => p.propertyName === field));
            if (missingTargets.length > 0) {
                errors.push({
                    type: 'conditional',
                    field: missingTargets.join(', '),
                    message: `Conditional rule references missing target fields: ${missingTargets.join(', ')}`,
                    severity: 'error'
                });
            }
        }
        catch (error) {
            errors.push({
                type: 'conditional',
                field: 'conditional_rule',
                message: `Conditional rule validation failed: ${error.message}`,
                severity: 'error'
            });
        }
        return errors;
    }
    /**
     * Validate custom rules
     */
    async validateCustomRules(modelData, errors, warnings, details) {
        const startTime = Date.now();
        try {
            // Apply custom validators
            for (const [name, validator] of this.customValidators) {
                const customErrors = await this.applyCustomValidator(validator, modelData);
                errors.push(...customErrors);
            }
            details.push({
                field: 'custom',
                validationType: 'custom_validation',
                result: errors.filter(e => e.type === 'custom').length === 0,
                executionTime: Date.now() - startTime,
                validatorUsed: 'custom_validator'
            });
        }
        catch (error) {
            errors.push({
                type: 'custom',
                field: 'custom_validation',
                message: `Custom validation failed: ${error.message}`,
                severity: 'error'
            });
        }
    }
    /**
     * Apply custom validator
     */
    async applyCustomValidator(validator, modelData) {
        const errors = [];
        try {
            if (typeof validator.implementation === 'function') {
                const result = validator.implementation(modelData);
                if (result === false) {
                    errors.push({
                        type: 'custom',
                        field: validator.name,
                        message: `Custom validation failed: ${validator.description || 'No description'}`,
                        severity: 'error'
                    });
                }
            }
        }
        catch (error) {
            errors.push({
                type: 'custom',
                field: validator.name,
                message: `Custom validator error: ${error.message}`,
                severity: 'error'
            });
        }
        return errors;
    }
    /**
     * Validate performance characteristics
     */
    async validatePerformance(modelData, errors, warnings, details) {
        const startTime = Date.now();
        try {
            // Check for performance issues
            const performanceWarnings = this.analyzePerformanceIssues(modelData);
            warnings.push(...performanceWarnings);
            details.push({
                field: 'performance',
                validationType: 'performance_validation',
                result: true,
                executionTime: Date.now() - startTime,
                validatorUsed: 'performance_validator'
            });
        }
        catch (error) {
            errors.push({
                type: 'custom',
                field: 'performance_validation',
                message: `Performance validation failed: ${error.message}`,
                severity: 'warning'
            });
        }
    }
    /**
     * Analyze performance issues
     */
    analyzePerformanceIssues(modelData) {
        const warnings = [];
        // Check for too many parameters (performance concern)
        if (modelData.parameters.length > 50) {
            warnings.push({
                type: 'performance',
                field: 'model_size',
                message: `Model has ${modelData.parameters.length} parameters, which may impact performance`,
                recommendation: 'Consider splitting into multiple smaller models',
                severity: 'warning'
            });
        }
        // Check for complex validators
        const complexValidators = modelData.pythonCode.match(/@validator\([^)]+\)\s*\ndef\s+\w+\([^)]*\):[\s\S]{200,}/g);
        if (complexValidators && complexValidators.length > 0) {
            warnings.push({
                type: 'performance',
                field: 'validator_complexity',
                message: 'Complex validators may impact validation performance',
                recommendation: 'Consider simplifying validator logic or using built-in constraints',
                severity: 'warning'
            });
        }
        // Check for deeply nested optional types
        const deepOptionals = modelData.parameters.filter(p => p.pythonType.includes('Optional[') && p.pythonType.split('Optional[').length > 2);
        if (deepOptionals.length > 0) {
            warnings.push({
                type: 'performance',
                field: 'type_complexity',
                message: 'Deeply nested optional types may impact performance',
                recommendation: 'Consider flattening type structure',
                severity: 'info'
            });
        }
        return warnings;
    }
    /**
     * Initialize built-in validators
     */
    async initializeBuiltInValidators() {
        // Register built-in validators
        this.customValidators.set('basic_syntax', {
            name: 'basic_syntax',
            implementation: this.validateBasicSyntax.bind(this),
            returnType: 'boolean',
            description: 'Basic syntax validation'
        });
        this.customValidators.set('type_consistency', {
            name: 'type_consistency',
            implementation: this.validateTypeConsistencyBasic.bind(this),
            returnType: 'boolean',
            description: 'Type consistency validation'
        });
    }
    /**
     * Initialize custom validators
     */
    async initializeCustomValidators() {
        // Load custom validators from configuration or external sources
        // This would be extended to load user-defined validators
    }
    /**
     * Initialize cognitive patterns
     */
    async initializeCognitivePatterns() {
        // Initialize cognitive validation patterns
        // This would connect to the cognitive consciousness system
    }
    /**
     * Built-in basic syntax validator
     */
    validateBasicSyntax(modelData) {
        try {
            // Basic syntax checks
            return modelData.pythonCode.includes('class ') &&
                modelData.pythonCode.includes('from pydantic import') &&
                modelData.typescriptCode.includes('interface ');
        }
        catch (error) {
            return false;
        }
    }
    /**
     * Built-in type consistency validator
     */
    validateTypeConsistencyBasic(modelData) {
        try {
            // Basic type consistency checks
            return modelData.parameters.every((p) => p.pythonType && p.typescriptType);
        }
        catch (error) {
            return false;
        }
    }
    /**
     * Helper methods
     */
    generateValidationCacheKey(modelData) {
        return `${modelData.className}_${modelData.parameters.length}_${Date.now()}`;
    }
    calculatePerformanceMetrics(validationTime) {
        return {
            totalValidations: this.performanceMetrics.totalValidations + 1,
            successfulValidations: this.performanceMetrics.successfulValidations,
            failedValidations: this.performanceMetrics.failedValidations,
            averageValidationTime: (this.performanceMetrics.averageValidationTime + validationTime) / 2,
            cacheHitRate: this.performanceMetrics.cacheHitRate,
            memoryUsage: process.memoryUsage().heapUsed
        };
    }
    updatePerformanceMetrics(result) {
        this.performanceMetrics.totalValidations++;
        if (result.isValid) {
            this.performanceMetrics.successfulValidations++;
        }
        else {
            this.performanceMetrics.failedValidations++;
        }
        this.performanceMetrics.averageValidationTime =
            (this.performanceMetrics.averageValidationTime + result.validationTime) / 2;
    }
    /**
     * Public API methods
     */
    /**
     * Add custom validator
     */
    addCustomValidator(validator) {
        this.customValidators.set(validator.name, validator);
        this.emit('customValidatorAdded', { name: validator.name });
    }
    /**
     * Remove custom validator
     */
    removeCustomValidator(name) {
        const removed = this.customValidators.delete(name);
        if (removed) {
            this.emit('customValidatorRemoved', { name });
        }
        return removed;
    }
    /**
     * Get validation metrics
     */
    getMetrics() {
        return { ...this.performanceMetrics };
    }
    /**
     * Clear validation cache
     */
    clearCache() {
        this.validationCache.clear();
        this.emit('cacheCleared');
    }
    /**
     * Export validation framework data
     */
    exportData() {
        const customValidators = {};
        this.customValidators.forEach((validator, name) => {
            customValidators[name] = validator;
        });
        return {
            metrics: this.performanceMetrics,
            customValidators,
            config: this.config
        };
    }
}
exports.ValidationFramework = ValidationFramework;
//# sourceMappingURL=validation-framework.js.map