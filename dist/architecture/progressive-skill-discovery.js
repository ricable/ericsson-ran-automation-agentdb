"use strict";
/**
 * Progressive Disclosure Skill Discovery Service
 *
 * Implements 3-level skill loading architecture for 6KB context with 100+ skills
 * Provides cognitive consciousness integration for Phase 1 RAN optimization
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressiveSkillDiscoveryService = void 0;
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
/**
 * Progressive Skill Discovery Service
 */
class ProgressiveSkillDiscoveryService {
    constructor(config, agentDB) {
        // Multi-level caching
        this.metadataCache = new Map();
        this.contentCache = new Map();
        this.resourceCache = new Map();
        this.learningPatterns = new Map();
        this.config = config;
        this.agentDB = agentDB;
        this.cognitiveState = {
            consciousnessLevel: 'maximum',
            learningEnabled: config.cognitive.learningEnabled,
            patternRecognition: config.cognitive.patternRecognition,
            initializedAt: Date.now()
        };
    }
    /**
     * Initialize progressive skill discovery
     */
    async initialize() {
        console.log('Initializing Progressive Skill Discovery Service...');
        try {
            // Level 1: Load metadata for all skills (6KB context for 100+ skills)
            await this.loadAllSkillMetadata();
            // Initialize cognitive consciousness
            await this.initializeCognitiveConsciousness();
            // Start background learning
            if (this.config.cognitive.learningEnabled) {
                this.startBackgroundLearning();
            }
            console.log(`Loaded ${this.metadataCache.size} skill metadata entries`);
            console.log('Progressive Skill Discovery Service initialized successfully');
        }
        catch (error) {
            console.error('Failed to initialize skill discovery:', error);
            throw error;
        }
    }
    /**
     * Level 1: Load metadata for all skills (always active)
     * Achieves 6KB context for 100+ skills through minimal metadata
     */
    async loadAllSkillMetadata() {
        if (!this.config.levels.metadata.enabled) {
            return [];
        }
        const skillsDir = '.claude/skills';
        const startTime = Date.now();
        try {
            // Scan skills directory
            const skillDirs = await this.scanSkillDirectories(skillsDir);
            // Load metadata in parallel for performance
            const metadataPromises = skillDirs.map(async (skillDir) => this.loadSkillMetadata(skillDir));
            const allMetadata = await Promise.all(metadataPromises);
            // Cache metadata locally
            allMetadata.forEach(metadata => {
                this.metadataCache.set(metadata.name, metadata);
            });
            // Store in AgentDB for persistence and search
            await this.storeMetadataInAgentDB(allMetadata);
            const loadTime = Date.now() - startTime;
            console.log(`Loaded ${allMetadata.length} skill metadata in ${loadTime}ms`);
            // Verify 6KB target
            const totalContextSize = allMetadata.reduce((sum, meta) => sum + meta.contextSize, 0);
            console.log(`Total metadata context: ${totalContextSize} bytes (${(totalContextSize / 1024).toFixed(2)}KB)`);
            return allMetadata;
        }
        catch (error) {
            console.error('Failed to load skill metadata:', error);
            throw error;
        }
    }
    /**
     * Level 2: Load full skill content when triggered
     */
    async loadSkillContent(skillName) {
        if (!this.config.levels.content.enabled) {
            throw new Error('Content loading is disabled');
        }
        // Check cache first
        if (this.contentCache.has(skillName)) {
            const cachedContent = this.contentCache.get(skillName);
            await this.updateAccessPattern(skillName, 'content');
            return cachedContent;
        }
        const metadata = this.metadataCache.get(skillName);
        if (!metadata) {
            throw new Error(`Skill not found: ${skillName}`);
        }
        try {
            // Load full content from file
            const content = await this.readSkillFile(metadata.filePath);
            // Extract content after YAML frontmatter
            const skillContent = this.extractSkillContent(content);
            const skillContentObj = {
                name: skillName,
                content: skillContent,
                metadata,
                loadedAt: Date.now(),
                size: skillContent.length,
                compressed: this.config.performance.compressionEnabled
            };
            // Generate embedding for cognitive processing
            if (this.config.cognitive.patternRecognition) {
                skillContentObj.embedding = await this.generateContentEmbedding(skillContent);
            }
            // Cache content
            this.contentCache.set(skillName, skillContentObj);
            // Store in AgentDB for persistence
            await this.storeContentInAgentDB(skillContentObj);
            // Update metadata
            metadata.loadingLevel = 'content';
            metadata.lastAccessed = Date.now();
            metadata.accessCount++;
            // Store loading pattern for learning
            await this.storeLoadingPattern(skillName, 'content');
            console.log(`Loaded content for skill: ${skillName}`);
            return skillContentObj;
        }
        catch (error) {
            console.error(`Failed to load content for skill ${skillName}:`, error);
            throw error;
        }
    }
    /**
     * Level 3: Load referenced resources on demand
     */
    async loadSkillResource(skillName, resourcePath) {
        if (!this.config.levels.resources.enabled) {
            throw new Error('Resource loading is disabled');
        }
        const resourceKey = `${skillName}:${resourcePath}`;
        // Check cache first
        if (this.resourceCache.has(resourceKey)) {
            const cachedResource = this.resourceCache.get(resourceKey);
            await this.updateAccessPattern(skillName, 'resource');
            return cachedResource;
        }
        const metadata = this.metadataCache.get(skillName);
        if (!metadata) {
            throw new Error(`Skill not found: ${skillName}`);
        }
        try {
            // Load resource from file
            const fullResourcePath = path.join(path.dirname(metadata.filePath), resourcePath);
            const content = await this.readSkillFile(fullResourcePath);
            const resource = {
                skillName,
                resourcePath,
                content,
                type: this.inferResourceType(resourcePath),
                loadedAt: Date.now()
            };
            // Cache resource
            this.resourceCache.set(resourceKey, resource);
            // Store in AgentDB
            await this.storeResourceInAgentDB(resource);
            // Store loading pattern
            await this.storeLoadingPattern(skillName, 'resource');
            return resource;
        }
        catch (error) {
            console.error(`Failed to load resource ${resourcePath} for skill ${skillName}:`, error);
            throw error;
        }
    }
    /**
     * Find relevant skills based on context with cognitive consciousness
     */
    async findRelevantSkills(context) {
        const startTime = Date.now();
        try {
            // Generate context embedding
            const contextEmbedding = await this.generateContextEmbedding(context);
            // Apply cognitive consciousness filtering
            const filteredSkills = this.applyCognitiveConsciousnessFiltering(contextEmbedding);
            // Search AgentDB for relevant skill patterns
            const searchResults = await this.agentDB.retrieveWithReasoning(contextEmbedding, {
                domain: 'skill-discovery',
                k: 20,
                useMMR: true,
                synthesizeContext: this.config.cognitive.patternRecognition,
                filters: {
                    confidence: { $gte: this.config.cognitive.relevanceThreshold },
                    recentness: { $gte: Date.now() - 30 * 24 * 3600000 },
                    active: true
                }
            });
            // Process search results with cognitive enhancement
            const relevantSkills = [];
            for (const pattern of searchResults.patterns) {
                const skillMetadata = pattern.pattern_data;
                // Apply cognitive weighting
                const cognitiveScore = this.calculateCognitiveScore(skillMetadata, context, pattern.similarity);
                // Determine loading strategy
                const loadingStrategy = this.determineLoadingStrategy(skillMetadata, cognitiveScore);
                const relevantSkill = {
                    skill: skillMetadata,
                    relevanceScore: pattern.similarity,
                    cognitiveScore,
                    loadingStrategy,
                    recommendedLevel: this.determineRecommendedLevel(skillMetadata, cognitiveScore),
                    estimatedLoadTime: this.estimateLoadTime(skillMetadata, loadingStrategy)
                };
                relevantSkills.push(relevantSkill);
            }
            // Sort by cognitive score and relevance
            relevantSkills.sort((a, b) => (b.cognitiveScore * 0.7 + b.relevanceScore * 0.3) -
                (a.cognitiveScore * 0.7 + a.relevanceScore * 0.3));
            // Store search pattern for learning
            await this.storeSearchPattern(context, relevantSkills);
            const searchTime = Date.now() - startTime;
            console.log(`Found ${relevantSkills.length} relevant skills in ${searchTime}ms`);
            return relevantSkills.slice(0, 16); // Limit to 16 for optimal performance
        }
        catch (error) {
            console.error('Failed to find relevant skills:', error);
            return [];
        }
    }
    /**
     * Progressive content loading based on cognitive scoring
     */
    async progressivelyLoadSkills(relevantSkills, context) {
        const loadedSkills = {
            metadata: [],
            content: [],
            resources: [],
            totalLoadTime: 0,
            cognitiveInsights: {
                consciousnessLevel: this.cognitiveState.consciousnessLevel,
                loadingStrategy: 'progressive',
                optimizationApplied: true
            }
        };
        const startTime = Date.now();
        try {
            // Load in priority order based on cognitive scoring
            const sortedSkills = relevantSkills.sort((a, b) => b.cognitiveScore - a.cognitiveScore);
            for (const skillResult of sortedSkills) {
                const skill = skillResult.skill;
                // Always include metadata (Level 1)
                loadedSkills.metadata.push(skill);
                // Load content based on cognitive score and strategy
                if (skillResult.cognitiveScore > 0.7 && skillResult.recommendedLevel !== 'metadata') {
                    try {
                        const content = await this.loadSkillContent(skill.name);
                        loadedSkills.content.push(content);
                    }
                    catch (error) {
                        console.warn(`Failed to load content for skill ${skill.name}:`, error);
                    }
                }
                // Load resources for critical skills
                if (skill.priority === 'critical' && skillResult.cognitiveScore > 0.8) {
                    try {
                        const resources = await this.loadSkillResources(skill);
                        loadedSkills.resources.push(...resources);
                    }
                    catch (error) {
                        console.warn(`Failed to load resources for skill ${skill.name}:`, error);
                    }
                }
            }
            loadedSkills.totalLoadTime = Date.now() - startTime;
            // Store loading pattern for cognitive learning
            await this.storeProgressiveLoadingPattern(loadedSkills, context);
            console.log(`Progressively loaded ${loadedSkills.metadata.length} skills (${loadedSkills.content.length} with content, ${loadedSkills.resources.length} resources) in ${loadedSkills.totalLoadTime}ms`);
            return loadedSkills;
        }
        catch (error) {
            console.error('Progressive skill loading failed:', error);
            throw error;
        }
    }
    /**
     * Initialize cognitive consciousness for skill discovery
     */
    async initializeCognitiveConsciousness() {
        const consciousnessPattern = {
            type: 'cognitive-consciousness',
            domain: 'skill-discovery',
            pattern_data: {
                consciousnessLevel: this.cognitiveState.consciousnessLevel,
                learningEnabled: this.cognitiveState.learningEnabled,
                patternRecognition: this.cognitiveState.patternRecognition,
                initializedAt: this.cognitiveState.initializedAt,
                skillCount: this.metadataCache.size,
                totalContextSize: Array.from(this.metadataCache.values()).reduce((sum, meta) => sum + meta.contextSize, 0)
            },
            confidence: 1.0
        };
        await this.agentDB.insertPattern(consciousnessPattern);
    }
    // Private helper methods
    async scanSkillDirectories(skillsDir) {
        try {
            const entries = await fs.readdir(skillsDir, { withFileTypes: true });
            return entries
                .filter(entry => entry.isDirectory())
                .map(entry => entry.name);
        }
        catch (error) {
            console.warn(`Could not scan skills directory ${skillsDir}:`, error);
            return [];
        }
    }
    async loadSkillMetadata(skillDir) {
        const skillMdPath = path.join('.claude/skills', skillDir, 'SKILL.md');
        try {
            const content = await fs.readFile(skillMdPath, 'utf-8');
            // Extract YAML frontmatter
            const yamlMatch = content.match(/^---\n([\s\S]*?)\n---/);
            if (!yamlMatch) {
                throw new Error(`Invalid SKILL.md format: ${skillDir}`);
            }
            const frontmatter = this.parseYAMLFrontmatter(yamlMatch[1]);
            const metadata = {
                name: frontmatter.name,
                description: frontmatter.description,
                directory: skillDir,
                category: this.inferCategory(skillDir, frontmatter.description),
                priority: frontmatter.priority || 'medium',
                contextSize: frontmatter.name.length + frontmatter.description.length,
                tags: frontmatter.tags || [],
                cognitiveWeight: this.calculateBaseCognitiveWeight(frontmatter),
                loadingLevel: 'metadata',
                accessCount: 0,
                filePath: skillMdPath,
                frontmatter
            };
            return metadata;
        }
        catch (error) {
            console.error(`Failed to load metadata for skill ${skillDir}:`, error);
            throw error;
        }
    }
    parseYAMLFrontmatter(yaml) {
        // Simple YAML parser - in production would use a proper YAML library
        const lines = yaml.split('\n');
        const result = {};
        for (const line of lines) {
            const match = line.match(/^(\w+):\s*(.*)$/);
            if (match) {
                const [, key, value] = match;
                result[key] = value.replace(/^["']|["']$/g, ''); // Remove quotes
            }
        }
        return result;
    }
    inferCategory(skillDir, description) {
        const dir = skillDir.toLowerCase();
        const desc = description.toLowerCase();
        if (dir.includes('agentdb') || desc.includes('agentdb'))
            return 'agentdb-integration';
        if (dir.includes('flow-nexus') || desc.includes('flow-nexus'))
            return 'flow-nexus-integration';
        if (dir.includes('github') || desc.includes('github'))
            return 'github-integration';
        if (dir.includes('swarm') || desc.includes('swarm'))
            return 'swarm-intelligence';
        if (dir.includes('performance') || desc.includes('performance'))
            return 'performance-analysis';
        if (dir.includes('sparc') || desc.includes('sparc'))
            return 'methodology-reasoning';
        if (dir.includes('ericsson') || desc.includes('ericsson') || desc.includes('ran'))
            return 'cognitive-ran';
        return 'specialized-skills';
    }
    calculateBaseCognitiveWeight(frontmatter) {
        let weight = 0.5; // Base weight
        // Boost based on priority
        const priority = frontmatter.priority || 'medium';
        if (priority === 'critical')
            weight += 0.3;
        if (priority === 'high')
            weight += 0.2;
        // Boost based on tags
        const tags = frontmatter.tags || [];
        if (tags.includes('cognitive'))
            weight += 0.2;
        if (tags.includes('optimization'))
            weight += 0.1;
        if (tags.includes('performance'))
            weight += 0.1;
        return Math.min(weight, 1.0);
    }
    async readSkillFile(filePath) {
        return await fs.readFile(filePath, 'utf-8');
    }
    extractSkillContent(fullContent) {
        const contentStart = fullContent.indexOf('---', 3) + 3;
        return fullContent.substring(contentStart).trim();
    }
    inferResourceType(resourcePath) {
        const ext = path.extname(resourcePath).toLowerCase();
        const name = path.basename(resourcePath).toLowerCase();
        if (['.js', '.ts', '.py', '.rs'].includes(ext))
            return 'code';
        if (['.md', '.txt'].includes(ext))
            return 'documentation';
        if (['.json', '.yaml', '.yml', '.toml'].includes(ext))
            return 'configuration';
        if (name.includes('template') || name.includes('example'))
            return 'template';
        return 'code';
    }
    async generateContextEmbedding(context) {
        // Generate embedding for context matching
        return []; // Placeholder - would use actual embedding model
    }
    async generateContentEmbedding(content) {
        return []; // Placeholder
    }
    applyCognitiveConsciousnessFiltering(embedding) {
        // Apply cognitive consciousness filtering based on consciousness level
        const allSkills = Array.from(this.metadataCache.values());
        if (this.cognitiveState.consciousnessLevel === 'maximum') {
            // Return all skills with maximum cognitive processing
            return allSkills;
        }
        else if (this.cognitiveState.consciousnessLevel === 'enhanced') {
            // Filter for enhanced cognitive processing
            return allSkills.filter(skill => skill.cognitiveWeight > 0.5);
        }
        else {
            // Basic level - only high priority skills
            return allSkills.filter(skill => skill.priority === 'critical' || skill.priority === 'high');
        }
    }
    calculateCognitiveScore(skill, context, similarity) {
        let cognitiveScore = similarity * 0.5; // Base on similarity
        // Apply cognitive weight
        cognitiveScore += skill.cognitiveWeight * 0.3;
        // Apply recency boost
        if (skill.lastAccessed) {
            const daysSinceAccess = (Date.now() - skill.lastAccessed) / (1000 * 60 * 60 * 24);
            const recencyBoost = Math.max(0, 1 - daysSinceAccess / 30); // Decay over 30 days
            cognitiveScore += recencyBoost * 0.1;
        }
        // Apply access frequency boost
        const frequencyBoost = Math.min(skill.accessCount / 10, 1) * 0.1;
        cognitiveScore += frequencyBoost;
        return Math.min(cognitiveScore, 1.0);
    }
    determineLoadingStrategy(skill, cognitiveScore) {
        if (cognitiveScore > 0.8)
            return 'eager';
        if (cognitiveScore > 0.5)
            return 'lazy';
        return 'metadata-only';
    }
    determineRecommendedLevel(skill, cognitiveScore) {
        if (cognitiveScore > 0.8 && skill.priority === 'critical')
            return 'resources';
        if (cognitiveScore > 0.6)
            return 'content';
        return 'metadata';
    }
    estimateLoadTime(skill, strategy) {
        const baseTime = 100; // 100ms base
        switch (strategy) {
            case 'eager': return baseTime;
            case 'lazy': return baseTime * 2;
            case 'metadata-only': return baseTime / 10;
            default: return baseTime;
        }
    }
    async loadSkillResources(skill) {
        // Load all resources for a skill
        const resources = [];
        try {
            const skillDir = path.dirname(skill.filePath);
            const entries = await fs.readdir(skillDir, { withFileTypes: true });
            for (const entry of entries) {
                if (entry.isFile() && entry.name !== 'SKILL.md') {
                    const resource = await this.loadSkillResource(skill.name, entry.name);
                    resources.push(resource);
                }
            }
        }
        catch (error) {
            console.warn(`Failed to load resources for skill ${skill.name}:`, error);
        }
        return resources;
    }
    async updateAccessPattern(skillName, level) {
        const metadata = this.metadataCache.get(skillName);
        if (metadata) {
            metadata.lastAccessed = Date.now();
            metadata.accessCount++;
        }
    }
    // AgentDB storage methods
    async storeMetadataInAgentDB(metadata) {
        for (const meta of metadata) {
            await this.agentDB.insertPattern({
                type: 'skill-metadata',
                domain: 'skill-discovery',
                pattern_data: meta,
                embedding: await this.generateMetadataEmbedding(meta),
                confidence: 1.0
            });
        }
    }
    async storeContentInAgentDB(content) {
        await this.agentDB.insertPattern({
            type: 'skill-content',
            domain: 'skill-discovery',
            pattern_data: content,
            embedding: content.embedding,
            confidence: 1.0
        });
    }
    async storeResourceInAgentDB(resource) {
        await this.agentDB.insertPattern({
            type: 'skill-resource',
            domain: 'skill-discovery',
            pattern_data: resource,
            confidence: 1.0
        });
    }
    async storeLoadingPattern(skillName, level) {
        await this.agentDB.insertPattern({
            type: 'loading-pattern',
            domain: 'skill-discovery',
            pattern_data: {
                skillName,
                level,
                timestamp: Date.now()
            },
            confidence: 1.0
        });
    }
    async storeSearchPattern(context, results) {
        await this.agentDB.insertPattern({
            type: 'search-pattern',
            domain: 'skill-discovery',
            pattern_data: {
                context,
                results: results.map(r => ({
                    skillName: r.skill.name,
                    cognitiveScore: r.cognitiveScore,
                    relevanceScore: r.relevanceScore
                })),
                timestamp: Date.now()
            },
            confidence: 1.0
        });
    }
    async storeProgressiveLoadingPattern(loadedSkills, context) {
        await this.agentDB.insertPattern({
            type: 'progressive-loading-pattern',
            domain: 'skill-discovery',
            pattern_data: {
                loadedSkills: {
                    metadataCount: loadedSkills.metadata.length,
                    contentCount: loadedSkills.content.length,
                    resourceCount: loadedSkills.resources.length,
                    totalLoadTime: loadedSkills.totalLoadTime
                },
                context,
                cognitiveInsights: loadedSkills.cognitiveInsights,
                timestamp: Date.now()
            },
            confidence: 1.0
        });
    }
    async generateMetadataEmbedding(metadata) {
        return []; // Placeholder
    }
    startBackgroundLearning() {
        // Start background learning process
        setInterval(async () => {
            await this.performBackgroundLearning();
        }, 60000); // Every minute
    }
    async performBackgroundLearning() {
        // Analyze access patterns and optimize caching
        console.log('Performing background learning...');
        // This would implement learning algorithms to optimize
        // skill loading patterns based on usage
    }
    /**
     * Get service statistics
     */
    getStatistics() {
        return {
            totalSkills: this.metadataCache.size,
            loadedContent: this.contentCache.size,
            loadedResources: this.resourceCache.size,
            totalContextSize: Array.from(this.metadataCache.values()).reduce((sum, meta) => sum + meta.contextSize, 0),
            cognitiveLevel: this.cognitiveState.consciousnessLevel,
            learningEnabled: this.cognitiveState.learningEnabled
        };
    }
    /**
     * Clear caches
     */
    clearCaches() {
        this.metadataCache.clear();
        this.contentCache.clear();
        this.resourceCache.clear();
        console.log('Skill discovery caches cleared');
    }
}
exports.ProgressiveSkillDiscoveryService = ProgressiveSkillDiscoveryService;
//# sourceMappingURL=progressive-skill-discovery.js.map