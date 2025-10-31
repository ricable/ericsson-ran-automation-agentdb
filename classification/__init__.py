"""
Unified Classification System for Ericsson RAN Features

This package provides a consolidated classification system that unifies multiple
classification approaches using the Strategy Pattern. It supports various granularity
levels and maintains backward compatibility with existing classifiers.

Architecture:
    unified_classifier: Main entry point with strategy pattern
    core: Basic classification components (lightweight, self-contained)
    advanced: Ultra-granular classification for specialized experts
    engines: Classification engines with context awareness and similarity
    models: Unified data models for classification results

Key Features:
    - Single entry point for all classification needs
    - Multiple classification modes (legacy, unified, ultra-granular, hybrid, adaptive)
    - Configurable classification granularity (basic through expert)
    - Strategy pattern for extensible classification approaches
    - Backward compatibility with existing classifiers
    - Performance optimization with mode-specific logic
    - Comprehensive error handling and fallback mechanisms
"""

# Legacy imports for backward compatibility
from .feature_classifier import AdvancedFeatureClassifier
from .technology_detector import TechnologyDomainDetector
from .skill_assessor import SkillLevelAssessor

# New unified imports
from .core.base_classifier import UnifiedFeatureClassifier
from .core.technology_detector import TechnologyDomainDetector as EnhancedTechnologyDetector
from .core.skill_assessor import SkillLevelAssessor as EnhancedSkillLevelAssessor

# NEW: Unified classification system with strategy pattern
from .unified_classifier import (
    UnifiedClassificationEngine,
    UnifiedClassificationResult,
    ClassificationMode,
    GranularityLevel,
    create_classifier,
    unified_classifier
)

__version__ = "2.0.0"
__all__ = [
    # Legacy exports (backward compatibility)
    'AdvancedFeatureClassifier',
    'TechnologyDomainDetector',
    'SkillLevelAssessor',

    # Unified core exports
    'UnifiedFeatureClassifier',
    'EnhancedTechnologyDetector',
    'EnhancedSkillLevelAssessor',

    # NEW: Unified system exports
    'UnifiedClassificationEngine',
    'UnifiedClassificationResult',
    'ClassificationMode',
    'GranularityLevel',
    'create_classifier',
    'unified_classifier'
]