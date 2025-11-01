"use strict";
/**
 * Simple Logger Utility
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 1] = "INFO";
    LogLevel[LogLevel["WARN"] = 2] = "WARN";
    LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
class Logger {
    constructor(context) {
        this.context = context;
    }
    shouldLog(level) {
        return level >= Logger.globalLevel;
    }
    formatMessage(level, message, meta) {
        const timestamp = new Date().toISOString();
        const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
        return `[${timestamp}] [${level}] [${this.context}] ${message}${metaStr}`;
    }
    debug(message, meta) {
        if (this.shouldLog(LogLevel.DEBUG)) {
            console.debug(this.formatMessage('DEBUG', message, meta));
        }
    }
    info(message, meta) {
        if (this.shouldLog(LogLevel.INFO)) {
            console.info(this.formatMessage('INFO', message, meta));
        }
    }
    warn(message, meta) {
        if (this.shouldLog(LogLevel.WARN)) {
            console.warn(this.formatMessage('WARN', message, meta));
        }
    }
    error(message, meta) {
        if (this.shouldLog(LogLevel.ERROR)) {
            console.error(this.formatMessage('ERROR', message, meta));
        }
    }
    static setGlobalLevel(level) {
        Logger.globalLevel = level;
    }
}
exports.Logger = Logger;
Logger.globalLevel = LogLevel.INFO;
//# sourceMappingURL=logger.js.map