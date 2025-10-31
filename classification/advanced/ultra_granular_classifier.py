"""
Ultra-Granular Classification System for RAN Expert Skills

This module implements an advanced classification system with ultra-granular categories
designed for specialized RAN experts. It provides multi-dimensional classification
capabilities that go far beyond basic categorization.

Based on analysis of Ericsson RAN features, this system provides:
- 8 primary domains with 35+ specializations
- Multi-dimensional context-aware classification
- 5-level expertise progression
- Role-specific skill mapping
- Use-case oriented categorization
"""

from enum import Enum
from typing import Dict, List, Set, Tuple, Optional, Any
from dataclasses import dataclass, field
import re
from abc import ABC, abstractmethod


class PrimaryDomain(Enum):
    """Primary RAN domains with ultra-granular specialization"""

    RADIO_ACCESS_TECHNOLOGIES = "radio_access_technologies"
    NETWORK_PERFORMANCE = "network_performance"
    ENERGY_EFFICIENCY = "energy_efficiency"
    MOBILITY_MANAGEMENT = "mobility_management"
    ADVANCED_FEATURES = "advanced_features"
    QUALITY_ASSURANCE = "quality_assurance"
    NETWORK_AUTOMATION = "network_automation"
    EVOLUTION_MIGRATION = "evolution_migration"


class SecondarySpecialization(Enum):
    """Ultra-granular specializations within each primary domain"""

    # Radio Access Technologies
    LTE_ADVANCED = "lte_advanced"
    NR_MILLOWAVE = "nr_millimeter_wave"
    TDD_FDD = "tdd_fdd"
    DYNAMIC_SPECTRUM = "dynamic_spectrum"
    COVERAGE_OPTIMIZATION = "coverage_optimization"
    CAPACITY_EXPANSION = "capacity_expansion"
    INTERFERENCE_MANAGEMENT = "interference_management"

    # Network Performance
    THROUGHPUT_OPTIMIZATION = "throughput_optimization"
    LATENCY_REDUCTION = "latency_reduction"
    QOS_MANAGEMENT = "qos_management"
    KPI_MONITORING = "kpi_monitoring"
    LOAD_BALANCING = "load_balancing"
    TRAFFIC_MANAGEMENT = "traffic_management"
    CONGESTION_CONTROL = "congestion_control"

    # Energy Efficiency
    DEEP_SLEEP_MODES = "deep_sleep_modes"
    LIGHT_SLEEP_MODES = "light_sleep_modes"
    DYNAMIC_SLEEP = "dynamic_sleep"
    NETWORK_SLEEP = "network_sleep"
    POWER_SCALING = "power_scaling"
    GREEN_RAN = "green_ran"
    ENERGY_MONITORING = "energy_monitoring"

    # Mobility Management
    INTRA_FREQUENCY_HANDOVER = "intra_frequency_handover"
    INTER_FREQUENCY_HANDOVER = "inter_frequency_handover"
    INTER_RAT_HANDOVER = "inter_rat_handover"
    X2_BASED_HANDOVER = "x2_based_handover"
    CELL_RESELECTION = "cell_reselection"
    MOBILITY_ROBUSTNESS = "mobility_robustness"
    PING_PONG_PREVENTION = "ping_pong_prevention"

    # Advanced Features
    SU_MIMO = "su_mimo"
    MU_MIMO = "mu_mimo"
    MASSIVE_MIMO = "massive_mimo"
    BEAMFORMING = "beamforming"
    TM_SWITCHING = "tm_switching"
    INTRA_BAND_CA = "intra_band_ca"
    INTER_BAND_CA = "inter_band_ca"
    NETWORK_SLICING = "network_slicing"

    # Quality Assurance
    PERFORMANCE_TESTING = "performance_testing"
    CONFORMANCE_TESTING = "conformance_testing"
    COMPATIBILITY_TESTING = "compatibility_testing"
    FIELD_VALIDATION = "field_validation"
    TROUBLESHOOTING = "troubleshooting"
    ALARM_MANAGEMENT = "alarm_management"
    LOG_ANALYSIS = "log_analysis"

    # Network Automation
    ZERO_TOUCH_DEPLOYMENT = "zero_touch_deployment"
    SELF_ORGANIZING_NETWORKS = "self_organizing_networks"
    SCRIPTED_OPTIMIZATION = "scripted_optimization"
    POLICY_MANAGEMENT = "policy_management"
    ANOMALY_DETECTION = "anomaly_detection"
    PREDICTIVE_MAINTENANCE = "predictive_maintenance"
    CONFIGURATION_AUTOMATION = "configuration_automation"

    # Evolution & Migration
    LTE_TO_NR_MIGRATION = "lte_to_nr_migration"
    FEATURE_UPGRADE = "feature_upgrade"
    BACKWARD_COMPATIBILITY = "backward_compatibility"
    LEGACY_SUPPORT = "legacy_support"
    TECHNOLOGY_INTRODUCTION = "technology_introduction"
    DECOMMISSIONING = "decommissioning"
    HYBRID_NETWORKS = "hybrid_networks"


class ExpertiseLevel(Enum):
    """5-level expertise progression for RAN skills"""

    L1_AWARENESS = "awareness"           # Understand feature capabilities
    L2_CONFIGURATION = "configuration"   # Can configure and activate
    L3_OPTIMIZATION = "optimization"     # Can optimize performance
    L4_TROUBLESHOOTING = "troubleshooting"  # Can diagnose and resolve
    L5_ARCHITECTURE = "architecture"     # Can design and architect


class RANExpertRole(Enum):
    """Specialized RAN expert roles with distinct skill requirements"""

    RADIO_ACCESS_PLANNER = "radio_access_planner"
    PERFORMANCE_SPECIALIST = "performance_specialist"
    FIELD_ENGINEER = "field_engineer"
    AUTOMATION_ENGINEER = "automation_engineer"
    TROUBLESHOOTING_EXPERT = "troubleshooting_expert"
    ENERGY_MANAGER = "energy_manager"
    QUALITY_ASSURANCE_ENGINEER = "quality_assurance_engineer"
    NETWORK_ARCHITECT = "network_architect"


class UseCaseScenario(Enum):
    """Real-world use case scenarios for skill application"""

    NETWORK_PLANNING = "network_planning"
    FEATURE_DEPLOYMENT = "feature_deployment"
    PERFORMANCE_OPTIMIZATION = "performance_optimization"
    MAINTENANCE = "maintenance"
    TROUBLESHOOTING = "troubleshooting"
    CAPACITY_EXPANSION = "capacity_expansion"
    TECHNOLOGY_UPGRADE = "technology_upgrade"
    ENERGY_OPTIMIZATION = "energy_optimization"


class ContextFactor(Enum):
    """Context factors that influence feature classification and relevance"""

    NETWORK_SIZE = "network_size"
    DEPLOYMENT_PHASE = "deployment_phase"
    BUSINESS_OBJECTIVE = "business_objective"
    TECHNICAL_CONSTRAINT = "technical_constraint"
    CUSTOMER_SEGMENT = "customer_segment"
    REGULATORY_ENVIRONMENT = "regulatory_environment"
    COMPETITIVE_LANDSCAPE = "competitive_landscape"


class NetworkSize(Enum):
    """Network size context for feature relevance"""

    SMALL_CELL = "small_cell"           # < 10 cells, enterprise/campus
    URBAN_CLUSTER = "urban_cluster"     # 10-100 cells, urban area
    REGIONAL_NETWORK = "regional_network"  # 100-1000 cells, city/region
    NATIONAL_NETWORK = "national_network"    # 1000+ cells, national scale


class DeploymentPhase(Enum):
    """Deployment phase context for feature applicability"""

    PLANNING = "planning"               # Network design and planning
    DEPLOYMENT = "deployment"           # Initial rollout and configuration
    OPTIMIZATION = "optimization"       # Performance tuning and optimization
    MAINTENANCE = "maintenance"         # Ongoing operations and maintenance
    EVOLUTION = "evolution"             # Network upgrades and evolution


class BusinessObjective(Enum):
    """Business objectives driving feature selection"""

    COST_REDUCTION = "cost_reduction"
    CAPACITY_EXPANSION = "capacity_expansion"
    QUALITY_IMPROVEMENT = "quality_improvement"
    NEW_REVENUE_STREAMS = "new_revenue_streams"
    COMPETITIVE_DIFFERENTIATION = "competitive_differentiation"
    SUSTAINABILITY_GOALS = "sustainability_goals"


class TechnicalConstraint(Enum):
    """Technical constraints influencing feature applicability"""

    BACKHAUL_LIMITATION = "backhaul_limitation"
    SPECTRUM_EFFICIENCY = "spectrum_efficiency"
    LATENCY_REQUIREMENT = "latency_requirement"
    COVERAGE_REQUIREMENTS = "coverage_requirements"
    POWER_CONSTRAINTS = "power_constraints"
    HARDWARE_LIMITATIONS = "hardware_limitations"


class CustomerSegment(Enum):
    """Customer segments influencing feature prioritization"""

    URBAN_DENSE = "urban_dense"         # Dense urban environments
    SUBURBAN = "suburban"              # Suburban areas
    RURAL = "rural"                    # Rural/remote areas
    INDUSTRIAL = "industrial"          # Industrial/enterprise
    PUBLIC_SAFETY = "public_safety"    # Public safety networks
    TRANSPORTATION = "transportation"   # Transportation networks


@dataclass
class FeatureComplexityMetrics:
    """Detailed complexity metrics for RAN features"""

    configuration_complexity: float = 0.0      # 1-10 scale
    operational_complexity: float = 0.0        # 1-10 scale
    integration_complexity: float = 0.0        # 1-10 scale
    troubleshooting_complexity: float = 0.0    # 1-10 scale
    automation_readiness: float = 0.0          # 0-1 scale
    expertise_required: ExpertiseLevel = ExpertiseLevel.L1_AWARENESS
    estimated_learning_time_hours: int = 0     # Learning time estimation
    prerequisite_feature_count: int = 0         # Number of prerequisites
    dependency_depth: int = 0                  # Maximum dependency depth

    def calculate_overall_complexity(self) -> float:
        """Calculate overall complexity score"""
        return (self.configuration_complexity +
                self.operational_complexity +
                self.integration_complexity +
                self.troubleshooting_complexity) / 4.0

    def get_complexity_category(self) -> str:
        """Get complexity category"""
        overall = self.calculate_overall_complexity()
        if overall <= 3.0:
            return "Simple"
        elif overall <= 5.0:
            return "Moderate"
        elif overall <= 7.0:
            return "Complex"
        elif overall <= 9.0:
            return "Very Complex"
        else:
            return "Expert"


@dataclass
class ContextualClassification:
    """Context-aware classification for RAN features"""

    primary_domain: PrimaryDomain
    secondary_specializations: List[SecondarySpecialization]
    context_factors: Dict[ContextFactor, Any]
    relevance_scores: Dict[str, float] = field(default_factory=dict)
    applicability_scenarios: List[UseCaseScenario] = field(default_factory=list)

    def calculate_context_relevance(self, context: Dict[ContextFactor, Any]) -> float:
        """Calculate relevance score for specific context"""
        score = 0.0
        match_count = 0

        for factor, value in context.items():
            if factor in self.context_factors:
                if self.context_factors[factor] == value:
                    score += 1.0
                elif self._is_partial_match(factor, value):
                    score += 0.5
                match_count += 1

        return score / max(1, match_count)

    def _is_partial_match(self, factor: ContextFactor, value: Any) -> bool:
        """Check for partial context match"""
        # Implement partial matching logic for different context types
        return False


@dataclass
class FeatureRelationships:
    """Relationship mapping between RAN features"""

    prerequisites: List[str] = field(default_factory=list)      # Required features
    dependencies: List[str] = field(default_factory=list)       # Depends on features
    conflicts_with: List[str] = field(default_factory=list)     # Conflicting features
    complements: List[str] = field(default_factory=list)        # Complementary features
    enhances: List[str] = field(default_factory=list)           # Features enhanced
    deprecated_by: List[str] = field(default_factory=list)      # Features that replace this
    alternative_to: List[str] = field(default_factory=list)     # Alternative features

    def calculate_dependency_score(self) -> float:
        """Calculate dependency complexity score"""
        return (len(self.prerequisites) * 0.4 +
                len(self.dependencies) * 0.3 +
                len(self.conflicts_with) * 0.3)


@dataclass
class UltraGranularClassification:
    """Ultra-granular classification for specialized RAN experts"""

    # Core Classification
    primary_domain: PrimaryDomain
    secondary_specializations: List[SecondarySpecialization]
    tertiary_keywords: List[str] = field(default_factory=list)

    # Expertise & Role Mapping
    required_expertise_level: ExpertiseLevel = ExpertiseLevel.L1_AWARENESS
    target_roles: List[RANExpertRole] = field(default_factory=list)
    applicable_scenarios: List[UseCaseScenario] = field(default_factory=list)

    # Context & Complexity
    contextual_classification: ContextualClassification = None
    complexity_metrics: FeatureComplexityMetrics = field(default_factory=FeatureComplexityMetrics)
    feature_relationships: FeatureRelationships = field(default_factory=FeatureRelationships)

    # Automation & Quality
    automation_potential: float = 0.0
    quality_assurance_requirements: List[str] = field(default_factory=list)
    performance_impact_score: float = 0.0

    def __post_init__(self):
        """Initialize derived fields"""
        if not self.contextual_classification:
            self.contextual_classification = ContextualClassification(
                primary_domain=self.primary_domain,
                secondary_specializations=self.secondary_specializations,
                context_factors={}
            )

    def get_classification_summary(self) -> str:
        """Get comprehensive classification summary"""
        domains = [spec.value for spec in self.secondary_specializations[:3]]
        if len(self.secondary_specializations) > 3:
            domains.append(f"+{len(self.secondary_specializations)-3} more")

        roles = [role.value for role in self.target_roles[:2]]
        if len(self.target_roles) > 2:
            roles.append(f"+{len(self.target_roles)-2} more")

        complexity = self.complexity_metrics.get_complexity_category()

        return (f"{self.primary_domain.value} | {', '.join(domains)} | "
                f"{self.required_expertise_level.value} | {complexity} | "
                f"{', '.join(roles)}")

    def is_role_applicable(self, role: RANExpertRole) -> bool:
        """Check if classification applies to specific role"""
        return role in self.target_roles

    def calculate_expertise_match_score(self, expertise: ExpertiseLevel) -> float:
        """Calculate expertise level match score"""
        level_mapping = {
            ExpertiseLevel.L1_AWARENESS: 1,
            ExpertiseLevel.L2_CONFIGURATION: 2,
            ExpertiseLevel.L3_OPTIMIZATION: 3,
            ExpertiseLevel.L4_TROUBLESHOOTING: 4,
            ExpertiseLevel.L5_ARCHITECTURE: 5
        }

        required_level = level_mapping[self.required_expertise_level]
        user_level = level_mapping[expertise]

        if user_level >= required_level:
            return 1.0
        elif user_level == required_level - 1:
            return 0.7
        else:
            return 0.3


class UltraGranularClassifier:
    """Ultra-granular classification engine for RAN features"""

    def __init__(self):
        self.domain_keywords = self._build_domain_keywords()
        self.specialization_patterns = self._build_specialization_patterns()
        self.complexity_calculators = self._initialize_complexity_calculators()

    def classify_feature(self, feature_data: Dict[str, Any]) -> UltraGranularClassification:
        """Classify a RAN feature with ultra-granular precision"""

        # Extract basic information
        name = feature_data.get('name', '').lower()
        description = feature_data.get('description', '').lower()
        summary = feature_data.get('summary', '').lower()

        combined_text = f"{name} {description} {summary}"

        # Determine primary domain
        primary_domain = self._classify_primary_domain(combined_text)

        # Determine secondary specializations
        secondary_specializations = self._classify_secondary_specializations(combined_text, primary_domain)

        # Determine expertise requirements
        expertise_level = self._determine_expertise_level(feature_data)

        # Determine target roles
        target_roles = self._determine_target_roles(combined_text, expertise_level)

        # Calculate complexity metrics
        complexity_metrics = self._calculate_complexity_metrics(feature_data)

        # Determine applicable scenarios
        scenarios = self._determine_use_case_scenarios(combined_text)

        # Extract feature relationships
        relationships = self._extract_feature_relationships(feature_data)

        # Create contextual classification
        context_classification = ContextualClassification(
            primary_domain=primary_domain,
            secondary_specializations=secondary_specializations,
            context_factors=self._extract_context_factors(combined_text)
        )

        return UltraGranularClassification(
            primary_domain=primary_domain,
            secondary_specializations=secondary_specializations,
            tertiary_keywords=self._extract_tertiary_keywords(combined_text),
            required_expertise_level=expertise_level,
            target_roles=target_roles,
            applicable_scenarios=scenarios,
            contextual_classification=context_classification,
            complexity_metrics=complexity_metrics,
            feature_relationships=relationships,
            automation_potential=self._calculate_automation_potential(feature_data),
            quality_assurance_requirements=self._extract_qa_requirements(feature_data),
            performance_impact_score=self._calculate_performance_impact(feature_data)
        )

    def _build_domain_keywords(self) -> Dict[PrimaryDomain, List[str]]:
        """Build keyword mappings for primary domains"""
        return {
            PrimaryDomain.RADIO_ACCESS_TECHNOLOGIES: [
                'lte', 'nr', '5g', '4g', 'rat', 'frequency', 'spectrum', 'coverage',
                'cell', 'sector', 'antenna', 'transmission', 'reception'
            ],
            PrimaryDomain.NETWORK_PERFORMANCE: [
                'throughput', 'capacity', 'latency', 'delay', 'qos', 'kpi', 'performance',
                'load', 'congestion', 'traffic', 'optimization', 'throughput'
            ],
            PrimaryDomain.ENERGY_EFFICIENCY: [
                'energy', 'power', 'sleep', 'efficiency', 'consumption', 'green',
                'battery', 'sustainability', 'saving', 'reduction'
            ],
            PrimaryDomain.MOBILITY_MANAGEMENT: [
                'handover', 'mobility', 'handoff', 'cell', 'reselection', 'movement',
                'roaming', 'transition', 'seamless', 'ping-pong'
            ],
            PrimaryDomain.ADVANCED_FEATURES: [
                'mimo', 'carrier aggregation', 'ca', 'beamforming', 'massive', 'mu-mimo',
                'su-mimo', 'tm', 'carrier', 'component', 'slicing'
            ],
            PrimaryDomain.QUALITY_ASSURANCE: [
                'test', 'verification', 'validation', 'quality', 'assurance', 'alarm',
                'fault', 'troubleshoot', 'diagnostic', 'monitoring', 'measurement'
            ],
            PrimaryDomain.NETWORK_AUTOMATION: [
                'automation', 'son', 'self-organizing', 'zero-touch', 'policy',
                'script', 'workflow', 'orchestration', 'anomaly', 'prediction'
            ],
            PrimaryDomain.EVOLUTION_MIGRATION: [
                'migration', 'evolution', 'upgrade', 'transition', 'legacy',
                'compatibility', 'decommission', 'introduction', 'hybrid'
            ]
        }

    def _build_specialization_patterns(self) -> Dict[SecondarySpecialization, List[str]]:
        """Build pattern mappings for secondary specializations"""
        return {
            SecondarySpecialization.DEEP_SLEEP_MODES: [
                'deep sleep', 'deep-sleep', 'deepsleep', 'micro sleep', 'symbol sleep'
            ],
            SecondarySpecialization.LIGHT_SLEEP_MODES: [
                'light sleep', 'light-sleep', 'shallow sleep', 'quick sleep'
            ],
            SecondarySpecialization.DYNAMIC_SLEEP: [
                'dynamic sleep', 'adaptive sleep', 'intelligent sleep', 'smart sleep'
            ],
            SecondarySpecialization.MU_MIMO: [
                'mu-mimo', 'multi-user', 'mimo mu', 'multiuser mimo'
            ],
            SecondarySpecialization.MASSIVE_MIMO: [
                'massive mimo', 'mimo massive', 'large scale mimo', 'ls-mimo'
            ],
            SecondarySpecialization.BEAMFORMING: [
                'beamforming', 'beam forming', 'beam', 'precoding', 'weighting'
            ],
            SecondarySpecialization.INTRA_FREQUENCY_HANDOVER: [
                'intra-frequency handover', 'intra freq', 'same frequency handover'
            ],
            SecondarySpecialization.INTER_FREQUENCY_HANDOVER: [
                'inter-frequency handover', 'inter freq', 'different frequency handover'
            ],
            SecondarySpecialization.INTER_RAT_HANDOVER: [
                'inter-rat', 'inter radio', 'lte to nr', 'nr to lte', 'rat handover'
            ],
            SecondarySpecialization.NETWORK_SLICING: [
                'network slicing', 'slicing', 'slice', 'network slice'
            ],
            SecondarySpecialization.SELF_ORGANIZING_NETWORKS: [
                'son', 'self-organizing', 'self organizing', 'self-optimizing'
            ],
            SecondarySpecialization.ZERO_TOUCH_DEPLOYMENT: [
                'zero touch', 'zero-touch', 'touchless', 'automated deployment'
            ],
            # Add more patterns as needed...
        }

    def _initialize_complexity_calculators(self) -> Dict[str, Any]:
        """Initialize complexity calculation parameters"""
        return {
            'parameter_weights': {
                'configuration': 0.3,
                'monitoring': 0.2,
                'optimization': 0.3,
                'troubleshooting': 0.2
            },
            'complexity_indicators': {
                'high': ['complex', 'advanced', 'expert', 'sophisticated'],
                'medium': ['moderate', 'intermediate', 'configurable'],
                'low': ['simple', 'basic', 'straightforward']
            }
        }

    def _classify_primary_domain(self, text: str) -> PrimaryDomain:
        """Classify primary domain from text"""
        domain_scores = {}

        for domain, keywords in self.domain_keywords.items():
            score = sum(1 for keyword in keywords if keyword in text)
            domain_scores[domain] = score

        if not domain_scores or max(domain_scores.values()) == 0:
            return PrimaryDomain.ADVANCED_FEATURES  # Default

        return max(domain_scores, key=domain_scores.get)

    def _classify_secondary_specializations(self, text: str, primary_domain: PrimaryDomain) -> List[SecondarySpecialization]:
        """Classify secondary specializations"""
        applicable_specializations = []

        # Filter specializations by primary domain relevance
        domain_specializations = self._get_specializations_for_domain(primary_domain)

        for specialization in domain_specializations:
            patterns = self.specialization_patterns.get(specialization, [])
            if any(pattern in text for pattern in patterns):
                applicable_specializations.append(specialization)

        return applicable_specializations

    def _get_specializations_for_domain(self, domain: PrimaryDomain) -> List[SecondarySpecialization]:
        """Get relevant specializations for a primary domain"""
        domain_mapping = {
            PrimaryDomain.RADIO_ACCESS_TECHNOLOGIES: [
                SecondarySpecialization.LTE_ADVANCED,
                SecondarySpecialization.NR_MILLOWAVE,
                SecondarySpecialization.TDD_FDD,
                SecondarySpecialization.COVERAGE_OPTIMIZATION,
                SecondarySpecialization.CAPACITY_EXPANSION
            ],
            PrimaryDomain.ENERGY_EFFICIENCY: [
                SecondarySpecialization.DEEP_SLEEP_MODES,
                SecondarySpecialization.LIGHT_SLEEP_MODES,
                SecondarySpecialization.DYNAMIC_SLEEP,
                SecondarySpecialization.NETWORK_SLEEP,
                SecondarySpecialization.POWER_SCALING
            ],
            PrimaryDomain.MOBILITY_MANAGEMENT: [
                SecondarySpecialization.INTRA_FREQUENCY_HANDOVER,
                SecondarySpecialization.INTER_FREQUENCY_HANDOVER,
                SecondarySpecialization.INTER_RAT_HANDOVER,
                SecondarySpecialization.CELL_RESELECTION,
                SecondarySpecialization.MOBILITY_ROBUSTNESS
            ],
            PrimaryDomain.ADVANCED_FEATURES: [
                SecondarySpecialization.SU_MIMO,
                SecondarySpecialization.MU_MIMO,
                SecondarySpecialization.MASSIVE_MIMO,
                SecondarySpecialization.BEAMFORMING,
                SecondarySpecialization.INTRA_BAND_CA,
                SecondarySpecialization.INTER_BAND_CA,
                SecondarySpecialization.NETWORK_SLICING
            ],
            PrimaryDomain.NETWORK_AUTOMATION: [
                SecondarySpecialization.ZERO_TOUCH_DEPLOYMENT,
                SecondarySpecialization.SELF_ORGANIZING_NETWORKS,
                SecondarySpecialization.SCRIPTED_OPTIMIZATION,
                SecondarySpecialization.ANOMALY_DETECTION
            ],
            # Add mappings for other domains...
        }

        return domain_mapping.get(domain, [])

    def _determine_expertise_level(self, feature_data: Dict[str, Any]) -> ExpertiseLevel:
        """Determine required expertise level"""

        # Count complexity indicators
        description = feature_data.get('description', '').lower()
        summary = feature_data.get('summary', '').lower()
        combined_text = f"{description} {summary}"

        param_count = len(feature_data.get('parameters', []))
        counter_count = len(feature_data.get('counters', []))

        complexity_indicators = {
            'basic': ['simple', 'basic', 'straightforward', 'easy'],
            'intermediate': ['configurable', 'moderate', 'flexible'],
            'advanced': ['complex', 'advanced', 'sophisticated'],
            'expert': ['expert', 'specialized', 'intricate', 'comprehensive']
        }

        expertise_score = 0

        # Text-based indicators
        for level, indicators in complexity_indicators.items():
            if any(indicator in combined_text for indicator in indicators):
                if level == 'basic':
                    expertise_score += 1
                elif level == 'intermediate':
                    expertise_score += 2
                elif level == 'advanced':
                    expertise_score += 3
                elif level == 'expert':
                    expertise_score += 4

        # Parameter complexity
        if param_count > 20:
            expertise_score += 2
        elif param_count > 10:
            expertise_score += 1
        elif param_count > 5:
            expertise_score += 0.5

        # Monitoring complexity
        if counter_count > 15:
            expertise_score += 1
        elif counter_count > 8:
            expertise_score += 0.5

        # Determine expertise level
        if expertise_score >= 5:
            return ExpertiseLevel.L5_ARCHITECTURE
        elif expertise_score >= 4:
            return ExpertiseLevel.L4_TROUBLESHOOTING
        elif expertise_score >= 3:
            return ExpertiseLevel.L3_OPTIMIZATION
        elif expertise_score >= 2:
            return ExpertiseLevel.L2_CONFIGURATION
        else:
            return ExpertiseLevel.L1_AWARENESS

    def _determine_target_roles(self, text: str, expertise: ExpertiseLevel) -> List[RANExpertRole]:
        """Determine target roles for the feature"""
        roles = []

        # Role-specific keywords
        role_keywords = {
            RANExpertRole.RADIO_ACCESS_PLANNER: ['plan', 'design', 'architecture', 'coverage', 'capacity'],
            RANExpertRole.PERFORMANCE_SPECIALIST: ['performance', 'optimization', 'kpi', 'throughput', 'latency'],
            RANExpertRole.FIELD_ENGINEER: ['deployment', 'configuration', 'maintenance', 'site'],
            RANExpertRole.AUTOMATION_ENGINEER: ['automation', 'script', 'son', 'zero-touch'],
            RANExpertRole.TROUBLESHOOTING_EXPERT: ['troubleshoot', 'fault', 'alarm', 'diagnostic'],
            RANExpertRole.ENERGY_MANAGER: ['energy', 'power', 'efficiency', 'consumption', 'green'],
            RANExpertRole.QUALITY_ASSURANCE_ENGINEER: ['test', 'verification', 'quality', 'assurance'],
            RANExpertRole.NETWORK_ARCHITECT: ['architecture', 'design', 'strategy', 'evolution']
        }

        for role, keywords in role_keywords.items():
            if any(keyword in text for keyword in keywords):
                roles.append(role)

        # Add roles based on expertise level
        if expertise in [ExpertiseLevel.L4_TROUBLESHOOTING, ExpertiseLevel.L5_ARCHITECTURE]:
            if RANExpertRole.TROUBLESHOOTING_EXPERT not in roles:
                roles.append(RANExpertRole.TROUBLESHOOTING_EXPERT)

        if expertise == ExpertiseLevel.L5_ARCHITECTURE:
            if RANExpertRole.NETWORK_ARCHITECT not in roles:
                roles.append(RANExpertRole.NETWORK_ARCHITECT)

        return roles if roles else [RANExpertRole.FIELD_ENGINEER]  # Default role

    def _determine_use_case_scenarios(self, text: str) -> List[UseCaseScenario]:
        """Determine applicable use case scenarios"""
        scenarios = []

        scenario_keywords = {
            UseCaseScenario.NETWORK_PLANNING: ['plan', 'design', 'dimensioning', 'rollout'],
            UseCaseScenario.FEATURE_DEPLOYMENT: ['deploy', 'activate', 'configure', 'setup'],
            UseCaseScenario.PERFORMANCE_OPTIMIZATION: ['optimize', 'tune', 'improve', 'enhance'],
            UseCaseScenario.MAINTENANCE: ['maintain', 'operate', 'run', 'manage'],
            UseCaseScenario.TROUBLESHOOTING: ['troubleshoot', 'debug', 'fix', 'resolve'],
            UseCaseScenario.CAPACITY_EXPANSION: ['capacity', 'expand', 'scale', 'growth'],
            UseCaseScenario.TECHNOLOGY_UPGRADE: ['upgrade', 'migrate', 'evolve', 'transition'],
            UseCaseScenario.ENERGY_OPTIMIZATION: ['energy', 'power', 'efficiency', 'consumption']
        }

        for scenario, keywords in scenario_keywords.items():
            if any(keyword in text for keyword in keywords):
                scenarios.append(scenario)

        return scenarios if scenarios else [UseCaseScenario.FEATURE_DEPLOYMENT]

    def _calculate_complexity_metrics(self, feature_data: Dict[str, Any]) -> FeatureComplexityMetrics:
        """Calculate detailed complexity metrics"""

        param_count = len(feature_data.get('parameters', []))
        counter_count = len(feature_data.get('counters', []))
        event_count = len(feature_data.get('events', []))

        # Base complexity calculations
        config_complexity = min(10.0, param_count / 5.0 + event_count / 10.0)
        operational_complexity = min(10.0, counter_count / 8.0 + param_count / 10.0)
        integration_complexity = 5.0  # Default, can be refined based on dependencies
        troubleshooting_complexity = min(10.0, counter_count / 5.0 + event_count / 5.0)

        # Automation readiness
        automation_ready = len(feature_data.get('automation_capabilities', [])) > 0
        automation_score = 0.8 if automation_ready else 0.3

        # Determine expertise level based on complexities
        avg_complexity = (config_complexity + operational_complexity +
                         integration_complexity + troubleshooting_complexity) / 4.0

        if avg_complexity >= 8.0:
            expertise = ExpertiseLevel.L5_ARCHITECTURE
        elif avg_complexity >= 6.0:
            expertise = ExpertiseLevel.L4_TROUBLESHOOTING
        elif avg_complexity >= 4.0:
            expertise = ExpertiseLevel.L3_OPTIMIZATION
        elif avg_complexity >= 2.0:
            expertise = ExpertiseLevel.L2_CONFIGURATION
        else:
            expertise = ExpertiseLevel.L1_AWARENESS

        # Estimate learning time (hours)
        learning_time = int(avg_complexity * 8)  # 8 hours per complexity point

        return FeatureComplexityMetrics(
            configuration_complexity=config_complexity,
            operational_complexity=operational_complexity,
            integration_complexity=integration_complexity,
            troubleshooting_complexity=troubleshooting_complexity,
            automation_readiness=automation_score,
            expertise_required=expertise,
            estimated_learning_time_hours=learning_time,
            prerequisite_feature_count=0,  # To be calculated based on relationships
            dependency_depth=0  # To be calculated based on relationships
        )

    def _extract_feature_relationships(self, feature_data: Dict[str, Any]) -> FeatureRelationships:
        """Extract feature relationships"""

        # This is a placeholder - in real implementation, this would parse
        # the dependencies, conflicts, and related features from the documentation
        dependencies = feature_data.get('dependencies', {})

        return FeatureRelationships(
            prerequisites=dependencies.get('prerequisites', []),
            dependencies=dependencies.get('related', []),
            conflicts_with=dependencies.get('conflicts', []),
            complements=[],  # To be extracted from documentation
            enhances=[],     # To be extracted from documentation
            deprecated_by=[], # To be extracted from documentation
            alternative_to=[] # To be extracted from documentation
        )

    def _extract_tertiary_keywords(self, text: str) -> List[str]:
        """Extract tertiary keywords for fine-grained classification"""

        # Extract technical terms and acronyms
        technical_terms = re.findall(r'\b[A-Z]{2,}\b', text)  # Acronyms
        technical_terms.extend(re.findall(r'\b[a-z]+[A-Z][a-zA-Z]*\b', text))  # CamelCase

        # Extract specific technical keywords
        technical_keywords = [
            'throughput', 'latency', 'capacity', 'coverage', 'interference',
            'optimization', 'configuration', 'activation', 'deactivation',
            'monitoring', 'measurement', 'performance', 'quality', 'reliability'
        ]

        for keyword in technical_keywords:
            if keyword in text:
                technical_terms.append(keyword)

        return list(set(technical_terms))  # Remove duplicates

    def _extract_context_factors(self, text: str) -> Dict[ContextFactor, Any]:
        """Extract context factors from text"""
        context_factors = {}

        # Network size indicators
        if any(word in text for word in ['small cell', 'enterprise', 'campus']):
            context_factors[ContextFactor.NETWORK_SIZE] = NetworkSize.SMALL_CELL
        elif any(word in text for word in ['urban', 'metro', 'city']):
            context_factors[ContextFactor.NETWORK_SIZE] = NetworkSize.URBAN_CLUSTER
        elif any(word in text for word in ['regional', 'county', 'province']):
            context_factors[ContextFactor.NETWORK_SIZE] = NetworkSize.REGIONAL_NETWORK
        else:
            context_factors[ContextFactor.NETWORK_SIZE] = NetworkSize.NATIONAL_NETWORK

        # Deployment phase indicators
        if any(word in text for word in ['plan', 'design', 'dimensioning']):
            context_factors[ContextFactor.DEPLOYMENT_PHASE] = DeploymentPhase.PLANNING
        elif any(word in text for word in ['deploy', 'install', 'setup']):
            context_factors[ContextFactor.DEPLOYMENT_PHASE] = DeploymentPhase.DEPLOYMENT
        elif any(word in text for word in ['optimize', 'tune', 'improve']):
            context_factors[ContextFactor.DEPLOYMENT_PHASE] = DeploymentPhase.OPTIMIZATION
        elif any(word in text for word in ['maintain', 'operate', 'run']):
            context_factors[ContextFactor.DEPLOYMENT_PHASE] = DeploymentPhase.MAINTENANCE
        else:
            context_factors[ContextFactor.DEPLOYMENT_PHASE] = DeploymentPhase.EVOLUTION

        return context_factors

    def _calculate_automation_potential(self, feature_data: Dict[str, Any]) -> float:
        """Calculate automation potential score"""

        automation_score = 0.0

        # Check for automation-related keywords
        automation_keywords = [
            'automatic', 'auto', 'self', 'zero-touch', 'son',
            'script', 'policy', 'orchestration'
        ]

        text = f"{feature_data.get('description', '')} {feature_data.get('summary', '')}".lower()

        for keyword in automation_keywords:
            if keyword in text:
                automation_score += 0.2

        # Parameter automation potential
        param_count = len(feature_data.get('parameters', []))
        if param_count > 0:
            automation_score += min(0.3, param_count / 50.0)

        # Monitoring automation potential
        counter_count = len(feature_data.get('counters', []))
        if counter_count > 0:
            automation_score += min(0.2, counter_count / 30.0)

        return min(1.0, automation_score)

    def _extract_qa_requirements(self, feature_data: Dict[str, Any]) -> List[str]:
        """Extract quality assurance requirements"""

        qa_requirements = []

        text = f"{feature_data.get('description', '')} {feature_data.get('summary', '')}".lower()

        qa_indicators = {
            'testing': ['test', 'testing', 'verification', 'validation'],
            'monitoring': ['monitor', 'measure', 'observe', 'track'],
            'reporting': ['report', 'log', 'audit', 'documentation'],
            'performance': ['performance', 'kpi', 'throughput', 'latency'],
            'compatibility': ['compatibility', 'integration', 'interoperability']
        }

        for requirement, indicators in qa_indicators.items():
            if any(indicator in text for indicator in indicators):
                qa_requirements.append(requirement)

        return qa_requirements

    def _calculate_performance_impact(self, feature_data: Dict[str, Any]) -> float:
        """Calculate performance impact score"""

        impact_score = 0.0

        text = f"{feature_data.get('description', '')} {feature_data.get('summary', '')}".lower()

        # Performance impact indicators
        high_impact_words = ['significant', 'major', 'substantial', 'dramatic']
        medium_impact_words = ['moderate', 'noticeable', 'measurable']
        low_impact_words = ['minor', 'slight', 'minimal']

        for word in high_impact_words:
            if word in text:
                impact_score += 0.8

        for word in medium_impact_words:
            if word in text:
                impact_score += 0.5

        for word in low_impact_words:
            if word in text:
                impact_score += 0.2

        # Parameter and counter impact
        param_count = len(feature_data.get('parameters', []))
        counter_count = len(feature_data.get('counters', []))

        impact_score += min(0.2, param_count / 30.0)
        impact_score += min(0.2, counter_count / 20.0)

        return min(1.0, impact_score)