"use strict";
/**
 * Collection Processor for Multi-Node Configuration Support
 *
 * Processes node collections with scope filters, wildcard patterns, and intelligent
 * node selection for Ericsson RAN batch operations.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionProcessor = void 0;
const ScopeFilterEngine_1 = require("./ScopeFilterEngine");
const WildcardProcessor_1 = require("./WildcardProcessor");
/**
 * Collection Processor
 */
class CollectionProcessor {
    constructor() {
        this.nodeCache = new Map();
        this.patternCache = new Map();
        this.scopeFilterEngine = new ScopeFilterEngine_1.ScopeFilterEngine();
        this.wildcardProcessor = new WildcardProcessor_1.WildcardProcessor();
    }
    /**
     * Process a node collection with scope filters
     */
    async processCollection(collection, scopeFilters, context) {
        const startTime = Date.now();
        const errors = [];
        try {
            console.log(`Processing collection ${collection.id} with ${collection.nodePatterns.length} patterns`);
            // Resolve nodes from patterns
            const resolvedNodes = await this.resolveNodesFromPatterns(collection.nodePatterns, errors);
            // Apply scope filters
            const filteredNodes = await this.applyScopeFilters(resolvedNodes, scopeFilters, errors);
            // Sort and prioritize nodes
            const prioritizedNodes = this.prioritizeNodes(filteredNodes, collection);
            // Validate final node set
            const validatedNodes = await this.validateNodes(prioritizedNodes, errors);
            const processingTime = Date.now() - startTime;
            const statistics = {
                totalNodes: resolvedNodes.length,
                includedNodes: validatedNodes.length,
                excludedNodes: resolvedNodes.length - validatedNodes.length,
                filteredNodes: resolvedNodes.length - filteredNodes.length,
                processingTime,
                patternsProcessed: collection.nodePatterns.length,
                filtersApplied: scopeFilters.length
            };
            const result = {
                collection,
                nodes: validatedNodes,
                statistics,
                errors
            };
            console.log(`Collection processing completed: ${validatedNodes.length} nodes from ${resolvedNodes.length} candidates`);
            return result;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.error(`Collection processing failed: ${errorMessage}`);
            errors.push({
                id: `collection_error_${Date.now()}`,
                type: 'validation_error',
                message: errorMessage,
                source: 'CollectionProcessor.processCollection',
                severity: 'critical',
                timestamp: new Date(),
                context: { collectionId: collection.id }
            });
            const processingTime = Date.now() - startTime;
            return {
                collection,
                nodes: [],
                statistics: {
                    totalNodes: 0,
                    includedNodes: 0,
                    excludedNodes: 0,
                    filteredNodes: 0,
                    processingTime,
                    patternsProcessed: collection.nodePatterns.length,
                    filtersApplied: scopeFilters.length
                },
                errors
            };
        }
    }
    /**
     * Resolve nodes from patterns
     */
    async resolveNodesFromPatterns(patterns, errors) {
        const allNodes = [];
        const processedPatterns = new Set();
        for (const pattern of patterns) {
            try {
                if (processedPatterns.has(pattern.pattern)) {
                    continue; // Skip duplicate patterns
                }
                processedPatterns.add(pattern.pattern);
                const patternNodes = await this.resolvePattern(pattern, errors);
                allNodes.push(...patternNodes);
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                console.error(`Pattern resolution failed for ${pattern.pattern}: ${errorMessage}`);
                errors.push({
                    id: `pattern_error_${Date.now()}_${pattern.id}`,
                    type: 'pattern_error',
                    message: errorMessage,
                    source: `Pattern:${pattern.id}`,
                    severity: 'medium',
                    timestamp: new Date(),
                    context: { pattern: pattern.pattern, type: pattern.type }
                });
            }
        }
        // Remove duplicates while preserving order
        const uniqueNodes = this.removeDuplicateNodes(allNodes);
        return uniqueNodes;
    }
    /**
     * Resolve a single pattern to nodes
     */
    async resolvePattern(pattern, errors) {
        switch (pattern.type) {
            case 'wildcard':
                return await this.wildcardProcessor.processWildcard(pattern, errors);
            case 'regex':
                return await this.processRegexPattern(pattern, errors);
            case 'list':
                return await this.processListPattern(pattern, errors);
            case 'query':
                return await this.processQueryPattern(pattern, errors);
            case 'cognitive':
                return await this.processCognitivePattern(pattern, errors);
            default:
                throw new Error(`Unsupported pattern type: ${pattern.type}`);
        }
    }
    /**
     * Process regex pattern
     */
    async processRegexPattern(pattern, errors) {
        try {
            const regex = new RegExp(pattern.pattern);
            const allNodes = await this.getAllNodes();
            const matchedNodes = allNodes.filter(node => regex.test(node.id) || regex.test(node.name));
            return this.applyPatternFilters(matchedNodes, pattern);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Invalid regex';
            throw new Error(`Regex pattern processing failed: ${errorMessage}`);
        }
    }
    /**
     * Process list pattern
     */
    async processListPattern(pattern, errors) {
        const nodeIds = pattern.pattern.split(',').map(id => id.trim());
        const nodes = [];
        for (const nodeId of nodeIds) {
            try {
                const node = await this.getNodeById(nodeId);
                if (node) {
                    nodes.push(node);
                }
            }
            catch (error) {
                console.warn(`Node ${nodeId} not found: ${error}`);
                // Continue with other nodes
            }
        }
        return this.applyPatternFilters(nodes, pattern);
    }
    /**
     * Process query pattern
     */
    async processQueryPattern(pattern, errors) {
        try {
            // Parse query pattern (e.g., "nodeType=ENB,location=Paris")
            const query = this.parseQueryPattern(pattern.pattern);
            const allNodes = await this.getAllNodes();
            const matchedNodes = allNodes.filter(node => this.matchesQuery(node, query));
            return this.applyPatternFilters(matchedNodes, pattern);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Invalid query';
            throw new Error(`Query pattern processing failed: ${errorMessage}`);
        }
    }
    /**
     * Process cognitive pattern (AI-enhanced node selection)
     */
    async processCognitivePattern(pattern, errors) {
        try {
            // Cognitive patterns use ML/AI for intelligent node selection
            const allNodes = await this.getAllNodes();
            // Apply cognitive algorithms for pattern matching
            const cognitiveMatches = await this.applyCognitiveMatching(allNodes, pattern.pattern);
            return this.applyPatternFilters(cognitiveMatches, pattern);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Cognitive processing failed';
            throw new Error(`Cognitive pattern processing failed: ${errorMessage}`);
        }
    }
    /**
     * Apply pattern filters (inclusions/exclusions)
     */
    applyPatternFilters(nodes, pattern) {
        let filteredNodes = [...nodes];
        // Apply exclusions
        if (pattern.exclusions && pattern.exclusions.length > 0) {
            filteredNodes = filteredNodes.filter(node => {
                return !pattern.exclusions.some(exclusion => this.matchesPattern(node, exclusion));
            });
        }
        // Apply inclusions
        if (pattern.inclusions && pattern.inclusions.length > 0) {
            filteredNodes = filteredNodes.filter(node => {
                return pattern.inclusions.some(inclusion => this.matchesPattern(node, inclusion));
            });
        }
        return filteredNodes;
    }
    /**
     * Check if node matches a pattern
     */
    matchesPattern(node, pattern) {
        // Simple wildcard matching
        if (pattern.includes('*')) {
            const regex = new RegExp(pattern.replace(/\*/g, '.*'));
            return regex.test(node.id) || regex.test(node.name);
        }
        // Exact match
        return node.id === pattern || node.name === pattern;
    }
    /**
     * Apply scope filters to nodes
     */
    async applyScopeFilters(nodes, scopeFilters, errors) {
        if (scopeFilters.length === 0) {
            return nodes;
        }
        let filteredNodes = [...nodes];
        // Sort filters by priority
        const sortedFilters = [...scopeFilters].sort((a, b) => b.priority - a.priority);
        for (const filter of sortedFilters) {
            try {
                const filterResult = await this.scopeFilterEngine.applyFilter(filteredNodes, filter);
                // Apply filter action
                switch (filter.action) {
                    case 'include':
                        filteredNodes = filterResult.matchedNodes;
                        break;
                    case 'exclude':
                        filteredNodes = filterResult.nonMatchedNodes;
                        break;
                    case 'prioritize':
                        // Move matching nodes to the front
                        const prioritized = [
                            ...filterResult.matchedNodes,
                            ...filterResult.nonMatchedNodes.filter(node => !filterResult.matchedNodes.some(matched => matched.id === node.id))
                        ];
                        filteredNodes = prioritized;
                        break;
                }
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                console.error(`Scope filter application failed: ${errorMessage}`);
                errors.push({
                    id: `filter_error_${Date.now()}_${filter.id}`,
                    type: 'filter_error',
                    message: errorMessage,
                    source: `Filter:${filter.id}`,
                    severity: 'medium',
                    timestamp: new Date(),
                    context: { filterType: filter.type, action: filter.action }
                });
            }
        }
        return filteredNodes;
    }
    /**
     * Prioritize nodes based on collection and node attributes
     */
    prioritizeNodes(nodes, collection) {
        // Sort nodes based on multiple criteria
        return nodes.sort((a, b) => {
            // Priority 1: Node status (prefer active nodes)
            const statusPriority = this.getStatusPriority(a.status) - this.getStatusPriority(b.status);
            if (statusPriority !== 0)
                return statusPriority;
            // Priority 2: Synchronization status (prefer synchronized nodes)
            const syncPriority = this.getSyncPriority(a.syncStatus) - this.getSyncPriority(b.syncStatus);
            if (syncPriority !== 0)
                return syncPriority;
            // Priority 3: Node type (prefer certain types)
            const typePriority = this.getNodeTypePriority(a.nodeType) - this.getNodeTypePriority(b.nodeType);
            if (typePriority !== 0)
                return typePriority;
            // Priority 4: Alphabetical order
            return a.id.localeCompare(b.id);
        });
    }
    /**
     * Validate nodes
     */
    async validateNodes(nodes, errors) {
        const validatedNodes = [];
        for (const node of nodes) {
            try {
                if (this.isValidNode(node)) {
                    validatedNodes.push(node);
                }
                else {
                    console.warn(`Node ${node.id} failed validation`);
                    errors.push({
                        id: `validation_error_${Date.now()}_${node.id}`,
                        type: 'validation_error',
                        message: `Node failed validation checks`,
                        source: `Node:${node.id}`,
                        severity: 'low',
                        timestamp: new Date(),
                        context: { nodeType: node.nodeType, status: node.status }
                    });
                }
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Validation error';
                console.error(`Node validation failed for ${node.id}: ${errorMessage}`);
                errors.push({
                    id: `validation_error_${Date.now()}_${node.id}`,
                    type: 'validation_error',
                    message: errorMessage,
                    source: `Node:${node.id}`,
                    severity: 'medium',
                    timestamp: new Date()
                });
            }
        }
        return validatedNodes;
    }
    /**
     * Check if node is valid
     */
    isValidNode(node) {
        // Basic validation checks
        if (!node.id || !node.name || !node.nodeType) {
            return false;
        }
        // Check if node is accessible
        if (node.status === 'unreachable' || node.status === 'maintenance') {
            return false;
        }
        // Check synchronization status
        if (node.syncStatus === 'out_of_sync' || node.syncStatus === 'unknown') {
            return false;
        }
        return true;
    }
    /**
     * Remove duplicate nodes
     */
    removeDuplicateNodes(nodes) {
        const seen = new Set();
        const uniqueNodes = [];
        for (const node of nodes) {
            if (!seen.has(node.id)) {
                seen.add(node.id);
                uniqueNodes.push(node);
            }
        }
        return uniqueNodes;
    }
    /**
     * Get all nodes (mock implementation)
     */
    async getAllNodes() {
        // In production, this would query the actual network management system
        // For now, return mock data
        const cacheKey = 'all_nodes';
        if (this.nodeCache.has(cacheKey)) {
            return this.nodeCache.get(cacheKey);
        }
        const mockNodes = [
            {
                id: 'ERBS001',
                name: 'Paris-Central-ENB',
                nodeType: 'ENB',
                neType: 'ENB',
                status: 'active',
                syncStatus: 'synchronized',
                location: 'Paris',
                version: '21B',
                vendor: 'Ericsson',
                attributes: {
                    ip: '192.168.1.1',
                    model: 'AIR 6488',
                    capacity: 'high'
                },
                metadata: {
                    source: 'NMS',
                    patternMatch: 'ERBS*',
                    filterResults: {},
                    processingTime: 0
                }
            },
            {
                id: 'ERBS002',
                name: 'Paris-North-ENB',
                nodeType: 'ENB',
                neType: 'ENB',
                status: 'active',
                syncStatus: 'synchronized',
                location: 'Paris',
                version: '21B',
                vendor: 'Ericsson',
                attributes: {
                    ip: '192.168.1.2',
                    model: 'AIR 6488',
                    capacity: 'medium'
                },
                metadata: {
                    source: 'NMS',
                    patternMatch: 'ERBS*',
                    filterResults: {},
                    processingTime: 0
                }
            },
            {
                id: 'GNB001',
                name: 'Paris-Central-GNB',
                nodeType: 'GNB',
                neType: 'GNB',
                status: 'active',
                syncStatus: 'synchronized',
                location: 'Paris',
                version: '22A',
                vendor: 'Ericsson',
                attributes: {
                    ip: '192.168.2.1',
                    model: 'AIR 6653',
                    capacity: 'high'
                },
                metadata: {
                    source: 'NMS',
                    patternMatch: 'GNB*',
                    filterResults: {},
                    processingTime: 0
                }
            },
            {
                id: 'ERBS003',
                name: 'Lyon-Central-ENB',
                nodeType: 'ENB',
                neType: 'ENB',
                status: 'active',
                syncStatus: 'out_of_sync',
                location: 'Lyon',
                version: '20B',
                vendor: 'Ericsson',
                attributes: {
                    ip: '192.168.1.3',
                    model: 'AIR 6488',
                    capacity: 'medium'
                },
                metadata: {
                    source: 'NMS',
                    patternMatch: 'ERBS*',
                    filterResults: {},
                    processingTime: 0
                }
            }
        ];
        this.nodeCache.set(cacheKey, mockNodes);
        return mockNodes;
    }
    /**
     * Get node by ID
     */
    async getNodeById(nodeId) {
        const allNodes = await this.getAllNodes();
        return allNodes.find(node => node.id === nodeId) || null;
    }
    /**
     * Parse query pattern
     */
    parseQueryPattern(query) {
        const conditions = {};
        // Split by commas and parse each condition
        const parts = query.split(',');
        for (const part of parts) {
            const [key, value] = part.split('=').map(s => s.trim());
            if (key && value) {
                conditions[key] = value;
            }
        }
        return conditions;
    }
    /**
     * Check if node matches query
     */
    matchesQuery(node, query) {
        for (const [key, value] of Object.entries(query)) {
            const nodeValue = this.getNodeAttributeValue(node, key);
            if (nodeValue === undefined || nodeValue !== value) {
                return false;
            }
        }
        return true;
    }
    /**
     * Get node attribute value
     */
    getNodeAttributeValue(node, attribute) {
        switch (attribute) {
            case 'nodeType':
                return node.nodeType;
            case 'neType':
                return node.neType;
            case 'status':
                return node.status;
            case 'syncStatus':
                return node.syncStatus;
            case 'location':
                return node.location;
            case 'version':
                return node.version;
            case 'vendor':
                return node.vendor;
            default:
                return node.attributes[attribute];
        }
    }
    /**
     * Apply cognitive matching (mock implementation)
     */
    async applyCognitiveMatching(nodes, cognitivePattern) {
        // In production, this would use actual AI/ML algorithms
        // For now, implement simple heuristic matching
        const pattern = cognitivePattern.toLowerCase();
        return nodes.filter(node => {
            // Simple cognitive matching based on patterns
            const nodeData = `${node.id} ${node.name} ${node.nodeType} ${node.location} ${JSON.stringify(node.attributes)}`.toLowerCase();
            // Check for semantic matches
            if (pattern.includes('high') && node.attributes.capacity === 'high') {
                return true;
            }
            if (pattern.includes('paris') && node.location === 'Paris') {
                return true;
            }
            if (pattern.includes('5g') && node.nodeType === 'GNB') {
                return true;
            }
            if (pattern.includes('4g') && node.nodeType === 'ENB') {
                return true;
            }
            // Check for fuzzy matches
            const similarity = this.calculateStringSimilarity(pattern, nodeData);
            return similarity > 0.3; // 30% similarity threshold
        });
    }
    /**
     * Calculate string similarity (simple implementation)
     */
    calculateStringSimilarity(str1, str2) {
        const longer = str1.length > str2.length ? str1 : str2;
        const shorter = str1.length > str2.length ? str2 : str1;
        if (longer.length === 0)
            return 1.0;
        const editDistance = this.calculateEditDistance(longer, shorter);
        return (longer.length - editDistance) / longer.length;
    }
    /**
     * Calculate edit distance
     */
    calculateEditDistance(str1, str2) {
        const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
        for (let i = 0; i <= str1.length; i++)
            matrix[0][i] = i;
        for (let j = 0; j <= str2.length; j++)
            matrix[j][0] = j;
        for (let j = 1; j <= str2.length; j++) {
            for (let i = 1; i <= str1.length; i++) {
                const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
                matrix[j][i] = Math.min(matrix[j][i - 1] + 1, matrix[j - 1][i] + 1, matrix[j - 1][i - 1] + indicator);
            }
        }
        return matrix[str2.length][str1.length];
    }
    /**
     * Get status priority
     */
    getStatusPriority(status) {
        const priorities = {
            'active': 4,
            'standby': 3,
            'maintenance': 2,
            'unreachable': 1,
            'unknown': 0
        };
        return priorities[status] || 0;
    }
    /**
     * Get sync priority
     */
    getSyncPriority(syncStatus) {
        const priorities = {
            'synchronized': 3,
            'synchronizing': 2,
            'out_of_sync': 1,
            'unknown': 0
        };
        return priorities[syncStatus] || 0;
    }
    /**
     * Get node type priority
     */
    getNodeTypePriority(nodeType) {
        const priorities = {
            'GNB': 4,
            'ENB': 3,
            'RNC': 2,
            'BSC': 1,
            'default': 0
        };
        return priorities[nodeType] || priorities['default'];
    }
    /**
     * Clear cache
     */
    clearCache() {
        this.nodeCache.clear();
        this.patternCache.clear();
    }
    /**
     * Get cache statistics
     */
    getCacheStatistics() {
        return {
            nodeCacheSize: this.nodeCache.size,
            patternCacheSize: this.patternCache.size,
            cacheKeys: Array.from(this.nodeCache.keys())
        };
    }
}
exports.CollectionProcessor = CollectionProcessor;
//# sourceMappingURL=CollectionProcessor.js.map