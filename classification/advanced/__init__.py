"""
Advanced Classification Components

This module contains ultra-granular classification components for specialized
RAN expert analysis, including detailed role mapping and expertise assessment.

Components:
    ultra_granular_classifier: Ultra-granular classification with 35+ specializations
    specialized_roles: RAN expert role definitions and mapping

These components provide detailed classification suitable for specialized
expert systems and advanced skill recommendation engines.
"""

from .ultra_granular_classifier import UltraGranularClassifier
from .specialized_roles import RANExpertRoleManager

__all__ = [
    "UltraGranularClassifier",
    "RANExpertRoleManager"
]