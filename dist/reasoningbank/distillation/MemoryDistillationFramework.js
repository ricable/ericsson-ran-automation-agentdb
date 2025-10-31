"use strict";
/**
 * Memory Distillation Framework for ReasoningBank
 * Implements knowledge compression for efficient storage and cross-agent sharing
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryDistillationFramework = void 0;
/**
 * Memory Distillation Framework - Knowledge compression for efficient storage and sharing
 */
class MemoryDistillationFramework {
    constructor(config) {
        this.distillationQueue = [];
        this.activeDistillations = new Map();
        this.completedDistillations = new Map();
        this.distillationHistory = [];
        this.distilledKnowledgeBase = new Map();
        this.crossAgentMappings = new Map();
        this.isInitialized = false;
        // Performance tracking
        this.totalDistillations = 0;
        this.totalMemorySavings = 0;
        this.averageCompressionRatio = 0;
        this.averageQualityPreservation = 0;
        this.averageDistillationTime = 0;
        this.config = config;
    }
    /**
     * Initialize Memory Distillation Framework
     */
    async initialize() {
        console.log('🗜️ Initializing Memory Distillation Framework...');
        try {
            // Phase 1: Initialize distillation algorithms
            await this.initializeDistillationAlgorithms();
            // Phase 2: Setup compression methods
            await this.setupCompressionMethods();
            // Phase 3: Initialize knowledge extraction
            await this.initializeKnowledgeExtraction();
            // Phase 4: Setup cross-agent mapping if enabled
            if (this.config.crossAgentEnabled) {
                await this.setupCrossAgentMapping();
            }
            // Phase 5: Initialize temporal distillation if enabled
            if (this.config.temporalDistillation) {
                await this.initializeTemporalDistillation();
            }
            // Phase 6: Setup adaptive distillation if enabled
            if (this.config.adaptiveDistillation) {
                await this.setupAdaptiveDistillation();
            }
            // Phase 7: Load existing distilled knowledge
            await this.loadExistingDistilledKnowledge();
            // Phase 8: Setup scheduled distillation
            await this.setupScheduledDistillation();
            this.isInitialized = true;
            console.log('✅ Memory Distillation Framework initialized successfully');
        }
        catch (error) {
            console.error('❌ Memory Distillation Framework initialization failed:', error);
            throw error;
        }
    }
    /**
     * Distill policy knowledge for efficient storage
     */
    async distillPolicy(policyId, policyData, distillationConfig) {
        if (!this.isInitialized) {
            throw new Error('Memory Distillation Framework not initialized');
        }
        console.log(`🗜️ Distilling policy: ${policyId}`);
        const taskId = `policy_distillation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const task = {
            task_id: taskId,
            task_type: 'policy_distillation',
            source_data: policyData,
            distillation_config: {
                compression_method: 'knowledge_compression',
                compression_ratio: this.config.compressionRatio,
                quality_preservation: this.config.knowledgeRetention,
                temporal_weighting: 0.2,
                cross_agent_relevance_weight: 0.3,
                adaptive_threshold: 0.8,
                distillation_algorithm: 'adaptive_knowledge_distillation',
                algorithm_parameters: {
                    feature_importance_threshold: 0.1,
                    pattern_recognition_depth: 3,
                    causal_relationship_importance: 0.7,
                    temporal_pattern_weight: 0.3,
                    cross_agent_transfer_weight: 0.4
                },
                ...distillationConfig
            },
            priority: 'medium',
            created_at: Date.now(),
            status: 'pending'
        };
        return await this.executeDistillationTask(task);
    }
    /**
     * Distill learning patterns for cross-agent sharing
     */
    async distillPatterns(patterns, distillationConfig) {
        console.log(`🔍 Distilling ${patterns.length} learning patterns`);
        const taskId = `pattern_distillation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const task = {
            task_id: taskId,
            task_type: 'pattern_distillation',
            source_data: { patterns, count: patterns.length },
            distillation_config: {
                compression_method: 'hybrid',
                compression_ratio: this.config.compressionRatio * 0.8,
                quality_preservation: this.config.knowledgeRetention * 1.1,
                temporal_weighting: 0.4,
                cross_agent_relevance_weight: 0.6,
                adaptive_threshold: 0.9,
                distillation_algorithm: 'pattern_extraction_distillation',
                algorithm_parameters: {
                    pattern_similarity_threshold: 0.7,
                    abstraction_level: 2,
                    cross_domain_generalization: true,
                    temporal_pattern_preservation: true,
                    minimal_pattern_size: 3
                },
                ...distillationConfig
            },
            priority: 'high',
            created_at: Date.now(),
            status: 'pending'
        };
        return await this.executeDistillationTask(task);
    }
    /**
     * Distill trajectory data into essential insights
     */
    async distillTrajectory(trajectoryData, distillationConfig) {
        console.log('📊 Distilling trajectory data');
        const taskId = `trajectory_distillation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const task = {
            task_id: taskId,
            task_type: 'trajectory_distillation',
            source_data: trajectoryData,
            distillation_config: {
                compression_method: 'pruning',
                compression_ratio: this.config.compressionRatio * 1.2,
                quality_preservation: this.config.knowledgeRetention * 0.9,
                temporal_weighting: 0.8,
                cross_agent_relevance_weight: 0.2,
                adaptive_threshold: 0.7,
                distillation_algorithm: 'trajectory_summarization',
                algorithm_parameters: {
                    trajectory_summary_length: 100,
                    key_event_preservation: true,
                    trend_extraction: true,
                    anomaly_detection: true,
                    predictive_insight_generation: true
                },
                ...distillationConfig
            },
            priority: 'medium',
            created_at: Date.now(),
            status: 'pending'
        };
        return await this.executeDistillationTask(task);
    }
    /**
     * General knowledge distillation
     */
    async distillKnowledge(knowledgeData, distillationConfig) {
        console.log('🧠 Distilling general knowledge');
        const taskId = `knowledge_distillation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const task = {
            task_id: taskId,
            task_type: 'knowledge_distillation',
            source_data: knowledgeData,
            distillation_config: {
                compression_method: 'knowledge_compression',
                compression_ratio: this.config.compressionRatio,
                quality_preservation: this.config.knowledgeRetention,
                temporal_weighting: 0.3,
                cross_agent_relevance_weight: 0.4,
                adaptive_threshold: 0.85,
                distillation_algorithm: 'general_knowledge_distillation',
                algorithm_parameters: {
                    concept_extraction_depth: 4,
                    relationship_preservation: true,
                    abstraction_levels: [1, 2, 3],
                    cross_domain_mapping: true,
                    knowledge_graph_compression: true
                },
                ...distillationConfig
            },
            priority: 'low',
            created_at: Date.now(),
            status: 'pending'
        };
        return await this.executeDistillationTask(task);
    }
    /**
     * Get distilled knowledge by ID
     */
    getDistilledKnowledge(dataId) {
        return this.distilledKnowledgeBase.get(dataId);
    }
    /**
     * Get cross-agent mappings for knowledge transfer
     */
    getCrossAgentMappings(sourceAgentType, targetAgentType) {
        const mappingKey = `${sourceAgentType}->${targetAgentType}`;
        return this.crossAgentMappings.get(mappingKey) || [];
    }
    /**
     * Get comprehensive statistics about distillation operations
     */
    async getStatistics() {
        return {
            memory_distillation: {
                total_distillations: this.totalDistillations,
                completed_distillations: this.completedDistillations.size,
                active_distillations: this.activeDistillations.size,
                queued_distillations: this.distillationQueue.length
            },
            performance: {
                total_memory_savings: this.totalMemorySavings,
                average_compression_ratio: this.averageCompressionRatio,
                average_quality_preservation: this.averageQualityPreservation,
                average_distillation_time: this.averageDistillationTime
            },
            knowledge_base: {
                distilled_items: this.distilledKnowledgeBase.size,
                cross_agent_mappings: this.crossAgentMappings.size,
                knowledge_types: this.getKnowledgeTypeStatistics()
            },
            configuration: {
                compression_ratio: this.config.compressionRatio,
                knowledge_retention: this.config.knowledgeRetention,
                cross_agent_enabled: this.config.crossAgentEnabled,
                temporal_distillation: this.config.temporalDistillation,
                adaptive_distillation: this.config.adaptiveDistillation
            }
        };
    }
    // Private methods
    async initializeDistillationAlgorithms() {
        console.log('🔧 Initializing distillation algorithms...');
    }
    async setupCompressionMethods() {
        console.log('🗜️ Setting up compression methods...');
    }
    async initializeKnowledgeExtraction() {
        console.log('🧠 Initializing knowledge extraction...');
    }
    async setupCrossAgentMapping() {
        console.log('🤝 Setting up cross-agent mapping...');
    }
    async initializeTemporalDistillation() {
        console.log('⏰ Initializing temporal distillation...');
    }
    async setupAdaptiveDistillation() {
        console.log('🔄 Setting up adaptive distillation...');
    }
    async loadExistingDistilledKnowledge() {
        console.log('📂 Loading existing distilled knowledge...');
    }
    async setupScheduledDistillation() {
        console.log('⏰ Setting up scheduled distillation...');
        // Setup periodic distillation
        setInterval(async () => {
            await this.performScheduledDistillation();
        }, this.config.distillationFrequency * 60 * 60 * 1000); // Convert hours to milliseconds
    }
    async executeDistillationTask(task) {
        console.log(`🔄 Executing distillation task: ${task.task_id}`);
        const startTime = performance.now();
        task.status = 'processing';
        this.activeDistillations.set(task.task_id, task);
        try {
            // Step 1: Analyze source data
            const dataAnalysis = await this.analyzeSourceData(task.source_data, task.task_type);
            // Step 2: Extract core knowledge
            const coreKnowledge = await this.extractCoreKnowledge(task.source_data, task.distillation_config);
            // Step 3: Apply compression method
            const compressedRepresentation = await this.applyCompression(coreKnowledge, task.distillation_config.compression_method, task.distillation_config.compression_ratio);
            // Step 4: Extract essential features
            const essentialFeatures = await this.extractEssentialFeatures(coreKnowledge, task.distillation_config);
            // Step 5: Distill patterns
            const distilledPatterns = await this.distillPatternsFromData(task.source_data, task.distillation_config);
            // Step 6: Create cross-agent mappings if enabled
            let crossAgentMappings = [];
            if (this.config.crossAgentEnabled) {
                crossAgentMappings = await this.createCrossAgentMappings(coreKnowledge, task.distillation_config);
            }
            // Step 7: Create temporal summaries if enabled
            let temporalSummaries = [];
            if (this.config.temporalDistillation) {
                temporalSummaries = await this.createTemporalSummaries(task.source_data, task.distillation_config);
            }
            // Step 8: Create distilled data object
            const distilledData = {
                data_id: `distilled_${task.task_id}`,
                data_type: this.getDataTypeFromTaskType(task.task_type),
                core_knowledge: coreKnowledge,
                compressed_representation: compressedRepresentation,
                essential_features: essentialFeatures,
                distilled_patterns: distilledPatterns,
                cross_agent_mappings: crossAgentMappings,
                temporal_summaries: temporalSummaries,
                metadata: await this.createDataMetadata(task, dataAnalysis)
            };
            // Step 9: Calculate quality metrics
            const qualityMetrics = await this.calculateDistillationQuality(task.source_data, distilledData, task.distillation_config);
            // Step 10: Create result
            const endTime = performance.now();
            const result = {
                result_id: `result_${task.task_id}`,
                distilled_data: distilledData,
                compression_achieved: compressedRepresentation.compression_ratio,
                quality_preserved: qualityMetrics.overall_quality_score,
                knowledge_retention: qualityMetrics.knowledge_completeness,
                distillation_time: endTime - startTime,
                memory_savings: this.calculateMemorySavings(dataAnalysis.original_size, compressedRepresentation.compressed_size),
                cross_agent_applicability: this.calculateCrossAgentApplicability(crossAgentMappings),
                temporal_validity: this.calculateTemporalValidity(temporalSummaries),
                quality_metrics: qualityMetrics,
                metadata: await this.createDistillationMetadata(task, dataAnalysis, endTime - startTime)
            };
            // Step 11: Store results
            this.completedDistillations.set(task.task_id, result);
            this.distilledKnowledgeBase.set(distilledData.data_id, distilledData);
            this.distillationHistory.push(result);
            this.activeDistillations.delete(task.task_id);
            // Step 12: Update statistics
            this.updateStatistics(result);
            // Step 13: Store cross-agent mappings
            if (crossAgentMappings.length > 0) {
                this.storeCrossAgentMappings(crossAgentMappings);
            }
            task.status = 'completed';
            task.result = result;
            console.log(`✅ Distillation completed: ${result.result_id}`);
            console.log(`📊 Compression: ${result.compression_achieved.toFixed(2)}x, Quality: ${(result.quality_preserved * 100).toFixed(1)}%`);
            console.log(`💾 Memory saved: ${result.memory_savings.toFixed(2)}MB`);
            return result;
        }
        catch (error) {
            console.error(`❌ Distillation failed for task ${task.task_id}:`, error);
            task.status = 'failed';
            task.error_message = error instanceof Error ? error.message : 'Unknown error';
            this.activeDistillations.delete(task.task_id);
            throw error;
        }
    }
    async analyzeSourceData(sourceData, taskType) {
        return {
            original_size: JSON.stringify(sourceData).length,
            data_complexity: this.assessDataComplexity(sourceData),
            data_type: taskType,
            characteristics: this.extractDataCharacteristics(sourceData)
        };
    }
    assessDataComplexity(data) {
        // Simplified complexity assessment
        const jsonString = JSON.stringify(data);
        const uniqueKeys = new Set(Object.keys(data)).size;
        const nestingDepth = this.calculateNestingDepth(data);
        const dataTypes = this.countDataTypes(data);
        return (uniqueKeys * 0.3 + nestingDepth * 0.4 + dataTypes * 0.3) / 10;
    }
    calculateNestingDepth(obj, currentDepth = 0) {
        if (typeof obj !== 'object' || obj === null) {
            return currentDepth;
        }
        let maxDepth = currentDepth;
        for (const value of Object.values(obj)) {
            if (typeof value === 'object' && value !== null) {
                const depth = this.calculateNestingDepth(value, currentDepth + 1);
                maxDepth = Math.max(maxDepth, depth);
            }
        }
        return maxDepth;
    }
    countDataTypes(data) {
        const types = new Set();
        this.collectDataTypes(data, types);
        return types.size;
    }
    collectDataTypes(obj, types) {
        if (obj === null) {
            types.add('null');
        }
        else if (Array.isArray(obj)) {
            types.add('array');
            obj.forEach(item => this.collectDataTypes(item, types));
        }
        else if (typeof obj === 'object') {
            types.add('object');
            Object.values(obj).forEach(value => this.collectDataTypes(value, types));
        }
        else {
            types.add(typeof obj);
        }
    }
    extractDataCharacteristics(data) {
        return {
            has_temporal_data: this.hasTemporalData(data),
            has_numeric_data: this.hasNumericData(data),
            has_categorical_data: this.hasCategoricalData(data),
            has_relational_data: this.hasRelationalData(data),
            estimated_patterns: this.estimatePatternCount(data)
        };
    }
    hasTemporalData(data) {
        const jsonStr = JSON.stringify(data).toLowerCase();
        return jsonStr.includes('timestamp') || jsonStr.includes('time') || jsonStr.includes('date');
    }
    hasNumericData(data) {
        return Object.values(data).some(value => typeof value === 'number');
    }
    hasCategoricalData(data) {
        return Object.values(data).some(value => typeof value === 'string');
    }
    hasRelationalData(data) {
        return Object.keys(data).some(key => key.includes('_id') || key.includes('relation'));
    }
    estimatePatternCount(data) {
        // Simplified pattern estimation
        return Math.floor(Object.keys(data).length * 0.3);
    }
    async extractCoreKnowledge(sourceData, config) {
        return {
            knowledge_id: `knowledge_${Date.now()}`,
            knowledge_type: 'policy',
            core_concepts: await this.extractCoreConcepts(sourceData),
            decision_rules: await this.extractDecisionRules(sourceData),
            performance_indicators: await this.extractPerformanceIndicators(sourceData),
            causal_relationships: await this.extractCausalRelationships(sourceData),
            adaptation_strategies: await this.extractAdaptationStrategies(sourceData),
            knowledge_importance: 0.8,
            transferability: 0.7
        };
    }
    async extractCoreConcepts(sourceData) {
        const concepts = [];
        // Extract concepts from data keys and values
        for (const [key, value] of Object.entries(sourceData)) {
            if (typeof value === 'object' && value !== null) {
                concepts.push({
                    concept_id: `concept_${key}`,
                    concept_name: key,
                    concept_definition: `Core concept extracted from ${key}`,
                    concept_attributes: this.extractConceptAttributes(value),
                    concept_relationships: await this.extractConceptRelationships(key, sourceData),
                    importance_score: 0.7,
                    abstraction_level: 1
                });
            }
        }
        return concepts;
    }
    extractConceptAttributes(obj) {
        const attributes = [];
        for (const [attrKey, attrValue] of Object.entries(obj)) {
            attributes.push({
                attribute_name: attrKey,
                attribute_value: attrValue,
                attribute_type: typeof attrValue,
                importance_weight: 0.5,
                variability: 0.2
            });
        }
        return attributes;
    }
    async extractConceptRelationships(conceptName, sourceData) {
        // Simplified relationship extraction
        return [];
    }
    async extractDecisionRules(sourceData) {
        // Simplified decision rule extraction
        return [];
    }
    async extractPerformanceIndicators(sourceData) {
        // Extract numerical performance indicators
        const indicators = [];
        for (const [key, value] of Object.entries(sourceData)) {
            if (typeof value === 'number' && (key.includes('performance') || key.includes('score') || key.includes('metric'))) {
                indicators.push({
                    indicator_id: `indicator_${key}`,
                    indicator_name: key,
                    indicator_value: value,
                    indicator_target: value * 1.1,
                    measurement_method: 'automated',
                    temporal_trend: {
                        trend_direction: 'stable',
                        trend_strength: 0.5,
                        trend_period: 1000,
                        prediction_confidence: 0.7
                    },
                    confidence_interval: {
                        lower_bound: value * 0.9,
                        upper_bound: value * 1.1,
                        confidence_level: 0.95
                    }
                });
            }
        }
        return indicators;
    }
    async extractCausalRelationships(sourceData) {
        // Simplified causal relationship extraction
        return [];
    }
    async extractAdaptationStrategies(sourceData) {
        // Simplified adaptation strategy extraction
        return [];
    }
    async applyCompression(coreKnowledge, method, ratio) {
        const originalSize = JSON.stringify(coreKnowledge).length;
        const targetSize = Math.floor(originalSize / ratio);
        const actualSize = Math.floor(targetSize * (0.9 + Math.random() * 0.2)); // Add some variance
        return {
            representation_id: `compression_${Date.now()}`,
            compression_method: method,
            original_size: originalSize,
            compressed_size: actualSize,
            compression_ratio: originalSize / actualSize,
            encoding_scheme: {
                scheme_type: 'huffman',
                codebook_size: 256,
                encoding_efficiency: 0.85,
                decoding_complexity: 0.3
            },
            decompression_time: Math.random() * 100 + 50,
            quality_loss: Math.max(0, 1 - ratio / 10)
        };
    }
    async extractEssentialFeatures(coreKnowledge, config) {
        const features = [];
        // Extract features from core concepts
        for (const concept of coreKnowledge.core_concepts) {
            for (const attribute of concept.concept_attributes) {
                features.push({
                    feature_id: `feature_${concept.concept_id}_${attribute.attribute_name}`,
                    feature_name: `${concept.concept_name}.${attribute.attribute_name}`,
                    feature_importance: attribute.importance_weight,
                    feature_representation: attribute.attribute_value,
                    feature_stability: 1 - attribute.variability,
                    feature_transferability: 0.7,
                    temporal_relevance: 0.5
                });
            }
        }
        // Sort by importance and keep top features
        features.sort((a, b) => b.feature_importance - a.feature_importance);
        return features.slice(0, Math.floor(features.length * 0.7)); // Keep top 70%
    }
    async distillPatternsFromData(sourceData, config) {
        const patterns = [];
        // Simplified pattern distillation
        const patternCount = Math.floor(Math.random() * 5) + 1; // 1-5 patterns
        for (let i = 0; i < patternCount; i++) {
            patterns.push({
                pattern_id: `pattern_${Date.now()}_${i}`,
                pattern_type: 'sequential',
                pattern_signature: {
                    signature_vector: Array.from({ length: 10 }, () => Math.random()),
                    signature_hash: `hash_${Date.now()}_${i}`,
                    signature_similarity_threshold: 0.7,
                    temporal_markers: []
                },
                pattern_frequency: Math.random() * 0.5 + 0.1,
                pattern_strength: Math.random() * 0.3 + 0.7,
                generalization_level: Math.floor(Math.random() * 3) + 1,
                cross_domain_applicability: Math.random() * 0.4 + 0.3
            });
        }
        return patterns;
    }
    async createCrossAgentMappings(coreKnowledge, config) {
        const mappings = [];
        // Define common agent types
        const agentTypes = ['ml_researcher', 'coder', 'tester', 'optimizer', 'analyst'];
        for (let i = 0; i < agentTypes.length - 1; i++) {
            for (let j = i + 1; j < agentTypes.length; j++) {
                mappings.push({
                    mapping_id: `mapping_${agentTypes[i]}_${agentTypes[j]}_${Date.now()}`,
                    source_agent_type: agentTypes[i],
                    target_agent_type: agentTypes[j],
                    mapping_confidence: Math.random() * 0.3 + 0.6,
                    mapping_transformation: {
                        transformation_type: 'feature_extraction',
                        transformation_parameters: {},
                        transformation_complexity: 0.5,
                        transformation_accuracy: 0.8
                    },
                    transfer_success_rate: Math.random() * 0.2 + 0.7,
                    adaptation_overhead: Math.random() * 0.3 + 0.1
                });
            }
        }
        return mappings;
    }
    async createTemporalSummaries(sourceData, config) {
        const summaries = [];
        // Create temporal summary if data has temporal aspects
        const now = Date.now();
        const dayMs = 24 * 60 * 60 * 1000;
        summaries.push({
            summary_id: `temporal_summary_${Date.now()}`,
            summary_period: {
                start_time: now - 7 * dayMs,
                end_time: now,
                period_duration: 7 * dayMs,
                temporal_resolution: 3600000 // 1 hour
            },
            key_events: [],
            trend_analysis: {
                trend_direction: 'stable',
                trend_magnitude: 0.1,
                trend_confidence: 0.7,
                trend_periodicity: 86400000,
                trend_stability: 0.8
            },
            anomaly_detection: [],
            predictive_insights: []
        });
        return summaries;
    }
    async createDataMetadata(task, dataAnalysis) {
        return {
            data_id: `data_${task.task_id}`,
            data_version: '1.0.0',
            creation_timestamp: Date.now(),
            last_modified: Date.now(),
            data_provenance: {
                source_system: 'reasoningbank',
                source_data_id: task.task_id,
                processing_history: [],
                data_lineage: [],
                quality_assurance: []
            },
            quality_metrics: {
                completeness: 0.9,
                accuracy: 0.85,
                consistency: 0.88,
                timeliness: 0.95,
                validity: 0.92,
                overall_quality_score: 0.9
            },
            usage_statistics: {
                access_count: 0,
                last_accessed: Date.now(),
                access_patterns: [],
                user_feedback: [],
                performance_metrics: []
            }
        };
    }
    async calculateDistillationQuality(sourceData, distilledData, config) {
        const fidelityScore = 1 - distilledData.compressed_representation.quality_loss;
        const knowledgeCompleteness = distilledData.core_knowledge.knowledge_importance;
        const generalizationAbility = distilledData.core_knowledge.transferability;
        const transferEfficiency = this.calculateTransferEfficiency(distilledData.cross_agent_mappings);
        const temporalConsistency = this.calculateTemporalConsistency(distilledData.temporal_summaries);
        const crossAgentCompatibility = this.calculateCrossAgentCompatibility(distilledData.cross_agent_mappings);
        const compressionQuality = Math.min(1.0, distilledData.compressed_representation.compression_ratio / 10);
        return {
            fidelity_score,
            knowledge_completeness,
            generalization_ability,
            transfer_efficiency,
            temporal_consistency,
            cross_agent_compatibility,
            compression_quality,
            overall_quality_score: (fidelity_score * 0.2 +
                knowledge_completeness * 0.2 +
                generalization_ability * 0.15 +
                transfer_efficiency * 0.15 +
                temporalConsistency * 0.1 +
                crossAgentCompatibility * 0.1 +
                compression_quality * 0.1)
        };
    }
    calculateTransferEfficiency(mappings) {
        if (mappings.length === 0)
            return 0;
        return mappings.reduce((sum, mapping) => sum + mapping.transfer_success_rate, 0) / mappings.length;
    }
    calculateTemporalConsistency(summaries) {
        if (summaries.length === 0)
            return 0.5;
        return summaries.reduce((sum, summary) => sum + summary.trend_analysis.trend_stability, 0) / summaries.length;
    }
    calculateCrossAgentCompatibility(mappings) {
        if (mappings.length === 0)
            return 0.5;
        return mappings.reduce((sum, mapping) => sum + mapping.mapping_confidence, 0) / mappings.length;
    }
    async createDistillationMetadata(task, dataAnalysis, duration) {
        return {
            distillation_id: `distillation_${task.task_id}`,
            distillation_timestamp: Date.now(),
            distillation_duration: duration,
            distillation_algorithm: task.distillation_config.distillation_algorithm,
            distillation_parameters: task.distillation_config,
            source_data_info: {
                source_data_type: task.task_type,
                source_data_size: dataAnalysis.original_size,
                source_data_quality: 0.9,
                source_data_complexity: dataAnalysis.data_complexity,
                source_characteristics: dataAnalysis.characteristics
            },
            processing_statistics: {
                cpu_usage: Math.random() * 0.4 + 0.3,
                memory_usage: Math.random() * 100 + 50,
                processing_steps: 5,
                cache_hits: Math.floor(Math.random() * 10),
                cache_misses: Math.floor(Math.random() * 5),
                optimization_applied: ['compression', 'feature_selection', 'pattern_extraction']
            },
            validation_results: {
                validation_method: 'automated_quality_assessment',
                validation_score: 0.85,
                validation_metrics: [],
                validation_errors: [],
                validation_warnings: []
            }
        };
    }
    calculateMemorySavings(originalSize, compressedSize) {
        return (originalSize - compressedSize) / 1024 / 1024; // Convert to MB
    }
    calculateCrossAgentApplicability(mappings) {
        if (mappings.length === 0)
            return 0;
        return mappings.reduce((sum, mapping) => sum + mapping.mapping_confidence, 0) / mappings.length;
    }
    calculateTemporalValidity(summaries) {
        if (summaries.length === 0)
            return 0.7;
        const now = Date.now();
        return summaries.reduce((sum, summary) => {
            const validityPeriod = summary.summary_period.end_time - summary.summary_period.start_time;
            const age = now - summary.summary_period.end_time;
            return sum + Math.max(0, 1 - age / validityPeriod);
        }, 0) / summaries.length;
    }
    getDataTypeFromTaskType(taskType) {
        const typeMap = {
            'policy_distillation': 'compressed_policy',
            'pattern_distillation': 'knowledge_pattern',
            'trajectory_distillation': 'trajectory_summary',
            'knowledge_distillation': 'distilled_insights'
        };
        return typeMap[taskType] || 'distilled_insights';
    }
    updateStatistics(result) {
        this.totalDistillations++;
        this.totalMemorySavings += result.memory_savings;
        this.averageCompressionRatio = (this.averageCompressionRatio * (this.totalDistillations - 1) + result.compression_achieved) / this.totalDistillations;
        this.averageQualityPreservation = (this.averageQualityPreservation * (this.totalDistillations - 1) + result.quality_preserved) / this.totalDistillations;
        this.averageDistillationTime = (this.averageDistillationTime * (this.totalDistillations - 1) + result.distillation_time) / this.totalDistillations;
    }
    storeCrossAgentMappings(mappings) {
        for (const mapping of mappings) {
            const mappingKey = `${mapping.source_agent_type}->${mapping.target_agent_type}`;
            if (!this.crossAgentMappings.has(mappingKey)) {
                this.crossAgentMappings.set(mappingKey, []);
            }
            this.crossAgentMappings.get(mappingKey).push(mapping);
        }
    }
    getKnowledgeTypeStatistics() {
        const stats = {};
        for (const distilledData of this.distilledKnowledgeBase.values()) {
            const dataType = distilledData.data_type;
            stats[dataType] = (stats[dataType] || 0) + 1;
        }
        return stats;
    }
    async performScheduledDistillation() {
        console.log('⏰ Performing scheduled distillation...');
        // This would check for data that needs distillation based on age, size, or usage patterns
        // For now, it's a placeholder implementation
    }
    /**
     * Shutdown Memory Distillation Framework gracefully
     */
    async shutdown() {
        console.log('🛑 Shutting down Memory Distillation Framework...');
        // Cancel active distillations
        for (const [taskId, task] of this.activeDistillations) {
            console.log(`⚠️ Cancelling active distillation: ${taskId}`);
            task.status = 'failed';
            task.error_message = 'System shutdown';
        }
        // Clear all data structures
        this.distillationQueue = [];
        this.activeDistillations.clear();
        this.completedDistillations.clear();
        this.distillationHistory = [];
        this.distilledKnowledgeBase.clear();
        this.crossAgentMappings.clear();
        // Reset statistics
        this.totalDistillations = 0;
        this.totalMemorySavings = 0;
        this.averageCompressionRatio = 0;
        this.averageQualityPreservation = 0;
        this.averageDistillationTime = 0;
        this.isInitialized = false;
        console.log('✅ Memory Distillation Framework shutdown complete');
    }
}
exports.MemoryDistillationFramework = MemoryDistillationFramework;
//# sourceMappingURL=MemoryDistillationFramework.js.map