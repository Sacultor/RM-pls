import * as vscode from 'vscode';
import { SidebarProvider } from './sidebarProvider';

export function activate(context: vscode.ExtensionContext) {
    console.log('RM-pls extension is now active!');

    const sidebarProvider = new SidebarProvider(context.extensionUri);

    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            'rmPlsSidebar',
            sidebarProvider
        )
    );

    const generateCommand = vscode.commands.registerCommand('rmPls.generate', () => {
        vscode.window.showInformationMessage('Generating README...');
    });

    context.subscriptions.push(generateCommand);
}

export function deactivate() {
    console.log('RM-pls extension deactivated');
}
