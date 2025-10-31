"""
Unified Classification Models

This module contains the data models and schemas for the unified classification
system, providing consistent data structures across all classification components.

Models:
    classification_models: Unified classification result models
    expert_models: Specialized expert role and skill level models

These models ensure consistency across basic and advanced classification
outputs while maintaining backward compatibility with existing code.
"""

from .classification_models import (
    UnifiedClassification,
    EnhancedClassification,
    ClassificationResult
)

from .expert_models import (
    ExpertRole,
    SkillLevel,
    ExpertiseDomain
)

__all__ = [
    # Classification result models
    "UnifiedClassification",
    "EnhancedClassification",
    "ClassificationResult",

    # Expert role models
    "ExpertRole",
    "SkillLevel",
    "ExpertiseDomain"
]