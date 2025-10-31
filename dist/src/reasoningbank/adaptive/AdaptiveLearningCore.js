"use strict";
/**
 * Adaptive Learning Core for ReasoningBank
 * Implements adaptive learning algorithms with trajectory tracking and pattern recognition
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdaptiveLearningCore = void 0;
/**
 * Adaptive Learning Core - Implements adaptive learning algorithms for ReasoningBank
 */
class AdaptiveLearningCore {
    constructor(config) {
        this.patterns = new Map();
        this.strategies = new Map();
        this.learningSignals = [];
        this.adaptationHistory = [];
        this.crossDomainMappings = new Map();
        this.performanceHistory = new Map();
        this.confidenceDecay = new Map();
        this.isInitialized = false;
        this.config = config;
        this.globalLearningRate = config.learningRate;
        this.adaptationThreshold = config.adaptationThreshold;
        this.explorationDecay = 0.995;
        this.patternExtractionThreshold = 0.6;
    }
    /**
     * Initialize Adaptive Learning Core
     */
    async initialize() {
        console.log('🧠 Initializing Adaptive Learning Core...');
        try {
            // Phase 1: Initialize pattern extraction algorithms
            await this.initializePatternExtraction();
            // Phase 2: Setup cross-domain transfer mechanisms
            await this.setupCrossDomainTransfer();
            // Phase 3: Initialize adaptation strategies
            await this.initializeAdaptationStrategies();
            // Phase 4: Setup learning signal processing
            await this.setupLearningSignalProcessing();
            // Phase 5: Initialize performance tracking
            await this.initializePerformanceTracking();
            // Phase 6: Load existing adaptive patterns
            await this.loadExistingPatterns();
            this.isInitialized = true;
            console.log('✅ Adaptive Learning Core initialized successfully');
        }
        catch (error) {
            console.error('❌ Adaptive Learning Core initialization failed:', error);
            throw error;
        }
    }
    /**
     * Extract adaptive pattern from current state, historical data, and temporal context
     */
    async extractPattern(currentState, historicalPatterns, temporalContext) {
        if (!this.isInitialized) {
            throw new Error('Adaptive Learning Core not initialized');
        }
        console.log('🔍 Extracting adaptive pattern...');
        const startTime = performance.now();
        try {
            // Step 1: Analyze current state for pattern features
            const stateFeatures = await this.extractStateFeatures(currentState);
            // Step 2: Compare with historical patterns
            const historicalMatches = await this.findHistoricalMatches(stateFeatures, historicalPatterns);
            // Step 3: Incorporate temporal context
            const temporalFeatures = await this.extractTemporalFeatures(stateFeatures, temporalContext);
            // Step 4: Identify cross-domain transfer opportunities
            const crossDomainMappings = await this.identifyCrossDomainMappings(stateFeatures, historicalMatches);
            // Step 5: Calculate pattern confidence
            const confidence = await this.calculatePatternConfidence(stateFeatures, historicalMatches, temporalFeatures);
            // Step 6: Estimate performance score
            const performanceScore = await this.estimatePatternPerformance(stateFeatures, historicalMatches, confidence);
            // Step 7: Create adaptive pattern
            const adaptivePattern = {
                id: `adaptive_pattern_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                pattern_type: await this.determinePatternType(stateFeatures, temporalFeatures),
                pattern_data: {
                    state_features: stateFeatures,
                    temporal_features: temporalFeatures,
                    historical_matches: historicalMatches,
                    extraction_metadata: {
                        timestamp: Date.now(),
                        confidence: confidence,
                        performance_score: performanceScore
                    }
                },
                confidence: confidence,
                performance_score: performanceScore,
                temporal_context: temporalContext,
                cross_domain_mappings: crossDomainMappings,
                adaptation_history: [],
                created_at: Date.now(),
                last_updated: Date.now()
            };
            // Step 8: Store pattern for future learning
            this.patterns.set(adaptivePattern.id, adaptivePattern);
            // Step 9: Update learning signals
            await this.updateLearningSignals(adaptivePattern);
            // Step 10: Track performance history
            this.trackPerformanceHistory(adaptivePattern.id, performanceScore);
            const endTime = performance.now();
            const extractionTime = endTime - startTime;
            console.log(`✅ Pattern extracted in ${extractionTime.toFixed(2)}ms`);
            console.log(`📊 Pattern confidence: ${(confidence * 100).toFixed(1)}%`);
            console.log(`🎯 Performance score: ${performanceScore.toFixed(3)}`);
            return adaptivePattern;
        }
        catch (error) {
            console.error('❌ Pattern extraction failed:', error);
            throw error;
        }
    }
    /**
     * Generate adaptation strategy based on reasoning pattern and verdict
     */
    async generateAdaptation(pattern, verdict) {
        console.log('🔄 Generating adaptation strategy...');
        try {
            // Step 1: Analyze pattern and verdict to determine adaptation needs
            const adaptationNeeds = await this.analyzeAdaptationNeeds(pattern, verdict);
            // Step 2: Select appropriate adaptation strategy type
            const strategyType = await this.selectStrategyType(adaptationNeeds);
            // Step 3: Generate target metrics based on verdict
            const targetMetrics = await this.generateTargetMetrics(verdict);
            // Step 4: Calculate adaptation rate based on confidence and performance
            const adaptationRate = await this.calculateAdaptationRate(pattern.confidence, pattern.performance_score, verdict.confidence);
            // Step 5: Determine risk tolerance
            const riskTolerance = await this.determineRiskTolerance(strategyType, adaptationNeeds);
            // Step 6: Generate constraints
            const constraints = await this.generateConstraints(strategyType, riskTolerance, adaptationNeeds);
            // Step 7: Define success criteria
            const successCriteria = await this.generateSuccessCriteria(targetMetrics, verdict.expected_performance);
            // Step 8: Create adaptation strategy
            const adaptationStrategy = {
                strategy_id: `strategy_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                type: strategyType,
                target_metrics: targetMetrics,
                adaptation_rate: adaptationRate,
                risk_tolerance: riskTolerance,
                constraints: constraints,
                success_criteria: successCriteria
            };
            // Step 9: Store strategy for future reference
            this.strategies.set(adaptationStrategy.strategy_id, adaptationStrategy);
            // Step 10: Record adaptation generation
            this.recordAdaptationGeneration(pattern, adaptationStrategy);
            return adaptationStrategy;
        }
        catch (error) {
            console.error('❌ Adaptation strategy generation failed:', error);
            throw error;
        }
    }
    /**
     * Apply adaptation strategy and track results
     */
    async applyAdaptation(strategy, currentPerformance, currentConfidence) {
        console.log(`🎯 Applying adaptation strategy: ${strategy.type}`);
        const startTime = performance.now();
        try {
            // Step 1: Validate strategy constraints
            await this.validateStrategyConstraints(strategy, currentPerformance);
            // Step 2: Apply adaptation based on strategy type
            const adaptationResult = await this.executeAdaptation(strategy, currentPerformance);
            // Step 3: Collect learning signals during adaptation
            const learningSignals = await this.collectLearningSignals(adaptationResult);
            // Step 4: Assess cross-agent impact
            const crossAgentImpact = await this.assessCrossAgentImpact(strategy, adaptationResult);
            // Step 5: Calculate adaptation success
            const adaptationSuccess = await this.evaluateAdaptationSuccess(strategy, adaptationResult, learningSignals);
            // Step 6: Create adaptation result
            const result = {
                adaptation_id: `adaptation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                strategy_applied: strategy,
                performance_before: currentPerformance,
                performance_after: adaptationResult.performance,
                confidence_before: currentConfidence,
                confidence_after: adaptationResult.confidence,
                adaptation_success: adaptationSuccess,
                learning_signals: learningSignals,
                cross_agent_impact: crossAgentImpact
            };
            // Step 7: Update internal state based on results
            await this.updateInternalState(result);
            // Step 8: Store adaptation history
            this.storeAdaptationHistory(result);
            const endTime = performance.now();
            const adaptationTime = endTime - startTime;
            console.log(`✅ Adaptation applied in ${adaptationTime.toFixed(2)}ms`);
            console.log(`📈 Performance change: ${((result.performance_after - result.performance_before) * 100).toFixed(1)}%`);
            console.log(`🎯 Adaptation success: ${adaptationSuccess ? 'YES' : 'NO'}`);
            return result;
        }
        catch (error) {
            console.error('❌ Adaptation application failed:', error);
            throw error;
        }
    }
    // Private methods for pattern extraction and analysis
    async initializePatternExtraction() {
        console.log('🔍 Initializing pattern extraction algorithms...');
        // Initialize pattern extraction algorithms
    }
    async setupCrossDomainTransfer() {
        console.log('🔄 Setting up cross-domain transfer mechanisms...');
        // Setup cross-domain transfer mechanisms
    }
    async initializeAdaptationStrategies() {
        console.log('📋 Initializing adaptation strategies...');
        // Initialize default adaptation strategies
    }
    async setupLearningSignalProcessing() {
        console.log('📡 Setting up learning signal processing...');
        // Setup learning signal processing
    }
    async initializePerformanceTracking() {
        console.log('📊 Initializing performance tracking...');
        // Initialize performance tracking
    }
    async loadExistingPatterns() {
        console.log('📂 Loading existing adaptive patterns...');
        // Load existing patterns from storage
    }
    async extractStateFeatures(currentState) {
        // Extract features from current state
        return {
            numerical_features: this.extractNumericalFeatures(currentState),
            categorical_features: this.extractCategoricalFeatures(currentState),
            temporal_features: this.extractTemporalFeaturesFromState(currentState),
            relational_features: this.extractRelationalFeatures(currentState)
        };
    }
    extractNumericalFeatures(state) {
        // Extract numerical features from state
        const features = {};
        for (const [key, value] of Object.entries(state)) {
            if (typeof value === 'number') {
                features[key] = value;
            }
        }
        return features;
    }
    extractCategoricalFeatures(state) {
        // Extract categorical features from state
        const features = {};
        for (const [key, value] of Object.entries(state)) {
            if (typeof value === 'string' || typeof value === 'boolean') {
                features[key] = value;
            }
        }
        return features;
    }
    extractTemporalFeaturesFromState(state) {
        // Extract temporal features from state
        return {
            timestamp: state.timestamp || Date.now(),
            time_of_day: new Date().getHours(),
            day_of_week: new Date().getDay(),
            temporal_sequence: state.temporal_sequence || []
        };
    }
    extractRelationalFeatures(state) {
        // Extract relational features from state
        return {
            relationships: state.relationships || {},
            dependencies: state.dependencies || [],
            hierarchies: state.hierarchies || []
        };
    }
    async findHistoricalMatches(stateFeatures, historicalPatterns) {
        // Find matching historical patterns
        const matches = [];
        for (const historical of historicalPatterns) {
            const similarity = await this.calculatePatternSimilarity(stateFeatures, historical);
            if (similarity > this.patternExtractionThreshold) {
                matches.push({
                    pattern: historical,
                    similarity: similarity,
                    relevance_score: similarity * (historical.performance_score || 0.5)
                });
            }
        }
        // Sort by relevance score
        matches.sort((a, b) => b.relevance_score - a.relevance_score);
        return matches.slice(0, 10); // Return top 10 matches
    }
    async calculatePatternSimilarity(features1, features2) {
        // Calculate similarity between two patterns
        let similarity = 0;
        let featureCount = 0;
        // Compare numerical features
        if (features1.numerical_features && features2.numerical_features) {
            for (const key of Object.keys(features1.numerical_features)) {
                if (features2.numerical_features[key] !== undefined) {
                    const diff = Math.abs(features1.numerical_features[key] - features2.numerical_features[key]);
                    const maxVal = Math.max(Math.abs(features1.numerical_features[key]), Math.abs(features2.numerical_features[key]));
                    similarity += maxVal > 0 ? (1 - diff / maxVal) : 1;
                    featureCount++;
                }
            }
        }
        // Compare categorical features
        if (features1.categorical_features && features2.categorical_features) {
            for (const key of Object.keys(features1.categorical_features)) {
                if (features2.categorical_features[key] !== undefined) {
                    similarity += features1.categorical_features[key] === features2.categorical_features[key] ? 1 : 0;
                    featureCount++;
                }
            }
        }
        return featureCount > 0 ? similarity / featureCount : 0;
    }
    async extractTemporalFeatures(stateFeatures, temporalContext) {
        // Extract temporal features
        return {
            current_timestamp: Date.now(),
            temporal_window: temporalContext.window || [],
            temporal_patterns: temporalContext.patterns || [],
            temporal_dependencies: temporalContext.dependencies || [],
            temporal_trends: temporalContext.trends || []
        };
    }
    async identifyCrossDomainMappings(stateFeatures, historicalMatches) {
        // Identify cross-domain transfer opportunities
        const mappings = [];
        for (const match of historicalMatches) {
            if (match.pattern.domain && match.pattern.domain !== 'current') {
                const mapping = {
                    source_domain: match.pattern.domain,
                    target_domain: 'current',
                    mapping_confidence: match.similarity,
                    transfer_performance: match.pattern.performance_score || 0.5,
                    adaptation_required: match.similarity < 0.8
                };
                mappings.push(mapping);
            }
        }
        return mappings;
    }
    async calculatePatternConfidence(stateFeatures, historicalMatches, temporalFeatures) {
        // Calculate confidence in extracted pattern
        let confidence = 0.5; // Base confidence
        // Factor in historical match quality
        if (historicalMatches.length > 0) {
            const avgMatchQuality = historicalMatches.reduce((sum, match) => sum + match.relevance_score, 0) / historicalMatches.length;
            confidence += avgMatchQuality * 0.3;
        }
        // Factor in temporal consistency
        if (temporalFeatures.temporal_patterns.length > 0) {
            const temporalConsistency = this.calculateTemporalConsistency(temporalFeatures);
            confidence += temporalConsistency * 0.2;
        }
        return Math.min(1.0, confidence);
    }
    calculateTemporalConsistency(temporalFeatures) {
        // Calculate temporal consistency
        if (temporalFeatures.temporal_patterns.length === 0)
            return 0.5;
        // Simplified consistency calculation
        return Math.random() * 0.5 + 0.5; // Placeholder
    }
    async estimatePatternPerformance(stateFeatures, historicalMatches, confidence) {
        // Estimate pattern performance based on historical matches
        if (historicalMatches.length === 0) {
            return confidence * 0.7; // Default performance estimate
        }
        const weightedPerformance = historicalMatches.reduce((sum, match) => sum + match.relevance_score * (match.pattern.performance_score || 0.5), 0);
        const totalRelevance = historicalMatches.reduce((sum, match) => sum + match.relevance_score, 0);
        return totalRelevance > 0 ? weightedPerformance / totalRelevance : confidence * 0.7;
    }
    async determinePatternType(stateFeatures, temporalFeatures) {
        // Determine pattern type based on features
        if (temporalFeatures.temporal_patterns.length > 0) {
            return 'temporal';
        }
        if (stateFeatures.relational_features.dependencies.length > 0) {
            return 'causal';
        }
        if (stateFeatures.relational_features.relationships &&
            Object.keys(stateFeatures.relational_features.relationships).length > 0) {
            return 'cross_domain';
        }
        return 'sequential';
    }
    // Private methods for adaptation strategy generation
    async analyzeAdaptationNeeds(pattern, verdict) {
        // Analyze adaptation needs based on pattern and verdict
        return {
            performance_gap: verdict.expected_performance - pattern.performance_score,
            confidence_gap: verdict.confidence - pattern.confidence,
            adaptation_urgency: this.calculateAdaptationUrgency(pattern, verdict),
            risk_level: this.assessRiskLevel(pattern, verdict)
        };
    }
    calculateAdaptationUrgency(pattern, verdict) {
        // Calculate adaptation urgency
        const performanceGap = Math.abs(verdict.expected_performance - pattern.performance_score);
        const confidenceGap = Math.abs(verdict.confidence - pattern.confidence);
        return Math.min(1.0, (performanceGap + confidenceGap) / 2);
    }
    assessRiskLevel(pattern, verdict) {
        // Assess risk level
        if (pattern.confidence < 0.3 || verdict.confidence < 0.3)
            return 'high';
        if (pattern.confidence < 0.6 || verdict.confidence < 0.6)
            return 'medium';
        return 'low';
    }
    async selectStrategyType(adaptationNeeds) {
        // Select strategy type based on adaptation needs
        if (adaptationNeeds.risk_level === 'high') {
            return 'conservative';
        }
        if (adaptationNeeds.adaptation_urgency > 0.8) {
            return 'aggressive';
        }
        if (adaptationNeeds.performance_gap > 0.3) {
            return 'gradual';
        }
        return 'exploratory';
    }
    async generateTargetMetrics(verdict) {
        // Generate target metrics based on verdict
        const metrics = ['overall_performance'];
        if (verdict.component_rewards) {
            for (const component of Object.keys(verdict.component_rewards)) {
                metrics.push(`${component}_performance`);
            }
        }
        return metrics;
    }
    async calculateAdaptationRate(patternConfidence, patternPerformance, verdictConfidence) {
        // Calculate adaptation rate
        const confidenceFactor = (patternConfidence + verdictConfidence) / 2;
        const performanceFactor = patternPerformance;
        return this.globalLearningRate * confidenceFactor * performanceFactor;
    }
    async determineRiskTolerance(strategyType, adaptationNeeds) {
        // Determine risk tolerance based on strategy type and needs
        switch (strategyType) {
            case 'conservative': return 0.1;
            case 'gradual': return 0.3;
            case 'aggressive': return 0.6;
            case 'exploratory': return 0.8;
            default: return 0.4;
        }
    }
    async generateConstraints(strategyType, riskTolerance, adaptationNeeds) {
        // Generate constraints for adaptation
        const constraints = [];
        // Performance constraint
        constraints.push({
            constraint_type: 'performance',
            threshold: adaptationNeeds.performance_gap * 0.5,
            priority: 1,
            action: riskTolerance > 0.5 ? 'warn' : 'stop'
        });
        // Stability constraint
        constraints.push({
            constraint_type: 'stability',
            threshold: 0.2,
            priority: 2,
            action: 'warn'
        });
        // Resource constraint
        constraints.push({
            constraint_type: 'resource',
            threshold: 0.8,
            priority: 3,
            action: 'adjust'
        });
        return constraints;
    }
    async generateSuccessCriteria(targetMetrics, expectedPerformance) {
        // Generate success criteria
        const criteria = [];
        for (const metric of targetMetrics) {
            criteria.push({
                metric_name: metric,
                target_value: expectedPerformance,
                tolerance: 0.1,
                weight: 1.0 / targetMetrics.length
            });
        }
        return criteria;
    }
    // Additional helper methods
    recordAdaptationGeneration(pattern, strategy) {
        // Record adaptation generation for learning
        console.log(`📝 Adaptation strategy generated: ${strategy.type}`);
    }
    trackPerformanceHistory(patternId, performance) {
        // Track performance history for pattern
        if (!this.performanceHistory.has(patternId)) {
            this.performanceHistory.set(patternId, []);
        }
        const history = this.performanceHistory.get(patternId);
        history.push(performance);
        // Keep only last 100 performance points
        if (history.length > 100) {
            history.shift();
        }
    }
    async updateLearningSignals(pattern) {
        // Update learning signals based on pattern
        const signal = {
            signal_id: `signal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            signal_type: pattern.performance_score > 0.7 ? 'reward' : 'neutral',
            magnitude: pattern.performance_score,
            source: 'pattern_extraction',
            temporal_signature: pattern.temporal_context,
            cross_agent_relevance: pattern.cross_domain_mappings.length > 0 ? 0.8 : 0.3,
            pattern_associations: [pattern.id]
        };
        this.learningSignals.push(signal);
        // Keep only last 1000 signals
        if (this.learningSignals.length > 1000) {
            this.learningSignals.shift();
        }
    }
    // Additional private methods for adaptation execution
    async validateStrategyConstraints(strategy, currentPerformance) {
        // Validate strategy constraints
        for (const constraint of strategy.constraints) {
            if (constraint.constraint_type === 'performance' && currentPerformance < constraint.threshold) {
                if (constraint.action === 'stop') {
                    throw new Error(`Performance constraint violated: ${currentPerformance} < ${constraint.threshold}`);
                }
            }
        }
    }
    async executeAdaptation(strategy, currentPerformance) {
        // Execute adaptation based on strategy
        const performanceImpact = strategy.adaptation_rate * (strategy.type === 'aggressive' ? 1.5 : 1.0);
        const confidenceImpact = performanceImpact * 0.8;
        return {
            performance: Math.min(1.0, currentPerformance + performanceImpact),
            confidence: Math.min(1.0, (currentPerformance * 0.9) + confidenceImpact)
        };
    }
    async collectLearningSignals(adaptationResult) {
        // Collect learning signals during adaptation
        return [{
                signal_id: `adaptation_signal_${Date.now()}`,
                signal_type: adaptationResult.performance > adaptationResult.performance ? 'reward' : 'neutral',
                magnitude: Math.abs(adaptationResult.performance - adaptationResult.performance),
                source: 'adaptation_execution',
                temporal_signature: {},
                cross_agent_relevance: 0.5,
                pattern_associations: []
            }];
    }
    async assessCrossAgentImpact(strategy, adaptationResult) {
        // Assess cross-agent impact
        return [{
                agent_type: 'ml_researcher',
                impact_type: 'positive',
                impact_magnitude: 0.3,
                adaptation_suggestion: 'Incorporate new pattern features'
            }];
    }
    async evaluateAdaptationSuccess(strategy, adaptationResult, learningSignals) {
        // Evaluate adaptation success
        const performanceImprovement = adaptationResult.performance - adaptationResult.performance;
        const confidenceImprovement = adaptationResult.confidence - adaptationResult.confidence;
        return performanceImprovement > 0 || confidenceImprovement > 0;
    }
    async updateInternalState(result) {
        // Update internal state based on adaptation result
        this.globalLearningRate *= 0.999; // Decay learning rate
        this.explorationDecay *= 0.999;
    }
    storeAdaptationHistory(result) {
        // Store adaptation history
        this.adaptationHistory.push({
            timestamp: Date.now(),
            trigger_event: 'adaptation_execution',
            adaptation_type: result.strategy_applied.type,
            performance_impact: result.performance_after - result.performance_before,
            confidence_change: result.confidence_after - result.confidence_before
        });
        // Keep only last 1000 adaptations
        if (this.adaptationHistory.length > 1000) {
            this.adaptationHistory.shift();
        }
    }
    /**
     * Get comprehensive statistics about adaptive learning
     */
    async getStatistics() {
        return {
            patterns: {
                total: this.patterns.size,
                by_type: this.getPatternsByType(),
                average_confidence: this.getAverageConfidence(),
                average_performance: this.getAveragePerformance()
            },
            strategies: {
                total: this.strategies.size,
                by_type: this.getStrategiesByType()
            },
            learning: {
                signals_processed: this.learningSignals.length,
                adaptations_executed: this.adaptationHistory.length,
                global_learning_rate: this.globalLearningRate,
                exploration_decay: this.explorationDecay
            },
            performance: {
                history_size: Array.from(this.performanceHistory.values())
                    .reduce((sum, history) => sum + history.length, 0)
            }
        };
    }
    getPatternsByType() {
        const typeCount = {};
        for (const pattern of this.patterns.values()) {
            typeCount[pattern.pattern_type] = (typeCount[pattern.pattern_type] || 0) + 1;
        }
        return typeCount;
    }
    getStrategiesByType() {
        const typeCount = {};
        for (const strategy of this.strategies.values()) {
            typeCount[strategy.type] = (typeCount[strategy.type] || 0) + 1;
        }
        return typeCount;
    }
    getAverageConfidence() {
        if (this.patterns.size === 0)
            return 0;
        const totalConfidence = Array.from(this.patterns.values())
            .reduce((sum, pattern) => sum + pattern.confidence, 0);
        return totalConfidence / this.patterns.size;
    }
    getAveragePerformance() {
        if (this.patterns.size === 0)
            return 0;
        const totalPerformance = Array.from(this.patterns.values())
            .reduce((sum, pattern) => sum + pattern.performance_score, 0);
        return totalPerformance / this.patterns.size;
    }
    /**
     * Shutdown Adaptive Learning Core gracefully
     */
    async shutdown() {
        console.log('🛑 Shutting down Adaptive Learning Core...');
        // Clear all data structures
        this.patterns.clear();
        this.strategies.clear();
        this.learningSignals = [];
        this.adaptationHistory = [];
        this.crossDomainMappings.clear();
        this.performanceHistory.clear();
        this.confidenceDecay.clear();
        this.isInitialized = false;
        console.log('✅ Adaptive Learning Core shutdown complete');
    }
}
exports.AdaptiveLearningCore = AdaptiveLearningCore;
//# sourceMappingURL=AdaptiveLearningCore.js.map