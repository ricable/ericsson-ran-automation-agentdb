"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamingXMLParser = void 0;
const stream_1 = require("stream");
const util_1 = require("util");
const pipeline = (0, util_1.promisify)(require('stream').pipeline);
class StreamingXMLParser {
    constructor() {
        this.bufferSize = 16 * 1024 * 1024; // 16MB buffer
        this.currentBuffer = '';
        this.depth = 0;
        this.inElement = false;
        this.elementName = '';
        this.parameters = [];
    }
    async parseFile(xmlPath) {
        console.log(`[StreamingXMLParser] Starting streaming parse of ${xmlPath}`);
        const stream = (0, stream_1.createReadStream)(xmlPath, {
            highWaterMark: this.bufferSize
        });
        this.parameters = [];
        this.currentBuffer = '';
        await pipeline(stream, this.createXMLProcessor());
        console.log(`[StreamingXMLParser] Stream parsing complete. Found ${this.parameters.length} parameters.`);
        return this.parameters;
    }
    createXMLProcessor() {
        return new stream_1.Readable({
            read() { }
        }).wrap((0, stream_1.createReadStream)(process.stdin, {
            highWaterMark: this.bufferSize
        }).on('data', (chunk) => {
            this.processChunk(chunk.toString());
        }).on('end', () => {
            this.flushRemainingBuffer();
        }));
    }
    processChunk(chunk) {
        this.currentBuffer += chunk;
        while (this.currentBuffer.length > 0) {
            const { processed, remaining } = this.findCompleteElements(this.currentBuffer);
            this.currentBuffer = remaining;
            if (processed) {
                this.parseAndProcessElements(processed);
            }
        }
    }
    findCompleteElements(buffer) {
        let processed = '';
        let remaining = buffer;
        let localDepth = this.depth;
        let position = 0;
        for (let i = 0; i < buffer.length; i++) {
            if (buffer[i] === '<') {
                if (buffer.substring(i, i + 2) === '</') {
                    // Closing tag
                    localDepth--;
                    if (localDepth === 0 && this.inElement) {
                        processed += buffer.substring(position, i + 1);
                        remaining = buffer.substring(i + 1);
                        break;
                    }
                }
                else if (buffer[i + 1] !== '?' && buffer[i + 1] !== '!') {
                    // Opening tag
                    if (localDepth === 0) {
                        position = i;
                    }
                    localDepth++;
                }
            }
        }
        this.depth = localDepth;
        return { processed, remaining: position === 0 ? buffer : buffer.substring(position) };
    }
    parseAndProcessElements(element) {
        const parameters = this.extractParametersFromElement(element);
        this.parameters.push(...parameters);
        if (this.parameters.length % 1000 === 0) {
            console.log(`[StreamingXMLParser] Processed ${this.parameters.length} parameters...`);
        }
    }
    extractParametersFromElement(element) {
        const parameters = [];
        // Find all vsData elements within the current element
        const vsDataMatches = element.matchAll(/<vsData[^>]*name="([^"]+)"[^>]*>/g);
        const vsDataTypeMatch = element.match(/<vsData[^>]*type="([^"]+)"[^>]*>/);
        const vsDataType = vsDataTypeMatch ? vsDataTypeMatch[1] : 'unknown';
        for (const match of vsDataMatches) {
            const name = match[1];
            const parameter = this.createParameterFromElement(name, vsDataType, element);
            if (parameter) {
                parameters.push(parameter);
            }
        }
        return parameters;
    }
    createParameterFromElement(name, vsDataType, element) {
        try {
            // Extract constraints
            const constraints = {};
            const constraintMatches = element.matchAll(/<parameter[^>]*name="([^"]+)"[^>]*>([^<]*)<\/parameter>/g);
            for (const match of constraintMatches) {
                const paramName = match[1];
                const paramValue = match[2];
                if (paramValue.includes('constraint')) {
                    const constraintMatch = paramValue.match(/constraint\.([^.]+)="([^"]+)"/);
                    if (constraintMatch) {
                        constraints[constraintMatch[1]] = constraintMatch[2];
                    }
                }
            }
            // Extract type information
            const typeMatch = element.match(/<parameter[^>]*type="([^"]+)"[^>]*>/);
            const type = typeMatch ? typeMatch[1] : 'string';
            // Extract hierarchy
            const hierarchy = this.extractHierarchyFromElement(element);
            return {
                id: `${vsDataType}_${name}`,
                name,
                vsDataType,
                type: this.mapXMLTypeToTypeScript(type),
                constraints,
                description: this.extractDescriptionFromElement(element),
                hierarchy,
                source: 'MPnh.xml',
                extractedAt: new Date()
            };
        }
        catch (error) {
            console.warn(`[StreamingXMLParser] Failed to create parameter: ${error}`);
            return null;
        }
    }
    extractHierarchyFromElement(element) {
        const hierarchy = [];
        // Extract namespace hierarchy
        if (element.includes('SubNetwork')) {
            hierarchy.push('SubNetwork');
        }
        if (element.includes('MeContext')) {
            hierarchy.push('MeContext');
        }
        if (element.includes('ManagedElement')) {
            hierarchy.push('ManagedElement');
        }
        // Extract parent MO classes
        const parentMatches = element.matchAll(/<([A-Z][a-zA-Z]*[^>]*)>/g);
        const seen = new Set();
        for (const match of parentMatches) {
            const tagName = match[1].split(' ')[0]; // Get tag name without attributes
            if (!seen.has(tagName) &&
                !['SubNetwork', 'MeContext', 'ManagedElement'].includes(tagName) &&
                tagName.length > 1) {
                hierarchy.push(tagName);
                seen.add(tagName);
            }
        }
        return hierarchy;
    }
    extractDescriptionFromElement(element) {
        const descriptionMatch = element.match(/<description[^>]*>([^<]*)<\/description>/);
        return descriptionMatch ? descriptionMatch[1] : undefined;
    }
    mapXMLTypeToTypeScript(xmlType) {
        const typeMap = {
            'int': 'number',
            'integer': 'number',
            'string': 'string',
            'boolean': 'boolean',
            'float': 'number',
            'double': 'number',
            'dateTime': 'string',
            'date': 'string',
            'time': 'string',
            'list': 'any[]',
            'array': 'any[]',
            'object': 'object'
        };
        return typeMap[xmlType] || 'any';
    }
    flushRemainingBuffer() {
        if (this.currentBuffer.length > 0) {
            console.log(`[StreamingXMLParser] Flushing remaining buffer: ${this.currentBuffer.length} characters`);
            // Process any remaining partial data
            const remainingParameters = this.extractParametersFromElement(this.currentBuffer);
            this.parameters.push(...remainingParameters);
        }
    }
}
exports.StreamingXMLParser = StreamingXMLParser;
//# sourceMappingURL=streaming-xml-parser.js.map