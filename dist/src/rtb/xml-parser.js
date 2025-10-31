"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RTBXMLParser = void 0;
const fs_1 = require("fs");
const streaming_xml_parser_1 = require("./streaming-xml-parser");
class RTBXMLParser {
    constructor() {
        this.parameterCache = new Map();
        this.vsDataTypes = new Set();
        this.processedCount = 0;
        this.startTime = Date.now();
    }
    async parseFile(xmlPath) {
        console.log(`[RTBXMLParser] Starting parse of ${xmlPath}`);
        const startTime = Date.now();
        try {
            // Use streaming parser for memory efficiency
            const streamingParser = new streaming_xml_parser_1.StreamingXMLParser();
            const parameters = await streamingParser.parseFile(xmlPath);
            const processingTime = Date.now() - startTime;
            console.log(`[RTBXMLParser] Parsed ${parameters.length} parameters in ${processingTime}ms`);
            // Extract unique vsData types
            this.vsDataTypes = new Set(parameters.map(p => p.vsDataType));
            console.log(`[RTBXMLParser] Found ${this.vsDataTypes.size} unique vsData types`);
            return parameters;
        }
        catch (error) {
            console.error('[RTBXMLParser] Parse error:', error);
            throw error;
        }
    }
    async parseWithMemoryOptimization(xmlPath) {
        console.log(`[RTBXMLParser] Memory-optimized parse of ${xmlPath}`);
        const fileHandle = await fs_1.promises.open(xmlPath, 'r');
        const stats = await fileHandle.stat();
        const fileSize = stats.size;
        console.log(`[RTBXMLParser] File size: ${(fileSize / 1024 / 1024).toFixed(2)}MB`);
        const parameters = [];
        const batchSize = 1000;
        let batch = [];
        const stream = (0, fs_1.createReadStream)(xmlPath, {
            highWaterMark: 64 * 1024 * 1024 // 64MB chunks
        });
        let currentChunk = '';
        let elementDepth = 0;
        return new Promise((resolve, reject) => {
            stream.on('data', (chunk) => {
                currentChunk += chunk.toString();
                // Process complete elements
                const elements = this.extractCompleteElements(currentChunk);
                if (elements.length > 0) {
                    const parsedElements = this.parseElements(elements);
                    batch.push(...parsedElements);
                    // Process in batches to manage memory
                    if (batch.length >= batchSize) {
                        parameters.push(...batch);
                        batch = [];
                        console.log(`[RTBXMLParser] Processed ${parameters.length} parameters...`);
                    }
                    // Keep remaining partial data
                    currentChunk = elements[elements.length - 1].slice(-1000); // Keep end of last element
                }
            });
            stream.on('end', async () => {
                // Process remaining batch
                if (batch.length > 0) {
                    parameters.push(...batch);
                }
                console.log(`[RTBXMLParser] Memory-optimized complete. Total parameters: ${parameters.length}`);
                await fileHandle.close();
                resolve(parameters);
            });
            stream.on('error', (error) => {
                reject(error);
            });
        });
    }
    extractCompleteElements(chunk) {
        const elements = [];
        let startIndex = 0;
        let depth = 0;
        for (let i = 0; i < chunk.length; i++) {
            if (chunk[i] === '<') {
                if (chunk.substring(i, i + 2) === '</') {
                    depth--;
                    if (depth === 0 && i > startIndex) {
                        elements.push(chunk.substring(startIndex, i + 1));
                        startIndex = i + 1;
                    }
                }
                else if (chunk[i + 1] !== '?' && chunk[i + 1] !== '!') {
                    depth++;
                    if (depth === 1) {
                        startIndex = i;
                    }
                }
            }
        }
        return elements;
    }
    parseElements(elementStrings) {
        return elementStrings
            .filter(element => element.includes('vsData'))
            .map(element => this.parseXMLElement(element))
            .filter(Boolean);
    }
    parseXMLElement(element) {
        try {
            // Extract parameter name
            const nameMatch = element.match(/name="([^"]+)"/);
            if (!nameMatch)
                return null;
            const name = nameMatch[1];
            // Extract vsData type
            const vsDataMatch = element.match(/vsData="([^"]+)"/);
            if (!vsDataMatch)
                return null;
            const vsDataType = vsDataMatch[1];
            // Extract type
            const typeMatch = element.match(/type="([^"]+)"/);
            const type = typeMatch ? typeMatch[1] : 'string';
            // Extract constraints if present
            const constraints = {};
            const constraintsMatches = element.matchAll(/constraint\.([^.]+)="([^"]+)"/g);
            for (const match of constraintsMatches) {
                constraints[match[1]] = match[2];
            }
            // Build hierarchy from element structure
            const hierarchy = this.extractHierarchy(element);
            return {
                id: `${vsDataType}_${name}`,
                name,
                vsDataType,
                type: this.mapXMLTypeToTypeScript(type),
                constraints,
                description: this.extractDescription(element),
                hierarchy,
                source: 'MPnh.xml',
                extractedAt: new Date()
            };
        }
        catch (error) {
            console.warn(`[RTBXMLParser] Failed to parse element: ${error}`);
            return null;
        }
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
    extractHierarchy(element) {
        const hierarchy = [];
        // Extract namespace hierarchy
        const namespaceMatch = element.match(/SubNetwork[^>]*>/);
        if (namespaceMatch) {
            hierarchy.push('SubNetwork');
        }
        const meContextMatch = element.match(/MeContext[^>]*>/);
        if (meContextMatch) {
            hierarchy.push('MeContext');
        }
        const managedElementMatch = element.match(/ManagedElement[^>]*>/);
        if (managedElementMatch) {
            hierarchy.push('ManagedElement');
        }
        // Extract parent MO classes
        const parentMatches = element.matchAll(/([A-Z][a-zA-Z]*)[^>]*>/g);
        for (const match of parentMatches) {
            if (!['SubNetwork', 'MeContext', 'ManagedElement'].includes(match[1])) {
                hierarchy.push(match[1]);
            }
        }
        return hierarchy;
    }
    extractDescription(element) {
        const descriptionMatch = element.match(/description="([^"]+)"/);
        return descriptionMatch ? descriptionMatch[1] : undefined;
    }
    getVsDataTypes() {
        return this.vsDataTypes;
    }
    getProcessingStats() {
        return {
            totalParameters: this.processedCount,
            vsDataTypes: this.vsDataTypes.size,
            processingTime: Date.now() - this.startTime
        };
    }
}
exports.RTBXMLParser = RTBXMLParser;
//# sourceMappingURL=xml-parser.js.map