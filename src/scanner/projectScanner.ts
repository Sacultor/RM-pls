import * as path from 'path';
import { detectTechStack, TechStackInfo } from './techDetector';
import { exists, listFilesRecursive } from '../utils/fileUtils';

export interface ProjectInfo {
    rootPath: string;
    projectName: string;
    keyFiles: string[];
    sourceDirs: string[];
    hasHardwareFiles: boolean;
    techStack: TechStackInfo;
}

const KEY_FILES = [
    'package.json',
    'README.md',
    'go.mod',
    'Cargo.toml',
    'pom.xml',
    'build.gradle',
    'requirements.txt',
    'pyproject.toml',
    'Dockerfile',
    '.env.example'
];

const COMMON_SOURCE_DIRS = [
    'src',
    'app',
    'packages',
    'server',
    'client',
    'api',
    'lib',
    'cmd',
    'internal',
    'contracts'
];

const IGNORE_DIRS = new Set<string>([
    'node_modules',
    '.git',
    'dist',
    'out',
    'build',
    '.next',
    '.nuxt',
    'coverage'
]);

function getProjectName(rootPath: string): string {
    return path.basename(rootPath);
}

export async function scanProject(rootPath: string): Promise<ProjectInfo> {
    const keyFiles: string[] = [];
    for (const file of KEY_FILES) {
        if (await exists(path.join(rootPath, file))) {
            keyFiles.push(file);
        }
    }

    const sourceDirs: string[] = [];
    for (const dir of COMMON_SOURCE_DIRS) {
        if (await exists(path.join(rootPath, dir))) {
            sourceDirs.push(dir);
        }
    }

    const allFiles = await listFilesRecursive(rootPath, {
        maxDepth: 4,
        maxFiles: 3000,
        ignoreDirs: IGNORE_DIRS
    });
    const hasHardwareFiles = allFiles.some((filePath) => {
        const ext = path.extname(filePath).toLowerCase();
        return ext === '.v' || ext === '.sv';
    });

    const techStack = await detectTechStack(rootPath);

    return {
        rootPath,
        projectName: getProjectName(rootPath),
        keyFiles,
        sourceDirs,
        hasHardwareFiles,
        techStack
    };
}
