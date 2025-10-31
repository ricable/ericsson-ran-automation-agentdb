"use strict";
/**
 * Hierarchical Template System - Template Merger & Conflict Resolution
 *
 * A sophisticated template merging and conflict resolution system for RTB configurations
 * with intelligent inheritance resolution, advanced conflict handling, and comprehensive validation.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTemplateMerger = exports.MergeValidator = exports.ResolutionEngine = exports.ConflictDetector = exports.TemplateMerger = void 0;
// Core classes
var template_merger_1 = require("./template-merger");
Object.defineProperty(exports, "TemplateMerger", { enumerable: true, get: function () { return template_merger_1.TemplateMerger; } });
var conflict_detector_1 = require("./conflict-detector");
Object.defineProperty(exports, "ConflictDetector", { enumerable: true, get: function () { return conflict_detector_1.ConflictDetector; } });
var resolution_engine_1 = require("./resolution-engine");
Object.defineProperty(exports, "ResolutionEngine", { enumerable: true, get: function () { return resolution_engine_1.ResolutionEngine; } });
var merge_validator_1 = require("./merge-validator");
Object.defineProperty(exports, "MergeValidator", { enumerable: true, get: function () { return merge_validator_1.MergeValidator; } });
/**
 * Factory function to create a complete template merger system
 */
function createTemplateMerger(options) {
    const templateMerger = new TemplateMerger(options?.merger);
    const conflictDetector = new ConflictDetector(options?.conflictDetector);
    const resolutionEngine = new ResolutionEngine(options?.resolutionEngine);
    const mergeValidator = new MergeValidator(options?.validator);
    return {
        templateMerger,
        conflictDetector,
        resolutionEngine,
        mergeValidator,
        // Convenience method for complete merge workflow
        async mergeTemplates(templates) {
            return await templateMerger.mergeTemplates(templates);
        },
        // Statistics and diagnostics
        getSystemStats() {
            return {
                merger: templateMerger.getCacheStats(),
                conflictDetector: conflictDetector.getConflictPatterns(),
                resolutionEngine: resolutionEngine.getResolutionStats(),
                validator: mergeValidator.getRegisteredValidators()
            };
        },
        // Cache management
        clearAllCaches() {
            templateMerger.clearCache();
            conflictDetector.clearPatterns();
            resolutionEngine.clearCache();
        }
    };
}
exports.createTemplateMerger = createTemplateMerger;
/**
 * Default export for easy usage
 */
exports.default = createTemplateMerger;
//# sourceMappingURL=index-new.js.map