"""
Enhanced Skill Level Assessment

This module implements an enhanced SkillLevelAssessor class that provides
configurable skill assessment for Ericsson RAN features, supporting both
basic 4-level and advanced 5-level expertise assessments.

The assessor combines complexity analysis with operational impact assessment
and provides configurable assessment granularity.
"""

import math
from typing import Dict, List, Tuple, Optional, Any, Union
from enum import Enum
from dataclasses import dataclass

from models import (
    EnhancedEricssonFeature,
    SkillAssessment,
    SkillLevel
)

# Import ultra-granular components for advanced assessment
try:
    from ..advanced.ultra_granular_classifier import (
        ExpertiseLevel,
        RANExpertRole,
        FeatureComplexityMetrics
    )
    ULTRA_GRANULAR_AVAILABLE = True
except ImportError:
    ULTRA_GRANULAR_AVAILABLE = False


class AssessmentMode(Enum):
    """Skill assessment modes"""
    BASIC = "basic"                 # 4-level assessment (Basic → Specialist)
    ADVANCED = "advanced"           # 5-level assessment (Awareness → Architecture)
    HYBRID = "hybrid"               # Both basic and advanced results
    ROLE_SPECIFIC = "role_specific" # Role-specific assessment


class ComplexityScope(Enum):
    """Complexity analysis scope"""
    MINIMAL = "minimal"             # Basic complexity only
    STANDARD = "standard"           # Standard complexity analysis
    COMPREHENSIVE = "comprehensive" # Full complexity breakdown
    DETAILED = "detailed"          # Detailed metrics with learning time


@dataclass
class ComplexityBreakdown:
    """Detailed complexity breakdown for RAN features"""
    configuration_complexity: float = 0.0      # 0-10 scale
    operational_complexity: float = 0.0        # 0-10 scale
    integration_complexity: float = 0.0        # 0-10 scale
    troubleshooting_complexity: float = 0.0    # 0-10 scale
    dependency_complexity: float = 0.0         # 0-10 scale
    automation_complexity: float = 0.0         # 0-10 scale

    @property
    def overall_complexity(self) -> float:
        """Calculate overall complexity score"""
        return (self.configuration_complexity +
                self.operational_complexity +
                self.integration_complexity +
                self.troubleshooting_complexity +
                self.dependency_complexity +
                self.automation_complexity) / 6.0

    @property
    def complexity_category(self) -> str:
        """Get complexity category"""
        overall = self.overall_complexity
        if overall <= 2.0:
            return "Simple"
        elif overall <= 4.0:
            return "Basic"
        elif overall <= 6.0:
            return "Moderate"
        elif overall <= 8.0:
            return "Complex"
        else:
            return "Expert"


@dataclass
class RoleSpecificAssessment:
    """Role-specific skill assessment"""
    role: str
    required_level: str
    relevance_score: float
    key_responsibilities: List[str]
    prerequisite_skills: List[str]
    learning_curve: str
    estimated_mastery_time: int  # in hours


@dataclass
class EnhancedSkillAssessment(SkillAssessment):
    """Enhanced skill assessment with detailed analysis"""

    # Enhanced complexity analysis
    complexity_breakdown: ComplexityBreakdown = None
    learning_time_estimate: int = 0  # hours

    # Role-specific assessments
    role_assessments: List[RoleSpecificAssessment] = None

    # Advanced assessment (if available)
    advanced_expertise_level: str = None
    target_roles: List[str] = None

    # Assessment metadata
    assessment_mode: AssessmentMode = AssessmentMode.BASIC
    confidence_score: float = 0.0
    assessment_factors: Dict[str, float] = None

    def __post_init__(self):
        """Initialize default values"""
        if self.complexity_breakdown is None:
            self.complexity_breakdown = ComplexityBreakdown()
        if self.role_assessments is None:
            self.role_assessments = []
        if self.target_roles is None:
            self.target_roles = []
        if self.assessment_factors is None:
            self.assessment_factors = {}

    @property
    def is_advanced_assessment(self) -> bool:
        """Check if this includes advanced assessment"""
        return self.assessment_mode in [AssessmentMode.ADVANCED, AssessmentMode.HYBRID]

    @property
    def primary_role(self) -> Optional[str]:
        """Get the most relevant role"""
        if self.role_assessments:
            return max(self.role_assessments, key=lambda x: x.relevance_score).role
        return None


class SkillLevelAssessor:
    """
    Enhanced skill level assessment with configurable modes and complexity analysis.

    Features:
    - Configurable assessment modes (basic, advanced, hybrid, role-specific)
    - Detailed complexity breakdown
    - Role-specific assessments
    - Learning time estimates
    - Confidence scoring
    """

    def __init__(self,
                 mode: AssessmentMode = AssessmentMode.BASIC,
                 complexity_scope: ComplexityScope = ComplexityScope.STANDARD,
                 enable_role_specific: bool = True):
        """
        Initialize the skill level assessor.

        Args:
            mode: Assessment mode (basic, advanced, hybrid, role-specific)
            complexity_scope: Complexity analysis scope
            enable_role_specific: Enable role-specific assessments
        """
        self.mode = mode
        self.complexity_scope = complexity_scope
        self.enable_role_specific = enable_role_specific

        # Initialize assessment parameters
        self._init_complexity_indicators()
        self._init_skill_thresholds()
        self._init_role_definitions()
        self._init_assessment_weights()

    def _init_complexity_indicators(self):
        """Initialize complexity indicators"""
        self.complexity_keywords = {
            'expert': [
                'advanced', 'complex', 'sophisticated', 'multi-layer',
                'coordination', 'optimization', 'algorithm', 'intelligence',
                'machine learning', 'ai', 'prediction', 'adaptive',
                'architecture', 'design', 'strategy'
            ],
            'advanced': [
                'enhancement', 'improvement', 'management', 'control',
                'configuration', 'monitoring', 'measurement', 'optimization',
                'integration', 'coordination'
            ],
            'intermediate': [
                'basic', 'standard', 'routine', 'monitoring',
                'reporting', 'logging', 'collection', 'configuration'
            ],
            'basic': [
                'simple', 'straightforward', 'monitoring',
                'informational', 'optional', 'auxiliary'
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

    def _init_skill_thresholds(self):
        """Initialize skill level thresholds for both assessment modes"""
        # Basic 4-level thresholds
        self.basic_thresholds = {
            SkillLevel.BASIC: (0, 3),
            SkillLevel.INTERMEDIATE: (3, 6),
            SkillLevel.ADVANCED: (6, 8),
            SkillLevel.SPECIALIST: (8, 10)
        }

        # Advanced 5-level thresholds (if ultra-granular available)
        if ULTRA_GRANULAR_AVAILABLE:
            self.advanced_thresholds = {
                ExpertiseLevel.L1_AWARENESS: (0, 2),
                ExpertiseLevel.L2_CONFIGURATION: (2, 4),
                ExpertiseLevel.L3_OPTIMIZATION: (4, 6),
                ExpertiseLevel.L4_TROUBLESHOOTING: (6, 8),
                ExpertiseLevel.L5_ARCHITECTURE: (8, 10)
            }

    def _init_role_definitions(self):
        """Initialize role definitions for role-specific assessment"""
        self.role_definitions = {
            'network_planner': {
                'keywords': ['planning', 'design', 'architecture', 'coverage', 'capacity', 'dimensioning'],
                'responsibilities': ['Network design', 'Capacity planning', 'Coverage optimization', 'Technology selection'],
                'skills': ['RF planning', 'Traffic modeling', 'Site selection', 'Regulatory compliance']
            },
            'performance_specialist': {
                'keywords': ['performance', 'optimization', 'kpi', 'throughput', 'latency', 'quality'],
                'responsibilities': ['Performance monitoring', 'KPI optimization', 'Troubleshooting', 'Quality assurance'],
                'skills': ['Performance analysis', 'KPI management', 'Optimization techniques', 'Quality metrics']
            },
            'field_engineer': {
                'keywords': ['deployment', 'configuration', 'maintenance', 'site', 'installation', 'commissioning'],
                'responsibilities': ['Site deployment', 'Equipment installation', 'Configuration management', 'Maintenance'],
                'skills': ['Hardware installation', 'Configuration', 'Troubleshooting', 'Safety procedures']
            },
            'automation_engineer': {
                'keywords': ['automation', 'script', 'son', 'zero-touch', 'self-organizing', 'orchestration'],
                'responsibilities': ['Automation development', 'Script creation', 'Process optimization', 'Tool management'],
                'skills': ['Scripting', 'Automation tools', 'Process design', 'API integration']
            },
            'troubleshooting_expert': {
                'keywords': ['troubleshoot', 'fault', 'alarm', 'diagnostic', 'recovery', 'problem'],
                'responsibilities': ['Fault diagnosis', 'Problem resolution', 'Root cause analysis', 'Emergency response'],
                'skills': ['Fault analysis', 'Diagnostic tools', 'Root cause analysis', 'Emergency procedures']
            },
            'energy_manager': {
                'keywords': ['energy', 'power', 'efficiency', 'consumption', 'green', 'sustainability'],
                'responsibilities': ['Energy optimization', 'Power management', 'Sustainability initiatives', 'Cost optimization'],
                'skills': ['Energy management', 'Power optimization', 'Sustainability planning', 'Cost analysis']
            },
            'quality_assurance_engineer': {
                'keywords': ['test', 'verification', 'validation', 'quality', 'assurance', 'compliance'],
                'responsibilities': ['Quality testing', 'Validation procedures', 'Compliance checking', 'Test automation'],
                'skills': ['Testing methodologies', 'Quality assurance', 'Compliance standards', 'Test automation']
            },
            'network_architect': {
                'keywords': ['architecture', 'design', 'strategy', 'evolution', 'integration', 'migration'],
                'responsibilities': ['Network architecture', 'Technology strategy', 'Evolution planning', 'Integration design'],
                'skills': ['Architecture design', 'Strategic planning', 'Technology evaluation', 'Integration design']
            }
        }

    def _init_assessment_weights(self):
        """Initialize assessment weights based on complexity scope"""
        weight_configs = {
            ComplexityScope.MINIMAL: {
                'feature_complexity': 0.6,
                'parameter_complexity': 0.3,
                'operational_impact': 0.1,
                'dependency_complexity': 0.0,
                'automation_complexity': 0.0
            },
            ComplexityScope.STANDARD: {
                'feature_complexity': 0.4,
                'parameter_complexity': 0.3,
                'operational_impact': 0.2,
                'dependency_complexity': 0.1,
                'automation_complexity': 0.0
            },
            ComplexityScope.COMPREHENSIVE: {
                'feature_complexity': 0.3,
                'parameter_complexity': 0.25,
                'operational_impact': 0.2,
                'dependency_complexity': 0.15,
                'automation_complexity': 0.1
            },
            ComplexityScope.DETAILED: {
                'feature_complexity': 0.25,
                'parameter_complexity': 0.25,
                'operational_impact': 0.2,
                'dependency_complexity': 0.15,
                'automation_complexity': 0.15
            }
        }

        self.assessment_weights = weight_configs.get(
            self.complexity_scope,
            weight_configs[ComplexityScope.STANDARD]
        )

    def assess_skill_level(self, feature: EnhancedEricssonFeature) -> EnhancedSkillAssessment:
        """
        Assess skill level using the configured assessment mode.

        Args:
            feature: EnhancedEricssonFeature to assess

        Returns:
            EnhancedSkillAssessment with detailed analysis
        """
        # Calculate complexity breakdown
        complexity_breakdown = self._calculate_complexity_breakdown(feature)

        # Calculate total complexity score
        total_score = self._calculate_total_score(complexity_breakdown)

        # Determine skill level based on mode
        if self.mode == AssessmentMode.ADVANCED and ULTRA_GRANULAR_AVAILABLE:
            skill_level, advanced_level = self._determine_advanced_skill_level(total_score)
        else:
            skill_level = self._determine_basic_skill_level(total_score)
            advanced_level = None

        # Create detailed breakdown
        breakdown = {
            'configuration_complexity': complexity_breakdown.configuration_complexity,
            'operational_complexity': complexity_breakdown.operational_complexity,
            'integration_complexity': complexity_breakdown.integration_complexity,
            'troubleshooting_complexity': complexity_breakdown.troubleshooting_complexity,
            'dependency_complexity': complexity_breakdown.dependency_complexity,
            'automation_complexity': complexity_breakdown.automation_complexity
        }

        # Calculate learning time estimate
        learning_time = self._estimate_learning_time(complexity_breakdown.overall_complexity)

        # Role-specific assessments
        role_assessments = []
        if self.enable_role_specific:
            role_assessments = self._assess_role_specific_requirements(feature, complexity_breakdown)

        # Calculate confidence score
        confidence = self._calculate_confidence_score(complexity_breakdown)

        # Determine target roles
        target_roles = self._determine_target_roles(feature, skill_level)

        # Assessment factors
        assessment_factors = {
            'complexity_score': complexity_breakdown.overall_complexity,
            'parameter_count': feature.configuration.parameter_count,
            'dependency_count': len(feature.prerequisites) + len(feature.conflicting_features),
            'monitoring_complexity': len(feature.performance_monitoring.pm_counters),
            'automation_ready': feature.automation.script_ready or feature.automation.self_organizing
        }

        return EnhancedSkillAssessment(
            # Basic assessment fields
            level=skill_level.value,
            total_score=round(total_score, 2),
            complexity_score=round(complexity_breakdown.overall_complexity, 2),
            parameter_score=round(complexity_breakdown.configuration_complexity, 2),
            dependency_score=round(complexity_breakdown.dependency_complexity, 2),
            impact_score=round(complexity_breakdown.operational_complexity, 2),
            breakdown=breakdown,

            # Enhanced assessment fields
            complexity_breakdown=complexity_breakdown,
            learning_time_estimate=learning_time,
            role_assessments=role_assessments,
            advanced_expertise_level=advanced_level.value if advanced_level else None,
            target_roles=target_roles,
            assessment_mode=self.mode,
            confidence_score=confidence,
            assessment_factors=assessment_factors
        )

    def _calculate_complexity_breakdown(self, feature: EnhancedEricssonFeature) -> ComplexityBreakdown:
        """Calculate detailed complexity breakdown"""

        # Configuration complexity
        config_complexity = self._assess_configuration_complexity(feature)

        # Operational complexity
        operational_complexity = self._assess_operational_complexity(feature)

        # Integration complexity
        integration_complexity = self._assess_integration_complexity(feature)

        # Troubleshooting complexity
        troubleshooting_complexity = self._assess_troubleshooting_complexity(feature)

        # Dependency complexity
        dependency_complexity = self._assess_dependency_complexity(feature)

        # Automation complexity
        automation_complexity = self._assess_automation_complexity(feature)

        return ComplexityBreakdown(
            configuration_complexity=config_complexity,
            operational_complexity=operational_complexity,
            integration_complexity=integration_complexity,
            troubleshooting_complexity=troubleshooting_complexity,
            dependency_complexity=dependency_complexity,
            automation_complexity=automation_complexity
        )

    def _assess_configuration_complexity(self, feature: EnhancedEricssonFeature) -> float:
        """Assess configuration complexity (0-10 scale)"""
        score = 0.0

        # Base score from parameter count
        param_count = feature.configuration.parameter_count
        if param_count > 50:
            score += 8.0
        elif param_count > 25:
            score += 6.0
        elif param_count > 10:
            score += 4.0
        elif param_count > 5:
            score += 2.0
        else:
            score += 1.0

        # Parameter type diversity
        mo_classes = set(feature.configuration.mo_classes)
        type_diversity = len(mo_classes)
        score += min(type_diversity * 0.5, 2.0)

        # Cap at 10
        return min(score, 10.0)

    def _assess_operational_complexity(self, feature: EnhancedEricssonFeature) -> float:
        """Assess operational complexity (0-10 scale)"""
        score = 0.0

        # Performance monitoring complexity
        pm_counter_count = len(feature.performance_monitoring.pm_counters)
        score += min(pm_counter_count / 5.0, 4.0)

        # Trace event complexity
        trace_count = len(feature.performance_monitoring.trace_events)
        score += min(trace_count / 2.0, 2.0)

        # Network element impact
        element_count = len(feature.network_element_types)
        score += min(element_count * 0.5, 2.0)

        # Operational impact from description
        impact_text = f"{feature.operational_impact} {feature.description}".lower()
        high_impact_keywords = ['critical', 'major', 'significant', 'substantial']
        for keyword in high_impact_keywords:
            if keyword in impact_text:
                score += 1.0
                break

        return min(score, 10.0)

    def _assess_integration_complexity(self, feature: EnhancedEricssonFeature) -> float:
        """Assess integration complexity (0-10 scale)"""
        score = 0.0

        # Related features
        related_count = len(feature.related_features)
        score += min(related_count / 5.0, 3.0)

        # Prerequisites
        prereq_count = len(feature.prerequisites)
        score += min(prereq_count / 3.0, 3.0)

        # Conflicts
        conflict_count = len(feature.conflicting_features)
        score += min(conflict_count * 1.0, 2.0)

        # Hardware requirements
        hw_count = len(feature.hardware_requirements)
        score += min(hw_count * 0.5, 2.0)

        return min(score, 10.0)

    def _assess_troubleshooting_complexity(self, feature: EnhancedEricssonFeature) -> float:
        """Assess troubleshooting complexity (0-10 scale)"""
        score = 0.0

        # Troubleshooting steps
        steps_count = feature.troubleshooting.steps_count
        score += min(steps_count / 3.0, 4.0)

        # Alarm types
        alarm_count = len(feature.troubleshooting.alarm_types)
        score += min(alarm_count * 0.5, 2.0)

        # Fault isolation capability
        if feature.troubleshooting.fault_isolation_capability:
            score += 1.0

        # Recovery procedures
        recovery_count = len(feature.troubleshooting.recovery_procedures)
        score += min(recovery_count * 0.5, 2.0)

        # Common failure modes
        failure_count = len(feature.troubleshooting.common_failure_modes)
        score += min(failure_count * 0.3, 1.0)

        return min(score, 10.0)

    def _assess_dependency_complexity(self, feature: EnhancedEricssonFeature) -> float:
        """Assess dependency complexity (0-10 scale)"""
        score = 0.0

        # Prerequisites
        prereq_count = len(feature.prerequisites)
        score += min(prereq_count * 1.0, 4.0)

        # Related features
        related_count = len(feature.related_features)
        score += min(related_count * 0.3, 3.0)

        # Conflicts
        conflict_count = len(feature.conflicting_features)
        score += min(conflict_count * 1.5, 3.0)

        return min(score, 10.0)

    def _assess_automation_complexity(self, feature: EnhancedEricssonFeature) -> float:
        """Assess automation complexity (0-10 scale)"""
        score = 0.0

        # Script readiness
        if feature.automation.script_ready:
            score += 3.0

        # Self-organizing capability
        if feature.automation.self_organizing:
            score += 4.0

        # Configuration management complexity
        param_count = feature.configuration.parameter_count
        if param_count > 20:
            score += 2.0  # High complexity makes automation valuable
        elif param_count > 10:
            score += 1.0

        # Monitoring automation potential
        pm_count = len(feature.performance_monitoring.pm_counters)
        score += min(pm_count / 20.0, 1.0)

        return min(score, 10.0)

    def _calculate_total_score(self, complexity_breakdown: ComplexityBreakdown) -> float:
        """Calculate total skill score from complexity breakdown"""
        weights = self.assessment_weights

        total = (
            complexity_breakdown.configuration_complexity * weights['feature_complexity'] +
            complexity_breakdown.operational_complexity * weights['operational_impact'] +
            complexity_breakdown.integration_complexity * weights['dependency_complexity'] +
            complexity_breakdown.troubleshooting_complexity * weights['operational_impact'] +
            complexity_breakdown.dependency_complexity * weights['dependency_complexity'] +
            complexity_breakdown.automation_complexity * weights['automation_complexity']
        )

        return total

    def _determine_basic_skill_level(self, total_score: float) -> SkillLevel:
        """Determine basic 4-level skill assessment"""
        for level, (min_score, max_score) in self.basic_thresholds.items():
            if min_score <= total_score < max_score:
                return level
        return SkillLevel.SPECIALIST

    def _determine_advanced_skill_level(self, total_score: float) -> Tuple[SkillLevel, ExpertiseLevel]:
        """Determine advanced 5-level skill assessment"""
        # Map to basic level for compatibility
        basic_level = self._determine_basic_skill_level(total_score)

        # Map to advanced level
        for level, (min_score, max_score) in self.advanced_thresholds.items():
            if min_score <= total_score < max_score:
                return basic_level, level

        return basic_level, ExpertiseLevel.L5_ARCHITECTURE

    def _estimate_learning_time(self, complexity_score: float) -> int:
        """Estimate learning time in hours based on complexity"""
        base_hours = 8  # Base hours per complexity point

        # Adjust based on complexity category
        if complexity_score <= 2.0:
            multiplier = 1.0
        elif complexity_score <= 4.0:
            multiplier = 1.5
        elif complexity_score <= 6.0:
            multiplier = 2.0
        elif complexity_score <= 8.0:
            multiplier = 3.0
        else:
            multiplier = 4.0

        return int(complexity_score * base_hours * multiplier)

    def _assess_role_specific_requirements(self,
                                         feature: EnhancedEricssonFeature,
                                         complexity_breakdown: ComplexityBreakdown) -> List[RoleSpecificAssessment]:
        """Assess role-specific requirements"""
        role_assessments = []
        feature_text = f"{feature.name} {feature.description} {' '.join(feature.configuration.mo_classes)}".lower()

        for role_name, role_def in self.role_definitions.items():
            # Calculate relevance score
            relevance = sum(1 for keyword in role_def['keywords'] if keyword in feature_text)
            relevance_score = min(relevance / len(role_def['keywords']), 1.0)

            if relevance_score > 0.2:  # Only include relevant roles
                # Determine required level
                if complexity_breakdown.overall_complexity >= 8.0:
                    required_level = "Specialist" if self.mode == AssessmentMode.BASIC else "Architecture"
                elif complexity_breakdown.overall_complexity >= 6.0:
                    required_level = "Advanced" if self.mode == AssessmentMode.BASIC else "Troubleshooting"
                elif complexity_breakdown.overall_complexity >= 4.0:
                    required_level = "Intermediate" if self.mode == AssessmentMode.BASIC else "Optimization"
                else:
                    required_level = "Basic" if self.mode == AssessmentMode.BASIC else "Configuration"

                # Determine learning curve
                if complexity_breakdown.overall_complexity >= 8.0:
                    learning_curve = "Steep"
                elif complexity_breakdown.overall_complexity >= 6.0:
                    learning_curve = "Moderate"
                else:
                    learning_curve = "Gentle"

                role_assessment = RoleSpecificAssessment(
                    role=role_name.replace('_', ' ').title(),
                    required_level=required_level,
                    relevance_score=relevance_score,
                    key_responsibilities=role_def['responsibilities'],
                    prerequisite_skills=role_def['skills'],
                    learning_curve=learning_curve,
                    estimated_mastery_time=self._estimate_learning_time(complexity_breakdown.overall_complexity)
                )
                role_assessments.append(role_assessment)

        # Sort by relevance score
        role_assessments.sort(key=lambda x: x.relevance_score, reverse=True)

        return role_assessments[:5]  # Top 5 most relevant roles

    def _determine_target_roles(self, feature: EnhancedEricssonFeature, skill_level: SkillLevel) -> List[str]:
        """Determine target roles for the feature"""
        feature_text = f"{feature.name} {feature.description}".lower()

        target_roles = []
        role_keywords = {
            'Network Planner': ['plan', 'design', 'architecture', 'coverage', 'capacity'],
            'Performance Specialist': ['performance', 'optimization', 'kpi', 'throughput', 'latency'],
            'Field Engineer': ['deployment', 'configuration', 'maintenance', 'site'],
            'Automation Engineer': ['automation', 'script', 'son', 'zero-touch'],
            'Troubleshooting Expert': ['troubleshoot', 'fault', 'alarm', 'diagnostic'],
            'Energy Manager': ['energy', 'power', 'efficiency', 'consumption'],
            'Quality Assurance Engineer': ['test', 'verification', 'quality', 'assurance'],
            'Network Architect': ['architecture', 'design', 'strategy', 'evolution']
        }

        for role, keywords in role_keywords.items():
            if any(keyword in feature_text for keyword in keywords):
                target_roles.append(role)

        # Add roles based on skill level
        if skill_level in [SkillLevel.ADVANCED, SkillLevel.SPECIALIST]:
            if 'Troubleshooting Expert' not in target_roles:
                target_roles.append('Troubleshooting Expert')

        if skill_level == SkillLevel.SPECIALIST:
            if 'Network Architect' not in target_roles:
                target_roles.append('Network Architect')

        return target_roles if target_roles else ['Field Engineer']  # Default role

    def _calculate_confidence_score(self, complexity_breakdown: ComplexityBreakdown) -> float:
        """Calculate confidence score for the assessment"""
        # Base confidence on evidence consistency
        complexity_values = [
            complexity_breakdown.configuration_complexity,
            complexity_breakdown.operational_complexity,
            complexity_breakdown.integration_complexity,
            complexity_breakdown.troubleshooting_complexity,
            complexity_breakdown.dependency_complexity,
            complexity_breakdown.automation_complexity
        ]

        # Calculate standard deviation
        if len(complexity_values) > 1:
            mean = sum(complexity_values) / len(complexity_values)
            variance = sum((x - mean) ** 2 for x in complexity_values) / len(complexity_values)
            std_dev = math.sqrt(variance)

            # Lower standard deviation = higher confidence
            confidence = max(0.5, 1.0 - (std_dev / 10.0))
        else:
            confidence = 0.7

        return round(confidence, 2)

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
        complexity_breakdowns = []

        for feature in features:
            assessment = self.assess_skill_level(feature)
            total_scores.append(assessment.total_score)
            complexity_breakdowns.append(assessment.complexity_breakdown)

        # Calculate overall statistics
        overall_scores = [cb.overall_complexity for cb in complexity_breakdowns]

        return {
            'mean_score': sum(total_scores) / len(total_scores),
            'min_score': min(total_scores),
            'max_score': max(total_scores),
            'median_score': sorted(total_scores)[len(total_scores) // 2],
            'std_deviation': self._calculate_std_deviation(total_scores),
            'mean_complexity': sum(overall_scores) / len(overall_scores),
            'complexity_distribution': self._get_complexity_distribution(complexity_breakdowns)
        }

    def _get_complexity_distribution(self, complexity_breakdowns: List[ComplexityBreakdown]) -> Dict[str, int]:
        """Get distribution of complexity categories"""
        distribution = {
            'Simple': 0,
            'Basic': 0,
            'Moderate': 0,
            'Complex': 0,
            'Expert': 0
        }

        for cb in complexity_breakdowns:
            category = cb.complexity_category
            distribution[category] += 1

        return distribution

    def _calculate_std_deviation(self, values: List[float]) -> float:
        """Calculate standard deviation"""
        if len(values) < 2:
            return 0.0

        mean = sum(values) / len(values)
        variance = sum((x - mean) ** 2 for x in values) / len(values)
        return math.sqrt(variance)

    def batch_assess(self, features: List[EnhancedEricssonFeature]) -> List[EnhancedSkillAssessment]:
        """Assess skill levels for multiple features in batch"""
        return [self.assess_skill_level(feature) for feature in features]

    def filter_by_skill_level(self, features: List[EnhancedEricssonFeature],
                            target_level: Union[SkillLevel, str]) -> List[EnhancedEricssonFeature]:
        """Filter features by required skill level"""
        target_level_value = target_level.value if isinstance(target_level, SkillLevel) else target_level
        filtered_features = []

        for feature in features:
            assessment = self.assess_skill_level(feature)
            if assessment.level == target_level_value:
                filtered_features.append(feature)

        return filtered_features

    def set_assessment_mode(self, mode: AssessmentMode):
        """Update assessment mode"""
        self.mode = mode

    def set_complexity_scope(self, scope: ComplexityScope):
        """Update complexity analysis scope"""
        self.complexity_scope = scope
        self._init_assessment_weights()

    def get_assessment_summary(self, assessment: EnhancedSkillAssessment) -> str:
        """Get human-readable assessment summary"""
        summary_parts = [
            f"Level: {assessment.level}",
            f"Complexity: {assessment.complexity_breakdown.complexity_category}",
            f"Score: {assessment.total_score:.1f}/10",
            f"Learning: {assessment.learning_time_estimate}h"
        ]

        if assessment.primary_role:
            summary_parts.append(f"Primary Role: {assessment.primary_role}")

        if assessment.advanced_expertise_level:
            summary_parts.append(f"Advanced: {assessment.advanced_expertise_level}")

        return " | ".join(summary_parts)