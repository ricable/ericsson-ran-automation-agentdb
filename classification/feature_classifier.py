"""
Advanced Feature Classification Engine

This module implements the AdvancedFeatureClassifier class for sophisticated
multi-dimensional classification of Ericsson RAN features.
"""

import re
from typing import Dict, List, Tuple, Optional
from collections import defaultdict

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


class AdvancedFeatureClassifier:
    """
    Advanced multi-dimensional classification engine for Ericsson RAN features.

    Implements sophisticated classification algorithms with:
    - Semantic name analysis (30% weight)
    - Content theme analysis (25% weight)
    - Parameter type analysis (20% weight)
    - Counter domain analysis (15% weight)
    - Network impact analysis (10% weight)
    """

    def __init__(self):
        self.technology_detector = TechnologyDomainDetector()
        self.skill_assessor = SkillLevelAssessor()
        self._init_semantic_keywords()
        self._init_category_patterns()
        self._init_role_mappings()
        self._init_use_case_patterns()

    def _init_semantic_keywords(self):
        """Initialize semantic keyword mappings"""
        self.semantic_keywords = {
            'mimo': ['mimo', 'beamforming', 'antenna', 'diversity', 'spatial', 'layer', 'tm8', 'tm3'],
            'energy': ['energy', 'power', 'sleep', 'saving', 'efficiency', 'pa', 'reduction', 'consumption'],
            'mobility': ['handover', 'mobility', 'handoff', 'cell', 'handoff', 'ping-pong', 'hopping'],
            'capacity': ['capacity', 'load', 'balancing', 'congestion', 'expansion', 'scaling', 'dimensioning'],
            'coverage': ['coverage', 'range', 'signal', 'quality', 'extension', 'enhancement'],
            'hardware': ['radio', 'unit', 'firmware', 'calibration', 'equipment', 'installation'],
            'voice': ['voice', 'volte', 'vinr', 'audio', 'codec', 'tti', 'bundling'],
            'video': ['video', 'mbms', 'broadcast', 'streaming', 'multimedia'],
            'security': ['security', 'encryption', 'authentication', 'privacy', 'protection'],
            'automation': ['automation', 'script', 'self', 'organizing', 'zero-touch', 'auto'],
            'slicing': ['slicing', 'nssai', 'network', 'slice', 'isolation'],
            'optimization': ['optimization', 'tuning', 'enhancement', 'improvement', 'boost']
        }

    def _init_category_patterns(self):
        """Initialize category patterns for classification"""
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

    def _init_role_mappings(self):
        """Initialize user role mappings"""
        self.role_keywords = {
            UserRole.NETWORK_PLANNER: [
                'planning', 'dimensioning', 'capacity', 'coverage', 'site',
                'rollout', 'deployment', 'expansion', 'architecture'
            ],
            UserRole.FIELD_ENGINEER: [
                'installation', 'commissioning', 'calibration', 'maintenance',
                'hardware', 'equipment', 'radio', 'site', 'field'
            ],
            UserRole.PERFORMANCE_SPECIALIST: [
                'optimization', 'performance', 'kpi', 'tuning', 'quality',
                'throughput', 'latency', 'improvement'
            ],
            UserRole.CONFIGURATION_MANAGER: [
                'configuration', 'parameter', 'feature.*activation', 'management',
                'deployment', 'backup', 'recovery', 'audit'
            ],
            UserRole.TROUBLESHOOTING_EXPERT: [
                'troubleshooting', 'fault', 'alarm', 'diagnosis', 'recovery',
                'resolution', 'investigation', 'problem'
            ],
            UserRole.AUTOMATION_ENGINEER: [
                'automation', 'script', 'zero.*touch', 'self.*organizing',
                'workflow', 'process', 'orchestration'
            ],
            UserRole.ARCHITECT: [
                'architecture', 'design', 'strategy', 'integration',
                'technology', 'migration', 'selection'
            ],
            UserRole.EMERGENCY_SPECIALIST: [
                'emergency', 'disaster', 'resilience', 'recovery',
                'critical', 'priority', 'warning', 'pws'
            ]
        }

    def _init_use_case_patterns(self):
        """Initialize use case scenario patterns"""
        self.use_case_patterns = {
            UseCaseScenario.PLANNING: [
                r'planning', r'dimensioning', r'design', r'architecture',
                r'capacity.*planning', r'coverage.*planning'
            ],
            UseCaseScenario.DEPLOYMENT: [
                r'deployment', r'installation', r'commissioning', r'setup',
                r'implementation', r'rollout'
            ],
            UseCaseScenario.OPTIMIZATION: [
                r'optimization', r'tuning', r'enhancement', r'improvement',
                r'performance.*optimization'
            ],
            UseCaseScenario.MAINTENANCE: [
                r'maintenance', r'service', r'lifecycle', r'update',
                r'preventive', r'routine'
            ],
            UseCaseScenario.TROUBLESHOOTING: [
                r'troubleshooting', r'fault', r'alarm', r'investigation',
                r'problem.*solving', r'recovery'
            ],
            UseCaseScenario.UPGRADE: [
                r'upgrade', r'migration', r'evolution', r'transition',
                r'technology.*upgrade'
            ],
            UseCaseScenario.CAPACITY_EXPANSION: [
                r'expansion', r'scaling', r'capacity.*increase',
                r'load.*balancing', r'congestion.*relief'
            ]
        }

    def classify_feature(self, feature: EnhancedEricssonFeature) -> EnhancedClassification:
        """
        Classify a feature using multi-dimensional analysis.

        Args:
            feature: EnhancedEricssonFeature to classify

        Returns:
            EnhancedClassification with detailed classification results
        """
        # 1. Semantic Name Analysis (30% weight)
        name_analysis = self.analyze_feature_name(feature.name, feature.description)

        # 2. Content Theme Analysis (25% weight)
        content_analysis = self.analyze_content_themes(feature)

        # 3. Parameter Type Analysis (20% weight)
        param_analysis = self.analyze_parameter_types(feature.configuration.mo_classes)

        # 4. Counter Domain Analysis (15% weight)
        counter_analysis = self.analyze_counter_domains(feature.performance_monitoring.pm_counters)

        # 5. Network Impact Analysis (10% weight)
        impact_analysis = self.analyze_network_impact(feature)

        # Calculate weighted scores
        scores = self.calculate_weighted_scores([
            (name_analysis, 0.30),
            (content_analysis, 0.25),
            (param_analysis, 0.20),
            (counter_analysis, 0.15),
            (impact_analysis, 0.10)
        ])

        # Generate classification
        primary_classification = max(scores.items(), key=lambda x: x[1])
        primary_score = ClassificationScore(
            category=primary_classification[0],
            score=primary_classification[1],
            confidence=min(primary_classification[1] * 1.2, 1.0),  # Boost confidence slightly
            evidence=self._get_category_evidence(primary_classification[0], feature)
        )

        # Generate secondary classifications
        secondary_classifications = [
            ClassificationScore(
                category=category,
                score=score,
                confidence=min(score * 1.1, 1.0),
                evidence=self._get_category_evidence(category, feature)
            )
            for category, score in sorted(scores.items(), key=lambda x: x[1], reverse=True)[1:4]
        ]

        # Detect technology domains
        domain_detections = self.technology_detector.detect_domains(feature)

        # Assess skill level
        skill_assessment = self.skill_assessor.assess_skill_level(feature)

        # Classify use case scenario
        use_case_classification = self.classify_use_case(feature)

        # Calculate role relevance
        role_relevance = self.calculate_role_relevance(feature)

        # Calculate overall confidence
        classification_confidence = min(primary_score.score + 0.1, 1.0)

        return EnhancedClassification(
            feature_id=feature.id,
            primary_classification=primary_score,
            secondary_classifications=secondary_classifications,
            domain_detections=domain_detections,
            skill_assessment=skill_assessment,
            use_case_classification=use_case_classification,
            role_relevance=role_relevance,
            classification_confidence=classification_confidence
        )

    def analyze_feature_name(self, name: str, description: str = "") -> Dict[str, float]:
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

    def analyze_content_themes(self, feature: EnhancedEricssonFeature) -> Dict[str, float]:
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

        # Analyze troubleshooting procedures
        if feature.troubleshooting.steps_count > 0:
            scores[PrimaryCategory.GENERAL.value] += 0.1

        # Analyze feature dependencies
        total_dependencies = (len(feature.prerequisites) +
                            len(feature.conflicting_features) +
                            len(feature.related_features))
        if total_dependencies > 5:
            scores[PrimaryCategory.GENERAL.value] += 0.1

        return dict(scores)

    def analyze_parameter_types(self, mo_classes: List[str]) -> Dict[str, float]:
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

    def analyze_counter_domains(self, pm_counters: List[str]) -> Dict[str, float]:
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
        if 'release' in counter_text:
            scores[PrimaryCategory.MOBILITY_MANAGEMENT.value] += 0.2

        # Throughput counters
        if 'throughput' in counter_text or 'vol' in counter_text:
            scores[PrimaryCategory.MOBILITY_MANAGEMENT.value] += 0.2

        # Energy counters
        if 'energy' in counter_text or 'power' in counter_text:
            scores[PrimaryCategory.ENERGY_EFFICIENCY.value] += 0.4

        return dict(scores)

    def analyze_network_impact(self, feature: EnhancedEricssonFeature) -> Dict[str, float]:
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

        # License-controlled features typically have significant impact
        if feature.licensing and 'license' in feature.licensing.lower():
            scores[PrimaryCategory.GENERAL.value] += 0.1

        return dict(scores)

    def calculate_weighted_scores(self, weighted_analyses: List[Tuple[Dict[str, float], float]]) -> Dict[str, float]:
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
            'video': PrimaryCategory.VOICE_VIDEO,
            'security': PrimaryCategory.SECURITY,
            'slicing': PrimaryCategory.NETWORK_SLICING,
            'automation': PrimaryCategory.GENERAL,
            'optimization': PrimaryCategory.GENERAL
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

        # Parameter evidence
        if category.lower() in ' '.join(feature.configuration.mo_classes).lower():
            evidence.append(f"Parameters related to '{category}'")

        # Counter evidence
        if category.lower() in ' '.join(feature.performance_monitoring.pm_counters).lower():
            evidence.append(f"PM counters for '{category}'")

        return evidence

    def classify_use_case(self, feature: EnhancedEricssonFeature) -> str:
        """Classify use case scenario"""
        text = f"{feature.name} {feature.description}".lower()

        for scenario, patterns in self.use_case_patterns.items():
            for pattern in patterns:
                if re.search(pattern, text, re.IGNORECASE):
                    return scenario.value

        return UseCaseScenario.OPTIMIZATION.value  # Default

    def calculate_role_relevance(self, feature: EnhancedEricssonFeature) -> Dict[str, float]:
        """Calculate relevance scores for each user role"""
        text = f"{feature.name} {feature.description} {' '.join(feature.configuration.mo_classes)}"
        text = text.lower()

        role_scores = {}
        for role, keywords in self.role_keywords.items():
            relevance = sum(1 for kw in keywords if kw in text)
            role_scores[role.value] = min(relevance / len(keywords), 1.0)

        return role_scores

    def batch_classify(self, features: List[EnhancedEricssonFeature]) -> List[EnhancedClassification]:
        """Classify multiple features in batch"""
        return [self.classify_feature(feature) for feature in features]