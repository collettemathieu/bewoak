#!/usr/bin/env bun
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const EXCLUDED_DIRS = ['node_modules', 'dist', '.nx', '.git', 'coverage', 'tmp', '.vscode'];
const EXCLUDED_FILES = ['bun.lockb', 'package-lock.json'];

function sortJsonFiles(dir: string, level = 0): void {
    const indent = '  '.repeat(level);
    // biome-ignore lint/suspicious/noConsole: CLI script needs console output
    console.log(`${indent}📁 Scanning: ${dir}`);

    try {
        const items = readdirSync(dir);

        for (const item of items) {
            const fullPath = join(dir, item);

            try {
                const stat = statSync(fullPath);

                if (stat.isDirectory() && !EXCLUDED_DIRS.includes(item)) {
                    sortJsonFiles(fullPath, level + 1);
                } else if (item.endsWith('.json') && !EXCLUDED_FILES.some((excluded) => item.includes(excluded))) {
                    try {
                        const content = readFileSync(fullPath, 'utf8');
                        const parsed = JSON.parse(content);

                        // Sort object keys recursively
                        const sortedObject = sortObjectKeysRecursively(parsed);
                        const sortedContent = `${JSON.stringify(sortedObject, null, 2)}\n`;

                        // Only write if content changed
                        if (content !== sortedContent) {
                            writeFileSync(fullPath, sortedContent);
                            // biome-ignore lint/suspicious/noConsole: CLI script needs console output
                            console.log(`${indent}  ✅ Sorted: ${fullPath}`);
                        } else {
                            // biome-ignore lint/suspicious/noConsole: CLI script needs console output
                            console.log(`${indent}  ➡️  Already sorted: ${fullPath}`);
                        }
                    } catch (parseError) {
                        const errorMessage = parseError instanceof Error ? parseError.message : 'Unknown error';
                        // biome-ignore lint/suspicious/noConsole: CLI script needs console output
                        console.log(`${indent}  ⚠️  Invalid JSON: ${fullPath} (${errorMessage})`);
                    }
                }
            } catch (statError) {
                const errorMessage = statError instanceof Error ? statError.message : 'Unknown error';
                // biome-ignore lint/suspicious/noConsole: CLI script needs console output
                console.log(`${indent}  ❌ Error accessing: ${fullPath} (${errorMessage})`);
            }
        }
    } catch (readError) {
        const errorMessage = readError instanceof Error ? readError.message : 'Unknown error';
        // biome-ignore lint/suspicious/noConsole: CLI script needs console output
        console.log(`${indent}❌ Cannot read directory: ${dir} (${errorMessage})`);
    }
}

function sortObjectKeysRecursively(obj: unknown): unknown {
    if (Array.isArray(obj)) {
        return obj.map(sortObjectKeysRecursively);
    }
    if (obj !== null && typeof obj === 'object') {
        const sortedObj: Record<string, unknown> = {};
        const keys = Object.keys(obj).sort();

        for (const key of keys) {
            sortedObj[key] = sortObjectKeysRecursively((obj as Record<string, unknown>)[key]);
        }

        return sortedObj;
    }

    return obj;
}

function main() {
    // biome-ignore lint/suspicious/noConsole: CLI script needs console output
    console.log('🚀 Starting JSON files sorting...\n');
    const startTime = Date.now();

    sortJsonFiles(process.cwd());

    const endTime = Date.now();
    // biome-ignore lint/suspicious/noConsole: CLI script needs console output
    console.log(`\n🎉 JSON sorting completed in ${endTime - startTime}ms`);
}

if (import.meta.main) {
    main();
}
