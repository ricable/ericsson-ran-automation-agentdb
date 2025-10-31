"""
Unified Classification System - Strategy Pattern Implementation

This module consolidates all classification systems (AdvancedFeatureClassifier,
UnifiedFeatureClassifier, and UltraGranularClassifier) into a single
cohesive system using the Strategy Pattern.

Features:
- Single entry point for all classification needs
- Configurable classification modes (basic, standard, ultra_granular, hybrid)
- Backward compatibility with existing classifiers
- Performance optimization with mode-specific logic
- Unified data model for all classification results
"""

from abc import ABC, abstractmethod
from enum import Enum
from typing import Dict, List, Tuple, Optional, Union, Any
from dataclasses import dataclass, field
import re
import time
from collections import defaultdict

# Import all existing classification systems
from .feature_classifier import AdvancedFeatureClassifier
from .technology_detector import TechnologyDomainDetector
from .skill_assessor import SkillLevelAssessor

# Import new unified systems
from .core.base_classifier import (
    UnifiedFeatureClassifier as CoreUnifiedClassifier,
    ClassificationMode as CoreClassificationMode,
    GranularityLevel as CoreGranularityLevel
)
from .core.technology_detector import TechnologyDomainDetector as EnhancedTechnologyDetector
from .core.skill_assessor import SkillLevelAssessor as EnhancedSkillLevelAssessor

# Try to import ultra-granular components
try:
    from .advanced.ultra_granular_classifier import (
        UltraGranularClassifier,
        PrimaryDomain as UltraPrimaryDomain,
        SecondarySpecialization,
        ExpertiseLevel,
        RANExpertRole,
        UseCaseScenario as UltraUseCaseScenario,
        UltraGranularClassification
    )
    ULTRA_GRANULAR_AVAILABLE = True
except ImportError:
    ULTRA_GRANULAR_AVAILABLE = False

# Import data models
from models.ericsson_feature import (
    EnhancedEricssonFeature,
    PrimaryCategory,
    UserRole,
    UseCaseScenario
)
from models.classification import (
    EnhancedClassification,
    ClassificationScore,
    DomainDetection
)


class ClassificationMode(Enum):
    """Classification modes with different strategies"""
    LEGACY_ADVANCED = "legacy_advanced"        # Uses AdvancedFeatureClassifier
    LEGACY_UNIFIED = "legacy_unified"          # Uses UnifiedFeatureClassifier
    ULTRA_GRANULAR = "ultra_granular"          # Uses UltraGranularClassifier
    STRATEGY_HYBRID = "strategy_hybrid"         # Uses best strategy per feature
    STRATEGY_ADAPTIVE = "strategy_adaptive"     # Adaptive based on feature complexity
    UNIFIED_CORE = "unified_core"              # New unified core implementation


class GranularityLevel(Enum):
    """Granularity levels for classification"""
    MINIMAL = 1        # Basic categories only
    BASIC = 2          # Enhanced basic with context
    STANDARD = 3       # Standard classification with role mapping
    DETAILED = 4       # Multiple secondary classifications
    COMPREHENSIVE = 5  # Full analysis with expert mapping
    EXPERT = 6         # Ultra-granular expert analysis


@dataclass
class UnifiedClassificationResult:
    """Unified result structure for all classification strategies"""

    # Primary classification
    primary_category: str
    confidence: float
    evidence: List[str] = field(default_factory=list)

    # Secondary classifications
    secondary_categories: List[Tuple[str, float]] = field(default_factory=list)
    technology_domains: List[str] = field(default_factory=list)

    # Skill and role assessment
    skill_level: str = "unknown"
    target_roles: List[str] = field(default_factory=list)
    use_case_scenarios: List[str] = field(default_factory=list)

    # Ultra-granular results (if available)
    ultra_granular: Optional[Dict[str, Any]] = None

    # Metadata
    mode: ClassificationMode = ClassificationMode.LEGACY_ADVANCED
    granularity: GranularityLevel = GranularityLevel.BASIC
    processing_time_ms: float = 0.0
    strategy_used: str = "unknown"

    # Compatibility data
    legacy_advanced_result: Optional[EnhancedClassification] = None
    legacy_unified_result: Optional[Any] = None
    ultra_granular_result: Optional[UltraGranularClassification] = None


class ClassificationStrategy(ABC):
    """Abstract base class for classification strategies"""

    @abstractmethod
    def classify(self, name: str, content: str, feature_data: Dict[str, Any]) -> UnifiedClassificationResult:
        """Classify a feature using this strategy"""
        pass

    @abstractmethod
    def get_supported_modes(self) -> List[ClassificationMode]:
        """Get list of supported classification modes"""
        pass

    @abstractmethod
    def get_complexity_score(self) -> int:
        """Get complexity score (1-10, higher = more complex)"""
        pass


class LegacyAdvancedStrategy(ClassificationStrategy):
    """Strategy using the original AdvancedFeatureClassifier"""

    def __init__(self):
        self.classifier = AdvancedFeatureClassifier()

    def classify(self, name: str, content: str, feature_data: Dict[str, Any]) -> UnifiedClassificationResult:
        start_time = time.time()

        # Create EnhancedEricssonFeature for compatibility
        feature = self._create_enhanced_feature(name, content, feature_data)

        # Use the legacy classifier
        classification = self.classifier.classify_feature(feature)

        # Convert to unified result
        result = UnifiedClassificationResult(
            primary_category=classification.get_primary_category(),
            confidence=classification.classification_confidence,
            evidence=classification.primary_classification.evidence,
            secondary_categories=[(score.category, score.score) for score in classification.secondary_classifications],
            technology_domains=[d.domain for d in classification.domain_detections],
            skill_level=classification.skill_assessment.level if classification.skill_assessment else "unknown",
            target_roles=list(classification.role_relevance.keys()),
            use_case_scenarios=[classification.use_case_classification] if classification.use_case_classification else [],
            mode=ClassificationMode.LEGACY_ADVANCED,
            strategy_used="legacy_advanced",
            legacy_advanced_result=classification,
            processing_time_ms=(time.time() - start_time) * 1000
        )

        return result

    def get_supported_modes(self) -> List[ClassificationMode]:
        return [ClassificationMode.LEGACY_ADVANCED]

    def get_complexity_score(self) -> int:
        return 7  # High complexity

    def _create_enhanced_feature(self, name: str, content: str, feature_data: Dict[str, Any]) -> EnhancedEricssonFeature:
        """Create EnhancedEricssonFeature from basic data"""
        # This is a simplified conversion - in practice, you'd need to handle all the model fields
        from models.ericsson_feature import ConfigurationManagement, PerformanceMonitoring, AutomationCapabilities

        return EnhancedEricssonFeature(
            id=feature_data.get('id', 'unknown'),
            name=name,
            description=content,
            configuration=ConfigurationManagement(mo_classes=feature_data.get('mo_classes', [])),
            performance_monitoring=PerformanceMonitoring(pm_counters=feature_data.get('pm_counters', [])),
            automation=AutomationCapabilities(self_organizing=feature_data.get('self_organizing', False))
        )


class LegacyUnifiedStrategy(ClassificationStrategy):
    """Strategy using the original UnifiedFeatureClassifier"""

    def __init__(self, mode: str = "standard", granularity: str = "detailed"):
        self.mode = mode
        self.granularity = granularity

        # Map string parameters to enum values
        mode_map = {
            'basic': CoreClassificationMode.BASIC,
            'standard': CoreClassificationMode.STANDARD,
            'ultra_granular': CoreClassificationMode.ULTRA_GRANULAR,
            'hybrid': CoreClassificationMode.HYBRID
        }

        granularity_map = {
            'minimal': CoreGranularityLevel.MINIMAL,
            'basic': CoreGranularityLevel.STANDARD,
            'detailed': CoreGranularityLevel.DETAILED,
            'comprehensive': CoreGranularityLevel.COMPREHENSIVE,
            'expert': CoreGranularityLevel.EXPERT
        }

        classification_mode = mode_map.get(mode, CoreClassificationMode.STANDARD)
        granularity_level = granularity_map.get(granularity, CoreGranularityLevel.DETAILED)

        try:
            self.classifier = CoreUnifiedClassifier(
                mode=classification_mode,
                granularity_level=granularity_level,
                enable_ml=False
            )
        except Exception as e:
            print(f"Warning: Could not initialize UnifiedFeatureClassifier: {e}")
            # Fall back to creating a simple classifier
            self.classifier = None

    def classify(self, name: str, content: str, feature_data: Dict[str, Any]) -> UnifiedClassificationResult:
        start_time = time.time()

        if self.classifier is None:
            # Fallback classification
            return self._fallback_classification(name, content, feature_data)

        # Use the unified classifier
        try:
            classification = self.classifier.classify_feature(name, content, feature_data)
        except Exception as e:
            print(f"Warning: UnifiedFeatureClassifier failed: {e}")
            return self._fallback_classification(name, content, feature_data)

        # Convert to unified result
        result = UnifiedClassificationResult(
            primary_category=classification.primary_category,
            confidence=classification.confidence,
            evidence=classification.evidence,
            secondary_categories=classification.secondary_categories,
            technology_domains=[d.domain for d in classification.domain_detections],
            skill_level=getattr(classification.skill_assessment, 'level', 'unknown'),
            target_roles=list(classification.role_relevance.keys()) if classification.role_relevance else [],
            use_case_scenarios=[classification.use_case_scenario] if classification.use_case_scenario else [],
            mode=ClassificationMode.LEGACY_UNIFIED,
            strategy_used="legacy_unified",
            legacy_unified_result=classification,
            processing_time_ms=(time.time() - start_time) * 1000
        )

        return result

    def get_supported_modes(self) -> List[ClassificationMode]:
        return [ClassificationMode.LEGACY_UNIFIED]

    def get_complexity_score(self) -> int:
        return 8  # Very high complexity

    def _fallback_classification(self, name: str, content: str, feature_data: Dict[str, Any]) -> UnifiedClassificationResult:
        """Fallback classification when unified classifier is not available"""
        content_lower = content.lower()

        # Simple keyword-based classification
        if any(word in content_lower for word in ['energy', 'power', 'sleep', 'saving']):
            category = 'energy_efficiency'
        elif any(word in content_lower for word in ['mimo', 'antenna', 'beamforming', 'spatial']):
            category = 'antenna_mimo'
        elif any(word in content_lower for word in ['handover', 'mobility', 'handoff']):
            category = 'mobility_management'
        elif any(word in content_lower for word in ['carrier', 'aggregation', 'ca']):
            category = 'carrier_aggregation'
        elif any(word in content_lower for word in ['voice', 'video', 'volte']):
            category = 'voice_video'
        elif any(word in content_lower for word in ['security', 'encryption', 'authentication']):
            category = 'security'
        elif any(word in content_lower for word in ['slicing', 'nssai', 'slice']):
            category = 'network_slicing'
        else:
            category = 'general'

        return UnifiedClassificationResult(
            primary_category=category,
            confidence=0.6,
            evidence=[f"Keyword-based: {category}"],
            mode=ClassificationMode.LEGACY_UNIFIED,
            strategy_used="fallback_unified"
        )


class UltraGranularStrategy(ClassificationStrategy):
    """Strategy using the UltraGranularClassifier"""

    def __init__(self):
        if not ULTRA_GRANULAR_AVAILABLE:
            raise ImportError("Ultra-granular classifier not available")
        self.classifier = UltraGranularClassifier()

    def classify(self, name: str, content: str, feature_data: Dict[str, Any]) -> UnifiedClassificationResult:
        start_time = time.time()

        # Use the ultra-granular classifier
        classification = self.classifier.classify_feature(feature_data)

        # Convert to unified result
        result = UnifiedClassificationResult(
            primary_category=classification.primary_domain.value,
            confidence=0.9,  # Ultra-granular typically has high confidence
            evidence=[f"Primary: {classification.primary_domain.value}"],
            secondary_categories=[(spec.value, 0.8) for spec in classification.secondary_specializations],
            technology_domains=[feature_data.get('technology_domain', 'unknown')],
            skill_level=classification.required_expertise_level.value,
            target_roles=[role.value for role in classification.target_roles],
            use_case_scenarios=[scenario.value for scenario in classification.applicable_scenarios],
            ultra_granular={
                'primary_domain': classification.primary_domain.value,
                'specializations': [spec.value for spec in classification.secondary_specializations],
                'expertise_level': classification.required_expertise_level.value,
                'roles': [role.value for role in classification.target_roles],
                'use_cases': [scenario.value for scenario in classification.applicable_scenarios],
                'complexity_metrics': getattr(classification, 'complexity_metrics', {})
            },
            mode=ClassificationMode.ULTRA_GRANULAR,
            strategy_used="ultra_granular",
            ultra_granular_result=classification,
            processing_time_ms=(time.time() - start_time) * 1000
        )

        return result

    def get_supported_modes(self) -> List[ClassificationMode]:
        return [ClassificationMode.ULTRA_GRANULAR]

    def get_complexity_score(self) -> int:
        return 10  # Maximum complexity


class HybridStrategy(ClassificationStrategy):
    """Hybrid strategy that combines multiple classification approaches"""

    def __init__(self):
        self.strategies = {
            'advanced': LegacyAdvancedStrategy(),
            'unified': LegacyUnifiedStrategy(),
        }

        if ULTRA_GRANULAR_AVAILABLE:
            self.strategies['ultra_granular'] = UltraGranularStrategy()

    def classify(self, name: str, content: str, feature_data: Dict[str, Any]) -> UnifiedClassificationResult:
        start_time = time.time()

        results = []

        # Run all available strategies
        for strategy_name, strategy in self.strategies.items():
            try:
                result = strategy.classify(name, content, feature_data)
                results.append((strategy_name, result))
            except Exception as e:
                # Log error but continue with other strategies
                print(f"Warning: Strategy {strategy_name} failed: {e}")
                continue

        # Combine results using weighted averaging
        if not results:
            # Fallback to basic classification
            return self._basic_fallback(name, content, feature_data)

        # Use the strategy with highest confidence as primary
        primary_strategy_name, primary_result = max(results, key=lambda x: x[1].confidence)

        # Combine secondary categories from all strategies
        all_secondary = defaultdict(list)
        for strategy_name, result in results:
            for category, score in result.secondary_categories:
                all_secondary[category].append(score)

        # Average scores for secondary categories
        combined_secondary = [(cat, sum(scores) / len(scores))
                             for cat, scores in all_secondary.items()]

        # Combine technology domains
        all_domains = set()
        for _, result in results:
            all_domains.update(result.technology_domains)

        # Create hybrid result
        result = UnifiedClassificationResult(
            primary_category=primary_result.primary_category,
            confidence=primary_result.confidence,
            evidence=primary_result.evidence,
            secondary_categories=combined_secondary,
            technology_domains=list(all_domains),
            skill_level=primary_result.skill_level,
            target_roles=primary_result.target_roles,
            use_case_scenarios=primary_result.use_case_scenarios,
            ultra_granular=primary_result.ultra_granular,
            mode=ClassificationMode.STRATEGY_HYBRID,
            strategy_used=f"hybrid_primary_{primary_strategy_name}",
            processing_time_ms=(time.time() - start_time) * 1000
        )

        return result

    def get_supported_modes(self) -> List[ClassificationMode]:
        return [ClassificationMode.STRATEGY_HYBRID]

    def get_complexity_score(self) -> int:
        return 9  # High complexity due to multiple strategies

    def _basic_fallback(self, name: str, content: str, feature_data: Dict[str, Any]) -> UnifiedClassificationResult:
        """Basic fallback classification when all strategies fail"""
        content_lower = content.lower()

        # Simple keyword-based classification
        if any(word in content_lower for word in ['energy', 'power', 'sleep']):
            category = 'energy_efficiency'
        elif any(word in content_lower for word in ['mimo', 'antenna', 'beam']):
            category = 'antenna_mimo'
        elif any(word in content_lower for word in ['handover', 'mobility']):
            category = 'mobility_management'
        elif any(word in content_lower for word in ['carrier', 'aggregation', 'ca']):
            category = 'carrier_aggregation'
        else:
            category = 'general'

        return UnifiedClassificationResult(
            primary_category=category,
            confidence=0.5,
            evidence=[f"Keyword-based: {category}"],
            mode=ClassificationMode.STRATEGY_HYBRID,
            strategy_used="fallback_basic"
        )


class AdaptiveStrategy(ClassificationStrategy):
    """Adaptive strategy that chooses the best approach based on feature complexity"""

    def __init__(self):
        self.strategies = {
            'simple': LegacyAdvancedStrategy(),
            'standard': LegacyUnifiedStrategy(),
        }

        if ULTRA_GRANULAR_AVAILABLE:
            self.strategies['complex'] = UltraGranularStrategy()

    def classify(self, name: str, content: str, feature_data: Dict[str, Any]) -> UnifiedClassificationResult:
        start_time = time.time()

        # Analyze feature complexity
        complexity_score = self._analyze_complexity(name, content, feature_data)

        # Choose strategy based on complexity
        if complexity_score < 3:
            strategy_name = 'simple'
        elif complexity_score < 7:
            strategy_name = 'standard'
        elif ULTRA_GRANULAR_AVAILABLE:
            strategy_name = 'complex'
        else:
            strategy_name = 'standard'

        strategy = self.strategies[strategy_name]
        result = strategy.classify(name, content, feature_data)

        # Update metadata
        result.mode = ClassificationMode.STRATEGY_ADAPTIVE
        result.strategy_used = f"adaptive_{strategy_name}_complexity_{complexity_score}"
        result.processing_time_ms = (time.time() - start_time) * 1000

        return result

    def get_supported_modes(self) -> List[ClassificationMode]:
        return [ClassificationMode.STRATEGY_ADAPTIVE]

    def get_complexity_score(self) -> int:
        return 6  # Medium complexity with intelligent selection

    def _analyze_complexity(self, name: str, content: str, feature_data: Dict[str, Any]) -> int:
        """Analyze feature complexity to choose appropriate strategy"""
        score = 0

        # Content length complexity
        if len(content) > 1000:
            score += 2
        elif len(content) > 500:
            score += 1

        # Parameter complexity
        if 'parameters' in feature_data:
            param_count = len(feature_data['parameters'])
            if param_count > 10:
                score += 2
            elif param_count > 5:
                score += 1

        # PM counter complexity
        if 'pm_counters' in feature_data:
            counter_count = len(feature_data['pm_counters'])
            if counter_count > 20:
                score += 2
            elif counter_count > 10:
                score += 1

        # Technical term complexity
        technical_terms = ['optimization', 'algorithm', 'machine learning', 'ai', 'prediction',
                          'dynamic', 'adaptive', 'coordination', 'synchronization']
        term_count = sum(1 for term in technical_terms if term in content.lower())
        score += min(term_count, 2)

        # Relationship complexity
        if any(key in feature_data for key in ['prerequisites', 'dependencies', 'conflicts']):
            score += 1

        return min(score, 10)


class UnifiedClassificationEngine:
    """
    Unified classification engine that consolidates all classification systems
    using the Strategy Pattern. This provides a single entry point for all
    classification needs while maintaining backward compatibility.
    """

    def __init__(self, default_mode: ClassificationMode = ClassificationMode.STRATEGY_ADAPTIVE):
        self.default_mode = default_mode
        self.strategies = self._initialize_strategies()

    def _initialize_strategies(self) -> Dict[ClassificationMode, ClassificationStrategy]:
        """Initialize all available strategies"""
        strategies = {}

        try:
            strategies[ClassificationMode.LEGACY_ADVANCED] = LegacyAdvancedStrategy()
        except Exception as e:
            print(f"Warning: Legacy advanced strategy not available: {e}")

        try:
            strategies[ClassificationMode.LEGACY_UNIFIED] = LegacyUnifiedStrategy()
        except Exception as e:
            print(f"Warning: Legacy unified strategy not available: {e}")

        if ULTRA_GRANULAR_AVAILABLE:
            try:
                strategies[ClassificationMode.ULTRA_GRANULAR] = UltraGranularStrategy()
            except Exception as e:
                print(f"Warning: Ultra-granular strategy not available: {e}")

        try:
            strategies[ClassificationMode.STRATEGY_HYBRID] = HybridStrategy()
        except Exception as e:
            print(f"Warning: Hybrid strategy not available: {e}")

        try:
            strategies[ClassificationMode.STRATEGY_ADAPTIVE] = AdaptiveStrategy()
        except Exception as e:
            print(f"Warning: Adaptive strategy not available: {e}")

        return strategies

    def classify_feature(self,
                        name: str,
                        content: str,
                        feature_data: Dict[str, Any],
                        mode: Optional[ClassificationMode] = None,
                        granularity: Optional[GranularityLevel] = None) -> UnifiedClassificationResult:
        """
        Classify a feature using the specified or default strategy.

        Args:
            name: Feature name
            content: Feature description/content
            feature_data: Additional feature data
            mode: Classification mode (uses default if None)
            granularity: Granularity level (optional)

        Returns:
            UnifiedClassificationResult: Classification result
        """
        if mode is None:
            mode = self.default_mode

        if mode not in self.strategies:
            available_modes = list(self.strategies.keys())
            raise ValueError(f"Mode {mode} not available. Available modes: {available_modes}")

        strategy = self.strategies[mode]
        result = strategy.classify(name, content, feature_data)

        # Apply granularity if specified
        if granularity:
            result = self._apply_granularity(result, granularity)

        return result

    def classify_batch(self,
                      features: List[Tuple[str, str, Dict[str, Any]]],
                      mode: Optional[ClassificationMode] = None) -> List[UnifiedClassificationResult]:
        """
        Classify multiple features in batch.

        Args:
            features: List of (name, content, feature_data) tuples
            mode: Classification mode

        Returns:
            List of classification results
        """
        results = []

        for name, content, feature_data in features:
            try:
                result = self.classify_feature(name, content, feature_data, mode)
                results.append(result)
            except Exception as e:
                # Create error result
                error_result = UnifiedClassificationResult(
                    primary_category="error",
                    confidence=0.0,
                    evidence=[f"Classification error: {str(e)}"],
                    mode=mode or self.default_mode,
                    strategy_used="error"
                )
                results.append(error_result)

        return results

    def get_available_modes(self) -> List[ClassificationMode]:
        """Get list of available classification modes"""
        return list(self.strategies.keys())

    def get_mode_complexity(self, mode: ClassificationMode) -> int:
        """Get complexity score for a mode"""
        if mode in self.strategies:
            return self.strategies[mode].get_complexity_score()
        return 0

    def _apply_granularity(self, result: UnifiedClassificationResult, granularity: GranularityLevel) -> UnifiedClassificationResult:
        """Apply granularity level to classification result"""
        result.granularity = granularity

        if granularity == GranularityLevel.MINIMAL:
            # Keep only primary category
            result.secondary_categories = []
            result.technology_domains = []
            result.evidence = []

        elif granularity == GranularityLevel.BASIC:
            # Keep primary and top 3 secondary categories
            result.secondary_categories = result.secondary_categories[:3]
            result.technology_domains = result.technology_domains[:3]

        elif granularity == GranularityLevel.STANDARD:
            # Standard level - keep most data
            result.secondary_categories = result.secondary_categories[:5]

        # Higher levels keep all data

        return result


# Convenience function for backward compatibility
def create_classifier(mode: str = "adaptive", **kwargs) -> UnifiedClassificationEngine:
    """
    Create a classifier instance for backward compatibility.

    Args:
        mode: Classification mode string
        **kwargs: Additional arguments

    Returns:
        UnifiedClassificationEngine instance
    """
    mode_map = {
        'legacy_advanced': ClassificationMode.LEGACY_ADVANCED,
        'legacy_unified': ClassificationMode.LEGACY_UNIFIED,
        'ultra_granular': ClassificationMode.ULTRA_GRANULAR,
        'hybrid': ClassificationMode.STRATEGY_HYBRID,
        'adaptive': ClassificationMode.STRATEGY_ADAPTIVE,
    }

    classification_mode = mode_map.get(mode, ClassificationMode.STRATEGY_ADAPTIVE)

    return UnifiedClassificationEngine(default_mode=classification_mode)


# Main classifier instance for immediate use
unified_classifier = UnifiedClassificationEngine()