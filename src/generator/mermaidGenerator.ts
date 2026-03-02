import { ProjectInfo } from '../scanner/projectScanner';

export function generateMermaidDiagram(project: ProjectInfo): string {
    const sourceNodes = project.sourceDirs.slice(0, 4);

    const sourceLines = sourceNodes.length
        ? sourceNodes.map((dir, index) => `    S${index}[${dir}] --> Core`).join('\n')
        : '    S0[source] --> Core';

    return [
        '```mermaid',
        'flowchart TD',
        '    Input[Developer Input] --> Scan[Project Scanner]',
        '    Scan --> Core[README Generator]',
        sourceLines,
        '    Core --> Output[README.md]',
        '```'
    ].join('\n');
}
