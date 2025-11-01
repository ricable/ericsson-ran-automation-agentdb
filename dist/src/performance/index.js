"use strict";
/**
 * Cognitive RAN Performance Monitoring System
 * Main entry point for comprehensive performance monitoring and bottleneck analysis
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quickStartPerformanceMonitoring = exports.createPerformanceMonitoringSystem = exports.AgentDBMonitor = exports.PerformanceMonitoringSystem = exports.PerformanceOrchestrator = exports.PerformanceReporter = exports.CognitiveAnalytics = exports.RealTimeDashboard = exports.BottleneckDetector = exports.PerformanceCollector = void 0;
var PerformanceCollector_1 = require("./monitoring/PerformanceCollector");
Object.defineProperty(exports, "PerformanceCollector", { enumerable: true, get: function () { return PerformanceCollector_1.PerformanceCollector; } });
var BottleneckDetector_1 = require("./bottlenecks/BottleneckDetector");
Object.defineProperty(exports, "BottleneckDetector", { enumerable: true, get: function () { return BottleneckDetector_1.BottleneckDetector; } });
var RealTimeDashboard_1 = require("./dashboard/RealTimeDashboard");
Object.defineProperty(exports, "RealTimeDashboard", { enumerable: true, get: function () { return RealTimeDashboard_1.RealTimeDashboard; } });
var CognitiveAnalytics_1 = require("./analytics/CognitiveAnalytics");
Object.defineProperty(exports, "CognitiveAnalytics", { enumerable: true, get: function () { return CognitiveAnalytics_1.CognitiveAnalytics; } });
var PerformanceReporter_1 = require("./reporting/PerformanceReporter");
Object.defineProperty(exports, "PerformanceReporter", { enumerable: true, get: function () { return PerformanceReporter_1.PerformanceReporter; } });
var PerformanceOrchestrator_1 = require("./orchestration/PerformanceOrchestrator");
Object.defineProperty(exports, "PerformanceOrchestrator", { enumerable: true, get: function () { return PerformanceOrchestrator_1.PerformanceOrchestrator; } });
var PerformanceMonitoringSystem_1 = require("./PerformanceMonitoringSystem");
Object.defineProperty(exports, "PerformanceMonitoringSystem", { enumerable: true, get: function () { return PerformanceMonitoringSystem_1.PerformanceMonitoringSystem; } });
var AgentDBMonitor_1 = require("../integration/agentdb/AgentDBMonitor");
Object.defineProperty(exports, "AgentDBMonitor", { enumerable: true, get: function () { return AgentDBMonitor_1.AgentDBMonitor; } });
// Export types
__exportStar(require("../types/performance"), exports);
/**
 * Create and start the complete performance monitoring system
 */
async function createPerformanceMonitoringSystem() {
    const orchestrator = new PerformanceOrchestrator();
    await orchestrator.start();
    return orchestrator;
}
exports.createPerformanceMonitoringSystem = createPerformanceMonitoringSystem;
/**
 * Quick start performance monitoring with default configuration
 */
async function quickStartPerformanceMonitoring() {
    console.log('🚀 Quick Starting Cognitive RAN Performance Monitoring...');
    const orchestrator = new PerformanceOrchestrator();
    await orchestrator.start();
    const status = orchestrator.getComponentStatus();
    const health = await orchestrator.getSystemHealth();
    const dashboard = orchestrator.components.dashboard.getDashboard();
    console.log('✅ Performance Monitoring System Started Successfully');
    console.log(`📊 System Health: ${health.overall} (${health.score}/100)`);
    console.log(`🎯 Active Components: ${Object.values(status.components).filter(c => c === 'initialized').length}/${Object.keys(status.components).length}`);
    return {
        orchestrator,
        status,
        dashboard,
        health
    };
}
exports.quickStartPerformanceMonitoring = quickStartPerformanceMonitoring;
//# sourceMappingURL=index.js.map