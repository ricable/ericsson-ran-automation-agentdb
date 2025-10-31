"""
Enhanced Technology Domain Detection

This module implements an enhanced TechnologyDomainDetector class that provides
both basic and advanced technology domain detection capabilities for Ericsson
RAN features, with configurable detection sensitivity and multi-technology support.

The detector combines pattern-based analysis with confidence scoring and
contextual analysis for accurate domain identification.
"""

import re
from typing import Dict, List, Tuple, Optional, Set, Any
from collections import defaultdict
from enum import Enum
from dataclasses import dataclass

from models import EnhancedEricssonFeature, DomainDetection, TechnologyDomain


class DetectionSensitivity(Enum):
    """Detection sensitivity levels"""
    CONSERVATIVE = "conservative"  # High confidence threshold, fewer false positives
    BALANCED = "balanced"         # Moderate confidence threshold
    AGGRESSIVE = "aggressive"     # Low confidence threshold, more detections


class TechnologyScope(Enum):
    """Technology analysis scope"""
    BASIC = "basic"               # Single primary domain only
    MULTI_TECH = "multi_tech"     # Multiple domains with relevance scores
    COMPREHENSIVE = "comprehensive" # Full analysis with sub-domains


@dataclass
class TechnologyIndicators:
    """Technology domain indicators with confidence scores"""
    domain: TechnologyDomain
    keyword_score: float = 0.0
    parameter_score: float = 0.0
    counter_score: float = 0.0
    feature_score: float = 0.0
    network_element_score: float = 0.0
    contextual_score: float = 0.0

    @property
    def total_score(self) -> float:
        """Calculate total confidence score"""
        return (self.keyword_score * 0.4 +
                self.parameter_score * 0.25 +
                self.counter_score * 0.2 +
                self.feature_score * 0.1 +
                self.network_element_score * 0.05)

    @property
    def evidence_count(self) -> int:
        """Count evidence types with non-zero scores"""
        return sum(1 for score in [
            self.keyword_score, self.parameter_score, self.counter_score,
            self.feature_score, self.network_element_score
        ] if score > 0)


@dataclass
class EnhancedDomainDetection(DomainDetection):
    """Enhanced domain detection with detailed analysis"""
    indicators: TechnologyIndicators = None
    sub_domains: List[str] = None
    cross_technology_indicators: List[str] = None
    confidence_factors: Dict[str, float] = None

    def __post_init__(self):
        """Initialize default values"""
        if self.sub_domains is None:
            self.sub_domains = []
        if self.cross_technology_indicators is None:
            self.cross_technology_indicators = []
        if self.confidence_factors is None:
            self.confidence_factors = {}

    @property
    def is_primary_domain(self) -> bool:
        """Check if this is the primary technology domain"""
        return self.indicators and self.indicators.total_score >= 0.5

    @property
    def evidence_strength(self) -> str:
        """Get evidence strength classification"""
        if not self.indicators:
            return "none"
        if self.indicators.evidence_count >= 4:
            return "strong"
        elif self.indicators.evidence_count >= 2:
            return "moderate"
        elif self.indicators.evidence_count >= 1:
            return "weak"
        else:
            return "none"


class TechnologyDomainDetector:
    """
    Enhanced technology domain detection with configurable sensitivity and scope.

    Features:
    - Configurable detection sensitivity (conservative ↔ aggressive)
    - Multi-technology detection with relevance scoring
    - Contextual analysis for cross-technology features
    - Confidence scoring with evidence tracking
    - Sub-domain identification for detailed analysis
    """

    def __init__(self,
                 sensitivity: DetectionSensitivity = DetectionSensitivity.BALANCED,
                 scope: TechnologyScope = TechnologyScope.MULTI_TECH,
                 enable_cross_technology: bool = True):
        """
        Initialize the technology domain detector.

        Args:
            sensitivity: Detection sensitivity level
            scope: Analysis scope (basic, multi-tech, comprehensive)
            enable_cross_technology: Enable cross-technology analysis
        """
        self.sensitivity = sensitivity
        self.scope = scope
        self.enable_cross_technology = enable_cross_technology

        # Initialize detection patterns
        self._init_technology_indicators()
        self._init_detection_patterns()
        self._init_sensitivity_thresholds()
        self._init_cross_technology_patterns()

    def _init_technology_indicators(self):
        """Initialize comprehensive technology indicators"""
        self.technology_indicators = {
            TechnologyDomain.LTE: {
                'keywords': [
                    'lte', 'enodeb', 'e-utran', 'fdd', 'tdd', 'e-utran',
                    'eutran', 'eutrancell', 'e-ran', '4g', 'long term evolution',
                    'volte', 'carrier aggregation', 'lte advanced', 'lte-a'
                ],
                'parameters': [
                    'eutrancell', 'eutrancellfdd', 'eutrancelltdd', 'enodebfunction',
                    'enodeb', 'eutran', 'cellfdd', 'celltdd', 'eutrancellfdd',
                    'eutrancelltdd', 'enodebfunction', 'enodeb', 'eutran'
                ],
                'counters': [
                    'pmcell', 'pmeutran', 'pmeutrancell', 'pmenodeb',
                    'e-utran', 'eutran', 'pmrach', 'pmmac', 'pmrlc', 'pmpdcp'
                ],
                'features': [
                    'volte', 'carrier aggregation', 'lte advanced', 'lte-a',
                    'tm[3-7]', 'enb', 'e-nodeb'
                ],
                'network_elements': [
                    'baseband 66\d+', 'enodeb', 'e-utran',
                    'radio.*processor.*6\d{3}'
                ],
                'sub_domains': [
                    'lte-advanced', 'volte', 'carrier-aggregation', 'tdd', 'fdd'
                ]
            },
            TechnologyDomain.NR: {
                'keywords': [
                    'nr', '5g', 'gnodeb', 'ng-ran', 'sa', 'nsa', 'new radio',
                    'gnb', 'gnodeb', 'nrcell', 'nr-nsa', 'nr-sa',
                    'massive mimo', 'beamforming', 'network slicing', 'urlc',
                    'mimo', 'nr ca', 'nr dual connectivity', 'mmwave'
                ],
                'parameters': [
                    'nrcell', 'nrcelldu', 'gnbdu', 'gnbcucp', 'gnbcuup',
                    'gnb', 'nr', 'newradio', 'bwp', 'numerology', 'scs',
                    'csi', 'srs', 'nrcelldu', 'gnbdu', 'gnbcucp', 'gnbcuup'
                ],
                'counters': [
                    'pmnr', 'pmgnb', 'pmnrcell', 'pmgnbdu',
                    'nr', 'new radio', 'pmcsi', 'pmdci', 'pmbwp',
                    'pmnumerology'
                ],
                'features': [
                    'massive mimo', 'beamforming', 'network slicing', 'urlc',
                    'mimo', 'nr ca', 'nr dual connectivity', '5g',
                    'new radio', 'mmwave', 'numerology'
                ],
                'network_elements': [
                    'baseband.*6\d{3}', 'gnodeb', 'ng-?ran',
                    'radio.*system.*6\d{3}'
                ],
                'sub_domains': [
                    'nr-sa', 'nr-nsa', 'mmwave', 'beamforming', 'network-slicing',
                    'massive-mimo'
                ]
            },
            TechnologyDomain.LTE_NR: {
                'keywords': [
                    'en-dc', 'lte-nr', 'dual connectivity', 'en-dc',
                    'eutra-nr', 'multi-rat', 'inter-rat', 'lte-nr dual connectivity',
                    'mr-dc', 'multi-connectivity'
                ],
                'parameters': [
                    'endc', 'en-dc', 'lte-nr', 'dualconnectivity',
                    'eutra-nr', 'mrdc', 'multi-connectivity'
                ],
                'counters': [
                    'pmendc', 'pmen-?dc', 'pmlte-?nr',
                    'pmdualconnectivity', 'pmmrdc'
                ],
                'features': [
                    'en-dc', 'lte-nr dual connectivity', 'multi-rat',
                    'inter-technology handover', 'mr-dc', 'dual connectivity'
                ],
                'network_elements': [
                    'dual.*connectivity', 'multi-?standard',
                    'inter-?technology'
                ],
                'sub_domains': [
                    'en-dc', 'en-dc', 'lte-nr', 'mr-dc', 'dual-connectivity'
                ]
            },
            TechnologyDomain.GSM: {
                'keywords': [
                    'gsm', 'bts', 'bss', 'base station', '2g', 'geran',
                    'base transceiver station', 'edge', 'gprs'
                ],
                'parameters': [
                    'bts', 'bss', 'gsmcell', 'geran', 'gsm',
                    'arfcn', 'bcch', 'pdch'
                ],
                'counters': [
                    'pmgsm', 'pmbts', 'pmgeran', 'gsm',
                    'pmgsmcell', 'pmarfcn', 'pmrxlev', 'pmcqich'
                ],
                'features': [
                    'gsm', 'edge', 'gprs', '2g technologies',
                    'arfcn', 'bcch', 'pdch'
                ],
                'network_elements': [
                    'bts', 'rbs', 'base station',
                    'radio.*base.*station'
                ],
                'sub_domains': [
                    'gsm', 'edge', 'gprs', '2g'
                ]
            },
            TechnologyDomain.IoT: {
                'keywords': [
                    'iot', 'nb-iot', 'cat-m', 'catm', 'nbiot',
                    'internet of things', 'lte-m', 'emtc', 'lpwa',
                    'narrowband', 'nb-iot'
                ],
                'parameters': [
                    'iot', 'nbiot', 'catm', 'ltem', 'emtc',
                    'narrowband', 'nb-iot', 'ce', 'coverage-?enhancement'
                ],
                'counters': [
                    'iot', 'nbiot', 'catm', 'emtc',
                    'pmnb-?iot', 'pmce', 'pmcoverage-?enhancement'
                ],
                'features': [
                    'nb-iot', 'cat-m', 'iot optimization', 'lpwa',
                    'coverage enhancement', 'ce'
                ],
                'network_elements': [
                    'iot.*gateway', 'nb-?iot.*base',
                    'cat-?m.*radio'
                ],
                'sub_domains': [
                    'nb-iot', 'cat-m', 'emtc', 'lpwa', 'iot'
                ]
            }
        }

    def _init_detection_patterns(self):
        """Initialize regex patterns for detection"""
        self.parameter_patterns = {
            TechnologyDomain.LTE: [
                r'eutrancell', r'enodeb', r'cellfdd', r'celltdd', r'eutran',
                r'eutran', r'rach', r'pmi', r'ri', r'cqi'
            ],
            TechnologyDomain.NR: [
                r'nrcell', r'gnb', r'gnbdu', r'gnbcu', r'nr',
                r'bwp', r'numerology', r'scs', r'csi', r'srs',
                r'csi-rs', r'dm-rs', r'tr-state'
            ],
            TechnologyDomain.LTE_NR: [
                r'endc', r'en-?dc', r'ltenr', r'dualconnectivity',
                r'mr-?rat', r'multi-?rat', r'mrdc'
            ],
            TechnologyDomain.GSM: [
                r'bts', r'bss', r'geran', r'gsmcell', r'gsm',
                r'arfcn', r'bcch', r'pdch', r'hsdpa', r'hsupa'
            ],
            TechnologyDomain.IoT: [
                r'iot', r'nbiot', r'cat-?m', r'emtc', r'nb-?iot',
                r'ce', r'coverage-?enhancement', r'npss', r'nsi'
            ]
        }

        self.counter_patterns = {
            TechnologyDomain.LTE: [
                r'pm(eutrancell|enodeb|eutran)', r'pmcell',
                r'pmrach', r'pmmac', r'pmrlc', r'pmpdcp'
            ],
            TechnologyDomain.NR: [
                r'pm(nrcell|gnb|gnbdu)', r'pmnr',
                r'pmcsi', r'pmdci', r'pmbwp', r'pmnumerology'
            ],
            TechnologyDomain.LTE_NR: [
                r'pmendc', r'pmen-?dc', r'pmlte-?nr',
                r'pmdualconnectivity'
            ],
            TechnologyDomain.GSM: [
                r'pm(gsm|bts|bss|geran)', r'pmgsmcell',
                r'pmarfcn', r'pmrxlev', r'pmcqich'
            ],
            TechnologyDomain.IoT: [
                r'pm(iot|nbiot|cat-?m|emtc)', r'pmnb-?iot',
                r'pmce', r'pmcoverage-?enhancement'
            ]
        }

    def _init_sensitivity_thresholds(self):
        """Initialize confidence thresholds based on sensitivity"""
        self.thresholds = {
            DetectionSensitivity.CONSERVATIVE: {
                'min_confidence': 0.4,
                'primary_threshold': 0.7,
                'secondary_threshold': 0.5,
                'evidence_requirement': 2
            },
            DetectionSensitivity.BALANCED: {
                'min_confidence': 0.2,
                'primary_threshold': 0.5,
                'secondary_threshold': 0.3,
                'evidence_requirement': 1
            },
            DetectionSensitivity.AGGRESSIVE: {
                'min_confidence': 0.1,
                'primary_threshold': 0.3,
                'secondary_threshold': 0.2,
                'evidence_requirement': 1
            }
        }

    def _init_cross_technology_patterns(self):
        """Initialize cross-technology patterns"""
        self.cross_technology_indicators = {
            'inter_rat_handover': [
                r'inter-?rat', r'rat.*handover', r'inter-?technology',
                r'lte.*to.*nr', r'nr.*to.*lte', r'handover.*rat'
            ],
            'dual_connectivity': [
                r'dual.*connectivity', r'multi.*connectivity',
                r'en-?dc', r'mr-?dc', r'lte-?nr'
            ],
            'shared_spectrum': [
                r'shared.*spectrum', r'dynamic.*spectrum',
                r'license.*assisted', r'citizens.*broadband'
            ],
            'multi_standard': [
                r'multi.*standard', r'hybrid.*network',
                r'legacy.*support', r'backward.*compatible'
            ]
        }

    def detect_domains(self, feature: EnhancedEricssonFeature) -> List[EnhancedDomainDetection]:
        """
        Detect technology domains with enhanced analysis.

        Args:
            feature: EnhancedEricssonFeature to analyze

        Returns:
            List of EnhancedDomainDetection objects with detailed analysis
        """
        # Create comprehensive text corpus
        feature_text = self._create_feature_text_corpus(feature)

        detected_domains = []

        for tech, indicators in self.technology_indicators.items():
            tech_indicators = self._analyze_technology_indicators(
                feature_text, feature, tech, indicators
            )

            # Apply sensitivity filtering
            if self._meets_sensitivity_criteria(tech_indicators):
                # Create enhanced domain detection
                domain_detection = self._create_enhanced_domain_detection(
                    tech, tech_indicators, feature, feature_text
                )
                detected_domains.append(domain_detection)

        # Apply scope filtering and sorting
        if self.scope == TechnologyScope.BASIC:
            # Return only primary domain
            detected_domains = [max(detected_domains,
                                 key=lambda x: x.indicators.total_score)] if detected_domains else []
        else:
            # Sort by relevance and apply limits
            detected_domains.sort(key=lambda x: x.relevance, reverse=True)
            if self.scope == TechnologyScope.MULTI_TECH:
                detected_domains = detected_domains[:3]  # Top 3 domains

        # Ensure at least one domain is detected
        if not detected_domains:
            detected_domains.append(self._create_default_domain_detection())

        return detected_domains

    def _analyze_technology_indicators(self,
                                     text: str,
                                     feature: EnhancedEricssonFeature,
                                     tech: TechnologyDomain,
                                     indicators: Dict[str, List[str]]) -> TechnologyIndicators:
        """Analyze technology indicators for a specific domain"""

        # Keyword matching
        keyword_score = self._calculate_keyword_match_score(
            text, indicators.get('keywords', [])
        )

        # Parameter pattern matching
        param_score = self._calculate_pattern_match_score(
            " ".join(feature.configuration.mo_classes),
            self.parameter_patterns.get(tech, [])
        )

        # Counter pattern matching
        counter_score = self._calculate_pattern_match_score(
            " ".join(feature.performance_monitoring.pm_counters),
            self.counter_patterns.get(tech, [])
        )

        # Feature identity matching
        feature_score = self._calculate_pattern_match_score(
            f"{feature.name} {feature.description}",
            [re.escape(pattern) for pattern in indicators.get('features', [])]
        )

        # Network element matching
        element_score = self._calculate_pattern_match_score(
            " ".join(feature.network_element_types),
            indicators.get('network_elements', [])
        )

        return TechnologyIndicators(
            domain=tech,
            keyword_score=keyword_score,
            parameter_score=param_score,
            counter_score=counter_score,
            feature_score=feature_score,
            network_element_score=element_score
        )

    def _meets_sensitivity_criteria(self, indicators: TechnologyIndicators) -> bool:
        """Check if indicators meet sensitivity criteria"""
        thresholds = self.thresholds[self.sensitivity]

        return (indicators.total_score >= thresholds['min_confidence'] and
                indicators.evidence_count >= thresholds['evidence_requirement'])

    def _create_enhanced_domain_detection(self,
                                        tech: TechnologyDomain,
                                        indicators: TechnologyIndicators,
                                        feature: EnhancedEricssonFeature,
                                        text: str) -> EnhancedDomainDetection:
        """Create enhanced domain detection with detailed analysis"""

        # Calculate relevance
        relevance = indicators.total_score

        # Get evidence
        evidence = self._get_detailed_evidence(indicators, feature, text)

        # Identify sub-domains
        sub_domains = self._identify_sub_domains(tech, text, feature)

        # Cross-technology analysis
        cross_tech_indicators = self._analyze_cross_technology_indicators(text)

        # Confidence factors
        confidence_factors = {
            'keyword_strength': indicators.keyword_score,
            'parameter_support': indicators.parameter_score,
            'monitoring_evidence': indicators.counter_score,
            'feature_identity': indicators.feature_score,
            'network_element_match': indicators.network_element_score
        }

        return EnhancedDomainDetection(
            domain=tech.value,
            relevance=relevance,
            evidence=evidence,
            indicators=indicators,
            sub_domains=sub_domains,
            cross_technology_indicators=cross_tech_indicators,
            confidence_factors=confidence_factors
        )

    def _identify_sub_domains(self,
                            tech: TechnologyDomain,
                            text: str,
                            feature: EnhancedEricssonFeature) -> List[str]:
        """Identify sub-domains within primary technology"""
        if tech not in self.technology_indicators:
            return []

        tech_indicators = self.technology_indicators[tech]
        sub_domains = tech_indicators.get('sub_domains', [])

        identified_sub_domains = []
        for sub_domain in sub_domains:
            if sub_domain.replace('-', ' ') in text or sub_domain in text:
                identified_sub_domains.append(sub_domain)

        return identified_sub_domains

    def _analyze_cross_technology_indicators(self, text: str) -> List[str]:
        """Analyze cross-technology indicators"""
        if not self.enable_cross_technology:
            return []

        cross_indicators = []
        for indicator_type, patterns in self.cross_technology_indicators.items():
            for pattern in patterns:
                if re.search(pattern, text, re.IGNORECASE):
                    cross_indicators.append(indicator_type)
                    break

        return cross_indicators

    def _get_detailed_evidence(self,
                             indicators: TechnologyIndicators,
                             feature: EnhancedEricssonFeature,
                             text: str) -> List[str]:
        """Get detailed evidence for domain detection"""
        evidence = []

        tech_indicators = self.technology_indicators.get(indicators.domain, {})

        # Keyword evidence
        if indicators.keyword_score > 0:
            keywords = tech_indicators.get('keywords', [])
            found_keywords = [kw for kw in keywords if kw in text]
            if found_keywords:
                evidence.append(f"Keywords: {', '.join(found_keywords[:3])}")

        # Parameter evidence
        if indicators.parameter_score > 0:
            param_patterns = self.parameter_patterns.get(indicators.domain, [])
            param_text = " ".join(feature.configuration.mo_classes)
            for pattern in param_patterns[:2]:
                if re.search(pattern, param_text, re.IGNORECASE):
                    evidence.append(f"Parameters: {pattern}")
                    break

        # Counter evidence
        if indicators.counter_score > 0:
            counter_patterns = self.counter_patterns.get(indicators.domain, [])
            counter_text = " ".join(feature.performance_monitoring.pm_counters)
            for pattern in counter_patterns[:2]:
                if re.search(pattern, counter_text, re.IGNORECASE):
                    evidence.append(f"Counters: {pattern}")
                    break

        # Feature identity evidence
        if indicators.feature_score > 0:
            features = tech_indicators.get('features', [])
            feature_text = f"{feature.name} {feature.description}"
            for feature_name in features[:2]:
                if feature_name in feature_text.lower():
                    evidence.append(f"Feature: {feature_name}")
                    break

        # Network element evidence
        if indicators.network_element_score > 0:
            elements = tech_indicators.get('network_elements', [])
            element_text = " ".join(feature.network_element_types)
            for element_pattern in elements[:2]:
                if re.search(element_pattern, element_text, re.IGNORECASE):
                    evidence.append(f"Network elements: {element_pattern}")
                    break

        return evidence

    def _create_default_domain_detection(self) -> EnhancedDomainDetection:
        """Create default domain detection when no specific technology is found"""
        indicators = TechnologyIndicators(
            domain=TechnologyDomain.OTHER,
            keyword_score=0.1,
            contextual_score=0.1
        )

        return EnhancedDomainDetection(
            domain=TechnologyDomain.OTHER.value,
            relevance=0.1,
            evidence=['No specific technology detected'],
            indicators=indicators
        )

    def _create_feature_text_corpus(self, feature: EnhancedEricssonFeature) -> str:
        """Create comprehensive text corpus from all feature components"""
        text_components = [
            feature.name,
            feature.description,
            feature.value_package or "",
            feature.access_type or "",
            feature.licensing,
            " ".join(feature.configuration.mo_classes),
            " ".join(feature.performance_monitoring.pm_counters),
            " ".join(feature.performance_monitoring.trace_events),
            " ".join(feature.prerequisites),
            " ".join(feature.related_features),
            " ".join(feature.conflicting_features),
            " ".join(feature.network_element_types),
            " ".join(feature.hardware_requirements),
            " ".join(feature.network_requirements),
            feature.id  # FAJ number might contain technology hints
        ]

        return " ".join(text_components).lower()

    def _calculate_keyword_match_score(self, text: str, keywords: List[str]) -> float:
        """Calculate keyword matching score"""
        if not keywords:
            return 0.0

        matches = sum(1 for keyword in keywords if keyword in text)
        return min(matches / len(keywords), 1.0)

    def _calculate_pattern_match_score(self, text: str, patterns: List[str]) -> float:
        """Calculate regex pattern matching score"""
        if not patterns:
            return 0.0

        matches = sum(1 for pattern in patterns if re.search(pattern, text, re.IGNORECASE))
        return min(matches / len(patterns), 1.0)

    def detect_primary_domain(self, feature: EnhancedEricssonFeature) -> TechnologyDomain:
        """Detect the primary technology domain for a feature"""
        domains = self.detect_domains(feature)
        if domains:
            primary_domain = domains[0]
            return TechnologyDomain(primary_domain.domain)
        return TechnologyDomain.OTHER

    def is_multi_technology(self, feature: EnhancedEricssonFeature) -> bool:
        """Check if feature spans multiple technology domains"""
        domains = self.detect_domains(feature)
        significant_domains = [d for d in domains if d.is_primary_domain]
        return len(significant_domains) > 1

    def get_technology_distribution(self, features: List[EnhancedEricssonFeature]) -> Dict[str, int]:
        """Get distribution of technology domains across features"""
        domain_counts = defaultdict(int)

        for feature in features:
            domains = self.detect_domains(feature)
            if domains:
                primary_domain = domains[0].domain
                domain_counts[primary_domain] += 1

        return dict(domain_counts)

    def get_cross_technology_features(self, features: List[EnhancedEricssonFeature]) -> List[EnhancedEricssonFeature]:
        """Identify features that span multiple technologies"""
        cross_tech_features = []

        for feature in features:
            if self.is_multi_technology(feature):
                cross_tech_features.append(feature)

        return cross_tech_features

    def set_sensitivity(self, sensitivity: DetectionSensitivity):
        """Update detection sensitivity"""
        self.sensitivity = sensitivity
        self._init_sensitivity_thresholds()

    def set_scope(self, scope: TechnologyScope):
        """Update analysis scope"""
        self.scope = scope

    def batch_detect_domains(self, features: List[EnhancedEricssonFeature]) -> List[List[EnhancedDomainDetection]]:
        """Detect domains for multiple features in batch"""
        return [self.detect_domains(feature) for feature in features]

    def get_detection_statistics(self, features: List[EnhancedEricssonFeature]) -> Dict[str, Any]:
        """Get comprehensive detection statistics"""
        all_detections = []
        multi_tech_count = 0
        evidence_counts = defaultdict(int)

        for feature in features:
            domains = self.detect_domains(feature)
            all_detections.extend(domains)

            if self.is_multi_technology(feature):
                multi_tech_count += 1

            for detection in domains:
                if detection.indicators:
                    evidence_counts[detection.indicators.evidence_count] += 1

        # Calculate statistics
        total_features = len(features)
        domain_distribution = self.get_technology_distribution(features)

        return {
            'total_features': total_features,
            'multi_technology_features': multi_tech_count,
            'multi_tech_percentage': (multi_tech_count / total_features * 100) if total_features > 0 else 0,
            'domain_distribution': domain_distribution,
            'evidence_distribution': dict(evidence_counts),
            'average_detections_per_feature': len(all_detections) / total_features if total_features > 0 else 0,
            'detection_sensitivity': self.sensitivity.value,
            'analysis_scope': self.scope.value
        }