"use strict";
/**
 * Alerting and Notification System
 *
 * Comprehensive alerting system for performance issues with configurable thresholds,
 notification channels, escalation policies, and automated resolution workflows
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertingSystem = void 0;
const events_1 = require("events");
class AlertingSystem extends events_1.EventEmitter {
    constructor() {
        super();
        this.alertRules = new Map();
        this.notificationChannels = new Map();
        this.escalationPolicies = new Map();
        this.alerts = new Map();
        this.alertHistory = [];
        this.maxHistorySize = 10000;
        this.notificationQueue = [];
        this.escalationTimer = null;
        this.notificationTimer = null;
        this.initializeDefaultRules();
        this.initializeNotificationChannels();
        this.initializeEscalationPolicies();
        this.startAlertProcessing();
    }
    initializeDefaultRules() {
        // Performance alert rules
        this.addAlertRule({
            id: 'high_training_latency',
            name: 'High RL Training Latency',
            description: 'Alert when RL training latency exceeds threshold',
            enabled: true,
            severity: 'warning',
            category: 'performance',
            condition: {
                metricPath: 'mlMetrics.reinforcementLearning.trainingSpeed',
                operator: '>',
                threshold: 2.0,
                duration: 5,
                aggregation: 'average'
            },
            scheduling: {
                activeHours: [{ start: '00:00', end: '23:59' }],
                activeDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
                timezone: 'UTC'
            },
            notifications: {
                channels: ['default_email', 'default_slack'],
                cooldown: 15,
                maxAlertsPerHour: 3
            },
            autoResolution: {
                enabled: true,
                actions: ['optimize_training_parameters', 'scale_resources'],
                timeout: 30,
                successCriteria: ['training_speed < 1.5ms']
            }
        });
        this.addAlertRule({
            id: 'low_agentdb_efficiency',
            name: 'Low AgentDB Search Efficiency',
            description: 'Alert when AgentDB vector search performance degrades',
            enabled: true,
            severity: 'critical',
            category: 'performance',
            condition: {
                metricPath: 'mlMetrics.agentdbIntegration.vectorSearchSpeed',
                operator: '>',
                threshold: 3.0,
                duration: 2,
                aggregation: 'average'
            },
            scheduling: {
                activeHours: [{ start: '00:00', end: '23:59' }],
                activeDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
                timezone: 'UTC'
            },
            notifications: {
                channels: ['default_email', 'default_slack', 'default_pagerduty'],
                cooldown: 10,
                maxAlertsPerHour: 5,
                escalationPolicy: 'performance_escalation'
            },
            autoResolution: {
                enabled: true,
                actions: ['rebuild_vector_index', 'increase_cache_size', 'optimize_query_patterns'],
                timeout: 15,
                successCriteria: ['vector_search_speed < 1.5ms']
            }
        });
        // Memory alert rules
        this.addAlertRule({
            id: 'high_memory_usage',
            name: 'High Memory Usage',
            description: 'Alert when system memory usage is critical',
            enabled: true,
            severity: 'critical',
            category: 'memory',
            condition: {
                metricPath: 'systemMemory.usagePercentage',
                operator: '>',
                threshold: 0.9,
                duration: 3,
                aggregation: 'max'
            },
            scheduling: {
                activeHours: [{ start: '00:00', end: '23:59' }],
                activeDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
                timezone: 'UTC'
            },
            notifications: {
                channels: ['default_email', 'default_slack', 'default_pagerduty'],
                cooldown: 5,
                maxAlertsPerHour: 10,
                escalationPolicy: 'memory_escalation'
            },
            autoResolution: {
                enabled: true,
                actions: ['trigger_garbage_collection', 'clear_caches', 'scale_memory'],
                timeout: 10,
                successCriteria: ['memory_usage < 80%']
            }
        });
        // Network alert rules
        this.addAlertRule({
            id: 'high_sync_latency',
            name: 'High Synchronization Latency',
            description: 'Alert when QUIC synchronization latency is high',
            enabled: true,
            severity: 'warning',
            category: 'network',
            condition: {
                metricPath: 'quicSynchronization.performanceMetrics.synchronizationLatency',
                operator: '>',
                threshold: 5.0,
                duration: 5,
                aggregation: 'average'
            },
            scheduling: {
                activeHours: [{ start: '00:00', end: '23:59' }],
                activeDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
                timezone: 'UTC'
            },
            notifications: {
                channels: ['default_email', 'default_slack'],
                cooldown: 15,
                maxAlertsPerHour: 4
            },
            autoResolution: {
                enabled: true,
                actions: ['optimize_quic_parameters', 'enable_compression'],
                timeout: 20,
                successCriteria: ['sync_latency < 3ms']
            }
        });
        // System alert rules
        this.addAlertRule({
            id: 'system_health_degradation',
            name: 'System Health Degradation',
            description: 'Alert when overall system health score drops',
            enabled: true,
            severity: 'warning',
            category: 'system',
            condition: {
                metricPath: 'systemHealth.overallSystemScore',
                operator: '<',
                threshold: 0.8,
                duration: 10,
                aggregation: 'average'
            },
            scheduling: {
                activeHours: [{ start: '00:00', end: '23:59' }],
                activeDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
                timezone: 'UTC'
            },
            notifications: {
                channels: ['default_email', 'default_slack'],
                cooldown: 30,
                maxAlertsPerHour: 2
            },
            autoResolution: {
                enabled: false,
                actions: [],
                timeout: 0,
                successCriteria: []
            }
        });
    }
    initializeNotificationChannels() {
        // Email channel
        this.addNotificationChannel({
            id: 'default_email',
            name: 'Default Email Notifications',
            type: 'email',
            enabled: true,
            configuration: {
                smtpHost: 'smtp.example.com',
                smtpPort: 587,
                username: 'alerts@example.com',
                password: 'encrypted_password',
                from: 'alerts@example.com',
                to: ['admin@example.com', 'ops@example.com'],
                subjectTemplate: '[{{severity}}] {{title}} - RAN Automation System',
                template: 'default_alert_template'
            },
            rateLimit: {
                maxMessages: 50,
                timeWindow: 60 // 1 hour
            },
            filters: {
                severities: ['warning', 'critical'],
                categories: ['performance', 'memory', 'network', 'system']
            }
        });
        // Slack channel
        this.addNotificationChannel({
            id: 'default_slack',
            name: 'Default Slack Notifications',
            type: 'slack',
            enabled: true,
            configuration: {
                webhookUrl: 'https://hooks.slack.com/services/...',
                channel: '#alerts',
                username: 'RAN Automation Bot',
                iconEmoji: ':warning:',
                template: 'slack_alert_template'
            },
            rateLimit: {
                maxMessages: 100,
                timeWindow: 60
            },
            filters: {
                severities: ['warning', 'critical'],
                categories: ['performance', 'memory', 'network', 'system']
            }
        });
        // PagerDuty channel
        this.addNotificationChannel({
            id: 'default_pagerduty',
            name: 'PagerDuty Critical Alerts',
            type: 'pagerduty',
            enabled: true,
            configuration: {
                integrationKey: 'encrypted_pagerduty_key',
                severity: 'critical',
                source: 'RAN Automation System',
                component: 'Performance Monitoring'
            },
            rateLimit: {
                maxMessages: 20,
                timeWindow: 60
            },
            filters: {
                severities: ['critical'],
                categories: ['performance', 'memory', 'network']
            }
        });
    }
    initializeEscalationPolicies() {
        // Performance escalation policy
        this.addEscalationPolicy({
            id: 'performance_escalation',
            name: 'Performance Issues Escalation',
            description: 'Escalation policy for performance-related alerts',
            enabled: true,
            levels: [
                {
                    level: 1,
                    delay: 0,
                    channels: ['default_slack']
                },
                {
                    level: 2,
                    delay: 15,
                    channels: ['default_email'],
                    conditions: {
                        minSeverity: 'critical'
                    }
                },
                {
                    level: 3,
                    delay: 30,
                    channels: ['default_pagerduty'],
                    conditions: {
                        minSeverity: 'critical',
                        category: 'performance'
                    }
                }
            ],
            maxEscalationLevel: 3,
            resolutionNotification: {
                enabled: true,
                channels: ['default_slack']
            }
        });
        // Memory escalation policy
        this.addEscalationPolicy({
            id: 'memory_escalation',
            name: 'Memory Issues Escalation',
            description: 'Escalation policy for memory-related alerts',
            enabled: true,
            levels: [
                {
                    level: 1,
                    delay: 0,
                    channels: ['default_slack']
                },
                {
                    level: 2,
                    delay: 5,
                    channels: ['default_email', 'default_pagerduty']
                },
                {
                    level: 3,
                    delay: 15,
                    channels: ['default_pagerduty'],
                    conditions: {
                        minSeverity: 'critical'
                    }
                }
            ],
            maxEscalationLevel: 3,
            resolutionNotification: {
                enabled: true,
                channels: ['default_email', 'default_slack']
            }
        });
    }
    startAlertProcessing() {
        // Start notification processing
        this.notificationTimer = setInterval(() => {
            this.processNotificationQueue();
        }, 5000); // Process every 5 seconds
        // Start escalation processing
        this.escalationTimer = setInterval(() => {
            this.processEscalations();
        }, 60000); // Check escalations every minute
        this.emit('alerting_started');
    }
    addAlertRule(rule) {
        this.alertRules.set(rule.id, rule);
        this.emit('alert_rule_added', rule);
    }
    addNotificationChannel(channel) {
        this.notificationChannels.set(channel.id, channel);
        this.emit('notification_channel_added', channel);
    }
    addEscalationPolicy(policy) {
        this.escalationPolicies.set(policy.id, policy);
        this.emit('escalation_policy_added', policy);
    }
    processMetrics(metrics) {
        // Check all enabled alert rules against current metrics
        for (const rule of this.alertRules.values()) {
            if (!rule.enabled)
                continue;
            // Check if rule is active based on schedule
            if (!this.isRuleActive(rule))
                continue;
            try {
                const alert = this.evaluateAlertRule(rule, metrics);
                if (alert) {
                    this.handleAlert(alert);
                }
            }
            catch (error) {
                console.error(`Error evaluating alert rule ${rule.id}:`, error);
            }
        }
    }
    isRuleActive(rule) {
        const now = new Date();
        const currentTime = now.toTimeString().slice(0, 5); // HH:MM format
        const currentDay = now.toLocaleLowerCase().slice(0, 3); // day name
        // Check if current day is in active days
        if (!rule.scheduling.activeDays.includes(currentDay)) {
            return false;
        }
        // Check if current time is within active hours
        for (const timeRange of rule.scheduling.activeHours) {
            if (currentTime >= timeRange.start && currentTime <= timeRange.end) {
                return true;
            }
        }
        return false;
    }
    evaluateAlertRule(rule, metrics) {
        // Extract metric value
        const metricValue = this.extractMetricValue(metrics, rule.condition.metricPath);
        if (metricValue === null)
            return null;
        // Check if condition is met
        let conditionMet = false;
        switch (rule.condition.operator) {
            case '>':
                conditionMet = metricValue > rule.condition.threshold;
                break;
            case '<':
                conditionMet = metricValue < rule.condition.threshold;
                break;
            case '>=':
                conditionMet = metricValue >= rule.condition.threshold;
                break;
            case '<=':
                conditionMet = metricValue <= rule.condition.threshold;
                break;
            case '=':
                conditionMet = Math.abs(metricValue - rule.condition.threshold) < 0.001;
                break;
            case '!=':
                conditionMet = Math.abs(metricValue - rule.condition.threshold) >= 0.001;
                break;
        }
        if (!conditionMet)
            return null;
        // Check if alert already exists and is active
        const existingAlert = this.findExistingAlert(rule.id);
        if (existingAlert && existingAlert.status === 'active') {
            // Update existing alert
            existingAlert.duration = Math.floor((Date.now() - existingAlert.timestamp.getTime()) / 60000);
            return null; // Don't create duplicate alert
        }
        // Create new alert
        const alertId = `alert_${rule.id}_${Date.now()}`;
        const alert = {
            id: alertId,
            timestamp: new Date(),
            ruleId: rule.id,
            ruleName: rule.name,
            severity: rule.severity,
            category: rule.category,
            status: 'active',
            title: this.generateAlertTitle(rule, metricValue),
            description: this.generateAlertDescription(rule, metricValue),
            source: this.extractSourceFromMetric(rule.condition.metricPath),
            metricPath: rule.condition.metricPath,
            currentValue: metricValue,
            threshold: rule.condition.threshold,
            duration: 0,
            affectedComponents: this.identifyAffectedComponents(rule, metrics),
            businessImpact: this.assessBusinessImpact(rule, metricValue),
            notifications: [],
            acknowledgements: [],
            resolution: null,
            escalation: {
                currentLevel: 1,
                nextEscalationAt: new Date(Date.now() + rule.notifications.cooldown * 60000)
            },
            metadata: {
                ruleDescription: rule.description,
                conditionOperator: rule.condition.operator,
                aggregation: rule.condition.aggregation
            }
        };
        return alert;
    }
    extractMetricValue(metrics, metricPath) {
        const parts = metricPath.split('.');
        let value = metrics;
        for (const part of parts) {
            if (value && typeof value === 'object' && part in value) {
                value = value[part];
            }
            else {
                return null;
            }
        }
        return typeof value === 'number' ? value : null;
    }
    extractSourceFromMetric(metricPath) {
        if (metricPath.includes('mlMetrics'))
            return 'ML Engine';
        if (metricPath.includes('swarmMetrics'))
            return 'Swarm Coordinator';
        if (metricPath.includes('systemMemory'))
            return 'Memory Manager';
        if (metricPath.includes('systemHealth'))
            return 'System Monitor';
        if (metricPath.includes('quicSynchronization'))
            return 'Network Layer';
        return 'Unknown';
    }
    generateAlertTitle(rule, currentValue) {
        const metricName = rule.condition.metricPath.split('.').pop();
        return `${rule.name}: ${metricName} = ${currentValue.toFixed(2)} (threshold: ${rule.condition.threshold})`;
    }
    generateAlertDescription(rule, currentValue) {
        const operatorText = {
            '>': 'exceeds',
            '<': 'below',
            '>=': 'meets or exceeds',
            '<=': 'at or below',
            '=': 'equals',
            '!=': 'does not equal'
        }[rule.condition.operator];
        return `${rule.description}. Current value: ${currentValue.toFixed(2)} ${operatorText} threshold of ${rule.condition.threshold}.`;
    }
    identifyAffectedComponents(rule, metrics) {
        const components = [];
        if (rule.category === 'performance') {
            components.push('ML Training Engine', 'AgentDB Integration', 'Cognitive Consciousness');
        }
        else if (rule.category === 'memory') {
            components.push('Memory Manager', 'Cache System', 'AgentDB Storage');
        }
        else if (rule.category === 'network') {
            components.push('QUIC Synchronization', 'Inter-agent Communication', 'Data Transfer');
        }
        else if (rule.category === 'system') {
            components.push('System Monitor', 'Resource Manager', 'All Components');
        }
        return components;
    }
    assessBusinessImpact(rule, currentValue) {
        let description = '';
        let severity = 'low';
        const affectedServices = ['RAN Automation System'];
        if (rule.severity === 'critical') {
            severity = 'high';
            description = 'Critical issue affecting system performance and reliability';
            affectedServices.push('ML Optimization', 'Agent Coordination');
        }
        else if (rule.severity === 'warning') {
            severity = 'medium';
            description = 'Performance degradation that may impact user experience';
            affectedServices.push('Performance Monitoring');
        }
        else {
            description = 'Minor issue requiring attention';
        }
        return {
            description,
            severity,
            affectedServices
        };
    }
    findExistingAlert(ruleId) {
        for (const alert of this.alerts.values()) {
            if (alert.ruleId === ruleId && alert.status === 'active') {
                return alert;
            }
        }
        return null;
    }
    handleAlert(alert) {
        // Store alert
        this.alerts.set(alert.id, alert);
        this.alertHistory.push(alert);
        // Maintain history size
        if (this.alertHistory.length > this.maxHistorySize) {
            this.alertHistory.shift();
        }
        // Send initial notifications
        this.sendNotifications(alert);
        // Start auto-resolution if enabled
        if (alert.metadata.autoResolutionEnabled) {
            this.startAutoResolution(alert);
        }
        // Emit alert event
        this.emit('alert_created', alert);
    }
    sendNotifications(alert) {
        const rule = this.alertRules.get(alert.ruleId);
        if (!rule)
            return;
        for (const channelId of rule.notifications.channels) {
            const channel = this.notificationChannels.get(channelId);
            if (!channel || !channel.enabled)
                continue;
            // Check if alert passes channel filters
            if (!this.passesChannelFilters(alert, channel))
                continue;
            // Check rate limits
            if (this.isRateLimited(channel))
                continue;
            // Add to notification queue
            this.notificationQueue.push({
                alert,
                channel,
                timestamp: new Date(),
                retryCount: 0
            });
        }
    }
    passesChannelFilters(alert, channel) {
        // Check severity filter
        if (!channel.filters.severities.includes(alert.severity)) {
            return false;
        }
        // Check category filter
        if (!channel.filters.categories.includes(alert.category)) {
            return false;
        }
        // Check keyword filter
        if (channel.filters.keywords) {
            const alertText = `${alert.title} ${alert.description}`.toLowerCase();
            const hasKeyword = channel.filters.keywords.some(keyword => alertText.includes(keyword.toLowerCase()));
            if (!hasKeyword) {
                return false;
            }
        }
        return true;
    }
    isRateLimited(channel) {
        // Implement rate limiting logic
        // For now, return false (no rate limiting)
        return false;
    }
    async processNotificationQueue() {
        if (this.notificationQueue.length === 0)
            return;
        const notifications = [...this.notificationQueue];
        this.notificationQueue = [];
        for (const notification of notifications) {
            try {
                await this.sendNotification(notification);
            }
            catch (error) {
                console.error(`Error sending notification:`, error);
                // Retry logic
                if (notification.retryCount < 3) {
                    notification.retryCount++;
                    this.notificationQueue.push(notification);
                }
            }
        }
    }
    async sendNotification(notification) {
        const { alert, channel } = notification;
        // Simulate notification sending based on channel type
        let success = false;
        switch (channel.type) {
            case 'email':
                success = await this.sendEmailNotification(alert, channel);
                break;
            case 'slack':
                success = await this.sendSlackNotification(alert, channel);
                break;
            case 'pagerduty':
                success = await this.sendPagerDutyNotification(alert, channel);
                break;
            case 'webhook':
                success = await this.sendWebhookNotification(alert, channel);
                break;
            default:
                console.warn(`Unsupported notification channel type: ${channel.type}`);
                return;
        }
        // Record notification attempt
        alert.notifications.push({
            channelId: channel.id,
            sent: success,
            timestamp: new Date(),
            response: success ? { status: 'sent' } : { error: 'failed' }
        });
        if (success) {
            this.emit('notification_sent', { alert, channel });
        }
        else {
            this.emit('notification_failed', { alert, channel, error: 'Sending failed' });
        }
    }
    async sendEmailNotification(alert, channel) {
        // Simulate email sending
        console.log(`Sending email alert: ${alert.title}`);
        console.log(`To: ${channel.configuration.to.join(', ')}`);
        console.log(`Subject: [${alert.severity.toUpperCase()}] ${alert.title}`);
        // Simulate sending delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Simulate success (90% success rate)
        return Math.random() > 0.1;
    }
    async sendSlackNotification(alert, channel) {
        // Simulate Slack notification
        console.log(`Sending Slack alert to ${channel.configuration.channel}: ${alert.title}`);
        // Simulate sending delay
        await new Promise(resolve => setTimeout(resolve, 500));
        // Simulate success (95% success rate)
        return Math.random() > 0.05;
    }
    async sendPagerDutyNotification(alert, channel) {
        // Simulate PagerDuty notification
        console.log(`Sending PagerDuty alert: ${alert.title} (${alert.severity})`);
        // Simulate sending delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        // Simulate success (98% success rate)
        return Math.random() > 0.02;
    }
    async sendWebhookNotification(alert, channel) {
        // Simulate webhook notification
        console.log(`Sending webhook to ${channel.configuration.url}: ${alert.title}`);
        // Simulate sending delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        // Simulate success (85% success rate)
        return Math.random() > 0.15;
    }
    async startAutoResolution(alert) {
        const rule = this.alertRules.get(alert.ruleId);
        if (!rule || !rule.autoResolution.enabled)
            return;
        console.log(`Starting auto-resolution for alert: ${alert.title}`);
        // Simulate auto-resolution actions
        for (const action of rule.autoResolution.actions) {
            console.log(`Executing auto-resolution action: ${action}`);
            // Simulate action execution time
            await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
            // Check if action was successful
            const success = Math.random() > 0.2; // 80% success rate
            if (success) {
                console.log(`Auto-resolution action successful: ${action}`);
            }
            else {
                console.log(`Auto-resolution action failed: ${action}`);
            }
        }
        // Check if alert should be resolved
        const resolved = Math.random() > 0.3; // 70% auto-resolution success rate
        if (resolved) {
            this.resolveAlert(alert.id, 'automatic', 'Auto-resolution actions completed successfully');
        }
    }
    processEscalations() {
        const now = new Date();
        for (const alert of this.alerts.values()) {
            if (alert.status !== 'active')
                continue;
            const rule = this.alertRules.get(alert.ruleId);
            if (!rule || !rule.notifications.escalationPolicy)
                continue;
            const policy = this.escalationPolicies.get(rule.notifications.escalationPolicy);
            if (!policy || !policy.enabled)
                continue;
            // Check if escalation is needed
            if (alert.escalation.nextEscalationAt && now >= alert.escalation.nextEscalationAt) {
                this.escalateAlert(alert, policy);
            }
        }
    }
    escalateAlert(alert, policy) {
        if (alert.escalation.currentLevel >= policy.maxEscalationLevel) {
            return; // Already at max escalation level
        }
        const nextLevel = alert.escalation.currentLevel + 1;
        const escalationLevel = policy.levels.find(level => level.level === nextLevel);
        if (!escalationLevel)
            return;
        // Check escalation conditions
        if (escalationLevel.conditions) {
            if (escalationLevel.conditions.minSeverity && !this.matchesSeverity(escalationLevel.conditions.minSeverity, alert.severity)) {
                return;
            }
            if (escalationLevel.conditions.category && escalationLevel.conditions.category !== alert.category) {
                return;
            }
        }
        // Update escalation level
        alert.escalation.currentLevel = nextLevel;
        alert.escalation.escalatedAt = new Date();
        // Calculate next escalation time
        const nextEscalation = policy.levels.find(level => level.level === nextLevel + 1);
        if (nextEscalation) {
            alert.escalation.nextEscalationAt = new Date(Date.now() + nextEscalation.delay * 60000);
        }
        // Send escalation notifications
        for (const channelId of escalationLevel.channels) {
            const channel = this.notificationChannels.get(channelId);
            if (channel && channel.enabled) {
                this.notificationQueue.push({
                    alert,
                    channel,
                    timestamp: new Date(),
                    retryCount: 0
                });
            }
        }
        this.emit('alert_escalated', { alert, level: nextLevel });
    }
    matchesSeverity(minSeverity, alertSeverity) {
        const severityLevels = { 'info': 1, 'warning': 2, 'critical': 3 };
        const minLevel = severityLevels[minSeverity] || 1;
        const alertLevel = severityLevels[alertSeverity] || 1;
        return alertLevel >= minLevel;
    }
    acknowledgeAlert(alertId, userId, comment) {
        const alert = this.alerts.get(alertId);
        if (!alert || alert.status !== 'active') {
            return false;
        }
        alert.status = 'acknowledged';
        alert.acknowledgements.push({
            userId,
            timestamp: new Date(),
            comment
        });
        this.emit('alert_acknowledged', { alert, userId, comment });
        return true;
    }
    resolveAlert(alertId, method, reason) {
        const alert = this.alerts.get(alertId);
        if (!alert || alert.status === 'resolved') {
            return false;
        }
        alert.status = 'resolved';
        alert.resolution = {
            resolvedAt: new Date(),
            resolvedBy: method === 'manual' ? 'user' : 'system',
            method,
            reason
        };
        // Send resolution notifications if configured
        this.sendResolutionNotifications(alert);
        this.emit('alert_resolved', { alert, method, reason });
        return true;
    }
    sendResolutionNotifications(alert) {
        const rule = this.alertRules.get(alert.ruleId);
        if (!rule || !rule.notifications.escalationPolicy)
            return;
        const policy = this.escalationPolicies.get(rule.notifications.escalationPolicy);
        if (!policy || !policy.resolutionNotification.enabled)
            return;
        for (const channelId of policy.resolutionNotification.channels) {
            const channel = this.notificationChannels.get(channelId);
            if (channel && channel.enabled) {
                this.notificationQueue.push({
                    alert,
                    channel,
                    timestamp: new Date(),
                    retryCount: 0
                });
            }
        }
    }
    getActiveAlerts() {
        return Array.from(this.alerts.values()).filter(alert => alert.status === 'active');
    }
    getAlertHistory(limit) {
        return limit ? this.alertHistory.slice(-limit) : this.alertHistory;
    }
    getAlertStatistics() {
        const alerts = Array.from(this.alerts.values());
        const activeAlerts = alerts.filter(alert => alert.status === 'active');
        const resolvedAlerts = alerts.filter(alert => alert.status === 'resolved');
        const alertsBySeverity = {};
        const alertsByCategory = {};
        const alertsBySource = {};
        alerts.forEach(alert => {
            alertsBySeverity[alert.severity] = (alertsBySeverity[alert.severity] || 0) + 1;
            alertsByCategory[alert.category] = (alertsByCategory[alert.category] || 0) + 1;
            alertsBySource[alert.source] = (alertsBySource[alert.source] || 0) + 1;
        });
        // Calculate MTTR (Mean Time To Resolution)
        const resolutionTimes = resolvedAlerts
            .filter(alert => alert.resolution?.resolvedAt)
            .map(alert => {
            const resolutionTime = alert.resolution.resolvedAt.getTime() - alert.timestamp.getTime();
            return resolutionTime / (1000 * 60); // Convert to minutes
        });
        const mttr = resolutionTimes.length > 0
            ? resolutionTimes.reduce((sum, time) => sum + time, 0) / resolutionTimes.length
            : 0;
        // Calculate auto-resolution rate
        const autoResolvedAlerts = resolvedAlerts.filter(alert => alert.resolution?.method === 'automatic');
        const autoResolutionRate = resolvedAlerts.length > 0
            ? (autoResolvedAlerts.length / resolvedAlerts.length) * 100
            : 0;
        // Calculate notification success rate
        const totalNotifications = alerts.reduce((sum, alert) => sum + alert.notifications.length, 0);
        const successfulNotifications = alerts.reduce((sum, alert) => sum + alert.notifications.filter(n => n.sent).length, 0);
        const notificationSuccessRate = totalNotifications > 0
            ? (successfulNotifications / totalNotifications) * 100
            : 0;
        return {
            totalAlerts: alerts.length,
            activeAlerts: activeAlerts.length,
            alertsBySeverity,
            alertsByCategory,
            alertsBySource,
            averageResolutionTime: mttr,
            mttr,
            mtbf: 0,
            falsePositiveRate: 0,
            autoResolutionRate,
            notificationSuccessRate
        };
    }
    generateAlertReport(timeframe) {
        const reportId = `report_${Date.now()}`;
        const timeframeAlerts = this.alertHistory.filter(alert => alert.timestamp >= timeframe.start && alert.timestamp <= timeframe.end);
        const resolvedAlerts = timeframeAlerts.filter(alert => alert.status === 'resolved');
        const criticalAlerts = timeframeAlerts.filter(alert => alert.severity === 'critical');
        const autoResolvedAlerts = resolvedAlerts.filter(alert => alert.resolution?.method === 'automatic');
        // Calculate trends (simplified)
        const alertFrequency = this.calculateAlertFrequencyTrend(timeframeAlerts, timeframe);
        const resolutionTimeTrend = this.calculateResolutionTimeTrend(resolvedAlerts, timeframe);
        // Category and severity distribution
        const categoryDistribution = {};
        const severityDistribution = {};
        timeframeAlerts.forEach(alert => {
            categoryDistribution[alert.category] = (categoryDistribution[alert.category] || 0) + 1;
            severityDistribution[alert.severity] = (severityDistribution[alert.severity] || 0) + 1;
        });
        // Top alert sources
        const sourceCounts = {};
        resolvedAlerts.forEach(alert => {
            if (!sourceCounts[alert.source]) {
                sourceCounts[alert.source] = { count: 0, totalTime: 0 };
            }
            sourceCounts[alert.source].count++;
            if (alert.resolution?.resolvedAt) {
                const resolutionTime = alert.resolution.resolvedAt.getTime() - alert.timestamp.getTime();
                sourceCounts[alert.source].totalTime += resolutionTime;
            }
        });
        const topAlertSources = Object.entries(sourceCounts)
            .map(([source, data]) => ({
            source,
            count: data.count,
            avgResolutionTime: data.totalTime / data.count / (1000 * 60) // minutes
        }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);
        // Generate recommendations
        const recommendations = this.generateAlertRecommendations(timeframeAlerts);
        return {
            id: reportId,
            generatedAt: new Date(),
            timeframe,
            summary: {
                totalAlerts: timeframeAlerts.length,
                criticalAlerts: criticalAlerts.length,
                resolvedAlerts: resolvedAlerts.length,
                autoResolvedAlerts: autoResolvedAlerts.length,
                mttr: this.calculateMTTR(resolvedAlerts),
                availability: this.calculateAvailability(timeframeAlerts, timeframe)
            },
            trends: {
                alertFrequency,
                resolutionTimeTrend,
                categoryDistribution,
                severityDistribution
            },
            topAlertSources,
            recommendations
        };
    }
    calculateAlertFrequencyTrend(alerts, timeframe) {
        // Simplified daily frequency
        const dailyCounts = {};
        const daysDiff = Math.ceil((timeframe.end.getTime() - timeframe.start.getTime()) / (1000 * 60 * 60 * 24));
        for (let i = 0; i < Math.min(daysDiff, 30); i++) {
            const date = new Date(timeframe.start.getTime() + i * 24 * 60 * 60 * 1000);
            const dateStr = date.toISOString().split('T')[0];
            dailyCounts[dateStr] = 0;
        }
        alerts.forEach(alert => {
            const dateStr = alert.timestamp.toISOString().split('T')[0];
            if (dailyCounts.hasOwnProperty(dateStr)) {
                dailyCounts[dateStr]++;
            }
        });
        return Object.entries(dailyCounts).map(([date, count]) => ({ date, count }));
    }
    calculateResolutionTimeTrend(resolvedAlerts, timeframe) {
        // Simplified daily resolution time trend
        const dailyTimes = {};
        resolvedAlerts.forEach(alert => {
            if (alert.resolution?.resolvedAt) {
                const dateStr = alert.timestamp.toISOString().split('T')[0];
                const resolutionTime = alert.resolution.resolvedAt.getTime() - alert.timestamp.getTime();
                if (!dailyTimes[dateStr]) {
                    dailyTimes[dateStr] = { total: 0, count: 0 };
                }
                dailyTimes[dateStr].total += resolutionTime;
                dailyTimes[dateStr].count++;
            }
        });
        return Object.entries(dailyTimes).map(([date, data]) => ({
            date,
            avgTime: data.total / data.count / (1000 * 60) // minutes
        }));
    }
    calculateMTTR(resolvedAlerts) {
        const resolutionTimes = resolvedAlerts
            .filter(alert => alert.resolution?.resolvedAt)
            .map(alert => {
            return (alert.resolution.resolvedAt.getTime() - alert.timestamp.getTime()) / (1000 * 60);
        });
        return resolutionTimes.length > 0
            ? resolutionTimes.reduce((sum, time) => sum + time, 0) / resolutionTimes.length
            : 0;
    }
    calculateAvailability(alerts, timeframe) {
        const criticalAlerts = alerts.filter(alert => alert.severity === 'critical');
        const timeframeMinutes = (timeframe.end.getTime() - timeframe.start.getTime()) / (1000 * 60);
        const downtimeMinutes = criticalAlerts.reduce((sum, alert) => {
            const duration = alert.resolution?.resolvedAt
                ? (alert.resolution.resolvedAt.getTime() - alert.timestamp.getTime()) / (1000 * 60)
                : Math.min(60, (timeframe.end.getTime() - alert.timestamp.getTime()) / (1000 * 60)); // Assume 60min max for unresolved
            return sum + duration;
        }, 0);
        return timeframeMinutes > 0 ? Math.max(0, ((timeframeMinutes - downtimeMinutes) / timeframeMinutes) * 100) : 100;
    }
    generateAlertRecommendations(alerts) {
        const recommendations = [];
        // Analyze most common alert types
        const categoryCounts = {};
        alerts.forEach(alert => {
            categoryCounts[alert.category] = (categoryCounts[alert.category] || 0) + 1;
        });
        // Generate recommendations based on common issues
        if (categoryCounts['performance'] > 10) {
            recommendations.push({
                category: 'Performance',
                description: 'High number of performance alerts detected. Consider optimizing ML models and scaling resources.',
                priority: 'high',
                estimatedImpact: 'Reduce performance-related alerts by 40%'
            });
        }
        if (categoryCounts['memory'] > 5) {
            recommendations.push({
                category: 'Memory',
                description: 'Frequent memory alerts indicate resource pressure. Implement memory optimization strategies.',
                priority: 'medium',
                estimatedImpact: 'Reduce memory-related alerts by 60%'
            });
        }
        if (categoryCounts['network'] > 8) {
            recommendations.push({
                category: 'Network',
                description: 'Network communication issues detected. Review QUIC configuration and network infrastructure.',
                priority: 'medium',
                estimatedImpact: 'Improve network reliability by 25%'
            });
        }
        return recommendations;
    }
    stop() {
        if (this.notificationTimer) {
            clearInterval(this.notificationTimer);
            this.notificationTimer = null;
        }
        if (this.escalationTimer) {
            clearInterval(this.escalationTimer);
            this.escalationTimer = null;
        }
        this.emit('alerting_stopped');
    }
}
exports.AlertingSystem = AlertingSystem;
//# sourceMappingURL=AlertingSystem.js.map