"""
Classification Engines

This module contains advanced classification engines that provide context-aware
classification, similarity calculations, and learning path generation.

Components:
    classification_engine: Multi-mode classification engine with context awareness
    similarity_calculator: ML-based similarity calculations and recommendations

These engines provide sophisticated classification capabilities including
batch processing, similarity search, and skill recommendation algorithms.
"""

from .classification_engine import MultiModeClassificationEngine
from .similarity_calculator import SimilarityCalculator

__all__ = [
    "MultiModeClassificationEngine",
    "SimilarityCalculator"
]