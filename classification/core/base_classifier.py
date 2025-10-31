"""
Unified Feature Classification Engine

This module implements the UnifiedFeatureClassifier class that provides
configurable classification granularity for Ericsson RAN features, supporting
both basic categorization and ultra-granular expert analysis.

The classifier bridges the gap between the existing AdvancedFeatureClassifier
and UltraGranularClassifier, providing a single unified interface with
configurable analysis depth.
"""

import re
from typing import Dict, List, Tuple, Optional, Union, Any
from collections import defaultdict
from enum import Enum
from dataclasses import dataclass

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

from .technology_detector import TechnologyDomainDetector
from .skill_assessor import SkillLevelAssessor

# Import ultra-granular components for advanced mode
try:
    from ..advanced.ultra_granular_classifier import (
        UltraGranularClassifier,
        PrimaryDomain as UltraPrimaryDomain,
        SecondarySpecialization,
        ExpertiseLevel,
        RANExpertRole,
        UseCaseScenario as UltraUseCaseScenario,
        FeatureComplexityMetrics,
        UltraGranularClassification
    )
    ULTRA_GRANULAR_AVAILABLE = True
except ImportError:
    ULTRA_GRANULAR_AVAILABLE = False


class ClassificationMode(Enum):
    """Classification granularity modes"""
    BASIC = "basic"                     # 8 categories, lightweight
    STANDARD = "standard"               # Enhanced basic with context
    ULTRA_GRANULAR = "ultra_granular"   # 35+ specializations, expert analysis
    HYBRID = "hybrid"                   # Basic + ultra-granular results


class GranularityLevel(Enum):
    """Granularity levels for classification"""
    MINIMAL = 1      # Basic categories only
    STANDARD = 2     # Enhanced classification with context
    DETAILED = 3     # Multiple secondary classifications
    COMPREHENSIVE = 4 # Full analysis with role mapping
    EXPERT = 5       # Ultra-granular expert analysis


@dataclass
class UnifiedClassification:
    """Unified classification result supporting multiple granularity levels"""

    # Basic Classification
    primary_category: str
    primary_score: float
    confidence: float
    evidence: List[str]

    # Enhanced Classification
    secondary_categories: List[Tuple[str, float]] = None
    domain_detections: List[DomainDetection] = None
    skill_assessment: Any = None
    use_case_scenario: str = None
    role_relevance: Dict[str, float] = None

    # Ultra-granular Classification (if available)
    ultra_granular_result: UltraGranularClassification = None

    # Metadata
    classification_mode: ClassificationMode = ClassificationMode.BASIC
    granularity_level: GranularityLevel = GranularityLevel.MINIMAL
    processing_time_ms: float = 0.0

    def __post_init__(self):
        """Initialize default values"""
        if self.secondary_categories is None:
            self.secondary_categories = []
        if self.domain_detections is None:
            self.domain_detections = []
        if self.role_relevance is None:
            self.role_relevance = {}


class UnifiedFeatureClassifier:
    """
    Unified feature classification engine with configurable granularity.

    This classifier provides a single interface for both basic and ultra-granular
    classification, supporting different use cases from simple categorization
    to expert-level analysis.

    Features:
    - Configurable classification granularity (basic ↔ ultra-granular)
    - Backward compatibility with existing classifiers
    - Performance-optimized for different use cases
    - Optional ML components for advanced analysis
    - Context-aware classification
    """

    def __init__(self,
                 mode: ClassificationMode = ClassificationMode.STANDARD,
                 granularity_level: GranularityLevel = GranularityLevel.STANDARD,
                 enable_ml: bool = False):
        """
        Initialize the unified feature classifier.

        Args:
            mode: Classification mode (basic, standard, ultra_granular, hybrid)
            granularity_level: Granularity level (1-5, minimal to expert)
            enable_ml: Enable ML-based enhancements (requires sklearn)
        """
        self.mode = mode
        self.granularity_level = granularity_level
        self.enable_ml = enable_ml

        # Initialize core components
        self.technology_detector = TechnologyDomainDetector()
        self.skill_assessor = SkillLevelAssessor()

        # Initialize ultra-granular classifier if needed and available
        self.ultra_classifier = None
        if mode in [ClassificationMode.ULTRA_GRANULAR, ClassificationMode.HYBRID]:
            if ULTRA_GRANULAR_AVAILABLE:
                self.ultra_classifier = UltraGranularClassifier()
            else:
                print("Warning: Ultra-granular components not available, falling back to standard mode")
                self.mode = ClassificationMode.STANDARD

        # Initialize semantic patterns for basic classification
        self._init_semantic_patterns()
        self._init_classification_weights()

    def _init_semantic_patterns(self):
        """Initialize semantic patterns for classification"""
        self.semantic_keywords = {
            'mimo': ['mimo', 'beamforming', 'antenna', 'diversity', 'spatial', 'layer', 'tm8', 'tm3'],
            'energy': ['energy', 'power', 'sleep', 'saving', 'efficiency', 'pa', 'reduction', 'consumption'],
            'mobility': ['handover', 'mobility', 'handoff', 'cell', 'handoff', 'ping-pong', 'hopping'],
            'capacity': ['capacity', 'load', 'balancing', 'congestion', 'expansion', 'scaling', 'dimensioning'],
            'coverage': ['coverage', 'range', 'signal', 'quality', 'extension', 'enhancement'],
            'voice': ['voice', 'volte', 'vinr', 'audio', 'codec', 'tti', 'bundling'],
            'security': ['security', 'encryption', 'authentication', 'privacy', 'protection'],
            'automation': ['automation', 'script', 'self', 'organizing', 'zero-touch', 'auto'],
            'slicing': ['slicing', 'nssai', 'network', 'slice', 'isolation']
        }

        self.category_patterns = {
            PrimaryCategory.ENERGY_EFFICIENCY: [
                r'energy', r'power', r'sleep', r'saving', r'efficiency', r'consumption',
                r'pa.*reduction', r'deep.*sleep', r'micro.*sleep'
            ],
            PrimaryCategory.MOBILITY_MANAGEMENT: [
                r'mobility', r'handover', r'handoff', r'cell.*change', r'ping.*pong',
                r'hopping', r'release', r'inactive', r'load.*management'
            ],
            PrimaryCategory.ANTENNA_MIMO: [
                r'mimo', r'beamforming', r'antenna', r'tm[0-9]', r'diversity',
                r'spatial', r'layer', r'tx', r'rx', r'array'
            ],
            PrimaryCategory.CARRIER_AGGREGATION: [
                r'carrier.*aggregation', r'ca', r'cc', r'component.*carrier',
                r'inter.*frequency', r'intra.*frequency', r'aggregation'
            ],
            PrimaryCategory.VOICE_VIDEO: [
                r'voice', r'volte', r'vinr', r'video', r'mbms', r'broadcast',
                r'tti.*bundling', r'frequency.*hopping', r'audio'
            ],
            PrimaryCategory.SECURITY: [
                r'security', r'encryption', r'authentication', r'privacy',
                r'protection', r'integrity', r'access.*control'
            ],
            PrimaryCategory.NETWORK_SLICING: [
                r'slicing', r'nssai', r's.*nssai', r'network.*slice',
                r'isolation', r'ransharing', r'multi.*operator'
            ]
        }

    def _init_classification_weights(self):
        """Initialize classification weights based on granularity level"""
        weight_configs = {
            GranularityLevel.MINIMAL: {
                'name_analysis': 0.6,
                'content_themes': 0.3,
                'parameter_types': 0.1,
                'counter_domains': 0.0,
                'network_impact': 0.0
            },
            GranularityLevel.STANDARD: {
                'name_analysis': 0.4,
                'content_themes': 0.3,
                'parameter_types': 0.2,
                'counter_domains': 0.1,
                'network_impact': 0.0
            },
            GranularityLevel.DETAILED: {
                'name_analysis': 0.3,
                'content_themes': 0.25,
                'parameter_types': 0.2,
                'counter_domains': 0.15,
                'network_impact': 0.1
            },
            GranularityLevel.COMPREHENSIVE: {
                'name_analysis': 0.3,
                'content_themes': 0.25,
                'parameter_types': 0.2,
                'counter_domains': 0.15,
                'network_impact': 0.1
            },
            GranularityLevel.EXPERT: {
                'name_analysis': 0.25,
                'content_themes': 0.25,
                'parameter_types': 0.2,
                'counter_domains': 0.15,
                'network_impact': 0.15
            }
        }

        self.classification_weights = weight_configs.get(
            self.granularity_level,
            weight_configs[GranularityLevel.STANDARD]
        )

    def classify_feature(self, feature: EnhancedEricssonFeature) -> UnifiedClassification:
        """
        Classify a feature using the configured classification mode.

        Args:
            feature: EnhancedEricssonFeature to classify

        Returns:
            UnifiedClassification with results appropriate to the configured mode
        """
        import time
        start_time = time.time()

        # Route to appropriate classification method
        if self.mode == ClassificationMode.ULTRA_GRANULAR and self.ultra_classifier:
            result = self._classify_ultra_granular(feature)
        elif self.mode == ClassificationMode.HYBRID:
            result = self._classify_hybrid(feature)
        else:
            result = self._classify_basic_enhanced(feature)

        # Calculate processing time
        result.processing_time_ms = (time.time() - start_time) * 1000
        result.classification_mode = self.mode
        result.granularity_level = self.granularity_level

        return result

    def _classify_basic_enhanced(self, feature: EnhancedEricssonFeature) -> UnifiedClassification:
        """Enhanced basic classification with configurable granularity"""

        # Perform basic classification analyses
        analyses = []

        # 1. Name analysis (always included)
        name_analysis = self._analyze_feature_name(feature.name, feature.description)
        analyses.append((name_analysis, self.classification_weights['name_analysis']))

        # 2. Content theme analysis (standard and above)
        if self.granularity_level.value >= 2:
            content_analysis = self._analyze_content_themes(feature)
            analyses.append((content_analysis, self.classification_weights['content_themes']))

        # 3. Parameter type analysis (detailed and above)
        if self.granularity_level.value >= 3:
            param_analysis = self._analyze_parameter_types(feature.configuration.mo_classes)
            analyses.append((param_analysis, self.classification_weights['parameter_types']))

        # 4. Counter domain analysis (comprehensive and above)
        if self.granularity_level.value >= 4:
            counter_analysis = self._analyze_counter_domains(feature.performance_monitoring.pm_counters)
            analyses.append((counter_analysis, self.classification_weights['counter_domains']))

        # 5. Network impact analysis (expert level)
        if self.granularity_level.value >= 5:
            impact_analysis = self._analyze_network_impact(feature)
            analyses.append((impact_analysis, self.classification_weights['network_impact']))

        # Calculate weighted scores
        scores = self._calculate_weighted_scores(analyses)

        # Determine primary classification
        if scores:
            primary_category, primary_score = max(scores.items(), key=lambda x: x[1])
            evidence = self._get_category_evidence(primary_category, feature)
        else:
            primary_category = PrimaryCategory.GENERAL.value
            primary_score = 0.5
            evidence = ["No specific patterns detected"]

        # Get secondary classifications
        secondary_categories = sorted(
            [(cat, score) for cat, score in scores.items() if cat != primary_category],
            key=lambda x: x[1], reverse=True
        )[:3]  # Top 3 secondary categories

        # Enhanced components for higher granularity levels
        domain_detections = []
        skill_assessment = None
        role_relevance = {}
        use_case_scenario = None

        if self.granularity_level.value >= 3:
            domain_detections = self.technology_detector.detect_domains(feature)

        if self.granularity_level.value >= 4:
            skill_assessment = self.skill_assessor.assess_skill_level(feature)
            role_relevance = self._calculate_role_relevance(feature)
            use_case_scenario = self._classify_use_case(feature)

        return UnifiedClassification(
            primary_category=primary_category,
            primary_score=primary_score,
            confidence=min(primary_score + 0.1, 1.0),
            evidence=evidence,
            secondary_categories=secondary_categories,
            domain_detections=domain_detections,
            skill_assessment=skill_assessment,
            use_case_scenario=use_case_scenario,
            role_relevance=role_relevance
        )

    def _classify_ultra_granular(self, feature: EnhancedEricssonFeature) -> UnifiedClassification:
        """Ultra-granular classification using the advanced classifier"""

        if not self.ultra_classifier:
            # Fallback to enhanced classification
            return self._classify_basic_enhanced(feature)

        # Convert feature to dict format expected by ultra-granular classifier
        feature_dict = self._convert_feature_to_dict(feature)

        # Get ultra-granular classification
        ultra_result = self.ultra_classifier.classify_feature(feature_dict)

        # Convert to unified format
        primary_category = ultra_result.primary_domain.value
        primary_score = 0.8  # High confidence for ultra-granular classification
        evidence = [f"Ultra-granular domain: {ultra_result.primary_domain.value}"]

        # Map secondary specializations to categories
        secondary_categories = [
            (spec.value, 0.7) for spec in ultra_result.secondary_specializations[:5]
        ]

        # Convert domain detections
        domain_detections = [
            DomainDetection(
                domain=domain.value,
                relevance=0.8,
                evidence=[f"Ultra-granular analysis"]
            ) for domain in [ultra_result.primary_domain]
        ]

        # Map expertise level
        role_relevance = {
            role.value: 0.8 for role in ultra_result.target_roles
        }

        return UnifiedClassification(
            primary_category=primary_category,
            primary_score=primary_score,
            confidence=0.9,
            evidence=evidence,
            secondary_categories=secondary_categories,
            domain_detections=domain_detections,
            role_relevance=role_relevance,
            ultra_granular_result=ultra_result
        )

    def _classify_hybrid(self, feature: EnhancedEricssonFeature) -> UnifiedClassification:
        """Hybrid classification combining basic and ultra-granular results"""

        # Get enhanced basic classification
        basic_result = self._classify_basic_enhanced(feature)

        # Get ultra-granular classification if available
        ultra_result = None
        if self.ultra_classifier:
            feature_dict = self._convert_feature_to_dict(feature)
            ultra_result = self.ultra_classifier.classify_feature(feature_dict)

        # Combine results - prioritize ultra-granular but keep basic as fallback
        if ultra_result:
            basic_result.ultra_granular_result = ultra_result
            # Enhance basic results with ultra-granular insights
            basic_result.evidence.extend([
                f"Ultra-granular domain: {ultra_result.primary_domain.value}",
                f"Expertise level: {ultra_result.required_expertise_level.value}"
            ])
            basic_result.confidence = min(basic_result.confidence + 0.1, 1.0)

        return basic_result

    def _convert_feature_to_dict(self, feature: EnhancedEricssonFeature) -> Dict[str, Any]:
        """Convert EnhancedEricssonFeature to dict format for ultra-granular classifier"""
        return {
            'name': feature.name,
            'description': feature.description,
            'summary': feature.description[:200] + "..." if len(feature.description) > 200 else feature.description,
            'parameters': feature.configuration.mo_classes,
            'counters': feature.performance_monitoring.pm_counters,
            'events': feature.performance_monitoring.trace_events,
            'dependencies': {
                'prerequisites': feature.prerequisites,
                'conflicts': feature.conflicting_features,
                'related': feature.related_features
            },
            'automation_capabilities': [feature.automation.script_ready, feature.automation.self_organizing]
        }

    def _analyze_feature_name(self, name: str, description: str = "") -> Dict[str, float]:
        """Analyze feature name and description for semantic patterns"""
        text = f"{name} {description}".lower()
        detected_themes = []

        for theme, keywords in self.semantic_keywords.items():
            relevance_score = sum(1 for kw in keywords if kw in text)
            if relevance_score > 0:
                confidence = min(relevance_score / len(keywords), 1.0)
                detected_themes.append((theme, relevance_score, confidence))

        # Convert to category scores
        category_scores = defaultdict(float)
        for theme, relevance, confidence in detected_themes:
            category = self._map_theme_to_category(theme)
            if category:
                category_scores[category.value] += relevance * confidence

        return dict(category_scores)

    def _analyze_content_themes(self, feature: EnhancedEricssonFeature) -> Dict[str, float]:
        """Analyze content themes from feature metadata"""
        scores = defaultdict(float)

        # Analyze automation capabilities
        if feature.automation.script_ready:
            scores[PrimaryCategory.GENERAL.value] += 0.3
        if feature.automation.self_organizing:
            scores[PrimaryCategory.GENERAL.value] += 0.2

        # Analyze performance monitoring
        if feature.has_performance_monitoring():
            scores[PrimaryCategory.GENERAL.value] += 0.2

        # Analyze configuration complexity
        if feature.configuration.parameter_count > 10:
            scores[PrimaryCategory.GENERAL.value] += 0.1

        return dict(scores)

    def _analyze_parameter_types(self, mo_classes: List[str]) -> Dict[str, float]:
        """Analyze parameter types and MO classes"""
        scores = defaultdict(float)
        mo_text = ' '.join(mo_classes).lower()

        # Check for specific MO class patterns
        if 'eutrancell' in mo_text:
            scores[PrimaryCategory.MOBILITY_MANAGEMENT.value] += 0.3
        if 'nrcell' in mo_text:
            scores[PrimaryCategory.MOBILITY_MANAGEMENT.value] += 0.3
        if 'energy' in mo_text or 'power' in mo_text:
            scores[PrimaryCategory.ENERGY_EFFICIENCY.value] += 0.4
        if 'antenna' in mo_text or 'mimo' in mo_text:
            scores[PrimaryCategory.ANTENNA_MIMO.value] += 0.4

        return dict(scores)

    def _analyze_counter_domains(self, pm_counters: List[str]) -> Dict[str, float]:
        """Analyze performance counter domains"""
        scores = defaultdict(float)
        counter_text = ' '.join(pm_counters).lower()

        # Voice/video counters
        if 'voip' in counter_text or 'voice' in counter_text:
            scores[PrimaryCategory.VOICE_VIDEO.value] += 0.4
        if 'video' in counter_text:
            scores[PrimaryCategory.VOICE_VIDEO.value] += 0.3

        # Mobility counters
        if 'handover' in counter_text or 'mobility' in counter_text:
            scores[PrimaryCategory.MOBILITY_MANAGEMENT.value] += 0.3

        # Energy counters
        if 'energy' in counter_text or 'power' in counter_text:
            scores[PrimaryCategory.ENERGY_EFFICIENCY.value] += 0.4

        return dict(scores)

    def _analyze_network_impact(self, feature: EnhancedEricssonFeature) -> Dict[str, float]:
        """Analyze network impact and operational significance"""
        scores = defaultdict(float)

        # High complexity features have broader impact
        if feature.feature_complexity > 8.0:
            scores[PrimaryCategory.GENERAL.value] += 0.2

        # Features with many prerequisites have broad impact
        if len(feature.prerequisites) > 3:
            scores[PrimaryCategory.GENERAL.value] += 0.2

        # Features affecting multiple network elements
        if len(feature.network_element_types) > 2:
            scores[PrimaryCategory.GENERAL.value] += 0.1

        return dict(scores)

    def _calculate_weighted_scores(self, weighted_analyses: List[Tuple[Dict[str, float], float]]) -> Dict[str, float]:
        """Calculate weighted scores from multiple analyses"""
        combined_scores = defaultdict(float)

        for analysis, weight in weighted_analyses:
            for category, score in analysis.items():
                combined_scores[category] += score * weight

        return dict(combined_scores)

    def _map_theme_to_category(self, theme: str) -> Optional[PrimaryCategory]:
        """Map semantic theme to primary category"""
        theme_to_category = {
            'mimo': PrimaryCategory.ANTENNA_MIMO,
            'energy': PrimaryCategory.ENERGY_EFFICIENCY,
            'mobility': PrimaryCategory.MOBILITY_MANAGEMENT,
            'capacity': PrimaryCategory.MOBILITY_MANAGEMENT,
            'voice': PrimaryCategory.VOICE_VIDEO,
            'security': PrimaryCategory.SECURITY,
            'slicing': PrimaryCategory.NETWORK_SLICING,
            'automation': PrimaryCategory.GENERAL
        }
        return theme_to_category.get(theme)

    def _get_category_evidence(self, category: str, feature: EnhancedEricssonFeature) -> List[str]:
        """Get evidence for category classification"""
        evidence = []

        # Name evidence
        if any(pattern.lower() in feature.name.lower()
               for pattern in self.semantic_keywords.get(category.lower(), [])):
            evidence.append(f"Name contains '{category}' keywords")

        # Description evidence
        if feature.description and category.lower() in feature.description.lower():
            evidence.append(f"Description mentions '{category}'")

        return evidence

    def _classify_use_case(self, feature: EnhancedEricssonFeature) -> str:
        """Classify use case scenario"""
        text = f"{feature.name} {feature.description}".lower()

        use_case_patterns = {
            UseCaseScenario.PLANNING: [r'planning', r'dimensioning', r'design', r'architecture'],
            UseCaseScenario.DEPLOYMENT: [r'deployment', r'installation', r'commissioning', r'setup'],
            UseCaseScenario.OPTIMIZATION: [r'optimization', r'tuning', r'enhancement', r'improvement'],
            UseCaseScenario.MAINTENANCE: [r'maintenance', r'service', r'lifecycle', r'update'],
            UseCaseScenario.TROUBLESHOOTING: [r'troubleshooting', r'fault', r'alarm', r'investigation'],
            UseCaseScenario.UPGRADE: [r'upgrade', r'migration', r'evolution', r'transition'],
            UseCaseScenario.CAPACITY_EXPANSION: [r'expansion', r'scaling', r'capacity.*increase']
        }

        for scenario, patterns in use_case_patterns.items():
            for pattern in patterns:
                if re.search(pattern, text, re.IGNORECASE):
                    return scenario.value

        return UseCaseScenario.OPTIMIZATION.value  # Default

    def _calculate_role_relevance(self, feature: EnhancedEricssonFeature) -> Dict[str, float]:
        """Calculate relevance scores for each user role"""
        text = f"{feature.name} {feature.description} {' '.join(feature.configuration.mo_classes)}"
        text = text.lower()

        role_keywords = {
            UserRole.NETWORK_PLANNER: ['planning', 'dimensioning', 'capacity', 'coverage', 'site'],
            UserRole.FIELD_ENGINEER: ['installation', 'commissioning', 'calibration', 'maintenance'],
            UserRole.PERFORMANCE_SPECIALIST: ['optimization', 'performance', 'kpi', 'tuning'],
            UserRole.CONFIGURATION_MANAGER: ['configuration', 'parameter', 'feature.*activation'],
            UserRole.TROUBLESHOOTING_EXPERT: ['troubleshooting', 'fault', 'alarm', 'diagnosis'],
            UserRole.AUTOMATION_ENGINEER: ['automation', 'script', 'zero.*touch'],
            UserRole.ARCHITECT: ['architecture', 'design', 'strategy', 'integration'],
            UserRole.EMERGENCY_SPECIALIST: ['emergency', 'disaster', 'resilience', 'recovery']
        }

        role_scores = {}
        for role, keywords in role_keywords.items():
            relevance = sum(1 for kw in keywords if kw in text)
            role_scores[role.value] = min(relevance / len(keywords), 1.0)

        return role_scores

    def batch_classify(self, features: List[EnhancedEricssonFeature]) -> List[UnifiedClassification]:
        """Classify multiple features in batch"""
        return [self.classify_feature(feature) for feature in features]

    def get_classification_summary(self, classification: UnifiedClassification) -> str:
        """Get human-readable classification summary"""
        summary_parts = [f"Primary: {classification.primary_category}"]

        if classification.secondary_categories:
            secondary = ", ".join([cat for cat, _ in classification.secondary_categories[:2]])
            summary_parts.append(f"Secondary: {secondary}")

        if classification.skill_assessment:
            summary_parts.append(f"Skill: {classification.skill_assessment.level}")

        if classification.ultra_granular_result:
            summary_parts.append(f"Ultra-granular: {classification.ultra_granular_result.primary_domain.value}")

        return " | ".join(summary_parts)

    def set_granularity_level(self, level: GranularityLevel):
        """Update classification granularity level"""
        self.granularity_level = level
        self._init_classification_weights()

    def set_classification_mode(self, mode: ClassificationMode):
        """Update classification mode"""
        self.mode = mode

        # Initialize ultra-granular classifier if needed
        if mode in [ClassificationMode.ULTRA_GRANULAR, ClassificationMode.HYBRID]:
            if ULTRA_GRANULAR_AVAILABLE and not self.ultra_classifier:
                self.ultra_classifier = UltraGranularClassifier()
            elif not ULTRA_GRANULAR_AVAILABLE:
                print("Warning: Ultra-granular components not available, falling back to standard mode")
                self.mode = ClassificationMode.STANDARD