"use strict";
/**
 * Template Event Bus - Event-Driven Processing Implementation
 *
 * Provides event-driven communication between template processing components.
 * Supports subscription, publishing, and event filtering capabilities.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateEventBus = void 0;
/**
 * Template Event Bus implementation
 */
class TemplateEventBus {
    constructor() {
        this.listeners = new Map();
        this.eventHistory = [];
        this.maxHistorySize = 1000;
    }
    /**
     * Subscribe to template processing events
     */
    subscribe(eventType, listener) {
        if (!this.listeners.has(eventType)) {
            this.listeners.set(eventType, []);
        }
        this.listeners.get(eventType).push(listener);
    }
    /**
     * Unsubscribe from template processing events
     */
    unsubscribe(eventType, listener) {
        const listeners = this.listeners.get(eventType);
        if (listeners) {
            const index = listeners.indexOf(listener);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }
    }
    /**
     * Publish template processing event
     */
    async publish(event) {
        // Store in history
        this.eventHistory.push(event);
        if (this.eventHistory.length > this.maxHistorySize) {
            this.eventHistory.shift();
        }
        // Notify listeners
        const listeners = this.listeners.get(event.eventType);
        if (listeners) {
            await Promise.all(listeners.map(listener => listener.onEvent(event).catch(error => console.error(`[TemplateEventBus] Error in event listener:`, error))));
        }
        // Also notify general listeners (wildcard)
        const generalListeners = this.listeners.get('*');
        if (generalListeners) {
            await Promise.all(generalListeners.map(listener => listener.onEvent(event).catch(error => console.error(`[TemplateEventBus] Error in general event listener:`, error))));
        }
    }
    /**
     * Get event history
     */
    getEventHistory(limit) {
        if (limit) {
            return this.eventHistory.slice(-limit);
        }
        return [...this.eventHistory];
    }
    /**
     * Clear event history
     */
    clearHistory() {
        this.eventHistory = [];
    }
    /**
     * Get statistics
     */
    getStats() {
        const eventTypeCounts = {};
        const listenerCounts = {};
        for (const event of this.eventHistory) {
            eventTypeCounts[event.eventType] = (eventTypeCounts[event.eventType] || 0) + 1;
        }
        for (const [eventType, listeners] of this.listeners) {
            listenerCounts[eventType] = listeners.length;
        }
        return {
            totalEvents: this.eventHistory.length,
            eventTypeCounts,
            listenerCounts
        };
    }
}
exports.TemplateEventBus = TemplateEventBus;
//# sourceMappingURL=template-event-bus.js.map