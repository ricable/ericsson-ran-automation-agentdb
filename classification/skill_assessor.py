"""
Skill Level Assessment

This module implements the SkillLevelAssessor class for determining the
required expertise level for Ericsson RAN features.
"""

import math
from typing import Dict, List, Tuple, Optional

from models import (
    EnhancedEricssonFeature,
    SkillAssessment,
    SkillLevel
)


class SkillLevelAssessor:
    """
    Advanced skill level assessment for Ericsson RAN features.

    Calculates skill level based on:
    - Feature complexity (0-3 points)
    - Parameter complexity (0-2 points)
    - Dependency complexity (0-2 points)
    - Operational impact (0-3 points)
    """

    def __init__(self):
        self._init_complexity_indicators()
        self._init_parameter_weights()
        self._init_impact_indicators()
        self._init_skill_thresholds()

    def _init_complexity_indicators(self):
        """Initialize complexity indicators"""
        self.complexity_keywords = {
            'high': [
                'advanced', 'complex', 'sophisticated', 'multi-layer',
                'coordination', 'optimization', 'algorithm', 'intelligence',
                'machine learning', 'ai', 'prediction', 'adaptive'
            ],
            'medium': [
                'enhancement', 'improvement', 'management', 'control',
                'configuration', 'monitoring', 'measurement', 'optimization'
            ],
            'low': [
                'basic', 'simple', 'standard', 'routine', 'monitoring',
                'reporting', 'logging', 'collection'
            ]
        }

        self.technical_complexity_indicators = {
            'mimo': ['massive mimo', 'tm8', 'beamforming', 'spatial multiplexing'],
            'carrier_aggregation': ['carrier aggregation', 'ca', 'inter-frequency', 'intra-frequency'],
            'dual_connectivity': ['en-dc', 'lte-nr', 'dual connectivity', 'multi-rat'],
            'network_slicing': ['network slicing', 'nssai', 'slice isolation'],
            'coordination': ['coordination', 'inter-cell', 'multi-cell', 'cooperative'],
            'automation': ['automation', 'self-organizing', 'zero-touch', 'ai/ml']
        }

    def _init_parameter_weights(self):
        """Initialize parameter complexity weights"""
        self.parameter_weights = {
            'count': {
                'simple': (0, 10),      # 0-10 parameters
                'moderate': (11, 25),   # 11-25 parameters
                'complex': (26, 50),    # 26-50 parameters
                'expert': (51, 1000)    # 50+ parameters
            },
            'types': {
                'low': (1, 2),          # 1-2 parameter types
                'medium': (3, 5),       # 3-5 parameter types
                'high': (6, 10),        # 6-10 parameter types
                'expert': (11, 100)     # 10+ parameter types
            },
            'special_patterns': {
                'high_weight': ['qci', 'earfcn', 'pci', 'tac', 'plmn'],
                'medium_weight': ['threshold', 'timer', 'offset', 'margin'],
                'low_weight': ['enable', 'disable', 'status', 'mode']
            }
        }

    def _init_impact_indicators(self):
        """Initialize operational impact indicators"""
        self.impact_indicators = {
            'critical': [
                'service affecting', 'outage', 'failure', 'critical',
                'emergency', 'security', 'protection', 'resilience'
            ],
            'high': [
                'performance', 'capacity', 'coverage', 'quality',
                'optimization', 'enhancement', 'improvement'
            ],
            'medium': [
                'monitoring', 'measurement', 'reporting', 'logging',
                'collection', 'analysis'
            ],
            'low': [
                'informational', 'optional', 'enhancement', 'minor',
                'auxiliary', 'supplementary'
            ]
        }

    def _init_skill_thresholds(self):
        """Initialize skill level thresholds"""
        self.skill_thresholds = {
            SkillLevel.BASIC: (0, 3),
            SkillLevel.INTERMEDIATE: (3, 6),
            SkillLevel.ADVANCED: (6, 8),
            SkillLevel.SPECIALIST: (8, 10)
        }

    def assess_skill_level(self, feature: EnhancedEricssonFeature) -> SkillAssessment:
        """
        Assess the skill level required for a feature.

        Args:
            feature: EnhancedEricssonFeature to assess

        Returns:
            SkillAssessment with detailed scoring
        """
        # 1. Feature Complexity (0-3 points)
        complexity_score = self._assess_feature_complexity(feature)

        # 2. Parameter Complexity (0-2 points)
        parameter_score = self._assess_parameter_complexity(feature)

        # 3. Dependency Complexity (0-2 points)
        dependency_score = self._assess_dependency_complexity(feature)

        # 4. Operational Impact (0-3 points)
        impact_score = self._assess_operational_impact(feature)

        # Calculate total score
        total_score = complexity_score + parameter_score + dependency_score + impact_score

        # Determine skill level
        skill_level = self._determine_skill_level(total_score)

        # Create detailed breakdown
        breakdown = {
            'feature_complexity': complexity_score,
            'parameter_complexity': parameter_score,
            'dependency_complexity': dependency_score,
            'operational_impact': impact_score
        }

        return SkillAssessment(
            level=skill_level.value,
            total_score=round(total_score, 2),
            complexity_score=round(complexity_score, 2),
            parameter_score=round(parameter_score, 2),
            dependency_score=round(dependency_score, 2),
            impact_score=round(impact_score, 2),
            breakdown=breakdown
        )

    def _assess_feature_complexity(self, feature: EnhancedEricssonFeature) -> float:
        """Assess feature complexity (0-3 points)"""
        score = 0.0

        # Base complexity from documentation score
        if feature.documentation.complexity_score > 0:
            base_score = feature.documentation.complexity_score / 11.5 * 2.0  # Normalize to 0-2
            score += min(base_score, 2.0)

        # Technical complexity indicators
        feature_text = f"{feature.name} {feature.description}".lower()

        for complexity_level, keywords in self.complexity_keywords.items():
            matches = sum(1 for kw in keywords if kw in feature_text)
            if matches > 0:
                if complexity_level == 'high':
                    score += min(matches * 0.5, 1.0)
                elif complexity_level == 'medium':
                    score += min(matches * 0.3, 0.6)
                elif complexity_level == 'low':
                    score += min(matches * 0.1, 0.2)

        # Advanced technology indicators
        for tech_type, indicators in self.technical_complexity_indicators.items():
            if any(indicator in feature_text for indicator in indicators):
                score += 0.3

        # Cap at 3 points
        return min(score, 3.0)

    def _assess_parameter_complexity(self, feature: EnhancedEricssonFeature) -> float:
        """Assess parameter complexity (0-2 points)"""
        score = 0.0

        # Parameter count assessment
        param_count = feature.configuration.parameter_count
        count_score = self._calculate_parameter_count_score(param_count)
        score += count_score

        # Parameter type diversity
        param_types = len(set(feature.configuration.mo_classes))
        type_score = self._calculate_parameter_type_score(param_types)
        score += type_score

        # Special parameter patterns
        param_text = " ".join(feature.configuration.mo_classes).lower()
        pattern_score = self._calculate_parameter_pattern_score(param_text)
        score += pattern_score

        # Cap at 2 points
        return min(score, 2.0)

    def _calculate_parameter_count_score(self, count: int) -> float:
        """Calculate score based on parameter count"""
        ranges = self.parameter_weights['count']

        if count <= ranges['simple'][1]:
            return 0.2
        elif count <= ranges['moderate'][1]:
            return 0.5
        elif count <= ranges['complex'][1]:
            return 0.8
        else:
            return 1.0

    def _calculate_parameter_type_score(self, type_count: int) -> float:
        """Calculate score based on parameter type diversity"""
        ranges = self.parameter_weights['types']

        if type_count <= ranges['low'][1]:
            return 0.1
        elif type_count <= ranges['medium'][1]:
            return 0.3
        elif type_count <= ranges['high'][1]:
            return 0.5
        else:
            return 0.7

    def _calculate_parameter_pattern_score(self, param_text: str) -> float:
        """Calculate score based on special parameter patterns"""
        score = 0.0
        patterns = self.parameter_weights['special_patterns']

        # High-weight patterns
        high_matches = sum(1 for pattern in patterns['high_weight'] if pattern in param_text)
        score += min(high_matches * 0.2, 0.6)

        # Medium-weight patterns
        medium_matches = sum(1 for pattern in patterns['medium_weight'] if pattern in param_text)
        score += min(medium_matches * 0.1, 0.3)

        # Low-weight patterns
        low_matches = sum(1 for pattern in patterns['low_weight'] if pattern in param_text)
        score += min(low_matches * 0.05, 0.1)

        return score

    def _assess_dependency_complexity(self, feature: EnhancedEricssonFeature) -> float:
        """Assess dependency complexity (0-2 points)"""
        score = 0.0

        # Prerequisite complexity
        prereq_count = len(feature.prerequisites)
        if prereq_count > 5:
            score += 1.0
        elif prereq_count > 2:
            score += 0.6
        elif prereq_count > 0:
            score += 0.3

        # Conflict complexity
        conflict_count = len(feature.conflicting_features)
        if conflict_count > 3:
            score += 0.6
        elif conflict_count > 1:
            score += 0.3
        elif conflict_count > 0:
            score += 0.1

        # Related features complexity
        related_count = len(feature.related_features)
        if related_count > 10:
            score += 0.4
        elif related_count > 5:
            score += 0.2
        elif related_count > 0:
            score += 0.1

        # Cap at 2 points
        return min(score, 2.0)

    def _assess_operational_impact(self, feature: EnhancedEricssonFeature) -> float:
        """Assess operational impact (0-3 points)"""
        score = 0.0

        # Impact from description and operational impact field
        impact_text = f"{feature.operational_impact} {feature.description}".lower()

        # Critical impact indicators
        critical_matches = sum(1 for kw in self.impact_indicators['critical'] if kw in impact_text)
        if critical_matches > 0:
            score += min(critical_matches * 1.0, 2.0)

        # High impact indicators
        high_matches = sum(1 for kw in self.impact_indicators['high'] if kw in impact_text)
        if high_matches > 0:
            score += min(high_matches * 0.5, 1.0)

        # Medium impact indicators
        medium_matches = sum(1 for kw in self.impact_indicators['medium'] if kw in impact_text)
        if medium_matches > 0:
            score += min(medium_matches * 0.2, 0.5)

        # Network element impact
        element_count = len(feature.network_element_types)
        if element_count > 3:
            score += 0.5
        elif element_count > 1:
            score += 0.2

        # Troubleshooting complexity
        if feature.troubleshooting.steps_count > 10:
            score += 0.5
        elif feature.troubleshooting.steps_count > 5:
            score += 0.3
        elif feature.troubleshooting.steps_count > 0:
            score += 0.1

        # License requirements
        if feature.licensing and 'critical' in feature.licensing.lower():
            score += 0.3

        # Cap at 3 points
        return min(score, 3.0)

    def _determine_skill_level(self, total_score: float) -> SkillLevel:
        """Determine skill level based on total score"""
        for level, (min_score, max_score) in self.skill_thresholds.items():
            if min_score <= total_score < max_score:
                return level

        # If score exceeds all ranges, return highest level
        return SkillLevel.SPECIALIST

    def get_skill_level_distribution(self, features: List[EnhancedEricssonFeature]) -> Dict[str, int]:
        """Get distribution of skill levels across features"""
        distribution = {level.value: 0 for level in SkillLevel}

        for feature in features:
            assessment = self.assess_skill_level(feature)
            distribution[assessment.level] += 1

        return distribution

    def get_complexity_statistics(self, features: List[EnhancedEricssonFeature]) -> Dict[str, float]:
        """Get complexity statistics for a set of features"""
        if not features:
            return {}

        total_scores = []
        for feature in features:
            assessment = self.assess_skill_level(feature)
            total_scores.append(assessment.total_score)

        return {
            'mean_score': sum(total_scores) / len(total_scores),
            'min_score': min(total_scores),
            'max_score': max(total_scores),
            'median_score': sorted(total_scores)[len(total_scores) // 2],
            'std_deviation': self._calculate_std_deviation(total_scores)
        }

    def _calculate_std_deviation(self, values: List[float]) -> float:
        """Calculate standard deviation"""
        if len(values) < 2:
            return 0.0

        mean = sum(values) / len(values)
        variance = sum((x - mean) ** 2 for x in values) / len(values)
        return math.sqrt(variance)

    def batch_assess(self, features: List[EnhancedEricssonFeature]) -> List[SkillAssessment]:
        """Assess skill levels for multiple features in batch"""
        return [self.assess_skill_level(feature) for feature in features]

    def filter_by_skill_level(self, features: List[EnhancedEricssonFeature],
                            target_level: SkillLevel) -> List[EnhancedEricssonFeature]:
        """Filter features by required skill level"""
        filtered_features = []

        for feature in features:
            assessment = self.assess_skill_level(feature)
            if assessment.level == target_level.value:
                filtered_features.append(feature)

        return filtered_features