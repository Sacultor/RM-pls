import { ProjectInfo } from '../scanner/projectScanner';
import { generateMermaidDiagram } from './mermaidGenerator';

export type ReadmeStyle = 'hacker' | 'academic' | 'bytedance';

function styleTagline(style: ReadmeStyle): string {
    switch (style) {
        case 'academic':
            return 'A structured and reproducible software project';
        case 'bytedance':
            return 'An engineering-first project with product-level polish';
        case 'hacker':
        default:
            return 'Ship fast, document clearly, and scale confidently';
    }
}

function renderTechList(project: ProjectInfo): string {
    const lines: string[] = [];
    if (project.techStack.languages.length > 0) {
        lines.push(`- Languages: ${project.techStack.languages.join(', ')}`);
    }
    if (project.techStack.frameworks.length > 0) {
        lines.push(`- Frameworks: ${project.techStack.frameworks.join(', ')}`);
    }
    if (project.techStack.buildTools.length > 0) {
        lines.push(`- Build/Tooling: ${project.techStack.buildTools.join(', ')}`);
    }
    if (lines.length === 0) {
        lines.push('- Technologies: To be identified');
    }
    return lines.join('\n');
}

function renderHighlights(project: ProjectInfo): string {
    const highlights: string[] = [];
    highlights.push(
        `- Workspace-aware structure: detected ${project.keyFiles.length} key configuration/document files.`
    );
    highlights.push(
        `- Source layout mapping: indexed ${project.sourceDirs.length || 1} core code directories for README generation.`
    );

    if (project.hasHardwareFiles) {
        highlights.push('- Hardware logic detected: includes Verilog/SystemVerilog related files.');
    } else {
        highlights.push('- Multi-stack readiness: scanner supports Node.js, Go, Rust, and hardware project indicators.');
    }

    return highlights.join('\n');
}

function renderQuickStart(project: ProjectInfo): string {
    if (project.techStack.packageManager === 'npm') {
        return [
            '```bash',
            '# install dependencies',
            'npm install',
            '',
            '# build extension',
            'npm run compile',
            '```'
        ].join('\n');
    }

    return [
        '```bash',
        '# adjust setup according to your stack',
        '# then run the project build command',
        '```'
    ].join('\n');
}

export function generateReadme(project: ProjectInfo, style: ReadmeStyle): string {
    const mermaid = generateMermaidDiagram(project);
    const hardwareSection = project.hasHardwareFiles
        ? '\n## Hardware Logic Design\n- HDL-related files are present. Consider documenting module interfaces and timing assumptions.\n'
        : '';

    return [
        `# ${project.projectName}`,
        '',
        `${styleTagline(style)}.`,
        '',
        '![Build](https://img.shields.io/badge/build-passing-brightgreen) ![Docs](https://img.shields.io/badge/docs-auto_generated-blue) ![Style](https://img.shields.io/badge/style-' + style + '-orange)',
        '',
        '## Overview',
        `This README is generated from the current workspace \`${project.projectName}\` based on detected structure and technologies.`,
        '',
        '## Tech Stack',
        renderTechList(project),
        '',
        '## The Alpha',
        renderHighlights(project),
        '',
        '## Architecture',
        mermaid,
        '',
        '## Project Structure',
        '```text',
        ...project.sourceDirs.map((dir) => `- ${dir}/`),
        ...project.keyFiles.map((file) => `- ${file}`),
        '```',
        '',
        '## Quick Start',
        renderQuickStart(project),
        hardwareSection,
        '## Notes',
        '- This is an auto-generated baseline README.',
        '- Refine business background, API contracts, and deployment details for production use.'
    ].join('\n');
}
