import * as vscode from 'vscode';
import { generateReadme, ReadmeStyle } from './generator/readmeGenerator';
import { scanProject } from './scanner/projectScanner';

export class SidebarProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'rmPlsSidebar';
    private _view?: vscode.WebviewView;
    private _latestReadme = '';

    constructor(private readonly _extensionUri: vscode.Uri) {}

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken
    ) {
        this._view = webviewView;

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };

        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

        webviewView.webview.onDidReceiveMessage(async (data) => {
            switch (data.command) {
                case 'generate':
                    await this.generateAndPreview(data.style);
                    break;
                case 'copy':
                    await vscode.env.clipboard.writeText(data.text || this._latestReadme);
                    vscode.window.showInformationMessage('README copied to clipboard!');
                    break;
            }
        });
    }

    private async generateAndPreview(style: ReadmeStyle): Promise<void> {
        try {
            const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
            if (!workspaceFolder) {
                this.postMessage({
                    command: 'error',
                    text: 'No workspace folder found. Please open a project folder first.'
                });
                return;
            }

            const project = await scanProject(workspaceFolder.uri.fsPath);
            const markdown = generateReadme(project, style || 'hacker');
            this._latestReadme = markdown;

            this.postMessage({
                command: 'updateMarkdown',
                text: markdown
            });
            vscode.window.showInformationMessage('README generated successfully.');
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            this.postMessage({
                command: 'error',
                text: `Failed to generate README: ${message}`
            });
            vscode.window.showErrorMessage('README generation failed.');
        }
    }

    private postMessage(message: unknown): void {
        if (this._view) {
            this._view.webview.postMessage(message);
        }
    }

    private _getHtmlForWebview(webview: vscode.Webview): string {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ReadMe First</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            padding: 0;
            margin: 0;
            background-color: #1e1e1e;
            color: #d4d4d4;
        }
        .container {
            padding: 16px;
        }
        .header {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }
        .logo {
            width: 24px;
            height: 24px;
            margin-right: 8px;
        }
        .title {
            font-size: 18px;
            font-weight: 600;
            color: #6366f1;
        }
        .control-area {
            margin-bottom: 16px;
        }
        .style-select {
            width: 100%;
            padding: 8px;
            background-color: #2d2d2d;
            border: 1px solid #3d3d3d;
            color: #d4d4d4;
            border-radius: 4px;
            margin-bottom: 12px;
        }
        .generate-btn {
            width: 100%;
            padding: 10px;
            background-color: #6366f1;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
        }
        .generate-btn:hover {
            background-color: #4f46e5;
        }
        .preview-area {
            background-color: #2d2d2d;
            border: 1px solid #3d3d3d;
            border-radius: 4px;
            padding: 12px;
            min-height: 300px;
            max-height: 400px;
            overflow-y: auto;
            margin-bottom: 16px;
        }
        .footer {
            display: flex;
            justify-content: center;
        }
        .copy-btn {
            padding: 8px 16px;
            background-color: #2d2d2d;
            color: #d4d4d4;
            border: 1px solid #3d3d3d;
            border-radius: 4px;
            cursor: pointer;
        }
        .copy-btn:hover {
            background-color: #3d3d3d;
        }
        .loading {
            display: none;
            text-align: center;
            padding: 20px;
        }
        .spinner {
            border: 3px solid #3d3d3d;
            border-top: 3px solid #6366f1;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            animation: spin 1s linear infinite;
            margin: 0 auto 10px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <svg class="logo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="4" fill="#6366F1"/>
                <path d="M6 8h12M6 12h12M6 16h8" stroke="white" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <div class="title">ReadMe First</div>
        </div>
        
        <div class="control-area">
            <select class="style-select" id="styleSelect">
                <option value="hacker">Hacker Style</option>
                <option value="academic">Academic Style</option>
                <option value="bytedance">ByteDance Style</option>
            </select>
            <button class="generate-btn" id="generateBtn">Generate & Wrap My Project</button>
        </div>
        
        <div class="loading" id="loading">
            <div class="spinner"></div>
            <div>Scanning and analyzing...</div>
        </div>
        
        <div class="preview-area" id="previewArea">
            <p style="color: #808080; text-align: center; margin-top: 100px;">
                Click "Generate & Wrap My Project" to create your README
            </p>
        </div>
        
        <div class="footer">
            <button class="copy-btn" id="copyBtn">Copy to Clipboard</button>
        </div>
    </div>
    
    <script>
        const vscode = acquireVsCodeApi();
        const generateBtn = document.getElementById('generateBtn');
        const copyBtn = document.getElementById('copyBtn');
        const loading = document.getElementById('loading');
        const previewArea = document.getElementById('previewArea');
        const styleSelect = document.getElementById('styleSelect');
        
        generateBtn.addEventListener('click', () => {
            loading.style.display = 'block';
            previewArea.style.display = 'none';
            vscode.postMessage({
                command: 'generate',
                style: styleSelect.value
            });
        });
        
        copyBtn.addEventListener('click', () => {
            vscode.postMessage({
                command: 'copy',
                text: previewArea.innerText
            });
        });

        window.addEventListener('message', (event) => {
            const message = event.data;
            switch (message.command) {
                case 'updateMarkdown':
                    loading.style.display = 'none';
                    previewArea.style.display = 'block';
                    previewArea.style.whiteSpace = 'pre-wrap';
                    previewArea.textContent = message.text || '';
                    break;
                case 'error':
                    loading.style.display = 'none';
                    previewArea.style.display = 'block';
                    previewArea.style.whiteSpace = 'normal';
                    previewArea.textContent = message.text || 'Failed to generate README.';
                    break;
            }
        });
    </script>
</body>
</html>`;
    }
}
