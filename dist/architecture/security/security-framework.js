"use strict";
/**
 * Security Framework for Phase 2 ML Implementation
 *
 * Comprehensive security architecture providing zero-trust security,
 * data protection, and compliance for distributed ML components.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataEncryptor = exports.KeyManager = exports.PolicyEngine = exports.SessionManager = exports.RiskAnalyzer = exports.MFAService = exports.PasswordHasher = exports.UserRepository = exports.ActionType = exports.DataSensitivity = exports.ResourceType = exports.AccountStatus = exports.EncryptionService = exports.RBACManager = exports.AuthenticationService = void 0;
const events_1 = require("events");
// ============================================================================
// Authentication Service
// ============================================================================
class AuthenticationService extends events_1.EventEmitter {
    constructor(config, logger) {
        super();
        this.config = config;
        this.logger = logger;
        this.initializeComponents();
    }
    initializeComponents() {
        this.userRepository = new SecureUserRepository();
        this.passwordHasher = new Argon2PasswordHasher();
        this.mfaService = new TimeBasedMFAService();
        this.riskAnalyzer = new MachineLearningRiskAnalyzer();
        this.sessionManager = new DistributedSessionManager();
    }
    /**
     * Authenticate user credentials
     */
    async authenticate(credentials) {
        const startTime = Date.now();
        try {
            // 1. Input validation and sanitization
            const sanitizedCredentials = this.sanitizeCredentials(credentials);
            // 2. Rate limiting check
            await this.checkRateLimit(sanitizedCredentials.username, credentials.ipAddress);
            // 3. Risk analysis
            const riskScore = await this.analyzeRisk(sanitizedCredentials);
            // 4. User lookup and verification
            const user = await this.userRepository.findByUsername(sanitizedCredentials.username);
            if (!user) {
                await this.recordFailedAttempt(sanitizedCredentials.username, 'user_not_found');
                return { success: false, errorMessage: 'Invalid credentials' };
            }
            // 5. Account status check
            if (user.accountStatus !== AccountStatus.ACTIVE) {
                return { success: false, errorMessage: 'Account is not active' };
            }
            // 6. Password verification
            const passwordValid = await this.verifyPassword(sanitizedCredentials.password, user.passwordHash);
            if (!passwordValid) {
                await this.recordFailedAttempt(user.id, 'invalid_password');
                return { success: false, errorMessage: 'Invalid credentials' };
            }
            // 7. MFA verification if required
            if (user.mfaEnabled || this.config.mfaRequired) {
                if (!sanitizedCredentials.mfaToken) {
                    return {
                        success: false,
                        mfaRequired: true,
                        errorMessage: 'MFA token required'
                    };
                }
                const mfaValid = await this.mfaService.verifyToken(user.id, sanitizedCredentials.mfaToken);
                if (!mfaValid) {
                    await this.recordFailedAttempt(user.id, 'invalid_mfa');
                    return { success: false, errorMessage: 'Invalid MFA token' };
                }
            }
            // 8. Generate tokens
            const tokens = await this.generateTokens(user);
            // 9. Update session
            await this.sessionManager.createSession(user.id, tokens, {
                ipAddress: credentials.ipAddress,
                deviceId: credentials.deviceId,
                riskScore
            });
            // 10. Update last login and clear failed attempts
            await this.updateUserLogin(user.id, credentials.ipAddress);
            const authenticationTime = Date.now() - startTime;
            this.logger.info(`User authenticated successfully: ${user.id} (${authenticationTime}ms)`);
            return {
                success: true,
                user: this.sanitizeUser(user),
                token: tokens,
                expiresAt: new Date(Date.now() + this.config.tokenExpiration * 1000),
                riskScore
            };
        }
        catch (error) {
            this.logger.error('Authentication failed:', error);
            return { success: false, errorMessage: 'Authentication service error' };
        }
    }
    /**
     * Refresh authentication tokens
     */
    async refreshToken(refreshToken) {
        try {
            // Validate refresh token
            const tokenPayload = await this.validateRefreshToken(refreshToken);
            if (!tokenPayload) {
                return { success: false, errorMessage: 'Invalid refresh token' };
            }
            // Get user
            const user = await this.userRepository.findById(tokenPayload.userId);
            if (!user || user.accountStatus !== AccountStatus.ACTIVE) {
                return { success: false, errorMessage: 'User not found or inactive' };
            }
            // Generate new tokens
            const tokens = await this.generateTokens(user);
            // Update session
            await this.sessionManager.refreshSession(tokenPayload.sessionId, tokens);
            return {
                success: true,
                user: this.sanitizeUser(user),
                token: tokens,
                expiresAt: new Date(Date.now() + this.config.tokenExpiration * 1000)
            };
        }
        catch (error) {
            this.logger.error('Token refresh failed:', error);
            return { success: false, errorMessage: 'Token refresh failed' };
        }
    }
    /**
     * Logout user and invalidate session
     */
    async logout(sessionId) {
        try {
            await this.sessionManager.invalidateSession(sessionId);
            this.logger.info(`User logged out: session ${sessionId}`);
        }
        catch (error) {
            this.logger.error('Logout failed:', error);
            throw error;
        }
    }
    // Private helper methods
    sanitizeCredentials(credentials) {
        return {
            username: credentials.username.trim().toLowerCase(),
            password: credentials.password,
            mfaToken: credentials.mfaToken?.trim(),
            deviceId: credentials.deviceId,
            ipAddress: credentials.ipAddress
        };
    }
    async checkRateLimit(username, ipAddress) {
        const rateLimiter = new AuthenticationRateLimiter();
        const isAllowed = await rateLimiter.isAllowed(username, ipAddress);
        if (!isAllowed) {
            throw new Error('Rate limit exceeded');
        }
    }
    async analyzeRisk(credentials) {
        return this.riskAnalyzer.analyze({
            username: credentials.username,
            ipAddress: credentials.ipAddress,
            deviceId: credentials.deviceId,
            timestamp: new Date()
        });
    }
    async verifyPassword(password, hash) {
        return this.passwordHasher.verify(password, hash);
    }
    async generateTokens(user) {
        const tokenService = new JWTTokenService();
        const accessToken = await tokenService.generateAccessToken({
            userId: user.id,
            username: user.username,
            roles: user.roles,
            permissions: user.permissions
        });
        const refreshToken = await tokenService.generateRefreshToken({
            userId: user.id,
            sessionId: this.generateSessionId()
        });
        return {
            accessToken,
            refreshToken,
            tokenType: 'Bearer',
            expiresIn: this.config.tokenExpiration,
            scope: this.buildScope(user.permissions)
        };
    }
    async validateRefreshToken(refreshToken) {
        const tokenService = new JWTTokenService();
        return tokenService.validateRefreshToken(refreshToken);
    }
    sanitizeUser(user) {
        const { passwordHash, ...sanitizedUser } = user;
        return sanitizedUser;
    }
    async recordFailedAttempt(identifier, reason) {
        const failedAttemptService = new FailedAttemptService();
        await failedAttemptService.record(identifier, reason);
    }
    async updateUserLogin(userId, ipAddress) {
        await this.userRepository.updateLastLogin(userId, ipAddress);
        await this.clearFailedAttempts(userId);
    }
    async clearFailedAttempts(userId) {
        const failedAttemptService = new FailedAttemptService();
        await failedAttemptService.clear(userId);
    }
    generateSessionId() {
        return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    buildScope(permissions) {
        return permissions.map(p => `${p.resource}:${p.action}`);
    }
}
exports.AuthenticationService = AuthenticationService;
// ============================================================================
// Authorization Service (RBAC)
// ============================================================================
class RBACManager {
    constructor(config) {
        this.roleRepository = new RoleRepository();
        this.permissionRepository = new PermissionRepository();
        this.policyEngine = this.createPolicyEngine(config.policyEngine);
        this.cache = new AuthorizationCache(config.cacheTTL);
        this.roleHierarchy = config.roleHierarchy;
    }
    /**
     * Check if user is authorized to perform action on resource
     */
    async isAuthorized(user, resource, action) {
        const cacheKey = this.buildCacheKey(user.id, resource.id, action.type);
        // Check cache first
        if (this.cache.isEnabled()) {
            const cachedResult = await this.cache.get(cacheKey);
            if (cachedResult !== null) {
                return cachedResult;
            }
        }
        // Check direct permissions
        const hasDirectPermission = await this.checkDirectPermissions(user, resource, action);
        if (hasDirectPermission) {
            await this.cache.set(cacheKey, true);
            return true;
        }
        // Check role-based permissions
        const hasRolePermission = await this.checkRolePermissions(user, resource, action);
        if (hasRolePermission) {
            await this.cache.set(cacheKey, true);
            return true;
        }
        // Check hierarchical permissions
        const hasHierarchicalPermission = await this.checkHierarchicalPermissions(user, resource, action);
        if (hasHierarchicalPermission) {
            await this.cache.set(cacheKey, true);
            return true;
        }
        // Check policy engine for complex rules
        const policyResult = await this.policyEngine.evaluate(user, resource, action);
        await this.cache.set(cacheKey, policyResult);
        return policyResult;
    }
    /**
     * Get user permissions for a resource
     */
    async getUserPermissions(userId, resourceId) {
        const user = await this.getUserById(userId);
        const resource = await this.getResourceById(resourceId);
        const permissions = [];
        // Get direct permissions
        const directPermissions = await this.getDirectPermissions(user, resource);
        permissions.push(...directPermissions);
        // Get role permissions
        const rolePermissions = await this.getRolePermissions(user, resource);
        permissions.push(...rolePermissions);
        // Get hierarchical permissions
        const hierarchicalPermissions = await this.getHierarchicalPermissions(user, resource);
        permissions.push(...hierarchicalPermissions);
        // Remove duplicates and return
        return this.deduplicatePermissions(permissions);
    }
    async checkDirectPermissions(user, resource, action) {
        const directPermissions = user.permissions.filter(p => p.resource === resource.id || this.matchesResourcePattern(p.resource, resource));
        return directPermissions.some(p => p.action === action.type &&
            this.evaluateConditions(p.conditions, action.context) &&
            p.effect === 'allow');
    }
    async checkRolePermissions(user, resource, action) {
        for (const roleName of user.roles) {
            const role = await this.roleRepository.findByName(roleName);
            if (!role)
                continue;
            const rolePermissions = role.permissions.filter(p => p.resource === resource.id || this.matchesResourcePattern(p.resource, resource));
            const hasPermission = rolePermissions.some(p => p.action === action.type &&
                this.evaluateConditions(p.conditions, action.context) &&
                p.effect === 'allow');
            if (hasPermission)
                return true;
            // Check parent roles in hierarchy
            const parentRoles = this.roleHierarchy.getParentRoles(roleName);
            for (const parentRole of parentRoles) {
                const parentRolePermissions = await this.getRolePermissionsByName(parentRole, resource);
                const hasParentPermission = parentRolePermissions.some(p => p.action === action.type &&
                    this.evaluateConditions(p.conditions, action.context) &&
                    p.effect === 'allow');
                if (hasParentPermission)
                    return true;
            }
        }
        return false;
    }
    async checkHierarchicalPermissions(user, resource, action) {
        // Check parent resources for inherited permissions
        const parentResources = await this.getParentResources(resource);
        for (const parentResource of parentResources) {
            const hasParentPermission = await this.isAuthorized(user, parentResource, action);
            if (hasParentPermission)
                return true;
        }
        return false;
    }
    createPolicyEngine(engineType) {
        switch (engineType) {
            case 'rbac':
                return new RBACPolicyEngine();
            case 'abac':
                return new ABACPolicyEngine();
            case 'pbac':
                return new PBACPolicyEngine();
            default:
                return new RBACPolicyEngine();
        }
    }
    buildCacheKey(userId, resourceId, action) {
        return `auth:${userId}:${resourceId}:${action}`;
    }
    matchesResourcePattern(pattern, resource) {
        // Implement resource pattern matching (wildcards, regex, etc.)
        if (pattern === '*')
            return true;
        if (pattern.endsWith('*')) {
            const prefix = pattern.slice(0, -1);
            return resource.id.startsWith(prefix);
        }
        return pattern === resource.id;
    }
    evaluateConditions(conditions, context) {
        if (!conditions || conditions.length === 0)
            return true;
        return conditions.every(condition => this.evaluateCondition(condition, context));
    }
    evaluateCondition(condition, context) {
        // Implement condition evaluation logic
        switch (condition.operator) {
            case 'equals':
                return context[condition.attribute] === condition.value;
            case 'contains':
                return String(context[condition.attribute]).includes(String(condition.value));
            case 'in':
                return Array.isArray(condition.value) && condition.value.includes(context[condition.attribute]);
            default:
                return false;
        }
    }
    async getUserById(userId) {
        // Implementation would fetch user from repository
        return {};
    }
    async getResourceById(resourceId) {
        // Implementation would fetch resource from repository
        return {};
    }
    async getDirectPermissions(user, resource) {
        // Implementation would get direct permissions
        return [];
    }
    async getRolePermissions(user, resource) {
        // Implementation would get role-based permissions
        return [];
    }
    async getHierarchicalPermissions(user, resource) {
        // Implementation would get hierarchical permissions
        return [];
    }
    async getParentResources(resource) {
        // Implementation would get parent resources
        return [];
    }
    async getRolePermissionsByName(roleName, resource) {
        // Implementation would get permissions for specific role
        return [];
    }
    deduplicatePermissions(permissions) {
        const unique = new Map();
        permissions.forEach(permission => {
            const key = `${permission.resource}:${permission.action}`;
            if (!unique.has(key)) {
                unique.set(key, permission);
            }
        });
        return Array.from(unique.values());
    }
}
exports.RBACManager = RBACManager;
// ============================================================================
// Encryption Service
// ============================================================================
class EncryptionService {
    constructor(config) {
        this.config = config;
        this.keyManager = this.createKeyManager(config.keyManagement);
        this.encryptor = this.createEncryptor(config.algorithm);
    }
    /**
     * Encrypt data with specified key or generate new key
     */
    async encrypt(data, keyId) {
        try {
            const encryptionKey = keyId
                ? await this.keyManager.getKey(keyId)
                : await this.keyManager.generateKey();
            const iv = await this.generateIV();
            const encryptedData = await this.encryptor.encrypt(JSON.stringify(data), encryptionKey, iv);
            return {
                data: encryptedData,
                iv: iv.toString('base64'),
                keyId: encryptionKey.id,
                algorithm: this.config.algorithm,
                timestamp: new Date(),
                checksum: this.calculateChecksum(encryptedData)
            };
        }
        catch (error) {
            throw new Error(`Encryption failed: ${error.message}`);
        }
    }
    /**
     * Decrypt data
     */
    async decrypt(encryptedData) {
        try {
            // Validate checksum
            if (!this.validateChecksum(encryptedData.data, encryptedData.checksum)) {
                throw new Error('Data integrity check failed');
            }
            // Get decryption key
            const decryptionKey = await this.keyManager.getKey(encryptedData.keyId);
            if (!decryptionKey) {
                throw new Error('Encryption key not found');
            }
            // Decrypt data
            const iv = Buffer.from(encryptedData.iv, 'base64');
            const decryptedData = await this.encryptor.decrypt(encryptedData.data, decryptionKey, iv);
            return JSON.parse(decryptedData);
        }
        catch (error) {
            throw new Error(`Decryption failed: ${error.message}`);
        }
    }
    /**
     * Rotate encryption keys
     */
    async rotateKeys() {
        const startTime = Date.now();
        try {
            // Generate new master key
            const newMasterKey = await this.keyManager.generateMasterKey();
            // Get all active data keys
            const activeKeys = await this.keyManager.getActiveKeys();
            // Re-encrypt data keys with new master key
            const reencryptedKeys = [];
            for (const key of activeKeys) {
                const reencryptedKey = await this.keyManager.reencryptKey(key, newMasterKey);
                reencryptedKeys.push(reencryptedKey);
            }
            // Activate new master key
            await this.keyManager.activateMasterKey(newMasterKey.id);
            // Schedule old keys for deletion
            await this.keyManager.scheduleKeysForDeletion(activeKeys.map(k => k.id));
            const rotationTime = Date.now() - startTime;
            return {
                success: true,
                masterKeyId: newMasterKey.id,
                rotatedKeys: reencryptedKeys.length,
                rotationTime
            };
        }
        catch (error) {
            throw new Error(`Key rotation failed: ${error.message}`);
        }
    }
    createKeyManager(type) {
        switch (type) {
            case 'local':
                return new LocalKeyManager();
            case 'hsm':
                return new HSMKeyManager();
            case 'cloud-kms':
                return new CloudKMSKeyManager();
            default:
                return new LocalKeyManager();
        }
    }
    createEncryptor(algorithm) {
        switch (algorithm) {
            case 'AES-256-GCM':
                return new AESGCMEncryptor();
            case 'ChaCha20-Poly1305':
                return new ChaCha20Poly1305Encryptor();
            default:
                return new AESGCMEncryptor();
        }
    }
    async generateIV() {
        return crypto.randomBytes(16); // 128 bits for AES-GCM
    }
    calculateChecksum(data) {
        return crypto.createHash('sha256').update(data).digest('hex');
    }
    validateChecksum(data, checksum) {
        const calculatedChecksum = this.calculateChecksum(data);
        return calculatedChecksum === checksum;
    }
}
exports.EncryptionService = EncryptionService;
// ============================================================================
// Supporting Types and Enums
// ============================================================================
var AccountStatus;
(function (AccountStatus) {
    AccountStatus["ACTIVE"] = "active";
    AccountStatus["INACTIVE"] = "inactive";
    AccountStatus["SUSPENDED"] = "suspended";
    AccountStatus["LOCKED"] = "locked";
})(AccountStatus || (exports.AccountStatus = AccountStatus = {}));
var ResourceType;
(function (ResourceType) {
    ResourceType["MODEL"] = "model";
    ResourceType["DATASET"] = "dataset";
    ResourceType["TRAINING_JOB"] = "training_job";
    ResourceType["INFERENCE_ENDPOINT"] = "inference_endpoint";
    ResourceType["USER_DATA"] = "user_data";
    ResourceType["SYSTEM_CONFIG"] = "system_config";
})(ResourceType || (exports.ResourceType = ResourceType = {}));
var DataSensitivity;
(function (DataSensitivity) {
    DataSensitivity["PUBLIC"] = "public";
    DataSensitivity["INTERNAL"] = "internal";
    DataSensitivity["CONFIDENTIAL"] = "confidential";
    DataSensitivity["RESTRICTED"] = "restricted";
})(DataSensitivity || (exports.DataSensitivity = DataSensitivity = {}));
var ActionType;
(function (ActionType) {
    ActionType["READ"] = "read";
    ActionType["WRITE"] = "write";
    ActionType["DELETE"] = "delete";
    ActionType["EXECUTE"] = "execute";
    ActionType["TRAIN"] = "train";
    ActionType["DEPLOY"] = "deploy";
    ActionType["MONITOR"] = "monitor";
})(ActionType || (exports.ActionType = ActionType = {}));
// Abstract interfaces for supporting classes
class UserRepository {
}
exports.UserRepository = UserRepository;
class PasswordHasher {
}
exports.PasswordHasher = PasswordHasher;
class MFAService {
}
exports.MFAService = MFAService;
class RiskAnalyzer {
}
exports.RiskAnalyzer = RiskAnalyzer;
class SessionManager {
}
exports.SessionManager = SessionManager;
class PolicyEngine {
}
exports.PolicyEngine = PolicyEngine;
class KeyManager {
}
exports.KeyManager = KeyManager;
class DataEncryptor {
}
exports.DataEncryptor = DataEncryptor;
//# sourceMappingURL=security-framework.js.map