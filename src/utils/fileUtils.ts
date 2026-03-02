import * as fs from 'fs/promises';
import { Dirent } from 'fs';
import * as path from 'path';

export async function exists(filePath: string): Promise<boolean> {
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
}

export async function readJsonFile<T>(filePath: string): Promise<T | undefined> {
    try {
        const raw = await fs.readFile(filePath, 'utf8');
        return JSON.parse(raw) as T;
    } catch {
        return undefined;
    }
}

export async function listFilesRecursive(
    rootPath: string,
    options?: { maxDepth?: number; maxFiles?: number; ignoreDirs?: Set<string> }
): Promise<string[]> {
    const maxDepth = options?.maxDepth ?? 4;
    const maxFiles = options?.maxFiles ?? 3000;
    const ignoreDirs = options?.ignoreDirs ?? new Set<string>();
    const files: string[] = [];

    async function walk(currentPath: string, depth: number): Promise<void> {
        if (depth > maxDepth || files.length >= maxFiles) {
            return;
        }

        let entries: Dirent[];
        try {
            entries = await fs.readdir(currentPath, { withFileTypes: true });
        } catch {
            return;
        }

        for (const entry of entries) {
            if (files.length >= maxFiles) {
                return;
            }

            const fullPath = path.join(currentPath, entry.name);
            if (entry.isDirectory()) {
                if (!ignoreDirs.has(entry.name)) {
                    await walk(fullPath, depth + 1);
                }
            } else if (entry.isFile()) {
                files.push(fullPath);
            }
        }
    }

    await walk(rootPath, 0);
    return files;
}
