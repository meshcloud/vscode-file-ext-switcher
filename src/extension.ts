'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from "path";
import * as fs from "fs";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    addCommand(context, ['.css', '.scss']);
    addCommand(context, ['.html']);
    addCommand(context, ['.js', '.ts']);
    addCommand(context, ['.ts', '.js']);
}

function addCommand(context: vscode.ExtensionContext, extensions: string[]) {
    
    context.subscriptions.push(vscode.commands.registerCommand('fileextswitch' + extensions[0], () => {
        const current = vscode.window.activeTextEditor.document.fileName;
        
        for (let ext of extensions) {
            const next = path.join(path.dirname(current), path.basename(current, path.extname(current))) + ext;
            const activeColumn = vscode.window.activeTextEditor.viewColumn;
            if (fs.existsSync(next)) {
                vscode.workspace.openTextDocument(next)
                    .then(x => vscode.window.showTextDocument(x, activeColumn));                    
                return;
            }
        }
    }));
}

// this method is called when your extension is deactivated
export function deactivate() {
}