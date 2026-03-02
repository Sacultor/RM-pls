import * as path from 'path';
import { listFilesRecursive, readJsonFile } from '../utils/fileUtils';

interface PackageJson {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
}

export interface TechStackInfo {
    languages: string[];
    frameworks: string[];
    buildTools: string[];
    packageManager: string;
}

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

const EXT_TO_LANG: Record<string, string> = {
    '.ts': 'TypeScript',
    '.tsx': 'TypeScript',
    '.js': 'JavaScript',
    '.jsx': 'JavaScript',
    '.py': 'Python',
    '.go': 'Go',
    '.rs': 'Rust',
    '.java': 'Java',
    '.kt': 'Kotlin',
    '.swift': 'Swift',
    '.c': 'C',
    '.cc': 'C++',
    '.cpp': 'C++',
    '.h': 'C/C++',
    '.hpp': 'C++',
    '.cs': 'C#',
    '.php': 'PHP',
    '.rb': 'Ruby',
    '.v': 'Verilog',
    '.sv': 'SystemVerilog'
};

function toSortedList(values: Set<string>): string[] {
    return Array.from(values).sort((a, b) => a.localeCompare(b));
}

export async function detectTechStack(rootPath: string): Promise<TechStackInfo> {
    const languages = new Set<string>();
    const frameworks = new Set<string>();
    const buildTools = new Set<string>();

    const packageJsonPath = path.join(rootPath, 'package.json');
    const packageJson = await readJsonFile<PackageJson>(packageJsonPath);
    if (packageJson) {
        languages.add('JavaScript');
        const deps = {
            ...(packageJson.dependencies ?? {}),
            ...(packageJson.devDependencies ?? {})
        };

        if (deps.react) frameworks.add('React');
        if (deps.vue) frameworks.add('Vue');
        if (deps.angular || deps['@angular/core']) frameworks.add('Angular');
        if (deps.next) frameworks.add('Next.js');
        if (deps.express) frameworks.add('Express');
        if (deps.nestjs || deps['@nestjs/core']) frameworks.add('NestJS');
        if (deps.vite) buildTools.add('Vite');
        if (deps.webpack || deps['webpack-cli']) buildTools.add('Webpack');
        if (deps.typescript) languages.add('TypeScript');
        buildTools.add('npm');
    }

    const files = await listFilesRecursive(rootPath, {
        maxDepth: 4,
        maxFiles: 3000,
        ignoreDirs: IGNORE_DIRS
    });

    for (const filePath of files) {
        const base = path.basename(filePath);
        const ext = path.extname(filePath).toLowerCase();
        const lang = EXT_TO_LANG[ext];
        if (lang) {
            languages.add(lang);
        }

        if (base === 'go.mod') {
            languages.add('Go');
        }
        if (base === 'Cargo.toml') {
            languages.add('Rust');
            buildTools.add('Cargo');
        }
        if (base === 'pom.xml' || base === 'build.gradle' || base === 'build.gradle.kts') {
            languages.add('Java');
        }
        if (base === 'CMakeLists.txt') {
            buildTools.add('CMake');
        }
        if (base === 'Makefile') {
            buildTools.add('Make');
        }
    }

    return {
        languages: toSortedList(languages),
        frameworks: toSortedList(frameworks),
        buildTools: toSortedList(buildTools),
        packageManager: packageJson ? 'npm' : 'unknown'
    };
}
