"use strict";
/**
 * cmedit Command Generation Engine - Main Export
 *
 * Core module providing intelligent command generation for Ericsson RAN ENM CLI
 * integration with cognitive optimization and RAN expertise patterns.
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
exports.DEFAULT_COGNITIVE_LEVELS = exports.SUPPORTED_COMMAND_TYPES = exports.CMEDIT_ENGINE_VERSION = exports.buildDefaultCommandContext = exports.createCmeditEngine = exports.CmeditEngine = exports.EricssonRANExpertiseEngine = exports.ConstraintsValidator = exports.FDNPathGenerator = exports.CmeditCommandParser = void 0;
// Export core types
__exportStar(require("./types"), exports);
// Export core engine classes
var command_parser_1 = require("./command-parser");
Object.defineProperty(exports, "CmeditCommandParser", { enumerable: true, get: function () { return command_parser_1.CmeditCommandParser; } });
var fdn_generator_1 = require("./fdn-generator");
Object.defineProperty(exports, "FDNPathGenerator", { enumerable: true, get: function () { return fdn_generator_1.FDNPathGenerator; } });
var constraints_validator_1 = require("./constraints-validator");
Object.defineProperty(exports, "ConstraintsValidator", { enumerable: true, get: function () { return constraints_validator_1.ConstraintsValidator; } });
var ericsson_expertise_1 = require("./ericsson-expertise");
Object.defineProperty(exports, "EricssonRANExpertiseEngine", { enumerable: true, get: function () { return ericsson_expertise_1.EricssonRANExpertiseEngine; } });
var cmedit_engine_1 = require("./cmedit-engine");
Object.defineProperty(exports, "CmeditEngine", { enumerable: true, get: function () { return cmedit_engine_1.CmeditEngine; } });
// Export factory functions for easy instantiation
function createCmeditEngine(moHierarchy, reservedByRelationships, options) {
    return new CmeditEngine(moHierarchy, reservedByRelationships, options);
}
exports.createCmeditEngine = createCmeditEngine;
// Export utility functions
function buildDefaultCommandContext(overrides) {
    return {
        moClasses: [],
        purpose: 'configuration_management',
        networkContext: {
            technology: '4G',
            environment: 'urban_medium',
            vendor: {
                primary: 'ericsson',
                multiVendor: false,
                compatibilityMode: false
            },
            topology: {
                cellCount: 1,
                siteCount: 1,
                frequencyBands: [],
                carrierAggregation: false,
                networkSharing: false
            }
        },
        cognitiveLevel: 'enhanced',
        expertisePatterns: [],
        generatedAt: new Date(),
        priority: 'medium',
        ...overrides
    };
}
exports.buildDefaultCommandContext = buildDefaultCommandContext;
// Version information
exports.CMEDIT_ENGINE_VERSION = '1.0.0';
exports.SUPPORTED_COMMAND_TYPES = ['get', 'set', 'create', 'delete', 'mon', 'unmon'];
exports.DEFAULT_COGNITIVE_LEVELS = ['basic', 'enhanced', 'cognitive', 'autonomous', 'conscious'];
//# sourceMappingURL=index.js.map