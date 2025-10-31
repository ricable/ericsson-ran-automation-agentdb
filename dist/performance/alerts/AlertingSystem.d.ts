/**
 * Alerting and Notification System
 *
 * Comprehensive alerting system for performance issues with configurable thresholds,
 notification channels, escalation policies, and automated resolution workflows
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
export interface AlertRule {
    id: string;
    name: string;
    description: string;
    enabled: boolean;
    severity: 'info' | 'warning' | 'critical';
    category: 'performance' | 'memory' | 'network' | 'system' | 'prediction' | 'anomaly';
    condition: {
        metricPath: string;
        operator: '>' | '<' | '=' | '!=' | '>=' | '<=';
        threshold: number;
        duration: number;
        aggregation: 'average' | 'max' | 'min' | 'sum';
    };
    scheduling: {
        activeHours: {
            start: string;
            end: string;
        }[];
        activeDays: string[];
        timezone: string;
    };
    notifications: {
        channels: string[];
        cooldown: number;
        maxAlertsPerHour: number;
        escalationPolicy?: string;
    };
    autoResolution: {
        enabled: boolean;
        actions: string[];
        timeout: number;
        successCriteria: string[];
    };
}
export interface NotificationChannel {
    id: string;
    name: string;
    type: 'email' | 'slack' | 'webhook' | 'sms' | 'pagerduty' | 'teams' | 'discord';
    enabled: boolean;
    configuration: Record<string, any>;
    rateLimit: {
        maxMessages: number;
        timeWindow: number;
    };
    filters: {
        severities: string[];
        categories: string[];
        keywords?: string[];
    };
}
export interface EscalationPolicy {
    id: string;
    name: string;
    description: string;
    enabled: boolean;
    levels: Array<{
        level: number;
        delay: number;
        channels: string[];
        conditions?: {
            minSeverity: string;
            category?: string;
        };
    }>;
    maxEscalationLevel: number;
    resolutionNotification: {
        enabled: boolean;
        channels: string[];
    };
}
export interface Alert {
    id: string;
    timestamp: Date;
    ruleId: string;
    ruleName: string;
    severity: 'info' | 'warning' | 'critical';
    category: 'performance' | 'memory' | 'network' | 'system' | 'prediction' | 'anomaly';
    status: 'active' | 'acknowledged' | 'resolved' | 'suppressed';
    title: string;
    description: string;
    source: string;
    metricPath: string;
    currentValue: number;
    threshold: number;
    duration: number;
    affectedComponents: string[];
    businessImpact: {
        description: string;
        severity: 'low' | 'medium' | 'high';
        affectedServices: string[];
    };
    notifications: Array<{
        channelId: string;
        sent: boolean;
        timestamp: Date;
        response?: any;
    }>;
    acknowledgements: Array<{
        userId: string;
        timestamp: Date;
        comment: string;
    }>;
    resolution: {
        resolvedAt?: Date;
        resolvedBy?: string;
        method: 'manual' | 'automatic' | 'timeout';
        reason: string;
    } | null;
    escalation: {
        currentLevel: number;
        escalatedAt?: Date;
        nextEscalationAt?: Date;
    };
    metadata: Record<string, any>;
}
export interface AlertStatistics {
    totalAlerts: number;
    activeAlerts: number;
    alertsBySeverity: Record<string, number>;
    alertsByCategory: Record<string, number>;
    alertsBySource: Record<string, number>;
    averageResolutionTime: number;
    mttr: number;
    mtbf: number;
    falsePositiveRate: number;
    autoResolutionRate: number;
    notificationSuccessRate: number;
}
export interface AlertReport {
    id: string;
    generatedAt: Date;
    timeframe: {
        start: Date;
        end: Date;
    };
    summary: {
        totalAlerts: number;
        criticalAlerts: number;
        resolvedAlerts: number;
        autoResolvedAlerts: number;
        mttr: number;
        availability: number;
    };
    trends: {
        alertFrequency: Array<{
            date: string;
            count: number;
        }>;
        resolutionTimeTrend: Array<{
            date: string;
            avgTime: number;
        }>;
        categoryDistribution: Record<string, number>;
        severityDistribution: Record<string, number>;
    };
    topAlertSources: Array<{
        source: string;
        count: number;
        avgResolutionTime: number;
    }>;
    recommendations: Array<{
        category: string;
        description: string;
        priority: 'low' | 'medium' | 'high';
        estimatedImpact: string;
    }>;
}
export declare class AlertingSystem extends EventEmitter {
    private alertRules;
    private notificationChannels;
    private escalationPolicies;
    private alerts;
    private alertHistory;
    private maxHistorySize;
    private notificationQueue;
    private escalationTimer;
    private notificationTimer;
    constructor();
    private initializeDefaultRules;
    private initializeNotificationChannels;
    private initializeEscalationPolicies;
    private startAlertProcessing;
    addAlertRule(rule: AlertRule): void;
    addNotificationChannel(channel: NotificationChannel): void;
    addEscalationPolicy(policy: EscalationPolicy): void;
    processMetrics(metrics: any): void;
    private isRuleActive;
    private evaluateAlertRule;
    private extractMetricValue;
    private extractSourceFromMetric;
    private generateAlertTitle;
    private generateAlertDescription;
    private identifyAffectedComponents;
    private assessBusinessImpact;
    private findExistingAlert;
    private handleAlert;
    private sendNotifications;
    private passesChannelFilters;
    private isRateLimited;
    private processNotificationQueue;
    private sendNotification;
    private sendEmailNotification;
    private sendSlackNotification;
    private sendPagerDutyNotification;
    private sendWebhookNotification;
    private startAutoResolution;
    private processEscalations;
    private escalateAlert;
    private matchesSeverity;
    acknowledgeAlert(alertId: string, userId: string, comment: string): boolean;
    resolveAlert(alertId: string, method: 'manual' | 'automatic' | 'timeout', reason: string): boolean;
    private sendResolutionNotifications;
    getActiveAlerts(): Alert[];
    getAlertHistory(limit?: number): Alert[];
    getAlertStatistics(): AlertStatistics;
    generateAlertReport(timeframe: {
        start: Date;
        end: Date;
    }): AlertReport;
    private calculateAlertFrequencyTrend;
    private calculateResolutionTimeTrend;
    private calculateMTTR;
    private calculateAvailability;
    private generateAlertRecommendations;
    stop(): void;
}
//# sourceMappingURL=AlertingSystem.d.ts.map