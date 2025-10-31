"""
Technology Domain Detection

This module implements the TechnologyDomainDetector class for identifying
LTE, NR, GSM, and other technology domains in Ericsson RAN features.
"""

import re
from typing import Dict, List, Tuple, Optional
from collections import defaultdict

from models import EnhancedEricssonFeature, DomainDetection, TechnologyDomain


class TechnologyDomainDetector:
    """
    Advanced technology domain detection for Ericsson RAN features.

    Detects technology domains with high accuracy using:
    - Keyword pattern matching
    - Parameter type analysis
    - Counter domain analysis
    - Feature identity analysis
    - Network element analysis
    """

    def __init__(self):
        self._init_technology_indicators()
        self._init_parameter_patterns()
        self._init_counter_patterns()
        self._init_feature_patterns()
        self._init_network_element_patterns()

    def _init_technology_indicators(self):
        """Initialize technology indicator patterns"""
        self.technology_indicators = {
            TechnologyDomain.LTE: {
                'keywords': [
                    'lte', 'enodeb', 'e-utran', 'fdd', 'tdd', 'e-utran',
                    'eutran', 'eutrancell', 'e-ran', '4g', 'long term evolution'
                ],
                'parameters': [
                    'eutrancell', 'eutrancellfdd', 'eutrancelltdd', 'enodebfunction',
                    'enodeb', 'eutran', 'cellfdd', 'celltdd'
                ],
                'counters': [
                    'pmcell', 'pmeutran', 'pmeutrancell', 'pmenodeb',
                    'e-utran', 'eutran'
                ],
                'features': [
                    'volte', 'carrier aggregation', 'lte advanced', 'lte-a'
                ]
            },
            TechnologyDomain.NR: {
                'keywords': [
                    'nr', '5g', 'gnodeb', 'ng-ran', 'sa', 'nsa', 'new radio',
                    'gnb', 'gnodeb', 'nrcell', 'nr-nsa', 'nr-sa'
                ],
                'parameters': [
                    'nrcell', 'nrcelldu', 'gnbdu', 'gnbcucp', 'gnbcuup',
                    'gnb', 'nr', 'newradio'
                ],
                'counters': [
                    'pmnr', 'pmgnb', 'pmnrcell', 'pmgnbdu',
                    'nr', 'new radio'
                ],
                'features': [
                    'massive mimo', 'beamforming', 'network slicing', 'urlc',
                    'mimo', 'nr ca', 'nr dual connectivity'
                ]
            },
            TechnologyDomain.LTE_NR: {
                'keywords': [
                    'en-dc', 'lte-nr', 'dual connectivity', 'en-dc',
                    'eutra-nr', 'multi-rat', 'inter-rat', 'lte-nr dual connectivity'
                ],
                'parameters': [
                    'endc', 'en-dc', 'lte-nr', 'dualconnectivity',
                    'eutra-nr'
                ],
                'counters': [
                    'endc', 'en-dc', 'lte-nr', 'dualconnectivity'
                ],
                'features': [
                    'en-dc', 'lte-nr dual connectivity', 'multi-rat',
                    'inter-technology handover'
                ]
            },
            TechnologyDomain.GSM: {
                'keywords': [
                    'gsm', 'bts', 'bss', 'base station', '2g', 'geran',
                    'base transceiver station'
                ],
                'parameters': [
                    'bts', 'bss', 'gsmcell', 'geran', 'gsm'
                ],
                'counters': [
                    'pmgsm', 'pmbts', 'pmgeran', 'gsm'
                ],
                'features': [
                    'gsm', 'edge', 'gprs', '2g technologies'
                ]
            },
            TechnologyDomain.IoT: {
                'keywords': [
                    'iot', 'nb-iot', 'cat-m', 'catm', 'nbiot',
                    'internet of things', 'lte-m', 'emtc'
                ],
                'parameters': [
                    'iot', 'nbiot', 'catm', 'ltem', 'emtc',
                    'narrowband', 'nb-iot'
                ],
                'counters': [
                    'iot', 'nbiot', 'catm', 'emtc'
                ],
                'features': [
                    'nb-iot', 'cat-m', 'iot optimization', 'lpwa'
                ]
            }
        }

    def _init_parameter_patterns(self):
        """Initialize parameter pattern mappings"""
        self.parameter_patterns = {
            TechnologyDomain.LTE: [
                r'eutrancell', r'enodeb', r'cellfdd', r'celltdd', r'eutran',
                r'eutran', r'rach', r'pmi', r'ri'
            ],
            TechnologyDomain.NR: [
                r'nrcell', r'gnb', r'gnbdu', r'gnbcu', r'nr',
                r'bwp', r'numerology', r'scs', r'csi', r'srs'
            ],
            TechnologyDomain.LTE_NR: [
                r'endc', r'en-?dc', r'ltenr', r'dualconnectivity',
                r'mr-?rat', r'multi-?rat'
            ],
            TechnologyDomain.GSM: [
                r'bts', r'bss', r'geran', r'gsmcell', r'gsm',
                r'arfcn', r'bcch', r'pdch'
            ],
            TechnologyDomain.IoT: [
                r'iot', r'nbiot', r'cat-?m', r'emtc', r'nb-?iot',
                r'ce', r'coverage-?enhancement'
            ]
        }

    def _init_counter_patterns(self):
        """Initialize counter pattern mappings"""
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

    def _init_feature_patterns(self):
        """Initialize feature identity patterns"""
        self.feature_patterns = {
            TechnologyDomain.LTE: [
                r'4g', r'lte', r'volte', r'lte-?a', r'lte-?advanced',
                r'carrier aggregation.*lte', r'tm[3-7]'
            ],
            TechnologyDomain.NR: [
                r'5g', r'nr', r'new radio', r'massive mimo',
                r'network slicing', r'urlc', r'urllc'
            ],
            TechnologyDomain.LTE_NR: [
                r'en-?dc', r'lte-?nr', r'dual connectivity',
                r'multi-?rat', r'nsga'
            ],
            TechnologyDomain.GSM: [
                r'2g', r'gsm', r'geran', r'edge', r'gprs'
            ],
            TechnologyDomain.IoT: [
                r'nb-?iot', r'cat-?m', r'emtc', r'lpwa',
                r'internet of things', r'iot'
            ]
        }

    def _init_network_element_patterns(self):
        """Initialize network element patterns"""
        self.network_element_patterns = {
            TechnologyDomain.LTE: [
                r'baseband 66\d+', r'enodeb', r'e-utran',
                r'radio.*processor.*6\d{3}'
            ],
            TechnologyDomain.NR: [
                r'baseband.*6\d{3}', r'gnodeb', r'ng-?ran',
                r'radio.*system.*6\d{3}'
            ],
            TechnologyDomain.LTE_NR: [
                r'dual.*connectivity', r'multi-?standard',
                r'inter-?technology'
            ],
            TechnologyDomain.GSM: [
                r'bts', r'rbs', r'base station',
                r'radio.*base.*station'
            ],
            TechnologyDomain.IoT: [
                r'iot.*gateway', r'nb-?iot.*base',
                r'cat-?m.*radio'
            ]
        }

    def detect_domains(self, feature: EnhancedEricssonFeature) -> List[DomainDetection]:
        """
        Detect technology domains for a feature.

        Args:
            feature: EnhancedEricssonFeature to analyze

        Returns:
            List of DomainDetection objects with relevance scores
        """
        # Create comprehensive text corpus
        feature_text = self._create_feature_text_corpus(feature)

        detected_domains = []

        for tech, indicators in self.technology_indicators.items():
            score = self._calculate_domain_relevance(feature_text, indicators, feature, tech)
            if score >= 0.2:  # 20% relevance threshold
                evidence = self._get_domain_evidence(feature_text, indicators, feature, tech)
                detected_domains.append(DomainDetection(
                    domain=tech.value,
                    relevance=score,
                    evidence=evidence
                ))

        # Sort by relevance and return top results
        detected_domains.sort(key=lambda x: x.relevance, reverse=True)

        # Ensure at least one domain is detected
        if not detected_domains:
            detected_domains.append(DomainDetection(
                domain=TechnologyDomain.OTHER.value,
                relevance=0.1,
                evidence=['No specific technology detected']
            ))

        return detected_domains

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

    def _calculate_domain_relevance(self, text: str, indicators: Dict, feature: EnhancedEricssonFeature, tech: TechnologyDomain) -> float:
        """Calculate domain relevance score"""
        score = 0.0

        # Keyword matching (40% weight)
        keyword_score = self._calculate_keyword_match_score(text, indicators['keywords'])
        score += keyword_score * 0.4

        # Parameter pattern matching (25% weight)
        param_score = self._calculate_pattern_match_score(
            " ".join(feature.configuration.mo_classes),
            self.parameter_patterns.get(tech, [])
        )
        score += param_score * 0.25

        # Counter pattern matching (20% weight)
        counter_score = self._calculate_pattern_match_score(
            " ".join(feature.performance_monitoring.pm_counters),
            self.counter_patterns.get(tech, [])
        )
        score += counter_score * 0.2

        # Feature identity matching (10% weight)
        feature_score = self._calculate_pattern_match_score(
            f"{feature.name} {feature.description}",
            self.feature_patterns.get(tech, [])
        )
        score += feature_score * 0.10

        # Network element matching (5% weight)
        element_score = self._calculate_pattern_match_score(
            " ".join(feature.network_element_types),
            self.network_element_patterns.get(tech, [])
        )
        score += element_score * 0.05

        return min(score, 1.0)

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

    def _get_domain_evidence(self, text: str, indicators: Dict, feature: EnhancedEricssonFeature, tech: TechnologyDomain) -> List[str]:
        """Get evidence for domain detection"""
        evidence = []

        # Keyword evidence
        found_keywords = [kw for kw in indicators['keywords'] if kw in text]
        if found_keywords:
            evidence.append(f"Keywords found: {', '.join(found_keywords[:3])}")

        # Parameter evidence
        if self.parameter_patterns.get(tech):
            param_text = " ".join(feature.configuration.mo_classes)
            for pattern in self.parameter_patterns[tech][:2]:  # Top 2 patterns
                if re.search(pattern, param_text, re.IGNORECASE):
                    evidence.append(f"Parameters match: {pattern}")
                    break

        # Counter evidence
        if self.counter_patterns.get(tech):
            counter_text = " ".join(feature.performance_monitoring.pm_counters)
            for pattern in self.counter_patterns[tech][:2]:  # Top 2 patterns
                if re.search(pattern, counter_text, re.IGNORECASE):
                    evidence.append(f"Counters match: {pattern}")
                    break

        # Feature identity evidence
        feature_text = f"{feature.name} {feature.description}"
        if self.feature_patterns.get(tech):
            for pattern in self.feature_patterns[tech][:2]:  # Top 2 patterns
                if re.search(pattern, feature_text, re.IGNORECASE):
                    evidence.append(f"Feature identity: {pattern}")
                    break

        # Network element evidence
        if self.network_element_patterns.get(tech):
            element_text = " ".join(feature.network_element_types)
            for pattern in self.network_element_patterns[tech][:2]:  # Top 2 patterns
                if re.search(pattern, element_text, re.IGNORECASE):
                    evidence.append(f"Network elements: {pattern}")
                    break

        return evidence

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
        significant_domains = [d for d in domains if d.relevance >= 0.3]
        return len(significant_domains) > 1

    def get_domain_distribution(self, features: List[EnhancedEricssonFeature]) -> Dict[str, int]:
        """Get distribution of technology domains across features"""
        domain_counts = defaultdict(int)

        for feature in features:
            domains = self.detect_domains(feature)
            if domains:
                primary_domain = domains[0].domain
                domain_counts[primary_domain] += 1

        return dict(domain_counts)

    def batch_detect_domains(self, features: List[EnhancedEricssonFeature]) -> List[List[DomainDetection]]:
        """Detect domains for multiple features in batch"""
        return [self.detect_domains(feature) for feature in features]